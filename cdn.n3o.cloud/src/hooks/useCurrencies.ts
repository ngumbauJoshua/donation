import React from 'react';
import { PublishedCurrencies, PublishedFileKind, ConnectSubscriptionFile } from '@n3oltd/karakoram.connect.sdk.types';
import { CurrencyConverter, ExtendedCurrency } from '../helpers/CurrencyConverter';
import { useCurrency } from './CurrencyStore';
import { useGetFile } from './useGetFile';

interface UseCurrenciesOptions {
  enabled?: boolean;
  currencies?: PublishedCurrencies,
  preview?: boolean
}

interface UseCurrenciesReturn {
  currencies: PublishedCurrencies | null;
  currenciesLoading: boolean;
  currenciesError: Error | null;
  currentCurrency: ExtendedCurrency | null;
  setCurrency: (currency: ExtendedCurrency) => void;
  isInitialized: boolean;
}

export function useCurrencies(options: UseCurrenciesOptions = {}): UseCurrenciesReturn {
  const { enabled = true, currencies: previewCurrencies, preview } = options;
  const { currency: currentCurrency, setCurrency } = useCurrency();
  const [isInitialized, setIsInitialized] = React.useState(false);

  const {
    data: currencies,
    loading: currenciesLoading,
    error: currenciesError
  } = useGetFile<PublishedCurrencies>(
    PublishedFileKind.Subscription,
    ConnectSubscriptionFile.Currencies,
    { enabled }
  );

  React.useEffect(() => {
    if (preview && !isInitialized) {
      CurrencyConverter.initialize(previewCurrencies?.currencies as Record<string, ExtendedCurrency>);
      setIsInitialized(true);

      if (!currentCurrency) {
        const foundBaseCurrency = CurrencyConverter.getBaseCurrency();
        if (foundBaseCurrency) {
          setCurrency(foundBaseCurrency);
        }
      }
    }
  }, [preview, previewCurrencies, isInitialized, currentCurrency, setCurrency]);

  React.useEffect(() => {
    if (!currenciesLoading && currencies && !isInitialized) {
      CurrencyConverter.initialize(currencies.currencies as Record<string, ExtendedCurrency>);
      setIsInitialized(true);

      if (!currentCurrency) {
        const foundBaseCurrency = CurrencyConverter.getBaseCurrency();
        if (foundBaseCurrency) {
          setCurrency(foundBaseCurrency);
        }
      }
    }
  }, [currenciesLoading, currencies, currentCurrency, setCurrency, isInitialized]);

  return {
    currencies,
    currenciesLoading,
    currenciesError,
    currentCurrency,
    setCurrency,
    isInitialized
  };
}
