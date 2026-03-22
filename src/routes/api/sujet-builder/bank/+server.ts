import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { bankExercises, yearSubjects } from '$lib/server/db/schema-content';
import { eq, and, isNull, desc } from 'drizzle-orm';

// GET: Fetch exercises from the bank
export async function GET({ url }) {
	const yearId = url.searchParams.get('yearId');
	const subjectId = url.searchParams.get('subjectId');
	const streamId = url.searchParams.get('streamId');

	if (!yearId || !subjectId) {
		return json({ error: 'Missing yearId or subjectId' }, { status: 400 });
	}

	try {
		// 1. Find the yearSubjectId mapping
		const conditions = [
			eq(yearSubjects.yearId, yearId),
			eq(yearSubjects.subjectId, subjectId)
		];
		
		if (streamId && streamId !== 'undefined' && streamId !== 'null') {
			conditions.push(eq(yearSubjects.streamId, streamId));
		} else {
			conditions.push(isNull(yearSubjects.streamId));
		}

		let ys = await contentDatabase.query.yearSubjects.findFirst({
			where: and(...conditions)
		});

		// Fallback: if not found with stream, try general mapping without stream
		if (!ys && streamId) {
			ys = await contentDatabase.query.yearSubjects.findFirst({
				where: and(eq(yearSubjects.yearId, yearId), eq(yearSubjects.subjectId, subjectId))
			});
		}

		if (!ys) {
			// No mapping means no exercises could possibly exist for this combo
			return json({ exercises: [] });
		}

		// 2. Fetch exercises
		const exercises = await contentDatabase.query.bankExercises.findMany({
			where: eq(bankExercises.yearSubjectId, ys.id),
			orderBy: [desc(bankExercises.createdAt)]
		});

		return json({ exercises });
	} catch (e) {
		console.error('Error fetching bank exercises:', e);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}

// POST: Save an exercise to the bank
export async function POST({ request }) {
	try {
		const body = await request.json();
		const { yearId, subjectId, streamId, title, content, points, tags } = body;

		if (!yearId || !subjectId || !title || !content) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// 1. Find the yearSubjectId mapping
		const conditions = [
			eq(yearSubjects.yearId, yearId),
			eq(yearSubjects.subjectId, subjectId)
		];
		
		if (streamId && streamId !== 'undefined' && streamId !== 'null') {
			conditions.push(eq(yearSubjects.streamId, streamId));
		} else {
			conditions.push(isNull(yearSubjects.streamId));
		}

		let ys = await contentDatabase.query.yearSubjects.findFirst({
			where: and(...conditions)
		});

		if (!ys && streamId) {
			ys = await contentDatabase.query.yearSubjects.findFirst({
				where: and(eq(yearSubjects.yearId, yearId), eq(yearSubjects.subjectId, subjectId))
			});
		}

		if (!ys) {
			return json({ error: 'Invalid curriculum mapping (Year/Subject)' }, { status: 400 });
		}

		// 2. Insert into bankExercises
		const result = await contentDatabase.insert(bankExercises).values({
			yearSubjectId: ys.id,
			title,
			content,
			points: points || 0,
			tags: tags || null
		}).returning();

		return json({ success: true, exercise: result[0] });

	} catch (e) {
		console.error('Error saving bank exercise:', e);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
