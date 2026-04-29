'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { GravitationalGrid } from './GravitationalGrid';

interface HeroProps {
  translations: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    cta: {
      getStarted: string;
      viewGithub: string;
    };
  };
}

export function Hero({ translations }: HeroProps) {
  const { brand, brandColors } = useBrand();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{ backgroundColor: brandColors.primary }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: brandColors.secondary }}
        />

        {/* Interactive grid pattern with ripple effect */}
        <GravitationalGrid />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-neutral-950 dark:via-transparent dark:to-neutral-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                backgroundColor: `${brandColors.primary}15`,
                color: brandColors.primary,
              }}
            >
              <Sparkles className="w-4 h-4" />
              {translations.badge}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6 tracking-tight"
          >
            {translations.title}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
              }}
            >
              {translations.titleHighlight}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-10 text-balance"
          >
            {translations.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/docs/getting-started"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: brandColors.primary,
                boxShadow: `0 20px 40px -10px ${brandColors.primary}50`,
              }}
            >
              {translations.cta.getStarted}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-neutral-700 dark:text-neutral-300 font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              {translations.cta.viewGithub}
            </a>
          </motion.div>

          {/* Brand indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-walaplus-500" />
              <span className="text-sm text-neutral-500">WalaPlus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-walaone-500" />
              <span className="text-sm text-neutral-500">WalaOne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-doam-500" />
              <span className="text-sm text-neutral-500">Doam</span>
            </div>
          </motion.div>
        </div>

        {/* Floating UI Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Browser window mockup */}
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-xs text-neutral-500">
                    singular.design
                  </div>
                </div>
              </div>

              {/* Content preview */}
              <div className="p-6 grid grid-cols-3 gap-4">
                {/* Color swatches preview */}
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  <div className="grid grid-cols-4 gap-1">
                    {['500', '400', '300', '200'].map((shade, i) => (
                      <motion.div
                        key={shade}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="aspect-square rounded-lg"
                        style={{
                          backgroundColor:
                            brand === 'walaplus'
                              ? `#${['00CE8B', '1AD997', '33DEA3', '66E7B8'][i]}`
                              : brand === 'walaone'
                              ? `#${['755BD8', '8269E0', '9077E7', 'AB99ED'][i]}`
                              : `#${['07B6A0', '1AC0AD', '33C7B7', '66D5C9'][i]}`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Typography preview */}
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
                    <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  </div>
                </div>

                {/* Components preview */}
                <div className="space-y-3">
                  <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium text-center"
                    style={{ backgroundColor: brandColors.primary }}
                  >
                    Button
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-sm text-center"
                  >
                    Outlined
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative elements - Orbiting atoms */}
            <motion.div
              animate={{
                x: [40, 28, 0, -28, -40, -28, 0, 28, 40],
                y: [0, 28, 40, 28, 0, -28, -40, -28, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-60 blur-xl"
              style={{ backgroundColor: brandColors.primary }}
            />
            <motion.div
              animate={{
                x: [-35, -25, 0, 25, 35, 25, 0, -25, -35],
                y: [0, -25, -35, -25, 0, 25, 35, 25, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-50 blur-xl"
              style={{ backgroundColor: brandColors.secondary }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

