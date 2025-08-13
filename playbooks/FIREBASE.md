# Firebase Integration Playbook

**Purpose**: Standardized patterns for Firebase Auth integration, storage abstraction, and migration from Firestore to PostgreSQL in Ascendvent projects.

## Core Firebase Services

### Firebase Auth Setup
```typescript
// lib/firebase/auth.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
```

### Authentication Hook Pattern
```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
```

### Protected Route Component
```typescript
// components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

## Backend Integration

### Express Middleware for Auth
```typescript
// server/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || ''
    };

    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
```

### Firebase Admin SDK Setup
```typescript
// server/lib/firebase-admin.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

export const adminApp = initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

export const adminAuth = getAuth(adminApp);
```

## Storage Abstraction Pattern

### User Storage Service
```typescript
// server/storage/userStorage.ts
interface UserRepository {
  findByFirebaseUid(uid: string): Promise<User | null>;
  create(userData: CreateUserRequest): Promise<User>;
  update(id: string, updates: Partial<User>): Promise<User>;
}

// PostgreSQL implementation
export class PostgresUserRepository implements UserRepository {
  async findByFirebaseUid(uid: string): Promise<User | null> {
    const result = await db.query(
      'SELECT * FROM users WHERE firebase_uid = $1',
      [uid]
    );
    return result.rows[0] || null;
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const result = await db.query(
      'INSERT INTO users (firebase_uid, email, name) VALUES ($1, $2, $3) RETURNING *',
      [userData.firebase_uid, userData.email, userData.name]
    );
    return result.rows[0];
  }
}
```

### Authentication + Database Integration
```typescript
// server/routes/profile.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { userRepository } from '../storage';

const router = Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await userRepository.findByFirebaseUid(req.user!.uid);
    
    if (!user) {
      // Auto-create user on first access
      const newUser = await userRepository.create({
        firebase_uid: req.user!.uid,
        email: req.user!.email,
        name: req.user!.email.split('@')[0] // Default name
      });
      return res.json({ user: newUser });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
```

## Client-Side Auth Patterns

### Login Component
```typescript
// components/LoginForm.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase/auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User will be automatically redirected by useAuth hook
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        data-testid="email-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        data-testid="password-input"
      />
      <button type="submit" disabled={loading} data-testid="login-button">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

### API Client with Auth Headers
```typescript
// lib/api/client.ts
import { auth } from '../firebase/auth';

class ApiClient {
  private baseURL = process.env.VITE_API_URL || '/api';

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const user = auth.currentUser;
    if (!user) return {};

    const token = await user.getIdToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, { headers });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
}

export const apiClient = new ApiClient();
```

## Testing Firebase Integration

### Mock Firebase Auth
```typescript
// __tests__/test-utils.ts
export const mockFirebaseUser = {
  uid: 'test-uid-123',
  email: 'test@example.com',
  getIdToken: jest.fn().mockResolvedValue('mock-token')
};

export function mockFirebaseAuth() {
  jest.mock('../lib/firebase/auth', () => ({
    auth: {
      currentUser: mockFirebaseUser,
      onAuthStateChanged: jest.fn((callback) => {
        callback(mockFirebaseUser);
        return jest.fn(); // unsubscribe function
      })
    }
  }));
}
```

### Testing Protected Routes
```typescript
// components/__tests__/ProtectedRoute.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { mockFirebaseAuth } from '../../__tests__/test-utils';

describe('ProtectedRoute', () => {
  beforeEach(() => {
    mockFirebaseAuth();
  });

  it('renders children when user is authenticated', async () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(await screen.findByText('Protected Content')).toBeInTheDocument();
  });
});
```

## Best Practices

### DO
- Always validate Firebase tokens on the backend
- Use Firebase Admin SDK for server-side operations
- Abstract database operations from Firebase Auth
- Implement proper error handling for auth failures
- Use environment variables for all Firebase configuration
- Auto-create user records in your database on first auth

### DON'T
- Store sensitive data in Firebase Auth custom claims
- Use Firebase Auth tokens for authorization decisions (use your DB)
- Mix Firestore and PostgreSQL in the same application
- Expose Firebase Admin SDK credentials in client code
- Skip token validation on protected API routes

## Migration from Firestore

### Data Migration Script
```typescript
// scripts/migrate-firestore-to-postgres.ts
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { db } from '../server/storage/postgres';

async function migrateUsers() {
  const firestore = getFirestore();
  const usersSnapshot = await firestore.collection('users').get();

  for (const doc of usersSnapshot.docs) {
    const firestoreData = doc.data();
    
    await db.query(
      'INSERT INTO users (firebase_uid, email, name, created_at) VALUES ($1, $2, $3, $4)',
      [
        firestoreData.uid,
        firestoreData.email,
        firestoreData.name,
        new Date(firestoreData.createdAt.toDate())
      ]
    );
  }
}
```

## Integration with Other Playbooks
- **NODE-EXPRESS.md**: Backend authentication middleware patterns
- **REACT-HOOKS.md**: Authentication hooks and state management
- **TESTING.md**: Mocking Firebase services in tests
- **POSTGRES.md**: User data storage and relationships
- **TYPESCRIPT.md**: Type definitions for Firebase user objects