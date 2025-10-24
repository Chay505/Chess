# Security and Performance

## Security

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

## Performance

**Frontend:**
- Bundle size <500KB initial JS
- Static pages pre-rendered (SSG)
- Server Components reduce client JS

**Backend:**
- API response time <500ms (p95)
- Database indexes on foreign keys
- Exclude `fileData` from list queries

---
