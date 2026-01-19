# Project Dependencies

Complete list of all dependencies used in the Yoga Studio application.

## Backend Dependencies

### Production Dependencies

```json
{
  "@prisma/client": "^5.20.0",        // Prisma ORM client for database access
  "bcrypt": "^5.1.1",                 // Password hashing
  "cors": "^2.8.5",                   // Cross-Origin Resource Sharing middleware
  "dotenv": "^16.4.5",                // Environment variables loader
  "express": "^4.19.2",               // Web application framework
  "jsonwebtoken": "^9.0.2",           // JWT token generation/verification
  "zod": "^3.23.8"                    // Schema validation library
}
```

### Development Dependencies

```json
{
  "@types/bcrypt": "^5.0.2",          // TypeScript types for bcrypt
  "@types/cors": "^2.8.17",           // TypeScript types for cors
  "@types/express": "^4.17.21",       // TypeScript types for Express
  "@types/jsonwebtoken": "^9.0.6",    // TypeScript types for JWT
  "@types/node": "^22.5.0",           // TypeScript types for Node.js
  "nodemon": "^3.1.4",                // Auto-restart on file changes
  "prisma": "^5.20.0",                // Prisma CLI for migrations
  "ts-node": "^10.9.2",               // TypeScript execution for Node.js
  "typescript": "^5.5.4"              // TypeScript compiler
}
```

### Testing Dependencies (To Be Added)

```json
{
  "jest": "^29.7.0",                  // Testing framework
  "ts-jest": "^29.1.2",               // TypeScript support for Jest
  "@types/jest": "^29.5.12",          // TypeScript types for Jest
  "supertest": "^6.3.4",              // HTTP assertion library
  "@types/supertest": "^6.0.2"        // TypeScript types for supertest
}
```

## Frontend Dependencies

### Production Dependencies

```json
{
  "axios": "^1.7.7",                  // HTTP client for API calls
  "react": "^19.0.0",                 // React library
  "react-dom": "^19.0.0",             // React DOM rendering
  "react-router-dom": "^6.26.2"       // Routing library for React
}
```

### Development Dependencies

```json
{
  "@types/react": "^19.0.1",          // TypeScript types for React
  "@types/react-dom": "^19.0.1",      // TypeScript types for React DOM
  "@vitejs/plugin-react": "^4.3.1",   // Vite plugin for React
  "autoprefixer": "^10.4.20",         // PostCSS plugin for vendor prefixes
  "postcss": "^8.4.47",               // CSS transformation tool
  "tailwindcss": "^4.0.0",            // Utility-first CSS framework
  "typescript": "^5.5.4",             // TypeScript compiler
  "vite": "^5.4.7"                    // Build tool and dev server
}
```

### Testing Dependencies (To Be Added)

```json
{
  "vitest": "^1.5.0",                           // Testing framework (Vite native)
  "@vitest/ui": "^1.5.0",                       // Vitest UI for browser testing
  "@testing-library/react": "^14.2.1",          // React testing utilities
  "@testing-library/jest-dom": "^6.4.2",        // Custom Jest matchers for DOM
  "@testing-library/user-event": "^14.5.2",     // User interaction simulation
  "jsdom": "^24.0.0",                           // DOM implementation for tests
  "@playwright/test": "^1.42.0"                 // E2E testing framework
}
```

## Infrastructure

### Docker

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine            # PostgreSQL 16 (Alpine Linux)
```

## Node.js Version

```
Required: Node.js 22 LTS or higher
```

## Package Manager

```
Supported: npm, yarn, pnpm
Recommended: npm (comes with Node.js)
```

## Dependency Installation Commands

### First Time Setup

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Install with Testing Dependencies

```bash
# Backend (after adding test dependencies to package.json)
cd backend
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest

# Frontend (after adding test dependencies to package.json)
cd frontend
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
```

## Security Considerations

### Known Vulnerabilities

Before deploying to production, always run:

```bash
npm audit
npm audit fix
```

### Production Recommendations

1. **Update JWT_SECRET** - Change from default value
2. **Use environment variables** - Never commit .env files
3. **Update dependencies** - Keep all packages up to date
4. **Use HTTPS** - Enable SSL in production
5. **Rate limiting** - Add express-rate-limit
6. **Helmet.js** - Add security headers

### Additional Production Dependencies

```bash
npm install helmet express-rate-limit compression morgan
```

```json
{
  "helmet": "^7.1.0",                 // Security headers
  "express-rate-limit": "^7.1.5",     // Rate limiting
  "compression": "^1.7.4",            // Response compression
  "morgan": "^1.10.0"                 // HTTP request logger
}
```

## Optional Development Tools

### Backend

```bash
# Prisma Studio (database GUI)
npx prisma studio

# ESLint (code linting)
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier (code formatting)
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Frontend

```bash
# ESLint for React
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Storybook (component development)
npx storybook@latest init
```

## Dependency Size Estimates

### Backend
- **node_modules size:** ~250 MB
- **Compiled output (dist):** ~50 KB
- **Total with dependencies:** ~250 MB

### Frontend
- **node_modules size:** ~400 MB
- **Production build:** ~500 KB (gzipped ~150 KB)
- **Total with dependencies:** ~400 MB

## Compatibility Matrix

| Package | Version | Node.js | TypeScript |
|---------|---------|---------|------------|
| Express | 4.19.2 | >=18.0.0 | >=5.0.0 |
| Prisma | 5.20.0 | >=18.0.0 | >=5.0.0 |
| React | 19.0.0 | >=18.0.0 | >=5.0.0 |
| Vite | 5.4.7 | >=18.0.0 | >=5.0.0 |
| TailwindCSS | 4.0.0 | >=18.0.0 | N/A |

## Browser Compatibility

### Supported Browsers

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Opera: Latest 2 versions

### Minimum Requirements

- ES2022 support
- CSS Grid support
- Fetch API support
- WebAssembly (for some dependencies)

## Build Sizes

### Backend Production Build

```bash
npm run build
# Output: dist/ folder (~50 KB)
```

### Frontend Production Build

```bash
npm run build
# Output: dist/ folder
```

**Typical sizes:**
- JavaScript: ~150 KB (gzipped: ~50 KB)
- CSS: ~10 KB (gzipped: ~3 KB)
- Total: ~160 KB (gzipped: ~53 KB)

## Update Strategy

### Check for Updates

```bash
# Check outdated packages
npm outdated

# Update to latest within semver range
npm update

# Update to absolute latest (major versions)
npx npm-check-updates -u
npm install
```

### Update Schedule Recommendations

- **Security updates:** Immediately
- **Minor updates:** Monthly
- **Major updates:** Quarterly (with testing)
- **Framework updates (React, Express):** Carefully, with full test coverage

## Troubleshooting Dependencies

### Common Issues

#### Prisma Client Out of Sync

```bash
cd backend
npx prisma generate
```

#### TypeScript Compilation Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Peer Dependency Warnings

```bash
# Install with legacy peer deps
npm install --legacy-peer-deps
```

#### Port Conflicts

```bash
# Check what's using port 8080
lsof -i :8080

# Check what's using port 3000
lsof -i :3000
```

## License Information

### Open Source Licenses

- **MIT License:** Most dependencies
- **Apache 2.0:** Some React ecosystem packages
- **ISC:** Some Node.js packages

All dependencies are compatible with commercial use.

### License Compliance

Run license checker:

```bash
npx license-checker --summary
```

## Development vs Production

### Development Only

- nodemon
- ts-node
- @types/* packages
- vite
- testing libraries
- dev tools

### Production Required

- Express, Prisma, JWT, bcrypt (backend)
- React, React Router, Axios (frontend)
- All dependencies listed in `dependencies` sections

### Production Optimization

```bash
# Backend - only production dependencies
cd backend
npm install --production

# Frontend - build for production
cd frontend
npm run build
# Serve from dist/ folder with a static server
```

## Future Considerations

### Potential Additions

1. **Validation:** class-validator, joi
2. **Documentation:** swagger, typedoc
3. **Monitoring:** sentry, winston
4. **Caching:** redis, node-cache
5. **Email:** nodemailer
6. **File Upload:** multer
7. **Image Processing:** sharp
8. **WebSockets:** socket.io
9. **GraphQL:** apollo-server (if needed)
10. **State Management:** zustand, redux-toolkit (if needed)

## Summary

- **Total Production Dependencies:** 11 (Backend: 7, Frontend: 4)
- **Total Dev Dependencies:** 17 (Backend: 9, Frontend: 8)
- **Total Testing Dependencies:** 9 (to be added)
- **Total Size:** ~650 MB (node_modules only)
- **Production Bundle:** <200 KB (frontend gzipped)

All dependencies are actively maintained and widely used in production environments.
