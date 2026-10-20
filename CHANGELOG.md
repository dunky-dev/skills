# Changelog

Entries describe what a consumer of the skills sees, not the file change.
A release is a git tag `vX.Y.Z` that moves `Unreleased` under a heading.

## Unreleased

- Six skills: scout, dev, rubber-duck, spike, brawl, red-vs-blue. Scenarios under `vibe/`, run
  by the vibe-test skill from its own repo.
- Standards at the repo root, all written: `a11y`, `i18n`, `security`,
  `workflow`, `principles`, `logic`, `intent`, plus the shared rules `finding` and
  `severity`.
- Astro docs site scaffold under `website/`, served at `dunky.dev/skills`.
- Scout maps a repo in three steps, discovery, boundaries, and
  memory, and keeps the result in a gitignored `.dunky/scout.md` instead
  of GitHub issues. The next run starts from the map and re-checks only
  what changed. Agents can now call Scout on their own. Every claim in the
  map says how Scout knows it, and notes never grant permission to act.
- Scout no longer waits after the map: it queues the tasks from your
  request and deploys a dev on each. One task runs in your checkout.
  Several run in parallel, one git worktree each, after Scout asks you once
  where they go; with no worktrees, they run one by one, a commit each.
  Every task shows its name and where it runs.
- `dev` resolves one task with the principles and workflow standards, the
  repo's own rules first, and hands back a proven change. It never stops
  to review: you ask for a brawl when a change is worth one.
- `brawl` is the big-picture review before the PR: intent and logic by
  default, any standard as an extra lens, and every finding settled by its
  own red-vs-blue fight. It answers the PR that turns into an arena of
  reviewers' agents, by holding that fight before the PR opens.
- `red-vs-blue` settles one finding or PR comment: Red argues it, Blue
  refutes it, the gate scores it, and the answer is Survives or Falls.
- `spike` answers one question by trying, as a throwaway proof of concept
  or a learning run against primary sources. Its code never ships.
- `rubber-duck` helps anyone who is stuck, an agent included, and never
  decides.
- Every skill answers to plain phrases, such as "I need a scout" or
  "deploy a dev", as well as its slash command. Brawl runs only when you ask.
