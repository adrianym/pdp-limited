# HOLYGUIDE.md

The component contract. **Holy Guide** is the team's real design system and
component library (Storybook-style) for Massimo Dutti Frontend — built on the
`holygrail2`/`holygrail5` CSS framework. It defines the **real, in-production**
tokens, classes, components, and code snippets the live site ships.

- **Reference:** https://holyguide.es/ · Components: https://holyguide.es/components/
- **Foundations:** https://holyguide.es/foundations · Develop: https://holyguide.es/develop
- **Package:** `holygrail2` (npm) — framework-agnostic SCSS/CSS, used with Angular.
- **Machine-readable index:** [`holyguide.components.json`](holyguide.components.json)
  lists the components with their base/variants/sizes/states/classes and a real
  example each — validated by [`holyguide.schema.json`](holyguide.schema.json).
  Use it to resolve exact class names; tokens reference DESIGN.md/HOLYGUIDE.md by
  name, never raw hex/px.

## How this fits the other docs

- `DESIGN.md` decides the pixels (brand tokens), `PROTOTYPE.md` decides the
  content, `AGENTS.md` is the build rules. **Holy Guide decides the components.**
- When a prototype needs a real UI element (button, input, modal, drawer, tabs,
  size selector…), use the Holy Guide component class names, anatomy, states and
  variants below so the prototype mirrors production, not a generic look-alike.
- Holy Guide tokens are the **real values**; `DESIGN.md` tokens are an
  approximation. On conflict, treat Holy Guide as ground truth and flag the
  delta. Never invent classes, colours, or sizes outside this system.

## Foundations — tokens

### Colour (SCSS `$c-*` / CSS `.c-*` text, `.bg-*` background)

Structural greys: `$c-primary`/`$c-black` `#000000`, `$c-dark-grey` `#737373`
(secondary text), `$c-middle-grey` `#a9a9a9` (disabled/placeholder),
`$c-light-grey` `#f9f9f9`, `$c-white` `#ffffff`, `$c-sk-grey` `#e3e3e3`
(skeleton). Backgrounds: `$bg-light` `#f0f0f0`, `$c-bg-cream` `#f4f2ed`.

State: `$c-error` `#b40016`, `$c-success` `#12882c`, `$c-info` `#1a32a4`,
`$c-warning` `#ffce4e`, `$c-notice` `#e5740b`. Brand/Feel programme: `$c-feel`
`#fb9962`, `$c-feel-dark` `#c94c07`, `$c-special` gold `#a38a6b`; tiers silver
`#87888d`, platinum `#5b7fa1`, gold `#a38a6b`. Primary alpha overlays:
`$c-primary-3/15/30/60/97`; white alpha `$c-secondary-3/15/30/60/97`.

### Typography (Suisse Intl, CSS `--hg-typo-font-family-*`)

Families: primary thin 100 / light 300 / regular 400 / semibold 600 ("bold" =
suisse-semibold), secondary medium 500, mono regular/bold. Body text tracking
`0.04em`; TTU titles/labels `0.16em`; small/mono labels `0.06em`. Body uppercase
is forbidden. Scale (`$minheaders`, mobile→desktop): `.h2` 18→24 semibold,
`.title-xxl` 24, `.title-thin` 24, `.title-l`/`.title-m`/`.title-s` (light, TTU),
`.hg-body-l`/`.hg-body-m` 12→13. Fixed sizes `.text-{12,14,16,18,20,24,32,40}-r`.
Helpers: `.ttu`, `.semibold`, `.font-l/r/m/sb`, `.has-ellipsis(-3)`, `.leading-1`.

### Spacing (8px grid) & layout

Fixed `.{p,m}{t,b,l,r}-N` for N ∈ {2,4,8,16,20,24,32,40,48,56,64,72,80,96,112,
120,128,160}. Responsive `.ptr-/.pbr-/.mtr-/.mbr-N` (one class → mobile+desktop).
Grid: 12 cols `.col-12 .col-md-6 .col-lg-4` (`sm/md/lg/xl`), `.row` flex + `.gap-N`,
`.container`/`.container-fluid`. Sections: `<section class="m-48 p-48 has-light">`.
Breakpoints: `sm 768`, `md 992`, `lg 1280`, `xl 1500`. Global pad 8 / mobile 24 /
desktop 40. Inputs 48px tall. `.has-light` = light-on-dark inverse theme.

## Components (https://holyguide.es/components/)

Buttons, Banners, Checkbox, Datalist, Input, Links, List, Product View, Select,
Tabs, Tags, Tooltip, Feel Card, Marketing Spot, Modals, Store List, Toast,
Drawer, Accordion, Bottom Sheet, Size Selector, Skeleton, Spinner, Stepper.
Ratios 2:3 & 3:4 for product imagery.

### Buttons — base `.btn` + role + size + `.label-m .ttu`

Roles: `.btn-primary` (black fill / white, hover `#737373`, disabled `#f0f0f0`),
`.btn-secondary` (white + 1px black outline), `.btn-tertiary` (ghost/text),
`.btn-link`, `.btn-feel`, `.btn-secondary-feel`, plus `.btn-square` (size
selector), `.btn-quick` (PLP quick buy). Sizes: `.btn--mini/--small/--medium/
--large/--full/--xxl`. States: `[disabled]`, `.btn-loading`, `.is-active`. One
`.btn-primary` per section; everything else secondary. Example:
`<button class="btn btn-primary btn--full label-m ttu">Añadir al carrito</button>`.

Use `.has-light` context to flip to white-on-dark. Icons via `<md-icon name="…">`.

## Stack & usage

`holygrail2` SCSS, framework-agnostic. Import:
`@use "holygrail2/scss/hg-lite/abstract/_index.scss" as *;`. Icons: `svg-icon2`
/ `md-icon` set only — never new/third-party icons. The system is monochrome
(black/white/grey) with sharp corners, no shadows — consistent with `DESIGN.md`.
