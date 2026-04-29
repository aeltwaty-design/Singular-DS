'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import {
  Navbar,
  NavbarPrimaryRow,
  NavbarSecondaryRow,
  NavbarBrand,
  NavbarContent,
  NavbarNavigation,
  NavbarItem,
  NavbarActions,
  NavbarActionIcons,
  NavbarActionIcon,
  NavbarCTA,
  NavbarSearch,
} from '@/components/ui';
import { Notification, Setting2, SearchNormal1, Call } from 'iconsax-react';
import { useBrand } from '@/components/providers/Providers';

export default function NavbarPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const { brandColors } = useBrand();

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    type: 'simple',
    showCTA: true,
    showBadges: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const type = controlValues.type as 'simple' | 'dual-tier';
  const showCTA = controlValues.showCTA as boolean;
  const showBadges = controlValues.showBadges as boolean;

  // Sample navigation items
  const navItems = isArabic
    ? ['لوحة التحكم', 'المستخدمون', 'التقارير', 'الأدوار', 'المشاريع', 'الرئيسية']
    : ['Dashboard', 'Users', 'Reports', 'Roles', 'Projects', 'Home'];

  const subNavItems = isArabic
    ? ['عنصر هنا', 'عنصر هنا', 'عنصر هنا', 'عنصر هنا', 'عنصر هنا', 'عنصر هنا']
    : ['Text Here', 'Text Here', 'Text Here', 'Text Here', 'Text Here', 'Text Here'];

  // Props documentation
  const navbarProps = [
    {
      name: 'type',
      type: "'simple' | 'dual-tier'",
      defaultValue: "'simple'",
      description: 'Type variant - simple (single-tier) or dual-tier (with sub-navigation)',
      descriptionAr: 'نوع المتغير - بسيط (طبقة واحدة) أو طبقتين (مع تنقل فرعي)',
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      description: 'Child components (NavbarPrimaryRow, NavbarSecondaryRow)',
      descriptionAr: 'المكونات الفرعية',
    },
  ];

  const navbarItemProps = [
    {
      name: 'selected',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the item is currently selected/active',
      descriptionAr: 'هل العنصر محدد/نشط حالياً',
    },
    {
      name: 'href',
      type: 'string',
      description: 'Link href (renders as anchor)',
      descriptionAr: 'رابط href (يعرض كعنصر ربط)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disabled state',
      descriptionAr: 'حالة معطلة',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: 'Click handler',
      descriptionAr: 'معالج النقر',
    },
  ];

  const navbarActionIconProps = [
    {
      name: 'icon',
      type: 'ReactNode',
      required: true,
      description: 'Icon element to display',
      descriptionAr: 'عنصر الأيقونة للعرض',
    },
    {
      name: 'badge',
      type: 'number',
      description: 'Badge count (shows 99+ for values > 99)',
      descriptionAr: 'عداد الشارة (يعرض 99+ للقيم أكبر من 99)',
    },
    {
      name: 'label',
      type: 'string',
      required: true,
      description: 'Accessible label for screen readers',
      descriptionAr: 'تسمية للقارئات الشاشة',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: 'Click handler',
      descriptionAr: 'معالج النقر',
    },
  ];

  const navbarCTAProps = [
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Leading icon element',
      descriptionAr: 'عنصر الأيقونة الأمامية',
    },
    {
      name: 'href',
      type: 'string',
      description: 'Link href (renders as anchor)',
      descriptionAr: 'رابط href (يعرض كعنصر ربط)',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: 'Click handler',
      descriptionAr: 'معالج النقر',
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      description: 'Button text content',
      descriptionAr: 'محتوى نص الزر',
    },
  ];

  const navbarSearchProps = [
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "'Search...'",
      description: 'Placeholder text',
      descriptionAr: 'نص العنصر النائب',
    },
    {
      name: 'value',
      type: 'string',
      description: 'Input value',
      descriptionAr: 'قيمة الإدخال',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Callback when value changes',
      descriptionAr: 'دالة الاستدعاء عند تغيير القيمة',
    },
  ];

  // Brand logo component
  const BrandLogo = () => (
    <div
      className="w-8 h-8 rounded-lg shadow-sm"
      style={{ backgroundColor: brandColors.primary }}
    />
  );

  return (
    <ComponentDocTemplate
      title={isArabic ? 'شريط التنقل' : 'Navbar'}
      description={
        isArabic
          ? 'شريط التنقل الرئيسي يوضع عادةً في أعلى الصفحة. يدعم نوعين: بسيط (طبقة واحدة) وطبقتين (مع تنقل فرعي).'
          : 'The main navigation bar typically positioned at the top of the page. Supports two types: simple (single-tier) and dual-tier (with sub-navigation).'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<Navbar type="${type}">
  <NavbarPrimaryRow>
    <NavbarContent>
      <NavbarBrand logo={<Logo />} name="WalaPlus" />
      <NavbarNavigation>
        <NavbarItem selected>Dashboard</NavbarItem>
        <NavbarItem>Users</NavbarItem>
        <NavbarItem>Reports</NavbarItem>
      </NavbarNavigation>
    </NavbarContent>
    <NavbarActions>
      <NavbarActionIcons>
        <NavbarActionIcon icon={<Notification />} badge={5} label="Notifications" />
        <NavbarActionIcon icon={<Setting2 />} label="Settings" />
      </NavbarActionIcons>
      ${showCTA ? '<NavbarCTA icon={<Call />}>Contact Us</NavbarCTA>' : ''}
    </NavbarActions>
  </NavbarPrimaryRow>
  ${type === 'dual-tier' ? `<NavbarSecondaryRow>
    <NavbarNavigation>
      <NavbarItem selected>Sub Item</NavbarItem>
      <NavbarItem>Sub Item</NavbarItem>
    </NavbarNavigation>
    <NavbarSearch placeholder="Search..." />
  </NavbarSecondaryRow>` : ''}
</Navbar>`}
          controls={[
            {
              name: 'type',
              nameAr: 'النوع',
              type: 'select',
              defaultValue: 'simple',
              options: [
                { value: 'simple', label: 'Simple', labelAr: 'بسيط' },
                { value: 'dual-tier', label: 'Dual Tier', labelAr: 'طبقتين' },
              ],
            },
            {
              name: 'showCTA',
              nameAr: 'إظهار CTA',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showBadges',
              nameAr: 'إظهار الشارات',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px]">
              <Navbar type={type}>
                <NavbarPrimaryRow>
                  <NavbarContent>
                    <NavbarBrand logo={<BrandLogo />} name="WalaPlus" />
                    <NavbarNavigation>
                      <NavbarItem selected>{navItems[0]}</NavbarItem>
                      <NavbarItem>{navItems[1]}</NavbarItem>
                      <NavbarItem>{navItems[2]}</NavbarItem>
                      <NavbarItem>{navItems[3]}</NavbarItem>
                      <NavbarItem>{navItems[4]}</NavbarItem>
                      <NavbarItem>{navItems[5]}</NavbarItem>
                    </NavbarNavigation>
                  </NavbarContent>
                  <NavbarActions>
                    <NavbarActionIcons>
                      <NavbarActionIcon
                        icon={<Notification size={20} variant="Linear" />}
                        badge={showBadges ? 5 : undefined}
                        label={isArabic ? 'الإشعارات' : 'Notifications'}
                      />
                      <NavbarActionIcon
                        icon={<Setting2 size={20} variant="Linear" />}
                        badge={showBadges ? 12 : undefined}
                        label={isArabic ? 'الإعدادات' : 'Settings'}
                      />
                    </NavbarActionIcons>
                    {showCTA && (
                      <NavbarCTA icon={<Call size={20} variant="Bold" />}>
                        {isArabic ? 'اتصل بنا' : 'Contact Us'}
                      </NavbarCTA>
                    )}
                  </NavbarActions>
                </NavbarPrimaryRow>
                {type === 'dual-tier' && (
                  <NavbarSecondaryRow>
                    <NavbarNavigation>
                      <NavbarItem selected>{subNavItems[0]}</NavbarItem>
                      <NavbarItem>{subNavItems[1]}</NavbarItem>
                      <NavbarItem>{subNavItems[2]}</NavbarItem>
                      <NavbarItem>{subNavItems[3]}</NavbarItem>
                      <NavbarItem>{subNavItems[4]}</NavbarItem>
                      <NavbarItem>{subNavItems[5]}</NavbarItem>
                    </NavbarNavigation>
                    <NavbarSearch placeholder={isArabic ? 'بحث...' : 'Search...'} />
                  </NavbarSecondaryRow>
                )}
              </Navbar>
            </div>
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
              ? 'شريط التنقل يأتي بنوعين: بسيط (طبقة واحدة) وطبقتين (مع تنقل فرعي وحقل بحث).'
              : 'Navbar comes in two types: simple (single-tier) and dual-tier (with sub-navigation and search field).'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Simple */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'بسيط' : 'Simple'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                type: simple
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <Navbar type="simple">
                  <NavbarPrimaryRow>
                    <NavbarContent>
                      <NavbarBrand logo={<BrandLogo />} name="WalaPlus" />
                      <NavbarNavigation>
                        <NavbarItem selected>{navItems[0]}</NavbarItem>
                        <NavbarItem>{navItems[1]}</NavbarItem>
                        <NavbarItem>{navItems[2]}</NavbarItem>
                      </NavbarNavigation>
                    </NavbarContent>
                    <NavbarActions>
                      <NavbarActionIcons>
                        <NavbarActionIcon
                          icon={<Notification size={20} variant="Linear" />}
                          badge={5}
                          label="Notifications"
                        />
                        <NavbarActionIcon
                          icon={<SearchNormal1 size={20} variant="Linear" />}
                          label="Search"
                        />
                      </NavbarActionIcons>
                    </NavbarActions>
                  </NavbarPrimaryRow>
                </Navbar>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'طبقة واحدة مع العلامة التجارية والتنقل الرئيسي والإجراءات.'
                : 'Single tier with brand, primary navigation, and actions.'}
            </p>
          </div>

          {/* Dual Tier */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'طبقتين' : 'Dual Tier'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                type: dual-tier
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <Navbar type="dual-tier">
                  <NavbarPrimaryRow>
                    <NavbarContent>
                      <NavbarBrand logo={<BrandLogo />} name="WalaPlus" />
                      <NavbarNavigation>
                        <NavbarItem selected>{navItems[0]}</NavbarItem>
                        <NavbarItem>{navItems[1]}</NavbarItem>
                        <NavbarItem>{navItems[2]}</NavbarItem>
                      </NavbarNavigation>
                    </NavbarContent>
                    <NavbarActions>
                      <NavbarActionIcons>
                        <NavbarActionIcon
                          icon={<Notification size={20} variant="Linear" />}
                          badge={5}
                          label="Notifications"
                        />
                      </NavbarActionIcons>
                      <NavbarCTA icon={<Call size={20} variant="Bold" />}>
                        {isArabic ? 'اتصل بنا' : 'Contact Us'}
                      </NavbarCTA>
                    </NavbarActions>
                  </NavbarPrimaryRow>
                  <NavbarSecondaryRow>
                    <NavbarNavigation>
                      <NavbarItem selected>{subNavItems[0]}</NavbarItem>
                      <NavbarItem>{subNavItems[1]}</NavbarItem>
                      <NavbarItem>{subNavItems[2]}</NavbarItem>
                    </NavbarNavigation>
                    <NavbarSearch placeholder={isArabic ? 'بحث...' : 'Search...'} />
                  </NavbarSecondaryRow>
                </Navbar>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              {isArabic
                ? 'طبقتين مع تنقل فرعي وحقل بحث في الصف الثاني.'
                : 'Two tiers with sub-navigation and search field in the secondary row.'}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Item States */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'حالات عنصر التنقل' : 'Navigation Item States'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'عناصر التنقل تدعم حالات مختلفة: افتراضي، تمرير، ومحدد.'
              : 'Navigation items support different states: default, hover, and selected.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'افتراضي' : 'Default'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <NavbarItem>{isArabic ? 'عنصر' : 'Item'}</NavbarItem>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'خلفية شفافة، وزن عادي' : 'Transparent background, normal weight'}
            </p>
          </div>

          {/* Hover */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'تمرير' : 'Hover'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="px-3 py-2 rounded-md bg-neutral-50 dark:bg-neutral-800/50 text-sm text-neutral-900 dark:text-neutral-100">
                {isArabic ? 'عنصر' : 'Item'}
              </div>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'خلفية رمادية فاتحة عند التمرير' : 'Light gray background on hover'}
            </p>
          </div>

          {/* Selected */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'محدد' : 'Selected'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <NavbarItem selected>{isArabic ? 'عنصر' : 'Item'}</NavbarItem>
            </div>
            <p className="text-xs text-neutral-500">
              {isArabic ? 'خلفية محايدة، وزن متوسط' : 'Neutral background, medium weight'}
            </p>
          </div>
        </div>
      </section>

      {/* Action Icons with Badges */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'أيقونات الإجراءات' : 'Action Icons'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'أيقونات الإجراءات يمكن أن تحتوي على شارات إشعارات اختيارية.'
              : 'Action icons can have optional notification badges.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Without Badge */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بدون شارة' : 'Without Badge'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg flex justify-center">
              <NavbarActionIcon
                icon={<Notification size={20} variant="Linear" />}
                label="Notifications"
              />
            </div>
          </div>

          {/* With Badge */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع شارة' : 'With Badge'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg flex justify-center">
              <NavbarActionIcon
                icon={<Notification size={20} variant="Linear" />}
                badge={5}
                label="Notifications"
              />
            </div>
          </div>

          {/* With Large Badge */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'شارة 99+' : '99+ Badge'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg flex justify-center">
              <NavbarActionIcon
                icon={<Notification size={20} variant="Linear" />}
                badge={150}
                label="Notifications"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'زر CTA' : 'CTA Button'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'زر دعوة للعمل مع أيقونة اختيارية.'
              : 'Call-to-action button with optional icon.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* With Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع أيقونة' : 'With Icon'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg flex justify-center">
              <NavbarCTA icon={<Call size={20} variant="Bold" />}>
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </NavbarCTA>
            </div>
          </div>

          {/* Without Icon */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بدون أيقونة' : 'Without Icon'}
            </span>
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg flex justify-center">
              <NavbarCTA>
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </NavbarCTA>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable props={navbarProps} title="Navbar Props" titleAr="خصائص Navbar" />
        <PropsTable props={navbarItemProps} title="NavbarItem Props" titleAr="خصائص NavbarItem" />
        <PropsTable props={navbarActionIconProps} title="NavbarActionIcon Props" titleAr="خصائص NavbarActionIcon" />
        <PropsTable props={navbarCTAProps} title="NavbarCTA Props" titleAr="خصائص NavbarCTA" />
        <PropsTable props={navbarSearchProps} title="NavbarSearch Props" titleAr="خصائص NavbarSearch" />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Include brand identity (logo and name)',
              textAr: 'أضف هوية العلامة التجارية (الشعار والاسم)',
            },
            {
              text: 'Keep navigation items concise and descriptive',
              textAr: 'اجعل عناصر التنقل موجزة ووصفية',
            },
            {
              text: 'Use badges to indicate unread notifications',
              textAr: 'استخدم الشارات للإشارة إلى الإشعارات غير المقروءة',
            },
            {
              text: 'Use dual-tier for complex navigation with sub-categories',
              textAr: 'استخدم الطبقتين للتنقل المعقد مع الفئات الفرعية',
            },
            {
              text: 'Place primary CTA button prominently',
              textAr: 'ضع زر CTA الأساسي في مكان بارز',
            },
          ]}
          donts={[
            {
              text: "Don't include too many navigation items (5-7 max)",
              textAr: 'لا تضف الكثير من عناصر التنقل (5-7 كحد أقصى)',
            },
            {
              text: "Don't hide critical navigation on desktop",
              textAr: 'لا تخفِ التنقل الهام على سطح المكتب',
            },
            {
              text: "Don't use dual-tier for simple navigation needs",
              textAr: 'لا تستخدم الطبقتين لاحتياجات التنقل البسيطة',
            },
            {
              text: "Don't overcrowd the action icons area",
              textAr: 'لا تكدس منطقة أيقونات الإجراءات',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
