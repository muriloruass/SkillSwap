# Project Structure Guide

## Current Structure

```text
src/
  app/
    auth/                    # authentication + route guards
    core/
      config/                # app-level static configuration
      footer/                # shared footer component
      interceptors/          # Http interceptors (JWT)
      layout/                # layout component shell
      navbar/                # shared top navigation
      services/              # shared domain services
    jobs/                    # owner-facing jobs area
    models/                  # domain model contracts
    modules/jobs/            # search, details, bids, review pages
    platform/                # home and platform dashboard
    shared/components/       # reusable UI components
    users/                   # user profile and public profile
```

## Conventions Used

- Domain-first folder organization
- One component per folder with ts/html/css/spec files together
- Shared app infrastructure under core/
- DTO/domain contracts centralized under models/

## Why This Organization Works

- Faster onboarding: feature folders map to product flows
- Lower coupling: each service is grouped by concern
- Easier maintenance: shared concerns are isolated in core/

## Naming Guidance

- Components: PascalCase class names, kebab-case file names
- Services: singular responsibility and descriptive names
- Models: explicit interface names aligned to API contracts

## Suggested Folder Evolution

```text
src/app/
  features/
    auth/
    jobs/
    users/
    platform/
  core/
  shared/
```

This future evolution can improve scalability as the codebase grows.
