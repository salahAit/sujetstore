import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const streams = await contentDatabase.select().from(contentSchema.streams).all();
    return { streams };
};

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const nameAr = formData.get('nameAr') as string;
        const nameFr = formData.get('nameFr') as string;

        if (!id || !name || !nameAr || !nameFr) {
            return fail(400, { error: true, message: 'يرجى تعبئة جميع الحقول المطلوبة' });
        }

        try {
            await contentDatabase.insert(contentSchema.streams).values({
                id,
                name,
                nameAr,
                nameFr
            });
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'حدث خطأ أثناء الإضافة. قد يكون المعرف موجوداً مسبقاً.' });
        }
    },
    update: async ({ request }) => {
        const formData = await request.formData();
        const originalId = formData.get('originalId') as string;
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const nameAr = formData.get('nameAr') as string;
        const nameFr = formData.get('nameFr') as string;

        if (!originalId || !id || !name || !nameAr || !nameFr) {
            return fail(400, { error: true, message: 'يرجى تعبئة جميع الحقول المطلوبة' });
        }

        try {
            await contentDatabase.update(contentSchema.streams)
                .set({
                    id,
                    name,
                    nameAr,
                    nameFr
                })
                .where(eq(contentSchema.streams.id, originalId));
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'حدث خطأ أثناء التعديل. قد يكون المعرف موجوداً مسبقاً.' });
        }
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        if (!id) return fail(400, { error: true, message: 'معرف الشعبة مفقود' });

        try {
            await contentDatabase.delete(contentSchema.streams).where(eq(contentSchema.streams.id, id));
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'لا يمكن حذف الشعبة لاحتوائها على بيانات مرتبطة' });
        }
    }
};
