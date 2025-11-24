import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useTranslation } from '@/i18n';
import {Button, Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, EntityContainer, EntityHeader, EntityList, EntityOverlay, EntityPanel, InfoDisplayCard} from '@n3oltd/n3o-ui-components';
import { useGetAlternativeBeneficiaries } from '../../hooks/useGetAlternativeBeneficiaries';
import { PublishedBeneficiary } from '@n3oltd/karakoram.sponsorships.sdk.connect';
import { convertAmountToDisplay } from '@/helpers/CurrencyConverter';
import { calculateCostPerBeneficiary } from '../../helpers/sponsorshipCost';

type Props = {
	handleBack: () => void;
	onBeneficiarySelect: (beneficiary: PublishedBeneficiary) => void;
	alternativeIds: string[];
	schemeId: string;
  formState: any;
  targetCurrency: any;
}

export function BeneficiarySearchModal({ handleBack, onBeneficiarySelect, schemeId, alternativeIds, formState, targetCurrency }: Props) {
	const [selectedBeneficiary, setSelectedBeneficiary] = React.useState<PublishedBeneficiary | null>(null);
	const { formatMessage, formatCurrency } = useTranslation();

	const { data, loading: isLoading } = useGetAlternativeBeneficiaries(schemeId, alternativeIds);

	const handleItemSelect = (item: any) => {
		setSelectedBeneficiary(item);
	}

	const isEmpty = false;
 
 return (
   <Drawer>
     <EntityOverlay>
       <EntityOverlay.Container>
         <EntityOverlay.Content>
           <EntityPanel isVisible={!!selectedBeneficiary}>
             <EntityPanel.Content>
               <EntityPanel.Title className="hidden sm:block">
                 {selectedBeneficiary?.name || ""}
               </EntityPanel.Title>
               <EntityPanel.Description>
                 <span
                   dangerouslySetInnerHTML={{
                     __html:
                       selectedBeneficiary?.embedViews?.caption || "",
                   }}
                 ></span>
               </EntityPanel.Description>
               <EntityPanel.ContentHTML>
                <div className='flex'>
                   <div
                    className='flex-1'
                    dangerouslySetInnerHTML={{
                     __html:
                       selectedBeneficiary?.embedViews?.profile || "",
                   }}
                 />
                </div>
                 
                 <div className="flex justify-start pt-4">
                   <Button
                     className="flex items-center gap-2"
                     onClick={() => {
                       if (selectedBeneficiary) {
                         onBeneficiarySelect(selectedBeneficiary);
                       }
                     }}
                   >
                     <CheckCircle className="w-4 h-4" />
                     {formatMessage("donation.form.sponsorship.choose")}
                   </Button>
                 </div>
               </EntityPanel.ContentHTML>
             </EntityPanel.Content>
           </EntityPanel>
          <EntityContainer className="flex flex-col h-full">
             <EntityHeader searchValue="" onSearchChange={() => {}}>
               <EntityHeader.Row>
                 <div className="flex items-center gap-2">
                   <EntityHeader.BackButton onClick={handleBack} />
                 </div>
                 <EntityHeader.Title>
                   {formatMessage("common.button.back")}
                 </EntityHeader.Title>
               </EntityHeader.Row>
             </EntityHeader>
             <EntityList.Container className="flex-1 overflow-hidden">
               {isLoading ? (
                 <EntityList.EmptyMessage>
                   {formatMessage("common.loading")}
                 </EntityList.EmptyMessage>
               ) : isEmpty ? (
                 <EntityList.EmptyMessage>
                   {formatMessage("common.noResults")}
                 </EntityList.EmptyMessage>
               ) : (
                 <EntityList.ItemList
                  className='!divide-y-0'
                   items={(data as any) || []}
                   renderItem={(item: any) => {
                     const isSelected = selectedBeneficiary?.id === item.id;

                     return (
                       <div
                         key={item.id}
                         role="button"
                         tabIndex={0}
                         className="px-4 py-2 focus:outline-none transition-colors duration-150 group"
                         onClick={() => handleItemSelect(item)}
                         onKeyDown={(e) => {
                           if (e.key === "Enter" || e.key === " ") {
                             e.preventDefault();
                             handleItemSelect(item);
                           }
                         }}
                       >
                         <InfoDisplayCard
                           className={`w-full py-2 transition-colors duration-150 group-hover:bg-muted group-focus:bg-muted ${isSelected ? "border-0 bg-primary/10 ring-2 ring-ring" : ""}`}
                         >
                           <InfoDisplayCard.Content>
                             <InfoDisplayCard.Title className="text-lg font-semibold">
                               {item.name}
                             </InfoDisplayCard.Title>
                             <InfoDisplayCard.Description className="text-sm text-gray-600">
                               {formatMessage(
                                 "donation.form.sponsorship.years.old",
                                 {
                                   gender: item.individual?.gender || "",
                                   years: item.individual?.age || "",
                                 },
                               )}
                             </InfoDisplayCard.Description>
                           </InfoDisplayCard.Content>
                           <InfoDisplayCard.Badge>
                            <span> {formatCurrency(convertAmountToDisplay(calculateCostPerBeneficiary(item, formState), targetCurrency) || 0, targetCurrency?.code!)} </span>
                           </InfoDisplayCard.Badge>
                           <DrawerTrigger className="block sm:hidden" asChild>
                             <Button 
                               variant="outline" 
                               size="sm"
                             >
                               {formatMessage("common.info")}
                             </Button>
                           </DrawerTrigger>
                         </InfoDisplayCard>
                       </div>
                     );
                   }}
                 />
               )}
             </EntityList.Container>
           </EntityContainer>
         </EntityOverlay.Content>
       </EntityOverlay.Container>
     </EntityOverlay>
     
     <DrawerContent className="max-h-[95svh]">
       <div className="mx-auto w-full max-w-sm overflow-y-auto px-4">
         <DrawerHeader className="flex justify-between items-center p-4">
           <DrawerTitle className="text-lg font-semibold">
             {selectedBeneficiary?.name || ""}
           </DrawerTitle>
           <DrawerClose asChild>
             <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
               <X className="h-4 w-4" />
             </Button>
           </DrawerClose>
         </DrawerHeader>

         <div className="p-4 overflow-y-auto text-sm flex-1">
           <DrawerDescription className="text-gray-700 text-sm mb-4">
             <span
               dangerouslySetInnerHTML={{
                 __html: selectedBeneficiary?.embedViews?.caption || "",
               }}
             ></span>
           </DrawerDescription>

           {/* Profile Information from embedViews.profile */}
           <div
             dangerouslySetInnerHTML={{
               __html: selectedBeneficiary?.embedViews?.profile || "",
             }}
           />
         </div>

         <DrawerFooter className="p-4">
           <Button 
             className="w-full" 
             size="lg"
             onClick={() => {
               if (selectedBeneficiary) {
                 onBeneficiarySelect(selectedBeneficiary);
               }
             }}
           >
             <CheckCircle className="w-4 h-4 mr-2" />
             {formatMessage("donation.form.sponsorship.choose")}
           </Button>
         </DrawerFooter>
       </div>
     </DrawerContent>
   </Drawer>
 );
}