import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR ALERT
/// =============================================================================
/// Alerts display important messages inline.
///
/// ## Features
/// - 4 status types: success, info, warning, error
/// - Optional title
/// - Dismissible
/// - Action button support
/// =============================================================================

/// Alert status type
enum SingularAlertStatus {
  /// Success - positive message
  success,

  /// Info - informational message
  info,

  /// Warning - caution message
  warning,

  /// Error - negative message
  error,
}

class SingularAlert extends StatelessWidget {
  const SingularAlert({
    super.key,
    required this.message,
    this.title,
    this.status = SingularAlertStatus.info,
    this.dismissible = false,
    this.onDismiss,
    this.actionLabel,
    this.onAction,
  });

  /// Alert message
  final String message;

  /// Optional title
  final String? title;

  /// Status type
  final SingularAlertStatus status;

  /// Can be dismissed
  final bool dismissible;

  /// Dismiss callback
  final VoidCallback? onDismiss;

  /// Action button label
  final String? actionLabel;

  /// Action callback
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final (bgColor, textColor, icon) = _getStatusStyles(c);

    return Container(
      padding: EdgeInsets.all(s.md),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.md,
        border: Border.all(color: textColor.withValues(alpha: 0.2)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Icon
          Icon(icon, size: 20, color: textColor),
          SizedBox(width: s.md),

          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Title
                if (title != null) ...[
                  Text(
                    title!,
                    style: t.labelMedium.copyWith(
                      color: textColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: s.xxs),
                ],

                // Message
                Text(
                  message,
                  style: t.bodySmall.copyWith(color: textColor),
                ),

                // Action
                if (actionLabel != null) ...[
                  SizedBox(height: s.sm),
                  GestureDetector(
                    onTap: onAction,
                    child: Text(
                      actionLabel!,
                      style: t.labelMedium.copyWith(
                        color: textColor,
                        fontWeight: FontWeight.w600,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),

          // Dismiss button
          if (dismissible) ...[
            SizedBox(width: s.sm),
            GestureDetector(
              onTap: onDismiss,
              child: Icon(
                Iconsax.close_circle,
                size: 20,
                color: textColor,
              ),
            ),
          ],
        ],
      ),
    );
  }

  (Color bgColor, Color textColor, IconData icon) _getStatusStyles(AppColors c) {
    switch (status) {
      case SingularAlertStatus.success:
        return (c.statusSuccessLight, c.statusSuccess, Iconsax.tick_circle);
      case SingularAlertStatus.info:
        return (c.statusInfoLight, c.statusInfo, Iconsax.info_circle);
      case SingularAlertStatus.warning:
        return (c.statusWarningLight, c.statusWarning, Iconsax.warning_2);
      case SingularAlertStatus.error:
        return (c.statusErrorLight, c.statusError, Iconsax.danger);
    }
  }
}
