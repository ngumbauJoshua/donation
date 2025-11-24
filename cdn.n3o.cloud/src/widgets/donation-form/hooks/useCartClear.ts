import { _cartClient } from "@/api/common/clients/ConnectRestClients";
import { useApi } from "@/api/common/hooks/useApi";
import { getCartId } from "@/utils/cookie/cookie";
import { TransactionType } from "@n3oltd/karakoram.cart.sdk.connect";
import React from "react";

export const useCartClear = () => {
  const [error, setError] = React.useState("");

  const { execute, isLoading } = useApi({
    onSuccess: () => {
      setError("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const clearCart = React.useCallback(async () => {
    const cartId = await getCartId();

    return execute(
      _cartClient!.clear(cartId!, {
        type: [
          TransactionType.Donation,
          TransactionType.RegularGiving,
          TransactionType.ScheduledGiving,
        ],
      }),
    );
  }, [execute]);

  return { clearCart, isLoading, error };
};
