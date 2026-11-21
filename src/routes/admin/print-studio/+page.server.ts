import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isStaffRole } from '#lib/server/auth';
import { contentSqlite } from '#lib/server/db';
import {
	DEFAULT_TYPST_STYLE,
	deleteStyleProfile,
	listAvailableFonts,
	listAvailableLogos,
	listStyleProfiles,
	upsertStyleProfile,
	type StyleScopeType,
	type TypstStyleConfig
} from '#lib/server/print-style';
import {
	countRebuildTargets,
	getRamWorkspaceRoot,
	listRecentRebuildJobs
} from '#lib/server/typst-batch-ram';

const VALID_SCOPES = new Set<StyleScopeType>([
	'global',
	'language',
	'level',
	'year',
	'subject',
	'doc_type'
]);

export const load: PageServerLoad = async () => {
	const profiles = listStyleProfiles();
	const fonts = listAvailableFonts();
	const logos = listAvailableLogos();
	const recentJobs = listRecentRebuildJobs();
	const ramInfo = getRamWorkspaceRoot();
	const totalExamDocs = countRebuildTargets({ all: true });

	const levels = contentSqlite
		.query(`SELECT id, name_ar AS nameAr FROM education_levels ORDER BY "order" ASC`)
		.all() as Array<{ id: string; nameAr: string }>;

	const years = contentSqlite
		.query(`SELECT id, level_id AS levelId, name_ar AS nameAr FROM years ORDER BY id ASC`)
		.all() as Array<{ id: string; levelId: string; nameAr: string }>;

	const subjects = contentSqlite
		.query(
			`SELECT DISTINCT s.id, s.name_ar AS nameAr
			 FROM subjects s
			 JOIN year_subjects ys ON ys.subject_id = s.id
			 ORDER BY s.name_ar ASC`
		)
		.all() as Array<{ id: string; nameAr: string }>;

	return {
		profiles,
		defaultStyle: DEFAULT_TYPST_STYLE,
		fonts,
		logos,
		recentJobs,
		ramInfo,
		totalExamDocs,
		levels,
		years,
		subjects
	};
};

export const actions: Actions = {
	saveProfile: async ({ request, locals }) => {
		if (!locals.user || !isStaffRole(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بتعديل إعدادات الطباعة' });
		}

		const fd = await request.formData();
		const scopeTypeRaw = String(fd.get('scopeType') || 'global').trim() as StyleScopeType;
		if (!VALID_SCOPES.has(scopeTypeRaw)) {
			return fail(400, { error: 'نوع النطاق غير صالح' });
		}

		const scopeValue =
			scopeTypeRaw === 'global' ? 'default' : String(fd.get('scopeValue') || '').trim();
		if (!scopeValue) {
			return fail(400, { error: 'يرجى تحديد قيمة النطاق المستهدف' });
		}

		const labelAr = String(fd.get('labelAr') || '').trim() || `${scopeTypeRaw}:${scopeValue}`;
		const isActive = fd.get('isActive') !== 'false' && fd.get('isActive') !== '0';
		const configJsonRaw = String(fd.get('configJson') || '{}');

		let configObj: Partial<TypstStyleConfig>;
		try {
			configObj = JSON.parse(configJsonRaw) as Partial<TypstStyleConfig>;
		} catch {
			return fail(400, { error: 'تعذّر قراءة بيانات الإعدادات (JSON غير صالح)' });
		}

		try {
			const savedProfile = upsertStyleProfile({
				scopeType: scopeTypeRaw,
				scopeValue,
				labelAr,
				config: configObj,
				isActive
			});

			return {
				success: true,
				action: 'saveProfile' as const,
				savedProfile,
				profiles: listStyleProfiles(),
				message: `تم حفظ ملف الهوية البصرية «${savedProfile.labelAr}» بنجاح`
			};
		} catch (err: any) {
			return fail(400, { error: err?.message || 'فشل حفظ ملف الهوية البصرية' });
		}
	},

	deleteProfile: async ({ request, locals }) => {
		if (!locals.user || !isStaffRole(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بحذف ملفات الطباعة' });
		}

		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { error: 'معرّف الملف غير صالح' });
		}

		const res = deleteStyleProfile(id);
		if (!res.deleted) {
			return fail(400, { error: res.reason || 'تعذّر حذف الملف' });
		}

		return {
			success: true,
			action: 'deleteProfile' as const,
			profiles: listStyleProfiles(),
			message: 'تم حذف ملف التخصيص بنجاح'
		};
	}
};
