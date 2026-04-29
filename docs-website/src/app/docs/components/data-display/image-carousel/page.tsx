'use client';

import { useState } from 'react';
import { Image, Gallery } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { ImageCarousel } from '@/components/ui';
import type { ImageCarouselSize, ImageCarouselStyle, ImageCarouselIndicatorType } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

// Sample images for the carousel - using picsum for reliable loading
const sampleImages = [
  'https://picsum.photos/seed/carousel1/800/400',
  'https://picsum.photos/seed/carousel2/800/400',
  'https://picsum.photos/seed/carousel3/800/400',
  'https://picsum.photos/seed/carousel4/800/400',
];

const productImages = [
  'https://picsum.photos/seed/product1/600/300',
  'https://picsum.photos/seed/product2/600/300',
  'https://picsum.photos/seed/product3/600/300',
];

export default function ImageCarouselPage() {
  const component = getComponentBySlug('data-display', 'image-carousel');
  if (!component) return null;

  // Playground state
  const [size, setSize] = useState<ImageCarouselSize>('lg');
  const [style, setStyle] = useState<ImageCarouselStyle>('light');
  const [indicatorType, setIndicatorType] = useState<ImageCarouselIndicatorType>('dot');
  const [showIndicator, setShowIndicator] = useState(true);
  const [showIndicatorBg, setShowIndicatorBg] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const controlValues = {
    'Size': size,
    'Style': style,
    'Indicator Type': indicatorType,
    'Show Indicator': showIndicator,
    'Show Indicator BG': showIndicatorBg,
    'Show Arrows': showArrows,
    'Auto Play': autoPlay,
  };

  const handleControlChange = (name: string, value: unknown) => {
    switch (name) {
      case 'Size':
        setSize(value as ImageCarouselSize);
        break;
      case 'Style':
        setStyle(value as ImageCarouselStyle);
        break;
      case 'Indicator Type':
        setIndicatorType(value as ImageCarouselIndicatorType);
        break;
      case 'Show Indicator':
        setShowIndicator(value as boolean);
        break;
      case 'Show Indicator BG':
        setShowIndicatorBg(value as boolean);
        break;
      case 'Show Arrows':
        setShowArrows(value as boolean);
        break;
      case 'Auto Play':
        setAutoPlay(value as boolean);
        break;
    }
  };

  const controls: PlaygroundControl[] = [
    {
      name: 'Size',
      type: 'select',
      defaultValue: 'lg',
      options: [
        { label: 'Large', value: 'lg' },
        { label: 'Small', value: 'sm' },
      ],
    },
    {
      name: 'Style',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Primary', value: 'primary' },
        { label: 'Primary Light', value: 'primaryLight' },
      ],
    },
    {
      name: 'Indicator Type',
      type: 'select',
      defaultValue: 'dot',
      options: [
        { label: 'Dot', value: 'dot' },
        { label: 'Dash', value: 'dash' },
        { label: 'Dash Progress', value: 'dash-progress' },
      ],
    },
    {
      name: 'Show Indicator',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Indicator BG',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Arrows',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Auto Play',
      type: 'boolean',
      defaultValue: false,
    },
  ];

  const code = `import { ImageCarousel } from '@singular/ui';

<ImageCarousel
  images={[
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
  ]}
  size="${size}"
  style="${style}"
  indicatorType="${indicatorType}"
  showIndicator={${showIndicator}}
  showIndicatorBg={${showIndicatorBg}}
  showArrows={${showArrows}}
  autoPlay={${autoPlay}}
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Display"
      categorySlug="data-display"
      icon={<Gallery className="w-6 h-6" variant="Bold" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <ImageCarousel
            images={sampleImages}
            size={size}
            style={style}
            indicatorType={indicatorType}
            showIndicator={showIndicator}
            showIndicatorBg={showIndicatorBg}
            showArrows={showArrows}
            autoPlay={autoPlay}
            autoPlayInterval={3000}
          />
        </LivePlayground>

        {/* Style Variants Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              Style Variants
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Four distinct style options to match your design context.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Light Style */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Light
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="sm"
                style="light"
                indicatorType="dot"
              />
            </div>

            {/* Dark Style */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Dark
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="sm"
                style="dark"
                indicatorType="dot"
              />
            </div>

            {/* Primary Style */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Primary
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="sm"
                style="primary"
                indicatorType="dot"
              />
            </div>

            {/* Primary Light Style */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Primary Light
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="sm"
                style="primaryLight"
                indicatorType="dot"
              />
            </div>
          </div>
        </section>

        {/* Indicator Types Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              Indicator Types
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Choose from three indicator styles to show navigation progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dot Indicator */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Dot
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 4)}
                size="sm"
                style="light"
                indicatorType="dot"
                showArrows={false}
              />
            </div>

            {/* Dash Indicator */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Dash
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 4)}
                size="sm"
                style="light"
                indicatorType="dash"
                showArrows={false}
              />
            </div>

            {/* Dash Progress Indicator */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Dash Progress (Auto-play)
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 4)}
                size="sm"
                style="light"
                indicatorType="dash-progress"
                showArrows={false}
                autoPlay
                autoPlayInterval={3000}
              />
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              Size Variants
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Two size options for different layout requirements.
            </p>
          </div>

          <div className="space-y-8">
            {/* Large Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Large (800px max-width)
              </h3>
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="lg"
                style="primary"
                indicatorType="dash"
              />
            </div>

            {/* Small Size */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Small (600px max-width)
              </h3>
              <ImageCarousel
                images={productImages}
                size="sm"
                style="primaryLight"
                indicatorType="dot"
              />
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex justify-center">
              <ImageCarousel
                images={productImages}
                size="sm"
                style="light"
                indicatorType="dot"
                showArrows={false}
                className="max-w-full"
              />
            </div>
          }
          tablet={
            <div className="flex justify-center">
              <ImageCarousel
                images={sampleImages.slice(0, 3)}
                size="sm"
                style="primary"
                indicatorType="dash"
              />
            </div>
          }
          desktop={
            <div className="flex justify-center">
              <ImageCarousel
                images={sampleImages}
                size="lg"
                style="primaryLight"
                indicatorType="dot"
              />
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Show clear navigation indicators', textAr: 'أظهر مؤشرات التنقل بوضوح' },
            { text: 'Support swipe gestures on touch devices', textAr: 'ادعم إيماءات السحب على الأجهزة اللمسية' },
            { text: 'Provide keyboard navigation support', textAr: 'وفر دعم التنقل بلوحة المفاتيح' },
            { text: 'Use consistent image aspect ratios', textAr: 'استخدم نسب أبعاد متسقة للصور' },
            { text: 'Pause auto-play on user interaction', textAr: 'أوقف التشغيل التلقائي عند تفاعل المستخدم' },
          ]}
          donts={[
            { text: "Don't auto-play without user control to pause", textAr: 'لا تشغل تلقائيًا بدون تحكم المستخدم للإيقاف' },
            { text: "Don't use too many slides (keep it under 10)", textAr: 'لا تستخدم عددًا كبيرًا من الشرائح (أقل من 10)' },
            { text: "Don't hide navigation completely on important content", textAr: 'لا تخفِ التنقل تمامًا على المحتوى المهم' },
            { text: "Don't use very fast auto-play intervals", textAr: 'لا تستخدم فترات تشغيل تلقائي سريعة جدًا' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
