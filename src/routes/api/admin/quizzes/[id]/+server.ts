import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { quizzes, quizQuestions } from '$lib/server/db/schema-content';
import { eq, asc } from 'drizzle-orm';

// Get quiz details + questions
export async function GET({ params, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);

    const [quiz] = await contentDatabase.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);

    if (!quiz) return json({ error: 'Not found' }, { status: 404 });

    const questions = await contentDatabase
        .select()
        .from(quizQuestions)
        .where(eq(quizQuestions.quizId, quizId))
        .orderBy(asc(quizQuestions.order));

    return json({
        ...quiz,
        questions: questions.map((q) => ({ ...q, questionData: JSON.parse(q.questionData) }))
    });
}

// Update quiz metadata
export async function PUT({ params, request, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);
    const data = await request.json();

    try {
        await contentDatabase
            .update(quizzes)
            .set({
                title: data.title,
                titleAr: data.titleAr,
                description: data.description,
                difficulty: data.difficulty,
                timeLimit: data.timeLimit,
                passingScore: data.passingScore,
                isPremium: data.isPremium,
                isPublished: data.isPublished
            })
            .where(eq(quizzes.id, quizId));

        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to update quiz' }, { status: 500 });
    }
}

// Delete quiz
export async function DELETE({ params, locals }) {
    if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const quizId = parseInt(params.id);

    try {
        await contentDatabase.delete(quizzes).where(eq(quizzes.id, quizId));
        // cascade will delete questions
        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to delete quiz' }, { status: 500 });
    }
}
