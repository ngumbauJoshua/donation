import { Checkbox, Input } from "@n3oltd/n3o-ui-components";
import { useTranslation } from "@/i18n";
import { ExtendedCurrency } from "../..";
import { PublishedSponsorshipSchemeComponent } from "@n3oltd/karakoram.sponsorships.sdk.connect"


type Props = {
  components?: PublishedSponsorshipSchemeComponent[],
  currency: ExtendedCurrency,
  sponsorshipComponents: Record<string, { enabled: boolean; amount: number }>,
  onComponentToggle: (componentName: string, enabled: boolean) => void,
  onComponentAmountChange: (componentName: string, amount: number) => void
}

export function SponsorshipComponents({ components, currency, sponsorshipComponents, onComponentToggle, onComponentAmountChange }: Props) {
  const { formatMessage, formatCurrency } = useTranslation();

  const toggleComponent = (name: string, enabled: boolean) => {
    onComponentToggle(name, enabled);
  }

  const setAmount = (key: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    onComponentAmountChange(key, numValue);
  }

  if (components === undefined || components.length === 0) {
    return null;
  }

  return (
    <div className="n3o-sponsorship-components">
      <table className="w-full border-collapse n3o-sponsorship-components__table">
        <thead>
          <tr className="text-left text-sm border-b n3o-sponsorship-components__header-row">
            <th className="pb-2 w-12 pl-12 n3o-sponsorship-components__header-cell" colSpan={2}>
              {formatMessage("donation.form.sponsorship.component")}
            </th>
            <th className="pb-2 w-24 n3o-sponsorship-components__header-cell">{formatMessage('common.amount')}</th>
          </tr>
        </thead>
        <tbody>
          {components.map((item) => (
            <tr key={item.name} className="border-b last:border-0 n3o-sponsorship-components__row">
              <td className="py-3 pr-3 w-12 n3o-sponsorship-components__checkbox-cell">
                {item.required ? (
                  <Checkbox checked disabled className="n3o-sponsorship-components__checkbox" />
                ) : (
                  <Checkbox
                    checked={sponsorshipComponents[item.name!]?.enabled || false}
                    onCheckedChange={(e) => toggleComponent(item.name!, e === true)}
                    className="n3o-sponsorship-components__checkbox"
                  />
                )}
              </td>
              <td className="py-3 pr-6 n3o-sponsorship-components__name-cell">{item.name}</td>
              <td className="py-3 w-24 n3o-sponsorship-components__amount-cell">
                {item.pricing?.price?.locked ? (
                  <span className="n3o-sponsorship-components__locked-amount">
                    {formatCurrency(
                      sponsorshipComponents[item.name!]?.amount || item.pricing?.price?.amount || 0,
                      currency.code,
                    )}
                  </span>
                ) : (
                    <div className="relative n3o-sponsorship-components__amount-input-wrapper">
                      <Input
                        type="number"
                        className="peer ps-6 n3o-sponsorship-components__amount-input"
                        min={1}
                        value={sponsorshipComponents[item.name!]?.amount || item.pricing?.price?.amount || 0}
                        onChange={(e) => setAmount(item.name!, e.target.value)}
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50 n3o-sponsorship-components__currency-symbol">
                        {currency.symbol}
                      </span>
                    </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
