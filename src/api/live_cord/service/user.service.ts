import { inject, injectable } from 'inversify';
import { client } from '../../../app/app';
import { ACTIONS } from '../../../app/enum/action';
import { ActionService } from '../../../app/service/shared/action.service';
import { ResponseService } from '../../../app/service/shared/response.service';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify.types';


@injectable()
export class UserService{
	constructor(
		@inject(TYPES.ActionService) private readonly actionService: ActionService
	){}
	///Fetch Discord Profile
	async profile(discord_username: string) {
		const guilds: any[] = [];

		///Fetch all Guild cache
		client.guilds.cache.forEach(guild => {
			guilds.push({
				name: guild.name,
				id: guild.id,
				isOwner: false
			});
		});
		

		///Fetch User info from Guild
		let user: any = { isValid: false };
		for (let index = 0; index < guilds.length; index++) {
			const guildId = guilds[index].id;

			const data = await this.actionService.call({
				type: ACTIONS.searchGuildUser,
				guild: {
					guildId
				},
				body: {
					username: discord_username
				}
			});

			if (data.length !== 0) {
				///Match Username and Tag
				if (discord_username === data[0].user.username +'#'+ data[0].user.discriminator) {
					user = {
						id: data[0].user.id,
						discord_username
					};
					break;
				}
			}
		}

		if(user.id) user.isValid = true;
		return user;
		
	}

	///Send Direct Message
	async send_direct_message(discord_id: string, message: string) {
		
		try {
			const user = await client.users.fetch(discord_id);
			await user.send(message);
			
		} catch (error) {
			throw new HttpException('Discord User not found', 400);
		}
	}
}