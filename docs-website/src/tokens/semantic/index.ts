/**
 * Semantic Token Exports
 */

import type { SemanticTokenCategory } from '../types';
import { textTokens } from './text';
import { borderTokens } from './border';
import { foregroundTokens } from './foreground';
import { backgroundTokens } from './background';
import { alphaTokens } from './alpha';

// Re-export individual token arrays
export { textTokens } from './text';
export { borderTokens } from './border';
export { foregroundTokens } from './foreground';
export { backgroundTokens } from './background';
export { alphaTokens } from './alpha';

// Semantic token categories with metadata
export const semanticCategories: SemanticTokenCategory[] = [
  {
    id: 'text',
    name: 'Text color',
    nameAr: 'لون النص',
    description:
      'Use text color variables to manage all text fill colors in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr:
      'استخدم متغيرات لون النص لإدارة جميع ألوان تعبئة النص في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    tokens: textTokens,
  },
  {
    id: 'border',
    name: 'Border color',
    nameAr: 'لون الحدود',
    description:
      'Use border color variables to manage all stroke colors in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr:
      'استخدم متغيرات لون الحدود لإدارة جميع ألوان الحدود في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    tokens: borderTokens,
  },
  {
    id: 'foreground',
    name: 'Foreground color',
    nameAr: 'لون المقدمة',
    description:
      'Use foreground color variables to manage all non-text foreground elements in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr:
      'استخدم متغيرات لون المقدمة لإدارة جميع عناصر المقدمة غير النصية في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    tokens: foregroundTokens,
  },
  {
    id: 'background',
    name: 'Background color',
    nameAr: 'لون الخلفية',
    description:
      'Use background color variables to manage all fill colors for elements in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr:
      'استخدم متغيرات لون الخلفية لإدارة جميع ألوان التعبئة للعناصر في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    tokens: backgroundTokens,
  },
  {
    id: 'alpha',
    name: 'Alpha color',
    nameAr: 'لون ألفا',
    description:
      'Use alpha color variables for transparent overlays and effects across light and dark modes. These variables are structured to provide consistent transparency levels.',
    descriptionAr:
      'استخدم متغيرات لون ألفا للطبقات الشفافة والتأثيرات عبر الأوضاع الفاتحة والداكنة. تم تصميم هذه المتغيرات لتوفير مستويات شفافية متسقة.',
    tokens: alphaTokens,
  },
];

// Get category by ID
export function getSemanticCategory(id: string): SemanticTokenCategory | undefined {
  return semanticCategories.find((cat) => cat.id === id);
}

// Get all tokens as flat array
export function getAllSemanticTokens() {
  return semanticCategories.flatMap((cat) => cat.tokens);
}

