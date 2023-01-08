import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../core/inversify.types';
import { AnalyticsService } from '../service/analytics.service';


@controller('/analytics')
export class DashboardController{
	constructor(
        @inject(TYPES.AnalyticsService) private readonly analyticsService: AnalyticsService
	) { }
    
	///Get Message Count
	@httpGet('/message_count')
	async messageCount() {
		return this.analyticsService.messageCount()
	}

    @httpGet('/text_leaderboard')
	async text_leaderboard(){
		const leaderboard = await this.analyticsService.text_leaderboard();
		return leaderboard;
	}
}