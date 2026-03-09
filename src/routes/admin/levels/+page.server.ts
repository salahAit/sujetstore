import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const levels = await contentDatabase.select().from(contentSchema.educationLevels).all();
    return { levels };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const nameAr = formData.get('nameAr') as string;
        const nameFr = formData.get('nameFr') as string;
        const slug = formData.get('slug') as string;
        const icon = formData.get('icon') as string;
        const color = formData.get('color') as string;

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
                order: 0
            });
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'حدث خطأ أثناء الإضافة. قد يكون المعرف أو الرابط موجوداً مسبقاً.' });
        }
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        if (!id) return fail(400, { error: true, message: 'معرف المرحلة مفقود' });

        try {
            // Basic protection, will fail if there are constraints or children records (years)
            await contentDatabase.delete(contentSchema.educationLevels).where(eq(contentSchema.educationLevels.id, id));
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'لا يمكن حذف المرحلة لاحتوائها على بيانات مرتبطة' });
        }
    }
};
