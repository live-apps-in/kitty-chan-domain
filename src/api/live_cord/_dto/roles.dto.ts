import { DiscordEmbeds } from '@live-apps/discord/dist/shared/interface/embed.interface';

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
