import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SIDE MENU
/// =============================================================================
/// A vertical navigation menu typically positioned on the side of the screen.
///
/// ## Features
/// - Menu items with icons and labels
/// - Nested sub-menus
/// - Collapsible/expandable
/// - Active state
/// - Badge support
/// =============================================================================

/// Side menu item data
class SingularSideMenuItem {
  const SingularSideMenuItem({
    required this.id,
    required this.label,
    this.icon,
    this.badge,
    this.children,
    this.onTap,
  });

  final String id;
  final String label;
  final IconData? icon;
  final String? badge;
  final List<SingularSideMenuItem>? children;
  final VoidCallback? onTap;

  bool get hasChildren => children != null && children!.isNotEmpty;
}

/// Side menu header data
class SingularSideMenuHeader {
  const SingularSideMenuHeader({
    this.title,
    this.subtitle,
    this.logo,
    this.avatar,
  });

  final String? title;
  final String? subtitle;
  final Widget? logo;
  final Widget? avatar;
}

class SingularSideMenu extends StatefulWidget {
  const SingularSideMenu({
    super.key,
    required this.items,
    this.selectedId,
    this.onItemSelected,
    this.header,
    this.footer,
    this.collapsed = false,
    this.onCollapseToggle,
    this.width = 256,
    this.collapsedWidth = 72,
  });

  /// Menu items
  final List<SingularSideMenuItem> items;

  /// Currently selected item ID
  final String? selectedId;

  /// Item selection callback
  final ValueChanged<String>? onItemSelected;

  /// Header widget/data
  final SingularSideMenuHeader? header;

  /// Footer widget
  final Widget? footer;

  /// Collapsed state
  final bool collapsed;

  /// Collapse toggle callback
  final VoidCallback? onCollapseToggle;

  /// Expanded width
  final double width;

  /// Collapsed width
  final double collapsedWidth;

  @override
  State<SingularSideMenu> createState() => _SingularSideMenuState();
}

class _SingularSideMenuState extends State<SingularSideMenu> {
  final Set<String> _expandedIds = {};

  void _toggleExpand(String id) {
    setState(() {
      if (_expandedIds.contains(id)) {
        _expandedIds.remove(id);
      } else {
        _expandedIds.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: widget.collapsed ? widget.collapsedWidth : widget.width,
      decoration: BoxDecoration(
        color: c.bgSurface,
        border: Border(right: BorderSide(color: c.borderWeak)),
      ),
      child: Column(
        children: [
          // Header
          if (widget.header != null) _buildHeader(c, s),

          // Menu items
          Expanded(
            child: ListView(
              padding: EdgeInsets.symmetric(vertical: s.sm, horizontal: s.sm),
              children: widget.items.map((item) {
                return _SideMenuItem(
                  item: item,
                  selectedId: widget.selectedId,
                  collapsed: widget.collapsed,
                  isExpanded: _expandedIds.contains(item.id),
                  onTap: () {
                    if (item.hasChildren) {
                      _toggleExpand(item.id);
                    } else {
                      widget.onItemSelected?.call(item.id);
                      item.onTap?.call();
                    }
                  },
                  onChildTap: (childId) {
                    widget.onItemSelected?.call(childId);
                  },
                  depth: 0,
                );
              }).toList(),
            ),
          ),

          // Collapse toggle
          if (widget.onCollapseToggle != null)
            _buildCollapseToggle(c, s),

          // Footer
          if (widget.footer != null && !widget.collapsed) widget.footer!,
        ],
      ),
    );
  }

  Widget _buildHeader(AppColors c, AppSpacing s) {
    final header = widget.header!;

    if (widget.collapsed) {
      return Padding(
        padding: EdgeInsets.all(s.md),
        child: header.logo ?? header.avatar ?? const SizedBox.shrink(),
      );
    }

    return Container(
      padding: EdgeInsets.all(s.md),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: c.borderWeak)),
      ),
      child: Row(
        children: [
          if (header.logo != null) header.logo!,
          if (header.avatar != null) header.avatar!,
          if ((header.title != null || header.subtitle != null) &&
              (header.logo != null || header.avatar != null))
            SizedBox(width: s.md),
          if (header.title != null || header.subtitle != null)
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (header.title != null)
                    Text(
                      header.title!,
                      style: context.typography.titleSmall.copyWith(
                        color: c.textPrimary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  if (header.subtitle != null)
                    Text(
                      header.subtitle!,
                      style: context.typography.bodySmall.copyWith(
                        color: c.textSecondary,
                      ),
                    ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildCollapseToggle(AppColors c, AppSpacing s) {
    return Container(
      padding: EdgeInsets.all(s.sm),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: c.borderWeak)),
      ),
      child: GestureDetector(
        onTap: widget.onCollapseToggle,
        child: Container(
          padding: EdgeInsets.all(s.sm),
          decoration: BoxDecoration(
            color: c.bgSurfaceSoft,
            borderRadius: context.radius.sm,
          ),
          child: Icon(
            widget.collapsed
                ? Iconsax.arrow_right_3
                : Iconsax.arrow_left_2,
            size: 20,
            color: c.textSecondary,
          ),
        ),
      ),
    );
  }
}

class _SideMenuItem extends StatelessWidget {
  const _SideMenuItem({
    required this.item,
    required this.selectedId,
    required this.collapsed,
    required this.isExpanded,
    required this.onTap,
    required this.onChildTap,
    required this.depth,
  });

  final SingularSideMenuItem item;
  final String? selectedId;
  final bool collapsed;
  final bool isExpanded;
  final VoidCallback onTap;
  final ValueChanged<String> onChildTap;
  final int depth;

  bool get _isSelected => item.id == selectedId;

  bool get _hasSelectedChild {
    if (item.children == null) return false;
    return item.children!.any((child) =>
        child.id == selectedId ||
        (child.children?.any((c) => c.id == selectedId) ?? false));
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final isActive = _isSelected || _hasSelectedChild;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Main item
        GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            padding: EdgeInsets.symmetric(
              horizontal: s.md,
              vertical: s.sm,
            ),
            margin: EdgeInsets.only(
              left: collapsed ? 0 : depth * s.md,
              bottom: s.xxs,
            ),
            decoration: BoxDecoration(
              color: isActive
                  ? c.brandPrimary.withValues(alpha: 0.1)
                  : Colors.transparent,
              borderRadius: r.sm,
            ),
            child: Row(
              children: [
                // Icon
                if (item.icon != null)
                  Icon(
                    item.icon,
                    size: 20,
                    color: isActive ? c.brandPrimary : c.textSecondary,
                  ),

                // Label
                if (!collapsed) ...[
                  if (item.icon != null) SizedBox(width: s.md),
                  Expanded(
                    child: Text(
                      item.label,
                      style: t.labelMedium.copyWith(
                        color: isActive ? c.brandPrimary : c.textPrimary,
                        fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),

                  // Badge
                  if (item.badge != null) ...[
                    SizedBox(width: s.xs),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: c.brandPrimary,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        item.badge!,
                        style: t.labelSmall.copyWith(
                          color: c.textOnColor,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],

                  // Expand icon
                  if (item.hasChildren)
                    AnimatedRotation(
                      turns: isExpanded ? 0.25 : 0,
                      duration: const Duration(milliseconds: 200),
                      child: Icon(
                        Iconsax.arrow_right_3,
                        size: 16,
                        color: c.textSecondary,
                      ),
                    ),
                ],
              ],
            ),
          ),
        ),

        // Children
        if (item.hasChildren && isExpanded && !collapsed)
          ...item.children!.map((child) {
            return _SideMenuItem(
              item: child,
              selectedId: selectedId,
              collapsed: collapsed,
              isExpanded: false,
              onTap: () {
                if (child.hasChildren) {
                  // Handle nested expansion if needed
                } else {
                  onChildTap(child.id);
                  child.onTap?.call();
                }
              },
              onChildTap: onChildTap,
              depth: depth + 1,
            );
          }),
      ],
    );
  }
}
