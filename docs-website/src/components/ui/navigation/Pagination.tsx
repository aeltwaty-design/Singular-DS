'use client';

import React, { forwardRef, HTMLAttributes, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { ArrowLeft2, ArrowRight2, ArrowDown2 } from 'iconsax-react';

// ============================================================================
// DESIGN TOKENS (Based on Figma specs)
// ============================================================================

const tokens = {
  // Container
  container: {
    gap: 'gap-4', // 16px between sections
    padding: 'px-0',
  },

  // Page button sizes
  button: {
    lg: {
      size: 'w-10 h-10', // 40px
      text: 'text-sm font-medium',
      iconSize: 20,
      radius: 'rounded-lg', // 8px
    },
    sm: {
      size: 'w-8 h-8', // 32px
      text: 'text-xs font-medium',
      iconSize: 16,
      radius: 'rounded-md', // 6px
    },
  },

  // Nav button (arrows)
  navButton: {
    lg: {
      size: 'w-10 h-10', // 40px
      iconSize: 20,
      radius: 'rounded-lg',
    },
    sm: {
      size: 'w-8 h-8', // 32px
      iconSize: 16,
      radius: 'rounded-md',
    },
  },

  // Gaps
  gap: {
    pages: 'gap-1', // 4px between page buttons
    sections: 'gap-4', // 16px between major sections
    info: 'gap-2', // 8px between info elements
  },

  // Style variants
  styles: {
    filled: {
      default: {
        bg: 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700',
        text: 'text-neutral-700 dark:text-neutral-300',
        border: '',
      },
      active: {
        text: 'text-white',
      },
      disabled: {
        bg: 'bg-neutral-50 dark:bg-neutral-900',
        text: 'text-neutral-300 dark:text-neutral-600',
        border: '',
      },
    },
    outlined: {
      default: {
        bg: 'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
        text: 'text-neutral-700 dark:text-neutral-300',
        border: 'border border-neutral-200 dark:border-neutral-700',
      },
      active: {
        text: 'text-white',
      },
      disabled: {
        bg: 'bg-transparent',
        text: 'text-neutral-300 dark:text-neutral-600',
        border: 'border border-neutral-100 dark:border-neutral-800',
      },
    },
  },

  // Colors
  colors: {
    ellipsis: 'text-neutral-400 dark:text-neutral-500',
    info: 'text-neutral-500 dark:text-neutral-400',
    infoBold: 'text-neutral-700 dark:text-neutral-200',
  },

  // Per page dropdown
  dropdown: {
    lg: {
      height: 'h-10', // 40px
      padding: 'px-3',
      text: 'text-sm',
      radius: 'rounded-lg',
      iconSize: 16,
    },
    sm: {
      height: 'h-8', // 32px
      padding: 'px-2.5',
      text: 'text-xs',
      radius: 'rounded-md',
      iconSize: 14,
    },
  },

  // Typography
  typography: {
    lg: 'text-sm',
    sm: 'text-xs',
  },

  // Transitions
  transition: 'transition-all duration-200',
};

// ============================================================================
// TYPES
// ============================================================================

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Total number of records/items */
  totalRecords?: number;
  /** Items per page */
  itemsPerPage?: number;
  /** Available options for items per page */
  itemsPerPageOptions?: number[];
  /** Callback when items per page changes */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Show records count info (e.g., "1-10 of 100") */
  showRecordsInfo?: boolean;
  /** Show items per page selector */
  showItemsPerPage?: boolean;
  /** Layout variant */
  variant?: 'numbers' | 'compact';
  /** Visual style - filled or outlined */
  buttonStyle?: 'filled' | 'outlined';
  /** Size of pagination buttons */
  size?: 'sm' | 'lg';
  /** Number of sibling pages to show on each side of current */
  siblingCount?: number;
  /** Always show first and last page */
  showFirstLast?: boolean;
  /** Disable all pagination controls */
  disabled?: boolean;
  /** Label for items per page (e.g., "Items per page", "Rows per page") */
  itemsPerPageLabel?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const ELLIPSIS = '...';

/**
 * Generate array of page numbers to display with ellipsis
 */
function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  showFirstLast: boolean
): (number | string)[] {
  const pages: (number | string)[] = [];

  // If total pages is small, show all
  if (totalPages <= 5 + siblingCount * 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Calculate range around current page
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  // Always show first page if showFirstLast
  if (showFirstLast) {
    pages.push(1);

    if (showLeftEllipsis) {
      pages.push(ELLIPSIS);
    } else if (leftSibling > 1) {
      for (let i = 2; i < leftSibling; i++) {
        pages.push(i);
      }
    }
  } else if (!showLeftEllipsis) {
    for (let i = 1; i < leftSibling; i++) {
      pages.push(i);
    }
  } else {
    pages.push(ELLIPSIS);
  }

  // Add sibling pages
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Always show last page if showFirstLast
  if (showFirstLast) {
    if (showRightEllipsis) {
      pages.push(ELLIPSIS);
    } else if (rightSibling < totalPages) {
      for (let i = rightSibling + 1; i < totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  } else if (!showRightEllipsis) {
    for (let i = rightSibling + 1; i <= totalPages; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
  } else {
    pages.push(ELLIPSIS);
  }

  return pages;
}

/**
 * Calculate record range for current page
 */
function getRecordRange(
  currentPage: number,
  itemsPerPage: number,
  totalRecords: number
): { start: number; end: number } {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalRecords);
  return { start, end };
}

// ============================================================================
// PAGE BUTTON COMPONENT
// ============================================================================

interface PageButtonProps {
  page: number;
  isActive: boolean;
  size: 'sm' | 'lg';
  buttonStyle: 'filled' | 'outlined';
  disabled: boolean;
  brandPrimary: string;
  onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  isActive,
  size,
  buttonStyle,
  disabled,
  brandPrimary,
  onClick,
}) => {
  const sizeTokens = tokens.button[size];
  const styleTokens = tokens.styles[buttonStyle];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center justify-center shrink-0',
        sizeTokens.size,
        sizeTokens.text,
        sizeTokens.radius,
        tokens.transition,
        isActive
          ? styleTokens.active.text
          : disabled
          ? cn(styleTokens.disabled.bg, styleTokens.disabled.text, styleTokens.disabled.border, 'cursor-not-allowed')
          : cn(styleTokens.default.bg, styleTokens.default.text, styleTokens.default.border, 'cursor-pointer')
      )}
      style={isActive ? { backgroundColor: brandPrimary, borderColor: brandPrimary } : {}}
    >
      {page}
    </button>
  );
};

// ============================================================================
// NAVIGATION BUTTON COMPONENT
// ============================================================================

interface NavButtonProps {
  direction: 'prev' | 'next';
  size: 'sm' | 'lg';
  buttonStyle: 'filled' | 'outlined';
  disabled: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  direction,
  size,
  buttonStyle,
  disabled,
  onClick,
}) => {
  const sizeTokens = tokens.navButton[size];
  const styleTokens = tokens.styles[buttonStyle];
  const Icon = direction === 'prev' ? ArrowLeft2 : ArrowRight2;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
      className={cn(
        'flex items-center justify-center shrink-0',
        sizeTokens.size,
        sizeTokens.radius,
        tokens.transition,
        disabled
          ? cn(styleTokens.disabled.bg, styleTokens.disabled.text, styleTokens.disabled.border, 'cursor-not-allowed')
          : cn(styleTokens.default.bg, styleTokens.default.text, styleTokens.default.border, 'cursor-pointer')
      )}
    >
      <Icon size={sizeTokens.iconSize} variant="Linear" />
    </button>
  );
};

// ============================================================================
// ELLIPSIS COMPONENT
// ============================================================================

interface EllipsisProps {
  size: 'sm' | 'lg';
}

const Ellipsis: React.FC<EllipsisProps> = ({ size }) => {
  const sizeTokens = tokens.button[size];

  return (
    <span
      className={cn(
        'flex items-center justify-center shrink-0',
        sizeTokens.size,
        sizeTokens.text,
        tokens.colors.ellipsis
      )}
      aria-hidden="true"
    >
      ...
    </span>
  );
};

// ============================================================================
// ITEMS PER PAGE DROPDOWN
// ============================================================================

interface ItemsPerPageDropdownProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  size: 'sm' | 'lg';
  disabled: boolean;
  label?: string;
}

const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  value,
  options,
  onChange,
  size,
  disabled,
  label,
}) => {
  const sizeTokens = tokens.dropdown[size];

  return (
    <div className={cn('flex items-center', tokens.gap.info)}>
      {label && (
        <span className={cn(tokens.typography[size], tokens.colors.info)}>
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            'appearance-none cursor-pointer',
            sizeTokens.height,
            sizeTokens.padding,
            'pe-8', // Space for arrow
            sizeTokens.text,
            sizeTokens.radius,
            tokens.transition,
            'border border-neutral-200 dark:border-neutral-700',
            'bg-white dark:bg-neutral-900',
            tokens.colors.infoBold,
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ArrowDown2
          size={sizeTokens.iconSize}
          variant="Linear"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 pointer-events-none',
            'end-2',
            tokens.colors.info
          )}
        />
      </div>
    </div>
  );
};

// ============================================================================
// RECORDS INFO COMPONENT
// ============================================================================

interface RecordsInfoProps {
  start: number;
  end: number;
  total: number;
  size: 'sm' | 'lg';
}

const RecordsInfo: React.FC<RecordsInfoProps> = ({ start, end, total, size }) => {
  return (
    <span className={cn(tokens.typography[size], tokens.colors.info)}>
      <span className={tokens.colors.infoBold}>{start}-{end}</span>
      {' '}of{' '}
      <span className={tokens.colors.infoBold}>{total}</span>
    </span>
  );
};

// ============================================================================
// MAIN PAGINATION COMPONENT
// ============================================================================

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      totalRecords,
      itemsPerPage = 10,
      itemsPerPageOptions = [10, 20, 50, 100],
      onItemsPerPageChange,
      showRecordsInfo = false,
      showItemsPerPage = false,
      variant = 'numbers',
      buttonStyle = 'filled',
      size = 'lg',
      siblingCount = 1,
      showFirstLast = true,
      disabled = false,
      itemsPerPageLabel,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const handlePrev = () => {
      if (!isFirstPage && !disabled) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (!isLastPage && !disabled) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number) => {
      if (!disabled && page !== currentPage) {
        onPageChange(page);
      }
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      if (onItemsPerPageChange && !disabled) {
        onItemsPerPageChange(newItemsPerPage);
      }
    };

    const pageNumbers = useMemo(
      () => generatePageNumbers(currentPage, totalPages, siblingCount, showFirstLast),
      [currentPage, totalPages, siblingCount, showFirstLast]
    );

    // Calculate record range
    const recordRange = useMemo(() => {
      if (totalRecords) {
        return getRecordRange(currentPage, itemsPerPage, totalRecords);
      }
      return null;
    }, [currentPage, itemsPerPage, totalRecords]);

    // Left section (records info)
    const leftSection = showRecordsInfo && recordRange && totalRecords ? (
      <RecordsInfo
        start={recordRange.start}
        end={recordRange.end}
        total={totalRecords}
        size={size}
      />
    ) : null;

    // Right section (items per page)
    const rightSection = showItemsPerPage && onItemsPerPageChange ? (
      <ItemsPerPageDropdown
        value={itemsPerPage}
        options={itemsPerPageOptions}
        onChange={handleItemsPerPageChange}
        size={size}
        disabled={disabled}
        label={itemsPerPageLabel}
      />
    ) : null;

    // Compact variant - simple prev/next with page info
    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-between w-full',
            tokens.gap.sections,
            className
          )}
          role="navigation"
          aria-label="Pagination"
          {...props}
        >
          {leftSection && <div className="flex items-center">{leftSection}</div>}
          
          <div className={cn('flex items-center', tokens.gap.info)}>
            <NavButton
              direction="prev"
              size={size}
              buttonStyle={buttonStyle}
              disabled={disabled || isFirstPage}
              onClick={handlePrev}
            />
            <span
              className={cn(
                'px-3',
                tokens.typography[size],
                tokens.colors.info
              )}
            >
              <span className={tokens.colors.infoBold}>{currentPage}</span>
              {' / '}
              <span className={tokens.colors.infoBold}>{totalPages}</span>
            </span>
            <NavButton
              direction="next"
              size={size}
              buttonStyle={buttonStyle}
              disabled={disabled || isLastPage}
              onClick={handleNext}
            />
          </div>

          {rightSection && <div className="flex items-center">{rightSection}</div>}
        </div>
      );
    }

    // Numbers variant - full page numbers with ellipsis
    const hasLeftOrRight = leftSection || rightSection;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          hasLeftOrRight ? 'justify-between w-full' : 'justify-center',
          tokens.gap.sections,
          className
        )}
        role="navigation"
        aria-label="Pagination"
        {...props}
      >
        {leftSection && <div className="flex items-center">{leftSection}</div>}

        <div className={cn('flex items-center', tokens.gap.pages)}>
          <NavButton
            direction="prev"
            size={size}
            buttonStyle={buttonStyle}
            disabled={disabled || isFirstPage}
            onClick={handlePrev}
          />

          {pageNumbers.map((item, index) => {
            if (item === ELLIPSIS) {
              return <Ellipsis key={`ellipsis-${index}`} size={size} />;
            }
            return (
              <PageButton
                key={item}
                page={item as number}
                isActive={item === currentPage}
                size={size}
                buttonStyle={buttonStyle}
                disabled={disabled}
                brandPrimary={brandColors.primary}
                onClick={() => handlePageClick(item as number)}
              />
            );
          })}

          <NavButton
            direction="next"
            size={size}
            buttonStyle={buttonStyle}
            disabled={disabled || isLastPage}
            onClick={handleNext}
          />
        </div>

        {rightSection && <div className="flex items-center">{rightSection}</div>}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
