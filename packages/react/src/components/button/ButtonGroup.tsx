import { forwardRef, HTMLAttributes, Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

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
          !attached && gapSizes[gap],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {childArray.map((child, index) => {
          if (isValidElement(child)) {
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
