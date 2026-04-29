import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR NAVBAR
/// =============================================================================
/// The main navigation bar typically positioned at the top of the page.
///
/// ## Features
/// - Simple and dual-tier variants
/// - Logo and brand name
/// - Navigation items
/// - Actions slot
/// - Mobile responsive with menu toggle
/// =============================================================================

/// Navbar type
enum SingularNavbarType {
  /// Single tier navbar
  simple,

  /// Two tier navbar with sub-navigation
  dualTier,
}

/// Navbar item data
class SingularNavbarItem {
  const SingularNavbarItem({
    required this.id,
    required this.label,
    this.icon,
    this.onTap,
  });

  final String id;
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
}

class SingularNavbar extends StatelessWidget {
  const SingularNavbar({
    super.key,
    this.type = SingularNavbarType.simple,
    this.logo,
    this.brandName,
    this.items = const [],
    this.selectedItemId,
    this.onItemSelected,
    this.secondaryItems = const [],
    this.selectedSecondaryId,
    this.onSecondarySelected,
    this.actions,
    this.showMenuButton = false,
    this.onMenuTap,
    this.elevation = 0,
  });

  /// Navbar type
  final SingularNavbarType type;

  /// Logo widget
  final Widget? logo;

  /// Brand name text
  final String? brandName;

  /// Primary navigation items
  final List<SingularNavbarItem> items;

  /// Selected primary item ID
  final String? selectedItemId;

  /// Primary item selection callback
  final ValueChanged<String>? onItemSelected;

  /// Secondary navigation items (for dual-tier)
  final List<SingularNavbarItem> secondaryItems;

  /// Selected secondary item ID
  final String? selectedSecondaryId;

  /// Secondary item selection callback
  final ValueChanged<String>? onSecondarySelected;

  /// Actions slot (buttons, icons, etc.)
  final Widget? actions;

  /// Show mobile menu button
  final bool showMenuButton;

  /// Menu button tap callback
  final VoidCallback? onMenuTap;

  /// Elevation level
  final int elevation;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final e = context.elevation;

    final shadow = switch (elevation) {
      0 => e.level0,
      1 => e.level1,
      2 => e.level2,
      _ => e.level3,
    };

    return Container(
      decoration: BoxDecoration(
        color: c.bgSurface,
        boxShadow: shadow,
        border: Border(bottom: BorderSide(color: c.borderWeak)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _NavbarPrimaryRow(
            logo: logo,
            brandName: brandName,
            items: type == SingularNavbarType.simple ? items : [],
            selectedItemId: selectedItemId,
            onItemSelected: onItemSelected,
            actions: actions,
            showMenuButton: showMenuButton,
            onMenuTap: onMenuTap,
          ),
          if (type == SingularNavbarType.dualTier)
            _NavbarSecondaryRow(
              items: secondaryItems.isNotEmpty ? secondaryItems : items,
              selectedItemId:
                  selectedSecondaryId ?? selectedItemId,
              onItemSelected: onSecondarySelected ?? onItemSelected,
            ),
        ],
      ),
    );
  }
}

class _NavbarPrimaryRow extends StatelessWidget {
  const _NavbarPrimaryRow({
    this.logo,
    this.brandName,
    required this.items,
    this.selectedItemId,
    this.onItemSelected,
    this.actions,
    required this.showMenuButton,
    this.onMenuTap,
  });

  final Widget? logo;
  final String? brandName;
  final List<SingularNavbarItem> items;
  final String? selectedItemId;
  final ValueChanged<String>? onItemSelected;
  final Widget? actions;
  final bool showMenuButton;
  final VoidCallback? onMenuTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Container(
      height: 56,
      padding: EdgeInsets.symmetric(horizontal: s.md),
      child: Row(
        children: [
          // Menu button (mobile)
          if (showMenuButton) ...[
            GestureDetector(
              onTap: onMenuTap,
              child: Icon(Iconsax.menu, size: 24, color: c.textPrimary),
            ),
            SizedBox(width: s.md),
          ],

          // Logo and brand name
          if (logo != null) logo!,
          if (logo != null && brandName != null) SizedBox(width: s.sm),
          if (brandName != null)
            Text(
              brandName!,
              style: t.titleMedium.copyWith(
                color: c.textPrimary,
                fontWeight: FontWeight.w700,
              ),
            ),

          // Spacer
          SizedBox(width: s.lg),

          // Navigation items
          if (items.isNotEmpty)
            Expanded(
              child: Row(
                children: items.map((item) {
                  final isSelected = item.id == selectedItemId;
                  return Padding(
                    padding: EdgeInsets.only(right: s.md),
                    child: _NavbarItemWidget(
                      item: item,
                      isSelected: isSelected,
                      onTap: () {
                        onItemSelected?.call(item.id);
                        item.onTap?.call();
                      },
                    ),
                  );
                }).toList(),
              ),
            )
          else
            const Spacer(),

          // Actions
          if (actions != null) actions!,
        ],
      ),
    );
  }
}

class _NavbarSecondaryRow extends StatelessWidget {
  const _NavbarSecondaryRow({
    required this.items,
    this.selectedItemId,
    this.onItemSelected,
  });

  final List<SingularNavbarItem> items;
  final String? selectedItemId;
  final ValueChanged<String>? onItemSelected;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    return Container(
      height: 44,
      padding: EdgeInsets.symmetric(horizontal: s.md),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: c.borderWeak)),
      ),
      child: Row(
        children: items.map((item) {
          final isSelected = item.id == selectedItemId;
          return Padding(
            padding: EdgeInsets.only(right: s.lg),
            child: _NavbarItemWidget(
              item: item,
              isSelected: isSelected,
              isSecondary: true,
              onTap: () {
                onItemSelected?.call(item.id);
                item.onTap?.call();
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _NavbarItemWidget extends StatelessWidget {
  const _NavbarItemWidget({
    required this.item,
    required this.isSelected,
    this.isSecondary = false,
    required this.onTap,
  });

  final SingularNavbarItem item;
  final bool isSelected;
  final bool isSecondary;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: double.infinity,
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isSelected ? c.brandPrimary : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (item.icon != null) ...[
              Icon(
                item.icon,
                size: isSecondary ? 16 : 18,
                color: isSelected ? c.brandPrimary : c.textSecondary,
              ),
              SizedBox(width: context.spacing.xs),
            ],
            Text(
              item.label,
              style: (isSecondary ? t.labelSmall : t.labelMedium).copyWith(
                color: isSelected ? c.brandPrimary : c.textSecondary,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
