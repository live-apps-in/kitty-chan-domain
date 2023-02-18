import { EmbedBuilder } from 'discord.js';
import { inject, injectable } from 'inversify';
import { ReactionRolesActionDto } from '../../../api/_dto/roles.dto';
import { TYPES } from '../../../core/inversify.types';
import { DiscordEmbeds } from '../../../types/discord.types';
import ReactionRoles from '../../../model/reaction_roles.model';
import { ResponseService } from '../shared/response.service';
import { HttpException } from '../../../core/exception';
import { REPLY } from '../../enum/reply';


@injectable()
export class RolesService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) { }
    
	async createReactionRole(dto: ReactionRolesActionDto) {
		const { guildId, channelId, rolesMapping } = dto;
		const embed: DiscordEmbeds[] = [{
			...dto.discordEmbedConfig
		}];
        
		 
		const res:any = await this.responseService.embedMessage(embed, {
			guildId: dto.guildId,
			channelId: dto.channelId
		});

		if (!res?.id) throw new HttpException('Unable to create Reaction Role', 400);

		///Persist Role mapping
		await ReactionRoles.insertMany({
			name: dto.name,
			guildId: dto.guildId,
			channelId: dto.channelId,
			rolesMapping: dto.rolesMapping,
			messageId: res.id
		});

		///Map all emoji
		for (let index = 0; index < rolesMapping.length; index++) {
			const emoji= rolesMapping[index].emoji;
			await this.responseService.respond({
				type: REPLY.addReaction,
				guild: {guildId, channelId, messageId: res.id},
				body: {
					emoji: emoji.type ===  'classic' ? encodeURIComponent(emoji.emoji) :  encodeURIComponent(`${emoji.name}:${emoji.id}`)
				}
			});
		}

		const reaction_role_message_ref = res.id;
		return {
			reaction_role_message_ref
		};
	}
}
console.log(encodeURIComponent('val:1047880702739365890'));
console.log(encodeURIComponent('🏆'));