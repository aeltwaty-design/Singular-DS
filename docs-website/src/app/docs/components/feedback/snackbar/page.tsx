'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { 
  ComponentDocTemplate, 
  LivePlayground, 
  PropsTable,
  UsageGuidelines 
} from '@/components/docs/components';
import { Snackbar } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useLocale } from 'next-intl';

export default function SnackbarPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const component = getComponentBySlug('feedback', 'snackbar');

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean>>({
    status: 'default',
    showLeadingIcon: true,
    dismissible: false,
  });

  const handleControlChange = (name: string, value: string | boolean) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const status = controlValues.status as 'default' | 'gray' | 'success' | 'warning' | 'danger';
  const showLeadingIcon = controlValues.showLeadingIcon as boolean;
  const dismissible = controlValues.dismissible as boolean;

  if (!component) return null;

  // Props for PropsTable
  const props = [
    {
      name: 'message',
      type: 'string',
      required: true,
      description: 'The snackbar message text',
      descriptionAr: 'نص رسالة الإشعار',
    },
    {
      name: 'status',
      type: "'default' | 'gray' | 'success' | 'warning' | 'danger'",
      defaultValue: "'default'",
      description: 'Status determines the background color and default icon',
      descriptionAr: 'تحدد الحالة لون الخلفية والأيقونة الافتراضية',
    },
    {
      name: 'showLeadingIcon',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the leading status icon',
      descriptionAr: 'عرض أيقونة الحالة الرئيسية',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Custom icon to override the default status icon',
      descriptionAr: 'أيقونة مخصصة لتجاوز أيقونة الحالة الافتراضية',
    },
    {
      name: 'actionLabel',
      type: 'string',
      description: 'Label for the action button',
      descriptionAr: 'تسمية زر الإجراء',
    },
    {
      name: 'onAction',
      type: '() => void',
      description: 'Callback when action button is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على زر الإجراء',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the snackbar can be dismissed',
      descriptionAr: 'إمكانية إغلاق الإشعار',
    },
    {
      name: 'onDismiss',
      type: '() => void',
      description: 'Callback when dismiss button is clicked',
      descriptionAr: 'دالة الاستدعاء عند النقر على زر الإغلاق',
    },
  ];

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Feedback"
      categorySlug="feedback"
      icon={<MessageCircle className="w-6 h-6" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={`<Snackbar
  message="${isArabic ? 'يكتب هنا نص الرسالة' : 'Message goes here'}"
  status="${status}"
  showLeadingIcon={${showLeadingIcon}}
  actionLabel="${isArabic ? 'الغاء' : 'Cancel'}"
  onAction={() => console.log('Action clicked')}
  dismissible={${dismissible}}
  onDismiss={() => console.log('Dismissed')}
/>`}
          controls={[
            {
              name: 'status',
              nameAr: 'الحالة',
              type: 'select',
              options: [
                { value: 'default', label: 'Default', labelAr: 'افتراضي' },
                { value: 'gray', label: 'Gray', labelAr: 'رمادي' },
                { value: 'success', label: 'Success', labelAr: 'نجاح' },
                { value: 'warning', label: 'Warning', labelAr: 'تحذير' },
                { value: 'danger', label: 'Danger', labelAr: 'خطر' },
              ],
              defaultValue: 'default',
            },
            {
              name: 'showLeadingIcon',
              nameAr: 'إظهار الأيقونة',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'dismissible',
              nameAr: 'قابل للإغلاق',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          onControlChange={handleControlChange}
          controlValues={controlValues}
        >
          <div className="flex justify-center w-full">
            <Snackbar
              message={isArabic ? 'يكتب هنا نص الرسالة' : 'Message goes here'}
              status={status}
              showLeadingIcon={showLeadingIcon}
              actionLabel={isArabic ? 'الغاء' : 'Cancel'}
              onAction={() => console.log('Action clicked')}
              dismissible={dismissible}
              onDismiss={() => console.log('Dismissed')}
            />
          </div>
        </LivePlayground>

        {/* Examples Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {isArabic ? 'الأمثلة' : 'Examples'}
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {/* Status Variants */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متغيرات الحالة' : 'Status Variants'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4">
                <Snackbar
                  message={isArabic ? 'رسالة افتراضية' : 'Default message'}
                  status="default"
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
                <Snackbar
                  message={isArabic ? 'رسالة رمادية' : 'Gray message'}
                  status="gray"
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
                <Snackbar
                  message={isArabic ? 'تمت العملية بنجاح' : 'Operation successful'}
                  status="success"
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
                <Snackbar
                  message={isArabic ? 'تحذير: يرجى الانتباه' : 'Warning: Please pay attention'}
                  status="warning"
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
                <Snackbar
                  message={isArabic ? 'حدث خطأ ما' : 'Something went wrong'}
                  status="danger"
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
              </div>
            </div>

            {/* Without Icon */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'بدون أيقونة' : 'Without Icon'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4">
                <Snackbar
                  message={isArabic ? 'رسالة بدون أيقونة' : 'Message without icon'}
                  status="default"
                  showLeadingIcon={false}
                  actionLabel={isArabic ? 'الغاء' : 'Cancel'}
                  onAction={() => {}}
                />
                <Snackbar
                  message={isArabic ? 'تم الحفظ' : 'Saved successfully'}
                  status="success"
                  showLeadingIcon={false}
                  actionLabel={isArabic ? 'تراجع' : 'Undo'}
                  onAction={() => {}}
                />
              </div>
            </div>

            {/* Without Action */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'بدون زر إجراء' : 'Without Action Button'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4">
                <Snackbar
                  message={isArabic ? 'تم تحديث البيانات' : 'Data updated'}
                  status="success"
                />
                <Snackbar
                  message={isArabic ? 'جاري المعالجة...' : 'Processing...'}
                  status="gray"
                />
              </div>
            </div>

            {/* Dismissible */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'قابل للإغلاق' : 'Dismissible'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4">
                <Snackbar
                  message={isArabic ? 'يمكن إغلاق هذا الإشعار' : 'This snackbar can be dismissed'}
                  status="default"
                  dismissible
                  onDismiss={() => console.log('Dismissed')}
                />
                <Snackbar
                  message={isArabic ? 'مع زر الإجراء والإغلاق' : 'With action and dismiss'}
                  status="warning"
                  actionLabel={isArabic ? 'عرض' : 'View'}
                  onAction={() => {}}
                  dismissible
                  onDismiss={() => console.log('Dismissed')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Props Table */}
        <PropsTable props={props} />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            {
              text: 'Auto-dismiss after a few seconds for non-critical messages',
              textAr: 'إغلاق تلقائي بعد ثوانٍ للرسائل غير الحرجة',
            },
            {
              text: 'Include an undo action for destructive operations',
              textAr: 'تضمين إجراء التراجع للعمليات التدميرية',
            },
            {
              text: 'Keep messages brief and actionable',
              textAr: 'اجعل الرسائل موجزة وقابلة للتنفيذ',
            },
            {
              text: 'Use appropriate status colors for context',
              textAr: 'استخدم ألوان الحالة المناسبة للسياق',
            },
          ]}
          donts={[
            {
              text: "Don't stack multiple snackbars at once",
              textAr: 'لا تكدس عدة إشعارات في وقت واحد',
            },
            {
              text: "Don't use for critical errors requiring user action",
              textAr: 'لا تستخدم للأخطاء الحرجة التي تتطلب إجراء المستخدم',
            },
            {
              text: "Don't include lengthy text or multiple paragraphs",
              textAr: 'لا تضمن نصوصاً طويلة أو فقرات متعددة',
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
