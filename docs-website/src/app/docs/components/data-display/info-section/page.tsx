'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { 
  InfoCircle, 
  User, 
  Call, 
  Location, 
  Calendar, 
  Wallet2, 
  Card as CardIcon,
  ShoppingCart,
  Truck,
  TickCircle,
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { 
  InfoItem, 
  InfoSection, 
  type InfoSectionLayout 
} from '@/components/ui/data-display';
import { getComponentBySlug } from '@/data/components';

export default function InfoSectionPage() {
  const component = getComponentBySlug('data-display', 'info-section');
  if (!component) return null;

  // Playground state
  const [layout, setLayout] = useState<InfoSectionLayout>('horizontal');
  const [containerEnabled, setContainerEnabled] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showSeparators, setShowSeparators] = useState(true);

  const code = `import { InfoSection, InfoItem } from '@singular/ui';

// Basic usage
<InfoSection layout="${layout}" container={${containerEnabled}} showSeparators={${showSeparators}}>
  <InfoItem
    title="Label"
    description="Value"
    showIcon={${showIcon}}
  />
  <InfoItem
    title="Another Label"
    description="Another Value"
    showIcon={${showIcon}}
  />
</InfoSection>

// Horizontal layout with separators
<InfoSection layout="horizontal" container showSeparators>
  <InfoItem title="Order ID" description="#12345" showIcon />
  <InfoItem title="Status" description="Processing" showIcon />
  <InfoItem title="Total" description="$99.00" showIcon />
</InfoSection>

// Vertical layout for mobile
<InfoSection layout="vertical">
  <InfoItem title="Name" description="John Doe" />
  <InfoItem title="Email" description="john@example.com" />
</InfoSection>`;

  const controls = [
    {
      name: 'layout',
      nameAr: 'التخطيط',
      type: 'select' as const,
      options: [
        { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
        { value: 'vertical', label: 'Vertical', labelAr: 'عمودي' },
      ],
      defaultValue: 'horizontal',
    },
    {
      name: 'container',
      nameAr: 'حاوية',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'showIcon',
      nameAr: 'إظهار الأيقونة',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'showSeparators',
      nameAr: 'إظهار الفواصل',
      type: 'boolean' as const,
      defaultValue: true,
    },
  ];

  const controlValues = {
    layout,
    container: containerEnabled,
    showIcon,
    showSeparators,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'layout':
        setLayout(value as InfoSectionLayout);
        break;
      case 'container':
        setContainerEnabled(value as boolean);
        break;
      case 'showIcon':
        setShowIcon(value as boolean);
        break;
      case 'showSeparators':
        setShowSeparators(value as boolean);
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
          <div className="flex items-center justify-center p-8">
            <InfoSection 
              layout={layout} 
              container={containerEnabled} 
              showSeparators={showSeparators}
            >
              <InfoItem
                title="Order ID"
                titleAr="رقم الطلب"
                description="#12345"
                descriptionAr="#12345"
                showIcon={showIcon}
                icon={<ShoppingCart size={12} variant="Bold" />}
              />
              <InfoItem
                title="Status"
                titleAr="الحالة"
                description="Processing"
                descriptionAr="قيد المعالجة"
                showIcon={showIcon}
                icon={<Truck size={12} variant="Bold" />}
              />
              <InfoItem
                title="Total"
                titleAr="المجموع"
                description="$99.00"
                descriptionAr="٩٩٫٠٠ دولار"
                showIcon={showIcon}
                icon={<Wallet2 size={12} variant="Bold" />}
              />
            </InfoSection>
          </div>
        </LivePlayground>

        {/* Layout Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Layout Variants</h2>
          <div className="grid gap-8">
            {/* Horizontal */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Horizontal (Desktop)</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container showSeparators>
                  <InfoItem
                    title="Order ID"
                    description="#12345"
                    showIcon
                    icon={<ShoppingCart size={12} variant="Bold" />}
                  />
                  <InfoItem
                    title="Status"
                    description="Processing"
                    showIcon
                    icon={<Truck size={12} variant="Bold" />}
                  />
                  <InfoItem
                    title="Total"
                    description="$99.00"
                    showIcon
                    icon={<Wallet2 size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>

            {/* Vertical */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Vertical (Mobile)</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl max-w-sm">
                <InfoSection layout="vertical" container>
                  <InfoItem
                    title="Order ID"
                    description="#12345"
                    showIcon
                    icon={<ShoppingCart size={12} variant="Bold" />}
                  />
                  <InfoItem
                    title="Status"
                    description="Processing"
                    showIcon
                    icon={<Truck size={12} variant="Bold" />}
                  />
                  <InfoItem
                    title="Total"
                    description="$99.00"
                    showIcon
                    icon={<Wallet2 size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>
          </div>
        </section>

        {/* Container Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Container Variants</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* With Container */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">With Container</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container>
                  <InfoItem title="Name" description="John Doe" showIcon />
                  <InfoItem title="Email" description="john@email.com" showIcon />
                </InfoSection>
              </div>
            </div>

            {/* Without Container */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Without Container</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container={false}>
                  <InfoItem title="Name" description="John Doe" showIcon />
                  <InfoItem title="Email" description="john@email.com" showIcon />
                </InfoSection>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Icon Variants</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* With Icons */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">With Icons</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container>
                  <InfoItem 
                    title="Name" 
                    description="John Doe" 
                    showIcon 
                    icon={<User size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Phone" 
                    description="+1 234 567" 
                    showIcon 
                    icon={<Call size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>

            {/* Without Icons */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Without Icons</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container>
                  <InfoItem title="Name" description="John Doe" />
                  <InfoItem title="Phone" description="+1 234 567" />
                </InfoSection>
              </div>
            </div>
          </div>
        </section>

        {/* Separator Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Separator Variants</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* With Separators */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">With Separators</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container showSeparators>
                  <InfoItem title="Item 1" description="Value 1" showIcon />
                  <InfoItem title="Item 2" description="Value 2" showIcon />
                  <InfoItem title="Item 3" description="Value 3" showIcon />
                </InfoSection>
              </div>
            </div>

            {/* Without Separators */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Without Separators</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container showSeparators={false}>
                  <InfoItem title="Item 1" description="Value 1" showIcon />
                  <InfoItem title="Item 2" description="Value 2" showIcon />
                  <InfoItem title="Item 3" description="Value 3" showIcon />
                </InfoSection>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
          <div className="grid gap-8">
            {/* Account Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Account Information</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container>
                  <InfoItem 
                    title="Full Name" 
                    description="John Doe" 
                    showIcon 
                    icon={<User size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Phone" 
                    description="+1 234 567 890" 
                    showIcon 
                    icon={<Call size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Location" 
                    description="New York, USA" 
                    showIcon 
                    icon={<Location size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Member Since" 
                    description="Jan 2024" 
                    showIcon 
                    icon={<Calendar size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Order Summary</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <InfoSection layout="horizontal" container>
                  <InfoItem 
                    title="Order ID" 
                    description="#ORD-2024-001" 
                    showIcon 
                    icon={<ShoppingCart size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Status" 
                    description="Delivered" 
                    showIcon 
                    icon={<TickCircle size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Payment" 
                    description="Credit Card" 
                    showIcon 
                    icon={<CardIcon size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Total" 
                    description="$249.99" 
                    showIcon 
                    icon={<Wallet2 size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>

            {/* Mobile Profile View */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Mobile Profile View</h3>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl max-w-sm">
                <InfoSection layout="vertical" container>
                  <InfoItem 
                    title="Full Name" 
                    description="John Doe" 
                    showIcon 
                    icon={<User size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Phone" 
                    description="+1 234 567 890" 
                    showIcon 
                    icon={<Call size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Location" 
                    description="New York, USA" 
                    showIcon 
                    icon={<Location size={12} variant="Bold" />}
                  />
                  <InfoItem 
                    title="Member Since" 
                    description="Jan 2024" 
                    showIcon 
                    icon={<Calendar size={12} variant="Bold" />}
                  />
                </InfoSection>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <InfoSection layout="vertical" container>
              <InfoItem title="Name" description="John Doe" showIcon icon={<User size={12} variant="Bold" />} />
              <InfoItem title="Phone" description="+1 234 567" showIcon icon={<Call size={12} variant="Bold" />} />
            </InfoSection>
          }
          tablet={
            <InfoSection layout="horizontal" container>
              <InfoItem title="Name" description="John Doe" showIcon icon={<User size={12} variant="Bold" />} />
              <InfoItem title="Phone" description="+1 234 567" showIcon icon={<Call size={12} variant="Bold" />} />
              <InfoItem title="Location" description="New York" showIcon icon={<Location size={12} variant="Bold" />} />
            </InfoSection>
          }
          desktop={
            <InfoSection layout="horizontal" container>
              <InfoItem title="Name" description="John Doe" showIcon icon={<User size={12} variant="Bold" />} />
              <InfoItem title="Phone" description="+1 234 567" showIcon icon={<Call size={12} variant="Bold" />} />
              <InfoItem title="Email" description="john@email.com" showIcon icon={<InfoCircle size={12} variant="Bold" />} />
              <InfoItem title="Location" description="New York, USA" showIcon icon={<Location size={12} variant="Bold" />} />
            </InfoSection>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use horizontal layout for desktop views with multiple items', textAr: 'استخدم التخطيط الأفقي لعرض سطح المكتب مع عناصر متعددة' },
            { text: 'Use vertical layout for mobile or narrow containers', textAr: 'استخدم التخطيط العمودي للجوال أو الحاويات الضيقة' },
            { text: 'Group related information together', textAr: 'جمع المعلومات المترابطة معًا' },
            { text: 'Use icons to help users quickly identify information types', textAr: 'استخدم الأيقونات لمساعدة المستخدمين على التعرف بسرعة على أنواع المعلومات' },
            { text: 'Use separators to visually divide content in horizontal layouts', textAr: 'استخدم الفواصل لتقسيم المحتوى بصريًا في التخطيطات الأفقية' },
          ]}
          donts={[
            { text: "Don't mix too many items in a single section", textAr: 'لا تخلط عناصر كثيرة جدًا في قسم واحد' },
            { text: "Don't use horizontal layout with more than 5 items", textAr: 'لا تستخدم التخطيط الأفقي مع أكثر من 5 عناصر' },
            { text: "Don't mix editable and read-only fields", textAr: 'لا تخلط الحقول القابلة للتحرير والقراءة فقط' },
            { text: "Don't use separators in vertical layouts", textAr: 'لا تستخدم الفواصل في التخطيطات العمودية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
