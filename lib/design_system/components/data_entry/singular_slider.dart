import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR SLIDER
/// =============================================================================
/// Sliders allow users to make selections from a range of values.
///
/// ## Features
/// - Single value and range selection
/// - Discrete steps option
/// - Labels and value display
/// - Disabled state
/// =============================================================================

/// Slider size
enum SingularSliderSize {
  /// Small - 4px track
  sm,

  /// Medium - 6px track (default)
  md,

  /// Large - 8px track
  lg,
}

class SingularSlider extends StatelessWidget {
  const SingularSlider({
    super.key,
    required this.value,
    required this.onChanged,
    this.min = 0,
    this.max = 100,
    this.divisions,
    this.size = SingularSliderSize.md,
    this.disabled = false,
    this.showValue = false,
    this.valuePrefix,
    this.valueSuffix,
    this.label,
  });

  /// Current value
  final double value;

  /// Value changed callback
  final ValueChanged<double> onChanged;

  /// Minimum value
  final double min;

  /// Maximum value
  final double max;

  /// Number of discrete divisions
  final int? divisions;

  /// Size variant
  final SingularSliderSize size;

  /// Disabled state
  final bool disabled;

  /// Show current value
  final bool showValue;

  /// Value prefix (e.g., "$")
  final String? valuePrefix;

  /// Value suffix (e.g., "%")
  final String? valueSuffix;

  /// Label text
  final String? label;

  double get _trackHeight {
    switch (size) {
      case SingularSliderSize.sm:
        return 4;
      case SingularSliderSize.md:
        return 6;
      case SingularSliderSize.lg:
        return 8;
    }
  }

  double get _thumbRadius {
    switch (size) {
      case SingularSliderSize.sm:
        return 8;
      case SingularSliderSize.md:
        return 10;
      case SingularSliderSize.lg:
        return 12;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    final displayValue = '${valuePrefix ?? ''}${value.round()}${valueSuffix ?? ''}';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label and value
        if (label != null || showValue)
          Padding(
            padding: EdgeInsets.only(bottom: s.xs),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (label != null)
                  Text(
                    label!,
                    style: t.labelMedium.copyWith(
                      color: disabled ? c.textDisabled : c.textPrimary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                if (showValue)
                  Text(
                    displayValue,
                    style: t.labelMedium.copyWith(
                      color: disabled ? c.textDisabled : c.brandPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
              ],
            ),
          ),

        // Slider
        SliderTheme(
          data: SliderThemeData(
            trackHeight: _trackHeight,
            activeTrackColor: disabled ? c.textDisabled : c.brandPrimary,
            inactiveTrackColor: c.bgSurfaceSoft,
            thumbColor: disabled ? c.textDisabled : c.brandPrimary,
            thumbShape: RoundSliderThumbShape(
              enabledThumbRadius: _thumbRadius,
              disabledThumbRadius: _thumbRadius,
            ),
            overlayColor: c.brandPrimary.withValues(alpha: 0.1),
            overlayShape: RoundSliderOverlayShape(overlayRadius: _thumbRadius * 2),
            trackShape: const RoundedRectSliderTrackShape(),
            tickMarkShape: divisions != null
                ? const RoundSliderTickMarkShape(tickMarkRadius: 2)
                : SliderTickMarkShape.noTickMark,
            activeTickMarkColor: c.bgSurface,
            inactiveTickMarkColor: c.borderWeak,
          ),
          child: Slider(
            value: value,
            min: min,
            max: max,
            divisions: divisions,
            onChanged: disabled ? null : onChanged,
          ),
        ),
      ],
    );
  }
}

/// Range slider for selecting a range of values
class SingularRangeSlider extends StatelessWidget {
  const SingularRangeSlider({
    super.key,
    required this.values,
    required this.onChanged,
    this.min = 0,
    this.max = 100,
    this.divisions,
    this.size = SingularSliderSize.md,
    this.disabled = false,
    this.showValue = false,
    this.valuePrefix,
    this.valueSuffix,
    this.label,
  });

  /// Current range values
  final RangeValues values;

  /// Values changed callback
  final ValueChanged<RangeValues> onChanged;

  /// Minimum value
  final double min;

  /// Maximum value
  final double max;

  /// Number of discrete divisions
  final int? divisions;

  /// Size variant
  final SingularSliderSize size;

  /// Disabled state
  final bool disabled;

  /// Show current values
  final bool showValue;

  /// Value prefix
  final String? valuePrefix;

  /// Value suffix
  final String? valueSuffix;

  /// Label text
  final String? label;

  double get _trackHeight {
    switch (size) {
      case SingularSliderSize.sm:
        return 4;
      case SingularSliderSize.md:
        return 6;
      case SingularSliderSize.lg:
        return 8;
    }
  }

  double get _thumbRadius {
    switch (size) {
      case SingularSliderSize.sm:
        return 8;
      case SingularSliderSize.md:
        return 10;
      case SingularSliderSize.lg:
        return 12;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    final prefix = valuePrefix ?? '';
    final suffix = valueSuffix ?? '';
    final displayValue = '$prefix${values.start.round()}$suffix - $prefix${values.end.round()}$suffix';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label and value
        if (label != null || showValue)
          Padding(
            padding: EdgeInsets.only(bottom: s.xs),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (label != null)
                  Text(
                    label!,
                    style: t.labelMedium.copyWith(
                      color: disabled ? c.textDisabled : c.textPrimary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                if (showValue)
                  Text(
                    displayValue,
                    style: t.labelMedium.copyWith(
                      color: disabled ? c.textDisabled : c.brandPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
              ],
            ),
          ),

        // Range slider
        SliderTheme(
          data: SliderThemeData(
            trackHeight: _trackHeight,
            activeTrackColor: disabled ? c.textDisabled : c.brandPrimary,
            inactiveTrackColor: c.bgSurfaceSoft,
            thumbColor: disabled ? c.textDisabled : c.brandPrimary,
            overlayColor: c.brandPrimary.withValues(alpha: 0.1),
            rangeThumbShape: RoundRangeSliderThumbShape(
              enabledThumbRadius: _thumbRadius,
              disabledThumbRadius: _thumbRadius,
            ),
            rangeTrackShape: const RoundedRectRangeSliderTrackShape(),
          ),
          child: RangeSlider(
            values: values,
            min: min,
            max: max,
            divisions: divisions,
            onChanged: disabled ? null : onChanged,
          ),
        ),
      ],
    );
  }
}
