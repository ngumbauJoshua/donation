import { DonateMenuEntryType } from '@n3oltd/karakoram.platforms.sdk.types';
import { 
	NAVIGATION_ITEM_TYPES, 
	DonateMenuTypePredicates,
	DesignationNavigationItem,
	CampaignSummaryNavigationItem,
	DimensionValueNavigationItem,
	DonateMenuEntryNavigationItem,
} from '../../types/navigation.types';

export class NavigationTransformService {
	
	static transformDesignations(designations: any[]): DesignationNavigationItem[] {
		if (!designations || !Array.isArray(designations)) {
			return [];
		}

		return designations.map((designation) => ({
			id: designation.id || '',
			title: designation.name || '',
			type: NAVIGATION_ITEM_TYPES.DESIGNATION,
			image: designation.image,
			hasChildren: false, 
			isNavigable: false,
			data: designation
		}));
	}

	static transformDonateMenuEntries(donateMenu: any): DonateMenuEntryNavigationItem[] {
		if (!donateMenu?.entries || !Array.isArray(donateMenu.entries)) {
			return [];
		}

		return donateMenu.entries.map((entry: any) => ({
			id: `entry-${entry.type}-${Math.random().toString(36).substr(2, 9)}`,
			title: entry.name,
			type: NAVIGATION_ITEM_TYPES.DONATE_MENU_ENTRY,
			image: entry.icon,
			hasChildren: NavigationTransformService.entryHasChildren(entry.type),
			isNavigable: NavigationTransformService.entryIsNavigable(entry.type),
			data: entry
		}));
	}


	static transformCampaignsList(campaigns: any[]): CampaignSummaryNavigationItem[] {
		if (!campaigns || !Array.isArray(campaigns)) {
			return [];
		}

		return campaigns.map((campaign) => ({
			id: campaign.id || '',
			title: campaign.name || '',
			type: NAVIGATION_ITEM_TYPES.CAMPAIGN_SUMMARY,
			image: campaign.image,
			hasChildren: true, 
			isNavigable: true,
			data: campaign
		}));
	}

	static transformDimensionValues(
		dimensionNumber: number, 
		values: string[]
	): DimensionValueNavigationItem[] {
		if (!values || !Array.isArray(values)) {
			return [];
		}

		return values.map((value, index) => ({
			id: `dimension-${dimensionNumber}-${index}`,
			title: value,
			type: NAVIGATION_ITEM_TYPES.DIMENSION_VALUE,
			hasChildren: true,
			isNavigable: true,
			data: {
				dimensionNumber,
				value
			}
		}));
	}

	static transformSearchResults(searchResults: any[]): DesignationNavigationItem[] {
		if (!searchResults || !Array.isArray(searchResults)) {
			return [];
		}

		return searchResults
			.filter(result => result.designation)
			.map((result) => ({
				id: result.designation.id || '',
				title: result.designation.name || '',
				type: NAVIGATION_ITEM_TYPES.DESIGNATION,
				description: result.designation.shortDescription || '',
				image: result.designation.image,
				hasChildren: false,
				isNavigable: false,
				data: result.designation
			}));
	}

	private static entryHasChildren(type: DonateMenuEntryType): boolean {
		return DonateMenuTypePredicates.isCampaign(type) ||
			   DonateMenuTypePredicates.isCampaignsList(type) || 
			   DonateMenuTypePredicates.isFundDimensionSearch(type);
	}

	private static entryIsNavigable(type: DonateMenuEntryType): boolean {
		return DonateMenuTypePredicates.isCampaign(type) ||
			   DonateMenuTypePredicates.isCampaignsList(type) || 
			   DonateMenuTypePredicates.isFundDimensionSearch(type);
	}
}
