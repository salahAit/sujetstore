import { json } from '@sveltejs/kit';
import { contentSqlite, pgAll, pgGet } from '#lib/server/db';

export async function GET() {
	const [totalAttempts, avgScore, quizStats, distribution, recentAttempts] = await Promise.all([
		pgGet<{ count: number }>('SELECT COUNT(*)::int as count FROM quiz_attempts'),
		pgGet<{ avg: number | null }>('SELECT AVG(percentage)::float8 as avg FROM quiz_attempts'),
		pgAll<any>(
			`
			SELECT
				quiz_id,
				COUNT(*)::int as attempts,
				ROUND(AVG(percentage)::numeric, 1)::float8 as avg_score,
				MAX(percentage)::float8 as best_score,
				MIN(percentage)::float8 as worst_score,
				ROUND(AVG(time_taken)::numeric, 0)::int as avg_time,
				SUM(CASE WHEN percentage >= 60 THEN 1 ELSE 0 END)::int as passed_count
			FROM quiz_attempts
			GROUP BY quiz_id
			ORDER BY attempts DESC
		`
		),
		pgAll<any>(
			`
			SELECT
				CASE
					WHEN percentage >= 90 THEN 'ممتاز (90-100%)'
					WHEN percentage >= 75 THEN 'جيد جداً (75-89%)'
					WHEN percentage >= 60 THEN 'جيد (60-74%)'
					WHEN percentage >= 40 THEN 'متوسط (40-59%)'
					ELSE 'ضعيف (0-39%)'
				END as range,
				COUNT(*)::int as count
			FROM quiz_attempts
			GROUP BY 1
			ORDER BY MIN(percentage) DESC
		`
		),
		pgAll<any>(
			`
			SELECT qa.*,
				qa.created_at as attempt_date
			FROM quiz_attempts qa
			ORDER BY qa.created_at DESC
			LIMIT 20
		`
		)
	]);

	const totalQuizzes = contentSqlite
		.query('SELECT COUNT(*) as count FROM quizzes WHERE is_published = 1')
		.get() as any;
	const totalQuestions = contentSqlite.query('SELECT COUNT(*) as count FROM questions').get() as any;

	const enrichedStats = quizStats.map((s: any) => {
		const quiz = contentSqlite
			.query('SELECT title, title_ar, slug FROM quizzes WHERE id = ?')
			.get(s.quiz_id) as any;
		return {
			...s,
			title: quiz?.title_ar || quiz?.title || `Quiz ${s.quiz_id}`,
			slug: quiz?.slug || '',
			passRate: s.attempts > 0 ? Math.round((s.passed_count / s.attempts) * 100) : 0
		};
	});

	const enrichedRecent = recentAttempts.map((a: any) => {
		const quiz = contentSqlite
			.query('SELECT title_ar, title FROM quizzes WHERE id = ?')
			.get(a.quiz_id) as any;
		return {
			...a,
			quizTitle: quiz?.title_ar || quiz?.title || `Quiz ${a.quiz_id}`
		};
	});

	return json({
		overview: {
			totalAttempts: totalAttempts?.count || 0,
			avgScore: Math.round(avgScore?.avg || 0),
			totalQuizzes: totalQuizzes?.count || 0,
			totalQuestions: totalQuestions?.count || 0
		},
		quizStats: enrichedStats,
		distribution,
		recentAttempts: enrichedRecent
	});
}
