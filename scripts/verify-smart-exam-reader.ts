#!/usr/bin/env bun
/**
 * scripts/verify-smart-exam-reader.ts
 * Audits `resolveWebExamByDocId` across ALL Official BAC papers + stratified samples
 * from every subject (Math, Physics, Sciences, Arabic, Islamic, French, English)
 * and level (1AP..3AS BAC):
 *   1. Verifies 100% resolution (0 null payloads)
 *   2. Verifies every inline `$...$` & display `math` block parses cleanly in KaTeX (`throwOnError: true`)
 *   3. Verifies 0 leaked Typst directives (`#quran-box`, `#hadith-box`, `#render-arabic-poem`, `#block(`, `frac(`, `upright(`)
 */

import katex from 'katex';
import 'katex/contrib/mhchem';
import { gzipSync } from 'node:zlib';
import { contentSqlite } from '../src/lib/server/db';
import { resolveWebExamByDocId } from '../src/lib/server/exam-web-serializer';
import type { WebBlock } from '../src/lib/types/web-exam';

const LEAK_PATTERNS: Array<[RegExp, string]> = [
	[/#quran-box\(/, '#quran-box('],
	[/#hadith-box\(/, '#hadith-box('],
	[/#render-arabic-poem\(/, '#render-arabic-poem('],
	[/#block\(/, '#block('],
	[/#repeat\(/, '#repeat('],
	[/\bupright\s*\(/, 'upright('],
	[/(?<!\\)\bfrac\s*\(/, 'unconverted frac(']
];

let katexChecked = 0;
const katexErrors: Array<{ docId: number; slug: string; expr: string; err: string }> = [];
const leakErrors: Array<{ docId: number; slug: string; leak: string; snippet: string }> = [];

function checkTextString(docId: number, slug: string, str?: string) {
	if (!str) return;
	for (const [re, name] of LEAK_PATTERNS) {
		if (re.test(str)) {
			leakErrors.push({ docId, slug, leak: name, snippet: str.slice(0, 140) });
		}
	}
	for (const m of str.matchAll(/\$([^$]+)\$/g)) {
		katexChecked++;
		try {
			katex.renderToString(m[1], { throwOnError: true, strict: false });
		} catch (e: any) {
			if (katexErrors.length < 25) {
				katexErrors.push({ docId, slug, expr: m[1], err: e?.message || String(e) });
			}
		}
	}
}

function walkBlock(docId: number, slug: string, b: WebBlock) {
	switch (b.type) {
		case 'text':
			checkTextString(docId, slug, b.content);
			checkTextString(docId, slug, b.answer);
			break;
		case 'math':
			katexChecked++;
			try {
				katex.renderToString(b.latex, {
					displayMode: b.display,
					throwOnError: true,
					strict: false
				});
			} catch (e: any) {
				if (katexErrors.length < 25) {
					katexErrors.push({ docId, slug, expr: b.latex, err: e?.message || String(e) });
				}
			}
			break;
		case 'table':
			for (const h of b.headers) {
				checkTextString(docId, slug, h.content);
				checkTextString(docId, slug, h.answer);
			}
			for (const r of b.rows) {
				for (const c of r) {
					checkTextString(docId, slug, c.content);
					checkTextString(docId, slug, c.answer);
				}
			}
			break;
		case 'true_false':
			for (const it of b.items) {
				checkTextString(docId, slug, it.q);
				checkTextString(docId, slug, it.a);
				checkTextString(docId, slug, it.c);
			}
			break;
		case 'multiple_choice':
			for (const g of b.groups) {
				checkTextString(docId, slug, g.header);
				for (const o of g.options) checkTextString(docId, slug, o);
				checkTextString(docId, slug, g.correct);
			}
			break;
		case 'figure':
			checkTextString(docId, slug, b.title);
			checkTextString(docId, slug, b.caption);
			for (const l of b.legend) checkTextString(docId, slug, l.label);
			break;
		case 'image_grid':
			for (const it of b.items) {
				checkTextString(docId, slug, it.label);
				checkTextString(docId, slug, it.answer);
			}
			break;
		case 'quran_box':
			checkTextString(docId, slug, b.verses);
			checkTextString(docId, slug, b.answer);
			break;
		case 'hadith_box':
			checkTextString(docId, slug, b.text);
			checkTextString(docId, slug, b.answer);
			break;
		case 'arabic_poem':
			for (const [sadr, ajuz] of b.verses) {
				checkTextString(docId, slug, sadr);
				checkTextString(docId, slug, ajuz);
			}
			break;
		case 'passage_box':
			for (const p of b.paragraphs) checkTextString(docId, slug, p);
			break;
		case 'columns':
			for (const c of b.children) walkBlock(docId, slug, c);
			break;
	}
}

async function main() {
	// Sample 2 docs from EVERY (year_id, subject_id, type) combination + ALL 114 Official BAC docs!
	const rows = contentSqlite
		.query(
			`SELECT id, slug FROM (
				SELECT d.id, d.slug,
				       ROW_NUMBER() OVER (PARTITION BY d.year_subject_id, d.type ORDER BY d.id ASC) as rn,
				       CASE WHEN d.pdf_url LIKE '%official_bac%' THEN 1 ELSE 0 END as is_official
				FROM documents d
				WHERE d.is_published = 1 AND d.type IN ('exam', 'test')
			)
			WHERE rn <= 2 OR is_official = 1`
		)
		.all() as Array<{ id: number; slug: string }>;

	let nullCount = 0;
	let totalGzipBytes = 0;

	for (const r of rows) {
		const payload = await resolveWebExamByDocId(r.id);
		if (!payload || payload.exercises.length === 0) {
			nullCount++;
			console.error('NULL/EMPTY PAYLOAD:', r);
			continue;
		}
		totalGzipBytes += gzipSync(Buffer.from(JSON.stringify(payload))).byteLength;
		for (const ex of payload.exercises) {
			checkTextString(r.id, r.slug, ex.heading);
			checkTextString(r.id, r.slug, ex.instruction);
			for (const b of ex.blocks) walkBlock(r.id, r.slug, b);
		}
	}

	const avgGzipKb = (totalGzipBytes / Math.max(1, rows.length) / 1024).toFixed(2);
	console.log(
		JSON.stringify(
			{
				docsAudited: rows.length,
				nullCount,
				katexFormulasVerified: katexChecked,
				katexErrorCount: katexErrors.length,
				leakErrorCount: leakErrors.length,
				avgGzipPayloadKb: Number(avgGzipKb),
				sampleKatexErrors: katexErrors.slice(0, 10),
				sampleLeaks: leakErrors.slice(0, 10)
			},
			null,
			2
		)
	);

	if (nullCount > 0 || katexErrors.length > 0 || leakErrors.length > 0) {
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
