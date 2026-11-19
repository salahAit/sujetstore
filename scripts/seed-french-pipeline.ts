import { Database } from 'bun:sqlite';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_FRENCH_LESSONS,
	ALL_FRENCH_TEMPLATES,
	ALL_FRENCH_TRACK_IDS,
	FRENCH_GRADE_METADATA,
	getFrenchTemplatesFor,
	type FrenchTrackId
} from '../src/lib/modules/FrenchTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: FrenchTrackId;
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
	grade: '3as_se' | '3as_tm' | '3as_math' | '3as_ge' | '3as_lp' | '3as_le';
	yearSubjectId: number;
	streamId: 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
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

const GRADES: readonly FrenchTrackId[] = ALL_FRENCH_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[7001, 'easy'],
	[7002, 'easy'],
	[7003, 'medium'],
	[7004, 'medium'],
	[7005, 'hard']
];

function getPackCounts(grade: FrenchTrackId): readonly [number, number, number] {
	if (grade === '3ap' || grade === '4ap') return [8, 8, 12];
	if (grade === '5ap') return [8, 10, 12];
	if (grade === '4am' || grade.startsWith('3as_')) return [10, 10, 15];
	return [8, 8, 12];
}

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
				resolve(process.cwd(), 'pipeline/generated_exams_french/generated_french_manifest.json'),
				'Generated French exams manifest'
			);
	const officialBacManifest = skipExams
		? null
		: loadManifest<OfficialBacManifest>(
				resolve(process.cwd(), 'pipeline/official_bac_french/official_bac_french_manifest.json'),
				'BAC French manifest'
			);

	const db = new Database(dbPath);
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		dbPath,
		skipExams,
		tracksSeeded: GRADES.length,
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

		// 1. Keep 1AP (582) and 2AP (587) French HIDDEN per official Algerian curriculum (French starts in 3AP)
		db.exec("UPDATE year_subjects SET visibility = 'hidden' WHERE id IN (582, 587) AND subject_id = 'FRE-B'");
		db.exec("UPDATE stream_subjects SET visibility = 'hidden' WHERE year_id IN ('1ap', '2ap') AND subject_id = 'FRE-B'");

		// 1b. Publish visibility & official Algerian coefficients for ALL 21 French tracks
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id IN ('primaire', 'moyen', 'secondaire')");
		db.exec("UPDATE years SET visibility = 'published' WHERE id IN ('3ap', '4ap', '5ap', '1am', '2am', '3am', '4am', '1as', '2as', '3as')");
		db.exec(`
			UPDATE level_streams SET visibility = 'published'
			WHERE (year_id = '1as' AND stream_id IN ('TCST', 'TCL'))
			   OR (year_id IN ('2as', '3as') AND stream_id IN ('SE', 'TM', 'MATH', 'GE', 'LP', 'LE'))
		`);

		const updateYsStmt = db.query(`
			UPDATE year_subjects
			SET visibility = 'published', coefficient = ?
			WHERE id = ?
		`);
		const findSsStmt = db.query(`
			SELECT id FROM stream_subjects
			WHERE year_id = ? AND subject_id = ? AND stream_id = ? LIMIT 1
		`);
		const updateSsStmt = db.query(`
			UPDATE stream_subjects
			SET visibility = 'published', coefficient = ?
			WHERE year_id = ? AND subject_id = ? AND stream_id = ?
		`);
		const insertSsStmt = db.query(`
			INSERT INTO stream_subjects (stream_id, subject_id, year_id, coefficient, "order", visibility)
			VALUES (?, ?, ?, ?, 6, 'published')
		`);

		for (const grade of GRADES) {
			const meta = FRENCH_GRADE_METADATA[grade];
			const streamKey = meta.streamId ?? 'GEN';
			updateYsStmt.run(meta.coefficient, meta.yearSubjectId);
			const existingSs = findSsStmt.get(meta.yearId, meta.subjectId, streamKey) as { id: number } | null;
			if (existingSs) {
				updateSsStmt.run(meta.coefficient, meta.yearId, meta.subjectId, streamKey);
			} else {
				insertSsStmt.run(streamKey, meta.subjectId, meta.yearId, meta.coefficient);
			}
		}

		const ysByGrade = Object.fromEntries(
			GRADES.map((g) => [g, FRENCH_GRADE_METADATA[g].yearSubjectId])
		) as Record<FrenchTrackId, number>;

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

		// 2. Upsert all French interactive lessons
		for (const lesson of ALL_FRENCH_LESSONS) {
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
					? 'منهاج اللغة الفرنسية للطور الابتدائي — SujetStore'
					: lesson.grade.includes('as')
						? 'منهاج اللغة الفرنسية للتعليم الثانوي — SujetStore'
						: 'منهاج الجيل الثاني للغة الفرنسية (المتوسط) — SujetStore',
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

		const seededByGradeTrim = {} as Record<FrenchTrackId, Record<TrimesterId, SeededQuestionRef[]>>;

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
			const meta = FRENCH_GRADE_METADATA[grade];
			const trackLabel = meta.yearNameAr;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[french_pipeline:${grade}:${trimesterId}]`;
				const catName = `بنك تمارين اللغة الفرنسية التوليدية — ${trackLabel} (${trimesterAr}) ${marker}`;
				const catDesc = `بنك الأسئلة التوليدية لمنهاج اللغة الفرنسية — ${trackLabel} (${trimesterAr})`;

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

				const templates = getFrenchTemplatesFor(grade, trimesterId);
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

				const [pack1Ids, pack2Ids, pack3Ids] = selectPackIds(poolRefs, getPackCounts(grade));
				const packDefs = [
					{
						packNum: 1 as const,
						label: 'التدريب الأساسي في المفردات والقواعد',
						desc: `تمارين سهلة وواضحة لترسيخ المفردات وقواعد اللغة الفرنسية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'easy' as const,
						ids: pack1Ids
					},
					{
						packNum: 2 as const,
						label: 'تحدي الفهم والتصريف والإملاء',
						desc: `تمارين متوسطة لتعميق الفهم والنحو والتصريف في اللغة الفرنسية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'medium' as const,
						ids: pack2Ids
					},
					{
						packNum: 3 as const,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة تحاكي الاختبار الفصلي في اللغة الفرنسية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'hard' as const,
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade}-fre-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${trackLabel} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National Simulators: 5AP تقييم المكتسبات, 4AM BEM, 6 3AS BAC streams
		const simConfigs: Array<{
			grade: FrenchTrackId;
			slug: string;
			title: string;
			desc: string;
			targetCount: number;
			timeLimit?: number;
		}> = [
			{
				grade: '5ap',
				slug: '5ap-fre-t3-competency-simulator',
				title: 'محاكي امتحان تقييم المكتسبات — اللغة الفرنسية (5 ابتدائي)',
				desc: 'محاكي تفاعلي شامل لفهم المكتوب والقواعد والتصريف والإملاء تحضيراً لامتحان تقييم المكتسبات.',
				targetCount: 15
			},
			{
				grade: '4am',
				slug: '4am-fre-t3-bem-simulator',
				title: 'محاكي شهادة التعليم المتوسط (BEM) — اللغة الفرنسية (معامل 3)',
				desc: 'محاكي تفاعلي شامل للنص الحجاجي، الروابط المنطقية، الخطاب المنقول، الشرط، الصيغة الالتزامية والتراث الجزائري.',
				targetCount: 18,
				timeLimit: 2400
			},
			{
				grade: '3as_se',
				slug: '3as-se-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — علوم تجريبية',
				desc: 'محاكي تفاعلي شامل بمستوى البكالوريا (النص التاريخي، النقاش الفكري، النداء والتقرير الموضوعي).',
				targetCount: 18,
				timeLimit: 2700
			},
			{
				grade: '3as_tm',
				slug: '3as-tm-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — تقني رياضي',
				desc: 'محاكي تفاعلي شامل في اللغة الفرنسية لشعبة التقني الرياضي.',
				targetCount: 18,
				timeLimit: 2700
			},
			{
				grade: '3as_math',
				slug: '3as-math-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — رياضيات',
				desc: 'محاكي تفاعلي شامل في اللغة الفرنسية لشعبة الرياضيات.',
				targetCount: 18,
				timeLimit: 2700
			},
			{
				grade: '3as_ge',
				slug: '3as-ge-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — تسيير واقتصاد',
				desc: 'محاكي تفاعلي شامل في اللغة الفرنسية لشعبة التسيير والاقتصاد.',
				targetCount: 18,
				timeLimit: 2700
			},
			{
				grade: '3as_lp',
				slug: '3as-lp-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — آداب وفلسفة (معامل 3)',
				desc: 'محاكي تفاعلي شامل يغطي النص التاريخي، النقاش الفكري، النداء، والتقرير النقدي.',
				targetCount: 18,
				timeLimit: 2700
			},
			{
				grade: '3as_le',
				slug: '3as-le-fre-bac-simulator',
				title: 'محاكي بكالوريا اللغة الفرنسية — لغات أجنبية (معامل 5)',
				desc: 'محاكي تفاعلي متقدم بمستوى بكالوريا شعبة اللغات الأجنبية يغطي جميع المشاريع والأساليب والتقرير النقدي.',
				targetCount: 20,
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

		// 4. Upsert French bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%french_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_FRENCH_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['french_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs
		if (manifest) {
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore — لغة فرنسية' AND slug NOT IN (${placeholders})`
				).run(...manifestSlugs);
			}
			for (const item of manifest.items) {
				const ysId =
					item.grade && ysByGrade[item.grade] ? ysByGrade[item.grade] : Number(item.yearSubjectId);
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
					source: 'المولّد الآلي SujetStore — لغة فرنسية',
					academicYear: '2025/2026',
					originType: 'exclusive',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		// 5b. Upsert 18 BAC French Practice Archive Papers (2023–2025 across all 6 3AS streams)
		if (officialBacManifest) {
			const officialSlugs = officialBacManifest.items.map((it) => it.slug);
			if (officialSlugs.length > 0) {
				const placeholders = officialSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-french' AND slug NOT IN (${placeholders})`
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
					source: 'نماذج بكالوريا تدريبية — منصة SujetStore',
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
			publishedFrenchYearSubjects: (
				db
					.query("SELECT COUNT(*) as n FROM year_subjects WHERE subject_id LIKE 'FRE-%' AND visibility = 'published'")
					.get() as { n: number }
			).n,
			hiddenPrimaryLowerFrench: (
				db
					.query("SELECT COUNT(*) as n FROM year_subjects WHERE id IN (582, 587) AND visibility = 'hidden'")
					.get() as { n: number }
			).n,
			publishedFrenchLessons: (
				db
					.query("SELECT COUNT(*) as n FROM documents d JOIN year_subjects ys ON d.year_subject_id = ys.id WHERE ys.subject_id LIKE 'FRE-%' AND d.type = 'lesson' AND d.is_published = 1")
					.get() as { n: number }
			).n,
			frenchPipelineQuizzes: (
				db
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-fre-t_-quiz-pack-%' OR slug LIKE '%-fre-%simulator') AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			frenchPipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%french_pipeline%'")
					.get() as { n: number }
			).n,
			frenchGeneratedExamsAndTests: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore — لغة فرنسية'")
					.get() as { n: number }
			).n,
			frenchBacArchivePapers: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-french' AND is_published = 1")
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
