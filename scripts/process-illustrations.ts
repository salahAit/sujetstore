#!/usr/bin/env bun
/**
 * scripts/process-illustrations.ts
 * Converts raw Nano Banana illustrations into:
 *   1. Fast 4G WebP (.webp, ~35–50 KB) for InteractiveLessonPlayer.svelte
 *   2. Pure #FFFFFF Print-Ready JPEG (.jpg, ~60–85 KB) for Typst 0.14 PDFs
 * Uploads all 136 objects (68 x 2) to RustFS S3 + /var/lib/sujetstore-media/documents/illustrations/.
 */

import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import {
	ILLUSTRATIONS_CATALOG,
	type IllustrationId
} from '../src/lib/modules/VisualAssets/illustrations-registry';
import { putMediaObject } from '../src/lib/server/storage';

const RAW_DIR =
	process.env.RAW_ILLUSTRATIONS_DIR ||
	'/root/.gemini/antigravity-cli/brain/fa4c7bf7-8f53-4c16-a87e-a341c2720488';
const TMP_OUT = '/dev/shm/sujetstore-illustrations-proc';

function pickLatestRawFile(id: string, allFiles: string[]): string | null {
	// Match `<id>_<timestamp>.jpg` or `<id>_v2_<timestamp>.jpg`
	const prefix = `${id}_`;
	const candidates = allFiles.filter(
		(f) => f.startsWith(prefix) && /\.(jpg|jpeg|png|webp)$/i.test(f)
	);
	if (candidates.length === 0) return null;
	candidates.sort((a, b) => {
		const sa = statSync(join(RAW_DIR, a)).mtimeMs;
		const sb = statSync(join(RAW_DIR, b)).mtimeMs;
		return sb - sa;
	});
	return join(RAW_DIR, candidates[0]);
}

async function main() {
	const t0 = performance.now();
	if (!existsSync(RAW_DIR)) {
		throw new Error(`RAW_DIR not found: ${RAW_DIR}`);
	}
	const allRawFiles = readdirSync(RAW_DIR);
	const ids = Object.keys(ILLUSTRATIONS_CATALOG) as IllustrationId[];

	const jobs: Array<{ id: IllustrationId; category: string; srcPath: string }> = [];
	const missing: string[] = [];

	for (const id of ids) {
		const meta = ILLUSTRATIONS_CATALOG[id];
		const srcPath = pickLatestRawFile(id, allRawFiles);
		if (!srcPath) {
			missing.push(id);
		} else {
			jobs.push({ id, category: meta.category, srcPath });
		}
	}

	if (missing.length > 0) {
		throw new Error(`Missing ${missing.length} raw illustrations: ${missing.join(', ')}`);
	}

	rmSync(TMP_OUT, { recursive: true, force: true });
	mkdirSync(TMP_OUT, { recursive: true });

	const manifestJsonPath = join(TMP_OUT, 'jobs.json');
	await Bun.write(manifestJsonPath, JSON.stringify(jobs));

	const pyScript = `
import json, os
from PIL import Image, ImageChops

with open(${JSON.stringify(manifestJsonPath)}, "r", encoding="utf-8") as f:
    jobs = json.load(f)

out_dir = ${JSON.stringify(TMP_OUT)}
stats = []

for job in jobs:
    img_id = job["id"]
    src_path = job["srcPath"]
    im = Image.open(src_path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.alpha_composite(im.convert("RGBA"))
        im = bg.convert("RGB")
    else:
        im = im.convert("RGB")

    # Snap near-white background pixels (>=246 neutral) to exact #FFFFFF for zero laser toner tint
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r >= 246 and g >= 246 and b >= 246 and (max(r, g, b) - min(r, g, b) <= 8):
                px[x, y] = (255, 255, 255)

    # Auto-crop excess white margin and add clean uniform 18px #FFFFFF padding
    white_bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im, white_bg)
    bbox = diff.getbbox()
    if bbox:
        im = im.crop(bbox)
        pad = 18
        padded = Image.new("RGB", (im.width + pad * 2, im.height + pad * 2), (255, 255, 255))
        padded.paste(im, (pad, pad))
        im = padded

    # 1. WebP for fast 4G Interactive Lessons (max 920x690)
    im_webp = im.copy()
    im_webp.thumbnail((920, 690), Image.Resampling.LANCZOS)
    webp_path = os.path.join(out_dir, f"{img_id}.webp")
    im_webp.save(webp_path, "WEBP", quality=82, method=5)

    # 2. Progressive JPEG on pure #FFFFFF for Typst 0.14 PDFs (max 1040x780)
    im_jpg = im.copy()
    im_jpg.thumbnail((1040, 780), Image.Resampling.LANCZOS)
    jpg_path = os.path.join(out_dir, f"{img_id}.jpg")
    im_jpg.save(jpg_path, "JPEG", quality=84, optimize=True, progressive=True)

    stats.append({
        "id": img_id,
        "w": im_jpg.width,
        "h": im_jpg.height,
        "webpBytes": os.path.getsize(webp_path),
        "jpgBytes": os.path.getsize(jpg_path),
    })

with open(os.path.join(out_dir, "stats.json"), "w", encoding="utf-8") as f:
    json.dump(stats, f)
`;

	const pyRes = spawnSync('python3', ['-c', pyScript], { encoding: 'utf-8' });
	if (pyRes.status !== 0) {
		throw new Error(`Pillow processing failed:\n${pyRes.stderr || pyRes.stdout}`);
	}

	const stats = JSON.parse(await readFile(join(TMP_OUT, 'stats.json'), 'utf-8')) as Array<{
		id: IllustrationId;
		w: number;
		h: number;
		webpBytes: number;
		jpgBytes: number;
	}>;

	let totalWebpBytes = 0;
	let totalJpgBytes = 0;
	let s3Count = 0;
	let localCount = 0;

	for (const job of jobs) {
		const webpBytes = await readFile(join(TMP_OUT, `${job.id}.webp`));
		const jpgBytes = await readFile(join(TMP_OUT, `${job.id}.jpg`));
		totalWebpBytes += webpBytes.byteLength;
		totalJpgBytes += jpgBytes.byteLength;

		const r1 = await putMediaObject(
			`documents/illustrations/${job.category}/${job.id}.webp`,
			webpBytes,
			'image/webp'
		);
		const r2 = await putMediaObject(
			`documents/illustrations/${job.category}/${job.id}.jpg`,
			jpgBytes,
			'image/jpeg'
		);
		if (r1.backend === 'rustfs-s3') s3Count++;
		else localCount++;
		if (r2.backend === 'rustfs-s3') s3Count++;
		else localCount++;
	}

	rmSync(TMP_OUT, { recursive: true, force: true });
	const elapsedSec = ((performance.now() - t0) / 1000).toFixed(2);
	const avgWebpKb = Math.round(totalWebpBytes / stats.length / 1024);
	const avgJpgKb = Math.round(totalJpgBytes / stats.length / 1024);

	console.log(
		`[process-illustrations] OK: ${jobs.length} plates -> ${jobs.length * 2} assets uploaded in ${elapsedSec}s`
	);
	console.log(
		`  Backend writes: rustfs-s3=${s3Count}, local-only=${localCount} (all mirrored to MEDIA_ROOT)`
	);
	console.log(
		`  WebP total=${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB (avg ${avgWebpKb} KB) | JPEG total=${(totalJpgBytes / 1024 / 1024).toFixed(2)} MB (avg ${avgJpgKb} KB)`
	);
}

main().catch((err) => {
	console.error('[process-illustrations] ERROR:', err);
	process.exit(1);
});
