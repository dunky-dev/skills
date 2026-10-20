# Code

Every change is held to these four, in this order — simplest thing that
works, written once, built only when needed, behaving as promised:

| Principle | Meaning                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **KISS**  | Keep it simple. Prefer the plain solution over the clever one; complexity must earn its keep with a need the simple version can't meet.                      |
| **DRY**   | Don't repeat yourself. A rule two places must agree on is written once and shared — duplication is where the copies drift apart.                             |
| **YAGNI** | You aren't gonna need it. Build for the requirement in front of you, not the one imagined; speculative machinery is deleted-on-sight, not kept just in case. |

## Naming

Descriptive names everywhere. Short names are fine for local variables
with a tight, obvious scope.

## Comments

If the code says what it does, the comment is noise. Write comments to
explain _why_: a hidden constraint, a subtle invariant, a workaround, a
hard decision. Keep them short — over-explaining is its own kind of
noise.

## Performance

Performance is a constraint, not a feature. Prefer mutation over
allocation on hot paths. Avoid spreading objects, chaining array
methods, or allocating closures inside loops.

## Testing

Unit tests cover behavior and logic only — test what the code does, not
how it's structured.

No overlapping tests — each test covers one distinct behavior. Do not
write a test that is already an implicit consequence of another test
passing. Shared setup goes at the top of the file: if multiple tests
need the same machine config or helper, define it once at the top, not
inside each test. Reusable multi-file fixtures go in
`fixtures/` — anything shared across test files lives there, not
inlined or duplicated.

## Accessibility

Accessibility is referenced, not improvised — the external specs are the
contract, and the API is cross-matched against them.
[`ACCESSIBILITY.md`](./a11y.md) is the reference: read it before
designing a public API.

## Versioning

| Bump      | When                                          |
| --------- | --------------------------------------------- |
| **Major** | Breaking changes; stable milestone (1.0.0)    |
| **Minor** | New backward-compatible feature               |
| **Patch** | Bug fix, dependency update, cleanup, refactor |
