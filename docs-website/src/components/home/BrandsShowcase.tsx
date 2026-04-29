'use client';

import { motion } from 'framer-motion';
import { useBrand, Brand } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';

interface BrandsShowcaseProps {
  translations: {
    title: string;
    description: string;
    walaplus: { name: string; description: string };
    walaone: { name: string; description: string };
    doam: { name: string; description: string };
  };
  buttonLabels: {
    primary: string;
    secondary: string;
    outlined: string;
  };
}

const brands: {
  id: Brand;
  primary: string;
  secondary: string;
  gradient: string;
  logo: string;
}[] = [
  {
    id: 'walaplus',
    primary: '#00CE8B',
    secondary: '#FF6608',
    gradient: 'from-[#00CE8B] to-[#FF6608]',
    logo: '/logo.svg',
  },
  {
    id: 'walaone',
    primary: '#755BD8',
    secondary: '#FAC333',
    gradient: 'from-[#755BD8] to-[#FAC333]',
    logo: '/walaone-logo.svg',
  },
  {
    id: 'doam',
    primary: '#07B6A0',
    secondary: '#FF6608',
    gradient: 'from-[#07B6A0] to-[#FF6608]',
    logo: '/doam-logo.svg',
  },
];

export function BrandsShowcase({ translations, buttonLabels }: BrandsShowcaseProps) {
  const { brand: currentBrand, setBrand, brandColors } = useBrand();

  const brandTranslations: Record<Brand, { name: string; description: string }> = {
    walaplus: translations.walaplus,
    walaone: translations.walaone,
    doam: translations.doam,
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-hero-pattern dark:opacity-20" />
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
            {translations.description}
          </p>
        </motion.div>

        {/* Brand cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand, index) => (
            <motion.button
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setBrand(brand.id)}
              className={cn(
                'group relative rounded-3xl p-8 text-left transition-all duration-500 overflow-hidden',
                'bg-white dark:bg-neutral-800',
                'border-2',
                currentBrand === brand.id
                  ? 'border-transparent ring-2 ring-offset-2 ring-offset-neutral-50 dark:ring-offset-neutral-900'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              )}
              style={{
                boxShadow:
                  currentBrand === brand.id
                    ? `0 25px 50px -12px ${brand.primary}30`
                    : undefined,
                // @ts-ignore
                '--tw-ring-color':
                  currentBrand === brand.id ? brand.primary : undefined,
              }}
            >
              {/* Gradient accent */}
              <div
                className={cn(
                  'absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r',
                  brand.gradient,
                  currentBrand === brand.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                )}
                style={{ transition: 'opacity 0.3s' }}
              />

              {/* Logo/Icon */}
              <div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${brand.primary}, ${brand.secondary})`,
                }}
              >
                <img src={brand.logo} alt={brandTranslations[brand.id].name} className="w-10 h-10 brightness-0 invert" />
              </div>

              {/* Brand name */}
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                {brandTranslations[brand.id].name}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
                {brandTranslations[brand.id].description}
              </p>

              {/* Color swatches */}
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg shadow-inner"
                  style={{ backgroundColor: brand.primary }}
                  title="Primary"
                />
                <div
                  className="w-8 h-8 rounded-lg shadow-inner"
                  style={{ backgroundColor: brand.secondary }}
                  title="Secondary"
                />
                <span className="text-xs text-neutral-400 ms-2">
                  {brand.primary} · {brand.secondary}
                </span>
              </div>

              {/* Selection indicator */}
              {currentBrand === brand.id && (
                <motion.div
                  layoutId="brandIndicator"
                  className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: brand.primary }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

