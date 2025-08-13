# Testing Standards Playbook

**Purpose**: Comprehensive testing methodology for Jest unit tests, Playwright end-to-end tests, and 80% coverage requirements across Ascendvent projects.

## Core Testing Architecture

### Unit Tests with Jest
```typescript
// src/components/__tests__/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '../UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  it('displays user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles missing user gracefully', () => {
    render(<UserCard user={null} />);
    
    expect(screen.getByText('No user data')).toBeInTheDocument();
  });
});
```

### API Testing Pattern
```typescript
// server/__tests__/api/users.test.ts
import request from 'supertest';
import { app } from '../../app';
import { createTestUser, cleanupDb } from '../test-helpers';

describe('User API', () => {
  afterEach(async () => {
    await cleanupDb();
  });

  describe('POST /api/users', () => {
    it('creates user with valid data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        user: expect.objectContaining(userData)
      });
    });

    it('rejects invalid email format', async () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toContain('email');
    });
  });
});
```

### End-to-End Tests with Playwright
```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management Flow', () => {
  test('complete user registration and login', async ({ page }) => {
    // Registration
    await page.goto('/register');
    await page.fill('[data-testid=name-input]', 'Test User');
    await page.fill('[data-testid=email-input]', 'test@example.com');
    await page.fill('[data-testid=password-input]', 'secure123');
    await page.click('[data-testid=register-button]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome, Test User')).toBeVisible();

    // Logout
    await page.click('[data-testid=user-menu]');
    await page.click('[data-testid=logout-button]');
    await expect(page).toHaveURL('/login');
  });

  test('displays validation errors for invalid input', async ({ page }) => {
    await page.goto('/register');
    await page.click('[data-testid=register-button]');

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });
});
```

## Test Organization Standards

### Directory Structure
```
├── src/
│   ├── components/
│   │   ├── __tests__/          # Component unit tests
│   │   └── UserCard/
│       │   ├── UserCard.tsx
│       │   └── UserCard.test.tsx
├── server/
│   ├── __tests__/              # API and service tests
│   │   ├── api/
│   │   ├── services/
│   │   └── test-helpers.ts
├── tests/
│   ├── e2e/                    # Playwright tests
│   └── fixtures/               # Test data
```

### Test Helper Utilities
```typescript
// server/__tests__/test-helpers.ts
import { db } from '../storage';

export async function createTestUser(overrides = {}) {
  return db.users.create({
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  });
}

export async function cleanupDb() {
  await db.users.deleteAll();
  await db.projects.deleteAll();
}

export function mockFirebaseAuth() {
  return {
    uid: 'test-uid',
    email: 'test@example.com'
  };
}
```

## Coverage Requirements

### Jest Coverage Configuration
```json
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'server/**/*.{ts,js}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html']
};
```

### Pre-commit Coverage Check
```bash
# Run before any commit
npm test -- --coverage --watchAll=false
```

## Best Practices

### DO
- Write tests BEFORE implementing features (TDD)
- Use descriptive test names that explain behavior
- Test both happy path and error conditions
- Mock external dependencies (APIs, databases)
- Use data-testid attributes for E2E element selection
- Clean up test data after each test
- Maintain 80% minimum coverage
- Group related tests with describe blocks

### DON'T
- Test implementation details, focus on behavior
- Write tests that depend on other tests
- Use random data that makes tests flaky
- Skip testing error handling
- Ignore failing tests
- Use CSS selectors in E2E tests (use data-testid)
- Mock everything - test real integrations when possible

## Test Command Standards
```json
// package.json scripts
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:all": "npm run test:coverage && npm run test:e2e"
}
```

## CI/CD Integration
```yaml
# .github/workflows/test.yml
- name: Run unit tests with coverage
  run: npm run test:coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3

- name: Run E2E tests
  run: npm run test:e2e
```

## Debugging Test Failures
```typescript
// Add debugging helpers
test('debug failing test', async () => {
  // Visual debugging for E2E
  await page.pause(); // Playwright inspector
  
  // Jest debugging
  screen.debug(); // Print current DOM
  console.log(screen.getByRole('button').outerHTML);
});
```

## Integration with Other Playbooks
- **NODE-EXPRESS.md**: API testing patterns for Express routes
- **REACT-HOOKS.md**: Testing custom hooks with React Testing Library
- **FIREBASE.md**: Mocking Firebase services in tests
- **DOCKER.md**: Running tests in containerized environments
- **TYPESCRIPT.md**: Type-safe test utilities and mocking