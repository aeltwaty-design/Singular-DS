'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ListView Component
 * 
 * A wrapper component for organizing ListItem components with consistent spacing.
 * Based on Figma design specifications from Singular Design System.
 * 
 * The ListView arranges its children (typically ListItem components) in a vertical
 * stack with configurable gap spacing.
 */

const listViewVariants = cva(
  'flex flex-col w-full',
  {
    variants: {
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    defaultVariants: {
      gap: 'sm',
    },
  }
);

export type ListViewGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export interface ListViewProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listViewVariants> {
  /** ListItem components to render */
  children: ReactNode;
}

export const ListView = forwardRef<HTMLDivElement, ListViewProps>(
  (
    {
      className,
      children,
      gap = 'sm',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(listViewVariants({ gap }), className)}
        role="list"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ListView.displayName = 'ListView';

export default ListView;

