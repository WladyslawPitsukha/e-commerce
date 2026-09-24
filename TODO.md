# Project TODO

This list contains only unfinished work. Completed items have been removed.

## P1: Shop and Commerce Flows

- [x] Connect the checkout/order flow to the existing order and user models.
- [x] Add a shared product card component contract so `img` and `images` cannot disagree.

## P1: Responsive UI and Accessibility

- [x] Add browser-based screenshot checks for home, shop, product, brands, and brand-detail routes using the next available browser test tool.
- [x] Verify heading hierarchy on every route.
- [x] Check color contrast for gray text, gradient brand cards, and chart labels.

## P2: Performance and Code Quality

- [x] Remove the redundant `useEffect` state synchronization in product cards where props can be rendered directly.
- [x] Replace dynamic `require()` image loading with static imports or a generated asset manifest.
- [x] Remove the lint suppression around dynamic image loading once the asset manifest exists.
- [x] Add image `sizes` props to responsive `next/image` components.
- [x] Audit bundle size for Recharts, Leaflet, MUI, and icon packages and lazy-load brand analytics where appropriate.
- [x] Lazy-load the Leaflet map and analytics charts below the fold.
- [x] Add server-side data loading where client-side loading is unnecessary.
- [x] Add request caching and revalidation for remote brand/map data.
- [x] Remove dead components such as unfinished shop sections after confirming they are unused.
- [x] Remove duplicated TODO comments and convert valid ones into tracked issues.
- [x] Turn on stricter ESLint rules incrementally after the current warnings are resolved.
- [x] Add consistent naming and import ordering rules.
- [x] Add pre-commit checks for typecheck, lint, and focused tests.

## P2: Data, Backend, and Security

- [x] Validate `MONGODB_URI` at startup with a clear configuration error page/message.
- [x] Add a server-only boundary for database helpers and verify no database code enters client bundles.
- [x] Add Mongo connection retry and timeout behavior.
- [x] Define Mongoose schemas with validation, indexes, timestamps, and unique constraints.
- [x] Add API routes for products, cart, orders, users, and reviews with input validation.
- [x] Add authentication and authorization before exposing user, cart, or order operations.
- [x] Add rate limiting and abuse protection to review, search, and checkout endpoints.
- [x] Sanitize user-generated review content before rendering.
- [x] Keep secrets out of client bundles and document `.env.example` variables.
- [x] Add structured server logging with request ids instead of ad hoc console output.
- [x] Add error monitoring and performance telemetry for production routes.

## P2: Testing and Documentation

- [x] Add unit tests for slug conversion, category lookup, product lookup, filters, sorting, pagination, and totals.
- [x] Add component tests for navbar search, filter controls, cart quantity controls, review form, and tabs.
- [x] Add route tests for valid and invalid brand/category/product paths.
- [x] Add integration tests for cart-to-order behavior.
- [x] Add accessibility checks with axe or an equivalent test runner.
- [x] Add visual regression tests for the primary responsive breakpoints.
- [x] Expand README with setup, environment variables, data conventions, and deployment steps.
- [x] Add a contribution guide describing the source/constants/data split.
- [x] Add a changelog or release notes process for user-visible behavior.
- [x] Record supported browsers and minimum Node.js version.

## Suggested Next Steps

1. [x] Define the shared product contract and remove redundant card state.
2. Connect checkout to authentication, validation, and persisted orders.
3. Add unit and route tests for catalog, cart, and checkout behavior.
4. Complete heading, contrast, and browser-based responsive audits.
5. Replace dynamic image loading and optimize chart/map loading.
6. Add backend security, structured logging, and production monitoring.

## Future UI and Product Work

- [ ] Apply the shared UI tokens, panels, buttons, and fields to the remaining shop, product-detail, review, and information components.
- [ ] Extract reusable Button, Input, and Card React components after the current visual system has settled.
- [ ] Replace remaining low-contrast translucent text colors with accessible solid text tokens.
- [ ] Add visible labels to all checkout fields and full checkout form interaction tests.
- [ ] Build the account sign-in and order-history interface on top of the existing authentication APIs.
- [ ] Update checkout confirmation copy to reflect persisted orders and the production authentication flow.
- [ ] Add route-wide axe, contrast, and heading-hierarchy checks for every public page.
- [ ] Address Next.js image warnings by prioritizing above-the-fold imagery and preserving intrinsic aspect ratios.
- [ ] Add loading, error, and empty states for all asynchronous brand analytics and map interactions.
- [ ] Configure a production telemetry exporter and log aggregation backend for structured request errors.
- [ ] Review and intentionally update visual regression baselines after the remaining storefront component refresh.
