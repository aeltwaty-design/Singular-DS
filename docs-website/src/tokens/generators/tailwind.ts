/**
 * Tailwind CSS Config Generator
 */

import type { GeneratorOptions, GeneratedOutput, Brand, ColorScale } from '../types';
import { grayLight, statusColors } from '../primitives/colors';
import { brands, defaultBrand } from '../brands';
import { semanticCategories } from '../semantic';
import { colorSteps, generateHeader } from './utils';

/**
 * Generate Tailwind color object for a scale
 */
function generateColorScale(scale: ColorScale): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const step of colorSteps) {
    colors[step.toString()] = scale[step];
  }
  return colors;
}

/**
 * Generate Tailwind color object with CSS variable references
 */
function generateColorScaleVars(name: string): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const step of colorSteps) {
    colors[step.toString()] = `var(--color-${name}-${step})`;
  }
  return colors;
}

/**
 * Generate semantic color utilities
 */
function generateSemanticColors(): Record<string, Record<string, string>> {
  const colors: Record<string, Record<string, string>> = {};
  
  for (const category of semanticCategories) {
    for (const token of category.tokens) {
      // Convert token name to nested object
      // e.g., "text-primary" -> { text: { primary: ... } }
      const parts = token.name.split('-');
      if (parts.length >= 2) {
        const prefix = parts[0];
        const suffix = parts.slice(1).join('-');
        
        if (!colors[prefix]) {
          colors[prefix] = {};
        }
        colors[prefix][suffix] = `var(--${token.name})`;
      }
    }
  }

  return colors;
}

/**
 * Generate complete Tailwind config
 */
export function generateTailwind(options: GeneratorOptions = {}): GeneratedOutput {
  const brand = options.brandId ? brands[options.brandId] : defaultBrand;
  const includeSemantics = options.includeSemantics !== false;
  
  const config = {
    colors: {
      // Base colors
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
      
      // Primitive scales (using CSS vars for theming)
      gray: generateColorScaleVars('gray'),
      primary: generateColorScaleVars('primary'),
      secondary: generateColorScaleVars('secondary'),
      error: generateColorScale(statusColors.error),
      warning: generateColorScale(statusColors.warning),
      success: generateColorScale(statusColors.success),
      info: generateColorScale(statusColors.info),
    },
    // Add semantic colors if requested
    ...(includeSemantics && {
      textColor: generateSemanticColors().text || {},
      backgroundColor: generateSemanticColors().bg || {},
      borderColor: generateSemanticColors().border || {},
    }),
  };

  // Generate JavaScript/TypeScript output
  let content = generateHeader('Tailwind CSS Config');
  content += '// Import this file in your tailwind.config.js/ts\n';
  content += '// const tokens = require("./tokens.tailwind.js");\n';
  content += '// Or: import tokens from "./tokens.tailwind";\n\n';
  content += '/** @type {import("tailwindcss").Config["theme"]} */\n';
  content += 'module.exports = ';
  content += JSON.stringify(config, null, 2);
  content += ';\n';

  return {
    format: 'tailwind',
    filename: `tokens${options.brandId ? `-${options.brandId}` : ''}.tailwind.js`,
    content,
  };
}

/**
 * Generate TypeScript version
 */
export function generateTailwindTS(options: GeneratorOptions = {}): GeneratedOutput {
  const output = generateTailwind(options);
  
  // Convert to TypeScript
  let content = output.content;
  content = content.replace('module.exports = ', 'const tokens = ');
  content = content.replace(/;\n$/, ' as const;\n\nexport default tokens;\n');
  content = content.replace('/** @type {import("tailwindcss").Config["theme"]} */\n', 
    'import type { Config } from "tailwindcss";\n\n');

  return {
    format: 'tailwind',
    filename: `tokens${options.brandId ? `-${options.brandId}` : ''}.tailwind.ts`,
    content,
  };
}

