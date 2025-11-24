import { useCallback, useEffect, useState } from "react";
import { CartRes } from "@n3oltd/karakoram.cart.sdk.connect";

import { useApi } from "@/api/common/hooks/useApi";
import { _cartClient } from "@/api/common/clients/ConnectRestClients";
import { useEnvironmentContext } from "@/api/common/contexts/EnvironmentProvider";
import { ConnectApiClient } from "@/api/common/clients/ConnectApiClient";
import AppManager from "@/api/common/clients/AppManager";
import { EVENTS } from "@/utils/events/events";
import { useSharedCrossWidgetComm } from "../hooks/useSharedCrossWidgetComm";
import { getSubscriptionCode } from "@/utils/env";
import { getCartId } from "@/utils/cookie/cookie";

const IFRAME_CONTENT_ORIGIN = "https://n3o-checkout.com";
const IFRAME_ID = "cart-checkout-iframe";

const subscriptionId = getSubscriptionCode();

export function useCartItemsCount() {
  const [cartCount, setCartCount] = useState<number>(0);

  const eventBus = useSharedCrossWidgetComm({
    allowedOrigins: [IFRAME_CONTENT_ORIGIN],
    debug: import.meta.env.DEV,
  });

  const env = useEnvironmentContext();
  const { loaded } = env;

  const { execute: getCart, isLoading } = useApi<CartRes>({
    onSuccess: (response) => {
      setCartCount(response ? response.itemCount : 0);
    },
    onError: () => setCartCount(0),
  });

  const fetchCartCount = useCallback(async () => {
    const cartId = await getCartId();
    if (cartId && _cartClient) {
      const req = _cartClient.getById(cartId);
      getCart(req);
    } else {
      setCartCount(0);
    }
  }, [getCart]);

  useEffect(() => {
    const handleRefresh = () => fetchCartCount();

    const unsubscribe = eventBus.on(EVENTS.CART.refresh, handleRefresh);

    return () => unsubscribe();
  }, [eventBus, fetchCartCount]);

  useEffect(() => {
    if (!loaded) return;

    AppManager.initialize(env);
    ConnectApiClient.setSubscriptionId(subscriptionId);

    fetchCartCount();
  }, [loaded, env, fetchCartCount]);

  useEffect(() => {
    const handleCartOpenRequest = () => {
      const iframe = document.getElementById(
        IFRAME_ID,
      ) as HTMLIFrameElement | null;
      if (iframe && iframe.contentWindow) {
        eventBus.emit(EVENTS.CHECKOUT.checkoutOpen, null, {
          targetWindow: iframe.contentWindow,
          targetOrigin: IFRAME_CONTENT_ORIGIN,
        });
      } else {
        eventBus.emit(EVENTS.CHECKOUT.checkoutOpen);
        console.error(
          "[CartItemsCount] Cannot find iframe window to send checkout message.",
        );
      }
    };

    const unsubscribe = eventBus.on(
      EVENTS.CART.requstCart,
      handleCartOpenRequest,
    );

    return () => unsubscribe();
  }, [eventBus]);

  const handleCartClick = () => {
    eventBus.emit(EVENTS.CART.requstCart);
  };

  return { cartCount, isLoading, handleCartClick };
}
