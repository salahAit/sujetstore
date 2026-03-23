import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		// Fetch exercises with classification info
		const exercises = await contentDatabase
			.select({
				id: contentSchema.bankExercises.id,
				title: contentSchema.bankExercises.title,
				points: contentSchema.bankExercises.points,
				unit: contentSchema.bankExercises.unit,
				trimesterId: contentSchema.bankExercises.trimesterId,
				createdAt: contentSchema.bankExercises.createdAt,
				subjectName: contentSchema.subjects.nameAr,
				yearName: contentSchema.years.nameAr,
				levelName: contentSchema.educationLevels.nameAr,
				levelId: contentSchema.educationLevels.id,
				yearId: contentSchema.years.id,
				streamId: contentSchema.streams.id,
				streamName: contentSchema.streams.nameAr,
				yearSubjectId: contentSchema.bankExercises.yearSubjectId
			})
			.from(contentSchema.bankExercises)
			.leftJoin(contentSchema.yearSubjects, eq(contentSchema.bankExercises.yearSubjectId, contentSchema.yearSubjects.id))
			.leftJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
			.leftJoin(contentSchema.years, eq(contentSchema.yearSubjects.yearId, contentSchema.years.id))
			.leftJoin(contentSchema.educationLevels, eq(contentSchema.years.levelId, contentSchema.educationLevels.id))
			.leftJoin(contentSchema.streams, eq(contentSchema.yearSubjects.streamId, contentSchema.streams.id))
			.orderBy(desc(contentSchema.bankExercises.createdAt))
			.all();

		// Fetch metadata for filters
		const levels = await contentDatabase.select().from(contentSchema.educationLevels).all();
		const years = await contentDatabase.select().from(contentSchema.years).all();
		const streams = await contentDatabase.select().from(contentSchema.streams).all();
		const levelStreams = await contentDatabase.select().from(contentSchema.levelStreams).all();
		const subjects = await contentDatabase.select().from(contentSchema.subjects).all();
		const trimesters = await contentDatabase.select().from(contentSchema.trimesters).all();
		const yearSubjects = await contentDatabase
			.select({
				id: contentSchema.yearSubjects.id,
				yearId: contentSchema.yearSubjects.yearId,
				streamId: contentSchema.yearSubjects.streamId,
				subjectId: contentSchema.yearSubjects.subjectId,
				subjectName: contentSchema.subjects.nameAr
			})
			.from(contentSchema.yearSubjects)
			.leftJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
			.all();

		return {
			exercises,
			metadata: {
				levels,
				years,
				streams,
				levelStreams,
				subjects,
				trimesters,
				yearSubjects
			}
		};
	} catch (e: any) {
		console.error("Error loading exercises:", e);
		return {
			exercises: [],
			metadata: { levels: [], years: [], streams: [], levelStreams: [], subjects: [], trimesters: [], yearSubjects: [] },
			error: e.message
		};
	}
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		
		if (!id) return fail(400, { message: 'ID مفقود' });

		try {
			await contentDatabase
				.delete(contentSchema.bankExercises)
				.where(eq(contentSchema.bankExercises.id, id));
			return { success: true };
		} catch (e: any) {
			return fail(500, { message: e.message });
		}
	},
	import: async ({ request }) => {
		const formData = await request.formData();
		const exercisesDataStr = formData.get('exercisesData') as string;
		
		if (!exercisesDataStr) return fail(400, { message: 'بيانات غير صالحة' });

		try {
			const exercises = JSON.parse(exercisesDataStr);
			const exercisesToInsert = Array.isArray(exercises) ? exercises : [exercises];

			const inserts = exercisesToInsert.map(ex => ({
				title: ex.title || 'تمرين مستورد',
				yearSubjectId: Number(ex.yearSubjectId) || 1, // Fallback if missing, though schema requires it
				trimesterId: ex.trimesterId || null,
				unit: ex.unit || null,
				points: Number(ex.points) || 0,
				content: ex.content || [],
			}));

			if (inserts.length === 0) return fail(400, { message: 'الملف فارغ' });

			await contentDatabase.insert(contentSchema.bankExercises).values(inserts);
			
			return { success: true, message: `تم استيراد ${inserts.length} تمارين بنجاح` };
		} catch (e: any) {
			return fail(500, { message: 'خطأ في الاستيراد: ' + e.message });
		}
	}
};
