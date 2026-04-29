'use client';

import { SVGProps, useMemo, lazy, Suspense } from 'react';
import * as IconsaxIcons from 'iconsax-react';
import { Close as CloseIcon } from './Close';

// Variant type matching iconsax-react
export type IconVariant = 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken';

// Custom icons that wrap/transform base iconsax icons
const CUSTOM_ICONS = ['Close'] as const;

// Map our lowercase variants to iconsax format
const variantMap: Record<string, IconVariant> = {
  linear: 'Linear',
  bold: 'Bold',
  outline: 'Outline',
  twotone: 'TwoTone',
  bulk: 'Bulk',
  broken: 'Broken',
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  name: string;
  variant?: IconVariant | keyof typeof variantMap;
  size?: number | string;
  color?: string;
  className?: string;
}

// Convert kebab-case or snake_case to PascalCase
// If already PascalCase (no separators), return as-is
function toPascalCase(str: string): string {
  // If no separators, assume it's already PascalCase - just ensure first letter is uppercase
  if (!str.includes('-') && !str.includes('_')) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Convert from kebab-case or snake_case
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Get all available icon names from iconsax-react
// Icons are forwardRef objects with $$typeof Symbol
const iconNames = Object.keys(IconsaxIcons).filter(key => {
  const icon = (IconsaxIcons as Record<string, unknown>)[key];
  return icon && typeof icon === 'object' && key !== 'default';
});

export function Icon({
  name,
  variant = 'Linear',
  size = 24,
  color = 'currentColor',
  className = '',
  ...props
}: IconProps) {
  // Normalize variant to iconsax format
  const normalizedVariant = typeof variant === 'string' && variant in variantMap 
    ? variantMap[variant as keyof typeof variantMap]
    : variant as IconVariant;

  // Convert name to PascalCase for iconsax lookup
  const pascalName = toPascalCase(name);
  
  // Handle custom icons (like Close which is Add rotated 45°)
  if (pascalName === 'Close') {
    return (
      <CloseIcon
        size={size}
        color={color}
        variant={normalizedVariant}
        className={className}
      />
    );
  }
  
  // Get the icon component from iconsax
  const IconComponent = (IconsaxIcons as Record<string, React.ComponentType<{
    size?: number | string;
    color?: string;
    variant?: IconVariant;
    className?: string;
  }>>)[pascalName];
  
  if (!IconComponent) {
    // Return a placeholder for unknown icons
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="8"
          fill={color}
        >
          {name.slice(0, 3)}
        </text>
      </svg>
    );
  }
  
  return (
    <IconComponent
      size={size}
      color={color}
      variant={normalizedVariant}
      className={className}
    />
  );
}

// Icon size presets matching the design system
export const IconSizes = {
  xxs: 12,
  xs: 16,
  sm: 18,
  base: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
  hero: 80,
  xhero: 96,
  xxhero: 120,
} as const;

export type IconSize = keyof typeof IconSizes;

// Helper to get size value
export function getIconSize(size: IconSize | number): number {
  if (typeof size === 'number') return size;
  return IconSizes[size];
}

// Export all available icon names for the icon browser
export function getAvailableIconNames(): string[] {
  return iconNames;
}

// Check if an icon exists
export function iconExists(name: string): boolean {
  const pascalName = toPascalCase(name);
  // Include custom icons
  if (CUSTOM_ICONS.includes(pascalName as typeof CUSTOM_ICONS[number])) {
    return true;
  }
  return pascalName in IconsaxIcons;
}
