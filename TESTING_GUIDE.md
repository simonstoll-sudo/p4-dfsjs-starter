# Testing Guide

This guide helps you set up and write comprehensive tests for the Yoga Studio application.

## Testing Strategy

To achieve 80%+ code coverage, you need to implement:

1. **Backend Tests**
   - Unit tests for services (to be created during refactoring)
   - Unit tests for utilities (JWT)
   - Unit tests for middleware
   - Integration tests for API endpoints

2. **Frontend Tests**
   - Unit tests for components
   - Unit tests for services
   - Integration tests for user flows
   - E2E tests for critical paths

## Setup Testing Environment

### Backend Testing Setup

#### 1. Install Testing Dependencies

```bash
cd backend
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
```

#### 2. Create Jest Configuration

Create `backend/jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

#### 3. Add Test Scripts to package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

#### 4. Setup Test Database

Create `backend/.env.test`:

```env
DATABASE_URL="postgresql://yogauser:yogapass@localhost:5432/yogastudio_test"
JWT_SECRET="test-secret-key"
PORT=8081
NODE_ENV=test
```

### Frontend Testing Setup

#### 1. Install Testing Dependencies

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom @vitest/ui
npm install --save-dev @playwright/test  # For E2E tests
```

#### 2. Create Vitest Configuration

Update `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

#### 3. Add Test Scripts to package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test"
  }
}
```

## Backend Test Examples

### 1. Unit Test - JWT Utility

Create `backend/src/utils/__tests__/jwt.util.test.ts`:

```typescript
import { generateToken, verifyToken } from '../jwt.util';

describe('JWT Utility', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(1);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should generate different tokens for different user IDs', () => {
      const token1 = generateToken(1);
      const token2 = generateToken(2);
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const userId = 123;
      const token = generateToken(userId);
      const decoded = verifyToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(userId);
    });

    it('should return null for an invalid token', () => {
      const decoded = verifyToken('invalid-token');
      expect(decoded).toBeNull();
    });

    it('should return null for an expired token', () => {
      // Mock an expired token scenario
      const decoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired');
      expect(decoded).toBeNull();
    });
  });
});
```

### 2. Unit Test - Auth Middleware

Create `backend/src/middleware/__tests__/auth.middleware.test.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../auth.middleware';
import { generateToken } from '../../utils/jwt.util';

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('should call next() with valid token', () => {
    const token = generateToken(1);
    mockRequest.headers = { authorization: `Bearer ${token}` };

    authMiddleware(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockRequest.userId).toBe(1);
  });

  it('should return 401 if no authorization header', () => {
    authMiddleware(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'No token provided',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockRequest.headers = { authorization: 'Bearer invalid-token' };

    authMiddleware(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Invalid or expired token',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
```

### 3. Integration Test - Auth Controller

Create `backend/tests/integration/auth.test.ts`:

```typescript
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

describe('Auth API', () => {
  beforeAll(async () => {
    // Clean database
    await prisma.sessionParticipation.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.teacher.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body.firstName).toBe('John');
    });

    it('should return 400 if email already exists', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password123',
          firstName: 'Jane',
          lastName: 'Doe',
        });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password456',
          firstName: 'John',
          lastName: 'Smith',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await prisma.user.create({
        data: {
          email: 'login@example.com',
          password: hashedPassword,
          firstName: 'Login',
          lastName: 'User',
          admin: false,
        },
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('login@example.com');
    });

    it('should return 401 with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
```

## Frontend Test Examples

### 1. Component Test - Navbar

Create `frontend/src/components/__tests__/Navbar.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '../Navbar';
import { authService } from '../../services/auth.service';

vi.mock('../../services/auth.service');

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login and register links when not authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render sessions and logout when authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      id: 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Sessions')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should show Create Session link for admin users', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      id: 1,
      email: 'admin@test.com',
      firstName: 'Admin',
      lastName: 'User',
      admin: true,
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Create Session')).toBeInTheDocument();
  });
});
```

### 2. Page Test - Login

Create `frontend/src/pages/__tests__/Login.test.tsx`:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../Login';
import { authService } from '../../services/auth.service';

vi.mock('../../services/auth.service');
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('Login to Yoga Studio')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
      token: 'fake-token',
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/sessions');
    });
  });

  it('should display error message on failed login', async () => {
    vi.mocked(authService.login).mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
```

### 3. E2E Test with Playwright

Create `frontend/tests/e2e/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[type="email"]', 'yoga@studio.com');
    await page.fill('input[type="password"]', 'test!1234');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/sessions');
    await expect(page.locator('text=Logout')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[type="email"]', 'wrong@test.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});

test.describe('Session Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="email"]', 'yoga@studio.com');
    await page.fill('input[type="password"]', 'test!1234');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/sessions');
  });

  test('admin can create a new session', async ({ page }) => {
    await page.click('text=Create Session');
    await page.waitForURL('**/sessions/create');

    await page.fill('input[name="name"]', 'Test Yoga Session');
    await page.fill('input[name="date"]', '2026-12-31');
    await page.fill('textarea[name="description"]', 'Test description');
    await page.selectOption('select[name="teacherId"]', '1');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('**/sessions');
    await expect(page.locator('text=Test Yoga Session')).toBeVisible();
  });
});
```

## Test Coverage Goals

### Backend
- **Controllers:** 85%+ (after refactoring to services)
- **Services:** 90%+ (to be created)
- **Middleware:** 95%+
- **Utils:** 95%+
- **Routes:** 80%+

### Frontend
- **Components:** 85%+
- **Pages:** 80%+
- **Services:** 90%+
- **Hooks:** 90%+ (to be created)

## Running Tests

### Backend
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
```

### Frontend
```bash
cd frontend
npm test                 # Run all tests
npm run test:ui          # Interactive UI
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests
```

## Best Practices

### General
1. Write tests BEFORE refactoring
2. Aim for high coverage but focus on quality
3. Test behavior, not implementation
4. Use descriptive test names
5. Follow AAA pattern: Arrange, Act, Assert

### Backend
1. Use separate test database
2. Clean up data between tests
3. Mock external dependencies
4. Test edge cases and error scenarios
5. Use supertest for API integration tests

### Frontend
1. Use React Testing Library (not Enzyme)
2. Test user interactions, not implementation details
3. Mock API calls with MSW or vi.mock
4. Use data-testid sparingly
5. Test accessibility (use screen readers)

## Continuous Integration

Add to `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: yogauser
          POSTGRES_PASSWORD: yogapass
          POSTGRES_DB: yogastudio_test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: cd backend && npm ci
      - run: cd backend && npm test

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run test:coverage
```

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Supertest Documentation](https://github.com/ladjs/supertest)

Happy testing!
