import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite, usersDatabase } from '#lib/server/db';
import * as userSchema from '#lib/server/db/schema';
import { sql } from 'drizzle-orm';
import { getOrCreateFingerprint } from '#lib/server/auth';
import { canAccessTier } from '#lib/server/visibility';
import { gradeQuizSubmission } from '#lib/server/quiz-grading';
import { awardQuizGamification } from '#lib/server/gamification';

export const POST: RequestHandler = async (event) => {
	try {
		const body = await event.request.json();
		const quizId = Number(event.params.id || body.quizId);
		if (!quizId || !Number.isFinite(quizId)) {
			return json({ error: 'معرف التمرين غير صالح' }, { status: 400 });
		}

		// Verify quiz exists and parent curriculum is published + accessible
		const quizRow = contentSqlite
			.query(
				`
			SELECT q.*, ys.visibility as ys_vis, y.visibility as y_vis, el.visibility as el_vis
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			WHERE q.id = ?
			LIMIT 1
		`
			)
			.get(quizId) as any;

		if (!quizRow) {
			return json({ error: 'التمرين غير موجود' }, { status: 404 });
		}

		const tier = quizRow.access_tier || (quizRow.is_premium ? 'premium' : 'public');
		const access = canAccessTier(tier, event.locals.user, false);
		if (!access.allowed) {
			return json(
				{
					error:
						access.reason === 'premium_required'
							? 'هذا التمرين مخصّص للمشتركين فقط'
							: 'يرجى تسجيل الدخول لحفظ نتائج هذا التمرين',
					lockReason: access.reason
				},
				{ status: 403 }
			);
		}

		const userId = event.locals.user?.id ?? null;
		const fingerprint = getOrCreateFingerprint(event);

		// Enforce max_attempts limit if configured
		if (quizRow.max_attempts && quizRow.max_attempts > 0) {
			const countRow = (
				userId
					? usersDatabase.$client
							.query('SELECT COUNT(*) as c FROM quiz_attempts WHERE quiz_id = ? AND user_id = ?')
							.get(quizId, userId)
					: usersDatabase.$client
							.query(
								'SELECT COUNT(*) as c FROM quiz_attempts WHERE quiz_id = ? AND user_id IS NULL AND fingerprint = ?'
							)
							.get(quizId, fingerprint)
			) as { c: number } | null;

			if ((countRow?.c || 0) >= Number(quizRow.max_attempts)) {
				return json(
					{ error: `لقد بلغت الحد الأقصى للمحاولات (${quizRow.max_attempts}) في هذا التمرين` },
					{ status: 403 }
				);
			}
		}

		// Load canonical questions & question_data from content DB (never trust client score)
		const rawQuestions = contentSqlite
			.query(
				`
			SELECT qq.id, qq.question_id as questionId, qq.points, qq."order",
				q.type, q.question_data as questionData, q.explanation
			FROM quiz_questions qq
			JOIN questions q ON qq.question_id = q.id
			WHERE qq.quiz_id = ?
			ORDER BY qq."order"
		`
			)
			.all(quizId) as any[];

		if (rawQuestions.length === 0) {
			return json({ error: 'لا توجد أسئلة مسجلة في هذا التمرين' }, { status: 400 });
		}

		const answersMap: Record<string | number, any> =
			body.answers && typeof body.answers === 'object' ? { ...body.answers } : {};
		if (Array.isArray(body.details)) {
			for (const d of body.details) {
				const qKey = d?.question?.id;
				if (qKey !== undefined && answersMap[qKey] === undefined) {
					answersMap[qKey] = d.answer ?? null;
				}
				const canonicalKey = d?.question?.questionId;
				if (canonicalKey !== undefined && answersMap[canonicalKey] === undefined) {
					answersMap[canonicalKey] = d.answer ?? null;
				}
			}
		}

		const graded = gradeQuizSubmission(
			rawQuestions.map((rq) => ({
				id: rq.id,
				questionId: rq.questionId,
				type: rq.type,
				points: rq.points || 1,
				questionData: rq.questionData,
				explanation: rq.explanation
			})),
			answersMap
		);

		const timeTaken = Math.max(0, Math.min(86400, Math.round(Number(body.timeTaken || 0))));

		// 1. Insert attempt using server-computed score
		const attemptResult = usersDatabase
			.insert(userSchema.quizAttempts)
			.values({
				quizId,
				userId,
				fingerprint,
				score: graded.score,
				totalPoints: graded.totalPoints,
				percentage: graded.percentage,
				timeTaken,
				completedAt: sql`(datetime('now'))`
			})
			.returning({ id: userSchema.quizAttempts.id })
			.get();

		if (!attemptResult) {
			return json({ error: 'فشل في حفظ المحاولة' }, { status: 500 });
		}

		// 2. Save detailed per-question responses keyed by canonical questions.id
		const answerValues = graded.gradedDetails.map((d) => ({
			attemptId: attemptResult.id,
			questionId: d.result.questionId,
			answer: JSON.stringify(d.rawAnswer ?? {}),
			isCorrect: d.result.correct ? 1 : 0,
			pointsEarned: d.result.pointsEarned
		}));
		if (answerValues.length > 0) {
			usersDatabase.insert(userSchema.attemptAnswers).values(answerValues).run();
		}

		// 3. Award XP, update daily streak, track mistakes, and evaluate badges
		const gamification = awardQuizGamification({
			userId,
			fingerprint,
			quizId,
			percentage: graded.percentage,
			timeTaken,
			gradedDetails: graded.gradedDetails.map((d) => ({
				questionId: d.result.questionId,
				type: d.result.type,
				isCorrect: d.result.correct
			}))
		});

		const showAnswers = Boolean(quizRow.show_answers);

		return json({
			success: true,
			attemptId: attemptResult.id,
			score: graded.score,
			totalPoints: graded.totalPoints,
			percentage: graded.percentage,
			xpEarned: gamification.xpEarned,
			newBadges: gamification.newBadges,
			streakDays: gamification.streakDays,
			totalPointsBalance: gamification.totalPoints,
			gradedDetails: showAnswers
				? graded.gradedDetails.map((d) => d.result)
				: graded.gradedDetails.map((d) => ({
						questionId: d.result.questionId,
						quizQuestionId: d.result.quizQuestionId,
						correct: d.result.correct,
						pointsEarned: d.result.pointsEarned,
						maxPoints: d.result.maxPoints
					}))
		});
	} catch (error) {
		console.error('Quiz submit error:', error);
		return json({ error: 'حدث خطأ داخلي في الخادم' }, { status: 500 });
	}
};
