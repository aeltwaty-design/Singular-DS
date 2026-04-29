import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR TAG
/// =============================================================================
/// Tags are used to label, categorize, or organize items.
///
/// ## Features
/// - 6 color variants for semantic meaning
/// - 2 sizes: sm, md
/// - Optional leading dot indicator
/// - Non-interactive (display only)
/// =============================================================================

/// Tag color variant
enum SingularTagColor {
  /// Grey - default, neutral
  grey,

  /// Primary - brand color
  primary,

  /// Success - positive, completed
  success,

  /// Warning - attention needed
  warning,

  /// Error - negative, failed
  error,

  /// Info - informational
  info,
}

/// Tag size variant
enum SingularTagSize {
  /// Small - 20px height
  sm,

  /// Medium - 24px height (default)
  md,
}

class SingularTag extends StatelessWidget {
  const SingularTag({
    super.key,
    required this.label,
    this.color = SingularTagColor.grey,
    this.size = SingularTagSize.md,
    this.showDot = false,
  });

  /// Tag label text
  final String label;

  /// Color variant
  final SingularTagColor color;

  /// Size variant
  final SingularTagSize size;

  /// Show leading dot indicator
  final bool showDot;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;
    final r = context.radius;

    final (bgColor, textColor, dotColor) = _getColors(c);

    final height = size == SingularTagSize.sm ? 20.0 : 24.0;
    final fontSize = size == SingularTagSize.sm ? 11.0 : 12.0;
    final horizontalPadding = size == SingularTagSize.sm ? 6.0 : 8.0;
    final dotSize = size == SingularTagSize.sm ? 4.0 : 6.0;

    return Container(
      height: height,
      padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.xs,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Dot indicator
          if (showDot) ...[
            Container(
              width: dotSize,
              height: dotSize,
              decoration: BoxDecoration(
                color: dotColor,
                shape: BoxShape.circle,
              ),
            ),
            SizedBox(width: size == SingularTagSize.sm ? 4 : 6),
          ],

          // Label
          Text(
            label,
            style: t.labelSmall.copyWith(
              color: textColor,
              fontSize: fontSize,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  (Color bgColor, Color textColor, Color dotColor) _getColors(AppColors c) {
    switch (color) {
      case SingularTagColor.grey:
        return (c.bgSurfaceSoft, c.textSecondary, c.textSecondary);
      case SingularTagColor.primary:
        return (c.brandPrimaryLight, c.brandPrimary, c.brandPrimary);
      case SingularTagColor.success:
        return (c.statusSuccessLight, c.statusSuccess, c.statusSuccess);
      case SingularTagColor.warning:
        return (c.statusWarningLight, c.statusWarning, c.statusWarning);
      case SingularTagColor.error:
        return (c.statusErrorLight, c.statusError, c.statusError);
      case SingularTagColor.info:
        return (c.statusInfoLight, c.statusInfo, c.statusInfo);
    }
  }
}
