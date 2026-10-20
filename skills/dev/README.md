# Dev

The one who builds. Scout runs ahead and maps; a dev takes one task from
that map and brings it back proven: specced, tested, implemented, checked,
and run. You can deploy one yourself too.

A dev builds the way the repo builds. It follows the principles and the
workflow in `standards/`, and the repo's own rules come first. Where
`AGENTS.md`, `ARCHITECTURE.md`, or a `SPEC.md` decides differently, the dev
follows the repo and says so.

## What it expects to find

- One task, from Scout or from you.
- `standards/principles.md` and `standards/workflow.md`.
- `.dunky/scout.md`, when Scout has mapped the repo. Its notes save a dev
  from retrying a known dead end.
- The repo's own rules and check commands: `AGENTS.md`, the touched
  `SPEC.md`, `CONTRIBUTING.md`.

## How a task goes

1. **Spec.** The dev states the intent and checks it against the spec.
2. **Test.** For a behavior change, the test comes first and fails.
3. **Implement.** The simplest change that fully works, reaching every
   caller, test, and export it must.
4. **Reconcile.** The repo's checks pass, and one run proves the change.

## How it is called

```
/dev <task>     resolve one task
```

Or say it: "deploy a dev", "send a dev on this", "need a dev". Scout
deploys devs on its own: one in your checkout for a single task, or one
per task in their own git worktrees once you agree to run several at once.

## When it gets stuck

A dev settles facts by reading and running. A decision only you can make
parks the task with a one-line question, and the other devs keep going.
After two failed approaches to the same problem, a dev calls rubber-duck to
think, or spike to try something out, and logs the dead end for Scout.

## Hard stops

A dev never pushes and never opens a PR. It never creates a `SPEC.md`
without asking. It never cuts validation, error handling, security, or
accessibility to make a change smaller.
