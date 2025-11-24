import configuration from '@/configuration.json';

export enum FeatureFlag {
  FEEDBACKS = 'feedbacks',
  SPONSORSHIPS = 'sponsorships',
  SCHEDULED_GIVING = 'scheduledGiving',
}

export interface FeatureConfig {
  features: FeatureFlag[];
}
export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return (configuration as FeatureConfig).features.includes(feature);
};

export const FEATURES = {
  FEEDBACKS: isFeatureEnabled(FeatureFlag.FEEDBACKS),
  SPONSORSHIPS: isFeatureEnabled(FeatureFlag.SPONSORSHIPS),
  SCHEDULED_GIVING: isFeatureEnabled(FeatureFlag.SCHEDULED_GIVING),
} as const;

export const getEnabledFeatures = (): FeatureFlag[] => {
  return (configuration as FeatureConfig).features;
};

export const hasAnyFeature = (features: FeatureFlag[]): boolean => {
  return features.some(feature => isFeatureEnabled(feature));
};

export const conditionalExport = <T>(feature: FeatureFlag, exportValue: T): T | null => {
  return isFeatureEnabled(feature) ? exportValue : null;
};