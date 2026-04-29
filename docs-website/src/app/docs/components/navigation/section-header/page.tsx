'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { SectionHeader } from '@/components/ui';
import { Category, Box, More, Setting2, Chart } from 'iconsax-react';

export default function SectionHeaderPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    size: 'lg',
    showLeadingIcon: true,
    showHelpIcon: false,
    showTrailingAction: true,
    showSupportingText: true,
    showSeparator: false,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const size = controlValues.size as 'xl' | 'lg' | 'md' | 'sm';
  const showLeadingIcon = controlValues.showLeadingIcon as boolean;
  const showHelpIcon = controlValues.showHelpIcon as boolean;
  const showTrailingAction = controlValues.showTrailingAction as boolean;
  const showSupportingText = controlValues.showSupportingText as boolean;
  const showSeparator = controlValues.showSeparator as boolean;

  // Props documentation
  const sectionHeaderProps = [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Main title text displayed in the header',
      descriptionAr: 'نص العنوان الرئيسي المعروض في الرأس',
    },
    {
      name: 'supportingText',
      type: 'string',
      description: 'Supporting description text below the title (shown for all sizes)',
      descriptionAr: 'نص الوصف الداعم أسفل العنوان (يظهر لجميع الأحجام)',
    },
    {
      name: 'size',
      type: "'xl' | 'lg' | 'md' | 'sm'",
      defaultValue: "'lg'",
      description: 'Size variant: xl (24px), lg (20px), md (16px), sm (14px)',
      descriptionAr: 'حجم المتغير: xl (24 بكسل)، lg (20 بكسل)، md (16 بكسل)، sm (14 بكسل)',
    },
    {
      name: 'leadingIcon',
      type: 'IconComponent',
      description: 'Leading icon component displayed before the title',
      descriptionAr: 'مكون الأيقونة الأمامية المعروضة قبل العنوان',
    },
    {
      name: 'showHelpIcon',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show help icon (question mark) after the title',
      descriptionAr: 'إظهار أيقونة المساعدة (علامة استفهام) بعد العنوان',
    },
    {
      name: 'trailingAction',
      type: 'string',
      description: 'Trailing action text (displayed as hyperlink)',
      descriptionAr: 'نص الإجراء الثانوي (يعرض كرابط)',
    },
    {
      name: 'onTrailingActionClick',
      type: '() => void',
      description: 'Callback when trailing action is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على الإجراء الثانوي',
    },
    {
      name: 'showTrailingHelpIcon',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show help icon after the trailing action',
      descriptionAr: 'إظهار أيقونة المساعدة بعد الإجراء الثانوي',
    },
    {
      name: 'trailingIcon',
      type: 'IconComponent',
      description: 'Trailing icon component (e.g., menu icon)',
      descriptionAr: 'مكون الأيقونة الثانوية (مثل أيقونة القائمة)',
    },
    {
      name: 'onTrailingIconClick',
      type: '() => void',
      description: 'Callback when trailing icon is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على الأيقونة الثانوية',
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
      title={isArabic ? 'رأس القسم' : 'Section Header'}
      description={
        isArabic
          ? 'يعرض رأس القسم عناوين الأقسام مع نص داعم اختياري وأيقونات وإجراءات ثانوية. يأتي بأربعة أحجام مختلفة.'
          : 'Section Header displays section titles with optional supporting text, icons, and trailing actions. Comes in four different sizes.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<SectionHeader
  title="${isArabic ? 'يكتب هنا عنوان' : 'Write title here'}"
  supportingText={${showSupportingText ? `"${isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}"` : 'undefined'}}
  size="${size}"
  ${showLeadingIcon ? 'leadingIcon={Category}' : ''}
  ${showHelpIcon ? 'showHelpIcon={true}' : ''}
  ${showTrailingAction ? `trailingAction="${isArabic ? 'يكتب هنا نص' : 'Text Here'}"` : ''}
  showSeparator={${showSeparator}}
/>`}
          controls={[
            {
              name: 'size',
              nameAr: 'الحجم',
              type: 'select',
              defaultValue: 'lg',
              options: [
                { value: 'xl', label: 'X-Large (24px)', labelAr: 'كبير جداً (24 بكسل)' },
                { value: 'lg', label: 'Large (20px)', labelAr: 'كبير (20 بكسل)' },
                { value: 'md', label: 'Medium (16px)', labelAr: 'متوسط (16 بكسل)' },
                { value: 'sm', label: 'Small (14px)', labelAr: 'صغير (14 بكسل)' },
              ],
            },
            {
              name: 'showLeadingIcon',
              nameAr: 'أيقونة أمامية',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showHelpIcon',
              nameAr: 'أيقونة المساعدة',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'showTrailingAction',
              nameAr: 'الإجراء الثانوي',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showSupportingText',
              nameAr: 'نص الوصف',
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
          <div className="w-[375px]">
            <SectionHeader
              title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
              supportingText={showSupportingText ? (isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here') : undefined}
              size={size}
              leadingIcon={showLeadingIcon ? Category : undefined}
              showHelpIcon={showHelpIcon}
              trailingAction={showTrailingAction ? (isArabic ? 'يكتب هنا نص' : 'Text Here') : undefined}
              showSeparator={showSeparator}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Size Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'متغيرات الحجم' : 'Size Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'رأس القسم يأتي بأربعة أحجام مختلفة لتناسب سياقات العرض المختلفة.'
              : 'Section Header comes in four different sizes to fit various display contexts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* X-Large */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'كبير جداً' : 'X-Large'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: xl | 24px
              </span>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="xl"
                leadingIcon={Category}
                showHelpIcon
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
              />
            </div>
          </div>

          {/* Large */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'كبير' : 'Large'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: lg | 20px
              </span>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="lg"
                leadingIcon={Box}
                showHelpIcon
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
              />
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متوسط' : 'Medium'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: md | 16px
              </span>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="md"
                leadingIcon={Setting2}
                showHelpIcon
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
              />
            </div>
          </div>

          {/* Small */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'صغير' : 'Small'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: sm | 14px
              </span>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="sm"
                leadingIcon={Chart}
                showHelpIcon
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Optional Elements Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'العناصر الاختيارية' : 'Optional Elements'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'يمكن إضافة أيقونات وإجراءات ثانوية حسب الحاجة.'
              : 'Icons and trailing actions can be added as needed.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Title Only */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'العنوان فقط' : 'Title Only'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
              />
            </div>
          </div>

          {/* With Leading Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع أيقونة أمامية' : 'With Leading Icon'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
                leadingIcon={Category}
              />
            </div>
          </div>

          {/* With Help Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع أيقونة المساعدة' : 'With Help Icon'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
                showHelpIcon
              />
            </div>
          </div>

          {/* With Trailing Action */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع إجراء ثانوي' : 'With Trailing Action'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
              />
            </div>
          </div>

          {/* With Trailing Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع أيقونة ثانوية' : 'With Trailing Icon'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
                trailingIcon={More}
              />
            </div>
          </div>

          {/* With Supporting Text */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع نص داعم' : 'With Supporting Text'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="lg"
              />
            </div>
          </div>

          {/* With Separator */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع فاصل' : 'With Separator'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                size="lg"
                showSeparator
              />
            </div>
          </div>

          {/* Full Featured */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع جميع العناصر' : 'Full Featured'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
              <SectionHeader
                title={isArabic ? 'يكتب هنا عنوان' : 'Write title here'}
                supportingText={isArabic ? 'يكتب هنا نص وصف' : 'Write supporting text here'}
                size="lg"
                leadingIcon={Category}
                showHelpIcon
                trailingAction={isArabic ? 'يكتب هنا نص' : 'Text Here'}
                showSeparator
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={sectionHeaderProps}
          title="SectionHeader Props"
          titleAr="خصائص رأس القسم"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use X-Large size for main page section headers',
              textAr: 'استخدم الحجم الكبير جداً لرؤوس أقسام الصفحة الرئيسية',
            },
            {
              text: 'Use Large size for sub-section headers',
              textAr: 'استخدم الحجم الكبير لرؤوس الأقسام الفرعية',
            },
            {
              text: 'Use Medium/Small sizes for compact UI areas',
              textAr: 'استخدم الأحجام المتوسطة/الصغيرة للمناطق المدمجة',
            },
            {
              text: 'Add supporting text for additional context',
              textAr: 'أضف نص داعم لمزيد من السياق',
            },
            {
              text: 'Use trailing action for "See All" or "View More" links',
              textAr: 'استخدم الإجراء الثانوي لروابط "عرض الكل" أو "المزيد"',
            },
          ]}
          donts={[
            {
              text: "Don't use multiple trailing actions together",
              textAr: 'لا تستخدم إجراءات ثانوية متعددة معاً',
            },
            {
              text: "Don't overcrowd with too many elements",
              textAr: 'لا تكدس بالكثير من العناصر',
            },
            {
              text: "Don't use small size for main page headers",
              textAr: 'لا تستخدم الحجم الصغير لرؤوس الصفحات الرئيسية',
            },
            {
              text: "Don't hide important navigation in trailing icons",
              textAr: 'لا تخفِ التنقل المهم في الأيقونات الثانوية',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}


