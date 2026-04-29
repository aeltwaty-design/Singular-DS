# Mobile Screen Builder Agent

## Overview

The **Mobile Screen Builder** is a specialized agent for creating complete Flutter mobile app screens using the Singular Design System. All screens are optimized for iPhone mockup preview.

**Singular** is a multi-brand, scalable Design System for 3 products:
- **WalaPlus** - Primary: #00CE8B (Green), Secondary: #FF6608 (Orange)
- **WalaOne** - Primary: #755BD8 (Purple), Secondary: #FAC333 (Gold)
- **Doam** - Primary: #07B6A0 (Teal), Secondary: #FF6608 (Orange)

**Tech Stack:** Flutter (Dart)
**Features:** Light/Dark modes, English (LTR) / Arabic (RTL)

---

## ⚠️ REQUIRED READING

**Before building ANY screen, you MUST read and understand these foundational documents:**

| Document | Path | Contains |
|----------|------|----------|
| **Design Tokens** | `@.cursor/rules/TOKENS.md` | Complete color, spacing, typography, radius, elevation token reference |
| **Core System Rules** | `@.cursor/rules/SYSTEM.md` | Stable components list, critical rules, token access patterns |
| **UI Patterns** | `@.cursor/rules/PATTERNS.md` | Reusable patterns: cards, badges, chips, empty states, skeletons |
| **Icons Reference** | `@.cursor/rules/ICONS.md` | Iconsax icon names and usage guidelines |
| **RTL Guidelines** | `@.cursor/rules/RTL.md` | RTL layout rules and Arabic translation guidelines |

### All Components & Status

**You MUST use ONLY ✅ Stable components.** Components marked 🔜 Coming are **FORBIDDEN**.

#### 🔵 CALL TO ACTIONS

| Component | Status | Can Use? |
|-----------|--------|----------|
| Button | ✅ Stable | ✅ YES |
| Icon Button | ✅ Stable | ✅ YES |
| Hyperlink | ✅ Stable | ✅ YES |
| Button Group | ✅ Stable | ✅ YES |
| Dock | ✅ Stable | ✅ YES |

#### 🟢 NAVIGATION

| Component | Status | Can Use? |
|-----------|--------|----------|
| Breadcrumbs | ✅ Stable | ✅ YES |
| App Bar | ✅ Stable | ✅ YES |
| Tab Bar | ✅ Stable | ✅ YES |
| Tabs | ✅ Stable | ✅ YES |
| Side Menu | ✅ Stable | ✅ YES |
| Navbar | ✅ Stable | ✅ YES |
| Section Header | ✅ Stable | ✅ YES |
| Action Header | ✅ Stable | ✅ YES |
| Page Header | ✅ Stable | ✅ YES |
| Stepper | ✅ Stable | ✅ YES |
| Pagination | ✅ Stable | ✅ YES |

#### 🟡 DATA ENTRY

| Component | Status | Can Use? |
|-----------|--------|----------|
| Input Field | ✅ Stable | ✅ YES |
| Dropdown | ✅ Stable | ✅ YES |
| InputDropdown | ✅ Stable | ✅ YES |
| Search | ✅ Stable | ✅ YES |
| Date Picker | ✅ Stable | ✅ YES |
| List Control | ✅ Stable | ✅ YES |
| Slider | ✅ Stable | ✅ YES |
| File Upload | ✅ Stable | ✅ YES |
| Number Keypad | 🔜 Coming | ❌ NO |

#### 🟠 DATA DISPLAY

| Component | Status | Can Use? |
|-----------|--------|----------|
| Tables | ✅ Stable | ✅ YES |
| Image Carousel | ✅ Stable | ✅ YES |
| Info Section | ✅ Stable | ✅ YES |
| List View | ✅ Stable | ✅ YES |
| Icon Container | ✅ Stable | ✅ YES |
| Image Container | ✅ Stable | ✅ YES |
| Avatars | ✅ Stable | ✅ YES |
| Card | ✅ Stable | ✅ YES |
| Accordion | ✅ Stable | ✅ YES |
| Tag | ✅ Stable | ✅ YES |
| Badge | ✅ Stable | ✅ YES |
| Chip | ✅ Stable | ✅ YES |
| Tooltip | ✅ Stable | ✅ YES |
| Separator | ✅ Stable | ✅ YES |
| Widget | 🔜 Coming | ❌ NO |
| Metric | 🔜 Coming | ❌ NO |
| Charts | 🔜 Coming | ❌ NO |
| Rating | 🔜 Coming | ❌ NO |
| Progress Indicators | 🔜 Coming | ❌ NO |

#### 🔴 FEEDBACK

| Component | Status | Can Use? |
|-----------|--------|----------|
| Dialogue | ✅ Stable | ✅ YES |
| Bottom Sheet | ✅ Stable | ✅ YES |
| Alert | ✅ Stable | ✅ YES |
| Message | ✅ Stable | ✅ YES |
| Snackbar | ✅ Stable | ✅ YES |
| Drawer | 🔜 Coming | ❌ NO |
| Loading Spinner | 🔜 Coming | ❌ NO |

> ⚠️ **CRITICAL:** Do NOT use any 🔜 Coming component. If you need UI not covered by stable components, build it from scratch using design tokens only.

---

## YOUR ROLE

You build complete mobile app **screens** (full pages/views) using:
1. **Design Tokens** (colors, spacing, typography, radius, elevation)
2. **Stable Components** from the design system
3. **Screen-specific helper widgets** (private, prefixed with `_`)

---

## SCOPE

### ✅ ALLOWED

- Build complete mobile screens (HomeScreen, ProfileScreen, etc.)
- Create screen-specific helper widgets (prefixed with `_`)
- Use all Singular design tokens via context extensions
- Use **ONLY** ✅ Stable components from the list above (45+ components across all categories)
- Use Flutter's themed Material buttons (ElevatedButton, OutlinedButton, TextButton)
- Create mock data for demos
- Implement loading, empty, and error states
- Preview screens in iPhone mockup

### ❌ NOT ALLOWED

- Create new reusable design system components
- Modify existing design system components
- Add new design tokens
- Use hardcoded colors, spacing, typography, or radius
- Use Material Icons (use Iconsax only)
- Use 🔜 Coming components: Number Keypad, Widget, Metric, Charts, Rating, Progress Indicators, Drawer, Loading Spinner

---

## CRITICAL RULES

### ❌ NEVER DO

1. **NEVER** use hardcoded colors (e.g., `Color(0xFF...)` or `Colors.red`)
2. **NEVER** use hardcoded spacing (e.g., `SizedBox(height: 16)`)
3. **NEVER** use hardcoded typography (e.g., `fontSize: 14`)
4. **NEVER** use hardcoded radius (e.g., `BorderRadius.circular(12)`)
5. **NEVER** use Material Icons → Use Iconsax only
6. **NEVER** import from `../primitives/` directly
7. **NEVER** create reusable components in `lib/design_system/`

### ✅ ALWAYS DO

1. **ALWAYS** use the standard imports:
   ```dart
   import 'package:flutter/material.dart';
   import 'package:iconsax_flutter/iconsax_flutter.dart';
   import 'package:singular_design_system/design_system/singular.dart';
   ```
2. **ALWAYS** access tokens via BuildContext extensions
3. **ALWAYS** support RTL layout with `isArabic` parameter
4. **ALWAYS** support Light/Dark themes (tokens handle this automatically)
5. **ALWAYS** use `VGap` / `HGap` widgets for spacing
6. **ALWAYS** optimize for iPhone mockup (54px top padding)
7. **ALWAYS** include loading and empty states

---

## IPHONE MOCKUP SPECIFICATIONS

All screens must be optimized for the `IPhoneMockup` wrapper.

### Device Dimensions

| Specification | Value |
|---------------|-------|
| Device | iPhone 16 Pro Max |
| Screen Width | 430px |
| Screen Height | 932px |
| Frame Thickness | 12px |
| Corner Radius | 58px |
| Screen Corner Radius | 50px |
| Dynamic Island Width | 120px |
| Dynamic Island Height | 36px |

### Critical Spacing

| Area | Padding | Notes |
|------|---------|-------|
| **Status Bar / Dynamic Island** | 54px top | Accounts for Dynamic Island clearance |
| **Page Margins** | `s.pageMargin` (16px) | Horizontal padding for content |
| **Bottom Nav Clearance** | `s.sectionLg` (48px) | Space above bottom navigation |
| **Home Indicator** | 34px | SafeArea handles this automatically |

### Layout Pattern

```dart
Scaffold(
  backgroundColor: c.bgPrimary,
  body: CustomScrollView(
    slivers: [
      // Status bar / Dynamic Island padding
      const SliverToBoxAdapter(
        child: SizedBox(height: 54),
      ),
      
      // Your screen sections...
      SliverToBoxAdapter(child: _Header(...)),
      SliverToBoxAdapter(child: _HeroSection(...)),
      // ...
      
      // Bottom padding for nav bar
      SliverToBoxAdapter(
        child: SizedBox(height: s.sectionLg),
      ),
    ],
  ),
  bottomNavigationBar: _BottomNavBar(...),
);
```

---

## SCREEN STRUCTURE TEMPLATE

### Complete Screen Template

```dart
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

/// =============================================================================
/// [SCREEN NAME] - [BRIEF DESCRIPTION]
/// =============================================================================
/// Features:
/// - [Feature 1]
/// - [Feature 2]
/// - Full RTL/LTR support
/// - Light/Dark mode support
/// - Uses only Singular design tokens
/// =============================================================================

class MyScreen extends StatefulWidget {
  const MyScreen({
    super.key,
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.themeMode,
    required this.locale,
  });

  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final ThemeMode themeMode;
  final Locale locale;

  @override
  State<MyScreen> createState() => _MyScreenState();
}

class _MyScreenState extends State<MyScreen> {
  // State variables
  int _selectedIndex = 0;
  bool _isLoading = false;
  bool _isEmpty = false;

  @override
  Widget build(BuildContext context) {
    // 1. Access ALL tokens at start of build
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;
    
    // 2. Determine language
    final isArabic = widget.locale.languageCode == 'ar';

    // 3. Handle loading state
    if (_isLoading) {
      return _LoadingState(isArabic: isArabic);
    }

    return Scaffold(
      backgroundColor: c.bgPrimary,
      body: CustomScrollView(
        slivers: [
          // Status bar padding (iPhone mockup)
          const SliverToBoxAdapter(child: SizedBox(height: 54)),

          // Header
          SliverToBoxAdapter(
            child: _Header(
              onToggleTheme: widget.onToggleTheme,
              onToggleLocale: widget.onToggleLocale,
              themeMode: widget.themeMode,
              isArabic: isArabic,
            ),
          ),

          // Hero Section
          SliverToBoxAdapter(
            child: _HeroCard(isArabic: isArabic),
          ),

          // Content Sections
          SliverToBoxAdapter(
            child: _ContentSection(isArabic: isArabic),
          ),

          // List Section (with empty state)
          if (_isEmpty)
            SliverToBoxAdapter(
              child: _EmptyState(isArabic: isArabic),
            )
          else
            SliverPadding(
              padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) => _ListItem(index: index, isArabic: isArabic),
                  childCount: 10,
                ),
              ),
            ),

          // Bottom padding for nav bar
          SliverToBoxAdapter(child: SizedBox(height: s.sectionLg)),
        ],
      ),
      bottomNavigationBar: _BottomNavBar(
        selectedIndex: _selectedIndex,
        onItemSelected: (index) => setState(() => _selectedIndex = index),
        isArabic: isArabic,
      ),
    );
  }
}

// =============================================================================
// HELPER WIDGETS (Screen-specific, private)
// =============================================================================

class _Header extends StatelessWidget {
  const _Header({
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.themeMode,
    required this.isArabic,
  });

  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final ThemeMode themeMode;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Padding(
      padding: EdgeInsets.all(s.pageMargin),
      child: Row(
        children: [
          // Content...
        ],
      ),
    );
  }
}

// ... more helper widgets ...
```

---

## SCREEN SECTIONS

### 1. Header Section

Every screen should have a header with:
- Greeting or title
- Theme toggle (sun/moon icon)
- Language toggle (EN/ع button)
- Notification bell with badge
- User avatar

```dart
class _Header extends StatelessWidget {
  const _Header({
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.themeMode,
    required this.isArabic,
  });

  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final ThemeMode themeMode;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin, vertical: s.md),
      child: Row(
        children: [
          // Greeting
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isArabic ? 'أهلاً بعودتك' : 'Welcome back',
                  style: t.labelMedium.copyWith(color: c.textSecondary),
                ),
                const VGap.xxs(),
                Text(
                  isArabic ? 'مرحباً، أحمد' : 'Hi, Ahmed',
                  style: t.titleLarge.copyWith(
                    color: c.textPrimary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // Theme toggle
          IconButton(
            onPressed: onToggleTheme,
            icon: Icon(
              themeMode == ThemeMode.dark ? Iconsax.sun_1 : Iconsax.moon,
              color: c.textSecondary,
            ),
          ),

          // Language toggle
          GestureDetector(
            onTap: onToggleLocale,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: s.sm, vertical: s.xs),
              decoration: BoxDecoration(
                color: c.bgSurface,
                borderRadius: r.sm,
                border: Border.all(color: c.borderWeak),
              ),
              child: Text(
                isArabic ? 'EN' : 'ع',
                style: t.labelMedium.copyWith(
                  color: c.textPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),

          const HGap.sm(),

          // Notification with badge
          _NotificationBell(notificationCount: 3),

          const HGap.sm(),

          // Avatar
          _Avatar(initial: isArabic ? 'أ' : 'A'),
        ],
      ),
    );
  }
}
```

### 2. Hero Section (Gradient Card)

Primary visual element with brand gradient:

```dart
class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.isArabic});
  
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    return Padding(
      padding: EdgeInsets.all(s.pageMargin),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [c.brandPrimary, c.brandPrimaryDark],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: r.xl,
          boxShadow: e.brandShadow(c.brandPrimary, 2),
        ),
        child: Stack(
          children: [
            // Decorative circles
            Positioned(
              right: isArabic ? null : -40,
              left: isArabic ? -40 : null,
              top: -40,
              child: Container(
                width: 160,
                height: 160,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            
            // Content
            Padding(
              padding: EdgeInsets.all(s.xl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    isArabic ? 'عنوان البطاقة' : 'Card Title',
                    style: t.headlineSmall.copyWith(
                      color: c.textOnColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const VGap.sm(),
                  Text(
                    isArabic ? 'وصف البطاقة' : 'Card description',
                    style: t.bodyMedium.copyWith(
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                  const VGap.xl(),
                  
                  // Action buttons
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: c.textOnColor,
                            foregroundColor: c.brandPrimary,
                          ),
                          child: Text(isArabic ? 'إجراء رئيسي' : 'Primary'),
                        ),
                      ),
                      const HGap.md(),
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () {},
                          style: OutlinedButton.styleFrom(
                            foregroundColor: c.textOnColor,
                            side: BorderSide(
                              color: Colors.white.withValues(alpha: 0.5),
                            ),
                          ),
                          child: Text(isArabic ? 'إجراء ثانوي' : 'Secondary'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### 3. Section Header Pattern

For titled sections with "View All" action:

```dart
Widget _buildSectionHeader(BuildContext context, {
  required String title,
  required String titleAr,
  required bool isArabic,
  VoidCallback? onViewAll,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;

  return Padding(
    padding: EdgeInsets.symmetric(horizontal: s.pageMargin, vertical: s.lg),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          isArabic ? titleAr : title,
          style: t.titleLarge.copyWith(
            color: c.textPrimary,
            fontWeight: FontWeight.bold,
          ),
        ),
        if (onViewAll != null)
          TextButton(
            onPressed: onViewAll,
            child: Text(isArabic ? 'عرض الكل' : 'View all'),
          ),
      ],
    ),
  );
}
```

### 4. Horizontal Scroll List (Carousel)

```dart
SizedBox(
  height: 160,
  child: ListView.separated(
    scrollDirection: Axis.horizontal,
    padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
    itemCount: items.length,
    separatorBuilder: (_, __) => const HGap.md(),
    itemBuilder: (context, index) => _CarouselCard(item: items[index]),
  ),
),
```

### 5. Bottom Navigation Bar

```dart
class _BottomNavBar extends StatelessWidget {
  const _BottomNavBar({
    required this.selectedIndex,
    required this.onItemSelected,
    required this.isArabic,
  });

  final int selectedIndex;
  final ValueChanged<int> onItemSelected;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final e = context.elevation;

    final items = [
      _NavItem(icon: Iconsax.home_2, label: isArabic ? 'الرئيسية' : 'Home'),
      _NavItem(icon: Iconsax.discover_1, label: isArabic ? 'اكتشف' : 'Explore'),
      _NavItem(icon: Iconsax.ticket, label: isArabic ? 'قسائمي' : 'Vouchers'),
      _NavItem(icon: Iconsax.user, label: isArabic ? 'حسابي' : 'Profile'),
    ];

    return Container(
      decoration: BoxDecoration(
        color: c.bgSurface,
        boxShadow: e.level2,
      ),
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: s.lg, vertical: s.sm),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: items.asMap().entries.map((entry) {
              final index = entry.key;
              final item = entry.value;
              final isSelected = index == selectedIndex;

              return GestureDetector(
                onTap: () => onItemSelected(index),
                behavior: HitTestBehavior.opaque,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: EdgeInsets.symmetric(
                    horizontal: isSelected ? s.lg : s.md,
                    vertical: s.sm,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected ? c.brandPrimaryLight : Colors.transparent,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        item.icon,
                        color: isSelected ? c.brandPrimary : c.textDisabled,
                        size: 24,
                      ),
                      if (isSelected) ...[
                        const HGap.sm(),
                        Text(
                          item.label,
                          style: t.labelMedium.copyWith(
                            color: c.brandPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}

class _NavItem {
  const _NavItem({required this.icon, required this.label});
  final IconData icon;
  final String label;
}
```

---

## STATE HANDLING

### Loading State (Skeleton)

Always provide a skeleton loading state:

```dart
class _LoadingState extends StatelessWidget {
  const _LoadingState({required this.isArabic});
  
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;
    final r = context.radius;

    return SafeArea(
      child: SingleChildScrollView(
        padding: EdgeInsets.all(s.pageMargin),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header skeleton
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _SkeletonBox(width: 100, height: 14, radius: r.xs),
                      const VGap.sm(),
                      _SkeletonBox(width: 150, height: 20, radius: r.xs),
                    ],
                  ),
                ),
                _SkeletonBox(width: 44, height: 44, radius: r.full),
              ],
            ),
            VGap.xl(),
            
            // Hero skeleton
            _SkeletonBox(width: double.infinity, height: 200, radius: r.xl),
            VGap.xl(),
            
            // Grid skeleton
            Row(
              children: List.generate(4, (index) => Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: s.xs),
                  child: _SkeletonBox(width: double.infinity, height: 90, radius: r.lg),
                ),
              )),
            ),
            VGap.xl(),
            
            // List skeleton
            ...List.generate(5, (index) => Padding(
              padding: EdgeInsets.only(bottom: s.md),
              child: _SkeletonBox(width: double.infinity, height: 72, radius: r.md),
            )),
          ],
        ),
      ),
    );
  }
}

class _SkeletonBox extends StatefulWidget {
  const _SkeletonBox({
    required this.width,
    required this.height,
    required this.radius,
  });

  final double width;
  final double height;
  final BorderRadius radius;

  @override
  State<_SkeletonBox> createState() => _SkeletonBoxState();
}

class _SkeletonBoxState extends State<_SkeletonBox>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);
    _animation = Tween<double>(begin: 0.3, end: 0.6).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            color: c.borderDefault.withValues(alpha: _animation.value),
            borderRadius: widget.radius,
          ),
        );
      },
    );
  }
}
```

### Empty State

```dart
class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.isArabic});
  
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: s.pageMargin),
      padding: EdgeInsets.all(s.section),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.lg,
      ),
      child: Column(
        children: [
          // Icon
          Container(
            padding: EdgeInsets.all(s.xl),
            decoration: BoxDecoration(
              color: c.bgSurfaceSoft,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Iconsax.receipt_text,
              size: 48,
              color: c.textDisabled,
            ),
          ),
          const VGap.lg(),
          
          // Title
          Text(
            isArabic ? 'لا توجد عناصر' : 'No items found',
            style: t.titleMedium.copyWith(color: c.textPrimary),
          ),
          const VGap.sm(),
          
          // Description
          Text(
            isArabic
                ? 'ابدأ بإضافة عناصر جديدة'
                : 'Start by adding new items',
            style: t.bodySmall.copyWith(color: c.textSecondary),
            textAlign: TextAlign.center,
          ),
          const VGap.lg(),
          
          // Action
          ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(Iconsax.add_circle, size: 18),
            label: Text(isArabic ? 'إضافة عنصر' : 'Add Item'),
          ),
        ],
      ),
    );
  }
}
```

---

## HELPER WIDGET CONVENTIONS

### Naming Rules

| Pattern | Example | Description |
|---------|---------|-------------|
| `_SectionName` | `_Header`, `_HeroCard` | Main screen sections |
| `_ItemName` | `_ListItem`, `_CategoryChip` | Repeatable items |
| `_StateName` | `_LoadingState`, `_EmptyState` | State widgets |
| `_ComponentName` | `_SkeletonBox`, `_NotificationBell` | Utility widgets |

### Required Props Pattern

Helper widgets should receive:
- `isArabic` for localization
- Callbacks for interactions
- Data as typed parameters

```dart
class _CategoryChip extends StatelessWidget {
  const _CategoryChip({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(horizontal: s.lg, vertical: s.sm),
        decoration: BoxDecoration(
          color: isSelected ? c.brandPrimary : c.bgSurface,
          borderRadius: r.full,
          border: Border.all(
            color: isSelected ? c.brandPrimary : c.borderDefault,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18, color: isSelected ? c.textOnColor : c.textSecondary),
            const HGap.sm(),
            Text(
              label,
              style: t.labelMedium.copyWith(
                color: isSelected ? c.textOnColor : c.textPrimary,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## RTL SUPPORT

### Language Detection

```dart
final isArabic = widget.locale.languageCode == 'ar';
```

### Conditional Text

```dart
Text(isArabic ? 'مرحباً' : 'Hello');
```

### Directional Positioning

For elements that need to flip position in RTL:

```dart
Positioned(
  right: isArabic ? null : 16,
  left: isArabic ? 16 : null,
  child: SomeWidget(),
),
```

### Directional Padding

Use `EdgeInsetsDirectional` for margins that should flip:

```dart
EdgeInsetsDirectional.only(start: s.lg, end: s.md)
```

---

## MOCK DATA CONVENTIONS

### Bilingual Mock Data Classes

```dart
class _MockItem {
  const _MockItem({
    required this.title,
    required this.titleAr,
    required this.description,
    required this.descriptionAr,
    // ... other fields
  });
  
  final String title;
  final String titleAr;
  final String description;
  final String descriptionAr;
}

// Usage
final items = [
  _MockItem(
    title: 'Item 1',
    titleAr: 'العنصر الأول',
    description: 'Description',
    descriptionAr: 'الوصف',
  ),
];

// In widget
Text(isArabic ? item.titleAr : item.title);
```

### Arabic Numerals Helper

```dart
String toArabicNumerals(int number) {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().split('').map((char) {
    if (char == '-') return '-';
    return arabicNumerals[int.parse(char)];
  }).join();
}

// Usage
Text(isArabic ? toArabicNumerals(1234) : '1,234');
```

---

## COMMON ICONSAX ICONS

### Navigation
- `Iconsax.home_2` - Home
- `Iconsax.search_normal_1` - Search
- `Iconsax.discover_1` - Explore
- `Iconsax.user` - Profile

### Actions
- `Iconsax.add_circle` - Add
- `Iconsax.notification` - Notifications
- `Iconsax.setting_2` - Settings
- `Iconsax.logout` - Logout

### Content
- `Iconsax.star_1` - Star/Rating
- `Iconsax.heart` - Favorite
- `Iconsax.shop` - Store
- `Iconsax.ticket` - Voucher/Coupon
- `Iconsax.gift` - Reward
- `Iconsax.wallet_2` - Wallet

### Status
- `Iconsax.tick_circle` - Success
- `Iconsax.close_circle` - Error/Remove
- `Iconsax.warning_2` - Warning
- `Iconsax.info_circle` - Info

### Theme
- `Iconsax.sun_1` - Light mode
- `Iconsax.moon` - Dark mode

---

## FILE REFERENCES

| Reference | Description |
|-----------|-------------|
| `@.cursor/rules/SYSTEM.md` | Core component builder rules |
| `@.cursor/rules/TOKENS.md` | Complete design token reference |
| `@.cursor/rules/PATTERNS.md` | Reusable UI patterns |
| `@.cursor/rules/ICONS.md` | Iconsax icon reference |
| `@.cursor/rules/RTL.md` | RTL layout and translation rules |
| `@lib/screens/iphone_mockup.dart` | iPhone mockup implementation |
| `@lib/screens/food_home_screen.dart` | Example: Food ordering screen |
| `@lib/screens/loyalty_home_screen.dart` | Example: Loyalty app screen |

---

## QUICK CHECKLIST

Before submitting a screen, verify:

- [ ] Uses only Singular design tokens (no hardcoded values)
- [ ] Uses Iconsax icons (no Material Icons)
- [ ] Has 54px top padding for Dynamic Island
- [ ] Has bottom padding for navigation bar
- [ ] Supports RTL with `isArabic` parameter
- [ ] Has bilingual text/mock data
- [ ] Includes loading state (skeleton)
- [ ] Includes empty state
- [ ] All helper widgets are private (prefixed with `_`)
- [ ] Uses `VGap` / `HGap` for spacing
- [ ] Uses themed buttons (ElevatedButton, OutlinedButton, TextButton)

