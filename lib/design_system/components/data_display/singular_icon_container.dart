import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR ICON CONTAINER
/// =============================================================================
/// A container for displaying icons with consistent styling.
///
/// ## Features
/// - Multiple sizes
/// - Color variants
/// - Shape variants (circle, square, rounded)
/// - Border option
/// =============================================================================

/// Icon container size
enum SingularIconContainerSize {
  /// Extra small - 24px
  xs,

  /// Small - 32px
  sm,

  /// Medium - 40px (default)
  md,

  /// Large - 48px
  lg,

  /// Extra large - 56px
  xl,
}

/// Icon container shape
enum SingularIconContainerShape {
  /// Circular
  circle,

  /// Square with rounded corners
  rounded,

  /// Square
  square,
}

/// Icon container color
enum SingularIconContainerColor {
  /// Brand primary
  primary,

  /// Neutral/gray
  neutral,

  /// Success green
  success,

  /// Warning amber
  warning,

  /// Error red
  error,

  /// Info blue
  info,
}

class SingularIconContainer extends StatelessWidget {
  const SingularIconContainer({
    super.key,
    required this.icon,
    this.size = SingularIconContainerSize.md,
    this.shape = SingularIconContainerShape.rounded,
    this.color = SingularIconContainerColor.primary,
    this.filled = true,
    this.bordered = false,
    this.onTap,
  });

  /// Icon to display
  final IconData icon;

  /// Size variant
  final SingularIconContainerSize size;

  /// Shape variant
  final SingularIconContainerShape shape;

  /// Color variant
  final SingularIconContainerColor color;

  /// Filled background
  final bool filled;

  /// Show border
  final bool bordered;

  /// Tap callback
  final VoidCallback? onTap;

  double get _containerSize {
    switch (size) {
      case SingularIconContainerSize.xs:
        return 24;
      case SingularIconContainerSize.sm:
        return 32;
      case SingularIconContainerSize.md:
        return 40;
      case SingularIconContainerSize.lg:
        return 48;
      case SingularIconContainerSize.xl:
        return 56;
    }
  }

  double get _iconSize {
    switch (size) {
      case SingularIconContainerSize.xs:
        return 12;
      case SingularIconContainerSize.sm:
        return 16;
      case SingularIconContainerSize.md:
        return 20;
      case SingularIconContainerSize.lg:
        return 24;
      case SingularIconContainerSize.xl:
        return 28;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;

    final (bgColor, iconColor) = _getColors(c);

    BorderRadius borderRadius;
    switch (shape) {
      case SingularIconContainerShape.circle:
        borderRadius = BorderRadius.circular(_containerSize);
      case SingularIconContainerShape.rounded:
        borderRadius = r.md;
      case SingularIconContainerShape.square:
        borderRadius = BorderRadius.zero;
    }

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: _containerSize,
        height: _containerSize,
        decoration: BoxDecoration(
          color: filled ? bgColor : Colors.transparent,
          borderRadius: borderRadius,
          border: bordered || !filled
              ? Border.all(color: iconColor, width: 1.5)
              : null,
        ),
        child: Center(
          child: Icon(
            icon,
            size: _iconSize,
            color: filled ? iconColor : iconColor,
          ),
        ),
      ),
    );
  }

  (Color bgColor, Color iconColor) _getColors(AppColors c) {
    switch (color) {
      case SingularIconContainerColor.primary:
        return (c.brandPrimary.withValues(alpha: 0.1), c.brandPrimary);
      case SingularIconContainerColor.neutral:
        return (c.bgSurfaceSoft, c.textSecondary);
      case SingularIconContainerColor.success:
        return (c.statusSuccessLight, c.statusSuccess);
      case SingularIconContainerColor.warning:
        return (c.statusWarningLight, c.statusWarning);
      case SingularIconContainerColor.error:
        return (c.statusErrorLight, c.statusError);
      case SingularIconContainerColor.info:
        return (c.statusInfoLight, c.statusInfo);
    }
  }
}
