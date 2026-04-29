import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR IMAGE CONTAINER
/// =============================================================================
/// A container for displaying images with various aspect ratios.
///
/// ## Features
/// - Primary and secondary styles
/// - Text label support
/// - Inside and outside text positions
/// - Custom dimensions
/// =============================================================================

/// Image container type
enum SingularImageContainerType {
  /// White background with border
  primary,

  /// Neutral background
  secondary,
}

/// Text position
enum SingularImageContainerTextPosition {
  /// Text inside container overlay
  inside,

  /// Text below container
  outside,
}

class SingularImageContainer extends StatelessWidget {
  const SingularImageContainer({
    super.key,
    this.src,
    this.alt,
    this.label,
    this.type = SingularImageContainerType.secondary,
    this.textPosition = SingularImageContainerTextPosition.inside,
    this.showText = true,
    this.width = 122,
    this.height,
    this.aspectRatio,
    this.onTap,
  });

  /// Image source URL
  final String? src;

  /// Image alt text
  final String? alt;

  /// Text label
  final String? label;

  /// Container type
  final SingularImageContainerType type;

  /// Text position
  final SingularImageContainerTextPosition textPosition;

  /// Show text label
  final bool showText;

  /// Container width
  final double width;

  /// Container height (optional)
  final double? height;

  /// Aspect ratio (optional)
  final double? aspectRatio;

  /// Tap callback
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final bgColor = type == SingularImageContainerType.primary
        ? c.bgSurface
        : c.bgSurfaceSoft;
    final borderColor = type == SingularImageContainerType.primary
        ? c.borderWeak
        : Colors.transparent;

    Widget imageContainer = Container(
      width: width,
      height: height ?? (aspectRatio != null ? width / aspectRatio! : width),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.md,
        border: Border.all(color: borderColor),
      ),
      child: ClipRRect(
        borderRadius: r.md,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Image
            if (src != null)
              src!.startsWith('http')
                  ? Image.network(
                      src!,
                      fit: BoxFit.cover,
                      semanticLabel: alt,
                    )
                  : Image.asset(
                      src!,
                      fit: BoxFit.cover,
                      semanticLabel: alt,
                    )
            else
              Center(
                child: Icon(
                  Icons.image_outlined,
                  size: width / 3,
                  color: c.textDisabled,
                ),
              ),

            // Inside text overlay
            if (showText &&
                label != null &&
                textPosition == SingularImageContainerTextPosition.inside)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  padding: EdgeInsets.all(s.sm),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.6),
                      ],
                    ),
                    borderRadius: BorderRadius.vertical(
                      bottom: Radius.circular(r.md.bottomLeft.x),
                    ),
                  ),
                  child: Text(
                    label!,
                    style: t.labelSmall.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
          ],
        ),
      ),
    );

    // Wrap with gesture detector if tappable
    if (onTap != null) {
      imageContainer = GestureDetector(
        onTap: onTap,
        child: imageContainer,
      );
    }

    // Outside text position
    if (showText &&
        label != null &&
        textPosition == SingularImageContainerTextPosition.outside) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          imageContainer,
          SizedBox(height: s.xs),
          SizedBox(
            width: width,
            child: Text(
              label!,
              style: t.labelSmall.copyWith(
                color: c.textPrimary,
                fontWeight: FontWeight.w500,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      );
    }

    return imageContainer;
  }
}
