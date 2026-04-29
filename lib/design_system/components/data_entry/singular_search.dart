import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SEARCH
/// =============================================================================
/// Search input field for filtering and finding content.
///
/// ## Features
/// - Search icon leading
/// - Clear button when has value
/// - Placeholder text
/// - Size variants
/// - Disabled state
/// =============================================================================

/// Search size variant
enum SingularSearchSize {
  /// Small - 40px height
  sm,

  /// Large - 48px height (default)
  lg,
}

class SingularSearch extends StatefulWidget {
  const SingularSearch({
    super.key,
    this.controller,
    this.size = SingularSearchSize.lg,
    this.placeholder,
    this.disabled = false,
    this.autofocus = false,
    this.onChanged,
    this.onSubmitted,
    this.onClear,
    this.fullWidth = true,
  });

  /// Text editing controller
  final TextEditingController? controller;

  /// Size variant
  final SingularSearchSize size;

  /// Placeholder text
  final String? placeholder;

  /// Disabled state
  final bool disabled;

  /// Auto focus
  final bool autofocus;

  /// Value changed callback
  final ValueChanged<String>? onChanged;

  /// Submitted callback
  final ValueChanged<String>? onSubmitted;

  /// Clear button callback
  final VoidCallback? onClear;

  /// Full width
  final bool fullWidth;

  @override
  State<SingularSearch> createState() => _SingularSearchState();
}

class _SingularSearchState extends State<SingularSearch> {
  late TextEditingController _controller;
  bool _hasValue = false;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _hasValue = _controller.text.isNotEmpty;
    _controller.addListener(_onTextChanged);
  }

  @override
  void dispose() {
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  void _onTextChanged() {
    final hasValue = _controller.text.isNotEmpty;
    if (hasValue != _hasValue) {
      setState(() => _hasValue = hasValue);
    }
  }

  void _onClear() {
    _controller.clear();
    widget.onClear?.call();
    widget.onChanged?.call('');
  }

  double get _height {
    return widget.size == SingularSearchSize.sm ? 40 : 48;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final borderColor = _isFocused ? c.borderFocus : c.borderDefault;
    final bgColor = widget.disabled ? c.bgSurfaceSoft : c.bgSurface;

    return Container(
      height: _height,
      constraints: widget.fullWidth
          ? const BoxConstraints(minWidth: double.infinity)
          : null,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: r.sm,
        border: Border.all(color: borderColor, width: 1.5),
      ),
      child: Row(
        children: [
          // Search icon
          Padding(
            padding: EdgeInsets.only(left: s.md),
            child: Icon(
              Iconsax.search_normal_1,
              size: 20,
              color: widget.disabled ? c.textDisabled : c.textSecondary,
            ),
          ),

          // Text field
          Expanded(
            child: Focus(
              onFocusChange: (focused) {
                setState(() => _isFocused = focused);
              },
              child: TextField(
                controller: _controller,
                enabled: !widget.disabled,
                autofocus: widget.autofocus,
                onChanged: widget.onChanged,
                onSubmitted: widget.onSubmitted,
                textInputAction: TextInputAction.search,
                style: t.bodyMedium.copyWith(
                  color: widget.disabled ? c.textDisabled : c.textPrimary,
                ),
                decoration: InputDecoration(
                  hintText: widget.placeholder ?? 'Search...',
                  hintStyle: t.bodyMedium.copyWith(color: c.textDisabled),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: s.sm),
                  isDense: true,
                ),
              ),
            ),
          ),

          // Clear button
          if (_hasValue && !widget.disabled)
            GestureDetector(
              onTap: _onClear,
              child: Padding(
                padding: EdgeInsets.only(right: s.md),
                child: Icon(
                  Iconsax.close_circle,
                  size: 20,
                  color: c.textSecondary,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
