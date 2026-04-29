import 'package:flutter/material.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP SPACING THEME EXTENSION
/// =============================================================================
/// Spacing tokens based on a 4px base unit (half-base rule).
/// Provides consistent spacing values for margins, padding, and gaps.
///
/// USAGE:
/// ```dart
/// final spacing = Theme.of(context).extension<AppSpacing>()!;
/// Padding(padding: EdgeInsets.all(spacing.md));
/// SizedBox(width: spacing.lg);
/// ```
/// =============================================================================

/// Device type for responsive layout calculations
enum DeviceType {
  mobile,
  tablet,
  desktop,
}

@immutable
class AppSpacing extends ThemeExtension<AppSpacing> {
  const AppSpacing({
    required this.none,
    required this.xxs,
    required this.xs,
    required this.sm,
    required this.md,
    required this.lg,
    required this.xl,
    required this.xxl,
    required this.section,
    required this.sectionLg,
    required this.sectionXl,
    required this.pageMargin,
    required this.gutter,
    required this.baseUnit,
  });

  // ===========================================================================
  // SPACING TOKENS
  // ===========================================================================

  /// No spacing - 0px
  final double none;

  /// Extra extra small spacing - 2px
  final double xxs;

  /// Extra small spacing - 4px (1 base unit)
  final double xs;

  /// Small spacing - 8px (2 base units)
  final double sm;

  /// Medium spacing - 12px (3 base units)
  final double md;

  /// Large spacing - 16px (4 base units)
  final double lg;

  /// Extra large spacing - 20px (5 base units)
  final double xl;

  /// Extra extra large spacing - 24px (6 base units)
  final double xxl;

  /// Section spacing - 32px (8 base units)
  final double section;

  /// Large section spacing - 48px (12 base units)
  final double sectionLg;

  /// Extra large section spacing - 64px (16 base units)
  final double sectionXl;

  // ===========================================================================
  // LAYOUT TOKENS
  // ===========================================================================

  /// Page margin - varies by device
  /// Mobile: 16px, Tablet: 32px, Desktop: 64px
  final double pageMargin;

  /// Gutter - space between grid columns
  final double gutter;

  /// Base unit for calculations - 4px
  final double baseUnit;

  // ===========================================================================
  // FACTORY CONSTRUCTORS
  // ===========================================================================

  /// Creates default spacing tokens
  factory AppSpacing.standard() {
    return const AppSpacing(
      none: 0,
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      section: 32,
      sectionLg: 48,
      sectionXl: 64,
      pageMargin: 16, // Default to mobile
      gutter: 16,
      baseUnit: 4,
    );
  }

  /// Creates spacing tokens for mobile devices
  factory AppSpacing.mobile() {
    return const AppSpacing(
      none: 0,
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      section: 32,
      sectionLg: 48,
      sectionXl: 64,
      pageMargin: 16,
      gutter: 16,
      baseUnit: 4,
    );
  }

  /// Creates spacing tokens for tablet devices
  factory AppSpacing.tablet() {
    return const AppSpacing(
      none: 0,
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      section: 32,
      sectionLg: 48,
      sectionXl: 64,
      pageMargin: 32,
      gutter: 24,
      baseUnit: 4,
    );
  }

  /// Creates spacing tokens for desktop devices
  factory AppSpacing.desktop() {
    return const AppSpacing(
      none: 0,
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      section: 32,
      sectionLg: 48,
      sectionXl: 64,
      pageMargin: 64,
      gutter: 32,
      baseUnit: 4,
    );
  }

  /// Creates spacing tokens based on device type
  factory AppSpacing.forDevice(DeviceType deviceType) {
    switch (deviceType) {
      case DeviceType.mobile:
        return AppSpacing.mobile();
      case DeviceType.tablet:
        return AppSpacing.tablet();
      case DeviceType.desktop:
        return AppSpacing.desktop();
    }
  }

  /// Creates spacing tokens based on screen width
  factory AppSpacing.responsive(double screenWidth) {
    if (screenWidth >= 1200) {
      return AppSpacing.desktop();
    } else if (screenWidth >= 768) {
      return AppSpacing.tablet();
    } else {
      return AppSpacing.mobile();
    }
  }

  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

  /// Get spacing value multiplied by the given factor
  double scaled(double factor) => baseUnit * factor;

  /// Get EdgeInsets with equal spacing on all sides
  EdgeInsets all(double value) => EdgeInsets.all(value);

  /// Get horizontal EdgeInsets
  EdgeInsets horizontal(double value) => EdgeInsets.symmetric(horizontal: value);

  /// Get vertical EdgeInsets
  EdgeInsets vertical(double value) => EdgeInsets.symmetric(vertical: value);

  /// Get symmetric EdgeInsets
  EdgeInsets symmetric({double horizontal = 0, double vertical = 0}) =>
      EdgeInsets.symmetric(horizontal: horizontal, vertical: vertical);

  /// Get EdgeInsets for page content (with page margin)
  EdgeInsets get pageInsets => EdgeInsets.symmetric(horizontal: pageMargin);

  /// Get EdgeInsets for card content
  EdgeInsets get cardInsets => EdgeInsets.all(lg);

  /// Get EdgeInsets for list items
  EdgeInsets get listItemInsets => EdgeInsets.symmetric(horizontal: lg, vertical: md);

  /// Get EdgeInsets for sections
  EdgeInsets get sectionInsets => EdgeInsets.symmetric(vertical: section);

  // ===========================================================================
  // COPY WITH
  // ===========================================================================

  @override
  AppSpacing copyWith({
    double? none,
    double? xxs,
    double? xs,
    double? sm,
    double? md,
    double? lg,
    double? xl,
    double? xxl,
    double? section,
    double? sectionLg,
    double? sectionXl,
    double? pageMargin,
    double? gutter,
    double? baseUnit,
  }) {
    return AppSpacing(
      none: none ?? this.none,
      xxs: xxs ?? this.xxs,
      xs: xs ?? this.xs,
      sm: sm ?? this.sm,
      md: md ?? this.md,
      lg: lg ?? this.lg,
      xl: xl ?? this.xl,
      xxl: xxl ?? this.xxl,
      section: section ?? this.section,
      sectionLg: sectionLg ?? this.sectionLg,
      sectionXl: sectionXl ?? this.sectionXl,
      pageMargin: pageMargin ?? this.pageMargin,
      gutter: gutter ?? this.gutter,
      baseUnit: baseUnit ?? this.baseUnit,
    );
  }

  // ===========================================================================
  // LERP (Linear Interpolation for Smooth Transitions)
  // ===========================================================================

  @override
  AppSpacing lerp(ThemeExtension<AppSpacing>? other, double t) {
    if (other is! AppSpacing) {
      return this;
    }
    return AppSpacing(
      none: _lerpDouble(none, other.none, t),
      xxs: _lerpDouble(xxs, other.xxs, t),
      xs: _lerpDouble(xs, other.xs, t),
      sm: _lerpDouble(sm, other.sm, t),
      md: _lerpDouble(md, other.md, t),
      lg: _lerpDouble(lg, other.lg, t),
      xl: _lerpDouble(xl, other.xl, t),
      xxl: _lerpDouble(xxl, other.xxl, t),
      section: _lerpDouble(section, other.section, t),
      sectionLg: _lerpDouble(sectionLg, other.sectionLg, t),
      sectionXl: _lerpDouble(sectionXl, other.sectionXl, t),
      pageMargin: _lerpDouble(pageMargin, other.pageMargin, t),
      gutter: _lerpDouble(gutter, other.gutter, t),
      baseUnit: _lerpDouble(baseUnit, other.baseUnit, t),
    );
  }

  double _lerpDouble(double a, double b, double t) {
    return a + (b - a) * t;
  }

  // ===========================================================================
  // EQUALITY
  // ===========================================================================

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is AppSpacing &&
        other.none == none &&
        other.xxs == xxs &&
        other.xs == xs &&
        other.sm == sm &&
        other.md == md &&
        other.lg == lg &&
        other.xl == xl &&
        other.xxl == xxl &&
        other.section == section &&
        other.sectionLg == sectionLg &&
        other.sectionXl == sectionXl &&
        other.pageMargin == pageMargin &&
        other.gutter == gutter &&
        other.baseUnit == baseUnit;
  }

  @override
  int get hashCode {
    return Object.hashAll([
      none,
      xxs,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      section,
      sectionLg,
      sectionXl,
      pageMargin,
      gutter,
      baseUnit,
    ]);
  }
}

// =============================================================================
// EXTENSION FOR EASY ACCESS
// =============================================================================

/// Extension to easily access AppSpacing from BuildContext
extension AppSpacingExtension on BuildContext {
  /// Access AppSpacing from the current theme
  AppSpacing get spacing => Theme.of(this).extension<AppSpacing>()!;
}

// =============================================================================
// GAP WIDGETS FOR CONVENIENCE
// =============================================================================

/// Convenience widgets for common spacing gaps
class Gap extends StatelessWidget {
  const Gap(this.size, {super.key});

  final double size;

  /// No gap (0px)
  const Gap.none({super.key}) : size = 0;

  /// Extra extra small gap (2px)
  const Gap.xxs({super.key}) : size = 2;

  /// Extra small gap (4px)
  const Gap.xs({super.key}) : size = 4;

  /// Small gap (8px)
  const Gap.sm({super.key}) : size = 8;

  /// Medium gap (12px)
  const Gap.md({super.key}) : size = 12;

  /// Large gap (16px)
  const Gap.lg({super.key}) : size = 16;

  /// Extra large gap (20px)
  const Gap.xl({super.key}) : size = 20;

  /// Extra extra large gap (24px)
  const Gap.xxl({super.key}) : size = 24;

  /// Section gap (32px)
  const Gap.section({super.key}) : size = 32;

  /// Large section gap (48px)
  const Gap.sectionLg({super.key}) : size = 48;

  /// Extra large section gap (64px)
  const Gap.sectionXl({super.key}) : size = 64;

  @override
  Widget build(BuildContext context) {
    return SizedBox(width: size, height: size);
  }
}

/// Horizontal gap widget
class HGap extends StatelessWidget {
  const HGap(this.size, {super.key});

  final double size;

  const HGap.xxs({super.key}) : size = 2;
  const HGap.xs({super.key}) : size = 4;
  const HGap.sm({super.key}) : size = 8;
  const HGap.md({super.key}) : size = 12;
  const HGap.lg({super.key}) : size = 16;
  const HGap.xl({super.key}) : size = 20;
  const HGap.xxl({super.key}) : size = 24;

  @override
  Widget build(BuildContext context) {
    return SizedBox(width: size);
  }
}

/// Vertical gap widget
class VGap extends StatelessWidget {
  const VGap(this.size, {super.key});

  final double size;

  const VGap.xxs({super.key}) : size = 2;
  const VGap.xs({super.key}) : size = 4;
  const VGap.sm({super.key}) : size = 8;
  const VGap.md({super.key}) : size = 12;
  const VGap.lg({super.key}) : size = 16;
  const VGap.xl({super.key}) : size = 20;
  const VGap.xxl({super.key}) : size = 24;
  const VGap.section({super.key}) : size = 32;
  const VGap.sectionLg({super.key}) : size = 48;

  @override
  Widget build(BuildContext context) {
    return SizedBox(height: size);
  }
}

