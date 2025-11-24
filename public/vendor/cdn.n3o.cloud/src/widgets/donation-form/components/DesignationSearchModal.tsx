import React from 'react';
import { ChevronRight, X } from 'lucide-react';
import {Button, Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, EntityCard, EntityContainer, EntityHeader, EntityList, EntityOverlay, EntityPanel} from '@n3oltd/n3o-ui-components';
import { useDesignationNavigation } from '../hooks/useDesignationNavigation';
import { useSearchDebounce } from '../hooks/useSearchDebounce';
import { getDimensionFilters } from '../utils/dimensionFilters';
import { createDimensionHandlers } from '../utils/dimensionHandlers';
import { createModalStateUtils } from '../utils/modalStateUtils';
import { DimensionControl } from './DimensionControl';
import { useTranslation } from '@/i18n';
import { useEnvironmentContext } from '@/api/common/contexts/EnvironmentProvider';
import AppManager from '@/api/common/clients/AppManager';
import { createFiltersWithClearedDimensions } from '../utils/dimensionUtils';
import { HALF_SECOND } from '@/common/constants/TimeDurations';
import { NAVIGATION_LEVELS, MENU_TYPES } from '../types/navigation.types';
import { PublishedDesignation } from '@n3oltd/karakoram.platforms.sdk.types';
import { PublishedFundStructure } from '@n3oltd/karakoram.connect.sdk.types';

export type DesignationSearchModalProps = {
  isOpen: boolean;
	campaignId?: string;
	onClose?: () => void;
	onDesignationSelect?: (designation: PublishedDesignation) => void;
	fundStructure: PublishedFundStructure | null
}


export function DesignationSearchModal({isOpen, campaignId, onClose, onDesignationSelect, fundStructure}: DesignationSearchModalProps) {
	const { formatMessage } = useTranslation();
	const env = useEnvironmentContext();
	
	const {
		navigationContext,
		currentItems,
		isLoading,
		isEmpty,
		handleItemSelect,
		handleBackNavigation,
		setNavigationContext,
		selectedCampaign,
		performSearch
	} = useDesignationNavigation({
		campaignId,
		onClose
	});

	const handleDebouncedSearch = useSearchDebounce(
		(searchText: string) => {
			setNavigationContext(prev => ({
				...prev,
				menuType: MENU_TYPES.Search,
				currentLevel: NAVIGATION_LEVELS.DESIGNATIONS
			}));
			performSearch({ text: searchText });
		},
		(searchText: string) => {
			setNavigationContext(prev => ({
				...prev,
				filters: {
					...prev.filters,
					searchValue: searchText,
				}
			}));
		},
		HALF_SECOND
	);

	React.useEffect(() => {
		AppManager.initialize(env);
	}, [env]);

	React.useEffect(() => {
		if (!isOpen) {
			setNavigationContext(prev => ({
				...prev,
				filters: {
					...createFiltersWithClearedDimensions(prev.filters),
				}
			}));
		}
	}, [isOpen, setNavigationContext]);


	const selectedDesignation = navigationContext.filters.selectedDesignation || null;


	const { getCurrentTitle, createClearSearchCriteria } = React.useMemo(() => createModalStateUtils(), []);
	
	const { handleDimensionToggle, handleDimensionValueChange } = React.useMemo(() => 
		createDimensionHandlers({
			navigationContext,
			setNavigationContext,
			performSearch
		}), 
		[navigationContext, setNavigationContext, performSearch]
	);

  React.useEffect(() => {
    if (!isOpen) {
      setNavigationContext((prev: any) => ({
        ...prev,
        filters: {
          ...prev.filters,
          searchValue: undefined,
          ...createFiltersWithClearedDimensions(prev.filters),
        }
      }));
    }
  }, [isOpen, setNavigationContext]);

	const handleSearchValueChange = (value: string) => {
		handleDebouncedSearch(value);
	}

	const clearSearchCriteria = createClearSearchCriteria(setNavigationContext);
	const dimensionFilters = getDimensionFilters(fundStructure);


  return (
    <Drawer>
      {isOpen && (
        <EntityOverlay>
        <EntityOverlay.Container>
          <EntityOverlay.Content>
            <Button
              onClick={onClose}
              className="absolute top-7 right-6 flex gap-4 text-white items-center rounded-full bg-transparent hover:bg-accent/10 z-10"
            >
              <span className="hidden sm:block opacity-50 text-xs">{formatMessage('common.close')}</span>
              <X className="h-6 w-6" />
            </Button>
            <EntityPanel isVisible={!!selectedDesignation}>
              <EntityPanel.Content>
                <EntityPanel.Image
                  src={selectedDesignation?.image || ""}
                  alt={selectedDesignation?.name || ""}
                  className="pointer-events-none"
                />
                <EntityPanel.Title className="hidden sm:block">
                  {selectedDesignation?.name || ""}
                </EntityPanel.Title>
                <EntityPanel.Description>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedDesignation?.shortDescription || "",
                    }}
                  ></span>
                </EntityPanel.Description>
                <EntityPanel.ContentHTML>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedDesignation?.longDescription || "",
                    }}
                  />
                </EntityPanel.ContentHTML>
              </EntityPanel.Content>
            </EntityPanel>
            <EntityContainer className="flex flex-col h-full">
              <EntityHeader
                searchValue={navigationContext.filters.searchValue || ""}
                onSearchChange={handleSearchValueChange}
              >
                <EntityHeader.Row>
                  <div className="flex items-center gap-2">
                    <EntityHeader.BackButton onClick={handleBackNavigation} />
                  </div>
                  <EntityHeader.Title>
                    {getCurrentTitle(
                      navigationContext,
                      selectedCampaign,
                      selectedDesignation,
                      formatMessage,
                    )}
                  </EntityHeader.Title>
                </EntityHeader.Row>
                <EntityHeader.Section>
                  <EntityHeader.SearchContainer>
                    <EntityHeader.SearchInput />
                    <EntityHeader.ResetButton onClick={clearSearchCriteria} />
                  </EntityHeader.SearchContainer>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {dimensionFilters.map((dimensionData) => (
                        <div key={dimensionData.dimensionName} className="mb-2">
                          <DimensionControl
                            dimensionData={dimensionData}
                            currentValue={
                              navigationContext.filters[
                                dimensionData.dimensionName
                              ]
                            }
                            onValueChange={handleDimensionValueChange}
                            onToggleChange={(dimensionName, checked) =>
                              handleDimensionToggle(
                                dimensionName,
                                checked,
                                dimensionData.dimension,
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </EntityHeader.Section>
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
                    items={currentItems as any}
                    renderItem={(item: any) => (
                      <EntityCard
                        selected={selectedDesignation?.id === item.id}
                        onSelect={() => handleItemSelect(item)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          {item.image && (
                            <EntityCard.Image
                              src={item.image}
                              alt={item.title}
                              className="size-12 rounded-md object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base truncate">
                              {item.title}
                            </div>
                          </div>
                          {item.hasChildren && (
                            <div className="flex-shrink-0 ml-auto text-gray-400">
                              <ChevronRight className="size-4" />
                            </div>
                          )}
                          <DrawerTrigger className="block sm:hidden" asChild>
                            <Button variant="outline">
															{formatMessage("common.info")}
														</Button>
                          </DrawerTrigger>
                        </div>
                      </EntityCard>
                    )}
                  />
                )}
              </EntityList.Container>
              {selectedDesignation && (
                <div className="p-4 border-t bg-background sticky bottom-0 z-10">
                  <Button
                    className="w-full"
                    onClick={() => {
                      onClose?.();
                      setNavigationContext((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, selectedDesignation: null },
                      }));
                      onDesignationSelect?.(selectedDesignation);
                    }}
                  >
                    {formatMessage("donation.form.select.designation", {
                      designation: selectedDesignation.name,
                    })}
                  </Button>
                </div>
              )}
            </EntityContainer>
          </EntityOverlay.Content>
        </EntityOverlay.Container>
      </EntityOverlay>
      )}
      <DrawerContent className="max-h-[85svh]">
        <div className="mx-auto w-full max-w-sm overflow-y-auto px-4">
          <DrawerHeader className="h-0 p-0">
            <DrawerTitle className="sr-only">
              {selectedDesignation?.name || ""}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedDesignation?.shortDescription || "",
                }}
              ></span>
            </DrawerDescription>
          </DrawerHeader>

          <EntityPanel.Content className="p-0">
            <EntityPanel.Image
              src={selectedDesignation?.image || ""}
              alt={selectedDesignation?.name || ""}
              className="pointer-events-none"
            />
            <EntityPanel.Title>{selectedDesignation?.name || ""}</EntityPanel.Title>
            <EntityPanel.Description>
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedDesignation?.shortDescription || "",
                }}
              ></span>
            </EntityPanel.Description>
            <EntityPanel.ContentHTML>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedDesignation?.longDescription || "",
                }}
              />
            </EntityPanel.ContentHTML>
          </EntityPanel.Content>

          <DrawerFooter className="sticky bottom-0 px-0 my-2 flex gap-4 bg-background">
            {selectedDesignation && (
              <div className="border-t">
                <Button
                  className="w-full"
                  onClick={() => {
                    onClose?.();
                    setNavigationContext((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, selectedDesignation: null },
                    }));
                    onDesignationSelect?.(selectedDesignation);
                  }}
                  size={"lg"}
                >
                  {formatMessage("donation.form.select.designation", {
                    designation: selectedDesignation.name,
                  })}
                </Button>
              </div>
            )}
            <DrawerClose asChild>
              <Button size={"lg"} variant="outline">
                {formatMessage("common.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}