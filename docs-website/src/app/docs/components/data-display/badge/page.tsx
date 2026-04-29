'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { Badge } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { Notification, Message, ShoppingBag, Heart as HeartIcon, Setting2 } from 'iconsax-react';

export default function BadgePage() {
  const component = getComponentBySlug('data-display', 'badge');
  if (!component) return null;

  // Playground state
  const [size, setSize] = useState<'sm' | 'lg'>('lg');
  const [color, setColor] = useState<'red' | 'green' | 'blue' | 'blue-light' | 'grey'>('red');
  const [value, setValue] = useState<number>(99);
  const [forceSingleDigit, setForceSingleDigit] = useState(false);

  const code = `import { Badge } from '@singular/ui';

// Basic usage
<Badge 
  value={${value}} 
  size="${size}" 
  color="${color}"${forceSingleDigit ? '\n  singleDigit={true}' : ''} 
/>

// With different colors
<Badge value={5} color="red" />     // Danger/Error
<Badge value={5} color="green" />   // Success
<Badge value={5} color="blue" />    // Brand Primary
<Badge value={5} color="blue-light" /> // Brand Light
<Badge value={5} color="grey" />    // Neutral`;

  const controls = [
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select' as const,
      options: [
        { value: 'sm', label: 'Small (16px)', labelAr: 'صغير (16px)' },
        { value: 'lg', label: 'Large (auto)', labelAr: 'كبير (تلقائي)' },
      ],
      defaultValue: 'lg',
    },
    {
      name: 'color',
      nameAr: 'اللون',
      type: 'select' as const,
      options: [
        { value: 'red', label: 'Red (Danger)', labelAr: 'أحمر (خطر)' },
        { value: 'green', label: 'Green (Success)', labelAr: 'أخضر (نجاح)' },
        { value: 'blue', label: 'Blue (Brand)', labelAr: 'أزرق (العلامة)' },
        { value: 'blue-light', label: 'Blue Light', labelAr: 'أزرق فاتح' },
        { value: 'grey', label: 'Grey (Neutral)', labelAr: 'رمادي (محايد)' },
      ],
      defaultValue: 'red',
    },
    {
      name: 'value',
      nameAr: 'القيمة',
      type: 'number' as const,
      defaultValue: 99,
    },
    {
      name: 'singleDigit',
      nameAr: 'حشو مفرد',
      type: 'boolean' as const,
      defaultValue: false,
    },
  ];

  const controlValues = {
    size,
    color,
    value,
    singleDigit: forceSingleDigit,
  };

  const handleControlChange = (name: string, val: string | boolean | number) => {
    switch (name) {
      case 'size':
        setSize(val as 'sm' | 'lg');
        break;
      case 'color':
        setColor(val as typeof color);
        break;
      case 'value':
        setValue(val as number);
        break;
      case 'singleDigit':
        setForceSingleDigit(val as boolean);
        break;
    }
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Display"
      categorySlug="data-display"
      icon={<LayoutGrid className="w-6 h-6" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="flex items-center justify-center gap-8 p-8">
            <Badge 
              size={size} 
              color={color} 
              value={value}
              singleDigit={forceSingleDigit ? true : undefined}
            />
          </div>
        </LivePlayground>

        {/* Color Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Color Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Badge colors for different semantic purposes. Blue uses the brand primary color.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap items-center gap-8 justify-center">
              <div className="flex flex-col items-center gap-2">
                <Badge color="red" value={5} />
                <span className="text-xs text-neutral-500">Red</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge color="green" value={5} />
                <span className="text-xs text-neutral-500">Green</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge color="blue" value={5} />
                <span className="text-xs text-neutral-500">Blue</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge color="blue-light" value={5} />
                <span className="text-xs text-neutral-500">Blue Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge color="grey" value={5} />
                <span className="text-xs text-neutral-500">Grey</span>
              </div>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Size Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Small (16px height) for compact UIs, Large for standard use.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap items-center gap-12 justify-center">
              <div className="flex flex-col items-center gap-2">
                <Badge size="sm" color="red" value={5} />
                <span className="text-xs text-neutral-500">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge size="lg" color="red" value={5} />
                <span className="text-xs text-neutral-500">Large</span>
              </div>
            </div>
          </div>
        </section>

        {/* Single vs Multi-digit */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Single vs Multi-digit
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Padding automatically adjusts based on content length. Single-digit values get tighter padding.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-8 justify-center items-center">
              {[1, 5, 12, 99, 100].map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <Badge color="red" value={num} />
                  <span className="text-xs text-neutral-500">{num}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for badges in app interfaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Badges */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Icon Badges</h3>
              <div className="flex justify-around">
                {[
                  { icon: Notification, label: 'Alerts', badge: 3, color: 'red' as const },
                  { icon: Message, label: 'Messages', badge: 12, color: 'blue' as const },
                  { icon: ShoppingBag, label: 'Cart', badge: 5, color: 'green' as const },
                  { icon: HeartIcon, label: 'Wishlist', badge: 8, color: 'grey' as const },
                ].map(({ icon: Icon, label, badge, color }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                        <Icon size={24} className="text-neutral-500 dark:text-neutral-400" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Badge size="sm" color={color} value={badge} />
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Badges */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Navigation Badges</h3>
              <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl">
                <div className="flex justify-around items-center">
                  {[
                    { icon: Notification, label: 'Alerts', badge: 5 },
                    { icon: Message, label: 'Messages', badge: 23 },
                    { icon: ShoppingBag, label: 'Orders', badge: 0 },
                    { icon: Setting2, label: 'Settings', badge: 1 },
                  ].map(({ icon: Icon, label, badge }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <Icon size={24} className="text-neutral-500 dark:text-neutral-400" />
                        {badge > 0 && (
                          <div className="absolute -top-1.5 -right-1.5">
                            <Badge size="sm" color="red" value={badge} />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All Colors */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Color Scale</h3>
              <div className="flex gap-3 flex-wrap justify-center">
                {(['red', 'green', 'blue', 'blue-light', 'grey'] as const).map((c) => (
                  <Badge key={c} color={c} value={99} size="lg" />
                ))}
              </div>
            </div>

            {/* Size Comparison */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Size Scale</h3>
              <div className="flex items-center gap-6 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Badge size="sm" color="red" value={5} />
                  <span className="text-xs text-neutral-500">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge size="lg" color="red" value={5} />
                  <span className="text-xs text-neutral-500">Large</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge size="sm" color="red" value={99} />
                  <span className="text-xs text-neutral-500">Small (multi)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge size="lg" color="red" value={99} />
                  <span className="text-xs text-neutral-500">Large (multi)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex items-center gap-3">
              <Badge size="sm" color="red" value={3} />
              <span className="text-sm">Mobile compact badges</span>
            </div>
          }
          tablet={
            <div className="flex items-center gap-3">
              <Badge size="lg" color="blue" value={12} />
              <span className="text-sm">Tablet standard badges</span>
            </div>
          }
          desktop={
            <div className="flex items-center gap-3">
              <Badge size="lg" color="green" value={99} />
              <span className="text-sm">Desktop standard badges</span>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use small size for compact navigation elements', textAr: 'استخدم الحجم الصغير لعناصر التنقل المدمجة' },
            { text: 'Use red for notifications or errors that need attention', textAr: 'استخدم اللون الأحمر للإشعارات أو الأخطاء التي تحتاج انتباه' },
            { text: 'Use green for success or completed counts', textAr: 'استخدم اللون الأخضر للنجاح أو العدادات المكتملة' },
            { text: 'Use blue (brand) for general informational counts', textAr: 'استخدم الأزرق (العلامة التجارية) للعدادات المعلوماتية العامة' },
            { text: 'Keep values short (ideally under 99)', textAr: 'اجعل القيم قصيرة (مثالياً أقل من 99)' },
          ]}
          donts={[
            { text: "Don't use badges for long text content", textAr: 'لا تستخدم الشارات للنصوص الطويلة' },
            { text: "Don't place multiple badges next to each other", textAr: 'لا تضع شارات متعددة بجانب بعضها' },
            { text: "Don't use badges without clear context", textAr: 'لا تستخدم الشارات بدون سياق واضح' },
            { text: "Don't mix badge colors arbitrarily", textAr: 'لا تخلط ألوان الشارات عشوائياً' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
