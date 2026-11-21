import { Database } from 'bun:sqlite';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_ISLAMIC_LESSONS,
	ALL_ISLAMIC_TEMPLATES,
	ALL_ISLAMIC_TRACK_IDS,
	ISLAMIC_GRADE_METADATA,
	getIslamicTemplatesFor,
	type IslamicTrackId
} from '../src/lib/modules/IslamicTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: IslamicTrackId;
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
	academicYear: string;
	topicNumber: 1 | 2;
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

const GRADES: readonly IslamicTrackId[] = ALL_ISLAMIC_TRACK_IDS;
const BAC_TRACKS: readonly IslamicTrackId[] = [
	'3as_se',
	'3as_tm',
	'3as_math',
	'3as_ge',
	'3as_lp',
	'3as_le'
];
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

function getPackCounts(grade: IslamicTrackId): readonly [number, number, number] {
	if (grade.endsWith('ap')) return [8, 8, 12];
	if (grade === '4am' || grade.startsWith('3as_')) return [10, 10, 15];
	return [8, 10, 12];
}

function generatePublicToken(): string {
	return randomBytes(16).toString('base64url');
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
				resolve(process.cwd(), 'pipeline/generated_exams_islamic/generated_islamic_manifest.json'),
				'Generated Islamic exams manifest'
			);
	const officialBacManifest = skipExams
		? null
		: loadManifest<OfficialBacManifest>(
				resolve(process.cwd(), 'pipeline/official_bac_islamic/official_bac_islamic_manifest.json'),
				'Official Islamic BAC manifest'
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
		officialBacUpserted: 0,
		publicTokensBackfilled: 0
	};

	try {
		db.exec('BEGIN');

		// 1. Update ISL-ALL official Secondary subject naming (`العلوم الإسلامية`) & publish all 23 tracks
		db.query(
			`UPDATE subjects
			 SET name = 'Islamic Sciences', name_ar = 'العلوم الإسلامية', name_fr = 'Sciences Islamiques'
			 WHERE id = 'ISL-ALL'`
		).run();

		db.exec(
			"UPDATE education_levels SET visibility = 'published' WHERE id IN ('primaire', 'moyen', 'secondaire')"
		);
		db.exec(
			"UPDATE years SET visibility = 'published' WHERE id IN ('1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am', '1as', '2as', '3as')"
		);
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
		const updateSsStmt = db.query(`
			UPDATE stream_subjects
			SET visibility = 'published', coefficient = ?
			WHERE year_id = ? AND subject_id = ? AND stream_id = ?
		`);

		for (const grade of GRADES) {
			const meta = ISLAMIC_GRADE_METADATA[grade];
			updateYsStmt.run(meta.coefficient, meta.yearSubjectId);
			updateSsStmt.run(meta.coefficient, meta.yearId, meta.subjectId, meta.streamId ?? 'GEN');
		}

		const ysByGrade = Object.fromEntries(
			GRADES.map((g) => [g, ISLAMIC_GRADE_METADATA[g].yearSubjectId])
		) as Record<IslamicTrackId, number>;

		const findDocBySlug = db.query(
			'SELECT id, public_token as publicToken FROM documents WHERE slug = ? LIMIT 1'
		);
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
			const academicYear = params.academicYear ?? '2025/2026';
			const originType = params.originType ?? 'exclusive';
			const existing = findDocBySlug.get(params.slug) as {
				id: number;
				publicToken: string | null;
			} | null;
			const token = existing?.publicToken || generatePublicToken();
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
					academicYear,
					params.hasSolution,
					params.difficulty,
					originType,
					token
				);
			}
		};

		// 2. Upsert all Islamic interactive lessons
		for (const lesson of ALL_ISLAMIC_LESSONS) {
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
					? 'منهاج الجيل الثاني للتربية الإسلامية (الابتدائي) — SujetStore'
					: lesson.grade.includes('as')
						? 'المنهاج الرسمي للعلوم الإسلامية (الثانوي) — SujetStore'
						: 'منهاج الجيل الثاني للتربية الإسلامية (المتوسط) — SujetStore',
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

		const seededByGradeTrim = {} as Record<IslamicTrackId, Record<TrimesterId, SeededQuestionRef[]>>;

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
			const takeFromOrder = (
				candidates: SeededQuestionRef[],
				target: number,
				used: Set<number>
			): number[] => {
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

			const bySeedOrder = [...pool].sort(
				(a, b) => a.seedIdx - b.seedIdx || a.templateIdx - b.templateIdx
			);
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
			const meta = ISLAMIC_GRADE_METADATA[grade];
			const trackLabel = meta.yearName;
			const subjAr = meta.subjectName;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[islamic_pipeline:${grade}:${trimesterId}]`;
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

				const templates = getIslamicTemplatesFor(grade, trimesterId);
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
						label: 'التدريب الأساسي في القرآن والعقيدة',
						desc: `تمارين مبسّطة وواضحة لترسيخ النصوص الشرعية والعقيدة الصحيحة — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'easy' as const,
						ids: pack1Ids
					},
					{
						packNum: 2 as const,
						label: 'تحدي الأحكام الفقهية والمقاصد والأخلاق',
						desc: `تمارين متوسطة لتعميق الفهم الفقهي والاستنباط والأحكام — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'medium' as const,
						ids: pack2Ids
					},
					{
						packNum: 3 as const,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة تحاكي الاختبار الفصلي الرسمي — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'hard' as const,
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade}-isl-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${trackLabel} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National Simulators: 5AP تقييم المكتسبات, 4AM BEM, and all 6 3AS BAC streams
		const simConfigs: Array<{
			grade: IslamicTrackId;
			slug: string;
			title: string;
			desc: string;
			targetCount: number;
			timeLimit?: number;
		}> = [
			{
				grade: '5ap',
				slug: '5ap-isl-t3-competency-simulator',
				title: 'محاكي امتحان تقييم المكتسبات — التربية الإسلامية (5 ابتدائي)',
				desc: 'محاكي تفاعلي شامل لتلاوة السور وفهم النصوص الشرعية وتوظيف الأحكام والعبادات تحضيراً لتقييم المكتسبات.',
				targetCount: 15
			},
			{
				grade: '4am',
				slug: '4am-isl-t3-bem-simulator',
				title: 'محاكي شهادة التعليم المتوسط (BEM) — التربية الإسلامية (معامل 2)',
				desc: 'محاكي تفاعلي شامل يغطي سورة النبأ، أحكام التجويد، الإيمان باليوم الآخر والقدر، الحج والعمرة، والسيرة.',
				targetCount: 18,
				timeLimit: 1800
			},
			...BAC_TRACKS.map((g) => {
				const stName = ISLAMIC_GRADE_METADATA[g].streamNameAr || g;
				return {
					grade: g,
					slug: `${g.replace('_', '-')}-isl-bac-simulator`,
					title: `محاكي بكالوريا العلوم الإسلامية — شعبة ${stName} (معامل 2)`,
					desc: `محاكي تفاعلي شامل يغطي الوحدات الـ 19 الرسمية في بكالوريا العلوم الإسلامية (العقيدة، المقاصد، مصادر التشريع، الربا، الميراث، والوقف).`,
					targetCount: 20,
					timeLimit: 2400
				};
			})
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

		// 4. Upsert Islamic bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%islamic_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_ISLAMIC_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['islamic_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs
		if (manifest) {
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore — تربية وعلوم إسلامية' AND slug NOT IN (${placeholders})`
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
					source: 'المولّد الآلي SujetStore — تربية وعلوم إسلامية',
					academicYear: '2025/2026',
					originType: 'exclusive',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		// 5b. Upsert 6 Unified Official BAC Islamic Sciences Papers (2023–2025) linked to ALL 6 3AS BAC streams
		if (officialBacManifest) {
			const expectedSlugs: string[] = [];
			for (const track of BAC_TRACKS) {
				const trackMeta = ISLAMIC_GRADE_METADATA[track];
				const trackSlugPart = track.replace('_', '-');
				for (const item of officialBacManifest.items) {
					const docSlug = `${item.slug}-${trackSlugPart}`;
					expectedSlugs.push(docSlug);
					upsertDocument({
						yearSubjectId: trackMeta.yearSubjectId,
						trimesterId: 't3',
						title: `${item.titleAr} — ${trackMeta.streamNameAr}`,
						titleAr: `${item.titleAr} — جميع الشعب (${trackMeta.streamNameAr})`,
						slug: docSlug,
						type: 'exam',
						content: null,
						pdfUrl: item.pdfUrl,
						solutionUrl: item.solutionUrl,
						fileSize: Number(item.fileSize) || 0,
						source: 'أرشيف بكالوريا العلوم الإسلامية — منصة SujetStore',
						academicYear: item.academicYear,
						originType: 'official_certificate',
						hasSolution: 1,
						difficulty: 'hard'
					});
					summary.officialBacUpserted++;
				}
			}

			if (expectedSlugs.length > 0) {
				const placeholders = expectedSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-islamic-%' AND slug NOT IN (${placeholders})`
				).run(...expectedSlugs);
			}
		}

		// 6. Safety pass: ensure zero NULL public_token on any published document
		const missingTokens = db
			.query("SELECT id FROM documents WHERE public_token IS NULL OR trim(public_token) = ''")
			.all() as Array<{ id: number }>;
		const patchTokenStmt = db.query('UPDATE documents SET public_token = ? WHERE id = ?');
		for (const row of missingTokens) {
			patchTokenStmt.run(generatePublicToken(), row.id);
			summary.publicTokensBackfilled++;
		}

		db.exec('COMMIT');

		const totals = {
			publishedIslamicYearSubjects: (
				db
					.query(
						"SELECT COUNT(*) as n FROM year_subjects WHERE subject_id LIKE 'ISL-%' AND visibility = 'published'"
					)
					.get() as { n: number }
			).n,
			publishedIslamicLessons: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents d JOIN year_subjects ys ON d.year_subject_id = ys.id WHERE ys.subject_id LIKE 'ISL-%' AND d.type = 'lesson' AND d.is_published = 1"
					)
					.get() as { n: number }
			).n,
			islamicPipelineQuizzes: (
				db
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-isl-t_-quiz-pack-%' OR slug LIKE '%-isl-%simulator') AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			islamicPipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%islamic_pipeline%'")
					.get() as { n: number }
			).n,
			islamicGeneratedExamsAndTests: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore — تربية وعلوم إسلامية'"
					)
					.get() as { n: number }
			).n,
			islamicOfficialBacDocs: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-islamic-%' AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			missingPublicTokensTotal: (
				db
					.query("SELECT COUNT(*) as n FROM documents WHERE public_token IS NULL OR trim(public_token) = ''")
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
