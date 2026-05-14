# AGENTS.md

## Overview

A general-purpose utility library for common JavaScript operations, grouped by concern (`util`, `logging`, `typecheck`, `pagelifecycle`, `const`). Optional Sentry integration for browser error tracking.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js / Browser
- **Package Manager:** pnpm (workspaces)
- **Optional Dependencies:** `@sentry/browser` (error tracking integration)
- **Build:** Rolldown + `tsc --emitDeclarationOnly`
- **Testing:** Vitest, @vitest/coverage-v8, happy-dom, msw (Mock Service Worker)
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Documentation

- Lefthook: https://lefthook.dev/llms.txt
- MSW: https://context7.com/websites/mswjs_io/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- Sentry (JavaScript): https://context7.com/getsentry/sentry-javascript/llms.txt
- TypeScript: https://context7.com/websites/typescriptlang/llms.txt
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

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/`
- Shared mocks live in `tests/mocks/`; HTTP mocking via `msw`
- Run a single file: `pnpm test src/util/uuid.test.ts`
- DOM APIs available via happy-dom environment
