# Project Rules

This file lists the rules every change to this repository must follow. The rules apply to source code, content, markdown, config, and any text file committed to the repo.

## 1. No em dashes, no en dashes, no unicode dashes

The characters below are forbidden anywhere in the project:

- U+2014 EM DASH (--)
- U+2013 EN DASH (-)
- U+2015 HORIZONTAL BAR
- U+2212 MINUS SIGN

Use a regular ASCII hyphen (-) instead.

Examples:

| Wrong | Right |
| ----- | ----- |
| `use \u2014 in prose` | `use - in prose` |
| `range 1\u20135 staff` | `range 1-5 staff` |
| `the chain \u2014 it stops` | `the chain - it stops` |

Rationale: em dashes and en dashes are a common artifact of AI generated text. They render inconsistently across fonts and break plain text tooling. This repo keeps all text ASCII hyphen only.

### Automated enforcement

- `npm run check:dashes` scans the repo and fails if any forbidden dash is found.
- The check runs automatically:
  - Before every commit (husky pre-commit hook).
  - Before every push (husky pre-push hook).
  - Before every build and deploy (`prebuild` runs the check, so `npm run build` and any deploy that builds fails early).
- The check ignores generated and binary files: `node_modules/`, `.next/`, `.git/`, `.husky/_/`, `.playwright-mcp/`, `out/`, `dist/`, `package-lock.json`, `*.tsbuildinfo`, `*.map`, and any file that decodes as binary.

## 2. Do not touch the main branch

- All work happens on feature branches (for example `ticketing`).
- Never modify, merge into, or deploy `main` without explicit approval.

## 3. Keep the landing page intact

- The landing page (`/`), its components, and `site.css` must stay visually identical to `main`.
- Do not restructure the site layout or its styling.

## 4. Build and typecheck before commit

- `npm run build` must pass before committing.
- `npx tsc --noEmit` must pass before committing.

## 5. No secrets

- Never commit API keys, tokens, credentials, or `.env*` files.
- Never log secrets to the console.

## 6. No generated files in commits

- Do not commit `node_modules/`, `.next/`, `.tsbuildinfo`, or screenshots/snapshots unless the task explicitly asks for them.
