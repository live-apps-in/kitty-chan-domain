import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Req } from '../../../core/custom_types';
import { TYPES } from '../../../core/inversify.types';
import { InternalAuthGuard } from '../../auth/guards/InternalAuthGuard';
import { UserService } from '../service/user.service';

@controller('/live_cord')
export class UserController{
	constructor(
        @inject(TYPES.UserService) private readonly userService: UserService
	) { }
    
    ///Fetch User Details (Discord)
    @httpPost('/user/profile', InternalAuthGuard)
	async profile(req: Request) {
		const discord_username: any = req.body.discord_username;
		return this.userService.profile(discord_username);
	}

    ///Send DM to a User
    @httpPost('/user/send_message', InternalAuthGuard)
    async sendMessage(req: Req) {
    	const {discord_username, message } = req.body;

    	await this.userService.send_direct_message(discord_username, message);
    	return {
    		status: 'success',
    		discord_username,
    		message
    	};
    }
}