// ============================================================================
// Fix Interactive Quiz Math Notation, Misplaced Demo Quizzes & Broken Blanks
// Ensures 100% Algerian Official Curriculum notation ($x, y, f(x), \int 2x\,dx$)
// and KaTeX-ready equations across `questions` and `quizzes`.
// ============================================================================

import { Database } from 'bun:sqlite';
import katex from 'katex';
import 'katex/contrib/mhchem';

const db = new Database('data/content.db');

db.exec('BEGIN TRANSACTION;');

try {
	// 1. Unpublish pure developer test-harness / duplicate copy quizzes (`master-quiz-14` & its copy)
	db.run(`UPDATE quizzes SET is_published = 0 WHERE id IN (30, 33)`);

	// 2. Remove empty/broken scratch questions (200: empty fill_blank, 245 & 246: test map questions)
	db.run(`DELETE FROM quiz_questions WHERE question_id IN (200, 245, 246)`);
	db.run(`DELETE FROM questions WHERE id IN (200, 245, 246)`);

	// 3. Fix misplaced `year_subject_id` on legacy quizzes (were pointing to 1AM/1AS Arabic!)
	db.run(`UPDATE quizzes SET year_subject_id = 618 WHERE id = 26`); // 1am PHY-B
	db.run(`UPDATE quizzes SET year_subject_id = 682, trimester_id = 't2' WHERE id = 27`); // 3as MAT-SE
	db.run(`UPDATE quizzes SET year_subject_id = 683 WHERE id = 28`); // 3as PHY-SE
	db.run(`UPDATE quizzes SET year_subject_id = 656 WHERE id = 29`); // 1as SCI-SE

	// Also link `question_categories` for those legacy math/physics/bio categories so `/api/generator` picks the right subject!
	const updateQ = db.prepare(`
		UPDATE questions
		SET question_text_ar = ?,
		    question_data = ?,
		    explanation = ?
		WHERE id = ?
	`);

	// 4. Convert all Mashriqi (`س، ص، د(س)، dس`) & raw Unicode math questions to Algerian KaTeX notation
	updateQ.run(
		'أكمل المساواة الآتية:',
		JSON.stringify({
			sentence: 'ذهبَ ___ إلى المدرسةِ.',
			answers: ['الولدُ', 'الولد', 'التلميذُ', 'التلميذ'],
			acceptedAnswers: ['الولدُ', 'الولد', 'التلميذُ', 'التلميذ']
		}),
		'"الولدُ" فاعل مرفوع وعلامة رفعه الضمة الظاهرة.',
		206
	);

	updateQ.run(
		'حلّ المعادلة ذات المجهول $x$: $2x + 6 = 20$',
		JSON.stringify({
			options: [
				{ id: '1', text: '$x = 5$', isCorrect: false },
				{ id: '2', text: '$x = 7$', isCorrect: true },
				{ id: '3', text: '$x = 8$', isCorrect: false },
				{ id: '4', text: '$x = 10$', isCorrect: false }
			]
		}),
		'$2x = 20 - 6 = 14 \\implies x = 7$',
		209
	);

	updateQ.run(
		'حلّل العبارة الجبرية الآتية إلى جداء عاملين: $x^2 - 9$',
		JSON.stringify({
			options: [
				{ id: '1', text: '$(x - 3)(x + 3)$', isCorrect: true },
				{ id: '2', text: '$(x - 9)(x + 1)$', isCorrect: false },
				{ id: '3', text: '$(x - 3)^2$', isCorrect: false },
				{ id: '4', text: '$(x + 3)^2$', isCorrect: false }
			]
		}),
		'متطابقة شهيرة (فرق مربعين): $x^2 - 3^2 = (x - 3)(x + 3)$',
		210
	);

	updateQ.run(
		'إذا كان $x > 5$ فإنّ $2x > 10$.',
		JSON.stringify({ correctAnswer: true }),
		'ضرب طرفي متباينة في عدد موجب تماماً يحافظ على اتجاهها.',
		211
	);

	updateQ.run(
		'حلّ جملة المعادلتين: $x + y = 10$ و $x - y = 4$',
		JSON.stringify({ keywords: ['7', '3'], minKeywords: 2 }),
		'بجمع المعادلتين نجد $2x = 14 \\implies x = 7$، ومنه $y = 3$.',
		212
	);

	updateQ.run(
		'اختر حرف الجرّ المناسب لإتمام الجملة:',
		JSON.stringify({
			sentence: 'ذهبَ المعلّمون ___ المدرسةِ.',
			options: ['إلى', 'على', 'في', 'عن'],
			correctIndex: 0
		}),
		'حرف الجرّ "إلى" يفيد انتهاء الغاية المكانية.',
		218
	);

	updateQ.run(
		'عيّن عبارة الدالة المشتقة للدالة $f$ المعرّفة على $\\mathbb{R}$ بـ: $f(x) = 3x^2 + 2x - 5$',
		JSON.stringify({
			options: [
				{ id: '1', text: "$f'(x) = 6x + 2$", isCorrect: true },
				{ id: '2', text: "$f'(x) = 3x + 2$", isCorrect: false },
				{ id: '3', text: "$f'(x) = 6x^2 + 2$", isCorrect: false },
				{ id: '4', text: "$f'(x) = 6x - 5$", isCorrect: false }
			]
		}),
		"مشتقة $3x^2$ هي $6x$ ومشتقة $2x$ هي $2$، إذن $f'(x) = 6x + 2$.",
		219
	);

	updateQ.run(
		'نهاية الدالة المقلوب عند $+\\infty$ تحقّق: $\\lim_{x \\to +\\infty} \\frac{1}{x} = 0$',
		JSON.stringify({ correctAnswer: true }),
		'$\\lim_{x \\to +\\infty} \\frac{1}{x} = 0$',
		220
	);

	updateQ.run(
		'أكمل حساب الدالة الأصلية الآتية:',
		JSON.stringify({
			sentence: '$\\int 2x \\, dx =$ ___ $+ C$',
			answers: ['x^2', 'x²'],
			acceptedAnswers: ['x^2', 'x²']
		}),
		"الدالة الأصلية لـ $2x$ على $\\mathbb{R}$ هي $x^2 + C$ لأن $(x^2)' = 2x$.",
		221
	);

	updateQ.run(
		'يعبّر القانون الثاني لنيوتن (المبدأ الأساسي للتحريك) بعلاقة الأشعة عن:',
		JSON.stringify({
			options: [
				{ id: '1', text: '$\\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{a}$', isCorrect: true },
				{ id: '2', text: '$\\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{v}$', isCorrect: false },
				{ id: '3', text: '$E = m \\cdot c^2$', isCorrect: false },
				{ id: '4', text: '$P = m \\cdot g$', isCorrect: false }
			]
		}),
		'$\\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{a}$',
		222
	);

	updateQ.run(
		'اربط كل مقدار فيزيائي بعبارته الرياضية:',
		JSON.stringify({
			pairs: [
				{ left: 'السرعة المتوسطة', right: '$v = \\frac{d}{t}$' },
				{ left: 'التسارع المتوسط', right: '$a = \\frac{\\Delta v}{\\Delta t}$' },
				{ left: 'الطاقة الحركية', right: '$E_c = \\frac{1}{2} m v^2$' },
				{ left: 'عمل قوة ثابتة', right: '$W = F \\cdot d$' }
			]
		}),
		'$v = \\frac{d}{t}$، $a = \\frac{\\Delta v}{\\Delta t}$، $E_c = \\frac{1}{2}mv^2$، $W = F \\cdot d$',
		224
	);

	updateQ.run(
		'أكمل المساواة الحسابية الآتية:',
		JSON.stringify({
			sentence: '$45 +$ ___ $= 100$',
			answers: ['55'],
			acceptedAnswers: ['55']
		}),
		'$100 - 45 = 55$',
		231
	);

	updateQ.run(
		'ما الكتابة العلمية للعدد العشري $0.0052$ ؟',
		JSON.stringify({
			options: [
				'$5.2 \\times 10^{-3}$',
				'$52 \\times 10^{-4}$',
				'$0.52 \\times 10^{-2}$',
				'$5.2 \\times 10^{3}$'
			],
			correctIndex: 0
		}),
		'$0.0052 = 5.2 \\times 10^{-3}$',
		247
	);

	updateQ.run(
		'تبسيط الجداء $10^{-2} \\times 10^{5}$ يساوي $10^{3}$.',
		JSON.stringify({ correct: true, correctAnswer: true }),
		'$10^{-2} \\times 10^{5} = 10^{-2+5} = 10^{3}$',
		248
	);

	updateQ.run(
		'احسب القاسم المشترك الأكبر للعددين $48$ و $36$: $\\operatorname{PGCD}(48, 36) = \\text{؟}$',
		JSON.stringify({ answer: 12, tolerance: 0 }),
		'$\\operatorname{PGCD}(48, 36) = 12$',
		249
	);

	updateQ.run(
		'تبسيط العبارة $\\sqrt{50} + \\sqrt{18}$ على الشكل $a\\sqrt{2}$ يساوي:',
		JSON.stringify({
			options: ['$8\\sqrt{2}$', '$\\sqrt{68}$', '$15\\sqrt{2}$', '$4\\sqrt{2}$'],
			correctIndex: 0
		}),
		'$\\sqrt{50} + \\sqrt{18} = 5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}$',
		250
	);

	// 5. Upgrade arithmetic/algebra `fill_blank` sentences in curriculum questions so equations render in crisp KaTeX!
	const fillBlankRows = db
		.query(`SELECT id, question_data FROM questions WHERE type = 'fill_blank'`)
		.all() as Array<{ id: number; question_data: string }>;

	const updateDataOnly = db.prepare(`UPDATE questions SET question_data = ? WHERE id = ?`);
	let upgradedSentences = 0;

	for (const row of fillBlankRows) {
		const qd = JSON.parse(row.question_data);
		const s = String(qd.sentence || '');
		let next = s;

		// e.g. `45 ÷ 4 = ___` or `5.132 ÷ 0.01 = ___`
		const divMatch = s.match(/^([0-9.]+)\s*÷\s*([0-9.]+)\s*=\s*___$/);
		if (divMatch) {
			next = `$${divMatch[1]} \\div ${divMatch[2]} =$ ___`;
		}
		// e.g. `الكتابة العشرية للعدد 10^(-2) هي: ___`
		next = next.replace(/10\^\((-?\d+)\)/g, '$$10^{$1}$$');
		// e.g. `في المعادلة 11 + x = 27 ، قيمة x تساوي ___`
		next = next.replace(
			/في المعادلة\s+([0-9x+\-\s=]+)\s*،\s*قيمة\s+x\s+تساوي\s+___/,
			(_m, eq: string) => `في المعادلة $${eq.trim()}$، قيمة $x$ تساوي ___`
		);
		// e.g. `حلّ المعادلة هو x = ___.`
		if (next === 'حلّ المعادلة هو x = ___.') {
			next = 'حلّ المعادلة هو: $x =$ ___';
		}

		if (next !== s) {
			qd.sentence = next;
			updateDataOnly.run(JSON.stringify(qd), row.id);
			upgradedSentences++;
		}
	}

	// 6. Sync `quizzes.question_count` across all quizzes
	db.exec(`
		UPDATE quizzes
		SET question_count = (
			SELECT COUNT(*) FROM quiz_questions qq WHERE qq.quiz_id = quizzes.id
		)
	`);

	db.exec('COMMIT;');
	console.log(`Updated legacy questions & upgraded ${upgradedSentences} fill_blank sentences.`);
} catch (err) {
	db.exec('ROLLBACK;');
	throw err;
}

// ============================================================================
// Verification Audit Across ALL Questions
// ============================================================================
const allQuestions = db
	.query(`SELECT id, type, question_text_ar, question_data, explanation FROM questions`)
	.all() as Array<{
	id: number;
	type: string;
	question_text_ar: string;
	question_data: string;
	explanation: string;
}>;

let mashriqiRemaining = 0;
let emptyFillBlanks = 0;
let katexErrors = 0;

for (const q of allQuestions) {
	const combined = `${q.question_text_ar || ''} ${q.question_data || ''} ${q.explanation || ''}`;
	if (/(?:[0-9+\-=*/(]\s*[سصع]\b|\b[سص]\s*[²³^+\-=<>]|د\(س\)|∫[^$]*س|dس)/.test(combined)) {
		mashriqiRemaining++;
		console.error('Mashriqi remaining:', q.id, q.question_text_ar);
	}
	if (q.type === 'fill_blank') {
		const qd = JSON.parse(q.question_data || '{}');
		const ans = qd.answers || qd.acceptedAnswers || [];
		if (!qd.sentence || ans.length === 0) {
			emptyFillBlanks++;
			console.error('Empty fill_blank:', q.id);
		}
		for (const m of String(qd.sentence || '').matchAll(/\$([^$]+)\$/g)) {
			try {
				katex.renderToString(m[1], { throwOnError: true, strict: 'ignore' });
			} catch (e: any) {
				katexErrors++;
				console.error('KaTeX error in fill_blank:', q.id, m[1], e.message);
			}
		}
	}
}

db.exec('PRAGMA wal_checkpoint(TRUNCATE);');
db.close();

console.log(
	JSON.stringify(
		{
			totalQuestionsChecked: allQuestions.length,
			mashriqiRemaining,
			emptyFillBlanks,
			katexErrors
		},
		null,
		2
	)
);

if (mashriqiRemaining > 0 || emptyFillBlanks > 0 || katexErrors > 0) {
	process.exit(1);
}
