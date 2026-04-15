# Architecture Overview

## Context

SkillSwap Frontend is an Angular 21 standalone application that consumes a REST API and implements a marketplace workflow for job posting and bidding.

## Architectural Style

- UI: Component-driven architecture with standalone components
- Routing: Centralized route configuration with auth guard protection on private pages
- Data Access: Domain services per feature, using Angular HttpClient
- Auth: JWT token persisted in localStorage and appended through HTTP interceptor

## Main Layers

### Presentation Layer

- Components and templates grouped by feature domain
- Router-based navigation for top-level application flows
- Shared UI elements (navbar, footer, common components)

### Application Layer

- Route definitions in app.routes.ts
- Auth guard for protected route access
- Application-wide providers in app.config.ts

### Data Layer

- Feature services under auth, jobs, users, platform, and core/services
- API base URL centralized in src/app/core/config/api.config.ts
- Strongly typed request/response contracts through models

## Routing and Access Control

Private routes use authGuard to redirect unauthenticated users to /login.

Examples of protected routes:

- /me
- /jobs/create
- /jobs/my-postings
- /jobs/search
- /jobs/my-bids
- /jobs/:id
- /jobs/:id/review

## Request Flow

1. Component triggers service method
2. Service executes HttpClient call
3. jwtInterceptor injects Authorization header when token exists
4. API response updates component state via RxJS subscription

## Maintainability Notes

- API URL is now centralized for easier migration to environment-based config
- Feature grouping improves discoverability and onboarding
- Strict TypeScript mode increases reliability and catches regressions early

## Recommended Next Improvements

- Move API URL to official Angular environment files (dev/prod)
- Consolidate duplicated job service responsibilities into one source of truth
- Add lazy loading for major route groups
- Increase test coverage for services and route guards
