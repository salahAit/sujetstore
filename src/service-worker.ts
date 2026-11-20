/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { immutable } from '$app/manifest';
import { version } from '$app/env';

const APP_SHELL_CACHE = `sujetstore-shell-${version}`;
const OFFLINE_PACK_CACHE = 'sujetstore-offline-packs-v1';

const toUrlPath = (p: string) => (p.startsWith('/') ? p : `/${p}`);

// Cache ONLY immutable JS/CSS/font app shell chunks — NEVER bundle 3,400 PDF paths into service-worker.js!
const SHELL_ASSETS = immutable.map((item) => toUrlPath(item.path));
const SHELL_SET = new Set(SHELL_ASSETS);

const BYPASS_PREFIXES = ['/api/', '/admin', '/auth', '/student', '/uploads/', '/wasm/'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(APP_SHELL_CACHE)
			.then((cache) => cache.addAll(SHELL_ASSETS))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((k) => k !== APP_SHELL_CACHE && k !== OFFLINE_PACK_CACHE)
						.map((k) => caches.delete(k))
				)
			)
			.then(() => self.clients.claim())
	);
});

// Selective Grade / Subject Offline Pack Caching (triggered by OfflinePackButton.svelte)
self.addEventListener('message', (event) => {
	const data = event.data;
	if (!data || typeof data !== 'object') return;

	if (data.type === 'CACHE_GRADE_PACK' && Array.isArray(data.urls)) {
		const packId = String(data.packId || 'default');
		const urls: string[] = Array.from(
			new Set(
				data.urls
					.filter((u: unknown): u is string => typeof u === 'string' && u.startsWith('/'))
					.slice(0, 60)
			)
		);

		event.waitUntil(
			(async () => {
				const cache = await caches.open(OFFLINE_PACK_CACHE);
				let done = 0;
				let cachedCount = 0;

				for (const path of urls) {
					try {
						const res = await fetch(path, { credentials: 'same-origin' });
						if (res.ok) {
							await cache.put(path, res.clone());
							cachedCount++;
						}
					} catch {
						// Ignore transient network errors for individual URLs
					}
					done++;
					const clients = await self.clients.matchAll({ type: 'window' });
					for (const client of clients) {
						client.postMessage({
							type: 'CACHE_GRADE_PACK_PROGRESS',
							packId,
							done,
							total: urls.length
						});
					}
				}

				const clients = await self.clients.matchAll({ type: 'window' });
				for (const client of clients) {
					client.postMessage({
						type: 'CACHE_GRADE_PACK_COMPLETE',
						packId,
						cachedCount,
						total: urls.length
					});
				}
			})()
		);
	} else if (data.type === 'CLEAR_GRADE_PACK' && Array.isArray(data.urls)) {
		const packId = String(data.packId || 'default');
		const urls: string[] = data.urls.filter(
			(u: unknown): u is string => typeof u === 'string' && u.startsWith('/')
		);
		event.waitUntil(
			(async () => {
				const cache = await caches.open(OFFLINE_PACK_CACHE);
				for (const path of urls) {
					await cache.delete(path);
				}
				const clients = await self.clients.matchAll({ type: 'window' });
				for (const client of clients) {
					client.postMessage({ type: 'CLEAR_GRADE_PACK_COMPLETE', packId });
				}
			})()
		);
	}
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (!url.protocol.startsWith('http') || url.origin !== self.location.origin) return;
	if (BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return;

	// Immutable app shell: Cache-First
	if (SHELL_SET.has(url.pathname)) {
		event.respondWith(
			caches.open(APP_SHELL_CACHE).then(async (cache) => {
				const cached = await cache.match(event.request);
				if (cached) return cached;
				const net = await fetch(event.request);
				if (net.ok) cache.put(event.request, net.clone());
				return net;
			})
		);
		return;
	}

	// PDFs & pages: Network-First with Offline Pack Fallback
	event.respondWith(
		(async () => {
			try {
				const response = await fetch(event.request);
				if (response.ok && event.request.mode === 'navigate') {
					const packCache = await caches.open(OFFLINE_PACK_CACHE);
					if (await packCache.match(url.pathname)) {
						packCache.put(url.pathname, response.clone());
					}
				}
				return response;
			} catch {
				const packCache = await caches.open(OFFLINE_PACK_CACHE);
				const offlineMatch =
					(await packCache.match(event.request)) || (await packCache.match(url.pathname));
				if (offlineMatch) return offlineMatch;

				const shellCache = await caches.open(APP_SHELL_CACHE);
				const shellMatch = await shellCache.match(event.request);
				if (shellMatch) return shellMatch;

				return new Response(
					'<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>أنت غير متصل</title><body style="font-family:sans-serif;text-align:center;padding:3rem;background:#0f172a;color:#e2e8f0"><h2>أنت غير متصل بالإنترنت حاليًا</h2><p>يمكنك تصفح الدروس التي حفظتها مسبقًا عبر زر «حفظ للدراسة دون إنترنت».</p></body></html>',
					{ status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
				);
			}
		})()
	);
});
