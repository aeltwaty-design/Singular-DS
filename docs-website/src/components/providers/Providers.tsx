'use client';

import { ThemeProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import {
  SingularProvider,
  useBrand as useSingularBrand,
  useDir as useSingularDir,
  type BrandId,
} from '@singular/react';

import { brands, brandIds } from '@/tokens/brands';

// Re-export hooks from @singular/react for backward compatibility
export { useBrand } from '@singular/react';
export type Brand = BrandId;

export type Locale = 'en' | 'ar';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

interface SetBrandContextType {
  setBrand: (brand: BrandId) => void;
}

const SetBrandContext = createContext<SetBrandContextType | undefined>(undefined);

export function useSetBrand() {
  const context = useContext(SetBrandContext);
  if (!context) throw new Error('useSetBrand must be used within Providers');
  return context.setBrand;
}

interface ProvidersProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function Providers({ children, defaultLocale = 'en' }: ProvidersProps) {
  const [brand, setBrand] = useState<BrandId>('walaplus');
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedBrand = localStorage.getItem('singular-brand') as BrandId;
    const savedLocale = localStorage.getItem('singular-locale') as Locale;

    if (savedBrand && brandIds.includes(savedBrand)) {
      setBrand(savedBrand);
    }
    if (savedLocale && ['en', 'ar'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('singular-brand', brand);
      document.documentElement.setAttribute('data-brand', brand);
    }
  }, [brand, mounted]);

  const [initialLocale, setInitialLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (mounted && initialLocale === null) {
      setInitialLocale(locale);
    }
  }, [mounted, locale, initialLocale]);

  useEffect(() => {
    if (mounted && initialLocale !== null && locale !== initialLocale) {
      localStorage.setItem('singular-locale', locale);
      document.cookie = `locale=${locale};path=/;max-age=31536000`;
      window.location.reload();
    } else if (mounted) {
      document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale, mounted, initialLocale]);

  const localeContextValue: LocaleContextType = {
    locale,
    setLocale,
    isRTL: locale === 'ar',
    dir: locale === 'ar' ? 'rtl' : 'ltr',
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      suppressHydrationWarning
    >
      <SingularProvider
        brand={brand}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <SetBrandContext.Provider value={{ setBrand }}>
          <LocaleContext.Provider value={localeContextValue}>
            {children}
          </LocaleContext.Provider>
        </SetBrandContext.Provider>
      </SingularProvider>
    </ThemeProvider>
  );
}
