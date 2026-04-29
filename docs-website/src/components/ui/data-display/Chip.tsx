'use client';

import React, { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import { TickCircle } from 'iconsax-react';
import { Close } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import design tokens
import { grayLight, grayDark } from '@/tokens/primitives/colors';

/**
 * Chip Component
 * 
 * Interactive selection elements used for filtering, multi-select inputs, and user-generated tokens.
 * Unlike Tags (for status display), Chips are interactive and support selection states.
 * 
 * Variants from Figma:
 * - Size: sm (28px height), md (32px height), lg (40px height)
 * - State: default, selected, disabled
 * - Content: text, leading icon, leading avatar, dismissible
 */

const chipVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 rounded-full cursor-pointer select-none',
  {
    variants: {
      size: {
        sm: 'text-xs px-2.5 py-1 h-7',      // 28px height
        md: 'text-sm px-3 py-1.5 h-8',       // 32px height
        lg: 'text-base px-4 py-2 h-10',      // 40px height
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Icon size mappings based on chip size
const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

// Avatar size mappings based on chip size
const avatarSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof chipVariants> {
  /** The text content of the chip */
  children: ReactNode;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Optional icon to display before the text */
  leadingIcon?: ReactNode;
  /** Optional avatar (URL string or ReactNode) to display before the text */
  leadingAvatar?: string | ReactNode;
  /** Whether the chip can be dismissed (shows close button) */
  dismissible?: boolean;
  /** Callback when the chip is selected/clicked */
  onSelect?: () => void;
  /** Callback when the chip is dismissed */
  onDismiss?: () => void;
  /** Value for use with ChipGroup */
  value?: string;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      children,
      size = 'md',
      selected = false,
      disabled = false,
      leadingIcon,
      leadingAvatar,
      dismissible = false,
      onSelect,
      onDismiss,
      value,
      style,
      ...props
    },
    ref
  ) => {
    const { currentBrand, brandColors } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    // Get brand primary colors
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

    // Color tokens based on state
    const colorTokens = useMemo(() => {
      if (disabled) {
        return {
          bg: isDark ? gray[800] : gray[100],
          border: isDark ? gray[700] : gray[200],
          text: isDark ? gray[500] : gray[400],
          iconColor: isDark ? gray[500] : gray[400],
        };
      }

      if (selected) {
        return {
          bg: isDark ? brandPrimary[600] : brandPrimary[500],
          border: isDark ? brandPrimary[600] : brandPrimary[500],
          text: '#FFFFFF',
          iconColor: '#FFFFFF',
        };
      }

      // Default (unselected) state
      return {
        bg: isDark ? gray[800] : '#FFFFFF',
        border: isDark ? gray[700] : gray[200],
        text: isDark ? gray[100] : gray[900],
        iconColor: isDark ? gray[400] : gray[600],
      };
    }, [selected, disabled, isDark, brandPrimary, gray]);

    const iconSize = iconSizes[size || 'md'];
    const avatarSizeClass = avatarSizes[size || 'md'];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onSelect?.();
      props.onClick?.(e);
    };

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onDismiss) {
        onDismiss();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          chipVariants({ size }),
          disabled && 'cursor-not-allowed opacity-60',
          !disabled && 'hover:opacity-90 active:scale-[0.98]',
          className
        )}
        style={{
          backgroundColor: colorTokens.bg,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colorTokens.border,
          color: colorTokens.text,
          ...style,
        }}
        onClick={handleClick}
        {...props}
      >
        {/* Selected checkmark */}
        {selected && (
          <TickCircle
            variant="Bold"
            size={iconSize}
            style={{ color: colorTokens.iconColor }}
          />
        )}

        {/* Leading Avatar */}
        {leadingAvatar && !selected && (
          typeof leadingAvatar === 'string' ? (
            <img
              src={leadingAvatar}
              alt=""
              className={cn('rounded-full object-cover shrink-0', avatarSizeClass)}
            />
          ) : (
            <span className={cn('shrink-0 rounded-full overflow-hidden', avatarSizeClass)}>
              {leadingAvatar}
            </span>
          )
        )}

        {/* Leading Icon (only if no avatar and not selected) */}
        {leadingIcon && !leadingAvatar && !selected && (
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ color: colorTokens.iconColor }}
          >
            {leadingIcon}
          </span>
        )}
        
        {/* Text content */}
        <span className="truncate">{children}</span>
        
        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            disabled={disabled}
            className={cn(
              'inline-flex items-center justify-center shrink-0 rounded-full transition-opacity ms-0.5',
              disabled ? 'cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
            )}
            style={{ color: colorTokens.iconColor }}
            aria-label="Remove chip"
          >
            <Close variant="Bold" size={iconSize} />
          </button>
        )}
      </button>
    );
  }
);

Chip.displayName = 'Chip';

// ============================================================================
// ChipGroup Component
// ============================================================================

export interface ChipGroupProps {
  /** Children should be Chip components */
  children: ReactNode;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Currently selected values */
  value?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
  /** Gap between chips */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
}

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
} as const;

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      children,
      multiple = false,
      value = [],
      onChange,
      gap = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const handleChipSelect = (chipValue: string) => {
      if (!onChange) return;

      if (multiple) {
        // Toggle selection for multi-select
        if (value.includes(chipValue)) {
          onChange(value.filter((v) => v !== chipValue));
        } else {
          onChange([...value, chipValue]);
        }
      } else {
        // Single select - toggle or select new
        if (value.includes(chipValue)) {
          onChange([]);
        } else {
          onChange([chipValue]);
        }
      }
    };

    // Clone children and inject props
    const enhancedChildren = React.Children.map(children, (child) => {
      // Check if it's a Chip component by displayName
      if (React.isValidElement(child) && 
          (child.type as any)?.displayName === 'Chip') {
        const childProps = child.props as ChipProps;
        const chipValue = childProps.value;
        if (chipValue) {
          return React.cloneElement(child as React.ReactElement<ChipProps>, {
            selected: value.includes(chipValue),
            onSelect: () => handleChipSelect(chipValue),
          });
        }
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap', gapClasses[gap], className)}
        role="group"
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

ChipGroup.displayName = 'ChipGroup';

export { Chip as default };
