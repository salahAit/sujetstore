import type { RequestEvent } from '@sveltejs/kit';

interface BucketEntry {
	count: number;
	resetAt: number;
}

const buckets = new Map<string, BucketEntry>();

/** Extract best-effort client IP for rate limiting. */
export function getClientIp(event: RequestEvent): string {
	const forwarded = event.request.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) return first;
	}
	try {
		return event.getClientAddress() || '127.0.0.1';
	} catch {
		return '127.0.0.1';
	}
}

/**
 * In-memory fixed-window rate limiter keyed by `<bucket>:<ip>`.
 * Cleans expired entries lazily to bound memory growth.
 */
export function checkRateLimit(
	key: string,
	maxRequests: number,
	windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
	const now = Date.now();
	if (buckets.size > 5000) {
		for (const [k, v] of buckets) {
			if (now >= v.resetAt) buckets.delete(k);
		}
	}

	const current = buckets.get(key);
	if (!current || now >= current.resetAt) {
		const resetAt = now + windowMs;
		buckets.set(key, { count: 1, resetAt });
		return { allowed: true, remaining: Math.max(0, maxRequests - 1), resetAt };
	}

	if (current.count >= maxRequests) {
		return { allowed: false, remaining: 0, resetAt: current.resetAt };
	}

	current.count += 1;
	return {
		allowed: true,
		remaining: Math.max(0, maxRequests - current.count),
		resetAt: current.resetAt
	};
}
