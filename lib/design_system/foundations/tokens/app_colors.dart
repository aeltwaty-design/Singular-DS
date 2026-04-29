import 'dart:ui';

import 'package:flutter/material.dart';

import '../primitives/color_palettes.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP COLORS THEME EXTENSION
/// =============================================================================
/// Semantic color tokens that provide meaningful names for colors based on their
/// usage context. These tokens adapt automatically between Light and Dark modes.
///
/// USAGE:
/// ```dart
/// final colors = Theme.of(context).extension<AppColors>()!;
/// Container(color: colors.bgPrimary);
/// Text('Hello', style: TextStyle(color: colors.textPrimary));
/// ```
/// =============================================================================

@immutable
class AppColors extends ThemeExtension<AppColors> {
  const AppColors({
    // Backgrounds
    required this.bgPrimary,
    required this.bgSecondary,
    required this.bgSurface,
    required this.bgSurfaceSoft,
    required this.bgSurfaceInverse,
    // Text
    required this.textPrimary,
    required this.textSecondary,
    required this.textDisabled,
    required this.textInverse,
    required this.textOnColor,
    // Borders
    required this.borderWeak,
    required this.borderDefault,
    required this.borderStrong,
    required this.borderFocus,
    // Status
    required this.statusSuccess,
    required this.statusWarning,
    required this.statusError,
    required this.statusInfo,
    // Brand
    required this.brandPrimary,
    required this.brandSecondary,
    // Brand Palette Access (for components that need the full range)
    required this.brandPrimaryLight,
    required this.brandPrimaryDark,
    required this.brandSecondaryLight,
    required this.brandSecondaryDark,
    // Status Light variants (for backgrounds)
    required this.statusSuccessLight,
    required this.statusWarningLight,
    required this.statusErrorLight,
    required this.statusInfoLight,
    // Interactive states
    required this.interactiveHover,
    required this.interactivePressed,
    required this.interactiveDisabled,
    // Overlays
    required this.overlayLight,
    required this.overlayDark,
  });

  // ===========================================================================
  // BACKGROUND TOKENS
  // ===========================================================================

  /// Primary background color - main app background
  final Color bgPrimary;

  /// Secondary background color - slightly different from primary for layering
  final Color bgSecondary;

  /// Surface background - cards, modals, elevated surfaces
  final Color bgSurface;

  /// Soft surface background - subtle distinction from surface
  final Color bgSurfaceSoft;

  /// Inverse surface background - opposite of primary background
  final Color bgSurfaceInverse;

  // ===========================================================================
  // TEXT TOKENS
  // ===========================================================================

  /// Primary text color - headings and important text
  final Color textPrimary;

  /// Secondary text color - body text, descriptions
  final Color textSecondary;

  /// Disabled text color - inactive or placeholder text
  final Color textDisabled;

  /// Inverse text color - text on inverse backgrounds
  final Color textInverse;

  /// Text on brand/colored backgrounds
  final Color textOnColor;

  // ===========================================================================
  // BORDER TOKENS
  // ===========================================================================

  /// Weak border - subtle dividers
  final Color borderWeak;

  /// Default border - standard borders for inputs, cards
  final Color borderDefault;

  /// Strong border - emphasized borders
  final Color borderStrong;

  /// Focus border - focus rings and states
  final Color borderFocus;

  // ===========================================================================
  // STATUS TOKENS
  // ===========================================================================

  /// Success status color
  final Color statusSuccess;

  /// Warning status color
  final Color statusWarning;

  /// Error status color
  final Color statusError;

  /// Info status color
  final Color statusInfo;

  // ===========================================================================
  // BRAND TOKENS
  // ===========================================================================

  /// Brand primary color (base 500)
  final Color brandPrimary;

  /// Brand secondary color (base 500)
  final Color brandSecondary;

  /// Light variant of brand primary (for backgrounds, hover states)
  final Color brandPrimaryLight;

  /// Dark variant of brand primary (for pressed states, emphasis)
  final Color brandPrimaryDark;

  /// Light variant of brand secondary
  final Color brandSecondaryLight;

  /// Dark variant of brand secondary
  final Color brandSecondaryDark;

  // ===========================================================================
  // STATUS LIGHT VARIANTS (for backgrounds)
  // ===========================================================================

  /// Light success background
  final Color statusSuccessLight;

  /// Light warning background
  final Color statusWarningLight;

  /// Light error background
  final Color statusErrorLight;

  /// Light info background
  final Color statusInfoLight;

  // ===========================================================================
  // INTERACTIVE STATES
  // ===========================================================================

  /// Hover state overlay
  final Color interactiveHover;

  /// Pressed state overlay
  final Color interactivePressed;

  /// Disabled state color
  final Color interactiveDisabled;

  // ===========================================================================
  // OVERLAYS
  // ===========================================================================

  /// Light overlay (for dark elements)
  final Color overlayLight;

  /// Dark overlay (for modals, drawers)
  final Color overlayDark;

  // ===========================================================================
  // LIGHT MODE FACTORY
  // ===========================================================================

  /// Creates AppColors configured for Light mode
  /// [brandPrimarySwatch] and [brandSecondarySwatch] are the brand-specific color maps
  factory AppColors.light({
    required Map<int, Color> brandPrimarySwatch,
    required Map<int, Color> brandSecondarySwatch,
  }) {
    return AppColors(
      // Backgrounds
      bgPrimary: NeutralPalette.white,
      bgSecondary: NeutralPalette.shade50,
      bgSurface: NeutralPalette.white,
      bgSurfaceSoft: NeutralPalette.shade25,
      bgSurfaceInverse: NeutralPalette.shade900,
      // Text
      textPrimary: NeutralPalette.shade900,
      textSecondary: NeutralPalette.shade600,
      textDisabled: NeutralPalette.shade400,
      textInverse: NeutralPalette.white,
      textOnColor: NeutralPalette.white,
      // Borders
      borderWeak: NeutralPalette.shade100,
      borderDefault: NeutralPalette.shade200,
      borderStrong: NeutralPalette.shade300,
      borderFocus: brandPrimarySwatch[500]!,
      // Status
      statusSuccess: SuccessPalette.shade500,
      statusWarning: WarningPalette.shade500,
      statusError: ErrorPalette.shade500,
      statusInfo: InfoPalette.shade500,
      // Brand
      brandPrimary: brandPrimarySwatch[500]!,
      brandSecondary: brandSecondarySwatch[500]!,
      brandPrimaryLight: brandPrimarySwatch[100]!,
      brandPrimaryDark: brandPrimarySwatch[700]!,
      brandSecondaryLight: brandSecondarySwatch[100]!,
      brandSecondaryDark: brandSecondarySwatch[700]!,
      // Status Light
      statusSuccessLight: SuccessPalette.shade50,
      statusWarningLight: WarningPalette.shade50,
      statusErrorLight: ErrorPalette.shade50,
      statusInfoLight: InfoPalette.shade50,
      // Interactive
      interactiveHover: NeutralPalette.shade100.withValues(alpha: 0.8),
      interactivePressed: NeutralPalette.shade200.withValues(alpha: 0.8),
      interactiveDisabled: NeutralPalette.shade200,
      // Overlays
      overlayLight: NeutralPalette.white.withValues(alpha: 0.9),
      overlayDark: NeutralPalette.shade950.withValues(alpha: 0.5),
    );
  }

  // ===========================================================================
  // DARK MODE FACTORY
  // ===========================================================================

  /// Creates AppColors configured for Dark mode
  /// [brandPrimarySwatch] and [brandSecondarySwatch] are the brand-specific color maps
  factory AppColors.dark({
    required Map<int, Color> brandPrimarySwatch,
    required Map<int, Color> brandSecondarySwatch,
  }) {
    return AppColors(
      // Backgrounds
      bgPrimary: NeutralPalette.shade950,
      bgSecondary: NeutralPalette.shade900,
      bgSurface: NeutralPalette.shade800,
      bgSurfaceSoft: NeutralPalette.shade900,
      bgSurfaceInverse: NeutralPalette.shade50,
      // Text
      textPrimary: NeutralPalette.shade50,
      textSecondary: NeutralPalette.shade300,
      textDisabled: NeutralPalette.shade500,
      textInverse: NeutralPalette.shade900,
      textOnColor: NeutralPalette.white,
      // Borders
      borderWeak: NeutralPalette.shade800,
      borderDefault: NeutralPalette.shade700,
      borderStrong: NeutralPalette.shade600,
      borderFocus: brandPrimarySwatch[400]!,
      // Status (slightly lighter in dark mode for visibility)
      statusSuccess: SuccessPalette.shade400,
      statusWarning: WarningPalette.shade400,
      statusError: ErrorPalette.shade400,
      statusInfo: InfoPalette.shade400,
      // Brand (slightly lighter in dark mode for visibility)
      brandPrimary: brandPrimarySwatch[400]!,
      brandSecondary: brandSecondarySwatch[400]!,
      brandPrimaryLight: brandPrimarySwatch[200]!,
      brandPrimaryDark: brandPrimarySwatch[600]!,
      brandSecondaryLight: brandSecondarySwatch[200]!,
      brandSecondaryDark: brandSecondarySwatch[600]!,
      // Status Light (darker variants for dark mode backgrounds)
      statusSuccessLight: SuccessPalette.shade900.withValues(alpha: 0.4),
      statusWarningLight: WarningPalette.shade900.withValues(alpha: 0.4),
      statusErrorLight: ErrorPalette.shade900.withValues(alpha: 0.4),
      statusInfoLight: InfoPalette.shade900.withValues(alpha: 0.4),
      // Interactive
      interactiveHover: NeutralPalette.shade700.withValues(alpha: 0.8),
      interactivePressed: NeutralPalette.shade600.withValues(alpha: 0.8),
      interactiveDisabled: NeutralPalette.shade700,
      // Overlays
      overlayLight: NeutralPalette.shade800.withValues(alpha: 0.9),
      overlayDark: NeutralPalette.black.withValues(alpha: 0.7),
    );
  }

  // ===========================================================================
  // COPY WITH
  // ===========================================================================

  @override
  AppColors copyWith({
    Color? bgPrimary,
    Color? bgSecondary,
    Color? bgSurface,
    Color? bgSurfaceSoft,
    Color? bgSurfaceInverse,
    Color? textPrimary,
    Color? textSecondary,
    Color? textDisabled,
    Color? textInverse,
    Color? textOnColor,
    Color? borderWeak,
    Color? borderDefault,
    Color? borderStrong,
    Color? borderFocus,
    Color? statusSuccess,
    Color? statusWarning,
    Color? statusError,
    Color? statusInfo,
    Color? brandPrimary,
    Color? brandSecondary,
    Color? brandPrimaryLight,
    Color? brandPrimaryDark,
    Color? brandSecondaryLight,
    Color? brandSecondaryDark,
    Color? statusSuccessLight,
    Color? statusWarningLight,
    Color? statusErrorLight,
    Color? statusInfoLight,
    Color? interactiveHover,
    Color? interactivePressed,
    Color? interactiveDisabled,
    Color? overlayLight,
    Color? overlayDark,
  }) {
    return AppColors(
      bgPrimary: bgPrimary ?? this.bgPrimary,
      bgSecondary: bgSecondary ?? this.bgSecondary,
      bgSurface: bgSurface ?? this.bgSurface,
      bgSurfaceSoft: bgSurfaceSoft ?? this.bgSurfaceSoft,
      bgSurfaceInverse: bgSurfaceInverse ?? this.bgSurfaceInverse,
      textPrimary: textPrimary ?? this.textPrimary,
      textSecondary: textSecondary ?? this.textSecondary,
      textDisabled: textDisabled ?? this.textDisabled,
      textInverse: textInverse ?? this.textInverse,
      textOnColor: textOnColor ?? this.textOnColor,
      borderWeak: borderWeak ?? this.borderWeak,
      borderDefault: borderDefault ?? this.borderDefault,
      borderStrong: borderStrong ?? this.borderStrong,
      borderFocus: borderFocus ?? this.borderFocus,
      statusSuccess: statusSuccess ?? this.statusSuccess,
      statusWarning: statusWarning ?? this.statusWarning,
      statusError: statusError ?? this.statusError,
      statusInfo: statusInfo ?? this.statusInfo,
      brandPrimary: brandPrimary ?? this.brandPrimary,
      brandSecondary: brandSecondary ?? this.brandSecondary,
      brandPrimaryLight: brandPrimaryLight ?? this.brandPrimaryLight,
      brandPrimaryDark: brandPrimaryDark ?? this.brandPrimaryDark,
      brandSecondaryLight: brandSecondaryLight ?? this.brandSecondaryLight,
      brandSecondaryDark: brandSecondaryDark ?? this.brandSecondaryDark,
      statusSuccessLight: statusSuccessLight ?? this.statusSuccessLight,
      statusWarningLight: statusWarningLight ?? this.statusWarningLight,
      statusErrorLight: statusErrorLight ?? this.statusErrorLight,
      statusInfoLight: statusInfoLight ?? this.statusInfoLight,
      interactiveHover: interactiveHover ?? this.interactiveHover,
      interactivePressed: interactivePressed ?? this.interactivePressed,
      interactiveDisabled: interactiveDisabled ?? this.interactiveDisabled,
      overlayLight: overlayLight ?? this.overlayLight,
      overlayDark: overlayDark ?? this.overlayDark,
    );
  }

  // ===========================================================================
  // LERP (Linear Interpolation for Smooth Transitions)
  // ===========================================================================

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }
    return AppColors(
      bgPrimary: Color.lerp(bgPrimary, other.bgPrimary, t)!,
      bgSecondary: Color.lerp(bgSecondary, other.bgSecondary, t)!,
      bgSurface: Color.lerp(bgSurface, other.bgSurface, t)!,
      bgSurfaceSoft: Color.lerp(bgSurfaceSoft, other.bgSurfaceSoft, t)!,
      bgSurfaceInverse: Color.lerp(bgSurfaceInverse, other.bgSurfaceInverse, t)!,
      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      textDisabled: Color.lerp(textDisabled, other.textDisabled, t)!,
      textInverse: Color.lerp(textInverse, other.textInverse, t)!,
      textOnColor: Color.lerp(textOnColor, other.textOnColor, t)!,
      borderWeak: Color.lerp(borderWeak, other.borderWeak, t)!,
      borderDefault: Color.lerp(borderDefault, other.borderDefault, t)!,
      borderStrong: Color.lerp(borderStrong, other.borderStrong, t)!,
      borderFocus: Color.lerp(borderFocus, other.borderFocus, t)!,
      statusSuccess: Color.lerp(statusSuccess, other.statusSuccess, t)!,
      statusWarning: Color.lerp(statusWarning, other.statusWarning, t)!,
      statusError: Color.lerp(statusError, other.statusError, t)!,
      statusInfo: Color.lerp(statusInfo, other.statusInfo, t)!,
      brandPrimary: Color.lerp(brandPrimary, other.brandPrimary, t)!,
      brandSecondary: Color.lerp(brandSecondary, other.brandSecondary, t)!,
      brandPrimaryLight: Color.lerp(brandPrimaryLight, other.brandPrimaryLight, t)!,
      brandPrimaryDark: Color.lerp(brandPrimaryDark, other.brandPrimaryDark, t)!,
      brandSecondaryLight: Color.lerp(brandSecondaryLight, other.brandSecondaryLight, t)!,
      brandSecondaryDark: Color.lerp(brandSecondaryDark, other.brandSecondaryDark, t)!,
      statusSuccessLight: Color.lerp(statusSuccessLight, other.statusSuccessLight, t)!,
      statusWarningLight: Color.lerp(statusWarningLight, other.statusWarningLight, t)!,
      statusErrorLight: Color.lerp(statusErrorLight, other.statusErrorLight, t)!,
      statusInfoLight: Color.lerp(statusInfoLight, other.statusInfoLight, t)!,
      interactiveHover: Color.lerp(interactiveHover, other.interactiveHover, t)!,
      interactivePressed: Color.lerp(interactivePressed, other.interactivePressed, t)!,
      interactiveDisabled: Color.lerp(interactiveDisabled, other.interactiveDisabled, t)!,
      overlayLight: Color.lerp(overlayLight, other.overlayLight, t)!,
      overlayDark: Color.lerp(overlayDark, other.overlayDark, t)!,
    );
  }

  // ===========================================================================
  // EQUALITY
  // ===========================================================================

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is AppColors &&
        other.bgPrimary == bgPrimary &&
        other.bgSecondary == bgSecondary &&
        other.bgSurface == bgSurface &&
        other.bgSurfaceSoft == bgSurfaceSoft &&
        other.bgSurfaceInverse == bgSurfaceInverse &&
        other.textPrimary == textPrimary &&
        other.textSecondary == textSecondary &&
        other.textDisabled == textDisabled &&
        other.textInverse == textInverse &&
        other.textOnColor == textOnColor &&
        other.borderWeak == borderWeak &&
        other.borderDefault == borderDefault &&
        other.borderStrong == borderStrong &&
        other.borderFocus == borderFocus &&
        other.statusSuccess == statusSuccess &&
        other.statusWarning == statusWarning &&
        other.statusError == statusError &&
        other.statusInfo == statusInfo &&
        other.brandPrimary == brandPrimary &&
        other.brandSecondary == brandSecondary &&
        other.brandPrimaryLight == brandPrimaryLight &&
        other.brandPrimaryDark == brandPrimaryDark &&
        other.brandSecondaryLight == brandSecondaryLight &&
        other.brandSecondaryDark == brandSecondaryDark &&
        other.statusSuccessLight == statusSuccessLight &&
        other.statusWarningLight == statusWarningLight &&
        other.statusErrorLight == statusErrorLight &&
        other.statusInfoLight == statusInfoLight &&
        other.interactiveHover == interactiveHover &&
        other.interactivePressed == interactivePressed &&
        other.interactiveDisabled == interactiveDisabled &&
        other.overlayLight == overlayLight &&
        other.overlayDark == overlayDark;
  }

  @override
  int get hashCode {
    return Object.hashAll([
      bgPrimary,
      bgSecondary,
      bgSurface,
      bgSurfaceSoft,
      bgSurfaceInverse,
      textPrimary,
      textSecondary,
      textDisabled,
      textInverse,
      textOnColor,
      borderWeak,
      borderDefault,
      borderStrong,
      borderFocus,
      statusSuccess,
      statusWarning,
      statusError,
      statusInfo,
      brandPrimary,
      brandSecondary,
      brandPrimaryLight,
      brandPrimaryDark,
      brandSecondaryLight,
      brandSecondaryDark,
      statusSuccessLight,
      statusWarningLight,
      statusErrorLight,
      statusInfoLight,
      interactiveHover,
      interactivePressed,
      interactiveDisabled,
      overlayLight,
      overlayDark,
    ]);
  }
}

// =============================================================================
// EXTENSION FOR EASY ACCESS
// =============================================================================

/// Extension to easily access AppColors from BuildContext
extension AppColorsExtension on BuildContext {
  /// Access AppColors from the current theme
  AppColors get colors => Theme.of(this).extension<AppColors>()!;
}

