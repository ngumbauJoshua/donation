import { GiftType } from "@n3oltd/karakoram.platforms.sdk.types";

export abstract class BaseFormValidator {
  protected static readonly VALID_GIFT_TYPES = Object.values(GiftType);

  /**
   * Sanitizes string input by removing HTML tags and entities
   */
  protected static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }
    
    // Remove HTML tags and trim whitespace
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[^;]+;/g, '') // Remove HTML entities
      .trim();
  }

  /**
   * Checks if an object is a valid plain object (not null, not array)
   */
  protected static isValidObject(obj: any): obj is Record<string, any> {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }
  
  /**
   * Sanitizes a record of string values
   */
  protected static sanitizeStringRecord(record: Record<string, any>): Record<string, string> {
    const sanitized: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(record)) {
      if (typeof key === 'string' && key.trim().length > 0) {
        const sanitizedKey = key.trim();
        if (typeof value === 'string' || typeof value === 'number') {
          sanitized[sanitizedKey] = String(value).trim();
        }
      }
    }
    
    return sanitized;
  }

  /**
   * Validates and sanitizes a numeric amount
   */
  protected static validateAmount(amount: any): number | undefined {
    const numericAmount = Number(amount);
    if (!isNaN(numericAmount) && numericAmount >= 0) {
      return Math.round(numericAmount * 100) / 100;
    }
    return undefined;
  }

  /**
   * Validates and sanitizes a positive integer quantity
   */
  protected static validateQuantity(quantity: any): number | undefined {
    const numericQuantity = Number(quantity);
    if (!isNaN(numericQuantity) && numericQuantity > 0) {
      return Math.floor(numericQuantity);
    }
    return undefined;
  }
}