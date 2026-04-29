import 'package:flutter/material.dart';

import '../typography/font_family_helper.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP TYPOGRAPHY THEME EXTENSION
/// =============================================================================
/// Typography tokens based on Material 3 type scale with custom sizing.
/// Supports automatic font family switching between English (Poppins) and
/// Arabic (FF Shamel Unique) based on locale/directionality.
///
/// USAGE:
/// ```dart
/// final typography = Theme.of(context).extension<AppTypography>()!;
/// Text('Headline', style: typography.headlineLarge);
/// ```
/// =============================================================================

@immutable
class AppTypography extends ThemeExtension<AppTypography> {
  const AppTypography({
    // Display
    required this.displayLarge,
    required this.displayMedium,
    required this.displaySmall,
    // Headline
    required this.headlineLarge,
    required this.headlineMedium,
    required this.headlineSmall,
    // Title
    required this.titleLarge,
    required this.titleMedium,
    required this.titleSmall,
    // Label
    required this.labelLarge,
    required this.labelMedium,
    required this.labelSmall,
    // Body
    required this.bodyLarge,
    required this.bodyMedium,
    required this.bodySmall,
    // Font Family
    required this.fontFamily,
    required this.fontFamilyFallback,
  });

  // ===========================================================================
  // DISPLAY STYLES (57px, 45px, 36px)
  // ===========================================================================

  /// Display Large - 57px, bold, tight letter spacing
  /// Use for hero sections, splash screens
  final TextStyle displayLarge;

  /// Display Medium - 45px, bold
  /// Use for large promotional headings
  final TextStyle displayMedium;

  /// Display Small - 36px, bold
  /// Use for section headers in marketing content
  final TextStyle displaySmall;

  // ===========================================================================
  // HEADLINE STYLES (32px, 28px, 24px)
  // ===========================================================================

  /// Headline Large - 32px, semibold
  /// Use for page titles, main headings
  final TextStyle headlineLarge;

  /// Headline Medium - 28px, semibold
  /// Use for section headings
  final TextStyle headlineMedium;

  /// Headline Small - 24px, semibold
  /// Use for card titles, subsection headings
  final TextStyle headlineSmall;

  // ===========================================================================
  // TITLE STYLES (22px, 16px, 14px)
  // ===========================================================================

  /// Title Large - 22px, medium weight
  /// Use for app bar titles, dialog headers
  final TextStyle titleLarge;

  /// Title Medium - 16px, medium weight
  /// Use for list item titles, navigation labels
  final TextStyle titleMedium;

  /// Title Small - 14px, medium weight
  /// Use for small titles, tab labels
  final TextStyle titleSmall;

  // ===========================================================================
  // LABEL STYLES (14px, 12px, 11px)
  // ===========================================================================

  /// Label Large - 14px, medium weight
  /// Use for button text, prominent labels
  final TextStyle labelLarge;

  /// Label Medium - 12px, medium weight
  /// Use for form labels, tags
  final TextStyle labelMedium;

  /// Label Small - 11px, medium weight
  /// Use for captions, badges
  final TextStyle labelSmall;

  // ===========================================================================
  // BODY STYLES (16px, 14px, 12px)
  // ===========================================================================

  /// Body Large - 16px, regular weight
  /// Use for long-form content, articles
  final TextStyle bodyLarge;

  /// Body Medium - 14px, regular weight
  /// Use for general UI text, descriptions
  final TextStyle bodyMedium;

  /// Body Small - 12px, regular weight
  /// Use for secondary text, footnotes
  final TextStyle bodySmall;

  // ===========================================================================
  // FONT FAMILY
  // ===========================================================================

  /// Current font family (Poppins or FF Shamel Unique)
  final String fontFamily;

  /// Font family fallback list
  final List<String> fontFamilyFallback;

  // ===========================================================================
  // FACTORY CONSTRUCTORS
  // ===========================================================================

  /// Creates AppTypography for English (LTR) content
  factory AppTypography.english() {
    const fontFamily = SingularFonts.poppins;
    final fontFamilyFallback = FontFamilyHelper.getFontFamilyFallback(fontFamily);

    return AppTypography(
      fontFamily: fontFamily,
      fontFamilyFallback: fontFamilyFallback,
      // Display
      displayLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 57,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: -0.25,
        height: 1.12,
      ),
      displayMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 45,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: 0,
        height: 1.16,
      ),
      displaySmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 36,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: 0,
        height: 1.22,
      ),
      // Headline
      headlineLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 32,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.25,
      ),
      headlineMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 28,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.29,
      ),
      headlineSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 24,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.33,
      ),
      // Title
      titleLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 22,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.27,
      ),
      titleMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 16,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0.15,
        height: 1.50,
      ),
      titleSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0.1,
        height: 1.43,
      ),
      // Label
      labelLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0.1,
        height: 1.43,
      ),
      labelMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 12,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0.5,
        height: 1.33,
      ),
      labelSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 11,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0.5,
        height: 1.45,
      ),
      // Body
      bodyLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 16,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0.5,
        height: 1.50,
      ),
      bodyMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0.25,
        height: 1.43,
      ),
      bodySmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 12,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0.4,
        height: 1.33,
      ),
    );
  }

  /// Creates AppTypography for Arabic (RTL) content
  factory AppTypography.arabic() {
    const fontFamily = SingularFonts.ffShamelUnique;
    final fontFamilyFallback = FontFamilyHelper.getFontFamilyFallback(fontFamily);

    // Arabic typography often needs slightly adjusted line heights
    // and no letter spacing (as Arabic is connected script)
    return AppTypography(
      fontFamily: fontFamily,
      fontFamilyFallback: fontFamilyFallback,
      // Display
      displayLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 57,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: 0, // No letter spacing for Arabic
        height: 1.20,
      ),
      displayMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 45,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: 0,
        height: 1.24,
      ),
      displaySmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 36,
        fontWeight: SingularFontWeights.bold,
        letterSpacing: 0,
        height: 1.28,
      ),
      // Headline
      headlineLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 32,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.30,
      ),
      headlineMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 28,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.34,
      ),
      headlineSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 24,
        fontWeight: SingularFontWeights.semiBold,
        letterSpacing: 0,
        height: 1.38,
      ),
      // Title
      titleLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 22,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.32,
      ),
      titleMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 16,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.56,
      ),
      titleSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.48,
      ),
      // Label
      labelLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.48,
      ),
      labelMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 12,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.40,
      ),
      labelSmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 11,
        fontWeight: SingularFontWeights.medium,
        letterSpacing: 0,
        height: 1.50,
      ),
      // Body
      bodyLarge: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 16,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0,
        height: 1.56,
      ),
      bodyMedium: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 14,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0,
        height: 1.48,
      ),
      bodySmall: TextStyle(
        fontFamily: fontFamily,
        fontFamilyFallback: fontFamilyFallback,
        fontSize: 12,
        fontWeight: SingularFontWeights.regular,
        letterSpacing: 0,
        height: 1.40,
      ),
    );
  }

  /// Creates AppTypography based on locale
  factory AppTypography.forLocale(Locale locale) {
    if (FontFamilyHelper.isArabic(locale)) {
      return AppTypography.arabic();
    }
    return AppTypography.english();
  }

  /// Creates AppTypography based on text direction
  factory AppTypography.forDirection(TextDirection direction) {
    if (direction == TextDirection.rtl) {
      return AppTypography.arabic();
    }
    return AppTypography.english();
  }

  /// Creates AppTypography from BuildContext
  factory AppTypography.fromContext(BuildContext context) {
    final locale = Localizations.maybeLocaleOf(context);
    if (locale != null && FontFamilyHelper.isArabic(locale)) {
      return AppTypography.arabic();
    }

    final directionality = Directionality.maybeOf(context);
    if (directionality == TextDirection.rtl) {
      return AppTypography.arabic();
    }

    return AppTypography.english();
  }

  // ===========================================================================
  // COPY WITH
  // ===========================================================================

  @override
  AppTypography copyWith({
    TextStyle? displayLarge,
    TextStyle? displayMedium,
    TextStyle? displaySmall,
    TextStyle? headlineLarge,
    TextStyle? headlineMedium,
    TextStyle? headlineSmall,
    TextStyle? titleLarge,
    TextStyle? titleMedium,
    TextStyle? titleSmall,
    TextStyle? labelLarge,
    TextStyle? labelMedium,
    TextStyle? labelSmall,
    TextStyle? bodyLarge,
    TextStyle? bodyMedium,
    TextStyle? bodySmall,
    String? fontFamily,
    List<String>? fontFamilyFallback,
  }) {
    return AppTypography(
      displayLarge: displayLarge ?? this.displayLarge,
      displayMedium: displayMedium ?? this.displayMedium,
      displaySmall: displaySmall ?? this.displaySmall,
      headlineLarge: headlineLarge ?? this.headlineLarge,
      headlineMedium: headlineMedium ?? this.headlineMedium,
      headlineSmall: headlineSmall ?? this.headlineSmall,
      titleLarge: titleLarge ?? this.titleLarge,
      titleMedium: titleMedium ?? this.titleMedium,
      titleSmall: titleSmall ?? this.titleSmall,
      labelLarge: labelLarge ?? this.labelLarge,
      labelMedium: labelMedium ?? this.labelMedium,
      labelSmall: labelSmall ?? this.labelSmall,
      bodyLarge: bodyLarge ?? this.bodyLarge,
      bodyMedium: bodyMedium ?? this.bodyMedium,
      bodySmall: bodySmall ?? this.bodySmall,
      fontFamily: fontFamily ?? this.fontFamily,
      fontFamilyFallback: fontFamilyFallback ?? this.fontFamilyFallback,
    );
  }

  // ===========================================================================
  // LERP (Linear Interpolation for Smooth Transitions)
  // ===========================================================================

  @override
  AppTypography lerp(ThemeExtension<AppTypography>? other, double t) {
    if (other is! AppTypography) {
      return this;
    }
    return AppTypography(
      displayLarge: TextStyle.lerp(displayLarge, other.displayLarge, t)!,
      displayMedium: TextStyle.lerp(displayMedium, other.displayMedium, t)!,
      displaySmall: TextStyle.lerp(displaySmall, other.displaySmall, t)!,
      headlineLarge: TextStyle.lerp(headlineLarge, other.headlineLarge, t)!,
      headlineMedium: TextStyle.lerp(headlineMedium, other.headlineMedium, t)!,
      headlineSmall: TextStyle.lerp(headlineSmall, other.headlineSmall, t)!,
      titleLarge: TextStyle.lerp(titleLarge, other.titleLarge, t)!,
      titleMedium: TextStyle.lerp(titleMedium, other.titleMedium, t)!,
      titleSmall: TextStyle.lerp(titleSmall, other.titleSmall, t)!,
      labelLarge: TextStyle.lerp(labelLarge, other.labelLarge, t)!,
      labelMedium: TextStyle.lerp(labelMedium, other.labelMedium, t)!,
      labelSmall: TextStyle.lerp(labelSmall, other.labelSmall, t)!,
      bodyLarge: TextStyle.lerp(bodyLarge, other.bodyLarge, t)!,
      bodyMedium: TextStyle.lerp(bodyMedium, other.bodyMedium, t)!,
      bodySmall: TextStyle.lerp(bodySmall, other.bodySmall, t)!,
      // Font family doesn't lerp, take the target value after midpoint
      fontFamily: t < 0.5 ? fontFamily : other.fontFamily,
      fontFamilyFallback: t < 0.5 ? fontFamilyFallback : other.fontFamilyFallback,
    );
  }

  // ===========================================================================
  // EQUALITY
  // ===========================================================================

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    return other is AppTypography &&
        other.displayLarge == displayLarge &&
        other.displayMedium == displayMedium &&
        other.displaySmall == displaySmall &&
        other.headlineLarge == headlineLarge &&
        other.headlineMedium == headlineMedium &&
        other.headlineSmall == headlineSmall &&
        other.titleLarge == titleLarge &&
        other.titleMedium == titleMedium &&
        other.titleSmall == titleSmall &&
        other.labelLarge == labelLarge &&
        other.labelMedium == labelMedium &&
        other.labelSmall == labelSmall &&
        other.bodyLarge == bodyLarge &&
        other.bodyMedium == bodyMedium &&
        other.bodySmall == bodySmall &&
        other.fontFamily == fontFamily;
  }

  @override
  int get hashCode {
    return Object.hashAll([
      displayLarge,
      displayMedium,
      displaySmall,
      headlineLarge,
      headlineMedium,
      headlineSmall,
      titleLarge,
      titleMedium,
      titleSmall,
      labelLarge,
      labelMedium,
      labelSmall,
      bodyLarge,
      bodyMedium,
      bodySmall,
      fontFamily,
    ]);
  }

  // ===========================================================================
  // CONVERSION TO FLUTTER TEXT THEME
  // ===========================================================================

  /// Convert to Flutter's TextTheme for Material components
  TextTheme toTextTheme() {
    return TextTheme(
      displayLarge: displayLarge,
      displayMedium: displayMedium,
      displaySmall: displaySmall,
      headlineLarge: headlineLarge,
      headlineMedium: headlineMedium,
      headlineSmall: headlineSmall,
      titleLarge: titleLarge,
      titleMedium: titleMedium,
      titleSmall: titleSmall,
      labelLarge: labelLarge,
      labelMedium: labelMedium,
      labelSmall: labelSmall,
      bodyLarge: bodyLarge,
      bodyMedium: bodyMedium,
      bodySmall: bodySmall,
    );
  }
}

// =============================================================================
// EXTENSION FOR EASY ACCESS
// =============================================================================

/// Extension to easily access AppTypography from BuildContext
extension AppTypographyExtension on BuildContext {
  /// Access AppTypography from the current theme
  AppTypography get typography => Theme.of(this).extension<AppTypography>()!;
}

