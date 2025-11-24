import CategoriesTab from "../CategoriesTab";
import { ConsentTab } from "types/config-files/mainConfig";
import { FunctionComponent } from "preact";
import Tabs from "components/Tabs";
import classNames from "helpers/classNames";
import styles from "./CookieSettings.module.scss";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import VendorsTab from "components/VendorsTab/VendorsTab";
import { CONSENT_POLICY_GRANULAR_OPTIN } from "types/consent";

const cx = classNames(styles);

const TABS_COMPONENTS: Record<ConsentTab, FunctionComponent> = {
  [ConsentTab.CATEGORIES]: CategoriesTab,
  [ConsentTab.VENDORS]: VendorsTab,
};

const CookieSettings = () => {
  const { activeConsentTab, changeConsentTab, widgetConfig, tcfVendorsList } =
    useAppState();
  const { t, textDirection } = useTranslation();

  const trans = (key: string) => t(`modal.${key}`);
  const tabLabel = (tab: ConsentTab) => {
    if (tab === ConsentTab.CATEGORIES && widgetConfig.tcfEnabled) {
      return trans("tabs.purposes");
    } else if (tab === ConsentTab.CATEGORIES) {
      return trans("tabs.categories");
    } else {
      return `${trans("tabs.vendors")} ${
        tab === ConsentTab.VENDORS ? `(${getVendorsCount()})` : ""
      }`;
    }
  };

  const getVendorsCount = (): number => {
    let vendorsCount = 0;

    // Add all non iab scripts
    vendorsCount += widgetConfig.scripts.length;

    // If tcf is enabled, add scripts from IAB
    if (widgetConfig.tcfEnabled) {
      vendorsCount += tcfVendorsList.length;

      if (widgetConfig.acEnabled) {
        vendorsCount += widgetConfig.acVendors.length;
      }
    }

    return vendorsCount;
  };

  const consentTabs = () => {
    const tabs = [ConsentTab.CATEGORIES];
    if (
      widgetConfig.consentPolicy === CONSENT_POLICY_GRANULAR_OPTIN ||
      widgetConfig.tcfEnabled
    ) {
      tabs.push(ConsentTab.VENDORS);
    }

    return tabs;
  };

  const tabs = consentTabs().map((tab) => {
    return {
      key: tab,
      label: tabLabel(tab),
      component: TABS_COMPONENTS[tab],
    };
  });

  return (
    <>
      <div class={cx("subHeading", "px-2")} dir={textDirection}>
        {widgetConfig.tcfEnabled ? t("modal.tcfLead") : t("modal.lead")}
      </div>
      <Tabs
        tabs={tabs}
        currentTab={activeConsentTab}
        onChange={changeConsentTab}
      />
    </>
  );
};

export default CookieSettings;
