import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR BADGE
/// =============================================================================
/// Badges display a small amount of information like notification counts.
///
/// ## Features
/// - 5 color variants: red, green, blue, blueLight, grey
/// - 2 sizes: sm, lg
/// - Supports numbers and short text
/// - Auto-adjusts padding for single/multi digit numbers
/// =============================================================================

/// Badge color variant for semantic meaning
enum SingularBadgeColor {
  /// Red - notifications, errors, alerts
  red,

  /// Green - success, online status
  green,

  /// Blue - information, primary
  blue,

  /// Blue Light - subtle information
  blueLight,

  /// Grey - neutral, secondary
  grey,
}

/// Badge size variant
enum SingularBadgeSize {
  /// Small - 16px height, compact
  sm,

  /// Large - auto height, more padding
  lg,
}

class SingularBadge extends StatelessWidget {
  const SingularBadge({
    super.key,
    this.value,
    this.color = SingularBadgeColor.red,
    this.size = SingularBadgeSize.lg,
    this.maxValue = 99,
  });

  /// The content to display (number or short text)
  final dynamic value;

  /// Color variant
  final SingularBadgeColor color;

  /// Size variant
  final SingularBadgeSize size;

  /// Maximum value before showing "99+"
  final int maxValue;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;
    final r = context.radius;

    // Get display text
    String displayText = '';
    if (value != null) {
      if (value is int) {
        displayText = value > maxValue ? '$maxValue+' : '$value';
      } else {
        displayText = value.toString();
      }
    }

    // Determine if single character for tighter padding
    final isSingleChar = displayText.length == 1;

    // Get colors
    final (bgColor, textColor) = _getColors(c);

    // Size dimensions
    final double height = size == SingularBadgeSize.sm ? 16 : 20;
    final double minWidth = isSingleChar ? height : height + 4;
    final double horizontalPadding = size == SingularBadgeSize.sm
        ? (isSingleChar ? 0 : 4)
        : (isSingleChar ? 0 : 6);
    final double fontSize = size == SingularBadgeSize.sm ? 10 : 12;

    // For dot badge (no value)
    if (value == null || displayText.isEmpty) {
      return Container(
        width: size == SingularBadgeSize.sm ? 8 : 10,
        height: size == SingularBadgeSize.sm ? 8 : 10,
        decoration: BoxDecoration(
          color: bgColor,
          shape: BoxShape.circle,
        ),
      );
    }

    return Container(
      height: height,
      constraints: BoxConstraints(minWidth: minWidth),
      padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.full,
      ),
      child: Center(
        child: Text(
          displayText,
          style: t.labelSmall.copyWith(
            color: textColor,
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            height: 1,
          ),
        ),
      ),
    );
  }

  (Color bgColor, Color textColor) _getColors(AppColors c) {
    switch (color) {
      case SingularBadgeColor.red:
        return (c.statusError, c.textOnColor);
      case SingularBadgeColor.green:
        return (c.statusSuccess, c.textOnColor);
      case SingularBadgeColor.blue:
        return (c.statusInfo, c.textOnColor);
      case SingularBadgeColor.blueLight:
        return (c.statusInfoLight, c.statusInfo);
      case SingularBadgeColor.grey:
        return (c.bgSurfaceSoft, c.textSecondary);
    }
  }
}
