'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState, createContext, useContext, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { ArrowDown2 } from 'iconsax-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// Accordion Context for single-item-at-a-time behavior
// ============================================================================

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

// ============================================================================
// Accordion Container Component
// ============================================================================

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items to be expanded simultaneously */
  allowMultiple?: boolean;
  /** Index of item to expand by default (single mode only) */
  defaultExpandedIndex?: number;
  /** Array of item IDs to expand by default */
  defaultExpandedIds?: string[];
  children: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    className, 
    allowMultiple = false, 
    defaultExpandedIndex,
    defaultExpandedIds = [],
    children, 
    ...props 
  }, ref) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
      const initial = new Set<string>(defaultExpandedIds);
      return initial;
    });

    const toggleItem = (id: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    };

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// ============================================================================
// AccordionItem Variants
// ============================================================================

const accordionItemVariants = cva(
  'flex flex-col rounded-2xl border transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800',
        hover: 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800',
        disabled: 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ============================================================================
// AccordionItem Component
// ============================================================================

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the item */
  itemId?: string;
  /** Title text (English) */
  title: string;
  /** Title text (Arabic) */
  titleAr?: string;
  /** Description/content text (English) */
  description?: string;
  /** Description/content text (Arabic) */
  descriptionAr?: string;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show leading icon on the trailing side */
  showLeadingIcon?: boolean;
  /** Leading icon element */
  leadingIcon?: ReactNode;
  /** Callback when expanded state changes */
  onToggle?: (expanded: boolean) => void;
  /** Custom content (alternative to description) */
  children?: ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({
    className,
    itemId,
    title,
    titleAr,
    description,
    descriptionAr,
    expanded: controlledExpanded,
    defaultExpanded = false,
    disabled = false,
    showLeadingIcon = false,
    leadingIcon,
    onToggle,
    children,
    ...props
  }, ref) => {
    const { isArabic } = useBrand();
    const generatedId = useId();
    const id = itemId || generatedId;
    
    // Try to use context (when inside Accordion wrapper)
    const context = useContext(AccordionContext);
    
    // Local state for standalone usage
    const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
    const [isHovered, setIsHovered] = useState(false);
    
    // Determine if expanded (controlled > context > local)
    const isExpanded = controlledExpanded !== undefined
      ? controlledExpanded
      : context
        ? context.expandedItems.has(id)
        : localExpanded;
    
    // Determine visual state
    const state = disabled ? 'disabled' : isHovered ? 'hover' : 'default';
    
    // Handle toggle
    const handleToggle = () => {
      if (disabled) return;
      
      const newExpanded = !isExpanded;
      
      if (controlledExpanded === undefined) {
        if (context) {
          context.toggleItem(id);
        } else {
          setLocalExpanded(newExpanded);
        }
      }
      
      onToggle?.(newExpanded);
    };
    
    // Display text based on language
    const displayTitle = isArabic ? (titleAr || title) : title;
    const displayDescription = isArabic ? (descriptionAr || description) : description;
    
    return (
      <div
        ref={ref}
        className={cn(accordionItemVariants({ state }), className)}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Header */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={cn(
            'flex items-center gap-4 w-full p-4 text-start',
            isArabic && 'flex-row-reverse text-end',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
          aria-expanded={isExpanded}
          aria-controls={`accordion-content-${id}`}
        >
          {/* Leading Icon (on leading side) */}
          {showLeadingIcon && leadingIcon && (
            <div className="shrink-0">
              {leadingIcon}
            </div>
          )}
          
          {/* Title */}
          <span
            className={cn(
              'flex-1 font-semibold text-base leading-relaxed',
              disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
            )}
          >
            {displayTitle}
          </span>
          
          {/* Chevron Icon (on trailing side) */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="shrink-0"
          >
            <ArrowDown2
              size={20}
              variant="Linear"
              className={cn(
                'transition-colors',
                disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
              )}
            />
          </motion.div>
        </button>
        
        {/* Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={`accordion-content-${id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div 
                className={cn(
                  'px-4 pb-4',
                  isArabic ? 'text-end' : 'text-start'
                )}
              >
                {children || (
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {displayDescription}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export default Accordion;

