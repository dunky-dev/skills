# Contributing

For the contribution _workflow_, code conventions, and boundaries, see [`AGENTS.md`](./AGENTS.md) — it's the same
contract agents follow here, and it applies to you too.

## Setup

```bash
git clone git@github.com:dunky-dev/template-repo.git
cd template-repo
nvm use
corepack enable
pnpm install
```

## Commands

| Command                        | What it does                                               |
| ------------------------------ | ---------------------------------------------------------- |
| `pnpm test`                    | Full test suite, watch mode                                |
| `pnpm typecheck`               | `tsc --noEmit` across the whole workspace                  |
| `pnpm lint`                    | `oxlint`                                                   |
| `pnpm format` / `format:check` | `oxfmt`                                                    |
| `pnpm knip`                    | Unused-export / dependency detection                       |
| `pnpm changeset`               | Add a changeset — see [Versioning](./AGENTS.md#versioning) |

Target one package or one file instead of the whole workspace:

```bash
pnpm test packages/<name>   # only that package's tests
pnpm test <name>.test       # only files matching that name
```

## Sandbox

<!-- If this repo ships runnable sandboxes or demo apps, document how to start
each one here — it's the fastest way to see a change work end to end. Point at
a sandbox/README.md if there's more than one substrate. Delete this section if
there's nothing to run. -->

```bash
pnpm -C <path/to/sandbox> dev
```

## Filing an issue

A bug report is only as useful as its reproduction. Use an **SSCCE** — Short,
Self-Contained, Correct (Compilable) Example:

- **Short** — the smallest bit of code that still reproduces it. Strip
  everything that isn't load-bearing.
- **Self-contained** — no missing imports, no "assume you have X set up."
  Someone should be able to paste it and run it with nothing else.
- **Correct (compilable)** — it actually runs and actually reproduces the
  bug. Not what you _think_ is happening — what you pasted and ran.

The [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) asks for
exactly this. If you can't shrink your repro to an SSCCE, that's often a sign
the bug isn't where you think it is — shrinking it is frequently how you find
the real cause yourself.

## Pull requests

### Humans

When using AI to help write changes, read the diff like you wrote it yourself
before asking someone else to. Cut comments that don't say anything, drop
anything that drifted from what you're actually fixing, and be able to
explain any line if asked. A reviewer's time isn't free.

### AI

Before opening it, make sure tests, lint, and typecheck pass, and a changeset is
included — see `AGENTS.md`'s RECONCILE step.
