'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MousePointerClick,
  Navigation,
  FormInput,
  LayoutGrid,
  MessageCircle,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';
import { componentCategories, getComponentCount } from '@/data/components';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MousePointerClick,
  Navigation,
  FormInput,
  LayoutGrid,
  MessageCircle,
};

export default function ComponentsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();

  const totalComponents = getComponentCount();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
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
          <Package className="w-8 h-8" style={{ color: brandColors.primary }} />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-4">
          {locale === 'ar' ? 'المكونات' : 'Components'}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {locale === 'ar'
            ? `${totalComponents} مكون مصمم بعناية ومبني للإنتاج، جاهز للاستخدام في تطبيقاتك`
            : `${totalComponents} beautifully designed, production-ready components to build your applications`}
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {componentCategories.map((category, index) => {
          const IconComponent = iconMap[category.icon] || Package;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={`/docs/components/${category.slug}`}
                className="group block h-full card card-hover p-6 relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${category.color}, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: category.color }}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {locale === 'ar' ? category.nameAr : category.name}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                      }}
                    >
                      {category.components.length}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {locale === 'ar' ? category.descriptionAr : category.description}
                  </p>

                  {/* Component preview */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.components.slice(0, 4).map((comp) => (
                      <span
                        key={comp.id}
                        className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {locale === 'ar' ? comp.nameAr : comp.name}
                      </span>
                    ))}
                    {category.components.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        +{category.components.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <ArrowRight
                    className="w-5 h-5 rtl:rotate-180"
                    style={{ color: category.color }}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
