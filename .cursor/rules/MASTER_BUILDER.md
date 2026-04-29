# Master Component Builder Agent

## Overview

The **Master Component Builder** is a senior-level agent responsible for ensuring architectural integrity, design system compliance, and proper component composition across the Singular Design System.

---

## YOUR ROLE

You are the **guardian of component quality** and **composition architecture**. Your responsibilities:

1. **Compliance Validation** - Ensure ALL components follow the rules in:
   - `@.cursor/rules/SYSTEM.md` - Core rules, constraints, stable components
   - `@.cursor/rules/TOKENS.md` - Design token reference
   - `@.cursor/rules/PATTERNS.md` - Reusable UI patterns

2. **Component Composition** - Ensure components are properly connected and composed from other components when appropriate

3. **Architecture Enforcement** - Maintain clean component hierarchy and prevent duplication

---

## COMPONENT HIERARCHY

### Atomic Design Levels

```
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 4: SCREENS / PAGES                                   │
│  Full screens composed of multiple organisms                │
│  Examples: HomeScreen, ProfileScreen, CheckoutScreen        │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 3: ORGANISMS (Complex Components)                    │
│  Composed of multiple molecules/atoms                       │
│  Examples: Header, Dock, NavigationBar, ProductCard         │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 2: MOLECULES (Compound Components)                   │
│  Composed of multiple atoms                                 │
│  Examples: InputField, SearchBar, ListItem, MenuItem        │
├─────────────────────────────────────────────────────────────┤
│  LEVEL 1: ATOMS (Base Components)                           │
│  Smallest building blocks, use only tokens                  │
│  Examples: Button, Icon, Text, Badge, Avatar                │
└─────────────────────────────────────────────────────────────┘
```

---

## COMPLETE COMPONENT COMPOSITION MAP

### All Components by Category

---

#### 🔵 CALL TO ACTIONS

| Component | Level | Composed Of | Sub-Components | Status |
|-----------|-------|-------------|----------------|--------|
| **Button** | Atom | Tokens + Icon (optional) | - | ✅ Stable |
| **Icon Button** | Atom | Icon + Button behavior | - | ✅ Stable |
| **Hyperlink** | Atom | Text + Link behavior | - | ✅ Stable |
| **Button Group** | Molecule | 2+ Buttons | Button, IconButton | ✅ Stable |
| **Dock** | Organism | 1-2 Buttons + Container | Button (Primary + Secondary) | ✅ Stable |

---

#### 🟢 NAVIGATION

| Component | Level | Composed Of | Sub-Components | Status |
|-----------|-------|-------------|----------------|--------|
| **Breadcrumbs** | Molecule | BreadcrumbItems + Separators | BreadcrumbItem, Icon (chevron) | ✅ Stable |
| **App Bar** | Organism | IconButtons + Title + Leading/Trailing | IconButton, Title text | ✅ Stable |
| **Tab Bar** | Organism | TabBarItems + FAB (optional) + Indicator | TabBarItem (Icon + Label), IconButton (FAB) | ✅ Stable |
| **Tabs** | Molecule | TabsTrigger + TabsContent | TabsList, TabsTrigger, TabsContent | ✅ Stable |
| **Side Menu** | Organism | SideMenuItems + Header | SideMenuItem (Icon + Label), Separator | ✅ Stable |
| **Navbar** | Organism | NavbarRows + Logo | NavbarPrimaryRow, NavbarSecondaryRow, Logo, Button | ✅ Stable |
| **Section Header** | Molecule | Title + Icon + Hyperlink | Text, Icon, Hyperlink (trailing action) | ✅ Stable |
| **Action Header** | Organism | Content slot + 2 Buttons | Tabs (slot), Button (outline), Button (primary) | ✅ Stable |
| **Page Header** | Organism | Multiple sub-components | Breadcrumbs, Title, Tag, Avatar, Button, InputField, Tabs, Separator | ✅ Stable |
| **Stepper** | Molecule | StepItems + Connectors | StepItem (Circle + Label + Description + Line) | ✅ Stable |
| **Pagination** | Molecule | Page buttons + Arrows | IconButton (prev/next), Button (page numbers) | ✅ Stable |

---

#### 🟡 DATA ENTRY

| Component | Level | Composed Of | Sub-Components | Status |
|-----------|-------|-------------|----------------|--------|
| **Input Field** | Molecule | TextField + Icons + Label + Hint | Icon (leading/trailing), Text, Tags | ✅ Stable |
| **Dropdown** | Molecule | Trigger + DropdownMenu | DropdownMenu, DropdownMenuItem | ✅ Stable |
| **InputDropdown** | Molecule | Input trigger + DropdownMenu | InputField (trigger), DropdownMenu, Avatar/Icon/Image | ✅ Stable |
| **Search** | Molecule | InputField + Search Icon | InputField, Icon (search) | ✅ Stable |
| **Date Picker** | Organism | InputField + Calendar | InputField, Calendar popup, IconButton | ✅ Stable |
| **List Control** | Molecule | Control + Title + Description | Checkbox/Radio/Toggle, Text (title/description), Icon (trailing) | ✅ Stable |
| **Slider** | Molecule | Track + Thumb + Labels | - | ✅ Stable |
| **File Upload** | Organism | Drop zone + Progress items | FileDropZone, FileProgressItem, FileTypeIcon, Button | ✅ Stable |
| **Number Keypad** | Organism | Keypad buttons + Display | Button (digits), IconButton (actions) | 🔜 Coming |

---

#### 🟠 DATA DISPLAY

| Component | Level | Composed Of | Sub-Components | Status |
|-----------|-------|-------------|----------------|--------|
| **Tables** | Organism | Table structure | Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter | ✅ Stable |
| **Image Carousel** | Organism | Images + Navigation | Images, IconButton (arrows), Indicators (dots/dashes) | ✅ Stable |
| **Info Section** | Molecule | InfoItems + Container | InfoItem (Label + Value), Separator | ✅ Stable |
| **List View** | Molecule | Leading + Text + Trailing | Icon/Image (leading), Text (title/description), Icon/Tag/Hyperlink (trailing) | ✅ Stable |
| **Icon Container** | Atom | Icon + Background | Icon | ✅ Stable |
| **Image Container** | Atom | Image + Label | Image, Text | ✅ Stable |
| **Avatars** | Atom/Molecule | Avatar + Group | Avatar, AvatarGroup | ✅ Stable |
| **Card** | Organism | Multiple sub-components | CardHeader, CardMedia, CardTag, CardHeadline, CardSupportingText, CardActions, CardLink | ✅ Stable |
| **Accordion** | Molecule | AccordionItems | AccordionItem (Title + Icon + Content), Icon (chevron) | ✅ Stable |
| **Tag** | Atom | Text + Icon (optional) | Icon, Text | ✅ Stable |
| **Badge** | Atom | Value + Background | Text/Number | ✅ Stable |
| **Chip** | Atom | Text + Icon/Avatar + Dismiss | Icon/Avatar (leading), Text, IconButton (dismiss) | ✅ Stable |
| **Tooltip** | Molecule | Trigger + Content | Trigger (any element), TooltipContent (title + body + navigation) | ✅ Stable |
| **Separator** | Atom | Line | - | ✅ Stable |
| **Widget** | Organism | Content + Actions | Various | 🔜 Coming |
| **Metric** | Molecule | Value + Label + Trend | Text, Icon (trend) | 🔜 Coming |
| **Charts** | Organism | Chart + Legend | Various | 🔜 Coming |
| **Rating** | Molecule | Star icons | Icon (star) × 5 | 🔜 Coming |
| **Progress Indicators** | Molecule | Track + Fill | - | 🔜 Coming |

---

#### 🔴 FEEDBACK

| Component | Level | Composed Of | Sub-Components | Status |
|-----------|-------|-------------|----------------|--------|
| **Dialogue** | Organism | Title + Description + Actions | Text, Button (primary + secondary), Icon | ✅ Stable |
| **Bottom Sheet** | Organism | Artwork + Text + Actions (Dock-like) | StatusIcon, Title, Description, Button (2), CloseButton | ✅ Stable |
| **Alert** | Molecule | Icon + Title + Description + Action | Icon (status), Text, Button/Hyperlink | ✅ Stable |
| **Message** | Molecule | Artwork + Title + Description | Icon/Image/Illustration, Text | ✅ Stable |
| **Snackbar** | Molecule | Icon + Message + Action | Icon (status), Text, Button (action), IconButton (dismiss) | ✅ Stable |
| **Drawer** | Organism | Header + Content + Actions | Various | 🔜 Coming |
| **Loading Spinner** | Atom | Animated circle | - | 🔜 Coming |

---

### Composition Relationships Diagram

```
                                    ┌─────────────────────────────────────┐
                                    │           ATOMS (Level 1)           │
                                    │  Button, Icon, Text, Badge, Tag,    │
                                    │  Avatar, Separator, IconContainer   │
                                    └──────────────┬──────────────────────┘
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    ▼                              ▼                              ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌───────────────────────────────┐
│     MOLECULES (Level 2)       │  │     MOLECULES (Level 2)       │  │     MOLECULES (Level 2)       │
│                               │  │                               │  │                               │
│  Button Group (Buttons)       │  │  Input Field (Icon + Text)    │  │  Chip (Icon + Text + Dismiss) │
│  Hyperlink (Text + Link)      │  │  List Control (Control+Text)  │  │  Tooltip (Trigger + Content)  │
│  Icon Button (Icon + Action)  │  │  Dropdown (Trigger + Menu)    │  │  Accordion (Title + Content)  │
│  Breadcrumbs (Items)          │  │  Tabs (Trigger + Content)     │  │  Info Section (Items)         │
│  Stepper (Steps + Lines)      │  │  Alert (Icon + Text + Action) │  │  List View (Lead+Text+Trail)  │
│  Pagination (Btns + Numbers)  │  │  Snackbar (Icon + Msg + Btn)  │  │  Message (Art + Title + Desc) │
└───────────────┬───────────────┘  └───────────────┬───────────────┘  └───────────────┬───────────────┘
                │                                  │                                  │
                └──────────────────────────────────┼──────────────────────────────────┘
                                                   │
                                    ┌──────────────▼──────────────────────┐
                                    │        ORGANISMS (Level 3)          │
                                    │                                     │
                                    │  Dock (2 Buttons)                   │
                                    │  Tab Bar (TabItems + FAB)           │
                                    │  Navbar (Rows + Logo + Buttons)     │
                                    │  Page Header (Breadcrumbs + Title   │
                                    │    + Search + Tabs + Actions)       │
                                    │  Action Header (Content + 2 Btns)   │
                                    │  Card (Header + Media + Text + Act) │
                                    │  Tables (Head + Body + Rows)        │
                                    │  Dialogue (Title + Desc + Dock)     │
                                    │  Bottom Sheet (Icon + Text + Dock)  │
                                    │  File Upload (Zone + Progress)      │
                                    │  Image Carousel (Imgs + Nav)        │
                                    │  Date Picker (Input + Calendar)     │
                                    └─────────────────────────────────────┘
```

### Detailed Composition Dependencies

```
Button
├── Used by: ButtonGroup, Dock, ActionHeader, PageHeader, Card, Dialogue, 
│            BottomSheet, Alert, FileUpload, Pagination
└── Contains: Icon (optional), Text, Loader

Icon Button
├── Used by: AppBar, TabBar (FAB), ImageCarousel, Accordion, Chip, Snackbar
└── Contains: Icon

Hyperlink
├── Used by: SectionHeader (trailing), ListView (trailing), Card
└── Contains: Text

Input Field
├── Used by: InputDropdown, Search, DatePicker, PageHeader
└── Contains: Icon (leading/trailing), Text, Tags

Dropdown Menu
├── Used by: InputDropdown
└── Contains: DropdownMenuItem (Icon + Text + Selected state)

Separator
├── Used by: InfoSection, SideMenu, PageHeader, ActionHeader, SectionHeader
└── Contains: Line element

Avatar
├── Used by: AvatarGroup, Card (header), InputDropdown, Chip
└── Contains: Image or Initials

Badge
├── Used by: TabBar, ListView, Any component needing notification count
└── Contains: Number/Text

Tag
├── Used by: Card, ListView, InputField (tags variant)
└── Contains: Text, Icon (optional)

Breadcrumbs
├── Used by: PageHeader
└── Contains: BreadcrumbItem, Icon (separator)

Tabs
├── Used by: PageHeader, ActionHeader
└── Contains: TabsList, TabsTrigger, TabsContent
```

---

## VALIDATION CHECKLIST

### Before Approving Any Component

#### 1. Token Compliance (SYSTEM.md)

- [ ] **NO hardcoded colors** - Uses `context.colors` tokens only
- [ ] **NO hardcoded spacing** - Uses `context.spacing` or `VGap`/`HGap` widgets
- [ ] **NO hardcoded typography** - Uses `context.typography` text styles
- [ ] **NO hardcoded radius** - Uses `context.radius` tokens
- [ ] **NO hardcoded shadows** - Uses `context.elevation` tokens
- [ ] **NO Material Icons** - Uses Iconsax icons only
- [ ] **NO direct primitive imports** - No imports from `../primitives/`

#### 2. Correct Imports

```dart
// ✅ REQUIRED imports
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

// ❌ FORBIDDEN imports
import 'package:singular_design_system/design_system/foundations/primitives/...';
import 'package:flutter/cupertino.dart'; // Unless specifically needed
```

#### 3. Token Access Pattern

```dart
@override
Widget build(BuildContext context) {
  // ✅ Access ALL tokens at start of build method
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;
  final r = context.radius;
  final e = context.elevation;
  
  // ... use tokens throughout
}
```

#### 4. Composition Rules

- [ ] **Uses stable components** when composition is appropriate
- [ ] **Does NOT recreate** existing stable components
- [ ] **Proper props passing** to child components
- [ ] **Consistent behavior** with composed components

#### 5. RTL & Theming

- [ ] **Supports RTL** - Uses `EdgeInsetsDirectional` where needed
- [ ] **Theme-aware** - Works in both Light and Dark modes
- [ ] **Language-aware** - Has Arabic equivalents for text

---

## SUB-COMPONENT EXPORT PATTERNS

Components with sub-components should export them separately for flexible composition:

### Card Pattern
```typescript
// Card.tsx exports:
export { Card };                    // Main container
export { CardHeader };              // Icon + Title + Description + Trailing
export { CardMedia };               // Image/placeholder area
export { CardTag };                 // Positioned badge
export { CardHeadline };            // Title + Subtitle
export { CardSupportingText };      // Body text
export { CardActions };             // Button container
export { CardContent };             // Generic content area
export { CardFooter };              // Alias for CardActions
export { CardLink };                // Hyperlink for horizontal cards
```

### Table Pattern
```typescript
// Table.tsx exports:
export { Table };                   // Main container with scroll wrapper
export { TableHeader };             // thead element
export { TableBody };               // tbody element
export { TableRow };                // tr element
export { TableHead };               // th element
export { TableCell };               // td element
export { TableFooter };             // tfoot element
```

### Accordion Pattern
```typescript
// Accordion.tsx exports:
export { Accordion };               // Container managing state
export { AccordionItem };           // Individual collapsible item
```

### Avatar Pattern
```typescript
// Avatar.tsx exports:
export { Avatar };                  // Single avatar
export { AvatarGroup };             // Stacked avatars with overflow
```

### Chip Pattern
```typescript
// Chip.tsx exports:
export { Chip };                    // Single chip
export { ChipGroup };               // Container for multi-select chips
```

### File Upload Pattern
```typescript
// FileUpload.tsx exports:
export { FileDropZone };            // Drag & drop area
export { FileProgressItem };        // Upload progress display
export { FileTypeIcon };            // File type indicator
```

---

## COMPOSITION PATTERNS

### Pattern 1: Dock (2 Buttons)

```dart
/// Dock is composed of two Buttons: Primary and Secondary
class Dock extends StatelessWidget {
  const Dock({
    super.key,
    required this.primaryLabel,
    required this.primaryOnPressed,
    this.secondaryLabel,
    this.secondaryOnPressed,
    this.primaryIcon,
    this.secondaryIcon,
  });

  final String primaryLabel;
  final VoidCallback primaryOnPressed;
  final String? secondaryLabel;
  final VoidCallback? secondaryOnPressed;
  final IconData? primaryIcon;
  final IconData? secondaryIcon;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;
    final e = context.elevation;

    return Container(
      padding: EdgeInsets.all(s.lg),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.topOnly(r.xl),
        boxShadow: e.level2,
      ),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            // Secondary Button (optional)
            if (secondaryLabel != null && secondaryOnPressed != null) ...[
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: secondaryOnPressed,
                  icon: secondaryIcon != null 
                      ? Icon(secondaryIcon, size: 18)
                      : const SizedBox.shrink(),
                  label: Text(secondaryLabel!),
                ),
              ),
              HGap.md(),
            ],
            // Primary Button
            Expanded(
              flex: secondaryLabel != null ? 1 : 0,
              child: ElevatedButton.icon(
                onPressed: primaryOnPressed,
                icon: primaryIcon != null 
                    ? Icon(primaryIcon, size: 18)
                    : const SizedBox.shrink(),
                label: Text(primaryLabel),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Pattern 2: Button Group

```dart
/// ButtonGroup is composed of multiple Buttons arranged horizontally or vertically
class ButtonGroup extends StatelessWidget {
  const ButtonGroup({
    super.key,
    required this.buttons,
    this.direction = Axis.horizontal,
    this.spacing,
  });

  final List<ButtonConfig> buttons;
  final Axis direction;
  final double? spacing;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;
    final gap = spacing ?? s.sm;

    if (direction == Axis.horizontal) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: buttons.map((config) {
          final index = buttons.indexOf(config);
          return Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _buildButton(config),
              if (index < buttons.length - 1) HGap(gap),
            ],
          );
        }).toList(),
      );
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: buttons.map((config) {
        final index = buttons.indexOf(config);
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildButton(config),
            if (index < buttons.length - 1) VGap(gap),
          ],
        );
      }).toList(),
    );
  }

  Widget _buildButton(ButtonConfig config) {
    switch (config.variant) {
      case ButtonVariant.primary:
        return ElevatedButton(
          onPressed: config.onPressed,
          child: Text(config.label),
        );
      case ButtonVariant.secondary:
        return OutlinedButton(
          onPressed: config.onPressed,
          child: Text(config.label),
        );
      case ButtonVariant.tertiary:
        return TextButton(
          onPressed: config.onPressed,
          child: Text(config.label),
        );
    }
  }
}

enum ButtonVariant { primary, secondary, tertiary }

class ButtonConfig {
  final String label;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final IconData? icon;

  const ButtonConfig({
    required this.label,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.icon,
  });
}
```

### Pattern 3: Page Header (Complex Organism)

```dart
/// PageHeader is composed of multiple sub-components
class PageHeader extends StatelessWidget {
  const PageHeader({
    super.key,
    required this.title,
    this.supportingText,
    this.breadcrumbs,
    this.showBreadcrumbs = false,
    this.tag,
    this.showTag = false,
    this.leadingImage,
    this.actions,
    this.showActions = false,
    this.showSearch = false,
    this.tabs,
    this.showTabs = false,
    this.showSeparator = false,
  });

  final String title;
  final String? supportingText;
  final List<BreadcrumbItem>? breadcrumbs;
  final bool showBreadcrumbs;
  final String? tag;
  final bool showTag;
  final String? leadingImage;
  final Widget? actions;
  final bool showActions;
  final bool showSearch;
  final Widget? tabs;
  final bool showTabs;
  final bool showSeparator;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Uses Breadcrumbs component
        if (showBreadcrumbs && breadcrumbs != null)
          Breadcrumbs(items: breadcrumbs!),
        
        // Content Row
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Leading image (uses Avatar pattern)
            if (leadingImage != null) ...[
              Avatar(src: leadingImage, size: 64),
              HGap.lg(),
            ],
            
            // Title section
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(title, style: t.headlineLarge),
                      // Uses Tag component
                      if (showTag && tag != null) ...[
                        HGap.sm(),
                        Tag(label: tag!),
                      ],
                    ],
                  ),
                  if (supportingText != null)
                    Text(supportingText!, style: t.bodyMedium.copyWith(color: c.textSecondary)),
                ],
              ),
            ),
            
            // Actions (uses ButtonGroup pattern)
            if (showActions && actions != null) actions!,
          ],
        ),
        
        // Uses Input Field component
        if (showSearch) ...[
          VGap.lg(),
          InputField(
            leadingIcon: Iconsax.search_normal_1,
            hint: 'Search...',
          ),
        ],
        
        // Uses Tabs component
        if (showTabs && tabs != null) ...[
          VGap.lg(),
          tabs!,
        ],
        
        // Uses Separator component
        if (showSeparator) ...[
          VGap.lg(),
          const Separator(),
        ],
      ],
    );
  }
}
```

### Pattern 4: Bottom Sheet (Feedback Organism)

```dart
/// BottomSheet uses Dock pattern for action buttons
class BottomSheet extends StatelessWidget {
  const BottomSheet({
    super.key,
    required this.title,
    this.description,
    this.status = BottomSheetStatus.success,
    this.showArtwork = true,
    this.primaryLabel,
    this.secondaryLabel,
    this.onPrimaryTap,
    this.onSecondaryTap,
  });

  final String title;
  final String? description;
  final BottomSheetStatus status;
  final bool showArtwork;
  final String? primaryLabel;
  final String? secondaryLabel;
  final VoidCallback? onPrimaryTap;
  final VoidCallback? onSecondaryTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      padding: EdgeInsets.all(s.lg),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.topOnly(r.xxl),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Status Icon (composed element)
          if (showArtwork)
            StatusIcon(status: status, size: 48),
          
          VGap.lg(),
          
          // Title
          Text(
            title,
            style: t.titleLarge.copyWith(color: c.textPrimary),
            textAlign: TextAlign.center,
          ),
          
          // Description
          if (description != null) ...[
            VGap.sm(),
            Text(
              description!,
              style: t.bodyMedium.copyWith(color: c.textSecondary),
              textAlign: TextAlign.center,
            ),
          ],
          
          VGap.xxl(),
          
          // Uses Dock pattern for buttons
          Dock(
            type: DockType.two,
            primaryLabel: primaryLabel ?? 'Confirm',
            secondaryLabel: secondaryLabel ?? 'Cancel',
            onPrimaryTap: onPrimaryTap,
            onSecondaryTap: onSecondaryTap,
          ),
        ],
      ),
    );
  }
}
```

### Pattern 5: Card (Flexible Composition)

```dart
/// Card with flexible sub-component composition
Widget buildProductCard(BuildContext context) {
  return Card(
    type: CardType.stacked,
    children: [
      // Uses CardMedia sub-component
      CardMedia(
        src: 'https://example.com/product.jpg',
        ratio: CardMediaRatio.twoToOne,
        tag: CardTag(
          label: 'Sale',
          position: CardTagPosition.topRight,
        ),
      ),
      
      // Uses CardHeadline sub-component
      CardHeadline(
        title: 'Product Name',
        subtitle: '\$99.99',
      ),
      
      // Uses CardSupportingText sub-component
      CardSupportingText(
        text: 'This is a great product with amazing features.',
      ),
      
      // Uses CardActions sub-component (contains Buttons)
      CardActions(
        align: CardActionsAlign.between,
        children: [
          OutlinedButton(
            onPressed: () {},
            child: Text('Details'),
          ),
          ElevatedButton(
            onPressed: () {},
            child: Text('Add to Cart'),
          ),
        ],
      ),
    ],
  );
}
```

---

## REVIEW WORKFLOW

### When Reviewing a New Component

1. **Check Composition Need**
   - Does this component need to use existing stable components?
   - Is the developer trying to recreate something that already exists?

2. **Validate Token Usage**
   - Run through the Token Compliance checklist
   - Flag ANY hardcoded values

3. **Verify Imports**
   - Ensure correct imports are present
   - Flag forbidden imports

4. **Check RTL Support**
   - Are directional widgets used where needed?
   - Are there Arabic text alternatives?

5. **Test Theme Compatibility**
   - Does the component work in Light mode?
   - Does the component work in Dark mode?

### Common Issues to Flag

| Issue | Example | Fix |
|-------|---------|-----|
| Hardcoded color | `Color(0xFF00CE8B)` | Use `c.brandPrimary` |
| Hardcoded spacing | `SizedBox(height: 16)` | Use `VGap.lg()` |
| Material Icons | `Icons.home` | Use `Iconsax.home_2` |
| Direct EdgeInsets | `EdgeInsets.only(left: 16)` | Use `EdgeInsetsDirectional.only(start: s.lg)` |
| Recreating Button | Custom `GestureDetector` button | Use `ElevatedButton` |
| Missing composition | Dock with inline button code | Import and use `Button` component |

---

## COMPONENT REGISTRATION

### When a New Component Becomes Stable

1. **Add to SYSTEM.md** stable components table
2. **Document composition** in this file's Component Composition Map
3. **Create pattern example** if it's a reusable pattern
4. **Update docs-website** `components.ts` status to 'stable'

### Component Status Lifecycle

```
Coming Soon → In Development → Review → Stable
     ↓              ↓            ↓        ↓
  Planned      Being Built   Validation  Ready to Use
```

---

## COMPONENT DEPENDENCY MATRIX

Quick reference for which components can be used inside others:

| Parent Component | Can Contain |
|------------------|-------------|
| **ButtonGroup** | Button, IconButton |
| **Dock** | Button (1-2) |
| **TabBar** | TabBarItem, IconButton (FAB) |
| **Navbar** | Logo, Button, IconButton, Avatar |
| **AppBar** | IconButton, Title, Badge |
| **SideMenu** | SideMenuItem, Separator, Avatar |
| **PageHeader** | Breadcrumbs, Tag, Avatar, Button, InputField, Tabs, Separator |
| **ActionHeader** | Tabs (slot), Button (2) |
| **SectionHeader** | Icon, Hyperlink |
| **Card** | CardHeader, CardMedia, CardTag, CardHeadline, CardSupportingText, CardActions, CardLink |
| **CardHeader** | IconContainer, Avatar, Icon |
| **CardActions** | Button, IconButton |
| **Tables** | TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Tag, Avatar, Button |
| **Accordion** | AccordionItem |
| **ListView** | Icon, Avatar, Image, Tag, Hyperlink |
| **InfoSection** | InfoItem, Separator |
| **Chip** | Icon, Avatar |
| **ChipGroup** | Chip |
| **AvatarGroup** | Avatar |
| **Tooltip** | Any trigger element |
| **InputField** | Icon, Tag |
| **InputDropdown** | Icon, Avatar, Image, DropdownMenu |
| **DropdownMenu** | DropdownMenuItem |
| **ListControl** | Checkbox/Radio/Toggle, Icon |
| **FileUpload** | FileDropZone, FileProgressItem, FileTypeIcon, Button |
| **DatePicker** | InputField, Calendar |
| **ImageCarousel** | Images, IconButton (arrows) |
| **Dialogue** | Button (2), Icon |
| **BottomSheet** | StatusIcon, Button (2) |
| **Alert** | Icon, Button, Hyperlink |
| **Message** | Icon, Image |
| **Snackbar** | Icon, Button, IconButton |

---

## FILE REFERENCES

| Reference | Description |
|-----------|-------------|
| `@.cursor/rules/SYSTEM.md` | Core rules, constraints, stable components list |
| `@.cursor/rules/TOKENS.md` | Complete design token reference |
| `@.cursor/rules/PATTERNS.md` | Reusable UI pattern examples |
| `@.cursor/rules/ICONS.md` | Iconsax icon reference |
| `@.cursor/rules/RTL.md` | RTL layout and translation rules |
| `@.cursor/rules/TASK_TEMPLATE.md` | Component request template |

---

## QUICK REFERENCE COMMANDS

### Validate a Component File

```
1. Open the component file
2. Search for hardcoded values:
   - `Color(0x` or `Colors.`
   - `SizedBox(` without token
   - `fontSize:` or `fontWeight:` without token
   - `BorderRadius.circular(` without token
   - `Icons.` (Material icons)
3. Check imports at top of file
4. Verify token access pattern in build()
```

### Check Composition

```
1. Identify what atomic level the component is
2. List all child widgets used
3. Verify if any child should be a stable component
4. Ensure proper prop passing to children
```

