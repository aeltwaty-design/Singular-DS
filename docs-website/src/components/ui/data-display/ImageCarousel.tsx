'use client';

import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// Types
// ============================================================================

export type ImageCarouselSize = 'lg' | 'sm';
export type ImageCarouselStyle = 'light' | 'dark' | 'primary' | 'primaryLight';
export type ImageCarouselIndicatorType = 'dot' | 'dash' | 'dash-progress';

export interface ImageCarouselProps {
  /** Array of image URLs to display */
  images: string[];
  /** Size variant */
  size?: ImageCarouselSize;
  /** Style variant for arrows and indicators */
  style?: ImageCarouselStyle;
  /** Indicator type */
  indicatorType?: ImageCarouselIndicatorType;
  /** Show/hide indicators */
  showIndicator?: boolean;
  /** Show gradient overlay at bottom */
  showIndicatorBg?: boolean;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Enable auto-play */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** Current slide index (controlled mode) */
  currentIndex?: number;
  /** Additional class names */
  className?: string;
  /** Alt text for images */
  imageAlts?: string[];
}

// ============================================================================
// Carousel Arrow Sub-component
// ============================================================================

const arrowContainerVariants = cva(
  'absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 z-10',
  {
    variants: {
      style: {
        light: 'bg-white text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-400',
        dark: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-600',
        primary: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400',
        primaryLight: 'bg-neutral-100 text-emerald-600 hover:bg-neutral-200 focus:ring-emerald-400',
      },
      size: {
        lg: 'p-2',
        sm: 'p-1',
      },
      direction: {
        prev: 'left-4',
        next: 'right-4',
      },
    },
    defaultVariants: {
      style: 'light',
      size: 'lg',
    },
  }
);

interface CarouselArrowProps {
  direction: 'prev' | 'next';
  style: ImageCarouselStyle;
  size: ImageCarouselSize;
  onClick: () => void;
  disabled?: boolean;
  isArabic?: boolean;
}

function CarouselArrow({ direction, style, size, onClick, disabled, isArabic }: CarouselArrowProps) {
  const iconSize = size === 'lg' ? 24 : 16;
  
  // Swap arrow icons for RTL
  const actualDirection = isArabic ? (direction === 'prev' ? 'next' : 'prev') : direction;
  const Icon = actualDirection === 'prev' ? ArrowLeft2 : ArrowRight2;
  
  // Swap positions for RTL
  const position = isArabic ? (direction === 'prev' ? 'next' : 'prev') : direction;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        arrowContainerVariants({ style, size, direction: position }),
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      <Icon size={iconSize} variant="Bold" />
    </button>
  );
}

// ============================================================================
// Carousel Indicator Sub-component
// ============================================================================

const indicatorDotVariants = cva(
  'rounded-full transition-all duration-300',
  {
    variants: {
      style: {
        light: '',
        dark: '',
        primary: '',
        primaryLight: '',
      },
      size: {
        lg: '',
        sm: '',
      },
      current: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Light style
      { style: 'light', current: false, className: 'bg-white/50' },
      { style: 'light', current: true, className: 'bg-emerald-500 ring-2 ring-emerald-300' },
      // Dark style
      { style: 'dark', current: false, className: 'bg-neutral-500' },
      { style: 'dark', current: true, className: 'bg-white ring-2 ring-emerald-500' },
      // Primary style
      { style: 'primary', current: false, className: 'bg-white/50' },
      { style: 'primary', current: true, className: 'bg-emerald-500 ring-2 ring-emerald-300' },
      // Primary Light style
      { style: 'primaryLight', current: false, className: 'bg-neutral-200' },
      { style: 'primaryLight', current: true, className: 'bg-emerald-500 ring-2 ring-emerald-300' },
      // Size variants
      { size: 'lg', current: false, className: 'w-3 h-3' },
      { size: 'lg', current: true, className: 'w-3 h-3' },
      { size: 'sm', current: false, className: 'w-2 h-2' },
      { size: 'sm', current: true, className: 'w-2 h-2' },
    ],
    defaultVariants: {
      style: 'light',
      size: 'lg',
      current: false,
    },
  }
);

const indicatorDashVariants = cva(
  'rounded-full transition-all duration-300 flex-1',
  {
    variants: {
      style: {
        light: '',
        dark: '',
        primary: '',
        primaryLight: '',
      },
      size: {
        lg: 'h-1.5',
        sm: 'h-1',
      },
      current: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Light style
      { style: 'light', current: false, className: 'bg-white/40' },
      { style: 'light', current: true, className: 'bg-emerald-500' },
      // Dark style
      { style: 'dark', current: false, className: 'bg-neutral-500' },
      { style: 'dark', current: true, className: 'bg-white' },
      // Primary style
      { style: 'primary', current: false, className: 'bg-white/40' },
      { style: 'primary', current: true, className: 'bg-emerald-500' },
      // Primary Light style
      { style: 'primaryLight', current: false, className: 'bg-neutral-200' },
      { style: 'primaryLight', current: true, className: 'bg-emerald-500' },
    ],
    defaultVariants: {
      style: 'light',
      size: 'lg',
      current: false,
    },
  }
);

interface CarouselIndicatorProps {
  type: ImageCarouselIndicatorType;
  current: boolean;
  style: ImageCarouselStyle;
  size: ImageCarouselSize;
  progress?: number;
  onClick?: () => void;
  index: number;
}

function CarouselIndicator({ type, current, style, size, progress = 0, onClick, index }: CarouselIndicatorProps) {
  if (type === 'dot') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(indicatorDotVariants({ style, size, current }))}
        aria-label={`Go to slide ${index + 1}`}
        aria-current={current ? 'true' : 'false'}
      />
    );
  }

  if (type === 'dash') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(indicatorDashVariants({ style, size, current }))}
        aria-label={`Go to slide ${index + 1}`}
        aria-current={current ? 'true' : 'false'}
      />
    );
  }

  // dash-progress
  const bgClass = {
    light: 'bg-white/40',
    dark: 'bg-neutral-500',
    primary: 'bg-white/40',
    primaryLight: 'bg-neutral-200',
  }[style];

  const fillClass = {
    light: 'bg-emerald-500',
    dark: 'bg-white',
    primary: 'bg-emerald-500',
    primaryLight: 'bg-emerald-500',
  }[style];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full flex-1 overflow-hidden relative',
        size === 'lg' ? 'h-1.5' : 'h-1',
        bgClass
      )}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={current ? 'true' : 'false'}
    >
      {current && (
        <motion.div
          className={cn('absolute inset-y-0 left-0 rounded-full', fillClass)}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      )}
    </button>
  );
}

// ============================================================================
// Indicator Background Gradient
// ============================================================================

interface IndicatorBgProps {
  style: ImageCarouselStyle;
  size: ImageCarouselSize;
}

function IndicatorBg({ style, size }: IndicatorBgProps) {
  const gradientClass = {
    light: 'from-transparent to-white/30',
    dark: 'from-transparent to-black/30',
    primary: 'from-transparent to-black/30',
    primaryLight: 'from-transparent to-white/30',
  }[style];

  const radiusClass = size === 'lg' ? 'rounded-b-2xl' : 'rounded-b-xl';
  const heightClass = size === 'lg' ? 'h-[76px]' : 'h-[60px]';

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-b pointer-events-none',
        gradientClass,
        radiusClass,
        heightClass
      )}
    />
  );
}

// ============================================================================
// Main ImageCarousel Component
// ============================================================================

const carouselContainerVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      size: {
        lg: 'rounded-2xl',
        sm: 'rounded-xl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

export function ImageCarousel({
  images,
  size = 'lg',
  style = 'light',
  indicatorType = 'dot',
  showIndicator = true,
  showIndicatorBg = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  onSlideChange,
  currentIndex: controlledIndex,
  className,
  imageAlts,
}: ImageCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if RTL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dir = document.documentElement.dir || document.body.dir;
      setIsArabic(dir === 'rtl');
    }
  }, []);

  // Use controlled or uncontrolled index
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const totalSlides = images.length;

  const goToSlide = useCallback((index: number) => {
    const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    if (controlledIndex === undefined) {
      setInternalIndex(newIndex);
    }
    setProgress(0);
    onSlideChange?.(newIndex);
  }, [totalSlides, controlledIndex, onSlideChange]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || totalSlides <= 1) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
      return;
    }

    // Progress animation for dash-progress
    if (indicatorType === 'dash-progress') {
      const progressStep = 100 / (autoPlayInterval / 100);
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + progressStep;
        });
      }, 100);
    }

    // Auto-advance
    autoPlayTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [autoPlay, isPaused, autoPlayInterval, currentIndex, indicatorType, totalSlides, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        isArabic ? goToNext() : goToPrev();
      } else if (e.key === 'ArrowRight') {
        isArabic ? goToPrev() : goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isArabic]);

  // Touch/swipe handling
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        isArabic ? goToPrev() : goToNext();
      } else {
        isArabic ? goToNext() : goToPrev();
      }
    }
    
    touchStartX.current = null;
  };

  // Container dimensions - use explicit width and height for reliable rendering
  const containerStyles = {
    lg: 'w-[800px] h-[400px]',
    sm: 'w-[600px] h-[300px]',
  }[size];

  // Indicator container styles
  const indicatorGap = {
    dot: size === 'lg' ? 'gap-3' : 'gap-2',
    dash: size === 'lg' ? 'gap-2 w-48' : 'gap-1.5 w-36',
    'dash-progress': size === 'lg' ? 'gap-2 w-48' : 'gap-1.5 w-36',
  }[indicatorType];

  if (images.length === 0) {
    return (
      <div
        className={cn(
          carouselContainerVariants({ size }),
          containerStyles,
          'bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center',
          className
        )}
      >
        <span className="text-neutral-400 dark:text-neutral-500">No images</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        carouselContainerVariants({ size }),
        containerStyles,
        'bg-neutral-200 dark:bg-neutral-800',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt={imageAlts?.[currentIndex] || `Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicator Background */}
      {showIndicatorBg && showIndicator && (
        <IndicatorBg style={style} size={size} />
      )}

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <CarouselArrow
            direction="prev"
            style={style}
            size={size}
            onClick={goToPrev}
            isArabic={isArabic}
          />
          <CarouselArrow
            direction="next"
            style={style}
            size={size}
            onClick={goToNext}
            isArabic={isArabic}
          />
        </>
      )}

      {/* Indicators */}
      {showIndicator && totalSlides > 1 && (
        <div
          className={cn(
            'absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-10',
            indicatorGap
          )}
          role="tablist"
          aria-label="Slides"
        >
          {images.map((_, idx) => (
            <CarouselIndicator
              key={idx}
              index={idx}
              type={indicatorType}
              current={idx === currentIndex}
              style={style}
              size={size}
              progress={idx === currentIndex ? progress : 0}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ImageCarousel.displayName = 'ImageCarousel';

