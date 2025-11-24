import React from "react";
import { PublishedFileKind } from "@n3oltd/karakoram.connect.sdk.types";
import { PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";
import { loadCdnFile } from "@/api/cdn/cdnFetch";
import { cdnConfig } from "@/api/common/config/CdnConfig";
import { useEnvironmentContext } from "@/api/common/contexts/EnvironmentProvider";
import { getSubscriptionCode } from "@/utils/env";

interface UseDesignationByIdProps {
  designationIds: string[];
  enabled?: boolean;
}

const subscriptionId = getSubscriptionCode();

export function useDesignationById({ designationIds, enabled = true }: UseDesignationByIdProps) {
  const env = useEnvironmentContext();
  const { host } = cdnConfig[env.environment];

  const [designations, setDesignations] = React.useState<PublishedDesignation[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const designationIdsString = React.useMemo(() => 
    JSON.stringify(designationIds.sort()
  ), [designationIds]);

  React.useEffect(() => {
    let isMounted = true;

    if (!enabled || designationIds.length === 0) {
      setIsLoading(false);
      setHasError(false);
      setError(null);
      setDesignations([]);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setError(null);

    const fetchDesignations = async () => {
      const promises = designationIds.map((id) => 
        loadCdnFile(host, subscriptionId, PublishedFileKind.Designation, id)
      );

      const results = await Promise.allSettled(promises);

      if (isMounted) {
        const fulfilledData = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value as PublishedDesignation);

        setDesignations(fulfilledData);
        setHasError(fulfilledData.length === 0);
        setIsLoading(false);
      }
    };

    fetchDesignations();

    return () => {
      isMounted = false;
    };
  }, [host, designationIdsString, enabled]);

  return {
    designations,
    isLoading,
    hasError,
    error
  };
}