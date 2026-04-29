'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { copyToClipboard } from '@/lib/utils';

interface CodeExampleProps {
  translations: {
    title: string;
    description: string;
    features: {
      typeSafe: string;
      autoTheme: string;
      semantic: string;
      intellisense: string;
    };
  };
}

const codeSnippet = `// Access design tokens in Flutter
Widget build(BuildContext context) {
  // Use context extensions for type-safe access
  final colors = context.colors;
  final typography = context.typography;
  final spacing = context.spacing;

  return Container(
    padding: EdgeInsets.all(spacing.md),
    decoration: BoxDecoration(
      color: colors.bgSurface,
      borderRadius: context.radius.lg,
      boxShadow: context.elevation.level2,
    ),
    child: Text(
      'Hello, Singular!',
      style: typography.headlineMedium.copyWith(
        color: colors.textPrimary,
      ),
    ),
  );
}`;

export function CodeExample({ translations }: CodeExampleProps) {
  const { brandColors } = useBrand();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(codeSnippet);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*)/g, '<span class="text-neutral-500">$1</span>')
      .replace(
        /\b(Widget|BuildContext|Container|EdgeInsets|BoxDecoration|Text|context)\b/g,
        '<span class="text-cyan-400">$1</span>'
      )
      .replace(
        /\b(final|return|build)\b/g,
        '<span class="text-purple-400">$1</span>'
      )
      .replace(/\b(colors|typography|spacing|radius|elevation)\b/g, '<span class="text-yellow-400">$1</span>')
      .replace(
        /\.(colors|typography|spacing|radius|elevation|md|lg|level2|bgSurface|headlineMedium|textPrimary|copyWith|all)\b/g,
        '.<span class="text-blue-400">$1</span>'
      )
      .replace(/('.*?')/g, '<span class="text-green-400">$1</span>');
  };

  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: brandColors.primary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              {translations.title}
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              {translations.description}
            </p>

            {/* Feature list */}
            <ul className="space-y-4">
              {[
                translations.features.typeSafe,
                translations.features.autoTheme,
                translations.features.semantic,
                translations.features.intellisense,
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-neutral-300"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: brandColors.primary }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="code-block">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  example_widget.dart
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300 scrollbar-custom">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(codeSnippet),
                  }}
                />
              </pre>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-xl blur-xl opacity-50"
              style={{ backgroundColor: brandColors.primary }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-lg blur-lg opacity-40"
              style={{ backgroundColor: brandColors.secondary }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

