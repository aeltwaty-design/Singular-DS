'use client';

import { useState } from 'react';
import { Edit2, SearchNormal1, Eye, EyeSlash, Copy, User, Call, Link21 } from 'iconsax-react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { InputField, Chip } from '@/components/ui';
import { Flag } from '@/components/icons/Flag';
import type { InputFieldType, Tag } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';
import { useBrand } from '@/components/providers/Providers';

export default function InputFieldPage() {
  const t = useTranslations('inputFieldPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { currentBrand } = useBrand();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const component = getComponentBySlug('data-entry', 'input-field');
  const [inputType, setInputType] = useState<InputFieldType>('simple');
  const [size, setSize] = useState<'sm' | 'lg'>('lg');
  const [danger, setDanger] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showTrailingIcon, setShowTrailingIcon] = useState(true);

  // Brand color for focus state visualization
  const focusBorderColor = isDark
    ? currentBrand?.primary?.[400] || '#1AD997'
    : currentBrand?.primary?.[500] || '#00CE8B';

  // Sample tags for tags input demo
  const [sampleTags, setSampleTags] = useState<Tag[]>([
    { id: '1', label: isRTL ? 'أحمد' : 'Ahmed' },
    { id: '2', label: isRTL ? 'كمال' : 'Kamal' },
  ]);

  const handleTagRemove = (tag: Tag) => {
    setSampleTags(sampleTags.filter((t) => t.id !== tag.id));
  };

  if (!component) return null;

  const code = `import { InputField } from '@singular/ui';

<InputField
  inputType="${inputType}"
  size="${size}"
  ${danger ? 'danger' : ''}
  ${disabled ? 'disabled' : ''}
  label="${isRTL ? 'التسمية' : 'Label'}"
  placeholder="${isRTL ? 'أدخل النص...' : 'Enter text...'}"
  hint="${isRTL ? 'نص مساعد' : 'Helper text'}"
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category={isRTL ? 'إدخال البيانات' : 'Data Entry'}
      categorySlug="data-entry"
      icon={<Edit2 className="w-6 h-6" variant="Linear" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={code}
          controls={[
            {
              name: 'Type',
              nameAr: 'النوع',
              type: 'select',
              defaultValue: 'simple',
              options: [
                { value: 'simple', label: 'Simple', labelAr: 'بسيط' },
                { value: 'leadingIcon', label: 'Leading Icon', labelAr: 'أيقونة أمامية' },
                { value: 'leadingDropdown', label: 'Leading Dropdown', labelAr: 'قائمة أمامية' },
                { value: 'trailingDropdown', label: 'Trailing Dropdown', labelAr: 'قائمة خلفية' },
                { value: 'trailingAction', label: 'Trailing Action', labelAr: 'إجراء خلفي' },
                { value: 'phoneNumber', label: 'Phone Number', labelAr: 'رقم الهاتف' },
                { value: 'leadingText', label: 'Leading Text', labelAr: 'نص أمامي' },
                { value: 'tags', label: 'Tags', labelAr: 'الوسوم' },
                { value: 'textarea', label: 'Text Area', labelAr: 'منطقة النص' },
              ],
            },
            {
              name: 'Size',
              nameAr: 'الحجم',
              type: 'select',
              defaultValue: 'lg',
              options: [
                { value: 'sm', label: 'Small (40px)', labelAr: 'صغير' },
                { value: 'lg', label: 'Large (48px)', labelAr: 'كبير' },
              ],
            },
            {
              name: 'Danger',
              nameAr: 'خطر',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'Disabled',
              nameAr: 'معطل',
              type: 'boolean',
              defaultValue: false,
            },
            {
              name: 'Show Trailing Icon',
              nameAr: 'إظهار الأيقونة',
              type: 'boolean',
              defaultValue: true,
            },
          ]}
          controlValues={{
            Type: inputType,
            Size: size,
            Danger: danger,
            Disabled: disabled,
            'Show Trailing Icon': showTrailingIcon,
          }}
          onControlChange={(name, value) => {
            if (name === 'Type') setInputType(value as InputFieldType);
            if (name === 'Size') setSize(value as 'sm' | 'lg');
            if (name === 'Danger') setDanger(value as boolean);
            if (name === 'Disabled') setDisabled(value as boolean);
            if (name === 'Show Trailing Icon') setShowTrailingIcon(value as boolean);
          }}
        >
          <div className="w-full max-w-md mx-auto">
            <InputField
              inputType={inputType}
              size={size}
              danger={danger}
              disabled={disabled}
              showTrailingIcon={showTrailingIcon}
              label={isRTL ? 'إسم المستخدم' : 'Username'}
              placeholder={
                inputType === 'tags'
                  ? isRTL ? 'أضف المستخدم' : 'Add user'
                  : inputType === 'textarea'
                  ? isRTL ? 'اكتب الوصف هنا..' : 'Write description here..'
                  : inputType === 'phoneNumber'
                  ? isRTL ? 'رقم الهاتف' : 'Phone number'
                  : isRTL ? 'مثل, نواف سيد' : 'e.g. John Doe'
              }
              hint={danger ? (isRTL ? 'هذا الحقل مطلوب' : 'This field is required') : (isRTL ? 'يكتب هنا نص مساعد' : 'Helper text goes here')}
              leadingIcon={inputType === 'leadingIcon' ? <User size={20} variant="Linear" /> : undefined}
              leadingText={inputType === 'leadingText' ? 'https://' : undefined}
              leadingDropdownValue={inputType === 'leadingDropdown' ? (isRTL ? 'ريال' : 'SAR') : undefined}
              trailingDropdownValue={inputType === 'trailingDropdown' ? (isRTL ? 'اختر' : 'Select') : undefined}
              trailingActionLabel={inputType === 'trailingAction' ? (isRTL ? 'نسخ' : 'Copy') : undefined}
              trailingActionIcon={inputType === 'trailingAction' ? <Copy size={20} variant="Linear" /> : undefined}
              tags={inputType === 'tags' ? sampleTags : undefined}
              onTagRemove={inputType === 'tags' ? handleTagRemove : undefined}
              rows={inputType === 'textarea' ? 4 : undefined}
            />
          </div>
        </LivePlayground>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <div className="space-y-3 p-4">
              <InputField
                inputType="simple"
                size="sm"
                label={isRTL ? 'البريد الإلكتروني' : 'Email'}
                placeholder={isRTL ? 'أدخل بريدك' : 'Enter your email'}
              />
              <InputField
                inputType="simple"
                size="sm"
                label={isRTL ? 'كلمة المرور' : 'Password'}
                placeholder="••••••••"
                type="password"
              />
            </div>
          }
          tablet={
            <div className="space-y-3 p-4">
              <InputField
                inputType="leadingIcon"
                size="lg"
                leadingIcon={<SearchNormal1 size={20} variant="Linear" />}
                placeholder={isRTL ? 'ابحث...' : 'Search...'}
              />
              <InputField
                inputType="phoneNumber"
                size="lg"
                label={isRTL ? 'رقم الهاتف' : 'Phone Number'}
                placeholder="500 000 000"
              />
            </div>
          }
          desktop={
            <div className="grid grid-cols-2 gap-4 p-4">
              <InputField
                inputType="simple"
                size="lg"
                label={isRTL ? 'الاسم الأول' : 'First Name'}
                placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
              />
              <InputField
                inputType="simple"
                size="lg"
                label={isRTL ? 'اسم العائلة' : 'Last Name'}
                placeholder={isRTL ? 'أدخل اسم عائلتك' : 'Enter family name'}
              />
              <div className="col-span-2">
                <InputField
                  inputType="textarea"
                  size="lg"
                  label={isRTL ? 'الوصف' : 'Description'}
                  placeholder={isRTL ? 'اكتب الوصف هنا...' : 'Write description here...'}
                  rows={3}
                />
              </div>
            </div>
          }
        />

        {/* All Types Showcase */}
        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('types.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('types.description')}
            </p>
          </div>

          {/* Simple */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.simple.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.simple.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="max-w-[343px]">
                <InputField
                  inputType="simple"
                  size="lg"
                  label={isRTL ? 'كبير' : 'Large'}
                  placeholder={isRTL ? 'أدخل النص...' : 'Enter text...'}
                  hint={isRTL ? 'نص مساعد' : 'Helper text'}
                />
              </div>
              <div className="max-w-[343px]">
                <InputField
                  inputType="simple"
                  size="sm"
                  label={isRTL ? 'صغير' : 'Small'}
                  placeholder={isRTL ? 'أدخل النص...' : 'Enter text...'}
                  hint={isRTL ? 'نص مساعد' : 'Helper text'}
                />
              </div>
            </div>
          </div>

          {/* Leading Icon */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.leadingIcon.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.leadingIcon.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="max-w-[343px]">
                <InputField
                  inputType="leadingIcon"
                  size="lg"
                  leadingIcon={<User size={20} variant="Linear" />}
                  label={isRTL ? 'المستخدم' : 'User'}
                  placeholder={isRTL ? 'اسم المستخدم' : 'Username'}
                />
              </div>
              <div className="max-w-[343px]">
                <InputField
                  inputType="leadingIcon"
                  size="lg"
                  leadingIcon={<SearchNormal1 size={20} variant="Linear" />}
                  label={isRTL ? 'البحث' : 'Search'}
                  placeholder={isRTL ? 'ابحث...' : 'Search...'}
                />
              </div>
            </div>
          </div>

          {/* Leading Dropdown */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.leadingDropdown.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.leadingDropdown.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="leadingDropdown"
                size="lg"
                label={isRTL ? 'المبلغ' : 'Amount'}
                placeholder={isRTL ? 'أدخل المبلغ' : 'Enter amount'}
                leadingDropdownValue={isRTL ? 'ريال' : 'SAR'}
              />
            </div>
          </div>

          {/* Trailing Dropdown */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.trailingDropdown.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.trailingDropdown.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="trailingDropdown"
                size="lg"
                label={isRTL ? 'الفئة' : 'Category'}
                placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                trailingDropdownValue={isRTL ? 'اختر' : 'Select'}
              />
            </div>
          </div>

          {/* Trailing Action */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.trailingAction.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.trailingAction.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="trailingAction"
                size="lg"
                label={isRTL ? 'العنوان' : 'Address'}
                placeholder={isRTL ? 'العنوان' : 'Address'}
                trailingActionLabel={isRTL ? 'نسخ' : 'Copy'}
                trailingActionIcon={<Copy size={20} variant="Linear" />}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.phoneNumber.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.phoneNumber.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="phoneNumber"
                size="lg"
                label={isRTL ? 'رقم الهاتف' : 'Phone Number'}
                placeholder="500 000 000"
                phoneCountryCode="+966"
                phoneCountryFlag={<Flag code="SA" size="sm" rounded />}
              />
            </div>
          </div>

          {/* Leading Text */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.leadingText.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.leadingText.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="leadingText"
                size="lg"
                label={isRTL ? 'الموقع' : 'Website'}
                placeholder="example.com"
                leadingText="https://"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.tags.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.tags.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="tags"
                size="lg"
                label={isRTL ? 'المستخدمين' : 'Users'}
                placeholder={isRTL ? 'أضف المستخدم' : 'Add user'}
                tags={[
                  { id: '1', label: isRTL ? 'أحمد' : 'Ahmed' },
                  { id: '2', label: isRTL ? 'كمال' : 'Kamal' },
                ]}
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="card p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">
              {t('types.textarea.title')}
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              {t('types.textarea.description')}
            </p>
            <div className="max-w-[343px]">
              <InputField
                inputType="textarea"
                size="lg"
                label={isRTL ? 'عنوان الوصف' : 'Description'}
                placeholder={isRTL ? 'اكتب الوصف هنا..' : 'Write description here..'}
                rows={4}
              />
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('states.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('states.description')}
            </p>
          </div>

          {/* State Demonstration Grid */}
          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">
                      {t('states.state')}
                    </th>
                    <th className="pb-3 pe-6 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">
                      {t('states.large')}
                    </th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-start">
                      {t('states.small')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {/* Default */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t('states.default')}
                    </td>
                    <td className="py-4 pe-6">
                      <div className="max-w-[343px]">
                        <InputField
                          inputType="simple"
                          size="lg"
                          placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                        />
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="max-w-[343px]">
                        <InputField
                          inputType="simple"
                          size="sm"
                          placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                        />
                      </div>
                    </td>
                  </tr>
                  {/* Focused - Visual representation with brand border */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t('states.focused')}
                    </td>
                    <td className="py-4 pe-6">
                      <div className="max-w-[343px]">
                        <div
                          className="flex items-center rounded-xl border overflow-hidden min-h-[48px] bg-white dark:bg-neutral-900 px-4"
                          style={{ borderColor: focusBorderColor, borderWidth: '1px' }}
                        >
                          <input
                            type="text"
                            defaultValue={isRTL ? 'نص مكتوب' : 'Typed text'}
                            className="flex-1 min-w-0 bg-transparent outline-none text-sm py-3 text-neutral-900 dark:text-white"
                            readOnly
                          />
                          <User size={20} color={isDark ? '#94979C' : '#535862'} variant="Linear" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="max-w-[343px]">
                        <div
                          className="flex items-center rounded-xl border overflow-hidden min-h-[40px] bg-white dark:bg-neutral-900 px-4"
                          style={{ borderColor: focusBorderColor, borderWidth: '1px' }}
                        >
                          <input
                            type="text"
                            defaultValue={isRTL ? 'نص مكتوب' : 'Typed text'}
                            className="flex-1 min-w-0 bg-transparent outline-none text-xs py-2.5 text-neutral-900 dark:text-white"
                            readOnly
                          />
                          <User size={18} color={isDark ? '#94979C' : '#535862'} variant="Linear" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* Disabled */}
                  <tr>
                    <td className="py-4 pe-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t('states.disabled')}
                    </td>
                    <td className="py-4 pe-6">
                      <div className="max-w-[343px]">
                        <InputField
                          inputType="simple"
                          size="lg"
                          placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                          disabled
                        />
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="max-w-[343px]">
                        <InputField
                          inputType="simple"
                          size="sm"
                          placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                          disabled
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Danger Variants */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('danger.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('danger.description')}
            </p>
          </div>

          <div className="card p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="max-w-[343px]">
                <InputField
                  inputType="simple"
                  size="lg"
                  danger
                  label={isRTL ? 'حقل مطلوب' : 'Required Field'}
                  placeholder={isRTL ? 'أدخل النص' : 'Enter text'}
                  hint={isRTL ? 'هذا الحقل مطلوب' : 'This field is required'}
                />
              </div>
              <div className="max-w-[343px]">
                <InputField
                  inputType="leadingIcon"
                  size="lg"
                  danger
                  leadingIcon={<User size={20} variant="Linear" />}
                  label={isRTL ? 'اسم المستخدم' : 'Username'}
                  placeholder={isRTL ? 'أدخل اسم المستخدم' : 'Enter username'}
                  hint={isRTL ? 'اسم المستخدم موجود مسبقاً' : 'Username already exists'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chip Component */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {t('chip.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              {t('chip.description')}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex flex-wrap gap-3">
              <Chip label={isRTL ? 'أحمد' : 'Ahmed'} size="md" />
              <Chip label={isRTL ? 'كمال' : 'Kamal'} size="md" />
              <Chip label={isRTL ? 'سارة' : 'Sarah'} size="sm" />
              <Chip label={isRTL ? 'معطل' : 'Disabled'} size="md" disabled />
            </div>
          </div>
        </section>

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use clear, descriptive labels', textAr: 'استخدم تسميات واضحة ووصفية' },
            { text: 'Show validation errors inline with danger state', textAr: 'أظهر أخطاء التحقق مع حالة الخطر' },
            { text: 'Use appropriate input types for the data', textAr: 'استخدم أنواع الإدخال المناسبة للبيانات' },
            { text: 'Provide helpful hint text when needed', textAr: 'قدم نص مساعد مفيد عند الحاجة' },
            { text: 'Use leading icons to clarify input purpose', textAr: 'استخدم الأيقونات الأمامية لتوضيح الغرض' },
            { text: 'Use textarea for multi-line content', textAr: 'استخدم منطقة النص للمحتوى متعدد الأسطر' },
          ]}
          donts={[
            { text: "Don't use placeholder as the only label", textAr: 'لا تستخدم العنصر النائب كتسمية فقط' },
            { text: "Don't disable inputs without explanation", textAr: 'لا تعطل الحقول بدون توضيح' },
            { text: "Don't use danger state for non-error scenarios", textAr: 'لا تستخدم حالة الخطر لغير الأخطاء' },
            { text: "Don't mix input sizes in the same form", textAr: 'لا تخلط أحجام الحقول في نفس النموذج' },
            { text: "Don't overload with too many addons", textAr: 'لا تفرط في استخدام الإضافات' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}
