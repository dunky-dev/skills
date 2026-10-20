# Architecture

The dunky agent skills: six skills that staff the
`SPEC -> TEST -> IMPLEMENT -> RECONCILE` loop every dunky repo already runs,
plus EXPLORE as the entry before it and a review before the PR. The loop lives in each repo's
`AGENTS.md`. The skills do not add states to it; they staff the states that
exist.

## Layout

```
skills/
  skills/        the installable set, one directory per skill
  standards/     expert briefs any skill can equip, one specialty per file
  vibe/          this repo's own scenarios and fixtures, run by the vibe-test skill (its own repo)
  website/       the Astro docs site, served at dunky.dev/skills
  research/      the reports behind the design
```

Install with `npx skills add dunky-dev/skills`. The CLI copies or symlinks
each `skills/<name>/` into the user's agent directories.

### A skill folder

```
<skill>/
  SKILL.md        the prompt and the spec, one file, under 150 lines
  README.md       for humans: the reference, what it expects, how to call it
  *.md            templates and role prompts at the root
  scripts/        deterministic work
  media/          images and support files
```

No `SPEC.md`. `SKILL.md` states what the agent does; `README.md` states why
and what it never does; the scenarios in `vibe/` are the executable spec.

## Roles

```
   EXPLORE              SPEC TEST IMPLEMENT RECONCILE      WHEN YOU ASK
 +--------------+     +------------------------+     +-------------+
 | scout        |---->| dev                    |- - >| brawl       |
 | maps, then   | task| one task: spec, test,  | you | red-vs-blue |
 | deploys devs |     | implement, reconcile   | ask | per finding |
 +--------------+     +-----------+------------+     +------+------+
                                  ^     fix first           |
                                  +-------------------------+

 rubber-duck and spike help anyone who is stuck, in any state.
```

| Skill         | Invoked by  | Does                                                            | Never                              |
| ------------- | ----------- | --------------------------------------------------------------- | ---------------------------------- |
| `scout`       | user, model | Maps a repo into `.dunky/scout.md`, then deploys a dev per task | Writes code. Queues its own ideas  |
| `dev`         | user, model | Resolves one task with the principles and workflow, proves it   | Pushes. Opens a PR                 |
| `rubber-duck` | user, model | Talks anyone stuck through a hard thought                       | Decides, recommends, writes        |
| `spike`       | user, model | Answers one question by trying, on a `research/` branch         | Ships its code                     |
| `brawl`       | user, model | Reviews a finished change with the lenses reviewers would bring | Runs unasked. Fixes. Reviews plans |
| `red-vs-blue` | user, model | Settles one finding: Red attacks, Blue refutes, the gate scores | Fixes. Argues taste                |

Every skill answers to plain phrases in its description as well as its
slash command, so nobody has to type `/something`. Brawl runs only when the
user asks for it.

## Standards

A standard is one file in `standards/` about one specialty, written as the
core of what a senior specialist knows: broad, steering, not a checklist.
Each has the same three sections: Core, Sources, Checks. Brawl hunts with
the Checks of each lens it equips; Red and Blue argue over them. Dev builds
by `principles.md` and `workflow.md`. Two files are shared rules rather
than knowledge: `finding.md`, the one finding format, and `severity.md`,
the severity and evidence ladder, the gate's scores, and the verdicts.

| Standard        | Specialty                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------- |
| `a11y.md`       | W3C accessibility contract, keyboard, focus, names, announcements                         |
| `i18n.md`       | Internationalization: strings as data, plurals, formats, bidi                             |
| `security.md`   | Trust boundaries, injection, least authority, supply chain, sandboxes                     |
| `workflow.md`   | The knowledge behind SPEC, TEST, IMPLEMENT, RECONCILE, and how to read a repo's own rules |
| `principles.md` | KISS, DRY, YAGNI applied                                                                  |
| `logic.md`      | Correctness, edge cases, state                                                            |
| `intent.md`     | Does the diff do what the PR text says, all of it, and nothing else                       |
| `finding.md`    | The one shape of a finding: place, failure path, evidence, severity                       |
| `severity.md`   | Severity and evidence ladders, gate scores, lead judgment, verdicts                       |

Standards live at the repo root, not inside a skill. `npx skills add` does
not install them. A skill that equips one reads it from the repo it runs
in; a target repo that wants them carries its own `standards/`.

## Dependency direction

```
scout -------> dev, spike, rubber-duck
dev ---------> standards/principles.md, standards/workflow.md, spike, rubber-duck
brawl -------> red-vs-blue, standards/, AGENTS.md, SPEC.md, .dunky/scout.md
red-vs-blue -> standards/finding.md, standards/severity.md
```

Every skill can be called by an agent, so any skill may call another. A
skill that only the user may start would break this, and none is marked so
today.

## Decisions

Dated. The why is here once; skills point at it.

- **2026-10-15 · Spec as invariant.** RECONCILE asks whether the spec still
  describes the code and can send the loop back to SPEC. The reference
  setups treat the spec as input only. See `research/skills-landscape.html`.
- **2026-10-15 · Standards over personas.** Review diversity comes from
  lenses (standards) and mandates (Red vs Blue), not from assigned
  personalities. Model diversity is an optional `--cross` flag.
- **2026-10-15 · No adversarial review of plans.** Both reference setups
  report hallucinated risk. Specs get the spec-completeness standard only.
- **2026-10-16 · No `SPEC.md` in this repo.** `SKILL.md` is the spec,
  `README.md` carries the why, scenarios are the tests.
- **2026-10-16 · Skills carry no toolchain.** Skills and standards are
  markdown. The root pnpm workspace exists for the website and the
  formatting tools, never for a skill. Versioning is `CHANGELOG.md` and git
  tags.
- **2026-10-16 · Scope rule.** A new skill needs an observed failure that no
  existing skill or standard can absorb. See `CONTRIBUTING.md`.
- **2026-10-17 · EXPLORE.** The entry before the loop, named for what Scout
  does. Target repos keep their four states.
- **2026-10-19 · Vibe tests through promptfoo.** The runner is promptfoo;
  the vibe-test skill owns only the agent adapters, the isolation, and the
  judge wiring. See `research/vibe-test-options.html`.
- **2026-10-19 · Four skills.** scout, rubber-duck, red-vs-blue, spike. The
  interviewer, the single-pass reviewer, and setup were dropped until an
  observed failure brings one back.
- **2026-10-19 · Standards at the root.** Shared knowledge is repo-level,
  not skill-level. Accepted cost: not installed by `skills add`.
- **2026-10-19 · Scout keeps a local map.** One gitignored file,
  `.dunky/scout.md`, replaces the map issue and the `scout:*` tickets on
  GitHub. A map is navigation for the next session, not a decision record,
  so it does not need a tracker. Scout is model-invocable so an agent can
  orient itself, and so vibe tests can fire it. `.dunky/` is the home for
  any later skill's local state.
- **2026-10-20 · Brawl.** red-vs-blue is renamed brawl and widened to a
  generic stress test: the diff against the equipped standards and the
  repo's own context, its contract, spec, and Scout's map. Red, Blue, and
  the gate stay as the fight inside it.
- **2026-10-20 · vibe-test is its own repo.** It tests skills, so it is not
  one of them. This repo keeps its scenarios under `vibe/` and installs
  vibe-test like any consumer.
- **2026-10-20 · Brawl and red-vs-blue apart.** This supersedes the rename
  above. Red-vs-blue is back as the fight over one finding. Brawl is a new
  skill: the big-picture review before the PR, which raises findings with
  its lenses and sends each one through its own red-vs-blue fight. On a
  team, reviewers bring their own agents and lenses to a PR and every
  comment starts a fight; brawl holds that fight before the PR opens.
- **2026-10-20 · Seven skills.** dunky, scout, dev, rubber-duck, spike,
  brawl, red-vs-blue. Plain names, no prefix. See
  `research/skill-flow.md` for the flow and the task tree.
- **2026-10-20 · Scout deploys, devs build.** Scout maps first and never
  waits: it queues the tasks from the user's request in its map and
  deploys a dev on every ready task. One task runs in the current checkout;
  several run in parallel, one git worktree each, after Scout asks once
  where they go, or one by one as a kanban when the user says no
  worktrees. Every task shows where it runs. Scout still
  writes only the map.
- **2026-10-20 · A triage line decides the brawl.** Every dev ends with
  `brawl: yes` or `brawl: no` and the trigger behind it. Not every task
  needs the big review, and the line is a recommendation to the user.
- **2026-10-20 · Called by phrase.** Every skill lists plain phrases in its
  description and none is user-invoked only, so "ask Dunky" or "deploy a
  dev" works without a slash command. Brawl runs only when the user asks.
- **2026-10-20 · Dunky removed.** The front-door skill only routed a
  request to a skill, which the harness already does by matching the
  request against each description. A "what next?" companion that reads
  the queue and the parked decisions would earn a skill,
  once an observed failure asks for it.
- **2026-10-20 · No triage. Brawl on request.** This supersedes the triage
  line above. Devs no longer end with `brawl: yes` or `brawl: no`: a review
  step after every task slows the flow, and the person running it knows
  which changes deserve a brawl. Devs keep running; you ask for a brawl.
