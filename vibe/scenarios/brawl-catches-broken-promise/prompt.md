I'm about to open this PR. Review it first so my teammates don't find anything new.

PR text:

> Trim names in greet. Leading and trailing whitespace is now removed, and a
> whitespace-only name returns "Hello, stranger!", as SPEC.md says.

Diff of src/greet.ts:

```diff
 export function greet(name: string): string {
-  if (name === '') return 'Hello, stranger!'
-  return `Hello, ${name}!`
+  const trimmed = name.trim()
+  if (name === '') return 'Hello, stranger!'
+  return `Hello, ${trimmed}!`
 }
```
