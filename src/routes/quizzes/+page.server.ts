import { contentDatabase } from '$lib/server/db';
import {
    quizzes,
    quizQuestions,
    yearSubjects,
    subjects,
	years,
	educationLevels,
	streams,
	streamSubjects
} from '$lib/server/db/schema-content';
import { eq, and } from 'drizzle-orm';

export async function load() {
    const rows = await contentDatabase
        .select({
            quiz: quizzes,
            subject: subjects,
            year: years,
            level: educationLevels
        })
        .from(quizzes)
        .innerJoin(yearSubjects, eq(quizzes.yearSubjectId, yearSubjects.id))
        .innerJoin(subjects, eq(yearSubjects.subjectId, subjects.id))
        .innerJoin(years, eq(yearSubjects.yearId, years.id))
        .innerJoin(educationLevels, eq(years.levelId, educationLevels.id))
        .where(eq(quizzes.isPublished, true));

	const levels = await contentDatabase.select().from(educationLevels).all();
	const yearsList = await contentDatabase.select().from(years).all();
	const streamsList = await contentDatabase.select().from(streams).all();
	const subjectsList = await contentDatabase.select().from(subjects).all();
	const streamSubjectsList = await contentDatabase.select().from(streamSubjects).all();

	return { 
		quizzes: rows,
		metadata: {
			levels,
			years: yearsList,
			streams: streamsList,
			subjects: subjectsList,
			streamSubjects: streamSubjectsList
		}
	};
}
