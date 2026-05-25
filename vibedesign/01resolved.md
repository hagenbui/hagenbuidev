# 0×1Resolved — Responsive Pipeline

> **Figma file:** 0×1Resolved - shadcn/ui  
> **Source frames:** Desktop 1440px (`8953:126991`) · Mobile 375px (`9558:192398`)  
> **Page audited:** User / View Only (tables-only page)  
> **Last updated:** 2026-04-08

---

## Breakpoints

| Name | Value | Role |
|------|-------|------|
| `sm` | 375px | Mobile base |
| `md` | 768px | Tablet (inferred) |
| `lg` | 1024px | Desktop threshold |
| `xl` | 1440px | Full desktop canvas |

---

## 1. Layout & Padding

| Property | Desktop | Mobile |
|----------|---------|--------|
| Side padding | 80px | 16px |
| Content max-width | 1280px | 343px |
| Gap between table cards | 24px | 16px |
| Card inner padding | 16px all sides | 16px all sides |

---

## 2. Header

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 64px | 102px |
| Nav | Inline horizontal | Hamburger → drawer |

---

## 3. PageHeader (Entity Info)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 260px | 192px |
| Layout | `flex-row` — logo + name + socials in one line | `flex-col` — logo → name → socials stacked |
| Breadcrumb | Top of PageHeader, full content width | Retained |
| Tab nav | Bottom of PageHeader block | Bottom of PageHeader block |

---

## 4. Tabs (sub-navigation strip)

| Property | Desktop | Mobile |
|----------|---------|--------|
| Strip width | 320px, all items visible | 438px strip in 343px container — overflows |
| Overflow | None | `overflow-x-auto`, scrollbar hidden |
| Left offset | 80px (content-aligned) | 16px |
| Top padding | 24px | 24px |

---

## 5. Section Title + Controls (per table card)

Three table cards on the page: **Active Accounts**, **Legacy Accounts**, **Known Counterparties**.

| Property | Desktop | Mobile |
|----------|---------|--------|
| Layout | `flex-row justify-between` — title left, controls right | `flex-col` — title → search → button |
| Title position | Left, vertically centered | Top |
| Search input width | 320px fixed | `w-full` (311px) |
| Filter/Export button | Hidden or inline-right | Full-width, below search |
| Title row height | 36px | 109px (stacked: 21px title + 36px input + 36px button) |

**Per-card notes:**
- **Active Accounts** (desktop): search input only (filter button hidden)
- **Active Accounts** (mobile): title → search → full-width filter button
- **Legacy Accounts** (desktop): search input only
- **Legacy Accounts** (mobile): title → search only (no filter button)
- **Known Counterparties** (desktop): search input only
- **Known Counterparties** (mobile): title → search → full-width filter button

---

## 6. Data Tables

> **Rule: the table itself does not change at all across breakpoints.** Same columns, same fixed widths, same cell height. Only the wrapper becomes scrollable on mobile.

| Property | Desktop | Mobile |
|----------|---------|--------|
| Visible container width | 1248px | 311px |
| Horizontal overflow | None | `overflow-x-auto` |
| Scrollbar | None | 6px indicator at bottom |
| Table markup | Unchanged | Unchanged — no responsive modifications |
| Cell height | 40px | 40px |

**Active Accounts — fixed column widths (desktop = mobile):**

| Col | Label | Width |
|-----|-------|-------|
| Checkbox | — | 28px |
| 1 | Name/Address | 169px |
| 2 | Short metric | 83px |
| 3 | Metric A | 188px |
| 4 | Metric B | 153px |
| 5 | Metric C | 188px |
| 6 | Metric D | 188px |
| 7 | Metric E | 79px |
| 8 | Action/Detail | 171px |

**Legacy Accounts — fixed column widths (desktop = mobile):**

| Col | Label | Width |
|-----|-------|-------|
| 1 | Name/Address | 275px |
| 2 | Metric A | 83px |
| 3 | Metric B | 113px |
| 4 | Metric C | 135px |
| 5 | Metric D | 215px |
| 6 | Metric E | 185px |
| 7 | Metric F | 135px |
| 8 | Metric G | 107px |

**Known Counterparties — fixed column widths (desktop = mobile):**

| Col | Label | Width |
|-----|-------|-------|
| 1 | Name | 353px |
| 2 | Metric A | 353px |
| 3 | Metric B | 353px |
| 4 | Detail/Action | 190px |

---

## 7. Pagination

| Property | Desktop | Mobile |
|----------|---------|--------|
| Layout | `flex justify-between` | `flex justify-center` |
| "Showing X–Y of Z" text | Visible left | Hidden |
| Rows-per-page selector | Visible left | Hidden |
| Numbered page buttons | Visible | Hidden |
| Prev / Next | Visible right | Visible, centered |
| Gap from table bottom | 16px (within card) | 16px |

---

## 8. Footer

| Property | Desktop | Mobile |
|----------|---------|--------|
| Height | 85px | 128px (content stacks) |
| Padding | 80px horizontal | 16px horizontal |

---

## Quick Implementation Checklist

- [ ] Page wrapper: `px-4 xl:px-20` (16px → 80px)
- [ ] Content max-width: `max-w-[1280px] mx-auto`
- [ ] Header height: `h-16 md:h-[102px]` + hamburger trigger on mobile
- [ ] PageHeader: `flex flex-col lg:flex-row` with entity info
- [ ] Tab strip: `flex overflow-x-auto scrollbar-none` (no breakpoint — always scrollable, just never overflows on desktop)
- [ ] Section controls: `flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between`
- [ ] Search input: `w-full lg:w-[320px]`
- [ ] Filter button: `w-full lg:w-auto` (show/hide per card per breakpoint)
- [ ] Table wrapper: `overflow-x-auto`
- [ ] Table scrollbar: show 6px bottom indicator on mobile
- [ ] Gap between cards: `gap-4 lg:gap-6`
- [ ] Pagination row: `flex justify-center lg:justify-between`
- [ ] Pagination — hide on mobile: rows-per-page, page number buttons, "Showing" text
- [ ] Footer padding: `px-4 lg:px-20`

---

## Pages

### Page: Can Edit / Add (`10567:220205`)

> Desktop source: 1440×1161px · Mobile: apply pipeline rules (no dedicated mobile frame)

#### What's different from the pipeline baseline

| Element | Baseline (User / View Only) | This page |
|---------|----------------------------|-----------|
| Sub-tabs strip | 320px | **438px** — all tabs visible on desktop, same `overflow-x-auto` on mobile |
| Controls row | Title left + search right | **No title** — only search (320px) + Add button (89px), right-aligned as a group |
| Table row height | 40px | **54px** — keep unchanged across all breakpoints |
| Number of table cards | 3 | **1** (Active Accounts only) |
| Add button | None | Present — treat same as filter button on mobile (full-width) |

#### Controls row

| Property | Desktop | Mobile |
|----------|---------|--------|
| Layout | `flex-row justify-end` — search + Add button right-aligned, no title | `flex-col` — search full-width → Add button full-width |
| Search width | 320px | `w-full` |
| Add button width | 89px | `w-full` |
| Controls row height | 36px | 80px (36px search + 8px gap + 36px button) |

#### Table — fixed column widths (desktop = mobile)

| Col | Width |
|-----|-------|
| 1 (select/checkbox area) | 109px |
| 2 | 169px |
| 3 | 169px |
| 4 (wide data col) | 506px |
| 5 | 83px |
| 6 | 105px |
| 7 (action) | 107px |

**Total table width:** 1248px · **Row height:** 40px header / 54px data rows

#### Implementation checklist (Can Edit / Add)

- [ ] Sub-tabs: `flex overflow-x-auto scrollbar-none` (438px strip — same rule, overflows on mobile)
- [ ] Controls row: `flex flex-col gap-2 lg:flex-row lg:justify-end` (no title, right-aligned on desktop)
- [ ] Search input: `w-full lg:w-[320px]`
- [ ] Add button: `w-full lg:w-auto`
- [ ] Table row height: `h-[54px]` for data rows — do not change at any breakpoint
- [ ] Table wrapper: `overflow-x-auto`
- [ ] Pagination: `flex justify-center lg:justify-between`
- [ ] Pagination — hide on mobile: rows-per-page, page numbers, "Showing" text
