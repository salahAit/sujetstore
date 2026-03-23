import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	
	let exercise = null;
	if (id !== 'new') {
		const result = await contentDatabase
			.select()
			.from(contentSchema.bankExercises)
			.where(eq(contentSchema.bankExercises.id, Number(id)))
			.limit(1)
			.all();
		
		if (result.length === 0) throw error(404, 'التمرين غير موجود');
		exercise = result[0];
	}

	// Fetch all metadata for the editor
	const levels = await contentDatabase.select().from(contentSchema.educationLevels).all();
	const years = await contentDatabase.select().from(contentSchema.years).all();
	const subjects = await contentDatabase.select().from(contentSchema.subjects).all();
	const trimesters = await contentDatabase.select().from(contentSchema.trimesters).all();
	const yearSubjects = await contentDatabase
		.select({
			id: contentSchema.yearSubjects.id,
			yearId: contentSchema.yearSubjects.yearId,
			subjectId: contentSchema.yearSubjects.subjectId,
			subjectName: contentSchema.subjects.nameAr
		})
		.from(contentSchema.yearSubjects)
		.leftJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
		.all();

	return {
		exercise,
		metadata: {
			levels,
			years,
			subjects,
			trimesters,
			yearSubjects
		}
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const { id } = params;
		const formData = await request.formData();
		
		const title = formData.get('title') as string;
		const points = Number(formData.get('points'));
		const yearSubjectId = Number(formData.get('yearSubjectId'));
		const trimesterId = formData.get('trimesterId') as string || null;
		const unit = formData.get('unit') as string || null;
		const contentJson = formData.get('content') as string;
		
		if (!title || !yearSubjectId || !contentJson) {
			return fail(400, { message: 'يرجى تعبئة جميع الحقول الإلزامية' });
		}

		let content;
		try {
			content = JSON.parse(contentJson);
		} catch (e) {
			return fail(400, { message: 'خطأ في تنسيق المحتوى' });
		}

		try {
			if (id === 'new') {
				const [newEx] = await contentDatabase.insert(contentSchema.bankExercises).values({
					title,
					points,
					yearSubjectId,
					trimesterId,
					unit,
					content,
                    createdAt: (new Date()).toISOString(),
                    updatedAt: (new Date()).toISOString()
				}).returning();
				
				throw redirect(303, `/admin/exercises/${newEx.id}?success=true`);
			} else {
				await contentDatabase.update(contentSchema.bankExercises)
					.set({
						title,
						points,
						yearSubjectId,
						trimesterId,
						unit,
						content,
						updatedAt: (new Date()).toISOString()
					})
					.where(eq(contentSchema.bankExercises.id, Number(id)));
				
				return { success: true };
			}
		} catch (e: any) {
			if (e.status === 303) throw e; // Handle redirect correctly
			return fail(500, { message: e.message });
		}
	}
};
