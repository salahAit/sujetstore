import { S3Client } from 'bun';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { copyFile, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';

const MIME_MAP: Record<string, string> = {
	'.pdf': 'application/pdf',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp'
};

function walkFiles(dir: string, out: string[] = []): string[] {
	if (!existsSync(dir)) return out;
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const st = statSync(full);
		if (st.isDirectory()) walkFiles(full, out);
		else if (st.isFile()) out.push(full);
	}
	return out;
}

async function main() {
	const endpoint = process.env.RUSTFS_ENDPOINT?.trim();
	const bucket = process.env.RUSTFS_BUCKET?.trim() || 'sujetstore-media';
	const accessKeyId = process.env.RUSTFS_ACCESS_KEY?.trim();
	const secretAccessKey = process.env.RUSTFS_SECRET_KEY?.trim();
	const region = process.env.RUSTFS_REGION?.trim() || 'us-east-1';
	const mediaRoot = resolve(process.env.MEDIA_ROOT?.trim() || '/var/lib/sujetstore-media');

	if (!endpoint || !accessKeyId || !secretAccessKey) {
		throw new Error('Missing RUSTFS_ENDPOINT / RUSTFS_ACCESS_KEY / RUSTFS_SECRET_KEY in environment');
	}

	const s3 = new S3Client({ endpoint, bucket, accessKeyId, secretAccessKey, region });
	const staticRoot = resolve('static');
	const targets = [
		resolve(staticRoot, 'documents'),
		resolve(staticRoot, 'generated')
	];

	const files = targets.flatMap((d) => walkFiles(d)).sort();
	console.log(`[sync-media-to-rustfs] Found ${files.length} files to mirror to ${mediaRoot} and RustFS (${bucket})...`);

	const CONCURRENCY = 16;
	let cursor = 0;
	let uploaded = 0;
	let totalBytes = 0;
	const t0 = Date.now();

	async function worker() {
		while (true) {
			const i = cursor++;
			if (i >= files.length) return;
			const absPath = files[i];
			const key = relative(staticRoot, absPath).replace(/\\/g, '/');
			const mime = MIME_MAP[extname(absPath).toLowerCase()] || 'application/octet-stream';

			// 1. Mirror to external MEDIA_ROOT
			const destLocal = resolve(mediaRoot, key);
			mkdirSync(dirname(destLocal), { recursive: true });
			await copyFile(absPath, destLocal);

			// 2. Upload to RustFS S3
			const buf = await readFile(absPath);
			await s3.file(key).write(buf, { type: mime });
			totalBytes += buf.byteLength;
			uploaded++;

			if (uploaded % 500 === 0 || uploaded === files.length) {
				console.log(
					`  [${uploaded}/${files.length}] synced (${(totalBytes / 1024 / 1024).toFixed(1)} MB in ${((Date.now() - t0) / 1000).toFixed(1)}s)`
				);
			}
		}
	}

	await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
	console.log(
		JSON.stringify({
			status: 'ok',
			filesSynced: uploaded,
			totalMB: Number((totalBytes / 1024 / 1024).toFixed(2)),
			bucket,
			mediaRoot,
			elapsedSec: Number(((Date.now() - t0) / 1000).toFixed(2))
		})
	);
}

main().catch((err) => {
	console.error('[sync-media-to-rustfs] FAILED:', err);
	process.exit(1);
});
