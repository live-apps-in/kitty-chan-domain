import { Redis } from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASS,
  db: 1,
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

client.on('connect', () => {
  console.log('kitty chan Domain Redis connection established.');
});

client.on('error', (err) => {
  console.log('Error connecting to kitty chan Domain Redis: ' + err);
});

export default client;
