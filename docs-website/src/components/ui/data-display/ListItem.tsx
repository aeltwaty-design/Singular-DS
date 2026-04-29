'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import { ArrowRight2 } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { IconContainer } from './IconContainer';

// Import design tokens
import { grayLight, grayDark } from '@/tokens/primitives/colors';

/**
 * ListItem Component
 * 
 * A versatile list item component for displaying content in lists.
 * Based on Figma design specifications from Singular Design System.
 * 
 * Variants from Figma:
 * - Size: sm (Small - 14px title), md (Medium - 16px title)
 * - Theme: widget (with card background, border, radius), full (no wrapper styling)
 * - Leading: icon (IconContainer), image (square image), none
 * - Trailing: none, icon (chevron), tag, text, hyperlink
 * - State: enabled, disabled
 * 
 * Design Token Mapping:
 * - Background: bgSurface (white/slate-800)
 * - Border: borderWeak (#f1f3f9/slate-800)
 * - Title: textPrimary, titleSmall (sm) / titleMedium (md)
 * - Description: textSecondary, bodySmall (sm) / bodyMedium (md)
 * - Padding: s.md (12px) vertical, s.lg (16px) horizontal
 * - Gap: s.md (12px) between elements
 * - Radius: r.lg (16px) for widget theme
 */

const listItemVariants = cva(
  'flex items-center gap-3 transition-colors w-full',
  {
    variants: {
      size: {
        sm: 'py-3 px-4',
        md: 'py-3 px-4',
      },
      theme: {
        widget: 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl',
        full: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      theme: 'widget',
    },
  }
);

// Title text sizes based on component size
const titleSizes = {
  sm: 'text-sm font-medium',
  md: 'text-base font-medium',
} as const;

// Description text sizes based on component size
const descriptionSizes = {
  sm: 'text-xs',
  md: 'text-sm',
} as const;

// Icon sizes for trailing icon
const trailingIconSizes = {
  sm: 'w-5 h-5',
  md: 'w-5 h-5',
} as const;

// Leading image sizes
const leadingImageSizes = {
  sm: 'w-10 h-10',
  md: 'w-10 h-10',
} as const;

export type ListItemSize = 'sm' | 'md';
export type ListItemTheme = 'widget' | 'full';
export type ListItemLeading = 'icon' | 'image' | 'none';
export type ListItemTrailing = 'none' | 'icon' | 'tag' | 'text' | 'hyperlink';

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof listItemVariants> {
  /** Main title text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Leading content type */
  leading?: ListItemLeading;
  /** Custom icon for leading slot (when leading='icon') */
  leadingIcon?: ReactNode;
  /** Image URL for leading slot (when leading='image') */
  leadingImage?: string;
  /** Trailing content type */
  trailing?: ListItemTrailing;
  /** Content for trailing slot (tag, text, or hyperlink content) */
  trailingContent?: ReactNode | string;
  /** Callback when trailing element is clicked */
  onTrailingClick?: () => void;
  /** Whether the list item is disabled */
  disabled?: boolean;
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      title,
      description,
      size = 'sm',
      theme = 'widget',
      leading = 'icon',
      leadingIcon,
      leadingImage,
      trailing = 'none',
      trailingContent,
      onTrailingClick,
      disabled = false,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const colors = useMemo(() => ({
      textPrimary: isDark ? gray[50] : '#111317',
      textSecondary: isDark ? gray[300] : '#40444c',
      textDisabled: isDark ? gray[500] : '#96a0b6',
      brandPrimary: isDark ? '#1AD997' : '#00CE8B',
    }), [isDark, gray]);

    const titleSizeClass = titleSizes[size || 'sm'];
    const descriptionSizeClass = descriptionSizes[size || 'sm'];
    const trailingIconSizeClass = trailingIconSizes[size || 'sm'];
    const leadingImageSizeClass = leadingImageSizes[size || 'sm'];

    const effectiveTextColor = disabled ? colors.textDisabled : colors.textPrimary;
    const effectiveSecondaryColor = disabled ? colors.textDisabled : colors.textSecondary;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    };

    const handleTrailingClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onTrailingClick) {
        onTrailingClick();
      }
    };

    // Render leading content
    const renderLeading = () => {
      if (leading === 'none') return null;

      if (leading === 'image' && leadingImage) {
        return (
          <div className={cn('shrink-0 rounded-lg overflow-hidden', leadingImageSizeClass)}>
            <img
              src={leadingImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        );
      }

      // Default to icon
      return (
        <IconContainer
          icon={leadingIcon || <div className="w-5 h-5" />}
          size="md"
          shape="square"
          status={disabled ? 'disabled' : 'info'}
        />
      );
    };

    // Render trailing content
    const renderTrailing = () => {
      if (trailing === 'none') return null;

      if (trailing === 'icon') {
        return (
          <div
            className={cn(
              'shrink-0 flex items-center justify-center',
              trailingIconSizeClass,
              !disabled && onClick && 'cursor-pointer'
            )}
            style={{ color: effectiveSecondaryColor }}
          >
            <ArrowRight2 variant="Linear" className="w-full h-full rtl:rotate-180" />
          </div>
        );
      }

      if (trailing === 'tag' && trailingContent) {
        return (
          <div className="shrink-0">
            {trailingContent}
          </div>
        );
      }

      if (trailing === 'text' && trailingContent) {
        return (
          <span
            className="shrink-0 text-sm"
            style={{ color: effectiveSecondaryColor }}
          >
            {trailingContent}
          </span>
        );
      }

      if (trailing === 'hyperlink' && trailingContent) {
        return (
          <button
            type="button"
            onClick={handleTrailingClick}
            disabled={disabled}
            className={cn(
              'shrink-0 text-sm font-medium transition-colors',
              disabled ? 'cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'
            )}
            style={{ color: disabled ? colors.textDisabled : colors.brandPrimary }}
          >
            {trailingContent}
          </button>
        );
      }

      return null;
    };

    return (
      <div
        ref={ref}
        className={cn(
          listItemVariants({ size, theme }),
          disabled && 'opacity-60 cursor-not-allowed',
          !disabled && onClick && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50',
          className
        )}
        onClick={handleClick}
        style={style}
        {...props}
      >
        {/* Leading content */}
        {renderLeading()}

        {/* Content area */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span
            className={cn('truncate', titleSizeClass)}
            style={{ color: effectiveTextColor }}
          >
            {title}
          </span>
          {description && (
            <span
              className={cn('truncate', descriptionSizeClass)}
              style={{ color: effectiveSecondaryColor }}
            >
              {description}
            </span>
          )}
        </div>

        {/* Trailing content */}
        {renderTrailing()}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;

