import React from "react";
import { PublishedBeneficiary } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { loadCdnFile } from "@/api/cdn/cdnFetch";
import { cdnConfig } from "@/api/common/config/CdnConfig";
import { useEnvironmentContext } from "@/api/common/contexts/EnvironmentProvider";
import { getSubscriptionCode } from "@/utils/env";


interface Result {
  data: PublishedBeneficiary[] | null;
  loading: boolean;
  error: Error | null;
}

interface Options {
  enabled?: boolean;
}

const subscriptionId = getSubscriptionCode();

export function useGetAlternativeBeneficiaries(
  schemeId: string,
  alternativeIds: string[],
  options: Options = {},
): Result {
  const { enabled = true } = options;
  const env = useEnvironmentContext();
  const { host } = cdnConfig[env.environment];

  const [data, setData] = React.useState<PublishedBeneficiary[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    if (!enabled || alternativeIds.length === 0) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchBeneficiaries = async () => {
      const promises = alternativeIds.map((id) => loadCdnFile(host, subscriptionId, `${schemeId}/beneficiaries`, id));

      const results = await Promise.allSettled(promises);

      if (isMounted) {
        const fulfilledData = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value as PublishedBeneficiary);

        setData(fulfilledData);

        setLoading(false);
      }
    };

    fetchBeneficiaries();

    return () => {
      isMounted = false;
    };
  }, [host, schemeId, alternativeIds, enabled]);

  return { data, loading, error };
}