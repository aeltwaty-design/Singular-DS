/**
 * Color Primitives
 * Copied from docs-website - will be replaced by generated output.
 */

import type { ColorScale, BaseColors, StatusColors } from '../types';

export const baseColors: BaseColors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const grayLight: ColorScale = {
  25: '#FDFDFD',
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E9EAEB',
  300: '#D5D7DA',
  400: '#A4A7AE',
  500: '#717680',
  600: '#535862',
  700: '#414651',
  800: '#252B37',
  900: '#181D27',
  950: '#0A0D12',
};

export const grayDark: ColorScale = {
  25: '#FAFAFA',
  50: '#F7F7F7',
  100: '#F0F0F1',
  200: '#ECECED',
  300: '#CECFD2',
  400: '#94979C',
  500: '#85888E',
  600: '#61656C',
  700: '#373A41',
  800: '#22262F',
  900: '#13161B',
  950: '#0C0E12',
};

export const statusColors: StatusColors = {
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
    950: '#55160C',
  },
  warning: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E',
    950: '#4E1D09',
  },
  success: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#DCFAE6',
    200: '#ABEFC6',
    300: '#75E0A7',
    400: '#47CD89',
    500: '#17B26A',
    600: '#079455',
    700: '#067647',
    800: '#085D3A',
    900: '#074D31',
    950: '#053321',
  },
  info: {
    25: '#F5FAFF',
    50: '#EFF8FF',
    100: '#D1E9FF',
    200: '#B2DDFF',
    300: '#84CAFF',
    400: '#53B1FD',
    500: '#2E90FA',
    600: '#1570EF',
    700: '#175CD3',
    800: '#1849A9',
    900: '#194185',
    950: '#102A56',
  },
};

export const alphaValues = {
  10: '1A',
  20: '33',
  30: '4D',
  40: '66',
  50: '80',
  60: '99',
  70: 'B3',
  80: 'CC',
  90: 'E6',
  100: 'FF',
} as const;

export function withAlpha(hexColor: string, alphaPercent: keyof typeof alphaValues): string {
  const cleanHex = hexColor.replace('#', '');
  return `#${cleanHex}${alphaValues[alphaPercent]}`;
}

export function getColorStep(scale: ColorScale, step: keyof ColorScale): string {
  return scale[step];
}

export function isHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
