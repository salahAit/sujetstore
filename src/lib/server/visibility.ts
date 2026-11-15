import { contentDatabase, contentSqlite } from '#lib/server/db';
import {
	siteSettings,
	yearSubjects,
	levelStreams,
	type VisibilityState,
	type AccessTier
} from '#lib/server/db/schema-content';
import { isEffectivePremium } from '#lib/server/auth';
import type { User } from '#lib/server/db/schema';
import { eq, and, isNull } from 'drizzle-orm';

export interface AccessCheckResult {
	allowed: boolean;
	reason?: 'auth_required' | 'premium_required';
}

/** Read all site settings as a key-value map. */
export function getSiteSettings(): Record<string, string> {
	try {
		const rows = contentSqlite.query('SELECT key, value FROM site_settings').all() as Array<{
			key: string;
			value: string;
		}>;
		const map: Record<string, string> = {};
		for (const r of rows) map[r.key] = r.value;
		return map;
	} catch {
		return {};
	}
}

/** Upsert a site setting value in content.db. */
export async function setSiteSetting(key: string, value: string): Promise<void> {
	await contentDatabase
		.insert(siteSettings)
		.values({ key, value, updatedAt: new Date().toISOString() })
		.onConflictDoUpdate({
			target: siteSettings.key,
			set: { value, updatedAt: new Date().toISOString() }
		});
}

/** Determine whether the current viewer (or static build) can access an item by its `accessTier`. */
export function canAccessTier(
	accessTier: string | null | undefined,
	user: Pick<User, 'role' | 'subscriptionTier' | 'subscriptionExpiresAt'> | null,
	isStaticBuild = false
): AccessCheckResult {
	const tier: AccessTier =
		accessTier === 'registered' || accessTier === 'premium' ? accessTier : 'public';

	if (tier === 'public') return { allowed: true };
	if (isStaticBuild) {
		return { allowed: false, reason: tier === 'premium' ? 'premium_required' : 'auth_required' };
	}
	if (tier === 'registered') {
		return user ? { allowed: true } : { allowed: false, reason: 'auth_required' };
	}
	return isEffectivePremium(user) ? { allowed: true } : { allowed: false, reason: 'premium_required' };
}

/** Fetch visible education levels (`published` and `coming_soon`) with accurate published counts. */
export function getPublicLevels() {
	return contentSqlite
		.query(
			`
		SELECT el.*,
			(
				SELECT COUNT(DISTINCT y.id)
				FROM years y
				WHERE y.level_id = el.id AND y.visibility = 'published'
			) as yearCount,
			(
				SELECT COUNT(d.id)
				FROM documents d
				JOIN year_subjects ys ON d.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				WHERE y.level_id = el.id
					AND el.visibility = 'published'
					AND y.visibility = 'published'
					AND ys.visibility = 'published'
					AND d.is_published = 1
			) as docCount,
			(
				SELECT COUNT(q.id)
				FROM quizzes q
				JOIN year_subjects ys ON q.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				WHERE y.level_id = el.id
					AND el.visibility = 'published'
					AND y.visibility = 'published'
					AND ys.visibility = 'published'
					AND q.is_published = 1
			) as quizCount
		FROM education_levels el
		WHERE el.visibility IN ('published', 'coming_soon')
		ORDER BY el."order"
	`
		)
		.all() as Array<Record<string, any>>;
}

/**
 * Keep `year_subjects` synchronized whenever a `stream_subjects` link is added or updated.
 */
export async function syncStreamSubjectToYearSubjects(options: {
	streamId: string;
	subjectId: string;
	yearId: string | null;
	coefficient: number | null;
	order: number;
	visibility?: VisibilityState;
}) {
	const { streamId, subjectId, yearId, coefficient, order, visibility } = options;

	let targetYearIds: string[] = [];
	if (yearId) {
		targetYearIds = [yearId];
	} else {
		const mappedYears = await contentDatabase
			.select({ yearId: levelStreams.yearId })
			.from(levelStreams)
			.where(eq(levelStreams.streamId, streamId))
			.all();
		targetYearIds = mappedYears.map((m) => m.yearId);
	}

	for (const yId of targetYearIds) {
		const existing = await contentDatabase
			.select()
			.from(yearSubjects)
			.where(
				and(
					eq(yearSubjects.yearId, yId),
					eq(yearSubjects.subjectId, subjectId),
					streamId ? eq(yearSubjects.streamId, streamId) : isNull(yearSubjects.streamId)
				)
			)
			.get();

		if (existing) {
			await contentDatabase
				.update(yearSubjects)
				.set({
					coefficient,
					order,
					...(visibility ? { visibility } : {})
				})
				.where(eq(yearSubjects.id, existing.id));
		} else {
			await contentDatabase.insert(yearSubjects).values({
				yearId: yId,
				subjectId,
				streamId,
				coefficient,
				order,
				visibility: visibility ?? 'hidden'
			});
		}
	}
}

/** Build the complete Level -> Year -> Stream/Subject visibility tree for Admin UI. */
export function getFullVisibilityTree() {
	const levels = contentSqlite
		.query('SELECT * FROM education_levels ORDER BY "order"')
		.all() as Array<Record<string, any>>;

	const years = contentSqlite
		.query('SELECT * FROM years ORDER BY "order"')
		.all() as Array<Record<string, any>>;

	const yearSubjectsList = contentSqlite
		.query(
			`
		SELECT ys.*, s.name_ar as subject_name, s.slug as subject_slug, s.icon as subject_icon,
			st.name_ar as stream_name,
			(SELECT COUNT(*) FROM documents d WHERE d.year_subject_id = ys.id AND d.is_published = 1) as pub_docs,
			(SELECT COUNT(*) FROM documents d WHERE d.year_subject_id = ys.id) as total_docs,
			(SELECT COUNT(*) FROM quizzes q WHERE q.year_subject_id = ys.id AND q.is_published = 1) as pub_quizzes
		FROM year_subjects ys
		JOIN subjects s ON ys.subject_id = s.id
		LEFT JOIN streams st ON ys.stream_id = st.id
		ORDER BY ys."order", s.name_ar
	`
		)
		.all() as Array<Record<string, any>>;

	const levelStreamsList = contentSqlite
		.query(
			`
		SELECT ls.*, st.name_ar as stream_name, st.name_fr as stream_name_fr
		FROM level_streams ls
		JOIN streams st ON ls.stream_id = st.id
		ORDER BY st."order"
	`
		)
		.all() as Array<Record<string, any>>;

	const streamSubjectsList = contentSqlite
		.query(
			`
		SELECT ss.*, s.name_ar as subject_name, st.name_ar as stream_name
		FROM stream_subjects ss
		JOIN subjects s ON ss.subject_id = s.id
		JOIN streams st ON ss.stream_id = st.id
		ORDER BY ss."order"
	`
		)
		.all() as Array<Record<string, any>>;

	return levels.map((lvl) => ({
		...lvl,
		years: years
			.filter((y) => y.level_id === lvl.id)
			.map((yr) => ({
				...yr,
				streams: levelStreamsList.filter((ls) => ls.year_id === yr.id),
				subjects: yearSubjectsList.filter((ys) => ys.year_id === yr.id),
				streamSubjects: streamSubjectsList.filter((ss) => ss.year_id === yr.id || ss.year_id === null)
			}))
	}));
}

/** Update visibility of a single curriculum node (and keep stream/year subjects consistent). */
export function updateVisibilityNode(
	targetType: 'level' | 'year' | 'level_stream' | 'stream_subject' | 'year_subject',
	id: string | number,
	visibility: VisibilityState
): { updated: boolean } {
	if (!['published', 'coming_soon', 'hidden'].includes(visibility)) {
		throw new Error('حالة الظهور غير صالحة');
	}

	if (targetType === 'level') {
		contentSqlite.query('UPDATE education_levels SET visibility = ? WHERE id = ?').run(visibility, String(id));
		return { updated: true };
	}

	if (targetType === 'year') {
		contentSqlite.query('UPDATE years SET visibility = ? WHERE id = ?').run(visibility, String(id));
		return { updated: true };
	}

	if (targetType === 'level_stream') {
		contentSqlite.query('UPDATE level_streams SET visibility = ? WHERE id = ?').run(visibility, Number(id));
		return { updated: true };
	}

	if (targetType === 'year_subject') {
		const row = contentSqlite
			.query('SELECT id, year_id, subject_id, stream_id FROM year_subjects WHERE id = ?')
			.get(Number(id)) as { id: number; year_id: string; subject_id: string; stream_id: string | null } | null;
		if (!row) return { updated: false };

		contentSqlite.query('UPDATE year_subjects SET visibility = ? WHERE id = ?').run(visibility, row.id);
		if (row.stream_id) {
			contentSqlite
				.query(
					'UPDATE stream_subjects SET visibility = ? WHERE stream_id = ? AND subject_id = ? AND (year_id = ? OR year_id IS NULL)'
				)
				.run(visibility, row.stream_id, row.subject_id, row.year_id);
		}
		return { updated: true };
	}

	if (targetType === 'stream_subject') {
		const row = contentSqlite
			.query('SELECT id, stream_id, subject_id, year_id FROM stream_subjects WHERE id = ?')
			.get(Number(id)) as { id: number; stream_id: string; subject_id: string; year_id: string | null } | null;
		if (!row) return { updated: false };

		contentSqlite.query('UPDATE stream_subjects SET visibility = ? WHERE id = ?').run(visibility, row.id);
		if (row.year_id) {
			contentSqlite
				.query('UPDATE year_subjects SET visibility = ? WHERE stream_id = ? AND subject_id = ? AND year_id = ?')
				.run(visibility, row.stream_id, row.subject_id, row.year_id);
		} else {
			contentSqlite
				.query('UPDATE year_subjects SET visibility = ? WHERE stream_id = ? AND subject_id = ?')
				.run(visibility, row.stream_id, row.subject_id);
		}
		return { updated: true };
	}

	return { updated: false };
}

/** Apply quick admin visibility presets (e.g. Middle School Math only, or publish an entire level). */
export function applyVisibilityPreset(options: {
	preset: 'moyen_math_only' | 'publish_level' | 'hide_level';
	levelId?: string;
}) {
	const { preset, levelId } = options;

	if (preset === 'moyen_math_only') {
		contentSqlite.exec('BEGIN');
		try {
			contentSqlite.exec(
				"UPDATE education_levels SET visibility = CASE WHEN id = 'moyen' THEN 'published' ELSE 'hidden' END"
			);
			contentSqlite.exec(
				"UPDATE years SET visibility = CASE WHEN id IN ('1am', '2am', '3am', '4am') THEN 'published' ELSE 'hidden' END"
			);
			contentSqlite.exec(
				"UPDATE level_streams SET visibility = CASE WHEN year_id IN ('1am', '2am', '3am', '4am') THEN 'published' ELSE 'hidden' END"
			);
			contentSqlite.exec(
				"UPDATE stream_subjects SET visibility = CASE WHEN subject_id = 'MAT-B' AND (year_id IS NULL OR year_id IN ('1am', '2am', '3am', '4am')) THEN 'published' ELSE 'hidden' END"
			);
			contentSqlite.exec(
				"UPDATE year_subjects SET visibility = CASE WHEN year_id IN ('1am', '2am', '3am', '4am') AND subject_id = 'MAT-B' THEN 'published' ELSE 'hidden' END"
			);
			contentSqlite.exec('COMMIT');
		} catch (err) {
			contentSqlite.exec('ROLLBACK');
			throw err;
		}
		return;
	}

	if ((preset === 'publish_level' || preset === 'hide_level') && levelId) {
		const vis: VisibilityState = preset === 'publish_level' ? 'published' : 'hidden';
		contentSqlite.exec('BEGIN');
		try {
			contentSqlite.query('UPDATE education_levels SET visibility = ? WHERE id = ?').run(vis, levelId);
			contentSqlite.query('UPDATE years SET visibility = ? WHERE level_id = ?').run(vis, levelId);
			contentSqlite
				.query('UPDATE level_streams SET visibility = ? WHERE year_id IN (SELECT id FROM years WHERE level_id = ?)')
				.run(vis, levelId);
			contentSqlite
				.query('UPDATE year_subjects SET visibility = ? WHERE year_id IN (SELECT id FROM years WHERE level_id = ?)')
				.run(vis, levelId);
			contentSqlite.exec('COMMIT');
		} catch (err) {
			contentSqlite.exec('ROLLBACK');
			throw err;
		}
	}
}
