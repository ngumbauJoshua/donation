import { PublishedBuildConfiguration } from '@n3oltd/karakoram.connect.sdk.types';
import configuration from '@/configuration.json';
import type { Theme } from '@/utils/theme';

let currentTheme: Theme = configuration.themes.default as unknown as Theme;

export const themeService = {
  getTheme(): Theme {
    return currentTheme;
  },

  setTheme(themeName: string | undefined) {
    if (!themeName) {
      return currentTheme;
    }
    
    const themes = (configuration as PublishedBuildConfiguration).themes;

    if (themes?.additional?.[themeName]) {
      currentTheme = themes.additional[themeName] as Theme;
    }
  },
};

