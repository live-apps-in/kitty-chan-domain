import { injectable, inject } from 'inversify';
import { evaluate } from 'mathjs';
import { TYPES } from '../../core/inversify.types';
import { IGuild } from '../interface/shared.interface';
import { ResponseService } from './shared/response.service';


@injectable()
export class MathService{
	constructor(
        @inject(TYPES.ResponseService) private readonly responseService: ResponseService,
	) { }
    
	async evaluate(expression: string, guild: IGuild) {
		try {
			const getResult = await evaluate(expression);
			console.log(getResult);
		} catch (error) {
			this.responseService.replyMessage('I didnt understand', guild);
			return;
		}
		// this.responseService.replyMessage(getResult, guild)
		return true; 
	}
}