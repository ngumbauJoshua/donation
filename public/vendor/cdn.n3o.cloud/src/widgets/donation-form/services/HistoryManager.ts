import { MENU_TYPES, MenuType, NavigationContext, NavigationLevel, NavigationPathItem, NavigationStackItem } from "../types/navigation.types";

export class HistoryManager {

	static push(context: NavigationContext, menuType?: MenuType, level?: NavigationLevel, pathItem?: NavigationPathItem): NavigationContext {
		const stackItem: NavigationStackItem = {
			menuType: context.menuType,
			level: context.currentLevel,
			pathItem: pathItem,
			filters: { ...context.filters }
		};
		
		return {
			...context,
			navigationStack: [...context.navigationStack, stackItem],
			menuType: menuType || context.menuType,
			currentLevel: level || context.currentLevel
		};
	}
	
	static pop(context: NavigationContext): NavigationContext | null {
		if (context.navigationStack.length === 0) {
			return null;
		}
		
		const previousState = context.navigationStack[context.navigationStack.length - 1];
		const newStack = context.navigationStack.slice(0, -1);
		
		return {
			...context,
			navigationStack: newStack,
			menuType: previousState.menuType,
			currentLevel: previousState.level,
			filters: { ...previousState.filters },
			path: context.path.slice(0, -1)
		};
	}

	static getMenuType(context: NavigationContext): MenuType {
    return context.menuType || MENU_TYPES.Campaign;
  }
	
	static canGoBack(context: NavigationContext): boolean {
		return context.navigationStack.length > 0;
	}
}