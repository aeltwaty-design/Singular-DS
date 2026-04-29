'use client';

import { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import {
  ComponentDocTemplate,
  LivePlayground,
  PropsTable,
  ResponsivePreview,
  UsageGuidelines,
} from '@/components/docs/components';
import { Hyperlink } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function HyperlinkPage() {
  const component = getComponentBySlug('call-to-actions', 'hyperlink');
  const [underline, setUnderline] = useState<'always' | 'hover' | 'none'>('hover');
  const [external, setExternal] = useState(false);

  if (!component) return null;

  const code = `import { Hyperlink } from '@singular/ui';

<Hyperlink
  href="/docs"
  underline="${underline}"
  ${external ? 'external' : ''}
>
  Learn more
</Hyperlink>`;

  return (
    <ComponentDocTemplate
      title={component.name}
      titleAr={component.nameAr}
      description={component.description}
      descriptionAr={component.descriptionAr}
      category="Call to Actions"
      categorySlug="call-to-actions"
      icon={<MousePointerClick className="w-6 h-6" />}
    >
      <div className="space-y-12">
        {/* Live Playground */}
        <LivePlayground
          code={code}
          controls={[
            {
              name: 'Underline',
              nameAr: 'الخط السفلي',
              type: 'select',
              defaultValue: 'hover',
              options: [
                { value: 'always', label: 'Always', labelAr: 'دائمًا' },
                { value: 'hover', label: 'On Hover', labelAr: 'عند التمرير' },
                { value: 'none', label: 'None', labelAr: 'بدون' },
              ],
            },
            {
              name: 'External',
              nameAr: 'خارجي',
              type: 'boolean',
              defaultValue: false,
            },
          ]}
          controlValues={{ Underline: underline, External: external }}
          onControlChange={(name, value) => {
            if (name === 'Underline') setUnderline(value as typeof underline);
            if (name === 'External') setExternal(value as boolean);
          }}
        >
          <div className="flex flex-wrap gap-4 justify-center text-lg">
            <Hyperlink href="/docs" underline={underline} external={external}>
              Learn more about Singular
            </Hyperlink>
          </div>
        </LivePlayground>

        {/* Responsive Preview */}
        <ResponsivePreview
          mobile={
            <p className="text-sm">
              Read our <Hyperlink href="/docs">documentation</Hyperlink> for more details.
            </p>
          }
          tablet={
            <p className="text-base">
              Check out the <Hyperlink href="https://github.com" external>GitHub repository</Hyperlink> for the source code.
            </p>
          }
          desktop={
            <p className="text-lg">
              Visit our <Hyperlink href="https://figma.com" external>Figma file</Hyperlink> to explore the design system.
            </p>
          }
        />

        {/* Props Table */}
        {component.props && <PropsTable props={component.props} />}

        {/* Usage Guidelines */}
        <UsageGuidelines
          dos={[
            { text: 'Use descriptive link text', textAr: 'استخدم نص رابط وصفي' },
            { text: 'Indicate external links clearly', textAr: 'أشر إلى الروابط الخارجية بوضوح' },
            { text: 'Use within text content', textAr: 'استخدم داخل المحتوى النصي' },
          ]}
          donts={[
            { text: "Don't use 'click here' as link text", textAr: "لا تستخدم 'انقر هنا' كنص للرابط" },
            { text: "Don't open internal links in new tabs", textAr: 'لا تفتح الروابط الداخلية في تبويبات جديدة' },
            { text: "Don't use links for actions (use buttons)", textAr: 'لا تستخدم الروابط للإجراءات (استخدم الأزرار)' },
          ]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

