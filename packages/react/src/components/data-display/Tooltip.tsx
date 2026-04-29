'use client';

import React, { forwardRef, HTMLAttributes, ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { Close } from '../../icons';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

import { grayLight, grayDark } from '../../tokens/primitives/colors';

// =============================================================================
// TYPES
// =============================================================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  children: ReactNode;
  title?: string;
  content: ReactNode;
  
  showSteps?: boolean;
  currentStep?: number;
  totalSteps?: number;
  
  showNavigation?: boolean;
  nextLabel?: string;
  onNext?: () => void;
  onPrev?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  
  position?: TooltipPosition;
  
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  showCloseButton?: boolean;
  
  trigger?: TooltipTrigger;
  delayDuration?: number;
  
  width?: number | string;
  maxWidth?: number | string;
  
  isRTL?: boolean;
}

// =============================================================================
// TOOLTIP ARROW
// =============================================================================

interface TooltipArrowProps {
  position: TooltipPosition;
  fillColor: string;
}

const TooltipArrow = ({ position, fillColor }: TooltipArrowProps) => {
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
// MAIN TOOLTIP
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

    const [documentDir, setDocumentDir] = useState<string>('ltr');
    useEffect(() => {
      if (typeof document !== 'undefined') {
        setDocumentDir(document.documentElement.dir || 'ltr');
      }
    }, []);
    const isRTL = isRTLProp ?? documentDir === 'rtl';

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

    const bgColor = isDark ? gray[800] : '#FFFFFF';
    const textPrimary = isDark ? gray[50] : gray[900];
    const textSecondary = isDark ? gray[400] : gray[600];
    const textSelected = isDark ? brandPrimary[400] : brandPrimary[500];
    const iconColor = isDark ? gray[300] : gray[700];
    const iconDisabled = isDark ? gray[600] : gray[300];

    const defaultNextLabel = isRTL ? 'التالي' : 'Next';

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

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
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="inline-flex"
        >
          {children}
        </div>

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
            <TooltipArrow position={position} fillColor={bgColor} />

            <div
              className="relative flex flex-col gap-2 p-2 rounded-lg overflow-hidden"
              style={{
                backgroundColor: bgColor,
                boxShadow: '0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
              }}
            >
              {(showSteps || showCloseButton) && (
                <div className={cn(
                  'flex items-center justify-between w-full',
                  isRTL && 'flex-row-reverse'
                )}>
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

              {showNavigation && (
                <div className="flex items-center justify-between w-full">
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
// SIMPLE TOOLTIP
// =============================================================================

export interface SimpleTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactNode;
  content: string;
  position?: TooltipPosition;
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
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
