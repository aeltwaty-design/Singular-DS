import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR DROPDOWN
/// =============================================================================
/// Dropdown menus for selecting from a list of options.
///
/// ## Features
/// - Label and hint text
/// - Placeholder support
/// - Search/filter capability
/// - Disabled state
/// - Error state
/// =============================================================================

/// Dropdown item data
class SingularDropdownItem<T> {
  const SingularDropdownItem({
    required this.value,
    required this.label,
    this.icon,
    this.description,
  });

  final T value;
  final String label;
  final IconData? icon;
  final String? description;
}

/// Dropdown size
enum SingularDropdownSize {
  /// Small - 40px height
  sm,

  /// Large - 48px height (default)
  lg,
}

class SingularDropdown<T> extends StatefulWidget {
  const SingularDropdown({
    super.key,
    required this.items,
    this.selectedValue,
    this.onChanged,
    this.label,
    this.hint,
    this.placeholder,
    this.danger = false,
    this.disabled = false,
    this.size = SingularDropdownSize.lg,
    this.fullWidth = true,
    this.searchable = false,
  });

  /// Dropdown items
  final List<SingularDropdownItem<T>> items;

  /// Currently selected value
  final T? selectedValue;

  /// Value changed callback
  final ValueChanged<T>? onChanged;

  /// Label text
  final String? label;

  /// Hint text
  final String? hint;

  /// Placeholder text
  final String? placeholder;

  /// Danger/error state
  final bool danger;

  /// Disabled state
  final bool disabled;

  /// Size variant
  final SingularDropdownSize size;

  /// Full width
  final bool fullWidth;

  /// Enable search
  final bool searchable;

  @override
  State<SingularDropdown<T>> createState() => _SingularDropdownState<T>();
}

class _SingularDropdownState<T> extends State<SingularDropdown<T>> {
  bool _isOpen = false;
  final _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  String _searchQuery = '';

  double get _height {
    return widget.size == SingularDropdownSize.sm ? 40 : 48;
  }

  SingularDropdownItem<T>? get _selectedItem {
    if (widget.selectedValue == null) return null;
    return widget.items.cast<SingularDropdownItem<T>?>().firstWhere(
          (item) => item?.value == widget.selectedValue,
          orElse: () => null,
        );
  }

  List<SingularDropdownItem<T>> get _filteredItems {
    if (_searchQuery.isEmpty) return widget.items;
    return widget.items
        .where((item) =>
            item.label.toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();
  }

  void _toggleDropdown() {
    if (widget.disabled) return;

    if (_isOpen) {
      _closeDropdown();
    } else {
      _openDropdown();
    }
  }

  void _openDropdown() {
    _overlayEntry = _createOverlayEntry();
    Overlay.of(context).insert(_overlayEntry!);
    setState(() => _isOpen = true);
  }

  void _closeDropdown() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    _searchQuery = '';
    setState(() => _isOpen = false);
  }

  void _selectItem(SingularDropdownItem<T> item) {
    widget.onChanged?.call(item.value);
    _closeDropdown();
  }

  OverlayEntry _createOverlayEntry() {
    final renderBox = context.findRenderObject() as RenderBox;
    final size = renderBox.size;

    return OverlayEntry(
      builder: (context) => Positioned(
        width: size.width,
        child: CompositedTransformFollower(
          link: _layerLink,
          showWhenUnlinked: false,
          offset: Offset(0, size.height + 4),
          child: _DropdownMenu<T>(
            items: _filteredItems,
            selectedValue: widget.selectedValue,
            onSelect: _selectItem,
            searchable: widget.searchable,
            onSearchChanged: (value) {
              _searchQuery = value;
              _overlayEntry?.markNeedsBuild();
            },
            onDismiss: _closeDropdown,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _closeDropdown();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final borderColor = widget.danger
        ? c.statusError
        : _isOpen
            ? c.borderFocus
            : c.borderDefault;
    final bgColor = widget.disabled ? c.bgSurfaceSoft : c.bgSurface;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: t.labelMedium.copyWith(
              color: widget.disabled ? c.textDisabled : c.textPrimary,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: s.xs),
        ],

        // Dropdown trigger
        CompositedTransformTarget(
          link: _layerLink,
          child: GestureDetector(
            onTap: _toggleDropdown,
            child: Container(
              height: _height,
              constraints: widget.fullWidth
                  ? const BoxConstraints(minWidth: double.infinity)
                  : null,
              padding: EdgeInsets.symmetric(horizontal: s.md),
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: r.sm,
                border: Border.all(color: borderColor, width: 1.5),
              ),
              child: Row(
                children: [
                  // Selected value or placeholder
                  Expanded(
                    child: _selectedItem != null
                        ? Row(
                            children: [
                              if (_selectedItem!.icon != null) ...[
                                Icon(
                                  _selectedItem!.icon,
                                  size: 20,
                                  color: widget.disabled
                                      ? c.textDisabled
                                      : c.textPrimary,
                                ),
                                SizedBox(width: s.sm),
                              ],
                              Text(
                                _selectedItem!.label,
                                style: t.bodyMedium.copyWith(
                                  color: widget.disabled
                                      ? c.textDisabled
                                      : c.textPrimary,
                                ),
                              ),
                            ],
                          )
                        : Text(
                            widget.placeholder ?? 'Select...',
                            style: t.bodyMedium.copyWith(color: c.textDisabled),
                          ),
                  ),

                  // Chevron
                  AnimatedRotation(
                    turns: _isOpen ? 0.5 : 0,
                    duration: const Duration(milliseconds: 200),
                    child: Icon(
                      Iconsax.arrow_down_1,
                      size: 20,
                      color: widget.disabled ? c.textDisabled : c.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),

        // Hint text
        if (widget.hint != null) ...[
          SizedBox(height: s.xs),
          Text(
            widget.hint!,
            style: t.bodySmall.copyWith(
              color: widget.danger ? c.statusError : c.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}

class _DropdownMenu<T> extends StatelessWidget {
  const _DropdownMenu({
    required this.items,
    required this.selectedValue,
    required this.onSelect,
    required this.searchable,
    required this.onSearchChanged,
    required this.onDismiss,
  });

  final List<SingularDropdownItem<T>> items;
  final T? selectedValue;
  final void Function(SingularDropdownItem<T>) onSelect;
  final bool searchable;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onDismiss;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    return TapRegion(
      onTapOutside: (_) => onDismiss(),
      child: Material(
        color: Colors.transparent,
        child: Container(
          constraints: const BoxConstraints(maxHeight: 280),
          decoration: BoxDecoration(
            color: c.bgSurface,
            borderRadius: r.md,
            border: Border.all(color: c.borderWeak),
            boxShadow: e.level2,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Search
              if (searchable) ...[
                Padding(
                  padding: EdgeInsets.all(s.sm),
                  child: TextField(
                    onChanged: onSearchChanged,
                    autofocus: true,
                    style: t.bodyMedium.copyWith(color: c.textPrimary),
                    decoration: InputDecoration(
                      hintText: 'Search...',
                      hintStyle: t.bodyMedium.copyWith(color: c.textDisabled),
                      prefixIcon: Icon(
                        Iconsax.search_normal_1,
                        size: 18,
                        color: c.textSecondary,
                      ),
                      border: OutlineInputBorder(
                        borderRadius: r.sm,
                        borderSide: BorderSide(color: c.borderDefault),
                      ),
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: s.sm,
                        vertical: s.sm,
                      ),
                      isDense: true,
                    ),
                  ),
                ),
                Divider(height: 1, color: c.borderWeak),
              ],

              // Items
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  padding: EdgeInsets.symmetric(vertical: s.xs),
                  itemCount: items.length,
                  itemBuilder: (context, index) {
                    final item = items[index];
                    final isSelected = item.value == selectedValue;

                    return InkWell(
                      onTap: () => onSelect(item),
                      child: Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: s.md,
                          vertical: s.sm,
                        ),
                        color: isSelected
                            ? c.brandPrimary.withValues(alpha: 0.1)
                            : null,
                        child: Row(
                          children: [
                            if (item.icon != null) ...[
                              Icon(
                                item.icon,
                                size: 20,
                                color: isSelected
                                    ? c.brandPrimary
                                    : c.textSecondary,
                              ),
                              SizedBox(width: s.sm),
                            ],
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.label,
                                    style: t.bodyMedium.copyWith(
                                      color: isSelected
                                          ? c.brandPrimary
                                          : c.textPrimary,
                                      fontWeight: isSelected
                                          ? FontWeight.w600
                                          : FontWeight.w400,
                                    ),
                                  ),
                                  if (item.description != null)
                                    Text(
                                      item.description!,
                                      style: t.bodySmall
                                          .copyWith(color: c.textSecondary),
                                    ),
                                ],
                              ),
                            ),
                            if (isSelected)
                              Icon(
                                Iconsax.tick_circle,
                                size: 18,
                                color: c.brandPrimary,
                              ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
