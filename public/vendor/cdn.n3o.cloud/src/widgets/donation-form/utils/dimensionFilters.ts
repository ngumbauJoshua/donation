import { PublishedFundStructure, PublishedFundDimension, FundDimensionSelector } from '@n3oltd/karakoram.connect.sdk.types';
import { PublishedFundStructureKey } from '../types';

export interface DimensionFilterOption {
  id: string;
  name: string;
}

export interface DimensionFilterData {
  dimensionName: PublishedFundStructureKey;
  dimension: PublishedFundDimension;
  isDropdown: boolean;
  options: DimensionFilterOption[];
}

/**
 * Pure function to extract dimension filter data from fund structure
 */
export function getDimensionFilters(fundStructure: PublishedFundStructure | null): DimensionFilterData[] {
  if (!fundStructure) {
    return [];
  }

  const dimensionsToRender = Object.entries(fundStructure).filter(
    ([, dimension]: [string, PublishedFundDimension]) => dimension.searchable
  );

  if (dimensionsToRender.length === 0) {
    return [];
  }

  return dimensionsToRender.map(([dimensionName, dimension]) => {
    const isDropdown = dimension.view?.selector === FundDimensionSelector.Dropdown;
    
    const options: DimensionFilterOption[] = isDropdown 
      ? (dimension.restrictedOptions || []).map((opt: string) => ({
          id: opt,
          name: opt
        }))
      : [];

    if (dimension.unrestrictedOption) {
      options.unshift({
        id: dimension.unrestrictedOption,
        name: dimension.unrestrictedOption
      });
    }

    return {
      dimensionName: dimensionName as PublishedFundStructureKey,
      dimension,
      isDropdown,
      options
    };
  });
}
