'use client';

import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

const tokens = {
  // Typography sizes
  typography: {
    sm: 'text-xs', // 12px
    md: 'text-sm', // 14px
    lg: 'text-base', // 16px
  },
  // Icon sizes
  iconSize: {
    sm: 16,
    md: 18,
    lg: 20,
  },
  // Colors
  colors: {
    default: 'text-neutral-900 dark:text-neutral-100',
    hover: '', // Will use brand color
    selected: '', // Will use brand color
    disabled: 'text-neutral-400 dark:text-neutral-500',
  },
  // Badge
  badge: {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    bgDisabled: 'bg-neutral-100/50 dark:bg-neutral-800/50',
    text: 'text-neutral-900 dark:text-neutral-100',
    textDisabled: 'text-neutral-400 dark:text-neutral-500',
  },
  // Spacing
  spacing: {
    gap: 'gap-1', // 4px
    paddingY: 'py-2', // 8px
  },
  // Focus ring
  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  },
};

// =============================================================================
// CONTEXT
// =============================================================================

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  size: 'sm' | 'md' | 'lg';
  brandPrimary: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// =============================================================================
// TABS ROOT
// =============================================================================

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** The default selected tab value */
  defaultValue: string;
  /** Controlled value for the selected tab */
  value?: string;
  /** Callback when the selected tab changes */
  onValueChange?: (value: string) => void;
  /** Size variant for all tabs */
  size?: 'sm' | 'md' | 'lg';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, size = 'md', children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const { brandColors } = useBrand();
    const activeTab = value ?? internalValue;

    const setActiveTab = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{ activeTab, setActiveTab, size, brandPrimary: brandColors.primary }}
      >
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// =============================================================================
// TABS LIST
// =============================================================================

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('relative inline-flex items-center gap-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// =============================================================================
// TAB TRIGGER
// =============================================================================

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Unique value for this tab */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Optional badge count */
  badge?: number;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled, icon, badge, children, ...props }, ref) => {
    const { activeTab, setActiveTab, size, brandPrimary } = useTabsContext();
    const isActive = activeTab === value;
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(buttonRef.current);
        } else {
          ref.current = buttonRef.current;
        }
      }
    }, [ref]);

    // Get typography class based on size
    const typographyClass = tokens.typography[size];
    const iconSize = tokens.iconSize[size];

    // Determine text color based on state
    const getTextColor = () => {
      if (disabled) return tokens.colors.disabled;
      if (isActive) return ''; // Will use inline style for brand color
      return tokens.colors.default;
    };

    return (
      <button
        ref={buttonRef}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={`panel-${value}`}
        disabled={disabled}
        onClick={() => !disabled && setActiveTab(value)}
        className={cn(
          'relative inline-flex items-center justify-center',
          tokens.spacing.gap,
          tokens.spacing.paddingY,
          'px-0.5', // Minimal horizontal padding for ink bar alignment
          typographyClass,
          'transition-colors duration-200',
          tokens.focus.ring,
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          // Text color
          getTextColor(),
          // Hover state (only when not disabled and not active)
          !disabled && !isActive && 'hover:text-emerald-600 dark:hover:text-emerald-400',
          // Font weight
          isActive ? 'font-semibold' : 'font-normal',
          className
        )}
        style={{
          ['--tw-ring-color' as string]: `${brandPrimary}33`,
          ...(isActive && !disabled ? { color: brandPrimary } : {}),
        }}
        {...props}
      >
        {/* Leading Icon */}
        {icon && (
          <span
            className={cn('shrink-0', disabled && 'opacity-50')}
            style={{
              width: iconSize,
              height: iconSize,
              ...(isActive && !disabled ? { color: brandPrimary } : {}),
            }}
          >
            {icon}
          </span>
        )}

        {/* Label */}
        <span>{children}</span>

        {/* Badge */}
        {badge !== undefined && badge !== null && (
          <span
            className={cn(
              'inline-flex items-center justify-center',
              'px-2 rounded-full',
              'text-xs leading-[1.5]',
              disabled ? tokens.badge.bgDisabled : tokens.badge.bg,
              disabled ? tokens.badge.textDisabled : tokens.badge.text
            )}
          >
            {badge > 99 ? '99+' : badge}
          </span>
        )}

        {/* Ink Bar Indicator */}
        {isActive && !disabled && (
          <motion.div
            layoutId="tabs-ink-bar"
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: brandPrimary }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// =============================================================================
// TAB CONTENT
// =============================================================================

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding TabsTrigger */
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) {
      return null;
    }

    return (
      <motion.div
        ref={ref}
        role="tabpanel"
        id={`panel-${value}`}
        tabIndex={0}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={cn('mt-4 focus:outline-none', className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export default Tabs;
