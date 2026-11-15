import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { contentDatabase, usersSqlite } from '#lib/server/db';
import {
	quizzes,
	quizQuestions,
	questions,
	yearSubjects,
	subjects,
	years,
	educationLevels
} from '#lib/server/db/schema-content';
import { eq, asc } from 'drizzle-orm';
import { isStaffRole, FP_COOKIE_NAME } from '#lib/server/auth';
import { canAccessTier, getSiteSettings } from '#lib/server/visibility';

function stripAnswers(type: string, qd: any) {
	if (!qd || typeof qd !== 'object') return qd;
	const clone = JSON.parse(JSON.stringify(qd));
	if (type === 'mcq' && Array.isArray(clone.options)) {
		clone.options = clone.options.map((o: any) =>
			typeof o === 'object' ? { id: o.id, text: o.text, imageUrl: o.imageUrl } : o
		);
		delete clone.correctIndexes;
		delete clone.correctIndices;
	}
	delete clone.correctAnswer;
	delete clone.correct;
	delete clone.answer;
	delete clone.answers;
	delete clone.acceptedAnswers;
	delete clone.correctIndex;
	delete clone.correctOrder;
	delete clone.correctZone;
	delete clone.correctAnswers;
	delete clone.keywords;
	delete clone.acceptedKeywords;
	if (Array.isArray(clone.labels)) {
		clone.labels = clone.labels.map((l: any) => ({ text: l.text }));
	}
	return clone;
}

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
	const slug = params.slug;
	const siteSettings = getSiteSettings();
	const dynamicPortalUrl = (siteSettings.dynamic_portal_url || '').replace(/\/$/, '');

	const [quizRow] = await contentDatabase
		.select({
			quiz: quizzes,
			yearSubject: yearSubjects,
			subject: subjects,
			year: years,
			level: educationLevels
		})
		.from(quizzes)
		.innerJoin(yearSubjects, eq(quizzes.yearSubjectId, yearSubjects.id))
		.innerJoin(subjects, eq(yearSubjects.subjectId, subjects.id))
		.innerJoin(years, eq(yearSubjects.yearId, years.id))
		.innerJoin(educationLevels, eq(years.levelId, educationLevels.id))
		.where(eq(quizzes.slug, slug))
		.limit(1);

	if (!quizRow) {
		throw error(404, 'التمرين غير موجود');
	}

	const staff = isStaffRole(locals.user?.role);
	if (
		!staff &&
		(!quizRow.quiz.isPublished ||
			quizRow.level.visibility !== 'published' ||
			quizRow.year.visibility !== 'published' ||
			quizRow.yearSubject.visibility !== 'published')
	) {
		throw error(404, 'التمرين غير متاح حالياً');
	}

	const tier = quizRow.quiz.accessTier || (quizRow.quiz.isPremium ? 'premium' : 'public');
	const accessCheck = canAccessTier(tier, locals.user, locals.isStaticBuild);

	if (!accessCheck.allowed) {
		return {
			quiz: quizRow.quiz,
			subject: quizRow.subject,
			year: quizRow.year,
			level: quizRow.level,
			questions: [],
			isLocked: true,
			lockReason: accessCheck.reason ?? 'auth_required',
			accessTier: tier,
			dynamicPortalUrl,
			attemptsUsed: 0
		};
	}

	let attemptsUsed = 0;
	if (!locals.isStaticBuild) {
		const fp = cookies.get(FP_COOKIE_NAME) || cookies.get('fingerprint');
		if (locals.user) {
			const row = usersSqlite
				.query('SELECT COUNT(*) as c FROM quiz_attempts WHERE quiz_id = ? AND user_id = ?')
				.get(quizRow.quiz.id, locals.user.id) as { c: number };
			attemptsUsed = row?.c || 0;
		} else if (fp) {
			const row = usersSqlite
				.query(
					'SELECT COUNT(*) as c FROM quiz_attempts WHERE quiz_id = ? AND user_id IS NULL AND fingerprint = ?'
				)
				.get(quizRow.quiz.id, fp) as { c: number };
			attemptsUsed = row?.c || 0;
		}
	}

	const rawQuestions = await contentDatabase
		.select({
			id: quizQuestions.id,
			quizId: quizQuestions.quizId,
			questionId: quizQuestions.questionId,
			points: quizQuestions.points,
			order: quizQuestions.order,
			type: questions.type,
			difficulty: questions.difficulty,
			questionText: questions.questionText,
			questionTextAr: questions.questionTextAr,
			imageUrl: questions.imageUrl,
			imageCaption: questions.imageCaption,
			questionData: questions.questionData,
			explanation: questions.explanation
		})
		.from(quizQuestions)
		.innerJoin(questions, eq(quizQuestions.questionId, questions.id))
		.where(eq(quizQuestions.quizId, quizRow.quiz.id))
		.orderBy(asc(quizQuestions.order));

	const hideClientAnswers = quizRow.quiz.showAnswers === false && !quizRow.quiz.practiceMode;

	const parsedQuestions = rawQuestions.map((q) => {
		let parsedData = q.questionData;
		if (typeof q.questionData === 'string') {
			try {
				parsedData = JSON.parse(q.questionData);
			} catch (e) {
				console.error('Failed to parse questionData:', e);
			}
		}

		return {
			...q,
			questionData: hideClientAnswers ? stripAnswers(q.type, parsedData) : parsedData,
			explanation: hideClientAnswers ? null : q.explanation
		};
	});

	return {
		quiz: quizRow.quiz,
		subject: quizRow.subject,
		year: quizRow.year,
		level: quizRow.level,
		questions: parsedQuestions,
		isLocked: false,
		lockReason: null,
		accessTier: tier,
		dynamicPortalUrl,
		attemptsUsed
	};
};
