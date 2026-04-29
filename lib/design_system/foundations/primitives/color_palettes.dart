// ignore_for_file: constant_identifier_names

import 'dart:ui';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - COLOR PRIMITIVES
/// =============================================================================
/// This file contains raw color values organized in 12-step grading scales.
/// These are PRIMITIVES - they should NEVER be used directly in UI code.
/// Instead, use the semantic tokens from AppColors ThemeExtension.
/// =============================================================================

/// Color scale steps following the 12-step grading system:
/// 25, 50, 100, 200, 300, 400, 500 (Base), 600, 700, 800, 900, 950
///
/// Lower numbers = lighter shades
/// Higher numbers = darker shades
/// 500 = Base color (the brand color)

// =============================================================================
// WALAPLUS BRAND COLORS
// =============================================================================

/// WalaPlus Primary Palette - Base: #00CE8B (Vibrant Green)
abstract class WalaPlusPrimary {
  static const Color shade25 = Color(0xFFE6FBF4);
  static const Color shade50 = Color(0xFFCCF7E9);
  static const Color shade100 = Color(0xFF99EFCC);
  static const Color shade200 = Color(0xFF66E7B8);
  static const Color shade300 = Color(0xFF33DEA3);
  static const Color shade400 = Color(0xFF1AD997);
  static const Color shade500 = Color(0xFF00CE8B); // Base
  static const Color shade600 = Color(0xFF00B87D);
  static const Color shade700 = Color(0xFF009B69);
  static const Color shade800 = Color(0xFF007D55);
  static const Color shade900 = Color(0xFF005F41);
  static const Color shade950 = Color(0xFF003D2A);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// WalaPlus Secondary Palette - Base: #FF6608 (Vibrant Orange)
abstract class WalaPlusSecondary {
  static const Color shade25 = Color(0xFFFFF0E6);
  static const Color shade50 = Color(0xFFFFE1CC);
  static const Color shade100 = Color(0xFFFFC299);
  static const Color shade200 = Color(0xFFFFA366);
  static const Color shade300 = Color(0xFFFF8433);
  static const Color shade400 = Color(0xFFFF751D);
  static const Color shade500 = Color(0xFFFF6608); // Base
  static const Color shade600 = Color(0xFFE65C07);
  static const Color shade700 = Color(0xFFCC5206);
  static const Color shade800 = Color(0xFFB34705);
  static const Color shade900 = Color(0xFF993D04);
  static const Color shade950 = Color(0xFF662903);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

// =============================================================================
// WALAONE BRAND COLORS
// =============================================================================

/// WalaOne Primary Palette - Base: #755BD8 (Royal Purple)
abstract class WalaOnePrimary {
  static const Color shade25 = Color(0xFFF1EEFC);
  static const Color shade50 = Color(0xFFE3DDF9);
  static const Color shade100 = Color(0xFFC7BBF3);
  static const Color shade200 = Color(0xFFAB99ED);
  static const Color shade300 = Color(0xFF9077E7);
  static const Color shade400 = Color(0xFF8269E0);
  static const Color shade500 = Color(0xFF755BD8); // Base
  static const Color shade600 = Color(0xFF6952C2);
  static const Color shade700 = Color(0xFF5844A8);
  static const Color shade800 = Color(0xFF48378A);
  static const Color shade900 = Color(0xFF372A69);
  static const Color shade950 = Color(0xFF241C46);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// WalaOne Secondary Palette - Base: #FAC333 (Golden Yellow)
abstract class WalaOneSecondary {
  static const Color shade25 = Color(0xFFFEF9E9);
  static const Color shade50 = Color(0xFFFDF3D3);
  static const Color shade100 = Color(0xFFFCE7A7);
  static const Color shade200 = Color(0xFFFBDB7B);
  static const Color shade300 = Color(0xFFFACF4F);
  static const Color shade400 = Color(0xFFFAC941);
  static const Color shade500 = Color(0xFFFAC333); // Base
  static const Color shade600 = Color(0xFFE1AF2E);
  static const Color shade700 = Color(0xFFC89B29);
  static const Color shade800 = Color(0xFFAF8724);
  static const Color shade900 = Color(0xFF8A6A1C);
  static const Color shade950 = Color(0xFF5C4712);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

// =============================================================================
// DOAM BRAND COLORS
// =============================================================================

/// Doam Primary Palette - Base: #07B6A0 (Teal)
abstract class DoamPrimary {
  static const Color shade25 = Color(0xFFE6F8F6);
  static const Color shade50 = Color(0xFFCCF1ED);
  static const Color shade100 = Color(0xFF99E3DB);
  static const Color shade200 = Color(0xFF66D5C9);
  static const Color shade300 = Color(0xFF33C7B7);
  static const Color shade400 = Color(0xFF1AC0AD);
  static const Color shade500 = Color(0xFF07B6A0); // Base
  static const Color shade600 = Color(0xFF06A390);
  static const Color shade700 = Color(0xFF058A7A);
  static const Color shade800 = Color(0xFF047163);
  static const Color shade900 = Color(0xFF03574D);
  static const Color shade950 = Color(0xFF023A33);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// Doam Secondary Palette - Base: #FF6608 (Vibrant Orange)
/// Note: Same as WalaPlus Secondary for brand consistency
abstract class DoamSecondary {
  static const Color shade25 = Color(0xFFFFF0E6);
  static const Color shade50 = Color(0xFFFFE1CC);
  static const Color shade100 = Color(0xFFFFC299);
  static const Color shade200 = Color(0xFFFFA366);
  static const Color shade300 = Color(0xFFFF8433);
  static const Color shade400 = Color(0xFFFF751D);
  static const Color shade500 = Color(0xFFFF6608); // Base
  static const Color shade600 = Color(0xFFE65C07);
  static const Color shade700 = Color(0xFFCC5206);
  static const Color shade800 = Color(0xFFB34705);
  static const Color shade900 = Color(0xFF993D04);
  static const Color shade950 = Color(0xFF662903);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

// =============================================================================
// NEUTRAL PALETTE (Slate/Grey Scale)
// =============================================================================

/// Neutral Palette - Slate Grey Scale
/// Used for backgrounds, text, borders, and other neutral elements
abstract class NeutralPalette {
  static const Color shade25 = Color(0xFFFCFCFD);
  static const Color shade50 = Color(0xFFF8FAFC);
  static const Color shade100 = Color(0xFFF1F5F9);
  static const Color shade200 = Color(0xFFE2E8F0);
  static const Color shade300 = Color(0xFFCBD5E1);
  static const Color shade400 = Color(0xFF94A3B8);
  static const Color shade500 = Color(0xFF64748B); // Base
  static const Color shade600 = Color(0xFF475569);
  static const Color shade700 = Color(0xFF334155);
  static const Color shade800 = Color(0xFF1E293B);
  static const Color shade900 = Color(0xFF0F172A);
  static const Color shade950 = Color(0xFF020617);

  /// Pure white for maximum contrast
  static const Color white = Color(0xFFFFFFFF);

  /// Pure black for maximum contrast
  static const Color black = Color(0xFF000000);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

// =============================================================================
// SEMANTIC STATUS PALETTES
// =============================================================================

/// Success Palette - Green Scale
abstract class SuccessPalette {
  static const Color shade25 = Color(0xFFF0FDF4);
  static const Color shade50 = Color(0xFFDCFCE7);
  static const Color shade100 = Color(0xFFBBF7D0);
  static const Color shade200 = Color(0xFF86EFAC);
  static const Color shade300 = Color(0xFF4ADE80);
  static const Color shade400 = Color(0xFF22C55E);
  static const Color shade500 = Color(0xFF16A34A); // Base
  static const Color shade600 = Color(0xFF15803D);
  static const Color shade700 = Color(0xFF166534);
  static const Color shade800 = Color(0xFF14532D);
  static const Color shade900 = Color(0xFF052E16);
  static const Color shade950 = Color(0xFF021F0D);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// Warning Palette - Yellow/Amber Scale
abstract class WarningPalette {
  static const Color shade25 = Color(0xFFFFFBEB);
  static const Color shade50 = Color(0xFFFEF3C7);
  static const Color shade100 = Color(0xFFFDE68A);
  static const Color shade200 = Color(0xFFFCD34D);
  static const Color shade300 = Color(0xFFFBBF24);
  static const Color shade400 = Color(0xFFF59E0B);
  static const Color shade500 = Color(0xFFD97706); // Base
  static const Color shade600 = Color(0xFFB45309);
  static const Color shade700 = Color(0xFF92400E);
  static const Color shade800 = Color(0xFF78350F);
  static const Color shade900 = Color(0xFF451A03);
  static const Color shade950 = Color(0xFF2D1102);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// Error Palette - Red Scale
abstract class ErrorPalette {
  static const Color shade25 = Color(0xFFFEF2F2);
  static const Color shade50 = Color(0xFFFEE2E2);
  static const Color shade100 = Color(0xFFFECACA);
  static const Color shade200 = Color(0xFFFCA5A5);
  static const Color shade300 = Color(0xFFF87171);
  static const Color shade400 = Color(0xFFEF4444);
  static const Color shade500 = Color(0xFFDC2626); // Base
  static const Color shade600 = Color(0xFFB91C1C);
  static const Color shade700 = Color(0xFF991B1B);
  static const Color shade800 = Color(0xFF7F1D1D);
  static const Color shade900 = Color(0xFF450A0A);
  static const Color shade950 = Color(0xFF2D0606);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

/// Info Palette - Blue Scale
abstract class InfoPalette {
  static const Color shade25 = Color(0xFFEFF6FF);
  static const Color shade50 = Color(0xFFDBEAFE);
  static const Color shade100 = Color(0xFFBFDBFE);
  static const Color shade200 = Color(0xFF93C5FD);
  static const Color shade300 = Color(0xFF60A5FA);
  static const Color shade400 = Color(0xFF3B82F6);
  static const Color shade500 = Color(0xFF2563EB); // Base
  static const Color shade600 = Color(0xFF1D4ED8);
  static const Color shade700 = Color(0xFF1E40AF);
  static const Color shade800 = Color(0xFF1E3A8A);
  static const Color shade900 = Color(0xFF172554);
  static const Color shade950 = Color(0xFF0F1729);

  static const Map<int, Color> swatch = {
    25: shade25,
    50: shade50,
    100: shade100,
    200: shade200,
    300: shade300,
    400: shade400,
    500: shade500,
    600: shade600,
    700: shade700,
    800: shade800,
    900: shade900,
    950: shade950,
  };
}

// =============================================================================
// UTILITY CLASS FOR BRAND COLOR ACCESS
// =============================================================================

/// Enum representing the available brands in the Singular Design System
enum SingularBrand {
  walaPlus,
  walaOne,
  doam,
}

/// Utility class for accessing brand colors by enum
abstract class BrandColors {
  /// Get primary color swatch for a brand
  static Map<int, Color> getPrimarySwatch(SingularBrand brand) {
    switch (brand) {
      case SingularBrand.walaPlus:
        return WalaPlusPrimary.swatch;
      case SingularBrand.walaOne:
        return WalaOnePrimary.swatch;
      case SingularBrand.doam:
        return DoamPrimary.swatch;
    }
  }

  /// Get secondary color swatch for a brand
  static Map<int, Color> getSecondarySwatch(SingularBrand brand) {
    switch (brand) {
      case SingularBrand.walaPlus:
        return WalaPlusSecondary.swatch;
      case SingularBrand.walaOne:
        return WalaOneSecondary.swatch;
      case SingularBrand.doam:
        return DoamSecondary.swatch;
    }
  }

  /// Get primary base color (500) for a brand
  static Color getPrimaryBase(SingularBrand brand) {
    return getPrimarySwatch(brand)[500]!;
  }

  /// Get secondary base color (500) for a brand
  static Color getSecondaryBase(SingularBrand brand) {
    return getSecondarySwatch(brand)[500]!;
  }
}

