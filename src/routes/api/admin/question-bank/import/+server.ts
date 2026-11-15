import { json } from '@sveltejs/kit';
import { contentDatabase, contentSqlite } from '#lib/server/db';
import { questions, questionCategories } from '#lib/server/db/schema-content';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.questions || !Array.isArray(data.questions)) {
			return json({ error: 'صيغة غير صالحة: مصفوفة الأسئلة مفقودة' }, { status: 400 });
		}

		let importedCategories = 0;
		let importedQuestions = 0;
		const categoryIdMap: Record<number, number> = {};

		// Ensure a fallback category exists if imported questions lack categoryId
		let fallbackCategoryId: number | null = null;
		const existingCat = contentDatabase.select({ id: questionCategories.id }).from(questionCategories).limit(1).get();
		if (existingCat) fallbackCategoryId = existingCat.id;

		contentSqlite.transaction(() => {
			if (Array.isArray(data.categories)) {
				for (const cat of data.categories) {
					const inserted = contentDatabase
						.insert(questionCategories)
						.values({
							name: String(cat.name || 'تصنيف مستورد'),
							description: cat.description || null,
							parentId: cat.parentId ? categoryIdMap[cat.parentId] || null : null,
							yearSubjectId: cat.yearSubjectId || null
						})
						.returning()
						.get();
					if (inserted) {
						categoryIdMap[cat.id] = inserted.id;
						if (fallbackCategoryId === null) fallbackCategoryId = inserted.id;
						importedCategories++;
					}
				}
			}

			if (fallbackCategoryId === null && data.questions.some((q: any) => !q.categoryId)) {
				const created = contentDatabase
					.insert(questionCategories)
					.values({ name: 'تصنيف عام (مستورد)', description: 'تم إنشاؤه تلقائياً عند الاستيراد' })
					.returning()
					.get();
				fallbackCategoryId = created.id;
				importedCategories++;
			}

			for (const q of data.questions) {
				const rawData = q.questionData ?? q.question_data ?? {};
				const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
				const resolvedCategoryId = q.categoryId
					? categoryIdMap[q.categoryId] || Number(q.categoryId)
					: fallbackCategoryId!;

				contentDatabase
					.insert(questions)
					.values({
						categoryId: resolvedCategoryId,
						type: q.type,
						difficulty: q.difficulty || 'medium',
						questionText: q.questionText || q.question_text || '',
						questionTextAr: q.questionTextAr || q.question_text_ar || '',
						imageUrl: q.imageUrl || q.image_url || null,
						imageCaption: q.imageCaption || q.image_caption || null,
						questionData: parsedData,
						explanation: q.explanation || null
					})
					.run();
				importedQuestions++;
			}
		})();

		return json({
			success: true,
			importedCategories,
			importedQuestions
		});
	} catch (err: any) {
		return json({ error: err.message || 'فشل الاستيراد' }, { status: 500 });
	}
};
