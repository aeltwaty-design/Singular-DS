import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';
import '../call_to_actions/singular_button.dart';

/// =============================================================================
/// SINGULAR ACTION HEADER
/// =============================================================================
/// A horizontal toolbar with composable left content and fixed action buttons.
///
/// ## Features
/// - Composable left content (tabs, navigation, custom)
/// - Dropdown button
/// - Primary action button
/// - Optional separator
/// =============================================================================

class SingularActionHeader extends StatelessWidget {
  const SingularActionHeader({
    super.key,
    this.children,
    required this.dropdownLabel,
    this.dropdownIcon,
    this.onDropdownClick,
    required this.actionLabel,
    this.actionIcon,
    this.onActionClick,
    this.showSeparator = false,
  });

  /// Left content slot
  final Widget? children;

  /// Dropdown button label
  final String dropdownLabel;

  /// Dropdown button icon
  final IconData? dropdownIcon;

  /// Dropdown click callback
  final VoidCallback? onDropdownClick;

  /// Action button label
  final String actionLabel;

  /// Action button icon
  final IconData? actionIcon;

  /// Action click callback
  final VoidCallback? onActionClick;

  /// Show bottom separator
  final bool showSeparator;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Container(
      decoration: BoxDecoration(
        border: showSeparator
            ? Border(bottom: BorderSide(color: c.borderWeak))
            : null,
      ),
      padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
      child: Row(
        children: [
          // Left content
          if (children != null) Expanded(child: children!),

          // Spacer if no children
          if (children == null) const Spacer(),

          // Dropdown button
          GestureDetector(
            onTap: onDropdownClick,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
              decoration: BoxDecoration(
                color: c.bgSurfaceSoft,
                borderRadius: context.radius.sm,
                border: Border.all(color: c.borderDefault),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    dropdownLabel,
                    style: t.labelMedium.copyWith(
                      color: c.textPrimary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(width: s.xs),
                  Icon(
                    dropdownIcon ?? Iconsax.arrow_down_1,
                    size: 16,
                    color: c.textSecondary,
                  ),
                ],
              ),
            ),
          ),

          SizedBox(width: s.sm),

          // Action button
          SingularButton(
            label: actionLabel,
            onPressed: onActionClick,
            leftIcon: actionIcon,
            size: SingularButtonSize.sm,
          ),
        ],
      ),
    );
  }
}
