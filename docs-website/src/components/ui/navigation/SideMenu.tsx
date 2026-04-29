'use client';

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight2,
  ArrowLeft2,
  ArrowDown2,
  Logout,
  Flash,
} from 'iconsax-react';
import { Close } from '@/components/icons';

// ============================================================================
// DESIGN TOKENS (from Figma)
// ============================================================================

const tokens = {
  // Dimensions
  expandedWidth: 312,
  collapsedWidth: 80,
  itemHeight: 40,
  iconSize: 20,
  toggleSize: 34,

  // Spacing (in px, mapped to Tailwind)
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  // Radius
  radius: {
    item: 6, // Menu items
    toggle: 8, // Toggle button
    featured: 16, // Featured cards
    full: 500, // Pills/badges
  },

  // Colors (CSS classes)
  colors: {
    // Backgrounds
    bgDefault: 'bg-white dark:bg-neutral-900',
    bgHover: 'bg-neutral-50 dark:bg-neutral-800/50',
    bgActive: 'bg-neutral-100 dark:bg-neutral-800',
    bgFeatured: 'bg-neutral-100 dark:bg-neutral-800',
    bgDanger: 'bg-red-500',
    bgDangerLight: 'bg-red-50 dark:bg-red-900/20',
    bgSuccess: 'bg-emerald-500',
    bgSuccessLight: 'bg-emerald-50 dark:bg-emerald-900/20',
    bgWarningLight: 'bg-amber-50 dark:bg-amber-900/20',

    // Text
    textPrimary: 'text-neutral-900 dark:text-neutral-50',
    textSecondary: 'text-neutral-500 dark:text-neutral-400',
    textDanger: 'text-red-600 dark:text-red-400',
    textOnColor: 'text-white',

    // Borders
    borderDefault: 'border-neutral-200 dark:border-neutral-700',
    borderSubtle: 'border-neutral-100 dark:border-neutral-800',

    // Icons
    iconDefault: 'text-neutral-500 dark:text-neutral-400',
    iconPrimary: 'text-neutral-900 dark:text-neutral-50',
  },
};

// ============================================================================
// CONTEXT
// ============================================================================

interface SideMenuContextValue {
  expanded: boolean;
  isRTL: boolean;
}

const SideMenuContext = createContext<SideMenuContextValue>({
  expanded: true,
  isRTL: false,
});

export const useSideMenu = () => useContext(SideMenuContext);

// ============================================================================
// TYPES
// ============================================================================

export interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls expanded (full width) or collapsed (icon only) state */
  expanded?: boolean;
  /** Callback when toggle button is clicked */
  onToggle?: () => void;
  /** Children (SideMenuHeader, SideMenuContent, SideMenuFooter) */
  children?: React.ReactNode;
}

export interface SideMenuHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo element to display */
  logo?: React.ReactNode;
  /** Collapsed logo (icon only) */
  logoCollapsed?: React.ReactNode;
  /** Show toggle button */
  showToggle?: boolean;
  /** Toggle callback */
  onToggle?: () => void;
}

export interface SideMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SideMenuFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SideMenuSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional section title (shown in expanded mode only) */
  title?: string;
  /** Children (SideMenuItem components) */
  children?: React.ReactNode;
}

export interface SideMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface SideMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon component (iconsax-react) - pass the component, e.g. Home2 */
  icon: React.ComponentType<{ size?: number; variant?: 'Linear' | 'Bold' | 'Outline' | 'Broken' | 'Bulk' | 'TwoTone'; color?: string }>;
  /** Menu item label */
  label: string;
  /** Whether item is currently active/selected */
  active?: boolean;
  /** Badge count (notification count) */
  badge?: number;
  /** Whether item has a submenu (shows chevron) */
  hasSubmenu?: boolean;
  /** Callback when item is clicked */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface SideMenuExpandableItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon component (iconsax-react) */
  icon: React.ComponentType<{ size?: number; variant?: 'Linear' | 'Bold' | 'Outline' | 'Broken' | 'Bulk' | 'TwoTone'; color?: string }>;
  /** Menu item label */
  label: string;
  /** Whether the submenu is expanded */
  defaultExpanded?: boolean;
  /** Badge count */
  badge?: number;
  /** Children (SideMenuSubItem components) */
  children?: React.ReactNode;
}

export interface SideMenuSubItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Sub-item label */
  label: string;
  /** Whether item is currently active/selected */
  active?: boolean;
  /** Badge count */
  badge?: number;
  /** Callback when item is clicked */
  onClick?: () => void;
}

export interface SideMenuLogoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Logout icon component */
  icon?: React.ComponentType<{ size?: number; variant?: 'Linear' | 'Bold' | 'Outline' | 'Broken' | 'Bulk' | 'TwoTone'; color?: string }>;
  /** Logout label */
  label: string;
  /** Callback when logout is clicked */
  onClick?: () => void;
}

export interface SideMenuFeaturedProps extends HTMLAttributes<HTMLDivElement> {
  /** Featured card variant */
  variant: 'progress' | 'upgrade' | 'announcement';
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Progress percentage (0-100) for progress variant */
  progress?: number;
  /** Image URL for announcement variant */
  imageUrl?: string;
  /** Primary action label */
  primaryAction?: string;
  /** Primary action callback */
  onPrimaryAction?: () => void;
  /** Secondary action label */
  secondaryAction?: string;
  /** Secondary action callback */
  onSecondaryAction?: () => void;
  /** Dismiss callback */
  onDismiss?: () => void;
}

// ============================================================================
// SIDE MENU (Main Container)
// ============================================================================

export const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
  ({ expanded = true, onToggle, children, className, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [isRTL, setIsRTL] = useState(false);

    // Detect RTL from the computed direction of the element (inherits from parent)
    useEffect(() => {
      const element = internalRef.current;
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        setIsRTL(computedStyle.direction === 'rtl');
      }
    }, []);

    // Combine refs
    const combinedRef = (node: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <SideMenuContext.Provider value={{ expanded, isRTL }}>
        <div
          ref={combinedRef}
          className={cn(
            'flex flex-col h-full transition-all duration-300 ease-in-out',
            // overflow-visible allows toggle button to appear outside container when collapsed
            // rounded-xl applies to background, overflow-visible lets positioned children overflow
            'overflow-visible rounded-xl',
            tokens.colors.bgDefault,
            className
          )}
          style={{
            width: expanded ? tokens.expandedWidth : tokens.collapsedWidth,
          }}
          {...props}
        >
          {/* Pass onToggle to children via cloning if needed */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SideMenuHeader) {
              return React.cloneElement(child as React.ReactElement<SideMenuHeaderProps>, {
                onToggle,
              });
            }
            return child;
          })}
        </div>
      </SideMenuContext.Provider>
    );
  }
);

SideMenu.displayName = 'SideMenu';

// ============================================================================
// SIDE MENU HEADER (Logo + Toggle)
// ============================================================================

export const SideMenuHeader = forwardRef<HTMLDivElement, SideMenuHeaderProps>(
  ({ logo, logoCollapsed, showToggle = true, onToggle, className, ...props }, ref) => {
    const { expanded, isRTL } = useSideMenu();
    const { brandColors } = useBrand();

    const ChevronIcon = isRTL ? ArrowLeft2 : ArrowRight2;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center shrink-0 overflow-visible',
          expanded ? 'justify-between px-4 py-4' : 'justify-center px-4 py-8',
          className
        )}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          {expanded ? logo : (logoCollapsed || logo)}
        </div>

        {/* Toggle Button - positioned outside on END side in collapsed mode per Figma */}
        {showToggle && (
          <button
            onClick={onToggle}
            className={cn(
              'flex items-center justify-center shrink-0',
              'w-[34px] h-[34px] rounded-lg',
              tokens.colors.bgDefault,
              'border',
              tokens.colors.borderDefault,
              'hover:bg-neutral-50 dark:hover:bg-neutral-800',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-800',
              // In collapsed mode, position toggle outside on the END side with high z-index
              // CSS logical property 'end' auto-flips: LTR=right, RTL=left
              !expanded && 'absolute top-1/2 -translate-y-1/2 -end-6 z-50'
            )}
            style={{
              // Focus ring uses brand color
              ['--tw-ring-color' as string]: `${brandColors.primary}33`,
            }}
            aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
          >
            <ChevronIcon
              size={18}
              variant="Linear"
              className={cn(
                'transition-transform duration-300',
                tokens.colors.iconDefault,
                // In expanded mode, rotate to point inward (collapse direction)
                expanded && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>
    );
  }
);

SideMenuHeader.displayName = 'SideMenuHeader';

// ============================================================================
// SIDE MENU CONTENT (Scrollable Area)
// ============================================================================

export const SideMenuContent = forwardRef<HTMLDivElement, SideMenuContentProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded } = useSideMenu();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col flex-1 overflow-y-auto overflow-x-hidden',
          expanded ? 'gap-2 py-2' : 'gap-2 py-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SideMenuContent.displayName = 'SideMenuContent';

// ============================================================================
// SIDE MENU FOOTER
// ============================================================================

export const SideMenuFooter = forwardRef<HTMLDivElement, SideMenuFooterProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded } = useSideMenu();

    return (
      <div
        ref={ref}
        className={cn(
          'mt-auto shrink-0',
          expanded ? 'px-3 py-4' : 'px-3 py-4 flex justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SideMenuFooter.displayName = 'SideMenuFooter';

// ============================================================================
// SIDE MENU SECTION (Group with optional title)
// ============================================================================

export const SideMenuSection = forwardRef<HTMLDivElement, SideMenuSectionProps>(
  ({ title, children, className, ...props }, ref) => {
    const { expanded } = useSideMenu();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          expanded ? 'gap-1 px-3' : 'gap-1 px-3 items-center',
          className
        )}
        {...props}
      >
        {/* Section Title (expanded only) */}
        {title && expanded && (
          <span
            className={cn(
              'text-xs font-normal leading-[1.5] px-3 py-2',
              tokens.colors.textSecondary
            )}
          >
            {title}
          </span>
        )}

        {/* Menu Items */}
        {children}
      </div>
    );
  }
);

SideMenuSection.displayName = 'SideMenuSection';

// ============================================================================
// SIDE MENU SEPARATOR
// ============================================================================

export const SideMenuSeparator = forwardRef<HTMLDivElement, SideMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { expanded } = useSideMenu();

    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 bg-neutral-100 dark:bg-neutral-800',
          expanded ? 'h-px mx-5 my-2' : 'h-px w-12 mx-auto my-2',
          className
        )}
        {...props}
      />
    );
  }
);

SideMenuSeparator.displayName = 'SideMenuSeparator';

// ============================================================================
// SIDE MENU ITEM
// ============================================================================

export const SideMenuItem = forwardRef<HTMLButtonElement, SideMenuItemProps>(
  (
    {
      icon: Icon,
      label,
      active = false,
      badge,
      hasSubmenu = false,
      onClick,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const { expanded, isRTL } = useSideMenu();
    const { brandColors } = useBrand();

    const ChevronIcon = isRTL ? ArrowLeft2 : ArrowRight2;

    // Colors based on state
    const iconColor = active ? brandColors.primary : undefined;
    const textColor = active ? brandColors.primary : undefined;

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'relative flex items-center gap-2 transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          'focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-800',
          // Expanded mode
          expanded && [
            'w-full px-3 py-2 justify-between',
            'rounded-md',
          ],
          // Collapsed mode
          !expanded && [
            'w-11 h-11 justify-center',
            'rounded-md mx-auto',
          ],
          // States
          active
            ? 'bg-neutral-100 dark:bg-neutral-800'
            : 'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {/* Icon + Label Container */}
        <div className={cn(
          'flex items-center gap-2',
          !expanded && 'justify-center'
        )}>
          {/* Icon */}
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <Icon
              size={20}
              variant={active ? 'Bold' : 'Linear'}
              color={iconColor}
              className={cn(!active && tokens.colors.iconDefault)}
            />
          </div>

          {/* Label (expanded only) */}
          {expanded && (
            <span
              className={cn(
                'text-sm leading-[1.5] truncate',
                active ? 'font-medium' : 'font-normal',
                !active && tokens.colors.textPrimary
              )}
              style={{ color: textColor }}
            >
              {label}
            </span>
          )}
        </div>

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <div
            className={cn(
              'flex items-center justify-center rounded-full text-white text-xs font-normal',
              'bg-red-500',
              expanded
                ? 'h-5 min-w-[20px] px-1.5'
                : 'absolute top-0.5 end-0.5 h-4 min-w-[16px] px-1 text-[10px]'
            )}
          >
            {badge > 99 ? '99' : badge}
          </div>
        )}

        {/* Chevron (expanded + hasSubmenu) */}
        {expanded && hasSubmenu && (
          <ChevronIcon
            size={20}
            variant="Linear"
            className={tokens.colors.iconDefault}
          />
        )}
      </button>
    );
  }
);

SideMenuItem.displayName = 'SideMenuItem';

// ============================================================================
// SIDE MENU EXPANDABLE ITEM (With Submenu)
// ============================================================================

export const SideMenuExpandableItem = forwardRef<HTMLDivElement, SideMenuExpandableItemProps>(
  (
    {
      icon: Icon,
      label,
      defaultExpanded = false,
      badge,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const { expanded: menuExpanded, isRTL } = useSideMenu();
    const { brandColors } = useBrand();
    const [isOpen, setIsOpen] = useState(defaultExpanded);

    const ChevronIcon = isRTL ? ArrowLeft2 : ArrowRight2;

    // In collapsed mode, just show icon
    if (!menuExpanded) {
      return (
        <button
          className={cn(
            'relative flex items-center justify-center',
            'w-11 h-11 rounded-md mx-auto',
            'transition-colors duration-200',
            'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            'focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-800'
          )}
        >
          <Icon
            size={20}
            variant="Linear"
            className={tokens.colors.iconDefault}
          />
          {badge !== undefined && badge > 0 && (
            <div className="absolute top-0.5 end-0.5 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
              {badge > 99 ? '99' : badge}
            </div>
          )}
        </button>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...props}>
        {/* Header Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'relative flex items-center gap-2 w-full px-3 py-2 justify-between',
            'rounded-md transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            'focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-800',
            isOpen
              ? 'bg-neutral-100 dark:bg-neutral-800'
              : 'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
          )}
        >
          {/* Icon + Label */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Icon
                size={20}
                variant={isOpen ? 'Bold' : 'Linear'}
                color={isOpen ? brandColors.primary : undefined}
                className={cn(!isOpen && tokens.colors.iconDefault)}
              />
            </div>
            <span
              className={cn(
                'text-sm leading-[1.5] truncate',
                isOpen ? 'font-medium' : 'font-normal',
                tokens.colors.textPrimary
              )}
              style={{ color: isOpen ? brandColors.primary : undefined }}
            >
              {label}
            </span>
          </div>

          {/* Badge + Chevron */}
          <div className="flex items-center gap-2">
            {badge !== undefined && badge > 0 && (
              <div className="h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-normal">
                {badge > 99 ? '99' : badge}
              </div>
            )}
            <motion.div
              animate={{ rotate: isOpen ? (isRTL ? 90 : -90) : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronIcon
                size={20}
                variant="Linear"
                className={tokens.colors.iconDefault}
              />
            </motion.div>
          </div>
        </button>

        {/* Submenu Items */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-0 mt-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SideMenuExpandableItem.displayName = 'SideMenuExpandableItem';

// ============================================================================
// SIDE MENU SUB ITEM (Child of Expandable)
// ============================================================================

export const SideMenuSubItem = forwardRef<HTMLButtonElement, SideMenuSubItemProps>(
  ({ label, active = false, badge, onClick, className, ...props }, ref) => {
    const { brandColors } = useBrand();

    // Using CSS logical properties (ps-, pe-, start-, end-) which automatically
    // flip based on the inherited `dir` attribute from parent containers.
    // No need for manual isRTL conditionals - CSS handles the flip automatically.

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-between w-full py-2 transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          'focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-800',
          'rounded-md',
          // Per Figma: 24px padding on indicator side (start), 12px on other side (end)
          // CSS logical properties auto-flip for RTL based on inherited dir
          'ps-6 pe-3',
          // Hover state
          'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
          className
        )}
        {...props}
      >
        {/* Indicator Line - positioned at 8px from start side per Figma */}
        {/* Uses CSS logical property 'start-2' which auto-flips for RTL */}
        <div className="absolute top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700 start-2" />

        {/* Active Indicator - 3px wide colored bar */}
        {active && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-sm start-[6px]"
            style={{ backgroundColor: brandColors.primary }}
          />
        )}

        {/* Label */}
        <span
          className={cn(
            'text-xs leading-[1.5] truncate',
            active ? 'font-medium' : 'font-normal',
            active ? tokens.colors.textPrimary : tokens.colors.textSecondary
          )}
          style={{ color: active ? brandColors.primary : undefined }}
        >
          {label}
        </span>

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <div className="h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-normal">
            {badge > 99 ? '99' : badge}
          </div>
        )}
      </button>
    );
  }
);

SideMenuSubItem.displayName = 'SideMenuSubItem';

// ============================================================================
// SIDE MENU LOGOUT
// ============================================================================

export const SideMenuLogout = forwardRef<HTMLButtonElement, SideMenuLogoutProps>(
  ({ icon: Icon = Logout, label, onClick, className, ...props }, ref) => {
    const { expanded } = useSideMenu();

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          'focus-visible:ring-red-200 dark:focus-visible:ring-red-800',
          expanded
            ? 'px-3 py-2.5 justify-start w-full rounded-md'
            : 'w-11 h-11 justify-center mx-auto rounded-md',
          'hover:bg-red-50 dark:hover:bg-red-900/20',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <Icon size={20} variant="Linear" className="text-red-600 dark:text-red-400" />
        </div>

        {/* Label (expanded only) */}
        {expanded && (
          <span className="text-sm leading-[1.5] font-medium text-red-600 dark:text-red-400">
            {label}
          </span>
        )}
      </button>
    );
  }
);

SideMenuLogout.displayName = 'SideMenuLogout';

// ============================================================================
// SIDE MENU FEATURED (Progress / Upgrade / Announcement Cards)
// ============================================================================

export const SideMenuFeatured = forwardRef<HTMLDivElement, SideMenuFeaturedProps>(
  (
    {
      variant,
      title,
      description,
      progress = 30,
      imageUrl,
      primaryAction,
      onPrimaryAction,
      secondaryAction,
      onSecondaryAction,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const { expanded, isRTL } = useSideMenu();
    const { brandColors } = useBrand();

    // Don't show in collapsed mode
    if (!expanded) return null;

    return (
      <div
        ref={ref}
        dir={isRTL ? 'rtl' : 'ltr'}
        className={cn(
          'relative flex flex-col gap-4 p-4 mx-3 rounded-2xl overflow-hidden',
          'bg-neutral-100 dark:bg-neutral-800',
          className
        )}
        {...props}
      >
        {/* Dismiss Button (for progress and upgrade) */}
        {(variant === 'progress' || variant === 'upgrade') && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'absolute top-2 p-2 rounded-lg transition-colors',
              'hover:bg-neutral-200 dark:hover:bg-neutral-700',
              'end-2' // Uses logical property, auto-flips for RTL
            )}
          >
            <Close size={20} variant="Linear" className={tokens.colors.iconDefault} />
          </button>
        )}

        {/* Progress Variant */}
        {variant === 'progress' && (
          <>
            <div className="flex flex-col gap-0.5">
              <h4 className={cn(
                'text-lg font-semibold leading-[1.5]',
                tokens.colors.textPrimary
              )}>
                {title}
              </h4>
              <p className={cn(
                'text-sm font-normal leading-[1.5]',
                tokens.colors.textSecondary
              )}>
                {description}
              </p>
            </div>
            {/* Progress Bar - reversed in RTL */}
            <div className={cn(
              'flex items-center gap-2',
              isRTL && 'flex-row-reverse'
            )}>
              <span className={cn('text-sm font-medium', tokens.colors.textSecondary)}>
                {progress}%
              </span>
              <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-300',
                    isRTL && 'ms-auto' // Align progress bar to end in RTL
                  )}
                  style={{
                    width: `${progress}%`,
                    backgroundColor: brandColors.primary,
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Upgrade Variant */}
        {variant === 'upgrade' && (
          <>
            {/* Icon Container */}
            <div className="flex">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${brandColors.secondary}20` }}
              >
                <Flash
                  size={24}
                  variant="Bold"
                  style={{ color: brandColors.secondary }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className={cn(
                'text-lg font-semibold leading-[1.5]',
                tokens.colors.textPrimary
              )}>
                {title}
              </h4>
              <p className={cn(
                'text-sm font-normal leading-[1.5]',
                tokens.colors.textSecondary
              )}>
                {description}
              </p>
            </div>
            {/* CTA Button */}
            {primaryAction && (
              <button
                onClick={onPrimaryAction}
                className={cn(
                  'w-full py-2 px-3 rounded-xl text-sm font-medium',
                  'transition-colors duration-200',
                  'shadow-sm',
                  'hover:opacity-90'
                )}
                style={{
                  backgroundColor: `${brandColors.primary}20`,
                  color: brandColors.primary,
                }}
              >
                {primaryAction}
              </button>
            )}
          </>
        )}

        {/* Announcement Variant */}
        {variant === 'announcement' && (
          <>
            {/* Media Image */}
            {imageUrl && (
              <div className="w-full h-32 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h4 className={cn(
                'text-sm font-semibold leading-[1.5]',
                tokens.colors.textPrimary
              )}>
                {title}
              </h4>
              <p className={cn(
                'text-xs font-normal leading-[1.5]',
                tokens.colors.textSecondary
              )}>
                {description}
              </p>
            </div>
            {/* Action Links */}
            {(primaryAction || secondaryAction) && (
              <div className="flex gap-4">
                {secondaryAction && (
                  <button
                    onClick={onSecondaryAction}
                    className={cn(
                      'text-sm font-semibold underline',
                      tokens.colors.textSecondary
                    )}
                  >
                    {secondaryAction}
                  </button>
                )}
                {primaryAction && (
                  <button
                    onClick={onPrimaryAction}
                    className="text-sm font-semibold underline"
                    style={{ color: brandColors.primary }}
                  >
                    {primaryAction}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

SideMenuFeatured.displayName = 'SideMenuFeatured';

// ============================================================================
// EXPORTS
// ============================================================================

export default SideMenu;
