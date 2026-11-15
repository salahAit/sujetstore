import { contentDatabase } from '#lib/server/db';
import {
	quizzes,
	yearSubjects,
	subjects,
	years,
	educationLevels,
	streams,
	streamSubjects
} from '#lib/server/db/schema-content';
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
		.where(
			and(
				eq(quizzes.isPublished, true),
				eq(yearSubjects.visibility, 'published'),
				eq(years.visibility, 'published'),
				eq(educationLevels.visibility, 'published')
			)
		);

	const levels = await contentDatabase
		.select()
		.from(educationLevels)
		.where(eq(educationLevels.visibility, 'published'))
		.all();
	const yearsList = await contentDatabase
		.select()
		.from(years)
		.where(eq(years.visibility, 'published'))
		.all();
	const streamsList = await contentDatabase.select().from(streams).all();
	const subjectsList = await contentDatabase.select().from(subjects).all();
	const streamSubjectsList = await contentDatabase
		.select()
		.from(streamSubjects)
		.where(eq(streamSubjects.visibility, 'published'))
		.all();

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
