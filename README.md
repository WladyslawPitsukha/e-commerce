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

## Development

Install dependencies with `npm install`, then run `npm run dev`.

Useful checks:

- `npm run typecheck` checks TypeScript without emitting files.
- `npm run lint` runs the Next.js lint checks.
- `npm run check` runs typecheck and lint together.
- `npm run build` creates the production build.
- `npm run build:clean` removes `.next` before rebuilding if generated chunks are inconsistent.
- `npm run start` starts the production build.

Run only one Next.js process against this checkout at a time. Do not run `next dev`,
`next build`, and `next start` concurrently because they share the `.next` directory.

Copy `.env.example` to `.env.local` and provide the required environment variables before
using database-backed features.