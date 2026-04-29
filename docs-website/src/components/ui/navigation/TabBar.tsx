'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import Separator atom for composition compliance
import { Separator } from '../data-display/Separator';

export interface TabBarItem {
  /** The icon component (iconsax-react) - pass only the component, e.g. Home2 */
  icon: React.ComponentType<{ size?: number; variant?: string; color?: string }>;
  /** Tab label text */
  label: string;
}

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of tab items (4 or 5 items) */
  items: TabBarItem[];
  /** Currently selected tab index (0-based) */
  selectedIndex?: number;
  /** Callback when tab is clicked */
  onTabChange?: (index: number) => void;
  /** Show iOS home indicator */
  showIndicator?: boolean;
  /** Show floating action button in center (only for 4 items) */
  showFab?: boolean;
  /** FAB icon component (iconsax-react) */
  fabIcon?: React.ComponentType<{ size?: number; variant?: string; color?: string }>;
  /** Callback when FAB is clicked */
  onFabClick?: () => void;
  /** Position mode: 'demo' for documentation, 'fixed' for production */
  position?: 'demo' | 'fixed';
}

export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  (
    {
      items,
      selectedIndex = 0,
      onTabChange,
      showIndicator = false,
      showFab = false,
      fabIcon: FabIcon,
      onFabClick,
      position = 'fixed',
      className,
      ...props
    },
    ref
  ) => {
    const { brandColor } = useBrand();

    // Colors from Figma design - matching exact values
    const unselectedColor = '#626C83'; // text/tertiary
    const indicatorBgColor = '#F4F6FC'; // bg/neutral/primary light
    const fabIconColor = '#111317'; // Dark text on FAB
    const bgColor = '#FFFFFF'; // bg/standard/default

    const handleTabClick = (index: number) => {
      onTabChange?.(index);
    };

    const handleFabClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onFabClick?.();
    };

    // Tab items height: 56px (from Figma)
    const tabItemsHeight = 56;
    // Home indicator height: 32px (from Figma)
    const indicatorHeight = 32;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center w-[375px]',
          position === 'fixed' && 'fixed bottom-0 left-1/2 -translate-x-1/2 z-50',
          position === 'demo' && 'relative',
          className
        )}
        style={{ 
          backgroundColor: bgColor,
          maxWidth: '100%' 
        }}
        {...props}
      >
        {/* Top Separator Line - Using Separator atom for composition compliance */}
        <Separator />

        {/* Tab Items Container */}
        <div className="relative w-full flex items-center">
          {/* Tab Items Row */}
          <div 
            className="flex w-full"
            style={{ height: tabItemsHeight }}
          >
            {items.map((item, index) => {
              const isSelected = index === selectedIndex;
              const IconComponent = item.icon;
              const iconColor = isSelected ? brandColor : unselectedColor;
              const textColor = isSelected ? brandColor : unselectedColor;

              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    'flex-1 flex flex-col items-center justify-center gap-[2px]',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-opacity-50',
                    'min-w-0 overflow-hidden'
                  )}
                  style={{ 
                    height: tabItemsHeight,
                    backgroundColor: bgColor,
                  }}
                  aria-label={item.label}
                  aria-current={isSelected ? 'page' : undefined}
                >
                  {/* Icon - Linear when unselected, Bold when selected */}
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <IconComponent 
                      size={24} 
                      variant={isSelected ? 'Bold' : 'Linear'}
                      color={iconColor}
                    />
                  </div>

                  {/* Label */}
                  {item.label && (
                    <span
                      className={cn(
                        'text-xs leading-[1.5] text-center truncate max-w-full px-1',
                        isSelected ? 'font-medium' : 'font-normal'
                      )}
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* FAB (Floating Action Button) - only shown for 4 items */}
          {showFab && items.length === 4 && FabIcon && (
            <button
              onClick={handleFabClick}
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'w-10 h-10 rounded-full flex items-center justify-center',
                'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]',
                'transition-transform duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'hover:scale-105 active:scale-95',
                'z-10'
              )}
              style={{ backgroundColor: brandColor }}
              aria-label="Action button"
            >
              <FabIcon size={20} color={fabIconColor} />
            </button>
          )}
        </div>

        {/* Home Indicator (iOS style) */}
        {showIndicator && (
          <div 
            className="w-full flex items-end justify-center"
            style={{ height: indicatorHeight, backgroundColor: bgColor }}
          >
            <div 
              className="w-[134px] h-[5px] rounded-[100px] mb-2"
              style={{ backgroundColor: indicatorBgColor }}
            />
          </div>
        )}
      </div>
    );
  }
);

TabBar.displayName = 'TabBar';
