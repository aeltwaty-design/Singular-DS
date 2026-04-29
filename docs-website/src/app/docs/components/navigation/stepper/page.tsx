'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { Stepper, StepItem } from '@/components/ui';

export default function StepperPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    orientation: 'horizontal',
    size: 'lg',
    showDescription: true,
    clickableSteps: false,
    activeStep: 1,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const orientation = controlValues.orientation as 'horizontal' | 'vertical';
  const size = controlValues.size as 'sm' | 'lg';
  const showDescription = controlValues.showDescription as boolean;
  const clickableSteps = controlValues.clickableSteps as boolean;
  const activeStep = controlValues.activeStep as number;

  // Demo steps
  const stepsEn: StepItem[] = [
    { title: 'Account', description: 'Create your account' },
    { title: 'Profile', description: 'Set up your profile' },
    { title: 'Complete', description: 'Review and finish' },
  ];

  const stepsAr: StepItem[] = [
    { title: 'الحساب', description: 'إنشاء حسابك' },
    { title: 'الملف', description: 'إعداد ملفك الشخصي' },
    { title: 'إتمام', description: 'المراجعة والإنهاء' },
  ];

  const steps = isArabic ? stepsAr : stepsEn;

  // Extended demo steps for examples
  const orderStepsEn: StepItem[] = [
    { title: 'Cart', description: 'Review items' },
    { title: 'Shipping', description: 'Delivery details' },
    { title: 'Payment', description: 'Payment method' },
    { title: 'Confirm', description: 'Place order' },
  ];

  const orderStepsAr: StepItem[] = [
    { title: 'السلة', description: 'مراجعة العناصر' },
    { title: 'الشحن', description: 'تفاصيل التوصيل' },
    { title: 'الدفع', description: 'طريقة الدفع' },
    { title: 'التأكيد', description: 'إتمام الطلب' },
  ];

  const orderSteps = isArabic ? orderStepsAr : orderStepsEn;

  // Steps with error
  const errorStepsEn: StepItem[] = [
    { title: 'Details', description: 'Basic information' },
    { title: 'Verification', description: 'Verify identity', error: true },
    { title: 'Approval', description: 'Final review' },
  ];

  const errorStepsAr: StepItem[] = [
    { title: 'التفاصيل', description: 'المعلومات الأساسية' },
    { title: 'التحقق', description: 'التحقق من الهوية', error: true },
    { title: 'الموافقة', description: 'المراجعة النهائية' },
  ];

  const errorSteps = isArabic ? errorStepsAr : errorStepsEn;

  // Props documentation
  const stepperProps = [
    {
      name: 'steps',
      type: 'StepItem[]',
      required: true,
      description: 'Array of step items to display',
      descriptionAr: 'مصفوفة عناصر الخطوات للعرض',
    },
    {
      name: 'activeStep',
      type: 'number',
      required: true,
      description: 'Current active step index (0-based)',
      descriptionAr: 'فهرس الخطوة النشطة الحالية (يبدأ من 0)',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Stepper orientation layout',
      descriptionAr: 'تخطيط اتجاه المتدرج',
    },
    {
      name: 'size',
      type: "'sm' | 'lg'",
      defaultValue: "'lg'",
      description: 'Size of step indicators',
      descriptionAr: 'حجم مؤشرات الخطوات',
    },
    {
      name: 'showDescription',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show step descriptions',
      descriptionAr: 'إظهار وصف الخطوات',
    },
    {
      name: 'clickableSteps',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Allow clicking steps to navigate',
      descriptionAr: 'السماح بالنقر على الخطوات للتنقل',
    },
    {
      name: 'onStepClick',
      type: '(index: number) => void',
      description: 'Callback when a step is clicked (requires clickableSteps)',
      descriptionAr: 'دالة الاستدعاء عند النقر على خطوة (يتطلب clickableSteps)',
    },
  ];

  const stepItemProps = [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Step title text',
      descriptionAr: 'نص عنوان الخطوة',
    },
    {
      name: 'description',
      type: 'string',
      description: 'Optional description below the title',
      descriptionAr: 'وصف اختياري أسفل العنوان',
    },
    {
      name: 'error',
      type: 'boolean',
      description: 'Mark step as having an error',
      descriptionAr: 'تحديد الخطوة على أنها تحتوي على خطأ',
    },
  ];

  const handleStepClick = (index: number) => {
    setControlValues((prev) => ({ ...prev, activeStep: index }));
  };

  return (
    <ComponentDocTemplate
      title={isArabic ? 'المتدرج' : 'Stepper'}
      description={
        isArabic
          ? 'يعرض المتدرج التقدم عبر سلسلة من الخطوات المنطقية والمرقمة. يدعم التخطيط الأفقي والعمودي.'
          : 'Stepper displays progress through a sequence of logical and numbered steps. Supports horizontal and vertical layouts.'
      }
      category={isArabic ? 'التنقل' : 'Navigation'}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-8">
        <LivePlayground
          code={`<Stepper
  steps={[
    { title: '${isArabic ? 'الحساب' : 'Account'}', description: '${isArabic ? 'إنشاء حسابك' : 'Create your account'}' },
    { title: '${isArabic ? 'الملف' : 'Profile'}', description: '${isArabic ? 'إعداد ملفك الشخصي' : 'Set up your profile'}' },
    { title: '${isArabic ? 'إتمام' : 'Complete'}', description: '${isArabic ? 'المراجعة والإنهاء' : 'Review and finish'}' },
  ]}
  activeStep={${activeStep}}
  orientation="${orientation}"
  size="${size}"
  showDescription={${showDescription}}
  clickableSteps={${clickableSteps}}
/>`}
          controls={[
            {
              name: 'orientation',
              nameAr: 'الاتجاه',
              type: 'select',
              options: [
                { value: 'horizontal', label: 'Horizontal', labelAr: 'أفقي' },
                { value: 'vertical', label: 'Vertical', labelAr: 'عمودي' },
              ],
              defaultValue: 'horizontal',
            },
            {
              name: 'size',
              nameAr: 'الحجم',
              type: 'select',
              options: [
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
              ],
              defaultValue: 'lg',
            },
            {
              name: 'activeStep',
              nameAr: 'الخطوة النشطة',
              type: 'select',
              options: [
                { value: 0, label: 'Step 1', labelAr: 'الخطوة 1' },
                { value: 1, label: 'Step 2', labelAr: 'الخطوة 2' },
                { value: 2, label: 'Step 3', labelAr: 'الخطوة 3' },
              ],
              defaultValue: 1,
            },
            {
              name: 'showDescription',
              nameAr: 'إظهار الوصف',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'clickableSteps',
              nameAr: 'خطوات قابلة للنقر',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className={orientation === 'horizontal' ? 'w-full max-w-xl' : 'w-full max-w-xs'}>
            <Stepper
              steps={steps}
              activeStep={activeStep}
              orientation={orientation}
              size={size}
              showDescription={showDescription}
              clickableSteps={clickableSteps}
              onStepClick={clickableSteps ? handleStepClick : undefined}
            />
          </div>
        </LivePlayground>
      </section>

      {/* Examples Section */}
      <section className="space-y-8 mt-16">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {isArabic ? 'أمثلة' : 'Examples'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {isArabic
              ? 'المتدرج مرن ويمكن استخدامه في سياقات مختلفة لعرض التقدم.'
              : 'Stepper is flexible and can be used in different contexts to display progress.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Horizontal Default */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'أفقي (افتراضي)' : 'Horizontal (Default)'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={orderSteps}
                activeStep={2}
                orientation="horizontal"
              />
            </div>
          </div>

          {/* Vertical */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'عمودي' : 'Vertical'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <div className="max-w-xs">
                <Stepper
                  steps={steps}
                  activeStep={1}
                  orientation="vertical"
                />
              </div>
            </div>
          </div>

          {/* Small Size */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'حجم صغير' : 'Small Size'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={steps}
                activeStep={1}
                size="sm"
              />
            </div>
          </div>

          {/* Without Descriptions */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'بدون وصف' : 'Without Descriptions'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={orderSteps}
                activeStep={1}
                showDescription={false}
              />
            </div>
          </div>

          {/* With Error State */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'مع حالة خطأ' : 'With Error State'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={errorSteps}
                activeStep={1}
              />
            </div>
          </div>

          {/* Clickable Steps */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'خطوات قابلة للنقر' : 'Clickable Steps'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={steps}
                activeStep={activeStep}
                clickableSteps
                onStepClick={handleStepClick}
              />
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                {isArabic ? 'انقر على أي خطوة للتنقل' : 'Click on any step to navigate'}
              </p>
            </div>
          </div>

          {/* All Completed */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'جميع الخطوات مكتملة' : 'All Steps Completed'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <Stepper
                steps={steps}
                activeStep={3}
              />
            </div>
          </div>

          {/* Vertical Small */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isArabic ? 'عمودي صغير' : 'Vertical Small'}
            </span>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
              <div className="max-w-xs">
                <Stepper
                  steps={orderSteps}
                  activeStep={2}
                  orientation="vertical"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-8 mt-16">
        <PropsTable
          props={stepperProps}
          title="Stepper Props"
          titleAr="خصائص المتدرج"
        />
        <PropsTable
          props={stepItemProps}
          title="StepItem Interface"
          titleAr="واجهة عنصر الخطوة"
        />
      </section>

      {/* Usage Guidelines */}
      <section className="mt-16">
        <UsageGuidelines
          dos={[
            {
              text: 'Use for multi-step processes like checkouts, forms, or wizards',
              textAr: 'استخدم للعمليات متعددة الخطوات مثل الدفع والنماذج والمعالجات',
            },
            {
              text: 'Show completion state clearly with checkmarks',
              textAr: 'أظهر حالة الإكمال بوضوح مع علامات الصح',
            },
            {
              text: 'Allow going back to previous steps when possible',
              textAr: 'اسمح بالعودة للخطوات السابقة عند الإمكان',
            },
            {
              text: 'Keep step titles concise and descriptive',
              textAr: 'اجعل عناوين الخطوات موجزة ووصفية',
            },
            {
              text: 'Use vertical orientation for narrow spaces or many steps',
              textAr: 'استخدم الاتجاه العمودي للمساحات الضيقة أو الخطوات الكثيرة',
            },
          ]}
          donts={[
            {
              text: "Don't use for unrelated content (use tabs instead)",
              textAr: 'لا تستخدم للمحتوى غير المترابط (استخدم التبويبات بدلاً منه)',
            },
            {
              text: "Don't have too many steps (ideally 3-5)",
              textAr: 'لا تضع الكثير من الخطوات (3-5 مثالياً)',
            },
            {
              text: "Don't skip steps without user confirmation",
              textAr: 'لا تتخطى الخطوات بدون تأكيد المستخدم',
            },
            {
              text: "Don't use vague step titles",
              textAr: 'لا تستخدم عناوين خطوات غامضة',
            },
          ]}
        />
      </section>
    </ComponentDocTemplate>
  );
}
