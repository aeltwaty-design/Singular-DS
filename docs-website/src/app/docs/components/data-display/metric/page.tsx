'use client';

import { LayoutGrid, TrendingUp, TrendingDown } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';

export default function MetricPage() {
  const component = getComponentBySlug('data-display', 'metric');
  if (!component) return null;

  const code = `import { Metric } from '@singular/ui';

<Metric
  label="Revenue"
  value="$12,450"
  trend={{ value: 12.5, direction: 'up' }}
/>`;

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Data Display" categorySlug="data-display" icon={<LayoutGrid className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold">$12,450</p>
              <p className="text-sm text-green-500 flex items-center gap-1 mt-1"><TrendingUp className="w-4 h-4" /> +12.5%</p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 mb-1">Users</p>
              <p className="text-2xl font-bold">8,234</p>
              <p className="text-sm text-green-500 flex items-center gap-1 mt-1"><TrendingUp className="w-4 h-4" /> +5.2%</p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 mb-1">Bounce Rate</p>
              <p className="text-2xl font-bold">24.5%</p>
              <p className="text-sm text-red-500 flex items-center gap-1 mt-1"><TrendingDown className="w-4 h-4" /> -2.1%</p>
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg"><p className="text-xs text-neutral-500">Revenue</p><p className="text-xl font-bold">$12K</p></div>}
          tablet={<div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg"><p className="text-sm text-neutral-500 mb-1">Revenue</p><p className="text-2xl font-bold">$12,450</p><p className="text-sm text-green-500">+12.5%</p></div>}
          desktop={<div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl"><p className="text-sm text-neutral-500 mb-2">Total Revenue</p><p className="text-3xl font-bold">$12,450.00</p><p className="text-sm text-green-500 flex items-center gap-1 mt-2"><TrendingUp className="w-4 h-4" /> +12.5% from last month</p></div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Show trend indicators', textAr: 'أظهر مؤشرات الاتجاه' }, { text: 'Use clear labels', textAr: 'استخدم تسميات واضحة' }]}
          donts={[{ text: "Don't show too many metrics at once", textAr: 'لا تظهر الكثير من المقاييس مرة واحدة' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

