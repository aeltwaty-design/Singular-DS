'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { Pagination } from '@/components/ui';

export default function PaginationPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    variant: 'numbers',
    buttonStyle: 'filled',
    size: 'lg',
    currentPage: 3,
    showRecordsInfo: true,
    showItemsPerPage: true,
    disabled: false,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const variant = controlValues.variant as 'numbers' | 'compact';
  const buttonStyle = controlValues.buttonStyle as 'filled' | 'outlined';
  const size = controlValues.size as 'sm' | 'lg';
  const currentPage = controlValues.currentPage as number;
  const showRecordsInfo = controlValues.showRecordsInfo as boolean;
  const showItemsPerPage = controlValues.showItemsPerPage as boolean;
  const disabled = controlValues.disabled as boolean;

  // Demo values
  const totalPages = 10;
  const totalRecords = 100;
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setControlValues((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    // Reset to page 1 when items per page changes
    setControlValues((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Props documentation
  const paginationProps = [
    {
      name: 'currentPage',
      type: 'number',
      required: true,
      description: 'Current active page (1-indexed)',
      descriptionAr: 'الصفحة النشطة الحالية (تبدأ من 1)',
    },
    {
      name: 'totalPages',
      type: 'number',
      required: true,
      description: 'Total number of pages',
      descriptionAr: 'إجمالي عدد الصفحات',
    },
    {
      name: 'onPageChange',
      type: '(page: number) => void',
      required: true,
      description: 'Callback when page changes',
      descriptionAr: 'دالة الاستدعاء عند تغيير الصفحة',
    },
    {
      name: 'totalRecords',
      type: 'number',
      description: 'Total number of records/items (for records info display)',
      descriptionAr: 'إجمالي عدد السجلات/العناصر (لعرض معلومات السجلات)',
    },
    {
      name: 'itemsPerPage',
      type: 'number',
      defaultValue: '10',
      description: 'Number of items per page',
      descriptionAr: 'عدد العناصر في الصفحة',
    },
    {
      name: 'itemsPerPageOptions',
      type: 'number[]',
      defaultValue: '[10, 20, 50, 100]',
      description: 'Available options for items per page dropdown',
      descriptionAr: 'الخيارات المتاحة لقائمة العناصر في الصفحة',
    },
    {
      name: 'onItemsPerPageChange',
      type: '(itemsPerPage: number) => void',
      description: 'Callback when items per page changes',
      descriptionAr: 'دالة الاستدعاء عند تغيير عدد العناصر في الصفحة',
    },
    {
      name: 'showRecordsInfo',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show records count info (e.g., "1-10 of 100")',
      descriptionAr: 'إظهار معلومات عدد السجلات (مثل "1-10 من 100")',
    },
    {
      name: 'showItemsPerPage',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show items per page selector',
      descriptionAr: 'إظهار محدد العناصر في الصفحة',
    },
    {
      name: 'itemsPerPageLabel',
      type: 'string',
      description: 'Label for items per page dropdown',
      descriptionAr: 'تسمية قائمة العناصر في الصفحة',
    },
    {
      name: 'variant',
      type: "'numbers' | 'compact'",
      defaultValue: "'numbers'",
      description: 'Layout variant - numbers shows page buttons, compact shows page info',
      descriptionAr: 'نوع التخطيط - الأرقام تعرض أزرار الصفحات، المضغوط يعرض معلومات الصفحة',
    },
    {
      name: 'buttonStyle',
      type: "'filled' | 'outlined'",
      defaultValue: "'filled'",
      description: 'Visual style - filled has solid background, outlined has border only',
      descriptionAr: 'النمط البصري - المملوء له خلفية صلبة، المحدد له حدود فقط',
    },
    {
      name: 'size',
      type: "'sm' | 'lg'",
      defaultValue: "'lg'",
      description: 'Size of pagination buttons',
      descriptionAr: 'حجم أزرار الترقيم',
    },
    {
      name: 'siblingCount',
      type: 'number',
      defaultValue: '1',
      description: 'Number of sibling pages to show on each side of current',
      descriptionAr: 'عدد الصفحات المجاورة للعرض على كل جانب من الصفحة الحالية',
    },
    {
      name: 'showFirstLast',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Always show first and last page',
      descriptionAr: 'إظهار الصفحة الأولى والأخيرة دائمًا',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disable all pagination controls',
      descriptionAr: 'تعطيل جميع عناصر التحكم في الترقيم',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'الترقيم' : 'Pagination'}
      description={
        isArabic
          ? 'يتيح الترقيم التنقل بين صفحات المحتوى. يدعم عرض عدد السجلات ومحدد العناصر في الصفحة.'
          : 'Pagination enables navigation between pages of content. Supports records count display and items per page selector.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<Pagination
  currentPage={${currentPage}}
  totalPages={${totalPages}}
  onPageChange={(page) => setCurrentPage(page)}
  totalRecords={${totalRecords}}
  itemsPerPage={${itemsPerPage}}
  onItemsPerPageChange={(n) => setItemsPerPage(n)}
  showRecordsInfo={${showRecordsInfo}}
  showItemsPerPage={${showItemsPerPage}}
  variant="${variant}"
  buttonStyle="${buttonStyle}"
  size="${size}"
  disabled={${disabled}}
/>`}
          controls={[
            {
              name: 'variant',
              nameAr: 'النوع',
              type: 'select',
              options: [
                { value: 'numbers', label: 'Numbers', labelAr: 'أرقام' },
                { value: 'compact', label: 'Compact', labelAr: 'مضغوط' },
              ],
              defaultValue: 'numbers',
            },
            {
              name: 'buttonStyle',
              nameAr: 'نمط الأزرار',
              type: 'select',
              options: [
                { value: 'filled', label: 'Filled', labelAr: 'مملوء' },
                { value: 'outlined', label: 'Outlined', labelAr: 'محدد' },
              ],
              defaultValue: 'filled',
            },
            {
              name: 'size',
              nameAr: 'الحجم',
              type: 'select',
              options: [
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
              ],
              defaultValue: 'lg',
            },
            {
              name: 'showRecordsInfo',
              nameAr: 'عرض عدد السجلات',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showItemsPerPage',
              nameAr: 'محدد العناصر/الصفحة',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'disabled',
              nameAr: 'معطل',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalRecords={totalRecords}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              showRecordsInfo={showRecordsInfo}
              showItemsPerPage={showItemsPerPage}
              variant={variant}
              buttonStyle={buttonStyle}
              size={size}
              disabled={disabled}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Examples Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'أمثلة' : 'Examples'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'الترقيم مرن ويمكن استخدامه في سياقات مختلفة.'
              : 'Pagination is flexible and can be used in different contexts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Filled Style (Default) */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'نمط مملوء (افتراضي)' : 'Filled Style (Default)'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showRecordsInfo
                showItemsPerPage
                buttonStyle="filled"
              />
            </div>
          </div>

          {/* Outlined Style */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'نمط محدد' : 'Outlined Style'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showRecordsInfo
                showItemsPerPage
                buttonStyle="outlined"
              />
            </div>
          </div>

          {/* Full Featured */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'كامل الميزات (السجلات + العناصر/الصفحة)' : 'Full Featured (Records + Items/Page)'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showRecordsInfo
                showItemsPerPage
              />
            </div>
          </div>

          {/* With Records Info Only */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع عدد السجلات فقط' : 'With Records Info Only'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={5}
                totalPages={20}
                onPageChange={() => {}}
                totalRecords={200}
                itemsPerPage={10}
                showRecordsInfo
              />
            </div>
          </div>

          {/* With Items Per Page Only */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع محدد العناصر/الصفحة فقط' : 'With Items Per Page Only'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={2}
                totalPages={10}
                onPageChange={() => {}}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showItemsPerPage
                itemsPerPageLabel={isArabic ? 'عناصر/صفحة' : 'Items/page'}
              />
            </div>
          </div>

          {/* Numbers Only (Simple) */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'الأرقام فقط (بسيط)' : 'Numbers Only (Simple)'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 flex justify-center">
              <Pagination
                currentPage={5}
                totalPages={10}
                onPageChange={() => {}}
              />
            </div>
          </div>

          {/* Compact Variant */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'النوع المضغوط' : 'Compact Variant'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                showRecordsInfo
                variant="compact"
              />
            </div>
          </div>

          {/* Small Size */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'حجم صغير' : 'Small Size'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={4}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showRecordsInfo
                showItemsPerPage
                size="sm"
              />
            </div>
          </div>

          {/* First Page */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'الصفحة الأولى' : 'First Page'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                showRecordsInfo
              />
            </div>
          </div>

          {/* Last Page */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'الصفحة الأخيرة' : 'Last Page'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={10}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                showRecordsInfo
              />
            </div>
          </div>

          {/* Many Pages */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'صفحات كثيرة' : 'Many Pages'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={50}
                totalPages={100}
                onPageChange={() => {}}
                totalRecords={1000}
                itemsPerPage={10}
                showRecordsInfo
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'حالة معطلة' : 'Disabled State'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Pagination
                currentPage={5}
                totalPages={10}
                onPageChange={() => {}}
                totalRecords={100}
                itemsPerPage={10}
                onItemsPerPageChange={() => {}}
                showRecordsInfo
                showItemsPerPage
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={paginationProps}
          title="Pagination Props"
          titleAr="خصائص الترقيم"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Show current page clearly with visual distinction',
              textAr: 'أظهر الصفحة الحالية بوضوح مع تمييز بصري',
            },
            {
              text: 'Display records count to show data context (e.g., "1-10 of 100")',
              textAr: 'اعرض عدد السجلات لإظهار سياق البيانات (مثل "1-10 من 100")',
            },
            {
              text: 'Allow users to select items per page for better control',
              textAr: 'اسمح للمستخدمين باختيار عدد العناصر في الصفحة لتحكم أفضل',
            },
            {
              text: 'Use compact variant for mobile or limited space',
              textAr: 'استخدم النوع المضغوط للجوال أو المساحات المحدودة',
            },
            {
              text: 'Disable navigation buttons at boundaries',
              textAr: 'عطّل أزرار التنقل عند الحدود',
            },
          ]}
          donts={[
            {
              text: "Don't show too many page numbers at once",
              textAr: 'لا تظهر الكثير من أرقام الصفحات في وقت واحد',
            },
            {
              text: "Don't use for infinite scroll content",
              textAr: 'لا تستخدم للمحتوى اللانهائي',
            },
            {
              text: "Don't hide the current page indicator",
              textAr: 'لا تخفِ مؤشر الصفحة الحالية',
            },
            {
              text: "Don't use pagination for very few items (under 10)",
              textAr: 'لا تستخدم الترقيم لعناصر قليلة جدًا (أقل من 10)',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
