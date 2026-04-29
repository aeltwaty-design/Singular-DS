import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SECTION HEADER
/// =============================================================================
/// Section headers display section titles with optional supporting text and actions.
///
/// ## Features
/// - 4 sizes: xl, lg, md, sm
/// - Optional supporting text
/// - Optional leading icon
/// - Optional help icon
/// - Optional trailing action (hyperlink or icon)
/// - Optional bottom separator
/// =============================================================================

/// Section header size variant
enum SingularSectionHeaderSize {
  /// Extra large - 24px title
  xl,

  /// Large - 20px title (default)
  lg,

  /// Medium - 16px title
  md,

  /// Small - 14px title
  sm,
}

class SingularSectionHeader extends StatelessWidget {
  const SingularSectionHeader({
    super.key,
    required this.title,
    this.supportingText,
    this.size = SingularSectionHeaderSize.lg,
    this.leadingIcon,
    this.showHelpIcon = false,
    this.onHelpTap,
    this.trailingAction,
    this.onTrailingActionTap,
    this.trailingIcon,
    this.onTrailingIconTap,
    this.showSeparator = false,
  });

  /// Main title text
  final String title;

  /// Supporting description text
  final String? supportingText;

  /// Size variant
  final SingularSectionHeaderSize size;

  /// Leading icon
  final IconData? leadingIcon;

  /// Show help icon after title
  final bool showHelpIcon;

  /// Help icon tap callback
  final VoidCallback? onHelpTap;

  /// Trailing action text (hyperlink style)
  final String? trailingAction;

  /// Trailing action tap callback
  final VoidCallback? onTrailingActionTap;

  /// Trailing icon (alternative to action text)
  final IconData? trailingIcon;

  /// Trailing icon tap callback
  final VoidCallback? onTrailingIconTap;

  /// Show bottom separator line
  final bool showSeparator;

  double get _titleFontSize {
    switch (size) {
      case SingularSectionHeaderSize.xl:
        return 24;
      case SingularSectionHeaderSize.lg:
        return 20;
      case SingularSectionHeaderSize.md:
        return 16;
      case SingularSectionHeaderSize.sm:
        return 14;
    }
  }

  double get _iconSize {
    switch (size) {
      case SingularSectionHeaderSize.xl:
        return 24;
      case SingularSectionHeaderSize.lg:
        return 22;
      case SingularSectionHeaderSize.md:
        return 20;
      case SingularSectionHeaderSize.sm:
        return 18;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            // Leading icon
            if (leadingIcon != null) ...[
              Icon(
                leadingIcon,
                size: _iconSize,
                color: c.textPrimary,
              ),
              SizedBox(width: s.sm),
            ],

            // Title and supporting text
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title row with help icon
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          title,
                          style: t.titleLarge.copyWith(
                            color: c.textPrimary,
                            fontSize: _titleFontSize,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      if (showHelpIcon) ...[
                        SizedBox(width: s.xs),
                        GestureDetector(
                          onTap: onHelpTap,
                          child: Icon(
                            Iconsax.info_circle,
                            size: _iconSize - 4,
                            color: c.textSecondary,
                          ),
                        ),
                      ],
                    ],
                  ),

                  // Supporting text
                  if (supportingText != null) ...[
                    SizedBox(height: s.xxs),
                    Text(
                      supportingText!,
                      style: t.bodySmall.copyWith(color: c.textSecondary),
                    ),
                  ],
                ],
              ),
            ),

            // Trailing action or icon
            if (trailingAction != null) ...[
              SizedBox(width: s.md),
              GestureDetector(
                onTap: onTrailingActionTap,
                child: Text(
                  trailingAction!,
                  style: t.labelMedium.copyWith(
                    color: c.brandPrimary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ] else if (trailingIcon != null) ...[
              SizedBox(width: s.md),
              GestureDetector(
                onTap: onTrailingIconTap,
                child: Icon(
                  trailingIcon,
                  size: _iconSize,
                  color: c.textSecondary,
                ),
              ),
            ],
          ],
        ),

        // Separator
        if (showSeparator) ...[
          SizedBox(height: s.md),
          Container(
            height: 1,
            color: c.borderWeak,
          ),
        ],
      ],
    );
  }
}
