import 'package:flutter/material.dart';

import '../foundations/primitives/color_palettes.dart';
import 'brand_themes/doam_theme.dart';
import 'brand_themes/walaone_theme.dart';
import 'brand_themes/walaplus_theme.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP THEME FACTORY
/// =============================================================================
/// Central factory for creating ThemeData for all brands and theme modes.
/// This is the main entry point for theme configuration in the Singular DS.
///
/// USAGE:
/// ```dart
/// // Get WalaPlus light theme
/// final theme = AppThemeFactory.getTheme(
///   brand: SingularBrand.walaPlus,
///   mode: ThemeMode.light,
/// );
///
/// // Or use the convenience getters
/// final walaPlusLight = AppThemeFactory.walaPlus.lightTheme;
/// final walaPlusDark = AppThemeFactory.walaPlus.darkTheme;
/// ```
/// =============================================================================

/// Factory class for generating ThemeData for all Singular brands
class AppThemeFactory {
  AppThemeFactory._();

  // ===========================================================================
  // THEME GETTERS BY BRAND
  // ===========================================================================

  /// Get ThemeData for a specific brand and mode
  static ThemeData getTheme({
    required SingularBrand brand,
    required ThemeMode mode,
    Locale? locale,
  }) {
    switch (brand) {
      case SingularBrand.walaPlus:
        return mode == ThemeMode.dark
            ? WalaPlusTheme.darkTheme(locale: locale)
            : WalaPlusTheme.lightTheme(locale: locale);
      case SingularBrand.walaOne:
        return mode == ThemeMode.dark
            ? WalaOneTheme.darkTheme(locale: locale)
            : WalaOneTheme.lightTheme(locale: locale);
      case SingularBrand.doam:
        return mode == ThemeMode.dark
            ? DoamTheme.darkTheme(locale: locale)
            : DoamTheme.lightTheme(locale: locale);
    }
  }

  /// Get both light and dark themes for a brand
  static BrandThemes getThemes({
    required SingularBrand brand,
    Locale? locale,
  }) {
    return BrandThemes(
      brand: brand,
      lightTheme: getTheme(brand: brand, mode: ThemeMode.light, locale: locale),
      darkTheme: getTheme(brand: brand, mode: ThemeMode.dark, locale: locale),
    );
  }

  // ===========================================================================
  // BRAND-SPECIFIC CONVENIENCE GETTERS
  // ===========================================================================

  /// WalaPlus brand themes
  static BrandThemeBuilder get walaPlus => BrandThemeBuilder._(
        brand: SingularBrand.walaPlus,
        lightThemeBuilder: WalaPlusTheme.lightTheme,
        darkThemeBuilder: WalaPlusTheme.darkTheme,
      );

  /// WalaOne brand themes
  static BrandThemeBuilder get walaOne => BrandThemeBuilder._(
        brand: SingularBrand.walaOne,
        lightThemeBuilder: WalaOneTheme.lightTheme,
        darkThemeBuilder: WalaOneTheme.darkTheme,
      );

  /// Doam brand themes
  static BrandThemeBuilder get doam => BrandThemeBuilder._(
        brand: SingularBrand.doam,
        lightThemeBuilder: DoamTheme.lightTheme,
        darkThemeBuilder: DoamTheme.darkTheme,
      );

  // ===========================================================================
  // UTILITIES
  // ===========================================================================

  /// Get brand name string
  static String getBrandName(SingularBrand brand) {
    switch (brand) {
      case SingularBrand.walaPlus:
        return WalaPlusTheme.brandName;
      case SingularBrand.walaOne:
        return WalaOneTheme.brandName;
      case SingularBrand.doam:
        return DoamTheme.brandName;
    }
  }

  /// Get primary color for a brand
  static Color getPrimaryColor(SingularBrand brand) {
    return BrandColors.getPrimaryBase(brand);
  }

  /// Get secondary color for a brand
  static Color getSecondaryColor(SingularBrand brand) {
    return BrandColors.getSecondaryBase(brand);
  }

  /// Get all available brands
  static List<SingularBrand> get allBrands => SingularBrand.values;
}

/// Builder class for convenient theme access per brand
class BrandThemeBuilder {
  BrandThemeBuilder._({
    required this.brand,
    required ThemeData Function({Locale? locale}) lightThemeBuilder,
    required ThemeData Function({Locale? locale}) darkThemeBuilder,
  })  : _lightThemeBuilder = lightThemeBuilder,
        _darkThemeBuilder = darkThemeBuilder;

  /// The brand this builder is for
  final SingularBrand brand;

  final ThemeData Function({Locale? locale}) _lightThemeBuilder;
  final ThemeData Function({Locale? locale}) _darkThemeBuilder;

  /// Get light theme for this brand
  ThemeData get lightTheme => _lightThemeBuilder();

  /// Get dark theme for this brand
  ThemeData get darkTheme => _darkThemeBuilder();

  /// Get light theme with specific locale
  ThemeData lightThemeFor({Locale? locale}) => _lightThemeBuilder(locale: locale);

  /// Get dark theme with specific locale
  ThemeData darkThemeFor({Locale? locale}) => _darkThemeBuilder(locale: locale);

  /// Get theme based on brightness
  ThemeData forBrightness(Brightness brightness, {Locale? locale}) {
    return brightness == Brightness.dark
        ? _darkThemeBuilder(locale: locale)
        : _lightThemeBuilder(locale: locale);
  }

  /// Get theme based on ThemeMode
  ThemeData forMode(ThemeMode mode, {Locale? locale}) {
    return mode == ThemeMode.dark
        ? _darkThemeBuilder(locale: locale)
        : _lightThemeBuilder(locale: locale);
  }
}

/// Container for both light and dark themes of a brand
class BrandThemes {
  const BrandThemes({
    required this.brand,
    required this.lightTheme,
    required this.darkTheme,
  });

  /// The brand these themes belong to
  final SingularBrand brand;

  /// Light mode theme
  final ThemeData lightTheme;

  /// Dark mode theme
  final ThemeData darkTheme;

  /// Get theme by mode
  ThemeData forMode(ThemeMode mode) {
    return mode == ThemeMode.dark ? darkTheme : lightTheme;
  }

  /// Get theme by brightness
  ThemeData forBrightness(Brightness brightness) {
    return brightness == Brightness.dark ? darkTheme : lightTheme;
  }
}

// =============================================================================
// THEME MODE EXTENSIONS
// =============================================================================

extension ThemeModeExtension on ThemeMode {
  /// Get the brightness for this theme mode
  Brightness get brightness {
    switch (this) {
      case ThemeMode.light:
        return Brightness.light;
      case ThemeMode.dark:
        return Brightness.dark;
      case ThemeMode.system:
        // Default to light for system (actual handling should be done at app level)
        return Brightness.light;
    }
  }

  /// Check if this is dark mode
  bool get isDark => this == ThemeMode.dark;

  /// Check if this is light mode
  bool get isLight => this == ThemeMode.light;

  /// Toggle between light and dark
  ThemeMode get toggled {
    return this == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
  }
}

// =============================================================================
// BRAND EXTENSIONS
// =============================================================================

extension SingularBrandExtension on SingularBrand {
  /// Get the display name for this brand
  String get displayName {
    switch (this) {
      case SingularBrand.walaPlus:
        return 'WalaPlus';
      case SingularBrand.walaOne:
        return 'WalaOne';
      case SingularBrand.doam:
        return 'Doam';
    }
  }

  /// Get the primary color for this brand
  Color get primaryColor => BrandColors.getPrimaryBase(this);

  /// Get the secondary color for this brand
  Color get secondaryColor => BrandColors.getSecondaryBase(this);

  /// Get theme builder for this brand
  BrandThemeBuilder get themeBuilder {
    switch (this) {
      case SingularBrand.walaPlus:
        return AppThemeFactory.walaPlus;
      case SingularBrand.walaOne:
        return AppThemeFactory.walaOne;
      case SingularBrand.doam:
        return AppThemeFactory.doam;
    }
  }
}

