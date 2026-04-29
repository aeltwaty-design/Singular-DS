'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { AppBar } from '@/components/ui';
import { Notification, User, Setting2, SearchNormal1, Heart, Share } from 'iconsax-react';

export default function AppBarPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    type: 'collapsed',
    leading: 'back',
    trailing: 'hyperlink',
    showSeparator: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const type = controlValues.type as 'collapsed' | 'expanded';
  const leading = controlValues.leading as 'back' | 'close';
  const trailing = controlValues.trailing as 'hyperlink' | 'cta' | 'icon' | 'two-icons';
  const showSeparator = controlValues.showSeparator as boolean;

  // Props documentation
  const appBarProps = [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Title text displayed in the app bar',
      descriptionAr: 'نص العنوان المعروض في شريط التطبيق',
    },
    {
      name: 'type',
      type: "'collapsed' | 'expanded'",
      defaultValue: "'collapsed'",
      description: 'Type variant - collapsed shows centered title, expanded shows large title below',
      descriptionAr: 'نوع المتغير - المطوي يعرض العنوان في المنتصف، الموسع يعرض عنوان كبير أسفل',
    },
    {
      name: 'leading',
      type: "'back' | 'close' | ReactNode",
      defaultValue: "'back'",
      description: 'Leading action type or custom ReactNode',
      descriptionAr: 'نوع الإجراء الأساسي أو ReactNode مخصص',
    },
    {
      name: 'trailing',
      type: "'hyperlink' | 'cta' | 'icon' | 'two-icons' | ReactNode",
      description: 'Trailing action type or custom ReactNode',
      descriptionAr: 'نوع الإجراء الثانوي أو ReactNode مخصص',
    },
    {
      name: 'trailingLabel',
      type: 'string',
      defaultValue: "'Action'",
      description: 'Label text for hyperlink or CTA trailing',
      descriptionAr: 'نص التسمية للرابط أو زر CTA',
    },
    {
      name: 'trailingIcon',
      type: 'IconComponent',
      description: 'Icon component for single icon trailing',
      descriptionAr: 'مكون الأيقونة للأيقونة المفردة',
    },
    {
      name: 'trailingIcons',
      type: '[IconComponent, IconComponent]',
      description: 'Two icon components for two-icons trailing',
      descriptionAr: 'مكونان للأيقونتين',
    },
    {
      name: 'onLeadingPress',
      type: '() => void',
      description: 'Callback when leading action is pressed',
      descriptionAr: 'دالة الاستدعاء عند الضغط على الإجراء الأساسي',
    },
    {
      name: 'onTrailingPress',
      type: '() => void',
      description: 'Callback when trailing action is pressed',
      descriptionAr: 'دالة الاستدعاء عند الضغط على الإجراء الثانوي',
    },
    {
      name: 'onTrailingIconPress',
      type: '[() => void, () => void]',
      description: 'Callbacks for two-icons trailing',
      descriptionAr: 'دوال الاستدعاء للأيقونتين',
    },
    {
      name: 'showSeparator',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show bottom separator line',
      descriptionAr: 'إظهار خط الفاصل السفلي',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'شريط التطبيق' : 'App Bar'}
      description={
        isArabic
          ? 'يوفر شريط التطبيق العلوي المحتوى والإجراءات المتعلقة بالشاشة الحالية. يدعم نوعين: مطوي مع عنوان في المنتصف، وموسع مع عنوان كبير.'
          : 'The top app bar provides content and actions related to the current screen. Supports two types: collapsed with centered title, and expanded with large title.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<AppBar
  title="${isArabic ? 'يكتب هنا نص' : 'Page Title'}"
  type="${type}"
  leading="${leading}"
  trailing="${trailing}"
  trailingLabel="${isArabic ? 'يكتب نص' : 'Action'}"
  showSeparator={${showSeparator}}
/>`}
          controls={[
            {
              name: 'type',
              nameAr: 'النوع',
              type: 'select',
              defaultValue: 'collapsed',
              options: [
                { value: 'collapsed', label: 'Collapsed', labelAr: 'مطوي' },
                { value: 'expanded', label: 'Expanded', labelAr: 'موسع' },
              ],
            },
            {
              name: 'leading',
              nameAr: 'الأساسي',
              type: 'select',
              defaultValue: 'back',
              options: [
                { value: 'back', label: 'Back', labelAr: 'رجوع' },
                { value: 'close', label: 'Close', labelAr: 'إغلاق' },
              ],
            },
            {
              name: 'trailing',
              nameAr: 'الثانوي',
              type: 'select',
              defaultValue: 'hyperlink',
              options: [
                { value: 'hyperlink', label: 'Hyperlink', labelAr: 'رابط' },
                { value: 'cta', label: 'CTA Button', labelAr: 'زر CTA' },
                { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
                { value: 'two-icons', label: 'Two Icons', labelAr: 'أيقونتان' },
              ],
            },
            {
              name: 'showSeparator',
              nameAr: 'الفاصل',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-[375px]">
            <AppBar
              title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
              type={type}
              leading={leading}
              trailing={trailing}
              trailingLabel={isArabic ? 'يكتب نص' : 'Action'}
              trailingIcon={Setting2}
              trailingIcons={[Heart, Share]}
              showSeparator={showSeparator}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Type Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'متغيرات النوع' : 'Type Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'شريط التطبيق يأتي بنوعين: مطوي (ارتفاع 44 بكسل مع عنوان في المنتصف) وموسع (ارتفاع 95 بكسل مع عنوان كبير أسفل).'
              : 'App Bar comes in two types: collapsed (44px height with centered title) and expanded (95px height with large title below).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Collapsed */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'مطوي' : 'Collapsed'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                type: collapsed
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                type="collapsed"
                leading="back"
                trailing="hyperlink"
                trailingLabel={isArabic ? 'يكتب نص' : 'Save'}
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'ارتفاع 44 بكسل. العنوان في المنتصف، 18 بكسل متوسط. مثالي للصفحات الداخلية.'
                : '44px height. Centered title, 18px medium. Ideal for inner pages.'}
            </p>
          </div>

          {/* Expanded */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'موسع' : 'Expanded'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                type: expanded
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب نص' : 'Page Title'}
                type="expanded"
                leading="back"
                trailing="hyperlink"
                trailingLabel={isArabic ? 'يكتب نص' : 'Save'}
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'عنوان كبير أسفل صف الرأس. 32 بكسل نصف سميك. مثالي للصفحات الرئيسية.'
                : 'Large title below header row. 32px semibold. Ideal for main pages.'}
            </p>
          </div>
        </div>
      </section>

      {/* Leading Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'متغيرات الإجراء الأساسي' : 'Leading Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'الإجراء الأساسي يظهر على الجانب الأيسر (أو الأيمن في RTL). خياران: رجوع أو إغلاق.'
              : 'Leading action appears on the start side (left in LTR, right in RTL). Two options: back or close.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Back */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'رجوع' : 'Back'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                leading: back
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                leading="back"
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'سهم للخلف. ينعكس تلقائياً في RTL.'
                : 'Back arrow. Automatically flips in RTL layouts.'}
            </p>
          </div>

          {/* Close */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'إغلاق' : 'Close'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                leading: close
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                leading="close"
              />
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'أيقونة X للإغلاق. يستخدم للنوافذ المنبثقة والشاشات الكاملة.'
                : 'X icon for closing. Used for modals and full-screen overlays.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trailing Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'متغيرات الإجراء الثانوي' : 'Trailing Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'الإجراء الثانوي يظهر على الجانب الأيمن (أو الأيسر في RTL). أربعة خيارات: رابط، زر CTA، أيقونة، أو أيقونتان.'
              : 'Trailing action appears on the end side (right in LTR, left in RTL). Four options: hyperlink, CTA button, icon, or two icons.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hyperlink */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'رابط' : 'Hyperlink'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                trailing: hyperlink
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                trailing="hyperlink"
                trailingLabel={isArabic ? 'يكتب نص' : 'Save'}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'زر CTA' : 'CTA Button'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                trailing: cta
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                trailing="cta"
                trailingLabel={isArabic ? 'يكتب نص' : 'Save'}
              />
            </div>
          </div>

          {/* Icon */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'أيقونة' : 'Icon'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                trailing: icon
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                trailing="icon"
                trailingIcon={Setting2}
              />
            </div>
          </div>

          {/* Two Icons */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'أيقونتان' : 'Two Icons'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                trailing: two-icons
              </span>
            </div>
            <div>
              <AppBar
                title={isArabic ? 'يكتب هنا نص' : 'Page Title'}
                trailing="two-icons"
                trailingIcons={[SearchNormal1, Notification]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Examples */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'أمثلة موسعة' : 'Expanded Examples'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'النوع الموسع مع متغيرات مختلفة للإجراء الثانوي.'
              : 'Expanded type with different trailing variants.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expanded with Hyperlink */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'موسع مع رابط' : 'Expanded with Hyperlink'}
            </span>
            <div>
              <AppBar
                title={isArabic ? 'يكتب نص' : 'Page Title'}
                type="expanded"
                leading="back"
                trailing="hyperlink"
                trailingLabel={isArabic ? 'يكتب نص' : 'Edit'}
              />
            </div>
          </div>

          {/* Expanded with Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'موسع مع أيقونة' : 'Expanded with Icon'}
            </span>
            <div>
              <AppBar
                title={isArabic ? 'يكتب نص' : 'Page Title'}
                type="expanded"
                leading="close"
                trailing="icon"
                trailingIcon={User}
              />
            </div>
          </div>

          {/* Expanded with Two Icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'موسع مع أيقونتان' : 'Expanded with Two Icons'}
            </span>
            <div>
              <AppBar
                title={isArabic ? 'يكتب نص' : 'Page Title'}
                type="expanded"
                leading="back"
                trailing="two-icons"
                trailingIcons={[Heart, Share]}
              />
            </div>
          </div>

          {/* Expanded with CTA */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'موسع مع زر CTA' : 'Expanded with CTA'}
            </span>
            <div>
              <AppBar
                title={isArabic ? 'يكتب نص' : 'Page Title'}
                type="expanded"
                leading="close"
                trailing="cta"
                trailingLabel={isArabic ? 'يكتب نص' : 'Done'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={appBarProps}
          title="AppBar Props"
          titleAr="خصائص شريط التطبيق"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use collapsed type for inner/detail pages',
              textAr: 'استخدم النوع المطوي للصفحات الداخلية/التفصيلية',
            },
            {
              text: 'Use expanded type for main/landing pages',
              textAr: 'استخدم النوع الموسع للصفحات الرئيسية',
            },
            {
              text: 'Keep title text concise and descriptive',
              textAr: 'اجعل نص العنوان موجزاً ووصفياً',
            },
            {
              text: 'Use back arrow for navigation within app',
              textAr: 'استخدم سهم الرجوع للتنقل داخل التطبيق',
            },
            {
              text: 'Use close icon for modals and overlays',
              textAr: 'استخدم أيقونة الإغلاق للنوافذ المنبثقة',
            },
          ]}
          donts={[
            {
              text: "Don't overcrowd with too many trailing actions",
              textAr: 'لا تكدس بالكثير من الإجراءات الثانوية',
            },
            {
              text: "Don't use expanded type for nested pages",
              textAr: 'لا تستخدم النوع الموسع للصفحات المتداخلة',
            },
            {
              text: "Don't hide critical navigation actions",
              textAr: 'لا تخفِ إجراءات التنقل الهامة',
            },
            {
              text: "Don't use hyperlink and CTA together",
              textAr: 'لا تستخدم الرابط وزر CTA معاً',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
