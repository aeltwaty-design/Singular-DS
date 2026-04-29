'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { ImageContainer, type ImageContainerType, type ImageContainerTextPosition } from '@/components/ui/data-display';
import { Gallery, Image as ImageIcon, Shop, Gift, Wallet2, ShoppingCart, Coffee } from 'iconsax-react';

export default function ImageContainerPage() {
  const component = getComponentBySlug('data-display', 'image-container');
  if (!component) return null;

  // Playground state
  const [type, setType] = useState<ImageContainerType>('secondary');
  const [textPosition, setTextPosition] = useState<ImageContainerTextPosition>('in');
  const [showText, setShowText] = useState(true);

  const code = `import { ImageContainer } from '@singular/ui';

// Basic usage
<ImageContainer
  type="${type}"
  textPosition="${textPosition}"
  showText={${showText}}
  label="Category"
  src="/image.jpg"
/>

// Type variants
<ImageContainer type="primary" label="Primary" />   // White bg with border
<ImageContainer type="secondary" label="Secondary" /> // Neutral bg

// Text position variants
<ImageContainer textPosition="in" label="Text Inside" />  // Text below image inside container
<ImageContainer textPosition="out" label="Text Outside" /> // Text below container`;

  const controls = [
    {
      name: 'type',
      nameAr: 'النوع',
      type: 'select' as const,
      options: [
        { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
        { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
      ],
      defaultValue: 'secondary',
    },
    {
      name: 'textPosition',
      nameAr: 'موضع النص',
      type: 'select' as const,
      options: [
        { value: 'in', label: 'Inside', labelAr: 'داخل' },
        { value: 'out', label: 'Outside', labelAr: 'خارج' },
      ],
      defaultValue: 'in',
    },
    {
      name: 'showText',
      nameAr: 'إظهار النص',
      type: 'boolean' as const,
      defaultValue: true,
    },
  ];

  const controlValues = {
    type,
    textPosition,
    showText,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'type':
        setType(value as ImageContainerType);
        break;
      case 'textPosition':
        setTextPosition(value as ImageContainerTextPosition);
        break;
      case 'showText':
        setShowText(value as boolean);
        break;
    }
  };

  // Sample placeholder images
  const sampleImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';

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
          <div className="flex items-end justify-center gap-8 p-8">
            <ImageContainer
              type={type}
              textPosition={textPosition}
              showText={showText}
              label="Category"
            />
            <ImageContainer
              type={type}
              textPosition={textPosition}
              showText={showText}
              label="Category"
              src={sampleImage}
            />
          </div>
        </LivePlayground>

        {/* Type Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Type Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Primary type has a white background with subtle border, Secondary has a neutral gray background.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-8 justify-center items-end">
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="primary" textPosition="in" label="Primary" />
                <span className="text-xs text-neutral-500">Primary (In)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="in" label="Secondary" />
                <span className="text-xs text-neutral-500">Secondary (In)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="primary" textPosition="out" label="Primary" />
                <span className="text-xs text-neutral-500">Primary (Out)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="out" label="Secondary" />
                <span className="text-xs text-neutral-500">Secondary (Out)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Text Position Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Text Position Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Text can be placed inside the container (below a 2:1 ratio image) or outside (below a square padded image).
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="in" label="Text Inside" src={sampleImage} />
                <span className="text-xs text-neutral-500">In (2:1)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="out" label="Text Outside" src={sampleImage} />
                <span className="text-xs text-neutral-500">Out (Square)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="primary" textPosition="in" label="Text Inside" src={sampleImage} />
                <span className="text-xs text-neutral-500">Primary In</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="primary" textPosition="out" label="Text Outside" src={sampleImage} />
                <span className="text-xs text-neutral-500">Primary Out</span>
              </div>
            </div>
          </div>
        </section>

        {/* With/Without Text */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            With / Without Text
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The text label can be shown or hidden based on the showText prop.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-8 justify-center items-start">
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="in" label="With Text" showText={true} />
                <span className="text-xs text-neutral-500">showText: true</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="in" label="No Text" showText={false} />
                <span className="text-xs text-neutral-500">showText: false</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="out" label="With Text" showText={true} />
                <span className="text-xs text-neutral-500">Out: showText true</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <ImageContainer type="secondary" textPosition="out" label="No Text" showText={false} />
                <span className="text-xs text-neutral-500">Out: showText false</span>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for image containers in app interfaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Grid */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Category Grid</h3>
              <div className="grid grid-cols-4 gap-3">
                {['Food', 'Drinks', 'Dessert', 'Snacks'].map((cat) => (
                  <ImageContainer
                    key={cat}
                    type="secondary"
                    textPosition="in"
                    label={cat}
                    width="auto"
                  />
                ))}
              </div>
            </div>

            {/* Product Cards */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Product Tiles</h3>
              <div className="flex gap-3 flex-wrap">
                {['Pizza', 'Burger', 'Sushi', 'Salad'].map((item) => (
                  <ImageContainer
                    key={item}
                    type="primary"
                    textPosition="out"
                    label={item}
                    width={90}
                  />
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Service Categories</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[
                  { label: 'Restaurants', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=100&fit=crop' },
                  { label: 'Groceries', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=100&fit=crop' },
                  { label: 'Pharmacy', img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=100&fit=crop' },
                  { label: 'Gifts', img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=100&fit=crop' },
                ].map(({ label, img }) => (
                  <ImageContainer
                    key={label}
                    type="secondary"
                    textPosition="in"
                    label={label}
                    src={img}
                    width={100}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-2">
                {['Order', 'Track', 'History', 'Help'].map((action) => (
                  <ImageContainer
                    key={action}
                    type="primary"
                    textPosition="in"
                    label={action}
                    width="auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex gap-2 overflow-x-auto">
              {['Cat 1', 'Cat 2', 'Cat 3'].map((cat) => (
                <ImageContainer
                  key={cat}
                  type="secondary"
                  textPosition="in"
                  label={cat}
                  width={80}
                />
              ))}
            </div>
          }
          tablet={
            <div className="flex gap-3">
              {['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((cat) => (
                <ImageContainer
                  key={cat}
                  type="secondary"
                  textPosition="in"
                  label={cat}
                  width={100}
                />
              ))}
            </div>
          }
          desktop={
            <div className="flex gap-4">
              {['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'].map((cat) => (
                <ImageContainer
                  key={cat}
                  type="primary"
                  textPosition="out"
                  label={cat}
                  width={120}
                />
              ))}
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use Secondary type for neutral category grids', textAr: 'استخدم النوع الثانوي لشبكات الفئات المحايدة' },
            { text: 'Use Primary type when you need visual separation from background', textAr: 'استخدم النوع الأساسي عند الحاجة لفصل بصري عن الخلفية' },
            { text: 'Use text position "in" for compact layouts', textAr: 'استخدم موضع النص "داخل" للتخطيطات المدمجة' },
            { text: 'Use text position "out" for larger, more prominent cards', textAr: 'استخدم موضع النص "خارج" للبطاقات الأكبر والأبرز' },
            { text: 'Provide meaningful alt text for images', textAr: 'وفر نص بديل ذو معنى للصور' },
          ]}
          donts={[
            { text: "Don't use overly long labels that wrap", textAr: 'لا تستخدم تسميات طويلة جداً تلتف' },
            { text: "Don't mix type variants inconsistently in the same grid", textAr: 'لا تخلط أنواع المتغيرات بشكل غير متسق في نفس الشبكة' },
            { text: "Don't use without images in production (placeholder is for dev only)", textAr: 'لا تستخدم بدون صور في الإنتاج (العنصر النائب للتطوير فقط)' },
            { text: "Don't stretch images beyond their natural aspect ratio", textAr: 'لا تمدد الصور أبعد من نسبة أبعادها الطبيعية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
