---
version: 0.1.0
revision: 0.0.1
name: Massimo Dutti
theme: light
source: Tokens reverse-engineered from massimodutti.com (GB store, 2026-06). Confirm against the official brand/Figma library before production use.
colors:
  # --- Neutrals & surfaces (the backbone — ~95% of the canvas) ---
  'text': '#000000'                 # Primary copy, headings, most UI text
  'text-subtle': '#555555'          # Secondary copy, metadata, captions
  'text-subtlest': '#767676'        # Hints, disabled-adjacent, helper text
  'text-muted': '#696969'           # Legal / fine print
  'text-inverse': '#FFFFFF'         # Text on black/photography
  'surface': '#FFFFFF'              # Page background — the default canvas
  'surface-sunken': '#F4F4F4'       # Wells, grouped panels, input fills
  'surface-inverse': '#000000'      # Footer, promo bars, full-bleed dark sections
  'border': '#000000'               # Buttons, inputs, dividers (hairline, 1px)
  'border-subtle': '#BBBBBB'        # Lighter dividers, secondary outlines
  'border-input': '#000000'         # Field outline
  # --- Editorial accent (decorative only — never a status color) ---
  'accent-sand': '#DACFBF'          # Warm campaign/editorial backgrounds
  # --- Functional (used sparingly; e-commerce states) ---
  'focus': '#3860BE'                # Focus ring / selected-link blue
  'link': '#000000'                 # Links are black + underline, not blue
typography:
  # Brand typeface: Suisse (SuisseIntl). System fallback: Helvetica, Arial, sans-serif.
  'family-base':
    fontFamily: 'suisse-regular, Helvetica, Arial, sans-serif'   # weight 400
  'family-light':
    fontFamily: 'suisse-light, Helvetica, Arial, sans-serif'     # weight 100/300
  'family-medium':
    fontFamily: 'SuisseIntl-Medium, Helvetica, Arial, sans-serif' # weight 500
  'display':            # Hero / campaign headlines
    fontFamily: 'suisse-light, Helvetica, Arial, sans-serif'
    fontSize: '3rem'    # 48px
    fontWeight: 400
    lineHeight: '1.1'
    letterSpacing: '0.1rem'   # ~1.6px, uppercase
    textTransform: 'uppercase'
  'heading':            # Section titles
    fontFamily: 'suisse-regular, Helvetica, Arial, sans-serif'
    fontSize: '1rem'    # 16px
    fontWeight: 700
    lineHeight: '1.5'
    letterSpacing: '0.13rem'  # ~2px, uppercase
    textTransform: 'uppercase'
  'body':
    fontFamily: 'suisse-regular, Helvetica, Arial, sans-serif'
    fontSize: '1rem'    # 16px
    fontWeight: 400
    lineHeight: '1.5'
  'body-small':
    fontFamily: 'suisse-regular, Helvetica, Arial, sans-serif'
    fontSize: '0.8125rem' # 13px
    fontWeight: 400
    lineHeight: '1.4'
  'label':              # Nav, buttons, eyebrows
    fontFamily: 'suisse-regular, Helvetica, Arial, sans-serif'
    fontSize: '0.75rem'  # 12px
    fontWeight: 400
    lineHeight: '1.5'
    letterSpacing: '0.03rem' # ~0.48px
    textTransform: 'uppercase'
  'weight-light': { fontWeight: 100 }
  'weight-regular': { fontWeight: 400 }
  'weight-medium': { fontWeight: 500 }
  'weight-bold': { fontWeight: 700 }
spacing:           # 8px base grid
  '0': '0rem'
  '050': '0.25rem'   # 4px
  '100': '0.5rem'    # 8px
  '150': '0.75rem'   # 12px
  '200': '1rem'      # 16px
  '300': '1.5rem'    # 24px
  '400': '2rem'      # 32px
  '600': '3rem'      # 48px
  '800': '4rem'      # 64px
  '1200': '6rem'     # 96px — section breathing room
rounded:           # Massimo Dutti is sharp-cornered by default
  'none': '0'        # Buttons, cards, inputs, images — the default
  'subtle': '0.125rem' # 2px — rare, dialogs only
  'pill': '624.9375rem' # filter chips only
borders:
  'width-default': '1px'
  'width-bold': '2px'
components:
  button-primary:        # Solid black CTA — "Add to bag", primary actions
    backgroundColor: '{colors.surface-inverse}'
    textColor: '{colors.text-inverse}'
    borderColor: '{colors.border}'
    borderWidth: '{borders.width-default}'
    rounded: '{rounded.none}'
    typography: '{typography.label}'
    height: '40px'
    paddingInline: '{spacing.200}'
  button-secondary:      # White outline button
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    borderColor: '{colors.border}'
    borderWidth: '{borders.width-default}'
    rounded: '{rounded.none}'
    typography: '{typography.label}'
    height: '40px'
    paddingInline: '{spacing.200}'
  input-text:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    borderColor: '{colors.border-input}'
    borderWidth: '{borders.width-default}'
    rounded: '{rounded.none}'
    typography: '{typography.body-small}'
    height: '48px'
    paddingInline: '{spacing.150}'
  filter-chip:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.pill}'
    typography: '{typography.label}'
    height: '32px'
    paddingInline: '{spacing.200}'
---

# Massimo Dutti DESIGN.md

> A portable, token-first manifest for generating UI that feels like Massimo Dutti —
> minimalist, editorial, monochrome, and image-led, with generous whitespace and
> understated typographic chrome. Everything needed to build on-brand UI is here:
> the **YAML above** (every colour, type setting, spacing step, radius) plus **this
> prose** (how the pieces fit together). Rules use RFC 2119: **MUST**, **MUST NOT**,
> **SHOULD**, **MAY**.

This file captures **design intent**, not a production implementation. It is for
generating new prototypes and flows in the Massimo Dutti style — not a substitute
for the real component library, Figma, or engineering standards.

### Table of contents

[Overview](#overview) · [Colours](#colours) · [Typography](#typography) ·
[Layout & spacing](#layout--spacing) · [Imagery](#imagery) · [Components](#components) ·
[Voice & tone](#voice--tone) · [Accessibility](#accessibility) · [Do's and Don'ts](#dos-and-donts)

---

## Overview

### Brand & style

Massimo Dutti's interface is **editorial, quiet, and photography-first.** Large
fashion imagery carries every page; the UI chrome stays minimal, monochrome, and
out of the way. Hierarchy comes from **whitespace and type scale**, not from colour,
borders, or shadows. The result feels like a premium printed lookbook rather than a
busy "app".

#### Atmosphere rules

- **MUST** keep the palette monochrome — black, white, and a small grey ramp.
  Colour comes from the **product photography**, never from decorative UI.
- **MUST** let imagery dominate. UI elements (buttons, labels, nav) are small,
  understated, and recede behind the content.
- **MUST** use sharp corners (`rounded.none`) for buttons, inputs, cards, and image
  containers. Rounded "app-like" cards are off-brand.
- **MUST NOT** use drop shadows, elevation, gradients, or glassmorphism. Depth is
  expressed with whitespace and the occasional `surface-sunken` panel.
- **MUST** compose on an 8px grid via the `spacing` scale, and be generous — large
  whitespace is a core part of the premium feel.
- **SHOULD** reserve the warm `accent-sand` tone for full-bleed editorial/campaign
  backgrounds only, never for buttons or status.

#### Reference points

- **Aligned with:** high-end fashion e-commerce (COS, Arket, The Row) — restraint,
  monochrome, editorial photography, wide-tracked uppercase labels.
- **Not aligned with:** colourful SaaS dashboards, Material Design elevation, rounded
  Tailwind/Shadcn defaults, saturated gradient CTAs.

---

## Colours

The system has three kinds of colour, and they are not interchangeable:

1. **Neutrals & surfaces** — the backbone for ~95% of the canvas (black, white, greys).
2. **Editorial accent** — `accent-sand`, decoration for campaign backgrounds only.
3. **Functional** — `focus` blue and link treatment, used sparingly.

Refer to colours by their YAML key in prose; emit literal hex in HTML/CSS.

- **MUST** use `surface` (`#FFFFFF`) as the page canvas and `text` (`#000000`) for
  primary copy. This black-on-white contrast is the brand's signature.
- **MUST** use the grey ramp (`text-subtle` → `text-subtlest` → `text-muted`) for
  hierarchy in secondary text — never tints of colour.
- **MUST** treat `accent-sand` (`#DACFBF`) as **decoration only** (editorial section
  backgrounds). It is **not** a button colour and carries no status meaning.
- **SHOULD** present links as black text with an underline, not blue. Reserve the
  `focus` blue (`#3860BE`) for keyboard focus rings and selected states.
- **MUST NOT** introduce brand colours, semantic red/green/amber fills, or
  saturated accents for ordinary UI. If a status must be shown (e.g. "out of
  stock"), express it with text + weight, not a coloured pill.

---

## Typography

### Family

- **Suisse** (`SuisseIntl` / `suisse-regular` / `suisse-light` / `SuisseIntl-Medium`)
  is the single brand typeface for every screen. System fallback stack is
  **Helvetica, Arial, sans-serif**.
- **MUST NOT** introduce third-party fonts (Inter, Roboto, Geist, serif display
  faces). If Suisse is unavailable, the Helvetica/Arial fallback already covers it.

### Scale & usage

- **`display`** (48px, light, uppercase, wide tracking) — hero and campaign
  headlines over imagery only.
- **`heading`** (16px, bold, uppercase, ~2px tracking) — section titles, nav.
- **`body`** (16px, regular) — default copy, product descriptions.
- **`body-small`** (13px) — metadata, prices, helper text, form fields.
- **`label`** (12px, uppercase, tracked) — buttons, eyebrows, nav items, tags.

Rules:

- **MUST** set uppercase + letter-spacing via the `display`, `heading`, and `label`
  tokens — wide-tracked uppercase is the brand's defining typographic gesture.
- **MUST** keep body copy in mixed case at the `body` size; do not uppercase
  paragraphs.
- **MUST** prefer `weight-light` / `weight-regular` for elegance; reserve
  `weight-bold` for short uppercase headings and nav, not long text.
- **MUST NOT** invent off-scale sizes; map to the nearest token step.

---

## Layout & spacing

Spacing is an **8px-base** system. Every distance — padding, margin, gap — **MUST**
land on a `spacing` token step. Whitespace is deliberately generous.

- **MUST** use large vertical rhythm between sections (`space-800` / `space-1200`)
  to give imagery and products room to breathe.
- **MUST** express grouping through proximity and whitespace before reaching for
  any divider; when a divider is needed use a 1px `border-subtle` hairline.
- **SHOULD** lay out product grids as edge-to-edge or near-full-bleed columns with
  minimal gutters (`space-050` / `space-100`) so photography stays the focus.
- **MUST NOT** use off-grid pixel values (`13px`, `10px 14px`); round to a token.

---

## Imagery

Photography is the most important design element in the system — treat it with the
same rigor as colour and type.

- **MUST** lead with full-bleed or large-format fashion photography; images are the
  primary content, not decoration.
- **MUST** keep image containers sharp-cornered (`rounded.none`), with no border,
  shadow, or overlay tint except where text must sit legibly over the image.
- **SHOULD** use consistent portrait aspect ratios (e.g. 3:4 / 2:3) for product
  cards across a grid for a calm, catalogue-like rhythm.
- **SHOULD** place captions/labels below or minimally overlaid in `text-inverse`
  uppercase `label` type, never in heavy boxes.
- **MUST NOT** crop product photography inconsistently or mix portrait and
  landscape ratios within the same grid.

---

## Components

The visual recipe (colours, height, padding, radius, type) for each component is in
the YAML `components:` block. This section covers behaviour, variants, and the
anti-patterns to correct on sight.

### Button

Two appearances, both sharp-cornered, uppercase, and understated:

- **`button-primary`** — solid black fill, white text. The single primary action on
  a surface (e.g. "Add to bag", "Continue").
- **`button-secondary`** — white fill, black text, 1px black outline. Secondary
  actions ("Add to wishlist", "Back").

Rules:

- **MUST** label buttons in uppercase via the `label` token.
- **MUST** use at most one `button-primary` per section; everything else is secondary.
- **MUST NOT** add border-radius, drop shadow, or colour fills to buttons. A black
  or white rectangle with a 1px border is the brand button.
- **MUST NOT** use colour to signal a destructive action; rely on a confirming
  dialog and clear copy instead.

### Input / form field

- Sharp-cornered, 1px black border, `surface` fill, `body-small` text.
- **MUST** provide a visible uppercase `label` above the field; placeholders are not
  labels.
- **MUST** show validation as text beneath the field, in `text` with weight, not a
  coloured outline-only state.

### Filter chip

- Pill-shaped (`rounded.pill`) is the **only** exception to the sharp-corner rule,
  used exclusively for PLP filter/sort chips.
- **MUST NOT** reuse the pill radius for buttons or cards.

### Product card

- Image-first: large portrait photo, `rounded.none`, no border or shadow.
- Below the image: product name in `body-small`, price in `body-small`, optional
  colour swatches. Keep all text left-aligned and quiet.
- **MUST NOT** add hover shadows, zoom borders, or coloured "sale" badges; a sale is
  shown with a struck-through price + new price in `text`.

### Header / navigation

- Minimal top bar on `surface`, uppercase `label` nav items, generous spacing, no
  borders except a single hairline on scroll if needed.

---

## Voice & tone

Massimo Dutti's voice is **refined, concise, and understated** — it sounds like a
premium fashion house, not a chatty app.

- **MUST** keep copy short, calm, and elegant. Let the product speak.
- **MUST** use imperative, restrained CTAs ("Add to bag", "Discover", "Shop the
  collection") — never "Buy now!!!", "Click here", or exclamation-heavy marketing.
- **SHOULD** use uppercase for short labels and CTAs; sentence case for descriptive
  copy.
- **MUST NOT** be playful or jokey; the tone stays composed even in errors and
  empty states.

---

## Accessibility

WCAG 2.2 AA is the floor, not the ceiling.

- The black-on-white core palette comfortably exceeds AA contrast; **MUST NOT**
  drop body text below `text-subtle` (`#555555`) on white for long copy.
- **MUST** show a visible focus ring (use the `focus` blue) on every focusable
  element; never `outline: none` without a replacement.
- **MUST** maintain legibility of text overlaid on photography — add a subtle scrim
  or choose a calm area of the image; do not rely on the photo alone.
- **MUST NOT** rely on colour alone for meaning (the palette is monochrome anyway —
  pair any state with text, weight, or an icon).
- **MUST** label every icon-only control (search, bag, wishlist) with an accessible
  name.
- **MUST** keep wide letter-spacing readable — do not track body copy; tracking is
  for short uppercase labels only.

---

## Do's and Don'ts

The scan-friendly TL;DR. Each line is a drift pattern to correct on sight.

| Do                                                                  | Don't                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Monochrome UI; colour comes from product photography                | Brand-coloured buttons, gradients, or saturated accents          |
| Sharp corners (`rounded.none`) on buttons, inputs, cards, images    | Rounded "app" cards or pill buttons (pills are filter chips only)|
| Hierarchy via whitespace + type scale on the 8px grid               | Drop shadows, elevation, or borders to fake depth                |
| Solid black primary button / white outline secondary                | Coloured CTAs, multiple primary buttons per section              |
| Uppercase + wide tracking for `display` / `heading` / `label`       | Uppercasing body paragraphs, or tracking long copy               |
| Suisse (Helvetica/Arial fallback)                                   | Inter / Roboto / Geist / serif display fonts                     |
| Full-bleed editorial photography as the hero                        | Small, decorative, or inconsistently-cropped images              |
| `accent-sand` for editorial backgrounds only                        | `accent-sand` (or any colour) as a button or status fill         |
| Links as black underlined text                                      | Blue link text in product UI                                     |
| Sale shown as struck price + new price                              | Coloured "SALE" badges/pills on cards                            |
| Generous section spacing (`space-800` / `space-1200`)               | Cramped, dense, dashboard-style layouts                          |
