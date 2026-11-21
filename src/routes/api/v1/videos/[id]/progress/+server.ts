import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite, pgRun } from '#lib/server/db';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

export const POST: RequestHandler = async (event) => {
	try {
		if (!event.locals.user) {
			return json({ error: 'يجب تسجيل الدخول لحفظ موضع المشاهدة' }, { status: 401 });
		}

		const videoId = Number(event.params.id);
		if (!videoId || !Number.isInteger(videoId) || videoId <= 0) {
			return json({ error: 'معرف الفيديو غير صالح' }, { status: 400 });
		}

		const videoRow = contentSqlite
			.query('SELECT id, duration_sec FROM videos WHERE id = ? LIMIT 1')
			.get(videoId) as { id: number; duration_sec: number } | null;

		if (!videoRow) {
			return json({ error: 'الفيديو غير موجود' }, { status: 404 });
		}

		const body = await event.request.json().catch(() => ({}));
		const rawPos = Number(body?.lastPositionSec ?? 0);
		const lastPositionSec = Number.isFinite(rawPos)
			? Math.max(0, Math.min(86_400, Math.floor(rawPos)))
			: 0;
		const completed =
			Boolean(body?.completed) ||
			(videoRow.duration_sec > 0 && lastPositionSec >= Math.floor(videoRow.duration_sec * 0.9));

		await pgRun(
			`INSERT INTO video_watch_progress (user_id, video_id, last_position_sec, completed, answered_cues_json, updated_at)
			 VALUES ($1, $2, $3, $4, '[]', ${PG_NOW_EXPR})
			 ON CONFLICT (user_id, video_id) DO UPDATE
			 SET last_position_sec = EXCLUDED.last_position_sec,
			     completed = (video_watch_progress.completed OR EXCLUDED.completed),
			     updated_at = ${PG_NOW_EXPR}`,
			[event.locals.user.id, videoId, lastPositionSec, completed]
		);

		return json({
			success: true,
			videoId,
			lastPositionSec,
			completed
		});
	} catch (err) {
		console.error('[API] Video progress save error:', err);
		return json({ error: 'حدث خطأ أثناء حفظ تقدم المشاهدة' }, { status: 500 });
	}
};
