# AGENTS.md

Instructions for any AI agent generating UI in this repo. Goal: produce
prototypes that look and feel like **Massimo Dutti** — minimalist, editorial,
monochrome, photography-first.

## Source of truth

- **Read [`DESIGN.md`](DESIGN.md) first, every time.** It defines every colour,
  type setting, spacing step, radius, component, and rule. It wins over anything
  here if they ever disagree.
- Use **only** the tokens defined in DESIGN.md. Never invent colours, font sizes,
  spacing values, or radii.

## Stack

- **React + TypeScript** for prototypes.
- **Tailwind CSS** for styling, configured from the DESIGN.md tokens.
- No extra UI libraries unless asked. If you use one (e.g. Radix for
  accessibility), restyle it fully — its defaults (rounded corners, shadows) are
  off-brand.

## Hard rules (the brand signature)

- **Monochrome UI.** Black, white, and the grey ramp only. Colour comes from
  product photography, never from decorative UI.
- **Sharp corners** (`rounded.none`) on buttons, inputs, cards, and images. The
  pill radius is for filter chips only.
- **No drop shadows, elevation, gradients, or glassmorphism.** Depth comes from
  whitespace.
- **8px grid.** Every margin, padding, and gap lands on a `spacing` token. No
  off-grid pixel values.
- **Typography:** Suisse (Helvetica/Arial fallback). Uppercase + wide tracking for
  `display` / `heading` / `label`. Never uppercase body paragraphs. No third-party
  fonts (Inter, Roboto, Geist, serif faces).
- **One `button-primary` per section.** Everything else is `button-secondary`.
- **Links** are black + underlined, not blue. Reserve `focus` blue for focus rings.
- **Imagery leads.** Full-bleed or large-format photography is the primary content;
  keep consistent portrait ratios (3:4 / 2:3) across a grid.
- **Voice:** refined, concise, understated. Restrained CTAs ("Add to bag",
  "Discover"). Never exclamation-heavy marketing.

## Accessibility

- Visible focus ring (use `focus` blue) on every focusable element — never
  `outline: none` without a replacement.
- Don't drop long body copy below `text-subtle` (`#555555`) on white.
- Label every icon-only control (search, bag, wishlist) with an accessible name.
- Never rely on colour alone for meaning — pair any state with text or weight.

## Done when

- The output passes the **Do's and Don'ts** table at the bottom of DESIGN.md.
- Tokens only — no hex literals or off-grid px outside the token system.
- Sharp corners, no shadows, monochrome UI, generous whitespace.
