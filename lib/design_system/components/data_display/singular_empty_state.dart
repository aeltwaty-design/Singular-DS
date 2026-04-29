import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';
import '../call_to_actions/singular_button.dart';

/// =============================================================================
/// SINGULAR EMPTY STATE
/// =============================================================================
/// Empty state placeholder for when no data is available.
///
/// ## Features
/// - Illustration/icon support
/// - Title and description
/// - Action button
/// - Compact variant
/// =============================================================================

class SingularEmptyState extends StatelessWidget {
  const SingularEmptyState({
    super.key,
    required this.title,
    this.description,
    this.icon,
    this.illustration,
    this.actionLabel,
    this.onAction,
    this.compact = false,
  });

  /// Title text
  final String title;

  /// Description text
  final String? description;

  /// Icon (alternative to illustration)
  final IconData? icon;

  /// Custom illustration widget
  final Widget? illustration;

  /// Action button label
  final String? actionLabel;

  /// Action callback
  final VoidCallback? onAction;

  /// Compact variant
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Center(
      child: Padding(
        padding: EdgeInsets.all(compact ? s.lg : s.sectionLg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Illustration or icon
            if (illustration != null)
              illustration!
            else if (icon != null)
              Container(
                width: compact ? 56 : 80,
                height: compact ? 56 : 80,
                decoration: BoxDecoration(
                  color: c.bgSurfaceSoft,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  icon,
                  size: compact ? 28 : 40,
                  color: c.textSecondary,
                ),
              )
            else
              Container(
                width: compact ? 56 : 80,
                height: compact ? 56 : 80,
                decoration: BoxDecoration(
                  color: c.bgSurfaceSoft,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Iconsax.box_1,
                  size: compact ? 28 : 40,
                  color: c.textSecondary,
                ),
              ),

            SizedBox(height: compact ? s.md : s.lg),

            // Title
            Text(
              title,
              style: (compact ? t.titleSmall : t.titleMedium).copyWith(
                color: c.textPrimary,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),

            // Description
            if (description != null) ...[
              SizedBox(height: s.xs),
              Text(
                description!,
                style: t.bodyMedium.copyWith(color: c.textSecondary),
                textAlign: TextAlign.center,
              ),
            ],

            // Action button
            if (actionLabel != null) ...[
              SizedBox(height: compact ? s.md : s.lg),
              SingularButton(
                label: actionLabel!,
                onPressed: onAction,
                size: compact ? SingularButtonSize.sm : SingularButtonSize.md,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
