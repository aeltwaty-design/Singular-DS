import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { SearchNormal1 } from 'iconsax-react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Separator } from '../data-display/Separator';

import { Tag } from '../data-display/Tag';
import { InputField } from '../data-entry/InputField';

// ============================================================================
// DESIGN TOKENS (Figma specs)
// ============================================================================

const tokens = {
  container: {
    gap: 'gap-4',
    padding: 'py-0',
  },

  titleRow: {
    gap: 'gap-2',
    gapDesktop: 'gap-3',
  },

  textSection: {
    gap: 'gap-1',
  },

  contentRow: {
    gap: 'gap-4',
    gapMobile: 'gap-3',
  },

  typography: {
    title: 'text-[32px] font-semibold leading-[1.25] tracking-[-0.02em]',
    titleMobile: 'text-2xl font-semibold leading-[1.25] tracking-[-0.02em]',
    supporting: 'text-base font-normal leading-[1.5]',
    tag: 'text-sm font-medium leading-[1.5]',
  },

  colors: {
    title: 'text-neutral-900 dark:text-white',
    supporting: 'text-neutral-500 dark:text-neutral-400',
    tagBg: 'bg-opacity-10',
    tagText: '',
  },

  leadingImage: {
    size: 'w-16 h-16',
    sizeMobile: 'w-12 h-12',
    radius: 'rounded-full',
  },

  tag: {
    padding: 'px-2.5 py-0.5',
    radius: 'rounded-md',
  },

  search: {
    height: 'h-11',
    padding: 'px-4',
    radius: 'rounded-lg',
    iconSize: 20,
  },

  tabs: {
    marginTop: 'mt-4',
  },

  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  },
};

// ============================================================================
// TYPES
// ============================================================================

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title: string;
  /** Supporting text below the title */
  supportingText?: string;

  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Show breadcrumbs navigation */
  showBreadcrumbs?: boolean;

  /** Tag text to show beside title */
  tag?: string;
  /** Show tag badge */
  showTag?: boolean;

  /** Leading variant */
  leading?: 'none' | 'image';
  /** Leading image URL (when leading='image') */
  leadingImage?: string;
  /** Leading image alt text */
  leadingImageAlt?: string;

  /** Action buttons slot */
  actions?: ReactNode;
  /** Show actions section */
  showActions?: boolean;

  /** Show search input */
  showSearch?: boolean;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;

  /** Tabs slot */
  tabs?: ReactNode;
  /** Show tabs section */
  showTabs?: boolean;

  /** Show bottom separator */
  showSeparator?: boolean;

  /** Responsive breakpoint */
  breakpoint?: 'desktop' | 'mobile';
}

// ============================================================================
// PAGE HEADER COMPONENT
// ============================================================================

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      title,
      supportingText,
      breadcrumbs,
      showBreadcrumbs = false,
      tag,
      showTag = false,
      leading = 'none',
      leadingImage,
      leadingImageAlt = 'Profile',
      actions,
      showActions = false,
      showSearch = false,
      searchPlaceholder = 'Search...',
      searchValue,
      onSearchChange,
      tabs,
      showTabs = false,
      showSeparator = false,
      breakpoint = 'desktop',
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();
    const isMobile = breakpoint === 'mobile';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col w-full', tokens.container.gap, className)}
        {...props}
      >
        {showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            variant={isMobile ? 'mobile' : 'desktop'}
            showHomeIcon
          />
        )}

        <div
          className={cn(
            'flex w-full',
            isMobile ? 'flex-col' : 'items-start justify-between',
            isMobile ? tokens.contentRow.gapMobile : tokens.contentRow.gap
          )}
        >
          <div
            className={cn(
              'flex items-start flex-1 min-w-0',
              isMobile ? tokens.contentRow.gapMobile : tokens.contentRow.gap
            )}
          >
            {leading === 'image' && leadingImage && (
              <div
                className={cn(
                  'shrink-0 overflow-hidden',
                  tokens.leadingImage.radius,
                  isMobile ? tokens.leadingImage.sizeMobile : tokens.leadingImage.size
                )}
              >
                <img
                  src={leadingImage}
                  alt={leadingImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={cn('flex flex-col flex-1 min-w-0', tokens.textSection.gap)}>
              <div
                className={cn(
                  'flex items-center flex-wrap',
                  isMobile ? tokens.titleRow.gap : tokens.titleRow.gapDesktop
                )}
              >
                <h1
                  className={cn(
                    isMobile ? tokens.typography.titleMobile : tokens.typography.title,
                    tokens.colors.title
                  )}
                >
                  {title}
                </h1>

                {showTag && tag && (
                  <Tag status="default" type="secondary" size="sm">
                    {tag}
                  </Tag>
                )}
              </div>

              {supportingText && (
                <p
                  className={cn(
                    tokens.typography.supporting,
                    tokens.colors.supporting
                  )}
                >
                  {supportingText}
                </p>
              )}
            </div>
          </div>

          {!isMobile && showActions && actions && (
            <div className="flex items-center gap-3 shrink-0">
              {actions}
            </div>
          )}
        </div>

        {isMobile && showActions && actions && (
          <div className="flex items-center gap-2 w-full">
            {actions}
          </div>
        )}

        {showSearch && (
          <div className="w-full max-w-md">
            <InputField
              inputType="leadingIcon"
              size="sm"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              leadingIcon={<SearchNormal1 size={tokens.search.iconSize} variant="Linear" />}
              fullWidth
            />
          </div>
        )}

        {showTabs && tabs && (
          <div className={cn(tokens.tabs.marginTop)}>
            {tabs}
          </div>
        )}

        {showSeparator && (
          <Separator />
        )}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
