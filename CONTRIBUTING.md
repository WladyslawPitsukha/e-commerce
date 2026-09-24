# Contributing

## Before You Start

Use Node.js 20+ and npm. Install dependencies with `npm install`, then copy `.env.example` to `.env.local` when working on database-backed behavior. Never commit `.env.local`, connection strings, or authentication secrets.

Run the checks that cover your change before opening a pull request:

```bash
npm run check
npm run test:components
npm run test:brand
```

Run `npm run test:visual` for visible storefront changes. When a visual change is intentional, review the images and update them with `npm run test:visual:update`.

## Source, Constants, And Data

Keep each concern in its owning directory:

| Location | Owns | Does Not Own |
| --- | --- | --- |
| `src/app/` | Routes, layouts, API handlers, and page-level composition | Reusable display components or raw catalog fixtures |
| `src/components/` | Reusable UI and feature components | Route-specific persistence or database access |
| `src/constants/` | Small, stable UI constants and catalog fixture arrays | Fetched data, request state, or database schemas |
| `src/data/` | Structured static page data such as brand stories | React rendering logic or API implementation |
| `src/models/` | Mongoose schemas and persistence constraints | HTTP request validation or client state |
| `src/utils/` | Pure reusable transformations and route/catalog helpers | React hooks, rendering, or database connections |
| `src/lib/` | Infrastructure integrations such as MongoDB and API security | Page-specific presentation logic |

Prefer importing data through the existing category, brand, and route helpers. Add transformations such as filtering, sorting, or slug conversion to `src/utils/` when multiple consumers need them. Keep API validation at the route boundary and keep database queries on the server.

## Changes And Pull Requests

- Keep changes focused and add tests for behavioral changes.
- Preserve the shared product-card contract; do not create duplicate image fields or incompatible product shapes.
- Use accessible labels, semantic headings, and keyboard-operable controls for UI changes.
- Explain user-visible behavior, data changes, environment-variable changes, and visual baseline updates in the pull request description.
- Do not include generated `.next/`, browser traces, local environment files, or credentials in commits.