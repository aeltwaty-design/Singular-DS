import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SEPARATOR
/// =============================================================================
/// Visual separators for dividing content sections.
///
/// ## Features
/// - Horizontal and vertical orientations
/// - 3 variants: solid, dashed, dotted
/// - Optional label/text
/// - Customizable thickness and color
/// =============================================================================

/// Separator orientation
enum SingularSeparatorOrientation {
  /// Horizontal separator
  horizontal,

  /// Vertical separator
  vertical,
}

/// Separator variant
enum SingularSeparatorVariant {
  /// Solid line
  solid,

  /// Dashed line
  dashed,

  /// Dotted line
  dotted,
}

class SingularSeparator extends StatelessWidget {
  const SingularSeparator({
    super.key,
    this.orientation = SingularSeparatorOrientation.horizontal,
    this.variant = SingularSeparatorVariant.solid,
    this.label,
    this.thickness = 1,
    this.color,
    this.indent = 0,
    this.endIndent = 0,
  });

  /// Orientation
  final SingularSeparatorOrientation orientation;

  /// Visual variant
  final SingularSeparatorVariant variant;

  /// Optional label text
  final String? label;

  /// Line thickness
  final double thickness;

  /// Custom color
  final Color? color;

  /// Start indent
  final double indent;

  /// End indent
  final double endIndent;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    final lineColor = color ?? c.borderWeak;

    if (label != null && orientation == SingularSeparatorOrientation.horizontal) {
      return Row(
        children: [
          Expanded(child: _buildLine(lineColor)),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: s.md),
            child: Text(
              label!,
              style: t.labelSmall.copyWith(color: c.textSecondary),
            ),
          ),
          Expanded(child: _buildLine(lineColor)),
        ],
      );
    }

    return _buildLine(lineColor);
  }

  Widget _buildLine(Color lineColor) {
    if (variant == SingularSeparatorVariant.solid) {
      if (orientation == SingularSeparatorOrientation.horizontal) {
        return Divider(
          thickness: thickness,
          color: lineColor,
          indent: indent,
          endIndent: endIndent,
        );
      }
      return VerticalDivider(
        thickness: thickness,
        color: lineColor,
        indent: indent,
        endIndent: endIndent,
      );
    }

    // For dashed or dotted
    final dashWidth = variant == SingularSeparatorVariant.dashed ? 6.0 : 2.0;
    final dashSpace = variant == SingularSeparatorVariant.dashed ? 4.0 : 3.0;

    return CustomPaint(
      size: orientation == SingularSeparatorOrientation.horizontal
          ? Size(double.infinity, thickness)
          : Size(thickness, double.infinity),
      painter: _DashedLinePainter(
        color: lineColor,
        strokeWidth: thickness,
        dashWidth: dashWidth,
        dashSpace: dashSpace,
        isHorizontal: orientation == SingularSeparatorOrientation.horizontal,
      ),
    );
  }
}

class _DashedLinePainter extends CustomPainter {
  const _DashedLinePainter({
    required this.color,
    required this.strokeWidth,
    required this.dashWidth,
    required this.dashSpace,
    required this.isHorizontal,
  });

  final Color color;
  final double strokeWidth;
  final double dashWidth;
  final double dashSpace;
  final bool isHorizontal;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final maxLength = isHorizontal ? size.width : size.height;
    var currentPosition = 0.0;

    while (currentPosition < maxLength) {
      final start = isHorizontal
          ? Offset(currentPosition, size.height / 2)
          : Offset(size.width / 2, currentPosition);
      final end = isHorizontal
          ? Offset(currentPosition + dashWidth, size.height / 2)
          : Offset(size.width / 2, currentPosition + dashWidth);

      canvas.drawLine(start, end, paint);
      currentPosition += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
