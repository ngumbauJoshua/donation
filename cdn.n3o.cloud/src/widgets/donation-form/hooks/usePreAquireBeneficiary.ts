import React from "react";
import { _sponsorshipClient } from "@/api/common/clients/ConnectRestClients";
import { useApi } from "@/api/common/hooks/useApi";
import {
  ConnectPreAcquireBeneficiariesReq,
  ConnectAvailableBeneficiariesRes,
} from "@n3oltd/karakoram.sponsorships.sdk.connect";

interface UsePreAcquireBeneficiaryOptions {
  onSuccess?: (res: ConnectAvailableBeneficiariesRes) => void;
  onError?: (err: any) => void;
  enabled?: boolean;
}

/**
 * usePreAquireBeneficiary
 *
 * Wraps the sponsorships `preAcquireBeneficiaries` endpoint. Uses the shared
 * `useApi` hook to manage loading/error/data state and exposes a `preAcquire`
 * function that callers can await.
 */
export function usePreAquireBeneficiary(options?: UsePreAcquireBeneficiaryOptions) {
  const { enabled = true } = options || {};
  const { execute, isLoading, error, data } = useApi<ConnectAvailableBeneficiariesRes>({
    onSuccess: (res) => options?.onSuccess?.(res),
    onError: (err) => options?.onError?.(err),
  });

  const preAcquire = React.useCallback(async (
    schemeId: string,
    req: ConnectPreAcquireBeneficiariesReq,
  ) => {
    if (!_sponsorshipClient || !enabled) return undefined;
      
    const res = await execute(_sponsorshipClient.preAcquireBeneficiaries(schemeId, req));

    return res;
  
  }, [execute, enabled]);

  return {
    preAcquire,
    isLoading,
    error,
    data,
  } as {
    preAcquire: (
      schemeId: string,
      req: ConnectPreAcquireBeneficiariesReq,
    ) => Promise<ConnectAvailableBeneficiariesRes | undefined>;
    isLoading: boolean;
    error: any;
    data: ConnectAvailableBeneficiariesRes | null;
  };
}