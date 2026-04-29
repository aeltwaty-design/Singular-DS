/**
 * Brand Exports
 * Copied from docs-website - will be replaced by generated output.
 */

import type { Brand, BrandId, Brands } from '../types';
import { walaplus } from './walaplus';
import { walaone } from './walaone';
import { doam } from './doam';

export { walaplus, walaone, doam };

export const brands: Brands = {
  walaplus,
  walaone,
  doam,
};

export const brandIds: BrandId[] = ['walaplus', 'walaone', 'doam'];

export function getBrand(id: BrandId): Brand {
  return brands[id];
}

export function getAllBrands(): Brand[] {
  return Object.values(brands);
}

export const defaultBrand: Brand = walaplus;
export const defaultBrandId: BrandId = 'walaplus';
