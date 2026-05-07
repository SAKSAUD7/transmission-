# Auto Parts For Sale

A multi-page auto parts e-commerce website with 14 product pages, a contact inquiry system, and a parts catalog. Visitors can browse parts, submit contact inquiries (persisted to PostgreSQL), and watch product videos.

## Run & Operate

- `pnpm --filter @workspace/auto-parts run dev` — run the frontend (Vite, assigned port via `PORT` env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port assigned via `PORT` env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned by Replit)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS v4, shadcn/ui, Wouter (routing), TanStack Query v5
- API: Express 5, Pino (structured logging)
- DB: PostgreSQL + Drizzle ORM + drizzle-zod
- Validation: Zod (`zod/v4`), generated from OpenAPI via Orval
- API codegen: Orval (contract-first from `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle for API server)

## Where things live

```
artifacts/
  auto-parts/       — React/Vite frontend
    src/
      pages/        — Home, AboutUs, ContactUs, PartsCatalog, NotFound
      components/   — Layout, ProductPage, PartnersCarousel, shared UI
      lib/
        products.tsx  — Single source of truth for all 14 product definitions
  api-server/       — Express API server
    src/
      routes/
        contact.ts  — POST /api/contact (Zod-validated, persisted to DB)
        health.ts   — GET /api/healthz
lib/
  api-spec/
    openapi.yaml    — OpenAPI 3.1 spec — SOURCE OF TRUTH for API contract
    orval.config.ts — Codegen config
  api-client-react/ — Generated: TanStack Query hooks (useCreateContact, useListContacts, useHealthCheck)
  api-zod/          — Generated: Zod request/response validators (CreateContactBody, etc.)
  db/
    src/schema/
      contacts.ts   — contacts table (Drizzle + drizzle-zod)
```

## Architecture decisions

- **Contract-first API**: All API endpoints are defined in `lib/api-spec/openapi.yaml` first. Running codegen generates both the React Query hooks (frontend) and the Zod validation schemas (backend). This gives end-to-end type safety from a single source of truth.
- **Shared libs via pnpm workspaces**: `@workspace/api-client-react`, `@workspace/api-zod`, and `@workspace/db` are shared libraries consumed by the frontend and/or API server. They are composite packages that emit declarations.
- **Drizzle ORM with drizzle-zod**: DB tables are defined with Drizzle; `createInsertSchema` / `createSelectSchema` from drizzle-zod generates Zod schemas directly from the table definitions for use in API validation.
- **Orval for codegen**: Orval reads the OpenAPI YAML and generates type-safe React Query mutation/query hooks for the frontend and Zod validators for the backend. Re-run codegen after any spec change.
- **Pino structured logging**: All server logs use `req.log` (in route handlers) or the singleton `logger` (elsewhere). Never use `console.log` in server code.
- **Path-based routing via shared proxy**: The global reverse proxy routes `/api` to the API server and `/` to the Vite frontend. Services read `PORT` from env; do not hard-code ports.

## Product

- **Home**: Video carousel hero (3 WhatsApp clips + parts videos), About section, Parts Finder, Benefits, Partners Carousel (7 logos, 4s rotation), Warranty
- **14 Product Pages**: Axle Shaft, Drive Shaft, Differential, Speedometer, Throttle Body, Transfer Case Assembly, Steering Gear Rack & Pinion, Intake Manifold, Spindle Knuckle, Steering Column, ABS Assembly, Axle Assembly, Engine (video), Transmissions (video) — all using the shared `ProductPage` template
- **Parts Catalog**: Live search across all 14 products
- **About Us**: Stats bar, Our Story, product range
- **Contact Us**: Form with generated React Query mutation hook → POST /api/contact → PostgreSQL

## User preferences

- Primary brand color: `#0099cc` (blue)
- Phone number displayed: `1385 688 3299`
- All pages share a sticky header, fixed right contact-form sidebar, and consistent footer

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml`, then restart the API server and frontend workflows.
- Always run `pnpm --filter @workspace/db run push` after adding or changing a DB table schema in `lib/db/src/schema/`.
- Do not run `pnpm dev` at the workspace root — use the workflow runner or `pnpm --filter <pkg> run dev`.
- `lib/api-zod/src/index.ts` only re-exports from `./generated/api` (not `./generated/types`) to avoid value/type name collisions when Orval generates identically-named Zod schemas and TypeScript interfaces.
- Videos live in `artifacts/auto-parts/public/videos/` and are referenced via `import.meta.env.BASE_URL` prefix.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- OpenAPI spec: `lib/api-spec/openapi.yaml`
- DB schema: `lib/db/src/schema/contacts.ts`
- Product data: `artifacts/auto-parts/src/lib/products.tsx`
