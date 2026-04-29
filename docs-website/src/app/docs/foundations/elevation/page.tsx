'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Layers, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

const elevationData = [
  { level: 0, name: 'level0', shadow: 'none', blur: '0px' },
  { level: 1, name: 'level1', shadow: '0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)', blur: '4px' },
  { level: 2, name: 'level2', shadow: '0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.08)', blur: '8px' },
  { level: 3, name: 'level3', shadow: '0 4px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.10)', blur: '16px' },
  { level: 4, name: 'level4', shadow: '0 8px 12px rgba(0,0,0,0.06), 0 16px 24px rgba(0,0,0,0.12)', blur: '24px' },
];

const blurData = [
  { key: 'subtleBlur', value: '4px', cssValue: 'blur(4px)' },
  { key: 'mediumBlur', value: '8px', cssValue: 'blur(8px)' },
  { key: 'heavyBlur', value: '16px', cssValue: 'blur(16px)' },
  { key: 'extraBlur', value: '24px', cssValue: 'blur(24px)' },
];

function ElevationCard({ 
  elevation, 
  index, 
  translations 
}: { 
  elevation: typeof elevationData[0]; 
  index: number;
  translations: {
    title: string;
    description: string;
    usage: string;
    blur: string;
  };
}) {
  const [copied, setCopied] = useState(false);
  const { brandColors } = useBrand();

  const handleCopy = async () => {
    const code = `elevation.${elevation.name}`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="card p-6">
        {/* Preview */}
        <div className="h-32 mb-6 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl">
          <div
            className="w-24 h-24 bg-white dark:bg-neutral-700 rounded-xl transition-transform group-hover:scale-105"
            style={{ boxShadow: elevation.shadow }}
          />
        </div>

        {/* Info */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {translations.title}
            </h3>
            <p className="text-sm text-neutral-500">{translations.description}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-neutral-400" />
            )}
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">{translations.usage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">{translations.blur}</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-mono">{elevation.blur}</span>
          </div>
        </div>

        <code
          className="mt-4 block text-xs px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-mono"
          style={{ color: brandColors.primary }}
        >
          elevation.{elevation.name}
        </code>
      </div>
    </motion.div>
  );
}

export default function ElevationPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();

  const elevationTranslations = [
    { title: t('elevationPage.level0.title'), description: t('elevationPage.level0.description'), usage: t('elevationPage.level0.usage'), blur: t('elevationPage.blur') },
    { title: t('elevationPage.level1.title'), description: t('elevationPage.level1.description'), usage: t('elevationPage.level1.usage'), blur: t('elevationPage.blur') },
    { title: t('elevationPage.level2.title'), description: t('elevationPage.level2.description'), usage: t('elevationPage.level2.usage'), blur: t('elevationPage.blur') },
    { title: t('elevationPage.level3.title'), description: t('elevationPage.level3.description'), usage: t('elevationPage.level3.usage'), blur: t('elevationPage.blur') },
    { title: t('elevationPage.level4.title'), description: t('elevationPage.level4.description'), usage: t('elevationPage.level4.usage'), blur: t('elevationPage.blur') },
  ];

  const blurTranslations = blurData.map((blur) => ({
    ...blur,
    name: t(`elevationPage.${blur.key}.name`),
    usage: t(`elevationPage.${blur.key}.usage`),
  }));

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
            <Layers className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('elevationPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('elevationPage.description')}
        </p>
      </motion.div>

      {/* Elevation Levels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          {t('elevationPage.elevationLevels')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {elevationData.map((elevation, index) => (
            <ElevationCard 
              key={elevation.level} 
              elevation={elevation} 
              index={index}
              translations={elevationTranslations[index]}
            />
          ))}
        </div>
      </motion.section>

      {/* Interactive comparison */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <div className="card p-8 bg-neutral-100 dark:bg-neutral-900">
          <div className="flex items-end justify-center gap-8 h-48">
            {elevationData.map((elevation) => (
              <div key={elevation.level} className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 bg-white dark:bg-neutral-700 rounded-xl transition-all hover:scale-110"
                  style={{
                    boxShadow: elevation.shadow,
                    transform: `translateY(-${elevation.level * 4}px)`,
                  }}
                />
                <span className="text-xs font-mono text-neutral-500">
                  L{elevation.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blur Effects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          {t('elevationPage.blurEffects')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blurTranslations.map((blur, index) => (
            <motion.div
              key={blur.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative rounded-2xl overflow-hidden h-48"
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary}40, ${brandColors.secondary}40)`,
                }}
              >
                <div className="absolute inset-0 bg-hero-pattern opacity-50" />
              </div>

              {/* Blurred overlay */}
              <div
                className="absolute inset-4 rounded-xl bg-white/30 dark:bg-black/30 flex flex-col items-center justify-center"
                style={{ backdropFilter: blur.cssValue }}
              >
                <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {blur.name}
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-300 font-mono">
                  {blur.value}
                </span>
                <span className="text-xs text-neutral-500 mt-2">{blur.usage}</span>
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
          {t('getStarted.usage.title')}
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Access elevation from context
final elevation = context.elevation;

// Apply shadow to container
Container(
  decoration: BoxDecoration(
    color: colors.bgSurface,
    borderRadius: radius.lg,
    boxShadow: elevation.level2, // Medium shadow
  ),
);

// Use helper method
Container(
  decoration: elevation.decoration(
    level: 3,
    color: colors.bgSurface,
    borderRadius: radius.md,
  ),
);

// Brand-tinted shadows
boxShadow: elevation.brandShadow(
  colors.brandPrimary,
  2, // level
),`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
