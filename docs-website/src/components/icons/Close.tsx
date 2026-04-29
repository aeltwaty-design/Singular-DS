'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { Add } from 'iconsax-react';
import { cn } from '@/lib/utils';

/**
 * Close Icon Component
 * 
 * A close/dismiss icon that wraps the Iconsax Add icon with a 45-degree rotation.
 * Supports all 6 Iconsax variants: Linear, Bold, Outline, TwoTone, Bulk, Broken.
 * 
 * Figma Reference:
 * - Source: https://www.figma.com/design/Wqm0Jky2RapOUbZE7pYE6B/Singular--V1.0.0-?node-id=17-79840
 * 
 * @example
 * ```tsx
 * <Close size={24} variant="Linear" />
 * <Close size={20} variant="Bold" color="#D12030" />
 * ```
 */

export type CloseVariant = 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken';

export interface CloseProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Icon size in pixels */
  size?: number | string;
  /** Icon color (defaults to currentColor) */
  color?: string;
  /** Icon variant style */
  variant?: CloseVariant;
}

export const Close = forwardRef<HTMLSpanElement, CloseProps>(
  (
    {
      size = 24,
      color = 'currentColor',
      variant = 'Linear',
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          transform: 'rotate(45deg)',
          width: typeof size === 'number' ? size : undefined,
          height: typeof size === 'number' ? size : undefined,
          ...style,
        }}
        {...props}
      >
        <Add
          size={size}
          color={color}
          variant={variant}
        />
      </span>
    );
  }
);

Close.displayName = 'Close';

export default Close;
