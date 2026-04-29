'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '../../providers/SingularProvider';
import { useDir } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';

import { grayLight, grayDark } from '../../tokens/primitives/colors';

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
      { container: true, layout: 'horizontal', className: 'p-6' },
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
  children: ReactNode;
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
    const { isRTL } = useDir();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const borderColor = isDark ? gray[800] : '#f1f3f9';

    const processedChildren = (() => {
      const childArray = Children.toArray(children);
      
      if (layout === 'vertical' || !showSeparators) {
        return children;
      }

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
          isRTL ? 'flex-row-reverse' : '',
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
