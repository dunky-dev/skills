# Skill flow and task tree

Planned 2026-10-20. Built the same day, see Status. Skills keep plain
names with no prefix. The builder is `dev`; the name may change later.

## Status

Tasks 0 to 9 are written. None of the new scenarios has run yet: they cost
agent runs, and vibe-test now lives in its own repo.

Choices made while the user was away, each taken from this plan's own
recommendation:

- **Call rule.** Every skill is callable by the user and by agents. Brawl
  runs only when the user asks, through its description.
- **Dev questions.** Own git worktree per dev, park instead of block, tests
  first for behavior changes, hand back a branch and map notes, never push
  or open a PR, rubber-duck or spike after two failed approaches.
- **Phrase test.** A scenario prompt may not name its skill, so "ask
  Dunky" cannot be a scenario. The dunky scenario tests the routing
  instead: a vague request must go to Scout.

Removed later the same day: the triage line. Devs no longer end with
`brawl: yes` or `brawl: no`; the user asks for a brawl when a change is
worth one, so devs keep running.

Also removed: `dunky`. Routing alone adds nothing the
harness does not already do by matching descriptions. The sections below
still describe it as planned.

Still open: standards do not install with `npx skills add`, so `dev` and
`brawl` find no standards in another repo. A standards skill would fix it.

## The problem

After a PR opens, each reviewer runs the diff through their own agent with
their own lens and context. Every comment starts a new fight, and the PR
turns into an arena of agents and the people behind them. The fix is to
hold that fight before the PR opens: one big-picture review that already
brings the lenses, and one independent fight per likely finding. Not every
task needs that fight, so a short triage decides which ones do.

## The flow

```
                    +-------------------+
 you, or an agent ->| dunky             |  the front door: picks the skill,
                    | which skill now?  |  explains the flow, never does the work
                    +---------+---------+
                              | most tasks start with a map
                              v
                    +-------------------+
                    | scout             |--- writes ---> .dunky/scout.md
                    | the runner: maps  |                map + task queue
                    | first, never waits|
                    +--+------+------+--+
                       |      |      |  deploys one dev per task,
                       v      v      v  queues the rest in the map
                    +-------------------+
                    | dev               |
                    | principles and    |
                    | workflow from     |
                    | standards/        |
                    +---------+---------+
                              | the task is done
                              v
                    +-------------------+
                    | triage            |--- no trigger ---> open the PR
                    | does it need a    |
                    | brawl?            |
                    +---------+---------+
                              | a trigger hit
                              v
                    +-------------------+  one per finding  +--------------+
                    | brawl             |------------------>| red-vs-blue  |
                    | diff, PR text,    |                   | Red attacks  |
                    | map, repo docs,   |<------------------| Blue refutes |
                    | lenses            |  survives or not  | gate scores  |
                    +---------+---------+                   +--------------+
                              |
                              v
                    the PR opens with the fights already settled

 stuck, at any step, anyone:
   a hard thought or a decision   ---> rubber-duck   talk it through
   a question that trying answers ---> spike         prove it or learn it

 Dunky is optional: you or an agent can call any skill directly.
```

## Roles

| Skill         | Job                                                                                     | Reads                                         | Writes                           |
| ------------- | --------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------- |
| `dunky`       | The front door. Picks the right skill for what you want and walks you through the flow. | The installed skills, the map, your request   | Nothing                          |
| `scout`       | The runner. Maps first, then deploys a dev per task. Never waits.                       | Repo docs, the code, its own map              | `.dunky/scout.md`                |
| `dev`         | Resolves one task with the principles and the workflow from `standards/`.               | The map, repo docs, `principles`, `workflow`  | Code, the triage line            |
| `rubber-duck` | Talks anyone through a hard thought: you, Scout, a dev. Never decides.                  | The conversation                              | Nothing                          |
| `spike`       | Answers a question by trying: a throwaway proof of concept or a learning run.           | The question, the map, primary sources        | Findings on a `research/` branch |
| `brawl`       | Big-picture review of a diff before the PR. Finds what reviewers would.                 | Diff, PR text, map, repo docs, chosen lenses  | Nothing                          |
| `red-vs-blue` | Fights one finding: Red attacks, Blue refutes, the gate scores the result.              | One finding, the diff, the standard behind it | Nothing                          |

Four rules hold for every skill:

- **The repo wins.** When a standard conflicts with a decision the repo
  states in `AGENTS.md`, `ARCHITECTURE.md`, or a `SPEC.md`, the repo's
  decision holds. No skill overrides it.
- **Lenses are opt-in.** Brawl runs basic lenses by default: intent, which
  checks the diff against the PR text and the code it needs, and logic.
  Extra standards such as `a11y` or `security` join only when asked.
- **The queue holds asks, not ideas.** Scout queues only tasks that come
  from the user's request. A note Scout thought of stays a note, so the map
  never authorizes work on its own.
- **A spike never ships.** Its proof of concept stays on its `research/`
  branch. What it learned goes back to Scout's notes, and a dev builds the
  real thing.

## Calling without a slash

You never have to type a command. Each skill's description lists the plain
phrases that call it, because an agent picks a skill by matching your words
against its description. "Dunky" calls the front door: when you are not
sure which skill fits, it picks one and tells you why.

| Say                                                               | Calls         |
| ----------------------------------------------------------------- | ------------- |
| "ask Dunky", "need a dunky", "what should I use?", "dunky help"   | `dunky`       |
| "I need a scout", "map this", "get me oriented"                   | `scout`       |
| "deploy a dev", "send a dev on this", "need a dev"                | `dev`         |
| "rubber duck this", "I'm stuck", "help me think this through"     | `rubber-duck` |
| "spike it", "try this out", "prove it with a quick PoC"           | `spike`       |
| "brawl this", "brawl the PR", "stress-test this diff"             | `brawl`       |
| "red vs blue this", "fight this finding", "is this comment real?" | `red-vs-blue` |

The phrases stay specific on purpose. "Fix this" or "build it" would fire
`dev` on every ordinary coding request.

## Dunky, the front door

Dunky is `--help` for agents, written to be friendly. It answers three
things: which skill fits what you want right now, what the flow looks like
from here, and what each skill needs before it runs. When the answer is a
skill, it calls it. It never does the skill's work itself.

Dunky stays thin. It knows the flow and each skill's job in one line, and
reads the rest from the installed skills' own descriptions. It never
restates their phrases or steps, so a change to a skill never needs a
change to Dunky. The research weighed one big router against many small
skills and picked the small skills. Dunky keeps that choice: it routes,
the skills own the work.

## Scout never waits

Scout maps first, because every dev reads the map. Then it deploys one dev
per task that is ready, and it keeps running. A task that is not ready yet
goes in the map's queue with what it waits on. When a dev finishes, Scout
updates the map and deploys the next task from the queue. Scout itself
still writes only the map. The devs write the code.

## Stuck: rubber-duck or spike

Anyone stuck can call either one, you included.

- **Rubber-duck** when the block is a thought: two options and no way to
  choose, a concept that will not click, a decision to talk through.
- **Spike** when trying would answer it: will this library do X, how does
  this API behave, does this approach hold up. Facts that a run can settle
  go to a spike, not to a human.

## What goes through brawl

The dev ends each task with one triage line: `brawl: yes` or `brawl: no`,
with the trigger that decided it. Brawl runs only when you ask for it, so a
`yes` is a recommendation to you, not a call.

Send the task through brawl when any trigger hits:

1. **A boundary moved.** The diff changes or crosses a boundary on the map:
   a public API, a module many others import, an input or output edge.
2. **A contract changed.** The diff edits a `SPEC.md`, an `AGENTS.md` rule,
   or a documented behavior.
3. **A risky area.** The diff touches auth, input parsing, secrets,
   permissions, or dependencies.
4. **A wide change.** The diff spans more than one package or layer.
5. **A big change.** The diff is over a size limit, 200 changed lines to
   start with.
6. **Thin evidence.** No test covers the changed behavior, or the PR text
   and the diff may disagree.

Skip brawl when none hits: docs only, formatting, tests only, or one local
change inside one module with tests. You can always force a brawl with
`/brawl` or skip one by saying so. Triggers 4 and 5 are
deterministic, so a script can compute them later.

## Task tree

```
D  Decision: who may call whom
|
+--> 0  phrases in every description, first
|
+--> 1  red-vs-blue back -------------+
|                                      |
+--> 2  standards for brawl ----------+--> 3  new brawl
|
+--> 4  dev and triage ---------------+--> 5  scout deploys devs
|                                      |
+--> 6  spike as proof or learning ---+
|
+--> 7  rubber-duck for anyone
|
+--> 8  dunky, once the others exist
|
+--> 9  docs and changelog, last
```

0. **Give each skill its phrases.** Add the phrases from "Calling without
   a slash" to each existing description. Brawl and dev get theirs when
   they are written.
1. **Rename brawl back to `red-vs-blue`.**
   1. Move the skill folder and the website page back.
   2. Narrow it to one finding per run: Red attacks it, Blue refutes it, the
      gate scores it.
   3. Make it callable by brawl. See the decisions.
2. **Add the standards brawl needs.**
   1. `intent.md`: does the diff do what the PR text says, and only that?
   2. `logic.md`: correctness, edge cases, and state. The architecture doc
      lists it, but the file does not exist.
   3. Restore `finding.md` and `severity.md`, which red-vs-blue's gate
      scores with. Both are missing.
3. **Write the new `brawl`.**
   1. Write the scenario first: a fixture diff whose PR text promises one
      thing while the code does another.
   2. Read the diff, the PR text, the map when it exists, and the repo docs.
   3. Run the basic lenses, plus any lens passed with `--equip`.
   4. For each finding that would surface in a review, call red-vs-blue on
      it. Each fight runs on its own.
   5. Reply with the findings that survived, the ones refuted, and a
      verdict.
4. **Write `dev` and its triage.**
   1. Apply `principles` and `workflow` from `standards/` to one task.
   2. Defer to the repo's own decisions on any conflict.
   3. End with the triage line from "What goes through brawl".
   4. Settle the five open questions from the dev brainstorm: worktree per
      dev, park instead of block, tests first for behavior, hand back a
      branch and map notes, rubber-duck after two failed approaches.
5. **Make Scout deploy devs.**
   1. Add a Queue section to the map: each task, its state, and what it
      waits on.
   2. After the map, deploy one dev per ready task and keep running.
   3. On a dev's finish, update the map and deploy the next task.
   4. When stuck, deploy a spike or call rubber-duck, by the rule in
      "Stuck: rubber-duck or spike".
6. **Reshape `spike` into proof or learning.** Today it only
   researches sources. Add the throwaway proof of concept, keep both on a
   `research/` branch with no PR, and send what it learned back to Scout's
   notes.
7. **Make `rubber-duck` callable by anyone.** Drop its user-only flag
   and reword it from "with the user" to whoever is stuck. Then write the
   skill, which is a stub today.
8. **Write `dunky`.**
   1. Write the scenario first: a vague request such as "ask Dunky, I want
      to add a feature here" must route to Scout, and "is this PR comment
      real?" must route to red-vs-blue.
   2. Hold the flow and one line per skill. Read the rest from the
      installed skills.
   3. Call the chosen skill, or explain the flow when you ask for help.
9. **Update the docs.** The root README, the architecture roles diagram and
   table, the dependency direction, the website pages and sidebar, the flow
   table, and the changelog.

## Decision

- **D. Who may call whom.** A skill marked user-invoked only can be called
  with its slash command and nothing else, so a plain phrase cannot reach
  it. Recommended: every skill is callable by you and by agents, through a
  phrase or a slash command. `brawl` keeps its place as the last step
  before a PR through its description: it runs only when you ask for a
  brawl, and a dev's `brawl: yes` stays a recommendation.

## Done when

- The vibe scenarios for brawl, red-vs-blue, and dev beat their baselines.
- The format, lint, and typecheck checks pass, and the website builds.
- The dunky scenario shows that a vague request routes to Scout.
