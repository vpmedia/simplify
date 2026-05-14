# AGENTS.md

## Overview

A general-purpose utility library for common JavaScript operations, grouped by concern (`util`, `logging`, `typecheck`, `pagelifecycle`, `const`). Optional Sentry integration for browser error tracking.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js / Browser
- **Package Manager:** pnpm (workspaces)
- **Domain:** General-purpose utility library
- **Optional Dependencies:** `@sentry/browser` (error tracking integration)
- **Build:** Rolldown + `tsc --emitDeclarationOnly`
- **Testing:** Vitest, @vitest/coverage-v8, jsdom, msw (Mock Service Worker)
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Documentation

- Lefthook: https://lefthook.dev/llms.txt
- MSW: https://mswjs.io/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- Sentry (JavaScript): https://context7.com/getsentry/sentry-javascript/llms.txt
- TypeScript: https://www.typescriptlang.org/llms.txt
- Vitest: https://vitest.dev/llms.txt

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (clears `dist/`, Rolldown, `.d.ts` emit)
- **Test (with coverage):** `pnpm test`
- **Lint / Format / Typecheck:** `pnpm lint` / `pnpm format` / `pnpm typecheck`
- **All checks (incl. build):** `pnpm check`

## Project Structure

- `src/index.ts` — public entry point
- `src/util/`, `src/logging/`, `src/typecheck/`, `src/pagelifecycle/`, `src/const/` — utility modules grouped by concern
- `tests/mocks/` — shared test mocks (used via `vitest.setup.ts`)
- `vitest.setup.ts` — Vitest global setup (msw, mocks)
- `dist/` — build output (gitignored)

## Conventions

- **Commits:** Conventional Commits with custom rules (header ≤ 100, body line ≤ 100, no sentence/start/pascal/upper-case subjects)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt

## Testing

- Tests are co-located with source as `*.test.ts` under `src/`
- Shared mocks live in `tests/mocks/`; HTTP mocking via `msw`
- Run a single file: `pnpm test src/util/uuid.test.ts`
- DOM APIs available via jsdom environment
