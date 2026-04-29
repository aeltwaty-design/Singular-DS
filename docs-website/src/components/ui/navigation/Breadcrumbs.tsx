'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { Home2 } from 'iconsax-react';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const tokens = {
  colors: {
    // Text colors
    textCurrent: 'text-neutral-900 dark:text-white', // Current/active item
    textDefault: 'text-neutral-500 dark:text-neutral-400', // Non-current items
    textHover: 'text-neutral-700 dark:text-neutral-300', // Hover state
    // Separator
    separator: 'text-neutral-300 dark:text-neutral-600',
  },
  spacing: {
    desktop: 'gap-3', // 12px
    mobile: 'gap-2', // 8px
  },
  typography: {
    base: 'text-base font-medium leading-[1.5]', // 16px, 500 weight
  },
  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-200 dark:focus-visible:ring-purple-800',
    shadow: 'focus-visible:shadow-[0px_0px_0px_4px_rgba(244,235,255,1)] dark:focus-visible:shadow-[0px_0px_0px_4px_rgba(107,70,193,0.3)]',
  },
};

// ============================================================================
// TYPES
// ============================================================================

export interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** Optional href - if not provided, item is not clickable */
  href?: string;
  /** Optional icon to show before label */
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Responsive variant - desktop shows full trail, mobile shows collapsed */
  variant?: 'desktop' | 'mobile';
  /** Maximum items to show before collapsing (only for mobile variant) */
  maxItems?: number;
  /** Custom separator element */
  separator?: ReactNode;
  /** Show home icon at the start */
  showHomeIcon?: boolean;
  /** Home icon href */
  homeHref?: string;
}

// ============================================================================
// BREADCRUMB SEPARATOR
// ============================================================================

const BreadcrumbSeparator = ({ className }: { className?: string }) => (
  <span
    className={cn(
      'flex items-center justify-center w-5 h-5 select-none',
      tokens.colors.separator,
      className
    )}
    aria-hidden="true"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 5L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

// ============================================================================
// BREADCRUMB ELLIPSIS
// ============================================================================

const BreadcrumbEllipsis = ({ className }: { className?: string }) => (
  <span
    className={cn(
      tokens.typography.base,
      tokens.colors.textDefault,
      'px-1',
      className
    )}
    aria-hidden="true"
  >
    ...
  </span>
);

// ============================================================================
// BREADCRUMB ITEM
// ============================================================================

interface BreadcrumbItemComponentProps {
  item: BreadcrumbItem;
  isLast: boolean;
  brandPrimary: string;
}

const BreadcrumbItemComponent = ({
  item,
  isLast,
  brandPrimary,
}: BreadcrumbItemComponentProps) => {
  const baseClasses = cn(
    tokens.typography.base,
    'flex items-center gap-1 transition-colors duration-200 rounded-sm',
    tokens.focus.ring
  );

  const hoverClasses = 'hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer';

  // Current/last item - styled with brand color (no hover)
  if (isLast) {
    return (
      <span
        className={cn(baseClasses, 'cursor-default')}
        style={{ color: brandPrimary }}
        aria-current="page"
      >
        {item.icon}
        <span>{item.label}</span>
      </span>
    );
  }

  // Clickable link item (navigates)
  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          baseClasses,
          tokens.colors.textDefault,
          hoverClasses
        )}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  }

  // Non-clickable item (still shows hover state for visual feedback)
  return (
    <span className={cn(baseClasses, tokens.colors.textDefault, hoverClasses)}>
      {item.icon}
      <span>{item.label}</span>
    </span>
  );
};

// ============================================================================
// BREADCRUMBS COMPONENT
// ============================================================================

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      items,
      variant = 'desktop',
      maxItems = 2,
      separator,
      showHomeIcon = false,
      homeHref = '/',
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    // Determine which items to display based on variant
    const displayItems = React.useMemo(() => {
      if (variant === 'desktop' || items.length <= maxItems + 1) {
        return { start: items, middle: null, end: [] };
      }

      // Mobile: show first item, ellipsis, and last maxItems-1 items
      const start = items.slice(0, 1);
      const end = items.slice(-(maxItems - 1));
      return { start, middle: '...', end };
    }, [items, variant, maxItems]);

    const renderSeparator = (key: string | number) => (
      <li key={`sep-${key}`} className="flex items-center" aria-hidden="true">
        {separator || <BreadcrumbSeparator />}
      </li>
    );

    const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => (
      <li key={index} className="flex items-center">
        <BreadcrumbItemComponent
          item={item}
          isLast={isLast}
          brandPrimary={brandColors.primary}
        />
      </li>
    );

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('', className)}
        {...props}
      >
        <ol
          className={cn(
            'flex items-center flex-wrap',
            variant === 'desktop' ? tokens.spacing.desktop : tokens.spacing.mobile
          )}
        >
          {/* Home Icon */}
          {showHomeIcon && (
            <>
              <li className="flex items-center">
                <Link
                  href={homeHref}
                  className={cn(
                    'flex items-center justify-center p-1 rounded-sm transition-colors duration-200',
                    tokens.colors.textDefault,
                    'hover:text-neutral-700 dark:hover:text-neutral-300',
                    tokens.focus.ring
                  )}
                  aria-label="Home"
                >
                  <Home2 size={20} variant="Linear" />
                </Link>
              </li>
              {renderSeparator('home')}
            </>
          )}

          {/* Start Items */}
          {displayItems.start.map((item, index) => {
            const isLast =
              !displayItems.middle && displayItems.end.length === 0 && index === displayItems.start.length - 1;
            return (
              <React.Fragment key={`start-${index}`}>
                {index > 0 && renderSeparator(`start-${index}`)}
                {renderItem(item, index, isLast)}
              </React.Fragment>
            );
          })}

          {/* Ellipsis for collapsed items */}
          {displayItems.middle && (
            <>
              {renderSeparator('ellipsis-before')}
              <li className="flex items-center">
                <BreadcrumbEllipsis />
              </li>
            </>
          )}

          {/* End Items (for mobile collapsed view) */}
          {displayItems.end.map((item, index) => {
            const isLast = index === displayItems.end.length - 1;
            return (
              <React.Fragment key={`end-${index}`}>
                {renderSeparator(`end-${index}`)}
                {renderItem(item, index + displayItems.start.length + 1, isLast)}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
