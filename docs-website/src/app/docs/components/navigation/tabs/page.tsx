'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Home2, User, Setting2, Notification, Chart, Wallet2 } from 'iconsax-react';

export default function TabsPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    size: 'md',
    showIcon: false,
    showBadge: false,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const size = controlValues.size as 'sm' | 'md' | 'lg';
  const showIcon = controlValues.showIcon as boolean;
  const showBadge = controlValues.showBadge as boolean;

  // Icon size based on tab size
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 20;
      default:
        return 18;
    }
  };

  // Props documentation
  const tabsProps = [
    {
      name: 'defaultValue',
      type: 'string',
      required: true,
      description: 'The default selected tab value',
      descriptionAr: 'القيمة الافتراضية للتبويب المحدد',
    },
    {
      name: 'value',
      type: 'string',
      description: 'Controlled value for the selected tab',
      descriptionAr: 'القيمة المتحكم بها للتبويب المحدد',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Callback when the selected tab changes',
      descriptionAr: 'دالة الاستدعاء عند تغيير التبويب المحدد',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Size variant for all tabs: sm (12px), md (14px), lg (16px)',
      descriptionAr: 'حجم التبويبات: صغير (12px)، متوسط (14px)، كبير (16px)',
    },
  ];

  const triggerProps = [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Unique value for this tab',
      descriptionAr: 'القيمة الفريدة لهذا التبويب',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the tab is disabled',
      descriptionAr: 'هل التبويب معطل',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Optional leading icon',
      descriptionAr: 'أيقونة اختيارية في البداية',
    },
    {
      name: 'badge',
      type: 'number',
      description: 'Optional badge count (shows 99+ for values > 99)',
      descriptionAr: 'عداد الشارة الاختياري (يعرض 99+ للقيم أكبر من 99)',
    },
  ];

  const contentProps = [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Value matching the corresponding TabsTrigger',
      descriptionAr: 'القيمة المطابقة لـ TabsTrigger المقابل',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'التبويبات' : 'Tabs'}
      description={
        isArabic
          ? 'تنظم التبويبات المحتوى في عروض منفصلة حيث يظهر عرض واحد فقط في كل مرة. تتضمن أحجام مختلفة، أيقونات اختيارية، وشارات.'
          : 'Tabs organize content into separate views where only one view is visible at a time. Includes different sizes, optional icons, and badges.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<Tabs defaultValue="tab1" size="${size}">
  <TabsList>
    <TabsTrigger value="tab1"${showIcon ? ' icon={<Home2 size={18} />}' : ''}${showBadge ? ' badge={5}' : ''}>
      ${isArabic ? 'الرئيسية' : 'Home'}
    </TabsTrigger>
    <TabsTrigger value="tab2"${showIcon ? ' icon={<User size={18} />}' : ''}${showBadge ? ' badge={12}' : ''}>
      ${isArabic ? 'الملف الشخصي' : 'Profile'}
    </TabsTrigger>
    <TabsTrigger value="tab3"${showIcon ? ' icon={<Setting2 size={18} />}' : ''}${showBadge ? ' badge={3}' : ''}>
      ${isArabic ? 'الإعدادات' : 'Settings'}
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Home</TabsContent>
  <TabsContent value="tab2">Content for Profile</TabsContent>
  <TabsContent value="tab3">Content for Settings</TabsContent>
</Tabs>`}
          controls={[
            {
              name: 'size',
              nameAr: 'الحجم',
              type: 'select',
              defaultValue: 'md',
              options: [
                { value: 'sm', label: 'Small (12px)', labelAr: 'صغير (12px)' },
                { value: 'md', label: 'Medium (14px)', labelAr: 'متوسط (14px)' },
                { value: 'lg', label: 'Large (16px)', labelAr: 'كبير (16px)' },
              ],
            },
            {
              name: 'showIcon',
              nameAr: 'إظهار الأيقونة',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'showBadge',
              nameAr: 'إظهار الشارة',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-full max-w-md">
            <Tabs defaultValue="tab1" size={size}>
              <TabsList className="gap-4">
                <TabsTrigger
                  value="tab1"
                  icon={showIcon ? <Home2 size={getIconSize()} variant="Linear" /> : undefined}
                  badge={showBadge ? 5 : undefined}
                >
                  {isArabic ? 'الرئيسية' : 'Home'}
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  icon={showIcon ? <User size={getIconSize()} variant="Linear" /> : undefined}
                  badge={showBadge ? 12 : undefined}
                >
                  {isArabic ? 'الملف' : 'Profile'}
                </TabsTrigger>
                <TabsTrigger
                  value="tab3"
                  icon={showIcon ? <Setting2 size={getIconSize()} variant="Linear" /> : undefined}
                  badge={showBadge ? 3 : undefined}
                >
                  {isArabic ? 'الإعدادات' : 'Settings'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {isArabic ? 'محتوى الرئيسية' : 'Home content goes here.'}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {isArabic ? 'محتوى الملف الشخصي' : 'Profile content goes here.'}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="tab3">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {isArabic ? 'محتوى الإعدادات' : 'Settings content goes here.'}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </LivePlayground>
      </section>

      {/* Size Variants */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'متغيرات الحجم' : 'Size Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'التبويبات تأتي بثلاثة أحجام: صغير (12px)، متوسط (14px)، وكبير (16px).'
              : 'Tabs come in three sizes: small (12px), medium (14px), and large (16px).'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Small */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'صغير' : 'Small'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: sm
              </span>
            </div>
            <Tabs defaultValue="tab1" size="sm">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab2">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab3">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab4" disabled>{isArabic ? 'معطل' : 'Disabled'}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Medium */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متوسط' : 'Medium'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: md
              </span>
            </div>
            <Tabs defaultValue="tab1" size="md">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab2">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab3">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab4" disabled>{isArabic ? 'معطل' : 'Disabled'}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Large */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'كبير' : 'Large'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                size: lg
              </span>
            </div>
            <Tabs defaultValue="tab1" size="lg">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab2">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab3">{isArabic ? 'عنوان' : 'Tab'}</TabsTrigger>
                <TabsTrigger value="tab4" disabled>{isArabic ? 'معطل' : 'Disabled'}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'مع أيقونات' : 'With Icons'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'يمكن إضافة أيقونة في بداية كل تبويب. حجم الأيقونة يتناسب مع حجم التبويب.'
              : 'Each tab can have a leading icon. Icon size scales with the tab size.'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Small with icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'صغير مع أيقونات' : 'Small with Icons'}
            </span>
            <Tabs defaultValue="tab1" size="sm">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1" icon={<Home2 size={16} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab2" icon={<User size={16} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab3" icon={<Setting2 size={16} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab4" icon={<Notification size={16} variant="Linear" />} disabled>
                  {isArabic ? 'معطل' : 'Disabled'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Medium with icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'متوسط مع أيقونات' : 'Medium with Icons'}
            </span>
            <Tabs defaultValue="tab1" size="md">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1" icon={<Home2 size={18} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab2" icon={<User size={18} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab3" icon={<Setting2 size={18} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab4" icon={<Notification size={18} variant="Linear" />} disabled>
                  {isArabic ? 'معطل' : 'Disabled'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Large with icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'كبير مع أيقونات' : 'Large with Icons'}
            </span>
            <Tabs defaultValue="tab1" size="lg">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1" icon={<Home2 size={20} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab2" icon={<User size={20} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab3" icon={<Setting2 size={20} variant="Linear" />}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab4" icon={<Notification size={20} variant="Linear" />} disabled>
                  {isArabic ? 'معطل' : 'Disabled'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* With Badges */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'مع شارات' : 'With Badges'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'يمكن إضافة شارة عداد لكل تبويب. تعرض "99+" للقيم أكبر من 99.'
              : 'Each tab can have a badge counter. Shows "99+" for values greater than 99.'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Without icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'شارات بدون أيقونات' : 'Badges without Icons'}
            </span>
            <Tabs defaultValue="tab1" size="md">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1" badge={5}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab2" badge={24}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab3" badge={99}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab4" badge={150}>
                  {isArabic ? '99+' : '99+'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* With icons */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'شارات مع أيقونات' : 'Badges with Icons'}
            </span>
            <Tabs defaultValue="tab1" size="md">
              <TabsList className="gap-4">
                <TabsTrigger value="tab1" icon={<Home2 size={18} variant="Linear" />} badge={5}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab2" icon={<Notification size={18} variant="Linear" />} badge={24}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab3" icon={<Chart size={18} variant="Linear" />} badge={99}>
                  {isArabic ? 'عنوان' : 'Tab'}
                </TabsTrigger>
                <TabsTrigger value="tab4" icon={<Wallet2 size={18} variant="Linear" />} badge={150} disabled>
                  {isArabic ? 'معطل' : 'Disabled'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Tab States */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'حالات التبويب' : 'Tab States'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'التبويبات تدعم أربع حالات: افتراضي، تمرير، محدد، ومعطل.'
              : 'Tabs support four states: default, hover, selected, and disabled.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Default */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'افتراضي' : 'Default'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <span className="text-sm text-neutral-900 dark:text-neutral-100">
                {isArabic ? 'عنوان' : 'Tab'}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'نص أساسي، وزن عادي' : 'Primary text, normal weight'}
            </p>
          </div>

          {/* Hover */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'تمرير' : 'Hover'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                {isArabic ? 'عنوان' : 'Tab'}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'لون العلامة التجارية، وزن عادي' : 'Brand color, normal weight'}
            </p>
          </div>

          {/* Selected */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'محدد' : 'Selected'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="relative pb-2">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {isArabic ? 'عنوان' : 'Tab'}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'لون العلامة التجارية، وزن سميك، شريط سفلي' : 'Brand color, semibold, ink bar'}
            </p>
          </div>

          {/* Disabled */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'معطل' : 'Disabled'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                {isArabic ? 'عنوان' : 'Tab'}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'نص معطل، غير تفاعلي' : 'Disabled text, not interactive'}
            </p>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable props={tabsProps} title="Tabs Props" titleAr="خصائص Tabs" />
        <PropsTable props={triggerProps} title="TabsTrigger Props" titleAr="خصائص TabsTrigger" />
        <PropsTable props={contentProps} title="TabsContent Props" titleAr="خصائص TabsContent" />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use for switching between related views or content',
              textAr: 'استخدم للتبديل بين العروض أو المحتوى المترابط',
            },
            {
              text: 'Keep tab labels short and descriptive',
              textAr: 'اجعل تسميات التبويبات قصيرة ووصفية',
            },
            {
              text: 'Show active state clearly with ink bar indicator',
              textAr: 'أظهر الحالة النشطة بوضوح مع مؤشر الشريط السفلي',
            },
            {
              text: 'Use icons to enhance visual recognition',
              textAr: 'استخدم الأيقونات لتعزيز التعرف البصري',
            },
            {
              text: 'Use badges to show counts or notifications',
              textAr: 'استخدم الشارات لعرض الأعداد أو الإشعارات',
            },
          ]}
          donts={[
            {
              text: "Don't use for unrelated content sections",
              textAr: 'لا تستخدم لأقسام المحتوى غير المترابطة',
            },
            {
              text: "Don't use too many tabs (keep to 5 or fewer)",
              textAr: 'لا تستخدم الكثير من التبويبات (5 أو أقل)',
            },
            {
              text: "Don't mix tabs with icons and without icons",
              textAr: 'لا تخلط التبويبات مع أيقونات وبدون أيقونات',
            },
            {
              text: "Don't use very long labels that may overflow",
              textAr: 'لا تستخدم تسميات طويلة جداً قد تتجاوز الحدود',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
