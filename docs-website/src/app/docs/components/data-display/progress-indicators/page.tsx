'use client';

import { LayoutGrid } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function ProgressIndicatorsPage() {
  const component = getComponentBySlug('data-display', 'progress-indicators');
  const { brandColors } = useBrand();
  if (!component) return null;

  const code = `import { Progress, CircularProgress } from '@singular/ui';

<Progress value={65} max={100} />
<CircularProgress value={75} />`;

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Data Display" categorySlug="data-display" icon={<LayoutGrid className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="space-y-8 max-w-md mx-auto">
            <div>
              <div className="flex justify-between text-sm mb-2"><span>Progress</span><span>65%</span></div>
              <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: '65%', backgroundColor: brandColors.primary }} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-neutral-200 dark:text-neutral-700" />
                  <circle cx="48" cy="48" r="40" stroke={brandColors.primary} strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${75 * 2.51} ${100 * 2.51}`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-semibold">75%</span>
              </div>
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full w-[65%] rounded-full" style={{ backgroundColor: brandColors.primary }} /></div>}
          tablet={<div><div className="flex justify-between text-sm mb-1"><span>Loading...</span><span>65%</span></div><div className="h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full w-[65%] rounded-full" style={{ backgroundColor: brandColors.primary }} /></div></div>}
          desktop={<div className="max-w-md"><div className="flex justify-between mb-2"><span>Upload Progress</span><span className="font-medium">65%</span></div><div className="h-3 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full w-[65%] rounded-full transition-all" style={{ backgroundColor: brandColors.primary }} /></div></div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Show percentage when possible', textAr: 'أظهر النسبة المئوية عند الإمكان' }, { text: 'Use appropriate indicator type', textAr: 'استخدم نوع المؤشر المناسب' }]}
          donts={[{ text: "Don't use for indeterminate loading", textAr: 'لا تستخدم للتحميل غير المحدد' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

