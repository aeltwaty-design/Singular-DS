import { forwardRef, HTMLAttributes, ReactNode, Children } from 'react';
import { cn } from '../../utils/cn';
import { Separator } from '../data-display/Separator';

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'one' | 'two';
  container?: boolean;
  showSeparator?: boolean;
  orientation?: 'horizontal' | 'vertical';
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
    const childrenArray = Children.toArray(children).filter(Boolean);
    const firstButton = childrenArray[0];
    const secondButton = childrenArray[1];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex flex-col items-stretch',
          container && [
            'bg-white dark:bg-neutral-800',
            'border border-neutral-200 dark:border-neutral-700',
            'rounded-2xl',
            orientation === 'vertical' ? 'px-4 pb-4 pt-0' : 'px-4 py-4',
          ],
          orientation === 'vertical' ? 'gap-3' : 'gap-4',
          className
        )}
        {...props}
      >
        {container && showSeparator && (
          <Separator />
        )}

        <div
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row items-center gap-3' : 'flex-col items-stretch gap-3',
            orientation === 'horizontal' && 'w-full'
          )}
        >
          {firstButton && (
            <div className={cn(
              orientation === 'horizontal' && type === 'two' ? 'flex-1' : 'w-full'
            )}>
              {firstButton}
            </div>
          )}

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
