import { WIDGET_ATTR } from "core/config";
import dispatchJSEvent from "./dispatchJSEvent";
import integrationSettings from "core/integrationSettings";
import { coreLogger } from "./logger";
import isArray from "./isArray";

export const EVENT_NAME = "cf_layer_ready";

const dispatchLayerRenderedEvent = (element?: Element | null) => {
  if (!element || !(element instanceof HTMLElement)) {
    return;
  }

  const type = element.getAttribute(WIDGET_ATTR);
  if (!type) {
    if (import.meta.env.NODE_ENV !== "production") {
      throw new Error(
        `Element passed to dispatchLayerRenderedEvent has no ${WIDGET_ATTR} attribute`
      );
    }

    return;
  }
  coreLogger("Layer rendered", element);
  // dispach custom JS event
  dispatchJSEvent(EVENT_NAME, element);

  // dispatch event to TagManager
  const { dataLayer } = integrationSettings;
  if (isArray(window[dataLayer])) {
    window[dataLayer].push({ event: EVENT_NAME, layer: type });
  }
};

export default dispatchLayerRenderedEvent;
