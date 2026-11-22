import { Database } from 'bun:sqlite';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS } from '../src/lib/data/official_bac_management';
import {
	ALL_MANAGEMENT_LESSONS,
	ALL_MANAGEMENT_TEMPLATES,
	ALL_MANAGEMENT_TRACK_IDS,
	MANAGEMENT_GRADE_METADATA,
	getManagementTemplatesFor,
	type ManagementTrackId
} from '../src/lib/modules/ManagementTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade: ManagementTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: 'exam' | 'test';
	titleAr: string;
	slug: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	difficulty: 'easy' | 'medium' | 'hard';
}

interface OfficialBacManifestItem {
	slug: string;
	yearSubjectId: number;
	academicYear: string;
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
	[9101, 'easy'],
	[9102, 'easy'],
	[9103, 'medium'],
	[9104, 'medium'],
	[9105, 'hard']
];

function generatePublicToken(): string {
	return randomBytes(9).toString('base64url');
}

function main() {
	const genManifestPath = resolve(
		process.cwd(),
		'pipeline/generated_exams_management/generated_management_manifest.json'
	);
	const bacManifestPath = resolve(
		process.cwd(),
		'pipeline/official_bac_management/official_bac_management_manifest.json'
	);
	if (!existsSync(genManifestPath)) throw new Error(`Missing ${genManifestPath}`);
	if (!existsSync(bacManifestPath)) throw new Error(`Missing ${bacManifestPath}`);

	const genManifest = JSON.parse(readFileSync(genManifestPath, 'utf-8')) as {
		items: GeneratedManifestItem[];
	};
	const bacManifest = JSON.parse(readFileSync(bacManifestPath, 'utf-8')) as {
		items: OfficialBacManifestItem[];
	};

	const db = new Database(resolve(process.cwd(), 'data/content.db'));
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		tracksPublished: ALL_MANAGEMENT_TRACK_IDS.length,
		lessonsUpserted: 0,
		categoriesUpserted: 0,
		quizzesUpserted: 0,
		questionsInserted: 0,
		quizQuestionsLinked: 0,
		bankExercisesInserted: 0,
		examsUpserted: 0,
		officialBacUpserted: 0,
		publicTokensBackfilled: 0
	};

	try {
		db.exec('BEGIN');

		db.exec(
			"UPDATE level_streams SET visibility = 'published' WHERE year_id IN ('2as', '3as') AND stream_id = 'GE'"
		);
		const updateYsStmt = db.query(
			"UPDATE year_subjects SET visibility = 'published', coefficient = ? WHERE id = ?"
		);
		const updateSsStmt = db.query(
			"UPDATE stream_subjects SET visibility = 'published', coefficient = ? WHERE year_id = ? AND subject_id = ? AND stream_id = 'GE'"
		);
		for (const grade of ALL_MANAGEMENT_TRACK_IDS) {
			const meta = MANAGEMENT_GRADE_METADATA[grade];
			updateYsStmt.run(meta.coefficient, meta.yearSubjectId);
			updateSsStmt.run(meta.coefficient, meta.yearId, meta.subjectId);
		}

		const ysByGrade = Object.fromEntries(
			ALL_MANAGEMENT_TRACK_IDS.map((g) => [g, MANAGEMENT_GRADE_METADATA[g].yearSubjectId])
		) as Record<ManagementTrackId, number>;

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
			yearSubjectId: number;
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
			academicYear?: string;
			originType?: 'exclusive' | 'official_certificate';
			hasSolution: number;
			difficulty: 'easy' | 'medium' | 'hard';
		}) => {
			const existing = findDocBySlug.get(params.slug) as { id: number; publicToken: string | null } | null;
			const token = existing?.publicToken || generatePublicToken();
			const ay = params.academicYear ?? '2025/2026';
			const ot = params.originType ?? 'exclusive';
			if (existing) {
				updateDocStmt.run(
					params.yearSubjectId,
					params.trimesterId,
					params.title,
					params.titleAr,
					params.type,
					params.content,
					params.pdfUrl,
					params.solutionUrl,
					params.fileSize,
					params.source,
					ay,
					params.hasSolution,
					params.difficulty,
					ot,
					token,
					existing.id
				);
			} else {
				insertDocStmt.run(
					params.yearSubjectId,
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
					ay,
					params.hasSolution,
					params.difficulty,
					ot,
					token
				);
			}
		};

		// 1. Lessons (72)
		for (const lesson of ALL_MANAGEMENT_LESSONS) {
			const serialized = JSON.stringify(lesson);
			upsertDocument({
				yearSubjectId: ysByGrade[lesson.grade],
				trimesterId: lesson.trimesterId,
				title: lesson.titleAr,
				titleAr: lesson.titleAr,
				slug: lesson.slug,
				type: 'lesson',
				content: serialized,
				pdfUrl: null,
				solutionUrl: null,
				fileSize: Buffer.byteLength(serialized, 'utf-8'),
				source: 'المنهاج الرسمي لشعبة تسيير واقتصاد — SujetStore',
				hasSolution: 0,
				difficulty: 'medium'
			});
			summary.lessonsUpserted++;
		}

		// 2. Questions, categories & quizzes (54 packs + 3 BAC simulators = 57 quizzes)
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
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 60, 0, 1, 1, 0, 1, 'public', datetime('now'))
		`);
		const updateQuizStmt = db.query(`
			UPDATE quizzes SET
				year_subject_id = ?, trimester_id = ?, title = ?, title_ar = ?, description = ?,
				difficulty = ?, time_limit = ?, passing_score = 60, shuffle_options = 0, show_answers = 1,
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

		const upsertAndLinkQuiz = (params: {
			yearSubjectId: number;
			trimesterId: TrimesterId;
			slug: string;
			title: string;
			description: string;
			difficulty: 'easy' | 'medium' | 'hard';
			timeLimit?: number;
			questionIds: number[];
		}) => {
			const ex = findQuizBySlugStmt.get(params.slug) as { id: number } | null;
			let qzId: number;
			const tl = params.timeLimit ?? 0;
			if (ex) {
				updateQuizStmt.run(
					params.yearSubjectId,
					params.trimesterId,
					params.title,
					params.title,
					params.description,
					params.difficulty,
					tl,
					ex.id
				);
				qzId = ex.id;
			} else {
				qzId = Number(
					insertQuizStmt.run(
						params.yearSubjectId,
						params.trimesterId,
						params.title,
						params.title,
						params.slug,
						params.description,
						params.difficulty,
						tl
					).lastInsertRowid
				);
			}
			summary.quizzesUpserted++;
			deleteQuizLinksByQuizStmt.run(qzId);
			let order = 0;
			for (const qId of params.questionIds) {
				order++;
				linkQuizQuestionStmt.run(qzId, qId, order);
				summary.quizQuestionsLinked++;
			}
			updateQuizCountStmt.run(order, qzId);
		};

		const seededByGradeTrim = {} as Record<ManagementTrackId, Record<TrimesterId, { id: number; diff: string }[]>>;

		for (const grade of ALL_MANAGEMENT_TRACK_IDS) {
			const ysId = ysByGrade[grade];
			const meta = MANAGEMENT_GRADE_METADATA[grade];
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[management_pipeline:${grade}:${trimesterId}]`;
				const catName = `بنك تمارين ${meta.subjectName} — ${meta.yearName} (${trimAr}) ${marker}`;
				const exCat = findCategoryStmt.get(marker) as { id: number } | null;
				let catId: number;
				if (exCat) {
					updateCategoryStmt.run(catName, catName, ysId, exCat.id);
					catId = exCat.id;
				} else {
					catId = Number(insertCategoryStmt.run(catName, catName, ysId).lastInsertRowid);
				}
				summary.categoriesUpserted++;
				deleteQuizLinksByCatStmt.run(catId);
				deleteQuestionsByCatStmt.run(catId);

				const tpls = getManagementTemplatesFor(grade, trimesterId);
				const pool: { id: number; diff: string }[] = [];
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
						pool.push({ id: qId, diff });
					}
				}
				seededByGradeTrim[grade][trimesterId] = pool;

				const easyIds = pool.filter((x) => x.diff === 'easy').map((x) => x.id);
				const medIds = pool.filter((x) => x.diff === 'medium').map((x) => x.id);
				const hardIds = pool.filter((x) => x.diff === 'hard').map((x) => x.id);

				const packs = [
					{ n: 1, label: 'التدريب القاعدي', diff: 'easy' as const, ids: easyIds.slice(0, 10) },
					{ n: 2, label: 'التطبيق والتحليل', diff: 'medium' as const, ids: medIds.slice(0, 10) },
					{ n: 3, label: 'المراجعة الشاملة للاختبار', diff: 'hard' as const, ids: [...hardIds, ...medIds].slice(0, 12) }
				];
				for (const pd of packs) {
					upsertAndLinkQuiz({
						yearSubjectId: ysId,
						trimesterId,
						slug: `${grade.replace('_', '-')}-mgt-${trimesterId}-quiz-pack-${pd.n}`,
						title: `${pd.label} في ${meta.subjectName} — ${meta.yearName} (${trimAr})`,
						description: `حزمة تمارين تفاعلية في ${meta.subjectName} — ${meta.yearName} (${trimAr}).`,
						difficulty: pd.diff,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3. 3AS BAC Simulators (3)
		for (const grade of ['3as_acc', '3as_eco', '3as_law'] as const) {
			const meta = MANAGEMENT_GRADE_METADATA[grade];
			const ids = TRIMESTERS.flatMap((t) =>
				seededByGradeTrim[grade][t].filter((x) => x.diff === 'hard').map((x) => x.id)
			).slice(0, 18);
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade[grade],
				trimesterId: 't3',
				slug: `${grade.replace('_', '-')}-bac-simulator`,
				title: `محاكي بكالوريا ${meta.subjectName} — شعبة ${meta.streamNameAr} (معامل ${meta.coefficient})`,
				description: `محاكي تفاعلي شامل لتحضير بكالوريا ${meta.subjectName} وفق المنهاج الرسمي.`,
				difficulty: 'hard',
				timeLimit: 2400,
				questionIds: ids
			});
		}

		// 4. Bank exercises (90)
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%management_pipeline%'");
		const insertBankStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);
		for (const tpl of ALL_MANAGEMENT_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['management_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Generated sample documents (66)
		for (const item of genManifest.items) {
			upsertDocument({
				yearSubjectId: item.yearSubjectId,
				trimesterId: item.trimesterId,
				title: item.titleAr,
				titleAr: item.titleAr,
				slug: item.slug,
				type: item.docType,
				content: null,
				pdfUrl: item.pdfUrl,
				solutionUrl: item.solutionUrl,
				fileSize: Number(item.fileSize) || 0,
				source: 'المولّد الآلي SujetStore — تسيير واقتصاد',
				hasSolution: 1,
				difficulty: item.difficulty
			});
			summary.examsUpserted++;
		}

		// 6. Official BAC papers (18) with JSON.stringify(examDoc) in documents.content
		const bacMap = new Map(bacManifest.items.map((it) => [it.slug, it]));
		for (const spec of ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS) {
			const mItem = bacMap.get(spec.slug);
			if (!mItem) throw new Error(`Missing manifest entry for ${spec.slug}`);
			upsertDocument({
				yearSubjectId: spec.yearSubjectId,
				trimesterId: 't3',
				title: spec.titleAr,
				titleAr: spec.titleAr,
				slug: spec.slug,
				type: 'exam',
				content: JSON.stringify(spec.examDoc),
				pdfUrl: mItem.pdfUrl,
				solutionUrl: mItem.solutionUrl,
				fileSize: Number(mItem.fileSize) || 0,
				source: 'أرشيف بكالوريا شعبة تسيير واقتصاد — منصة SujetStore',
				academicYear: spec.academicYear,
				originType: 'official_certificate',
				hasSolution: 1,
				difficulty: 'hard'
			});
			summary.officialBacUpserted++;
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
