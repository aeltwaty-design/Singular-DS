import 'package:flutter/material.dart';

import '../../foundations/primitives/color_palettes.dart';
import '../../foundations/tokens/app_colors.dart';
import '../../foundations/tokens/app_elevation.dart';
import '../../foundations/tokens/app_radius.dart';
import '../../foundations/tokens/app_spacing.dart';
import '../../foundations/tokens/app_typography.dart';
import '../../foundations/typography/font_family_helper.dart';

/// =============================================================================
/// DOAM BRAND THEME
/// =============================================================================
/// Brand configuration for Doam product.
/// Primary: #07B6A0 (Teal)
/// Secondary: #FF6608 (Vibrant Orange)
/// =============================================================================

/// Doam brand theme configuration
class DoamTheme {
  DoamTheme._();

  /// Brand identifier
  static const String brandName = 'Doam';

  /// Primary color swatch
  static Map<int, Color> get primarySwatch => DoamPrimary.swatch;

  /// Secondary color swatch
  static Map<int, Color> get secondarySwatch => DoamSecondary.swatch;

  /// Primary brand color
  static Color get primaryColor => DoamPrimary.shade500;

  /// Secondary brand color
  static Color get secondaryColor => DoamSecondary.shade500;

  // ===========================================================================
  // LIGHT THEME
  // ===========================================================================

  /// Get AppColors for light mode
  static AppColors get lightColors => AppColors.light(
        brandPrimarySwatch: primarySwatch,
        brandSecondarySwatch: secondarySwatch,
      );

  /// Get AppTypography for English
  static AppTypography get typographyEnglish => AppTypography.english();

  /// Get AppTypography for Arabic
  static AppTypography get typographyArabic => AppTypography.arabic();

  /// Get AppSpacing (standard)
  static AppSpacing get spacing => AppSpacing.standard();

  /// Get AppRadius (standard)
  static AppRadius get radius => AppRadius.standard();

  /// Get AppElevation for light mode
  static AppElevation get lightElevation => AppElevation.light();

  /// Build complete light ThemeData
  static ThemeData lightTheme({Locale? locale}) {
    final colors = lightColors;
    final typography = locale != null && FontFamilyHelper.isArabic(locale)
        ? typographyArabic
        : typographyEnglish;

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      // Primary color scheme
      colorScheme: ColorScheme.light(
        primary: colors.brandPrimary,
        onPrimary: colors.textOnColor,
        primaryContainer: colors.brandPrimaryLight,
        onPrimaryContainer: colors.brandPrimaryDark,
        secondary: colors.brandSecondary,
        onSecondary: colors.textOnColor,
        secondaryContainer: colors.brandSecondaryLight,
        onSecondaryContainer: colors.brandSecondaryDark,
        surface: colors.bgSurface,
        onSurface: colors.textPrimary,
        error: colors.statusError,
        onError: colors.textOnColor,
        outline: colors.borderDefault,
        outlineVariant: colors.borderWeak,
      ),
      // Scaffold
      scaffoldBackgroundColor: colors.bgPrimary,
      // AppBar
      appBarTheme: AppBarTheme(
        backgroundColor: colors.bgSurface,
        foregroundColor: colors.textPrimary,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: typography.titleLarge.copyWith(
          color: colors.textPrimary,
        ),
      ),
      // Cards
      cardTheme: CardThemeData(
        color: colors.bgSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: radius.md,
        ),
      ),
      // Buttons
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: colors.brandPrimary,
          foregroundColor: colors.textOnColor,
          textStyle: typography.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
          padding: EdgeInsets.symmetric(
            horizontal: spacing.lg,
            vertical: spacing.md,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: colors.brandPrimary,
          textStyle: typography.labelLarge,
          side: BorderSide(color: colors.brandPrimary),
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
          padding: EdgeInsets.symmetric(
            horizontal: spacing.lg,
            vertical: spacing.md,
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: colors.brandPrimary,
          textStyle: typography.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
        ),
      ),
      // Input Decoration
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colors.bgSurfaceSoft,
        border: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderDefault),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderDefault),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderFocus, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.statusError),
        ),
        contentPadding: EdgeInsets.symmetric(
          horizontal: spacing.lg,
          vertical: spacing.md,
        ),
        hintStyle: typography.bodyMedium.copyWith(
          color: colors.textDisabled,
        ),
        labelStyle: typography.bodyMedium.copyWith(
          color: colors.textSecondary,
        ),
      ),
      // Divider
      dividerTheme: DividerThemeData(
        color: colors.borderWeak,
        thickness: 1,
        space: spacing.lg,
      ),
      // Text Theme
      textTheme: typography.toTextTheme().apply(
            bodyColor: colors.textPrimary,
            displayColor: colors.textPrimary,
          ),
      // Icon Theme
      iconTheme: IconThemeData(
        color: colors.textSecondary,
        size: 24,
      ),
      // Extensions
      extensions: [
        colors,
        typography,
        spacing,
        radius,
        lightElevation,
      ],
    );
  }

  // ===========================================================================
  // DARK THEME
  // ===========================================================================

  /// Get AppColors for dark mode
  static AppColors get darkColors => AppColors.dark(
        brandPrimarySwatch: primarySwatch,
        brandSecondarySwatch: secondarySwatch,
      );

  /// Get AppElevation for dark mode
  static AppElevation get darkElevation => AppElevation.dark();

  /// Build complete dark ThemeData
  static ThemeData darkTheme({Locale? locale}) {
    final colors = darkColors;
    final typography = locale != null && FontFamilyHelper.isArabic(locale)
        ? typographyArabic
        : typographyEnglish;

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      // Primary color scheme
      colorScheme: ColorScheme.dark(
        primary: colors.brandPrimary,
        onPrimary: colors.textOnColor,
        primaryContainer: colors.brandPrimaryDark,
        onPrimaryContainer: colors.brandPrimaryLight,
        secondary: colors.brandSecondary,
        onSecondary: colors.textOnColor,
        secondaryContainer: colors.brandSecondaryDark,
        onSecondaryContainer: colors.brandSecondaryLight,
        surface: colors.bgSurface,
        onSurface: colors.textPrimary,
        error: colors.statusError,
        onError: colors.textOnColor,
        outline: colors.borderDefault,
        outlineVariant: colors.borderWeak,
      ),
      // Scaffold
      scaffoldBackgroundColor: colors.bgPrimary,
      // AppBar
      appBarTheme: AppBarTheme(
        backgroundColor: colors.bgSurface,
        foregroundColor: colors.textPrimary,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: typography.titleLarge.copyWith(
          color: colors.textPrimary,
        ),
      ),
      // Cards
      cardTheme: CardThemeData(
        color: colors.bgSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: radius.md,
        ),
      ),
      // Buttons
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: colors.brandPrimary,
          foregroundColor: colors.textOnColor,
          textStyle: typography.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
          padding: EdgeInsets.symmetric(
            horizontal: spacing.lg,
            vertical: spacing.md,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: colors.brandPrimary,
          textStyle: typography.labelLarge,
          side: BorderSide(color: colors.brandPrimary),
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
          padding: EdgeInsets.symmetric(
            horizontal: spacing.lg,
            vertical: spacing.md,
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: colors.brandPrimary,
          textStyle: typography.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: radius.sm,
          ),
        ),
      ),
      // Input Decoration
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colors.bgSurfaceSoft,
        border: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderDefault),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderDefault),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.borderFocus, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: radius.sm,
          borderSide: BorderSide(color: colors.statusError),
        ),
        contentPadding: EdgeInsets.symmetric(
          horizontal: spacing.lg,
          vertical: spacing.md,
        ),
        hintStyle: typography.bodyMedium.copyWith(
          color: colors.textDisabled,
        ),
        labelStyle: typography.bodyMedium.copyWith(
          color: colors.textSecondary,
        ),
      ),
      // Divider
      dividerTheme: DividerThemeData(
        color: colors.borderWeak,
        thickness: 1,
        space: spacing.lg,
      ),
      // Text Theme
      textTheme: typography.toTextTheme().apply(
            bodyColor: colors.textPrimary,
            displayColor: colors.textPrimary,
          ),
      // Icon Theme
      iconTheme: IconThemeData(
        color: colors.textSecondary,
        size: 24,
      ),
      // Extensions
      extensions: [
        colors,
        typography,
        spacing,
        radius,
        darkElevation,
      ],
    );
  }
}

