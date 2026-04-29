#!/usr/bin/env npx tsx
/**
 * Singular Design System - Token Generator
 * 
 * Reads canonical JSON token definitions and generates:
 * - Flutter/Dart files (lib/design_system/foundations/)
 * - Web TypeScript/CSS files (packages/react/src/tokens/)
 * 
 * Usage: npx tsx tokens/generate.ts [--check]
 * --check: Verify generated files are up to date (for CI)
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.resolve(__dirname);
const FLUTTER_OUT = path.join(ROOT, 'lib', 'design_system', 'foundations');
const WEB_OUT = path.join(ROOT, 'packages', 'react', 'src', 'tokens');

const isCheck = process.argv.includes('--check');

// --- JSON Loading ---

function loadJson(relativePath: string): any {
  const fullPath = path.join(TOKENS_DIR, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function loadColors() { return loadJson('primitives/colors.json'); }
function loadSpacing() { return loadJson('primitives/spacing.json'); }
function loadTypography() { return loadJson('primitives/typography.json'); }
function loadRadius() { return loadJson('primitives/radius.json'); }
function loadElevation() { return loadJson('primitives/elevation.json'); }
function loadBrand(id: string) { return loadJson(`brands/${id}.json`); }
function loadSemantic(category: string) { return loadJson(`semantic/${category}.json`); }

// --- Utilities ---

function kebabToCamel(s: string): string {
  return s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/_/g, '');
}

function hexToFlutterColor(hex: string): string {
  const clean = hex.replace('#', '').toUpperCase();
  if (clean.length === 8) {
    const alpha = clean.slice(6, 8);
    const rgb = clean.slice(0, 6);
    return `Color(0x${alpha}${rgb})`;
  }
  return `Color(0xFF${clean})`;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeOutput(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  if (isCheck) {
    if (!fs.existsSync(filePath)) {
      console.error(`STALE: ${filePath} does not exist`);
      process.exit(1);
    }
    const existing = fs.readFileSync(filePath, 'utf-8');
    if (existing !== content) {
      console.error(`STALE: ${filePath} is out of date. Run 'npx tsx tokens/generate.ts' to regenerate.`);
      process.exit(1);
    }
    return;
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  Generated: ${path.relative(ROOT, filePath)}`);
}

const HEADER = `// GENERATED FILE - DO NOT EDIT MANUALLY
// Run 'npx tsx tokens/generate.ts' to regenerate from tokens/*.json
// Source: https://github.com/singular-design-system/tokens
`;

// --- Flutter Generators ---

function generateColorPalettes(): string {
  const colors = loadColors();
  const brands = ['walaplus', 'walaone', 'doam'].map(id => loadBrand(id));

  let dart = `${HEADER}
// ignore_for_file: constant_identifier_names
import 'dart:ui';

`;

  // Brand palettes
  for (const brand of brands) {
    const className = brand.id === 'walaplus' ? 'WalaPlus' : brand.id === 'walaone' ? 'WalaOne' : 'Doam';
    for (const role of ['primary', 'secondary'] as const) {
      const scale = brand[role] as Record<string, string>;
      dart += `abstract class ${className}${role === 'primary' ? 'Primary' : 'Secondary'} {\n`;
      for (const [step, hex] of Object.entries(scale)) {
        dart += `  static const Color shade${step} = ${hexToFlutterColor(hex)};\n`;
      }
      dart += `\n  static const Map<int, Color> swatch = {\n`;
      for (const step of Object.keys(scale)) {
        dart += `    ${step}: shade${step},\n`;
      }
      dart += `  };\n}\n\n`;
    }
  }

  // Neutral palette (Flutter-specific slate gray)
  const neutral = colors.neutralFlutter;
  dart += `abstract class NeutralPalette {\n`;
  for (const [step, hex] of Object.entries(neutral).filter(([k]) => !k.startsWith('_'))) {
    dart += `  static const Color shade${step} = ${hexToFlutterColor(hex as string)};\n`;
  }
  dart += `  static const Color white = Color(0xFFFFFFFF);\n`;
  dart += `  static const Color black = Color(0xFF000000);\n`;
  dart += `\n  static const Map<int, Color> swatch = {\n`;
  for (const step of Object.keys(neutral).filter(k => !k.startsWith('_'))) {
    dart += `    ${step}: shade${step},\n`;
  }
  dart += `  };\n}\n\n`;

  // Status palettes (Flutter-specific)
  const statusMap: Record<string, string> = { success: 'Success', warning: 'Warning', error: 'Error', info: 'Info' };
  for (const [key, className] of Object.entries(statusMap)) {
    const scale = colors.statusFlutter[key] as Record<string, string>;
    dart += `abstract class ${className}Palette {\n`;
    for (const [step, hex] of Object.entries(scale)) {
      dart += `  static const Color shade${step} = ${hexToFlutterColor(hex)};\n`;
    }
    dart += `\n  static const Map<int, Color> swatch = {\n`;
    for (const step of Object.keys(scale)) {
      dart += `    ${step}: shade${step},\n`;
    }
    dart += `  };\n}\n\n`;
  }

  // SingularBrand enum and BrandColors utility
  dart += `enum SingularBrand { walaPlus, walaOne, doam }\n\n`;
  dart += `abstract class BrandColors {\n`;
  dart += `  static Map<int, Color> getPrimarySwatch(SingularBrand brand) {\n`;
  dart += `    switch (brand) {\n`;
  dart += `      case SingularBrand.walaPlus: return WalaPlusPrimary.swatch;\n`;
  dart += `      case SingularBrand.walaOne: return WalaOnePrimary.swatch;\n`;
  dart += `      case SingularBrand.doam: return DoamPrimary.swatch;\n`;
  dart += `    }\n  }\n\n`;
  dart += `  static Map<int, Color> getSecondarySwatch(SingularBrand brand) {\n`;
  dart += `    switch (brand) {\n`;
  dart += `      case SingularBrand.walaPlus: return WalaPlusSecondary.swatch;\n`;
  dart += `      case SingularBrand.walaOne: return WalaOneSecondary.swatch;\n`;
  dart += `      case SingularBrand.doam: return DoamSecondary.swatch;\n`;
  dart += `    }\n  }\n\n`;
  dart += `  static Color getPrimaryBase(SingularBrand brand) => getPrimarySwatch(brand)[500]!;\n`;
  dart += `  static Color getSecondaryBase(SingularBrand brand) => getSecondarySwatch(brand)[500]!;\n`;
  dart += `}\n`;

  return dart;
}

function generateSpacing(): string {
  const spacing = loadSpacing();

  let dart = `${HEADER}
import 'package:flutter/material.dart';

enum DeviceType { mobile, tablet, desktop }

@immutable
class AppSpacing extends ThemeExtension<AppSpacing> {
  const AppSpacing({
`;

  const fields = Object.entries(spacing.scale as Record<string, number>);
  for (const [name] of fields) {
    dart += `    required this.${name},\n`;
  }
  dart += `    required this.pageMargin,\n    required this.gutter,\n    required this.baseUnit,\n  });\n\n`;

  for (const [name, value] of fields) {
    dart += `  final double ${name};\n`;
  }
  dart += `  final double pageMargin;\n  final double gutter;\n  final double baseUnit;\n\n`;

  // Factories
  const layouts = spacing.layout as Record<string, { pageMargin: number; gutter: number }>;
  for (const [device, layout] of [['standard', layouts.mobile], ['mobile', layouts.mobile], ['tablet', layouts.tablet], ['desktop', layouts.desktop]] as const) {
    dart += `  factory AppSpacing.${device}() {\n    return const AppSpacing(\n`;
    for (const [name, value] of fields) {
      dart += `      ${name}: ${value},\n`;
    }
    dart += `      pageMargin: ${layout.pageMargin},\n      gutter: ${layout.gutter},\n      baseUnit: ${spacing.baseUnit},\n    );\n  }\n\n`;
  }

  dart += `  factory AppSpacing.forDevice(DeviceType deviceType) {
    switch (deviceType) {
      case DeviceType.mobile: return AppSpacing.mobile();
      case DeviceType.tablet: return AppSpacing.tablet();
      case DeviceType.desktop: return AppSpacing.desktop();
    }
  }

  factory AppSpacing.responsive(double screenWidth) {
    if (screenWidth >= 1200) return AppSpacing.desktop();
    if (screenWidth >= 768) return AppSpacing.tablet();
    return AppSpacing.mobile();
  }

  double scaled(double factor) => baseUnit * factor;
  EdgeInsets all(double value) => EdgeInsets.all(value);
  EdgeInsets horizontal(double value) => EdgeInsets.symmetric(horizontal: value);
  EdgeInsets vertical(double value) => EdgeInsets.symmetric(vertical: value);
  EdgeInsets symmetric({double horizontal = 0, double vertical = 0}) => EdgeInsets.symmetric(horizontal: horizontal, vertical: vertical);
  EdgeInsets get pageInsets => EdgeInsets.symmetric(horizontal: pageMargin);
  EdgeInsets get cardInsets => EdgeInsets.all(lg);
  EdgeInsets get listItemInsets => EdgeInsets.symmetric(horizontal: lg, vertical: md);
  EdgeInsets get sectionInsets => EdgeInsets.symmetric(vertical: section);

`;

  // copyWith
  dart += `  @override\n  AppSpacing copyWith({\n`;
  for (const [name] of fields) { dart += `    double? ${name},\n`; }
  dart += `    double? pageMargin,\n    double? gutter,\n    double? baseUnit,\n  }) {\n    return AppSpacing(\n`;
  for (const [name] of fields) { dart += `      ${name}: ${name} ?? this.${name},\n`; }
  dart += `      pageMargin: pageMargin ?? this.pageMargin,\n      gutter: gutter ?? this.gutter,\n      baseUnit: baseUnit ?? this.baseUnit,\n    );\n  }\n\n`;

  // lerp
  dart += `  @override\n  AppSpacing lerp(ThemeExtension<AppSpacing>? other, double t) {\n`;
  dart += `    if (other is! AppSpacing) return this;\n    return AppSpacing(\n`;
  for (const [name] of fields) { dart += `      ${name}: ${name} + (other.${name} - ${name}) * t,\n`; }
  dart += `      pageMargin: pageMargin + (other.pageMargin - pageMargin) * t,\n`;
  dart += `      gutter: gutter + (other.gutter - gutter) * t,\n`;
  dart += `      baseUnit: baseUnit + (other.baseUnit - baseUnit) * t,\n`;
  dart += `    );\n  }\n\n`;

  // equality
  dart += `  @override\n  bool operator ==(Object other) {\n    if (identical(this, other)) return true;\n    if (other.runtimeType != runtimeType) return false;\n    return other is AppSpacing`;
  for (const [name] of fields) { dart += ` && other.${name} == ${name}`; }
  dart += ` && other.pageMargin == pageMargin && other.gutter == gutter && other.baseUnit == baseUnit;\n  }\n\n`;
  dart += `  @override\n  int get hashCode => Object.hashAll([${fields.map(([n]) => n).join(', ')}, pageMargin, gutter, baseUnit]);\n`;
  dart += `}\n\n`;

  // Context extension
  dart += `extension AppSpacingExtension on BuildContext {\n  AppSpacing get spacing => Theme.of(this).extension<AppSpacing>()!;\n}\n\n`;

  // Gap widgets
  const gapEntries = fields.filter(([name]) => name !== 'none');
  for (const [widgetName, direction] of [['Gap', 'width: size, height: size'], ['HGap', 'width: size'], ['VGap', 'height: size']] as const) {
    dart += `class ${widgetName} extends StatelessWidget {\n`;
    dart += `  const ${widgetName}(this.size, {super.key});\n  final double size;\n\n`;
    for (const [name, value] of gapEntries) {
      dart += `  const ${widgetName}.${name}({super.key}) : size = ${value};\n`;
    }
    dart += `\n  @override\n  Widget build(BuildContext context) => SizedBox(${direction});\n}\n\n`;
  }

  return dart;
}

function generateRadius(): string {
  const radius = loadRadius();
  const scale = radius.scale as Record<string, number>;

  let dart = `${HEADER}
import 'package:flutter/material.dart';

@immutable
class AppRadius extends ThemeExtension<AppRadius> {
  const AppRadius({
`;
  for (const name of Object.keys(scale)) {
    dart += `    required this.${name === 'full' ? 'full' : name},\n`;
  }
  dart += `  });\n\n`;

  for (const [name, value] of Object.entries(scale)) {
    dart += `  final BorderRadius ${name};\n`;
  }
  dart += `\n`;

  // Static values
  for (const [name, value] of Object.entries(scale)) {
    const constName = `value${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    dart += `  static const double ${constName} = ${value};\n`;
  }
  dart += `\n`;

  // Factory
  dart += `  factory AppRadius.standard() {\n    return AppRadius(\n`;
  for (const [name, value] of Object.entries(scale)) {
    if (value === 0) dart += `      ${name}: BorderRadius.zero,\n`;
    else dart += `      ${name}: BorderRadius.circular(${value}),\n`;
  }
  dart += `    );\n  }\n\n`;

  // Helper methods
  dart += `  Radius circularRadius(BorderRadius borderRadius) => borderRadius.topLeft;

  BorderRadius topOnly(BorderRadius base) {
    final r = base.topLeft;
    return BorderRadius.only(topLeft: r, topRight: r);
  }

  BorderRadius bottomOnly(BorderRadius base) {
    final r = base.topLeft;
    return BorderRadius.only(bottomLeft: r, bottomRight: r);
  }

  BorderRadius leftOnly(BorderRadius base) {
    final r = base.topLeft;
    return BorderRadius.only(topLeft: r, bottomLeft: r);
  }

  BorderRadius rightOnly(BorderRadius base) {
    final r = base.topLeft;
    return BorderRadius.only(topRight: r, bottomRight: r);
  }

  RoundedRectangleBorder shapeBorder(BorderRadius borderRadius) =>
      RoundedRectangleBorder(borderRadius: borderRadius);
  CircleBorder get circleBorder => const CircleBorder();
  StadiumBorder get stadiumBorder => const StadiumBorder();

`;

  // copyWith
  dart += `  @override\n  AppRadius copyWith({\n`;
  for (const name of Object.keys(scale)) { dart += `    BorderRadius? ${name},\n`; }
  dart += `  }) {\n    return AppRadius(\n`;
  for (const name of Object.keys(scale)) { dart += `      ${name}: ${name} ?? this.${name},\n`; }
  dart += `    );\n  }\n\n`;

  // lerp
  dart += `  @override\n  AppRadius lerp(ThemeExtension<AppRadius>? other, double t) {\n`;
  dart += `    if (other is! AppRadius) return this;\n    return AppRadius(\n`;
  for (const name of Object.keys(scale)) {
    dart += `      ${name}: BorderRadius.lerp(${name}, other.${name}, t)!,\n`;
  }
  dart += `    );\n  }\n\n`;

  // equality
  dart += `  @override\n  bool operator ==(Object other) {\n    if (identical(this, other)) return true;\n    if (other.runtimeType != runtimeType) return false;\n    return other is AppRadius`;
  for (const name of Object.keys(scale)) { dart += ` && other.${name} == ${name}`; }
  dart += `;\n  }\n\n`;
  dart += `  @override\n  int get hashCode => Object.hashAll([${Object.keys(scale).join(', ')}]);\n`;
  dart += `}\n\n`;

  dart += `extension AppRadiusExtension on BuildContext {\n  AppRadius get radius => Theme.of(this).extension<AppRadius>()!;\n}\n`;

  return dart;
}

function generateWebTokens(): string {
  const colors = loadColors();
  const brands = ['walaplus', 'walaone', 'doam'].map(id => loadBrand(id));
  const bgTokens = loadSemantic('background');
  const textTokens = loadSemantic('text');
  const borderTokens = loadSemantic('border');
  const fgTokens = loadSemantic('foreground');
  const alphaTokens = loadSemantic('alpha');

  let ts = `${HEADER}

export const baseColors = ${JSON.stringify(colors.baseColors, null, 2)} as const;

export const grayLight = ${JSON.stringify(colors.grayLight, null, 2)} as const;

export const grayDark = ${JSON.stringify(colors.grayDark, null, 2)} as const;

export const statusColors = ${JSON.stringify(colors.status, null, 2)} as const;

export type BrandId = ${brands.map(b => `'${b.id}'`).join(' | ')};

export const brands = {
${brands.map(b => `  ${b.id}: ${JSON.stringify(b, null, 4).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n')}`).join(',\n')}
} as const;

export const brandIds: BrandId[] = [${brands.map(b => `'${b.id}'`).join(', ')}];

export function getBrand(id: BrandId) { return brands[id]; }
export const defaultBrandId: BrandId = 'walaplus';
export const defaultBrand = brands.walaplus;

export type SemanticToken = {
  name: string;
  light: string;
  dark: string;
  description: string;
  descriptionAr: string;
};

export const backgroundTokens: SemanticToken[] = ${JSON.stringify(bgTokens, null, 2)};

export const textTokens: SemanticToken[] = ${JSON.stringify(textTokens, null, 2)};

export const borderTokens: SemanticToken[] = ${JSON.stringify(borderTokens, null, 2)};

export const foregroundTokens: SemanticToken[] = ${JSON.stringify(fgTokens, null, 2)};

export const alphaTokens: SemanticToken[] = ${JSON.stringify(alphaTokens, null, 2)};

export const allSemanticTokens = [
  ...backgroundTokens,
  ...textTokens,
  ...borderTokens,
  ...foregroundTokens,
  ...alphaTokens,
];
`;
  return ts;
}

function generateWebSpacing(): string {
  const spacing = loadSpacing();
  const radius = loadRadius();

  let ts = `${HEADER}

export const spacing = ${JSON.stringify(spacing.scale, null, 2)} as const;

export const spacingNumeric = ${JSON.stringify(spacing.webNumericScale, null, 2)} as const;

export const layout = ${JSON.stringify(spacing.layout, null, 2)} as const;

export const baseUnit = ${spacing.baseUnit};

export const radius = ${JSON.stringify(radius.webScale, null, 2)} as const;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
`;
  return ts;
}

// --- Main ---

function main() {
  console.log(isCheck ? 'Checking generated files...' : 'Generating design tokens...');
  console.log('');

  // Flutter output
  console.log('Flutter:');
  writeOutput(
    path.join(FLUTTER_OUT, 'primitives', 'color_palettes.generated.dart'),
    generateColorPalettes()
  );
  writeOutput(
    path.join(FLUTTER_OUT, 'tokens', 'app_spacing.generated.dart'),
    generateSpacing()
  );
  writeOutput(
    path.join(FLUTTER_OUT, 'tokens', 'app_radius.generated.dart'),
    generateRadius()
  );

  // Web output
  console.log('\nWeb:');
  writeOutput(
    path.join(WEB_OUT, 'colors.generated.ts'),
    generateWebTokens()
  );
  writeOutput(
    path.join(WEB_OUT, 'spacing.generated.ts'),
    generateWebSpacing()
  );

  console.log('\n' + (isCheck ? 'All files up to date.' : 'Done!'));
}

main();
