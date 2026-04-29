'use client';

import { forwardRef, HTMLAttributes, ReactNode, Children } from 'react';
import { cn } from '@/lib/utils';

// Import Separator atom for composition compliance
import { Separator } from '../data-display/Separator';

/**
 * Dock Component
 * 
 * A container component for button configurations matching Figma variants.
 * Supports one or two buttons, container styling, separator, and orientation.
 */

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of buttons: 'one' or 'two' */
  type?: 'one' | 'two';
  /** Whether to show container background and border */
  container?: boolean;
  /** Whether to show separator line at top (only when container is true) */
  showSeparator?: boolean;
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Button components to render */
  children: ReactNode;
}

export const Dock = forwardRef<HTMLDivElement, DockProps>(
  ({ 
    className, 
    type = 'one',
    container = true,
    showSeparator = true,
    orientation = 'vertical',
    children,
    ...props 
  }, ref) => {
    // Convert children to array and filter
    const childrenArray = Children.toArray(children).filter(Boolean);
    const firstButton = childrenArray[0];
    const secondButton = childrenArray[1];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex flex-col items-stretch',
          // Container styling
          container && [
            'bg-white dark:bg-neutral-800',
            'border border-neutral-200 dark:border-neutral-700',
            'rounded-2xl',
            orientation === 'vertical' ? 'px-4 pb-4 pt-0' : 'px-4 py-4',
          ],
          // Gap based on orientation
          orientation === 'vertical' ? 'gap-3' : 'gap-4',
          className
        )}
        {...props}
      >
        {/* Separator - Using Separator atom for composition compliance */}
        {container && showSeparator && (
          <Separator />
        )}

        {/* Button wrapper */}
        <div
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row items-center gap-3' : 'flex-col items-stretch gap-3',
            orientation === 'horizontal' && 'w-full'
          )}
        >
          {/* First Button */}
          {firstButton && (
            <div className={cn(
              orientation === 'horizontal' && type === 'two' ? 'flex-1' : 'w-full'
            )}>
              {firstButton}
            </div>
          )}

          {/* Second Button - only if type is 'two' */}
          {type === 'two' && secondButton && (
            <div className={cn(
              orientation === 'horizontal' ? 'flex-1' : 'w-full'
            )}>
              {secondButton}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Dock.displayName = 'Dock';

export default Dock;
