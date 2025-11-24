import { type FunctionComponent, type JSX } from "preact";

import Branding from "components/Branding";
import { NULL } from "constants/primitives";
import classNames from "helpers/classNames";
import styles from "./PoweredBy.module.scss";
import useAppState from "hooks/useAppState";
import useTranslation from "hooks/useTranslation";

const cx = classNames(styles);

const PoweredBy: FunctionComponent<IPoweredByProps> = ({
  class: className,
}) => {
  const { t, textDirection } = useTranslation();
  const { widgetConfig } = useAppState();
  const { branding } = widgetConfig;

  if (!branding.panel.show) {
    return NULL;
  }

  return (
    <span class={cx(className, "poweredBy")} dir={textDirection}>
      {t("widget.poweredBy")}{" "}
      <Branding location="panel" withLabel={branding.panel.showLabel} />
    </span>
  );
};

export interface IPoweredByProps extends JSX.HTMLAttributes {
  _placeholder?: never;
}

export default PoweredBy;
