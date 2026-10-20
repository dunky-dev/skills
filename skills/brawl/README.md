# Brawl

The big-picture review, held before the PR opens.

On a team, every reviewer feeds the diff to their own agent with their own
lens and their own context. Each comment starts a fight, and soon the PR is
an arena for agents and the people behind them. Brawl holds that fight
first. It reads the change the way those reviewers would, raises what they
would raise, and sends every finding through its own red-vs-blue fight. Only
what survives comes back, scored and sorted, with one verdict.

## What it expects to find

- A change: the working tree, a branch, or a PR.
- The intent: the PR text, or your own words about what the change does.
- The repo's context, when it exists: `AGENTS.md`, `ARCHITECTURE.md`, the
  touched `SPEC.md`, and Scout's map in `.dunky/scout.md`. The repo's rules
  win over any standard.
- `standards/` at the repo root: the lenses, plus `finding.md` and
  `severity.md`, which shape and score every finding.

## Lenses

Two lenses run every time:

- **Intent.** Does the diff do what the PR text says, all of it, and
  nothing it does not say?
- **Logic.** Does it behave for every input and state it can meet?

Add more when the change calls for them: `--equip a11y,security`. Any file
in `standards/` is a lens.

## When a change gets a brawl

When you ask for one. Devs keep running and never stop to review each
other; you call the brawl on the changes where the stakes are worth it.

## How it is called

```
/brawl                        the working tree against its base
/brawl <branch|pr>            a branch or a PR
/brawl --equip a11y,security  add lenses to intent and logic
```

Or say it: "brawl this", "brawl the PR", "stress-test this diff". Brawl
runs only when you ask for it.

## What comes back

- **Act on.** At most five findings, each with its gate score.
- **Consider.** Real, but not worth blocking the PR.
- **Dismissed.** Every finding that fell, with a one-line reason, so you can
  check the filter.
- **Verdict.** Ship, Fix first, or Needs discussion.

## Hard stops

Brawl never fixes. It never reviews a plan with the full set of lenses,
because adversarial review of plans produces imagined risks. It never
raises old problems in code the change does not touch.
