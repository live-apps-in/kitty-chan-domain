import { injectable } from 'inversify';
import { client } from '../../../app/app';


@injectable()
export class UserService{

	async profile(discord_username: string) {
		client.guilds.cache.forEach(guild => {
			const member = guild.members.cache.find(member => member.user.username === discord_username);
			if (member) {
				console.log(`User found in guild "${guild.name}"`);
			}
		});
		return {name: 'Jaga'};
	}
}