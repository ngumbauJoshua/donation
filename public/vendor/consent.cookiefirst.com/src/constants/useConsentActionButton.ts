import { FALSE, TRUE } from "./primitives";

import { IGeneralButtonProps } from "components/Button/types";
import useAppState from "hooks/useAppState";
import { useState } from "preact/hooks";
import useUserConsent from "hooks/useUserConsent";
import createPromise from "helpers/createPromise";
import { NUMBER_1 } from "./numbers";

export type ActionButtonHookReturn = Pick<
  IGeneralButtonProps,
  "loading" | "onClick"
>;

const useConsentActionButton = (
  cb: () => Promise<void>
): ActionButtonHookReturn => {
  const { toggleSettingsPanel, widgetConfig } = useAppState();
  const { isSavingConsent } = useUserConsent();
  const [isLoading, setIsLoading] = useState<boolean>(FALSE);

  const handleClick = () => {
    const optionsDoNotTrack = [`${NUMBER_1}`, TRUE];
    const doNotTrack =
      optionsDoNotTrack.includes(navigator.doNotTrack || "") ||
      optionsDoNotTrack.includes(window.doNotTrack || "");
    if (widgetConfig.gpcAndDntEnabled && doNotTrack) {
      // if GPC and DNT are enabled, do not save consent
      toggleSettingsPanel(FALSE); // close settings modal after consent is saved
      return;
    }
    return createPromise<void>((resolve) => {
      // short circuit to avoid people clicking button multiple times
      if (isSavingConsent || isLoading) {
        return resolve();
      }

      setIsLoading(TRUE);
      cb().finally(() => {
        setIsLoading(FALSE);
        toggleSettingsPanel(FALSE); // close settings modal after consent is saved
        resolve();
      });
    });
  };

  return {
    loading: isLoading && isSavingConsent,
    onClick: handleClick,
  };
};

export default useConsentActionButton;
