import { useMemo } from "react";
import { DonationForm } from "./components";
import { CrowdfundingForm } from "./crowdfunding-form/CrowdfundingFrom";
import { FormSkeleton } from "./components/DonationFormSkeleton";
import { useSharedCrossWidgetComm } from "../hooks/useSharedCrossWidgetComm";
import { useDonationFormData } from "./hooks/useDonationFormData";
import { useDesignationById } from "./hooks/useDesignationById";
import { EVENTS } from "@/utils/events/events";
import { useTranslation } from "@/i18n";
import { ToastService } from "@/services/ToastService";
import { DonationFormInlineProps, DonationFormMode } from "./types";

export function DonationFormInline({ 
  formId, 
  crowdfunderId,
  dataConfig, 
  uiConfig, 
  preview, 
  json 
}: DonationFormInlineProps) {
    const isCrowdfundingMode = !!crowdfunderId;
    
    const {
			publishedForm: formData,
			fundStructure,
			sponsorshipSchemes,
			crowdfunder,
			isLoading,
			hasError,
		} = useDonationFormData({
			formId,
			crowdfunderId,
			preview,
			json,
			enabled: isCrowdfundingMode || !!formId,
			includeSchemes: true,
		});

    const designationIds = (() => {
			const goals = crowdfunder?.goals?.items || [];
			return goals.map((goal: any) => goal.designationId).filter(Boolean);
		})();
    
    const {
      designations: crowdfundingDesignations,
      isLoading: designationLoading,
      hasError: designationError
    } = useDesignationById({
      designationIds,
      enabled: isCrowdfundingMode && designationIds.length > 0
    });

    const eventBus = useSharedCrossWidgetComm();
    const {formatMessage} = useTranslation();

    const initialValues = useMemo(() => {
			if (!dataConfig) return {};

			return {
				formId: dataConfig.formId,
				fundDimensions: {
					...(dataConfig.fundDimension1 && {
						dimension1: dataConfig.fundDimension1,
					}),
					...(dataConfig.fundDimension2 && {
						dimension2: dataConfig.fundDimension2,
					}),
					...(dataConfig.fundDimension3 && {
						dimension3: dataConfig.fundDimension3,
					}),
					...(dataConfig.fundDimension4 && {
						dimension4: dataConfig.fundDimension4,
					}),
				},
				...(dataConfig.amount && { amount: dataConfig.amount }),
				...(dataConfig.frequency && { frequency: dataConfig.frequency }),
			};
    }, [dataConfig]);

    const handleAddToCartSuccess = () => {
        if (preview) {
          return;
        }
        eventBus.emit(EVENTS.CART.refresh);
        eventBus.emit(EVENTS.CHECKOUT.checkoutOpen);
    };

    const handleDesignationChange = () => {
			if (preview) {
					return;
			}
			eventBus.emit(EVENTS.DONATION_FORM.MODAL_OPEN, {form: {
				formId, search: true
			}});
    };

    const isDataLoading = isLoading || (isCrowdfundingMode && designationLoading);
    
    if (isDataLoading) {
			return <div className="bg-background rounded-xl"><FormSkeleton /></div>;
    }

    if (hasError || (isCrowdfundingMode && designationError)) {
			ToastService.error(formatMessage('donation.form.error.loading'));
			return null;
    }

    if (isCrowdfundingMode) {
      if (!crowdfunder || !crowdfundingDesignations || crowdfundingDesignations.length === 0 || !fundStructure) {
        return null;
      }
    } else {
      if (!formData || !formData.designation || !fundStructure) {
        return null;
      }
    }

    return (
			<div className="bg-background rounded-xl">
				{isCrowdfundingMode ? (
					<CrowdfundingForm
						crowdfunderId={crowdfunderId!}
						crowdfunder={crowdfunder}
						designations={crowdfundingDesignations}
						fundStructure={fundStructure}
						onAddToCartSuccess={handleAddToCartSuccess}
						preview={preview}
						json={json}
						uiConfig={uiConfig}
					/>
				) : (
					<DonationForm
						formId={formId!}
						fundStructure={fundStructure}
						mode={DonationFormMode.inline}
						designation={formData?.designation!}
						sponsorshipSchemes={sponsorshipSchemes!}
						onDesignationChange={handleDesignationChange}
						onAddToCartSuccess={handleAddToCartSuccess}
						initialValues={initialValues}
						preview={preview}
						json={json}
						uiConfig={uiConfig}
					/>
				)}
			</div>
    );
}