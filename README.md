<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dunky-dev/logo/main/logo-white%402x.png" />
    <img src="https://raw.githubusercontent.com/dunky-dev/logo/main/logo%402x.png" alt="Dunky" width="400px" />
  </picture>
</p>

# dunky-dev skills

Agent skills for the dunky repos. Six skills that staff the
`EXPLORE -> SPEC -> TEST -> IMPLEMENT -> RECONCILE` flow, and the standards
they equip. EXPLORE is the entry, where an idea exists but the questions do
not yet; the four states after it are the loop every dunky repo already
runs. Plain markdown in the [Agent Skills](https://agentskills.io) format, so
they install into Claude Code, Codex, Cursor, OpenCode, and the rest.

## Install

```bash
npx skills add dunky-dev/skills
```

Pick the skills you want, or `--all`.

## The set

| Skill         | Call it when                                                         |
| ------------- | -------------------------------------------------------------------- |
| `scout`       | A repo or an area is new to you, or a request needs a map and devs   |
| `dev`         | One task is clear and ready to build                                 |
| `rubber-duck` | You or an agent are stuck on a thought, a choice, or a decision      |
| `spike`       | A question that a quick run or a primary source would settle         |
| `brawl`       | A finished change should face the review before the PR opens         |
| `red-vs-blue` | One finding or PR comment needs settling: is it real, does it matter |

You never have to type a command. Say "I need a scout",
"deploy a dev", "rubber duck this", "spike it", "brawl this", or "is this
comment real?". Each skill folder has a `README.md` with its reference,
what it expects, and how to call it.

## Standards

`standards/` holds compact expert briefs, one specialty per file:
accessibility, internationalization, security, the workflow, logic,
intent, principles. Dev builds by the principles and the workflow; brawl
equips the rest as lenses. Two shared rules, `finding.md` and
`severity.md`, shape and score every finding. Standards hold knowledge, not
procedure. Each has Core, Sources, Checks.

## Testing the skills

`vibe/` holds this repo's own scenarios: a naive prompt, a checklist, and
the skills to install. They are run by the vibe-test skill, which lives in
its own repo.

## Website

`website/` is the Astro docs site, served at `dunky.dev/skills`. See
[`ARCHITECTURE.md`](./ARCHITECTURE.md) for the layout and the decisions,
[`CONTRIBUTING.md`](./CONTRIBUTING.md) for the workflow, and `research/` for
the reports behind the design.

## License

[MIT](./LICENSE)
