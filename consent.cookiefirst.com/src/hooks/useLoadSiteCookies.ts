import { FALSE, TRUE } from "constants/primitives";
import fetchSiteCookies, {
  ISiteCookiesApiResponse,
} from "helpers/fetchSiteCookies";
import { useEffect, useState } from "preact/hooks";

import useTranslation from "hooks/useTranslation";
import useUserConsent from "./useUserConsent";
import useAppState from "./useAppState";

const cachedData: Record<string, ISiteCookiesApiResponse> = {};
const useLoadSiteCookies = (): [ISiteCookiesApiResponse, boolean] => {
  const { widgetConfig } = useAppState();
  const { visitorId } = useUserConsent();
  const { userLang } = useTranslation();
  // show loading state only when not using cached data
  const [isLoading, setIsLoading] = useState<boolean>(!cachedData[userLang]);
  const [data, setData] = useState<
    ISiteCookiesApiResponse | Partial<ISiteCookiesApiResponse>
  >({});

  useEffect(() => {
    loadSiteCookies(userLang);
  }, [userLang]);

  const loadSiteCookies = (lang: string) => {
    if (cachedData[lang]) {
      // use cached data if available
      setData(cachedData[lang]);
      setIsLoading(FALSE);
      return;
    }

    setData({});
    setIsLoading(TRUE);

    fetchSiteCookies(lang, widgetConfig.version)
      .then(
        (res) => {
          cachedData[lang] = res;

          setData(cachedData[lang]);
        },
        () => {}
      )
      .finally(() => {
        setIsLoading(FALSE);
      });
  };

  return [
    {
      cookies: data.cookies || [],
      cookie_list_updated_at: data.cookie_list_updated_at || "",
      cookie_policy_updated_at: data.cookie_policy_updated_at || "",
      visitor_id: visitorId || "",
    },
    isLoading,
  ];
};

export default useLoadSiteCookies;
