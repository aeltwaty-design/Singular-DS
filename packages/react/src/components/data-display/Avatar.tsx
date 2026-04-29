'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { useDir } from '../../providers/SingularProvider';
import { User } from 'iconsax-react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'square' | 'circle';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-14 h-14',
        '2xl': 'w-16 h-16',
      },
      shape: {
        circle: 'rounded-full',
        square: '',
      },
    },
    compoundVariants: [
      { shape: 'square', size: 'xs', className: 'rounded' },
      { shape: 'square', size: 'sm', className: 'rounded' },
      { shape: 'square', size: 'md', className: 'rounded-md' },
      { shape: 'square', size: 'lg', className: 'rounded-lg' },
      { shape: 'square', size: 'xl', className: 'rounded-xl' },
      { shape: 'square', size: '2xl', className: 'rounded-xl' },
    ],
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);

const iconSizes: Record<AvatarSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
};

const textSizes: Record<AvatarSize, string> = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
};

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  showPlaceholder?: boolean;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    size = 'md', 
    shape = 'circle', 
    src, 
    alt, 
    fallback, 
    showPlaceholder = true,
    ...props 
  }, ref) => {
    const getInitials = (text?: string) => {
      if (!text) return '';
      return text
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = getInitials(fallback || alt);
    const currentSize = size || 'md';

    const renderContent = () => {
      if (src) {
        return (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
          />
        );
      }

      if (initials) {
        return (
          <span className={cn('font-medium text-neutral-600 dark:text-neutral-300', textSizes[currentSize])}>
            {initials}
          </span>
        );
      }

      if (showPlaceholder) {
        return (
          <User
            size={iconSizes[currentSize]}
            variant="Bold"
            className="text-neutral-500 dark:text-neutral-400"
          />
        );
      }

      return null;
    };

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, shape }),
          'bg-slate-100 dark:bg-slate-800',
          className
        )}
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ============================================================================
// AvatarGroup
// ============================================================================

export type AvatarGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarGroupSize;
  showTrailingText?: boolean;
  trailingText?: string;
  trailingTextAr?: string;
  children: ReactNode;
}

const groupIndicatorSizes: Record<AvatarGroupSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-lg',
};

const overlapValues: Record<AvatarGroupSize, string> = {
  xs: '-ml-1.5 rtl:ml-0 rtl:-mr-1.5',
  sm: '-ml-2 rtl:ml-0 rtl:-mr-2',
  md: '-ml-2.5 rtl:ml-0 rtl:-mr-2.5',
  lg: '-ml-3 rtl:ml-0 rtl:-mr-3',
  xl: '-ml-3.5 rtl:ml-0 rtl:-mr-3.5',
};

const trailingGaps: Record<AvatarGroupSize, string> = {
  xs: 'gap-2',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-3',
  xl: 'gap-3',
};

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    className, 
    max = 4, 
    size = 'md',
    showTrailingText = false,
    trailingText,
    trailingTextAr,
    children, 
    ...props 
  }, ref) => {
    const { isRTL } = useDir();
    
    const childArray = Children.toArray(children).filter(isValidElement);
    const visibleAvatars = childArray.slice(0, max);
    const remainingCount = Math.max(0, childArray.length - max);

    const clonedAvatars = visibleAvatars.map((child, index) => {
      if (isValidElement<AvatarProps>(child)) {
        return cloneElement(child, {
          ...child.props,
          size: size as AvatarSize,
          key: index,
        });
      }
      return child;
    });

    const displayText = isRTL ? (trailingTextAr || trailingText) : trailingText;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          isRTL ? 'flex-row-reverse' : 'flex-row',
          showTrailingText && trailingGaps[size],
          className
        )}
        {...props}
      >
        <div className={cn('flex items-center', isRTL ? 'flex-row-reverse' : 'flex-row')}>
          {clonedAvatars.map((child, index) => (
            <div 
              key={index} 
              className={cn(
                'ring-2 ring-white dark:ring-neutral-950',
                index > 0 && overlapValues[size],
                'rounded-full'
              )}
            >
              {child}
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div
              className={cn(
                'flex items-center justify-center font-medium rounded-full',
                'ring-2 ring-white dark:ring-neutral-950',
                'bg-slate-100 dark:bg-slate-800',
                'text-neutral-600 dark:text-neutral-300',
                'border border-slate-200 dark:border-slate-700',
                groupIndicatorSizes[size],
                overlapValues[size]
              )}
            >
              +{remainingCount}
            </div>
          )}
        </div>

        {showTrailingText && displayText && (
          <span className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            {displayText}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
