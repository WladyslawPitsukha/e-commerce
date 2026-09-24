# Changelog

All notable user-visible changes are recorded in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Visual regression checks for core storefront pages at desktop and mobile breakpoints.
- Documented local setup, environment variables, supported platforms, and contribution workflow.

### Changed

- None.

### Fixed

- None.

## Release Process

1. Add each user-visible change to the relevant `Unreleased` section in the same pull request.
2. Before publishing, move `Unreleased` entries into a dated version heading in the form `## [x.y.z] - YYYY-MM-DD`.
3. Link the release notes from the pull request or deployment record and tag the corresponding commit.
4. Leave internal refactors, test-only changes, and dependency maintenance out unless they alter user-visible behavior.