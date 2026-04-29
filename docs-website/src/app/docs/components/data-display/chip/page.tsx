'use client';

import { useState } from 'react';
import { 
  Category,
  Star1,
  Heart,
  Flash,
  Gift,
  Setting2,
  Location,
  Calendar,
  Tag as TagIcon
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { Chip, ChipGroup } from '@/components/ui/data-display';
import type { ChipSize } from '@/components/ui/data-display';

export default function ChipPage() {
  const component = getComponentBySlug('data-display', 'chip');
  
  // Playground state
  const [size, setSize] = useState<ChipSize>('md');
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showLeadingIcon, setShowLeadingIcon] = useState(false);
  const [dismissible, setDismissible] = useState(false);

  // ChipGroup state
  const [singleSelection, setSingleSelection] = useState<string[]>([]);
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [filterSelection, setFilterSelection] = useState<string[]>(['all']);

  if (!component) return null;

  const code = `import { Chip, ChipGroup } from '@singular/ui';
import { Star1, Heart, Category } from 'iconsax-react';

// Basic usage
<Chip>Basic Chip</Chip>

// Selected state
<Chip selected>Selected</Chip>

// With icon
<Chip leadingIcon={<Star1 variant="Bold" size={16} />}>
  Featured
</Chip>

// Dismissible
<Chip dismissible onDismiss={() => {}}>
  Dismissible
</Chip>

// ChipGroup (single select)
<ChipGroup value={selected} onChange={setSelected}>
  <Chip value="option1">Option 1</Chip>
  <Chip value="option2">Option 2</Chip>
</ChipGroup>

// ChipGroup (multi select)
<ChipGroup multiple value={selected} onChange={setSelected}>
  <Chip value="react">React</Chip>
  <Chip value="vue">Vue</Chip>
</ChipGroup>`;

  const controls: PlaygroundControl[] = [
    {
      name: 'Size',
      nameAr: 'الحجم',
      type: 'select',
      defaultValue: 'md',
      options: [
        { value: 'sm', label: 'Small', labelAr: 'صغير' },
        { value: 'md', label: 'Medium', labelAr: 'متوسط' },
        { value: 'lg', label: 'Large', labelAr: 'كبير' },
      ],
    },
    {
      name: 'Selected',
      nameAr: 'محدد',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'Disabled',
      nameAr: 'معطل',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'Leading Icon',
      nameAr: 'أيقونة البداية',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'Dismissible',
      nameAr: 'قابل للإزالة',
      type: 'boolean',
      defaultValue: false,
    },
  ];

  const controlValues = {
    'Size': size,
    'Selected': selected,
    'Disabled': disabled,
    'Leading Icon': showLeadingIcon,
    'Dismissible': dismissible,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'Size':
        setSize(value as ChipSize);
        break;
      case 'Selected':
        setSelected(value as boolean);
        break;
      case 'Disabled':
        setDisabled(value as boolean);
        break;
      case 'Leading Icon':
        setShowLeadingIcon(value as boolean);
        break;
      case 'Dismissible':
        setDismissible(value as boolean);
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
      icon={<Category className="w-6 h-6" variant="Bold" />}
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
            <Chip 
              size={size}
              selected={selected}
              disabled={disabled}
              leadingIcon={showLeadingIcon ? <Star1 variant="Bold" size={16} /> : undefined}
              dismissible={dismissible}
              onSelect={() => setSelected(!selected)}
              onDismiss={() => alert('Chip dismissed!')}
            >
              Label
            </Chip>
          </div>
        </LivePlayground>

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
              <Chip size="sm" leadingIcon={<Star1 variant="Bold" size={14} />}>Small</Chip>
              <Chip size="md" leadingIcon={<Star1 variant="Bold" size={16} />}>Medium</Chip>
              <Chip size="lg" leadingIcon={<Star1 variant="Bold" size={18} />}>Large</Chip>
            </div>
          </div>
        </section>

        {/* Selection States */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Selection States
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Chips can be toggled between selected and unselected states. Selected chips show a checkmark and use the brand color.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip>Unselected</Chip>
              <Chip selected>Selected</Chip>
              <Chip disabled>Disabled</Chip>
              <Chip selected disabled>Selected Disabled</Chip>
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Chips with Icons
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Add leading icons to enhance chip meaning and visual appeal. Icons are replaced by a checkmark when selected.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip leadingIcon={<Star1 variant="Bold" size={16} />}>Featured</Chip>
              <Chip leadingIcon={<Heart variant="Bold" size={16} />} selected>Favorites</Chip>
              <Chip leadingIcon={<Flash variant="Bold" size={16} />}>Flash Sale</Chip>
              <Chip leadingIcon={<Gift variant="Bold" size={16} />}>Gifts</Chip>
              <Chip leadingIcon={<Location variant="Bold" size={16} />}>Location</Chip>
            </div>
          </div>
        </section>

        {/* With Avatars */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Chips with Avatars
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Display user avatars or images within chips.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip leadingAvatar="https://i.pravatar.cc/150?u=john">John Doe</Chip>
              <Chip leadingAvatar="https://i.pravatar.cc/150?u=jane" selected>Jane Smith</Chip>
              <Chip leadingAvatar="https://i.pravatar.cc/150?u=bob" dismissible onDismiss={() => {}}>Bob Wilson</Chip>
            </div>
          </div>
        </section>

        {/* Dismissible Chips */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Dismissible Chips
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Chips with close buttons for removal actions.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip dismissible onDismiss={() => {}}>Design</Chip>
              <Chip dismissible onDismiss={() => {}} selected>React</Chip>
              <Chip dismissible onDismiss={() => {}} leadingIcon={<TagIcon variant="Bold" size={16} />}>TypeScript</Chip>
              <Chip dismissible onDismiss={() => {}} leadingAvatar="https://i.pravatar.cc/150?u=team">Team</Chip>
            </div>
          </div>
        </section>

        {/* ChipGroup - Single Selection */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            ChipGroup - Single Selection
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use ChipGroup to manage single selection across multiple chips.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                Selected: {singleSelection.length > 0 ? singleSelection[0] : 'None'}
              </p>
              <ChipGroup value={singleSelection} onChange={setSingleSelection} gap="md">
                <Chip value="morning" leadingIcon={<Calendar variant="Bold" size={16} />}>Morning</Chip>
                <Chip value="afternoon" leadingIcon={<Calendar variant="Bold" size={16} />}>Afternoon</Chip>
                <Chip value="evening" leadingIcon={<Calendar variant="Bold" size={16} />}>Evening</Chip>
                <Chip value="night" leadingIcon={<Calendar variant="Bold" size={16} />}>Night</Chip>
              </ChipGroup>
            </div>
          </div>
        </section>

        {/* ChipGroup - Multiple Selection */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            ChipGroup - Multiple Selection
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Enable multiple selection with the <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">multiple</code> prop.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                Selected: {multiSelection.length > 0 ? multiSelection.join(', ') : 'None'}
              </p>
              <ChipGroup multiple value={multiSelection} onChange={setMultiSelection} gap="md">
                <Chip value="react">React</Chip>
                <Chip value="vue">Vue</Chip>
                <Chip value="angular">Angular</Chip>
                <Chip value="svelte">Svelte</Chip>
                <Chip value="solid">Solid</Chip>
              </ChipGroup>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for chips in various UI contexts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter Chips */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Filter Chips</h3>
              <ChipGroup value={filterSelection} onChange={setFilterSelection} gap="sm">
                <Chip value="all">All</Chip>
                <Chip value="electronics" leadingIcon={<Setting2 variant="Bold" size={14} />}>Electronics</Chip>
                <Chip value="clothing">Clothing</Chip>
                <Chip value="books">Books</Chip>
              </ChipGroup>
            </div>

            {/* Input Tokens */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Selected Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Chip dismissible onDismiss={() => {}}>JavaScript</Chip>
                <Chip dismissible onDismiss={() => {}}>TypeScript</Chip>
                <Chip dismissible onDismiss={() => {}}>React</Chip>
                <Chip dismissible onDismiss={() => {}}>Node.js</Chip>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Quick Replies</h3>
              <div className="flex flex-wrap gap-2">
                <Chip size="sm">👋 Hello!</Chip>
                <Chip size="sm">👍 Sounds good</Chip>
                <Chip size="sm">📅 Schedule meeting</Chip>
                <Chip size="sm">📞 Call me</Chip>
              </div>
            </div>

            {/* User Selection */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Assign Team Members</h3>
              <div className="flex flex-wrap gap-2">
                <Chip leadingAvatar="https://i.pravatar.cc/150?u=1" selected>Alice</Chip>
                <Chip leadingAvatar="https://i.pravatar.cc/150?u=2">Bob</Chip>
                <Chip leadingAvatar="https://i.pravatar.cc/150?u=3" selected>Carol</Chip>
                <Chip leadingAvatar="https://i.pravatar.cc/150?u=4">David</Chip>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex flex-wrap gap-1">
              {['All', 'New', 'Popular'].map((chip) => (
                <Chip key={chip} size="sm">
                  {chip}
                </Chip>
              ))}
            </div>
          }
          tablet={
            <div className="flex flex-wrap gap-2">
              {['All Products', 'Electronics', 'Clothing', 'Books'].map((chip, i) => (
                <Chip 
                  key={chip} 
                  size="md" 
                  selected={i === 0}
                  leadingIcon={i === 0 ? <Category variant="Bold" size={16} /> : undefined}
                >
                  {chip}
                </Chip>
              ))}
            </div>
          }
          desktop={
            <div className="flex flex-wrap gap-3">
              {['All Categories', 'Electronics & Gadgets', 'Fashion & Clothing', 'Books & Media', 'Home & Garden'].map((chip, i) => (
                <Chip 
                  key={chip} 
                  size="md" 
                  selected={i === 0}
                  leadingIcon={<Category variant="Bold" size={16} />}
                >
                  {chip}
                </Chip>
              ))}
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use chips for selection and filtering interfaces', 
              textAr: 'استخدم الشرائح لواجهات التحديد والتصفية' 
            },
            { 
              text: 'Use ChipGroup for managing related chip selections', 
              textAr: 'استخدم مجموعة الشرائح لإدارة اختيارات الشرائح المرتبطة' 
            },
            { 
              text: 'Add icons to enhance chip meaning and visual appeal', 
              textAr: 'أضف أيقونات لتعزيز معنى الشريحة والجاذبية البصرية' 
            },
            { 
              text: 'Use dismissible chips for user-generated content', 
              textAr: 'استخدم الشرائح القابلة للإزالة للمحتوى المُنشأ من المستخدم' 
            },
          ]}
          donts={[
            { 
              text: "Don't use chips for status display (use Tag instead)", 
              textAr: 'لا تستخدم الشرائح لعرض الحالة (استخدم العلامة بدلاً من ذلك)' 
            },
            { 
              text: "Don't use too many chips in a single row", 
              textAr: 'لا تستخدم الكثير من الشرائح في صف واحد' 
            },
            { 
              text: "Don't use long text that makes chips too wide", 
              textAr: 'لا تستخدم نصًا طويلًا يجعل الشرائح واسعة جدًا' 
            },
            { 
              text: "Don't mix selected and unselected chips inconsistently", 
              textAr: 'لا تخلط بين الشرائح المحددة وغير المحددة بشكل غير متسق' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
