import type { PlatformEventMap, PlatformEventName } from './types';

export type PlatformEventHandler<K extends PlatformEventName> = (
	payload: PlatformEventMap[K]
) => void | Promise<void>;

export interface EmitSummary {
	event: PlatformEventName;
	delivered: number;
	failed: number;
	errors: Array<{ subscriber: string; message: string }>;
}

interface RegisteredListener<K extends PlatformEventName> {
	name: string;
	handler: PlatformEventHandler<K>;
}

/**
 * Lightweight async in-process EventBus for SujetStore's single-tenant modular monolith.
 * Every subscriber runs inside an isolated try/catch boundary so optional modules
 * can never crash or block core platform flows.
 */
export class PlatformEventBus {
	private listeners = new Map<PlatformEventName, Set<RegisteredListener<any>>>();

	on<K extends PlatformEventName>(
		event: K,
		handler: PlatformEventHandler<K>,
		subscriberName = handler.name || 'anonymous'
	): () => void {
		let bucket = this.listeners.get(event);
		if (!bucket) {
			bucket = new Set();
			this.listeners.set(event, bucket);
		}
		const entry: RegisteredListener<K> = { name: subscriberName, handler };
		bucket.add(entry);

		return () => {
			bucket?.delete(entry);
		};
	}

	off<K extends PlatformEventName>(event: K, handler: PlatformEventHandler<K>): void {
		const bucket = this.listeners.get(event);
		if (!bucket) return;
		for (const entry of bucket) {
			if (entry.handler === handler) {
				bucket.delete(entry);
			}
		}
	}

	async emit<K extends PlatformEventName>(
		event: K,
		payload: PlatformEventMap[K]
	): Promise<EmitSummary> {
		const bucket = this.listeners.get(event);
		if (!bucket || bucket.size === 0) {
			return { event, delivered: 0, failed: 0, errors: [] };
		}

		const entries = Array.from(bucket);
		let delivered = 0;
		let failed = 0;
		const errors: Array<{ subscriber: string; message: string }> = [];

		await Promise.all(
			entries.map(async (entry) => {
				try {
					await entry.handler(payload);
					delivered += 1;
				} catch (err) {
					failed += 1;
					const message = err instanceof Error ? err.message : String(err);
					errors.push({ subscriber: entry.name, message });
					console.error(
						`[PlatformEventBus] Subscriber '${entry.name}' failed on '${event}':`,
						message
					);
				}
			})
		);

		return { event, delivered, failed, errors };
	}

	listenerCount(event?: PlatformEventName): number {
		if (event) {
			return this.listeners.get(event)?.size ?? 0;
		}
		let total = 0;
		for (const bucket of this.listeners.values()) {
			total += bucket.size;
		}
		return total;
	}

	clear(event?: PlatformEventName): void {
		if (event) {
			this.listeners.delete(event);
		} else {
			this.listeners.clear();
		}
	}
}

export const platformEvents = new PlatformEventBus();
