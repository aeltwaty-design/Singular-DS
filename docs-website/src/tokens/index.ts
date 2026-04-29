/**
 * Singular Design Tokens
 * Single source of truth for all design tokens
 */

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  ColorScale,
  BaseColors,
  StatusColors,
  SemanticToken,
  SemanticTokenCategory,
  Brand,
  BrandId,
  Brands,
  FontFamily,
  FontSize,
  TypographyScale,
  FontWeights,
  Typography,
  SpacingScale,
  RadiusScale,
  ExportFormat,
  GeneratorOptions,
  GeneratedOutput,
} from './types';

// =============================================================================
// PRIMITIVES
// =============================================================================

export {
  baseColors,
  grayLight,
  grayDark,
  statusColors,
  alphaValues,
  withAlpha,
  getColorStep,
  isHexColor,
  hexToRgb,
  hexToHsl,
} from './primitives/colors';

// Typography
export {
  fontFamilies,
  fontWeights,
  headingsEn,
  headingsAr,
  textEn,
  textAr,
  typography,
  getFontFamilyCSS,
  getHeadingStyles,
  getTextStyles,
} from './primitives/typography';

// Spacing
export {
  spacing,
  radius,
  getSpacing,
  getRadius,
  getSpacingCSS,
  getRadiusCSS,
} from './primitives/spacing';

// =============================================================================
// BRANDS
// =============================================================================

export {
  walaplus,
  walaone,
  doam,
  brands,
  brandIds,
  getBrand,
  getAllBrands,
  defaultBrand,
  defaultBrandId,
} from './brands';

// =============================================================================
// SEMANTIC TOKENS
// =============================================================================

export {
  textTokens,
  borderTokens,
  foregroundTokens,
  backgroundTokens,
  alphaTokens,
  semanticCategories,
  getSemanticCategory,
  getAllSemanticTokens,
} from './semantic';

// =============================================================================
// GENERATORS
// =============================================================================

export { generateCSS } from './generators/css';
export { generateTailwind, generateTailwindTS } from './generators/tailwind';
export { generateFlutter } from './generators/flutter';
export { generateJSON, generateDTCG } from './generators/json';
export {
  generateAllFormats,
  generateFormat,
  getSupportedFormats,
  formatInfo,
} from './generators';

