# Chess Coaching Platform Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Streamline client acquisition and lesson management for chess coaching business
- Eliminate administrative overhead through automated booking and payment workflows
- Present a professional, bilingual (FR/EN) online presence to attract beginner chess learners
- Provide authenticated client portal for organized resource delivery and post-lesson feedback
- Enable 24/7 booking availability without manual scheduling coordination
- Build scalable coaching platform that grows from solo operation to potential multi-coach business

### Background Context

Chess instructors currently face fragmented workflows that limit growth and create friction. Scheduling happens through scattered channels (email, messaging apps), consuming 8-12 hours monthly. Resources get lost across platforms, and without professional web presence, an estimated 20-30% of prospects never convert. The online chess coaching market has expanded significantly post-pandemic, making professional digital presence increasingly essential.

This platform centralizes four essential functions: public-facing marketing, intelligent scheduling with Calendly integration, simple payment processing via Stripe payment links, and an authenticated client portal. The solution targets beginner chess learners (ages 5-55, rating 0-1200) seeking personalized instruction at $40/hour, with full bilingual support serving both French and English markets.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-24 | 1.0 | Initial PRD creation from Project Brief | John (PM Agent) |

---

## Requirements

### Functional Requirements

**FR1:** Public bilingual website displays landing page with language toggle (FR/EN), teaching philosophy, credentials, testimonials, and pricing ($40/hour)

**FR2:** Embedded Calendly widget allows students to view real-time availability and book 1-on-1 chess lessons directly on the website

**FR3:** Static payment page displays Stripe payment link or instructions for students to pay after booking

**FR4:** Instructor manually creates student accounts via admin panel after Calendly booking notification

**FR5:** Clerk authentication system provides secure signup/login for students with email verification

**FR6:** Student dashboard displays resources section and feedback section

**FR7:** Instructor admin panel allows manual student account creation

**FR8:** Instructor can upload files (PGN, PDF, video links) up to 50MB per student, stored as BYTEA in PostgreSQL

**FR9:** Instructor can post rich-text feedback and lesson notes visible only to specific student

**FR10:** Students can access only their own resources and feedback via authenticated portal

**FR11:** System serves uploaded files via API route with proper MIME types and authentication verification

**FR12:** All public pages and student portal support full bilingual content (FR/EN) with persistent language preference

**FR13:** Instructor admin panel lists all students with portal access and allows viewing student details

### Non-Functional Requirements

**NFR1:** Application must load pages in <3 seconds on standard broadband connection

**NFR2:** System must support modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions) and mobile browsers (iOS Safari 14+, Chrome Android 9+)

**NFR3:** Responsive design must work seamlessly across desktop, tablet, and mobile screen sizes

**NFR4:** All pages must enforce HTTPS connections

**NFR5:** File uploads limited to 50MB per file due to PostgreSQL BYTEA storage constraints

**NFR6:** Authentication and password management handled by Clerk (industry-standard security)

**NFR7:** Payment processing handled by Stripe (PCI compliance, no card data stored locally)

**NFR8:** API routes must verify Clerk authentication before serving student files or data

**NFR9:** Database must use SSL connections with environment variable credentials (Railway Postgres)

**NFR10:** Email delivery must utilize transactional email service (Resend/SendGrid) with minimum 100 emails/day capacity

**NFR11:** Platform must operate within monthly budget of $5-20 using free tiers where possible (Calendly Free, Clerk Free, Vercel Free, Resend Free)

---

## User Interface Design Goals

### Overall UX Vision

Clean, welcoming, and confidence-inspiring interface that signals professional coaching service while remaining approachable for complete beginners. Design prioritizes clarity and simplicity over chess-specific complexity—students should feel "this is easy to use" rather than overwhelmed. The experience should feel like booking a trusted tutor, not navigating complex software. Bilingual experience (FR/EN) must feel native in both languages, not like a translation overlay.

### Key Interaction Paradigms

- **Minimal-click booking flow:** Public site → embedded Calendly → payment page → portal login (streamlined process)
- **Dashboard-centric student portal:** Single landing page shows "everything I need" (resources, feedback) without deep navigation
- **Drag-and-drop file uploads** for instructor admin panel with clear progress indicators
- **Mobile-first responsive design:** Touch-friendly targets, readable text without zooming, accessible on parent's phone
- **Instant feedback:** Loading states, success confirmations, clear error messages in plain language (not technical jargon)

### Core Screens and Views

**Public Website:**
- Landing page (hero, credentials, testimonials, pricing, embedded Calendly)
- About/Teaching Philosophy page
- Contact/FAQ page
- Payment instructions page

**Student Portal (Authenticated):**
- Student Dashboard (resources, feedback sections)
- Resource Library (filterable/searchable list of uploaded files)
- Feedback History (chronological list of instructor notes)

**Instructor Admin Panel (Authenticated):**
- Student Management (list all students, add new students)
- Student Detail (view individual student, upload resources, post feedback)

### Accessibility: WCAG AA

Target WCAG 2.1 Level AA compliance to ensure platform is accessible to students with disabilities, including:
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios
- Text resizing without loss of functionality
- Clear focus indicators

### Branding

Professional yet approachable chess coaching aesthetic:
- **Color palette:** Calm, trustworthy tones (blues/greens) with chess-inspired accents (black/white contrast elements)
- **Typography:** Clean, readable sans-serif fonts optimized for bilingual content (FR/EN character support)
- **Imagery:** Welcoming photos of diverse age ranges engaged in chess learning (not intimidating grandmaster imagery)
- **Chess elements:** Subtle chess piece iconography for navigation/sections without overwhelming non-chess-players
- **Tone:** Encouraging and educational, avoiding elitist chess culture language

### Target Device and Platforms: Web Responsive

- **Primary:** Desktop/laptop browsers (students booking from home computers)
- **Secondary:** Tablets and mobile phones (parents booking for children, on-the-go access)
- **Responsive breakpoints:** Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- **Touch optimization:** All interactive elements minimum 44x44px tap targets
- **No native mobile apps for MVP:** Progressive Web App (PWA) features optional for future enhancement

---

## Technical Assumptions

### Repository Structure: Monorepo

Single Next.js repository containing frontend, API routes, and database schema. All code lives in one repo for simplified deployment and development workflow.

**Rationale:** Solo coach operation with single fullstack application. Monorepo eliminates coordination overhead between multiple repositories and aligns with Next.js fullstack paradigm. Vercel deployment expects monorepo structure.

### Service Architecture

**Fullstack Monolith with Third-Party Service Integration**

- **Application:** Next.js 15+ (App Router) handles both frontend rendering and backend API routes in single deployment
- **Database:** PostgreSQL on Railway with Prisma ORM for type-safe queries and schema management
- **Authentication:** Clerk SDK integrated via middleware (externally managed service)
- **Booking:** Calendly embedded widget (externally managed service)
- **Payments:** Stripe payment links (manually created, externally managed service)
- **Email:** Resend for transactional emails (externally managed service)

**Rationale:** Monolith architecture minimizes complexity for MVP and solo developer maintenance. Third-party services handle complex domains (auth, payments, scheduling) rather than building custom solutions. This allows focus on core coaching platform features while leveraging battle-tested, compliant external services.

### Testing Requirements

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

### Additional Technical Assumptions and Requests

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

## Epic List

### Epic 1: Foundation & Core Infrastructure
Establish development environment, core tech stack, and deployment pipeline with a minimal deployable application that validates the entire architecture works end-to-end. Deliver a production-ready "Hello World" with bilingual language switching and health check endpoint.

### Epic 2: Public Website & Marketing Presence
Build professional, bilingual public-facing website that showcases coaching credentials, teaching philosophy, and pricing while enabling prospective students to book lessons directly via embedded Calendly widget.

### Epic 3: Student Authentication & Portal
Enable students to create accounts, login securely, and access a simple dashboard showing their uploaded resources and instructor feedback.

### Epic 4: Instructor Admin Panel & Content Management
Provide instructor with simple admin panel to manually add students, upload files for specific students, and post feedback.

---

## Epic 1: Foundation & Core Infrastructure

**Goal:** Establish development environment, core tech stack, and deployment pipeline with a minimal deployable application that validates the entire architecture works end-to-end. Deliver a production-ready "Hello World" with bilingual language switching and health check endpoint, proving Next.js 15 + Prisma + Railway Postgres + Vercel deployment + next-intl framework all integrate correctly.

### Story 1.1: Project Initialization & Repository Setup

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

### Story 1.2: Tailwind CSS Configuration

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

### Story 1.3: Railway Postgres Database Setup

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

### Story 1.4: Prisma ORM Setup & Initial Schema

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

### Story 1.5: Bilingual i18n Framework Setup

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

### Story 1.6: Vercel Deployment & CI/CD Pipeline

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

### Story 1.7: Health Check Endpoint & Deployment Validation

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

### Story 1.8: Bilingual Homepage with Language Toggle

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

## Epic 2: Public Website & Marketing Presence

**Goal:** Build professional, bilingual public-facing website that showcases coaching credentials, teaching philosophy, and pricing while enabling prospective students to book lessons directly via embedded Calendly widget. Deliver a fully functional marketing site that serves as the primary client acquisition channel and establishes professional credibility in the market.

### Story 2.1: Landing Page Hero Section

As a **prospective student**,
I want **compelling hero section with clear value proposition, professional instructor photo, and prominent call-to-action**,
so that **I immediately understand the coaching service and feel motivated to book a lesson**.

**Acceptance Criteria:**

1. Hero section displays headline communicating value proposition in current locale (FR/EN)
2. Subheadline explains target audience (beginners, ages 5-55, rating 0-1200)
3. Professional instructor photo or illustration displayed prominently
4. Primary CTA button "Book a Lesson" / "Réserver une leçon" links to booking section
5. Hero section fully responsive (stacked layout on mobile, side-by-side on desktop)
6. Background styling aligns with chess coaching brand (calm, professional aesthetic)
7. Typography readable with sufficient contrast for accessibility (WCAG AA)
8. Section renders correctly in both French and English with appropriate translations

### Story 2.2: Teaching Philosophy & Credentials Section

As a **prospective student or parent**,
I want **detailed information about the instructor's teaching philosophy, credentials, and approach**,
so that **I can evaluate whether this coach is the right fit for my learning needs**.

**Acceptance Criteria:**

1. "About" or "Teaching Philosophy" section displays instructor background (bilingual content)
2. Credentials and certifications listed (chess rating, teaching experience, qualifications)
3. Teaching approach explained in 2-3 paragraphs emphasizing beginner-friendly methodology
4. Content highlights patient instruction, encouragement, and structured learning path
5. Section includes instructor's chess accomplishments without intimidating beginners
6. Professional formatting with readable typography and appropriate spacing
7. Optional: Timeline or visual representation of teaching experience
8. Translations professionally written (not machine-translated feel)

### Story 2.3: Pricing & Services Display

As a **prospective student**,
I want **clear, transparent pricing information and service details**,
so that **I know exactly what to expect and can make an informed booking decision**.

**Acceptance Criteria:**

1. Pricing section displays $40/hour rate prominently
2. Service description explains what's included in 1-on-1 lesson (60 minutes, personalized instruction, post-lesson feedback)
3. Lesson format explained (online via Zoom/Google Meet, bilingual FR/EN instruction available)
4. Target audience restated (complete beginners to early intermediate, rating 0-1200)
5. Payment process outlined (book via Calendly → receive payment instructions → lesson confirmed)
6. Cancellation/rescheduling policy displayed clearly
7. No hidden fees or surprises—transparency emphasized
8. CTA button "Book Now" directs to Calendly booking section

### Story 2.4: Student Testimonials Section

As a **prospective student or parent**,
I want **authentic testimonials from previous students showcasing positive experiences**,
so that **I gain confidence in the instructor's teaching quality and professionalism**.

**Acceptance Criteria:**

1. Testimonials section displays 3-5 student/parent quotes (bilingual or translated)
2. Each testimonial includes student name (first name or initials), age group, and brief quote
3. Quotes emphasize beginner-friendly approach, patience, and skill improvement
4. Optional: Student photos or avatars (with permission) or placeholder illustrations
5. Testimonials carousel or grid layout (responsive design)
6. Mix of age groups represented (children, teens, adults) to appeal to diverse target audience
7. Placeholder content provided if real testimonials not yet available (marked as "sample")
8. Section styled to appear credible and authentic (not overly promotional)

### Story 2.5: Embedded Calendly Booking Widget

As a **prospective student**,
I want **embedded booking calendar directly on the website showing real-time availability**,
so that **I can select a convenient lesson time and complete booking without leaving the site**.

**Acceptance Criteria:**

1. Calendly widget embedded on dedicated "Book a Lesson" page or section
2. Widget displays instructor's real-time availability based on Calendly configuration
3. "1-on-1 Chess Lesson" event type configured in Calendly (60 minutes, $40/hour)
4. Widget styled to match website branding (colors, fonts where Calendly allows customization)
5. Booking flow collects student name, email, optional message/questions
6. After booking, Calendly confirmation displayed with next steps (payment instructions to follow)
7. Widget fully responsive on mobile devices (touch-friendly interaction)
8. Language of widget follows site locale (Calendly supports FR/EN if configured)
9. Section includes instructional text: "Select a time below. Payment instructions will be sent to you."

### Story 2.6: FAQ Section

As a **prospective student with common questions**,
I want **frequently asked questions section addressing booking, payments, lesson format, and technical requirements**,
so that **I can get immediate answers without needing to contact the instructor**.

**Acceptance Criteria:**

1. FAQ section includes 8-10 common questions with clear answers (bilingual)
2. Questions cover: booking process, payment method, cancellation policy, lesson platform (Zoom/Meet), technical requirements, age appropriateness, bilingual instruction availability
3. Accordion or expandable format for easy navigation
4. Answers written in friendly, approachable tone matching beginner audience
5. FAQ links to booking section where appropriate ("How do I book?" → link to Calendly)
6. Fully responsive layout (readable on mobile without horizontal scrolling)
7. Search functionality optional for MVP (manual scrolling acceptable)
8. Content reduces friction and preemptively addresses objections to booking

### Story 2.7: Contact Form & Footer

As a **prospective student with specific questions**,
I want **contact form to reach the instructor directly**,
so that **I can ask questions not covered in FAQ before committing to a lesson**.

**Acceptance Criteria:**

1. Contact form includes fields: Name, Email, Subject, Message
2. Form validation ensures all required fields completed before submission
3. Form submission sends email to instructor using Resend/SendGrid
4. Success message displayed after submission: "Thank you! We'll respond within 24 hours."
5. Error handling for failed submissions with user-friendly error messages
6. Form accessible and functional in both FR and EN locales
7. Footer includes social media links (optional), privacy policy link, copyright notice
8. Footer displays language toggle if not already in header
9. Footer links styled consistently with site design

### Story 2.8: Responsive Design & Mobile Optimization

As a **prospective student browsing on mobile device**,
I want **entire public website optimized for mobile screens with touch-friendly interactions**,
so that **I can easily navigate, read content, and book lessons from my phone or tablet**.

**Acceptance Criteria:**

1. All sections (hero, about, pricing, testimonials, booking, FAQ, contact) render correctly on mobile (320px-640px width)
2. Navigation menu collapses to hamburger menu on mobile screens
3. Touch targets (buttons, links, form fields) minimum 44x44px for easy tapping
4. Text readable without zooming (minimum 16px base font size on mobile)
5. Images scale proportionally without breaking layout
6. Calendly widget fully functional on mobile (students can select times and submit bookings)
7. Page load time <3 seconds on mobile network (4G connection)
8. No horizontal scrolling required on any screen size
9. Tested on iOS Safari and Chrome Android browsers

### Story 2.9: SEO Optimization & Meta Tags

As the **instructor seeking online visibility**,
I want **search engine optimized pages with proper meta tags and structured data**,
so that **prospective students can discover my coaching service via Google search for "chess coach [city]" or "online chess lessons"**.

**Acceptance Criteria:**

1. Each page includes unique title tag and meta description (bilingual, locale-specific)
2. Open Graph tags configured for social media sharing (title, description, image)
3. Structured data (JSON-LD) for LocalBusiness or Service schema markup
4. Semantic HTML5 elements used throughout (header, nav, main, section, footer)
5. Alt text provided for all images (descriptive, includes keywords where natural)
6. Clean URL structure (`/en/about`, `/fr/tarifs`, etc.)
7. Sitemap.xml generated for search engine crawlers
8. Robots.txt configured to allow crawling of public pages
9. Page titles follow pattern: "[Page Name] | [Instructor Name] - Chess Coaching"

---

## Epic 3: Student Authentication & Portal

**Goal:** Enable students to create accounts, login securely, and access a simple dashboard showing their uploaded resources and instructor feedback. No booking management, no payment tracking—just a clean portal to view their coaching materials.

### Story 3.1: Clerk Authentication Setup

As a **developer**,
I want **Clerk authentication integrated with sign-up and login flows**,
so that **students can create accounts and access their personal portal securely**.

**Acceptance Criteria:**

1. Clerk account created and application configured
2. Clerk API keys added to environment variables
3. Clerk middleware configured to protect `/dashboard/*` routes
4. Sign-up page created at `/sign-up` with email/password
5. Login page created at `/login`
6. After login, users redirected to `/dashboard`
7. Unauthenticated users redirected to login when accessing protected routes
8. Clerk User Management dashboard accessible for manual user administration

### Story 3.2: Student Dashboard Layout

As a **student**,
I want **simple dashboard showing my resources and feedback sections**,
so that **I can easily access coaching materials the instructor shares with me**.

**Acceptance Criteria:**

1. Dashboard page created at `/dashboard` (protected by Clerk)
2. Page displays welcome message with student name from Clerk user profile
3. Two main sections visible: "My Resources" and "Instructor Feedback"
4. Navigation header includes logout button
5. Fully responsive design (mobile, tablet, desktop)
6. Bilingual support (FR/EN content based on site locale)
7. Empty state messaging when no resources/feedback exist yet

### Story 3.3: Display Student Resources

As a **student**,
I want **list of files the instructor uploaded for me with download links**,
so that **I can access PGN files, PDFs, and other coaching materials**.

**Acceptance Criteria:**

1. "My Resources" section queries database for files associated with logged-in student
2. Files displayed in list or card format with filename, file type, upload date
3. Each file has "Download" button that triggers file download
4. Downloads served via API route (`/api/resources/[id]`) with authentication check
5. Only student's own files accessible (authorization check)
6. Files sorted by upload date (newest first)
7. Empty state: "No resources yet. Your instructor will upload materials here."

### Story 3.4: Display Instructor Feedback

As a **student**,
I want **instructor's feedback and lesson notes displayed chronologically**,
so that **I can review post-lesson analysis and improvement recommendations**.

**Acceptance Criteria:**

1. "Instructor Feedback" section queries database for feedback records associated with student
2. Feedback displayed as cards with posted date and feedback text (supports rich text/markdown)
3. Feedback sorted chronologically (newest first)
4. Each feedback card shows date posted in readable format
5. Empty state: "No feedback yet. Check back after your first lesson!"
6. Long feedback text handled gracefully (scrollable or expandable)

### Story 3.5: Stripe Payment Link Page (Static)

As a **student**,
I want **page displaying payment instructions after I book via Calendly**,
so that **I know how to pay for my lesson**.

**Acceptance Criteria:**

1. Static page created at `/payment` explaining payment process
2. Page includes general Stripe payment instructions
3. Instructions: "After booking via Calendly, the instructor will send you a payment link via email"
4. Optional: Generic Stripe payment link displayed if instructor creates one
5. Bilingual content (FR/EN)
6. Clear, simple messaging to reduce confusion

---

## Epic 4: Instructor Admin Panel & Content Management

**Goal:** Provide instructor with simple admin panel to manually add students, upload files for specific students, and post feedback—no booking management, no payment tracking, just core content management.

### Story 4.1: Instructor Authentication & Admin Access

As the **instructor**,
I want **separate admin login that grants access to instructor-only admin panel**,
so that **I can manage students and upload resources without accessing student portal**.

**Acceptance Criteria:**

1. Instructor account created manually in Clerk with admin role/metadata
2. Admin panel routes protected at `/admin/*` with Clerk role check
3. Middleware verifies user has instructor/admin role before allowing access
4. Non-admin users redirected to student dashboard if accessing `/admin`
5. Admin navigation separate from student portal navigation
6. Logout button in admin panel

### Story 4.2: Student List & Manual Student Creation

As the **instructor**,
I want **list of all students with ability to manually add new students**,
so that **I can grant portal access to students after they book lessons**.

**Acceptance Criteria:**

1. Admin page at `/admin/students` displays list of all students
2. List shows: student name, email, date added, number of resources/feedback
3. "Add Student" button opens form to create new student manually
4. Form collects: name, email, preferred language (FR/EN)
5. Form submission creates Clerk user (sends invitation email) and `Student` database record
6. Student list searchable/filterable by name or email
7. Click student name navigates to student detail page

### Story 4.3: Upload Resources for Specific Student

As the **instructor**,
I want **file upload interface for each student**,
so that **I can share PGN files, PDFs, and coaching materials with individual students**.

**Acceptance Criteria:**

1. Student detail page at `/admin/students/[id]` shows student info and upload section
2. File upload form accepts files up to 50MB
3. Supported file types: PDF, PGN, TXT, DOCX, images (PNG, JPG)
4. Upload button triggers API route that stores file as BYTEA in PostgreSQL
5. File metadata stored: filename, mimeType, fileSize, uploadedAt
6. After upload, file appears in student's resource list immediately
7. Uploaded files listed on admin page with "Delete" option
8. Upload progress indicator shown during file processing

### Story 4.4: Post Feedback for Specific Student

As the **instructor**,
I want **simple text editor to post lesson feedback for students**,
so that **I can share post-lesson analysis and improvement recommendations**.

**Acceptance Criteria:**

1. Student detail page includes "Post Feedback" section with text editor
2. Text editor supports basic formatting (bold, italic, lists, links) or markdown
3. "Post Feedback" button submits feedback to database via API route
4. Feedback associated with specific student and timestamped
5. Posted feedback appears in student's portal immediately
6. Admin page shows previously posted feedback with "Edit" and "Delete" options
7. Feedback form includes character count (optional length limit)

---

## Checklist Results Report

### Executive Summary

**Overall PRD Completeness:** 85%
**MVP Scope Appropriateness:** Just Right (after simplification)
**Readiness for Architecture Phase:** Ready with Minor Refinements
**Most Critical Gaps:** Business goals/success metrics need quantification; some non-functional requirements need tightening

### Category Analysis

| Category                         | Status  | Critical Issues                                                          |
| -------------------------------- | ------- | ------------------------------------------------------------------------ |
| 1. Problem Definition & Context  | PASS    | None - Brief provides excellent problem context                          |
| 2. MVP Scope Definition          | PASS    | Simplified scope is appropriate for demo                                 |
| 3. User Experience Requirements  | PASS    | UI goals comprehensive, accessibility addressed                          |
| 4. Functional Requirements       | PASS    | Requirements updated to reflect simplified scope                         |
| 5. Non-Functional Requirements   | PARTIAL | Performance metrics defined but monitoring approach not specified        |
| 6. Epic & Story Structure        | PASS    | Simplified 4-epic structure is clean and appropriate                     |
| 7. Technical Guidance            | PASS    | Stack clearly defined, constraints documented                            |
| 8. Cross-Functional Requirements | PARTIAL | Data schema defined but migration approach needs clarification           |
| 9. Clarity & Communication       | PASS    | Documentation clear, bilingual requirements well-articulated             |

### Top Issues by Priority

**BLOCKERS:**
None - PRD is ready for architecture phase

**HIGH:**
1. Add specific success criteria for demo validation
2. Document manual student onboarding process (how instructor creates accounts after Calendly booking)

**MEDIUM:**
1. Consider adding user analytics/monitoring approach for future
2. Document content creation timeline for bilingual pages

**LOW:**
1. Add monitoring strategy documentation
2. Consider adding deployment rollback procedures

### MVP Scope Assessment

**Current Scope (4 Epics):**
✅ **Appropriate for Demo** - Simplified structure eliminates over-engineering

**Features Correctly Cut:**
- Webhook automation (Calendly → Stripe)
- Booking status database tracking
- Payment confirmation automation
- Complex integration testing

**Essential Features Retained:**
- Public website with Calendly
- Student portal (resources + feedback)
- Instructor admin (upload files, post feedback)
- Clerk authentication

**Complexity Assessment:**
- Epic 1: Medium (infrastructure setup always has complexity)
- Epic 2: Low (static content + Calendly embed)
- Epic 3: Medium (Clerk integration + file downloads)
- Epic 4: Medium (file uploads with PostgreSQL BYTEA)

**Timeline Realism:**
4-6 weeks for experienced Next.js developer, 6-8 weeks for learning developer

### Technical Readiness

**Clarity of Technical Constraints:** ✅ Excellent
- Stack: Next.js 14+, Prisma, Railway Postgres, Clerk, Tailwind
- File storage: PostgreSQL BYTEA (50MB limit)
- Hosting: Vercel
- Budget: $5-20/month

**Identified Technical Risks:**
1. **PostgreSQL BYTEA file storage** - 50MB limit must be enforced in code
2. **Clerk role-based access** - Instructor vs. Student distinction needs proper implementation
3. **File serving via API routes** - Must implement authentication checks correctly

**Areas Needing Architect Investigation:**
1. File upload/download API route security patterns
2. Clerk middleware configuration for role-based routing
3. Bilingual routing strategy (path-based vs. domain-based)

### Recommendations

**Before Architect Handoff:**

1. **Add Manual Workflow Documentation** (10 min):
   - Document: Student books via Calendly → Instructor receives email → Instructor manually sends Stripe link → Instructor creates student account in admin panel

2. **Clarify Demo Success Criteria** (5 min):
   - Add specific validation checklist (e.g., "Demo successful if: student can book, instructor can upload file, student can download file")

**For Architect:**
- Proceed with architecture design
- Focus on: File upload/download security, Clerk role implementation, PostgreSQL BYTEA handling
- Design API route structure for authenticated file serving

### Final Decision

**✅ READY FOR ARCHITECT**

The PRD has been appropriately simplified for demo scope. Epic structure is clean (4 epics), requirements are testable, and technical stack is well-defined. Minor documentation improvements recommended but don't block architectural design work.

---

## Next Steps

### UX Expert Prompt

Review this PRD and create a comprehensive UX/UI design specification for the Chess Coaching Platform demo. Focus on: bilingual (FR/EN) public website design, student portal interface, and instructor admin panel layouts. Deliverables should include wireframes, component specifications, and responsive design patterns for all core screens identified in the UI Design Goals section.

### Architect Prompt

Review this PRD and create a technical architecture document for the Chess Coaching Platform demo. Focus on: Next.js 14 App Router structure, Prisma schema implementation, Clerk authentication patterns (role-based access for instructor vs. student), API route design for file upload/download with PostgreSQL BYTEA storage, and bilingual routing strategy. Address the three identified technical risks: file storage security, role-based routing, and 50MB file size enforcement.

---

**Document Generated:** 2025-10-24
**Version:** 1.0
**Author:** John (PM Agent)
