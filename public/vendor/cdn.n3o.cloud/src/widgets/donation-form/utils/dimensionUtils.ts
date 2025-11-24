import { PublishedFundStructureKey } from '../types';

export const DIMENSION_KEYS: PublishedFundStructureKey[] = ['dimension1', 'dimension2', 'dimension3', 'dimension4'];

export const createClearedDimensionFilters = (): Record<PublishedFundStructureKey, undefined> => {
  return DIMENSION_KEYS.reduce((acc, key) => {
    acc[key] = undefined;
    return acc;
  }, {} as Record<PublishedFundStructureKey, undefined>);
};

export const createFiltersWithClearedDimensions = (currentFilters: Record<string, any>) => {
  return {
    ...currentFilters,
    ...createClearedDimensionFilters()
  };
};
