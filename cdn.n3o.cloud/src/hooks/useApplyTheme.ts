import React from 'react';
import { applyTheme, Theme } from '@utils/theme';
import configuration from '@/configuration.json';
import { PublishedBuildConfiguration } from "@n3oltd/karakoram.connect.sdk.types";

export function useApplyTheme(themeName?: string | null) {

  React.useEffect(() => {
    if (!themeName) {
      return;
    }
    
    const themes = (configuration as PublishedBuildConfiguration).themes;

    if (themes?.additional?.[themeName]) {
      applyTheme(themes.additional[themeName] as Theme);
    }

  }, [themeName]);
}