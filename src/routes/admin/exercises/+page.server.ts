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
				yearSubjectId: contentSchema.bankExercises.yearSubjectId
			})
			.from(contentSchema.bankExercises)
			.leftJoin(contentSchema.yearSubjects, eq(contentSchema.bankExercises.yearSubjectId, contentSchema.yearSubjects.id))
			.leftJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
			.leftJoin(contentSchema.years, eq(contentSchema.yearSubjects.yearId, contentSchema.years.id))
			.leftJoin(contentSchema.educationLevels, eq(contentSchema.years.levelId, contentSchema.educationLevels.id))
			.orderBy(desc(contentSchema.bankExercises.createdAt))
			.all();

		// Fetch metadata for filters
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
			exercises,
			metadata: {
				levels,
				years,
				subjects,
				trimesters,
				yearSubjects
			}
		};
	} catch (e: any) {
		console.error("Error loading exercises:", e);
		return {
			exercises: [],
			metadata: { levels: [], years: [], subjects: [], trimesters: [], yearSubjects: [] },
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
	}
};
