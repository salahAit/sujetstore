import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db';
import { contentDatabase, contentSchema } from '$lib/server/db';
import { sql, desc, eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
    // Total views & downloads
    const [totals] = await usersDatabase
        .select({
            totalViews: sql<number>`COALESCE(SUM(views), 0)`,
            totalDownloads: sql<number>`COALESCE(SUM(downloads), 0)`
        })
        .from(userSchema.viewStats);

    // Top 10 most viewed documents (all time)
    const topDocs = await usersDatabase
        .select({
            documentId: userSchema.viewStats.documentId,
            totalViews: sql<number>`SUM(views)`.as('total_views'),
            totalDownloads: sql<number>`SUM(downloads)`.as('total_downloads')
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
                views: td.totalViews,
                downloads: td.totalDownloads
            });
        }
    }

    // Total comments & ratings
    const [commentCount] = await usersDatabase
        .select({ count: sql<number>`COUNT(*)` })
        .from(userSchema.comments);

    const [ratingCount] = await usersDatabase
        .select({ count: sql<number>`COUNT(*)` })
        .from(userSchema.ratings);

    // Total documents
    const [docCount] = await contentDatabase
        .select({ count: sql<number>`COUNT(*)` })
        .from(contentSchema.documents);

    // Views last 7 days
    const last7Days = await usersDatabase
        .select({
            date: userSchema.viewStats.date,
            views: sql<number>`SUM(views)`,
            downloads: sql<number>`SUM(downloads)`
        })
        .from(userSchema.viewStats)
        .where(sql`date >= date('now', '-7 days')`)
        .groupBy(userSchema.viewStats.date)
        .orderBy(userSchema.viewStats.date)
        .limit(7);

    return json({
        totals: {
            views: totals?.totalViews || 0,
            downloads: totals?.totalDownloads || 0,
            comments: commentCount?.count || 0,
            ratings: ratingCount?.count || 0,
            documents: docCount?.count || 0
        },
        topDocs: enrichedDocs,
        last7Days
    });
};
