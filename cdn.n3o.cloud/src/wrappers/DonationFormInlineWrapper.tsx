import { Suspense } from "react";
import { DonationFormInline } from "@/widgets/donation-form";
import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider";
import { IntlProvider, useTranslation } from "@/i18n";
import { useRuntimeConfig } from "@/hooks/useRuntimeConfig";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { FormSkeleton } from "@/widgets/donation-form/components/DonationFormSkeleton";
import { PreviewProps } from "@/types/preview";
import { ElementDataConfig, ElementUIConfig } from "@/types/element-config";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useThemeCSS } from "@/hooks/useThemeCSS";

type InlineWrapperProps = {
  formId: string;
  dataConfig?: ElementDataConfig;
  uiConfig?: ElementUIConfig;
} & PreviewProps;


function InlineWrapper(props: InlineWrapperProps) {
  const { config, loading, error } = useRuntimeConfig();
  const { formatMessage } = useTranslation();

  const { common } = useMetaTags();

  const crowdfunderId = common.getCrowdfundingId();

  const { isLoading: isStyleLoading } = useThemeCSS({
    elementName: "n3o-donation-form",
    env: config?.env
  });

  const hasValidId = !!(props.formId || crowdfunderId);

  if (!hasValidId) {
    return <p className="text-destructive">{formatMessage("donation.form.error.formId.missing")}</p>;
  }

  if (loading || isStyleLoading) {
    return <div className="bg-background rounded-xl"><FormSkeleton /></div>;
  }

  if (error) {
    return <div className="text-destructive">{formatMessage("config.error")}</div>;
  }

   return (
    <EnvironmentProvider environment={config?.env || "development"}>
      <Suspense fallback={<div className="bg-background rounded-xl"><FormSkeleton /></div>}>
        <DonationFormInline {...props} crowdfunderId={props.formId ? undefined : crowdfunderId || undefined} />
      </Suspense>
    </EnvironmentProvider>
  );
}

export const DonationFormInlineWrapper: React.FC<InlineWrapperProps> = (props) => {
  const {common} = useMetaTags();
    
  useApplyTheme(common.getTheme());

  return (
    <IntlProvider>
      <InlineWrapper {...props}/>
    </IntlProvider>
  );
};