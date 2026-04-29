'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { InfoCircle } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { IconContainer } from './IconContainer';

// Import design tokens
import { grayLight, grayDark } from '@/tokens/primitives/colors';

/**
 * InfoItem Component
 * 
 * A single title/description pair for displaying key-value information.
 * Based on Figma design specifications from Singular Design System.
 * 
 * Design Token Mapping (from Figma):
 * - Title: text/tertiary (#626c83) = textSecondary
 * - Description: text/primary (#111317) = textPrimary
 * - Separator: border/subtle (#f1f3f9) = borderWeak
 * - Icon bg: bg/neutral/primary (#f4f6fc) = bgSurfaceSoft
 * - Icon color: brand primary (#00CE8B) = brandPrimary
 * 
 * Spacing (from Figma):
 * - Content gap: 16px (lg)
 * - Title-description gap: 4px (xs)
 * - Icon padding: 6px (sm)
 * - Icon radius: 4px (xs)
 * - Separator: 1px width, 48px height
 */

export interface InfoItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main title/label text */
  title: string;
  /** Description/value text */
  description: string;
  /** Arabic title for RTL support */
  titleAr?: string;
  /** Arabic description for RTL support */
  descriptionAr?: string;
  /** Show leading icon */
  showIcon?: boolean;
  /** Custom icon to display (defaults to InfoCircle) */
  icon?: ReactNode;
  /** Show vertical separator line */
  showSeparator?: boolean;
}

export const InfoItem = forwardRef<HTMLDivElement, InfoItemProps>(
  (
    {
      className,
      title,
      description,
      titleAr,
      descriptionAr,
      showIcon = false,
      icon,
      showSeparator = false,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const locale = useLocale();
    const isDark = resolvedTheme === 'dark';
    const isArabic = locale === 'ar';
    const gray = isDark ? grayDark : grayLight;

    // Color tokens from Figma
    const colors = useMemo(() => ({
      title: isDark ? gray[400] : '#626c83',
      description: isDark ? gray[50] : '#111317',
      separator: isDark ? gray[800] : '#f1f3f9',
    }), [isDark, gray]);

    const displayTitle = isArabic && titleAr ? titleAr : title;
    const displayDescription = isArabic && descriptionAr ? descriptionAr : description;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4',
          isArabic ? 'items-end' : 'items-start',
          className
        )}
        {...props}
      >
        {/* Icon using IconContainer - above text, aligned with text direction */}
        {showIcon && (
          <IconContainer
            size="xs"
            shape="square"
            status="info"
            icon={icon || <InfoCircle size={12} variant="Bold" />}
            hideLabel
          />
        )}

        {/* Content wrapper with separator */}
        <div
          className={cn(
            'flex items-start shrink-0',
            showSeparator ? 'gap-4' : '',
            isArabic ? 'flex-row-reverse' : ''
          )}
        >
          {/* Text content */}
          <div
            className={cn(
              'flex flex-col gap-1 leading-relaxed',
              isArabic ? 'items-end text-right' : 'items-start text-left'
            )}
          >
            <p
              className="text-sm font-normal"
              style={{ color: colors.title }}
            >
              {displayTitle}
            </p>
            <p
              className="text-base font-medium"
              style={{ color: colors.description }}
            >
              {displayDescription}
            </p>
          </div>

          {/* Separator */}
          {showSeparator && (
            <div
              className="w-px h-12 rounded-sm shrink-0"
              style={{ backgroundColor: colors.separator }}
            />
          )}
        </div>
      </div>
    );
  }
);

InfoItem.displayName = 'InfoItem';

export default InfoItem;

