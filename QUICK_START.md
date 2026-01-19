# Quick Start Guide

This guide will help you get the Yoga Studio application running in less than 5 minutes.

## Prerequisites

Make sure you have installed:
- Node.js 22+ ([download](https://nodejs.org/))
- Docker Desktop ([download](https://www.docker.com/products/docker-desktop))

## Step 1: Install Dependencies

Open two terminal windows.

**Terminal 1 - Backend:**
```bash
cd p4-dfsjs-starter/backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd p4-dfsjs-starter/frontend
npm install
```

## Step 2: Start Database

From the project root directory:
```bash
cd p4-dfsjs-starter
docker-compose up -d
```

Wait for the database to be ready (about 10-15 seconds).

## Step 3: Setup Database Schema

In Terminal 1 (backend):
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

You should see:
```
✓ Admin user created: yoga@studio.com
✓ Regular user created: user@test.com
✓ Teachers created
✓ Sessions created
✓ Seed completed successfully!
```

## Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```

Wait until you see:
```
Server is running on port 8080
Environment: development
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Wait until you see:
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

## Step 5: Open the Application

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

## Login Credentials

**Admin Account:**
- Email: `yoga@studio.com`
- Password: `test!1234`

**Regular User Account:**
- Email: `user@test.com`
- Password: `test!1234`

## What You Should See

1. **Home/Sessions Page**: List of 4 yoga sessions
2. **Admin users can**:
   - Create new sessions
   - Edit existing sessions
   - Delete sessions
3. **Regular users can**:
   - View sessions
   - Join/leave sessions
   - View their profile
   - Delete their account

## Verify Everything Works

### Test 1: Login
1. Click "Login" in the navbar
2. Enter: `yoga@studio.com` / `test!1234`
3. You should be redirected to the sessions page

### Test 2: View a Session
1. Click "View Details" on any session
2. You should see the full session description and teacher info

### Test 3: Create a Session (Admin only)
1. Login as admin (`yoga@studio.com`)
2. Click "Create Session" button
3. Fill in the form and submit
4. You should see your new session in the list

### Test 4: Join a Session (Regular user)
1. Logout and login as `user@test.com` / `test!1234`
2. Click "View Details" on any session
3. Click "Join Session"
4. Participants count should increase

## Troubleshooting

### Database won't start
```bash
# Check if port 5432 is already in use
lsof -i :5432

# If something is using it, stop it or change the port in docker-compose.yml
```

### Port 8080 already in use
```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change the port in backend/.env
PORT=8081
```

### Port 3000 already in use
```bash
# Vite will automatically suggest port 3001
# Or you can change it in frontend/vite.config.ts
```

### Prisma client errors
```bash
cd backend
npx prisma generate
npx prisma migrate reset  # WARNING: This will delete all data!
npm run prisma:seed
```

### "Cannot connect to database"
```bash
# Make sure Docker is running
docker ps

# Restart the database
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

## API Testing with curl

You can also test the API directly:

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"yoga@studio.com","password":"test!1234"}'
```

### Get Sessions (replace TOKEN with the token from login)
```bash
curl http://localhost:8080/api/session \
  -H "Authorization: Bearer TOKEN"
```

## Development Tools

### Prisma Studio (Database GUI)
```bash
cd backend
npm run prisma:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

### API Health Check
```bash
curl http://localhost:8080/api/health
```

## Next Steps

Once everything is running:

1. **Explore the code** - Look at the controllers, services, and components
2. **Identify anti-patterns** - See ANTI-PATTERNS.md for a detailed list
3. **Plan your improvements** - Decide which issues to tackle first
4. **Write tests** - Create comprehensive test suites
5. **Refactor** - Improve the code quality step by step

## Stopping the Application

### Stop the servers
Press `Ctrl+C` in both terminal windows

### Stop the database
```bash
docker-compose down
```

### Stop and remove all data
```bash
docker-compose down -v
```

## Need Help?

Check the full README.md for more detailed information.

Happy coding!
