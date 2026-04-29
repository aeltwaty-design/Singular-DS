'use client';

import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { 
  Notification, 
  Setting2, 
  User, 
  Lock1, 
  Call, 
  Message, 
  Wallet2, 
  Card as CardIcon,
  InfoCircle,
  TickCircle,
  Warning2,
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { 
  ListItem, 
  ListView, 
  Tag,
  type ListItemSize, 
  type ListItemTheme, 
  type ListItemLeading, 
  type ListItemTrailing 
} from '@/components/ui/data-display';
import { getComponentBySlug } from '@/data/components';

export default function ListViewPage() {
  const component = getComponentBySlug('data-display', 'list-view');
  if (!component) return null;

  // Playground state
  const [size, setSize] = useState<ListItemSize>('sm');
  const [theme, setTheme] = useState<ListItemTheme>('widget');
  const [leading, setLeading] = useState<ListItemLeading>('icon');
  const [trailing, setTrailing] = useState<ListItemTrailing>('icon');
  const [disabled, setDisabled] = useState(false);

  const code = `import { ListView, ListItem } from '@singular/ui';

// Basic usage
<ListView>
  <ListItem
    title="Title Here"
    description="Description Here"
    size="${size}"
    theme="${theme}"
    leading="${leading}"
    trailing="${trailing}"
    ${disabled ? 'disabled' : ''}
    leadingIcon={<Notification variant="Bold" />}
  />
</ListView>

// Settings menu example
<ListView gap="sm">
  <ListItem
    title="Account"
    description="Manage your account"
    leading="icon"
    trailing="icon"
    leadingIcon={<User variant="Bold" />}
  />
  <ListItem
    title="Notifications"
    trailing="icon"
    leadingIcon={<Notification variant="Bold" />}
  />
</ListView>`;

  const controls = [
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select' as const,
      options: [
        { value: 'sm', label: 'Small', labelAr: 'صغير' },
        { value: 'md', label: 'Medium', labelAr: 'متوسط' },
      ],
      defaultValue: 'sm',
    },
    {
      name: 'theme',
      nameAr: 'النمط',
      type: 'select' as const,
      options: [
        { value: 'widget', label: 'Widget (Card)', labelAr: 'بطاقة' },
        { value: 'full', label: 'Full (No Border)', labelAr: 'بدون حدود' },
      ],
      defaultValue: 'widget',
    },
    {
      name: 'leading',
      nameAr: 'العنصر الأمامي',
      type: 'select' as const,
      options: [
        { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
        { value: 'image', label: 'Image', labelAr: 'صورة' },
        { value: 'none', label: 'None', labelAr: 'بدون' },
      ],
      defaultValue: 'icon',
    },
    {
      name: 'trailing',
      nameAr: 'العنصر الخلفي',
      type: 'select' as const,
      options: [
        { value: 'none', label: 'None', labelAr: 'بدون' },
        { value: 'icon', label: 'Icon (Chevron)', labelAr: 'أيقونة' },
        { value: 'text', label: 'Text', labelAr: 'نص' },
        { value: 'tag', label: 'Tag', labelAr: 'وسم' },
        { value: 'hyperlink', label: 'Hyperlink', labelAr: 'رابط' },
      ],
      defaultValue: 'icon',
    },
    {
      name: 'disabled',
      nameAr: 'معطل',
      type: 'boolean' as const,
      defaultValue: false,
    },
  ];

  const controlValues = {
    size,
    theme,
    leading,
    trailing,
    disabled,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'size':
        setSize(value as ListItemSize);
        break;
      case 'theme':
        setTheme(value as ListItemTheme);
        break;
      case 'leading':
        setLeading(value as ListItemLeading);
        break;
      case 'trailing':
        setTrailing(value as ListItemTrailing);
        break;
      case 'disabled':
        setDisabled(value as boolean);
        break;
    }
  };

  // Get trailing content based on type
  const getTrailingContent = () => {
    switch (trailing) {
      case 'text':
        return 'Details';
      case 'tag':
        return <Tag status="default" size="sm">New</Tag>;
      case 'hyperlink':
        return 'View';
      default:
        return undefined;
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
            <div className="w-full max-w-md">
              <ListView gap="sm">
                <ListItem
                  title="Title Here"
                  description="Description Here"
                  size={size}
                  theme={theme}
                  leading={leading}
                  trailing={trailing}
                  disabled={disabled}
                  leadingIcon={<InfoCircle variant="Bold" className="w-full h-full" />}
                  leadingImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  trailingContent={getTrailingContent()}
                  onTrailingClick={() => console.log('Trailing clicked')}
                />
              </ListView>
            </div>
          </div>
        </LivePlayground>

        {/* Size Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Size Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            List items come in two sizes: small for compact lists and medium for more prominent items.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Small</h3>
                <ListView gap="sm">
                  <ListItem
                    title="Small Item"
                    description="14px title, 12px description"
                    size="sm"
                    leadingIcon={<InfoCircle variant="Bold" className="w-full h-full" />}
                    trailing="icon"
                  />
                </ListView>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Medium</h3>
                <ListView gap="sm">
                  <ListItem
                    title="Medium Item"
                    description="16px title, 14px description"
                    size="md"
                    leadingIcon={<InfoCircle variant="Bold" className="w-full h-full" />}
                    trailing="icon"
                  />
                </ListView>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Theme Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Widget theme adds card styling with background and border. Full theme removes all container styling.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Widget (Card)</h3>
                <ListView gap="sm">
                  <ListItem
                    title="Widget Theme"
                    description="With border and background"
                    theme="widget"
                    leadingIcon={<Setting2 variant="Bold" className="w-full h-full" />}
                    trailing="icon"
                  />
                </ListView>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Full (No Border)</h3>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-2">
                  <ListView gap="none">
                    <ListItem
                      title="Full Theme"
                      description="No container styling"
                      theme="full"
                      leadingIcon={<Setting2 variant="Bold" className="w-full h-full" />}
                      trailing="icon"
                    />
                  </ListView>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leading Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Leading Content
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The leading slot can contain an icon, image, or be empty.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="max-w-md mx-auto">
              <ListView gap="sm">
                <ListItem
                  title="With Icon"
                  description="Using IconContainer"
                  leading="icon"
                  leadingIcon={<User variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
                <ListItem
                  title="With Image"
                  description="Square avatar image"
                  leading="image"
                  leadingImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  trailing="icon"
                />
                <ListItem
                  title="No Leading"
                  description="Text only, no icon or image"
                  leading="none"
                  trailing="icon"
                />
              </ListView>
            </div>
          </div>
        </section>

        {/* Trailing Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Trailing Content
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The trailing slot supports various content types for actions and metadata.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="max-w-md mx-auto">
              <ListView gap="sm">
                <ListItem
                  title="No Trailing"
                  description="Clean text-only design"
                  leadingIcon={<InfoCircle variant="Bold" className="w-full h-full" />}
                  trailing="none"
                />
                <ListItem
                  title="With Chevron"
                  description="Navigate to details"
                  leadingIcon={<Setting2 variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
                <ListItem
                  title="With Text"
                  description="Show additional info"
                  leadingIcon={<Wallet2 variant="Bold" className="w-full h-full" />}
                  trailing="text"
                  trailingContent="$1,234"
                />
                <ListItem
                  title="With Tag"
                  description="Status indicator"
                  leadingIcon={<Notification variant="Bold" className="w-full h-full" />}
                  trailing="tag"
                  trailingContent={<Tag status="danger" size="sm">3 New</Tag>}
                />
                <ListItem
                  title="With Hyperlink"
                  description="Clickable action"
                  leadingIcon={<User variant="Bold" className="w-full h-full" />}
                  trailing="hyperlink"
                  trailingContent="Edit"
                  onTrailingClick={() => console.log('Edit clicked')}
                />
              </ListView>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for list views in app interfaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Settings Menu */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Settings Menu</h3>
              <ListView gap="sm">
                <ListItem
                  title="Account"
                  description="Manage your profile"
                  leadingIcon={<User variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
                <ListItem
                  title="Notifications"
                  description="Push & email settings"
                  leadingIcon={<Notification variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
                <ListItem
                  title="Privacy"
                  description="Security preferences"
                  leadingIcon={<Lock1 variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
              </ListView>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Notifications</h3>
              <ListView gap="sm">
                <ListItem
                  title="Order Shipped"
                  description="Your order #1234 is on the way"
                  leadingIcon={<TickCircle variant="Bold" className="w-full h-full" />}
                  trailing="text"
                  trailingContent="2m ago"
                />
                <ListItem
                  title="Payment Due"
                  description="Invoice #5678 requires attention"
                  leadingIcon={<Warning2 variant="Bold" className="w-full h-full" />}
                  trailing="tag"
                  trailingContent={<Tag status="warning" size="sm">Urgent</Tag>}
                />
                <ListItem
                  title="New Message"
                  description="John sent you a message"
                  leadingIcon={<Message variant="Bold" className="w-full h-full" />}
                  trailing="hyperlink"
                  trailingContent="View"
                />
              </ListView>
            </div>

            {/* Contacts */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Contacts</h3>
              <ListView gap="sm">
                <ListItem
                  title="John Doe"
                  description="john@example.com"
                  leading="image"
                  leadingImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  trailing="icon"
                />
                <ListItem
                  title="Jane Smith"
                  description="jane@example.com"
                  leading="image"
                  leadingImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  trailing="icon"
                />
                <ListItem
                  title="Bob Wilson"
                  description="bob@example.com"
                  leading="image"
                  leadingImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  trailing="icon"
                />
              </ListView>
            </div>

            {/* Payment Methods */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Payment Methods</h3>
              <ListView gap="sm">
                <ListItem
                  title="Visa •••• 4242"
                  description="Expires 12/25"
                  leadingIcon={<CardIcon variant="Bold" className="w-full h-full" />}
                  trailing="tag"
                  trailingContent={<Tag status="default" size="sm">Default</Tag>}
                />
                <ListItem
                  title="Mastercard •••• 8888"
                  description="Expires 08/26"
                  leadingIcon={<CardIcon variant="Bold" className="w-full h-full" />}
                  trailing="icon"
                />
                <ListItem
                  title="Wallet Balance"
                  description="Available funds"
                  leadingIcon={<Wallet2 variant="Bold" className="w-full h-full" />}
                  trailing="text"
                  trailingContent="$250.00"
                />
              </ListView>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <ListView gap="sm">
              <ListItem
                title="Mobile Item"
                description="Compact view"
                size="sm"
                leadingIcon={<Setting2 variant="Bold" className="w-full h-full" />}
                trailing="icon"
              />
              <ListItem
                title="Another Item"
                description="Touch friendly"
                size="sm"
                leadingIcon={<User variant="Bold" className="w-full h-full" />}
                trailing="icon"
              />
            </ListView>
          }
          tablet={
            <ListView gap="sm">
              <ListItem
                title="Tablet Item"
                description="Medium density layout"
                size="sm"
                leadingIcon={<Notification variant="Bold" className="w-full h-full" />}
                trailing="icon"
              />
              <ListItem
                title="With Action"
                description="Interactive elements"
                size="sm"
                leadingIcon={<Lock1 variant="Bold" className="w-full h-full" />}
                trailing="hyperlink"
                trailingContent="Manage"
              />
            </ListView>
          }
          desktop={
            <ListView gap="sm">
              <ListItem
                title="Desktop Item"
                description="Full width with rich content and detailed descriptions"
                size="md"
                leadingIcon={<Setting2 variant="Bold" className="w-full h-full" />}
                trailing="icon"
              />
              <ListItem
                title="With Metadata"
                description="Show additional context"
                size="md"
                leadingIcon={<Wallet2 variant="Bold" className="w-full h-full" />}
                trailing="text"
                trailingContent="$1,234.56"
              />
              <ListItem
                title="With Status"
                description="Visual indicators"
                size="md"
                leadingIcon={<Notification variant="Bold" className="w-full h-full" />}
                trailing="tag"
                trailingContent={<Tag status="success" size="sm">Active</Tag>}
              />
            </ListView>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use consistent leading content types within a list', textAr: 'استخدم أنواع محتوى أمامي متسقة داخل القائمة' },
            { text: 'Keep titles concise and scannable', textAr: 'اجعل العناوين موجزة وسهلة القراءة' },
            { text: 'Use trailing icons for navigation, tags for status', textAr: 'استخدم الأيقونات الخلفية للتنقل والوسوم للحالة' },
            { text: 'Group related items together', textAr: 'اجمع العناصر ذات الصلة معًا' },
          ]}
          donts={[
            { text: "Don't overload list items with too many actions", textAr: 'لا تحمل عناصر القائمة بالكثير من الإجراءات' },
            { text: "Don't mix leading content types randomly", textAr: 'لا تخلط أنواع المحتوى الأمامي بشكل عشوائي' },
            { text: "Don't use long descriptions that wrap multiple lines", textAr: 'لا تستخدم أوصافًا طويلة تمتد على عدة أسطر' },
            { text: "Don't disable entire lists - disable individual items", textAr: 'لا تعطل القوائم بالكامل - عطل العناصر الفردية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
