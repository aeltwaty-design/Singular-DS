# Singular Design System - Component Builder Agent

## Overview

**Singular** is a multi-brand, scalable Design System for 3 products:
- **WalaPlus** - Primary: #00CE8B (Green), Secondary: #FF6608 (Orange)
- **WalaOne** - Primary: #755BD8 (Purple), Secondary: #FAC333 (Gold)
- **Doam** - Primary: #07B6A0 (Teal), Secondary: #FF6608 (Orange)

**Tech Stack:** Flutter (Dart)
**Features:** Light/Dark modes, English (LTR) / Arabic (RTL)

---

## YOUR ROLE

You build NEW Flutter components using ONLY:
1. **Design Tokens** (colors, spacing, typography, radius, elevation)
2. **Foundations** (primitives accessed via semantic tokens)
3. **Stable Components** (pre-built reusable components listed below)

---

## STABLE COMPONENTS (Ready to Use)

| Category | Component | Status |
|----------|-----------|--------|
| **Call to Actions** | Button | ✅ Stable |
| | Icon Button | ✅ Stable |
| | Hyperlink | ✅ Stable |
| | Button Group | ✅ Stable |
| | Dock | ✅ Stable |
| **Navigation** | Tab Bar | ✅ Stable |
| **Data Entry** | Input Field | ✅ Stable |
| | Dropdown | ✅ Stable |
| | List Control | ✅ Stable |

All other components are `coming-soon` - do NOT reference them.

---

## CRITICAL RULES

### ❌ NEVER DO
1. **NEVER** use hardcoded colors (e.g., `Color(0xFF...)` or `Colors.red`)
2. **NEVER** use hardcoded spacing (e.g., `SizedBox(height: 16)`)
3. **NEVER** use hardcoded typography (e.g., `fontSize: 14`)
4. **NEVER** use hardcoded radius (e.g., `BorderRadius.circular(12)`)
5. **NEVER** use hardcoded shadows
6. **NEVER** import from `../primitives/` directly - use semantic tokens only
7. **NEVER** create new design tokens - use existing ones
8. **NEVER** use Material Icons → Use Iconsax only
9. **NEVER** use `EdgeInsets.all(16)` → Use `EdgeInsets.all(s.lg)`

### ✅ ALWAYS DO
1. **ALWAYS** import the design system:
   ```dart
   import 'package:singular_design_system/design_system/singular.dart';
   ```
2. **ALWAYS** import Iconsax for icons:
   ```dart
   import 'package:iconsax_flutter/iconsax_flutter.dart';
   ```
3. **ALWAYS** access tokens via BuildContext extensions
4. **ALWAYS** support RTL layout (use `EdgeInsetsDirectional`)
5. **ALWAYS** support Light/Dark mode (tokens handle this automatically)
6. **ALWAYS** use `VGap` / `HGap` widgets for spacing between elements

---

## TOKEN ACCESS PATTERN

```dart
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

class MyComponent extends StatelessWidget {
  const MyComponent({super.key});

  @override
  Widget build(BuildContext context) {
    // 1. Access ALL tokens at the start of build method
    final c = context.colors;       // AppColors
    final s = context.spacing;      // AppSpacing  
    final t = context.typography;   // AppTypography
    final r = context.radius;       // AppRadius
    final e = context.elevation;    // AppElevation
    
    // 2. Use tokens for ALL styling - no hardcoded values
    return Container(
      padding: EdgeInsets.all(s.lg),           // ✅ Token (16px)
      decoration: BoxDecoration(
        color: c.bgSurface,                    // ✅ Token
        borderRadius: r.md,                    // ✅ Token (12px)
        boxShadow: e.level1,                   // ✅ Token
        border: Border.all(color: c.borderDefault), // ✅ Token
      ),
      child: Column(
        children: [
          Text(
            'Title',
            style: t.titleMedium.copyWith(     // ✅ Token
              color: c.textPrimary,            // ✅ Token
            ),
          ),
          const VGap.sm(),                     // ✅ Gap widget (8px)
          Text(
            'Description',
            style: t.bodySmall.copyWith(       // ✅ Token
              color: c.textSecondary,          // ✅ Token
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## BUTTONS (Use Flutter Material - Already Themed)

The design system themes Flutter's Material buttons. Use them directly:

```dart
// Primary action - filled button
ElevatedButton(
  onPressed: () {},
  child: Text('Primary Action'),
);

// Secondary action - outlined button
OutlinedButton(
  onPressed: () {},
  child: Text('Secondary Action'),
);

// Tertiary action - text button
TextButton(
  onPressed: () {},
  child: Text('Tertiary Action'),
);

// With icon
ElevatedButton.icon(
  onPressed: () {},
  icon: Icon(Iconsax.add, size: 18),
  label: Text('Add Item'),
);

// Custom styled (when needed)
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: c.textOnColor,
    foregroundColor: c.brandPrimary,
  ),
  child: Text('Custom'),
);
```

---

## SPACING WIDGETS

Use `VGap` and `HGap` for spacing between elements:

```dart
// Vertical gaps (between rows)
const VGap.xxs()       // 2px
const VGap.xs()        // 4px
const VGap.sm()        // 8px
const VGap.md()        // 12px
const VGap.lg()        // 16px
const VGap.xl()        // 20px
const VGap.xxl()       // 24px
const VGap.section()   // 32px
const VGap.sectionLg() // 48px

// Horizontal gaps (between columns)
const HGap.xxs()       // 2px
const HGap.xs()        // 4px
const HGap.sm()        // 8px
const HGap.md()        // 12px
const HGap.lg()        // 16px
const HGap.xl()        // 20px
const HGap.xxl()       // 24px
```

---

## RTL SUPPORT

Always support Right-to-Left layouts:

```dart
// Check language
final isArabic = Localizations.localeOf(context).languageCode == 'ar';

// Use directional padding (auto-flips for RTL)
EdgeInsetsDirectional.only(start: s.lg, end: s.md)
EdgeInsetsDirectional.symmetric(horizontal: s.lg)

// Conditional text
Text(isArabic ? 'مرحبا' : 'Hello')

// Conditional alignment
CrossAxisAlignment: isArabic ? CrossAxisAlignment.end : CrossAxisAlignment.start
```

---

## COMPONENT STRUCTURE TEMPLATE

```dart
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

/// Brief description of the component
class MyComponent extends StatelessWidget {
  const MyComponent({
    super.key,
    required this.title,
    this.subtitle,
    this.onTap,
  });

  /// The main title text
  final String title;
  
  /// Optional subtitle text
  final String? subtitle;
  
  /// Callback when component is tapped
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(s.lg),
        decoration: BoxDecoration(
          color: c.bgSurface,
          borderRadius: r.md,
          boxShadow: e.level1,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: t.titleMedium.copyWith(color: c.textPrimary)),
            if (subtitle != null) ...[
              const VGap.xs(),
              Text(subtitle!, style: t.bodySmall.copyWith(color: c.textSecondary)),
            ],
          ],
        ),
      ),
    );
  }
}
```

---

## FILE REFERENCES

For complete token details, see:
- `@.cursor/rules/TOKENS.md` - All design tokens with values
- `@.cursor/rules/ICONS.md` - Iconsax icon reference
- `@.cursor/rules/PATTERNS.md` - Common UI patterns

For token source code:
- `@lib/design_system/foundations/tokens/app_colors.dart`
- `@lib/design_system/foundations/tokens/app_spacing.dart`
- `@lib/design_system/foundations/tokens/app_typography.dart`
- `@lib/design_system/foundations/tokens/app_radius.dart`
- `@lib/design_system/foundations/tokens/app_elevation.dart`


