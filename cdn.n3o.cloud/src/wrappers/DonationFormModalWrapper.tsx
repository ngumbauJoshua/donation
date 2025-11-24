import React, { Suspense, useState } from "react";

import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { DonationFormModalProps } from "@/widgets/donation-form/types"
import { useSharedCrossWidgetComm } from "@/widgets/hooks/useSharedCrossWidgetComm";
import { EVENTS } from "@/utils/events/events";
import { IntlProvider, useTranslation } from "@/i18n";
import { useSheetStyles } from "@/hooks/useSheetStyles";
import { useRuntimeConfig } from "@/hooks/useRuntimeConfig";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useElementConfig } from "@/hooks/useElementConfig";
import { useThemeCSS } from "@/hooks/useThemeCSS";
import { DonationModal } from "@n3oltd/n3o-ui-components";
import { DonationFormSkeleton } from "@/widgets/donation-form/components/DonationFormSkeleton";
import { FormValidatorFactory } from "@/services/validators";
import { ElementType } from "@/types/element-config";
import { PreviewProps } from "@/types/preview";
import { DonationFormInitialValues } from "@/types/InitialValues";
import { ModalOpenEventData } from "@/widgets/donation-form/types/eventData";

const DonationFormModal = React.lazy(() => import("@/widgets/donation-form/DonationFormModal"));
const CrowdfundingFormModal = React.lazy(() => import("@/widgets/donation-form/crowdfunding-form/CrowdfundingFormModal").then(module => ({ default: module.CrowdfundingFormModal })));

type DonationFormModalWrapperProps = {
  onClose: () => void;
  className?: string;
} & PreviewProps;

const DonationModalWrapper: React.FC<DonationFormModalWrapperProps> = ({onClose, className, preview, json}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [formId, setFormId] = useState('');
  const [eventData, setEventData] = useState<ModalOpenEventData | null>(null);

  const validateFormData = (initialValues: DonationFormInitialValues) => {

    return FormValidatorFactory.getDonationValidator().validateDonationFormData(initialValues);
  };
  const [shouldOpenSearch, setShouldOpenSearch] = useState(false);
  const [hydrationData, setHydrationData] = useState<DonationFormInitialValues | undefined>(undefined);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
  
  const eventBus = useSharedCrossWidgetComm();
  const { config, loading, error } = useRuntimeConfig();
  
  const { config: elementConfig, updateConfigId, clearConfig } = useElementConfig({
    elementType: ElementType.DONATION_FORM_MODAL,
    autoListen: false
  });

  const { isLoading: isStyleLoading, reload } = useThemeCSS({
    elementName: "n3o-donation-form-modal",
    env: config?.env
  });

  const { formatMessage } = useTranslation();

  useSheetStyles(isOpen, () => {});

  // Set up portal container to point to the div inside Shadow DOM
  React.useEffect(() => {
    if (containerRef.current) {
      setPortalContainer(containerRef.current);
    }
  }, []);

  React.useEffect(() => {
    if (preview) {
      reload();
      setIsOpen(true);
    }
  }, [preview, reload]);

  React.useEffect(() => {
    const unsubOpen = eventBus.on(EVENTS.DONATION_FORM.MODAL_OPEN, (data: ModalOpenEventData) => {
      setEventData(data);
      
      // Handle crowdfunding modal
      if (data.crowdfundingForm) {
        setIsOpen(true);
        reload();
        return;
      }
      
      // Handle regular donation form modal
      if (data.form) {
        setFormId(data.form.formId!);
        setShouldOpenSearch(data.form.search || false);
        
        if (data.form.configId) {
          updateConfigId(data.form.configId);
        } else {
          clearConfig();
        }
        
        if (data.form.initialValues) {
          const validationResult = validateFormData(data.form.initialValues);
          if (validationResult.isValid && validationResult.sanitizedData) {
            setHydrationData(validationResult.sanitizedData);
          }
        }
        
        setIsOpen(true);
        reload();
      }
    });

    const unsubClose = eventBus.on(EVENTS.DONATION_FORM.MODAL_CLOSE, () => {
      setIsOpen(false);
      setFormId('');
      setShouldOpenSearch(false);
      setHydrationData(undefined);
      setEventData(null);
      clearConfig();
      onClose?.();
    });

    const unsubHydrate = eventBus.on<DonationFormInitialValues>(
      EVENTS.DONATION_FORM.HYDRATE,
      (payload) => {
        if (!payload) return;
        
        const validationResult = validateFormData(payload);
        
        if (validationResult.isValid && validationResult.sanitizedData) {
          setHydrationData(validationResult.sanitizedData);
        }
      }
    );

    return () => {
      unsubOpen();
      unsubClose();
      unsubHydrate();
    };
  }, [eventBus, onClose, preview, updateConfigId, clearConfig, reload]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Merge hydration data with element config data
  // Hydration data takes precedence over element config
  const getInitialValues = (): DonationFormInitialValues | undefined => {
    const elementConfigData = elementConfig?.data ? {
      formId: elementConfig.data.formId || formId,
      fundDimensions: {
        ...(elementConfig.data.fundDimension1 && { dimension1: elementConfig.data.fundDimension1 }),
        ...(elementConfig.data.fundDimension2 && { dimension2: elementConfig.data.fundDimension2 }),
        ...(elementConfig.data.fundDimension3 && { dimension3: elementConfig.data.fundDimension3 }),
        ...(elementConfig.data.fundDimension4 && { dimension4: elementConfig.data.fundDimension4 })
      },
      ...(elementConfig.data.amount && { amount: elementConfig.data.amount }),
      ...(elementConfig.data.frequency && { frequency: elementConfig.data.frequency })
    } : undefined;

    if (!elementConfigData && !hydrationData) {
      return undefined;
    }

    return {
      ...elementConfigData,
      ...hydrationData,
      // For fund dimensions, merge the objects
      ...(elementConfigData?.fundDimensions || hydrationData?.fundDimensions ? {
        fundDimensions: {
          ...elementConfigData?.fundDimensions,
          ...hydrationData?.fundDimensions
        }
      } : {})
    };
  };

  const modalProps: DonationFormModalProps = {
    className: className,
    open: isOpen,
    formId: formId,
    onOpenChange: handleOpenChange,
    onClose: handleClose,
    search: shouldOpenSearch,
    container: portalContainer,
    preview: preview,
    json: json,
    initialValues: getInitialValues(),
    uiConfig: elementConfig?.ui
  };

  if (loading || isStyleLoading) {
    return (
      <DonationModal {...modalProps} open={isOpen} onOpenChange={handleOpenChange}>
        <DonationFormSkeleton />
      </DonationModal>
    );
  }

  if (error) {
    return <div>{formatMessage("config.error")}</div>;
  }

  return (
    <EnvironmentProvider environment={config?.env || "development"}>
      <Suspense fallback={<DonationModal {...modalProps} open={isOpen} onOpenChange={handleOpenChange}>
        <DonationFormSkeleton />
      </DonationModal>}>
        {/* Portal container for modal */}
        <div ref={containerRef} id="n3o-modal-portal-container" />
        {eventData?.crowdfundingForm ? (
          <CrowdfundingFormModal 
            open={isOpen}
            onOpenChange={handleOpenChange}
            onClose={handleClose}
            crowdfunderId={eventData.crowdfundingForm.formId}
            eventData={eventData.crowdfundingForm}
            preview={preview}
          />
        ) : (
          <DonationFormModal {...modalProps} />
        )}
      </Suspense>
    </EnvironmentProvider>
  );
}

export const DonationFormModalWrapper: React.FC<DonationFormModalWrapperProps> = (props) => {
  const {common} = useMetaTags();
    
  useApplyTheme(common.getTheme());
  
  return (
    <IntlProvider>
      <DonationModalWrapper {...props} />
    </IntlProvider>
  );
}
