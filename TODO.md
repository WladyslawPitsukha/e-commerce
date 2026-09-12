# Project TODO

## P0: Stability and Correctness

- [x] Keep one Next configuration file. Merge the needed settings into `next.config.ts`, remove `next.config.js`, and use the correct `transpilePackages` option.
- [x] Add documented commands for `dev`, `build`, `start`, `typecheck`, and linting.
- [x] Add a clean-build script that removes `.next` before rebuilding when generated chunks become inconsistent.
- [x] Document that `next dev`, `next build`, and `next start` must not run concurrently against the same `.next` directory.
- [x] Implement category-aware routing in `src/app/(services)/shop/[category]/page.tsx` instead of always rendering the first activewear product.
- [x] Validate unknown shop categories and return a proper `notFound()` page.
- [x] Add product detail routing by product slug or product id instead of selecting `activewearProducts[0]`.
- [x] Move shared product, brand, review, and filter types into one canonical type module and remove compatibility re-export files after imports are migrated.
- [ ] Remove duplicate or stale data sources under `src/constants`, `src/data`, and `src/assets` where the same content is maintained twice.
- [x] Add safe empty-state handling for missing products, empty brand photos, missing images, and empty filter results.
- [ ] Replace `console.error` UI error paths with user-visible error boundaries or route-level error components.

## P1: Shop and Commerce Flows

- [x] Make the search form perform a real product search and add a search results route.
- [x] Add active filter state for price, colors, sizes, and dress style.
- [x] Make filter controls update the product list instead of being presentational only.
- [x] Add a mobile filter drawer with open/close behavior and focus management.
- [x] Replace the hard-coded "Most Popular" sort label with working sort options.
- [x] Add sorting by popularity, price ascending, price descending, rating, and newest.
- [x] Make pagination preserve filter and sort state.
- [x] Use stable product links on every product card.
- [x] Implement add-to-cart behavior from product detail pages.
- [x] Implement cart quantity updates, removal, subtotal, and empty-cart states.
- [x] Add cart persistence using the existing cart model or a browser storage adapter.
- [ ] Connect the checkout/order flow to the existing order and user models.
- [x] Add review submission persistence and validation.
- [x] Prevent duplicate review submissions and show submission/loading states.
- [x] Add loading, error, and not-found UI for every shop route.
- [ ] Add a shared product card component contract so `img` and `images` cannot disagree.

## P1: Brand Experience

- [ ] Replace the brand list `<img>` elements with `next/image` and add dimensions or `fill` containers.
- [ ] Replace product detail gallery `<img>` elements with `next/image`.
- [ ] Add responsive chart sizing tests for phone, tablet, and desktop widths.
- [ ] Make the Leaflet map initialize once per country dataset and clean up all event listeners.
- [ ] Add a map loading placeholder and an offline/error state when GeoJSON cannot load.
- [ ] Avoid using a fixed DOM id of `map` if multiple brand pages can be mounted together.
- [ ] Add keyboard-accessible country selection and visible focus states.
- [ ] Fix the comparison table semantics by adding table rows and table cells in valid structure.
- [ ] Make the comparison table horizontally scrollable without forcing the whole page to overflow.
- [ ] Add brand not-found and invalid-slug tests.

## P1: Responsive UI and Accessibility

- [ ] Test all routes at 320px, 375px, 768px, 1024px, and 1440px widths.
- [ ] Add Playwright screenshot checks for home, shop, product, brands, and brand-detail routes.
- [ ] Remove remaining fixed-width UI that causes overflow on narrow devices.
- [ ] Replace index keys with stable entity keys in all remaining mapped lists.
- [ ] Add accessible names to icon-only controls and verify tooltips for unfamiliar icons.
- [ ] Ensure all buttons have visible keyboard focus styles.
- [ ] Verify heading hierarchy on every route.
- [ ] Add `aria-current` and active-state styling to navigation links.
- [ ] Add skip navigation and landmark labels for the main navigation and footer.
- [ ] Check color contrast for gray text, gradient brand cards, and chart labels.
- [ ] Respect reduced-motion preferences for animated titles, hover effects, and page reveals.
- [ ] Replace placeholder links such as `/company/about`, `/company/features`, and `/company/works` with real pages or disabled states.
- [ ] Fix typography naming inconsistencies such as `font-inegral` and consolidate font loading.

## P2: Performance and Code Quality

- [ ] Resolve all remaining React hook dependency warnings without suppressing lint rules.
- [ ] Memoize or redesign the random-card hook so it does not recreate unstable callbacks on every render.
- [ ] Remove the redundant `useEffect` state synchronization in product cards where props can be rendered directly.
- [ ] Replace dynamic `require()` image loading with static imports or a generated asset manifest.
- [ ] Remove the lint suppression around dynamic image loading once the asset manifest exists.
- [ ] Add image `sizes` props to responsive `next/image` components.
- [ ] Audit bundle size for Recharts, Leaflet, MUI, and icon packages and lazy-load brand analytics where appropriate.
- [ ] Lazy-load the Leaflet map and analytics charts below the fold.
- [ ] Add server-side data loading where client-side loading is unnecessary.
- [ ] Add request caching and revalidation for remote brand/map data.
- [ ] Remove dead components such as unfinished shop sections after confirming they are unused.
- [ ] Remove duplicated TODO comments and convert valid ones into tracked issues.
- [ ] Turn on stricter ESLint rules incrementally after the current warnings are resolved.
- [ ] Add consistent naming and import ordering rules.
- [ ] Add pre-commit checks for typecheck, lint, and focused tests.

## P2: Data, Backend, and Security

- [ ] Validate `MONGODB_URI` at startup with a clear configuration error page/message.
- [ ] Add a server-only boundary for database helpers and verify no database code enters client bundles.
- [ ] Add Mongo connection retry and timeout behavior.
- [ ] Define Mongoose schemas with validation, indexes, timestamps, and unique constraints.
- [ ] Add API routes for products, cart, orders, users, and reviews with input validation.
- [ ] Add authentication and authorization before exposing user, cart, or order operations.
- [ ] Add rate limiting and abuse protection to review, search, and checkout endpoints.
- [ ] Sanitize user-generated review content before rendering.
- [ ] Keep secrets out of client bundles and document `.env.example` variables.
- [ ] Add structured server logging with request ids instead of ad hoc console output.
- [ ] Add error monitoring and performance telemetry for production routes.

## P2: Testing and Documentation

- [ ] Add unit tests for slug conversion, category lookup, product lookup, filters, sorting, pagination, and totals.
- [ ] Add component tests for navbar search, filter controls, cart quantity controls, review form, and tabs.
- [ ] Add route tests for valid and invalid brand/category/product paths.
- [ ] Add integration tests for cart-to-order behavior.
- [ ] Add accessibility checks with axe or an equivalent test runner.
- [ ] Add visual regression tests for the primary responsive breakpoints.
- [ ] Expand README with setup, environment variables, data conventions, and deployment steps.
- [ ] Add a contribution guide describing the source/constants/data split.
- [ ] Add a changelog or release notes process for user-visible behavior.
- [ ] Record supported browsers and minimum Node.js version.

## Suggested Execution Order

1. Normalize Next configuration and add reliable build/start documentation.
2. Finish category/product routing and empty/error states.
3. Implement real filters, sorting, search, and product links.
4. Complete cart, reviews, and order flows.
5. Replace image tags and resolve accessibility warnings.
6. Add unit, route, accessibility, and responsive visual tests.
7. Optimize bundles, map/charts loading, data fetching, and production observability.
