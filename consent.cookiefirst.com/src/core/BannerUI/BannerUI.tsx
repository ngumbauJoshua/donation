import "styles/root.scss";

import { useEffect, useState } from "preact/hooks";

import CookieWidget from "core/CookieWidget";
import { type FunctionComponent } from "preact";
import { FALSE, NULL } from "constants/primitives";
import ReopenSettingsButton from "core/ReopenSettingsButton";
import SettingsModal from "widgets/SettingsModal";
import insertCSSContents from "helpers/init/insertCSSContents";
import loadBannerStyles from "helpers/init/loadBannerStyles";
import useAppState from "hooks/useAppState";
import useUserConsent from "hooks/useUserConsent";
import WithdrawConsentModal from "core/WithdrawConsentModal";
import useShouldShowBanner from "hooks/useShouldShowBanner";
import getStaticFileUrl from "helpers/getStaticFileUrl";
import integrationSettings from "core/integrationSettings";

const BannerUI: FunctionComponent = () => {
  const { showWithdrawModal, toggleWithdrawModal } = useUserConsent();
  const [isInitialized, setIsInitialized] = useState(false);
  const { widgetConfig, changePanelTab, activePanelTab, changeConsentTab } =
    useAppState();
  const { dir } = integrationSettings;

  // initialize custom CSS if not in stealth mode
  useEffect(() => {
    // Check if styles should be loaded with link or injected directly
    if (widgetConfig.loadCssWithLink) {
      const link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = getStaticFileUrl(`${dir}/styles.css`, widgetConfig.version);
      link.onload = () => {
        setIsInitialized(true);
      };
      document.head.appendChild(link);
    } else {
      loadBannerStyles(widgetConfig.version, widgetConfig)
        .then((css) => insertCSSContents(css))
        .finally(() => setIsInitialized(true));
    }
  }, []);

  // calculate when banner should be shown
  const shouldShowBanner = useShouldShowBanner();

  if (!isInitialized) {
    return NULL;
  }

  return (
    <>
      {/* only render the banner interface when it's visible */}
      {shouldShowBanner && <CookieWidget />}
      {/* only fetch code and render reopen button if banner is hidden */}
      {!shouldShowBanner && widgetConfig.floatingBtn.isEnabled && (
        <ReopenSettingsButton
          onClick={() => {
            changePanelTab();
            changeConsentTab();
          }}
        />
      )}
      {/* Don't render modal when it's closed because modal when rendered sends a layer rendered event */}
      {!!activePanelTab && (
        <SettingsModal
          isOpen
          onClose={() => {
            changePanelTab(NULL);
            changeConsentTab(NULL);
          }}
        />
      )}
      {!!showWithdrawModal && (
        <WithdrawConsentModal
          isOpen
          onClose={() => toggleWithdrawModal(FALSE)}
        />
      )}
    </>
  );
};

export default BannerUI;
