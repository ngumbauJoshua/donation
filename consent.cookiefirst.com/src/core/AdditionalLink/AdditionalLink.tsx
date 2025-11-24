import { type FunctionComponent, type JSX } from "preact";

import { NULL } from "constants/primitives";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";
import {
  WITH_EXTERNAL_LINK_ATTR,
  WITH_OUTLINE_ACCENT_COLOR_ATTR,
} from "constants/commonAttributes";

const AdditionalLink: FunctionComponent<IAdditionalLinkProps> = (props) => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();

  const url = t("modal.additional_link_url", {}, widgetConfig.additionalLink);
  const label = t("modal.additional_link_text", {}, "");
  const defaultAdditionalLinkText = `${label} - ${t("modal.opens_new_tab")}`;
  const title = t(
    "modal.additional_link_text_label",
    {},
    defaultAdditionalLinkText
  );

  if (!url || !label) {
    return NULL;
  }

  return (
    <a
      {...props}
      href={url}
      {...WITH_EXTERNAL_LINK_ATTR}
      {...WITH_OUTLINE_ACCENT_COLOR_ATTR}
      title={title}
      aria-label={title}
    >
      {label}
    </a>
  );
};

interface IAdditionalLinkProps extends JSX.HTMLAttributes {
  // Add a placeholder property to avoid the warning
  _placeholder?: never;
}

export default AdditionalLink;
