'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Maximize, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

const spacingScale = [
  { name: 'none', value: 0, description: 'No spacing' },
  { name: 'xxs', value: 2, description: 'Extra extra small' },
  { name: 'xs', value: 4, description: 'Extra small (1 unit)' },
  { name: 'sm', value: 8, description: 'Small (2 units)' },
  { name: 'md', value: 12, description: 'Medium (3 units)' },
  { name: 'lg', value: 16, description: 'Large (4 units)' },
  { name: 'xl', value: 20, description: 'Extra large (5 units)' },
  { name: 'xxl', value: 24, description: 'Extra extra large (6 units)' },
  { name: 'section', value: 32, description: 'Section spacing (8 units)' },
  { name: 'sectionLg', value: 48, description: 'Large section (12 units)' },
  { name: 'sectionXl', value: 64, description: 'Extra large section (16 units)' },
];

const sizingTokens = [
  { name: 'iconSm', value: 16, description: 'Small icons' },
  { name: 'iconMd', value: 20, description: 'Medium icons' },
  { name: 'iconLg', value: 24, description: 'Large icons' },
  { name: 'iconXl', value: 32, description: 'Extra large icons' },
  { name: 'touchTarget', value: 48, description: 'Minimum touch target' },
  { name: 'buttonHeight', value: 48, description: 'Default button height' },
  { name: 'inputHeight', value: 48, description: 'Default input height' },
  { name: 'avatarSm', value: 32, description: 'Small avatar' },
  { name: 'avatarMd', value: 40, description: 'Medium avatar' },
  { name: 'avatarLg', value: 56, description: 'Large avatar' },
];

function SpacingRow({ item, index }: { item: typeof spacingScale[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const { brandColors } = useBrand();

  const handleCopy = async () => {
    const code = `spacing.${item.name}`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center gap-6 py-4 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-4 px-4 rounded-lg transition-colors"
    >
      {/* Token name */}
      <div className="w-28 flex items-center gap-2">
        <code
          className="text-sm font-mono"
          style={{ color: brandColors.primary }}
        >
          {item.name}
        </code>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Visual bar */}
      <div className="flex-1 flex items-center gap-4">
        <div
          className="h-6 rounded transition-all group-hover:opacity-80"
          style={{
            width: `${Math.max(item.value * 2, 4)}px`,
            backgroundColor: brandColors.primary,
          }}
        />
        <span className="text-sm text-neutral-500 font-mono w-12">
          {item.value}px
        </span>
      </div>

      {/* Description */}
      <div className="hidden md:block w-48 text-sm text-neutral-600 dark:text-neutral-400">
        {item.description}
      </div>
    </motion.div>
  );
}

export default function SpacingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/docs/foundations"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          <span className="rtl:rotate-180">←</span>
          <span>{locale === 'ar' ? 'الأساسيات' : 'Foundations'}</span>
        </Link>
      </motion.div>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${brandColors.primary}20` }}
          >
            <Maximize className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('spacingPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('spacingPage.description')}
        </p>
      </motion.div>

      {/* Base unit callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-12 flex items-center gap-6"
        style={{ borderColor: brandColors.primary, borderWidth: '2px' }}
      >
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
          style={{ backgroundColor: brandColors.primary }}
        >
          4
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {t('spacingPage.baseUnit')}: 4px
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {t('spacingPage.baseUnitDesc')}
          </p>
        </div>
      </motion.div>

      {/* Spacing Scale */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          {t('spacingPage.scale')}
        </h2>

        <div className="card p-4">
          {spacingScale.map((item, index) => (
            <SpacingRow key={item.name} item={item} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Sizing Tokens */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Sizing Tokens
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Standard sizes for icons, buttons, inputs, and avatars
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sizingTokens.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="card p-4 flex items-center gap-4"
            >
              <div
                className="rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800"
                style={{
                  width: Math.min(item.value, 56),
                  height: Math.min(item.value, 56),
                }}
              >
                <div
                  className="rounded"
                  style={{
                    width: item.value > 32 ? 24 : item.value * 0.6,
                    height: item.value > 32 ? 24 : item.value * 0.6,
                    backgroundColor: brandColors.primary,
                  }}
                />
              </div>
              <div>
                <code
                  className="text-sm font-mono"
                  style={{ color: brandColors.primary }}
                >
                  {item.name}
                </code>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-neutral-500">{item.value}px</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-600 dark:text-neutral-400">{item.description}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gap widgets */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Gap Widgets
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Convenience gap widgets
Column(
  children: [
    Text('Title'),
    Gap.md(),        // 12px gap
    Text('Subtitle'),
    Gap.sm(),        // 8px gap
    Text('Body'),
  ],
);

// Horizontal gaps
Row(
  children: [
    Icon(Icons.star),
    HGap.xs(),       // 4px horizontal gap
    Text('Rating'),
  ],
);

// Vertical gaps
VGap.section();    // 32px vertical gap
VGap.sectionLg();  // 48px vertical gap`}</code>
          </pre>
        </div>
      </motion.section>

      {/* Usage */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Usage in Flutter
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Access spacing from context
final spacing = context.spacing;

// Use predefined tokens
Padding(
  padding: EdgeInsets.all(spacing.md),
  child: ...,
);

// Helper methods
Container(
  padding: spacing.horizontal(spacing.lg), // horizontal: 16px
  margin: spacing.vertical(spacing.sm),    // vertical: 8px
);

// Page-level spacing
Padding(
  padding: spacing.pageInsets, // responsive margins
  child: ...,
);

// Custom scaled values
SizedBox(
  width: spacing.scaled(10), // 40px (10 × 4px)
);`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
