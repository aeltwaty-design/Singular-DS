'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { Separator, type SeparatorOrientation, type SeparatorSize } from '@/components/ui/data-display';
import { getComponentBySlug } from '@/data/components';

export default function SeparatorPage() {
  const component = getComponentBySlug('data-display', 'separator');
  if (!component) return null;

  // Playground state
  const [orientation, setOrientation] = useState<SeparatorOrientation>('horizontal');
  const [size, setSize] = useState<SeparatorSize>('sm');

  const code = `import { Separator } from '@singular/ui';

// Basic usage
<Separator orientation="${orientation}" size="${size}" />

// Horizontal separators
<Separator />                           // Default: horizontal, sm
<Separator size="lg" />                  // Thick horizontal line

// Vertical separators
<Separator orientation="vertical" />     // Thin vertical line
<Separator orientation="vertical" size="lg" /> // Thick vertical line`;

  const controls = [
    {
      name: 'orientation',
      nameAr: 'الاتجاه',
      type: 'select' as const,
      options: [
        { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
        { value: 'vertical', label: 'Vertical', labelAr: 'عمودي' },
      ],
      defaultValue: 'horizontal',
    },
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select' as const,
      options: [
        { value: 'sm', label: 'Small (1px)', labelAr: 'صغير (1px)' },
        { value: 'lg', label: 'Large (4px)', labelAr: 'كبير (4px)' },
      ],
      defaultValue: 'sm',
    },
  ];

  const controlValues = {
    orientation,
    size,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'orientation':
        setOrientation(value as SeparatorOrientation);
        break;
      case 'size':
        setSize(value as SeparatorSize);
        break;
    }
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Display"
      categorySlug="data-display"
      icon={<LayoutGrid className="w-6 h-6" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="flex items-center justify-center p-8">
            {orientation === 'horizontal' ? (
              <div className="w-full max-w-md">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Content Above</p>
                <Separator orientation={orientation} size={size} />
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Content Below</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 h-12">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Left</span>
                <Separator orientation={orientation} size={size} />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Right</span>
              </div>
            )}
          </div>
        </LivePlayground>

        {/* Size Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Size Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Separators come in two thickness options: small (1px) for subtle dividers and large (4px) for more prominent section breaks.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Horizontal sizes */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Horizontal</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-neutral-500 mb-2 block">Small (1px)</span>
                    <Separator orientation="horizontal" size="sm" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 mb-2 block">Large (4px)</span>
                    <Separator orientation="horizontal" size="lg" />
                  </div>
                </div>
              </div>
              
              {/* Vertical sizes */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Vertical</h3>
                <div className="flex items-center gap-8 h-16">
                  <div className="flex flex-col items-center gap-2 h-full">
                    <span className="text-xs text-neutral-500">Small</span>
                    <Separator orientation="vertical" size="sm" className="flex-1" />
                  </div>
                  <div className="flex flex-col items-center gap-2 h-full">
                    <span className="text-xs text-neutral-500">Large</span>
                    <Separator orientation="vertical" size="lg" className="flex-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for separators in app interfaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* List Dividers */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">List Dividers</h3>
              <div className="space-y-0">
                {['Settings', 'Privacy', 'Notifications', 'Help'].map((item, i, arr) => (
                  <div key={item}>
                    <div className="py-3 text-sm text-neutral-700 dark:text-neutral-300">{item}</div>
                    {i < arr.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>

            {/* Section Breaks */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Section Breaks</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Section One</h4>
                  <p className="text-xs text-neutral-500">Content for section one</p>
                </div>
                <Separator size="lg" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Section Two</h4>
                  <p className="text-xs text-neutral-500">Content for section two</p>
                </div>
              </div>
            </div>

            {/* Toolbar Separator */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Toolbar Separator</h3>
              <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Bold</button>
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Italic</button>
                <Separator orientation="vertical" className="h-5" />
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Left</button>
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Center</button>
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Right</button>
                <Separator orientation="vertical" className="h-5" />
                <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">Link</button>
              </div>
            </div>

            {/* Breadcrumb Separator */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Navigation Items</h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Home</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Products</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Electronics</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm font-medium text-neutral-900 dark:text-white">Phones</span>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="space-y-2">
              <p className="text-sm">Above</p>
              <Separator />
              <p className="text-sm">Below</p>
            </div>
          }
          tablet={
            <div className="space-y-3">
              <p>Content above</p>
              <Separator size="lg" />
              <p>Content below</p>
            </div>
          }
          desktop={
            <div className="flex items-center gap-6">
              <span>Left</span>
              <Separator orientation="vertical" className="h-6" />
              <span>Center</span>
              <Separator orientation="vertical" size="lg" className="h-6" />
              <span>Right</span>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use small size for subtle list dividers', textAr: 'استخدم الحجم الصغير لفواصل القوائم الخفيفة' },
            { text: 'Use large size for prominent section breaks', textAr: 'استخدم الحجم الكبير للفواصل البارزة بين الأقسام' },
            { text: 'Use vertical separators to divide toolbar groups', textAr: 'استخدم الفواصل العمودية لتقسيم مجموعات شريط الأدوات' },
            { text: 'Maintain consistent spacing around separators', textAr: 'حافظ على مسافات متسقة حول الفواصل' },
          ]}
          donts={[
            { text: "Don't overuse separators - use whitespace instead when possible", textAr: 'لا تفرط في استخدام الفواصل - استخدم المساحات البيضاء بدلاً منها عند الإمكان' },
            { text: "Don't use separators between every list item if there's enough spacing", textAr: 'لا تستخدم الفواصل بين كل عنصر في القائمة إذا كانت المسافات كافية' },
            { text: "Don't mix separator sizes inconsistently", textAr: 'لا تخلط بين أحجام الفواصل بشكل غير متسق' },
            { text: "Don't use colored separators unless required for branding", textAr: 'لا تستخدم فواصل ملونة إلا إذا كانت مطلوبة للعلامة التجارية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
