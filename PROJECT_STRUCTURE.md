# Project Structure

Complete structure of the Yoga Studio starter project.

```
p4-dfsjs-starter/
│
├── README.md                      # Complete project documentation
├── QUICK_START.md                 # 5-minute setup guide
├── ANTI-PATTERNS.md               # List of intentional anti-patterns (for instructors)
├── PROJECT_STRUCTURE.md           # This file
├── .gitignore                     # Git ignore rules
├── docker-compose.yml             # PostgreSQL container configuration
│
├── backend/                       # Node.js/Express/TypeScript backend
│   ├── package.json               # Backend dependencies
│   ├── tsconfig.json              # TypeScript configuration (strict mode)
│   ├── nodemon.json               # Nodemon configuration for dev
│   ├── .env                       # Environment variables (pre-configured)
│   ├── .env.example               # Environment variables template
│   │
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (PostgreSQL)
│   │   └── seed.ts                # Database seeding script
│   │
│   └── src/
│       ├── app.ts                 # Express application entry point
│       │
│       ├── controllers/           # Request handlers (with intentional anti-patterns)
│       │   ├── auth.controller.ts      # Login, Register
│       │   ├── session.controller.ts   # CRUD sessions, participate/unparticipate
│       │   ├── teacher.controller.ts   # List and get teachers
│       │   └── user.controller.ts      # Get user, delete account
│       │
│       ├── middleware/
│       │   └── auth.middleware.ts      # JWT authentication middleware
│       │
│       ├── dto/                   # Zod validation schemas
│       │   ├── auth.dto.ts             # Login, Register schemas
│       │   └── session.dto.ts          # Create/Update session schemas
│       │
│       ├── utils/
│       │   └── jwt.util.ts             # JWT token generation and verification
│       │
│       └── routes/
│           └── index.ts                # All API routes definition
│
└── frontend/                      # React/TypeScript/Vite frontend
    ├── package.json               # Frontend dependencies
    ├── tsconfig.json              # TypeScript configuration (strict mode)
    ├── tsconfig.node.json         # TypeScript config for Vite
    ├── vite.config.ts             # Vite configuration with proxy
    ├── tailwind.config.js         # TailwindCSS configuration
    ├── postcss.config.js          # PostCSS configuration
    ├── index.html                 # HTML entry point
    │
    └── src/
        ├── main.tsx               # React entry point
        ├── App.tsx                # App component with routing
        ├── index.css              # Global styles with Tailwind imports
        │
        ├── components/
        │   └── Navbar.tsx         # Navigation bar component
        │
        ├── pages/                 # Page components
        │   ├── Login.tsx          # Login page
        │   ├── Register.tsx       # Registration page
        │   ├── Sessions.tsx       # Sessions list page
        │   ├── SessionDetail.tsx  # Single session detail page
        │   ├── SessionForm.tsx    # Create/Edit session form (admin)
        │   └── Profile.tsx        # User profile page
        │
        ├── services/
        │   ├── api.ts             # Axios instance configuration
        │   └── auth.service.ts    # Authentication service functions
        │
        └── types/
            └── index.ts           # TypeScript type definitions
```

## File Count Summary

### Backend (17 files)
- **Controllers:** 4 files (auth, session, teacher, user)
- **Middleware:** 1 file (auth)
- **DTOs:** 2 files (auth, session)
- **Utils:** 1 file (jwt)
- **Routes:** 1 file (index)
- **Prisma:** 2 files (schema, seed)
- **Config:** 5 files (package.json, tsconfig.json, nodemon.json, .env, .env.example)
- **Entry:** 1 file (app.ts)

### Frontend (20 files)
- **Pages:** 6 files (Login, Register, Sessions, SessionDetail, SessionForm, Profile)
- **Components:** 1 file (Navbar)
- **Services:** 2 files (api, auth.service)
- **Types:** 1 file (index)
- **Config:** 7 files (package.json, tsconfig, vite, tailwind, postcss, index.html)
- **Entry:** 3 files (main.tsx, App.tsx, index.css)

### Root Level (5 files)
- README.md
- QUICK_START.md
- ANTI-PATTERNS.md
- PROJECT_STRUCTURE.md
- docker-compose.yml
- .gitignore

**Total:** ~42 files (excluding node_modules, dist, and generated files)

## Key Features by File

### Backend

#### Controllers
- **auth.controller.ts**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration

- **session.controller.ts**
  - `GET /api/session` - List all sessions
  - `GET /api/session/:id` - Get session by ID
  - `POST /api/session` - Create session (admin)
  - `PUT /api/session/:id` - Update session (admin)
  - `DELETE /api/session/:id` - Delete session (admin)
  - `POST /api/session/:id/participate/:userId` - Join session
  - `DELETE /api/session/:id/participate/:userId` - Leave session

- **teacher.controller.ts**
  - `GET /api/teacher` - List all teachers
  - `GET /api/teacher/:id` - Get teacher by ID

- **user.controller.ts**
  - `GET /api/user/:id` - Get user profile
  - `DELETE /api/user/:id` - Delete user account

#### Database Models (Prisma)
- **User** - id, email, firstName, lastName, password, admin, timestamps
- **Teacher** - id, firstName, lastName, timestamps
- **Session** - id, name, date, description, teacherId, timestamps
- **SessionParticipation** - sessionId, userId (composite key)

### Frontend

#### Pages
- **Login.tsx** - Login form with email/password
- **Register.tsx** - Registration form with validation
- **Sessions.tsx** - Grid view of all sessions with create/delete (admin)
- **SessionDetail.tsx** - Full session info with join/leave/edit/delete actions
- **SessionForm.tsx** - Create/edit session form (admin only)
- **Profile.tsx** - User profile with account deletion

#### Routing
- `/` → Redirect to `/sessions`
- `/login` → Login page (public)
- `/register` → Register page (public)
- `/sessions` → Sessions list (protected)
- `/sessions/:id` → Session detail (protected)
- `/sessions/create` → Create session (protected, admin only)
- `/sessions/edit/:id` → Edit session (protected, admin only)
- `/profile` → User profile (protected)

## Technology Versions

### Backend
- Node.js: 22 LTS
- TypeScript: 5.4+
- Express: 4.x
- Prisma: 5.x
- PostgreSQL: 16
- JWT: 9.x
- bcrypt: 5.x
- Zod: 3.x

### Frontend
- React: 19.x
- TypeScript: 5.4+
- Vite: 5.x
- TailwindCSS: 4.0
- React Router: 6.x
- Axios: 1.x

### Infrastructure
- Docker (PostgreSQL container)
- Docker Compose

## Environment Configuration

### Backend (.env)
```env
DATABASE_URL="postgresql://yogauser:yogapass@localhost:5432/yogastudio"
JWT_SECRET="yoga-studio-secret-key-2024-change-in-production"
PORT=8080
NODE_ENV=development
```

### Frontend (Vite proxy)
- Development server: http://localhost:3000
- API proxy: `/api/*` → `http://localhost:8080/api/*`

## Seeded Data

The `prisma/seed.ts` file creates:

### Users
1. **Admin** - yoga@studio.com / test!1234
2. **Regular User** - user@test.com / test!1234

### Teachers
1. Margot Delahaye
2. Hélène Thiercelin
3. David Martin

### Sessions
1. Yoga Vinyasa (Teacher: Margot Delahaye, Date: 2026-02-15)
2. Yoga Hatha (Teacher: Hélène Thiercelin, Date: 2026-02-20)
3. Yoga Ashtanga (Teacher: Margot Delahaye, Date: 2026-02-25)
4. Yin Yoga (Teacher: David Martin, Date: 2026-03-01)

## Development Ports

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **PostgreSQL:** localhost:5432
- **Prisma Studio:** http://localhost:5555 (when running `npm run prisma:studio`)

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token + user info
3. Frontend stores token in localStorage
4. Token is included in all protected API requests
5. Backend verifies token via `authMiddleware`

## Data Flow Example (Get Sessions)

1. User navigates to `/sessions`
2. `Sessions.tsx` component mounts
3. `useEffect` calls `fetchSessions()`
4. Axios GET request to `/api/session` with Bearer token
5. Backend `authMiddleware` verifies token
6. `SessionController.getAll()` fetches from Prisma
7. Response sent with sessions array
8. Frontend updates state and renders session cards

## Key Patterns (and Anti-Patterns)

### Backend Patterns
- ✅ Express.js with TypeScript
- ✅ Prisma ORM for database access
- ✅ JWT authentication
- ✅ Zod schemas defined (but not used properly)
- ❌ No service layer (controllers call Prisma directly)
- ❌ No global error handling
- ❌ Manual validation instead of middleware
- ❌ Business logic in controllers
- ❌ Extensive use of `any` type

### Frontend Patterns
- ✅ React 19 with hooks
- ✅ TypeScript with strict mode
- ✅ React Router for navigation
- ✅ TailwindCSS for styling
- ❌ No useEffect cleanup (AbortController)
- ❌ Props typed with `any`
- ❌ No return types specified
- ❌ Verbose conditional rendering
- ❌ Manual token management (no interceptor)
- ❌ Extensive use of `any` type

## Testing Recommendations (To Be Implemented)

### Backend Tests
- **Unit Tests:**
  - Services (to be created)
  - Utils (JWT)
  - Middleware (auth)

- **Integration Tests:**
  - All API endpoints
  - Database operations
  - Authentication flows

### Frontend Tests
- **Unit Tests:**
  - Components (isolated)
  - Services
  - Custom hooks (to be created)

- **Integration Tests:**
  - Page flows
  - Form submissions
  - API integration

- **E2E Tests:**
  - Complete user journeys
  - Login → Browse → Join session
  - Admin → Create → Edit → Delete session

**Target Coverage:** 80%+

## Next Steps for Students

1. ✅ Setup and run the application (use QUICK_START.md)
2. ✅ Explore the codebase
3. 📝 Identify all anti-patterns (reference ANTI-PATTERNS.md)
4. 🔧 Plan refactoring strategy
5. 🧪 Write tests for existing functionality
6. ♻️ Refactor code to fix anti-patterns
7. 🧪 Ensure all tests still pass
8. 📊 Verify code coverage reaches 80%+

## Useful Commands

### Backend
```bash
npm run dev              # Start development server
npm run build            # Build TypeScript
npm start                # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npm run prisma:studio    # Open Prisma Studio
```

### Frontend
```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Docker
```bash
docker-compose up -d     # Start PostgreSQL
docker-compose down      # Stop PostgreSQL
docker-compose logs      # View logs
docker-compose ps        # List running containers
```
