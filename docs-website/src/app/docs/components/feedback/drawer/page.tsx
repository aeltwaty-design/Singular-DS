'use client';

import { MessageCircle, X, Home, Settings, User, Bell } from 'lucide-react';
import { ComponentDocTemplate, LivePlayground, ResponsivePreview, UsageGuidelines } from '@/components/docs/components';
import { IconButton } from '@/components/ui';
import { getComponentBySlug } from '@/data/components';

export default function DrawerPage() {
  const component = getComponentBySlug('feedback', 'drawer');
  if (!component) return null;

  const code = `import { Drawer } from '@singular/ui';

<Drawer open={isOpen} onClose={() => setIsOpen(false)} position="left">
  <DrawerContent>
    Navigation menu
  </DrawerContent>
</Drawer>`;

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: User, label: 'Profile' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <ComponentDocTemplate title={component.name} titleAr={component.nameAr} description={component.description} descriptionAr={component.descriptionAr} category="Feedback" categorySlug="feedback" icon={<MessageCircle className="w-6 h-6" />}>
      <div className="space-y-12">
        <LivePlayground code={code}>
          <div className="relative h-64 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-neutral-900 shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-semibold">Menu</span>
                <IconButton icon={<X className="w-5 h-5" />} label="Close" size="sm" />
              </div>
              <nav className="p-2">
                {menuItems.map((item) => (
                  <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </LivePlayground>

        <ResponsivePreview
          mobile={
            <div className="relative h-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-48 bg-white dark:bg-neutral-900 p-3">
                <p className="font-medium text-sm mb-2">Menu</p>
                {menuItems.slice(0, 3).map((item) => (
                  <div key={item.label} className="flex items-center gap-2 py-2 text-sm"><item.icon className="w-4 h-4" /> {item.label}</div>
                ))}
              </div>
            </div>
          }
          tablet={
            <div className="relative h-48 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-56 bg-white dark:bg-neutral-900 shadow-xl p-4">
                <p className="font-semibold mb-3">Navigation</p>
                {menuItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2"><item.icon className="w-5 h-5" /> {item.label}</div>
                ))}
              </div>
            </div>
          }
          desktop={<p className="text-center text-neutral-500 py-8">Use side navigation on desktop instead</p>}
        />

        <UsageGuidelines
          dos={[{ text: 'Use for mobile navigation', textAr: 'استخدم للتنقل على الجوال' }, { text: 'Allow closing by overlay click', textAr: 'اسمح بالإغلاق بالنقر على الغطاء' }]}
          donts={[{ text: "Don't use for primary desktop nav", textAr: 'لا تستخدم للتنقل الأساسي على سطح المكتب' }]}
        />
      </div>
    </ComponentDocTemplate>
  );
}

