import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR PAGINATION
/// =============================================================================
/// Pagination enables navigation between pages of content.
///
/// ## Features
/// - Numbers and compact variants
/// - Filled and outlined button styles
/// - 2 sizes: sm, lg
/// - First/last page buttons
/// - Disabled state
/// =============================================================================

/// Pagination variant
enum SingularPaginationVariant {
  /// Show page numbers
  numbers,

  /// Compact with prev/next only
  compact,
}

/// Pagination button style
enum SingularPaginationStyle {
  /// Solid background
  filled,

  /// Border only
  outlined,
}

/// Pagination size
enum SingularPaginationSize {
  /// Small
  sm,

  /// Large (default)
  lg,
}

class SingularPagination extends StatelessWidget {
  const SingularPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    required this.onPageChange,
    this.variant = SingularPaginationVariant.numbers,
    this.style = SingularPaginationStyle.filled,
    this.size = SingularPaginationSize.lg,
    this.siblingCount = 1,
    this.showFirstLast = true,
    this.disabled = false,
  });

  /// Current page (1-indexed)
  final int currentPage;

  /// Total number of pages
  final int totalPages;

  /// Page change callback
  final ValueChanged<int> onPageChange;

  /// Layout variant
  final SingularPaginationVariant variant;

  /// Button style
  final SingularPaginationStyle style;

  /// Size variant
  final SingularPaginationSize size;

  /// Number of sibling pages to show
  final int siblingCount;

  /// Show first and last page
  final bool showFirstLast;

  /// Disabled state
  final bool disabled;

  double get _buttonSize => size == SingularPaginationSize.sm ? 32 : 40;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final isRTL = Directionality.of(context) == TextDirection.rtl;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Previous button
        _PaginationButton(
          icon: isRTL ? Iconsax.arrow_right_3 : Iconsax.arrow_left_2,
          onTap: currentPage > 1 && !disabled
              ? () => onPageChange(currentPage - 1)
              : null,
          size: _buttonSize,
          style: style,
          colors: c,
        ),

        if (variant == SingularPaginationVariant.numbers) ...[
          SizedBox(width: s.xs),
          ..._buildPageNumbers(c, s),
        ] else ...[
          // Compact variant - show page info
          Padding(
            padding: EdgeInsets.symmetric(horizontal: s.md),
            child: Text(
              '$currentPage / $totalPages',
              style: context.typography.labelMedium.copyWith(
                color: disabled ? c.textDisabled : c.textPrimary,
              ),
            ),
          ),
        ],

        SizedBox(width: s.xs),

        // Next button
        _PaginationButton(
          icon: isRTL ? Iconsax.arrow_left_2 : Iconsax.arrow_right_3,
          onTap: currentPage < totalPages && !disabled
              ? () => onPageChange(currentPage + 1)
              : null,
          size: _buttonSize,
          style: style,
          colors: c,
        ),
      ],
    );
  }

  List<Widget> _buildPageNumbers(AppColors c, AppSpacing s) {
    final pages = _getPageNumbers();
    final widgets = <Widget>[];

    for (int i = 0; i < pages.length; i++) {
      final page = pages[i];

      if (page == -1) {
        // Ellipsis
        widgets.add(
          SizedBox(
            width: _buttonSize,
            height: _buttonSize,
            child: Center(
              child: Text(
                '...',
                style: TextStyle(color: c.textSecondary),
              ),
            ),
          ),
        );
      } else {
        widgets.add(
          _PaginationButton(
            label: '$page',
            isSelected: page == currentPage,
            onTap: !disabled ? () => onPageChange(page) : null,
            size: _buttonSize,
            style: style,
            colors: c,
          ),
        );
      }

      if (i < pages.length - 1) {
        widgets.add(SizedBox(width: s.xxs));
      }
    }

    return widgets;
  }

  List<int> _getPageNumbers() {
    if (totalPages <= 7) {
      return List.generate(totalPages, (i) => i + 1);
    }

    final pages = <int>[];

    // Always show first page
    if (showFirstLast) pages.add(1);

    // Calculate range around current page
    final start = (currentPage - siblingCount).clamp(2, totalPages - 1);
    final end = (currentPage + siblingCount).clamp(2, totalPages - 1);

    // Add ellipsis if needed before range
    if (start > 2) {
      pages.add(-1); // Ellipsis marker
    } else if (start == 2 && showFirstLast) {
      pages.add(2);
    }

    // Add pages in range
    for (int i = start; i <= end; i++) {
      if (!pages.contains(i)) pages.add(i);
    }

    // Add ellipsis if needed after range
    if (end < totalPages - 1) {
      pages.add(-1); // Ellipsis marker
    } else if (end == totalPages - 1 && showFirstLast) {
      pages.add(totalPages - 1);
    }

    // Always show last page
    if (showFirstLast && !pages.contains(totalPages)) {
      pages.add(totalPages);
    }

    return pages;
  }
}

class _PaginationButton extends StatelessWidget {
  const _PaginationButton({
    this.icon,
    this.label,
    this.isSelected = false,
    required this.onTap,
    required this.size,
    required this.style,
    required this.colors,
  });

  final IconData? icon;
  final String? label;
  final bool isSelected;
  final VoidCallback? onTap;
  final double size;
  final SingularPaginationStyle style;
  final AppColors colors;

  @override
  Widget build(BuildContext context) {
    final isDisabled = onTap == null;
    final t = context.typography;

    Color bgColor;
    Color contentColor;
    Color borderColor;

    if (isDisabled) {
      bgColor = Colors.transparent;
      contentColor = colors.textDisabled;
      borderColor = colors.borderWeak;
    } else if (isSelected) {
      bgColor = colors.brandPrimary;
      contentColor = colors.textOnColor;
      borderColor = colors.brandPrimary;
    } else {
      bgColor = style == SingularPaginationStyle.filled
          ? colors.bgSurfaceSoft
          : Colors.transparent;
      contentColor = colors.textSecondary;
      borderColor = style == SingularPaginationStyle.outlined
          ? colors.borderDefault
          : Colors.transparent;
    }

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(size / 4),
          border: Border.all(color: borderColor),
        ),
        child: Center(
          child: icon != null
              ? Icon(icon, size: 18, color: contentColor)
              : Text(
                  label!,
                  style: t.labelMedium.copyWith(
                    color: contentColor,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                  ),
                ),
        ),
      ),
    );
  }
}
