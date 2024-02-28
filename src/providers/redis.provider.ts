import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  db: 1,
  password: process.env.REDIS_PASS,
  port: 6379,
  retryStrategy: redisRetryStrategy(10, 5000),
});

function redisRetryStrategy(maxRetries: number, interval: number) {
  let retryCount = 0;

  return () => {
    if (retryCount < maxRetries) {
      retryCount += 1;
      console.log(
        `🟡 kitty chan Domain Redis - Retry attempt ${retryCount} in ${
          interval / 1000
        } seconds...`,
      );
      return interval;
    }
    return null;
  };
}

export const RedisProvider: Provider = {
  provide: PROVIDER_TYPES.RedisClient,
  useValue: redisClient,
};
