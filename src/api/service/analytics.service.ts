import TextLog from "../../app/model/text_log";
import 'dotenv/config'
import { injectable } from "inversify";

@injectable()
export class AnalyticsService{
    private gamers_hub_guild_id = process.env.GAMERS_HUB_GUILD_ID
    constructor() { }
    
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
    
        ])

        return leader_board
    }
}