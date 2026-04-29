import 'package:flutter/material.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR PROGRESS
/// =============================================================================
/// Progress indicators show the completion status of a task or process.
///
/// ## Features
/// - Linear and circular variants
/// - Determinate and indeterminate modes
/// - 3 sizes: sm, md, lg
/// - Status colors
/// - Label support
/// =============================================================================

/// Progress type
enum SingularProgressType {
  /// Linear progress bar
  linear,

  /// Circular progress indicator
  circular,
}

/// Progress size
enum SingularProgressSize {
  /// Small
  sm,

  /// Medium (default)
  md,

  /// Large
  lg,
}

/// Progress status
enum SingularProgressStatus {
  /// Default/neutral
  defaultStatus,

  /// Success
  success,

  /// Warning
  warning,

  /// Danger/error
  danger,
}

class SingularProgress extends StatelessWidget {
  const SingularProgress({
    super.key,
    this.type = SingularProgressType.linear,
    this.size = SingularProgressSize.md,
    this.status = SingularProgressStatus.defaultStatus,
    this.value,
    this.showLabel = false,
    this.label,
  });

  /// Progress type
  final SingularProgressType type;

  /// Size variant
  final SingularProgressSize size;

  /// Status color
  final SingularProgressStatus status;

  /// Progress value (0.0 - 1.0), null for indeterminate
  final double? value;

  /// Show percentage label
  final bool showLabel;

  /// Custom label
  final String? label;

  double get _linearHeight {
    switch (size) {
      case SingularProgressSize.sm:
        return 4;
      case SingularProgressSize.md:
        return 8;
      case SingularProgressSize.lg:
        return 12;
    }
  }

  double get _circularSize {
    switch (size) {
      case SingularProgressSize.sm:
        return 24;
      case SingularProgressSize.md:
        return 40;
      case SingularProgressSize.lg:
        return 56;
    }
  }

  double get _circularStrokeWidth {
    switch (size) {
      case SingularProgressSize.sm:
        return 3;
      case SingularProgressSize.md:
        return 4;
      case SingularProgressSize.lg:
        return 5;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final progressColor = _getStatusColor(c);
    final trackColor = c.bgSurfaceSoft;

    if (type == SingularProgressType.circular) {
      return _buildCircular(progressColor, trackColor, c, t);
    }

    return _buildLinear(progressColor, trackColor, s, t, r);
  }

  Widget _buildLinear(
    Color progressColor,
    Color trackColor,
    AppSpacing s,
    AppTypography t,
    AppRadius r,
  ) {
    final displayLabel = label ?? '${((value ?? 0) * 100).round()}%';

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showLabel) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Spacer(),
              Text(
                displayLabel,
                style: t.labelSmall.copyWith(
                  color: progressColor,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: s.xs),
        ],
        ClipRRect(
          borderRadius: r.full,
          child: SizedBox(
            height: _linearHeight,
            child: value != null
                ? LinearProgressIndicator(
                    value: value,
                    backgroundColor: trackColor,
                    valueColor: AlwaysStoppedAnimation(progressColor),
                  )
                : LinearProgressIndicator(
                    backgroundColor: trackColor,
                    valueColor: AlwaysStoppedAnimation(progressColor),
                  ),
          ),
        ),
      ],
    );
  }

  Widget _buildCircular(
    Color progressColor,
    Color trackColor,
    AppColors c,
    AppTypography t,
  ) {
    final displayLabel = label ?? '${((value ?? 0) * 100).round()}%';

    return SizedBox(
      width: _circularSize,
      height: _circularSize,
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: _circularSize,
            height: _circularSize,
            child: value != null
                ? CircularProgressIndicator(
                    value: value,
                    strokeWidth: _circularStrokeWidth,
                    backgroundColor: trackColor,
                    valueColor: AlwaysStoppedAnimation(progressColor),
                  )
                : CircularProgressIndicator(
                    strokeWidth: _circularStrokeWidth,
                    backgroundColor: trackColor,
                    valueColor: AlwaysStoppedAnimation(progressColor),
                  ),
          ),
          if (showLabel && value != null && size != SingularProgressSize.sm)
            Text(
              displayLabel,
              style: t.labelSmall.copyWith(
                color: c.textPrimary,
                fontSize: size == SingularProgressSize.lg ? 12 : 10,
                fontWeight: FontWeight.w600,
              ),
            ),
        ],
      ),
    );
  }

  Color _getStatusColor(AppColors c) {
    switch (status) {
      case SingularProgressStatus.defaultStatus:
        return c.brandPrimary;
      case SingularProgressStatus.success:
        return c.statusSuccess;
      case SingularProgressStatus.warning:
        return c.statusWarning;
      case SingularProgressStatus.danger:
        return c.statusError;
    }
  }
}
