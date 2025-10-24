# Epic 2: Public Website & Marketing Presence

**Goal:** Build professional, bilingual public-facing website that showcases coaching credentials, teaching philosophy, and pricing while enabling prospective students to book lessons directly via embedded Calendly widget. Deliver a fully functional marketing site that serves as the primary client acquisition channel and establishes professional credibility in the market.

## Story 2.1: Landing Page Hero Section

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

## Story 2.2: Teaching Philosophy & Credentials Section

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

## Story 2.3: Pricing & Services Display

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

## Story 2.4: Student Testimonials Section

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

## Story 2.5: Embedded Calendly Booking Widget

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

## Story 2.6: FAQ Section

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

## Story 2.7: Contact Form & Footer

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

## Story 2.8: Responsive Design & Mobile Optimization

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

## Story 2.9: SEO Optimization & Meta Tags

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
