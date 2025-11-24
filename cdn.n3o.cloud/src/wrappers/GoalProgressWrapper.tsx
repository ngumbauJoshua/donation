import React, { Suspense } from "react";
import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { GoalProgressLoading } from "@/widgets/goal-progress/components/GoalProgressLoading";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useMetaTags, useRuntimeConfig, useThemeCSS } from "@/hooks";
import { IntlProvider } from "@/i18n/IntlProvider";

const GoalProgress = React.lazy(() => import("@/widgets/goal-progress"));

function GoalProgressWrapper() {
  const { config, loading, error } = useRuntimeConfig();
  const { isLoading: isStyleLoading } = useThemeCSS({
      elementName: "n3o-goal-progress",
      env: config?.env
  });

  if (loading || isStyleLoading) {
    return <GoalProgressLoading />;
  }

  if (error) {
    return null
  }

  return (
    <EnvironmentProvider environment={config?.env || "development"}>
      <Suspense fallback={<GoalProgressLoading />}>
        <GoalProgress />
      </Suspense>
    </EnvironmentProvider>
  );
}

export function Wrapper() {
  const {common} = useMetaTags();
  useApplyTheme(common.getTheme());

  return (
    <IntlProvider>
      <GoalProgressWrapper />
    </IntlProvider>
  );
}
