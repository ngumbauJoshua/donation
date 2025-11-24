import { useState, useEffect, useCallback } from 'react';
import { useSharedCrossWidgetComm } from '@/widgets/hooks/useSharedCrossWidgetComm';
import { ElementConfigRouter } from '@/services/ElementConfigRouter';
import { ElementConfig, ElementType } from '@/types/element-config';

export interface UseElementConfigOptions {
  configId?: string;
  elementType?: ElementType;
  autoListen?: boolean;
}

export interface UseElementConfigReturn {
  config: ElementConfig | undefined;
  configId: string | undefined;
  isLoading: boolean;
  updateConfigId: (newConfigId: string) => void;
  clearConfig: () => void;
  refreshConfig: () => void;
}

export function useElementConfig(options: UseElementConfigOptions = {}): UseElementConfigReturn {
  const { configId: initialConfigId, elementType, autoListen = true } = options;
  
  const [config, setConfig] = useState<ElementConfig | undefined>();
  const [configId, setConfigId] = useState<string | undefined>(initialConfigId);
  const [isLoading, setIsLoading] = useState(false);
  
  const eventBus = useSharedCrossWidgetComm();
  const configRouter = ElementConfigRouter.getInstance();

  const retrieveConfig = useCallback((id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    
    try {
      const retrievedConfig = configRouter.getConfig(id);
      if (retrievedConfig) {
        setConfig(retrievedConfig);
      } else {
        setConfig(undefined);
      }
    } catch {
      setConfig(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [configRouter]);

  const updateConfigId = useCallback((newConfigId: string) => {
    setConfigId(newConfigId);
    if (newConfigId) {
      retrieveConfig(newConfigId);
    } else {
      setConfig(undefined);
    }
  }, [retrieveConfig]);

  const clearConfig = useCallback(() => {
    setConfig(undefined);
    setConfigId(undefined);
    setIsLoading(false);
  }, []);

  const refreshConfig = useCallback(() => {
    if (configId) {
      retrieveConfig(configId);
    }
  }, [configId, retrieveConfig]);

  useEffect(() => {
    if (!autoListen || !elementType) return;

    const eventName = `n3o:${elementType}:config:received`;
    
    const unsubscribe = eventBus.on(eventName, (payload: { configId: string; config: ElementConfig }) => {
      if (payload?.configId && payload?.config) {
        setConfigId(payload.configId);
        setConfig(payload.config);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [eventBus, elementType, autoListen]);

  useEffect(() => {
    if (initialConfigId) {
      retrieveConfig(initialConfigId);
    }
  }, [initialConfigId, retrieveConfig]);

  useEffect(() => {
    return () => {
      if (configId) {
        configRouter.clearConfig(configId);
      }
    };
  }, [configId, configRouter]);

  return {
    config,
    configId,
    isLoading,
    updateConfigId,
    clearConfig,
    refreshConfig
  };
}
