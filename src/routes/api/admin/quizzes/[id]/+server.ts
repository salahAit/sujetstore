import { json } from '@sveltejs/kit';
import { contentDatabase } from '#lib/server/db';
import { quizzes, quizQuestions, questions } from '#lib/server/db/schema-content';
import { eq, asc } from 'drizzle-orm';

function normalizeTier(tier: unknown, isPremiumFlag?: boolean): 'public' | 'registered' | 'premium' {
	if (tier === 'registered' || tier === 'premium' || tier === 'public') return tier;
	return isPremiumFlag ? 'premium' : 'public';
}

export async function GET({ params, locals }) {
	if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const quizId = parseInt(params.id, 10);
	const [quiz] = await contentDatabase.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
	if (!quiz) return json({ error: 'Not found' }, { status: 404 });

	const rawQuestions = await contentDatabase
		.select({
			id: quizQuestions.id,
			quizId: quizQuestions.quizId,
			questionId: quizQuestions.questionId,
			points: quizQuestions.points,
			order: quizQuestions.order,
			type: questions.type,
			difficulty: questions.difficulty,
			questionText: questions.questionText,
			questionTextAr: questions.questionTextAr,
			imageUrl: questions.imageUrl,
			imageCaption: questions.imageCaption,
			questionData: questions.questionData,
			explanation: questions.explanation
		})
		.from(quizQuestions)
		.innerJoin(questions, eq(quizQuestions.questionId, questions.id))
		.where(eq(quizQuestions.quizId, quizId))
		.orderBy(asc(quizQuestions.order));

	return json({
		...quiz,
		questions: rawQuestions
	});
}

export async function PUT({ params, request, locals }) {
	if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const quizId = parseInt(params.id, 10);
	const data = await request.json();
	const accessTier = normalizeTier(data.accessTier, !!data.isPremium);

	try {
		await contentDatabase
			.update(quizzes)
			.set({
				title: data.title,
				titleAr: data.titleAr,
				description: data.description,
				difficulty: data.difficulty,
				timeLimit: Number(data.timeLimit) || 0,
				passingScore: Number(data.passingScore) || 60,
				shuffleOptions: !!data.shuffleOptions,
				maxAttempts: Number(data.maxAttempts) || 0,
				gradingMethod: data.gradingMethod || 'best',
				showAnswers: data.showAnswers ?? true,
				practiceMode: !!data.practiceMode,
				...(data.yearSubjectId ? { yearSubjectId: Number(data.yearSubjectId) } : {}),
				...(data.trimesterId !== undefined ? { trimesterId: data.trimesterId || null } : {}),
				accessTier,
				isPremium: accessTier === 'premium',
				isPublished: !!data.isPublished,
				updatedAt: new Date().toISOString()
			})
			.where(eq(quizzes.id, quizId));

		return json({ success: true });
	} catch {
		return json({ error: 'Failed to update quiz' }, { status: 500 });
	}
}

export async function DELETE({ params, locals }) {
	if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const quizId = parseInt(params.id, 10);
	try {
		await contentDatabase.delete(quizzes).where(eq(quizzes.id, quizId));
		return json({ success: true });
	} catch {
		return json({ error: 'Failed to delete quiz' }, { status: 500 });
	}
}
