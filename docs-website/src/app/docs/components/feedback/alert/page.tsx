'use client';

import { useState } from 'react';
import { Notification } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { Alert } from '@/components/ui/feedback/Alert';
import type { AlertStatus, AlertStyle, AlertBreakpoint } from '@/components/ui/feedback/Alert';
import { getComponentBySlug } from '@/data/components';

export default function AlertPage() {
  const component = getComponentBySlug('feedback', 'alert');

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    status: 'default',
    style: 'rounded',
    breakpoint: 'web',
    showIcon: true,
    showDescription: true,
    showAction: false,
    dismissible: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  // Extract values
  const status = controlValues.status as AlertStatus;
  const style = controlValues.style as AlertStyle;
  const breakpoint = controlValues.breakpoint as AlertBreakpoint;
  const showIcon = controlValues.showIcon as boolean;
  const showDescription = controlValues.showDescription as boolean;
  const showAction = controlValues.showAction as boolean;
  const dismissible = controlValues.dismissible as boolean;

  if (!component) return null;

  // Control definitions
  const controls = [
    {
      name: 'status',
      nameAr: 'الحالة',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Default', labelAr: 'افتراضي' },
        { value: 'danger', label: 'Danger', labelAr: 'خطر' },
        { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
        { value: 'success', label: 'Success', labelAr: 'نجاح' },
        { value: 'grey', label: 'Grey', labelAr: 'رمادي' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'style',
      nameAr: 'النمط',
      type: 'select' as const,
      options: [
        { value: 'rounded', label: 'Rounded', labelAr: 'مستدير' },
        { value: 'sharp', label: 'Sharp', labelAr: 'حاد' },
      ],
      defaultValue: 'rounded',
    },
    {
      name: 'breakpoint',
      nameAr: 'نقطة التوقف',
      type: 'select' as const,
      options: [
        { value: 'web', label: 'Web', labelAr: 'ويب' },
        { value: 'mobile', label: 'Mobile', labelAr: 'جوال' },
      ],
      defaultValue: 'web',
    },
    {
      name: 'showIcon',
      nameAr: 'إظهار الأيقونة',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'showDescription',
      nameAr: 'إظهار الوصف',
      type: 'boolean' as const,
      defaultValue: true,
    },
    {
      name: 'showAction',
      nameAr: 'إظهار الإجراء',
      type: 'boolean' as const,
      defaultValue: false,
    },
    {
      name: 'dismissible',
      nameAr: 'قابل للإغلاق',
      type: 'boolean' as const,
      defaultValue: true,
    },
  ];

  const code = `import { Alert } from '@singular/ui';

<Alert
  status="${status}"
  style="${style}"
  breakpoint="${breakpoint}"
  title="Title Here"
  ${showDescription ? 'description="Description for title goes here"' : ''}
  showIcon={${showIcon}}
  ${showAction ? 'actionLabel="Text Here"\n  onAction={() => {}}' : ''}
  dismissible={${dismissible}}
  onDismiss={() => {}}
/>`;

  // Status titles for showcase
  const statusTitles: Record<AlertStatus, string> = {
    default: 'Information',
    danger: 'Error occurred',
    warning: 'Warning notice',
    success: 'Operation successful',
    grey: 'Neutral message',
  };

  const statusDescriptions: Record<AlertStatus, string> = {
    default: 'This is an informational message for the user.',
    danger: 'Something went wrong. Please try again.',
    warning: 'Please review before proceeding.',
    success: 'Your action was completed successfully.',
    grey: 'This is a neutral notification message.',
  };

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Feedback"
      categorySlug="feedback"
      icon={<Notification size={24} variant="Linear" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="max-w-2xl mx-auto">
            <Alert
              status={status}
              style={style}
              breakpoint={breakpoint}
              title={statusTitles[status]}
              description={showDescription ? statusDescriptions[status] : undefined}
              showIcon={showIcon}
              actionLabel={showAction ? 'Text Here' : undefined}
              onAction={showAction ? () => {} : undefined}
              dismissible={dismissible}
            />
          </div>
        </LivePlayground>

        {/* Status Variants Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Status Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Different status variants communicate the nature of the message to users.
          </p>

          <div className="space-y-4">
            <Alert
              status="default"
              title="Information"
              description="This is an informational message for the user."
            />
            <Alert
              status="danger"
              title="Error occurred"
              description="Something went wrong. Please try again."
            />
            <Alert
              status="warning"
              title="Warning notice"
              description="Please review before proceeding."
            />
            <Alert
              status="success"
              title="Operation successful"
              description="Your action was completed successfully."
            />
            <Alert
              status="grey"
              title="Neutral message"
              description="This is a neutral notification message."
            />
          </div>
        </section>

        {/* Style Variants Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Style Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose between rounded or sharp corners based on your design needs.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Rounded (Default)
              </h4>
              <Alert
                status="success"
                style="rounded"
                title="Rounded corners"
                description="This alert has rounded corners for a softer look."
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Sharp
              </h4>
              <Alert
                status="success"
                style="sharp"
                title="Sharp corners"
                description="This alert has sharp corners for a more formal look."
              />
            </div>
          </div>
        </section>

        {/* Breakpoint Variants Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Breakpoint Variants
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Responsive sizing for web and mobile screens.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Web (Larger)
              </h4>
              <Alert
                status="default"
                breakpoint="web"
                title="Web breakpoint"
                description="Larger icons and text for desktop screens."
                actionLabel="Action"
                onAction={() => {}}
                dismissible
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Mobile (Smaller)
              </h4>
              <Alert
                status="default"
                breakpoint="mobile"
                title="Mobile breakpoint"
                description="Smaller icons and text for mobile screens."
                actionLabel="Action"
                onAction={() => {}}
                dismissible
              />
            </div>
          </div>
        </section>

        {/* With Action Button Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            With Action Button
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Alerts can include an action button for user interactions.
          </p>

          <div className="space-y-4 max-w-2xl">
            <Alert
              status="warning"
              title="Session expiring soon"
              description="Your session will expire in 5 minutes."
              actionLabel="Extend Session"
              onAction={() => {}}
              dismissible
            />
            <Alert
              status="danger"
              title="Payment failed"
              description="We couldn't process your payment. Please update your payment method."
              actionLabel="Update Payment"
              onAction={() => {}}
            />
          </div>
        </section>

        {/* Minimal Alerts Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Minimal Alerts
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Alerts can be shown without icons or descriptions for minimal display.
          </p>

          <div className="space-y-4 max-w-2xl">
            <Alert
              status="success"
              title="Changes saved successfully"
              showIcon={false}
            />
            <Alert
              status="default"
              title="New feature available"
              showIcon={false}
              actionLabel="Learn More"
              onAction={() => {}}
            />
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <Alert
              status="warning"
              breakpoint="mobile"
              title="Update available"
              description="A new version is ready to install."
              dismissible
            />
          }
          tablet={
            <Alert
              status="success"
              title="Profile updated"
              description="Your changes have been saved successfully."
              actionLabel="View Profile"
              onAction={() => {}}
              dismissible
            />
          }
          desktop={
            <Alert
              status="default"
              title="Pro Tip"
              description="You can customize this alert with various options and actions. Try different status variants and styles to match your design."
              actionLabel="Learn More"
              onAction={() => {}}
              dismissible
            />
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use appropriate status for context (danger for errors, success for confirmations)', textAr: 'استخدم الحالة المناسبة للسياق (خطر للأخطاء، نجاح للتأكيدات)' },
            { text: 'Keep alert messages concise and actionable', textAr: 'اجعل رسائل التنبيه موجزة وقابلة للتنفيذ' },
            { text: 'Provide a way to dismiss non-critical alerts', textAr: 'وفر طريقة لإغلاق التنبيهات غير الحرجة' },
            { text: 'Use action buttons for immediate user actions', textAr: 'استخدم أزرار الإجراءات للإجراءات الفورية' },
            { text: 'Use mobile breakpoint for smaller screens', textAr: 'استخدم نقطة توقف الجوال للشاشات الأصغر' },
          ]}
          donts={[
            { text: "Don't overuse alerts - reserve them for important messages", textAr: 'لا تفرط في استخدام التنبيهات - احتفظ بها للرسائل المهمة' },
            { text: "Don't use danger status for non-critical information", textAr: 'لا تستخدم حالة الخطر للمعلومات غير الحرجة' },
            { text: "Don't stack too many alerts on a single page", textAr: 'لا تضع عدة تنبيهات على صفحة واحدة' },
            { text: "Don't hide critical alerts automatically", textAr: 'لا تخفِ التنبيهات الحرجة تلقائياً' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
