'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Grid3X3, Monitor, Tablet, Smartphone, Layers } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';

const breakpoints = [
  {
    name: 'Mobile',
    icon: Smartphone,
    width: '< 768px',
    columns: 4,
    margin: '16px',
    gutter: '16px',
  },
  {
    name: 'Tablet',
    icon: Tablet,
    width: '768px - 1199px',
    columns: 8,
    margin: '32px',
    gutter: '24px',
  },
  {
    name: 'Desktop',
    icon: Monitor,
    width: '≥ 1200px',
    columns: 12,
    margin: '64px',
    gutter: '32px',
  },
];

const overlayTokens = [
  {
    name: 'overlayLight',
    description: 'Light overlay for dark elements',
    value: 'rgba(255, 255, 255, 0.9)',
    usage: 'Light mode popups on dark backgrounds',
  },
  {
    name: 'overlayDark',
    description: 'Dark overlay for modals',
    value: 'rgba(2, 6, 23, 0.5)',
    usage: 'Modal backdrops, drawer overlays',
  },
  {
    name: 'scrim',
    description: 'Semi-transparent scrim',
    value: 'rgba(0, 0, 0, 0.32)',
    usage: 'Bottom sheets, side panels',
  },
];

export default function GridPage() {
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
            <Grid3X3 className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('gridPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('gridPage.description')}
        </p>
      </motion.div>

      {/* Breakpoints */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          {t('gridPage.breakpoints')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breakpoints.map((bp, index) => (
            <motion.div
              key={bp.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${brandColors.primary}15` }}
                >
                  <bp.icon className="w-5 h-5" style={{ color: brandColors.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {bp.name}
                  </h3>
                  <p className="text-sm text-neutral-500 font-mono">{bp.width}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Columns</span>
                  <span className="font-mono text-neutral-700 dark:text-neutral-300">{bp.columns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Page Margin</span>
                  <span className="font-mono text-neutral-700 dark:text-neutral-300">{bp.margin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Gutter</span>
                  <span className="font-mono text-neutral-700 dark:text-neutral-300">{bp.gutter}</span>
                </div>
              </div>

              {/* Visual grid preview */}
              <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex gap-1">
                  {Array.from({ length: bp.columns }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-8 rounded"
                      style={{ backgroundColor: `${brandColors.primary}30` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Grid Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Grid Preview
        </h2>
        <div className="card p-6 bg-neutral-100 dark:bg-neutral-900">
          <div className="relative">
            {/* Grid columns */}
            <div className="grid grid-cols-12 gap-2 md:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-lg flex items-center justify-center text-xs font-mono"
                  style={{
                    backgroundColor: `${brandColors.primary}20`,
                    color: brandColors.primary,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Example content blocks */}
            <div className="mt-6 grid grid-cols-12 gap-2 md:gap-4">
              <div
                className="col-span-12 md:col-span-8 h-24 rounded-lg flex items-center justify-center text-sm font-medium text-white"
                style={{ backgroundColor: brandColors.primary }}
              >
                8 columns
              </div>
              <div
                className="col-span-12 md:col-span-4 h-24 rounded-lg flex items-center justify-center text-sm font-medium text-white"
                style={{ backgroundColor: brandColors.secondary }}
              >
                4 columns
              </div>
            </div>

            <div className="mt-4 grid grid-cols-12 gap-2 md:gap-4">
              <div className="col-span-6 md:col-span-3 h-20 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xs">3 col</div>
              <div className="col-span-6 md:col-span-3 h-20 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xs">3 col</div>
              <div className="col-span-6 md:col-span-3 h-20 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xs">3 col</div>
              <div className="col-span-6 md:col-span-3 h-20 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xs">3 col</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Overlay Tokens */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-neutral-500" />
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Overlay Tokens
          </h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Background overlays for modals, drawers, and layered UI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {overlayTokens.map((token, index) => (
            <motion.div
              key={token.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card overflow-hidden"
            >
              {/* Preview */}
              <div className="h-32 relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`,
                  }}
                >
                  <div className="absolute inset-0 bg-hero-pattern opacity-30" />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: token.value }}
                >
                  <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <code
                  className="text-sm font-mono"
                  style={{ color: brandColors.primary }}
                >
                  {token.name}
                </code>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {token.description}
                </p>
                <p className="text-xs text-neutral-500 mt-2 font-mono">
                  {token.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Usage */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Usage in Flutter
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Responsive spacing
final spacing = AppSpacing.responsive(
  MediaQuery.of(context).size.width,
);

// Page with responsive margins
Padding(
  padding: EdgeInsets.symmetric(
    horizontal: spacing.pageMargin,
  ),
  child: ...,
);

// Grid gap
Wrap(
  spacing: spacing.gutter,
  runSpacing: spacing.gutter,
  children: [...],
);

// Modal overlay
Container(
  color: colors.overlayDark,
  child: Center(
    child: Dialog(...),
  ),
);`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
