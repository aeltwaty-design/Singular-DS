'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

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
      { orientation: 'horizontal', size: 'sm', className: 'h-px' },
      { orientation: 'horizontal', size: 'lg', className: 'h-1' },
      { orientation: 'vertical', size: 'sm', className: 'w-px' },
      { orientation: 'vertical', size: 'lg', className: 'w-1' },
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
