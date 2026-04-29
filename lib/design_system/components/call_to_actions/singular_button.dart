import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR BUTTON
/// =============================================================================
/// A customizable button component with multiple variants, sizes, and states.
///
/// ## Features
/// - 4 variants: primary, secondary, tertiary, outline
/// - 4 sizes: sm, md, lg, xl
/// - Support for leading/trailing icons
/// - Loading state with spinner
/// - Danger mode for destructive actions
/// - Full width option
/// - Disabled state
/// =============================================================================

/// Button variant determines the visual style
enum SingularButtonVariant {
  /// Solid background with brand primary color - highest emphasis
  primary,

  /// Subtle background - medium emphasis
  secondary,

  /// No background, just text - lowest emphasis
  tertiary,

  /// Border only - alternative medium emphasis
  outline,
}

/// Button size determines height and padding
enum SingularButtonSize {
  /// Small - 30px height
  sm,

  /// Medium - 41px height (default)
  md,

  /// Large - 48px height
  lg,

  /// Extra large - 59px height
  xl,
}

class SingularButton extends StatefulWidget {
  const SingularButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = SingularButtonVariant.primary,
    this.size = SingularButtonSize.md,
    this.danger = false,
    this.disabled = false,
    this.loading = false,
    this.fullWidth = false,
    this.leftIcon,
    this.rightIcon,
  });

  /// Button label text
  final String label;

  /// Callback when button is pressed
  final VoidCallback? onPressed;

  /// Visual style variant
  final SingularButtonVariant variant;

  /// Button size
  final SingularButtonSize size;

  /// Use destructive/error colors
  final bool danger;

  /// Disable the button
  final bool disabled;

  /// Show loading spinner
  final bool loading;

  /// Make button full width
  final bool fullWidth;

  /// Icon displayed before the label
  final IconData? leftIcon;

  /// Icon displayed after the label
  final IconData? rightIcon;

  @override
  State<SingularButton> createState() => _SingularButtonState();
}

class _SingularButtonState extends State<SingularButton> {
  bool _isPressed = false;

  double get _height {
    switch (widget.size) {
      case SingularButtonSize.sm:
        return 30;
      case SingularButtonSize.md:
        return 41;
      case SingularButtonSize.lg:
        return 48;
      case SingularButtonSize.xl:
        return 59;
    }
  }

  double get _fontSize {
    switch (widget.size) {
      case SingularButtonSize.sm:
        return 12;
      case SingularButtonSize.md:
        return 14;
      case SingularButtonSize.lg:
        return 14;
      case SingularButtonSize.xl:
        return 16;
    }
  }

  double get _iconSize {
    switch (widget.size) {
      case SingularButtonSize.sm:
        return 14;
      case SingularButtonSize.md:
        return 16;
      case SingularButtonSize.lg:
        return 18;
      case SingularButtonSize.xl:
        return 20;
    }
  }

  EdgeInsets get _padding {
    switch (widget.size) {
      case SingularButtonSize.sm:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 6);
      case SingularButtonSize.md:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 10);
      case SingularButtonSize.lg:
        return const EdgeInsets.symmetric(horizontal: 20, vertical: 12);
      case SingularButtonSize.xl:
        return const EdgeInsets.symmetric(horizontal: 24, vertical: 16);
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;
    final t = context.typography;

    final isDisabled = widget.disabled || widget.loading;
    final effectiveOnPressed = isDisabled ? null : widget.onPressed;

    // Get colors based on variant and state
    final (bgColor, textColor, borderColor) = _getColors(c);

    return GestureDetector(
      onTapDown: isDisabled ? null : (_) => setState(() => _isPressed = true),
      onTapUp: isDisabled ? null : (_) => setState(() => _isPressed = false),
      onTapCancel: isDisabled ? null : () => setState(() => _isPressed = false),
      onTap: effectiveOnPressed,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: _height,
        constraints: widget.fullWidth
            ? const BoxConstraints(minWidth: double.infinity)
            : null,
        padding: _padding,
        decoration: BoxDecoration(
          color: _isPressed ? bgColor.withValues(alpha: 0.8) : bgColor,
          borderRadius: r.sm,
          border: borderColor != null
              ? Border.all(color: borderColor, width: 1.5)
              : null,
        ),
        child: Row(
          mainAxisSize: widget.fullWidth ? MainAxisSize.max : MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Loading spinner or left icon
            if (widget.loading)
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: SizedBox(
                  width: _iconSize,
                  height: _iconSize,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(textColor),
                  ),
                ),
              )
            else if (widget.leftIcon != null)
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: Icon(
                  widget.leftIcon,
                  size: _iconSize,
                  color: textColor,
                ),
              ),

            // Label
            Text(
              widget.label,
              style: t.labelLarge.copyWith(
                color: textColor,
                fontSize: _fontSize,
                fontWeight: FontWeight.w600,
              ),
            ),

            // Right icon
            if (widget.rightIcon != null && !widget.loading)
              Padding(
                padding: const EdgeInsets.only(left: 8),
                child: Icon(
                  widget.rightIcon,
                  size: _iconSize,
                  color: textColor,
                ),
              ),
          ],
        ),
      ),
    );
  }

  (Color bgColor, Color textColor, Color? borderColor) _getColors(AppColors c) {
    final isDisabled = widget.disabled || widget.loading;

    if (isDisabled) {
      switch (widget.variant) {
        case SingularButtonVariant.primary:
          return (c.interactiveDisabled, c.textDisabled, null);
        case SingularButtonVariant.secondary:
          return (c.bgSurfaceSoft, c.textDisabled, null);
        case SingularButtonVariant.tertiary:
          return (Colors.transparent, c.textDisabled, null);
        case SingularButtonVariant.outline:
          return (Colors.transparent, c.textDisabled, c.borderDefault);
      }
    }

    final primaryColor = widget.danger ? c.statusError : c.brandPrimary;
    final primaryDark = widget.danger ? c.statusError : c.brandPrimaryDark;
    final primaryLight = widget.danger ? c.statusErrorLight : c.brandPrimaryLight;

    switch (widget.variant) {
      case SingularButtonVariant.primary:
        return (primaryColor, c.textOnColor, null);
      case SingularButtonVariant.secondary:
        return (primaryLight, primaryDark, null);
      case SingularButtonVariant.tertiary:
        return (Colors.transparent, primaryColor, null);
      case SingularButtonVariant.outline:
        return (Colors.transparent, primaryColor, primaryColor);
    }
  }
}
