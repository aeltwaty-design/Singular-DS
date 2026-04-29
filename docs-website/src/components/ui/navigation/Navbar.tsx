'use client';

import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useContext,
  ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { SearchNormal1 } from 'iconsax-react';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

const tokens = {
  // Layout
  primaryRowHeight: 'h-[72px]',
  secondaryRowHeight: 'h-[64px]',
  containerPadding: 'px-8', // 32px

  // Navigation Item
  navItem: {
    padding: 'px-3 py-2', // 12px, 8px
    radius: 'rounded-md', // 6px
    gap: 'gap-1', // 4px between items
    typography: 'text-sm', // 14px
  },

  // Action Icon
  actionIcon: {
    size: 'w-10 h-10', // 40px
    padding: 'p-2.5', // 10px
    iconSize: 20,
    radius: 'rounded-md',
  },

  // Badge
  badge: {
    height: 'h-4', // 16px
    minWidth: 'min-w-[16px]',
    padding: 'px-1', // 4px
    bg: 'bg-red-600',
    text: 'text-white text-xs',
    radius: 'rounded-full',
  },

  // CTA Button
  cta: {
    padding: 'px-4 py-2.5', // 16px, 10px
    radius: 'rounded-xl', // 12px
    iconSize: 20,
    gap: 'gap-2', // 8px
  },

  // Search
  search: {
    width: 'w-80', // 320px
    height: 'h-[38px]',
    padding: 'px-3 py-2.5',
    radius: 'rounded-lg', // 8px
  },

  // Colors
  colors: {
    default: 'bg-white dark:bg-neutral-900',
    selected: 'bg-neutral-100 dark:bg-neutral-800',
    text: 'text-neutral-900 dark:text-neutral-100',
    textSecondary: 'text-neutral-500 dark:text-neutral-400',
    border: 'border-neutral-200 dark:border-neutral-700',
    divider: 'border-neutral-100 dark:border-neutral-800',
    icon: 'text-neutral-600 dark:text-neutral-400',
  },

  // Focus ring
  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  },
};

// =============================================================================
// CONTEXT
// =============================================================================

interface NavbarContextValue {
  type: 'simple' | 'dual-tier';
  brandPrimary: string;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbarContext() {
  const context = useContext(NavbarContext);
  // Return default values if used outside of Navbar (e.g., in documentation)
  if (!context) {
    return {
      type: 'simple' as const,
      brandPrimary: '#00CE8B', // Default WalaPlus primary color
    };
  }
  return context;
}

// =============================================================================
// NAVBAR ROOT
// =============================================================================

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Type variant: simple (single-tier) or dual-tier (with sub-navigation) */
  type?: 'simple' | 'dual-tier';
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, type = 'simple', children, ...props }, ref) => {
    const { brandColors } = useBrand();

    return (
      <NavbarContext.Provider value={{ type, brandPrimary: brandColors.primary }}>
        <nav
          ref={ref}
          className={cn('w-full bg-white dark:bg-neutral-900', className)}
          {...props}
        >
          {children}
        </nav>
      </NavbarContext.Provider>
    );
  }
);

Navbar.displayName = 'Navbar';

// =============================================================================
// NAVBAR PRIMARY ROW
// =============================================================================

export interface NavbarPrimaryRowProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarPrimaryRow = forwardRef<HTMLDivElement, NavbarPrimaryRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between',
          tokens.primaryRowHeight,
          tokens.containerPadding,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarPrimaryRow.displayName = 'NavbarPrimaryRow';

// =============================================================================
// NAVBAR SECONDARY ROW (for dual-tier)
// =============================================================================

export interface NavbarSecondaryRowProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarSecondaryRow = forwardRef<HTMLDivElement, NavbarSecondaryRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <>
        {/* Divider */}
        <div className={cn('w-full h-px', tokens.colors.divider, 'border-t')} />
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-between',
            tokens.secondaryRowHeight,
            tokens.containerPadding,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

NavbarSecondaryRow.displayName = 'NavbarSecondaryRow';

// =============================================================================
// NAVBAR BRAND
// =============================================================================

export interface NavbarBrandProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo element (image or icon) */
  logo?: ReactNode;
  /** Brand name text */
  name?: string;
  /** Link href */
  href?: string;
}

export const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, logo, name, href, children, ...props }, ref) => {
    const content = children || (
      <>
        {logo}
        {name && (
          <span className="font-semibold text-neutral-900 dark:text-white">
            {name}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <div ref={ref} className={cn('shrink-0', className)} {...props}>
          <a
            href={href}
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
          >
            {content}
          </a>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2.5 shrink-0', className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);

NavbarBrand.displayName = 'NavbarBrand';

// =============================================================================
// NAVBAR NAVIGATION
// =============================================================================

export interface NavbarNavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarNavigation = forwardRef<HTMLDivElement, NavbarNavigationProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center', tokens.navItem.gap, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarNavigation.displayName = 'NavbarNavigation';

// =============================================================================
// NAVBAR ITEM
// =============================================================================

export interface NavbarItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether the item is currently selected/active */
  selected?: boolean;
  /** Link href (renders as anchor) */
  href?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const NavbarItem = forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ className, selected, href, disabled, children, onClick, ...props }, ref) => {
    const { brandPrimary } = useNavbarContext();

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      tokens.navItem.padding,
      tokens.navItem.radius,
      tokens.navItem.typography,
      'transition-colors duration-200',
      tokens.focus.ring,
      // State-based styling
      selected
        ? [tokens.colors.selected, 'font-medium']
        : [tokens.colors.default, 'font-normal', 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'],
      disabled && 'opacity-50 cursor-not-allowed',
      tokens.colors.text,
      className
    );

    const style = {
      ['--tw-ring-color' as string]: `${brandPrimary}33`,
    };

    if (href && !disabled) {
      return (
        <a
          href={href}
          className={baseClasses}
          style={style}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseClasses}
        style={style}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NavbarItem.displayName = 'NavbarItem';

// =============================================================================
// NAVBAR ACTIONS
// =============================================================================

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarActions.displayName = 'NavbarActions';

// =============================================================================
// NAVBAR ACTION ICONS GROUP
// =============================================================================

export interface NavbarActionIconsProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarActionIcons = forwardRef<HTMLDivElement, NavbarActionIconsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarActionIcons.displayName = 'NavbarActionIcons';

// =============================================================================
// NAVBAR ACTION ICON
// =============================================================================

export interface NavbarActionIconProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon element */
  icon: ReactNode;
  /** Badge count (optional) */
  badge?: number;
  /** Accessible label */
  label: string;
}

export const NavbarActionIcon = forwardRef<HTMLButtonElement, NavbarActionIconProps>(
  ({ className, icon, badge, label, ...props }, ref) => {
    const { brandPrimary } = useNavbarContext();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center',
          tokens.actionIcon.size,
          tokens.actionIcon.padding,
          tokens.actionIcon.radius,
          tokens.colors.default,
          tokens.colors.icon,
          'hover:bg-neutral-50 dark:hover:bg-neutral-800',
          'transition-colors duration-200',
          tokens.focus.ring,
          className
        )}
        style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
        aria-label={label}
        {...props}
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <span
            className={cn(
              'absolute -top-0.5 -right-0.5',
              'inline-flex items-center justify-center',
              tokens.badge.height,
              tokens.badge.minWidth,
              tokens.badge.padding,
              tokens.badge.bg,
              tokens.badge.text,
              tokens.badge.radius,
              'font-normal'
            )}
          >
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    );
  }
);

NavbarActionIcon.displayName = 'NavbarActionIcon';

// =============================================================================
// NAVBAR CTA
// =============================================================================

export interface NavbarCTAProps extends HTMLAttributes<HTMLButtonElement> {
  /** Leading icon */
  icon?: ReactNode;
  /** Link href (renders as anchor) */
  href?: string;
}

export const NavbarCTA = forwardRef<HTMLButtonElement, NavbarCTAProps>(
  ({ className, icon, href, children, ...props }, ref) => {
    const { brandPrimary } = useNavbarContext();

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      tokens.cta.padding,
      tokens.cta.radius,
      tokens.cta.gap,
      'bg-white dark:bg-neutral-900',
      'border',
      tokens.colors.border,
      tokens.colors.text,
      tokens.navItem.typography,
      'font-medium',
      'hover:bg-neutral-50 dark:hover:bg-neutral-800',
      'transition-colors duration-200',
      tokens.focus.ring,
      className
    );

    const style = {
      ['--tw-ring-color' as string]: `${brandPrimary}33`,
    };

    const content = (
      <>
        {icon}
        {children}
      </>
    );

    if (href) {
      return (
        <a href={href} className={baseClasses} style={style}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseClasses}
        style={style}
        {...props}
      >
        {content}
      </button>
    );
  }
);

NavbarCTA.displayName = 'NavbarCTA';

// =============================================================================
// NAVBAR SEARCH
// =============================================================================

export interface NavbarSearchProps extends HTMLAttributes<HTMLDivElement> {
  /** Placeholder text */
  placeholder?: string;
  /** Value */
  value?: string;
  /** onChange handler */
  onValueChange?: (value: string) => void;
}

export const NavbarSearch = forwardRef<HTMLDivElement, NavbarSearchProps>(
  ({ className, placeholder = 'Search...', value, onValueChange, ...props }, ref) => {
    const { brandPrimary } = useNavbarContext();

    return (
      <div
        ref={ref}
        className={cn(tokens.search.width, className)}
        {...props}
      >
        <div
          className={cn(
            'flex items-center',
            tokens.search.height,
            tokens.search.padding,
            tokens.search.radius,
            'bg-white dark:bg-neutral-900',
            'border',
            tokens.colors.border,
            'gap-2'
          )}
        >
          <SearchNormal1
            size={16}
            className="text-neutral-400 dark:text-neutral-500 shrink-0"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            className={cn(
              'flex-1 bg-transparent border-none outline-none',
              'text-xs text-neutral-900 dark:text-neutral-100',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
            )}
            style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
          />
        </div>
      </div>
    );
  }
);

NavbarSearch.displayName = 'NavbarSearch';

// =============================================================================
// NAVBAR CONTENT GROUP (Left side: Brand + Navigation)
// =============================================================================

export interface NavbarContentProps extends HTMLAttributes<HTMLDivElement> {}

export const NavbarContent = forwardRef<HTMLDivElement, NavbarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarContent.displayName = 'NavbarContent';

export default Navbar;

