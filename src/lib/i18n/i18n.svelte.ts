import ar from './locales/ar';
import fr from './locales/fr';
import en from './locales/en';
import type { Locale, TranslationDict } from './types';

export type { Locale, TranslationDict };
export { SUPPORTED_LOCALES } from './types';

const COOKIE_NAME = 'site_lang';
const STORAGE_KEY = 'site_lang';
const LEGACY_STORAGE_KEY = 'lang-preference';

const dictionaries: Record<Locale, TranslationDict> = { ar, fr, en };

function normalizeLocale(value: unknown): Locale {
	if (value === 'fr' || value === 'en' || value === 'ar') return value;
	return 'ar';
}

function readLocaleCookie(): Locale | null {
	if (typeof document === 'undefined') return null;
	try {
		const match = document.cookie.match(/(?:^|;\s*)site_lang=(ar|fr|en)(?:;|$)/);
		return match ? (match[1] as Locale) : null;
	} catch {
		return null;
	}
}

function firstNonEmpty(...values: unknown[]): string {
	for (const val of values) {
		if (typeof val === 'string') {
			const trimmed = val.trim();
			if (trimmed.length > 0) return trimmed;
		}
	}
	return '';
}

export class I18nManager {
	locale = $state<Locale>('ar');

	constructor(initialLocale: Locale = 'ar') {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const fromCookie = readLocaleCookie();
			const fromHtml = document.documentElement.lang;
			let fromStorage: string | null = null;
			try {
				fromStorage =
					localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
			} catch {
				// Ignore storage access restrictions (private mode / sandbox)
			}
			const resolved = fromCookie || (fromHtml === 'fr' || fromHtml === 'en' ? fromHtml : null) || fromStorage || initialLocale;
			this.locale = normalizeLocale(resolved);
		} else {
			this.locale = normalizeLocale(initialLocale);
		}
	}

	/**
	 * Safely aligns the reactive locale with the server-rendered locale
	 * during SSR and initial client hydration.
	 */
	hydrate(initial: Locale | string | null | undefined): void {
		const valid = normalizeLocale(initial);
		if (this.locale !== valid) {
			this.locale = valid;
		}
		if (typeof document !== 'undefined') {
			document.documentElement.lang = valid;
			document.documentElement.dir = valid === 'ar' ? 'rtl' : 'ltr';
		}
	}

	setLocale(next: Locale): void {
		const valid = normalizeLocale(next);
		this.locale = valid;

		if (typeof document !== 'undefined') {
			document.documentElement.lang = valid;
			document.documentElement.dir = valid === 'ar' ? 'rtl' : 'ltr';
			try {
				document.cookie = `${COOKIE_NAME}=${valid}; path=/; max-age=31536000; SameSite=Lax`;
			} catch {
				// Ignore cookie errors in restricted contexts
			}
		}

		if (typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, valid);
			} catch {
				// Ignore storage quota or private mode errors
			}
		}
	}

	get dir(): 'rtl' | 'ltr' {
		return this.locale === 'ar' ? 'rtl' : 'ltr';
	}

	get isRtl(): boolean {
		return this.locale === 'ar';
	}

	t(key: string, params?: Record<string, string | number>): string {
		const segments = key.split('.');
		let current: unknown = dictionaries[this.locale];
		let fallback: unknown = dictionaries.ar;

		for (const seg of segments) {
			current =
				current && typeof current === 'object'
					? (current as Record<string, unknown>)[seg]
					: undefined;
			fallback =
				fallback && typeof fallback === 'object'
					? (fallback as Record<string, unknown>)[seg]
					: undefined;
		}

		let text =
			typeof current === 'string'
				? current
				: typeof fallback === 'string'
					? fallback
					: key;

		if (params) {
			for (const [paramKey, paramValue] of Object.entries(params)) {
				text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
			}
		}

		return text;
	}

	/**
	 * Picks the best localized field from a DB/API record:
	 * - ar -> `${base}_ar` / `${base}Ar` -> `${base}` -> `${base}_fr`
	 * - fr -> `${base}_fr` / `${base}Fr` -> `${base}` -> `${base}_ar`
	 * - en -> `${base}_en` / `${base}En` -> `${base}` -> `${base}_fr` -> `${base}_ar`
	 */
	pick(obj: Record<string, any> | null | undefined, base: 'name' | 'title' = 'name'): string {
		if (!obj || typeof obj !== 'object') return '';

		const arSnake = obj[`${base}_ar`];
		const arCamel = obj[`${base}Ar`];
		const frSnake = obj[`${base}_fr`];
		const frCamel = obj[`${base}Fr`];
		const enSnake = obj[`${base}_en`];
		const enCamel = obj[`${base}En`];
		const plain = obj[base];

		if (this.locale === 'fr') {
			return firstNonEmpty(frSnake, frCamel, plain, arSnake, arCamel, enSnake, enCamel);
		}
		if (this.locale === 'en') {
			return firstNonEmpty(enSnake, enCamel, plain, frSnake, frCamel, arSnake, arCamel);
		}
		return firstNonEmpty(arSnake, arCamel, plain, frSnake, frCamel, enSnake, enCamel);
	}

	/**
	 * Returns a crisp, single-word education level label so navbars never wrap:
	 * - "الطور الابتدائي" -> "الابتدائي" / "Primaire" / "Primary"
	 * - "الطور المتوسط" -> "المتوسط" / "Moyen" / "Middle"
	 * - "الطور الثانوي" -> "الثانوي" / "Secondaire" / "Secondary"
	 */
	shortLevelName(lvl: any): string {
		if (!lvl || typeof lvl !== 'object') return '';

		const key = String(lvl.slug ?? lvl.id ?? '').toLowerCase();
		const raw = String(lvl.name_ar ?? lvl.nameAr ?? lvl.name ?? '').toLowerCase();

		if (key.includes('primaire') || key.includes('primary') || raw.includes('ابتدائي')) {
			return this.t('nav.primaire');
		}
		if (key.includes('moyen') || key.includes('middle') || raw.includes('متوسط')) {
			return this.t('nav.moyen');
		}
		if (
			key.includes('secondaire') ||
			key.includes('secondary') ||
			key.includes('lycee') ||
			raw.includes('ثانوي')
		) {
			return this.t('nav.secondaire');
		}

		const localized = this.pick(lvl, 'name');
		return localized
			.replace(/^(الطور|التعليم|المرحلة)\s+/u, '')
			.replace(/^(cycle|enseignement|niveau|education)\s+/i, '')
			.trim();
	}
}

export const i18n = new I18nManager();
