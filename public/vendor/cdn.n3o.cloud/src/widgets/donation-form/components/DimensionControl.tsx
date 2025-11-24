import { CheckboxDropdown } from '@n3oltd/n3o-ui-components';
import { useTranslation } from '@/i18n';
import { DimensionFilterData } from '../utils/dimensionFilters';
import { PublishedFundStructureKey } from '../types';

interface DimensionControlProps {
  dimensionData: DimensionFilterData;
  currentValue: string | undefined;
  onValueChange: (dimensionName: PublishedFundStructureKey, value: string) => void;
  onToggleChange: (dimensionName: PublishedFundStructureKey, checked: boolean) => void;
}

export function DimensionControl({
  dimensionData,
  currentValue,
  onValueChange,
  onToggleChange
}: DimensionControlProps) {
  const { formatMessage } = useTranslation();
  const { dimensionName, dimension, isDropdown, options } = dimensionData;
  
  return (
    <CheckboxDropdown.Root
      className="px-0"
      isSelected={currentValue === dimension?.view?.toggle?.onValue}
      onChange={() => {}}
      onToggle={(checked) => onToggleChange(dimensionName, checked)}
      selectedOption={currentValue || ''}
      setSelectedOption={(value: string) => onValueChange(dimensionName, value)}
      options={options}
    >
      {!isDropdown ? (
        <CheckboxDropdown.Checkbox
          label={dimension.view?.toggle?.label!}
        />
      ) : null}
      {isDropdown ? (
        <CheckboxDropdown.Combobox
          placeholder={formatMessage('donation.form.search.placeholder', { dimension: dimension.name! })}
          searchPlaceholder={formatMessage('donation.form.search.placeholder', { dimension: dimension.name! })}
          noResultsText={formatMessage('donation.form.search.not.found', { dimension: dimension.name! })}
        />
      ) : null}
    </CheckboxDropdown.Root>
  );
}
