# Logic

Correct code behaves as promised for every input and every state it can
meet, not only on the path its author had in mind. Most defects live at the
edges: the empty list, the second call, the request that arrives late, the
error nobody handled. A senior reads a change by asking what it receives,
what it may be in the middle of, and what happens when either is not what
the author pictured.

## Core

- **The contract first.** Every function has preconditions, a result, and
  invariants that must hold before and after. Write them down, at least in
  your head, before judging the code. A bug is a broken contract, and a
  contract nobody can state is the first finding.
- **Partition the input.** Group inputs into classes that should behave the
  same, then test the edges of each class: empty, one, many, the maximum,
  zero, negative, missing, `null` and `undefined`, `NaN`, whitespace, and
  text outside ASCII. Boundary value analysis finds more defects than
  random inputs do.
- **Ranges and counts.** Inclusive or exclusive, zero-based or one-based,
  `<` or `<=`. An off-by-one hides in every loop bound, slice, and
  pagination cursor.
- **Conditions.** Check both sides of every branch. A negated compound
  condition breaks when De Morgan is applied by hand. Short-circuit order
  matters when an operand has a side effect or can throw.
- **State.** List the states and the events. Every state must handle every
  event, even if only by refusing it. Prefer types that make an impossible
  state unrepresentable over code that checks for it later.
- **Time and order.** Async code can interleave. Look for races, stale
  reads, a response that lands after its request was cancelled, a handler
  that runs twice, and a retry that is not idempotent. Re-entrancy breaks
  code that assumed it would finish first.
- **Failure paths.** Every call that can fail either handles the failure or
  passes it on. A swallowed error is a lie to the caller. A partial failure
  must leave state consistent: either the whole change happened or none of
  it did.
- **Identity and mutation.** Equality by value or by reference, a shared
  object mutated through an alias, a default argument reused across calls.
  These pass every test that builds fresh data.
- **Numbers and time.** Floating point is not decimal. Integers overflow,
  integer division truncates, and rounding has a mode. Dates carry a time
  zone, days are not always 24 hours, and the clock can move backwards.
- **Determinism.** A result that depends on iteration order, the clock,
  randomness, or the environment must say so, or the test that passes today
  fails tomorrow.

## Sources

| Source                                                                                | Status | What we take from it                                                |
| ------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- |
| Dijkstra, _A Discipline of Programming_                                               | Book   | Preconditions, postconditions, and invariants as the unit of proof. |
| Myers, _The Art of Software Testing_                                                  | Book   | Equivalence partitioning and boundary value analysis.               |
| Harel, _Statecharts: A Visual Formalism for Complex Systems_                          | Paper  | States, events, and transitions as the model of behavior.           |
| Claessen and Hughes, _QuickCheck_                                                     | Paper  | Properties over examples: state the rule, let inputs attack it.     |
| Goldberg, _What Every Computer Scientist Should Know About Floating-Point Arithmetic_ | Paper  | Why floating point breaks equality, sums, and rounding.             |
| Lamport, _Specifying Systems_                                                         | Book   | Reasoning about concurrent state and the orders events can take.    |

## Checks

- The change states or preserves the contract of what it touches: what it
  takes, what it returns, what stays true.
- Every input class the contract allows has a defined result, including
  empty, missing, maximum, and malformed input.
- Every loop bound, slice, and range is right at both ends.
- Every branch is reachable, and its negation does what the author meant.
- Every state handles every event, and no impossible state can be built.
- Async paths survive reordering, cancellation, a double call, and a retry.
- No error is swallowed, and a partial failure leaves state consistent.
- No shared object is mutated through an alias the caller does not expect.
- Arithmetic on money, counts, and time uses the right type and rounding.
- Nothing depends on iteration order, the clock, or randomness without
  saying so.
