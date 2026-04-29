import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR BUTTON GROUP
/// =============================================================================
/// Groups of related buttons for selection or segmented controls.
///
/// ## Features
/// - Single or multiple selection
/// - 3 sizes: sm, md, lg
/// - Full width option
/// - Icon support
/// =============================================================================

/// Button group item
class SingularButtonGroupItem {
  const SingularButtonGroupItem({
    required this.id,
    required this.label,
    this.icon,
  });

  final String id;
  final String label;
  final IconData? icon;
}

/// Button group size
enum SingularButtonGroupSize {
  /// Small - 32px height
  sm,

  /// Medium - 40px height (default)
  md,

  /// Large - 48px height
  lg,
}

class SingularButtonGroup extends StatelessWidget {
  const SingularButtonGroup({
    super.key,
    required this.items,
    this.selectedIds = const [],
    this.onSelectionChanged,
    this.size = SingularButtonGroupSize.md,
    this.allowMultiple = false,
    this.fullWidth = false,
    this.disabled = false,
  });

  /// Group items
  final List<SingularButtonGroupItem> items;

  /// Selected item IDs
  final List<String> selectedIds;

  /// Selection changed callback
  final ValueChanged<List<String>>? onSelectionChanged;

  /// Size variant
  final SingularButtonGroupSize size;

  /// Allow multiple selection
  final bool allowMultiple;

  /// Full width layout
  final bool fullWidth;

  /// Disabled state
  final bool disabled;

  double get _height {
    switch (size) {
      case SingularButtonGroupSize.sm:
        return 32;
      case SingularButtonGroupSize.md:
        return 40;
      case SingularButtonGroupSize.lg:
        return 48;
    }
  }

  double get _fontSize {
    switch (size) {
      case SingularButtonGroupSize.sm:
        return 12;
      case SingularButtonGroupSize.md:
        return 14;
      case SingularButtonGroupSize.lg:
        return 16;
    }
  }

  void _handleTap(String id) {
    if (disabled || onSelectionChanged == null) return;

    List<String> newSelection;
    if (allowMultiple) {
      if (selectedIds.contains(id)) {
        newSelection = selectedIds.where((s) => s != id).toList();
      } else {
        newSelection = [...selectedIds, id];
      }
    } else {
      newSelection = selectedIds.contains(id) ? [] : [id];
    }
    onSelectionChanged!(newSelection);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      height: _height,
      decoration: BoxDecoration(
        color: c.bgSurfaceSoft,
        borderRadius: r.sm,
        border: Border.all(color: c.borderDefault),
      ),
      child: Row(
        mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
        children: items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;
          final isSelected = selectedIds.contains(item.id);
          final isFirst = index == 0;
          final isLast = index == items.length - 1;

          return fullWidth
              ? Expanded(child: _buildButton(item, isSelected, isFirst, isLast, c, s, t, r))
              : _buildButton(item, isSelected, isFirst, isLast, c, s, t, r);
        }).toList(),
      ),
    );
  }

  Widget _buildButton(
    SingularButtonGroupItem item,
    bool isSelected,
    bool isFirst,
    bool isLast,
    AppColors c,
    AppSpacing s,
    AppTypography t,
    AppRadius r,
  ) {
    return GestureDetector(
      onTap: () => _handleTap(item.id),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: _height - 2,
        padding: EdgeInsets.symmetric(horizontal: s.md),
        margin: const EdgeInsets.all(1),
        decoration: BoxDecoration(
          color: isSelected ? c.bgSurface : Colors.transparent,
          borderRadius: BorderRadius.horizontal(
            left: isFirst ? Radius.circular(r.sm.topLeft.x - 1) : Radius.zero,
            right: isLast ? Radius.circular(r.sm.topRight.x - 1) : Radius.zero,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 2,
                    offset: const Offset(0, 1),
                  ),
                ]
              : null,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (item.icon != null) ...[
              Icon(
                item.icon,
                size: _fontSize + 2,
                color: disabled
                    ? c.textDisabled
                    : isSelected
                        ? c.brandPrimary
                        : c.textSecondary,
              ),
              SizedBox(width: s.xs),
            ],
            Text(
              item.label,
              style: t.labelMedium.copyWith(
                fontSize: _fontSize,
                color: disabled
                    ? c.textDisabled
                    : isSelected
                        ? c.brandPrimary
                        : c.textSecondary,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
