'use client';

import { useState } from 'react';
import { Setting4 } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { Slider } from '@/components/ui';
import type { SliderTrackStyle, SliderThumbType } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function SliderPage() {
  const component = getComponentBySlug('data-entry', 'slider');
  const { brandColors } = useBrand();
  
  // Playground state
  const [trackStyle, setTrackStyle] = useState<SliderTrackStyle>('default');
  const [thumbType, setThumbType] = useState<SliderThumbType>('primary');
  const [showTooltip, setShowTooltip] = useState(true);
  const [showSteps, setShowSteps] = useState(false);
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showMinMax, setShowMinMax] = useState(true);
  
  // Slider values
  const [singleValue, setSingleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState({ start: 25, end: 75 });

  if (!component) return null;

  const code = `import { Slider } from '@singular/ui';

<Slider
  min={0}
  max={100}
  step={1}
  ${isRangeMode ? `defaultRangeValue={{ start: 25, end: 75 }}` : `defaultValue={50}`}
  trackStyle="${trackStyle}"
  thumbType="${thumbType}"
  showTooltip={${showTooltip}}
  showSteps={${showSteps}}
  showMinMax={${showMinMax}}
  disabled={${isDisabled}}
  ${isRangeMode ? `onRangeChange={(range) => console.log(range)}` : `onChange={(value) => console.log(value)}`}
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Entry"
      categorySlug="data-entry"
      icon={<Setting4 className="w-6 h-6" variant="Bold" />}
    >
      <div className="space-y-12">
        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Track Style */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Track Style
                </label>
                <select
                  value={trackStyle}
                  onChange={(e) => setTrackStyle(e.target.value as SliderTrackStyle)}
                  className="w-full px-2 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="default">Default</option>
                  <option value="dotted">Dotted</option>
                  <option value="dashed">Dashed</option>
                </select>
              </div>
              
              {/* Thumb Type */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Thumb Type
                </label>
                <select
                  value={thumbType}
                  onChange={(e) => setThumbType(e.target.value as SliderThumbType)}
                  className="w-full px-2 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="primary">Primary</option>
                  <option value="white">White</option>
                </select>
              </div>
              
              {/* Range Mode Toggle */}
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Mode
                </label>
                <select
                  value={isRangeMode ? 'range' : 'single'}
                  onChange={(e) => setIsRangeMode(e.target.value === 'range')}
                  className="w-full px-2 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="single">Single</option>
                  <option value="range">Range</option>
                </select>
              </div>
              
              {/* Show Tooltip */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTooltip}
                  onChange={(e) => setShowTooltip(e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-600"
                  style={{ accentColor: brandColors.primary }}
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Show Tooltip</span>
              </label>
              
              {/* Show Steps */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSteps}
                  onChange={(e) => setShowSteps(e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-600"
                  style={{ accentColor: brandColors.primary }}
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Show Steps</span>
              </label>
              
              {/* Show Min/Max */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMinMax}
                  onChange={(e) => setShowMinMax(e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-600"
                  style={{ accentColor: brandColors.primary }}
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Min/Max Labels</span>
              </label>
              
              {/* Disabled */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-600"
                  style={{ accentColor: brandColors.primary }}
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Disabled</span>
              </label>
            </div>
          }
        >
          <div className="w-full max-w-md mx-auto py-4">
            {isRangeMode ? (
              <Slider
                min={0}
                max={100}
                step={10}
                rangeValue={rangeValue}
                onRangeChange={setRangeValue}
                trackStyle={trackStyle}
                thumbType={thumbType}
                showTooltip={showTooltip}
                showSteps={showSteps}
                showMinMax={showMinMax}
                disabled={isDisabled}
                label="Price Range"
                formatValue={(v) => `$${v}`}
              />
            ) : (
              <Slider
                min={0}
                max={100}
                step={10}
                value={singleValue}
                onChange={setSingleValue}
                trackStyle={trackStyle}
                thumbType={thumbType}
                showTooltip={showTooltip}
                showSteps={showSteps}
                showMinMax={showMinMax}
                disabled={isDisabled}
                label="Volume"
                formatValue={(v) => `${v}%`}
              />
            )}
          </div>
        </LivePlayground>

        {/* Track Styles Section */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Track Styles
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The Slider supports three track styles: Default (solid), Dotted (with dot markers), and Dashed (with tick marks).
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Default</span>
              <Slider
                defaultValue={50}
                min={0}
                max={100}
                step={10}
                trackStyle="default"
                showMinMax
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Dotted</span>
              <Slider
                defaultValue={50}
                min={0}
                max={100}
                step={10}
                trackStyle="dotted"
                showMinMax
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Dashed</span>
              <Slider
                defaultValue={50}
                min={0}
                max={100}
                step={10}
                trackStyle="dashed"
                showMinMax
              />
            </div>
          </div>
        </section>

        {/* Thumb Types Section */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Thumb Types
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Choose between Primary (filled with brand color) or White (outlined) thumb styles.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Primary Thumb</span>
              <Slider
                defaultValue={60}
                min={0}
                max={100}
                thumbType="primary"
                showMinMax
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">White Thumb</span>
              <Slider
                defaultValue={60}
                min={0}
                max={100}
                thumbType="white"
                showMinMax
              />
            </div>
          </div>
        </section>

        {/* Range Selection Section */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Range Selection
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use range mode to allow users to select a value range with two thumbs.
          </p>
          <div className="max-w-md space-y-6">
            <Slider
              defaultRangeValue={{ start: 200, end: 800 }}
              min={0}
              max={1000}
              step={50}
              label="Price Range"
              formatValue={(v) => `$${v}`}
              showMinMax
            />
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="space-y-4 p-4">
              <Slider
                defaultValue={75}
                min={0}
                max={100}
                label="Brightness"
                formatValue={(v) => `${v}%`}
                showMinMax
              />
            </div>
          }
          tablet={
            <div className="space-y-4 p-6">
              <Slider
                defaultValue={50}
                min={0}
                max={100}
                step={10}
                trackStyle="dotted"
                label="Volume"
                formatValue={(v) => `${v}%`}
                showMinMax
              />
            </div>
          }
          desktop={
            <div className="space-y-6 p-8">
              <div className="grid grid-cols-2 gap-8">
                <Slider
                  defaultValue={40}
                  min={0}
                  max={100}
                  trackStyle="default"
                  thumbType="primary"
                  label="Opacity"
                  formatValue={(v) => `${v}%`}
                  showMinMax
                />
                <Slider
                  defaultRangeValue={{ start: 25, end: 75 }}
                  min={0}
                  max={100}
                  trackStyle="dashed"
                  thumbType="white"
                  label="Selection Range"
                  showMinMax
                />
              </div>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Show the current value in a tooltip or label', textAr: 'أظهر القيمة الحالية في التلميح أو التسمية' },
            { text: 'Use for continuous value ranges', textAr: 'استخدم للنطاقات المستمرة' },
            { text: 'Show min/max labels for context', textAr: 'أظهر تسميات الحد الأدنى/الأقصى للسياق' },
            { text: 'Use step markers for discrete value selection', textAr: 'استخدم علامات الخطوات لاختيار القيم المنفصلة' },
            { text: 'Use range mode for filtering by value ranges', textAr: 'استخدم وضع النطاق للتصفية حسب نطاقات القيم' },
          ]}
          donts={[
            { text: "Don't use for precise numeric input (use Input Field)", textAr: 'لا تستخدم للإدخال الرقمي الدقيق (استخدم حقل الإدخال)' },
            { text: "Don't make the slider track too short", textAr: 'لا تجعل مسار المنزلق قصيرًا جدًا' },
            { text: "Don't use without visible feedback of current value", textAr: 'لا تستخدم بدون تغذية راجعة مرئية للقيمة الحالية' },
            { text: "Don't hide the thumb behind other elements", textAr: 'لا تخفِ المقبض خلف عناصر أخرى' },
          ]}
        />

        {/* API Reference */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            API Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-medium text-neutral-900 dark:text-neutral-100">Prop</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-900 dark:text-neutral-100">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-900 dark:text-neutral-100">Default</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-900 dark:text-neutral-100">Description</th>
                </tr>
              </thead>
              <tbody className="text-neutral-600 dark:text-neutral-400">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">value</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Controlled value (single mode)</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">rangeValue</td>
                  <td className="py-3 px-4 font-mono text-xs">{`{ start, end }`}</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Controlled range values (range mode)</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">min</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">Minimum value</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">max</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4">100</td>
                  <td className="py-3 px-4">Maximum value</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">step</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Step increment</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">trackStyle</td>
                  <td className="py-3 px-4 font-mono text-xs">{`'default' | 'dotted' | 'dashed'`}</td>
                  <td className="py-3 px-4">'default'</td>
                  <td className="py-3 px-4">Track visual style</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">thumbType</td>
                  <td className="py-3 px-4 font-mono text-xs">{`'primary' | 'white'`}</td>
                  <td className="py-3 px-4">'primary'</td>
                  <td className="py-3 px-4">Thumb visual type</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">showTooltip</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4">true</td>
                  <td className="py-3 px-4">Show value tooltip on hover/drag</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">showSteps</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Show step markers on track</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">disabled</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Disabled state</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">label</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Label text above slider</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">showMinMax</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">Show min/max labels below track</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs">formatValue</td>
                  <td className="py-3 px-4 font-mono text-xs">{`(v: number) => string`}</td>
                  <td className="py-3 px-4">String(v)</td>
                  <td className="py-3 px-4">Format value for display</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ComponentDocTemplate>
  );
}
