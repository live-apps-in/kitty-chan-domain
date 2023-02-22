import { ActivityType } from 'discord.js';
import { controller, httpPatch } from 'inversify-express-utils';
import { client } from '../../app/app';


@controller('/config')
export class ConfigController{

    @httpPatch('/activity_status')
	async activityStatus() {
		client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
	}
}