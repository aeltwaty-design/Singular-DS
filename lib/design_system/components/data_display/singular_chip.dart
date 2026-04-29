import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR CHIP
/// =============================================================================
/// Interactive selection elements for filtering and multi-select inputs.
///
/// ## Features
/// - 3 sizes: sm, md, lg
/// - Selected/unselected states
/// - Leading icon or avatar support
/// - Dismissible with close button
/// - Disabled state
/// =============================================================================

/// Chip size variant
enum SingularChipSize {
  /// Small - 28px height
  sm,

  /// Medium - 32px height (default)
  md,

  /// Large - 40px height
  lg,
}

class SingularChip extends StatelessWidget {
  const SingularChip({
    super.key,
    required this.label,
    this.size = SingularChipSize.md,
    this.selected = false,
    this.disabled = false,
    this.leadingIcon,
    this.leadingAvatar,
    this.dismissible = false,
    this.onSelect,
    this.onDismiss,
  });

  /// Chip label text
  final String label;

  /// Size variant
  final SingularChipSize size;

  /// Whether the chip is selected
  final bool selected;

  /// Whether the chip is disabled
  final bool disabled;

  /// Leading icon
  final IconData? leadingIcon;

  /// Leading avatar URL or widget
  final dynamic leadingAvatar;

  /// Whether the chip can be dismissed
  final bool dismissible;

  /// Callback when chip is selected/clicked
  final VoidCallback? onSelect;

  /// Callback when chip is dismissed
  final VoidCallback? onDismiss;

  double get _height {
    switch (size) {
      case SingularChipSize.sm:
        return 28;
      case SingularChipSize.md:
        return 32;
      case SingularChipSize.lg:
        return 40;
    }
  }

  double get _fontSize {
    switch (size) {
      case SingularChipSize.sm:
        return 12;
      case SingularChipSize.md:
        return 14;
      case SingularChipSize.lg:
        return 14;
    }
  }

  double get _iconSize {
    switch (size) {
      case SingularChipSize.sm:
        return 14;
      case SingularChipSize.md:
        return 16;
      case SingularChipSize.lg:
        return 18;
    }
  }

  double get _avatarSize {
    switch (size) {
      case SingularChipSize.sm:
        return 20;
      case SingularChipSize.md:
        return 24;
      case SingularChipSize.lg:
        return 28;
    }
  }

  EdgeInsets get _padding {
    switch (size) {
      case SingularChipSize.sm:
        return const EdgeInsets.symmetric(horizontal: 10, vertical: 4);
      case SingularChipSize.md:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 6);
      case SingularChipSize.lg:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 8);
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;
    final r = context.radius;

    final effectiveOnSelect = disabled ? null : onSelect;

    // Colors based on state
    final bgColor = disabled
        ? c.bgSurfaceSoft
        : selected
            ? c.brandPrimary
            : c.bgSurface;
    final textColor = disabled
        ? c.textDisabled
        : selected
            ? c.textOnColor
            : c.textPrimary;
    final borderColor = disabled
        ? c.borderDefault
        : selected
            ? c.brandPrimary
            : c.borderDefault;

    return GestureDetector(
      onTap: effectiveOnSelect,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        height: _height,
        padding: _padding,
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: r.full,
          border: Border.all(color: borderColor, width: selected ? 0 : 1),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Leading avatar
            if (leadingAvatar != null) ...[
              _buildLeadingAvatar(c),
              SizedBox(width: size == SingularChipSize.sm ? 6 : 8),
            ]
            // Leading icon
            else if (leadingIcon != null) ...[
              Icon(
                leadingIcon,
                size: _iconSize,
                color: textColor,
              ),
              SizedBox(width: size == SingularChipSize.sm ? 4 : 6),
            ],

            // Label
            Text(
              label,
              style: t.labelMedium.copyWith(
                color: textColor,
                fontSize: _fontSize,
                fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
              ),
            ),

            // Dismiss button
            if (dismissible && !disabled) ...[
              SizedBox(width: size == SingularChipSize.sm ? 4 : 6),
              GestureDetector(
                onTap: onDismiss,
                child: Icon(
                  Iconsax.close_circle,
                  size: _iconSize,
                  color: textColor.withValues(alpha: 0.7),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildLeadingAvatar(AppColors c) {
    if (leadingAvatar is String) {
      return Container(
        width: _avatarSize,
        height: _avatarSize,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          image: DecorationImage(
            image: NetworkImage(leadingAvatar as String),
            fit: BoxFit.cover,
          ),
        ),
      );
    } else if (leadingAvatar is Widget) {
      return SizedBox(
        width: _avatarSize,
        height: _avatarSize,
        child: leadingAvatar as Widget,
      );
    }
    return const SizedBox.shrink();
  }
}

/// =============================================================================
/// SINGULAR CHIP GROUP
/// =============================================================================
/// A group of chips with single or multi-select behavior.
/// =============================================================================

class SingularChipGroup extends StatelessWidget {
  const SingularChipGroup({
    super.key,
    required this.chips,
    this.selectedValues = const [],
    this.multiSelect = false,
    this.size = SingularChipSize.md,
    this.spacing = 8,
    this.runSpacing = 8,
    this.onSelectionChanged,
  });

  /// List of chip data
  final List<SingularChipData> chips;

  /// Currently selected values
  final List<String> selectedValues;

  /// Allow multiple selection
  final bool multiSelect;

  /// Size of all chips
  final SingularChipSize size;

  /// Horizontal spacing between chips
  final double spacing;

  /// Vertical spacing between rows
  final double runSpacing;

  /// Callback when selection changes
  final ValueChanged<List<String>>? onSelectionChanged;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: spacing,
      runSpacing: runSpacing,
      children: chips.map((chip) {
        final isSelected = selectedValues.contains(chip.value);
        return SingularChip(
          label: chip.label,
          size: size,
          selected: isSelected,
          disabled: chip.disabled,
          leadingIcon: chip.leadingIcon,
          leadingAvatar: chip.leadingAvatar,
          onSelect: () {
            if (chip.disabled) return;

            List<String> newSelection;
            if (multiSelect) {
              if (isSelected) {
                newSelection =
                    selectedValues.where((v) => v != chip.value).toList();
              } else {
                newSelection = [...selectedValues, chip.value];
              }
            } else {
              newSelection = isSelected ? [] : [chip.value];
            }
            onSelectionChanged?.call(newSelection);
          },
        );
      }).toList(),
    );
  }
}

/// Data class for chip in a group
class SingularChipData {
  const SingularChipData({
    required this.value,
    required this.label,
    this.leadingIcon,
    this.leadingAvatar,
    this.disabled = false,
  });

  final String value;
  final String label;
  final IconData? leadingIcon;
  final dynamic leadingAvatar;
  final bool disabled;
}
