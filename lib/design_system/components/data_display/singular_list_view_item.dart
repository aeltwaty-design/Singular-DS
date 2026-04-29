import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';
import 'singular_tag.dart';

/// =============================================================================
/// SINGULAR LIST VIEW ITEM
/// =============================================================================
/// Lists present content in a continuous, vertical index.
///
/// ## Features
/// - 2 sizes: sm, md
/// - 2 themes: widget (card), full (no container)
/// - Leading content: icon, image, or none
/// - Trailing content: icon, tag, text, hyperlink
/// - Disabled state
/// =============================================================================

/// List view item size
enum SingularListViewItemSize {
  /// Small - compact
  sm,

  /// Medium - standard (default)
  md,
}

/// List view item theme
enum SingularListViewItemTheme {
  /// Widget - card-like with border and background
  widget,

  /// Full - transparent, no container
  full,
}

/// Leading content type
enum SingularListViewItemLeading {
  /// No leading content
  none,

  /// Icon leading
  icon,

  /// Image leading
  image,
}

/// Trailing content type
enum SingularListViewItemTrailing {
  /// No trailing content
  none,

  /// Icon trailing (chevron by default)
  icon,

  /// Tag trailing
  tag,

  /// Text trailing
  text,

  /// Hyperlink trailing
  hyperlink,
}

class SingularListViewItem extends StatelessWidget {
  const SingularListViewItem({
    super.key,
    required this.title,
    this.description,
    this.size = SingularListViewItemSize.md,
    this.theme = SingularListViewItemTheme.widget,
    this.leading = SingularListViewItemLeading.icon,
    this.leadingIcon,
    this.leadingIconColor,
    this.leadingImage,
    this.trailing = SingularListViewItemTrailing.none,
    this.trailingIcon,
    this.trailingText,
    this.trailingTag,
    this.trailingTagColor,
    this.onTap,
    this.onTrailingTap,
    this.disabled = false,
  });

  /// Main title text
  final String title;

  /// Supporting description text
  final String? description;

  /// Size variant
  final SingularListViewItemSize size;

  /// Theme variant
  final SingularListViewItemTheme theme;

  /// Leading content type
  final SingularListViewItemLeading leading;

  /// Custom leading icon
  final IconData? leadingIcon;

  /// Custom leading icon color
  final Color? leadingIconColor;

  /// Leading image URL
  final String? leadingImage;

  /// Trailing content type
  final SingularListViewItemTrailing trailing;

  /// Custom trailing icon
  final IconData? trailingIcon;

  /// Trailing text content
  final String? trailingText;

  /// Trailing tag text
  final String? trailingTag;

  /// Trailing tag color
  final SingularTagColor? trailingTagColor;

  /// Tap callback
  final VoidCallback? onTap;

  /// Trailing tap callback (for hyperlink)
  final VoidCallback? onTrailingTap;

  /// Disabled state
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final verticalPadding = size == SingularListViewItemSize.sm ? s.sm : s.md;
    final horizontalPadding = s.md;
    final iconContainerSize = size == SingularListViewItemSize.sm ? 36.0 : 44.0;
    final iconSize = size == SingularListViewItemSize.sm ? 18.0 : 22.0;
    final imageSize = size == SingularListViewItemSize.sm ? 40.0 : 48.0;

    final content = Row(
      children: [
        // Leading
        if (leading == SingularListViewItemLeading.icon) ...[
          Container(
            width: iconContainerSize,
            height: iconContainerSize,
            decoration: BoxDecoration(
              color: c.brandPrimaryLight,
              borderRadius: r.md,
            ),
            child: Center(
              child: Icon(
                leadingIcon ?? Iconsax.document,
                size: iconSize,
                color: disabled
                    ? c.textDisabled
                    : (leadingIconColor ?? c.brandPrimary),
              ),
            ),
          ),
          SizedBox(width: s.md),
        ] else if (leading == SingularListViewItemLeading.image &&
            leadingImage != null) ...[
          ClipRRect(
            borderRadius: r.md,
            child: Image.network(
              leadingImage!,
              width: imageSize,
              height: imageSize,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                width: imageSize,
                height: imageSize,
                color: c.bgSurfaceSoft,
                child: Icon(
                  Iconsax.image,
                  size: iconSize,
                  color: c.textDisabled,
                ),
              ),
            ),
          ),
          SizedBox(width: s.md),
        ],

        // Content
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                title,
                style: t.bodyMedium.copyWith(
                  color: disabled ? c.textDisabled : c.textPrimary,
                  fontWeight: FontWeight.w500,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              if (description != null) ...[
                SizedBox(height: s.xxs),
                Text(
                  description!,
                  style: t.bodySmall.copyWith(
                    color: disabled ? c.textDisabled : c.textSecondary,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ],
          ),
        ),

        // Trailing
        SizedBox(width: s.sm),
        _buildTrailing(c, t),
      ],
    );

    // Apply theme styling
    if (theme == SingularListViewItemTheme.widget) {
      return GestureDetector(
        onTap: disabled ? null : onTap,
        child: Container(
          padding: EdgeInsets.symmetric(
            vertical: verticalPadding,
            horizontal: horizontalPadding,
          ),
          decoration: BoxDecoration(
            color: c.bgSurface,
            borderRadius: r.md,
            border: Border.all(color: c.borderWeak),
          ),
          child: content,
        ),
      );
    }

    // Full theme - no container
    return GestureDetector(
      onTap: disabled ? null : onTap,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: verticalPadding),
        child: content,
      ),
    );
  }

  Widget _buildTrailing(AppColors c, AppTypography t) {
    switch (trailing) {
      case SingularListViewItemTrailing.none:
        return const SizedBox.shrink();

      case SingularListViewItemTrailing.icon:
        return Icon(
          trailingIcon ?? Iconsax.arrow_right_3,
          size: 20,
          color: disabled ? c.textDisabled : c.textSecondary,
        );

      case SingularListViewItemTrailing.tag:
        return SingularTag(
          label: trailingTag ?? '',
          color: trailingTagColor ?? SingularTagColor.grey,
          size: SingularTagSize.sm,
        );

      case SingularListViewItemTrailing.text:
        return Text(
          trailingText ?? '',
          style: t.bodySmall.copyWith(
            color: disabled ? c.textDisabled : c.textSecondary,
          ),
        );

      case SingularListViewItemTrailing.hyperlink:
        return GestureDetector(
          onTap: disabled ? null : onTrailingTap,
          child: Text(
            trailingText ?? 'View',
            style: t.labelMedium.copyWith(
              color: disabled ? c.textDisabled : c.brandPrimary,
              fontWeight: FontWeight.w500,
            ),
          ),
        );
    }
  }
}
