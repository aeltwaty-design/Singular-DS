'use client';

import { ColorSwatch } from './ColorSwatch';
import type { ColorScale } from '@/tokens/types';

export interface ColorPaletteSectionProps {
  title: string;
  colors: Record<string | number, string> | ColorScale;
  originStep?: string | number;
  showContrastRatio?: boolean;
  columns?: number;
}

export function ColorPaletteSection({
  title,
  colors,
  originStep = '500',
  showContrastRatio = true,
  columns,
}: ColorPaletteSectionProps) {
  const colorEntries = Object.entries(colors);
  
  // Determine grid columns based on number of colors or explicit setting
  const gridCols = columns || (colorEntries.length <= 3 ? 3 : 12);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      <div
        className={`grid gap-2 pt-6`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(gridCols, colorEntries.length)}, minmax(0, 1fr))`,
        }}
      >
        {colorEntries.map(([step, color]) => (
          <ColorSwatch
            key={step}
            color={color}
            name={title}
            step={step}
            isOrigin={step === String(originStep)}
            showContrastRatio={showContrastRatio}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Responsive version with Tailwind breakpoints
 */
export function ColorPaletteSectionResponsive({
  title,
  colors,
  originStep = '500',
  showContrastRatio = true,
}: ColorPaletteSectionProps) {
  const colorEntries = Object.entries(colors);
  const isSmallPalette = colorEntries.length <= 3;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      <div
        className={`grid gap-2 pt-6 ${
          isSmallPalette
            ? 'grid-cols-3'
            : 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-12'
        }`}
      >
        {colorEntries.map(([step, color]) => (
          <ColorSwatch
            key={step}
            color={color}
            name={title}
            step={step}
            isOrigin={step === String(originStep)}
            showContrastRatio={showContrastRatio}
          />
        ))}
      </div>
    </div>
  );
}

