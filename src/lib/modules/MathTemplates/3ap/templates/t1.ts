import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgBarChart, svgGridPoints, svgNumberLine } from '../../svg-helpers';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';

const NBSP = '\u00A0';
const LRI = '\u2066';
const PDI = '\u2069';

const CHILDREN = [
	{ name: 'أمين', fem: false },
	{ name: 'سارة', fem: true },
	{ name: 'ياسين', fem: false },
	{ name: 'مريم', fem: true },
	{ name: 'كريم', fem: false },
	{ name: 'ليلى', fem: true }
] as const;

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Tahoma,Arial,sans-serif">${body}</svg>`;
}

/** Formats a natural number with normal ASCII spaces every 3 digits (e.g. "3 425"). */
function formatSpaceAscii(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Formats a natural number with non-breaking spaces every 3 digits for RTL prose. */
function formatGroupedRtlSafe(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** Formats a natural number for KaTeX browser math mode (`\,` thin space). */
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

/** Wraps an LTR measurement/unit phrase in Unicode LTR isolate for RTL prose. */
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

/** Converts an integer in [0..9999] into Modern Standard Arabic words. */
function numberToArabicWords9999(n: number): string {
	const val = Math.max(0, Math.min(9999, Math.trunc(n)));
	if (val === 0) return 'صفر';
	const th = Math.floor(val / 1000);
	const rem = val % 1000;
	const parts: string[] = [];
	if (th === 1) parts.push('ألف');
	else if (th === 2) parts.push('ألفان');
	else if (th >= 3) parts.push(`${underThousandToArabic(th)} آلاف`);
	if (rem > 0) parts.push(underThousandToArabic(rem));
	return parts.join(' و');
}

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

function formatCanonicalKatex(n: number): string {
	return buildCanonicalParts(n)
		.map(({ digit, placeVal }) =>
			placeVal === 1 ? `${digit}` : `(${digit} \\times ${formatKatexNum(placeVal)})`
		)
		.join(' + ');
}

function formatCanonicalTypst(n: number): string {
	return buildCanonicalParts(n)
		.map(({ digit, placeVal }) =>
			placeVal === 1 ? `${digit}` : `(${digit} times ${formatTypstMathNum(placeVal)})`
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
		if (s >= 10 && !dropped) {
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
			if (!skippedPayback) {
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

function countCarries(a: number, b: number): number {
	let carry = 0;
	let count = 0;
	let x = a;
	let y = b;
	while (x > 0 || y > 0) {
		const s = (x % 10) + (y % 10) + carry;
		if (s >= 10) {
			carry = 1;
			count++;
		} else {
			carry = 0;
		}
		x = Math.floor(x / 10);
		y = Math.floor(y / 10);
	}
	return count;
}

function countBorrows(a: number, b: number): number {
	let borrow = 0;
	let count = 0;
	let x = a;
	let y = b;
	while (x > 0 || y > 0) {
		const top = x % 10;
		const bot = (y % 10) + borrow;
		if (top < bot) {
			borrow = 1;
			count++;
		} else {
			borrow = 0;
		}
		x = Math.floor(x / 10);
		y = Math.floor(y / 10);
	}
	return count;
}

function pickCarryAddPair(
	rng: SeededRng,
	minA: number,
	maxA: number,
	minB: number,
	maxB: number,
	minCarries: number,
	maxSum = 9999
): [number, number] {
	for (let tries = 0; tries < 300; tries++) {
		const a = rng.int(minA, maxA);
		const b = rng.int(minB, Math.min(maxB, maxSum - a));
		if (b < minB) continue;
		if (a + b <= maxSum && countCarries(a, b) >= minCarries) {
			return [a, b];
		}
	}
	return [2465, 1785];
}

function pickBorrowSubPair(
	rng: SeededRng,
	minA: number,
	maxA: number,
	minB: number,
	minBorrows: number,
	requireInternalZero = false
): [number, number] {
	for (let tries = 0; tries < 400; tries++) {
		let a = rng.int(minA, maxA);
		if (requireInternalZero) {
			const th = rng.int(3, 8);
			const h = rng.int(0, 4);
			const t = h === 0 ? rng.int(1, 5) : 0;
			const u = rng.int(1, 5);
			a = th * 1000 + h * 100 + t * 10 + u;
		}
		const maxB = a - 120;
		if (maxB <= minB) continue;
		const b = rng.int(minB, maxB);
		if (countBorrows(a, b) >= minBorrows) {
			return [a, b];
		}
	}
	return requireInternalZero ? [5034, 1678] : [5342, 1628];
}

function resolveDistinctNumericMcq(
	correctVal: number,
	candidates: { val: number; diagnosticFeedback: string }[],
	formatText: (val: number) => string,
	rng: SeededRng,
	fallbackFeedback: string,
	minVal = 1,
	maxVal = 9999
): {
	options: { text: string; diagnosticFeedback?: string }[];
	correctIndices: [number];
} {
	const seen = new Set<number>([correctVal]);
	const distractors: { text: string; diagnosticFeedback: string }[] = [];

	for (const c of candidates) {
		const v = Math.round(c.val);
		if (v >= minVal && v <= maxVal && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: c.diagnosticFeedback });
		}
		if (distractors.length === 3) break;
	}

	const fallbackDeltas = [100, -100, 10, -10, 1000, -1000, 200, -200, 50, -50, 20, -20, 1, -1];
	for (const d of fallbackDeltas) {
		if (distractors.length === 3) break;
		const v = correctVal + d;
		if (v >= minVal && v <= maxVal && !seen.has(v)) {
			seen.add(v);
			distractors.push({ text: formatText(v), diagnosticFeedback: fallbackFeedback });
		}
	}

	return buildUniqueMcqOptions(formatText(correctVal), distractors, rng);
}

/** Custom SVG: vertical addition/subtraction layout up to 4 digits. */
function svgVerticalOperation(a: number, b: number, op: '+' | '-'): string {
	const w = 290;
	const h = 152;
	const sa = String(a).padStart(4, ' ');
	const sb = String(b).padStart(4, ' ');
	const colX = [98, 138, 178, 218];
	const headers = ['آ', 'م', 'ع', 'و'];
	const headerCols = ['#5b21b6', '#15803d', '#c2410c', '#1d4ed8'];
	const opColor = op === '+' ? '#2563eb' : '#dc2626';

	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`
	];

	for (let i = 0; i < 4; i++) {
		parts.push(
			`<text x="${colX[i]}" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="${headerCols[i]}" direction="rtl">${headers[i]}</text>`
		);
		if (sa[i] !== ' ') {
			parts.push(
				`<text x="${colX[i]}" y="62" text-anchor="middle" font-size="22" font-weight="bold" fill="#0f172a">${sa[i]}</text>`
			);
		}
		if (sb[i] !== ' ') {
			parts.push(
				`<text x="${colX[i]}" y="94" text-anchor="middle" font-size="22" font-weight="bold" fill="#0f172a">${sb[i]}</text>`
			);
		}
		parts.push(
			`<text x="${colX[i]}" y="130" text-anchor="middle" font-size="20" font-weight="bold" fill="${opColor}">?</text>`
		);
	}

	parts.push(
		`<text x="56" y="94" text-anchor="middle" font-size="24" font-weight="bold" fill="${opColor}">${op}</text>`,
		`<line x1="42" y1="104" x2="244" y2="104" stroke="#0f172a" stroke-width="2.2"/>`
	);

	return wrapSvg(w, h, parts.join(''));
}

/** Custom SVG: ruler graduated in cm and mm measuring a colored strip. */
function svgRulerMeasure(cmWhole: number, mmPart: number, stripLabel: string): string {
	const w = 460;
	const h = 138;
	const maxCm = 7;
	const x0 = 40;
	const pxPerCm = 54;
	const pxPerMm = pxPerCm / 10;
	const totalMm = cmWhole * 10 + mmPart;
	const endX = x0 + totalMm * pxPerMm;

	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`,
		`<rect x="${x0}" y="26" width="${(endX - x0).toFixed(1)}" height="22" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>`,
		`<text x="${((x0 + endX) / 2).toFixed(1)}" y="41" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" direction="rtl">${escapeXml(stripLabel)}</text>`,
		`<line x1="${endX.toFixed(1)}" y1="24" x2="${endX.toFixed(1)}" y2="62" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3,2"/>`,
		`<rect x="${x0 - 14}" y="62" width="${maxCm * pxPerCm + 42}" height="52" rx="5" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5"/>`
	];

	for (let mm = 0; mm <= maxCm * 10; mm++) {
		const tx = x0 + mm * pxPerMm;
		const isCm = mm % 10 === 0;
		const isHalf = mm % 5 === 0 && !isCm;
		const isTarget = mm === totalMm;
		const tickLen = isCm ? 20 : isTarget ? 18 : isHalf ? 14 : 9;
		const stroke = isTarget ? '#dc2626' : '#0f172a';
		const sw = isTarget ? '2.2' : isCm ? '1.9' : isHalf ? '1.3' : '1';
		parts.push(
			`<line x1="${tx.toFixed(1)}" y1="62" x2="${tx.toFixed(1)}" y2="${62 + tickLen}" stroke="${stroke}" stroke-width="${sw}"/>`
		);
		if (isCm) {
			const cmNum = mm / 10;
			const col = cmNum === cmWhole ? '#dc2626' : '#0f172a';
			parts.push(
				`<text x="${tx.toFixed(1)}" y="101" text-anchor="middle" font-size="12" font-weight="bold" fill="${col}">${cmNum}</text>`
			);
		}
	}

	parts.push(
		`<text x="${x0 + maxCm * pxPerCm + 18}" y="101" text-anchor="middle" font-size="11" font-weight="bold" fill="#78350f">cm</text>`
	);

	return wrapSvg(w, h, parts.join(''));
}

/** Custom SVG: 4 angles checked with a yellow set square (الكوس). */
function svgRightAngleSetSquare(correctIdx: number, tiltDeg: number, wrongAnglesDeg: [number, number, number]): string {
	const w = 560;
	const h = 170;
	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`
	];

	let wCursor = 0;
	for (let i = 0; i < 4; i++) {
		const cardX = 20 + i * 132;
		const isRight = i === correctIdx;
		const angleDeg = isRight ? 90 : wrongAnglesDeg[wCursor++];

		parts.push(
			`<rect x="${cardX}" y="20" width="122" height="130" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`,
			`<text x="${cardX + 61}" y="38" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" direction="rtl">الزاوية ${i + 1}</text>`
		);

		const vx = cardX + 38;
		const vy = 122;
		const baseTilt = isRight ? (tiltDeg * Math.PI) / 180 : 0;
		const len1 = 62;
		const len2 = 58;
		const sqSize = 50;

		// Set square triangle aligned along baseTilt
		const sq1x = vx + Math.cos(baseTilt) * sqSize;
		const sq1y = vy - Math.sin(baseTilt) * sqSize;
		const sq2x = vx + Math.cos(baseTilt + Math.PI / 2) * sqSize;
		const sq2y = vy - Math.sin(baseTilt + Math.PI / 2) * sqSize;

		parts.push(
			`<polygon points="${vx.toFixed(1)},${vy.toFixed(1)} ${sq1x.toFixed(1)},${sq1y.toFixed(1)} ${sq2x.toFixed(1)},${sq2y.toFixed(1)}" fill="#fef08a" fill-opacity="0.82" stroke="#ca8a04" stroke-width="1.4"/>`
		);

		const r1x = vx + Math.cos(baseTilt) * len1;
		const r1y = vy - Math.sin(baseTilt) * len1;
		const rad2 = baseTilt + (angleDeg * Math.PI) / 180;
		const r2x = vx + Math.cos(rad2) * len2;
		const r2y = vy - Math.sin(rad2) * len2;

		parts.push(
			`<line x1="${vx.toFixed(1)}" y1="${vy.toFixed(1)}" x2="${r1x.toFixed(1)}" y2="${r1y.toFixed(1)}" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>`,
			`<line x1="${vx.toFixed(1)}" y1="${vy.toFixed(1)}" x2="${r2x.toFixed(1)}" y2="${r2y.toFixed(1)}" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>`,
			`<circle cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" r="3.5" fill="#1e3a8a"/>`
		);
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Custom SVG: segment midpoint + perpendicular + non-aligned outlier point. */
function svgSegmentMidpointAndAlign(opts: {
	leftLbl: string;
	midLbl: string;
	rightLbl: string;
	perpLbl: string;
	outLbl: string;
	givenLabel: string;
	showRightMark: boolean;
}): string {
	const w = 420;
	const h = 175;
	const ax = 58;
	const mx = 210;
	const bx = 362;
	const y = 122;

	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`,
		`<line x1="${mx}" y1="${y}" x2="${mx}" y2="34" stroke="#16a34a" stroke-width="2.4"/>`,
		`<circle cx="${mx}" cy="34" r="4.2" fill="#15803d"/>`,
		`<text x="${mx + 14}" y="38" font-size="13" font-weight="bold" fill="#15803d">${escapeXml(opts.perpLbl)}</text>`,
		`<line x1="${ax}" y1="${y}" x2="${bx}" y2="${y}" stroke="#2563eb" stroke-width="3"/>`,
		`<circle cx="${ax}" cy="${y}" r="4.5" fill="#1d4ed8"/>`,
		`<text x="${ax}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.leftLbl)}</text>`,
		`<circle cx="${mx}" cy="${y}" r="4.8" fill="#dc2626"/>`,
		`<text x="${mx}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">${escapeXml(opts.midLbl)}</text>`,
		`<circle cx="${bx}" cy="${y}" r="4.5" fill="#1d4ed8"/>`,
		`<text x="${bx}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.rightLbl)}</text>`,
		`<line x1="134" y1="${y - 6}" x2="134" y2="${y + 6}" stroke="#059669" stroke-width="2"/>`,
		`<line x1="286" y1="${y - 6}" x2="286" y2="${y + 6}" stroke="#059669" stroke-width="2"/>`,
		`<circle cx="316" cy="56" r="4.5" fill="#ea580c"/>`,
		`<text x="330" y="60" font-size="13" font-weight="bold" fill="#c2410c">${escapeXml(opts.outLbl)}</text>`,
		`<text x="${mx}" y="158" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">${escapeXml(opts.givenLabel)}</text>`
	];

	if (opts.showRightMark) {
		parts.push(
			`<rect x="${mx}" y="${y - 14}" width="14" height="14" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>`
		);
	}

	return wrapSvg(w, h, parts.join(''));
}

// ============================================================================
// 1. Numeric: Numbers up to 9,999 (svgNumberLine + reading/decomposing/ordering)
// ============================================================================
const templateNumbersTo9999: ParameterizedTemplate = {
	id: '3ap_t1_numbers_to_9999',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_3ap_t1_numbers_to_9999',
	titleAr: 'الأعداد إلى 9 999: القراءة والتفكيك والمقارنة والترتيب على نصف مستقيم مدرج',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 1);

		let minNL: number;
		let maxNL: number;
		let stepNL: number;
		let subTicksNL: number;
		let valA: number;
		let valB: number;
		let nDecomp: number;

		if (difficulty === 'easy') {
			const k = rng.int(1, 8);
			minNL = k * 1000;
			maxNL = minNL + 1000;
			stepNL = 200;
			subTicksNL = 2; // every 100
			valA = minNL + rng.pick([1, 3]) * 100;
			valB = minNL + rng.pick([5, 7, 9]) * 100;
			nDecomp =
				rng.int(1, 8) * 1000 +
				(cleanSeed % 2 === 0 ? rng.int(1, 9) * 100 + rng.int(1, 9) : rng.int(1, 9) * 10 + rng.int(1, 9));
		} else if (difficulty === 'medium') {
			const k = rng.int(1, 8);
			const h = rng.pick([0, 2, 4, 6]);
			minNL = k * 1000 + h * 100;
			maxNL = minNL + 100;
			stepNL = 20;
			subTicksNL = 2; // every 10
			valA = minNL + rng.pick([10, 30]);
			valB = minNL + rng.pick([50, 70, 90]);
			nDecomp = rng.int(2, 8) * 1000 + rng.int(1, 9) * 100 + rng.int(1, 9);
		} else {
			const k = rng.int(2, 8);
			const h = rng.pick([0, 3, 5, 7]);
			const t = rng.int(1, 8);
			minNL = k * 1000 + h * 100 + t * 10;
			maxNL = minNL + 10;
			stepNL = 2;
			subTicksNL = 2; // every 1
			valA = minNL + rng.pick([1, 3]);
			valB = minNL + rng.pick([7, 9]);
			nDecomp = rng.int(2, 8) * 1000 + rng.int(1, 9) * 10 + rng.int(1, 9);
		}

		const svg = svgNumberLine({
			min: minNL,
			max: maxNL,
			step: stepNL,
			subTicks: subTicksNL,
			marks: [
				{ value: valA, label: 'A', color: '#dc2626' },
				{ value: valB, label: 'B', color: '#2563eb' }
			]
		});
		const svgPath = saveSvgAsset(`3ap_t1_numline_${difficulty}_s${cleanSeed}`, svg);

		// Build 4 distinct numbers to order descending in SujetExercise
		const thDecomp = Math.floor(nDecomp / 1000);
		const remDecomp = nDecomp % 1000;
		const swapCand = thDecomp * 1000 + ((remDecomp % 10) * 100 + Math.floor(remDecomp / 10));
		const nFourth =
			swapCand >= 1000 && swapCand <= 9999 && swapCand !== nDecomp && swapCand !== valA && swapCand !== valB
				? swapCand
				: Math.min(9998, Math.max(1005, thDecomp * 1000 + rng.int(105, 895)));

		const orderSet = new Set<number>([valA, valB, nDecomp, nFourth]);
		while (orderSet.size < 4) {
			orderSet.add(rng.int(1005, 9995));
		}
		const orderNums = rng.shuffle(Array.from(orderSet));
		const asc = [...orderNums].sort((x, y) => x - y);
		const desc = [...asc].reverse();

		const lowerTh = Math.floor(nDecomp / 1000) * 1000;
		const upperTh = lowerTh + 1000;
		const hundredsDigit = Math.floor(nDecomp / 100) % 10;
		const hundredsCount = Math.floor(nDecomp / 100);

		let questionText = '';
		let built: ReturnType<typeof buildUniqueMcqOptions>;
		let explanation = '';
		let finalAnswer = '';
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (difficulty === 'easy') {
			const askA = cleanSeed % 2 === 0;
			const targetVal = askA ? valA : valB;
			const targetLbl = askA ? 'A' : 'B';
			const stepHalf = stepNL / subTicksNL;

			questionText = `تأمل نصف المستقيم المدرج المقابل. ما هو العدد الذي تشير إليه النقطة $${targetLbl}$؟`;
			const mcq = resolveDistinctNumericMcq(
				targetVal,
				[
					{
						val: targetVal - stepHalf,
						diagnosticFeedback: `هذه التدريجة الرئيسية تسبق النقطة $${targetLbl}$ بنصف تدريجة ($${stepHalf}$).`
					},
					{
						val: targetVal + stepHalf,
						diagnosticFeedback: `هذه التدريجة الرئيسية تلي النقطة $${targetLbl}$؛ لاحظ أن $${targetLbl}$ في المنتصف.`
					},
					{
						val: targetVal + stepNL,
						diagnosticFeedback: 'انتبه لقيمة كل تدريجة صغيرة على نصف المستقيم المدرج.'
					}
				],
				(v) => `$${formatKatexNum(v)}$`,
				rng,
				'عدّ التدريجات بدءاً من أقرب ألف أو مئة مكتوبة أسفل المستقيم.'
			);
			built = mcq;
			finalAnswer = formatSpaceAscii(targetVal);
			explanation = `كل تدريجة رئيسية تزيد بـ $${stepNL}$، والتدريجة الوسطى تزيد بـ $${stepHalf}$، إذن النقطة $${targetLbl}$ توافق العدد $${formatKatexNum(targetVal)}$.`;
			hints = [
				`لاحظ الفرق بين تدريجتين رئيسيتين متتاليتين: نضيف $${stepNL}$ في كل خطوة.`,
				`التدريجة الصغيرة الموجودة في المنتصف تزيد بمقدار $${stepHalf}$ عن التدريجة التي تسبقها.`,
				`انطلق من أقرب تدريجة مكتوبة قبل النقطة $${targetLbl}$ وأضف $${stepHalf}$.`
			];
			solutionStepsAr = [
				`سُلّم التدريج الرئيسي هو $${stepNL}$، ونصف التدريج هو $${stepHalf}$.`,
				`تقع النقطة $${targetLbl}$ عند التدريجة $${formatKatexNum(targetVal)}$.`,
				`العدد بالحروف: ${numberToArabicWords9999(targetVal)}.`
			];
		} else if (difficulty === 'medium') {
			if (cleanSeed % 2 === 0) {
				questionText = `اقرأ العدد الموافق للنقطة $A$ على نصف المستقيم المدرج، ثم اختر **تفكيكه النموذجي الصحيح**:`;
				const correctExpr = `$${formatCanonicalKatex(valA)}$`;
				const thA = Math.floor(valA / 1000);
				const hA = Math.floor(valA / 100) % 10;
				const tA = Math.floor(valA / 10) % 10;
				const distractor1 =
					hA === 0
						? `$(${thA} \\times 1\\,000) + (${tA} \\times 100)$`
						: `$(${thA} \\times 1\\,000) + (${hA} \\times 10) + ${tA}$`;
				const distractor2 = `$(${thA} \\times 1\\,000) + (${hA > 0 ? hA : tA} \\times 1)$`;
				const distractor3 = `$${formatCanonicalKatex(valB)}$`;

				built = buildUniqueMcqOptions(
					correctExpr,
					[
						{
							text: distractor1,
							diagnosticFeedback: 'انتبه لمرتبة المئات والعشرات: كل رقم يُضرب في قيمة منزلته (1000، 100، 10).'
						},
						{
							text: distractor2,
							diagnosticFeedback: 'الرقم في مرتبة العشرات أو المئات لا يُكتب كوحدات منفردة!'
						},
						{
							text: distractor3,
							diagnosticFeedback: 'هذا التفكيك يخص النقطة $B$ وليس النقطة $A$.'
						}
					],
					rng
				);
				finalAnswer = formatSpaceAscii(valA);
				explanation = `النقطة $A$ تشير إلى العدد $${formatKatexNum(valA)}$ وتفكيكه النموذجي هو $${formatCanonicalKatex(valA)}$.`;
				hints = [
					`حدد أولاً قيمة النقطة $A$ على نصف المستقيم المدرج (كل تدريجة صغيرة تساوي $10$).`,
					'في التفكيك النموذجي نضرب رقم الآلاف في $1\\,000$، والمئات في $100$، والعشرات في $10$.',
					'لا نكتب المرتبة التي رقمها $0$ في التفكيك النموذجي.'
				];
				solutionStepsAr = [
					`النقطة $A$ توافق العدد $${formatKatexNum(valA)}$.`,
					`التفكيك النموذجي: $${formatCanonicalKatex(valA)}$.`
				];
			} else {
				const lowerH = Math.floor(valB / 100) * 100;
				const upperH = lowerH + 100;
				const lowerThB = Math.floor(valB / 1000) * 1000;
				const upperThB = lowerThB + 1000;
				const prevH = lowerH >= 100 ? lowerH - 100 : upperH;
				const nextH = lowerH >= 100 ? lowerH : upperH + 100;

				questionText = `اقرأ العدد الموافق للنقطة $B$ على نصف المستقيم المدرج، ثم اختر حصره الصحيح بين **مئتين متتاليتين**:`;
				const correctExpr = `$${formatKatexNum(lowerH)} < ${formatKatexNum(valB)} < ${formatKatexNum(upperH)}$`;
				built = buildUniqueMcqOptions(
					correctExpr,
					[
						{
							text: `$${formatKatexNum(prevH)} < ${formatKatexNum(valB)} < ${formatKatexNum(nextH)}$`,
							diagnosticFeedback: `تحقق من المئة التي تسبق $${formatKatexNum(valB)}$ مباشرة والمئة التي تليه.`
						},
						{
							text: `$${formatKatexNum(lowerThB)} < ${formatKatexNum(valB)} < ${formatKatexNum(upperThB)}$`,
							diagnosticFeedback: 'هذا حصر بين **ألفين متتاليين** وليس بين **مئتين متتاليتين**.'
						},
						{
							text: `$${formatKatexNum(valB - 10)} < ${formatKatexNum(valB)} < ${formatKatexNum(valB + 10)}$`,
							diagnosticFeedback: 'هذا حصر بين **عشرتين** وليس بين **مئتين متتاليتين**.'
						}
					],
					rng
				);
				finalAnswer = `${formatSpaceAscii(lowerH)} < ${formatSpaceAscii(valB)} < ${formatSpaceAscii(upperH)}`;
				explanation = `النقطة $B$ توافق $${formatKatexNum(valB)}$، وهو محصور بين المئتين المتتاليتين $${formatKatexNum(lowerH)}$ و $${formatKatexNum(upperH)}$.`;
				hints = [
					'اقرأ العدد الموافق للنقطة $B$ على نصف المستقيم المدرج (كل تدريجة صغيرة تساوي $10$).',
					'لحصر عدد بين مئتين متتاليتين، استبدل رقمي العشرات والوحدات بالصفر لإيجاد المئة الصغرى.',
					'أضف $100$ إلى المئة الصغرى لتحصل على المئة الكبرى الموالية.'
				];
				solutionStepsAr = [
					`قيمة النقطة $B$ هي $${formatKatexNum(valB)}$.`,
					`الحصر بين مئتين متتاليتين: ${correctExpr}.`
				];
			}
		} else {
			if (cleanSeed % 2 === 0) {
				const hDigitB = Math.floor(valB / 100) % 10;
				const hCountB = Math.floor(valB / 100);
				const tCountB = Math.floor(valB / 10);
				const thDigitB = Math.floor(valB / 1000);

				questionText = `تأمل نصف المستقيم المدرج (حيث كل تدريجة صغيرة تساوي $1$). اقرأ العدد الموافق للنقطة $B$، ثم حدّد **عدد مئاته** (وليس رقم مئاته):`;
				built = resolveDistinctNumericMcq(
					hCountB,
					[
						{
							val: hDigitB > 0 ? hDigitB : thDigitB,
							diagnosticFeedback: `هذا هو **رقم** المئات (أو الآلاف) فقط، بينما المطلوب هو **عدد** المئات الكلي في العدد!`
						},
						{
							val: tCountB,
							diagnosticFeedback: `العدد $${formatKatexNum(tCountB)}$ يمثل **عدد العشرات** وليس عدد المئات.`
						},
						{
							val: thDigitB,
							diagnosticFeedback: `الرقم $${thDigitB}$ يمثل عدد الآلاف فقط، وليس عدد المئات (كل ألف فيه $10$ مئات).`
						}
					],
					(v) => `$${formatKatexNum(v)}$`,
					rng,
					'لحساب عدد المئات، نحذف رقمي العشرات والوحدات من اليمين.',
					1,
					999
				);
				finalAnswer = String(hCountB);
				explanation = `النقطة $B$ تشير إلى العدد $${formatKatexNum(valB)}$، وعدد مئاته هو $${hCountB}$ (نأخذ رقم المئات مع رقم الآلاف على يساره).`;
				hints = [
					'اقرأ العدد الموافق للنقطة $B$ بدقة (المسافة بين تدريجتين رئيسيتين هي $2$).',
					'كل $1\\,000$ يحتوي على $10$ مئات.',
					'لإيجاد عدد المئات، احذف رقمي العشرات والوحدات من يمين العدد.'
				];
				solutionStepsAr = [
					`النقطة $B$ توافق العدد $${formatKatexNum(valB)}$.`,
					`نحذف الوحدات والعشرات: يبقى $${hCountB}$ مئة.`
				];
			} else {
				questionText = `تأمل النقطتين $A$ و $B$ على نصف المستقيم المدرج، وأضف إليهما العددين $${formatKatexNum(nDecomp)}$ و $${formatKatexNum(nFourth)}$. أيّ ترتيب **تصاعدي** (من الأصغر إلى الأكبر) صحيح؟`;
				const correctExpr = `$${asc.map(formatKatexNum).join(' < ')}$`;
				const wrongDesc = `$${desc.map(formatKatexNum).join(' > ')}$`;
				const swapMid = [...asc];
				[swapMid[1], swapMid[2]] = [swapMid[2], swapMid[1]];
				const byLastDigit = [...orderNums].sort((x, y) => (x % 10) - (y % 10) || x - y);
				if (byLastDigit.every((v, i) => v === asc[i])) {
					[byLastDigit[0], byLastDigit[1]] = [byLastDigit[1], byLastDigit[0]];
				}

				built = buildUniqueMcqOptions(
					correctExpr,
					[
						{
							text: wrongDesc,
							diagnosticFeedback: 'هذا ترتيب **تنازلي** (من الأكبر إلى الأصغر) بينما السؤال يطلب الترتيب **التصاعدي**.'
						},
						{
							text: `$${byLastDigit.map(formatKatexNum).join(' < ')}$`,
							diagnosticFeedback: 'عند مقارنة أعداد من $4$ أرقام، نبدأ المقارنة من اليسار (الآلاف، ثم المئات، ثم العشرات، ثم الوحدات).'
						},
						{
							text: `$${swapMid.map(formatKatexNum).join(' < ')}$`,
							diagnosticFeedback: 'تحقق من مقارنة العددين الأوسطين مرتبة بمرتبة.'
						}
					],
					rng
				);
				finalAnswer = asc.map(formatSpaceAscii).join(' < ');
				explanation = `النقطتان هما $A = ${formatKatexNum(valA)}$ و $B = ${formatKatexNum(valB)}$، وبالترتيب التصاعدي من اليسار إلى اليمين: ${correctExpr}.`;
				hints = [
					'اقرأ قيمتي النقطتين $A$ و $B$ من نصف المستقيم المدرج أولاً.',
					'قارن الأعداد الأربعة بدءاً من مرتبة الآلاف (أقصى اليسار) ثم المئات فالعشرات فالوحدات.',
					'الترتيب التصاعدي يبدأ من العدد الأصغر نحو العدد الأكبر باستعمال الرمز $<$.'
				];
				solutionStepsAr = [
					`النقطة $A = ${formatKatexNum(valA)}$ والنقطة $B = ${formatKatexNum(valB)}$.`,
					`الترتيب التصاعدي: ${correctExpr}.`
				];
			}
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) اقرأ على نصف المستقيم المدرج العددين الموافقين للنقطتين $A$ و $B$، ثم اكتب العدد $A$ بالحروف.`,
						answer: `1) $A = ${formatTypstMathNum(valA)}$ ، $B = ${formatTypstMathNum(valB)}$ \\ كتابة $A$ بالحروف: ${numberToArabicWords9999(valA)}.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'نصف المستقيم المدرج'
					}
				]
			},
			{
				type: 'text',
				content: `2) إليك العدد $${formatTypstMathNum(nDecomp)}$: أعطِ تفكيكه النموذجي، ثم حدّد رقم مئاته وعدد مئاته.`,
				answer: `2) التفكيك النموذجي: $${formatCanonicalTypst(nDecomp)}$ \\ رقم المئات: $${hundredsDigit}$ ، وعدد المئات: $${hundredsCount}$.`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) رتّب الأعداد التالية تنازلياً باستعمال الرمز ($>$): ${orderNums.map((n) => `$${formatTypstMathNum(n)}$`).join(' ، ')} ، ثم احصر العدد $${formatTypstMathNum(nDecomp)}$ بين ألفين متتاليين.`,
				answer: `3) الترتيب التنازلي: $${desc.map(formatTypstMathNum).join(' > ')}$ \\ الحصر: $${formatTypstMathNum(lowerTh)} < ${formatTypstMathNum(nDecomp)} < ${formatTypstMathNum(upperTh)}$`,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'نصف المستقيم المدرج',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ نصف المستقيم المدرج ثم أجب عن الأسئلة التالية:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 2. Numeric: Vertical Addition & Subtraction with Regrouping (< 10,000)
// ============================================================================
const templateAddSubVertical: ParameterizedTemplate = {
	id: '3ap_t1_add_sub_vertical',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_3ap_t1_add_sub_regrouping',
	titleAr: 'الجمع العمودي بالاحتفاظ والطرح العمودي بالاستعارة (الأعداد إلى 9 999)',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 2);

		let addA: number;
		let addB: number;
		let subA: number;
		let subB: number;

		if (difficulty === 'easy') {
			[addA, addB] = pickCarryAddPair(rng, 1120, 4890, 345, 2985, 1, 9999);
			[subA, subB] = pickBorrowSubPair(rng, 2340, 8980, 456, 1, false);
		} else if (difficulty === 'medium') {
			[addA, addB] = pickCarryAddPair(rng, 1450, 5890, 1285, 3985, 2, 9999);
			[subA, subB] = pickBorrowSubPair(rng, 3420, 9490, 1345, 2, false);
		} else {
			[addA, addB] = pickCarryAddPair(rng, 2268, 6489, 1876, 3498, 3, 9999);
			[subA, subB] = pickBorrowSubPair(rng, 4012, 8905, 1456, 2, true);
		}

		const sumVal = addA + addB;
		const diffVal = subA - subB;

		// Optional 3-term addition < 9999 for hard 3rd sub-question
		const [t1, t2] = pickCarryAddPair(rng, 1150, 3250, 1250, 3450, 2, 7500);
		const t3 = rng.int(450, Math.min(2400, 9999 - (t1 + t2)));
		const tripleSum = t1 + t2 + t3;

		const isAddQuiz = cleanSeed % 2 === 0;
		const opA = isAddQuiz ? addA : subA;
		const opB = isAddQuiz ? addB : subB;
		const correctVal = isAddQuiz ? sumVal : diffVal;

		const svg = svgVerticalOperation(opA, opB, isAddQuiz ? '+' : '-');
		const svgPath = saveSvgAsset(`3ap_t1_vop_${difficulty}_s${cleanSeed}`, svg);

		let questionText = '';
		let built: ReturnType<typeof resolveDistinctNumericMcq>;
		let explanation = '';
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (isAddQuiz) {
			questionText = `تأمل عملية الجمع العمودية المقابلة، ثم احسب الناتج الصحيح للعملية: $${formatKatexNum(addA)} + ${formatKatexNum(addB)}$`;
			const missedCarry = addWithMissedCarry(addA, addB);
			const wrongExtraCarry = sumVal + 100 <= 9999 ? sumVal + 100 : sumVal - 100;
			const wrongTens = sumVal + 10 <= 9999 ? sumVal + 10 : sumVal - 10;

			built = resolveDistinctNumericMcq(
				sumVal,
				[
					{
						val: missedCarry,
						diagnosticFeedback: 'نسيت إضافة رقم الاحتفاظ ($+1$) إلى العمود الموالي عند بلوغ المجموع $10$ أو أكثر!'
					},
					{
						val: wrongExtraCarry,
						diagnosticFeedback: 'تحقق من جمع عمود المئات مع الاحتفاظ بدقة.'
					},
					{
						val: wrongTens,
						diagnosticFeedback: 'تحقق من جمع عمود العشرات وإضافة الاحتفاظ من الوحدات.'
					}
				],
				(v) => `$${formatKatexNum(v)}$`,
				rng,
				'راجع الجمع العمودي من اليمين إلى اليسار مع كتابة الاحتفاظ فوق كل مرتبة.'
			);
			explanation = `نجمع عمودياً من الوحدات إلى الآلاف مع مراعاة الاحتفاظ فنجد: $${formatKatexNum(addA)} + ${formatKatexNum(addB)} = ${formatKatexNum(sumVal)}$.`;
			hints = [
				'ابدأ الجمع دائماً من اليمين (مرتبة الوحدات).',
				'إذا كان مجموع العمود $10$ أو أكثر، نكتب رقم الآحاد ونحتفظ بـ $+1$ في العمود الموالي يساراً.',
				`تحقق من الجمع في المئات والآلاف مع إضافة كل احتفاظ (الناتج مكوّن من $4$ أرقام).`
			];
			solutionStepsAr = [
				`نرتب الوحدات تحت الوحدات، والعشرات تحت العشرات، والمئات تحت المئات، والآلاف تحت الآلاف.`,
				`نجمع من اليمين إلى اليسار مع الاحتفاظ عند تجاوز $9$.`,
				`النتيجة هي: $${formatKatexNum(addA)} + ${formatKatexNum(addB)} = ${formatKatexNum(sumVal)}$.`
			];
		} else {
			questionText = `تأمل عملية الطرح العمودية المقابلة، ثم احسب الفرق الصحيح للعملية: $${formatKatexNum(subA)} - ${formatKatexNum(subB)}$`;
			const noBorrow = subtractNoBorrowDigits(subA, subB);
			const forgotPayback = subtractForgotPayback(subA, subB);
			const wrongHundreds = diffVal + 100 <= 9999 ? diffVal + 100 : diffVal - 100;

			built = resolveDistinctNumericMcq(
				diffVal,
				[
					{
						val: noBorrow,
						diagnosticFeedback: 'لا يمكن طرح رقم علوي أصغر من رقم سفلي بقلب الطرح! يجب الاستعارة من المرتبة المجاورة.'
					},
					{
						val: forgotPayback,
						diagnosticFeedback: 'استعرت $10$ في إحدى المراتب لكنك نسيت إنقاص $1$ (أو إضافته للأسفل) في المرتبة الموالية.'
					},
					{
						val: wrongHundreds,
						diagnosticFeedback: 'انتبه عند الاستعارة في مرتبة المئات وتحقق من النتيجة بالجمع العكسي.'
					}
				],
				(v) => `$${formatKatexNum(v)}$`,
				rng,
				'تحقق من خطوات الاستعارة في كل مرتبة، وجرّب التحقق بالجمع العكسي.'
			);
			explanation = `نطرح عمودياً من الوحدات إلى الآلاف بالاستعارة عند الحاجة فنجد: $${formatKatexNum(subA)} - ${formatKatexNum(subB)} = ${formatKatexNum(diffVal)}$.`;
			hints = [
				'تذكّر أن نبدأ الطرح من عمود الوحدات (اليمين) نحو اليسار.',
				'إذا كان الرقم العلوي أصغر من الرقم السفلي، نستعير $10$ من المرتبة التي تليها يساراً ولا ننسى إرجاع $1$.',
				`للتحقق من إجابتك، اجمعها مع $${formatKatexNum(subB)}$؛ يجب أن تحصل على $${formatKatexNum(subA)}$.`
			];
			solutionStepsAr = [
				`نضع $${formatKatexNum(subA)}$ في الأعلى و $${formatKatexNum(subB)}$ في الأسفل مع محاذاة المراتب.`,
				`ننجز الطرح بالاستعارة من اليمين إلى اليسار: الناتج $${formatKatexNum(diffVal)}$.`,
				`التحقق بالجمع العكسي: $${formatKatexNum(diffVal)} + ${formatKatexNum(subB)} = ${formatKatexNum(subA)}$.`
			];
		}

		const thirdContent: ContentBlock =
			difficulty === 'hard'
				? {
						type: 'text',
						content: `3) ضع وأنجز عمودياً مجموع الأعداد الثلاثة: $${formatTypstMathNum(t1)} + ${formatTypstMathNum(t2)} + ${formatTypstMathNum(t3)} = $ ................................`,
						answer: `3) المجموع العمودي: $${formatTypstMathNum(t1)} + ${formatTypstMathNum(t2)} + ${formatTypstMathNum(t3)} = ${formatTypstMathNum(tripleSum)}$`,
						mark: '0.5'
					}
				: {
						type: 'text',
						content: '3) تحقّق من صحة عملية الطرح السابقة باستعمال الجمع العكسي:',
						answer: `3) التحقق بالجمع: $${formatTypstMathNum(diffVal)} + ${formatTypstMathNum(subB)} = ${formatTypstMathNum(subA)}$ (النتيجة صحيحة).`,
						mark: '0.5'
					};

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ضع وأنجز عمودياً عملية الجمع: \\ $${formatTypstMathNum(addA)} + ${formatTypstMathNum(addB)} = $ ..............................`,
						answer: `1) ناتج الجمع العمودي: $${formatTypstMathNum(addA)} + ${formatTypstMathNum(addB)} = ${formatTypstMathNum(sumVal)}$`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: isAddQuiz ? 'نموذج وضع الجمع العمودي' : 'نموذج وضع الطرح العمودي'
					}
				]
			},
			{
				type: 'text',
				content: `2) ضع وأنجز عمودياً عملية الطرح: \\ $${formatTypstMathNum(subA)} - ${formatTypstMathNum(subB)} = $ ..............................`,
				answer: `2) ناتج الطرح العمودي: $${formatTypstMathNum(subA)} - ${formatTypstMathNum(subB)} = ${formatTypstMathNum(diffVal)}$`,
				mark: '0.5'
			},
			thirdContent
		];

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: isAddQuiz ? 'عملية جمع عمودية' : 'عملية طرح عمودية',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'ضع ثم أنجز عمودياً العمليات الآتية بدقة مع احترام ترتيب المراتب:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer: formatSpaceAscii(correctVal)
		};
	}
};

// ============================================================================
// 3. Measurement: Lengths m, cm, mm conversion & comparison (< 10,000)
// ============================================================================
const templateLengthsMCmMm: ParameterizedTemplate = {
	id: '3ap_t1_lengths_m_cm_mm',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'measurement',
	curriculumLessonId: 'lesson_3ap_t1_lengths_m_cm_mm',
	titleAr: 'قياس الأطوال: المتر (m) والسنتيمتر (cm) والمليمتر (mm) والتحويلات',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 3);

		// Ruler strip measurement (<= 6 cm 9 mm = 69 mm)
		const rulerCm = rng.int(2, 6);
		const rulerMm = rng.int(1, 9);
		const rulerTotalMm = rulerCm * 10 + rulerMm;
		const rulerSvg = svgRulerMeasure(rulerCm, rulerMm, 'شريط ورقي');
		const rulerSvgPath = saveSvgAsset(`3ap_t1_ruler_${difficulty}_s${cleanSeed}`, rulerSvg);

		// Table conversions for SujetExercise (all values < 10,000, zero decimals)
		const convM = rng.int(2, 8);
		const convCmSingle = rng.int(1, 9); // internal zero trap: e.g. 4 m 7 cm = 407 cm
		const convAnsCm = convM * 100 + convCmSingle;

		const convMToMm = rng.int(2, 9);
		const convMmHalf = rng.pick([0, 200, 500, 800]);
		const convAnsMm = convMToMm * 1000 + convMmHalf; // <= 9800 < 10000

		// 3 distinct mixed-unit lengths to order ascending (all integer cm & integer mm < 10000)
		const ord1Mm = rng.int(55, 95) * 10; // 550..950 mm = 55..95 cm
		const ord2M = rng.int(1, 3);
		const ord2Cm = rng.int(12, 48); // e.g. 1 m 25 cm = 125 cm
		const ord2TotalCm = ord2M * 100 + ord2Cm;
		const ord3TotalCm = ord2M * 100 + ord2Cm + rng.int(25, 65); // e.g. 170 cm or 290 cm

		const ordItems = rng.shuffle([
			{ label: ltrUnit(`${ord1Mm} mm`), katex: `$${ord1Mm}\\text{ mm}$`, cmVal: ord1Mm / 10 },
			{
				label: ltrUnit(`${ord2M} m ${ord2Cm} cm`),
				katex: `$${ord2M}\\text{ m } ${ord2Cm}\\text{ cm}$`,
				cmVal: ord2TotalCm
			},
			{ label: ltrUnit(`${ord3TotalCm} cm`), katex: `$${ord3TotalCm}\\text{ cm}$`, cmVal: ord3TotalCm }
		]);
		const ordSorted = [...ordItems].sort((x, y) => x.cmVal - y.cmVal);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			if (cleanSeed % 2 === 0) {
				const qText = 'تأمل المسطرة المدرجة بالسنتيمتر (`cm`) والمليمتر (`mm`) في الصورة. ما هو طول الشريط الورقي بالمليمتر (`mm`)؟';
				quizQuestion = {
					type: 'fill_blank',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: rulerSvgPath,
					imageCaption: 'قياس طول شريط بالمسطرة المدرجة',
					questionData: {
						sentence: 'طول الشريط الورقي بالمليمتر هو ___ mm',
						acceptedAnswers: [String(rulerTotalMm), `${rulerTotalMm} mm`, `${rulerTotalMm}mm`],
						answers: [String(rulerTotalMm), `${rulerTotalMm} mm`, `${rulerTotalMm}mm`]
					},
					explanation: `نقرأ على المسطرة $${rulerCm}\\text{ cm}$ و $${rulerMm}\\text{ mm}$. وبما أن $1\\text{ cm} = 10\\text{ mm}$ فإن الطول هو $${rulerCm * 10} + ${rulerMm} = ${rulerTotalMm}\\text{ mm}$.`
				};
				hints = [
					'تبدأ قطعة الشريط من التدريجة $0$؛ اقرأ آخر رقم سنتيمتر قبل نهاية الشريط.',
					`عدّ التدريجات الصغيرة (المليمترات) بعد السنتيمتر $${rulerCm}$.`,
					`تذكّر أن $1\\text{ cm} = 10\\text{ mm}$، إذن $${rulerCm}\\text{ cm} = ${rulerCm * 10}\\text{ mm}$ ونضيف $${rulerMm}\\text{ mm}$.`
				];
				solutionStepsAr = [
					`ينتهي الشريط بعد $${rulerCm}\\text{ cm}$ بـ $${rulerMm}$ تدريجات صغيرة ($${rulerMm}\\text{ mm}$).`,
					`نحول السنتيمترات: $${rulerCm}\\text{ cm} = ${rulerCm * 10}\\text{ mm}$.`,
					`المجموع: $${rulerCm * 10} + ${rulerMm} = ${rulerTotalMm}\\text{ mm}$.`
				];
				finalAnswer = `${rulerTotalMm} mm`;
			} else {
				const m = rng.int(2, 8);
				const c = rng.pick([20, 30, 40, 50, 60, 70, 80, 90]);
				const ans = m * 100 + c;
				const mcq = resolveDistinctNumericMcq(
					ans,
					[
						{
							val: m * 10 + c,
							diagnosticFeedback: `تذكّر أن $1\\text{ m} = 100\\text{ cm}$ وليس $10\\text{ cm}$، لذا $${m}\\text{ m} = ${m * 100}\\text{ cm}$.`
						},
						{
							val: m * 1000 + c,
							diagnosticFeedback: `ضربت في $1\\,000$ بدل $100$؛ العلاقة بين المتر والسنتيمتر هي $1\\text{ m} = 100\\text{ cm}$.`
						},
						{
							val: m * 100 + Math.floor(c / 10),
							diagnosticFeedback: `انتبه لقيمة السنتيمترات المعطاة ($${c}\\text{ cm}$) عند الجمع.`
						}
					],
					(v) => `$${formatKatexNum(v)}\\text{ cm}$`,
					rng,
					'استعمل العلاقة $1\\text{ m} = 100\\text{ cm}$ ثم اجمع السنتيمترات.'
				);
				const qText = `طول حبل يساوي $${m}\\text{ m } ${c}\\text{ cm}$. كم يساوي طوله بالسنتيمتر (\`cm\`)؟`;
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: rulerSvgPath,
					imageCaption: 'وحدات قياس الأطوال',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `$${m}\\text{ m} = ${m * 100}\\text{ cm}$، ونضيف $${c}\\text{ cm}$ فنحصل على $${ans}\\text{ cm}$.`
				};
				hints = [
					'تذكّر أن كل $1\\text{ m}$ يساوي $100\\text{ cm}$.',
					`حوّل أولاً $${m}\\text{ m}$ إلى السنتيمتر: $${m} \\times 100 = ${m * 100}\\text{ cm}$.`,
					`أضف الآن $${c}\\text{ cm}$ إلى $${m * 100}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`$${m}\\text{ m} = ${m * 100}\\text{ cm}$.`,
					`المجموع: $${m * 100} + ${c} = ${ans}\\text{ cm}$.`
				];
				finalAnswer = `${ans} cm`;
			}
		} else if (difficulty === 'medium') {
			const mcq = resolveDistinctNumericMcq(
				convAnsCm,
				[
					{
						val: convM * 10 + convCmSingle,
						diagnosticFeedback: `أهملت صفر العشرات! $${convM}\\text{ m} = ${convM * 100}\\text{ cm}$ وليس $${convM * 10}\\text{ cm}$.`
					},
					{
						val: convM * 100 + convCmSingle * 10,
						diagnosticFeedback: `العدد $${convCmSingle}$ يمثل وحدات السنتيمتر وليس عشرات السنتيمتر ($${convCmSingle * 10}$).`
					},
					{
						val: convM * 1000 + convCmSingle,
						diagnosticFeedback: `استعملت $1\\,000$ بدل $100$؛ تذكّر أن $1\\text{ m} = 100\\text{ cm}$.`
					}
				],
				(v) => `$${formatKatexNum(v)}\\text{ cm}$`,
				rng,
				'ضع القياس في جدول المراتب (m | dm | cm) وضع 0 في خانة الديسمتر الفارغة.'
			);
			const qText = `طول طاولة القسم هو $${convM}\\text{ m } ${convCmSingle}\\text{ cm}$. ما هو طولها بالسنتيمتر (\`cm\`)؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$${convM}\\text{ m} = ${convM * 100}\\text{ cm}$، ونضيف $${convCmSingle}\\text{ cm}$ فيكون الناتج $${convAnsCm}\\text{ cm}$.`
			};
			hints = [
				'انتبه لوجود رقم في الآحاد فقط للسنتيمترات ($' + convCmSingle + '\\text{ cm}$).',
				`حوّل $${convM}\\text{ m}$ إلى السنتيمتر ($${convM * 100}\\text{ cm}$) ثم اجمع.`,
				`الناتج يتكوّن من ثلاثة أرقام ويتوسطه الصفر: $${convM * 100} + ${convCmSingle}$.`
			];
			solutionStepsAr = [
				`$${convM}\\text{ m} = ${convM * 100}\\text{ cm}$.`,
				`$${convM * 100}\\text{ cm} + ${convCmSingle}\\text{ cm} = ${convAnsCm}\\text{ cm}$.`
			];
			finalAnswer = `${convAnsCm} cm`;
		} else {
			// Hard: unified addition or subtraction of lengths (< 10,000)
			if (cleanSeed % 2 === 0) {
				const l1M = rng.int(2, 5);
				const l1Cm = rng.int(15, 75);
				const l2Cm = rng.int(45, 95);
				const totalCm = l1M * 100 + l1Cm + l2Cm;
				const qText = `ربط نجّار لوحين خشبيين: طول الأول $${l1M}\\text{ m } ${l1Cm}\\text{ cm}$ وطول الثاني $${l2Cm}\\text{ cm}$. ما هو الطول الإجمالي للوحين معاً بالسنتيمتر (\`cm\`)؟`;
				quizQuestion = {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						answer: totalCm,
						displayTemplate: '? cm',
						variables: [],
						tolerance: 0
					},
					explanation: `نوحّد الوحدة إلى السنتيمتر: $${l1M}\\text{ m } ${l1Cm}\\text{ cm} = ${l1M * 100 + l1Cm}\\text{ cm}$، ثم نجمع: $${l1M * 100 + l1Cm} + ${l2Cm} = ${totalCm}\\text{ cm}$.`
				};
				hints = [
					'لا تجمع أطوالاً بوحدات مختلفة مباشرة؛ حوّل الطول الأول كله إلى السنتيمتر أولاً.',
					`$${l1M}\\text{ m } ${l1Cm}\\text{ cm} = ${l1M * 100 + l1Cm}\\text{ cm}$.`,
					`أنجز الجمع العمودي: $${l1M * 100 + l1Cm} + ${l2Cm}$.`
				];
				solutionStepsAr = [
					`تحويل الطول الأول: $${l1M}\\text{ m } ${l1Cm}\\text{ cm} = ${l1M * 100 + l1Cm}\\text{ cm}$.`,
					`الجمع: $${l1M * 100 + l1Cm} + ${l2Cm} = ${totalCm}\\text{ cm}$.`
				];
				finalAnswer = `${totalCm} cm`;
			} else {
				const totalM = rng.int(3, 7);
				const cutCm = rng.int(125, 245);
				const remCm = totalM * 100 - cutCm;
				const qText = `طول شريط قماش $${totalM}\\text{ m}$، قصّت الخياطة منه قطعة طولها $${cutCm}\\text{ cm}$. كم سنتيمتراً (\`cm\`) بقي من الشريط؟`;
				const mcq = resolveDistinctNumericMcq(
					remCm,
					[
						{
							val: totalM * 100 + cutCm,
							diagnosticFeedback: 'جمعت الطولين بدل طرح طول القطعة المقصوصة من الطول الأصلي.'
						},
						{
							val: remCm + 100,
							diagnosticFeedback: 'نسيت إنقاص $1$ من المئات عند الاستعارة في الطرح العمودي.'
						},
						{
							val: Math.max(10, Math.abs(totalM * 10 - cutCm)),
							diagnosticFeedback: `تذكّر أن $1\\text{ m} = 100\\text{ cm}$ وليس $10\\text{ cm}$.`
						}
					],
					(v) => `$${formatKatexNum(v)}\\text{ cm}$`,
					rng,
					'حوّل الأمتار إلى سنتيمترات أولاً ثم اطرح عمودياً بالاستعارة.'
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نحوّل $${totalM}\\text{ m} = ${totalM * 100}\\text{ cm}$، ثم نطرح: $${totalM * 100} - ${cutCm} = ${remCm}\\text{ cm}$.`
				};
				hints = [
					`حوّل الطول الأصلي من المتر إلى السنتيمتر: $${totalM}\\text{ m} = ${totalM * 100}\\text{ cm}$.`,
					'بما أننا قصصنا قطعة من الشريط، نستعمل عملية الطرح العمودي بالاستعارة.',
					`احسب: $${totalM * 100} - ${cutCm}$.`
				];
				solutionStepsAr = [
					`تحويل: $${totalM}\\text{ m} = ${totalM * 100}\\text{ cm}$.`,
					`المتبقي: $${totalM * 100} - ${cutCm} = ${remCm}\\text{ cm}$.`
				];
				finalAnswer = `${remCm} cm`;
			}
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) اقرأ على المسطرة المدرجة طول الشريط الورقي بالسنتيمتر والمليمتر، ثم عبّر عنه بالمليمتر (${ltrUnit('mm')}):`,
						answer: `1) طول الشريط: ${ltrUnit(`${rulerCm} cm ${rulerMm} mm`)} ويساوي ${ltrUnit(`${rulerTotalMm} mm`)}.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: rulerSvgPath,
						caption: 'المسطرة المدرجة'
					}
				]
			},
			{
				type: 'table',
				headers: ['التحويل المطلوب', 'النتيجة'],
				cells: [],
				rows: [
					[
						ltrUnit(`${convM} m ${convCmSingle} cm = ...... cm`),
						{
							content: '........................',
							answer: ltrUnit(`${convAnsCm} cm`),
							mark: '0.25'
						}
					],
					[
						ltrUnit(`${convMToMm} m${convMmHalf > 0 ? ` ${convMmHalf / 10} cm` : ''} = ...... mm`),
						{
							content: '........................',
							answer: ltrUnit(`${formatGroupedRtlSafe(convAnsMm)} mm`),
							mark: '0.25'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `3) رتّب الأطوال التالية تصاعدياً بعد تحويلها إلى نفس الوحدة: ${ordItems.map((x) => x.label).join(' ، ')}`,
				answer: `3) الترتيب التصاعدي (من الأصغر إلى الأكبر): ${ordSorted.map((x) => x.label).join(' ، ثم ')}`,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'measurement',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'أجب عن الأسئلة التالية حول قياس الأطوال والتحويلات:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 4. Geometry: Right Angle (الكوس), Segment Midpoint & Alignment (Custom SVGs)
// ============================================================================
const templateGeometryT1: ParameterizedTemplate = {
	id: '3ap_t1_geometry_right_angle_midpoint_align',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'geometry',
	curriculumLessonId: 'lesson_3ap_t1_right_angle_set_square',
	titleAr: 'الاستقامية ومنتصف قطعة مستقيم والزاوية القائمة بالكوس',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 4);
		const variant = rng.int(0, 2);

		if (variant === 0) {
			// Variant 0: Right angle check with yellow set square (الكوس)
			const correctIdx = rng.int(0, 3);
			const tiltDeg = difficulty === 'easy' ? 0 : difficulty === 'medium' ? rng.pick([0, 12, -10]) : rng.pick([15, -14, 22]);
			const wrongPool: [number, number, number] = rng.shuffle([
				rng.int(50, 65),
				rng.int(115, 130),
				rng.pick([70, 110])
			]) as [number, number, number];

			const svg = svgRightAngleSetSquare(correctIdx, tiltDeg, wrongPool);
			const svgPath = saveSvgAsset(`3ap_t1_rightangle_${difficulty}_s${cleanSeed}`, svg);

			// Identify an acute and an obtuse angle index for SujetExercise Q2
			const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== correctIdx);
			const acuteIdx = wrongIndices[wrongPool.findIndex((deg) => deg < 90)];
			const obtuseIdx = wrongIndices[wrongPool.findIndex((deg) => deg > 90)];

			const halfCm = rng.int(4, 9);
			const totalCm = halfCm * 2;

			const correctLabel = `الزاوية ${correctIdx + 1}`;
			const distractors = wrongIndices.map((idx, k) => {
				const deg = wrongPool[k];
				return {
					text: `الزاوية ${idx + 1}`,
					diagnosticFeedback:
						deg < 90
							? `في الزاوية ${idx + 1}، الضلع الثاني يدخل داخل حافة الكوس، فهي أصغر من الزاوية القائمة.`
							: `في الزاوية ${idx + 1}، الضلع الثاني يبتعد خارج حافة الكوس، فهي أكبر من الزاوية القائمة.`
				};
			});
			const built = buildUniqueMcqOptions(correctLabel, distractors, rng);

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) تأمّل الوضعيات الأربع لاستعمال الكوس: أيّ زاوية هي زاوية قائمة؟ ولماذا؟',
							answer: `1) ${correctLabel} هي الزاوية القائمة لأن ضلعيها ينطبقان تماماً على حافتي الزاوية القائمة للكوس.`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'التحقق من الزاوية القائمة بالكوس'
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر زاوية أصغر من الزاوية القائمة، وزاوية أخرى أكبر من الزاوية القائمة من الشكل:',
					answer: `2) زاوية أصغر من القائمة: الزاوية ${acuteIdx + 1} ، وزاوية أكبر من القائمة: الزاوية ${obtuseIdx + 1}.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) ارسم قطعة مستقيم $[A B]$ طولها $${totalCm}$ ${ltrUnit('cm')}، ثم عيّن النقطة $M$ منتصفها. ما هو طول القطعة $[A M]$؟`,
					answer: `3) طول $[A M]$ هو $${halfCm}$ ${ltrUnit('cm')} (لأن $${halfCm} + ${halfCm} = ${totalCm}$).`,
					mark: '0.5'
				}
			];

			const qText = 'تأمل الوضعيات الأربع لاستعمال الكوس في الصورة. أيّ زاوية هي **الزاوية القائمة**؟';
			return {
				templateId: this.id,
				seed: cleanSeed,
				grade: '3ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'التحقق من الزاوية القائمة بالكوس',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `في ${correctLabel} ينطبق الضلعان تماماً على حافتي الزاوية القائمة للكوس، لذا هي زاوية قائمة.`
				},
				sujetExercise: {
					points: 1.5,
					instruction: 'لاحظ الشكل المقابل وأجب بدقة باستعمال المسطرة والكوس:',
					content
				},
				hints: [
					'تستعمل الزاوية القائمة للكوس (حيث يلتقي الضلعان القائمان) وليس الزاويتين الحادتين.',
					'الزاوية القائمة هي التي يلامس ضلعاها معاً حافتي الكوس دون أن يدخل ضلع داخله أو يبتعد خارجه.',
					`لاحظ جيداً الزاوية ${correctIdx + 1} حتى وإن كانت مائلة قليلاً.`
				],
				solutionStepsAr: [
					`نطابق رأس الزاوية القائمة للكوس على رأس كل زاوية وضلعها الأول.`,
					`نجد أن ${correctLabel} فقط ينطبق ضلعها الثاني على حافة الكوس.`
				],
				finalAnswer: correctLabel
			};
		}

		if (variant === 1) {
			// Variant 1: Segment midpoint + perpendicularity + alignment
			const labelSet = rng.pick([
				{ left: 'A', mid: 'M', right: 'B', perp: 'C', out: 'K' },
				{ left: 'E', mid: 'O', right: 'F', perp: 'G', out: 'H' },
				{ left: 'P', mid: 'I', right: 'Q', perp: 'R', out: 'S' }
			]);
			const halfCm =
				difficulty === 'easy'
					? rng.int(3, 8)
					: difficulty === 'medium'
						? rng.int(6, 12)
						: rng.int(11, 19);
			const totalCm = halfCm * 2;
			const askFullLength = cleanSeed % 2 === 0;

			const givenLabel = askFullLength
				? `${labelSet.left}${labelSet.mid} = ${halfCm} cm`
				: `${labelSet.left}${labelSet.right} = ${totalCm} cm`;

			const svg = svgSegmentMidpointAndAlign({
				leftLbl: labelSet.left,
				midLbl: labelSet.mid,
				rightLbl: labelSet.right,
				perpLbl: labelSet.perp,
				outLbl: labelSet.out,
				givenLabel,
				showRightMark: true
			});
			const svgPath = saveSvgAsset(`3ap_t1_midpoint_${difficulty}_s${cleanSeed}`, svg);

			const targetAns = askFullLength ? totalCm : halfCm;
			const segAsked = askFullLength
				? `${labelSet.left}${labelSet.right}`
				: `${labelSet.left}${labelSet.mid}`;

			const qText = askFullLength
				? `في الشكل المقابل، النقطة $${labelSet.mid}$ هي منتصف قطعة المستقيم $[${labelSet.left}${labelSet.right}]$، وطول $[${labelSet.left}${labelSet.mid}] = ${halfCm}\\text{ cm}$. ما هو طول القطعة $[${labelSet.left}${labelSet.right}]$ كلها؟`
				: `في الشكل المقابل، النقطة $${labelSet.mid}$ هي منتصف قطعة المستقيم $[${labelSet.left}${labelSet.right}]$ التي طولها $${totalCm}\\text{ cm}$. ما هو طول القطعة $[${labelSet.left}${labelSet.mid}]$؟`;

			const built = resolveDistinctNumericMcq(
				targetAns,
				[
					{
						val: askFullLength ? halfCm : totalCm,
						diagnosticFeedback: askFullLength
							? `$${halfCm}\\text{ cm}$ هو طول النصف فقط، والمطلوب طول القطعة كاملة $[${labelSet.left}${labelSet.right}]$.`
							: `$${totalCm}\\text{ cm}$ هو طول القطعة كاملة، بينما النقطة $${labelSet.mid}$ تقسمها إلى نصفين متساويين.`
					},
					{
						val: targetAns + 2,
						diagnosticFeedback: 'تحقق من أن النقطة في المنتصف تماماً تقسم القطعة إلى جزأين متساويين.'
					},
					{
						val: askFullLength ? halfCm * 3 : Math.max(1, halfCm - 2),
						diagnosticFeedback: askFullLength
							? `القطعة تتكوّن من نصفين متساويين ($${halfCm} + ${halfCm}$) وليس ثلاثة أضعاف.`
							: `ابحث عن العدد الذي إذا جمعته مع نفسه أعطى $${totalCm}$.`
					}
				],
				(v) => `$${v}\\text{ cm}$`,
				rng,
				'استعمل خاصية منتصف قطعة مستقيم: الجزآن متساويان في الطول.',
				1,
				99
			);

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) استخرج من الشكل ثلاث نقط على استقامية واحدة، ونقطة ليست على استقامية معها.`,
							answer: `1) النقط التي على استقامية واحدة: $${labelSet.left}$ و $${labelSet.mid}$ و $${labelSet.right}$. والنقطة التي ليست على استقامية معها: $${labelSet.out}$ (أو $${labelSet.perp}$).`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'منتصف قطعة مستقيم والتعامد والاستقامية'
						}
					]
				},
				{
					type: 'text',
					content: `2) النقطة $${labelSet.mid}$ منتصف القطعة $[${labelSet.left} ${labelSet.right}]$ (${ltrUnit(givenLabel)}). احسب طول القطعة $[${askFullLength ? `${labelSet.left} ${labelSet.right}` : `${labelSet.left} ${labelSet.mid}`}]$ بالسنتيمتر:`,
					answer: askFullLength
						? `2) طول $[${labelSet.left} ${labelSet.right}]$ هو: $${halfCm} + ${halfCm} = ${totalCm}$ ${ltrUnit('cm')}.`
						: `2) طول $[${labelSet.left} ${labelSet.mid}]$ هو نصف $${totalCm}$ ${ltrUnit('cm')}، أي $${halfCm}$ ${ltrUnit('cm')}.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) لاحظ التشفير الأحمر عند الرأس $${labelSet.mid}$: ماذا يمثل، وما العلاقة بين المستقيمين $(${labelSet.mid} ${labelSet.perp})$ و $(${labelSet.left} ${labelSet.right})$؟`,
					answer: `3) التشفير الأحمر يدل على زاوية قائمة، إذن المستقيمان $(${labelSet.mid} ${labelSet.perp})$ و $(${labelSet.left} ${labelSet.right})$ متعامدان.`,
					mark: '0.5'
				}
			];

			return {
				templateId: this.id,
				seed: cleanSeed,
				grade: '3ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: `منتصف القطعة [${segAsked}]`,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: askFullLength
						? `بما أن $${labelSet.mid}$ في المنتصف، فإن $[${labelSet.mid}${labelSet.right}] = ${halfCm}\\text{ cm}$ أيضاً، فيكون الطول الكلي $${halfCm} + ${halfCm} = ${totalCm}\\text{ cm}$.`
						: `بما أن $${labelSet.mid}$ في المنتصف، فهي تقسم $${totalCm}\\text{ cm}$ إلى نصفين متساويين طول كل منهما $${halfCm}\\text{ cm}$.`
				},
				sujetExercise: {
					points: 1.5,
					instruction: 'تأمّل الشكل الهندسي المقابل ثم أجب عن الأسئلة:',
					content
				},
				hints: [
					'منتصف قطعة مستقيم يقع في وسطها ويبعد بنفس المسافة عن طرفيها.',
					askFullLength
						? `نجمع طول النصفين المتساويين: $${halfCm} + ${halfCm}$.`
						: `نبحث عن العدد الذي إذا جمعناه مع نفسه يساوي $${totalCm}$.`,
					`النتيجة هي $${targetAns}\\text{ cm}$.`
				],
				solutionStepsAr: [
					`النقطة $${labelSet.mid}$ منتصف $[${labelSet.left}${labelSet.right}]$، إذن $[${labelSet.left}${labelSet.mid}]$ و $[${labelSet.mid}${labelSet.right}]$ لهما نفس الطول.`,
					askFullLength
						? `طول $[${labelSet.left}${labelSet.right}]$ هو $${halfCm} + ${halfCm} = ${totalCm}\\text{ cm}$.`
						: `نصف $${totalCm}\\text{ cm}$ هو $${halfCm}\\text{ cm}$.`
				],
				finalAnswer: `${targetAns} cm`
			};
		}

		// Variant 2: Point alignment (الاستقامية) on grid
		const cols = 6;
		const rows = 4;
		const labels = rng.shuffle(['A', 'B', 'C', 'D', 'E', 'F']).slice(0, 4);
		const alignedLabels = [labels[0], labels[1], labels[2]];
		const outlierLabel = labels[3];

		let alignedCoords: { col: number; row: number }[];
		if (difficulty === 'hard') {
			// Diagonal collinear points on grid intersections
			const diagPattern = cleanSeed % 2 === 0;
			alignedCoords = diagPattern
				? [
						{ col: 1, row: 1 },
						{ col: 2, row: 2 },
						{ col: 3, row: 3 }
					]
				: [
						{ col: 1, row: 3 },
						{ col: 3, row: 2 },
						{ col: 5, row: 1 }
					];
		} else if (cleanSeed % 2 === 0) {
			const r = rng.int(1, 3);
			const cs = rng.pickDistinct([1, 2, 3, 4, 5], 3).sort((x, y) => x - y);
			alignedCoords = cs.map((c) => ({ col: c, row: r }));
		} else {
			const c = rng.int(1, 5);
			alignedCoords = [1, 2, 3].map((r) => ({ col: c, row: r }));
		}

		const isCollinearWithLine = (c: number, r: number): boolean => {
			const [p0, p1] = alignedCoords;
			return (p1.col - p0.col) * (r - p0.row) === (p1.row - p0.row) * (c - p0.col);
		};

		const outlierCandidates: { col: number; row: number }[] = [];
		for (let c = 1; c <= 5; c++) {
			for (let r = 1; r <= 3; r++) {
				if (!isCollinearWithLine(c, r)) {
					outlierCandidates.push({ col: c, row: r });
				}
			}
		}
		const outlierCoord = rng.pick(outlierCandidates);

		const points = [
			{ col: alignedCoords[0].col, row: alignedCoords[0].row, label: alignedLabels[0], color: '#1d4ed8' },
			{ col: alignedCoords[1].col, row: alignedCoords[1].row, label: alignedLabels[1], color: '#1d4ed8' },
			{ col: alignedCoords[2].col, row: alignedCoords[2].row, label: alignedLabels[2], color: '#1d4ed8' },
			{ col: outlierCoord.col, row: outlierCoord.row, label: outlierLabel, color: '#1d4ed8' }
		];

		const svg = svgGridPoints({ cols, rows, points });
		const svgPath = saveSvgAsset(`3ap_t1_align_${difficulty}_s${cleanSeed}`, svg);

		const built = buildUniqueMcqOptions(
			`النقطة $${outlierLabel}$`,
			alignedLabels.map((lbl) => ({
				text: `النقطة $${lbl}$`,
				diagnosticFeedback: `النقطة $${lbl}$ تقع على نفس الخط المستقيم مع النقطتين الأخريين.`
			})),
			rng
		);

		const halfCm = rng.int(4, 9);
		const totalCm = halfCm * 2;
		const alignedDisplay = alignedLabels.join(' و ');

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اذكر النقط الثلاث التي تقع على استقامية واحدة في المرصوفة.',
						answer: `1) النقط التي على استقامية واحدة هي: ${alignedLabels.map((l) => `$${l}$`).join(' ، ')}.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'الاستقامية على المرصوفة'
					}
				]
			},
			{
				type: 'text',
				content: `2) هل النقطة $${outlierLabel}$ على استقامية واحدة مع النقط الثلاث؟ علّل باستعمال المسطرة.`,
				answer: `2) لا، النقطة $${outlierLabel}$ ليست على استقامية معها لأن حافة المسطرة التي تمر بـ ${alignedLabels.map((l) => `$${l}$`).join(' و ')} لا تمر بـ $${outlierLabel}$.`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) ارسم قطعة مستقيم $[M N]$ طولها $${totalCm}$ ${ltrUnit('cm')}، وعيّن منتصفها $O$. عند أي تدريجة تبدأ من $0$ على المسطرة تضع النقطة $O$؟`,
				answer: `3) نضع المنتصف $O$ عند التدريجة $${halfCm}$ ${ltrUnit('cm')} لأن $${halfCm} + ${halfCm} = ${totalCm}$.`,
				mark: '0.5'
			}
		];

		const qText = 'تأمل النقط الأربع المرسومة على المرصوفة. ثلاث نقط تقع على استقامة واحدة، أيّ نقطة **ليست** على استقامية معها؟';
		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'الاستقامية على المرصوفة',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `النقط ${alignedDisplay} يمر بها خط مستقيم واحد، أما النقطة $${outlierLabel}$ فتقع خارجه.`
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ المرصوفة المقابلة واستعمل المسطرة للإجابة:',
				content
			},
			hints: [
				'تكون ثلاث نقط على استقامية واحدة إذا مرّت بها جميعاً حافة المسطرة بخط مستقيم واحد.',
				'تفقّد الخطوط الأفقية أو العمودية أو المائلة بانتظام على المرصوفة.',
				`النقط ${alignedDisplay} تصطف على خط مستقيم واحد، وتبقى نقطة واحدة خارجه.`
			],
			solutionStepsAr: [
				`نضع المسطرة على النقط ${alignedDisplay} فنلاحظ أنها تقع كلها على خط مستقيم واحد.`,
				`النقطة ${outlierLabel} لا تقع على ذلك الخط، إذن ليست على استقامية معها.`
			],
			finalAnswer: outlierLabel
		};
	}
};

// ============================================================================
// 5. Proportionality / Data Organization: Reading Bar Charts (svgBarChart)
// ============================================================================
const templateBarChartsAndTables: ParameterizedTemplate = {
	id: '3ap_t1_bar_charts_and_tables',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'proportionality',
	curriculumLessonId: 'lesson_3ap_t1_bar_charts_and_tables',
	titleAr: 'قراءة التمثيلات البيانية بالأعمدة والجداول واستخراج المعطيات',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 5);

		const contexts = [
			{
				title: 'الهواية المفضلة لتلاميذ المدرسة',
				unitAr: 'تلميذاً',
				labels: ['المطالعة', 'الرسم', 'الرياضة', 'العلوم']
			},
			{
				title: 'عدد الكتب المستعارة خلال أربعة أيام',
				unitAr: 'كتاباً',
				labels: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء']
			},
			{
				title: 'عدد الشجيرات المغروسة في الأقسام',
				unitAr: 'شجيرة',
				labels: ['القسم أ', 'القسم ب', 'القسم ج', 'القسم د']
			},
			{
				title: 'مبيعات مكتبة المدرسة خلال الأسبوع',
				unitAr: 'دفتراً',
				labels: ['كراريس', 'أقلام', 'قصص', 'أغلفة']
			}
		] as const;
		const ctx = rng.pick(contexts);

		const valuePool =
			difficulty === 'easy'
				? [15, 25, 30, 40, 45, 55, 60, 75, 80, 90]
				: difficulty === 'medium'
					? [125, 180, 235, 310, 365, 420, 485, 560, 640, 725]
					: [1150, 1340, 1480, 1620, 1790, 1950, 2140, 2280];

		const pickedVals = rng.pickDistinct(valuePool, 4);
		const bars = ctx.labels.map((label, i) => ({ label, value: pickedVals[i] }));
		const maxBarVal = Math.max(...pickedVals);
		const maxVal = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 850 : Math.ceil((maxBarVal * 1.15) / 100) * 100;

		const svg = svgBarChart(bars, maxVal);
		const svgPath = saveSvgAsset(`3ap_t1_barchart_${difficulty}_s${cleanSeed}`, svg);

		const sorted = [...bars].sort((x, y) => x.value - y.value);
		const smallest = sorted[0];
		const largest = sorted[sorted.length - 1];
		const sumFirstTwo = bars[0].value + bars[1].value;
		const diffMaxMin = largest.value - smallest.value;

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			if (cleanSeed % 2 === 0) {
				const qText = `يمثل المخطط البياني بالأعمدة: **${ctx.title}**. ما هي الفئة التي سجّلت **أكبر عدد**؟`;
				const built = buildUniqueMcqOptions(
					`${largest.label} ($${largest.value}$)`,
					sorted.slice(0, 3).map((b) => ({
						text: `${b.label} ($${b.value}$)`,
						diagnosticFeedback: `قيمة «${b.label}» هي $${b.value}$، وهي أصغر من قيمة «${largest.label}» ($${largest.value}$).`
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `أطول عمود في التمثيل البياني هو عمود «${largest.label}» بقيمة $${largest.value}$.`
				};
				hints = [
					'في التمثيل البياني بالأعمدة، أطول عمود يدل دائماً على أكبر قيمة.',
					'قارن بين الأعداد المكتوبة فوق كل عمود من الأعمدة الأربعة.',
					`أكبر عدد في المخطط هو $${largest.value}$.`
				];
				solutionStepsAr = [
					`نقرأ قيم الأعمدة الأربعة من المخطط: ${bars.map((b) => `${b.label} (${b.value})`).join('، ')}.`,
					`أكبر قيمة هي $${largest.value}$ وتوافق «${largest.label}».`
				];
				finalAnswer = `${largest.label} (${largest.value})`;
			} else {
				const qText = `تأمل التمثيل البياني بالأعمدة (**${ctx.title}**). ما هو **مجموع** القيم في «${bars[0].label}» و «${bars[1].label}» معاً؟`;
				quizQuestion = {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						answer: sumFirstTwo,
						displayTemplate: '= ?',
						variables: [],
						tolerance: 0
					},
					explanation: `من المخطط: قيمة «${bars[0].label}» هي $${bars[0].value}$ وقيمة «${bars[1].label}» هي $${bars[1].value}$، والمجموع $${bars[0].value} + ${bars[1].value} = ${sumFirstTwo}$.`
				};
				hints = [
					`اقرأ العدد المكتوب فوق عمود «${bars[0].label}» ثم فوق عمود «${bars[1].label}».`,
					`اجمع العددين: $${bars[0].value} + ${bars[1].value}$.`,
					`المجموع هو $${sumFirstTwo}$.`
				];
				solutionStepsAr = [
					`قيمة «${bars[0].label}» = $${bars[0].value}$، وقيمة «${bars[1].label}» = $${bars[1].value}$.`,
					`المجموع: $${bars[0].value} + ${bars[1].value} = ${sumFirstTwo}$.`
				];
				finalAnswer = String(sumFirstTwo);
			}
		} else if (difficulty === 'medium') {
			if (cleanSeed % 2 === 0) {
				const qText = `يمثل المخطط البياني بالأعمدة: **${ctx.title}**. ما هو **الفرق** بين أكبر قيمة وأصغر قيمة؟`;
				const mcq = resolveDistinctNumericMcq(
					diffMaxMin,
					[
						{
							val: largest.value + smallest.value,
							diagnosticFeedback: 'جمعت القيمتين بدل حساب الفرق (الطرح) بين أكبر قيمة وأصغر قيمة!'
						},
						{
							val: sorted[2].value - smallest.value,
							diagnosticFeedback: `استعملت ثاني أكبر قيمة ($${sorted[2].value}$) بدل أكبر قيمة ($${largest.value}$).`
						},
						{
							val: subtractNoBorrowDigits(largest.value, smallest.value),
							diagnosticFeedback: 'تحقق من الاستعارة في الطرح العمودي ولا تطرح الأرقام بعكس الترتيب.'
						}
					],
					(v) => `$${formatKatexNum(v)}$`,
					rng,
					'اطرح أصغر قيمة من أكبر قيمة عمودياً مع الانتباه للاستعارة.'
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `أكبر قيمة هي $${largest.value}$ («${largest.label}») وأصغر قيمة هي $${smallest.value}$ («${smallest.label}»). الفرق: $${largest.value} - ${smallest.value} = ${diffMaxMin}$.`
				};
				hints = [
					'حدّد أولاً أطول عمود (أكبر قيمة) وأقصر عمود (أصغر قيمة).',
					`لإيجاد الفرق نستعمل عملية الطرح: $${largest.value} - ${smallest.value}$.`,
					`احسب عمودياً بالاستعارة عند الحاجة.`
				];
				solutionStepsAr = [
					`أكبر قيمة: «${largest.label}» = $${largest.value}$، وأصغر قيمة: «${smallest.label}» = $${smallest.value}$.`,
					`الفرق: $${largest.value} - ${smallest.value} = ${diffMaxMin}$.`
				];
				finalAnswer = String(diffMaxMin);
			} else {
				const qText = `تأمل التمثيل البياني بالأعمدة (**${ctx.title}**). بكم تزيد قيمة «${largest.label}» عن قيمة «${smallest.label}»؟`;
				quizQuestion = {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						answer: diffMaxMin,
						displayTemplate: '= ?',
						variables: [],
						tolerance: 0
					},
					explanation: `نحسب الفرق بالطرح: $${largest.value} - ${smallest.value} = ${diffMaxMin}$.`
				};
				hints = [
					`اقرأ قيمة «${largest.label}» ($${largest.value}$) وقيمة «${smallest.label}» ($${smallest.value}$).`,
					`عبارة «بكم تزيد» تعني حساب الفرق بعملية الطرح.`,
					`احسب عمودياً: $${largest.value} - ${smallest.value}$.`
				];
				solutionStepsAr = [
					`قيمة «${largest.label}» = $${largest.value}$، وقيمة «${smallest.label}» = $${smallest.value}$.`,
					`الزيادة: $${largest.value} - ${smallest.value} = ${diffMaxMin}$.`
				];
				finalAnswer = String(diffMaxMin);
			}
		} else {
			// Hard: 3-bar sum < 9999 or diff between two sums
			if (cleanSeed % 2 === 0) {
				const sumThree = bars[0].value + bars[1].value + bars[2].value;
				const qText = `تأمل التمثيل البياني بالأعمدة (**${ctx.title}**). ما هو **مجموع** القيم الثلاث الأولى: «${bars[0].label}» و «${bars[1].label}» و «${bars[2].label}» معاً؟`;
				const mcq = resolveDistinctNumericMcq(
					sumThree,
					[
						{
							val: sumThree + bars[3].value <= 9999 ? sumThree + bars[3].value : sumFirstTwo,
							diagnosticFeedback: 'جمعت الأعمدة الأربعة كلها (أو عمودين فقط)، بينما السؤال يطلب الأعمدة الثلاثة الأولى.'
						},
						{
							val: Math.max(100, sumThree - 100),
							diagnosticFeedback: 'تحقق من الاحتفاظ في عمود المئات عند جمع الأعداد الثلاثة.'
						},
						{
							val: sumThree + 100 <= 9999 ? sumThree + 100 : sumThree - 200,
							diagnosticFeedback: 'أعد جمع العشرات والمئات والآلاف عمودياً بدقة.'
						}
					],
					(v) => `$${formatKatexNum(v)}$`,
					rng,
					'ضع الأعداد الثلاثة عمودياً واجمع من اليمين مع الاحتفاظ.'
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نجمع القيم الثلاث: $${formatKatexNum(bars[0].value)} + ${formatKatexNum(bars[1].value)} + ${formatKatexNum(bars[2].value)} = ${formatKatexNum(sumThree)}$.`
				};
				hints = [
					'استخرج القيم الثلاث من فوق الأعمدة الثلاثة الأولى فقط.',
					'ضع الأعداد الثلاثة عمودياً بمحاذاة الوحدات والعشرات والمئات والآلاف.',
					`انتبه للاحتفاظ في المئات والآلاف (المجموع مكوّن من $4$ أرقام).`
				];
				solutionStepsAr = [
					`القيم هي: $${formatKatexNum(bars[0].value)}$، $${formatKatexNum(bars[1].value)}$، $${formatKatexNum(bars[2].value)}$.`,
					`المجموع: $${formatKatexNum(bars[0].value)} + ${formatKatexNum(bars[1].value)} + ${formatKatexNum(bars[2].value)} = ${formatKatexNum(sumThree)}$.`
				];
				finalAnswer = formatSpaceAscii(sumThree);
			} else {
				const topTwo = sorted[3].value + sorted[2].value;
				const botTwo = sorted[0].value + sorted[1].value;
				const gap = topTwo - botTwo;
				const qText = `تأمل التمثيل البياني بالأعمدة (**${ctx.title}**). بكم يزيد مجموع أكبر قيمتين («${sorted[3].label}» و «${sorted[2].label}») عن مجموع أصغر قيمتين («${sorted[0].label}» و «${sorted[1].label}»)؟`;
				const mcq = resolveDistinctNumericMcq(
					gap,
					[
						{
							val: topTwo,
							diagnosticFeedback: 'حسبت مجموع أكبر قيمتين فقط ولم تطرح منه مجموع أصغر قيمتين.'
						},
						{
							val: diffMaxMin,
							diagnosticFeedback: 'حسبت الفرق بين أكبر قيمة وأصغر قيمة فقط، وليس بين مجموع أكبر قيمتين ومجموع أصغر قيمتين.'
						},
						{
							val: gap + 100 <= 9999 ? gap + 100 : Math.max(10, gap - 100),
							diagnosticFeedback: 'راجع خطوات الجمع والطرح بالاحتفاظ والاستعارة.'
						}
					],
					(v) => `$${formatKatexNum(v)}$`,
					rng,
					'احسب كل مجموع على حدة ثم اطرح المجموع الأصغر من الأكبر.'
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: ctx.title,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `مجموع أكبر قيمتين $= ${formatKatexNum(topTwo)}$، ومجموع أصغر قيمتين $= ${formatKatexNum(botTwo)}$، والفرق $= ${formatKatexNum(topTwo)} - ${formatKatexNum(botTwo)} = ${formatKatexNum(gap)}$.`
				};
				hints = [
					'هذه المسألة تتطلب ثلاث خطوات: مجموع أكبر قيمتين، ثم مجموع أصغر قيمتين، ثم الطرح.',
					`أكبر قيمتين هما $${formatKatexNum(sorted[3].value)}$ و $${formatKatexNum(sorted[2].value)}$، وأصغرهما $${formatKatexNum(sorted[0].value)}$ و $${formatKatexNum(sorted[1].value)}$.`,
					`اطرح المجموعين: $${formatKatexNum(topTwo)} - ${formatKatexNum(botTwo)}$.`
				];
				solutionStepsAr = [
					`مجموع أكبر قيمتين: $${formatKatexNum(sorted[3].value)} + ${formatKatexNum(sorted[2].value)} = ${formatKatexNum(topTwo)}$.`,
					`مجموع أصغر قيمتين: $${formatKatexNum(sorted[0].value)} + ${formatKatexNum(sorted[1].value)} = ${formatKatexNum(botTwo)}$.`,
					`الفرق: $${formatKatexNum(topTwo)} - ${formatKatexNum(botTwo)} = ${formatKatexNum(gap)}$.`
				];
				finalAnswer = formatSpaceAscii(gap);
			}
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) انقل معطيات التمثيل البياني وأكمل الجدول التالي:`,
						answer: `1) أكبر قيمة: «${largest.label}» ($${formatTypstMathNum(largest.value)}$) ، وأصغر قيمة: «${smallest.label}» ($${formatTypstMathNum(smallest.value)}$).`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: ctx.title
					}
				]
			},
			{
				type: 'table',
				headers: bars.map((b) => b.label),
				cells: [],
				rows: [
					bars.map((b) => ({
						content: '..........',
						answer: `$${formatTypstMathNum(b.value)}$`
					}))
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `2) احسب مجموع القيمتين في «${bars[0].label}» و «${bars[1].label}» معاً:`,
				answer: `2) المجموع: $${formatTypstMathNum(bars[0].value)} + ${formatTypstMathNum(bars[1].value)} = ${formatTypstMathNum(sumFirstTwo)}$ ${ctx.unitAr}.`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) احسب الفرق بين أكبر قيمة («${largest.label}») وأصغر قيمة («${smallest.label}»):`,
				answer: `3) الفرق: $${formatTypstMathNum(largest.value)} - ${formatTypstMathNum(smallest.value)} = ${formatTypstMathNum(diffMaxMin)}$ ${ctx.unitAr}.`,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'proportionality',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: `يمثّل المخطط البياني بالأعمدة المقابل (${ctx.title}). تأمّله جيداً ثم أجب:`,
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 6. Integration Situation: School/Family Purchase or Distance Story (< 10,000)
// ============================================================================
const templateIntegrationT1: ParameterizedTemplate = {
	id: '3ap_t1_integration',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'integration',
	curriculumLessonId: 'lesson_3ap_t1_integration',
	titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية بالأعداد إلى 9 999 والأطوال',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 6);
		const person = rng.pick(CHILDREN);
		const child = person.name;
		const verbHas = person.fem ? 'تملك' : 'يملك';
		const verbBought = person.fem ? 'اشترت' : 'اشترى';
		const pronWith = person.fem ? 'معها' : 'معه';
		const pronWant = person.fem ? 'أرادت' : 'أراد';

		const isPurchaseStory = cleanSeed % 2 === 0;

		if (isPurchaseStory) {
			const itemSets: [string, string, string][] = [
				['محفظةً مدرسيةً', 'مئزراً وكتبَ مطالعةٍ', 'علبةَ أدواتٍ هندسيةٍ'],
				['حذاءً رياضياً', 'بدلةً رياضيةً', 'كرةَ قدمٍ'],
				['معطفاً شتوياً', 'حقيبةً ودفاترَ', 'موسوعةً علميةً']
			];
			const [item1, item2, item3] = rng.pick(itemSets);

			// Generate prices with genuine carry and remaining with genuine borrow, all < 10,000
			const [p1, p2] =
				difficulty === 'easy'
					? pickCarryAddPair(rng, 1150, 2850, 650, 1950, 1, 4900)
					: difficulty === 'medium'
						? pickCarryAddPair(rng, 1450, 3450, 1150, 2650, 2, 6200)
						: pickCarryAddPair(rng, 1865, 3895, 1475, 2985, 3, 6900);
			const totalSpent = p1 + p2;

			// Budget strictly < 10,000 with >= 450 DA remaining and borrow required
			const remCandidates: number[] = [];
			for (let tries = 0; tries < 100; tries++) {
				const b = rng.int(totalSpent + 450, 9650);
				if (countBorrows(b, totalSpent) >= (difficulty === 'easy' ? 1 : 2)) {
					remCandidates.push(b);
					break;
				}
			}
			const budget = remCandidates.length > 0 ? remCandidates[0] : Math.min(9500, totalSpent + 1250);
			const remaining = budget - totalSpent;

			// Third item price for Q3 (medium/hard)
			const canAfford3 = cleanSeed % 4 < 2;
			const p3 = canAfford3
				? Math.max(150, remaining - rng.int(120, Math.max(150, Math.min(650, remaining - 120))))
				: Math.min(9800, remaining + rng.int(180, 650));
			const diff3 = Math.abs(remaining - p3);

			const introKatex = `${verbHas} ${child} مبلغ $${formatKatexNum(budget)}\\text{ DA}$. بمناسبة الدخول المدرسي، ${verbBought} ${item1} بسعر $${formatKatexNum(p1)}\\text{ DA}$ و${item2} بسعر $${formatKatexNum(p2)}\\text{ DA}$.`;
			const introTypst = `${verbHas} ${child} مبلغ ${ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)}. بمناسبة الدخول المدرسي، ${verbBought} ${item1} بسعر ${ltrUnit(`${formatGroupedRtlSafe(p1)} DA`)} و${item2} بسعر ${ltrUnit(`${formatGroupedRtlSafe(p2)} DA`)}.`;

			let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
			let hints: [string, string, string];
			let solutionStepsAr: string[];
			let finalAnswer: string;

			if (difficulty === 'hard') {
				const qText = `${introKatex}\n\nكم ديناراً بقي ${pronWith} بعد دفع ثمن المشتريين؟`;
				const mcq = resolveDistinctNumericMcq(
					remaining,
					[
						{
							val: budget - p1,
							diagnosticFeedback: `طرحت ثمن ${item1} فقط ونسيت طرح ثمن ${item2}!`
						},
						{
							val: totalSpent,
							diagnosticFeedback: 'هذا هو مجموع المصاريف فقط، والمطلوب هو المبلغ المتبقي!'
						},
						{
							val: subtractForgotPayback(budget, totalSpent),
							diagnosticFeedback: 'انتبه لإرجاع الواحد المستعار عند إنجاز الطرح العمودي.'
						}
					],
					(v) => `$${formatKatexNum(v)}\\text{ DA}$`,
					rng,
					'احسب مجموع المشتريات أولاً بالجمع العمودي، ثم اطرحه من المبلغ الأصلي بالاستعارة.'
				);
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `أولاً نجمع المشتريات: $${formatKatexNum(p1)} + ${formatKatexNum(p2)} = ${formatKatexNum(totalSpent)}\\text{ DA}$، ثم نطرح من الميزانية: $${formatKatexNum(budget)} - ${formatKatexNum(totalSpent)} = ${formatKatexNum(remaining)}\\text{ DA}$.`
				};
			} else {
				const qText = `${introKatex} كم ديناراً بقي ${pronWith} بعد الشراء؟`;
				quizQuestion = {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						answer: remaining,
						displayTemplate: '? DA',
						variables: [],
						tolerance: 0
					},
					explanation: `نحسب ثمن المشتريات: $${formatKatexNum(p1)} + ${formatKatexNum(p2)} = ${formatKatexNum(totalSpent)}\\text{ DA}$، ثم الباقي: $${formatKatexNum(budget)} - ${formatKatexNum(totalSpent)} = ${formatKatexNum(remaining)}\\text{ DA}$.`
				};
			}

			hints = [
				'الوضعية تتكوّن من مرحلتين: الجمع أولاً لإيجاد الثمن الإجمالي، ثم الطرح لإيجاد الباقي.',
				`اجمع عمودياً بالاحتفاظ: $${formatKatexNum(p1)} + ${formatKatexNum(p2)} = ${formatKatexNum(totalSpent)}\\text{ DA}$.`,
				`اطرح المجموع من المبلغ الذي كان ${pronWith}: $${formatKatexNum(budget)} - ${formatKatexNum(totalSpent)}$.`
			];
			solutionStepsAr = [
				`ثمن المشتريات معاً: $${formatKatexNum(p1)} + ${formatKatexNum(p2)} = ${formatKatexNum(totalSpent)}\\text{ DA}$.`,
				`المبلغ المتبقي: $${formatKatexNum(budget)} - ${formatKatexNum(totalSpent)} = ${formatKatexNum(remaining)}\\text{ DA}$.`
			];
			finalAnswer = `${formatSpaceAscii(remaining)} DA`;

			const content: ContentBlock[] =
				difficulty === 'easy'
					? [
							{
								type: 'table',
								headers: ['البند', 'المبلغ بالدينار الجزائري'],
								cells: [],
								rows: [
									[`المبلغ المتوفر لدى ${child}`, ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)],
									[`ثمن ${item1}`, ltrUnit(`${formatGroupedRtlSafe(p1)} DA`)],
									[`ثمن ${item2}`, ltrUnit(`${formatGroupedRtlSafe(p2)} DA`)]
								],
								align: 'center',
								borders: 'grid',
								headerBackground: true,
								width: 'full'
							},
							{
								type: 'text',
								content: '1) احسب الثمن الإجمالي للمشتريين معاً (أنجز العملية عمودياً وأفقياً):',
								answer: `1) العملية: $${formatTypstMathNum(p1)} + ${formatTypstMathNum(p2)} = ${formatTypstMathNum(totalSpent)}$ \\ الجواب: الثمن الإجمالي للمشتريين هو ${ltrUnit(`${formatGroupedRtlSafe(totalSpent)} DA`)}.`,
								mark: '2'
							},
							{
								type: 'text',
								content: `2) كم ديناراً بقي ${pronWith} بعد دفع ثمن المشتريين؟`,
								answer: `2) العملية: $${formatTypstMathNum(budget)} - ${formatTypstMathNum(totalSpent)} = ${formatTypstMathNum(remaining)}$ \\ الجواب: بقي ${pronWith} مبلغ ${ltrUnit(`${formatGroupedRtlSafe(remaining)} DA`)}.`,
								mark: '2'
							}
						]
					: [
							{
								type: 'table',
								headers: ['البند', 'المبلغ بالدينار الجزائري'],
								cells: [],
								rows: [
									[`المبلغ المتوفر لدى ${child}`, ltrUnit(`${formatGroupedRtlSafe(budget)} DA`)],
									[`ثمن ${item1}`, ltrUnit(`${formatGroupedRtlSafe(p1)} DA`)],
									[`ثمن ${item2}`, ltrUnit(`${formatGroupedRtlSafe(p2)} DA`)],
									[`ثمن ${item3}`, ltrUnit(`${formatGroupedRtlSafe(p3)} DA`)]
								],
								align: 'center',
								borders: 'grid',
								headerBackground: true,
								width: 'full'
							},
							{
								type: 'text',
								content: '1) احسب الثمن الإجمالي للمشتريين الأول والثاني معاً:',
								answer: `1) العملية: $${formatTypstMathNum(p1)} + ${formatTypstMathNum(p2)} = ${formatTypstMathNum(totalSpent)}$ \\ الجواب: الثمن الإجمالي هو ${ltrUnit(`${formatGroupedRtlSafe(totalSpent)} DA`)}.`,
								mark: '1.5'
							},
							{
								type: 'text',
								content: `2) احسب المبلغ المتبقي ${pronWith} بعد الشراء:`,
								answer: `2) العملية: $${formatTypstMathNum(budget)} - ${formatTypstMathNum(totalSpent)} = ${formatTypstMathNum(remaining)}$ \\ الجواب: بقي ${pronWith} مبلغ ${ltrUnit(`${formatGroupedRtlSafe(remaining)} DA`)}.`,
								mark: '1.5'
							},
							{
								type: 'text',
								content: `3) ${pronWant} ${child} شراء ${item3} بالمبلغ المتبقي. هل يكفي هذا المبلغ؟ وكم ${canAfford3 ? `يبقى ${pronWith}` : `ينقص`}؟`,
								answer: canAfford3
									? `3) بما أن $${formatTypstMathNum(remaining)} > ${formatTypstMathNum(p3)}$، نعم يكفي المبلغ المتبقي، ويبقى ${pronWith}: $${formatTypstMathNum(remaining)} - ${formatTypstMathNum(p3)} = ${formatTypstMathNum(diff3)}$ ${ltrUnit('DA')}.`
									: `3) بما أن $${formatTypstMathNum(remaining)} < ${formatTypstMathNum(p3)}$، لا يكفي المبلغ المتبقي، وينقص: $${formatTypstMathNum(p3)} - ${formatTypstMathNum(remaining)} = ${formatTypstMathNum(diff3)}$ ${ltrUnit('DA')}.`,
								mark: '1'
							}
						];

			return {
				templateId: this.id,
				seed: cleanSeed,
				grade: '3ap',
				trimesterId: 't1',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 4,
					instruction: `${introTypst} اقرأ الجدول والأسئلة ثم أجب بتنظيم:`,
					content
				},
				hints,
				solutionStepsAr,
				finalAnswer
			};
		}

		// Story 2: Distance / School Marathon & Banner Midpoint (< 10,000 m)
		const [d1, d2] =
			difficulty === 'easy'
				? pickCarryAddPair(rng, 1150, 2450, 850, 1850, 1, 4500)
				: difficulty === 'medium'
					? pickCarryAddPair(rng, 1450, 3250, 1150, 2450, 2, 5800)
					: pickCarryAddPair(rng, 1680, 3580, 1475, 2795, 3, 6600);
		const covered = d1 + d2;

		let totalDist = covered + 1450;
		for (let tries = 0; tries < 100; tries++) {
			const cand = rng.int(covered + 650, 9600);
			if (countBorrows(cand, covered) >= (difficulty === 'easy' ? 1 : 2)) {
				totalDist = cand;
				break;
			}
		}
		const remDist = totalDist - covered;

		// Banner segment length in m (even integer 4, 6, 8) converted to cm at midpoint
		const bannerM = rng.pick([4, 6, 8]);
		const halfBannerCm = (bannerM / 2) * 100; // 200, 300, or 400 cm

		const verbPart = person.fem ? 'شاركت' : 'شارك';
		const verbCovered = person.fem ? 'قطعت' : 'قطع';
		const pronCovered = person.fem ? 'قطعتها' : 'قطعها';
		const pronTo = person.fem ? 'لها' : 'له';
		const verbReach = person.fem ? 'لتصل' : 'ليصل';

		const introKatex = `${verbPart} ${child} في سباق مدرسي للمسافات الطويلة مسافته الإجمالية $${formatKatexNum(totalDist)}\\text{ m}$. ${verbCovered} في المرحلة الأولى مسافة $${formatKatexNum(d1)}\\text{ m}$، وفي المرحلة الثانية مسافة $${formatKatexNum(d2)}\\text{ m}$.`;
		const introTypst = `${verbPart} ${child} في سباق مدرسي مسافته الإجمالية ${ltrUnit(`${formatGroupedRtlSafe(totalDist)} m`)}. ${verbCovered} في المرحلة الأولى مسافة ${ltrUnit(`${formatGroupedRtlSafe(d1)} m`)}، وفي المرحلة الثانية مسافة ${ltrUnit(`${formatGroupedRtlSafe(d2)} m`)}.`;

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		if (difficulty === 'hard') {
			const qText = `${introKatex}\n\nكم متراً بقي ${pronTo} لبلوغ خط الوصول؟`;
			const mcq = resolveDistinctNumericMcq(
				remDist,
				[
					{
						val: covered,
						diagnosticFeedback: 'حسبت المسافة المقطوعة فقط! يجب طرحها من المسافة الإجمالية للسباق.'
					},
					{
						val: totalDist - d1,
						diagnosticFeedback: 'طرحت مسافة المرحلة الأولى فقط ونسيت طرح مسافة المرحلة الثانية.'
					},
					{
						val: subtractForgotPayback(totalDist, covered),
						diagnosticFeedback: 'تحقق من الاستعارة والإرجاع في عملية الطرح العمودي.'
					}
				],
				(v) => `$${formatKatexNum(v)}\\text{ m}$`,
				rng,
				'اجمع مسافتي المرحلتين أولاً، ثم اطرح المجموع من المسافة الإجمالية.'
			);
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المسافة المقطوعة $= ${formatKatexNum(d1)} + ${formatKatexNum(d2)} = ${formatKatexNum(covered)}\\text{ m}$، والمسافة المتبقية $= ${formatKatexNum(totalDist)} - ${formatKatexNum(covered)} = ${formatKatexNum(remDist)}\\text{ m}$.`
			};
		} else {
			const qText = `${introKatex} كم متراً بقي ${pronTo} ${verbReach} إلى نهاية السباق؟`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					answer: remDist,
					displayTemplate: '? m',
					variables: [],
					tolerance: 0
				},
				explanation: `نحسب المسافة المقطوعة: $${formatKatexNum(d1)} + ${formatKatexNum(d2)} = ${formatKatexNum(covered)}\\text{ m}$، ثم المتبقية: $${formatKatexNum(totalDist)} - ${formatKatexNum(covered)} = ${formatKatexNum(remDist)}\\text{ m}$.`
			};
		}

		const content: ContentBlock[] =
			difficulty === 'easy'
				? [
						{
							type: 'text',
							content: `1) احسب بالمتر المسافة التي ${pronCovered} في المرحلتين معاً:`,
							answer: `1) العملية: $${formatTypstMathNum(d1)} + ${formatTypstMathNum(d2)} = ${formatTypstMathNum(covered)}$ \\ الجواب: المسافة المقطوعة هي ${ltrUnit(`${formatGroupedRtlSafe(covered)} m`)}.`,
							mark: '2'
						},
						{
							type: 'text',
							content: '2) احسب المسافة المتبقية لبلوغ خط الوصول:',
							answer: `2) العملية: $${formatTypstMathNum(totalDist)} - ${formatTypstMathNum(covered)} = ${formatTypstMathNum(remDist)}$ \\ الجواب: المسافة المتبقية هي ${ltrUnit(`${formatGroupedRtlSafe(remDist)} m`)}.`,
							mark: '2'
						}
					]
				: [
						{
							type: 'text',
							content: '1) احسب بالمتر المسافة المقطوعة في المرحلتين معاً:',
							answer: `1) العملية: $${formatTypstMathNum(d1)} + ${formatTypstMathNum(d2)} = ${formatTypstMathNum(covered)}$ \\ الجواب: المسافة المقطوعة هي ${ltrUnit(`${formatGroupedRtlSafe(covered)} m`)}.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: '2) ما هي المسافة المتبقية لبلوغ خط الوصول؟',
							answer: `2) العملية: $${formatTypstMathNum(totalDist)} - ${formatTypstMathNum(covered)} = ${formatTypstMathNum(remDist)}$ \\ الجواب: المسافة المتبقية هي ${ltrUnit(`${formatGroupedRtlSafe(remDist)} m`)}.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) عند خط الوصول، عُلّقت لافتة مستقيمة $[A B]$ طولها $${bannerM}$ ${ltrUnit('m')}، ووُضع علم في منتصفها $M$. كم يبعد العلم $M$ عن البداية $A$ بالسنتيمتر (${ltrUnit('cm')})؟`,
							answer: `3) نصف $${bannerM}$ ${ltrUnit('m')} هو $${bannerM / 2}$ ${ltrUnit('m')}، وبالتحويل إلى السنتيمتر: $${bannerM / 2} times 100 = ${halfBannerCm}$ ${ltrUnit('cm')}.`,
							mark: '1'
						}
					];

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: `${introTypst} اقرأ النص جيداً ثم أجب عن الأسئلة مع كتابة العمليات وجملة الإجابة:`,
				content
			},
			hints: [
				'الوضعية تتكوّن من مرحلتين: نجمع أولاً مسافتي المرحلتين الأولى والثانية.',
				`نحسب المجموع بالجمع العمودي: $${formatKatexNum(d1)} + ${formatKatexNum(d2)} = ${formatKatexNum(covered)}\\text{ m}$.`,
				`نطرح المجموع من المسافة الإجمالية: $${formatKatexNum(totalDist)} - ${formatKatexNum(covered)}$.`
			],
			solutionStepsAr: [
				`المسافة المقطوعة في المرحلتين: $${formatKatexNum(d1)} + ${formatKatexNum(d2)} = ${formatKatexNum(covered)}\\text{ m}$.`,
				`المسافة المتبقية لخط الوصول: $${formatKatexNum(totalDist)} - ${formatKatexNum(covered)} = ${formatKatexNum(remDist)}\\text{ m}$.`
			],
			finalAnswer: `${formatSpaceAscii(remDist)} m`
		};
	}
};

export const TEMPLATES_3AP_T1: ParameterizedTemplate[] = [
	templateNumbersTo9999,
	templateAddSubVertical,
	templateLengthsMCmMm,
	templateGeometryT1,
	templateBarChartsAndTables,
	templateIntegrationT1
];
