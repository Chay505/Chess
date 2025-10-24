# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.6+ | Type-safe frontend and backend code | Industry standard for Next.js projects, catches errors at compile time, required for Prisma Client type generation |
| **Frontend Framework** | Next.js (App Router) | 15.1.8 | Fullstack React framework with server components | Latest stable version with App Router, built-in API routes, optimal Vercel deployment, server components reduce client bundle |
| **UI Component Library** | Headless UI + Custom | 2.2+ | Accessible React components | Integrates with Tailwind, WCAG AA compliant out of box, lightweight (no heavy framework like MUI) |
| **State Management** | React Server State + Zustand | Latest | Server state via RSC, client state via Zustand | Minimize client state (leverage server components), Zustand for global UI state (language toggle, modals) |
| **Backend Language** | TypeScript | 5.6+ | API Route Handlers logic | Shared types between frontend/backend, same as frontend language |
| **Backend Framework** | Next.js Route Handlers | 15.1.8 | RESTful API endpoints in `/app/api/**` | Built-in to Next.js 15 App Router, replaces Express, serverless deployment on Vercel |
| **API Style** | REST (Route Handlers) | N/A | CRUD operations for resources/feedback | Simpler than GraphQL for MVP, no client codegen needed, standard HTTP methods |
| **Database** | PostgreSQL on Railway | 16+ | Relational database with BYTEA support | Railway provides managed PostgreSQL with SSL, automatic backups, $5-20/month pricing (meets NFR9 and budget constraint NFR11) |
| **ORM** | Prisma | 6.1+ | Type-safe database client | Auto-generates TypeScript types, declarative migrations, best PostgreSQL support in Node.js ecosystem |
| **Cache** | None (MVP) | N/A | No caching layer for MVP | PRD doesn't require caching, can add Vercel KV (Redis) later if needed |
| **File Storage** | PostgreSQL BYTEA | N/A | Store uploaded files as binary data | Simplifies architecture (no S3), acceptable for 50MB limit per NFR5, keeps all data in one place |
| **Authentication** | Clerk | Latest | User management, sessions, role-based access | Pre-built UI components, handles email verification, simpler than NextAuth, role metadata for instructor vs student |
| **Internationalization** | next-intl | 3.24+ | Bilingual FR/EN support with route-based locales | Better type safety than next-i18next, route-based locales (`/en`, `/fr`), works with App Router |
| **Frontend Testing** | Vitest + React Testing Library | Latest | Unit tests for components and utilities | Faster than Jest, ESM native, recommended for Next.js projects in 2025 |
| **Backend Testing** | Vitest | Latest | Unit tests for API route handlers and services | Same test runner as frontend (consistency), can mock Prisma Client |
| **E2E Testing** | Playwright | 1.49+ | Critical user flows (booking, upload, download) | Recommended by Next.js docs, cross-browser, better than Cypress for Next.js |
| **Build Tool** | Next.js CLI | 15.1.8 | `next build` for production builds | Built-in to Next.js, no separate build tool needed |
| **Bundler** | Turbopack (Next.js 15) | Built-in | Fast bundling and HMR for development | Default in Next.js 15, replaces Webpack for faster dev server |
| **CSS Framework** | Tailwind CSS | 4.0+ | Utility-first styling | Rapid UI development, matches PRD requirement, v4 is latest stable with CSS-first config |
| **IaC Tool** | None (MVP) | N/A | Manual Vercel + Railway setup | IaC premature for MVP, can add Terraform later if multi-environment needed |
| **CI/CD** | Vercel (built-in) | N/A | Automatic deployments on git push to main | Zero-config CI/CD for Next.js, preview deployments for PRs, environment variables management |
| **Monitoring** | Vercel Analytics (free tier) | N/A | Core Web Vitals, page performance | Built-in to Vercel, tracks NFR1 requirement (<3s page load), no setup needed |
| **Logging** | Vercel Logs + Console | N/A | Runtime logs for debugging | Free tier provides 1-day retention, sufficient for MVP debugging |
| **Email Service** | Resend | Latest | Transactional emails (contact form, notifications) | 100 emails/day free tier (NFR10), better deliverability than SendGrid free tier, simple API |

---
