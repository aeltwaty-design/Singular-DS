/**
 * Design Token Type Definitions
 * Copied from docs-website - will be replaced by generated output.
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

export interface BaseColors {
  white: string;
  black: string;
  transparent: string;
}

export interface StatusColors {
  error: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  info: ColorScale;
}

export interface SemanticToken {
  name: string;
  light: string;
  dark: string;
  description: string;
  descriptionAr: string;
}

export type BrandId = 'walaplus' | 'walaone' | 'doam';

export interface Brand {
  id: BrandId;
  name: string;
  nameAr: string;
  logo: string;
  primary: ColorScale;
  secondary: ColorScale;
  colors: {
    primary: string;
    secondary: string;
    primaryLight: string;
    primaryDark: string;
  };
}

export type Brands = Record<BrandId, Brand>;
