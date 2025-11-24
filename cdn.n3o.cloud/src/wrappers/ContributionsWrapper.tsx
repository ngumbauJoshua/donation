import React, { Suspense } from "react";
import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { ContributionsLoading } from "@/widgets/contributions/components/ContributionsLoading";
import { useMetaTags, useRuntimeConfig, useThemeCSS } from "@/hooks";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { IntlProvider } from "@/i18n/IntlProvider";

const Contributions = React.lazy(() => import("@/widgets/contributions"));

function ContributionsWrapper() {
  const { config, loading, error } = useRuntimeConfig();
  const { isLoading: isStyleLoading } = useThemeCSS({
    elementName: "n3o-contributions",
    env: config?.env
  }); 

  if (loading || isStyleLoading) {
    return <ContributionsLoading />;
  }

  if (error) {
    return null
  }

  return <EnvironmentProvider environment={config?.env || 'development'}>
    <Suspense fallback={<ContributionsLoading />}>
      <Contributions 
      />
    </Suspense>
  </EnvironmentProvider>;
}

export function Wrapper() {
  const {common} = useMetaTags();
    
  useApplyTheme(common.getTheme());

  return (
    <IntlProvider>
      <ContributionsWrapper />
    </IntlProvider>
  );
}
