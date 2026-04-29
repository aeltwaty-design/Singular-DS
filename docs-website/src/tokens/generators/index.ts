/**
 * Token Generator Exports
 */

import type { GeneratorOptions, GeneratedOutput, ExportFormat } from '../types';
import { generateCSS } from './css';
import { generateTailwind, generateTailwindTS } from './tailwind';
import { generateFlutter } from './flutter';
import { generateJSON, generateDTCG } from './json';

// Re-export individual generators
export { generateCSS } from './css';
export { generateTailwind, generateTailwindTS } from './tailwind';
export { generateFlutter } from './flutter';
export { generateJSON, generateDTCG } from './json';

// Re-export utilities
export {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  colorSteps,
  cssVar,
  generateColorScaleVars,
  resolveColorRef,
  formatTimestamp,
  generateHeader,
} from './utils';

/**
 * Generator registry
 */
const generators: Record<ExportFormat, (options: GeneratorOptions) => GeneratedOutput> = {
  css: generateCSS,
  tailwind: generateTailwind,
  flutter: generateFlutter,
  json: generateJSON,
};

/**
 * Generate tokens in a specific format
 */
export function generateFormat(
  format: ExportFormat,
  options: GeneratorOptions = {}
): GeneratedOutput {
  const generator = generators[format];
  if (!generator) {
    throw new Error(`Unknown format: ${format}`);
  }
  return generator(options);
}

/**
 * Generate tokens in all supported formats
 */
export function generateAllFormats(options: GeneratorOptions = {}): GeneratedOutput[] {
  return [
    generateCSS(options),
    generateTailwind(options),
    generateTailwindTS(options),
    generateFlutter(options),
    generateJSON(options),
    generateDTCG(options),
  ];
}

/**
 * Get all supported export formats
 */
export function getSupportedFormats(): ExportFormat[] {
  return Object.keys(generators) as ExportFormat[];
}

/**
 * Format metadata
 */
export const formatInfo: Record<ExportFormat, { name: string; extension: string; description: string }> = {
  css: {
    name: 'CSS Custom Properties',
    extension: '.css',
    description: 'CSS variables for web projects',
  },
  tailwind: {
    name: 'Tailwind CSS',
    extension: '.js',
    description: 'Tailwind CSS configuration',
  },
  flutter: {
    name: 'Flutter/Dart',
    extension: '.dart',
    description: 'Dart theme classes for Flutter',
  },
  json: {
    name: 'JSON (Style Dictionary)',
    extension: '.json',
    description: 'Style Dictionary compatible JSON',
  },
};

