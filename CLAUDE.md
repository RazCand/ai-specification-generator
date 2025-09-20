# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev              # Start development server on localhost:3000
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint to check code quality

# Database
npm run db:generate     # Generate Prisma client after schema changes
npm run db:push         # Push schema changes to database (development)
npm run db:migrate      # Deploy migrations (production)
npm run db:seed         # Seed database with initial data
```

## Project Architecture

This is a Strategic Tendering Intelligence Platform (Phase 1: Intelligence Foundation) built on Next.js 14, targeting $1M+ complex procurement contracts for Australian local councils and government entities. The platform evolved from a proven AI specification generator into a comprehensive modular system. The application uses the Pages Router (not App Router).

### Core Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (Vercel Postgres)
- **AI**: OpenAI GPT-3.5/GPT-4 for specification generation
- **Deployment**: Vercel

### Platform Modules (Phase 1: Intelligence Foundation)

The platform is architected as four interconnected modules built on the proven AI specification generator foundation:

**1. AI Strategic Specification Intelligence** (Core Module - Currently Implemented)
- Enhanced version of the original AI specification generator
- Category-specific prompts for 9 procurement types
- Structured content generation with 8 standard sections
- Export capabilities (PDF/Word/HTML)

**2. Multi-Dimensional Evaluation Engine** (Planned)
- Scoring frameworks for complex procurement criteria
- Risk assessment algorithms
- Compliance validation systems
- Comparative analysis tools

**3. Stakeholder Orchestration Hub** (Planned)
- Multi-stakeholder workflow management
- Collaborative review and approval processes
- Communication and notification systems
- Role-based access controls

**4. Strategic Risk Intelligence** (Planned)
- Market analysis and supplier intelligence
- Financial risk assessment
- Regulatory compliance monitoring
- Predictive analytics for procurement outcomes

### Platform Application Flow

**Phase 1: AI Strategic Specification Intelligence (Current Implementation)**
1. Users access the strategic specification generator (`/generate` page)
2. Form data is validated and sent to `/api/specifications/generate`
3. AI service generates structured procurement content using OpenAI with category-specific intelligence
4. Content is parsed into 8 predefined sections and saved to database
5. Users can view, export (PDF/Word/HTML), and manage specifications with audit trails

**Future Module Integration Flow**
- **Module 2**: Specifications feed into Multi-Dimensional Evaluation Engine for scoring and risk assessment
- **Module 3**: Stakeholder Orchestration Hub manages collaborative review workflows
- **Module 4**: Strategic Risk Intelligence provides market context and supplier intelligence
- **Cross-Module**: Integrated dashboard provides holistic view across all procurement intelligence

### Key Architecture Components

**Core Intelligence Pipeline (Module 1 - Implemented):**
- `SpecificationForm.tsx` → `validation.ts` → `generate.ts` API → `aiService.ts` → OpenAI → Database
- Category-specific prompts in `utils/prompts.ts` provide specialized strategic guidance
- Content parsed into 8 standard sections: Executive Summary, Project Scope, Requirements, Technical Specifications, Compliance & Standards, Evaluation Criteria, Timeline & Milestones, Budget Considerations

**Modular Database Schema (Extensible for Future Modules):**
- `User` model with role-based access (supports multi-stakeholder workflows)
- `Specification` model storing both form data and generated content as JSON (foundation for evaluation engine)
- `SpecificationExport` for tracking exported files (audit trail for compliance)
- `AuditLog` for compliance tracking (strategic risk intelligence foundation)

**Platform Extension Points:**
- Modular API structure supports future evaluation and risk assessment endpoints
- Component architecture designed for dashboard integration
- Database schema extensible for multi-dimensional scoring and stakeholder workflows

### Import Path Aliases
The project uses TypeScript path aliases defined in `tsconfig.json`:
- `@/*` maps to `src/*`
- `@/components/*` maps to `src/components/*` 
- `@/lib/*` maps to `src/lib/*`
- `@/utils/*` maps to `src/utils/*`
- `@/types/*` maps to `src/types/*`

### Environment Variables Required
```
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
OPENAI_API_KEY=
OPENAI_MODEL= (optional, defaults to gpt-3.5-turbo)
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

### Critical Business Logic

**Strategic Procurement Categories:** The system supports 9 procurement categories targeting $1M+ contracts, each with specialized strategic prompts in `utils/prompts.ts`. When adding new categories, update both the TypeScript types and prompt mappings to maintain platform intelligence consistency.

**AI Content Parsing:** The `parseSpecificationContent` function uses multiple regex patterns to extract sections from GPT responses. This parsing is critical for platform module integration and may need updates if OpenAI changes response formatting.

**Export Functionality:** Files are generated server-side using jsPDF (PDF) and docx (Word) libraries. Exports are tracked in the database for audit purposes and compliance requirements for strategic procurement processes.

**Platform Modularity:** The codebase is structured to support incremental module development. Core specification intelligence remains stable while new modules extend functionality through well-defined interfaces.

### Testing and Quality
- Run `npm run lint` before committing changes
- The application uses Prisma's TypeScript integration for type safety
- Form validation uses Zod schemas in `utils/validation.ts`

### Deployment Notes
- Configured for Vercel deployment with serverless functions supporting platform scalability
- API routes have 60-second timeout for AI generation (suitable for complex strategic specifications)
- Database migrations should be run via `db:migrate` in production
- The root route redirects to `/generate` as the main entry point for Phase 1 AI Strategic Specification Intelligence
- Platform architecture supports horizontal scaling for future module integration