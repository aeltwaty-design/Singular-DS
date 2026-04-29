'use client';

import { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  UsageGuidelines,
} from '@/components/docs/components';
import { Dock, Button } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

// Simple grid icon component matching Figma placeholder
const GridIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

export default function DockPage() {
  const t = useTranslations('dockPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const component = getComponentBySlug('call-to-actions', 'dock');
  const [type, setType] = useState<'one' | 'two'>('two');
  const [container, setContainer] = useState(true);
  const [showSeparator, setShowSeparator] = useState(true);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('vertical');

  if (!component) return null;

  // Button text matching Figma
  const buttonText = isRTL ? 'يكتب هنا نص' : 'Text Here';

  const code = `import { Dock, Button } from '@singular/ui';

<Dock
  type="${type}"
  container={${container}}
  showSeparator={${showSeparator}}
  orientation="${orientation}"
>
  <Button 
    variant="primary" 
    fullWidth
    leftIcon={<GridIcon />}
    rightIcon={<GridIcon />}
  >
    ${buttonText}
  </Button>
  ${type === 'two' ? `<Button 
    variant="tertiary" 
    fullWidth
    leftIcon={<GridIcon />}
    rightIcon={<GridIcon />}
  >
    ${buttonText}
  </Button>` : ''}
</Dock>`;

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
              name: 'Type',
              nameAr: 'النوع',
              type: 'select',
              defaultValue: 'two',
              options: [
                { value: 'one', label: 'One Button', labelAr: 'زر واحد' },
                { value: 'two', label: 'Two Buttons', labelAr: 'زران' },
              ],
            },
            {
              name: 'Container',
              nameAr: 'الحاوية',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'Show Separator',
              nameAr: 'إظهار الفاصل',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'Orientation',
              nameAr: 'الاتجاه',
              type: 'select',
              defaultValue: 'vertical',
              options: [
                { value: 'vertical', label: 'Vertical', labelAr: 'عمودي' },
                { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
              ],
            },
          ]}
          controlValues={{ 
            Type: type,
            Container: container,
            'Show Separator': showSeparator,
            Orientation: orientation,
          }}
          onControlChange={(name, value) => {
            if (name === 'Type') setType(value as typeof type);
            if (name === 'Container') setContainer(value as boolean);
            if (name === 'Show Separator') setShowSeparator(value as boolean);
            if (name === 'Orientation') setOrientation(value as typeof orientation);
          }}
        >
          <Dock
            type={type}
            container={container}
            showSeparator={showSeparator}
            orientation={orientation}
          >
            <Button 
              variant="primary" 
              fullWidth
              leftIcon={<GridIcon className="w-5 h-5" />}
              rightIcon={<GridIcon className="w-5 h-5" />}
            >
              {buttonText}
            </Button>
            {type === 'two' && (
              <Button 
                variant="tertiary" 
                fullWidth
                leftIcon={<GridIcon className="w-5 h-5" />}
                rightIcon={<GridIcon className="w-5 h-5" />}
              >
                {buttonText}
              </Button>
            )}
          </Dock>
        </LivePlayground>

        {/* All Variants - Matching Figma Layout */}
        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('variants.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('variants.description')}
            </p>
          </div>

          {/* One Button Variants */}
          <div className="space-y-6">
            <h4 className="text-md font-medium text-neutral-800 dark:text-neutral-200">
              {t('variants.oneButton')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. One Button + Container + Separator + Vertical */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withContainer')} + {t('variants.vertical')}
                </p>
                <div className="flex justify-center">
                  <Dock type="one" container={true} showSeparator={true} orientation="vertical">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 2. One Button + Container + Separator + Horizontal */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withContainer')} + {t('variants.horizontal')}
                </p>
                <div className="flex justify-center">
                  <Dock type="one" container={true} showSeparator={true} orientation="horizontal">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 3. One Button + No Container + Vertical */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withoutContainer')} + {t('variants.vertical')}
                </p>
                <div className="flex justify-center">
                  <Dock type="one" container={false} showSeparator={false} orientation="vertical">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 4. One Button + No Container + Horizontal */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withoutContainer')} + {t('variants.horizontal')}
                </p>
                <div className="flex justify-center">
                  <Dock type="one" container={false} showSeparator={false} orientation="horizontal">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>
            </div>
          </div>

          {/* Two Buttons Variants */}
          <div className="space-y-6">
            <h4 className="text-md font-medium text-neutral-800 dark:text-neutral-200">
              {t('variants.twoButtons')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 5. Two Buttons + Container + Separator + Vertical */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withContainer')} + {t('variants.vertical')}
                </p>
                <div className="flex justify-center">
                  <Dock type="two" container={true} showSeparator={true} orientation="vertical">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                    <Button variant="tertiary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 6. Two Buttons + Container + Separator + Horizontal */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withContainer')} + {t('variants.horizontal')}
                </p>
                <div className="flex justify-center">
                  <Dock type="two" container={true} showSeparator={true} orientation="horizontal">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                    <Button variant="tertiary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 7. Two Buttons + No Container + Vertical */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withoutContainer')} + {t('variants.vertical')}
                </p>
                <div className="flex justify-center">
                  <Dock type="two" container={false} showSeparator={false} orientation="vertical">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                    <Button variant="tertiary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>

              {/* 8. Two Buttons + No Container + Horizontal */}
              <div className="card p-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 text-center">
                  {t('variants.withoutContainer')} + {t('variants.horizontal')}
                </p>
                <div className="flex justify-center">
                  <Dock type="two" container={false} showSeparator={false} orientation="horizontal">
                    <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                    <Button variant="tertiary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                      {buttonText}
                    </Button>
                  </Dock>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Separator Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('variants.separator')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {isRTL 
                ? 'خط الفاصل يظهر في أعلى الشريط عندما تكون الحاوية والفاصل مفعلين.'
                : 'The separator line appears at the top of the dock when both container and showSeparator are enabled.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* With Separator */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('variants.withSeparator')}
              </h4>
              <div className="flex justify-center">
                <Dock type="one" container={true} showSeparator={true} orientation="vertical">
                  <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                    {buttonText}
                  </Button>
                </Dock>
              </div>
            </div>

            {/* Without Separator */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
                {t('variants.withoutSeparator')}
              </h4>
              <div className="flex justify-center">
                <Dock type="one" container={true} showSeparator={false} orientation="vertical">
                  <Button variant="primary" fullWidth leftIcon={<GridIcon className="w-5 h-5" />} rightIcon={<GridIcon className="w-5 h-5" />}>
                    {buttonText}
                  </Button>
                </Dock>
              </div>
            </div>
          </div>
        </section>

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use for primary actions fixed at screen bottom', textAr: 'استخدم للإجراءات الأساسية الثابتة في أسفل الشاشة' },
            { text: 'Use one button for single primary action', textAr: 'استخدم زر واحد لإجراء أساسي واحد' },
            { text: 'Use two buttons when you need primary and secondary actions', textAr: 'استخدم زرين عندما تحتاج إجراءات أساسية وثانوية' },
            { text: 'Use container for visual separation from content', textAr: 'استخدم الحاوية للفصل البصري عن المحتوى' },
            { text: 'Use separator to distinguish dock from page content', textAr: 'استخدم الفاصل للتمييز بين الشريط ومحتوى الصفحة' },
          ]}
          donts={[
            { text: "Don't use on desktop as primary navigation", textAr: 'لا تستخدم على سطح المكتب كتنقل أساسي' },
            { text: "Don't use more than two buttons in a dock", textAr: 'لا تستخدم أكثر من زرين في الشريط' },
            { text: "Don't hide critical actions in a dock", textAr: 'لا تخف الإجراءات الهامة في شريط الإرساء' },
            { text: "Don't use separator without container", textAr: 'لا تستخدم الفاصل بدون حاوية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
