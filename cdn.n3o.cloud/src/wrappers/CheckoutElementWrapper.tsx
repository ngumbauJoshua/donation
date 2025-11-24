import { initializeSentry } from "../utils/sentry/intialize";

import React, { Suspense } from "react";
import * as Sentry from "@sentry/react";

import EnvironmentProvider from "@/api/common/contexts/EnvironmentProvider"
import { LoadingOverlay } from '@/Loader';
import { Drawer } from '@/widgets/checkout/components/Drawer';
import { useSharedCrossWidgetComm } from '@/widgets/hooks/useSharedCrossWidgetComm';
import { useRuntimeConfig } from '@/hooks/useRuntimeConfig';
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { getSubscriptionCode } from '@/utils/env';
import { EVENTS } from '@/utils/events/events';
import { syncCheckoutProp } from '@/widgets/checkout/utils/checkoutPropSync';
import { CheckoutProps } from "@/widgets/checkout/Checkout"
import { IntlProvider } from '@/i18n';
import { themeService } from "@/utils/themeService";
import { useThemeCSS } from "@/hooks/useThemeCSS";

const Checkout = React.lazy(() => import("@/widgets/checkout"));

const subscriptionId = getSubscriptionCode();

export const ElementWrapper = ({legacy, open, onClose}: CheckoutProps) => {
  const [cartOpen, setCartOpen] = React.useState<boolean>(open);
  const [hasPayitHash, setHasPayitHash] = React.useState<boolean>(false);

  const eventBus = useSharedCrossWidgetComm({
    debug: import.meta.env.DEV,
  });

  const { config, loading } = useRuntimeConfig();
  const { isLoading: isStyleLoading } = useThemeCSS({
    elementName: "n3o-checkout",
    env: config?.env
  });

  React.useEffect(() => {
    const unsubscibeOpen = eventBus.on(EVENTS.CHECKOUT.checkoutOpen, () => {
      setCartOpen(true);
    });

    const unsubscibeClose = eventBus.on(EVENTS.CHECKOUT.checkoutClose, () => {
      setCartOpen(false);
    });

    return () => {
      unsubscibeOpen();
      unsubscibeClose();
    };
  }, [eventBus]);

  React.useEffect(() => {
    if (config?.env) {
      initializeSentry(config?.env);

      Sentry.setContext("checkoutWidget", {
        version: "1.0.0",
        mode: "embedded",
        subscriptionId: subscriptionId,
    });
 }

  }, [config?.env]);


  React.useEffect(() => {
    const hasPayitHash = checkForPayitHash();

    if (hasPayitHash) {
      setCartOpen(true);
      setHasPayitHash(true);
      syncCheckoutProp(true);
    }
  }, []);

  React.useEffect(() => {
    const hasPayitHash = checkForPayitHash();

    setCartOpen(open || hasPayitHash);
    if (hasPayitHash) {
      syncCheckoutProp(true);
    }
  }, [open]);

  const handleClose = () => {
    setCartOpen(false);
    onClose?.();
  };

  if(!cartOpen || loading){
    return null;
  }

  if (loading || isStyleLoading) {
    <Drawer open={cartOpen}>
			<Drawer.Content>
				<LoadingOverlay isLoading={true} />
			</Drawer.Content>
		</Drawer>;
  }

  return (
		<Sentry.ErrorBoundary onError={() => syncCheckoutProp()}>
			<EnvironmentProvider environment={config?.env || "development"}>
				<Suspense
					fallback={
						<Drawer open={cartOpen}>
              <Drawer.Content>
                <LoadingOverlay isLoading={true} />
              </Drawer.Content>
						</Drawer>
					}
				>
					<Checkout
						subscriptionId={subscriptionId}
						open={cartOpen}
						onClose={handleClose}
						legacy={legacy}
						hasPayitHash={hasPayitHash}
					/>
				</Suspense>
			</EnvironmentProvider>
		</Sentry.ErrorBoundary>
	);
}

function checkForPayitHash() {
	const payitHashPatterns = [
		"#n3o/elements/callback/payit",
		"#n3o/platforms/callback/payit",
	];

	const url = window.location.href;
	const hasPayitHash = payitHashPatterns.some((pattern) =>
		url.includes(pattern)
	);
	return hasPayitHash;
}

export const CheckoutElementWrapper: React.FC<CheckoutProps> = (props) => {

  useApplyTheme(props.theme);
  themeService.setTheme(props.theme);

  return (
    <IntlProvider>
      <ElementWrapper {...props} />
    </IntlProvider>
  );
}
