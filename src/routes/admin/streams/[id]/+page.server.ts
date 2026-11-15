import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '#lib/server/db/index';
import { syncStreamSubjectToYearSubjects } from '#lib/server/visibility';
import { eq, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const streamId = params.id;

	const stream = await contentDatabase.query.streams.findFirst({
		where: eq(contentSchema.streams.id, streamId)
	});

	if (!stream) {
		throw error(404, 'الشعبة غير موجودة');
	}

	const allSubjects = await contentDatabase.select().from(contentSchema.subjects).all();
	const allYears = await contentDatabase.select().from(contentSchema.years).all();

	const linkedSubjects = await contentDatabase
		.select({
			id: contentSchema.streamSubjects.id,
			streamId: contentSchema.streamSubjects.streamId,
			subjectId: contentSchema.streamSubjects.subjectId,
			yearId: contentSchema.streamSubjects.yearId,
			coefficient: contentSchema.streamSubjects.coefficient,
			order: contentSchema.streamSubjects.order,
			visibility: contentSchema.streamSubjects.visibility,
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
		const yearId = (formData.get('yearId') as string) || null;
		const coefficient = parseInt(formData.get('coefficient') as string, 10) || null;
		const order = parseInt(formData.get('order') as string, 10) || 0;

		if (!subjectId) {
			return fail(400, { error: true, message: 'يجب اختيار المادة الدراسية' });
		}

		try {
			await contentDatabase.insert(contentSchema.streamSubjects).values({
				streamId,
				subjectId,
				yearId,
				coefficient,
				order,
				visibility: 'hidden'
			});

			await syncStreamSubjectToYearSubjects({
				streamId,
				subjectId,
				yearId,
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

		const id = parseInt(formData.get('id') as string, 10);
		const subjectId = formData.get('subjectId') as string;
		const yearId = (formData.get('yearId') as string) || null;
		const coefficient = parseInt(formData.get('coefficient') as string, 10) || null;
		const order = parseInt(formData.get('order') as string, 10) || 0;

		if (!id || !subjectId) {
			return fail(400, { error: true, message: 'بيانات غير مكتملة للتعديل' });
		}

		try {
			await contentDatabase
				.update(contentSchema.streamSubjects)
				.set({
					subjectId,
					yearId,
					coefficient,
					order
				})
				.where(eq(contentSchema.streamSubjects.id, id));

			await syncStreamSubjectToYearSubjects({
				streamId,
				subjectId,
				yearId,
				coefficient,
				order
			});

			return { success: true };
		} catch (err) {
			console.error('Update Subject Error:', err);
			return fail(500, { error: true, message: 'حدث خطأ أثناء التعديل' });
		}
	},
	removeSubject: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id') as string, 10);

		if (!id) return fail(400, { error: true, message: 'معرف الربط مفقود' });

		try {
			const existing = await contentDatabase
				.select()
				.from(contentSchema.streamSubjects)
				.where(eq(contentSchema.streamSubjects.id, id))
				.get();

			await contentDatabase
				.delete(contentSchema.streamSubjects)
				.where(eq(contentSchema.streamSubjects.id, id));

			if (existing) {
				const conds = [
					eq(contentSchema.yearSubjects.streamId, existing.streamId),
					eq(contentSchema.yearSubjects.subjectId, existing.subjectId)
				];
				if (existing.yearId) {
					conds.push(eq(contentSchema.yearSubjects.yearId, existing.yearId));
				}
				await contentDatabase
					.delete(contentSchema.yearSubjects)
					.where(and(...conds))
					.catch(() => {});
			}

			return { success: true };
		} catch {
			return fail(500, { error: true, message: 'حدث خطأ أثناء إزالة المادة (قد تحتوي على وثائق مرتبطة)' });
		}
	}
};
