'use client';

import { useState } from 'react';
import { MousePointerClick, ArrowRight, ArrowLeft, Mail, Download, Trash2, Plus, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { Button } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function ButtonsPage() {
  const t = useTranslations('buttonsPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const component = getComponentBySlug('call-to-actions', 'buttons');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [danger, setDanger] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!component) return null;

  // Arrow icon that respects RTL
  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  const code = `import { Button } from '@singular/ui';

<Button
  variant="${variant}"
  size="${size}"
  ${danger ? 'danger' : ''}
  ${disabled ? 'disabled' : ''}
  ${loading ? 'loading' : ''}
>
  Button Text
</Button>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category={isRTL ? 'أزرار الإجراءات' : 'Call to Actions'}
      categorySlug="call-to-actions"
      icon={<MousePointerClick className="w-6 h-6" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={code}
          controls={[
            {
              name: 'Variant',
              nameAr: 'النمط',
              type: 'select',
              defaultValue: 'primary',
              options: [
                { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
                { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
                { value: 'tertiary', label: 'Tertiary', labelAr: 'ثالثي' },
                { value: 'outline', label: 'Outline', labelAr: 'محدد' },
              ],
            },
            {
              name: 'Size',
              nameAr: 'الحجم',
              type: 'select',
              defaultValue: 'md',
              options: [
                { value: 'sm', label: 'Small (30px)', labelAr: 'صغير' },
                { value: 'md', label: 'Medium (41px)', labelAr: 'متوسط' },
                { value: 'lg', label: 'Large (48px)', labelAr: 'كبير' },
                { value: 'xl', label: 'X-Large (59px)', labelAr: 'كبير جداً' },
              ],
            },
            {
              name: 'Danger',
              nameAr: 'خطر',
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
              name: 'Loading',
              nameAr: 'تحميل',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={{ 
            Variant: variant, 
            Size: size, 
            Danger: danger,
            Disabled: disabled, 
            Loading: loading 
          }}
          onControlChange={(name, value) => {
            if (name === 'Variant') setVariant(value as typeof variant);
            if (name === 'Size') setSize(value as typeof size);
            if (name === 'Danger') setDanger(value as boolean);
            if (name === 'Disabled') setDisabled(value as boolean);
            if (name === 'Loading') setLoading(value as boolean);
          }}
        >
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button 
              variant={variant} 
              size={size} 
              danger={danger}
              disabled={disabled} 
              loading={loading}
            >
              {t('buttonText')}
            </Button>
            <Button 
              variant={variant} 
              size={size}
              danger={danger} 
              disabled={disabled} 
              leftIcon={<Mail className="w-4 h-4" />}
            >
              {t('withIcon')}
            </Button>
            <Button 
              variant={variant} 
              size={size}
              danger={danger} 
              disabled={disabled} 
              rightIcon={<DirectionalArrow className="w-4 h-4" />}
            >
              {t('continue')}
            </Button>
          </div>
        </LivePlayground>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="space-y-3 p-4">
              <Button fullWidth size="lg">{t('responsive.primaryAction')}</Button>
              <Button fullWidth variant="secondary" size="lg">{t('responsive.secondaryAction')}</Button>
              <Button fullWidth variant="outline" size="md">{t('responsive.tertiaryAction')}</Button>
            </div>
          }
          tablet={
            <div className="flex gap-3 p-4">
              <Button size="lg">{t('variants.primary.title')}</Button>
              <Button variant="secondary" size="lg">{t('variants.secondary.title')}</Button>
              <Button variant="tertiary" size="lg">{t('variants.tertiary.title')}</Button>
              <Button variant="outline" size="lg">{t('variants.outline.title')}</Button>
            </div>
          }
          desktop={
            <div className="flex gap-4 p-4">
              <Button size="xl" leftIcon={<Download className="w-5 h-5" />}>{t('responsive.downloadApp')}</Button>
              <Button variant="secondary" size="xl">{t('responsive.learnMore')}</Button>
              <Button variant="tertiary" size="xl">{t('responsive.skip')}</Button>
              <Button variant="outline" size="xl">{t('responsive.settings')}</Button>
            </div>
          }
        />

        {/* All Variants Showcase */}
        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('variants.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('variants.description')}
            </p>
          </div>

          {/* Primary Buttons */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.primary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.primary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">{t('small')}</Button>
              <Button variant="primary" size="md">{t('medium')}</Button>
              <Button variant="primary" size="lg">{t('large')}</Button>
              <Button variant="primary" size="xl">{t('xLarge')}</Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.secondary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.secondary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="sm">{t('small')}</Button>
              <Button variant="secondary" size="md">{t('medium')}</Button>
              <Button variant="secondary" size="lg">{t('large')}</Button>
              <Button variant="secondary" size="xl">{t('xLarge')}</Button>
            </div>
          </div>

          {/* Tertiary Buttons */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.tertiary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.tertiary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="tertiary" size="sm">{t('small')}</Button>
              <Button variant="tertiary" size="md">{t('medium')}</Button>
              <Button variant="tertiary" size="lg">{t('large')}</Button>
              <Button variant="tertiary" size="xl">{t('xLarge')}</Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.outline.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.outline.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm">{t('small')}</Button>
              <Button variant="outline" size="md">{t('medium')}</Button>
              <Button variant="outline" size="lg">{t('large')}</Button>
              <Button variant="outline" size="xl">{t('xLarge')}</Button>
            </div>
          </div>
        </section>

        {/* Danger Variants */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('danger.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('danger.description')}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" danger leftIcon={<Trash2 className="w-4 h-4" />}>
                {t('danger.delete')}
              </Button>
              <Button variant="secondary" danger leftIcon={<Trash2 className="w-4 h-4" />}>
                {t('danger.remove')}
              </Button>
              <Button variant="tertiary" danger>
                {t('danger.cancel')}
              </Button>
              <Button variant="outline" danger>
                {t('danger.discard')}
              </Button>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('states.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('states.description')}
            </p>
          </div>

          {/* State Demonstration Grid */}
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">{t('states.variant')}</th>
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">{t('states.default')}</th>
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">
                      <span className="inline-flex items-center gap-1">
                        {t('states.hover')}
                        <span className="text-[10px] font-normal normal-case text-neutral-400">({t('states.interactive')})</span>
                      </span>
                    </th>
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">
                      <span className="inline-flex items-center gap-1">
                        {t('states.focused')}
                        <span className="text-[10px] font-normal normal-case text-neutral-400">({t('states.focusHint')})</span>
                      </span>
                    </th>
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">{t('states.disabled')}</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">{t('states.loading')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {/* Primary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.primary.title')}</td>
                    <td className="py-4 pe-6"><Button variant="primary" size="sm">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6"><Button variant="primary" size="sm" className="ring-2 ring-offset-2">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6"><Button variant="primary" size="sm" disabled>{t('states.button')}</Button></td>
                    <td className="py-4"><Button variant="primary" size="sm" loading>{t('states.button')}</Button></td>
                  </tr>
                  {/* Secondary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.secondary.title')}</td>
                    <td className="py-4 pe-6"><Button variant="secondary" size="sm">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6"><Button variant="secondary" size="sm" className="ring-2 ring-offset-2">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6"><Button variant="secondary" size="sm" disabled>{t('states.button')}</Button></td>
                    <td className="py-4"><Button variant="secondary" size="sm" loading>{t('states.button')}</Button></td>
                  </tr>
                  {/* Tertiary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.tertiary.title')}</td>
                    <td className="py-4 pe-6"><Button variant="tertiary" size="sm">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6"><Button variant="tertiary" size="sm" className="ring-2 ring-offset-2">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6"><Button variant="tertiary" size="sm" disabled>{t('states.button')}</Button></td>
                    <td className="py-4"><Button variant="tertiary" size="sm" loading>{t('states.button')}</Button></td>
                  </tr>
                  {/* Outline Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.outline.title')}</td>
                    <td className="py-4 pe-6"><Button variant="outline" size="sm">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6"><Button variant="outline" size="sm" className="ring-2 ring-offset-2">{t('states.button')}</Button></td>
                    <td className="py-4 pe-6"><Button variant="outline" size="sm" disabled>{t('states.button')}</Button></td>
                    <td className="py-4"><Button variant="outline" size="sm" loading>{t('states.button')}</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* State Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card p-4">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('states.default')} State</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('states.defaultDesc')}
              </p>
            </div>
            <div className="card p-4">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('states.hover')} State</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('states.hoverDesc')}
              </p>
            </div>
            <div className="card p-4">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('states.focused')} State</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('states.focusedDesc')}
              </p>
            </div>
            <div className="card p-4">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('states.disabled')} State</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('states.disabledDesc')}
              </p>
            </div>
            <div className="card p-4">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t('states.loading')} State</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('states.loadingDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('icons.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('icons.description')}
            </p>
          </div>

          <div className="card p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                {t('icons.addItem')}
              </Button>
              <Button rightIcon={<DirectionalArrow className="w-4 h-4" />}>
                {t('icons.nextStep')}
              </Button>
              <Button leftIcon={<Check className="w-4 h-4" />} rightIcon={<DirectionalArrow className="w-4 h-4" />}>
                {t('icons.confirmContinue')}
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" leftIcon={<Mail className="w-4 h-4" />}>
                {t('icons.sendEmail')}
              </Button>
              <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                {t('icons.download')}
              </Button>
              <Button variant="tertiary" rightIcon={<DirectionalArrow className="w-4 h-4" />}>
                {t('icons.viewAll')}
              </Button>
            </div>
          </div>
        </section>

        {/* Full Width */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('fullWidth.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('fullWidth.description')}
            </p>
          </div>

          <div className="card p-6 max-w-md">
            <div className="space-y-3">
              <Button fullWidth size="lg">
                {t('continue')}
              </Button>
              <Button fullWidth variant="secondary" size="lg">
                {t('fullWidth.back')}
              </Button>
            </div>
          </div>
        </section>

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use primary buttons for the main call to action', textAr: 'استخدم الأزرار الأساسية للإجراء الرئيسي' },
            { text: 'Use one primary button per section', textAr: 'استخدم زر أساسي واحد لكل قسم' },
            { text: 'Use danger variant for destructive actions', textAr: 'استخدم نمط الخطر للإجراءات التدميرية' },
            { text: 'Include descriptive and action-oriented labels', textAr: 'أضف تسميات وصفية وموجهة للإجراء' },
            { text: 'Use loading state for async operations', textAr: 'استخدم حالة التحميل للعمليات غير المتزامنة' },
            { text: 'Maintain consistent sizing within a context', textAr: 'حافظ على حجم متسق داخل السياق' },
          ]}
          donts={[
            { text: "Don't use multiple primary buttons in the same view", textAr: 'لا تستخدم أزرار أساسية متعددة في نفس العرض' },
            { text: "Don't use vague labels like 'Click here'", textAr: "لا تستخدم تسميات غامضة مثل 'انقر هنا'" },
            { text: "Don't disable buttons without clear explanation", textAr: 'لا تعطل الأزرار بدون توضيح واضح' },
            { text: "Don't mix button sizes in the same group", textAr: 'لا تخلط أحجام الأزرار في نفس المجموعة' },
            { text: "Don't use danger style for non-destructive actions", textAr: 'لا تستخدم نمط الخطر للإجراءات غير التدميرية' },
            { text: "Don't place too many buttons in one area", textAr: 'لا تضع الكثير من الأزرار في منطقة واحدة' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
