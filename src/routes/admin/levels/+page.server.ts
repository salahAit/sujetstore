import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '#lib/server/db/index';
import { asc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const levels = await contentDatabase
		.select()
		.from(contentSchema.educationLevels)
		.orderBy(asc(contentSchema.educationLevels.order))
		.all();
	return { levels };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const id = (formData.get('id') as string)?.trim();
		const name = (formData.get('name') as string)?.trim();
		const nameAr = (formData.get('nameAr') as string)?.trim();
		const nameFr = (formData.get('nameFr') as string)?.trim();
		const slug = (formData.get('slug') as string)?.trim();
		const icon = (formData.get('icon') as string)?.trim();
		const color = (formData.get('color') as string)?.trim();
		const visibilityRaw = (formData.get('visibility') as string) || 'hidden';
		const visibility =
			visibilityRaw === 'published' || visibilityRaw === 'coming_soon' ? visibilityRaw : 'hidden';

		if (!id || !name || !nameAr || !nameFr || !slug) {
			return fail(400, { error: true, message: 'يرجى تعبئة جميع الحقول المطلوبة' });
		}

		try {
			await contentDatabase.insert(contentSchema.educationLevels).values({
				id,
				name,
				nameAr,
				nameFr,
				slug,
				icon: icon || null,
				color: color || null,
				order: 0,
				visibility
			});
			return { success: true };
		} catch {
			return fail(500, {
				error: true,
				message: 'حدث خطأ أثناء الإضافة. قد يكون المعرف أو الرابط موجوداً مسبقاً.'
			});
		}
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = (formData.get('id') as string)?.trim();
		const name = (formData.get('name') as string)?.trim();
		const nameAr = (formData.get('nameAr') as string)?.trim();
		const nameFr = (formData.get('nameFr') as string)?.trim();
		const slug = (formData.get('slug') as string)?.trim();
		const icon = (formData.get('icon') as string)?.trim();
		const color = (formData.get('color') as string)?.trim();
		const visibilityRaw = formData.get('visibility') as string | null;

		if (!id || !nameAr || !nameFr || !slug) {
			return fail(400, { error: true, message: 'بيانات المرحلة غير مكتملة' });
		}

		const updatePayload: Record<string, any> = {
			name: name || nameAr,
			nameAr,
			nameFr,
			slug,
			icon: icon || null,
			color: color || null
		};
		if (visibilityRaw === 'published' || visibilityRaw === 'coming_soon' || visibilityRaw === 'hidden') {
			updatePayload.visibility = visibilityRaw;
		}

		try {
			await contentDatabase
				.update(contentSchema.educationLevels)
				.set(updatePayload)
				.where(eq(contentSchema.educationLevels.id, id));
			return { success: true };
		} catch {
			return fail(500, { error: true, message: 'حدث خطأ أثناء تعديل المرحلة' });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		if (!id) return fail(400, { error: true, message: 'معرف المرحلة مفقود' });

		try {
			await contentDatabase
				.delete(contentSchema.educationLevels)
				.where(eq(contentSchema.educationLevels.id, id));
			return { success: true };
		} catch {
			return fail(500, {
				error: true,
				message: 'لا يمكن حذف المرحلة لاحتوائها على بيانات مرتبطة'
			});
		}
	}
};
