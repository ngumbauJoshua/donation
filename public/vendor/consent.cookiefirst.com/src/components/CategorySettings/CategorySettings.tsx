import { NULL } from "constants/primitives";

import { type FunctionComponent } from "preact";
import { IConfigFileScript } from "types/config-files/mainConfig";
import MultilineText from "components/MultilineText";
import ScriptSettingsListItem from "components/ScriptSettingsListItem";
import Switch from "components/Switch";
import classNames from "helpers/classNames";
import noop from "helpers/noop";
import styles from "./CategorySettings.module.scss";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import { CONSENT_POLICY_GRANULAR_OPTIN } from "types/consent";
import useUserConsent from "hooks/useUserConsent";
import { useCallback, useMemo } from "preact/hooks";
import Accordion from "components/Accordion";
import { NUMBER_0 } from "constants/numbers";

const cx = classNames(styles);

const CategorySettings: FunctionComponent<ICategorySettingsProps> = ({
  title = "",
  disabled,
  isAccepted,
  excerpt = "",
  description = "",
  descriptionSuffix = "",
  scripts = [],
  onToggle = noop,
}) => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();
  const { isScriptAccepted } = useUserConsent();

  const trans = useCallback(
    (key: string) => {
      return t(`modal.${key}`);
    },
    [t]
  );

  const acceptedScriptsBadgeContents = useMemo(() => {
    if (!widgetConfig.showNumberOfScriptsInBanner) {
      return NULL;
    }
    const numberOfAccceptedScripts = scripts.filter(isScriptAccepted).length;
    const numberOfAllScripts = scripts.length;
    if (widgetConfig.consentPolicy === CONSENT_POLICY_GRANULAR_OPTIN) {
      return [
        numberOfAccceptedScripts,
        "/",
        numberOfAllScripts,
        trans("services_active"),
      ].join(" ");
    } else {
      return [numberOfAllScripts, trans("services")].join(" ");
    }
  }, [
    scripts,
    isScriptAccepted,
    widgetConfig.showNumberOfScriptsInBanner,
    widgetConfig.consentPolicy,
    trans,
  ]);

  return (
    <Accordion
      title={title}
      badge={acceptedScriptsBadgeContents}
      titleTag={widgetConfig.tcfEnabled ? 'h4' : 'h3'}
      switcher={
        <Switch
          disabled={disabled}
          checked={!!isAccepted}
          onChange={onToggle}
          aria-label={title}
          className={cx("pr-0")}
        />
      }
      fragment={
        <>
          <MultilineText text={excerpt} />
          {descriptionSuffix.length > NUMBER_0 && widgetConfig.googleConsentModeEnabled && (
            <MultilineText text={descriptionSuffix} />
          )}
        </>
      }
    >
      <>
        <div class={cx("pt-3")}>
          <MultilineText text={description} />
        </div>
        {!!scripts.length && (
          <div class={cx("pt-3")}>
            <div class={cx("mb-4")}>
              <p class={cx("m-0")}>
                <small>{t("categories.common.sharedWith")}</small>
              </p>
            </div>
            {scripts.map((script, index) => (
              <ScriptSettingsListItem
                key={index}
                script={script}
                disabled={disabled}
              />
            ))}
          </div>
        )}
      </>
    </Accordion>
  );
};

export interface ICategorySettingsProps {
  title: string;
  disabled: boolean;
  isAccepted?: boolean;
  excerpt: string;
  description: string;
  descriptionSuffix: string;
  scripts: IConfigFileScript[];
  onToggle: () => void;
}

export default CategorySettings;
