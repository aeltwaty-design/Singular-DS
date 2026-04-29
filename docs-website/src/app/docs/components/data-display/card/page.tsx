'use client';

import { useState } from 'react';
import { 
  Category,
  InfoCircle,
  More,
  TickCircle,
  Star1,
  Gallery
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { 
  Card, 
  CardHeader, 
  CardMedia,
  CardTag,
  CardHeadline,
  CardSupportingText,
  CardActions,
  CardLink,
  Button,
  IconContainer
} from '@/components/ui';
import type { CardType } from '@/components/ui/data-display';

export default function CardPage() {
  const component = getComponentBySlug('data-display', 'card');
  
  // Playground state
  const [type, setType] = useState<CardType>('stacked');
  const [showMedia, setShowMedia] = useState(true);
  const [showTag, setShowTag] = useState(true);
  const [showHeadline, setShowHeadline] = useState(true);
  const [showSupportingText, setShowSupportingText] = useState(true);
  const [showActions, setShowActions] = useState(true);

  if (!component) return null;

  const code = `import { 
  Card, 
  CardHeader, 
  CardMedia, 
  CardTag, 
  CardHeadline, 
  CardSupportingText, 
  CardActions,
  CardLink,
  IconContainer,
  Button 
} from '@singular/ui';

// Stacked Card (Vertical)
<Card type="stacked">
  <CardHeader 
    leading={<IconContainer status="info" icon={<InfoCircle variant="Bold" />} />}
    title="Title here"
    description="Write secondary text"
    trailing={<More size={24} />}
  />
  <CardMedia 
    ratio="2:1" 
    tag={<CardTag>Text Here</CardTag>}
  />
  <CardHeadline title="Title here" subtitle="Write secondary text" />
  <CardSupportingText>
    Write here a descriptive content for your user
  </CardSupportingText>
  <CardActions>
    <Button size="sm">Text Here</Button>
    <Button size="sm" variant="outline">Text Here</Button>
  </CardActions>
</Card>

// Horizontal Card
<Card type="horizontal">
  <CardMedia ratio="1:1" />
  <CardHeadline title="Title here" subtitle="Secondary text" />
  <CardLink href="#">text</CardLink>
</Card>`;

  const controls: PlaygroundControl[] = [
    {
      name: 'Type',
      nameAr: 'النوع',
      type: 'select',
      defaultValue: 'stacked',
      options: [
        { value: 'stacked', label: 'Stacked', labelAr: 'مكدس' },
        { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
      ],
    },
    {
      name: 'Show Media',
      nameAr: 'إظهار الوسائط',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Tag',
      nameAr: 'إظهار العلامة',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Headline',
      nameAr: 'إظهار العنوان',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Supporting Text',
      nameAr: 'إظهار النص الداعم',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'Show Actions',
      nameAr: 'إظهار الإجراءات',
      type: 'boolean',
      defaultValue: true,
    },
  ];

  const controlValues = {
    'Type': type,
    'Show Media': showMedia,
    'Show Tag': showTag,
    'Show Headline': showHeadline,
    'Show Supporting Text': showSupportingText,
    'Show Actions': showActions,
  };

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'Type':
        setType(value as CardType);
        break;
      case 'Show Media':
        setShowMedia(value as boolean);
        break;
      case 'Show Tag':
        setShowTag(value as boolean);
        break;
      case 'Show Headline':
        setShowHeadline(value as boolean);
        break;
      case 'Show Supporting Text':
        setShowSupportingText(value as boolean);
        break;
      case 'Show Actions':
        setShowActions(value as boolean);
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
          <div className="flex justify-center">
            {type === 'stacked' ? (
              <Card type="stacked" className="w-[343px]">
                <CardHeader 
                  leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                  title="Title here"
                  description="Write secondary text"
                  trailing={<More size={24} className="text-neutral-500" />}
                />
                {showMedia && (
                  <CardMedia 
                    ratio="2:1" 
                    tag={showTag ? <CardTag position="top-left">Text Here</CardTag> : undefined}
                  />
                )}
                {showHeadline && <CardHeadline title="Title here" subtitle="Write secondary text" />}
                {showSupportingText && (
                  <CardSupportingText>
                    Write here a descriptive content for your user
                  </CardSupportingText>
                )}
                {showActions && (
                  <CardActions>
                    <Button size="sm">Text Here</Button>
                    <Button size="sm" variant="outline">Text Here</Button>
                  </CardActions>
                )}
              </Card>
            ) : (
              <Card type="horizontal" className="w-[343px]">
                {showMedia && <CardMedia ratio="1:1" />}
                <CardHeadline title="Title here" subtitle="Secondary text">
                  {showHeadline && (
                    <>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">Title here</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Secondary text</p>
                      {showSupportingText && (
                        <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">text here</p>
                      )}
                    </>
                  )}
                </CardHeadline>
                {showActions && <CardLink href="#">text</CardLink>}
              </Card>
            )}
          </div>
        </LivePlayground>

        {/* Type Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Type Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Cards come in two types: Stacked (vertical) and Horizontal layouts.
          </p>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Stacked */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">Stacked (Vertical)</h3>
                <Card type="stacked" className="w-full max-w-[343px] mx-auto">
                  <CardHeader 
                    leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                    title="Title here"
                    description="Write secondary text"
                    trailing={<More size={24} className="text-neutral-500" />}
                  />
                  <CardMedia ratio="2:1" tag={<CardTag position="top-left">Text Here</CardTag>} />
                  <CardHeadline title="Title here" subtitle="Write secondary text" />
                  <CardSupportingText>
                    Write here a descriptive content for your user
                  </CardSupportingText>
                  <CardActions>
                    <Button size="sm">Text Here</Button>
                    <Button size="sm" variant="outline">Text Here</Button>
                  </CardActions>
                </Card>
              </div>
              
              {/* Horizontal */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">Horizontal</h3>
                <Card type="horizontal" className="w-full max-w-[343px] mx-auto">
                  <CardMedia ratio="1:1" />
                  <CardHeadline>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Title here</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Secondary text</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">text here</p>
                  </CardHeadline>
                  <CardLink href="#">text</CardLink>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-components */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Sub-components
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Cards are composed of multiple sub-components for maximum flexibility.
          </p>
          <div className="space-y-6">
            {/* CardHeader */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">CardHeader</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Contains leading icon, title, description, and trailing element.
              </p>
              <Card type="stacked" className="w-full max-w-[343px]">
                <CardHeader 
                  leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                  title="Title here"
                  description="Write secondary text"
                  trailing={<More size={24} className="text-neutral-500" />}
                />
              </Card>
            </div>

            {/* CardMedia */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">CardMedia</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Image/media area with 2:1 or 1:1 aspect ratio.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Card type="stacked" className="w-[200px]">
                  <CardMedia ratio="2:1" />
                  <p className="p-2 text-xs text-center text-neutral-500">2:1 Ratio</p>
                </Card>
                <Card type="stacked" className="w-[100px]">
                  <CardMedia ratio="1:1" />
                  <p className="p-2 text-xs text-center text-neutral-500">1:1 Ratio</p>
                </Card>
              </div>
            </div>

            {/* CardTag */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">CardTag</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Badge overlay for CardMedia - use the tag prop on CardMedia.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Card type="stacked" className="w-[200px]">
                  <CardMedia ratio="2:1" tag={<CardTag position="top-left">Top Left</CardTag>} />
                </Card>
                <Card type="stacked" className="w-[200px]">
                  <CardMedia ratio="2:1" tag={<CardTag position="top-right" icon={<TickCircle size={12} variant="Bold" />}>With Icon</CardTag>} />
                </Card>
              </div>
            </div>

            {/* CardHeadline & CardSupportingText */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">CardHeadline & CardSupportingText</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Title, subtitle, and longer descriptive text.
              </p>
              <Card type="stacked" className="w-full max-w-[343px]">
                <CardHeadline title="Title here" subtitle="Write secondary text" />
                <CardSupportingText>
                  Write here a descriptive content for your user to understand the context better.
                </CardSupportingText>
              </Card>
            </div>

            {/* CardActions */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">CardActions</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Container for buttons and action links.
              </p>
              <Card type="stacked" className="w-full max-w-[343px]">
                <CardActions>
                  <Button size="sm">Primary Action</Button>
                  <Button size="sm" variant="outline">Secondary</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            Real-world Examples
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Common use cases for cards in various UI contexts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Card */}
            <Card type="stacked">
              <CardMedia 
                ratio="2:1" 
                src="https://picsum.photos/seed/product/400/200" 
                alt="Product image"
                tag={<CardTag position="top-left" icon={<Star1 size={12} variant="Bold" />}>Featured</CardTag>}
              />
              <CardHeadline title="Premium Headphones" subtitle="Wireless • Noise Cancelling" />
              <CardSupportingText>
                Experience crystal-clear sound with our latest premium headphones featuring active noise cancellation.
              </CardSupportingText>
              <CardActions>
                <Button size="sm">Buy Now</Button>
                <Button size="sm" variant="outline">Learn More</Button>
              </CardActions>
            </Card>

            {/* Article Card */}
            <Card type="stacked">
              <CardHeader 
                leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                title="Design System Updates"
                description="2 hours ago"
                trailing={<More size={24} className="text-neutral-500 cursor-pointer hover:text-neutral-700" />}
              />
              <CardMedia 
                ratio="2:1" 
                src="https://picsum.photos/seed/article/400/200" 
                alt="Article cover"
              />
              <CardHeadline title="Building Scalable Components" subtitle="Best practices for design systems" />
              <CardSupportingText>
                Learn how to create flexible, maintainable components that scale across your entire product.
              </CardSupportingText>
              <CardActions>
                <Button size="sm">Read Article</Button>
              </CardActions>
            </Card>

            {/* Compact List Items */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Horizontal Cards (List)</h3>
              <Card type="horizontal">
                <CardMedia 
                  ratio="1:1" 
                  src="https://picsum.photos/seed/item1/80/80"
                  alt="Item"
                />
                <CardHeadline>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Order #12345</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Delivered</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">$99.00</p>
                </CardHeadline>
                <CardLink href="#">View</CardLink>
              </Card>
              <Card type="horizontal">
                <CardMedia 
                  ratio="1:1" 
                  src="https://picsum.photos/seed/item2/80/80"
                  alt="Item"
                />
                <CardHeadline>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Order #12346</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">In Transit</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">$149.00</p>
                </CardHeadline>
                <CardLink href="#">Track</CardLink>
              </Card>
            </div>

            {/* Simple Card */}
            <Card type="stacked">
              <CardHeadline title="Simple Card" subtitle="Without header or media" />
              <CardSupportingText>
                Cards can be as simple or complex as needed. Use only the sub-components you require.
              </CardSupportingText>
              <CardActions align="end">
                <Button size="sm" variant="tertiary">Dismiss</Button>
                <Button size="sm">Confirm</Button>
              </CardActions>
            </Card>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <Card type="stacked" className="w-full">
              <CardMedia ratio="2:1" tag={<CardTag position="top-left">New</CardTag>} />
              <CardHeadline title="Mobile Card" subtitle="Optimized for small screens" />
              <CardActions>
                <Button size="sm" className="flex-1">Action</Button>
              </CardActions>
            </Card>
          }
          tablet={
            <Card type="stacked" className="w-full max-w-[343px]">
              <CardHeader 
                leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                title="Tablet Card"
                description="Standard width"
              />
              <CardMedia ratio="2:1" />
              <CardHeadline title="Title here" subtitle="Subtitle text" />
              <CardActions>
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">Secondary</Button>
              </CardActions>
            </Card>
          }
          desktop={
            <div className="flex gap-4">
              <Card type="stacked" className="w-[343px]">
                <CardHeader 
                  leading={<IconContainer size="md" status="info" icon={<InfoCircle variant="Bold" size={20} />} />}
                  title="Desktop Card"
                  description="Full featured"
                  trailing={<More size={24} className="text-neutral-500" />}
                />
                <CardMedia ratio="2:1" tag={<CardTag position="top-left">Featured</CardTag>} />
                <CardHeadline title="Title here" subtitle="Subtitle" />
                <CardSupportingText>
                  Full descriptive content for desktop users.
                </CardSupportingText>
                <CardActions>
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="outline">Secondary</Button>
                </CardActions>
              </Card>
              <div className="flex flex-col gap-3">
                <Card type="horizontal" className="w-[300px]">
                  <CardMedia ratio="1:1" />
                  <CardHeadline>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Horizontal 1</p>
                    <p className="text-xs text-neutral-500">Subtitle</p>
                  </CardHeadline>
                  <CardLink href="#">View</CardLink>
                </Card>
                <Card type="horizontal" className="w-[300px]">
                  <CardMedia ratio="1:1" />
                  <CardHeadline>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Horizontal 2</p>
                    <p className="text-xs text-neutral-500">Subtitle</p>
                  </CardHeadline>
                  <CardLink href="#">View</CardLink>
                </Card>
              </div>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use stacked cards for rich content with images', 
              textAr: 'استخدم البطاقات المكدسة للمحتوى الغني بالصور' 
            },
            { 
              text: 'Use horizontal cards for compact list items', 
              textAr: 'استخدم البطاقات الأفقية لعناصر القائمة المضغوطة' 
            },
            { 
              text: 'Include clear titles that describe the card content', 
              textAr: 'أضف عناوين واضحة تصف محتوى البطاقة' 
            },
            { 
              text: 'Use CardTag to highlight important status or labels', 
              textAr: 'استخدم CardTag لإبراز الحالة أو العلامات المهمة' 
            },
          ]}
          donts={[
            { 
              text: "Don't nest cards within cards", 
              textAr: 'لا تضع بطاقات داخل بطاقات' 
            },
            { 
              text: "Don't overload cards with too many actions", 
              textAr: 'لا تحمل البطاقات بإجراءات كثيرة' 
            },
            { 
              text: "Don't use horizontal cards for content-heavy items", 
              textAr: 'لا تستخدم البطاقات الأفقية للعناصر ذات المحتوى الكثيف' 
            },
            { 
              text: "Don't mix card types in the same list", 
              textAr: 'لا تخلط بين أنواع البطاقات في نفس القائمة' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
