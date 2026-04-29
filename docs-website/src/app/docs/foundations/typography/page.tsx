'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Type, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard, cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

// Typography system from Figma design
const fontFamilies = {
  english: {
    name: 'Inter',
    language: 'English (LTR)',
    sample: 'The quick brown fox jumps over the lazy dog',
  },
  arabic: {
    name: 'Inter',
    language: 'Arabic (RTL)',
    sample: 'نص عربي تجريبي لاختبار الخطوط والأحرف المختلفة',
  },
};

// Headings scale from Figma
const headingsScale = [
  { token: 'Headings/XXL', size: 72, rem: '4.5rem', usage: 'Hero sections, splash screens' },
  { token: 'Headings/XL', size: 56, rem: '3.5rem', usage: 'Large promotional headings' },
  { token: 'Headings/L', size: 48, rem: '3rem', usage: 'Page titles, main headings' },
  { token: 'Headings/M', size: 40, rem: '2.5rem', usage: 'Section headers' },
  { token: 'Headings/S', size: 32, rem: '2rem', usage: 'Subsection headings' },
  { token: 'Headings/XS', size: 24, rem: '1.5rem', usage: 'Card titles, small headings' },
  { token: 'Headings/XXS', size: 20, rem: '1.25rem', usage: 'Component headings' },
];

// Text scale from Figma (with EN/AR differences)
const textScale = [
  { token: 'Text/XXL', sizeEn: 24, sizeAr: 24, rem: '1.5rem', usage: 'Large body text, lead paragraphs' },
  { token: 'Text/XL', sizeEn: 20, sizeAr: 24, remEn: '1.25rem', remAr: '1.5rem', usage: 'Emphasized body text' },
  { token: 'Text/L', sizeEn: 18, sizeAr: 18, rem: '1.125rem', usage: 'Default body text' },
  { token: 'Text/M', sizeEn: 16, sizeAr: 16, rem: '1rem', usage: 'Standard UI text' },
  { token: 'Text/S', sizeEn: 14, sizeAr: 14, rem: '0.875rem', usage: 'Secondary text, descriptions' },
  { token: 'Text/XS', sizeEn: 12, sizeAr: 12, rem: '0.75rem', usage: 'Captions, labels' },
  { token: 'Text/XXS', sizeEn: 10, sizeAr: 10, rem: '0.625rem', usage: 'Fine print, footnotes' },
];

// Font weights from Figma
const fontWeights = [
  { token: '700', name: 'Bold', cssWeight: 700, sample: 'Bold text for emphasis and headings' },
  { token: '600', name: 'Semibold', cssWeight: 600, sample: 'Semibold for subheadings and labels' },
  { token: '500', name: 'Medium', cssWeight: 500, sample: 'Medium for interactive elements' },
  { token: '400', name: 'Regular', cssWeight: 400, sample: 'Regular for body text and paragraphs' },
];

function HeadingScaleRow({ 
  item, 
  index, 
  brandColor 
}: { 
  item: typeof headingsScale[0]; 
  index: number; 
  brandColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `Font Size/${item.token}`;
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
      className="group grid grid-cols-12 gap-4 py-5 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-4 px-4 rounded-lg transition-colors items-center"
    >
      {/* Token name */}
      <div className="col-span-12 sm:col-span-4 lg:col-span-3">
        <div className="flex items-center gap-2">
          <code
            className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono"
            style={{ color: brandColor }}
          >
            {item.token}
          </code>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="col-span-12 sm:col-span-4 lg:col-span-5">
        <p 
          className="font-semibold text-neutral-900 dark:text-white truncate"
          style={{ fontSize: Math.min(item.size, 48) }}
        >
          Aa
        </p>
      </div>

      {/* Size */}
      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
        <span className="text-neutral-400 text-xs block sm:hidden">Size</span>
        <p className="text-neutral-900 dark:text-white font-mono text-sm">
          {item.size}px
        </p>
        <p className="text-neutral-500 text-xs font-mono">{item.rem}</p>
      </div>

      {/* Usage */}
      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
        <span className="text-neutral-400 text-xs block sm:hidden">Usage</span>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.usage}</p>
      </div>
    </motion.div>
  );
}

function TextScaleRow({ 
  item, 
  index, 
  brandColor,
  locale,
}: { 
  item: typeof textScale[0]; 
  index: number; 
  brandColor: string;
  locale: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `Font Size/${item.token}`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const hasDifference = item.sizeEn !== item.sizeAr;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group grid grid-cols-12 gap-4 py-5 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-4 px-4 rounded-lg transition-colors items-center"
    >
      {/* Token name */}
      <div className="col-span-12 sm:col-span-3">
        <div className="flex items-center gap-2">
          <code
            className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono"
            style={{ color: brandColor }}
          >
            {item.token}
          </code>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>
        </div>
      </div>

      {/* English */}
      <div className="col-span-6 sm:col-span-3">
        <span className="text-neutral-400 text-xs block mb-1">English</span>
        <p 
          className="text-neutral-900 dark:text-white truncate"
          style={{ fontSize: item.sizeEn }}
        >
          Sample text
        </p>
        <p className="text-neutral-500 text-xs font-mono mt-1">
          {item.sizeEn}px ({item.remEn || item.rem})
        </p>
      </div>

      {/* Arabic */}
      <div className="col-span-6 sm:col-span-3">
        <span className="text-neutral-400 text-xs block mb-1">Arabic</span>
        <p 
          className="text-neutral-900 dark:text-white truncate text-right"
          style={{ fontSize: item.sizeAr }}
          dir="rtl"
        >
          نص تجريبي
        </p>
        <p className="text-neutral-500 text-xs font-mono mt-1">
          {item.sizeAr}px ({item.remAr || item.rem})
          {hasDifference && (
            <span className="text-amber-500 ml-1">*</span>
          )}
        </p>
      </div>

      {/* Usage */}
      <div className="col-span-12 sm:col-span-3">
        <span className="text-neutral-400 text-xs block sm:hidden">Usage</span>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.usage}</p>
      </div>
    </motion.div>
  );
}

function FontWeightCard({ 
  weight, 
  index, 
  brandColor 
}: { 
  weight: typeof fontWeights[0]; 
  index: number; 
  brandColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `Font Weight/${weight.token}`;
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
      className="group card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <code
            className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono"
            style={{ color: brandColor }}
          >
            {weight.token}
          </code>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {weight.name}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </button>
      </div>
      <p 
        className="text-2xl text-neutral-900 dark:text-white mb-2"
        style={{ fontWeight: weight.cssWeight }}
      >
        {weight.sample}
      </p>
      <p className="text-xs text-neutral-500 font-mono">
        font-weight: {weight.cssWeight}
      </p>
    </motion.div>
  );
}

export default function TypographyPage() {
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
            <Type className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('typographyPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('typographyPage.description')}
        </p>
      </motion.div>

      {/* Font Families */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          {t('typographyPage.fontFamilies')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Font */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {fontFamilies.english.name}
              </h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${brandColors.primary}15`,
                  color: brandColors.primary,
                }}
              >
                {fontFamilies.english.language}
              </span>
            </div>
            <p className="text-2xl mb-4 text-neutral-900 dark:text-white font-medium">
              {fontFamilies.english.sample}
            </p>
            <div 
              className="text-sm px-3 py-2 rounded-lg font-mono"
              style={{ backgroundColor: `${brandColors.primary}10`, color: brandColors.primary }}
            >
              font-family: &apos;Inter&apos;, sans-serif
            </div>
          </div>

          {/* Arabic Font */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {fontFamilies.arabic.name}
              </h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${brandColors.primary}15`,
                  color: brandColors.primary,
                }}
              >
                {fontFamilies.arabic.language}
              </span>
            </div>
            <p 
              className="text-2xl mb-4 text-neutral-900 dark:text-white font-medium text-right"
              dir="rtl"
            >
              {fontFamilies.arabic.sample}
            </p>
            <div 
              className="text-sm px-3 py-2 rounded-lg font-mono"
              style={{ backgroundColor: `${brandColors.primary}10`, color: brandColors.primary }}
            >
              font-family: &apos;Inter&apos;, sans-serif
            </div>
          </div>
        </div>
      </motion.section>

      {/* Headings Scale */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('typographyPage.headingsScale')}
          </h2>
          <span className="text-sm text-neutral-500">
            {headingsScale.length} {t('typographyPage.sizes')}
          </span>
        </div>

        {/* Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-3">{t('typographyPage.token')}</div>
          <div className="col-span-5">{t('typographyPage.preview')}</div>
          <div className="col-span-2">{t('typographyPage.size')}</div>
          <div className="col-span-2">{t('typographyPage.usage')}</div>
        </div>

        {/* Rows */}
        <div>
          {headingsScale.map((item, index) => (
            <HeadingScaleRow 
              key={item.token} 
              item={item} 
              index={index} 
              brandColor={brandColors.primary}
            />
          ))}
        </div>
      </motion.section>

      {/* Text Scale */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              {t('typographyPage.textScale')}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              {t('typographyPage.textScaleNote')}
            </p>
          </div>
          <span className="text-sm text-neutral-500">
            {textScale.length} {t('typographyPage.sizes')}
          </span>
        </div>

        {/* Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-3">{t('typographyPage.token')}</div>
          <div className="col-span-3">English</div>
          <div className="col-span-3">Arabic</div>
          <div className="col-span-3">{t('typographyPage.usage')}</div>
        </div>

        {/* Rows */}
        <div>
          {textScale.map((item, index) => (
            <TextScaleRow 
              key={item.token} 
              item={item} 
              index={index} 
              brandColor={brandColors.primary}
              locale={locale}
            />
          ))}
        </div>

        {/* Note about differences */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-semibold">*</span> {t('typographyPage.arabicSizeNote')}
          </p>
        </div>
      </motion.section>

      {/* Font Weights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          {t('typographyPage.fontWeights')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fontWeights.map((weight, index) => (
            <FontWeightCard 
              key={weight.token} 
              weight={weight} 
              index={index} 
              brandColor={brandColors.primary}
            />
          ))}
        </div>
      </motion.section>

      {/* Usage example */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          {t('typographyPage.flutterUsage')}
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Access typography from context
final typography = context.typography;

// Headings scale
Text(
  'Hero Title',
  style: TextStyle(
    fontSize: typography.headings.xxl,  // 72px
    fontWeight: typography.fontWeight.bold,  // 700
    fontFamily: typography.fontFamily,  // Auto-switches based on locale
  ),
);

// Text scale
Text(
  'Body content',
  style: TextStyle(
    fontSize: typography.text.m,  // 16px
    fontWeight: typography.fontWeight.regular,  // 400
  ),
);

// Font family
// EN & AR → Inter

// Available sizes:
// Headings: xxl (72), xl (56), l (48), m (40), s (32), xs (24), xxs (20)
// Text: xxl (24), xl (20/24*), l (18), m (16), s (14), xs (12), xxs (10)
// *Arabic Text/XL is 24px instead of 20px`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
