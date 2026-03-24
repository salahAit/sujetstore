import { contentDatabase, contentSchema } from '$lib/server/db/index';
import { eq, isNotNull, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Only fetch documents that have JSON content (created via builder)
    // and are of type 'exam' or 'test' (optional, but makes sense for "Subjects Bank")
    const docs = await contentDatabase
        .select({
            id: contentSchema.documents.id,
            title: contentSchema.documents.title,
            titleAr: contentSchema.documents.titleAr,
            slug: contentSchema.documents.slug,
            type: contentSchema.documents.type,
            pdfUrl: contentSchema.documents.pdfUrl,
            createdAt: contentSchema.documents.createdAt,
            yearSubjectId: contentSchema.documents.yearSubjectId
        })
        .from(contentSchema.documents)
        .where(
            and(
                isNotNull(contentSchema.documents.content)
            )
        )
        .orderBy(contentSchema.documents.id);

    // Get yearSubjects for context
    const yearSubjectsQuery = await contentDatabase
        .select({
            id: contentSchema.yearSubjects.id,
            yearAr: contentSchema.years.nameAr,
            subjectAr: contentSchema.subjects.nameAr,
            streamAr: contentSchema.streams.nameAr
        })
        .from(contentSchema.yearSubjects)
        .innerJoin(contentSchema.years, eq(contentSchema.yearSubjects.yearId, contentSchema.years.id))
        .innerJoin(contentSchema.subjects, eq(contentSchema.yearSubjects.subjectId, contentSchema.subjects.id))
        .leftJoin(contentSchema.streams, eq(contentSchema.yearSubjects.streamId, contentSchema.streams.id))
        .all();

    return { 
        subjects: docs, 
        yearSubjects: yearSubjectsQuery 
    };
};
