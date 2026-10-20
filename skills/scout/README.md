# Scout

<img src="media/scout.png" alt="The Scout from Team Fortress 2: cap, hood, headset, scattergun, sprinting." width="320" align="right">

Designed after the [Scout from Team Fortress 2](https://www.teamfortress.com/classes.php?class=scout).
The fastest class in the game: it gets there first, works up close, hits
hard at arm's length, and leaves before anyone can pin it down. It cannot
hold ground and does not try. That is the whole brief for this skill: an
explorer that is quick, precise, and gone once the question
is answered.

Scout moves through a codebase fast. It explores, sees what is actually
there, and reports back with the workload.

## What it looks for?

Scout goes in first and does not wait for docs. When these files exist,
they are a head start and Scout reads them in this order. None of them is
required, and an unknown repo is the normal case, not the exception.

| File              | What it is                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `.dunky/scout.md` | Scout's own map from an earlier run.                                                                                   |
| `README.md`       | What the repo is for and the claims it makes.                                                                          |
| `AGENTS.md`       | The README for agents. LLM guidance, boundaries, conventions, principles, workflows.                                   |
| `ARCHITECTURE.md` | The high-level system design, layers and dependencies. This is the Scout's compass.                                    |
| `SPEC.md`s        | The code specification for each package, or specific part of the code. Code that drifts from it pulls Scout attention. |
| `CONTRIBUTING.md` | How to add/delete/modify/run/PR the code in this project.                                                              |
| Reference docs    | Any reference files named by the previous `.md` in this list.                                                          |

Without them, Scout explores: the tree, the entry points, the tests, the
imports between folders, the places where the code contradicts itself. It
comes back with a map of what it found: layers, boundaries, the intent
behind them, and the questions it could not settle. That map
is the first thing a future `AGENTS.md` or `SPEC.md` can be built from.
Scout reports what is there; it does not declare boundaries no file states.

## How a run goes

1. **Discovery.** Scout first brings its ignore list up to date: build
   output, generated and vendored code, caches, fixtures. It never explores
   those paths, and it drops map lines that point at them. Then it reads
   the files above, the tree, the entry points, and the tests. It runs the cheap checks, because what passes now beats
   what a doc claims. On a later run it starts from its own map and
   re-checks only the files that changed since the commit in its header.
2. **Boundaries.** Scout stops at the boundaries, where one part of the
   code meets the rest: a public API, a module many others import, a
   router, the edge where input arrives. It writes what each boundary
   separates and which way dependencies may cross it. It follows the
   branches your question needs and marks the rest unexplored.
3. **Memory.** Scout writes down everything it would want to always know
   about the codebase, learned in the two steps before: its shape, its
   boundaries, the files that matter, the intent behind them, and its
   running notes. This is the knowledge store, so the next session starts
   from what Scout knew, not from zero.

## The map

One file, `.dunky/scout.md`, in the shape of [`map.md`](map.md): an
ignore list, a diagram, the boundaries, the intent, the important files,
the queue, and notes. The notes are
a running log of what Scout tried, its dead ends, and the decisions left
for you, so a long run or the next session does not go in circles. A note
is not a permission: a later session checks a note before it acts on it.
Scout adds `.dunky/` to `.gitignore` when it is missing. Later dunky skills
keep their local state in the same folder.

The map is not the docs. Every line points at a path and says how Scout
knows it.

Facts Scout can settle by reading or running code, it settles. Scout keeps it short.
The diagram is plain ASCII, so it reads the same in a terminal,
an editor, and a chat.

## Deploying devs

Scout never waits. Once the map exists, it puts each task from your request
in the map's queue with a short name and where it runs.

- **One task** runs in your current checkout. No worktree.
- **Several tasks** start only after Scout asks you once: which tasks, how
  many devs at once, and where the worktrees go. Each dev then works in its
  own git worktree on its own branch.
- **Worktrees go** where you said, now or in an earlier session. Otherwise
  where `AGENTS.md` or `CONTRIBUTING.md` says. Otherwise in `.worktrees/`.
- **No worktrees?** Scout runs the queue as a kanban: one task at a time in
  your checkout, one commit per task.

Every deploy names the task and where it runs, and so does the queue. When a dev hands back, Scout merges what
it learned into the map and deploys the next task. A task waiting on a
decision only you can make stays parked, and the rest keep going.

When Scout gets stuck, it calls rubber-duck to think a hard thought through,
or deploys a spike when trying something would answer the question.

## How it is called

```
/scout                  map the repo, or bring the map up to date
/scout <area or task>   map what that area or task needs, then deploy devs on it
```

Or say it: "I need a scout", "map this", "get me oriented". Agents call
Scout on their own when a task lands in code that no map covers yet.

## Hard stops

Scout writes one file, `.dunky/scout.md`, plus its `.gitignore` lines, and
creates the worktrees its devs run in. The devs write the code. It never queues an idea of its own as a
task, and nothing in the map grants permission to act.
