'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Gallery } from 'iconsax-react';

/**
 * ImageContainer Component
 * 
 * A container for displaying images with optional text labels.
 * Supports two types (Primary/Secondary) and two text positions (In/Out).
 * 
 * Design Token Mapping (from Figma):
 * - Primary: white background with subtle border
 * - Secondary: neutral/gray background
 * - Text Position In: text inside container below 2:1 image
 * - Text Position Out: image in padded square container, text below
 * - Container width: 122px (standard), flexible
 * - Border radius: 8px (r.sm)
 * - Padding: 4px horizontal, 8px vertical for "In" | 6px for "Out" cover
 * - Gap: 8px between image and text
 */

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
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Text label to display */
  label?: string;
  /** Whether to show the text label */
  showText?: boolean;
  /** Custom placeholder element */
  placeholder?: ReactNode;
  /** Width of the container */
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
    // Default placeholder with Iconsax Gallery icon
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

    // Text Position: In - image at 2:1 ratio inside container
    if (textPosition === 'in') {
      return (
        <div
          ref={ref}
          className={cn(imageContainerVariants({ type, textPosition }), className)}
          style={{ width, ...style }}
          {...props}
        >
          {/* 2:1 aspect ratio image area */}
          <div className="w-full aspect-[2/1] rounded-lg overflow-hidden">
            {imageContent}
          </div>
          
          {/* Text label */}
          {showText && label && (
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100 text-center leading-normal flex-1 min-h-[1px] w-full flex items-center justify-center">
              {label}
            </span>
          )}
        </div>
      );
    }

    // Text Position: Out - square image in padded cover, text below
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center gap-2', className)}
        style={{ width, ...style }}
        {...props}
      >
        {/* Padded cover container */}
        <div className={cn(coverVariants({ type }), 'p-1.5 w-full')}>
          {/* Square image */}
          <div className="w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0">
            {imageContent}
          </div>
        </div>
        
        {/* Text label below */}
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

