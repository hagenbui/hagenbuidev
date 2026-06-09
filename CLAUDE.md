# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo containing independent projects:

| Directory | Type | Status |
|-----------|------|--------|
| `varpro/` | Figma plugin (TS + React + Tailwind) | Active |
| `varpro-fresh/` | Copy of varpro for fresh iterations | Active |
| `expensetracker/` | iOS app (Swift + CoreData + Xcode) | Active |
| `animation/` | Standalone Three.js hero/globe prototypes (single-file HTML) | Active |
| `vibedesign/` | Figma-to-code design specs (Markdown) | Reference docs |
| `figma-plugin-lessons-learned.md` | Build patterns for Figma plugins | Reference |

---

## varpro — Figma Plugin

### Commands

```bash
cd varpro

npm run build        # Build both plugin backend and UI
npm run build:plugin # Build only code.ts → code.js (ES2017)
npm run build:ui     # Build only React UI → dist/ui.html
npm run watch        # Watch mode for both (uses concurrently)
npm run lint         # Lint .ts/.tsx
npm run lint:fix     # Lint with auto-fix
```

To test in Figma: Figma Desktop → Plugins → Development → Import plugin from manifest → select `manifest.json`. Reopen the plugin after each build.

### Architecture

The plugin has a hard split between two isolated runtimes:

**`code.ts` (plugin backend)** — runs in Figma's sandbox, has access to `figma.*` API. Compiles to `code.js` via `tsconfig.plugin.json`. **Must target ES2017** — no optional chaining (`?.`), nullish coalescing (`??`), or `catch {}` without binding. RGB values in Figma are 0–1 floats, not 0–255.

**`src/ui/` (React frontend)** — runs in an iframe, has no Figma API access. Bundled into a single `dist/ui.html` via `vite-plugin-singlefile`.

**Communication** is strictly via `postMessage`:
- UI → Plugin: `parent.postMessage({ pluginMessage: { type, ...} }, '*')`
- Plugin → UI: `figma.ui.postMessage({ type, ... })`
- Message types are defined as a discriminated union in `src/ui/types.ts`

**State pattern:** When the plugin sends updated variable data, the UI preserves selection state by diffing against previous `v.id` values (see `App.tsx` `variable-updated` handler).

**Persistence:** User preferences (e.g. color scale group markings) are stored via `figma.root.setPluginData()` / `getPluginData()`, not localStorage.

### Key files

- `code.ts` — all Figma API logic
- `src/ui/App.tsx` — root component, all message handling, state
- `src/ui/types.ts` — shared types and PluginMessage union
- `src/ui/utils/variableParser.ts` — grouping and validation logic
- `tsconfig.plugin.json` — ES2017 target, only compiles `code.ts`
- `vite.config.ts` — root is `src/ui/`, outputs to `../../dist`

### Known constraint
`tsconfig.plugin.json` targets ES2017 deliberately (Figma sandbox limitation). Do not upgrade this target.

---

## expensetracker — iOS App

Swift + CoreData + SwiftUI project. Open `expensetracker/expensee.xcodeproj` in Xcode. No CLI build commands are configured.

---

## vibedesign — Design Specs

Markdown files documenting Figma-to-responsive-code pipelines. These are source-of-truth specs for implementing responsive layouts from specific Figma files. When implementing from these specs, apply the breakpoint table and checklist — do not re-derive from Figma unless the spec says "no dedicated mobile frame."

---

## animation — Three.js Prototypes

Self-contained, single-file HTML animations (mostly globe/hero backgrounds for the Varmeta landing page). **No build step.** Each file loads Three.js **r128 from cdnjs** and has all logic in one inline `<script>`. Develop by serving the folder (VS Code Live Server, `http://127.0.0.1:5501/<file>.html`) and **hard-refreshing** (iframes cache aggressively).

### Key files

- `hero-3.html` — **the current globe** (see details below). ~270KB — bulk is the `LAND` array.
- `hero-section.html` — **the current hero section** (see details below). Figma source: file `fXGvcxDjcH4uPOTYHlXIdy`, node `40011635:4696` (Varmeta Sub Landing Pages).
- `varmeta-globe-embed.html` — original Cloudflare-style globe; **source of the `LAND` continent-dot array** (unit-vector coords) and the `ll2v(lat,lon,r)` projection.
- `hero-2.html`, `hero-4.html`, `section1-anim*.html` — earlier iterations / alternates.
- `tokens.json` — Varmeta design tokens (brand `#1078f3`, `#bce5ff`/`#8ed5ff`/`#59bcff`, neutrals, `bd-secondary` = `#eaeaea`). Use these for any globe/section colors.

---

### hero-3.html — Globe details

Square dotted continents (`LAND` array → `THREE.Points`) + graticule grid lines + city network nodes (Hanoi HQ + 10 offices/partners). Crystallize-from-seed reveal; poles parked horizontally (left/right) and spun via quaternion. Back hemisphere culled per-fragment via `vRim`.

**Current state:**
- **No drag-to-rotate** — pointer only drives cursor-proximity glow. Auto-rotate only (`SPIN_RATE = 0.006` rad/s).
- **No traveling data lines** — the edge mesh exists in JS but is not added to the scene. Travelers/surges/arrival-waves code remains but is gated off (`if (false)`).
- **Varied dot sizes** — each land dot has a deterministic pseudo-random `aSize` attribute (0.45–1.9× range, sin-hash of position). Vertex shader multiplies `uSize * aSize`.
- **Ambient dot ripples** — three overlapping slow sine waves (different spatial + temporal frequencies) compute a per-dot `vPulse` (0–1) each frame. Drives size variation (0.80–1.30×) and color/alpha lift, creating organic sweeping shimmer across continents.
- **Graticule opacity** — boosted to 0.9× for more visible axes.
- **White-only mode** — `?blend=1&topf=2.0` sentinel in BLEND_GLSL forces `baseCol = vec3(1.0)` (pure white) regardless of screen position. The standard blend (white over blue, blue over white) is restored by setting `topf` back to a value ≤ 1.0.
- **First frame** — `computeInitialSpin(0.44)` targets ~44% land coverage so ocean white-space is visible on load.
- **Pointer forwarding** — accepts `{ type: 'parentpointer', x, y, w, h }` via `postMessage` from the embedding page so cursor glow tracks correctly even when the pointer is over overlapping parent-page elements.

**URL params:** `?blend=1` enables blend mode. `topf=<0–1>` sets the iframe-top fraction for gradient inversion. `topf=2.0` = white-only mode.

---

### hero-section.html — Hero section details

Full Varmeta hero section. `hero-3.html` embedded as a bottom-half `<iframe>` (`height: 60%`, `bottom: 0`). No Tailwind — plain CSS + vanilla JS.

**Layout:**
- Background: radial gradient from top-center (`#0d72e9` → `#e0ecfc` → white), pixel-matched to Figma.
- Faint CSS grid overlay (128px cells, opacity 0.18, radially masked toward center-lower).
- Globe iframe top-edge masked with a linear fade so dots don't crowd behind text.
- Title content is top-aligned (not vertically centered) — sits right under the nav.

**Title gradient:** applied per `.word` span (not per line), `linear-gradient(180deg, #f5faff 50%, #bcdaff 100%)`. This ensures the gradient resets per-line even when words are split into individual `<span>` elements by JS.

**Logo carousel:** seamless marquee — two identical `.partners__group` divs in a `.partners__track` animated `translateX(0 → -50%)` over 28s. Pause-on-hover. Edge-fade mask on both sides.

**Entrance animation sequence** (all timings driven from JS constants at top of `<script>`):

| Element | Trigger |
|---|---|
| Background + grid | 0ms (600ms fade) |
| Globe iframe | 350ms |
| Title word 1 | 720ms |
| Title words 2–N | +90ms stagger each |
| Subtitle | last-word-start + 120ms (overlaps) |
| Buttons | subtitle-start + 140ms (overlaps) |
| Nav + logos | buttons-start + 520ms (same time) |

Words are split into `<span class="word">` by JS at load; each gets `animationDelay` set inline. `prefers-reduced-motion` skips all animations.

**Pointer forwarding:** parent page listens to `pointermove` and posts `{ type: 'parentpointer' }` to the globe iframe so cursor glow works over text/buttons.

---

### Patterns & gotchas

- **Transparency works** (`alpha: true`, `setClearColor(…, 0)`, transparent body) — standalone shows browser white behind. `mix-blend-mode` does **not** cross iframe boundaries.
- **White-only globe:** use `?blend=1&topf=2.0`. Reverting to blue/white blend: `?blend=1&topf=0.40` (topf = iframe-top ÷ section-height).
- **`LAND` reuse:** don't hand-edit the array. Splice it with a small Python script (extract `const LAND = [...]` from one file, replace a `/*__LAND__*/` placeholder in another).
- **Coordinate convention:** dots and `ll2v` use `x=-sin(phi)cos(th), y=cos(phi), z=sin(phi)sin(th)` with `phi=(90-lat)`, `th=(lon+180)`. Keep new geo math consistent so cities land on the right continents.
- **Validate edits:** extract the inline script and run `node --check` (browser globals like `THREE` are fine for syntax-only check), then `curl` the Live Server URL for a 200.
- **Figma MCP asset URLs** (logos in `hero-section.html`) expire ~7 days — localize before publishing. Fonts Visby CF / Google Sans Flex are licensed; fall back to system until files are added.

---

### Animation Design DNA

Rules that apply to **all** `anim/` files — do not break these when editing:

- **No threshold color jumps** — never use `if (value > threshold)` to switch between two colors. All node/edge color transitions must use continuous interpolation. The helper pattern is:
  ```js
  function lerpRGBA(r0,g0,b0,a0, r1,g1,b1,a1, t) {
    return `rgba(${(r0+(r1-r0)*t+.5)|0},${(g0+(g1-g0)*t+.5)|0},${(b0+(b1-b0)*t+.5)|0},${(a0+(a1-a0)*t).toFixed(2)})`;
  }
  ```
  Use `gl` (glow 0–1) directly as `t`. This applies to fill, stroke, border gradient stops, and icon color.
- **Asymmetric glow easing** — node glow rises fast (τ ≈ 200 ms) and falls slowly (τ ≈ 600 ms) so pulses feel deliberate, not flickery. Use separate `kRise`/`kFall` lerp constants.
- **Unified travel color** — all three animations (`blockchain`, `ai-agent`, `data-flow`) use `#1078f3` (`16,120,243`) as the data-in-motion color. Do not reintroduce per-animation travel colors.
- **Speed sync** — `blockchain` `SCROLL_PPS = 48`, surge screen speed ≈ 70 px/s. `ai-agent` / `data-flow` `PSPEED ≈ 0.006/frame` → ~2.8 s full traverse. Scale proportionally when changing pace.
- **Node hover** — hover scale 8% (`ctx.scale(1+0.08*hv)` canvas / CSS `scale(1.09)` SVG) + two expanding pulse rings (same phase offset as master pulse, α = `(1-raw)*0.11*hv`). Rise τ≈200ms, fall τ≈600ms. Node color shifts: gray at rest → secondary blue `#8ed5ff` (142,213,255) on hover → primary blue `#1078f3` (16,120,243) during data surge. Three-stop blend weights: `u2 = glow`, `u1 = hover*(1-glow)`, `u0 = 1-u1-u2`.
- **Frame padding** — all animations must respect a 48px visual border/padding from the frame boundaries (left, right, top, bottom). The leftmost node must start exactly 48px from the left edge, the rightmost node must end exactly 48px from the right edge, and all visual curve elements must remain within the 48px top and bottom bounds.
