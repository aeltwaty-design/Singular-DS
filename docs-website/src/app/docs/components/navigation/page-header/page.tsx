'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { PageHeader, Button, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { Add, DocumentDownload, Setting2 } from 'iconsax-react';

export default function PageHeaderPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    showBreadcrumbs: true,
    showTag: true,
    showSupportingText: true,
    showActions: true,
    showSearch: false,
    showTabs: false,
    showSeparator: false,
    leading: 'none',
    breakpoint: 'desktop',
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const showBreadcrumbs = controlValues.showBreadcrumbs as boolean;
  const showTag = controlValues.showTag as boolean;
  const showSupportingText = controlValues.showSupportingText as boolean;
  const showActions = controlValues.showActions as boolean;
  const showSearch = controlValues.showSearch as boolean;
  const showTabs = controlValues.showTabs as boolean;
  const showSeparator = controlValues.showSeparator as boolean;
  const leading = controlValues.leading as 'none' | 'image';
  const breakpoint = controlValues.breakpoint as 'desktop' | 'mobile';

  // Sample breadcrumbs
  const breadcrumbs = [
    { label: isArabic ? 'الرئيسية' : 'Dashboard', href: '#' },
    { label: isArabic ? 'المشاريع' : 'Projects', href: '#' },
    { label: isArabic ? 'الإعدادات' : 'Settings' },
  ];

  // Tabs state
  const [activeTab, setActiveTab] = useState('general');

  // Props documentation
  const pageHeaderProps = [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Page title text',
      descriptionAr: 'نص عنوان الصفحة',
    },
    {
      name: 'supportingText',
      type: 'string',
      description: 'Supporting description below the title',
      descriptionAr: 'وصف داعم أسفل العنوان',
    },
    {
      name: 'breadcrumbs',
      type: 'BreadcrumbItem[]',
      description: 'Array of breadcrumb items for navigation',
      descriptionAr: 'مصفوفة عناصر فتات الخبز للتنقل',
    },
    {
      name: 'showBreadcrumbs',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show breadcrumbs navigation',
      descriptionAr: 'إظهار تنقل فتات الخبز',
    },
    {
      name: 'tag',
      type: 'string',
      description: 'Tag text to display beside the title',
      descriptionAr: 'نص الوسم لعرضه بجانب العنوان',
    },
    {
      name: 'showTag',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show tag badge beside title',
      descriptionAr: 'إظهار شارة الوسم بجانب العنوان',
    },
    {
      name: 'leading',
      type: "'none' | 'image'",
      defaultValue: "'none'",
      description: 'Leading element variant',
      descriptionAr: 'نوع العنصر الرائد',
    },
    {
      name: 'leadingImage',
      type: 'string',
      description: 'URL for the leading image (when leading="image")',
      descriptionAr: 'رابط الصورة الرائدة (عندما يكون leading="image")',
    },
    {
      name: 'leadingImageAlt',
      type: 'string',
      defaultValue: "'Profile'",
      description: 'Alt text for the leading image',
      descriptionAr: 'النص البديل للصورة الرائدة',
    },
    {
      name: 'actions',
      type: 'ReactNode',
      description: 'Action buttons slot',
      descriptionAr: 'فتحة أزرار الإجراءات',
    },
    {
      name: 'showActions',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show actions section',
      descriptionAr: 'إظهار قسم الإجراءات',
    },
    {
      name: 'showSearch',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show search input field',
      descriptionAr: 'إظهار حقل البحث',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      defaultValue: "'Search...'",
      description: 'Placeholder text for search input',
      descriptionAr: 'نص العنصر النائب لحقل البحث',
    },
    {
      name: 'searchValue',
      type: 'string',
      description: 'Controlled search input value',
      descriptionAr: 'قيمة حقل البحث المتحكم بها',
    },
    {
      name: 'onSearchChange',
      type: '(value: string) => void',
      description: 'Callback when search value changes',
      descriptionAr: 'دالة الاستدعاء عند تغير قيمة البحث',
    },
    {
      name: 'tabs',
      type: 'ReactNode',
      description: 'Tabs slot for tab navigation',
      descriptionAr: 'فتحة التبويبات للتنقل بين التبويبات',
    },
    {
      name: 'showTabs',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show tabs section',
      descriptionAr: 'إظهار قسم التبويبات',
    },
    {
      name: 'showSeparator',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show bottom separator line',
      descriptionAr: 'إظهار خط الفاصل السفلي',
    },
    {
      name: 'breakpoint',
      type: "'desktop' | 'mobile'",
      defaultValue: "'desktop'",
      description: 'Responsive breakpoint for layout adaptation',
      descriptionAr: 'نقطة القطع المتجاوبة لتكييف التخطيط',
    },
  ];

  return (
    <ComponentDocTemplate
      title={isArabic ? 'رأس الصفحة' : 'Page Header'}
      description={
        isArabic
          ? 'مكون رأس الصفحة مع فتات الخبز والعنوان والوصف والإجراءات والبحث والتبويبات. يدعم التخطيط المتجاوب للجوال وسطح المكتب.'
          : 'A page header component with breadcrumbs, title, description, actions, search, and tabs. Supports responsive layout for mobile and desktop.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<PageHeader
  title="${isArabic ? 'إعدادات المشروع' : 'Project Settings'}"
  ${showSupportingText ? `supportingText="${isArabic ? 'إدارة إعدادات مشروعك وتفضيلاتك' : 'Manage your project settings and preferences'}"` : ''}
  ${showBreadcrumbs ? `breadcrumbs={[
    { label: '${isArabic ? 'الرئيسية' : 'Dashboard'}', href: '#' },
    { label: '${isArabic ? 'المشاريع' : 'Projects'}', href: '#' },
    { label: '${isArabic ? 'الإعدادات' : 'Settings'}' },
  ]}
  showBreadcrumbs` : ''}
  ${showTag ? `tag="${isArabic ? 'جديد' : 'New'}"
  showTag` : ''}
  ${leading === 'image' ? `leading="image"
  leadingImage="https://i.pravatar.cc/150?img=68"
  leadingImageAlt="User avatar"` : ''}
  ${showActions ? `showActions
  actions={
    <>
      <Button variant="outline">${isArabic ? 'إلغاء' : 'Cancel'}</Button>
      <Button>${isArabic ? 'حفظ التغييرات' : 'Save Changes'}</Button>
    </>
  }` : ''}
  ${showSearch ? `showSearch
  searchPlaceholder="${isArabic ? 'بحث...' : 'Search...'}"` : ''}
  ${showTabs ? `showTabs
  tabs={
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">${isArabic ? 'عام' : 'General'}</TabsTrigger>
        <TabsTrigger value="security">${isArabic ? 'الأمان' : 'Security'}</TabsTrigger>
        <TabsTrigger value="notifications">${isArabic ? 'الإشعارات' : 'Notifications'}</TabsTrigger>
      </TabsList>
    </Tabs>
  }` : ''}
  ${showSeparator ? 'showSeparator' : ''}
  breakpoint="${breakpoint}"
/>`}
          controls={[
            {
              name: 'breakpoint',
              nameAr: 'نقطة القطع',
              type: 'select',
              options: [
                { value: 'desktop', label: 'Desktop', labelAr: 'سطح المكتب' },
                { value: 'mobile', label: 'Mobile', labelAr: 'الجوال' },
              ],
              defaultValue: 'desktop',
            },
            {
              name: 'leading',
              nameAr: 'العنصر الرائد',
              type: 'select',
              options: [
                { value: 'none', label: 'None', labelAr: 'بدون' },
                { value: 'image', label: 'Image', labelAr: 'صورة' },
              ],
              defaultValue: 'none',
            },
            {
              name: 'showBreadcrumbs',
              nameAr: 'فتات الخبز',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showTag',
              nameAr: 'الوسم',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showSupportingText',
              nameAr: 'النص الداعم',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showActions',
              nameAr: 'الإجراءات',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showSearch',
              nameAr: 'البحث',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'showTabs',
              nameAr: 'التبويبات',
              type: 'boolean',
              defaultValue: false,
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
          <div className={breakpoint === 'mobile' ? 'w-[375px]' : 'w-[800px]'}>
            <PageHeader
              title={isArabic ? 'إعدادات المشروع' : 'Project Settings'}
              supportingText={showSupportingText ? (isArabic ? 'إدارة إعدادات مشروعك وتفضيلاتك' : 'Manage your project settings and preferences') : undefined}
              breadcrumbs={breadcrumbs}
              showBreadcrumbs={showBreadcrumbs}
              tag={isArabic ? 'جديد' : 'New'}
              showTag={showTag}
              leading={leading}
              leadingImage={leading === 'image' ? 'https://i.pravatar.cc/150?img=68' : undefined}
              leadingImageAlt="User avatar"
              showActions={showActions}
              actions={
                <>
                  <Button variant="outline">{isArabic ? 'إلغاء' : 'Cancel'}</Button>
                  <Button>{isArabic ? 'حفظ التغييرات' : 'Save Changes'}</Button>
                </>
              }
              showSearch={showSearch}
              searchPlaceholder={isArabic ? 'بحث...' : 'Search...'}
              showTabs={showTabs}
              tabs={
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="general">{isArabic ? 'عام' : 'General'}</TabsTrigger>
                    <TabsTrigger value="security">{isArabic ? 'الأمان' : 'Security'}</TabsTrigger>
                    <TabsTrigger value="notifications">{isArabic ? 'الإشعارات' : 'Notifications'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
              showSeparator={showSeparator}
              breakpoint={breakpoint}
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
              ? 'رأس الصفحة مرن ويمكن تخصيصه لحالات استخدام مختلفة.'
              : 'Page Header is flexible and can be customized for various use cases.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Basic with Breadcrumbs */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'أساسي مع فتات الخبز' : 'Basic with Breadcrumbs'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <PageHeader
                title={isArabic ? 'إعدادات الحساب' : 'Account Settings'}
                supportingText={isArabic ? 'إدارة حسابك وتفضيلاتك' : 'Manage your account and preferences'}
                breadcrumbs={[
                  { label: isArabic ? 'الرئيسية' : 'Home', href: '#' },
                  { label: isArabic ? 'الإعدادات' : 'Settings' },
                ]}
                showBreadcrumbs
              />
            </div>
          </div>

          {/* With Actions */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع الإجراءات' : 'With Actions'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <PageHeader
                title={isArabic ? 'قائمة المستخدمين' : 'User List'}
                supportingText={isArabic ? 'عرض وإدارة جميع المستخدمين' : 'View and manage all users'}
                showActions
                actions={
                  <>
                    <Button variant="outline" leftIcon={<DocumentDownload size={18} />}>
                      {isArabic ? 'تصدير' : 'Export'}
                    </Button>
                    <Button leftIcon={<Add size={18} />}>
                      {isArabic ? 'إضافة مستخدم' : 'Add User'}
                    </Button>
                  </>
                }
              />
            </div>
          </div>

          {/* With Tag */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع وسم' : 'With Tag'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <PageHeader
                title={isArabic ? 'الميزات الجديدة' : 'New Features'}
                tag={isArabic ? 'تجريبي' : 'Beta'}
                showTag
                supportingText={isArabic ? 'استكشف الميزات الجديدة قيد التطوير' : 'Explore new features under development'}
                breadcrumbs={[
                  { label: isArabic ? 'الرئيسية' : 'Home', href: '#' },
                  { label: isArabic ? 'الميزات' : 'Features' },
                ]}
                showBreadcrumbs
              />
            </div>
          </div>

          {/* With Leading Image */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع صورة رائدة' : 'With Leading Image'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <PageHeader
                title={isArabic ? 'أحمد محمد' : 'Ahmed Mohammed'}
                supportingText={isArabic ? 'مدير المشروع • انضم في يناير 2024' : 'Project Manager • Joined January 2024'}
                leading="image"
                leadingImage="https://i.pravatar.cc/150?img=68"
                leadingImageAlt="User avatar"
                showActions
                actions={
                  <Button variant="outline" leftIcon={<Setting2 size={18} />}>
                    {isArabic ? 'تعديل الملف' : 'Edit Profile'}
                  </Button>
                }
              />
            </div>
          </div>

          {/* With Search and Tabs */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع البحث والتبويبات' : 'With Search and Tabs'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <PageHeader
                title={isArabic ? 'المنتجات' : 'Products'}
                supportingText={isArabic ? 'إدارة كتالوج المنتجات' : 'Manage your product catalog'}
                showSearch
                searchPlaceholder={isArabic ? 'البحث عن منتج...' : 'Search products...'}
                showTabs
                tabs={
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">{isArabic ? 'الكل' : 'All'}</TabsTrigger>
                      <TabsTrigger value="active">{isArabic ? 'نشط' : 'Active'}</TabsTrigger>
                      <TabsTrigger value="draft">{isArabic ? 'مسودة' : 'Draft'}</TabsTrigger>
                      <TabsTrigger value="archived">{isArabic ? 'مؤرشف' : 'Archived'}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                }
                showSeparator
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'تخطيط الجوال' : 'Mobile Layout'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <div className="max-w-[375px]">
                <PageHeader
                  title={isArabic ? 'الإعدادات' : 'Settings'}
                  supportingText={isArabic ? 'إدارة تفضيلاتك' : 'Manage your preferences'}
                  breadcrumbs={[
                    { label: isArabic ? 'الرئيسية' : 'Home', href: '#' },
                    { label: isArabic ? 'الإعدادات' : 'Settings' },
                  ]}
                  showBreadcrumbs
                  showActions
                  actions={
                    <Button className="w-full">{isArabic ? 'حفظ' : 'Save'}</Button>
                  }
                  breakpoint="mobile"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={pageHeaderProps}
          title="PageHeader Props"
          titleAr="خصائص رأس الصفحة"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use breadcrumbs for navigation context',
              textAr: 'استخدم فتات الخبز لسياق التنقل',
            },
            {
              text: 'Place primary actions on the right side',
              textAr: 'ضع الإجراءات الرئيسية على الجانب الأيمن',
            },
            {
              text: 'Use supporting text for page description',
              textAr: 'استخدم النص الداعم لوصف الصفحة',
            },
            {
              text: 'Use tags for status or categories',
              textAr: 'استخدم الوسوم للحالة أو الفئات',
            },
            {
              text: 'Adapt layout for mobile using breakpoint prop',
              textAr: 'كيّف التخطيط للجوال باستخدام خاصية نقطة القطع',
            },
          ]}
          donts={[
            {
              text: "Don't use overly long titles",
              textAr: 'لا تستخدم عناوين طويلة جدًا',
            },
            {
              text: "Don't add too many action buttons",
              textAr: 'لا تضف الكثير من أزرار الإجراءات',
            },
            {
              text: "Don't hide important navigation breadcrumbs",
              textAr: 'لا تخفِ فتات الخبز المهمة للتنقل',
            },
            {
              text: "Don't use search without a clear purpose",
              textAr: 'لا تستخدم البحث بدون هدف واضح',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
