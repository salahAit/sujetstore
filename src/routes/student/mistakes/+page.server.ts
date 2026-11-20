import type { PageServerLoad } from './$types';
import { contentSqlite, pgAll } from '#lib/server/db';
import { buildRemediationSummary } from '#lib/server/remediation';

export const load: PageServerLoad = async ({ parent }) => {
	const { studentUser } = await parent();

	const mistakeRows = await pgAll<any>(
		`
		SELECT id, question_id, quiz_id, wrong_count, last_attempt_at, resolved
		FROM user_mistakes
		WHERE user_id = $1
		ORDER BY resolved ASC, wrong_count DESC, last_attempt_at DESC
		LIMIT 100
	`,
		[studentUser.id]
	);

	const questionIds = [...new Set(mistakeRows.map((m) => m.question_id).filter(Boolean))];
	const qMap = new Map<number, any>();

	if (questionIds.length > 0) {
		const ph = questionIds.map(() => '?').join(',');
		const qRows = contentSqlite
			.query(
				`
			SELECT q.id, q.type, q.difficulty, q.question_text as questionText,
				q.question_text_ar as questionTextAr, q.image_url as imageUrl,
				q.image_caption as imageCaption, q.question_data as questionData, q.explanation,
				s.name_ar as subjectName, y.name_ar as yearName
			FROM questions q
			JOIN question_categories qc ON q.category_id = qc.id
			LEFT JOIN year_subjects ys ON qc.year_subject_id = ys.id
			LEFT JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN years y ON ys.year_id = y.id
			WHERE q.id IN (${ph})
		`
			)
			.all(...questionIds) as any[];

		for (const q of qRows) {
			let qd = q.questionData;
			if (typeof qd === 'string') {
				try {
					qd = JSON.parse(qd);
				} catch {
					qd = {};
				}
			}
			qMap.set(q.id, { ...q, questionData: qd });
		}
	}

	const mistakes = mistakeRows
		.map((m) => {
			const q = qMap.get(m.question_id);
			if (!q) return null;
			return {
				...m,
				question: q
			};
		})
		.filter(Boolean);

	const remediation = buildRemediationSummary(mistakeRows);

	return {
		mistakes,
		weaknessAreas: remediation.weaknessAreas,
		enrichedByQuestionId: remediation.enrichedByQuestionId
	};
};
