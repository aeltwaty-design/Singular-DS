import 'package:flutter/material.dart';

import '../primitives/color_palettes.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP ELEVATION THEME EXTENSION
/// =============================================================================
/// Elevation/Shadow tokens for consistent depth perception across the design system.
/// Provides 5 levels of elevation from none to highest.
///
/// USAGE:
/// ```dart
/// final elevation = Theme.of(context).extension<AppElevation>()!;
/// Container(
///   decoration: BoxDecoration(
///     boxShadow: elevation.level2,
///   ),
/// );
/// ```
/// =============================================================================

@immutable
class AppElevation extends ThemeExtension<AppElevation> {
  const AppElevation({
    required this.level0,
    required this.level1,
    required this.level2,
    required this.level3,
    required this.level4,
    required this.shadowColor,
  });

  // ===========================================================================
  // ELEVATION TOKENS (as List<BoxShadow>)
  // ===========================================================================

  /// Level 0 - No elevation (flat)
  final List<BoxShadow> level0;

  /// Level 1 - Subtle elevation (cards, hovering elements)
  final List<BoxShadow> level1;

  /// Level 2 - Medium elevation (dropdowns, popovers)
  final List<BoxShadow> level2;

  /// Level 3 - High elevation (modals, dialogs)
  final List<BoxShadow> level3;

  /// Level 4 - Highest elevation (toasts, notifications)
  final List<BoxShadow> level4;

  /// Base shadow color used for calculations
  final Color shadowColor;

  // ===========================================================================
  // FACTORY CONSTRUCTORS
  // ===========================================================================

  /// Creates elevation tokens for light mode
  factory AppElevation.light() {
    const shadowColor = Color(0xFF0F172A); // Neutral 900

    return AppElevation(
      shadowColor: shadowColor,
      level0: const [],
      level1: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.04),
          blurRadius: 2,
          offset: const Offset(0, 1),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.06),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
      ],
      level2: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.04),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.08),
          blurRadius: 8,
          offset: const Offset(0, 4),
        ),
      ],
      level3: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.04),
          blurRadius: 8,
          offset: const Offset(0, 4),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.10),
          blurRadius: 16,
          offset: const Offset(0, 8),
        ),
      ],
      level4: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.06),
          blurRadius: 12,
          offset: const Offset(0, 8),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.12),
          blurRadius: 24,
          offset: const Offset(0, 16),
        ),
      ],
    );
  }

  /// Creates elevation tokens for dark mode
  /// In dark mode, shadows are more subtle and darker
  factory AppElevation.dark() {
    const shadowColor = NeutralPalette.black;

    return AppElevation(
      shadowColor: shadowColor,
      level0: const [],
      level1: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.16),
          blurRadius: 2,
          offset: const Offset(0, 1),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.20),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
      ],
      level2: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.16),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.24),
          blurRadius: 8,
          offset: const Offset(0, 4),
        ),
      ],
      level3: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.20),
          blurRadius: 8,
          offset: const Offset(0, 4),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.28),
          blurRadius: 16,
          offset: const Offset(0, 8),
        ),
      ],
      level4: [
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.24),
          blurRadius: 12,
          offset: const Offset(0, 8),
        ),
        BoxShadow(
          color: shadowColor.withValues(alpha: 0.32),
          blurRadius: 24,
          offset: const Offset(0, 16),
        ),
      ],
    );
  }

  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

  /// Get BoxDecoration with the specified elevation level
  BoxDecoration decoration({
    required int level,
    Color? color,
    BorderRadius? borderRadius,
  }) {
    final shadows = switch (level) {
      0 => level0,
      1 => level1,
      2 => level2,
      3 => level3,
      4 => level4,
      _ => level0,
    };

    return BoxDecoration(
      color: color,
      borderRadius: borderRadius,
      boxShadow: shadows,
    );
  }

  /// Get Material elevation value equivalent (for Material widgets)
  double materialElevation(int level) {
    return switch (level) {
      0 => 0,
      1 => 1,
      2 => 4,
      3 => 8,
      4 => 16,
      _ => 0,
    };
  }

  /// Create custom shadow with brand color tint
  List<BoxShadow> brandShadow(Color brandColor, int level) {
    final baseOpacity = switch (level) {
      1 => 0.15,
      2 => 0.20,
      3 => 0.25,
      4 => 0.30,
      _ => 0.0,
    };

    if (level == 0) return [];

    return [
      BoxShadow(
        color: brandColor.withValues(alpha: baseOpacity * 0.5),
        blurRadius: 4.0 * level,
        offset: Offset(0, 2.0 * level),
      ),
      BoxShadow(
        color: brandColor.withValues(alpha: baseOpacity),
        blurRadius: 8.0 * level,
        offset: Offset(0, 4.0 * level),
      ),
    ];
  }

  /// Create inner shadow (for pressed/inset states)
  List<BoxShadow> innerShadow({int level = 1}) {
    final opacity = switch (level) {
      1 => 0.08,
      2 => 0.12,
      _ => 0.08,
    };

    return [
      BoxShadow(
        color: shadowColor.withValues(alpha: opacity),
        blurRadius: 4,
        offset: const Offset(0, 2),
        spreadRadius: -1,
      ),
    ];
  }

  // ===========================================================================
  // COPY WITH
  // ===========================================================================

  @override
  AppElevation copyWith({
    List<BoxShadow>? level0,
    List<BoxShadow>? level1,
    List<BoxShadow>? level2,
    List<BoxShadow>? level3,
    List<BoxShadow>? level4,
    Color? shadowColor,
  }) {
    return AppElevation(
      level0: level0 ?? this.level0,
      level1: level1 ?? this.level1,
      level2: level2 ?? this.level2,
      level3: level3 ?? this.level3,
      level4: level4 ?? this.level4,
      shadowColor: shadowColor ?? this.shadowColor,
    );
  }

  // ===========================================================================
  // LERP (Linear Interpolation for Smooth Transitions)
  // ===========================================================================

  @override
  AppElevation lerp(ThemeExtension<AppElevation>? other, double t) {
    if (other is! AppElevation) {
      return this;
    }
    return AppElevation(
      level0: _lerpBoxShadowList(level0, other.level0, t),
      level1: _lerpBoxShadowList(level1, other.level1, t),
      level2: _lerpBoxShadowList(level2, other.level2, t),
      level3: _lerpBoxShadowList(level3, other.level3, t),
      level4: _lerpBoxShadowList(level4, other.level4, t),
      shadowColor: Color.lerp(shadowColor, other.shadowColor, t)!,
    );
  }

  List<BoxShadow> _lerpBoxShadowList(
    List<BoxShadow> a,
    List<BoxShadow> b,
    double t,
  ) {
    if (a.isEmpty && b.isEmpty) return [];
    if (a.isEmpty) {
      return b.map((shadow) => BoxShadow.lerp(null, shadow, t)!).toList();
    }
    if (b.isEmpty) {
      return a.map((shadow) => BoxShadow.lerp(shadow, null, t)!).toList();
    }

    final result = <BoxShadow>[];
    final maxLength = a.length > b.length ? a.length : b.length;

    for (var i = 0; i < maxLength; i++) {
      final shadowA = i < a.length ? a[i] : null;
      final shadowB = i < b.length ? b[i] : null;
      final lerped = BoxShadow.lerp(shadowA, shadowB, t);
      if (lerped != null) {
        result.add(lerped);
      }
    }

    return result;
  }

  // ===========================================================================
  // EQUALITY
  // ===========================================================================

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is AppElevation &&
        _listEquals(other.level0, level0) &&
        _listEquals(other.level1, level1) &&
        _listEquals(other.level2, level2) &&
        _listEquals(other.level3, level3) &&
        _listEquals(other.level4, level4) &&
        other.shadowColor == shadowColor;
  }

  bool _listEquals<T>(List<T> a, List<T> b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  @override
  int get hashCode {
    return Object.hashAll([
      Object.hashAll(level0),
      Object.hashAll(level1),
      Object.hashAll(level2),
      Object.hashAll(level3),
      Object.hashAll(level4),
      shadowColor,
    ]);
  }
}

// =============================================================================
// EXTENSION FOR EASY ACCESS
// =============================================================================

/// Extension to easily access AppElevation from BuildContext
extension AppElevationExtension on BuildContext {
  /// Access AppElevation from the current theme
  AppElevation get elevation => Theme.of(this).extension<AppElevation>()!;
}

