import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';

@Injectable()
export class RedisService {
  constructor(
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
  ) {}
  async set(key: string, value: string) {
    this.redisClient.set(key, value);
  }

  async setWithExpiry(key: string, value: string, expiresAt = 86400) {
    this.redisClient.set(key, value, 'EX', expiresAt);
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async delete(key: string) {
    this.redisClient.del(key);
  }

  async getFromSet(key: string) {
    return this.redisClient.smembers(key);
  }

  async addToSet(key: string, value: string) {
    return this.redisClient.sadd(key, value);
  }

  async removeFromSet(key: string, value: string) {
    return this.redisClient.srem(key, value);
  }

  async ping() {
    return this.redisClient.ping();
  }
}
