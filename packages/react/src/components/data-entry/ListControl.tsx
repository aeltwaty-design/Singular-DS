import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useState,
  useEffect,
  useId,
} from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { TickCircle } from 'iconsax-react';

import { grayLight, grayDark, baseColors } from '../../tokens/primitives/colors';

/**
 * ListControl Component
 *
 * A versatile selection control component that can render as:
 * - Checkbox: Square control for multi-select
 * - Radio: Circular control for single-select
 * - Toggle: Switch control for on/off states
 *
 * Matches Figma design specifications with:
 * - Types: Checkbox, Radio, Toggle
 * - Sizes: sm, md
 * - States: default, hover, focus, disabled
 * - Styles: Full width, Widget
 */

// =============================================================================
// TYPES
// =============================================================================

export type ListControlType = 'checkbox' | 'radio' | 'toggle';
export type ListControlSize = 'sm' | 'md';
export type ListControlStyle = 'full-width' | 'widget';

export interface ListControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Control type */
  type?: ListControlType;
  /** Size variant */
  size?: ListControlSize;
  /** Visual style */
  variant?: ListControlStyle;
  /** Whether the control is selected/checked */
  selected?: boolean;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Title text */
  title?: string;
  /** Supporting/description text */
  description?: string;
  /** Whether to show title */
  showTitle?: boolean;
  /** Whether to show description */
  showDescription?: boolean;
  /** Trailing icon or element */
  trailingIcon?: ReactNode;
  /** Whether to show trailing icon */
  showTrailingIcon?: boolean;
  /** Change handler */
  onChange?: (selected: boolean) => void;
  /** Name for form integration */
  name?: string;
  /** Value for form integration */
  value?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const ListControl = forwardRef<HTMLDivElement, ListControlProps>(
  (
    {
      className,
      type = 'checkbox',
      size = 'md',
      variant = 'full-width',
      selected = false,
      disabled = false,
      title,
      description,
      showTitle = true,
      showDescription = true,
      trailingIcon,
      showTrailingIcon = false,
      onChange,
      name,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [mounted, setMounted] = useState(false);
    const generatedId = useId();
    const controlId = id || `list-control-${generatedId}`;

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const brandPrimary = currentBrand?.primary || {
      400: '#1AD997',
      500: '#00CE8B',
      600: '#00B87D',
    };

    // ==========================================================================
    // TOKEN-BASED STYLING
    // ==========================================================================
    const tokens = {
      bg: {
        surface: isDark ? gray[800] : baseColors.white,
        control: isDark ? gray[900] : baseColors.white,
        controlSelected: isDark ? brandPrimary[400] : brandPrimary[500],
        controlHover: isDark ? gray[800] : gray[50],
        toggleTrack: isDark ? gray[700] : gray[100],
        toggleTrackSelected: isDark ? brandPrimary[400] : brandPrimary[500],
        widget: isDark ? gray[800] : baseColors.white,
      },
      border: {
        control: isDark ? gray[600] : gray[300],
        controlHover: isDark ? gray[500] : gray[400],
        controlSelected: isDark ? brandPrimary[400] : brandPrimary[500],
        controlFocus: isDark ? brandPrimary[400] : brandPrimary[500],
        widget: isDark ? gray[700] : gray[200],
        disabled: isDark ? gray[700] : gray[200],
      },
      text: {
        primary: isDark ? gray[50] : gray[900],
        secondary: isDark ? gray[400] : gray[600],
        disabled: isDark ? gray[500] : gray[400],
        onSelected: baseColors.white,
      },
      ring: {
        focus: isDark ? brandPrimary[400] : brandPrimary[500],
      },
    };

    // ==========================================================================
    // SIZE STYLES
    // ==========================================================================
    const sizeStyles = {
      sm: {
        control: 16,
        checkboxRadius: 4,
        radioRadius: 8,
        toggleWidth: 36,
        toggleHeight: 20,
        toggleKnob: 16,
        toggleRadius: 10,
        title: 'text-sm font-medium',
        description: 'text-xs',
        gap: 'gap-3',
        iconSize: 20,
        checkSize: 10,
      },
      md: {
        control: 20,
        checkboxRadius: 6,
        radioRadius: 10,
        toggleWidth: 44,
        toggleHeight: 24,
        toggleKnob: 20,
        toggleRadius: 12,
        title: 'text-base font-medium',
        description: 'text-sm',
        gap: 'gap-3',
        iconSize: 24,
        checkSize: 12,
      },
    };

    const currentSize = sizeStyles[size];

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================
    const handleClick = () => {
      if (disabled) return;
      onChange?.(!selected);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onChange?.(!selected);
      }
    };

    // ==========================================================================
    // RENDER CONTROL (Checkbox, Radio, or Toggle)
    // ==========================================================================
    const renderControl = () => {
      const controlStyles: React.CSSProperties = {
        width: currentSize.control,
        height: currentSize.control,
        backgroundColor: selected ? tokens.bg.controlSelected : tokens.bg.control,
        borderColor: disabled
          ? tokens.border.disabled
          : selected
          ? tokens.border.controlSelected
          : isHovered
          ? tokens.border.controlHover
          : tokens.border.control,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: type === 'checkbox' ? currentSize.checkboxRadius : currentSize.radioRadius,
        transition: 'all 150ms ease',
        opacity: disabled ? 0.5 : 1,
      };

      if (type === 'toggle') {
        return (
          <div
            className="relative shrink-0 transition-all"
            style={{
              width: currentSize.toggleWidth,
              height: currentSize.toggleHeight,
              backgroundColor: selected ? tokens.bg.toggleTrackSelected : tokens.bg.toggleTrack,
              borderRadius: currentSize.toggleRadius,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-sm transition-all duration-200"
              style={{
                width: currentSize.toggleKnob,
                height: currentSize.toggleKnob,
                backgroundColor: baseColors.white,
                left: selected ? `calc(100% - ${currentSize.toggleKnob + 2}px)` : '2px',
                boxShadow: '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.1)',
              }}
            />
          </div>
        );
      }

      return (
        <div
          className="relative shrink-0 flex items-center justify-center transition-all"
          style={controlStyles}
        >
          {type === 'checkbox' && selected && (
            <svg
              width={currentSize.checkSize}
              height={currentSize.checkSize}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke={tokens.text.onSelected}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {type === 'radio' && selected && (
            <div
              className="rounded-full"
              style={{
                width: currentSize.control * 0.4,
                height: currentSize.control * 0.4,
                backgroundColor: tokens.text.onSelected,
              }}
            />
          )}
        </div>
      );
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
    const containerClassName = cn(
      'flex items-center cursor-pointer select-none transition-all',
      currentSize.gap,
      variant === 'widget' && 'rounded-lg border p-4',
      disabled && 'cursor-not-allowed opacity-60',
      isFocused && 'ring-2 ring-offset-2',
      className
    );

    const containerStyle: React.CSSProperties = {
      ...(variant === 'widget' && {
        backgroundColor: tokens.bg.widget,
        borderColor: tokens.border.widget,
      }),
      ...(isFocused && {
        ringColor: tokens.ring.focus,
      }),
    };

    const focusRingStyle = isFocused
      ? {
          boxShadow: `0 0 0 2px ${tokens.ring.focus}20, 0 0 0 4px ${tokens.ring.focus}40`,
        }
      : {};

    return (
      <div
        ref={ref}
        id={controlId}
        className={containerClassName}
        style={{ ...containerStyle, ...focusRingStyle }}
        role={type === 'toggle' ? 'switch' : type}
        aria-checked={selected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        <div className="shrink-0 flex items-center justify-center pt-0.5">
          {renderControl()}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          {showTitle && title && (
            <span
              className={cn(currentSize.title, 'leading-normal')}
              style={{ color: disabled ? tokens.text.disabled : tokens.text.primary }}
            >
              {title}
            </span>
          )}
          {showDescription && description && (
            <span
              className={cn(currentSize.description, 'leading-normal')}
              style={{ color: disabled ? tokens.text.disabled : tokens.text.secondary }}
            >
              {description}
            </span>
          )}
        </div>

        {showTrailingIcon && trailingIcon && (
          <div
            className="shrink-0"
            style={{ color: disabled ? tokens.text.disabled : tokens.text.secondary }}
          >
            {trailingIcon}
          </div>
        )}
      </div>
    );
  }
);

ListControl.displayName = 'ListControl';

export default ListControl;
