import 'package:flutter/material.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP RADIUS THEME EXTENSION
/// =============================================================================
/// Border radius tokens for consistent corner rounding across the design system.
///
/// USAGE:
/// ```dart
/// final radius = Theme.of(context).extension<AppRadius>()!;
/// Container(
///   decoration: BoxDecoration(
///     borderRadius: radius.md,
///   ),
/// );
/// ```
/// =============================================================================

@immutable
class AppRadius extends ThemeExtension<AppRadius> {
  const AppRadius({
    required this.none,
    required this.xs,
    required this.sm,
    required this.md,
    required this.lg,
    required this.xl,
    required this.full,
  });

  // ===========================================================================
  // RADIUS TOKENS (as BorderRadius)
  // ===========================================================================

  /// No radius - 0px (sharp corners)
  final BorderRadius none;

  /// Extra small radius - 4px
  final BorderRadius xs;

  /// Small radius - 8px
  final BorderRadius sm;

  /// Medium radius - 12px
  final BorderRadius md;

  /// Large radius - 16px
  final BorderRadius lg;

  /// Extra large radius - 24px
  final BorderRadius xl;

  /// Full/Circular radius - 999px (pill shape)
  final BorderRadius full;

  // ===========================================================================
  // FACTORY CONSTRUCTOR
  // ===========================================================================

  /// Creates the standard radius token set
  factory AppRadius.standard() {
    return AppRadius(
      none: BorderRadius.zero,
      xs: BorderRadius.circular(4),
      sm: BorderRadius.circular(8),
      md: BorderRadius.circular(12),
      lg: BorderRadius.circular(16),
      xl: BorderRadius.circular(24),
      full: BorderRadius.circular(999),
    );
  }

  // ===========================================================================
  // RAW VALUE GETTERS (for cases where double is needed)
  // ===========================================================================

  /// Get raw double values for radius
  static const double valueNone = 0;
  static const double valueXs = 4;
  static const double valueSm = 8;
  static const double valueMd = 12;
  static const double valueLg = 16;
  static const double valueXl = 24;
  static const double valueFull = 999;

  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

  /// Get circular Radius for the given BorderRadius
  Radius circularRadius(BorderRadius borderRadius) {
    return borderRadius.topLeft;
  }

  /// Create BorderRadius with only top corners rounded
  BorderRadius topOnly(BorderRadius base) {
    final radius = base.topLeft;
    return BorderRadius.only(topLeft: radius, topRight: radius);
  }

  /// Create BorderRadius with only bottom corners rounded
  BorderRadius bottomOnly(BorderRadius base) {
    final radius = base.topLeft;
    return BorderRadius.only(bottomLeft: radius, bottomRight: radius);
  }

  /// Create BorderRadius with only left corners rounded
  BorderRadius leftOnly(BorderRadius base) {
    final radius = base.topLeft;
    return BorderRadius.only(topLeft: radius, bottomLeft: radius);
  }

  /// Create BorderRadius with only right corners rounded
  BorderRadius rightOnly(BorderRadius base) {
    final radius = base.topLeft;
    return BorderRadius.only(topRight: radius, bottomRight: radius);
  }

  /// Create BorderRadius with only top-left corner rounded
  BorderRadius topLeftOnly(BorderRadius base) {
    return BorderRadius.only(topLeft: base.topLeft);
  }

  /// Create BorderRadius with only top-right corner rounded
  BorderRadius topRightOnly(BorderRadius base) {
    return BorderRadius.only(topRight: base.topLeft);
  }

  /// Create BorderRadius with only bottom-left corner rounded
  BorderRadius bottomLeftOnly(BorderRadius base) {
    return BorderRadius.only(bottomLeft: base.topLeft);
  }

  /// Create BorderRadius with only bottom-right corner rounded
  BorderRadius bottomRightOnly(BorderRadius base) {
    return BorderRadius.only(bottomRight: base.topLeft);
  }

  // ===========================================================================
  // SHAPE BORDERS
  // ===========================================================================

  /// Get RoundedRectangleBorder with the specified radius
  RoundedRectangleBorder shapeBorder(BorderRadius borderRadius) {
    return RoundedRectangleBorder(borderRadius: borderRadius);
  }

  /// Get CircleBorder (for fully circular shapes)
  CircleBorder get circleBorder => const CircleBorder();

  /// Get StadiumBorder (for pill shapes)
  StadiumBorder get stadiumBorder => const StadiumBorder();

  // ===========================================================================
  // COPY WITH
  // ===========================================================================

  @override
  AppRadius copyWith({
    BorderRadius? none,
    BorderRadius? xs,
    BorderRadius? sm,
    BorderRadius? md,
    BorderRadius? lg,
    BorderRadius? xl,
    BorderRadius? full,
  }) {
    return AppRadius(
      none: none ?? this.none,
      xs: xs ?? this.xs,
      sm: sm ?? this.sm,
      md: md ?? this.md,
      lg: lg ?? this.lg,
      xl: xl ?? this.xl,
      full: full ?? this.full,
    );
  }

  // ===========================================================================
  // LERP (Linear Interpolation for Smooth Transitions)
  // ===========================================================================

  @override
  AppRadius lerp(ThemeExtension<AppRadius>? other, double t) {
    if (other is! AppRadius) {
      return this;
    }
    return AppRadius(
      none: BorderRadius.lerp(none, other.none, t)!,
      xs: BorderRadius.lerp(xs, other.xs, t)!,
      sm: BorderRadius.lerp(sm, other.sm, t)!,
      md: BorderRadius.lerp(md, other.md, t)!,
      lg: BorderRadius.lerp(lg, other.lg, t)!,
      xl: BorderRadius.lerp(xl, other.xl, t)!,
      full: BorderRadius.lerp(full, other.full, t)!,
    );
  }

  // ===========================================================================
  // EQUALITY
  // ===========================================================================

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is AppRadius &&
        other.none == none &&
        other.xs == xs &&
        other.sm == sm &&
        other.md == md &&
        other.lg == lg &&
        other.xl == xl &&
        other.full == full;
  }

  @override
  int get hashCode {
    return Object.hashAll([none, xs, sm, md, lg, xl, full]);
  }
}

// =============================================================================
// EXTENSION FOR EASY ACCESS
// =============================================================================

/// Extension to easily access AppRadius from BuildContext
extension AppRadiusExtension on BuildContext {
  /// Access AppRadius from the current theme
  AppRadius get radius => Theme.of(this).extension<AppRadius>()!;
}

