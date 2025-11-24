import { useTranslation } from "@/i18n";
import {DialogTitle, DialogDescription, DialogFooter, Button, useCurrencySelectorContext } from "@n3oltd/n3o-ui-components";
import { useCartClear } from "../hooks/useCartClear";
import { useSharedCrossWidgetComm } from "@/widgets/hooks/useSharedCrossWidgetComm";
import { EVENTS } from "@/utils/events/events";

export const CurrencyChangeConfirmation = () => {
  const {
    currentCurrency,
    handleConfirmCurrencyChange,
    handleCancelCurrencyChange,
  } = useCurrencySelectorContext();
  
  const {formatMessage} = useTranslation();
  const {clearCart, isLoading} = useCartClear();
  const eventBus = useSharedCrossWidgetComm({
      debug: import.meta.env.DEV
    });

  const handleConfirmChange = () => {
    clearCart().then(() => {
      eventBus.emit(EVENTS.CART.refresh)
      handleConfirmCurrencyChange();
    });
  };

  return (
    <>
      <DialogTitle>{formatMessage('currency.confirmation.title')}</DialogTitle>
      <DialogDescription>
         <span
          dangerouslySetInnerHTML={{__html: `${formatMessage('currency.confirmation.description.html')}`}}
         ></span>
        </DialogDescription>
      <DialogFooter className="flex justify-end gap-2 mt-4">
        <Button onClick={handleConfirmChange} disabled={isLoading}>{formatMessage('currency.confirmation.button.yes')}</Button>
        <Button variant="outline" onClick={handleCancelCurrencyChange}>{formatMessage('currency.confirmation.button.no', {
            symbol: currentCurrency.symbol,
            code: currentCurrency.code
          })}</Button>
      </DialogFooter>
    </>
  );
};