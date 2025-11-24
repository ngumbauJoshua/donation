import React from 'react';
import { FundDimensionSelector } from '@n3oltd/karakoram.connect.sdk.types';
import { NavigationContext, MENU_TYPES, NAVIGATION_LEVELS } from '../types/navigation.types';
import { PublishedFundStructureKey } from '../types';

interface DimensionHandlersConfig {
  navigationContext: NavigationContext;
  setNavigationContext: React.Dispatch<React.SetStateAction<NavigationContext>>;
  performSearch: (criteria?: { selectedDimension?: any }) => Promise<void>;
}

export interface DimensionHandlers {
  handleDimensionToggle: (dimensionName: PublishedFundStructureKey, checked: boolean, dimension: any) => void;
  handleDimensionValueChange: (dimensionName: PublishedFundStructureKey, value: string) => void;
}

export function createDimensionHandlers({
  navigationContext,
  setNavigationContext,
  performSearch
}: DimensionHandlersConfig): DimensionHandlers {

  const handleDimensionToggle = (
    dimensionName: PublishedFundStructureKey,
    checked: boolean,
    dimension: any
  ) => {
    if (dimension.view?.selector === FundDimensionSelector.Toggle) {
      const newValue = checked ? dimension.view?.toggle?.onValue! : dimension.view?.toggle?.offValue!;
      
      setNavigationContext(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [dimensionName]: newValue
        }
      }));

      const updatedFilters = {
        ...navigationContext.filters,
        [dimensionName]: newValue
      };
      
      
      
        setNavigationContext((prev) => ({
					...prev,
					menuType: MENU_TYPES.Search,
					currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
					filters: {
						...prev.filters,
						[dimensionName]: newValue,
					},
				}));
        
        if (newValue) {
          performSearch({ selectedDimension: updatedFilters });
        }
      
    }
  };

  const handleDimensionValueChange = (
    dimensionName: PublishedFundStructureKey,
    value: string
  ) => {
    setNavigationContext(prev => ({
      ...prev,
      menuType: MENU_TYPES.Search,
      currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
      filters: {
        ...prev.filters,
        [dimensionName]: value,
      },
    }));
    
    const updatedFilters = {
      ...navigationContext.filters,
      [dimensionName]: value
    };
    performSearch({ selectedDimension: updatedFilters });
  };

  return {
    handleDimensionToggle,
    handleDimensionValueChange
  };
}
