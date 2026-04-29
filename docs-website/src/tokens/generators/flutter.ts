/**
 * Flutter/Dart Theme Generator
 */

import type { GeneratorOptions, GeneratedOutput, Brand, ColorScale } from '../types';
import { grayLight, grayDark, statusColors, baseColors } from '../primitives/colors';
import { brands, defaultBrand, brandIds } from '../brands';
import { semanticCategories } from '../semantic';
import { colorSteps, toPascalCase, resolveColorRef, formatTimestamp } from './utils';

/**
 * Convert hex color to Flutter Color format
 */
function hexToFlutterColor(hex: string): string {
  // Remove # and ensure uppercase
  const cleanHex = hex.replace('#', '').toUpperCase();
  
  // Handle 8-character hex (with alpha)
  if (cleanHex.length === 8) {
    // Move alpha to front (Flutter format is AARRGGBB)
    const alpha = cleanHex.slice(6, 8);
    const rgb = cleanHex.slice(0, 6);
    return `Color(0x${alpha}${rgb})`;
  }
  
  // 6-character hex (no alpha, assume FF)
  return `Color(0xFF${cleanHex})`;
}

/**
 * Generate Dart color scale class
 */
function generateColorScaleClass(name: string, scale: ColorScale): string {
  const className = `${toPascalCase(name)}Colors`;
  let dart = `/// ${name} color scale\n`;
  dart += `class ${className} {\n`;
  dart += `  ${className}._();\n\n`;
  
  for (const step of colorSteps) {
    dart += `  static const Color shade${step} = ${hexToFlutterColor(scale[step])};\n`;
  }
  
  dart += `\n  /// Get color by step\n`;
  dart += `  static Color byStep(int step) {\n`;
  dart += `    switch (step) {\n`;
  for (const step of colorSteps) {
    dart += `      case ${step}: return shade${step};\n`;
  }
  dart += `      default: return shade500;\n`;
  dart += `    }\n`;
  dart += `  }\n`;
  dart += `}\n\n`;
  
  return dart;
}

/**
 * Generate brand class
 */
function generateBrandClass(brand: Brand): string {
  const className = `${toPascalCase(brand.id)}Brand`;
  let dart = `/// ${brand.name} brand colors\n`;
  dart += `class ${className} {\n`;
  dart += `  ${className}._();\n\n`;
  dart += `  static const String id = '${brand.id}';\n`;
  dart += `  static const String name = '${brand.name}';\n`;
  dart += `  static const String nameAr = '${brand.nameAr}';\n\n`;
  
  dart += `  // Primary colors\n`;
  for (const step of colorSteps) {
    dart += `  static const Color primary${step} = ${hexToFlutterColor(brand.primary[step])};\n`;
  }
  dart += `\n`;
  
  dart += `  // Secondary colors\n`;
  for (const step of colorSteps) {
    dart += `  static const Color secondary${step} = ${hexToFlutterColor(brand.secondary[step])};\n`;
  }
  dart += `\n`;
  
  dart += `  // Quick access\n`;
  dart += `  static const Color primary = primary500;\n`;
  dart += `  static const Color secondary = secondary500;\n`;
  dart += `  static const Color primaryLight = primary100;\n`;
  dart += `  static const Color primaryDark = primary700;\n`;
  
  dart += `}\n\n`;
  
  return dart;
}

/**
 * Generate semantic token extension
 */
function generateSemanticExtension(brand: Brand, isDark: boolean): string {
  const mode = isDark ? 'Dark' : 'Light';
  let dart = `/// Semantic colors for ${mode.toLowerCase()} mode\n`;
  dart += `class SingularSemanticColors${mode} {\n`;
  dart += `  SingularSemanticColors${mode}._();\n\n`;
  
  for (const category of semanticCategories) {
    dart += `  // ${category.name}\n`;
    for (const token of category.tokens) {
      const ref = isDark ? token.dark : token.light;
      const value = resolveColorRef(ref, brand, isDark);
      const propName = token.name.replace(/-/g, '_').replace(/\//g, '_');
      dart += `  static const Color ${propName} = ${hexToFlutterColor(value)};\n`;
    }
    dart += '\n';
  }
  
  dart += `}\n\n`;
  
  return dart;
}

/**
 * Generate ThemeData extension
 */
function generateThemeExtension(): string {
  let dart = `/// Singular theme extension for Flutter\n`;
  dart += `class SingularTheme extends ThemeExtension<SingularTheme> {\n`;
  dart += `  const SingularTheme({\n`;
  dart += `    required this.textPrimary,\n`;
  dart += `    required this.textSecondary,\n`;
  dart += `    required this.textTertiary,\n`;
  dart += `    required this.bgPrimary,\n`;
  dart += `    required this.bgSecondary,\n`;
  dart += `    required this.borderPrimary,\n`;
  dart += `    required this.borderSecondary,\n`;
  dart += `  });\n\n`;
  
  dart += `  final Color textPrimary;\n`;
  dart += `  final Color textSecondary;\n`;
  dart += `  final Color textTertiary;\n`;
  dart += `  final Color bgPrimary;\n`;
  dart += `  final Color bgSecondary;\n`;
  dart += `  final Color borderPrimary;\n`;
  dart += `  final Color borderSecondary;\n\n`;
  
  dart += `  @override\n`;
  dart += `  SingularTheme copyWith({\n`;
  dart += `    Color? textPrimary,\n`;
  dart += `    Color? textSecondary,\n`;
  dart += `    Color? textTertiary,\n`;
  dart += `    Color? bgPrimary,\n`;
  dart += `    Color? bgSecondary,\n`;
  dart += `    Color? borderPrimary,\n`;
  dart += `    Color? borderSecondary,\n`;
  dart += `  }) {\n`;
  dart += `    return SingularTheme(\n`;
  dart += `      textPrimary: textPrimary ?? this.textPrimary,\n`;
  dart += `      textSecondary: textSecondary ?? this.textSecondary,\n`;
  dart += `      textTertiary: textTertiary ?? this.textTertiary,\n`;
  dart += `      bgPrimary: bgPrimary ?? this.bgPrimary,\n`;
  dart += `      bgSecondary: bgSecondary ?? this.bgSecondary,\n`;
  dart += `      borderPrimary: borderPrimary ?? this.borderPrimary,\n`;
  dart += `      borderSecondary: borderSecondary ?? this.borderSecondary,\n`;
  dart += `    );\n`;
  dart += `  }\n\n`;
  
  dart += `  @override\n`;
  dart += `  SingularTheme lerp(ThemeExtension<SingularTheme>? other, double t) {\n`;
  dart += `    if (other is! SingularTheme) return this;\n`;
  dart += `    return SingularTheme(\n`;
  dart += `      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,\n`;
  dart += `      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,\n`;
  dart += `      textTertiary: Color.lerp(textTertiary, other.textTertiary, t)!,\n`;
  dart += `      bgPrimary: Color.lerp(bgPrimary, other.bgPrimary, t)!,\n`;
  dart += `      bgSecondary: Color.lerp(bgSecondary, other.bgSecondary, t)!,\n`;
  dart += `      borderPrimary: Color.lerp(borderPrimary, other.borderPrimary, t)!,\n`;
  dart += `      borderSecondary: Color.lerp(borderSecondary, other.borderSecondary, t)!,\n`;
  dart += `    );\n`;
  dart += `  }\n`;
  dart += `}\n\n`;
  
  return dart;
}

/**
 * Generate complete Flutter output
 */
export function generateFlutter(options: GeneratorOptions = {}): GeneratedOutput {
  const brand = options.brandId ? brands[options.brandId] : defaultBrand;
  const includeSemantics = options.includeSemantics !== false;
  const timestamp = formatTimestamp();
  
  let content = `/// Singular Design System Tokens
/// Format: Flutter/Dart
/// Generated: ${timestamp}
/// 
/// DO NOT EDIT DIRECTLY - Generated from source tokens

import 'package:flutter/material.dart';

`;

  // Base colors
  content += `/// Base colors\n`;
  content += `class SingularBaseColors {\n`;
  content += `  SingularBaseColors._();\n\n`;
  content += `  static const Color white = ${hexToFlutterColor(baseColors.white)};\n`;
  content += `  static const Color black = ${hexToFlutterColor(baseColors.black)};\n`;
  content += `  static const Color transparent = Colors.transparent;\n`;
  content += `}\n\n`;

  // Gray scales
  content += generateColorScaleClass('grayLight', grayLight);
  content += generateColorScaleClass('grayDark', grayDark);

  // Status colors
  content += generateColorScaleClass('error', statusColors.error);
  content += generateColorScaleClass('warning', statusColors.warning);
  content += generateColorScaleClass('success', statusColors.success);
  content += generateColorScaleClass('info', statusColors.info);

  // Brand classes
  for (const brandId of brandIds) {
    content += generateBrandClass(brands[brandId]);
  }

  // Semantic tokens
  if (includeSemantics) {
    content += generateSemanticExtension(brand, false);
    content += generateSemanticExtension(brand, true);
  }

  // Theme extension
  content += generateThemeExtension();

  // Factory methods
  content += `/// Factory methods for creating themes\n`;
  content += `class SingularThemes {\n`;
  content += `  SingularThemes._();\n\n`;
  content += `  static SingularTheme light() {\n`;
  content += `    return SingularTheme(\n`;
  content += `      textPrimary: SingularSemanticColorsLight.text_primary,\n`;
  content += `      textSecondary: SingularSemanticColorsLight.text_secondary,\n`;
  content += `      textTertiary: SingularSemanticColorsLight.text_tertiary,\n`;
  content += `      bgPrimary: SingularSemanticColorsLight.bg_primary,\n`;
  content += `      bgSecondary: SingularSemanticColorsLight.bg_secondary,\n`;
  content += `      borderPrimary: SingularSemanticColorsLight.border_primary,\n`;
  content += `      borderSecondary: SingularSemanticColorsLight.border_secondary,\n`;
  content += `    );\n`;
  content += `  }\n\n`;
  content += `  static SingularTheme dark() {\n`;
  content += `    return SingularTheme(\n`;
  content += `      textPrimary: SingularSemanticColorsDark.text_primary,\n`;
  content += `      textSecondary: SingularSemanticColorsDark.text_secondary,\n`;
  content += `      textTertiary: SingularSemanticColorsDark.text_tertiary,\n`;
  content += `      bgPrimary: SingularSemanticColorsDark.bg_primary,\n`;
  content += `      bgSecondary: SingularSemanticColorsDark.bg_secondary,\n`;
  content += `      borderPrimary: SingularSemanticColorsDark.border_primary,\n`;
  content += `      borderSecondary: SingularSemanticColorsDark.border_secondary,\n`;
  content += `    );\n`;
  content += `  }\n`;
  content += `}\n`;

  return {
    format: 'flutter',
    filename: `singular_tokens${options.brandId ? `_${options.brandId}` : ''}.dart`,
    content,
  };
}

