import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR AVATAR
/// =============================================================================
/// Avatars represent users or entities with images or initials.
///
/// ## Features
/// - 6 sizes: xs, sm, md, lg, xl, xxl
/// - 2 shapes: circle, square
/// - Image support with fallback
/// - Initials fallback
/// - Placeholder icon fallback
/// =============================================================================

/// Avatar size variant
enum SingularAvatarSize {
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

  /// Double extra large - 64px
  xxl,
}

/// Avatar shape
enum SingularAvatarShape {
  /// Circular avatar
  circle,

  /// Square avatar with rounded corners
  square,
}

class SingularAvatar extends StatelessWidget {
  const SingularAvatar({
    super.key,
    this.imageUrl,
    this.fallback,
    this.size = SingularAvatarSize.md,
    this.shape = SingularAvatarShape.circle,
    this.showPlaceholder = true,
    this.backgroundColor,
  });

  /// Image URL to display
  final String? imageUrl;

  /// Fallback text (initials) when no image
  final String? fallback;

  /// Avatar size
  final SingularAvatarSize size;

  /// Avatar shape
  final SingularAvatarShape shape;

  /// Show placeholder icon when no image or fallback
  final bool showPlaceholder;

  /// Custom background color
  final Color? backgroundColor;

  double get _size {
    switch (size) {
      case SingularAvatarSize.xs:
        return 24;
      case SingularAvatarSize.sm:
        return 32;
      case SingularAvatarSize.md:
        return 40;
      case SingularAvatarSize.lg:
        return 48;
      case SingularAvatarSize.xl:
        return 56;
      case SingularAvatarSize.xxl:
        return 64;
    }
  }

  double get _fontSize {
    switch (size) {
      case SingularAvatarSize.xs:
        return 10;
      case SingularAvatarSize.sm:
        return 12;
      case SingularAvatarSize.md:
        return 14;
      case SingularAvatarSize.lg:
        return 16;
      case SingularAvatarSize.xl:
        return 20;
      case SingularAvatarSize.xxl:
        return 24;
    }
  }

  double get _iconSize {
    switch (size) {
      case SingularAvatarSize.xs:
        return 12;
      case SingularAvatarSize.sm:
        return 16;
      case SingularAvatarSize.md:
        return 20;
      case SingularAvatarSize.lg:
        return 24;
      case SingularAvatarSize.xl:
        return 28;
      case SingularAvatarSize.xxl:
        return 32;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;
    final r = context.radius;

    final borderRadius = shape == SingularAvatarShape.circle
        ? BorderRadius.circular(_size / 2)
        : r.md;

    final bgColor = backgroundColor ??
        (imageUrl == null ? c.brandPrimaryLight : c.bgSurfaceSoft);

    return Container(
      width: _size,
      height: _size,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: borderRadius,
        image: imageUrl != null
            ? DecorationImage(
                image: NetworkImage(imageUrl!),
                fit: BoxFit.cover,
                onError: (_, __) {},
              )
            : null,
      ),
      child: imageUrl == null ? _buildFallback(c, t) : null,
    );
  }

  Widget _buildFallback(AppColors c, AppTypography t) {
    // Show initials if provided
    if (fallback != null && fallback!.isNotEmpty) {
      // Get first 1-2 characters
      final initials = fallback!.length > 2
          ? fallback!.substring(0, 2).toUpperCase()
          : fallback!.toUpperCase();

      return Center(
        child: Text(
          initials,
          style: t.labelMedium.copyWith(
            color: c.brandPrimary,
            fontSize: _fontSize,
            fontWeight: FontWeight.w600,
          ),
        ),
      );
    }

    // Show placeholder icon
    if (showPlaceholder) {
      return Center(
        child: Icon(
          Iconsax.user,
          size: _iconSize,
          color: c.textDisabled,
        ),
      );
    }

    return const SizedBox.shrink();
  }
}

/// =============================================================================
/// SINGULAR AVATAR GROUP
/// =============================================================================
/// Display a group of avatars with overlap and overflow indicator.
/// =============================================================================

class SingularAvatarGroup extends StatelessWidget {
  const SingularAvatarGroup({
    super.key,
    required this.avatars,
    this.max = 4,
    this.size = SingularAvatarSize.md,
    this.showTrailingText = false,
    this.trailingText,
  });

  /// List of avatar data
  final List<SingularAvatarData> avatars;

  /// Maximum avatars to show before +N indicator
  final int max;

  /// Size of all avatars
  final SingularAvatarSize size;

  /// Show trailing text after avatars
  final bool showTrailingText;

  /// Trailing text content (e.g., "2.1K followers")
  final String? trailingText;

  double get _size {
    switch (size) {
      case SingularAvatarSize.xs:
        return 24;
      case SingularAvatarSize.sm:
        return 32;
      case SingularAvatarSize.md:
        return 40;
      case SingularAvatarSize.lg:
        return 48;
      case SingularAvatarSize.xl:
        return 56;
      case SingularAvatarSize.xxl:
        return 64;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    final visibleAvatars = avatars.take(max).toList();
    final overflowCount = avatars.length - max;
    final overlap = _size * 0.3;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Avatars stack
        SizedBox(
          height: _size,
          child: Stack(
            children: [
              // Visible avatars
              for (int i = 0; i < visibleAvatars.length; i++)
                Positioned(
                  left: i * (_size - overlap),
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: c.bgPrimary, width: 2),
                    ),
                    child: SingularAvatar(
                      imageUrl: visibleAvatars[i].imageUrl,
                      fallback: visibleAvatars[i].fallback,
                      size: size,
                    ),
                  ),
                ),

              // Overflow indicator
              if (overflowCount > 0)
                Positioned(
                  left: visibleAvatars.length * (_size - overlap),
                  child: Container(
                    width: _size,
                    height: _size,
                    decoration: BoxDecoration(
                      color: c.bgSurfaceSoft,
                      shape: BoxShape.circle,
                      border: Border.all(color: c.bgPrimary, width: 2),
                    ),
                    child: Center(
                      child: Text(
                        '+$overflowCount',
                        style: t.labelSmall.copyWith(
                          color: c.textSecondary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),

        // Trailing text
        if (showTrailingText && trailingText != null) ...[
          SizedBox(width: _size * 0.25),
          Text(
            trailingText!,
            style: t.bodySmall.copyWith(color: c.textSecondary),
          ),
        ],
      ],
    );
  }
}

/// Data class for avatar in a group
class SingularAvatarData {
  const SingularAvatarData({
    this.imageUrl,
    this.fallback,
  });

  final String? imageUrl;
  final String? fallback;
}
