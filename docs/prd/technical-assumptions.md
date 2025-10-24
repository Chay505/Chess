# Technical Assumptions

## Repository Structure: Monorepo

Single Next.js repository containing frontend, API routes, and database schema. All code lives in one repo for simplified deployment and development workflow.

**Rationale:** Solo coach operation with single fullstack application. Monorepo eliminates coordination overhead between multiple repositories and aligns with Next.js fullstack paradigm. Vercel deployment expects monorepo structure.

## Service Architecture

**Fullstack Monolith with Third-Party Service Integration**

- **Application:** Next.js 15+ (App Router) handles both frontend rendering and backend API routes in single deployment
- **Database:** PostgreSQL on Railway with Prisma ORM for type-safe queries and schema management
- **Authentication:** Clerk SDK integrated via middleware (externally managed service)
- **Booking:** Calendly embedded widget (externally managed service)
- **Payments:** Stripe payment links (manually created, externally managed service)
- **Email:** Resend for transactional emails (externally managed service)

**Rationale:** Monolith architecture minimizes complexity for MVP and solo developer maintenance. Third-party services handle complex domains (auth, payments, scheduling) rather than building custom solutions. This allows focus on core coaching platform features while leveraging battle-tested, compliant external services.

## Testing Requirements

**Unit + Integration Testing**

- **Unit Tests:** Vitest for utility functions, business logic, and data transformations
- **Integration Tests:** Playwright for critical user flows (booking → payment → portal access)
- **API Route Testing:** Vitest for file upload/download handlers and database operations
- **Manual Testing:** Instructor performs end-to-end validation with beta students before launch

**Scope:**
- Focus on file upload/download flows with authentication verification
- Test bilingual content rendering (FR/EN switching)
- **Out of Scope for MVP:** Full E2E test suite, unit tests for every component, load testing

**Rationale:** File upload/download with authentication is the highest-risk area. Integration tests provide confidence in critical paths without exhaustive unit test overhead. Manual testing with real students validates the full experience before marketing launch.

## Additional Technical Assumptions and Requests

**Frontend Framework:**
- **Next.js 15+ (App Router):** Server-side rendering for SEO, built-in API routes, optimal Vercel deployment, React Server Components, Turbopack bundler
- **TypeScript:** Type safety across frontend and backend reduces runtime errors
- **Tailwind CSS:** Rapid UI development with utility-first styling, easy responsive design
- **next-intl:** Internationalization library for FR/EN bilingual support with route-based locale switching

**Database & ORM:**
- **PostgreSQL on Railway:** Relational database with JSONB support, SSL connections, affordable pricing ($5-20/month)
- **Prisma ORM:** Type-safe database client, automatic migrations, schema version control
- **File Storage Strategy:** Store files as BYTEA (binary data) in PostgreSQL `Resource.fileData` column up to 50MB per file. For larger video files, store YouTube/Vimeo URLs instead of uploading.

**Hosting & Deployment:**
- **Vercel (Free Tier):** Automatic deployments from Git, edge network CDN, zero-config Next.js optimization
- **Railway Postgres:** Database hosting with SSL, automatic backups, environment variable management
- **Environment Variables:** Sensitive credentials (Clerk keys, Stripe keys, database URL) stored in Vercel environment settings and Railway secrets
- **Domain:** Custom domain (~$12/year) with automatic SSL via Vercel

**Third-Party Service Configuration:**
- **Clerk (Free Tier):** Email/password authentication, email verification, session management, role-based access (instructor vs. student)
- **Calendly (Free Plan):** 1 event type ("1-on-1 Chess Lesson"), embedded widget on public site
- **Stripe (Transaction Fees Only):** Payment Links created manually by instructor, shared with students after booking
- **Resend (Free Tier):** 100 emails/day for notifications (sufficient for MVP)

**Security & Compliance:**
- **HTTPS Enforced:** All routes require SSL via Vercel automatic certificates
- **Authentication Middleware:** Clerk middleware protects all `/dashboard/*` and `/admin/*` routes
- **File Access Control:** API routes serving files verify Clerk session and student ownership before returning file data
- **Environment Isolation:** Separate Vercel preview deployments for testing, production environment for live site
- **No Sensitive Data Storage:** Payment card data handled exclusively by Stripe (PCI compliance), passwords handled by Clerk

**Development Tools:**
- **Git:** Version control with GitHub repository
- **pnpm or npm:** Package management (pnpm preferred for speed and disk efficiency)
- **ESLint + Prettier:** Code quality and consistent formatting
- **Prisma Studio:** Database GUI for manual data inspection during development

**Performance Optimization:**
- **Next.js Image Optimization:** Automatic image resizing and WebP conversion for faster page loads
- **Static Page Generation:** Public marketing pages pre-rendered at build time for instant loading
- **API Route Caching:** External API responses cached when appropriate to reduce calls

**Locale & Internationalization:**
- **Supported Languages:** French (fr), English (en)
- **Default Language:** English (configurable)
- **Route Structure:** `/en/*` and `/fr/*` for locale-based routing
- **Language Detection:** Browser language preference with manual toggle override, preference stored in cookie

**Budget Constraints:**
- **Monthly Operating Costs Target:** $5-20/month
  - Railway Postgres: $5-20 (usage-based)
  - Domain: ~$1/month ($12/year)
  - All other services: Free tiers (Vercel, Clerk, Calendly, Resend, Stripe transaction fees only)

---
