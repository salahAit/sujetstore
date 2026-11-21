import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pgAll, pgGet } from '#lib/server/db';
import { isStaffRole } from '#lib/server/auth';

const VALID_DAYS = [1, 7, 30] as const;
const VALID_DEVICES = ['desktop', 'mobile', 'tablet', 'bot'] as const;

export interface AnalyticsKpis {
	totalEvents: number;
	uniqueIps: number;
	activeUsers: number;
	pdfEvents: number;
	blockedAttempts: number;
	mediaDownloads: number;
}

export interface GeoCountryRow {
	country_code: string;
	country_name: string;
	count: number;
	unique_ips: number;
}

export interface GeoCityRow {
	country_code: string;
	country_name: string;
	region_city: string;
	count: number;
	unique_ips: number;
}

export interface BreakdownRow {
	label: string;
	count: number;
}

export interface RegisteredUserActivityRow {
	user_id: number;
	user_name: string;
	user_email: string;
	user_role: string;
	subscription_tier: string;
	total_events: number;
	pdf_events: number;
	blocked_events: number;
	last_seen: string;
	last_city: string;
	last_device: string;
}

export interface AuditEventRow {
	id: number;
	user_id: number | null;
	user_name: string;
	user_email: string | null;
	user_role: string | null;
	event_type: string;
	path: string;
	resource_id: string | null;
	ip_address: string;
	country_code: string | null;
	country_name: string | null;
	region_city: string | null;
	device_type: string;
	os_name: string;
	browser_name: string;
	user_agent: string | null;
	status_code: number;
	created_at: string;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		throw redirect(302, '/admin/login');
	}

	const rawDays = Number(url.searchParams.get('days') || '7');
	const days = (VALID_DAYS.includes(rawDays as 1 | 7 | 30) ? rawDays : 7) as 1 | 7 | 30;

	const rawUserId = url.searchParams.get('userId')?.trim() || '';
	const parsedUserId = /^\d+$/.test(rawUserId) ? Number(rawUserId) : null;

	const eventType = (url.searchParams.get('eventType') || '').trim().slice(0, 64);

	const rawDevice = (url.searchParams.get('device') || '').trim().toLowerCase();
	const device = VALID_DEVICES.includes(rawDevice as (typeof VALID_DEVICES)[number]) ? rawDevice : '';

	const cutoffUtc = new Date(Date.now() - days * 86_400_000)
		.toISOString()
		.slice(0, 19)
		.replace('T', ' ');

	const whereParts: string[] = ['a.created_at >= $1'];
	const params: Array<string | number> = [cutoffUtc];

	if (parsedUserId !== null) {
		params.push(parsedUserId);
		whereParts.push(`a.user_id = $${params.length}`);
	}
	if (eventType) {
		params.push(eventType);
		whereParts.push(`a.event_type = $${params.length}`);
	}
	if (device) {
		params.push(device);
		whereParts.push(`a.device_type = $${params.length}`);
	}

	const whereSql = whereParts.join(' AND ');

	const mediaWhere =
		parsedUserId !== null
			? 'created_at >= $1 AND user_id = $2'
			: 'created_at >= $1';
	const mediaParams: Array<string | number> =
		parsedUserId !== null ? [cutoffUtc, parsedUserId] : [cutoffUtc];

	const [
		kpiRow,
		mediaRow,
		topCountries,
		topCities,
		deviceBreakdown,
		osBreakdown,
		browserBreakdown,
		registeredUsers,
		eventTypeOptions,
		recentEvents,
		selectedUserRow
	] = await Promise.all([
		pgGet<{
			total_events: number | string;
			unique_ips: number | string;
			active_users: number | string;
			pdf_events: number | string;
			blocked_attempts: number | string;
		}>(
			`SELECT
				COUNT(*)::int AS total_events,
				COUNT(DISTINCT a.ip_address)::int AS unique_ips,
				COUNT(DISTINCT a.user_id) FILTER (WHERE a.user_id IS NOT NULL)::int AS active_users,
				COUNT(*) FILTER (WHERE a.event_type IN ('pdf_view', 'pdf_download'))::int AS pdf_events,
				COUNT(*) FILTER (WHERE a.event_type LIKE 'blocked_%' OR a.status_code IN (401, 403, 429))::int AS blocked_attempts
			 FROM activity_audit_logs a
			 WHERE ${whereSql}`,
			params
		),
		pgGet<{ cnt: number | string }>(
			`SELECT COUNT(*)::int AS cnt FROM media_download_logs WHERE ${mediaWhere}`,
			mediaParams
		),
		pgAll<GeoCountryRow>(
			`SELECT
				COALESCE(NULLIF(a.country_code, ''), 'XX') AS country_code,
				COALESCE(NULLIF(a.country_name, ''), 'Unknown') AS country_name,
				COUNT(*)::int AS count,
				COUNT(DISTINCT a.ip_address)::int AS unique_ips
			 FROM activity_audit_logs a
			 WHERE ${whereSql}
			 GROUP BY 1, 2
			 ORDER BY count DESC
			 LIMIT 10`,
			params
		),
		pgAll<GeoCityRow>(
			`SELECT
				COALESCE(NULLIF(a.country_code, ''), 'XX') AS country_code,
				COALESCE(NULLIF(a.country_name, ''), 'Unknown') AS country_name,
				COALESCE(NULLIF(a.region_city, ''), 'Unknown') AS region_city,
				COUNT(*)::int AS count,
				COUNT(DISTINCT a.ip_address)::int AS unique_ips
			 FROM activity_audit_logs a
			 WHERE ${whereSql}
			 GROUP BY 1, 2, 3
			 ORDER BY count DESC
			 LIMIT 12`,
			params
		),
		pgAll<BreakdownRow>(
			`SELECT COALESCE(NULLIF(a.device_type, ''), 'desktop') AS label, COUNT(*)::int AS count
			 FROM activity_audit_logs a
			 WHERE ${whereSql}
			 GROUP BY 1
			 ORDER BY count DESC`,
			params
		),
		pgAll<BreakdownRow>(
			`SELECT COALESCE(NULLIF(a.os_name, ''), 'Unknown') AS label, COUNT(*)::int AS count
			 FROM activity_audit_logs a
			 WHERE ${whereSql}
			 GROUP BY 1
			 ORDER BY count DESC
			 LIMIT 8`,
			params
		),
		pgAll<BreakdownRow>(
			`SELECT COALESCE(NULLIF(a.browser_name, ''), 'Unknown') AS label, COUNT(*)::int AS count
			 FROM activity_audit_logs a
			 WHERE ${whereSql}
			 GROUP BY 1
			 ORDER BY count DESC
			 LIMIT 8`,
			params
		),
		pgAll<RegisteredUserActivityRow>(
			`SELECT
				a.user_id,
				COALESCE(u.name, MAX(a.user_email), 'مستخدم #' || a.user_id::text) AS user_name,
				COALESCE(u.email, MAX(a.user_email), '') AS user_email,
				COALESCE(u.role, MAX(a.user_role), 'student') AS user_role,
				COALESCE(u.subscription_tier, 'free') AS subscription_tier,
				COUNT(*)::int AS total_events,
				COUNT(*) FILTER (WHERE a.event_type IN ('pdf_view', 'pdf_download'))::int AS pdf_events,
				COUNT(*) FILTER (WHERE a.event_type LIKE 'blocked_%' OR a.status_code IN (401, 403, 429))::int AS blocked_events,
				MAX(a.created_at) AS last_seen,
				COALESCE((ARRAY_AGG(a.region_city ORDER BY a.created_at DESC))[1], 'Unknown') AS last_city,
				COALESCE((ARRAY_AGG(a.device_type ORDER BY a.created_at DESC))[1], 'desktop') AS last_device
			 FROM activity_audit_logs a
			 LEFT JOIN users u ON u.id = a.user_id
			 WHERE a.created_at >= $1 AND a.user_id IS NOT NULL
			 GROUP BY a.user_id, u.name, u.email, u.role, u.subscription_tier
			 ORDER BY total_events DESC, last_seen DESC
			 LIMIT 40`,
			[cutoffUtc]
		),
		pgAll<BreakdownRow>(
			`SELECT event_type AS label, COUNT(*)::int AS count
			 FROM activity_audit_logs
			 WHERE created_at >= $1
			 GROUP BY event_type
			 ORDER BY count DESC`,
			[cutoffUtc]
		),
		pgAll<AuditEventRow>(
			`SELECT
				a.id,
				a.user_id,
				COALESCE(u.name, '') AS user_name,
				COALESCE(u.email, a.user_email) AS user_email,
				COALESCE(u.role, a.user_role) AS user_role,
				a.event_type,
				a.path,
				a.resource_id,
				a.ip_address,
				a.country_code,
				a.country_name,
				a.region_city,
				a.device_type,
				a.os_name,
				a.browser_name,
				a.user_agent,
				a.status_code,
				a.created_at
			 FROM activity_audit_logs a
			 LEFT JOIN users u ON u.id = a.user_id
			 WHERE ${whereSql}
			 ORDER BY a.id DESC
			 LIMIT 100`,
			params
		),
		parsedUserId !== null
			? pgGet<{ id: number; name: string; email: string; role: string }>(
					`SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1`,
					[parsedUserId]
				)
			: Promise.resolve(null)
	]);

	const kpis: AnalyticsKpis = {
		totalEvents: Number(kpiRow?.total_events ?? 0),
		uniqueIps: Number(kpiRow?.unique_ips ?? 0),
		activeUsers: Number(kpiRow?.active_users ?? 0),
		pdfEvents: Number(kpiRow?.pdf_events ?? 0),
		blockedAttempts: Number(kpiRow?.blocked_attempts ?? 0),
		mediaDownloads: Number(mediaRow?.cnt ?? 0)
	};

	return {
		filters: {
			days,
			userId: parsedUserId,
			eventType,
			device
		},
		selectedUser: selectedUserRow,
		kpis,
		topCountries: topCountries.map((r) => ({
			...r,
			count: Number(r.count),
			unique_ips: Number(r.unique_ips)
		})),
		topCities: topCities.map((r) => ({
			...r,
			count: Number(r.count),
			unique_ips: Number(r.unique_ips)
		})),
		deviceBreakdown: deviceBreakdown.map((r) => ({ ...r, count: Number(r.count) })),
		osBreakdown: osBreakdown.map((r) => ({ ...r, count: Number(r.count) })),
		browserBreakdown: browserBreakdown.map((r) => ({ ...r, count: Number(r.count) })),
		registeredUsers: registeredUsers.map((r) => ({
			...r,
			user_id: Number(r.user_id),
			total_events: Number(r.total_events),
			pdf_events: Number(r.pdf_events),
			blocked_events: Number(r.blocked_events)
		})),
		eventTypeOptions: eventTypeOptions.map((r) => ({ ...r, count: Number(r.count) })),
		recentEvents: recentEvents.map((r) => ({
			...r,
			id: Number(r.id),
			user_id: r.user_id === null ? null : Number(r.user_id),
			status_code: Number(r.status_code)
		}))
	};
};
