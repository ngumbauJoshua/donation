import React from 'react';
import { CurrencyConverter, ExtendedCurrency, CurrencyConversionOptions } from '../helpers/CurrencyConverter';

type CurrencyChangeData = {
  newCurrency: ExtendedCurrency;
  oldCurrency: ExtendedCurrency | null;
};

type EventCallback<T = any> = (data: T) => void;

class CurrencyEventEmitter {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  on<T = any>(event: string, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  emit<T = any>(event: string, data: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  off<T = any>(event: string, callback: EventCallback<T>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

class CurrencyStore {
  private currentCurrency: ExtendedCurrency | null = null;
  private previousCurrency: ExtendedCurrency | null = null;
  private eventEmitter: CurrencyEventEmitter = new CurrencyEventEmitter();

  setCurrency(currency: ExtendedCurrency): void {
    const oldCurrency = this.currentCurrency;
    this.previousCurrency = oldCurrency;
    this.currentCurrency = currency;
    
    this.eventEmitter.emit('currencyChanged', {
      newCurrency: currency,
      oldCurrency: oldCurrency
    });
  }

  getCurrency(): ExtendedCurrency | null {
    return this.currentCurrency;
  }

  getPreviousCurrency(): ExtendedCurrency | null {
    return this.previousCurrency;
  }

  subscribe(callback: EventCallback<CurrencyChangeData>): () => void {
    return this.eventEmitter.on<CurrencyChangeData>('currencyChanged', callback);
  }

  convertAmount(amount: number | null | undefined, options: CurrencyConversionOptions = {}): number | null {
    if (!this.previousCurrency || !this.currentCurrency || !amount) {
      return amount || null;
    }

    return CurrencyConverter.convertBetweenCurrencies(
      amount,
      this.previousCurrency,
      this.currentCurrency,
      options
    );
  }
}

export const currencyStore = new CurrencyStore();

export function useCurrencyObserver(initialAmount: number | null = null, options: CurrencyConversionOptions = {}) {
  const [currentCurrency, setCurrentCurrency] = React.useState<ExtendedCurrency | null>(() => currencyStore.getCurrency());
  const [amount, setAmount] = React.useState<number | null>(initialAmount);
  const [isConverting, setIsConverting] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = currencyStore.subscribe(({ newCurrency, oldCurrency }) => {
      setCurrentCurrency(newCurrency);
      
      if (amount && oldCurrency && newCurrency && oldCurrency.code !== newCurrency.code) {
        setIsConverting(true);
        
        const convertedAmount = CurrencyConverter.convertBetweenCurrencies(
          amount,
          oldCurrency,
          newCurrency,
          options
        );
        
        setAmount(convertedAmount);
        setIsConverting(false);
      }
    });

    return unsubscribe;
  }, [amount, options]);

  const updateCurrency = React.useCallback((newCurrency: ExtendedCurrency) => {
    currencyStore.setCurrency(newCurrency);
  }, []);

  const updateAmount = React.useCallback((newAmount: number | null) => {
    setAmount(newAmount);
  }, []);

  const convertToCurrency = React.useCallback((targetCurrency: ExtendedCurrency): number | null => {
    if (!amount || !currentCurrency) return amount;
    
    return CurrencyConverter.convertBetweenCurrencies(
      amount,
      currentCurrency,
      targetCurrency,
      options
    );
  }, [amount, currentCurrency, options]);

  return {
    currency: currentCurrency,
    amount,
    isConverting,
    updateCurrency,
    updateAmount,
    convertToCurrency,
    setCurrency: updateCurrency,
    setAmount: updateAmount
  };
}

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = React.useState<ExtendedCurrency | null>(() => currencyStore.getCurrency());

  React.useEffect(() => {
    const unsubscribe = currencyStore.subscribe(({ newCurrency }) => {
      setCurrentCurrency(newCurrency);
    });

    return unsubscribe;
  }, []);

  const updateCurrency = React.useCallback((newCurrency: ExtendedCurrency) => {
    currencyStore.setCurrency(newCurrency);
  }, []);

  return {
    currency: currentCurrency,
    setCurrency: updateCurrency
  };
}
