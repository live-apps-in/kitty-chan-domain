import { inject, injectable } from 'inversify';
import { client } from '../../../app/app';
import { ACTIONS } from '../../../app/enum/action';
import { ActionService } from '../../../app/service/shared/action.service';
import { ResponseService } from '../../../app/service/shared/response.service';
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
		let user: any;
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


		if (user) {
			user.guilds = guilds;
			const promises = user.guilds.map(async e => {
				const guild = await client.guilds.cache.get(e.id);
				const member = await guild.members.fetch(user.id);
				if (member.guild.ownerId === user.id) {
					e.isOwner = true;
				}
			});

			await Promise.all(promises);
		}

		return user;
		
	}

	///Send Direct Message
	async send_direct_message(discord_username: string, message: string) {
		let user: any;
		client.guilds.cache.forEach(guild => {
			const member = guild.members.cache.find(member => member.user.username === discord_username);
			console.log(member, discord_username);
			if (member) {
				user = member;
				return;
			}
		});

		console.log(user);
		
	}
}