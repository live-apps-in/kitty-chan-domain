import { client } from '../app/app';
import ReactionRoles from '../model/reaction_roles.model';


export class OnInit{
	async bootstrap() {
		await this.loadReactionRoles();
	}

	private async loadReactionRoles() {
		console.log('Loading Reaction Roles Cache');
		const messages = await ReactionRoles.find({}, { messageId: 1, channelId: 1 });
		for (const message of messages) {
			const channel: any = await client.channels.fetch(message.channelId);
			await channel.messages.fetch(message.messageId);
		}
	}
}