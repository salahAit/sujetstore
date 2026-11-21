export type VideoProvider = 'youtube' | 'cloudflare_stream' | 'external';

export interface ParsedVideoUrl {
	provider: VideoProvider;
	externalId: string;
	embedUrl: string;
	thumbnailUrl: string | null;
}

export interface ParsedTranscriptSegment {
	seqIndex: number;
	startSec: number;
	endSec: number;
	textAr: string;
	textNormalized: string;
}

const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const CLOUDFLARE_UID_RE = /^[a-zA-Z0-9_-]{16,64}$/;

/**
 * Detects and normalizes YouTube, Cloudflare Stream, or external video URLs.
 */
export function parseVideoUrl(rawUrl: string): ParsedVideoUrl | null {
	const trimmed = (rawUrl || '').trim();
	if (!trimmed) return null;

	let parsed: URL;
	try {
		parsed = new URL(trimmed);
	} catch {
		return null;
	}

	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
		return null;
	}

	const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
	const pathParts = parsed.pathname.split('/').filter(Boolean);

	// 1. YouTube formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, /shorts/, /live/
	if (
		host === 'youtube.com' ||
		host === 'm.youtube.com' ||
		host === 'music.youtube.com' ||
		host === 'youtube-nocookie.com'
	) {
		let videoId: string | null = null;
		if (parsed.pathname === '/watch') {
			videoId = parsed.searchParams.get('v');
		} else if (
			pathParts.length >= 2 &&
			['embed', 'shorts', 'live', 'v'].includes(pathParts[0])
		) {
			videoId = pathParts[1];
		}

		if (videoId && YOUTUBE_ID_RE.test(videoId)) {
			return {
				provider: 'youtube',
				externalId: videoId,
				embedUrl: `https://www.youtube.com/embed/${videoId}`,
				thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
			};
		}
		return null;
	}

	if (host === 'youtu.be') {
		const videoId = pathParts[0] || null;
		if (videoId && YOUTUBE_ID_RE.test(videoId)) {
			return {
				provider: 'youtube',
				externalId: videoId,
				embedUrl: `https://www.youtube.com/embed/${videoId}`,
				thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
			};
		}
		return null;
	}

	// 2. Cloudflare Stream formats:
	// - iframe.videodelivery.net/<UID>
	// - videodelivery.net/<UID>
	// - watch.cloudflarestream.com/<UID>
	// - customer-<subdomain>.cloudflarestream.com/<UID>(/iframe|/watch|/manifest/...)
	if (
		host === 'iframe.videodelivery.net' ||
		host === 'videodelivery.net' ||
		host === 'watch.cloudflarestream.com' ||
		host === 'iframe.cloudflarestream.com'
	) {
		const uid = pathParts[0] || null;
		if (uid && CLOUDFLARE_UID_RE.test(uid)) {
			return {
				provider: 'cloudflare_stream',
				externalId: uid,
				embedUrl: `https://iframe.videodelivery.net/${uid}`,
				thumbnailUrl: `https://videodelivery.net/${uid}/thumbnails/thumbnail.jpg`
			};
		}
		return null;
	}

	if (/^customer-[a-z0-9-]+\.cloudflarestream\.com$/i.test(host)) {
		const uid = pathParts[0] || null;
		if (uid && CLOUDFLARE_UID_RE.test(uid)) {
			return {
				provider: 'cloudflare_stream',
				externalId: uid,
				embedUrl: `https://${host}/${uid}/iframe`,
				thumbnailUrl: `https://${host}/${uid}/thumbnails/thumbnail.jpg`
			};
		}
		return null;
	}

	// 3. External fallback (direct MP4/WebM/HLS or custom embed URL)
	const externalId = pathParts.join('/') || host;
	return {
		provider: 'external',
		externalId,
		embedUrl: trimmed,
		thumbnailUrl: null
	};
}

/**
 * Normalizes Arabic text for fast, forgiving in-video transcript search:
 * strips HTML/VTT tags, removes tashkeel diacritics & tatweel, unifies alef/ta-marbuta/ya.
 */
export function normalizeArabicText(text: string): string {
	return (text || '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
		.replace(/[أإآٱ]/g, 'ا')
		.replace(/ة/g, 'ه')
		.replace(/ى/g, 'ي')
		.replace(/ؤ/g, 'و')
		.replace(/ئ/g, 'ي')
		.replace(/[^\p{L}\p{N}\s]/gu, ' ')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}

function stripInlineTags(text: string): string {
	return text
		.replace(/<\/?[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseClockToken(token: string): number | null {
	const clean = token.trim().replace(',', '.');
	const parts = clean.split(':');
	if (parts.length < 2 || parts.length > 3) return null;

	const nums = parts.map((p) => Number(p));
	if (nums.some((n) => !Number.isFinite(n) || n < 0)) return null;

	if (nums.length === 3) {
		return Math.floor(nums[0] * 3600 + nums[1] * 60 + nums[2]);
	}
	return Math.floor(nums[0] * 60 + nums[1]);
}

/**
 * Parses flexible timestamp inputs (`MM:SS`, `HH:MM:SS`, `95`, `1m35s`, `95s`) into integer seconds.
 */
export function parseTimestampToSeconds(raw: string | number | null | undefined): number | null {
	if (raw === null || raw === undefined) return null;
	if (typeof raw === 'number') {
		return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : null;
	}
	const trimmed = raw.trim();
	if (!trimmed) return null;

	if (/^\d+$/.test(trimmed)) {
		return parseInt(trimmed, 10);
	}

	if (trimmed.includes(':')) {
		return parseClockToken(trimmed);
	}

	// YouTube-style duration string like "1h2m30s", "2m15s", "45s"
	const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/i.exec(trimmed);
	if (match && (match[1] || match[2] || match[3])) {
		const h = Number(match[1] || 0);
		const m = Number(match[2] || 0);
		const s = Number(match[3] || 0);
		return h * 3600 + m * 60 + s;
	}

	return null;
}

/**
 * Formats seconds as `MM:SS` (or `HH:MM:SS` when >= 1 hour).
 */
export function formatTimestamp(sec: number): string {
	const safe = Number.isFinite(sec) && sec > 0 ? Math.floor(sec) : 0;
	const hours = Math.floor(safe / 3600);
	const minutes = Math.floor((safe % 3600) / 60);
	const seconds = safe % 60;

	const pad = (n: number) => String(n).padStart(2, '0');
	if (hours > 0) {
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
	return `${pad(minutes)}:${pad(seconds)}`;
}

const CUE_TIMING_RE =
	/^(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)/;

const SIMPLE_LINE_RE =
	/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(?:[-–—:|]\s*)?(.+)$/;

/**
 * Parses WebVTT (.vtt), SubRip (.srt), or simple `[MM:SS] text` transcripts
 * into sorted, Arabic-normalized segments.
 */
export function parseTranscript(raw: string): ParsedTranscriptSegment[] {
	const cleaned = (raw || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
	if (!cleaned) return [];

	const rawSegments: Array<{ startSec: number; endSec: number; textAr: string }> = [];

	// Detect VTT / SRT arrow syntax (`-->`)
	if (cleaned.includes('-->')) {
		const blocks = cleaned.split(/\n{2,}/);
		for (const block of blocks) {
			const lines = block
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean);
			if (lines.length === 0) continue;

			// Skip WEBVTT header and metadata blocks
			const first = lines[0];
			if (
				first.startsWith('WEBVTT') ||
				first.startsWith('NOTE') ||
				first.startsWith('STYLE') ||
				first.startsWith('REGION')
			) {
				continue;
			}

			const timingIdx = lines.findIndex((l) => CUE_TIMING_RE.test(l));
			if (timingIdx === -1) continue;

			const match = CUE_TIMING_RE.exec(lines[timingIdx]);
			if (!match) continue;

			const startSec = parseClockToken(match[1]);
			const endSec = parseClockToken(match[2]);
			if (startSec === null || endSec === null) continue;

			const textLines = lines.slice(timingIdx + 1);
			const textAr = stripInlineTags(textLines.join(' '));
			if (!textAr) continue;

			rawSegments.push({
				startSec,
				endSec: Math.max(endSec, startSec + 1),
				textAr
			});
		}
	} else {
		// Simple line-by-line format: `[MM:SS] text`, `[HH:MM:SS] text`, or `MM:SS - text`
		const lines = cleaned.split('\n');
		const entries: Array<{ startSec: number; textAr: string }> = [];

		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed) continue;
			const match = SIMPLE_LINE_RE.exec(trimmed);
			if (!match) {
				// Continuation line of previous entry
				if (entries.length > 0) {
					entries[entries.length - 1].textAr = `${entries[entries.length - 1].textAr} ${stripInlineTags(trimmed)}`.trim();
				}
				continue;
			}
			const startSec = parseClockToken(match[1]);
			const textAr = stripInlineTags(match[2]);
			if (startSec !== null && textAr) {
				entries.push({ startSec, textAr });
			}
		}

		entries.sort((a, b) => a.startSec - b.startSec);

		for (let i = 0; i < entries.length; i++) {
			const cur = entries[i];
			const next = entries[i + 1];
			const endSec = next && next.startSec > cur.startSec ? next.startSec : cur.startSec + 5;
			rawSegments.push({
				startSec: cur.startSec,
				endSec,
				textAr: cur.textAr
			});
		}
	}

	rawSegments.sort((a, b) => a.startSec - b.startSec || a.endSec - b.endSec);

	return rawSegments.map((seg, idx) => ({
		seqIndex: idx,
		startSec: seg.startSec,
		endSec: Math.max(seg.endSec, seg.startSec),
		textAr: seg.textAr,
		textNormalized: normalizeArabicText(seg.textAr)
	}));
}

/**
 * Serializes stored transcript segments back to WebVTT for convenient admin editing.
 */
export function serializeSegmentsToVtt(
	segments: Array<{ startSec: number; endSec: number; textAr: string }>
): string {
	if (!segments || segments.length === 0) return '';
	const lines = ['WEBVTT', ''];
	for (const seg of segments) {
		lines.push(`${formatTimestamp(seg.startSec)}.000 --> ${formatTimestamp(seg.endSec)}.000`);
		lines.push(seg.textAr);
		lines.push('');
	}
	return lines.join('\n').trim();
}
