import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR CARD
/// =============================================================================
/// Cards are versatile containers for content and actions.
///
/// ## Features
/// - 2 layout types: stacked (vertical), horizontal
/// - Composable with sub-components
/// - Elevation levels
/// - Interactive with onTap
/// =============================================================================

/// Card layout type
enum SingularCardType {
  /// Vertical stacked layout
  stacked,

  /// Horizontal compact layout
  horizontal,
}

class SingularCard extends StatefulWidget {
  const SingularCard({
    super.key,
    required this.child,
    this.type = SingularCardType.stacked,
    this.onTap,
    this.elevation = 1,
    this.padding,
  });

  /// Card content
  final Widget child;

  /// Layout type
  final SingularCardType type;

  /// Tap callback for interactive cards
  final VoidCallback? onTap;

  /// Elevation level (0-4)
  final int elevation;

  /// Custom padding (uses cardInsets by default)
  final EdgeInsets? padding;

  @override
  State<SingularCard> createState() => _SingularCardState();
}

class _SingularCardState extends State<SingularCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;
    final e = context.elevation;
    final s = context.spacing;

    final shadow = switch (widget.elevation) {
      0 => e.level0,
      1 => e.level1,
      2 => e.level2,
      3 => e.level3,
      _ => e.level4,
    };

    return GestureDetector(
      onTapDown: widget.onTap != null
          ? (_) => setState(() => _isPressed = true)
          : null,
      onTapUp: widget.onTap != null
          ? (_) => setState(() => _isPressed = false)
          : null,
      onTapCancel: widget.onTap != null
          ? () => setState(() => _isPressed = false)
          : null,
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        transform: Matrix4.identity()..scale(_isPressed ? 0.98 : 1.0),
        decoration: BoxDecoration(
          color: _isPressed ? c.interactivePressed : c.bgSurface,
          borderRadius: r.lg,
          boxShadow: _isPressed ? [] : shadow,
          border: Border.all(color: c.borderWeak, width: 1),
        ),
        padding: widget.padding ?? s.cardInsets,
        child: widget.child,
      ),
    );
  }
}

/// =============================================================================
/// CARD SUB-COMPONENTS
/// =============================================================================

/// Card media section for images
class SingularCardMedia extends StatelessWidget {
  const SingularCardMedia({
    super.key,
    this.imageUrl,
    this.height = 160,
    this.placeholder,
    this.fit = BoxFit.cover,
  });

  final String? imageUrl;
  final double height;
  final Widget? placeholder;
  final BoxFit fit;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;

    if (imageUrl == null) {
      return Container(
        height: height,
        decoration: BoxDecoration(
          color: c.bgSurfaceSoft,
          borderRadius: r.topOnly(r.md),
        ),
        child: placeholder ??
            Center(
              child: Icon(
                Icons.image_outlined,
                size: 48,
                color: c.textDisabled,
              ),
            ),
      );
    }

    return ClipRRect(
      borderRadius: r.topOnly(r.md),
      child: Image.network(
        imageUrl!,
        height: height,
        width: double.infinity,
        fit: fit,
        errorBuilder: (_, __, ___) => Container(
          height: height,
          color: c.bgSurfaceSoft,
          child: placeholder ??
              Center(
                child: Icon(
                  Icons.broken_image_outlined,
                  size: 48,
                  color: c.textDisabled,
                ),
              ),
        ),
      ),
    );
  }
}

/// Card headline text
class SingularCardHeadline extends StatelessWidget {
  const SingularCardHeadline({
    super.key,
    required this.text,
    this.maxLines = 2,
  });

  final String text;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    return Text(
      text,
      style: t.titleMedium.copyWith(
        color: c.textPrimary,
        fontWeight: FontWeight.w600,
      ),
      maxLines: maxLines,
      overflow: TextOverflow.ellipsis,
    );
  }
}

/// Card supporting text / description
class SingularCardSupportingText extends StatelessWidget {
  const SingularCardSupportingText({
    super.key,
    required this.text,
    this.maxLines = 3,
  });

  final String text;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    return Text(
      text,
      style: t.bodySmall.copyWith(color: c.textSecondary),
      maxLines: maxLines,
      overflow: TextOverflow.ellipsis,
    );
  }
}

/// Card actions row
class SingularCardActions extends StatelessWidget {
  const SingularCardActions({
    super.key,
    required this.children,
    this.alignment = MainAxisAlignment.end,
  });

  final List<Widget> children;
  final MainAxisAlignment alignment;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    return Row(
      mainAxisAlignment: alignment,
      children: children
          .expand((widget) => [widget, SizedBox(width: s.sm)])
          .toList()
        ..removeLast(),
    );
  }
}
