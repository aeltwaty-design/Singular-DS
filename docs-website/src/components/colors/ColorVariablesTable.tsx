'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ColorVariable } from '@/data/colorVariables';

interface ColorVariablesTableProps {
  variables: ColorVariable[];
  brandPrimary: Record<string, string>;
  brandSecondary: Record<string, string>;
  grayLight: Record<string, string>;
  grayDark: Record<string, string>;
  statusColors: {
    error: Record<string, string>;
    warning: Record<string, string>;
    success: Record<string, string>;
    info: Record<string, string>;
  };
  translations: {
    name: string;
    lightMode: string;
    darkMode: string;
    usage: string;
  };
}

// Helper function to get hex color from reference
function getColorHex(
  colorRef: string,
  brandPrimary: Record<string, string>,
  brandSecondary: Record<string, string>,
  grayLight: Record<string, string>,
  grayDark: Record<string, string>,
  statusColors: {
    error: Record<string, string>;
    warning: Record<string, string>;
    success: Record<string, string>;
    info: Record<string, string>;
  },
  isDarkMode: boolean = false
): string {
  if (colorRef === 'white') return '#FFFFFF';
  if (colorRef === 'black') return '#000000';
  if (colorRef === 'transparent') return 'transparent';
  
  // Handle direct hex values (e.g., "#00000014" for alpha colors)
  if (colorRef.startsWith('#')) return colorRef;

  const parts = colorRef.split('-');
  if (parts.length < 2) return '#000000';

  const colorType = parts[0];
  const shade = parts[1];

  switch (colorType) {
    case 'gray':
      return isDarkMode ? (grayDark[shade] || '#000000') : (grayLight[shade] || '#000000');
    case 'primary':
      return brandPrimary[shade] || '#000000';
    case 'secondary':
      return brandSecondary[shade] || '#000000';
    case 'error':
      return statusColors.error[shade] || '#000000';
    case 'warning':
      return statusColors.warning[shade] || '#000000';
    case 'success':
      return statusColors.success[shade] || '#000000';
    case 'info':
      return statusColors.info[shade] || '#000000';
    default:
      return '#000000';
  }
}

function ColorChip({
  colorRef,
  hexColor,
}: {
  colorRef: string;
  hexColor: string;
}) {
  const isTransparent = hexColor === 'transparent';
  
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'w-5 h-5 rounded border border-neutral-200 dark:border-neutral-700 flex-shrink-0',
          isTransparent && 'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%23ccc%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%23ccc%22%2F%3E%3C%2Fsvg%3E")]'
        )}
        style={{ backgroundColor: isTransparent ? undefined : hexColor }}
      />
      <span className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">
        {colorRef}
      </span>
    </div>
  );
}

export function ColorVariablesTable({
  variables,
  brandPrimary,
  brandSecondary,
  grayLight,
  grayDark,
  statusColors,
  translations,
}: ColorVariablesTableProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const processedVariables = useMemo(() => {
    return variables.map((variable) => ({
      ...variable,
      lightHex: getColorHex(
        variable.lightValue,
        brandPrimary,
        brandSecondary,
        grayLight,
        grayDark,
        statusColors,
        false
      ),
      darkHex: getColorHex(
        variable.darkValue,
        brandPrimary,
        brandSecondary,
        grayLight,
        grayDark,
        statusColors,
        true
      ),
    }));
  }, [variables, brandPrimary, brandSecondary, grayLight, grayDark, statusColors]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            <th className={cn(
              'py-3 font-medium text-neutral-500 dark:text-neutral-400',
              isRTL ? 'text-right pr-0 pl-4' : 'text-left pl-0 pr-4'
            )}>
              {translations.name}
            </th>
            <th className={cn(
              'py-3 font-medium text-neutral-500 dark:text-neutral-400',
              isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'
            )}>
              {translations.lightMode}
            </th>
            <th className={cn(
              'py-3 font-medium text-neutral-500 dark:text-neutral-400',
              isRTL ? 'text-right pr-4 pl-4' : 'text-left pl-4 pr-4'
            )}>
              {translations.darkMode}
            </th>
            <th className={cn(
              'py-3 font-medium text-neutral-500 dark:text-neutral-400',
              isRTL ? 'text-right pr-4 pl-0' : 'text-left pl-4 pr-0'
            )}>
              {translations.usage}
            </th>
          </tr>
        </thead>
        <tbody>
          {processedVariables.map((variable) => (
            <tr
              key={variable.name}
              className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td className={cn(
                'py-4',
                isRTL ? 'pr-0 pl-4' : 'pl-0 pr-4'
              )}>
                <div className="flex items-center gap-3">
                  {/* Preview swatches for light and dark */}
                  <div className="flex -space-x-1">
                    <span
                      className="w-5 h-5 rounded-l border border-neutral-200 dark:border-neutral-700"
                      style={{ backgroundColor: variable.lightHex }}
                      title="Light mode"
                    />
                    <span
                      className="w-5 h-5 rounded-r border border-neutral-200 dark:border-neutral-700"
                      style={{ backgroundColor: variable.darkHex }}
                      title="Dark mode"
                    />
                  </div>
                  <span className="font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                    {variable.name}
                  </span>
                </div>
              </td>
              <td className={cn(
                'py-4',
                isRTL ? 'pr-4 pl-4' : 'pl-4 pr-4'
              )}>
                <ColorChip colorRef={variable.lightValue} hexColor={variable.lightHex} />
              </td>
              <td className={cn(
                'py-4',
                isRTL ? 'pr-4 pl-4' : 'pl-4 pr-4'
              )}>
                <ColorChip colorRef={variable.darkValue} hexColor={variable.darkHex} />
              </td>
              <td className={cn(
                'py-4 text-neutral-600 dark:text-neutral-400 max-w-md',
                isRTL ? 'pr-4 pl-0' : 'pl-4 pr-0'
              )}>
                {isRTL ? variable.usageAr : variable.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

