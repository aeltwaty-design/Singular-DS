'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';

// Re-export types from generated tokens when available
export type BrandId = 'walaplus' | 'walaone' | 'doam';

export interface BrandColorScale {
  [step: number]: string;
  25: string; 50: string; 100: string; 200: string; 300: string;
  400: string; 500: string; 600: string; 700: string; 800: string;
  900: string; 950: string;
}

export interface BrandConfig {
  id: BrandId;
  name: string;
  nameAr: string;
  logo: string;
  primary: BrandColorScale;
  secondary: BrandColorScale;
}

// Default brand configurations (will be replaced by generated tokens)
const defaultBrands: Record<BrandId, BrandConfig> = {
  walaplus: {
    id: 'walaplus', name: 'WalaPlus', nameAr: 'والا بلس', logo: '/logo.svg',
    primary: { 25: '#E6FBF4', 50: '#CCF7E9', 100: '#99EFCC', 200: '#66E7B8', 300: '#33DEA3', 400: '#1AD997', 500: '#00CE8B', 600: '#00B87D', 700: '#009B69', 800: '#007D55', 900: '#005F41', 950: '#003D2A' },
    secondary: { 25: '#FFF0E6', 50: '#FFE1CC', 100: '#FFC299', 200: '#FFA366', 300: '#FF8433', 400: '#FF751D', 500: '#FF6608', 600: '#E65C07', 700: '#CC5206', 800: '#B34705', 900: '#993D04', 950: '#662903' },
  },
  walaone: {
    id: 'walaone', name: 'WalaOne', nameAr: 'والا ون', logo: '/walaone-logo.svg',
    primary: { 25: '#F1EEFC', 50: '#E3DDF9', 100: '#C7BBF3', 200: '#AB99ED', 300: '#9077E7', 400: '#8269E0', 500: '#755BD8', 600: '#6952C2', 700: '#5844A8', 800: '#48378A', 900: '#372A69', 950: '#241C46' },
    secondary: { 25: '#FEF9E9', 50: '#FDF3D3', 100: '#FCE7A7', 200: '#FBDB7B', 300: '#FACF4F', 400: '#FAC941', 500: '#FAC333', 600: '#E1AF2E', 700: '#C89B29', 800: '#AF8724', 900: '#8A6A1C', 950: '#5C4712' },
  },
  doam: {
    id: 'doam', name: 'Doam', nameAr: 'دوام', logo: '/doam-logo.svg',
    primary: { 25: '#E6F8F6', 50: '#CCF1ED', 100: '#99E3DB', 200: '#66D5C9', 300: '#33C7B7', 400: '#1AC0AD', 500: '#07B6A0', 600: '#06A390', 700: '#058A7A', 800: '#047163', 900: '#03574D', 950: '#023A33' },
    secondary: { 25: '#FFF0E6', 50: '#FFE1CC', 100: '#FFC299', 200: '#FFA366', 300: '#FF8433', 400: '#FF751D', 500: '#FF6608', 600: '#E65C07', 700: '#CC5206', 800: '#B34705', 900: '#993D04', 950: '#662903' },
  },
};

// --- Theme Context ---

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useSingularTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useSingularTheme must be used within a SingularProvider');
  }
  return context;
}

// Backward-compatible hook that mirrors next-themes API
export function useTheme(): { resolvedTheme: string | undefined } {
  const context = useContext(ThemeContext);
  return { resolvedTheme: context?.resolvedTheme };
}

// --- Brand Context ---

interface BrandContextType {
  brand: BrandId;
  brandName: string;
  brandNameAr: string;
  brandColors: { primary: string; secondary: string; primaryLight: string; primaryDark: string };
  currentBrand: BrandConfig;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function useBrand(): BrandContextType {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a SingularProvider');
  }
  return context;
}

// --- Direction Context ---

type Dir = 'ltr' | 'rtl';

interface DirContextType {
  dir: Dir;
  isRTL: boolean;
}

const DirContext = createContext<DirContextType | undefined>(undefined);

export function useDir(): DirContextType {
  const context = useContext(DirContext);
  if (!context) {
    return { dir: 'ltr', isRTL: false };
  }
  return context;
}

// --- System theme detection ---

function useSystemTheme(): Theme {
  const [systemTheme, setSystemTheme] = useState<Theme>('light');

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mql.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return systemTheme;
}

// --- SingularProvider ---

export interface SingularProviderProps {
  brand: BrandId;
  theme?: Theme;
  dir?: Dir;
  brands?: Record<BrandId, BrandConfig>;
  children: ReactNode;
}

export function SingularProvider({
  brand,
  theme,
  dir = 'ltr',
  brands = defaultBrands,
  children,
}: SingularProviderProps) {
  const systemTheme = useSystemTheme();
  const resolvedTheme = theme ?? systemTheme;

  const currentBrand = brands[brand] ?? brands.walaplus;

  const brandValue = useMemo<BrandContextType>(() => ({
    brand,
    brandName: currentBrand.name,
    brandNameAr: currentBrand.nameAr,
    brandColors: {
      primary: currentBrand.primary[500],
      secondary: currentBrand.secondary[500],
      primaryLight: currentBrand.primary[100],
      primaryDark: currentBrand.primary[700],
    },
    currentBrand,
  }), [brand, currentBrand]);

  const themeValue = useMemo<ThemeContextType>(() => ({
    theme: theme ?? resolvedTheme,
    resolvedTheme,
  }), [theme, resolvedTheme]);

  const dirValue = useMemo<DirContextType>(() => ({
    dir,
    isRTL: dir === 'rtl',
  }), [dir]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <BrandContext.Provider value={brandValue}>
        <DirContext.Provider value={dirValue}>
          {children}
        </DirContext.Provider>
      </BrandContext.Provider>
    </ThemeContext.Provider>
  );
}
