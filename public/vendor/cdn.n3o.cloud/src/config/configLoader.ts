import { fetchData } from "@/api/cdn/cdnFetch";
import { Environment } from "@/api/common/contexts/EnvironmentProvider";

export interface RuntimeConfig {
  env: Environment;
}

let cachedConfig: RuntimeConfig | null = null;
let loadPromise: Promise<RuntimeConfig> | null = null;

export const getRuntimeConfig = (): Promise<RuntimeConfig> => {
  if (cachedConfig) return Promise.resolve(cachedConfig);
  if (loadPromise) return loadPromise;

  loadPromise = loadConfigFromServer();

  return loadPromise;
};

const loadConfigFromServer = async (): Promise<RuntimeConfig> => {
  try {
    const scriptUrl = new URL(import.meta.url);
    const configUrl = new URL('config.json', scriptUrl.href.substring(0, scriptUrl.href.lastIndexOf('/') + 1));
    
    const res = await fetchData<any>(configUrl.href);

    const config: RuntimeConfig = {
      env: res.env
    };

    cachedConfig = config;
    return config;
  } catch (err) {
    console.error('[Config Loader] Error loading runtime config:', err);

    throw err;
  }
};
