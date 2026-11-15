import { json } from '@sveltejs/kit';
import { contentDatabase } from '#lib/server/db';
import { quizzes } from '#lib/server/db/schema-content';
import { desc } from 'drizzle-orm';
import slugify from 'slugify';

function normalizeTier(tier: unknown, isPremiumFlag?: boolean): 'public' | 'registered' | 'premium' {
	if (tier === 'registered' || tier === 'premium' || tier === 'public') return tier;
	return isPremiumFlag ? 'premium' : 'public';
}

export async function GET({ locals }) {
	if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const allQuizzes = await contentDatabase.select().from(quizzes).orderBy(desc(quizzes.updatedAt));
	return json(allQuizzes);
}

export async function POST({ request, locals }) {
	if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	try {
		const data = await request.json();
		const slug =
			slugify(`${data.title}-${Date.now()}`, { lower: true, strict: true }) || `quiz-${Date.now()}`;
		const accessTier = normalizeTier(data.accessTier, !!data.isPremium);

		const newQuiz = await contentDatabase
			.insert(quizzes)
			.values({
				yearSubjectId: Number(data.yearSubjectId),
				trimesterId: data.trimesterId || null,
				title: data.title,
				titleAr: data.titleAr,
				slug,
				description: data.description || null,
				difficulty: data.difficulty || 'medium',
				timeLimit: Number(data.timeLimit) || 0,
				passingScore: Number(data.passingScore) || 60,
				shuffleOptions: !!data.shuffleOptions,
				maxAttempts: Number(data.maxAttempts) || 0,
				gradingMethod: data.gradingMethod || 'best',
				showAnswers: data.showAnswers ?? true,
				practiceMode: !!data.practiceMode,
				accessTier,
				isPremium: accessTier === 'premium',
				isPublished: !!data.isPublished
			})
			.returning()
			.get();

		return json({ success: true, quiz: newQuiz });
	} catch (error) {
		console.error('Failed to create quiz:', error);
		return json({ error: 'Failed to create quiz' }, { status: 500 });
	}
}
