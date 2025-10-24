# Deployment Architecture

## Deployment Strategy

**Platform:** Vercel (automatic from GitHub)
- **Frontend:** Static pages pre-rendered, dynamic pages server-rendered
- **Backend:** Route Handlers deployed as serverless functions
- **Database:** Railway PostgreSQL (separate service)

## CI/CD Pipeline

Vercel auto-deploys on push to `main`. Optional GitHub Actions for tests:

```yaml
# .github/workflows/ci.yaml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | http://localhost:3000 | Local dev |
| Preview | https://chess-[hash].vercel.app | PR previews |
| Production | https://chess-coaching-platform.vercel.app | Live |

---
