/**
 * Generator Utilities
 * Shared utilities for token generators
 */

import type { ColorScale, Brand } from '../types';
import { grayLight, grayDark, statusColors, baseColors } from '../primitives/colors';

/**
 * Convert kebab-case to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert kebab-case to PascalCase
 */
export function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Convert kebab-case to snake_case
 */
export function toSnakeCase(str: string): string {
  return str.replace(/-/g, '_');
}

/**
 * Color scale steps in order
 */
export const colorSteps = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type ColorStep = (typeof colorSteps)[number];

/**
 * Generate CSS variable name
 */
export function cssVar(name: string, prefix = 'color'): string {
  return `--${prefix}-${name}`;
}

/**
 * Generate color scale CSS variables
 */
export function generateColorScaleVars(
  name: string,
  scale: ColorScale,
  prefix = 'color'
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const step of colorSteps) {
    vars[cssVar(`${name}-${step}`, prefix)] = scale[step];
  }
  return vars;
}

/**
 * Resolve a color reference to its hex value
 * Handles references like "gray-900", "primary-500", etc.
 */
export function resolveColorRef(
  ref: string,
  brand: Brand,
  isDark: boolean
): string {
  // If it's already a hex color, return it
  if (ref.startsWith('#')) {
    return ref;
  }

  // If it's 'white', 'black', or 'transparent'
  if (ref === 'white') return baseColors.white;
  if (ref === 'black') return baseColors.black;
  if (ref === 'transparent') return baseColors.transparent;

  // Parse the reference (e.g., "gray-900", "primary-500")
  const parts = ref.split('-');
  if (parts.length < 2) {
    console.warn(`Invalid color reference: ${ref}`);
    return ref;
  }

  const colorName = parts.slice(0, -1).join('-');
  const step = parseInt(parts[parts.length - 1]) as ColorStep;

  if (isNaN(step)) {
    console.warn(`Invalid color step in reference: ${ref}`);
    return ref;
  }

  // Resolve the color name to a scale
  let scale: ColorScale | undefined;

  switch (colorName) {
    case 'gray':
      scale = isDark ? grayDark : grayLight;
      break;
    case 'primary':
      scale = brand.primary;
      break;
    case 'secondary':
      scale = brand.secondary;
      break;
    case 'error':
      scale = statusColors.error;
      break;
    case 'warning':
      scale = statusColors.warning;
      break;
    case 'success':
      scale = statusColors.success;
      break;
    case 'info':
      scale = statusColors.info;
      break;
    default:
      console.warn(`Unknown color name in reference: ${ref}`);
      return ref;
  }

  if (scale && step in scale) {
    return scale[step];
  }

  console.warn(`Could not resolve color reference: ${ref}`);
  return ref;
}

/**
 * Format timestamp for file headers
 */
export function formatTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Generate file header comment
 */
export function generateHeader(format: string): string {
  const timestamp = formatTimestamp();
  return `/**
 * Singular Design System Tokens
 * Format: ${format}
 * Generated: ${timestamp}
 * 
 * DO NOT EDIT DIRECTLY - Generated from source tokens
 */\n\n`;
}

