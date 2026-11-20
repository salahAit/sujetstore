import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '#lib/server/db';
import { contentDatabase, contentSchema } from '#lib/server/db';
import { sql, desc, eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	// Total views & downloads
	const [totals] = await usersDatabase
		.select({
			totalViews: sql<number>`COALESCE(SUM(views), 0)::int`,
			totalDownloads: sql<number>`COALESCE(SUM(downloads), 0)::int`
		})
		.from(userSchema.viewStats);

	// Top 10 most viewed documents (all time)
	const topDocs = await usersDatabase
		.select({
			documentId: userSchema.viewStats.documentId,
			totalViews: sql<number>`COALESCE(SUM(views), 0)::int`.as('total_views'),
			totalDownloads: sql<number>`COALESCE(SUM(downloads), 0)::int`.as('total_downloads')
		})
		.from(userSchema.viewStats)
		.groupBy(userSchema.viewStats.documentId)
		.orderBy(desc(sql`total_views`))
		.limit(10);

	// Enrich top docs with document info from content DB
	const enrichedDocs = [];
	for (const td of topDocs) {
		const [doc] = await contentDatabase
			.select({
				id: contentSchema.documents.id,
				title: contentSchema.documents.title,
				titleAr: contentSchema.documents.titleAr,
				slug: contentSchema.documents.slug,
				type: contentSchema.documents.type
			})
			.from(contentSchema.documents)
			.where(eq(contentSchema.documents.id, td.documentId))
			.limit(1);

		if (doc) {
			enrichedDocs.push({
				...doc,
				views: Number(td.totalViews || 0),
				downloads: Number(td.totalDownloads || 0)
			});
		}
	}

	// Total comments & ratings
	const [commentCount] = await usersDatabase
		.select({ count: sql<number>`COUNT(*)::int` })
		.from(userSchema.comments);

	const [ratingCount] = await usersDatabase
		.select({ count: sql<number>`COUNT(*)::int` })
		.from(userSchema.ratings);

	// Total documents (content.db on SQLite)
	const [docCount] = await contentDatabase
		.select({ count: sql<number>`COUNT(*)` })
		.from(contentSchema.documents);

	// Views last 7 days (PostgreSQL UTC date comparison)
	const last7Days = await usersDatabase
		.select({
			date: userSchema.viewStats.date,
			views: sql<number>`COALESCE(SUM(views), 0)::int`,
			downloads: sql<number>`COALESCE(SUM(downloads), 0)::int`
		})
		.from(userSchema.viewStats)
		.where(sql`date >= to_char((NOW() AT TIME ZONE 'UTC') - INTERVAL '7 days', 'YYYY-MM-DD')`)
		.groupBy(userSchema.viewStats.date)
		.orderBy(userSchema.viewStats.date)
		.limit(7);

	return json({
		totals: {
			views: Number(totals?.totalViews || 0),
			downloads: Number(totals?.totalDownloads || 0),
			comments: Number(commentCount?.count || 0),
			ratings: Number(ratingCount?.count || 0),
			documents: Number(docCount?.count || 0)
		},
		topDocs: enrichedDocs,
		last7Days
	});
};
