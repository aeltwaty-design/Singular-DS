'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Palette, Type, Maximize, Circle, Layers, Grid } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';

interface FoundationsPreviewProps {
  translations: {
    title: string;
    subtitle: string;
    colors: { title: string; description: string };
    typography: { title: string; description: string };
    spacing: { title: string; description: string };
    radius: { title: string; description: string };
    elevation: { title: string; description: string };
    icons: { title: string; description: string };
  };
  learnMore: string;
  typographyPreview: {
    heading: string;
    body: string;
  };
}

export function FoundationsPreview({ translations, learnMore, typographyPreview }: FoundationsPreviewProps) {
  const { brandColors } = useBrand();

  const foundations = [
    {
      icon: Palette,
      title: translations.colors.title,
      description: translations.colors.description,
      href: '/docs/foundations/colors',
      preview: (
        <div className="flex gap-1">
          {['#00CE8B', '#755BD8', '#07B6A0', '#FF6608', '#FAC333'].map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Type,
      title: translations.typography.title,
      description: translations.typography.description,
      href: '/docs/foundations/typography',
      preview: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">Aa</div>
          <div className="text-lg font-medium text-neutral-700 dark:text-neutral-300">{typographyPreview.heading}</div>
          <div className="text-sm text-neutral-500">{typographyPreview.body}</div>
        </div>
      ),
    },
    {
      icon: Maximize,
      title: translations.spacing.title,
      description: translations.spacing.description,
      href: '/docs/foundations/spacing',
      preview: (
        <div className="flex items-end gap-1">
          {[4, 8, 12, 16, 24, 32].map((size, i) => (
            <div
              key={size}
              className="bg-gradient-to-t from-neutral-400 to-neutral-300 dark:from-neutral-600 dark:to-neutral-500 rounded"
              style={{
                width: '12px',
                height: `${8 + i * 8}px`,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Circle,
      title: translations.radius.title,
      description: translations.radius.description,
      href: '/docs/foundations/radius',
      preview: (
        <div className="flex gap-2">
          {[0, 4, 8, 16, 999].map((radius) => (
            <div
              key={radius}
              className="w-8 h-8 bg-neutral-300 dark:bg-neutral-600"
              style={{ borderRadius: radius }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Layers,
      title: translations.elevation.title,
      description: translations.elevation.description,
      href: '/docs/foundations/elevation',
      preview: (
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              className="w-8 h-8 bg-white dark:bg-neutral-700 rounded-lg"
              style={{
                boxShadow:
                  level === 0
                    ? 'none'
                    : `0 ${level * 4}px ${level * 8}px -${level * 2}px rgba(0,0,0,0.1)`,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Grid,
      title: translations.icons.title,
      description: translations.icons.description,
      href: '/docs/foundations/icons',
      preview: (
        <div className="flex gap-2 text-neutral-600 dark:text-neutral-400">
          <Palette className="w-6 h-6" />
          <Type className="w-6 h-6" />
          <Layers className="w-6 h-6" />
          <Grid className="w-6 h-6" />
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            {translations.title}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* Foundations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundations.map((foundation, index) => (
            <motion.div
              key={foundation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={foundation.href}
                className="group block h-full card card-hover p-6"
              >
                {/* Preview area */}
                <div className="h-20 mb-6 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  {foundation.preview}
                </div>

                {/* Icon and title */}
                <div className="flex items-center gap-3 mb-2">
                  <foundation.icon
                    className="w-5 h-5"
                    style={{ color: brandColors.primary }}
                  />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {foundation.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {foundation.description}
                </p>

                {/* Link arrow */}
                <div
                  className="flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: brandColors.primary }}
                >
                  {learnMore}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

