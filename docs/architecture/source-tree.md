# Source Tree Documentation

## Project Structure Overview

This document provides a comprehensive view of the Chess Coaching Platform's source tree, organized according to Next.js 14+ App Router conventions and BMAD-METHOD standards.

---

## Root Directory

```
Chess/
├── .bmad-core/              # BMAD-METHOD framework configuration
├── .claude/                 # Claude Code workspace settings
├── .git/                    # Git version control
├── .next/                   # Next.js build output (gitignored)
├── app/                     # Next.js App Router source code
├── docs/                    # Project documentation
├── logs/                    # Application logs
├── messages/                # i18n translation files
├── node_modules/            # Dependencies (gitignored)
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
├── scripts/                 # Build and deployment scripts
└── [config files]           # Root configuration files
```

---

## App Directory (`/app`)

**Primary application source code following Next.js 14 App Router conventions.**

```
app/
├── [locale]/                # Internationalized routing (en/fr)
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Homepage/landing page
│
├── api/                     # API Route Handlers
│   └── health/
│       └── route.ts         # Health check endpoint
│
├── components/              # React components
│   ├── About.tsx            # About section component
│   ├── Header.tsx           # Site header with navigation
│   ├── Hero.tsx             # Hero section component
│   ├── LanguageSwitcher.tsx # Language toggle component
│   ├── Pricing.tsx          # Pricing section component
│   └── Testimonials.tsx     # Testimonials section component
│
├── lib/                     # Shared libraries and utilities
│   └── db.ts                # Prisma database client singleton
│
├── tests/                   # Test files
│   ├── components/          # Component tests
│   │   ├── About.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── Pricing.test.tsx
│   │   └── Testimonials.test.tsx
│   ├── e2e/                 # End-to-end tests
│   │   └── homepage.spec.ts
│   ├── pages/               # Page tests
│   │   └── HomePage.test.tsx
│   ├── health.test.ts       # Health endpoint tests
│   ├── i18n.test.tsx        # Internationalization tests
│   ├── middleware.test.ts   # Middleware tests
│   └── prisma.test.ts       # Database tests
│
├── types/                   # TypeScript type definitions
│   └── api.ts               # API response types
│
├── globals.css              # Global styles
└── icon.svg                 # Application favicon
```

---

## Documentation (`/docs`)

**Project documentation organized by type.**

```
docs/
├── architecture/            # Technical architecture documents
│   ├── api-specification.md
│   ├── backend-architecture.md
│   ├── coding-standards.md
│   ├── components-architecture.md
│   ├── data-models.md
│   ├── deployment-architecture.md
│   ├── development-workflow.md
│   ├── error-handling.md
│   ├── frontend-architecture.md
│   ├── high-level-architecture.md
│   ├── index.md
│   ├── introduction.md
│   ├── monitoring.md
│   ├── security-and-performance.md
│   ├── source-tree.md       # This file
│   ├── tech-stack.md
│   ├── testing-strategy.md
│   └── unified-project-structure.md
│
├── qa/                      # Quality assurance documents
│   ├── assessments/         # Risk and test assessments
│   │   ├── 1.2-test-design-20251024.md
│   │   └── 1.5-i18n-framework-setup-risk-20251024.md
│   └── gates/               # QA gate definitions
│       ├── 1.3-railway-postgres-setup.yml
│       ├── 1.4-prisma-orm-setup.yml
│       └── 2.5-calendly-booking.yml
│
├── stories/                 # User stories (BMAD-METHOD)
│   ├── 1.1.project-initialization.md
│   ├── 1.2.tailwind-css-config.md
│   ├── 1.3.railway-postgres-setup.md
│   ├── 1.4.dod-checklist.md
│   ├── 1.5.i18n-framework-setup.md
│   ├── 1.7.health-check-endpoint.md
│   ├── 1.8.bilingual-homepage.md
│   ├── 2.1.landing-page-hero.md
│   ├── 2.3.pricing-services.md
│   ├── 2.4.testimonials.md
│   ├── 2.6.faq-section.md
│   ├── 2.8.responsive-mobile.md
│   ├── 3.1.clerk-auth-setup.md
│   ├── 3.2.student-dashboard-layout.md
│   ├── 3.3.display-student-resources.md
│   ├── 3.4.display-instructor-feedback.md
│   ├── 3.5.payment-page.md
│   ├── 4.1.instructor-auth-admin.md
│   ├── 4.2.student-list-creation.md
│   └── 4.4.post-feedback.md
│
├── UI/                      # UI design assets
│   └── UI-feel.png
│
├── alignment-verification.md
├── architecture.md          # Main architecture document
├── front-end-spec.md        # Frontend specification
└── prd.md                   # Product Requirements Document
```

---

## BMAD-METHOD Configuration (`/.bmad-core`)

**BMAD-METHOD framework files for agent-driven development.**

```
.bmad-core/
├── agents/                  # Agent persona definitions
│   ├── analyst.md
│   ├── architect.md
│   ├── bmad-master.md
│   ├── bmad-orchestrator.md
│   ├── dev.md
│   ├── pm.md
│   ├── po.md
│   ├── qa.md
│   ├── sm.md
│   └── ux-expert.md
│
├── checklists/              # Quality checklists
├── data/                    # Configuration data
│   └── technical-preferences.md
│
├── tasks/                   # Workflow task definitions
│   ├── advanced-elicitation.md
│   ├── apply-qa-fixes.md
│   ├── brownfield-create-epic.md
│   ├── brownfield-create-story.md
│   ├── correct-course.md
│   ├── create-brownfield-story.md
│   ├── create-deep-research-prompt.md
│   ├── create-doc.md
│   ├── create-next-story.md
│   ├── document-project.md
│   ├── execute-checklist.md
│   ├── facilitate-brainstorming-session.md
│   ├── generate-ai-frontend-prompt.md
│   ├── index-docs.md
│   ├── kb-mode-interaction.md
│   ├── nfr-assess.md
│   ├── qa-gate.md
│   ├── review-story.md
│   ├── risk-profile.md
│   ├── shard-doc.md
│   ├── test-design.md
│   ├── trace-requirements.md
│   └── validate-next-story.md
│
├── templates/               # Document templates
└── core-config.yaml         # BMAD core configuration
```

---

## Prisma Database (`/prisma`)

**Database schema and migration management.**

```
prisma/
├── migrations/              # Database migrations
│   ├── 20251024172250_init/
│   │   └── migration.sql
│   └── migration_lock.toml
│
├── schema.prisma            # Prisma schema definition
└── seed.ts                  # Database seeding script
```

---

## Internationalization (`/messages`)

**Translation files for bilingual support (next-intl).**

```
messages/
├── en.json                  # English translations
└── fr.json                  # French translations
```

---

## Static Assets (`/public`)

**Publicly accessible static files served at root URL.**

```
public/
└── [static assets]          # Images, fonts, etc.
```

---

## Configuration Files (Root)

**Project-level configuration files.**

```
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
├── .env.local               # Local overrides (gitignored)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore patterns
├── .prettierrc              # Prettier formatting rules
├── claude.md                # Claude Code instructions (deprecated)
├── CLAUDE.md                # Active Claude Code instructions
├── i18n.ts                  # next-intl configuration
├── middleware.ts            # Next.js middleware (auth + i18n)
├── next-env.d.ts            # Next.js TypeScript definitions
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── postcss.config.mjs       # PostCSS configuration
├── proxy.ts                 # Proxy configuration
├── README.md                # Project README
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment config
├── vitest.config.ts         # Vitest test configuration
└── vitest.setup.ts          # Vitest setup file
```

---

## Key Directory Purposes

### `/app` - Application Source
- **[locale]**: Internationalized routes (en/fr)
- **api**: Backend API endpoints (Route Handlers)
- **components**: Reusable React components
- **lib**: Shared utilities and services
- **tests**: All test files (unit, integration, e2e)

### `/docs` - Documentation
- **architecture**: Technical design documents
- **qa**: Quality assurance and testing documentation
- **stories**: User stories and requirements (BMAD format)

### `/.bmad-core` - Development Framework
- **agents**: AI agent personas for development workflow
- **tasks**: Executable workflow definitions
- **templates**: Document generation templates

### `/prisma` - Database Layer
- **schema.prisma**: Database schema definition
- **migrations**: Version-controlled schema changes
- **seed.ts**: Initial data population

---

## File Naming Conventions

### Components
- PascalCase: `Hero.tsx`, `LanguageSwitcher.tsx`
- Test files: `ComponentName.test.tsx`

### API Routes
- Lowercase with hyphens: `health/route.ts`
- Next.js convention: `route.ts` for Route Handlers

### Documentation
- Kebab-case: `source-tree.md`, `tech-stack.md`
- Stories: `epic.story-number.story-name.md`

### Configuration
- Standard conventions: `package.json`, `tsconfig.json`
- Dot files: `.env`, `.eslintrc.json`

---

## Import Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

```typescript
// Recommended alias configuration (check tsconfig.json)
"@/*" → "./app/*"          // Application code
"@/components/*" → "./app/components/*"
"@/lib/*" → "./app/lib/*"
"@/types/*" → "./app/types/*"
```

---

## Notes

- All application source code resides in `/app` (Next.js 14 App Router)
- Tests are co-located with source in `/app/tests`
- Documentation follows BMAD-METHOD structure in `/docs`
- Environment variables are managed via `.env` files (never commit `.env` or `.env.local`)
- Build artifacts (`.next`, `node_modules`) are gitignored

---

**Last Updated**: October 24, 2025
**Maintained By**: Winston (System Architect)
