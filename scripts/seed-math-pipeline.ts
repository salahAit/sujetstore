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

const GRADES: readonly GradeId[] = ['1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am'];
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[1001, 'easy'],
	[1002, 'easy'],
	[1003, 'medium'],
	[1004, 'medium'],
	[1005, 'hard']
];

const PACK_COUNTS_BY_GRADE: Record<GradeId, readonly [number, number, number]> = {
	'1ap': [6, 6, 8],
	'2ap': [6, 6, 8],
	'3ap': [8, 8, 12],
	'4ap': [8, 8, 12],
	'5ap': [8, 8, 12],
	'1am': [10, 10, 15],
	'2am': [10, 10, 15],
	'3am': [10, 10, 15],
	'4am': [10, 10, 15]
};

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

		// 1. Publish visibility for all 9 Primary (1ap..5ap) & Middle (1am..4am) grades in Mathematics (MAT-B)
		const ALL_YEAR_IDS_SQL = "('1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am')";
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id IN ('primaire', 'moyen')");
		db.exec(`UPDATE years SET visibility = 'published' WHERE id IN ${ALL_YEAR_IDS_SQL}`);
		db.exec(`UPDATE level_streams SET visibility = 'published' WHERE year_id IN ${ALL_YEAR_IDS_SQL}`);
		db.exec(
			`UPDATE stream_subjects SET visibility = 'published' WHERE subject_id = 'MAT-B' AND (year_id IS NULL OR year_id IN ${ALL_YEAR_IDS_SQL})`
		);
		db.exec(
			`UPDATE year_subjects SET visibility = 'published' WHERE subject_id = 'MAT-B' AND year_id IN ${ALL_YEAR_IDS_SQL}`
		);

		const ysRows = db
			.query(
				`SELECT id, year_id FROM year_subjects WHERE subject_id = 'MAT-B' AND year_id IN ${ALL_YEAR_IDS_SQL} ORDER BY id ASC`
			)
			.all() as Array<{ id: number; year_id: GradeId }>;

		const ysByGrade: Record<GradeId, number> = {
			'1ap': GRADE_METADATA['1ap'].yearSubjectId,
			'2ap': GRADE_METADATA['2ap'].yearSubjectId,
			'3ap': GRADE_METADATA['3ap'].yearSubjectId,
			'4ap': GRADE_METADATA['4ap'].yearSubjectId,
			'5ap': GRADE_METADATA['5ap'].yearSubjectId,
			'1am': GRADE_METADATA['1am'].yearSubjectId,
			'2am': GRADE_METADATA['2am'].yearSubjectId,
			'3am': GRADE_METADATA['3am'].yearSubjectId,
			'4am': GRADE_METADATA['4am'].yearSubjectId
		};
		for (const row of ysRows) {
			if (GRADES.includes(row.year_id)) {
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
				difficulty, origin_type, download_count, access_tier, is_published, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '2025/2026', ?, ?, 'exclusive', 0, 'public', 1, datetime('now'))
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
				origin_type = 'exclusive',
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

		// 2. Upsert 189 Interactive Lessons into documents
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

		// 3. Clean legacy single-pack quizzes, upsert 27 question_categories, 810 parameterized questions, and 83 quizzes
		db.exec(`
			DELETE FROM quiz_questions
			WHERE quiz_id IN (SELECT id FROM quizzes WHERE slug LIKE '%-math-t_-interactive-quiz')
		`);
		db.exec("DELETE FROM quizzes WHERE slug LIKE '%-math-t_-interactive-quiz'");

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
			) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 60, 0, 1, 1, 0, 1, 'public', datetime('now'))
		`);
		const updateQuizStmt = db.query(`
			UPDATE quizzes SET
				year_subject_id = ?,
				trimester_id = ?,
				title = ?,
				title_ar = ?,
				description = ?,
				difficulty = ?,
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

		interface SeededQuestionRef {
			questionId: number;
			templateIdx: number;
			seedIdx: number;
			difficulty: 'easy' | 'medium' | 'hard';
		}

		const seededByGradeTrim = {} as Record<GradeId, Record<TrimesterId, SeededQuestionRef[]>>;

		const upsertAndLinkQuiz = (params: {
			yearSubjectId: number;
			trimesterId: TrimesterId;
			slug: string;
			title: string;
			description: string;
			difficulty: 'easy' | 'medium' | 'hard';
			questionIds: number[];
		}) => {
			const existingQuiz = findQuizBySlugStmt.get(params.slug) as { id: number } | null;
			let quizId: number;
			if (existingQuiz) {
				updateQuizStmt.run(
					params.yearSubjectId,
					params.trimesterId,
					params.title,
					params.title,
					params.description,
					params.difficulty,
					existingQuiz.id
				);
				quizId = existingQuiz.id;
			} else {
				const qzRes = insertQuizStmt.run(
					params.yearSubjectId,
					params.trimesterId,
					params.title,
					params.title,
					params.slug,
					params.description,
					params.difficulty
				);
				quizId = Number(qzRes.lastInsertRowid);
			}
			summary.quizzesUpserted++;

			deleteQuizLinksByQuizStmt.run(quizId);
			let order = 0;
			for (const questionId of params.questionIds) {
				order++;
				linkQuizQuestionStmt.run(quizId, questionId, order);
				summary.quizQuestionsLinked++;
			}
			updateQuizCountStmt.run(order, quizId);
		};

		const selectPackIds = (
			pool: SeededQuestionRef[],
			counts: readonly [number, number, number]
		): [number[], number[], number[]] => {
			const takeFromOrder = (candidates: SeededQuestionRef[], target: number, used: Set<number>): number[] => {
				const out: number[] = [];
				for (const item of candidates) {
					if (out.length >= target) break;
					if (!used.has(item.questionId)) {
						used.add(item.questionId);
						out.push(item.questionId);
					}
				}
				return out;
			};

			// Sort by seedIdx first (so all 6 templates appear before repeating a template), then templateIdx
			const bySeedOrder = [...pool].sort((a, b) => a.seedIdx - b.seedIdx || a.templateIdx - b.templateIdx);
			const easyCandidates = bySeedOrder.filter((q) => q.difficulty === 'easy');
			const mediumCandidates = bySeedOrder.filter((q) => q.difficulty === 'medium');
			const hardCandidates = bySeedOrder.filter((q) => q.difficulty === 'hard');

			const usedOverall = new Set<number>();
			const pack1Ids = takeFromOrder(easyCandidates, counts[0], usedOverall);
			const pack2Ids = takeFromOrder(mediumCandidates, counts[1], usedOverall);

			const pack3Pool = [
				...hardCandidates,
				...bySeedOrder.filter((q) => !usedOverall.has(q.questionId)),
				...mediumCandidates
			];
			const usedInPack3 = new Set<number>();
			const pack3Ids = takeFromOrder(pack3Pool, counts[2], usedInPack3);

			return [pack1Ids, pack2Ids, pack3Ids];
		};

		for (const grade of GRADES) {
			const yearSubjectId = ysByGrade[grade];
			const yearName = GRADE_METADATA[grade].yearName;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

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

				// Cleanly refresh category links and prior pipeline questions without violating FK constraints
				deleteQuizLinksByCatStmt.run(categoryId);
				deleteQuestionsByCatStmt.run(categoryId);

				const templates = getTemplatesFor(grade, trimesterId);
				const poolRefs: SeededQuestionRef[] = [];
				for (let templateIdx = 0; templateIdx < templates.length; templateIdx++) {
					const tpl = templates[templateIdx];
					for (let seedIdx = 0; seedIdx < SEED_DIFFICULTY_PLAN.length; seedIdx++) {
						const [seed, difficulty] = SEED_DIFFICULTY_PLAN[seedIdx];
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
						summary.questionsInserted++;
						poolRefs.push({ questionId, templateIdx, seedIdx, difficulty });
					}
				}
				seededByGradeTrim[grade][trimesterId] = poolRefs;

				const packCounts = PACK_COUNTS_BY_GRADE[grade];
				const [pack1Ids, pack2Ids, pack3Ids] = selectPackIds(poolRefs, packCounts);

				const packDefs: readonly {
					packNum: 1 | 2 | 3;
					label: string;
					desc: string;
					difficulty: 'easy' | 'medium' | 'hard';
					ids: number[];
				}[] = [
					{
						packNum: 1,
						label: 'التدريب الأساسي والتحضير للفرض',
						desc: `حزمة التدريب الأساسي لبناء المفاهيم والتحضير للفرض — ${yearName} (${trimesterAr}).`,
						difficulty: 'easy',
						ids: pack1Ids
					},
					{
						packNum: 2,
						label: 'تحدي الفهم والتطبيق',
						desc: `تمارين متوسطة لتعميق الفهم وربط المعارف — ${yearName} (${trimesterAr}).`,
						difficulty: 'medium',
						ids: pack2Ids
					},
					{
						packNum: 3,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة نحو الاختبار الفصلي مع الوضعيات الإدماجية — ${yearName} (${trimesterAr}).`,
						difficulty: 'hard',
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade}-math-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${yearName} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National Simulator Quizzes (5AP Cinq 15q + 4AM BEM 18q)
		{
			const cinqIds: number[] = [];
			for (const tid of TRIMESTERS) {
				const trimPool = seededByGradeTrim['5ap'][tid]
					.filter((q) => q.seedIdx === 4 || q.seedIdx === 3)
					.sort((a, b) => b.seedIdx - a.seedIdx || a.templateIdx - b.templateIdx);
				const seenTpl = new Set<number>();
				for (const q of trimPool) {
					if (!seenTpl.has(q.templateIdx) && cinqIds.length < (tid === 't1' ? 5 : tid === 't2' ? 10 : 15)) {
						seenTpl.add(q.templateIdx);
						cinqIds.push(q.questionId);
					}
				}
			}
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade['5ap'],
				trimesterId: 't3',
				slug: '5ap-math-t3-cinq-simulator',
				title: 'محاكي شهادة التعليم الابتدائي (Cinq) — رياضيات',
				description: 'تحدٍ تفاعلي شامل من 15 سؤالاً يغطي محاور الفصول الثلاثة للسنة الخامسة ابتدائي تحضيراً لامتحان نهاية المرحلة.',
				difficulty: 'hard',
				questionIds: cinqIds
			});

			const bemIds: number[] = [];
			for (const tid of TRIMESTERS) {
				const trimHard = seededByGradeTrim['4am'][tid]
					.filter((q) => q.seedIdx === 4)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of trimHard) {
					bemIds.push(q.questionId);
				}
			}
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade['4am'],
				trimesterId: 't3',
				slug: '4am-math-t3-bem-simulator',
				title: 'محاكي شهادة التعليم المتوسط (BEM) — رياضيات',
				description: 'محاكي تفاعلي شامل من 18 سؤالاً بمستوى شهادة التعليم المتوسط يغطي كافة مقاطع السنة الرابعة متوسط.',
				difficulty: 'hard',
				questionIds: bemIds
			});
		}

		// 4. Upsert 162 bank_exercises
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
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore' AND slug NOT IN (${placeholders})`
				).run(...manifestSlugs);
			}
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
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-math-t_-quiz-pack-%' OR slug IN ('5ap-math-t3-cinq-simulator', '4am-math-t3-bem-simulator')) AND is_published = 1"
					)
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
