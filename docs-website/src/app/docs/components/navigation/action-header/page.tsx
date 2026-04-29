'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { ActionHeader, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { ExportSquare, Filter, Calendar, DocumentDownload } from 'iconsax-react';

export default function ActionHeaderPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    showActionIcon: true,
    showSeparator: false,
    showTabs: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const showActionIcon = controlValues.showActionIcon as boolean;
  const showSeparator = controlValues.showSeparator as boolean;
  const showTabs = controlValues.showTabs as boolean;

  // Tabs state for demo
  const [activeTab, setActiveTab] = useState('overview');

  // Props documentation
  const actionHeaderProps = [
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Left content slot for tabs, navigation, or custom content',
      descriptionAr: 'فتحة المحتوى اليسرى للتبويبات أو التنقل أو المحتوى المخصص',
    },
    {
      name: 'dropdownLabel',
      type: 'string',
      required: true,
      description: 'Label text for the dropdown button',
      descriptionAr: 'نص التسمية لزر القائمة المنسدلة',
    },
    {
      name: 'dropdownIcon',
      type: 'IconComponent',
      defaultValue: 'ArrowDown2',
      description: 'Custom icon for dropdown button (default: ArrowDown2)',
      descriptionAr: 'أيقونة مخصصة لزر القائمة المنسدلة (افتراضي: ArrowDown2)',
    },
    {
      name: 'onDropdownClick',
      type: '() => void',
      description: 'Callback when dropdown button is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على زر القائمة المنسدلة',
    },
    {
      name: 'actionLabel',
      type: 'string',
      required: true,
      description: 'Label text for the primary action button',
      descriptionAr: 'نص التسمية لزر الإجراء الرئيسي',
    },
    {
      name: 'actionIcon',
      type: 'IconComponent',
      description: 'Icon for the action button (displayed before label)',
      descriptionAr: 'أيقونة لزر الإجراء (تُعرض قبل التسمية)',
    },
    {
      name: 'onActionClick',
      type: '() => void',
      description: 'Callback when action button is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على زر الإجراء',
    },
    {
      name: 'showSeparator',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show bottom separator line',
      descriptionAr: 'إظهار خط الفاصل السفلي',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'رأس الإجراءات' : 'Action Header'}
      description={
        isArabic
          ? 'شريط أدوات أفقي يعرض محتوى قابل للتخصيص على اليسار (تبويبات، تنقل) وأزرار إجراءات ثابتة على اليمين (قائمة منسدلة + إجراء رئيسي).'
          : 'A horizontal toolbar that displays composable content on the left (tabs, navigation) and fixed action buttons on the right (dropdown filter + primary action).'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<ActionHeader
  dropdownLabel="${isArabic ? 'هذا الشهر' : 'This Month'}"
  actionLabel="${isArabic ? 'تصدير' : 'Export'}"
  ${showActionIcon ? 'actionIcon={ExportSquare}' : ''}
  showSeparator={${showSeparator}}
>
  ${showTabs ? `<Tabs defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">${isArabic ? 'الملخص' : 'Overview'}</TabsTrigger>
      <TabsTrigger value="orders">${isArabic ? 'الطلبات' : 'Orders'}</TabsTrigger>
      <TabsTrigger value="sales">${isArabic ? 'المبيعات' : 'Sales'}</TabsTrigger>
    </TabsList>
  </Tabs>` : ''}
</ActionHeader>`}
          controls={[
            {
              name: 'showTabs',
              nameAr: 'إظهار التبويبات',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showActionIcon',
              nameAr: 'أيقونة الإجراء',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showSeparator',
              nameAr: 'الفاصل',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-[1116px]">
            <ActionHeader
              dropdownLabel={isArabic ? 'هذا الشهر' : 'This Month'}
              actionLabel={isArabic ? 'تصدير' : 'Export'}
              actionIcon={showActionIcon ? ExportSquare : undefined}
              showSeparator={showSeparator}
            >
              {showTabs && (
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="overview">{isArabic ? 'الملخص' : 'Overview'}</TabsTrigger>
                    <TabsTrigger value="orders">{isArabic ? 'الطلبات' : 'Orders'}</TabsTrigger>
                    <TabsTrigger value="sales">{isArabic ? 'المبيعات' : 'Sales'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            </ActionHeader>
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
              ? 'رأس الإجراءات مرن ويمكن استخدامه مع أنواع مختلفة من المحتوى.'
              : 'Action Header is flexible and can be used with different types of content.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* With Tabs */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع التبويبات' : 'With Tabs'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <ActionHeader
                dropdownLabel={isArabic ? 'هذا الشهر' : 'This Month'}
                actionLabel={isArabic ? 'تصدير' : 'Export'}
                actionIcon={ExportSquare}
              >
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">{isArabic ? 'الملخص' : 'Overview'}</TabsTrigger>
                    <TabsTrigger value="orders">{isArabic ? 'الطلبات' : 'Orders'}</TabsTrigger>
                    <TabsTrigger value="sales">{isArabic ? 'المبيعات' : 'Sales'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ActionHeader>
            </div>
          </div>

          {/* Without Left Content */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بدون محتوى يسار' : 'Without Left Content'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <ActionHeader
                dropdownLabel={isArabic ? 'هذا الأسبوع' : 'This Week'}
                actionLabel={isArabic ? 'تحميل' : 'Download'}
                actionIcon={DocumentDownload}
              />
            </div>
          </div>

          {/* With Custom Icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع أيقونات مخصصة' : 'With Custom Icons'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <ActionHeader
                dropdownLabel={isArabic ? 'تصفية' : 'Filter'}
                dropdownIcon={Filter}
                actionLabel={isArabic ? 'تصدير التقرير' : 'Export Report'}
                actionIcon={ExportSquare}
              >
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">{isArabic ? 'الكل' : 'All'}</TabsTrigger>
                    <TabsTrigger value="active">{isArabic ? 'نشط' : 'Active'}</TabsTrigger>
                    <TabsTrigger value="archived">{isArabic ? 'مؤرشف' : 'Archived'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ActionHeader>
            </div>
          </div>

          {/* With Separator */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع فاصل' : 'With Separator'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <ActionHeader
                dropdownLabel={isArabic ? 'التقويم' : 'Calendar'}
                dropdownIcon={Calendar}
                actionLabel={isArabic ? 'إضافة جديد' : 'Add New'}
                showSeparator
              >
                <Tabs defaultValue="day">
                  <TabsList>
                    <TabsTrigger value="day">{isArabic ? 'يوم' : 'Day'}</TabsTrigger>
                    <TabsTrigger value="week">{isArabic ? 'أسبوع' : 'Week'}</TabsTrigger>
                    <TabsTrigger value="month">{isArabic ? 'شهر' : 'Month'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ActionHeader>
            </div>
          </div>

          {/* Action Without Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'إجراء بدون أيقونة' : 'Action Without Icon'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <ActionHeader
                dropdownLabel={isArabic ? 'آخر 30 يوم' : 'Last 30 Days'}
                actionLabel={isArabic ? 'تطبيق' : 'Apply'}
              >
                <Tabs defaultValue="reports">
                  <TabsList>
                    <TabsTrigger value="reports">{isArabic ? 'التقارير' : 'Reports'}</TabsTrigger>
                    <TabsTrigger value="analytics">{isArabic ? 'التحليلات' : 'Analytics'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ActionHeader>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={actionHeaderProps}
          title="ActionHeader Props"
          titleAr="خصائص رأس الإجراءات"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use for dashboard headers with filters and actions',
              textAr: 'استخدم لرؤوس لوحة التحكم مع المرشحات والإجراءات',
            },
            {
              text: 'Combine with Tabs component for navigation',
              textAr: 'ادمج مع مكون التبويبات للتنقل',
            },
            {
              text: 'Use clear, action-oriented labels for buttons',
              textAr: 'استخدم تسميات واضحة وموجهة للإجراء للأزرار',
            },
            {
              text: 'Include icons for better visual recognition',
              textAr: 'أضف أيقونات للتعرف البصري الأفضل',
            },
          ]}
          donts={[
            {
              text: "Don't overload with too many tabs",
              textAr: 'لا تفرط في استخدام عدد كبير من التبويبات',
            },
            {
              text: "Don't use vague labels like 'Click Here'",
              textAr: 'لا تستخدم تسميات غامضة مثل "انقر هنا"',
            },
            {
              text: "Don't hide the primary action button",
              textAr: 'لا تخفِ زر الإجراء الرئيسي',
            },
            {
              text: "Don't use on narrow mobile screens without adapting",
              textAr: 'لا تستخدم على شاشات الجوال الضيقة بدون تكييف',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}

