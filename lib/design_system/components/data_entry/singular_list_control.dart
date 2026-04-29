import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR LIST CONTROL
/// =============================================================================
/// Checkboxes, radios, and toggles for selection and toggling states.
///
/// ## Features
/// - 3 types: checkbox, radio, toggle
/// - 2 sizes: sm, md
/// - 2 variants: full-width, widget
/// - Title and description support
/// - Trailing icon support
/// - Disabled state
/// =============================================================================

/// Control type
enum SingularListControlType {
  /// Checkbox for multi-select
  checkbox,

  /// Radio for single-select
  radio,

  /// Toggle/switch
  toggle,
}

/// Control size
enum SingularListControlSize {
  /// Small - 16px control
  sm,

  /// Medium - 20px control (default)
  md,
}

/// Control variant
enum SingularListControlVariant {
  /// Full width inline
  fullWidth,

  /// Widget with border container
  widget,
}

class SingularListControl extends StatelessWidget {
  const SingularListControl({
    super.key,
    this.type = SingularListControlType.checkbox,
    this.size = SingularListControlSize.md,
    this.variant = SingularListControlVariant.fullWidth,
    this.selected = false,
    this.disabled = false,
    this.title,
    this.description,
    this.trailingIcon,
    this.showTrailingIcon = false,
    this.onChange,
  });

  /// Control type
  final SingularListControlType type;

  /// Size variant
  final SingularListControlSize size;

  /// Visual variant
  final SingularListControlVariant variant;

  /// Whether selected/checked
  final bool selected;

  /// Disabled state
  final bool disabled;

  /// Title text
  final String? title;

  /// Description text
  final String? description;

  /// Trailing icon
  final IconData? trailingIcon;

  /// Show trailing icon
  final bool showTrailingIcon;

  /// Selection change callback
  final ValueChanged<bool>? onChange;

  double get _controlSize {
    return size == SingularListControlSize.sm ? 16 : 20;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final content = GestureDetector(
      onTap: disabled ? null : () => onChange?.call(!selected),
      behavior: HitTestBehavior.opaque,
      child: Row(
        children: [
          // Control
          _buildControl(c, r),

          // Title and description
          if (title != null) ...[
            SizedBox(width: s.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    title!,
                    style: t.bodyMedium.copyWith(
                      color: disabled ? c.textDisabled : c.textPrimary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (description != null) ...[
                    SizedBox(height: s.xxs),
                    Text(
                      description!,
                      style: t.bodySmall.copyWith(
                        color: disabled ? c.textDisabled : c.textSecondary,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],

          // Trailing icon
          if (showTrailingIcon && trailingIcon != null) ...[
            SizedBox(width: s.md),
            Icon(
              trailingIcon,
              size: 20,
              color: disabled ? c.textDisabled : c.textSecondary,
            ),
          ],
        ],
      ),
    );

    // Apply variant styling
    if (variant == SingularListControlVariant.widget) {
      return Container(
        padding: EdgeInsets.all(s.md),
        decoration: BoxDecoration(
          color: c.bgSurface,
          borderRadius: r.md,
          border: Border.all(
            color: selected ? c.brandPrimary : c.borderDefault,
            width: selected ? 2 : 1,
          ),
        ),
        child: content,
      );
    }

    return content;
  }

  Widget _buildControl(AppColors c, AppRadius r) {
    switch (type) {
      case SingularListControlType.checkbox:
        return _buildCheckbox(c, r);
      case SingularListControlType.radio:
        return _buildRadio(c);
      case SingularListControlType.toggle:
        return _buildToggle(c, r);
    }
  }

  Widget _buildCheckbox(AppColors c, AppRadius r) {
    final color = disabled
        ? c.textDisabled
        : selected
            ? c.brandPrimary
            : c.borderDefault;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      width: _controlSize,
      height: _controlSize,
      decoration: BoxDecoration(
        color: selected ? color : Colors.transparent,
        borderRadius: r.xs,
        border: Border.all(color: color, width: 2),
      ),
      child: selected
          ? Icon(
              Icons.check,
              size: _controlSize - 4,
              color: c.textOnColor,
            )
          : null,
    );
  }

  Widget _buildRadio(AppColors c) {
    final color = disabled
        ? c.textDisabled
        : selected
            ? c.brandPrimary
            : c.borderDefault;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      width: _controlSize,
      height: _controlSize,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: color, width: 2),
      ),
      child: selected
          ? Center(
              child: Container(
                width: _controlSize - 8,
                height: _controlSize - 8,
                decoration: BoxDecoration(
                  color: color,
                  shape: BoxShape.circle,
                ),
              ),
            )
          : null,
    );
  }

  Widget _buildToggle(AppColors c, AppRadius r) {
    final trackWidth = _controlSize * 1.8;
    final trackHeight = _controlSize;
    final thumbSize = _controlSize - 4;

    final trackColor = disabled
        ? c.bgSurfaceSoft
        : selected
            ? c.brandPrimary
            : c.borderDefault;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: trackWidth,
      height: trackHeight,
      decoration: BoxDecoration(
        color: trackColor,
        borderRadius: r.full,
      ),
      child: AnimatedAlign(
        duration: const Duration(milliseconds: 200),
        alignment: selected ? Alignment.centerRight : Alignment.centerLeft,
        child: Container(
          width: thumbSize,
          height: thumbSize,
          margin: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            color: c.bgSurface,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.1),
                blurRadius: 2,
                offset: const Offset(0, 1),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
