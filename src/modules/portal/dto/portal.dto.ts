import { FeatureDefault } from '../../../common/dto/FeaturesDefault.dto';

/**Portal Config */
export class PortalDto extends FeatureDefault {
  channelId: string;
}

/**Portal Room */
export class PortalRoomDto {
  description: string;

  tags: string[];
}
