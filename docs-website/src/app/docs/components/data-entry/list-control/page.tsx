'use client';

import { useState } from 'react';
import { Setting2, InfoCircle, TickCircle } from 'iconsax-react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { ListControl } from '@/components/ui';
import type { ListControlType, ListControlSize, ListControlStyle } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function ListControlPage() {
  const t = useTranslations('listControlPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { currentBrand } = useBrand();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const component = getComponentBySlug('data-entry', 'list-control');

  // Playground state
  const [controlType, setControlType] = useState<ListControlType>('checkbox');
  const [size, setSize] = useState<ListControlSize>('md');
  const [variant, setVariant] = useState<ListControlStyle>('full-width');
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  // Demo states
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(false);
  const [radioValue, setRadioValue] = useState('a');
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  if (!component) return null;

  const code = `import { ListControl } from '@singular/ui';

<ListControl
  type="${controlType}"
  size="${size}"
  variant="${variant}"
  selected={${selected}}
  ${disabled ? 'disabled' : ''}
  title="${isRTL ? t('labels.enableNotifications') : 'Enable Notifications'}"
  ${showDescription ? `description="${isRTL ? t('labels.notificationsDesc') : 'Receive alerts for important updates'}"` : ''}
  onChange={(value) => setSelected(value)}
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category={isRTL ? 'إدخال البيانات' : 'Data Entry'}
      categorySlug="data-entry"
      icon={<Setting2 className="w-6 h-6" variant="Linear" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={code}
          controls={[
            {
              name: 'Type',
              nameAr: 'النوع',
              type: 'select',
              defaultValue: 'checkbox',
              options: [
                { value: 'checkbox', label: 'Checkbox', labelAr: 'مربع الاختيار' },
                { value: 'radio', label: 'Radio', labelAr: 'زر لاسلكي' },
                { value: 'toggle', label: 'Toggle', labelAr: 'مفتاح التبديل' },
              ],
            },
            {
              name: 'Size',
              nameAr: 'الحجم',
              type: 'select',
              defaultValue: 'md',
              options: [
                { value: 'sm', label: 'Small (16px)', labelAr: 'صغير' },
                { value: 'md', label: 'Medium (20px)', labelAr: 'متوسط' },
              ],
            },
            {
              name: 'Variant',
              nameAr: 'النمط',
              type: 'select',
              defaultValue: 'full-width',
              options: [
                { value: 'full-width', label: 'Full Width', labelAr: 'عرض كامل' },
                { value: 'widget', label: 'Widget', labelAr: 'ودجت' },
              ],
            },
            {
              name: 'Selected',
              nameAr: 'محدد',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'Disabled',
              nameAr: 'معطل',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'Show Description',
              nameAr: 'إظهار الوصف',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={{
            Type: controlType,
            Size: size,
            Variant: variant,
            Selected: selected,
            Disabled: disabled,
            'Show Description': showDescription,
          }}
          onControlChange={(name, value) => {
            if (name === 'Type') setControlType(value as ListControlType);
            if (name === 'Size') setSize(value as ListControlSize);
            if (name === 'Variant') setVariant(value as ListControlStyle);
            if (name === 'Selected') setSelected(value as boolean);
            if (name === 'Disabled') setDisabled(value as boolean);
            if (name === 'Show Description') setShowDescription(value as boolean);
          }}
        >
          <div className="w-full max-w-md mx-auto">
            <ListControl
              type={controlType}
              size={size}
              variant={variant}
              selected={selected}
              disabled={disabled}
              title={t('labels.enableNotifications')}
              description={showDescription ? t('labels.notificationsDesc') : undefined}
              showDescription={showDescription}
              onChange={setSelected}
            />
          </div>
        </LivePlayground>

        {/* Control Types Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('types.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('types.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Checkbox */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('types.checkbox.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('types.checkbox.description')}
              </p>
              <div className="space-y-3">
                <ListControl
                  type="checkbox"
                  title={t('labels.optionA')}
                  selected={checkbox1}
                  onChange={setCheckbox1}
                />
                <ListControl
                  type="checkbox"
                  title={t('labels.optionB')}
                  selected={checkbox2}
                  onChange={setCheckbox2}
                />
                <ListControl
                  type="checkbox"
                  title={t('labels.optionC')}
                  selected={checkbox3}
                  onChange={setCheckbox3}
                />
              </div>
            </div>

            {/* Radio */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('types.radio.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('types.radio.description')}
              </p>
              <div className="space-y-3">
                <ListControl
                  type="radio"
                  title={t('labels.optionA')}
                  selected={radioValue === 'a'}
                  onChange={() => setRadioValue('a')}
                />
                <ListControl
                  type="radio"
                  title={t('labels.optionB')}
                  selected={radioValue === 'b'}
                  onChange={() => setRadioValue('b')}
                />
                <ListControl
                  type="radio"
                  title={t('labels.optionC')}
                  selected={radioValue === 'c'}
                  onChange={() => setRadioValue('c')}
                />
              </div>
            </div>

            {/* Toggle */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('types.toggle.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('types.toggle.description')}
              </p>
              <div className="space-y-3">
                <ListControl
                  type="toggle"
                  title={t('labels.darkMode')}
                  selected={toggle1}
                  onChange={setToggle1}
                />
                <ListControl
                  type="toggle"
                  title={t('labels.autoSave')}
                  selected={toggle2}
                  onChange={setToggle2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('sizes.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('sizes.description')}
            </p>
          </div>

          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Small Size */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  {t('sizes.sm')}
                </h3>
                <div className="space-y-3">
                  <ListControl
                    type="checkbox"
                    size="sm"
                    title={t('labels.checkbox')}
                    selected={true}
                  />
                  <ListControl
                    type="radio"
                    size="sm"
                    title={t('labels.radio')}
                    selected={true}
                  />
                  <ListControl
                    type="toggle"
                    size="sm"
                    title={t('labels.toggle')}
                    selected={true}
                  />
                </div>
              </div>

              {/* Medium Size */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  {t('sizes.md')}
                </h3>
                <div className="space-y-3">
                  <ListControl
                    type="checkbox"
                    size="md"
                    title={t('labels.checkbox')}
                    selected={true}
                  />
                  <ListControl
                    type="radio"
                    size="md"
                    title={t('labels.radio')}
                    selected={true}
                  />
                  <ListControl
                    type="toggle"
                    size="md"
                    title={t('labels.toggle')}
                    selected={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style Variants Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('variants.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('variants.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Width */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('variants.fullWidth.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('variants.fullWidth.description')}
              </p>
              <div className="space-y-3">
                <ListControl
                  type="checkbox"
                  variant="full-width"
                  title={t('labels.rememberMe')}
                  description={t('labels.rememberMeDesc')}
                  selected={true}
                />
                <ListControl
                  type="checkbox"
                  variant="full-width"
                  title={t('labels.subscribeNewsletter')}
                  description={t('labels.subscribeDesc')}
                />
              </div>
            </div>

            {/* Widget */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('variants.widget.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('variants.widget.description')}
              </p>
              <div className="space-y-3">
                <ListControl
                  type="checkbox"
                  variant="widget"
                  title={t('labels.rememberMe')}
                  description={t('labels.rememberMeDesc')}
                  selected={true}
                />
                <ListControl
                  type="checkbox"
                  variant="widget"
                  title={t('labels.subscribeNewsletter')}
                  description={t('labels.subscribeDesc')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* States Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('states.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('states.description')}
            </p>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-4 text-start text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('states.state')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('labels.checkbox')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('labels.radio')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('labels.toggle')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Default */}
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {t('states.default')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="checkbox" title="" showTitle={false} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="radio" title="" showTitle={false} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="toggle" title="" showTitle={false} />
                    </div>
                  </td>
                </tr>

                {/* Selected */}
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {t('states.selected')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="checkbox" title="" showTitle={false} selected />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="radio" title="" showTitle={false} selected />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="toggle" title="" showTitle={false} selected />
                    </div>
                  </td>
                </tr>

                {/* Disabled */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {t('states.disabled')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="checkbox" title="" showTitle={false} disabled />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="radio" title="" showTitle={false} disabled />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <ListControl type="toggle" title="" showTitle={false} disabled />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Content Options Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('content.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('content.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Title Only */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('content.titleOnly')}
              </h3>
              <ListControl
                type="checkbox"
                title={t('labels.rememberMe')}
                showDescription={false}
                selected={true}
              />
            </div>

            {/* Title + Description */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('content.titleAndDescription')}
              </h3>
              <ListControl
                type="checkbox"
                title={t('labels.enableNotifications')}
                description={t('labels.notificationsDesc')}
                selected={true}
              />
            </div>

            {/* With Trailing Icon */}
            <div className="card p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('content.withTrailingIcon')}
              </h3>
              <ListControl
                type="checkbox"
                title={t('labels.agreeTerms')}
                description={t('labels.agreeTermsDesc')}
                showTrailingIcon={true}
                trailingIcon={<InfoCircle size={20} variant="Linear" />}
                selected={true}
              />
            </div>
          </div>
        </section>

        {/* Widget Variant Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {isRTL ? 'أمثلة ودجت' : 'Widget Examples'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isRTL
                ? 'أمثلة على استخدام النمط ودجت في سياقات مختلفة.'
                : 'Examples of using the widget variant in different contexts.'}
            </p>
          </div>

          <div className="card p-6">
            <div className="max-w-md mx-auto space-y-4">
              <ListControl
                type="checkbox"
                variant="widget"
                title={t('labels.enableNotifications')}
                description={t('labels.notificationsDesc')}
                showTrailingIcon={true}
                trailingIcon={<InfoCircle size={20} variant="Linear" />}
              />
              <ListControl
                type="toggle"
                variant="widget"
                title={t('labels.darkMode')}
                description={t('labels.darkModeDesc')}
                selected={true}
              />
              <ListControl
                type="radio"
                variant="widget"
                title={t('labels.optionA')}
                description={isRTL ? 'وصف الخيار أ' : 'Description for option A'}
                selected={true}
              />
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
                ? 'شاهد كيف يتكيف ListControl مع أحجام الشاشات المختلفة.'
                : 'See how ListControl adapts to different screen sizes.'}
            </p>
          </div>

          <ResponsivePreview>
            <div className="space-y-4 p-4">
              <ListControl
                type="checkbox"
                variant="widget"
                title={t('labels.enableNotifications')}
                description={t('labels.notificationsDesc')}
                selected={true}
              />
              <ListControl
                type="toggle"
                variant="widget"
                title={t('labels.darkMode')}
                description={t('labels.darkModeDesc')}
              />
              <ListControl
                type="radio"
                variant="widget"
                title={t('labels.subscribeNewsletter')}
                description={t('labels.subscribeDesc')}
                selected={true}
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
              text: 'Use checkboxes for multi-select options',
              textAr: 'استخدم مربعات الاختيار للاختيار المتعدد',
            },
            {
              text: 'Use radios for single-select within a group',
              textAr: 'استخدم الأزرار اللاسلكية للاختيار الفردي في مجموعة',
            },
            {
              text: 'Use toggles for immediate on/off actions',
              textAr: 'استخدم مفاتيح التبديل للإجراءات الفورية',
            },
            {
              text: 'Add descriptions for complex options',
              textAr: 'أضف أوصاف للخيارات المعقدة',
            },
            {
              text: 'Use widget variant for standalone options',
              textAr: 'استخدم نمط ودجت للخيارات المستقلة',
            },
          ]}
          donts={[
            {
              text: "Don't use radios for multi-select scenarios",
              textAr: 'لا تستخدم الأزرار اللاسلكية للاختيار المتعدد',
            },
            {
              text: "Don't mix control types in the same group",
              textAr: 'لا تخلط بين أنواع التحكم في نفس المجموعة',
            },
            {
              text: "Don't use toggle for options requiring confirmation",
              textAr: 'لا تستخدم التبديل للخيارات التي تتطلب تأكيداً',
            },
            {
              text: "Don't overuse long descriptions",
              textAr: 'لا تفرط في الأوصاف الطويلة',
            },
          ]}
        />

        {/* Accessibility Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('accessibility.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('accessibility.description')}
            </p>
          </div>

          <div className="card p-6">
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <TickCircle size={20} variant="Bold" className="text-green-500 shrink-0 mt-0.5" />
                <span>
                  {isRTL
                    ? 'التنقل بلوحة المفاتيح باستخدام Tab و Space و Enter'
                    : 'Keyboard navigation with Tab, Space, and Enter keys'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TickCircle size={20} variant="Bold" className="text-green-500 shrink-0 mt-0.5" />
                <span>
                  {isRTL
                    ? 'سمات ARIA المناسبة (role, aria-checked, aria-disabled)'
                    : 'Proper ARIA attributes (role, aria-checked, aria-disabled)'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TickCircle size={20} variant="Bold" className="text-green-500 shrink-0 mt-0.5" />
                <span>
                  {isRTL
                    ? 'حالة التركيز المرئية لإمكانية الوصول'
                    : 'Visible focus state for accessibility'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TickCircle size={20} variant="Bold" className="text-green-500 shrink-0 mt-0.5" />
                <span>
                  {isRTL
                    ? 'دعم كامل لاتجاه RTL'
                    : 'Full RTL direction support'}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ComponentDocTemplate>
  );
}
