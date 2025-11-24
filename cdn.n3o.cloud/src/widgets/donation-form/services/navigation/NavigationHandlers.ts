import { NavigationTransformService } from './NavigationService';
import { DonateMenuEntryType, PublishedCampaign } from '@n3oltd/karakoram.platforms.sdk.types';
import { 
	NavigationHandler,
	NavigationContext,
	NavigationItem,
	MENU_TYPES,
	NAVIGATION_LEVELS,
	NAVIGATION_ITEM_TYPES,
	NavigationServices
} from '../../types/navigation.types';
import { PublishedFileKind } from '@n3oltd/karakoram.connect.sdk.types';


export class CampaignHandler implements NavigationHandler {
	
	getMenuType(): string {
		return MENU_TYPES.Campaign;
	}
	
	canHandle(context: NavigationContext): boolean {
		return context.menuType === MENU_TYPES.Campaign;
	}
	
	getNavigationItems(context: NavigationContext, data: {
		campaignId?: string;
		campaign?: any;
		donateMenu?: any;
		searchResults?: any;
		selectedCampaign?: PublishedCampaign | null;
	}): NavigationItem[] {
		if (data.campaignId && data.campaign) {
			return NavigationTransformService.transformDesignations(data.campaign.designations || []);
		}
		
		if (context.filters.campaignId && context.filters.selectedCampaign) {
			return NavigationTransformService.transformDesignations(context.filters.selectedCampaign.designations || []);
		}
		
		if (context.currentLevel === NAVIGATION_LEVELS.MENU && data.donateMenu) {
			const campaignEntries = data.donateMenu.entries?.filter(
				(entry: any) => entry.type === DonateMenuEntryType.Campaign
			) || [];
			return NavigationTransformService.transformDonateMenuEntries({ entries: campaignEntries });
		}
		
		if (context.path.length > 0) {
			const lastPathItem = context.path[context.path.length - 1];
			if (lastPathItem.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && lastPathItem.data?.campaign) {
				return NavigationTransformService.transformDesignations(lastPathItem.data.campaign.designations || []);
			}
		}
		
		return [];
	}
	
	handleItemSelect(item: NavigationItem, context: NavigationContext): NavigationContext {
		if (item.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && item.data?.type === DonateMenuEntryType.Campaign) {
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
				path: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY,
					data: item.data
				}],
				filters: {
					...context.filters,
					selectedCampaign: item.data.campaign,
					campaignId: item.data.campaign?.id
				}
			};
		}
		
		if (item.type === NAVIGATION_ITEM_TYPES.DESIGNATION) {
			// Check if we're already at DESIGNATION_SELECTED level (changing selection)
			const isChangingSelection = context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED;
			
			// If changing selection, replace the last path item; otherwise, add new one
			const newPath = isChangingSelection 
				? [...context.path.slice(0, -1), {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}]
				: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}];
			
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATION_SELECTED,
				path: newPath,
				filters: {
					...context.filters,
					selectedDesignation: item.data
				}
			};
		}
		
		return context;
	}
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null {
		if (context.path.length > 0) {
			const newPath = context.path.slice(0, -1);
			let newLevel;
			if (newPath.length === 0) {
				newLevel = NAVIGATION_LEVELS.MENU;
			} else if (context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED) {
				newLevel = NAVIGATION_LEVELS.DESIGNATIONS;
			} else {
				newLevel = NAVIGATION_LEVELS.DESIGNATIONS;
			}
			
			return {
				...context,
				path: newPath,
				currentLevel: newLevel,
				filters: {
					...context.filters,
					selectedDesignation: context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED ? null : context.filters.selectedDesignation
				}
			};
		}
		
		return null;
	}
}


export class CampaignsListHandler implements NavigationHandler {
	
	getMenuType(): string {
		return MENU_TYPES.CampaignsList;
	}
	
	canHandle(context: NavigationContext): boolean {
		return context.menuType === MENU_TYPES.CampaignsList;
	}
	
	getNavigationItems(context: NavigationContext, data: {
		campaignId?: string;
		campaign?: any;
    selectedCampaign?: PublishedCampaign;
		donateMenu?: any;
		searchResults?: any;
	}): NavigationItem[] {
		if (context.filters.campaignId && data.selectedCampaign) {
			return NavigationTransformService.transformDesignations(data.selectedCampaign.designations || []);
		}
		
		if (context.currentLevel === NAVIGATION_LEVELS.MENU && data.donateMenu) {
			const campaignsListEntries = data.donateMenu.entries?.filter(
				(entry: any) => entry.type === DonateMenuEntryType.CampaignsList
			) || [];
			return NavigationTransformService.transformDonateMenuEntries({ entries: campaignsListEntries });
		}
		
		if (context.path.length > 0) {
			const lastPathItem = context.path[context.path.length - 1];
			if (lastPathItem.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && lastPathItem.data?.campaignsList?.campaigns) {
				return NavigationTransformService.transformCampaignsList(lastPathItem.data.campaignsList.campaigns);
			}
		}
		
		return [];
	}
	
	handleItemSelect(item: NavigationItem, context: NavigationContext): NavigationContext {
		if (item.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && item.data?.type === DonateMenuEntryType.CampaignsList) {
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.MENU_ENTRY,
				path: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY,
					data: item.data
				}]
			};
		}
		
		if (item.type === NAVIGATION_ITEM_TYPES.CAMPAIGN_SUMMARY) {
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
				path: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.CAMPAIGN,
					data: item.data
				}],
				filters: {
					...context.filters,
					campaignId: item.data.id
				}
			};
		}
		
		if (item.type === NAVIGATION_ITEM_TYPES.DESIGNATION) {
			// Check if we're already at DESIGNATION_SELECTED level (changing selection)
			const isChangingSelection = context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED;
			
			// If changing selection, replace the last path item; otherwise, add new one
			const newPath = isChangingSelection 
				? [...context.path.slice(0, -1), {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}]
				: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}];
			
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATION_SELECTED,
				path: newPath,
				filters: {
					...context.filters,
					selectedDesignation: item.data
				}
			};
		}
		
		return context;
	}
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null {
		if (context.path.length > 0) {
			const newPath = context.path.slice(0, -1);
			let newLevel;
			if (newPath.length === 0) {
				newLevel = NAVIGATION_LEVELS.MENU;
			} else if (context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED) {
				newLevel = NAVIGATION_LEVELS.DESIGNATIONS;
			} else {
				newLevel = NAVIGATION_LEVELS.MENU_ENTRY;
			}
			
			const newContext = {
				...context,
				path: newPath,
				currentLevel: newLevel
			};
			
			if (newPath.length === 0) {
				newContext.filters = {
					...context.filters,
					selectedCampaign: null,
					selectedDesignation: null,
					campaignId: undefined
				};
			} else if (context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED) {
				newContext.filters = {
					...context.filters,
					selectedDesignation: null
				};
			} else {
				newContext.filters = {
					...context.filters,
					selectedDesignation: null
				};
			}
			
			return newContext;
		}
		
		return null;
	}
}


export class FundDimensionSearchHandler implements NavigationHandler {
	
	getMenuType(): string {
		return MENU_TYPES.FundDimensionSearch;
	}
	
	canHandle(context: NavigationContext): boolean {
		return context.menuType === MENU_TYPES.FundDimensionSearch;
	}
	
	getNavigationItems(context: NavigationContext, data: {
		campaignId?: string;
		campaign?: any;
		donateMenu?: any;
		searchResults?: any;
		selectedCampaign?: PublishedCampaign | null;
	}): NavigationItem[] {
		if (data.searchResults?.items && Array.isArray(data.searchResults?.items)) {
			const results = data.searchResults.items.map((item: any) => ({
				designation: item.data
			}));
			return NavigationTransformService.transformSearchResults(results);
		}
		
		if (context.currentLevel === NAVIGATION_LEVELS.MENU && data.donateMenu) {
			const fundDimensionEntries = data.donateMenu.entries?.filter(
				(entry: any) => entry.type === DonateMenuEntryType.FundDimensionSearch
			) || [];
			return NavigationTransformService.transformDonateMenuEntries({ entries: fundDimensionEntries });
		}
		
		if (context.path.length > 0) {
			const lastPathItem = context.path[context.path.length - 1];
			if (lastPathItem.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && lastPathItem.data?.fundDimensionSearch) {
				const dimensionSearch = lastPathItem.data.fundDimensionSearch;
				return NavigationTransformService.transformDimensionValues(
					dimensionSearch.dimensionNumber || 1,
					dimensionSearch.values || []
				);
			}
		}
		
		return [];
	}
	
	handleItemSelect(item: NavigationItem, context: NavigationContext, services?: NavigationServices): NavigationContext | Promise<NavigationContext> {
		if (item.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY && item.data?.type === DonateMenuEntryType.FundDimensionSearch) {
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DIMENSION,
				path: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY,
					data: item.data
				}]
			};
		}
		
		if (item.type === NAVIGATION_ITEM_TYPES.DIMENSION_VALUE) {
			const newContext = {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
				path: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DIMENSION,
					data: item.data
				}],
				filters: {
					...context.filters,
					selectedDimension: item.data,
					dimensionValue: item.data.value
				}
			};
			
			if (services?.search) {
				const searchCriteria = {
					types: [PublishedFileKind.Designation],
					fundDimensions: [{
						dimensionNumber: item.data.dimensionNumber || 1,
						value: item.data.value
					}]
				};
				
				return services.search(searchCriteria).then(() => newContext);
			}
			
			return newContext;
		}
		
		if (item.type === NAVIGATION_ITEM_TYPES.DESIGNATION) {
			// Check if we're already at DESIGNATION_SELECTED level (changing selection)
			const isChangingSelection = context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED;
			
			// If changing selection, replace the last path item; otherwise, add new one
			const newPath = isChangingSelection 
				? [...context.path.slice(0, -1), {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}]
				: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}];
			
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATION_SELECTED,
				path: newPath,
				filters: {
					...context.filters,
					selectedDesignation: item.data
				}
			};
		}
		
		return context;
	}
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null {
		if (context.path.length > 0) {
			const newPath = context.path.slice(0, -1);
			let newLevel;
			if (newPath.length === 0) {
				newLevel = NAVIGATION_LEVELS.MENU;
			} else if (context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED) {
				newLevel = NAVIGATION_LEVELS.DESIGNATIONS;
			} else {
				newLevel = NAVIGATION_LEVELS.DIMENSION;
			}
			
			return {
				...context,
				path: newPath,
				currentLevel: newLevel,
				filters: {
					...context.filters,
					selectedDesignation: context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED ? null : context.filters.selectedDesignation,
					selectedDimension: newPath.length === 0 ? null : context.filters.selectedDimension
				}
			};
		}
		
		return null;
	}
}

export class SearchHandler implements NavigationHandler {
	
	getMenuType(): string {
		return MENU_TYPES.Search;
	}
	
	canHandle(context: NavigationContext): boolean {
		return context.menuType === MENU_TYPES.Search;
	}
	
	getNavigationItems(_context: NavigationContext, data: {
		campaignId?: string;
		campaign?: any;
		donateMenu?: any;
		searchResults?: any;
		selectedCampaign?: PublishedCampaign | null;
	}): NavigationItem[] {
		if (data.searchResults?.items && Array.isArray(data.searchResults.items)) {
			const results = data.searchResults.items.map((item: any) => ({
				designation: item.data
			}));
			
			return NavigationTransformService.transformSearchResults(results);
		}
		
		return [];
	}
	
	handleItemSelect(item: NavigationItem, context: NavigationContext): NavigationContext {
		if (item.type === NAVIGATION_ITEM_TYPES.DESIGNATION) {
			const isChangingSelection = context.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED;
			
			const newPath = isChangingSelection 
				? [...context.path.slice(0, -1), {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}]
				: [...context.path, {
					id: item.id,
					title: item.title,
					type: NAVIGATION_ITEM_TYPES.DESIGNATION,
					data: item.data
				}];
			
			return {
				...context,
				currentLevel: NAVIGATION_LEVELS.DESIGNATION_SELECTED,
				path: newPath,
				filters: {
					...context.filters,
					selectedDesignation: item.data
				}
			};
		}
		
		return context;
	}
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null {
		return {
			...context,
			menuType: context.filters.campaignId ? MENU_TYPES.Campaign : MENU_TYPES.CampaignsList,
			currentLevel: context.filters.campaignId ? NAVIGATION_LEVELS.DESIGNATIONS : NAVIGATION_LEVELS.MENU,
			filters: {
				...context.filters,
				searchValue: undefined,
				dimension1: undefined,
				dimension2: undefined,
				dimension3: undefined,
				dimension4: undefined,
				selectedDesignation: null
			}
		};
	}
}
