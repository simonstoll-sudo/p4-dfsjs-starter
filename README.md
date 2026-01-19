# Yoga Studio App - Starter Project

This is a starter codebase for a Full Stack Yoga Studio application. The project is designed as a learning exercise where students will:
1. Identify and fix intentional anti-patterns in the code
2. Write comprehensive tests (unit, integration, and e2e) to achieve 80% code coverage

## Tech Stack

### Backend
- Node.js 22 LTS
- Express.js 4.x
- TypeScript 5.4+ (Strict Mode)
- Prisma ORM
- PostgreSQL 16
- Zod (validation)
- JWT (authentication)
- bcrypt (password hashing)

### Frontend
- React 19 (Hooks only)
- TypeScript 5.4+ (Strict Mode)
- Vite 5.x
- TailwindCSS 4.0
- React Router 6.x
- Axios

### Infrastructure
- Docker + Docker Compose
- PostgreSQL container

## Features

### Authentication
- User registration
- User login with JWT tokens

### Sessions Management
- List all yoga sessions
- View session details
- Create new sessions (admin only)
- Update sessions (admin only)
- Delete sessions (admin only)
- Join/leave sessions (regular users)

### Teachers
- View list of teachers
- View teacher details

### User Profile
- View user profile
- Delete user account

## Prerequisites

- Node.js 22 LTS or higher
- Docker and Docker Compose
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd p4-dfsjs-starter
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Set up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd ../backend
cp .env.example .env
```

The default configuration should work with Docker Compose:

```env
DATABASE_URL="postgresql://yogauser:yogapass@localhost:5432/yogastudio"
JWT_SECRET="your-secret-key-change-me-in-production"
PORT=8080
NODE_ENV=development
```

### 5. Start PostgreSQL with Docker

From the project root:

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port 5432.

### 6. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

### 7. Seed the Database

```bash
npm run prisma:seed
```

This will create:
- 1 admin user: `yoga@studio.com` / `test!1234`
- 1 regular user: `user@test.com` / `test!1234`
- 3 teachers
- 4 yoga sessions

## Running the Application

### Start the Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:8080`

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## Default Credentials

**Admin User:**
- Email: `yoga@studio.com`
- Password: `test!1234`

**Regular User:**
- Email: `user@test.com`
- Password: `test!1234`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Sessions
- `GET /api/session` - Get all sessions (protected)
- `GET /api/session/:id` - Get session by ID (protected)
- `POST /api/session` - Create session (admin only)
- `PUT /api/session/:id` - Update session (admin only)
- `DELETE /api/session/:id` - Delete session (admin only)
- `POST /api/session/:id/participate/:userId` - Join session (protected)
- `DELETE /api/session/:id/participate/:userId` - Leave session (protected)

### Teachers
- `GET /api/teacher` - Get all teachers (protected)
- `GET /api/teacher/:id` - Get teacher by ID (protected)

### Users
- `GET /api/user/:id` - Get user by ID (protected)
- `DELETE /api/user/:id` - Delete user account (protected)

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  admin     Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  sessions  SessionParticipation[]
}

model Teacher {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  sessions  Session[]
}

model Session {
  id          Int       @id @default(autoincrement())
  name        String
  date        DateTime
  description String
  teacherId   Int
  teacher     Teacher   @relation(fields: [teacherId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  participants SessionParticipation[]
}

model SessionParticipation {
  sessionId Int
  userId    Int
  session   Session @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([sessionId, userId])
}
```

## Development Scripts

### Backend

```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed the database
npm run prisma:studio    # Open Prisma Studio
```

### Frontend

```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Project Structure

```
p4-dfsjs-starter/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Auth middleware
│   │   ├── dto/              # Zod validation schemas
│   │   ├── utils/            # JWT utilities
│   │   ├── routes/           # API routes
│   │   └── app.ts            # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Database seeding
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/            # React page components
│   │   ├── components/       # Reusable components
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## Learning Objectives

### Exercise 1: Code Quality Improvements
Students should identify and fix the following intentional anti-patterns:

**Backend:**
- Repetitive try/catch blocks in controllers (should use global error handler)
- Controllers calling Prisma directly (should use service layer)
- Business logic in controllers (should be in services)
- Manual validations with if/else (should use Zod schemas properly)
- Usage of `any` type (should use proper TypeScript types)

**Frontend:**
- useEffect without cleanup (missing AbortController)
- Props typed with `any` (should have proper interfaces)
- Return types not specified (should be explicit)
- Verbose conditional rendering (should use && or ternary)
- Usage of `any` type everywhere (should use proper TypeScript types)

### Exercise 2: Testing
Students should write comprehensive tests:
- Unit tests for services, utilities, and components
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Achieve at least 80% code coverage

## Troubleshooting

### Database connection issues
```bash
# Check if PostgreSQL is running
docker ps

# Restart PostgreSQL
docker-compose restart postgres

# View logs
docker-compose logs postgres
```

### Port already in use
```bash
# Check what's using port 8080
lsof -i :8080

# Check what's using port 3000
lsof -i :3000

# Kill the process if needed
kill -9 <PID>
```

### Prisma issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

## License

This project is for educational purposes only.
