import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { ISLAMIC_FULL_BLOCKLIST } from '../src/lib/modules/IslamicTemplates/islamic-helpers';

const TARGET_DIRS = [
	resolve('src/lib/modules/IslamicTemplates'),
	resolve('src/lib/data/official_bac_islamic')
];

const IGNORE_FILES = new Set([
	resolve('src/lib/modules/IslamicTemplates/islamic-helpers.ts')
]);

const TYPST_SAFETY_RULES: readonly { pattern: RegExp; reason: string }[] = [
	{
		pattern: /[✓✕✗]/u,
		reason: 'رمز يونيكود محظور يسبب سقوط خط FreeMono (استخدم كلمات عربية واضحة مثل صحيح/خطأ)'
	}
];

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
	} catch {
		// Directory may not exist yet
	}
	return out;
}

interface Violation {
	file: string;
	line: number;
	category: 'doctrinal_or_hadith' | 'typst_safety';
	match: string;
	reason: string;
	snippet: string;
}

function main() {
	const files = TARGET_DIRS.flatMap((d) => walkTsFiles(d)).sort();
	const violations: Violation[] = [];

	for (const file of files) {
		const raw = readFileSync(file, 'utf-8');
		const lines = raw.split(/\r?\n/);
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			for (const rule of ISLAMIC_FULL_BLOCKLIST) {
				const m = line.match(rule.pattern);
				if (m) {
					violations.push({
						file: relative(process.cwd(), file),
						line: i + 1,
						category: 'doctrinal_or_hadith',
						match: m[0],
						reason: rule.reason,
						snippet: line.trim().slice(0, 120)
					});
				}
			}
			for (const rule of TYPST_SAFETY_RULES) {
				const m = line.match(rule.pattern);
				if (m) {
					violations.push({
						file: relative(process.cwd(), file),
						line: i + 1,
						category: 'typst_safety',
						match: m[0],
						reason: rule.reason,
						snippet: line.trim().slice(0, 120)
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

	if (violations.length > 0) {
		process.exit(1);
	}
}

main();
