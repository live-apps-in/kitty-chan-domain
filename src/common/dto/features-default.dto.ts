export interface FeatureDefault {
  isActive: boolean;
}

export interface FeatDefaultWithTemplates extends FeatureDefault {
  channelId: string;
  templateId: string;
}
