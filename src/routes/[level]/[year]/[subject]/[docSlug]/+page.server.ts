import { error } from '@sveltejs/kit';
import { contentDatabase } from '#lib/server/db';
import {
	documents,
	subjects,
	years,
	educationLevels,
	yearSubjects
} from '#lib/server/db/schema-content';
import { canAccessTier, getSiteSettings } from '#lib/server/visibility';
import { eq, ne, and } from 'drizzle-orm';

export async function load({ params, locals }) {
	const docSlug = params.docSlug;

	const [docRow] = await contentDatabase
		.select({
			doc: documents,
			yearSubject: yearSubjects,
			subject: subjects,
			year: years,
			level: educationLevels
		})
		.from(documents)
		.innerJoin(yearSubjects, eq(documents.yearSubjectId, yearSubjects.id))
		.innerJoin(subjects, eq(yearSubjects.subjectId, subjects.id))
		.innerJoin(years, eq(yearSubjects.yearId, years.id))
		.innerJoin(educationLevels, eq(years.levelId, educationLevels.id))
		.where(
			and(
				eq(documents.slug, docSlug),
				eq(documents.isPublished, true),
				eq(yearSubjects.visibility, 'published'),
				eq(years.visibility, 'published'),
				eq(educationLevels.visibility, 'published')
			)
		)
		.limit(1);

	if (!docRow) {
		throw error(404, 'الوثيقة غير موجودة أو غير منشورة حالياً');
	}

	const siteSettings = getSiteSettings();
	const dynamicPortalUrl = (siteSettings.dynamic_portal_url || '').replace(/\/$/, '');
	const accessCheck = canAccessTier(docRow.doc.accessTier, locals.user, locals.isStaticBuild);

	const safeDocument = accessCheck.allowed
		? docRow.doc
		: {
				...docRow.doc,
				pdfUrl: null,
				solutionUrl: null,
				content: null
			};

	const relatedDocs = await contentDatabase
		.select({
			id: documents.id,
			title: documents.title,
			titleAr: documents.titleAr,
			slug: documents.slug,
			type: documents.type,
			hasSolution: documents.hasSolution,
			accessTier: documents.accessTier
		})
		.from(documents)
		.where(
			and(
				eq(documents.yearSubjectId, docRow.doc.yearSubjectId),
				ne(documents.id, docRow.doc.id),
				eq(documents.isPublished, true)
			)
		)
		.limit(5);

	return {
		document: safeDocument,
		subject: docRow.subject,
		year: docRow.year,
		level: docRow.level,
		relatedDocs,
		accessCheck: {
			...accessCheck,
			tier: docRow.doc.accessTier,
			dynamicPortalUrl
		}
	};
}
