# Spike

A spike answers one question by trying. Will this library do what we need?
How does this API behave on an empty page? Does this approach hold up under
real data? Some questions no amount of thinking settles, and a short run or
the right primary source settles them in minutes.

The name comes from agile practice, where a spike is a short, timeboxed
experiment that buys knowledge instead of features.

## Two ways to answer

- **Prove it.** The smallest throwaway code that shows the answer, run for
  real.
- **Learn it.** The primary sources: official docs, the spec, the library's
  own source and tests, with the version noted.

Either way, the answer rests on a run or a citation, never on memory.

## What it leaves behind

A `research/<short-name>` branch with the code and one note: the question,
the answer, the evidence, what it means for the task, and what is still
unknown. Scout gets the lines for its map, so nobody runs the same spike
twice.

## How it is called

```
/spike <question>     answer one question by trying
```

Or say it: "spike it", "try this out", "prove it with a quick PoC". Scout
and the devs deploy spikes when they are stuck on a question that trying
would answer. A hard thought or a decision goes to rubber-duck instead.

## Hard stops

A spike never ships. Its code never merges, it never pushes, and it never
opens a PR. When the question is answered, it stops.
