import {
	CampaignHandler,
	CampaignsListHandler,
	FundDimensionSearchHandler,
	SearchHandler
} from './NavigationHandlers';
import {
	NavigationHandler,
	NavigationContext,
	NavigationItem,
	NavigationServices,
	MENU_TYPES
} from '../../types/navigation.types';
import { PublishedCampaign } from '@n3oltd/karakoram.platforms.sdk.types';
import { HistoryManager } from '../HistoryManager';


export class NavigationManager {
	private handlers: Map<string, NavigationHandler> = new Map();
	
	constructor() {
		this.registerHandler(new CampaignHandler());
		this.registerHandler(new CampaignsListHandler());
		this.registerHandler(new FundDimensionSearchHandler());
		this.registerHandler(new SearchHandler());
	}
	
	registerHandler(handler: NavigationHandler): void {
		this.handlers.set(handler.getMenuType(), handler);
	}
	
	getHandler(context: NavigationContext): NavigationHandler {
		const menuType = HistoryManager.getMenuType(context);
		const handler = this.handlers.get(menuType);
		
		if (!handler) {
			const fallbackHandler = this.handlers.get(MENU_TYPES.Campaign);
			if (!fallbackHandler) {
				throw new Error(`No navigation handler available for menu type: ${menuType}`);
			}
			
			return fallbackHandler;
		}
		
		return handler;
	}
	
	getNavigationItems(context: NavigationContext, data: {
		campaignId?: string;
		campaign?: PublishedCampaign | null;
		donateMenu?: any;
		searchResults?: any;
		selectedCampaign?: PublishedCampaign | null;
	}, services?: NavigationServices): NavigationItem[] {
		const handler = this.getHandler(context);
		return handler.getNavigationItems(context, data, services);
	}
	
	handleItemSelect(
		item: NavigationItem, 
		context: NavigationContext, 
		services?: NavigationServices
	): NavigationContext | Promise<NavigationContext> {
		const handler = this.getHandler(context);
		return handler.handleItemSelect(item, context, services);
	}
	
	handleBackNavigation(context: NavigationContext): NavigationContext | null {
		const handler = this.getHandler(context);
		return handler.handleBackNavigation(context);
	}
	
	getAvailableMenuTypes(): string[] {
		return Array.from(this.handlers.keys());
	}
	
	isMenuTypeSupported(menuType: string): boolean {
		return this.handlers.has(menuType);
	}
}

export const navigationManager = new NavigationManager();
