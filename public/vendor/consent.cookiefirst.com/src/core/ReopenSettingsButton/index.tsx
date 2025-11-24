import ReopenSettingsButton, {
  IReopenSettingsButtonProps,
} from "./ReopenSettingsButton";

import { type FunctionComponent } from "preact";
import { _DOCUMENT_ } from "constants/dom";
import { createPortal } from "helpers/portals";

const ReopenSettingsButtonContainer: FunctionComponent<
  IReopenSettingsButtonProps
> = (props) => {
  return createPortal(<ReopenSettingsButton {...props} />, _DOCUMENT_.body);
};

export default ReopenSettingsButtonContainer;
