# Design Tokens Reference

All tokens are accessed via BuildContext extensions. Import the design system first:

```dart
import 'package:singular_design_system/design_system/singular.dart';
```

---

## Colors (`context.colors` / `c`)

### Backgrounds

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bgPrimary` | White | Slate 950 | Main app background |
| `bgSecondary` | Slate 50 | Slate 900 | Layered backgrounds |
| `bgSurface` | White | Slate 800 | Cards, modals, elevated surfaces |
| `bgSurfaceSoft` | Slate 25 | Slate 900 | Subtle distinction from surface |
| `bgSurfaceInverse` | Slate 900 | Slate 50 | Inverse backgrounds |

### Text

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `textPrimary` | Slate 900 | Slate 50 | Headings, important text |
| `textSecondary` | Slate 600 | Slate 300 | Body text, descriptions |
| `textDisabled` | Slate 400 | Slate 500 | Inactive, placeholder text |
| `textInverse` | White | Slate 900 | Text on inverse backgrounds |
| `textOnColor` | White | White | Text on brand/colored backgrounds |

### Borders

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `borderWeak` | Slate 100 | Slate 800 | Subtle dividers |
| `borderDefault` | Slate 200 | Slate 700 | Standard borders for inputs, cards |
| `borderStrong` | Slate 300 | Slate 600 | Emphasized borders |
| `borderFocus` | Brand 500 | Brand 400 | Focus rings and states |

### Status Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `statusSuccess` | Green 500 | Green 400 | Success states |
| `statusWarning` | Amber 500 | Amber 400 | Warning states |
| `statusError` | Red 500 | Red 400 | Error states |
| `statusInfo` | Blue 500 | Blue 400 | Info states |

### Status Light Variants (for backgrounds)

| Token | Usage |
|-------|-------|
| `statusSuccessLight` | Success message backgrounds |
| `statusWarningLight` | Warning message backgrounds |
| `statusErrorLight` | Error message backgrounds |
| `statusInfoLight` | Info message backgrounds |

### Brand Colors

| Token | Usage |
|-------|-------|
| `brandPrimary` | Main brand color (500 in light, 400 in dark) |
| `brandSecondary` | Secondary brand color |
| `brandPrimaryLight` | Light variant - hover states, backgrounds (100/200) |
| `brandPrimaryDark` | Dark variant - pressed states, emphasis (700/600) |
| `brandSecondaryLight` | Light secondary variant |
| `brandSecondaryDark` | Dark secondary variant |

### Interactive States

| Token | Usage |
|-------|-------|
| `interactiveHover` | Hover state overlay |
| `interactivePressed` | Pressed state overlay |
| `interactiveDisabled` | Disabled state color |

### Overlays

| Token | Usage |
|-------|-------|
| `overlayLight` | Light overlay (for dark elements) |
| `overlayDark` | Dark overlay (modals, drawers) |

---

## Spacing (`context.spacing` / `s`)

Based on 4px base unit.

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | No spacing |
| `xxs` | 2px | Minimal spacing |
| `xs` | 4px | Extra small gaps (1 base unit) |
| `sm` | 8px | Small gaps (2 base units) |
| `md` | 12px | Medium gaps (3 base units) |
| `lg` | 16px | Standard padding (4 base units) |
| `xl` | 20px | Large padding (5 base units) |
| `xxl` | 24px | Extra large padding (6 base units) |
| `section` | 32px | Section spacing (8 base units) |
| `sectionLg` | 48px | Large section spacing (12 base units) |
| `sectionXl` | 64px | Extra large sections (16 base units) |
| `pageMargin` | 16px | Page edge margins (mobile) |
| `gutter` | 16px | Grid column gaps |

### Helper Methods

```dart
// EdgeInsets helpers
s.all(s.lg)                    // EdgeInsets.all(16)
s.horizontal(s.lg)             // EdgeInsets.symmetric(horizontal: 16)
s.vertical(s.md)               // EdgeInsets.symmetric(vertical: 12)
s.symmetric(horizontal: s.lg, vertical: s.md)

// Pre-built EdgeInsets
s.pageInsets                   // Horizontal page margins
s.cardInsets                   // Standard card padding
s.listItemInsets               // List item padding
s.sectionInsets                // Section vertical spacing
```

---

## Typography (`context.typography` / `t`)

### Display Styles (Large Marketing Text)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `displayLarge` | 57px | Bold | 1.12 | Hero sections, splash screens |
| `displayMedium` | 45px | Bold | 1.16 | Large promotional headings |
| `displaySmall` | 36px | Bold | 1.22 | Section headers in marketing |

### Headline Styles (Page/Section Headings)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `headlineLarge` | 32px | SemiBold | 1.25 | Page titles, main headings |
| `headlineMedium` | 28px | SemiBold | 1.29 | Section headings |
| `headlineSmall` | 24px | SemiBold | 1.33 | Card titles, subsections |

### Title Styles (UI Headings)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `titleLarge` | 22px | Medium | 1.27 | App bar titles, dialog headers |
| `titleMedium` | 16px | Medium | 1.50 | List item titles, nav labels |
| `titleSmall` | 14px | Medium | 1.43 | Small titles, tab labels |

### Label Styles (Buttons, Tags)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `labelLarge` | 14px | Medium | 1.43 | Button text, prominent labels |
| `labelMedium` | 12px | Medium | 1.33 | Form labels, tags |
| `labelSmall` | 11px | Medium | 1.45 | Captions, badges |

### Body Styles (Content Text)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `bodyLarge` | 16px | Regular | 1.50 | Long-form content, articles |
| `bodyMedium` | 14px | Regular | 1.43 | General UI text, descriptions |
| `bodySmall` | 12px | Regular | 1.33 | Secondary text, footnotes |

### Usage

```dart
Text(
  'Headline',
  style: t.headlineLarge.copyWith(
    color: c.textPrimary,
    fontWeight: FontWeight.bold, // Override if needed
  ),
);
```

---

## Radius (`context.radius` / `r`)

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | Sharp corners |
| `xs` | 4px | Subtle rounding, small elements |
| `sm` | 8px | Small components, buttons |
| `md` | 12px | Cards, inputs, medium elements |
| `lg` | 16px | Large cards, containers |
| `xl` | 24px | Modals, large containers |
| `full` | 999px | Pills, circular elements |

### Usage

```dart
BoxDecoration(
  borderRadius: r.md,  // 12px rounded corners
)

// Partial radius
r.topOnly(r.lg)        // Only top corners rounded
r.bottomOnly(r.md)     // Only bottom corners rounded
r.leftOnly(r.sm)       // Only left corners rounded
r.rightOnly(r.sm)      // Only right corners rounded

// Shape borders
r.shapeBorder(r.md)    // RoundedRectangleBorder
r.circleBorder         // CircleBorder
r.stadiumBorder        // StadiumBorder (pill)
```

---

## Elevation (`context.elevation` / `e`)

| Token | Usage |
|-------|-------|
| `level0` | Flat, no shadow |
| `level1` | Subtle - cards, hovering elements |
| `level2` | Medium - dropdowns, popovers |
| `level3` | High - modals, dialogs |
| `level4` | Highest - toasts, notifications |

### Usage

```dart
// Standard shadow
BoxDecoration(
  boxShadow: e.level1,
)

// Brand-colored shadow
BoxDecoration(
  boxShadow: e.brandShadow(c.brandPrimary, 2),  // level 2 with brand tint
)

// Decoration helper
e.decoration(
  level: 2,
  color: c.bgSurface,
  borderRadius: r.md,
)

// Material elevation equivalent
e.materialElevation(2)  // Returns 4.0 for Material widgets
```


