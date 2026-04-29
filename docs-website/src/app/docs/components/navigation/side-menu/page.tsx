'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import {
  SideMenu,
  SideMenuHeader,
  SideMenuContent,
  SideMenuSection,
  SideMenuSeparator,
  SideMenuItem,
  SideMenuExpandableItem,
  SideMenuSubItem,
  SideMenuFooter,
  SideMenuLogout,
  SideMenuFeatured,
} from '@/components/ui';
import {
  Home2,
  User,
  Document,
  Chart,
  Setting2,
  Logout,
  Notification,
  Wallet2,
  ShoppingCart,
  MessageQuestion,
  Box,
  People,
  Receipt1,
  DiscountShape,
  Tag,
  Archive,
} from 'iconsax-react';
import { useBrand } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';

// Brand Logo Component
const BrandLogo = ({ collapsed = false }: { collapsed?: boolean }) => {
  const { brandColors } = useBrand();

  if (collapsed) {
    return (
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: brandColors.primary }}
      >
        W
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: brandColors.primary }}
      >
        W
      </div>
      <span className="text-lg font-semibold text-neutral-900 dark:text-white">
        WalaPlus
      </span>
    </div>
  );
};

export default function SideMenuPage() {
  const t = useTranslations('sideMenuPage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Menu items for demo
  const mainItems = [
    { icon: Home2, label: 'Dashboard', labelAr: 'لوحة التحكم', badge: 5 },
    { icon: User, label: 'Users', labelAr: 'المستخدمون', badge: 12 },
    { icon: Document, label: 'Documents', labelAr: 'المستندات', hasSubmenu: true },
  ];

  const sectionItems = [
    { icon: Chart, label: 'Analytics', labelAr: 'التحليلات', hasSubmenu: true },
    { icon: Wallet2, label: 'Wallet', labelAr: 'المحفظة', hasSubmenu: true },
    { icon: ShoppingCart, label: 'Orders', labelAr: 'الطلبات', hasSubmenu: true },
    { icon: Notification, label: 'Notifications', labelAr: 'الإشعارات', hasSubmenu: true },
  ];

  const settingsItems = [
    { icon: Setting2, label: 'Settings', labelAr: 'الإعدادات', hasSubmenu: true },
    { icon: MessageQuestion, label: 'Help', labelAr: 'المساعدة', hasSubmenu: true },
  ];

  // Props documentation
  const sideMenuProps = [
    {
      name: 'expanded',
      type: 'boolean',
      defaultValue: 'true',
      description: t('props.expanded'),
    },
    {
      name: 'onToggle',
      type: '() => void',
      description: t('props.onToggle'),
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: t('props.children'),
    },
  ];

  const sideMenuItemProps = [
    {
      name: 'icon',
      type: 'IconComponent',
      required: true,
      description: t('props.icon'),
    },
    {
      name: 'label',
      type: 'string',
      required: true,
      description: t('props.label'),
    },
    {
      name: 'active',
      type: 'boolean',
      defaultValue: 'false',
      description: t('props.active'),
    },
    {
      name: 'badge',
      type: 'number',
      description: t('props.badge'),
    },
    {
      name: 'hasSubmenu',
      type: 'boolean',
      defaultValue: 'false',
      description: t('props.hasSubmenu'),
    },
    {
      name: 'onClick',
      type: '() => void',
      description: t('props.onClick'),
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: t('props.disabled'),
    },
  ];

  const sideMenuExpandableItemProps = [
    {
      name: 'icon',
      type: 'IconComponent',
      required: true,
      description: isArabic ? 'مكون الأيقونة من iconsax-react' : 'Icon component from iconsax-react',
    },
    {
      name: 'label',
      type: 'string',
      required: true,
      description: isArabic ? 'نص التسمية' : 'Label text',
    },
    {
      name: 'defaultExpanded',
      type: 'boolean',
      defaultValue: 'false',
      description: isArabic ? 'ما إذا كانت القائمة الفرعية مفتوحة بشكل افتراضي' : 'Whether the submenu is expanded by default',
    },
    {
      name: 'badge',
      type: 'number',
      description: isArabic ? 'عدد الشارة' : 'Badge count',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: isArabic ? 'مكونات SideMenuSubItem' : 'SideMenuSubItem components',
    },
  ];

  const sideMenuSubItemProps = [
    {
      name: 'label',
      type: 'string',
      required: true,
      description: isArabic ? 'نص التسمية' : 'Label text',
    },
    {
      name: 'active',
      type: 'boolean',
      defaultValue: 'false',
      description: isArabic ? 'ما إذا كان العنصر نشطًا' : 'Whether the item is active',
    },
    {
      name: 'badge',
      type: 'number',
      description: isArabic ? 'عدد الشارة' : 'Badge count',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: isArabic ? 'رد الاتصال عند النقر' : 'Click callback',
    },
  ];

  const sideMenuFeaturedProps = [
    {
      name: 'variant',
      type: "'progress' | 'upgrade' | 'announcement'",
      required: true,
      description: isArabic ? 'نوع البطاقة المميزة' : 'Type of featured card',
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      description: isArabic ? 'نص العنوان' : 'Title text',
    },
    {
      name: 'description',
      type: 'string',
      required: true,
      description: isArabic ? 'نص الوصف' : 'Description text',
    },
    {
      name: 'progress',
      type: 'number',
      defaultValue: '30',
      description: isArabic ? 'نسبة التقدم (0-100) لنوع progress' : 'Progress percentage (0-100) for progress variant',
    },
    {
      name: 'imageUrl',
      type: 'string',
      description: isArabic ? 'رابط الصورة لنوع announcement' : 'Image URL for announcement variant',
    },
    {
      name: 'primaryAction',
      type: 'string',
      description: isArabic ? 'نص الإجراء الأساسي' : 'Primary action text',
    },
    {
      name: 'onPrimaryAction',
      type: '() => void',
      description: isArabic ? 'رد الاتصال للإجراء الأساسي' : 'Primary action callback',
    },
  ];

  const sideMenuSectionProps = [
    {
      name: 'title',
      type: 'string',
      description: t('props.sectionTitle'),
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: t('props.sectionChildren'),
    },
  ];

  // Side Menu Preview Component
  const SideMenuPreview = ({
    isExpanded,
    selected,
    onSelect,
    onToggle,
  }: {
    isExpanded: boolean;
    selected: number;
    onSelect: (index: number) => void;
    onToggle: () => void;
  }) => (
    <div 
      className="h-[700px] border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800/30 overflow-visible"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <SideMenu expanded={isExpanded} onToggle={onToggle}>
        <SideMenuHeader
          logo={<BrandLogo collapsed={false} />}
          logoCollapsed={<BrandLogo collapsed={true} />}
          showToggle
        />

        <SideMenuContent>
          {/* Main Section (no title) */}
          <SideMenuSection>
            {mainItems.map((item, index) => (
              <SideMenuItem
                key={item.label}
                icon={item.icon}
                label={isArabic ? item.labelAr : item.label}
                active={selected === index}
                badge={item.badge}
                hasSubmenu={item.hasSubmenu}
                onClick={() => onSelect(index)}
              />
            ))}
          </SideMenuSection>

          <SideMenuSeparator />

          {/* Section with title */}
          <SideMenuSection title={isArabic ? 'القسم الرئيسي' : 'Section Title'}>
            {sectionItems.map((item, index) => (
              <SideMenuItem
                key={item.label}
                icon={item.icon}
                label={isArabic ? item.labelAr : item.label}
                active={selected === index + mainItems.length}
                hasSubmenu={item.hasSubmenu}
                onClick={() => onSelect(index + mainItems.length)}
              />
            ))}
          </SideMenuSection>

          <SideMenuSeparator />

          {/* Settings Section */}
          <SideMenuSection title={isArabic ? 'الإعدادات' : 'Settings'}>
            {settingsItems.map((item, index) => (
              <SideMenuItem
                key={item.label}
                icon={item.icon}
                label={isArabic ? item.labelAr : item.label}
                active={selected === index + mainItems.length + sectionItems.length}
                hasSubmenu={item.hasSubmenu}
                onClick={() => onSelect(index + mainItems.length + sectionItems.length)}
              />
            ))}
          </SideMenuSection>
        </SideMenuContent>

        <SideMenuFooter>
          <SideMenuLogout
            icon={Logout}
            label={isArabic ? 'تسجيل الخروج' : 'Logout'}
            onClick={() => alert('Logout clicked')}
          />
        </SideMenuFooter>
      </SideMenu>
    </div>
  );

  return (
    <ComponentDocTemplate
      title={t('title')}
      description={t('description')}
      category={t('category')}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<SideMenu expanded={${expanded}} onToggle={() => setExpanded(!expanded)}>
  <SideMenuHeader
    logo={<BrandLogo />}
    logoCollapsed={<BrandLogoIcon />}
    showToggle
  />

  <SideMenuContent>
    <SideMenuSection>
      <SideMenuItem icon={Home2} label="Dashboard" active badge={5} />
      <SideMenuItem icon={User} label="Users" badge={12} />
      <SideMenuItem icon={Document} label="Documents" hasSubmenu />
    </SideMenuSection>

    <SideMenuSeparator />

    <SideMenuSection title="Section Title">
      <SideMenuItem icon={Chart} label="Analytics" hasSubmenu />
      <SideMenuItem icon={Wallet2} label="Wallet" hasSubmenu />
    </SideMenuSection>
  </SideMenuContent>

  <SideMenuFooter>
    <SideMenuLogout icon={Logout} label="Logout" />
  </SideMenuFooter>
</SideMenu>`}
          controls={[
            {
              name: 'Expanded',
              nameAr: 'موسع',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={{ Expanded: expanded }}
          onControlChange={(name, value) => {
            if (name === 'Expanded') setExpanded(value as boolean);
          }}
        >
          <div className="flex items-center justify-center py-4">
            <SideMenuPreview
              isExpanded={expanded}
              selected={activeIndex}
              onSelect={setActiveIndex}
              onToggle={() => setExpanded(!expanded)}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Variants Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'الأنماط' : 'Variants'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'القائمة الجانبية تدعم حالتين: موسعة (مع النص) ومطوية (أيقونات فقط).'
              : 'Side Menu supports two states: expanded (with labels) and collapsed (icons only).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expanded Variant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'موسع (312px)' : 'Expanded (312px)'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                expanded: true
              </span>
            </div>
            <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30">
              <SideMenu expanded={true}>
                <SideMenuHeader
                  logo={<BrandLogo collapsed={false} />}
                  showToggle={false}
                />
                <SideMenuContent>
                  <SideMenuSection>
                    <SideMenuItem icon={Home2} label="Dashboard" active badge={5} />
                    <SideMenuItem icon={User} label="Users" badge={12} />
                    <SideMenuItem icon={Document} label="Documents" hasSubmenu />
                  </SideMenuSection>
                  <SideMenuSeparator />
                  <SideMenuSection title="Section Title">
                    <SideMenuItem icon={Chart} label="Analytics" hasSubmenu />
                    <SideMenuItem icon={Wallet2} label="Wallet" hasSubmenu />
                  </SideMenuSection>
                </SideMenuContent>
                <SideMenuFooter>
                  <SideMenuLogout icon={Logout} label="Logout" />
                </SideMenuFooter>
              </SideMenu>
            </div>
          </div>

          {/* Collapsed Variant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'مطوي (80px)' : 'Collapsed (80px)'}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                expanded: false
              </span>
            </div>
            <div className="h-[500px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30 flex">
              <SideMenu expanded={false}>
                <SideMenuHeader
                  logo={<BrandLogo collapsed={false} />}
                  logoCollapsed={<BrandLogo collapsed={true} />}
                  showToggle={false}
                />
                <SideMenuContent>
                  <SideMenuSection>
                    <SideMenuItem icon={Home2} label="Dashboard" active badge={5} />
                    <SideMenuItem icon={User} label="Users" badge={12} />
                    <SideMenuItem icon={Document} label="Documents" />
                  </SideMenuSection>
                  <SideMenuSeparator />
                  <SideMenuSection>
                    <SideMenuItem icon={Chart} label="Analytics" />
                    <SideMenuItem icon={Wallet2} label="Wallet" />
                  </SideMenuSection>
                </SideMenuContent>
                <SideMenuFooter>
                  <SideMenuLogout icon={Logout} label="Logout" />
                </SideMenuFooter>
              </SideMenu>
              {/* Spacer to show collapsed width */}
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Expandable Menu Items Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'القوائم القابلة للتوسيع' : 'Expandable Menu Items'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'استخدم SideMenuExpandableItem لإنشاء قوائم فرعية قابلة للطي مع SideMenuSubItem.'
              : 'Use SideMenuExpandableItem to create collapsible submenus with SideMenuSubItem children.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expandable Example */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'القائمة القابلة للتوسيع' : 'Expandable Submenu'}
            </span>
            <div 
              className="h-[450px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <SideMenu expanded={true}>
                <SideMenuHeader logo={<BrandLogo collapsed={false} />} showToggle={false} />
                <SideMenuContent>
                  <SideMenuSection>
                    <SideMenuItem icon={Home2} label={isArabic ? 'الرئيسية' : 'Dashboard'} active />
                    <SideMenuExpandableItem
                      icon={Box}
                      label={isArabic ? 'المنتجات' : 'Products'}
                      defaultExpanded={true}
                      badge={24}
                    >
                      <SideMenuSubItem label={isArabic ? 'جميع المنتجات' : 'All Products'} />
                      <SideMenuSubItem label={isArabic ? 'إضافة منتج' : 'Add Product'} active />
                      <SideMenuSubItem label={isArabic ? 'الفئات' : 'Categories'} />
                      <SideMenuSubItem label={isArabic ? 'المخزون' : 'Inventory'} badge={3} />
                    </SideMenuExpandableItem>
                    <SideMenuExpandableItem
                      icon={People}
                      label={isArabic ? 'العملاء' : 'Customers'}
                    >
                      <SideMenuSubItem label={isArabic ? 'جميع العملاء' : 'All Customers'} />
                      <SideMenuSubItem label={isArabic ? 'المجموعات' : 'Groups'} />
                    </SideMenuExpandableItem>
                    <SideMenuItem icon={Receipt1} label={isArabic ? 'الطلبات' : 'Orders'} hasSubmenu />
                  </SideMenuSection>
                </SideMenuContent>
                <SideMenuFooter>
                  <SideMenuLogout icon={Logout} label={isArabic ? 'تسجيل الخروج' : 'Logout'} />
                </SideMenuFooter>
              </SideMenu>
            </div>
          </div>

          {/* Sub-item States */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'حالات العناصر الفرعية' : 'Sub-item States'}
            </span>
            <div className="card p-6 space-y-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isArabic
                  ? 'العناصر الفرعية تعرض خط مؤشر عمودي ومؤشر تحديد ملون.'
                  : 'Sub-items display a vertical indicator line and colored selection indicator.'}
              </p>
              {/* Dir attribute ensures logical properties flip correctly */}
              <div 
                className="bg-white dark:bg-neutral-900 rounded-lg p-4 space-y-1"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {/* Default item - indicator at 8px (start-2), text padded 24px (ps-6) */}
                <div className="relative py-2 ps-6 pe-3 rounded-md">
                  <div className="absolute top-0 bottom-0 start-2 w-px bg-neutral-200 dark:bg-neutral-700" />
                  <span className="text-xs text-neutral-500">
                    {isArabic ? 'عنصر افتراضي' : 'Default item'}
                  </span>
                </div>
                {/* Active item - with selection indicator bar */}
                <div className="relative py-2 ps-6 pe-3 rounded-md bg-neutral-50 dark:bg-neutral-800">
                  <div className="absolute top-0 bottom-0 start-2 w-px bg-neutral-200 dark:bg-neutral-700" />
                  <div className="absolute top-1/2 -translate-y-1/2 start-[6px] w-[3px] h-4 rounded-sm bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600">
                    {isArabic ? 'عنصر نشط' : 'Active item'}
                  </span>
                </div>
                {/* With badge */}
                <div className="relative py-2 ps-6 pe-3 rounded-md flex justify-between items-center">
                  <div className="absolute top-0 bottom-0 start-2 w-px bg-neutral-200 dark:bg-neutral-700" />
                  <span className="text-xs text-neutral-500">
                    {isArabic ? 'مع شارة' : 'With badge'}
                  </span>
                  <div className="h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                    5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'البطاقات المميزة' : 'Featured Cards'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'استخدم SideMenuFeatured لعرض بطاقات التقدم والترقية والإعلانات.'
              : 'Use SideMenuFeatured to display progress, upgrade, and announcement cards.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Card */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بطاقة التقدم' : 'Progress Card'}
            </span>
            <div 
              className="h-[200px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30 p-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <SideMenu expanded={true}>
                <SideMenuContent>
                  <SideMenuFeatured
                    variant="progress"
                    title={isArabic ? 'إعداد الحساب' : 'Account setup'}
                    description={isArabic ? 'يرجى إكمال خطوات التسجيل.' : 'Please complete your registration steps.'}
                    progress={30}
                    onDismiss={() => {}}
                  />
                </SideMenuContent>
              </SideMenu>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بطاقة الترقية' : 'Upgrade Card'}
            </span>
            <div 
              className="h-[280px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30 p-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <SideMenu expanded={true}>
                <SideMenuContent>
                  <SideMenuFeatured
                    variant="upgrade"
                    title={isArabic ? 'ترقية الحساب' : 'Upgrade to pro'}
                    description={isArabic ? 'قم بترقية خطتك للوصول إلى جميع الميزات.' : 'Upgrade your plan to access all features.'}
                    primaryAction={isArabic ? 'ترقية الآن' : 'Upgrade now'}
                    onPrimaryAction={() => alert('Upgrade clicked')}
                    onDismiss={() => {}}
                  />
                </SideMenuContent>
              </SideMenu>
            </div>
          </div>

          {/* Announcement Card */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بطاقة الإعلان' : 'Announcement Card'}
            </span>
            <div 
              className="h-[320px] border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/30 p-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <SideMenu expanded={true}>
                <SideMenuContent>
                  <SideMenuFeatured
                    variant="announcement"
                    title={isArabic ? 'اكتشف الميزة الجديدة' : 'Check out the new feature'}
                    description={isArabic ? 'قم بالوصول إلى التكامل الجديد.' : 'Access the new integration with Gamestop.'}
                    imageUrl="https://placehold.co/248x124/f4f6fc/111317?text=GameStop"
                    primaryAction={isArabic ? 'اكتشف الآن' : 'Check out'}
                    secondaryAction={isArabic ? 'تجاهل' : 'Dismiss'}
                    onPrimaryAction={() => alert('Check out clicked')}
                    onSecondaryAction={() => {}}
                  />
                </SideMenuContent>
              </SideMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Item States Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'حالات العنصر' : 'Item States'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'عناصر القائمة تدعم حالات متعددة: افتراضي، نشط، مع شارة، ومع قائمة فرعية.'
              : 'Menu items support multiple states: default, active, with badge, and with submenu.'}
          </p>
        </div>

        <div className="card p-6">
          <div className="flex flex-wrap items-start gap-8">
            {/* Default */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 bg-white dark:bg-neutral-900 rounded-lg p-1">
                <SideMenu expanded={true}>
                  <SideMenuContent>
                    <SideMenuSection>
                      <SideMenuItem icon={Home2} label="Default" />
                    </SideMenuSection>
                  </SideMenuContent>
                </SideMenu>
              </div>
              <p className="text-xs text-neutral-500">Default</p>
            </div>

            {/* Active */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 bg-white dark:bg-neutral-900 rounded-lg p-1">
                <SideMenu expanded={true}>
                  <SideMenuContent>
                    <SideMenuSection>
                      <SideMenuItem icon={Home2} label="Active" active />
                    </SideMenuSection>
                  </SideMenuContent>
                </SideMenu>
              </div>
              <p className="text-xs text-neutral-500">Active</p>
            </div>

            {/* With Badge */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 bg-white dark:bg-neutral-900 rounded-lg p-1">
                <SideMenu expanded={true}>
                  <SideMenuContent>
                    <SideMenuSection>
                      <SideMenuItem icon={Notification} label="With Badge" badge={5} />
                    </SideMenuSection>
                  </SideMenuContent>
                </SideMenu>
              </div>
              <p className="text-xs text-neutral-500">With Badge</p>
            </div>

            {/* With Submenu */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 bg-white dark:bg-neutral-900 rounded-lg p-1">
                <SideMenu expanded={true}>
                  <SideMenuContent>
                    <SideMenuSection>
                      <SideMenuItem icon={Setting2} label="With Submenu" hasSubmenu />
                    </SideMenuSection>
                  </SideMenuContent>
                </SideMenu>
              </div>
              <p className="text-xs text-neutral-500">With Submenu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Props Tables */}
      <section className="space-y-8 mt-16">
        <PropsTable props={sideMenuProps} title="SideMenu Props" titleAr="خصائص SideMenu" />

        <PropsTable
          props={sideMenuItemProps}
          title="SideMenuItem Props"
          titleAr="خصائص SideMenuItem"
        />

        <PropsTable
          props={sideMenuExpandableItemProps}
          title="SideMenuExpandableItem Props"
          titleAr="خصائص SideMenuExpandableItem"
        />

        <PropsTable
          props={sideMenuSubItemProps}
          title="SideMenuSubItem Props"
          titleAr="خصائص SideMenuSubItem"
        />

        <PropsTable
          props={sideMenuFeaturedProps}
          title="SideMenuFeatured Props"
          titleAr="خصائص SideMenuFeatured"
        />

        <PropsTable
          props={sideMenuSectionProps}
          title="SideMenuSection Props"
          titleAr="خصائص SideMenuSection"
        />
      </section>

      {/* Usage Guidelines */}
      <UsageGuidelines
        dos={[
          {
            text: t('guidelines.dos.desktop'),
            textAr: 'استخدم للتنقل في التطبيق على سطح المكتب',
          },
          {
            text: t('guidelines.dos.collapse'),
            textAr: 'اطو إلى أيقونات على الشاشات الصغيرة',
          },
          {
            text: t('guidelines.dos.group'),
            textAr: 'جمع العناصر المترابطة في أقسام',
          },
          { text: t('guidelines.dos.active'), textAr: 'أظهر العنصر النشط بوضوح' },
        ]}
        donts={[
          {
            text: t('guidelines.donts.mobile'),
            textAr: 'لا تظهر على الجوال (استخدم الدرج)',
          },
          { text: t('guidelines.donts.nest'), textAr: 'لا تتداخل بعمق كبير' },
          {
            text: t('guidelines.donts.icons'),
            textAr: 'لا تستخدم أيقونات غير متسقة',
          },
        ]}
      />
    </ComponentDocTemplate>
  );
}
