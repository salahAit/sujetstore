import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq, or, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
    const streamId = params.id;
    
    // Get stream details
    const stream = await contentDatabase.query.streams.findFirst({
        where: eq(contentSchema.streams.id, streamId)
    });

    if (!stream) {
        throw error(404, 'الشعبة غير موجودة');
    }

    // Load available subjects
    const allSubjects = await contentDatabase.select().from(contentSchema.subjects).all();

    // Load available years
    const allYears = await contentDatabase.select().from(contentSchema.years).all();

    // Load linked subjects for this stream
    const linkedSubjects = await contentDatabase
        .select({
            id: contentSchema.streamSubjects.id,
            streamId: contentSchema.streamSubjects.streamId,
            subjectId: contentSchema.streamSubjects.subjectId,
            yearId: contentSchema.streamSubjects.yearId,
            coefficient: contentSchema.streamSubjects.coefficient,
            order: contentSchema.streamSubjects.order,
            subjectNameAr: contentSchema.subjects.nameAr,
            yearNameAr: contentSchema.years.nameAr
        })
        .from(contentSchema.streamSubjects)
        .leftJoin(contentSchema.subjects, eq(contentSchema.streamSubjects.subjectId, contentSchema.subjects.id))
        .leftJoin(contentSchema.years, eq(contentSchema.streamSubjects.yearId, contentSchema.years.id))
        .where(eq(contentSchema.streamSubjects.streamId, streamId))
        .all();

    return { 
        stream, 
        linkedSubjects, 
        allSubjects, 
        allYears 
    };
};

export const actions: Actions = {
    addSubject: async ({ request, params }) => {
        const streamId = params.id;
        const formData = await request.formData();
        
        const subjectId = formData.get('subjectId') as string;
        const yearId = formData.get('yearId') as string;
        const coefficient = parseInt(formData.get('coefficient') as string) || null;
        const order = parseInt(formData.get('order') as string) || 0;

        if (!subjectId) {
            return fail(400, { error: true, message: 'يجب اختيار المادة الدراسية' });
        }

        try {
            await contentDatabase.insert(contentSchema.streamSubjects).values({
                streamId,
                subjectId,
                yearId: yearId || null,
                coefficient,
                order
            });
            return { success: true };
        } catch (err) {
            console.error('Add Subject Error:', err);
            return fail(500, { error: true, message: 'حدث خطأ أثناء إضافة المادة' });
        }
    },
    updateSubject: async ({ request, params }) => {
        const streamId = params.id;
        const formData = await request.formData();
        
        const id = parseInt(formData.get('id') as string);
        const subjectId = formData.get('subjectId') as string;
        const yearId = formData.get('yearId') as string;
        const coefficient = parseInt(formData.get('coefficient') as string) || null;
        const order = parseInt(formData.get('order') as string) || 0;

        if (!id || !subjectId) {
            return fail(400, { error: true, message: 'بيانات غير مكتملة للتعديل' });
        }

        try {
            await contentDatabase.update(contentSchema.streamSubjects)
                .set({
                    subjectId,
                    yearId: yearId || null,
                    coefficient,
                    order
                })
                .where(eq(contentSchema.streamSubjects.id, id));
            return { success: true };
        } catch (err) {
            console.error('Update Subject Error:', err);
            return fail(500, { error: true, message: 'حدث خطأ أثناء التعديل' });
        }
    },
    removeSubject: async ({ request }) => {
        const formData = await request.formData();
        const id = parseInt(formData.get('id') as string);
        
        if (!id) return fail(400, { error: true, message: 'معرف الربط مفقود' });

        try {
            await contentDatabase.delete(contentSchema.streamSubjects).where(eq(contentSchema.streamSubjects.id, id));
            return { success: true };
        } catch (err) {
            return fail(500, { error: true, message: 'حدث خطأ أثناء إزالة المادة' });
        }
    }
};
