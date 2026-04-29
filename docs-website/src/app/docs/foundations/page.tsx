'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Palette,
  Type,
  Maximize,
  Circle,
  Layers,
  Grid3X3,
  Layout,
  Monitor,
  ArrowRight,
  Shapes,
} from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';

export default function FoundationsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();

  const foundations = [
    {
      icon: Palette,
      title: t('foundations.colors.title'),
      description: t('foundations.colors.description'),
      href: '/docs/foundations/colors',
      color: '#00CE8B',
      features: locale === 'ar' 
        ? ['الألوان الأولية', 'متغيرات الألوان', 'الوضع الداكن']
        : ['Primitives', 'Color Variables', 'Dark Mode'],
    },
    {
      icon: Type,
      title: t('foundations.typography.title'),
      description: t('foundations.typography.description'),
      href: '/docs/foundations/typography',
      color: '#755BD8',
      features: locale === 'ar'
        ? ['مقياس العناوين', 'مقياس النصوص', 'أوزان الخطوط']
        : ['Headings Scale', 'Text Scale', 'Font Weights'],
    },
    {
      icon: Layers,
      title: t('elevationPage.title'),
      description: t('foundations.elevation.description'),
      href: '/docs/foundations/elevation',
      color: '#3B82F6',
      features: locale === 'ar'
        ? ['مستويات الظل', 'تأثيرات الضبابية']
        : ['Shadow Levels', 'Blur Effects'],
    },
    {
      icon: Maximize,
      title: t('spacingPage.title'),
      description: t('foundations.spacing.description'),
      href: '/docs/foundations/spacing',
      color: '#F59E0B',
      features: locale === 'ar'
        ? ['مقياس التباعد', 'رموز الأحجام']
        : ['Spacing Scale', 'Sizing Tokens'],
    },
    {
      icon: Grid3X3,
      title: t('gridPage.title'),
      description: t('gridPage.description'),
      href: '/docs/foundations/grid',
      color: '#EC4899',
      features: locale === 'ar'
        ? ['نقاط التوقف', 'أحجام الحاوية']
        : ['Breakpoints', 'Container Sizes'],
    },
    {
      icon: Circle,
      title: t('foundations.radius.title'),
      description: t('foundations.radius.description'),
      href: '/docs/foundations/radius',
      color: '#14B8A6',
      features: locale === 'ar'
        ? ['مقياس نصف القطر', 'الزوايا الدائرية']
        : ['Radius Scale', 'Rounded Corners'],
    },
    {
      icon: Layout,
      title: t('overlaysPage.title'),
      description: t('overlaysPage.description'),
      href: '/docs/foundations/overlays',
      color: '#8B5CF6',
      features: locale === 'ar'
        ? ['ألوان الخلفية', 'تأثير الزجاج']
        : ['Backdrop Colors', 'Glass Morphism'],
    },
    {
      icon: Monitor,
      title: t('systemUIPage.title'),
      description: t('systemUIPage.description'),
      href: '/docs/foundations/system-ui',
      color: '#06B6D4',
      features: locale === 'ar'
        ? ['شريط الحالة', 'المناطق الآمنة']
        : ['Status Bar', 'Safe Areas'],
    },
    {
      icon: Shapes,
      title: t('foundations.iconography.title'),
      description: t('foundations.iconography.description'),
      href: '/docs/foundations/iconography',
      color: '#F97316',
      features: locale === 'ar'
        ? ['مكتبة الأيقونات', 'الأعلام', 'وسائل التواصل']
        : ['Icon Library', 'Flags', 'Social Media'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ backgroundColor: `${brandColors.primary}20` }}
        >
          <Layers className="w-8 h-8" style={{ color: brandColors.primary }} />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
          {t('foundationsPage.title')}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {t('foundationsPage.description')}
        </p>
      </motion.div>

      {/* Foundations grid - matching Components page layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundations.map((foundation, index) => (
          <motion.div
            key={foundation.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              href={foundation.href}
              className="group block h-full card card-hover p-6 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${foundation.color}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${foundation.color}15` }}
              >
                <foundation.icon
                  className="w-6 h-6"
                  style={{ color: foundation.color }}
                />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {foundation.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {foundation.description}
                </p>

                {/* Feature preview tags */}
                <div className="flex flex-wrap gap-1.5">
                  {foundation.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow at bottom right */}
              <div className="absolute bottom-6 end-6 opacity-0 translate-x-2 rtl:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 rtl:group-hover:-translate-x-0 transition-all">
                <ArrowRight
                  className="w-5 h-5 rtl:rotate-180"
                  style={{ color: foundation.color }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
