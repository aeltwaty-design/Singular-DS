'use client';

import { MessageCircle } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { LoadingSpinner } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function LoadingSpinnerPage() {
  const component = getComponentBySlug('feedback', 'loading-spinner');
  if (!component) return null;

  const code = `import { LoadingSpinner } from '@singular/ui';

<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />`;

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Feedback" categorySlug="feedback" icon={<MessageCircle className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="flex items-center justify-center gap-8">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="flex justify-center"><LoadingSpinner size="sm" /></div>}
          tablet={<div className="flex justify-center"><LoadingSpinner size="md" /></div>}
          desktop={<div className="flex items-center justify-center gap-3"><LoadingSpinner size="md" /><span className="text-neutral-500">Loading content...</span></div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Show for indeterminate loading', textAr: 'أظهر للتحميل غير المحدد' }, { text: 'Include loading text when possible', textAr: 'أضف نص التحميل عند الإمكان' }]}
          donts={[{ text: "Don't use for known progress (use progress bar)", textAr: 'لا تستخدم للتقدم المعروف (استخدم شريط التقدم)' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

