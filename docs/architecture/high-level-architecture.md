# High Level Architecture

## Technical Summary

The Chess Coaching Platform is a **fullstack Next.js 15 monolithic application** deployed on Vercel, using the App Router architecture with React Server Components for optimal performance. The frontend leverages Next.js server-side rendering and static generation for public marketing pages, while authenticated student and instructor portals use dynamic rendering with Clerk middleware protection. The backend is implemented via Next.js API Route Handlers (not traditional API Routes) that serve as RESTful endpoints for file uploads, downloads, and database operations powered by Prisma ORM connected to Railway PostgreSQL.

Clerk SDK provides complete authentication and role-based access control (instructor vs. student), eliminating custom auth implementation. File storage uses PostgreSQL BYTEA columns (up to 50MB) rather than object storage services, simplifying the architecture at the cost of database size. The application supports bilingual content (FR/EN) using `next-intl` with route-based localization (`/en/*`, `/fr/*`), and Tailwind CSS provides utility-first styling with responsive design patterns. This architecture achieves the PRD's goals of rapid development, minimal operational complexity, and a $5-20/month budget by consolidating all concerns into a single Next.js deployment rather than separate frontend/backend services.

## Platform and Infrastructure Choice

**Platform:** **Vercel + Railway Postgres** (Recommended)

**Key Services:**
- **Hosting:** Vercel (Next.js optimized, automatic deployments, edge CDN, free tier)
- **Database:** Railway PostgreSQL 16+ (managed PostgreSQL with SSL, automatic backups, $5-20/month)
- **Authentication:** Clerk (externally managed, free tier up to 10k MAUs)
- **Email:** Resend (transactional emails, 100/day free tier)
- **Scheduling:** Calendly (embedded widget, free plan for 1 event type)
- **Payments:** Stripe (payment links, transaction fees only)

**Deployment Host and Regions:**
- **Production:** Vercel Edge Network (global CDN with automatic SSL)
- **Primary Region:** `us-east-1` (Railway Postgres, closest to Vercel's default region)
- **Failover:** Not implemented for MVP (single region deployment acceptable for demo)

## Repository Structure

**Structure:** **Monorepo (single Next.js project)**

**Monorepo Tool:** **N/A** (standard Next.js project structure, not Turborepo/Nx)

**Package Organization:**
- Single `package.json` at root
- Frontend and backend code coexist in `app/` directory (Next.js App Router pattern)
- Shared types in `lib/types/` or `types/` directory
- No separate `apps/` or `packages/` folders (not needed for monolithic fullstack app)

**Rationale:** Next.js 15 App Router is inherently fullstack—API Route Handlers (`app/api/**/route.ts`) live alongside pages (`app/**/page.tsx`) in the same directory structure. No workspace complexity needed for MVP.

## High Level Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser<br/>Desktop/Mobile]
    end

    subgraph "Vercel Edge Network"
        CDN[CDN/Edge Cache<br/>Static Assets & Pages]
        NextApp[Next.js 15 App<br/>Vercel Serverless Functions]
    end

    subgraph "Next.js Application"
        PublicPages[Public Pages<br/>SSG/ISR Marketing Site]
        StudentPortal[Student Portal<br/>Dynamic Rendering + Clerk Auth]
        AdminPortal[Instructor Admin<br/>Dynamic Rendering + Clerk Auth]
        APIRoutes[API Route Handlers<br/>/api/resources, /api/feedback]
    end

    subgraph "External Services"
        Clerk[Clerk Auth<br/>User Management & Sessions]
        Railway[(Railway PostgreSQL<br/>Students, Resources, Feedback)]
        Resend[Resend<br/>Transactional Email]
        Calendly[Calendly Widget<br/>Embedded Booking]
        Stripe[Stripe<br/>Payment Links]
    end

    Browser -->|HTTPS| CDN
    CDN -->|Static Content| Browser
    CDN -->|Dynamic Routes| NextApp

    NextApp --> PublicPages
    NextApp --> StudentPortal
    NextApp --> AdminPortal
    NextApp --> APIRoutes

    StudentPortal -->|Verify Session| Clerk
    AdminPortal -->|Verify Role| Clerk
    APIRoutes -->|Query/Mutate| Railway
    APIRoutes -->|Send Emails| Resend

    PublicPages -->|Embed| Calendly
    PublicPages -->|Display Link| Stripe

    Clerk -.->|Webhooks (Future)| APIRoutes

    classDef external fill:#e1f5ff,stroke:#0066cc
    classDef nextjs fill:#fff3e0,stroke:#ff9800
    classDef vercel fill:#f3e5f5,stroke:#9c27b0

    class Clerk,Railway,Resend,Calendly,Stripe external
    class PublicPages,StudentPortal,AdminPortal,APIRoutes nextjs
    class CDN,NextApp vercel
```

## Architectural Patterns

- **Jamstack Architecture:** Static site generation (SSG) for public marketing pages with serverless API routes for dynamic functionality - _Rationale:_ Maximizes performance with <3 second page loads (NFR1) and reduces server costs by pre-rendering public content at build time

- **Server Components First:** Default to React Server Components in Next.js 15 App Router, only using 'use client' for interactive UI - _Rationale:_ Reduces JavaScript bundle size, improves initial page load, and enables server-side data fetching without client-side API calls

- **Route Handler API Pattern:** RESTful API endpoints using Next.js Route Handlers (`app/api/**/route.ts`) instead of traditional Express-style servers - _Rationale:_ Aligns with Next.js 15 best practices, automatic deployment with Vercel Functions, no separate backend deployment needed

- **Repository Pattern (Data Access):** Prisma Client abstracted behind service/repository layer (`lib/services/*` or `lib/repositories/*`) - _Rationale:_ Enables testing with mock data, isolates database queries from route handlers, makes future database migrations easier

- **Middleware-Based Authentication:** Clerk middleware protects routes at the edge before page rendering - _Rationale:_ Prevents unauthorized access before expensive database queries, supports role-based routing (student vs. instructor), centralized auth logic

- **Optimistic UI Updates (Frontend):** Use React Server Actions for mutations with optimistic updates where appropriate - _Rationale:_ Improves perceived performance for file uploads and feedback posting (NFR1 efficiency goal)

- **File Storage as BYTEA:** Store files as binary data in PostgreSQL rather than S3/object storage - _Rationale:_ Simplifies architecture (one less service), acceptable for 50MB limit (NFR5), reduces operational complexity for MVP

---
