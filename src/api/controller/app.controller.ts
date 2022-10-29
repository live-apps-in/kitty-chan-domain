import { controller, httpGet } from 'inversify-express-utils';

@controller('')
export class AppController{
    
	@httpGet('/ping')
	async ping() {
		return {
			message: 'Pong!'
		};
	}
}