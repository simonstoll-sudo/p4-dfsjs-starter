# Anti-Patterns Documentation (For Instructors)

This document lists all intentional anti-patterns included in the starter codebase. These are meant to be identified and fixed by students as part of their learning exercise.

## Backend Anti-Patterns

### 1. Repetitive Try/Catch Blocks
**Location:** All controllers (`auth.controller.ts`, `session.controller.ts`, `teacher.controller.ts`, `user.controller.ts`)

**Problem:** Every controller method has its own try/catch block, leading to code duplication.

**Example:**
```typescript
async login(req: Request, res: Response) {
  try {
    // ... logic
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
```

**Solution:** Implement a global error handling middleware and use async handlers or wrap middleware.

---

### 2. Controllers Calling Prisma Directly
**Location:** All controllers

**Problem:** Controllers directly import and use Prisma client instead of using a service layer.

**Example:**
```typescript
const prisma = new PrismaClient();

async login(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { email } });
}
```

**Solution:** Create service classes that encapsulate database operations:
- `AuthService`
- `SessionService`
- `TeacherService`
- `UserService`

---

### 3. Business Logic in Controllers
**Location:** All controllers

**Problem:** Controllers contain business logic like validations, searches, and data transformations.

**Examples:**
- Checking if user is admin in `session.controller.ts`
- Verifying if user already participates in session
- Checking if teacher exists before creating session
- Password comparison in `auth.controller.ts`

**Solution:** Move business logic to service layer. Controllers should only:
- Extract data from request
- Call service methods
- Return formatted responses

---

### 4. Manual Validations with if/else
**Location:** All controllers

**Problem:** Manual validation with verbose if/else statements instead of using Zod schemas.

**Example:**
```typescript
if (!email) {
  return res.status(400).json({ message: 'Email is required' });
}
if (!password) {
  return res.status(400).json({ message: 'Password is required' });
}
if (typeof email !== 'string') {
  return res.status(400).json({ message: 'Email must be a string' });
}
```

**Solution:** Use Zod schemas (already defined in `dto/` folder) with validation middleware.

---

### 5. Usage of `any` Type
**Location:** Throughout all controllers

**Problem:** Using `any` type defeats TypeScript's type safety.

**Examples:**
```typescript
const response: any = { ... };
catch (error: any) { ... }
```

**Solution:** Define proper types and interfaces:
- Create response DTOs
- Use proper error types
- Define controller method return types

---

## Frontend Anti-Patterns

### 1. useEffect Without Cleanup
**Location:** All pages that fetch data (`Sessions.tsx`, `SessionDetail.tsx`, `SessionForm.tsx`, `Profile.tsx`)

**Problem:** No AbortController to cancel requests when component unmounts, can cause memory leaks and race conditions.

**Example:**
```typescript
useEffect(() => {
  fetchSessions();
}, []);
```

**Solution:** Use AbortController:
```typescript
useEffect(() => {
  const controller = new AbortController();
  fetchSessions(controller.signal);
  return () => controller.abort();
}, []);
```

---

### 2. Props Typed with `any`
**Location:** `Navbar.tsx`, `App.tsx` (PrivateRoute)

**Problem:** Component props are typed with `any` instead of proper interfaces.

**Example:**
```typescript
function Navbar(props: any) { ... }
function PrivateRoute({ children }: any) { ... }
```

**Solution:** Define proper prop interfaces:
```typescript
interface NavbarProps {
  // Define actual props if needed
}

interface PrivateRouteProps {
  children: React.ReactNode;
}
```

---

### 3. Function Return Types Not Specified
**Location:** All components and service functions

**Problem:** Functions don't specify return types, especially async functions returning `any`.

**Example:**
```typescript
const handleSubmit = async (e: any): Promise<any> => { ... }
const fetchSessions = async (): Promise<any> => { ... }
```

**Solution:** Specify proper return types:
```typescript
const handleSubmit = async (e: React.FormEvent): Promise<void> => { ... }
const fetchSessions = async (): Promise<Session[]> => { ... }
```

---

### 4. Verbose Conditional Rendering
**Location:** All components

**Problem:** Using ternary operators with null when && would be clearer.

**Example:**
```typescript
{error ? (
  <div className="...">
    {error}
  </div>
) : null}

{user && user.admin ? (
  <button>Admin Action</button>
) : null}
```

**Solution:** Use && operator for conditional rendering:
```typescript
{error && (
  <div className="...">
    {error}
  </div>
)}

{user?.admin && (
  <button>Admin Action</button>
)}
```

---

### 5. State Variables Typed with `any`
**Location:** All pages

**Problem:** State variables are explicitly typed with `any`.

**Example:**
```typescript
const [sessions, setSessions] = useState<any>([]);
const [loading, setLoading] = useState<any>(true);
const [error, setError] = useState<any>('');
```

**Solution:** Use proper types:
```typescript
const [sessions, setSessions] = useState<Session[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>('');
```

---

### 6. No Global Axios Interceptor
**Location:** `services/api.ts`

**Problem:** Token is added manually to every request instead of using interceptors.

**Example:**
```typescript
const response = await api.get('/session', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

**Solution:** Add Axios request interceptor:
```typescript
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### 7. No Error Response Interceptor
**Location:** `services/api.ts`

**Problem:** Error handling is done manually in each component.

**Solution:** Add Axios response interceptor to handle common errors (401, 403, etc.) globally.

---

## Summary of Expected Improvements

### Backend
1. Create service layer (`services/` folder)
2. Implement global error handling middleware
3. Use Zod validation middleware
4. Replace `any` with proper types
5. Move business logic to services
6. Add proper TypeScript interfaces for all data structures

### Frontend
1. Add cleanup to all useEffect hooks
2. Define proper prop interfaces for all components
3. Specify return types for all functions
4. Replace verbose ternaries with && operator
5. Replace `any` types with proper types
6. Implement Axios interceptors
7. Create custom hooks for common patterns (useAuth, useFetch, etc.)

### Testing (to be added by students)
1. Unit tests for services
2. Unit tests for utilities
3. Unit tests for React components
4. Integration tests for API endpoints
5. E2E tests for critical user flows
6. Achieve 80%+ code coverage

## Files Count

**Backend:**
- 4 Controllers: auth, session, teacher, user
- 1 Middleware: auth
- 2 DTOs: auth, session
- 1 Util: jwt
- 1 Route file
- 1 App entry point
- 1 Prisma schema
- 1 Seed file

**Frontend:**
- 6 Pages: Login, Register, Sessions, SessionDetail, SessionForm, Profile
- 1 Component: Navbar
- 2 Services: api, auth
- 1 Types file
- 1 App component
- 1 Main entry point

**Total Files:** ~30 code files + configuration files
