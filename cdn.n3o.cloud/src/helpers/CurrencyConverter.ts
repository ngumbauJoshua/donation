import { PublishedCurrency } from "@n3oltd/karakoram.connect.sdk.types";

export interface CurrencyConversionOptions {
  roundToDecimalPlaces?: number;
  roundingMode?: 'round' | 'floor' | 'ceil';
}

export interface ExtendedCurrency {
  code: string;
  symbol: string;
  name: string;
  icon?: string;
  decimalDigits?: number;
  isBaseCurrency?: boolean;
  rate: number;
}

/**
 * Static currency conversion utility class
 */
export class CurrencyConverter {
  
  private static _currencies: Record<string, ExtendedCurrency> | null = null;
  private static _baseCurrency: ExtendedCurrency | null = null;

  /**
   * Initialize the converter with currencies data
   */
  static initialize(currencies: Record<string, ExtendedCurrency>): void {
    this._currencies = currencies;
    this._baseCurrency = this.findBaseCurrency(currencies);
  }

  /**
   * Get the current currencies
   */
  static getCurrencies(): Record<string, ExtendedCurrency> | null {
    return this._currencies;
  }

  /**
   * Get the base currency
   */
  static getBaseCurrency(): ExtendedCurrency | null {
    return this._baseCurrency;
  }

  /**
   * Find the base currency from a currencies object
   */
  static findBaseCurrency(currencies: Record<string, ExtendedCurrency>): ExtendedCurrency | null {
    return Object.values(currencies).find(currency => currency.isBaseCurrency) || null;
  }

  /**
   * Get the exchange rate for a currency
   */
  static getExchangeRate(currency: ExtendedCurrency | PublishedCurrency | { rate?: number }): number {
    if ('rate' in currency && typeof currency.rate === 'number') {
      return currency.rate;
    }
    return 1;
  }

  /**
   * Convert an amount to target currency (simplified API)
   * Uses the stored base currency automatically
   */
  static convertAmount(
    amount: number | null | undefined,
    targetCurrency: ExtendedCurrency | string,
    options: CurrencyConversionOptions = {}
  ): number | null {
    if (amount == null) {
      return null;
    }

    if (amount === 0) {
      return 0;
    }

    const baseCurrency = this.getBaseCurrency();
    if (!baseCurrency) {
      console.warn('CurrencyConverter not initialized. Call CurrencyConverter.initialize() first.');
      return amount;
    }

    let _targetCurrency: ExtendedCurrency;
    if (typeof targetCurrency === 'string') {
      const currencies = this.getCurrencies();
      if (!currencies || !currencies[targetCurrency]) {
        console.warn(`Currency ${targetCurrency} not found in stored currencies.`);
        return amount;
      }
      _targetCurrency = currencies[targetCurrency];
    } else {
      _targetCurrency = targetCurrency;
    }

    return this.convertBetweenCurrencies(amount, baseCurrency, _targetCurrency, options);
  }

  /**
   * Convert an amount between specific currencies (advanced API)
   */
  static convertBetweenCurrencies(
    amount: number | null | undefined,
    fromCurrency: ExtendedCurrency | PublishedCurrency | { rate?: number },
    toCurrency: ExtendedCurrency | PublishedCurrency | { rate?: number },
    options: CurrencyConversionOptions = {}
  ): number | null {
    if (amount == null) {
      return null;
    }

    if (amount === 0) {
      return 0;
    }

    const fromRate = this.getExchangeRate(fromCurrency);
    const toRate = this.getExchangeRate(toCurrency);

    if (fromRate === toRate) {
      return amount;
    }

    const amountInBase = amount / fromRate;
    const convertedAmount = amountInBase * toRate;
    
    const decimalPlaces = options.roundToDecimalPlaces ?? 2;
    const multiplier = Math.pow(10, decimalPlaces);
    
    switch (options.roundingMode) {
      case 'floor':
        return Math.floor(convertedAmount * multiplier) / multiplier;
      case 'ceil':
        return Math.ceil(convertedAmount * multiplier) / multiplier;
      case 'round':
      default:
        return Math.round(convertedAmount * multiplier) / multiplier;
    }
  }
}

export const convertAmountToDisplay = (amount: number | null | undefined, currency: ExtendedCurrency | null) => {
  if (!currency) return amount;

  return CurrencyConverter.convertAmount(amount, currency);
};