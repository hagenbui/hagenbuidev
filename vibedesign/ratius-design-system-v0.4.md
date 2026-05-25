# Ratius Design System — v0.4 Blueprint

> **Source file:** Ratius New Base (v0.4) · Figma  
> **Last synced:** 2026-04-03  
> **Font:** Wix Madefor Text

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Variable Collections](#variable-collections)
3. [Color Palette — Foundation](#color-palette--foundation)
4. [Semantic Tokens](#semantic-tokens)
5. [Spacing & Sizing](#spacing--sizing)
6. [Typography](#typography)
7. [Effects & Elevation](#effects--elevation)
8. [Device Config](#device-config)
9. [Component Index](#component-index)

---

## File Structure

| Page | Purpose |
|------|---------|
| **Playground** | Test & exploration canvas |
| **✦ Components** | Main component library |
| ↳ 🧱 Badge & Tag | Badge and tag variants |
| ↳ 🧱 Button | Button variants |
| ↳ 🧱 Button Group | Grouped button patterns |
| ↳ 🧱 Bottom Navigation | Tab bar / nav bar |
| ↳ 🧱 Context Menu | Dropdown / action menus |
| ↳ 🧱 Dialog & Modal | Dialogs, modals, bottom sheets |
| ↳ 🧱 Header | App header bar |
| ↳ Icon Placeholder | Icon usage reference |
| ↳ Ilustration | Illustration assets |
| ↳ List Item | List row variants |
| ↳ Tab Switcher | Segmented control / tabs |
| **Changelog** | Version history |
| **Style Guide** | Design system reference |

---

## Variable Collections

| # | Collection | Modes | Purpose |
|---|-----------|-------|---------|
| — | `_Foundation` | Base | Raw primitive color palette |
| 1 | `1. Token` | Light · Dark | Semantic design tokens |
| 2 | `2. String & Number` | Mode 1 | Spacing, radius, stroke, opacity |
| 3 | `3. Typography` | Baseline | Font sizes, line heights, weights |
| 4 | `4. Device Config` | iOS · Android | Screen dimensions |
| — | `WAITING FOR SLOTS` | Mode 1 | Component-specific tokens *(WIP)* |

---

## Color Palette — Foundation

Collection: `_Foundation` · Mode: Base  
These are raw primitives. Never use directly in components — reference via semantic tokens.

### Brand

| Token | Hex |
|-------|-----|
| `Colors/Brand/100` | `#F7FAFF` |
| `Colors/Brand/200` | `#BACFFF` |
| `Colors/Brand/300` | `#7CA5FF` |
| `Colors/Brand/400` | `#3E7DFF` |
| **`Colors/Brand/500 ✦`** | **`#0055FE`** ← primary |
| `Colors/Brand/600` | `#0047D9` |
| `Colors/Brand/700` | `#003AB4` |
| `Colors/Brand/800` | `#002D8E` |
| `Colors/Brand/900` | `#002068` |
| `Colors/Brand/1000` | `#001442` |

### Neutrals — Solid

| Token | Hex | Role |
|-------|-----|------|
| `Colors/Neutrals/0 - white` | `#FFFFFF` | White |
| `Colors/Neutrals/70` | `#EDEDED` | |
| `Colors/Neutrals/140` | `#DBDBDB` | |
| `Colors/Neutrals/215` | `#C8C8C8` | |
| `Colors/Neutrals/285` | `#B6B6B6` | |
| `Colors/Neutrals/357` | `#A4A4A4` | |
| `Colors/Neutrals/427` | `#929292` | |
| `Colors/Neutrals/498` | `#808080` | Mid grey |
| `Colors/Neutrals/572` | `#6D6D6D` | |
| `Colors/Neutrals/643` | `#5B5B5B` | |
| `Colors/Neutrals/714` | `#494949` | |
| `Colors/Neutrals/785` | `#373737` | |
| `Colors/Neutrals/860` | `#242424` | |
| `Colors/Neutrals/930` | `#121212` | |
| `Colors/Neutrals/1000` | `#000000` | Black |

### Neutrals — Alpha Dark (AD) · base: `#333333`

| Token | Alpha |
|-------|-------|
| `Colors/Neutrals/33AD` | 3% |
| `Colors/Neutrals/100AD` | 5% |
| `Colors/Neutrals/200AD` | 10% |
| `Colors/Neutrals/300AD` | 20% |
| `Colors/Neutrals/400AD` | 35% |
| `Colors/Neutrals/500AD` | 50% |

### Neutrals — Alpha Light (AL) · base: `#ACACAC`

| Token | Alpha |
|-------|-------|
| `Colors/Neutrals/33AL` | 3% |
| `Colors/Neutrals/100AL` | 5% |
| `Colors/Neutrals/200AL` | 10% |
| `Colors/Neutrals/300AL` | 20% |
| `Colors/Neutrals/400AL` | 35% |
| `Colors/Neutrals/500AL` | 50% |

### Accent Palettes

Each accent has steps 100–1000 (100 = lightest, 1000 = darkest).

#### Teal

| Token | Hex |
|-------|-----|
| `Colors/Accent/Teal/100` | `#D3FFF6` |
| `Colors/Accent/Teal/200` | `#94F7E4` |
| `Colors/Accent/Teal/300` | `#5AE5D0` |
| `Colors/Accent/Teal/400` | `#2AD1BC` |
| `Colors/Accent/Teal/500` | `#0FBAA7` |
| `Colors/Accent/Teal/600` | `#099185` |
| `Colors/Accent/Teal/700` | `#0B736B` |
| `Colors/Accent/Teal/800` | `#0F615C` |
| `Colors/Accent/Teal/900` | `#104D48` |
| `Colors/Accent/Teal/1000` | `#032B2A` |

#### Green

| Token | Hex |
|-------|-----|
| `Colors/Accent/Green/100` | `#DAFFF0` |
| `Colors/Accent/Green/200` | `#ABF6D7` |
| `Colors/Accent/Green/300` | `#6EE4B0` |
| `Colors/Accent/Green/400` | `#3CCF8E` |
| `Colors/Accent/Green/500` | `#21BE79` |
| `Colors/Accent/Green/600` | `#1C9F64` |
| `Colors/Accent/Green/700` | `#197F52` |
| `Colors/Accent/Green/800` | `#1C6A48` |
| `Colors/Accent/Green/900` | `#13422E` |
| `Colors/Accent/Green/1000` | `#1C352A` |

#### Lime

| Token | Hex |
|-------|-----|
| `Colors/Accent/Lime/100` | `#E9FFC6` |
| `Colors/Accent/Lime/200` | `#C5E992` |
| `Colors/Accent/Lime/300` | `#A3D45E` |
| `Colors/Accent/Lime/400` | `#82BA36` |
| `Colors/Accent/Lime/500` | `#70A726` |
| `Colors/Accent/Lime/600` | `#59881A` |
| `Colors/Accent/Lime/700` | `#53791E` |
| `Colors/Accent/Lime/800` | `#3D5A17` |
| `Colors/Accent/Lime/900` | `#2A3817` |
| `Colors/Accent/Lime/1000` | `#1E2514` |

#### Blue

| Token | Hex |
|-------|-----|
| `Colors/Accent/Blue/100` | `#E8F1FF` |
| `Colors/Accent/Blue/200` | `#BED7FF` |
| `Colors/Accent/Blue/300` | `#76ADFF` |
| `Colors/Accent/Blue/400` | `#4990FF` |
| `Colors/Accent/Blue/500` | `#2E7EFF` |
| `Colors/Accent/Blue/600` | `#166CFC` |
| `Colors/Accent/Blue/700` | `#0B58DF` |
| `Colors/Accent/Blue/800` | `#004CC9` |
| `Colors/Accent/Blue/900` | `#0D2E67` |
| `Colors/Accent/Blue/1000` | `#192639` |

#### Purple

| Token | Hex |
|-------|-----|
| `Colors/Accent/Purple/100` | `#EFEBFF` |
| `Colors/Accent/Purple/200` | `#D6CDFC` |
| `Colors/Accent/Purple/300` | `#A89AF3` |
| `Colors/Accent/Purple/400` | `#8E7BEC` |
| `Colors/Accent/Purple/500` | `#7D6BE3` |
| `Colors/Accent/Purple/600` | `#7765D6` |
| `Colors/Accent/Purple/700` | `#5D4CBF` |
| `Colors/Accent/Purple/800` | `#4F3FA9` |
| `Colors/Accent/Purple/900` | `#2C2457` |
| `Colors/Accent/Purple/1000` | `#242137` |

#### Yellow

| Token | Hex |
|-------|-----|
| `Colors/Accent/Yellow/100` | `#FFF6D0` |
| `Colors/Accent/Yellow/200` | `#F7E296` |
| `Colors/Accent/Yellow/300` | `#F3C63E` |
| `Colors/Accent/Yellow/400` | `#DEA907` |
| `Colors/Accent/Yellow/500` | `#C89506` |
| `Colors/Accent/Yellow/600` | `#AA7B00` |
| `Colors/Accent/Yellow/700` | `#896400` |
| `Colors/Accent/Yellow/800` | `#745404` |
| `Colors/Accent/Yellow/900` | `#493708` |
| `Colors/Accent/Yellow/1000` | `#2D291A` |

#### Orange

| Token | Hex |
|-------|-----|
| `Colors/Accent/Orange/100` | `#FFF2EA` |
| `Colors/Accent/Orange/200` | `#FFDCC5` |
| `Colors/Accent/Orange/300` | `#FFBB8D` |
| `Colors/Accent/Orange/400` | `#FF9652` |
| `Colors/Accent/Orange/500` | `#EF7A30` |
| `Colors/Accent/Orange/600` | `#E55E0E` |
| `Colors/Accent/Orange/700` | `#BA5305` |
| `Colors/Accent/Orange/800` | `#8E3D0C` |
| `Colors/Accent/Orange/900` | `#732F09` |
| `Colors/Accent/Orange/1000` | `#421903` |

#### Magenta

| Token | Hex |
|-------|-----|
| `Colors/Accent/Magenta/100` | `#FFE5F5` |
| `Colors/Accent/Magenta/200` | `#FFCAEA` |
| `Colors/Accent/Magenta/300` | `#FD89CF` |
| `Colors/Accent/Magenta/400` | `#E862B3` |
| `Colors/Accent/Magenta/500` | `#D74FA0` |
| `Colors/Accent/Magenta/600` | `#C93D8F` |
| `Colors/Accent/Magenta/700` | `#A53679` |
| `Colors/Accent/Magenta/800` | `#8C2F67` |
| `Colors/Accent/Magenta/900` | `#492038` |
| `Colors/Accent/Magenta/1000` | `#381F2E` |

#### Red

| Token | Hex |
|-------|-----|
| `Colors/Accent/Red/100` | `#FFEBEA` |
| `Colors/Accent/Red/200` | `#FFC9C6` |
| `Colors/Accent/Red/300` | `#FE8780` |
| `Colors/Accent/Red/400` | `#F75D53` |
| `Colors/Accent/Red/500` | `#F14C40` |
| `Colors/Accent/Red/600` | `#DF392F` |
| `Colors/Accent/Red/700` | `#C32A21` |
| `Colors/Accent/Red/800` | `#A7261D` |
| `Colors/Accent/Red/900` | `#571C17` |
| `Colors/Accent/Red/1000` | `#3C1C1C` |

---

## Semantic Tokens

Collection: `1. Token` · Modes: **Light** / **Dark**  
Values shown as `→ Foundation token` aliases.

### Containers / Background

| Token | Light | Dark |
|-------|-------|------|
| `bgFirst` | → Neutrals/0 - white | → Neutrals/1000 |
| `bgSecond` | → Neutrals/33AD | → Neutrals/930 |
| `bgElevate` | → Neutrals/0 - white | → Neutrals/930 |
| `bgElevateAlt` | → Neutrals/0 - white | → Neutrals/860 |
| `bgHover` | → Neutrals/100AD | → Neutrals/200AL |
| `bgInverse` | → Neutrals/1000 | → Neutrals/0 - white |
| `bgDisabled` | → Neutrals/300AL | → Neutrals/300AD |
| `carved` | → alpha100 | → alpha400 |
| `bgBrand` | → Brand/500 ✦ | → Brand/500 ✦ |
| `bgBrandSecondary` | → Brand/200 | → Brand/900 |
| `bgBrandHover` | → Brand/600 | → Brand/600 |
| `bgBrandSecondaryHover` | → Brand/400 | → Brand/1000 |

### Containers / Plain

| Token | Light | Dark |
|-------|-------|------|
| `plain` | → Neutrals/70 | → Neutrals/785 |
| `plainHover` | → Neutrals/140 | → Neutrals/714 |
| `plainPressed` | → Neutrals/215 | → Neutrals/643 |
| `onPlain` | → Neutrals/1000 | → Neutrals/285 |

### Containers / Alpha

| Token | Light | Dark |
|-------|-------|------|
| `alpha33` | → Neutrals/33AL | → Neutrals/33AD |
| `alpha100` | → Neutrals/100AL | → Neutrals/100AD |
| `alpha200` | → Neutrals/200AL | → Neutrals/200AD |
| `alpha300` | → Neutrals/300AL | → Neutrals/300AD |
| `alpha400` | → Neutrals/400AL | → Neutrals/400AD |
| `alpha500` | → Neutrals/500AL | → Neutrals/500AD |

### Foreground

| Token | Light | Dark |
|-------|-------|------|
| `fgPrimary` | → Neutrals/1000 | → Neutrals/0 - white |
| `fgSecondary` | → Neutrals/860 | → Neutrals/285 |
| `fgTertiary` | → Neutrals/714 | → Neutrals/572 |
| `fgDisabled` | → Neutrals/215 | → Neutrals/860 |
| `fgOnDisabled` | → Neutrals/357 | → Neutrals/714 |
| `fgInverse` | → Neutrals/0 - white | → Neutrals/1000 |
| `fgBrand` | → Brand/500 ✦ | → Brand/500 ✦ |
| `fgBrandSecondary` | → Brand/1000 | → Brand/1000 |
| `fgOnBrand` | → Neutrals/0 - white | → Neutrals/0 - white |
| `fgOnBrandSecondary` | → Neutrals/0 - white | → Neutrals/0 - white |
| `fgOnError` | → Red/1000 | → Red/1000 |
| `fgOnErrorSecondary` | → Red/500 | → Red/500 |

### Borders

| Token | Light | Dark |
|-------|-------|------|
| `bdPrimary` | → Neutrals/300AD | → Neutrals/300AL |
| `bdBrand` | → fgBrand | → fgBrand |
| `bdBrandSecondary` | → fgBrandSecondary | → fgBrandSecondary |
| `bdError` | → Semantic/error | → Semantic/error |
| `bdErrorSecondary` | → Semantic/errorSecondary | → Semantic/errorSecondary |

### Semantic

| Token | Light | Dark |
|-------|-------|------|
| `error` | → Red/500 | → Red/500 |
| `errorSecondary` | → Red/200 | → Red/900 |
| `warning` | → Orange/600 | → Orange/600 |
| `warningSecondary` | → Orange/300 | → Orange/800 |
| `success` | → Green/500 | → Green/500 |
| `successSecondary` | → Green/200 | → Green/800 |

### Effects Tokens

| Token | Light | Dark |
|-------|-------|------|
| `focusBrand` | → Brand/200 | → Brand/800 |
| `focusPlain` | → alpha200 | → alpha200 |

---

## Spacing & Sizing

Collection: `2. String & Number` · Mode: Mode 1

### Spacing

| Token | Value | Notes |
|-------|-------|-------|
| `Spacing/3xsm` | 2px | |
| `Spacing/2xsm` | 4px | |
| `Spacing/xsm` | 8px | |
| `Spacing/sm` | 12px | |
| **`Spacing/md ✦`** | **16px** | Default / screen padding |
| `Spacing/lg` | 20px | |
| `Spacing/xl` | 24px | |
| `Spacing/2xl` | 32px | |
| `Screen Padding/screen-padding` | → Spacing/md ✦ | 16px |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `Radius/input-radius` | 8px | Input fields |
| `Radius/surface-radius` | 16px | Cards, surfaces |
| `Radius/button-radius` | 16px | Buttons |
| `Radius/outer-surface-radius` | 24px | Modals, bottom sheets |
| `Radius/focus-radius` | 100px | Focus ring (pill) |

### Stroke

| Token | Value |
|-------|-------|
| `Stroke/stroke-width` | 1px |
| `Stroke/focus-width` | 2px |

### Opacity

| Token | Value | Usage |
|-------|-------|-------|
| `Opacity/opacity-disabled` | 50% | Disabled state |

---

## Typography

Collection: `3. Typography` · Mode: Baseline  
**Typeface:** Wix Madefor Text (Plain & Brand)  
**Weights:** Regular · Medium · SemiBold · Bold

### Type Scale

| Style | Size | Line Height | Weights Available |
|-------|------|-------------|-------------------|
| `display md` ✦ | 40px | 48px | Medium · SemiBold |
| `display sm` ✦ | 36px | 44px | Medium · SemiBold |
| `title lg` ✦ | 32px | 40px | Medium · SemiBold |
| `title md` ✦ | 28px | 36px | Medium · SemiBold |
| `title sm` ✦ | 24px | 30px | Medium · SemiBold |
| `title xsm` ✦ | 20px | 24px | Medium · SemiBold |
| `text lg` ✦ | 18px | 28px | Regular · Medium · SemiBold |
| `text md` ✦ | 16px | 24px | Regular · Medium · SemiBold |
| `text sm` ✦ | 14px | 20px | Regular · Medium · SemiBold |
| `text xsm` ✦ | 12px | 18px | Regular · Medium · SemiBold |

> ✦ marks the default/primary weight variant for each style (Medium for titles & display, Regular for text).

All styles: letter-spacing = 0, text-case = ORIGINAL.

---

## Effects & Elevation

### Elevation (Drop Shadow)

#### `Elevate/Medium`
Three-layer shadow:

| Layer | Offset Y | Blur | Spread | Color |
|-------|----------|------|--------|-------|
| 1 | 24px | 40px | -16px | rgba(0,0,0, 8%) |
| 2 | 4px | 6px | 0 | rgba(0,0,0, 4%) |
| 3 | 0 | 2px | 0 | rgba(0,0,0, 8%) |

#### `Elevate/High`
Three-layer shadow:

| Layer | Offset Y | Blur | Spread | Color |
|-------|----------|------|--------|-------|
| 1 | 24px | 40px | -16px | rgba(0,0,0, 8%) |
| 2 | 8px | 12px | 0 | rgba(0,0,0, 12%) |
| 3 | 0 | 2px | 0 | rgba(0,0,0, 8%) |

### Focus Rings (Spread Shadow)

| Style | Spread | Color |
|-------|--------|-------|
| `Focus/Brand` | 4px | `#BACFFF` (Brand/200) |
| `Focus/Destructive` | 4px | `#FFC9C6` (Red/200) |
| `Focus/Plain` | 4px | rgba(172,172,172, 10%) |

---

## Device Config

Collection: `4. Device Config`

| Variable | iOS | Android |
|----------|-----|---------|
| `Screen Width` | 375px | 360px |
| `Screen Height` | 812px | 800px |

---

## Component Index

Components defined in `✦ Components` and subpages:

| Component | Page |
|-----------|------|
| Badge, Tag, Separator | ↳ 🧱 Badge & Tag |
| Button (primary, secondary, glass, etc.) | ↳ 🧱 Button |
| Button Group | ↳ 🧱 Button Group |
| Bottom Navigation / Tab Bar | ↳ 🧱 Bottom Navigation |
| Context Menu | ↳ 🧱 Context Menu |
| Dialog, Modal, Bottom Sheet, Dim Panel | ↳ 🧱 Dialog & Modal |
| Header | ↳ 🧱 Header |
| Icon Placeholder | ↳ Icon Placeholder |
| Illustrations (NoScreens, NoLocation, Warning, etc.) | ↳ Ilustration |
| List Item | ↳ List Item |
| Switcher / Tab Switcher | ↳ Tab Switcher |
| InputField (Single, Quadruple, states) | ✦ Components |
| Check Box, Radio Button, Switch | ✦ Components |
| Toast / ToastOverlay | ✦ Components |
| Nav Bar (iOS/Android keyboard-aware) | ✦ Components |
| Status Bar (iOS / Android) | ✦ Components |
| PFP (Profile Picture) | ✦ Components |
| Android Navigation Bars | ✦ Components |

### Component Token Overrides (WAITING FOR SLOTS)

Pending slot assignment — token values defined but not yet bound to a collection slot:

| Token | Value |
|-------|-------|
| `List Item Container/padding-lr` | → Spacing/xsm (8px) |
| `List Item Container/padding-tb` | → Spacing/xsm (8px) |
| `List Item Container/gap` | → Spacing/xsm (8px) |
| `List Item Container/radius` | → outer-surface-radius (24px) |
| `List Item Container/bg` | → alpha300 |
| `Modal & Dialog/padding-lr` | → Spacing/md ✦ (16px) |
| `Modal & Dialog/padding-tb` | → Spacing/md ✦ (16px) |
| `Modal & Dialog/gap` | → Spacing/xl (24px) |
| `Modal & Dialog/radius` | → outer-surface-radius (24px) |
| `Modal & Dialog/bg` | → bgElevate |

---

*Generated from Figma file: Ratius New Base (v0.4)*
