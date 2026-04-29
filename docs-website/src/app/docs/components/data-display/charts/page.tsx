'use client';

import { LayoutGrid } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function ChartsPage() {
  const component = getComponentBySlug('data-display', 'charts');
  const { brandColors } = useBrand();
  if (!component) return null;

  const code = `import { BarChart, LineChart, PieChart } from '@singular/ui';

<BarChart data={data} />
<LineChart data={data} />`;

  const bars = [40, 65, 45, 80, 55, 70, 60];

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Data Display" categorySlug="data-display" icon={<LayoutGrid className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="max-w-lg mx-auto">
            <p className="text-sm font-medium mb-4">Weekly Activity</p>
            <div className="flex items-end justify-between gap-2 h-32">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${h}%`, backgroundColor: brandColors.primary }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="h-24 flex items-end gap-1">{bars.slice(0, 5).map((h, i) => <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: brandColors.primary }} />)}</div>}
          tablet={<div className="h-32 flex items-end gap-2">{bars.map((h, i) => <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%`, backgroundColor: brandColors.primary }} />)}</div>}
          desktop={<div className="h-40 flex items-end gap-3">{bars.map((h, i) => <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%`, backgroundColor: brandColors.primary }} />)}</div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Use appropriate chart types', textAr: 'استخدم أنواع الرسوم البيانية المناسبة' }, { text: 'Include legends and labels', textAr: 'أضف الأساطير والتسميات' }]}
          donts={[{ text: "Don't use 3D effects", textAr: 'لا تستخدم تأثيرات ثلاثية الأبعاد' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

