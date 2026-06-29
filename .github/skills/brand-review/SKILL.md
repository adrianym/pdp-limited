---
name: brand-review
description: >
  Audit generated UI against the Massimo Dutti brand contract (DESIGN.md,
  HOLYGUIDE.md, AGENTS.md). USE WHEN: a prototype screen or component has been
  built and needs a brand/accessibility check before sharing; the user asks
  "is this on-brand?", "review this against DESIGN.md", "check the Do's and
  Don'ts", or "did I drift?". DO NOT USE FOR: building new UI from scratch (that
  is the build flow), capturing real content (that is capture-assets), or
  general code review unrelated to brand.
---

# Brand review

Audit one or more prototype files against the Massimo Dutti contract and report
violations as a checklist with file/line references and concrete fixes. This is
a **read-and-report** skill: surface drift, propose the token-correct fix, and
only edit when the user confirms.

## Inputs

- The target files (current selection, open file, or a folder of prototype
  `.tsx`).
- The contract: `DESIGN.md` (tokens + Do's/Don'ts), `HOLYGUIDE.md` /
  `holyguide.components.json` (components), `AGENTS.md` (hard rules).

## Procedure

1. **Load the contract.** Read `DESIGN.md` (tokens + the Do's/Don'ts table) and
   the hard-rules block in `AGENTS.md`. Read `holyguide.components.json` for the
   allowed component class names.
2. **Scan the target files** for each rule below.
3. **Report** as a table: `Severity | Rule | Location | Fix`. Group by severity
   (Error → Warning → Note). End with a one-line verdict: PASS or N issues.
4. **Offer to fix.** Propose token-correct edits; apply only on confirmation.

## Checks (map each to a DESIGN.md rule)

**Errors — brand signature broken**

- Hex literals or `rgb()`/`hsl()` in JSX/CSS/Tailwind → must be a DESIGN.md
  token.
- Off-grid spacing (padding/margin/gap not on the 8px scale).
- `rounded-*` other than `rounded-none` on buttons/inputs/cards/images (pill
  radius is filter chips only).
- Drop shadows, elevation, gradients, glassmorphism (`shadow-*`,
  `bg-gradient-*`, `backdrop-blur`).
- Decorative colour in UI (anything outside black/white/grey ramp) — colour may
  only come from product photography.
- Third-party fonts (Inter, Roboto, Geist, serif) instead of Suisse fallback.
- Improvised component where a Holy Guide class exists (e.g. a hand-rolled
  button instead of `btn btn-primary`).
- Blue links (links must be black + underlined; blue is reserved for focus
  rings).
- More than one `btn-primary` per section.

**Warnings — likely drift**

- Uppercased body paragraphs (uppercase is `display`/`heading`/`label` only).
- Inconsistent portrait ratios across a grid (mix of 3:4 / 2:3 / square).
- Exclamation-heavy or hype CTA copy (voice is refined, restrained).
- Non-Spanish copy or non-euro prices without an explicit market override.

**Accessibility notes**

- `outline: none` / `outline-none` without a visible `focus`-blue replacement.
- Icon-only controls (search, bag, wishlist) missing an accessible name.
- Long body copy below `text-subtle` (#555) on white.
- State conveyed by colour alone (no paired text/weight).

## Output format

```
## Brand review — <file or folder>

| Severity | Rule | Location | Fix |
| --- | --- | --- | --- |
| Error | Hex literal | Card.tsx#L42 | Replace `#f4f4f4` with `surface-sunken` |
| Error | Rounded corners | Card.tsx#L18 | `rounded-md` → `rounded-none` |
| Warning | Uppercased body | Hero.tsx#L9 | Drop `uppercase` on the paragraph |

**Verdict:** 3 issues (2 errors, 1 warning). Fix the errors before sharing.
```

## Rules

- Never invent a token or component to "fix" a violation — only use what exists
  in `DESIGN.md` / `holyguide.components.json`. If no token fits, flag it.
- Report before editing. Apply fixes only after the user confirms.
- Cite every finding with a file/line reference.
