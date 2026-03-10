import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { questions, questionCategories, yearSubjects, subjects, years, educationLevels } from '$lib/server/db/schema-content';
import { eq, desc } from 'drizzle-orm';

// Fetch all questions for the bank
export async function GET({ url, locals }) {
    const user = locals.user;
    if (!user || user.role !== 'admin') {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Fetch all categories with context (Level > Year > Subject)
        const allCats = await contentDatabase
            .select({
                id: questionCategories.id,
                name: questionCategories.name,
                parentId: questionCategories.parentId,
                yearSubjectId: questionCategories.yearSubjectId,
                subjectNameAr: subjects.nameAr,
                yearNameAr: years.nameAr,
                levelNameAr: educationLevels.nameAr
            })
            .from(questionCategories)
            .leftJoin(yearSubjects, eq(questionCategories.yearSubjectId, yearSubjects.id))
            .leftJoin(subjects, eq(yearSubjects.subjectId, subjects.id))
            .leftJoin(years, eq(yearSubjects.yearId, years.id))
            .leftJoin(educationLevels, eq(years.levelId, educationLevels.id));

        const catMap = new Map();
        for (const c of allCats) {
            catMap.set(c.id, c);
        }

        const resolvePath = (catId: number): string => {
            const cat = catMap.get(catId);
            if (!cat) return 'غير مصنف';

            let path = cat.name;
            if (cat.parentId) {
                path = `${resolvePath(cat.parentId)} > ${path}`;
            } else if (cat.yearSubjectId) {
                const context = [cat.levelNameAr, cat.yearNameAr, cat.subjectNameAr].filter(Boolean).join(' : ');
                if (context) {
                    path = `${context} : ${path}`;
                }
            }
            return path;
        };

        const allQuestions = await contentDatabase
            .select({
                id: questions.id,
                categoryId: questions.categoryId,
                type: questions.type,
                difficulty: questions.difficulty,
                questionText: questions.questionText,
                questionTextAr: questions.questionTextAr,
                questionData: questions.questionData,
                explanation: questions.explanation,
                createdAt: questions.createdAt,
                updatedAt: questions.updatedAt
            })
            .from(questions)
            .orderBy(desc(questions.createdAt));

        const populatedQuestions = allQuestions.map(q => ({
            ...q,
            categoryName: q.categoryId ? resolvePath(q.categoryId) : 'غير مصنف'
        }));

        return json({ questions: populatedQuestions });
    } catch (error) {
        console.error('Error fetching question bank:', error);
        return json({ error: 'Failed to fetch questions' }, { status: 500 });
    }
}

// Create a new question in the bank
export async function POST({ request, locals }) {
    const user = locals.user;
    if (!user || user.role !== 'admin') {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const newQuestion = await contentDatabase
            .insert(questions)
            .values({
                categoryId: data.categoryId,
                type: data.type,
                difficulty: data.difficulty || 'medium',
                questionText: data.questionText,
                questionTextAr: data.questionTextAr || null,
                questionData: data.questionData,
                explanation: data.explanation || null
            })
            .returning();

        return json(newQuestion[0], { status: 201 });
    } catch (error) {
        console.error('Error creating question:', error);
        return json({ error: 'Failed to create question' }, { status: 500 });
    }
}
