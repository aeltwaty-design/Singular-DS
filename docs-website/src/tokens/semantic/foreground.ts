/**
 * Foreground Color Semantic Tokens
 */

import type { SemanticToken } from '../types';

export const foregroundTokens: SemanticToken[] = [
  {
    name: 'fg-primary',
    light: 'gray-900',
    dark: 'white',
    description: 'Highest contrast non-text foreground elements such as icons.',
    descriptionAr: 'عناصر المقدمة غير النصية ذات التباين الأعلى مثل الأيقونات.',
  },
  {
    name: 'fg-secondary',
    light: 'gray-700',
    dark: 'gray-300',
    description: 'High contrast non-text foreground elements such as icons.',
    descriptionAr: 'عناصر المقدمة غير النصية عالية التباين.',
  },
  {
    name: 'fg-secondary_hover',
    light: 'gray-800',
    dark: 'gray-200',
    description: 'Secondary foreground elements when in hover state.',
    descriptionAr: 'عناصر المقدمة الثانوية في حالة التمرير.',
  },
  {
    name: 'fg-tertiary',
    light: 'gray-600',
    dark: 'gray-400',
    description: 'Medium contrast non-text foreground elements such as icons.',
    descriptionAr: 'عناصر المقدمة غير النصية متوسطة التباين.',
  },
  {
    name: 'fg-tertiary_hover',
    light: 'gray-700',
    dark: 'gray-300',
    description: 'Tertiary foreground elements when in hover state.',
    descriptionAr: 'عناصر المقدمة الثالثية في حالة التمرير.',
  },
  {
    name: 'fg-quaternary',
    light: 'gray-400',
    dark: 'gray-600',
    description: 'Low contrast non-text foreground elements.',
    descriptionAr: 'عناصر المقدمة غير النصية منخفضة التباين.',
  },
  {
    name: 'fg-quaternary_hover',
    light: 'gray-500',
    dark: 'gray-500',
    description: 'Quaternary foreground elements when in hover state.',
    descriptionAr: 'عناصر المقدمة الرباعية في حالة التمرير.',
  },
  {
    name: 'fg-white',
    light: 'white',
    dark: 'white',
    description: 'Foreground elements that are always white.',
    descriptionAr: 'عناصر المقدمة التي تكون دائمًا بيضاء.',
  },
  {
    name: 'fg-disabled',
    light: 'gray-400',
    dark: 'gray-500',
    description: 'Default color for disabled non-text foreground elements.',
    descriptionAr: 'اللون الافتراضي لعناصر المقدمة غير النصية المعطلة.',
  },
  {
    name: 'fg-disabled_subtle',
    light: 'gray-300',
    dark: 'gray-600',
    description: 'Subtle alternative for disabled foreground elements.',
    descriptionAr: 'بديل أكثر دقة لعناصر المقدمة المعطلة.',
  },
  {
    name: 'fg-brand-primary',
    light: 'primary-600',
    dark: 'primary-500',
    description: 'Primary brand color foreground elements.',
    descriptionAr: 'عناصر المقدمة بلون العلامة التجارية الأساسي.',
  },
  {
    name: 'fg-brand-primary_alt',
    light: 'primary-600',
    dark: 'gray-300',
    description: 'Primary brand that switches to gray in dark mode.',
    descriptionAr: 'بديل لعناصر المقدمة بلون العلامة التجارية الأساسي.',
  },
  {
    name: 'fg-brand-secondary',
    light: 'primary-500',
    dark: 'primary-500',
    description: 'Secondary brand foreground elements.',
    descriptionAr: 'عناصر المقدمة بلون العلامة التجارية الثانوي.',
  },
  {
    name: 'fg-brand-secondary_alt',
    light: 'primary-500',
    dark: 'gray-600',
    description: 'Secondary brand that switches to gray in dark mode.',
    descriptionAr: 'بديل لعناصر المقدمة بلون العلامة التجارية الثانوي.',
  },
  {
    name: 'fg-error-primary',
    light: 'error-600',
    dark: 'error-500',
    description: 'Primary error state foreground.',
    descriptionAr: 'لون حالة الخطأ الأساسي لعناصر المقدمة.',
  },
  {
    name: 'fg-error-secondary',
    light: 'error-500',
    dark: 'error-400',
    description: 'Secondary error state foreground.',
    descriptionAr: 'لون حالة الخطأ الثانوي لعناصر المقدمة.',
  },
  {
    name: 'fg-warning-primary',
    light: 'warning-600',
    dark: 'warning-500',
    description: 'Primary warning state foreground.',
    descriptionAr: 'لون حالة التحذير الأساسي لعناصر المقدمة.',
  },
  {
    name: 'fg-warning-secondary',
    light: 'warning-500',
    dark: 'warning-400',
    description: 'Secondary warning state foreground.',
    descriptionAr: 'لون حالة التحذير الثانوي لعناصر المقدمة.',
  },
  {
    name: 'fg-success-primary',
    light: 'success-600',
    dark: 'success-500',
    description: 'Primary success state foreground.',
    descriptionAr: 'لون حالة النجاح الأساسي لعناصر المقدمة.',
  },
  {
    name: 'fg-success-secondary',
    light: 'success-500',
    dark: 'success-400',
    description: 'Secondary success state foreground.',
    descriptionAr: 'لون حالة النجاح الثانوي لعناصر المقدمة.',
  },
];

