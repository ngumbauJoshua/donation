import { WIDGET_ATTR } from "core/config";

import ActionButtons from "components/ActionButtons";
import AdditionalLink from "core/AdditionalLink";
import Branding from "components/Branding";
import ContinueButton from "core/ContinueButton";
import {
  ConsentTab,
  CONTINUE_BTN_STYLE_DISABLED,
  WIDGET_TYPE_BANNER,
} from "types/config-files/mainConfig";
import Dropdown from "components/Dropdown";
import { type FunctionComponent } from "preact";
import MultilineText from "components/MultilineText";
import { IAB_PURPOSES, NECESSARY } from "constants/categories";
import PrivacyPolicyLink from "core/PrivacyPolicyLink";
import Switch from "components/Switch";
import classNames from "helpers/classNames";
import { genericObject } from "types/generic";
import styles from "./CookieWidgetContent.module.scss";
import useActionButtons from "hooks/useActionButtons";
import useAppState from "hooks/useAppState";
import useConsentActionButton from "constants/useConsentActionButton";
import { useMemo } from "preact/hooks";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import {
  COL_12,
  COL_6,
  COL_MD,
  COL_XL,
  FORM_ROW,
  ROW,
  ROW_REVERSE,
  TEXT_BOLD,
  TEXT_DECORATION_UNDERLINE,
  TEXT_LG,
} from "styles/bootstrap";
import { CookieCategory } from "types/consent";
import useTCFDynamicImport from "hooks/useTCFDynamicImport";
import Button, { BTN_LEVEL_LINK } from "../Button";

const cx = classNames(styles);
const getActionLabel = (button: string) => "widget.buttons." + button;

const CookieWidgetContent: FunctionComponent = () => {
  const { t, setUserLang, userLang, textDirection } = useTranslation();
  const {
    tcfVendorsList,
    widgetConfig,
    changeConsentTab,
    toggleSettingsPanel,
    isSettingsPanelOpen,
    gvl,
  } = useAppState();
  const { toggleCategory, isCategoryAccepted, deny } = useUserConsent();
  const continueBtnProps = useConsentActionButton(deny);
  const actionButtons = useActionButtons();
  const showToggles = !!widgetConfig.bannerToggles;
  const bulkConsent = widgetConfig.bulkConsent;
  const type = widgetConfig.type;
  const isTypeBanner = type === WIDGET_TYPE_BANNER;
  const { TCFPurposeItem } = useTCFDynamicImport(widgetConfig);

  const trans = (key = "", replacements?: genericObject) => {
    return t("widget." + key, replacements);
  };

  const transCat = (cat: CookieCategory, key: string) => {
    return t("categories." + cat + "." + key);
  };

  const singleToggleColClasses = useMemo(() => {
    const classes = ["toggle-col", COL_6];
    if (isTypeBanner) {
      classes.push(COL_XL);
    }

    return classes;
  }, [isTypeBanner]);

  const hideLanguageSwitcher =
    !widgetConfig.showLanguageSwitcher || widgetConfig.languages.length < 2;

  const bannerContinueButtonType = widgetConfig.banner_continue_button_type;

  const width = widgetConfig.widget.width
    ? widgetConfig.widget.width.trim().replace(/\s/g, "")
    : "";
  const isBannerWidth50 = width === "50%";

  return (
    <div
      {...{ [WIDGET_ATTR]: type }}
      dir={textDirection}
      class={cx("widget", `type-${type}`)}
    >
      <div class={cx(ROW_REVERSE, "banner-header")}>
        <div
          class={cx(
            "continue-button-col",
            COL_12,
            {
              "col-lg-6": isTypeBanner,
              "col-xl-3": isTypeBanner && actionButtons.length === 2,
              "col-xl-5":
                isTypeBanner && !isBannerWidth50 && actionButtons.length > 2,
            },
            isBannerWidth50 && "half-width",
            bannerContinueButtonType === CONTINUE_BTN_STYLE_DISABLED &&
              "align-center"
          )}
        >
          {bannerContinueButtonType !== CONTINUE_BTN_STYLE_DISABLED && (
            <ContinueButton
              {...continueBtnProps}
              className={cx("p-0", "continueXButton")}
              type={bannerContinueButtonType}
              {...WITH_TABINDEX_ATTR}
            />
          )}
        </div>
        <div
          class={cx("intro", COL_12, {
            [COL_MD]: isTypeBanner,
          })}
        >
          <div
            dir={textDirection}
            class={cx("intro-content", {
              "mb-0": hideLanguageSwitcher,
            })}
          >
            <div class={cx("intro-content__lang")} {...WITH_ACCENT_COLOR_ATTR}>
              {!hideLanguageSwitcher && (
                <Dropdown
                  options={widgetConfig.languages}
                  onChange={setUserLang}
                  defaultValue={userLang}
                  {...WITH_TABINDEX_ATTR}
                  value={userLang}
                />
              )}
            </div>
            <div class={cx("intro-content__link")} {...WITH_ACCENT_COLOR_ATTR}>
              <PrivacyPolicyLink
                class={cx("secondary-intro")}
                {...WITH_TABINDEX_ATTR}
              />
              <span class={cx("separator")}> | </span>
              <AdditionalLink
                class={cx("secondary-intro")}
                {...WITH_TABINDEX_ATTR}
              />
            </div>
          </div>
        </div>
      </div>
      <div class={cx(ROW, "content")} dir={textDirection}>
        <div
          class={cx("text", COL_12, {
            [COL_MD]: isTypeBanner,
          })}
        >
          <Branding location="banner" class={cx("mr-2")} dir={textDirection} />
          {widgetConfig.tcfEnabled && gvl && (
            <>
              <div
                class={cx(TEXT_BOLD, "pb-2", "pt-2", TEXT_LG)}
                {...WITH_ACCENT_COLOR_ATTR}
              >
                <h2>{trans("heading.tcfLead")}</h2>
              </div>
              <div class={cx(TEXT_BOLD, "pb-2", "mt-2", TEXT_LG)}>
                {trans("heading.tcfIntroTitle")}
              </div>
              <MultilineText text={trans("heading.tcfIntro")} />
              <div class={cx(TEXT_BOLD, "pb-2", "mt-2", TEXT_LG)}>
                {trans("heading.tcfPurposeTitle")}
              </div>
              <MultilineText text={trans("heading.tcfPurposeText")} />
              <p>{trans("heading.tcfDataTransfer")}</p>

              {!bulkConsent.id && <h3>{trans("heading.tcfDefault")}</h3>}
              {!!bulkConsent.id && bulkConsent.domains.length > 0 && (
                <MultilineText
                  text={trans("heading.bulkInfo", {
                    group: bulkConsent.group,
                    domains: bulkConsent.domains.join(", "),
                  })}
                />
              )}

              <Button
                childrenAttr={WITH_ACCENT_COLOR_ATTR}
                childrenClasses={cx(TEXT_BOLD, TEXT_LG)}
                level={BTN_LEVEL_LINK}
                title={trans("heading.tcfPartners", {
                  vendorsCount: tcfVendorsList.length,
                })}
                className={cx(
                  "mb-2",
                  "pl-0",
                  "mt-2",
                  TEXT_DECORATION_UNDERLINE
                )}
                dir={textDirection}
                onClick={() => {
                  toggleSettingsPanel(!isSettingsPanelOpen);
                  changeConsentTab(ConsentTab.VENDORS);
                }}
              >
                {trans("heading.tcfPartners", {
                  vendorsCount: tcfVendorsList.length,
                })}
              </Button>
              <MultilineText
                blockClasses={["pb-2"]}
                text={trans("heading.tcfPurposeListTitle")}
              />
              <div class={cx("mb-2", TEXT_BOLD)}>
                <h3>{t(`${IAB_PURPOSES}.purposes`)}</h3>
              </div>
              {gvl &&
                gvl.purposes &&
                Object.values(gvl.purposes).map((item) => {
                  return (
                    TCFPurposeItem && (
                      <TCFPurposeItem
                        description={item.description}
                        title={item.name}
                      />
                    )
                  );
                })}

              <div className={cx("mb-2", TEXT_BOLD)}>
                <h3>{t(`${IAB_PURPOSES}.specialFeatures`)}</h3>
              </div>
              {gvl &&
                gvl.specialFeatures &&
                Object.values(gvl.specialFeatures).map((item) => {
                  return (
                    TCFPurposeItem && (
                      <TCFPurposeItem
                        description={item.description}
                        title={item.name}
                      />
                    )
                  );
                })}

              <div class={cx("mb-2", TEXT_BOLD)}>
                <h3>{t(`${IAB_PURPOSES}.non_iab`)}</h3>
              </div>
              {Object.values(widgetConfig.cookieCategories).map((item) => {
                return (
                  TCFPurposeItem && (
                    <TCFPurposeItem
                      description={transCat(item, "description")}
                      title={transCat(item, "title")}
                    />
                  )
                );
              })}
            </>
          )}
          {!widgetConfig.tcfEnabled && (
            <>
              <div class={cx(TEXT_BOLD, "pb-2", TEXT_LG)}>
                <h2>{trans("heading.lead")}</h2>
              </div>

              <div class={cx("mb-2")}>
                <MultilineText text={trans("heading.content")} />
                {widgetConfig.showSuffixOnFirstLayer &&
                  widgetConfig.googleConsentModeEnabled && (
                    <MultilineText text={trans("heading.suffix")} />
                  )}
              </div>
              {!!bulkConsent.id && bulkConsent.domains.length > 0 && (
                <MultilineText
                  text={trans("heading.bulkInfo", {
                    group: bulkConsent.group,
                    domains: bulkConsent.domains.join(", "),
                  })}
                />
              )}
            </>
          )}
        </div>

        <div
          class={cx(
            COL_12,
            {
              "col-lg-6": isTypeBanner,
              "col-xl-3": isTypeBanner && actionButtons.length === 2,
              "col-xl-5":
                isTypeBanner && !isBannerWidth50 && actionButtons.length > 2,
            },
            isBannerWidth50 && "half-width",
            bannerContinueButtonType === CONTINUE_BTN_STYLE_DISABLED &&
              "align-center"
          )}
        >
          <div class={cx("toggles", ROW, FORM_ROW)}>
            {!!showToggles &&
              widgetConfig.cookieCategories.map((category, index) => {
                const isAccepted = isCategoryAccepted(category);
                const label = t(`categories.${category}.title`);
                return (
                  <div
                    key={`toggle-${index}`}
                    class={cx(...singleToggleColClasses, "pt-2")}
                  >
                    <div key={category} class={cx("toggleContainer")}>
                      <Switch
                        disabled={category === NECESSARY}
                        checked={isAccepted}
                        onChange={() => toggleCategory(category, !isAccepted)}
                        aria-label={label}
                      />
                      <span
                        dir={textDirection}
                        class={cx("category", TEXT_LG, TEXT_BOLD)}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <ActionButtons
            class={cx("actions")}
            acceptLabel={
              widgetConfig.okAcceptsAll
                ? getActionLabel("acceptAll")
                : getActionLabel("acceptPreselected")
            }
            acceptLabelAria={
              widgetConfig.okAcceptsAll
                ? getActionLabel("acceptAllLabel")
                : getActionLabel("acceptPreselectedLabel")
            }
            saveLabel={getActionLabel("saveSelection")}
            saveLabelAria={getActionLabel("saveSelectionLabel")}
            toggleSettingsLabel={getActionLabel("customize")}
            toggleSettingsLabelAria={getActionLabel("customizeLabel")}
            rejectLabel={getActionLabel("reject")}
            rejectLabelAria={getActionLabel("rejectLabel")}
            location="banner"
            rejectBtnType="reject"
          />
        </div>
      </div>
    </div>
  );
};

export default CookieWidgetContent;
