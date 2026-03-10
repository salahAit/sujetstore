import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { quizzes, quizQuestions } from '$lib/server/db/schema-content';
import { eq, desc } from 'drizzle-orm';
import slugify from 'slugify';

// Get all quizzes
export async function GET({ locals }) {
    if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    const allQuizzes = await contentDatabase.select().from(quizzes).orderBy(desc(quizzes.updatedAt));
    return json(allQuizzes);
}

// Create new quiz
export async function POST({ request, locals }) {
    if (!locals.user || !['superadmin', 'admin', 'editor'].includes(locals.user.role)) {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const data = await request.json();

        const slug = slugify(`${data.title}-${Date.now()}`, { lower: true, strict: true });

        const newQuiz = await contentDatabase
            .insert(quizzes)
            .values({
                yearSubjectId: data.yearSubjectId,
                trimesterId: data.trimesterId || null,
                title: data.title,
                titleAr: data.titleAr,
                slug,
                description: data.description,
                difficulty: data.difficulty || 'medium',
                timeLimit: data.timeLimit || 0,
                passingScore: data.passingScore || 60,
                isPremium: data.isPremium || false,
                isPublished: data.isPublished || false
            })
            .returning()
            .get();

        return json({ success: true, quiz: newQuiz });
    } catch (error) {
        console.error('Failed to create quiz:', error);
        return json({ error: 'Failed to create quiz' }, { status: 500 });
    }
}
