import { EmbedBuilder } from 'discord.js';
import { inject, injectable } from 'inversify';
import { ReactionRolesActionDto } from '../../../api/_dto/roles.dto';
import { TYPES } from '../../../core/inversify.types';
import { DiscordEmbeds } from '../../../types/discord.types';
import { client } from '../../app';
import { ResponseService } from '../shared/response.service';


@injectable()
export class RolesService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService
	) { }
    
	async createReactionRole(dto: ReactionRolesActionDto) {
    
		const embed: DiscordEmbeds[] = [{
			...dto.discordEmbedConfig
		}];
        
		const res:any = await this.responseService.embedMessage(embed, {
			guildId: dto.guildId,
			channelId: dto.channelId
		});
		const reaction_role_message_ref = res?.id;
		return {
			reaction_role_message_ref
		};
	}
}