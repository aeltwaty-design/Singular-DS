'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { cn, copyToClipboard, isLightColor } from '@/lib/utils';
import { getContrastRatio, getWCAGRating } from '@/lib/accessibility';

export interface ColorSwatchProps {
  color: string;
  name: string;
  step: string;
  isOrigin?: boolean;
  showContrastRatio?: boolean;
  contrastAgainst?: string;
}

export function ColorSwatch({
  color,
  name,
  step,
  isOrigin = false,
  showContrastRatio = true,
  contrastAgainst = '#FFFFFF',
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const isLight = isLightColor(color);

  // Calculate contrast ratio against specified color (default: white)
  const contrastRatio = getContrastRatio(color, contrastAgainst);
  const wcag = getWCAGRating(contrastRatio);

  const handleCopy = async () => {
    const success = await copyToClipboard(color);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn('flex flex-col', isOrigin && 'relative')}>
      {/* Origin indicator arrow */}
      {isOrigin && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className="text-neutral-900 dark:text-white"
          >
            <path d="M6 8L0 0H12L6 8Z" fill="currentColor" />
          </svg>
        </div>
      )}

      {/* Color swatch */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCopy}
        className={cn(
          'group relative w-full aspect-[4/3] rounded-lg overflow-hidden transition-shadow hover:shadow-lg',
          isOrigin &&
            'ring-2 ring-neutral-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-neutral-900'
        )}
        style={{ backgroundColor: color }}
      >
        {/* Contrast ratio badge */}
        {showContrastRatio && (
          <div className="absolute inset-0 flex items-center justify-center">
            {wcag.label ? (
              <span
                className={cn(
                  'text-xs font-medium',
                  isLight ? 'text-neutral-800' : 'text-white'
                )}
              >
                {wcag.label} {wcag.score}
              </span>
            ) : (
              <span
                className={cn(
                  'text-xs font-medium',
                  isLight ? 'text-neutral-600' : 'text-white/70'
                )}
              >
                {wcag.score}
              </span>
            )}
          </div>
        )}

        {/* Copy indicator on hover */}
        <div
          className={cn(
            'absolute top-1 right-1 p-1 rounded transition-opacity',
            'opacity-0 group-hover:opacity-100',
            isLight ? 'bg-black/10' : 'bg-white/10'
          )}
        >
          {copied ? (
            <Check
              className={cn('w-3 h-3', isLight ? 'text-green-600' : 'text-green-400')}
            />
          ) : (
            <Copy className={cn('w-3 h-3', isLight ? 'text-neutral-700' : 'text-white')} />
          )}
        </div>
      </motion.button>

      {/* Step number */}
      <span className="mt-2 text-xs font-medium text-neutral-900 dark:text-white">
        {step}
      </span>

      {/* Hex code */}
      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
        {color}
      </span>
    </div>
  );
}

