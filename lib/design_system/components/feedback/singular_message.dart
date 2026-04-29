import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR MESSAGE
/// =============================================================================
/// Messages display empty states, informational content, or contextual feedback.
///
/// ## Features
/// - Illustration, icon, or image artwork
/// - Title and supporting text
/// - Primary and secondary types
/// - Centered and stacked alignments
/// - Multiple sizes
/// =============================================================================

/// Message artwork type
enum SingularMessageArtwork {
  /// Illustration image
  illustration,

  /// Icon
  icon,

  /// Custom image
  image,
}

/// Message type
enum SingularMessageType {
  /// Transparent background
  primary,

  /// With background
  secondary,
}

/// Message alignment
enum SingularMessageAlignment {
  /// Centered content
  centered,

  /// Left-aligned stacked content
  stacked,
}

/// Message size
enum SingularMessageSize {
  /// Small
  sm,

  /// Medium
  md,

  /// Large (default)
  lg,
}

class SingularMessage extends StatelessWidget {
  const SingularMessage({
    super.key,
    this.title,
    this.supportingText,
    this.showTitle = true,
    this.showSupportingText = true,
    this.showArtwork = true,
    this.artwork = SingularMessageArtwork.illustration,
    this.artworkSrc,
    this.icon,
    this.size = SingularMessageSize.lg,
    this.type = SingularMessageType.primary,
    this.alignment = SingularMessageAlignment.centered,
    this.action,
    this.onAction,
    this.actionLabel,
  });

  /// Title text
  final String? title;

  /// Supporting/description text
  final String? supportingText;

  /// Show title
  final bool showTitle;

  /// Show supporting text
  final bool showSupportingText;

  /// Show artwork
  final bool showArtwork;

  /// Artwork type
  final SingularMessageArtwork artwork;

  /// Artwork image source
  final String? artworkSrc;

  /// Custom icon
  final IconData? icon;

  /// Size variant
  final SingularMessageSize size;

  /// Type variant
  final SingularMessageType type;

  /// Content alignment
  final SingularMessageAlignment alignment;

  /// Custom action widget
  final Widget? action;

  /// Action button callback
  final VoidCallback? onAction;

  /// Action button label
  final String? actionLabel;

  double get _artworkSize {
    switch (size) {
      case SingularMessageSize.sm:
        return 80;
      case SingularMessageSize.md:
        return 120;
      case SingularMessageSize.lg:
        return 160;
    }
  }

  double get _iconSize {
    switch (size) {
      case SingularMessageSize.sm:
        return 32;
      case SingularMessageSize.md:
        return 40;
      case SingularMessageSize.lg:
        return 48;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final isCentered = alignment == SingularMessageAlignment.centered;

    Widget content = Column(
      crossAxisAlignment:
          isCentered ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Artwork
        if (showArtwork) ...[
          _buildArtwork(c),
          SizedBox(height: s.lg),
        ],

        // Title
        if (showTitle && title != null) ...[
          Text(
            title!,
            style: _getTitleStyle(t).copyWith(
              color: c.textPrimary,
              fontWeight: FontWeight.w600,
            ),
            textAlign: isCentered ? TextAlign.center : TextAlign.start,
          ),
        ],

        // Supporting text
        if (showSupportingText && supportingText != null) ...[
          SizedBox(height: s.xs),
          Text(
            supportingText!,
            style: t.bodyMedium.copyWith(color: c.textSecondary),
            textAlign: isCentered ? TextAlign.center : TextAlign.start,
          ),
        ],

        // Action
        if (action != null || actionLabel != null) ...[
          SizedBox(height: s.lg),
          action ??
              TextButton(
                onPressed: onAction,
                child: Text(
                  actionLabel!,
                  style: t.labelMedium.copyWith(
                    color: c.brandPrimary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
        ],
      ],
    );

    if (type == SingularMessageType.secondary) {
      content = Container(
        padding: EdgeInsets.all(s.lg),
        decoration: BoxDecoration(
          color: c.bgSurfaceSoft,
          borderRadius: r.md,
        ),
        child: content,
      );
    }

    return content;
  }

  Widget _buildArtwork(AppColors c) {
    switch (artwork) {
      case SingularMessageArtwork.illustration:
      case SingularMessageArtwork.image:
        if (artworkSrc != null) {
          return SizedBox(
            width: _artworkSize,
            height: _artworkSize,
            child: artworkSrc!.startsWith('http')
                ? Image.network(artworkSrc!, fit: BoxFit.contain)
                : Image.asset(artworkSrc!, fit: BoxFit.contain),
          );
        }
        // Fallback to icon
        return _buildIconArtwork(c);

      case SingularMessageArtwork.icon:
        return _buildIconArtwork(c);
    }
  }

  Widget _buildIconArtwork(AppColors c) {
    return Container(
      width: _artworkSize * 0.6,
      height: _artworkSize * 0.6,
      decoration: BoxDecoration(
        color: c.bgSurfaceSoft,
        shape: BoxShape.circle,
      ),
      child: Icon(
        icon ?? Iconsax.box_1,
        size: _iconSize,
        color: c.textSecondary,
      ),
    );
  }

  TextStyle _getTitleStyle(AppTypography t) {
    switch (size) {
      case SingularMessageSize.sm:
        return t.titleSmall;
      case SingularMessageSize.md:
        return t.titleMedium;
      case SingularMessageSize.lg:
        return t.titleLarge;
    }
  }
}
