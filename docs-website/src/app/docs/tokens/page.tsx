'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, Code, FileJson, Sparkles } from 'lucide-react';
import { useBrand } from '@/components/providers/Providers';
import { cn, copyToClipboard } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// Import generators from token system
import {
  generateCSS,
  generateTailwind,
  generateFlutter,
  generateJSON,
  generateAllFormats,
  formatInfo,
  type ExportFormat,
  type BrandId,
} from '@/tokens';

type TabId = ExportFormat | 'all';

const tabs: { id: TabId; name: string; icon: typeof Code }[] = [
  { id: 'css', name: 'CSS', icon: Code },
  { id: 'tailwind', name: 'Tailwind', icon: Code },
  { id: 'flutter', name: 'Flutter', icon: Code },
  { id: 'json', name: 'JSON', icon: FileJson },
];

export default function TokensPage() {
  const t = useTranslations();
  const { brand, brandColors } = useBrand();
  const [activeTab, setActiveTab] = useState<TabId>('css');
  const [copied, setCopied] = useState(false);
  const [includeSemantics, setIncludeSemantics] = useState(true);

  // Generate output based on active tab
  const output = useMemo(() => {
    const options = {
      brandId: brand as BrandId,
      includeSemantics,
    };

    switch (activeTab) {
      case 'css':
        return generateCSS(options);
      case 'tailwind':
        return generateTailwind(options);
      case 'flutter':
        return generateFlutter(options);
      case 'json':
        return generateJSON(options);
      default:
        return generateCSS(options);
    }
  }, [activeTab, brand, includeSemantics]);

  const handleCopy = async () => {
    const success = await copyToClipboard(output.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = output.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const outputs = generateAllFormats({
      brandId: brand as BrandId,
      includeSemantics,
    });

    outputs.forEach((out) => {
      const blob = new Blob([out.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = out.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <Sparkles className="w-6 h-6" style={{ color: brandColors.primary }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
            Token Export
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          Export design tokens in multiple formats for use across different platforms.
          All tokens are generated from a single source of truth.
        </p>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-wrap gap-4"
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSemantics}
            onChange={(e) => setIncludeSemantics(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Include semantic tokens
          </span>
        </label>

        <button
          onClick={handleDownloadAll}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download All Formats
        </button>
      </motion.div>

      {/* Format tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Format info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg"
      >
        <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
          {formatInfo[activeTab as ExportFormat]?.name || activeTab.toUpperCase()}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatInfo[activeTab as ExportFormat]?.description || 'Export format'}
        </p>
      </motion.div>

      {/* Code preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            {output.filename}
          </button>
        </div>

        <div className="bg-neutral-950 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-neutral-500 font-mono ml-2">
              {output.filename}
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-300 max-h-[600px] overflow-y-auto">
            <code>{output.content}</code>
          </pre>
        </div>
      </motion.div>

      {/* Usage instructions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Usage Instructions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CSS */}
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">CSS</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Import the CSS file in your project and use CSS variables.
            </p>
            <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs font-mono">
{`@import 'tokens.css';

.button {
  background: var(--color-primary-500);
  color: var(--text-white);
}`}
            </pre>
          </div>

          {/* Tailwind */}
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Tailwind</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Extend your tailwind.config.js with the generated tokens.
            </p>
            <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs font-mono">
{`const tokens = require('./tokens.tailwind');

module.exports = {
  theme: { extend: tokens }
}`}
            </pre>
          </div>

          {/* Flutter */}
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Flutter</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Import the Dart file and use the theme extension.
            </p>
            <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs font-mono">
{`import 'singular_tokens.dart';

MaterialApp(
  theme: ThemeData(
    extensions: [SingularThemes.light()],
  ),
)`}
            </pre>
          </div>

          {/* JSON */}
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">JSON</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Compatible with Style Dictionary and Figma Tokens.
            </p>
            <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs font-mono">
{`// style-dictionary.config.js
module.exports = {
  source: ['tokens.json'],
  platforms: { ... }
}`}
            </pre>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

