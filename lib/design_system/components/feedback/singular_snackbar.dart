import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SNACKBAR
/// =============================================================================
/// Snackbars provide brief messages at the bottom of the screen.
///
/// ## Features
/// - 5 status types: default, gray, success, warning, danger
/// - Leading icon
/// - Action button
/// - Dismissible
/// =============================================================================

/// Snackbar status type
enum SingularSnackbarStatus {
  /// Default - brand primary background
  defaultStatus,

  /// Gray - neutral background
  gray,

  /// Success - green background
  success,

  /// Warning - amber background
  warning,

  /// Danger - red background
  danger,
}

class SingularSnackbar extends StatelessWidget {
  const SingularSnackbar({
    super.key,
    required this.message,
    this.status = SingularSnackbarStatus.defaultStatus,
    this.showLeadingIcon = true,
    this.icon,
    this.actionLabel,
    this.onAction,
    this.dismissible = false,
    this.onDismiss,
  });

  /// Message text
  final String message;

  /// Status type
  final SingularSnackbarStatus status;

  /// Show leading icon
  final bool showLeadingIcon;

  /// Custom icon
  final IconData? icon;

  /// Action button label
  final String? actionLabel;

  /// Action callback
  final VoidCallback? onAction;

  /// Can be dismissed
  final bool dismissible;

  /// Dismiss callback
  final VoidCallback? onDismiss;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final (bgColor, textColor, defaultIcon) = _getStatusStyles(c);

    return Container(
      padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.sm,
      ),
      child: Row(
        children: [
          // Leading icon
          if (showLeadingIcon) ...[
            Icon(
              icon ?? defaultIcon,
              size: 20,
              color: textColor,
            ),
            SizedBox(width: s.md),
          ],

          // Message
          Expanded(
            child: Text(
              message,
              style: t.bodyMedium.copyWith(color: textColor),
            ),
          ),

          // Action button
          if (actionLabel != null) ...[
            SizedBox(width: s.md),
            GestureDetector(
              onTap: onAction,
              child: Text(
                actionLabel!,
                style: t.labelMedium.copyWith(
                  color: textColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],

          // Dismiss button
          if (dismissible) ...[
            SizedBox(width: s.sm),
            GestureDetector(
              onTap: onDismiss,
              child: Icon(
                Iconsax.close_square,
                size: 20,
                color: textColor,
              ),
            ),
          ],
        ],
      ),
    );
  }

  (Color bgColor, Color textColor, IconData defaultIcon) _getStatusStyles(
      AppColors c) {
    switch (status) {
      case SingularSnackbarStatus.defaultStatus:
        return (c.brandPrimary, c.textOnColor, Iconsax.info_circle);
      case SingularSnackbarStatus.gray:
        return (c.bgSurfaceInverse, c.textInverse, Iconsax.info_circle);
      case SingularSnackbarStatus.success:
        return (c.statusSuccess, c.textOnColor, Iconsax.tick_circle);
      case SingularSnackbarStatus.warning:
        return (c.statusWarning, c.textOnColor, Iconsax.warning_2);
      case SingularSnackbarStatus.danger:
        return (c.statusError, c.textOnColor, Iconsax.danger);
    }
  }

  /// Show snackbar using ScaffoldMessenger
  static void show(
    BuildContext context, {
    required String message,
    SingularSnackbarStatus status = SingularSnackbarStatus.defaultStatus,
    bool showLeadingIcon = true,
    IconData? icon,
    String? actionLabel,
    VoidCallback? onAction,
    Duration duration = const Duration(seconds: 4),
  }) {
    final s = context.spacing;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: SingularSnackbar(
          message: message,
          status: status,
          showLeadingIcon: showLeadingIcon,
          icon: icon,
          actionLabel: actionLabel,
          onAction: onAction,
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(s.md),
        padding: EdgeInsets.zero,
        duration: duration,
      ),
    );
  }
}
