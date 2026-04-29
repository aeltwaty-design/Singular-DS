/**
 * JSON Token Generator (Style Dictionary Format)
 */

import type { GeneratorOptions, GeneratedOutput, Brand, ColorScale } from '../types';
import { grayLight, grayDark, statusColors, baseColors } from '../primitives/colors';
import { brands, defaultBrand, brandIds } from '../brands';
import { semanticCategories } from '../semantic';
import { colorSteps, resolveColorRef, formatTimestamp } from './utils';

/**
 * Style Dictionary token format
 */
interface StyleDictionaryToken {
  value: string;
  type: string;
  description?: string;
}

/**
 * Generate color scale in Style Dictionary format
 */
function generateColorScaleSD(scale: ColorScale): Record<string, StyleDictionaryToken> {
  const tokens: Record<string, StyleDictionaryToken> = {};
  for (const step of colorSteps) {
    tokens[step.toString()] = {
      value: scale[step],
      type: 'color',
    };
  }
  return tokens;
}

/**
 * Generate brand colors in Style Dictionary format
 */
function generateBrandSD(brand: Brand): Record<string, unknown> {
  return {
    primary: generateColorScaleSD(brand.primary),
    secondary: generateColorScaleSD(brand.secondary),
  };
}

/**
 * Generate semantic tokens in Style Dictionary format
 */
function generateSemanticSD(brand: Brand, isDark: boolean): Record<string, Record<string, StyleDictionaryToken>> {
  const mode = isDark ? 'dark' : 'light';
  const tokens: Record<string, Record<string, StyleDictionaryToken>> = {};
  
  for (const category of semanticCategories) {
    tokens[category.id] = {};
    for (const token of category.tokens) {
      const ref = isDark ? token.dark : token.light;
      const value = resolveColorRef(ref, brand, isDark);
      const tokenName = token.name.replace(`${category.id}-`, '');
      
      tokens[category.id][tokenName] = {
        value,
        type: 'color',
        description: token.description,
      };
    }
  }
  
  return tokens;
}

/**
 * Generate complete JSON output (Style Dictionary format)
 */
export function generateJSON(options: GeneratorOptions = {}): GeneratedOutput {
  const brand = options.brandId ? brands[options.brandId] : defaultBrand;
  const includeSemantics = options.includeSemantics !== false;
  const timestamp = formatTimestamp();
  
  const output: Record<string, unknown> = {
    $metadata: {
      generator: 'Singular Design System',
      version: '1.0.0',
      generated: timestamp,
      brand: options.brandId || 'default',
    },
    color: {
      base: {
        white: {
          value: baseColors.white,
          type: 'color',
        },
        black: {
          value: baseColors.black,
          type: 'color',
        },
        transparent: {
          value: baseColors.transparent,
          type: 'color',
        },
      },
      gray: {
        light: generateColorScaleSD(grayLight),
        dark: generateColorScaleSD(grayDark),
      },
      status: {
        error: generateColorScaleSD(statusColors.error),
        warning: generateColorScaleSD(statusColors.warning),
        success: generateColorScaleSD(statusColors.success),
        info: generateColorScaleSD(statusColors.info),
      },
      brand: {} as Record<string, Record<string, unknown>>,
    },
  };

  // Add all brand colors
  for (const brandId of brandIds) {
    (output.color as Record<string, unknown>).brand = {
      ...((output.color as Record<string, unknown>).brand as Record<string, unknown>),
      [brandId]: generateBrandSD(brands[brandId]),
    };
  }

  // Add semantic tokens
  if (includeSemantics) {
    output.semantic = {
      light: generateSemanticSD(brand, false),
      dark: generateSemanticSD(brand, true),
    };
  }

  const content = JSON.stringify(output, null, 2);

  return {
    format: 'json',
    filename: `tokens${options.brandId ? `-${options.brandId}` : ''}.json`,
    content,
  };
}

/**
 * Generate Design Tokens Community Group (DTCG) format
 * @see https://tr.designtokens.org/format/
 */
export function generateDTCG(options: GeneratorOptions = {}): GeneratedOutput {
  const brand = options.brandId ? brands[options.brandId] : defaultBrand;
  const includeSemantics = options.includeSemantics !== false;
  const timestamp = formatTimestamp();
  
  const generateDTCGColor = (hex: string) => ({
    $value: hex,
    $type: 'color',
  });

  const generateDTCGScale = (scale: ColorScale) => {
    const tokens: Record<string, unknown> = {};
    for (const step of colorSteps) {
      tokens[step.toString()] = generateDTCGColor(scale[step]);
    }
    return tokens;
  };

  const output: Record<string, unknown> = {
    $schema: 'https://tr.designtokens.org/format/',
    $metadata: {
      generator: 'Singular Design System',
      version: '1.0.0',
      generated: timestamp,
    },
    color: {
      base: {
        white: generateDTCGColor(baseColors.white),
        black: generateDTCGColor(baseColors.black),
      },
      gray: {
        light: generateDTCGScale(grayLight),
        dark: generateDTCGScale(grayDark),
      },
      error: generateDTCGScale(statusColors.error),
      warning: generateDTCGScale(statusColors.warning),
      success: generateDTCGScale(statusColors.success),
      info: generateDTCGScale(statusColors.info),
      primary: generateDTCGScale(brand.primary),
      secondary: generateDTCGScale(brand.secondary),
    },
  };

  // Add semantic tokens
  if (includeSemantics) {
    const semanticLight: Record<string, Record<string, unknown>> = {};
    const semanticDark: Record<string, Record<string, unknown>> = {};

    for (const category of semanticCategories) {
      semanticLight[category.id] = {};
      semanticDark[category.id] = {};

      for (const token of category.tokens) {
        const tokenName = token.name.replace(`${category.id}-`, '').replace(/-/g, '_');
        const lightValue = resolveColorRef(token.light, brand, false);
        const darkValue = resolveColorRef(token.dark, brand, true);

        semanticLight[category.id][tokenName] = {
          $value: lightValue,
          $type: 'color',
          $description: token.description,
        };
        semanticDark[category.id][tokenName] = {
          $value: darkValue,
          $type: 'color',
          $description: token.description,
        };
      }
    }

    output.semantic = {
      light: semanticLight,
      dark: semanticDark,
    };
  }

  const content = JSON.stringify(output, null, 2);

  return {
    format: 'json',
    filename: `tokens.dtcg${options.brandId ? `-${options.brandId}` : ''}.json`,
    content,
  };
}

