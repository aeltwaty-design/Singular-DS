import React, { forwardRef, HTMLAttributes, ReactNode, ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { InfoCircle, More } from 'iconsax-react';

// ============================================================================
// DESIGN TOKENS (Figma specs)
// ============================================================================

const tokens = {
  typography: {
    xl: {
      title: 'text-2xl font-semibold leading-[1.4]',
      supporting: 'text-base leading-[1.5]',
    },
    lg: {
      title: 'text-xl font-semibold leading-[1.4]',
      supporting: 'text-sm leading-[1.5]',
    },
    md: {
      title: 'text-base font-semibold leading-[1.5]',
      supporting: 'text-xs leading-[1.5]',
    },
    sm: {
      title: 'text-sm font-semibold leading-[1.5]',
      supporting: 'text-xs leading-[1.5]',
    },
  },

  gaps: {
    xl: {
      container: 'gap-0.5',
      titleRow: 'gap-2',
      titleContent: 'gap-1.5',
    },
    lg: {
      container: 'gap-0',
      titleRow: 'gap-2',
      titleContent: 'gap-1.5',
    },
    md: {
      container: 'gap-0',
      titleRow: 'gap-2',
      titleContent: 'gap-1.5',
    },
    sm: {
      container: 'gap-2',
      titleRow: 'gap-2',
      titleContent: 'gap-1.5',
    },
  },

  iconSize: {
    leading: 18,
    help: 12,
    trailing: 18,
  },

  colors: {
    title: 'text-neutral-900 dark:text-white',
    supporting: 'text-neutral-600 dark:text-neutral-400 opacity-80',
    icon: 'text-neutral-600 dark:text-neutral-400',
    separator: 'bg-neutral-100 dark:bg-neutral-800',
  },

  trailingAction: {
    xl: 'text-sm font-semibold leading-[1.5]',
    lg: 'text-sm font-semibold leading-[1.5]',
    md: 'text-xs font-medium leading-[1.5]',
    sm: 'text-xs font-medium leading-[1.5]',
  },

  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  },
};

// ============================================================================
// TYPES
// ============================================================================

type IconComponent = ComponentType<{
  size?: number;
  variant?: 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken';
  className?: string;
}>;

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Main title text */
  title: string;
  /** Supporting description text below title */
  supportingText?: string;
  /** Size variant: xl (24px), lg (20px), md (16px), sm (14px) */
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /** Leading icon component displayed before the title */
  leadingIcon?: IconComponent;
  /** Show help icon (question mark) after the title */
  showHelpIcon?: boolean;
  /** Trailing action text (hyperlink style) */
  trailingAction?: string;
  /** Callback when trailing action is clicked */
  onTrailingActionClick?: () => void;
  /** Show help icon after the trailing action */
  showTrailingHelpIcon?: boolean;
  /** Trailing icon component (e.g., menu icon) */
  trailingIcon?: IconComponent;
  /** Callback when trailing icon is clicked */
  onTrailingIconClick?: () => void;
  /** Show bottom separator line */
  showSeparator?: boolean;
}

// ============================================================================
// HELP ICON COMPONENT
// ============================================================================

interface HelpIconProps {
  brandPrimary: string;
  onClick?: () => void;
}

const HelpIcon = ({ brandPrimary, onClick }: HelpIconProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center justify-center shrink-0',
      tokens.colors.icon,
      'hover:opacity-80 transition-opacity',
      tokens.focus.ring
    )}
    style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
    aria-label="Help"
  >
    <InfoCircle size={tokens.iconSize.help} variant="Linear" />
  </button>
);

// ============================================================================
// SEPARATOR COMPONENT
// ============================================================================

const Separator = () => (
  <div className={cn('w-full h-px', tokens.colors.separator)} />
);

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      supportingText,
      size = 'lg',
      leadingIcon: LeadingIcon,
      showHelpIcon = false,
      trailingAction,
      onTrailingActionClick,
      showTrailingHelpIcon = false,
      trailingIcon: TrailingIcon,
      onTrailingIconClick,
      showSeparator = false,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    const sizeConfig = tokens.typography[size];
    const gapConfig = tokens.gaps[size];

    const showSupportingText =
      supportingText && (size === 'xl' || size === 'lg');

    return (
      <div
        ref={ref}
        className={cn('flex flex-col w-full', gapConfig.container, className)}
        {...props}
      >
        <div className="flex flex-col w-full items-start">
          <div
            className={cn(
              'flex items-center w-full',
              gapConfig.titleRow
            )}
          >
            <div
              className={cn(
                'flex items-center flex-1 min-w-0',
                gapConfig.titleContent
              )}
            >
              {LeadingIcon && (
                <div className="flex items-center justify-center shrink-0">
                  <LeadingIcon
                    size={tokens.iconSize.leading}
                    variant="Linear"
                    className={tokens.colors.icon}
                  />
                </div>
              )}

              <h2
                className={cn(
                  sizeConfig.title,
                  tokens.colors.title,
                  'truncate'
                )}
              >
                {title}
              </h2>

              {showHelpIcon && (
                <HelpIcon brandPrimary={brandColors.primary} />
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {trailingAction && (
                <button
                  onClick={onTrailingActionClick}
                  className={cn(
                    tokens.trailingAction[size],
                    'underline transition-opacity hover:opacity-80',
                    tokens.focus.ring
                  )}
                  style={{
                    color: brandColors.primary,
                    ['--tw-ring-color' as string]: `${brandColors.primary}33`,
                  }}
                >
                  {trailingAction}
                </button>
              )}

              {showTrailingHelpIcon && (
                <HelpIcon brandPrimary={brandColors.primary} />
              )}

              {TrailingIcon && (
                <button
                  onClick={onTrailingIconClick}
                  className={cn(
                    'flex items-center justify-center shrink-0',
                    tokens.colors.icon,
                    'hover:opacity-80 transition-opacity',
                    tokens.focus.ring
                  )}
                  style={{
                    ['--tw-ring-color' as string]: `${brandColors.primary}33`,
                  }}
                  aria-label="More options"
                >
                  <TrailingIcon size={tokens.iconSize.trailing} variant="Linear" />
                </button>
              )}
            </div>
          </div>

          {showSupportingText && (
            <p
              className={cn(
                sizeConfig.supporting,
                tokens.colors.supporting,
                'w-full'
              )}
            >
              {supportingText}
            </p>
          )}

          {supportingText && (size === 'md' || size === 'sm') && (
            <p
              className={cn(
                sizeConfig.supporting,
                tokens.colors.supporting,
                'w-full'
              )}
            >
              {supportingText}
            </p>
          )}
        </div>

        {showSeparator && (
          <div className="mt-3">
            <Separator />
          </div>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
