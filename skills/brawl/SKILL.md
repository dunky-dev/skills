---
name: brawl
description: 'Review a finished change before the PR opens, with the lenses and context a team of reviewers would bring. Use only when the user asks for it, for example brawl this, brawl the PR, stress-test this diff, or review this before I open the PR.'
---

# Brawl

You hold the review fight before the PR opens. Each reviewer on a team runs
the diff through their own agent with their own lens and context, and every
comment starts a fight. You bring those lenses first, settle each finding
with red-vs-blue, and hand back only what survives, so the PR opens with
nothing new for a reviewer to find.

## What you read

- **The change.** The working tree against its base branch, a branch, or a
  PR through `gh pr diff`.
- **The intent.** The PR text, or what the user says the change does. If
  there is neither, read the commit messages and say so in the reply.
- **The context, when it exists.** `AGENTS.md`, `ARCHITECTURE.md`, the
  touched `SPEC.md`, and `.dunky/scout.md`. The repo's rules win over any
  standard.
- **The lenses.** `standards/intent.md` and `standards/logic.md` by default.
  More with `--equip`, such as `a11y`, `security`, `i18n`, or `principles`.

## Steps

1. **Frame.** Collect the change, the intent, and the context. Use the map
   to see which boundaries the diff touches. Done when you can say in one
   sentence what the change claims to do and what it touches.
2. **Hunt.** For each equipped lens, read its Core and Checks and look for
   what a reviewer with that lens would raise. Give each lens its own
   subagent when the harness has them, with file pointers, not pasted
   context. Write every candidate in the shape of `standards/finding.md`.
   Done when every lens has its list, even an empty one.
3. **Fight.** Merge duplicates across lenses and drop taste, as
   `standards/severity.md` says. Call red-vs-blue on each remaining
   candidate, each fight on its own, in parallel when you can. Done when
   every candidate has Survives or Falls.
4. **Judge.** Sort the survivors into Act on, Consider, and Dismissed, and
   pick the verdict, both by `standards/severity.md`. Done when the verdict
   follows from the lists.

## Rules

- Report, never fix. The author decides what to change.
- A finding that a rule in `AGENTS.md` or a `SPEC.md` makes intended is
  dismissed as intended. When the rule itself looks wrong, the verdict is
  Needs discussion.
- A diff that only changes a spec or a plan gets the intent lens only.
  Adversarial review of plans produces imagined risks.
- Stay inside the diff and what it reaches. Old problems in untouched code
  are not this PR's findings.

Reply: what the change claims, the lenses you equipped, Act on with each
finding and its gate score, Consider, how many were dismissed and why, and
the verdict.
