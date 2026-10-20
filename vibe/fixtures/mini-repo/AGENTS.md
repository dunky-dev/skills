# Agents

Fixture repo for skill scenarios. One package, one spec, one deliberate drift.

## Workflow

`SPEC -> TEST -> IMPLEMENT -> RECONCILE`. The spec is `SPEC.md`. Reconcile
means: does the spec still describe the code?

## Boundaries

- `src/` is pure TypeScript. No platform imports.
- Every exported function has a sentence in `SPEC.md`.
