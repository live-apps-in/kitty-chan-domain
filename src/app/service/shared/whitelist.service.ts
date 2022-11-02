import { injectable } from 'inversify';


@injectable()
export class WhiteListService{

	validate() {
	}
}

export function middleware() {
	return function(target: any, propertyKey: string) {
	};
}