'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { Breadcrumbs } from '@/components/ui';
import { Home2, Document, Folder2 } from 'iconsax-react';

export default function BreadcrumbsPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state - using controlValues pattern for LivePlayground
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    variant: 'desktop',
    showHomeIcon: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const variant = controlValues.variant as 'desktop' | 'mobile';
  const showHomeIcon = controlValues.showHomeIcon as boolean;

  // Sample breadcrumb items (no hrefs for demo - prevents navigation)
  const sampleItems = [
    { label: isArabic ? 'المستندات' : 'Documents' },
    { label: isArabic ? 'المكونات' : 'Components' },
    { label: isArabic ? 'التنقل' : 'Navigation' },
    { label: isArabic ? 'فتات الخبز' : 'Breadcrumbs' },
  ];

  // Props documentation
  const breadcrumbsProps = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      required: true,
      description: isArabic ? 'مصفوفة عناصر فتات الخبز' : 'Array of breadcrumb items',
    },
    {
      name: 'variant',
      type: "'desktop' | 'mobile'",
      defaultValue: "'desktop'",
      description: isArabic
        ? 'المتغير المتجاوب - سطح المكتب يعرض المسار الكامل، الجوال يعرض المطوي'
        : "Responsive variant - desktop shows full trail, mobile shows collapsed",
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: '2',
      description: isArabic
        ? 'الحد الأقصى للعناصر قبل الطي (للمتغير الجوال فقط)'
        : 'Maximum items to show before collapsing (mobile variant only)',
    },
    {
      name: 'separator',
      type: 'ReactNode',
      defaultValue: 'SlashDivider',
      description: isArabic ? 'عنصر فاصل مخصص' : 'Custom separator element',
    },
    {
      name: 'showHomeIcon',
      type: 'boolean',
      defaultValue: 'false',
      description: isArabic ? 'إظهار أيقونة المنزل في البداية' : 'Show home icon at the start',
    },
    {
      name: 'homeHref',
      type: 'string',
      defaultValue: "'/'",
      description: isArabic ? 'رابط أيقونة المنزل' : 'Home icon href',
    },
  ];

  const itemTypeProps = [
    {
      name: 'label',
      type: 'string',
      required: true,
      description: isArabic ? 'نص العنصر' : 'Display label for the breadcrumb',
    },
    {
      name: 'href',
      type: 'string',
      description: isArabic
        ? 'رابط اختياري - إذا لم يتم توفيره، العنصر غير قابل للنقر'
        : 'Optional href - if not provided, item is not clickable',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: isArabic ? 'أيقونة اختيارية للعرض قبل النص' : 'Optional icon to show before label',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'فتات الخبز' : 'Breadcrumbs'}
      description={
        isArabic
          ? 'تظهر فتات الخبز التسلسل الهرمي للتنقل وتسمح للمستخدمين بالعودة إلى الصفحات السابقة.'
          : 'Breadcrumbs show the navigation hierarchy and allow users to navigate back to previous pages.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<Breadcrumbs
  items={[
    { label: 'Documents', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Navigation', href: '/docs/components/navigation' },
    { label: 'Breadcrumbs' },
  ]}
  variant="${variant}"
  showHomeIcon={${showHomeIcon}}
/>`}
          controls={[
            {
              name: 'variant',
              nameAr: 'المتغير',
              type: 'select',
              defaultValue: 'desktop',
              options: [
                { value: 'desktop', label: 'Desktop', labelAr: 'سطح المكتب' },
                { value: 'mobile', label: 'Mobile', labelAr: 'الجوال' },
              ],
            },
            {
              name: 'showHomeIcon',
              nameAr: 'أيقونة المنزل',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="flex items-center justify-center py-8">
            <Breadcrumbs
              items={sampleItems}
              variant={variant}
              showHomeIcon={showHomeIcon}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'المتغيرات' : 'Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'فتات الخبز تأتي بمتغيرين متجاوبين: سطح المكتب (المسار الكامل) والجوال (مطوي مع علامات القطع).'
              : 'Breadcrumbs come in two responsive variants: desktop (full path) and mobile (collapsed with ellipsis).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Desktop Variant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'سطح المكتب' : 'Desktop'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                variant: desktop
              </span>
            </div>
            <div className="card p-6">
              <Breadcrumbs
                items={sampleItems}
                variant="desktop"
                showHomeIcon
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'يعرض المسار الكامل مع فجوة 12 بكسل بين العناصر.'
                : 'Shows the full navigation path with 12px gap between items.'}
            </p>
          </div>

          {/* Mobile Variant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'الجوال' : 'Mobile'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                variant: mobile
              </span>
            </div>
            <div className="card p-6">
              <Breadcrumbs
                items={sampleItems}
                variant="mobile"
                maxItems={2}
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'يعرض العناصر الأولى والأخيرة مع علامات القطع للعناصر المخفية.'
                : 'Shows first and last items with ellipsis for hidden items.'}
            </p>
          </div>
        </div>
      </section>

      {/* Item States Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'حالات العناصر' : 'Item States'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'كل عنصر يدعم حالات مختلفة: افتراضي، تحويم، ومركز. العنصر الحالي يظهر بلون العلامة التجارية.'
              : 'Each item supports different states: default, hover, and focused. The current item is styled with brand color.'}
          </p>
        </div>

        <div className="card p-6 space-y-6">
          {/* Current Item */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'العنصر الحالي' : 'Current Item'}
            </span>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
              <Breadcrumbs
                items={[
                  { label: isArabic ? 'المنزل' : 'Home' },
                  { label: isArabic ? 'الصفحة الحالية' : 'Current Page' },
                ]}
              />
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic
                ? 'العنصر الأخير هو الصفحة الحالية ويظهر بلون العلامة التجارية الأساسي.'
                : 'Last item is the current page and displayed with brand primary color.'}
            </p>
          </div>

          {/* Multiple Items */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'عناصر متعددة' : 'Multiple Items'}
            </span>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
              <Breadcrumbs
                items={[
                  { label: isArabic ? 'المنزل' : 'Home' },
                  { label: isArabic ? 'المستندات' : 'Documents' },
                  { label: isArabic ? 'الصفحة الحالية' : 'Current Page' },
                ]}
                showHomeIcon
              />
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic
                ? 'عناصر متعددة مع أيقونة المنزل في البداية.'
                : 'Multiple items with home icon at the start.'}
            </p>
          </div>
        </div>
      </section>

      {/* With Icons Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'مع الأيقونات' : 'With Icons'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'يمكن إضافة أيقونات اختيارية لكل عنصر لتحسين الوضوح البصري.'
              : 'Optional icons can be added to each item for improved visual clarity.'}
          </p>
        </div>

        <div className="card p-6">
          <Breadcrumbs
            items={[
              {
                label: isArabic ? 'المستندات' : 'Documents',
                icon: <Folder2 size={16} variant="Linear" className="text-inherit" />,
              },
              {
                label: isArabic ? 'الملف' : 'File',
                icon: <Document size={16} variant="Linear" className="text-inherit" />,
              },
            ]}
            showHomeIcon
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={breadcrumbsProps}
          title="Breadcrumbs Props"
          titleAr="خصائص فتات الخبز"
        />
        <PropsTable
          props={itemTypeProps}
          title="BreadcrumbItem Type"
          titleAr="نوع عنصر فتات الخبز"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Show the full path on desktop for better context',
              textAr: 'أظهر المسار الكامل على سطح المكتب لسياق أفضل',
            },
            {
              text: 'Collapse breadcrumbs on mobile to save space',
              textAr: 'اطوِ فتات الخبز على الجوال لتوفير المساحة',
            },
            {
              text: 'Make intermediate items clickable for navigation',
              textAr: 'اجعل العناصر الوسيطة قابلة للنقر للتنقل',
            },
            {
              text: 'Use clear, concise labels that match page titles',
              textAr: 'استخدم عناوين واضحة ومختصرة تتطابق مع عناوين الصفحات',
            },
          ]}
          donts={[
            {
              text: "Don't use breadcrumbs for linear flows (use stepper instead)",
              textAr: 'لا تستخدم فتات الخبز للتدفقات الخطية (استخدم المتدرج بدلاً من ذلك)',
            },
            {
              text: "Don't show more than 5 levels deep",
              textAr: 'لا تظهر أكثر من 5 مستويات عمقاً',
            },
            {
              text: "Don't make the current page item clickable",
              textAr: 'لا تجعل عنصر الصفحة الحالية قابلاً للنقر',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
