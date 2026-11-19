import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { ENGLISH_DOCTRINAL_AND_CONTENT_BLOCKLIST } from '../src/lib/modules/EnglishTemplates/english-helpers';

const TARGET_DIRS = [
	resolve('src/lib/modules/EnglishTemplates'),
	resolve('src/lib/data/official_bac_english')
];

const IGNORE_FILES = new Set([
	resolve('src/lib/modules/EnglishTemplates/english-helpers.ts')
]);

function walkTsFiles(dir: string, out: string[] = []): string[] {
	try {
		for (const entry of readdirSync(dir)) {
			const full = join(dir, entry);
			const st = statSync(full);
			if (st.isDirectory()) {
				walkTsFiles(full, out);
			} else if (entry.endsWith('.ts') && !IGNORE_FILES.has(full)) {
				out.push(full);
			}
		}
	} catch {}
	return out;
}

const stripArTashkeel = (s: string) => s.replace(/[\u064B-\u065F\u0670\u0640]/g, '');

function main() {
	const files = TARGET_DIRS.flatMap((d) => walkTsFiles(d)).sort();
	const violations: Array<{ file: string; line: number; match: string; reason: string; snippet: string }> = [];

	for (const file of files) {
		const raw = readFileSync(file, 'utf-8');
		const lines = raw.split(/\r?\n/);
		for (let i = 0; i < lines.length; i++) {
			const cleaned = stripArTashkeel(lines[i]);
			for (const rule of ENGLISH_DOCTRINAL_AND_CONTENT_BLOCKLIST) {
				const m = cleaned.match(rule.pattern);
				if (m) {
					violations.push({
						file: relative(process.cwd(), file),
						line: i + 1,
						match: m[0],
						reason: rule.reason,
						snippet: lines[i].trim().slice(0, 120)
					});
				}
			}
		}
	}

	console.log(
		JSON.stringify(
			{
				status: violations.length === 0 ? 'PASSED' : 'FAILED',
				filesScanned: files.length,
				violationCount: violations.length,
				violations
			},
			null,
			2
		)
	);

	if (violations.length > 0) process.exit(1);
}

main();
