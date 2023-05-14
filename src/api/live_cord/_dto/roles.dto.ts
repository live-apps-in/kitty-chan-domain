import { DiscordEmbeds } from '@live-apps/discord';

/**
 * Reaction Roles
 */
export class ReactionRolesActionDto {
  name: string;
  guildId: string;
  channelId: string;
  action: string;
  rolesMapping: any[];
  reactionRoleMessageRef: string;
  discordEmbedConfig?: DiscordEmbeds;
}
