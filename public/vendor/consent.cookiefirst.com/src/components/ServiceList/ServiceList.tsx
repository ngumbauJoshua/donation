import useTranslation from "hooks/useTranslation";
import { FunctionComponent } from "preact";
import { VendorTypes } from "helpers/tcf/TCFConsentProvider/types";
import { useMemo } from "preact/hooks";
import { IFilterCategory } from "components/Filter";
import useAppState from "hooks/useAppState";
import { VENDORS_FILTER_CATEGORIES } from "constants/vendors";
import useUserConsent from "hooks/useUserConsent";
import VendorSettings from "components/VendorSettings";
import includes from "helpers/includes";
import { NECESSARY } from "constants/categories";
import classNames from "helpers/classNames";
import styles from "./ServiceList.module.scss";
import { TEXT_BOLD } from "styles/bootstrap";
import { CONSENT_TYPE_CATEGORY } from "types/consent";
import { NUMBER_0 } from "constants/numbers";

const cx = classNames(styles);

const ServiceList: FunctionComponent<IServiceListProps> = ({
  filterCategories,
  searchPhrase
}) => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();
  const {
    widgetConfig: { consentType },
  } = useAppState();
  const { isScriptAccepted, toggleScript } = useUserConsent();

  const filteredVendors = useMemo(() => {
    // Check if entire filter for services is disabled
    const catFilter = filterCategories.find(cat => cat.id === VENDORS_FILTER_CATEGORIES);
    if (catFilter) {
      if (!catFilter.values.find(item => item.id === VendorTypes.NON_IAB && item.isVisible)) {
        return []
      }
    }

    let scripts = widgetConfig.scripts

    if (searchPhrase !== "") {
      scripts = scripts.filter((scripts) => {
        return scripts.name.toLowerCase().includes(searchPhrase.toLowerCase())
      })
    }

    return scripts;
  }, [searchPhrase, filterCategories, widgetConfig]);

  return (
    <div class={cx('py-1')}>
      {filteredVendors.length > NUMBER_0 && <h3 class={cx(TEXT_BOLD)}>{t(`vendors.${VendorTypes.NON_IAB}_vendors`)}</h3>}
      {filteredVendors && filteredVendors.map((script, index) => {
        <div class={cx("mb-2", TEXT_BOLD)}>
          <h3>{t(`vendors.${VendorTypes.NON_IAB}_vendors`)}</h3>
        </div>
        {
          const isAlwaysAccepted = includes(script.categories, NECESSARY);
          const isAccepted = isScriptAccepted(script);

          return (
            <VendorSettings
              key={index}
              disabled={isAlwaysAccepted || consentType === CONSENT_TYPE_CATEGORY}
              isAccepted={isAlwaysAccepted || isAccepted}
              title={script.name}
              script={script}
              onToggle={() => {
                toggleScript(script);
              }}
            />
          );
        }

      })}
    </div>
  );
};

export interface IServiceListProps {
  filterCategories: IFilterCategory[]
  searchPhrase: string,
}

export default ServiceList;
