import { ActivityType } from 'discord.js';
import { Request } from 'express';
import { controller, httpPatch } from 'inversify-express-utils';
import { client } from '../../app/app';


@controller('/config')
export class ConfigController{

    @httpPatch('/activity_status')
	async activityStatus(req: Request) {
		console.log('hi');
		client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
	}
}