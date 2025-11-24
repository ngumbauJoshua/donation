import { DonationModal, DonationFormHeader, FormContainer } from "@n3oltd/n3o-ui-components";
import { Heart } from "lucide-react";

export function DonationFormSkeleton() {
  return (
		<DonationModal.Content.Container className="n3o-widget-donation-form-skeleton">
			<DonationModal.Header>
				<DonationModal.Header.Logo>
					<div className="flex gap-2 items-center n3o-widget-donation-form-skeleton__logo">
						<Heart className="h-8 w-8 text-white" />
						<span className="hidden sm:block text-xs text-white"></span>
					</div>
				</DonationModal.Header.Logo>

				<DonationModal.Header.HeaderContent>
					<div className="w-9 h-9 bg-white/20 rounded-md animate-pulse n3o-widget-donation-form-skeleton__header-icon" />

					<div className="w-20 h-9 bg-white/20 rounded-md animate-pulse n3o-widget-donation-form-skeleton__header-text" />
				</DonationModal.Header.HeaderContent>

				<DonationModal.Header.Close label="Close" />
			</DonationModal.Header>

			<DonationModal.Content>
				<DonationModal.Content.Panel>
					<div className="w-full bg-gray-200 animate-pulse rounded-lg n3o-widget-donation-form-skeleton__panel-image" />

					<DonationModal.Content.PanelContent>
						<DonationModal.Content.Title>
							<div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded n3o-widget-donation-form-skeleton__panel-title" />
						</DonationModal.Content.Title>
						<DonationModal.Content.Description>
							<span className="space-y-2 block n3o-widget-donation-form-skeleton__panel-description">
								<span className="w-full h-4 bg-gray-200 animate-pulse rounded block" />
								<span className="w-5/6 h-4 bg-gray-200 animate-pulse rounded block" />
								<span className="w-2/3 h-4 bg-gray-200 animate-pulse rounded block" />
							</span>
						</DonationModal.Content.Description>
					</DonationModal.Content.PanelContent>
				</DonationModal.Content.Panel>

				<DonationModal.Content.Body>
					<FormSkeleton />
				</DonationModal.Content.Body>
			</DonationModal.Content>

			<DonationModal.Footer>
				<div className="w-48 h-4 bg-gray-200 animate-pulse rounded mx-auto n3o-widget-donation-form-skeleton__footer" />
			</DonationModal.Footer>
		</DonationModal.Content.Container>
	);
}

export function FormSkeleton(){
  return (
		<FormContainer className="n3o-widget-form-skeleton">
			<div className="flex-1 n3o-widget-form-skeleton__content">
				{/* Donation Form Header with icon + label on left & change button on right */}
				<DonationFormHeader>
					<DonationFormHeader.TitleIcon>
						<div className="size-8 rounded bg-gray-200 animate-pulse n3o-widget-form-skeleton__header-icon" />
					</DonationFormHeader.TitleIcon>
					<DonationFormHeader.Title title="" description="" />
					<DonationFormHeader.Action onClick={() => {}}>
						<span className="px-3 py-2 bg-gray-200 animate-pulse rounded text-sm font-medium inline-block n3o-widget-form-skeleton__header-action">
							<span className="w-12 h-4 bg-gray-300 animate-pulse rounded inline-block" />
						</span>
					</DonationFormHeader.Action>
				</DonationFormHeader>

				<FormContainer.Body>
					{/* Frequency Selection */}
					<div className="flex gap-2 mb-6 n3o-widget-form-skeleton__frequency">
						<div className="flex-1 h-10 bg-gray-900 rounded-lg animate-pulse n3o-widget-form-skeleton__frequency-selected" />
						<div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse n3o-widget-form-skeleton__frequency-option" />
					</div>

					{/* Donation Amounts */}
					<div className="space-y-3 n3o-widget-form-skeleton__amounts">
						<div className="w-24 h-5 bg-gray-200 animate-pulse rounded n3o-widget-form-skeleton__amounts-label" />
						<div className="grid grid-cols-1 gap-3 n3o-widget-form-skeleton__amounts-grid">
							{[1, 2, 3].map((index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg n3o-widget-form-skeleton__amount-option"
								>
									<div className="flex items-center gap-3">
										<div className="text-right">
											<div className="w-12 h-6 bg-gray-200 animate-pulse rounded mb-1" />
											<div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Custom Amount Input */}
					<div className="space-y-2 n3o-widget-form-skeleton__custom-amount">
						<div className="relative">
							<div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg n3o-widget-form-skeleton__custom-amount-input" />
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-5 bg-gray-300 animate-pulse rounded n3o-widget-form-skeleton__custom-amount-addon" />
						</div>
					</div>

					{/* Fund Dimensions */}
					<div className="space-y-2 n3o-widget-form-skeleton__fund-dimensions">
						<div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg n3o-widget-form-skeleton__fund-dimension" />
					</div>

					{/* Checkbox */}
					<div className="flex items-center gap-2 n3o-widget-form-skeleton__checkbox">
						<div className="w-4 h-4 bg-gray-200 animate-pulse rounded n3o-widget-form-skeleton__checkbox-input" />
					</div>

					{/* Donate Button */}
					<div className="w-full h-12 bg-gray-400 animate-pulse rounded-lg n3o-widget-form-skeleton__donate-button" />
				</FormContainer.Body>
			</div>
		</FormContainer>
	);
}
