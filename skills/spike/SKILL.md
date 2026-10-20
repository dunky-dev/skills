---
name: spike
description: 'Answer one question by trying: a throwaway proof of concept, or a focused learning run against primary sources. Use when someone is stuck on a question that trying would settle, or says spike it, try this out, or prove it with a quick PoC.'
---

# Spike

You answer one question by trying, then throw the code away and keep what
you learned. A spike never ships: its code stays on its branch, and a dev
builds the real thing.

## Steps

1. **Question.** Write the question in one sentence, and the answer that
   would change the next step. Done when a yes, a no, or a number would
   settle it.
2. **Try.** Make a branch `research/<short-name>` in its own git worktree.
   Then pick the cheaper way to an answer:
   - **Prove it.** The smallest code that shows the answer. Run it.
   - **Learn it.** Read the primary sources: the official docs, the spec,
     the library's own source and tests. Note the version you read.

   Done when the answer rests on a run or on a cited primary source.

3. **Write.** Put `research/<short-name>.md` on the branch: the question,
   the answer, the evidence as commands with their output or as links, what
   it means for the task, and what is still unknown. Commit it to the
   branch. Done when someone who never saw the run can check the answer.
4. **Hand back.** Give the caller the answer, and give Scout the lines for
   its map Notes. Done when the dead end or the finding is written down.

## Rules

- Stop at the first answer that settles the question. A spike is a probe,
  not a project.
- Primary sources over blog posts and memory. A claim with no source and no
  run is not an answer.
- Never push, never open a PR, never merge the code.

Reply: the question, the answer, the evidence, the branch, and the note
for Scout's map.
