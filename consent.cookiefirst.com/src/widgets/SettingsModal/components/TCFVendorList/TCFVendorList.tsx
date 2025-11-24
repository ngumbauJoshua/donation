import useTranslation from "hooks/useTranslation";
import { FunctionComponent } from "preact";
import {
  VendorTypes,
  TCFCategoryTypes,
} from "helpers/tcf/TCFConsentProvider/types";
import { useMemo } from "preact/hooks";
import { IFilterCategory } from "components/Filter";
import useAppState from "hooks/useAppState";
import useTCFUserConsent from "hooks/useTCFUserConsent";
import { TCF_AVAILABLE_FILTERS } from "helpers/tcf/constantsTCF";
import { VENDORS_FILTER_CATEGORIES } from "constants/vendors";
import classNames from "helpers/classNames";
import styles from "./TCFVendorList.module.scss";
import { TEXT_BOLD } from "styles/bootstrap";
import TCFVendorSettings from "../TCFVendorSettings";
import { FALSE, TRUE } from "constants/primitives";
import { NUMBER_0 } from "constants/numbers";

const cx = classNames(styles);

const TCFVendorList: FunctionComponent<ITCFTCFVendorListProps> = ({
  filterCategories,
  searchPhrase,
}) => {
  const { t } = useTranslation();
  const { gvl, tcfVendorsList } = useAppState();
  const {
    isVendorAccepted,
    toggleVendor,
    isVendorLegitimateInterestAccepted,
    toggleVendorLegitimateInterest,
  } = useTCFUserConsent();

  const filteredVendors = useMemo(() => {
    // Check if gvl is already loaded
    if (!gvl) {
      return [];
    }

    // Check if entire filter for tcf is disabled
    const tcfCatFilter = filterCategories.find(
      (cat) => cat.id === VENDORS_FILTER_CATEGORIES
    );
    if (tcfCatFilter) {
      if (
        !tcfCatFilter.values.find(
          (item) => item.id === VendorTypes.IAB && item.isVisible
        )
      ) {
        return [];
      }
    }

    let vendors = Object.entries(gvl.vendors);
    vendors = vendors.filter(([id]) => tcfVendorsList.includes(parseInt(id)));

    if (searchPhrase !== "") {
      vendors = vendors.filter(([, vendor]) => {
        return vendor.name.toLowerCase().includes(searchPhrase.toLowerCase());
      });
    }

    vendors = vendors.filter(([, vendor]) => {
      let shouldVendorBeVisible = TRUE;
      // Check all tcf related categories if vendor are part of any that is disabled
      TCF_AVAILABLE_FILTERS.forEach((tcfCatName) => {
        // Loop through ids of category values required by vendor
        const requiredValues = vendor[tcfCatName as keyof typeof vendor];
        if (requiredValues) {
          Object.values(requiredValues).forEach((valueID) => {
            // Check if such value is disabled in filters
            const categoryInFilter = filterCategories.find(
              (item) => item.id === tcfCatName
            );

            if (categoryInFilter) {
              if (
                !categoryInFilter.values.find(
                  (item) => item.id === String(valueID) && item.isVisible
                )
              ) {
                shouldVendorBeVisible = FALSE;
              }
            }
          });
        }
      });

      if (shouldVendorBeVisible) {
        return vendor;
      } else {
        return FALSE;
      }
    });

    return vendors;
  }, [gvl, searchPhrase, filterCategories, tcfVendorsList]);

  return (
    <div class={cx("py-1")}>
      {filteredVendors.length > NUMBER_0 && (
        <div class={cx("mb-2", TEXT_BOLD)}>
          <h3>{t(`vendors.${VendorTypes.IAB}_vendors`)}</h3>
        </div>
      )}
      {gvl &&
        filteredVendors.map(([id, vendor], index) => {
          // Enable legitimate interest for vendor only if such vendor require any of the legitimate interets
          const isLegitimateRequired = !!Object.values(gvl.vendors).find(
            (locVendor) =>
              locVendor.id === vendor.id &&
              locVendor.legIntPurposes.length > NUMBER_0
          );
          const prepareGvlData = {
            [TCFCategoryTypes.PURPOSES]: gvl.purposes,
            [TCFCategoryTypes.SPECIAL_PURPOSES]: gvl.specialPurposes,
            [TCFCategoryTypes.FEATURES]: gvl.features,
            [TCFCategoryTypes.SPECIAL_FEATURES]: gvl.specialFeatures,
            dataDeclaration: gvl.dataCategories,
          };
          return (
            <TCFVendorSettings
              key={`vendor-${id}-${index}`}
              id={id}
              gvlData={prepareGvlData}
              vendor={vendor}
              isAccepted={isVendorAccepted(vendor)}
              isLegitimateInterestRequired={isLegitimateRequired}
              isLegitimateInterestAccepted={
                isLegitimateRequired
                  ? isVendorLegitimateInterestAccepted(vendor)
                  : undefined
              }
              onToggle={() => {
                toggleVendor(vendor, gvl);
              }}
              onLegitimateInterestToggle={() => {
                toggleVendorLegitimateInterest(vendor, gvl);
              }}
            />
          );
        })}
    </div>
  );
};

export interface ITCFTCFVendorListProps {
  filterCategories: IFilterCategory[];
  searchPhrase: string;
}

export default TCFVendorList;
