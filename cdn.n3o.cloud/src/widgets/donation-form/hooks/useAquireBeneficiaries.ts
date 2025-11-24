import React from "react";
import { _sponsorshipClient } from "@/api/common/clients/ConnectRestClients";
import { useApi } from "@/api/common/hooks/useApi";
import {
  ConnectAcquireBeneficiariesReq,
  ConnectAcquiredBeneficiariesRes,
} from "@n3oltd/karakoram.sponsorships.sdk.connect";

interface UseAquireBeneficiaryOptions {
  onSuccess?: (res: ConnectAcquiredBeneficiariesRes) => void;
  onError?: (err: any) => void;
  enabled?: boolean;
}

export function useAquireBeneficiaries(options?: UseAquireBeneficiaryOptions) {
  const { enabled = true } = options || {};
  const { execute, isLoading, error, data } = useApi<ConnectAcquiredBeneficiariesRes>({
    onSuccess: (res) => options?.onSuccess?.(res),
    onError: (err) => options?.onError?.(err),
  });

  const aquireBeneficiaries = React.useCallback(async (
    schemeId: string,
    beneficiaryIds: string[],
  ) => {
    if (!_sponsorshipClient || !enabled) return undefined;


    const request: ConnectAcquireBeneficiariesReq = {
      beneficiaryIds,
    };

    const res = await execute(_sponsorshipClient.acquireBeneficiaries(schemeId, request));

    return res;
  
  }, [execute, enabled]);

  return {
    aquireBeneficiaries,
    isLoading,
    error,
    data,
  } as {
    aquireBeneficiaries: (
      schemeId: string,
      beneficiaryIds: string[],
    ) => Promise<ConnectAcquiredBeneficiariesRes | undefined>;
    isLoading: boolean;
    error: any;
    data: ConnectAcquiredBeneficiariesRes | null;
  };
}