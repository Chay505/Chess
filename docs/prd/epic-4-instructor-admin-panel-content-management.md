# Epic 4: Instructor Admin Panel & Content Management

**Goal:** Provide instructor with simple admin panel to manually add students, upload files for specific students, and post feedback—no booking management, no payment tracking, just core content management.

## Story 4.1: Instructor Authentication & Admin Access

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

## Story 4.2: Student List & Manual Student Creation

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

## Story 4.3: Upload Resources for Specific Student

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

## Story 4.4: Post Feedback for Specific Student

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
