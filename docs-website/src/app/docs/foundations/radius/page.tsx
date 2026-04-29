'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Circle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

const radiusTokens = [
  { name: 'none', value: 0, description: 'Sharp corners' },
  { name: 'xs', value: 4, description: 'Extra small radius' },
  { name: 'sm', value: 8, description: 'Small radius' },
  { name: 'md', value: 12, description: 'Medium radius' },
  { name: 'lg', value: 16, description: 'Large radius' },
  { name: 'xl', value: 24, description: 'Extra large radius' },
  { name: 'full', value: 999, description: 'Fully rounded (pill/circle)' },
];

function RadiusCard({ radius, index }: { radius: typeof radiusTokens[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const { brandColors } = useBrand();

  const handleCopy = async () => {
    const code = `radius.${radius.name}`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group card p-6 text-center"
    >
      {/* Preview */}
      <div className="flex justify-center mb-4">
        <div
          className="w-20 h-20 transition-transform group-hover:scale-110"
          style={{
            backgroundColor: brandColors.primary,
            borderRadius: radius.value === 999 ? '50%' : radius.value,
          }}
        />
      </div>

      {/* Info */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <code
          className="text-sm font-mono font-medium"
          style={{ color: brandColors.primary }}
        >
          {radius.name}
        </code>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </button>
      </div>
      <p className="text-sm text-neutral-500 font-mono">{radius.value}px</p>
      <p className="text-xs text-neutral-400 mt-1">{radius.description}</p>
    </motion.div>
  );
}

export default function RadiusPage() {
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
            <Circle className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('radiusPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('radiusPage.description')}
        </p>
      </motion.div>

      {/* Radius tokens grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {radiusTokens.map((radius, index) => (
            <RadiusCard key={radius.name} radius={radius} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Visual comparison */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Comparison
        </h2>
        <div className="card p-8 bg-neutral-100 dark:bg-neutral-900">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {radiusTokens.map((radius) => (
              <div key={radius.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 bg-white dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600"
                  style={{
                    borderRadius: radius.value === 999 ? '50%' : radius.value,
                  }}
                />
                <span className="text-xs text-neutral-500 font-mono">{radius.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Helper methods */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Partial Rounding
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'topOnly', label: 'Top Only' },
            { name: 'bottomOnly', label: 'Bottom Only' },
            { name: 'leftOnly', label: 'Left Only' },
            { name: 'rightOnly', label: 'Right Only' },
          ].map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card p-4 text-center"
            >
              <div className="flex justify-center mb-3">
                <div
                  className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700"
                  style={{
                    borderRadius:
                      method.name === 'topOnly'
                        ? '12px 12px 0 0'
                        : method.name === 'bottomOnly'
                        ? '0 0 12px 12px'
                        : method.name === 'leftOnly'
                        ? '12px 0 0 12px'
                        : '0 12px 12px 0',
                  }}
                />
              </div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {method.label}
              </p>
              <code className="text-xs text-neutral-500 font-mono">
                radius.{method.name}(radius.md)
              </code>
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
            <code>{`// Access radius from context
final radius = context.radius;

// Apply to BoxDecoration
Container(
  decoration: BoxDecoration(
    borderRadius: radius.md, // 12px all corners
  ),
);

// Partial rounding
Container(
  decoration: BoxDecoration(
    borderRadius: radius.topOnly(radius.lg), // top corners only
  ),
);

// Use with shapes
Card(
  shape: radius.shapeBorder(radius.xl), // RoundedRectangleBorder
);

// Pill shape
Container(
  decoration: BoxDecoration(
    borderRadius: radius.full, // 999px for pills
  ),
);

// Circle
Container(
  shape: radius.circleBorder, // CircleBorder()
);`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
