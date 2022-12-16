import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { FeatureFlagService } from '../../app/service/shared/featureFlag.service';
import { TYPES } from '../../core/inversify.types';

@controller('/feature_flag')
export class FeatureFlagController{
	constructor(
        @inject(TYPES.FeatureFlagService) private readonly featureFlagService: FeatureFlagService
	) { }
    
    @httpPost('')
	async create(req: Request) {
		await this.featureFlagService.create_featureFlag(req.body);
		return {
			message: 'Feature Flag Created'
		};
	}
    
    @httpGet('')
    async view() {
    	return await this.featureFlagService.viewAllFeatureFlag();
     
    }
    @httpPatch('')
    async update(req: Request) {
    	await this.featureFlagService.update_featureFlag(req.body._id, req.body);
    	return {
    		message: 'Feature Flag Updated'
    	};
    }

}