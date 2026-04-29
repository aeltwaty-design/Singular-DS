'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ComponentDocTemplate } from '@/components/docs/components/ComponentDocTemplate';
import { LivePlayground } from '@/components/docs/components/LivePlayground';
import { PropsTable } from '@/components/docs/components/PropsTable';
import { UsageGuidelines } from '@/components/docs/components/UsageGuidelines';
import { TabBar } from '@/components/ui';
import { Home2, Category2, User, Setting2, Add, Heart, Notification } from 'iconsax-react';

export default function TabBarPage() {
  const t = useTranslations('tabBarPage');
  const locale = useLocale();

  // Playground state
  const [itemCount, setItemCount] = useState<'4' | '5'>('4');
  const [showIndicator, setShowIndicator] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Tab items for 4 tabs - icons are passed as components (not JSX elements)
  const items4 = [
    { icon: Home2, label: t('items.home') },
    { icon: Category2, label: t('items.categories') },
    { icon: User, label: t('items.profile') },
    { icon: Setting2, label: t('items.settings') },
  ];

  // Tab items for 5 tabs
  const items5 = [
    { icon: Home2, label: t('items.home') },
    { icon: Category2, label: t('items.categories') },
    { icon: Heart, label: '' }, // Center icon (no label)
    { icon: User, label: t('items.profile') },
    { icon: Setting2, label: t('items.settings') },
  ];

  const currentItems = itemCount === '4' ? items4 : items5;

  const propsData = [
    {
      name: 'items',
      type: 'TabBarItem[]',
      defaultValue: '[]',
      description: t('props.items'),
    },
    {
      name: 'selectedIndex',
      type: 'number',
      defaultValue: '0',
      description: t('props.selectedIndex'),
    },
    {
      name: 'onTabChange',
      type: '(index: number) => void',
      defaultValue: 'undefined',
      description: t('props.onTabChange'),
    },
    {
      name: 'showIndicator',
      type: 'boolean',
      defaultValue: 'false',
      description: t('props.showIndicator'),
    },
    {
      name: 'showFab',
      type: 'boolean',
      defaultValue: 'false',
      description: t('props.showFab'),
    },
    {
      name: 'fabIcon',
      type: 'IconComponent',
      defaultValue: 'undefined',
      description: t('props.fabIcon'),
    },
    {
      name: 'onFabClick',
      type: '() => void',
      defaultValue: 'undefined',
      description: t('props.onFabClick'),
    },
    {
      name: 'position',
      type: "'demo' | 'fixed'",
      defaultValue: "'fixed'",
      description: t('props.position'),
    },
  ];

  const typesData = [
    {
      name: 'TabBarItem',
      type: '{ icon: IconComponent; label: string; }',
      description: t('types.tabBarItem'),
    },
  ];

  // Example preview component with phone frame styling
  const TabBarPreview = ({
    items,
    selected,
    indicator,
    fab,
    onSelect,
  }: {
    items: typeof items4;
    selected: number;
    indicator: boolean;
    fab: boolean;
    onSelect?: (index: number) => void;
  }) => (
    <div className="w-[375px] mx-auto border border-neutral-200 dark:border-neutral-700 rounded-[32px] overflow-hidden shadow-lg bg-white dark:bg-neutral-900">
      {/* Mock phone content area */}
      <div className="h-40 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center">
        <span className="text-neutral-400 text-sm">App Content</span>
      </div>
      {/* Tab Bar */}
      <TabBar
        items={items}
        selectedIndex={selected}
        onTabChange={onSelect || (() => {})}
        showIndicator={indicator}
        showFab={fab}
        fabIcon={Add}
        position="demo"
      />
    </div>
  );

  return (
    <ComponentDocTemplate
      title={t('title')}
      description={t('description')}
      category={t('category')}
      categorySlug="navigation"
    >
      {/* Live Playground */}
      <section className="space-y-6">
        <LivePlayground
          code={`<TabBar
  items={[
    { icon: Home2, label: "Home" },
    { icon: Category2, label: "Categories" },
    { icon: User, label: "Profile" },
    { icon: Setting2, label: "Settings" },
  ]}
  selectedIndex={${selectedIndex}}
  onTabChange={(index) => setSelectedIndex(index)}
  showIndicator={${showIndicator}}
  showFab={${showFab}}${showFab ? `
  fabIcon={Add}` : ''}
  position="demo"
/>`}
          scope={{ TabBar, Home2, Category2, User, Setting2, Add }}
          preview={
            <div className="w-full flex items-center justify-center py-8 bg-neutral-100 dark:bg-neutral-800/30 rounded-xl">
              <TabBarPreview
                items={currentItems}
                selected={selectedIndex}
                indicator={showIndicator}
                fab={showFab && itemCount === '4'}
                onSelect={setSelectedIndex}
              />
            </div>
          }
          controls={{
            'Items': {
              type: 'segmented',
              options: [
                { label: '4 Items', value: '4' },
                { label: '5 Items', value: '5' },
              ],
              defaultValue: '4',
              onChange: (value) => {
                setItemCount(value as '4' | '5');
                setSelectedIndex(0);
                // FAB only works with 4 items
                if (value === '5') setShowFab(false);
              },
            },
            'Selected': {
              type: 'segmented',
              options: Array.from({ length: parseInt(itemCount) }, (_, i) => ({
                label: `${i + 1}`,
                value: String(i),
              })),
              defaultValue: '0',
              onChange: (value) => setSelectedIndex(Number(value)),
            },
            'Indicator': {
              type: 'boolean',
              defaultValue: false,
              onChange: setShowIndicator,
            },
            'FAB': {
              type: 'boolean',
              defaultValue: false,
              onChange: (value) => {
                // FAB only available for 4 items
                if (itemCount === '4') setShowFab(value);
              },
            },
          }}
        />
      </section>

      {/* Icon States Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            Icon States
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Icons automatically switch between Linear (unselected) and Bold (selected) variants using iconsax-react.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-center gap-12">
            {/* Unselected State */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <Home2 size={24} variant="Linear" color="#626C83" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Unselected</p>
                <p className="text-xs text-neutral-500">Linear variant</p>
                <p className="text-xs text-neutral-400 font-mono">#626C83</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-neutral-300 dark:text-neutral-600 text-2xl">→</div>

            {/* Selected State */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Home2 size={24} variant="Bold" color="#00714C" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Selected</p>
                <p className="text-xs text-neutral-500">Bold variant</p>
                <p className="text-xs text-emerald-600 font-mono">Brand color</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant Examples */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            {t('sections.basicUsage.title')}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {t('sections.basicUsage.description')}
          </p>
        </div>

        {/* 4 Items Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            4 Items Variants
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Basic */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('sections.basicUsage.fourItems')}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✗ | FAB: ✗
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items4} selected={3} indicator={false} fab={false} />
              </div>
            </div>

            {/* With Indicator */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('sections.basicUsage.withIndicator')}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✓ | FAB: ✗
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items4} selected={3} indicator={true} fab={false} />
              </div>
            </div>

            {/* With FAB */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('sections.basicUsage.withFab')}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✗ | FAB: ✓
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items4} selected={3} indicator={false} fab={true} />
              </div>
            </div>

            {/* All Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('sections.basicUsage.allFeatures')}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✓ | FAB: ✓
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items4} selected={3} indicator={true} fab={true} />
              </div>
            </div>
          </div>
        </div>

        {/* 5 Items Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            5 Items Variants
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Note: FAB is not available with 5 items as there is no space in the center.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Basic 5 Items */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('sections.basicUsage.fiveItems')}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✗
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items5} selected={4} indicator={false} fab={false} />
              </div>
            </div>

            {/* 5 Items with Indicator */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  5 Items + Indicator
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Indicator: ✓
                </span>
              </div>
              <div className="flex justify-center">
                <TabBarPreview items={items5} selected={4} indicator={true} fab={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <PropsTable props={propsData} types={typesData} />

      {/* Usage Guidelines */}
      <UsageGuidelines
        dos={[
          { text: t('guidelines.dos.0.text'), textAr: t('guidelines.dos.0.textAr') },
          { text: t('guidelines.dos.1.text'), textAr: t('guidelines.dos.1.textAr') },
          { text: t('guidelines.dos.2.text'), textAr: t('guidelines.dos.2.textAr') },
          { text: t('guidelines.dos.3.text'), textAr: t('guidelines.dos.3.textAr') },
        ]}
        donts={[
          { text: t('guidelines.donts.0.text'), textAr: t('guidelines.donts.0.textAr') },
          { text: t('guidelines.donts.1.text'), textAr: t('guidelines.donts.1.textAr') },
          { text: t('guidelines.donts.2.text'), textAr: t('guidelines.donts.2.textAr') },
          { text: t('guidelines.donts.3.text'), textAr: t('guidelines.donts.3.textAr') },
        ]}
      />
    </ComponentDocTemplate>
  );
}
