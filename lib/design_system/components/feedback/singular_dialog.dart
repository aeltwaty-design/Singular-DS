import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';
import '../call_to_actions/singular_button.dart';

/// =============================================================================
/// SINGULAR DIALOG
/// =============================================================================
/// Modal dialogs for important decisions or information.
///
/// ## Features
/// - Icon header options
/// - Title and description
/// - Action buttons (primary, secondary)
/// - Danger variant
/// - Dismissible
/// =============================================================================

/// Dialog type
enum SingularDialogType {
  /// Default dialog
  defaultType,

  /// Info dialog
  info,

  /// Success dialog
  success,

  /// Warning dialog
  warning,

  /// Danger/error dialog
  danger,
}

class SingularDialog extends StatelessWidget {
  const SingularDialog({
    super.key,
    required this.title,
    this.description,
    this.type = SingularDialogType.defaultType,
    this.icon,
    this.showCloseButton = true,
    this.primaryActionLabel,
    this.onPrimaryAction,
    this.secondaryActionLabel,
    this.onSecondaryAction,
    this.child,
  });

  /// Dialog title
  final String title;

  /// Description text
  final String? description;

  /// Dialog type
  final SingularDialogType type;

  /// Custom icon
  final IconData? icon;

  /// Show close button
  final bool showCloseButton;

  /// Primary action label
  final String? primaryActionLabel;

  /// Primary action callback
  final VoidCallback? onPrimaryAction;

  /// Secondary action label
  final String? secondaryActionLabel;

  /// Secondary action callback
  final VoidCallback? onSecondaryAction;

  /// Custom content
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final (iconData, iconColor, iconBg) = _getIconStyles(c);

    return Dialog(
      backgroundColor: c.bgSurface,
      shape: RoundedRectangleBorder(borderRadius: r.lg),
      insetPadding: EdgeInsets.all(s.lg),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 400),
        padding: EdgeInsets.all(s.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header row
            Row(
              children: [
                // Icon
                if (iconData != null) ...[
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: iconBg,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(iconData, color: iconColor, size: 24),
                  ),
                  SizedBox(width: s.md),
                ],

                // Title
                Expanded(
                  child: Text(
                    title,
                    style: t.titleMedium.copyWith(
                      color: c.textPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),

                // Close button
                if (showCloseButton)
                  GestureDetector(
                    onTap: () => Navigator.of(context).pop(),
                    child: Icon(
                      Iconsax.close_square,
                      size: 24,
                      color: c.textSecondary,
                    ),
                  ),
              ],
            ),

            // Description
            if (description != null) ...[
              SizedBox(height: s.md),
              Align(
                alignment: AlignmentDirectional.centerStart,
                child: Text(
                  description!,
                  style: t.bodyMedium.copyWith(color: c.textSecondary),
                ),
              ),
            ],

            // Custom content
            if (child != null) ...[
              SizedBox(height: s.lg),
              child!,
            ],

            // Actions
            if (primaryActionLabel != null || secondaryActionLabel != null) ...[
              SizedBox(height: s.lg),
              Row(
                children: [
                  if (secondaryActionLabel != null)
                    Expanded(
                      child: SingularButton(
                        label: secondaryActionLabel!,
                        onPressed: onSecondaryAction ??
                            () => Navigator.of(context).pop(),
                        variant: SingularButtonVariant.outline,
                      ),
                    ),
                  if (secondaryActionLabel != null &&
                      primaryActionLabel != null)
                    SizedBox(width: s.md),
                  if (primaryActionLabel != null)
                    Expanded(
                      child: SingularButton(
                        label: primaryActionLabel!,
                        onPressed: onPrimaryAction,
                        danger: type == SingularDialogType.danger,
                      ),
                    ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  (IconData?, Color, Color) _getIconStyles(AppColors c) {
    switch (type) {
      case SingularDialogType.defaultType:
        return (icon, c.brandPrimary, c.brandPrimary.withValues(alpha: 0.1));
      case SingularDialogType.info:
        return (
          icon ?? Iconsax.info_circle,
          c.statusInfo,
          c.statusInfoLight
        );
      case SingularDialogType.success:
        return (
          icon ?? Iconsax.tick_circle,
          c.statusSuccess,
          c.statusSuccessLight
        );
      case SingularDialogType.warning:
        return (
          icon ?? Iconsax.warning_2,
          c.statusWarning,
          c.statusWarningLight
        );
      case SingularDialogType.danger:
        return (
          icon ?? Iconsax.danger,
          c.statusError,
          c.statusErrorLight
        );
    }
  }

  /// Show dialog
  static Future<T?> show<T>(
    BuildContext context, {
    required String title,
    String? description,
    SingularDialogType type = SingularDialogType.defaultType,
    IconData? icon,
    bool showCloseButton = true,
    String? primaryActionLabel,
    VoidCallback? onPrimaryAction,
    String? secondaryActionLabel,
    VoidCallback? onSecondaryAction,
    Widget? child,
    bool barrierDismissible = true,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      barrierColor: context.colors.overlayDark,
      builder: (context) => SingularDialog(
        title: title,
        description: description,
        type: type,
        icon: icon,
        showCloseButton: showCloseButton,
        primaryActionLabel: primaryActionLabel,
        onPrimaryAction: onPrimaryAction,
        secondaryActionLabel: secondaryActionLabel,
        onSecondaryAction: onSecondaryAction,
        child: child,
      ),
    );
  }
}
