import { DonateMenuEntryType, DesignationType, PublishedCampaign } from '@n3oltd/karakoram.platforms.sdk.types';


export const NAVIGATION_LEVELS = {
	MENU: 'menu',
	MENU_ENTRY: 'menuEntry',
	DIMENSION: 'dimension', 
	DESIGNATIONS: 'designations',
	DESIGNATION_SELECTED: 'designationSelected'
} as const;

export type NavigationLevel = typeof NAVIGATION_LEVELS[keyof typeof NAVIGATION_LEVELS];

export const NAVIGATION_ITEM_TYPES = {
	DESIGNATION: 'designation',
	CAMPAIGN_SUMMARY: 'campaignSummary',
	DIMENSION_VALUE: 'dimensionValue',
	DONATE_MENU_ENTRY: 'donateMenuEntry',
	CAMPAIGN: 'campaign',
	DIMENSION: 'dimension'
} as const;

export type NavigationItemType = typeof NAVIGATION_ITEM_TYPES[keyof typeof NAVIGATION_ITEM_TYPES];

export interface NavigationItem {
	id: string;
	title: string;
	type: NavigationItemType;
	description?: string;
	image?: string;
	hasChildren: boolean;
	isNavigable: boolean;
	data: any;
}

export interface DesignationNavigationItem extends NavigationItem {
	type: typeof NAVIGATION_ITEM_TYPES.DESIGNATION;
	data: any;
}

export interface CampaignSummaryNavigationItem extends NavigationItem {
	type: typeof NAVIGATION_ITEM_TYPES.CAMPAIGN_SUMMARY;
	data: any;
}

export interface DimensionValueNavigationItem extends NavigationItem {
	type: typeof NAVIGATION_ITEM_TYPES.DIMENSION_VALUE;
	data: {
		dimensionNumber: number;
		value: string;
	};
}

export interface DonateMenuEntryNavigationItem extends NavigationItem {
	type: typeof NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY;
	data: any;
}

export interface NavigationPathItem {
	id: string;
	type: string;
	title: string;
	data: any;
}

export interface NavigationStackItem {
	menuType?: MenuType;
	level: NavigationLevel;
	pathItem?: NavigationPathItem;
	filters: Record<string, any>;
}

export interface NavigationContext {
	currentLevel: NavigationLevel;
	path: NavigationPathItem[]; 
	filters: Record<string, any>; 
	searchResults?: any; 
	menuType?: MenuType; 
	navigationStack: NavigationStackItem[];
}

export interface NavigationAction {
	type: 'navigate' | 'select' | 'search' | 'back' | 'close';
	payload?: any;
}

export const DonateMenuTypePredicates = {
	isCampaign: (type: DonateMenuEntryType): boolean => type === DonateMenuEntryType.Campaign,
	isCampaignsList: (type: DonateMenuEntryType): boolean => type === DonateMenuEntryType.CampaignsList,
	isFundDimensionSearch: (type: DonateMenuEntryType): boolean => type === DonateMenuEntryType.FundDimensionSearch
} as const;

export const DesignationTypePredicates = {
	isFund: (type: DesignationType): boolean => type === DesignationType.Fund,
	isFeedback: (type: DesignationType): boolean => type === DesignationType.Feedback,
	isSponsorship: (type: DesignationType): boolean => type === DesignationType.Sponsorship
} as const;

export interface NavigationServices {
	search?: (criteria: any) => Promise<any>;
}

export interface NavigationHandler {
	getNavigationItems(context: NavigationContext, data: {
		campaignId?: string;
		campaign?: PublishedCampaign | null;
		donateMenu?: any;
		searchResults?: any;
		selectedCampaign?: PublishedCampaign | null;
	}, services?: NavigationServices): NavigationItem[];
	
	handleItemSelect(
		item: NavigationItem, 
		context: NavigationContext, 
		services?: NavigationServices
	): NavigationContext | Promise<NavigationContext>;
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null;
	
	canHandle(context: NavigationContext): boolean;
	
	getMenuType(): string;
}

export const MENU_TYPES = {
	...DonateMenuEntryType,
	Search: 'Search' as const
};

export type MenuType = typeof MENU_TYPES[keyof typeof MENU_TYPES];
