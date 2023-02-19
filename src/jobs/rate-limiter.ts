import {RateLimiterMemory} from 'rate-limiter-flexible';


export const ReactMessageLimiter = new RateLimiterMemory({
	points: 2,
	duration: 10
});