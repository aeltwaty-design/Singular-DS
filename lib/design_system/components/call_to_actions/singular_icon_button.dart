import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR ICON BUTTON
/// =============================================================================
/// An icon-only button for actions that can be represented by an icon alone.
///
/// ## Features
/// - 4 variants: primary, secondary, tertiary, outline
/// - 4 sizes: sm, md, lg, xl
/// - Loading state
/// - Danger mode
/// - Disabled state
/// - Accessibility label required
/// =============================================================================

/// Icon button variant determines the visual style
enum SingularIconButtonVariant {
  /// Solid background with brand primary color
  primary,

  /// Subtle background
  secondary,

  /// No background (default for icon buttons)
  tertiary,

  /// Border only
  outline,
}

/// Icon button size determines dimensions
enum SingularIconButtonSize {
  /// Small - 32px
  sm,

  /// Medium - 40px (default)
  md,

  /// Large - 48px
  lg,

  /// Extra large - 56px
  xl,
}

class SingularIconButton extends StatefulWidget {
  const SingularIconButton({
    super.key,
    required this.icon,
    required this.label,
    this.onPressed,
    this.variant = SingularIconButtonVariant.tertiary,
    this.size = SingularIconButtonSize.md,
    this.danger = false,
    this.disabled = false,
    this.loading = false,
  });

  /// The icon to display
  final IconData icon;

  /// Accessibility label (required for screen readers)
  final String label;

  /// Callback when button is pressed
  final VoidCallback? onPressed;

  /// Visual style variant
  final SingularIconButtonVariant variant;

  /// Button size
  final SingularIconButtonSize size;

  /// Use destructive/error colors
  final bool danger;

  /// Disable the button
  final bool disabled;

  /// Show loading spinner
  final bool loading;

  @override
  State<SingularIconButton> createState() => _SingularIconButtonState();
}

class _SingularIconButtonState extends State<SingularIconButton> {
  bool _isPressed = false;

  double get _size {
    switch (widget.size) {
      case SingularIconButtonSize.sm:
        return 32;
      case SingularIconButtonSize.md:
        return 40;
      case SingularIconButtonSize.lg:
        return 48;
      case SingularIconButtonSize.xl:
        return 56;
    }
  }

  double get _iconSize {
    switch (widget.size) {
      case SingularIconButtonSize.sm:
        return 16;
      case SingularIconButtonSize.md:
        return 20;
      case SingularIconButtonSize.lg:
        return 24;
      case SingularIconButtonSize.xl:
        return 28;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;

    final isDisabled = widget.disabled || widget.loading;
    final effectiveOnPressed = isDisabled ? null : widget.onPressed;

    // Get colors based on variant and state
    final (bgColor, iconColor, borderColor) = _getColors(c);

    return Semantics(
      label: widget.label,
      button: true,
      enabled: !isDisabled,
      child: GestureDetector(
        onTapDown: isDisabled ? null : (_) => setState(() => _isPressed = true),
        onTapUp: isDisabled ? null : (_) => setState(() => _isPressed = false),
        onTapCancel:
            isDisabled ? null : () => setState(() => _isPressed = false),
        onTap: effectiveOnPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: _size,
          height: _size,
          decoration: BoxDecoration(
            color: _isPressed ? bgColor.withValues(alpha: 0.8) : bgColor,
            borderRadius: r.sm,
            border: borderColor != null
                ? Border.all(color: borderColor, width: 1.5)
                : null,
          ),
          child: Center(
            child: widget.loading
                ? SizedBox(
                    width: _iconSize,
                    height: _iconSize,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(iconColor),
                    ),
                  )
                : Icon(
                    widget.icon,
                    size: _iconSize,
                    color: iconColor,
                  ),
          ),
        ),
      ),
    );
  }

  (Color bgColor, Color iconColor, Color? borderColor) _getColors(AppColors c) {
    final isDisabled = widget.disabled || widget.loading;

    if (isDisabled) {
      switch (widget.variant) {
        case SingularIconButtonVariant.primary:
          return (c.interactiveDisabled, c.textDisabled, null);
        case SingularIconButtonVariant.secondary:
          return (c.bgSurfaceSoft, c.textDisabled, null);
        case SingularIconButtonVariant.tertiary:
          return (Colors.transparent, c.textDisabled, null);
        case SingularIconButtonVariant.outline:
          return (Colors.transparent, c.textDisabled, c.borderDefault);
      }
    }

    final primaryColor = widget.danger ? c.statusError : c.brandPrimary;
    final primaryDark = widget.danger ? c.statusError : c.brandPrimaryDark;
    final primaryLight =
        widget.danger ? c.statusErrorLight : c.brandPrimaryLight;

    switch (widget.variant) {
      case SingularIconButtonVariant.primary:
        return (primaryColor, c.textOnColor, null);
      case SingularIconButtonVariant.secondary:
        return (primaryLight, primaryDark, null);
      case SingularIconButtonVariant.tertiary:
        return (Colors.transparent, primaryColor, null);
      case SingularIconButtonVariant.outline:
        return (Colors.transparent, primaryColor, primaryColor);
    }
  }
}
