'use client';

import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { ArrowLeft, Code, Eye, BookOpen, Settings } from 'lucide-react';
// import Link from 'next/link';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export interface ComponentDocTemplateProps {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  category: string;
  categorySlug: string;
  icon: ReactNode;
  children: ReactNode;
}

type TabId = 'preview' | 'code' | 'api' | 'guidelines';

interface Tab {
  id: TabId;
  label: string;
  labelAr: string;
  icon: ReactNode;
}

const tabs: Tab[] = [
  { id: 'preview', label: 'Preview', labelAr: 'معاينة', icon: <Eye className="w-4 h-4" /> },
  { id: 'code', label: 'Code', labelAr: 'الكود', icon: <Code className="w-4 h-4" /> },
  { id: 'api', label: 'API', labelAr: 'واجهة برمجية', icon: <Settings className="w-4 h-4" /> },
  { id: 'guidelines', label: 'Guidelines', labelAr: 'إرشادات', icon: <BookOpen className="w-4 h-4" /> },
];

export function ComponentDocTemplate({
  title,
  titleAr,
  description,
  descriptionAr,
  category,
  categorySlug,
  icon,
  children,
}: ComponentDocTemplateProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();
  const [activeTab, setActiveTab] = useState<TabId>('preview');

  const displayTitle = locale === 'ar' && titleAr ? titleAr : title;
  const displayDescription = locale === 'ar' && descriptionAr ? descriptionAr : description;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <a
          href={`/docs/components/${categorySlug}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/docs/components/${categorySlug}`;
          }}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{category}</span>
        </a>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${brandColors.primary}20` }}
          >
            <div style={{ color: brandColors.primary }}>{icon}</div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {displayTitle}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {displayDescription}
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {tab.icon}
              <span>{locale === 'ar' ? tab.labelAr : tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ComponentDocTemplate;

