# SkillSwap Frontend

Frontend web application for a freelance marketplace simulation where users can post jobs, place bids, and review completed work.

This project is portfolio-ready and organized around reusable Angular standalone components, route guards, HTTP interceptors, and domain-based services.

## What This Project Demonstrates

- End-to-end authentication flow with JWT (login/register/logout)
- Protected routing with guard-based access control
- HTTP interception for automatic auth header injection
- Job marketplace flow: create jobs, search jobs, bid management, and reviews
- Modular project structure using Angular 21 standalone APIs
- Strict TypeScript configuration for reliability and maintainability

## Tech Stack

- Angular 21
- TypeScript (strict mode)
- RxJS
- Angular Router
- Angular HttpClient + interceptor
- Prettier
- Vitest (via Angular unit test builder)

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm start
```

Application runs at `http://localhost:4200`.

### 3. Build for production

```bash
npm run build:prod
```

### 4. Run tests

```bash
npm test
```

For CI mode (non-watch):

```bash
npm run test:ci
```

## NPM Scripts

- `npm start`: Starts local dev server
- `npm run build`: Default Angular build
- `npm run build:prod`: Production build
- `npm run watch`: Development watch build
- `npm test`: Unit tests in watch mode
- `npm run test:ci`: Unit tests without watch
- `npm run format`: Format source and root config files
- `npm run format:check`: Validate formatting

## Project Structure

High-level organization:

```text
src/app/
	auth/           # authentication, guard, login/register
	core/           # layout, navbar/footer, interceptors, shared services
	jobs/           # user-owned job posting flows
	modules/jobs/   # bid/search/details/review job modules
	platform/       # home and platform-level features
	users/          # profile pages and user data
	models/         # domain model contracts
```

Extra documentation:

- `docs/ARCHITECTURE.md`
- `docs/PROJECT-STRUCTURE.md`

## API Configuration

The API base URL is centralized in:

- `src/app/core/config/api.config.ts`

This avoids hardcoded URL duplication and simplifies future environment migration.

## Route Map (Main Flows)

- `/` Home page
- `/login` Login
- `/register` Registration
- `/me` Logged-in user profile
- `/users/:username` Public profile
- `/jobs/create` Create a new job
- `/jobs/my-postings` My job postings
- `/jobs/search` Job search
- `/jobs/my-bids` My bids
- `/jobs/:id` Job details
- `/jobs/:id/review` Leave review

## Quality and Organization Improvements Applied

- Centralized API URL configuration
- Removed duplicate guard implementation file
- Standardized service patterns and imports
- Upgraded README from Angular template to recruiter-focused documentation
- Added structure and architecture docs for onboarding and maintainability

## Academic Context

This repository is maintained as part of a college project and showcases practical frontend engineering skills for real-world CRUD and authenticated platform scenarios.
