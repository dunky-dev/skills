# Contributing

For the contribution _workflow_, conventions, and boundaries, see
[`AGENTS.md`](./AGENTS.md) — it's the same contract agents follow here, and
it applies to you too.

## Setup

```bash
git clone --recurse-submodules git@github.com:dunky-dev/skills.git
cd skills
nvm use
corepack enable
pnpm install
```

The skills themselves are markdown and sh. `pnpm install` brings the root
tooling (oxlint, oxfmt, TypeScript) and the website, a package in the root
pnpm workspace. The scenarios under `vibe/` are run by the vibe-test skill,
installed from its own repo.

## Commands

| Command                        | What it does                                        |
| ------------------------------ | --------------------------------------------------- |
| `/vibe-test <scenario>`        | Run one scenario with the vibe-test skill installed |
| `npx skills add . --list`      | What the registry would discover from this checkout |
| `pnpm website:dev`             | Docs site locally                                   |
| `pnpm lint`                    | `oxlint`                                            |
| `pnpm format` / `format:check` | `oxfmt`                                             |
| `pnpm typecheck`               | `astro check` on the website                        |

Scenarios cost agent runs. Run them for the skill you touched, not the set.

## Scope rule

A new skill needs an **observed failure**: a session where an existing
skill, standard, or `AGENTS.md` rule did not produce the behavior, with the
transcript or a short description of what went wrong. If the behavior can
be composed from what exists, extend that instead. New standards follow the
same rule.

## Filing an issue

A bug report is only as useful as its reproduction. For a skill that is the
prompt you typed, the repo state it ran against, and what it did instead. If
you can turn it into a scenario under `vibe/scenarios/`, do; a failing
scenario is the best report.

## Pull requests

### Humans

When using AI to help write changes, read the diff like you wrote it
yourself before asking someone else to. Cut lines the model already obeys,
drop anything that drifted from what you're fixing, and be able to explain
any sentence if asked. A reviewer's time isn't free.

### AI

Before opening it, make sure lint and format pass, the touched skill's
scenarios pass, and `CHANGELOG.md` has a line under `Unreleased` — see `AGENTS.md`'s
RECONCILE step.
