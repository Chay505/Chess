# Epic 1: Foundation & Core Infrastructure

**Goal:** Establish development environment, core tech stack, and deployment pipeline with a minimal deployable application that validates the entire architecture works end-to-end. Deliver a production-ready "Hello World" with bilingual language switching and health check endpoint, proving Next.js 15 + Prisma + Railway Postgres + Vercel deployment + next-intl framework all integrate correctly.

## Story 1.1: Project Initialization & Repository Setup

As a **developer**,
I want **Next.js 15+ project initialized with TypeScript, ESLint, Prettier, and Git repository configured**,
so that **I have a clean foundation for development with consistent code quality standards**.

**Acceptance Criteria:**

1. Next.js 15+ project created using App Router architecture
2. TypeScript configured with strict mode enabled
3. ESLint and Prettier configured with recommended rules
4. Git repository initialized with `.gitignore` excluding `node_modules`, `.env*`, `.next`
5. GitHub repository created and initial commit pushed
6. `package.json` includes scripts for `dev`, `build`, `start`, `lint`, `format`
7. Project runs locally with `npm run dev` and displays default Next.js page
8. README includes basic project description and setup instructions

## Story 1.2: Tailwind CSS Configuration

As a **developer**,
I want **Tailwind CSS installed and configured with design tokens for the chess coaching brand**,
so that **I can rapidly build responsive, consistently styled UI components**.

**Acceptance Criteria:**

1. Tailwind CSS installed and configured in `tailwind.config.ts`
2. Custom color palette defined (primary, secondary, accent colors for chess coaching brand)
3. Typography settings configured for bilingual support (FR/EN character sets)
4. Responsive breakpoints defined (mobile: 640px, tablet: 1024px, desktop: 1280px)
5. Global CSS file imports Tailwind directives
6. Test page demonstrates Tailwind classes working (colors, typography, responsive utilities)
7. Dark mode configuration added (class-based strategy for future enhancement)

## Story 1.3: Railway Postgres Database Setup

As a **developer**,
I want **PostgreSQL database provisioned on Railway with SSL connection configured**,
so that **I have production-ready database infrastructure for storing application data**.

**Acceptance Criteria:**

1. Railway account created and PostgreSQL database provisioned
2. Database connection URL added to `.env.local` (excluded from Git)
3. SSL connection enforced in database configuration
4. Database accessible from local development environment
5. Connection pooling configured appropriately for Vercel serverless functions
6. `.env.example` file created documenting required environment variables (without actual secrets)
7. Railway environment variables configured for production deployment

## Story 1.4: Prisma ORM Setup & Initial Schema

As a **developer**,
I want **Prisma ORM installed with initial database schema including Student, Resource, and Feedback models**,
so that **I have type-safe database access and schema version control from the start**.

**Acceptance Criteria:**

1. Prisma installed and initialized with PostgreSQL provider
2. Prisma schema defines `Student`, `Resource`, `Feedback` models
3. `Resource` model includes `fileData` as `Bytes` type for BYTEA storage
4. Appropriate indexes defined on foreign keys and frequently queried fields
5. Initial migration created and applied to Railway database
6. Prisma Client generated and importable in TypeScript with full type safety
7. Prisma Studio accessible locally for database inspection (`npx prisma studio`)
8. Database seed script created (optional sample data for development)

## Story 1.5: Bilingual i18n Framework Setup

As a **developer**,
I want **next-intl configured for French and English language support with route-based locale switching**,
so that **all subsequent features can be built with bilingual content from the start**.

**Acceptance Criteria:**

1. `next-intl` installed and configured
2. Locale routing configured (`/en/*` and `/fr/*` routes)
3. Translation files created for `en` and `fr` locales (`messages/en.json`, `messages/fr.json`)
4. Language switcher component created (toggle between FR/EN)
5. Default locale set to English with browser detection fallback
6. Locale preference persisted in cookie
7. Test page demonstrates translated content rendering in both languages
8. Middleware configured to handle locale routing automatically

## Story 1.6: Vercel Deployment & CI/CD Pipeline

As a **developer**,
I want **Vercel project configured with automatic deployments from GitHub main branch**,
so that **every Git push triggers production deployment with zero manual intervention**.

**Acceptance Criteria:**

1. Vercel account created and project linked to GitHub repository
2. Environment variables configured in Vercel dashboard (database URL, etc.)
3. Production domain assigned (Vercel subdomain initially, custom domain later)
4. Automatic HTTPS/SSL certificate provisioned
5. Git push to `main` branch triggers automatic deployment
6. Preview deployments enabled for pull requests
7. Deployment succeeds and application accessible at production URL
8. Build logs accessible in Vercel dashboard for debugging

## Story 1.7: Health Check Endpoint & Deployment Validation

As a **developer**,
I want **health check API endpoint that verifies database connectivity and returns application status**,
so that **I can confirm the entire stack (frontend, API routes, database) works end-to-end in production**.

**Acceptance Criteria:**

1. API route created at `/api/health` (GET request)
2. Endpoint queries database (simple `SELECT 1` or Prisma query) to verify connectivity
3. Returns JSON response with status: `{ "status": "healthy", "database": "connected", "timestamp": "..." }`
4. Returns appropriate error response if database unreachable
5. Endpoint accessible in both local development and production deployment
6. Response time logged for performance monitoring
7. Homepage updated to include link to health check (for testing purposes)

## Story 1.8: Bilingual Homepage with Language Toggle

As a **prospective student**,
I want **bilingual homepage with working language toggle between French and English**,
so that **I can view content in my preferred language and confirm the platform supports both markets**.

**Acceptance Criteria:**

1. Homepage displays welcome message in current locale (FR or EN)
2. Language toggle button visible in header/navigation
3. Clicking toggle switches between `/en` and `/fr` routes
4. Content updates immediately when language changes
5. Selected language persists across page reloads (cookie storage)
6. Both French and English translations are grammatically correct and professional
7. Homepage includes placeholder sections for future content (About, Services, Contact)
8. Page fully responsive on mobile, tablet, desktop screen sizes

---
