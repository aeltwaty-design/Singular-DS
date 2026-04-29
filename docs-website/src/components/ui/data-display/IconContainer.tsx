'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import design tokens
import { grayLight, grayDark, statusColors } from '@/tokens/primitives/colors';

/**
 * IconContainer Component
 * 
 * A versatile container for displaying icons with various sizes, statuses, and shapes.
 * Based on Figma design specifications from Singular Design System.
 * 
 * Size mappings (from Figma):
 * - 2xl: container 56px, icon 32px, padding 12px, radius 12px
 * - xl: container 56px, icon 32px, padding 12px, radius 12px
 * - lg: container 48px, icon 24px, padding 12px, radius 12px
 * - md: container 40px, icon 20px, padding 10px, radius 8px
 * - sm: container 32px, icon 16px, padding 8px, radius 6px
 * - xs: container 24px, icon 12px, padding 6px, radius 4px
 * 
 * Status colors (from Figma):
 * - info: primary brand color (green for WalaPlus)
 * - gray: neutral gray
 * - danger: red
 * - warning: orange
 * - success: green (semantic success)
 * - disabled: muted gray
 */

const iconContainerVariants = cva(
  'inline-flex items-center justify-center shrink-0 transition-colors',
  {
    variants: {
      size: {
        '2xl': 'p-3',
        xl: 'p-3',
        lg: 'p-3',
        md: 'p-2.5',
        sm: 'p-2',
        xs: 'p-1.5',
      },
      shape: {
        square: '',
        circle: 'rounded-full',
      },
    },
    compoundVariants: [
      // Square radius variants based on size
      { size: '2xl', shape: 'square', className: 'rounded-xl' },
      { size: 'xl', shape: 'square', className: 'rounded-xl' },
      { size: 'lg', shape: 'square', className: 'rounded-xl' },
      { size: 'md', shape: 'square', className: 'rounded-lg' },
      { size: 'sm', shape: 'square', className: 'rounded-md' },
      { size: 'xs', shape: 'square', className: 'rounded' },
    ],
    defaultVariants: {
      size: 'md',
      shape: 'square',
    },
  }
);

// Icon size mappings
const iconSizes = {
  '2xl': 'w-8 h-8',
  xl: 'w-8 h-8',
  lg: 'w-6 h-6',
  md: 'w-5 h-5',
  sm: 'w-4 h-4',
  xs: 'w-3 h-3',
} as const;

// Label text sizes
const labelSizes = {
  '2xl': 'text-base',
  xl: 'text-base',
  lg: 'text-sm',
  md: 'text-sm',
  sm: 'text-sm',
  xs: 'text-xs',
} as const;

export type IconContainerStatus = 'info' | 'gray' | 'danger' | 'warning' | 'success' | 'disabled';
export type IconContainerSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type IconContainerShape = 'square' | 'circle';

export interface IconContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof iconContainerVariants> {
  /** The icon to display inside the container */
  icon: ReactNode;
  /** Status determines the color scheme */
  status?: IconContainerStatus;
  /** Optional label text below the container */
  label?: string;
  /** Disable label visibility even when label prop is provided */
  hideLabel?: boolean;
}

export const IconContainer = forwardRef<HTMLDivElement, IconContainerProps>(
  (
    {
      className,
      icon,
      size = 'md',
      shape = 'square',
      status = 'info',
      label,
      hideLabel = false,
      style,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    // Get brand primary colors from token system
    const brandPrimary = currentBrand?.primary || {
      25: '#E6FBF4',
      50: '#CCF7E9',
      100: '#99EFCC',
      200: '#66E7B8',
      300: '#33DEA3',
      400: '#1AD997',
      500: '#00CE8B',
      600: '#00B87D',
      700: '#009B69',
      800: '#007D55',
      900: '#005F41',
      950: '#003D2A',
    };

    // Color tokens from Figma analysis
    const statusColorTokens = useMemo(() => ({
      info: {
        bg: isDark ? `${brandPrimary[500]}20` : brandPrimary[50] || '#E6FBF4',
        icon: isDark ? brandPrimary[400] : brandPrimary[500] || '#00CE8B',
        text: isDark ? gray[50] : gray[900],
      },
      gray: {
        bg: isDark ? gray[800] : '#f4f6fc',
        icon: isDark ? gray[300] : gray[900],
        text: isDark ? gray[50] : gray[900],
      },
      danger: {
        bg: isDark ? `${statusColors.error[500]}20` : '#fae9ea',
        icon: isDark ? statusColors.error[400] : '#D12030',
        text: isDark ? gray[50] : gray[900],
      },
      warning: {
        bg: isDark ? `${statusColors.warning[500]}20` : '#fff0e6',
        icon: isDark ? statusColors.warning[400] : '#FF6608',
        text: isDark ? gray[50] : gray[900],
      },
      success: {
        bg: isDark ? `${statusColors.success[500]}20` : '#e6faf3',
        icon: isDark ? statusColors.success[400] : '#00CE8B',
        text: isDark ? gray[50] : gray[900],
      },
      disabled: {
        bg: isDark ? gray[800] : '#f1f3f9',
        icon: isDark ? gray[500] : '#96a0b6',
        text: isDark ? gray[500] : '#96a0b6',
      },
    }), [isDark, brandPrimary, gray]);

    const colors = statusColorTokens[status];
    const iconSizeClass = iconSizes[size || 'md'];
    const labelSizeClass = labelSizes[size || 'md'];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex flex-col items-center gap-1',
          className
        )}
        {...props}
      >
        <div
          className={cn(iconContainerVariants({ size, shape }))}
          style={{
            backgroundColor: colors.bg,
            ...style,
          }}
        >
          <span
            className={cn(
              'inline-flex items-center justify-center',
              iconSizeClass
            )}
            style={{ color: colors.icon }}
          >
            {icon}
          </span>
        </div>
        {label && !hideLabel && (
          <span
            className={cn(
              'text-center leading-relaxed',
              labelSizeClass
            )}
            style={{ color: colors.text }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

IconContainer.displayName = 'IconContainer';

export default IconContainer;

