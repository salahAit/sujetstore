import { Database } from 'bun:sqlite';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	ALL_OFFICIAL_BAC_ITALIAN_PAPERS,
	type OfficialItalianBacPaperSpec
} from '../src/lib/data/official_bac_italian';
import {
	ALL_ITALIAN_LESSONS,
	ALL_ITALIAN_TEMPLATES,
	ALL_ITALIAN_TRACK_IDS,
	ITALIAN_GRADE_METADATA,
	getItalianTemplatesFor,
	type ItalianTrackId
} from '../src/lib/modules/ItalianTemplates';
import type { TrimesterId } from '../src/lib/modules/SujetBuilder/types';

interface GeneratedManifestItem {
	grade?: ItalianTrackId;
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
	grade: '3as_le';
	yearSubjectId: 795;
	subjectId: 'LAN-ITA';
	streamId: 'LE';
	academicYear: string;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	titleIt: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

interface OfficialBacManifest {
	items: OfficialBacManifestItem[];
}

const GRADES: readonly ItalianTrackId[] = ALL_ITALIAN_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const SEED_DIFFICULTY_PLAN: readonly [number, 'easy' | 'medium' | 'hard'][] = [
	[9401, 'easy'],
	[9402, 'easy'],
	[9403, 'medium'],
	[9404, 'medium'],
	[9405, 'hard']
];

function generatePublicToken(): string {
	return randomBytes(9).toString('base64url');
}

function getPackCounts(): readonly [number, number, number] {
	return [10, 10, 15];
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
				resolve(process.cwd(), 'pipeline/generated_exams_italian/generated_italian_manifest.json'),
				'Generated Italian exams manifest'
			);
	const officialBacManifest = skipExams
		? null
		: loadManifest<OfficialBacManifest>(
				resolve(process.cwd(), 'pipeline/official_bac_italian/official_bac_italian_manifest.json'),
				'Official Italian BAC manifest'
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

		// 1. Publish visibility & official Algerian coefficient (4) for 2AS LE & 3AS LE Italian (`LAN-ITA`)
		db.exec("UPDATE education_levels SET visibility = 'published' WHERE id = 'secondaire'");
		db.exec("UPDATE years SET visibility = 'published' WHERE id IN ('2as', '3as')");
		db.exec(
			"UPDATE level_streams SET visibility = 'published' WHERE year_id IN ('2as', '3as') AND stream_id = 'LE'"
		);

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
			const meta = ITALIAN_GRADE_METADATA[grade];
			updateYsStmt.run(meta.coefficient, meta.yearSubjectId);
			updateSsStmt.run(meta.coefficient, meta.yearId, meta.subjectId, meta.streamId);
		}

		const ysByGrade = Object.fromEntries(
			GRADES.map((g) => [g, ITALIAN_GRADE_METADATA[g].yearSubjectId])
		) as Record<ItalianTrackId, number>;

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

		// 2. Upsert all 24 Italian interactive lessons
		for (const lesson of ALL_ITALIAN_LESSONS) {
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
				source: 'المنهاج الرسمي للغة الإيطالية (لغات أجنبية) — SujetStore',
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

		const seededByGradeTrim = {} as Record<ItalianTrackId, Record<TrimesterId, SeededQuestionRef[]>>;

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
			const pack1Ids = takeFromOrder(
				[...easyCandidates, ...mediumCandidates],
				counts[0],
				usedOverall
			);
			const pack2Ids = takeFromOrder(
				[...mediumCandidates, ...easyCandidates, ...hardCandidates],
				counts[1],
				usedOverall
			);
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
			const meta = ITALIAN_GRADE_METADATA[grade];
			const trackLabel = meta.yearNameAr;
			const subjAr = meta.subjectNameAr;
			seededByGradeTrim[grade] = { t1: [], t2: [], t3: [] };

			for (const trimesterId of TRIMESTERS) {
				const trimesterAr = TRIMESTER_NAMES[trimesterId];
				const marker = `[italian_pipeline:${grade}:${trimesterId}]`;
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

				const templates = getItalianTemplatesFor(grade, trimesterId);
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

				const [pack1Ids, pack2Ids, pack3Ids] = selectPackIds(poolRefs, getPackCounts());
				const packDefs = [
					{
						packNum: 1 as const,
						label: 'التدريب الأساسي في الفهم والمعجم الإيطالي',
						desc: `تمارين مبسّطة وواضحة لترسيخ الفهم القرائي والمفردات الأساسية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'easy' as const,
						ids: pack1Ids
					},
					{
						packNum: 2 as const,
						label: 'تحدي القواعد والأفعال (Congiuntivo / Ipotetico / Passiva)',
						desc: `تمارين متوسطة لتعميق الكفاءة اللغوية وتركيب الجمل في الإيطالية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'medium' as const,
						ids: pack2Ids
					},
					{
						packNum: 3 as const,
						label: 'المراجعة الشاملة للاختبار الفصلي',
						desc: `مراجعة شاملة متدرجة تحاكي الاختبار الفصلي الرسمي للغة الإيطالية — ${trackLabel} (${trimesterAr}).`,
						difficulty: 'hard' as const,
						ids: pack3Ids
					}
				];

				for (const pd of packDefs) {
					upsertAndLinkQuiz({
						yearSubjectId,
						trimesterId,
						slug: `${grade.replace('_', '-')}-ita-${trimesterId}-quiz-pack-${pd.packNum}`,
						title: `${pd.label} — ${trackLabel} (${trimesterAr})`,
						description: pd.desc,
						difficulty: pd.difficulty,
						questionIds: pd.ids
					});
				}
			}
		}

		// 3b. National BAC Simulator for 3AS LE Italian (Coefficient 4)
		{
			const ids: number[] = [];
			const targetCount = 18;
			for (const tid of TRIMESTERS) {
				const hardQs = seededByGradeTrim['3as_le'][tid]
					.filter((q) => q.seedIdx === 4)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of hardQs) {
					if (ids.length < targetCount) ids.push(q.questionId);
				}
			}
			for (const tid of TRIMESTERS) {
				const medQs = seededByGradeTrim['3as_le'][tid]
					.filter((q) => q.seedIdx === 3)
					.sort((a, b) => a.templateIdx - b.templateIdx);
				for (const q of medQs) {
					if (ids.length < targetCount && !ids.includes(q.questionId)) ids.push(q.questionId);
				}
			}
			upsertAndLinkQuiz({
				yearSubjectId: ysByGrade['3as_le'],
				trimesterId: 't3',
				slug: '3as-le-ita-bac-simulator',
				title: 'محاكي بكالوريا اللغة الإيطالية — شعبة لغات أجنبية (معامل 4)',
				description:
					'محاكي تفاعلي شامل لبكالوريا اللغة الإيطالية يغطي المحاور الرسمية (الأسرة والتعليم، التغذية الصحية، التراث المتوسطي، الإعلام والبيئة، وعالم الشغل).',
				difficulty: 'hard',
				timeLimit: 2400,
				questionIds: ids
			});
		}

		// 4. Upsert Italian bank_exercises
		db.exec("DELETE FROM bank_exercises WHERE tags LIKE '%italian_pipeline%'");
		const insertBankExerciseStmt = db.query(`
			INSERT INTO bank_exercises (
				year_subject_id, trimester_id, unit, title, content, points, tags, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
		`);

		for (const tpl of ALL_ITALIAN_TEMPLATES) {
			const inst = tpl.generate(1, 'medium');
			insertBankExerciseStmt.run(
				ysByGrade[tpl.grade],
				tpl.trimesterId,
				inst.domain,
				inst.sujetExercise.instruction || tpl.titleAr,
				JSON.stringify(inst.sujetExercise.content),
				Math.round(tpl.defaultPoints),
				JSON.stringify(['italian_pipeline', tpl.grade, tpl.trimesterId, tpl.domain, tpl.id])
			);
			summary.bankExercisesInserted++;
		}

		// 5. Upsert Generated Sample Exam/Test PDFs
		if (manifest) {
			const manifestSlugs = manifest.items.map((it) => it.slug);
			if (manifestSlugs.length > 0) {
				const placeholders = manifestSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE source = 'المولّد الآلي SujetStore — اللغة الإيطالية' AND slug NOT IN (${placeholders})`
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
					source: 'المولّد الآلي SujetStore — اللغة الإيطالية',
					academicYear: '2025/2026',
					originType: 'exclusive',
					hasSolution: 1,
					difficulty: item.difficulty ?? 'medium'
				});
				summary.examsUpserted++;
			}
		}

		// 5b. Upsert 6 Official BAC Italian papers (2023–2025 x Traccia 1 & Traccia 2) with JSON content
		if (officialBacManifest) {
			const manifestBySlug = new Map(officialBacManifest.items.map((it) => [it.slug, it]));
			const expectedSlugs: string[] = [];

			for (const spec of ALL_OFFICIAL_BAC_ITALIAN_PAPERS as readonly OfficialItalianBacPaperSpec[]) {
				const mItem = manifestBySlug.get(spec.slug);
				if (!mItem) {
					throw new Error(`Official Italian BAC manifest missing "${spec.slug}"`);
				}
				expectedSlugs.push(spec.slug);
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
					source: 'أرشيف بكالوريا اللغة الإيطالية — منصة SujetStore',
					academicYear: spec.academicYear,
					originType: 'official_certificate',
					hasSolution: 1,
					difficulty: 'hard'
				});
				summary.officialBacUpserted++;
			}

			if (expectedSlugs.length > 0) {
				const placeholders = expectedSlugs.map(() => '?').join(', ');
				db.query(
					`DELETE FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-italian-%' AND slug NOT IN (${placeholders})`
				).run(...expectedSlugs);
			}
		}

		// 6. Safety pass: zero NULL public_token
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
			publishedItalianYearSubjects: (
				db
					.query(
						"SELECT COUNT(*) as n FROM year_subjects WHERE subject_id = 'LAN-ITA' AND visibility = 'published'"
					)
					.get() as { n: number }
			).n,
			publishedItalianLessons: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents d JOIN year_subjects ys ON d.year_subject_id = ys.id WHERE ys.subject_id = 'LAN-ITA' AND d.type = 'lesson' AND d.is_published = 1"
					)
					.get() as { n: number }
			).n,
			italianPipelineQuizzes: (
				db
					.query(
						"SELECT COUNT(*) as n FROM quizzes WHERE (slug LIKE '%-ita-t_-quiz-pack-%' OR slug LIKE '%-ita-%simulator') AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			italianPipelineBankExercises: (
				db
					.query("SELECT COUNT(*) as n FROM bank_exercises WHERE tags LIKE '%italian_pipeline%'")
					.get() as { n: number }
			).n,
			italianGeneratedExamsAndTests: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE source = 'المولّد الآلي SujetStore — اللغة الإيطالية'"
					)
					.get() as { n: number }
			).n,
			italianOfficialBacDocs: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-italian-%' AND is_published = 1"
					)
					.get() as { n: number }
			).n,
			italianOfficialBacWithJsonContent: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-italian-%' AND content LIKE '{\"metadata\":%'"
					)
					.get() as { n: number }
			).n,
			missingPublicTokensTotal: (
				db
					.query(
						"SELECT COUNT(*) as n FROM documents WHERE public_token IS NULL OR trim(public_token) = ''"
					)
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
