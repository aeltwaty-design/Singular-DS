'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

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
      { size: 'sm', singleDigit: true, className: 'px-1' },
      { size: 'sm', singleDigit: false, className: 'px-1.5' },
      { size: 'lg', singleDigit: true, className: 'px-1.5' },
      { size: 'lg', singleDigit: false, className: 'px-2' },
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
  value?: number | string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'lg', color = 'red', singleDigit, value, children, style, ...props }, ref) => {
    const { brandColors } = useBrand();

    const content = value !== undefined ? value : children;
    
    const isSingleDigit = singleDigit ?? (
      typeof content === 'number' 
        ? content < 10 
        : typeof content === 'string' 
          ? content.length === 1 
          : false
    );

    const dynamicStyles: React.CSSProperties = { ...style };

    if (color === 'blue') {
      dynamicStyles.backgroundColor = brandColors.primary;
      dynamicStyles.color = '#111317';
    } else if (color === 'blue-light') {
      dynamicStyles.backgroundColor = `${brandColors.primary}20`;
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
