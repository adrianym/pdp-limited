---
name: scaffold-prototype
description: >
  Scaffold a new on-brand prototype screen (React + TypeScript + Tailwind) wired
  to the Massimo Dutti contract. USE WHEN: the user asks to "build/start a
  prototype", "scaffold a PLP/PDP/cart screen", "set up the project", or hands
  over a user-stories/flow blueprint to turn into a screen. DO NOT USE FOR:
  auditing existing UI (brand-review) or only capturing content (capture-assets)
  — though this skill calls capture-assets when a flow needs real content.
---

# Scaffold prototype

Turn a flow intent (a prompt, a user-stories blueprint, or a Figma frame) into a
running on-brand screen. This skill orchestrates the contract: it reads the
rules, decides the input mode, captures the real content it needs, and builds in
the prescribed stack.

## Inputs

- The flow intent: a prompt, a user-stories blueprint, and/or an attached Figma
  frame.
- The full contract: `DESIGN.md`, `PROTOTYPE.md`, `HOLYGUIDE.md` +
  `holyguide.components.json`, and `AGENTS.md`.

## Procedure

1. **Read the contract first.** `DESIGN.md` (tokens + rules) → `PROTOTYPE.md`
   (content) → `HOLYGUIDE.md` (components) → `AGENTS.md` (modes + stack).
2. **Pick the input mode** (per `AGENTS.md`):
   - No Figma attached → **Website mode** (mirror the live site).
   - Figma attached → **Figma mode** (frame drives layout/intent; read it via
     the Figma Dev Mode MCP).
   - Figma attached + real products/data → **Hybrid mode** (Figma layout, live
     content).
   - Precedence: Figma = composition, `DESIGN.md` = pixels, `PROTOTYPE.md` =
     content, `HOLYGUIDE.md` = components.
3. **Ensure the stack exists.** React + TypeScript + Tailwind, **pnpm** only. If
   no Tailwind config is present, generate one from the `DESIGN.md` tokens
   (colours, spacing scale, radius, type) so tokens are guaranteed, not
   hand-transcribed. No extra UI libraries unless asked.
4. **Capture real content.** Invoke **capture-assets** for the real chrome,
   data, and imagery the screen touches. Build the page on the captured header,
   footer, and logo — never improvise chrome.
5. **Build the screen** from Holy Guide components (resolve class names from
   `holyguide.components.json`); never improvise a component that exists there.
   Use tokens only — no hex literals, no off-grid px.
6. **Self-check** against the `DESIGN.md` Do's/Don'ts (optionally hand off to
   **brand-review**) before declaring done.

## Output

- A runnable prototype screen in the project's stack, using real chrome/data and
  Holy Guide components.
- The Tailwind config wired to `DESIGN.md` tokens (created if missing).
- A short note on the chosen input mode and which assets were captured.

## Rules

- **Contract first, every time.** Tokens only; sharp corners; monochrome UI; 8px
  grid; one `btn-primary` per section; black underlined links.
- **Default market: Spain** — Spanish copy, euro prices — unless the prompt names
  another market.
- **Never invent** tokens, components, products, prices, or imagery. If a flow
  needs something uncaptured, flag it and capture the real value.
- Built output is **design intent, not production code**.
