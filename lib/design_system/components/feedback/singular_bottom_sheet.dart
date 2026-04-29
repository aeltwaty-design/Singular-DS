import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR BOTTOM SHEET
/// =============================================================================
/// Bottom sheets slide up from the bottom of the screen.
///
/// ## Features
/// - Drag handle
/// - Title and close button
/// - Scrollable content
/// - Actions footer
/// =============================================================================

class SingularBottomSheet extends StatelessWidget {
  const SingularBottomSheet({
    super.key,
    required this.child,
    this.title,
    this.showHandle = true,
    this.showClose = true,
    this.onClose,
    this.footer,
    this.maxHeight,
  });

  /// Content widget
  final Widget child;

  /// Title text
  final String? title;

  /// Show drag handle
  final bool showHandle;

  /// Show close button
  final bool showClose;

  /// Close callback
  final VoidCallback? onClose;

  /// Footer widget (actions)
  final Widget? footer;

  /// Maximum height factor (0.0-1.0)
  final double? maxHeight;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      constraints: BoxConstraints(
        maxHeight:
            MediaQuery.of(context).size.height * (maxHeight ?? 0.9),
      ),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(r.lg.topLeft.x)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle
          if (showHandle) ...[
            SizedBox(height: s.sm),
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: c.borderDefault,
                borderRadius: r.full,
              ),
            ),
          ],

          // Header
          if (title != null || showClose)
            Padding(
              padding: EdgeInsets.all(s.md),
              child: Row(
                children: [
                  if (title != null)
                    Expanded(
                      child: Text(
                        title!,
                        style: t.titleMedium.copyWith(
                          color: c.textPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  if (showClose)
                    GestureDetector(
                      onTap: onClose ?? () => Navigator.of(context).pop(),
                      child: Icon(
                        Iconsax.close_square,
                        size: 24,
                        color: c.textSecondary,
                      ),
                    ),
                ],
              ),
            ),

          // Content
          Flexible(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: s.md),
              child: child,
            ),
          ),

          // Footer
          if (footer != null) ...[
            Divider(height: 1, color: c.borderWeak),
            Padding(
              padding: EdgeInsets.all(s.md),
              child: footer,
            ),
          ],

          // Bottom safe area
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }

  /// Show bottom sheet modal
  static Future<T?> show<T>(
    BuildContext context, {
    required Widget child,
    String? title,
    bool showHandle = true,
    bool showClose = true,
    Widget? footer,
    double? maxHeight,
    bool isDismissible = true,
    bool enableDrag = true,
  }) {
    final c = context.colors;

    return showModalBottomSheet<T>(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      isDismissible: isDismissible,
      enableDrag: enableDrag,
      barrierColor: c.overlayDark,
      builder: (context) => SingularBottomSheet(
        title: title,
        showHandle: showHandle,
        showClose: showClose,
        footer: footer,
        maxHeight: maxHeight,
        child: child,
      ),
    );
  }
}
