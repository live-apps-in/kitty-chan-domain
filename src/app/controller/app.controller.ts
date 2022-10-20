import { response } from 'express';
import { controller, httpGet, request } from 'inversify-express-utils';

@controller('')
export class AppController{
	constructor() { }
    
	@httpGet('/ping')
	async ping() {
		return {
			message: 'Pong!'
		};
	}
}