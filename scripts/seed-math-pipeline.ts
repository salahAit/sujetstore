import { Database } from 'bun:sqlite';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_LESSONS,
	ALL_TEMPLATES,
	GRADE_METADATA,
	getTemplatesFor,
	type GradeId
} from '../src/lib/modules/MathTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: GradeId;
	yearSubjectId?: number;
	trimesterId: TrimesterId;
	docType: 'exam' | 'test';
	titleAr: string;
	slug: string;
	pdfUrl: string;
	solutionUrl: string | null;
	fileSize: number;
	difficulty?: 'easy' | 'medium' | 'hard';
}

interface GeneratedManifest {
	items: GeneratedManifestItem[];
}

const GRADES: readonly GradeId[] = ['2ap', '5ap', '2am'];
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[1001, 'easy'],
	[1002, 'medium'],
	[1003, 'hard']
];

function parseCliArgs(argv: string[]): { dbPath: string; skipExams: boolean } {
	let dbFlag = 'data/content.db';
	let skipExams = false;

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--skip-exams') {
			skipExams = true;
		} else if (arg.startsWith('--db=')) {
			const val = arg.slice('--db='.length).trim();
			if (!val) throw new Error('Invalid empty --db= flag value');
			dbFlag = val;
		} else if (arg === '--db') {
			const next = argv[i + 1]?.trim();
			if (!next) throw new Error('Missing path after --db flag');
			dbFlag = next;
			i++;
		}
	}

	return {
		dbPath: resolve(process.cwd(), dbFlag),
		skipExams
	};
}

function loadGeneratedManifest(manifestPath: string): GeneratedManifest {
	if (!existsSync(manifestPath)) {
		throw new Error(
			`Generated exams manifest not found at ${manifestPath}. Compile generated sample exams first or pass --skip-exams.`
		);
	}
	const raw = readFileSync(manifestPath, 'utf-8');
	const parsed = JSON.parse(raw) as Partial<GeneratedManifest>;
	if (!parsed || !Array.isArray(parsed.items)) {
		throw new Error(`Invalid generated exams manifest at ${manifestPath}: expected { items: [...] }`);
	}
	return parsed as GeneratedManifest;
}

function main() {
	const { dbPath, skipExams } = parseCliArgs(process.argv.slice(2));
	const manifestPath = resolve(process.cwd(), 'pipeline/generated_exams/generated_manifest.json');
	const manifest = skipExams ? null : loadGeneratedManifest(manifestPath);

	const db = new Database(dbPath);
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		dbPath,
		skipExams,
		yearSubjectIds: {} as Record<GradeId, number>,
		lessonsUpserted: 0,
		categoriesUpserted: 0,
		quizzesUpserted: 0,
		questionsInserted: 0,
		quizQuestionsLinked: 0,
		bankExercisesInserted: 0,
		examsUpserted: 0
	};

	try {
		db.exec('BEGIN');

		// 1. Publish visibility for Primary (2ap, 5ap) & Middle (1am..4am) Mathematics (MAT-B)
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id IN ('primaire', 'moyen')");
		db.exec("UPDATE years SET visibility = 'published' WHERE id IN ('2ap', '5ap', '1am', '2am', '3am', '4am')");
		db.exec(
			"UPDATE level_streams SET visibility = 'published' WHERE year_id IN ('2ap', '5ap', '1am', '2am', '3am', '4am')"
		);
		db.exec(
			"UPDATE stream_subjects SET visibility = 'published' WHERE subject_id = 'MAT-B' AND (year_id IS NULL OR year_id IN ('2ap', '5ap', '1am', '2am', '3am', '4am'))"
		);
		db.exec(
			"UPDATE year_subjects SET visibility = 'published' WHERE subject_id = 'MAT-B' AND year_id IN ('2ap', '5ap', '1am', '2am', '3am', '4am')"
		);

		const ysRows = db
			.query(
				"SELECT id, year_id FROM year_subjects WHERE subject_id = 'MAT-B' AND year_id IN ('2ap', '5ap', '2am') ORDER BY id ASC"
			)
			.all() as Array<{ id: number; year_id: GradeId }>;

		const ysByGrade: Record<GradeId, number> = {
			'2ap': GRADE_METADATA['2ap'].yearSubjectId,
			'5ap': GRADE_METADATA['5ap'].yearSubjectId,
			'2am': GRADE_METADATA['2am'].yearSubjectId
		};
		for (const row of ysRows) {
			if (row.year_id === '2ap' || row.year_id === '5ap' || row.year_id === '2am') {
				ysByGrade[row.year_id] = row.id;
			}
		}
		summary.yearSubjectIds = ysByGrade;

		// Prepared statements for documents upsert (slug is NOT guaranteed unique in older SQLite table definitions)
		const findDocBySlug = db.query('SELECT id FROM documents WHERE slug = ? LIMIT 1');
		const insertDocStmt = db.query(`
			INSERT INTO documents (
				year_subject_id, trimester_id, title, title_ar, slug, type, content,
				pdf_url, solution_url, file_size, source, academic_year, has_solution,
				difficulty, download_count, access_tier, is_published, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '2025/2026', ?, ?, 0, 'public', 1, datetime('now'))
		`);
		const updateDocStmt = db.query(`
			UPDATE documents SET
				year_subject_id = ?,
				trimester_id = ?,
				title = ?,
				title_ar = ?,
				type = ?,
				content = ?,
				pdf_url = ?,
				solution_url = ?,
				file_size = ?,
				source = ?,
				academic_year = '2025/2026',
				has_solution = ?,
				difficulty = ?,
				is_published = 1,
				access_tier = 'public',
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
			hasSolution: number;
			difficulty: 'easy' | 'medium' | 'hard';
		}) => {
			const existing = findDocBySlug.get(params.slug) as { id: number } | null;
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
					params.hasSolution,
					params.difficulty,
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
					params.hasSolution,
					params.difficulty
				);
			}
		};

		// 2. Upsert 63 Interactive Lessons into documents
		for (const lesson of ALL_LESSONS) {
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
				source: 'منهاج الجيل الثاني — SujetStore',
				hasSolution: 0,
				difficulty: 'medium'
			});
			summary.lessonsUpserted++;
		}

		// 3. Upsert 9 question_categories, 162 parameterized questions, and 9 trimester quizzes
		const findCategoryStmt = db.query(
			"SELECT id FROM question_categories WHERE name LIKE '%' || ? || '%' LIMIT 1"
		);
		const insertCategoryStmt = db.query(`
			INSERT INTO question_categories (name, description, year_subject_id, updated_at)
			VALUES (?, ?, ?, datetime('now'))
		`);
		const updateCategoryStmt = db.query(`
			UPDATE question_categories
			SET name = ?, description = ?, year_subject_id = ?, updated_at = datetime('now')
			WHERE id = ?
		`);

		const findQuizBySlugStmt = db.query('SELECT id FROM quizzes WHERE slug = ? LIMIT 1');
		const insertQuizStmt = db.query(`
			INSERT INTO quizzes (
				year_subject_id, trimester_id, title, title_ar, slug, description,
				difficulty, time_limit, question_count, passing_score, shuffle_options,
				show_answers, practice_mode, is_premium, is_published, access_tier, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, 'medium', 0, 0, 60, 0, 1, 1, 0, 1, 'public', datetime('now'))
		`);
		const updateQuizStmt = db.query(`
			UPDATE quizzes SET
				year_subject_id = ?,
				trimester_id = ?,
				title = ?,
				title_ar = ?,
				description = ?,
				difficulty = 'medium',
				time_limit = 0,
				passing_score = 60,
				shuffle_options = 0,
				show_answers = 1,
				practice_mode = 1,
				is_premium = 0,
				is_published = 1,
				access_tier = 'public',
				updated_at = datetime('now')
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
		const linkQuizQuestionStmt = db.query(`
			INSERT INTO quiz_questions (quiz_id, question_id, points, "order")
			VALUES (?, ?, 1, ?)
		`);
		const updateQuizCountStmt = db.query(
			"UPDATE quizzes SET question_count = ?, updated_at = datetime('now') WHERE id = ?"
		);

		for (const grade of GRADES) {
			const yearSubjectId = ysByGrade[grade];
			const yearName = GRADE_METADATA[grade].yearName;

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[math_pipeline:${grade}:${trimesterId}]`;
				const catName = `بنك تمارين الرياضيات التوليدية — ${yearName} (${trimesterAr}) ${marker}`;
				const catDesc = `بنك الأسئلة التوليدية لمنهاج الجيل الثاني في الرياضيات — ${yearName} (${trimesterAr})`;

				const existingCat = findCategoryStmt.get(marker) as { id: number } | null;
				let categoryId: number;
				if (existingCat) {
					updateCategoryStmt.run(catName, catDesc, yearSubjectId, existingCat.id);
					categoryId = existingCat.id;
				} else {
					const catRes = insertCategoryStmt.run(catName, catDesc, yearSubjectId);
					categoryId = Number(catRes.lastInsertRowid);
				}
				summary.categoriesUpserted++;

				const quizSlug = `${grade}-math-${trimesterId}-interactive-quiz`;
				const quizTitle = `اختبار تفاعلي في الرياضيات — ${yearName} (${trimesterAr})`;
				const quizDesc = `مجموعة تمارين تفاعلية شاملة (${yearName} — ${trimesterAr}) متدرجة الصعوبة وفق منهاج الجيل الثاني.`;

				const existingQuiz = findQuizBySlugStmt.get(quizSlug) as { id: number } | null;
				let quizId: number;
				if (existingQuiz) {
					updateQuizStmt.run(yearSubjectId, trimesterId, quizTitle, quizTitle, quizDesc, existingQuiz.id);
					quizId = existingQuiz.id;
				} else {
					const qzRes = insertQuizStmt.run(
						yearSubjectId,
						trimesterId,
						quizTitle,
						quizTitle,
						quizSlug,
						quizDesc
					);
					quizId = Number(qzRes.lastInsertRowid);
				}
				summary.quizzesUpserted++;

				// Cleanly refresh links and prior pipeline questions without violating FK constraints
				deleteQuizLinksByQuizStmt.run(quizId);
				deleteQuizLinksByCatStmt.run(categoryId);
				deleteQuestionsByCatStmt.run(categoryId);

				const templates = getTemplatesFor(grade, trimesterId);
				let order = 0;
				for (const tpl of templates) {
					for (const [seed, difficulty] of SEED_DIFFICULTY_PLAN) {
						const inst = tpl.generate(seed, difficulty);
						const q = inst.quizQuestion;
						const qRes = insertQuestionStmt.run(
							categoryId,
							q.type,
							difficulty,
							q.questionText,
							q.questionTextAr ?? q.questionText,
							JSON.stringify(q.questionData),
							q.explanation ?? null,
							q.imageUrl ?? null,
							q.imageCaption ?? null
						);
						const questionId = Number(qRes.lastInsertRowid);
						order++;
						linkQuizQuestionStmt.run(quizId, questionId, order);
						summary.questionsInserted++;
						summary.quizQuestionsLinked++;
					}
				}

				updateQuizCountStmt.run(order, quizId);
			}
		}

		// 4. Upsert 54 bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%math_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['math_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs into documents (unless --skip-exams)
		if (manifest) {
			for (const item of manifest.items) {
				const ysId =
					item.grade && ysByGrade[item.grade]
						? ysByGrade[item.grade]
						: Number(item.yearSubjectId);
				if (!ysId || !Number.isFinite(ysId)) {
					throw new Error(`Manifest item "${item.slug}" is missing a valid grade or yearSubjectId`);
				}
				upsertDocument({
					yearSubjectId: ysId,
					trimesterId: item.trimesterId,
					title: item.titleAr,
					titleAr: item.titleAr,
					slug: item.slug,
					type: item.docType,
					content: null,
					pdfUrl: item.pdfUrl,
					solutionUrl: item.solutionUrl,
					fileSize: Number(item.fileSize) || 0,
					source: 'المولّد الآلي SujetStore',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		db.exec('COMMIT');

		const totals = {
			publishedLevels: (
				db
					.query("SELECT COUNT(*) as n FROM education_levels WHERE visibility = 'published'")
					.get() as { n: number }
			).n,
			publishedLessons: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE type = 'lesson' AND is_published = 1")
					.get() as { n: number }
			).n,
			pipelineQuizzes: (
				db
					.query("SELECT COUNT(*) as n FROM quizzes WHERE slug LIKE '%-math-t_-interactive-quiz'")
					.get() as { n: number }
			).n,
			pipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%math_pipeline%'")
					.get() as { n: number }
			).n,
			generatedExamsAndTests: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore'")
					.get() as { n: number }
			).n
		};

		console.log(
			JSON.stringify(
				{
					status: 'ok',
					summary,
					totals
				},
				null,
				2
			)
		);
	} catch (err) {
		try {
			db.exec('ROLLBACK');
		} catch {
			// Ignore rollback error if transaction was not active
		}
		throw err;
	} finally {
		db.close();
	}
}

main();
