import { FeatureDefault } from '../../../common/dto/features-default.dto';

/**Portal Config */
export interface PortalDto extends FeatureDefault {
  channelId: string;
}

/**Portal Room */
export interface PortalRoomDto {
  description: string;
  tags: string[];
}
