'use client';

import { useState } from 'react';
import { User } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { Avatar, AvatarGroup, AvatarSize, AvatarShape, AvatarGroupSize } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function AvatarsPage() {
  const component = getComponentBySlug('data-display', 'avatars');
  if (!component) return null;

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    size: 'md',
    shape: 'circle',
    content: 'initials',
    showPlaceholder: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const controls: PlaygroundControl[] = [
    {
      name: 'size',
      nameAr: 'الحجم',
      type: 'select',
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
      name: 'shape',
      nameAr: 'الشكل',
      type: 'select',
      options: [
        { value: 'circle', label: 'Circle', labelAr: 'دائري' },
        { value: 'square', label: 'Square', labelAr: 'مربع' },
      ],
      defaultValue: 'circle',
    },
    {
      name: 'content',
      nameAr: 'المحتوى',
      type: 'select',
      options: [
        { value: 'initials', label: 'Initials', labelAr: 'الأحرف الأولى' },
        { value: 'placeholder', label: 'Placeholder', labelAr: 'عنصر نائب' },
        { value: 'image', label: 'Image', labelAr: 'صورة' },
      ],
      defaultValue: 'initials',
    },
  ];

  // Demo images
  const demoImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  ];

  const code = `import { Avatar, AvatarGroup } from '@singular/ui';

// Single Avatar with initials
<Avatar 
  fallback="JD" 
  size="${controlValues.size}" 
  shape="${controlValues.shape}" 
/>

// Avatar with image
<Avatar 
  src="/avatar.jpg" 
  alt="John Doe" 
  size="md" 
/>

// Avatar with placeholder icon
<Avatar 
  showPlaceholder 
  size="md" 
/>

// Avatar Group
<AvatarGroup max={4} size="md">
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
  <Avatar src="/user5.jpg" />
</AvatarGroup>

// Avatar Group with trailing text
<AvatarGroup 
  max={3} 
  size="sm" 
  showTrailingText 
  trailingText="2.1K followers"
>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
</AvatarGroup>`;

  const renderPlaygroundAvatar = () => {
    const content = controlValues.content as string;
    const size = controlValues.size as AvatarSize;
    const shape = controlValues.shape as AvatarShape;

    if (content === 'image') {
      return <Avatar src={demoImages[0]} alt="User" size={size} shape={shape} />;
    }
    if (content === 'placeholder') {
      return <Avatar size={size} shape={shape} showPlaceholder />;
    }
    return <Avatar fallback="JD" size={size} shape={shape} />;
  };

  return (
    <ComponentDocTemplate 
      title={component.name} 
      titleAr={component.nameAr} 
      description={component.description} 
      descriptionAr={component.descriptionAr} 
      category="Data Display" 
      categorySlug="data-display" 
      icon={<User className="w-6 h-6" variant="Bold" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="flex flex-col items-center gap-6">
            {renderPlaygroundAvatar()}
          </div>
        </LivePlayground>

        {/* Size Variants */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Size Variants
          </h3>
          <div className="card p-6">
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="XS" size="xs" />
                <span className="text-xs text-neutral-500">xs (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="SM" size="sm" />
                <span className="text-xs text-neutral-500">sm (32px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="MD" size="md" />
                <span className="text-xs text-neutral-500">md (40px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="LG" size="lg" />
                <span className="text-xs text-neutral-500">lg (48px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="XL" size="xl" />
                <span className="text-xs text-neutral-500">xl (56px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar fallback="2X" size="2xl" />
                <span className="text-xs text-neutral-500">2xl (64px)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Shape Variants */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Shape Variants
          </h3>
          <div className="card p-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Circle</span>
                <div className="flex gap-3">
                  <Avatar fallback="JD" size="sm" shape="circle" />
                  <Avatar src={demoImages[0]} size="sm" shape="circle" />
                  <Avatar size="sm" shape="circle" showPlaceholder />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Square</span>
                <div className="flex gap-3">
                  <Avatar fallback="JD" size="sm" shape="square" />
                  <Avatar src={demoImages[1]} size="sm" shape="square" />
                  <Avatar size="sm" shape="square" showPlaceholder />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Variants */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Content Variants
          </h3>
          <div className="card p-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Image</span>
                <Avatar src={demoImages[2]} alt="Sarah" size="lg" />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Initials</span>
                <Avatar fallback="Sarah Connor" size="lg" />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Placeholder</span>
                <Avatar size="lg" showPlaceholder />
              </div>
            </div>
          </div>
        </section>

        {/* Avatar Group Sizes */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Avatar Group Sizes
          </h3>
          <div className="card p-6 space-y-6">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-sm text-neutral-500 w-16">{size}</span>
                <AvatarGroup max={4} size={size}>
                  {demoImages.map((src, idx) => (
                    <Avatar key={idx} src={src} alt={`User ${idx + 1}`} />
                  ))}
                </AvatarGroup>
              </div>
            ))}
          </div>
        </section>

        {/* Avatar Group with Trailing Text */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Avatar Group with Trailing Text
          </h3>
          <div className="card p-6 space-y-6">
            <AvatarGroup 
              max={3} 
              size="sm" 
              showTrailingText 
              trailingText="2.1K followers"
              trailingTextAr="2.1 ألف متابع"
            >
              {demoImages.slice(0, 5).map((src, idx) => (
                <Avatar key={idx} src={src} alt={`User ${idx + 1}`} />
              ))}
            </AvatarGroup>

            <AvatarGroup 
              max={4} 
              size="md" 
              showTrailingText 
              trailingText="12 team members"
              trailingTextAr="12 عضو في الفريق"
            >
              {demoImages.map((src, idx) => (
                <Avatar key={idx} src={src} alt={`User ${idx + 1}`} />
              ))}
            </AvatarGroup>
          </div>
        </section>

        {/* Real-World Examples */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Real-World Examples
          </h3>
          
          {/* User Profile Card */}
          <div className="card p-6 mb-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-4">User Profile Card</h4>
            <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl max-w-sm">
              <Avatar src={demoImages[0]} alt="John Doe" size="xl" />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">John Doe</p>
                <p className="text-sm text-neutral-500">Product Designer</p>
                <p className="text-xs text-neutral-400 mt-1">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Comment Thread */}
          <div className="card p-6 mb-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-4">Comment Thread</h4>
            <div className="space-y-4 max-w-md">
              <div className="flex gap-3">
                <Avatar src={demoImages[1]} alt="Sarah" size="sm" />
                <div className="flex-1 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Sarah</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">This looks great! Love the design.</p>
                </div>
              </div>
              <div className="flex gap-3 ps-8">
                <Avatar src={demoImages[2]} alt="Mike" size="sm" />
                <div className="flex-1 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Mike</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Thanks Sarah! 🎉</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-4">Team Members</h4>
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl max-w-sm">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">Design Team</p>
                <p className="text-sm text-neutral-500">Working on the new dashboard</p>
              </div>
              <AvatarGroup max={3} size="sm">
                {demoImages.slice(0, 5).map((src, idx) => (
                  <Avatar key={idx} src={src} alt={`Member ${idx + 1}`} />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex items-center gap-3">
              <Avatar src={demoImages[0]} size="sm" />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-neutral-500">Designer</p>
              </div>
            </div>
          }
          tablet={
            <div className="flex items-center gap-4">
              <Avatar src={demoImages[0]} size="md" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-neutral-500">Product Designer</p>
              </div>
            </div>
          }
          desktop={
            <div className="flex items-center gap-4">
              <Avatar src={demoImages[0]} size="lg" />
              <div>
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-neutral-500">Senior Product Designer</p>
                <p className="text-sm text-neutral-400">San Francisco, CA</p>
              </div>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use for user representation and profiles', textAr: 'استخدم لتمثيل المستخدم والملفات الشخصية' },
            { text: 'Provide meaningful fallback initials from names', textAr: 'وفر أحرف أولى ذات معنى من الأسماء' },
            { text: 'Use AvatarGroup for showing multiple users', textAr: 'استخدم مجموعة الأفاتار لعرض مستخدمين متعددين' },
            { text: 'Keep avatar sizes consistent within a context', textAr: 'حافظ على اتساق أحجام الأفاتار في نفس السياق' },
          ]}
          donts={[
            { text: "Don't use generic icons as fallback", textAr: 'لا تستخدم أيقونات عامة كبديل' },
            { text: "Don't mix different sizes in the same group", textAr: 'لا تخلط أحجام مختلفة في نفس المجموعة' },
            { text: "Don't use low-quality or stretched images", textAr: 'لا تستخدم صور منخفضة الجودة أو ممددة' },
            { text: "Don't exceed max of 5-6 avatars in a group", textAr: 'لا تتجاوز 5-6 أفاتارات في المجموعة' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
