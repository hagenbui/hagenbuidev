# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo containing independent projects:

| Directory | Type | Status |
|-----------|------|--------|
| `varpro/` | Figma plugin (TS + React + Tailwind) | Active |
| `varpro-fresh/` | Copy of varpro for fresh iterations | Active |
| `expensetracker/` | iOS app (Swift + CoreData + Xcode) | Active |
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
