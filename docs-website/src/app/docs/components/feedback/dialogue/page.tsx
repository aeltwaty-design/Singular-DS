'use client';

import { useState } from 'react';
import { MessageQuestion } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { InlineDialogue } from '@/components/ui/feedback/Dialogue';
import type { DialogueType, DialogueStatus, DialogueAlignment, DialogueBreakpoint } from '@/components/ui/feedback/Dialogue';
import { getComponentBySlug } from '@/data/components';

export default function DialoguePage() {
  const component = getComponentBySlug('feedback', 'dialogue');
  
  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    type: 'icon',
    status: 'success',
    alignment: 'centered',
    breakpoint: 'desktop',
    showIcon: true,
    hideCancel: false,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  // Extract values
  const dialogueType = controlValues.type as DialogueType;
  const dialogueStatus = controlValues.status as DialogueStatus;
  const dialogueAlignment = controlValues.alignment as DialogueAlignment;
  const dialogueBreakpoint = controlValues.breakpoint as DialogueBreakpoint;
  const showIcon = controlValues.showIcon as boolean;
  const hideCancel = controlValues.hideCancel as boolean;

  if (!component) return null;

  // Control definitions
  const controls = [
    {
      name: 'type',
      nameAr: 'النوع',
      type: 'select' as const,
      options: [
        { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
        { value: 'media', label: 'Media', labelAr: 'وسائط' },
      ],
      defaultValue: 'icon',
    },
    {
      name: 'status',
      nameAr: 'الحالة',
      type: 'select' as const,
      options: [
        { value: 'basic', label: 'Basic', labelAr: 'أساسي' },
        { value: 'success', label: 'Success', labelAr: 'نجاح' },
        { value: 'info', label: 'Info', labelAr: 'معلومات' },
        { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
        { value: 'danger', label: 'Danger', labelAr: 'خطر' },
      ],
      defaultValue: 'success',
    },
    {
      name: 'alignment',
      nameAr: 'المحاذاة',
      type: 'select' as const,
      options: [
        { value: 'centered', label: 'Centered', labelAr: 'وسط' },
        { value: 'stacked', label: 'Stacked', labelAr: 'مكدس' },
      ],
      defaultValue: 'centered',
    },
    {
      name: 'breakpoint',
      nameAr: 'نقطة التوقف',
      type: 'select' as const,
      options: [
        { value: 'desktop', label: 'Desktop (400px)', labelAr: 'سطح المكتب (400px)' },
        { value: 'mobile', label: 'Mobile (343px)', labelAr: 'جوال (343px)' },
      ],
      defaultValue: 'desktop',
    },
    {
      name: 'showIcon',
      nameAr: 'إظهار الأيقونة',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'hideCancel',
      nameAr: 'إخفاء زر الإلغاء',
      type: 'boolean' as const,
      defaultValue: false,
    },
  ];

  const code = `import { Dialogue } from '@singular/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialogue
      </Button>
      
      <Dialogue
        open={isOpen}
        type="${dialogueType}"
        status="${dialogueStatus}"
        alignment="${dialogueAlignment}"
        breakpoint="${dialogueBreakpoint}"
        title="${dialogueStatus === 'danger' ? 'Delete Item?' : 'Action Completed'}"
        description="Your message description goes here."
        confirmLabel="${dialogueStatus === 'danger' ? 'Delete' : 'Confirm'}"
        cancelLabel="Cancel"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}`;

  // Determine if we should show icon based on type and showIcon toggle
  const shouldShowIcon = dialogueType === 'icon' && showIcon && dialogueStatus !== 'basic';

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Feedback"
      categorySlug="feedback"
      icon={<MessageQuestion size={24} variant="Linear" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="flex justify-center py-4">
            <InlineDialogue
              type={dialogueType}
              status={shouldShowIcon ? dialogueStatus : 'basic'}
              alignment={dialogueAlignment}
              breakpoint={dialogueBreakpoint}
              title={dialogueStatus === 'danger' ? 'Delete Item?' : dialogueStatus === 'success' ? 'Successful message' : dialogueStatus === 'info' ? 'Info message' : dialogueStatus === 'warning' ? 'Warning message' : 'Confirm Action'}
              description={
                dialogueStatus === 'danger' 
                  ? 'Are you sure to delete this? It cannot be rolled back'
                  : 'Write here a text description of the message that we want to inform the user.'
              }
              mediaSrc={dialogueType === 'media' ? 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=220&fit=crop' : undefined}
              confirmLabel={dialogueStatus === 'danger' ? 'Delete' : 'Confirm'}
              cancelLabel="Cancel"
              hideCancel={hideCancel}
            />
          </div>
        </LivePlayground>

        {/* Status Variants Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Status Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Different status variants communicate the nature of the dialogue to users.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Basic */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Basic (No Icon)
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="basic"
                  title="Confirm Action"
                  description="Write here a text description of the message that we want to inform the user."
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Success */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Success
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="success"
                  title="Successful message"
                  description="Write here a text description of the message that we want to inform the user."
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Info
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="info"
                  title="Info message"
                  description="Do you want to save these changes?"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Warning */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Warning
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="warning"
                  title="Warning message"
                  description="Do you want to save these changes?"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Danger */}
            <div className="card p-6 lg:col-span-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Danger (Destructive)
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="danger"
                  title="Danger message"
                  description="Are you sure to delete this? It cannot be rolled back"
                  confirmLabel="Delete"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Type Variants Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Type Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose between icon-based or media-based dialogues depending on content needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Icon Type */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Icon Type
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="success"
                  title="Payment Successful"
                  description="Your payment has been processed and your order is confirmed."
                  confirmLabel="View Order"
                  cancelLabel="Close"
                />
              </div>
            </div>
            
            {/* Media Type */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Media Type
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="media"
                  status="success"
                  title="Title goes here"
                  description="Write here a text description of the message that we want to inform the user."
                  mediaSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=220&fit=crop"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Alignment Variants */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Alignment Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Centered alignment for general use, stacked (left-aligned) for RTL support or specific design needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Centered */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Centered (Default)
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="info"
                  alignment="centered"
                  title="Centered Alignment"
                  description="Content is centered both horizontally and vertically."
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Stacked */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Stacked (Left-aligned)
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="info"
                  alignment="stacked"
                  title="Stacked Alignment"
                  description="Content is aligned to the start, useful for RTL layouts."
                  confirmLabel="Confirm"
                  cancelLabel="cancel"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Breakpoint Variants */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Breakpoint Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Responsive sizing for desktop (400px) and mobile (343px) screens.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Desktop */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Desktop (400px)
              </h4>
              <div className="flex justify-center overflow-x-auto">
                <InlineDialogue
                  type="icon"
                  status="success"
                  breakpoint="desktop"
                  title="Desktop Dialogue"
                  description="This dialogue is optimized for desktop screens at 400px width."
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
            
            {/* Mobile */}
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                Mobile (343px)
              </h4>
              <div className="flex justify-center">
                <InlineDialogue
                  type="icon"
                  status="success"
                  breakpoint="mobile"
                  title="Mobile Dialogue"
                  description="This dialogue is optimized for mobile screens at 343px width."
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <InlineDialogue
              type="icon"
              status="warning"
              breakpoint="mobile"
              title="Unsaved Changes"
              description="You have unsaved changes. Save before leaving?"
              confirmLabel="Save"
              cancelLabel="Discard"
            />
          }
          tablet={
            <InlineDialogue
              type="media"
              status="success"
              breakpoint="desktop"
              title="Welcome Back!"
              description="Great to see you again. Check out what's new."
              mediaSrc="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=220&fit=crop"
              confirmLabel="Explore"
              cancelLabel="Skip"
            />
          }
          desktop={
            <InlineDialogue
              type="icon"
              status="danger"
              breakpoint="desktop"
              title="Delete Account?"
              description="This will permanently delete your account and all associated data. This action cannot be undone."
              confirmLabel="Delete Account"
              cancelLabel="Keep Account"
            />
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use for important confirmations and decisions', textAr: 'استخدم للتأكيدات والقرارات المهمة' },
            { text: 'Use danger status for destructive actions', textAr: 'استخدم حالة الخطر للإجراءات التدميرية' },
            { text: 'Provide clear and concise action labels', textAr: 'وفر تسميات إجراءات واضحة وموجزة' },
            { text: 'Use appropriate breakpoint for the target device', textAr: 'استخدم نقطة التوقف المناسبة للجهاز المستهدف' },
            { text: 'Allow users to dismiss via overlay click or escape key', textAr: 'اسمح للمستخدمين بالإغلاق عبر النقر على الخلفية أو مفتاح الهروب' },
          ]}
          donts={[
            { text: "Don't use for simple messages or notifications", textAr: 'لا تستخدم للرسائل البسيطة أو الإشعارات' },
            { text: "Don't stack multiple dialogues on top of each other", textAr: 'لا تضع عدة حوارات فوق بعضها' },
            { text: "Don't use vague labels like 'OK' or 'Yes'", textAr: 'لا تستخدم تسميات غامضة مثل "موافق" أو "نعم"' },
            { text: "Don't use success status for destructive actions", textAr: 'لا تستخدم حالة النجاح للإجراءات التدميرية' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
