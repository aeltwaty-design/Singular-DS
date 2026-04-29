'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

/**
 * Badge Component
 * 
 * A small status indicator component used to display counts, labels, or notifications.
 * Supports multiple sizes, colors, and adapts to single vs multi-digit content.
 * 
 * Design Token Mapping:
 * - Size:
 *   - sm: 16px height, text-xs (12px)
 *   - lg: auto height, text-xs (12px)
 * - Padding:
 *   - sm + singleDigit: px-1 (4px)
 *   - sm + multiDigit: px-1.5 (6px)
 *   - lg + singleDigit: px-1.5 (6px)
 *   - lg + multiDigit: px-2 (8px)
 * - Radius: full (pill shape)
 */

const badgeVariants = cva(
  'inline-flex items-center justify-center font-normal text-xs leading-[1.5] rounded-full transition-colors text-center',
  {
    variants: {
      size: {
        sm: 'h-4', // 16px
        lg: '', // auto height
      },
      color: {
        red: 'bg-red-500 text-white',
        green: 'bg-emerald-500 text-slate-900 dark:text-slate-900',
        blue: '', // Brand primary - handled dynamically
        'blue-light': '', // Brand primary light - handled dynamically
        grey: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
      },
      singleDigit: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Small size padding
      { size: 'sm', singleDigit: true, className: 'px-1' }, // 4px
      { size: 'sm', singleDigit: false, className: 'px-1.5' }, // 6px
      // Large size padding
      { size: 'lg', singleDigit: true, className: 'px-1.5' }, // 6px
      { size: 'lg', singleDigit: false, className: 'px-2' }, // 8px
    ],
    defaultVariants: {
      size: 'lg',
      color: 'red',
      singleDigit: false,
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  /** The content to display - number or short text */
  value?: number | string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'lg', color = 'red', singleDigit, value, children, style, ...props }, ref) => {
    const { brandColors } = useBrand();

    // Determine content
    const content = value !== undefined ? value : children;
    
    // Auto-detect single digit if not explicitly set
    const isSingleDigit = singleDigit ?? (
      typeof content === 'number' 
        ? content < 10 
        : typeof content === 'string' 
          ? content.length === 1 
          : false
    );

    // Dynamic styles for brand colors
    const dynamicStyles: React.CSSProperties = { ...style };

    if (color === 'blue') {
      // Brand primary color with dark text
      dynamicStyles.backgroundColor = brandColors.primary;
      dynamicStyles.color = '#111317'; // textPrimary equivalent
    } else if (color === 'blue-light') {
      // Brand primary light background with brand text
      dynamicStyles.backgroundColor = `${brandColors.primary}20`; // 12% opacity
      dynamicStyles.color = brandColors.primary;
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ size, color, singleDigit: isSingleDigit }), className)}
        style={dynamicStyles}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
