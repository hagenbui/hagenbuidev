# Nexst — AI SNS Platform · Audit Log

> **Figma file:** Nexst - AI SNS Platform  
> **Audited against:** Ratius Design System v0.4  
> **Last updated:** 2026-04-03

---

## Stage 1 — Rename Pass ✅ Done

### Collections renamed

| Before | After |
|--------|-------|
| `🌏 Base` | `_Foundation` |
| `🪣 Token` | `1. Token` |
| `🔢 String & Number` | `2. String & Number` |
| `📏 Type Base` | `3. Typography` |
| `🔠 Type Setting` | `3b. Type Setting` *(needs manual merge into 3. Typography)* |
| `📱 Device Config` | `4. Device Config` |

**Mode:** `Dark v2` → `Dark` in `1. Token`

---

### Token variables renamed

| Before | After |
|--------|-------|
| `Text/textFirst` | `Foreground/fgPrimary` |
| `Text/textSecond` | `Foreground/fgSecondary` |
| `Text/textThird` | `Foreground/fgTertiary` |
| `Text/textDisable` | `Foreground/fgDisabled` |
| `Text/textInverse` | `Foreground/fgInverse` |
| `Text/textOnBrand` | `Foreground/fgOnBrand` |
| `Importants/Brand/brand` | `Foreground/fgBrand` |
| `Importants/Brand/brandSecond` | `Foreground/fgBrandSecondary` |
| `Importants/Semantic/warning` | `Semantic/error` |
| `Importants/Semantic/warningSecondary` | `Semantic/errorSecondary` |
| `Containers/Brand/brandCont` | `Containers/Background/bgBrand` |
| `Containers/Brand/brandContSecond` | `Containers/Background/bgBrandSecondary` |
| `Containers/Brand/brandHover` | `Containers/Background/bgBrandHover` |
| `Containers/Brand/brandPressed` | `Containers/Background/bgBrandPressed` |
| `Containers/Brand/onBrandCont` | `Foreground/fgOnBrandAlt` ⚠️ duplicate of `fgOnBrand` — delete in Stage 2 |
| `Containers/Brand/onBrandContSecond` | `Foreground/fgOnBrandSecondary` |
| `Containers/Disabled/disabled` | `Containers/Background/bgDisabled` |
| `Containers/Disabled/onDisabled` | `Foreground/fgOnDisabled` |
| `Containers/Background/alpha33` | `Containers/Alpha/alpha33` |
| `Containers/Background/alpha100` | `Containers/Alpha/alpha100` |
| `Containers/Background/alpha200` | `Containers/Alpha/alpha200` |
| `Containers/Background/alpha300` | `Containers/Alpha/alpha300` |
| `Containers/Background/alpha400` | `Containers/Alpha/alpha400` |
| `Containers/Background/alpha500` | `Containers/Alpha/alpha500` |
| `Strokes/stroke` | `Borders/bdPrimary` |
| `Strokes/strokeTextInput` | `Borders/bdTextInput` |
| `Strokes/strokeBrand` | `Borders/bdBrand` |

---

### String & Number renamed

**Spacing scale shifted one tier up:**

| Before | After | Value |
|--------|-------|-------|
| `Spacing/2xsm` | `Spacing/3xsm` | 2px |
| `Spacing/xsm` | `Spacing/2xsm` | 4px |
| `Spacing/sm` | `Spacing/xsm` | 8px |
| `Spacing/md` | `Spacing/sm` | 12px |
| `Spacing/lg` | `Spacing/md ✦` | 16px |
| `Spacing/xl` | `Spacing/lg` | 20px |
| `Spacing/2xl` | `Spacing/xl` | 24px |

| Before | After |
|--------|-------|
| `Stroke/select-width` | `Stroke/focus-width` |
| `Screen/screen-padding` | `Screen Padding/screen-padding` |

---

### Typography variables + text styles renamed

`headline` → `title` across all sizes (lg / md / sm / xsm), for both variables in `3. Typography` and local text styles.

---

### Foundation

| Before | After |
|--------|-------|
| `Colors/Brand/500` | `Colors/Brand/500 ✦` |

---

## Stage 2 — Pending (Delete / Add / Remap)

### Delete (extra / junk tokens)
- `Foreground/fgOnBrandAlt` — duplicate of `fgOnBrand`
- `Containers/Background/bgBrandPressed` — no equivalent in Ratius, confirm if needed
- `Containers/Background/bgAlpha` — raw rgba, not aliased
- `Containers/Background/bgAlphaBrand` — raw rgba, not aliased
- `Borders/bdTextInput` — raw rgba, not aliased
- `Container/Plain/Plain2` — typo + raw value
- `Spacing/0` — not in Ratius

### Add (missing vs Ratius)
- `Spacing/2xl` (32px) — highest tier missing
- `Opacity/opacity-disabled` (50%)
- `Containers/Background/bgBrandSecondaryHover`
- `Semantic/warning`, `Semantic/warningSecondary` — currently mislabeled as error
- `Semantic/success`, `Semantic/successSecondary`
- `Foreground/fgOnError`, `Foreground/fgOnErrorSecondary`
- `Borders/bdBrandSecondary`, `Borders/bdError`, `Borders/bdErrorSecondary`
- `Effects/focusBrand`, `Effects/focusPlain`
- Effect styles: `Elevate/Medium`, `Elevate/High`, `Focus/Brand`, `Focus/Destructive`, `Focus/Plain`

### Remap (wrong values — keep names, fix aliases)
- `Containers/Background/bgElevate` (Light) — currently → Neutrals/140, should → Neutrals/0-white
- `Containers/Background/bgBrandHover` (Light) — currently → Brand/400, should → Brand/600
- `Foreground/fgOnBrand` — currently → Neutrals/1000 (black), should → Neutrals/0-white
- `Foreground/fgBrandSecondary` — currently → Brand/900, should → Brand/1000
- `Semantic/error` — currently → Red/600, should → Red/500

### Structural (manual in Figma)
- Merge `3b. Type Setting` into `3. Typography`
- `Radius/button-radius` is 1000px (pill) vs Ratius 16px — confirm intentional for Nexst
- `Radius/surface-radius` and `outer-surface-radius` aliased to spacing tokens (smaller than Ratius) — confirm intentional
- Typography scale sizes differ from Ratius (Inter-based, no display tier) — confirm intentional

---

## Responsive

> **Scope:** Tables-only page (`User / View Only`). Charts, cards, and grid layout rules will be documented separately per page type.
> **Source:** Desktop frame 1440px · Mobile frame 375px

### Breakpoints

| Name | Value | Role |
|------|-------|------|
| `sm` | 375px | Mobile base |
| `md` | 768px | Tablet (inferred) |
| `lg` | 1024px | Desktop threshold |
| `xl` | 1440px | Full desktop canvas |

---

### 1. Layout & Padding

| Property | Desktop | Mobile | Token |
|----------|---------|--------|-------|
| Side padding | 80px | 16px | Desktop: `Screen Padding/screen-padding` · Mobile: `Spacing/md` |
| Content max-width | 1280px | 343px | — |
| Section vertical gap | 24px between table cards | 24px | `Spacing/xl` |

---

### 2. Header

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 64px | 102px |
| Inner padding | `Spacing/md` horizontal | `Spacing/md` horizontal |
| Nav | Inline horizontal | Hamburger → drawer; links collapse |

---

### 3. PageHeader (Entity Info)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 260px | 192px |
| Layout | `flex-row` — logo + name + socials in one line | `flex-col` — logo → name → socials stacked |
| Gap between elements | `Spacing/xl` (24px) | `Spacing/sm` (12px) |
| Breadcrumb | Top of PageHeader | Retained, same position |
| Tab nav | Below entity row | Below entity row |
| Padding (top/bottom of block) | `Spacing/xl` (24px) | `Spacing/md` (16px) |

---

### 4. Tabs

| Property | Desktop | Mobile |
|----------|---------|--------|
| Strip width | 320px, all items visible | 438px strip in 343px container — horizontal scroll |
| Overflow | None | `overflow-x-auto`, scrollbar hidden |
| Gap between tab items | `Spacing/md` (16px) | `Spacing/md` (16px) — unchanged |
| Padding (tab strip top) | `Spacing/xl` (24px) | `Spacing/xl` (24px) |

---

### 5. Section Title + Controls (per table card)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Layout | `flex-row justify-between` — title left, search right | `flex-col` — title → search → button |
| Gap (flex-col stack) | — | `Spacing/xsm` (8px) between each element |
| Padding inside card | `Spacing/md` (16px) all sides | `Spacing/md` (16px) all sides |
| Search input width | 320px fixed | `w-full` (`Spacing/md` padding each side) |
| Filter/Export button | Inline or hidden | Full-width, below search |

---

### 6. Data Tables (tables-only rule)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Container width | 1248px | 311px visible |
| Horizontal overflow | None | `overflow-x-auto` + 6px scrollbar indicator at bottom |
| Column strategy | All columns visible | All columns preserved — no drop; user scrolls |
| Column min-widths | Fixed px per column | Same fixed px minimums — do not collapse |
| Cell height | 40px | 40px — unchanged |
| Cell padding | `Spacing/sm` (12px) horizontal | `Spacing/sm` (12px) horizontal |
| Checkbox column | 28px, leftmost | 28px, leftmost |
| Priority cols (visible first) | All | Col 1: name/address (~169px) · Col 2: primary metric (~83px) · rest: scroll-to |

---

### 7. Pagination

| Property | Desktop | Mobile |
|----------|---------|--------|
| Layout | `flex justify-between` | `flex justify-center` |
| Rows-per-page selector | Visible left | Hidden |
| "Showing X–Y of Z" text | Visible | Hidden |
| Numbered page buttons | Visible | Hidden |
| Prev / Next | Visible right | Visible, centered |
| Gap from table bottom | `Spacing/xl` (24px) | `Spacing/xl` (24px) |

---

### 8. Footer

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 85px | 128px (content stacks) |
| Padding | `Spacing/xl` horizontal | `Spacing/md` horizontal |

---

### Quick Implementation Checklist (Tables Page)

- [ ] Page wrapper: `px-[Spacing/md] lg:px-[Screen Padding/screen-padding]`
- [ ] Header height: 64px desktop / 102px mobile + hamburger trigger
- [ ] PageHeader: `flex-col gap-[Spacing/sm] lg:flex-row lg:gap-[Spacing/xl]`
- [ ] PageHeader block padding: `py-[Spacing/md] lg:py-[Spacing/xl]`
- [ ] Tab strip: `flex overflow-x-auto scrollbar-none` (no breakpoint change, just allow overflow)
- [ ] Section controls: `flex flex-col gap-[Spacing/xsm] lg:flex-row lg:justify-between`
- [ ] Search input: `w-full lg:w-[320px]`
- [ ] Filter button: `w-full lg:w-auto lg:hidden` (confirm desktop visibility per section)
- [ ] Table wrapper: `overflow-x-auto`
- [ ] Pagination row: `flex justify-center lg:justify-between`
- [ ] Pagination — hide on mobile: rows-per-page selector, page number buttons, "Showing" text
