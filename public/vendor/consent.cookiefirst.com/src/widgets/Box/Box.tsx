import {
  BOX_WIDGET_LOCATION_BOTTOM_LEFT,
  BoxXLocation,
  BoxYLocation,
} from "types/config-files/mainConfig";

import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./Box.module.scss";
import useAppState from "hooks/useAppState";
import { NULL } from "constants/primitives";

const cx = classNames(styles);

const Box: FunctionComponent<IBoxProps> = ({
  location = BOX_WIDGET_LOCATION_BOTTOM_LEFT,
  children,
}) => {
  const [yPosition, xPosition] = location.split("-") as [
    BoxYLocation,
    BoxXLocation
  ];
  const { widgetConfig } = useAppState();
  return (
    <div
      class={cx(
        "boxContainer",
        `x-${xPosition}`,
        `y-${yPosition}`,
        widgetConfig.tcfEnabled ? "tcf" : NULL
      )}
    >
      {children}
    </div>
  );
};

export interface IBoxProps {
  location: string;
}

export default Box;
