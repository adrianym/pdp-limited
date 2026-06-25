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
- Use **only** the tokens defined in DESIGN.md. Never invent colours, font sizes,
  spacing values, or radii.

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
