import { ACTION_ATTR } from "core/config";

import Button from "components/Button";
import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import noop from "helpers/noop";
import styles from "./ReopenSettingsButton.module.scss";
import useTranslation from "hooks/useTranslation";
import Svg from "components/Svg";
import RootContainer from "core/RootContainer";
import useAppState from "hooks/useAppState";
import { useMemo } from "preact/hooks";
import { BOX_WIDGET_LOCATION_BOTTOM_LEFT, BOX_WIDGET_LOCATION_BOTTOM_RIGHT, BOX_WIDGET_LOCATION_TOP_LEFT, BOX_WIDGET_LOCATION_TOP_RIGHT } from "types/config-files/mainConfig";

const cx = classNames(styles);

const PX_DISTANCE = 15;

const ReopenSettingsButton: FunctionComponent<IReopenSettingsButtonProps> = ({
  onClick = noop,
}) => {
  const { t } = useTranslation();
  const { widgetConfig } = useAppState();
  const { floatingBtn } = widgetConfig;

  const positionStyles = useMemo(() => {
    switch (floatingBtn.location) {
      case BOX_WIDGET_LOCATION_TOP_LEFT:
        return { 'top': `${PX_DISTANCE}px`, 'left': `${PX_DISTANCE}px` };

      case BOX_WIDGET_LOCATION_TOP_RIGHT:
        return { 'top': `${PX_DISTANCE}px`, 'right': `${PX_DISTANCE}px` };

      case BOX_WIDGET_LOCATION_BOTTOM_LEFT:
        return { 'bottom': `${PX_DISTANCE}px`, 'left': `${PX_DISTANCE}px` };

      case BOX_WIDGET_LOCATION_BOTTOM_RIGHT:
        return { 'bottom': `${PX_DISTANCE}px`, 'right': `${PX_DISTANCE}px` };
    }

  }, [floatingBtn.location])

  return (
    <RootContainer>
      <span
        {...{ [ACTION_ATTR]: "open-preferences" }}
        class={cx("btnContainer")}
        style={positionStyles}
      >
        <Button
          title={t("modal.title")}
          aria-label={t("modal.title")}
          onClick={onClick}
          className={cx("button")}
        >
          {floatingBtn.icon ? <Svg src={floatingBtn.icon} /> : <span className={cx('d-block', 'icon')} />}
        </Button>
      </span>
    </RootContainer>
  );
};

export interface IReopenSettingsButtonProps {
  onClick: () => void;
}

export default ReopenSettingsButton;
