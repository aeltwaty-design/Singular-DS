'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { 
  InfoCircle, 
  Danger, 
  Warning2, 
  TickCircle, 
  Setting2, 
  Star1, 
  Heart, 
  Notification, 
  Home2,
  Gift,
  Wallet2,
  ShoppingCart,
  User
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';
import { IconContainer, type IconContainerStatus, type IconContainerSize, type IconContainerShape } from '@/components/ui/data-display';

export default function IconContainerPage() {
  const component = getComponentBySlug('data-display', 'icon-container');
  const { brandColors } = useBrand();
  
  // Playground state
  const [size, setSize] = useState<IconContainerSize>('md');
  const [status, setStatus] = useState<IconContainerStatus>('info');
  const [shape, setShape] = useState<IconContainerShape>('square');
  const [showLabel, setShowLabel] = useState(true);

  if (!component) return null;

  const code = `import { IconContainer } from '@singular/ui';
import { Star1 } from 'iconsax-react';

// Basic usage
<IconContainer icon={<Star1 variant="Bold" />} />

// With status variants
<IconContainer icon={<TickCircle />} status="success" />
<IconContainer icon={<Danger />} status="danger" />
<IconContainer icon={<Warning2 />} status="warning" />

// Different sizes
<IconContainer icon={<Star1 />} size="xs" />
<IconContainer icon={<Star1 />} size="sm" />
<IconContainer icon={<Star1 />} size="md" />
<IconContainer icon={<Star1 />} size="lg" />
<IconContainer icon={<Star1 />} size="xl" />
<IconContainer icon={<Star1 />} size="2xl" />

// With labels
<IconContainer icon={<Star1 />} label="Favorites" />

// Circle shape
<IconContainer icon={<Star1 />} shape="circle" />`;

  const controls = [
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select' as const,
      options: [
        { value: 'xs', label: 'Extra Small', labelAr: 'صغير جداً' },
        { value: 'sm', label: 'Small', labelAr: 'صغير' },
        { value: 'md', label: 'Medium', labelAr: 'متوسط' },
        { value: 'lg', label: 'Large', labelAr: 'كبير' },
        { value: 'xl', label: 'Extra Large', labelAr: 'كبير جداً' },
        { value: '2xl', label: '2X Large', labelAr: 'ضخم' },
      ],
      defaultValue: 'md',
    },
    {
      name: 'status',
      nameAr: 'الحالة',
      type: 'select' as const,
      options: [
        { value: 'info', label: 'Info', labelAr: 'معلومات' },
        { value: 'gray', label: 'Gray', labelAr: 'رمادي' },
        { value: 'success', label: 'Success', labelAr: 'نجاح' },
        { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
        { value: 'danger', label: 'Danger', labelAr: 'خطر' },
        { value: 'disabled', label: 'Disabled', labelAr: 'معطل' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'shape',
      nameAr: 'الشكل',
      type: 'select' as const,
      options: [
        { value: 'square', label: 'Square', labelAr: 'مربع' },
        { value: 'circle', label: 'Circle', labelAr: 'دائري' },
      ],
      defaultValue: 'square',
    },
    {
      name: 'showLabel',
      nameAr: 'إظهار التسمية',
      type: 'boolean' as const,
      defaultValue: true,
    },
  ];

  const controlValues = {
    size,
    status,
    shape,
    showLabel,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'size':
        setSize(value as IconContainerSize);
        break;
      case 'status':
        setStatus(value as IconContainerStatus);
        break;
      case 'shape':
        setShape(value as IconContainerShape);
        break;
      case 'showLabel':
        setShowLabel(value as boolean);
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
          <div className="flex flex-wrap gap-6 justify-center items-end">
            <IconContainer 
              icon={<InfoCircle variant="Bold" />} 
              size={size}
              status={status}
              shape={shape}
              label={showLabel ? 'Label' : undefined}
            />
          </div>
        </LivePlayground>

        {/* Status Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Status Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Icon containers support multiple status colors to convey meaning and context.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-8 justify-center">
              <IconContainer icon={<InfoCircle variant="Bold" />} status="info" label="Info" />
              <IconContainer icon={<Setting2 variant="Bold" />} status="gray" label="Gray" />
              <IconContainer icon={<TickCircle variant="Bold" />} status="success" label="Success" />
              <IconContainer icon={<Warning2 variant="Bold" />} status="warning" label="Warning" />
              <IconContainer icon={<Danger variant="Bold" />} status="danger" label="Danger" />
              <IconContainer icon={<InfoCircle variant="Bold" />} status="disabled" label="Disabled" />
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Size Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Six size options to fit various UI contexts, from compact badges to prominent feature icons.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-8 justify-center items-end">
              <IconContainer icon={<Star1 variant="Bold" />} size="xs" status="info" label="xs" />
              <IconContainer icon={<Star1 variant="Bold" />} size="sm" status="info" label="sm" />
              <IconContainer icon={<Star1 variant="Bold" />} size="md" status="info" label="md" />
              <IconContainer icon={<Star1 variant="Bold" />} size="lg" status="info" label="lg" />
              <IconContainer icon={<Star1 variant="Bold" />} size="xl" status="info" label="xl" />
              <IconContainer icon={<Star1 variant="Bold" />} size="2xl" status="info" label="2xl" />
            </div>
          </div>
        </section>

        {/* Shape Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Shape Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Choose between square (with rounded corners) or circle shapes.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-12 justify-center items-start">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Square</h3>
                <div className="flex gap-4">
                  <IconContainer icon={<Star1 variant="Bold" />} shape="square" status="info" />
                  <IconContainer icon={<Heart variant="Bold" />} shape="square" status="danger" />
                  <IconContainer icon={<TickCircle variant="Bold" />} shape="square" status="success" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Circle</h3>
                <div className="flex gap-4">
                  <IconContainer icon={<Star1 variant="Bold" />} shape="circle" status="info" />
                  <IconContainer icon={<Heart variant="Bold" />} shape="circle" status="danger" />
                  <IconContainer icon={<TickCircle variant="Bold" />} shape="circle" status="success" />
                </div>
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
            Common use cases for icon containers in various UI contexts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature Grid */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Feature Grid</h3>
              <div className="grid grid-cols-4 gap-4">
                <IconContainer icon={<Home2 variant="Bold" />} status="info" size="lg" label="Home" />
                <IconContainer icon={<Gift variant="Bold" />} status="warning" size="lg" label="Rewards" />
                <IconContainer icon={<Wallet2 variant="Bold" />} status="success" size="lg" label="Wallet" />
                <IconContainer icon={<User variant="Bold" />} status="gray" size="lg" label="Profile" />
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Category Icons</h3>
              <div className="flex gap-3 flex-wrap">
                <IconContainer icon={<ShoppingCart variant="Bold" />} status="info" shape="circle" />
                <IconContainer icon={<Gift variant="Bold" />} status="warning" shape="circle" />
                <IconContainer icon={<Heart variant="Bold" />} status="danger" shape="circle" />
                <IconContainer icon={<Star1 variant="Bold" />} status="success" shape="circle" />
                <IconContainer icon={<Notification variant="Bold" />} status="gray" shape="circle" />
              </div>
            </div>

            {/* Status Indicators */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Status Indicators</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IconContainer icon={<TickCircle variant="Bold" />} status="success" size="sm" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Payment successful</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconContainer icon={<Warning2 variant="Bold" />} status="warning" size="sm" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Verification pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconContainer icon={<Danger variant="Bold" />} status="danger" size="sm" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Error occurred</span>
                </div>
              </div>
            </div>

            {/* Size Comparison */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Size Scale</h3>
              <div className="flex items-end gap-2">
                {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
                  <IconContainer 
                    key={s} 
                    icon={<Star1 variant="Bold" />} 
                    status="info" 
                    size={s} 
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex gap-2">
              {[Home2, Gift, Wallet2].map((Icon, i) => (
                <IconContainer 
                  key={i} 
                  icon={<Icon variant="Bold" />} 
                  size="sm" 
                  status={(['info', 'warning', 'success'] as const)[i]}
                />
              ))}
            </div>
          }
          tablet={
            <div className="flex gap-3">
              {[Home2, Gift, Wallet2, User].map((Icon, i) => (
                <IconContainer 
                  key={i} 
                  icon={<Icon variant="Bold" />} 
                  size="md" 
                  status={(['info', 'warning', 'success', 'gray'] as const)[i]}
                />
              ))}
            </div>
          }
          desktop={
            <div className="flex gap-4">
              {[Home2, Gift, Wallet2, User, Star1].map((Icon, i) => (
                <IconContainer 
                  key={i} 
                  icon={<Icon variant="Bold" />} 
                  size="lg" 
                  status={(['info', 'warning', 'success', 'gray', 'danger'] as const)[i]}
                  label={['Home', 'Rewards', 'Wallet', 'Profile', 'Favorites'][i]}
                />
              ))}
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use consistent status colors across your application', 
              textAr: 'استخدم ألوان الحالة بشكل متسق في تطبيقك' 
            },
            { 
              text: 'Match icon size to the container size for visual harmony', 
              textAr: 'طابق حجم الأيقونة مع حجم الحاوية للتناغم البصري' 
            },
            { 
              text: 'Use labels when icons need clarification', 
              textAr: 'استخدم التسميات عندما تحتاج الأيقونات للتوضيح' 
            },
            { 
              text: 'Choose circle shape for avatars and navigation', 
              textAr: 'اختر الشكل الدائري للصور الشخصية والتنقل' 
            },
          ]}
          donts={[
            { 
              text: "Don't use too many different status colors in one view", 
              textAr: 'لا تستخدم ألوان حالة مختلفة كثيرة في عرض واحد' 
            },
            { 
              text: "Don't mix square and circle shapes inconsistently", 
              textAr: 'لا تخلط بين الأشكال المربعة والدائرية بشكل غير متسق' 
            },
            { 
              text: "Don't use disabled status for active elements", 
              textAr: 'لا تستخدم حالة التعطيل للعناصر النشطة' 
            },
            { 
              text: "Don't place icons without semantic meaning", 
              textAr: 'لا تضع أيقونات بدون معنى دلالي' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
