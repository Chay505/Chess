# Coding Standards

## Critical Rules

- **Type Sharing:** Define shared types in `lib/types/`, never duplicate
- **API Calls:** Server Components fetch with Prisma directly, Client Components use `lib/api/`
- **Environment Variables:** Access via `lib/config.ts`, never direct `process.env`
- **Error Handling:** All Route Handlers use try/catch with `AppError`
- **File Size Validation:** Always enforce 50MB limit before BYTEA storage
- **Auth Checks:** Always call `await auth()` in protected Route Handlers
- **Prisma Queries:** Use repository layer, never direct `prisma.*` in handlers

## Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Components | PascalCase | `StudentDashboard.tsx` |
| Hooks | camelCase + 'use' | `useDownload.ts` |
| Services | camelCase + 'Service' | `studentService.ts` |
| DB Tables | snake_case (plural) | `students` |
| DB Columns | camelCase | `clerkUserId` |

---
