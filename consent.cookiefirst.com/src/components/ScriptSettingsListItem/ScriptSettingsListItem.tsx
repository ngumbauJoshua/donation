import { type FunctionComponent } from "preact";
import { IConfigFileScript } from "types/config-files/mainConfig";
import { NECESSARY } from "constants/categories";
import Switch from "components/Switch";
import classNames from "helpers/classNames";
import getStaticFileUrl from "helpers/getStaticFileUrl";
import styles from "./ScriptSettingsListItem.module.scss";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import useUserConsent from "hooks/useUserConsent";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import includes from "helpers/includes";
import {
  BORDER_OPACITY,
  COL,
  COL_12,
  COL_AUTO,
  FONT_WEIGHT_REGULAR,
  ROW,
  TEXT_BOLD,
} from "styles/bootstrap";

const cx = classNames(styles);
const commonLinkProps = {
  ...WITH_ACCENT_COLOR_ATTR,
  ...WITH_OUTLINE_ACCENT_COLOR_ATTR,
  ...WITH_TABINDEX_ATTR,
  class: cx("scriptUrl", "mr-2"),
  target: "_blank",
  rel: "noopener noreferrer",
};

const ScriptSettingsListItem: FunctionComponent<
  IScriptSettingsListItemProps
> = ({ script, disabled }) => {
  const { widgetConfig } = useAppState();
  const { isScriptAccepted, toggleScript } = useUserConsent();
  const { t, textDirection } = useTranslation();
  const {
    name,
    logo_path,
    categories,
    privacy_policy_url,
    privacy_settings_url,
  } = script;

  const isAccepted = isScriptAccepted(script);

  const trans = (key: string) => t(`categories.common.${key}`);
  return (
    <div class={cx("service", "d-flex", BORDER_OPACITY)}>
      <div class={cx(COL)}>
        <div class={cx("header-row", "pb-1", "mb-2", ROW)} dir={textDirection}>
          <div class={cx(COL, TEXT_BOLD)}>
            {widgetConfig.tcfEnabled ? (
              <h5 dir={textDirection}>{name}</h5>
            ) : (
              <h4 dir={textDirection}>{name}</h4>
            )}
          </div>
        </div>
        <div class={cx("service-row", ROW)}>
          <div class={cx(COL_12)} />
          {!!logo_path && (
            <div class={cx(COL_AUTO, "col-sm-2")}>
              <span
                class={cx("scriptLogo")}
                style={`background-image: url(${getStaticFileUrl(
                  `logos/${logo_path}`,
                  widgetConfig.version
                )})`}
                role="img"
                aria-label={`logo ${name}`}
              />
            </div>
          )}
          <div class={cx(COL)}>
            <div>
              {!!privacy_policy_url && (
                <a
                  {...commonLinkProps}
                  dir={textDirection}
                  href={privacy_policy_url}
                  aria-label={`${name} ${t("modal.view_policies_label")}`}
                >
                  <span class={cx(FONT_WEIGHT_REGULAR)}>
                    {trans("privacyPolicy")}
                  </span>
                </a>
              )}
              {!!privacy_settings_url && (
                <a
                  {...commonLinkProps}
                  dir={textDirection}
                  href={privacy_settings_url}
                  aria-label={`${name} ${trans("privacySettings_label")}`}
                >
                  <span class={cx(FONT_WEIGHT_REGULAR)}>
                    {trans("privacySettings")}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {widgetConfig.isGranularPolicy && (
        <div class={cx(COL_AUTO)}>
          <Switch
            disabled={disabled || includes(categories, NECESSARY)}
            checked={!!isAccepted}
            onChange={() => toggleScript(script)}
          />
        </div>
      )}
    </div>
  );
};

export interface IScriptSettingsListItemProps {
  script: IConfigFileScript;
  disabled: boolean;
}

export default ScriptSettingsListItem;
