/**
 * Singular Design System - Tailwind CSS Preset
 * 
 * Consumers should merge this preset into their Tailwind config:
 * 
 * // tailwind.config.ts
 * import singularPreset from '@singular/react/tailwind-preset';
 * export default {
 *   presets: [singularPreset],
 *   content: ['./node_modules/@singular/react/src/**/*.{ts,tsx}'],
 * }
 */
const singularPreset = {
  theme: {
    extend: {
      colors: {
        // These map to CSS custom properties set by SingularProvider
        brand: {
          primary: 'var(--singular-brand-primary)',
          secondary: 'var(--singular-brand-secondary)',
        },
      },
    },
  },
};

export default singularPreset;
