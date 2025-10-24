
## 🎯 BMAD-METHOD Configuration

### Core Config (`.bmad-core/core-config.yaml`)
```yaml
devLoadAlwaysFiles:
  - docs/architecture/coding-standards.md
  - docs/architecture/tech-stack.md
  - docs/architecture/project-structure.md
  - docs/stories/epic-1-context.md
```

### Technical Preferences (`.bmad-core/data/technical-preferences.md`)
- **Preferred Stack**: Next.js 14+, TypeScript, Prisma, PostgreSQL
- **Testing**: TDD obligatoire avec BMAD workflow
- **Deployment**: Vercel (frontend) + Railway (database)
- **Authentication**: Clerk integration mandatory

## 🔄 BMAD-TDD Workflow Intégré

### Workflow Agents BMAD
1. **Story Creation** (SM): `*draft` → Critères TDD intégrés automatiquement
2. **Risk Assessment** (QA): `@qa *risk {story}` → Évaluation risques avant dev
3. **Test Design** (QA): `@qa *design {story}` → Conception tests détaillée
4. **Implementation** (Dev): `*develop-story {story}` → TDD forcé structurellement
5. **Quality Review** (QA): `*review {story}` → Validation qualité finale

### Activation Dev Agent (James)
```yaml
activation-instructions:
  - STEP 1: Lire fichier agent complet
  - STEP 2: Adopter persona définie
  - STEP 3: Charger core-config.yaml obligatoire
  - STEP 4: Saluer + exécuter *help automatiquement
```

### Portes de Qualité TDD
- **Porte 1**: Story approuvée avec critères TDD
- **Porte 2**: Tests écrits avant implémentation (Red-Green-Refactor)
- **Porte 3**: Tous tests passent + validations
- **Porte 4**: Révision Test Architect (optionnelle)

## 🚨 CRITICAL: CONCURRENT EXECUTION & FILE MANAGEMENT

**ABSOLUTE RULES**:
1. ALL operations MUST be concurrent/parallel in a single message
2. **NEVER save working files, text/mds and tests to the root folder**
3. ALWAYS organize files in appropriate subdirectories

### ⚡ GOLDEN RULE: "1 MESSAGE = ALL RELATED OPERATIONS"

**MANDATORY PATTERNS:**
- **TodoWrite**: ALWAYS batch ALL todos in ONE call (5-10+ todos minimum)
- **Task tool**: ALWAYS spawn ALL agents in ONE message with full instructions
- **File operations**: ALWAYS batch ALL reads/writes/edits in ONE message
- **Bash commands**: ALWAYS batch ALL terminal operations in ONE message
- **Memory operations**: ALWAYS batch ALL memory store/retrieve in ONE message

### 📁 File Organization Rules (BMAD-METHOD Compliant)

**NEVER save to root folder. Use ERGIR project structure:**
- `/apps/web` - Next.js application source code
- `/apps/web/tests` - Test files (components, hooks, e2e)
- `/docs` - Project documentation and user stories
- `/docs/stories` - User story specifications
- `/docs/architecture` - Technical architecture docs (devLoadAlwaysFiles)
- `/docs/qa` - QA test plans and assessments
- `/.bmad-core` - BMAD agents, tasks, templates, et configuration
  - `/.bmad-core/core-config.yaml` - Configuration centrale
  - `/.bmad-core/data/technical-preferences.md` - Préférences techniques
  - `/.bmad-core/agents/` - Agents BMAD personnalisés
- `/scripts` - Development and deployment scripts


---

## 📋 BMAD-METHOD Quick Reference

### Commandes Essentielles
```bash
# Story Management
*draft                    # SM: Créer story avec TDD intégré
*develop-story {story}    # Dev: Implémenter avec TDD forcé
*review {story}           # QA: Révision Test Architect

# Quality Assessment  
@qa *risk {story}         # Évaluation des risques
@qa *design {story}       # Conception des tests
@qa *trace {story}        # Traçabilité des exigences
@qa *nfr {story}          # Validation NFR
```

### Agent Personas
- **James (Dev)**: Expert Senior Software Engineer, TDD forcé
- **Test Architect (QA)**: Senior dev review + refactoring
- **Scrum Master (SM)**: Story creation avec critères TDD

### Activation Protocol (BMAD)
1. **STEP 1**: Lire fichier agent complet  
2. **STEP 2**: Adopter persona définie
3. **STEP 3**: Charger `.bmad-core/core-config.yaml`
4. **STEP 4**: Saluer + `*help` automatique

Remember: **BMAD-METHOD structure le TDD, Claude Code exécute!**

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
Never save working files, text/mds and tests to the root folder.
