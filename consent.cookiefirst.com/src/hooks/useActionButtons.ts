import { ActionButtonConfig, WIDGET_TYPE_BANNER } from "types/config-files/mainConfig";

import {
  ACTION_BUTTON_ACCEPT,
  ACTION_BUTTON_CUSTOMIZE,
  ACTION_BUTTON_REJECT,
  ACTION_BUTTON_REJECT_SECOND,
  ACTION_BUTTON_SAVE
} from "constants/actionButtons";
import useAppState from "./useAppState";

export type ActionButtonsLocation = "banner" | "modal";
export type RejectButtonType = "reject" | "reject_second";

const WIDTH_25 = "25%";
const WIDTH_50 = "50%";
const WIDTH_100 = "100%";

const useActionButtons = (
  location: ActionButtonsLocation = "banner",
  rejectBtnType: RejectButtonType = "reject"
): ActionButtonConfig[] => {
  const { widgetConfig } = useAppState();
  const showDeny = widgetConfig.denyBtn !== "hidden";
  const showDenySecond = widgetConfig.denyBtnSecond !== "hidden";

  if (location === "modal") {
    const order: ActionButtonConfig[] = [
      {
        value: ACTION_BUTTON_ACCEPT,
        width: showDenySecond ? WIDTH_100 : WIDTH_50,
      },
      {
        value: ACTION_BUTTON_SAVE,
        width: WIDTH_50,
      },
    ];
    if (showDenySecond && rejectBtnType === "reject_second") {
      order.push({
        value: ACTION_BUTTON_REJECT_SECOND,
        width: WIDTH_50,
      });
    }

    return order;
  }

  const order = widgetConfig.buttonsOrder || [];

  // handle sites without order configured (e.g. before feature has been introduced)
  if (!order.length) {
    // show accept button if toggles are disabled or accept all is enabled
    if (!widgetConfig.bannerToggles || widgetConfig.okAcceptsAll) {
      order.push({ value: ACTION_BUTTON_ACCEPT, width: WIDTH_50 });
    }

    // show save selection button if category toggles are enabled
    if (widgetConfig.bannerToggles) {
      order.push({ value: ACTION_BUTTON_SAVE, width: WIDTH_50 });
    }

    // show reject button if enabled
    if (showDeny && rejectBtnType === "reject") {
      order.push({ value: ACTION_BUTTON_REJECT, width: WIDTH_50 });
    }
    // show reject button if enabled
    if (showDenySecond && rejectBtnType === "reject_second") {
      order.push({ value: ACTION_BUTTON_REJECT_SECOND, width: WIDTH_50 });
    }

    // always show customize button
    order.push({ value: ACTION_BUTTON_CUSTOMIZE, width: WIDTH_50 });

    // set default buttons widths, compatible with previous layout
    return order.map((btn, index) => {
      // make first button wide if we have an odd number of buttons
      if (order.length % 2 === 1 && index === 0) {
        return { ...btn, width: WIDTH_100 };
      }

      // make all buttons 25% if we have 4 buttons on a wide banner
      if (order.length === 4 && widgetConfig.type === WIDGET_TYPE_BANNER) {
        return { ...btn, width: WIDTH_25 };
      }

      // otherwise use default 50% width
      return btn;
    });
  }

  return order;
};

export default useActionButtons;
