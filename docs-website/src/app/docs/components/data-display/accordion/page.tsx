'use client';

import { useState } from 'react';
import { RowVertical } from 'iconsax-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines, PlaygroundControl } from '@/components/docs/components';
import { Accordion, AccordionItem } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { Notification, Star1, Setting2, Lock1, MessageQuestion } from 'iconsax-react';

export default function AccordionPage() {
  const component = getComponentBySlug('data-display', 'accordion');
  if (!component) return null;

  // Playground state
  const [controlValues, setControlValues] = useState<Record<string, string | boolean | number>>({
    expanded: true,
    disabled: false,
    showLeadingIcon: true,
  });

  const handleControlChange = (name: string, value: string | boolean | number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  const controls: PlaygroundControl[] = [
    {
      name: 'expanded',
      nameAr: 'موسّع',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      nameAr: 'معطل',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'showLeadingIcon',
      nameAr: 'إظهار الأيقونة',
      type: 'boolean',
      defaultValue: true,
    },
  ];

  const code = `import { Accordion, AccordionItem } from '@singular/ui';
import { Star1 } from 'iconsax-react';

// Single AccordionItem
<AccordionItem
  title="What is Singular Design System?"
  titleAr="ما هو نظام التصميم سينجلر؟"
  description="Singular is a comprehensive design system..."
  descriptionAr="سينجلر هو نظام تصميم شامل..."
  expanded={${controlValues.expanded}}
  disabled={${controlValues.disabled}}
  showLeadingIcon={${controlValues.showLeadingIcon}}
  leadingIcon={<Star1 size={24} variant="Bold" />}
/>

// Multiple items in Accordion wrapper (single mode)
<Accordion>
  <AccordionItem title="Section 1" description="Content 1" />
  <AccordionItem title="Section 2" description="Content 2" />
  <AccordionItem title="Section 3" description="Content 3" />
</Accordion>

// Allow multiple items open
<Accordion allowMultiple>
  <AccordionItem title="Item 1" description="Content 1" />
  <AccordionItem title="Item 2" description="Content 2" />
</Accordion>`;

  return (
    <ComponentDocTemplate 
      title={component.name} 
      titleAr={component.nameAr} 
      description={component.description} 
      descriptionAr={component.descriptionAr} 
      category="Data Display" 
      categorySlug="data-display" 
      icon={<RowVertical size={24} variant="Bold" />}
    >
      <div className="space-y-16">
        {/* Interactive Playground */}
        <LivePlayground 
          code={code}
          controls={controls}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        >
          <div className="w-full max-w-lg">
            <AccordionItem
              title="What is Singular Design System?"
              titleAr="ما هو نظام التصميم سينجلر؟"
              description="Singular is a comprehensive, multi-brand design system built for Flutter applications. It provides consistent UI components, design tokens, and patterns across WalaPlus, WalaOne, and Doam products."
              descriptionAr="سينجلر هو نظام تصميم شامل متعدد العلامات التجارية مبني لتطبيقات فلاتر. يوفر مكونات واجهة مستخدم متسقة ورموز تصميم وأنماط عبر منتجات والا بلس ووالا ون ودوام."
              expanded={controlValues.expanded as boolean}
              disabled={controlValues.disabled as boolean}
              showLeadingIcon={controlValues.showLeadingIcon as boolean}
              leadingIcon={<Star1 size={24} variant="Bold" className="text-amber-500" />}
            />
          </div>
        </LivePlayground>

        {/* State Variants */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            State Variants
          </h3>
          <div className="card p-6 space-y-4">
            <div>
              <span className="text-sm text-neutral-500 mb-2 block">Default (Collapsed)</span>
              <AccordionItem
                title="Default State"
                titleAr="الحالة الافتراضية"
                description="This accordion item is in its default collapsed state."
                descriptionAr="عنصر الأكورديون هذا في حالته الافتراضية المطوية."
                expanded={false}
              />
            </div>
            <div>
              <span className="text-sm text-neutral-500 mb-2 block">Expanded</span>
              <AccordionItem
                title="Expanded State"
                titleAr="حالة التوسيع"
                description="This accordion item is expanded and showing its content."
                descriptionAr="عنصر الأكورديون هذا موسّع ويعرض محتواه."
                expanded={true}
              />
            </div>
            <div>
              <span className="text-sm text-neutral-500 mb-2 block">Disabled</span>
              <AccordionItem
                title="Disabled State"
                titleAr="حالة التعطيل"
                description="This accordion item is disabled and cannot be interacted with."
                descriptionAr="عنصر الأكورديون هذا معطل ولا يمكن التفاعل معه."
                disabled={true}
              />
            </div>
          </div>
        </section>

        {/* Single vs Multiple Mode */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Expansion Modes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Single Mode (Default)
              </h4>
              <p className="text-xs text-neutral-500 mb-4">Only one item can be open at a time</p>
              <Accordion>
                <AccordionItem
                  itemId="single-1"
                  title="First Section"
                  titleAr="القسم الأول"
                  description="Content for the first section goes here."
                  descriptionAr="محتوى القسم الأول يذهب هنا."
                />
                <AccordionItem
                  itemId="single-2"
                  title="Second Section"
                  titleAr="القسم الثاني"
                  description="Content for the second section goes here."
                  descriptionAr="محتوى القسم الثاني يذهب هنا."
                />
                <AccordionItem
                  itemId="single-3"
                  title="Third Section"
                  titleAr="القسم الثالث"
                  description="Content for the third section goes here."
                  descriptionAr="محتوى القسم الثالث يذهب هنا."
                />
              </Accordion>
            </div>
            <div className="card p-6">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Multiple Mode
              </h4>
              <p className="text-xs text-neutral-500 mb-4">Multiple items can be open simultaneously</p>
              <Accordion allowMultiple>
                <AccordionItem
                  itemId="multi-1"
                  title="First Section"
                  titleAr="القسم الأول"
                  description="Content for the first section goes here."
                  descriptionAr="محتوى القسم الأول يذهب هنا."
                />
                <AccordionItem
                  itemId="multi-2"
                  title="Second Section"
                  titleAr="القسم الثاني"
                  description="Content for the second section goes here."
                  descriptionAr="محتوى القسم الثاني يذهب هنا."
                />
                <AccordionItem
                  itemId="multi-3"
                  title="Third Section"
                  titleAr="القسم الثالث"
                  description="Content for the third section goes here."
                  descriptionAr="محتوى القسم الثالث يذهب هنا."
                />
              </Accordion>
            </div>
          </div>
        </section>

        {/* With Leading Icons */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            With Leading Icons
          </h3>
          <div className="card p-6">
            <Accordion allowMultiple>
              <AccordionItem
                itemId="icon-1"
                title="Notifications"
                titleAr="الإشعارات"
                description="Manage your notification preferences and alerts."
                descriptionAr="إدارة تفضيلات الإشعارات والتنبيهات الخاصة بك."
                showLeadingIcon
                leadingIcon={<Notification size={24} variant="Bold" className="text-blue-500" />}
              />
              <AccordionItem
                itemId="icon-2"
                title="Settings"
                titleAr="الإعدادات"
                description="Configure your account settings and preferences."
                descriptionAr="تكوين إعدادات حسابك وتفضيلاتك."
                showLeadingIcon
                leadingIcon={<Setting2 size={24} variant="Bold" className="text-slate-500" />}
              />
              <AccordionItem
                itemId="icon-3"
                title="Privacy & Security"
                titleAr="الخصوصية والأمان"
                description="Manage your privacy settings and security options."
                descriptionAr="إدارة إعدادات الخصوصية وخيارات الأمان الخاصة بك."
                showLeadingIcon
                leadingIcon={<Lock1 size={24} variant="Bold" className="text-green-500" />}
              />
            </Accordion>
          </div>
        </section>

        {/* Real-World Examples */}
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Real-World Examples
          </h3>
          
          {/* FAQ Section */}
          <div className="card p-6 mb-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-4">FAQ Section</h4>
            <div className="max-w-2xl">
              <Accordion>
                <AccordionItem
                  itemId="faq-1"
                  title="How do I reset my password?"
                  titleAr="كيف يمكنني إعادة تعيين كلمة المرور؟"
                  description="To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a link to create a new password."
                  descriptionAr="لإعادة تعيين كلمة المرور، انتقل إلى صفحة تسجيل الدخول وانقر على 'نسيت كلمة المرور'. أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإنشاء كلمة مرور جديدة."
                  showLeadingIcon
                  leadingIcon={<MessageQuestion size={24} variant="Bold" className="text-purple-500" />}
                />
                <AccordionItem
                  itemId="faq-2"
                  title="What payment methods do you accept?"
                  titleAr="ما هي طرق الدفع التي تقبلونها؟"
                  description="We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and bank transfers for qualifying orders."
                  descriptionAr="نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، باي بال، آبل باي، والتحويلات البنكية للطلبات المؤهلة."
                  showLeadingIcon
                  leadingIcon={<MessageQuestion size={24} variant="Bold" className="text-purple-500" />}
                />
                <AccordionItem
                  itemId="faq-3"
                  title="How long does shipping take?"
                  titleAr="كم يستغرق الشحن؟"
                  description="Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. International orders may take 10-14 business days."
                  descriptionAr="يستغرق الشحن العادي 5-7 أيام عمل. الشحن السريع متاح للتوصيل خلال 2-3 أيام عمل. قد تستغرق الطلبات الدولية 10-14 يوم عمل."
                  showLeadingIcon
                  leadingIcon={<MessageQuestion size={24} variant="Bold" className="text-purple-500" />}
                />
              </Accordion>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-4">Settings Panel</h4>
            <div className="max-w-md">
              <Accordion allowMultiple>
                <AccordionItem
                  itemId="settings-1"
                  title="Account"
                  titleAr="الحساب"
                  showLeadingIcon
                  leadingIcon={<Setting2 size={24} variant="Linear" className="text-slate-600 dark:text-slate-400" />}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm">Email</span>
                      <span className="text-sm text-slate-500">user@example.com</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm">Language</span>
                      <span className="text-sm text-slate-500">English</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Timezone</span>
                      <span className="text-sm text-slate-500">UTC+3</span>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  itemId="settings-2"
                  title="Notifications"
                  titleAr="الإشعارات"
                  showLeadingIcon
                  leadingIcon={<Notification size={24} variant="Linear" className="text-slate-600 dark:text-slate-400" />}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm">Push Notifications</span>
                      <span className="text-sm text-green-500">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm">Email Alerts</span>
                      <span className="text-sm text-green-500">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">SMS Alerts</span>
                      <span className="text-sm text-slate-500">Disabled</span>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="w-full">
              <AccordionItem
                title="Mobile FAQ"
                titleAr="الأسئلة الشائعة للجوال"
                description="Optimized for mobile screens with touch-friendly interactions."
                descriptionAr="محسّن لشاشات الجوال مع تفاعلات مناسبة للمس."
                defaultExpanded
              />
            </div>
          }
          tablet={
            <div className="w-full">
              <Accordion>
                <AccordionItem
                  itemId="tablet-1"
                  title="Tablet Section 1"
                  titleAr="قسم التابلت 1"
                  description="Content optimized for tablet viewing."
                  descriptionAr="محتوى محسّن لعرض التابلت."
                />
                <AccordionItem
                  itemId="tablet-2"
                  title="Tablet Section 2"
                  titleAr="قسم التابلت 2"
                  description="Additional tablet content here."
                  descriptionAr="محتوى تابلت إضافي هنا."
                />
              </Accordion>
            </div>
          }
          desktop={
            <div className="w-full max-w-lg">
              <Accordion allowMultiple>
                <AccordionItem
                  itemId="desktop-1"
                  title="Desktop FAQ Item"
                  titleAr="عنصر الأسئلة الشائعة للحاسوب"
                  description="Full-width accordion for desktop with all features enabled."
                  descriptionAr="أكورديون بعرض كامل للحاسوب مع تفعيل جميع الميزات."
                  showLeadingIcon
                  leadingIcon={<Star1 size={24} variant="Bold" className="text-amber-500" />}
                />
                <AccordionItem
                  itemId="desktop-2"
                  title="Another Desktop Item"
                  titleAr="عنصر حاسوب آخر"
                  description="Multiple items can be expanded simultaneously on desktop."
                  descriptionAr="يمكن توسيع عناصر متعددة في وقت واحد على الحاسوب."
                  showLeadingIcon
                  leadingIcon={<Setting2 size={24} variant="Bold" className="text-slate-500" />}
                />
              </Accordion>
            </div>
          }
        />

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use for FAQs and collapsible content sections', textAr: 'استخدم للأسئلة الشائعة وأقسام المحتوى القابلة للطي' },
            { text: 'Keep titles concise and descriptive', textAr: 'اجعل العناوين موجزة ووصفية' },
            { text: 'Use single mode when items are mutually exclusive', textAr: 'استخدم الوضع الفردي عندما تكون العناصر متبادلة الحصرية' },
            { text: 'Add leading icons for visual categorization', textAr: 'أضف أيقونات أمامية للتصنيف البصري' },
          ]}
          donts={[
            { text: "Don't nest accordions too deeply", textAr: 'لا تتداخل الأكورديونات بعمق كبير' },
            { text: "Don't hide critical information inside accordions", textAr: 'لا تخفِ المعلومات الحرجة داخل الأكورديونات' },
            { text: "Don't use accordions for navigation menus", textAr: 'لا تستخدم الأكورديونات لقوائم التنقل' },
            { text: "Don't have too many items in a single accordion", textAr: 'لا تضع عناصر كثيرة جداً في أكورديون واحد' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
