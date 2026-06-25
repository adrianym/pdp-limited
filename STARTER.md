# Massimo Dutti — AI Prototyping Starter

A starter "canvas" for the UX team to build **high-fidelity, on-brand prototypes
with AI**. Clone it and start prototyping — the design context travels with the
repo, so every output looks like Massimo Dutti.

## What's in here

| File | Purpose |
| --- | --- |
| [`DESIGN.md`](DESIGN.md) | The source of truth — every colour, type setting, spacing step, radius, component, and rule. |
| [`PROTOTYPE.md`](PROTOTYPE.md) | The content & realism contract — the real chrome, data, icons, and imagery a prototype must use to mirror the live site. |
| [`AGENTS.md`](AGENTS.md) | How an AI agent should use `DESIGN.md` and which stack to build in. |
| [`README.md`](README.md) | The per-project README template — rewritten for each new project. |
| `STARTER.md` | This file — how the starter works and how to evolve it. |

## Getting started

1. **Clone the repo** to your machine.
2. **Rename the folder** to your new project (e.g. `spring-campaign`). You now
   have your own project with the Massimo Dutti AI context already inside it.
3. **Rewrite `README.md`** for your project — it ships as a thin template meant
   to be replaced.
4. **Open it in your editor** and start designing. The AI reads `DESIGN.md` +
   `AGENTS.md` automatically, so everything you prototype comes out on-brand.

   > Build a product listing page (PLP) with a filter bar and a 3-column
   > product grid. Follow DESIGN.md.

5. **Review against the brand.** Check the output against the **Do's and Don'ts**
   table at the bottom of `DESIGN.md`. Correct any drift.

## Workflow

This repo is the **starter** — the shared, on-brand canvas. There are two
separate flows:

**Starting a project (designers).** Clone, rename the folder, and prototype.
Your project lives on your machine (or in its own new repo). Inside it, use
whatever Git flow suits you.

**Evolving the starter (rules owners).** Changes to the starter itself —
`DESIGN.md` or `AGENTS.md` — go through review, because they affect everyone who
clones it next:

- **`main`** is always on-brand and clonable. Never commit straight to it.
- **`design/<change>`** — edits to `DESIGN.md` or `AGENTS.md`. Open a PR, get a
  review, and bump the `version:` field in `DESIGN.md` when the rules change.

```
branch  →  edit rules  →  open PR  →  review  →  merge
```

## Principles

- **`DESIGN.md` is the source of truth.** When in doubt, it wins.
- **This is design intent, not production code.** Prototypes are for exploring
  flows and look-and-feel — not a substitute for the real component library,
  Figma, or engineering standards.
- **Keep it simple.** Add more structure (tokens file, templates, checks) only
  when you feel the need — not before.
