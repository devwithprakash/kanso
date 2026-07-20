# Kanso

## Summary

Kanso is a SaaS form builder focused on speed, clarity, and beautiful defaults. It provides a simple working flow for creating forms, collecting responses, and viewing clean analytics. Kanso includes five polished themes, easy embedding and sharing, and integrations for exports and webhooks.

## Tech Stack

| Component               | Technology                              |
| ----------------------- | --------------------------------------- |
| Frontend                | Next.js, React, TypeScript              |
| API / Backend           | Node.js, tRPC, TypeScript               |
| Monorepo & Tooling      | Turborepo, pnpm                         |
| Database                | PostgreSQL with Drizzle ORM             |
| Auth                    | JWT / Provider-agnostic adapters        |
| Styling & Themes        | PostCSS, CSS Modules (theme system)     |
| Build & Bundling        | tsup, Next.js build                     |
| DevOps & Local Services | Docker, docker-compose                  |
| Utilities               | CSV export, webhooks, analytics service |

## Getting Started

Start by cloning the repository and configuring the environment.

1. Clone the repository:

```bash
git clone <repo-url> kanso
cd kanso
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

3. Create your environment configuration file:

```bash
cp .env.example .env
```

4. Set your environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kanso

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
JWT_SECRET=your_jwt_secret_here

# API
NEXT_PUBLIC_API_URL=http://localhost:4000

# Optional
NODE_ENV=development
```

5. Confirm the environment variables are loaded before starting the app; the frontend and backend rely on these values for database access, auth, and API routing.

## Folder Structure (compact)

```
kanso/
	├── apps/
	│    ├── api/          # tRPC server (handles API mounting, CSV export, rate-limiting)
	│    └── web/          # Next.js frontend app (form builder & filler panels)
	└── packages/
			 ├── database/     # Drizzle ORM schemas, migration history, seed orchestrators
			 ├── logger/       # Pino-based structured logging with request ID propagation
			 ├── trpc/         # Unified tRPC routers, RBAC middleware, type-safe clients
			 ├── services/     # Core services (Users, Forms, Submissions, Quotas, Analytics)
			 ├── eslint-config/# Shared ESLint rulesets
			 └── typescript-config/ # Shared compiler configurations
```

> Tip: This shows only the main top-level folders — expand `apps/` and `packages/` for details.

## Core Features

- Themes: Five built-in, polished themes with live previews and the ability to create custom theme overrides.
- Form Builder: Drag-and-drop editor, field groups, validation rules, conditional logic, and reusable templates to accelerate common form types.
- Publishing & Embeds: Publish forms with one-click sharing, embed via iframe/snippet, and optionally password-protect or limit submissions.
- Analytics Dashboard: Clean, actionable metrics with submissions over time, funnel/conversion insights, top answers, and exportable charts for reports.
- Response Management: Searchable response list, advanced filtering (date ranges, field values), tagging, and CSV export for downstream analysis.
- Integrations: Webhooks for real-time delivery, CSV export, Zapier/IFTTT-friendly webhooks, and simple API access for custom integrations.
- Collaboration & Access Control: Role-based permissions (owner, editor, viewer), team workspaces, and audit trails for form changes.
- Performance & UX: SSR for public pages, minimal client bundles, and accessibility-conscious form components.
