import { useDebounce } from "@/hooks/useDebounce";
import { useCallback } from "react";

export function useSearchDebounce(
  onSearch: (searchText: string) => void,
  onValueChange?: (searchText: string) => void,
  delay: number = 500
) {
  const debouncedSearch = useDebounce(onSearch, delay);

  const handleSearchChange = useCallback(
    (searchText: string) => {
      onValueChange?.(searchText);

      if (!searchText.trim()) {
        return;
      }

      debouncedSearch(searchText);
    },
    [debouncedSearch, onValueChange]
  );

  return handleSearchChange;
}
