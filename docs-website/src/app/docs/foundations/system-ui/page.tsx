'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Smartphone, Battery, Wifi, Signal } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { useTranslations, useLocale } from 'next-intl';

const statusBarStyles = [
  {
    name: 'Light Content',
    description: 'White icons and text for dark backgrounds',
    background: 'bg-neutral-900',
    textColor: 'text-white',
    usage: 'Dark headers, immersive screens',
  },
  {
    name: 'Dark Content',
    description: 'Dark icons and text for light backgrounds',
    background: 'bg-white',
    textColor: 'text-neutral-900',
    usage: 'Light headers, default screens',
  },
];

const safeAreas = [
  {
    name: 'Top Safe Area',
    description: 'Status bar and notch avoidance',
    value: 'MediaQuery.of(context).padding.top',
  },
  {
    name: 'Bottom Safe Area',
    description: 'Home indicator and gesture bar',
    value: 'MediaQuery.of(context).padding.bottom',
  },
  {
    name: 'Left Safe Area',
    description: 'Landscape notch avoidance',
    value: 'MediaQuery.of(context).padding.left',
  },
  {
    name: 'Right Safe Area',
    description: 'Landscape notch avoidance',
    value: 'MediaQuery.of(context).padding.right',
  },
];

const platformAdaptations = [
  {
    platform: 'iOS',
    features: [
      'Cupertino-style navigation',
      'iOS-native date/time pickers',
      'Swipe-back gesture support',
      'SF Symbols icon fallback',
    ],
  },
  {
    platform: 'Android',
    features: [
      'Material Design components',
      'System back button handling',
      'Edge-to-edge display support',
      'Dynamic color (Android 12+)',
    ],
  },
  {
    platform: 'Web',
    features: [
      'Responsive breakpoints',
      'Keyboard navigation',
      'Mouse hover states',
      'Browser history integration',
    ],
  },
];

export default function SystemUIPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { brandColors } = useBrand();

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
            <Monitor className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('systemUIPage.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {t('systemUIPage.description')}
        </p>
      </motion.div>

      {/* Status Bar Styles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
          {t('systemUIPage.statusBar')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statusBarStyles.map((style, index) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card overflow-hidden"
            >
              {/* Mock status bar */}
              <div className={`${style.background} p-2`}>
                <div className={`flex items-center justify-between px-4 py-1 ${style.textColor}`}>
                  <span className="text-xs font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-3.5" />
                  </div>
                </div>
                {/* Mock content area */}
                <div className="h-24 flex items-center justify-center">
                  <span className={`text-sm ${style.textColor} opacity-50`}>
                    Content Area
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {style.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {style.description}
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  <span className="font-medium">Usage:</span> {style.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Safe Areas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Safe Areas
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Handle notches, home indicators, and system UI overlays
        </p>

        {/* Phone mockup with safe areas */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="relative w-64">
            {/* Phone frame */}
            <div className="bg-neutral-900 rounded-[3rem] p-3">
              <div className="bg-neutral-800 rounded-[2.5rem] overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-2">
                  <div className="w-24 h-6 bg-neutral-900 rounded-full" />
                </div>
                
                {/* Screen content */}
                <div className="relative h-[400px] m-2 mt-0 rounded-b-[2rem] overflow-hidden">
                  {/* Top safe area */}
                  <div
                    className="absolute top-0 left-0 right-0 h-12 border-b-2 border-dashed flex items-end justify-center pb-1"
                    style={{ borderColor: brandColors.primary, backgroundColor: `${brandColors.primary}10` }}
                  >
                    <span className="text-xs" style={{ color: brandColors.primary }}>
                      Top Safe Area
                    </span>
                  </div>
                  
                  {/* Content area */}
                  <div className="absolute inset-0 top-12 bottom-8 flex items-center justify-center">
                    <span className="text-sm text-neutral-500">
                      Content Area
                    </span>
                  </div>
                  
                  {/* Bottom safe area */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 border-t-2 border-dashed flex items-center justify-center"
                    style={{ borderColor: brandColors.secondary, backgroundColor: `${brandColors.secondary}10` }}
                  >
                    <span className="text-xs" style={{ color: brandColors.secondary }}>
                      Bottom
                    </span>
                  </div>
                </div>
                
                {/* Home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-32 h-1 bg-neutral-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Safe area info */}
          <div className="flex-1 space-y-4">
            {safeAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card p-4"
              >
                <h3 className="font-medium text-neutral-900 dark:text-white">
                  {area.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {area.description}
                </p>
                <code
                  className="text-xs font-mono mt-2 block"
                  style={{ color: brandColors.primary }}
                >
                  {area.value}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Platform Adaptations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Platform Adaptations
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Automatic platform-specific behavior and styling
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformAdaptations.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${brandColors.primary}15` }}
                >
                  {platform.platform === 'iOS' && <Smartphone className="w-5 h-5" style={{ color: brandColors.primary }} />}
                  {platform.platform === 'Android' && <Smartphone className="w-5 h-5" style={{ color: brandColors.primary }} />}
                  {platform.platform === 'Web' && <Monitor className="w-5 h-5" style={{ color: brandColors.primary }} />}
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {platform.platform}
                </h3>
              </div>
              <ul className="space-y-2">
                {platform.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Usage */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Usage in Flutter
        </h2>
        <div className="code-block">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
            <span className="text-xs text-neutral-500 font-mono">dart</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
            <code>{`// Set status bar style
SystemChrome.setSystemUIOverlayStyle(
  SystemUiOverlayStyle.light, // or .dark
);

// Safe area wrapper
SafeArea(
  child: YourContent(),
);

// Access safe area values
final topPadding = MediaQuery.of(context).padding.top;
final bottomPadding = MediaQuery.of(context).padding.bottom;

// Edge-to-edge with manual padding
Scaffold(
  extendBodyBehindAppBar: true,
  extendBody: true,
  body: Padding(
    padding: EdgeInsets.only(
      top: MediaQuery.of(context).padding.top,
      bottom: MediaQuery.of(context).padding.bottom,
    ),
    child: YourContent(),
  ),
);`}</code>
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
