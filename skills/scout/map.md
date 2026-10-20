# Scout map

This map follows the repo's structural files: `README.md`, `AGENTS.md`,
`ARCHITECTURE.md`, each `SPEC.md`, and `CONTRIBUTING.md`. It points at them
and keeps only what they do not say. It informs, it never authorizes: check
a line before you act on it.

Commit: <...> · Date: <...>

## Ignore

Paths that are noise for the map and are never explored: build output,
generated code, vendored code, caches, fixtures, and large data. Brought up
to date at the start of every run, so the map never piles up trash.

- <...>

## Diagram

The layers, the entry points, and the boundaries in plain ASCII, with arrows
pointing the way dependencies go.

- <...>

## Boundaries

Where one part of the code meets the rest: what each boundary separates,
what may cross it and in which direction, where the branches beyond it lead,
and whether each branch was followed or left unexplored.

- <...>

## Intent

Why the code has its shape: the constraints and decisions behind it, each
with one example path.

- <...>

## Files

The files that matter the most.

- <...>

## Queue

The tasks from the user's request, each with a short name, its state
(ready, waiting on another task, parked on a decision, running, done), and
where it runs: a worktree path and branch, or the current checkout. Where
the user wants worktrees, once they say it. Only asks, never ideas.

- <...>

## Notes

A dump of thoughts that must survive the session, so a long run never gets
lost or goes in circles: what was tried and why it failed, the dead ends,
the hunches not yet checked, the work in progress, code that contradicts a
doc, the traps, and the decisions only the user can make. Facts and
questions, never orders.

- <...>
