import { WidgetCommService } from './WidgetCommService';
import { ElementConfig, ElementType } from '@/types/element-config';

export class ElementConfigRouter {
  private static instance: ElementConfigRouter;
  private configStore = new Map<string, ElementConfig>();
  private eventBus: WidgetCommService;
  
  private constructor() {
    this.eventBus = WidgetCommService.getInstance();
  }
  
  public static getInstance(): ElementConfigRouter {
    if (!ElementConfigRouter.instance) {
      ElementConfigRouter.instance = new ElementConfigRouter();
    }
    return ElementConfigRouter.instance;
  }
  
  public routeConfig(
    targetElementType: ElementType,
    config: ElementConfig
  ): string {
    const configId = this.generateConfigId(targetElementType);
    this.configStore.set(configId, config);
    
    this.eventBus.emit(`n3o:${targetElementType}:config:received`, {
      configId,
      config
    });
    
    return configId;
  }
  
  public getConfig(configId: string): ElementConfig | undefined {
    return this.configStore.get(configId);
  }
  
  public clearConfig(configId: string): void {
    this.configStore.delete(configId);
  }
  
  private generateConfigId(target: ElementType): string {
    return `${target}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
