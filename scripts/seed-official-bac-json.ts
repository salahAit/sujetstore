#!/usr/bin/env bun
/**
 * scripts/seed-official-bac-json.ts
 * Populates `documents.content` with structured `ExamDocument` JSON for all 114
 * Official BAC (2023-2025) rows across all 7 subjects so SmartExamReader renders
 * 100% of Official BAC papers natively at 2.5 KB without bundling data into build/.
 */

import { Database } from 'bun:sqlite';
import { buildOfficialBac3asSe } from '../src/lib/data/official_bac/3as_se';
import { buildOfficialBac3asTm } from '../src/lib/data/official_bac/3as_tm';
import { buildOfficialBac3asMath } from '../src/lib/data/official_bac/3as_math';
import { buildOfficialPhysicsBac3asSe } from '../src/lib/data/official_bac_physics/3as_se';
import { buildOfficialPhysicsBac3asTm } from '../src/lib/data/official_bac_physics/3as_tm';
import { buildOfficialPhysicsBac3asMath } from '../src/lib/data/official_bac_physics/3as_math';
import { OFFICIAL_BAC_SCIENCES_3AS_SE } from '../src/lib/data/official_bac_sciences/3as_se';
import { OFFICIAL_BAC_SCIENCES_3AS_MATH } from '../src/lib/data/official_bac_sciences/3as_math';
import { ALL_OFFICIAL_BAC_ARABIC_PAPERS } from '../src/lib/data/official_bac_arabic';
import { ALL_OFFICIAL_BAC_ISLAMIC_PAPERS } from '../src/lib/data/official_bac_islamic';
import { ALL_OFFICIAL_BAC_FRENCH_PAPERS } from '../src/lib/data/official_bac_french';
import { ALL_OFFICIAL_BAC_ENGLISH_PAPERS } from '../src/lib/data/official_bac_english';

const db = new Database('data/content.db');

const allSpecs: Array<{ slug: string; examDoc: unknown }> = [
	...buildOfficialBac3asSe(),
	...buildOfficialBac3asTm(),
	...buildOfficialBac3asMath(),
	...buildOfficialPhysicsBac3asSe(),
	...buildOfficialPhysicsBac3asTm(),
	...buildOfficialPhysicsBac3asMath(),
	...OFFICIAL_BAC_SCIENCES_3AS_SE,
	...OFFICIAL_BAC_SCIENCES_3AS_MATH,
	...ALL_OFFICIAL_BAC_ARABIC_PAPERS,
	...ALL_OFFICIAL_BAC_ISLAMIC_PAPERS,
	...ALL_OFFICIAL_BAC_FRENCH_PAPERS,
	...ALL_OFFICIAL_BAC_ENGLISH_PAPERS
];

const updateBySlugOrPdfStmt = db.prepare(`
	UPDATE documents
	SET content = ?
	WHERE slug = ? OR pdf_url LIKE ?
`);

let totalRowsUpdated = 0;
const tx = db.transaction(() => {
	for (const spec of allSpecs) {
		const json = JSON.stringify(spec.examDoc);
		const res = updateBySlugOrPdfStmt.run(json, spec.slug, `%/${spec.slug}.pdf`);
		totalRowsUpdated += res.changes;
	}
});
tx();

const remainingNull = db
	.query(
		`SELECT COUNT(*) as cnt FROM documents WHERE pdf_url LIKE '%official_bac%' AND (content IS NULL OR length(trim(content)) < 10)`
	)
	.get() as { cnt: number };

console.log(
	JSON.stringify({
		specsProcessed: allSpecs.length,
		rowsUpdated: totalRowsUpdated,
		remainingOfficialWithoutJson: remainingNull.cnt
	})
);
db.close();
if (remainingNull.cnt > 0) {
	process.exit(1);
}
