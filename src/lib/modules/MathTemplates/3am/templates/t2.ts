import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset, svgTriangle } from '../../svg-helpers';

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 17,
	medium: 31,
	hard: 53
};

function makeRng(seed: number, difficulty: Difficulty, templateSalt: number): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 1009 + templateSalt * 193 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

function fmtNum(n: number, decimals = 3): string {
	return String(roundTo(n, decimals));
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

/** Formats `intVal * 10^p` cleanly as an exact decimal string without IEEE-754 drift. */
function formatExactPow10Decimal(intVal: number, p: number): string {
	let s = String(Math.abs(Math.trunc(intVal)));
	let exp = p;
	while (s.endsWith('0') && s.length > 1) {
		s = s.slice(0, -1);
		exp++;
	}
	if (exp >= 0) {
		return s + '0'.repeat(exp);
	}
	const k = -exp;
	if (k < s.length) {
		return `${s.slice(0, s.length - k)}.${s.slice(s.length - k)}`;
	}
	return `0.${'0'.repeat(k - s.length)}${s}`;
}

/** Returns exact scientific notation parts for positive `intVal * 10^p`. */
function scientificParts(
	intVal: number,
	p: number
): {
	aStr: string;
	aNum: number;
	exp: number;
	roundedUnit: number;
} {
	let s = String(Math.abs(Math.trunc(intVal)));
	let exp = p;
	while (s.endsWith('0') && s.length > 1) {
		s = s.slice(0, -1);
		exp++;
	}
	const aStr = s.length === 1 ? s : `${s[0]}.${s.slice(1)}`;
	const sciExp = exp + (s.length - 1);
	const aNum = Number(aStr);
	const roundedUnit = Math.round(aNum);
	return { aStr, aNum, exp: sciExp, roundedUnit };
}

function formatSciKatex(aStr: string, exp: number): string {
	return `${aStr} \\times 10^{${exp}}`;
}

function formatSciTypst(aStr: string, exp: number): string {
	return exp < 0 ? `${aStr} times 10^(${exp})` : `${aStr} times 10^${exp}`;
}

function formatPowTypst(base: number, exp: number): string {
	const bStr = base < 0 ? `(${base})` : `${base}`;
	return exp < 0 ? `${bStr}^(${exp})` : `${bStr}^${exp}`;
}

function formatFracTypst(num: number, den: number): string {
	if (den === 1) return `${num}`;
	if (num < 0) return `-frac(${Math.abs(num)}, ${den})`;
	return `frac(${num}, ${den})`;
}

/** Formats `a*x + b` inside parentheses cleanly. */
function formatBinomial(a: number, b: number, typst = false): string {
	const sp = typst ? ' ' : '';
	const xPart = a === 1 ? 'x' : a === -1 ? '-x' : `${a}${sp}x`;
	const bPart = b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
	return `(${xPart}${bPart})`;
}

/** Formats `a2*x^2 + a1*x + a0` cleanly for KaTeX or Typst. */
function formatPoly(a2: number, a1: number, a0: number, typst = false): string {
	const sp = typst ? ' ' : '';
	const terms: string[] = [];
	if (a2 !== 0) {
		const coeff = a2 === 1 ? '' : a2 === -1 ? '-' : `${a2}${sp}`;
		terms.push(`${coeff}x^2`);
	}
	if (a1 !== 0) {
		const abs1 = Math.abs(a1);
		const coeff = abs1 === 1 ? '' : `${abs1}${sp}`;
		if (terms.length === 0) {
			terms.push(a1 < 0 ? `-${coeff}x` : `${coeff}x`);
		} else {
			terms.push(a1 > 0 ? ` + ${coeff}x` : ` - ${coeff}x`);
		}
	}
	if (a0 !== 0) {
		if (terms.length === 0) {
			terms.push(`${a0}`);
		} else {
			terms.push(a0 > 0 ? ` + ${a0}` : ` - ${Math.abs(a0)}`);
		}
	}
	return terms.length > 0 ? terms.join('') : '0';
}

function formatSigned(n: number): string {
	return n >= 0 ? `+${n}` : `${n}`;
}

function formatParenNum(n: number): string {
	return n < 0 ? `(${n})` : `${n}`;
}

// ---------------------------------------------------------------------------
// Custom SVG Generator 1: Circumcircle + Median [AO] OR Tangent (d) at T
// ---------------------------------------------------------------------------
function svgCircumcircleMedianTangent(opts: {
	mode: 'median' | 'tangent';
	labels?: [string, string, string];
	midLabel?: string;
	hypLabel?: string;
	medLabel?: string;
	radiusLabel?: string;
	angleAlpha?: number;
}): string {
	const w = 270;
	const h = 190;
	const parts: string[] = [];

	if (opts.mode === 'median') {
		const lbl = opts.labels || ['E', 'F', 'G'];
		const M = opts.midLabel || 'M';
		// Diameter FG horizontal on circle centered at O(135, 118), r=66
		const Ox = 135;
		const Oy = 118;
		const r = 66;
		const F = { x: Ox - r, y: Oy }; // (69, 118)
		const G = { x: Ox + r, y: Oy }; // (201, 118)
		// E on upper circle at 125 deg from +x axis
		const ang = (125 * Math.PI) / 180;
		const E = { x: Ox + r * Math.cos(ang), y: Oy - r * Math.sin(ang) };

		// Unit vectors for right angle square at E
		const uEF = {
			x: (F.x - E.x) / Math.hypot(F.x - E.x, F.y - E.y),
			y: (F.y - E.y) / Math.hypot(F.x - E.x, F.y - E.y)
		};
		const uEG = {
			x: (G.x - E.x) / Math.hypot(G.x - E.x, G.y - E.y),
			y: (G.y - E.y) / Math.hypot(G.x - E.x, G.y - E.y)
		};
		const s = 10;
		const p1 = { x: E.x + s * uEF.x, y: E.y + s * uEF.y };
		const p2 = { x: p1.x + s * uEG.x, y: p1.y + s * uEG.y };
		const p3 = { x: E.x + s * uEG.x, y: E.y + s * uEG.y };

		parts.push(
			`<circle cx="${Ox}" cy="${Oy}" r="${r}" fill="none" stroke="#3b82f6" stroke-dasharray="4 3" stroke-width="1.6"/>`,
			`<polygon points="${E.x.toFixed(1)},${E.y.toFixed(1)} ${F.x},${F.y} ${G.x},${G.y}" fill="#eff6ff" fill-opacity="0.65" stroke="#0f172a" stroke-width="2"/>`,
			`<line x1="${E.x.toFixed(1)}" y1="${E.y.toFixed(1)}" x2="${Ox}" y2="${Oy}" stroke="#dc2626" stroke-width="2"/>`,
			`<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="#0f172a" stroke-width="1.4"/>`,
			// Equal length tick marks on FM, MG, EM
			`<line x1="${Ox - 34}" y1="${Oy - 4}" x2="${Ox - 30}" y2="${Oy + 4}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<line x1="${Ox + 30}" y1="${Oy - 4}" x2="${Ox + 34}" y2="${Oy + 4}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<line x1="${(E.x + Ox) / 2 - 4}" y1="${(E.y + Oy) / 2 + 2}" x2="${(E.x + Ox) / 2 + 4}" y2="${(E.y + Oy) / 2 - 2}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<circle cx="${Ox}" cy="${Oy}" r="3.5" fill="#dc2626"/>`,
			`<circle cx="${E.x.toFixed(1)}" cy="${E.y.toFixed(1)}" r="3.2" fill="#0f172a"/>`,
			`<circle cx="${F.x}" cy="${F.y}" r="3.2" fill="#0f172a"/>`,
			`<circle cx="${G.x}" cy="${G.y}" r="3.2" fill="#0f172a"/>`,
			`<text x="${(E.x - 10).toFixed(1)}" y="${(E.y - 8).toFixed(1)}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[0])}</text>`,
			`<text x="${F.x - 16}" y="${F.y + 6}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[1])}</text>`,
			`<text x="${G.x + 8}" y="${G.y + 6}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[2])}</text>`,
			`<text x="${Ox - 4}" y="${Oy + 16}" font-size="12.5" font-weight="bold" fill="#dc2626">${escapeXml(M)}</text>`
		);
		if (opts.medLabel) {
			parts.push(
				`<text x="${((E.x + Ox) / 2 + 12).toFixed(1)}" y="${((E.y + Oy) / 2 - 4).toFixed(1)}" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.medLabel)}</text>`
			);
		}
		if (opts.hypLabel) {
			parts.push(
				`<text x="${Ox}" y="${Oy + 34}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">${escapeXml(opts.hypLabel)}</text>`
			);
		}
	} else {
		// Tangent mode: circle center O(105, 112), r=52, contact point T(105, 60), point S(210, 60) on line (d)
		const Ox = 105;
		const Oy = 112;
		const r = 52;
		const Tx = Ox;
		const Ty = Oy - r; // 60
		const Sx = 208;
		const Sy = Ty;
		parts.push(
			`<circle cx="${Ox}" cy="${Oy}" r="${r}" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>`,
			`<line x1="28" y1="${Ty}" x2="246" y2="${Ty}" stroke="#dc2626" stroke-width="2.2"/>`,
			`<polygon points="${Ox},${Oy} ${Tx},${Ty} ${Sx},${Sy}" fill="none" stroke="#0f172a" stroke-width="1.9"/>`,
			`<polyline points="${Tx},${Ty + 10} ${Tx + 10},${Ty + 10} ${Tx + 10},${Ty}" fill="none" stroke="#0f172a" stroke-width="1.5"/>`,
			// Angle arc at S
			`<path d="M ${Sx - 26} ${Sy} A 26 26 0 0 0 ${Sx - 23} ${Sy + 12}" fill="none" stroke="#2563eb" stroke-width="2"/>`,
			`<circle cx="${Ox}" cy="${Oy}" r="3.5" fill="#0f172a"/>`,
			`<circle cx="${Tx}" cy="${Ty}" r="3.5" fill="#dc2626"/>`,
			`<circle cx="${Sx}" cy="${Sy}" r="3.5" fill="#0f172a"/>`,
			`<text x="${Ox - 15}" y="${Oy + 6}" font-size="13" font-weight="bold" fill="#0f172a">O</text>`,
			`<text x="${Tx - 4}" y="${Ty - 10}" font-size="13" font-weight="bold" fill="#dc2626">T</text>`,
			`<text x="${Sx + 6}" y="${Sy - 10}" font-size="13" font-weight="bold" fill="#0f172a">S</text>`,
			`<text x="248" y="${Sy + 4}" font-size="12" font-weight="bold" fill="#dc2626">(d)</text>`
		);
		if (opts.radiusLabel) {
			parts.push(
				`<text x="${Ox - 32}" y="${(Oy + Ty) / 2 + 4}" font-size="11" font-weight="bold" fill="#15803d">${escapeXml(opts.radiusLabel)}</text>`
			);
		}
		if (opts.angleAlpha !== undefined) {
			parts.push(
				`<text x="${Sx - 48}" y="${Sy + 17}" font-size="11" font-weight="bold" fill="#2563eb">${opts.angleAlpha}°</text>`
			);
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ---------------------------------------------------------------------------
// Custom SVG Generator 2: Integration Ramp/Ladder + Literal Rectangular Courtyard
// ---------------------------------------------------------------------------
function svgRampAndCourtyard(opts: {
	abLabel: string;
	acLabel: string;
	bcLabel: string;
	angleBLabel: string;
	lenExpr: string;
	widExpr: string;
}): string {
	const w = 460;
	const h = 185;
	const A = { x: 52, y: 146 };
	const C = { x: 52, y: 44 };
	const B = { x: 196, y: 146 };
	const O = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };

	const parts = [
		// Panel 1: Ramp/Ladder right triangle ABC
		`<rect x="6" y="8" width="218" height="169" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`,
		`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="#eff6ff" stroke="#0f172a" stroke-width="2"/>`,
		`<polyline points="${A.x},${A.y - 11} ${A.x + 11},${A.y - 11} ${A.x + 11},${A.y}" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<line x1="${A.x}" y1="${A.y}" x2="${O.x.toFixed(1)}" y2="${O.y.toFixed(1)}" stroke="#dc2626" stroke-dasharray="4 3" stroke-width="1.6"/>`,
		`<path d="M ${B.x - 28} ${B.y} A 28 28 0 0 0 ${B.x - 23} ${B.y - 16}" fill="none" stroke="#2563eb" stroke-width="2"/>`,
		`<circle cx="${O.x.toFixed(1)}" cy="${O.y.toFixed(1)}" r="3.2" fill="#dc2626"/>`,
		`<text x="${A.x - 14}" y="${A.y + 8}" font-size="12" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${B.x + 6}" y="${B.y + 8}" font-size="12" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${C.x - 14}" y="${C.y + 4}" font-size="12" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${O.x + 8}" y="${O.y - 4}" font-size="11.5" font-weight="bold" fill="#dc2626">O</text>`,
		`<text x="${(A.x + B.x) / 2}" y="${A.y + 19}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${escapeXml(opts.abLabel)}</text>`,
		`<text x="${A.x - 10}" y="${(A.y + C.y) / 2 + 4}" text-anchor="end" font-size="11" font-weight="bold" fill="#1e293b">${escapeXml(opts.acLabel)}</text>`,
		`<text x="${O.x + 18}" y="${O.y - 18}" font-size="11" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.bcLabel)}</text>`,
		`<text x="${B.x - 42}" y="${B.y - 8}" font-size="10.5" font-weight="bold" fill="#2563eb">${escapeXml(opts.angleBLabel)}</text>`,

		// Panel 2: Rectangular Courtyard EFGH with literal dimensions
		`<rect x="236" y="8" width="218" height="169" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`,
		`<rect x="262" y="42" width="136" height="84" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>`,
		`<rect x="262" y="42" width="9" height="9" fill="none" stroke="#dc2626" stroke-width="1.3"/>`,
		`<text x="252" y="37" font-size="12" font-weight="bold" fill="#0f172a">E</text>`,
		`<text x="403" y="37" font-size="12" font-weight="bold" fill="#0f172a">F</text>`,
		`<text x="403" y="136" font-size="12" font-weight="bold" fill="#0f172a">G</text>`,
		`<text x="252" y="136" font-size="12" font-weight="bold" fill="#0f172a">H</text>`,
		`<text x="330" y="148" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">${escapeXml(opts.lenExpr)}</text>`,
		`<text x="424" y="88" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">${escapeXml(opts.widExpr)}</text>`
	];

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ---------------------------------------------------------------------------
// Template 1: Scientific Notation, Framing, Order of Magnitude & Powers of Rationals
// ---------------------------------------------------------------------------
const tmpl1ScientificNotationPowers: ParameterizedTemplate = {
	id: '3am_t2_scientific_notation_powers',
	grade: '3am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الكتابة العلمية، الحصر، رتبة مقدار وقوى عدد نسبي',
	curriculumLessonId: 'lesson_3am_t2_scientific_notation_magnitude',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 1);

		// Unambiguous mantissas: d0 in 1..8, d1 != 5, d2 in 1..9
		const d0 = rng.int(1, 8);
		const d1 = rng.pick([1, 2, 3, 4, 6, 7, 8, 9]);
		const d2 = rng.int(1, 9);
		const intMant = d0 * 100 + d1 * 10 + d2;
		const sciA = scientificParts(intMant, 0);

		const posExp = rng.int(4, 6);
		const negExp = -rng.int(3, 5);
		const bigDecimalStr = formatExactPow10Decimal(intMant, posExp - 2);
		const smallDecimalStr = formatExactPow10Decimal(intMant, negExp - 2);
		const sciBig = scientificParts(intMant, posExp - 2);
		const sciSmall = scientificParts(intMant, negExp - 2);

		// Shifted form c * 10^m for medium
		const shift = rng.pick([-2, -1, 1, 2]);
		const outerM = rng.pick([-5, -4, 3, 4, 5]);
		const shiftedCStr = formatExactPow10Decimal(intMant, shift - 2);
		const shiftedFinalExp = outerM + shift;

		// Powers part parameters
		const pBase = rng.pick([2, 3, 4, 5]);
		const qBase = rng.pick([2, 3]);
		const qPow = rng.pick([2, 3, 4]);
		const kMul = rng.int(2, 4);
		const kAdd = rng.int(4, 15);
		const signPowVal = qPow % 2 === 0 ? Math.pow(qBase, qPow) : -Math.pow(qBase, qPow);
		const easyPowExprVal = -Math.pow(pBase, 2) + signPowVal;
		const medPowExprVal = kAdd + kMul * -Math.pow(qBase, 3) - Math.pow(pBase, 2);

		// Negative exponent fraction (p/q)^-2
		const fracPairs: readonly [number, number][] = [
			[2, 3],
			[2, 5],
			[3, 4],
			[3, 5],
			[4, 5]
		];
		const [fp, fq] = rng.pick(fracPairs);
		const invNum = fq * fq;
		const invDen = fp * fp;

		// Simplification of a^e1 * a^e2 / (a^e3)^e4
		const ruleBase = rng.pick([2, 3, 5, 7]);
		let e1 = rng.int(4, 7);
		const e2 = -rng.int(1, 3);
		const e3 = rng.int(2, 3);
		const e4 = rng.int(2, 3);
		if (e1 + e2 === e3 * e4) e1 += 1;
		const eTop = e1 + e2;
		const eBot = e3 * e4;
		const eRes = eTop - eBot;

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const useSmall = cleanSeed % 2 === 0;
			const targetStr = useSmall ? smallDecimalStr : bigDecimalStr;
			const targetSci = useSmall ? sciSmall : sciBig;
			const correctOpt = `$${formatSciKatex(targetSci.aStr, targetSci.exp)}$ ورتبة مقداره $${targetSci.roundedUnit} \\times 10^{${targetSci.exp}}$`;
			const wrongExp = useSmall ? -targetSci.exp : targetSci.exp - 1;
			const wrongShiftExp = targetSci.exp - 1;
			const wrongMant = `${d0}${d1}.${d2}`;

			const mcqBuilt = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: `$${formatSciKatex(wrongMant, wrongShiftExp)}$ ورتبة مقداره $${d0}${d1} \\times 10^{${wrongShiftExp}}$`,
						diagnosticFeedback:
							'في الكتابة العلمية $a \\times 10^{n}$ يجب أن يحقق العدد $a$ الشرط $1 \\le a < 10$ (رقم واحد غير معدوم قبل الفاصلة).'
					},
					{
						text: `$${formatSciKatex(targetSci.aStr, wrongExp)}$ ورتبة مقداره $${targetSci.roundedUnit} \\times 10^{${wrongExp}}$`,
						diagnosticFeedback:
							'تحقق من إشارة وقيمة الأس $n$: إزاحة الفاصلة يميناً تعطي أساً سالباً وإزاحتها يساراً تعطي أساً موجباً.'
					},
					{
						text: `$${formatSciKatex(targetSci.aStr, targetSci.exp)}$ ورتبة مقداره $${d1 < 5 ? d0 + 1 : d0} \\times 10^{${targetSci.exp}}$`,
						diagnosticFeedback:
							'الكتابة العلمية صحيحة، لكن راجع التدوير إلى الوحدة لإيجاد رتبة المقدار.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `ما الكتابة العلمية ورتبة مقدار العدد $A = ${targetStr}$؟`,
				questionTextAr: `ما الكتابة العلمية ورتبة مقدار العدد $A = ${targetStr}$؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نزيح الفاصلة لنحصل على $${targetSci.aStr}$ فنجد $A = ${formatSciKatex(targetSci.aStr, targetSci.exp)}$، ومدوّر $${targetSci.aStr}$ إلى الوحدة هو $${targetSci.roundedUnit}$، إذن رتبة المقدار هي $${targetSci.roundedUnit} \\times 10^{${targetSci.exp}}$.`
			};

			hints = [
				'الكتابة العلمية تكتب على الشكل $a \\times 10^{n}$ حيث $1 \\le a < 10$.',
				useSmall
					? 'عدّ المراتب التي تزيح بها الفاصلة نحو اليمين لتحصل على الأس السالب.'
					: 'عدّ المراتب التي تزيح بها الفاصلة نحو اليسار لتحصل على الأس الموجب.',
				`دوّر العدد $${targetSci.aStr}$ إلى أقرب عدد صحيح لتعيين رتبة المقدار.`
			];

			solutionStepsAr = [
				`الكتابة العلمية: $A = ${formatSciKatex(targetSci.aStr, targetSci.exp)}$.`,
				`الحصر بين قوتين متتاليتين للعدد $10$: $10^{${targetSci.exp}} < A < 10^{${targetSci.exp + 1}}$.`,
				`مدوّر $${targetSci.aStr}$ إلى الوحدة هو $${targetSci.roundedUnit}$، إذن رتبة مقدار $A$ هي $${targetSci.roundedUnit} \\times 10^{${targetSci.exp}}$.`,
				`حساب القوة: $-${pBase}^{2} + (-${qBase})^{${qPow}} = -${pBase * pBase} + (${signPowVal}) = ${easyPowExprVal}$.`
			];

			finalAnswer = `${targetSci.aStr} × 10^${targetSci.exp}`;

			content = [
				{
					type: 'text',
					content: `1) أعط الكتابة العلمية للعددين: $A = ${bigDecimalStr}$ و $B = ${smallDecimalStr}$، ثم احصر كلاًّ منهما بين قوتين متتاليتين للعدد $10$.`,
					answer: `1) $A = ${formatSciTypst(sciBig.aStr, sciBig.exp)}$ والحصر: $10^${sciBig.exp} < A < 10^${sciBig.exp + 1}$.\n\n$B = ${formatSciTypst(sciSmall.aStr, sciSmall.exp)}$ والحصر: $10^(${sciSmall.exp}) < B < 10^(${sciSmall.exp + 1})$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) استنتج رتبة مقدار كل من $A$ و $B$.`,
					answer: `2) رتبة مقدار $A$ هي $${sciBig.roundedUnit} times 10^${sciBig.exp}$، ورتبة مقدار $B$ هي $${sciSmall.roundedUnit} times 10^(${sciSmall.exp})$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) احسب بتمعّن العدد $C = -${pBase}^2 + (-${qBase})^${qPow}$، ثم اكتب $D = ${ruleBase}^${e1} times ${ruleBase}^(${e2})$ على شكل قوة واحدة للعدد $${ruleBase}$.`,
					answer: `3) $C = -${pBase * pBase} + (${signPowVal}) = ${easyPowExprVal}$، و $D = ${ruleBase}^(${e1} + (${e2})) = ${ruleBase}^${eTop}$.`,
					mark: '1'
				}
			];
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `احسب بتمعّن نتيجة سلسلة العمليات التالية مع احترام أولوية القوى:\n\n$$D = ${kAdd} + ${kMul} \\times (-${qBase})^{3} - ${pBase}^{2}$$`,
				questionTextAr: `احسب نتيجة العبارة: $D = ${kAdd} + ${kMul} \\times (-${qBase})^{3} - ${pBase}^{2}$`,
				questionData: {
					answer: medPowExprVal,
					displayTemplate: 'D = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحسب القوى أولاً: $(- ${qBase})^{3} = -${Math.pow(qBase, 3)}$ و $${pBase}^{2} = ${pBase * pBase}$، ثم الضرب: $${kMul} \\times (-${Math.pow(qBase, 3)}) = ${kMul * -Math.pow(qBase, 3)}$، وأخيراً $D = ${kAdd} + (${kMul * -Math.pow(qBase, 3)}) - ${pBase * pBase} = ${medPowExprVal}$.`
			};

			hints = [
				'في سلسلة عمليات تتضمن قوى، الأولوية لحساب القوى قبل الضرب والجمع والطرح.',
				`احسب أولاً $(-${qBase})^{3} = -${Math.pow(qBase, 3)}$ (الأس فردي فالناتج سالب) و $${pBase}^{2} = ${pBase * pBase}$.`,
				`اضرب $${kMul} \\times (-${Math.pow(qBase, 3)})$ ثم أتمم الجمع والطرح من اليسار إلى اليمين.`
			];

			solutionStepsAr = [
				`الكتابة العلمية: $A = ${shiftedCStr} \\times 10^{${outerM}} = ${formatSciKatex(sciA.aStr, shift)} \\times 10^{${outerM}} = ${formatSciKatex(sciA.aStr, shiftedFinalExp)}$.`,
				`حساب القوى في $D$: $(-${qBase})^{3} = -${Math.pow(qBase, 3)}$ و $${pBase}^{2} = ${pBase * pBase}$.`,
				`تطبيق الأولوية: $D = ${kAdd} + ${kMul} \\times (-${Math.pow(qBase, 3)}) - ${pBase * pBase} = ${kAdd} - ${kMul * Math.pow(qBase, 3)} - ${pBase * pBase} = ${medPowExprVal}$.`
			];

			finalAnswer = String(medPowExprVal);

			content = [
				{
					type: 'text',
					content: `1) اكتب العدد $A = ${shiftedCStr} times ${formatPowTypst(10, outerM)}$ كتابة علمية، ثم احصره بين قوتين متتاليتين للعدد $10$ وأوجد رتبة مقداره.`,
					answer: `1) $A = ${formatSciTypst(sciA.aStr, shift)} times ${formatPowTypst(10, outerM)} = ${formatSciTypst(sciA.aStr, shiftedFinalExp)}$.\n\nالحصر: $${formatPowTypst(10, shiftedFinalExp)} < A < ${formatPowTypst(10, shiftedFinalExp + 1)}$، ورتبة مقداره $${sciA.roundedUnit} times ${formatPowTypst(10, shiftedFinalExp)}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب بتمعّن العبارة $D = ${kAdd} + ${kMul} times (-${qBase})^3 - ${pBase}^2$.`,
					answer: `2) $D = ${kAdd} + ${kMul} times (-${Math.pow(qBase, 3)}) - ${pBase * pBase} = ${kAdd} - ${kMul * Math.pow(qBase, 3)} - ${pBase * pBase} = ${medPowExprVal}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) اكتب العبارة $E = frac(${ruleBase}^${e1} times ${ruleBase}^(${e2}), (${ruleBase}^${e3})^${e4})$ على شكل قوة واحدة للعدد $${ruleBase}$، ثم احسب قيمة $(frac(${fp}, ${fq}))^(-2)$.`,
					answer: `3) $E = frac(${ruleBase}^${eTop}, ${ruleBase}^${eBot}) = ${formatPowTypst(ruleBase, eRes)}$، و $(frac(${fp}, ${fq}))^(-2) = (frac(${fq}, ${fp}))^2 = frac(${invNum}, ${invDen})$.`,
					mark: '1'
				}
			];
		} else {
			// Hard: Quotient scientific notation where rawCoeff >= 10 -> must normalize + negative denominator exponent
			const hardPool: readonly {
				f1: string;
				f2: string;
				f3: string;
				rawStr: string;
				aStr: string;
				rounded: number;
			}[] = [
				{ f1: '7.2', f2: '6', f3: '2', rawStr: '21.6', aStr: '2.16', rounded: 2 },
				{ f1: '8.4', f2: '8', f3: '2', rawStr: '33.6', aStr: '3.36', rounded: 3 },
				{ f1: '9.6', f2: '4', f3: '2', rawStr: '19.2', aStr: '1.92', rounded: 2 },
				{ f1: '6.4', f2: '6', f3: '1', rawStr: '38.4', aStr: '3.84', rounded: 4 },
				{ f1: '8.4', f2: '8', f3: '5', rawStr: '13.44', aStr: '1.344', rounded: 1 },
				{ f1: '9.6', f2: '7', f3: '5', rawStr: '13.44', aStr: '1.344', rounded: 1 },
				{ f1: '6.8', f2: '5', f3: '2', rawStr: '17', aStr: '1.7', rounded: 2 },
				{ f1: '8.8', f2: '6', f3: '2', rawStr: '26.4', aStr: '2.64', rounded: 3 }
			];
			const chosen = rng.pick(hardPool);
			const p1 = rng.int(3, 6);
			const p2 = -rng.int(6, 9);
			const p3 = -rng.int(2, 4);
			const rawExp = p1 + p2 - p3; // negative!
			const finalExp = rawExp + 1;

			const correctOpt = `الكتابة العلمية $${formatSciKatex(chosen.aStr, finalExp)}$ ورتبة المقدار $${chosen.rounded} \\times 10^{${finalExp}}$`;
			const wrongSubExp = p1 + p2 + p3 + 1;
			const mcqBuilt = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: `الكتابة العلمية $${formatSciKatex(chosen.rawStr, rawExp)}$ ورتبة المقدار $${Math.round(Number(chosen.rawStr))} \\times 10^{${rawExp}}$`,
						diagnosticFeedback: `العدد $${chosen.rawStr}$ أكبر من $10$، يجب إزاحة الفاصلة يساراً لتصبح $${chosen.aStr} \\times 10^{1}$ قبل جمع الأسس.`
					},
					{
						text: `الكتابة العلمية $${formatSciKatex(chosen.aStr, wrongSubExp)}$ ورتبة المقدار $${chosen.rounded} \\times 10^{${wrongSubExp}}$`,
						diagnosticFeedback: `انتبه لقسمة القوى: نطرح أس المقام السالب $({${p1 + p2}}) - (${p3}) = ${rawExp}$ وليس الجمع!`
					},
					{
						text: `الكتابة العلمية $${formatSciKatex(chosen.aStr, rawExp - 1)}$ ورتبة المقدار $${chosen.rounded} \\times 10^{${rawExp - 1}}$`,
						diagnosticFeedback: `بما أن $${chosen.rawStr} = ${chosen.aStr} \\times 10^{1}$، نضيف $+1$ إلى الأس $${rawExp}$ لنحصل على $${finalExp}$.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `أعط الكتابة العلمية ورتبة مقدار العدد:\n\n$$K = \\frac{${chosen.f1} \\times 10^{${p1}} \\times ${chosen.f2} \\times 10^{${p2}}}{${chosen.f3} \\times 10^{${p3}}}$$`,
				questionTextAr: `ما الكتابة العلمية ورتبة مقدار العدد $K = \\frac{${chosen.f1} \\times 10^{${p1}} \\times ${chosen.f2} \\times 10^{${p2}}}{${chosen.f3} \\times 10^{${p3}}}$؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نعزل الأعداد عن قوى $10$: $\\frac{${chosen.f1} \\times ${chosen.f2}}{${chosen.f3}} = ${chosen.rawStr} = ${chosen.aStr} \\times 10^{1}$، والأس هو $(${p1} + (${p2})) - (${p3}) + 1 = ${finalExp}$. ومنه $K = ${formatSciKatex(chosen.aStr, finalExp)}$ ورتبة مقداره $${chosen.rounded} \\times 10^{${finalExp}}$.`
			};

			hints = [
				'افصل الأعداد العشرية في كسر وقوى العدد $10$ في كسر آخر.',
				`استعمل قاعدة قسمة قوتين للعدد $10$: $\\frac{10^{m}}{10^{p}} = 10^{m - p}$ مع الانتباه للإشارة السالبة في المقام.`,
				`بعد إيجاد $${chosen.rawStr} \\times 10^{${rawExp}}$، اكتب $${chosen.rawStr}$ على الشكل $${chosen.aStr} \\times 10^{1}$ ثم أضف $1$ للأس.`
			];

			solutionStepsAr = [
				`حساب الجزء العددي: $\\frac{${chosen.f1} \\times ${chosen.f2}}{${chosen.f3}} = ${chosen.rawStr}$.`,
				`تبسيط قوى $10$: $\\frac{10^{${p1}} \\times 10^{${p2}}}{10^{${p3}}} = 10^{${p1 + p2} - (${p3})} = 10^{${rawExp}}$.`,
				`الكتابة العلمية: $K = (${chosen.aStr} \\times 10^{1}) \\times 10^{${rawExp}} = ${formatSciKatex(chosen.aStr, finalExp)}$.`,
				`الحصر: $10^{${finalExp}} < K < 10^{${finalExp + 1}}$، ورتبة المقدار هي $${chosen.rounded} \\times 10^{${finalExp}}$.`
			];

			finalAnswer = `${chosen.aStr} × 10^${finalExp}`;

			content = [
				{
					type: 'text',
					content: `1) احسب واكتب كتابة علمية العدد: $K = frac(${chosen.f1} times ${formatPowTypst(10, p1)} times ${chosen.f2} times ${formatPowTypst(10, p2)}, ${chosen.f3} times ${formatPowTypst(10, p3)})$.`,
					answer: `1) $K = frac(${chosen.f1} times ${chosen.f2}, ${chosen.f3}) times frac(${formatPowTypst(10, p1 + p2)}, ${formatPowTypst(10, p3)}) = ${chosen.rawStr} times ${formatPowTypst(10, rawExp)} = ${formatSciTypst(chosen.aStr, finalExp)}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) احصر $K$ بين قوتين متتاليتين للعدد $10$، ثم استنتج رتبة مقداره.`,
					answer: `2) الحصر: $${formatPowTypst(10, finalExp)} < K < ${formatPowTypst(10, finalExp + 1)}$، ورتبة مقدار $K$ هي $${chosen.rounded} times ${formatPowTypst(10, finalExp)}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) بسّط $E = frac(${ruleBase}^${e1} times ${ruleBase}^(${e2}), (${ruleBase}^${e3})^${e4})$ على شكل قوة واحدة، ثم احسب $F = (frac(${fp}, ${fq}))^(-2) - ${pBase}^2 + (-${qBase})^${qPow}$.`,
					answer: `3) $E = ${formatPowTypst(ruleBase, eRes)}$، و $F = frac(${invNum}, ${invDen}) - ${pBase * pBase} + (${signPowVal}) = ${formatFracTypst(invNum + (-pBase * pBase + signPowVal) * invDen, invDen)}$.`,
					mark: '1'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب بدقة عن الأسئلة الآتية مع إبراز خطوات الحساب:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// Template 2: Circumcircle of Right Triangle, Median to Hypotenuse & Tangent
// ---------------------------------------------------------------------------
const tmpl2CircumcircleRightTriangle: ParameterizedTemplate = {
	id: '3am_t2_circumcircle_right_triangle',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الدائرة المحيطة بالمثلث القائم، المتوسط المتعلق بالوتر والمماس',
	curriculumLessonId: 'lesson_3am_t2_circumcircle_right_triangle',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 2);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const R = rng.pick([3.5, 4, 4.5, 5, 6, 7, 8]);
			const hypBC = roundTo(2 * R, 1);
			const relCase = rng.pick(['secant', 'tangent', 'exterior'] as const);
			const distH =
				relCase === 'secant'
					? roundTo(R - rng.pick([1, 1.5]), 1)
					: relCase === 'tangent'
						? R
						: roundTo(R + rng.pick([1, 1.5, 2]), 1);
			const relAnswerAr =
				relCase === 'secant'
					? `المستقيم $(d)$ قاطع للدائرة في نقطتين لأن $h = ${fmtNum(distH)} < R = ${fmtNum(R)}$.`
					: relCase === 'tangent'
						? `المستقيم $(d)$ مماس للدائرة في نقطة واحدة لأن $h = R = ${fmtNum(R)}$.`
						: `المستقيم $(d)$ يقع خارج الدائرة ولا يقطعها لأن $h = ${fmtNum(distH)} > R = ${fmtNum(R)}$.`;

			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				circumcircle: true,
				sideBC: `${fmtNum(hypBC)} cm`
			});
			const svgUrl = saveSvgAsset(`3am_t2_circum_easy_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في الشكل المقابل، $ABC$ مثلث قائم في $A$ حيث طول وتره $BC = ${fmtNum(hypBC)}\\text{ cm}$، و $O$ منتصف $[BC]$. ما طول المتوسط $[AO]$ المتعلق بالوتر بـ $\\text{cm}$؟`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ وطول وتره $BC = ${fmtNum(hypBC)}\\text{ cm}$. ما طول المتوسط $[AO]$ المتعلق بالوتر؟`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم ABC والدائرة المحيطة به',
				questionData: {
					answer: R,
					displayTemplate: 'AO = BC / 2 = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `في المثلث القائم، طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر: AO = ${fmtNum(hypBC)} ÷ 2 = ${fmtNum(R)} سم (وهو نفسه نصف قطر الدائرة المحيطة).`
			};

			hints = [
				'المثلث $ABC$ قائم في $A$ ووتره $[BC]$.',
				'في المثلث القائم، طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر.',
				`احسب $AO = \\frac{${fmtNum(hypBC)}}{2} = ${fmtNum(R)}\\text{ cm}$.`
			];

			solutionStepsAr = [
				`مركز الدائرة المحيطة بالمثلث القائم $ABC$ هو منتصف الوتر $[BC]$ أي النقطة $O$، ونصف قطرها $R = \\frac{${fmtNum(hypBC)}}{2} = ${fmtNum(R)}\\text{ cm}$.`,
				`طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر: $AO = \\frac{BC}{2} = ${fmtNum(R)}\\text{ cm}$.`,
				relCase === 'secant'
					? `بما أن $${fmtNum(distH)} < ${fmtNum(R)}$ فالمستقيم $(d)$ قاطع للدائرة.`
					: relCase === 'tangent'
						? `بما أن $${fmtNum(distH)} = ${fmtNum(R)}$ فالمستقيم $(d)$ مماس للدائرة.`
						: `بما أن $${fmtNum(distH)} > ${fmtNum(R)}$ فالمستقيم $(d)$ خارج الدائرة.`
			];

			finalAnswer = `${fmtNum(R)} cm`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في الشكل المقابل، $A B C$ مثلث قائم في $A$ حيث $B C = ${fmtNum(hypBC)}$ سم، و $O$ منتصف $[B C]$. حدّد موضع مركز الدائرة $(C)$ المحيطة بالمثلث $A B C$ واحسب نصف قطرها $R$.`,
							answer: `1) مركز الدائرة المحيطة بالمثلث القائم $A B C$ هو منتصف وتره $[B C]$ أي النقطة $O$، ونصف قطرها $R = frac(${fmtNum(hypBC)}, 2) = ${fmtNum(R)}$ سم.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم ABC والدائرة المحيطة به'
						}
					]
				},
				{
					type: 'text',
					content: `2) استنتج طول المتوسط $[A O]$ المتعلق بالوتر $[B C]$ مع التعليل.`,
					answer: `2) في المثلث القائم، طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر، إذن $A O = frac(B C, 2) = ${fmtNum(R)}$ سم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) ليكن $(d)$ مستقيماً يبعد عن المركز $O$ بمسافة $h = ${fmtNum(distH)}$ سم. ما الوضعية النسبية للمستقيم $(d)$ والدائرة $(C)$؟`,
					answer: `3) ${relAnswerAr.replace(/\\text\{[^}]+\}/g, '')}`,
					mark: '1'
				}
			];
		} else if (difficulty === 'medium') {
			const med = rng.pick([3.5, 4, 4.5, 5, 5.5, 6, 6.5]);
			const sideFG = roundTo(2 * med, 1);
			const circleR = rng.pick([3, 4, 5, 6, 7]);
			const circleD = 2 * circleR;
			const relCase = rng.pick(['secant', 'tangent', 'exterior'] as const);
			const distH =
				relCase === 'secant'
					? roundTo(circleR - rng.pick([0.5, 1, 1.5]), 1)
					: relCase === 'tangent'
						? circleR
						: roundTo(circleR + rng.pick([0.5, 1, 1.8]), 1);

			const medSvg = svgCircumcircleMedianTangent({
				mode: 'median',
				labels: ['E', 'F', 'G'],
				midLabel: 'M',
				hypLabel: `FG = ${fmtNum(sideFG)} cm`,
				medLabel: `${fmtNum(med)} cm`
			});
			const svgUrl = saveSvgAsset(`3am_t2_circum_med_${cleanSeed}`, medSvg);

			const correctLabel =
				relCase === 'secant'
					? `قاطع للدائرة في نقطتين (لأن $h = ${fmtNum(distH)} < R = ${circleR}$)`
					: relCase === 'tangent'
						? `مماس للدائرة في نقطة واحدة (لأن $h = R = ${circleR}$)`
						: `خارج الدائرة ولا يقطعها (لأن $h = ${fmtNum(distH)} > R = ${circleR}$) `;

			const mcqBuilt = buildUniqueMcqOptions(
				correctLabel.trim(),
				[
					{
						text:
							relCase === 'secant'
								? `خارج الدائرة ولا يقطعها (لأن $h = ${fmtNum(distH)} > R = ${circleR}$)`
								: `قاطع للدائرة في نقطتين (لأن $h = ${fmtNum(distH)} < D = ${circleD}$)`,
						diagnosticFeedback: `انتبه! المعطى $${circleD}\\text{ cm}$ هو القطر $D$ وليس نصف القطر $R = \\frac{${circleD}}{2} = ${circleR}\\text{ cm}$!`
					},
					{
						text:
							relCase === 'tangent'
								? `قاطع للدائرة في نقطتين (لأن $h = ${fmtNum(distH)} < D = ${circleD}$)`
								: `مماس للدائرة في نقطة واحدة (لأن $h = R$)`,
						diagnosticFeedback: `يجب مقارنة البعد $h = ${fmtNum(distH)}\\text{ cm}$ مع نصف القطر $R = ${circleR}\\text{ cm}$ وليس مع القطر.`
					},
					{
						text: `المستقيم $(d)$ يمر بالمركز $O$`,
						diagnosticFeedback: `المستقيم يمر بالمركز $O$ فقط عندما يكون بعده عن المركز معدوماً ($h = 0$).`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `دائرة $(C)$ مركزها $O$ و**قطرها** $D = ${circleD}\\text{ cm}$. إذا كان بعد المركز $O$ عن المستقيم $(d)$ هو $h = ${fmtNum(distH)}\\text{ cm}$، فما الوضعية النسبية للمستقيم $(d)$ والدائرة $(C)$؟`,
				questionTextAr: `دائرة قطرها $D = ${circleD}\\text{ cm}$ وبعد مركزها عن مستقيم $(d)$ هو $h = ${fmtNum(distH)}\\text{ cm}$. ما الوضعية النسبية لهما؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نصف القطر هو R = D ÷ 2 = ${circleD} ÷ 2 = ${circleR} سم. بمقارنة البعد h = ${fmtNum(distH)} سم مع نصف القطر R = ${circleR} سم، نجد أن ${relCase === 'secant' ? 'h < R فالمستقيم قاطع للدائرة' : relCase === 'tangent' ? 'h = R فالمستقيم مماس للدائرة' : 'h > R فالمستقيم خارج الدائرة'}.`
			};

			hints = [
				'انتبه للمعطى: هل هو نصف القطر $R$ أم القطر $D$؟',
				`احسب أولاً نصف القطر: $R = \\frac{D}{2} = \\frac{${circleD}}{2} = ${circleR}\\text{ cm}$.`,
				`قارن $h = ${fmtNum(distH)}$ مع $R = ${circleR}$ لتحديد الوضعية النسبية.`
			];

			solutionStepsAr = [
				`في المثلث $EFG$، $M$ منتصف $[FG]$ وطول المتوسط $EM = ${fmtNum(med)} = \\frac{${fmtNum(sideFG)}}{2} = \\frac{FG}{2}$، إذن المثلث قائم في $E$ حسب الخاصية العكسية للمتوسط المتعلق بالوتر.`,
				`بما أن المثلث $EFG$ قائم في $E$، فالنقطة $E$ تنتمي إلى الدائرة التي قطرها $[FG]$.`,
				`بالنسبة للدائرة $(C)$: نصف قطرها $R = \\frac{${circleD}}{2} = ${circleR}\\text{ cm}$، وبما أن $${fmtNum(distH)} ${relCase === 'secant' ? '<' : relCase === 'tangent' ? '=' : '>'} ${circleR}$ فالمستقيم $(d)$ ${relCase === 'secant' ? 'قاطع للدائرة' : relCase === 'tangent' ? 'مماس للدائرة' : 'خارج الدائرة'}.`
			];

			finalAnswer =
				relCase === 'secant' ? 'قاطع للدائرة' : relCase === 'tangent' ? 'مماس للدائرة' : 'خارج الدائرة';

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $E F G$ المقابل، $M$ منتصف $[F G]$ حيث $F G = ${fmtNum(sideFG)}$ سم و $E M = ${fmtNum(med)}$ سم. برهن أن المثلث $E F G$ قائم في $E$.`,
							answer: `1) لدينا $M$ منتصف $[F G]$، إذن $[E M]$ هو المتوسط المتعلق بالضلع $[F G]$، و $E M = ${fmtNum(med)} = frac(${fmtNum(sideFG)}, 2) = frac(F G, 2)$. حسب الخاصية العكسية للمتوسط المتعلق بالوتر، المثلث $E F G$ قائم في $E$.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث EFG والمتوسط [EM]'
						}
					]
				},
				{
					type: 'text',
					content: `2) استنتج أن النقطة $E$ تنتمي إلى الدائرة التي قطرها $[F G]$، وحدد طول نصف قطرها.`,
					answer: `2) بما أن $E F G$ قائم في $E$ ووتره $[F G]$، فإن $E$ تنتمي إلى الدائرة المحيطة به التي قطرها $[F G]$ ونصف قطرها $R = ${fmtNum(med)}$ سم.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) دائرة $(C)$ مركزها $O$ وقطرها $D = ${circleD}$ سم، وبعد المركز $O$ عن المستقيم $(d)$ هو $h = ${fmtNum(distH)}$ سم. حدد الوضعية النسبية لـ $(d)$ و $(C)$ مع التعليل.`,
					answer: `3) نصف القطر $R = frac(${circleD}, 2) = ${circleR}$ سم. وبما أن $h = ${fmtNum(distH)} ${relCase === 'secant' ? '<' : relCase === 'tangent' ? '=' : '>'} R = ${circleR}$، فإن المستقيم $(d)$ ${relCase === 'secant' ? 'قاطع للدائرة في نقطتين' : relCase === 'tangent' ? 'مماس للدائرة في نقطة واحدة' : 'خارج الدائرة ولا يقطعها'}.`,
					mark: '1'
				}
			];
		} else {
			// Hard: Tangent (d) at T + angle OST = alpha -> deduce OTS=90 and TOS = 90 - alpha, plus semicircle diameter [AB]
			const radiusR = rng.pick([4, 4.5, 5, 6]);
			const alpha = rng.int(27, 62);
			const angleTOS = 90 - alpha;
			const diamAB = roundTo(2 * radiusR, 1);

			const tanSvg = svgCircumcircleMedianTangent({
				mode: 'tangent',
				radiusLabel: `${fmtNum(radiusR)} cm`,
				angleAlpha: alpha
			});
			const svgUrl = saveSvgAsset(`3am_t2_circum_tan_${cleanSeed}`, tanSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في الشكل المقابل، المستقيم $(d)$ مماس للدائرة $(C)$ ذات المركز $O$ في النقطة $T$، وتنتمي النقطة $S$ إلى $(d)$ بحيث $\\widehat{OST} = ${alpha}^\\circ$. ما قيس الزاوية $\\widehat{TOS}$ بالدرجات؟`,
				questionTextAr: `المستقيم $(d)$ مماس للدائرة $(C)$ في $T$ والنقطة $S \\in (d)$ حيث $\\widehat{OST} = ${alpha}^\\circ$. احسب قيس $\\widehat{TOS}$ بالدرجات.`,
				imageUrl: svgUrl,
				imageCaption: 'المماس (d) للدائرة (C) في النقطة T',
				questionData: {
					answer: angleTOS,
					displayTemplate: 'TOS = 90 - alpha = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بما أن (d) مماس للدائرة في T فإنه عمودي على نصف القطر [OT]، أي أن المثلث OTS قائم في T. إذن قيس الزاوية TOS = 90° - ${alpha}° = ${angleTOS}°.`,
			};

			hints = [
				'استحضر خاصية المماس لدائرة في نقطة $T$ منها.',
				'المماس $(d)$ عمودي على نصف القطر $[OT]$ في نقطة التماس $T$، أي $\\widehat{OTS} = 90^\\circ$.',
				`في المثلث القائم $OTS$، الزاويتان الحادتان متتامتان: $\\widehat{TOS} = 90^\\circ - ${alpha}^\\circ$.`
			];

			solutionStepsAr = [
				`بما أن $(d)$ مماس للدائرة $(C)$ في $T$، فإنه عمودي على $[OT]$ في $T$، ومنه المثلث $OTS$ قائم في $T$ ($\\widehat{OTS} = 90^\\circ$).`,
				`الزاويتان الحادتان في المثلث القائم $OTS$ متتامتان: $\\widehat{TOS} = 90^\\circ - ${alpha}^\\circ = ${angleTOS}^\\circ$.`,
				`إذا كانت $M$ نقطة من الدائرة التي قطرها $[AB]$ طوله $${fmtNum(diamAB)}\\text{ cm}$، فالمثلث $ABM$ قائم في $M$ وطول المتوسط $OM = ${fmtNum(radiusR)}\\text{ cm}$.`
			];

			finalAnswer = `${angleTOS}°`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في الشكل المقابل، $(C)$ دائرة مركزها $O$ ونصف قطرها $R = ${fmtNum(radiusR)}$ سم، والمستقيم $(d)$ مماس لها في $T$، والنقطة $S$ من $(d)$ حيث $hat(O S T) = ${alpha}°$. برّر أن المثلث $O T S$ قائم في $T$.`,
							answer: `1) بما أن $(d)$ مماس للدائرة $(C)$ في $T$، فإنه عمودي على نصف القطر $[O T]$ في النقطة $T$، ومنه $hat(O T S) = 90°$ والمثلث $O T S$ قائم في $T$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المماس (d) للدائرة (C) في T'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب قيس الزاوية $hat(T O S)$ بالدرجات، ثم عيّن بعد المركز $O$ عن المستقيم $(d)$.`,
					answer: `2) في المثلث القائم $O T S$: $hat(T O S) = 90° - ${alpha}° = ${angleTOS}°$. وبعد المركز $O$ عن $(d)$ هو الطول $O T = R = ${fmtNum(radiusR)}$ سم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) لتكن $[A B]$ قطراً للدائرة $(C)$ (طوله $A B = ${fmtNum(diamAB)}$ سم) و $M$ نقطة من $(C)$ تختلف عن $A$ و $B$. ما طبيعة المثلث $A B M$؟ وما طول المتوسط $[O M]$؟`,
					answer: `3) بما أن $M$ تنتمي إلى الدائرة التي قطرها $[A B]$، فالمثلث $A B M$ قائم في $M$ (الخاصية العكسية للدائرة المحيطة)، وطول المتوسط المتعلق بالوتر هو $O M = frac(${fmtNum(diamAB)}, 2) = ${fmtNum(radiusR)}$ سم.`,
					mark: '1'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'لاحظ الشكل المقابل وأجب بالتعليل عن الأسئلة الآتية:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// Template 3: Pythagoras Theorem & Converse (Scaled Triples, No √(ab) algebra)
// ---------------------------------------------------------------------------
const tmpl3PythagorasConverse: ParameterizedTemplate = {
	id: '3am_t2_pythagoras_converse',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'خاصية فيثاغورس والخاصية العكسية',
	curriculumLessonId: 'lesson_3am_t2_pythagoras_theorem',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 3);

		const easyTriples: readonly [number, number, number][] = [
			[3, 4, 5],
			[6, 8, 10],
			[9, 12, 15],
			[12, 16, 20],
			[5, 12, 13],
			[10, 24, 26]
		];
		const mediumTriples: readonly [number, number, number][] = [
			[1.5, 2, 2.5],
			[4.5, 6, 7.5],
			[7.5, 10, 12.5],
			[2.5, 6, 6.5],
			[8, 15, 17],
			[4, 7.5, 8.5]
		];
		const hardTriples: readonly [number, number, number][] = [
			[8, 15, 17],
			[7, 24, 25],
			[3.5, 12, 12.5],
			[4, 7.5, 8.5],
			[7.5, 18, 19.5],
			[10, 24, 26]
		];

		const pool =
			difficulty === 'easy'
				? easyTriples
				: difficulty === 'medium'
					? mediumTriples
					: hardTriples;
		const [rawA, rawB, c] = rng.pick(pool);
		const swapLegs = rng.int(0, 1) === 1;
		const ab = swapLegs ? rawB : rawA;
		const ac = swapLegs ? rawA : rawB;

		// Converse triangle (distinct from main triple)
		const convPool: readonly [number, number, number][] = [
			[6, 8, 10],
			[5, 12, 13],
			[9, 12, 15],
			[8, 15, 17],
			[4.5, 6, 7.5],
			[3, 4, 5]
		];
		const [cu, cv, cw] = rng.pick(convPool);
		const isRightConv = rng.int(0, 1) === 1;
		const cwTest = isRightConv ? cw : cw + 1; // strictly > max(cu, cv) and < cu + cv
		const cuSq = roundTo(cu * cu, 2);
		const cvSq = roundTo(cv * cv, 2);
		const cwTestSq = roundTo(cwTest * cwTest, 2);
		const sumConvSq = roundTo(cuSq + cvSq, 2);

		const areaABC = roundTo((ab * ac) / 2, 2);
		const perimABC = roundTo(ab + ac + c, 2);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${fmtNum(ab)} cm`,
				sideAC: `${fmtNum(ac)} cm`,
				sideBC: '?'
			});
			const svgUrl = saveSvgAsset(`3am_t2_pyth_easy_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في المثلث $ABC$ القائم في $A$ المقابل، لدينا $AB = ${fmtNum(ab)}\\text{ cm}$ و $AC = ${fmtNum(ac)}\\text{ cm}$. احسب طول الوتر $BC$ بـ $\\text{cm}$.`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ فيه $AB = ${fmtNum(ab)}\\text{ cm}$ و $AC = ${fmtNum(ac)}\\text{ cm}$. ما طول الوتر $BC$؟`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم ABC',
				questionData: {
					answer: c,
					displayTemplate: 'BC = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `حسب خاصية فيثاغورس: BC² = AB² + AC² = ${ab * ab} + ${ac * ac} = ${c * c}، وبلمسة الجذر التربيعي نجد BC = ${fmtNum(c)} سم.`
			};

			hints = [
				'المثلث $ABC$ قائم في $A$، إذن وتره هو الضلع $[BC]$.',
				'تكتب مساواة فيثاغورس: $BC^{2} = AB^{2} + AC^{2}$.',
				`احسب $${ab}^{2} + ${ac}^{2} = ${c * c}$ ثم استعمل لمسة $\\sqrt{\\phantom{x}}$.`
			];

			solutionStepsAr = [
				`بما أن المثلث $ABC$ قائم في $A$، فحسب خاصية فيثاغورس: $BC^{2} = AB^{2} + AC^{2}$.`,
				`التعويض: $BC^{2} = ${ab}^{2} + ${ac}^{2} = ${ab * ab} + ${ac * ac} = ${c * c}$.`,
				`إذن $BC = \\sqrt{${c * c}} = ${fmtNum(c)}\\text{ cm}$.`,
				`في المثلث $EFG$: $FG^{2} = ${cwTestSq}$ و $EF^{2} + EG^{2} = ${sumConvSq}$، إذن المثلث ${isRightConv ? 'قائم في $E$' : 'غير قائم'}.`
			];

			finalAnswer = `${fmtNum(c)} cm`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في الشكل المقابل، $A B C$ مثلث قائم في $A$ حيث $A B = ${fmtNum(ab)}$ سم و $A C = ${fmtNum(ac)}$ سم. احسب طول الوتر $B C$.`,
							answer: `1) بما أن $A B C$ قائم في $A$، فحسب خاصية فيثاغورس: $B C^2 = A B^2 + A C^2 = ${ab}^2 + ${ac}^2 = ${ab * ab} + ${ac * ac} = ${c * c}$، ومنه $B C = sqrt(${c * c}) = ${fmtNum(c)}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم ABC'
						}
					]
				},
				{
					type: 'text',
					content: `2) ليكن $E F G$ مثلثاً أطوال أضلاعه $E F = ${fmtNum(cu)}$ سم، $E G = ${fmtNum(cv)}$ سم، $F G = ${fmtNum(cwTest)}$ سم. بيّن هل المثلث $E F G$ قائم.`,
					answer: isRightConv
						? `2) أطول ضلع هو $[F G]$: $F G^2 = ${cwTest}^2 = ${cwTestSq}$، و $E F^2 + E G^2 = ${cu}^2 + ${cv}^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. بما أن $F G^2 = E F^2 + E G^2$ فالمثلث $E F G$ قائم في $E$ (الخاصية العكسية لفيثاغورس).`
						: `2) أطول ضلع هو $[F G]$: $F G^2 = ${cwTest}^2 = ${cwTestSq}$، و $E F^2 + E G^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. بما أن $F G^2 != E F^2 + E G^2$ فالمثلث $E F G$ غير قائم (بالاستدلال بالخلف).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب مساحة المثلث القائم $A B C$ ومحيطه.`,
					answer: `3) المساحة: $S = frac(${fmtNum(ab)} times ${fmtNum(ac)}, 2) = ${fmtNum(areaABC)}$ سم² ، والمحيط: $P = ${fmtNum(ab)} + ${fmtNum(ac)} + ${fmtNum(c)} = ${fmtNum(perimABC)}$ سم.`,
					mark: '0.75'
				}
			];
		} else if (difficulty === 'medium') {
			// Medium: Find a leg in subject, and true_false for converse in quiz!
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${fmtNum(ab)} cm`,
				sideAC: '?',
				sideBC: `${fmtNum(c)} cm`
			});
			const svgUrl = saveSvgAsset(`3am_t2_pyth_med_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'true_false',
				questionText: `نعتبر المثلث $EFG$ الذي أطوال أضلاعه $EF = ${fmtNum(cu)}\\text{ cm}$، $EG = ${fmtNum(cv)}\\text{ cm}$، $FG = ${fmtNum(cwTest)}\\text{ cm}$.\n\nالعبارة: «المثلث $EFG$ مثلث قائم في $E$»`,
				questionTextAr: `هل المثلث $EFG$ الذي أطوال أضلاعه $${fmtNum(cu)}\\text{ cm}$ و $${fmtNum(cv)}\\text{ cm}$ و $${fmtNum(cwTest)}\\text{ cm}$ مثلث قائم في $E$؟`,
				questionData: {
					correctAnswer: isRightConv
				},
				explanation: `مربع أطول ضلع FG² = ${cwTestSq}، ومجموع مربعي الضلعين الآخرين EF² + EG² = ${cuSq} + ${cvSq} = ${sumConvSq}. وبما أن ${cwTestSq} ${isRightConv ? '=' : '≠'} ${sumConvSq} فإن المثلث ${isRightConv ? 'قائم في E' : 'غير قائم'}.`
			};

			hints = [
				'لاختبار هل المثلث قائم، قارن مربع طول أطول ضلع بمجموع مربعي طولي الضلعين الآخرين.',
				`احسب $FG^{2} = ${cwTest}^{2} = ${cwTestSq}$ على حدة، و $EF^{2} + EG^{2} = ${cu}^{2} + ${cv}^{2}$ على حدة.`,
				isRightConv
					? 'بما أن الطرفين متساويان فالعبارة صحيحة حسب الخاصية العكسية لفيثاغورس.'
					: 'بما أن الطرفين مختلفان فالعبارة خاطئة (المثلث غير قائم).'
			];

			solutionStepsAr = [
				`نحسب مربع أطول ضلع منفرداً: $FG^{2} = ${cwTest}^{2} = ${cwTestSq}$.`,
				`نحسب مجموع مربعي الضلعين الآخرين: $EF^{2} + EG^{2} = ${cuSq} + ${cvSq} = ${sumConvSq}$.`,
				isRightConv
					? `نجد $FG^{2} = EF^{2} + EG^{2}$، إذن المثلث $EFG$ قائم في $E$ (صحيح).`
					: `نجد $FG^{2} \\neq EF^{2} + EG^{2}$، إذن المثلث $EFG$ غير قائم (خطأ).`
			];

			finalAnswer = isRightConv ? 'صحيح' : 'خطأ';

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $A B C$ القائم في $A$ المقابل، طول الوتر $B C = ${fmtNum(c)}$ سم و $A B = ${fmtNum(ab)}$ سم. احسب الطول $A C$.`,
							answer: `1) حسب خاصية فيثاغورس: $B C^2 = A B^2 + A C^2$، ومنه $A C^2 = B C^2 - A B^2 = ${roundTo(c * c, 2)} - ${roundTo(ab * ab, 2)} = ${roundTo(ac * ac, 2)}$، إذن $A C = sqrt(${roundTo(ac * ac, 2)}) = ${fmtNum(ac)}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم ABC'
						}
					]
				},
				{
					type: 'text',
					content: `2) نعتبر مثلثاً $E F G$ أطوال أضلاعه $E F = ${fmtNum(cu)}$ سم، $E G = ${fmtNum(cv)}$ سم، $F G = ${fmtNum(cwTest)}$ سم. هل المثلث $E F G$ قائم؟ علّل.`,
					answer: isRightConv
						? `2) $F G^2 = ${cwTestSq}$ و $E F^2 + E G^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. المساواة محققة، فحسب الخاصية العكسية لفيثاغورس المثلث $E F G$ قائم في $E$.`
						: `2) $F G^2 = ${cwTestSq}$ و $E F^2 + E G^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. بما أن $F G^2 != E F^2 + E G^2$ فالمثلث $E F G$ غير قائم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب مساحة المثلث $A B C$ بـ سم² .`,
					answer: `3) $S = frac(${fmtNum(ab)} times ${fmtNum(ac)}, 2) = ${fmtNum(areaABC)}$ سم² .`,
					mark: '0.75'
				}
			];
		} else {
			// Hard: Find leg AC given BC and AB (with .5 decimals or larger triples), quiz calculated AC
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${fmtNum(ab)} cm`,
				sideAC: '?',
				sideBC: `${fmtNum(c)} cm`
			});
			const svgUrl = saveSvgAsset(`3am_t2_pyth_hard_${cleanSeed}`, triSvg);
			const cSq = roundTo(c * c, 2);
			const abSq = roundTo(ab * ab, 2);
			const acSq = roundTo(ac * ac, 2);

			quizQuestion = {
				type: 'calculated',
				questionText: `في المثلث $ABC$ القائم في $A$ المقابل، طول الوتر $BC = ${fmtNum(c)}\\text{ cm}$ وطول الضلع القائم $AB = ${fmtNum(ab)}\\text{ cm}$. احسب طول الضلع القائم $AC$ بـ $\\text{cm}$.`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ فيه الوتر $BC = ${fmtNum(c)}\\text{ cm}$ و $AB = ${fmtNum(ab)}\\text{ cm}$. احسب $AC$.`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم ABC',
				questionData: {
					answer: ac,
					displayTemplate: 'AC = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `المثلث قائم في A فالوتر هو [BC]. بفيثاغورس: AC² = BC² - AB² = ${cSq} - ${abSq} = ${acSq}، ومنه AC = ${fmtNum(ac)} سم.`
			};

			hints = [
				'حدد أولاً الوتر في المثلث القائم $ABC$: هو الضلع $[BC]$ المقابل للزاوية القائمة $A$.',
				'بما أن المجهول هو أحد الضلعين القائمين، نطرح: $AC^{2} = BC^{2} - AB^{2}$.',
				`احسب $${cSq} - ${abSq} = ${acSq}$ ثم استعمل لمسة $\\sqrt{\\phantom{x}}$ لتجد $${fmtNum(ac)}$.`
			];

			solutionStepsAr = [
				`بما أن $ABC$ قائم في $A$، فحسب خاصية فيثاغورس: $BC^{2} = AB^{2} + AC^{2}$.`,
				`نطرح: $AC^{2} = ${fmtNum(c)}^{2} - ${fmtNum(ab)}^{2} = ${cSq} - ${abSq} = ${acSq}$.`,
				`باستعمال الجذر التربيعي: $AC = \\sqrt{${acSq}} = ${fmtNum(ac)}\\text{ cm}$.`,
				`المساحة: $S = \\frac{${fmtNum(ab)} \\times ${fmtNum(ac)}}{2} = ${fmtNum(areaABC)}\\text{ cm}^2$.`
			];

			finalAnswer = `${fmtNum(ac)} cm`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $A B C$ القائم في $A$ المقابل، طول الوتر $B C = ${fmtNum(c)}$ سم وطول الضلع $A B = ${fmtNum(ab)}$ سم. احسب طول الضلع $A C$.`,
							answer: `1) حسب خاصية فيثاغورس: $A C^2 = B C^2 - A B^2 = ${cSq} - ${abSq} = ${acSq}$، ومنه $A C = sqrt(${acSq}) = ${fmtNum(ac)}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم ABC'
						}
					]
				},
				{
					type: 'text',
					content: `2) نضع في مثلث آخر $E F G$: $E F = ${fmtNum(cu)}$ سم، $E G = ${fmtNum(cv)}$ سم، $F G = ${fmtNum(cwTest)}$ سم. أثبت بالبرهان طبيعة المثلث $E F G$.`,
					answer: isRightConv
						? `2) $F G^2 = ${cwTestSq}$ و $E F^2 + E G^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. بما أن $F G^2 = E F^2 + E G^2$ فالمثلث $E F G$ قائم في $E$ حسب الخاصية العكسية لفيثاغورس.`
						: `2) $F G^2 = ${cwTestSq}$ و $E F^2 + E G^2 = ${cuSq} + ${cvSq} = ${sumConvSq}$. بما أن $F G^2 != E F^2 + E G^2$ فالمثلث $E F G$ غير قائم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب مساحة المثلث $A B C$ ثم محيطه.`,
					answer: `3) المساحة $S = frac(${fmtNum(ab)} times ${fmtNum(ac)}, 2) = ${fmtNum(areaABC)}$ سم² ، والمحيط $P = ${fmtNum(ab)} + ${fmtNum(ac)} + ${fmtNum(c)} = ${fmtNum(perimABC)}$ سم.`,
					mark: '0.75'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب مع توضيح مراحل البرهان والحساب:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// Template 4: Acute Angle Cosine (cos) in Right Triangle
// ---------------------------------------------------------------------------
const tmpl4CosineAcuteAngle: ParameterizedTemplate = {
	id: '3am_t2_cosine_acute_angle',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'جيب تمام زاوية حادة في مثلث قائم (cos)',
	curriculumLessonId: 'lesson_3am_t2_cosine_acute_angle',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 4);

		// Part 1: exact right-triangle triples where cos(C) = AC / BC is terminating decimal
		const cosTriples: readonly {
			ab: number;
			ac: number;
			bc: number;
			cosC: number;
			cosB: number;
			angC: number;
			angB: number;
		}[] = [
			{ ab: 6, ac: 8, bc: 10, cosC: 0.8, cosB: 0.6, angC: 37, angB: 53 },
			{ ab: 8, ac: 6, bc: 10, cosC: 0.6, cosB: 0.8, angC: 53, angB: 37 },
			{ ab: 9, ac: 12, bc: 15, cosC: 0.8, cosB: 0.6, angC: 37, angB: 53 },
			{ ab: 12, ac: 16, bc: 20, cosC: 0.8, cosB: 0.6, angC: 37, angB: 53 },
			{ ab: 7, ac: 24, bc: 25, cosC: 0.96, cosB: 0.28, angC: 16, angB: 74 },
			{ ab: 3.5, ac: 12, bc: 12.5, cosC: 0.96, cosB: 0.28, angC: 16, angB: 74 }
		];
		const tri = rng.pick(cosTriples);

		// Part 2: given angle F and cos(F), compute adjacent EF or hypotenuse FG in EFG right-angled at E
		const cosCalcPool: readonly { ang: number; cosVal: number; fg: number; ef: number; exactNote: string }[] = [
			{ ang: 60, cosVal: 0.5, fg: 12, ef: 6, exactNote: '\\cos 60^\\circ = 0.5' },
			{ ang: 60, cosVal: 0.5, fg: 16, ef: 8, exactNote: '\\cos 60^\\circ = 0.5' },
			{ ang: 37, cosVal: 0.8, fg: 15, ef: 12, exactNote: '\\cos 37^\\circ \\approx 0.8' },
			{ ang: 37, cosVal: 0.8, fg: 20, ef: 16, exactNote: '\\cos 37^\\circ \\approx 0.8' },
			{ ang: 53, cosVal: 0.6, fg: 15, ef: 9, exactNote: '\\cos 53^\\circ \\approx 0.6' },
			{ ang: 41, cosVal: 0.75, fg: 12, ef: 9, exactNote: '\\cos 41^\\circ \\approx 0.75' },
			{ ang: 66, cosVal: 0.4, fg: 20, ef: 8, exactNote: '\\cos 66^\\circ \\approx 0.4' }
		];
		const calcItem = rng.pick(cosCalcPool);
		const typstNote =
			calcItem.ang === 60
				? `$cos 60 degree = 0.5$`
				: `$cos ${calcItem.ang} degree approx ${calcItem.cosVal}$`;

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${fmtNum(tri.ab)} cm`,
				sideAC: `${fmtNum(tri.ac)} cm`,
				sideBC: `${fmtNum(tri.bc)} cm`,
				angleLabels: [undefined, undefined, 'C']
			});
			const svgUrl = saveSvgAsset(`3am_t2_cos_easy_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في المثلث $ABC$ القائم في $A$ المقابل، لدينا $AB = ${fmtNum(tri.ab)}\\text{ cm}$، $AC = ${fmtNum(tri.ac)}\\text{ cm}$، و $BC = ${fmtNum(tri.bc)}\\text{ cm}$. احسب القيمة المضبوطة لـ $\\cos \\widehat{C}$.`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ فيه $AB = ${fmtNum(tri.ab)}\\text{ cm}$، $AC = ${fmtNum(tri.ac)}\\text{ cm}$، $BC = ${fmtNum(tri.bc)}\\text{ cm}$. احسب $\\cos \\widehat{C}$.`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم ABC',
				questionData: {
					answer: tri.cosC,
					displayTemplate: 'cos(C) = AC / BC = ?',
					variables: [],
					tolerance: 0.005
				},
				explanation: `في المثلث القائم في A، الضلع المجاور للزاوية C هو [AC] والوتر هو [BC]. إذن cos(C) = AC / BC = ${fmtNum(tri.ac)} / ${fmtNum(tri.bc)} = ${tri.cosC}.`
			};

			hints = [
				'تذكّر تعريف جيب تمام زاوية حادة: يساوي طول الضلع المجاور للزاوية الحادة مقسوماً على طول الوتر.',
				'الضلع المجاور للزاوية $\\widehat{C}$ في المثلث القائم في $A$ هو $[AC]$ والوتر هو $[BC]$.',
				`اقسم $\\frac{${fmtNum(tri.ac)}}{${fmtNum(tri.bc)}} = ${tri.cosC}$.`
			];

			solutionStepsAr = [
				`في المثلث $ABC$ القائم في $A$: $\\cos \\widehat{C} = \\frac{AC}{BC} = \\frac{${fmtNum(tri.ac)}}{${fmtNum(tri.bc)}} = ${tri.cosC}$.`,
				`وبالمثل $\\cos \\widehat{B} = \\frac{AB}{BC} = \\frac{${fmtNum(tri.ab)}}{${fmtNum(tri.bc)}} = ${tri.cosB}$.`,
				`في المثلث $EFG$ القائم في $E$: $EF = FG \\times \\cos \\widehat{F} = ${calcItem.fg} \\times ${calcItem.cosVal} = ${calcItem.ef}\\text{ cm}$.`
			];

			finalAnswer = String(tri.cosC);

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $A B C$ القائم في $A$ المقابل، $A B = ${fmtNum(tri.ab)}$ سم، $A C = ${fmtNum(tri.ac)}$ سم، و $B C = ${fmtNum(tri.bc)}$ سم. احسب كلاً من $cos hat(C)$ و $cos hat(B)$.`,
							answer: `1) $cos hat(C) = frac(A C, B C) = frac(${fmtNum(tri.ac)}, ${fmtNum(tri.bc)}) = ${tri.cosC}$، و $cos hat(B) = frac(A B, B C) = frac(${fmtNum(tri.ab)}, ${fmtNum(tri.bc)}) = ${tri.cosB}$.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم ABC'
						}
					]
				},
				{
					type: 'text',
					content: `2) في مثلث $E F G$ قائم في $E$، طول الوتر $F G = ${calcItem.fg}$ سم وقيس $hat(F) = ${calcItem.ang}°$ (علماً أن ${typstNote}). احسب الطول $E F$.`,
					answer: `2) $cos hat(F) = frac(E F, F G)$، ومنه $E F = F G times cos hat(F) = ${calcItem.fg} times ${calcItem.cosVal} = ${calcItem.ef}$ سم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) استنتج قيس الزاوية $hat(G)$ بالدرجات، وتحقّق أن $0 < cos hat(C) < 1$.`,
					answer: `3) $hat(G) = 90° - ${calcItem.ang}° = ${90 - calcItem.ang}°$، ونلاحظ أن $0 < ${tri.cosC} < 1$ لأن الضلع المجاور أصغر من الوتر.`,
					mark: '0.75'
				}
			];
		} else if (difficulty === 'medium') {
			// Medium: Find adjacent side EF given hypotenuse FG and angle F
			const triSvg = svgTriangle({
				labels: ['E', 'G', 'F'],
				rightAngleAtA: true,
				sideBC: `${calcItem.fg} cm`,
				sideAC: '?',
				angleLabels: [undefined, undefined, `${calcItem.ang}°`]
			});
			const svgUrl = saveSvgAsset(`3am_t2_cos_med_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في المثلث $EFG$ القائم في $E$ المقابل، طول الوتر $FG = ${calcItem.fg}\\text{ cm}$ و $\\widehat{F} = ${calcItem.ang}^\\circ$ (نأخذ $${calcItem.exactNote}$). احسب طول الضلع المجاور $EF$ بـ $\\text{cm}$.`,
				questionTextAr: `مثلث $EFG$ قائم في $E$ فيه $FG = ${calcItem.fg}\\text{ cm}$ و $\\widehat{F} = ${calcItem.ang}^\\circ$ ($${calcItem.exactNote}$). احسب $EF$.`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم EFG',
				questionData: {
					answer: calcItem.ef,
					displayTemplate: 'EF = FG * cos(F) = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `في المثلث EFG القائم في E: cos(F) = EF / FG، ومنه الضلع المجاور EF = FG × cos(F) = ${calcItem.fg} × ${calcItem.cosVal} = ${calcItem.ef} سم.`
			};

			hints = [
				'في المثلث $EFG$ القائم في $E$، الضلع المجاور للزاوية $\\widehat{F}$ هو $[EF]$ والوتر هو $[FG]$.',
				'اكتب العلاقة $\\cos \\widehat{F} = \\frac{EF}{FG}$ ثم استخرج $EF$.',
				`اضرب $EF = ${calcItem.fg} \\times ${calcItem.cosVal} = ${calcItem.ef}\\text{ cm}$.`
			];

			solutionStepsAr = [
				`في المثلث القائم $EFG$، لدينا $\\cos \\widehat{F} = \\frac{EF}{FG}$.`,
				`نعوّض: $EF = ${calcItem.fg} \\times ${calcItem.cosVal} = ${calcItem.ef}\\text{ cm}$.`,
				`الزاوية الحادة الأخرى: $\\widehat{G} = 90^\\circ - ${calcItem.ang}^\\circ = ${90 - calcItem.ang}^\\circ$.`
			];

			finalAnswer = `${calcItem.ef} cm`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $E F G$ القائم في $E$ المقابل، $F G = ${calcItem.fg}$ سم و $hat(F) = ${calcItem.ang}°$ (حيث ${typstNote}). احسب طول الضلع المجاور $E F$.`,
							answer: `1) $cos hat(F) = frac(E F, F G)$، إذن $E F = ${calcItem.fg} times ${calcItem.cosVal} = ${calcItem.ef}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم EFG'
						}
					]
				},
				{
					type: 'text',
					content: `2) في مثلث $A B C$ قائم في $A$، $A B = ${fmtNum(tri.ab)}$ سم و $A C = ${fmtNum(tri.ac)}$ سم و $B C = ${fmtNum(tri.bc)}$ سم. احسب $cos hat(C)$ واستنتج قيس $hat(C)$ بالتدوير إلى الدرجة (علماً أن $cos ${tri.angC}° approx ${tri.cosC}$).`,
					answer: `2) $cos hat(C) = frac(${fmtNum(tri.ac)}, ${fmtNum(tri.bc)}) = ${tri.cosC}$، ومنه $hat(C) approx ${tri.angC}°$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب قيس الزاوية $hat(G)$ في المثلث $E F G$.`,
					answer: `3) $hat(G) = 90° - ${calcItem.ang}° = ${90 - calcItem.ang}°$.`,
					mark: '0.75'
				}
			];
		} else {
			// Hard: Find hypotenuse FG given adjacent EF and angle F -> trap EF * cosVal vs EF / cosVal!
			const triSvg = svgTriangle({
				labels: ['E', 'G', 'F'],
				rightAngleAtA: true,
				sideBC: '?',
				sideAC: `${calcItem.ef} cm`,
				angleLabels: [undefined, undefined, `${calcItem.ang}°`]
			});
			const svgUrl = saveSvgAsset(`3am_t2_cos_hard_${cleanSeed}`, triSvg);

			const wrongMult = roundTo(calcItem.ef * calcItem.cosVal, 2);
			const wrongAdd = roundTo(calcItem.ef + calcItem.cosVal, 2);
			const wrongDivSwap = roundTo(calcItem.ef + 2, 1);

			const mcqBuilt = buildUniqueMcqOptions(
				`$${calcItem.fg}\\text{ cm}$`,
				[
					{
						text: `$${fmtNum(wrongMult)}\\text{ cm}$`,
						diagnosticFeedback: `خطأ شائع: ضربت $${calcItem.ef} \\times ${calcItem.cosVal}$! تذكّر أن الوتر $[FG]$ هو أطول ضلع في المثلث القائم ولا يمكن أن يكون أقصر من $EF = ${calcItem.ef}\\text{ cm}$.`
					},
					{
						text: `$${fmtNum(wrongAdd)}\\text{ cm}$`,
						diagnosticFeedback: `العلاقة هي $\\cos \\widehat{F} = \\frac{EF}{FG}$ أي عملية قسمة $FG = \\frac{EF}{\\cos \\widehat{F}}$ وليست جمعاً.`
					},
					{
						text: `$${fmtNum(wrongDivSwap)}\\text{ cm}$`,
						diagnosticFeedback: `تحقق من قسمة $${calcItem.ef} \\div ${calcItem.cosVal} = ${calcItem.fg}$.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `في المثلث $EFG$ القائم في $E$ المقابل، طول الضلع المجاور $EF = ${calcItem.ef}\\text{ cm}$ و $\\widehat{F} = ${calcItem.ang}^\\circ$ (نأخذ $${calcItem.exactNote}$). ما طول الوتر $FG$؟`,
				questionTextAr: `مثلث $EFG$ قائم في $E$ فيه $EF = ${calcItem.ef}\\text{ cm}$ و $\\widehat{F} = ${calcItem.ang}^\\circ$ ($${calcItem.exactNote}$). ما طول الوتر $FG$؟`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث القائم EFG',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `من العلاقة cos(F) = EF / FG نستخرج الوتر بالقسمة: FG = EF / cos(F) = ${calcItem.ef} / ${calcItem.cosVal} = ${calcItem.fg} سم.`
			};

			hints = [
				'في المثلث $EFG$ القائم في $E$، المجهول هو الوتر $[FG]$ والمعلوم هو الضلع المجاور $[EF]$.',
				'من $\\cos \\widehat{F} = \\frac{EF}{FG}$ نجد $FG = \\frac{EF}{\\cos \\widehat{F}}$.',
				`تحقق من معقولية النتيجة: الوتر أكبر من الضلع القائم $${calcItem.ef}\\text{ cm}$.`
			];

			solutionStepsAr = [
				`في المثلث القائم $EFG$، $\\cos \\widehat{F} = \\frac{EF}{FG}$.`,
				`نعوّض لحساب الوتر: $FG = \\frac{${calcItem.ef}}{${calcItem.cosVal}} = ${calcItem.fg}\\text{ cm}$.`,
				`في المثلث $ABC$: $\\cos \\widehat{B} = \\frac{${fmtNum(tri.ab)}}{${fmtNum(tri.bc)}} = ${tri.cosB}$، و $\\widehat{G} = 90^\\circ - ${calcItem.ang}^\\circ = ${90 - calcItem.ang}^\\circ$.`
			];

			finalAnswer = `${calcItem.fg} cm`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $E F G$ القائم في $E$ المقابل، $E F = ${calcItem.ef}$ سم و $hat(F) = ${calcItem.ang}°$ (حيث ${typstNote}). احسب طول الوتر $F G$.`,
							answer: `1) لدينا $cos hat(F) = frac(E F, F G)$، ومنه $F G = frac(${calcItem.ef}, ${calcItem.cosVal}) = ${calcItem.fg}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث القائم EFG'
						}
					]
				},
				{
					type: 'text',
					content: `2) في مثلث $A B C$ قائم في $A$، $A B = ${fmtNum(tri.ab)}$ سم و $B C = ${fmtNum(tri.bc)}$ سم. احسب $cos hat(B)$، ثم استنتج قيس $hat(B)$ (علماً أن $cos ${tri.angB}° approx ${tri.cosB}$).`,
					answer: `2) $cos hat(B) = frac(A B, B C) = frac(${fmtNum(tri.ab)}, ${fmtNum(tri.bc)}) = ${tri.cosB}$، إذن $hat(B) approx ${tri.angB}°$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) استنتج قيس الزاوية $hat(G)$ في المثلث $E F G$، ولماذا يكون جيب تمام زاوية حادة أصغر من $1$؟`,
					answer: `3) $hat(G) = 90° - ${calcItem.ang}° = ${90 - calcItem.ang}°$. يكون جيب تمام زاوية حادة أصغر من $1$ لأن طول الضلع المجاور أصغر دائماً من طول الوتر.`,
					mark: '0.75'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن الأسئلة الآتية بدقة:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// Template 5: Literal Calculation — Simplifying, Bracket Removal & (a+b)(c+d)
// ---------------------------------------------------------------------------
const tmpl5LiteralCalculation: ParameterizedTemplate = {
	id: '3am_t2_literal_calculation',
	grade: '3am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الحساب الحرفي: التبسيط، حذف الأقواس والنشر المضاعف',
	curriculumLessonId: 'lesson_3am_t2_literal_calculation',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 5);

		// Part 1: Bracket removal A = p*x + q - (r*x - s)
		const p = rng.int(4, 9);
		const r = rng.int(2, p - 1); // ensure p - r > 0
		const q = rng.int(2, 8);
		const s = rng.int(2, 9);
		const simpX = p - r;
		const simpC = q + s;
		const simpExprKatex = formatPoly(0, simpX, simpC, false);
		const simpExprTypst = formatPoly(0, simpX, simpC, true);

		// Part 2: Double distribution (ax + b)(cx + d) — STRICTLY no remarkable identities!
		let a = rng.int(1, 3);
		let c = rng.int(1, 3);
		let b = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
		let d = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
		while ((a === c && Math.abs(b) === Math.abs(d)) || a * d + b * c === 0) {
			a = rng.int(1, 3);
			c = rng.int(1, 3);
			b = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
			d = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
		}
		const expA2 = a * c;
		const expA1 = a * d + b * c;
		const expA0 = b * d;
		const expExprKatex = formatPoly(expA2, expA1, expA0, false);
		const expExprTypst = formatPoly(expA2, expA1, expA0, true);

		const fac1Katex = formatBinomial(a, b, false);
		const fac2Katex = formatBinomial(c, d, false);
		const fac1Typst = formatBinomial(a, b, true);
		const fac2Typst = formatBinomial(c, d, true);

		// Hard combination: E = (ax + b)(cx + d) - k(mx + n)
		const kSub = rng.int(2, 3);
		const mSub = rng.int(1, 2);
		const nSub = rng.pick([-4, -3, -2, 2, 3, 4]);
		const combA2 = expA2;
		const combA1 = expA1 - kSub * mSub;
		const combA0 = expA0 - kSub * nSub;
		const combExprKatex = formatPoly(combA2, combA1, combA0, false);
		const combExprTypst = formatPoly(combA2, combA1, combA0, true);
		const subFacKatex = formatBinomial(mSub, nSub, false);
		const subFacTypst = formatBinomial(mSub, nSub, true);

		const xEval = difficulty === 'easy' ? rng.int(2, 4) : rng.pick([-3, -2, -1, 2, 3]);
		const evalValEasy = expA2 * xEval * xEval + expA1 * xEval + expA0;
		const evalValHard = combA2 * xEval * xEval + combA1 * xEval + combA0;

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const wrongForgetSign = formatPoly(0, simpX, q - s, false);
			const wrongAddX = formatPoly(0, p + r, simpC, false);
			const wrongBoth = formatPoly(0, p + r, q - s, false);

			const mcqBuilt = buildUniqueMcqOptions(
				`$${simpExprKatex}$`,
				[
					{
						text: `$${wrongForgetSign}$`,
						diagnosticFeedback: `خطأ شائع: نسيت عكس إشارة $-${s}$ عند حذف الأقواس المسبوقة بإشارة $(-)$! الصواب $+${q} + ${s} = +${simpC}$.`
					},
					{
						text: `$${wrongAddX}$`,
						diagnosticFeedback: `الحد $${r}x$ داخل قوس مسبوق بإشارة $(-)$، لذا يصبح $-${r}x$ فنطرح $${p}x - ${r}x$.`
					},
					{
						text: `$${wrongBoth}$`,
						diagnosticFeedback: `تذكر: عند حذف قوس مسبوق بإشارة $(-)$ نعكس إشارة كل حد بداخله.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `بسّط العبارة الجبرية الآتية:\n\n$$A = ${p}x + ${q} - (${r}x - ${s})$$`,
				questionTextAr: `ما الشكل المبسط للعبارة $A = ${p}x + ${q} - (${r}x - ${s})$؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نحذف الأقواس المسبوقة بإشارة (-) بعكس الإشارات: A = ${p}x + ${q} - ${r}x + ${s}، ثم نجمع الحدود المتشابهة فنجد ${simpExprKatex}.`
			};

			hints = [
				'الأقواس مسبوقة بإشارة $(-)$، لذا عند حذفها نعكس إشارة كل حد بداخلها.',
				`نكتب: $A = ${p}x + ${q} - ${r}x + ${s}$.`,
				`نجمع الحدود المتشابهة: $(${p}x - ${r}x) + (${q} + ${s}) = ${simpExprKatex}$.`
			];

			solutionStepsAr = [
				`حذف الأقواس: $A = ${p}x + ${q} - ${r}x + ${s}$.`,
				`تبسيط $A$: $A = (${p} - ${r})x + (${q} + ${s}) = ${simpExprKatex}$.`,
				`النشر المضاعف: $B = ${fac1Katex}${fac2Katex} = ${expExprKatex}$، ومن أجل $x = ${xEval}$ نجد $B = ${evalValEasy}$.`
			];

			finalAnswer = simpExprKatex;

			content = [
				{
					type: 'text',
					content: `1) احذف الأقواس وبسّط العبارة: $A = ${p} x + ${q} - (${r} x - ${s})$.`,
					answer: `1) $A = ${p} x + ${q} - ${r} x + ${s} = ${simpExprTypst}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `2) انشر وبسّط العبارة: $B = ${fac1Typst}${fac2Typst}$.`,
					answer: `2) $B = ${a * c} x^2 ${formatSigned(a * d)} x ${formatSigned(b * c)} x ${formatSigned(b * d)} = ${expExprTypst}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) احسب قيمة العبارة $B$ من أجل $x = ${xEval}$.`,
					answer: `3) من أجل $x = ${xEval}$: $B = ${expA2} times ${xEval}^2 ${expA1 >= 0 ? '+' : '-'} ${Math.abs(expA1)} times ${xEval} ${expA0 >= 0 ? '+' : '-'} ${Math.abs(expA0)} = ${evalValEasy}$.`,
					mark: '1'
				}
			];
		} else if (difficulty === 'medium') {
			const wrongNoMiddle = formatPoly(expA2, 0, expA0, false);
			const wrongSignMid = formatPoly(expA2, -expA1, expA0, false);
			const wrongSignConst = formatPoly(expA2, expA1, -expA0, false);

			const mcqBuilt = buildUniqueMcqOptions(
				`$${expExprKatex}$`,
				[
					{
						text: `$${wrongNoMiddle}$`,
						diagnosticFeedback:
							'في النشر المضاعف $(a + b)(c + d) = ac + ad + bc + bd$، لا تنسَ الحدين المتقاطعين $ad$ و $bc$!'
					},
					{
						text: `$${wrongSignMid}$`,
						diagnosticFeedback: `تحقق من جمع الحدين المتشابهين: $(${a * d})x + (${b * c})x = ${expA1}x$.`
					},
					{
						text: `$${wrongSignConst}$`,
						diagnosticFeedback: `راجع إشارة الجداء الأخير: $(${b}) \\times (${d}) = ${b * d}$.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `انشر وبسّط العبارة الجبرية:\n\n$$B = ${fac1Katex}${fac2Katex}$$`,
				questionTextAr: `ما النشر المبسط للعبارة $B = ${fac1Katex}${fac2Katex}$؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نطبق التوزيعية: B = (${a}x)×(${c}x) + (${a}x)×(${d}) + (${b})×(${c}x) + (${b})×(${d}) = ${expA2}x² ${formatSigned(a * d)}x ${formatSigned(b * c)}x ${formatSigned(expA0)} = ${expExprKatex}.`
			};

			hints = [
				'استعمل قاعدة النشر المضاعف: $(u + v)(w + z) = uw + uz + vw + vz$.',
				`اضرب كل حد من القوس الأول في كل حد من القوس الثاني مع الانتباه لقاعدة الإشارات.`,
				`اجمع الحدين المتشابهين في $x$: $${a * d}x + (${b * c}x) = ${expA1}x$.`
			];

			solutionStepsAr = [
				`النشر: $B = ${expA2}x^{2} ${formatSigned(a * d)}x ${formatSigned(b * c)}x ${formatSigned(expA0)}$.`,
				`التبسيط: $B = ${expExprKatex}$.`,
				`حذف الأقواس في $A$: $A = ${p}x + ${q} - ${r}x + ${s} = ${simpExprKatex}$.`,
				`التعويض بـ $x = ${xEval}$ في $B$: $B = ${evalValEasy}$.`
			];

			finalAnswer = expExprKatex;

			content = [
				{
					type: 'text',
					content: `1) بسّط العبارة: $A = ${p} x + ${q} - (${r} x - ${s})$.`,
					answer: `1) $A = ${p} x + ${q} - ${r} x + ${s} = ${simpExprTypst}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `2) انشر وبسّط العبارة: $B = ${fac1Typst}${fac2Typst}$.`,
					answer: `2) $B = ${expA2} x^2 ${formatSigned(a * d)} x ${formatSigned(b * c)} x ${formatSigned(expA0)} = ${expExprTypst}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) احسب قيمة العبارة $B$ من أجل $x = ${xEval}$، ثم تحقق أن الناتج يساوي قيمة العبارة المنشورة.`,
					answer: `3) بالتعويض في الصيغتين نجد $B = ${evalValEasy}$، إذن العبارتان متكافئتان.`,
					mark: '1'
				}
			];
		} else {
			// Hard: Expand E = (ax + b)(cx + d) - k(mx + n) and evaluate for x = xEval
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر العبارة الجبرية:\n\n$$E = ${fac1Katex}${fac2Katex} - ${kSub}${subFacKatex}$$\n\nاحسب القيمة العددية للعبارة $E$ من أجل $x = ${xEval}$.`,
				questionTextAr: `احسب قيمة العبارة $E = ${fac1Katex}${fac2Katex} - ${kSub}${subFacKatex}$ من أجل $x = ${xEval}$.`,
				questionData: {
					answer: evalValHard,
					displayTemplate: 'E(x) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بالنشر والتبسيط: E = (${expExprKatex}) - (${kSub * mSub}x ${formatSigned(kSub * nSub)}) = ${combExprKatex}. وبالتعويض بـ x = ${xEval} نجد E = ${evalValHard}.`
			};

			hints = [
				'يمكنك نشر العبارة $E$ وتبسيطها أولاً ثم التعويض، أو التعويض مباشرة مع احترام الأقواس.',
				`انتبه للإشارة السالبة أمام الجداء $-${kSub}${subFacKatex}$: نوزع $-${kSub}$ على الحدين.`,
				`إذا عوّضت بـ $x = ${xEval}$ في العبارة المبسطة $${combExprKatex}$، تذكر أن $(${xEval})^{2} = ${xEval * xEval}$.`
			];

			solutionStepsAr = [
				`نشر الجداء المضاعف: $${fac1Katex}${fac2Katex} = ${expExprKatex}$.`,
				`توزيع $-${kSub}$: $-${kSub}${subFacKatex} = -${kSub * mSub}x ${formatSigned(-kSub * nSub)}$.`,
				`التبسيط: $E = ${combExprKatex}$.`,
				`التعويض بـ $x = ${xEval}$: $E = ${combA2} \\times (${xEval})^{2} ${combA1 >= 0 ? '+' : '-'} ${Math.abs(combA1)} \\times ${formatParenNum(xEval)} ${combA0 >= 0 ? '+' : '-'} ${Math.abs(combA0)} = ${evalValHard}$.`
			];

			finalAnswer = String(evalValHard);

			const subC = -kSub * nSub;
			const subCStr = subC >= 0 ? `+ ${subC}` : `- ${Math.abs(subC)}`;
			const combTerm1 = combA1 === 0 ? '' : ` ${combA1 >= 0 ? '+' : '-'} ${Math.abs(combA1)} times ${formatParenNum(xEval)}`;
			const combTerm0 = combA0 === 0 ? '' : ` ${combA0 >= 0 ? '+' : '-'} ${Math.abs(combA0)}`;

			content = [
				{
					type: 'text',
					content: `1) احذف الأقواس وبسّط العبارة: $A = ${p} x + ${q} - (${r} x - ${s})$.`,
					answer: `1) $A = ${p} x + ${q} - ${r} x + ${s} = ${simpExprTypst}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `2) انشر وبسّط العبارة: $E = ${fac1Typst}${fac2Typst} - ${kSub} ${subFacTypst}$.`,
					answer: `2) $E = (${expExprTypst}) - ${kSub * mSub} x ${subCStr} = ${combExprTypst}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) احسب قيمة $E$ من أجل $x = ${xEval}$.`,
					answer: `3) بالتعويض بـ $x = ${xEval}$ نجد $E = ${combA2} times ${formatParenNum(xEval)}^2${combTerm1}${combTerm0} = ${evalValHard}$.`,
					mark: '1'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن الأسئلة الآتية بالتفصيل:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// Template 6: T2 Integration Situation (8 pts: Ramp Pythagoras + cos + Literal Area/Perimeter + Sci Notation)
// ---------------------------------------------------------------------------
const tmpl6IntegrationSituation: ParameterizedTemplate = {
	id: '3am_t2_integration_situation',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: ممر الولوج وتهيئة ساحة علمية',
	curriculumLessonId: 'lesson_3am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 6);

		// Part 1: Ramp/Ladder right triangle ABC at A
		const k = rng.pick([1, 1.5, 2, 2.5]);
		const useCos08 = rng.int(0, 1) === 1;
		const ab = roundTo((useCos08 ? 4 : 3) * k, 1);
		const ac = roundTo((useCos08 ? 3 : 4) * k, 1);
		const bc = roundTo(5 * k, 1);
		const cosB = useCos08 ? 0.8 : 0.6;
		const angB = useCos08 ? 37 : 53;
		const aoMedian = roundTo(bc / 2, 2);

		// Part 2: Courtyard EFGH with literal dimensions L = (ax + b), l = (cx + d)
		// Strictly a != c, b != d -> NO remarkable identities!
		const aLen = rng.int(2, 4);
		const cWid = rng.int(1, aLen - 1);
		const bLen = rng.int(3, 6);
		const dWid = rng.int(1, 5);
		const adjDWid = dWid === bLen ? dWid + 1 : dWid;

		const perimX = 2 * (aLen + cWid);
		const perimC = 2 * (bLen + adjDWid);
		const areaA2 = aLen * cWid;
		const areaA1 = aLen * adjDWid + bLen * cWid;
		const areaA0 = bLen * adjDWid;

		const x0 = rng.int(2, 4);
		const lenVal = aLen * x0 + bLen;
		const widVal = cWid * x0 + adjDWid;
		const perimVal = 2 * (lenVal + widVal);
		const areaVal = lenVal * widVal;

		const lenTypst = formatBinomial(aLen, bLen, true);
		const widTypst = formatBinomial(cWid, adjDWid, true);
		const lenKatex = formatBinomial(aLen, bLen, false);
		const widKatex = formatBinomial(cWid, adjDWid, false);
		const perimExprTypst = formatPoly(0, perimX, perimC, true);
		const perimExprKatex = formatPoly(0, perimX, perimC, false);
		const areaExprTypst = formatPoly(areaA2, areaA1, areaA0, true);
		const areaExprKatex = formatPoly(areaA2, areaA1, areaA0, false);

		// Part 3: Budget/Cost in Scientific Notation & Order of Magnitude
		const unitPrice = rng.pick([400, 500, 600, 800]);
		let rampFee = rng.priceDA(10000, 24000, 2000);
		let totalCost = areaVal * unitPrice + rampFee;
		let sciCost = scientificParts(totalCost, 0);
		// Ensure tenths digit is not 5 and aNum < 9.4 so rounding is 100% unambiguous
		if (Math.abs((sciCost.aNum * 10) % 10 - 5) < 0.1 || sciCost.aNum >= 9.4) {
			rampFee += 4000;
			totalCost = areaVal * unitPrice + rampFee;
			sciCost = scientificParts(totalCost, 0);
		}

		const svg = svgRampAndCourtyard({
			abLabel: `AB = ${fmtNum(ab)} m`,
			acLabel: difficulty === 'hard' ? 'AC = ?' : `AC = ${fmtNum(ac)} m`,
			bcLabel: difficulty === 'hard' ? `BC = ${fmtNum(bc)} m` : 'BC = ?',
			angleBLabel: `B`,
			lenExpr: `L = ${aLen}x + ${bLen}`,
			widExpr: `l = ${cWid}x + ${adjDWid}`
		});
		const svgUrl = saveSvgAsset(`3am_t2_integ_${difficulty}_${cleanSeed}`, svg);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			quizQuestion = {
				type: 'calculated',
				questionText: `في تصميم ممر الولوج المقابل، المثلث $ABC$ قائم في $A$ حيث $AB = ${fmtNum(ab)}\\text{ m}$ وارتفاع الجدار $AC = ${fmtNum(ac)}\\text{ m}$. احسب طول المنحدر $BC$ بـ $\\text{m}$.`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ فيه $AB = ${fmtNum(ab)}\\text{ m}$ و $AC = ${fmtNum(ac)}\\text{ m}$. احسب طول الوتر $BC$.`,
				imageUrl: svgUrl,
				imageCaption: 'مخطط ممر الولوج والساحة المستطيلة',
				questionData: {
					answer: bc,
					displayTemplate: 'BC = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `حسب خاصية فيثاغورس: BC² = AB² + AC² = ${roundTo(ab * ab, 2)} + ${roundTo(ac * ac, 2)} = ${roundTo(bc * bc, 2)}، ومنه BC = ${fmtNum(bc)} م.`
			};
			hints = [
				'المثلث $ABC$ قائم في $A$، فوتره هو طول المنحدر $[BC]$.',
				'طبق خاصية فيثاغورس: $BC^{2} = AB^{2} + AC^{2}$.',
				`احسب $\\sqrt{${roundTo(bc * bc, 2)}} = ${fmtNum(bc)}\\text{ m}$.`
			];
			solutionStepsAr = [
				`حساب طول المنحدر بفيثاغورس: $BC = ${fmtNum(bc)}\\text{ m}$، وطول الدعامة $AO = \\frac{BC}{2} = ${fmtNum(aoMedian)}\\text{ m}$.`,
				`جيب تمام زاوية الميل: $\\cos \\widehat{B} = \\frac{${fmtNum(ab)}}{${fmtNum(bc)}} = ${cosB}$، إذن $\\widehat{B} \\approx ${angB}^\\circ$.`,
				`مساحة الساحة: $S = ${lenKatex}${widKatex} = ${areaExprKatex}$، ومن أجل $x = ${x0}$ نجد $S = ${areaVal}\\text{ m}^2$.`,
				`التكلفة: $C = ${totalCost} = ${formatSciKatex(sciCost.aStr, sciCost.exp)}\\text{ DA}$ ورتبة مقدارها $${sciCost.roundedUnit} \\times 10^{${sciCost.exp}}\\text{ DA}$.`
			];
			finalAnswer = `${fmtNum(bc)} m`;
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعطى أبعاد الساحة المستطيلة $EFGH$ بدلالة $x$ بـ: الطول $L = ${lenKatex}\\text{ m}$ والعرض $\\ell = ${widKatex}\\text{ m}$. احسب مساحة الساحة $S$ بـ $\\text{m}^2$ من أجل $x = ${x0}$.`,
				questionTextAr: `ساحة مستطيلة بعدها ${lenKatex} و ${widKatex}. احسب مساحتها من أجل $x = ${x0}$.`,
				imageUrl: svgUrl,
				imageCaption: 'مخطط ممر الولوج والساحة المستطيلة',
				questionData: {
					answer: areaVal,
					displayTemplate: 'S = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعوّض x = ${x0}: الطول L = ${aLen}×${x0} + ${bLen} = ${lenVal} م والعرض l = ${cWid}×${x0} + ${adjDWid} = ${widVal} م، إذن المساحة S = ${lenVal} × ${widVal} = ${areaVal} م² (وتتطابق مع ${areaExprKatex}).`
			};
			hints = [
				`عوّض $x = ${x0}$ في عبارة الطول $${lenKatex}$ وعبارة العرض $${widKatex}$.`,
				`أو انشر أولاً $S = ${lenKatex}${widKatex} = ${areaExprKatex}$ ثم عوّض $x = ${x0}$.`,
				`اضرب الطول $${lenVal}\\text{ m}$ في العرض $${widVal}\\text{ m}$.`
			];
			solutionStepsAr = [
				`النشر المضاعف للمساحة: $S = ${lenKatex}${widKatex} = ${areaExprKatex}$.`,
				`من أجل $x = ${x0}$: الطول $${lenVal}\\text{ m}$ والعرض $${widVal}\\text{ m}$، ومنه $S = ${lenVal} \\times ${widVal} = ${areaVal}\\text{ m}^2$.`,
				`طول المنحدر $BC = ${fmtNum(bc)}\\text{ m}$، $\\cos \\widehat{B} = ${cosB}$، والتكلفة $${formatSciKatex(sciCost.aStr, sciCost.exp)}\\text{ DA}$.`
			];
			finalAnswer = `${areaVal} m²`;
		} else {
			// Hard: MCQ combining literal area expression S and cos(B)
			const correctOpt = `$S = ${areaExprKatex}$ و $\\cos \\widehat{B} = ${cosB}$`;
			const wrongAreaNoCross = formatPoly(areaA2, 0, areaA0, false);
			const wrongCosInvert = fmtNum(bc / ab, 2);
			const wrongAreaMid = formatPoly(areaA2, Math.max(1, areaA1 - 2), areaA0, false);

			const mcqBuilt = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: `$S = ${wrongAreaNoCross}$ و $\\cos \\widehat{B} = ${cosB}$`,
						diagnosticFeedback:
							'قيمة $\\cos \\widehat{B}$ صحيحة، لكن في نشر المساحة $(ax+b)(cx+d)$ نسيت الجداءين المتقاطعين $adx + bcx$!'
					},
					{
						text: `$S = ${areaExprKatex}$ و $\\cos \\widehat{B} = ${wrongCosInvert}$`,
						diagnosticFeedback:
							'النشر صحيح، لكن $\\cos \\widehat{B} = \\frac{AB}{BC}$ (الضلع المجاور على الوتر) ويكون دائماً أصغر من $1$!'
					},
					{
						text: `$S = ${wrongAreaMid}$ و $\\cos \\widehat{B} = ${useCos08 ? 0.6 : 0.8}$`,
						diagnosticFeedback:
							'تحقق من الضلع المجاور للزاوية $\\widehat{B}$ ومن جمع الحدين المتشابهين في النشر المضاعف.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `في الوضعية المقابلة ($AB = ${fmtNum(ab)}\\text{ m}$، $BC = ${fmtNum(bc)}\\text{ m}$)، ما العبارة المنشورة والمبسطة لمساحة الساحة $S = ${lenKatex}${widKatex}$، وما قيمة $\\cos \\widehat{B}$؟`,
				questionTextAr: `ما النشر المبسط لمساحة الساحة $S = ${lenKatex}${widKatex}$ وما قيمة $\\cos \\widehat{B}$؟`,
				imageUrl: svgUrl,
				imageCaption: 'مخطط ممر الولوج والساحة المستطيلة',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `النشر المضاعف يعطي S = ${areaExprKatex}. وفي المثلث القائم ABC، الضلع المجاور للزاوية B هو [AB] والوتر [BC]، إذن cos(B) = ${fmtNum(ab)} / ${fmtNum(bc)} = ${cosB}.`
			};
			hints = [
				`انشر $S = ${lenKatex}${widKatex}$ بضرب كل حد من القوس الأول في كل حد من القوس الثاني.`,
				'احسب $\\cos \\widehat{B} = \\frac{AB}{BC}$ (المجاور على الوتر)، وتذكّر أن $0 < \\cos \\widehat{B} < 1$.',
				`نجد $S = ${areaExprKatex}$ و $\\cos \\widehat{B} = ${cosB}$.`
			];
			solutionStepsAr = [
				`حساب الارتفاع بفيثاغورس: $AC = \\sqrt{${roundTo(bc * bc, 2)} - ${roundTo(ab * ab, 2)}} = ${fmtNum(ac)}\\text{ m}$.`,
				`جيب التمام: $\\cos \\widehat{B} = \\frac{${fmtNum(ab)}}{${fmtNum(bc)}} = ${cosB}$، إذن $\\widehat{B} \\approx ${angB}^\\circ$.`,
				`النشر المضاعف للمساحة: $S = ${areaExprKatex}$.`,
				`من أجل $x = ${x0}$: $S = ${areaVal}\\text{ m}^2$، والتكلفة الكلية $C = ${formatSciKatex(sciCost.aStr, sciCost.exp)}\\text{ DA}$.`
			];
			finalAnswer = `S = ${areaExprKatex}, cos(B) = ${cosB}`;
		}

		const part1Prompt =
			difficulty === 'hard'
				? `الجزء الأول (الهندسة — ممر الولوج): يمثل المثلث $A B C$ القائم في $A$ مخطط ممر ولوج حيث القاعدة الأفقية $A B = ${fmtNum(ab)}$ م وطول المنحدر $B C = ${fmtNum(bc)}$ م، و $O$ منتصف $[B C]$.\n\nأ) احسب ارتفاع الجدار $A C$ باستعمال خاصية فيثاغورس.\n\nب) احسب $cos hat(B)$ ثم استنتج قيس زاوية الميل $hat(B)$ (علماً أن $cos ${angB}° approx ${cosB}$).\n\nج) ثُبّتت دعامة $[A O]$ بين الزاوية القائمة ومنتصف المنحدر، احسب طولها $A O$.`
				: `الجزء الأول (الهندسة — ممر الولوج): يمثل المثلث $A B C$ القائم في $A$ مخطط ممر ولوج حيث $A B = ${fmtNum(ab)}$ م و $A C = ${fmtNum(ac)}$ م، و $O$ منتصف $[B C]$.\n\nأ) احسب طول المنحدر $B C$ باستعمال خاصية فيثاغورس.\n\nب) احسب $cos hat(B)$ ثم استنتج قيس زاوية الميل $hat(B)$ (علماً أن $cos ${angB}° approx ${cosB}$).\n\nج) ثُبّتت دعامة $[A O]$ بين الزاوية القائمة ومنتصف المنحدر، احسب طولها $A O$.`;

		const part1Answer =
			difficulty === 'hard'
				? `الجزء الأول:\n\nأ) بفيثاغورس: $A C^2 = B C^2 - A B^2 = ${roundTo(bc * bc, 2)} - ${roundTo(ab * ab, 2)} = ${roundTo(ac * ac, 2)}$، ومنه $A C = ${fmtNum(ac)}$ م.\n\nب) $cos hat(B) = frac(A B, B C) = frac(${fmtNum(ab)}, ${fmtNum(bc)}) = ${cosB}$، إذن $hat(B) approx ${angB}°$.\n\nج) $[A O]$ متوسط متعلق بالوتر، إذن $A O = frac(B C, 2) = ${fmtNum(aoMedian)}$ م.`
				: `الجزء الأول:\n\nأ) بفيثاغورس: $B C^2 = A B^2 + A C^2 = ${roundTo(ab * ab, 2)} + ${roundTo(ac * ac, 2)} = ${roundTo(bc * bc, 2)}$، ومنه $B C = ${fmtNum(bc)}$ م.\n\nب) $cos hat(B) = frac(A B, B C) = frac(${fmtNum(ab)}, ${fmtNum(bc)}) = ${cosB}$، إذن $hat(B) approx ${angB}°$.\n\nج) $[A O]$ متوسط متعلق بالوتر، إذن $A O = frac(B C, 2) = ${fmtNum(aoMedian)}$ م.`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction:
				'قررت متوسطة تهيئة ممر ولوج مائل وساحة علمية مستطيلة وفق المخطط المقابل (وحدة الطول هي المتر):',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: part1Prompt,
							answer: part1Answer,
							mark: '3'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'مخطط ممر الولوج والساحة المستطيلة'
						}
					]
				},
				{
					type: 'text',
					content: `الجزء الثاني (الحساب الحرفي): بجانب الممر توجد ساحة مستطيلة $E F G H$ طولها $L = ${lenTypst}$ وعرضها $l = ${widTypst}$ حيث $x > 0$.\n\nأ) عبّر بدلالة $x$ عن محيط الساحة $P$ في شكله المبسط.\n\nب) انشر وبسّط عبارة مساحة الساحة $S = ${lenTypst}${widTypst}$.\n\nج) احسب المحيط $P$ والمساحة $S$ من أجل $x = ${x0}$ م.`,
					answer: `الجزء الثاني:\n\nأ) $P = 2 times (${lenTypst} + ${widTypst}) = 2(${aLen + cWid} x + ${bLen + adjDWid}) = ${perimExprTypst}$.\n\nب) $S = ${areaExprTypst}$.\n\nج) عند $x = ${x0}$: $P = ${perimVal}$ م، و $S = ${lenVal} times ${widVal} = ${areaVal}$ م² .`,
					mark: '3'
				},
				{
					type: 'text',
					content: `الجزء الثالث (الكتابة العلمية ورتبة مقدار): تبلغ كلفة تبليط المتر المربع الواحد من الساحة $${unitPrice}$ دج، إضافة إلى كلفة إنشاء الممر البالغة $${rampFee}$ دج.\n\nأ) احسب الكلفة الإجمالية $C$ للمشروع بالدينار.\n\nب) اكتب العدد $C$ كتابة علمية، ثم أعط رتبة مقداره.`,
					answer: `الجزء الثالث:\n\nأ) $C = ${areaVal} times ${unitPrice} + ${rampFee} = ${totalCost}$ دج.\n\nب) الكتابة العلمية: $C = ${formatSciTypst(sciCost.aStr, sciCost.exp)}$ دج، ورتبة مقداره: $${sciCost.roundedUnit} times 10^${sciCost.exp}$ دج.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_3AM_T2: ParameterizedTemplate[] = [
	tmpl1ScientificNotationPowers,
	tmpl2CircumcircleRightTriangle,
	tmpl3PythagorasConverse,
	tmpl4CosineAcuteAngle,
	tmpl5LiteralCalculation,
	tmpl6IntegrationSituation
];
