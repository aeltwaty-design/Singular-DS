'use client';

import { motion } from 'framer-motion';
import {
  Palette,
  Layers,
  Moon,
  Languages,
  Smartphone,
  BookOpen,
} from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';

interface FeaturesProps {
  translations: {
    title: string;
    subtitle: string;
    tokens: { title: string; description: string };
    themes: { title: string; description: string };
    modes: { title: string; description: string };
    rtl: { title: string; description: string };
    flutter: { title: string; description: string };
    docs: { title: string; description: string };
  };
}

export function Features({ translations }: FeaturesProps) {
  const { brandColors } = useBrand();

  const features = [
    {
      icon: Palette,
      title: translations.tokens.title,
      description: translations.tokens.description,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Layers,
      title: translations.themes.title,
      description: translations.themes.description,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Moon,
      title: translations.modes.title,
      description: translations.modes.description,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Languages,
      title: translations.rtl.title,
      description: translations.rtl.description,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Smartphone,
      title: translations.flutter.title,
      description: translations.flutter.description,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: BookOpen,
      title: translations.docs.title,
      description: translations.docs.description,
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
      </div>

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

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="card card-hover p-6 h-full">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover gradient */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${brandColors.primary}08, transparent 40%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

