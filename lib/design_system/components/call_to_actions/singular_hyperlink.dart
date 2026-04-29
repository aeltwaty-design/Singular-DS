import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR HYPERLINK
/// =============================================================================
/// Clickable text links for navigation or actions.
///
/// ## Features
/// - 3 variants: inline (underlined), standalone, withIcon
/// - 3 sizes: sm, md, lg
/// - Disabled state
/// - Custom icons
/// =============================================================================

/// Hyperlink variant
enum SingularHyperlinkVariant {
  /// Inline underlined text
  inline,

  /// Standalone link without underline
  standalone,

  /// Link with trailing icon
  withIcon,
}

/// Hyperlink size
enum SingularHyperlinkSize {
  /// Small - 12px
  sm,

  /// Medium - 14px (default)
  md,

  /// Large - 16px
  lg,
}

class SingularHyperlink extends StatelessWidget {
  const SingularHyperlink({
    super.key,
    required this.text,
    required this.onTap,
    this.variant = SingularHyperlinkVariant.inline,
    this.size = SingularHyperlinkSize.md,
    this.disabled = false,
    this.icon,
  });

  /// Link text
  final String text;

  /// Tap callback
  final VoidCallback onTap;

  /// Visual variant
  final SingularHyperlinkVariant variant;

  /// Size
  final SingularHyperlinkSize size;

  /// Disabled state
  final bool disabled;

  /// Custom icon (for withIcon variant)
  final IconData? icon;

  double get _fontSize {
    switch (size) {
      case SingularHyperlinkSize.sm:
        return 12;
      case SingularHyperlinkSize.md:
        return 14;
      case SingularHyperlinkSize.lg:
        return 16;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    final textColor = disabled ? c.textDisabled : c.brandPrimary;

    return GestureDetector(
      onTap: disabled ? null : onTap,
      behavior: HitTestBehavior.opaque,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            text,
            style: TextStyle(
              color: textColor,
              fontSize: _fontSize,
              fontWeight: FontWeight.w500,
              decoration: variant == SingularHyperlinkVariant.inline
                  ? TextDecoration.underline
                  : TextDecoration.none,
              decorationColor: textColor,
            ),
          ),
          if (variant == SingularHyperlinkVariant.withIcon) ...[
            const SizedBox(width: 4),
            Icon(
              icon ?? Iconsax.arrow_right_1,
              size: _fontSize,
              color: textColor,
            ),
          ],
        ],
      ),
    );
  }
}
