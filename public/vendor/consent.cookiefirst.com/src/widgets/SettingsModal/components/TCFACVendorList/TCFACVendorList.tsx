import useTranslation from "hooks/useTranslation";
import { FunctionComponent } from "preact";
import { VendorTypes } from "helpers/tcf/TCFConsentProvider/types";
import { useMemo } from "preact/hooks";
import { IFilterCategory } from "components/Filter";
import useAppState from "hooks/useAppState";
import useTCFUserConsent from "hooks/useTCFUserConsent";
import { VENDORS_FILTER_CATEGORIES } from "constants/vendors";
import { ITCFGatpVendor } from "types/tcf";
import classNames from "helpers/classNames";
import styles from "./TCFACVendorList.module.scss";
import { TEXT_BOLD } from "styles/bootstrap";
import { FALSE } from "constants/primitives";
import VendorSettings from "components/VendorSettings";

const cx = classNames(styles);
const TCFACVendorList: FunctionComponent<ITCFACVendorListProps> = ({
    filterCategories,
    searchPhrase
}) => {
    const { t } = useTranslation();
    const { gatp, widgetConfig } = useAppState();
    const { isGatpVendorAccepted, toggleGatpVendor } = useTCFUserConsent();

    const filteredVendors = useMemo(() => {
        // Check if gatp is already loaded
        if (!gatp) {
            return [];
        }

        // Check if entire filter for google is disabled
        const googleCatFilter = filterCategories.find(cat => cat.id === VENDORS_FILTER_CATEGORIES);
        if (googleCatFilter) {
            if (!googleCatFilter.values.find(item => item.id === VendorTypes.GOOGLE && item.isVisible)) {
                return []
            }
        }

        let vendors = gatp.filter(vendor =>
            widgetConfig.acVendors.includes(parseInt(String(vendor.provider_id)))
        );

        if (searchPhrase !== "" && vendors) {
            vendors = vendors.filter((vendor) => {
                return vendor.provider_name.toLowerCase().includes(searchPhrase.toLowerCase())
            })
        }

        return vendors;
    }, [searchPhrase, filterCategories, gatp, widgetConfig.acVendors]);

    return (
        <div class={cx('py-1')}>
            {filteredVendors.length > 0 && <div class={cx(TEXT_BOLD)}><h3>{t(`vendors.${VendorTypes.GOOGLE}_vendors`)}</h3></div>}
            {gatp && filteredVendors.map((item: ITCFGatpVendor) => {
                return (
                    <VendorSettings
                        key={item.provider_id}
                        disabled={FALSE}
                        isAccepted={isGatpVendorAccepted(item)}
                        title={item.provider_name}
                        script={item}
                        onToggle={() => { toggleGatpVendor(item, gatp) }}
                    />
                );
            })}
        </div>
    );
};

export interface ITCFACVendorListProps {
    filterCategories: IFilterCategory[]
    searchPhrase: string,
}


export default TCFACVendorList;
