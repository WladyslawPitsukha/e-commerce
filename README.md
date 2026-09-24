# E-commerce

![Next.js](https://img.shields.io/badge/Next.js-15.0.4-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-18-149eca?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)

## ✦ Welcome to SHOP.COM

SHOP.COM is a responsive fashion playground built for browsing by instinct. Start with a mood, drift through collections, narrow the field with filters, and land on the piece that feels right. The interface balances an editorial storefront feel with the useful details of a real shop: category-aware product routes, search, sorting, reviews, responsive galleries, and a persistent cart.

> **Style is the filter. Curiosity is the shortcut.**

### ✨ Explore the experience

- **Discover** curated looks across casual, office, party, summer, winter, and activewear collections.
- **Search** the catalog with a real results route and live product matching.
- **Refine** by price, category, color, and size, with a mobile-friendly filter drawer.
- **Compare** product details, reviews, FAQs, brand stories, charts, and global presence.
- **Collect** favorites in a persistent cart while you keep exploring.

### 🪩 Project mood

This is a growing commerce foundation, not a frozen catalog. Product data is currently local and easy to iterate on; the cart, checkout, review, and brand experiences are shaped to connect to authenticated database-backed services as the project evolves.

## Setup

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- MongoDB, only for database-backed API and checkout flows

Install dependencies and start the local storefront:

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

The application is served at `http://localhost:3000`. Run only one Next.js process against this checkout at a time because `next dev`, `next build`, and `next start` share `.next`.

## Environment Variables

Create `.env.local` from `.env.example`; never commit a populated local file.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes for database routes | MongoDB connection string used by product, cart, order, review, and user APIs. |
| `AUTH_SECRET` | Yes for authentication | Long random value used to sign access tokens. Use a different secret in every environment. |

The catalog and public page routes can be explored without MongoDB. Database-backed routes show a configuration error until `MONGODB_URI` is set.

## Data Conventions

- Catalog fixtures live in `src/constants/category'/`; category keys use the `*wear` form such as `casualwear` and `officewear`.
- URL aliases and catalog lookup live in `src/utils/productRoutes.ts`. Use `getProductSlug` when creating product URLs instead of hand-building slugs.
- `src/data/` contains page-specific static content, including brand data. Keep display data separate from React components.
- `src/models/` contains Mongoose schemas for persisted data. API routes in `src/app/api/` validate input before using those models.
- Use the shared `ProductCardProps` contract for product cards so `img` and `images` stay coherent.

## Development And Testing

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Check TypeScript without emitting files. |
| `npm run lint` | Run Next.js lint checks. |
| `npm run check` | Run typecheck and lint together. |
| `npm run test:components` | Run Vitest unit, component, route, API-flow, and accessibility tests. |
| `npm run test:brand` | Run brand route and responsive implementation checks. |
| `npm run test:visual` | Compare desktop and mobile storefront screenshots with committed Playwright baselines. |
| `npm run test:visual:update` | Intentionally regenerate visual baselines after reviewing a UI change. |
| `npm run build` | Create the production build. |
| `npm run start` | Serve the production build. |

Install the browser once before running visual tests:

```bash
npx playwright install chromium
```

Visual baselines cover home, shop, category, product, brands, and brand-detail pages at 1440px and 390px viewport widths. Review generated diffs before accepting updated snapshots.

## Deployment

Build and run the production artifact locally before deployment:

```bash
npm run check
npm run test:components
npm run test:brand
npm run test:visual
npm run build
npm run start
```

Configure `MONGODB_URI` and `AUTH_SECRET` in the target platform's secret store. Do not expose either value through a `NEXT_PUBLIC_` variable. Configure the application health check against a public route such as `/`, and use the platform's TLS termination and log collection facilities.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the source/constants/data ownership model and contribution workflow.