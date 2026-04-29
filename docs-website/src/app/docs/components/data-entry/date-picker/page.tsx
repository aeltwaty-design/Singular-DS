'use client';

import { useState } from 'react';
import { Calendar } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { DatePicker } from '@/components/ui';
import type { DatePickerViewType, DatePickerSelectionMode, DatePickerBreakpoint } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useLocale } from 'next-intl';
import { useBrand } from '@/components/providers/Providers';

export default function DatePickerPage() {
  const component = getComponentBySlug('data-entry', 'date-picker');
  const locale = useLocale() as 'en' | 'ar';
  const { brandColors } = useBrand();
  
  // Playground state
  const [playgroundView, setPlaygroundView] = useState<DatePickerViewType>('days');
  const [playgroundMode, setPlaygroundMode] = useState<DatePickerSelectionMode>('single');
  const [playgroundBreakpoint, setPlaygroundBreakpoint] = useState<DatePickerBreakpoint>('mobile');
  const [playgroundShowActions, setPlaygroundShowActions] = useState(true);
  
  // Single date state
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  
  // Range date state
  const [rangeValue, setRangeValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  
  // Example disabled dates (9-13 of current month)
  const today = new Date();
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 9),
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 11),
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 13),
  ];

  if (!component) return null;

  const code = `import { DatePicker } from '@singular/ui';

// Single date selection
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  selectionMode="single"
  showActions
  locale="en"
/>

// Date range selection
<DatePicker
  rangeValue={dateRange}
  onRangeChange={(range) => setDateRange(range)}
  selectionMode="range"
  breakpoint="desktop"
  showActions
/>

// With disabled dates
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  disabledDates={[new Date(2024, 0, 15), new Date(2024, 0, 16)]}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
/>`;

  const formatDate = (date: Date | null): string => {
    if (!date) return 'None';
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Entry"
      categorySlug="data-entry"
      icon={<Calendar variant="Bold" className="w-6 h-6" />}
    >
      <div className="space-y-12">
        {/* Main Interactive Playground */}
        <LivePlayground
          code={code}
          customControls={
            <div className="flex flex-wrap items-start gap-x-6 gap-y-4 mb-4">
              {/* View Type */}
              <div className="min-w-[140px]">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  {locale === 'ar' ? 'نوع العرض' : 'View Type'}
                </label>
                <select
                  value={playgroundView}
                  onChange={(e) => setPlaygroundView(e.target.value as DatePickerViewType)}
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                >
                  <option value="days">{locale === 'ar' ? 'الأيام' : 'Days'}</option>
                  <option value="months">{locale === 'ar' ? 'الشهور' : 'Months'}</option>
                  <option value="years">{locale === 'ar' ? 'السنوات' : 'Years'}</option>
                </select>
              </div>
              
              {/* Selection Mode */}
              <div className="min-w-[140px]">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  {locale === 'ar' ? 'وضع التحديد' : 'Selection Mode'}
                </label>
                <select
                  value={playgroundMode}
                  onChange={(e) => setPlaygroundMode(e.target.value as DatePickerSelectionMode)}
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                >
                  <option value="single">{locale === 'ar' ? 'تاريخ واحد' : 'Single'}</option>
                  <option value="range">{locale === 'ar' ? 'نطاق' : 'Range'}</option>
                </select>
              </div>
              
              {/* Breakpoint */}
              <div className="min-w-[140px]">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  {locale === 'ar' ? 'نقطة التوقف' : 'Breakpoint'}
                </label>
                <select
                  value={playgroundBreakpoint}
                  onChange={(e) => setPlaygroundBreakpoint(e.target.value as DatePickerBreakpoint)}
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                >
                  <option value="mobile">{locale === 'ar' ? 'جوال' : 'Mobile'}</option>
                  <option value="desktop">{locale === 'ar' ? 'سطح المكتب' : 'Desktop'}</option>
                </select>
              </div>
              
              {/* Show Actions Toggle */}
              <div className="min-w-[100px]">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  {locale === 'ar' ? 'إظهار الأزرار' : 'Show Actions'}
                </label>
                <div className="flex items-center h-[30px]">
                  <button
                    type="button"
                    onClick={() => setPlaygroundShowActions(!playgroundShowActions)}
                    className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                    style={{
                      backgroundColor: playgroundShowActions ? brandColors.primary : undefined,
                    }}
                  >
                    {!playgroundShowActions && (
                      <div className="absolute inset-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    )}
                    <span
                      className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        playgroundShowActions ? 'ltr:translate-x-5 rtl:-translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              {/* Selection Display */}
              <div className="min-w-[200px]">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  {locale === 'ar' ? 'التحديد الحالي' : 'Current Selection'}
                </label>
                <div className="px-2.5 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {playgroundMode === 'single' ? (
                    formatDate(singleDate)
                  ) : (
                    `${formatDate(rangeValue.start)} → ${formatDate(rangeValue.end)}`
                  )}
                </div>
              </div>
            </div>
          }
        >
          <div className="flex items-center justify-center overflow-x-auto py-4">
            <DatePicker
              value={playgroundMode === 'single' ? singleDate : undefined}
              rangeValue={playgroundMode === 'range' ? rangeValue : undefined}
              onChange={playgroundMode === 'single' ? setSingleDate : undefined}
              onRangeChange={playgroundMode === 'range' ? setRangeValue : undefined}
              selectionMode={playgroundMode}
              initialView={playgroundView}
              breakpoint={playgroundBreakpoint}
              showActions={playgroundShowActions}
              disabledDates={disabledDates}
              locale={locale}
              onApply={() => console.log('Applied!')}
              onCancel={() => console.log('Cancelled!')}
            />
          </div>
        </LivePlayground>

        {/* View Types Section */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            {locale === 'ar' ? 'أنواع العرض' : 'View Types'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {locale === 'ar'
              ? 'يدعم منتقي التاريخ ثلاثة أوضاع عرض: الأيام والشهور والسنوات. انقر على رأس الشهر/السنة للتبديل بين الأوضاع.'
              : 'The date picker supports three view modes: Days, Months, and Years. Click on the month/year header to switch between views.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {locale === 'ar' ? 'عرض الأيام' : 'Days View'}
              </h3>
              <DatePicker
                initialView="days"
                selectionMode="single"
                locale={locale}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {locale === 'ar' ? 'عرض الشهور' : 'Months View'}
              </h3>
              <DatePicker
                initialView="months"
                selectionMode="single"
                locale={locale}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {locale === 'ar' ? 'عرض السنوات' : 'Years View'}
              </h3>
              <DatePicker
                initialView="years"
                selectionMode="single"
                locale={locale}
              />
            </div>
          </div>
        </section>

        {/* Selection Modes Section */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            {locale === 'ar' ? 'أوضاع التحديد' : 'Selection Modes'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {locale === 'ar'
              ? 'اختر تاريخًا واحدًا أو نطاق تواريخ. في وضع النطاق على سطح المكتب، يتم عرض تقويمين جنبًا إلى جنب.'
              : 'Select a single date or a date range. In range mode on desktop, two calendars are shown side-by-side.'}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {locale === 'ar' ? 'تاريخ واحد' : 'Single Date'}
              </h3>
              <DatePicker
                selectionMode="single"
                showActions
                locale={locale}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {locale === 'ar' ? 'نطاق التواريخ (سطح المكتب)' : 'Date Range (Desktop)'}
              </h3>
              <DatePicker
                selectionMode="range"
                breakpoint="desktop"
                showActions
                locale={locale}
              />
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            {locale === 'ar' ? 'معاينة متجاوبة' : 'Responsive Preview'}
          </h2>
          <ResponsivePreview
            mobile={
              <DatePicker
                selectionMode="single"
                breakpoint="mobile"
                showActions
                locale={locale}
              />
            }
            tablet={
              <DatePicker
                selectionMode="range"
                breakpoint="mobile"
                showActions
                locale={locale}
              />
            }
            desktop={
              <DatePicker
                selectionMode="range"
                breakpoint="desktop"
                showActions
                locale={locale}
              />
            }
          />
        </section>

        {/* Day Cell States */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            {locale === 'ar' ? 'حالات خلية اليوم' : 'Day Cell States'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {locale === 'ar'
              ? 'تُظهر خلايا الأيام حالات مختلفة: غير محدد، اليوم (حدود)، محدد (معبأ)، بداية/نهاية النطاق، وسط النطاق، ومعطل (مشطوب).'
              : 'Day cells display different states: Unselected, Today (outlined), Selected (filled), Range Start/End, Range Mid, and Disabled (strikethrough).'}
          </p>
          <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {/* Unselected */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm text-neutral-900 dark:text-white">
                  15
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'غير محدد' : 'Unselected'}
                </span>
              </div>
              
              {/* Today */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm text-neutral-900 dark:text-white">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  <span className="relative z-10">{today.getDate()}</span>
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'اليوم' : 'Today'}
                </span>
              </div>
              
              {/* Selected */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm">
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                    style={{ backgroundColor: brandColors.primary }}
                  />
                  <span className="relative z-10 text-neutral-900">25</span>
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'محدد' : 'Selected'}
                </span>
              </div>
              
              {/* Range Start */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm">
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 right-0 h-8"
                    style={{ backgroundColor: `${brandColors.primary}1A` }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                    style={{ backgroundColor: brandColors.primary }}
                  />
                  <span className="relative z-10 text-neutral-900">17</span>
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'بداية النطاق' : 'Range Start'}
                </span>
              </div>
              
              {/* Range Mid */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm">
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8"
                    style={{ backgroundColor: `${brandColors.primary}1A` }}
                  />
                  <span className="relative z-10 text-neutral-900 dark:text-white">20</span>
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'وسط النطاق' : 'Range Mid'}
                </span>
              </div>
              
              {/* Range End */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm">
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-1/2 h-8"
                    style={{ backgroundColor: `${brandColors.primary}1A` }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                    style={{ backgroundColor: brandColors.primary }}
                  />
                  <span className="relative z-10 text-neutral-900">25</span>
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'نهاية النطاق' : 'Range End'}
                </span>
              </div>
              
              {/* Disabled */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-8 w-10 flex items-center justify-center text-sm text-neutral-400 dark:text-neutral-500 line-through">
                  12
                </div>
                <span className="text-xs text-neutral-500">
                  {locale === 'ar' ? 'معطل' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use native date picker on mobile for better UX', textAr: 'استخدم منتقي التاريخ الأصلي على الجوال لتجربة أفضل' },
            { text: 'Show date format hint when using input fields', textAr: 'أظهر تلميح تنسيق التاريخ عند استخدام حقول الإدخال' },
            { text: 'Disable dates that are not selectable and explain why', textAr: 'عطّل التواريخ غير القابلة للتحديد ووضح السبب' },
            { text: 'Use dual calendar view for range selection on desktop', textAr: 'استخدم عرض التقويم المزدوج لتحديد النطاق على سطح المكتب' },
            { text: 'Highlight today\'s date for context', textAr: 'ميّز تاريخ اليوم للسياق' },
          ]}
          donts={[
            { text: 'Don\'t use for time selection (use time picker instead)', textAr: 'لا تستخدم لاختيار الوقت (استخدم منتقي الوقت بدلاً من ذلك)' },
            { text: 'Don\'t show disabled dates without visual distinction', textAr: 'لا تظهر التواريخ المعطلة بدون تمييز بصري' },
            { text: 'Don\'t allow selecting dates outside valid range without feedback', textAr: 'لا تسمح بتحديد تواريخ خارج النطاق الصالح بدون ردود فعل' },
            { text: 'Don\'t hide navigation when dates are limited', textAr: 'لا تخفِ التنقل عندما تكون التواريخ محدودة' },
          ]}
        />

        {/* API Reference */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            {locale === 'ar' ? 'مرجع الواجهة البرمجية' : 'API Reference'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-start py-3 px-4 font-medium text-neutral-900 dark:text-white">
                    {locale === 'ar' ? 'الخاصية' : 'Prop'}
                  </th>
                  <th className="text-start py-3 px-4 font-medium text-neutral-900 dark:text-white">
                    {locale === 'ar' ? 'النوع' : 'Type'}
                  </th>
                  <th className="text-start py-3 px-4 font-medium text-neutral-900 dark:text-white">
                    {locale === 'ar' ? 'الافتراضي' : 'Default'}
                  </th>
                  <th className="text-start py-3 px-4 font-medium text-neutral-900 dark:text-white">
                    {locale === 'ar' ? 'الوصف' : 'Description'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-neutral-600 dark:text-neutral-400">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">value</td>
                  <td className="py-3 px-4 font-mono text-xs">Date | null</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Selected date for single mode</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">rangeValue</td>
                  <td className="py-3 px-4 font-mono text-xs">{`{ start: Date | null; end: Date | null }`}</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Selected range for range mode</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">selectionMode</td>
                  <td className="py-3 px-4 font-mono text-xs">&apos;single&apos; | &apos;range&apos;</td>
                  <td className="py-3 px-4">&apos;single&apos;</td>
                  <td className="py-3 px-4">Selection mode</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">initialView</td>
                  <td className="py-3 px-4 font-mono text-xs">&apos;days&apos; | &apos;months&apos; | &apos;years&apos;</td>
                  <td className="py-3 px-4">&apos;days&apos;</td>
                  <td className="py-3 px-4">Initial view type</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">breakpoint</td>
                  <td className="py-3 px-4 font-mono text-xs">&apos;mobile&apos; | &apos;desktop&apos;</td>
                  <td className="py-3 px-4">&apos;mobile&apos;</td>
                  <td className="py-3 px-4">Layout breakpoint</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">showActions</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Show Cancel/Apply buttons</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">disabledDates</td>
                  <td className="py-3 px-4 font-mono text-xs">Date[]</td>
                  <td className="py-3 px-4">[]</td>
                  <td className="py-3 px-4">Array of disabled dates</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">minDate</td>
                  <td className="py-3 px-4 font-mono text-xs">Date</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Minimum selectable date</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">maxDate</td>
                  <td className="py-3 px-4 font-mono text-xs">Date</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Maximum selectable date</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">locale</td>
                  <td className="py-3 px-4 font-mono text-xs">&apos;en&apos; | &apos;ar&apos;</td>
                  <td className="py-3 px-4">&apos;en&apos;</td>
                  <td className="py-3 px-4">Locale for labels</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ComponentDocTemplate>
  );
}
