import React from 'react';
import { useTranslation } from '@/i18n';
import { getRuntimeConfig, RuntimeConfig } from '@/config/configLoader';

interface UseRuntimeConfigResult {
  config: RuntimeConfig | null;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

export function useRuntimeConfig(): UseRuntimeConfigResult {
  const [config, setConfig] = React.useState<RuntimeConfig | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const {formatMessage} = useTranslation()

  const load = React.useCallback(() => {
    setLoading(true);
    setError(null);

    getRuntimeConfig()
      .then((cfg) => {
        setConfig(cfg);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(formatMessage('config.error')));
        setConfig(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formatMessage]);

  React.useEffect(() => {
    load();
  }, [load]);

  return { config, loading, error, reload: load };
}
