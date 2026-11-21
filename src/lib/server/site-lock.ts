import { pgGet, pgRun } from './db/users-pg';

export type SiteLockMode = 'live' | 'relaunch' | 'app_only';

export interface SiteLockConfig {
	mode: SiteLockMode;
	titleAr: string;
	titleFr: string;
	titleEn: string;
	messageAr: string;
	messageFr: string;
	messageEn: string;
	launchDate: string;
	apkDownloadUrl: string;
}

export const DEFAULT_SITE_LOCK_CONFIG: SiteLockConfig = {
	mode: 'live',
	titleAr: 'المنصة في تحديث شامل — سنعود قريباً بحلّة جديدة',
	titleFr: 'Mise à jour majeure en cours — Retour très bientôt',
	titleEn: 'Major Upgrade in Progress — Coming Back Soon',
	messageAr:
		'نعمل حالياً على ترقية البنية التقنية لمنصة SujetStore وإضافة مزايا ذكية جديدة لخدمة التلاميذ والأساتذة بأعلى جودة.',
	messageFr:
		'Nous améliorons actuellement la plateforme SujetStore avec de nouvelles fonctionnalités interactives et des performances accrues.',
	messageEn:
		'We are currently upgrading SujetStore with enhanced security, faster performance, and new interactive learning tools.',
	launchDate: '',
	apkDownloadUrl: ''
};

let cachedConfig: { value: SiteLockConfig; loadedAt: number } | null = null;
const CACHE_TTL_MS = 5_000;

export function invalidateSiteLockCache(): void {
	cachedConfig = null;
}

export async function getSiteLockConfig(forceRefresh = false): Promise<SiteLockConfig> {
	const now = Date.now();
	if (!forceRefresh && cachedConfig && now - cachedConfig.loadedAt < CACHE_TTL_MS) {
		return cachedConfig.value;
	}
	try {
		const row = await pgGet<{ value: string }>(
			"SELECT value FROM platform_settings WHERE key = 'site_lock_config' LIMIT 1"
		);
		if (row?.value) {
			const parsed = JSON.parse(row.value) as Partial<SiteLockConfig>;
			const mode: SiteLockMode =
				parsed.mode === 'relaunch' || parsed.mode === 'app_only' || parsed.mode === 'live'
					? parsed.mode
					: 'live';
			const merged: SiteLockConfig = {
				...DEFAULT_SITE_LOCK_CONFIG,
				...parsed,
				mode
			};
			cachedConfig = { value: merged, loadedAt: now };
			return merged;
		}
	} catch {
		// Fail open only if table doesn't exist yet during early boot
	}
	cachedConfig = { value: DEFAULT_SITE_LOCK_CONFIG, loadedAt: now };
	return DEFAULT_SITE_LOCK_CONFIG;
}

export async function saveSiteLockConfig(config: SiteLockConfig): Promise<void> {
	const safe: SiteLockConfig = {
		mode: config.mode === 'relaunch' || config.mode === 'app_only' ? config.mode : 'live',
		titleAr: (config.titleAr || DEFAULT_SITE_LOCK_CONFIG.titleAr).slice(0, 200),
		titleFr: (config.titleFr || DEFAULT_SITE_LOCK_CONFIG.titleFr).slice(0, 200),
		titleEn: (config.titleEn || DEFAULT_SITE_LOCK_CONFIG.titleEn).slice(0, 200),
		messageAr: (config.messageAr || DEFAULT_SITE_LOCK_CONFIG.messageAr).slice(0, 1000),
		messageFr: (config.messageFr || DEFAULT_SITE_LOCK_CONFIG.messageFr).slice(0, 1000),
		messageEn: (config.messageEn || DEFAULT_SITE_LOCK_CONFIG.messageEn).slice(0, 1000),
		launchDate: (config.launchDate || '').slice(0, 64),
		apkDownloadUrl: (config.apkDownloadUrl || '').slice(0, 300)
	};
	await pgRun(
		`INSERT INTO platform_settings (key, value, updated_at)
		 VALUES ('site_lock_config', $1, to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		 ON CONFLICT (key) DO UPDATE
		 SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at`,
		[JSON.stringify(safe)]
	);
	invalidateSiteLockCache();
}

function escapeHtml(input: string): string {
	return input
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

/**
 * Renders a self-contained, mobile-first branded HTTP 503 Relaunch / App-Only page
 * with zero leaked curriculum data or PDF links.
 */
export function renderSiteLockHtml(config: SiteLockConfig, locale: 'ar' | 'fr' | 'en' = 'ar'): string {
	const dir = locale === 'ar' ? 'rtl' : 'ltr';
	const title =
		locale === 'fr' ? config.titleFr : locale === 'en' ? config.titleEn : config.titleAr;
	const message =
		locale === 'fr' ? config.messageFr : locale === 'en' ? config.messageEn : config.messageAr;
	const badge =
		config.mode === 'app_only'
			? locale === 'fr'
				? 'Application Mobile Disponible'
				: locale === 'en'
					? 'Mobile App Exclusive'
					: 'متاح عبر تطبيق الهاتف'
			: locale === 'fr'
				? 'Mise à jour de la plateforme'
				: locale === 'en'
					? 'Platform Upgrade'
					: 'تحديث المنصة جاري';

	const apkBtn =
		config.mode === 'app_only' && config.apkDownloadUrl
			? `<a href="${escapeHtml(config.apkDownloadUrl)}" class="btn-primary">📱 ${
					locale === 'fr'
						? "Télécharger l'application Android (APK)"
						: locale === 'en'
							? 'Download Android App (APK)'
							: 'تحميل تطبيق الأندرويد (APK)'
				}</a>`
			: '';

	const launchChip = config.launchDate
		? `<div class="launch-chip">🗓️ ${
				locale === 'fr'
					? 'Retour prévu :'
					: locale === 'en'
						? 'Expected relaunch:'
						: 'موعد الإطلاق المرتقب:'
			} <strong>${escapeHtml(config.launchDate)}</strong></div>`
		: '';

	return `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>SujetStore — ${escapeHtml(title)}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.25rem;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:radial-gradient(circle at top,#064e3b 0%,#0f172a 55%,#020617 100%);color:#f8fafc}
    .card{width:100%;max-width:540px;background:rgba(15,23,42,.82);backdrop-filter:blur(16px);border:1px solid rgba(16,185,129,.25);border-radius:1.5rem;padding:2rem 1.5rem;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,.45)}
    .logo{width:76px;height:76px;margin:0 auto 1rem;border-radius:1.1rem;object-fit:contain}
    .brand{font-size:1.75rem;font-weight:900;background:linear-gradient(135deg,#34d399,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.75rem}
    .badge{display:inline-flex;align-items:center;gap:.45rem;padding:.35rem .9rem;border-radius:999px;background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.35);color:#6ee7b7;font-size:.82rem;font-weight:700;margin-bottom:1.15rem}
    .dot{width:8px;height:8px;border-radius:999px;background:#34d399;animation:pulse 1.5s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    h1{font-size:1.45rem;line-height:1.45;font-weight:800;margin-bottom:.85rem;color:#fff}
    p{font-size:.98rem;line-height:1.75;color:#cbd5e1;margin-bottom:1.25rem}
    .launch-chip{display:inline-block;padding:.55rem 1rem;border-radius:.85rem;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.3);color:#fde68a;font-size:.88rem;margin-bottom:1.25rem}
    .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;width:100%;padding:.85rem 1.25rem;border-radius:.95rem;background:linear-gradient(135deg,#059669,#10b981);color:#fff;font-weight:800;text-decoration:none;margin-bottom:1.1rem;box-shadow:0 10px 25px rgba(16,185,129,.3)}
    .langs{display:flex;justify-content:center;gap:.5rem;margin-top:1rem}
    .langs a{padding:.35rem .75rem;border-radius:.6rem;background:rgba(255,255,255,.07);color:#cbd5e1;text-decoration:none;font-size:.8rem;font-weight:700;border:1px solid rgba(255,255,255,.1)}
    .langs a.active{background:rgba(16,185,129,.22);border-color:#10b981;color:#fff}
    .foot{margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.08);font-size:.78rem;color:#64748b;display:flex;justify-content:space-between;align-items:center}
    .foot a{color:#94a3b8;text-decoration:none}
  </style>
</head>
<body>
  <main class="card">
    <img src="/logo.webp" alt="SujetStore" class="logo" />
    <div class="brand" dir="ltr">SujetStore</div>
    <div class="badge"><span class="dot"></span> ${escapeHtml(badge)}</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    ${launchChip}
    ${apkBtn}
    <div class="langs" dir="ltr">
      <a href="/?lang=ar" class="${locale === 'ar' ? 'active' : ''}">العربية</a>
      <a href="/?lang=fr" class="${locale === 'fr' ? 'active' : ''}">Français</a>
      <a href="/?lang=en" class="${locale === 'en' ? 'active' : ''}">English</a>
    </div>
    <div class="foot">
      <span>© 2026 SujetStore</span>
      <a href="/admin/login">${locale === 'fr' ? 'Accès Admin' : locale === 'en' ? 'Admin Login' : 'دخول الإدارة'}</a>
    </div>
  </main>
</body>
</html>`;
}
