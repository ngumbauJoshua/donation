import { WIDGET_ATTR } from "core/config";

import ActionButtons from "components/ActionButtons";
import AdditionalLink from "core/AdditionalLink";
import CookiePolicy from "./components/CookiePolicy";
import CookieSettings from "./components/CookieSettings";
import CookiesList from "./components/CookiesList";
import Dropdown from "components/Dropdown";
import { type FunctionComponent } from "preact";
import Modal from "components/Modal";
import MyData from "./components/MyData";
import {
  PANEL_COOKIES_TAB,
  PANEL_DATA_TAB,
  PANEL_POLICY_TAB,
  PANEL_SETTINGS_TAB,
  PanelTab,
} from "types/config-files/mainConfig";
import PoweredBy from "components/PoweredBy";
import PrivacyPolicyLink from "core/PrivacyPolicyLink";
import Tabs from "components/Tabs";
import classNames from "helpers/classNames";
import dispatchLayerRenderedEvent from "helpers/dispatchLayerRenderedEvent";
import noop from "helpers/noop";
import styles from "./SettingsModal.module.scss";
import useAppState from "hooks/useAppState";
import { useLayoutEffect } from "preact/hooks";
import useTranslation from "hooks/useTranslation";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import {
  COL_6,
  COL_MD,
  ROW,
  TEXT_BOLD,
  TEXT_END,
  TEXT_START,
} from "styles/bootstrap";

const cx = classNames(styles);
const getButtonLabel = (button: string) => "modal.buttons." + button;
const TITLE_ID = "cookie-preference-panel-title";
const TABS_COMPONENTS: Record<PanelTab, FunctionComponent> = {
  [PANEL_SETTINGS_TAB]: CookieSettings,
  [PANEL_COOKIES_TAB]: CookiesList,
  [PANEL_POLICY_TAB]: CookiePolicy,
  [PANEL_DATA_TAB]: MyData,
};

const SettingsModal: FunctionComponent<ISettingsModalProps> = ({
  onClose = noop,
  ...props
}) => {
  const { t, setUserLang, userLang, textDirection } = useTranslation();
  const { widgetConfig, activePanelTab, changePanelTab } = useAppState();

  const trans = (key: string) => t(`modal.${key}`);

  useLayoutEffect(() => {
    dispatchLayerRenderedEvent(
      document.querySelector(`[${WIDGET_ATTR}="modal"]`)
    );
  }, []);

  const tabs = widgetConfig.tabsOnSettingsPanel.map((tab) => {
    return {
      key: tab,
      label: trans(`tabs.${tab}`),
      component: TABS_COMPONENTS[tab],
    };
  });

  const showLanguageSwitcher =
    widgetConfig.showLanguageSwitcher && widgetConfig.languages.length > 1;

  return (
    <Modal {...props} toggle={onClose} ariaLabelId={TITLE_ID}>
      {/* Need to enclose heading in div for correct flexbox layout on mobile */}
      <div>
        <div dir={textDirection}>
          {showLanguageSwitcher && (
            <Dropdown
              options={widgetConfig.languages}
              onChange={setUserLang}
              defaultValue={userLang}
              {...WITH_TABINDEX_ATTR}
              value={userLang}
            />
          )}
        </div>
        <div class={cx("heading", "mb-3", ROW)} dir={textDirection}>
          <div class={cx(COL_6, COL_MD, TEXT_START, TEXT_BOLD)}>
            <h2 id={TITLE_ID}>{trans("title")}</h2>
          </div>
          <div {...WITH_ACCENT_COLOR_ATTR} class={cx(COL_6, COL_MD, TEXT_END)}>
            <PrivacyPolicyLink
              alwaysShow
              class={cx(TEXT_BOLD)}
              {...WITH_TABINDEX_ATTR}
            />
            <span class={cx("separator")}> | </span>
            <AdditionalLink class={cx(TEXT_BOLD)} {...WITH_TABINDEX_ATTR} />
          </div>
        </div>
      </div>
      <Tabs<PanelTab>
        tabContentClassName={cx("tabContent")}
        dir={textDirection}
        tabs={tabs}
        currentTab={activePanelTab}
        onChange={changePanelTab}
      />
      {/* Need to enclose saveActions in div for correct flexbox layout on mobile */}
      {activePanelTab !== PANEL_DATA_TAB && (
        <ActionButtons
          alwaysAcceptAll
          acceptLabel={getButtonLabel("acceptAll")}
          acceptLabelAria={getButtonLabel("acceptAllLabel")}
          saveLabel={getButtonLabel("save")}
          saveLabelAria={getButtonLabel("saveLabel")}
          toggleSettingsLabel={getButtonLabel("close")}
          toggleSettingsLabelAria={getButtonLabel("closeLabel")}
          rejectLabel={getButtonLabel("reject_second")}
          rejectLabelAria={getButtonLabel("reject_secondLabel")}
          class={cx("saveActions")}
          location="modal"
          rejectBtnType="reject_second"
        />
      )}
      <div class={cx("mt-3", "logoContainer")}>
        <PoweredBy />
      </div>
    </Modal>
  );
};

export interface ISettingsModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export default SettingsModal;
