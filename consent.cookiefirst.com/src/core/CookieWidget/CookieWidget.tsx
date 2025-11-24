import { useLayoutEffect, useMemo } from "preact/hooks";

import Backdrop from "core/Backdrop";
import CookieWidgetContent from "components/CookieWidgetContent";
import { type FunctionComponent } from "preact";
import { WIDGET_ATTR } from "core/config";
import dispatchLayerRenderedEvent from "helpers/dispatchLayerRenderedEvent";
import getCookieWidgetConfig from "helpers/getCookieWidgetConfig";
import useAppState from "hooks/useAppState";
import RootContainer from "core/RootContainer/RootContainer";
import {
  BoxWidgetLocation,
  WIDGET_TYPE_BOX,
} from "types/config-files/mainConfig";

const CookieWidget: FunctionComponent = () => {
  const {
    widgetConfig: { type, location, backdropEnabled },
    activePanelTab,
  } = useAppState();

  useLayoutEffect(() => {
    dispatchLayerRenderedEvent(
      document.querySelector(`[${WIDGET_ATTR}="${type}"]`)
    );
  }, [type]);

  const [Widget, widgetProps] = useMemo(() => {
    return getCookieWidgetConfig(
      type as typeof WIDGET_TYPE_BOX,
      location as BoxWidgetLocation
    );
  }, [type, location]);

  return (
    <RootContainer isDialog={true} forceHidden={!!activePanelTab}>
      {!!backdropEnabled && <Backdrop show />}
      {!!Widget && (
        <Widget {...widgetProps}>
          <CookieWidgetContent />
        </Widget>
      )}
    </RootContainer>
  );
};

export default CookieWidget;
