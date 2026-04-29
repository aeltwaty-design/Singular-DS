'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { 
  Star1, 
  TickCircle, 
  Danger, 
  Warning2, 
  InfoCircle,
  Tag as TagIcon,
  Category,
  Flash,
  Heart,
  Gift
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';
import { Tag, type TagStatus, type TagSize, type TagType } from '@/components/ui/data-display';

export default function TagPage() {
  const component = getComponentBySlug('data-display', 'tag');
  const { brandColors } = useBrand();
  
  // Playground state
  const [size, setSize] = useState<TagSize>('sm');
  const [type, setType] = useState<TagType>('secondary');
  const [status, setStatus] = useState<TagStatus>('default');
  const [showLeadingIcon, setShowLeadingIcon] = useState(true);
  const [removable, setRemovable] = useState(false);

  if (!component) return null;

  const code = `import { Tag } from '@singular/ui';
import { Star1, TickCircle, Danger } from 'iconsax-react';

// Basic usage
<Tag>Design</Tag>

// With status variants
<Tag status="success">Completed</Tag>
<Tag status="danger">Failed</Tag>
<Tag status="warning">Pending</Tag>
<Tag status="info">New</Tag>

// Primary type (solid background)
<Tag type="primary" status="success">Active</Tag>

// With icons
<Tag leadingIcon={<Star1 variant="Bold" />}>Featured</Tag>

// Removable
<Tag removable onRemove={() => {}}>React</Tag>

// Different sizes
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`;

  const controls = [
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select' as const,
      options: [
        { value: 'sm', label: 'Small', labelAr: 'صغير' },
        { value: 'md', label: 'Medium', labelAr: 'متوسط' },
        { value: 'lg', label: 'Large', labelAr: 'كبير' },
      ],
      defaultValue: 'sm',
    },
    {
      name: 'type',
      nameAr: 'النوع',
      type: 'select' as const,
      options: [
        { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
        { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
      ],
      defaultValue: 'secondary',
    },
    {
      name: 'status',
      nameAr: 'الحالة',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Default', labelAr: 'افتراضي' },
        { value: 'gray', label: 'Gray', labelAr: 'رمادي' },
        { value: 'success', label: 'Success', labelAr: 'نجاح' },
        { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
        { value: 'danger', label: 'Danger', labelAr: 'خطر' },
        { value: 'info', label: 'Info', labelAr: 'معلومات' },
        { value: 'disabled', label: 'Disabled', labelAr: 'معطل' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'showLeadingIcon',
      nameAr: 'أيقونة البداية',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'removable',
      nameAr: 'قابل للإزالة',
      type: 'boolean' as const,
      defaultValue: false,
    },
  ];

  const controlValues = {
    size,
    type,
    status,
    showLeadingIcon,
    removable,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'size':
        setSize(value as TagSize);
        break;
      case 'type':
        setType(value as TagType);
        break;
      case 'status':
        setStatus(value as TagStatus);
        break;
      case 'showLeadingIcon':
        setShowLeadingIcon(value as boolean);
        break;
      case 'removable':
        setRemovable(value as boolean);
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
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Tag 
              size={size}
              type={type}
              status={status}
              leadingIcon={showLeadingIcon ? <Star1 variant="Bold" /> : undefined}
              removable={removable}
              onRemove={() => alert('Tag removed!')}
            >
              Label
            </Tag>
          </div>
        </LivePlayground>

        {/* Status Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Status Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Tags support multiple status colors to convey meaning and context.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Tag status="default" leadingIcon={<Star1 variant="Bold" />}>Default</Tag>
              <Tag status="gray" leadingIcon={<Category variant="Bold" />}>Gray</Tag>
              <Tag status="success" leadingIcon={<TickCircle variant="Bold" />}>Success</Tag>
              <Tag status="warning" leadingIcon={<Warning2 variant="Bold" />}>Warning</Tag>
              <Tag status="danger" leadingIcon={<Danger variant="Bold" />}>Danger</Tag>
              <Tag status="info" leadingIcon={<InfoCircle variant="Bold" />}>Info</Tag>
              <Tag status="disabled">Disabled</Tag>
            </div>
          </div>
        </section>

        {/* Type Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Type Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Primary tags have solid backgrounds, secondary tags have subtle/light backgrounds.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">Primary (Solid)</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Tag type="primary" status="default">Default</Tag>
                  <Tag type="primary" status="success">Success</Tag>
                  <Tag type="primary" status="warning">Warning</Tag>
                  <Tag type="primary" status="danger">Danger</Tag>
                  <Tag type="primary" status="info">Info</Tag>
                </div>
              </div>
              {/* Secondary */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">Secondary (Subtle)</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Tag type="secondary" status="default">Default</Tag>
                  <Tag type="secondary" status="success">Success</Tag>
                  <Tag type="secondary" status="warning">Warning</Tag>
                  <Tag type="secondary" status="danger">Danger</Tag>
                  <Tag type="secondary" status="info">Info</Tag>
                </div>
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
            Three size options to fit various UI contexts.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Tag size="sm" leadingIcon={<Star1 variant="Bold" />}>Small</Tag>
              <Tag size="md" leadingIcon={<Star1 variant="Bold" />}>Medium</Tag>
              <Tag size="lg" leadingIcon={<Star1 variant="Bold" />}>Large</Tag>
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Tags with Icons
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Add leading or trailing icons to enhance tag meaning.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Tag leadingIcon={<Star1 variant="Bold" />} status="default">Featured</Tag>
              <Tag leadingIcon={<Heart variant="Bold" />} status="danger">Favorite</Tag>
              <Tag leadingIcon={<Flash variant="Bold" />} status="warning">Flash Sale</Tag>
              <Tag leadingIcon={<Gift variant="Bold" />} status="success">Gift</Tag>
              <Tag leadingIcon={<TagIcon variant="Bold" />} status="info">New</Tag>
            </div>
          </div>
        </section>

        {/* Removable Tags */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Removable Tags
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Tags with close buttons for filtering and selection interfaces.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Tag removable onRemove={() => {}}>Design</Tag>
              <Tag removable onRemove={() => {}} status="success">React</Tag>
              <Tag removable onRemove={() => {}} status="info">TypeScript</Tag>
              <Tag removable onRemove={() => {}} status="warning">Figma</Tag>
              <Tag removable onRemove={() => {}} status="gray">Flutter</Tag>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for tags in various UI contexts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Labels */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Order Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Order #1234</span>
                  <Tag type="primary" status="success" size="sm">Completed</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Order #1235</span>
                  <Tag type="primary" status="warning" size="sm">Processing</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Order #1236</span>
                  <Tag type="primary" status="danger" size="sm">Cancelled</Tag>
                </div>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                <Tag removable onRemove={() => {}} status="info">Category: Electronics</Tag>
                <Tag removable onRemove={() => {}} status="default">Price: $50-$100</Tag>
                <Tag removable onRemove={() => {}} status="success">Rating: 4+</Tag>
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Article Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Tag status="default" leadingIcon={<Category variant="Bold" />}>Technology</Tag>
                <Tag status="info">Design</Tag>
                <Tag status="success">Tutorial</Tag>
                <Tag status="gray">Opinion</Tag>
              </div>
            </div>

            {/* Skill Tags */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Tag size="md" status="default">React</Tag>
                <Tag size="md" status="info">TypeScript</Tag>
                <Tag size="md" status="success">Node.js</Tag>
                <Tag size="md" status="warning">Python</Tag>
                <Tag size="md" status="gray">SQL</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex flex-wrap gap-1">
              {['New', 'Sale', 'Hot'].map((tag) => (
                <Tag key={tag} size="sm" status={tag === 'Hot' ? 'danger' : tag === 'Sale' ? 'warning' : 'info'}>
                  {tag}
                </Tag>
              ))}
            </div>
          }
          tablet={
            <div className="flex flex-wrap gap-2">
              {['Featured', 'New Arrival', 'Best Seller'].map((tag, i) => (
                <Tag 
                  key={tag} 
                  size="md" 
                  status={(['default', 'info', 'success'] as const)[i]}
                  leadingIcon={i === 0 ? <Star1 variant="Bold" /> : undefined}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          }
          desktop={
            <div className="flex flex-wrap gap-3">
              {['Featured Product', 'Limited Edition', 'Customer Favorite', 'Trending Now'].map((tag, i) => (
                <Tag 
                  key={tag} 
                  size="md" 
                  status={(['default', 'warning', 'success', 'info'] as const)[i]}
                  leadingIcon={<Star1 variant="Bold" />}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use tags for categorization and filtering', 
              textAr: 'استخدم العلامات للتصنيف والتصفية' 
            },
            { 
              text: 'Choose status colors that convey appropriate meaning', 
              textAr: 'اختر ألوان الحالة التي تنقل المعنى المناسب' 
            },
            { 
              text: 'Use removable tags for user-selected filters', 
              textAr: 'استخدم العلامات القابلة للإزالة للمرشحات المحددة من المستخدم' 
            },
            { 
              text: 'Keep tag text concise and scannable', 
              textAr: 'اجعل نص العلامة موجزًا وقابلًا للمسح' 
            },
          ]}
          donts={[
            { 
              text: "Don't use too many tags in one view", 
              textAr: 'لا تستخدم الكثير من العلامات في عرض واحد' 
            },
            { 
              text: "Don't use tags for primary actions", 
              textAr: 'لا تستخدم العلامات للإجراءات الأساسية' 
            },
            { 
              text: "Don't mix primary and secondary types inconsistently", 
              textAr: 'لا تخلط بين الأنواع الأساسية والثانوية بشكل غير متسق' 
            },
            { 
              text: "Don't use long text that wraps to multiple lines", 
              textAr: 'لا تستخدم نصًا طويلًا ينتقل إلى سطور متعددة' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
