/**
 * Spacing Primitives
 * Spacing and layout scales
 */

import type { SpacingScale, RadiusScale } from '../types';

// =============================================================================
// SPACING SCALE
// =============================================================================

/**
 * Base spacing unit: 4px
 * Scale uses 4px increments for consistency
 */
export const spacing: SpacingScale = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
};

// =============================================================================
// BORDER RADIUS SCALE
// =============================================================================

export const radius: RadiusScale = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get spacing value by key
 */
export function getSpacing(key: keyof SpacingScale): string {
  return spacing[key];
}

/**
 * Get radius value by key
 */
export function getRadius(key: keyof RadiusScale): string {
  return radius[key];
}

/**
 * Generate CSS spacing variables
 */
export function getSpacingCSS(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(spacing)) {
    vars[`--spacing-${key}`] = value;
  }
  return vars;
}

/**
 * Generate CSS radius variables
 */
export function getRadiusCSS(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(radius)) {
    vars[`--radius-${key}`] = value;
  }
  return vars;
}

