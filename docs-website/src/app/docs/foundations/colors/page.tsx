'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Palette } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

// Import from new token system
import {
  grayLight,
  grayDark,
  statusColors,
  baseColors,
  brands,
} from '@/tokens';

// Import extracted components
import { ColorPaletteSectionResponsive } from '@/components/docs/colors';
import { ColorVariablesTable } from '@/components/colors/ColorVariablesTable';
import { semanticCategories } from '@/tokens/semantic';

// Base palette for display
const basePaletteDisplay = {
  White: baseColors.white,
  Black: baseColors.black,
  Transparent: baseColors.transparent,
};

export default function ColorsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brand, brandColors } = useBrand();
  const [activeCategory, setActiveCategory] = useState('text');

  // Get current brand from centralized tokens
  const currentBrand = brands[brand];

  // Status colors for the color variables table
  const statusColorsForTable = {
    error: statusColors.error,
    warning: statusColors.warning,
    success: statusColors.success,
    info: statusColors.info,
  };

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
            <Palette className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('colorPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('colorPage.description')}
        </p>
      </motion.div>

      {/* Primitives section - All color palettes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
            {t('colorPage.primitives')}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {t('colorPage.primitivesDesc')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Brand colors from centralized tokens */}
          <ColorPaletteSectionResponsive
            title={`${currentBrand.name} Primary`}
            colors={currentBrand.primary}
          />
          <ColorPaletteSectionResponsive
            title={`${currentBrand.name} Secondary`}
            colors={currentBrand.secondary}
          />

          {/* Base colors */}
          <ColorPaletteSectionResponsive
            title="Base"
            colors={basePaletteDisplay}
            showContrastRatio={false}
          />

          {/* Gray palettes from centralized tokens */}
          <ColorPaletteSectionResponsive
            title="Gray (Light Mode)"
            colors={grayLight}
          />
          <ColorPaletteSectionResponsive
            title="Gray (Dark Mode)"
            colors={grayDark}
          />

          {/* Status colors from centralized tokens */}
          <ColorPaletteSectionResponsive title="Error" colors={statusColors.error} />
          <ColorPaletteSectionResponsive title="Warning" colors={statusColors.warning} />
          <ColorPaletteSectionResponsive title="Success" colors={statusColors.success} />
          <ColorPaletteSectionResponsive title="Info" colors={statusColors.info} />
        </div>
      </motion.section>

      {/* Color Variables section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-16"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              {t('colorPage.colorVariables')}
            </h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              {t('colorPage.variablesBadge')}
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl">
            {t('colorPage.colorVariablesDesc')}
          </p>
        </div>

        {/* Category tabs - Using semantic categories from tokens */}
        <div className="flex gap-2 mb-6 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
          {semanticCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap',
                activeCategory === category.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {locale === 'ar' ? category.nameAr : category.name}
            </button>
          ))}
        </div>

        {/* Active category content */}
        {semanticCategories.map((category) => (
          <div
            key={category.id}
            className={cn(activeCategory === category.id ? 'block' : 'hidden')}
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {locale === 'ar' ? category.descriptionAr : category.description}
            </p>
            <ColorVariablesTable
              variables={category.tokens.map((token) => ({
                name: token.name,
                lightValue: token.light,
                darkValue: token.dark,
                usage: token.description,
                usageAr: token.descriptionAr,
              }))}
              brandPrimary={currentBrand.primary}
              brandSecondary={currentBrand.secondary}
              grayLight={grayLight}
              grayDark={grayDark}
              statusColors={statusColorsForTable}
              translations={{
                name: t('colorPage.variableColumns.name'),
                lightMode: t('colorPage.variableColumns.lightMode'),
                darkMode: t('colorPage.variableColumns.darkMode'),
                usage: t('colorPage.variableColumns.usage'),
              }}
            />
          </div>
        ))}
      </motion.section>
    </div>
  );
}
