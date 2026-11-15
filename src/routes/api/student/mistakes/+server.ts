import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite, usersSqlite } from '#lib/server/db';
import { gradeQuizSubmission } from '#lib/server/quiz-grading';
import { awardQuizGamification } from '#lib/server/gamification';
import { getOrCreateFingerprint } from '#lib/server/auth';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user) {
		return json({ error: 'يرجى تسجيل الدخول للمتابعة' }, { status: 401 });
	}

	const body = await event.request.json();
	const userId = event.locals.user.id;

	if (body.action === 'resolve') {
		const qid = Number(body.questionId);
		if (!qid) return json({ error: 'معرف السؤال مفقود' }, { status: 400 });
		usersSqlite
			.query("UPDATE user_mistakes SET resolved = 1, last_attempt_at = datetime('now') WHERE user_id = ? AND question_id = ?")
			.run(userId, qid);
		return json({ success: true });
	}

	if (body.action === 'retrySubmit') {
		const answersMap: Record<string | number, any> =
			body.answers && typeof body.answers === 'object' ? body.answers : {};
		const qIds = Object.keys(answersMap)
			.map(Number)
			.filter((n) => Number.isInteger(n) && n > 0);
		if (qIds.length === 0) {
			return json({ error: 'لم يتم إرسال أي إجابات' }, { status: 400 });
		}

		const ph = qIds.map(() => '?').join(',');
		const rawQuestions = contentSqlite
			.query(
				`SELECT id, type, question_data as questionData, explanation FROM questions WHERE id IN (${ph})`
			)
			.all(...qIds) as any[];

		if (rawQuestions.length === 0) {
			return json({ error: 'لم يتم العثور على الأسئلة' }, { status: 404 });
		}

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
			userId,
			fingerprint,
			quizId: 0,
			percentage: graded.percentage,
			timeTaken: 30,
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

	return json({ error: 'إجراء غير مدعوم' }, { status: 400 });
};
