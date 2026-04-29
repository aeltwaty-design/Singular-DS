import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useId,
} from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';

import { grayLight, grayDark, baseColors } from '../../tokens/primitives/colors';

/**
 * InputDropdown Component
 *
 * A form input that opens a dropdown menu for selection.
 * Combines an input trigger with a dropdown menu for single-select scenarios.
 *
 * Features:
 * - Multiple states: Display, Enabled, Focused, Open
 * - Leading variants: None, Icon, Image, Avatar
 * - Optional label and hint text
 * - RTL support
 * - Keyboard accessible
 */

// =============================================================================
// TYPES
// =============================================================================

export type InputDropdownState = 'display' | 'enabled' | 'focused' | 'open';
export type InputDropdownLeading = 'none' | 'icon' | 'image' | 'avatar';

export interface InputDropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Array of dropdown items */
  items: DropdownMenuItem[];
  /** Currently selected item ID */
  selectedId?: string;
  /** Callback when item is selected */
  onSelect?: (item: DropdownMenuItem) => void;
  /** Label text above input */
  label?: string;
  /** Helper text below input */
  hint?: string;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Whether to show label */
  showLabel?: boolean;
  /** Whether to show hint text */
  showHint?: boolean;
  /** Leading variant type */
  leading?: InputDropdownLeading;
  /** Leading icon element */
  leadingIcon?: ReactNode;
  /** Leading image source */
  leadingImage?: string;
  /** Leading avatar props */
  leadingAvatar?: {
    src: string;
    alt?: string;
  };
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Name for form integration */
  name?: string;
  /** ID for accessibility */
  id?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const InputDropdown = forwardRef<HTMLDivElement, InputDropdownProps>(
  (
    {
      className,
      items,
      selectedId,
      onSelect,
      label,
      hint,
      placeholder = 'إختز من القائمة',
      showLabel = true,
      showHint = true,
      leading = 'none',
      leadingIcon,
      leadingImage,
      leadingAvatar,
      disabled = false,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();
    const inputId = id || `input-dropdown-${generatedId}`;

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setIsFocused(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const isDark = mounted && resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const brandPrimary = currentBrand?.primary || {
      400: '#1AD997',
      500: '#00CE8B',
      600: '#00B87D',
    };

    const selectedItem = items.find((item) => item.id === selectedId);

    const currentState: InputDropdownState = disabled
      ? 'display'
      : isOpen
      ? 'open'
      : isFocused
      ? 'focused'
      : selectedItem
      ? 'display'
      : 'enabled';

    // ==========================================================================
    // TOKEN-BASED STYLING
    // ==========================================================================
    const tokens = {
      bg: {
        input: isDark ? gray[800] : baseColors.white,
      },
      border: {
        default: isDark ? gray[600] : gray[300],
        focused: isDark ? brandPrimary[400] : brandPrimary[500],
      },
      text: {
        label: isDark ? gray[50] : gray[900],
        primary: isDark ? gray[50] : gray[900],
        placeholder: isDark ? gray[400] : gray[500],
        hint: isDark ? gray[400] : gray[600],
      },
      icon: {
        primary: isDark ? gray[400] : gray[600],
      },
    };

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================
    const handleTriggerClick = () => {
      if (disabled) return;
      setIsOpen(!isOpen);
      setIsFocused(true);
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setIsFocused(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    const handleSelect = (item: DropdownMenuItem) => {
      onSelect?.(item);
      setIsOpen(false);
      setIsFocused(false);
    };

    // ==========================================================================
    // RENDER LEADING ELEMENT
    // ==========================================================================
    const renderLeading = () => {
      if (leading === 'none') return null;

      if (leading === 'icon' && leadingIcon) {
        return (
          <span className="shrink-0" style={{ color: tokens.icon.primary }}>
            {leadingIcon}
          </span>
        );
      }

      if (leading === 'image' && leadingImage) {
        return (
          <img
            src={leadingImage}
            alt=""
            className="shrink-0 w-5 h-5 object-cover rounded"
          />
        );
      }

      if (leading === 'avatar' && leadingAvatar) {
        return (
          <img
            src={leadingAvatar.src}
            alt={leadingAvatar.alt || ''}
            className="shrink-0 w-6 h-6 object-cover rounded-full"
          />
        );
      }

      return null;
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
    const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
    const borderColor =
      currentState === 'focused' || currentState === 'open'
        ? tokens.border.focused
        : tokens.border.default;

    return (
      <div ref={containerRef} className={cn('relative inline-flex flex-col', className)} {...props}>
        <div className="flex flex-col gap-1.5 w-full">
          {showLabel && label && (
            <label
              htmlFor={inputId}
              className={cn(
                'text-base font-medium leading-normal',
                isRTL ? 'text-right' : 'text-left'
              )}
              style={{ color: tokens.text.label }}
            >
              {label}
            </label>
          )}

          <div
            ref={ref}
            id={inputId}
            className={cn(
              'flex items-center gap-2 px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer',
              disabled && 'cursor-not-allowed opacity-60',
              isRTL ? 'flex-row-reverse' : 'flex-row'
            )}
            style={{
              width: 320,
              backgroundColor: tokens.bg.input,
              borderColor: borderColor,
            }}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => !isOpen && setIsFocused(false)}
          >
            {renderLeading()}

            <span
              className={cn(
                'flex-1 text-sm font-normal leading-normal truncate min-w-0',
                isRTL ? 'text-right' : 'text-left'
              )}
              style={{
                color: selectedItem ? tokens.text.primary : tokens.text.placeholder,
              }}
            >
              {selectedItem?.label || placeholder}
            </span>

            <ChevronDown
              size={16}
              className="shrink-0 transition-transform duration-200"
              style={{
                color: tokens.icon.primary,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>

          {showHint && hint && (
            <p
              className={cn(
                'text-xs font-normal leading-normal',
                isRTL ? 'text-right' : 'text-left'
              )}
              style={{ color: tokens.text.hint, width: 320 }}
            >
              {hint}
            </p>
          )}
        </div>

        {isOpen && !disabled && (
          <div
            className="absolute z-50 mt-1"
            style={{
              top: '100%',
              [isRTL ? 'right' : 'left']: 0,
            }}
          >
            <DropdownMenu
              items={items}
              selectedId={selectedId}
              onSelect={handleSelect}
              width={320}
            />
          </div>
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={selectedId || ''}
          />
        )}
      </div>
    );
  }
);

InputDropdown.displayName = 'InputDropdown';

export default InputDropdown;
