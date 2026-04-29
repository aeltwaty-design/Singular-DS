/**
 * CSS Custom Properties Generator
 */

import type { GeneratorOptions, GeneratedOutput, Brand, ColorScale } from '../types';
import { grayLight, grayDark, statusColors, baseColors } from '../primitives/colors';
import { brands, defaultBrand } from '../brands';
import { semanticCategories } from '../semantic';
import { colorSteps, resolveColorRef, generateHeader } from './utils';

/**
 * Generate CSS variables for a color scale
 */
function generateColorScaleCSS(name: string, scale: ColorScale): string {
  let css = '';
  for (const step of colorSteps) {
    css += `  --color-${name}-${step}: ${scale[step]};\n`;
  }
  return css;
}

/**
 * Generate CSS for all primitive colors
 */
function generatePrimitivesCSS(brand: Brand): string {
  let css = '  /* Base Colors */\n';
  css += `  --color-white: ${baseColors.white};\n`;
  css += `  --color-black: ${baseColors.black};\n`;
  css += `  --color-transparent: ${baseColors.transparent};\n\n`;

  css += '  /* Gray (Light Mode) */\n';
  css += generateColorScaleCSS('gray', grayLight);
  css += '\n';

  css += '  /* Primary Brand */\n';
  css += generateColorScaleCSS('primary', brand.primary);
  css += '\n';

  css += '  /* Secondary Brand */\n';
  css += generateColorScaleCSS('secondary', brand.secondary);
  css += '\n';

  css += '  /* Error */\n';
  css += generateColorScaleCSS('error', statusColors.error);
  css += '\n';

  css += '  /* Warning */\n';
  css += generateColorScaleCSS('warning', statusColors.warning);
  css += '\n';

  css += '  /* Success */\n';
  css += generateColorScaleCSS('success', statusColors.success);
  css += '\n';

  css += '  /* Info */\n';
  css += generateColorScaleCSS('info', statusColors.info);

  return css;
}

/**
 * Generate CSS for semantic tokens (light mode)
 */
function generateSemanticLightCSS(brand: Brand): string {
  let css = '';
  
  for (const category of semanticCategories) {
    css += `\n  /* ${category.name} */\n`;
    for (const token of category.tokens) {
      const value = resolveColorRef(token.light, brand, false);
      // For tokens that reference primitives, use CSS var
      if (token.light.includes('-') && !token.light.startsWith('#')) {
        const varRef = `var(--color-${token.light})`;
        css += `  --${token.name}: ${varRef};\n`;
      } else {
        css += `  --${token.name}: ${value};\n`;
      }
    }
  }

  return css;
}

/**
 * Generate CSS for semantic tokens (dark mode)
 */
function generateSemanticDarkCSS(brand: Brand): string {
  let css = '';
  
  for (const category of semanticCategories) {
    css += `\n  /* ${category.name} */\n`;
    for (const token of category.tokens) {
      const value = resolveColorRef(token.dark, brand, true);
      // For tokens that reference primitives, use CSS var
      if (token.dark.includes('-') && !token.dark.startsWith('#')) {
        const varRef = `var(--color-${token.dark})`;
        css += `  --${token.name}: ${varRef};\n`;
      } else {
        css += `  --${token.name}: ${value};\n`;
      }
    }
  }

  return css;
}

/**
 * Generate dark mode gray overrides
 */
function generateDarkGrayCSS(): string {
  let css = '  /* Gray (Dark Mode) */\n';
  css += generateColorScaleCSS('gray', grayDark);
  return css;
}

/**
 * Generate complete CSS output
 */
export function generateCSS(options: GeneratorOptions = {}): GeneratedOutput {
  const brand = options.brandId ? brands[options.brandId] : defaultBrand;
  const includeSemantics = options.includeSemantics !== false;
  
  let content = generateHeader('CSS Custom Properties');
  
  // Root (light mode)
  content += ':root {\n';
  content += generatePrimitivesCSS(brand);
  
  if (includeSemantics) {
    content += generateSemanticLightCSS(brand);
  }
  
  content += '}\n\n';

  // Dark mode
  content += '[data-theme="dark"],\n.dark {\n';
  content += generateDarkGrayCSS();
  
  if (includeSemantics) {
    content += generateSemanticDarkCSS(brand);
  }
  
  content += '}\n\n';

  // Prefers dark color scheme
  content += '@media (prefers-color-scheme: dark) {\n';
  content += '  :root:not([data-theme="light"]) {\n';
  content += generateDarkGrayCSS().split('\n').map(line => '  ' + line).join('\n');
  
  if (includeSemantics) {
    content += generateSemanticDarkCSS(brand).split('\n').map(line => '  ' + line).join('\n');
  }
  
  content += '  }\n';
  content += '}\n';

  return {
    format: 'css',
    filename: `tokens${options.brandId ? `-${options.brandId}` : ''}.css`,
    content,
  };
}

