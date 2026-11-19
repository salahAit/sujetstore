import { Database } from 'bun:sqlite';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_SCIENCES_LESSONS,
	ALL_SCIENCES_TEMPLATES,
	ALL_SCIENCES_TRACK_IDS,
	SCIENCES_GRADE_METADATA,
	getSciencesTemplatesFor,
	type SciencesTrackId
} from '../src/lib/modules/SciencesTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: SciencesTrackId;
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

interface OfficialBacManifestItem {
	slug: string;
	grade: '3as_se' | '3as_math';
	yearSubjectId: number;
	streamId: 'SE' | 'MATH';
	academicYear: string;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

interface OfficialBacManifest {
	items: OfficialBacManifestItem[];
}

const GRADES: readonly SciencesTrackId[] = ALL_SCIENCES_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[3001, 'easy'],
	[3002, 'easy'],
	[3003, 'medium'],
	[3004, 'medium'],
	[3005, 'hard']
];

const PACK_COUNTS_BY_GRADE: Record<SciencesTrackId, readonly [number, number, number]> = {
	'1ap': [8, 8, 12],
	'2ap': [8, 8, 12],
	'3ap': [8, 8, 12],
	'4ap': [10, 10, 14],
	'5ap': [10, 10, 15],
	'1am': [10, 10, 15],
	'2am': [10, 10, 15],
	'3am': [10, 10, 15],
	'4am': [10, 10, 15],
	'1as_tcst': [10, 10, 15],
	'2as_se': [12, 12, 18],
	'2as_math': [10, 10, 15],
	'3as_se': [12, 12, 18],
	'3as_math': [10, 10, 16]
};

function parseCliArgs(argv: string[]): { dbPath: string; skipExams: boolean } {
	let dbFlag = 'data/content.db';
	let skipExams = false;
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--skip-exams') skipExams = true;
		else if (arg.startsWith('--db=')) dbFlag = arg.slice('--db='.length).trim();
		else if (arg === '--db' && argv[i + 1]) {
			dbFlag = argv[i + 1].trim();
			i++;
		}
	}
	return { dbPath: resolve(process.cwd(), dbFlag), skipExams };
}

function loadManifest<T>(manifestPath: string, label: string): T {
	if (!existsSync(manifestPath)) {
		throw new Error(`${label} not found at ${manifestPath}`);
	}
	return JSON.parse(readFileSync(manifestPath, 'utf-8')) as T;
}

function main() {
	const { dbPath, skipExams } = parseCliArgs(process.argv.slice(2));
	const manifest = skipExams
		? null
		: loadManifest<GeneratedManifest>(
				resolve(process.cwd(), 'pipeline/generated_exams_sciences/generated_sciences_manifest.json'),
				'Generated Sciences exams manifest'
			);
	const officialBacManifest = skipExams
		? null
		: loadManifest<OfficialBacManifest>(
				resolve(process.cwd(), 'pipeline/official_bac_sciences/official_bac_sciences_manifest.json'),
				'Official Sciences BAC manifest'
			);

	const db = new Database(dbPath);
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		dbPath,
		skipExams,
		yearSubjectIds: {} as Record<SciencesTrackId, number>,
		lessonsUpserted: 0,
		categoriesUpserted: 0,
		quizzesUpserted: 0,
		questionsInserted: 0,
		quizQuestionsLinked: 0,
		bankExercisesInserted: 0,
		examsUpserted: 0,
		officialBacUpserted: 0
	};

	try {
		db.exec('BEGIN');

		// 1. Ensure 1AP (797) and 2AP (798) have SCI-B rows idempotently in year_subjects & stream_subjects
		for (const [id, yr] of [
			[797, '1ap'],
			[798, '2ap']
		] as const) {
			const existingYs = db
				.query("SELECT id FROM year_subjects WHERE year_id = ? AND subject_id = 'SCI-B' LIMIT 1")
				.get(yr) as { id: number } | null;
			if (!existingYs) {
				db.query(
					"INSERT INTO year_subjects (id, year_id, subject_id, stream_id, coefficient, \"order\", visibility) VALUES (?, ?, 'SCI-B', 'GEN', 1, 6, 'published')"
				).run(id, yr);
			}
			const existingSs = db
				.query("SELECT id FROM stream_subjects WHERE stream_id = 'GEN' AND year_id = ? AND subject_id = 'SCI-B' LIMIT 1")
				.get(yr) as { id: number } | null;
			if (!existingSs) {
				db.query(
					"INSERT INTO stream_subjects (stream_id, subject_id, year_id, coefficient, \"order\", visibility) VALUES ('GEN', 'SCI-B', ?, 1, 6, 'published')"
				).run(yr);
			}
		}

		// 1b. Publish visibility & official coefficients for all 14 Natural Sciences tracks
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id IN ('primaire', 'moyen', 'secondaire')");
		db.exec("UPDATE years SET visibility = 'published' WHERE id IN ('1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am', '1as', '2as', '3as')");
		db.exec(`
			UPDATE stream_subjects SET visibility = 'published',
				coefficient = CASE
					WHEN year_id IN ('1ap','2ap','3ap','4ap','5ap','1am','2am') AND subject_id = 'SCI-B' THEN 1
					WHEN year_id IN ('3am','4am') AND subject_id = 'SCI-B' THEN 2
					WHEN year_id = '1as' AND stream_id = 'TCST' AND subject_id = 'SCI-SE' THEN 4
					WHEN year_id IN ('2as','3as') AND stream_id = 'SE' AND subject_id = 'SCI-SE' THEN 6
					WHEN year_id IN ('2as','3as') AND stream_id = 'MATH' AND subject_id = 'SCI-MATH' THEN 2
					ELSE coefficient
				END
			WHERE (subject_id = 'SCI-B' AND (year_id IS NULL OR year_id IN ('1ap','2ap','3ap','4ap','5ap','1am','2am','3am','4am')))
			   OR (year_id = '1as' AND stream_id = 'TCST' AND subject_id = 'SCI-SE')
			   OR (year_id IN ('2as','3as') AND (
					(stream_id = 'SE' AND subject_id = 'SCI-SE') OR
					(stream_id = 'MATH' AND subject_id = 'SCI-MATH')
			   ))
		`);
		db.exec(`
			UPDATE year_subjects SET visibility = 'published',
				coefficient = CASE id
					WHEN 797 THEN 1
					WHEN 798 THEN 1
					WHEN 595 THEN 1
					WHEN 602 THEN 1
					WHEN 610 THEN 1
					WHEN 617 THEN 1
					WHEN 627 THEN 1
					WHEN 637 THEN 2
					WHEN 647 THEN 2
					WHEN 656 THEN 4
					WHEN 674 THEN 6
					WHEN 694 THEN 2
					WHEN 684 THEN 6
					WHEN 704 THEN 2
					ELSE coefficient
				END
			WHERE id IN (797, 798, 595, 602, 610, 617, 627, 637, 647, 656, 674, 694, 684, 704)
		`);

		const ysByGrade = Object.fromEntries(
			GRADES.map((g) => [g, SCIENCES_GRADE_METADATA[g].yearSubjectId])
		) as Record<SciencesTrackId, number>;
		summary.yearSubjectIds = ysByGrade;

		const findDocBySlug = db.query('SELECT id FROM documents WHERE slug = ? LIMIT 1');
		const insertDocStmt = db.query(`
			INSERT INTO documents (
				year_subject_id, trimester_id, title, title_ar, slug, type, content,
				pdf_url, solution_url, file_size, source, academic_year, has_solution,
				difficulty, origin_type, download_count, access_tier, is_published, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'public', 1, datetime('now'))
		`);
		const updateDocStmt = db.query(`
			UPDATE documents SET
				year_subject_id = ?, trimester_id = ?, title = ?, title_ar = ?, type = ?,
				content = ?, pdf_url = ?, solution_url = ?, file_size = ?, source = ?,
				academic_year = ?, has_solution = ?, difficulty = ?, origin_type = ?,
				is_published = 1, access_tier = 'public', updated_at = datetime('now')
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
			const academicYear = params.academicYear ?? '2025/2026';
			const originType = params.originType ?? 'exclusive';
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
					academicYear,
					params.hasSolution,
					params.difficulty,
					originType,
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
					academicYear,
					params.hasSolution,
					params.difficulty,
					originType
				);
			}
		};

		// 2. Upsert all Natural Sciences interactive lessons
		for (const lesson of ALL_SCIENCES_LESSONS) {
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
				source: lesson.grade.endsWith('ap')
					? 'منهاج الجيل الثاني للتربية العلمية والتكنولوجية — SujetStore'
					: lesson.grade.includes('as')
						? 'المنهاج الرسمي لعلوم الطبيعة والحياة (التعليم الثانوي) — SujetStore'
						: 'منهاج الجيل الثاني لعلوم الطبيعة والحياة — SujetStore',
				hasSolution: 0,
				difficulty: 'medium'
			});
			summary.lessonsUpserted++;
		}

		// 3. Upsert question categories, parameterized questions, and quizzes
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
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 60, 0, 1, 1, 0, 1, 'public', datetime('now'))
		`);
		const updateQuizStmt = db.query(`
			UPDATE quizzes SET
				year_subject_id = ?, trimester_id = ?, title = ?, title_ar = ?, description = ?,
				difficulty = ?, time_limit = ?, passing_score = 60, shuffle_options = 0,
				show_answers = 1, practice_mode = 1, is_premium = 0, is_published = 1,
				access_tier = 'public', updated_at = datetime('now')
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

		const seededByGradeTrim = {} as Record<SciencesTrackId, Record<TrimesterId, SeededQuestionRef[]>>;

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
			const timeLimit = params.timeLimit ?? 0;
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
					timeLimit,
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
					params.difficulty,
					timeLimit
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
			const meta = SCIENCES_GRADE_METADATA[grade];
			const trackLabel = meta.yearName;
			const subjAr = meta.subjectName;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[sciences_pipeline:${grade}:${trimesterId}]`;
				const catName = `بنك تمارين ${subjAr} التوليدية — ${trackLabel} (${trimesterAr}) ${marker}`;
				const catDesc = `بنك الأسئلة التوليدية لمنهاج ${subjAr} الرسمي — ${trackLabel} (${trimesterAr})`;

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

				deleteQuizLinksByCatStmt.run(categoryId);
				deleteQuestionsByCatStmt.run(categoryId);

				const templates = getSciencesTemplatesFor(grade, trimesterId);
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

				const packDefs = [
					{
						packNum: 1 as const,
						label: 'التدريب الأساسي وترسيخ المفاهيم',
						desc: `حزمة التدريب الأساسي لبناء المفاهيم والمصطلحات العلمية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'easy' as const,
						ids: pack1Ids
					},
					{
						packNum: 2 as const,
						label: 'تحدي الفهم وتحليل الوثائق',
						desc: `تمارين متوسطة لتعميق الفهم واستغلال الرسومات والمنحنيات العلمية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'medium' as const,
						ids: pack2Ids
					},
					{
						packNum: 3 as const,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة نحو الاختبار الفصلي مع الوضعيات والمسعى العلمي — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'hard' as const,
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade}-sci-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${trackLabel} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National Simulators: 5AP Competency, 4AM BEM, 3AS SE BAC, 3AS MATH BAC
		const simConfigs: Array<{
			grade: SciencesTrackId;
			slug: string;
			title: string;
			desc: string;
			targetCount: number;
			timeLimit?: number;
		}> = [
			{
				grade: '5ap',
				slug: '5ap-sci-t3-competency-simulator',
				title: 'محاكي تقييم المكتسبات — التربية العلمية والتكنولوجية (5 ابتدائي)',
				desc: 'محاكي تفاعلي شامل يغطي الهواء والاحتراق والأمن الكهربائي والتغذية وتكيف النبات والبيئة.',
				targetCount: 15
			},
			{
				grade: '4am',
				slug: '4am-sci-t3-bem-simulator',
				title: 'محاكي شهادة التعليم المتوسط (BEM) — علوم الطبيعة والحياة',
				desc: 'محاكي تفاعلي شامل بمستوى شهادة التعليم المتوسط يغطي التغذية، الاتصال العصبي، المناعة والوراثة.',
				targetCount: 18
			},
			{
				grade: '3as_se',
				slug: '3as-se-sci-bac-simulator',
				title: 'محاكي بكالوريا علوم الطبيعة والحياة — شعبة علوم تجريبية',
				desc: 'محاكي تفاعلي شامل من 20 سؤالاً يغطي تركيب وبنية البروتين، الإنزيمات، المناعة، الاتصال العصبي، التركيب الضوئي، التنفس والتكتونية.',
				targetCount: 20,
				timeLimit: 5400
			},
			{
				grade: '3as_math',
				slug: '3as-math-sci-bac-simulator',
				title: 'محاكي بكالوريا علوم الطبيعة والحياة — شعبة رياضيات',
				desc: 'محاكي تفاعلي شامل بمستوى بكالوريا شعبة الرياضيات يغطي المجال الأول (التخصص الوظيفي للبروتينات: تركيب وبنية البروتين، الإنزيمات، المناعة والاتصال العصبي).',
				targetCount: 16,
				timeLimit: 3600
			}
		];

		for (const sim of simConfigs) {
			const ids: number[] = [];
			for (const tid of TRIMESTERS) {
				const hardQs = seededByGradeTrim[sim.grade][tid]
					.filter((q) => q.seedIdx === 4)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of hardQs) {
					if (ids.length < sim.targetCount) ids.push(q.questionId);
				}
			}
			for (const tid of TRIMESTERS) {
				const medQs = seededByGradeTrim[sim.grade][tid]
					.filter((q) => q.seedIdx === 3)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of medQs) {
					if (ids.length < sim.targetCount && !ids.includes(q.questionId)) ids.push(q.questionId);
				}
			}
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade[sim.grade],
				trimesterId: 't3',
				slug: sim.slug,
				title: sim.title,
				description: sim.desc,
				difficulty: 'hard',
				timeLimit: sim.timeLimit ?? 0,
				questionIds: ids
			});
		}

		// 4. Upsert Sciences bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%sciences_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_SCIENCES_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['sciences_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs
		if (manifest) {
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore — علوم طبيعية' AND slug NOT IN (${placeholders})`
				).run(...manifestSlugs);
			}
			for (const item of manifest.items) {
				const ysId = item.grade && ysByGrade[item.grade] ? ysByGrade[item.grade] : Number(item.yearSubjectId);
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
					source: 'المولّد الآلي SujetStore — علوم طبيعية',
					academicYear: '2025/2026',
					originType: 'exclusive',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		// 5b. Upsert 6 Official Sciences BAC Papers (2023–2025 for 3as_se & 3as_math)
		if (officialBacManifest) {
			const officialSlugs = officialBacManifest.items.map((it) => it.slug);
			if (officialSlugs.length > 0) {
				const placeholders = officialSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-sciences' AND slug NOT IN (${placeholders})`
				).run(...officialSlugs);
			}
			for (const item of officialBacManifest.items) {
				const ysId = ysByGrade[item.grade] ?? Number(item.yearSubjectId);
				upsertDocument({
					yearSubjectId: ysId,
					trimesterId: 't3',
					title: item.titleAr,
					titleAr: item.titleAr,
					slug: item.slug,
					type: 'exam',
					content: null,
					pdfUrl: item.pdfUrl,
					solutionUrl: item.solutionUrl,
					fileSize: Number(item.fileSize) || 0,
					source: 'الديوان الوطني للامتحانات والمسابقات (ONEC) — رسمي',
					academicYear: item.academicYear,
					originType: 'official_certificate',
					hasSolution: 1,
					difficulty: 'hard'
				});
				summary.officialBacUpserted++;
			}
		}

		db.exec('COMMIT');

		const totals = {
			publishedSciencesYearSubjects: (
				db
					.query("SELECT COUNT(*) as n FROM year_subjects WHERE subject_id LIKE 'SCI-%' AND visibility = 'published'")
					.get() as { n: number }
			).n,
			publishedSciencesLessons: (
				db
					.query("SELECT COUNT(*) as n FROM documents d JOIN year_subjects ys ON d.year_subject_id = ys.id WHERE ys.subject_id LIKE 'SCI-%' AND d.type = 'lesson' AND d.is_published = 1")
					.get() as { n: number }
			).n,
			sciencesPipelineQuizzes: (
				db
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-sci-t_-quiz-pack-%' OR slug IN ('5ap-sci-t3-competency-simulator', '4am-sci-t3-bem-simulator', '3as-se-sci-bac-simulator', '3as-math-sci-bac-simulator')) AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			sciencesPipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%sciences_pipeline%'")
					.get() as { n: number }
			).n,
			sciencesGeneratedExamsAndTests: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore — علوم طبيعية'")
					.get() as { n: number }
			).n,
			sciencesOfficialBacPapers: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-sciences' AND is_published = 1")
					.get() as { n: number }
			).n
		};

		console.log(JSON.stringify({ status: 'ok', summary, totals }, null, 2));
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
