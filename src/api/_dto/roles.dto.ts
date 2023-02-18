/**
 * Reaction Roles
 */
export class ReactionRolesActionDto{
	name: string;
	guildId: string;
	channelId: string;
	action: string;
	rolesMapping: any[];
	reaction_role_message_ref: string;
	discordEmbedConfig?: any;
}