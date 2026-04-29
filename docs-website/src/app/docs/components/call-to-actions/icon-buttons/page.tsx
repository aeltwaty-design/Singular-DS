'use client';

import { useState } from 'react';
import { MousePointerClick, Heart, Share2, Settings, Trash2, Plus, Search, Menu, Bell, User, Edit, MoreHorizontal } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { IconButton } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function IconButtonsPage() {
  const t = useTranslations('iconButtonsPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const component = getComponentBySlug('call-to-actions', 'icon-buttons');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [danger, setDanger] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!component) return null;

  const code = `import { IconButton } from '@singular/ui';
import { Heart } from 'lucide-react';

<IconButton
  icon={<Heart />}
  label="${t('like')}"
  variant="${variant}"
  size="${size}"
  ${danger ? 'danger' : ''}
  ${disabled ? 'disabled' : ''}
  ${loading ? 'loading' : ''}
/>`;

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
            <IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant={variant} size={size} danger={danger} disabled={disabled} loading={loading} />
            <IconButton icon={<Share2 className="w-5 h-5" />} label={t('share')} variant={variant} size={size} danger={danger} disabled={disabled} />
            <IconButton icon={<Settings className="w-5 h-5" />} label={t('settings')} variant={variant} size={size} danger={danger} disabled={disabled} />
            <IconButton icon={<Trash2 className="w-5 h-5" />} label={t('delete')} variant={variant} size={size} danger={danger} disabled={disabled} />
          </div>
        </LivePlayground>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex justify-around">
              <IconButton icon={<Menu className="w-5 h-5" />} label={t('menu')} size="md" />
              <IconButton icon={<Search className="w-5 h-5" />} label={t('search')} size="md" />
              <IconButton icon={<Plus className="w-5 h-5" />} label={t('add')} variant="primary" size="md" />
            </div>
          }
          tablet={
            <div className="flex gap-2">
              <IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} size="lg" />
              <IconButton icon={<Share2 className="w-5 h-5" />} label={t('share')} size="lg" />
              <IconButton icon={<Settings className="w-5 h-5" />} label={t('settings')} size="lg" />
            </div>
          }
          desktop={
            <div className="flex gap-3">
              <IconButton icon={<Heart className="w-6 h-6" />} label={t('like')} size="xl" />
              <IconButton icon={<Share2 className="w-6 h-6" />} label={t('share')} size="xl" />
              <IconButton icon={<Settings className="w-6 h-6" />} label={t('settings')} size="xl" />
              <IconButton icon={<Trash2 className="w-6 h-6" />} label={t('delete')} size="xl" />
            </div>
          }
        />

        {/* Variants Section */}
        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('variants.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('variants.description')}
            </p>
          </div>

          {/* Primary */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.primary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.primary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <IconButton icon={<Plus className="w-4 h-4" />} label={t('add')} variant="primary" size="sm" />
              <IconButton icon={<Plus className="w-5 h-5" />} label={t('add')} variant="primary" size="md" />
              <IconButton icon={<Plus className="w-5 h-5" />} label={t('add')} variant="primary" size="lg" />
              <IconButton icon={<Plus className="w-6 h-6" />} label={t('add')} variant="primary" size="xl" />
            </div>
          </div>

          {/* Secondary */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.secondary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.secondary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <IconButton icon={<Edit className="w-4 h-4" />} label="Edit" variant="secondary" size="sm" />
              <IconButton icon={<Edit className="w-5 h-5" />} label="Edit" variant="secondary" size="md" />
              <IconButton icon={<Edit className="w-5 h-5" />} label="Edit" variant="secondary" size="lg" />
              <IconButton icon={<Edit className="w-6 h-6" />} label="Edit" variant="secondary" size="xl" />
            </div>
          </div>

          {/* Tertiary */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.tertiary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.tertiary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <IconButton icon={<MoreHorizontal className="w-4 h-4" />} label="More" variant="tertiary" size="sm" />
              <IconButton icon={<MoreHorizontal className="w-5 h-5" />} label="More" variant="tertiary" size="md" />
              <IconButton icon={<MoreHorizontal className="w-5 h-5" />} label="More" variant="tertiary" size="lg" />
              <IconButton icon={<MoreHorizontal className="w-6 h-6" />} label="More" variant="tertiary" size="xl" />
            </div>
          </div>

          {/* Outline */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.outline.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.outline.description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <IconButton icon={<Settings className="w-4 h-4" />} label={t('settings')} variant="outline" size="sm" />
              <IconButton icon={<Settings className="w-5 h-5" />} label={t('settings')} variant="outline" size="md" />
              <IconButton icon={<Settings className="w-5 h-5" />} label={t('settings')} variant="outline" size="lg" />
              <IconButton icon={<Settings className="w-6 h-6" />} label={t('settings')} variant="outline" size="xl" />
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
              <IconButton icon={<Trash2 className="w-5 h-5" />} label={t('delete')} variant="primary" danger />
              <IconButton icon={<Trash2 className="w-5 h-5" />} label={t('delete')} variant="secondary" danger />
              <IconButton icon={<Trash2 className="w-5 h-5" />} label={t('delete')} variant="tertiary" danger />
              <IconButton icon={<Trash2 className="w-5 h-5" />} label={t('delete')} variant="outline" danger />
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
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="primary" /></td>
                    <td className="py-4 pe-6"><span className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</span></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="primary" className="ring-2 ring-offset-2" /></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="primary" disabled /></td>
                    <td className="py-4"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="primary" loading /></td>
                  </tr>
                  {/* Secondary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.secondary.title')}</td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="secondary" /></td>
                    <td className="py-4 pe-6"><span className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</span></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="secondary" className="ring-2 ring-offset-2" /></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="secondary" disabled /></td>
                    <td className="py-4"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="secondary" loading /></td>
                  </tr>
                  {/* Tertiary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.tertiary.title')}</td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="tertiary" /></td>
                    <td className="py-4 pe-6"><span className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</span></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="tertiary" className="ring-2 ring-offset-2" /></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="tertiary" disabled /></td>
                    <td className="py-4"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="tertiary" loading /></td>
                  </tr>
                  {/* Outline Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.outline.title')}</td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="outline" /></td>
                    <td className="py-4 pe-6"><span className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</span></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="outline" className="ring-2 ring-offset-2" /></td>
                    <td className="py-4 pe-6"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="outline" disabled /></td>
                    <td className="py-4"><IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} variant="outline" loading /></td>
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

        {/* Common Examples */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('examples.title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Toolbar Actions */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                {t('examples.toolbar')}
              </h4>
              <div className="flex gap-1 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
                <IconButton icon={<Edit className="w-4 h-4" />} label="Edit" variant="tertiary" size="sm" />
                <IconButton icon={<Trash2 className="w-4 h-4" />} label={t('delete')} variant="tertiary" size="sm" />
                <IconButton icon={<MoreHorizontal className="w-4 h-4" />} label="More" variant="tertiary" size="sm" />
              </div>
            </div>

            {/* Social Actions */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                {t('examples.social')}
              </h4>
              <div className="flex gap-2">
                <IconButton icon={<Heart className="w-5 h-5" />} label={t('like')} />
                <IconButton icon={<Share2 className="w-5 h-5" />} label={t('share')} />
              </div>
            </div>

            {/* Navigation */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                {t('examples.navigation')}
              </h4>
              <div className="flex gap-2">
                <IconButton icon={<Menu className="w-5 h-5" />} label={t('menu')} variant="outline" />
                <IconButton icon={<Bell className="w-5 h-5" />} label="Notifications" variant="outline" />
                <IconButton icon={<User className="w-5 h-5" />} label="Profile" variant="outline" />
              </div>
            </div>
          </div>
        </section>

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Always provide an accessible label', textAr: 'قدم دائمًا تسمية يمكن الوصول إليها' },
            { text: 'Use recognizable icons', textAr: 'استخدم أيقونات يمكن التعرف عليها' },
            { text: 'Use danger variant for destructive actions', textAr: 'استخدم نمط الخطر للإجراءات التدميرية' },
            { text: 'Keep icon sizes consistent within a group', textAr: 'حافظ على اتساق أحجام الأيقونات في المجموعة' },
            { text: 'Use loading state for async operations', textAr: 'استخدم حالة التحميل للعمليات غير المتزامنة' },
          ]}
          donts={[
            { text: "Don't use icon buttons for primary actions with text", textAr: 'لا تستخدم أزرار الأيقونات للإجراءات الأساسية مع النص' },
            { text: "Don't use ambiguous icons", textAr: 'لا تستخدم أيقونات غامضة' },
            { text: "Don't forget the label prop for accessibility", textAr: 'لا تنس خاصية التسمية لإمكانية الوصول' },
            { text: "Don't use danger style for non-destructive actions", textAr: 'لا تستخدم نمط الخطر للإجراءات غير التدميرية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
