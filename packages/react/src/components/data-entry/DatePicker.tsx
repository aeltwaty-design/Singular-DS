import { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { ArrowLeft2, ArrowRight2, ArrowDown2, Calendar } from 'iconsax-react';

// ============================================================================
// Types
// ============================================================================

export type DatePickerViewType = 'days' | 'months' | 'years';
export type DatePickerSelectionMode = 'single' | 'range';
export type DatePickerBreakpoint = 'mobile' | 'desktop';

export interface DatePickerProps {
  /** Selected date for single mode */
  value?: Date | null;
  /** Selected date range for range mode */
  rangeValue?: { start: Date | null; end: Date | null };
  /** Callback when date changes (single mode) */
  onChange?: (date: Date | null) => void;
  /** Callback when range changes (range mode) */
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  /** Selection mode */
  selectionMode?: DatePickerSelectionMode;
  /** Initial view type */
  initialView?: DatePickerViewType;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Array of disabled dates */
  disabledDates?: Date[];
  /** Show action buttons (Cancel/Apply) */
  showActions?: boolean;
  /** Callback when Apply is clicked */
  onApply?: () => void;
  /** Callback when Cancel is clicked */
  onCancel?: () => void;
  /** Breakpoint layout */
  breakpoint?: DatePickerBreakpoint;
  /** Locale for date formatting */
  locale?: 'en' | 'ar';
  /** Additional class name */
  className?: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

const DAYS_EN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAYS_AR = ['أ', 'إ', 'ث', 'أ', 'خ', 'ج', 'س'];

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const MONTHS_FULL_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_FULL_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date | null | undefined, date2: Date | null | undefined): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const dateTime = date.getTime();
  return dateTime > start.getTime() && dateTime < end.getTime();
}

function isDateDisabled(date: Date, disabledDates: Date[], minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return disabledDates.some(d => isSameDay(d, date));
}

// ============================================================================
// Day Cell Component
// ============================================================================

type DayCellVariant = 'unselected' | 'today' | 'selected' | 'rangeStart' | 'rangeMid' | 'rangeEnd' | 'disabled';

interface DayCellProps {
  day: number;
  variant: DayCellVariant;
  onClick?: () => void;
  brandColor: string;
  brandColorLight: string;
}

function DayCell({ day, variant, onClick, brandColor, brandColorLight }: DayCellProps) {
  const isClickable = variant !== 'disabled';
  
  return (
    <button
      type="button"
      onClick={isClickable ? onClick : undefined}
      disabled={variant === 'disabled'}
      className={cn(
        'relative h-8 flex-1 min-w-0 flex items-center justify-center text-sm transition-colors',
        isClickable && 'cursor-pointer hover:opacity-80',
        variant === 'disabled' && 'cursor-not-allowed'
      )}
    >
      {(variant === 'rangeStart' || variant === 'rangeMid' || variant === 'rangeEnd') && (
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 h-8',
            variant === 'rangeStart' && 'left-1/2 right-0',
            variant === 'rangeMid' && 'left-0 right-0',
            variant === 'rangeEnd' && 'left-0 right-1/2'
          )}
          style={{ backgroundColor: brandColorLight }}
        />
      )}
      
      {(variant === 'selected' || variant === 'rangeStart' || variant === 'rangeEnd') && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{ backgroundColor: brandColor }}
        />
      )}
      
      {variant === 'today' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700" />
      )}
      
      <span
        className={cn(
          'relative z-10 font-normal leading-6',
          variant === 'unselected' && 'text-neutral-900 dark:text-white',
          variant === 'today' && 'text-neutral-900 dark:text-white',
          (variant === 'selected' || variant === 'rangeStart' || variant === 'rangeEnd') && 'text-neutral-900 dark:text-neutral-900',
          variant === 'rangeMid' && 'text-neutral-900 dark:text-white',
          variant === 'disabled' && 'text-neutral-400 dark:text-neutral-500 line-through'
        )}
      >
        {day}
      </span>
    </button>
  );
}

// ============================================================================
// Month Cell Component
// ============================================================================

interface MonthCellProps {
  month: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  brandColor: string;
}

function MonthCell({ month, isSelected, isDisabled, onClick, brandColor }: MonthCellProps) {
  return (
    <button
      type="button"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={cn(
        'relative h-8 flex-1 flex items-center justify-center text-base transition-colors',
        !isDisabled && 'cursor-pointer hover:opacity-80',
        isDisabled && 'cursor-not-allowed'
      )}
    >
      {isSelected && (
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: brandColor }}
        />
      )}
      <span
        className={cn(
          'relative z-10 font-normal leading-6',
          !isSelected && !isDisabled && 'text-neutral-900 dark:text-white',
          isSelected && 'text-neutral-900 dark:text-neutral-900',
          isDisabled && 'text-neutral-400 dark:text-neutral-500 line-through'
        )}
      >
        {month}
      </span>
    </button>
  );
}

// ============================================================================
// Year Cell Component
// ============================================================================

interface YearCellProps {
  year: number;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  brandColor: string;
}

function YearCell({ year, isSelected, isDisabled, onClick, brandColor }: YearCellProps) {
  return (
    <button
      type="button"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={cn(
        'relative h-8 flex-1 flex items-center justify-center text-base transition-colors',
        !isDisabled && 'cursor-pointer hover:opacity-80',
        isDisabled && 'cursor-not-allowed'
      )}
    >
      {isSelected && (
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: brandColor }}
        />
      )}
      <span
        className={cn(
          'relative z-10 font-normal leading-6',
          !isSelected && !isDisabled && 'text-neutral-900 dark:text-white',
          isSelected && 'text-neutral-900 dark:text-neutral-900',
          isDisabled && 'text-neutral-400 dark:text-neutral-500 line-through'
        )}
      >
        {year}
      </span>
    </button>
  );
}

// ============================================================================
// Header Component
// ============================================================================

interface DatePickerHeaderProps {
  viewType: DatePickerViewType;
  currentYear: number;
  currentMonth: number;
  yearRangeStart: number;
  onViewChange: (view: DatePickerViewType) => void;
  onPrev: () => void;
  onNext: () => void;
  locale: 'en' | 'ar';
}

function DatePickerHeader({
  viewType,
  currentYear,
  currentMonth,
  yearRangeStart,
  onViewChange,
  onPrev,
  onNext,
  locale,
}: DatePickerHeaderProps) {
  const months = locale === 'ar' ? MONTHS_FULL_AR : MONTHS_FULL_EN;
  
  const getHeaderText = () => {
    switch (viewType) {
      case 'days':
        return `${months[currentMonth]} ${currentYear}`;
      case 'months':
        return `${currentYear}`;
      case 'years':
        return `${yearRangeStart} - ${yearRangeStart + 9}`;
    }
  };

  const handleSelectorClick = () => {
    if (viewType === 'days') {
      onViewChange('months');
    } else if (viewType === 'months') {
      onViewChange('years');
    } else {
      onViewChange('days');
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <button
        type="button"
        onClick={handleSelectorClick}
        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <span className="text-base font-semibold">{getHeaderText()}</span>
        <ArrowDown2 size={16} variant="Bold" className="text-neutral-900 dark:text-white" />
      </button>
      
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft2 size={24} variant="Bold" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowRight2 size={24} variant="Bold" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Days View Component
// ============================================================================

interface DaysViewProps {
  currentYear: number;
  currentMonth: number;
  selectedDate: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  selectionMode: DatePickerSelectionMode;
  disabledDates: Date[];
  minDate?: Date;
  maxDate?: Date;
  onDateSelect: (date: Date) => void;
  brandColor: string;
  brandColorLight: string;
  locale: 'en' | 'ar';
}

function DaysView({
  currentYear,
  currentMonth,
  selectedDate,
  rangeStart,
  rangeEnd,
  selectionMode,
  disabledDates,
  minDate,
  maxDate,
  onDateSelect,
  brandColor,
  brandColorLight,
  locale,
}: DaysViewProps) {
  const days = locale === 'ar' ? DAYS_AR : DAYS_EN;
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();
  
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
  const prevMonthFillDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => prevMonthDays - firstDayOfMonth + i + 1
  );
  
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const nextMonthFillDays = Array.from(
    { length: totalCells - firstDayOfMonth - daysInMonth },
    (_, i) => i + 1
  );

  const getDayVariant = (day: number, isCurrentMonth: boolean): DayCellVariant => {
    if (!isCurrentMonth) return 'unselected';
    
    const date = new Date(currentYear, currentMonth, day);
    
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) {
      return 'disabled';
    }
    
    if (selectionMode === 'range') {
      if (isSameDay(date, rangeStart)) return 'rangeStart';
      if (isSameDay(date, rangeEnd)) return 'rangeEnd';
      if (isDateInRange(date, rangeStart, rangeEnd)) return 'rangeMid';
    }
    
    if (isSameDay(date, selectedDate) || isSameDay(date, rangeStart) || isSameDay(date, rangeEnd)) {
      return 'selected';
    }
    
    if (isSameDay(date, today)) {
      return 'today';
    }
    
    return 'unselected';
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    const month = isCurrentMonth ? currentMonth : (day > 15 ? currentMonth - 1 : currentMonth + 1);
    const year = month < 0 ? currentYear - 1 : month > 11 ? currentYear + 1 : currentYear;
    const normalizedMonth = ((month % 12) + 12) % 12;
    onDateSelect(new Date(year, normalizedMonth, day));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center w-full">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex-1 h-6 flex items-center justify-center text-base font-normal text-neutral-600 dark:text-neutral-400"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex flex-col gap-0">
        {(() => {
          const allDays = [
            ...prevMonthFillDays.map(day => ({ day, isCurrentMonth: false, isPrev: true })),
            ...currentMonthDays.map(day => ({ day, isCurrentMonth: true, isPrev: false })),
            ...nextMonthFillDays.map(day => ({ day, isCurrentMonth: false, isPrev: false })),
          ];
          
          const weeks = [];
          for (let i = 0; i < allDays.length; i += 7) {
            weeks.push(allDays.slice(i, i + 7));
          }
          
          return weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex items-center w-full">
              {week.map((dayObj, dayIndex) => (
                <DayCell
                  key={`${weekIndex}-${dayIndex}`}
                  day={dayObj.day}
                  variant={getDayVariant(dayObj.day, dayObj.isCurrentMonth)}
                  onClick={() => handleDayClick(dayObj.day, dayObj.isCurrentMonth)}
                  brandColor={brandColor}
                  brandColorLight={brandColorLight}
                />
              ))}
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

// ============================================================================
// Months View Component
// ============================================================================

interface MonthsViewProps {
  currentYear: number;
  selectedMonth: number | null;
  selectedYear: number | null;
  onMonthSelect: (month: number) => void;
  brandColor: string;
  locale: 'en' | 'ar';
}

function MonthsView({
  currentYear,
  selectedMonth,
  selectedYear,
  onMonthSelect,
  brandColor,
  locale,
}: MonthsViewProps) {
  const months = locale === 'ar' ? MONTHS_AR : MONTHS_EN;
  
  const rows = [];
  for (let i = 0; i < 12; i += 3) {
    rows.push(months.slice(i, i + 3).map((month, index) => ({
      month,
      index: i + index,
    })));
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-2 w-full">
          {row.map(({ month, index }) => (
            <MonthCell
              key={index}
              month={month}
              isSelected={selectedYear === currentYear && selectedMonth === index}
              onClick={() => onMonthSelect(index)}
              brandColor={brandColor}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Years View Component
// ============================================================================

interface YearsViewProps {
  yearRangeStart: number;
  selectedYear: number | null;
  onYearSelect: (year: number) => void;
  brandColor: string;
}

function YearsView({
  yearRangeStart,
  selectedYear,
  onYearSelect,
  brandColor,
}: YearsViewProps) {
  const years = Array.from({ length: 10 }, (_, i) => yearRangeStart + i);
  
  const rows = [];
  for (let i = 0; i < years.length; i += 3) {
    rows.push(years.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-2 w-full">
          {row.map((year) => (
            <YearCell
              key={year}
              year={year}
              isSelected={selectedYear === year}
              onClick={() => onYearSelect(year)}
              brandColor={brandColor}
            />
          ))}
          {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 h-8" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Single Calendar Panel Component
// ============================================================================

interface CalendarPanelProps {
  currentYear: number;
  currentMonth: number;
  yearRangeStart: number;
  viewType: DatePickerViewType;
  selectedDate: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  selectionMode: DatePickerSelectionMode;
  disabledDates: Date[];
  minDate?: Date;
  maxDate?: Date;
  onDateSelect: (date: Date) => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
  onViewChange: (view: DatePickerViewType) => void;
  onPrev: () => void;
  onNext: () => void;
  brandColor: string;
  brandColorLight: string;
  locale: 'en' | 'ar';
}

function CalendarPanel({
  currentYear,
  currentMonth,
  yearRangeStart,
  viewType,
  selectedDate,
  rangeStart,
  rangeEnd,
  selectionMode,
  disabledDates,
  minDate,
  maxDate,
  onDateSelect,
  onMonthSelect,
  onYearSelect,
  onViewChange,
  onPrev,
  onNext,
  brandColor,
  brandColorLight,
  locale,
}: CalendarPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4 w-[324px] bg-white dark:bg-neutral-900 rounded-2xl">
      <DatePickerHeader
        viewType={viewType}
        currentYear={currentYear}
        currentMonth={currentMonth}
        yearRangeStart={yearRangeStart}
        onViewChange={onViewChange}
        onPrev={onPrev}
        onNext={onNext}
        locale={locale}
      />
      
      {viewType === 'days' && (
        <DaysView
          currentYear={currentYear}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          selectionMode={selectionMode}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          onDateSelect={onDateSelect}
          brandColor={brandColor}
          brandColorLight={brandColorLight}
          locale={locale}
        />
      )}
      
      {viewType === 'months' && (
        <MonthsView
          currentYear={currentYear}
          selectedMonth={selectedDate?.getMonth() ?? null}
          selectedYear={selectedDate?.getFullYear() ?? null}
          onMonthSelect={onMonthSelect}
          brandColor={brandColor}
          locale={locale}
        />
      )}
      
      {viewType === 'years' && (
        <YearsView
          yearRangeStart={yearRangeStart}
          selectedYear={selectedDate?.getFullYear() ?? null}
          onYearSelect={onYearSelect}
          brandColor={brandColor}
        />
      )}
    </div>
  );
}

// ============================================================================
// Actions Dock Component
// ============================================================================

interface ActionsDockProps {
  onCancel: () => void;
  onApply: () => void;
  brandColor: string;
  locale: 'en' | 'ar';
  isDesktop?: boolean;
}

function ActionsDock({ onCancel, onApply, brandColor, locale, isDesktop }: ActionsDockProps) {
  const cancelText = locale === 'ar' ? 'إلغاء' : 'Cancel';
  const applyText = locale === 'ar' ? 'تطبيق' : 'Apply';

  return (
    <div className={cn(
      'flex flex-col gap-4',
      isDesktop ? 'items-end px-2' : 'items-start w-full px-4 pb-4'
    )}>
      <div className="w-full h-px bg-neutral-200 dark:bg-neutral-700" />
      
      <div className={cn(
        'flex gap-4',
        !isDesktop && 'w-full'
      )}>
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-base font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800',
            !isDesktop && 'flex-1'
          )}
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onApply}
          className={cn(
            'px-4 py-2.5 rounded-xl text-neutral-900 text-base font-medium transition-colors hover:opacity-90',
            !isDesktop && 'flex-1'
          )}
          style={{ backgroundColor: brandColor }}
        >
          {applyText}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main DatePicker Component
// ============================================================================

export function DatePicker({
  value,
  rangeValue,
  onChange,
  onRangeChange,
  selectionMode = 'single',
  initialView = 'days',
  minDate,
  maxDate,
  disabledDates = [],
  showActions = false,
  onApply,
  onCancel,
  breakpoint = 'mobile',
  locale = 'en',
  className,
}: DatePickerProps) {
  const { brandColors } = useBrand();
  const brandColor = brandColors.primary;
  const brandColorLight = `${brandColor}1A`;
  
  const today = new Date();
  const initialDate = value || rangeValue?.start || today;
  
  const [viewType, setViewType] = useState<DatePickerViewType>(initialView);
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [yearRangeStart, setYearRangeStart] = useState(Math.floor(initialDate.getFullYear() / 10) * 10);
  
  const [viewType2, setViewType2] = useState<DatePickerViewType>(initialView);
  const [currentYear2, setCurrentYear2] = useState(
    initialDate.getMonth() === 11 ? initialDate.getFullYear() + 1 : initialDate.getFullYear()
  );
  const [currentMonth2, setCurrentMonth2] = useState(
    (initialDate.getMonth() + 1) % 12
  );
  const [yearRangeStart2, setYearRangeStart2] = useState(
    Math.floor((initialDate.getMonth() === 11 ? initialDate.getFullYear() + 1 : initialDate.getFullYear()) / 10) * 10
  );
  
  const [internalDate, setInternalDate] = useState<Date | null>(value || null);
  const [internalRangeStart, setInternalRangeStart] = useState<Date | null>(rangeValue?.start || null);
  const [internalRangeEnd, setInternalRangeEnd] = useState<Date | null>(rangeValue?.end || null);
  
  const [selectingStart, setSelectingStart] = useState(true);
  
  const selectedDate = showActions ? internalDate : value;
  const rangeStart = showActions ? internalRangeStart : (rangeValue?.start || null);
  const rangeEnd = showActions ? internalRangeEnd : (rangeValue?.end || null);

  const handlePrev = useCallback(() => {
    if (viewType === 'days') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (viewType === 'months') {
      setCurrentYear(currentYear - 1);
    } else {
      setYearRangeStart(yearRangeStart - 10);
    }
  }, [viewType, currentMonth, currentYear, yearRangeStart]);

  const handleNext = useCallback(() => {
    if (viewType === 'days') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (viewType === 'months') {
      setCurrentYear(currentYear + 1);
    } else {
      setYearRangeStart(yearRangeStart + 10);
    }
  }, [viewType, currentMonth, currentYear, yearRangeStart]);

  const handlePrev2 = useCallback(() => {
    if (viewType2 === 'days') {
      if (currentMonth2 === 0) {
        setCurrentMonth2(11);
        setCurrentYear2(currentYear2 - 1);
      } else {
        setCurrentMonth2(currentMonth2 - 1);
      }
    } else if (viewType2 === 'months') {
      setCurrentYear2(currentYear2 - 1);
    } else {
      setYearRangeStart2(yearRangeStart2 - 10);
    }
  }, [viewType2, currentMonth2, currentYear2, yearRangeStart2]);

  const handleNext2 = useCallback(() => {
    if (viewType2 === 'days') {
      if (currentMonth2 === 11) {
        setCurrentMonth2(0);
        setCurrentYear2(currentYear2 + 1);
      } else {
        setCurrentMonth2(currentMonth2 + 1);
      }
    } else if (viewType2 === 'months') {
      setCurrentYear2(currentYear2 + 1);
    } else {
      setYearRangeStart2(yearRangeStart2 + 10);
    }
  }, [viewType2, currentMonth2, currentYear2, yearRangeStart2]);

  const handleDateSelect = useCallback((date: Date) => {
    if (selectionMode === 'single') {
      if (showActions) {
        setInternalDate(date);
      } else {
        onChange?.(date);
      }
    } else {
      if (selectingStart) {
        if (showActions) {
          setInternalRangeStart(date);
          setInternalRangeEnd(null);
        } else {
          onRangeChange?.({ start: date, end: null });
        }
        setSelectingStart(false);
      } else {
        const start = showActions ? internalRangeStart : rangeValue?.start;
        if (start && date < start) {
          if (showActions) {
            setInternalRangeStart(date);
            setInternalRangeEnd(start);
          } else {
            onRangeChange?.({ start: date, end: start });
          }
        } else {
          if (showActions) {
            setInternalRangeEnd(date);
          } else {
            onRangeChange?.({ start: start || null, end: date });
          }
        }
        setSelectingStart(true);
      }
    }
  }, [selectionMode, showActions, selectingStart, internalRangeStart, rangeValue?.start, onChange, onRangeChange]);

  const handleMonthSelect = useCallback((month: number) => {
    setCurrentMonth(month);
    setViewType('days');
  }, []);

  const handleMonthSelect2 = useCallback((month: number) => {
    setCurrentMonth2(month);
    setViewType2('days');
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setCurrentYear(year);
    setViewType('months');
  }, []);

  const handleYearSelect2 = useCallback((year: number) => {
    setCurrentYear2(year);
    setViewType2('months');
  }, []);

  const handleApply = useCallback(() => {
    if (selectionMode === 'single') {
      onChange?.(internalDate);
    } else {
      onRangeChange?.({ start: internalRangeStart, end: internalRangeEnd });
    }
    onApply?.();
  }, [selectionMode, internalDate, internalRangeStart, internalRangeEnd, onChange, onRangeChange, onApply]);

  const handleCancel = useCallback(() => {
    setInternalDate(value || null);
    setInternalRangeStart(rangeValue?.start || null);
    setInternalRangeEnd(rangeValue?.end || null);
    onCancel?.();
  }, [value, rangeValue, onCancel]);

  const isDesktop = breakpoint === 'desktop';
  const showDualCalendar = isDesktop && selectionMode === 'range';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 bg-white dark:bg-neutral-900 rounded-2xl py-4 shadow-lg',
        className
      )}
    >
      <div className={cn('flex', showDualCalendar ? 'gap-4' : '')}>
        <CalendarPanel
          currentYear={currentYear}
          currentMonth={currentMonth}
          yearRangeStart={yearRangeStart}
          viewType={viewType}
          selectedDate={selectedDate || null}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          selectionMode={selectionMode}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          onDateSelect={handleDateSelect}
          onMonthSelect={handleMonthSelect}
          onYearSelect={handleYearSelect}
          onViewChange={setViewType}
          onPrev={handlePrev}
          onNext={handleNext}
          brandColor={brandColor}
          brandColorLight={brandColorLight}
          locale={locale}
        />
        
        {showDualCalendar && (
          <CalendarPanel
            currentYear={currentYear2}
            currentMonth={currentMonth2}
            yearRangeStart={yearRangeStart2}
            viewType={viewType2}
            selectedDate={selectedDate || null}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            selectionMode={selectionMode}
            disabledDates={disabledDates}
            minDate={minDate}
            maxDate={maxDate}
            onDateSelect={handleDateSelect}
            onMonthSelect={handleMonthSelect2}
            onYearSelect={handleYearSelect2}
            onViewChange={setViewType2}
            onPrev={handlePrev2}
            onNext={handleNext2}
            brandColor={brandColor}
            brandColorLight={brandColorLight}
            locale={locale}
          />
        )}
      </div>
      
      {showActions && (
        <ActionsDock
          onCancel={handleCancel}
          onApply={handleApply}
          brandColor={brandColor}
          locale={locale}
          isDesktop={isDesktop}
        />
      )}
    </div>
  );
}

export default DatePicker;
