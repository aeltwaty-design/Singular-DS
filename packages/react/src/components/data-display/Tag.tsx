'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '../../providers/SingularProvider';
import { Close } from '../../icons';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

import { grayLight, grayDark, statusColors } from '../../tokens/primitives/colors';

const tagVariants = cva(
  'inline-flex items-center justify-center gap-1 font-medium transition-colors rounded-full',
  {
    variants: {
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
} as const;

export type TagStatus = 'default' | 'gray' | 'danger' | 'warning' | 'success' | 'info' | 'disabled';
export type TagType = 'primary' | 'secondary';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof tagVariants> {
  children: ReactNode;
  type?: TagType;
  status?: TagStatus;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      children,
      size = 'sm',
      type = 'secondary',
      status = 'default',
      leadingIcon,
      trailingIcon,
      removable = false,
      onRemove,
      disabled = false,
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

    const colorTokens = useMemo(() => {
      const isPrimary = type === 'primary';
      
      return {
        default: {
          bg: isPrimary 
            ? (isDark ? brandPrimary[600] : brandPrimary[500])
            : (isDark ? `${brandPrimary[500]}20` : '#e6faf3'),
          text: isPrimary 
            ? (isDark ? gray[50] : gray[900])
            : (isDark ? brandPrimary[400] : '#00714c'),
          iconColor: isPrimary 
            ? (isDark ? gray[50] : gray[900])
            : (isDark ? brandPrimary[400] : '#00714c'),
        },
        gray: {
          bg: isDark ? gray[800] : '#f4f6fc',
          text: isDark ? gray[50] : gray[900],
          iconColor: isDark ? gray[300] : gray[700],
        },
        danger: {
          bg: isPrimary
            ? (isDark ? statusColors.error[600] : statusColors.error[500])
            : (isDark ? `${statusColors.error[500]}20` : '#fae9ea'),
          text: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.error[400] : '#941722'),
          iconColor: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.error[400] : '#941722'),
        },
        warning: {
          bg: isPrimary
            ? (isDark ? statusColors.warning[600] : statusColors.warning[500])
            : (isDark ? `${statusColors.warning[500]}20` : '#fff0e6'),
          text: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.warning[400] : '#8c3804'),
          iconColor: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.warning[400] : '#8c3804'),
        },
        success: {
          bg: isPrimary
            ? (isDark ? statusColors.success[600] : statusColors.success[500])
            : (isDark ? `${statusColors.success[500]}20` : '#e6faf3'),
          text: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.success[400] : '#00714c'),
          iconColor: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.success[400] : '#00714c'),
        },
        info: {
          bg: isPrimary
            ? (isDark ? statusColors.info[600] : statusColors.info[500])
            : (isDark ? `${statusColors.info[500]}20` : '#e6eeff'),
          text: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.info[400] : '#0057ff'),
          iconColor: isPrimary
            ? '#FFFFFF'
            : (isDark ? statusColors.info[400] : '#0057ff'),
        },
        disabled: {
          bg: isDark ? gray[800] : '#f1f3f9',
          text: isDark ? gray[500] : '#96a0b6',
          iconColor: isDark ? gray[500] : '#96a0b6',
        },
      };
    }, [type, isDark, brandPrimary, gray]);

    const effectiveStatus = disabled ? 'disabled' : status;
    const colors = colorTokens[effectiveStatus];
    const iconSizeClass = iconSizes[size || 'sm'];

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove();
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ size }),
          disabled && 'cursor-not-allowed opacity-60',
          className
        )}
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          ...style,
        }}
        {...props}
      >
        {leadingIcon && (
          <span
            className={cn('inline-flex items-center justify-center shrink-0', iconSizeClass)}
            style={{ color: colors.iconColor }}
          >
            {leadingIcon}
          </span>
        )}
        
        <span>{children}</span>
        
        {trailingIcon && !removable && (
          <span
            className={cn('inline-flex items-center justify-center shrink-0', iconSizeClass)}
            style={{ color: colors.iconColor }}
          >
            {trailingIcon}
          </span>
        )}
        
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              'inline-flex items-center justify-center shrink-0 rounded-full transition-opacity',
              iconSizeClass,
              disabled ? 'cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
            )}
            style={{ color: colors.iconColor }}
            aria-label="Remove tag"
          >
            <Close variant="Bold" className="w-full h-full" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
