import { forwardRef, HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { User } from 'iconsax-react';
import { Close } from '../../icons';

import { grayLight, grayDark } from '../../tokens/primitives/colors';

/**
 * Chip Component
 *
 * Used for displaying selected items in tags/multi-select inputs.
 * Matches Figma design with avatar, label, and close button.
 */

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  /** Chip label text */
  label: string;
  /** Avatar image URL */
  avatar?: string;
  /** Custom avatar content */
  avatarContent?: ReactNode;
  /** Show avatar */
  showAvatar?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Close button click handler */
  onClose?: () => void;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Disabled state */
  disabled?: boolean;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      label,
      avatar,
      avatarContent,
      showAvatar = true,
      showClose = true,
      onClose,
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const tokens = {
      bg: {
        chip: isDark ? gray[900] : '#FFFFFF',
        avatar: isDark ? gray[800] : gray[100],
      },
      border: {
        default: isDark ? gray[700] : gray[300],
      },
      text: {
        label: isDark ? gray[50] : gray[900],
        icon: isDark ? gray[400] : gray[600],
        disabled: isDark ? gray[500] : gray[400],
      },
    };

    const sizeStyles = {
      sm: {
        padding: 'p-0.5',
        text: 'text-xs',
        avatar: 'w-4 h-4',
        avatarIcon: 10,
        closeIcon: 12,
        gap: 'gap-0.5',
      },
      md: {
        padding: 'p-1',
        text: 'text-sm',
        avatar: 'w-5 h-5',
        avatarIcon: 12,
        closeIcon: 14,
        gap: 'gap-1',
      },
    };

    const currentSize = sizeStyles[size];

    const getLabelColor = () => {
      if (disabled) return tokens.text.disabled;
      return tokens.text.label;
    };

    const getIconColor = () => {
      if (disabled) return tokens.text.disabled;
      return tokens.text.icon;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md border',
          currentSize.padding,
          currentSize.gap,
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        style={{
          backgroundColor: tokens.bg.chip,
          borderColor: tokens.border.default,
        }}
        {...props}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={disabled}
            className={cn(
              'flex items-center justify-center shrink-0 transition-opacity',
              !disabled && 'hover:opacity-70'
            )}
            aria-label={`Remove ${label}`}
          >
            <Close
              size={currentSize.closeIcon}
              color={getLabelColor()}
              variant="Linear"
            />
          </button>
        )}

        <span
          className={cn(currentSize.text, 'font-medium')}
          style={{ color: getLabelColor() }}
        >
          {label}
        </span>

        {showAvatar && (
          <div
            className={cn(
              'flex items-center justify-center shrink-0 rounded',
              currentSize.avatar
            )}
            style={{ backgroundColor: tokens.bg.avatar }}
          >
            {avatarContent ? (
              avatarContent
            ) : avatar ? (
              <img
                src={avatar}
                alt={label}
                className="w-full h-full rounded object-cover"
              />
            ) : (
              <User
                size={currentSize.avatarIcon}
                color={getIconColor()}
                variant="Linear"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
