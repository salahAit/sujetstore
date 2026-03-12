import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { quizzes, quizQuestions, questions } from '$lib/server/db/schema-content';
import { eq, asc } from 'drizzle-orm';

export async function POST({ params, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);

    try {
        // Get original quiz
        const [originalQuiz] = await contentDatabase
            .select()
            .from(quizzes)
            .where(eq(quizzes.id, quizId))
            .limit(1);

        if (!originalQuiz) {
            return json({ error: 'Quiz not found' }, { status: 404 });
        }

        // Create duplicated quiz with unique slug
        const timestamp = Date.now();
        const [newQuiz] = await contentDatabase
            .insert(quizzes)
            .values({
                yearSubjectId: originalQuiz.yearSubjectId,
                trimesterId: originalQuiz.trimesterId,
                title: originalQuiz.title + ' (نسخة)',
                titleAr: (originalQuiz.titleAr || '') + ' (نسخة)',
                slug: `${originalQuiz.slug}-copy-${timestamp}`,
                description: originalQuiz.description,
                difficulty: originalQuiz.difficulty,
                timeLimit: originalQuiz.timeLimit,
                questionCount: originalQuiz.questionCount,
                passingScore: originalQuiz.passingScore,
                shuffleOptions: originalQuiz.shuffleOptions,
                maxAttempts: originalQuiz.maxAttempts,
                gradingMethod: originalQuiz.gradingMethod,
                showAnswers: originalQuiz.showAnswers,
                practiceMode: originalQuiz.practiceMode,
                isPremium: originalQuiz.isPremium,
                isPublished: false // Always start as draft
            })
            .returning();

        // Copy all quiz-question links
        const originalLinks = await contentDatabase
            .select()
            .from(quizQuestions)
            .where(eq(quizQuestions.quizId, quizId))
            .orderBy(asc(quizQuestions.order));

        for (const link of originalLinks) {
            await contentDatabase.insert(quizQuestions).values({
                quizId: newQuiz.id,
                questionId: link.questionId,
                points: link.points,
                order: link.order
            });
        }

        return json({ success: true, quiz: newQuiz });
    } catch (err: any) {
        return json({ error: err.message }, { status: 500 });
    }
}
