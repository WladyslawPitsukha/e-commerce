## P1: Shop and Commerce Flows

- [ ] Connect the checkout/order flow to the existing order and user models.
- [ ] Add a shared product card component contract so `img` and `images` cannot disagree.

## P1: Responsive UI and Accessibility

- [ ] Add browser-based screenshot checks for home, shop, product, brands, and brand-detail routes. Playwright was removed from this machine; use another browser test tool when this work resumes.
- [ ] Verify heading hierarchy on every route.
- [ ] Check color contrast for gray text, gradient brand cards, and chart labels.

## P2: Performance and Code Quality

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
- [ ] Expand README with setup, environment variables, data conventiocouns, and deployment steps.
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
