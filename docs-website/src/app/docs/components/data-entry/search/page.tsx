'use client';

import { FormInput, Search, X } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { Input, IconButton } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function SearchPage() {
  const component = getComponentBySlug('data-entry', 'search');

  if (!component) return null;

  const code = `import { SearchInput } from '@singular/ui';

<SearchInput
  placeholder="Search..."
  onSearch={(value) => console.log(value)}
/>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Data Entry"
      categorySlug="data-entry"
      icon={<FormInput className="w-6 h-6" />}
    >
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="w-full max-w-md mx-auto">
            <Input placeholder="Search..." leftIcon={<Search className="w-4 h-4" />} rightIcon={<IconButton icon={<X className="w-3 h-3" />} label="Clear" size="sm" />} />
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={<Input placeholder="Search..." leftIcon={<Search className="w-4 h-4" />} size="sm" />}
          tablet={<Input placeholder="Search products..." leftIcon={<Search className="w-4 h-4" />} />}
          desktop={<Input placeholder="Search for products, brands, and more..." leftIcon={<Search className="w-4 h-4" />} className="max-w-lg" />}
        />

        <UsageGuidelines
          dos={[
            { text: 'Use search icon for recognition', textAr: 'استخدم أيقونة البحث للتعرف' },
            { text: 'Provide clear button when input has value', textAr: 'وفر زر مسح عندما يحتوي الإدخال على قيمة' },
            { text: 'Show search suggestions', textAr: 'أظهر اقتراحات البحث' },
          ]}
          donts={[
            { text: "Don't require exact matches", textAr: 'لا تتطلب مطابقات دقيقة' },
            { text: "Don't hide the search input", textAr: 'لا تخف حقل البحث' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

