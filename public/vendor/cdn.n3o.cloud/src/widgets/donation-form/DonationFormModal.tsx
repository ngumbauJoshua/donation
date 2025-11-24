import React from "react";

import { ShoppingCartIcon } from "lucide-react";
import { CurrencySelector, DonationModal } from "@n3oltd/n3o-ui-components";

import { CurrencyChangeConfirmation } from "./components/CurrencyChangeConfirmation";
import { DonationFormSkeleton } from "./components/DonationFormSkeleton";
import { DesignationSearchModal } from "./components/DesignationSearchModal";
import { DonationForm } from "./components/DonationForm";
import { useCartItemsCount } from "../hooks/useCartItemsCount";
import { useTranslation } from "@/i18n";
import { useDonationFormData } from "./hooks/useDonationFormData";
import { useSharedCrossWidgetComm } from "@/widgets/hooks/useSharedCrossWidgetComm";
import { ToastService } from "@/services/ToastService";
import { ExtendedCurrency } from "@/helpers/CurrencyConverter";
import { EVENTS } from "@/utils/events/events";
import { DonationFormModalProps, DonationFormMode } from "./types";
import { PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";

export function DonationFormModal(props: DonationFormModalProps) {
  
  const [showConfirmation, setShowConfirmation] = React.useState(false);
	const [designation, setDesignation] = React.useState<PublishedDesignation | null>(null);
  const [logoError, setLogoError] = React.useState(false);
  const [openDesignationModal, setOpenDesignationModal] = React.useState(false);
  const eventBus = useSharedCrossWidgetComm();

  const { open: isOpen, formId, search, preview, json, initialValues } = props;

  const {
    publishedForm: formData,
    fundStructure,
    orgInfo: organizationInfo,
    currencies: currencyData,
		sponsorshipSchemes,
    currentCurrency: selectedCurrency,
    setCurrency,
    isLoading,
    hasError
  } = useDonationFormData({
    formId,
    preview,
    json,
    enabled: isOpen,
    includeOrgInfo: true,
		includeSchemes: true,
  });

	React.useEffect(() => {
		if (formData && formData.designation && !designation) {
			setDesignation(formData.designation);
		}
	}, [formData, designation]);

	React.useEffect(() => {
		const shouldOpenDesignationSearch = search && !preview; 
		if (shouldOpenDesignationSearch) {
			setOpenDesignationModal(true);
		}

		return () => {
			setOpenDesignationModal(false);
		}
	},[search, preview]);

  const {cartCount, handleCartClick} = useCartItemsCount();
	const {formatMessage} = useTranslation()
	
	const handleAddToCartSuccess = () => {
    props.onClose?.();

		eventBus.emit(EVENTS.CART.refresh);
    eventBus.emit(EVENTS.CHECKOUT.checkoutOpen);
  };

  const handleCurrencyChange = (code: string) => {
    if (preview) {
      return;
    }
    
    const newCurrency = currencyData?.currencies?.[code] as ExtendedCurrency;
    
    if (newCurrency && newCurrency.code !== selectedCurrency?.code) {
      setCurrency(newCurrency);
    }
  };

	const handleDesignationClick = (open: boolean) => {
		setOpenDesignationModal(open);
	}
	
	React.useEffect(() => {
		if (hasError) {
			ToastService.error(formatMessage('donation.form.loading.error'));	
		}
	}, [hasError, formatMessage]);

	const onOpenChange = (open: boolean) => {
		props.onOpenChange(open);
	};

	if (isLoading) {
		return (
			<DonationModal {...props} open={isOpen} onOpenChange={onOpenChange}>
				<DonationFormSkeleton />
			</DonationModal>
		);
	}

	if (hasError || !isOpen) {
		return null;
	}

	const isCurrencyConfirmationRequired = cartCount > 0;

  return (
		<DonationModal {...props} open={isOpen} onOpenChange={onOpenChange}>
			<DonationModal.Content.Container>
				<DonationModal.Header>
					<DonationModal.Header.Logo>
						<div className="flex gap-2 items-center">
							{organizationInfo?.logo && !logoError ? (
							<img 
								src={organizationInfo.logo} 
								alt={organizationInfo?.name} 
								className="h-8 w-8 rounded" 
								onError={() => setLogoError(true)}
							/>
						) : null}
						<span className="hidden sm:block text-xs text-white">
							{organizationInfo?.name}
						</span>
						</div>
					</DonationModal.Header.Logo>

					<DonationModal.Header.HeaderContent>
            <DonationModal.Header.Basket onClick={handleCartClick}>
							<ShoppingCartIcon className="h-5 w-5" />
							<DonationModal.Header.BasketCounter count={cartCount} />
						</DonationModal.Header.Basket>

						{selectedCurrency ? <CurrencySelector
						currentCurrency={selectedCurrency}
						currencyOptions={currencyData?.currencies || []}
						onCurrencyChange={handleCurrencyChange}
						showConfirmation={showConfirmation}
						onShowConfirmationChange={setShowConfirmation}
						requireConfirmation={isCurrencyConfirmationRequired}
					>
						<CurrencySelector.Trigger />
						<CurrencySelector.ConfirmDialog>
							<CurrencyChangeConfirmation />
						</CurrencySelector.ConfirmDialog>
					</CurrencySelector>: null}
					</DonationModal.Header.HeaderContent>
					{openDesignationModal ? <div></div> : <DonationModal.Header.Close label={formatMessage('common.close')} disabled={props.preview} />}
				</DonationModal.Header>
				<DonationModal.Content>
					<DonationModal.Content.Panel>
						<DonationModal.Content.Image src={designation?.image || ''} alt={""} />
						<DonationModal.Content.PanelContent>
							<DonationModal.Content.Title>
								{designation?.name}
							</DonationModal.Content.Title>
							<DonationModal.Content.Description>
								<span
									dangerouslySetInnerHTML={{
										__html: designation?.shortDescription || '',
									}}
								></span>
							</DonationModal.Content.Description>
						</DonationModal.Content.PanelContent>
					</DonationModal.Content.Panel>
					<DonationModal.Content.Body>
						{designation && selectedCurrency && fundStructure ? <DonationForm
								formId={props.formId}
								mode={DonationFormMode.modal}
								fundStructure={fundStructure}
								designation={designation}
								sponsorshipSchemes={sponsorshipSchemes!}
								onDesignationChange={handleDesignationClick}
								onAddToCartSuccess={handleAddToCartSuccess}
								initialValues={initialValues}
								preview={preview}
								json={json}
								uiConfig={props.uiConfig}
							/> : null}
					</DonationModal.Content.Body>
				</DonationModal.Content>
				<DonationModal.Footer>
					{formatMessage('payment.secretKey.gurantee')}
				</DonationModal.Footer>
				{openDesignationModal ? <div className="fixed inset-0 z-[100] flex items-center justify-center">
					<DesignationSearchModal 
						isOpen={openDesignationModal}
						campaignId={formData?.campaign?.id}
						fundStructure={fundStructure || null}
						onClose={() => setOpenDesignationModal(false)}
						onDesignationSelect={(selectedDesignation) => {
							setDesignation(selectedDesignation);
							setOpenDesignationModal(false);
						}}
						/>
				</div> : null}
			</DonationModal.Content.Container>
		</DonationModal>
		
	);
}

export default DonationFormModal