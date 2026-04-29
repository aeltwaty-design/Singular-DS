import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR TOOLTIP
/// =============================================================================
/// Tooltips display informative text when users hover/tap an element.
///
/// ## Features
/// - 4 positions: top, bottom, left, right
/// - Light and dark variants
/// - Arrow indicator
/// - Custom content
/// =============================================================================

/// Tooltip position
enum SingularTooltipPosition {
  top,
  bottom,
  left,
  right,
}

/// Tooltip variant
enum SingularTooltipVariant {
  /// Light background
  light,

  /// Dark background
  dark,
}

class SingularTooltip extends StatefulWidget {
  const SingularTooltip({
    super.key,
    required this.child,
    required this.message,
    this.position = SingularTooltipPosition.top,
    this.variant = SingularTooltipVariant.dark,
    this.richMessage,
    this.showOnTap = true,
    this.showOnLongPress = false,
  });

  /// Target widget
  final Widget child;

  /// Tooltip message
  final String message;

  /// Position relative to target
  final SingularTooltipPosition position;

  /// Visual variant
  final SingularTooltipVariant variant;

  /// Rich text message
  final InlineSpan? richMessage;

  /// Show on tap
  final bool showOnTap;

  /// Show on long press
  final bool showOnLongPress;

  @override
  State<SingularTooltip> createState() => _SingularTooltipState();
}

class _SingularTooltipState extends State<SingularTooltip> {
  final _overlayController = OverlayPortalController();
  final _link = LayerLink();

  void _show() {
    _overlayController.show();
  }

  void _hide() {
    if (_overlayController.isShowing) {
      _overlayController.hide();
    }
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _link,
      child: OverlayPortal(
        controller: _overlayController,
        overlayChildBuilder: (context) => _TooltipOverlay(
          link: _link,
          message: widget.message,
          richMessage: widget.richMessage,
          position: widget.position,
          variant: widget.variant,
          onDismiss: _hide,
        ),
        child: GestureDetector(
          onTap: widget.showOnTap ? _show : null,
          onLongPress: widget.showOnLongPress ? _show : null,
          behavior: HitTestBehavior.opaque,
          child: widget.child,
        ),
      ),
    );
  }
}

class _TooltipOverlay extends StatelessWidget {
  const _TooltipOverlay({
    required this.link,
    required this.message,
    required this.richMessage,
    required this.position,
    required this.variant,
    required this.onDismiss,
  });

  final LayerLink link;
  final String message;
  final InlineSpan? richMessage;
  final SingularTooltipPosition position;
  final SingularTooltipVariant variant;
  final VoidCallback onDismiss;

  Offset get _offset {
    switch (position) {
      case SingularTooltipPosition.top:
        return const Offset(0, -8);
      case SingularTooltipPosition.bottom:
        return const Offset(0, 8);
      case SingularTooltipPosition.left:
        return const Offset(-8, 0);
      case SingularTooltipPosition.right:
        return const Offset(8, 0);
    }
  }

  Alignment get _targetAnchor {
    switch (position) {
      case SingularTooltipPosition.top:
        return Alignment.topCenter;
      case SingularTooltipPosition.bottom:
        return Alignment.bottomCenter;
      case SingularTooltipPosition.left:
        return Alignment.centerLeft;
      case SingularTooltipPosition.right:
        return Alignment.centerRight;
    }
  }

  Alignment get _followerAnchor {
    switch (position) {
      case SingularTooltipPosition.top:
        return Alignment.bottomCenter;
      case SingularTooltipPosition.bottom:
        return Alignment.topCenter;
      case SingularTooltipPosition.left:
        return Alignment.centerRight;
      case SingularTooltipPosition.right:
        return Alignment.centerLeft;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final bgColor = variant == SingularTooltipVariant.dark
        ? c.bgSurfaceInverse
        : c.bgSurface;
    final textColor = variant == SingularTooltipVariant.dark
        ? c.textInverse
        : c.textPrimary;

    return TapRegion(
      onTapOutside: (_) => onDismiss(),
      child: CompositedTransformFollower(
        link: link,
        targetAnchor: _targetAnchor,
        followerAnchor: _followerAnchor,
        offset: _offset,
        child: Material(
          color: Colors.transparent,
          child: Container(
            constraints: const BoxConstraints(maxWidth: 200),
            padding: EdgeInsets.symmetric(
              horizontal: s.sm,
              vertical: s.xs,
            ),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: r.sm,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: richMessage != null
                ? RichText(text: richMessage!)
                : Text(
                    message,
                    style: t.bodySmall.copyWith(color: textColor),
                    textAlign: TextAlign.center,
                  ),
          ),
        ),
      ),
    );
  }
}
