# E-commerce

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