/**
 * Border Color Semantic Tokens
 */

import type { SemanticToken } from '../types';

export const borderTokens: SemanticToken[] = [
  {
    name: 'border-primary',
    light: 'gray-300',
    dark: 'gray-700',
    description: 'High contrast borders for input fields, button groups, and checkboxes.',
    descriptionAr: 'حدود عالية التباين للمكونات مثل حقول الإدخال ومجموعات الأزرار.',
  },
  {
    name: 'border-secondary',
    light: 'gray-200',
    dark: 'gray-800',
    description: 'Medium contrast borders. Default for most components like file uploaders, cards, and content dividers.',
    descriptionAr: 'حدود متوسطة التباين. الافتراضي لمعظم المكونات.',
  },
  {
    name: 'border-secondary_alt',
    light: '#00000014',
    dark: 'gray-800',
    description: 'Alternative secondary border with alpha transparency for floating menus.',
    descriptionAr: 'بديل للحدود الثانوية يستخدم شفافية ألفا للقوائم العائمة.',
  },
  {
    name: 'border-tertiary',
    light: 'gray-100',
    dark: 'gray-800',
    description: 'Low contrast borders for subtle dividers and chart axis dividers.',
    descriptionAr: 'حدود منخفضة التباين للفواصل الدقيقة.',
  },
  {
    name: 'border-disabled',
    light: 'gray-300',
    dark: 'gray-700',
    description: 'Default disabled border for input fields and checkboxes.',
    descriptionAr: 'لون الحدود المعطل الافتراضي.',
  },
  {
    name: 'border-disabled_subtle',
    light: 'gray-200',
    dark: 'gray-800',
    description: 'Subtle alternative for disabled borders.',
    descriptionAr: 'بديل أكثر دقة للحدود المعطلة.',
  },
  {
    name: 'border-brand',
    light: 'primary-500',
    dark: 'primary-400',
    description: 'Default brand border for active states in input fields.',
    descriptionAr: 'لون حدود العلامة التجارية الافتراضي للحالات النشطة.',
  },
  {
    name: 'border-brand_alt',
    light: 'primary-600',
    dark: 'gray-700',
    description: 'Brand border that switches to gray in dark mode.',
    descriptionAr: 'لون حدود العلامة التجارية الذي يتحول إلى رمادي في الوضع الداكن.',
  },
  {
    name: 'border-error',
    light: 'error-500',
    dark: 'error-400',
    description: 'Default error state semantic border color.',
    descriptionAr: 'لون الحدود الدلالي لحالة الخطأ الافتراضية.',
  },
  {
    name: 'border-error_subtle',
    light: 'error-300',
    dark: 'error-500',
    description: 'Subtle alternative for error state borders.',
    descriptionAr: 'بديل أكثر دقة للحدود الدلالية لحالة الخطأ.',
  },
];

