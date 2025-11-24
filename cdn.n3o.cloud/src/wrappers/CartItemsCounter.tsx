import React, { Suspense } from "react";

import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { useRuntimeConfig } from "@/hooks/useRuntimeConfig";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useTranslation } from "@/i18n/hooks/useTranslation"
import { useMetaTags, useThemeCSS } from "@/hooks";
;
import { IntlProvider } from "@/i18n";
import { CartItemsCountSkeleton } from "@/widgets/cart-items-count/CartCountSkeleton";

const CartItemsCounter = React.lazy(() => import("@/widgets/cart-items-count"));

const CounterWrapper: React.FC = () => {
  const { config, loading, error } = useRuntimeConfig();
  const { formatMessage } = useTranslation();
  
  const { isLoading: isStyleLoading } = useThemeCSS({
    elementName: "n3o-cart-items-count",
    env: config?.env
  });

  if (loading || isStyleLoading) {
    return <CartItemsCountSkeleton />;
  }

  if (error) {
    return <div>{formatMessage('config.error')}</div>;
  }

  return <EnvironmentProvider environment={config?.env || 'development'}>
   <Suspense fallback={<CartItemsCountSkeleton />}>
        <CartItemsCounter />
      </Suspense>
  </EnvironmentProvider>
}

export const CartItemsCounterWrapper: React.FC = () => {
  const {common} = useMetaTags();
  
  useApplyTheme(common.getTheme());

  return (
    <IntlProvider>
      <CounterWrapper />
    </IntlProvider>
  );
}