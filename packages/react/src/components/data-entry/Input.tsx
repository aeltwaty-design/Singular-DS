import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

const inputVariants = cva(
  'flex w-full rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: 'border-neutral-200 dark:border-neutral-700',
        error: 'border-red-500 dark:border-red-500 focus:ring-red-500',
        success: 'border-green-500 dark:border-green-500 focus:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const effectiveState = errorText ? 'error' : state;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ size, state: effectiveState }),
              leftIcon && 'ps-10',
              rightIcon && 'pe-10',
              className
            )}
            style={{
              '--tw-ring-color': effectiveState === 'default' ? brandColors.primary : undefined,
            } as React.CSSProperties}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              errorText ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
