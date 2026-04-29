import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR INFO SECTION
/// =============================================================================
/// A structured section for displaying key-value information.
///
/// ## Features
/// - Horizontal and vertical layouts
/// - Container variant with border
/// - Separators between items
/// - Flexible item content
/// =============================================================================

/// Info section layout
enum SingularInfoSectionLayout {
  /// Horizontal layout
  horizontal,

  /// Vertical/stacked layout
  vertical,
}

/// Info item data
class SingularInfoItem {
  const SingularInfoItem({
    required this.label,
    required this.value,
    this.icon,
  });

  final String label;
  final String value;
  final IconData? icon;
}

class SingularInfoSection extends StatelessWidget {
  const SingularInfoSection({
    super.key,
    required this.items,
    this.layout = SingularInfoSectionLayout.horizontal,
    this.container = false,
    this.showSeparators = true,
  });

  /// Info items
  final List<SingularInfoItem> items;

  /// Layout direction
  final SingularInfoSectionLayout layout;

  /// Show container with border
  final bool container;

  /// Show separators between items
  final bool showSeparators;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;

    Widget content;

    if (layout == SingularInfoSectionLayout.horizontal) {
      content = IntrinsicHeight(
        child: Row(
          children: items.asMap().entries.expand((entry) {
            final index = entry.key;
            final item = entry.value;
            final isLast = index == items.length - 1;

            return [
              Expanded(child: _InfoItemWidget(item: item, layout: layout)),
              if (!isLast && showSeparators)
                VerticalDivider(
                  width: s.lg * 2,
                  thickness: 1,
                  color: c.borderWeak,
                ),
            ];
          }).toList(),
        ),
      );
    } else {
      content = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: items.asMap().entries.expand((entry) {
          final index = entry.key;
          final item = entry.value;
          final isLast = index == items.length - 1;

          return [
            _InfoItemWidget(item: item, layout: layout),
            if (!isLast && showSeparators) ...[
              SizedBox(height: s.sm),
              Divider(height: 1, color: c.borderWeak),
              SizedBox(height: s.sm),
            ] else if (!isLast) ...[
              SizedBox(height: s.md),
            ],
          ];
        }).toList(),
      );
    }

    if (container) {
      return Container(
        padding: EdgeInsets.all(s.md),
        decoration: BoxDecoration(
          color: c.bgSurface,
          borderRadius: r.md,
          border: Border.all(color: c.borderWeak),
        ),
        child: content,
      );
    }

    return content;
  }
}

class _InfoItemWidget extends StatelessWidget {
  const _InfoItemWidget({
    required this.item,
    required this.layout,
  });

  final SingularInfoItem item;
  final SingularInfoSectionLayout layout;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Column(
      crossAxisAlignment: layout == SingularInfoSectionLayout.horizontal
          ? CrossAxisAlignment.center
          : CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (item.icon != null) ...[
              Icon(item.icon, size: 14, color: c.textSecondary),
              SizedBox(width: s.xxs),
            ],
            Text(
              item.label,
              style: t.labelSmall.copyWith(
                color: c.textSecondary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
        SizedBox(height: s.xxs),
        // Value
        Text(
          item.value,
          style: t.bodyMedium.copyWith(
            color: c.textPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
