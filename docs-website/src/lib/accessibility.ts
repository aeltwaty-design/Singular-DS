/**
 * Accessibility Utilities
 * WCAG contrast calculations and color accessibility
 */

// =============================================================================
// COLOR CONVERSION
// =============================================================================

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// =============================================================================
// LUMINANCE CALCULATIONS
// =============================================================================

/**
 * Calculate relative luminance of a color
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get luminance from hex color
 */
export function getLuminanceFromHex(hex: string): number {
  const rgb = hexToRgb(hex);
  return getLuminance(rgb.r, rgb.g, rgb.b);
}

// =============================================================================
// CONTRAST CALCULATIONS
// =============================================================================

/**
 * Calculate contrast ratio between two colors
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminanceFromHex(color1);
  const lum2 = getLuminanceFromHex(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG compliance levels
 */
export type WCAGLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';

/**
 * Check WCAG compliance for normal text
 * - AAA: 7:1
 * - AA: 4.5:1
 */
export function getWCAGLevel(ratio: number): WCAGLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'fail';
}

/**
 * Get WCAG rating with score
 */
export function getWCAGRating(ratio: number): { label: string; score: string; level: WCAGLevel } {
  const score = ratio.toFixed(2);
  const level = getWCAGLevel(ratio);
  
  let label = '';
  if (level === 'AAA') label = 'AAA';
  else if (level === 'AA') label = 'AA';
  else if (level === 'AA-large') label = 'AA';
  
  return { label, score, level };
}

/**
 * Check if contrast meets minimum WCAG AA requirements
 */
export function meetsWCAGAA(color1: string, color2: string): boolean {
  return getContrastRatio(color1, color2) >= 4.5;
}

/**
 * Check if contrast meets WCAG AAA requirements
 */
export function meetsWCAGAAA(color1: string, color2: string): boolean {
  return getContrastRatio(color1, color2) >= 7;
}

// =============================================================================
// COLOR ANALYSIS
// =============================================================================

/**
 * Determine if a color is "light" (for choosing text color)
 */
export function isLightColor(hex: string): boolean {
  const luminance = getLuminanceFromHex(hex);
  return luminance > 0.179; // Threshold for switching text color
}

/**
 * Get optimal text color (black or white) for a background
 */
export function getOptimalTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
}

/**
 * Get contrast color that meets WCAG AA
 */
export function getAccessibleColor(
  backgroundColor: string,
  preferLight = false
): string {
  const white = '#FFFFFF';
  const black = '#000000';
  
  const whiteContrast = getContrastRatio(backgroundColor, white);
  const blackContrast = getContrastRatio(backgroundColor, black);
  
  if (preferLight) {
    return whiteContrast >= 4.5 ? white : black;
  }
  
  return blackContrast >= whiteContrast ? black : white;
}

// =============================================================================
// SUGGESTIONS
// =============================================================================

/**
 * Suggest color adjustments to meet WCAG requirements
 */
export function suggestContrastFix(
  foreground: string,
  background: string,
  targetLevel: 'AA' | 'AAA' = 'AA'
): { suggestion: string; currentRatio: number; targetRatio: number } {
  const currentRatio = getContrastRatio(foreground, background);
  const targetRatio = targetLevel === 'AAA' ? 7 : 4.5;
  
  let suggestion = '';
  
  if (currentRatio >= targetRatio) {
    suggestion = `Current contrast ratio (${currentRatio.toFixed(2)}) meets ${targetLevel} requirements.`;
  } else {
    const fgLight = isLightColor(foreground);
    const bgLight = isLightColor(background);
    
    if (fgLight === bgLight) {
      suggestion = fgLight
        ? 'Darken the foreground color or lighten the background.'
        : 'Lighten the foreground color or darken the background.';
    } else {
      suggestion = 'Increase the difference between foreground and background colors.';
    }
    
    suggestion += ` Current: ${currentRatio.toFixed(2)}:1, Target: ${targetRatio}:1`;
  }
  
  return { suggestion, currentRatio, targetRatio };
}

