import { CheckboxDropdown } from "@n3oltd/n3o-ui-components";
import { FundDimensionSelector, PublishedFundDimension } from "@n3oltd/karakoram.connect.sdk.types";
import { PublishedDesignationFundDimension } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedFundDimensionMapping } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { PublishedFundStructureKey } from "../types";

interface FundDimensionProps {
  dimension: PublishedFundStructureKey;
  fundDimension: PublishedFundDimension | undefined;
  fundDimensionOption?: PublishedFundDimensionMapping | undefined;
  designationFundDimension: PublishedDesignationFundDimension | undefined;
  fundDimensions: Record<string, any>;
  onFundDimensionChange: (dimension: string, value: string) => void;
}

export function FundDimension({ 
  dimension,
  fundDimension,
  fundDimensionOption,
  designationFundDimension,
  fundDimensions,
  onFundDimensionChange
}: FundDimensionProps) {


  const shouldHideDimension = !fundDimension?.isActive || !!designationFundDimension?.fixed;
  const shouldHideIfSingleOption = !!(designationFundDimension?.options?.length && designationFundDimension?.options?.length < 2);

  if (shouldHideDimension || shouldHideIfSingleOption || fundDimensionOption?.enabled) {
    return null;
  }

  const isDropdown = fundDimension.view?.selector === FundDimensionSelector.Dropdown;
  const selectedValue = fundDimensions[dimension] || "";

  const options = designationFundDimension?.options?.map((opt: any) => ({
    id: opt,
    name: opt
  })) || [];

  return (
    <CheckboxDropdown.Root
      className="bg-gray-100"
      isSelected={fundDimensions[dimension] === fundDimension?.view?.toggle?.onValue!}
      onChange={(value: string) => onFundDimensionChange(dimension, value)}
      onToggle={(checked) => {
        if (fundDimension.view?.selector === FundDimensionSelector.Toggle) {
          onFundDimensionChange(dimension, checked ? fundDimension.view.toggle?.onValue! : fundDimension.view.toggle?.offValue!);
        }
      }}
      selectedOption={selectedValue}
      setSelectedOption={(value: string) => onFundDimensionChange(dimension, value)}
      options={options}
    >
      {!isDropdown ? <CheckboxDropdown.Checkbox label={fundDimension.view?.toggle?.label!} /> : null}
      {isDropdown ? <CheckboxDropdown.Combobox /> : null}
    </CheckboxDropdown.Root>
  );
}