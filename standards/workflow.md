# Workflow

`SPEC -> TEST -> IMPLEMENT -> RECONCILE`

Keep an eye on what's been done and what's going on so you don't make a
mess: know the state before you change it, and check your work still
fits after.

## SPEC

Describes the package's intent: the problem it solves, its expected
behavior, and the constraints and edge cases that define its scope. The
spec is a description of intent, not a checklist — the reconcile step
verifies the implementation against it, so state what the package is
meant to do rather than enumerating fields. Capture what carries design
and API meaning: the consumer-facing API, the behavior contract, and any
UX or reference material that anchors it. Its home is the package's
`SPEC.md`.

If the package has no `SPEC.md` yet, ask before creating one — don't
add it unprompted.

A design decision lives in one `SPEC.md` — the package it's about.
Don't copy it into every package it touches. When a decision affects
others, just check their specs don't now contradict it; only edit
another package's `SPEC.md` if it genuinely conflicts (and prefer a
short cross-reference over restating the decision).

## TEST

Write behavior tests first. Tests are the executable spec: they capture
what the code is meant to do before the code exists.

## IMPLEMENT

Write the code that faithfully realizes the SPEC and the behavior the
TEST phase captures, within the boundaries and the architecture. The
implementation must cover the intent, not merely satisfy the assertions.
Match the existing code patterns rather than inventing structure
whenever possible, otherwise open it up for discussion.

## RECONCILE

Check whether the SPEC still describes the code: loop back or ship it.
Before shipping: tests, lint, and type-check pass, and the change is
verified across all scopes. Use the `/code-review` skill before
reviewing code, and suggest improvements you noticed along the way —
don't just do the minimum. If something's off, loop back to SPEC or
TEST; if not, ship it!

## Sources

Keep an eye on `README.md`, `AGENTS.md`, `ARCHITECTURE.md`, `SPEC.md`, and `CONTRIBUTING.md`. Use the dunky `scout` skill to explore and tackle tasks when
it is installed and you need it, you can suggest it too, otherwise go freestyle.
