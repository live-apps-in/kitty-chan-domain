import { injectable } from 'inversify';
import client from '../database/redis';

@injectable()
export class RedisService{
	constructor() { }
    
	async set(key: string, value: string) {
		client.set(key, value);
	}

	async get(key: string) {
		return await client.get(key);
	}
}