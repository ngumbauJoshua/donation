import { useTranslation } from "@/i18n";
import { _platformsClient } from "@/api/common/clients/ConnectRestClients";
import { useApi } from "@/api/common/hooks/useApi";
import { ToastService } from "@/services/ToastService";
import { ConnectSearchCriteria,  SearchResultsPage} from "@n3oltd/karakoram.platforms.sdk.connect";

export interface UseSearchResult {
  search: (searchCriteria: ConnectSearchCriteria | undefined) => Promise<SearchResultsPage | undefined>;
  data: SearchResultsPage | undefined;
  isLoading: boolean;
  error: Error | undefined;
  clearResults: () => void;
}

export function useSearch(): UseSearchResult {
  const { execute, data, isLoading, error, reset } = useApi<SearchResultsPage>();
  const { formatMessage } = useTranslation()

  const search = async (searchCriteria: ConnectSearchCriteria | undefined): Promise<SearchResultsPage | undefined> => {
    if (!searchCriteria) {
      return undefined;
    }

    if (!_platformsClient) {
      return undefined;
    }

    try {
      const result = await execute(_platformsClient!.search(searchCriteria));
      return result;
    } catch {
      ToastService.error(formatMessage("donation.form.search.error"));
      return undefined;
    }
  };

  const clearResults = () => {
    reset();
  };

  return {
    search,
    data: data || undefined,
    isLoading,
    error: error ? (error as Error) : undefined,
    clearResults
  };
}