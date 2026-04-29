import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR BREADCRUMBS
/// =============================================================================
/// Breadcrumbs show the navigation hierarchy and allow users to navigate back.
///
/// ## Features
/// - Clickable navigation items
/// - Separator customization
/// - Overflow handling
/// - RTL support
/// =============================================================================

/// Breadcrumb item data
class SingularBreadcrumbItem {
  const SingularBreadcrumbItem({
    required this.label,
    this.icon,
    this.onTap,
  });

  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
}

class SingularBreadcrumbs extends StatelessWidget {
  const SingularBreadcrumbs({
    super.key,
    required this.items,
    this.separator,
    this.maxItems,
    this.showHomeIcon = true,
  });

  /// Breadcrumb items
  final List<SingularBreadcrumbItem> items;

  /// Custom separator widget
  final Widget? separator;

  /// Max items to show before collapsing
  final int? maxItems;

  /// Show home icon for first item
  final bool showHomeIcon;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final isRTL = Directionality.of(context) == TextDirection.rtl;

    final displayItems = _getDisplayItems();
    final defaultSeparator = Icon(
      isRTL ? Iconsax.arrow_left_2 : Iconsax.arrow_right_3,
      size: 14,
      color: c.textDisabled,
    );

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: displayItems.asMap().entries.expand((entry) {
          final index = entry.key;
          final item = entry.value;
          final isLast = index == displayItems.length - 1;
          final isFirst = index == 0;

          return [
            _BreadcrumbItemWidget(
              item: item,
              isLast: isLast,
              showHomeIcon: showHomeIcon && isFirst,
              colors: c,
              typography: t,
            ),
            if (!isLast) ...[
              Padding(
                padding: EdgeInsets.symmetric(horizontal: s.xs),
                child: separator ?? defaultSeparator,
              ),
            ],
          ];
        }).toList(),
      ),
    );
  }

  List<SingularBreadcrumbItem> _getDisplayItems() {
    if (maxItems == null || items.length <= maxItems!) {
      return items;
    }

    // Show first, ellipsis, and last items
    return [
      items.first,
      SingularBreadcrumbItem(label: '...', onTap: null),
      ...items.sublist(items.length - (maxItems! - 2)),
    ];
  }
}

class _BreadcrumbItemWidget extends StatelessWidget {
  const _BreadcrumbItemWidget({
    required this.item,
    required this.isLast,
    required this.showHomeIcon,
    required this.colors,
    required this.typography,
  });

  final SingularBreadcrumbItem item;
  final bool isLast;
  final bool showHomeIcon;
  final AppColors colors;
  final AppTypography typography;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;
    final color = isLast ? colors.textPrimary : colors.textSecondary;

    return GestureDetector(
      onTap: isLast ? null : item.onTap,
      behavior: HitTestBehavior.opaque,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showHomeIcon) ...[
            Icon(
              item.icon ?? Iconsax.home_2,
              size: 16,
              color: color,
            ),
            SizedBox(width: s.xxs),
          ] else if (item.icon != null) ...[
            Icon(
              item.icon,
              size: 16,
              color: color,
            ),
            SizedBox(width: s.xxs),
          ],
          Text(
            item.label,
            style: typography.bodySmall.copyWith(
              color: color,
              fontWeight: isLast ? FontWeight.w500 : FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}
