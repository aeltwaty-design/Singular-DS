import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR TABLE
/// =============================================================================
/// Tables display sets of data organized in rows and columns.
///
/// ## Features
/// - Header, body, and footer sections
/// - Sortable columns
/// - Selectable rows
/// - Striped rows option
/// - Responsive scrolling
/// =============================================================================

/// Table column definition
class SingularTableColumn<T> {
  const SingularTableColumn({
    required this.id,
    required this.header,
    required this.cellBuilder,
    this.width,
    this.flex,
    this.sortable = false,
    this.alignment = Alignment.centerLeft,
  });

  final String id;
  final String header;
  final Widget Function(T item, int index) cellBuilder;
  final double? width;
  final int? flex;
  final bool sortable;
  final Alignment alignment;
}

/// Sort direction
enum SingularSortDirection {
  ascending,
  descending,
}

class SingularTable<T> extends StatelessWidget {
  const SingularTable({
    super.key,
    required this.columns,
    required this.data,
    this.onRowTap,
    this.onSort,
    this.sortColumnId,
    this.sortDirection,
    this.striped = false,
    this.bordered = true,
    this.headerBackground = true,
    this.emptyMessage,
    this.selectable = false,
    this.selectedIndices = const {},
    this.onSelectionChanged,
  });

  /// Column definitions
  final List<SingularTableColumn<T>> columns;

  /// Table data
  final List<T> data;

  /// Row tap callback
  final void Function(T item, int index)? onRowTap;

  /// Sort callback
  final void Function(String columnId, SingularSortDirection direction)? onSort;

  /// Currently sorted column
  final String? sortColumnId;

  /// Current sort direction
  final SingularSortDirection? sortDirection;

  /// Show striped rows
  final bool striped;

  /// Show borders
  final bool bordered;

  /// Show header background
  final bool headerBackground;

  /// Empty state message
  final String? emptyMessage;

  /// Enable row selection
  final bool selectable;

  /// Selected row indices
  final Set<int> selectedIndices;

  /// Selection changed callback
  final ValueChanged<Set<int>>? onSelectionChanged;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;

    if (data.isEmpty && emptyMessage != null) {
      return Container(
        padding: EdgeInsets.all(s.lg),
        decoration: BoxDecoration(
          color: c.bgSurface,
          borderRadius: r.md,
          border: bordered ? Border.all(color: c.borderWeak) : null,
        ),
        child: Center(
          child: Text(
            emptyMessage!,
            style: context.typography.bodyMedium.copyWith(
              color: c.textSecondary,
            ),
          ),
        ),
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.md,
        border: bordered ? Border.all(color: c.borderWeak) : null,
      ),
      child: ClipRRect(
        borderRadius: r.md,
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minWidth: MediaQuery.of(context).size.width,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header
                _TableHeader(
                  columns: columns,
                  onSort: onSort,
                  sortColumnId: sortColumnId,
                  sortDirection: sortDirection,
                  showBackground: headerBackground,
                  selectable: selectable,
                  allSelected: selectedIndices.length == data.length && data.isNotEmpty,
                  onSelectAll: selectable
                      ? (selected) {
                          if (selected) {
                            onSelectionChanged?.call(
                              Set.from(List.generate(data.length, (i) => i)),
                            );
                          } else {
                            onSelectionChanged?.call({});
                          }
                        }
                      : null,
                ),

                // Body
                ...data.asMap().entries.map((entry) {
                  final index = entry.key;
                  final item = entry.value;
                  final isSelected = selectedIndices.contains(index);

                  return _TableRow(
                    columns: columns,
                    item: item,
                    index: index,
                    striped: striped && index.isOdd,
                    selected: isSelected,
                    selectable: selectable,
                    onTap: onRowTap != null ? () => onRowTap!(item, index) : null,
                    onSelect: selectable
                        ? (selected) {
                            final newSelection = Set<int>.from(selectedIndices);
                            if (selected) {
                              newSelection.add(index);
                            } else {
                              newSelection.remove(index);
                            }
                            onSelectionChanged?.call(newSelection);
                          }
                        : null,
                  );
                }),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TableHeader<T> extends StatelessWidget {
  const _TableHeader({
    required this.columns,
    required this.onSort,
    required this.sortColumnId,
    required this.sortDirection,
    required this.showBackground,
    required this.selectable,
    required this.allSelected,
    required this.onSelectAll,
  });

  final List<SingularTableColumn<T>> columns;
  final void Function(String columnId, SingularSortDirection direction)? onSort;
  final String? sortColumnId;
  final SingularSortDirection? sortDirection;
  final bool showBackground;
  final bool selectable;
  final bool allSelected;
  final ValueChanged<bool>? onSelectAll;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Container(
      color: showBackground ? c.bgSurfaceSoft : null,
      padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
      child: Row(
        children: [
          if (selectable) ...[
            SizedBox(
              width: 40,
              child: Checkbox(
                value: allSelected,
                onChanged: (value) => onSelectAll?.call(value ?? false),
                activeColor: c.brandPrimary,
              ),
            ),
          ],
          ...columns.map((column) {
            final isSorted = column.id == sortColumnId;

            Widget header = Text(
              column.header,
              style: t.labelMedium.copyWith(
                color: c.textSecondary,
                fontWeight: FontWeight.w600,
              ),
            );

            if (column.sortable) {
              header = GestureDetector(
                onTap: () {
                  final newDirection = isSorted &&
                          sortDirection == SingularSortDirection.ascending
                      ? SingularSortDirection.descending
                      : SingularSortDirection.ascending;
                  onSort?.call(column.id, newDirection);
                },
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    header,
                    SizedBox(width: s.xxs),
                    Icon(
                      isSorted
                          ? sortDirection == SingularSortDirection.ascending
                              ? Icons.arrow_upward
                              : Icons.arrow_downward
                          : Icons.unfold_more,
                      size: 16,
                      color: isSorted ? c.brandPrimary : c.textDisabled,
                    ),
                  ],
                ),
              );
            }

            return _buildCell(
              column: column,
              child: Align(alignment: column.alignment, child: header),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildCell({
    required SingularTableColumn<T> column,
    required Widget child,
  }) {
    if (column.width != null) {
      return SizedBox(width: column.width, child: child);
    }
    if (column.flex != null) {
      return Expanded(flex: column.flex!, child: child);
    }
    return Expanded(child: child);
  }
}

class _TableRow<T> extends StatelessWidget {
  const _TableRow({
    required this.columns,
    required this.item,
    required this.index,
    required this.striped,
    required this.selected,
    required this.selectable,
    required this.onTap,
    required this.onSelect,
  });

  final List<SingularTableColumn<T>> columns;
  final T item;
  final int index;
  final bool striped;
  final bool selected;
  final bool selectable;
  final VoidCallback? onTap;
  final ValueChanged<bool>? onSelect;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    Color? bgColor;
    if (selected) {
      bgColor = c.brandPrimary.withValues(alpha: 0.1);
    } else if (striped) {
      bgColor = c.bgSurfaceSoft;
    }

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        color: bgColor,
        padding: EdgeInsets.symmetric(horizontal: s.md, vertical: s.sm),
        child: Row(
          children: [
            if (selectable) ...[
              SizedBox(
                width: 40,
                child: Checkbox(
                  value: selected,
                  onChanged: (value) => onSelect?.call(value ?? false),
                  activeColor: c.brandPrimary,
                ),
              ),
            ],
            ...columns.map((column) {
              return _buildCell(
                column: column,
                child: Align(
                  alignment: column.alignment,
                  child: column.cellBuilder(item, index),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget _buildCell({
    required SingularTableColumn<T> column,
    required Widget child,
  }) {
    if (column.width != null) {
      return SizedBox(width: column.width, child: child);
    }
    if (column.flex != null) {
      return Expanded(flex: column.flex!, child: child);
    }
    return Expanded(child: child);
  }
}
