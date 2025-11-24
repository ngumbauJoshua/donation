import React from 'react';
import { useGetFile } from '../../../hooks/useGetFile';
import { useSearch } from './useSearch';
import { useTranslation } from '@/i18n';
import { ToastService } from '../../../services/ToastService';
import { NavigationTransformService } from '../services/navigation/NavigationService';
import { navigationManager } from '../services/navigation/NavigationManager';
import { HistoryManager } from '../services/HistoryManager';
import { FIVE_SECONDS } from '@/common/constants/TimeDurations';
import { 
	NAVIGATION_LEVELS, 
	NavigationItem, 
	NavigationContext,
	MENU_TYPES,
	MenuType,
	NAVIGATION_ITEM_TYPES,
} from '../types/navigation.types';
import {
	PlatformsSubscriptionFile, 
	PublishedDonateMenu, 
	PublishedCampaign, 
	DonateMenuEntryType
} from '@n3oltd/karakoram.platforms.sdk.types';
import { PublishedFileKind } from "@n3oltd/karakoram.connect.sdk.types";
import { ConnectSearchCriteria } from '@n3oltd/karakoram.platforms.sdk.connect';
interface UseDesignationNavigationProps {
	campaignId?: string;
	onClose?: () => void;
}

interface DesignationNavigationResult {
	navigationContext: NavigationContext;
	currentItems: NavigationItem[];
	isLoading: boolean;
	isEmpty: boolean;
	handleItemSelect: (item: any) => void;
	handleBackNavigation: () => void;
	setNavigationContext: React.Dispatch<React.SetStateAction<NavigationContext>>;
	changeMenuType: (menuType: MenuType) => void;
	selectedCampaign: PublishedCampaign | null;
	performSearch: (criteria?: { text?: string; selectedDimension?: any }) => Promise<void>;
	searchResults: any;
	isSearching: boolean;
}

export function useDesignationNavigation({
	campaignId,
	onClose,
}: UseDesignationNavigationProps): DesignationNavigationResult {
	const { formatMessage } = useTranslation();
	
	const [navigationContext, setNavigationContext] = React.useState<NavigationContext>({
		currentLevel: NAVIGATION_LEVELS.MENU,
		path: [],
		filters: {},
		menuType: undefined,
		navigationStack: []
	});

	
	const { data: donateMenu, loading, error: donateMenuError } = useGetFile<PublishedDonateMenu>(
		PublishedFileKind.Subscription,
		PlatformsSubscriptionFile.DonateMenu,
		{ enabled: !campaignId }
	);

	const { data: campaign, loading: loadingCampaign, error: campaignError } = useGetFile<PublishedCampaign>(
		PublishedFileKind.Campaign,
		campaignId || '',
		{ enabled: !!campaignId }
	);

	const { data: selectedCampaign, loading: loadingSelectedCampaign, error: selectedCampaignError } = useGetFile<PublishedCampaign>(
		PublishedFileKind.Campaign,
		navigationContext.filters.campaignId || '',
		{ enabled: !!navigationContext.filters.campaignId }
	);

	const { data: searchResults, isLoading: isSearching, search, clearResults } = useSearch();

	const performSearch = async (criteria?: { text?: string; selectedDimension?: any }) => {
		const searchCriteria: ConnectSearchCriteria = {
			collections: [PublishedFileKind.Designation]
		};

		// Use provided text or current search value from filters
		const searchText = criteria?.text || navigationContext.filters.searchValue;
		if (searchText?.trim()) {
			searchCriteria.text = searchText;
		}
		
		// Handle multiple dimensions from navigation context
		const fundDimensions = [];
		const filters = criteria?.selectedDimension || navigationContext.filters;
		
		if (filters.dimension1) {
			fundDimensions.push({ dimensionNumber: 1, value: filters.dimension1 });
		}
		if (filters.dimension2) {
			fundDimensions.push({ dimensionNumber: 2, value: filters.dimension2 });
		}
		if (filters.dimension3) {
			fundDimensions.push({ dimensionNumber: 3, value: filters.dimension3 });
		}
		if (filters.dimension4) {
			fundDimensions.push({ dimensionNumber: 4, value: filters.dimension4 });
		}
		
		// Fallback to selectedDimension if provided (for backward compatibility)
		const dimension = navigationContext.filters.selectedDimension;
		if (dimension && fundDimensions.length === 0) {
			fundDimensions.push({
				dimensionNumber: dimension.dimensionNumber,
				value: dimension.value
			});
		}
		
		if (fundDimensions.length > 0) {
			searchCriteria.fundDimensions = fundDimensions;
		}
		
		if (searchCriteria.text || searchCriteria.fundDimensions) {
			await search(searchCriteria);
		}
	};

	React.useEffect(() => {
		if (campaignId && campaign && !navigationContext.menuType) {
			setNavigationContext({
				currentLevel: NAVIGATION_LEVELS.DESIGNATIONS,
				path: [],
				filters: { campaignId },
				menuType: MENU_TYPES.Campaign,
				navigationStack: []
			});
		}
	}, [campaignId, campaign, navigationContext.menuType]);

	React.useEffect(() => {
		if (donateMenuError) {
			ToastService.error(formatMessage('donation.form.search.loading.error'), {
				duration: FIVE_SECONDS
			});
		}
		if (campaignError) {
			ToastService.error(formatMessage('donation.form.search.loading.error'), {
				duration: FIVE_SECONDS
			});
		}
		if (selectedCampaignError) {
			ToastService.error(formatMessage('donation.form.search.loading.error'), {
				duration: FIVE_SECONDS
			});
		}
	}, [donateMenuError, campaignError, selectedCampaignError, formatMessage]);

	const getCurrentItems = (): NavigationItem[] => {
		if (!navigationContext.menuType && navigationContext.currentLevel === NAVIGATION_LEVELS.MENU) {
			if (donateMenu) {
				return NavigationTransformService.transformDonateMenuEntries(donateMenu);
			}
			return [];
		}
		
		if (navigationContext.menuType) {
			const services = {
				search: search
			};
			
			return navigationManager.getNavigationItems(navigationContext, {
				campaignId,
				campaign,
				donateMenu,
				searchResults,
				selectedCampaign
			}, services);
		}
		
		return [];
	};

	const currentItems = getCurrentItems();

	const isLoading = (loading && (!donateMenu && !campaign)) || loadingSelectedCampaign || isSearching || loadingCampaign;
	const isEmpty = currentItems.length === 0 && !isLoading;

	const handleItemSelect = (item: any) => {
		if (!navigationContext.menuType && item.type === NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY) {
			const entryType = item.data?.type;
			let menuType: MenuType | undefined;
			
			switch (entryType) {
				case DonateMenuEntryType.Campaign:
					menuType = MENU_TYPES.Campaign;
					break;
				case DonateMenuEntryType.CampaignsList:
					menuType = MENU_TYPES.CampaignsList;
					break;
				case DonateMenuEntryType.FundDimensionSearch:
					menuType = MENU_TYPES.FundDimensionSearch;
					break;
				default:
					console.warn(`Unknown donate menu entry type: ${entryType}`);
					return;
			}
			
			const contextWithStack = HistoryManager.push(
				navigationContext,
				menuType,
				NAVIGATION_LEVELS.MENU
			);
			
			const newContext = navigationManager.handleItemSelect(item, contextWithStack);
			setNavigationContext(newContext as NavigationContext);
			return;
		}
		
		if (navigationContext.menuType) {
			const isChangingDesignationSelection = 
				item.type === NAVIGATION_ITEM_TYPES.DESIGNATION && 
				navigationContext.currentLevel === NAVIGATION_LEVELS.DESIGNATION_SELECTED;
			
			let contextToUse = navigationContext;
			
			if (!isChangingDesignationSelection) {
				contextToUse = HistoryManager.push(
					navigationContext,
					navigationContext.menuType,
					navigationContext.currentLevel
				);
			}
			
			const services = {
				search: search
			};
			
			const newContextOrPromise = navigationManager.handleItemSelect(item, contextToUse, services);
			
			if (newContextOrPromise instanceof Promise) {
				newContextOrPromise.then((newContext) => {
					setNavigationContext(newContext);
				});
			} else {
				setNavigationContext(newContextOrPromise);
			}
		}
	};

	const handleBackNavigation = () => {
		if (navigationContext.menuType) {
			if (HistoryManager.canGoBack(navigationContext)) {
				const previousContext = HistoryManager.pop(navigationContext);
				if (previousContext) {
					if (navigationContext.currentLevel === NAVIGATION_LEVELS.DESIGNATIONS && 
						previousContext.currentLevel === NAVIGATION_LEVELS.DIMENSION &&
						navigationContext.menuType === MENU_TYPES.FundDimensionSearch) {
						clearResults();
					}
					setNavigationContext(previousContext);
					return;
				}
			}
			
			const newContext = navigationManager.handleBackNavigation(navigationContext);
			
			if (newContext) {
				if (navigationContext.currentLevel === NAVIGATION_LEVELS.DESIGNATIONS && 
					newContext.currentLevel === NAVIGATION_LEVELS.DIMENSION &&
					navigationContext.menuType === MENU_TYPES.FundDimensionSearch) {
					clearResults();
				}
				
				if (newContext.path.length === 0) {
					setNavigationContext({
						...newContext,
						menuType: undefined,
						currentLevel: NAVIGATION_LEVELS.MENU,
						navigationStack: []
					});
				} else {
					setNavigationContext(newContext);
				}
			} else {
				if (navigationContext.path.length > 0) {
					setNavigationContext({
						currentLevel: NAVIGATION_LEVELS.MENU,
						path: [],
						filters: {},
						menuType: undefined,
						navigationStack: []
					});
				} else {
					onClose?.();
				}
			}
		} else {
			onClose?.();
		}
	};

	const changeMenuType = (menuType: MenuType) => {
		setNavigationContext({
			currentLevel: NAVIGATION_LEVELS.MENU,
			path: [],
			filters: {},
			menuType: menuType,
			navigationStack: []
		});
	};

	return {
		navigationContext,
		currentItems,
		isLoading,
		isEmpty,
		handleItemSelect,
		handleBackNavigation,
		setNavigationContext,
		changeMenuType,
		selectedCampaign,
		performSearch,
		searchResults,
		isSearching
	};
}
