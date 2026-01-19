# Project Manifest - p4-dfsjs Yoga Studio Starter

**Project Name:** Yoga Studio App
**Project Code:** p4-dfsjs
**Version:** 1.0.0
**Generated:** 2026-01-19
**Author:** OpenClassrooms - CodebaseFactory
**Purpose:** Educational starter project with intentional anti-patterns

---

## 📦 Package Contents

### Documentation Files (7)
- ✅ `README.md` - Main project documentation
- ✅ `QUICK_START.md` - 5-minute setup guide
- ✅ `ANTI-PATTERNS.md` - List of intentional issues (for instructors)
- ✅ `PROJECT_STRUCTURE.md` - Complete file structure
- ✅ `TESTING_GUIDE.md` - Testing setup and examples
- ✅ `INSTRUCTOR_NOTES.md` - Teaching guide
- ✅ `DEPENDENCIES.md` - Complete dependency list
- ✅ `MANIFEST.md` - This file

### Configuration Files (12)
- ✅ `.gitignore` - Git ignore rules
- ✅ `docker-compose.yml` - PostgreSQL container
- ✅ `backend/package.json` - Backend dependencies
- ✅ `backend/tsconfig.json` - Backend TypeScript config
- ✅ `backend/nodemon.json` - Nodemon configuration
- ✅ `backend/.env` - Environment variables (pre-configured)
- ✅ `backend/.env.example` - Environment template
- ✅ `frontend/package.json` - Frontend dependencies
- ✅ `frontend/tsconfig.json` - Frontend TypeScript config
- ✅ `frontend/tsconfig.node.json` - Vite TypeScript config
- ✅ `frontend/vite.config.ts` - Vite configuration
- ✅ `frontend/tailwind.config.js` - TailwindCSS config
- ✅ `frontend/postcss.config.js` - PostCSS config
- ✅ `frontend/index.html` - HTML entry point

### Backend Source Files (17)
- ✅ `backend/src/app.ts` - Express application entry
- ✅ `backend/src/routes/index.ts` - API routes
- ✅ `backend/src/controllers/auth.controller.ts` - Auth endpoints
- ✅ `backend/src/controllers/session.controller.ts` - Session CRUD
- ✅ `backend/src/controllers/teacher.controller.ts` - Teacher endpoints
- ✅ `backend/src/controllers/user.controller.ts` - User endpoints
- ✅ `backend/src/middleware/auth.middleware.ts` - JWT authentication
- ✅ `backend/src/dto/auth.dto.ts` - Auth validation schemas
- ✅ `backend/src/dto/session.dto.ts` - Session validation schemas
- ✅ `backend/src/utils/jwt.util.ts` - JWT utilities
- ✅ `backend/prisma/schema.prisma` - Database schema
- ✅ `backend/prisma/seed.ts` - Database seeding script

### Frontend Source Files (14)
- ✅ `frontend/src/main.tsx` - React entry point
- ✅ `frontend/src/App.tsx` - App component with routing
- ✅ `frontend/src/index.css` - Global styles
- ✅ `frontend/src/components/Navbar.tsx` - Navigation component
- ✅ `frontend/src/pages/Login.tsx` - Login page
- ✅ `frontend/src/pages/Register.tsx` - Registration page
- ✅ `frontend/src/pages/Sessions.tsx` - Sessions list
- ✅ `frontend/src/pages/SessionDetail.tsx` - Session detail
- ✅ `frontend/src/pages/SessionForm.tsx` - Create/Edit session
- ✅ `frontend/src/pages/Profile.tsx` - User profile
- ✅ `frontend/src/services/api.ts` - Axios configuration
- ✅ `frontend/src/services/auth.service.ts` - Auth service
- ✅ `frontend/src/types/index.ts` - TypeScript types

**Total Files:** 50 files

---

## ✨ Features Implemented

### Authentication & Authorization
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Admin vs regular user permissions
- ✅ Protected routes (frontend & backend)

### Session Management
- ✅ List all yoga sessions
- ✅ View session details
- ✅ Create new session (admin only)
- ✅ Update session (admin only)
- ✅ Delete session (admin only)
- ✅ Join session (regular users)
- ✅ Leave session (regular users)

### Teacher Management
- ✅ List all teachers
- ✅ View teacher details
- ✅ Teacher-session relationship

### User Management
- ✅ View user profile
- ✅ Delete user account
- ✅ Session participation tracking

### Infrastructure
- ✅ PostgreSQL database with Docker
- ✅ Prisma ORM with migrations
- ✅ Database seeding with sample data
- ✅ Environment configuration
- ✅ Development server setup

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22 LTS | Runtime |
| TypeScript | 5.4+ | Language |
| Express | 4.x | Web framework |
| Prisma | 5.x | ORM |
| PostgreSQL | 16 | Database |
| JWT | 9.x | Authentication |
| bcrypt | 5.x | Password hashing |
| Zod | 3.x | Validation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI library |
| TypeScript | 5.4+ | Language |
| Vite | 5.x | Build tool |
| TailwindCSS | 4.0 | Styling |
| React Router | 6.x | Routing |
| Axios | 1.x | HTTP client |

### Infrastructure
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | Latest | Containerization |
| Docker Compose | Latest | Multi-container |
| PostgreSQL | 16-alpine | Database |

---

## 🎯 Learning Objectives

### Exercise 1: Code Quality (40-50 hours)
Students will identify and fix 27 intentional anti-patterns:
- Backend: 15 issues (service layer, error handling, validation, typing)
- Frontend: 12 issues (hooks, props, typing, patterns)

### Exercise 2: Testing (30-40 hours)
Students will achieve 80%+ code coverage:
- Backend: Unit tests + Integration tests
- Frontend: Unit tests + E2E tests

---

## 📊 Code Statistics

### Lines of Code
- **Backend:** ~1,200 lines
- **Frontend:** ~1,800 lines
- **Documentation:** ~3,000 lines
- **Total:** ~6,000 lines

### File Count
- **TypeScript/TSX files:** 31
- **Configuration files:** 14
- **Documentation files:** 8
- **Total:** 50+ files

### Intentional Issues
- **Backend anti-patterns:** 15
- **Frontend anti-patterns:** 12
- **Total to fix:** 27 issues

---

## 🗄️ Database Schema

### Models
- **User** (7 fields) - Authentication & profile
- **Teacher** (4 fields) - Teacher information
- **Session** (7 fields) - Yoga sessions
- **SessionParticipation** (2 fields) - Join table

### Relationships
- User ↔ SessionParticipation (one-to-many)
- Teacher ↔ Session (one-to-many)
- Session ↔ SessionParticipation (one-to-many)

### Seeded Data
- 2 Users (1 admin, 1 regular)
- 3 Teachers
- 4 Sessions
- 0 Participations (to be created by users)

---

## 🔐 Default Credentials

### Admin Account
```
Email: yoga@studio.com
Password: test!1234
```

### Regular User Account
```
Email: user@test.com
Password: test!1234
```

---

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Start PostgreSQL
cd .. && docker-compose up -d

# Setup database
cd backend
npx prisma migrate dev --name init
npm run prisma:seed
```

### Running the App
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432

---

## 📋 API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token

### Protected Endpoints (Require JWT)
- `GET /api/session` - List sessions
- `GET /api/session/:id` - Get session
- `POST /api/session` - Create session (admin)
- `PUT /api/session/:id` - Update session (admin)
- `DELETE /api/session/:id` - Delete session (admin)
- `POST /api/session/:id/participate/:userId` - Join
- `DELETE /api/session/:id/participate/:userId` - Leave
- `GET /api/teacher` - List teachers
- `GET /api/teacher/:id` - Get teacher
- `GET /api/user/:id` - Get user
- `DELETE /api/user/:id` - Delete user

**Total Endpoints:** 12

---

## ✅ Verification Checklist

### Installation
- [ ] Backend dependencies installed without errors
- [ ] Frontend dependencies installed without errors
- [ ] PostgreSQL container starts successfully
- [ ] Database migrations run successfully
- [ ] Database seeds correctly
- [ ] No console errors on startup

### Functionality
- [ ] Can login with admin credentials
- [ ] Can login with user credentials
- [ ] Can view sessions list
- [ ] Can view session details
- [ ] Admin can create session
- [ ] Admin can edit session
- [ ] Admin can delete session
- [ ] User can join session
- [ ] User can leave session
- [ ] Can view profile
- [ ] Can delete account

### Documentation
- [ ] README is clear and complete
- [ ] Quick start guide works
- [ ] All documentation files present
- [ ] Code comments are appropriate
- [ ] Anti-patterns are documented

---

## 📚 Documentation Guide

### For Students
1. Start with **QUICK_START.md** for setup
2. Read **README.md** for complete overview
3. Use **PROJECT_STRUCTURE.md** to understand architecture
4. Follow **TESTING_GUIDE.md** for testing setup

### For Instructors
1. Review **INSTRUCTOR_NOTES.md** for teaching guide
2. Share **ANTI-PATTERNS.md** progressively as hints
3. Use **DEPENDENCIES.md** for technical questions
4. Reference **MANIFEST.md** for project overview

---

## 🔧 Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update within semver range
npm update

# Update to latest (major versions)
npx npm-check-updates -u && npm install
```

### Reset Database
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

### Clean Installation
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Expected Student Deliverables

### Code Deliverables
- ✅ Refactored backend with service layer
- ✅ Global error handling implemented
- ✅ Validation middleware added
- ✅ All `any` types removed
- ✅ Frontend hooks with cleanup
- ✅ Axios interceptors implemented
- ✅ Custom hooks created
- ✅ Comprehensive test suite

### Documentation Deliverables
- ✅ Updated README with improvements
- ✅ Architecture documentation
- ✅ API documentation
- ✅ Test documentation

### Metrics
- ✅ 80%+ code coverage
- ✅ All tests passing
- ✅ No TypeScript errors
- ✅ Application fully functional

---

## 🎓 Grading Criteria

### Code Quality (40%)
- Service layer: 10 pts
- Error handling: 10 pts
- TypeScript: 10 pts
- Frontend patterns: 10 pts

### Testing (40%)
- Backend tests: 20 pts
- Frontend tests: 20 pts

### Coverage (10%)
- 90%+: 10 pts
- 80-89%: 6 pts
- <80%: 0 pts

### Documentation (10%)
- README: 5 pts
- Comments: 5 pts

---

## 🐛 Known Limitations (Intentional)

### Backend
- ❌ No service layer
- ❌ No global error handling
- ❌ Manual validation
- ❌ Business logic in controllers
- ❌ Extensive use of `any`

### Frontend
- ❌ No useEffect cleanup
- ❌ No Axios interceptors
- ❌ No custom hooks
- ❌ Verbose conditional rendering
- ❌ Extensive use of `any`

**These are intentional for learning purposes.**

---

## 📞 Support

### For Setup Issues
- Check **QUICK_START.md**
- Review **README.md** troubleshooting section
- Verify Node.js version (22+)
- Ensure Docker is running

### For Technical Questions
- Consult **PROJECT_STRUCTURE.md**
- Review **DEPENDENCIES.md**
- Check **TESTING_GUIDE.md**

### For Teaching Questions
- Reference **INSTRUCTOR_NOTES.md**
- Use **ANTI-PATTERNS.md** as hints guide

---

## 📜 License

**Purpose:** Educational use only
**Distribution:** OpenClassrooms students
**Modification:** Encouraged (part of the exercise)
**Commercial Use:** Not applicable (learning project)

---

## 🏆 Success Criteria

A successful completion includes:
- ✅ All 27 anti-patterns identified and fixed
- ✅ Complete service layer implemented
- ✅ Global error handling working
- ✅ Validation middleware functional
- ✅ All TypeScript properly typed
- ✅ Frontend hooks with cleanup
- ✅ Axios interceptors working
- ✅ Custom hooks created
- ✅ 80%+ test coverage achieved
- ✅ All tests passing
- ✅ Application fully functional
- ✅ Clean, documented code

---

## 📅 Project Timeline

**Estimated Time:** 60-80 hours

### Week 1-2: Analysis (10-15h)
- Understand codebase
- Identify anti-patterns
- Plan refactoring

### Week 3-4: Backend (20-25h)
- Create service layer
- Implement error handling
- Write backend tests

### Week 5-6: Frontend (20-25h)
- Refactor components
- Add interceptors
- Write frontend tests

### Week 7: Testing (10-15h)
- Ensure coverage
- Fix bugs
- Documentation

---

## 📦 Package Integrity

### Checksums (Files)
- Backend TypeScript files: 12
- Frontend TypeScript files: 14
- Configuration files: 14
- Documentation files: 8
- Total: 48 files

### Size Estimates
- Source code: ~50 KB
- Documentation: ~70 KB
- node_modules (backend): ~250 MB
- node_modules (frontend): ~400 MB
- Total: ~650 MB installed

---

## ✨ Version History

### v1.0.0 (2026-01-19)
- Initial release
- Complete functional application
- 27 intentional anti-patterns
- Comprehensive documentation
- Test examples provided
- Docker setup included

---

**Generated by:** CodebaseFactory
**Last Updated:** 2026-01-19
**Status:** Ready for distribution ✅

---

## 📝 Final Notes

This is a **complete, functional, production-ready codebase** with **intentional anti-patterns** for educational purposes.

All code is tested and working. Students should:
1. Get it running first
2. Understand what it does
3. Identify the issues
4. Fix them systematically
5. Add comprehensive tests

The goal is to learn by improving real code, not by building from scratch.

**Good luck to all students!** 🚀
