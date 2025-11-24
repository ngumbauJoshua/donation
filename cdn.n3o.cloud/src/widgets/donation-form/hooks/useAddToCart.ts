import { ConnectAddToCartReq, ConnectBulkAddToCartReq } from "@n3oltd/karakoram.cart.sdk.connect";
import { generateUuid } from "@azure/ms-rest-js";

import { _cartClient } from "@/api/common/clients/ConnectRestClients";
import { useApi } from "@/api/common/hooks/useApi";
import { getCartId, setCartId} from "@/utils/cookie/cookie";
import { ToastService } from "@/services/ToastService";
import { useTranslation } from "@/i18n";

interface ValidationError {
  property: string | null;
  error: string;
  severity: "error" | "warning";
}

const handleValidationErrors = (
  error: any,
  formatMessage: (key: string) => string,
) => {
  if (error?.status === 412 || error?.status === 409) {
    const validationErrors = error?.data?.errors || [];

    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .filter((validationError: ValidationError) => validationError.error)
        .map(
          (validationError: ValidationError, index: number) =>
            `${index + 1}. ${validationError.error}`,
        )
        .join("\n");

      const fullErrorMessage = `${formatMessage("cart.add.validation.error")}\n\n${errorMessages}`;

      ToastService.error(fullErrorMessage, {
        duration: 8000,
      });
    } else {
      const errorMessage =
        error?.title || error?.detail || formatMessage("cart.add.error");
      ToastService.error(errorMessage, { duration: 5000 });
    }
  } else {
    ToastService.error(formatMessage("cart.add.error"));
  }
};

interface UseAddToCartOptions {
  onSuccess?: () => void;
  onBulkSuccess?: (itemCount?: number) => void;
}

export function useAddToCart(options?: UseAddToCartOptions) {
  const { formatMessage } = useTranslation();

  const {
    execute: addToCart,
    isLoading: isAddingToCart,
    error: cartError,
  } = useApi({
    onSuccess: () => {
      ToastService.success(formatMessage("cart.add.success"));
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleValidationErrors(error, formatMessage);
    },
  });

  const {
    execute: bulkAddToCart,
    isLoading: isBulkAddingToCart,
    error: bulkCartError,
  } = useApi({
    onSuccess: () => {
      options?.onBulkSuccess?.(); 
    },
    onError: (error) => {
      handleValidationErrors(error, formatMessage);
    },
  });

  const handleAddToCart = async (req: ConnectAddToCartReq) => {
    const cartId = (await getCartId()) || generateUuid();
    await setCartId(cartId);
    await addToCart(_cartClient!.add(cartId, req));
  };

  const handleBulkAddToCart = async (requests: ConnectAddToCartReq[]) => {

    const cartId = (await getCartId()) || generateUuid();
    await setCartId(cartId);
    
    const bulkRequest: ConnectBulkAddToCartReq = {
      items: requests
    };

    await bulkAddToCart(_cartClient!.bulkAdd(cartId, bulkRequest));
    
  };

  return {
    addToCart: handleAddToCart,
    bulkAddToCart: handleBulkAddToCart,
    isAddingToCart: isAddingToCart || isBulkAddingToCart,
    cartError: cartError || bulkCartError,
  };
}
