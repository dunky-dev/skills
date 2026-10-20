# Intent

A change is right only when it does what it says it does, all of it, and
nothing it does not say. The PR text, the task, and the repo's specs state
the intent; the diff is the claim that the intent was met. A senior reads
the two side by side and treats every gap between them as a finding: a
promise the diff does not keep, or a change the text never mentions.

## Core

- **Where intent comes from.** The repo's own contract decides: the
  package's `SPEC.md`, the rules in `AGENTS.md`, the layers in
  `ARCHITECTURE.md`. The task says what was asked. The PR text says what the
  author believes was done. When they disagree, the contract wins, and the
  disagreement is the finding.
- **Coverage.** Every promise in the PR text is backed by a change in the
  diff and, for behavior, by a test. A promise with no code is not done. A
  promise with code and no test is not proven.
- **Scope.** Everything in the diff is explained by the intent. A drive-by
  refactor, a stray debug line, a formatting sweep, or an unrelated fix
  makes the change harder to review and is either split out or named.
- **Intent over assertions.** Passing tests prove the tests. The
  implementation must cover the intent, including the cases nobody wrote a
  test for.
- **Silent changes.** A changed default, error message, public type,
  timing, ordering, or log line is a behavior change. If the PR text does
  not mention it, a consumer will find it in production.
- **Reach.** A change to a function reaches its callers, its docs, its
  config, its exports, and its fixtures. The intent is met only when every
  place that must change did.
- **Honest text.** "No behavior change", "fixes all", and "small refactor"
  are claims. Each one is checked against the diff like any other promise.
- **Specs drift too.** When the diff is right and the spec is stale, the
  finding is the spec. The change is not done until the spec describes the
  code again.

## Sources

| Source                                                                                                                                | Status    | What we take from it                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| The repo's `standards/workflow.md`                                                                                                    | Contract  | Implementation covers intent; RECONCILE asks if the spec still holds.  |
| The repo's `standards/principles.md`                                                                                                  | Contract  | The reach list: every place a change must touch.                       |
| [Google engineering practices, what to look for in a review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | Reference | Does the change do what the author intended, and is it good for users. |
| [mattpocock/skills](https://github.com/mattpocock/skills), code-review                                                                | Reference | Review on two axes, standards and spec, kept apart.                    |
| [github/spec-kit](https://github.com/github/spec-kit), converge                                                                       | Reference | A converge step that checks the result against the spec.               |
