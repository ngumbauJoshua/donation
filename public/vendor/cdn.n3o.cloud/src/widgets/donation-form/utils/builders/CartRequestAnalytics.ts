import { AnalyticsService } from "@/services/AnalyticsService";
import { ConnectTagCollectionReq } from '@n3oltd/karakoram.cart.sdk.connect';
import { PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";

/**
 * Handles analytics and tagging for cart requests
 */
export class CartRequestAnalytics {
  /**
   * Captures form data and returns analytics tags
   */
  static captureAndGetTags(designation: PublishedDesignation): ConnectTagCollectionReq {
    AnalyticsService.captureFormData(designation.name!);
    
    return {
      entries: AnalyticsService.getSimpleArray()
    };
  }
}
