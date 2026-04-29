'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Layout } from 'lucide-react';
import { useState } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';

const overlayData = [
  { opacity: 0.5, blur: 0 },
  { opacity: 0.32, blur: 0 },
  { opacity: 0.24, blur: 0 },
  { opacity: 0.1, blur: 16 },
];

const zIndexLayers = [
  { name: 'base', value: 0 },
  { name: 'dropdown', value: 10 },
  { name: 'sticky', value: 20 },
  { name: 'drawer', value: 30 },
  { name: 'modal', value: 40 },
  { name: 'toast', value: 50 },
  { name: 'tooltip', value: 60 },
];

function OverlayDemo({ overlay, index }: { overlay: typeof overlayData[0]; index: number }) {
  const { brandColors } = useBrand();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden"
    >
      {/* Preview */}
      <div className="relative h-40">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-hero-pattern opacity-30" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-3/4 bg-white/30 rounded" />
            <div className="h-3 w-1/2 bg-white/30 rounded" />
            <div className="h-3 w-2/3 bg-white/30 rounded" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity"
          style={{
            backgroundColor: `rgba(2, 6, 23, ${overlay.opacity})`,
            backdropFilter: overlay.blur > 0 ? `blur(${overlay.blur}px)` : 'none',
          }}
        >
          <div className="w-3/4 h-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Content</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-4 text-xs">
          <div>
            <span className="text-neutral-400">Opacity</span>
            <p className="font-mono text-neutral-700 dark:text-neutral-300">{overlay.opacity}</p>
          </div>
          <div>
            <span className="text-neutral-400">Blur</span>
            <p className="font-mono text-neutral-700 dark:text-neutral-300">{overlay.blur}px</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OverlaysPage() {
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
            <Layout className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('overlaysPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('overlaysPage.description')}
        </p>
      </motion.div>

      {/* Overlay types */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          {t('overlaysPage.overlayStyles')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overlayData.map((overlay, index) => (
            <OverlayDemo key={index} overlay={overlay} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Z-Index Layers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          Z-Index Layers
        </h2>

        <div className="relative h-80 rounded-2xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          {zIndexLayers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="absolute left-0 right-0 flex items-center px-6"
              style={{
                bottom: `${(index / (zIndexLayers.length - 1)) * 80 + 5}%`,
                zIndex: layer.value,
              }}
            >
              <div
                className="flex-1 h-10 rounded-lg flex items-center justify-between px-4 shadow-md"
                style={{
                  backgroundColor: `hsl(${index * 40}, 70%, 95%)`,
                  border: `2px solid hsl(${index * 40}, 70%, 80%)`,
                }}
              >
                <span className="text-sm font-medium text-neutral-700">
                  {layer.name}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  z-{layer.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {zIndexLayers.map((layer) => (
            <div
              key={layer.name}
              className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center"
            >
              <code className="text-xs font-mono" style={{ color: brandColors.primary }}>
                zIndex.{layer.name}
              </code>
              <p className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                {layer.value}
              </p>
            </div>
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
          {t('getStarted.usage.title')}
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Modal overlay
showDialog(
  context: context,
  barrierColor: colors.overlayDark,
  builder: (context) => Dialog(...),
);

// Bottom sheet with scrim
showModalBottomSheet(
  context: context,
  barrierColor: colors.scrim,
  builder: (context) => Sheet(...),
);

// Blur overlay (glass morphism)
BackdropFilter(
  filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
  child: Container(
    color: colors.overlayBlur,
    child: content,
  ),
);`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
