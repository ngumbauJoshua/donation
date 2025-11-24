import React from "react";
import { PublishedFileKind, ConnectSubscriptionFile } from "@n3oltd/karakoram.connect.sdk.types";
import { loadCdnFile } from "@/api/cdn/cdnFetch";
import { cdnConfig } from "@/api/common/config/CdnConfig";
import { useEnvironmentContext } from "@/api/common/contexts/EnvironmentProvider";
import { getSubscriptionCode } from "@/utils/env";

interface UseGetFileResult<T = any> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseGetFileOptions {
  enabled?: boolean;
}

const subscriptionId = getSubscriptionCode();

export function useGetFile<T = any>(
  fileKind: PublishedFileKind | string,
  file: ConnectSubscriptionFile | string,
  options: UseGetFileOptions = {}
): UseGetFileResult<T> {
  const { enabled = true } = options;
  const env = useEnvironmentContext();
  const { host } = cdnConfig[env.environment];

  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    if (!enabled) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadCdnFile(host, subscriptionId, fileKind, file)
      .then((result: T) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err);
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };

  }, [host, fileKind, file, enabled]); // Added enabled to dependency array

  return { data, loading, error };
}
