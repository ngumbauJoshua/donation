import { TagCaptureService, type TagCaptureResult } from "@n3oltd/n3o-analytics-tags";

class AnalyticsServiceWrapper {
  private service: TagCaptureService;

  constructor() {
    this.service = new TagCaptureService();
  }

  captureAll(): TagCaptureResult {
    return this.service.captureAllTags();
  }

  setSuggestedAmountUsed(used: boolean): void {
    this.service.setSuggestedAmountUsage(used);
  }

  setDonationDesignation(designation: string): void {
    this.service.setDonationDesignation(designation);
  }

  setEndTime(endTime: Date): void {
    this.service.setSessionEndTime(endTime);
  }
  
  captureUrl(): void {
    this.service.captureCurrentUrl();
  }

  getSimpleArray(): { key: string; value: string }[] {
    return this.service.getSimpleTagArray();
  }

  reinitializeSession(): void {
    this.service.resetSession();
    this.service.clearJourneyTags();
    this.service = new TagCaptureService();
    this.service.captureAllTags();
  }

  captureFormData(designationName: string): void {
    this.service.setDonationDesignation(designationName);
    this.service.captureCurrentUrl();
    this.service.setSessionEndTime(new Date());
    this.service.setDuration();
  }
}

export const AnalyticsService = new AnalyticsServiceWrapper();


