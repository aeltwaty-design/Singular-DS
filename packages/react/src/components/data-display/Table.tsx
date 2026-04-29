'use client';

import React, { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode, useMemo, createContext, useContext, useState } from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { ArrowDown2, ArrowUp2, TickCircle, More, Document, SearchNormal1, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

import { grayLight, grayDark } from '../../tokens/primitives/colors';

const tokens = {
  headerCellHeight: 44,
  bodyCellHeight: 72,
  cellPaddingX: 24,
  cellPaddingY: 16,
  headerPaddingY: 12,
  gap: 12,
  borderSubtle: '#f1f3f9',
  borderSubtleDark: '#2a2d35',
  borderDefault: '#e2e6ee',
  borderInput: '#ccd2e0',
  bgStandard: '#ffffff',
  bgStandardDark: '#111317',
  bgNeutralPrimary: '#f4f6fc',
  bgHighlightLight: '#e6faf3',
  bgSuccessLight: '#e6faf3',
  textPrimary: '#111317',
  textSecondary: '#40444c',
  textQuadrant: '#96a0b6',
  textHighlightPrimary: '#00714c',
  textSuccessDefault: '#00714c',
  headerFontSize: 18,
  bodyFontSize: 16,
  tagFontSize: 12,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  fontWeightSemibold: 600,
  lineHeight: 1.5,
};

// =============================================================================
// Context
// =============================================================================

interface TableContextValue {
  isDark: boolean;
  gray: typeof grayLight;
  brandPrimary: Record<number, string>;
}

const TableContext = createContext<TableContextValue | null>(null);

const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table components must be used within a Table');
  }
  return context;
};

// =============================================================================
// Table Root
// =============================================================================

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, children, ...props }, ref) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const brandPrimary = currentBrand?.primary || {
      25: '#E6FBF4',
      50: '#CCF7E9',
      100: '#99EFCC',
      200: '#66E7B8',
      300: '#33DEA3',
      400: '#1AD997',
      500: '#00CE8B',
      600: '#00B87D',
      700: '#009B69',
      800: '#007D55',
      900: '#005F41',
      950: '#003D2A',
    };

    const contextValue = useMemo(() => ({
      isDark,
      gray,
      brandPrimary,
    }), [isDark, gray, brandPrimary]);

    return (
      <TableContext.Provider value={contextValue}>
        <div className={cn('relative w-full overflow-auto', wrapperClassName)}>
          <table
            ref={ref}
            className={cn('w-full caption-bottom border-collapse', className)}
            style={{
              backgroundColor: isDark ? tokens.bgStandardDark : tokens.bgStandard,
            }}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

// =============================================================================
// Table Page Header
// =============================================================================

export interface TablePageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tag?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  tertiaryAction?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

export const TablePageHeader = forwardRef<HTMLDivElement, TablePageHeaderProps>(
  ({ 
    className, 
    title, 
    description, 
    tag, 
    primaryAction, 
    secondaryAction, 
    tertiaryAction,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    showSearch = true,
    ...props 
  }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const { currentBrand } = useBrand();

    const brandPrimary = currentBrand?.primary || {
      500: '#00CE8B',
      700: '#009B69',
    };

    return (
      <div 
        ref={ref} 
        className={cn('flex flex-col gap-8 px-6 py-4', className)}
        style={{ backgroundColor: isDark ? tokens.bgStandardDark : tokens.bgStandard }}
        {...props}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 
                className="font-semibold leading-[1.3]"
                style={{ 
                  fontSize: 32,
                  color: isDark ? '#fff' : tokens.textPrimary 
                }}
              >
                {title}
              </h2>
              {tag}
            </div>
            {description && (
              <p 
                className="leading-6"
                style={{ 
                  fontSize: tokens.bodyFontSize,
                  color: isDark ? grayDark[400] : tokens.textSecondary,
                }}
              >
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-start gap-3">
            {primaryAction}
            {secondaryAction}
            {tertiaryAction}
          </div>
        </div>

        {showSearch && (
          <div className="flex items-start justify-between w-full">
            <div className="w-[403px]">
              <div 
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: isDark ? tokens.bgStandardDark : tokens.bgStandard,
                  borderColor: isDark ? tokens.borderSubtleDark : tokens.borderDefault,
                }}
              >
                <SearchNormal1 
                  size={18} 
                  variant="Linear"
                  color={isDark ? grayDark[500] : tokens.textQuadrant}
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ 
                    color: isDark ? '#fff' : tokens.textPrimary,
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div 
          className="w-full h-px"
          style={{ backgroundColor: isDark ? tokens.borderSubtleDark : tokens.borderSubtle }}
        />
      </div>
    );
  }
);

TablePageHeader.displayName = 'TablePageHeader';

// =============================================================================
// Table Header
// =============================================================================

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { isDark, gray } = useTableContext();
    
    return (
      <thead
        ref={ref}
        className={cn('[&_tr]:border-b', className)}
        style={{
          backgroundColor: isDark ? tokens.bgStandardDark : tokens.bgStandard,
        }}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

// =============================================================================
// Table Body
// =============================================================================

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
);

TableBody.displayName = 'TableBody';

// =============================================================================
// Table Footer
// =============================================================================

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => {
    const { isDark, gray } = useTableContext();
    
    return (
      <tfoot
        ref={ref}
        className={cn('font-medium', className)}
        style={{
          backgroundColor: isDark ? gray[800] : gray[50],
        }}
        {...props}
      />
    );
  }
);

TableFooter.displayName = 'TableFooter';

// =============================================================================
// Table Row
// =============================================================================

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, hoverable = true, style, ...props }, ref) => {
    const { isDark, gray, brandPrimary } = useTableContext();
    const [isHovered, setIsHovered] = useState(false);

    const bgColor = useMemo(() => {
      if (selected) {
        return isDark ? `${brandPrimary[500]}10` : `${brandPrimary[500]}08`;
      }
      if (isHovered && hoverable) {
        return isDark ? gray[800] : gray[50];
      }
      return 'transparent';
    }, [selected, isHovered, hoverable, isDark, gray, brandPrimary]);

    return (
      <tr
        ref={ref}
        className={cn(
          'border-b transition-colors',
          hoverable && 'cursor-pointer',
          className
        )}
        style={{
          backgroundColor: bgColor,
          borderColor: isDark ? tokens.borderSubtleDark : tokens.borderSubtle,
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

// =============================================================================
// Table Head Cell (44px height)
// =============================================================================

export type TableSortDirection = 'asc' | 'desc' | null;

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  showCheckbox?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      children,
      showCheckbox = false,
      checked = false,
      indeterminate = false,
      onCheckboxChange,
      sortable = false,
      sortDirection = null,
      onSort,
      style,
      ...props
    },
    ref
  ) => {
    const { isDark, gray, brandPrimary } = useTableContext();

    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onCheckboxChange?.(!checked);
    };

    return (
      <th
        ref={ref}
        className={cn(
          'text-left align-middle font-medium',
          sortable && 'cursor-pointer select-none',
          className
        )}
        style={{
          height: tokens.headerCellHeight,
          padding: `${tokens.headerPaddingY}px ${tokens.cellPaddingX}px`,
          color: isDark ? gray[400] : tokens.textSecondary,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderColor: isDark ? tokens.borderSubtleDark : tokens.borderSubtle,
          ...style,
        }}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center gap-3">
          {showCheckbox && (
            <button
              type="button"
              onClick={handleCheckboxClick}
              className={cn(
                'w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0',
                checked || indeterminate
                  ? 'border-transparent'
                  : ''
              )}
              style={{
                backgroundColor: checked || indeterminate
                  ? brandPrimary[500]
                  : isDark ? tokens.bgStandardDark : tokens.bgStandard,
                borderColor: checked || indeterminate
                  ? brandPrimary[500]
                  : tokens.borderInput,
              }}
            >
              {(checked || indeterminate) && (
                <TickCircle
                  size={14}
                  variant="Bold"
                  color="#FFFFFF"
                />
              )}
            </button>
          )}
          
          <div className="flex items-center gap-1">
            <span 
              className="leading-6"
              style={{ 
                fontSize: tokens.headerFontSize,
                fontWeight: tokens.fontWeightMedium,
              }}
            >
              {children}
            </span>
            
            {sortable && (
              <span className="inline-flex items-center justify-center w-4 h-4">
                {sortDirection === 'asc' ? (
                  <ArrowUp2 size={16} variant="Linear" color={isDark ? gray[500] : '#626c83'} />
                ) : sortDirection === 'desc' ? (
                  <ArrowDown2 size={16} variant="Linear" color={isDark ? gray[500] : '#626c83'} />
                ) : (
                  <ArrowDown2 size={16} variant="Linear" color={isDark ? gray[600] : '#626c83'} className="opacity-40" />
                )}
              </span>
            )}
          </div>
        </div>
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

// =============================================================================
// Table Cell (72px height)
// =============================================================================

export type TableCellType = 'text' | 'image' | 'icon-container' | 'tag' | 'icon' | 'null';
export type TableCellLeading = 'none' | 'checkbox' | 'radio' | 'toggle';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  type?: TableCellType;
  mainText?: string;
  supportingText?: string;
  showMainText?: boolean;
  showSupportingText?: boolean;
  leading?: TableCellLeading;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  imageSrc?: string;
  icon?: ReactNode;
  tag?: ReactNode;
  disabled?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      children,
      type = 'text',
      mainText,
      supportingText,
      showMainText = true,
      showSupportingText = true,
      leading = 'none',
      checked = false,
      onCheckedChange,
      imageSrc,
      icon,
      tag,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const { isDark, gray, brandPrimary } = useTableContext();

    const handleLeadingClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    const renderLeading = () => {
      if (leading === 'none') return null;

      if (leading === 'checkbox') {
        return (
          <button
            type="button"
            onClick={handleLeadingClick}
            disabled={disabled}
            className={cn(
              'w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              backgroundColor: checked
                ? brandPrimary[500]
                : isDark ? tokens.bgStandardDark : tokens.bgStandard,
              borderColor: checked
                ? brandPrimary[500]
                : tokens.borderInput,
            }}
          >
            {checked && (
              <TickCircle size={14} variant="Bold" color="#FFFFFF" />
            )}
          </button>
        );
      }

      if (leading === 'radio') {
        return (
          <button
            type="button"
            onClick={handleLeadingClick}
            disabled={disabled}
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              borderColor: checked
                ? brandPrimary[500]
                : tokens.borderInput,
            }}
          >
            {checked && (
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: brandPrimary[500],
                }}
              />
            )}
          </button>
        );
      }

      if (leading === 'toggle') {
        return (
          <button
            type="button"
            onClick={handleLeadingClick}
            disabled={disabled}
            className={cn(
              'w-10 h-5 rounded-full transition-colors shrink-0 relative',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              backgroundColor: checked
                ? brandPrimary[500]
                : isDark ? gray[700] : gray[300],
            }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
              style={{
                transform: checked ? 'translateX(22px)' : 'translateX(2px)',
              }}
            />
          </button>
        );
      }

      return null;
    };

    const renderContent = () => {
      if (children) {
        return children;
      }

      switch (type) {
        case 'image':
          return (
            <div className="flex items-center gap-3">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: isDark ? gray[700] : gray[200] }}
                >
                  <Document size={20} variant="Linear" color={isDark ? gray[500] : gray[400]} />
                </div>
              )}
              {(showMainText || showSupportingText) && (
                <div className="flex flex-col">
                  {showMainText && mainText && (
                    <span
                      className="leading-6"
                      style={{ 
                        fontSize: tokens.bodyFontSize,
                        fontWeight: tokens.fontWeightMedium,
                        color: isDark ? '#fff' : tokens.textPrimary,
                      }}
                    >
                      {mainText}
                    </span>
                  )}
                  {showSupportingText && supportingText && (
                    <span
                      className="leading-6"
                      style={{ 
                        fontSize: tokens.bodyFontSize,
                        fontWeight: tokens.fontWeightRegular,
                        color: isDark ? gray[400] : tokens.textSecondary,
                      }}
                    >
                      {supportingText}
                    </span>
                  )}
                </div>
              )}
            </div>
          );

        case 'icon-container':
          return (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isDark ? `${brandPrimary[500]}20` : tokens.bgNeutralPrimary,
                }}
              >
                {icon || (
                  <Document
                    size={20}
                    variant="Outline"
                    color={isDark ? brandPrimary[400] : brandPrimary[700]}
                  />
                )}
              </div>
              {(showMainText || showSupportingText) && (
                <div className="flex flex-col">
                  {showMainText && mainText && (
                    <span
                      className="leading-6"
                      style={{ 
                        fontSize: tokens.bodyFontSize,
                        fontWeight: tokens.fontWeightMedium,
                        color: isDark ? '#fff' : tokens.textPrimary,
                      }}
                    >
                      {mainText}
                    </span>
                  )}
                  {showSupportingText && supportingText && (
                    <span
                      className="leading-6"
                      style={{ 
                        fontSize: tokens.bodyFontSize,
                        fontWeight: tokens.fontWeightRegular,
                        color: isDark ? gray[400] : tokens.textSecondary,
                      }}
                    >
                      {supportingText}
                    </span>
                  )}
                </div>
              )}
            </div>
          );

        case 'tag':
          return tag;

        case 'icon':
          return (
            <div className="flex items-center justify-end">
              {icon || (
                <More
                  size={24}
                  variant="Linear"
                  color={isDark ? brandPrimary[400] : brandPrimary[600]}
                />
              )}
            </div>
          );

        case 'null':
          return null;

        case 'text':
        default:
          return (
            <div className="flex flex-col">
              {showMainText && mainText && (
                <span
                  className="leading-6"
                  style={{ 
                    fontSize: tokens.bodyFontSize,
                    fontWeight: tokens.fontWeightMedium,
                    color: isDark ? '#fff' : tokens.textPrimary,
                  }}
                >
                  {mainText}
                </span>
              )}
              {showSupportingText && supportingText && (
                <span
                  className="leading-6"
                  style={{ 
                    fontSize: tokens.bodyFontSize,
                    fontWeight: tokens.fontWeightRegular,
                    color: isDark ? gray[400] : tokens.textSecondary,
                  }}
                >
                  {supportingText}
                </span>
              )}
            </div>
          );
      }
    };

    return (
      <td
        ref={ref}
        className={cn(
          'align-middle',
          disabled && 'opacity-50',
          className
        )}
        style={{
          height: tokens.bodyCellHeight,
          padding: `${tokens.cellPaddingY}px ${tokens.cellPaddingX}px`,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderColor: isDark ? tokens.borderSubtleDark : tokens.borderSubtle,
          ...style,
        }}
        {...props}
      >
        <div className="flex items-center gap-3">
          {renderLeading()}
          {renderContent()}
        </div>
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

// =============================================================================
// Table Caption
// =============================================================================

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    const { isDark, gray } = useTableContext();
    
    return (
      <caption
        ref={ref}
        className={cn('mt-4 text-sm', className)}
        style={{
          color: isDark ? gray[400] : gray[500],
        }}
        {...props}
      />
    );
  }
);

TableCaption.displayName = 'TableCaption';

// =============================================================================
// Table Pagination
// =============================================================================

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  totalRecords?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  showRecordsCount?: boolean;
  showItemsPerPage?: boolean;
}

export const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      totalRecords,
      itemsPerPage = 10,
      onPageChange,
      showRecordsCount = true,
      showItemsPerPage = false,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const brandPrimary = currentBrand?.primary || {
      500: '#00CE8B',
      700: '#009B69',
    };

    const getVisiblePages = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      }

      return pages;
    };

    const startRecord = (currentPage - 1) * itemsPerPage + 1;
    const endRecord = Math.min(currentPage * itemsPerPage, totalRecords || 0);

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-10 p-6',
          className
        )}
        style={{
          backgroundColor: isDark ? tokens.bgStandardDark : tokens.bgStandard,
        }}
        {...props}
      >
        {showRecordsCount && totalRecords && (
          <span
            className="text-center whitespace-nowrap"
            style={{ 
              fontSize: tokens.bodyFontSize,
              fontWeight: tokens.fontWeightMedium,
              color: isDark ? gray[400] : tokens.textSecondary,
            }}
          >
            Displaying {startRecord}-{endRecord} of {totalRecords} records
          </span>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'w-10 h-10 rounded-md flex items-center justify-center transition-colors',
              currentPage === 1 && 'opacity-40 cursor-not-allowed'
            )}
          >
            <ArrowLeft2 
              size={16} 
              variant="Linear"
              color={isDark ? '#fff' : tokens.textPrimary}
            />
          </button>

          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              type="button"
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={cn(
                'w-10 h-10 rounded-md flex items-center justify-center transition-colors',
                page === '...' && 'cursor-default'
              )}
              style={{
                backgroundColor:
                  page === currentPage
                    ? isDark ? `${brandPrimary[500]}20` : tokens.bgHighlightLight
                    : 'transparent',
                color:
                  page === currentPage
                    ? isDark ? brandPrimary[400] : tokens.textHighlightPrimary
                    : isDark ? '#fff' : tokens.textPrimary,
                fontSize: tokens.bodyFontSize,
                fontWeight: tokens.fontWeightMedium,
              }}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'w-10 h-10 rounded-md flex items-center justify-center transition-colors',
              currentPage === totalPages && 'opacity-40 cursor-not-allowed'
            )}
          >
            <ArrowRight2 
              size={16} 
              variant="Linear"
              color={isDark ? '#fff' : tokens.textPrimary}
              className="rtl:rotate-180"
            />
          </button>
        </div>

        {showItemsPerPage && (
          <div className="flex items-center gap-2">
            <span
              style={{ 
                fontSize: tokens.bodyFontSize,
                fontWeight: tokens.fontWeightRegular,
                color: isDark ? gray[400] : tokens.textSecondary,
              }}
            >
              Items per page
            </span>
            <span
              className="underline"
              style={{ 
                fontSize: 14,
                fontWeight: tokens.fontWeightSemibold,
                color: isDark ? '#fff' : tokens.textPrimary,
              }}
            >
              {itemsPerPage}
            </span>
          </div>
        )}
      </div>
    );
  }
);

TablePagination.displayName = 'TablePagination';

export default Table;
