import classNames from "helpers/classNames";
import styles from "./TCFVendorSettings.module.scss";
import useTranslation from "hooks/useTranslation";
import noop from "helpers/noop";
import {
  IntMap,
  Purpose as IABPurpose,
  Feature as IABFeature,
} from "@iabtechlabtcf/core";
import { ITCFTypes, ITCFVendor } from "types/tcf";
import Switch from "components/Switch";
import isArray from "helpers/isArray";
import { FunctionComponent } from "preact";
import Accordion from "components/Accordion";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_EXTERNAL_LINK_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import TCFDeviceDisclosure from "../TCFDeviceDisclosure";
import Spinner from "components/Spinner";
import useLoadDeviceDisclosure from "hooks/useLoadDeviceDisclosure";
import { BORDER_OPACITY, TEXT_BOLD } from "styles/bootstrap";
import { useCallback, useMemo, useState } from "preact/hooks";
import { FALSE } from "constants/primitives";
import Button from "components/Button";
import IconDown from "components/Dropdown/IconDown";
import { genericObject } from "types/generic";
import { TCFCategoryTypes } from "helpers/tcf/TCFConsentProvider/types";
import { LTR } from "helpers/getTextDirection";

const cx = classNames(styles);

const TCFVendorSettings: FunctionComponent<ITCFVendorSettingsProps> = ({
  isAccepted,
  isLegitimateInterestAccepted,
  vendor,
  isLegitimateInterestRequired,
  gvlData,
  onToggle = noop,
  onLegitimateInterestToggle = noop,
}) => {
  const { t, textDirection } = useTranslation();
  const trans = useCallback(
    (key = "", replacements?: genericObject) => {
      return t("vendors." + key, replacements);
    },
    [t]
  );
  const [loadDeviceDisclosure, deviceDisclosure, isLoading] =
    useLoadDeviceDisclosure();
  const [isExpanded, setExpanded] = useState(FALSE);

  const getRetentionPeriod = (vendor: ITCFVendor, type: string, id: number) => {
    if (!vendor.dataRetention) {
      return;
    }

    if (type === TCFCategoryTypes.PURPOSES || type === "specialPurposes") {
      const retentionType = vendor.dataRetention[type];
      if (retentionType && id in retentionType) {
        return retentionType[id];
      }
      return vendor.dataRetention.stdRetention;
    }

    return;
  };

  const getLegIntClaimUrl = () => {
    const urlObjectWithLegIntClaim =
      vendor.urls &&
      vendor.urls.find((obj) =>
        Object.prototype.hasOwnProperty.call(obj, "legIntClaim")
      );

    return urlObjectWithLegIntClaim ? urlObjectWithLegIntClaim.legIntClaim : "";
  };

  const getLegIntForVendor = (
    vendor: ITCFVendor,
    purposes: IntMap<IABPurpose>
  ): JSX.Element[] => {
    const listItems: JSX.Element[] = [];

    vendor.legIntPurposes.forEach((purposeId) => {
      const purpose = purposes[purposeId];
      if (purpose) {
        listItems.push(<li key={purposeId}>{purpose.name}</li>);
      }
    });

    return listItems;
  };

  const getItemMarkup = useCallback(
    (
      vendor: ITCFVendor,
      items: IntMap<IABPurpose> | IntMap<IABFeature>,
      type: string
    ): JSX.Element[] => {
      const listItems: JSX.Element[] = [];
      const vendorTypeIds = vendor[type as keyof ITCFVendor] as number[];

      if (vendorTypeIds && isArray(vendorTypeIds) && vendorTypeIds.length > 0) {
        vendorTypeIds.forEach((id) => {
          const item = items[id];
          if (item) {
            const retentionPeriod = getRetentionPeriod(vendor, type, id);
            listItems.push(
              <li key={id}>
                {`${item.name} ${
                  retentionPeriod
                    ? trans("retention_days", { retentionPeriod })
                    : ""
                }`}
              </li>
            );
          }
        });
      }
      return listItems;
    },
    [trans]
  );

  const memoizedPurposesMarkup = useMemo(() => {
    return Object.entries(gvlData).map(([type, items]) => {
      const markupItems = getItemMarkup(vendor, items, type);

      return (
        <>
          {markupItems.length > 0 && (
            <li>
              <div class={cx("itemHeader", "py-2", TEXT_BOLD)}>
                <h5>{trans(type)}</h5>
              </div>
              <div class={cx("itemContent", BORDER_OPACITY, "pt-2")}>
                <ul>{markupItems}</ul>
              </div>
            </li>
          )}
        </>
      );
    });
  }, [vendor, gvlData, trans, getItemMarkup]);

  return (
    <Accordion
      title={vendor.name}
      titleTag={"h4"}
      customSwitcher={
        <>
          {
            <Switch
              onChange={onToggle}
              checked={!!isAccepted}
              label={trans("dataProcessing")}
              className={cx(
                "switch",
                "w-100",
                "pr-0",
                textDirection === LTR ? "justify-content-end" : ""
              )}
            />
          }
          {isLegitimateInterestRequired && (
            <Switch
              onChange={onLegitimateInterestToggle}
              checked={!!isLegitimateInterestAccepted}
              label={trans("legInt")}
              className={cx(
                "switch",
                "w-100",
                "pr-0",
                textDirection === LTR ? "justify-content-end" : ""
              )}
            />
          )}
        </>
      }
      link={
        vendor.urls &&
        vendor.urls[0].privacy && (
          <a
            href={vendor.urls[0].privacy}
            {...WITH_TABINDEX_ATTR}
            {...WITH_EXTERNAL_LINK_ATTR}
            aria-label={`${vendor.name} ${t("modal.view_policies_label")}`}
          >
            {trans("view_policies")}
          </a>
        )
      }
      onExpand={(isExpanded) =>
        isExpanded &&
        vendor.deviceStorageDisclosureUrl &&
        loadDeviceDisclosure(vendor.deviceStorageDisclosureUrl, vendor.id)
      }
    >
      <ul class={cx("details", "m-0")}>
        {/* Lifespan is the only list element where content is in same lane with title */}
        <li>
          <div class={cx("itemContent", "d-flex", "pt-2", "pb-2")}>
            <span class={cx("mr-1", TEXT_BOLD)} dir={textDirection}>
              {trans("lifespan")}
            </span>
            <span>{vendor.cookieMaxAgeReadable}</span>
          </div>
        </li>

        {memoizedPurposesMarkup}

        {gvlData.purposes && vendor.legIntPurposes.length > 0 && (
          <li class={cx("detailsItem")}>
            <div class={cx("itemHeader", "py-2")}>
              <span class={cx(TEXT_BOLD)}>{trans("legIntTitle")}</span>
            </div>
            <div className={cx("itemContent", "py-2")}>
              {getLegIntForVendor(vendor, gvlData.purposes)}

              {!!getLegIntClaimUrl && (
                <a href={getLegIntClaimUrl()} {...WITH_EXTERNAL_LINK_ATTR}>
                  {trans("legIntClaim")}
                </a>
              )}
            </div>
          </li>
        )}

        <li class={cx("detailsItem")}>
          <div class={cx("itemHeader", "py-2", TEXT_BOLD)}>
            <h5>{trans("storage_info")}</h5>
          </div>
          <div class={cx("itemContent", "pt-2")}>
            <p>
              {trans("cookie_use")}:{" "}
              {vendor.usesCookies ? trans("yes") : trans("no")}
            </p>
            <p>
              {trans("cookie_refresh")}:{" "}
              {vendor.cookieRefresh ? trans("yes") : trans("no")}
            </p>
            <p>
              {trans("cookie_max_time")}: {vendor.cookieMaxAgeReadable}
            </p>
            <p>
              {trans("non_cookie_storage")}:{" "}
              {vendor.usesNonCookieAccess ? trans("yes") : trans("no")}
            </p>
            <p>{`${trans("retention_period")}: ${
              vendor.dataRetention && vendor.dataRetention.stdRetention
            } ${trans("days_l")}`}</p>
          </div>
        </li>

        {!isLoading ? (
          <li>
            <div class={cx("itemHeader", "py-2")}>
              <Button
                {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
                {...WITH_TABINDEX_ATTR}
                {...WITH_ACCENT_COLOR_ATTR}
                level="link"
                className={cx("caret", { isActive: isExpanded })}
                onClick={() => {
                  setExpanded(!isExpanded);
                }}
              >
                <div
                  class={cx(TEXT_BOLD, "mr-2", "itemAccordion")}
                  dir={textDirection}
                >
                  <h5>{t("vendors.device_disclosure")}</h5>
                </div>
                <span class={cx("arrow")}>
                  <IconDown />
                </span>
              </Button>
            </div>
            <div class={cx("itemContent", { "d-none": !isExpanded })}>
              <TCFDeviceDisclosure
                item={deviceDisclosure}
                onReload={() =>
                  vendor.deviceStorageDisclosureUrl &&
                  loadDeviceDisclosure(
                    vendor.deviceStorageDisclosureUrl,
                    vendor.id
                  )
                }
              />
            </div>
          </li>
        ) : (
          <div class={cx("d-flex", "justify-content-center", "spinnerWrapper")}>
            <Spinner />
          </div>
        )}
      </ul>
    </Accordion>
  );
};

export interface ITCFVendorSettingsProps {
  id: string;
  isAccepted?: boolean;
  isLegitimateInterestAccepted?: boolean;
  isLegitimateInterestRequired?: boolean;
  vendor: ITCFVendor;
  gvlData: ITCFTypes;
  onToggle: () => void;
  onLegitimateInterestToggle: () => void;
}

export default TCFVendorSettings;
