'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sun, Moon, RotateCcw, Code } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { cn, copyToClipboard } from '@/lib/utils';

export interface PlaygroundControl {
  name: string;
  nameAr?: string;
  type: 'select' | 'boolean' | 'text' | 'number' | 'color';
  options?: { value: string; label: string; labelAr?: string }[];
  defaultValue: string | boolean | number;
}

export interface LivePlaygroundProps {
  children: ReactNode;
  code: string;
  /** Array of control definitions for standard controls */
  controls?: PlaygroundControl[];
  /** Custom JSX controls to render in the options panel */
  customControls?: ReactNode;
  onControlChange?: (name: string, value: string | boolean | number) => void;
  controlValues?: Record<string, string | boolean | number>;
}

export function LivePlayground({
  children,
  code,
  controls = [],
  customControls,
  onControlChange,
  controlValues = {},
}: LivePlaygroundProps) {
  const locale = useLocale();
  const { brandColors } = useBrand();
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    controls.forEach((control) => {
      onControlChange?.(control.name, control.defaultValue);
    });
  };

  return (
    <div suppressHydrationWarning className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Preview Area */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 p-8 min-h-[200px] flex items-center justify-center">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(${brandColors.primary} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Component Preview */}
        <div className="relative z-10">{children}</div>

        {/* Theme Toggle */}
        <div className="absolute top-4 end-4 flex gap-2">
          <button
            suppressHydrationWarning
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Controls */}
      {(controls.length > 0 || customControls) && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3">
          {/* Custom Controls */}
          {customControls && (
            <div className="mb-0">
              {customControls}
            </div>
          )}

          {/* Standard Controls */}
          {controls.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                  {locale === 'ar' ? 'الخيارات' : 'Options'}
                </h4>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{locale === 'ar' ? 'إعادة تعيين' : 'Reset'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
                {controls.map((control) => (
                  <div key={control.name} className={control.type === 'boolean' ? 'min-w-[70px]' : 'min-w-[140px]'}>
                    <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                      {locale === 'ar' && control.nameAr ? control.nameAr : control.name}
                    </label>

                    {control.type === 'select' && (
                      <select
                        value={String(controlValues[control.name] ?? control.defaultValue)}
                        onChange={(e) => onControlChange?.(control.name, e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                      >
                        {control.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {locale === 'ar' && option.labelAr ? option.labelAr : option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {control.type === 'boolean' && (
                      <div className="flex items-center h-[30px]">
                        <button
                          onClick={() =>
                            onControlChange?.(
                              control.name,
                              !(controlValues[control.name] ?? control.defaultValue)
                            )
                          }
                          className={cn(
                            'relative w-11 h-6 rounded-full transition-colors shrink-0',
                            !(controlValues[control.name] ?? control.defaultValue) && 'bg-neutral-300 dark:bg-neutral-600'
                          )}
                          style={{
                            backgroundColor: (controlValues[control.name] ?? control.defaultValue) 
                              ? brandColors.primary 
                              : undefined
                          }}
                        >
                          <span
                            className={cn(
                              'absolute top-1 start-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform',
                              (controlValues[control.name] ?? control.defaultValue) && 'ltr:translate-x-5 rtl:-translate-x-5'
                            )}
                          />
                        </button>
                      </div>
                    )}

                    {control.type === 'text' && (
                      <input
                        type="text"
                        value={String(controlValues[control.name] ?? control.defaultValue)}
                        onChange={(e) => onControlChange?.(control.name, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                      />
                    )}

                    {control.type === 'number' && (
                      <input
                        type="number"
                        value={Number(controlValues[control.name] ?? control.defaultValue)}
                        onChange={(e) => onControlChange?.(control.name, Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Code Section */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Code className="w-4 h-4" />
            <span>{locale === 'ar' ? 'عرض الكود' : 'View Code'}</span>
          </div>
          <motion.span
            animate={{ rotate: showCode ? 180 : 0 }}
            className="text-neutral-500"
          >
            ▼
          </motion.span>
        </button>

        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative"
          >
            <div className="absolute top-2 end-2 z-10">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span>{locale === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{locale === 'ar' ? 'نسخ' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-neutral-950 text-neutral-300 text-sm font-mono overflow-x-auto">
              <code>{code}</code>
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LivePlayground;

