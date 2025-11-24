import { type FunctionComponent, type JSX } from "preact";

import { NULL } from "constants/primitives";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import {
  WITH_EXTERNAL_LINK_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
} from "constants/commonAttributes";

const PrivacyPolicyLink: FunctionComponent<IPrivacyPolicyLinkProps> = ({
  alwaysShow,
  ...props
}) => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();
  if (!alwaysShow && !widgetConfig.showPrivacyUrlInBanner) {
    return NULL;
  }

  const url = t("modal.policy_url", {}, widgetConfig.privacyPolicyUrl);
  if (!url) {
    return NULL;
  }
  return (
    <a
      {...props}
      href={url}
      {...WITH_EXTERNAL_LINK_ATTR}
      {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
      aria-label={t('modal.policy_label')}
    >
      {t("modal.policy")}
    </a>
  );
};

interface IPrivacyPolicyLinkProps extends JSX.HTMLAttributes {
  alwaysShow?: boolean;
}

export default PrivacyPolicyLink;
