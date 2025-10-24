# Requirements

## Functional Requirements

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

## Non-Functional Requirements

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
