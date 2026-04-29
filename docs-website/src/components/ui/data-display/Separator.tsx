'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Separator Component
 * 
 * A visual divider for separating content sections.
 * Supports horizontal and vertical orientations with two size options.
 * 
 * Design Token Mapping (from Figma):
 * - Color: border/subtle (#f1f3f9) = borderWeak token
 * - Size sm: 1px thickness
 * - Size lg: 4px thickness
 */

export type SeparatorSize = 'sm' | 'lg';
export type SeparatorOrientation = 'horizontal' | 'vertical';

const separatorVariants = cva(
  'shrink-0 bg-slate-100 dark:bg-slate-800',
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full',
      },
      size: {
        sm: '',
        lg: '',
      },
    },
    compoundVariants: [
      // Horizontal variants
      { orientation: 'horizontal', size: 'sm', className: 'h-px' },
      { orientation: 'horizontal', size: 'lg', className: 'h-1' }, // 4px
      // Vertical variants
      { orientation: 'vertical', size: 'sm', className: 'w-px' },
      { orientation: 'vertical', size: 'lg', className: 'w-1' }, // 4px
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'sm',
    },
  }
);

export interface SeparatorProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /** Whether the separator is purely decorative (no semantic meaning) */
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      size = 'sm',
      decorative = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(separatorVariants({ orientation, size }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export default Separator;
