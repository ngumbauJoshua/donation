import {
  BANNER_WIDGET_LOCATION_BOTTOM,
  BannerWidgetLocation,
} from "types/config-files/mainConfig";
import { type FunctionComponent } from "preact";
import classNames from "helpers/classNames";
import styles from "./Banner.module.scss";

const cx = classNames(styles);

const Banner: FunctionComponent<IBannerProps> = ({
  location = BANNER_WIDGET_LOCATION_BOTTOM,
  children,
}) => {
  return (
    <div class={cx("bannerContainer", `location-${location}`)}>{children}</div>
  );
};

export interface IBannerProps {
  location: BannerWidgetLocation;
}

export default Banner;
