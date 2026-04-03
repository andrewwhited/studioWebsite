# Design Language

## Base Unit
All spatial measurements derive from a **4px base unit**. Typography, spacing, and grid all align to this unit.

---

## Typography

**Typeface:** Active Grotesk (Adobe Fonts)
**Weights:** Light, Regular, Medium
**Scale:** Minor third (1.2), base size 14px (1rem)

| Level     | Size      | Line Height |
|-----------|-----------|-------------|
| Small     | 0.833rem  | 16px        |
| Paragraph | 1rem      | 20px        |
| H6        | 1.2rem    | 24px        |
| H5        | 1.44rem   | 28px        |
| H4        | 1.728rem  | 32px        |
| H3        | 2.074rem  | 36px        |
| H2        | 2.488rem  | 40px        |
| H1        | 2.985rem  | 48px        |

---

## Grid

**Columns:** 12 (favors halves and thirds)
**Gutters:** 24px (6× base unit)
**Responsive:** 12 columns desktop · 6 tablet · 4 mobile

---

## Spacing

All spacing values are multiples of 4px. Use tokens instead of arbitrary values.

| Token         | Value |
|---------------|-------|
| xs            | 4px   |
| sm            | 8px   |
| md            | 12px  |
| lg            | 16px  |
| xl            | 24px  |
| xxl           | 32px  |
| xxxl          | 40px  |
| section       | 48px  |
| large-section | 64px  |

Smaller spacing inside components, larger spacing between sections.
