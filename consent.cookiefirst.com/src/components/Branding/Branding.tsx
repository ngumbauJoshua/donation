import classNames from "helpers/classNames";
import { type FunctionComponent } from "preact";
import styles from "./Branding.module.scss";
import useAppState from "hooks/useAppState";
import { FALSE, NULL } from "constants/primitives";
import {
  WITH_ACCENT_COLOR_ATTR,
  WITH_EXTERNAL_LINK_ATTR,
  WITH_TABINDEX_ATTR,
} from "constants/commonAttributes";
import isString from "helpers/isString";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const Branding: FunctionComponent<IBrandingProps> = ({
  class: className = "",
  location,
  withLabel = FALSE,
  ...props
}) => {
  const { t, textDirection } = useTranslation();
  const { widgetConfig } = useAppState();

  if (!widgetConfig.branding[location]) {
    return null;
  }

  const { show, url, logo, label } = widgetConfig.branding[location];
  if (!show || !logo) {
    return NULL;
  }

  const titleText = `${label} ${t("modal.logo")}. ${t("modal.opens_new_tab")}`;

  const content = (
    <>
      <img src={logo} class={cx("img")} alt={`${label} ${t("modal.logo")}`} />
      {!!withLabel && <span> {label}</span>}
    </>
  );

  return (
    <span {...props} class={cx(className, "logo")}>
      {!!url && isString(url) ? (
        <a
          class={cx("link")}
          dir={textDirection}
          href={url}
          {...WITH_TABINDEX_ATTR}
          {...WITH_EXTERNAL_LINK_ATTR}
          {...WITH_ACCENT_COLOR_ATTR}
          title={titleText}
          aria-label={titleText}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </span>
  );
};

export interface IBrandingProps {
  class?: string;
  location: "banner" | "panel";
  withLabel?: boolean;
  dir?: string;
}

export default Branding;
