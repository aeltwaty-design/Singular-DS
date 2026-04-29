'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { useDir } from '../../providers/SingularProvider';
import { InfoCircle } from 'iconsax-react';
import { cn } from '../../utils/cn';
import { IconContainer } from './IconContainer';

import { grayLight, grayDark } from '../../tokens/primitives/colors';

export interface InfoItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  description: string;
  titleAr?: string;
  descriptionAr?: string;
  showIcon?: boolean;
  icon?: ReactNode;
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
    const { isRTL } = useDir();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const colors = useMemo(() => ({
      title: isDark ? gray[400] : '#626c83',
      description: isDark ? gray[50] : '#111317',
      separator: isDark ? gray[800] : '#f1f3f9',
    }), [isDark, gray]);

    const displayTitle = isRTL && titleAr ? titleAr : title;
    const displayDescription = isRTL && descriptionAr ? descriptionAr : description;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4',
          isRTL ? 'items-end' : 'items-start',
          className
        )}
        {...props}
      >
        {showIcon && (
          <IconContainer
            size="xs"
            shape="square"
            status="info"
            icon={icon || <InfoCircle size={12} variant="Bold" />}
            hideLabel
          />
        )}

        <div
          className={cn(
            'flex items-start shrink-0',
            showSeparator ? 'gap-4' : '',
            isRTL ? 'flex-row-reverse' : ''
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-1 leading-relaxed',
              isRTL ? 'items-end text-right' : 'items-start text-left'
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
