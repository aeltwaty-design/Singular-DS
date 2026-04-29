'use client';

import { useState } from 'react';
import { 
  Message,
  TickCircle,
  InfoCircle,
  Warning2,
  Danger,
  Trash,
  Image as ImageIcon
} from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { getComponentBySlug } from '@/data/components';
import { 
  InlineBottomSheet,
  BottomSheet,
  Button
} from '@/components/ui';
import type { BottomSheetStatus, BottomSheetArtwork, BottomSheetAlignment } from '@/components/ui';

export default function BottomSheetPage() {
  const component = getComponentBySlug('feedback', 'bottom-sheet');
  if (!component) return null;

  // Playground state
  const [status, setStatus] = useState<BottomSheetStatus>('success');
  const [artwork, setArtwork] = useState<BottomSheetArtwork>('icon');
  const [alignment, setAlignment] = useState<BottomSheetAlignment>('centered');
  const [showArtwork, setShowArtwork] = useState(true);
  const [showActions, setShowActions] = useState(true);

  // Demo state for live bottom sheet
  const [demoOpen, setDemoOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const sampleImageUrl = 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop';

  const code = `import { BottomSheet } from '@singular/ui';

// Basic usage
<BottomSheet
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Successful message"
  description="Write here a text description of the message."
  status="${status}"
  artwork="${artwork}"
  alignment="${alignment}"
  showArtwork={${showArtwork}}
  showActions={${showActions}}
  onPrimaryClick={() => console.log('Confirmed')}
  onSecondaryClick={() => setIsOpen(false)}
/>`;

  const controls: PlaygroundControl[] = [
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'success', label: 'Success' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
      ],
      defaultValue: 'success',
    },
    {
      name: 'artwork',
      type: 'select',
      options: [
        { value: 'icon', label: 'Icon' },
        { value: 'thumbnail', label: 'Thumbnail' },
        { value: 'image', label: 'Image' },
      ],
      defaultValue: 'icon',
    },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { value: 'centered', label: 'Centered' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      defaultValue: 'centered',
    },
    {
      name: 'showArtwork',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showActions',
      type: 'boolean',
      defaultValue: true,
    },
  ];

  const handleControlChange = (name: string, value: string | boolean | number) => {
    switch (name) {
      case 'status':
        setStatus(value as BottomSheetStatus);
        break;
      case 'artwork':
        setArtwork(value as BottomSheetArtwork);
        break;
      case 'alignment':
        setAlignment(value as BottomSheetAlignment);
        break;
      case 'showArtwork':
        setShowArtwork(value as boolean);
        break;
      case 'showActions':
        setShowActions(value as boolean);
        break;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'success': return 'Successful message';
      case 'info': return 'Info message';
      case 'warning': return 'Warning message';
      case 'danger': return 'Danger message';
    }
  };

  const getDescription = () => {
    if (status === 'danger') {
      return 'Are you sure to delete this? It cannot be rolled back';
    }
    return 'Write here a text description of the message that we want to inform the user.';
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Feedback"
      categorySlug="feedback"
      icon={<Message className="w-6 h-6" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          onControlChange={handleControlChange}
          controlValues={{
            status,
            artwork,
            alignment,
            showArtwork,
            showActions,
          }}
        >
          <div className="flex items-end justify-center min-h-[400px] pb-4">
            <InlineBottomSheet
              title={getTitle()}
              description={getDescription()}
              status={status}
              artwork={artwork}
              alignment={alignment}
              showArtwork={showArtwork}
              showActions={showActions}
              artworkSrc={artwork !== 'icon' ? sampleImageUrl : undefined}
              showCloseButton={true}
            />
          </div>
        </LivePlayground>

        {/* Status Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Status Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Bottom sheets can display different status types with corresponding illustrations and button styles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['success', 'info', 'warning', 'danger'] as BottomSheetStatus[]).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 capitalize mb-2">
                  {s}
                </h3>
                <InlineBottomSheet
                  title={s === 'success' ? 'Successful message' : s === 'info' ? 'Info message' : s === 'warning' ? 'Warning message' : 'Danger message'}
                  description={s === 'danger' ? 'Are you sure to delete this? It cannot be rolled back' : 'Do you want to save these changes?'}
                  status={s}
                  artwork="icon"
                  alignment="centered"
                  showArtwork={true}
                  showActions={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Artwork Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Artwork Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Choose between status icons, thumbnail images, or square images.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Icon */}
            <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                Icon (48px)
              </h3>
              <InlineBottomSheet
                title="Title goes here"
                description="Write here a text description of the message."
                status="success"
                artwork="icon"
                alignment="centered"
                showArtwork={true}
                showActions={true}
              />
            </div>

            {/* Image */}
            <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                Image (72px)
              </h3>
              <InlineBottomSheet
                title="Title goes here"
                description="Write here a text description of the message."
                status="success"
                artwork="image"
                alignment="centered"
                showArtwork={true}
                showActions={true}
                artworkSrc={sampleImageUrl}
              />
            </div>

            {/* Thumbnail */}
            <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                Thumbnail (Full width)
              </h3>
              <InlineBottomSheet
                title="Title goes here"
                description="Write here a text description of the message."
                status="success"
                artwork="thumbnail"
                alignment="centered"
                showArtwork={true}
                showActions={true}
                artworkSrc={sampleImageUrl}
              />
            </div>
          </div>
        </section>

        {/* Alignment Variants */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Alignment Variants
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Content can be aligned to the center, left, or right.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['centered', 'left', 'right'] as BottomSheetAlignment[]).map((a) => (
              <div key={a} className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 capitalize mb-2">
                  {a}
                </h3>
                <InlineBottomSheet
                  title="Title goes here"
                  description="Write here a text description of the message."
                  status="success"
                  artwork="icon"
                  alignment={a}
                  showArtwork={true}
                  showActions={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Live Demo */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Live Demo
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Click the buttons below to see the Bottom Sheet in action with animations.
          </p>
          
          <div className="flex flex-wrap gap-4 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
            <Button onClick={() => setDemoOpen(true)}>
              Open Success Sheet
            </Button>
            <Button variant="outline" onClick={() => setDeleteOpen(true)}>
              <Trash size={18} className="mr-2" />
              Delete Item
            </Button>
          </div>

          {/* Success Sheet */}
          <BottomSheet
            open={demoOpen}
            onClose={() => setDemoOpen(false)}
            title="Changes Saved!"
            description="Your changes have been saved successfully. You can continue editing or close this dialog."
            status="success"
            artwork="icon"
            alignment="centered"
            showArtwork={true}
            showActions={true}
            primaryLabel="Continue"
            secondaryLabel="Close"
            onPrimaryClick={() => setDemoOpen(false)}
            onSecondaryClick={() => setDemoOpen(false)}
          />

          {/* Delete Confirmation */}
          <BottomSheet
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            title="Delete this item?"
            description="This action cannot be undone. All associated data will be permanently removed."
            status="danger"
            artwork="icon"
            alignment="centered"
            showArtwork={true}
            showActions={true}
            onPrimaryClick={() => {
              // Handle delete
              setDeleteOpen(false);
            }}
            onSecondaryClick={() => setDeleteOpen(false)}
          />
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="flex items-end justify-center h-64">
              <InlineBottomSheet
                title="Mobile View"
                description="Bottom sheets are optimized for mobile interactions."
                status="info"
                artwork="icon"
                alignment="centered"
                showArtwork={true}
                showActions={true}
              />
            </div>
          }
          tablet={
            <div className="flex items-end justify-center h-64">
              <InlineBottomSheet
                title="Tablet View"
                description="Works great on tablet devices too."
                status="success"
                artwork="icon"
                alignment="centered"
                showArtwork={true}
                showActions={true}
              />
            </div>
          }
          desktop={
            <p className="text-center text-neutral-500 py-8">
              Consider using Dialogue component for desktop interfaces.
            </p>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { 
              text: 'Use for mobile-first confirmations and actions', 
              textAr: 'استخدم للتأكيدات والإجراءات على الجوال أولاً' 
            },
            { 
              text: 'Include clear action buttons with descriptive labels', 
              textAr: 'أضف أزرار إجراءات واضحة مع تسميات وصفية' 
            },
            { 
              text: 'Use appropriate status type to convey message intent', 
              textAr: 'استخدم نوع الحالة المناسب لنقل هدف الرسالة' 
            },
            { 
              text: 'Provide a way to dismiss (close button or backdrop tap)', 
              textAr: 'وفر طريقة للإغلاق (زر إغلاق أو النقر على الخلفية)' 
            },
          ]}
          donts={[
            { 
              text: 'Don\'t use on desktop without considering Dialogue', 
              textAr: 'لا تستخدم على سطح المكتب دون النظر في استخدام الحوار' 
            },
            { 
              text: 'Don\'t stack multiple bottom sheets', 
              textAr: 'لا تكدس عدة أوراق سفلية' 
            },
            { 
              text: 'Don\'t use for complex forms or long content', 
              textAr: 'لا تستخدم للنماذج المعقدة أو المحتوى الطويل' 
            },
            { 
              text: 'Don\'t forget to handle the escape key for accessibility', 
              textAr: 'لا تنسَ التعامل مع مفتاح Escape لسهولة الوصول' 
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
