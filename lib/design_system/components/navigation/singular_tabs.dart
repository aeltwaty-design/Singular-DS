import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR TABS
/// =============================================================================
/// Tabs organize content into separate views where only one view is visible.
///
/// ## Features
/// - 3 sizes: sm, md, lg
/// - Underline indicator
/// - Icon support
/// - Scrollable tabs
/// =============================================================================

/// Tabs size variant
enum SingularTabsSize {
  /// Small - 12px text
  sm,

  /// Medium - 14px text (default)
  md,

  /// Large - 16px text
  lg,
}

class SingularTabs extends StatefulWidget {
  const SingularTabs({
    super.key,
    required this.tabs,
    this.selectedIndex = 0,
    this.onTabChange,
    this.size = SingularTabsSize.md,
    this.scrollable = false,
  });

  /// Tab items
  final List<SingularTabItem> tabs;

  /// Currently selected tab index
  final int selectedIndex;

  /// Tab change callback
  final ValueChanged<int>? onTabChange;

  /// Size variant
  final SingularTabsSize size;

  /// Allow horizontal scrolling
  final bool scrollable;

  @override
  State<SingularTabs> createState() => _SingularTabsState();
}

class _SingularTabsState extends State<SingularTabs> {
  double get _fontSize {
    switch (widget.size) {
      case SingularTabsSize.sm:
        return 12;
      case SingularTabsSize.md:
        return 14;
      case SingularTabsSize.lg:
        return 16;
    }
  }

  double get _height {
    switch (widget.size) {
      case SingularTabsSize.sm:
        return 36;
      case SingularTabsSize.md:
        return 44;
      case SingularTabsSize.lg:
        return 48;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    final tabWidgets = widget.tabs.asMap().entries.map((entry) {
      final index = entry.key;
      final tab = entry.value;
      final isSelected = index == widget.selectedIndex;

      return _SingularTabWidget(
        tab: tab,
        isSelected: isSelected,
        fontSize: _fontSize,
        height: _height,
        onTap: () => widget.onTabChange?.call(index),
      );
    }).toList();

    return Container(
      height: _height,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: c.borderWeak, width: 1),
        ),
      ),
      child: widget.scrollable
          ? SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: s.md),
              child: Row(children: tabWidgets),
            )
          : Row(
              children: tabWidgets
                  .map((tab) => Expanded(child: tab))
                  .toList(),
            ),
    );
  }
}

class _SingularTabWidget extends StatelessWidget {
  const _SingularTabWidget({
    required this.tab,
    required this.isSelected,
    required this.fontSize,
    required this.height,
    required this.onTap,
  });

  final SingularTabItem tab;
  final bool isSelected;
  final double fontSize;
  final double height;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: height,
        padding: EdgeInsets.symmetric(horizontal: s.md),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isSelected ? c.brandPrimary : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (tab.icon != null) ...[
              Icon(
                tab.icon,
                size: fontSize + 4,
                color: isSelected ? c.brandPrimary : c.textSecondary,
              ),
              SizedBox(width: s.xs),
            ],
            Text(
              tab.label,
              style: t.labelMedium.copyWith(
                color: isSelected ? c.brandPrimary : c.textSecondary,
                fontSize: fontSize,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
            if (tab.badge != null) ...[
              SizedBox(width: s.xs),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: isSelected ? c.brandPrimary : c.bgSurfaceSoft,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${tab.badge}',
                  style: t.labelSmall.copyWith(
                    color: isSelected ? c.textOnColor : c.textSecondary,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Tab item data
class SingularTabItem {
  const SingularTabItem({
    required this.label,
    this.icon,
    this.badge,
  });

  final String label;
  final IconData? icon;
  final int? badge;
}
