import Bottleneck from 'bottleneck';

/**
 * Discord Global Rate Limit - 50 req/sec
 */
export const globalRateLimier = new Bottleneck({
	maxConcurrent: 1,
	reservoir: 50,
	reservoirRefreshAmount: 50,
	reservoirRefreshInterval: 1000,
});


/**
 * PATCH Rate Limit - 5 req/sec
 */
export const patchRoleLimit = new Bottleneck({
	maxConcurrent: 1,
	reservoir: 5,
	reservoirRefreshAmount: 5,
	reservoirRefreshInterval: 1000,
});


export async function patchRoleRateLimiter(): Promise<any> {
	await globalRateLimier.schedule(() => Promise.resolve());
	return patchRoleLimit.schedule(() => Promise.resolve());
}
