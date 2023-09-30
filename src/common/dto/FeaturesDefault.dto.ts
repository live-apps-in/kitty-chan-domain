export class FeatureDefault {
  public isActive: boolean;
}

export class FeatDefaultWithTemplates extends FeatureDefault {
  public channelId: string;

  public templateId: string;
}
