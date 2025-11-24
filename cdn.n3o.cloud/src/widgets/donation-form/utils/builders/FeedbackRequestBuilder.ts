import { ConnectAddToCartReq, AllocationType, TransactionType, NewCustomFieldsReq, NewCustomFieldReq } from '@n3oltd/karakoram.cart.sdk.connect';
import { DesignationType, GiftType } from "@n3oltd/karakoram.platforms.sdk.types";
import { Currency, CustomFieldType } from "@n3oltd/karakoram.connect.sdk.types";
import { DesignationRequestBuilder, CartRequestParams, CustomFieldValue } from './interfaces';
import { CartRequestAnalytics } from './CartRequestAnalytics';

/**
 * Builder for Feedback designation requests
 */
export class FeedbackRequestBuilder implements DesignationRequestBuilder {
  
  canHandle(params: CartRequestParams): boolean {
    return params.designation?.type === DesignationType.Feedback;
  }

  validate(params: CartRequestParams): void {
    if (!params.designation?.type) {
      throw new Error('Designation type is required');
    }
    
    if (params.designation.type !== DesignationType.Feedback) {
      throw new Error('FeedbackRequestBuilder can only handle Feedback designations');
    }
    
    if (!params.designation.feedback?.scheme?.id) {
      throw new Error('Feedback scheme ID is required');
    }
    
    if (!params.targetCurrency?.code) {
      throw new Error('Target currency is required');
    }
  }

  build(params: CartRequestParams): ConnectAddToCartReq {
    this.validate(params);
    
    const transactionType = params.frequency === GiftType.OneTime 
      ? TransactionType.Donation 
      : TransactionType.RegularGiving;
    
    const tags = CartRequestAnalytics.captureAndGetTags(params.designation);
    const formattedCustomFields = this.formatCustomFields(params.customFields || []);
    
    return {
      type: transactionType,
      quantity: params.quantity,
      item: {
        tags,
        type: AllocationType.Feedback,
        fundDimensions: params.fundDimensions,
        feedback: {
          scheme: params.designation.feedback?.scheme?.id || '',
          customFields: formattedCustomFields,
        },
        value: {
          amount: params.itemAmount,
          currency: params.targetCurrency?.code as Currency,
        }
      }
    };
  }

  /**
   * Formats custom fields for the request
   */
  private formatCustomFields(customFields: CustomFieldValue[]): NewCustomFieldsReq {
    return {
      entries: customFields
        .filter(
          (field) =>
            field.value !== null &&
            field.value !== undefined &&
            field.value !== "",
        )
        .map((field) => {
          const entry: NewCustomFieldReq = {
            alias: field.alias,
          };

          switch (field.type) {
            case CustomFieldType.Bool:
              entry.bool = field.value as boolean;
              break;
            case CustomFieldType.Date:
              entry.date = field.value as string;
              break;
            case CustomFieldType.Text:
            default:
              entry.text = field.value as string;
              break;
          }

          return entry;
        }),
    };
  }
}
