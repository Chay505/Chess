# API Specification

## REST API Overview

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

## Key Endpoints

### Student Management (Admin Only)

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

### Resource Management

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

### Feedback Management

**POST /api/admin/feedback**
- Post feedback for student
- Auth: Instructor role required
- Body: `{ content: string, studentId: uuid, lessonDate?: datetime }`
- Response: 201 + Feedback object

**DELETE /api/admin/feedback/:id**
- Delete feedback entry
- Auth: Instructor role required
- Response: 204

### Student Portal

**GET /api/student/dashboard**
- Get student's resources and feedback
- Auth: Student authentication required
- Response: 200 + `{ student, resources[], feedback[] }`

### Public Endpoints

**POST /api/contact**
- Submit contact form (public, rate-limited)
- Body: `{ name, email, subject, message }`
- Response: 200 + `{ success: true }`

---
