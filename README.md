# tasks-sample

A small task-list library, kept as a sample project with real code, real tests and room for small changes.

## Working here

- Node 20 or newer. Install with `npm ci`.
- `npm test` runs the tests (Vitest). `npm run typecheck` checks types.
- Source lives in `src/`. Each module has its tests beside it, as `name.test.ts`.
- Functions are pure: they take a value and return a new one. Nothing reads the clock, the network or the disk unless a parameter says so.
- Errors are thrown with a short sentence a person could read.

## Modules

- `src/tasks.ts`: add, complete and list tasks.
- `oldestOpen(list)`: returns the earliest-created open task, or `undefined` when there is none.
- `src/duration.ts`: parse short durations such as `15m`.
