/**
 * Brand Exports
 * Centralized brand configurations
 */

import type { Brand, BrandId, Brands } from '../types';
import { walaplus } from './walaplus';
import { walaone } from './walaone';
import { doam } from './doam';

// Export individual brands
export { walaplus, walaone, doam };

// Export all brands as a record
export const brands: Brands = {
  walaplus,
  walaone,
  doam,
};

// Brand IDs for iteration
export const brandIds: BrandId[] = ['walaplus', 'walaone', 'doam'];

// Get brand by ID
export function getBrand(id: BrandId): Brand {
  return brands[id];
}

// Get all brands as array
export function getAllBrands(): Brand[] {
  return Object.values(brands);
}

// Default brand
export const defaultBrand: Brand = walaplus;
export const defaultBrandId: BrandId = 'walaplus';

