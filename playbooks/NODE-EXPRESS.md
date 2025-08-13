# Node.js + Express Backend Playbook

**Purpose**: Standardized patterns for Node.js Express backends with TypeScript, following Ascendvent's stateless CRUD API architecture.

## Core Patterns

### API Route Structure
```typescript
// server/routes/users.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1)
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const userData = CreateUserSchema.parse(req.body);
    // Stateless operation - no session dependencies
    const user = await userService.create(userData);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
```

### Service Layer Pattern
```typescript
// server/services/userService.ts
import { User, CreateUserRequest } from '../types';
import { db } from '../storage';

export class UserService {
  async create(userData: CreateUserRequest): Promise<User> {
    // Business logic isolated from HTTP concerns
    const user = await db.users.create({
      ...userData,
      id: generateId(),
      createdAt: new Date()
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return db.users.findById(id);
  }
}

export const userService = new UserService();
```

### Storage Abstraction
```typescript
// server/storage/index.ts
interface Storage {
  users: UserRepository;
  // Other repositories
}

// Implementation can be PostgreSQL, Firebase, etc.
export const db: Storage = createStorage(process.env.DATABASE_URL);
```

## Best Practices

### DO
- Use TypeScript strict mode for all Express code
- Validate all incoming requests with schemas (zod, joi)
- Keep routes thin - delegate to service layer
- Use storage abstraction layer for database operations
- Return consistent JSON response formats
- Log structured data with correlation IDs
- Use environment variables for configuration

### DON'T
- Store session state in memory or globals
- Mix business logic with HTTP handling
- Skip input validation on API endpoints
- Hardcode database connection strings
- Use `any` types in request/response handling
- Block the event loop with synchronous operations

## Error Handling Pattern
```typescript
// server/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('API Error:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    correlationId: req.headers['x-correlation-id']
  });

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid request data',
      details: error.message
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    correlationId: req.headers['x-correlation-id']
  });
}
```

## Health Check Implementation
```typescript
// server/routes/health.ts
router.get('/health', async (req: Request, res: Response) => {
  try {
    // Check database connectivity
    await db.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

## Testing Patterns
```typescript
// server/__tests__/users.test.ts
import request from 'supertest';
import { app } from '../app';
import { setupTestDb, cleanupTestDb } from '../test-utils';

describe('User API', () => {
  beforeEach(async () => {
    await setupTestDb();
  });

  afterEach(async () => {
    await cleanupTestDb();
  });

  it('creates user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.user).toMatchObject(userData);
  });
});
```

## Integration with Other Playbooks
- **TYPESCRIPT.md**: Follow TypeScript standards for all backend code
- **TESTING.md**: Use Jest for unit tests, supertest for API tests
- **DOCKER.md**: Containerize Express apps with proper health checks
- **POSTGRES.md**: Use PostgreSQL storage layer implementation
- **FIREBASE.md**: Integrate Firebase Auth middleware for protected routes