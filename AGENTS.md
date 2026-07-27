# AGENTS.md

## Overview

A general-purpose utility library for common JavaScript operations, grouped by concern (`util`, `logging`, `typecheck`, `pagelifecycle`, `const`). Optional Sentry integration for browser error tracking.

## Tech Stack

Read [package.json](package.json) for the language, runtime, dependencies and tooling.

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

## Conventions

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/`
- Shared mocks live in `tests/mocks/`; HTTP mocking via `msw`
- Run a single file: `pnpm test src/util/uuid.test.ts`
- DOM APIs available via happy-dom environment
