import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SKELETON
/// =============================================================================
/// Skeleton loading placeholders for content that is loading.
///
/// ## Features
/// - Text, circular, rectangular variants
/// - Animated shimmer effect
/// - Customizable sizes
/// =============================================================================

/// Skeleton variant
enum SingularSkeletonVariant {
  /// Rectangular skeleton
  rectangular,

  /// Circular skeleton (for avatars)
  circular,

  /// Text line skeleton
  text,
}

class SingularSkeleton extends StatefulWidget {
  const SingularSkeleton({
    super.key,
    this.variant = SingularSkeletonVariant.rectangular,
    this.width,
    this.height,
    this.borderRadius,
    this.animate = true,
  });

  /// Skeleton variant
  final SingularSkeletonVariant variant;

  /// Width
  final double? width;

  /// Height
  final double? height;

  /// Border radius override
  final BorderRadius? borderRadius;

  /// Enable animation
  final bool animate;

  /// Create a text skeleton
  factory SingularSkeleton.text({
    double? width,
    double height = 16,
    bool animate = true,
  }) =>
      SingularSkeleton(
        variant: SingularSkeletonVariant.text,
        width: width,
        height: height,
        animate: animate,
      );

  /// Create a circular skeleton
  factory SingularSkeleton.circular({
    double size = 40,
    bool animate = true,
  }) =>
      SingularSkeleton(
        variant: SingularSkeletonVariant.circular,
        width: size,
        height: size,
        animate: animate,
      );

  /// Create a rectangular skeleton
  factory SingularSkeleton.rectangular({
    double? width,
    double height = 100,
    BorderRadius? borderRadius,
    bool animate = true,
  }) =>
      SingularSkeleton(
        variant: SingularSkeletonVariant.rectangular,
        width: width,
        height: height,
        borderRadius: borderRadius,
        animate: animate,
      );

  @override
  State<SingularSkeleton> createState() => _SingularSkeletonState();
}

class _SingularSkeletonState extends State<SingularSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _animation = Tween<double>(begin: -1, end: 2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
    if (widget.animate) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;

    final baseColor = c.bgSurfaceSoft;
    final highlightColor = c.bgSurface;

    BorderRadius borderRadius;
    switch (widget.variant) {
      case SingularSkeletonVariant.circular:
        borderRadius = BorderRadius.circular(1000);
      case SingularSkeletonVariant.text:
        borderRadius = r.xs;
      case SingularSkeletonVariant.rectangular:
        borderRadius = widget.borderRadius ?? r.sm;
    }

    final width = widget.width ??
        (widget.variant == SingularSkeletonVariant.text ? double.infinity : 100);
    final height = widget.height ??
        (widget.variant == SingularSkeletonVariant.text ? 16 : 100);

    if (!widget.animate) {
      return Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: baseColor,
          borderRadius: borderRadius,
        ),
      );
    }

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            borderRadius: borderRadius,
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [
                baseColor,
                highlightColor,
                baseColor,
              ],
              stops: [
                (_animation.value - 0.3).clamp(0.0, 1.0),
                _animation.value.clamp(0.0, 1.0),
                (_animation.value + 0.3).clamp(0.0, 1.0),
              ],
            ),
          ),
        );
      },
    );
  }
}

/// Skeleton group for common patterns
class SingularSkeletonGroup extends StatelessWidget {
  const SingularSkeletonGroup({
    super.key,
    this.count = 3,
    this.spacing = 12,
    this.itemBuilder,
  });

  /// Number of items
  final int count;

  /// Spacing between items
  final double spacing;

  /// Custom item builder
  final Widget Function(BuildContext context, int index)? itemBuilder;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(count, (index) {
        return Padding(
          padding: EdgeInsets.only(bottom: index < count - 1 ? spacing : 0),
          child: itemBuilder?.call(context, index) ?? _defaultItem(context),
        );
      }),
    );
  }

  Widget _defaultItem(BuildContext context) {
    final s = context.spacing;

    return Row(
      children: [
        SingularSkeleton.circular(size: 40),
        SizedBox(width: s.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingularSkeleton.text(width: 120, height: 14),
              SizedBox(height: s.xs),
              SingularSkeleton.text(height: 12),
            ],
          ),
        ),
      ],
    );
  }
}
