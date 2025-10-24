# Epic 3: Student Authentication & Portal

**Goal:** Enable students to create accounts, login securely, and access a simple dashboard showing their uploaded resources and instructor feedback. No booking management, no payment tracking—just a clean portal to view their coaching materials.

## Story 3.1: Clerk Authentication Setup

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

## Story 3.2: Student Dashboard Layout

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

## Story 3.3: Display Student Resources

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

## Story 3.4: Display Instructor Feedback

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

## Story 3.5: Stripe Payment Link Page (Static)

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
