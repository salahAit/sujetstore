import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { quizQuestions, quizzes } from '$lib/server/db/schema-content';
import { eq, sql } from 'drizzle-orm';

// Add new question
export async function POST({ params, request, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);
    const data = await request.json();

    try {
        // Get highest order to append
        const [lastQ] = await contentDatabase
            .select({ maxOrder: sql<number>`max("order")` })
            .from(quizQuestions)
            .where(eq(quizQuestions.quizId, quizId));

        const newOrder = (lastQ?.maxOrder ?? -1) + 1;

        const newQuestion = await contentDatabase
            .insert(quizQuestions)
            .values({
                quizId,
                type: data.type,
                questionText: data.questionText,
                questionTextAr: data.questionTextAr,
                questionData: JSON.stringify(data.questionData || {}),
                explanation: data.explanation || '',
                points: data.points || 1,
                order: newOrder
            })
            .returning()
            .get();

        // Update quiz question count
        await contentDatabase
            .update(quizzes)
            .set({ questionCount: sql`question_count + 1` })
            .where(eq(quizzes.id, quizId));

        return json({ success: true, question: { ...newQuestion, questionData: JSON.parse(newQuestion.questionData) } });
    } catch (error) {
        console.error('Add question error:', error);
        return json({ error: 'Failed to add question' }, { status: 500 });
    }
}

// Reorder questions
export async function PUT({ params, request, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);
    const data = await request.json(); // expect array of { id, order }

    try {
        // Drizzle SQLite doesn't have true bulk update, so we do it in a transaction
        await contentDatabase.transaction(async (tx) => {
            for (const item of data.orders) {
                await tx
                    .update(quizQuestions)
                    .set({ order: item.order })
                    .where(eq(quizQuestions.id, item.id));
            }
        });

        return json({ success: true });
    } catch (error) {
        console.error('Reorder error:', error);
        return json({ error: 'Failed to reorder questions' }, { status: 500 });
    }
}
