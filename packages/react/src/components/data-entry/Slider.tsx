import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

// ============================================================================
// Types
// ============================================================================

export type SliderTrackStyle = 'default' | 'dotted' | 'dashed';
export type SliderThumbType = 'primary' | 'white';

export interface SliderProps {
  /** Current value (single mode) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Range values (range mode) */
  rangeValue?: { start: number; end: number };
  /** Default range values (uncontrolled) */
  defaultRangeValue?: { start: number; end: number };
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Track visual style */
  trackStyle?: SliderTrackStyle;
  /** Thumb visual type */
  thumbType?: SliderThumbType;
  /** Show value tooltip above thumb */
  showTooltip?: boolean;
  /** Show step markers on track */
  showSteps?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Format value for display */
  formatValue?: (value: number) => string;
  /** Callback when value changes (single mode) */
  onChange?: (value: number) => void;
  /** Callback when range changes (range mode) */
  onRangeChange?: (range: { start: number; end: number }) => void;
  /** Additional class name */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

function getPercentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

// ============================================================================
// Tooltip Component
// ============================================================================

interface TooltipProps {
  value: number;
  formatValue: (value: number) => string;
  visible: boolean;
}

function SliderTooltip({ value, formatValue, visible }: TooltipProps) {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-10"
    >
      <div 
        className="bg-white dark:bg-neutral-800 rounded-lg px-2 py-1 shadow-lg border border-neutral-100 dark:border-neutral-700"
        style={{
          boxShadow: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)'
        }}
      >
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
          {formatValue(value)}
        </span>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
        <div 
          className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white dark:border-t-neutral-800"
        />
      </div>
    </div>
  );
}

// ============================================================================
// Thumb Component
// ============================================================================

interface ThumbProps {
  value: number;
  min: number;
  max: number;
  thumbType: SliderThumbType;
  showTooltip: boolean;
  formatValue: (value: number) => string;
  disabled: boolean;
  isDragging: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  brandPrimary: string;
}

function SliderThumb({
  value,
  min,
  max,
  thumbType,
  showTooltip,
  formatValue,
  disabled,
  isDragging,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onTouchStart,
  brandPrimary,
}: ThumbProps) {
  const percentage = getPercentage(value, min, max);
  const showFocusRing = isDragging || isHovered;
  
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 touch-none select-none"
      style={{ left: `${percentage}%` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <SliderTooltip 
        value={value} 
        formatValue={formatValue} 
        visible={showTooltip && (isDragging || isHovered)} 
      />
      
      {showFocusRing && !disabled && (
        <div
          className="absolute inset-[-4px] rounded-full opacity-30"
          style={{ backgroundColor: brandPrimary }}
        />
      )}
      
      <div
        className={cn(
          'relative w-6 h-6 rounded-full cursor-grab active:cursor-grabbing transition-shadow',
          'border-2',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          backgroundColor: thumbType === 'primary' ? brandPrimary : 'white',
          borderColor: thumbType === 'primary' ? 'rgb(241, 243, 249)' : brandPrimary,
          boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
        }}
      />
    </div>
  );
}

// ============================================================================
// Track Step Markers
// ============================================================================

interface StepMarkersProps {
  min: number;
  max: number;
  step: number;
  trackStyle: SliderTrackStyle;
  activeValue: number;
  rangeStart?: number;
  brandPrimary: string;
}

function StepMarkers({ 
  min, 
  max, 
  step, 
  trackStyle, 
  activeValue, 
  rangeStart,
  brandPrimary 
}: StepMarkersProps) {
  if (trackStyle === 'default') return null;
  
  const steps = [];
  const totalSteps = Math.floor((max - min) / step);
  
  for (let i = 0; i <= totalSteps; i++) {
    const stepValue = min + i * step;
    const percentage = getPercentage(stepValue, min, max);
    const isActive = rangeStart !== undefined
      ? stepValue >= rangeStart && stepValue <= activeValue
      : stepValue <= activeValue;
    
    steps.push(
      <div
        key={i}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${percentage}%` }}
      >
        {trackStyle === 'dotted' ? (
          <div
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: isActive 
                ? `color-mix(in srgb, ${brandPrimary} 50%, white)` 
                : 'rgb(241, 243, 249)'
            }}
          />
        ) : (
          <div
            className="w-px h-2.5 rounded-sm"
            style={{
              backgroundColor: isActive ? brandPrimary : 'rgb(241, 243, 249)'
            }}
          />
        )}
      </div>
    );
  }
  
  return <>{steps}</>;
}

// ============================================================================
// Main Slider Component
// ============================================================================

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  rangeValue: controlledRangeValue,
  defaultRangeValue,
  min = 0,
  max = 100,
  step = 1,
  trackStyle = 'default',
  thumbType = 'primary',
  showTooltip = true,
  showSteps = false,
  disabled = false,
  label,
  showMinMax = false,
  formatValue = (v) => String(v),
  onChange,
  onRangeChange,
  className,
}: SliderProps) {
  const { brandColors } = useBrand();
  const trackRef = useRef<HTMLDivElement>(null);
  
  const isRangeMode = controlledRangeValue !== undefined || defaultRangeValue !== undefined;
  
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalRangeValue, setInternalRangeValue] = useState(
    defaultRangeValue || { start: min, end: max }
  );
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const rangeValue = controlledRangeValue !== undefined ? controlledRangeValue : internalRangeValue;
  
  const [isDraggingMain, setIsDraggingMain] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [isHoveredMain, setIsHoveredMain] = useState(false);
  const [isHoveredStart, setIsHoveredStart] = useState(false);
  const [isHoveredEnd, setIsHoveredEnd] = useState(false);
  
  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return min;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const rawValue = min + percentage * (max - min);
    const snappedValue = snapToStep(rawValue, min, step);
    return clamp(snappedValue, min, max);
  }, [min, max, step]);
  
  const handleValueChange = useCallback((newValue: number) => {
    if (disabled) return;
    
    if (isRangeMode) {
      // Handled separately for range
    } else {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  }, [disabled, isRangeMode, controlledValue, onChange]);
  
  const handleRangeChange = useCallback((start: number, end: number) => {
    if (disabled) return;
    
    const newRange = { start: Math.min(start, end), end: Math.max(start, end) };
    
    if (controlledRangeValue === undefined) {
      setInternalRangeValue(newRange);
    }
    onRangeChange?.(newRange);
  }, [disabled, controlledRangeValue, onRangeChange]);
  
  const handleMove = useCallback((clientX: number) => {
    const newValue = getValueFromPosition(clientX);
    
    if (isRangeMode) {
      if (isDraggingStart) {
        handleRangeChange(newValue, rangeValue.end);
      } else if (isDraggingEnd) {
        handleRangeChange(rangeValue.start, newValue);
      }
    } else if (isDraggingMain) {
      handleValueChange(newValue);
    }
  }, [
    getValueFromPosition, 
    isRangeMode, 
    isDraggingStart, 
    isDraggingEnd, 
    isDraggingMain, 
    rangeValue, 
    handleRangeChange, 
    handleValueChange
  ]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingMain || isDraggingStart || isDraggingEnd) {
        handleMove(e.clientX);
      }
    };
    
    const handleMouseUp = () => {
      setIsDraggingMain(false);
      setIsDraggingStart(false);
      setIsDraggingEnd(false);
    };
    
    if (isDraggingMain || isDraggingStart || isDraggingEnd) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingMain, isDraggingStart, isDraggingEnd, handleMove]);
  
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (isRangeMode) {
      const distToStart = Math.abs(newValue - rangeValue.start);
      const distToEnd = Math.abs(newValue - rangeValue.end);
      
      if (distToStart < distToEnd) {
        handleRangeChange(newValue, rangeValue.end);
      } else {
        handleRangeChange(rangeValue.start, newValue);
      }
    } else {
      handleValueChange(newValue);
    }
  };
  
  const fillStart = isRangeMode ? getPercentage(rangeValue.start, min, max) : 0;
  const fillEnd = isRangeMode ? getPercentage(rangeValue.end, min, max) : getPercentage(value, min, max);
  
  const markerStep = showSteps ? step : (max - min) / 10;
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {isRangeMode 
              ? `${formatValue(rangeValue.start)} - ${formatValue(rangeValue.end)}`
              : formatValue(value)
            }
          </span>
        </div>
      )}
      
      <div className="relative py-3">
        <div
          ref={trackRef}
          className={cn(
            'relative h-1.5 rounded-full cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          style={{ backgroundColor: 'rgb(241, 243, 249)' }}
          onClick={handleTrackClick}
        >
          <div
            className="absolute top-0 h-full rounded-full"
            style={{
              left: `${fillStart}%`,
              width: `${fillEnd - fillStart}%`,
              backgroundColor: brandColors.primary,
            }}
          />
          
          {(trackStyle !== 'default' || showSteps) && (
            <StepMarkers
              min={min}
              max={max}
              step={markerStep}
              trackStyle={trackStyle === 'default' && showSteps ? 'dotted' : trackStyle}
              activeValue={isRangeMode ? rangeValue.end : value}
              rangeStart={isRangeMode ? rangeValue.start : undefined}
              brandPrimary={brandColors.primary}
            />
          )}
        </div>
        
        {isRangeMode ? (
          <>
            <SliderThumb
              value={rangeValue.start}
              min={min}
              max={max}
              thumbType={thumbType}
              showTooltip={showTooltip}
              formatValue={formatValue}
              disabled={disabled}
              isDragging={isDraggingStart}
              isHovered={isHoveredStart}
              onMouseEnter={() => setIsHoveredStart(true)}
              onMouseLeave={() => setIsHoveredStart(false)}
              onMouseDown={(e) => {
                e.preventDefault();
                if (!disabled) setIsDraggingStart(true);
              }}
              onTouchStart={(e) => {
                if (!disabled) setIsDraggingStart(true);
              }}
              brandPrimary={brandColors.primary}
            />
            
            <SliderThumb
              value={rangeValue.end}
              min={min}
              max={max}
              thumbType={thumbType}
              showTooltip={showTooltip}
              formatValue={formatValue}
              disabled={disabled}
              isDragging={isDraggingEnd}
              isHovered={isHoveredEnd}
              onMouseEnter={() => setIsHoveredEnd(true)}
              onMouseLeave={() => setIsHoveredEnd(false)}
              onMouseDown={(e) => {
                e.preventDefault();
                if (!disabled) setIsDraggingEnd(true);
              }}
              onTouchStart={(e) => {
                if (!disabled) setIsDraggingEnd(true);
              }}
              brandPrimary={brandColors.primary}
            />
          </>
        ) : (
          <SliderThumb
            value={value}
            min={min}
            max={max}
            thumbType={thumbType}
            showTooltip={showTooltip}
            formatValue={formatValue}
            disabled={disabled}
            isDragging={isDraggingMain}
            isHovered={isHoveredMain}
            onMouseEnter={() => setIsHoveredMain(true)}
            onMouseLeave={() => setIsHoveredMain(false)}
            onMouseDown={(e) => {
              e.preventDefault();
              if (!disabled) setIsDraggingMain(true);
            }}
            onTouchStart={(e) => {
              if (!disabled) setIsDraggingMain(true);
            }}
            brandPrimary={brandColors.primary}
          />
        )}
      </div>
      
      {showMinMax && (
        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  );
}

export default Slider;
