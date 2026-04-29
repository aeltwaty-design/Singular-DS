'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useLocale } from 'next-intl';
import { getCategoryBySlug } from '@/data/components';

export default function DataDisplayPage() {
  const locale = useLocale();
  const router = useRouter();
  const { brandColors } = useBrand();
  const category = getCategoryBySlug('data-display');

  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Link href="/docs/components" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
          <span>←</span>
          <span>{locale === 'ar' ? 'المكونات' : 'Components'}</span>
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl" style={{ backgroundColor: `${category.color}20` }}>
            <LayoutGrid className="w-6 h-6" style={{ color: category.color }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {locale === 'ar' ? category.nameAr : category.name}
          </h1>
          <span className="text-sm font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
            {category.components.length}
          </span>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {locale === 'ar' ? category.descriptionAr : category.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.components.map((component, index) => (
          <motion.div key={component.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.03 }}>
            <a href={`/docs/components/data-display/${component.slug}`} onClick={(e) => { e.preventDefault(); window.location.href = `/docs/components/data-display/${component.slug}`; }} className="group block h-full card card-hover p-6 relative overflow-hidden cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${category.color}, transparent 70%)` }} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: component.status === 'stable' ? '#10B98120' : component.status === 'coming-soon' ? '#6366F120' : component.status === 'beta' ? '#F59E0B20' : '#EF444420', color: component.status === 'stable' ? '#10B981' : component.status === 'coming-soon' ? '#6366F1' : component.status === 'beta' ? '#F59E0B' : '#EF4444' }}>
                  {component.status === 'coming-soon' ? 'Coming Soon' : component.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                {locale === 'ar' ? component.nameAr : component.name}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {locale === 'ar' ? component.descriptionAr : component.description}
              </p>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

