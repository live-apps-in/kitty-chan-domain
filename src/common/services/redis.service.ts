import { injectable } from 'inversify';
import client from '../../database/redis';

@injectable()
export class RedisService {
  async set(key: string, value: string) {
    client.set(key, value);
  }

  async setWithExpiry(key: string, value: string, expiresAt = 86400) {
    client.set(key, value, 'EX', expiresAt);
  }

  async get(key: string) {
    return client.get(key);
  }

  async delete(key: string) {
    client.del(key);
  }

  async getFromSet(key: string) {
    return client.smembers(key);
  }

  async addToSet(key: string, value: string) {
    return client.sadd(key, value);
  }

  async removeFromSet(key: string, value: string) {
    return client.srem(key, value);
  }

  async rightPush(key: string, value: string) {
    return client.rpush(key, value);
  }

  async leftPop(key: string) {
    return client.lpop(key);
  }

  async expire(key: string, value: number) {
    return client.expire(key, value);
  }

  async ping() {
    return client.ping();
  }
}
