import 'dart:async';
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR IMAGE CAROUSEL
/// =============================================================================
/// A slideshow for cycling through a series of images.
///
/// ## Features
/// - Swipe gestures
/// - Auto-play
/// - Indicator variants (dot, dash)
/// - Navigation arrows
/// - Custom styling
/// =============================================================================

/// Indicator type
enum SingularCarouselIndicator {
  /// Dot indicators
  dot,

  /// Dash/bar indicators
  dash,

  /// Dash with progress animation
  dashProgress,
}

/// Carousel style
enum SingularCarouselStyle {
  /// Light arrows and indicators
  light,

  /// Dark arrows and indicators
  dark,

  /// Primary colored
  primary,
}

class SingularImageCarousel extends StatefulWidget {
  const SingularImageCarousel({
    super.key,
    required this.images,
    this.height = 200,
    this.style = SingularCarouselStyle.light,
    this.indicatorType = SingularCarouselIndicator.dot,
    this.showIndicator = true,
    this.showArrows = true,
    this.autoPlay = false,
    this.autoPlayInterval = const Duration(seconds: 5),
    this.onSlideChange,
    this.currentIndex,
    this.borderRadius,
  });

  /// Image URLs or asset paths
  final List<String> images;

  /// Carousel height
  final double height;

  /// Visual style
  final SingularCarouselStyle style;

  /// Indicator type
  final SingularCarouselIndicator indicatorType;

  /// Show indicators
  final bool showIndicator;

  /// Show navigation arrows
  final bool showArrows;

  /// Enable auto-play
  final bool autoPlay;

  /// Auto-play interval
  final Duration autoPlayInterval;

  /// Slide change callback
  final ValueChanged<int>? onSlideChange;

  /// Controlled current index
  final int? currentIndex;

  /// Border radius
  final BorderRadius? borderRadius;

  @override
  State<SingularImageCarousel> createState() => _SingularImageCarouselState();
}

class _SingularImageCarouselState extends State<SingularImageCarousel> {
  late PageController _pageController;
  late int _currentIndex;
  Timer? _autoPlayTimer;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.currentIndex ?? 0;
    _pageController = PageController(initialPage: _currentIndex);
    _startAutoPlay();
  }

  @override
  void didUpdateWidget(SingularImageCarousel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.currentIndex != null && widget.currentIndex != _currentIndex) {
      _goToPage(widget.currentIndex!);
    }
    if (widget.autoPlay != oldWidget.autoPlay) {
      widget.autoPlay ? _startAutoPlay() : _stopAutoPlay();
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    _stopAutoPlay();
    super.dispose();
  }

  void _startAutoPlay() {
    if (!widget.autoPlay) return;
    _autoPlayTimer = Timer.periodic(widget.autoPlayInterval, (_) {
      final nextPage = (_currentIndex + 1) % widget.images.length;
      _goToPage(nextPage);
    });
  }

  void _stopAutoPlay() {
    _autoPlayTimer?.cancel();
    _autoPlayTimer = null;
  }

  void _goToPage(int index) {
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _onPageChanged(int index) {
    setState(() => _currentIndex = index);
    widget.onSlideChange?.call(index);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;

    final arrowColor = switch (widget.style) {
      SingularCarouselStyle.light => Colors.white,
      SingularCarouselStyle.dark => c.textPrimary,
      SingularCarouselStyle.primary => c.brandPrimary,
    };

    return ClipRRect(
      borderRadius: widget.borderRadius ?? r.md,
      child: SizedBox(
        height: widget.height,
        child: Stack(
          children: [
            // Images
            PageView.builder(
              controller: _pageController,
              onPageChanged: _onPageChanged,
              itemCount: widget.images.length,
              itemBuilder: (context, index) {
                final image = widget.images[index];
                return image.startsWith('http')
                    ? Image.network(
                        image,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: double.infinity,
                      )
                    : Image.asset(
                        image,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: double.infinity,
                      );
              },
            ),

            // Gradient overlay for indicators
            if (widget.showIndicator)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.4),
                      ],
                    ),
                  ),
                ),
              ),

            // Navigation arrows
            if (widget.showArrows && widget.images.length > 1) ...[
              // Previous
              Positioned(
                left: s.sm,
                top: 0,
                bottom: 0,
                child: Center(
                  child: _CarouselArrow(
                    icon: Iconsax.arrow_left_2,
                    color: arrowColor,
                    onTap: _currentIndex > 0
                        ? () => _goToPage(_currentIndex - 1)
                        : null,
                  ),
                ),
              ),
              // Next
              Positioned(
                right: s.sm,
                top: 0,
                bottom: 0,
                child: Center(
                  child: _CarouselArrow(
                    icon: Iconsax.arrow_right_3,
                    color: arrowColor,
                    onTap: _currentIndex < widget.images.length - 1
                        ? () => _goToPage(_currentIndex + 1)
                        : null,
                  ),
                ),
              ),
            ],

            // Indicators
            if (widget.showIndicator)
              Positioned(
                bottom: s.md,
                left: 0,
                right: 0,
                child: _CarouselIndicators(
                  count: widget.images.length,
                  currentIndex: _currentIndex,
                  type: widget.indicatorType,
                  style: widget.style,
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _CarouselArrow extends StatelessWidget {
  const _CarouselArrow({
    required this.icon,
    required this.color,
    this.onTap,
  });

  final IconData icon;
  final Color color;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.3),
          shape: BoxShape.circle,
        ),
        child: Icon(
          icon,
          size: 20,
          color: onTap != null ? color : color.withValues(alpha: 0.5),
        ),
      ),
    );
  }
}

class _CarouselIndicators extends StatelessWidget {
  const _CarouselIndicators({
    required this.count,
    required this.currentIndex,
    required this.type,
    required this.style,
  });

  final int count;
  final int currentIndex;
  final SingularCarouselIndicator type;
  final SingularCarouselStyle style;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;
    final activeColor = switch (style) {
      SingularCarouselStyle.light => Colors.white,
      SingularCarouselStyle.dark => context.colors.textPrimary,
      SingularCarouselStyle.primary => context.colors.brandPrimary,
    };
    final inactiveColor = activeColor.withValues(alpha: 0.4);

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(count, (index) {
        final isActive = index == currentIndex;
        final width = type == SingularCarouselIndicator.dot ? 8.0 : 24.0;

        return AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: isActive ? (type == SingularCarouselIndicator.dot ? 8 : 24) : width,
          height: type == SingularCarouselIndicator.dot ? 8 : 4,
          margin: EdgeInsets.symmetric(horizontal: s.xxs),
          decoration: BoxDecoration(
            color: isActive ? activeColor : inactiveColor,
            borderRadius: BorderRadius.circular(4),
          ),
        );
      }),
    );
  }
}
