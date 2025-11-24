import { useState, useCallback, useRef } from "react";
import ConnectApiClient from "../clients/ConnectApiClient";
import { IApiResponse } from "../clients/ApiResponseModel";

interface ApiState<T> {
  data: T | null;
  error: Record<string, any> | null;
  isLoading: boolean;
}

interface UseApiOptions {
  onError?: (error: Record<string, any>) => void;
  onSuccess?: (data: any) => void;
  shouldStopPolling?: (data: any) => boolean;
  pollingInterval?: number;
}

const requestPool = new Map<string, Promise<any>>();

export function useApi<T>(options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const callbacksRef = useRef(options);
  callbacksRef.current = options;

  const execute = useCallback(async (promise: Promise<T>) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response: IApiResponse<T> = await ConnectApiClient.toResponse<T>(promise);
      
      if (response.error) {
        setState({ data: null, error: response.error, isLoading: false });
        callbacksRef.current.onError?.(response.error);
        throw response.error;
      }
      
      const data = response.result as T;
      setState({ data, error: null, isLoading: false });
      callbacksRef.current.onSuccess?.(data);

      return data;
    } catch (error: any) {
      // Only handle errors that weren't already handled by response.error check
      if (!error.status || error.status < 400) {
        setState({ data: null, error: error, isLoading: false });
        callbacksRef.current.onError?.(error);
      }
      throw error;
    }
  }, []);
  
  const poll = useCallback(async (promise: () => Promise<T>, key: string) => {
    if (requestPool.has(key)) {
      return requestPool.get(key);
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const pollingFunction = async (): Promise<T> => {
      try {
        while (true) {
          const response: IApiResponse<T> = await ConnectApiClient.toResponse<T>(promise());
          
          if (response.error) {
            setState({ data: null, error: response.error, isLoading: false });
            callbacksRef.current.onError?.(response.error);
            requestPool.delete(key);
            throw response.error;
          }
          
          const data = response.result as T;
          setState({ data, error: null, isLoading: true });
          callbacksRef.current.onSuccess?.(data);

          if (callbacksRef.current.shouldStopPolling?.(data)) {
            setState({ data, error: null, isLoading: false });
            requestPool.delete(key);
            return data;
          }

          await new Promise((resolve) =>
            setTimeout(resolve, callbacksRef.current.pollingInterval ?? 3000)
          );
        }
      } catch (error: any) {
        // Only handle errors that weren't already handled by response.error check
        if (!error.status || error.status < 400) {
          setState({ data: null, error: error, isLoading: false });
          callbacksRef.current.onError?.(error);
        }
        requestPool.delete(key);
        throw error;
      }
    };

    const request = pollingFunction();
    requestPool.set(key, request);
    return request;
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    ...state,
    execute,
    poll,
    reset,
  };
}
