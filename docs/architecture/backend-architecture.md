# Backend Architecture

## Service Architecture - Serverless

Next.js Route Handlers deployed as Vercel serverless functions. Each route handler is thin controller that validates input and calls service layer.

**Structure:**
- Route Handlers: `app/api/**/route.ts`
- Services: `lib/services/` (business logic)
- Repositories: `lib/repositories/` (data access)
- Validators: `lib/validators/` (Zod schemas)

## Database Architecture

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
