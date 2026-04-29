'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Gallery } from 'iconsax-react';

export type ImageContainerType = 'primary' | 'secondary';
export type ImageContainerTextPosition = 'in' | 'out';

const imageContainerVariants = cva(
  'flex flex-col items-center overflow-hidden rounded-lg transition-colors',
  {
    variants: {
      type: {
        primary: 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800',
        secondary: 'bg-slate-100 dark:bg-slate-800',
      },
      textPosition: {
        in: 'gap-2 px-1 py-2',
        out: 'gap-2',
      },
    },
    defaultVariants: {
      type: 'secondary',
      textPosition: 'in',
    },
  }
);

const coverVariants = cva(
  'w-full shrink-0 rounded-lg overflow-hidden flex items-center justify-center',
  {
    variants: {
      type: {
        primary: 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800',
        secondary: 'bg-slate-100 dark:bg-slate-800',
      },
    },
    defaultVariants: {
      type: 'secondary',
    },
  }
);

export interface ImageContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof imageContainerVariants> {
  src?: string;
  alt?: string;
  label?: string;
  showText?: boolean;
  placeholder?: ReactNode;
  width?: number | string;
}

export const ImageContainer = forwardRef<HTMLDivElement, ImageContainerProps>(
  (
    {
      className,
      type = 'secondary',
      textPosition = 'in',
      src,
      alt = '',
      label,
      showText = true,
      placeholder,
      width = 122,
      style,
      ...props
    },
    ref
  ) => {
    const defaultPlaceholder = (
      <div className="flex items-center justify-center w-full h-full bg-slate-200 dark:bg-slate-700">
        <Gallery size={32} className="text-slate-400 dark:text-slate-500" variant="Bold" />
      </div>
    );

    const imageContent = src ? (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    ) : (
      placeholder || defaultPlaceholder
    );

    if (textPosition === 'in') {
      return (
        <div
          ref={ref}
          className={cn(imageContainerVariants({ type, textPosition }), className)}
          style={{ width, ...style }}
          {...props}
        >
          <div className="w-full aspect-[2/1] rounded-lg overflow-hidden">
            {imageContent}
          </div>
          
          {showText && label && (
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100 text-center leading-normal flex-1 min-h-[1px] w-full flex items-center justify-center">
              {label}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center gap-2', className)}
        style={{ width, ...style }}
        {...props}
      >
        <div className={cn(coverVariants({ type }), 'p-1.5 w-full')}>
          <div className="w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0">
            {imageContent}
          </div>
        </div>
        
        {showText && label && (
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100 text-center leading-normal whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    );
  }
);

ImageContainer.displayName = 'ImageContainer';

export default ImageContainer;
