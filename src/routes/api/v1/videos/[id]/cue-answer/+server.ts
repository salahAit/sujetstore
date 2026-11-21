import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite, pgGet, pgRun, pgTx } from '#lib/server/db';
import { getOrCreateFingerprint } from '#lib/server/auth';
import { canAccessTier } from '#lib/server/visibility';
import { gradeQuestion } from '#lib/server/quiz-grading';
import { platformEvents, platformRegistry } from '#lib/platform';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

interface AnsweredCueRecord {
	cueId: number;
	questionId: number;
	isCorrect: boolean;
	answeredAt: string;
}

function parseAnsweredCues(raw: string | null | undefined): AnsweredCueRecord[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.map((item): AnsweredCueRecord | null => {
				if (typeof item === 'number') {
					return { cueId: item, questionId: 0, isCorrect: true, answeredAt: '' };
				}
				if (item && typeof item === 'object' && typeof item.cueId === 'number') {
					return {
						cueId: item.cueId,
						questionId: Number(item.questionId || 0),
						isCorrect: Boolean(item.isCorrect),
						answeredAt: String(item.answeredAt || '')
					};
				}
				return null;
			})
			.filter((x): x is AnsweredCueRecord => x !== null);
	} catch {
		return [];
	}
}

export const POST: RequestHandler = async (event) => {
	try {
		const videoId = Number(event.params.id);
		if (!videoId || !Number.isInteger(videoId) || videoId <= 0) {
			return json({ error: 'معرف الفيديو غير صالح' }, { status: 400 });
		}

		const body = await event.request.json().catch(() => null);
		if (!body || typeof body !== 'object') {
			return json({ error: 'البيانات المرسلة غير صالحة' }, { status: 400 });
		}

		const videoRow = contentSqlite
			.query('SELECT id, access_tier, is_published FROM videos WHERE id = ? LIMIT 1')
			.get(videoId) as { id: number; access_tier: string; is_published: number } | null;

		if (!videoRow) {
			return json({ error: 'الفيديو غير موجود' }, { status: 404 });
		}

		const access = canAccessTier(videoRow.access_tier, event.locals.user, false);
		if (!access.allowed) {
			return json(
				{
					error:
						access.reason === 'premium_required'
							? 'هذا الفيديو مخصّص للمشتركين فقط'
							: 'يرجى تسجيل الدخول للإجابة على أسئلة هذا الفيديو',
					lockReason: access.reason
				},
				{ status: 403 }
			);
		}

		const cueId = body.cueId ? Number(body.cueId) : null;
		const questionIdParam = body.questionId ? Number(body.questionId) : null;

		if (!cueId && !questionIdParam) {
			return json({ error: 'يرجى تحديد معرف السؤال التفاعلي' }, { status: 400 });
		}

		const cueRow = cueId
			? (contentSqlite
					.query(
						`SELECT vcq.id AS cue_id, vcq.video_id, vcq.question_id,
						        q.type, q.question_data, q.explanation
						 FROM video_cue_questions vcq
						 JOIN questions q ON vcq.question_id = q.id
						 WHERE vcq.id = ? AND vcq.video_id = ?
						 LIMIT 1`
					)
					.get(cueId, videoId) as any)
			: (contentSqlite
					.query(
						`SELECT vcq.id AS cue_id, vcq.video_id, vcq.question_id,
						        q.type, q.question_data, q.explanation
						 FROM video_cue_questions vcq
						 JOIN questions q ON vcq.question_id = q.id
						 WHERE vcq.question_id = ? AND vcq.video_id = ?
						 LIMIT 1`
					)
					.get(questionIdParam, videoId) as any);

		if (!cueRow) {
			return json({ error: 'السؤال التفاعلي غير مرتبط بهذا الفيديو' }, { status: 404 });
		}

		const graded = gradeQuestion(
			{
				id: Number(cueRow.cue_id),
				questionId: Number(cueRow.question_id),
				type: String(cueRow.type),
				points: 1,
				questionData: cueRow.question_data,
				explanation: cueRow.explanation
			},
			body.answer
		);

		const userId = event.locals.user?.id ?? null;
		const fingerprint = getOrCreateFingerprint(event);

		const videoConfig = await platformRegistry.getModuleConfig<{ cueCorrectXp?: number }>(
			'video-studio'
		);
		const configuredXp = Math.max(1, Math.min(50, Number(videoConfig.cueCorrectXp ?? 5) || 5));
		const gamificationEnabled = await platformRegistry.isModuleEnabled('gamification');
		const remediationEnabled = await platformRegistry.isModuleEnabled('remediation');

		let xpEarned = 0;

		await pgTx(async (tx) => {
			let alreadyCorrectBefore = false;

			// 1. Update video_watch_progress.answered_cues_json for signed-in users
			if (userId) {
				const progRow = await pgGet<{
					id: number;
					answered_cues_json: string;
					last_position_sec: number;
				}>(
					'SELECT id, answered_cues_json, last_position_sec FROM video_watch_progress WHERE user_id = $1 AND video_id = $2 FOR UPDATE',
					[userId, videoId],
					tx
				);

				const existingCues = parseAnsweredCues(progRow?.answered_cues_json);
				const prevEntry = existingCues.find((c) => c.cueId === Number(cueRow.cue_id));
				alreadyCorrectBefore = Boolean(prevEntry?.isCorrect);

				const nextRecord: AnsweredCueRecord = {
					cueId: Number(cueRow.cue_id),
					questionId: Number(cueRow.question_id),
					isCorrect: graded.correct || alreadyCorrectBefore,
					answeredAt: new Date().toISOString()
				};

				const mergedCues = existingCues.filter((c) => c.cueId !== Number(cueRow.cue_id));
				mergedCues.push(nextRecord);
				const serialized = JSON.stringify(mergedCues);

				await pgRun(
					`INSERT INTO video_watch_progress (user_id, video_id, last_position_sec, completed, answered_cues_json, updated_at)
					 VALUES ($1, $2, 0, FALSE, $3, ${PG_NOW_EXPR})
					 ON CONFLICT (user_id, video_id) DO UPDATE
					 SET answered_cues_json = EXCLUDED.answered_cues_json,
					     updated_at = ${PG_NOW_EXPR}`,
					[userId, videoId, serialized],
					tx
				);
			}

			// 2. Mistake Notebook tracking (record wrong answers, auto-resolve if fixed)
			if (remediationEnabled) {
				const existingMistake = userId
					? await pgGet<{ id: number }>(
							'SELECT id FROM user_mistakes WHERE user_id = $1 AND question_id = $2 LIMIT 1',
							[userId, Number(cueRow.question_id)],
							tx
						)
					: await pgGet<{ id: number }>(
							'SELECT id FROM user_mistakes WHERE user_id IS NULL AND fingerprint = $1 AND question_id = $2 LIMIT 1',
							[fingerprint, Number(cueRow.question_id)],
							tx
						);

				if (!graded.correct) {
					if (existingMistake) {
						await pgRun(
							`UPDATE user_mistakes
							 SET wrong_count = wrong_count + 1, resolved = FALSE, last_attempt_at = ${PG_NOW_EXPR}
							 WHERE id = $1`,
							[existingMistake.id],
							tx
						);
					} else {
						await pgRun(
							`INSERT INTO user_mistakes (user_id, fingerprint, question_id, quiz_id, wrong_count, last_attempt_at, resolved)
							 VALUES ($1, $2, $3, NULL, 1, ${PG_NOW_EXPR}, FALSE)`,
							[userId, fingerprint, Number(cueRow.question_id)],
							tx
						);
					}
				} else if (existingMistake) {
					await pgRun(
						`UPDATE user_mistakes SET resolved = TRUE, last_attempt_at = ${PG_NOW_EXPR} WHERE id = $1`,
						[existingMistake.id],
						tx
					);
				}
			}

			// 3. Award XP on first-time correct answer
			if (graded.correct && gamificationEnabled && !alreadyCorrectBefore) {
				await pgRun(
					`INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at)
					 VALUES ($1, $2, $3, 'video_cue_correct', NULL, ${PG_NOW_EXPR})`,
					[userId, fingerprint, configuredXp],
					tx
				);
				xpEarned = configuredXp;
			}
		});

		// 4. Emit domain event on PlatformEventBus (isolated error boundaries)
		await platformEvents.emit('video.cue_answered', {
			userId,
			fingerprint,
			videoId,
			cueId: Number(cueRow.cue_id),
			questionId: Number(cueRow.question_id),
			isCorrect: graded.correct,
			xpEarned
		});

		return json({
			isCorrect: graded.correct,
			explanation: cueRow.explanation || null,
			correctAnswer: graded.correctAnswerDisplay,
			xpEarned
		});
	} catch (err) {
		console.error('[API] Video cue-answer error:', err);
		return json({ error: 'حدث خطأ داخلي أثناء تصحيح السؤال' }, { status: 500 });
	}
};
