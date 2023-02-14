/**
 * Reaction Roles
 */
export class ReactionRolesActionDto{
	guildId: string;
	channelId: string;
	action: string;
	reaction_role_message_ref: string;
	rolesMapping?: any;
}