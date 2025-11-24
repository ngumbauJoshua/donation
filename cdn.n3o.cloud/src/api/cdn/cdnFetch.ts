import { PublishedFileKind, ConnectSubscriptionFile } from "@n3oltd/karakoram.connect.sdk.types";

export interface FetchDataOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  timeout?: number;
  credentials?: RequestCredentials;
  cache?: RequestCache;
}

/**
 * 
 * - Automatically handles JSON request/response.
 * - Supports optional timeout and request cancellation (AbortController).
 * - Provides detailed errors, including status and response text.
 *
 * @param url - The resource URL.
 * @param options - Configuration options.
 * @returns A Promise resolving to the parsed response (JSON if possible), or text otherwise.
 */
export async function fetchData<T = unknown>(
  url: string,
  options: FetchDataOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    signal: userSignal,
    timeout,
    cache = 'default',
  } = options;

  
  const config: RequestInit = {
    method: method.toUpperCase(),
    headers: headers,
    cache,
    signal: userSignal,
  };

  if (body !== undefined && !['GET', 'HEAD'].includes(config.method!)) {
    config.body = JSON.stringify(body);
  }

  let controller: AbortController | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (!userSignal && timeout) {
    controller = new AbortController();
    config.signal = controller.signal;
    timeoutId = setTimeout(() => {
      controller?.abort();
    }, timeout);
  }

  try {
    const response: Response = await fetch(url, config);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      (error as any).responseText = errorText;
      throw error;
    }

    const contentType = response.headers.get('Content-Type') || '';
    
    if (contentType.toLowerCase().includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout: The request took too long to respond.');
    }
    
    const message = (error instanceof Error) ? error.message : String(error);
    throw new Error(`Fetch error: ${message}`);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export const loadCdnFile = (url: string, subscriptionId: string, fileKind: PublishedFileKind | string, file: ConnectSubscriptionFile | string) => {
  return fetchData<any>(`${url}/connect-${subscriptionId}/${fileKind}/${file}.json`)
}

