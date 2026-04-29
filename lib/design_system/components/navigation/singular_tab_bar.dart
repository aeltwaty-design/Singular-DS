import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR TAB BAR
/// =============================================================================
/// Bottom navigation bar for switching between primary destinations.
///
/// ## Features
/// - Up to 5 items recommended
/// - Selected state with brand color
/// - Optional FAB in center
/// - iOS home indicator support
/// - Label animation on selection
/// =============================================================================

class SingularTabBar extends StatelessWidget {
  const SingularTabBar({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onTabChange,
    this.showIndicator = false,
    this.showFab = false,
    this.fabIcon,
    this.onFabClick,
  });

  /// Tab items
  final List<SingularTabBarItem> items;

  /// Currently selected tab index
  final int selectedIndex;

  /// Callback when tab is selected
  final ValueChanged<int> onTabChange;

  /// Show iOS home indicator
  final bool showIndicator;

  /// Show FAB in center
  final bool showFab;

  /// FAB icon
  final IconData? fabIcon;

  /// FAB tap callback
  final VoidCallback? onFabClick;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final e = context.elevation;

    return Container(
      decoration: BoxDecoration(
        color: c.bgSurface,
        boxShadow: e.level2,
      ),
      child: SafeArea(
        top: false,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Tab items
            Padding(
              padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: _buildItems(context),
              ),
            ),

            // Home indicator
            if (showIndicator)
              Container(
                width: 134,
                height: 5,
                margin: EdgeInsets.only(bottom: s.sm),
                decoration: BoxDecoration(
                  color: c.textDisabled.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(3),
                ),
              ),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildItems(BuildContext context) {
    final List<Widget> widgets = [];

    for (int i = 0; i < items.length; i++) {
      // Insert FAB placeholder in the middle
      if (showFab && i == (items.length / 2).floor()) {
        widgets.add(_buildFab(context));
      }

      widgets.add(
        Expanded(
          child: _SingularTabBarItemWidget(
            item: items[i],
            isSelected: i == selectedIndex,
            onTap: () => onTabChange(i),
          ),
        ),
      );
    }

    return widgets;
  }

  Widget _buildFab(BuildContext context) {
    final c = context.colors;
    final e = context.elevation;

    return GestureDetector(
      onTap: onFabClick,
      child: Container(
        width: 56,
        height: 56,
        margin: const EdgeInsets.symmetric(horizontal: 8),
        decoration: BoxDecoration(
          color: c.brandPrimary,
          shape: BoxShape.circle,
          boxShadow: e.brandShadow(c.brandPrimary, 2),
        ),
        child: Icon(
          fabIcon ?? Icons.add,
          color: c.textOnColor,
          size: 28,
        ),
      ),
    );
  }
}

/// Tab bar item data
class SingularTabBarItem {
  const SingularTabBarItem({
    required this.icon,
    required this.label,
    this.badge,
  });

  /// Item icon
  final IconData icon;

  /// Item label
  final String label;

  /// Optional badge count
  final int? badge;
}

class _SingularTabBarItemWidget extends StatelessWidget {
  const _SingularTabBarItemWidget({
    required this.item,
    required this.isSelected,
    required this.onTap,
  });

  final SingularTabBarItem item;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
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
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Icon with optional badge
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(
                  item.icon,
                  color: isSelected ? c.brandPrimary : c.textDisabled,
                  size: 24,
                ),
                if (item.badge != null && item.badge! > 0)
                  Positioned(
                    top: -4,
                    right: -4,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: BoxDecoration(
                        color: c.statusError,
                        shape: BoxShape.circle,
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 14,
                        minHeight: 14,
                      ),
                      child: Center(
                        child: Text(
                          item.badge! > 9 ? '9+' : '${item.badge}',
                          style: t.labelSmall.copyWith(
                            color: c.textOnColor,
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),

            // Label (visible when selected)
            if (isSelected) ...[
              SizedBox(width: s.sm),
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
  }
}
