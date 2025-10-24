# Chess Coaching Platform Fullstack Architecture Document

**Version:** 1.0
**Date:** 2025-10-24
**Author:** Winston (Architect)

---

## Introduction

This document outlines the complete fullstack architecture for the Chess Coaching Platform, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### Starter Template or Existing Project

**Project Status:** N/A - Greenfield project (no starter template currently specified)

**Analysis:**
- The PRD specifies Next.js 14+ with App Router, which suggests using the official Next.js starter
- You're building a monolith fullstack application (not microservices)
- Vercel deployment is planned (optimal for Next.js)
- PostgreSQL + Prisma ORM is specified
- Clerk authentication is required

**Recommendation:**

Using the **official Next.js 15 TypeScript template** rather than a complex starter like T3 Stack, because:

1. **Simplicity:** Your PRD is well-defined and doesn't need T3's opinionated choices
2. **Learning curve:** Standard Next.js is easier to understand and customize
3. **Flexibility:** You can add Prisma, Clerk, and Tailwind incrementally
4. **Documentation:** Official Next.js docs are comprehensive and current

**Rationale:** Your PRD already makes clear architectural decisions, so a minimal starter gives you maximum control without fighting pre-configured opinions.

### Change Log

| Date       | Version | Description                          | Author               |
|------------|---------|--------------------------------------|----------------------|
| 2025-10-24 | 1.0     | Initial architecture document created | Winston (Architect) |

---

## High Level Architecture

### Technical Summary

The Chess Coaching Platform is a **fullstack Next.js 15 monolithic application** deployed on Vercel, using the App Router architecture with React Server Components for optimal performance. The frontend leverages Next.js server-side rendering and static generation for public marketing pages, while authenticated student and instructor portals use dynamic rendering with Clerk middleware protection. The backend is implemented via Next.js API Route Handlers (not traditional API Routes) that serve as RESTful endpoints for file uploads, downloads, and database operations powered by Prisma ORM connected to Railway PostgreSQL.

Clerk SDK provides complete authentication and role-based access control (instructor vs. student), eliminating custom auth implementation. File storage uses PostgreSQL BYTEA columns (up to 50MB) rather than object storage services, simplifying the architecture at the cost of database size. The application supports bilingual content (FR/EN) using `next-intl` with route-based localization (`/en/*`, `/fr/*`), and Tailwind CSS provides utility-first styling with responsive design patterns. This architecture achieves the PRD's goals of rapid development, minimal operational complexity, and a $5-20/month budget by consolidating all concerns into a single Next.js deployment rather than separate frontend/backend services.

### Platform and Infrastructure Choice

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

### Repository Structure

**Structure:** **Monorepo (single Next.js project)**

**Monorepo Tool:** **N/A** (standard Next.js project structure, not Turborepo/Nx)

**Package Organization:**
- Single `package.json` at root
- Frontend and backend code coexist in `app/` directory (Next.js App Router pattern)
- Shared types in `lib/types/` or `types/` directory
- No separate `apps/` or `packages/` folders (not needed for monolithic fullstack app)

**Rationale:** Next.js 15 App Router is inherently fullstack—API Route Handlers (`app/api/**/route.ts`) live alongside pages (`app/**/page.tsx`) in the same directory structure. No workspace complexity needed for MVP.

### High Level Architecture Diagram

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

### Architectural Patterns

- **Jamstack Architecture:** Static site generation (SSG) for public marketing pages with serverless API routes for dynamic functionality - _Rationale:_ Maximizes performance with <3 second page loads (NFR1) and reduces server costs by pre-rendering public content at build time

- **Server Components First:** Default to React Server Components in Next.js 15 App Router, only using 'use client' for interactive UI - _Rationale:_ Reduces JavaScript bundle size, improves initial page load, and enables server-side data fetching without client-side API calls

- **Route Handler API Pattern:** RESTful API endpoints using Next.js Route Handlers (`app/api/**/route.ts`) instead of traditional Express-style servers - _Rationale:_ Aligns with Next.js 15 best practices, automatic deployment with Vercel Functions, no separate backend deployment needed

- **Repository Pattern (Data Access):** Prisma Client abstracted behind service/repository layer (`lib/services/*` or `lib/repositories/*`) - _Rationale:_ Enables testing with mock data, isolates database queries from route handlers, makes future database migrations easier

- **Middleware-Based Authentication:** Clerk middleware protects routes at the edge before page rendering - _Rationale:_ Prevents unauthorized access before expensive database queries, supports role-based routing (student vs. instructor), centralized auth logic

- **Optimistic UI Updates (Frontend):** Use React Server Actions for mutations with optimistic updates where appropriate - _Rationale:_ Improves perceived performance for file uploads and feedback posting (NFR1 efficiency goal)

- **File Storage as BYTEA:** Store files as binary data in PostgreSQL rather than S3/object storage - _Rationale:_ Simplifies architecture (one less service), acceptable for 50MB limit (NFR5), reduces operational complexity for MVP

---

## Tech Stack

### Technology Stack Table

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

## Data Models

### Model: Student

**Purpose:** Represents students who book lessons and access the portal for resources and feedback

**Key Attributes:**
- `id`: String (UUID) - Primary key
- `email`: String - Student's email (unique, indexed)
- `name`: String - Student's full name
- `clerkUserId`: String - Foreign key to Clerk user (unique, indexed)
- `preferredLanguage`: Enum ('en' | 'fr') - Language preference for portal
- `createdAt`: DateTime - Account creation timestamp
- `updatedAt`: DateTime - Last profile update timestamp

#### TypeScript Interface

```typescript
export interface Student {
  id: string
  email: string
  name: string
  clerkUserId: string
  preferredLanguage: 'en' | 'fr'
  createdAt: Date
  updatedAt: Date
  resources: Resource[]
  feedback: Feedback[]
}
```

#### Relationships
- **One-to-Many** with `Resource` (a student can have multiple uploaded files)
- **One-to-Many** with `Feedback` (a student can receive multiple feedback posts)

---

### Model: Resource

**Purpose:** Represents files uploaded by the instructor for specific students (PGN, PDF, videos)

**Key Attributes:**
- `id`: String (UUID) - Primary key
- `filename`: String - Original filename (e.g., "lesson-1-game.pgn")
- `mimeType`: String - MIME type (e.g., "application/x-chess-pgn", "application/pdf")
- `fileSize`: Int - Size in bytes (max 50MB per NFR5)
- `fileData`: Bytes - Binary file content stored as PostgreSQL BYTEA
- `description`: String? - Optional description of the file
- `studentId`: String - Foreign key to Student
- `uploadedAt`: DateTime - Timestamp when instructor uploaded file
- `uploadedBy`: String - Clerk ID of instructor who uploaded (for audit trail)

#### TypeScript Interface

```typescript
export interface Resource {
  id: string
  filename: string
  mimeType: string
  fileSize: number
  fileData: Buffer // Binary data in Node.js
  description: string | null
  studentId: string
  student: Student
  uploadedAt: Date
  uploadedBy: string // Clerk instructor ID
}
```

#### Relationships
- **Many-to-One** with `Student` (each file belongs to one student)

---

### Model: Feedback

**Purpose:** Instructor's post-lesson notes and analysis visible to specific student

**Key Attributes:**
- `id`: String (UUID) - Primary key
- `content`: String - Rich text feedback (supports Markdown or HTML)
- `studentId`: String - Foreign key to Student
- `postedAt`: DateTime - Timestamp when feedback was posted
- `postedBy`: String - Clerk ID of instructor who posted
- `lessonDate`: DateTime? - Optional date of the lesson this feedback relates to

#### TypeScript Interface

```typescript
export interface Feedback {
  id: string
  content: string // Markdown or HTML string
  studentId: string
  student: Student
  postedAt: Date
  postedBy: string // Clerk instructor ID
  lessonDate: Date | null
}
```

#### Relationships
- **Many-to-One** with `Student` (each feedback entry belongs to one student)

---

### Entity Relationship Diagram

```mermaid
erDiagram
    Student ||--o{ Resource : "has many"
    Student ||--o{ Feedback : "receives"

    Student {
        string id PK
        string email UK
        string name
        string clerkUserId UK
        enum preferredLanguage
        datetime createdAt
        datetime updatedAt
    }

    Resource {
        string id PK
        string filename
        string mimeType
        int fileSize
        bytes fileData
        string description
        string studentId FK
        datetime uploadedAt
        string uploadedBy
    }

    Feedback {
        string id PK
        string content
        string studentId FK
        datetime postedAt
        string postedBy
        datetime lessonDate
    }
```

---

## API Specification

### REST API Overview

Base URL: `https://chess-coaching-platform.vercel.app/api` (Production)
Local: `http://localhost:3000/api`

**Authentication:** All protected routes require Clerk session token (automatically sent via cookies)

**Error Response Format:**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "timestamp": "2025-10-24T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Key Endpoints

#### Student Management (Admin Only)

**POST /api/admin/students**
- Create new student account
- Auth: Instructor role required
- Body: `{ email, name, preferredLanguage }`
- Response: 201 + Student object

**GET /api/admin/students**
- List all students with resource/feedback counts
- Auth: Instructor role required
- Response: 200 + `{ students: Student[] }`

**GET /api/admin/students/:id**
- Get student details with resources and feedback
- Auth: Instructor role required
- Response: 200 + Student object with relations

#### Resource Management

**POST /api/admin/resources**
- Upload file for student (multipart/form-data)
- Auth: Instructor role required
- Body: `{ file: binary, studentId: uuid, description?: string }`
- Max size: 50MB
- Response: 201 + Resource object

**GET /api/resources/:id**
- Download file (with ownership verification)
- Auth: Student must own the file
- Response: 200 + binary stream with Content-Disposition header

**DELETE /api/admin/resources/:id**
- Delete resource file
- Auth: Instructor role required
- Response: 204

#### Feedback Management

**POST /api/admin/feedback**
- Post feedback for student
- Auth: Instructor role required
- Body: `{ content: string, studentId: uuid, lessonDate?: datetime }`
- Response: 201 + Feedback object

**DELETE /api/admin/feedback/:id**
- Delete feedback entry
- Auth: Instructor role required
- Response: 204

#### Student Portal

**GET /api/student/dashboard**
- Get student's resources and feedback
- Auth: Student authentication required
- Response: 200 + `{ student, resources[], feedback[] }`

#### Public Endpoints

**POST /api/contact**
- Submit contact form (public, rate-limited)
- Body: `{ name, email, subject, message }`
- Response: 200 + `{ success: true }`

---

## Components Architecture

### Component: Public Website (Frontend)

**Responsibility:** Render SEO-optimized marketing pages, embed Calendly widget, handle contact form submissions, and provide bilingual content switching

**Key Interfaces:**
- `GET /[locale]` - Homepage with hero, testimonials, pricing
- `GET /[locale]/about` - Teaching philosophy page
- `POST /api/contact` - Contact form submission

**Dependencies:** Calendly Embed SDK, next-intl, Tailwind CSS, Resend API

**Technology:** Next.js 15 Server Components (SSG/ISR), React 19, Headless UI

---

### Component: Student Portal (Frontend)

**Responsibility:** Authenticated dashboard for students to view resources, download files, and read instructor feedback

**Key Interfaces:**
- `GET /[locale]/dashboard` - Main dashboard page
- `GET /[locale]/dashboard/resources` - Resource list view
- Client-side download handler for resources

**Dependencies:** Clerk SDK, API Route Handlers, React Markdown, Zustand

**Technology:** Next.js 15 App Router (dynamic rendering), Clerk React components

---

### Component: Instructor Admin Panel (Frontend)

**Responsibility:** Authenticated admin interface for managing students, uploading files, and posting feedback

**Key Interfaces:**
- `GET /[locale]/admin/students` - Student list table
- `GET /[locale]/admin/students/[id]` - Student detail page
- File upload form with drag-and-drop
- Rich text editor for feedback

**Dependencies:** Clerk SDK with role verification, API Route Handlers, file upload library, rich text editor

**Technology:** Next.js 15 Client Components, Server Actions, Clerk middleware

---

### Component: Authentication & Authorization Service (Backend)

**Responsibility:** Verify user identity, manage sessions, enforce role-based access control

**Key Interfaces:**
- Clerk Middleware (`middleware.ts`)
- `auth()` helper in Route Handlers
- Role metadata check for instructor vs. student

**Dependencies:** Clerk external service

**Technology:** `@clerk/nextjs` SDK, Clerk Middleware with `createRouteMatcher`

---

### Component: Student Management Service (Backend)

**Responsibility:** Create, read, and manage student accounts in database (linked to Clerk users)

**Key Interfaces:**
- `POST /api/admin/students` - Create student + Clerk user
- `GET /api/admin/students` - List all students
- `GET /api/admin/students/[id]` - Get student details

**Dependencies:** Prisma Client, Clerk Backend API, `Student` data model

**Technology:** Next.js Route Handlers, Prisma ORM, Zod validation

---

### Component: Resource Management Service (Backend)

**Responsibility:** Handle file uploads to PostgreSQL BYTEA, serve authenticated downloads

**Key Interfaces:**
- `POST /api/admin/resources` - Upload file
- `GET /api/resources/[id]` - Download file with auth check
- `DELETE /api/admin/resources/[id]` - Delete file

**Dependencies:** Prisma Client, Clerk `auth()`, `Resource` data model

**Technology:** Next.js Route Handlers with streaming, Buffer manipulation, 50MB validation

---

### Component: Feedback Management Service (Backend)

**Responsibility:** Create, read, and delete instructor feedback for students

**Key Interfaces:**
- `POST /api/admin/feedback` - Post feedback
- `GET /api/student/dashboard` - Retrieve feedback
- `DELETE /api/admin/feedback/[id]` - Delete feedback

**Dependencies:** Prisma Client, Clerk `auth()`, `Feedback` data model

**Technology:** Next.js Route Handlers, Prisma ORM, Markdown sanitization

---

### Component Interaction Diagram

```mermaid
graph TB
    subgraph "Frontend Components"
        PublicWeb[Public Website<br/>SSG/ISR Pages]
        StudentPortal[Student Portal<br/>Dynamic Pages]
        AdminPanel[Admin Panel<br/>Dynamic Pages]
    end

    subgraph "Backend Services"
        AuthService[Auth & Authorization<br/>Clerk Middleware]
        StudentService[Student Management<br/>Route Handlers]
        ResourceService[Resource Management<br/>File Upload/Download]
        FeedbackService[Feedback Management<br/>Route Handlers]
        EmailService[Email Service<br/>Resend Integration]
    end

    subgraph "Data Layer"
        PrismaORM[Prisma Client<br/>Type-safe ORM]
        PostgresDB[(Railway PostgreSQL<br/>Students, Resources, Feedback)]
    end

    subgraph "External Services"
        ClerkAuth[Clerk<br/>User Management]
        ResendEmail[Resend<br/>Email Delivery]
        Calendly[Calendly<br/>Booking Widget]
    end

    PublicWeb -->|Contact Form| EmailService
    PublicWeb -->|Embed| Calendly

    StudentPortal -->|Verify Session| AuthService
    StudentPortal -->|Fetch Data| StudentService
    StudentPortal -->|Download| ResourceService

    AdminPanel -->|Verify Role| AuthService
    AdminPanel -->|Manage Students| StudentService
    AdminPanel -->|Upload Files| ResourceService
    AdminPanel -->|Post Feedback| FeedbackService

    AuthService <-->|Validate Token| ClerkAuth

    StudentService --> PrismaORM
    ResourceService --> PrismaORM
    FeedbackService --> PrismaORM
    EmailService --> ResendEmail

    PrismaORM <-->|SQL Queries| PostgresDB

    classDef frontend fill:#e3f2fd,stroke:#1976d2
    classDef backend fill:#fff3e0,stroke:#ff9800
    classDef data fill:#f1f8e9,stroke:#689f38
    classDef external fill:#fce4ec,stroke:#c2185b

    class PublicWeb,StudentPortal,AdminPanel frontend
    class AuthService,StudentService,ResourceService,FeedbackService,EmailService backend
    class PrismaORM,PostgresDB data
    class ClerkAuth,ResendEmail,Calendly external
```

---

## Frontend Architecture

### Component Organization

Server Components (default) for data fetching, Client Components ('use client') only for interactivity. Locale-based routing with `[locale]` dynamic segment for FR/EN support.

**Key Patterns:**
- Fetch data directly in Server Components using Prisma (no API calls needed)
- Client Components use service layer functions from `lib/api/`
- Middleware protection at edge for auth routes
- Minimal client state (Zustand for UI only)

### State Management

- **Server State:** Fetched in Server Components, no client-side state management
- **URL State:** Managed by Next.js router (`useSearchParams`, `useParams`)
- **Form State:** Local useState or React Hook Form
- **Global UI State:** Zustand for language toggle, modals, mobile menu

### Routing

Middleware-based route protection with Clerk:
- Public routes: Marketing pages (no auth)
- Protected routes: `/[locale]/dashboard/*` (authenticated users)
- Admin routes: `/[locale]/admin/*` (instructor role only)

**Middleware Integration:**
```typescript
// Clerk + next-intl middleware
const isDashboardRoute = createRouteMatcher(['/*/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/*/admin(.*)'])

// Role check for admin routes
if (isAdminRoute(req)) {
  const session = await auth()
  if (session.sessionClaims?.metadata?.role !== 'instructor') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}
```

---

## Backend Architecture

### Service Architecture - Serverless

Next.js Route Handlers deployed as Vercel serverless functions. Each route handler is thin controller that validates input and calls service layer.

**Structure:**
- Route Handlers: `app/api/**/route.ts`
- Services: `lib/services/` (business logic)
- Repositories: `lib/repositories/` (data access)
- Validators: `lib/validators/` (Zod schemas)

### Database Architecture

**Prisma Schema:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Student {
  id                String     @id @default(uuid())
  email             String     @unique
  name              String
  clerkUserId       String     @unique
  preferredLanguage Language   @default(en)
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt

  resources         Resource[]
  feedback          Feedback[]

  @@index([clerkUserId])
  @@map("students")
}

model Resource {
  id          String   @id @default(uuid())
  filename    String
  mimeType    String
  fileSize    Int
  fileData    Bytes    // PostgreSQL BYTEA
  description String?
  studentId   String
  uploadedAt  DateTime @default(now())
  uploadedBy  String

  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@index([studentId])
  @@map("resources")
}

model Feedback {
  id         String    @id @default(uuid())
  content    String    @db.Text
  studentId  String
  postedAt   DateTime  @default(now())
  postedBy   String
  lessonDate DateTime?

  student    Student   @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@index([studentId])
  @@map("feedback")
}

enum Language {
  en
  fr
}
```

**Connection Pooling:**
Prisma Client singleton with connection pooling for Vercel serverless. Railway database URL includes `pgbouncer=true&connection_limit=1`.

---

## Unified Project Structure

```
chess-coaching-platform/
├── app/
│   ├── [locale]/                      # Locale routing (en/fr)
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Homepage
│   │   ├── about/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── dashboard/                 # Student portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── resources/page.tsx
│   │   └── admin/                     # Instructor admin
│   │       ├── layout.tsx
│   │       └── students/
│   │           ├── page.tsx
│   │           └── [id]/page.tsx
│   ├── api/                           # Route Handlers
│   │   ├── contact/route.ts
│   │   ├── student/dashboard/route.ts
│   │   ├── resources/[id]/route.ts
│   │   └── admin/
│   │       ├── students/route.ts
│   │       ├── resources/route.ts
│   │       └── feedback/route.ts
│   └── globals.css
├── components/
│   ├── ui/                           # UI primitives
│   ├── layout/                       # Header, Footer
│   ├── features/                     # ContactForm, ResourceCard
│   └── providers/                    # Clerk + Intl providers
├── lib/
│   ├── services/                     # Business logic
│   ├── repositories/                 # Data access
│   ├── validators/                   # Zod schemas
│   ├── stores/                       # Zustand
│   ├── utils/
│   ├── hooks/
│   ├── prisma.ts                     # Prisma singleton
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── messages/                         # next-intl translations
│   ├── en.json
│   └── fr.json
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── prd.md
│   ├── front-end-spec.md
│   └── architecture.md
├── .env.example
├── middleware.ts                    # Clerk + next-intl
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Development Workflow

### Local Setup

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

### Development Commands

```bash
pnpm dev              # Start Next.js dev server
npx prisma studio     # Database GUI
pnpm test             # Unit tests (Vitest)
pnpm test:e2e         # E2E tests (Playwright)
pnpm lint             # ESLint
pnpm build            # Production build
```

### Environment Variables

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

## Deployment Architecture

### Deployment Strategy

**Platform:** Vercel (automatic from GitHub)
- **Frontend:** Static pages pre-rendered, dynamic pages server-rendered
- **Backend:** Route Handlers deployed as serverless functions
- **Database:** Railway PostgreSQL (separate service)

### CI/CD Pipeline

Vercel auto-deploys on push to `main`. Optional GitHub Actions for tests:

```yaml
# .github/workflows/ci.yaml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | http://localhost:3000 | Local dev |
| Preview | https://chess-[hash].vercel.app | PR previews |
| Production | https://chess-coaching-platform.vercel.app | Live |

---

## Security and Performance

### Security

**Frontend:**
- CSP headers configured in `next.config.ts`
- React auto-escapes content
- DOMPurify for Markdown rendering

**Backend:**
- Zod validation on all inputs
- Rate limiting on public endpoints (10/hour)
- Clerk auth verification on all protected routes

**Auth:**
- Session tokens in httpOnly cookies
- Clerk handles password policy (8+ chars, mixed)
- Role-based access via Clerk metadata

### Performance

**Frontend:**
- Bundle size <500KB initial JS
- Static pages pre-rendered (SSG)
- Server Components reduce client JS

**Backend:**
- API response time <500ms (p95)
- Database indexes on foreign keys
- Exclude `fileData` from list queries

---

## Testing Strategy

### Test Pyramid

- **60% Unit Tests:** Vitest for components, utilities, services
- **30% Integration Tests:** Vitest for API routes
- **10% E2E Tests:** Playwright for critical flows

### Key Test Coverage

- File upload/download with auth
- Student dashboard data fetching
- Admin student management
- Contact form submission
- Bilingual content rendering

---

## Coding Standards

### Critical Rules

- **Type Sharing:** Define shared types in `lib/types/`, never duplicate
- **API Calls:** Server Components fetch with Prisma directly, Client Components use `lib/api/`
- **Environment Variables:** Access via `lib/config.ts`, never direct `process.env`
- **Error Handling:** All Route Handlers use try/catch with `AppError`
- **File Size Validation:** Always enforce 50MB limit before BYTEA storage
- **Auth Checks:** Always call `await auth()` in protected Route Handlers
- **Prisma Queries:** Use repository layer, never direct `prisma.*` in handlers

### Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Components | PascalCase | `StudentDashboard.tsx` |
| Hooks | camelCase + 'use' | `useDownload.ts` |
| Services | camelCase + 'Service' | `studentService.ts` |
| DB Tables | snake_case (plural) | `students` |
| DB Columns | camelCase | `clerkUserId` |

---

## Error Handling

All errors use standardized format:

```typescript
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
  }
}
```

**Response:**
```json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File exceeds 50MB limit",
    "statusCode": 400
  }
}
```

---

## Monitoring

**Monitoring Stack:**
- Vercel Analytics (Core Web Vitals)
- Vercel Logs (function execution)
- Vercel Error Reporting (unhandled exceptions)

**Key Metrics:**
- Frontend: LCP <2.5s, FID <100ms, CLS <0.1
- Backend: Request rate, error rate, p95 response time
- Database: Query performance via Prisma logs

---

**Document Complete**

This architecture document provides the complete blueprint for building the Chess Coaching Platform. All technology choices are based on the latest documentation (Next.js 15.1.8, Prisma 6.1+, Clerk latest) fetched via Context7 MCP server.

Ready for implementation by dev agents following these specifications.
