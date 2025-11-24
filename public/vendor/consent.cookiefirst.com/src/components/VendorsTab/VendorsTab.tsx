import { type FunctionComponent } from "preact";
import Spinner from "components/Spinner";
import classNames from "helpers/classNames";
import styles from "./VendorsTab.module.scss";
import { useRef, useState } from "preact/hooks";
import {
  WITH_BG_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import useTranslation from "hooks/useTranslation";
import useAppState from "hooks/useAppState";
import { VendorTypes } from "helpers/tcf/TCFConsentProvider/types";
import Filter, { IFilterCategory, IFilterElement } from "components/Filter";
import { TCF_AVAILABLE_FILTERS } from "helpers/tcf/constantsTCF";
import TCFVendorList from "widgets/SettingsModal/components/TCFVendorList";
import { VENDORS_FILTER_CATEGORIES } from "constants/vendors";
import TCFACVendorList from "widgets/SettingsModal/components/TCFACVendorList";
import ServiceList from "components/ServiceList";
import { FALSE, NULL, TRUE } from "constants/primitives";
import { BORDER_OPACITY } from "styles/bootstrap";
import { NUMBER_0 } from "constants/numbers";

const cx = classNames(styles);

const VendorsTab: FunctionComponent = () => {
  const { widgetConfig, gvl } = useAppState();
  const { t, textDirection } = useTranslation();
  const [search, setSearch] = useState("");

  const calculateFilterBaseContent = (): IFilterCategory[] | [] => {
    const baseFilterContent: IFilterCategory[] = [];

    // Prepare main categories
    const mainCategories: IFilterCategory = {
      id: VENDORS_FILTER_CATEGORIES,
      label: t("vendors.types"),
      values: [],
    };

    if (widgetConfig.tcfEnabled) {
      mainCategories.values.push({
        id: VendorTypes.IAB,
        label: t(`vendors.${VendorTypes.IAB}_vendors`),
        category: VENDORS_FILTER_CATEGORIES,
        isVisible: TRUE,
      });
    }

    mainCategories.values.push({
      id: VendorTypes.NON_IAB,
      label: t(`vendors.${VendorTypes.NON_IAB}_vendors`),
      category: VENDORS_FILTER_CATEGORIES,
      isVisible: TRUE,
    });

    if (widgetConfig.tcfEnabled && widgetConfig.acEnabled) {
      mainCategories.values.push({
        id: VendorTypes.GOOGLE,
        label: t(`vendors.${VendorTypes.GOOGLE}_vendors`),
        category: VENDORS_FILTER_CATEGORIES,
        isVisible: TRUE,
      });
    }

    // Push to base filters
    baseFilterContent.push(mainCategories);

    // Prepare sub filters, more detailed filters
    if (widgetConfig.tcfEnabled && gvl) {
      TCF_AVAILABLE_FILTERS.forEach((catName) => {
        const category: IFilterCategory = {
          id: catName,
          label: t(`vendors.${catName}`),
          values: [],
        };

        const catValues = gvl[catName as keyof typeof gvl];
        if (catValues) {
          Object.entries(catValues).forEach(([index, value]) => {
            category.values.push({
              id: index,
              label: value.name,
              category: catName,
              isVisible: TRUE,
            });
          });
        }

        // Add to list of filters
        baseFilterContent.push(category);
      });
    }

    return baseFilterContent;
  };

  const [filterCategories, setFilterCategories] = useState(
    calculateFilterBaseContent()
  );

  const inputRef = useRef<HTMLInputElement | null>(NULL);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);

    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFilterChange = ({ id, category, isVisible }: IFilterElement) => {
    // Update right element/category based on filter change
    if (category) {
      const tempFilterCategories = [...filterCategories];

      // Search for category that should be updated
      const catToUpdate = tempFilterCategories.findIndex(
        (cat) => cat.id === category
      );
      if (catToUpdate >= NUMBER_0) {
        // Search for value that should be updated
        const valueToUpdate = tempFilterCategories[
          catToUpdate
        ].values.findIndex((item) => item.id === id);
        if (valueToUpdate >= NUMBER_0) {
          tempFilterCategories[catToUpdate].values[valueToUpdate].isVisible =
            !isVisible;
        }
      }

      // Part about tcf filters
      if (widgetConfig.tcfEnabled) {
        // Check if category is one of the "big categories" and 'tcf because if so, we need to disable/enable all subcategories that are part of tcf
        if (category === VENDORS_FILTER_CATEGORIES && id === VendorTypes.IAB) {
          TCF_AVAILABLE_FILTERS.forEach((tcfCatName) => {
            const catIndex = tempFilterCategories.findIndex(
              (cat) => cat.id === tcfCatName
            );
            tempFilterCategories[catIndex].values.forEach((value, index) => {
              tempFilterCategories[catIndex].values[index].isVisible =
                !isVisible;
            });
          });
        }

        // If the category that has been updated is part of TCF categories
        if (
          widgetConfig.tcfEnabled &&
          // @ts-expect-error: Typescript screams that category might be string and not same type as TCF_AVAILABLE_FILTERS. But that's exactly what we want to check here. To check if category (string) is part of TCF_AVAILABLE_FILTERS
          TCF_AVAILABLE_FILTERS.includes(category)
        ) {
          // Check if entire tcf filter should or shouldn't be enabled
          let shouldTCFFilterBeEnabled = FALSE;

          TCF_AVAILABLE_FILTERS.forEach((tcfCategory) => {
            tempFilterCategories[
              tempFilterCategories.findIndex((item) => item.id === tcfCategory)
            ].values.forEach((item) => {
              if (item.isVisible) {
                shouldTCFFilterBeEnabled = TRUE;
              }
            });
          });

          // If at least one is enabled, make toggle enabled,
          const catIndex = tempFilterCategories.findIndex(
            (cat) => cat.id === VENDORS_FILTER_CATEGORIES
          );
          if (shouldTCFFilterBeEnabled) {
            tempFilterCategories[catIndex].values[
              tempFilterCategories[catIndex].values.findIndex(
                (value) => value.id === VendorTypes.IAB
              )
            ].isVisible = shouldTCFFilterBeEnabled;
          }
        }
      }

      setFilterCategories([...tempFilterCategories]);
    }
  };

  return (
    <>
      {widgetConfig.tcfEnabled ? (
        gvl ? (
          <>
            <div class={cx("d-flex", "pb-2", "wrap")}>
              <div class={cx("field-wrap", BORDER_OPACITY)}>
                <input
                  ref={inputRef}
                  {...WITH_TABINDEX_ATTR}
                  {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
                  {...WITH_BG_COLOR_ATTR}
                  class={cx("input", "w-100", "p-2", "pl-3", BORDER_OPACITY)}
                  dir={textDirection}
                  type="text"
                  placeholder={t("modal.search")}
                  name="search"
                  value={search}
                  onInput={handleChange}
                />
              </div>
              <Filter
                elements={filterCategories}
                callback={handleFilterChange}
              />
            </div>
            <div class={cx("vendor-list")}>
              {/* Tcf vendors */}
              {widgetConfig.tcfEnabled && (
                <TCFVendorList
                  filterCategories={filterCategories}
                  searchPhrase={search}
                ></TCFVendorList>
              )}
              {/* Google ac vendors */}
              {widgetConfig.tcfEnabled && widgetConfig.acEnabled && (
                <TCFACVendorList
                  filterCategories={filterCategories}
                  searchPhrase={search}
                />
              )}
              {/* Normal services */}
              <ServiceList
                filterCategories={filterCategories}
                searchPhrase={search}
              />
            </div>
          </>
        ) : (
          <div class={cx("d-flex", "justify-content-center", "spinnerWrapper")}>
            <Spinner />
          </div>
        )
      ) : (
        <ServiceList
          filterCategories={filterCategories}
          searchPhrase={search}
        />
      )}
    </>
  );
};

export default VendorsTab;
