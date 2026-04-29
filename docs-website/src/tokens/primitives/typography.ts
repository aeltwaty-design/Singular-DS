/**
 * Typography Primitives
 * Font families, sizes, weights, and scales
 */

import type { Typography, TypographyScale, FontWeights, FontFamily } from '../types';

// =============================================================================
// FONT FAMILIES
// =============================================================================

export const fontFamilies: Typography['families'] = {
  display: {
    name: 'Inter',
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    variable: '--font-inter',
  },
  body: {
    name: 'Inter',
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    variable: '--font-inter',
  },
  mono: {
    name: 'JetBrains Mono',
    fallback: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
    variable: '--font-mono',
  },
};

// =============================================================================
// FONT WEIGHTS
// =============================================================================

export const fontWeights: FontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// =============================================================================
// HEADING SCALE (English)
// =============================================================================

export const headingsEn: TypographyScale = {
  xxl: { size: '72px', lineHeight: '90px' },
  xl: { size: '60px', lineHeight: '72px' },
  lg: { size: '48px', lineHeight: '60px' },
  md: { size: '36px', lineHeight: '44px' },
  sm: { size: '30px', lineHeight: '38px' },
  xs: { size: '24px', lineHeight: '32px' },
  xxs: { size: '20px', lineHeight: '28px' },
};

// =============================================================================
// HEADING SCALE (Arabic) - Same as English for Inter font
// =============================================================================

export const headingsAr: TypographyScale = {
  xxl: { size: '72px', lineHeight: '90px' },
  xl: { size: '60px', lineHeight: '72px' },
  lg: { size: '48px', lineHeight: '60px' },
  md: { size: '36px', lineHeight: '44px' },
  sm: { size: '30px', lineHeight: '38px' },
  xs: { size: '24px', lineHeight: '32px' },
  xxs: { size: '20px', lineHeight: '28px' },
};

// =============================================================================
// TEXT SCALE (English)
// =============================================================================

export const textEn: TypographyScale = {
  xxl: { size: '24px', lineHeight: '32px' },
  xl: { size: '20px', lineHeight: '30px' },
  lg: { size: '18px', lineHeight: '28px' },
  md: { size: '16px', lineHeight: '24px' },
  sm: { size: '14px', lineHeight: '20px' },
  xs: { size: '12px', lineHeight: '18px' },
  xxs: { size: '10px', lineHeight: '14px' },
};

// =============================================================================
// TEXT SCALE (Arabic) - Slightly larger XL for RTL readability
// =============================================================================

export const textAr: TypographyScale = {
  xxl: { size: '24px', lineHeight: '32px' },
  xl: { size: '24px', lineHeight: '30px' }, // 24px instead of 20px for better RTL readability
  lg: { size: '18px', lineHeight: '28px' },
  md: { size: '16px', lineHeight: '24px' },
  sm: { size: '14px', lineHeight: '20px' },
  xs: { size: '12px', lineHeight: '18px' },
  xxs: { size: '10px', lineHeight: '14px' },
};

// =============================================================================
// COMPLETE TYPOGRAPHY CONFIG
// =============================================================================

export const typography: Typography = {
  families: fontFamilies,
  headings: {
    en: headingsEn,
    ar: headingsAr,
  },
  text: {
    en: textEn,
    ar: textAr,
  },
  weights: fontWeights,
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get font family CSS string
 */
export function getFontFamilyCSS(family: FontFamily): string {
  return [family.name, ...family.fallback].map(f => 
    f.includes(' ') ? `"${f}"` : f
  ).join(', ');
}

/**
 * Get heading styles for a given size and locale
 */
export function getHeadingStyles(size: keyof TypographyScale, locale: 'en' | 'ar' = 'en') {
  const scale = locale === 'ar' ? headingsAr : headingsEn;
  return {
    fontSize: scale[size].size,
    lineHeight: scale[size].lineHeight,
    fontFamily: getFontFamilyCSS(fontFamilies.display),
  };
}

/**
 * Get text styles for a given size and locale
 */
export function getTextStyles(size: keyof TypographyScale, locale: 'en' | 'ar' = 'en') {
  const scale = locale === 'ar' ? textAr : textEn;
  return {
    fontSize: scale[size].size,
    lineHeight: scale[size].lineHeight,
    fontFamily: getFontFamilyCSS(fontFamilies.body),
  };
}

