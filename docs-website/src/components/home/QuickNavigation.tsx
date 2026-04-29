'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, Layers, Component, Puzzle } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';

interface QuickNavigationProps {
  translations: {
    title: string;
    subtitle: string;
    getStarted: {
      title: string;
      description: string;
    };
    foundations: {
      title: string;
      description: string;
    };
    components: {
      title: string;
      description: string;
    };
    patterns: {
      title: string;
      description: string;
    };
  };
  learnMore: string;
  comingSoon: string;
}

export function QuickNavigation({ translations, learnMore, comingSoon }: QuickNavigationProps) {
  const { brandColors } = useBrand();

  const navItems = [
    {
      icon: Rocket,
      title: translations.getStarted.title,
      description: translations.getStarted.description,
      href: '/docs/getting-started',
      comingSoon: false,
      preview: (
        <div className="flex items-center justify-center gap-2">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${brandColors.primary}20` }}
          >
            <Rocket className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
        </div>
      ),
    },
    {
      icon: Layers,
      title: translations.foundations.title,
      description: translations.foundations.description,
      href: '/docs/foundations',
      comingSoon: false,
      preview: (
        <div className="flex gap-1.5">
          {['#00CE8B', '#755BD8', '#07B6A0', '#FF6608', '#FAC333'].map((color) => (
            <div
              key={color}
              className="w-7 h-7 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: Component,
      title: translations.components.title,
      description: translations.components.description,
      href: '/docs/components',
      comingSoon: false,
      preview: (
        <div className="flex gap-2">
          <div 
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
            style={{ backgroundColor: brandColors.primary }}
          >
            Button
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
            Input
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400">
            Card
          </div>
        </div>
      ),
    },
    {
      icon: Puzzle,
      title: translations.patterns.title,
      description: translations.patterns.description,
      href: '/docs/patterns',
      comingSoon: true,
      preview: (
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded bg-neutral-200 dark:bg-neutral-700"
              style={{ opacity: 0.3 + i * 0.2 }}
            />
          ))}
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

        {/* Navigation grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {item.comingSoon ? (
                <div className="group block h-full card p-6 opacity-75 cursor-not-allowed relative">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 end-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      {comingSoon}
                    </span>
                  </div>

                  {/* Preview area */}
                  <div className="h-16 mb-5 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                    {item.preview}
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                    <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 dark:text-neutral-500">
                    {item.description}
                  </p>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="group block h-full card card-hover p-6"
                >
                  {/* Preview area */}
                  <div className="h-16 mb-5 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                    {item.preview}
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: brandColors.primary }}
                    />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {item.description}
                  </p>

                  {/* Link arrow */}
                  <div
                    className="flex items-center gap-1 text-sm font-medium transition-colors"
                    style={{ color: brandColors.primary }}
                  >
                    {learnMore}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

