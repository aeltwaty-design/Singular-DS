'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

// Import design tokens
import { grayLight, grayDark } from '@/tokens/primitives/colors';

/**
 * InfoSection Component
 * 
 * A container component for grouping InfoItem components with consistent layout.
 * Based on Figma design specifications from Singular Design System.
 * 
 * Design Token Mapping (from Figma):
 * - Border: border/subtle (#f1f3f9) = borderWeak
 * 
 * Spacing (from Figma):
 * - Items gap (horizontal): 48px (sectionLg)
 * - Items gap (vertical): 24px (xxl)
 * - Container padding: 24px (desktop) / 16px (mobile)
 * - Container radius: 16px (lg)
 */

const infoSectionVariants = cva(
  'flex relative',
  {
    variants: {
      layout: {
        horizontal: 'flex-row items-center gap-12',
        vertical: 'flex-col gap-6',
      },
      container: {
        true: 'border rounded-2xl',
        false: '',
      },
    },
    compoundVariants: [
      // Container with horizontal layout
      { container: true, layout: 'horizontal', className: 'p-6' },
      // Container with vertical layout
      { container: true, layout: 'vertical', className: 'p-4' },
    ],
    defaultVariants: {
      layout: 'horizontal',
      container: false,
    },
  }
);

export type InfoSectionLayout = 'horizontal' | 'vertical';

export interface InfoSectionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoSectionVariants> {
  /** The InfoItem children to display */
  children: ReactNode;
  /** Show separator between items (only applies to horizontal layout) */
  showSeparators?: boolean;
}

export const InfoSection = forwardRef<HTMLDivElement, InfoSectionProps>(
  (
    {
      className,
      children,
      layout = 'horizontal',
      container = false,
      showSeparators = true,
      style,
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
    const borderColor = isDark ? gray[800] : '#f1f3f9';

    // Process children to add separators in horizontal layout
    const processedChildren = (() => {
      const childArray = Children.toArray(children);
      
      if (layout === 'vertical' || !showSeparators) {
        return children;
      }

      // For horizontal layout with separators, clone children and add showSeparator prop
      // except for the last item
      return childArray.map((child, index) => {
        if (isValidElement(child)) {
          const isLast = index === childArray.length - 1;
          return cloneElement(child as React.ReactElement<{ showSeparator?: boolean }>, {
            showSeparator: !isLast && showSeparators,
          });
        }
        return child;
      });
    })();

    return (
      <div
        ref={ref}
        className={cn(
          infoSectionVariants({ layout, container }),
          isArabic ? 'flex-row-reverse' : '',
          className
        )}
        style={{
          borderColor: container ? borderColor : undefined,
          ...style,
        }}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

InfoSection.displayName = 'InfoSection';

export default InfoSection;

