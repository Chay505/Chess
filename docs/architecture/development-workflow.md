# Development Workflow

## Local Setup

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with Clerk keys, DATABASE_URL

# Initialize database
npx prisma migrate dev --name init
npx prisma generate

# Start dev server
pnpm dev
```

## Development Commands

```bash
pnpm dev              # Start Next.js dev server
npx prisma studio     # Database GUI
pnpm test             # Unit tests (Vitest)
pnpm test:e2e         # E2E tests (Playwright)
pnpm lint             # ESLint
pnpm build            # Production build
```

## Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Backend (.env):**
```bash
DATABASE_URL=postgresql://user:pass@region.railway.app:5432/railway?pgbouncer=true&connection_limit=1
RESEND_API_KEY=re_...
CLERK_SECRET_KEY=sk_test_...
```

---
