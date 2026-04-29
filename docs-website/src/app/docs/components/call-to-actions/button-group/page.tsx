'use client';

import { useState } from 'react';
import { MousePointerClick, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, List, Grid, LayoutList, Download, Share2, Trash2, Plus, Check, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { Button, ButtonGroup, IconButton } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function ButtonGroupPage() {
  const t = useTranslations('buttonGroupPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const component = getComponentBySlug('call-to-actions', 'button-group');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary' | 'outline'>('primary');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [attached, setAttached] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [gap, setGap] = useState<'none' | 'sm' | 'md' | 'lg'>('md');

  if (!component) return null;

  const code = `import { Button, ButtonGroup } from '@singular/ui';

<ButtonGroup
  orientation="${orientation}"
  ${attached ? 'attached' : ''}
  size="${size}"
  gap="${gap}"
>
  <Button variant="${variant}">${t('left')}</Button>
  <Button variant="${variant}">${t('center')}</Button>
  <Button variant="${variant}">${t('right')}</Button>
</ButtonGroup>`;

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
              name: 'Orientation',
              nameAr: 'الاتجاه',
              type: 'select',
              defaultValue: 'horizontal',
              options: [
                { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
                { value: 'vertical', label: 'Vertical', labelAr: 'عمودي' },
              ],
            },
            {
              name: 'Attached',
              nameAr: 'متصل',
              type: 'boolean',
              defaultValue: false,
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
              name: 'Gap',
              nameAr: 'الفجوة',
              type: 'select',
              defaultValue: 'md',
              options: [
                { value: 'none', label: 'None', labelAr: 'بدون' },
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
                { value: 'md', label: 'Medium', labelAr: 'متوسط' },
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
              ],
            },
          ]}
          controlValues={{ 
            Variant: variant,
            Orientation: orientation, 
            Attached: attached,
            Size: size,
            Gap: gap,
          }}
          onControlChange={(name, value) => {
            if (name === 'Variant') setVariant(value as typeof variant);
            if (name === 'Orientation') setOrientation(value as typeof orientation);
            if (name === 'Attached') setAttached(value as boolean);
            if (name === 'Size') setSize(value as typeof size);
            if (name === 'Gap') setGap(value as typeof gap);
          }}
        >
          <div className="flex justify-center">
            <ButtonGroup orientation={orientation} attached={attached} size={size} gap={gap}>
              <Button variant={variant}>{t('left')}</Button>
              <Button variant={variant}>{t('center')}</Button>
              <Button variant={variant}>{t('right')}</Button>
            </ButtonGroup>
          </div>
        </LivePlayground>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <ButtonGroup orientation="vertical" fullWidth>
              <Button variant="outline">{t('responsive.option')} 1</Button>
              <Button variant="outline">{t('responsive.option')} 2</Button>
              <Button variant="outline">{t('responsive.option')} 3</Button>
            </ButtonGroup>
          }
          tablet={
            <ButtonGroup attached size="md">
              <Button variant="outline">{t('responsive.day')}</Button>
              <Button variant="outline">{t('responsive.week')}</Button>
              <Button variant="outline">{t('responsive.month')}</Button>
              <Button variant="outline">{t('responsive.year')}</Button>
            </ButtonGroup>
          }
          desktop={
            <ButtonGroup size="lg" gap="md">
              <Button variant="tertiary">{t('responsive.saveDraft')}</Button>
              <Button variant="outline">{t('responsive.preview')}</Button>
              <Button variant="primary">{t('responsive.publish')}</Button>
            </ButtonGroup>
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

          {/* Primary Buttons in Group */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.primary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.primary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup size="sm">
                <Button variant="primary">{t('sizes.small')}</Button>
                <Button variant="primary">{t('sizes.small')}</Button>
              </ButtonGroup>
              <ButtonGroup size="md">
                <Button variant="primary">{t('sizes.medium')}</Button>
                <Button variant="primary">{t('sizes.medium')}</Button>
              </ButtonGroup>
              <ButtonGroup size="lg">
                <Button variant="primary">{t('sizes.large')}</Button>
                <Button variant="primary">{t('sizes.large')}</Button>
              </ButtonGroup>
              <ButtonGroup size="xl">
                <Button variant="primary">{t('sizes.xLarge')}</Button>
                <Button variant="primary">{t('sizes.xLarge')}</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Secondary Buttons in Group */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.secondary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.secondary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup size="sm">
                <Button variant="secondary">{t('sizes.small')}</Button>
                <Button variant="secondary">{t('sizes.small')}</Button>
              </ButtonGroup>
              <ButtonGroup size="md">
                <Button variant="secondary">{t('sizes.medium')}</Button>
                <Button variant="secondary">{t('sizes.medium')}</Button>
              </ButtonGroup>
              <ButtonGroup size="lg">
                <Button variant="secondary">{t('sizes.large')}</Button>
                <Button variant="secondary">{t('sizes.large')}</Button>
              </ButtonGroup>
              <ButtonGroup size="xl">
                <Button variant="secondary">{t('sizes.xLarge')}</Button>
                <Button variant="secondary">{t('sizes.xLarge')}</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Tertiary Buttons in Group */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.tertiary.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.tertiary.description')}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup size="sm">
                <Button variant="tertiary">{t('sizes.small')}</Button>
                <Button variant="tertiary">{t('sizes.small')}</Button>
              </ButtonGroup>
              <ButtonGroup size="md">
                <Button variant="tertiary">{t('sizes.medium')}</Button>
                <Button variant="tertiary">{t('sizes.medium')}</Button>
              </ButtonGroup>
              <ButtonGroup size="lg">
                <Button variant="tertiary">{t('sizes.large')}</Button>
                <Button variant="tertiary">{t('sizes.large')}</Button>
              </ButtonGroup>
              <ButtonGroup size="xl">
                <Button variant="tertiary">{t('sizes.xLarge')}</Button>
                <Button variant="tertiary">{t('sizes.xLarge')}</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Outline Buttons in Group */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('variants.outline.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('variants.outline.description')}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup size="sm">
                <Button variant="outline">{t('sizes.small')}</Button>
                <Button variant="outline">{t('sizes.small')}</Button>
              </ButtonGroup>
              <ButtonGroup size="md">
                <Button variant="outline">{t('sizes.medium')}</Button>
                <Button variant="outline">{t('sizes.medium')}</Button>
              </ButtonGroup>
              <ButtonGroup size="lg">
                <Button variant="outline">{t('sizes.large')}</Button>
                <Button variant="outline">{t('sizes.large')}</Button>
              </ButtonGroup>
              <ButtonGroup size="xl">
                <Button variant="outline">{t('sizes.xLarge')}</Button>
                <Button variant="outline">{t('sizes.xLarge')}</Button>
              </ButtonGroup>
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
            <div className="flex flex-wrap items-center gap-6">
              <ButtonGroup>
                <Button variant="outline">{t('variants.cancel')}</Button>
                <Button variant="primary" danger leftIcon={<Trash2 className="w-4 h-4" />}>{t('danger.delete')}</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">{t('variants.cancel')}</Button>
                <Button variant="secondary" danger leftIcon={<Trash2 className="w-4 h-4" />}>{t('danger.remove')}</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="tertiary" danger>{t('danger.cancel')}</Button>
                <Button variant="outline" danger>{t('danger.discard')}</Button>
              </ButtonGroup>
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

          {/* State Demonstration Table */}
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
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="primary">{t('states.button')}</Button>
                        <Button variant="primary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="primary" className="ring-2 ring-offset-2">{t('states.button')}</Button>
                        <Button variant="primary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="primary" disabled>{t('states.button')}</Button>
                        <Button variant="primary" disabled>{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4">
                      <ButtonGroup size="sm">
                        <Button variant="primary" loading>{t('states.button')}</Button>
                        <Button variant="primary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  {/* Secondary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.secondary.title')}</td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="secondary">{t('states.button')}</Button>
                        <Button variant="secondary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="secondary" className="ring-2 ring-offset-2">{t('states.button')}</Button>
                        <Button variant="secondary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="secondary" disabled>{t('states.button')}</Button>
                        <Button variant="secondary" disabled>{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4">
                      <ButtonGroup size="sm">
                        <Button variant="secondary" loading>{t('states.button')}</Button>
                        <Button variant="secondary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  {/* Tertiary Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.tertiary.title')}</td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="tertiary">{t('states.button')}</Button>
                        <Button variant="tertiary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="tertiary" className="ring-2 ring-offset-2">{t('states.button')}</Button>
                        <Button variant="tertiary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="tertiary" disabled>{t('states.button')}</Button>
                        <Button variant="tertiary" disabled>{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4">
                      <ButtonGroup size="sm">
                        <Button variant="tertiary" loading>{t('states.button')}</Button>
                        <Button variant="tertiary">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  {/* Outline Row */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('variants.outline.title')}</td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="outline">{t('states.button')}</Button>
                        <Button variant="outline">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <div className="text-xs text-neutral-500 italic">{t('states.hoverHint')}</div>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="outline" className="ring-2 ring-offset-2">{t('states.button')}</Button>
                        <Button variant="outline">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4 pe-6">
                      <ButtonGroup size="sm">
                        <Button variant="outline" disabled>{t('states.button')}</Button>
                        <Button variant="outline" disabled>{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
                    <td className="py-4">
                      <ButtonGroup size="sm">
                        <Button variant="outline" loading>{t('states.button')}</Button>
                        <Button variant="outline">{t('states.button')}</Button>
                      </ButtonGroup>
                    </td>
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

        {/* Orientation Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('orientation.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('orientation.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horizontal */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('orientation.horizontal')}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {t('orientation.horizontalDesc')}
              </p>
              <ButtonGroup orientation="horizontal">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>

            {/* Vertical */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('orientation.vertical')}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {t('orientation.verticalDesc')}
              </p>
              <ButtonGroup orientation="vertical">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Attached Style Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('attached.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('attached.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attached Horizontal */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('orientation.horizontal')} - {t('attached.title')}
              </h4>
              <ButtonGroup attached orientation="horizontal">
                <Button variant="outline">{t('responsive.day')}</Button>
                <Button variant="outline">{t('responsive.week')}</Button>
                <Button variant="outline">{t('responsive.month')}</Button>
                <Button variant="outline">{t('responsive.year')}</Button>
              </ButtonGroup>
            </div>

            {/* Attached Vertical */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('orientation.vertical')} - {t('attached.title')}
              </h4>
              <ButtonGroup attached orientation="vertical">
                <Button variant="outline">{t('responsive.option')} 1</Button>
                <Button variant="outline">{t('responsive.option')} 2</Button>
                <Button variant="outline">{t('responsive.option')} 3</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Gap Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('gap.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('gap.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('gap.none')}
              </h4>
              <ButtonGroup gap="none">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>

            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('gap.small')}
              </h4>
              <ButtonGroup gap="sm">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>

            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('gap.medium')}
              </h4>
              <ButtonGroup gap="md">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>

            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('gap.large')}
              </h4>
              <ButtonGroup gap="lg">
                <Button variant="outline">{t('left')}</Button>
                <Button variant="outline">{t('center')}</Button>
                <Button variant="outline">{t('right')}</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Common Examples */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('examples.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('examples.description')}
            </p>
          </div>

          <div className="card p-6 space-y-8">
            {/* Text Formatting */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('examples.textFormatting')}</p>
              <ButtonGroup attached size="sm">
                <Button variant="outline"><Bold className="w-4 h-4" /></Button>
                <Button variant="outline"><Italic className="w-4 h-4" /></Button>
                <Button variant="outline"><Underline className="w-4 h-4" /></Button>
              </ButtonGroup>
            </div>

            {/* Alignment */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('examples.alignment')}</p>
              <ButtonGroup attached size="sm">
                <Button variant="outline"><AlignLeft className="w-4 h-4" /></Button>
                <Button variant="outline"><AlignCenter className="w-4 h-4" /></Button>
                <Button variant="outline"><AlignRight className="w-4 h-4" /></Button>
              </ButtonGroup>
            </div>

            {/* View Options */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('examples.viewOptions')}</p>
              <ButtonGroup attached size="sm">
                <Button variant="outline"><List className="w-4 h-4" /></Button>
                <Button variant="outline"><Grid className="w-4 h-4" /></Button>
                <Button variant="outline"><LayoutList className="w-4 h-4" /></Button>
              </ButtonGroup>
            </div>

            {/* Mixed Variants */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('variants.mixed')}</p>
              <ButtonGroup>
                <Button variant="tertiary">{t('responsive.saveDraft')}</Button>
                <Button variant="secondary">{t('responsive.preview')}</Button>
                <Button variant="primary">{t('responsive.publish')}</Button>
              </ButtonGroup>
            </div>

            {/* With Icons */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('variants.withIcons')}</p>
              <ButtonGroup>
                <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>{t('variants.download')}</Button>
                <Button variant="outline" leftIcon={<Share2 className="w-4 h-4" />}>{t('variants.share')}</Button>
              </ButtonGroup>
            </div>

            {/* Confirm Dialog */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('variants.confirmDialog')}</p>
              <ButtonGroup>
                <Button variant="outline" leftIcon={<X className="w-4 h-4" />}>{t('variants.cancel')}</Button>
                <Button variant="primary" leftIcon={<Check className="w-4 h-4" />}>{t('variants.confirm')}</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* With Icon Buttons */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('withIconButtons.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('withIconButtons.description')}
            </p>
          </div>

          <div className="card p-6 space-y-6">
            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('withIconButtons.toolbar')}</p>
              <ButtonGroup attached>
                <IconButton icon={<Bold className="w-4 h-4" />} label="Bold" variant="outline" size="sm" />
                <IconButton icon={<Italic className="w-4 h-4" />} label="Italic" variant="outline" size="sm" />
                <IconButton icon={<Underline className="w-4 h-4" />} label="Underline" variant="outline" size="sm" />
              </ButtonGroup>
            </div>

            <div>
              <p className="text-sm text-neutral-500 mb-3">{t('withIconButtons.actions')}</p>
              <ButtonGroup>
                <IconButton icon={<Plus className="w-5 h-5" />} label="Add" variant="primary" />
                <IconButton icon={<Download className="w-5 h-5" />} label="Download" variant="outline" />
                <IconButton icon={<Share2 className="w-5 h-5" />} label="Share" variant="outline" />
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Group related actions together', textAr: 'اجمع الإجراءات المترابطة معًا' },
            { text: 'Use attached style for segmented controls', textAr: 'استخدم النمط المتصل لعناصر التحكم المجزأة' },
            { text: 'Use size prop to ensure consistent button sizes', textAr: 'استخدم خاصية الحجم لضمان أحجام أزرار متسقة' },
            { text: 'Use vertical orientation for mobile or sidebar', textAr: 'استخدم الاتجاه العمودي للجوال أو الشريط الجانبي' },
            { text: 'Place primary action last (rightmost/bottom)', textAr: 'ضع الإجراء الأساسي أخيراً (أقصى اليمين/الأسفل)' },
          ]}
          donts={[
            { text: "Don't group unrelated actions", textAr: 'لا تجمع الإجراءات غير المترابطة' },
            { text: "Don't mix too many variants in one group", textAr: 'لا تخلط الكثير من الأنماط في مجموعة واحدة' },
            { text: "Don't use too many buttons in a group (max 5)", textAr: 'لا تستخدم الكثير من الأزرار في مجموعة (الحد الأقصى 5)' },
            { text: "Don't mix button sizes manually - use size prop", textAr: 'لا تخلط أحجام الأزرار يدوياً - استخدم خاصية الحجم' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
