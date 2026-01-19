# Instructor Notes - p4-dfsjs Starter Project

## Project Overview

This is a **fully functional** Full Stack Yoga Studio application designed as a learning exercise for OpenClassrooms students. The codebase intentionally contains anti-patterns that students must identify and fix while maintaining full test coverage.

## Learning Objectives

### Exercise 1: Code Quality & Refactoring (40-50 hours)
Students will identify and fix intentional anti-patterns in:
- Backend architecture (service layer, error handling, validation)
- TypeScript usage (removing `any`, proper typing)
- Frontend patterns (hooks, props, conditional rendering)
- API integration (interceptors, error handling)

### Exercise 2: Testing (30-40 hours)
Students will write comprehensive tests:
- Backend: Unit tests (services, utils, middleware) + Integration tests (API endpoints)
- Frontend: Unit tests (components) + Integration tests (user flows) + E2E tests
- Achieve 80%+ code coverage

## Project Statistics

### Codebase Size
- **Total Files:** 44 files
- **Backend Code:** 17 TypeScript files (~1,200 lines)
- **Frontend Code:** 20 TypeScript/TSX files (~1,800 lines)
- **Documentation:** 5 comprehensive guides
- **Configuration:** 12 config files

### Features Implemented
- ✅ Complete authentication (register, login, JWT)
- ✅ Session CRUD operations
- ✅ Teacher management
- ✅ User profile management
- ✅ Participation system (join/leave sessions)
- ✅ Admin vs regular user permissions
- ✅ Database seeding with sample data
- ✅ Docker PostgreSQL setup

### Tech Stack
- **Backend:** Node.js 22, Express 4, TypeScript 5.4+, Prisma ORM, PostgreSQL 16
- **Frontend:** React 19, TypeScript 5.4+, Vite 5, TailwindCSS 4.0, React Router 6
- **Infrastructure:** Docker Compose

## Anti-Patterns Summary

### Backend (15 intentional issues)
1. ❌ Try/catch repetition in every controller method
2. ❌ Controllers calling Prisma directly (no service layer)
3. ❌ Business logic in controllers
4. ❌ Manual validations instead of Zod middleware
5. ❌ Extensive use of `any` type
6. ❌ No global error handling middleware
7. ❌ Repetitive authorization checks
8. ❌ No request validation middleware
9. ❌ Mixed concerns in controllers
10. ❌ No separation of concerns

### Frontend (12 intentional issues)
1. ❌ useEffect without cleanup (no AbortController)
2. ❌ Props typed with `any`
3. ❌ Function return types not specified
4. ❌ Verbose conditional rendering (ternary with null)
5. ❌ State variables typed with `any`
6. ❌ No Axios interceptors (manual token management)
7. ❌ No global error handling
8. ❌ Repetitive API calls pattern
9. ❌ No custom hooks
10. ❌ No error boundaries

**Total:** ~27 anti-patterns to identify and fix

## Expected Student Solutions

### Backend Refactoring

#### 1. Create Service Layer
Students should create:
- `services/auth.service.ts` - Handle authentication logic
- `services/session.service.ts` - Handle session CRUD and participation
- `services/teacher.service.ts` - Handle teacher operations
- `services/user.service.ts` - Handle user operations

Controllers should only:
- Extract request data
- Call service methods
- Return formatted responses

#### 2. Global Error Handling
Create `middleware/error.middleware.ts`:
```typescript
export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ message });
};
```

#### 3. Validation Middleware
Create `middleware/validation.middleware.ts`:
```typescript
export const validate = (schema: ZodSchema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    next();
  };
};
```

Use in routes:
```typescript
router.post('/api/auth/login', validate(LoginSchema), authController.login);
```

#### 4. Proper TypeScript Types
Create `types/` folder with interfaces:
- `types/user.types.ts`
- `types/session.types.ts`
- `types/auth.types.ts`
- `types/express.types.ts` (for extending Express types)

### Frontend Refactoring

#### 1. useEffect Cleanup
```typescript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await api.get('/session', {
        signal: controller.signal
      });
      setData(response.data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);
```

#### 2. Axios Interceptors
In `services/api.ts`:
```typescript
// Request interceptor
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### 3. Custom Hooks
Create `hooks/` folder:
- `hooks/useAuth.ts` - Authentication state management
- `hooks/useFetch.ts` - Generic data fetching with cleanup
- `hooks/useSession.ts` - Session-specific operations

Example `useFetch.ts`:
```typescript
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await api.get<T>(url, {
          signal: controller.signal
        });
        setData(response.data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

#### 4. Proper TypeScript Types
Remove all `any` and add proper types:
```typescript
// Before (anti-pattern)
const [sessions, setSessions] = useState<any>([]);
const handleSubmit = async (e: any): Promise<any> => { ... }

// After (correct)
const [sessions, setSessions] = useState<Session[]>([]);
const handleSubmit = async (e: React.FormEvent): Promise<void> => { ... }
```

#### 5. Conditional Rendering
```typescript
// Before (verbose)
{error ? <div>{error}</div> : null}
{user && user.admin ? <button>Admin</button> : null}

// After (concise)
{error && <div>{error}</div>}
{user?.admin && <button>Admin</button>}
```

## Testing Strategy

### Backend Tests (Expected)

#### Unit Tests (~20 tests)
- ✅ JWT utilities (generateToken, verifyToken)
- ✅ Auth middleware (valid/invalid tokens)
- ✅ Services (all business logic)
- ✅ Validation schemas

#### Integration Tests (~25 tests)
- ✅ Auth endpoints (register, login)
- ✅ Session endpoints (CRUD + participate)
- ✅ Teacher endpoints (list, get)
- ✅ User endpoints (get, delete)

**Expected Coverage:** 85%+

### Frontend Tests (Expected)

#### Unit Tests (~30 tests)
- ✅ Components (Navbar)
- ✅ Pages (Login, Register, Sessions, etc.)
- ✅ Services (auth.service)
- ✅ Custom hooks

#### Integration Tests (~15 tests)
- ✅ Complete user flows
- ✅ Form submissions
- ✅ API integration

#### E2E Tests (~10 tests)
- ✅ Login flow
- ✅ Session management
- ✅ User profile
- ✅ Admin operations

**Expected Coverage:** 80%+

## Grading Rubric Suggestions

### Code Quality (40 points)
- **Service Layer Implementation (10 pts)**
  - All controllers refactored to use services
  - Proper separation of concerns

- **Error Handling (10 pts)**
  - Global error middleware implemented
  - Proper error types and handling

- **TypeScript Usage (10 pts)**
  - No `any` types remaining
  - Proper interfaces and types defined

- **Frontend Patterns (10 pts)**
  - useEffect cleanup implemented
  - Axios interceptors added
  - Custom hooks created
  - Proper component typing

### Testing (40 points)
- **Backend Tests (20 pts)**
  - Unit tests: 10 pts
  - Integration tests: 10 pts

- **Frontend Tests (20 pts)**
  - Unit tests: 10 pts
  - E2E tests: 10 pts

### Code Coverage (10 points)
- 90%+: 10 points
- 85-89%: 8 points
- 80-84%: 6 points
- 75-79%: 4 points
- <75%: 0 points

### Documentation (10 points)
- **README updated (5 pts)**
  - Clear setup instructions
  - Architecture explained

- **Code Comments (5 pts)**
  - Complex logic documented
  - API contracts documented

## Time Estimation

### Week 1-2: Analysis & Planning (10-15 hours)
- Understanding the codebase
- Identifying all anti-patterns
- Planning refactoring strategy
- Creating test plan

### Week 3-4: Backend Refactoring (20-25 hours)
- Creating service layer
- Implementing error handling
- Adding validation middleware
- Fixing TypeScript issues
- Writing backend tests

### Week 5-6: Frontend Refactoring (20-25 hours)
- Adding useEffect cleanup
- Implementing interceptors
- Creating custom hooks
- Fixing TypeScript issues
- Writing frontend tests

### Week 7: Testing & Coverage (10-15 hours)
- Ensuring 80%+ coverage
- Writing E2E tests
- Bug fixing
- Documentation updates

**Total: 60-80 hours**

## Common Student Mistakes to Watch For

### Backend
1. ❌ Creating services but keeping logic in controllers
2. ❌ Not properly handling async errors in middleware
3. ❌ Forgetting to disconnect Prisma in tests
4. ❌ Not testing error cases
5. ❌ Leaving console.logs in production code

### Frontend
1. ❌ Adding AbortController but not using signal in fetch
2. ❌ Creating interceptors but still adding token manually
3. ❌ Writing custom hooks but not following rules of hooks
4. ❌ Not cleaning up event listeners
5. ❌ Testing implementation instead of behavior

## Setup Verification Checklist

Before giving to students, verify:
- [ ] Docker Compose starts PostgreSQL successfully
- [ ] Backend dependencies install without errors
- [ ] Frontend dependencies install without errors
- [ ] Prisma migrations run successfully
- [ ] Database seeds correctly
- [ ] Backend starts on port 8080
- [ ] Frontend starts on port 3000
- [ ] Login works with provided credentials
- [ ] All CRUD operations function correctly
- [ ] Admin vs user permissions work
- [ ] Docker container stops cleanly

## Support Materials Provided

1. **README.md** - Complete project documentation
2. **QUICK_START.md** - 5-minute setup guide
3. **ANTI-PATTERNS.md** - Detailed list of issues (for instructors)
4. **PROJECT_STRUCTURE.md** - Complete file structure explanation
5. **TESTING_GUIDE.md** - Testing setup and examples
6. **INSTRUCTOR_NOTES.md** - This file

## Frequently Asked Questions

### Q: Should students use a different testing library?
A: The guide suggests Jest/Vitest, but students can use alternatives if they justify their choice.

### Q: Is 80% coverage mandatory?
A: Yes, but quality over quantity. Focus on meaningful tests.

### Q: Can students add new features?
A: No, focus should be on refactoring and testing existing code. New features are out of scope.

### Q: Should students deploy the application?
A: Not required but can be bonus points if done properly (Docker, CI/CD, etc.)

### Q: Can students change the database?
A: No, must use PostgreSQL with Prisma as specified.

### Q: What if students can't identify all anti-patterns?
A: Provide hints progressively. The ANTI-PATTERNS.md file can be shared partially.

## Success Metrics

A successful submission should have:
- ✅ All 27 anti-patterns fixed
- ✅ Service layer properly implemented
- ✅ Global error handling working
- ✅ All TypeScript `any` removed
- ✅ useEffect cleanup implemented
- ✅ Axios interceptors functional
- ✅ 80%+ test coverage
- ✅ All tests passing
- ✅ Application still fully functional
- ✅ Clean, documented code

## Additional Resources for Students

Recommend these resources:
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Effective TypeScript](https://effectivetypescript.com/)
- [React Testing Library Documentation](https://testing-library.com/react)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)

## Version History

- **v1.0.0** (2026-01-19) - Initial release
  - Complete functional application
  - 27 intentional anti-patterns
  - Comprehensive documentation
  - Test examples provided

## Contact & Support

For questions or issues with this starter project, please contact the curriculum team.

---

**Note to Instructors:** This is a pedagogical project. All anti-patterns are intentional and documented. Students should understand this is a learning exercise, not production code.
