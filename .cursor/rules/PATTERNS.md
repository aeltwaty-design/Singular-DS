# Component Building Patterns

Common UI patterns using Singular Design System tokens. Copy and adapt these patterns for your components.

---

## Interactive Card (Tappable)

```dart
class TappableCard extends StatefulWidget {
  const TappableCard({
    super.key,
    required this.child,
    required this.onTap,
  });

  final Widget child;
  final VoidCallback onTap;

  @override
  State<TappableCard> createState() => _TappableCardState();
}

class _TappableCardState extends State<TappableCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;
    final e = context.elevation;

    return GestureDetector(
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        transform: Matrix4.identity()..scale(_isPressed ? 0.98 : 1.0),
        decoration: BoxDecoration(
          color: _isPressed ? c.interactivePressed : c.bgSurface,
          borderRadius: r.lg,
          boxShadow: _isPressed ? [] : e.level1,
        ),
        child: widget.child,
      ),
    );
  }
}
```

---

## Notification Badge

```dart
Widget buildIconWithBadge(BuildContext context, {
  required IconData icon,
  required int count,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;

  return Stack(
    clipBehavior: Clip.none,
    children: [
      Icon(icon, size: 24, color: c.textPrimary),
      if (count > 0)
        Positioned(
          top: -4,
          right: -4,
          child: Container(
            padding: EdgeInsets.all(s.xs),
            decoration: BoxDecoration(
              color: c.statusError,
              shape: BoxShape.circle,
            ),
            constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
            child: Center(
              child: Text(
                count > 99 ? '99+' : '$count',
                style: t.labelSmall.copyWith(
                  color: c.textOnColor,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),
    ],
  );
}
```

---

## Chip / Tag

```dart
Widget buildChip(BuildContext context, {
  required String label,
  required bool isSelected,
  IconData? icon,
  VoidCallback? onTap,
}) {
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
          width: isSelected ? 2 : 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(
              icon,
              size: 18,
              color: isSelected ? c.textOnColor : c.textSecondary,
            ),
            const HGap.sm(),
          ],
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
```

---

## Gradient Hero Card

```dart
Widget buildGradientCard(BuildContext context, {required Widget child}) {
  final c = context.colors;
  final r = context.radius;
  final e = context.elevation;

  return Container(
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
        // Decorative circle (top-right)
        Positioned(
          right: -40,
          top: -40,
          child: Container(
            width: 160,
            height: 160,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.08),
              shape: BoxShape.circle,
            ),
          ),
        ),
        // Decorative circle (bottom-left)
        Positioned(
          left: 60,
          bottom: -60,
          child: Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.06),
              shape: BoxShape.circle,
            ),
          ),
        ),
        // Content
        child,
      ],
    ),
  );
}
```

---

## List Item with Divider

```dart
Widget buildListWithDividers(BuildContext context, {
  required List<Widget> children,
}) {
  final c = context.colors;
  final s = context.spacing;
  final r = context.radius;

  return Container(
    decoration: BoxDecoration(
      color: c.bgSurface,
      borderRadius: r.lg,
    ),
    child: ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: EdgeInsets.zero,
      itemCount: children.length,
      separatorBuilder: (_, __) => Divider(
        height: 1,
        color: c.borderWeak,
        indent: s.lg,
        endIndent: s.lg,
      ),
      itemBuilder: (context, index) => children[index],
    ),
  );
}
```

---

## Empty State

```dart
Widget buildEmptyState(BuildContext context, {
  required IconData icon,
  required String title,
  required String description,
  required String buttonLabel,
  required VoidCallback onAction,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;

  return Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Container(
        padding: EdgeInsets.all(s.xl),
        decoration: BoxDecoration(
          color: c.bgSurfaceSoft,
          shape: BoxShape.circle,
        ),
        child: Icon(icon, size: 48, color: c.textDisabled),
      ),
      VGap.lg(),
      Text(
        title,
        style: t.titleMedium.copyWith(color: c.textPrimary),
      ),
      VGap.sm(),
      Text(
        description,
        style: t.bodySmall.copyWith(color: c.textSecondary),
        textAlign: TextAlign.center,
      ),
      VGap.lg(),
      ElevatedButton.icon(
        onPressed: onAction,
        icon: Icon(Iconsax.add, size: 18),
        label: Text(buttonLabel),
      ),
    ],
  );
}
```

---

## Status Banner

```dart
enum StatusType { success, warning, error, info }

Widget buildStatusBanner(BuildContext context, {
  required StatusType type,
  required String message,
  VoidCallback? onDismiss,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;
  final r = context.radius;

  final (Color bgColor, Color textColor, IconData icon) = switch (type) {
    StatusType.success => (c.statusSuccessLight, c.statusSuccess, Iconsax.tick_circle),
    StatusType.warning => (c.statusWarningLight, c.statusWarning, Iconsax.warning_2),
    StatusType.error => (c.statusErrorLight, c.statusError, Iconsax.danger),
    StatusType.info => (c.statusInfoLight, c.statusInfo, Iconsax.info_circle),
  };

  return Container(
    padding: EdgeInsets.all(s.md),
    decoration: BoxDecoration(
      color: bgColor,
      borderRadius: r.md,
    ),
    child: Row(
      children: [
        Icon(icon, color: textColor, size: 20),
        const HGap.md(),
        Expanded(
          child: Text(
            message,
            style: t.bodyMedium.copyWith(color: textColor),
          ),
        ),
        if (onDismiss != null)
          GestureDetector(
            onTap: onDismiss,
            child: Icon(Iconsax.close_circle, color: textColor, size: 20),
          ),
      ],
    ),
  );
}
```

---

## Loading Skeleton

```dart
class SkeletonBox extends StatefulWidget {
  const SkeletonBox({
    super.key,
    required this.width,
    required this.height,
    this.borderRadius,
  });

  final double width;
  final double height;
  final BorderRadius? borderRadius;

  @override
  State<SkeletonBox> createState() => _SkeletonBoxState();
}

class _SkeletonBoxState extends State<SkeletonBox>
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
    final r = context.radius;

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            color: c.borderDefault.withOpacity(_animation.value),
            borderRadius: widget.borderRadius ?? r.sm,
          ),
        );
      },
    );
  }
}
```

---

## Section Header

```dart
Widget buildSectionHeader(BuildContext context, {
  required String title,
  String? actionLabel,
  VoidCallback? onAction,
  bool isArabic = false,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;

  return Padding(
    padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: t.titleLarge.copyWith(
            color: c.textPrimary,
            fontWeight: FontWeight.bold,
          ),
        ),
        if (actionLabel != null)
          TextButton(
            onPressed: onAction,
            child: Text(actionLabel),
          ),
      ],
    ),
  );
}
```

---

## Bottom Navigation Item

```dart
Widget buildNavItem(BuildContext context, {
  required IconData icon,
  required String label,
  required bool isSelected,
  required VoidCallback onTap,
}) {
  final c = context.colors;
  final s = context.spacing;
  final t = context.typography;

  return GestureDetector(
    onTap: onTap,
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
            icon,
            color: isSelected ? c.brandPrimary : c.textDisabled,
            size: 24,
          ),
          if (isSelected) ...[
            const HGap.sm(),
            Text(
              label,
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
}
```

---

## Avatar

```dart
Widget buildAvatar(BuildContext context, {
  String? imageUrl,
  String? initials,
  double size = 44,
}) {
  final c = context.colors;
  final t = context.typography;
  final r = context.radius;

  return Container(
    width: size,
    height: size,
    decoration: BoxDecoration(
      gradient: imageUrl == null
          ? LinearGradient(
              colors: [c.brandPrimary, c.brandPrimaryDark],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            )
          : null,
      borderRadius: r.full,
      image: imageUrl != null
          ? DecorationImage(
              image: NetworkImage(imageUrl),
              fit: BoxFit.cover,
            )
          : null,
    ),
    child: imageUrl == null && initials != null
        ? Center(
            child: Text(
              initials,
              style: t.titleMedium.copyWith(
                color: c.textOnColor,
                fontWeight: FontWeight.bold,
              ),
            ),
          )
        : null,
  );
}
```


