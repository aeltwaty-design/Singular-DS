import 'package:flutter/widgets.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - FONT FAMILY HELPER
/// =============================================================================
/// This helper automatically selects the appropriate font family based on the
/// current locale and text directionality.
///
/// - English (LTR): Poppins (Google Fonts)
/// - Arabic (RTL): FF Shamel Unique (Local Asset)
/// =============================================================================

/// Font family constants used across the design system
abstract class SingularFonts {
  /// English font family (Google Fonts)
  static const String poppins = 'Poppins';

  /// Arabic font family (Local Asset)
  static const String ffShamelUnique = 'FF Shamel Unique';

  /// Fallback font family
  static const String fallback = 'sans-serif';
}

/// Font weight variants
abstract class SingularFontWeights {
  static const FontWeight thin = FontWeight.w100;
  static const FontWeight extraLight = FontWeight.w200;
  static const FontWeight light = FontWeight.w300;
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semiBold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;
  static const FontWeight extraBold = FontWeight.w800;
  static const FontWeight black = FontWeight.w900;
}

/// Helper class for automatic font family selection based on locale/directionality
class FontFamilyHelper {
  FontFamilyHelper._();

  /// Returns the appropriate font family based on the given locale
  static String forLocale(Locale locale) {
    // Arabic language codes
    const arabicLanguageCodes = ['ar', 'ara'];

    if (arabicLanguageCodes.contains(locale.languageCode.toLowerCase())) {
      return SingularFonts.ffShamelUnique;
    }

    return SingularFonts.poppins;
  }

  /// Returns the appropriate font family based on text directionality
  static String forDirection(TextDirection direction) {
    if (direction == TextDirection.rtl) {
      return SingularFonts.ffShamelUnique;
    }

    return SingularFonts.poppins;
  }

  /// Returns the appropriate font family by detecting from BuildContext
  /// Checks both Locale and Directionality for accuracy
  static String fromContext(BuildContext context) {
    // First, try to get the locale
    final locale = Localizations.maybeLocaleOf(context);
    if (locale != null) {
      return forLocale(locale);
    }

    // Fallback to directionality
    final directionality = Directionality.maybeOf(context);
    if (directionality != null) {
      return forDirection(directionality);
    }

    // Default to English font
    return SingularFonts.poppins;
  }

  /// Returns whether the current context is RTL
  static bool isRtl(BuildContext context) {
    final directionality = Directionality.maybeOf(context);
    return directionality == TextDirection.rtl;
  }

  /// Returns whether the given locale is Arabic
  static bool isArabic(Locale locale) {
    const arabicLanguageCodes = ['ar', 'ara'];
    return arabicLanguageCodes.contains(locale.languageCode.toLowerCase());
  }

  /// Get font family list with fallback
  static List<String> getFontFamilyFallback(String primaryFont) {
    if (primaryFont == SingularFonts.ffShamelUnique) {
      return [SingularFonts.ffShamelUnique, 'Tahoma', 'Arial', SingularFonts.fallback];
    }
    return [SingularFonts.poppins, 'Helvetica', 'Arial', SingularFonts.fallback];
  }
}

/// Supported locales for the Singular Design System
abstract class SingularLocales {
  /// English locale (United States)
  static const Locale englishUS = Locale('en', 'US');

  /// English locale (United Kingdom)
  static const Locale englishUK = Locale('en', 'GB');

  /// Arabic locale (Saudi Arabia)
  static const Locale arabicSA = Locale('ar', 'SA');

  /// Arabic locale (UAE)
  static const Locale arabicAE = Locale('ar', 'AE');

  /// Arabic locale (generic)
  static const Locale arabic = Locale('ar');

  /// All supported locales
  static const List<Locale> supportedLocales = [
    englishUS,
    englishUK,
    arabicSA,
    arabicAE,
    arabic,
  ];

  /// RTL locales
  static const List<Locale> rtlLocales = [
    arabicSA,
    arabicAE,
    arabic,
  ];
}

