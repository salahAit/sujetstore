import { Database } from 'bun:sqlite';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	PHYSICS_GRADE_METADATA,
	getPhysicsLessonsFor,
	getPhysicsTemplatesFor
} from '../src/lib/modules/PhysicsTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	slug: string;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: 'exam' | 'test';
	difficulty: 'easy' | 'medium' | 'hard';
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
}

const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[6001, 'easy'],
	[6002, 'easy'],
	[6003, 'medium'],
	[6004, 'medium'],
	[6005, 'hard']
];

function generatePublicToken(): string {
	return randomBytes(9).toString('base64url');
}

function main() {
	const manifestPath = resolve(
		process.cwd(),
		'pipeline/generated_exams_physics_tcl/generated_physics_tcl_manifest.json'
	);
	if (!existsSync(manifestPath)) {
		throw new Error(`Manifest missing at ${manifestPath}`);
	}
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
		items: GeneratedManifestItem[];
	};

	const db = new Database(resolve(process.cwd(), 'data/content.db'));
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		yearSubjectId: 802,
		lessonsUpserted: 0,
		categoriesUpserted: 0,
		quizzesUpserted: 0,
		questionsInserted: 0,
		quizQuestionsLinked: 0,
		bankExercisesInserted: 0,
		examsUpserted: 0,
		publicTokensBackfilled: 0
	};

	try {
		db.exec('BEGIN');

		// 1. Idempotently ensure PHY-LIT subject, year_subjects (id=802), and stream_subjects
		db.query(
			`INSERT INTO subjects (id, name, name_ar, name_fr, slug, icon, color, exam_group)
			 VALUES ('PHY-LIT', 'Physics (Literary)', 'العلوم الفيزيائية والتكنولوجيا (آداب)', 'Sciences Physiques (Littéraire)', 'phy-lit', 'Zap', '#f59e0b', 'physics')
			 ON CONFLICT(id) DO UPDATE SET
				name_ar = excluded.name_ar,
				name_fr = excluded.name_fr,
				exam_group = 'physics'`
		).run();

		db.query(
			`UPDATE level_streams SET visibility = 'published' WHERE year_id = '1as' AND stream_id = 'TCL'`
		).run();

		const existingYs = db
			.query("SELECT id FROM year_subjects WHERE year_id = '1as' AND subject_id = 'PHY-LIT' AND stream_id = 'TCL' LIMIT 1")
			.get() as { id: number } | null;

		if (existingYs) {
			db.query(
				"UPDATE year_subjects SET coefficient = 2, visibility = 'published' WHERE id = ?"
			).run(existingYs.id);
			summary.yearSubjectId = existingYs.id;
		} else {
			db.query(
				`INSERT INTO year_subjects (id, year_id, subject_id, stream_id, coefficient, "order", visibility)
				 VALUES (802, '1as', 'PHY-LIT', 'TCL', 2, 9, 'published')`
			).run();
			summary.yearSubjectId = 802;
		}

		const existingSs = db
			.query("SELECT id FROM stream_subjects WHERE stream_id = 'TCL' AND subject_id = 'PHY-LIT' AND year_id = '1as' LIMIT 1")
			.get() as { id: number } | null;
		if (existingSs) {
			db.query(
				"UPDATE stream_subjects SET coefficient = 2, visibility = 'published' WHERE id = ?"
			).run(existingSs.id);
		} else {
			db.query(
				`INSERT INTO stream_subjects (stream_id, subject_id, year_id, coefficient, "order", visibility)
				 VALUES ('TCL', 'PHY-LIT', '1as', 2, 9, 'published')`
			).run();
		}

		const ysId = summary.yearSubjectId;

		const findDocBySlug = db.query('SELECT id, public_token as publicToken FROM documents WHERE slug = ? LIMIT 1');
		const insertDocStmt = db.query(`
			INSERT INTO documents (
				year_subject_id, trimester_id, title, title_ar, slug, type, content,
				pdf_url, solution_url, file_size, source, academic_year, has_solution,
				difficulty, origin_type, download_count, access_tier, is_published, public_token, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'public', 1, ?, datetime('now'))
		`);
		const updateDocStmt = db.query(`
			UPDATE documents SET
				year_subject_id = ?, trimester_id = ?, title = ?, title_ar = ?, type = ?,
				content = ?, pdf_url = ?, solution_url = ?, file_size = ?, source = ?,
				academic_year = ?, has_solution = ?, difficulty = ?, origin_type = ?,
				is_published = 1, access_tier = 'public',
				public_token = COALESCE(public_token, ?),
				updated_at = datetime('now')
			WHERE id = ?
		`);

		const upsertDocument = (params: {
			trimesterId: string;
			title: string;
			titleAr: string;
			slug: string;
			type: 'lesson' | 'exam' | 'test';
			content: string | null;
			pdfUrl: string | null;
			solutionUrl: string | null;
			fileSize: number;
			source: string;
			hasSolution: number;
			difficulty: 'easy' | 'medium' | 'hard';
		}) => {
			const existing = findDocBySlug.get(params.slug) as { id: number; publicToken: string | null } | null;
			const token = existing?.publicToken || generatePublicToken();
			if (existing) {
				updateDocStmt.run(
					ysId,
					params.trimesterId,
					params.title,
					params.titleAr,
					params.type,
					params.content,
					params.pdfUrl,
					params.solutionUrl,
					params.fileSize,
					params.source,
					'2025/2026',
					params.hasSolution,
					params.difficulty,
					'exclusive',
					token,
					existing.id
				);
			} else {
				insertDocStmt.run(
					ysId,
					params.trimesterId,
					params.title,
					params.titleAr,
					params.slug,
					params.type,
					params.content,
					params.pdfUrl,
					params.solutionUrl,
					params.fileSize,
					params.source,
					'2025/2026',
					params.hasSolution,
					params.difficulty,
					'exclusive',
					token
				);
			}
		};

		// 2. Upsert 12 lessons
		for (const lesson of getPhysicsLessonsFor('1as_tcl')) {
			const serialized = JSON.stringify({ ...lesson, yearSubjectId: ysId });
			upsertDocument({
				trimesterId: lesson.trimesterId,
				title: lesson.titleAr,
				titleAr: lesson.titleAr,
				slug: lesson.slug,
				type: 'lesson',
				content: serialized,
				pdfUrl: null,
				solutionUrl: null,
				fileSize: Buffer.byteLength(serialized, 'utf-8'),
				source: 'المنهاج الرسمي للعلوم الفيزيائية (جذع مشترك آداب) — SujetStore',
				hasSolution: 0,
				difficulty: 'medium'
			});
			summary.lessonsUpserted++;
		}

		// 3. Quizzes & Questions
		const findCategoryStmt = db.query("SELECT id FROM question_categories WHERE name LIKE '%' || ? || '%' LIMIT 1");
		const insertCategoryStmt = db.query(
			"INSERT INTO question_categories (name, description, year_subject_id, updated_at) VALUES (?, ?, ?, datetime('now'))"
		);
		const updateCategoryStmt = db.query(
			"UPDATE question_categories SET name = ?, description = ?, year_subject_id = ?, updated_at = datetime('now') WHERE id = ?"
		);
		const findQuizBySlugStmt = db.query('SELECT id FROM quizzes WHERE slug = ? LIMIT 1');
		const insertQuizStmt = db.query(`
			INSERT INTO quizzes (
				year_subject_id, trimester_id, title, title_ar, slug, description,
				difficulty, time_limit, question_count, passing_score, shuffle_options,
				show_answers, practice_mode, is_premium, is_published, access_tier, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 60, 0, 1, 1, 0, 1, 'public', datetime('now'))
		`);
		const updateQuizStmt = db.query(`
			UPDATE quizzes SET
				year_subject_id = ?, trimester_id = ?, title = ?, title_ar = ?, description = ?,
				difficulty = ?, passing_score = 60, shuffle_options = 0, show_answers = 1,
				practice_mode = 1, is_premium = 0, is_published = 1, access_tier = 'public', updated_at = datetime('now')
			WHERE id = ?
		`);
		const deleteQuizLinksByQuizStmt = db.query('DELETE FROM quiz_questions WHERE quiz_id = ?');
		const deleteQuizLinksByCatStmt = db.query(
			'DELETE FROM quiz_questions WHERE question_id IN (SELECT id FROM questions WHERE category_id = ?)'
		);
		const deleteQuestionsByCatStmt = db.query('DELETE FROM questions WHERE category_id = ?');
		const insertQuestionStmt = db.query(`
			INSERT INTO questions (
				category_id, type, difficulty, question_text, question_text_ar,
				question_data, explanation, image_url, image_caption, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);
		const linkQuizQuestionStmt = db.query(
			'INSERT INTO quiz_questions (quiz_id, question_id, points, "order") VALUES (?, ?, 1, ?)'
		);
		const updateQuizCountStmt = db.query(
			"UPDATE quizzes SET question_count = ?, updated_at = datetime('now') WHERE id = ?"
		);

		const meta = PHYSICS_GRADE_METADATA['1as_tcl'];
		for (const trimesterId of TRIMESTERS) {
			const trimesterAr = TRIMESTER_NAMES[trimesterId];
			const marker = `[physics_tcl_pipeline:1as_tcl:${trimesterId}]`;
			const catName = `بنك تمارين العلوم الفيزيائية التوليدية — ${meta.yearName} (${trimesterAr}) ${marker}`;
			const existingCat = findCategoryStmt.get(marker) as { id: number } | null;
			let catId: number;
			if (existingCat) {
				updateCategoryStmt.run(catName, catName, ysId, existingCat.id);
				catId = existingCat.id;
			} else {
				catId = Number(insertCategoryStmt.run(catName, catName, ysId).lastInsertRowid);
			}
			summary.categoriesUpserted++;
			deleteQuizLinksByCatStmt.run(catId);
			deleteQuestionsByCatStmt.run(catId);

			const tpls = getPhysicsTemplatesFor('1as_tcl', trimesterId);
			const qByDiff: Record<'easy' | 'medium' | 'hard', number[]> = { easy: [], medium: [], hard: [] };
			for (const tpl of tpls) {
				for (const [seed, diff] of SEED_DIFFICULTY_PLAN) {
					const inst = tpl.generate(seed, diff);
					const q = inst.quizQuestion;
					const qId = Number(
						insertQuestionStmt.run(
							catId,
							q.type,
							diff,
							q.questionText,
							q.questionTextAr ?? q.questionText,
							JSON.stringify(q.questionData),
							q.explanation ?? null,
							q.imageUrl ?? null,
							q.imageCaption ?? null
						).lastInsertRowid
					);
					summary.questionsInserted++;
					qByDiff[diff].push(qId);
				}
			}

			const packDefs = [
				{ n: 1, title: `التدريب الأساسي في العلوم الفيزيائية — ${meta.yearName} (${trimesterAr})`, diff: 'easy' as const, ids: qByDiff.easy.slice(0, 10) },
				{ n: 2, title: `تحدي التجارب والقياس في الفيزياء — ${meta.yearName} (${trimesterAr})`, diff: 'medium' as const, ids: qByDiff.medium.slice(0, 10) },
				{ n: 3, title: `المراجعة الشاملة للاختبار الفصلي — ${meta.yearName} (${trimesterAr})`, diff: 'hard' as const, ids: [...qByDiff.hard, ...qByDiff.medium].slice(0, 12) }
			];
			for (const pd of packDefs) {
				const slug = `1as-tcl-phy-${trimesterId}-quiz-pack-${pd.n}`;
				const exQ = findQuizBySlugStmt.get(slug) as { id: number } | null;
				let qzId: number;
				if (exQ) {
					updateQuizStmt.run(ysId, trimesterId, pd.title, pd.title, pd.title, pd.diff, exQ.id);
					qzId = exQ.id;
				} else {
					qzId = Number(insertQuizStmt.run(ysId, trimesterId, pd.title, pd.title, slug, pd.title, pd.diff).lastInsertRowid);
				}
				summary.quizzesUpserted++;
				deleteQuizLinksByQuizStmt.run(qzId);
				let order = 0;
				for (const qId of pd.ids) {
					order++;
					linkQuizQuestionStmt.run(qzId, qId, order);
					summary.quizQuestionsLinked++;
				}
				updateQuizCountStmt.run(order, qzId);
			}
		}

		// 4. Bank exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%physics_tcl_pipeline%'");
		const insertBankStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);
		for (const tpl of getPhysicsTemplatesFor('1as_tcl')) {
			const inst = tpl.generate(1, 'medium');
			insertBankStmt.run(
				ysId,
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['physics_tcl_pipeline', '1as_tcl', tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Generated sample documents
		for (const item of manifest.items) {
			upsertDocument({
				trimesterId: item.trimesterId,
				title: item.titleAr,
				titleAr: item.titleAr,
				slug: item.slug,
				type: item.docType,
				content: null,
				pdfUrl: item.pdfUrl,
				solutionUrl: item.solutionUrl,
				fileSize: Number(item.fileSize) || 0,
				source: 'المولّد الآلي SujetStore — فيزياء أولى ثانوي آداب',
				hasSolution: 1,
				difficulty: item.difficulty
			});
			summary.examsUpserted++;
		}

		const missingTokens = db
			.query("SELECT id FROM documents WHERE public_token IS NULL OR trim(public_token) = ''")
			.all() as Array<{ id: number }>;
		const patchTokenStmt = db.query('UPDATE documents SET public_token = ? WHERE id = ?');
		for (const row of missingTokens) {
			patchTokenStmt.run(generatePublicToken(), row.id);
			summary.publicTokensBackfilled++;
		}

		db.exec('COMMIT');
		console.log(JSON.stringify({ status: 'ok', summary }, null, 2));
	} catch (err) {
		try {
			db.exec('ROLLBACK');
		} catch {}
		throw err;
	} finally {
		db.close();
	}
}

main();
