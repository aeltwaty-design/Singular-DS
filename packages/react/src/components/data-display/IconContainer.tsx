'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

import { grayLight, grayDark, statusColors } from '../../tokens/primitives/colors';

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

const iconSizes = {
  '2xl': 'w-8 h-8',
  xl: 'w-8 h-8',
  lg: 'w-6 h-6',
  md: 'w-5 h-5',
  sm: 'w-4 h-4',
  xs: 'w-3 h-3',
} as const;

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
  icon: ReactNode;
  status?: IconContainerStatus;
  label?: string;
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
