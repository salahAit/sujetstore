/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { assets, immutable } from '$app/manifest';
import { version } from '$app/env';

const CACHE = `cache-${version}`;

const toUrlPath = (p: string) => (p.startsWith('/') ? p : `/${p}`);

const EXCLUDED_ASSET_PREFIXES = ['/wasm/', '/uploads/', '/documents/', '/generated/', '/fonts/'];

const ASSETS = [
	...immutable.map((item) => toUrlPath(item.path)),
	...assets
		.map((item) => toUrlPath(item.path))
		.filter((path) => !EXCLUDED_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix)))
];

const BYPASS_PREFIXES = ['/api/', '/admin', '/auth', '/student', '/uploads/', '/wasm/'];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}
	event.waitUntil(addFilesToCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
	async function deleteOldCachesAndClaim() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
		await self.clients.claim();
	}
	event.waitUntil(deleteOldCachesAndClaim());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (!url.protocol.startsWith('http') || url.origin !== self.location.origin) return;
	if (BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return;

	async function respond() {
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) {
				event.waitUntil(
					fetch(event.request)
						.then((networkResponse) => {
							if (networkResponse.ok) {
								cache.put(event.request, networkResponse.clone());
							}
						})
						.catch(() => {})
				);
				return cachedResponse;
			}
		}

		try {
			const response = await fetch(event.request);
			if (response.status === 200 && url.origin === self.location.origin) {
				event.waitUntil(cache.put(event.request, response.clone()));
			}
			return response;
		} catch {
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) return cachedResponse;
			return Response.error();
		}
	}

	event.respondWith(respond());
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
