import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock, TableCell } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgBarChart, svgRectangle } from '../../svg-helpers';

const NBSP = '\u00A0';
const LRI = '\u2066';
const PDI = '\u2069';

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

/** Formats a natural number with normal ASCII spaces every 3 digits (for acceptedAnswers / plain strings). */
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

function thousandsGroupToArabic(val: number): string {
	if (val <= 0) return '';
	if (val === 1) return 'ألف';
	if (val === 2) return 'ألفان';
	if (val <= 10) return `${underThousandToArabic(val)} آلاف`;
	if (val === 200) return 'مئتا ألف';
	const mod100 = val % 100;
	if (mod100 === 0) return `${underThousandToArabic(val)} ألف`;
	if (mod100 === 1) return `${underThousandToArabic(val - 1)} وألف`;
	if (mod100 === 2) return `${underThousandToArabic(val - 2)} وألفان`;
	if (mod100 >= 3 && mod100 <= 10) return `${underThousandToArabic(val)} آلاف`;
	return `${underThousandToArabic(val)} ألفاً`;
}

/** Converts a natural number in [1 .. 999_999] into Modern Standard Arabic words. */
function numberToArabicWords(n: number): string {
	const clamped = Math.max(1, Math.min(999_999, Math.trunc(n)));
	const th = Math.floor(clamped / 1_000);
	const u = clamped % 1_000;
	const parts: string[] = [];
	if (th > 0) parts.push(thousandsGroupToArabic(th));
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

/** Ensures all numeric MCQ options stay strictly within 4AP bounds [1 .. 999_999] and are unique. */
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
		if (v > 0 && v < 1_000_000 && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: c.diagnosticFeedback });
		}
		if (distractors.length === 3) break;
	}

	const fallbackDeltas = [100, -100, 1_000, -1_000, 10, -10, 200, 500, 2_000, 50, -50, 20];
	for (const d of fallbackDeltas) {
		if (distractors.length === 3) break;
		const v = correctVal + d;
		if (v > 0 && v < 1_000_000 && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: fallbackFeedback });
		}
	}

	return buildUniqueMcqOptions(formatText(correctVal), distractors, rng);
}

/** Custom SVG: Collinear points on (k) with two perpendicular parallel lines (d1), (d2) and oblique line (m). */
function svgParallelPerpLines(opts: {
	baseLine: string;
	perp1: string;
	perp2: string;
	oblique: string;
	pts: [string, string, string];
}): string {
	const w = 340;
	const h = 166;
	const parts = [
		`<line x1="20" y1="120" x2="320" y2="120" stroke="#0f172a" stroke-width="2.2"/>`,
		`<text x="304" y="138" font-size="12" font-weight="bold" fill="#0f172a">${opts.baseLine}</text>`,
		`<line x1="88" y1="18" x2="88" y2="152" stroke="#1d4ed8" stroke-width="2.2"/>`,
		`<text x="64" y="30" font-size="12" font-weight="bold" fill="#1d4ed8">${opts.perp1}</text>`,
		`<rect x="88" y="108" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		`<line x1="194" y1="18" x2="194" y2="152" stroke="#15803d" stroke-width="2.2"/>`,
		`<text x="170" y="30" font-size="12" font-weight="bold" fill="#15803d">${opts.perp2}</text>`,
		`<rect x="194" y="108" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		`<line x1="236" y1="152" x2="296" y2="20" stroke="#6d28d9" stroke-width="2"/>`,
		`<text x="298" y="34" font-size="12" font-weight="bold" fill="#6d28d9">${opts.oblique}</text>`,
		`<circle cx="88" cy="120" r="4" fill="#dc2626"/>`,
		`<text x="74" y="137" font-size="12" font-weight="bold" fill="#dc2626">${opts.pts[0]}</text>`,
		`<circle cx="194" cy="120" r="4" fill="#dc2626"/>`,
		`<text x="180" y="137" font-size="12" font-weight="bold" fill="#dc2626">${opts.pts[1]}</text>`,
		`<circle cx="250" cy="120" r="4" fill="#dc2626"/>`,
		`<text x="256" y="137" font-size="12" font-weight="bold" fill="#dc2626">${opts.pts[2]}</text>`
	];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/** Custom SVG: Square with equal-side tick marks, 4 right-angle markers, and equal perpendicular diagonals. */
function svgSquare(opts: {
	vertices: [string, string, string, string];
	sideLabel: string;
}): string {
	const w = 260;
	const h = 165;
	const x = 75;
	const y = 26;
	const s = 96;
	const v = opts.vertices;
	const parts = [
		`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.2"/>`,
		`<rect x="${x}" y="${y}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="${x + s - 10}" y="${y}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="${x}" y="${y + s - 10}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="${x + s - 10}" y="${y + s - 10}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<line x1="${x}" y1="${y}" x2="${x + s}" y2="${y + s}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 3"/>`,
		`<line x1="${x + s}" y1="${y}" x2="${x}" y2="${y + s}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 3"/>`,
		// Equal side tick marks
		`<line x1="${x + s / 2}" y1="${y - 5}" x2="${x + s / 2}" y2="${y + 5}" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="${x + s / 2}" y1="${y + s - 5}" x2="${x + s / 2}" y2="${y + s + 5}" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="${x - 5}" y1="${y + s / 2}" x2="${x + 5}" y2="${y + s / 2}" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="${x + s - 5}" y1="${y + s / 2}" x2="${x + s + 5}" y2="${y + s / 2}" stroke="#15803d" stroke-width="2"/>`,
		`<text x="${x - 14}" y="${y - 4}" font-size="13" font-weight="bold" fill="#0f172a">${v[0]}</text>`,
		`<text x="${x + s + 6}" y="${y - 4}" font-size="13" font-weight="bold" fill="#0f172a">${v[1]}</text>`,
		`<text x="${x + s + 6}" y="${y + s + 13}" font-size="13" font-weight="bold" fill="#0f172a">${v[2]}</text>`,
		`<text x="${x - 14}" y="${y + s + 13}" font-size="13" font-weight="bold" fill="#0f172a">${v[3]}</text>`,
		`<text x="${x + s / 2}" y="${y + s + 22}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">${opts.sideLabel}</text>`,
		`<text x="${x + s + 26}" y="${y + s / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">${opts.sideLabel}</text>`
	];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/** Custom SVG: Rhombus with equal-side tick marks and perpendicular unequal diagonals. */
function svgRhombus(opts: {
	vertices: [string, string, string, string];
	diag1Label: string;
	diag2Label: string;
	sideLabel: string;
}): string {
	const w = 340;
	const h = 166;
	const v = opts.vertices;
	const parts = [
		`<polygon points="122,22 198,82 122,142 46,82" fill="#fefce8" stroke="#ca8a04" stroke-width="2.2"/>`,
		`<line x1="122" y1="22" x2="122" y2="142" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4 3"/>`,
		`<line x1="46" y1="82" x2="198" y2="82" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4 3"/>`,
		`<rect x="122" y="71" width="11" height="11" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		// Equal side tick marks
		`<line x1="80" y1="48" x2="88" y2="56" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="156" y1="56" x2="164" y2="48" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="80" y1="116" x2="88" y2="108" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="156" y1="108" x2="164" y2="116" stroke="#15803d" stroke-width="2"/>`,
		`<text x="122" y="15" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${v[0]}</text>`,
		`<text x="208" y="86" font-size="13" font-weight="bold" fill="#0f172a">${v[1]}</text>`,
		`<text x="122" y="158" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${v[2]}</text>`,
		`<text x="32" y="86" font-size="13" font-weight="bold" fill="#0f172a">${v[3]}</text>`,
		`<text x="228" y="64" font-size="12" font-weight="bold" fill="#1d4ed8">${v[0]}${v[2]} = ${opts.diag1Label}</text>`,
		`<text x="228" y="86" font-size="12" font-weight="bold" fill="#1d4ed8">${v[1]}${v[3]} = ${opts.diag2Label}</text>`,
		`<text x="228" y="108" font-size="12" font-weight="bold" fill="#15803d">${v[0]}${v[1]} = ${opts.sideLabel}</text>`
	];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. Numeric: Natural numbers to 999,999 (reading, decomposition, rank vs count, bounding)
// ══════════════════════════════════════════════════════════════════════════════
const templateNumbersTo999999: ParameterizedTemplate = {
	id: '4ap_t1_numbers_to_999999',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الأعداد إلى 999 999: القراءة، التفكيك، المقارنة والحصر',
	curriculumLessonId: 'lesson_4ap_t1_numbers_to_999999',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 11);

		let nMain: number;
		let nSecond: number;
		let nThird: number;
		let nCompare: number;

		if (difficulty === 'easy') {
			// 5-digit and 6-digit numbers with zero in internal rank
			nMain =
				rng.int(1, 8) * 100_000 +
				rng.int(1, 9) * 1_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9);
			nSecond = rng.int(1, 8) * 10_000 + rng.int(1, 9) * 1_000 + rng.int(1, 9) * 10 + rng.int(1, 9);
			nThird = rng.int(1, 8) * 100_000 + rng.int(12, 89) * 1_000 + rng.int(120, 890);
		} else if (difficulty === 'medium') {
			nMain =
				rng.int(1, 8) * 100_000 +
				rng.int(1, 9) * 1_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9) * 10 +
				rng.int(1, 9);
			nSecond = rng.int(2, 9) * 100_000 + rng.int(1, 9) * 10_000 + rng.int(1, 9) * 10 + rng.int(1, 9);
			nThird = rng.int(2, 9) * 100_000 + rng.int(10, 89) * 1_000 + rng.int(105, 950);
		} else {
			nMain =
				rng.int(2, 9) * 100_000 +
				rng.int(1, 9) * 10_000 +
				rng.int(1, 9) * 100 +
				rng.int(1, 9);
			nSecond = rng.int(1, 8) * 100_000 + rng.int(1, 9) * 1_000 + rng.int(1, 9) * 10 + rng.int(1, 9);
			nThird = rng.int(2, 9) * 100_000 + rng.int(12, 85) * 1_000 + rng.int(115, 945);
		}

		// Guarantee distinct comparison number strictly < 999_999
		nCompare = nThird + (seed % 2 === 0 ? 1_200 : -1_200);
		if (nCompare >= 999_000 || nCompare <= 10_000) nCompare = nThird - 1_200;
		const cmpSymbol = nThird < nCompare ? '<' : '>';

		const wordsMain = numberToArabicWords(nMain);
		const wordsSecond = numberToArabicWords(nSecond);
		const hundredsCount = Math.floor(nThird / 100);
		const hundredsDigit = hundredsCount % 10;
		const thousandsCount = Math.floor(nThird / 1_000);
		const lowerThousand = thousandsCount * 1_000;
		const upperThousand = lowerThousand + 1_000;
		const lowerTenThousand = Math.floor(nThird / 10_000) * 10_000;
		const upperTenThousand = lowerTenThousand + 10_000;

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
				'قسّم العدد إلى منزلتين من اليمين إلى اليسار: منزلة الوحدات البسيطة ثم منزلة الآلاف.',
				'تذكّر أن كل منزلة تتكون من ثلاث مراتب (وحدات، عشرات، مئات).',
				'ضع الرقم $0$ في كل مرتبة غير مذكورة في النص (مثل عشرات الآلاف أو العشرات).'
			];
			solutionStepsAr = [
				`منزلة الآلاف: $${String(Math.floor(nMain / 1_000)).padStart(3, '0')}$`,
				`منزلة الوحدات البسيطة: $${String(nMain % 1_000).padStart(3, '0')}$`,
				`إذن الكتابة بالأرقام هي: $${formatKatexNum(nMain)}$`
			];
			explanation = `نكتب أرقام منزلة الآلاف ثم ثلاثة أرقام لمنزلة الوحدات البسيطة مع تعويض المراتب الغائبة بالصفر فنجد ${formatSpaceAscii(nMain)}.`;
		} else if (difficulty === 'medium') {
			const plainDecomp = formatCanonicalPlain(nMain);
			sentence = `أكمل تركيب العدد: ${plainDecomp} = ___`;
			questionText = `ما هو العدد الطبيعي الموافق للتفكيك النموذجي الآتي؟\n\n$${formatCanonicalKatex(nMain)}$`;
			acceptedAnswers = [String(nMain), formatSpaceAscii(nMain)];
			finalAnswer = formatSpaceAscii(nMain);
			hints = [
				'ابدأ بتحديد أكبر مرتبة في التفكيك ($100\\,000$) لتعرف أن العدد مكوّن من $6$ أرقام.',
				'رتّب كل رقم في خانته داخل جدول المراتب (مئات الآلاف، عشرات الآلاف، الآلاف، المئات، العشرات، الوحدات).',
				'المرتبة غير الموجودة في التفكيك (مثل عشرات الآلاف) نضع مكانها الرقم $0$.'
			];
			solutionStepsAr = [
				`نقرأ قيمة كل جداء في التفكيك: $${formatCanonicalKatex(nMain)}$.`,
				`نضع كل رقم في مرتبته ونملأ المراتب الغائبة بالرقم $0$.`,
				`العدد الناتج هو: $${formatKatexNum(nMain)}$`
			];
			explanation = `بجمع قيم المراتب ووضع 0 في المرتبة الغائبة نجد العدد ${formatSpaceAscii(nMain)}.`;
		} else {
			if (seed % 2 === 0) {
				sentence = `في العدد ${formatGroupedRtlSafe(nThird)}، عدد المئات هو: ___`;
				questionText = `تأمّل العدد $${formatKatexNum(nThird)}$. ما هو **عدد المئات** في هذا العدد (انتبه للفرق بين رقم المئات وعدد المئات)؟`;
				acceptedAnswers = [String(hundredsCount), formatSpaceAscii(hundredsCount)];
				finalAnswer = formatSpaceAscii(hundredsCount);
				hints = [
					'تذكّر الفرق بين «رقم المئات» (رقم الخانة الواحدة فقط) و«عدد المئات».',
					`في هذا العدد، رقم المئات هو $${hundredsDigit}$، أما عدد المئات فيشمل خانة المئات وكل الأرقام على يسارها.`,
					'احذف رقمي الوحدات والعشرات من اليمين لتقرأ عدد المئات الكلي.'
				];
				solutionStepsAr = [
					`العدد المعطى هو: $${formatKatexNum(nThird)}$، ورقم مئاته هو $${hundredsDigit}$.`,
					`نأخذ خانة المئات مع جميع الأرقام الموجودة على يسارها (بحذف رقمي العشرات والآحاد).`,
					`إذن عدد المئات هو: $${formatKatexNum(hundredsCount)}$`
				];
				explanation = `لإيجاد عدد المئات نحذف رقمي العشرات والآحاد من اليمين فنقرأ ${formatSpaceAscii(hundredsCount)}.`;
			} else {
				sentence = `عند حصر العدد ${formatGroupedRtlSafe(nThird)} بين عشرتي آلاف متتاليتين، الحد الأكبر هو: ___`;
				questionText = `احصر العدد $${formatKatexNum(nThird)}$ بين **عشرتي آلاف متتاليتين**، ثم اكتب **الحد الأكبر مباشرة**.`;
				acceptedAnswers = [String(upperTenThousand), formatSpaceAscii(upperTenThousand)];
				finalAnswer = formatSpaceAscii(upperTenThousand);
				hints = [
					'حدّد أولاً عدد عشرات الآلاف في العدد (احذف الأرقام الأربعة الأولى من اليمين).',
					'الحد الأصغر نحصل عليه بتعويض الأرقام الأربعة على اليمين بأصفار.',
					'الحد الأكبر مباشرة يساوي الحد الأصغر مضافاً إليه $10\\,000$.'
				];
				solutionStepsAr = [
					`عشرة الآلاف الأصغر مباشرة من $${formatKatexNum(nThird)}$ هي $${formatKatexNum(lowerTenThousand)}$.`,
					`نضيف $10\\,000$ لإيجاد الحد الأكبر: $${formatKatexNum(lowerTenThousand)} + 10\\,000 = ${formatKatexNum(upperTenThousand)}$.`,
					`الحصر الصحيح: $${formatKatexNum(lowerTenThousand)} < ${formatKatexNum(nThird)} < ${formatKatexNum(upperTenThousand)}$`
				];
				explanation = `العدد ${formatSpaceAscii(nThird)} محصور بين ${formatSpaceAscii(lowerTenThousand)} و ${formatSpaceAscii(upperTenThousand)}، فالحد الأكبر هو ${formatSpaceAscii(upperTenThousand)}.`;
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
				content: `2) فكّك العدد $${formatTypstMathNum(nMain)}$ تفكيكاً نموذجياً، ثم استخرج عدد المئات في العدد $${formatTypstMathNum(nThird)}$.`
			},
			{
				type: 'text',
				content: 'التفكيك النموذجي: ........................................................................... \\ عدد المئات: .........................',
				answer: `التفكيك النموذجي: $${formatCanonicalTypst(nMain)}$ \\ عدد المئات: $${formatTypstMathNum(hundredsCount)}$`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) قارن بين العددين $${formatTypstMathNum(nThird)}$ و $${formatTypstMathNum(nCompare)}$ بوضع الرمز المناسب، ثم احصر العدد $${formatTypstMathNum(nThird)}$ بين ألفين متتاليين.`
			},
			{
				type: 'text',
				content: `المقارنة: $${formatTypstMathNum(nThird)} "....." ${formatTypstMathNum(nCompare)}$ \\ الحصر: $"..........." < ${formatTypstMathNum(nThird)} < "..........."$`,
				answer: `المقارنة: $${formatTypstMathNum(nThird)} ${cmpSymbol} ${formatTypstMathNum(nCompare)}$ \\ الحصر: $${formatTypstMathNum(lowerThousand)} < ${formatTypstMathNum(nThird)} < ${formatTypstMathNum(upperThousand)}$`,
				mark: '0.5'
			}
		];

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية حول الأعداد الطبيعية الأصغر من المليون:',
			content: blocks
		};

		return {
			templateId: '4ap_t1_numbers_to_999999',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'الأعداد إلى 999 999: القراءة، التفكيك، المقارنة والحصر',
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
// 2. Numeric: Large natural number vertical addition & subtraction (< 1,000,000)
// ══════════════════════════════════════════════════════════════════════════════
const templateAddSubLarge: ParameterizedTemplate = {
	id: '4ap_t1_add_sub_large',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'جمع وطرح الأعداد الطبيعية الكبيرة وحل مشكلات جمعية وطرحية',
	curriculumLessonId: 'lesson_4ap_t1_addition_subtraction_large',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 29);

		let addA: number;
		let addB: number;
		let subA: number;
		let subB: number;
		let probA: number;
		let probB: number;

		if (difficulty === 'easy') {
			addA = rng.int(14, 52) * 1_000 + rng.int(5, 9) * 100 + rng.int(6, 9) * 10 + rng.int(6, 9);
			addB = rng.int(12, 38) * 1_000 + rng.int(6, 9) * 100 + rng.int(5, 9) * 10 + rng.int(5, 9);
			subA = rng.int(55, 94) * 1_000 + rng.int(1, 3) * 100 + rng.int(1, 3) * 10 + rng.int(1, 4);
			subB = rng.int(16, 44) * 1_000 + rng.int(6, 9) * 100 + rng.int(6, 9) * 10 + rng.int(6, 9);
			probA = rng.int(25, 65) * 1_000 + rng.int(4, 8) * 100;
			probB = rng.int(11, 22) * 1_000 + rng.int(5, 9) * 100;
		} else if (difficulty === 'medium') {
			addA = rng.int(150, 560) * 1_000 + rng.int(5, 9) * 100 + rng.int(65, 98);
			addB = rng.int(110, 380) * 1_000 + rng.int(6, 9) * 100 + rng.int(54, 89);
			subA = rng.int(4, 8) * 100_000 + rng.int(1, 3) * 1_000 + rng.int(1, 3) * 100 + rng.int(12, 34);
			subB = rng.int(1, 3) * 100_000 + rng.int(5, 9) * 10_000 + rng.int(6, 9) * 100 + rng.int(56, 89);
			probA = rng.int(210, 540) * 1_000 + rng.int(3, 8) * 100 + 50;
			probB = rng.int(85, 195) * 1_000 + rng.int(5, 9) * 100 + 75;
		} else {
			addA = rng.int(240, 580) * 1_000 + rng.int(560, 985);
			addB = rng.int(140, 360) * 1_000 + rng.int(640, 975);
			subA = rng.int(6, 9) * 100_000 + rng.int(0, 2) * 10_000 + rng.int(120, 340);
			subB = rng.int(2, 4) * 100_000 + rng.int(5, 9) * 10_000 + rng.int(650, 980);
			probA = rng.int(320, 620) * 1_000 + rng.int(2, 5) * 100 + 40;
			probB = rng.int(115, 285) * 1_000 + rng.int(6, 9) * 100 + 85;
		}

		const sumVal = addA + addB;
		const diffVal = subA - subB;
		const isProbSub = seed % 2 === 1;
		const probAns = isProbSub ? probA - probB : probA + probB;

		let opMode: 'add' | 'sub' | 'prob';
		if (difficulty === 'hard') {
			opMode = seed % 3 === 0 ? 'add' : seed % 3 === 1 ? 'sub' : 'prob';
		} else {
			opMode = seed % 2 === 0 ? 'add' : 'sub';
		}

		let correctVal: number;
		let questionText: string;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let fallbackFeedback: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;
		let finalAnsStr: string;

		if (opMode === 'add') {
			correctVal = sumVal;
			questionText = `احسب عمودياً ناتج الجمع الآتي:\n\n$${formatKatexNum(addA)} + ${formatKatexNum(addB)}$`;
			const missedCarry = addWithMissedCarry(addA, addB);
			const wrongCarryCol = sumVal + 1_000 < 1_000_000 ? sumVal + 1_000 : sumVal - 1_000;
			const diffInstead = addA > addB ? addA - addB : addB - addA;
			candidates = [
				{
					val: missedCarry,
					diagnosticFeedback: 'نسيت إضافة الاحتفاظ عند الانتقال إلى المرتبة الموالية في الجمع العمودي.'
				},
				{
					val: wrongCarryCol,
					diagnosticFeedback: 'راجع الاحتفاظ في مرتبة الآلاف؛ فقد أضفت أو أنقصت $1$ عن المجموع الصحيح.'
				},
				{
					val: diffInstead,
					diagnosticFeedback: 'قمت بطرح العددين بدلاً من جمعهما! انتبه إلى علامة الجمع ($+$).'
				}
			];
			fallbackFeedback = 'راجع وضع العملية العمودية والاحتفاظ في كل مرتبة.';
			hints = [
				'ضع العددين عمودياً بحيث تكون الوحدات تحت الوحدات والعشرات تحت العشرات.',
				'ابدأ الجمع من اليمين ولا تنسَ الاحتفاظ فوق المرتبة الموالية كلما بلغ المجموع $10$ أو أكثر.',
				'تحقّق من النتيجة بمراقبة رقم الوحدات وتقدير رتبة المقدار.'
			];
			solutionStepsAr = [
				`نضع العملية عمودياً بمحاذاة المراتب من اليمين إلى اليسار.`,
				`نجمع كل مرتبة مع مراعاة الاحتفاظ.`,
				`إذن: $${formatKatexNum(addA)} + ${formatKatexNum(addB)} = ${formatKatexNum(sumVal)}$`
			];
			explanation = `بالجمع العمودي مع الاحتفاظ نجد: ${formatSpaceAscii(addA)} + ${formatSpaceAscii(addB)} = ${formatSpaceAscii(sumVal)}.`;
			finalAnsStr = `${formatSpaceAscii(addA)} + ${formatSpaceAscii(addB)} = ${formatSpaceAscii(sumVal)}`;
		} else if (opMode === 'sub') {
			correctVal = diffVal;
			questionText = `احسب عمودياً ناتج الطرح الآتي:\n\n$${formatKatexNum(subA)} - ${formatKatexNum(subB)}$`;
			const noBorrow = subtractNoBorrowDigits(subA, subB);
			const forgotPayback = subtractForgotPayback(subA, subB);
			const offByThousand = diffVal + 1_000 < 1_000_000 ? diffVal + 1_000 : diffVal - 1_000;
			candidates = [
				{
					val: noBorrow,
					diagnosticFeedback: 'لا يمكن طرح الرقم الأصغر من الأكبر بعكس الترتيب دون استعارة؛ يجب الاستعارة وإرجاع الواحد.'
				},
				{
					val: forgotPayback,
					diagnosticFeedback: 'استعرت $10$ في إحدى المراتب ولكنك نسيت إرجاع $1$ إلى المرتبة الموالية في المطروح.'
				},
				{
					val: offByThousand,
					diagnosticFeedback: 'انتبه عند الاستعارة عبر الأصفار، وتحقّق بجمع النتيجة مع المطروح.'
				}
			];
			fallbackFeedback = 'راجع خطوات الطرح العمودي والاستعارة والإرجاع، ثم تحقق بالجمع.';
			hints = [
				'ضع المطروح منه في الأعلى والمطروح في الأسفل مع محاذاة المراتب من اليمين.',
				'إذا كان رقم المطروح منه أصغر، نستعير $10$ ونُرجع $1$ إلى المرتبة الموالية في الأسفل.',
				'تحقّق بالعملية العكسية: الفارق + المطروح = المطروح منه.'
			];
			solutionStepsAr = [
				`نضع العدد الأكبر $${formatKatexNum(subA)}$ في الأعلى و$${formatKatexNum(subB)}$ في الأسفل.`,
				`ننجز الطرح من اليمين مع الاستعارة والإرجاع عند الحاجة.`,
				`إذن: $${formatKatexNum(subA)} - ${formatKatexNum(subB)} = ${formatKatexNum(diffVal)}$`
			];
			explanation = `بالطرح العمودي مع الاستعارة والإرجاع نجد: ${formatSpaceAscii(subA)} - ${formatSpaceAscii(subB)} = ${formatSpaceAscii(diffVal)}.`;
			finalAnsStr = `${formatSpaceAscii(subA)} - ${formatSpaceAscii(subB)} = ${formatSpaceAscii(diffVal)}`;
		} else {
			correctVal = probAns;
			if (isProbSub) {
				questionText =
					`تضم مكتبة بلدية $${formatKatexNum(probA)}$ كتاباً، أُعير منها خلال الشهر $${formatKatexNum(probB)}$ كتاباً. كم كتاباً بقي في المكتبة؟`;
				const wrongAdd = probA + probB < 1_000_000 ? probA + probB : probAns + 2_000;
				candidates = [
					{
						val: wrongAdd,
						diagnosticFeedback: 'جمعت العددين بدل طرحهما! الكتب المُعارة نُقصت من المخزون.'
					},
					{
						val: subtractNoBorrowDigits(probA, probB),
						diagnosticFeedback: 'أخطأت في الطرح لعدم الاستعارة وإرجاع الواحد للمرتبة الموالية.'
					},
					{
						val: subtractForgotPayback(probA, probB),
						diagnosticFeedback: 'نسيت إرجاع الواحد المستعار إلى المرتبة الموالية أثناء الطرح العمودي.'
					}
				];
				fallbackFeedback = 'راجع عملية الطرح العمودي وتحقق بجمع الباقي مع الكتب المُعارة.';
				hints = [
					'إعارة الكتب تعني نقصان عدد الكتب الموجودة في المكتبة، إذن نستعمل الطرح.',
					`العملية المناسبة هي: $${formatKatexNum(probA)} - ${formatKatexNum(probB)}$.`,
					'أنجز الطرح عمودياً مع الاستعارة والإرجاع بدقة.'
				];
				solutionStepsAr = [
					`نحسب الكتب الباقية بالطرح: $${formatKatexNum(probA)} - ${formatKatexNum(probB)}$.`,
					`بعد الاستعارة والإرجاع نجد: $${formatKatexNum(probAns)}$ كتاباً.`
				];
				explanation = `بقي في المكتبة ${formatSpaceAscii(probA)} - ${formatSpaceAscii(probB)} = ${formatSpaceAscii(probAns)} كتاباً.`;
				finalAnsStr = `${formatSpaceAscii(probAns)} كتاباً`;
			} else {
				questionText =
					`أنتج مصنع للمياه المعدنية $${formatKatexNum(probA)}$ قارورة في الأسبوع الأول، و$${formatKatexNum(probB)}$ قارورة في الأسبوع الثاني. ما هو الإنتاج الإجمالي خلال الأسبوعين؟`;
				const wrongSub = probA - probB;
				candidates = [
					{
						val: wrongSub,
						diagnosticFeedback: 'طرحت الإنتاجين بدل جمعهما! المطلوب هو الإنتاج الإجمالي.'
					},
					{
						val: addWithMissedCarry(probA, probB),
						diagnosticFeedback: 'نسيت إضافة الاحتفاظ عند جمع المراتب عمودياً.'
					},
					{
						val: probAns + 1_000 < 1_000_000 ? probAns + 1_000 : probAns - 1_000,
						diagnosticFeedback: 'تحقق من الاحتفاظ في منزلة الآلاف.'
					}
				];
				fallbackFeedback = 'راجع عملية الجمع العمودي وتحقق من الاحتفاظ.';
				hints = [
					'لإيجاد الإنتاج الإجمالي خلال الأسبوعين نستعمل عملية الجمع.',
					`العملية المناسبة هي: $${formatKatexNum(probA)} + ${formatKatexNum(probB)}$.`,
					'ضع العددين عمودياً واجمع مع الاحتفاظ.'
				];
				solutionStepsAr = [
					`نجمع إنتاج الأسبوعين: $${formatKatexNum(probA)} + ${formatKatexNum(probB)}$.`,
					`بإجراء الجمع العمودي بالاحتفاظ نجد: $${formatKatexNum(probAns)}$ قارورة.`
				];
				explanation = `الإنتاج الإجمالي هو ${formatSpaceAscii(probA)} + ${formatSpaceAscii(probB)} = ${formatSpaceAscii(probAns)} قارورة.`;
				finalAnsStr = `${formatSpaceAscii(probAns)} قارورة`;
			}
		}

		const mcqBuilt = resolveDistinctNumericMcq(
			correctVal,
			candidates,
			(v) => `$${formatKatexNum(v)}$`,
			rng,
			fallbackFeedback
		);

		const pdfProbText = isProbSub
			? `3) تضم مكتبة بلدية ${ltrUnit(formatGroupedRtlSafe(probA))} كتاباً، أُعير منها ${ltrUnit(formatGroupedRtlSafe(probB))} كتاباً. كم كتاباً بقي في المكتبة؟`
			: `3) أنتج مصنع ${ltrUnit(formatGroupedRtlSafe(probA))} قارورة في الأسبوع الأول و${ltrUnit(formatGroupedRtlSafe(probB))} قارورة في الأسبوع الثاني. ما هو الإنتاج الإجمالي؟`;

		const pdfProbAns = isProbSub
			? `بقي في المكتبة: $${formatTypstMathNum(probA)} - ${formatTypstMathNum(probB)} = ${formatTypstMathNum(probAns)}$ كتاباً`
			: `الإنتاج الإجمالي: $${formatTypstMathNum(probA)} + ${formatTypstMathNum(probB)} = ${formatTypstMathNum(probAns)}$ قارورة`;

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أنجز العمليات الآتية عمودياً، ثم حلّ المشكلة:',
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
					content: pdfProbText
				},
				{
					type: 'text',
					content: 'الحل: ....................................................................................',
					answer: pdfProbAns,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '4ap_t1_add_sub_large',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'جمع وطرح الأعداد الطبيعية الكبيرة وحل مشكلات جمعية وطرحية',
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
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
			finalAnswer: finalAnsStr
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. Measurement: Metric conversions (length km/m/dm/cm/mm, mass t/q/kg/g, capacity L/dL/cL/mL)
// ══════════════════════════════════════════════════════════════════════════════
const templateMetricUnits: ParameterizedTemplate = {
	id: '4ap_t1_metric_units',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'measurement',
	titleAr: 'وحدات قياس الأطوال والكتل والسعات والتحويل بينها',
	curriculumLessonId: 'lesson_4ap_t1_metric_units_length_mass_capacity',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 47);

		const familyIdx = seed % 3; // 0: length, 1: mass, 2: capacity
		let categories: string[];
		let rawItems: { text: string; category: number }[];
		let questionText: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		if (familyIdx === 0) {
			// Lengths: km, m, dm, cm, mm
			if (difficulty === 'easy') {
				const a = rng.int(2, 8);
				const b = rng.int(2, 9);
				categories = [`يساوي ${ltrUnit(`${a} m`)}`, `يساوي ${ltrUnit(`${b} dm`)}`];
				rawItems = [
					{ text: ltrUnit(`${a * 10} dm`), category: 0 },
					{ text: ltrUnit(`${a * 100} cm`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(a * 1_000)} mm`), category: 0 },
					{ text: ltrUnit(`${b * 10} cm`), category: 1 },
					{ text: ltrUnit(`${b * 100} mm`), category: 1 },
					{ text: ltrUnit(`${b - 1} dm 10 cm`), category: 1 }
				];
				questionText = `صنّف قياسات الأطوال الآتية حسب مساواتها للطول ${ltrUnit(`${a} m`)} أو للطول ${ltrUnit(`${b} dm`)}:`;
				hints = [
					'تذكّر جدول الأطوال: $1\\text{ m} = 10\\text{ dm} = 100\\text{ cm} = 1\\,000\\text{ mm}$.',
					'حوّل كل قياس إلى السنتيمتر ($\\text{cm}$) أو المليمتر ($\\text{mm}$) للمقارنة السريعة.',
					`$${a}\\text{ m} = ${a * 100}\\text{ cm}$، بينما $${b}\\text{ dm} = ${b * 10}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`$${a}\\text{ m} = ${a * 10}\\text{ dm} = ${a * 100}\\text{ cm} = ${formatKatexNum(a * 1_000)}\\text{ mm}$`,
					`$${b}\\text{ dm} = ${b * 10}\\text{ cm} = ${b * 100}\\text{ mm}$`
				];
				finalAnswer = `${a} m = ${a * 100} cm | ${b} dm = ${b * 10} cm`;
				explanation = 'نستعمل جدول وحدات الطول: 1 m = 10 dm = 100 cm = 1 000 mm.';
			} else if (difficulty === 'medium') {
				const m1 = rng.int(2, 7);
				const u1 = rng.int(1, 9);
				const v1 = m1 * 100 + u1;
				const v2 = m1 * 100 + u1 * 10;
				categories = [`يساوي ${ltrUnit(`${v1} cm`)}`, `يساوي ${ltrUnit(`${v2} cm`)}`];
				rawItems = [
					{ text: ltrUnit(`${m1} m ${u1} cm`), category: 0 },
					{ text: ltrUnit(`${m1 * 10} dm ${u1} cm`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v1 * 10)} mm`), category: 0 },
					{ text: ltrUnit(`${m1} m ${u1} dm`), category: 1 },
					{ text: ltrUnit(`${m1 * 10 + u1} dm`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v2 * 10)} mm`), category: 1 }
				];
				questionText = `صنّف الأطوال المركّبة الآتية حسب مساواتها للطول ${ltrUnit(`${v1} cm`)} أو للطول ${ltrUnit(`${v2} cm`)} (انتبه للخانة الفارغة):`;
				hints = [
					'استعن بجدول التحويلات (km | ... | m | dm | cm | mm) وضع رقم الآحاد في خانة وحدته.',
					`في الطول $${m1}\\text{ m } ${u1}\\text{ cm}$ تكون خانة $\\text{dm}$ خالية فنضع فيها $0$.`,
					`$${m1}\\text{ m } ${u1}\\text{ cm} = ${v1}\\text{ cm}$، أما $${m1}\\text{ m } ${u1}\\text{ dm} = ${v2}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`$${m1}\\text{ m } ${u1}\\text{ cm} = ${v1}\\text{ cm} = ${formatKatexNum(v1 * 10)}\\text{ mm}$`,
					`$${m1}\\text{ m } ${u1}\\text{ dm} = ${v2}\\text{ cm} = ${formatKatexNum(v2 * 10)}\\text{ mm}$`
				];
				finalAnswer = `${v1} cm | ${v2} cm`;
				explanation = `نملأ الخانات الفارغة في جدول الأطوال بالأصفار فنفرق بين ${v1} cm و ${v2} cm.`;
			} else {
				const k = rng.int(3, 7);
				const threshM = k * 1_000;
				categories = [`أصغر من ${ltrUnit(`${k} km`)}`, `أكبر من ${ltrUnit(`${k} km`)}`];
				rawItems = [
					{ text: ltrUnit(`${k - 1} km ${rng.int(250, 890)} m`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(threshM - 45)} m`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe((threshM - 150) * 10)} dm`), category: 0 },
					{ text: ltrUnit(`${k} km ${rng.int(25, 95)} m`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(threshM + 350)} m`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe((threshM + 120) * 100)} cm`), category: 1 }
				];
				questionText = `حوّل الأطوال الآتية إلى المتر، ثم صنّفها مقارنة بالمسافة ${ltrUnit(`${k} km`)}:`;
				hints = [
					`حوّل المرجع أولاً إلى المتر: $${k}\\text{ km} = ${formatKatexNum(threshM)}\\text{ m}$.`,
					'تذكّر: للتحويل من $\\text{dm}$ إلى $\\text{m}$ نحذف صفراً واحداً، ومن $\\text{cm}$ إلى $\\text{m}$ نحذف صفرين.',
					`قارن كل مسافة بعد التحويل مع $${formatKatexNum(threshM)}\\text{ m}$.`
				];
				solutionStepsAr = [
					`$${k}\\text{ km} = ${formatKatexNum(threshM)}\\text{ m}$.`,
					`الأطوال الأصغر من $${formatKatexNum(threshM)}\\text{ m}$ في الفئة الأولى، والأكبر في الفئة الثانية.`
				];
				finalAnswer = `المرجع = ${formatSpaceAscii(threshM)} m`;
				explanation = `بتحويل جميع الأطوال إلى المتر ومقارنتها مع ${formatSpaceAscii(threshM)} m.`;
			}
		} else if (familyIdx === 1) {
			// Masses: t, q, kg, g
			if (difficulty === 'easy') {
				const tVal = rng.int(2, 6);
				const qVal = rng.int(3, 9);
				categories = [`يساوي ${ltrUnit(`${tVal} t`)}`, `يساوي ${ltrUnit(`${qVal} q`)}`];
				rawItems = [
					{ text: ltrUnit(`${tVal * 10} q`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(tVal * 1_000)} kg`), category: 0 },
					{ text: ltrUnit(`${tVal - 1} t 10 q`), category: 0 },
					{ text: ltrUnit(`${qVal * 100} kg`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(qVal * 100_000)} g`), category: 1 },
					{ text: ltrUnit(`${qVal - 1} q 100 kg`), category: 1 }
				];
				questionText = `صنّف الكتل الآتية حسب مساواتها للكتلة ${ltrUnit(`${tVal} t`)} أو للكتلة ${ltrUnit(`${qVal} q`)}:`;
				hints = [
					'تذكّر جدول الكتل: $1\\text{ t} = 10\\text{ q} = 1\\,000\\text{ kg}$.',
					'$1\\text{ q} = 100\\text{ kg}$ و $1\\text{ kg} = 1\\,000\\text{ g}$.',
					`$${tVal}\\text{ t} = ${formatKatexNum(tVal * 1_000)}\\text{ kg}$، بينما $${qVal}\\text{ q} = ${qVal * 100}\\text{ kg}$.`
				];
				solutionStepsAr = [
					`$${tVal}\\text{ t} = ${tVal * 10}\\text{ q} = ${formatKatexNum(tVal * 1_000)}\\text{ kg}$`,
					`$${qVal}\\text{ q} = ${qVal * 100}\\text{ kg} = ${formatKatexNum(qVal * 100_000)}\\text{ g}$`
				];
				finalAnswer = `${tVal} t = ${formatSpaceAscii(tVal * 1_000)} kg | ${qVal} q = ${qVal * 100} kg`;
				explanation = 'نستعمل جدول الكتل: 1 t = 10 q = 1 000 kg و 1 q = 100 kg.';
			} else if (difficulty === 'medium') {
				const qBase = rng.int(2, 6);
				const uKg = rng.int(1, 9);
				const v1 = qBase * 100 + uKg; // e.g. 304 kg
				const v2 = qBase * 100 + uKg * 10; // e.g. 340 kg
				categories = [`يساوي ${ltrUnit(`${v1} kg`)}`, `يساوي ${ltrUnit(`${v2} kg`)}`];
				rawItems = [
					{ text: ltrUnit(`${qBase} q ${uKg} kg`), category: 0 },
					{ text: ltrUnit(`${qBase - 1} q ${100 + uKg} kg`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v1 * 1_000)} g`), category: 0 },
					{ text: ltrUnit(`${qBase} q ${uKg * 10} kg`), category: 1 },
					{ text: ltrUnit(`${qBase - 1} q ${100 + uKg * 10} kg`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v2 * 1_000)} g`), category: 1 }
				];
				questionText = `صنّف الكتل الآتية حسب مساواتها للكتلة ${ltrUnit(`${v1} kg`)} أو للكتلة ${ltrUnit(`${v2} kg`)}:`;
				hints = [
					'تذكّر أن بين القنطار ($\\text{q}$) والكيلوغرام ($\\text{kg}$) خانة فارغة (عشرات الكيلوغرام).',
					`$${qBase}\\text{ q } ${uKg}\\text{ kg} = ${v1}\\text{ kg}$، وليس $${qBase}${uKg}\\text{ kg}$.`,
					'للتحويل من $\\text{kg}$ إلى $\\text{g}$ نضرب في $1\\,000$ (نضيف $3$ أصفار).'
				];
				solutionStepsAr = [
					`$${qBase}\\text{ q } ${uKg}\\text{ kg} = ${v1}\\text{ kg} = ${formatKatexNum(v1 * 1_000)}\\text{ g}$`,
					`$${qBase}\\text{ q } ${uKg * 10}\\text{ kg} = ${v2}\\text{ kg} = ${formatKatexNum(v2 * 1_000)}\\text{ g}$`
				];
				finalAnswer = `${v1} kg | ${v2} kg`;
				explanation = `بين القنطار والكيلوغرام توجد مرتبة عشرات الكيلوغرام، لذا ${qBase} q ${uKg} kg = ${v1} kg.`;
			} else {
				const kQ = rng.int(3, 8);
				const threshKg = kQ * 100;
				categories = [`أصغر من ${ltrUnit(`${kQ} q`)}`, `أكبر من ${ltrUnit(`${kQ} q`)}`];
				rawItems = [
					{ text: ltrUnit(`${kQ - 1} q ${rng.int(15, 85)} kg`), category: 0 },
					{ text: ltrUnit(`${threshKg - 25} kg`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe((threshKg - 15) * 1_000)} g`), category: 0 },
					{ text: ltrUnit(`${kQ} q ${rng.int(12, 85)} kg`), category: 1 },
					{ text: ltrUnit(`${threshKg + 45} kg`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe((threshKg + 20) * 1_000)} g`), category: 1 }
				];
				questionText = `حوّل الكتل الآتية إلى الكيلوغرام، ثم صنّفها مقارنة بالكتلة ${ltrUnit(`${kQ} q`)}:`;
				hints = [
					`حوّل المرجع أولاً إلى الكيلوغرام: $${kQ}\\text{ q} = ${threshKg}\\text{ kg}$.`,
					'للتحويل من الغرام ($\\text{g}$) إلى الكيلوغرام ($\\text{kg}$) نحذف $3$ أصفار.',
					`قارن كل كتلة بالكيلوغرام مع $${threshKg}\\text{ kg}$.`
				];
				solutionStepsAr = [
					`$${kQ}\\text{ q} = ${threshKg}\\text{ kg}$.`,
					`الكتل الأصغر من $${threshKg}\\text{ kg}$ في الفئة الأولى، والأكبر في الفئة الثانية.`
				];
				finalAnswer = `المرجع = ${threshKg} kg`;
				explanation = `بتحويل جميع الكتل إلى الكيلوغرام ومقارنتها مع ${threshKg} kg.`;
			}
		} else {
			// Capacities: L, dL, cL, mL
			if (difficulty === 'easy') {
				const lVal = rng.int(2, 7);
				const dlVal = rng.int(2, 9);
				categories = [`يساوي ${ltrUnit(`${lVal} L`)}`, `يساوي ${ltrUnit(`${dlVal} dL`)}`];
				rawItems = [
					{ text: ltrUnit(`${lVal * 10} dL`), category: 0 },
					{ text: ltrUnit(`${lVal * 100} cL`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(lVal * 1_000)} mL`), category: 0 },
					{ text: ltrUnit(`${dlVal * 10} cL`), category: 1 },
					{ text: ltrUnit(`${dlVal * 100} mL`), category: 1 },
					{ text: ltrUnit(`${dlVal - 1} dL 10 cL`), category: 1 }
				];
				questionText = `صنّف السعات الآتية حسب مساواتها للسعة ${ltrUnit(`${lVal} L`)} أو للسعة ${ltrUnit(`${dlVal} dL`)}:`;
				hints = [
					'تذكّر جدول السعات: $1\\text{ L} = 10\\text{ dL} = 100\\text{ cL} = 1\\,000\\text{ mL}$.',
					'حوّل كل سعة إلى السنتيلتر ($\\text{cL}$) أو المليلتر ($\\text{mL}$) للمقارنة.',
					`$${lVal}\\text{ L} = ${lVal * 100}\\text{ cL}$، بينما $${dlVal}\\text{ dL} = ${dlVal * 10}\\text{ cL}$.`
				];
				solutionStepsAr = [
					`$${lVal}\\text{ L} = ${lVal * 10}\\text{ dL} = ${lVal * 100}\\text{ cL} = ${formatKatexNum(lVal * 1_000)}\\text{ mL}$`,
					`$${dlVal}\\text{ dL} = ${dlVal * 10}\\text{ cL} = ${dlVal * 100}\\text{ mL}$`
				];
				finalAnswer = `${lVal} L = ${lVal * 100} cL | ${dlVal} dL = ${dlVal * 10} cL`;
				explanation = 'نستعمل جدول السعات: 1 L = 10 dL = 100 cL = 1 000 mL.';
			} else if (difficulty === 'medium') {
				const l1 = rng.int(2, 7);
				const u1 = rng.int(1, 9);
				const v1 = l1 * 100 + u1; // e.g. 305 cL
				const v2 = l1 * 100 + u1 * 10; // e.g. 350 cL
				categories = [`يساوي ${ltrUnit(`${v1} cL`)}`, `يساوي ${ltrUnit(`${v2} cL`)}`];
				rawItems = [
					{ text: ltrUnit(`${l1} L ${u1} cL`), category: 0 },
					{ text: ltrUnit(`${l1 * 10} dL ${u1} cL`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v1 * 10)} mL`), category: 0 },
					{ text: ltrUnit(`${l1} L ${u1} dL`), category: 1 },
					{ text: ltrUnit(`${l1 * 10 + u1} dL`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(v2 * 10)} mL`), category: 1 }
				];
				questionText = `صنّف السعات المركّبة الآتية حسب مساواتها للسعة ${ltrUnit(`${v1} cL`)} أو للسعة ${ltrUnit(`${v2} cL`)}:`;
				hints = [
					'رتّب الخانات في جدول السعات: L | dL | cL | mL.',
					`عند كتابة $${l1}\\text{ L } ${u1}\\text{ cL}$ نضع $0$ في خانة الديسيلتر ($\\text{dL}$) الفارغة.`,
					`$${l1}\\text{ L } ${u1}\\text{ cL} = ${v1}\\text{ cL}$، بينما $${l1}\\text{ L } ${u1}\\text{ dL} = ${v2}\\text{ cL}$.`
				];
				solutionStepsAr = [
					`$${l1}\\text{ L } ${u1}\\text{ cL} = ${v1}\\text{ cL} = ${formatKatexNum(v1 * 10)}\\text{ mL}$`,
					`$${l1}\\text{ L } ${u1}\\text{ dL} = ${v2}\\text{ cL} = ${formatKatexNum(v2 * 10)}\\text{ mL}$`
				];
				finalAnswer = `${v1} cL | ${v2} cL`;
				explanation = `نملأ خانة dL بالصفر عند التحويل من L و cL فنجد ${v1} cL مقابل ${v2} cL.`;
			} else {
				const kL = rng.int(4, 9);
				const threshML = kL * 1_000;
				categories = [`أصغر من ${ltrUnit(`${kL} L`)}`, `أكبر من ${ltrUnit(`${kL} L`)}`];
				rawItems = [
					{ text: ltrUnit(`${kL - 1} L ${rng.int(20, 85)} cL`), category: 0 },
					{ text: ltrUnit(`${kL * 10 - 3} dL`), category: 0 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(threshML - 150)} mL`), category: 0 },
					{ text: ltrUnit(`${kL} L ${rng.int(15, 85)} cL`), category: 1 },
					{ text: ltrUnit(`${kL * 10 + 4} dL`), category: 1 },
					{ text: ltrUnit(`${formatGroupedRtlSafe(threshML + 250)} mL`), category: 1 }
				];
				questionText = `حوّل السعات الآتية إلى المليلتر، ثم صنّفها مقارنة بالسعة ${ltrUnit(`${kL} L`)}:`;
				hints = [
					`حوّل المرجع أولاً إلى المليلتر: $${kL}\\text{ L} = ${formatKatexNum(threshML)}\\text{ mL}$.`,
					'تذكّر: $1\\text{ dL} = 100\\text{ mL}$ و $1\\text{ cL} = 10\\text{ mL}$.',
					`قارن كل سعة بالمليلتر مع $${formatKatexNum(threshML)}\\text{ mL}$.`
				];
				solutionStepsAr = [
					`$${kL}\\text{ L} = ${formatKatexNum(threshML)}\\text{ mL}$.`,
					`السعات الأصغر من $${formatKatexNum(threshML)}\\text{ mL}$ في الفئة الأولى، والأكبر في الفئة الثانية.`
				];
				finalAnswer = `المرجع = ${formatSpaceAscii(threshML)} mL`;
				explanation = `بتحويل جميع السعات إلى المليلتر ومقارنتها مع ${formatSpaceAscii(threshML)} mL.`;
			}
		}

		const items = rng.shuffle(rawItems);

		// Typst ExerciseBlock always covers ALL 3 metric families (length, mass, capacity)
		const lenKm = rng.int(2, 8);
		const lenRemM = rng.int(12, 85) * 10;
		const lenAnsM = lenKm * 1_000 + lenRemM;

		const lenM = rng.int(3, 8);
		const lenCm = rng.int(2, 9);
		const lenAnsMm = (lenM * 100 + lenCm) * 10;

		const massT = rng.int(2, 6);
		const massQ = rng.int(1, 8);
		const massKg = rng.int(15, 75);
		const massAnsKg = massT * 1_000 + massQ * 100 + massKg;

		const capL = rng.int(3, 8);
		const capCL = rng.int(5, 95);
		const capAnsML = capL * 1_000 + capCL * 10;

		// Ordering 4 capacities or masses in mixed units
		const baseL = rng.int(3, 6);
		const ordLowML = baseL * 1_000 - rng.int(2, 5) * 100; // e.g. 3600 mL
		const ordExactL = baseL; // e.g. 4 L = 4000 mL
		const ordMidDL = baseL * 10 + rng.int(2, 4); // e.g. 43 dL = 4300 mL
		const ordHighCL = baseL * 100 + rng.int(6, 9) * 10; // e.g. 470 cL = 4700 mL

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'استعن بجداول التحويلات المترية (الأطوال والكتل والسعات) للإجابة عمّا يلي:',
			content: [
				{
					type: 'table',
					headers: ['التحويل المطلوب', 'النتيجة'],
					cells: [],
					rows: [
						[
							ltrUnit(`${lenKm} km ${lenRemM} m = ...... m`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(lenAnsM)} m`), mark: '0.25' }
						],
						[
							ltrUnit(`${lenM} m ${lenCm} cm = ...... mm`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(lenAnsMm)} mm`), mark: '0.25' }
						],
						[
							ltrUnit(`${massT} t ${massQ} q ${massKg} kg = ...... kg`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(massAnsKg)} kg`), mark: '0.25' }
						],
						[
							ltrUnit(`${capL} L ${capCL} cL = ...... mL`),
							{ content: '....................................', answer: ltrUnit(`${formatGroupedRtlSafe(capAnsML)} mL`), mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true
				},
				{
					type: 'text',
					content: `رتّب السعات الآتية تصاعدياً (من الأصغر إلى الأكبر) بعد توحيد الوحدة: ${ltrUnit(`${ordHighCL} cL`)} ، ${ltrUnit(`${formatGroupedRtlSafe(ordLowML)} mL`)} ، ${ltrUnit(`${ordMidDL} dL`)} ، ${ltrUnit(`${ordExactL} L`)}.`
				},
				{
					type: 'text',
					content: 'الترتيب التصاعدي: ........................................................................................',
					answer: `الترتيب التصاعدي: ${ltrUnit(`${formatGroupedRtlSafe(ordLowML)} mL`)} ، ثم ${ltrUnit(`${ordExactL} L`)} ، ثم ${ltrUnit(`${ordMidDL} dL`)} ، ثم ${ltrUnit(`${ordHighCL} cL`)}`,
					mark: '0.5'
				},
				buildIllustratedFigureBlock('pri_math_07_measuring_vessels_liter', {
					maxHeight: 112,
					width: '58%'
				})
			]
		};

		return {
			templateId: '4ap_t1_metric_units',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'measurement',
			titleAr: 'وحدات قياس الأطوال والكتل والسعات والتحويل بينها',
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
// 4. Geometry: Parallel & perpendicular lines + Quadrilaterals (square, rectangle, rhombus)
// ══════════════════════════════════════════════════════════════════════════════
const templateLinesAndQuadrilaterals: ParameterizedTemplate = {
	id: '4ap_t1_lines_quadrilaterals',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'التوازي والتعامد والمضلعات والرباعيات الخاصة',
	curriculumLessonId: 'lesson_4ap_t1_polygons_quadrilaterals',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 61);

		const geomMode = seed % 3; // 0: parallel/perp lines, 1: rectangle, 2: square or rhombus
		const isTrue = seed % 2 === 0;

		const vertexSets: [string, string, string, string][] = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['M', 'N', 'P', 'Q'],
			['K', 'L', 'R', 'S']
		];
		const v = rng.pick(vertexSets);

		let svgUrl: string;
		let imageCaption: string;
		let questionText: string;
		let explanation: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let tfItems: { q: string; a: string; c: string; mark: string }[];
		let extraPromptTypst: string;
		let extraAnswerTypst: string;

		if (geomMode === 0) {
			const lineNames = rng.pick([
				{ base: '(k)', p1: '(d1)', p2: '(d2)', ob: '(m)' },
				{ base: '(L)', p1: '(h1)', p2: '(h2)', ob: '(s)' },
				{ base: '(D)', p1: '(f1)', p2: '(f2)', ob: '(t)' }
			]);
			const pts: [string, string, string] = [v[0], v[1], v[2]];
			const svgContent = svgParallelPerpLines({
				baseLine: lineNames.base,
				perp1: lineNames.p1,
				perp2: lineNames.p2,
				oblique: lineNames.ob,
				pts
			});
			svgUrl = saveSvgAsset(`4ap-t1-geom-lines-${difficulty}-s${seed}`, svgContent);
			imageCaption = `المستقيمات ${lineNames.p1} و ${lineNames.p2} و ${lineNames.ob} مع المستقيم ${lineNames.base}`;

			if (difficulty === 'easy') {
				if (isTrue) {
					questionText = `تأمّل الشكل المقابل: النقط $${pts[0]}$ و $${pts[1]}$ و $${pts[2]}$ تقع في استقامية لأنها تنتمي جميعها إلى نفس المستقيم $${lineNames.base}$.`;
					explanation = `صحيح، النقط ${pts[0]} و ${pts[1]} و ${pts[2]} تنطبق على نفس المستقيم ${lineNames.base} فهي في استقامية.`;
				} else {
					questionText = `تأمّل الشكل المقابل: المستقيمان $${lineNames.p1}$ و $${lineNames.ob}$ متوازيان ولا يتقاطعان أبداً.`;
					explanation = `خطأ، المستقيم ${lineNames.ob} مائل وسيقطع ${lineNames.p1} عند تمديده، أما ${lineNames.p1} و ${lineNames.p2} فهما المتوازيان.`;
				}
			} else if (difficulty === 'medium') {
				if (isTrue) {
					questionText = `في الشكل المقابل، المستقيمان $${lineNames.p1}$ و $${lineNames.p2}$ عموديان على نفس المستقيم $${lineNames.base}$، إذن هما متوازيان.`;
					explanation = `صحيح، كل مستقيمين عموديين على نفس المستقيم الثالث هما مستقيمان متوازيان.`;
				} else {
					questionText = `في الشكل المقابل، المستقيمان $${lineNames.p1}$ و $${lineNames.p2}$ متعامدان ويشكّلان زاوية قائمة فيما بينهما.`;
					explanation = `خطأ، المستقيمان ${lineNames.p1} و ${lineNames.p2} متوازيان لأنهما عموديان على ${lineNames.base}.`;
				}
			} else {
				if (isTrue) {
					questionText = `في الشكل المقابل، المستقيمان $${lineNames.p1}$ و $${lineNames.p2}$ متوازيان، والمستقيم $${lineNames.ob}$ قاطع لهما بزاوية غير قائمة.`;
					explanation = `صحيح، ${lineNames.p1} و ${lineNames.p2} متوازيان لتعامدهما على ${lineNames.base}، و ${lineNames.ob} مائل يقطعهما.`;
				} else {
					questionText = `في الشكل المقابل، المستقيم $${lineNames.ob}$ عمودي على المستقيم $${lineNames.base}$ لأنه يتقاطع معه عند امتداده.`;
					explanation = `خطأ، التقاطع وحده لا يعني التعامد؛ للتحقق من التعامد نستعمل الكوس ولا توجد زاوية قائمة عند تقاطع ${lineNames.ob} و ${lineNames.base}.`;
				}
			}

			hints = [
				'استعمل علامة الزاوية القائمة الحمراء لتحديد المستقيمات المتعامدة.',
				'تذكّر خاصية التوازي: مستقيمان عموديان على نفس المستقيم هما متوازيان.',
				'النقط التي تقع على نفس الخط المستقيم تكون في استقامية.'
			];
			solutionStepsAr = [
				`النقط $${pts[0]}$ و $${pts[1]}$ و $${pts[2]}$ تنتمي إلى نفس المستقيم $${lineNames.base}$.`,
				`المستقيمان $${lineNames.p1}$ و $${lineNames.p2}$ عموديان على $${lineNames.base}$، فهما متوازيان.`,
				`إذن العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			];

			tfItems = [
				{
					q: `المستقيمان ${ltrUnit(lineNames.p1)} و ${ltrUnit(lineNames.p2)} متوازيان.`,
					a: 'صحيح',
					c: `لأنهما عموديان على نفس المستقيم ${ltrUnit(lineNames.base)}.`,
					mark: '0.5'
				},
				{
					q: `المستقيمان ${ltrUnit(lineNames.p1)} و ${ltrUnit(lineNames.ob)} متعامدان.`,
					a: 'خطأ',
					c: `المستقيم ${ltrUnit(lineNames.ob)} مائل ولا يشكّل زاوية قائمة مع ${ltrUnit(lineNames.p1)} ولا مع ${ltrUnit(lineNames.base)}.`,
					mark: '0.5'
				}
			];
			extraPromptTypst = `ما هي الأداة الهندسية المستعملة للتحقق من تعامد المستقيمين ${ltrUnit(lineNames.p1)} و ${ltrUnit(lineNames.base)}، وماذا نقول عن النقط $${pts[0]}$ و $${pts[1]}$ و $${pts[2]}$؟`;
			extraAnswerTypst = `الأداة هي الكوس، والنقط $${pts[0]}$ و $${pts[1]}$ و $${pts[2]}$ في استقامية.`;
		} else if (geomMode === 1) {
			const lenCm = rng.int(6, 9);
			const widCm = rng.int(2, 4);
			const shapeName = `${v[0]}${v[1]}${v[2]}${v[3]}`;
			const svgContent = svgRectangle({
				vertices: v,
				lengthLabel: `${lenCm} cm`,
				widthLabel: `${widCm} cm`
			});
			svgUrl = saveSvgAsset(`4ap-t1-geom-rect-${difficulty}-s${seed}`, svgContent);
			imageCaption = `المستطيل ${shapeName}`;

			if (difficulty === 'easy') {
				if (isTrue) {
					questionText = `تأمّل المستطيل $${shapeName}$ المقابل: له $4$ زوايا قائمة وكل ضلعين متجاورين فيه متعامدان.`;
					explanation = `صحيح، المستطيل رباعي خاص زواياه الأربع قائمة وضلعاه المتجاوران متعامدان.`;
				} else {
					questionText = `تأمّل المستطيل $${shapeName}$ المقابل: أضلاعه الأربعة متقايسة في الطول مثل المربع.`;
					explanation = `خطأ، في المستطيل الطول (${lenCm} cm) أكبر من العرض (${widCm} cm)، وكل ضلعين متقابلين فقط متقايسان.`;
				}
			} else if (difficulty === 'medium') {
				if (isTrue) {
					questionText = `في المستطيل $${shapeName}$ المقابل، الضلعان المتقابلان $[${v[0]}${v[1]}]$ و $[${v[3]}${v[2]}]$ متوازيان ومتقايسان.`;
					explanation = `صحيح، كل ضلعين متقابلين في المستطيل متوازيان ومتقايسان في الطول.`;
				} else {
					questionText = `في المستطيل $${shapeName}$ المقابل، المستقيمان $(${v[0]}${v[1]})$ و $(${v[3]}${v[2]})$ متعامدان.`;
					explanation = `خطأ، المستقيمان (${v[0]}${v[1]}) و (${v[3]}${v[2]}) متقابلان في المستطيل، إذن هما متوازيان لا متعامدان.`;
				}
			} else {
				if (isTrue) {
					questionText = `في المستطيل $${shapeName}$، المستقيمان $(${v[0]}${v[3]})$ و $(${v[1]}${v[2]})$ عموديان على $(${v[0]}${v[1]})$، فهما متوازيان وقطراه متقايسان.`;
					explanation = `صحيح، المستقيمان العموديان على نفس الضلع متوازيان، وقطرا المستطيل متقايسان ومتناصفان.`;
				} else {
					questionText = `في المستطيل $${shapeName}$، قطرا المستطيل $[${v[0]}${v[2]}]$ و $[${v[1]}${v[3]}]$ متعامدان دائماً مثل قطري المعين.`;
					explanation = `خطأ، قطرا المستطيل متقايسان ومتناصفان لكنهما غير متعامدين ما لم يكن طوله مساوياً لعرضه.`;
				}
			}

			hints = [
				'لاحظ أن الشكل مستطيل له $4$ زوايا قائمة وطول أكبر من العرض.',
				'كل ضلعين متقابلين في المستطيل متوازيان ومتقايسان.',
				'قطرا المستطيل متقايسان ومتناصفان ولكنهما غير متعامدين في الحالة العامة.'
			];
			solutionStepsAr = [
				`الشكل $${shapeName}$ مستطيل طوله $${lenCm}\\text{ cm}$ وعرضه $${widCm}\\text{ cm}$.`,
				`أضلاعه المتقابلة متوازية ومتقايسة وزواياه الأربع قائمة.`,
				`إذن العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			];

			tfItems = [
				{
					q: `المستقيمان $(${v[0]} ${v[1]})$ و $(${v[3]} ${v[2]})$ متوازيان.`,
					a: 'صحيح',
					c: 'كل ضلعين متقابلين في المستطيل متوازيان.',
					mark: '0.5'
				},
				{
					q: `أضلاع الرباعي ${ltrUnit(shapeName)} الأربعة متقايسة في الطول.`,
					a: 'خطأ',
					c: `الطول $${lenCm}$ cm يختلف عن العرض $${widCm}$ cm (كل ضلعين متقابلين فقط متقايسان).`,
					mark: '0.5'
				}
			];
			extraPromptTypst = `ما طول الضلع $[${v[3]} ${v[2]}]$ وما طول الضلع $[${v[0]} ${v[3]}]$ في المستطيل ${ltrUnit(shapeName)}؟`;
			extraAnswerTypst = `$${v[3]} ${v[2]} = ${lenCm}$ cm و $${v[0]} ${v[3]} = ${widCm}$ cm.`;
		} else {
			// Alternate between Square and Rhombus
			const isSquare = Math.floor(seed / 3) % 2 === 0;
			const shapeName = `${v[0]}${v[1]}${v[2]}${v[3]}`;
			if (isSquare) {
				const sideCm = rng.int(4, 7);
				const svgContent = svgSquare({ vertices: v, sideLabel: `${sideCm} cm` });
				svgUrl = saveSvgAsset(`4ap-t1-geom-sq-${difficulty}-s${seed}`, svgContent);
				imageCaption = `المربع ${shapeName}`;

				if (difficulty === 'easy') {
					if (isTrue) {
						questionText = `تأمّل الرباعي $${shapeName}$ المقابل: له $4$ أضلاع متقايسة و$4$ زوايا قائمة، فهو **مربع**.`;
						explanation = `صحيح، التشفير يبيّن أن الأضلاع الأربعة متقايسة والزوايا الأربع قائمة، إذن هو مربع.`;
					} else {
						questionText = `تأمّل الرباعي $${shapeName}$ المقابل: له ضلعان طويلان وضلعان قصيران، فهو مستطيل غير مربع.`;
						explanation = `خطأ، جميع أضلاعه الأربعة متقايسة (${sideCm} cm) وزواياه الأربع قائمة فهو مربع.`;
					}
				} else if (difficulty === 'medium') {
					if (isTrue) {
						questionText = `في المربع $${shapeName}$ المقابل، القطع المرسومة داخل الشكل (القطران) متقايسة ومتعامدة ومتناصفة.`;
						explanation = `صحيح، قطرا المربع متناصفان ومتقايسان ومتعامدان.`;
					} else {
						questionText = `في المربع $${shapeName}$ المقابل، قطرا المربع غير متقايسين مثل قطري المعين.`;
						explanation = `خطأ، المربع يجمع خواص المستطيل والمعين، لذا قطراه متقايسان ومتعامدان معاً.`;
					}
				} else {
					if (isTrue) {
						questionText = `المربع $${shapeName}$ هو حالة خاصة من المعين والمستطيل معاً لأنه يملك $4$ أضلاع متقايسة و$4$ زوايا قائمة.`;
						explanation = `صحيح، المربع يحقق كل خواص المستطيل وكل خواص المعين.`;
					} else {
						questionText = `في المربع $${shapeName}$، الضلعان $[${v[0]}${v[1]}]$ و $[${v[1]}${v[2]}]$ متوازيان ولا يلتقيان.`;
						explanation = `خطأ، الضلعان [${v[0]}${v[1]}] و [${v[1]}${v[2]}] متجاوران ويلتقيان في الرأس ${v[1]} بزاوية قائمة، إذن هما متعامدان.`;
					}
				}

				hints = [
					'لاحظ علامات التقايس الخضراء على الأضلاع الأربعة وعلامات الزاوية القائمة الحمراء.',
					'المربع رباعي له $4$ أضلاع متقايسة و$4$ زوايا قائمة.',
					'قطرا المربع متناصفان ومتقايسان ومتعامدان.'
				];
				solutionStepsAr = [
					`أضلاع الشكل $${shapeName}$ متقايسة ($${sideCm}\\text{ cm}$) وزواياه الأربع قائمة.`,
					`إذن الشكل مربع وقطراه متقايسان ومتعامدان.`,
					`العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
				];

				tfItems = [
					{
						q: `للرباعي ${ltrUnit(shapeName)} أربع زوايا قائمة وأربعة أضلاع متقايسة.`,
						a: 'صحيح',
						c: `كل أضلاعه تقيس $${sideCm}$ cm وله $4$ زوايا قائمة.`,
						mark: '0.5'
					},
					{
						q: `قطرا المربع ${ltrUnit(shapeName)} غير متقايسين في الطول.`,
						a: 'خطأ',
						c: 'قطرا المربع متقايسان ومتعامدان ومتناصفان.',
						mark: '0.5'
					}
				];
				extraPromptTypst = `سمّ الرباعي ${ltrUnit(shapeName)} واذكر خاصيتين لقطريه.`;
				extraAnswerTypst = `الرباعي مربع، وقطراه متقايسان ومتعامدان (ومتناصفان).`;
			} else {
				const sideCm = rng.int(5, 7);
				const diag1 = rng.pick([8, 10]);
				const diag2 = rng.pick([4, 6]);
				const svgContent = svgRhombus({
					vertices: v,
					diag1Label: `${diag1} cm`,
					diag2Label: `${diag2} cm`,
					sideLabel: `${sideCm} cm`
				});
				svgUrl = saveSvgAsset(`4ap-t1-geom-rhomb-${difficulty}-s${seed}`, svgContent);
				imageCaption = `المعين ${shapeName}`;

				if (difficulty === 'easy') {
					if (isTrue) {
						questionText = `تأمّل الرباعي $${shapeName}$ المقابل: أضلاعه الأربعة متقايسة وقطراه متعامدان ومختلفان في الطول، فهو **معين**.`;
						explanation = `صحيح، الرباعي الذي أضلاعه الأربعة متقايسة وقطراه متعامدان وغير متقايسين هو معين.`;
					} else {
						questionText = `تأمّل الرباعي $${shapeName}$ المقابل: له $4$ زوايا قائمة فهو مربع.`;
						explanation = `خطأ، التشفير لا يظهر زوايا قائمة عند الرؤوس وقطراه غير متقايسين (${diag1} cm و ${diag2} cm)، فهو معين وليس مربعاً.`;
					}
				} else if (difficulty === 'medium') {
					if (isTrue) {
						questionText = `في المعين $${shapeName}$ المقابل، القطران $[${v[0]}${v[2]}]$ و $[${v[1]}${v[3]}]$ متعامدان ويشكّلان زاوية قائمة عند تقاطعهما.`;
						explanation = `صحيح، قطرا المعين متعامدان دائماً ويتقاطعان في منتصفيهما.`;
					} else {
						questionText = `في المعين $${shapeName}$ المقابل، القطران $[${v[0]}${v[2]}]$ و $[${v[1]}${v[3]}]$ متقايسان في الطول.`;
						explanation = `خطأ، طول القطر الأول ${diag1} cm وطول القطر الثاني ${diag2} cm فهما غير متقايسين.`;
					}
				} else {
					if (isTrue) {
						questionText = `في المعين $${shapeName}$، كل ضلعين متقابلين متوازيان وجميع الأضلاع الأربعة تقيس $${sideCm}\\text{ cm}$.`;
						explanation = `صحيح، في المعين الأضلاع الأربعة متقايسة وكل ضلعين متقابلين متوازيان.`;
					} else {
						questionText = `الرباعي $${shapeName}$ مستطيل لأن له $4$ أضلاع متقايسة وقطرين متعامدين.`;
						explanation = `خطأ، الأضلاع المتقايسة والقطران المتعامدان غير المتقايسين هي خواص المعين وليس المستطيل.`;
					}
				}

				hints = [
					'تأمل التشفير الأخضر على الأضلاع الأربعة: كلها متقايسة.',
					'انظر إلى تقاطع القطرين في الوسط: هناك زاوية قائمة حمراء، لكن طول القطرين مختلف.',
					'الرباعي الذي أضلاعه الأربعة متقايسة وقطراه متعامدان وغير متقايسين هو معين.'
				];
				solutionStepsAr = [
					`أضلاع الشكل $${shapeName}$ متقايسة ($${sideCm}\\text{ cm}$).`,
					`قطراه متعامدان ومختلفان في الطول ($${diag1}\\text{ cm}$ و $${diag2}\\text{ cm}$)، إذن الشكل معين.`,
					`العبارة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
				];

				tfItems = [
					{
						q: `قطرا الرباعي ${ltrUnit(shapeName)} متعامدان.`,
						a: 'صحيح',
						c: 'علامة الزاوية القائمة عند تقاطع القطرين تثبت تعامدهما.',
						mark: '0.5'
					},
					{
						q: `الرباعي ${ltrUnit(shapeName)} مربع لأن أضلاعه الأربعة متقايسة.`,
						a: 'خطأ',
						c: `الرباعي معين لأن قطريه غير متقايسين ($${diag1}$ cm و $${diag2}$ cm) وليست له زوايا قائمة.`,
						mark: '0.5'
					}
				];
				extraPromptTypst = `ما طبيعة الرباعي ${ltrUnit(shapeName)}؟ علّل إجابتك بخاصيتين من الشكل.`;
				extraAnswerTypst = `الرباعي معين، لأن أضلاعه الأربعة متقايسة وقطريه متعامدان وغير متقايسين.`;
			}
		}

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'تأمّل الشكل الهندسي المقابل (يمكنك التحقق بالكوس والمسطرة)، ثم أجب عن الأسئلة الآتية:',
			content: [
				{
					type: 'columns',
					widths: ['1.5fr', '1fr'],
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
				},
				{
					type: 'text',
					content: extraPromptTypst
				},
				{
					type: 'text',
					content: 'الإجابة: ....................................................................................',
					answer: `الإجابة: ${extraAnswerTypst}`,
					mark: '0.5'
				},
				buildIllustratedFigureBlock('pri_math_08_geometry_tools_set', {
					maxHeight: 112,
					width: '58%',
					mode: 'image_only',
					title: 'أَدَوَاتُ التَّحَقُّقِ الهَنْدَسِيِّ (المِسْطَرَةُ وَالكُوسُ وَالمِدْوَرُ)'
				})
			]
		};

		return {
			templateId: '4ap_t1_lines_quadrilaterals',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: 'التوازي والتعامد والمضلعات والرباعيات الخاصة',
			quizQuestion: {
				type: 'true_false',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgUrl,
				imageCaption,
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
// 5. Proportionality / Data organization: Reading tables & bar charts (svgBarChart)
// ══════════════════════════════════════════════════════════════════════════════
const templateTablesAndBarCharts: ParameterizedTemplate = {
	id: '4ap_t1_tables_bar_charts',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'تنظيم معطيات في جداول ومخططات بيانية وقراءتها',
	curriculumLessonId: 'lesson_4ap_t1_tables_and_graphs',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 79);

		const themes = [
			{
				intro: 'يمثل المخطط بالأعمدة عدد الكتب المستعارة من مكتبة المدرسة خلال أربعة أيام.',
				colHeader: 'اليوم',
				valHeader: 'عدد الكتب',
				unitAr: 'كتاباً',
				labels: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء']
			},
			{
				intro: 'يمثل المخطط بالأعمدة النقاط التي جمعتها أربعة أفواج في المسابقة الثقافية.',
				colHeader: 'الفوج',
				valHeader: 'عدد النقاط',
				unitAr: 'نقطة',
				labels: ['الفوج أ', 'الفوج ب', 'الفوج ج', 'الفوج د']
			},
			{
				intro: 'يمثل المخطط بالأعمدة عدد الشجيرات المغروسة في حملة التشجير المدرسية.',
				colHeader: 'نوع الشجرة',
				valHeader: 'العدد',
				unitAr: 'شجيرة',
				labels: ['زيتون', 'برتقال', 'تفاح', 'توت']
			},
			{
				intro: 'يمثل المخطط بالأعمدة كمية الورق المجمّع لإعادة التدوير بالكيلوغرام خلال أربعة أشهر.',
				colHeader: 'الشهر',
				valHeader: 'الكتلة (kg)',
				unitAr: 'kg',
				labels: ['جانفي', 'فيفري', 'مارس', 'أفريل']
			}
		] as const;

		const th = rng.pick(themes);
		const pool =
			difficulty === 'easy'
				? [15, 25, 35, 45, 55, 65, 75, 85]
				: difficulty === 'medium'
					? [30, 50, 70, 90, 110, 130, 150, 170]
					: [120, 160, 210, 250, 300, 340, 390, 440];

		const vals = rng.pickDistinct(pool, 4);
		const bars = th.labels.map((label, i) => ({ label, value: vals[i] }));
		const maxBarVal = Math.max(...vals);
		const maxChartScale = maxBarVal + (difficulty === 'hard' ? 60 : 20);

		const svgStr = svgBarChart(bars, maxChartScale);
		const svgUrl = saveSvgAsset(`4ap-t1-chart-${difficulty}-s${seed}`, svgStr);

		const sorted = [...bars].sort((a, b) => a.value - b.value);
		const minBar = sorted[0];
		const maxBar = sorted[sorted.length - 1];
		const totalAll = vals.reduce((acc, v) => acc + v, 0);
		const diffMaxMin = maxBar.value - minBar.value;
		const sumFirstTwo = bars[0].value + bars[2].value;

		let questionText: string;
		let correctVal: number;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let fallbackFeedback: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			correctVal = sumFirstTwo;
			questionText = `${th.intro} ما هو مجموع قيمتَي **${bars[0].label}** و **${bars[2].label}** معاً؟`;
			const wrongDiff = Math.abs(bars[0].value - bars[2].value);
			const wrongAdjacent = bars[0].value + bars[1].value;
			const wrongMaxOnly = maxBar.value;
			candidates = [
				{
					val: wrongDiff,
					diagnosticFeedback: 'طرحت القيمتين بدل جمعهما! السؤال يطلب المجموع.'
				},
				{
					val: wrongAdjacent,
					diagnosticFeedback: `قرأت قيمة عمود ${bars[1].label} بدلاً من عمود ${bars[2].label}.`
				},
				{
					val: wrongMaxOnly,
					diagnosticFeedback: 'هذه أكبر قيمة منفردة في المخطط وليست مجموع الفئتين المطلوبتين.'
				}
			];
			fallbackFeedback = 'اقرأ الرقم أعلى كل من العمودين المطلوبين ثم اجمعهما بدقة.';
			hints = [
				`ابحث عن عمود **${bars[0].label}** واقرأ العدد المكتوب فوقه ($${bars[0].value}$).`,
				`ابحث عن عمود **${bars[2].label}** واقرأ العدد المكتوب فوقه ($${bars[2].value}$).`,
				'اجمع العددين معاً لتحصل على المجموع المطلوب.'
			];
			solutionStepsAr = [
				`قيمة ${bars[0].label} هي $${bars[0].value}$، وقيمة ${bars[2].label} هي $${bars[2].value}$.`,
				`المجموع: $${bars[0].value} + ${bars[2].value} = ${sumFirstTwo}$.`
			];
			explanation = `من المخطط: ${bars[0].label} = ${bars[0].value} و ${bars[2].label} = ${bars[2].value}، ومجموعهما ${sumFirstTwo}.`;
			finalAnswer = `${sumFirstTwo} ${th.unitAr}`;
		} else if (difficulty === 'medium') {
			correctVal = diffMaxMin;
			questionText = `${th.intro} بكم يزيد **أكبر عمود** (${maxBar.label}) عن **أصغر عمود** (${minBar.label})؟`;
			const wrongSum = maxBar.value + minBar.value;
			const wrongSecond = sorted[2].value - minBar.value;
			const wrongNoBorrow = subtractNoBorrowDigits(maxBar.value, minBar.value);
			candidates = [
				{
					val: wrongSum,
					diagnosticFeedback: 'جمعت القيمتين بدل حساب الفرق بينهما!'
				},
				{
					val: wrongSecond,
					diagnosticFeedback: `اخترت ثاني أكبر قيمة (${sorted[2].value}) بدل أكبر قيمة (${maxBar.value}).`
				},
				{
					val: wrongNoBorrow,
					diagnosticFeedback: 'خطأ في الاستعارة أثناء طرح القيمة الصغرى من الكبرى.'
				}
			];
			fallbackFeedback = 'حدّد أطول عمود وأقصر عمود في المخطط ثم احسب الفرق بينهما.';
			hints = [
				`أطول عمود هو **${maxBar.label}** وقيمته $${maxBar.value}$.`,
				`أقصر عمود هو **${minBar.label}** وقيمته $${minBar.value}$.`,
				'احسب الفرق بطرح القيمة الصغرى من الكبرى.'
			];
			solutionStepsAr = [
				`أكبر قيمة هي $${maxBar.value}$ (${maxBar.label})، وأصغر قيمة هي $${minBar.value}$ (${minBar.label}).`,
				`الفرق: $${maxBar.value} - ${minBar.value} = ${diffMaxMin}$.`
			];
			explanation = `أكبر قيمة ${maxBar.value} وأصغر قيمة ${minBar.value}، والفرق بينهما ${maxBar.value} - ${minBar.value} = ${diffMaxMin}.`;
			finalAnswer = `${diffMaxMin} ${th.unitAr}`;
		} else {
			if (seed % 2 === 0) {
				correctVal = totalAll;
				questionText = `${th.intro} ما هو **المجموع الكلي** لجميع الفئات الأربع الممثّلة في المخطط؟`;
				const wrongThree = totalAll - minBar.value;
				const wrongCarry = totalAll - 100 > 0 ? totalAll - 100 : totalAll + 100;
				const wrongMaxMin = maxBar.value + minBar.value;
				candidates = [
					{
						val: wrongThree,
						diagnosticFeedback: `نسيت إضافة قيمة العمود الرابع (${minBar.label} = ${minBar.value}).`
					},
					{
						val: wrongCarry,
						diagnosticFeedback: 'راجع الاحتفاظ عند جمع الأعداد الأربعة عمودياً.'
					},
					{
						val: wrongMaxMin,
						diagnosticFeedback: 'جمعت أكبر وأصغر قيمة فقط بدلاً من جمع الفئات الأربع كلها.'
					}
				];
				fallbackFeedback = 'اجمع قيم الأعمدة الأربعة كلها مع الانتباه إلى الاحتفاظ.';
				hints = [
					`استخرج القيم الأربع من أعلى الأعمدة: $${vals.join('$ ، $')}$.`,
					'اجمع العددين الأولين ثم أضف الثالث فالرابع (أو ضع الأعداد الأربعة عمودياً).',
					'تحقق من رقم الآحاد والعشرات لتجنب أخطاء الاحتفاظ.'
				];
				solutionStepsAr = [
					`القيم من المخطط هي: $${vals.join(' + ')}$.`,
					`المجموع الكلي يساوي: $${formatKatexNum(totalAll)}$.`
				];
				explanation = `بجمع قيم الأعمدة الأربعة: ${vals.join(' + ')} = ${formatSpaceAscii(totalAll)}.`;
				finalAnswer = `${formatSpaceAscii(totalAll)} ${th.unitAr}`;
			} else {
				const topTwo = sorted[3].value + sorted[2].value;
				const botTwo = sorted[1].value + sorted[0].value;
				correctVal = topTwo - botTwo;
				questionText = `${th.intro} بكم يزيد مجموع **أكبر قيمتين** (${sorted[3].label} و ${sorted[2].label}) عن مجموع **أصغر قيمتين** (${sorted[1].label} و ${sorted[0].label})؟`;
				candidates = [
					{
						val: topTwo,
						diagnosticFeedback: 'حسبت مجموع أكبر قيمتين فقط ونسيت طرح مجموع أصغر قيمتين.'
					},
					{
						val: totalAll,
						diagnosticFeedback: 'جمعت المجموعين بدل طرح مجموع الأصغرين من مجموع الأكبرين.'
					},
					{
						val: diffMaxMin,
						diagnosticFeedback: 'حسبت الفرق بين أكبر قيمة وأصغر قيمة فقط وليس بين المجموعين.'
					}
				];
				fallbackFeedback = 'احسب مجموع الأكبرين، ثم مجموع الأصغرين، ثم اطرح.';
				hints = [
					`اجمع أولاً أكبر قيمتين: $${sorted[3].value} + ${sorted[2].value} = ${topTwo}$.`,
					`اجمع ثانياً أصغر قيمتين: $${sorted[1].value} + ${sorted[0].value} = ${botTwo}$.`,
					'اطرح المجموع الأصغر من المجموع الأكبر.'
				];
				solutionStepsAr = [
					`مجموع أكبر قيمتين: $${sorted[3].value} + ${sorted[2].value} = ${topTwo}$.`,
					`مجموع أصغر قيمتين: $${sorted[1].value} + ${sorted[0].value} = ${botTwo}$.`,
					`الفرق: $${topTwo} - ${botTwo} = ${correctVal}$.`
				];
				explanation = `مجموع الأكبرين ${topTwo} ومجموع الأصغرين ${botTwo}، والفرق ${topTwo} - ${botTwo} = ${correctVal}.`;
				finalAnswer = `${correctVal} ${th.unitAr}`;
			}
		}

		const mcqBuilt = resolveDistinctNumericMcq(
			correctVal,
			candidates,
			(v) => `$${formatKatexNum(v)}$ ${th.unitAr}`,
			rng,
			fallbackFeedback
		);

		const hiddenIdx1 = seed % 4;
		const rowValues: (string | TableCell)[] = [
			th.valHeader,
			...bars.map((b, idx) =>
				idx === hiddenIdx1
					? { content: '......', answer: `$${b.value}$`, mark: '0.25' }
					: `$${b.value}$`
			),
			{ content: '......', answer: `$${formatTypstMathNum(totalAll)}$`, mark: '0.25' }
		];

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: `${th.intro} اقرأ المخطط ثم أجب عمّا يلي:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'table',
							headers: [th.colHeader, ...th.labels, 'المجموع'],
							cells: [],
							rows: [rowValues],
							align: 'center',
							borders: 'grid',
							headerBackground: true
						},
						{
							type: 'image',
							src: svgUrl
						}
					]
				},
				{
					type: 'text',
					content: `1) استخرج من المخطط الفئة ذات أكبر قيمة والفئة ذات أصغر قيمة، ثم احسب الفرق بينهما.`
				},
				{
					type: 'text',
					content: 'الأكبر والأصغر والفرق: ........................................................................',
					answer: `الأكبر: ${maxBar.label} ($${maxBar.value}$)، الأصغر: ${minBar.label} ($${minBar.value}$)، الفرق: $${maxBar.value} - ${minBar.value} = ${diffMaxMin}$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) احسب مجموع قيمتَي ${bars[0].label} و ${bars[2].label} معاً.`
				},
				{
					type: 'text',
					content: 'المجموع: ................................................................................',
					answer: `المجموع: $${bars[0].value} + ${bars[2].value} = ${sumFirstTwo}$ ${th.unitAr}`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '4ap_t1_tables_bar_charts',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'proportionality',
			titleAr: 'تنظيم معطيات في جداول ومخططات بيانية وقراءتها',
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgUrl,
				imageCaption: 'مخطط بياني بالأعمدة',
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
// 6. Integration Situation (isIntegration: true, customTitle: 'الوضعية الإدماجية', defaultPoints: 4)
//    Household / Travel Budget & Metric Unit Conversions (< 1,000,000, NO decimals, NO %, NO x)
// ══════════════════════════════════════════════════════════════════════════════
const templateIntegrationTravelBudget: ParameterizedTemplate = {
	id: '4ap_t1_integration_budget_units',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: ميزانية رحلة عائلية وتحويل القياسات',
	curriculumLessonId: 'lesson_4ap_t1_integration',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 97);

		// 1. Household / travel budget strictly < 1,000,000 DA
		let costA: number;
		let costB: number;
		let costC: number;
		let remBudget: number;
		const hasThreeCosts = difficulty === 'hard';

		if (difficulty === 'easy') {
			costA = rng.int(45, 95) * 1_000 + rng.int(4, 8) * 100;
			costB = rng.int(18, 45) * 1_000 + rng.int(5, 9) * 100;
			costC = 0;
			remBudget = rng.int(22, 65) * 1_000 + rng.int(2, 7) * 100;
		} else if (difficulty === 'medium') {
			costA = rng.int(125, 260) * 1_000 + rng.int(5, 9) * 100 + rng.int(4, 8) * 10;
			costB = rng.int(65, 135) * 1_000 + rng.int(6, 9) * 100 + rng.int(5, 9) * 10;
			costC = 0;
			remBudget = rng.int(42, 115) * 1_000 + rng.int(2, 6) * 100 + 50;
		} else {
			costA = rng.int(165, 295) * 1_000 + rng.int(5, 9) * 100 + rng.int(4, 9) * 10;
			costB = rng.int(85, 165) * 1_000 + rng.int(6, 9) * 100 + rng.int(5, 9) * 10;
			costC = rng.int(45, 95) * 1_000 + rng.int(4, 8) * 100 + rng.int(2, 8) * 10;
			remBudget = rng.int(55, 145) * 1_000 + rng.int(1, 7) * 100 + 25;
		}

		const totalSpent = costA + costB + costC;
		const budget = totalSpent + remBudget; // Guaranteed < 750,000 < 1,000,000

		// 2. Travel distance metric conversion (km / m -> m)
		const totalKm = difficulty === 'easy' ? rng.int(12, 35) : rng.int(24, 75);
		const totalRemM = difficulty === 'easy' ? rng.int(2, 8) * 100 : rng.int(2, 9) * 10 + 5; // tests 0 in hundreds on medium/hard!
		const totalDistM = totalKm * 1_000 + totalRemM;

		const doneKm = rng.int(4, totalKm - 4);
		const doneRemM = rng.int(15, 85) * 10;
		const doneDistM = doneKm * 1_000 + doneRemM;
		const remDistM = totalDistM - doneDistM;

		// 3. Provisions mass (kg/g) or drinking water capacity (L/cL/mL), strictly < 1,000,000
		const useCapacity = seed % 2 === 1;
		let q3PromptTypst: string;
		let q3AnswerTypst: string;
		let q3KatexIntro: string;
		let q3QuizTarget: number;
		let q3WrongTrap: number;
		let q3WrongSum: number;
		let q3WrongPartial: number;
		let q3UnitText: string;

		if (useCapacity) {
			const c1L = rng.int(4, 9);
			const c1CL = rng.int(2, 8) * 10 + 5; // e.g. 45 cL
			const c1ML = c1L * 1_000 + c1CL * 10;
			const c2L = rng.int(2, 5);
			const c2ML = c2L * 1_000 + rng.int(2, 7) * 100;
			const totalWaterML = c1ML + c2ML;
			const targetL = c1L + c2L + rng.int(3, 6);
			const targetML = targetL * 1_000;
			const missingML = targetML - totalWaterML;

			q3KatexIntro = `وللشرب خلال السفر، أحضرت العائلة دلو ماء سعته $${c1L}\\text{ L } ${c1CL}\\text{ cL}$ وقارورة كبيرة سعتها $${formatKatexNum(c2ML)}\\text{ mL}$، وتحتاج في المجموع إلى $${targetL}\\text{ L}$.`;
			q3PromptTypst = `3) أحضرت العائلة دلو ماء سعته ${ltrUnit(`${c1L} L ${c1CL} cL`)} وقارورة سعتها ${ltrUnit(`${formatGroupedRtlSafe(c2ML)} mL`)}. إذا كانت تحتاج إلى ${ltrUnit(`${targetL} L`)} من الماء، فكم مليلتراً (${ltrUnit('mL')}) ينقصها؟`;
			q3AnswerTypst = `التحويل: ${ltrUnit(`${c1L} L ${c1CL} cL = ${formatGroupedRtlSafe(c1ML)} mL`)} و ${ltrUnit(`${targetL} L = ${formatGroupedRtlSafe(targetML)} mL`)} \\ المتوفّر: $${formatTypstMathNum(c1ML)} + ${formatTypstMathNum(c2ML)} = ${formatTypstMathNum(totalWaterML)}$ mL \\ الناقص: $${formatTypstMathNum(targetML)} - ${formatTypstMathNum(totalWaterML)} = ${formatTypstMathNum(missingML)}$ mL`;
			q3QuizTarget = missingML;
			q3WrongTrap = targetML - (c1L * 1_000 + c1CL + c2ML); // forgot cL -> mL (*10)
			q3WrongSum = totalWaterML;
			q3WrongPartial = targetML - c1ML;
			q3UnitText = 'mL';
		} else {
			const m1Kg = rng.int(8, 16);
			const m1G = rng.int(2, 8) * 100 + 50; // e.g. 450 g
			const m1TotalG = m1Kg * 1_000 + m1G;
			const m2Kg = rng.int(6, 12);
			const m2G = rng.int(1, 7) * 100;
			const m2TotalG = m2Kg * 1_000 + m2G;
			const totalMassG = m1TotalG + m2TotalG;
			const limitKg = m1Kg + m2Kg + rng.int(5, 10);
			const limitG = limitKg * 1_000;
			const remMassG = limitG - totalMassG;

			q3KatexIntro = `ووضعت العائلة في صندوق السيارة حقيبة كتلتها $${m1Kg}\\text{ kg } ${m1G}\\text{ g}$ وسلّة مؤونة كتلتها $${m2Kg}\\text{ kg } ${m2G}\\text{ g}$، علماً أن الحمولة القصوى المسموحة هي $${limitKg}\\text{ kg}$.`;
			q3PromptTypst = `3) وضعت العائلة حقيبة كتلتها ${ltrUnit(`${m1Kg} kg ${m1G} g`)} وسلّة كتلتها ${ltrUnit(`${m2Kg} kg ${m2G} g`)} في صندوق السيارة (حمولته القصوى ${ltrUnit(`${limitKg} kg`)}). كم غراماً (${ltrUnit('g')}) بقي شاغراً قبل بلوغ الحمولة القصوى؟`;
			q3AnswerTypst = `التحويل: ${ltrUnit(`${formatGroupedRtlSafe(m1TotalG)} g`)} و ${ltrUnit(`${formatGroupedRtlSafe(m2TotalG)} g`)} و ${ltrUnit(`${formatGroupedRtlSafe(limitG)} g`)} \\ مجموع الكتلتين: $${formatTypstMathNum(m1TotalG)} + ${formatTypstMathNum(m2TotalG)} = ${formatTypstMathNum(totalMassG)}$ g \\ المتبقي: $${formatTypstMathNum(limitG)} - ${formatTypstMathNum(totalMassG)} = ${formatTypstMathNum(remMassG)}$ g`;
			q3QuizTarget = remMassG;
			q3WrongTrap = limitG - (m1Kg * 100 + m1G + m2TotalG); // kg * 100 trap
			q3WrongSum = totalMassG;
			q3WrongPartial = limitG - m1TotalG;
			q3UnitText = 'g';
		}

		const budgetIntroTypst = hasThreeCosts
			? `خصّصت عائلة مبلغاً مالياً قدره ${ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)} لرحلة عائلية. دفعت ${ltrUnit(`${formatGroupedRtlSafe(costA)} DA`)} للإقامة، و${ltrUnit(`${formatGroupedRtlSafe(costB)} DA`)} للصيانة والوقود، و${ltrUnit(`${formatGroupedRtlSafe(costC)} DA`)} للمؤونة. ` +
				`تبلغ مسافة الرحلة الإجمالية ${ltrUnit(`${totalKm} km ${totalRemM} m`)}، قطعت منها السيارة قبل الاستراحة ${ltrUnit(`${doneKm} km ${doneRemM} m`)}.`
			: `خصّصت عائلة مبلغاً مالياً قدره ${ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)} لرحلة عائلية. دفعت ${ltrUnit(`${formatGroupedRtlSafe(costA)} DA`)} للإقامة، و${ltrUnit(`${formatGroupedRtlSafe(costB)} DA`)} للوقود والمؤونة. ` +
				`تبلغ مسافة الرحلة الإجمالية ${ltrUnit(`${totalKm} km ${totalRemM} m`)}، قطعت منها السيارة قبل الاستراحة ${ltrUnit(`${doneKm} km ${doneRemM} m`)}.`;

		const budgetIntroKatex = hasThreeCosts
			? `خصّصت عائلة مبلغاً قدره $${formatKatexNum(budget)}\\text{ DA}$ لرحلة عائلية. دفعت $${formatKatexNum(costA)}\\text{ DA}$ للإقامة، و$${formatKatexNum(costB)}\\text{ DA}$ للوقود، و$${formatKatexNum(costC)}\\text{ DA}$ للمؤونة.\n` +
				`تبلغ المسافة الإجمالية للرحلة $${totalKm}\\text{ km } ${totalRemM}\\text{ m}$، قطعت منها السيارة قبل الاستراحة $${doneKm}\\text{ km } ${doneRemM}\\text{ m}$.`
			: `خصّصت عائلة مبلغاً قدره $${formatKatexNum(budget)}\\text{ DA}$ لرحلة عائلية. دفعت $${formatKatexNum(costA)}\\text{ DA}$ للإقامة، و$${formatKatexNum(costB)}\\text{ DA}$ للوقود والمؤونة.\n` +
				`تبلغ المسافة الإجمالية للرحلة $${totalKm}\\text{ km } ${totalRemM}\\text{ m}$، قطعت منها السيارة قبل الاستراحة $${doneKm}\\text{ km } ${doneRemM}\\text{ m}$.`;

		let quizQuestionText: string;
		let quizCorrect: number;
		let quizUnit: string;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let explanation: string;

		if (difficulty === 'easy') {
			quizCorrect = remBudget;
			quizUnit = 'DA';
			quizQuestionText = `${budgetIntroKatex}\n\nما هو **المبلغ المتبقي** لدى العائلة بعد دفع مصاريف الإقامة والوقود والمؤونة؟`;
			candidates = [
				{
					val: totalSpent,
					diagnosticFeedback: 'هذا هو مجموع المصاريف فقط؛ لم تطرح المصاريف من الميزانية الإجمالية!'
				},
				{
					val: budget - costA,
					diagnosticFeedback: 'طرحت ثمن الإقامة فقط ونسيت طرح مصاريف الوقود والمؤونة.'
				},
				{
					val: subtractForgotPayback(budget, totalSpent),
					diagnosticFeedback: 'أخطأت في الاستعارة والإرجاع أثناء الطرح العمودي.'
				}
			];
			hints = [
				'احسب أولاً مجموع المصاريف التي دفعتها العائلة بعملية الجمع.',
				'اطرح مجموع المصاريف من المبلغ المخصّص للرحلة.',
				`المجموع المصروف هو $${formatKatexNum(totalSpent)}\\text{ DA}$، اطرحه من $${formatKatexNum(budget)}\\text{ DA}$.`
			];
			solutionStepsAr = [
				`مجموع المصاريف: $${formatKatexNum(costA)} + ${formatKatexNum(costB)} = ${formatKatexNum(totalSpent)}\\text{ DA}$.`,
				`المبلغ المتبقي: $${formatKatexNum(budget)} - ${formatKatexNum(totalSpent)} = ${formatKatexNum(remBudget)}\\text{ DA}$.`
			];
			finalAnswer = `${formatSpaceAscii(remBudget)} DA`;
			explanation = `مجموع المصاريف ${formatSpaceAscii(totalSpent)} DA، والمبلغ المتبقي ${formatSpaceAscii(budget)} - ${formatSpaceAscii(totalSpent)} = ${formatSpaceAscii(remBudget)} DA.`;
		} else if (difficulty === 'medium') {
			quizCorrect = remDistM;
			quizUnit = 'm';
			quizQuestionText = `${budgetIntroKatex}\n\nما هي **المسافة المتبقية** بوحدة المتر ($\\text{m}$) لكي تصل العائلة إلى وجهتها بعد الاستراحة؟`;
			const wrongUnit100 = Math.abs(totalKm * 100 + totalRemM - (doneKm * 100 + doneRemM));
			const wrongAdded = totalDistM + doneDistM;
			const wrongForgotRemM = (totalKm - doneKm) * 1_000;
			candidates = [
				{
					val: wrongUnit100,
					diagnosticFeedback: `انتبه! $1\\text{ km} = 1\\,000\\text{ m}$ وليس $100\\text{ m}$؛ وهناك خانات المئات الفارغة في $${totalKm}\\text{ km } ${totalRemM}\\text{ m}$.`
				},
				{
					val: wrongAdded,
					diagnosticFeedback: 'جمعت المسافتين بدلاً من طرح المسافة المقطوعة من المسافة الإجمالية.'
				},
				{
					val: wrongForgotRemM,
					diagnosticFeedback: 'طرحت الكيلومترات فقط ونسيت الأمتار المذكورة في كلتا المسافتين.'
				}
			];
			hints = [
				'حوّل أولاً المسافة الإجمالية والمسافة المقطوعة إلى المتر ($1\\text{ km} = 1\\,000\\text{ m}$).',
				`تذكّر وضع $0$ في خانة المئات عند تحويل $${totalKm}\\text{ km } ${totalRemM}\\text{ m}$ إلى المتر.`,
				'اطرح المسافة المقطوعة بالمتر من المسافة الإجمالية بالمتر.'
			];
			solutionStepsAr = [
				`المسافة الإجمالية: $${totalKm}\\text{ km } ${totalRemM}\\text{ m} = ${formatKatexNum(totalDistM)}\\text{ m}$.`,
				`المسافة المقطوعة: $${doneKm}\\text{ km } ${doneRemM}\\text{ m} = ${formatKatexNum(doneDistM)}\\text{ m}$.`,
				`المسافة المتبقية: $${formatKatexNum(totalDistM)} - ${formatKatexNum(doneDistM)} = ${formatKatexNum(remDistM)}\\text{ m}$.`
			];
			finalAnswer = `${formatSpaceAscii(remDistM)} m`;
			explanation = `نحول المسافتين إلى المتر (${formatSpaceAscii(totalDistM)} m و ${formatSpaceAscii(doneDistM)} m) ثم نطرح فنجد ${formatSpaceAscii(remDistM)} m.`;
		} else {
			quizCorrect = q3QuizTarget;
			quizUnit = q3UnitText;
			quizQuestionText = `${budgetIntroKatex}\n\n${q3KatexIntro}\n\n${useCapacity ? 'كم مليلتراً ($\\text{mL}$) ينقص العائلة من الماء لبلوغ الكمية المطلوبة؟' : 'كم غراماً ($\\text{g}$) بقي شاغراً في صندوق السيارة قبل بلوغ الحمولة القصوى؟'}`;
			candidates = [
				{
					val: q3WrongTrap,
					diagnosticFeedback: useCapacity
						? 'أخطأت في التحويل من السنتيلتر أو اللتر إلى المليلتر ($1\\text{ L} = 1\\,000\\text{ mL}$ و $1\\text{ cL} = 10\\text{ mL}$).'
						: 'أخطأت في التحويل من الكيلوغرام إلى الغرام ($1\\text{ kg} = 1\\,000\\text{ g}$ وليس $100\\text{ g}$).'
				},
				{
					val: q3WrongSum,
					diagnosticFeedback: 'حسبت مجموع الكميتين فقط ونسيت طرحه من الحد المطلوب.'
				},
				{
					val: q3WrongPartial,
					diagnosticFeedback: 'طرحت مقداراً واحداً فقط ونسيت جمع المقدارين معاً قبل الطرح.'
				}
			];
			hints = [
				`حوّل جميع المقادير إلى أصغر وحدة مطلوبة ($\\text{${q3UnitText}}$) باستعمال جدول التحويلات.`,
				'اجمع المقدارين المتوفرين معاً أولاً.',
				'اطرح المجموع من الحد الإجمالي المطلوب.'
			];
			solutionStepsAr = [
				`نحوّل جميع المعطيات إلى وحدة ($\\text{${q3UnitText}}$).`,
				`نجمع الكميتين المتوفرتين ثم نطرح المجموع من الحد الكلي.`,
				`النتيجة هي: $${formatKatexNum(q3QuizTarget)}\\text{ ${q3UnitText}}$.`
			];
			finalAnswer = `${formatSpaceAscii(q3QuizTarget)} ${q3UnitText}`;
			explanation = `بعد التحويل إلى ${q3UnitText} وجمع المقدارين ثم الطرح من الحد الكلي نجد ${formatSpaceAscii(q3QuizTarget)} ${q3UnitText}.`;
		}

		const mcqBuilt = resolveDistinctNumericMcq(
			quizCorrect,
			candidates,
			(v) => `$${formatKatexNum(v)}\\text{ ${quizUnit}}$`,
			rng,
			'راجع التحويل إلى الوحدة المطلوبة وعمليتي الجمع والطرح العموديين.'
		);

		const q1TypstAns = hasThreeCosts
			? `المصروف: $${formatTypstMathNum(costA)} + ${formatTypstMathNum(costB)} + ${formatTypstMathNum(costC)} = ${formatTypstMathNum(totalSpent)}$ دج \\ المتبقي: $${formatTypstMathNum(budget)} - ${formatTypstMathNum(totalSpent)} = ${formatTypstMathNum(remBudget)}$ دج`
			: `المصروف: $${formatTypstMathNum(costA)} + ${formatTypstMathNum(costB)} = ${formatTypstMathNum(totalSpent)}$ دج \\ المتبقي: $${formatTypstMathNum(budget)} - ${formatTypstMathNum(totalSpent)} = ${formatTypstMathNum(remBudget)}$ دج`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: budgetIntroTypst,
			content: [
				{
					type: 'text',
					content: '1) احسب المبلغ الإجمالي الذي صرفته العائلة، ثم احسب المبلغ المتبقي من الميزانية (أنجز العمليات عمودياً).'
				},
				{
					type: 'text',
					content: 'المبلغ المصروف: .............................. \\ المبلغ المتبقي: ..............................',
					answer: q1TypstAns,
					mark: '1.5'
				},
				{
					type: 'text',
					content: '2) حوّل المسافتين إلى المتر، ثم احسب المسافة المتبقية للوصول إلى الوجهة بعد الاستراحة.'
				},
				{
					type: 'text',
					content: 'التحويل والطرح: ........................................................................',
					answer: `التحويل: ${ltrUnit(`${formatGroupedRtlSafe(totalDistM)} m`)} و ${ltrUnit(`${formatGroupedRtlSafe(doneDistM)} m`)} \\ المسافة المتبقية: $${formatTypstMathNum(totalDistM)} - ${formatTypstMathNum(doneDistM)} = ${formatTypstMathNum(remDistM)}$ متراً`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: q3PromptTypst
				},
				{
					type: 'text',
					content: 'الإجابة: ..................................................................................',
					answer: q3AnswerTypst,
					mark: '1'
				}
			]
		};

		return {
			templateId: '4ap_t1_integration_budget_units',
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: ميزانية رحلة عائلية وتحويل القياسات',
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

export const TEMPLATES_4AP_T1: ParameterizedTemplate[] = [
	templateNumbersTo999999,
	templateAddSubLarge,
	templateMetricUnits,
	templateLinesAndQuadrilaterals,
	templateTablesAndBarCharts,
	templateIntegrationTravelBudget
];
