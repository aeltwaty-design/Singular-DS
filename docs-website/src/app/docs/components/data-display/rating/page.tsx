'use client';

import { LayoutGrid, Star } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';

export default function RatingPage() {
  const component = getComponentBySlug('data-display', 'rating');
  if (!component) return null;

  const code = `import { Rating } from '@singular/ui';

<Rating value={4} max={5} />
<Rating value={3.5} max={5} readonly />`;

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <Star className={`w-5 h-5 ${filled ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />
  );

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Data Display" categorySlug="data-display" icon={<LayoutGrid className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="space-y-4 text-center">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= 4} />)}
            </div>
            <p className="text-sm text-neutral-500">4.0 out of 5 stars</p>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />)}</div>}
          tablet={<div className="flex gap-1 items-center">{[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />)}<span className="ml-2 text-sm">4.0</span></div>}
          desktop={<div className="flex gap-1 items-center">{[1,2,3,4,5].map(i => <Star key={i} className={`w-6 h-6 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />)}<span className="ml-3">4.0 out of 5 stars (128 reviews)</span></div>}
        />

        <UsageGuidelines
          dos={[{ text: 'Show numerical value alongside', textAr: 'أظهر القيمة الرقمية بجانبها' }]}
          donts={[{ text: "Don't use more than 5 stars", textAr: 'لا تستخدم أكثر من 5 نجوم' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

