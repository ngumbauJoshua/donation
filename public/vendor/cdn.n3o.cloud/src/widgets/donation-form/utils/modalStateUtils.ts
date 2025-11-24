import { NAVIGATION_LEVELS, MENU_TYPES } from '../types/navigation.types';
import { createFiltersWithClearedDimensions } from '../utils/dimensionUtils';

export interface ModalStateUtils {
  getCurrentTitle: (navigationContext: any, selectedCampaign: any, selectedDesignation: any, formatMessage: any) => string;
  createClearSearchCriteria: (setNavigationContext: any) => () => void;
}

/**
 * Factory function to create modal state utilities
 */
export function createModalStateUtils(): ModalStateUtils {
  
  const getCurrentTitle = (navigationContext: any, selectedCampaign: any, selectedDesignation: any, formatMessage: any) => {
    if (navigationContext.menuType === MENU_TYPES.Search) {
      return `${formatMessage('common.search')}`;
    }
    
    if (navigationContext.filters.campaignId && selectedCampaign) {
      return selectedCampaign.name;
    }

    if (navigationContext.currentLevel === NAVIGATION_LEVELS.MENU) {
      return `${formatMessage('common.button.back')}`;
    }

    const lastPathItem = navigationContext.path[navigationContext.path.length - 1];
    return lastPathItem?.title || selectedDesignation?.name || "";
  };

  const createClearSearchCriteria = (setNavigationContext: any) => {
    return () => {
      setNavigationContext((prev: any) => ({
        ...prev,
        menuType: prev.filters.campaignId ? MENU_TYPES.Campaign : MENU_TYPES.CampaignsList,
        currentLevel: prev.filters.campaignId ? NAVIGATION_LEVELS.DESIGNATIONS : NAVIGATION_LEVELS.MENU,
        filters: {
          ...prev.filters,
          ...createFiltersWithClearedDimensions(prev.filters),
          searchValue: undefined
        }
      }));
    };
  };

  return {
    getCurrentTitle,
    createClearSearchCriteria
  };
}

