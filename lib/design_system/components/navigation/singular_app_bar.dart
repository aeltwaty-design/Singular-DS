import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR APP BAR
/// =============================================================================
/// Top app bar providing content and actions related to the current screen.
///
/// ## Features
/// - Leading action (back button, menu)
/// - Title text
/// - Trailing actions
/// - Transparent or solid background
/// - Elevation support
/// =============================================================================

/// App bar leading type
enum SingularAppBarLeading {
  /// No leading
  none,

  /// Back button
  back,

  /// Close button
  close,

  /// Menu button
  menu,
}

class SingularAppBar extends StatelessWidget implements PreferredSizeWidget {
  const SingularAppBar({
    super.key,
    this.title,
    this.titleWidget,
    this.leading = SingularAppBarLeading.none,
    this.onLeadingTap,
    this.actions,
    this.transparent = false,
    this.elevation = 0,
    this.centerTitle = true,
  });

  /// Title text
  final String? title;

  /// Custom title widget
  final Widget? titleWidget;

  /// Leading button type
  final SingularAppBarLeading leading;

  /// Leading tap callback
  final VoidCallback? onLeadingTap;

  /// Trailing action widgets
  final List<Widget>? actions;

  /// Transparent background
  final bool transparent;

  /// Elevation level
  final int elevation;

  /// Center title
  final bool centerTitle;

  @override
  Size get preferredSize => const Size.fromHeight(56);

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final e = context.elevation;

    final shadow = switch (elevation) {
      0 => e.level0,
      1 => e.level1,
      2 => e.level2,
      _ => e.level3,
    };

    return Container(
      height: preferredSize.height,
      decoration: BoxDecoration(
        color: transparent ? Colors.transparent : c.bgSurface,
        boxShadow: transparent ? null : shadow,
      ),
      padding: EdgeInsets.symmetric(horizontal: s.sm),
      child: Row(
        children: [
          // Leading
          if (leading != SingularAppBarLeading.none)
            _buildLeading(c)
          else
            SizedBox(width: s.sectionLg),

          // Title
          Expanded(
            child: centerTitle
                ? Center(child: _buildTitle(c, t))
                : _buildTitle(c, t),
          ),

          // Actions
          if (actions != null && actions!.isNotEmpty)
            Row(
              mainAxisSize: MainAxisSize.min,
              children: actions!
                  .expand((widget) => [widget, SizedBox(width: s.xs)])
                  .toList()
                ..removeLast(),
            )
          else
            SizedBox(width: s.sectionLg),
        ],
      ),
    );
  }

  Widget _buildLeading(AppColors c) {
    IconData icon;
    switch (leading) {
      case SingularAppBarLeading.none:
        return const SizedBox.shrink();
      case SingularAppBarLeading.back:
        icon = Iconsax.arrow_left;
      case SingularAppBarLeading.close:
        icon = Iconsax.close_square;
      case SingularAppBarLeading.menu:
        icon = Iconsax.menu;
    }

    return GestureDetector(
      onTap: onLeadingTap,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Icon(
          icon,
          size: 24,
          color: c.textPrimary,
        ),
      ),
    );
  }

  Widget _buildTitle(AppColors c, AppTypography t) {
    if (titleWidget != null) {
      return titleWidget!;
    }

    if (title != null) {
      return Text(
        title!,
        style: t.titleLarge.copyWith(
          color: c.textPrimary,
          fontWeight: FontWeight.w600,
        ),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      );
    }

    return const SizedBox.shrink();
  }
}
