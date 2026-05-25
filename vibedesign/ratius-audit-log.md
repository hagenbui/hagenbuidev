# Ratius New Base v0.4 — Audit Log

**File:** Ratius-New-Base--v0.4--  
**Date:** 2026-04-03  
**Audited by:** Claude (Sonnet 4.6) via Figma MCP  

---

## Components Audited

| Component | Node ID |
|---|---|
| InputField | 378:3604 |
| Separator | 378:4018 |
| Check Box / Radio Button / Switch | 402:12899 |
| Toast Message | 40011004:91840 |
| Illustrations | 40009401:97861 |
| Nav Bar | 40004002:14989 |
| Status Bar | 40011442:2865 |
| Leaderboard (example screen) | 40011392:10165 |

---

## Phase 1 — Design Work

### Issues Found
- `State=Focu` — truncated variant name on InputField (Figma name clip). Should be `Focus`.
- Toast **Glass style only exists for Info**. Success, Error, Warning Glass variants are missing — incomplete matrix.
- Two nodes both named `_Illust/NoPhoneState` (`299:4320`, `299:4322`) — name collision in Illustrations.
- Typo: "Deleted succesfully" in Leaderboard toast example (missing second `s`).
- **Check Box, Radio Button, Switch** share one component sheet — should be split into three.
- **Switcher** and **Bottom Navigation/Tab** are used in the Leaderboard but have no component sheet.
- **DimPanel** (`381:7836`) floats on canvas with no sheet or documentation.
- Hidden `Frame 1` (History view) inside Leaderboard is undocumented — should be removed or prefixed `_WIP/`.
- Rank #12 "Your Ranking" row is a bespoke inline frame, not a component variant.
- Illustrations section mixes individual components with a raster preview sheet (`300:3187`).

### Suggestions
- Complete the Toast Glass variant matrix for all 4 types.
- Make "Your Ranking" a `Selected=True` variant of the Creator Card component.
- Move the raster preview image out of the component canvas to a documentation page.
- Give Switcher and Bottom Navigation/Tab their own component sheets.
- Annotate or remove all hidden/floating layers.

---

## Phase 2 — Dev Work

### Issues Found
- Dozens of frames auto-named `Frame 2147223XXX` — meaningless in inspect and exports.
- Inconsistent component naming: `InputField` (camelCase), `Check box` (lowercase spaced), `Badge/Separator` (slash), `_Input/Field` (underscore+slash).
- InputField boolean property matrix (`Error×Input×Focus×Size`) in `_SubComponents` is clean, but parent component's state names (`Placeholder`, `Input`, `Focus`, etc.) don't map 1:1 — no documented bridge.
- Leaderboard podium uses fractional pixel positions (`x: 114.333...`) — will not snap cleanly.
- `Frame 2147223609` (ranked list) container height `592` appears tighter than its content extent (`572`) — overflow intent unclear.
- Switch: no `Disabled` state.
- Check Box: no `Indeterminate` state.
- Radio Button: no `Disabled` state.

### Suggestions
- Rename all auto-named layout frames to semantic names (`ListContainer`, `RankPodium`, `ActionRow`, etc.).
- Standardize naming: `PascalCase` for public components, `_PascalCase` for private sub-components.
- Document the InputField state-name → boolean-property mapping in the component description.
- Nudge podium positions to whole pixels; document intentional asymmetry if present.
- Add Disabled and Indeterminate states to all form controls.

---

## Phase 3 — AI Work

### Issues Found
- **Auto-named frames** are the biggest blocker — AI code generation maps layer names to props/roles. `Frame 2147223XXX` produces unusable output.
- No component descriptions in Figma — AI has no intent context beyond visual shape.
- Colors appear hardcoded (no variable token references surfaced) — AI generates magic hex values.
- `State=Focu` parsed as an unknown distinct state by AI pipelines, not as a typo.
- Illustrations are raster `rounded-rectangle` nodes — AI cannot read content or infer use case.
- "Your Ranking" special row is inline markup — AI asked to render the list will miss the self-highlight pattern.
- No accessibility annotations (aria roles, focus order, contrast) — AI-generated code will be inaccessible by default.

### Suggestions
- Fix all layer naming (same as Dev Phase) — single highest-leverage change for AI.
- Add a one-sentence Description to every component in Figma's component panel.
- Define a variable collection (`color/error`, `color/surface`, `color/accent`, etc.) and apply tokens across all components.
- Rename illustrations semantically: `Illust/EmptyState/NoConnection` not just `No Connection`, and add a description of the intended use case.
- Promote the `_Input/Field` boolean property pattern (Error=Off/On, Input=Off/On, Focus=Off/On) to all other interactive components — it is already AI-friendly.
- Add focus-ring visibility states and minimum contrast ratio annotations for AI to generate accessible output.

---

## Priority Order

| # | Change | Phases |
|---|---|---|
| 1 | Rename all `Frame 2147223XXX` frames | Design + Dev + AI |
| 2 | Fix `State=Focu` truncation | All |
| 3 | Complete Toast Glass variants (Success / Error / Warning) | Design + Dev |
| 4 | Add component descriptions in Figma | AI |
| 5 | Define design token variables | Dev + AI |
| 6 | Make "Your Ranking" a Creator Card variant | Design + Dev + AI |
| 7 | Separate Check Box / Radio / Switch into own sheets | Design + Dev |
| 8 | Add Disabled + Indeterminate states to form controls | Dev |
| 9 | Add accessibility annotations | AI + Dev |
| 10 | Document Switcher and Bottom Navigation/Tab | Dev + AI |
