<!--
  The content & realism contract. DESIGN.md says HOW the UI looks (tokens);
  this file says WHAT goes in it (real chrome, data, imagery) so prototypes
  mirror massimodutti.com instead of inventing generic content.
  The starter ships NO fixtures — you capture what you need, per project.
  Read alongside DESIGN.md — both are mandatory.
-->

# Massimo Dutti PROTOTYPE.md

> `DESIGN.md` makes a prototype **look** on-brand. This file makes it **feel
> real** — like the live site, not a generic placeholder. Rules use RFC 2119:
> **MUST**, **MUST NOT**, **SHOULD**, **MAY**.

A prototype is _hyperrealistic_ when a Massimo Dutti designer can't tell the
chrome, data, and imagery from production — only the **new flow being explored**
is new. Style alone can't do that; the AI must build from **real assets**, never
invent them.

### Table of contents

[The idea: capture what you need](#the-idea-capture-what-you-need) ·
[What to capture](#what-to-capture) · [Hard rules](#hard-rules) ·
[Imagery](#imagery) · [Extending with new functionality](#extending-with-new-functionality) ·
[Legal & sourcing](#legal--sourcing)

---

## The idea: capture what you need

The starter stays lean — it ships **rules only, no fixtures**. Real content is
pulled in **per project, on demand**: when a flow needs the real header, you
capture the real header; when it shows products, you capture a handful of real
products. Nothing more.

- **MUST** capture from the live site only what the current flow actually touches
  — usually the logo, header, and footer, plus the few products/filters on screen.
- **MUST NOT** mirror the whole catalogue or build a big shared content kit. Keep
  it to the smallest believable slice.
- **SHOULD** drop captured assets into the **project** (e.g. a `brand/` and/or
  `data/` folder _in your project_), not back into the starter.

This keeps the starter simple and lets each project carry only its own real bits.

---

## What to capture

Capture, in order, only as far as the flow requires:

1. **Chrome (almost always).** The real **logo**, **header** (promo strip, nav
   categories, search/account/wishlist/bag icons) and **footer** (link columns,
   newsletter, country/language, legal). Rebuild them as components styled from
   `DESIGN.md` tokens — match the structure, not their raw CSS.
2. **Just-enough data (when the flow shows products).** A handful of real
   products — name, £ price, colour names, sizes, category — and the real filter
   facets / sort options offered on that page.
3. **Image URLs.** Record each product's public CDN image URL (see
   [Imagery](#imagery)) — don't download the files.

If something the flow needs isn't captured yet, the AI **MUST** flag it and
capture the real value — never silently invent products, prices, or chrome.

---

## Hard rules

- **Chrome MUST be real.** Full pages **MUST** use the captured real header,
  footer, and logo. **MUST NOT** improvise a nav bar, footer, or look-alike mark.
- **Data MUST be real.** Product UI **MUST** use captured real products and
  filters. **MUST NOT** invent names, prices, colours, sizes, or categories.
- **Icons MUST be real.** Use the captured icon set. **MUST NOT** draw new icons
  or pull in a third-party icon library.
- **Copy MUST sound real.** Use the brand voice from `DESIGN.md` (refined,
  concise). **MUST NOT** use lorem ipsum or placeholder strings.
- **Only the new flow is new.** Everything around the feature under exploration
  **MUST** match the live site; novelty is confined to the UX team's addition.

---

## Imagery

Photography is referenced from the **public Massimo Dutti image CDN** — real
photos, nothing stored in the repo.

- Product images **MUST** use the real captured CDN URLs.
- **MUST** keep consistent portrait ratios (3:4 / 2:3) across a grid, per the
  `DESIGN.md` Imagery rules — sharp corners, no shadow, no tint.
- **SHOULD** include a graceful fallback (a `surface-sunken` block) for any image
  that fails to load, so the layout never collapses.
- **MUST NOT** commit product imagery into the repo, and **MUST NOT** substitute
  random stock photography.

---

## Extending with new functionality

When the UX team explores something the live site doesn't have (a new filter, a
quick-view, a saved-looks tray, a size advisor…):

- **MUST** build it **on top of** the real captured chrome and data — drop the new
  flow into a real PLP/PDP, don't mock a standalone toy page.
- **MUST** style every new element from `DESIGN.md` tokens so it's
  indistinguishable from native UI, and **MUST** pass the Do's and Don'ts table.
- **SHOULD** make it genuinely interactive (real filtering, real state, real
  add-to-bag) so the prototype is testable, not a static comp.
- **SHOULD** note the new behaviour briefly in the project `README.md` so
  reviewers know what's intentionally new versus mirrored.

---

## Legal & sourcing

- **Capture deliberately, don't hammer the site.** A one-time, human-supervised
  capture of what a project needs is fine; **MUST NOT** automate repeated requests
  against massimodutti.com. Respect its `robots.txt` and Inditex terms.
- **Imagery is copyrighted.** Reference the public CDN for **internal prototypes
  only**. **MUST NOT** publish these prototypes externally or commit downloaded
  product imagery to a public repo.
- **Logo & marks** belong to Inditex/Massimo Dutti — internal prototyping use
  only.
- When in doubt, treat captured assets as confidential internal references.
