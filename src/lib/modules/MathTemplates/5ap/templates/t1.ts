import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgFractionBar, svgParallelAngles, svgRectangle } from '../../svg-helpers';

const NBSP = '\u00A0';
const LRI = '\u2066';
const PDI = '\u2069';

/** Formats a natural number with normal ASCII spaces every 3 digits (for acceptedAnswers / calculations). */
function formatSpaceAscii(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Formats a natural number with non-breaking spaces every 3 digits so RTL HTML/Typst keeps LTR digit order. */
function formatGroupedRtlSafe(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** Formats a natural number for KaTeX browser math mode (`\,` thin separator). */
function formatKatexNum(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
}

/** Formats a natural number for Typst math mode (quotes preserve spaces inside `$...$`). */
function formatTypstMathNum(n: number): string {
	const s = formatSpaceAscii(n);
	return s.includes(' ') ? `"${s}"` : s;
}

/** Wraps a plain measurement/number-with-unit phrase in Unicode LTR isolate for RTL prose. */
function ltrUnit(expr: string): string {
	return `${LRI}${expr}${PDI}`;
}

/** Converts an integer in [1..999] into Modern Standard Arabic words. */
function underThousandToArabic(n: number): string {
	if (n <= 0 || n >= 1000) return '';
	const hundreds = [
		'',
		'مئة',
		'مئتان',
		'ثلاثمئة',
		'أربعمئة',
		'خمسمئة',
		'ستمئة',
		'سبعمئة',
		'ثمانمئة',
		'تسعمئة'
	];
	const units = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
	const teens = [
		'عشرة',
		'أحد عشر',
		'اثنا عشر',
		'ثلاثة عشر',
		'أربعة عشر',
		'خمسة عشر',
		'ستة عشر',
		'سبعة عشر',
		'ثمانية عشر',
		'تسعة عشر'
	];
	const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];

	const h = Math.floor(n / 100);
	const r = n % 100;
	let rStr = '';
	if (r >= 1 && r <= 9) {
		rStr = units[r];
	} else if (r >= 10 && r <= 19) {
		rStr = teens[r - 10];
	} else if (r >= 20) {
		const t = Math.floor(r / 10);
		const u = r % 10;
		rStr = u === 0 ? tens[t] : `${units[u]} و${tens[t]}`;
	}
	return [hundreds[h], rStr].filter(Boolean).join(' و');
}

function scaleGroupToArabic(val: number, singular: string, dual: string, plural: string, accSingular: string): string {
	if (val <= 0) return '';
	if (val === 1) return singular;
	if (val === 2) return dual;
	if (val <= 10) return `${underThousandToArabic(val)} ${plural}`;
	if (val === 200) return `مئتا ${singular}`;
	const mod100 = val % 100;
	if (mod100 === 0) return `${underThousandToArabic(val)} ${singular}`;
	if (mod100 === 1) return `${underThousandToArabic(val - 1)} ${singular} و${singular}`;
	if (mod100 === 2) return `${underThousandToArabic(val - 2)} ${singular} و${dual}`;
	if (mod100 >= 3 && mod100 <= 10) return `${underThousandToArabic(val)} ${plural}`;
	return `${underThousandToArabic(val)} ${accSingular}`;
}

/** Converts a natural number in [1 .. 999_999_999] into grammatically sound Arabic words. */
function numberToArabicWords(n: number): string {
	const m = Math.floor(n / 1_000_000);
	const th = Math.floor(n / 1_000) % 1_000;
	const u = n % 1_000;
	const parts: string[] = [];
	if (m > 0) parts.push(scaleGroupToArabic(m, 'مليون', 'مليونان', 'ملايين', 'مليوناً'));
	if (th > 0) parts.push(scaleGroupToArabic(th, 'ألف', 'ألفان', 'آلاف', 'ألفاً'));
	if (u > 0) parts.push(underThousandToArabic(u));
	return parts.join(' و');
}

/** Builds canonical multiplicative decomposition terms `(d * 10^k)` for non-zero digits of `n`. */
function buildCanonicalParts(n: number): { digit: number; placeVal: number }[] {
	const s = String(Math.trunc(n));
	const out: { digit: number; placeVal: number }[] = [];
	for (let i = 0; i < s.length; i++) {
		const d = Number(s[i]);
		if (d > 0) {
			out.push({ digit: d, placeVal: Math.pow(10, s.length - 1 - i) });
		}
	}
	return out;
}

function formatCanonicalTypst(n: number): string {
	return buildCanonicalParts(n)
		.map(({ digit, placeVal }) =>
			placeVal === 1 ? `${digit}` : `(${digit} times ${formatTypstMathNum(placeVal)})`
		)
		.join(' + ');
}

function formatCanonicalKatex(n: number): string {
	return buildCanonicalParts(n)
		.map(({ digit, placeVal }) =>
			placeVal === 1 ? `${digit}` : `(${digit} \\times ${formatKatexNum(placeVal)})`
		)
		.join(' + ');
}

function formatCanonicalPlain(n: number): string {
	return buildCanonicalParts(n)
		.map(({ digit, placeVal }) =>
			placeVal === 1 ? `${digit}` : `(${digit} × ${formatGroupedRtlSafe(placeVal)})`
		)
		.join(' + ');
}

/** Computes `a + b` forgetting one carry in a column that genuinely carries. */
function addWithMissedCarry(a: number, b: number): number {
	const sa = String(a).split('').reverse().map(Number);
	const sb = String(b).split('').reverse().map(Number);
	const len = Math.max(sa.length, sb.length);
	let carry = 0;
	let dropped = false;
	const digits: number[] = [];
	for (let i = 0; i < len; i++) {
		const s = (sa[i] ?? 0) + (sb[i] ?? 0) + carry;
		digits.push(s % 10);
		if (s >= 10 && !dropped && i >= 1) {
			carry = 0;
			dropped = true;
		} else {
			carry = Math.floor(s / 10);
		}
	}
	if (carry > 0) digits.push(carry);
	return Number(digits.reverse().join(''));
}

/** Computes column-wise absolute digit difference `|d_a - d_b|` (classic no-borrow error). */
function subtractNoBorrowDigits(a: number, b: number): number {
	const sa = String(a).split('').reverse().map(Number);
	const sb = String(b).split('').reverse().map(Number);
	const digits: number[] = [];
	for (let i = 0; i < sa.length; i++) {
		digits.push(Math.abs((sa[i] ?? 0) - (sb[i] ?? 0)));
	}
	return Number(digits.reverse().join(''));
}

/** Computes `a - b` forgetting to pay back one borrow in a column that genuinely borrows. */
function subtractForgotPayback(a: number, b: number): number {
	const sa = String(a).split('').reverse().map(Number);
	const sb = String(b).split('').reverse().map(Number);
	let borrow = 0;
	let skippedPayback = false;
	const digits: number[] = [];
	for (let i = 0; i < sa.length; i++) {
		const top = sa[i] ?? 0;
		const bot = (sb[i] ?? 0) + borrow;
		if (top < bot) {
			digits.push(top + 10 - bot);
			if (!skippedPayback && i >= 1) {
				borrow = 0;
				skippedPayback = true;
			} else {
				borrow = 1;
			}
		} else {
			digits.push(top - bot);
			borrow = 0;
		}
	}
	return Number(digits.reverse().join(''));
}

function resolveDistinctNumericMcq(
	correctVal: number,
	candidates: { val: number; diagnosticFeedback: string }[],
	formatText: (val: number) => string,
	rng: SeededRng,
	fallbackFeedback: string
): {
	options: { text: string; diagnosticFeedback?: string }[];
	correctIndices: [number];
} {
	const seen = new Set<number>([correctVal]);
	const distractors: { text: string; diagnosticFeedback: string }[] = [];

	for (const c of candidates) {
		const v = Math.round(c.val);
		if (v > 0 && v < 1_000_000_000 && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: c.diagnosticFeedback });
		}
		if (distractors.length === 3) break;
	}

	const fallbackDeltas = [100, -100, 1000, -1000, 10, -10, 200, 500, 2000, 50];
	for (const d of fallbackDeltas) {
		if (distractors.length === 3) break;
		const v = correctVal + d;
		if (v > 0 && v < 1_000_000_000 && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: fallbackFeedback });
		}
	}

	return buildUniqueMcqOptions(formatText(correctVal), distractors, rng);
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. Large natural numbers (millions): reading, writing, decomposing & framing
// ══════════════════════════════════════════════════════════════════════════════
const templateLargeNumbersMillions: ParameterizedTemplate = {
	id: '5ap_t1_large_numbers_millions',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الأعداد الطبيعية الكبيرة (الملايين): القراءة والكتابة والتفكيك والحصر',
	curriculumLessonId: 'lesson_5ap_t1_large_natural_numbers',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 97 + 11);

		// Construct numbers carefully with internal zeros to test place-value mastery
		let nMain: number;
		let nSecond: number;
		let nThird: number;
		if (difficulty === 'easy') {
			nMain =
				rng.int(1, 9) * 1_000_000 +
				rng.int(1, 8) * 100_000 +
				rng.int(1, 9) * 1_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9);
			nSecond = rng.int(2, 9) * 1_000_000 + rng.int(10, 95) * 10_000 + rng.int(120, 890);
			nThird = rng.int(1, 8) * 1_000_000 + rng.int(120, 890) * 1_000 + rng.int(105, 950);
		} else if (difficulty === 'medium') {
			nMain =
				rng.int(1, 8) * 10_000_000 +
				rng.int(1, 9) * 1_000_000 +
				rng.int(1, 9) * 100_000 +
				rng.int(1, 9) * 1_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9);
			nSecond = rng.int(12, 89) * 1_000_000 + rng.int(1, 9) * 10_000 + rng.int(200, 900);
			nThird = rng.int(15, 94) * 1_000_000 + rng.int(105, 985) * 1_000 + rng.int(10, 95);
		} else {
			nMain =
				rng.int(1, 8) * 100_000_000 +
				rng.int(1, 9) * 10_000_000 +
				rng.int(1, 9) * 100_000 +
				rng.int(1, 9) * 10_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9) * 10;
			nSecond = rng.int(120, 890) * 1_000_000 + rng.int(10, 95) * 1_000 + rng.int(200, 900);
			nThird = rng.int(105, 940) * 1_000_000 + rng.int(120, 880) * 1_000 + rng.int(15, 95);
		}

		const wordsMain = numberToArabicWords(nMain);
		const wordsSecond = numberToArabicWords(nSecond);
		const lowerMillion = Math.floor(nThird / 1_000_000) * 1_000_000;
		const upperMillion = lowerMillion + 1_000_000;
		const thousandsCount = Math.floor(nThird / 1_000);

		let sentence: string;
		let questionText: string;
		let acceptedAnswers: string[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		if (difficulty === 'easy') {
			sentence = `الكتابة بالأرقام للعدد (${wordsMain}) هي: ___`;
			questionText = `اكتب بالأرقام العدد الطبيعي الآتي: **${wordsMain}**`;
			acceptedAnswers = [String(nMain), formatSpaceAscii(nMain)];
			finalAnswer = formatSpaceAscii(nMain);
			hints = [
				'قسّم العدد إلى ثلاث منازل من اليمين إلى اليسار: الوحدات البسيطة، الآلاف، ثم الملايين.',
				'تذكّر أن كل منزلة تتكون من ثلاثة أرقام (آحاد، عشرات، مئات).',
				'املأ المراتب غير المذكورة في النص بالرقم $0$ حتى لا تتغيّر قيمة الأرقام الأخرى.'
			];
			solutionStepsAr = [
				`منزلة الملايين: $${Math.floor(nMain / 1_000_000)}$`,
				`منزلة الآلاف: $${String(Math.floor(nMain / 1_000) % 1_000).padStart(3, '0')}$`,
				`منزلة الوحدات البسيطة: $${String(nMain % 1_000).padStart(3, '0')}$`,
				`إذن الكتابة بالأرقام هي: $${formatKatexNum(nMain)}$`
			];
			explanation = `نضع أرقام الملايين ثم ثلاثة أرقام للآلاف ثم ثلاثة أرقام للوحدات البسيطة فنحصل على ${formatSpaceAscii(nMain)}.`;
		} else if (difficulty === 'medium') {
			const plainDecomp = formatCanonicalPlain(nMain);
			sentence = `أكمل تركيب العدد: ${plainDecomp} = ___`;
			questionText = `ما هو العدد الطبيعي الموافق للتفكيك النموذجي الآتي؟\n\n$${formatCanonicalKatex(nMain)}$`;
			acceptedAnswers = [String(nMain), formatSpaceAscii(nMain)];
			finalAnswer = formatSpaceAscii(nMain);
			hints = [
				'لاحظ أكبر قوة للعدد $10$ في التفكيك ($10\\,000\\,000$) لتعرف عدد أرقام العدد ($8$ أرقام).',
				'ضع كل رقم في منزلته المناسبة حسب الجدول (وحدات، عشرات، مئات، آلاف، ملايين).',
				'إذا لم تجد مرتبة في التفكيك (مثل عشرات الآلاف أو العشرات) ضع مكانها الرقم $0$.'
			];
			solutionStepsAr = [
				`نحسب كل جداء في منزلته: $${formatCanonicalKatex(nMain)}$`,
				`نجمع الحدود مع الحفاظ على الأصفار في المراتب الغائبة.`,
				`النتيجة هي: $${formatKatexNum(nMain)}$`
			];
			explanation = `بتجميع كل رقم في مرتبته ووضع 0 في المراتب غير الموجودة نجد العدد ${formatSpaceAscii(nMain)}.`;
		} else {
			if (seed % 2 === 0) {
				sentence = `في العدد ${formatGroupedRtlSafe(nThird)}، عدد الآلاف هو: ___`;
				questionText = `تأمّل العدد $${formatKatexNum(nThird)}$. ما هو **عدد الآلاف** في هذا العدد (وليس رقم الآلاف)؟`;
				acceptedAnswers = [String(thousandsCount), formatSpaceAscii(thousandsCount)];
				finalAnswer = formatSpaceAscii(thousandsCount);
				hints = [
					'انتبه إلى الفرق بين «رقم الآلاف» و«عدد الآلاف».',
					'رقم الآلاف هو الرقم الموجود في مرتبة آحاد الآلاف فقط، أما عدد الآلاف فيشمل كل الأرقام من مرتبة الآلاف نحو اليسار.',
					'احذف أرقام الوحدات البسيطة الثلاثة من اليمين لتقرأ عدد الآلاف.'
				];
				solutionStepsAr = [
					`العدد المعطى هو: $${formatKatexNum(nThird)}$`,
					`أرقام الوحدات البسيطة هي الأرقام الثلاثة الأخيرة، وبقية الأرقام تمثل مجموعات الألف الكاملة.`,
					`إذن عدد الآلاف هو: $${formatKatexNum(thousandsCount)}$`
				];
				explanation = `لإيجاد عدد الآلاف نحذف أرقام منزلة الوحدات البسيطة الثلاثة من اليمين، فيبقى ${formatSpaceAscii(thousandsCount)}.`;
			} else {
				sentence = `عند حصر العدد ${formatGroupedRtlSafe(nThird)} بين مليونين متتاليين، المليون الأكبر هو: ___`;
				questionText = `احصر العدد $${formatKatexNum(nThird)}$ بين مليونين متتاليين، ثم اكتب **المليون الأكبر منه مباشرة**.`;
				acceptedAnswers = [String(upperMillion), formatSpaceAscii(upperMillion)];
				finalAnswer = formatSpaceAscii(upperMillion);
				hints = [
					'حدّد أولاً عدد الملايين الكاملة في العدد بحذف الأرقام الستة الأولى من اليمين.',
					'المليون الأصغر مباشرة نحصل عليه بتعويض أرقام الآلاف والوحدات البسيطة بأصفار.',
					'المليون الأكبر مباشرة يساوي المليون الأصغر مضافاً إليه $1\\,000\\,000$.'
				];
				solutionStepsAr = [
					`المليون الأصغر مباشرة من $${formatKatexNum(nThird)}$ هو $${formatKatexNum(lowerMillion)}$.`,
					`نضيف $1\\,000\\,000$ لإيجاد المليون الموالي: $${formatKatexNum(lowerMillion)} + 1\\,000\\,000 = ${formatKatexNum(upperMillion)}$.`,
					`الحصر الصحيح: $${formatKatexNum(lowerMillion)} < ${formatKatexNum(nThird)} < ${formatKatexNum(upperMillion)}$`
				];
				explanation = `بين المليونين المتتاليين ${formatSpaceAscii(lowerMillion)} و ${formatSpaceAscii(upperMillion)}، المليون الأكبر هو ${formatSpaceAscii(upperMillion)}.`;
			}
		}

		const blocks: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اكتب بالأرقام العدد الطبيعي الآتي: ${wordsSecond}.`
			},
			{
				type: 'text',
				content: 'الكتابة بالأرقام: ............................................................',
				answer: `الكتابة بالأرقام: $${formatTypstMathNum(nSecond)}$`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `2) فكّك العدد $${formatTypstMathNum(nMain)}$ تفكيكاً نموذجياً، ثم استخرج عدد الآلاف في العدد $${formatTypstMathNum(nThird)}$.`
			},
			{
				type: 'text',
				content: 'التفكيك: .................................................................................... \\ عدد الآلاف: .........................',
				answer: `التفكيك: $${formatCanonicalTypst(nMain)}$ \\ عدد الآلاف: $${formatTypstMathNum(thousandsCount)}$`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) احصر العدد $${formatTypstMathNum(nThird)}$ بين مليونين متتاليين.`
			},
			{
				type: 'text',
				content: `الحصر: $"..........." < ${formatTypstMathNum(nThird)} < "..........."$`,
				answer: `الحصر: $${formatTypstMathNum(lowerMillion)} < ${formatTypstMathNum(nThird)} < ${formatTypstMathNum(upperMillion)}$`,
				mark: '0.5'
			}
		];

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية المتعلقة بالأعداد الطبيعية الكبيرة:',
			content: blocks
		};

		return {
			templateId: '5ap_t1_large_numbers_millions',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'الأعداد الطبيعية الكبيرة (الملايين): القراءة والكتابة والتفكيك والحصر',
			quizQuestion: {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				questionData: {
					sentence,
					acceptedAnswers,
					answers: acceptedAnswers
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. Large natural numbers addition, subtraction & multiplication
// ══════════════════════════════════════════════════════════════════════════════
const templateLargeOperations: ParameterizedTemplate = {
	id: '5ap_t1_large_ops_add_sub_mul',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'جمع وطرح وضرب أعداد طبيعية كبيرة',
	curriculumLessonId: 'lesson_5ap_t1_add_sub_arithmetic_relations',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 131 + 7);

		// Generate all 3 operations for the PDF exercise, ensuring carries/borrows and positive subtraction
		let addA: number, addB: number, subA: number, subB: number, mulA: number, mulB: number;

		if (difficulty === 'easy') {
			addA = rng.int(12, 65) * 1_000 + rng.int(5, 9) * 100 + rng.int(6, 9) * 10 + rng.int(6, 9);
			addB = rng.int(11, 29) * 1_000 + rng.int(6, 9) * 100 + rng.int(5, 9) * 10 + rng.int(5, 9);
			subA = rng.int(52, 95) * 1_000 + rng.int(1, 3) * 100 + rng.int(1, 3) * 10 + rng.int(1, 4);
			subB = rng.int(18, 45) * 1_000 + rng.int(6, 9) * 100 + rng.int(6, 9) * 10 + rng.int(6, 9);
			mulA = rng.int(215, 789);
			mulB = rng.int(1, 4) * 10 + rng.int(2, 9);
		} else if (difficulty === 'medium') {
			addA = rng.int(150, 680) * 1_000 + rng.int(5, 9) * 100 + rng.int(68, 99);
			addB = rng.int(45, 290) * 1_000 + rng.int(6, 9) * 100 + rng.int(45, 89);
			subA = rng.int(4, 8) * 100_000 + rng.int(0, 2) * 10_000 + rng.int(1, 3) * 100 + rng.int(12, 34);
			subB = rng.int(1, 3) * 100_000 + rng.int(5, 9) * 10_000 + rng.int(6, 9) * 100 + rng.int(56, 89);
			mulA = rng.int(1_215, 3_896);
			mulB = rng.int(2, 8) * 10 + rng.int(3, 9);
		} else {
			addA = rng.int(1_450, 6_890) * 1_000 + rng.int(560, 985);
			addB = rng.int(450, 2_890) * 1_000 + rng.int(650, 975);
			subA = rng.int(5, 9) * 1_000_000 + rng.int(1, 3) * 10_000 + rng.int(120, 340);
			subB = rng.int(1, 4) * 1_000_000 + rng.int(5, 9) * 100_000 + rng.int(650, 980);
			mulA = rng.int(1_125, 3_489);
			// 3-digit multiplier with zero in the tens place to test place-value shift
			mulB = rng.int(1, 4) * 100 + rng.int(2, 9);
		}

		const sumVal = addA + addB;
		const diffVal = subA - subB;
		const prodVal = mulA * mulB;

		const opKind = (['add', 'sub', 'mul'] as const)[seed % 3];
		let correctVal: number;
		let exprKatex: string;
		let exprPlain: string;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let fallbackFeedback: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;

		if (opKind === 'add') {
			correctVal = sumVal;
			exprKatex = `$${formatKatexNum(addA)} + ${formatKatexNum(addB)}$`;
			exprPlain = `${formatSpaceAscii(addA)} + ${formatSpaceAscii(addB)}`;
			const missedCarry = addWithMissedCarry(addA, addB);
			const wrongCarryCol = sumVal + 1000;
			const misaligned = addA + addB * 10 < 1_000_000_000 ? addA + addB * 10 : sumVal + 100;
			candidates = [
				{
					val: missedCarry,
					diagnosticFeedback: 'نسيت إضافة الاحتفاظ عند الانتقال إلى المرتبة الأعلى في الجمع العمودي.'
				},
				{
					val: wrongCarryCol,
					diagnosticFeedback: 'راجِع حساب الاحتفاظ في مرتبة الآلاف؛ لقد أضفت $1$ زائداً.'
				},
				{
					val: misaligned,
					diagnosticFeedback: 'انتبه إلى محاذاة الآحاد تحت الآحاد والعشرات تحت العشرات عند وضع العملية العمودية.'
				}
			];
			fallbackFeedback = 'راجع حساب الجمع العمودي والاحتفاظ في كل مرتبة.';
			hints = [
				'ضع العملية عمودياً بمحاذاة الآحاد تحت الآحاد والعشرات تحت العشرات.',
				'ابدأ الجمع من اليمين (الآحاد) ولا تنسَ كتابة الاحتفاظ فوق المرتبة الموالية.',
				'تحقّق من معقولية النتيجة بتقدير رتبة المقدار.'
			];
			solutionStepsAr = [
				`نضع العددين عمودياً مع محاذاة المراتب من اليمين إلى اليسار.`,
				`نجمع كل مرتبة مع إضافة الاحتفاظ عند تجاوز $9$.`,
				`النتيجة النهائية: $${formatKatexNum(addA)} + ${formatKatexNum(addB)} = ${formatKatexNum(sumVal)}$`
			];
			explanation = `بإنجاز الجمع العمودي مع مراعاة الاحتفاظ نجد: ${formatSpaceAscii(addA)} + ${formatSpaceAscii(addB)} = ${formatSpaceAscii(sumVal)}.`;
		} else if (opKind === 'sub') {
			correctVal = diffVal;
			exprKatex = `$${formatKatexNum(subA)} - ${formatKatexNum(subB)}$`;
			exprPlain = `${formatSpaceAscii(subA)} - ${formatSpaceAscii(subB)}`;
			const noBorrow = subtractNoBorrowDigits(subA, subB);
			const forgotPayback = subtractForgotPayback(subA, subB);
			const offByThousand = diffVal + 1000;
			candidates = [
				{
					val: noBorrow,
					diagnosticFeedback: 'لا يمكن طرح الرقم الأصغر من الأكبر بعكس الترتيب دون استعارة؛ يجب الاستعارة من المرتبة الموالية.'
				},
				{
					val: forgotPayback,
					diagnosticFeedback: 'استعرت $10$ في إحدى المراتب ولكنك نسيت إرجاع الواحد المستعار إلى المرتبة الموالية.'
				},
				{
					val: offByThousand,
					diagnosticFeedback: 'انتبه عند الاستعارة عبر الأصفار في المطروح منه، وتحقّق بجمع النتيجة مع المطروح.'
				}
			];
			fallbackFeedback = 'راجع خطوات الطرح العمودي والاستعارة والإرجاع، وتحقق بالجمع.';
			hints = [
				'ضع المطروح منه في الأعلى والمطروح في الأسفل مع محاذاة المراتب من اليمين.',
				'عندما يكون رقم المطروح منه أصغر من رقم المطروح، نستعير $10$ ولا ننسى إرجاع $1$ للمرتبة الموالية.',
				'تحقّق من النتيجة بالجمع: الفارق + المطروح = المطروح منه.'
			];
			solutionStepsAr = [
				`نضع العملية عمودياً: $${formatKatexNum(subA)}$ في الأعلى و$${formatKatexNum(subB)}$ في الأسفل.`,
				`ننجز الطرح من اليمين مع الاستعارة والإرجاع عند الحاجة.`,
				`النتيجة: $${formatKatexNum(subA)} - ${formatKatexNum(subB)} = ${formatKatexNum(diffVal)}$`
			];
			explanation = `بالطرح العمودي مع الاستعارة والإرجاع نجد: ${formatSpaceAscii(subA)} - ${formatSpaceAscii(subB)} = ${formatSpaceAscii(diffVal)}.`;
		} else {
			correctVal = prodVal;
			exprKatex = `$${formatKatexNum(mulA)} \\times ${formatKatexNum(mulB)}$`;
			exprPlain = `${formatSpaceAscii(mulA)} × ${formatSpaceAscii(mulB)}`;
			const units = mulB % 10;
			const tens = Math.floor(mulB / 10) % 10;
			const hundreds = Math.floor(mulB / 100);
			const forgotZeroShift =
				hundreds > 0
					? mulA * units + mulA * hundreds * 10
					: mulA * units + mulA * tens;
			const extraZeroShift =
				hundreds > 0
					? mulA * units + mulA * hundreds * 1000
					: mulA * units + mulA * tens * 100;
			const carryErr = prodVal > 200 ? prodVal - 100 : prodVal + 100;
			candidates = [
				{
					val: forgotZeroShift,
					diagnosticFeedback: 'نسيت وضع صفر (أو صفرَي) الانتقال عند الضرب في العشرات أو المئات!'
				},
				{
					val: extraZeroShift,
					diagnosticFeedback: 'أضفت صفراً زائداً في الجداء الجزئي؛ راجع منزلة كل رقم في المضروب فيه.'
				},
				{
					val: carryErr,
					diagnosticFeedback: 'خطأ في الاحتفاظ أثناء حساب الجداءات الجزئية أو عند جمعها.'
				}
			];
			fallbackFeedback = 'راجع الجداءات الجزئية وأصفار الانتقال ثم أعد الجمع العمودي.';
			hints = [
				'احسب الجداء الجزئي الأول بضرب العدد الأول في رقم آحاد العدد الثاني.',
				'ضع نقطة أو صفراً في منزلة الآحاد (أو صفرين عند المئات) قبل الانتقال إلى المرتبة الموالية.',
				'اجمع الجداءات الجزئية عمودياً لتحصل على النتيجة النهائية.'
			];
			solutionStepsAr = [
				`نحسب الجداء الجزئي الأول: $${formatKatexNum(mulA)} \\times ${units} = ${formatKatexNum(mulA * units)}$`,
				hundreds > 0
					? `رقم العشرات هو $0$، فنضع صفرين ونحسب جداء المئات: $${formatKatexNum(mulA)} \\times ${hundreds * 100} = ${formatKatexNum(mulA * hundreds * 100)}$`
					: `نضع صفر العشرات ونحسب: $${formatKatexNum(mulA)} \\times ${tens * 10} = ${formatKatexNum(mulA * tens * 10)}$`,
				`نجمع الجداءات الجزئية: $${formatKatexNum(prodVal)}$`
			];
			explanation = `بجمع الجداءات الجزئية بعد وضع أصفار الانتقال المناسبة نجد: ${formatSpaceAscii(mulA)} × ${mulB} = ${formatSpaceAscii(prodVal)}.`;
		}

		const mcqBuilt = resolveDistinctNumericMcq(
			correctVal,
			candidates,
			(v) => `$${formatKatexNum(v)}$`,
			rng,
			fallbackFeedback
		);

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'ضع ثم أنجز عمودياً العمليات الآتية:',
			content: [
				{
					type: 'text',
					content: `1) الجمع: $${formatTypstMathNum(addA)} + ${formatTypstMathNum(addB)} = $ ........................................`,
					answer: `1) الجمع: $${formatTypstMathNum(addA)} + ${formatTypstMathNum(addB)} = ${formatTypstMathNum(sumVal)}$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) الطرح: $${formatTypstMathNum(subA)} - ${formatTypstMathNum(subB)} = $ ........................................`,
					answer: `2) الطرح: $${formatTypstMathNum(subA)} - ${formatTypstMathNum(subB)} = ${formatTypstMathNum(diffVal)}$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) الضرب: $${formatTypstMathNum(mulA)} times ${formatTypstMathNum(mulB)} = $ ........................................`,
					answer: `3) الضرب: $${formatTypstMathNum(mulA)} times ${formatTypstMathNum(mulB)} = ${formatTypstMathNum(prodVal)}$`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '5ap_t1_large_ops_add_sub_mul',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'جمع وطرح وضرب أعداد طبيعية كبيرة',
			quizQuestion: {
				type: 'mcq',
				questionText: `احسب ناتج العملية الآتية بدقة:\n\n${exprKatex}`,
				questionTextAr: `احسب ناتج العملية الآتية بدقة:\n\n${exprKatex}`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${exprPlain} = ${formatSpaceAscii(correctVal)}`
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. Simple & decimal fractions (10, 100, 1000) & visual fraction shading
// ══════════════════════════════════════════════════════════════════════════════
const templateFractionsAndDecimals: ParameterizedTemplate = {
	id: '5ap_t1_fractions_decimal_fractions',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الكسور البسيطة والكسور العشرية (10، 100، 1000) وتمثيلها',
	curriculumLessonId: 'lesson_5ap_t1_fractions_and_decimal_fractions',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 149 + 23);

		let total: number;
		let shaded: number;
		if (difficulty === 'easy') {
			total = rng.pick([4, 5, 6, 8, 10]);
			// Avoid shaded === total - shaded so unshaded distractor stays distinct
			const candidates: number[] = [];
			for (let s = 1; s < total; s++) {
				if (s * 2 !== total) candidates.push(s);
			}
			shaded = rng.pick(candidates);
		} else {
			total = 10;
			shaded = rng.pick([1, 2, 3, 4, 6, 7, 8, 9]);
		}

		const svgContent = svgFractionBar(shaded, total);
		const svgUrl = saveSvgAsset(`5ap-t1-frac-${difficulty}-s${seed}`, svgContent);

		let questionText: string;
		let correctOption: string;
		let distractors: { text: string; diagnosticFeedback: string }[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		const whole = rng.int(1, 4);

		if (difficulty === 'easy') {
			const unshaded = total - shaded;
			questionText = `يمثّل الشريط المقابل وحدة مجزّأة إلى $${total}$ أجزاء متساوية. ما الكسر الذي يعبّر عن الجزء الملوّن بالأزرق؟`;
			correctOption = `$\\frac{${shaded}}{${total}}$`;
			distractors = [
				{
					text: `$\\frac{${unshaded}}{${total}}$`,
					diagnosticFeedback: 'انتبه! لقد عددت الأجزاء البيضاء (غير الملوّنة) بدل الأجزاء الملوّنة بالأزرق.'
				},
				{
					text: `$\\frac{${total}}{${shaded}}$`,
					diagnosticFeedback: 'عكست البسط والمقام؛ عدد الأجزاء الملوّنة يكون في البسط (فوق خط الكسر) وعدد كل الأجزاء في المقام.'
				},
				{
					text: `$\\frac{${shaded}}{${unshaded}}$`,
					diagnosticFeedback: 'المقام يمثّل عدد جميع أجزاء الوحدة المتساوية ($' + total + '$) وليس الأجزاء غير الملوّنة فقط.'
				}
			];
			hints = [
				'احسب عدد جميع الأجزاء المتساوية التي قُسّم إليها الشريط؛ هذا العدد هو المقام.',
				'احسب عدد الأجزاء الملوّنة بالأزرق فقط؛ هذا العدد هو البسط.',
				'اكتب الكسر على الشكل: البسط فوق خط الكسر والمقام تحته.'
			];
			solutionStepsAr = [
				`عدد جميع الأجزاء المتساوية في الشريط: $${total}$ (المقام).`,
				`عدد الأجزاء الملوّنة بالأزرق: $${shaded}$ (البسط).`,
				`إذن الكسر المناسب هو: $\\frac{${shaded}}{${total}}$`
			];
			finalAnswer = `${shaded}/${total}`;
			explanation = `الشريط مقسم إلى ${total} أجزاء متساوية ولُوّن منها ${shaded} أجزاء، فيكون الكسر ${shaded}/${total}.`;
		} else if (difficulty === 'medium') {
			if (seed % 2 === 0) {
				questionText = 'الشريط المقابل مقسّم إلى $10$ أجزاء متساوية (عُشر). ما هي **الكتابة العشرية** التي تمثّل الجزء الملوّن بالأزرق؟';
				correctOption = `$0.${shaded}$`;
				const unshaded = 10 - shaded;
				distractors = [
					{
						text: `$0.0${shaded}$`,
						diagnosticFeedback: 'الكتابة $0.0' + shaded + '$ تعني أجزاء من مئة ($\\frac{' + shaded + '}{100}$)، بينما الجزء الملوّن هو أعشار ($\\frac{' + shaded + '}{10}$).'
					},
					{
						text: `$${shaded}.10$`,
						diagnosticFeedback: 'لا نضع البسط قبل الفاصلة والمقام بعدها؛ البسط هنا أصغر من المقام لذا الجزء الصحيح يساوي $0$.'
					},
					{
						text: `$0.${unshaded}$`,
						diagnosticFeedback: 'عدّ الأجزاء الملوّنة بالأزرق وليس الأجزاء المتبقية غير الملوّنة.'
					}
				];
				hints = [
					'اكتب أولاً الكسر الذي يمثّل الجزء الملوّن بمقام $10$.',
					'كل كسر مقامه $10$ وبسطه أصغر من $10$ يكون جزؤه الصحيح $0$.',
					'ضع رقم البسط في أول رقم بعد الفاصلة (منزلة الأعشار).'
				];
				solutionStepsAr = [
					`الجزء الملوّن يمثّل الكسر العشري: $\\frac{${shaded}}{10}$.`,
					`الرقم الأول بعد الفاصلة يمثّل الأعشار، والجزء الصحيح $0$.`,
					`إذن الكتابة العشرية هي: $0.${shaded}$`
				];
				finalAnswer = `0.${shaded}`;
				explanation = `الجزء الملوّن هو ${shaded} أعشار ( ${shaded}/10 ) ويكتب بالفاصلة 0.${shaded}.`;
			} else {
				questionText = `يمثّل الجزء الملوّن بالأزرق في الشريط الكسر العشري $\\frac{${shaded}}{10}$. أيّ كسر عشري بمقام $100$ يساويه؟`;
				correctOption = `$\\frac{${shaded * 10}}{100}$`;
				distractors = [
					{
						text: `$\\frac{${shaded}}{100}$`,
						diagnosticFeedback: 'عند الانتقال من المقام $10$ إلى $100$ نضرب المقام في $10$، لذا يجب ضرب البسط أيضاً في $10$.'
					},
					{
						text: `$\\frac{${shaded * 100}}{100}$`,
						diagnosticFeedback: 'نتج كسر أكبر من الوحدة، وهذا غير ممكن لأن الشريط ملوّن جزئياً فقط.'
					},
					{
						text: `$\\frac{${(10 - shaded) * 10}}{100}$`,
						diagnosticFeedback: 'هذا الكسر يمثّل الجزء الأبيض غير الملوّن وليس الجزء الملوّن بالأزرق.'
					}
				];
				hints = [
					'قارن بين المقامين: كيف ننتقل من $10$ إلى $100$؟ (بالضرب في $10$).',
					'للحفاظ على نفس قيمة الكسر، اضرب البسط والمقام في العدد $10$ نفسه.',
					`$${shaded} \\times 10 = ${shaded * 10}$، إذن الكسر المكافئ هو بمقام $100$.`
				];
				solutionStepsAr = [
					`الجزء الملوّن يمثّل $\\frac{${shaded}}{10}$.`,
					`نضرب البسط والمقام في $10$: $\\frac{${shaded} \\times 10}{10 \\times 10} = \\frac{${shaded * 10}}{100}$.`,
					`كلا الكسرين يساوي $0.${shaded}$.`
				];
				finalAnswer = `${shaded * 10}/100`;
				explanation = `بضرب البسط والمقام في 10 نحصل على الكسر المكافئ ${shaded * 10}/100.`;
			}
		} else {
			if (seed % 2 === 0) {
				const num1000 = whole * 1000 + shaded * 100;
				questionText = `يمثّل الجزء الملوّن في الشريط الكسر $\\frac{${shaded}}{10}$. إذا أضفنا إليه $${whole}$ وحدات كاملة ($${whole} + \\frac{${shaded}}{10}$)، فما هو الكسر العشري المكافئ بمقام $1000$؟`;
				correctOption = `$\\frac{${formatKatexNum(num1000)}}{1000}$`;
				distractors = [
					{
						text: `$\\frac{${formatKatexNum(whole * 100 + shaded * 10)}}{1000}$`,
						diagnosticFeedback: 'تذكّر أن الوحدة الكاملة الواحدة تساوي $\\frac{1000}{1000}$ وليس $\\frac{100}{1000}$.'
					},
					{
						text: `$\\frac{${formatKatexNum(whole * 1000 + shaded)}}{1000}$`,
						diagnosticFeedback: 'الكسر $\\frac{' + shaded + '}{10}$ يساوي $\\frac{' + shaded * 100 + '}{1000}$ (أعشار) وليس $\\frac{' + shaded + '}{1000}$ (أجزاء من ألف).'
					},
					{
						text: `$\\frac{${formatKatexNum(whole * 10 + shaded)}}{1000}$`,
						diagnosticFeedback: 'عند توحيد المقام إلى $1000$ يجب تحويل كل من الوحدات والأعشار إلى أجزاء من ألف.'
					}
				];
				hints = [
					'تذكّر أن كل وحدة كاملة $1 = \\frac{1000}{1000}$.',
					`حوّل الكسر $\\frac{${shaded}}{10}$ إلى مقام $1000$ بضرب البسط والمقام في $100$.`,
					'اجمع البسطين بعد أن يصبح لهما نفس المقام $1000$.'
				];
				solutionStepsAr = [
					`$${whole}$ وحدات تساوي $\\frac{${formatKatexNum(whole * 1000)}}{1000}$.`,
					`الكسر $\\frac{${shaded}}{10} = \\frac{${shaded * 100}}{1000}$.`,
					`المجموع: $\\frac{${formatKatexNum(whole * 1000)}}{1000} + \\frac{${shaded * 100}}{1000} = \\frac{${formatKatexNum(num1000)}}{1000}$.`
				];
				finalAnswer = `${num1000}/1000`;
				explanation = `كل وحدة تساوي 1000/1000 و ${shaded}/10 تساوي ${shaded * 100}/1000، فالمجموع ${num1000}/1000.`;
			} else {
				const num100 = whole * 100 + shaded * 10;
				questionText = `يمثّل الجزء الملوّن في الشريط الكسر $\\frac{${shaded}}{10}$. إذا أضفنا إليه $${whole}$ وحدات كاملة (أي $\\frac{${num100}}{100}$)، فما هي **الكتابة العشرية** للمجموع؟`;
				correctOption = `$${whole}.${shaded}$`;
				distractors = [
					{
						text: `$${whole}.0${shaded}$`,
						diagnosticFeedback: 'الشريط يمثّل $\\frac{' + shaded + '}{10}$ (أعشاراً) وليس أجزاء من مئة، لذا يوضع الرقم $' + shaded + '$ مباشرة بعد الفاصلة.'
					},
					{
						text: `$0.${whole}${shaded}$`,
						diagnosticFeedback: 'الرقم $' + whole + '$ يمثّل وحدات كاملة، لذا يكتب في الجزء الصحيح قبل الفاصلة.'
					},
					{
						text: `$${whole * 10 + shaded}.0$`,
						diagnosticFeedback: 'القيمة تتكوّن من جزء صحيح $' + whole + '$ وجزء عشري $0.' + shaded + '$ وليس عدداً طبيعياً.'
					}
				];
				hints = [
					`فكّك الكسر $\\frac{${num100}}{100}$ إلى عدد طبيعي + كسر أصغر من الوحدة.`,
					`العدد الطبيعي هو $${whole}$ ويمثّل الجزء الصحيح قبل الفاصلة.`,
					`الكسر المتبقي $\\frac{${shaded * 10}}{100} = \\frac{${shaded}}{10}$ يكتب $0.${shaded}$.`
				];
				solutionStepsAr = [
					`$\\frac{${num100}}{100} = ${whole} + \\frac{${shaded * 10}}{100} = ${whole} + \\frac{${shaded}}{10}$`,
					`نكتب الجزء الصحيح $${whole}$ قبل الفاصلة و$${shaded}$ في منزلة الأعشار.`,
					`إذن الكتابة العشرية هي: $${whole}.${shaded}$`
				];
				finalAnswer = `${whole}.${shaded}`;
				explanation = `العدد يتكون من ${whole} وحدات كاملة و ${shaded} أعشار فيكتب ${whole}.${shaded}.`;
			}
		}

		const mcqBuilt = buildUniqueMcqOptions(correctOption, distractors, rng);

		// Typst ExerciseBlock: visual bar + decimal fraction conversions (10, 100, 1000) + framing improper fraction
		const decDen = rng.pick([10, 100, 1000]);
		const decWhole = rng.int(1, 5);
		const decPart = decDen === 10 ? rng.int(1, 9) : decDen === 100 ? rng.int(12, 95) : rng.int(105, 895);
		const decFracNum = decWhole * decDen + decPart;
		const decStr =
			decDen === 10
				? `${decWhole}.${decPart}`
				: decDen === 100
					? `${decWhole}.${String(decPart).padStart(2, '0')}`
					: `${decWhole}.${String(decPart).padStart(3, '0')}`;

		const impDen = rng.pick([4, 5, 10]);
		const impQ = rng.int(2, 5);
		const impR = rng.int(1, impDen - 1);
		const impNum = impQ * impDen + impR;

		const barAnsTypst =
			total === 10
				? `$frac(${shaded}, 10) = 0.${shaded} = frac(${shaded * 10}, 100)$`
				: `$frac(${shaded}, ${total})$`;

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية حول الكسور والكسور العشرية:',
			content: [
				{
					type: 'columns',
					widths: ['1.6fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) عبّر بكسر${total === 10 ? ' وبعدد عشري' : ''} عن الجزء الملوّن بالأزرق في الشريط المقابل.`
						},
						{
							type: 'image',
							src: svgUrl
						}
					]
				},
				{
					type: 'text',
					content: 'الإجابة: ........................................................',
					answer: `الإجابة: ${barAnsTypst}`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) اكتب الكسر العشري $frac(${formatTypstMathNum(decFracNum)}, ${formatTypstMathNum(decDen)})$ على شكل عدد عشري، والعدد $${whole}.${shaded}$ على شكل كسر عشري بمقام $1000$.`
				},
				{
					type: 'text',
					content: `2) التحويل: $frac(${formatTypstMathNum(decFracNum)}, ${formatTypstMathNum(decDen)}) = "......."$ \\ $${whole}.${shaded} = frac(".......", 1000)$`,
					answer: `2) التحويل: $frac(${formatTypstMathNum(decFracNum)}, ${formatTypstMathNum(decDen)}) = ${decStr}$ \\ $${whole}.${shaded} = frac(${formatTypstMathNum(whole * 1000 + shaded * 100)}, 1000)$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) فكّك الكسر $frac(${impNum}, ${impDen})$ إلى مجموع عدد طبيعي وكسر أصغر من الوحدة، ثم احصره بين عددين طبيعيين متتاليين.`
				},
				{
					type: 'text',
					content: `التفكيك: $"........"$ \\ الحصر: $"......." < frac(${impNum}, ${impDen}) < "......."$`,
					answer: `التفكيك: $frac(${impNum}, ${impDen}) = ${impQ} + frac(${impR}, ${impDen})$ \\ الحصر: $${impQ} < frac(${impNum}, ${impDen}) < ${impQ + 1}$`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '5ap_t1_fractions_decimal_fractions',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'الكسور البسيطة والكسور العشرية (10، 100، 1000) وتمثيلها',
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgUrl,
				imageCaption: 'شريط الوحدة المجزّأ إلى أجزاء متساوية',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. Metric length conversions (km, hm, dam, m, dm, cm, mm)
// ══════════════════════════════════════════════════════════════════════════════
const templateMetricLengths: ParameterizedTemplate = {
	id: '5ap_t1_metric_length_conversions',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'measurement',
	titleAr: 'قياس الأطوال والتحويل بين الوحدات المترية',
	curriculumLessonId: 'lesson_5ap_t1_lengths_metric_conversions',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 163 + 31);

		let categories: string[];
		let rawItems: { text: string; category: number }[];
		let questionText: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		if (difficulty === 'easy') {
			const a = rng.int(2, 8);
			const b = rng.int(2, 9);
			if (seed % 2 === 0) {
				// m / dm / cm / mm
				categories = [`يساوي ${ltrUnit(`${a} m`)}`, `يساوي ${ltrUnit(`${b} dm`)}`];
				rawItems = [
					{ text: ltrUnit(`${a * 10} dm`), category: 0 },
					{ text: ltrUnit(`${a * 100} cm`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(a * 1000)} mm`), category: 0 },
					{ text: ltrUnit(`${b * 10} cm`), category: 1 },
					{ text: ltrUnit(`${b * 100} mm`), category: 1 },
					{ text: ltrUnit(`${b - 1} dm 10 cm`), category: 1 }
				];
				questionText = `صنّف القياسات الآتية حسب مساواتها للطول ${ltrUnit(`${a} m`)} أو للطول ${ltrUnit(`${b} dm`)}:`;
				hints = [
					'تذكّر جدول وحدات الطول: $1\\text{ m} = 10\\text{ dm} = 100\\text{ cm} = 1000\\text{ mm}$.',
					`حوّل كل قياس إلى السنتيمتر ($\\text{cm}$) أو المليمتر ($\\text{mm}$) للمقارنة السريعة.`,
					`$${a}\\text{ m} = ${a * 100}\\text{ cm}$، بينما $${b}\\text{ dm} = ${b * 10}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`$${a}\\text{ m} = ${a * 10}\\text{ dm} = ${a * 100}\\text{ cm} = ${formatKatexNum(a * 1000)}\\text{ mm}$`,
					`$${b}\\text{ dm} = ${b * 10}\\text{ cm} = ${b * 100}\\text{ mm} = ${b - 1}\\text{ dm } 10\\text{ cm}$`
				];
				finalAnswer = `${a} m = ${a * 100} cm | ${b} dm = ${b * 10} cm`;
				explanation = `باستعمال جدول التحويلات: 1 m = 10 dm = 100 cm = 1000 mm.`;
			} else {
				// km / hm / dam / m
				categories = [`يساوي ${ltrUnit(`${a} km`)}`, `يساوي ${ltrUnit(`${b} hm`)}`];
				rawItems = [
					{ text: ltrUnit(`${a * 10} hm`), category: 0 },
					{ text: ltrUnit(`${a * 100} dam`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(a * 1000)} m`), category: 0 },
					{ text: ltrUnit(`${b * 10} dam`), category: 1 },
					{ text: ltrUnit(`${b * 100} m`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(b * 1000)} dm`), category: 1 }
				];
				questionText = `صنّف الأطوال الآتية حسب مساواتها للطول ${ltrUnit(`${a} km`)} أو للطول ${ltrUnit(`${b} hm`)}:`;
				hints = [
					'تذكّر ترتيب الوحدات الكبرى: $\\text{km} \\leftarrow \\text{hm} \\leftarrow \\text{dam} \\leftarrow \\text{m}$.',
					'$1\\text{ km} = 10\\text{ hm} = 100\\text{ dam} = 1000\\text{ m}$.',
					`$${a}\\text{ km} = ${formatKatexNum(a * 1000)}\\text{ m}$ بينما $${b}\\text{ hm} = ${b * 100}\\text{ m}$.`
				];
				solutionStepsAr = [
					`$${a}\\text{ km} = ${a * 10}\\text{ hm} = ${a * 100}\\text{ dam} = ${formatKatexNum(a * 1000)}\\text{ m}$`,
					`$${b}\\text{ hm} = ${b * 10}\\text{ dam} = ${b * 100}\\text{ m} = ${formatKatexNum(b * 1000)}\\text{ dm}$`
				];
				finalAnswer = `${a} km = ${formatSpaceAscii(a * 1000)} m | ${b} hm = ${b * 100} m`;
				explanation = `نستعين بجدول وحدات الطول: 1 km = 10 hm = 100 dam = 1000 m.`;
			}
		} else if (difficulty === 'medium') {
			const h1 = rng.int(2, 5);
			const d1 = rng.int(1, 8);
			const u1 = rng.int(2, 9);
			const v1 = h1 * 100 + d1 * 10 + u1; // e.g. 346 m

			let h2 = rng.int(6, 9);
			let d2 = rng.int(1, 8);
			let u2 = rng.int(1, 9);
			if (u2 === u1) u2 = (u1 % 9) + 1;
			const v2 = h2 * 100 + d2 * 10 + u2;

			categories = [`يساوي ${ltrUnit(`${v1} m`)}`, `يساوي ${ltrUnit(`${v2} m`)}`];
			rawItems = [
				{ text: ltrUnit(`${h1} hm ${d1 * 10 + u1} m`), category: 0 },
				{ text: ltrUnit(`${h1 * 10 + d1} dam ${u1} m`), category: 0 },
				{ text: ltrUnit(`${formatGroupedRtlSafe(v1 * 10)} dm`), category: 0 },
				{ text: ltrUnit(`${h2} hm ${d2 * 10 + u2} m`), category: 1 },
				{ text: ltrUnit(`${h2 * 10 + d2} dam ${u2} m`), category: 1 },
				{ text: ltrUnit(`${formatGroupedRtlSafe(v2 * 10)} dm`), category: 1 }
			];
			questionText = `صنّف القياسات المركّبة الآتية حسب مساواتها للطول ${ltrUnit(`${v1} m`)} أو للطول ${ltrUnit(`${v2} m`)}:`;
			hints = [
				'استعمل جدول الأطوال (km | hm | dam | m | dm | cm | mm) وضع كل رقم في خانة وحدته.',
				'حوّل كل قياس مركّب إلى المتر ($\\text{m}$) بجمع أجزائه بعد التحويل.',
				`$${h1}\\text{ hm} = ${h1 * 100}\\text{ m}$ و$${d1}\\text{ dam} = ${d1 * 10}\\text{ m}$.`
			];
			solutionStepsAr = [
				`القياسات الأولى تعطي عند التحويل إلى المتر: $${v1}\\text{ m}$.`,
				`القياسات الثانية تعطي عند التحويل إلى المتر: $${v2}\\text{ m}$.`
			];
			finalAnswer = `${v1} m | ${v2} m`;
			explanation = `نحوّل كل قياس مركب إلى المتر باستخدام جدول التحويلات لمطابقته مع ${v1} m أو ${v2} m.`;
		} else {
			// Hard: threshold comparison across ALL 7 units km, hm, dam, m, dm, cm, mm
			const k = rng.int(3, 8);
			const threshM = k * 1000;
			categories = [
				`أصغر من ${ltrUnit(`${k} km`)}`,
				`أكبر من ${ltrUnit(`${k} km`)}`
			];
			rawItems = [
				{ text: ltrUnit(`${k * 10 - 1} hm ${rng.int(2, 8)} dam`), category: 0 }, // (k*1000 - 100) + 20..80 < k*1000
				{ text: ltrUnit(`${formatGroupedRtlSafe(threshM - 45)} m`), category: 0 },
				{ text: ltrUnit(`${formatGroupedRtlSafe((threshM - 120) * 100)} cm`), category: 0 },
				{ text: ltrUnit(`${k * 10} hm ${rng.int(1, 9)} dam`), category: 1 }, // k*1000 + 10..90 > k*1000
				{ text: ltrUnit(`${formatGroupedRtlSafe(threshM * 10 + 350)} dm`), category: 1 },
				{ text: ltrUnit(`${formatGroupedRtlSafe((threshM + 50) * 1000)} mm`), category: 1 }
			];
			questionText = `حوّل الأطوال الآتية إلى المتر، ثم صنّفها مقارنة بالمسافة ${ltrUnit(`${k} km`)}:`;
			hints = [
				`حوّل الحد المرجعي أولاً إلى المتر: $${k}\\text{ km} = ${formatKatexNum(threshM)}\\text{ m}$.`,
				'حوّل كل طول إلى المتر باستعمال جدول الأطوال ($\\text{km, hm, dam, m, dm, cm, mm}$).',
				'تذكّر حذف صفر واحد عند الانتقال من $\\text{dm}$ إلى $\\text{m}$، وصفرين من $\\text{cm}$، وثلاثة أصفار من $\\text{mm}$.'
			];
			solutionStepsAr = [
				`$${k}\\text{ km} = ${formatKatexNum(threshM)}\\text{ m}$.`,
				`الأطوال الأصغر من $${formatKatexNum(threshM)}\\text{ m}$ توضع في الفئة الأولى، والأكبر في الفئة الثانية.`
			];
			finalAnswer = `المرجع = ${formatSpaceAscii(threshM)} m`;
			explanation = `بتحويل جميع الوحدات (km, hm, dam, m, dm, cm, mm) إلى المتر ومقارنتها بـ ${formatSpaceAscii(threshM)} m.`;
		}

		const items = rng.shuffle(rawItems);

		// Typst ExerciseBlock covering all 7 metric length units
		const c1Km = rng.int(2, 9);
		const c1M = rng.int(15, 85) * 10;
		const c1Ans = c1Km * 1000 + c1M;

		const c2Hm = rng.int(3, 9);
		const c2Dam = rng.int(2, 8);
		const c2AnsDm = (c2Hm * 100 + c2Dam * 10) * 10;

		const c3M = rng.int(4, 9);
		const c3Cm = rng.int(15, 75);
		const c3AnsMm = (c3M * 100 + c3Cm) * 10;

		const c4Cm = rng.int(24, 86) * 10;
		const c4Mm = c4Cm * 10;

		// Ordering values in distinct units (m, hm, dam, km)
		const ordKm = rng.int(2, 4);
		const ordLowM = ordKm * 1000 - rng.int(2, 6) * 100; // e.g. 2600 m
		const ordHm = ordKm * 10 + rng.int(2, 5); // e.g. 34 hm = 3400 m
		const ordDam = ordKm * 100 + rng.int(3, 8); // e.g. 305 dam = 3050 m

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'استعن بجدول الأطوال (km، hm، dam، m، dm، cm، mm) للإجابة عمّا يلي:',
			content: [
				{
					type: 'table',
					headers: ['التحويل المطلوب', 'النتيجة'],
					cells: [],
					rows: [
						[
							ltrUnit(`${c1Km} km ${c1M} m = ...... m`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(c1Ans)} m`), mark: '0.25' }
						],
						[
							ltrUnit(`${c2Hm} hm ${c2Dam} dam = ...... dm`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(c2AnsDm)} dm`), mark: '0.25' }
						],
						[
							ltrUnit(`${c3M} m ${c3Cm} cm = ...... mm`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(c3AnsMm)} mm`), mark: '0.25' }
						],
						[
							ltrUnit(`${formatGroupedRtlSafe(c4Mm)} mm = ...... cm`),
							{ content: '....................................', answer: ltrUnit(`${c4Cm} cm`), mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true
				},
				{
					type: 'text',
					content: `رتّب الأطوال الآتية تصاعدياً (من الأصغر إلى الأكبر) بعد توحيد الوحدة: ${ltrUnit(`${ordHm} hm`)} ، ${ltrUnit(`${formatGroupedRtlSafe(ordLowM)} m`)} ، ${ltrUnit(`${ordDam} dam`)} ، ${ltrUnit(`${ordKm} km`)}.`
				},
				{
					type: 'text',
					content: 'الترتيب التصاعدي (من الأصغر إلى الأكبر): ................................................................................',
					answer: `الترتيب التصاعدي (من الأصغر إلى الأكبر): ${ltrUnit(`${formatGroupedRtlSafe(ordLowM)} m`)} ، ثم ${ltrUnit(`${ordKm} km`)} ، ثم ${ltrUnit(`${ordDam} dam`)} ، ثم ${ltrUnit(`${ordHm} hm`)}`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '5ap_t1_metric_length_conversions',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'measurement',
			titleAr: 'قياس الأطوال والتحويل بين الوحدات المترية',
			quizQuestion: {
				type: 'drag_drop',
				questionText,
				questionTextAr: questionText,
				questionData: {
					categories,
					items
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. Parallel & perpendicular lines, acute/right/obtuse angles (NO degrees!)
// ══════════════════════════════════════════════════════════════════════════════
const templateLinesAndAngles: ParameterizedTemplate = {
	id: '5ap_t1_lines_angles_geometry',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'التوازي والتعامد وتمييز الزوايا (الحادة، القائمة، المنفرجة)',
	curriculumLessonId: 'lesson_5ap_t1_grids_maps_lines_angles',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 179 + 41);

		const useRect = seed % 2 === 0;
		const isTrue = seed % 4 < 2; // seeds mod 4: 0(rect,true), 1(par,true), 2(rect,false), 3(par,false)

		const vertexSets: [string, string, string, string][] = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['M', 'N', 'P', 'Q'],
			['K', 'L', 'R', 'S']
		];
		const v = rng.pick(vertexSets);
		const lenCm = rng.int(5, 9);
		const widCm = rng.int(2, 4);

		const lineNameSets: [string, string][] = [
			['(d)', "(d')"],
			['(D)', "(D')"],
			['(L)', "(L')"],
			['(k)', "(k')"]
		];
		const lines = rng.pick(lineNameSets);

		const svgContent = useRect
			? svgRectangle({
					vertices: v,
					lengthLabel: `${lenCm} cm`,
					widthLabel: `${widCm} cm`
				})
			: svgParallelAngles({
					angleTopLabel: '1',
					angleBottomLabel: '2',
					lineNames: lines
				});

		const svgUrl = saveSvgAsset(`5ap-t1-geom-${difficulty}-s${seed}`, svgContent);

		let questionText: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;
		let tfItems: { q: string; a: string; c: string; mark: string }[];

		if (useRect) {
			const shapeName = `${v[0]}${v[1]}${v[2]}${v[3]}`;
			if (difficulty === 'easy') {
				if (isTrue) {
					questionText = `تأمّل المستطيل $${shapeName}$ المقابل: المستقيمان $(${v[0]} ${v[1]})$ و $(${v[0]} ${v[3]})$ متعامدان ويشكّلان زاوية قائمة.`;
					explanation = `نعم، كل ضلعين متجاورين في المستطيل متعامدان ويشكّلان زاوية قائمة.`;
				} else {
					questionText = `تأمّل المستطيل $${shapeName}$ المقابل: المستقيمان $(${v[0]} ${v[1]})$ و $(${v[3]} ${v[2]})$ متعامدان.`;
					explanation = `خطأ، المستقيمان $(${v[0]}${v[1]})$ و $(${v[3]}${v[2]})$ ضلعان متقابلان في المستطيل، إذن هما متوازيان لا متعامدان.`;
				}
			} else if (difficulty === 'medium') {
				if (isTrue) {
					questionText = `في المستطيل $${shapeName}$ المقابل، المستقيمان $(${v[0]} ${v[1]})$ و $(${v[3]} ${v[2]})$ متوازيان والزاوية التي رأسها $${v[0]}$ زاوية قائمة.`;
					explanation = `صحيح، الضلعان المتقابلان في المستطيل متوازيان وزواياه الأربع قائمة.`;
				} else {
					questionText = `في المستطيل $${shapeName}$ المقابل، الزاوية التي رأسها $${v[1]}$ زاوية حادة أصغر من الزاوية القائمة.`;
					explanation = `خطأ، جميع زوايا المستطيل الأربع زوايا قائمة تنطبق على حافة الكوس.`;
				}
			} else {
				if (isTrue) {
					questionText = `في المستطيل $${shapeName}$ المقابل، المستقيمان $(${v[0]} ${v[3]})$ و $(${v[1]} ${v[2]})$ عموديان على المستقيم $(${v[0]} ${v[1]})$، إذن هما متوازيان.`;
					explanation = `صحيح، المستقيمان العموديان على نفس المستقيم يكونان متوازيين.`;
				} else {
					questionText = `في المستطيل $${shapeName}$ المقابل، المستقيمان $(${v[0]} ${v[3]})$ و $(${v[1]} ${v[2]})$ عموديان على المستقيم $(${v[0]} ${v[1]})$، إذن هما متعامدان فيما بينهما.`;
					explanation = `خطأ، المستقيمان العموديان على نفس المستقيم يكونان متوازيين لا متعامدين.`;
				}
			}

			hints = [
				'لاحظ أن الشكل مستطيل: كل ضلعين متقابلين متوازيان، وكل ضلعين متجاورين متعامدان.',
				'الرمز المربع الأحمر عند الرأس يدل على وجود زاوية قائمة (مثل زاوية الكوس).',
				'تذكّر القاعدة: مستقيمان عموديان على نفس المستقيم هما مستقيمان متوازيان.'
			];
			solutionStepsAr = [
				`الشكل $${shapeName}$ مستطيل، أضلاعه المتقابلة متوازية والمتجاورة متعامدة.`,
				`زواياه الأربع زوايا قائمة.`,
				`إذن العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			];

			tfItems = [
				{
					q: `المستقيمان $(${v[0]} ${v[1]})$ و $(${v[3]} ${v[2]})$ متوازيان.`,
					a: 'صحيح',
					c: 'العبارة صحيحة لأن الضلعين المتقابلين في المستطيل متوازيان.',
					mark: '0.5'
				},
				{
					q: `المستقيمان $(${v[0]} ${v[1]})$ و $(${v[0]} ${v[3]})$ متعامدان.`,
					a: 'صحيح',
					c: 'العبارة صحيحة لأن الضلعين المتجاورين في المستطيل متعامدان.',
					mark: '0.5'
				},
				{
					q: `الزاوية التي رأسها $${v[1]}$ زاوية حادة أصغر من الزاوية القائمة.`,
					a: 'خطأ',
					c: `الزاوية التي رأسها $${v[1]}$ زاوية قائمة (جميع زوايا المستطيل قائمة).`,
					mark: '0.5'
				}
			];
		} else {
			if (difficulty === 'easy') {
				if (isTrue) {
					questionText = `في الشكل المقابل، المستقيمان $${lines[0]}$ و $${lines[1]}$ متوازيان (البعد بينهما ثابت ولا يتقاطعان).`;
					explanation = `صحيح، المستقيمان متوازيان ولا يتقاطعان مهما امتدّا.`;
				} else {
					questionText = `في الشكل المقابل، المستقيمان $${lines[0]}$ و $${lines[1]}$ متعامدان ويشكّلان أربع زوايا قائمة.`;
					explanation = `خطأ، المستقيمان متوازيان لا متعامدان؛ القاطع المائل هو الذي يقطعهما دون تعامد.`;
				}
			} else if (difficulty === 'medium') {
				if (isTrue) {
					questionText = `في الشكل المقابل، الزاوية $(1)$ زاوية حادة لأن فتحتها أصغر من فتحة الزاوية القائمة.`;
					explanation = `صحيح، عند مقارنة الزاوية $(1)$ بحافة الكوس نجدها أضيق من الزاوية القائمة فهي زاوية حادة.`;
				} else {
					questionText = `في الشكل المقابل، الزاوية $(2)$ زاوية حادة لأنها أصغر من الزاوية القائمة.`;
					explanation = `خطأ، الزاوية $(2)$ فتحتها أوسع من الزاوية القائمة فهي زاوية منفرجة.`;
				}
			} else {
				if (isTrue) {
					questionText = `في الشكل المقابل، الزاوية $(1)$ زاوية حادة (أصغر من القائمة) بينما الزاوية $(2)$ زاوية منفرجة (أكبر من القائمة).`;
					explanation = `صحيح، الزاوية $(1)$ أضيق من القائمة (حادة) والزاوية $(2)$ أوسع من القائمة (منفرجة).`;
				} else {
					questionText = `في الشكل المقابل، القاطع يقطع المستقيمين المتوازيين $${lines[0]}$ و $${lines[1]}$ مشكّلاً زوايا قائمة عند التقاطع.`;
					explanation = `خطأ، القاطع مائل وغير عمودي، لذا يشكّل زوايا حادة وزوايا منفرجة وليس زوايا قائمة.`;
				}
			}

			hints = [
				'تحقّق من استقامة المستقيمين الأزرقين: هل يتقاطعان أم يبقى البعد بينهما ثابتاً؟',
				'قارن فتحة كل زاوية مع الزاوية القائمة (الكوس): الأصغر حادة، والأكبر منفرجة.',
				'الزاوية $(1)$ أضيق من زاوية الكوس، أما الزاوية $(2)$ فأوسع من زاوية الكوس.'
			];
			solutionStepsAr = [
				`المستقيمان $${lines[0]}$ و $${lines[1]}$ متوازيان لأن البعد بينهما ثابت.`,
				`الزاوية $(1)$ أصغر من الزاوية القائمة فهي حادة، والزاوية $(2)$ أكبر من الزاوية القائمة فهي منفرجة.`,
				`إذن العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			];

			tfItems = [
				{
					q: `المستقيمان $${lines[0]}$ و $${lines[1]}$ متوازيان.`,
					a: 'صحيح',
					c: 'العبارة صحيحة لأن البعد بينهما ثابت.',
					mark: '0.5'
				},
				{
					q: `الزاوية $(1)$ زاوية منفرجة أكبر من الزاوية القائمة.`,
					a: 'خطأ',
					c: 'الزاوية $(1)$ زاوية حادة لأنها أصغر من الزاوية القائمة.',
					mark: '0.5'
				},
				{
					q: `الزاوية $(2)$ زاوية منفرجة أكبر من الزاوية القائمة.`,
					a: 'صحيح',
					c: 'العبارة صحيحة لأن فتحتها أوسع من الزاوية القائمة.',
					mark: '0.5'
				}
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'تأمّل الشكل الهندسي المقابل (تحقّق باستعمال المسطرة والكوس أو القالب دون استعمال المنقلة)، ثم أجب بـ صحيح أو خطأ مع تصحيح الخطأ:',
			content: [
				{
					type: 'columns',
					widths: ['1.6fr', '1fr'],
					children: [
						{
							type: 'true_false',
							items: tfItems
						},
						{
							type: 'image',
							src: svgUrl
						}
					]
				}
			]
		};

		return {
			templateId: '5ap_t1_lines_angles_geometry',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: 'التوازي والتعامد وتمييز الزوايا (الحادة، القائمة، المنفرجة)',
			quizQuestion: {
				type: 'true_false',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgUrl,
				imageCaption: useRect ? `المستطيل ${v.join('')}` : `المستقيمان ${lines[0]} و ${lines[1]} وقاطع لهما`,
				questionData: {
					correctAnswer: isTrue
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: isTrue ? 'صحيح' : 'خطأ'
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation (max 3 linked questions): large numbers + lengths + fractions
// ══════════════════════════════════════════════════════════════════════════════
const templateIntegrationProject: ParameterizedTemplate = {
	id: '5ap_t1_integration_road_project',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: مشروع تهيئة طريق بلدي',
	curriculumLessonId: 'lesson_5ap_t1_data_tables_exploitation',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + 53);

		// 1. Large numbers (municipal road budget) - guaranteed positive remaining budget
		let costMat: number, costLabor: number, remBudget: number;
		if (difficulty === 'easy') {
			costMat = rng.int(12, 26) * 100_000;
			costLabor = rng.int(4, 9) * 100_000;
			remBudget = rng.int(5, 16) * 100_000;
		} else if (difficulty === 'medium') {
			costMat = rng.int(18, 42) * 100_000 + rng.int(1, 9) * 10_000;
			costLabor = rng.int(6, 15) * 100_000 + rng.int(1, 9) * 10_000;
			remBudget = rng.int(8, 22) * 100_000 + rng.int(1, 9) * 10_000;
		} else {
			costMat = rng.int(42, 88) * 100_000 + rng.int(1, 9) * 15_000;
			costLabor = rng.int(16, 36) * 100_000 + rng.int(1, 9) * 5_000;
			remBudget = rng.int(14, 38) * 100_000 + rng.int(1, 9) * 2_500;
		}
		const totalSpent = costMat + costLabor;
		const budget = totalSpent + remBudget;

		// 2. Metric lengths + 3. Simple fractions (divisible cleanly by 2, 4, 5, 10)
		let lenLabelRtl: string;
		let lenLabelKatex: string;
		let totalLenM: number;
		let m1LabelRtl: string;
		let m1LabelKatex: string;
		let m1M: number;
		let fracNum: number;
		let fracDen: number;

		if (difficulty === 'easy') {
			const totalKm = rng.int(4, 8);
			totalLenM = totalKm * 1000;
			lenLabelRtl = ltrUnit(`${totalKm} km`);
			lenLabelKatex = `$${totalKm}\\text{ km}$`;

			// Keep m1M < 0.45 * totalLenM and multiple of 100
			const maxH = Math.floor((totalLenM * 0.4) / 100);
			m1M = rng.int(8, maxH) * 100;
			m1LabelRtl = ltrUnit(`${formatGroupedRtlSafe(m1M)} m`);
			m1LabelKatex = `$${formatKatexNum(m1M)}\\text{ m}$`;

			[fracNum, fracDen] = rng.pick([
				[1, 2],
				[1, 4],
				[1, 5],
				[1, 10]
			]);
		} else if (difficulty === 'medium') {
			const totalKm = rng.int(5, 10);
			const totalHm = rng.pick([2, 4, 5, 6, 8]);
			totalLenM = totalKm * 1000 + totalHm * 100;
			lenLabelRtl = ltrUnit(`${totalKm} km ${totalHm} hm`);
			lenLabelKatex = `$${totalKm}\\text{ km } ${totalHm}\\text{ hm}$`;

			// m1 expressed in dam (multiple of 20 m so remaining is always divisible by 2, 4, 5, 10)
			const m1Dam = rng.int(10, Math.floor((totalLenM - 1200) / 20)) * 2;
			m1M = m1Dam * 10;
			m1LabelRtl = ltrUnit(`${m1Dam} dam`);
			m1LabelKatex = `$${m1Dam}\\text{ dam}$`;

			[fracNum, fracDen] = rng.pick([
				[3, 4],
				[2, 5],
				[3, 5],
				[3, 10]
			]);
		} else {
			const totalKm = rng.int(6, 12);
			const totalDam = rng.pick([20, 40, 50, 60, 80]);
			totalLenM = totalKm * 1000 + totalDam * 10;
			lenLabelRtl = ltrUnit(`${totalKm} km ${totalDam} dam`);
			lenLabelKatex = `$${totalKm}\\text{ km } ${totalDam}\\text{ dam}$`;

			const m1Hm = rng.int(12, Math.floor((totalLenM - 1600) / 100));
			const m1RemM = rng.pick([20, 40, 60, 80]);
			m1M = m1Hm * 100 + m1RemM;
			m1LabelRtl = ltrUnit(`${m1Hm} hm ${m1RemM} m`);
			m1LabelKatex = `$${m1Hm}\\text{ hm } ${m1RemM}\\text{ m}$`;

			[fracNum, fracDen] = rng.pick([
				[3, 4],
				[2, 5],
				[3, 5],
				[3, 10],
				[7, 10]
			]);
		}

		const rem1M = totalLenM - m1M;
		const baseForFrac = difficulty === 'easy' ? totalLenM : rem1M;
		const m2M = (baseForFrac / fracDen) * fracNum;
		const finalRemM = rem1M - m2M;

		const scenarioIntroTypst =
			`خصّصت بلدية مبلغاً مالياً قدره ${ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)} لتهيئة وتعبيد طريق طوله الإجمالي ${lenLabelRtl}. ` +
			`في المرحلة الأولى، صرفت البلدية مبلغ ${ltrUnit(`${formatGroupedRtlSafe(costMat)} DA`)} لاقتناء المواد ومبلغ ${ltrUnit(`${formatGroupedRtlSafe(costLabor)} DA`)} لأجرة العمال. ` +
			`وفي الشهر الأول، تمّ تعبيد جزء من الطريق طوله ${m1LabelRtl}.`;

		const scenarioIntroKatex =
			`خصّصت بلدية مبلغاً مالياً قدره $${formatKatexNum(budget)}\\text{ DA}$ لتهيئة وتعبيد طريق طوله الإجمالي ${lenLabelKatex}.\n` +
			`في المرحلة الأولى صرفت البلدية $${formatKatexNum(costMat)}\\text{ DA}$ للمواد و$${formatKatexNum(costLabor)}\\text{ DA}$ للأجور، وفي الشهر الأول تمّ تعبيد طول قدره ${m1LabelKatex}.`;

		let quizQuestionText: string;
		let quizCorrect: number;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		const q3TypstPrompt =
			difficulty === 'easy'
				? `3) في الشهر الثاني، أُنجز $frac(${fracNum}, ${fracDen})$ من الطول الإجمالي للطريق. احسب بالمتر طول الجزء المنجز في الشهر الثاني.`
				: difficulty === 'medium'
					? `3) في الشهر الثاني، أُنجز $frac(${fracNum}, ${fracDen})$ من الطول المتبقي بعد الشهر الأول. احسب بالمتر طول الجزء المنجز في الشهر الثاني.`
					: `3) في الشهر الثاني، أُنجز $frac(${fracNum}, ${fracDen})$ من الطول المتبقي بعد الشهر الأول. احسب بالمتر الطول الذي بقي دون تعبيد بعد الشهر الثاني.`;

		const q3TypstAnswer =
			difficulty === 'easy'
				? `طول الجزء المنجز في الشهر الثاني: $(${formatTypstMathNum(totalLenM)} div ${fracDen}) times ${fracNum} = ${formatTypstMathNum(m2M)}$ متراً (${ltrUnit(`${formatGroupedRtlSafe(m2M)} m`)})`
				: difficulty === 'medium'
					? `طول الجزء المنجز في الشهر الثاني: $(${formatTypstMathNum(rem1M)} div ${fracDen}) times ${fracNum} = ${formatTypstMathNum(m2M)}$ متراً (${ltrUnit(`${formatGroupedRtlSafe(m2M)} m`)})`
					: `المنجز في الشهر الثاني: $(${formatTypstMathNum(rem1M)} div ${fracDen}) times ${fracNum} = ${formatTypstMathNum(m2M)}$ متراً \\ المتبقي النهائي: $${formatTypstMathNum(rem1M)} - ${formatTypstMathNum(m2M)} = ${formatTypstMathNum(finalRemM)}$ متراً (${ltrUnit(`${formatGroupedRtlSafe(finalRemM)} m`)})`;

		if (difficulty === 'easy') {
			quizCorrect = m2M;
			quizQuestionText =
				`${scenarioIntroKatex}\n\n` +
				`إذا أُنجز في الشهر الثاني $\\frac{${fracNum}}{${fracDen}}$ من **الطول الإجمالي للطريق**، فما هو طول الجزء المنجز في الشهر الثاني بالمتر؟`;
			const wrongKmTo100 = Math.max(100, Math.round((totalLenM / 10 / fracDen) * fracNum));
			const wrongCompl = m1M + m2M;
			const wrongFromRem = Math.round((rem1M / fracDen) * fracNum);
			candidates = [
				{
					val: wrongKmTo100,
					diagnosticFeedback: 'خطأ في تحويل الكيلومتر إلى المتر: تذكّر أن $1\\text{ km} = 1000\\text{ m}$ وليس $100\\text{ m}$.'
				},
				{
					val: wrongFromRem,
					diagnosticFeedback: 'السؤال يطلب كسراً من الطول الإجمالي للطريق وليس من الطول المتبقي.'
				},
				{
					val: wrongCompl,
					diagnosticFeedback: 'جمعت طول الشهر الأول مع طول الشهر الثاني، والمطلوب هو طول الجزء المنجز في الشهر الثاني فقط.'
				}
			];
			hints = [
				'ابدأ بتحويل الطول الإجمالي للطريق من الكيلومتر إلى المتر ($1\\text{ km} = 1000\\text{ m}$).',
				`لحساب $\\frac{${fracNum}}{${fracDen}}$ من الطول الإجمالي، اقسم الطول بالمتر على المقام ($${fracDen}$).`,
				`القسمة تعطيك $${formatKatexNum(totalLenM)} \\div ${fracDen} = ${formatKatexNum(m2M)}\\text{ m}$.`
			];
			solutionStepsAr = [
				`المصاريف الأولى: $${formatKatexNum(costMat)} + ${formatKatexNum(costLabor)} = ${formatKatexNum(totalSpent)}\\text{ DA}$، المتبقي: $${formatKatexNum(remBudget)}\\text{ DA}$.`,
				`الطول الإجمالي بالمتر: $${formatKatexNum(totalLenM)}\\text{ m}$، والمتبقي بعد الشهر الأول: $${formatKatexNum(totalLenM)} - ${formatKatexNum(m1M)} = ${formatKatexNum(rem1M)}\\text{ m}$.`,
				`الجزء المنجز في الشهر الثاني: $${formatKatexNum(totalLenM)} \\div ${fracDen} = ${formatKatexNum(m2M)}\\text{ m}$.`
			];
			finalAnswer = `${formatSpaceAscii(m2M)} m`;
			explanation = `نحول الطول الإجمالي إلى ${formatSpaceAscii(totalLenM)} m ثم نقسم على ${fracDen} فنجد ${formatSpaceAscii(m2M)} m.`;
		} else if (difficulty === 'medium') {
			quizCorrect = m2M;
			quizQuestionText =
				`${scenarioIntroKatex}\n\n` +
				`في الشهر الثاني، أُنجز $\\frac{${fracNum}}{${fracDen}}$ من **الطول المتبقي** بعد الشهر الأول. ما هو طول الجزء المنجز في الشهر الثاني بالمتر؟`;
			const wrongOfTotal = Math.round((totalLenM / fracDen) * fracNum);
			const wrongUnitFraction = Math.round(rem1M / fracDen);
			const wrongUnconverted = Math.max(50, rem1M - m2M);
			candidates = [
				{
					val: wrongOfTotal,
					diagnosticFeedback: 'انتبه لنص المسألة: الكسر مأخوذ من الطول المتبقي بعد الشهر الأول وليس من الطول الإجمالي.'
				},
				{
					val: wrongUnitFraction,
					diagnosticFeedback: `قسّمت على المقام $${fracDen}$ فقط ونسيت الضرب في البسط $${fracNum}$!`
				},
				{
					val: wrongUnconverted,
					diagnosticFeedback: 'هذه قيمة الطول المتبقي بعد الشهر الثاني وليست قيمة الجزء المنجز فيه.'
				}
			];
			hints = [
				'حوّل كلاً من الطول الإجمالي وطول الشهر الأول إلى نفس الوحدة (المتر) ثم اطرح لإيجاد الطول المتبقي.',
				`لا تأخذ الكسر $\\frac{${fracNum}}{${fracDen}}$ من الطول الإجمالي، بل من الطول المتبقي بعد الشهر الأول.`,
				`اقسم الطول المتبقي على $${fracDen}$ ثم اضرب الناتج في $${fracNum}$.`
			];
			solutionStepsAr = [
				`نحوّل إلى المتر: الطول الإجمالي $= ${formatKatexNum(totalLenM)}\\text{ m}$، والشهر الأول $= ${formatKatexNum(m1M)}\\text{ m}$.`,
				`الطول المتبقي بعد الشهر الأول: $${formatKatexNum(totalLenM)} - ${formatKatexNum(m1M)} = ${formatKatexNum(rem1M)}\\text{ m}$.`,
				`طول الجزء المنجز في الشهر الثاني: $(${formatKatexNum(rem1M)} \\div ${fracDen}) \\times ${fracNum} = ${formatKatexNum(m2M)}\\text{ m}$.`
			];
			finalAnswer = `${formatSpaceAscii(m2M)} m`;
			explanation = `الطول المتبقي بعد الشهر الأول ${formatSpaceAscii(rem1M)} m، وبحساب ${fracNum}/${fracDen} منه نجد ${formatSpaceAscii(m2M)} m.`;
		} else {
			quizCorrect = finalRemM;
			quizQuestionText =
				`${scenarioIntroKatex}\n\n` +
				`في الشهر الثاني، أُنجز $\\frac{${fracNum}}{${fracDen}}$ من **الطول المتبقي** بعد الشهر الأول. ما هو الطول الذي **بقي دون تعبيد** بالمتر بعد الشهر الثاني؟`;
			const wrongStopAtM2 = m2M;
			const wrongForgotMonth1 = totalLenM - m2M;
			const wrongUnitOnly = rem1M - Math.round(rem1M / fracDen);
			candidates = [
				{
					val: wrongStopAtM2,
					diagnosticFeedback: 'لقد حسبت طول الجزء المنجز في الشهر الثاني فقط، بينما المطلوب هو الطول المتبقي دون تعبيد!'
				},
				{
					val: wrongForgotMonth1,
					diagnosticFeedback: 'طرحت المنجز في الشهر الثاني من الطول الإجمالي ونسيت طرح ما أُنجز في الشهر الأول.'
				},
				{
					val: wrongUnitOnly,
					diagnosticFeedback: `عند حساب $\\frac{${fracNum}}{${fracDen}}$ يجب القسمة على $${fracDen}$ ثم الضرب في $${fracNum}$.`
				}
			];
			hints = [
				'الخطوة الأولى: حوّل الطول الإجمالي وطول الشهر الأول إلى المتر واحسب الطول المتبقي.',
				`الخطوة الثانية: احسب $\\frac{${fracNum}}{${fracDen}}$ من الطول المتبقي (القسمة على $${fracDen}$ ثم الضرب في $${fracNum}$).`,
				'الخطوة الثالثة: اطرح المنجز في الشهر الثاني من الطول المتبقي بعد الشهر الأول.'
			];
			solutionStepsAr = [
				`الطول الإجمالي $= ${formatKatexNum(totalLenM)}\\text{ m}$، المنجز في الشهر الأول $= ${formatKatexNum(m1M)}\\text{ m}$.`,
				`المتبقي بعد الشهر الأول: $${formatKatexNum(totalLenM)} - ${formatKatexNum(m1M)} = ${formatKatexNum(rem1M)}\\text{ m}$.`,
				`المنجز في الشهر الثاني: $(${formatKatexNum(rem1M)} \\div ${fracDen}) \\times ${fracNum} = ${formatKatexNum(m2M)}\\text{ m}$.`,
				`المتبقي دون تعبيد بعد الشهر الثاني: $${formatKatexNum(rem1M)} - ${formatKatexNum(m2M)} = ${formatKatexNum(finalRemM)}\\text{ m}$.`
			];
			finalAnswer = `${formatSpaceAscii(finalRemM)} m`;
			explanation = `المتبقي بعد الشهر الأول ${formatSpaceAscii(rem1M)} m، والمنجز في الثاني ${formatSpaceAscii(m2M)} m، فيبقى دون تعبيد ${formatSpaceAscii(finalRemM)} m.`;
		}

		const mcqBuilt = resolveDistinctNumericMcq(
			quizCorrect,
			candidates,
			(v) => `$${formatKatexNum(v)}\\text{ m}$`,
			rng,
			'راجع التحويل إلى المتر وخطوات حساب الكسر من المقدار.'
		);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: scenarioIntroTypst,
			content: [
				{
					type: 'text',
					content: '1) احسب المبلغ الإجمالي الذي صرفته البلدية في المرحلة الأولى، ثم احسب المبلغ المتبقي من الميزانية (أنجز العمليات عمودياً).'
				},
				{
					type: 'text',
					content: 'المبلغ المصروف: .............................. \\ المبلغ المتبقي: ..............................',
					answer: `المصروف: $${formatTypstMathNum(costMat)} + ${formatTypstMathNum(costLabor)} = ${formatTypstMathNum(totalSpent)}$ ديناراً \\ المتبقي: $${formatTypstMathNum(budget)} - ${formatTypstMathNum(totalSpent)} = ${formatTypstMathNum(remBudget)}$ ديناراً`,
					mark: '1'
				},
				{
					type: 'text',
					content: '2) احسب بالمتر طول الجزء المتبقي من الطريق بعد انتهاء الشهر الأول.'
				},
				{
					type: 'text',
					content: 'التحويل والطرح: ........................................................................',
					answer: `التحويل: ${ltrUnit(`${formatGroupedRtlSafe(totalLenM)} m`)} و ${ltrUnit(`${formatGroupedRtlSafe(m1M)} m`)} \\ المتبقي: $${formatTypstMathNum(totalLenM)} - ${formatTypstMathNum(m1M)} = ${formatTypstMathNum(rem1M)}$ متراً`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: q3TypstPrompt
				},
				{
					type: 'text',
					content: 'الإجابة: ..................................................................................',
					answer: q3TypstAnswer,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: '5ap_t1_integration_road_project',
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: مشروع تهيئة طريق بلدي',
			quizQuestion: {
				type: 'mcq',
				questionText: quizQuestionText,
				questionTextAr: quizQuestionText,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation
			},
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_5AP_T1: ParameterizedTemplate[] = [
	templateLargeNumbersMillions,
	templateLargeOperations,
	templateFractionsAndDecimals,
	templateMetricLengths,
	templateLinesAndAngles,
	templateIntegrationProject
];
