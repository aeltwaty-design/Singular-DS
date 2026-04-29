'use client';

import { useState } from 'react';
import { ArrowDown2, User, Location, Category2, Flag as FlagIcon } from 'iconsax-react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { DropdownMenu, InputDropdown, DropdownMenuItem } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function DropdownPage() {
  const t = useTranslations('dropdownPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { currentBrand } = useBrand();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const component = getComponentBySlug('data-entry', 'dropdown');

  // Sample data
  const countriesData: DropdownMenuItem[] = [
    { id: '1', label: t('countries.saudi'), icon: <FlagIcon size={20} variant="Linear" /> },
    { id: '2', label: t('countries.uae'), icon: <FlagIcon size={20} variant="Linear" /> },
    { id: '3', label: t('countries.egypt'), icon: <FlagIcon size={20} variant="Linear" /> },
    { id: '4', label: t('countries.jordan'), icon: <FlagIcon size={20} variant="Linear" /> },
    { id: '5', label: t('countries.kuwait'), icon: <FlagIcon size={20} variant="Linear" /> },
  ];

  const citiesData: DropdownMenuItem[] = [
    { id: '1', label: isRTL ? 'الرياض' : 'Riyadh' },
    { id: '2', label: isRTL ? 'جدة' : 'Jeddah' },
    { id: '3', label: isRTL ? 'الدمام' : 'Dammam' },
    { id: '4', label: isRTL ? 'مكة المكرمة' : 'Makkah' },
    { id: '5', label: isRTL ? 'المدينة المنورة' : 'Madinah' },
  ];

  const optionsData: DropdownMenuItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    label: `${t('labels.option')} ${i + 1}`,
  }));

  // Playground state
  const [selectedCountry, setSelectedCountry] = useState<string>('1');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [leadingType, setLeadingType] = useState<'none' | 'icon' | 'image' | 'avatar'>('none');
  const [showLabel, setShowLabel] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Standalone dropdown menus
  const [menuSelected1, setMenuSelected1] = useState<string>('');
  const [menuSelected2, setMenuSelected2] = useState<string>('');

  // State examples
  const [stateEnabled, setStateEnabled] = useState<string>('');
  const [stateFocused, setStateFocused] = useState<string>('');
  const [stateOpen, setStateOpen] = useState<string>('');
  const [stateDisplay, setStateDisplay] = useState<string>('1');

  // Leading variants
  const [leadingNone, setLeadingNone] = useState<string>('');
  const [leadingIcon, setLeadingIcon] = useState<string>('');
  const [leadingImage, setLeadingImage] = useState<string>('');
  const [leadingAvatar, setLeadingAvatar] = useState<string>('');

  if (!component) return null;

  const code = `import { InputDropdown, DropdownMenuItem } from '@singular/ui';

const items: DropdownMenuItem[] = [
  { id: '1', label: '${t('countries.saudi')}', icon: <FlagIcon /> },
  { id: '2', label: '${t('countries.uae')}', icon: <FlagIcon /> },
  // ... more items
];

<InputDropdown
  items={items}
  selectedId={selectedId}
  onSelect={(item) => setSelectedId(item.id)}
  label="${t('labels.selectCountry')}"
  hint="${t('inputDropdown.hint')}"
  leading="${leadingType}"
  ${leadingType === 'icon' ? 'leadingIcon={<User size={20} />}' : ''}
  ${!showLabel ? 'showLabel={false}' : ''}
  ${!showHint ? 'showHint={false}' : ''}
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category={isRTL ? 'إدخال البيانات' : 'Data Entry'}
      categorySlug="data-entry"
      icon={<ArrowDown2 className="w-6 h-6" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={code}
          controls={[
            {
              name: 'Leading Type',
              nameAr: 'نوع العنصر الأمامي',
              type: 'select',
              defaultValue: 'none',
              options: [
                { value: 'none', label: 'None', labelAr: 'بلا' },
                { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
                { value: 'image', label: 'Image', labelAr: 'صورة' },
                { value: 'avatar', label: 'Avatar', labelAr: 'صورة رمزية' },
              ],
            },
            {
              name: 'Show Label',
              nameAr: 'إظهار التسمية',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'Show Hint',
              nameAr: 'إظهار المساعدة',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={{
            'Leading Type': leadingType,
            'Show Label': showLabel,
            'Show Hint': showHint,
          }}
          onControlChange={(name, value) => {
            if (name === 'Leading Type') setLeadingType(value as any);
            if (name === 'Show Label') setShowLabel(value as boolean);
            if (name === 'Show Hint') setShowHint(value as boolean);
          }}
        >
          <div className="w-full max-w-md mx-auto">
            <InputDropdown
              items={countriesData}
              selectedId={selectedCountry}
              onSelect={(item) => setSelectedCountry(item.id)}
              label={t('labels.selectCountry')}
              hint={t('inputDropdown.hint')}
              placeholder={t('inputDropdown.placeholder')}
              showLabel={showLabel}
              showHint={showHint}
              leading={leadingType}
              leadingIcon={leadingType === 'icon' ? <User size={20} variant="Linear" /> : undefined}
              leadingImage={
                leadingType === 'image'
                  ? 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=40&h=40&fit=crop'
                  : undefined
              }
              leadingAvatar={
                leadingType === 'avatar'
                  ? {
                      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
                      alt: 'User avatar',
                    }
                  : undefined
              }
            />
          </div>
        </LivePlayground>

        {/* Dropdown Menu Component */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('dropdownMenu.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('dropdownMenu.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* With Icons */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('dropdownMenu.withIcons')}
              </h3>
              <DropdownMenu
                items={countriesData}
                selectedId={menuSelected1}
                onSelect={(item) => setMenuSelected1(item.id)}
                width={280}
              />
            </div>

            {/* Without Icons */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('dropdownMenu.withoutIcons')}
              </h3>
              <DropdownMenu
                items={citiesData}
                selectedId={menuSelected2}
                onSelect={(item) => setMenuSelected2(item.id)}
                width={280}
              />
            </div>
          </div>
        </section>

        {/* Input Dropdown States */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('states.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('states.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enabled */}
            <div className="card p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('states.enabled')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('states.description_enabled')}
                </p>
              </div>
              <InputDropdown
                items={citiesData}
                selectedId={stateEnabled}
                onSelect={(item) => setStateEnabled(item.id)}
                label={t('labels.selectCity')}
                placeholder={t('inputDropdown.placeholder')}
                showHint={false}
              />
            </div>

            {/* Focused */}
            <div className="card p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('states.focused')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('states.description_focused')}
                </p>
              </div>
              <InputDropdown
                items={citiesData}
                selectedId={stateFocused}
                onSelect={(item) => setStateFocused(item.id)}
                label={t('labels.selectCity')}
                placeholder={t('inputDropdown.placeholder')}
                showHint={false}
              />
            </div>

            {/* Open */}
            <div className="card p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('states.open')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('states.description_open')}
                </p>
              </div>
              <InputDropdown
                items={citiesData.slice(0, 3)}
                selectedId={stateOpen}
                onSelect={(item) => setStateOpen(item.id)}
                label={t('labels.selectCity')}
                placeholder={t('inputDropdown.placeholder')}
                showHint={false}
              />
            </div>

            {/* Display */}
            <div className="card p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('states.display')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('states.description_display')}
                </p>
              </div>
              <InputDropdown
                items={citiesData}
                selectedId={stateDisplay}
                onSelect={(item) => setStateDisplay(item.id)}
                label={t('labels.selectCity')}
                placeholder={t('inputDropdown.placeholder')}
                showHint={false}
              />
            </div>
          </div>
        </section>

        {/* Leading Variants */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('leading.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('leading.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* None */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('leading.none')}
              </h3>
              <InputDropdown
                items={citiesData}
                selectedId={leadingNone}
                onSelect={(item) => setLeadingNone(item.id)}
                label={t('labels.selectCity')}
                leading="none"
                showHint={false}
              />
            </div>

            {/* Icon */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('leading.icon')}
              </h3>
              <InputDropdown
                items={citiesData}
                selectedId={leadingIcon}
                onSelect={(item) => setLeadingIcon(item.id)}
                label={t('labels.selectCity')}
                leading="icon"
                leadingIcon={<Location size={20} variant="Linear" />}
                showHint={false}
              />
            </div>

            {/* Image */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('leading.image')}
              </h3>
              <InputDropdown
                items={citiesData}
                selectedId={leadingImage}
                onSelect={(item) => setLeadingImage(item.id)}
                label={t('labels.selectCity')}
                leading="image"
                leadingImage="https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=40&h=40&fit=crop"
                showHint={false}
              />
            </div>

            {/* Avatar */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('leading.avatar')}
              </h3>
              <InputDropdown
                items={citiesData}
                selectedId={leadingAvatar}
                onSelect={(item) => setLeadingAvatar(item.id)}
                label={t('labels.selectCity')}
                leading="avatar"
                leadingAvatar={{
                  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
                  alt: 'User',
                }}
                showHint={false}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('features.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('features.rtl')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('features.rtlDesc')}
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('features.keyboard')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('features.keyboardDesc')}
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('features.elevation')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('features.elevationDesc')}
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('features.states')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('features.statesDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {isRTL ? 'معاينة متجاوبة' : 'Responsive Preview'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isRTL
                ? 'شاهد كيف يتكيف InputDropdown مع أحجام الشاشات المختلفة.'
                : 'See how InputDropdown adapts to different screen sizes.'}
            </p>
          </div>

          <ResponsivePreview>
            <div className="space-y-4 p-4">
              <InputDropdown
                items={countriesData}
                selectedId={selectedCountry}
                onSelect={(item) => setSelectedCountry(item.id)}
                label={t('labels.selectCountry')}
                hint={t('inputDropdown.hint')}
                leading="icon"
                leadingIcon={<FlagIcon size={20} variant="Linear" />}
              />
            </div>
          </ResponsivePreview>
        </section>

        {/* Props Table */}
        {component.props && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {isRTL ? 'الخصائص' : 'Props'}
            </h2>
            <PropsTable props={component.props} />
          </section>
        )}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            {
              text: 'Use InputDropdown for form inputs requiring single selection',
              textAr: 'استخدم InputDropdown لمدخلات النماذج التي تتطلب اختياراً واحداً',
            },
            {
              text: 'Use DropdownMenu for context menus and navigation',
              textAr: 'استخدم DropdownMenu للقوائم السياقية والتنقل',
            },
            {
              text: 'Provide clear labels and hint text for better UX',
              textAr: 'قدم تسميات واضحة ونصوص مساعدة لتجربة مستخدم أفضل',
            },
            {
              text: 'Use leading icons to provide visual context',
              textAr: 'استخدم الأيقونات الأمامية لتوفير سياق بصري',
            },
            {
              text: 'Limit dropdown items to 10-15 for better usability',
              textAr: 'حدد عناصر القائمة بـ 10-15 عنصراً لسهولة الاستخدام',
            },
          ]}
          donts={[
            {
              text: "Don't use dropdown for more than 20 items, consider search instead",
              textAr: 'لا تستخدم القائمة لأكثر من 20 عنصراً، استخدم البحث بدلاً من ذلك',
            },
            {
              text: "Don't use multiple leading elements simultaneously",
              textAr: 'لا تستخدم عدة عناصر أمامية في نفس الوقت',
            },
            {
              text: "Don't disable items without clear indication",
              textAr: 'لا تعطل العناصر بدون إشارة واضحة',
            },
            {
              text: "Don't use dropdown when radio buttons are more appropriate",
              textAr: 'لا تستخدم القائمة المنسدلة عندما تكون الأزرار اللاسلكية أكثر ملاءمة',
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
