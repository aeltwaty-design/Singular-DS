import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR STEPPER
/// =============================================================================
/// Steppers display progress through a sequence of steps.
///
/// ## Features
/// - Horizontal and vertical orientations
/// - 3 step states: completed, current, upcoming
/// - Clickable steps (optional)
/// - Labels and descriptions
/// =============================================================================

/// Step state
enum SingularStepState {
  /// Step is completed
  completed,

  /// Step is current/active
  current,

  /// Step is upcoming/disabled
  upcoming,

  /// Step has error
  error,
}

/// Stepper orientation
enum SingularStepperOrientation {
  /// Horizontal stepper
  horizontal,

  /// Vertical stepper
  vertical,
}

/// Step data
class SingularStep {
  const SingularStep({
    required this.label,
    this.description,
    this.state = SingularStepState.upcoming,
  });

  final String label;
  final String? description;
  final SingularStepState state;
}

class SingularStepper extends StatelessWidget {
  const SingularStepper({
    super.key,
    required this.steps,
    this.currentStep = 0,
    this.orientation = SingularStepperOrientation.horizontal,
    this.onStepTap,
  });

  /// Steps data
  final List<SingularStep> steps;

  /// Current active step index
  final int currentStep;

  /// Stepper orientation
  final SingularStepperOrientation orientation;

  /// Step tap callback
  final ValueChanged<int>? onStepTap;

  @override
  Widget build(BuildContext context) {
    if (orientation == SingularStepperOrientation.vertical) {
      return _buildVerticalStepper(context);
    }
    return _buildHorizontalStepper(context);
  }

  Widget _buildHorizontalStepper(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    return Row(
      children: steps.asMap().entries.expand((entry) {
        final index = entry.key;
        final step = entry.value;
        final isLast = index == steps.length - 1;

        return [
          Expanded(
            child: _StepItem(
              step: step,
              index: index,
              currentStep: currentStep,
              orientation: orientation,
              onTap: onStepTap != null ? () => onStepTap!(index) : null,
            ),
          ),
          if (!isLast)
            Expanded(
              child: Container(
                height: 2,
                margin: EdgeInsets.symmetric(horizontal: s.sm),
                color: index < currentStep ? c.brandPrimary : c.borderWeak,
              ),
            ),
        ];
      }).toList(),
    );
  }

  Widget _buildVerticalStepper(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: steps.asMap().entries.expand((entry) {
        final index = entry.key;
        final step = entry.value;
        final isLast = index == steps.length - 1;

        return [
          _StepItem(
            step: step,
            index: index,
            currentStep: currentStep,
            orientation: orientation,
            onTap: onStepTap != null ? () => onStepTap!(index) : null,
          ),
          if (!isLast)
            Padding(
              padding: EdgeInsets.only(left: s.md + 2),
              child: Container(
                width: 2,
                height: 24,
                color: index < currentStep ? c.brandPrimary : c.borderWeak,
              ),
            ),
        ];
      }).toList(),
    );
  }
}

class _StepItem extends StatelessWidget {
  const _StepItem({
    required this.step,
    required this.index,
    required this.currentStep,
    required this.orientation,
    this.onTap,
  });

  final SingularStep step;
  final int index;
  final int currentStep;
  final SingularStepperOrientation orientation;
  final VoidCallback? onTap;

  SingularStepState get _state {
    if (step.state != SingularStepState.upcoming) return step.state;
    if (index < currentStep) return SingularStepState.completed;
    if (index == currentStep) return SingularStepState.current;
    return SingularStepState.upcoming;
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    final (bgColor, borderColor, textColor, icon) = _getStateStyles(c);

    final stepIndicator = Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
        border: Border.all(color: borderColor, width: 2),
      ),
      child: Center(
        child: icon ??
            Text(
              '${index + 1}',
              style: t.labelMedium.copyWith(
                color: textColor,
                fontWeight: FontWeight.w600,
              ),
            ),
      ),
    );

    final content = orientation == SingularStepperOrientation.horizontal
        ? Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              stepIndicator,
              SizedBox(height: s.xs),
              Text(
                step.label,
                style: t.labelSmall.copyWith(
                  color: _state == SingularStepState.upcoming
                      ? c.textDisabled
                      : c.textPrimary,
                  fontWeight: _state == SingularStepState.current
                      ? FontWeight.w600
                      : FontWeight.w400,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          )
        : Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              stepIndicator,
              SizedBox(width: s.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      step.label,
                      style: t.labelMedium.copyWith(
                        color: _state == SingularStepState.upcoming
                            ? c.textDisabled
                            : c.textPrimary,
                        fontWeight: _state == SingularStepState.current
                            ? FontWeight.w600
                            : FontWeight.w400,
                      ),
                    ),
                    if (step.description != null) ...[
                      SizedBox(height: s.xxs),
                      Text(
                        step.description!,
                        style: t.bodySmall.copyWith(color: c.textSecondary),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          );

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: content,
    );
  }

  (Color bgColor, Color borderColor, Color textColor, Widget? icon)
      _getStateStyles(AppColors c) {
    switch (_state) {
      case SingularStepState.completed:
        return (
          c.brandPrimary,
          c.brandPrimary,
          c.textOnColor,
          Icon(Iconsax.tick_circle, size: 16, color: c.textOnColor)
        );
      case SingularStepState.current:
        return (c.brandPrimary.withValues(alpha: 0.1), c.brandPrimary, c.brandPrimary, null);
      case SingularStepState.upcoming:
        return (Colors.transparent, c.borderDefault, c.textDisabled, null);
      case SingularStepState.error:
        return (
          c.statusError.withValues(alpha: 0.1),
          c.statusError,
          c.statusError,
          Icon(Iconsax.danger, size: 16, color: c.statusError)
        );
    }
  }
}
