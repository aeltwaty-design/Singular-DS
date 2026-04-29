import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR INPUT FIELD
/// =============================================================================
/// Text input fields for user data entry with various types and states.
///
/// ## Features
/// - Multiple input types: simple, leadingIcon, trailingAction, textarea
/// - 2 sizes: sm, lg
/// - Danger/error state
/// - Disabled state
/// - Label and hint text support
/// - Leading/trailing icons
/// =============================================================================

/// Input field type variant
enum SingularInputType {
  /// Simple text input
  simple,

  /// Input with leading icon
  leadingIcon,

  /// Input with trailing action button
  trailingAction,

  /// Multi-line text area
  textarea,

  /// Password input with visibility toggle
  password,
}

/// Input field size variant
enum SingularInputSize {
  /// Small - 40px height
  sm,

  /// Large - 48px height (default)
  lg,
}

class SingularInputField extends StatefulWidget {
  const SingularInputField({
    super.key,
    this.controller,
    this.inputType = SingularInputType.simple,
    this.size = SingularInputSize.lg,
    this.label,
    this.hint,
    this.placeholder,
    this.danger = false,
    this.disabled = false,
    this.leadingIcon,
    this.trailingIcon,
    this.trailingActionLabel,
    this.trailingActionIcon,
    this.onTrailingAction,
    this.onChanged,
    this.onSubmitted,
    this.keyboardType,
    this.textInputAction,
    this.maxLines = 1,
    this.minLines,
    this.maxLength,
    this.obscureText = false,
    this.autofocus = false,
    this.fullWidth = true,
  });

  /// Text editing controller
  final TextEditingController? controller;

  /// Input type variant
  final SingularInputType inputType;

  /// Size variant
  final SingularInputSize size;

  /// Label text above input
  final String? label;

  /// Hint/helper text below input
  final String? hint;

  /// Placeholder text
  final String? placeholder;

  /// Show danger/error styling
  final bool danger;

  /// Disable the input
  final bool disabled;

  /// Leading icon (for leadingIcon type)
  final IconData? leadingIcon;

  /// Trailing icon (for simple type)
  final IconData? trailingIcon;

  /// Trailing action button label
  final String? trailingActionLabel;

  /// Trailing action button icon
  final IconData? trailingActionIcon;

  /// Trailing action callback
  final VoidCallback? onTrailingAction;

  /// Value changed callback
  final ValueChanged<String>? onChanged;

  /// Submitted callback
  final ValueChanged<String>? onSubmitted;

  /// Keyboard type
  final TextInputType? keyboardType;

  /// Text input action
  final TextInputAction? textInputAction;

  /// Max lines (for textarea)
  final int maxLines;

  /// Min lines (for textarea)
  final int? minLines;

  /// Max length
  final int? maxLength;

  /// Obscure text (for password)
  final bool obscureText;

  /// Auto focus
  final bool autofocus;

  /// Full width
  final bool fullWidth;

  @override
  State<SingularInputField> createState() => _SingularInputFieldState();
}

class _SingularInputFieldState extends State<SingularInputField> {
  late bool _obscureText;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.obscureText || widget.inputType == SingularInputType.password;
  }

  double get _height {
    if (widget.inputType == SingularInputType.textarea) {
      return (widget.maxLines * 24.0) + 24;
    }
    return widget.size == SingularInputSize.sm ? 40 : 48;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final borderColor = widget.danger
        ? c.statusError
        : _isFocused
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

        // Input field
        Container(
          height: widget.inputType == SingularInputType.textarea ? null : _height,
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
              // Leading icon
              if (widget.inputType == SingularInputType.leadingIcon &&
                  widget.leadingIcon != null) ...[
                Padding(
                  padding: EdgeInsets.only(left: s.md),
                  child: Icon(
                    widget.leadingIcon,
                    size: 20,
                    color: widget.disabled ? c.textDisabled : c.textSecondary,
                  ),
                ),
              ],

              // Text field
              Expanded(
                child: Focus(
                  onFocusChange: (focused) {
                    setState(() => _isFocused = focused);
                  },
                  child: TextField(
                    controller: widget.controller,
                    enabled: !widget.disabled,
                    obscureText: _obscureText,
                    autofocus: widget.autofocus,
                    keyboardType: widget.keyboardType,
                    textInputAction: widget.textInputAction,
                    maxLines: widget.inputType == SingularInputType.textarea
                        ? widget.maxLines
                        : 1,
                    minLines: widget.minLines,
                    maxLength: widget.maxLength,
                    onChanged: widget.onChanged,
                    onSubmitted: widget.onSubmitted,
                    style: t.bodyMedium.copyWith(
                      color: widget.disabled ? c.textDisabled : c.textPrimary,
                    ),
                    decoration: InputDecoration(
                      hintText: widget.placeholder,
                      hintStyle: t.bodyMedium.copyWith(color: c.textDisabled),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: s.md,
                        vertical: widget.inputType == SingularInputType.textarea
                            ? s.md
                            : 0,
                      ),
                      counterText: '',
                      isDense: true,
                    ),
                  ),
                ),
              ),

              // Trailing icon or action
              if (widget.inputType == SingularInputType.password) ...[
                GestureDetector(
                  onTap: () => setState(() => _obscureText = !_obscureText),
                  child: Padding(
                    padding: EdgeInsets.only(right: s.md),
                    child: Icon(
                      _obscureText ? Iconsax.eye_slash : Iconsax.eye,
                      size: 20,
                      color: c.textSecondary,
                    ),
                  ),
                ),
              ] else if (widget.inputType == SingularInputType.trailingAction) ...[
                GestureDetector(
                  onTap: widget.disabled ? null : widget.onTrailingAction,
                  child: Container(
                    height: _height - 2,
                    padding: EdgeInsets.symmetric(horizontal: s.md),
                    decoration: BoxDecoration(
                      color: c.brandPrimary,
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(r.sm.topRight.x - 1),
                        bottomRight: Radius.circular(r.sm.bottomRight.x - 1),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (widget.trailingActionIcon != null) ...[
                          Icon(
                            widget.trailingActionIcon,
                            size: 16,
                            color: c.textOnColor,
                          ),
                          if (widget.trailingActionLabel != null)
                            SizedBox(width: s.xs),
                        ],
                        if (widget.trailingActionLabel != null)
                          Text(
                            widget.trailingActionLabel!,
                            style: t.labelMedium.copyWith(
                              color: c.textOnColor,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ] else if (widget.trailingIcon != null) ...[
                Padding(
                  padding: EdgeInsets.only(right: s.md),
                  child: Icon(
                    widget.trailingIcon,
                    size: 20,
                    color: widget.disabled ? c.textDisabled : c.textSecondary,
                  ),
                ),
              ],
            ],
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
