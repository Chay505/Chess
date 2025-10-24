# Frontend Architecture

## Component Organization

Server Components (default) for data fetching, Client Components ('use client') only for interactivity. Locale-based routing with `[locale]` dynamic segment for FR/EN support.

**Key Patterns:**
- Fetch data directly in Server Components using Prisma (no API calls needed)
- Client Components use service layer functions from `lib/api/`
- Middleware protection at edge for auth routes
- Minimal client state (Zustand for UI only)

## State Management

- **Server State:** Fetched in Server Components, no client-side state management
- **URL State:** Managed by Next.js router (`useSearchParams`, `useParams`)
- **Form State:** Local useState or React Hook Form
- **Global UI State:** Zustand for language toggle, modals, mobile menu

## Routing

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
