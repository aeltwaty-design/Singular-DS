'use client';

import { useBrand } from '@/components/providers/Providers';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
  descriptionAr?: string;
}

export interface PropsTableProps {
  props: PropDefinition[];
  title?: string;
  titleAr?: string;
}

export function PropsTable({ props, title = 'Props', titleAr = 'الخصائص' }: PropsTableProps) {
  const locale = useLocale();
  const { brandColors } = useBrand();

  const headers = {
    name: locale === 'ar' ? 'الاسم' : 'Name',
    type: locale === 'ar' ? 'النوع' : 'Type',
    default: locale === 'ar' ? 'الافتراضي' : 'Default',
    description: locale === 'ar' ? 'الوصف' : 'Description',
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          {locale === 'ar' ? titleAr : title}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left rtl:text-right font-medium text-neutral-600 dark:text-neutral-400">
                {headers.name}
              </th>
              <th className="px-4 py-3 text-left rtl:text-right font-medium text-neutral-600 dark:text-neutral-400">
                {headers.type}
              </th>
              <th className="px-4 py-3 text-left rtl:text-right font-medium text-neutral-600 dark:text-neutral-400">
                {headers.default}
              </th>
              <th className="px-4 py-3 text-left rtl:text-right font-medium text-neutral-600 dark:text-neutral-400">
                {headers.description}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code
                      className="text-sm font-mono px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${brandColors.primary}15`,
                        color: brandColors.primary,
                      }}
                    >
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span className="text-xs text-red-500 font-medium">*</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {prop.defaultValue ? (
                    <code className="text-xs font-mono text-neutral-500 dark:text-neutral-500">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                  {locale === 'ar' && prop.descriptionAr ? prop.descriptionAr : prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {props.some((p) => p.required) && (
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500">
            <span className="text-red-500">*</span>{' '}
            {locale === 'ar' ? 'مطلوب' : 'Required'}
          </p>
        </div>
      )}
    </div>
  );
}

export default PropsTable;

