'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Monitor,
  Languages,
  Search,
  Menu,
  X,
  ChevronDown,
  Github,
  Figma,
} from 'lucide-react';
import { useBrand, useLocale, Brand } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';

interface NavbarProps {
  translations: {
    home: string;
    getStarted: string;
    foundations: string;
    components: string;
    search: string;
    toggleTheme: string;
    toggleLanguage: string;
  };
}

const brandInfo: Record<Brand, { name: string; color: string }> = {
  walaplus: { name: 'WalaPlus', color: '#00CE8B' },
  walaone: { name: 'WalaOne', color: '#755BD8' },
  doam: { name: 'Doam', color: '#07B6A0' },
};

export function Navbar({ translations }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { brand, setBrand, brandColors } = useBrand();
  const { locale, setLocale, isRTL } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { href: '/', label: translations.home },
    { href: '/docs/getting-started', label: translations.getStarted },
    { href: '/docs/foundations', label: translations.foundations },
    { href: '/docs/components', label: translations.components },
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50" />
    );
  }

  return (
    <header
      suppressHydrationWarning
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: brandColors.primary }}
            >
              <img src="/logo.svg" alt="Singular" className="w-6 h-6 brightness-0 invert" />
            </div>
            <span className="font-display font-semibold text-lg text-neutral-900 dark:text-white">
              Singular
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              onClick={() => {/* Open search modal */}}
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">{translations.search}</span>
              <kbd className="hidden lg:inline ms-2 px-1.5 py-0.5 text-xs bg-white dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700">
                ⌘K
              </kbd>
            </button>

            {/* Brand Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsBrandMenuOpen(!isBrandMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: brandInfo[brand].color }}
                />
                <span className="hidden sm:inline text-neutral-700 dark:text-neutral-300">
                  {brandInfo[brand].name}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <AnimatePresence>
                {isBrandMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsBrandMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-20"
                    >
                      {(Object.keys(brandInfo) as Brand[]).map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setBrand(b);
                            setIsBrandMenuOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                            brand === b
                              ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                          )}
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: brandInfo[b].color }}
                          />
                          {brandInfo[b].name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title={translations.toggleTheme}
                suppressHydrationWarning
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : theme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Monitor className="w-5 h-5" />
                )}
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsThemeMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-36 py-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-20"
                    >
                      {[
                        { value: 'light', icon: Sun, label: 'Light' },
                        { value: 'dark', icon: Moon, label: 'Dark' },
                        { value: 'system', icon: Monitor, label: 'System' },
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setTheme(item.value);
                            setIsThemeMenuOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                            theme === item.value
                              ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={translations.toggleLanguage}
            >
              <Languages className="w-5 h-5" />
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <Figma className="w-4 h-4" />
                  Figma
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

