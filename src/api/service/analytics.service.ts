import TextLog from '../../model/text_log';
import 'dotenv/config';
import { injectable } from 'inversify';
import kitty_chan from '../../model/kitty_chan';

@injectable()
export class AnalyticsService{
	private gamers_hub_guild_id = process.env.GAMERS_HUB_GUILD_ID;

	async messageCount() {
		const count = await kitty_chan.findOne({});
		return count;
	}
	
	async text_leaderboard() {
        
		const leader_board = await TextLog.aggregate([
			{
				$match: {
					guildId: this.gamers_hub_guild_id
				}
			},
			{
				$limit: 10
			},
			{
				$addFields: {
					avatarUrl: {
						$concat: ['https://cdn.discordapp.com/avatars/', '$userId','/', '$avatar']
					}
				}
			},
			{
				$sort: {
					count: -1
				}
			}
    
		]);

		return leader_board;
	}
}