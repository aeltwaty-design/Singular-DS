'use client';

import { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useLocale } from 'next-intl';

export interface GuidelineItem {
  text: string;
  textAr?: string;
}

export interface UsageGuidelinesProps {
  dos: GuidelineItem[];
  donts: GuidelineItem[];
  title?: string;
  titleAr?: string;
}

export function UsageGuidelines({
  dos,
  donts,
  title = 'Usage Guidelines',
  titleAr = 'إرشادات الاستخدام',
}: UsageGuidelinesProps) {
  const locale = useLocale();
  const { brandColors } = useBrand();

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          {locale === 'ar' ? titleAr : title}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 rtl:divide-x-reverse">
        {/* Do's */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-sm font-medium text-green-700 dark:text-green-400">
              {locale === 'ar' ? 'افعل' : 'Do'}
            </h4>
          </div>
          <ul className="space-y-3">
            {dos.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{locale === 'ar' && item.textAr ? item.textAr : item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="text-sm font-medium text-red-700 dark:text-red-400">
              {locale === 'ar' ? 'لا تفعل' : "Don't"}
            </h4>
          </div>
          <ul className="space-y-3">
            {donts.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{locale === 'ar' && item.textAr ? item.textAr : item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UsageGuidelines;

