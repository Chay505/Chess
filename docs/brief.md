# Project Brief: Chess Coaching Platform

## Executive Summary

This project will create a professional chess coaching website that streamlines client acquisition and lesson management. The platform provides an authenticated client portal where students can book 1-on-1 training sessions based on the instructor's available schedule, access coaching resources, and receive post-lesson feedback—eliminating administrative overhead and presenting a polished, professional image.

**Primary problem:** Chess instructors spend excessive time on scheduling coordination, resource sharing via scattered channels (email, Dropbox, WhatsApp), and lack a professional online presence to attract new clients.

**Target market:** Beginner chess learners (ages 5-55, rating 0-1200) seeking personalized instruction, parents of junior players looking for qualified coaches, and adult hobbyists who value organized, professional service delivery.

**Key value proposition:** A clean, professional coaching website that makes it easy for clients to find you, book lessons at convenient times, and access their materials in one place—while you focus on teaching instead of administrative tasks. Fully bilingual (French/English) to serve both language markets.

**Pricing:** $40/hour for 1-on-1 online chess lessons.

---

## Problem Statement

### Current State & Pain Points

Chess instructors today face a fragmented, unprofessional workflow that limits growth and creates friction for both instructor and students:

**Scheduling Chaos:** Coordinating lesson times happens through back-and-forth emails, text messages, or phone calls. Students forget appointments, double-bookings occur, and the instructor wastes 5-10 hours per month just managing calendars instead of teaching.

**Scattered Resources:** Students receive PGN files via email, PDFs through messaging apps, and video links through various platforms. Materials get lost in email threads, students can't find that "endgame document from three weeks ago," and the instructor repeatedly re-sends the same files.

**Unprofessional First Impression:** Potential clients search for chess coaches and find either no web presence or a basic Facebook page. There's no easy way to see availability, understand the coaching methodology, or book a trial lesson—leading to lost opportunities as prospects choose coaches with more professional presentation.

**Lack of Client Management:** The instructor has no centralized view of which students are active, what materials each has received, or when they last had a lesson. Student retention suffers because follow-up is manual and inconsistent.

### Impact (Quantified)

- **Lost revenue:** An estimated 20-30% of interested prospects never convert because the booking process requires too much effort
- **Wasted time:** 8-12 hours monthly spent on scheduling coordination and file management—time that could generate $400-800 in additional lessons
- **Student churn:** Without organized materials and easy rebooking, students gradually drift away, requiring constant new client acquisition

### Why Existing Solutions Fall Short

- **Generic booking tools (Calendly):** Don't provide client portals, resource sharing, or chess-specific context
- **Social media/messaging apps:** Unprofessional, materials get buried, no authentication or organization
- **General website builders:** Require manual integration of multiple services, lack coaching-specific features
- **Chess platforms (Chess.com, Lichess):** Don't support private coaching businesses or custom branding

### Urgency

The online chess coaching market has exploded post-pandemic, but competition is increasing. Coaches who establish professional digital presence now will capture market share while others still rely on word-of-mouth and manual processes. Additionally, clients increasingly expect seamless digital experiences—meeting this expectation is becoming table stakes, not a differentiator.

---

## Proposed Solution

### Core Concept

A custom-built chess coaching website that serves as the central hub for your coaching business. The platform combines four essential functions: **public-facing marketing** to attract clients, **intelligent scheduling** to eliminate coordination friction, **integrated payment processing** to streamline collections, and **authenticated client portal** for organized resource delivery and feedback.

### Key Components

**1. Professional Public Website**
- Landing page showcasing your credentials, teaching philosophy, and student testimonials
- Clear explanation of coaching services and pricing ($40/hour)
- Real-time availability display integrated with booking system
- Contact/inquiry form for prospective students
- Full bilingual support (French/English) with language toggle

**2. Smart Booking System with Payment**
- You define your weekly availability and block out specific dates
- Students see only genuinely available time slots
- **Stripe integration:** Automated payment flow via webhook-triggered payment links
- Automated confirmation emails and calendar invites after booking
- Reminder notifications (24 hours before lesson)
- Reschedule/cancel functionality with your defined refund policies

**3. Authenticated Client Portal**
- Each student gets secure login credentials (via Clerk)
- Personal dashboard showing upcoming lessons and payment history
- Resource library where you upload materials (PGNs, PDFs, videos)
- Feedback section where you post game analysis or lesson notes
- Simple, clean interface focused on ease of use

**4. Payment Management**
- Automated Stripe payment links sent after Calendly booking
- Payment history visible to both you and students
- Automated receipts sent via email

### Automated Payment Flow

1. **Student books on Calendly** (free plan)
2. **Calendly webhook fires** → Triggers Next.js API route
3. **System automatically:**
   - Creates Stripe payment link ($40)
   - Sends email with payment link to student
   - Stores booking in database (pending payment)
4. **Student pays via Stripe link**
5. **Stripe webhook fires** → Updates booking status to "confirmed"
6. **Automated confirmation email** sent with final lesson details

### Key Differentiators

**vs. Using Multiple Separate Tools:**
- **Unified branding:** Everything reflects your professional identity, not generic platforms
- **Integrated experience:** Student books → pays → gets portal access in one flow
- **Chess-specific:** Built for sharing PGN files, chess diagrams, and coaching materials—not generic file storage
- **No payment chase:** Money collected automatically via payment links, eliminating awkward follow-ups
- **Bilingual by design:** Seamless FR/EN experience throughout

**vs. Competitors Without Digital Presence:**
- **24/7 booking availability:** Students can book and pay for lessons at midnight without waiting for your response
- **Professional credibility:** Modern website signals quality and commitment to teaching
- **Better retention:** Organized resources keep students engaged between lessons
- **Friction-free payment:** Students prefer clicking a link to writing checks or coordinating bank transfers

### High-Level Vision

This platform transforms your coaching from a side hustle managed through scattered tools into a **professional, scalable business**. Students experience seamless onboarding (discover → book → pay → access portal), and you gain time back to either teach more students or improve lesson quality. The system grows with you—whether you stay solo or eventually add associate coaches.

---

## Target Users

### Primary User Segment: Beginner Chess Learners (Ages 5-55)

**Demographic Profile:**
- **Age Range:** 5-55 years old (children, teens, adults)
- **Income:** Accessible pricing model—middle-class families and individuals
- **Chess Experience:** Complete beginners to early intermediate (rating 0-1200)
- **Location:** Local/regional or remote (online lessons)
- **Language:** French or English speakers

**Current Behaviors & Workflows:**
- **Young children (5-12):** Learning chess at school, online, or from family; need foundational skills
- **Teens (13-17):** Picked up chess casually, want to improve but don't know where to start
- **Adults (18-55):** New to chess or returning after years away; learning via apps/YouTube but without structure

**Specific Needs & Pain Points:**
- **Starting from zero:** Need patient instruction that doesn't assume prior knowledge
- **Overwhelmed by complexity:** Chess seems intimidating; need clear, step-by-step learning path
- **Accessibility:** Can't afford expensive elite coaching; need quality instruction at reasonable price ($40/hour)
- **Encouragement:** Need positive reinforcement and beginner-friendly environment (not competitive pressure)
- **Flexibility:** Busy lives—need convenient scheduling for lessons
- **Language preference:** Comfortable learning in French or English

**Goals They're Trying to Achieve:**
- Learn chess fundamentals (how pieces move, basic tactics, simple strategies)
- Play confidently against friends, family, or casual online opponents
- Develop a fun, intellectually stimulating hobby
- Build skills at their own pace without judgment
- (For children) Develop critical thinking, patience, and problem-solving abilities

### User Personas by Age Group

**Young Learners (5-12 years):**
- Parents book/pay for lessons
- Need engaging, playful teaching style
- Short attention spans—lessons must be interactive
- Progress tracked for parent visibility

**Teen Learners (13-17 years):**
- May book independently or with parent involvement
- Want to improve for school chess club or online play
- Need balance of fun and skill development
- Responsive to gamification and achievement

**Adult Learners (18-55 years):**
- Self-directed; book and pay independently
- Often learning for relaxation/mental exercise
- Appreciate structured curriculum but flexible pacing
- Value clear explanations and patience

---

## Goals & Success Metrics

**Pricing:** $40/hour (competitive rate for beginner online chess coaching)

**Business Focus:** Build a professional platform that eliminates administrative overhead and presents a credible online presence to attract and retain students.

---

## MVP Scope

### Core Features (Must Have)

**Public-Facing (Custom Build):**
- **Bilingual Website (FR/EN):** Professional landing page with language toggle, teaching philosophy, credentials, testimonials, pricing ($40/hour)
- **Embedded Calendly Widget:** Calendly booking calendar embedded directly on your site (maintains your branding)
- **Student Portal Link:** Clear navigation to login (handled by Clerk)

**Third-Party Integrations (Managed Services):**
- **Calendly Free:** Handles scheduling (1 event type: "1-on-1 Chess Lesson"), availability management, automated reminders, calendar sync, reschedule/cancel
- **Clerk:** Authentication system, user management, login/signup flows
- **Stripe:** Payment processing via automated payment links (triggered by webhooks)
- **Email Service (Resend/SendGrid):** Automated payment link emails and confirmations

**Custom-Built Student Portal:**
- **Authentication:** Clerk integration for secure login
- **Dashboard showing:**
  - Link to book next lesson (redirects to Calendly)
  - Payment history (pulled from Stripe API)
  - Resources section: Files you've uploaded for this specific student
  - Feedback section: Your notes/analysis posted for this student

**Simplified Instructor Admin Panel:**
- **View bookings:** Dashboard pulling data from Calendly API
- **Student management:** List of all students with portal access
- **Upload resources:** File upload interface per student (stored in PostgreSQL)
- **Post feedback:** Rich text editor to post notes/analysis per student
- **Payment overview:** Dashboard pulling data from Stripe API

**Automated Webhook Flows:**

1. **Calendly Webhook → Payment Email:**
   - Triggers when student books
   - Creates Stripe payment link
   - Sends automated email with payment link
   - Stores booking as "pending payment" in database

2. **Stripe Webhook → Confirmation:**
   - Triggers when payment completed
   - Updates booking to "confirmed"
   - Sends final confirmation email

**Database (PostgreSQL on Railway with Prisma):**

```prisma
model Student {
  id              String     @id @default(cuid())
  clerkUserId     String     @unique
  email           String
  name            String
  preferredLang   String     @default("en")
  instructorNotes String?
  createdAt       DateTime   @default(now())

  resources       Resource[]
  feedback        Feedback[]
}

model Resource {
  id         String   @id @default(cuid())
  studentId  String
  student    Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  filename   String
  fileType   String
  fileData   Bytes
  mimeType   String
  fileSize   Int
  uploadedAt DateTime @default(now())

  @@index([studentId])
}

model Feedback {
  id           String   @id @default(cuid())
  studentId    String
  student      Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  feedbackText String   @db.Text
  postedAt     DateTime @default(now())

  @@index([studentId])
}

model Booking {
  id              String   @id @default(cuid())
  studentEmail    String
  lessonTime      DateTime
  status          String   // "PENDING", "CONFIRMED", "CANCELLED"
  stripePaymentId String?
  createdAt       DateTime @default(now())

  @@unique([studentEmail, lessonTime])
}
```

---

### What Each Service Handles

**Calendly (Free Plan):**
- ✅ Availability calendar management
- ✅ Booking flow
- ✅ Automated confirmation emails
- ✅ 24-hour reminder emails
- ✅ Rescheduling/cancellation logic
- ✅ Calendar sync (Google Calendar, etc.)
- ✅ Timezone handling
- ✅ Webhook triggers for automation

**Clerk (Free up to 10k users):**
- ✅ User authentication (signup/login)
- ✅ Password management
- ✅ Email verification
- ✅ User profile management
- ✅ Session handling

**Stripe ($0 setup, 2.9% + $0.30 per transaction):**
- ✅ Payment processing via payment links
- ✅ Automated receipts
- ✅ Payment history/reporting
- ✅ Refund handling
- ✅ Webhook triggers for payment confirmation

**PostgreSQL on Railway:**
- ✅ Student data storage
- ✅ File storage (up to 50MB per file as BYTEA)
- ✅ Feedback and resource management
- ✅ Booking status tracking

---

### Email Notifications (Automated)

**Handled by Third Parties:**
- ✅ Booking confirmation → Calendly
- ✅ 24-hour reminder → Calendly
- ✅ Payment receipt → Stripe
- ✅ Reschedule/cancel confirmation → Calendly

**Custom (via Resend/SendGrid):**
- Payment link email (triggered by Calendly webhook)
- Final lesson confirmation (triggered by Stripe webhook)
- Optional: New resource uploaded notification
- Optional: New feedback posted notification

---

### Out of Scope for MVP

- Group coaching sessions
- Package/bundle pricing (e.g., "5 lessons for $180")
- Live video integration (use Zoom/Google Meet separately)
- Student progress analytics/tracking dashboards
- Community features (forums, student-to-student interaction)
- Mobile app (responsive web is sufficient)
- Automated homework/assignment system
- Chess board integration for position analysis
- Subscription billing models
- Multi-instructor platform (built for solo coach only)
- Custom booking calendar (using Calendly)
- Custom authentication system (using Clerk)
- SMS notifications (email only for MVP)

---

### MVP Success Criteria

**The MVP is successful if:**

1. **You can book your first paid student** through the platform within 2 weeks of launch
2. **Students can complete entire flow** (discover → book → pay → login → access resources) automatically
3. **Zero scheduling conflicts** occur—system prevents double-bookings
4. **Payment collection is fully automated**—no manual payment link sending
5. **Both FR and EN versions** are fully functional and professional
6. **You spend <2 minutes per student** uploading resources or posting feedback
7. **Webhook automation works reliably** for payment emails and confirmations

---

## Technical Considerations

### Platform Requirements

**Target Platforms:**
- Web application (desktop, tablet, mobile browsers)
- Responsive design—works seamlessly on all screen sizes
- No native mobile apps for MVP

**Browser/OS Support:**
- Modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
- Mobile browsers: iOS Safari, Chrome Android
- Minimum support: iOS 14+, Android 9+

**Performance Requirements:**
- Page load time: <3 seconds on standard broadband
- File upload: Support files up to 50MB (for video links/large PGNs)
- Responsive UI: Instant feedback on user actions

---

### Technology Stack

**Frontend:**
- **Framework:** Next.js 14+ (App Router for SEO, bilingual routing, fullstack simplicity)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **i18n:** next-i18next or next-intl for FR/EN language switching

**Backend:**
- **Framework:** Next.js API routes (fullstack approach)
- **Language:** TypeScript
- **Database:** PostgreSQL on Railway
- **ORM:** Prisma (type-safe database access, schema management, migrations)

**Third-Party Services:**
- **Authentication:** Clerk
- **Booking:** Calendly Free
- **Payments:** Stripe
- **Email:** Resend (free tier: 100 emails/day) or SendGrid

**Hosting/Infrastructure:**
- **Application Hosting:** Vercel (recommended) or Railway
- **Database Hosting:** Railway Postgres
- **File Storage:** PostgreSQL BYTEA (store files directly in database)
- **CDN:** Cloudflare or Vercel's built-in CDN
- **SSL:** Automatic via hosting provider

---

### Architecture

**Repository Structure:**
```
/app         → Next.js pages and routing
/components  → Reusable UI components
/lib         → Utilities and helpers
/prisma      → Database schema and migrations
/public      → Static assets
```

**Service Architecture:**
- **Fullstack app:** Next.js handles both frontend rendering and API routes
- **Database:** Railway PostgreSQL for all data (students, resources, feedback, file storage)
- **Third-party APIs:** Clerk SDK, Calendly API, Stripe SDK integrated via API routes

**File Storage Strategy:**
- **Store files as binary data (BYTEA)** in PostgreSQL `Resource.fileData` column
- **Advantages:** Simplified architecture, no external storage service, transactional consistency
- **Limitations:** 50MB per file limit (enforced), not ideal for very large video files
- **Recommendation:** For large video files, store links/URLs to YouTube/Vimeo instead of uploading

**Integration Requirements:**
- **Clerk webhooks:** Sync user creation to `Student` table when new user signs up
- **Calendly webhooks:** Trigger payment email automation on booking
- **Stripe webhooks:** Confirm payment and update booking status
- **File upload flow:**
  1. User uploads via form
  2. Next.js API route receives file
  3. Convert to Buffer/Bytes
  4. Store in PostgreSQL via Prisma
  5. Serve files via API route with proper MIME types and auth checks

**Security/Compliance:**
- **Authentication:** Handled by Clerk (industry-standard security)
- **Payment security:** PCI compliance handled by Stripe (no card data stored)
- **Data privacy:** GDPR/privacy-friendly (minimal data collection)
- **File access control:** API routes verify Clerk auth before serving files
- **HTTPS:** Enforced on all pages
- **Database security:** Railway Postgres with SSL, environment variable credentials

---

## Constraints & Assumptions

### Constraints

**Budget:**
- Development budget: [To be determined by client]
- **Monthly operating costs: ~$5-20/month**
  - Calendly: **FREE** (free plan with 1 event type)
  - Railway Postgres: $5-20/month (depending on usage)
  - Hosting (Vercel): $0 (free tier sufficient for MVP)
  - Domain: ~$12/year (~$1/month)
  - Clerk: Free tier (up to 10,000 users)
  - Stripe: Transaction fees only (2.9% + $0.30 per transaction)
  - Email (Resend): Free tier (100 emails/day)

**Timeline:**
- Desired launch: [To be determined]
- Realistic MVP development: 4-8 weeks (depending on developer availability and experience)
- Content creation (French/English): 1-2 weeks (can happen in parallel)

**Resources:**
- Solo coach operation (no team initially)
- Developer: [To be determined - hiring or existing]
- Content creation: Instructor writes own content (credentials, teaching philosophy, FAQs)
- Design/branding: [To be determined - custom design or component library]

**Technical:**
- Files limited to 50MB per upload (PostgreSQL storage constraint)
- No native mobile apps (web-responsive only)
- Reliant on third-party service availability (Calendly, Clerk, Stripe)
- Video lessons hosted externally (Zoom for live, YouTube/Vimeo for recordings)
- Calendly free plan: Only 1 event type allowed

---

### Key Assumptions

**Market & Demand:**
- There is demand for beginner chess coaching at $40/hour in your target market
- Bilingual (FR/EN) capability provides competitive advantage
- Professional website presence increases conversion vs. informal channels
- Students are comfortable with online booking and payment

**User Behavior:**
- Students will create accounts and log into portal to access resources
- Students prefer automated booking over email coordination
- Parents of young students will manage bookings and portal access
- Email notifications are sufficient (SMS not required for MVP)
- Two-step booking process (book → pay) is acceptable to students

**Technical:**
- Next.js + Prisma + Railway stack is appropriate for scale
- Developer has React/Next.js/TypeScript experience or can learn
- Third-party services (Clerk, Calendly, Stripe) will remain reliable and affordable
- PostgreSQL can handle file storage needs without performance issues
- Hosting on Vercel or Railway provides sufficient performance
- Webhook latency (Calendly → payment email) is acceptably fast (<30 seconds)

**Business Model:**
- $40/hour pricing is competitive and attractive to target market
- Pay-per-lesson model (vs. subscriptions/packages) works for MVP
- Students will book 1-4 lessons per month on average
- Instructor can handle all lessons personally (no need for associate coaches initially)

**Content & Localization:**
- Instructor can provide content in both French and English
- Translation quality is adequate (professional translation not required for MVP)
- Target audience exists in both language markets

**Development & Launch:**
- MVP scope is achievable in 4-8 weeks
- No major technical blockers will arise during development
- Instructor can test platform with initial students to validate features
- Marketing/promotion strategy exists to attract first students after launch

---

## Next Steps

### Immediate Actions

1. **Finalize project requirements** with development team
2. **Set up development environment** (Next.js, Prisma, Railway Postgres)
3. **Create accounts** for third-party services (Clerk, Calendly, Stripe, Resend)
4. **Design database schema** in Prisma
5. **Build core authentication flow** with Clerk
6. **Implement Calendly webhook integration** for booking automation
7. **Implement Stripe webhook integration** for payment confirmation
8. **Build student portal** and instructor admin panel
9. **Create bilingual content** (FR/EN) for public website
10. **Test end-to-end flow** with beta students
11. **Deploy to production** (Vercel + Railway)
12. **Launch marketing campaign** to attract initial students

---

## PM Handoff

This Project Brief provides the full context for the Chess Coaching Platform. The next step is to create a detailed Product Requirements Document (PRD) that specifies:

- Detailed user stories and acceptance criteria
- UI/UX wireframes and design specifications
- API endpoint specifications
- Database schema implementation details
- Webhook integration specifications
- Testing requirements
- Deployment and DevOps processes

Please review this brief thoroughly and work with the client to clarify any questions before proceeding to PRD generation.

---

**Document Generated:** 2025-10-24
**Generated with:** [BMAD™ Analyst Agent](https://github.com/bmad-sim/bmad-ecosystem)
