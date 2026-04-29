'use client';

import React, { forwardRef, HTMLAttributes, ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { Close } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import design tokens
import { grayLight, grayDark } from '@/tokens/primitives/colors';

/**
 * Tooltip Component
 * 
 * A comprehensive tooltip component based on Figma design (node-4618-1701).
 * Features guided tour functionality with step indicators, navigation controls,
 * multiple positions, and full RTL support.
 * 
 * Variants from Figma:
 * - Position: top, bottom, left, right
 * - Language: English (LTR), Arabic (RTL)
 * - With/without navigation
 * - With/without step counter
 */

// =============================================================================
// TYPES
// =============================================================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /** Trigger element */
  children: ReactNode;
  /** Title text */
  title?: string;
  /** Description/body content */
  content: ReactNode;
  
  /** Show step counter (for guided tours) */
  showSteps?: boolean;
  /** Current step (1-based) */
  currentStep?: number;
  /** Total number of steps */
  totalSteps?: number;
  
  /** Show navigation buttons */
  showNavigation?: boolean;
  /** Label for "Next" button */
  nextLabel?: string;
  /** Label for "Previous" button (shows as arrows in Figma) */
  onNext?: () => void;
  /** Callback when previous is clicked */
  onPrev?: () => void;
  /** Whether previous is disabled (e.g., on first step) */
  prevDisabled?: boolean;
  /** Whether next is disabled (e.g., on last step) */
  nextDisabled?: boolean;
  
  /** Position of tooltip relative to trigger */
  position?: TooltipPosition;
  
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  
  /** How the tooltip is triggered */
  trigger?: TooltipTrigger;
  /** Delay before showing tooltip (ms) - only for hover trigger */
  delayDuration?: number;
  
  /** Width of the tooltip */
  width?: number | string;
  /** Max width of the tooltip */
  maxWidth?: number | string;
  
  /** RTL mode override */
  isRTL?: boolean;
}

// =============================================================================
// TOOLTIP ARROW COMPONENT
// =============================================================================

interface TooltipArrowProps {
  position: TooltipPosition;
  fillColor: string;
}

const TooltipArrow = ({ position, fillColor }: TooltipArrowProps) => {
  // Arrow dimensions: 16px wide, 8px tall
  const getRotation = () => {
    switch (position) {
      case 'top': return 'rotate(180deg)';
      case 'bottom': return 'rotate(0deg)';
      case 'left': return 'rotate(90deg)';
      case 'right': return 'rotate(-90deg)';
      default: return 'rotate(180deg)';
    }
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return { bottom: '-8px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' };
      case 'bottom':
        return { top: '-8px', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { right: '-12px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' };
      case 'right':
        return { left: '-12px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' };
      default:
        return { bottom: '-8px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' };
    }
  };

  return (
    <div
      className="absolute w-4 h-2"
      style={getPositionStyles()}
    >
      <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 8L0 0H16L8 8Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// =============================================================================
// MAIN TOOLTIP COMPONENT
// =============================================================================

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      children,
      title,
      content,
      showSteps = false,
      currentStep = 1,
      totalSteps = 1,
      showNavigation = false,
      nextLabel,
      onNext,
      onPrev,
      prevDisabled = false,
      nextDisabled = false,
      position = 'top',
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      showCloseButton = true,
      trigger = 'hover',
      delayDuration = 300,
      width = 320,
      maxWidth,
      isRTL: isRTLProp,
      style,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    // Detect RTL from document or prop
    const [documentDir, setDocumentDir] = useState<string>('ltr');
    useEffect(() => {
      if (typeof document !== 'undefined') {
        setDocumentDir(document.documentElement.dir || 'ltr');
      }
    }, []);
    const isRTL = isRTLProp ?? documentDir === 'rtl';

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

    // Color tokens
    const bgColor = isDark ? gray[800] : '#FFFFFF';
    const borderColor = isDark ? gray[700] : gray[200];
    const textPrimary = isDark ? gray[50] : gray[900];
    const textSecondary = isDark ? gray[400] : gray[600];
    const textSelected = isDark ? brandPrimary[400] : brandPrimary[500];
    const iconColor = isDark ? gray[300] : gray[700];
    const iconDisabled = isDark ? gray[600] : gray[300];

    // Default labels based on RTL
    const defaultNextLabel = isRTL ? 'التالي' : 'Next';

    // State
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const setOpen = useCallback((newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    }, [isControlled, onOpenChange]);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const handleMouseEnter = useCallback(() => {
      if (trigger !== 'hover') return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, delayDuration);
    }, [trigger, delayDuration, setOpen]);

    const handleMouseLeave = useCallback(() => {
      if (trigger !== 'hover') return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 100);
    }, [trigger, setOpen]);

    const handleClick = useCallback(() => {
      if (trigger !== 'click') return;
      setOpen(!isOpen);
    }, [trigger, isOpen, setOpen]);

    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    // Close on escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    // Position classes for tooltip
    const getTooltipPositionClasses = () => {
      switch (position) {
        case 'top':
          return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
        case 'bottom':
          return 'top-full left-1/2 -translate-x-1/2 mt-3';
        case 'left':
          return 'right-full top-1/2 -translate-y-1/2 me-3';
        case 'right':
          return 'left-full top-1/2 -translate-y-1/2 ms-3';
        default:
          return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
      }
    };

    // Format step counter
    const formatStepCounter = () => {
      if (isRTL) {
        return `${totalSteps} / ${currentStep}`;
      }
      return `${currentStep} / ${totalSteps}`;
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        style={style}
        {...props}
      >
        {/* Trigger */}
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="inline-flex"
        >
          {children}
        </div>

        {/* Tooltip */}
        {isOpen && (
          <div
            ref={tooltipRef}
            className={cn(
              'absolute z-50 animate-in fade-in-0 zoom-in-95 duration-200',
              getTooltipPositionClasses()
            )}
            style={{
              width: typeof width === 'number' ? `${width}px` : width,
              maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Arrow */}
            <TooltipArrow position={position} fillColor={bgColor} />

            {/* Content Container */}
            <div
              className="relative flex flex-col gap-2 p-2 rounded-lg overflow-hidden"
              style={{
                backgroundColor: bgColor,
                boxShadow: '0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
              }}
            >
              {/* Header Row: Step Counter + Close Button */}
              {(showSteps || showCloseButton) && (
                <div className={cn(
                  'flex items-center justify-between w-full',
                  isRTL && 'flex-row-reverse'
                )}>
                  {/* Step Counter */}
                  {showSteps ? (
                    <span
                      className="text-xs leading-6"
                      style={{ color: textSecondary }}
                    >
                      {formatStepCounter()}
                    </span>
                  ) : (
                    <span />
                  )}

                  {/* Close Button */}
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="p-1 rounded-lg hover:opacity-70 transition-opacity -me-1 -mt-1"
                      style={{ color: iconColor }}
                      aria-label="Close tooltip"
                    >
                      <Close variant="Linear" size={18} />
                    </button>
                  )}
                </div>
              )}

              {/* Title and Description */}
              <div
                className={cn(
                  'flex flex-col gap-1 leading-6',
                  isRTL ? 'items-end text-right' : 'items-start text-left'
                )}
              >
                {title && (
                  <p
                    className="text-sm font-semibold leading-6"
                    style={{ color: textPrimary }}
                  >
                    {title}
                  </p>
                )}
                <div
                  className="text-xs leading-6"
                  style={{ color: textSecondary }}
                >
                  {content}
                </div>
              </div>

              {/* Navigation */}
              {showNavigation && (
                <div className="flex items-center justify-between w-full">
                  {/* Navigation Link (Next in English, on left side) */}
                  <button
                    type="button"
                    onClick={isRTL ? undefined : onNext}
                    disabled={isRTL ? false : nextDisabled}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-opacity',
                      (isRTL ? false : nextDisabled) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
                    )}
                    style={{ color: textSelected }}
                  >
                    {!isRTL && (nextLabel || defaultNextLabel)}
                    {isRTL && (
                      <>
                        <ArrowLeft2
                          variant="Linear"
                          size={16}
                          style={{ color: prevDisabled ? iconDisabled : iconColor }}
                        />
                        <ArrowRight2
                          variant="Linear"
                          size={16}
                          style={{ color: nextDisabled ? iconDisabled : iconColor }}
                        />
                      </>
                    )}
                  </button>

                  {/* Arrow buttons (for English) or Next label (for Arabic) */}
                  <button
                    type="button"
                    onClick={isRTL ? onNext : undefined}
                    disabled={isRTL ? nextDisabled : false}
                    className={cn(
                      'flex items-center gap-3 px-2 py-1.5 rounded-lg text-xs font-medium transition-opacity',
                      (isRTL ? nextDisabled : false) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
                    )}
                    style={{ color: isRTL ? textSelected : undefined }}
                  >
                    {isRTL && (nextLabel || defaultNextLabel)}
                    {!isRTL && (
                      <>
                        <button
                          type="button"
                          onClick={onPrev}
                          disabled={prevDisabled}
                          className={cn(
                            'p-0 transition-opacity',
                            prevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
                          )}
                          aria-label="Previous"
                        >
                          <ArrowLeft2
                            variant="Linear"
                            size={16}
                            style={{ color: prevDisabled ? iconDisabled : iconColor }}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={onNext}
                          disabled={nextDisabled}
                          className={cn(
                            'p-0 transition-opacity',
                            nextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
                          )}
                          aria-label="Next"
                        >
                          <ArrowRight2
                            variant="Linear"
                            size={16}
                            style={{ color: nextDisabled ? iconDisabled : iconColor }}
                          />
                        </button>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// =============================================================================
// SIMPLE TOOLTIP (for basic hover tooltips without navigation)
// =============================================================================

export interface SimpleTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Trigger element */
  children: ReactNode;
  /** Tooltip text content */
  content: string;
  /** Position of tooltip */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delayDuration?: number;
}

export const SimpleTooltip = forwardRef<HTMLDivElement, SimpleTooltipProps>(
  (
    {
      children,
      content,
      position = 'top',
      delayDuration = 300,
      className,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const bgColor = isDark ? gray[800] : gray[900];
    const textColor = isDark ? gray[100] : '#FFFFFF';

    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, delayDuration);
    }, [delayDuration]);

    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(false);
    }, []);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const getPositionClasses = () => {
      switch (position) {
        case 'top':
          return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        case 'bottom':
          return 'top-full left-1/2 -translate-x-1/2 mt-2';
        case 'left':
          return 'right-full top-1/2 -translate-y-1/2 mr-2';
        case 'right':
          return 'left-full top-1/2 -translate-y-1/2 ml-2';
        default:
          return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 px-3 py-1.5 text-xs rounded-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200',
              getPositionClasses()
            )}
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

SimpleTooltip.displayName = 'SimpleTooltip';

export { Tooltip as default };
