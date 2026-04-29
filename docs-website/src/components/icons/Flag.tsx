'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface FlagProps extends HTMLAttributes<HTMLSpanElement> {
  code: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
}

// Size mappings
const sizeClasses = {
  sm: 'fi-sm',   // ~16px
  md: 'fi-md',   // ~24px  
  lg: 'fi-lg',   // ~32px
  xl: 'fi-xl',   // ~48px
};

// Custom size styles
const sizeStyles = {
  sm: { width: '21px', height: '15px' },
  md: { width: '28px', height: '20px' },
  lg: { width: '42px', height: '30px' },
  xl: { width: '56px', height: '40px' },
};

export function Flag({ 
  code, 
  size = 'md', 
  rounded = false,
  className,
  style,
  ...props 
}: FlagProps) {
  // Normalize code to lowercase for flag-icons
  const normalizedCode = code.toLowerCase();
  
  return (
    <span
      className={cn(
        'fi',
        `fi-${normalizedCode}`,
        rounded && 'fis',
        className
      )}
      style={{
        ...sizeStyles[size],
        display: 'inline-block',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: rounded ? '4px' : undefined,
        ...style,
      }}
      title={code.toUpperCase()}
      {...props}
    />
  );
}

// Available flag sizes
export const flagSizes = ['sm', 'md', 'lg', 'xl'] as const;
export type FlagSize = typeof flagSizes[number];

