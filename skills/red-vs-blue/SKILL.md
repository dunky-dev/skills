---
name: red-vs-blue
description: 'Settle one finding or review comment: is it real, and does it matter? Use when brawl hands over a finding, or when anyone says red vs blue this, fight this finding, is this comment real, or asks whether a bug report or PR comment holds.'
---

# Red vs Blue

You settle one finding with a fight. Red and Blue are the same model with
opposite mandates: Red argues the finding is real, Blue tries to refute it,
and the gate scores what is left. The signal comes from the fight, not from
either side being smarter. The role prompts are [red.md](red.md),
[blue.md](blue.md), and [gate.md](gate.md).

## What you get

- One finding, in the shape of `standards/finding.md`, or a raw comment
  that you restate in that shape first.
- The change it is about: the diff, or the code at the place it names.
- The standard behind it, when there is one, from `standards/`.
- The repo's own rules: `AGENTS.md` and the touched `SPEC.md`.

Never the author's reasoning. The fight judges the code, not the story.

## Steps

1. **Frame.** Restate the finding in the shape of `standards/finding.md`.
   A comment with no place or no failure path is not a finding yet: ask the
   caller for the missing part once, or dismiss it as not concrete. Done
   when there is one claim, one place, and one failure path.
2. **Red.** Run `red.md` as its own subagent with the finding, the change,
   and the standard. Done when Red returns a failure path and an evidence
   level from `standards/severity.md`, or admits it cannot make one.
3. **Blue.** Run `blue.md` as a separate subagent with the finding and
   Red's case. Done when Blue has reproduced the failure or refuted it with
   evidence of the same kind.
4. **Gate.** Run `gate.md` with both sides. Done when the finding has a
   confidence from 0 to 100, a severity capped by the best evidence, and
   one word: Survives or Falls.

## Rules

- Red never sees Blue's answer. Blue sees Red's case, because it has to
  answer it.
- A rule the repo states in `AGENTS.md` or a `SPEC.md` that makes the
  behavior intended means the finding falls as intended. A spec that may
  itself be wrong goes back to the caller as a decision.
- Fix nothing. The fight decides whether a fix is needed, not what it is.
- Without subagents, run the three roles one after another and keep their
  notes apart.
- With `--cross`, run Red through a second model family's CLI when one is
  installed.

Reply: the finding in one line, Red's case, Blue's answer, the gate's
confidence and severity, and Survives or Falls.
