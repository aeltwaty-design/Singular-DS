'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Copy,
  Check,
  Terminal,
  Palette,
  Figma,
  BookOpen,
  ArrowRight,
  Package,
  Code,
  Layers,
} from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950">
        <span className="text-xs text-neutral-500 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function GettingStartedPage() {
  const t = useTranslations();
  const { brandColors } = useBrand();

  const installationSteps = [
    {
      title: t('getStarted.installation.step1'),
      code: `dependencies:
  singular_design_system:
    git:
      url: https://github.com/your-org/singular-design-system.git
      ref: main`,
      language: 'yaml',
    },
    {
      title: t('getStarted.installation.step2'),
      code: `import 'package:singular_design_system/design_system/singular.dart';`,
      language: 'dart',
    },
    {
      title: t('getStarted.installation.step3'),
      code: `MaterialApp(
  theme: AppThemeFactory.walaPlus.lightTheme,
  darkTheme: AppThemeFactory.walaPlus.darkTheme,
  themeMode: ThemeMode.system,
  // ...
)`,
      language: 'dart',
    },
  ];

  const quickLinks = [
    {
      icon: Palette,
      title: t('getStarted.quickLinks.colors'),
      description: t('getStarted.quickLinks.colorsDesc'),
      href: '/docs/foundations/colors',
    },
    {
      icon: Layers,
      title: t('getStarted.quickLinks.typography'),
      description: t('getStarted.quickLinks.typographyDesc'),
      href: '/docs/foundations/typography',
    },
    {
      icon: Code,
      title: t('getStarted.quickLinks.components'),
      description: t('getStarted.quickLinks.componentsDesc'),
      href: '/docs/components',
    },
    {
      icon: Figma,
      title: t('getStarted.quickLinks.figma'),
      description: t('getStarted.quickLinks.figmaDesc'),
      href: 'https://figma.com',
      external: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <BookOpen className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            {t('getStarted.title')}
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {t('getStarted.subtitle')}
        </p>
      </motion.div>

      {/* Quick links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => {
            const LinkComponent = link.external ? 'a' : Link;
            const linkProps = link.external
              ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.href };

            return (
              <LinkComponent
                key={link.href}
                {...linkProps}
                className="group card card-hover p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${brandColors.primary}15` }}
                  >
                    <link.icon
                      className="w-5 h-5"
                      style={{ color: brandColors.primary }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {link.description}
                    </p>
                  </div>
                </div>
              </LinkComponent>
            );
          })}
        </div>
      </motion.section>

      {/* Installation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Package className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('getStarted.installation.title')}
          </h2>
        </div>

        <div className="space-y-6">
          {installationSteps.map((step, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {step.title}
              </h3>
              <CodeBlock code={step.code} language={step.language} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Usage example */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Terminal className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('getStarted.usage.title')}
          </h2>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {t('getStarted.usage.description')}
        </p>

        <CodeBlock
          code={`Widget build(BuildContext context) {
  // Access tokens via context extensions
  final colors = context.colors;
  final typography = context.typography;
  final spacing = context.spacing;
  final radius = context.radius;
  final elevation = context.elevation;

  return Container(
    padding: EdgeInsets.all(spacing.md),
    decoration: BoxDecoration(
      color: colors.bgSurface,
      borderRadius: radius.lg,
      boxShadow: elevation.level2,
    ),
    child: Column(
      children: [
        Text(
          'Headline',
          style: typography.headlineMedium.copyWith(
            color: colors.textPrimary,
          ),
        ),
        Gap.md(),
        Text(
          'Body text with semantic colors',
          style: typography.bodyMedium.copyWith(
            color: colors.textSecondary,
          ),
        ),
      ],
    ),
  );
}`}
          language="dart"
        />
      </motion.section>

      {/* Brand switching */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Layers className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('features.themes.title')}
          </h2>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {t('features.themes.description')}
        </p>

        <CodeBlock
          code={`// Available brands
enum SingularBrand { walaPlus, walaOne, doam }

// Get theme for any brand
final theme = AppThemeFactory.getTheme(
  brand: SingularBrand.walaOne,
  mode: ThemeMode.dark,
  locale: Locale('ar', 'SA'), // Optional: for Arabic typography
);

// Or use convenience getters
final lightTheme = AppThemeFactory.walaPlus.lightTheme;
final darkTheme = AppThemeFactory.walaPlus.darkTheme;`}
          language="dart"
        />
      </motion.section>
    </div>
  );
}
