import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR DATE PICKER
/// =============================================================================
/// Date pickers allow users to select dates from a calendar.
///
/// ## Features
/// - Single date selection
/// - Date range selection
/// - Label and hint text
/// - Disabled state
/// - Custom date format
/// =============================================================================

/// Date picker type
enum SingularDatePickerType {
  /// Single date selection
  single,

  /// Date range selection
  range,
}

/// Date picker size
enum SingularDatePickerSize {
  /// Small - 40px height
  sm,

  /// Large - 48px height (default)
  lg,
}

class SingularDatePicker extends StatelessWidget {
  const SingularDatePicker({
    super.key,
    this.type = SingularDatePickerType.single,
    this.size = SingularDatePickerSize.lg,
    this.selectedDate,
    this.startDate,
    this.endDate,
    this.onDateSelected,
    this.onRangeSelected,
    this.label,
    this.hint,
    this.placeholder,
    this.danger = false,
    this.disabled = false,
    this.firstDate,
    this.lastDate,
    this.dateFormat,
    this.fullWidth = true,
  });

  /// Picker type
  final SingularDatePickerType type;

  /// Size variant
  final SingularDatePickerSize size;

  /// Selected date (for single type)
  final DateTime? selectedDate;

  /// Start date (for range type)
  final DateTime? startDate;

  /// End date (for range type)
  final DateTime? endDate;

  /// Date selected callback (single type)
  final ValueChanged<DateTime>? onDateSelected;

  /// Range selected callback
  final void Function(DateTime start, DateTime end)? onRangeSelected;

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

  /// First selectable date
  final DateTime? firstDate;

  /// Last selectable date
  final DateTime? lastDate;

  /// Custom date format function
  final String Function(DateTime)? dateFormat;

  /// Full width
  final bool fullWidth;

  double get _height => size == SingularDatePickerSize.sm ? 40 : 48;

  String _formatDate(DateTime date) {
    if (dateFormat != null) return dateFormat!(date);
    return '${date.day}/${date.month}/${date.year}';
  }

  String _getDisplayText() {
    if (type == SingularDatePickerType.single) {
      return selectedDate != null
          ? _formatDate(selectedDate!)
          : placeholder ?? 'Select date';
    } else {
      if (startDate != null && endDate != null) {
        return '${_formatDate(startDate!)} - ${_formatDate(endDate!)}';
      }
      return placeholder ?? 'Select date range';
    }
  }

  Future<void> _showDatePicker(BuildContext context) async {
    final c = context.colors;

    if (type == SingularDatePickerType.single) {
      final date = await showDatePicker(
        context: context,
        initialDate: selectedDate ?? DateTime.now(),
        firstDate: firstDate ?? DateTime(2000),
        lastDate: lastDate ?? DateTime(2100),
        builder: (context, child) => Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: c.brandPrimary,
              onPrimary: c.textOnColor,
              surface: c.bgSurface,
              onSurface: c.textPrimary,
            ),
          ),
          child: child!,
        ),
      );
      if (date != null) {
        onDateSelected?.call(date);
      }
    } else {
      final range = await showDateRangePicker(
        context: context,
        firstDate: firstDate ?? DateTime(2000),
        lastDate: lastDate ?? DateTime(2100),
        initialDateRange: startDate != null && endDate != null
            ? DateTimeRange(start: startDate!, end: endDate!)
            : null,
        builder: (context, child) => Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: c.brandPrimary,
              onPrimary: c.textOnColor,
              surface: c.bgSurface,
              onSurface: c.textPrimary,
            ),
          ),
          child: child!,
        ),
      );
      if (range != null) {
        onRangeSelected?.call(range.start, range.end);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final hasValue = type == SingularDatePickerType.single
        ? selectedDate != null
        : startDate != null && endDate != null;

    final borderColor = danger ? c.statusError : c.borderDefault;
    final bgColor = disabled ? c.bgSurfaceSoft : c.bgSurface;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label
        if (label != null) ...[
          Text(
            label!,
            style: t.labelMedium.copyWith(
              color: disabled ? c.textDisabled : c.textPrimary,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: s.xs),
        ],

        // Picker trigger
        GestureDetector(
          onTap: disabled ? null : () => _showDatePicker(context),
          child: Container(
            height: _height,
            constraints: fullWidth
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
                // Calendar icon
                Icon(
                  Iconsax.calendar_1,
                  size: 20,
                  color: disabled ? c.textDisabled : c.textSecondary,
                ),
                SizedBox(width: s.sm),

                // Display text
                Expanded(
                  child: Text(
                    _getDisplayText(),
                    style: t.bodyMedium.copyWith(
                      color: hasValue
                          ? disabled
                              ? c.textDisabled
                              : c.textPrimary
                          : c.textDisabled,
                    ),
                  ),
                ),

                // Chevron
                Icon(
                  Iconsax.arrow_down_1,
                  size: 20,
                  color: disabled ? c.textDisabled : c.textSecondary,
                ),
              ],
            ),
          ),
        ),

        // Hint text
        if (hint != null) ...[
          SizedBox(height: s.xs),
          Text(
            hint!,
            style: t.bodySmall.copyWith(
              color: danger ? c.statusError : c.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}
