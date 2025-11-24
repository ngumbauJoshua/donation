import React, { Suspense } from "react";
import { FundForm } from "./FundForm";
import { FormSkeleton } from "./DonationFormSkeleton";
import { FeatureFlag, isFeatureEnabled } from '@/utils/features/featureFlags';
import { DesignationType } from "@n3oltd/karakoram.platforms.sdk.types";
import { DonationModalFromProps } from "../types";

declare global {
  const __FEATURE_FEEDBACKS__: boolean;
  const __FEATURE_SPONSORSHIPS__: boolean;
}

const FeedbackForm = React.lazy(() => 
  __FEATURE_FEEDBACKS__ ? 
    import("./FeedbackForm").then(module => ({ default: module.FeedbackForm })) : 
    Promise.resolve({ default: FundForm })
);

const SponsorshipForm = React.lazy(() => 
  __FEATURE_SPONSORSHIPS__ ? 
    import("./sponsorship/SponsorshipForm").then(module => ({ default: module.SponsorshipForm })) : 
    Promise.resolve({ default: FundForm })
);
  
export function DonationForm(props: DonationModalFromProps) {
  const shouldRenderFeedbackForm = __FEATURE_FEEDBACKS__ && isFeatureEnabled(FeatureFlag.FEEDBACKS);
  const shouldRenderSponsorshipForm = __FEATURE_SPONSORSHIPS__ && isFeatureEnabled(FeatureFlag.SPONSORSHIPS);

  const formProps = {
    ...props,
    uiConfig: props.uiConfig
  };

  switch (props.designation.type) {
    case DesignationType.Fund:
      return <FundForm {...formProps} />;

    case DesignationType.Feedback:
      if (shouldRenderFeedbackForm) {
        return (
          <Suspense fallback={<FormSkeleton />}>
            <FeedbackForm {...formProps} />
          </Suspense>
        );
      }
      return null;

    case DesignationType.Sponsorship:
      if (shouldRenderSponsorshipForm) {
        return (
          <Suspense fallback={<FormSkeleton />}>
            <SponsorshipForm {...formProps} />
          </Suspense>
        );
      }
      return null;

    default:
      return null;
  }
}