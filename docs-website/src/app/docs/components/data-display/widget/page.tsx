'use client';

import { LayoutGrid, Calendar, Clock, MapPin } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function WidgetPage() {
  const component = getComponentBySlug('data-display', 'widget');
  const { brandColors } = useBrand();
  if (!component) return null;

  const code = `import { Widget } from '@singular/ui';

<Widget title="Upcoming Event">
  <EventDetails />
</Widget>`;

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Data Display" categorySlug="data-display" icon={<LayoutGrid className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="max-w-sm mx-auto bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
            <h3 className="font-semibold mb-4">Upcoming Event</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${brandColors.primary}20` }}><Calendar className="w-5 h-5" style={{ color: brandColors.primary }} /></div><div><p className="text-sm font-medium">Team Meeting</p><p className="text-xs text-neutral-500">Tomorrow, 10:00 AM</p></div></div>
              <div className="flex items-center gap-2 text-sm text-neutral-500"><Clock className="w-4 h-4" /> 1 hour</div>
              <div className="flex items-center gap-2 text-sm text-neutral-500"><MapPin className="w-4 h-4" /> Conference Room A</div>
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl"><p className="font-medium text-sm">Widget</p><p className="text-xs text-neutral-500">Compact mobile view</p></div>}
          tablet={<div className="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-xl"><p className="font-semibold">Widget Title</p><p className="text-sm text-neutral-500 mt-1">Widget content for tablet</p></div>}
          desktop={<div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"><p className="font-semibold text-lg">Widget Title</p><p className="text-neutral-500 mt-2">Expanded widget content for desktop with more details</p></div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Keep widgets focused on single purpose', textAr: 'اجعل الودجات مركزة على غرض واحد' }]}
          donts={[{ text: "Don't overload with information", textAr: 'لا تحمل بمعلومات زائدة' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

