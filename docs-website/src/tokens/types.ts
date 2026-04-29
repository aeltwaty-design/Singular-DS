/**
 * Design Token Type Definitions
 * Single source of truth for all token interfaces
 */

// =============================================================================
// COLOR TYPES
// =============================================================================

/**
 * 12-step color scale from 25 to 950
 */
export interface ColorScale {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Base colors (white, black, transparent)
 */
export interface BaseColors {
  white: string;
  black: string;
  transparent: string;
}

/**
 * Status color palettes
 */
export interface StatusColors {
  error: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  info: ColorScale;
}

// =============================================================================
// SEMANTIC TOKEN TYPES
// =============================================================================

/**
 * Semantic color token with light/dark mode values
 */
export interface SemanticToken {
  name: string;
  light: string;  // Reference like "gray-900" or hex value
  dark: string;   // Reference like "gray-50" or hex value
  description: string;
  descriptionAr: string;
}

/**
 * Category of semantic tokens
 */
export interface SemanticTokenCategory {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  tokens: SemanticToken[];
}

// =============================================================================
// BRAND TYPES
// =============================================================================

/**
 * Brand identifier
 */
export type BrandId = 'walaplus' | 'walaone' | 'doam';

/**
 * Brand configuration
 */
export interface Brand {
  id: BrandId;
  name: string;
  nameAr: string;
  logo: string;
  primary: ColorScale;
  secondary: ColorScale;
  // Quick access colors for UI
  colors: {
    primary: string;      // primary-500
    secondary: string;    // secondary-500
    primaryLight: string; // primary-100
    primaryDark: string;  // primary-700
  };
}

/**
 * All brands configuration
 */
export type Brands = Record<BrandId, Brand>;

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

/**
 * Font family definition
 */
export interface FontFamily {
  name: string;
  fallback: string[];
  variable?: string;
}

/**
 * Font size with line height
 */
export interface FontSize {
  size: string;
  lineHeight: string;
}

/**
 * Typography scale (headings or text)
 */
export interface TypographyScale {
  xxl: FontSize;
  xl: FontSize;
  lg: FontSize;
  md: FontSize;
  sm: FontSize;
  xs: FontSize;
  xxs: FontSize;
}

/**
 * Font weight definition
 */
export interface FontWeights {
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

/**
 * Complete typography configuration
 */
export interface Typography {
  families: {
    display: FontFamily;
    body: FontFamily;
    mono: FontFamily;
  };
  headings: {
    en: TypographyScale;
    ar: TypographyScale;
  };
  text: {
    en: TypographyScale;
    ar: TypographyScale;
  };
  weights: FontWeights;
}

// =============================================================================
// SPACING & LAYOUT TYPES
// =============================================================================

/**
 * Spacing scale
 */
export interface SpacingScale {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

/**
 * Border radius scale
 */
export interface RadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

/**
 * Token export format
 */
export type ExportFormat = 'css' | 'tailwind' | 'flutter' | 'json';

/**
 * Generator options
 */
export interface GeneratorOptions {
  brandId?: BrandId;
  includeSemantics?: boolean;
  prefix?: string;
}

/**
 * Generated output
 */
export interface GeneratedOutput {
  format: ExportFormat;
  filename: string;
  content: string;
}

