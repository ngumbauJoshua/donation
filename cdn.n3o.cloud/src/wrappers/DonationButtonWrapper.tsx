import React, { Suspense } from "react";

import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { DonationButtonProps } from "@/widgets/donation-button/DonationButton"
import { useRuntimeConfig } from "@/hooks/useRuntimeConfig";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useMetaTags, useThemeCSS } from "@/hooks";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { IntlProvider } from "@/i18n";
import { PreviewProps } from "@/types/preview";

const DonationButton = React.lazy(() => import("@/widgets/donation-button/DonationButton"));

const ButtonWrapper: React.FC<DonationButtonProps> = (props) => {
  const { config, loading, error } = useRuntimeConfig();
  const { formatMessage } = useTranslation();
  const { isLoading: isStyleLoading } = useThemeCSS({
    elementName: "n3o-donation-button",
    env: config?.env
  });

  //TODO: use Loading skeleton or spinner
  if (loading || isStyleLoading) {
    return <div>{formatMessage('common.loading')}</div>;
  }
  
  if (error) {
    return <div>{formatMessage('config.error')}</div>;
  }

  return (
		<EnvironmentProvider environment={config?.env || "development"}>
			<Suspense fallback={<div></div>}>
				<DonationButton {...props} />
			</Suspense>
		</EnvironmentProvider>
	);
}

export const DonationButtonWrapper: React.FC<DonationButtonProps & PreviewProps> = (props) => {
const {common} = useMetaTags();
  
useApplyTheme(common.getTheme());

  return (
    <IntlProvider>
      <ButtonWrapper {...props} />
    </IntlProvider>
  );
}