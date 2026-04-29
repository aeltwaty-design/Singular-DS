# Component Builder - Task Template

Use this template when requesting the Component Builder agent to create new Flutter components.

---

## Task Request Format

Copy and fill in this template when requesting a new component:

```
## Component Request

### Component Name
[Name of the component, e.g., "StatusCard", "PriceTag", "UserListItem"]

### Description
[Brief description of what the component does and where it will be used]

### Props/Parameters
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| [propName] | [type] | Yes/No | [default] | [description] |

### Variants (if any)
- [ ] Variant 1: [description]
- [ ] Variant 2: [description]

### States
- [ ] Default
- [ ] Hover/Pressed
- [ ] Disabled
- [ ] Loading
- [ ] Error
- [ ] Empty

### Localization
- [ ] Requires Arabic (RTL) support
- [ ] Has translatable text content

### Additional Requirements
[Any specific requirements, constraints, or references]
```

---

## Agent Checklist

Before delivering the component, verify ALL of the following:

### Token Usage (REQUIRED)
- [ ] Colors: Using `context.colors` (e.g., `c.bgSurface`, `c.textPrimary`)
- [ ] Spacing: Using `context.spacing` or `VGap`/`HGap` widgets
- [ ] Typography: Using `context.typography` (e.g., `t.titleMedium`)
- [ ] Radius: Using `context.radius` (e.g., `r.md`)
- [ ] Elevation: Using `context.elevation` (e.g., `e.level1`)

### No Hardcoded Values (REQUIRED)
- [ ] No `Color(0xFF...)` or `Colors.xxx`
- [ ] No `SizedBox(height: 16)` - use `VGap.lg()` instead
- [ ] No `fontSize: 14` - use typography tokens
- [ ] No `BorderRadius.circular(12)` - use radius tokens
- [ ] No inline shadow definitions - use elevation tokens

### Icons (REQUIRED)
- [ ] Using Iconsax icons only (`import 'package:iconsax_flutter/iconsax_flutter.dart'`)
- [ ] NOT using Material Icons

### RTL Support (REQUIRED)
- [ ] Using `EdgeInsetsDirectional` instead of `EdgeInsets` where needed
- [ ] Checking `isArabic` for text content if needed
- [ ] No hardcoded left/right that breaks RTL

### Theme Support (AUTOMATIC)
- [ ] Light/Dark mode handled by tokens (no manual checks needed)

### Code Quality
- [ ] Proper documentation comments
- [ ] Const constructors where possible
- [ ] Proper widget key handling (`super.key`)

---

## Output Requirements

### File Location
```
lib/components/[category]/[component_name].dart
```

Categories:
- `buttons/` - Button variants
- `cards/` - Card components
- `inputs/` - Form inputs
- `lists/` - List items and views
- `feedback/` - Alerts, toasts, dialogs
- `navigation/` - Nav components
- `display/` - Display-only components

### Code Structure
```dart
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

/// [Component description]
/// 
/// Example usage:
/// ```dart
/// ComponentName(
///   prop1: value1,
///   prop2: value2,
/// )
/// ```
class ComponentName extends StatelessWidget {
  const ComponentName({
    super.key,
    required this.requiredProp,
    this.optionalProp,
  });

  /// [Prop description]
  final Type requiredProp;
  
  /// [Prop description]
  final Type? optionalProp;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    // Implementation
  }
}
```

---

## Example Tasks

### Example 1: Simple Component

```
## Component Request

### Component Name
InfoBadge

### Description
A small badge component that displays a label with an optional icon, used for status indicators and tags.

### Props/Parameters
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | String | Yes | - | The text to display |
| icon | IconData | No | null | Optional leading icon |
| variant | BadgeVariant | No | info | Color variant (info, success, warning, error) |
| size | BadgeSize | No | medium | Size variant (small, medium) |

### Variants
- [x] Variant 1: info - Blue color scheme
- [x] Variant 2: success - Green color scheme
- [x] Variant 3: warning - Amber color scheme
- [x] Variant 4: error - Red color scheme

### States
- [x] Default
- [ ] Hover/Pressed (not interactive)
- [ ] Disabled (not applicable)
- [ ] Loading (not applicable)
- [ ] Error (handled by variant)
- [ ] Empty (not applicable)

### Localization
- [x] Requires Arabic (RTL) support
- [x] Has translatable text content

### Additional Requirements
- Should be horizontally compact
- Icon should be 16px
- Small size uses labelSmall typography, medium uses labelMedium
```

---

### Example 2: Interactive Component

```
## Component Request

### Component Name
ActionCard

### Description
A tappable card component with an icon, title, description, and optional trailing arrow. Used for menu items and action lists.

### Props/Parameters
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| icon | IconData | Yes | - | Leading icon |
| title | String | Yes | - | Card title |
| description | String | No | null | Optional description text |
| onTap | VoidCallback | No | null | Tap handler |
| showArrow | bool | No | true | Show trailing arrow icon |
| disabled | bool | No | false | Disable interaction |
| iconBackgroundColor | Color | No | brandPrimaryLight | Icon container background |

### Variants
- [ ] No explicit variants - styling controlled by props

### States
- [x] Default - Normal appearance
- [x] Hover/Pressed - Scale down slightly, change background
- [x] Disabled - Reduced opacity, no interaction
- [ ] Loading - Not applicable
- [ ] Error - Not applicable
- [ ] Empty - Not applicable

### Localization
- [x] Requires Arabic (RTL) support
- [x] Has translatable text content

### Additional Requirements
- Card should have level1 elevation
- Pressed state should scale to 0.98 with 150ms animation
- Icon container should be 48x48 with md radius
- Arrow should flip direction in RTL
```

---

## Quick Reference

### Token Shortcuts
```dart
final c = context.colors;       // Colors
final s = context.spacing;      // Spacing
final t = context.typography;   // Typography
final r = context.radius;       // Border radius
final e = context.elevation;    // Shadows
```

### Common Patterns
```dart
// Spacing
VGap.sm()                       // 8px vertical
HGap.md()                       // 12px horizontal
EdgeInsets.all(s.lg)            // 16px all sides

// Colors
c.bgSurface                     // Card background
c.textPrimary                   // Main text
c.brandPrimary                  // Brand color

// Typography
t.titleMedium.copyWith(color: c.textPrimary)

// Radius
BorderRadius: r.md              // 12px

// Elevation
boxShadow: e.level1             // Subtle shadow
```

### Files to Reference
- `@.cursor/rules/SYSTEM.md` - Core rules
- `@.cursor/rules/TOKENS.md` - All tokens
- `@.cursor/rules/ICONS.md` - Icon reference
- `@.cursor/rules/PATTERNS.md` - Code patterns

