# Singular Design System

A multi-brand, scalable Design System for **WalaPlus**, **WalaOne**, and **Doam** products on Mobile and Web.

## Features

- 🎨 **Multi-Brand Support** - Three distinct brand themes (WalaPlus, WalaOne, Doam)
- 🌙 **Light & Dark Mode** - Full theme mode support for all brands
- 📝 **Material 3 Typography** - Consistent type scale with automatic font switching
- 🌍 **Localization** - English (LTR) and Arabic (RTL) support
- 📐 **Design Tokens** - Comprehensive token system using ThemeExtension
- 📚 **Documentation** - Widgetbook 3.0+ integration for component catalog

## Architecture

The design system follows a strict token taxonomy separating **Primitives** (raw values) from **Semantics** (usage context):

```
lib/
├── design_system/
│   ├── foundations/
│   │   ├── primitives/
│   │   │   └── color_palettes.dart     # Raw 25-950 color maps
│   │   ├── tokens/
│   │   │   ├── app_colors.dart         # Semantic color tokens
│   │   │   ├── app_typography.dart     # Typography tokens
│   │   │   ├── app_spacing.dart        # Spacing tokens
│   │   │   ├── app_radius.dart         # Border radius tokens
│   │   │   └── app_elevation.dart      # Shadow/elevation tokens
│   │   └── typography/
│   │       └── font_family_helper.dart # Font family utilities
│   ├── themes/
│   │   ├── brand_themes/
│   │   │   ├── walaplus_theme.dart     # WalaPlus brand configuration
│   │   │   ├── walaone_theme.dart      # WalaOne brand configuration
│   │   │   └── doam_theme.dart         # Doam brand configuration
│   │   └── app_theme_factory.dart      # Central theme factory
│   └── singular.dart                    # Library exports
└── widgetbook.dart                      # Documentation
```

## Installation

Add to your `pubspec.yaml`:

```yaml
dependencies:
  singular_design_system:
    path: ../singular  # Or your package path
```

## Quick Start

### 1. Configure Theme in MaterialApp

```dart
import 'package:singular_design_system/design_system/singular.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Use WalaPlus brand themes
      theme: AppThemeFactory.walaPlus.lightTheme,
      darkTheme: AppThemeFactory.walaPlus.darkTheme,
      themeMode: ThemeMode.system,
      home: MyHomePage(),
    );
  }
}
```

### 2. Access Tokens in Widgets

```dart
Widget build(BuildContext context) {
  // Use context extensions for easy access
  final colors = context.colors;
  final typography = context.typography;
  final spacing = context.spacing;
  final radius = context.radius;
  final elevation = context.elevation;

  return Container(
    padding: EdgeInsets.all(spacing.md),
    decoration: BoxDecoration(
      color: colors.bgSurface,
      borderRadius: radius.lg,
      boxShadow: elevation.level2,
    ),
    child: Text(
      'Hello, Singular!',
      style: typography.headlineMedium.copyWith(
        color: colors.textPrimary,
      ),
    ),
  );
}
```

### 3. Switch Brands Dynamically

```dart
// Get theme for any brand and mode
final theme = AppThemeFactory.getTheme(
  brand: SingularBrand.walaOne,
  mode: ThemeMode.dark,
  locale: Locale('ar', 'SA'), // For Arabic typography
);
```

## Token Reference

### Colors

**Semantic Color Tokens:**

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bgPrimary` | White | Slate 950 | Main background |
| `bgSecondary` | Slate 50 | Slate 900 | Secondary background |
| `bgSurface` | White | Slate 800 | Cards, modals |
| `textPrimary` | Slate 900 | Slate 50 | Headings |
| `textSecondary` | Slate 600 | Slate 300 | Body text |
| `brandPrimary` | Brand 500 | Brand 400 | Primary actions |
| `brandSecondary` | Brand 500 | Brand 400 | Secondary actions |

**Brand Colors:**

| Brand | Primary | Secondary |
|-------|---------|-----------|
| WalaPlus | #00CE8B (Green) | #FF6608 (Orange) |
| WalaOne | #755BD8 (Purple) | #FAC333 (Yellow) |
| Doam | #07B6A0 (Teal) | #FF6608 (Orange) |

### Typography

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| `displayLarge` | 57px | Bold | Hero sections |
| `displayMedium` | 45px | Bold | Large headings |
| `displaySmall` | 36px | Bold | Section headers |
| `headlineLarge` | 32px | SemiBold | Page titles |
| `headlineMedium` | 28px | SemiBold | Section headings |
| `headlineSmall` | 24px | SemiBold | Card titles |
| `titleLarge` | 22px | Medium | App bar titles |
| `titleMedium` | 16px | Medium | List titles |
| `titleSmall` | 14px | Medium | Tab labels |
| `labelLarge` | 14px | Medium | Buttons |
| `labelMedium` | 12px | Medium | Form labels |
| `labelSmall` | 11px | Medium | Captions |
| `bodyLarge` | 16px | Regular | Long content |
| `bodyMedium` | 14px | Regular | General text |
| `bodySmall` | 12px | Regular | Secondary text |

**Font Families:**
- **English:** Poppins (Google Fonts)
- **Arabic:** FF Shamel Unique (Local Asset)

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | No spacing |
| `xxs` | 2px | Tight spacing |
| `xs` | 4px | Icon gaps |
| `sm` | 8px | Component padding |
| `md` | 12px | Standard spacing |
| `lg` | 16px | Large padding |
| `xl` | 20px | Section gaps |
| `xxl` | 24px | Component margins |
| `section` | 32px | Section separation |
| `sectionLg` | 48px | Large sections |
| `sectionXl` | 64px | Page sections |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | Sharp corners |
| `xs` | 4px | Subtle rounding |
| `sm` | 8px | Buttons, inputs |
| `md` | 12px | Cards, containers |
| `lg` | 16px | Large cards |
| `xl` | 24px | Modals |
| `full` | 999px | Pills, circles |

### Elevation

| Level | Description | Usage |
|-------|-------------|-------|
| `level0` | None | Flat elements |
| `level1` | Subtle | Hover states |
| `level2` | Medium | Cards, dropdowns |
| `level3` | High | Modals, dialogs |
| `level4` | Highest | Toasts |

## Running Widgetbook

```bash
# Generate Widgetbook files
flutter pub run build_runner build

# Run Widgetbook
flutter run -t lib/widgetbook.dart
```

## Arabic Font Setup

Add FF Shamel Unique font files to `assets/fonts/ff_shamel_unique/`:

- `FFShamelUnique-Regular.ttf`
- `FFShamelUnique-Medium.ttf`
- `FFShamelUnique-SemiBold.ttf`
- `FFShamelUnique-Bold.ttf`

## Best Practices

1. **Always use semantic tokens** - Never use primitive colors directly
2. **Use context extensions** - `context.colors`, `context.typography`, etc.
3. **Respect spacing scale** - Use predefined spacing values
4. **Test both themes** - Verify components in light and dark modes
5. **Test RTL** - Ensure layouts work with Arabic localization

## Contributing

1. Follow the established token taxonomy
2. Implement `copyWith` and `lerp` for all ThemeExtensions
3. Test with all three brands
4. Update Widgetbook documentation

## License

MIT License - See LICENSE file for details.

