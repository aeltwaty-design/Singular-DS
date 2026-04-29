'use client';

import { forwardRef, HTMLAttributes, Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '@/lib/utils';

/**
 * ButtonGroup Component
 * 
 * Groups related buttons together with consistent spacing and styling.
 * - Orientation: horizontal or vertical layout
 * - Attached: removes gaps and joins buttons together (for segmented controls)
 * - Size: optionally pass a consistent size to all child buttons
 * - Gap: control spacing between buttons (none, sm, md, lg)
 */

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout direction of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Join buttons together without gaps (for segmented controls) */
  attached?: boolean;
  /** Size to apply to all child buttons */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Gap between buttons when not attached */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /** Make all buttons full width (useful for vertical mobile layouts) */
  fullWidth?: boolean;
}

// Gap size mappings
const gapSizes = {
  none: 'gap-0',
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    className, 
    orientation = 'horizontal', 
    attached = false, 
    size,
    gap = 'md',
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    const childArray = Children.toArray(children);

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'inline-flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          // Attached styles with RTL support
          attached && orientation === 'horizontal' && [
            '[&>*:not(:first-child)]:rounded-s-none',
            '[&>*:not(:last-child)]:rounded-e-none',
            '[&>*:not(:first-child)]:border-s-0',
          ],
          attached && orientation === 'vertical' && [
            '[&>*:not(:first-child)]:rounded-t-none',
            '[&>*:not(:last-child)]:rounded-b-none',
            '[&>*:not(:first-child)]:border-t-0',
          ],
          // Gap when not attached
          !attached && gapSizes[gap],
          // Full width support
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {childArray.map((child, index) => {
          if (isValidElement(child)) {
            // Clone child with optional size and fullWidth props
            const additionalProps: Record<string, unknown> = { key: index };
            
            if (size) {
              additionalProps.size = size;
            }
            
            if (fullWidth) {
              additionalProps.fullWidth = true;
            }
            
            return cloneElement(child as ReactElement, additionalProps);
          }
          return child;
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
