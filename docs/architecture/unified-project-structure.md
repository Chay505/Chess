# Unified Project Structure

```
chess-coaching-platform/
├── app/
│   ├── [locale]/                      # Locale routing (en/fr)
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Homepage
│   │   ├── about/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── dashboard/                 # Student portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── resources/page.tsx
│   │   └── admin/                     # Instructor admin
│   │       ├── layout.tsx
│   │       └── students/
│   │           ├── page.tsx
│   │           └── [id]/page.tsx
│   ├── api/                           # Route Handlers
│   │   ├── contact/route.ts
│   │   ├── student/dashboard/route.ts
│   │   ├── resources/[id]/route.ts
│   │   └── admin/
│   │       ├── students/route.ts
│   │       ├── resources/route.ts
│   │       └── feedback/route.ts
│   └── globals.css
├── components/
│   ├── ui/                           # UI primitives
│   ├── layout/                       # Header, Footer
│   ├── features/                     # ContactForm, ResourceCard
│   └── providers/                    # Clerk + Intl providers
├── lib/
│   ├── services/                     # Business logic
│   ├── repositories/                 # Data access
│   ├── validators/                   # Zod schemas
│   ├── stores/                       # Zustand
│   ├── utils/
│   ├── hooks/
│   ├── prisma.ts                     # Prisma singleton
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── messages/                         # next-intl translations
│   ├── en.json
│   └── fr.json
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── prd.md
│   ├── front-end-spec.md
│   └── architecture.md
├── .env.example
├── middleware.ts                    # Clerk + next-intl
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---
