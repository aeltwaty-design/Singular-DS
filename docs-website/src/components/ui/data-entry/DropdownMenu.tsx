'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import design tokens
import { grayLight, grayDark, baseColors } from '@/tokens/primitives/colors';

/**
 * DropdownMenu Component
 *
 * A floating menu list that displays selectable options.
 * Used internally by InputDropdown or standalone for context menus.
 *
 * Features:
 * - RTL support with automatic text alignment
 * - Hover and selected states
 * - Optional leading icons
 * - Keyboard navigation
 * - Elevation shadow
 */

// =============================================================================
// TYPES
// =============================================================================

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Array of menu items */
  items: DropdownMenuItem[];
  /** Currently selected item ID */
  selectedId?: string;
  /** Callback when item is selected */
  onSelect?: (item: DropdownMenuItem) => void;
  /** Maximum height before scrolling */
  maxHeight?: number;
  /** Width of the menu */
  width?: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      className,
      items,
      selectedId,
      onSelect,
      maxHeight = 440,
      width = 240,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    // Brand colors
    const brandPrimary = currentBrand?.primary || {
      50: '#E6F9F3',
      500: '#00CE8B',
      600: '#00B87D',
    };

    // ==========================================================================
    // TOKEN-BASED STYLING
    // ==========================================================================
    const tokens = {
      bg: {
        container: isDark ? gray[800] : baseColors.white,
        itemHover: isDark ? gray[700] : gray[50],
        itemSelected: isDark ? brandPrimary[50] + '20' : brandPrimary[50],
      },
      border: {
        container: isDark ? gray[600] : gray[300],
        separator: isDark ? gray[700] : gray[300],
      },
      text: {
        primary: isDark ? gray[50] : gray[900],
        selected: isDark ? brandPrimary[400] : brandPrimary[600],
        disabled: isDark ? gray[500] : gray[400],
      },
      icon: {
        primary: isDark ? gray[400] : gray[600],
        selected: isDark ? brandPrimary[400] : brandPrimary[600],
      },
    };

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================
    const handleItemClick = (item: DropdownMenuItem) => {
      if (item.disabled) return;
      onSelect?.(item);
    };

    const handleItemKeyDown = (e: React.KeyboardEvent, item: DropdownMenuItem) => {
      if (item.disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(item);
      }
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
    const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl border',
          className
        )}
        style={{
          width: width,
          maxHeight: maxHeight,
          backgroundColor: tokens.bg.container,
          borderColor: tokens.border.container,
          boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
          overflowY: 'auto',
        }}
        role="menu"
        {...props}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;
          const isHovered = item.id === hoveredId;

          return (
            <div key={item.id}>
              {/* Menu Item */}
              <div
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors',
                  item.disabled && 'cursor-not-allowed opacity-50',
                  isRTL ? 'justify-end' : 'justify-start'
                )}
                style={{
                  height: 44,
                  backgroundColor: isSelected
                    ? tokens.bg.itemSelected
                    : isHovered && !item.disabled
                    ? tokens.bg.itemHover
                    : 'transparent',
                  color: item.disabled
                    ? tokens.text.disabled
                    : isSelected
                    ? tokens.text.selected
                    : tokens.text.primary,
                }}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleItemKeyDown(e, item)}
                onMouseEnter={() => !item.disabled && setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Leading Icon */}
                {item.icon && (
                  <span
                    className="shrink-0"
                    style={{
                      color: isSelected ? tokens.icon.selected : tokens.icon.primary,
                    }}
                  >
                    {item.icon}
                  </span>
                )}

                {/* Label */}
                <span
                  className={cn(
                    'flex-1 text-sm font-normal leading-normal',
                    isRTL ? 'text-right' : 'text-left'
                  )}
                >
                  {item.label}
                </span>
              </div>

              {/* Separator (except after last item) */}
              {index < items.length - 1 && (
                <div
                  className="w-full"
                  style={{
                    height: 1,
                    backgroundColor: tokens.border.separator,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;

