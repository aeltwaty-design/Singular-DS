'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Shapes, Copy, Check, Info, Search, X, Download, Code, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard, cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { Icon, IconSizes, IconVariant } from '@/components/icons';
import { iconCategories, variantDescriptions, searchIcons, IconData, IconVariant as DataIconVariant } from '@/data/icons';
import { flags, searchFlags, FlagData } from '@/data/flags';
import { Flag } from '@/components/icons/Flag';
import { socialIcons, searchSocialIcons, SocialIconData } from '@/data/socialIcons';
import { SocialIcon, SocialPlatform, getSocialBrandColor } from '@/components/icons/SocialIcon';

// Constants
const ITEMS_PER_PAGE = 60;

// Helper to get localized category name
function getCategoryName(category: { name: string; nameAr: string }, locale: string): string {
  return locale === 'ar' ? category.nameAr : category.name;
}

// Pagination component
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  brandColor,
  t,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  brandColor: string;
  t: (key: string) => string;
}) {
  if (totalPages <= 1) return null;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showPages = 5; // Number of page buttons to show
    
    if (totalPages <= showPages + 2) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg transition-all',
          currentPage === 1
            ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        )}
        aria-label={t('iconographyPage.previousPage')}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-neutral-400 dark:text-neutral-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all',
                currentPage === page
                  ? 'text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
              style={currentPage === page ? { backgroundColor: brandColor } : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-all',
          currentPage === totalPages
            ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        )}
        aria-label={t('iconographyPage.nextPage')}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// Flag card component
function FlagCard({
  flag,
  brandColor,
  onSelect,
  isSelected,
  locale,
}: {
  flag: FlagData;
  brandColor: string;
  onSelect: () => void;
  isSelected: boolean;
  locale: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(flag.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all',
        'bg-white dark:bg-neutral-900 border-2',
        isSelected
          ? 'border-current shadow-lg'
          : 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
      )}
      style={isSelected ? { borderColor: brandColor } : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-2">
        <Flag code={flag.code} size="lg" />
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate max-w-full">
        {locale === 'ar' ? flag.nameAr : flag.name}
      </span>
      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
        {flag.code}
      </span>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-500" />
        ) : (
          <Copy className="w-3 h-3 text-neutral-400" />
        )}
      </button>
    </motion.button>
  );
}

// Social icon card component
function SocialIconCard({
  icon,
  brandColor,
  onSelect,
  isSelected,
  locale,
}: {
  icon: SocialIconData;
  brandColor: string;
  onSelect: () => void;
  isSelected: boolean;
  locale: string;
}) {
  const [copied, setCopied] = useState(false);
  const [isColored, setIsColored] = useState(true);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(icon.id);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all',
        'bg-white dark:bg-neutral-900 border-2',
        isSelected
          ? 'border-current shadow-lg'
          : 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
      )}
      style={isSelected ? { borderColor: brandColor } : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-2">
        <SocialIcon platform={icon.id as SocialPlatform} size="lg" colored={isColored} />
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate max-w-full">
        {locale === 'ar' ? icon.nameAr : icon.name}
      </span>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        title="Copy id"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-500" />
        ) : (
          <Copy className="w-3 h-3 text-neutral-400" />
        )}
      </button>
      {/* Toggle colored/monochrome on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsColored(!isColored);
        }}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        title={isColored ? 'Switch to monochrome' : 'Switch to colored'}
      >
        <div
          className={cn(
            'w-3 h-3 rounded-full border-2',
            isColored ? 'border-neutral-400' : 'border-neutral-400 bg-neutral-400'
          )}
        />
      </button>
    </motion.button>
  );
}

// Social icon detail panel component
function SocialIconDetailPanel({
  icon,
  brandColor,
  onClose,
  t,
  locale,
}: {
  icon: SocialIconData;
  brandColor: string;
  onClose: () => void;
  t: (key: string) => string;
  locale: string;
}) {
  const [colored, setColored] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = async (type: 'flutter' | 'react') => {
    const code = type === 'flutter'
      ? `SingularSocialIcon(\n  platform: SocialPlatform.${icon.id},\n  size: 24,\n  colored: ${colored},\n)`
      : `<SocialIcon platform="${icon.id}" size="md" colored={${colored}} />`;
    
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {locale === 'ar' ? icon.nameAr : icon.name}
          </h3>
          <p className="text-sm text-neutral-500 font-mono">{icon.id}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

      {/* Large Icon Preview */}
      <div
        className="flex items-center justify-center p-8 rounded-xl mb-6"
        style={{ backgroundColor: `${icon.color}15` }}
      >
        <SocialIcon platform={icon.id as SocialPlatform} size="xl" colored={colored} />
      </div>

      {/* Colored Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          {t('iconographyPage.socialStyle')}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setColored(true)}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              colored
                ? 'text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            )}
            style={colored ? { backgroundColor: icon.color } : undefined}
          >
            {t('iconographyPage.colored')}
          </button>
          <button
            onClick={() => setColored(false)}
            className={cn(
              'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              !colored
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            )}
          >
            {t('iconographyPage.monochrome')}
          </button>
        </div>
      </div>

      {/* Size Examples */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          {t('iconographyPage.socialSizes')}
        </label>
        <div className="flex items-end gap-4 justify-center">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <SocialIcon platform={icon.id as SocialPlatform} size={size} colored={colored} />
              <span className="text-[10px] text-neutral-400">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {t('iconographyPage.brandColor')}
        </label>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-700"
            style={{ backgroundColor: icon.color }}
          />
          <code className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
            {icon.color}
          </code>
        </div>
      </div>

      {/* Code Snippets */}
      <div className="space-y-3">
        <button
          onClick={() => copyCode('flutter')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">Flutter</span>
          </div>
          {copied === 'flutter' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        <button
          onClick={() => copyCode('react')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">React</span>
          </div>
          {copied === 'react' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Flag detail panel component
function FlagDetailPanel({
  flag,
  brandColor,
  onClose,
  t,
  locale,
}: {
  flag: FlagData;
  brandColor: string;
  onClose: () => void;
  t: (key: string) => string;
  locale: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = async (type: 'flutter' | 'react') => {
    const code = type === 'flutter'
      ? `SingularFlag(\n  code: '${flag.code}',\n  size: FlagSize.medium,\n)`
      : `<Flag code="${flag.code}" size="md" />`;
    
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {locale === 'ar' ? flag.nameAr : flag.name}
          </h3>
          <p className="text-sm text-neutral-500 font-mono">{flag.code}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

      {/* Large Flag Preview */}
      <div
        className="flex items-center justify-center p-8 rounded-xl mb-6"
        style={{ backgroundColor: `${brandColor}10` }}
      >
        <Flag code={flag.code} size="xl" />
      </div>

      {/* Size Examples */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          {t('iconographyPage.flagSizes')}
        </label>
        <div className="flex items-end gap-4 justify-center">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <Flag code={flag.code} size={size} />
              <span className="text-[10px] text-neutral-400">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippets */}
      <div className="space-y-3">
        <button
          onClick={() => copyCode('flutter')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">Flutter</span>
          </div>
          {copied === 'flutter' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        <button
          onClick={() => copyCode('react')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">React</span>
          </div>
          {copied === 'react' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Icon size tokens extracted from Figma design system
const iconSizes = [
  { token: 'size-12', value: 12, name: '12', usage: 'microIcons' },
  { token: 'dimension/XXSmall', value: 16, name: 'XXSmall', usage: 'inlineText' },
  { token: 'dimension/icon/Small', value: 18, name: 'Small (icon)', usage: 'smallUI' },
  { token: 'dimension/XSmall', value: 20, name: 'XSmall', usage: 'defaultSize' },
  { token: 'dimension/Small', value: 24, name: 'Small', usage: 'standardButtons' },
  { token: 'dimension/Medium', value: 32, name: 'Medium', usage: 'mediumEmphasis' },
  { token: 'dimension/Large', value: 40, name: 'Large', usage: 'largeButtons' },
  { token: 'dimension/XLarge', value: 48, name: 'XLarge', usage: 'featureIcons' },
  { token: 'dimension/XXLarge', value: 56, name: 'XXLarge', usage: 'sectionHeaders' },
  { token: 'dimension/XXXLarge', value: 64, name: 'XXXLarge', usage: 'heroSections' },
  { token: 'dimension/Hero', value: 80, name: 'Hero', usage: 'marketing' },
  { token: 'dimension/XHero', value: 96, name: 'XHero', usage: 'splashScreens' },
  { token: 'dimension/XXHero', value: 120, name: 'XXHero', usage: 'fullPageHeroes' },
  { token: 'dimension/7Large 4', value: 150, name: '7Large 4', usage: 'maximumSize' },
];

// Lowercase variants for data/display, capitalize for iconsax-react
const variantNames: DataIconVariant[] = ['linear', 'bold', 'outline', 'twotone', 'bulk', 'broken'];
const toIconsaxVariant = (v: DataIconVariant): IconVariant => {
  const map: Record<DataIconVariant, IconVariant> = {
    linear: 'Linear',
    bold: 'Bold',
    outline: 'Outline',
    twotone: 'TwoTone',
    bulk: 'Bulk',
    broken: 'Broken',
  };
  return map[v];
};

function IconCard({
  icon,
  variant,
  brandColor,
  onSelect,
  isSelected,
}: {
  icon: IconData;
  variant: DataIconVariant;
  brandColor: string;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(icon.name);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all',
        'bg-white dark:bg-neutral-900 border-2',
        isSelected
          ? 'border-current shadow-lg'
          : 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
      )}
      style={isSelected ? { borderColor: brandColor } : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-2">
        <Icon
          name={icon.name}
          variant={toIconsaxVariant(variant)}
          size={24}
          color={isSelected ? brandColor : 'currentColor'}
        />
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate max-w-full">
        {icon.name}
      </span>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
        title="Copy name"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-500" />
        ) : (
          <Copy className="w-3 h-3 text-neutral-400" />
        )}
      </button>
    </motion.button>
  );
}

function IconDetailPanel({
  icon,
  variant,
  brandColor,
  onClose,
  t,
}: {
  icon: IconData;
  variant: DataIconVariant;
  brandColor: string;
  onClose: () => void;
  t: (key: string) => string;
}) {
  const [selectedVariant, setSelectedVariant] = useState<DataIconVariant>(variant);
  const [selectedSize, setSelectedSize] = useState(24);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = async (type: 'flutter' | 'react') => {
    const code = type === 'flutter'
      ? `Icon(\n  SingularIcons.${icon.name.replace(/-/g, '_')},\n  size: ${selectedSize},\n  variant: IconVariant.${selectedVariant},\n)`
      : `<Icon name="${icon.name}" variant="${toIconsaxVariant(selectedVariant)}" size={${selectedSize}} />`;
    
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {icon.name}
          </h3>
          <p className="text-sm text-neutral-500">{icon.category}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

      {/* Large Icon Preview */}
      <div
        className="flex items-center justify-center p-8 rounded-xl mb-6"
        style={{ backgroundColor: `${brandColor}10` }}
      >
        <Icon
          name={icon.name}
          variant={toIconsaxVariant(selectedVariant)}
          size={selectedSize}
          color={brandColor}
        />
      </div>

      {/* Variant Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {t('iconographyPage.variant')}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {variantNames.map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVariant(v)}
              className={cn(
                'px-3 py-2 text-xs rounded-lg border transition-all capitalize',
                selectedVariant === v
                  ? 'border-current bg-opacity-10 font-medium'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              )}
              style={
                selectedVariant === v
                  ? { borderColor: brandColor, backgroundColor: `${brandColor}10`, color: brandColor }
                  : undefined
              }
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {t('iconographyPage.size')}
        </label>
        <div className="flex flex-wrap gap-2">
          {[16, 20, 24, 32, 40, 48, 64].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg border transition-all',
                selectedSize === size
                  ? 'border-current font-medium'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              )}
              style={
                selectedSize === size
                  ? { borderColor: brandColor, backgroundColor: `${brandColor}10`, color: brandColor }
                  : undefined
              }
            >
              {size}px
            </button>
          ))}
        </div>
      </div>

      {/* Code Snippets */}
      <div className="space-y-3">
        <button
          onClick={() => copyCode('flutter')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">Flutter</span>
          </div>
          {copied === 'flutter' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        <button
          onClick={() => copyCode('react')}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-mono">React</span>
          </div>
          {copied === 'react' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Keywords */}
      {icon.keywords && icon.keywords.length > 0 && (
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('iconographyPage.keywords')}
          </label>
          <div className="flex flex-wrap gap-1">
            {icon.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function IconSizeCard({
  size,
  index,
  brandColor,
  t,
}: {
  size: typeof iconSizes[0];
  index: number;
  brandColor: string;
  t: (key: string) => string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = size.token;
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
      transition={{ delay: index * 0.03 }}
      className="group relative flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
    >
      {/* Size badge */}
      <div
        className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-md"
        style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
      >
        {size.value}px
      </div>

      {/* Icon preview */}
      <div
        className="flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ width: Math.max(size.value, 40), height: Math.max(size.value, 40) }}
      >
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: size.value,
            height: size.value,
            backgroundColor: `${brandColor}10`,
          }}
        >
          <Icon
            name="Star1"
            variant="Linear"
            size={Math.min(size.value * 0.75, size.value - 4)}
            color={brandColor}
          />
        </div>
      </div>

      {/* Token name */}
      <div className="flex items-center gap-2 mb-2">
        <code className="text-sm font-mono text-neutral-900 dark:text-white">
          {size.name}
        </code>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          title={t('iconographyPage.copyToken')}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Usage */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
        {t(`iconographyPage.usages.${size.usage}`)}
      </p>
    </motion.div>
  );
}

function IconSizeRow({
  size,
  index,
  brandColor,
  t,
}: {
  size: typeof iconSizes[0];
  index: number;
  brandColor: string;
  t: (key: string) => string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = size.token;
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 40,
              height: 40,
              backgroundColor: `${brandColor}10`,
            }}
          >
            <Icon
              name="Star1"
              variant="Linear"
              size={Math.min(size.value, 32)}
              color={brandColor}
            />
          </div>
          <div className="flex items-center gap-2">
            <code
              className="text-sm px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono"
              style={{ color: brandColor }}
            >
              {size.name}
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
      </td>
      <td className="py-4 px-4 font-mono text-sm text-neutral-600 dark:text-neutral-400">
        {size.value}px
      </td>
      <td className="py-4 px-4 text-sm text-neutral-500 dark:text-neutral-400 hidden md:table-cell">
        <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
          {size.token}
        </code>
      </td>
      <td className="py-4 px-4 text-sm text-neutral-600 dark:text-neutral-400">
        {t(`iconographyPage.usages.${size.usage}`)}
      </td>
    </motion.tr>
  );
}

export default function IconographyPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<DataIconVariant>('linear');
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [iconPage, setIconPage] = useState(1);
  
  // Flags state
  const [flagSearchQuery, setFlagSearchQuery] = useState('');
  const [selectedFlag, setSelectedFlag] = useState<FlagData | null>(null);
  const [flagPage, setFlagPage] = useState(1);

  // Social icons state
  const [socialSearchQuery, setSocialSearchQuery] = useState('');
  const [selectedSocialIcon, setSelectedSocialIcon] = useState<SocialIconData | null>(null);
  const [socialPage, setSocialPage] = useState(1);

  // Filter flags based on search
  const filteredFlags = useMemo(() => {
    if (flagSearchQuery.trim()) {
      return searchFlags(flagSearchQuery);
    }
    return flags;
  }, [flagSearchQuery]);

  // Paginated flags
  const paginatedFlags = useMemo(() => {
    const startIndex = (flagPage - 1) * ITEMS_PER_PAGE;
    return filteredFlags.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredFlags, flagPage]);

  const totalFlagPages = Math.ceil(filteredFlags.length / ITEMS_PER_PAGE);

  // Reset flag page when search changes
  useEffect(() => {
    setFlagPage(1);
  }, [flagSearchQuery]);

  // Filter social icons based on search
  const filteredSocialIcons = useMemo(() => {
    if (socialSearchQuery.trim()) {
      return searchSocialIcons(socialSearchQuery);
    }
    return socialIcons;
  }, [socialSearchQuery]);

  // Paginated social icons
  const paginatedSocialIcons = useMemo(() => {
    const startIndex = (socialPage - 1) * ITEMS_PER_PAGE;
    return filteredSocialIcons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSocialIcons, socialPage]);

  const totalSocialPages = Math.ceil(filteredSocialIcons.length / ITEMS_PER_PAGE);

  // Reset social page when search changes
  useEffect(() => {
    setSocialPage(1);
  }, [socialSearchQuery]);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    if (searchQuery.trim()) {
      return searchIcons(searchQuery);
    }
    if (selectedCategory) {
      const category = iconCategories.find(c => c.id === selectedCategory);
      return category?.icons || [];
    }
    return iconCategories.flatMap(c => c.icons);
  }, [searchQuery, selectedCategory]);

  // Paginated icons
  const paginatedIcons = useMemo(() => {
    const startIndex = (iconPage - 1) * ITEMS_PER_PAGE;
    return filteredIcons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredIcons, iconPage]);

  const totalIconPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE);

  // Reset icon page when search or category changes
  useEffect(() => {
    setIconPage(1);
  }, [searchQuery, selectedCategory]);

  const totalIconCount = iconCategories.reduce((acc, cat) => acc + cat.icons.length, 0);

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
            <Shapes className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('iconographyPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('iconographyPage.description')}
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-neutral-500">
          <span>{totalIconCount} {t('iconographyPage.totalIcons')}</span>
          <span>•</span>
          <span>{iconCategories.length} {t('iconographyPage.categories')}</span>
          <span>•</span>
          <span>6 {t('iconographyPage.variants')}</span>
        </div>
      </motion.div>

          {/* Icon Library Browser */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              {t('iconographyPage.iconLibrary')}
            </h2>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('iconographyPage.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>

              {/* Variant Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {variantNames.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all capitalize',
                      selectedVariant === v
                        ? 'text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    )}
                    style={
                      selectedVariant === v
                        ? { backgroundColor: brandColors.primary }
                        : undefined
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  !selectedCategory
                    ? 'text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
                style={
                  !selectedCategory
                    ? { backgroundColor: brandColors.primary }
                    : undefined
                }
              >
                {t('iconographyPage.allCategories')}
              </button>
              {iconCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  )}
                  style={
                    selectedCategory === category.id
                      ? { backgroundColor: brandColors.primary }
                      : undefined
                  }
                >
                  {getCategoryName(category, locale)}
                </button>
              ))}
            </div>

            {/* Icons Grid with Detail Panel */}
            <div className="flex gap-6">
              {/* Icons Grid */}
              <div className={cn('flex-1 transition-all', selectedIcon ? 'lg:pr-80' : '')}>
                {/* Results info */}
                {filteredIcons.length > 0 && (
                  <p className="text-sm text-neutral-500 mb-4">
                    {t('iconographyPage.showing')} {((iconPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(iconPage * ITEMS_PER_PAGE, filteredIcons.length)} {t('iconographyPage.of')} {filteredIcons.length}
                  </p>
                )}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {paginatedIcons.map((icon) => (
                    <IconCard
                      key={icon.name}
                      icon={icon}
                      variant={selectedVariant}
                      brandColor={brandColors.primary}
                      onSelect={() => setSelectedIcon(icon)}
                      isSelected={selectedIcon?.name === icon.name}
                    />
                  ))}
                </div>
                {filteredIcons.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {t('iconographyPage.noIconsFound')}
                    </p>
                  </div>
                )}
                {/* Pagination */}
                <Pagination
                  currentPage={iconPage}
                  totalPages={totalIconPages}
                  onPageChange={setIconPage}
                  brandColor={brandColors.primary}
                  t={t}
                />
              </div>

              {/* Detail Panel */}
              <AnimatePresence>
                {selectedIcon && (
                  <div className="hidden lg:block fixed right-8 top-24 w-72 z-30">
                    <IconDetailPanel
                      icon={selectedIcon}
                      variant={selectedVariant}
                      brandColor={brandColors.primary}
                      onClose={() => setSelectedIcon(null)}
                      t={t}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Flags Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${brandColors.primary}20` }}
              >
                <Globe className="w-5 h-5" style={{ color: brandColors.primary }} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  {t('iconographyPage.flagsTitle')}
                </h2>
                <p className="text-sm text-neutral-500">
                  {flags.length} {t('iconographyPage.countriesAndRegions')}
                </p>
              </div>
            </div>

            {/* Flag Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={flagSearchQuery}
                onChange={(e) => setFlagSearchQuery(e.target.value)}
                placeholder={t('iconographyPage.searchFlagsPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
              />
              {flagSearchQuery && (
                <button
                  onClick={() => setFlagSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Flags Grid with Detail Panel */}
            <div className="flex gap-6">
              {/* Flags Grid */}
              <div className={cn('flex-1 transition-all', selectedFlag ? 'lg:pr-80' : '')}>
                {/* Results info */}
                {filteredFlags.length > 0 && (
                  <p className="text-sm text-neutral-500 mb-4">
                    {t('iconographyPage.showing')} {((flagPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(flagPage * ITEMS_PER_PAGE, filteredFlags.length)} {t('iconographyPage.of')} {filteredFlags.length}
                  </p>
                )}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {paginatedFlags.map((flag) => (
                    <FlagCard
                      key={flag.code}
                      flag={flag}
                      brandColor={brandColors.primary}
                      onSelect={() => setSelectedFlag(flag)}
                      isSelected={selectedFlag?.code === flag.code}
                      locale={locale}
                    />
                  ))}
                </div>
                {filteredFlags.length === 0 && (
                  <div className="text-center py-12">
                    <Globe className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {t('iconographyPage.noFlagsFound')}
                    </p>
                  </div>
                )}
                {/* Pagination */}
                <Pagination
                  currentPage={flagPage}
                  totalPages={totalFlagPages}
                  onPageChange={setFlagPage}
                  brandColor={brandColors.primary}
                  t={t}
                />
              </div>

              {/* Flag Detail Panel */}
              <AnimatePresence>
                {selectedFlag && (
                  <div className="hidden lg:block fixed right-8 top-24 w-72 z-30">
                    <FlagDetailPanel
                      flag={selectedFlag}
                      brandColor={brandColors.primary}
                      onClose={() => setSelectedFlag(null)}
                      t={t}
                      locale={locale}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Social Media Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${brandColors.primary}20` }}
              >
                <Shapes className="w-5 h-5" style={{ color: brandColors.primary }} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  {t('iconographyPage.socialMediaTitle')}
                </h2>
                <p className="text-sm text-neutral-500">
                  {socialIcons.length} {t('iconographyPage.platforms')}
                </p>
              </div>
            </div>

            {/* Social Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={socialSearchQuery}
                onChange={(e) => setSocialSearchQuery(e.target.value)}
                placeholder={t('iconographyPage.searchSocialPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
              />
              {socialSearchQuery && (
                <button
                  onClick={() => setSocialSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Social Icons Grid with Detail Panel */}
            <div className="flex gap-6">
              {/* Social Icons Grid */}
              <div className={cn('flex-1 transition-all', selectedSocialIcon ? 'lg:pr-80' : '')}>
                {/* Results info */}
                {filteredSocialIcons.length > 0 && filteredSocialIcons.length > ITEMS_PER_PAGE && (
                  <p className="text-sm text-neutral-500 mb-4">
                    {t('iconographyPage.showing')} {((socialPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(socialPage * ITEMS_PER_PAGE, filteredSocialIcons.length)} {t('iconographyPage.of')} {filteredSocialIcons.length}
                  </p>
                )}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {paginatedSocialIcons.map((icon) => (
                    <SocialIconCard
                      key={icon.id}
                      icon={icon}
                      brandColor={brandColors.primary}
                      onSelect={() => setSelectedSocialIcon(icon)}
                      isSelected={selectedSocialIcon?.id === icon.id}
                      locale={locale}
                    />
                  ))}
                </div>
                {filteredSocialIcons.length === 0 && (
                  <div className="text-center py-12">
                    <Shapes className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {t('iconographyPage.noSocialIconsFound')}
                    </p>
                  </div>
                )}
                {/* Pagination (only shows if more than 60 items) */}
                <Pagination
                  currentPage={socialPage}
                  totalPages={totalSocialPages}
                  onPageChange={setSocialPage}
                  brandColor={brandColors.primary}
                  t={t}
                />
              </div>

              {/* Social Icon Detail Panel */}
              <AnimatePresence>
                {selectedSocialIcon && (
                  <div className="hidden lg:block fixed right-8 top-24 w-72 z-30">
                    <SocialIconDetailPanel
                      icon={selectedSocialIcon}
                      brandColor={brandColors.primary}
                      onClose={() => setSelectedSocialIcon(null)}
                      t={t}
                      locale={locale}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Variant Descriptions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              {t('iconographyPage.variantStyles')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {variantNames.map((variant) => (
                <div
                  key={variant}
                  className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-3"
                    style={{ backgroundColor: `${brandColors.primary}10` }}
                  >
                    <Icon name="Heart" variant={toIconsaxVariant(variant)} size={24} color={brandColors.primary} />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white text-center capitalize mb-1">
                    {variant}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    {variantDescriptions[variant][locale === 'ar' ? 'ar' : 'en']}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Visual Scale - Grid View */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
              {t('iconographyPage.sizingScale')}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {t('iconographyPage.sizingScaleDesc')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {iconSizes.map((size, index) => (
                <IconSizeCard
                  key={size.token}
                  size={size}
                  index={index}
                  brandColor={brandColors.primary}
                  t={t}
                />
              ))}
            </div>
          </motion.section>

          {/* Token Reference Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {t('iconographyPage.tokenReference')}
              </h2>
              <span className="text-sm text-neutral-500">
                {iconSizes.length} {t('iconographyPage.sizes')}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    <th className="py-3 px-4">{t('iconographyPage.table.name')}</th>
                    <th className="py-3 px-4">{t('iconographyPage.table.size')}</th>
                    <th className="py-3 px-4 hidden md:table-cell">{t('iconographyPage.table.token')}</th>
                    <th className="py-3 px-4">{t('iconographyPage.table.usage')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900">
                  {iconSizes.map((size, index) => (
                    <IconSizeRow
                      key={size.token}
                      size={size}
                      index={index}
                      brandColor={brandColors.primary}
                      t={t}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Usage Guidelines */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              {t('iconographyPage.usageGuidelines')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's */}
              <div className="card p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                  <Check className="w-5 h-5" />
                  {t('iconographyPage.guidelines.do')}
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.do1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.do2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.do3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.do4')}
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="card p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-current text-xs">✕</span>
                  {t('iconographyPage.guidelines.dont')}
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.dont1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.dont2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.dont3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {t('iconographyPage.guidelines.dont4')}
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Flutter Usage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              {t('iconographyPage.flutterUsage')}
            </h2>
            <div className="code-block">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
                <span className="text-xs text-neutral-500 font-mono">dart</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
                <code>{`// Using the Icon component
import 'package:singular/design_system.dart';

// Basic usage
SingularIcon(
  icon: SingularIcons.wallet,
  size: IconSize.medium, // 32px
  variant: IconVariant.linear,
);

// With custom color
SingularIcon(
  icon: SingularIcons.heart,
  size: IconSize.large, // 40px
  variant: IconVariant.bold,
  color: AppColors.semantic.error,
);

// Available variants
IconVariant.linear   // Clean line icons
IconVariant.bold     // Solid filled icons
IconVariant.outline  // Double-stroke icons
IconVariant.twotone  // Two-color icons
IconVariant.bulk     // Multi-layered icons
IconVariant.broken   // Stylized broken icons

// Available sizes
IconSize.xxSmall   // 16px
IconSize.xSmall    // 20px
IconSize.small     // 24px
IconSize.medium    // 32px
IconSize.large     // 40px
IconSize.xLarge    // 48px
IconSize.xxLarge   // 56px
IconSize.xxxLarge  // 64px
IconSize.hero      // 80px`}</code>
              </pre>
            </div>
          </motion.section>
    </div>
  );
}
