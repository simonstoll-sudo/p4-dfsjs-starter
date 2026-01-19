# Project Verification Checklist

Use this checklist to verify that the Yoga Studio starter project is complete and functional.

## 📁 File Structure Verification

### Root Level Files
- [ ] README.md
- [ ] QUICK_START.md
- [ ] ANTI-PATTERNS.md
- [ ] PROJECT_STRUCTURE.md
- [ ] TESTING_GUIDE.md
- [ ] INSTRUCTOR_NOTES.md
- [ ] DEPENDENCIES.md
- [ ] MANIFEST.md
- [ ] VERIFICATION.md (this file)
- [ ] .gitignore
- [ ] docker-compose.yml

### Backend Files
- [ ] backend/package.json
- [ ] backend/tsconfig.json
- [ ] backend/nodemon.json
- [ ] backend/.env
- [ ] backend/.env.example
- [ ] backend/prisma/schema.prisma
- [ ] backend/prisma/seed.ts
- [ ] backend/src/app.ts
- [ ] backend/src/routes/index.ts
- [ ] backend/src/controllers/auth.controller.ts
- [ ] backend/src/controllers/session.controller.ts
- [ ] backend/src/controllers/teacher.controller.ts
- [ ] backend/src/controllers/user.controller.ts
- [ ] backend/src/middleware/auth.middleware.ts
- [ ] backend/src/dto/auth.dto.ts
- [ ] backend/src/dto/session.dto.ts
- [ ] backend/src/utils/jwt.util.ts

### Frontend Files
- [ ] frontend/package.json
- [ ] frontend/tsconfig.json
- [ ] frontend/tsconfig.node.json
- [ ] frontend/vite.config.ts
- [ ] frontend/tailwind.config.js
- [ ] frontend/postcss.config.js
- [ ] frontend/index.html
- [ ] frontend/src/main.tsx
- [ ] frontend/src/App.tsx
- [ ] frontend/src/index.css
- [ ] frontend/src/components/Navbar.tsx
- [ ] frontend/src/pages/Login.tsx
- [ ] frontend/src/pages/Register.tsx
- [ ] frontend/src/pages/Sessions.tsx
- [ ] frontend/src/pages/SessionDetail.tsx
- [ ] frontend/src/pages/SessionForm.tsx
- [ ] frontend/src/pages/Profile.tsx
- [ ] frontend/src/services/api.ts
- [ ] frontend/src/services/auth.service.ts
- [ ] frontend/src/types/index.ts

**Expected Total:** 47 files (excluding node_modules)

---

## 🔧 Installation Verification

### Prerequisites Check
```bash
# Check Node.js version (should be 22+)
node --version

# Check npm version
npm --version

# Check Docker
docker --version

# Check Docker Compose
docker-compose --version
```

### Backend Installation
```bash
cd backend
npm install
# Should complete without errors
# Check for node_modules folder
ls -la node_modules
```

### Frontend Installation
```bash
cd frontend
npm install
# Should complete without errors
# Check for node_modules folder
ls -la node_modules
```

---

## 🐳 Docker Verification

### Start PostgreSQL
```bash
docker-compose up -d
```

**Expected output:**
```
Creating network "p4-dfsjs-starter_default" with the default driver
Creating volume "p4-dfsjs-starter_postgres_data" with default driver
Creating yoga-studio-db ... done
```

### Check Container Status
```bash
docker ps
```

**Expected output:** One container running with:
- Name: yoga-studio-db
- Image: postgres:16-alpine
- Port: 5432

### Test Database Connection
```bash
docker exec -it yoga-studio-db psql -U yogauser -d yogastudio -c "SELECT version();"
```

**Expected:** PostgreSQL version information displayed

---

## 🗄️ Database Verification

### Run Migrations
```bash
cd backend
npx prisma migrate dev --name init
```

**Expected output:**
```
✓ Generated Prisma Client
✓ Migration applied
```

### Verify Schema
```bash
npx prisma studio
```

**Expected:** Prisma Studio opens at http://localhost:5555
- Models visible: User, Teacher, Session, SessionParticipation

### Seed Database
```bash
npm run prisma:seed
```

**Expected output:**
```
Starting seed...
Admin user created: yoga@studio.com
Regular user created: user@test.com
Teachers created
Sessions created
Seed completed successfully!
```

### Verify Seeded Data
```bash
npx prisma studio
```

**Check:**
- [ ] 2 Users exist
- [ ] 3 Teachers exist
- [ ] 4 Sessions exist
- [ ] Admin user email: yoga@studio.com
- [ ] Regular user email: user@test.com

---

## 🚀 Application Verification

### Start Backend
```bash
cd backend
npm run dev
```

**Expected output:**
```
[nodemon] starting `ts-node src/app.ts`
Server is running on port 8080
Environment: development
```

**Verify:**
- [ ] No compilation errors
- [ ] Server starts on port 8080
- [ ] Health check: `curl http://localhost:8080/api/health`

### Start Frontend
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

**Verify:**
- [ ] No compilation errors
- [ ] Vite dev server starts on port 3000
- [ ] Browser opens automatically (optional)

---

## 🧪 Functionality Testing

### Test 1: Access Frontend
1. Open browser to http://localhost:3000
2. **Expected:** Redirects to /sessions
3. **Expected:** Navbar shows "Login" and "Register" links

### Test 2: Login Page
1. Navigate to http://localhost:3000/login
2. **Expected:** Login form displayed
3. **Expected:** Email and password fields visible
4. **Expected:** "Don't have an account?" link present

### Test 3: Admin Login
1. Enter email: `yoga@studio.com`
2. Enter password: `test!1234`
3. Click "Login"
4. **Expected:** Redirects to /sessions
5. **Expected:** Navbar shows "Sessions", "Create Session", "Profile", "Logout"
6. **Expected:** 4 sessions displayed in grid
7. **Expected:** "Create Session" button visible

### Test 4: View Session Details
1. Click "View Details" on any session
2. **Expected:** Session detail page displays
3. **Expected:** Session name, date, teacher, description visible
4. **Expected:** Admin sees "Edit" and "Delete" buttons
5. **Expected:** "Back to Sessions" button visible

### Test 5: Create Session (Admin)
1. Click "Create Session" in navbar
2. Fill in form:
   - Name: "Test Session"
   - Date: Future date
   - Teacher: Select from dropdown
   - Description: Any text
3. Click "Create Session"
4. **Expected:** Redirects to /sessions
5. **Expected:** New session appears in list

### Test 6: Edit Session (Admin)
1. Go to any session detail page
2. Click "Edit" button
3. Change session name
4. Click "Update Session"
5. **Expected:** Redirects to /sessions
6. **Expected:** Session name updated

### Test 7: Delete Session (Admin)
1. Go to a session detail page
2. Click "Delete" button
3. Confirm deletion
4. **Expected:** Redirects to /sessions
5. **Expected:** Session removed from list

### Test 8: User Profile
1. Click "Profile" in navbar
2. **Expected:** Profile page displays
3. **Expected:** User info visible (name, email, account type)
4. **Expected:** "Delete Account" button visible

### Test 9: Logout
1. Click "Logout" in navbar
2. **Expected:** Redirects to /login
3. **Expected:** Navbar shows "Login" and "Register" links

### Test 10: Regular User Login
1. Login with `user@test.com` / `test!1234`
2. **Expected:** Redirects to /sessions
3. **Expected:** No "Create Session" button
4. **Expected:** Sessions displayed

### Test 11: Join Session (Regular User)
1. As regular user, go to session detail
2. Click "Join Session"
3. **Expected:** Success message or UI update
4. **Expected:** "Leave Session" button now visible
5. **Expected:** Participants count increased

### Test 12: Leave Session (Regular User)
1. From joined session, click "Leave Session"
2. **Expected:** Success message or UI update
3. **Expected:** "Join Session" button now visible
4. **Expected:** Participants count decreased

### Test 13: Register New User
1. Logout if logged in
2. Go to /register
3. Fill form:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "test@new.com"
   - Password: "password123"
4. Click "Register"
5. **Expected:** Redirects to /sessions
6. **Expected:** User is logged in

---

## 🔌 API Endpoint Testing

### Test Authentication Endpoints

#### POST /api/auth/login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"yoga@studio.com","password":"test!1234"}'
```

**Expected response:**
```json
{
  "id": 1,
  "email": "yoga@studio.com",
  "firstName": "Admin",
  "lastName": "Yoga",
  "admin": true,
  "token": "eyJhbGc..."
}
```

#### POST /api/auth/register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"api@test.com",
    "password":"password123",
    "firstName":"API",
    "lastName":"Test"
  }'
```

**Expected:** 201 status, user object with token

### Test Session Endpoints

#### GET /api/session (with token)
```bash
TOKEN="your_token_here"
curl http://localhost:8080/api/session \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** Array of sessions

#### GET /api/session/:id
```bash
curl http://localhost:8080/api/session/1 \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** Single session object

### Test Teacher Endpoints

#### GET /api/teacher
```bash
curl http://localhost:8080/api/teacher \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** Array of teachers (3 items)

### Test Without Token (Should Fail)
```bash
curl http://localhost:8080/api/session
```

**Expected:** 401 Unauthorized

---

## 📊 Code Quality Checks

### TypeScript Compilation

#### Backend
```bash
cd backend
npx tsc --noEmit
```

**Expected:** No errors (warnings about `any` are intentional)

#### Frontend
```bash
cd frontend
npx tsc --noEmit
```

**Expected:** No errors (warnings about `any` are intentional)

### Check for Anti-Patterns

#### Backend Anti-Patterns (Should exist)
1. [ ] Controllers have try/catch blocks in every method
2. [ ] Controllers call Prisma directly (no service layer)
3. [ ] Manual validations with if/else
4. [ ] Usage of `any` type
5. [ ] Business logic in controllers

#### Frontend Anti-Patterns (Should exist)
1. [ ] useEffect without cleanup (no AbortController)
2. [ ] Props typed with `any`
3. [ ] Functions return `any`
4. [ ] Verbose conditional rendering (ternary with null)
5. [ ] State variables typed with `any`

---

## 📝 Documentation Verification

### README.md
- [ ] Installation instructions clear
- [ ] Prerequisites listed
- [ ] Database setup explained
- [ ] Running instructions provided
- [ ] API endpoints documented
- [ ] Default credentials listed

### QUICK_START.md
- [ ] 5-minute setup guide
- [ ] Step-by-step commands
- [ ] Expected outputs shown
- [ ] Troubleshooting section

### ANTI-PATTERNS.md
- [ ] All 27 anti-patterns listed
- [ ] Backend issues explained (15)
- [ ] Frontend issues explained (12)
- [ ] Solutions suggested

### TESTING_GUIDE.md
- [ ] Testing setup instructions
- [ ] Test examples provided
- [ ] Backend test examples
- [ ] Frontend test examples
- [ ] E2E test examples

### INSTRUCTOR_NOTES.md
- [ ] Teaching guide complete
- [ ] Learning objectives clear
- [ ] Grading rubric provided
- [ ] Time estimates given

---

## 🎯 Final Verification

### Complete System Test
1. [ ] Docker container running
2. [ ] Database migrated and seeded
3. [ ] Backend running on port 8080
4. [ ] Frontend running on port 3000
5. [ ] Can login as admin
6. [ ] Can create/edit/delete session (admin)
7. [ ] Can login as regular user
8. [ ] Can join/leave session (user)
9. [ ] Can view profile
10. [ ] Can register new user
11. [ ] All API endpoints respond correctly
12. [ ] No console errors in browser
13. [ ] No server errors in terminal

### Code Quality
- [ ] All TypeScript files compile
- [ ] Anti-patterns are present (intentional)
- [ ] Application is fully functional
- [ ] Code is properly formatted

### Documentation
- [ ] All 8 markdown files present
- [ ] Documentation is clear and complete
- [ ] Examples are accurate
- [ ] Instructions work as written

---

## ✅ Sign-Off

When all items above are checked:

**Project Status:** ✅ VERIFIED

**Verified By:** _________________

**Date:** _________________

**Notes:**
_________________
_________________
_________________

---

## 🐛 Common Issues and Solutions

### Issue: Port already in use
**Solution:**
```bash
# Find and kill process on port 8080
lsof -i :8080
kill -9 <PID>

# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Issue: Database connection failed
**Solution:**
```bash
# Restart Docker container
docker-compose restart postgres

# Check container logs
docker-compose logs postgres
```

### Issue: Prisma client not generated
**Solution:**
```bash
cd backend
npx prisma generate
```

### Issue: TypeScript errors
**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend won't start
**Solution:**
```bash
# Check if node_modules exists
ls node_modules

# Reinstall if needed
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

---

## 📞 Support

If verification fails:
1. Check QUICK_START.md for setup issues
2. Review README.md troubleshooting section
3. Verify Node.js version (22+)
4. Ensure Docker is running
5. Check all files are present
6. Try clean installation

---

**Last Updated:** 2026-01-19
**Version:** 1.0.0
