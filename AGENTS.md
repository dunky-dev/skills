# Agents

The working contract for anyone — human or agent — modifying code in this
repo. This file is the canonical entry point: read it first, every time.

This is the dunky skills repo: a small set of agent skills (`skills/`) that
staff the `SPEC -> TEST -> IMPLEMENT -> RECONCILE` loop every dunky repo
runs, the standards they equip (`standards/`), the scenarios that test them
(`vibe/`), and the docs site (`website/`). Skills and standards are
markdown; the pnpm workspace serves the website and the formatters only.

## Preflight

Before touching any code, read these in order:

1. `AGENTS.md` (this file) — rules, boundaries, the flow.
2. `README.md` — what this repo is and where things are.
3. `ARCHITECTURE.md` — the deep reference: roles, shared contracts, decisions.

If a nested `AGENTS.md` exists next to a `SKILL.md`, read it before
editing files in that scope — it overrides anything here for that scope
(see [Agents](#agents-1)).

## Scopes

| Scope     | Path         | What it is                                                                    |
| --------- | ------------ | ----------------------------------------------------------------------------- |
| Skills    | `skills/**`  | The installable set: one directory per skill, `SKILL.md` and its files        |
| Standards | `standards/` | Expert briefs any skill can equip, plus the shared finding and severity rules |
| Vibe      | `vibe/`      | This repo's scenarios and fixtures, run by the vibe-test skill                |
| Website   | `website/`   | The Astro docs site, a package in the root pnpm workspace                     |
| Research  | `research/`  | The reports behind the design                                                 |

Some changes are cross-scope: a new standard may need a scenario, a docs
page, a line in `ARCHITECTURE.md`, and a `CHANGELOG.md` entry. Check what else your change touches before calling it done.

## Boundaries

These are invariants, not preferences. Violating them breaks the
architecture:

- **A skill is self-contained except for standards.** `npx skills add`
  copies skill directories only. A skill reads `standards/` from the repo it
  runs in and nothing else outside its own folder.
- **A shared rule is written once, in `standards/`.** `finding.md` is the
  one finding format, `severity.md` the one severity ladder. Skills point
  to them; they never restate them.
- **Standards hold knowledge, not procedure.** No steps in a standard.
  Steps belong to the skill that equips it.
- **A user-invoked skill may call model-invoked skills, never another
  user-invoked one.** Tell the user to run it instead.
- **The description is the trigger, never a summary of the workflow.** A
  model that reads the summary acts on it and skips the body.
- **`SKILL.md` stays under 150 lines, references one level deep.** Every
  line is paid in context on every run.

## Workflow

`SPEC -> TEST -> IMPLEMENT -> RECONCILE`

Keep an eye on what's been done and what's going on so you don't make a
mess: know the state before you change it, and check your work still
fits after.

### SPEC

Describes the skill's intent: the problem it solves, its expected
behavior, and the constraints and edge cases that define its scope. This
repo has no `SPEC.md` files. `SKILL.md` is the spec the agent runs, the
skill's `README.md` carries the why and the never, and `vibe/scenarios/`
holds the executable rubrics. State what the skill is meant to do rather
than enumerating steps — the reconcile step verifies `SKILL.md` against the
rubrics.

A design decision lives in one place: `ARCHITECTURE.md` for the set,
`standards/` for a shared rule. Don't copy it into every skill it touches;
point to it.

### TEST

Write the scenario first. A scenario is a folder in `vibe/scenarios/`
with `prompt.md`, the naive prompt a user would type, `expect.md`, one
checkable statement per line, and `skills`, the skills to install. It is the executable spec: it captures what the
skill is meant to do before the prompt exists. The baseline run (no skill)
must fail the rubric, or the scenario proves nothing.

### IMPLEMENT

Write the `SKILL.md` that realizes the intent and passes the scenarios,
within the boundaries. Second person, imperative, leading words, a
completion criterion per step, a `Reply:` line at the end. Prompt the
positive. Delete any line the model already obeys by default. Match the
shape of the existing skills rather than inventing structure.

### RECONCILE

Check whether the description and rubrics still describe the skill: loop
back or ship it. Before shipping: lint and format pass, the touched skill's
scenarios pass (`/vibe-test <scenario>`), and the change is verified across
all scopes. If something's off, loop back to SPEC or
TEST; if not, ship it!

## Code

### Principles

Every change is held to these four, in this order — simplest thing that
works, written once, built only when needed, behaving as promised:

| Principle | Meaning                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **KISS**  | Keep it simple. Prefer the plain solution over the clever one; complexity must earn its keep with a need the simple version can't meet.                      |
| **DRY**   | Don't repeat yourself. A rule two places must agree on is written once and shared — duplication is where the copies drift apart.                             |
| **YAGNI** | You aren't gonna need it. Build for the requirement in front of you, not the one imagined; speculative machinery is deleted-on-sight, not kept just in case. |

### Naming

Descriptive names everywhere. Short names are fine for local variables
with a tight, obvious scope.

### Comments

If the code says what it does, the comment is noise. Write comments to
explain _why_: a hidden constraint, a subtle invariant, a workaround, a
hard decision. Keep them short — over-explaining is its own kind of
noise.

### Context

Context is the constraint. Every line in a `SKILL.md` is paid on every
run, and every line in a standard is paid when it is equipped. Run
the no-op test on each sentence: if the model already does it, delete the
sentence. Move anything deterministic into `scripts/`.

### Testing

Scenarios cover behavior only — what the skill makes the agent do, not
how the prompt is worded.

No overlapping scenarios — each covers one distinct behavior. Do not
write a scenario that is an implicit consequence of another passing.
Fixture repos live in `vibe/fixtures/` and are shared; a scenario never
carries its own copy of a repo. Scenarios cost agent runs: keep them under
ten per skill and run them on demand, not on every commit.

## Versioning

Every PR with a user-visible change to a skill adds a line under
`## Unreleased` in `CHANGELOG.md`, written from the consumer's
perspective — the behavior or decision, not the file change. Include the
why for non-obvious decisions. A release is a git tag `vX.Y.Z` that moves
`Unreleased` under a version heading.

| Bump      | When                                                               |
| --------- | ------------------------------------------------------------------ |
| **Major** | A skill's behavior contract or invocation changes; milestone 1.0.0 |
| **Minor** | New skill, new standard, new backward-compatible behavior          |
| **Patch** | Prompt tightening, wording, fixes                                  |

## Agents

If a skill needs rules of its own, add an `AGENTS.md` next to its
`SKILL.md`. Resolution is nearest-wins: an `AGENTS.md` inside the
directory you're editing — or any ancestor up to the repo root —
overrides everything above it for that directory's code. Read every
`AGENTS.md` between the repo root and the file you're editing, apply them
top-down, and let the closest one settle conflicts.

Keep nested files small — encode only what genuinely differs from this
file. A nested file that would just restate the root should be deleted.

## Diagrams in docs

Draw ASCII diagrams (boxes, trees, flows) with plain `|`, `-`, and `+`
only — never Unicode box-drawing characters (`┌ ┐ └ ┘ ─ │ ├ ┼ ▼` …).
Use `|` for verticals, `-` for horizontals, `+` for every corner and
junction, and a plain `v` / `^` / `>` / `<` for arrowheads. The
box-drawing glyphs render inconsistently across fonts, terminals, and
GitHub, and are awkward to edit; the ASCII set is portable and diffs
cleanly. This applies to every `.md` in the repo.
