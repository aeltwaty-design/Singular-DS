import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR DOCK
/// =============================================================================
/// Floating action dock for quick access to common actions.
///
/// ## Features
/// - Horizontal layout
/// - Icon buttons with optional labels
/// - Primary action highlight
/// - Floating appearance
/// =============================================================================

/// Dock item
class SingularDockItem {
  const SingularDockItem({
    required this.id,
    required this.icon,
    this.label,
    this.isPrimary = false,
  });

  final String id;
  final IconData icon;
  final String? label;
  final bool isPrimary;
}

class SingularDock extends StatelessWidget {
  const SingularDock({
    super.key,
    required this.items,
    required this.onItemTap,
    this.selectedId,
    this.showLabels = false,
  });

  /// Dock items
  final List<SingularDockItem> items;

  /// Item tap callback
  final ValueChanged<String> onItemTap;

  /// Currently selected item ID
  final String? selectedId;

  /// Show labels below icons
  final bool showLabels;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;
    final e = context.elevation;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.full,
        boxShadow: e.level3,
        border: Border.all(color: c.borderWeak),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;
          final isLast = index == items.length - 1;

          return Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _DockItemWidget(
                item: item,
                isSelected: item.id == selectedId,
                showLabel: showLabels,
                onTap: () => onItemTap(item.id),
              ),
              if (!isLast) SizedBox(width: s.sm),
            ],
          );
        }).toList(),
      ),
    );
  }
}

class _DockItemWidget extends StatelessWidget {
  const _DockItemWidget({
    required this.item,
    required this.isSelected,
    required this.showLabel,
    required this.onTap,
  });

  final SingularDockItem item;
  final bool isSelected;
  final bool showLabel;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final bgColor = item.isPrimary
        ? c.brandPrimary
        : isSelected
            ? c.bgSurfaceSoft
            : Colors.transparent;
    final iconColor = item.isPrimary
        ? c.textOnColor
        : isSelected
            ? c.brandPrimary
            : c.textSecondary;

    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: item.isPrimary ? r.md : r.sm,
            ),
            child: Icon(
              item.icon,
              size: 22,
              color: iconColor,
            ),
          ),
          if (showLabel && item.label != null) ...[
            SizedBox(height: s.xxs),
            Text(
              item.label!,
              style: t.labelSmall.copyWith(
                color: isSelected ? c.brandPrimary : c.textSecondary,
                fontSize: 10,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
