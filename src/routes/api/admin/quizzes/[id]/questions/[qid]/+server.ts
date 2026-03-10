import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { quizQuestions, quizzes } from '$lib/server/db/schema-content';
import { eq, sql } from 'drizzle-orm';

// Update individual question
export async function PUT({ params, request, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const questionId = parseInt(params.qid);
    const data = await request.json();

    try {
        await contentDatabase
            .update(quizQuestions)
            .set({
                questionText: data.questionText,
                questionTextAr: data.questionTextAr,
                questionData: JSON.stringify(data.questionData || {}),
                explanation: data.explanation || '',
                points: data.points || 1
            })
            .where(eq(quizQuestions.id, questionId));

        return json({ success: true });
    } catch (error) {
        console.error('Update question error:', error);
        return json({ error: 'Failed to update question' }, { status: 500 });
    }
}

// Delete question
export async function DELETE({ params, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);
    const questionId = parseInt(params.qid);

    try {
        await contentDatabase.delete(quizQuestions).where(eq(quizQuestions.id, questionId));

        // Update quiz question count
        await contentDatabase
            .update(quizzes)
            .set({ questionCount: sql`question_count - 1` })
            .where(eq(quizzes.id, quizId));

        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to delete question' }, { status: 500 });
    }
}
