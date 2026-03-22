import { contentDatabase } from '$lib/server/db';
import { educationLevels, years, streams, subjects, streamSubjects, trimesters } from '$lib/server/db/schema-content';
import { eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Load all hierarchical data for the cascading dropdowns
	const allLevels = await contentDatabase
		.select()
		.from(educationLevels)
		.orderBy(asc(educationLevels.order));

	const allYears = await contentDatabase
		.select()
		.from(years)
		.orderBy(asc(years.order));

	const allStreams = await contentDatabase
		.select()
		.from(streams)
		.orderBy(asc(streams.order));

	const allSubjects = await contentDatabase
		.select()
		.from(subjects);

	const allStreamSubjects = await contentDatabase
		.select()
		.from(streamSubjects)
		.orderBy(asc(streamSubjects.order));

	const allTrimesters = await contentDatabase
		.select()
		.from(trimesters)
		.orderBy(asc(trimesters.order));

	return {
		levels: allLevels,
		years: allYears,
		streams: allStreams,
		subjects: allSubjects,
		streamSubjects: allStreamSubjects,
		trimesters: allTrimesters
	};
};
