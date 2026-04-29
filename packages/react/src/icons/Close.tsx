import { forwardRef, type HTMLAttributes } from 'react';

export type CloseVariant = 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken';

export interface CloseProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: number | string;
  color?: string;
  variant?: CloseVariant;
}

export const Close = forwardRef<HTMLSpanElement, CloseProps>(
  ({ size = 24, color = 'currentColor', variant = 'Linear', className, style, ...props }, ref) => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) || 24 : size;
    const strokeWidth = variant === 'Bold' || variant === 'Bulk' ? 2.5 : 2;

    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: numSize,
          height: numSize,
          ...style,
        }}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={numSize}
          height={numSize}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </span>
    );
  }
);

Close.displayName = 'Close';

export default Close;
