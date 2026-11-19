import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';
import { checkRateLimit } from '#lib/server/rate-limit';
import { compileTypstPdf } from '#lib/server/typst';
import {
	assembleExam,
	assemblePhysicsExam,
	assembleSciencesExam,
	compileAssembledExamPdf,
	yearSubjectToGrade,
	yearSubjectToPhysicsTrack,
	yearSubjectToSciencesTrack,
	type AssembleExamOptions,
	type AssemblePhysicsExamOptions,
	type AssembleSciencesExamOptions
} from '#lib/server/exam-assembler';
import { gradeQuizSubmission } from '#lib/server/quiz-grading';
import { awardQuizGamification } from '#lib/server/gamification';
import { getOrCreateFingerprint } from '#lib/server/auth';
import { randomUUID } from 'crypto';
import { resolve } from 'path';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user) {
		return json({ error: 'يرجى تسجيل الدخول لاستخدام المولّد الذكي' }, { status: 401 });
	}

	const rl = checkRateLimit(`generator:${event.locals.user.id}`, 15, 10 * 60 * 1000);
	if (!rl.allowed) {
		return json({ error: 'تجاوزت الحد المسموح من التوليد. يرجى المحاولة بعد قليل.' }, { status: 429 });
	}

	const body = await event.request.json();
	const mode = body.mode;

	if (mode === 'grade') {
		const answersMap: Record<string | number, any> =
			body.answers && typeof body.answers === 'object' ? body.answers : {};
		const qIds = Object.keys(answersMap)
			.map(Number)
			.filter((n) => Number.isInteger(n) && n > 0);
		if (qIds.length === 0) {
			return json({ error: 'لم يتم إرسال إجابات' }, { status: 400 });
		}
		const ph = qIds.map(() => '?').join(',');
		const rawQuestions = contentSqlite
			.query(`SELECT id, type, question_data as questionData, explanation FROM questions WHERE id IN (${ph})`)
			.all(...qIds) as any[];
		const graded = gradeQuizSubmission(
			rawQuestions.map((rq) => ({
				id: rq.id,
				questionId: rq.id,
				type: rq.type,
				points: 1,
				questionData: rq.questionData,
				explanation: rq.explanation
			})),
			answersMap
		);
		const fingerprint = getOrCreateFingerprint(event);
		const gamification = awardQuizGamification({
			userId: event.locals.user.id,
			fingerprint,
			quizId: 0,
			percentage: graded.percentage,
			timeTaken: Math.max(0, Number(body.timeTaken || 0)),
			gradedDetails: graded.gradedDetails.map((d) => ({
				questionId: d.result.questionId,
				type: d.result.type,
				isCorrect: d.result.correct
			}))
		});

		return json({
			success: true,
			score: graded.score,
			totalPoints: graded.totalPoints,
			percentage: graded.percentage,
			xpEarned: gamification.xpEarned,
			newBadges: gamification.newBadges,
			streakDays: gamification.streakDays,
			gradedDetails: graded.gradedDetails.map((d) => d.result)
		});
	}

	const yearSubjectId = Number(body.yearSubjectId);
	if (!yearSubjectId) {
		return json({ error: 'يرجى تحديد السنة والمادة' }, { status: 400 });
	}

	const ys = contentSqlite
		.query(
			`
		SELECT ys.id, ys.year_id, ys.subject_id, ys.stream_id, ys.coefficient,
			st.name_ar as stream_name,
			y.name_ar as year_name, el.id as level_id, el.name_ar as level_name,
			s.name_ar as subject_name
		FROM year_subjects ys
		JOIN years y ON ys.year_id = y.id
		JOIN education_levels el ON y.level_id = el.id
		JOIN subjects s ON ys.subject_id = s.id
		LEFT JOIN streams st ON ys.stream_id = st.id
		WHERE ys.id = ?
			AND el.visibility = 'published'
			AND y.visibility = 'published'
			AND ys.visibility = 'published'
		LIMIT 1
	`
		)
		.get(yearSubjectId) as any;

	if (!ys) {
		return json({ error: 'المادة غير متاحة حالياً' }, { status: 404 });
	}

	if (mode === 'quiz') {
		const count = Math.min(20, Math.max(1, Number(body.count || 5)));
		const diff = ['easy', 'medium', 'hard'].includes(body.difficulty) ? body.difficulty : null;

		const diffFilter = diff ? 'AND q.difficulty = ?' : '';
		const exactParams: any[] = diff ? [ys.id, diff, count] : [ys.id, count];

		// 1. Pick strictly from question categories linked to this exact year_subject_id (ys.id)
		let rows = contentSqlite
			.query(
				`
			SELECT DISTINCT q.id, q.type, q.difficulty, q.question_text as questionText,
				q.question_text_ar as questionTextAr, q.image_url as imageUrl,
				q.image_caption as imageCaption, q.question_data as questionData, q.explanation
			FROM questions q
			JOIN question_categories qc ON q.category_id = qc.id
			WHERE qc.year_subject_id = ? ${diffFilter}
			ORDER BY RANDOM()
			LIMIT ?
		`
			)
			.all(...exactParams) as any[];

		// 2. Fallback to questions attached to quizzes of this exact year_subject_id (ys.id)
		if (rows.length === 0) {
			const exactQuizParams: any[] = diff ? [ys.id, diff, count] : [ys.id, count];
			rows = contentSqlite
				.query(
					`
				SELECT DISTINCT q.id, q.type, q.difficulty, q.question_text as questionText,
					q.question_text_ar as questionTextAr, q.image_url as imageUrl,
					q.image_caption as imageCaption, q.question_data as questionData, q.explanation
				FROM questions q
				JOIN quiz_questions qq ON qq.question_id = q.id
				JOIN quizzes qz ON qq.quiz_id = qz.id
				WHERE qz.year_subject_id = ? ${diffFilter}
				ORDER BY RANDOM()
				LIMIT ?
			`
				)
				.all(...exactQuizParams) as any[];
		}

		// 3. Fallback across matching (ys2.year_id, ys2.subject_id, ys2.stream_id) if ys.id returned 0
		if (rows.length === 0) {
			const streamClause = ys.stream_id
				? 'AND ys2.stream_id = ?'
				: 'AND (ys2.stream_id IS NULL OR ys2.stream_id = "")';
			const fallbackParams: any[] = diff
				? (ys.stream_id
						? [ys.year_id, ys.subject_id, ys.stream_id, diff, count]
						: [ys.year_id, ys.subject_id, diff, count])
				: (ys.stream_id
						? [ys.year_id, ys.subject_id, ys.stream_id, count]
						: [ys.year_id, ys.subject_id, count]);

			rows = contentSqlite
				.query(
					`
				SELECT DISTINCT q.id, q.type, q.difficulty, q.question_text as questionText,
					q.question_text_ar as questionTextAr, q.image_url as imageUrl,
					q.image_caption as imageCaption, q.question_data as questionData, q.explanation
				FROM questions q
				JOIN question_categories qc ON q.category_id = qc.id
				JOIN year_subjects ys2 ON qc.year_subject_id = ys2.id
				WHERE ys2.year_id = ? AND ys2.subject_id = ? ${streamClause} ${diffFilter}
				ORDER BY RANDOM()
				LIMIT ?
			`
				)
				.all(...fallbackParams) as any[];

			if (rows.length === 0) {
				rows = contentSqlite
					.query(
						`
					SELECT DISTINCT q.id, q.type, q.difficulty, q.question_text as questionText,
						q.question_text_ar as questionTextAr, q.image_url as imageUrl,
						q.image_caption as imageCaption, q.question_data as questionData, q.explanation
					FROM questions q
					JOIN quiz_questions qq ON qq.question_id = q.id
					JOIN quizzes qz ON qq.quiz_id = qz.id
					JOIN year_subjects ys2 ON qz.year_subject_id = ys2.id
					WHERE ys2.year_id = ? AND ys2.subject_id = ? ${streamClause} ${diffFilter}
					ORDER BY RANDOM()
					LIMIT ?
				`
					)
					.all(...fallbackParams) as any[];
			}
		}

		if (rows.length === 0) {
			return json({ error: 'لا توجد أسئلة كافية في بنك هذه المادة بعد' }, { status: 404 });
		}

		const questions = rows.map((q, idx) => {
			let qd = q.questionData;
			if (typeof qd === 'string') {
				try {
					qd = JSON.parse(qd);
				} catch {
					qd = {};
				}
			}
			return {
				...q,
				questionId: q.id,
				points: 1,
				order: idx + 1,
				questionData: qd
			};
		});

		const hasStream = Boolean(ys.stream_name && ys.stream_id && ys.stream_id !== 'GEN');
		const streamPart = hasStream ? ` — ${ys.stream_name}` : '';

		return json({
			quiz: {
				id: 0,
				title: hasStream
					? `تمرين مخصّص — ${ys.stream_name} (${ys.subject_name})`
					: `تمرين مخصّص — ${ys.subject_name}`,
				titleAr: `تمرين ذكي مخصّص — ${ys.year_name}${streamPart} (${ys.subject_name})`,
				description: `تم توليده تلقائياً من ${questions.length} أسئلة`,
				timeLimit: 0,
				passingScore: 60,
				shuffleOptions: false,
				practiceMode: true,
				showAnswers: true
			},
			questions
		});
	}

	if (mode === 'pdf') {
		const mathGrade = yearSubjectToGrade(ys.year_id, ys.subject_id, ys.stream_id);
		const physicsTrack =
			mathGrade === null ? yearSubjectToPhysicsTrack(ys.year_id, ys.subject_id, ys.stream_id) : null;
		const sciencesTrack =
			mathGrade === null && physicsTrack === null
				? yearSubjectToSciencesTrack(ys.year_id, ys.subject_id, ys.stream_id)
				: null;
		if (mathGrade !== null || physicsTrack !== null || sciencesTrack !== null) {
			const trimesterId = (['t1', 't2', 't3'].includes(body.trimesterId)
				? body.trimesterId
				: 't1') as 't1' | 't2' | 't3';
			const docType = body.docType === 'test' ? 'test' : 'exam';
			const difficulty = (['easy', 'medium', 'hard'].includes(body.difficulty)
				? body.difficulty
				: 'medium') as 'easy' | 'medium' | 'hard';
			const variant = (
				[
					'trimester_exam',
					'supervised_test',
					'cinq_mock',
					'competency_eval',
					'bem_mock',
					'bac_mock'
				].includes(body.variant)
					? body.variant
					: undefined
			) as AssembleExamOptions['variant'];
			const rawSeed = typeof body.seed === 'boolean' ? NaN : Number(body.seed);
			const seed =
				Number.isInteger(rawSeed) && rawSeed > 0
					? rawSeed
					: Math.floor(Math.random() * 90000) + 10000;

			const paper =
				mathGrade !== null
					? assembleExam({
							grade: mathGrade,
							trimesterId,
							seed,
							docType,
							variant,
							difficulty
						})
					: physicsTrack !== null
						? assemblePhysicsExam({
								grade: physicsTrack,
								trimesterId,
								seed,
								docType,
								variant: (['trimester_exam', 'supervised_test', 'bem_mock', 'bac_mock'].includes(
									variant || ''
								)
									? variant
									: undefined) as AssemblePhysicsExamOptions['variant'],
								difficulty
							})
						: assembleSciencesExam({
								grade: sciencesTrack!,
								trimesterId,
								seed,
								docType,
								variant: ([
									'trimester_exam',
									'supervised_test',
									'competency_eval',
									'bem_mock',
									'bac_mock'
								].includes(variant || '')
									? variant
									: undefined) as AssembleSciencesExamOptions['variant'],
								difficulty
							});

			const fileId = `gen-${randomUUID().slice(0, 12)}`;
			const subjectOutPath = resolve('data/uploads/sujet', `${fileId}.pdf`);
			const solutionOutPath = resolve('data/uploads/sujet', `${fileId}-sol.pdf`);

			const { subjectResult, solutionResult } = await compileAssembledExamPdf(paper, {
				subjectOutPath,
				solutionOutPath
			});

			if (!subjectResult.success) {
				return json({ error: `تعذر توليد ملف PDF: ${subjectResult.error}` }, { status: 500 });
			}

			const docLabel =
				paper.variant === 'bac_mock' || variant === 'bac_mock'
					? 'بكالوريا تجريبية'
					: paper.docType === 'test'
						? paper.grade.endsWith('ap')
							? 'تقويم مرحلي'
							: 'فرض محروس'
						: 'اختبار';

			const hasStream = Boolean(ys.stream_name && ys.stream_id && ys.stream_id !== 'GEN');
			const streamPart = hasStream ? ` — ${ys.stream_name}` : '';

			return json({
				success: true,
				title: `${docLabel} مقترح — ${ys.year_name}${streamPart} (${ys.subject_name}) [البذرة #${seed}]`,
				seed,
				totalPoints: paper.totalPoints,
				pdfUrl: `/uploads/sujet/${fileId}.pdf`,
				solutionUrl: solutionResult.success
					? `/uploads/sujet/${fileId}-sol.pdf`
					: `/uploads/sujet/${fileId}.pdf`
			});
		}

		const trimesterId = ['t1', 't2', 't3'].includes(body.trimesterId) ? body.trimesterId : 't1';
		const docType = body.docType === 'test' ? 'test' : 'exam';
		const exerciseCount = Math.min(4, Math.max(1, Number(body.exerciseCount || 2)));

		let exRows = contentSqlite
			.query(
				`
			SELECT be.*
			FROM bank_exercises be
			JOIN year_subjects ys2 ON be.year_subject_id = ys2.id
			WHERE ys2.year_id = ? AND ys2.subject_id = ? AND be.trimester_id = ?
			ORDER BY RANDOM()
			LIMIT ?
		`
			)
			.all(ys.year_id, ys.subject_id, trimesterId, exerciseCount) as any[];

		if (exRows.length < exerciseCount) {
			const remaining = exerciseCount - exRows.length;
			const excludeIds = exRows.map((r) => r.id);
			const notIn = excludeIds.length > 0 ? `AND be.id NOT IN (${excludeIds.map(() => '?').join(',')})` : '';
			const extra = contentSqlite
				.query(
					`
				SELECT be.*
				FROM bank_exercises be
				JOIN year_subjects ys2 ON be.year_subject_id = ys2.id
				WHERE ys2.year_id = ? AND ys2.subject_id = ? ${notIn}
				ORDER BY RANDOM()
				LIMIT ?
			`
				)
				.all(ys.year_id, ys.subject_id, ...excludeIds, remaining) as any[];
			exRows = [...exRows, ...extra];
		}

		if (exRows.length === 0) {
			return json({ error: 'لا توجد تمارين مسجلة في بنك التمارين لهذه المادة بعد' }, { status: 404 });
		}

		const trimRow = contentSqlite
			.query('SELECT name_ar FROM trimesters WHERE id = ?')
			.get(trimesterId) as { name_ar: string } | null;

		const examDoc = {
			metadata: {
				levelId: ys.level_id,
				yearId: ys.year_id,
				yearName: ys.year_name,
				streamId: ys.stream_id,
				streamName: ys.stream_name,
				subjectId: ys.subject_id,
				subjectName: ys.subject_name,
				trimesterId,
				trimesterName: trimRow?.name_ar || 'الفصل الأول',
				docType,
				academicYear: '2025 / 2026',
				duration: docType === 'test' ? 'ساعة واحدة' : 'ساعتان',
				siteUrl: 'SujetStore.com'
			},
			exercises: exRows.map((row, idx) => {
				let blocks: any[] = [];
				try {
					blocks = typeof row.content === 'string' ? JSON.parse(row.content) : row.content || [];
				} catch {
					blocks = [];
				}
				return {
					num: `التمرين ${idx + 1}`,
					points: row.points || 4,
					instruction: row.title || 'أجب عن التعليمات التالية:',
					content: Array.isArray(blocks) ? blocks : []
				};
			})
		};

		const fileId = `gen-${randomUUID().slice(0, 12)}`;
		const subjectOut = resolve('data/uploads/sujet', `${fileId}.pdf`);
		const solOut = resolve('data/uploads/sujet', `${fileId}-sol.pdf`);
		const templateId =
			ys.level_id === 'secondaire' ? 'secondary/exam' : ys.level_id === 'primaire' ? 'primary/taqweem' : 'middle/exam';

		const [subjRes, solRes] = await Promise.all([
			compileTypstPdf({ examDoc, outputPath: subjectOut, templateId, isSolution: false }),
			compileTypstPdf({ examDoc, outputPath: solOut, templateId, isSolution: true })
		]);

		if (!subjRes.success) {
			return json({ error: `تعذر توليد ملف PDF: ${subjRes.error}` }, { status: 500 });
		}

		const hasStream = Boolean(ys.stream_name && ys.stream_id && ys.stream_id !== 'GEN');
		const streamPart = hasStream ? ` — ${ys.stream_name}` : '';

		return json({
			success: true,
			title: `${docType === 'test' ? 'فرض' : 'اختبار'} مقترح — ${ys.year_name}${streamPart} (${ys.subject_name})`,
			pdfUrl: `/uploads/sujet/${fileId}.pdf`,
			solutionUrl: solRes.success ? `/uploads/sujet/${fileId}-sol.pdf` : `/uploads/sujet/${fileId}.pdf`
		});
	}

	return json({ error: 'وضع غير مدعوم' }, { status: 400 });
};
