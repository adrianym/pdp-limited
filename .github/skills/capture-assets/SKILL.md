---
name: capture-assets
description: >
  Capture the real Massimo Dutti chrome, data, and imagery a prototype needs,
  per PROTOTYPE.md. USE WHEN: a flow needs the real header/footer/logo, real
  products/prices/colours/sizes, real filters, or real product-image URLs; the
  user says "capture the header", "pull real products", "get the real footer",
  or a build flagged missing real content. DO NOT USE FOR: brand/style audits
  (that is brand-review) or scaffolding a screen from a blueprint (that is
  scaffold-prototype). Capturing is deliberate and human-supervised — never
  loop or mirror the whole catalogue.
---

# Capture assets

Pull only the real content the current flow touches from the live storefront
into the **project** (not the starter), following `PROTOTYPE.md`. The starter
ships no fixtures by design; this skill fills a project's `brand/` and `data/`
folders on demand with the smallest believable slice.

## Inputs

- The flow / screen being built and what real content it references.
- `PROTOTYPE.md` (the content & realism contract) and the market/locale rule.

## Market & locale

- **Default: Spain.** Capture from `https://www.massimodutti.com/es/`, write
  copy in Spanish (es-ES), prices in euros with Spanish formatting (`49,95 €`).
- Target another market **only** if the prompt names it; then capture from that
  storefront and use its language and currency.

## Procedure

1. **Scope it.** List exactly what the flow shows — usually logo + header +
   footer, plus the handful of products/filters on screen. Nothing more.
2. **Capture chrome.** Pull the real logo mark, header (nav structure, icons),
   and footer into the project's `brand/` folder. Reuse the captured icon set;
   never draw new icons or import a third-party set.
3. **Capture data.** Record the real products the screen needs — name, price,
   colour names, sizes, category, and any filters — into `data/` (e.g. JSON).
   Use real values only; never invent SKUs, prices, or colour names.
4. **Reference imagery.** Use the public Massimo Dutti CDN image URLs for
   product photos. Do not download or commit image files; reference the URLs.
5. **Report.** Summarise what was captured and where it landed. If the flow
   implies content you did not capture, flag it — never silently fake it.

## Output

- Project folders populated:
  - `brand/` — logo, header, footer, icon set.
  - `data/` — products, prices, colours, sizes, categories, filters (real).
- A short capture summary listing each asset and its source URL.

## Rules

- **Capture only what the flow needs.** Never mirror the whole catalogue or
  build a shared content kit. Smallest believable slice wins.
- **Assets live in the project**, not back in the starter.
- **Imagery = public CDN URLs only.** Nothing stored in the repo.
- **Never lorem ipsum.** Use the brand voice for any copy.
- **Human-supervised.** Don't automate repeated capture requests; confirm scope
  before pulling.
- Internal prototypes only — logo and imagery are copyrighted (Inditex).
