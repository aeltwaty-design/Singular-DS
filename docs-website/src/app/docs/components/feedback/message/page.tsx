'use client';

import { useState } from 'react';
import { MessageText1 } from 'iconsax-react';
import { 
  ComponentDocTemplate, 
  LivePlayground, 
  PropsTable,
  UsageGuidelines 
} from '@/components/docs/components';
import { Message } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useLocale } from 'next-intl';

export default function MessagePage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const component = getComponentBySlug('feedback', 'message');

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean>>({
    size: 'lg',
    type: 'primary',
    artwork: 'illustration',
    alignment: 'centered',
    showTitle: true,
    showSupportingText: true,
    showArtwork: true,
  });

  const handleControlChange = (name: string, value: string | boolean) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const size = controlValues.size as 'sm' | 'md' | 'lg';
  const type = controlValues.type as 'primary' | 'secondary';
  const artwork = controlValues.artwork as 'illustration' | 'icon' | 'image';
  const alignment = controlValues.alignment as 'centered' | 'stacked';
  const showTitle = controlValues.showTitle as boolean;
  const showSupportingText = controlValues.showSupportingText as boolean;
  const showArtwork = controlValues.showArtwork as boolean;

  if (!component) return null;

  // Props for PropsTable
  const props = [
    {
      name: 'title',
      type: 'string',
      description: 'Main heading text',
      descriptionAr: 'نص العنوان الرئيسي',
    },
    {
      name: 'supportingText',
      type: 'string',
      description: 'Description/body text',
      descriptionAr: 'النص الوصفي',
    },
    {
      name: 'showTitle',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show/hide title',
      descriptionAr: 'إظهار/إخفاء العنوان',
    },
    {
      name: 'showSupportingText',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show/hide description',
      descriptionAr: 'إظهار/إخفاء الوصف',
    },
    {
      name: 'showArtwork',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show/hide artwork area',
      descriptionAr: 'إظهار/إخفاء منطقة الرسم',
    },
    {
      name: 'artwork',
      type: "'illustration' | 'icon' | 'image'",
      defaultValue: "'illustration'",
      description: 'Type of artwork to display',
      descriptionAr: 'نوع الرسم للعرض',
    },
    {
      name: 'artworkSrc',
      type: 'string',
      description: 'Image URL for illustration/image artwork types',
      descriptionAr: 'رابط الصورة لأنواع الرسم التوضيحي/الصورة',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Custom icon for icon artwork type',
      descriptionAr: 'أيقونة مخصصة لنوع رسم الأيقونة',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'lg'",
      description: 'Size variant',
      descriptionAr: 'متغير الحجم',
    },
    {
      name: 'type',
      type: "'primary' | 'secondary'",
      defaultValue: "'primary'",
      description: 'Primary (transparent) or Secondary (with background)',
      descriptionAr: 'أساسي (شفاف) أو ثانوي (مع خلفية)',
    },
    {
      name: 'alignment',
      type: "'centered' | 'stacked'",
      defaultValue: "'centered'",
      description: 'Content alignment',
      descriptionAr: 'محاذاة المحتوى',
    },
  ];

  const titleText = isArabic ? 'يكتب هنا عنوان' : 'Title Goes Here';
  const supportingTextAr = 'يكتب هنا نص وصفي يدل علي الرسالة الموجهة للمستخدم للوصف';
  const supportingTextEn = 'A descriptive text for the title goes here';
  const supportingTextValue = isArabic ? supportingTextAr : supportingTextEn;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Feedback"
      categorySlug="feedback"
      icon={<MessageText1 className="w-6 h-6" variant="Bold" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={`<Message
  title="${titleText}"
  supportingText="${supportingTextValue}"
  size="${size}"
  type="${type}"
  artwork="${artwork}"
  alignment="${alignment}"
  showTitle={${showTitle}}
  showSupportingText={${showSupportingText}}
  showArtwork={${showArtwork}}
/>`}
          controls={[
            {
              name: 'size',
              nameAr: 'الحجم',
              type: 'select',
              options: [
                { value: 'lg', label: 'Large', labelAr: 'كبير' },
                { value: 'md', label: 'Medium', labelAr: 'متوسط' },
                { value: 'sm', label: 'Small', labelAr: 'صغير' },
              ],
              defaultValue: 'lg',
            },
            {
              name: 'type',
              nameAr: 'النوع',
              type: 'select',
              options: [
                { value: 'primary', label: 'Primary', labelAr: 'أساسي' },
                { value: 'secondary', label: 'Secondary', labelAr: 'ثانوي' },
              ],
              defaultValue: 'primary',
            },
            {
              name: 'artwork',
              nameAr: 'الرسم',
              type: 'select',
              options: [
                { value: 'illustration', label: 'Illustration', labelAr: 'رسم توضيحي' },
                { value: 'icon', label: 'Icon', labelAr: 'أيقونة' },
                { value: 'image', label: 'Image', labelAr: 'صورة' },
              ],
              defaultValue: 'illustration',
            },
            {
              name: 'alignment',
              nameAr: 'المحاذاة',
              type: 'select',
              options: [
                { value: 'centered', label: 'Centered', labelAr: 'توسيط' },
                { value: 'stacked', label: 'Stacked', labelAr: 'مكدس' },
              ],
              defaultValue: 'centered',
            },
            {
              name: 'showTitle',
              nameAr: 'إظهار العنوان',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showSupportingText',
              nameAr: 'إظهار الوصف',
              type: 'boolean',
              defaultValue: true,
            },
            {
              name: 'showArtwork',
              nameAr: 'إظهار الرسم',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          onControlChange={handleControlChange}
          controlValues={controlValues}
        >
          <div className="flex justify-center w-full py-8">
            <Message
              title={titleText}
              supportingText={supportingTextValue}
              size={size}
              type={type}
              artwork={artwork}
              alignment={alignment}
              showTitle={showTitle}
              showSupportingText={showSupportingText}
              showArtwork={showArtwork}
            />
          </div>
        </LivePlayground>

        {/* Examples Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {isArabic ? 'الأمثلة' : 'Examples'}
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {/* Size Variants */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متغيرات الحجم' : 'Size Variants'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Large</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      size="lg"
                      artwork="illustration"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Medium</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      size="md"
                      artwork="illustration"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Small</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      size="sm"
                      artwork="illustration"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Type Variants */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متغيرات النوع' : 'Type Variants'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Primary (Transparent)</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      type="primary"
                      artwork="icon"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Secondary (With Background)</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      type="secondary"
                      artwork="icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Artwork Types */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'أنواع الرسم' : 'Artwork Types'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Illustration</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      artwork="illustration"
                      type="secondary"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Icon</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      artwork="icon"
                      type="secondary"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Image</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      artwork="image"
                      type="secondary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Alignment Variants */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'متغيرات المحاذاة' : 'Alignment Variants'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Centered</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      alignment="centered"
                      type="secondary"
                      artwork="icon"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-neutral-500 mb-2 block">Stacked</span>
                    <Message
                      title={titleText}
                      supportingText={supportingTextValue}
                      alignment="stacked"
                      type="secondary"
                      artwork="icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Title Only */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'العنوان فقط' : 'Title Only'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex justify-center">
                  <Message
                    title={titleText}
                    showSupportingText={false}
                    artwork="icon"
                    type="secondary"
                  />
                </div>
              </div>
            </div>

            {/* Without Artwork */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isArabic ? 'بدون رسم' : 'Without Artwork'}
              </span>
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex justify-center">
                  <Message
                    title={titleText}
                    supportingText={supportingTextValue}
                    showArtwork={false}
                    type="secondary"
                  />
                </div>
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
              text: 'Use for empty states in lists, tables, or search results',
              textAr: 'استخدم للحالات الفارغة في القوائم والجداول ونتائج البحث',
            },
            {
              text: 'Include a clear call-to-action when appropriate',
              textAr: 'قم بتضمين دعوة واضحة للعمل عند الاقتضاء',
            },
            {
              text: 'Use illustrations that match the context and brand',
              textAr: 'استخدم الرسوم التوضيحية التي تتوافق مع السياق والعلامة التجارية',
            },
            {
              text: 'Keep messages concise and helpful',
              textAr: 'اجعل الرسائل موجزة ومفيدة',
            },
          ]}
          donts={[
            {
              text: "Don't use for error states that require user action",
              textAr: 'لا تستخدم لحالات الخطأ التي تتطلب إجراء المستخدم',
            },
            {
              text: "Don't overload with too much text",
              textAr: 'لا تفرط في استخدام النص',
            },
            {
              text: "Don't use generic illustrations that don't match context",
              textAr: 'لا تستخدم رسومات توضيحية عامة لا تتطابق مع السياق',
            },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
