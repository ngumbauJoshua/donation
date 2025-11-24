import {
  BANNER_WIDGET_LOCATION_BOTTOM,
  BOX_WIDGET_LOCATION_BOTTOM_LEFT,
  BannerWidgetLocation,
  BoxWidgetLocation,
  WIDGET_TYPE_BANNER,
  WIDGET_TYPE_BOX,
  WidgetLocations,
  WidgetType,
} from "types/config-files/mainConfig";

import Banner, { IBannerProps } from "../widgets/Banner";
import Box, { IBoxProps } from "../widgets/Box";
import { UNKNOWN_BANNER_TYPE } from "constants/errors";
import includes from "./includes";
import { FunctionComponent } from "preact";

type TypesConfigsMap = {
  banner: [typeof Banner, BannerWidgetLocation];
  box: [typeof Box, BoxWidgetLocation];
};
export const TYPES_CONFIGS: TypesConfigsMap = {
  [WIDGET_TYPE_BANNER]: [Banner, BANNER_WIDGET_LOCATION_BOTTOM],
  [WIDGET_TYPE_BOX]: [Box, BOX_WIDGET_LOCATION_BOTTOM_LEFT],
};

function getCookieWidgetConfig(
  type: typeof WIDGET_TYPE_BOX,
  loc: BoxWidgetLocation
): BoxConfig;
function getCookieWidgetConfig(
  type: typeof WIDGET_TYPE_BANNER,
  loc: BannerWidgetLocation
): BannerConfig;

function getCookieWidgetConfig(
  type: WidgetType,
  location: BoxWidgetLocation | BannerWidgetLocation
): [
  FunctionComponent<IBannerProps> | FunctionComponent<IBoxProps>,
  { location: BannerWidgetLocation | BoxWidgetLocation }
] {
  const typeConfig = TYPES_CONFIGS[type];
  if (!typeConfig) {
    throw new Error(UNKNOWN_BANNER_TYPE);
  }

  const [WidgetComponent, defaultLocation] = typeConfig;
  const allowedLocations = WidgetLocations[type as WidgetType];

  const loc = includes(allowedLocations, location) ? location : defaultLocation;

  return [WidgetComponent, { location: loc }];
}

type BoxConfig = [typeof Box, { location: BoxWidgetLocation }];

type BannerConfig = [typeof Banner, { location: BannerWidgetLocation }];

export default getCookieWidgetConfig;
