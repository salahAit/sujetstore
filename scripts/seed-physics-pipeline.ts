import { Database } from 'bun:sqlite';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_PHYSICS_LESSONS,
	ALL_PHYSICS_TEMPLATES,
	ALL_PHYSICS_TRACK_IDS,
	PHYSICS_GRADE_METADATA,
	getPhysicsTemplatesFor,
	type PhysicsTrackId
} from '../src/lib/modules/PhysicsTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: PhysicsTrackId;
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
	grade: PhysicsTrackId;
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
}

interface OfficialBacManifest {
	items: OfficialBacManifestItem[];
}

const GRADES: readonly PhysicsTrackId[] = ALL_PHYSICS_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[2001, 'easy'],
	[2002, 'easy'],
	[2003, 'medium'],
	[2004, 'medium'],
	[2005, 'hard']
];

const PACK_COUNTS_BY_GRADE: Record<PhysicsTrackId, readonly [number, number, number]> = {
	'1am': [10, 10, 15],
	'2am': [10, 10, 15],
	'3am': [10, 10, 15],
	'4am': [10, 10, 15],
	'1as_tcst': [12, 12, 18],
	'2as_se': [12, 12, 18],
	'2as_tm': [12, 12, 18],
	'2as_math': [12, 12, 18],
	'3as_se': [12, 12, 18],
	'3as_tm': [12, 12, 18],
	'3as_math': [12, 12, 18]
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
				resolve(process.cwd(), 'pipeline/generated_exams_physics/generated_physics_manifest.json'),
				'Generated Physics exams manifest'
			);
	const officialBacManifest = skipExams
		? null
		: loadManifest<OfficialBacManifest>(
				resolve(process.cwd(), 'pipeline/official_bac_physics/official_bac_physics_manifest.json'),
				'Official Physics BAC manifest'
			);

	const db = new Database(dbPath);
	db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');

	const summary = {
		dbPath,
		skipExams,
		yearSubjectIds: {} as Record<PhysicsTrackId, number>,
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

		// 1. Publish visibility for Physics across Middle (PHY-B: 1am-4am) & Secondary Scientific Streams (PHY-SE, PHY-MTM)
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id IN ('moyen', 'secondaire')");
		db.exec("UPDATE years SET visibility = 'published' WHERE id IN ('1am', '2am', '3am', '4am', '1as', '2as', '3as')");
		db.exec("UPDATE level_streams SET visibility = 'published' WHERE year_id IN ('1am', '2am', '3am', '4am')");
		db.exec(`
			UPDATE stream_subjects SET visibility = 'published'
			WHERE subject_id = 'PHY-B' AND (year_id IS NULL OR year_id IN ('1am', '2am', '3am', '4am'))
		`);
		db.exec(`
			UPDATE year_subjects SET visibility = 'published'
			WHERE subject_id = 'PHY-B' AND year_id IN ('1am', '2am', '3am', '4am')
		`);

		db.exec(`
			UPDATE level_streams SET visibility = 'published'
			WHERE (year_id = '1as' AND stream_id = 'TCST')
			   OR (year_id IN ('2as', '3as') AND stream_id IN ('SE', 'TM', 'MATH'))
		`);
		db.exec(`
			UPDATE stream_subjects SET visibility = 'published',
				coefficient = CASE
					WHEN year_id = '1as' AND stream_id = 'TCST' AND subject_id = 'PHY-SE' THEN 4
					WHEN year_id IN ('2as', '3as') AND stream_id = 'SE' AND subject_id = 'PHY-SE' THEN 5
					WHEN year_id IN ('2as', '3as') AND stream_id = 'TM' AND subject_id = 'PHY-MTM' THEN 5
					WHEN year_id IN ('2as', '3as') AND stream_id = 'MATH' AND subject_id = 'PHY-MTM' THEN 6
					ELSE coefficient
				END
			WHERE (year_id = '1as' AND stream_id = 'TCST' AND subject_id = 'PHY-SE')
			   OR (year_id IN ('2as', '3as') AND (
					(stream_id = 'SE' AND subject_id = 'PHY-SE') OR
					(stream_id IN ('TM', 'MATH') AND subject_id = 'PHY-MTM')
			   ))
		`);
		db.exec(`
			UPDATE year_subjects SET visibility = 'published',
				coefficient = CASE id
					WHEN 655 THEN 4
					WHEN 673 THEN 5
					WHEN 713 THEN 5
					WHEN 693 THEN 6
					WHEN 683 THEN 5
					WHEN 726 THEN 5
					WHEN 703 THEN 6
					ELSE coefficient
				END
			WHERE id IN (655, 673, 713, 693, 683, 726, 703)
		`);

		const ysByGrade = Object.fromEntries(
			GRADES.map((g) => [g, PHYSICS_GRADE_METADATA[g].yearSubjectId])
		) as Record<PhysicsTrackId, number>;
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

		// 2. Upsert all Physics interactive lessons
		for (const lesson of ALL_PHYSICS_LESSONS) {
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
				source: lesson.grade.includes('as')
					? 'المنهاج الرسمي للفيزياء (التعليم الثانوي) — SujetStore'
					: 'منهاج الجيل الثاني للفيزياء — SujetStore',
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

		const seededByGradeTrim = {} as Record<PhysicsTrackId, Record<TrimesterId, SeededQuestionRef[]>>;

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
			const meta = PHYSICS_GRADE_METADATA[grade];
			const trackLabel = meta.yearName;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[physics_pipeline:${grade}:${trimesterId}]`;
				const catName = `بنك تمارين العلوم الفيزيائية التوليدية — ${trackLabel} (${trimesterAr}) ${marker}`;
				const catDesc = `بنك الأسئلة التوليدية لمنهاج العلوم الفيزيائية الرسمي — ${trackLabel} (${trimesterAr})`;

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

				const templates = getPhysicsTemplatesFor(grade, trimesterId);
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
						desc: `حزمة التدريب الأساسي لبناء المفاهيم الفيزيائية والكيميائية والتحضير للفرض — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'easy',
						ids: pack1Ids
					},
					{
						packNum: 2,
						label: 'تحدي الفهم والتطبيق التجريبي',
						desc: `تمارين متوسطة لتعميق الفهم وتحليل المنحنيات والمعادلات — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'medium',
						ids: pack2Ids
					},
					{
						packNum: 3,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة نحو الاختبار الفصلي مع الوضعيات والمسائل التجريبية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'hard',
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade}-phy-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${trackLabel} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National Simulators: 4AM BEM Physics + 3AS BAC Physics (SE, TM, MATH)
		{
			const bemIds: number[] = [];
			for (const tid of TRIMESTERS) {
				const trimHard = seededByGradeTrim['4am'][tid]
					.filter((q) => q.seedIdx === 4)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of trimHard) bemIds.push(q.questionId);
			}
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade['4am'],
				trimesterId: 't3',
				slug: '4am-phy-t3-bem-simulator',
				title: 'محاكي شهادة التعليم المتوسط (BEM) — علوم فيزيائية',
				description: 'محاكي تفاعلي شامل بمستوى شهادة التعليم المتوسط يغطي الكهرباء، الشوارد، الميكانيك والضوء.',
				difficulty: 'hard',
				questionIds: bemIds
			});

			const bacSimConfigs = [
				{
					grade: '3as_se' as const,
					slug: '3as-se-phy-bac-simulator',
					title: 'محاكي بكالوريا العلوم الفيزيائية — شعبة علوم تجريبية',
					desc: 'محاكي تفاعلي شامل من 20 سؤالاً يغطي الوحدات 1 إلى 6 (المتابعة الزمنية، الميكانيك، RC/RL، الـ pH، النووي والأسترة).'
				},
				{
					grade: '3as_tm' as const,
					slug: '3as-tm-phy-bac-simulator',
					title: 'محاكي بكالوريا العلوم الفيزيائية — شعبة تقني رياضي',
					desc: 'محاكي تفاعلي شامل من 20 سؤالاً يغطي الوحدات 1 إلى 7 بما فيها الأعمدة والاهتزازات الميكانيكية والكهربائية RLC.'
				},
				{
					grade: '3as_math' as const,
					slug: '3as-math-phy-bac-simulator',
					title: 'محاكي بكالوريا العلوم الفيزيائية — شعبة رياضيات',
					desc: 'محاكي تفاعلي شامل من 20 سؤالاً بمستوى بكالوريا شعبة الرياضيات (الوحدات 1 إلى 7 والاهتزازات RLC).'
				}
			];

			for (const sim of bacSimConfigs) {
				const bacIds: number[] = [];
				for (const tid of TRIMESTERS) {
					const hardQs = seededByGradeTrim[sim.grade][tid]
						.filter((q) => q.seedIdx === 4)
						.sort((a, b) => a.templateIdx - b.templateIdx);
					for (const q of hardQs) {
						if (bacIds.length < 20) bacIds.push(q.questionId);
					}
					if ((tid === 't2' || tid === 't3') && bacIds.length < 20) {
						const extra = seededByGradeTrim[sim.grade][tid].find(
							(q) => q.seedIdx === 3 && !bacIds.includes(q.questionId)
						);
						if (extra) bacIds.push(extra.questionId);
					}
				}
				upsertAndLinkQuiz({
					yearSubjectId: ysByGrade[sim.grade],
					trimesterId: 't3',
					slug: sim.slug,
					title: sim.title,
					description: sim.desc,
					difficulty: 'hard',
					timeLimit: 5400,
					questionIds: bacIds.slice(0, 20)
				});
			}
		}

		// 4. Upsert Physics bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%physics_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_PHYSICS_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['physics_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs into documents
		if (manifest) {
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore — فيزياء' AND slug NOT IN (${placeholders})`
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
					source: 'المولّد الآلي SujetStore — فيزياء',
					academicYear: '2025/2026',
					originType: 'exclusive',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		// 5b. Upsert 9 Official Physics BAC Papers (2023–2025)
		if (officialBacManifest) {
			const officialSlugs = officialBacManifest.items.map((it) => it.slug);
			if (officialSlugs.length > 0) {
				const placeholders = officialSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-physics' AND slug NOT IN (${placeholders})`
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
			publishedPhysicsYearSubjects: (
				db
					.query("SELECT COUNT(*) as n FROM year_subjects WHERE subject_id LIKE 'PHY-%' AND visibility = 'published'")
					.get() as { n: number }
			).n,
			publishedPhysicsLessons: (
				db
					.query("SELECT COUNT(*) as n FROM documents d JOIN year_subjects ys ON d.year_subject_id = ys.id WHERE ys.subject_id LIKE 'PHY-%' AND d.type = 'lesson' AND d.is_published = 1")
					.get() as { n: number }
			).n,
			physicsPipelineQuizzes: (
				db
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-phy-t_-quiz-pack-%' OR slug IN ('4am-phy-t3-bem-simulator', '3as-se-phy-bac-simulator', '3as-tm-phy-bac-simulator', '3as-math-phy-bac-simulator')) AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			physicsPipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%physics_pipeline%'")
					.get() as { n: number }
			).n,
			physicsGeneratedExamsAndTests: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore — فيزياء'")
					.get() as { n: number }
			).n,
			physicsOfficialBacPapers: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-physics' AND is_published = 1")
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
