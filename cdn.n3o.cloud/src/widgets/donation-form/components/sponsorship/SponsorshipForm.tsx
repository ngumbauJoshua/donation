import { ArrowLeft, ArrowRight } from "lucide-react";
import { BackButton, createStepperStore, FormContainer, NextButton, Step, Stepper, SubmitButton, } from "@n3oltd/n3o-ui-components";
import { DonationHeader } from "../DonationHeader";

import { useTranslation } from "@/i18n";
import { useAquireBeneficiaries } from "../../hooks/useAquireBeneficiaries";
import { useAddToCart } from "../../hooks/useAddToCart";
import { DimensionAndQuantityStep } from "./DimensionAndQuantityStep";
import { BeneficiaryListStep } from "./BeneficiaryListStep";
import { ErrorMessage } from "@/common/components/ErrorMessage";
import { DonationFormMode, DonationModalFromProps, PublishedFundStructureKey } from "../../types";
import { CartRequestBuilder } from "../../utils/cartRequestBuilder";
import { ToastService } from "@/services/ToastService";
import { useSponsorshipForm } from "../../hooks/useSponsorshipForm";
import { useSharedCrossWidgetComm } from "@/widgets/hooks/useSharedCrossWidgetComm";
import { EVENTS } from "@/utils/events/events";
import { AnalyticsService } from "@/services/AnalyticsService";
import { ModalOpenEventData } from "../../types/eventData";

const formStore = createStepperStore();


export function SponsorshipForm(props: DonationModalFromProps) {
  const { formatMessage } = useTranslation();
  const {
    amount, 
    fundDimensions, 
    frequency,
    formState,
    targetCurrency, 
    handleFundDimensionChange, 
    handleFrequencyChange,
    handleSponsorshipComponentToggle,
    handleSponsorshipComponentAmountChange,
    setFormState,
    replaceBeneficiary,
  } = useSponsorshipForm(props);

  const eventBus = useSharedCrossWidgetComm();
  
  const schemeId = props.designation?.sponsorship?.scheme?.id;
  const scheme = props.sponsorshipSchemes?.sponsorshipSchemes?.find(s => s.id === schemeId);
  
  const { aquireBeneficiaries, isLoading: isAcquiring } = useAquireBeneficiaries({
    enabled: !props.preview,
    onError: () => {
      ToastService.error(formatMessage('sponsorship.acquisition.error'));
    }
  });
  
  const { bulkAddToCart, isAddingToCart } = useAddToCart({
    onBulkSuccess: () => {
      ToastService.success(formatMessage('sponsorship.cart.success'));
      AnalyticsService.reinitializeSession();
      props.onAddToCartSuccess?.();
    }
  });

  const handleFormSubmit = async () => {
    if (!schemeId || formState.selectedBeneficiaries.length === 0) {
      ToastService.error(
        formatMessage("donation.form.sponsorship.validation.noBeneficiaries"),
      );
      return;
    }

    const beneficiaryIds = formState.selectedBeneficiaries
      .map((b) => b.id)
      .filter((id): id is string => id !== undefined);

    const acquisitionResult = await aquireBeneficiaries(
      schemeId,
      beneficiaryIds,
    );

    if (
      acquisitionResult?.beneficiaries &&
      acquisitionResult.beneficiaries.length > 0
    ) {
      const cartRequests = CartRequestBuilder.buildSponsorshipRequests({
        designation: props.designation,
        duration: formState.sponsorshipDuration?.id || "",
        frequency,
        fundDimensions,
        targetCurrency,
        sponsorshipComponents: formState.sponsorshipComponents,
        acquiredBeneficiaries: acquisitionResult.beneficiaries,
      });

      await bulkAddToCart(cartRequests);
    }
  };

  const isProcessing = isAcquiring || isAddingToCart;

  if (!scheme) {
    return <FormContainer>
      <div className="flex-1">
        <FormContainer.Body>
          <ErrorMessage error={formatMessage("donation.form.sponsorship.scheme.error")} />
        </FormContainer.Body>
      </div>
    </FormContainer>
  }

  const hasValidQuantityAndDimensions = (() => {
      const hasValidQuantity = formState.sponsorshipQuantity > 0;
      const hasValidDimensions = Object.entries(fundDimensions)
        .every(([dimension, value]) => {
          if (!props.fundStructure?.[dimension as PublishedFundStructureKey]?.isActive) {
            return true
          }
  
          return !!value 
        });
  
      return hasValidQuantity && hasValidDimensions;
    })()

  const ValidateStep1 = () => {
    if (props.mode === DonationFormMode.inline && !props.preview) {
      // In inline mode, open modal with current form state as initial values
      // This allows the user to continue their sponsorship selection in a modal
      eventBus.emit(EVENTS.DONATION_FORM.MODAL_OPEN, {
        form: {
          formId: props.formId,
          search: false,
          initialValues: {
            frequency,
            amount,
            fundDimensions,
            sponsorship: {
              sponsorshipQuantity: formState.sponsorshipQuantity,
              sponsorshipDuration: formState.sponsorshipDuration || undefined,
              sponsorshipComponents: formState.sponsorshipComponents,
              location: formState.location || undefined,
              selectedBeneficiaries: formState.selectedBeneficiaries,
              alternativeIds: formState.alternativeIds,
            },
          },
        },
      } as ModalOpenEventData);
      return false; // Prevent stepper from advancing in inline mode
    } 
    
    return {isValid: hasValidQuantityAndDimensions};
  };


  return (
    <FormContainer>
      <div className="!flex-1">
        <DonationHeader
          designation={props.designation}
          onDesignationChange={props.onDesignationChange}
          hideAction={props.preview || props.uiConfig?.hideDesignation}
        />

        <FormContainer.Body>
          <Stepper
            store={formStore}
            showNavigation={false}
            onSubmit={() => handleFormSubmit()}
            submitButtonText={
              isProcessing
                ? formatMessage("common.processing")
                : formatMessage("common.donate")
            }
            steps={["step-1", "step-2"]}
          >
            <Step id="step-1" validator={ValidateStep1}>
              <DimensionAndQuantityStep
                currency={targetCurrency!}
                components={props.designation?.sponsorship?.components}
                durations={
                  props.designation?.sponsorship?.allowedDurations || []
                }
                designationFundDimensions={props.designation?.fundDimensions}
                fundDimensions={fundDimensions}
                fundDimensionOptions={scheme.fundDimensionOptions}
                fundStructure={props.fundStructure}
                frequency={frequency}
                formState={formState}
                givingTypes={props.designation?.giftTypes}
                locations={scheme?.availableLocations}
                isValid={hasValidQuantityAndDimensions}
                schemeId={schemeId}
                uiConfig={props.uiConfig}
                setFormState={setFormState}
                onFundDimensionChange={handleFundDimensionChange}
                onFrequencyChange={handleFrequencyChange}
                onSponsorshipComponentToggle={handleSponsorshipComponentToggle}
                onSponsorshipComponentAmountChange={
                  handleSponsorshipComponentAmountChange
                }
                preview={props.preview}
              />
            </Step>
            <Step id="step-2">
              <BeneficiaryListStep
                schemeId={schemeId}
                formState={formState}
                targetCurrency={targetCurrency!}
                selectedBeneficiaries={formState.selectedBeneficiaries}
                alternativeIds={formState.alternativeIds || []}
                replaceBeneficiary={replaceBeneficiary}
                preview={props.preview}
              />
            </Step>
          </Stepper>
        </FormContainer.Body>
      </div>
      <FormContainer.Footer>
        <div className="flex items-center gap-4">
          <BackButton
            className="flex items-center justify-center flex-none"
            store={formStore}
          >
            <ArrowLeft className="h-1 w-1" />
          </BackButton>
          <NextButton className="relative flex-1 px-12" store={formStore} disabled={!hasValidQuantityAndDimensions}>
            <span>{formatMessage("common.button.continue")}</span>
            <ArrowRight className="absolute right-5" />
          </NextButton>
          <SubmitButton
            disabled={
              isProcessing || 
              formState.selectedBeneficiaries.length === 0 ||
              props.preview
            }
            className="relative flex-1 px-12 n3o-button-cta"
            store={formStore}
          >
            {formatMessage("common.donate")}
          </SubmitButton>
        </div>
      </FormContainer.Footer>
    </FormContainer>
  );
}