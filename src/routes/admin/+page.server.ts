import type { PageServerLoad } from './$types';
import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { count } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const [levelsCount, yearsCount, subjectsCount, docsCount] = await Promise.all([
        contentDatabase.select({ value: count() }).from(contentSchema.educationLevels),
        contentDatabase.select({ value: count() }).from(contentSchema.years),
        contentDatabase.select({ value: count() }).from(contentSchema.subjects),
        contentDatabase.select({ value: count() }).from(contentSchema.documents)
    ]);

    return {
        stats: {
            levels: levelsCount[0].value,
            years: yearsCount[0].value,
            subjects: subjectsCount[0].value,
            documents: docsCount[0].value
        }
    };
};
