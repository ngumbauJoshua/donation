import { useState, useEffect } from 'react';
import { WidgetCommService, WidgetCommConfig } from '@/services/WidgetCommService'; // Adjust path

/**
 * Hook to get the shared singleton instance of WidgetCommService.
 * Ensures the instance is initialized with the required configuration.
 *
 * @param {WidgetCommConfig} [config={}] - Configuration needed by this component.
 *                                       Will be merged with existing config if instance already exists.
 * @returns {WidgetCommService} The shared WidgetCommService instance.
 */

export const useSharedCrossWidgetComm = (config: WidgetCommConfig = {}): WidgetCommService => {
  const [commInstance] = useState(() => WidgetCommService.getInstance(config));

  // Optional: If a component specifically needs to ensure certain origins
  // are allowed *after* initial mount, it could do this:
  useEffect(() => {
    if (config.allowedOrigins) {
       commInstance.addAllowedOrigins(config.allowedOrigins);
    }
  }, [commInstance, config.allowedOrigins]); // Be careful with dependency array if origins change

  return commInstance;
};