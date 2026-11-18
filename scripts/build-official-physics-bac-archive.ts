import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { compileTypstPdf } from '../src/lib/server/typst';
import { buildOfficialPhysicsBac3asSe } from '../src/lib/data/official_bac_physics/3as_se';
import { buildOfficialPhysicsBac3asTm } from '../src/lib/data/official_bac_physics/3as_tm';
import { buildOfficialPhysicsBac3asMath } from '../src/lib/data/official_bac_physics/3as_math';
import type { OfficialBacPhysicsPaperRecord } from '../src/lib/data/official_bac_physics/types';

const MIN_PDF_BYTES = 20_480;

interface OfficialBacPhysicsManifestItem {
	slug: string;
	grade: OfficialBacPhysicsPaperRecord['grade'];
	yearSubjectId: number;
	streamId: 'SE' | 'TM' | 'MATH';
	academicYear: string;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
	sourcePdfRelPath: string;
	sourceSha256: string | null;
}

function sha256IfExists(absPath: string): string | null {
	if (!existsSync(absPath)) return null;
	return createHash('sha256').update(readFileSync(absPath)).digest('hex');
}

function assertValidPdf(absPath: string): number {
	if (!existsSync(absPath)) {
		throw new Error(`Compiled official Physics BAC PDF missing: ${absPath}`);
	}
	const buf = readFileSync(absPath);
	if (buf.length < MIN_PDF_BYTES) {
		throw new Error(`Compiled official Physics BAC PDF too small (${buf.length} bytes): ${absPath}`);
	}
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Invalid %PDF- header on ${absPath}`);
	}
	return buf.length;
}

async function main() {
	const records: OfficialBacPhysicsPaperRecord[] = [
		...buildOfficialPhysicsBac3asSe(),
		...buildOfficialPhysicsBac3asTm(),
		...buildOfficialPhysicsBac3asMath()
	];

	const items: OfficialBacPhysicsManifestItem[] = [];

	for (const rec of records) {
		const outDir = resolve('static/documents/official_bac_physics', rec.grade);
		mkdirSync(outDir, { recursive: true });

		const subjPath = resolve(outDir, `${rec.slug}.pdf`);
		const solPath = resolve(outDir, `${rec.slug}-sol.pdf`);

		const [subjRes, solRes] = await Promise.all([
			compileTypstPdf({
				examDoc: rec.examDoc as unknown as Record<string, any>,
				outputPath: subjPath,
				templateId: 'secondary/bac_official',
				isSolution: false
			}),
			compileTypstPdf({
				examDoc: rec.examDoc as unknown as Record<string, any>,
				outputPath: solPath,
				templateId: 'secondary/bac_official',
				isSolution: true
			})
		]);

		if (!subjRes.success) {
			throw new Error(`Failed compiling ${rec.slug} subject: ${subjRes.error}`);
		}
		if (!solRes.success) {
			throw new Error(`Failed compiling ${rec.slug} solution: ${solRes.error}`);
		}

		const fileSize = assertValidPdf(subjPath);
		const solutionFileSize = assertValidPdf(solPath);
		const sourceAbs = resolve(rec.sourcePdfRelPath);

		items.push({
			slug: rec.slug,
			grade: rec.grade,
			yearSubjectId: rec.yearSubjectId,
			streamId: rec.streamId,
			academicYear: rec.academicYear,
			sessionAr: rec.sessionAr,
			coefficient: rec.coefficient,
			duration: rec.duration,
			titleAr: rec.titleAr,
			pdfUrl: `/documents/official_bac_physics/${rec.grade}/${rec.slug}.pdf`,
			solutionUrl: `/documents/official_bac_physics/${rec.grade}/${rec.slug}-sol.pdf`,
			fileSize,
			solutionFileSize,
			sourcePdfRelPath: rec.sourcePdfRelPath,
			sourceSha256: sha256IfExists(sourceAbs)
		});
		console.log(`Compiled ${rec.slug} (subject=${fileSize}B, solution=${solutionFileSize}B)`);
	}

	const manifestPath = resolve('pipeline/official_bac_physics/official_bac_physics_manifest.json');
	mkdirSync(dirname(manifestPath), { recursive: true });
	writeFileSync(
		manifestPath,
		JSON.stringify(
			{
				generated_at: new Date().toISOString(),
				total_papers: items.length,
				total_pdfs: items.length * 2,
				items
			},
			null,
			2
		),
		'utf-8'
	);

	console.log(JSON.stringify({ total_papers: items.length, total_pdfs: items.length * 2, manifestPath }));
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
