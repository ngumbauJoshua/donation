import React from "react";
import { useTranslation } from "@/i18n";
import { CheckboxDropdown, CounterInput, PriceOption } from "@n3oltd/n3o-ui-components";
import { FundDimension } from "../FundDimension";
import { DurationOptions } from "./DurationOptions";
import { SponsorshipComponents } from "./SponsorshipComponents";
import { DonationFrequency } from "../DonationFrequency";
import { ServerError } from "@/common/components/Error";
import { convertAmountToDisplay, ExtendedCurrency } from "@/helpers/CurrencyConverter";
import { PublishedFundStructure } from "@n3oltd/karakoram.connect.sdk.types";
import { ConnectPreAcquireBeneficiariesReq, Currency, PublishedCommitmentDuration, PublishedFundDimensionValues, PublishedSponsorshipSchemeComponent, PublishedSponsorshipSchemeFundDimensionOptions, SponsorshipCommitmentType } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { GiftType, PublishedDesignationFundDimensions } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedFundStructureKey } from "../../types";
import { usePreAquireBeneficiary } from "../../hooks/usePreAquireBeneficiary";
import { SponsorshipCommitmentDuration } from "@n3oltd/karakoram.cart.sdk.connect";
import { SponsorshipFormState } from "../../hooks/useSponsorshipForm";
import { SetState } from "@/hooks/useSetState";
import { calculateCost } from "../../helpers/sponsorshipCost";

const noop = () => {};

type Props = {
  components: PublishedSponsorshipSchemeComponent[] | undefined;
  currency: ExtendedCurrency;
  designationFundDimensions: PublishedDesignationFundDimensions | undefined;
  durations: PublishedCommitmentDuration[];
  fundDimensions: PublishedFundDimensionValues;
  fundDimensionOptions: PublishedSponsorshipSchemeFundDimensionOptions | undefined;
  fundStructure: PublishedFundStructure | undefined;
	frequency: string;
  formState: SponsorshipFormState;
	givingTypes?: GiftType[] | undefined;
  locations?: string[] | undefined;
  isValid?: boolean;
  uiConfig?: any;
  schemeId?: string | undefined;
	onFrequencyChange: (value: string) => void;
  onFundDimensionChange: (dimension: string, value: string) => void;
  setFormState: SetState<SponsorshipFormState>;
  onSponsorshipComponentToggle: (componentName: string, enabled: boolean) => void;
  onSponsorshipComponentAmountChange: (componentName: string, amount: number) => void;
  preview?: boolean;
};

export const DimensionAndQuantityStep = ({
  currency,
  components,
  designationFundDimensions,
  durations,
  fundDimensions,
	fundDimensionOptions,
  fundStructure,
	frequency,
  formState,
	givingTypes,
  locations,
  isValid: hasValidQuantityAndDimensions,
  schemeId,
  uiConfig,
  setFormState,
  onFundDimensionChange,
	onFrequencyChange,
  onSponsorshipComponentToggle,
  onSponsorshipComponentAmountChange,
  preview = false,
}: Props) => {
  
  const { formatMessage, formatCurrency } = useTranslation();

  const { preAcquire: preAquireBeneficiary, error: preAquireError, isLoading } = usePreAquireBeneficiary({
    enabled: !preview,
    onSuccess: (res) => {
      setFormState({ selectedBeneficiaries: res?.beneficiaries || [], alternativeIds: res?.alternativeIds || []});
    }
  });


  React.useEffect(() => {
    if (!schemeId || !hasValidQuantityAndDimensions || preview) return;

    const hasEnabledComponent = Object.values(formState.sponsorshipComponents || {}).some(c => c.enabled);
    if (!hasEnabledComponent) return;

    const req: ConnectPreAcquireBeneficiariesReq = {
      currency: currency.code as Currency,
      quantity: formState.sponsorshipQuantity,
      commitmentDuration: formState.sponsorshipDuration?.id! as SponsorshipCommitmentDuration,
      commitmentType: frequency === GiftType.OneTime ? SponsorshipCommitmentType.FixedTerm : SponsorshipCommitmentType.OpenEnded,
      criteria: {
        location: formState.location || undefined,
        components: Object.entries(formState.sponsorshipComponents)
            .filter(([, comp]) => comp.enabled)
            .map(([name, component]) => {
              return {
                name: name,
                amount: component.amount,
                quantity: 1 // for quantity for components will be always 1, it covers 99% of use cases. If needed in future we will add UI to set quantity per component
              }
        })
      }
    };

    preAquireBeneficiary(schemeId, req);
  }, [
			schemeId,
			fundDimensions, 
			currency, 
			frequency, 
      hasValidQuantityAndDimensions,
      formState.location,
      formState.sponsorshipComponents,
      formState.sponsorshipDuration,
      formState.sponsorshipQuantity,
			preAquireBeneficiary,
      preview]);

  const renderFundDimension = (dimension: PublishedFundStructureKey) => {
		const fundDimension = fundStructure?.[dimension];
		const designationFundDimension = designationFundDimensions?.[dimension];
		const fundDimensionOption = fundDimensionOptions?.[`${dimension}Mapping`];

		return (
			<FundDimension
				key={dimension}
				dimension={dimension}
				fundDimension={fundDimension}
				fundDimensionOption={fundDimensionOption}
				designationFundDimension={designationFundDimension}
				fundDimensions={fundDimensions}
				onFundDimensionChange={onFundDimensionChange}
			/>
		);
	};

  const cost = calculateCost(formState);

	return (
    <div className="space-y-4">
      <DonationFrequency
				giftTypes={givingTypes}
				frequency={frequency}
				onFrequencyChange={(value) => {
          onFrequencyChange(value);
          if (value === GiftType.Recurring) {
            setFormState({ sponsorshipDuration: { id: '_1', months: 1 } });
          }
          
          if (value === GiftType.OneTime) {
            setFormState({ sponsorshipDuration: durations[0] });
          }
        }}
			/>
      <CheckboxDropdown.Root
        className="px-0 !mt-0"
        isSelected={false}
        onChange={noop}
        onToggle={noop}
        selectedOption={formState.location || ""}
        setSelectedOption={(value: string) =>
          setFormState({ location: value })
        }
        options={locations?.filter(val => !!val)?.map((loc) => ({ id: loc, name: loc })) || []}
      >
        <CheckboxDropdown.Combobox
					placeholder={formatMessage("donation.form.sponsorship.location")}
					searchPlaceholder={formatMessage("donation.form.sponsorship.location")}
					noResultsText={formatMessage("common.noResults")}
        />
      </CheckboxDropdown.Root>
      <h2 className="text-sm !mt-0">
        {formatMessage("donation.form.sponsorship.sponsor.beneficiaries")}
      </h2>
      <CounterInput
        defaultValue={formState.sponsorshipQuantity}
        min={1}
        onChange={(value: number) => {
          setFormState({ sponsorshipQuantity: value });
        }}
      >
        <CounterInput.Controls>
          <CounterInput.DecreaseButton />
          <CounterInput.Display />
          <CounterInput.IncreaseButton />
        </CounterInput.Controls>
      </CounterInput>

      {!uiConfig?.hideFundDimension1 && renderFundDimension("dimension1")}
      {!uiConfig?.hideFundDimension2 && renderFundDimension("dimension2")}
      {!uiConfig?.hideFundDimension3 && renderFundDimension("dimension3")}
      {!uiConfig?.hideFundDimension4 && renderFundDimension("dimension4")}
			
			{hasValidQuantityAndDimensions ? 
			<>
      <hr className="border-t border-gray-300 my-4" />
      {frequency === GiftType.OneTime ? (<DurationOptions 
        defaultValue={formState.sponsorshipDuration?.id!}
        heading={formatMessage("donation.form.sponsorship.duration")}
        durations={durations}
        onDurationChange={(duration) => setFormState({ sponsorshipDuration: duration })} />
      ) : null}
      
      <SponsorshipComponents 
        components={components}
        currency={currency}
        sponsorshipComponents={formState.sponsorshipComponents}
        onComponentToggle={onSponsorshipComponentToggle}
        onComponentAmountChange={onSponsorshipComponentAmountChange}
      />
			</> : null}

     {cost ? ( <PriceOption
        optionId={formState.sponsorshipDuration?.id!}
        isSelected={false}
        onSelect={noop}
      >
        <PriceOption.Content>
          <PriceOption.Header>
            <div className="flex items-baseline gap-1">
              <PriceOption.Price>
                {convertAmountToDisplay(cost.total, currency) !== null ? formatCurrency(convertAmountToDisplay(cost.total, currency)!, currency.code) : ''}
              </PriceOption.Price>
              {formState.sponsorshipDuration?.months === 1 ? (
                <PriceOption.Period>
                  /{formatMessage("common.month")}
                </PriceOption.Period>
              ) : null}
            </div>
            <PriceOption.Duration>{formState.sponsorshipDuration?.months === 1 ? formatMessage("common.monthly") : formState.sponsorshipDuration?.name}</PriceOption.Duration>
          </PriceOption.Header>
          <PriceOption.Description>
            {formatMessage("donation.form.sponsorship.x.beneficiary", { num: formState.sponsorshipQuantity })}
          </PriceOption.Description>
					<PriceOption.Description>
						{formatMessage("donation.form.sponsorship.per.beneficiary", { 
							total: cost.hasDiffMinMax ?
                `${formatCurrency(convertAmountToDisplay(cost.min, currency)!, currency.code)} - ${formatCurrency(convertAmountToDisplay(cost.max, currency)!, currency.code)}` 
                : formatCurrency(convertAmountToDisplay(cost.min, currency)!, currency.code),
							duration: formState.sponsorshipDuration?.months === 1 ? '' : formState.sponsorshipDuration?.name! })}
					</PriceOption.Description>
          
        </PriceOption.Content>
      </PriceOption>) : null}
      {isLoading ? (
        <div className="text-sm text-muted-foreground">{formatMessage("donation.form.sponsorship.cost.calculation")}</div>
      ) : null}

      {preAquireError ? (
        <ServerError error={preAquireError} />
      ) : null}
    </div>
  );
};
