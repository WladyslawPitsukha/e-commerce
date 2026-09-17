# Project TODO

This list contains only unfinished work. Completed items have been removed.

## P1: Shop and Commerce Flows

- [x] Connect the checkout/order flow to the existing order and user models.
- [x] Add a shared product card component contract so `img` and `images` cannot disagree.

## P1: Responsive UI and Accessibility

- [ ] Add browser-based screenshot checks for home, shop, product, brands, and brand-detail routes using the next available browser test tool.
- [x] Verify heading hierarchy on every route.
- [ ] Check color contrast for gray text, gradient brand cards, and chart labels.

## P2: Performance and Code Quality

- [x] Remove the redundant `useEffect` state synchronization in product cards where props can be rendered directly.
- [ ] Replace dynamic `require()` image loading with static imports or a generated asset manifest.
- [ ] Remove the lint suppression around dynamic image loading once the asset manifest exists.
- [x] Add image `sizes` props to responsive `next/image` components.
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

## Suggested Next Steps

1. Define the shared product contract and remove redundant card state.
2. Connect checkout to authentication, validation, and persisted orders.
3. Add unit and route tests for catalog, cart, and checkout behavior.
4. Complete heading, contrast, and browser-based responsive audits.
5. Replace dynamic image loading and optimize chart/map loading.
6. Add backend security, structured logging, and production monitoring.
