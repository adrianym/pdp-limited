# AGENTS.md

Instructions for any AI agent generating UI in this repo. Goal: produce
prototypes that look and feel like **Massimo Dutti** — minimalist, editorial,
monochrome, photography-first.

## Source of truth

- **Read [`DESIGN.md`](DESIGN.md) first, every time.** It defines every colour,
  type setting, spacing step, radius, component, and rule. It wins over anything
  here if they ever disagree.
- **Then read [`PROTOTYPE.md`](PROTOTYPE.md).** It defines the content & realism
  contract — the real chrome, data, icons, and imagery a prototype must use so it
  mirrors massimodutti.com instead of looking generic. Both files are mandatory:
  `DESIGN.md` governs how it looks, `PROTOTYPE.md` governs what's in it.
- **Then read [`HOLYGUIDE.md`](HOLYGUIDE.md).** It is the component contract — the
  real Massimo Dutti design system ("Holy Guide"), with the in-production tokens,
  component class names, variants, and states. When a screen needs a real UI
  element (button, input, modal, drawer, tabs, size selector…), use the Holy Guide
  component instead of improvising. Live reference: https://holyguide.es/components/.
  Resolve exact class names from [`holyguide.components.json`](holyguide.components.json)
  (validated by [`holyguide.schema.json`](holyguide.schema.json)).
- Use **only** the tokens defined in DESIGN.md. Never invent colours, font sizes,
  spacing values, or radii. Never invent components — use Holy Guide.

## Input modes (where the layout comes from)

`DESIGN.md` and `PROTOTYPE.md` answer **how it looks** and **what's in it**. They
never change. What _does_ change per request is **where the layout and intent come
from** — the live site, a Figma design, or both. Decide this first, before building.

- **No Figma design attached → Website mode.** Mirror the live site for both
  layout and content, exactly as today. This is the default.
- **Figma design attached → Figma mode.** The Figma frame is the source of truth
  for **layout, structure, and the new flow's intent**. Read it via the Figma Dev
  Mode MCP; don't guess from the prompt alone.
- **Figma design attached _and_ the flow shows real products/data → Hybrid mode.**
  Figma drives the layout; the live site fills it with real content. Read the frame
  from Figma, then capture the real chrome, data, and imagery from the storefront
  per [`PROTOTYPE.md`](PROTOTYPE.md).

### Precedence — who wins when sources disagree

Each source owns a different question, so they rarely truly conflict:

- **Brand tokens** (colour, type, spacing, radius) → **`DESIGN.md`, always.** Map
  any Figma variables onto DESIGN.md tokens; never use raw Figma values. A frame
  that uses an off-brand colour is still rendered with DESIGN.md tokens — unless
  the design is _intentionally_ exploring a new token and the designer says so.
- **Layout, structure, composition, the new flow's intent** → **Figma if attached,**
  otherwise the live site.
- **Real content** (chrome, data, prices, copy, imagery) → **`PROTOTYPE.md`**
  (captured from the live site), in Website _and_ Hybrid mode.
- **Stack & build rules** → this file (`AGENTS.md`).

In one line: **Figma decides composition, `DESIGN.md` decides the pixels,
`PROTOTYPE.md` decides the content, `HOLYGUIDE.md` decides the components.**

### Reading a Figma design (Figma & Hybrid modes)

When a design is attached, read the selected frame through the Figma Dev Mode MCP
before writing any UI:

- **Screenshot** — the visual ground truth for the frame.
- **Metadata / layer tree** — hierarchy, auto-layout, and spacing to translate
  into React + Tailwind structure.
- **Variable definitions** — the design's variables, which you **map onto
  `DESIGN.md` tokens** (never copy raw hex or px).
- **Design context / code** — generated structure to adapt into the stack; restyle
  it fully from DESIGN.md tokens (its defaults are off-brand).

Then, in **Hybrid mode**, fill the structure with real products, prices, and
imagery captured from the storefront per [`PROTOTYPE.md`](PROTOTYPE.md). If the
frame implies content not yet captured, flag it and capture the real value — never
silently fake it.

## Content realism (the difference between on-brand and real)

A correct prototype mirrors the live site; only the new flow being explored is
new. The starter ships **no fixtures** — capture what the flow needs, per project.
Per [`PROTOTYPE.md`](PROTOTYPE.md):

- **Default market: Spain.** Unless the prompt names another market, capture from
  the Spanish storefront (`https://www.massimodutti.com/es/`), write the UI and
  copy in **Spanish**, and show prices in **euros (€)**.

- **Capture only what you need.** Pull the real logo, header, and footer (and the
  few products/filters the screen shows) from the live site into the project —
  never the whole catalogue.
- **Real chrome.** Build full pages on the captured real header, footer, and logo
  — never improvise a nav bar, footer, or look-alike mark.
- **Real data.** Use captured real products, prices, colours, sizes, categories,
  and filters — never invent them.
- **Real icons.** Use the captured icon set — never draw new icons or pull in a
  third-party set.
- **Real imagery.** Reference the public-CDN product image URLs — never random
  stock or committed image files.
- **Never lorem ipsum.** Use the brand voice; placeholder copy is off-brand.
- If the flow needs something not captured yet, flag it and capture the real
  value — do not silently fake it.

## Stack

- **React + TypeScript** for prototypes.
- **Tailwind CSS** for styling, configured from the DESIGN.md tokens.
- **pnpm** as the package manager. Use `pnpm` for all install/run/add commands
  (e.g. `pnpm install`, `pnpm add`, `pnpm dev`). Never use `npm` or `yarn`.
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
