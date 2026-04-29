'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { SearchNormal1 } from 'iconsax-react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Separator } from '../data-display/Separator';

// Import Tag atom and InputField molecule for composition compliance
import { Tag } from '../data-display/Tag';
import { InputField } from '../data-entry/InputField';

// ============================================================================
// DESIGN TOKENS (Figma specs)
// ============================================================================

const tokens = {
  // Container
  container: {
    gap: 'gap-4', // 16px between main sections
    padding: 'py-0',
  },

  // Title row
  titleRow: {
    gap: 'gap-2', // 8px between title and tag
    gapDesktop: 'gap-3', // 12px on desktop
  },

  // Text section
  textSection: {
    gap: 'gap-1', // 4px between title row and supporting text
  },

  // Content row (leading + text + actions)
  contentRow: {
    gap: 'gap-4', // 16px between sections
    gapMobile: 'gap-3', // 12px on mobile
  },

  // Typography
  typography: {
    title: 'text-[32px] font-semibold leading-[1.25] tracking-[-0.02em]', // 32px semibold
    titleMobile: 'text-2xl font-semibold leading-[1.25] tracking-[-0.02em]', // 24px on mobile
    supporting: 'text-base font-normal leading-[1.5]', // 16px regular
    tag: 'text-sm font-medium leading-[1.5]', // 14px medium
  },

  // Colors
  colors: {
    title: 'text-neutral-900 dark:text-white',
    supporting: 'text-neutral-500 dark:text-neutral-400',
    tagBg: 'bg-opacity-10', // Uses brand color with opacity
    tagText: '', // Uses brand color
  },

  // Leading image
  leadingImage: {
    size: 'w-16 h-16', // 64px
    sizeMobile: 'w-12 h-12', // 48px
    radius: 'rounded-full',
  },

  // Tag badge
  tag: {
    padding: 'px-2.5 py-0.5', // 10px horizontal, 2px vertical
    radius: 'rounded-md', // 6px
  },

  // Search input
  search: {
    height: 'h-11', // 44px
    padding: 'px-4',
    radius: 'rounded-lg', // 8px
    iconSize: 20,
  },

  // Tabs section
  tabs: {
    marginTop: 'mt-4', // 16px top margin
  },

  // Focus states
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

// NOTE: TagBadge and SearchInput have been replaced with Tag atom and InputField molecule
// for composition compliance per MASTER_BUILDER.md

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
        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            variant={isMobile ? 'mobile' : 'desktop'}
            showHomeIcon
          />
        )}

        {/* Main Content Row */}
        <div
          className={cn(
            'flex w-full',
            isMobile ? 'flex-col' : 'items-start justify-between',
            isMobile ? tokens.contentRow.gapMobile : tokens.contentRow.gap
          )}
        >
          {/* Left Section: Leading Image + Text */}
          <div
            className={cn(
              'flex items-start flex-1 min-w-0',
              isMobile ? tokens.contentRow.gapMobile : tokens.contentRow.gap
            )}
          >
            {/* Leading Image */}
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

            {/* Text Section */}
            <div className={cn('flex flex-col flex-1 min-w-0', tokens.textSection.gap)}>
              {/* Title Row */}
              <div
                className={cn(
                  'flex items-center flex-wrap',
                  isMobile ? tokens.titleRow.gap : tokens.titleRow.gapDesktop
                )}
              >
                {/* Title */}
                <h1
                  className={cn(
                    isMobile ? tokens.typography.titleMobile : tokens.typography.title,
                    tokens.colors.title
                  )}
                >
                  {title}
                </h1>

                {/* Tag Badge - Using Tag atom for composition compliance */}
                {showTag && tag && (
                  <Tag status="default" type="secondary" size="sm">
                    {tag}
                  </Tag>
                )}
              </div>

              {/* Supporting Text */}
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

          {/* Right Section: Actions (Desktop only in same row) */}
          {!isMobile && showActions && actions && (
            <div className="flex items-center gap-3 shrink-0">
              {actions}
            </div>
          )}
        </div>

        {/* Mobile: Actions below content */}
        {isMobile && showActions && actions && (
          <div className="flex items-center gap-2 w-full">
            {actions}
          </div>
        )}

        {/* Search Row - Using InputField molecule for composition compliance */}
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

        {/* Tabs */}
        {showTabs && tabs && (
          <div className={cn(tokens.tabs.marginTop)}>
            {tabs}
          </div>
        )}

        {/* Separator */}
        {showSeparator && (
          <Separator />
        )}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;

