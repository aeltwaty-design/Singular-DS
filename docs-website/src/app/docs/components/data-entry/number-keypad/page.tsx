'use client';

import { FormInput, Delete } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function NumberKeypadPage() {
  const component = getComponentBySlug('data-entry', 'number-keypad');
  const { brandColors } = useBrand();

  if (!component) return null;

  const code = `import { NumberKeypad } from '@singular/ui';

<NumberKeypad
  onInput={(value) => console.log(value)}
  onDelete={() => console.log('delete')}
/>`;

  const KeypadButton = ({ children, wide }: { children: React.ReactNode; wide?: boolean }) => (
    <button className={`${wide ? 'col-span-2' : ''} h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-semibold text-lg transition-colors`}>
      {children}
    </button>
  );

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Entry"
      categorySlug="data-entry"
      icon={<FormInput className="w-6 h-6" />}
    >
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="w-full max-w-xs mx-auto">
            <div className="text-center mb-6">
              <p className="text-3xl font-mono font-semibold tracking-widest">1234</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <KeypadButton key={num}>{num}</KeypadButton>
              ))}
              <KeypadButton>.</KeypadButton>
              <KeypadButton>0</KeypadButton>
              <KeypadButton><Delete className="w-5 h-5 mx-auto" /></KeypadButton>
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={
            <div className="max-w-[200px] mx-auto">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((key) => (
                  <button key={key} className="h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-semibold">
                    {key}
                  </button>
                ))}
              </div>
            </div>
          }
          tablet={
            <div className="max-w-[280px] mx-auto">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((key) => (
                  <button key={key} className="h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-semibold text-lg">
                    {key}
                  </button>
                ))}
              </div>
            </div>
          }
          desktop={
            <p className="text-center text-neutral-500 py-8">Number keypads are typically used on touch devices</p>
          }
        />

        <UsageGuidelines
          dos={[
            { text: 'Use for PIN/OTP entry', textAr: 'استخدم لإدخال الرمز السري/رمز التحقق' },
            { text: 'Make buttons large enough to tap', textAr: 'اجعل الأزرار كبيرة بما يكفي للنقر' },
            { text: 'Provide visual feedback on tap', textAr: 'وفر تغذية بصرية عند النقر' },
          ]}
          donts={[
            { text: "Don't use for general number input on desktop", textAr: 'لا تستخدم للإدخال الرقمي العام على سطح المكتب' },
            { text: "Don't make buttons too small", textAr: 'لا تجعل الأزرار صغيرة جدًا' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

