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
  discordEmbedConfig?: any;
}
