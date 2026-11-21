import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, gcd, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset, svgFractionBar, svgNumberLine, svgTriangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';

const NBSP = '\u00A0';
const LRI = '\u2066';
const PDI = '\u2069';

function difficultyOffset(difficulty: Difficulty): number {
	return difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 47;
}

/** Formats a natural number with ASCII spaces every 3 digits (for acceptedAnswers / finalAnswer). */
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

function fmtDec(val: number, maxDec = 2): string {
	return String(roundTo(val, maxDec));
}

function decimalAcceptedAnswers(val: number, unit?: string): string[] {
	const base = fmtDec(val, 2);
	const comma = base.replace('.', ',');
	const out = new Set<string>([base, comma]);
	if (unit) {
		out.add(`${base} ${unit}`);
		out.add(`${comma} ${unit}`);
	}
	return [...out];
}

/** Ensures inline `$...$` delimiters satisfy marked-katex-extension spacing rules with Arabic punctuation. */
function safeKatex(text: string): string {
	const parts = text.split('$');
	if (parts.length < 3 || parts.length % 2 === 0) return text;
	for (let i = 0; i < parts.length - 1; i += 2) {
		if (parts[i].length > 0 && !/\s$/.test(parts[i])) {
			parts[i] += ' ';
		}
		const next = parts[i + 2];
		if (next.length > 0 && !/^[\s.!?:،]/.test(next)) {
			parts[i + 2] = ' ' + next;
		}
	}
	return parts.join('$');
}

function withSafeKatex(tpl: ParameterizedTemplate): ParameterizedTemplate {
	return {
		...tpl,
		generate(seed, difficulty) {
			const inst = tpl.generate(seed, difficulty);
			const q = inst.quizQuestion;
			const qd = { ...q.questionData };

			if (q.type === 'mcq' && Array.isArray(qd.options)) {
				qd.options = qd.options.map((o: any) => ({
					...o,
					text: typeof o.text === 'string' ? safeKatex(o.text) : o.text,
					...(o.diagnosticFeedback ? { diagnosticFeedback: safeKatex(o.diagnosticFeedback) } : {})
				}));
			} else if (q.type === 'ordering' && Array.isArray(qd.items)) {
				qd.items = qd.items.map((it: any) => (typeof it === 'string' ? safeKatex(it) : it));
			} else if (q.type === 'matrix') {
				if (Array.isArray(qd.statements)) {
					qd.statements = qd.statements.map((s: any) => (typeof s === 'string' ? safeKatex(s) : s));
				}
				if (Array.isArray(qd.columns)) {
					qd.columns = qd.columns.map((c: any) => (typeof c === 'string' ? safeKatex(c) : c));
				}
			}

			return {
				...inst,
				quizQuestion: {
					...q,
					questionText: safeKatex(q.questionText),
					...(q.questionTextAr ? { questionTextAr: safeKatex(q.questionTextAr) } : {}),
					explanation: safeKatex(q.explanation),
					questionData: qd
				},
				hints: [safeKatex(inst.hints[0]), safeKatex(inst.hints[1]), safeKatex(inst.hints[2])],
				solutionStepsAr: inst.solutionStepsAr.map(safeKatex)
			};
		}
	};
}

// ══════════════════════════════════════════════════════════════════════════════
// Custom SVG Generators (4AP T2)
// ══════════════════════════════════════════════════════════════════════════════

function wrapLocalSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/** Vertical multiplication layout card (no RTL text inside SVG to ensure clean Typst + Browser rendering). */
function svgVerticalMultiply(a: number, b: number): string {
	const w = 230;
	const h = 138;
	const sa = String(a).split('').join(' ');
	const sb = String(b).split('').join(' ');
	const body = [
		`<rect x="8" y="8" width="214" height="122" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>`,
		`<text x="166" y="42" text-anchor="end" font-size="22" font-weight="bold" fill="#0f172a" letter-spacing="3">${sa}</text>`,
		`<text x="68" y="74" text-anchor="middle" font-size="20" font-weight="bold" fill="#0f172a">×</text>`,
		`<text x="166" y="74" text-anchor="end" font-size="22" font-weight="bold" fill="#0f172a" letter-spacing="3">${sb}</text>`,
		`<line x1="48" y1="86" x2="178" y2="86" stroke="#0f172a" stroke-width="2.2"/>`,
		`<text x="115" y="116" text-anchor="middle" font-size="22" font-weight="bold" fill="#2563eb">?</text>`
	].join('');
	return wrapLocalSvg(w, h, body);
}

type AngleKind = 'acute' | 'right' | 'obtuse';

/** Angle comparison SVG WITHOUT any degree numbers or protractor markings (uses dashed set-square reference). */
function svgAnglesNoDegrees(
	opts:
		| { mode: 'trio'; order: readonly [AngleKind, AngleKind, AngleKind] }
		| { mode: 'arms_trap' }
): string {
	if (opts.mode === 'trio') {
		const w = 420;
		const h = 148;
		const parts: string[] = [
			`<rect x="6" y="6" width="408" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`
		];
		const colors: Record<AngleKind, string> = {
			acute: '#15803d',
			right: '#1d4ed8',
			obtuse: '#dc2626'
		};

		opts.order.forEach((kind, idx) => {
			const bx = 14 + idx * 134;
			const vx = kind === 'obtuse' ? bx + 56 : bx + 28;
			const vy = 104;
			parts.push(
				`<rect x="${bx}" y="16" width="124" height="114" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`,
				// Faint yellow right-angle set-square reference (الكوس)
				`<polygon points="${vx},${vy} ${vx + 56},${vy} ${vx},${vy - 56}" fill="#fef08a" fill-opacity="0.55" stroke="#ca8a04" stroke-width="1.2" stroke-dasharray="4 2"/>`
			);

			const col = colors[kind];
			if (kind === 'right') {
				parts.push(
					`<line x1="${vx}" y1="${vy}" x2="${vx + 64}" y2="${vy}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<line x1="${vx}" y1="${vy}" x2="${vx}" y2="${vy - 64}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<path d="M ${vx + 20} ${vy} A 20 20 0 0 0 ${vx} ${vy - 20}" fill="none" stroke="${col}" stroke-width="1.8"/>`
				);
			} else if (kind === 'acute') {
				parts.push(
					`<line x1="${vx}" y1="${vy}" x2="${vx + 68}" y2="${vy}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<line x1="${vx}" y1="${vy}" x2="${vx + 52}" y2="${vy - 46}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<path d="M ${vx + 22} ${vy} A 22 22 0 0 0 ${vx + 16.5} ${vy - 14.5}" fill="none" stroke="${col}" stroke-width="1.8"/>`
				);
			} else {
				parts.push(
					`<line x1="${vx}" y1="${vy}" x2="${vx + 58}" y2="${vy}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<line x1="${vx}" y1="${vy}" x2="${vx - 40}" y2="${vy - 52}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`,
					`<path d="M ${vx + 20} ${vy} A 20 20 0 0 0 ${vx - 12} ${vy - 16}" fill="none" stroke="${col}" stroke-width="1.8"/>`
				);
			}

			parts.push(
				`<circle cx="${vx}" cy="${vy}" r="3.2" fill="#0f172a"/>`,
				`<text x="${bx + 62}" y="124" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">(${idx + 1})</text>`
			);
		});

		return wrapLocalSvg(w, h, parts.join(''));
	}

	// 'arms_trap': E is acute with very long arms, F is obtuse with short arms
	const w = 400;
	const h = 136;
	const body = [
		`<rect x="6" y="6" width="388" height="124" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`,
		// Panel E (acute, long arms)
		`<rect x="14" y="14" width="210" height="108" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`,
		`<polygon points="34,94 86,94 34,42" fill="#fef08a" fill-opacity="0.45" stroke="#ca8a04" stroke-width="1.1" stroke-dasharray="3 2"/>`,
		`<line x1="34" y1="94" x2="208" y2="94" stroke="#1d4ed8" stroke-width="2.4" stroke-linecap="round"/>`,
		`<line x1="34" y1="94" x2="192" y2="36" stroke="#1d4ed8" stroke-width="2.4" stroke-linecap="round"/>`,
		`<path d="M 60 94 A 26 26 0 0 0 58 85" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>`,
		`<circle cx="34" cy="94" r="3.2" fill="#0f172a"/>`,
		`<text x="26" y="109" font-size="13" font-weight="bold" fill="#1d4ed8">E</text>`,
		// Panel F (obtuse, short arms)
		`<rect x="234" y="14" width="152" height="108" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`,
		`<polygon points="316,94 362,94 316,48" fill="#fef08a" fill-opacity="0.45" stroke="#ca8a04" stroke-width="1.1" stroke-dasharray="3 2"/>`,
		`<line x1="316" y1="94" x2="368" y2="94" stroke="#dc2626" stroke-width="2.4" stroke-linecap="round"/>`,
		`<line x1="316" y1="94" x2="278" y2="58" stroke="#dc2626" stroke-width="2.4" stroke-linecap="round"/>`,
		`<path d="M 336 94 A 20 20 0 0 0 302 80" fill="none" stroke="#dc2626" stroke-width="1.8"/>`,
		`<circle cx="316" cy="94" r="3.2" fill="#0f172a"/>`,
		`<text x="316" y="112" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">F</text>`
	].join('');
	return wrapLocalSvg(w, h, body);
}

/** Circle elements diagram (center O, diameter [AB], radius [OM], chord [CD]) or circle + right-isosceles OAB. */
function svgCircleElements(opts: {
	radiusCm: number;
	variant: 'parts' | 'right_isosceles';
}): string {
	const w = 260;
	const h = 175;
	const cx = 130;
	const cy = 88;
	const r = 62;
	if (opts.variant === 'parts') {
		const body = [
			`<rect x="6" y="6" width="248" height="163" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`,
			`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.2"/>`,
			// Diameter [AB]
			`<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#7c3aed" stroke-width="2.2"/>`,
			// Radius [OM]
			`<line x1="${cx}" y1="${cy}" x2="${cx + 42}" y2="${cy - 45}" stroke="#15803d" stroke-width="2.2"/>`,
			// Chord [CD]
			`<line x1="${cx - 46}" y1="${cy - 41}" x2="${cx + 22}" y2="${cy - 58}" stroke="#dc2626" stroke-width="2.2"/>`,
			`<circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/>`,
			`<text x="${cx - 4}" y="${cy + 15}" font-size="12" font-weight="bold" fill="#0f172a">O</text>`,
			`<text x="${cx - r - 14}" y="${cy + 4}" font-size="12" font-weight="bold" fill="#7c3aed">A</text>`,
			`<text x="${cx + r + 6}" y="${cy + 4}" font-size="12" font-weight="bold" fill="#7c3aed">B</text>`,
			`<text x="${cx + 46}" y="${cy - 46}" font-size="12" font-weight="bold" fill="#15803d">M</text>`,
			`<text x="${cx + 26}" y="${cy - 18}" font-size="11" font-weight="bold" fill="#15803d">${opts.radiusCm} cm</text>`,
			`<text x="${cx - 58}" y="${cy - 44}" font-size="12" font-weight="bold" fill="#dc2626">C</text>`,
			`<text x="${cx + 25}" y="${cy - 62}" font-size="12" font-weight="bold" fill="#dc2626">D</text>`
		].join('');
		return wrapLocalSvg(w, h, body);
	}

	// right_isosceles: triangle OAB inside circle with right angle at O and dashed diameter [AC]
	const body = [
		`<rect x="6" y="6" width="248" height="163" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`,
		`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>`,
		`<polygon points="${cx},${cy} ${cx},${cy - r} ${cx + r},${cy}" fill="#dcfce7" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + r}" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="4 3"/>`,
		`<rect x="${cx}" y="${cy - 11}" width="11" height="11" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		`<line x1="${cx - 5}" y1="${cy - r / 2}" x2="${cx + 5}" y2="${cy - r / 2}" stroke="#15803d" stroke-width="2"/>`,
		`<line x1="${cx + r / 2}" y1="${cy - 5}" x2="${cx + r / 2}" y2="${cy + 5}" stroke="#15803d" stroke-width="2"/>`,
		`<circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/>`,
		`<text x="${cx - 14}" y="${cy + 5}" font-size="12" font-weight="bold" fill="#0f172a">O</text>`,
		`<text x="${cx - 3}" y="${cy - r - 6}" font-size="12" font-weight="bold" fill="#1d4ed8">A</text>`,
		`<text x="${cx + r + 6}" y="${cy + 4}" font-size="12" font-weight="bold" fill="#1d4ed8">B</text>`,
		`<text x="${cx - 3}" y="${cy + r + 14}" font-size="12" font-weight="bold" fill="#7c3aed">C</text>`,
		`<text x="${cx - 36}" y="${cy - r / 2 + 4}" font-size="11" font-weight="bold" fill="#15803d">${opts.radiusCm} cm</text>`
	].join('');
	return wrapLocalSvg(w, h, body);
}

/** Equilateral or isosceles triangle with tick marks and side labels. */
function svgSpecialTriangle(opts: {
	kind: 'equilateral' | 'isosceles';
	labels: [string, string, string];
	sideCm: number;
	baseCm?: number;
}): string {
	const w = 250;
	const h = 168;
	const top = { x: 125, y: 26 };
	const left = opts.kind === 'equilateral' ? { x: 60, y: 136 } : { x: 78, y: 136 };
	const right = opts.kind === 'equilateral' ? { x: 190, y: 136 } : { x: 172, y: 136 };
	const baseVal = opts.kind === 'equilateral' ? opts.sideCm : (opts.baseCm ?? opts.sideCm - 2);
	const parts: string[] = [
		`<rect x="6" y="6" width="238" height="156" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`,
		`<polygon points="${top.x},${top.y} ${left.x},${left.y} ${right.x},${right.y}" fill="#fefce8" stroke="#b45309" stroke-width="2.2"/>`,
		// Congruence marks on left & right sides
		`<line x1="${(top.x + left.x) / 2 - 5}" y1="${(top.y + left.y) / 2 - 3}" x2="${(top.x + left.x) / 2 + 5}" y2="${(top.y + left.y) / 2 + 3}" stroke="#dc2626" stroke-width="2"/>`,
		`<line x1="${(top.x + right.x) / 2 - 5}" y1="${(top.y + right.y) / 2 + 3}" x2="${(top.x + right.x) / 2 + 5}" y2="${(top.y + right.y) / 2 - 3}" stroke="#dc2626" stroke-width="2"/>`
	];
	if (opts.kind === 'equilateral') {
		parts.push(
			`<line x1="${(left.x + right.x) / 2}" y1="${left.y - 6}" x2="${(left.x + right.x) / 2}" y2="${left.y + 6}" stroke="#dc2626" stroke-width="2"/>`
		);
	}
	parts.push(
		`<text x="${top.x}" y="${top.y - 7}" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${opts.labels[0]}</text>`,
		`<text x="${left.x - 14}" y="${left.y + 8}" font-size="13" font-weight="bold" fill="#0f172a">${opts.labels[1]}</text>`,
		`<text x="${right.x + 8}" y="${right.y + 8}" font-size="13" font-weight="bold" fill="#0f172a">${opts.labels[2]}</text>`,
		`<text x="${(top.x + left.x) / 2 - 26}" y="${(top.y + left.y) / 2}" font-size="11" font-weight="bold" fill="#1e293b">${opts.sideCm} cm</text>`,
		`<text x="${(top.x + right.x) / 2 + 10}" y="${(top.y + right.y) / 2}" font-size="11" font-weight="bold" fill="#1e293b">${opts.sideCm} cm</text>`,
		`<text x="${(left.x + right.x) / 2}" y="${left.y + 20}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${baseVal} cm</text>`
	);
	return wrapLocalSvg(w, h, parts.join(''));
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. 2-digit vertical multiplication (< 1,000,000) + x10/100/1000 multiples
// ══════════════════════════════════════════════════════════════════════════════
const templateMultiplication2Digit: ParameterizedTemplate = {
	id: '4ap_t2_multiplication_2digit',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الضرب العمودي في عدد ذي رقمين والضرب في 10 و100 و1000',
	curriculumLessonId: 'lesson_4ap_t2_multiplication_2digit',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 101 + difficultyOffset(difficulty));

		let a: number;
		let b: number;
		let mentalA: number;
		let mentalFactor: number;
		let wpCount: number;
		let wpUnit: number;

		if (difficulty === 'easy') {
			a = rng.int(21, 89);
			if (a % 10 === 0) a += 3;
			b = rng.int(12, 39);
			if (b % 10 === 0) b += 2;
			mentalA = rng.int(14, 89);
			mentalFactor = rng.pick([10, 100, 1000]);
			wpCount = rng.int(12, 28);
			if (wpCount % 10 === 0) wpCount += 2;
			wpUnit = rng.int(25, 75);
		} else if (difficulty === 'medium') {
			a = rng.int(124, 489);
			if (a % 10 === 0) a += 4;
			b = rng.int(23, 68);
			if (b % 10 === 0) b += 3;
			mentalA = rng.int(15, 75);
			mentalFactor = rng.pick([20, 30, 40, 200, 300]);
			wpCount = rng.int(16, 44);
			if (wpCount % 10 === 0) wpCount += 4;
			wpUnit = rng.int(115, 285);
		} else {
			a = rng.int(1245, 5895);
			if (a % 10 === 0) a += 7;
			b = rng.int(24, 79);
			if (b % 10 === 0) b += 4;
			mentalA = rng.int(24, 95);
			mentalFactor = rng.pick([300, 400, 500, 2000]);
			wpCount = rng.int(24, 58);
			if (wpCount % 10 === 0) wpCount += 3;
			wpUnit = rng.int(1250, 3850);
		}

		const prod = a * b; // Guaranteed < 1,000,000 (max ~465,705)
		const mentalProd = mentalA * mentalFactor; // Max 190,000 < 1,000,000
		const wpProd = wpCount * wpUnit; // Max 223,300 < 1,000,000

		const units = b % 10;
		const tens = Math.floor(b / 10);
		const partial1 = a * units;
		const partial2NoZero = a * tens;
		const partial2 = partial2NoZero * 10;

		const forgotTensZero = partial1 + partial2NoZero;
		const extraTensZeroCandidate = partial1 + partial2NoZero * 100;
		const extraTensZero = extraTensZeroCandidate < 1_000_000 ? extraTensZeroCandidate : prod + 1000;
		const carryErr = prod > 250 ? prod - 100 : prod + 100;

		const distractors = [
			{
				text: `$${formatKatexNum(forgotTensZero)}$`,
				diagnosticFeedback: `نسيت وضع الصفر ($0$) في خانة الآحاد في السطر الثاني عند الضرب في العشرات ($${tens * 10}$)!`
			},
			{
				text: `$${formatKatexNum(extraTensZero)}$`,
				diagnosticFeedback: `تحقق من عدد الأصفار المضافة في السطر الثاني؛ نضع صفراً واحداً ($0$) عند الضرب في العشرات.`
			},
			{
				text: `$${formatKatexNum(carryErr)}$`,
				diagnosticFeedback: `راجع الاحتفاظ أثناء حساب الجداءات الجزئية أو عند جمع السطرين عمودياً.`
			}
		];

		const mcqBuilt = buildUniqueMcqOptions(`$${formatKatexNum(prod)}$`, distractors, rng);
		const svgUrl = saveSvgAsset(`4ap_t2_mul_${difficulty}_s${seed}`, svgVerticalMultiply(a, b));

		const wpCtx = rng.pick([
			{ item: 'علبة أقلام', per: 'قلماً في كل علبة', unitLabel: 'قلماً', subject: 'أمين مكتبة' },
			{ item: 'صندوق برتقال', per: 'كيلوغراماً في كل صندوق', unitLabel: 'كلغ', subject: 'تاجر فواكه' },
			{ item: 'رزمة كراريس', per: 'كراساً في كل رزمة', unitLabel: 'كراساً', subject: 'مدير مدرسة' }
		]);

		const questionText = `تأمّل عملية الضرب العمودي المقابلة: ما هو الناتج الصحيح للجداء $${formatKatexNum(a)} \\times ${b}$؟`;

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أنجز العمليات الآتية بدقة:',
			content: [
				{
					type: 'columns',
					widths: ['1.5fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب ذهنياً: $${formatTypstMathNum(mentalA)} times ${formatTypstMathNum(mentalFactor)} = ".........."$`,
							answer: `1) $${formatTypstMathNum(mentalA)} times ${formatTypstMathNum(mentalFactor)} = ${formatTypstMathNum(mentalProd)}$`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'العملية العمودية'
						}
					]
				},
				{
					type: 'text',
					content: `2) أنجز الضرب العمودي المبيّن في الشكل المقابل: $${formatTypstMathNum(a)} times ${b}$`,
					answer: `2) $${formatTypstMathNum(a)} times ${units} = ${formatTypstMathNum(partial1)}$ ، و $${formatTypstMathNum(a)} times ${tens * 10} = ${formatTypstMathNum(partial2)}$ ، والمجموع: $${formatTypstMathNum(prod)}$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) اشترى ${wpCtx.subject} $${wpCount}$ ${wpCtx.item}، يوجد $${formatTypstMathNum(wpUnit)}$ ${wpCtx.per}. ما هو العدد الإجمالي؟`,
					answer: `3) $${formatTypstMathNum(wpUnit)} times ${wpCount} = ${formatTypstMathNum(wpProd)}$ ${wpCtx.unitLabel}`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgUrl,
				imageCaption: `الضرب العمودي: ${formatSpaceAscii(a)} × ${b}`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نضرب في رقم الآحاد ($${a} \\times ${units} = ${partial1}$)، ثم نضع $0$ تحت الآحاد ونضرب في رقم العشرات ($${a} \\times ${tens} = ${partial2NoZero}$ أي $${partial2}$)، ثم نجمع: $${partial1} + ${partial2} = ${prod}$.`
			},
			sujetExercise,
			hints: [
				`السطر الأول: اضرب $${formatKatexNum(a)}$ في رقم الآحاد ($${units}$).`,
				`في السطر الثاني: لا تنسَ وضع الرقم $0$ في منزلة الآحاد قبل الضرب في رقم العشرات ($${tens}$).`,
				`اجمع الناتجين: $${formatKatexNum(partial1)} + ${formatKatexNum(partial2)}$.`
			],
			solutionStepsAr: [
				`جداء الآحاد: $${formatKatexNum(a)} \\times ${units} = ${formatKatexNum(partial1)}$`,
				`جداء العشرات: $${formatKatexNum(a)} \\times ${tens * 10} = ${formatKatexNum(partial2)}$`,
				`المجموع النهائي: $${formatKatexNum(partial1)} + ${formatKatexNum(partial2)} = ${formatKatexNum(prod)}$`
			],
			finalAnswer: formatSpaceAscii(prod)
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. Euclidean division by 1-digit divisor (a = b * q + r, r < b) & multiples
// ══════════════════════════════════════════════════════════════════════════════
const templateEuclideanDivision: ParameterizedTemplate = {
	id: '4ap_t2_euclidean_division',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'مضاعفات أعداد مألوفة والقسمة الإقليدية على قاسم ذي رقم واحد',
	curriculumLessonId: 'lesson_4ap_t2_multiples_euclidean_division',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 137 + difficultyOffset(difficulty));

		let b: number;
		let q: number;
		if (difficulty === 'easy') {
			b = rng.int(3, 6);
			q = rng.int(12, 28);
		} else if (difficulty === 'medium') {
			b = rng.int(4, 9);
			q = rng.int(32, 88);
		} else {
			b = rng.int(6, 9);
			q = rng.int(112, 265);
		}
		const r = rng.int(1, b - 1);
		const a = b * q + r;

		const powLow = q < 100 ? 10 : 100;
		const powHigh = powLow * 10;
		const lowBound = b * powLow;
		const highBound = b * powHigh;
		const digitsLabel = q < 100 ? 'رقمين' : '3 أرقام';

		// Common multiples sub-question for SujetBuilder
		const multPair = rng.pick([
			{ f1: 2, f2: 5, lcm: 10, kStart: 3 },
			{ f1: 3, f2: 5, lcm: 15, kStart: 2 },
			{ f1: 2, f2: 25, lcm: 50, kStart: 1 }
		]);
		const multAns = multPair.lcm * multPair.kStart;
		const multMin = multAns - 6;
		const multMax = multAns + 6;

		const ctx = rng.pick([
			{ item: 'حبة رمان', container: 'علب', perContainer: 'علبة', verb: 'وضع' },
			{ item: 'قلماً', container: 'حزم', perContainer: 'حزمة', verb: 'جمع' },
			{ item: 'كراساً', container: 'أكياس', perContainer: 'كيس', verb: 'ترتيب' },
			{ item: 'حبة مشمش', container: 'سلال', perContainer: 'سلة', verb: 'توزيع' }
		]);

		const variant = ((seed - 1) % 3 + 3) % 3;
		let questionText: string;
		let displayTemplate: string;
		let expectedAnswer: number;
		let finalAnswer: string;

		if (variant === 0) {
			expectedAnswer = q;
			finalAnswer = String(q);
			questionText = `أراد بستاني ${ctx.verb} $${formatKatexNum(a)}$ ${ctx.item} بالتساوي في ${ctx.container} تتسع كل ${ctx.perContainer} لـ $${b}$. أنجز القسمة الإقليدية للعدد $${formatKatexNum(a)}$ على $${b}$ ثم اكتب **الحاصل** (عدد الـ${ctx.container} المملوءة تماماً).`;
			displayTemplate = `${a} ÷ ${b}  →  الحاصل = ؟`;
		} else if (variant === 1) {
			expectedAnswer = r;
			finalAnswer = String(r);
			questionText = `وزّع فلاح $${formatKatexNum(a)}$ ${ctx.item} بالتساوي في ${ctx.container} سعة كل ${ctx.perContainer} $${b}$. أنجز القسمة الإقليدية للعدد $${formatKatexNum(a)}$ على $${b}$ ثم اكتب **الباقي** (الذي يجب أن يكون أصغر من $${b}$).`;
			displayTemplate = `${a} ÷ ${b}  →  الباقي = ؟`;
		} else {
			expectedAnswer = a;
			finalAnswer = formatSpaceAscii(a);
			questionText = `في قسمة إقليدية على قاسم ذي رقم واحد، القاسم هو $${b}$، والحاصل هو $${q}$، والباقي هو $${r}$ (حيث $${r} < ${b}$). احسب **المقسوم**.`;
			displayTemplate = `${b} × ${q} + ${r} = ؟`;
		}

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية حول المضاعفات والقسمة الإقليدية:',
			content: [
				{
					type: 'text',
					content: `1) جد عدداً طبيعياً محصوراً بين $${multMin}$ و $${multMax}$ يكون مضاعفاً للعددين $${multPair.f1}$ و $${multPair.f2}$ معاً، ثم احصر العدد $${formatTypstMathNum(a)}$ بين $${b} times ${powLow}$ و $${b} times ${formatTypstMathNum(powHigh)}$.`,
					answer: `1) المضاعف المشترك المحصور هو $${multAns}$ ، والحصر: $${formatTypstMathNum(lowBound)} <= ${formatTypstMathNum(a)} < ${formatTypstMathNum(highBound)}$ (إذن الحاصل من ${digitsLabel}).`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) أنجز القسمة الإقليدية للعدد $${formatTypstMathNum(a)}$ على $${b}$ عمودياً، ثم أكمل المساواة: $${formatTypstMathNum(a)} = ${b} times "..." + "..."$`,
					answer: `2) الحاصل هو $${q}$ والباقي هو $${r}$ (مع $${r} < ${b}$)، والمساواة: $${formatTypstMathNum(a)} = ${b} times ${q} + ${r}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				questionData: {
					answer: expectedAnswer,
					displayTemplate,
					variables: [],
					tolerance: 0
				},
				explanation: `نطبق مساواة القسمة الإقليدية: المقسوم = القاسم × الحاصل + الباقي ($${a} = ${b} \\times ${q} + ${r}$)، مع التحقق من أن الباقي أصغر تماماً من القاسم ($${r} < ${b}$).`
			},
			sujetExercise,
			hints: [
				variant === 2
					? `تذكّر المساواة: المقسوم = (القاسم × الحاصل) + الباقي.`
					: `ابدأ بحصر المقسوم $${formatKatexNum(a)}$ بين $${b} \\times ${powLow} = ${formatKatexNum(lowBound)}$ و $${b} \\times ${powHigh} = ${formatKatexNum(highBound)}$ لتحديد عدد أرقام الحاصل (${digitsLabel}).`,
				variant === 2
					? `احسب أولاً الجداء $${b} \\times ${q} = ${formatKatexNum(b * q)}$ ثم أضف الباقي $${r}$.`
					: `استعن بجدول مضاعفات القاسم $${b}$ لطرح أكبر مضاعف لا يتجاوز العدد في كل مرحلة من القسمة العمودية.`,
				`تحقق دائماً من أن الباقي ($${r}$) أصغر تماماً من القاسم ($${b}$) وأن $${b} \\times ${q} + ${r} = ${formatKatexNum(a)}$.`
			],
			solutionStepsAr: [
				`الحصر: $${b} \\times ${powLow} = ${formatKatexNum(lowBound)} \\le ${formatKatexNum(a)} < ${formatKatexNum(highBound)} = ${b} \\times ${powHigh}$ (الحاصل من ${digitsLabel}).`,
				variant === 2
					? `حساب المقسوم: $${b} \\times ${q} + ${r} = ${formatKatexNum(b * q)} + ${r} = ${formatKatexNum(a)}$.`
					: `القسمة الإقليدية لـ $${formatKatexNum(a)}$ على $${b}$ تعطي الحاصل $${q}$ والباقي $${r}$.`,
				`المساواة والتحقق: $${formatKatexNum(a)} = ${b} \\times ${q} + ${r}$ مع $${r} < ${b}$.`
			],
			finalAnswer
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. Simple fractions (svgFractionBar, comparing to 1, decomposing & framing)
// ══════════════════════════════════════════════════════════════════════════════
const templateSimpleFractions: ParameterizedTemplate = {
	id: '4ap_t2_simple_fractions',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الكسور البسيطة: القراءة والتمثيل والمقارنة والحصر',
	curriculumLessonId: 'lesson_4ap_t2_simple_fractions',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 149 + difficultyOffset(difficulty));

		const total = rng.pick([3, 4, 5, 6, 8]);
		const validShaded: number[] = [];
		for (let s = 1; s < total; s++) {
			if (s * 2 !== total) validShaded.push(s);
		}
		const shaded = rng.pick(validShaded);
		const unshaded = total - shaded;

		const svgUrl = saveSvgAsset(`4ap_t2_frac_${difficulty}_s${seed}`, svgFractionBar(shaded, total));

		let questionText: string;
		let correctOpt: string;
		let distractors: { text: string; diagnosticFeedback: string }[];
		let hints: [string, string, string];
		let steps: string[];
		let finalAnswer: string;
		let explanation: string;

		if (difficulty === 'easy') {
			questionText = `الشريط المقابل يمثّل وحدة مجزّأة إلى $${total}$ أجزاء متساوية. ما الكسر الذي يعبّر عن الجزء الملوّن بالأزرق؟`;
			correctOpt = `$\\frac{${shaded}}{${total}}$`;
			distractors = [
				{
					text: `$\\frac{${unshaded}}{${total}}$`,
					diagnosticFeedback: `انتبه! لقد عددت الأجزاء البيضاء غير الملوّنة بدل الأجزاء الملوّنة بالأزرق.`
				},
				{
					text: `$\\frac{${total}}{${shaded}}$`,
					diagnosticFeedback: `عكست البسط والمقام؛ عدد الأجزاء الملوّنة ($${shaded}$) يكتب في البسط (فوق خط الكسر) وعدد كل الأجزاء ($${total}$) في المقام.`
				},
				{
					text: `$\\frac{${shaded}}{${unshaded}}$`,
					diagnosticFeedback: `المقام يعبّر عن عدد جميع أجزاء الوحدة المتساوية ($${total}$) وليس الأجزاء غير الملوّنة فقط.`
				}
			];
			hints = [
				`عدّ جميع الأجزاء المتساوية في الشريط: هذا العدد يمثّل المقام.`,
				`عدّ الأجزاء الملوّنة بالأزرق فقط: هذا العدد يمثّل البسط.`,
				`نكتب الكسر بوضع البسط ($${shaded}$) فوق خط الكسر والمقام ($${total}$) تحته.`
			];
			steps = [
				`عدد جميع الأجزاء المتساوية في الوحدة: $${total}$ (المقام).`,
				`عدد الأجزاء الملوّنة بالأزرق: $${shaded}$ (البسط).`,
				`الكسر المعبر عن الجزء الملوّن هو: $\\frac{${shaded}}{${total}}$ (وهو أصغر من $1$ لأن $${shaded} < ${total}$).`
			];
			finalAnswer = `${shaded}/${total}`;
			explanation = `الشريط مقسم إلى ${total} أجزاء متساوية ولُوّن منها ${shaded} أجزاء، إذن الكسر هو ${shaded}/${total}.`;
		} else if (difficulty === 'medium') {
			questionText = `يمثّل الجزء الملوّن بالأزرق في الشريط الكسر $\\frac{${shaded}}{${total}}$. ما هو الكسر الذي يعبّر عن **الجزء المتبقي** للوصول إلى الوحدة الكاملة ($1 = \\frac{${total}}{${total}}$)؟`;
			correctOpt = `$\\frac{${unshaded}}{${total}}$`;
			distractors = [
				{
					text: `$\\frac{${shaded}}{${total}}$`,
					diagnosticFeedback: `هذا هو الكسر الذي يمثّل الجزء الملوّن بالأزرق، والمطلوب هو الجزء المتبقي (غير الملوّن).`
				},
				{
					text: `$\\frac{${total}}{${unshaded}}$`,
					diagnosticFeedback: `عكست البسط والمقام؛ المقام يبقى دائماً مساوياً لعدد أجزاء الوحدة ($${total}$).`
				},
				{
					text: `$\\frac{${unshaded}}{${shaded}}$`,
					diagnosticFeedback: `المقام يجب أن يكون عدد كل الأجزاء المتساوية ($${total}$) وليس عدد الأجزاء الملوّنة.`
				}
			];
			hints = [
				`الوحدة الكاملة تساوي $\\frac{${total}}{${total}}$.`,
				`عدد الأجزاء غير الملوّنة يساوي $${total} - ${shaded}$.`,
				`نكتب الناتج في البسط ونحتفظ بنفس المقام $${total}$.`
			];
			steps = [
				`الوحدة الكاملة المقسّمة إلى $${total}$ أجزاء هي $\\frac{${total}}{${total}}$.`,
				`الجزء المتبقي: $\\frac{${total}}{${total}} - \\frac{${shaded}}{${total}} = \\frac{${total - shaded}}{${total}} = \\frac{${unshaded}}{${total}}$.`
			];
			finalAnswer = `${unshaded}/${total}`;
			explanation = `الوحدة تساوي ${total}/${total}، وللوصول إليها انطلاقاً من ${shaded}/${total} ينقصنا ${unshaded}/${total}.`;
		} else {
			const whole = rng.int(1, 4);
			const improperNum = whole * total + shaded;
			const wrongAddedDirect = whole + shaded;
			const wrongUsedUnshaded = whole * total + unshaded;
			questionText = `يمثّل الجزء الملوّن بالأزرق في الشريط الكسر $\\frac{${shaded}}{${total}}$. إذا أضفنا إليه $${whole}$ وحدات كاملة ($${whole} + \\frac{${shaded}}{${total}}$)، فما هو الكسر الذي يساوي هذا المجموع؟`;
			correctOpt = `$\\frac{${improperNum}}{${total}}$`;
			distractors = [
				{
					text: `$\\frac{${wrongAddedDirect}}{${total}}$`,
					diagnosticFeedback: `انتبه! كل وحدة كاملة تساوي $\\frac{${total}}{${total}}$ وليس $\\frac{1}{${total}}$، لذا يجب ضرب $${whole} \\times ${total}$ أولاً.`
				},
				{
					text: `$\\frac{${wrongUsedUnshaded}}{${total}}$`,
					diagnosticFeedback: `عددت الأجزاء غير الملوّنة ($${unshaded}$) بدل الأجزاء الملوّنة ($${shaded}$).`
				},
				{
					text: `$\\frac{${total}}{${improperNum}}$`,
					diagnosticFeedback: `قلبت البسط والمقام؛ الكسر الأكبر من الوحدة يكون بسطه أكبر من مقامه.`
				}
			];
			hints = [
				`تذكّر أن الوحدة الكاملة الواحدة تساوي $\\frac{${total}}{${total}}$.`,
				`إذن $${whole}$ وحدات كاملة تساوي $\\frac{${whole} \\times ${total}}{${total}} = \\frac{${whole * total}}{${total}}$.`,
				`اجمع البسطين مع الاحتفاظ بنفس المقام $${total}$: $${whole * total} + ${shaded}$.`
			];
			steps = [
				`نحوّل $${whole}$ وحدات إلى كسر مقامه $${total}$: $${whole} = \\frac{${whole * total}}{${total}}$.`,
				`نجمع: $\\frac{${whole * total}}{${total}} + \\frac{${shaded}}{${total}} = \\frac{${improperNum}}{${total}}$.`,
				`ونلاحظ أن الحصر هو: $${whole} < \\frac{${improperNum}}{${total}} < ${whole + 1}$.`
			];
			finalAnswer = `${improperNum}/${total}`;
			explanation = `كل وحدة تساوي ${total}/${total}، إذن ${whole} + ${shaded}/${total} = (${whole * total} + ${shaded})/${total} = ${improperNum}/${total}.`;
		}

		const mcqBuilt = buildUniqueMcqOptions(correctOpt, distractors, rng);

		// SujetExercise: reading bar + same-denominator comparison + improper fraction decomposition & framing
		const impDen = rng.pick([4, 5, 6]);
		const impQ = rng.int(2, 4);
		const impR = rng.int(1, impDen - 1);
		const impNum = impQ * impDen + impR;
		const smallNum = rng.int(1, impDen - 1);

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية حول الكسور البسيطة:',
			content: [
				{
					type: 'columns',
					widths: ['1.6fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) عبّر بكسر عن الجزء الملوّن بالأزرق في الشريط المقابل، ثم قارنه بالوحدة ($1$).`,
							answer: `1) الكسر هو: $frac(${shaded}, ${total})$ ، وهو أصغر من الوحدة: $frac(${shaded}, ${total}) < 1$ لأن $${shaded} < ${total}$.`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'شريط الوحدة'
						}
					]
				},
				{
					type: 'text',
					content: `2) رتّب تصاعدياً الكسور الآتية: $frac(${impNum}, ${impDen})$ ، $frac(${smallNum}, ${impDen})$ ، $frac(${impDen}, ${impDen})$`,
					answer: `2) $frac(${smallNum}, ${impDen}) < frac(${impDen}, ${impDen}) < frac(${impNum}, ${impDen})$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) فكّك الكسر $frac(${impNum}, ${impDen})$ إلى عدد طبيعي وكسر أصغر من $1$، ثم احصره بين عددين طبيعيين متتاليين.`,
					answer: `3) التفكيك: $frac(${impNum}, ${impDen}) = ${impQ} + frac(${impR}, ${impDen})$ ، والحصر: $${impQ} < frac(${impNum}, ${impDen}) < ${impQ + 1}$`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
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
			solutionStepsAr: steps,
			finalAnswer
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. Decimal fractions (/10, /100) & intro to decimal numbers (< 1000)
// ══════════════════════════════════════════════════════════════════════════════
const templateDecimalFractionsDecimals: ParameterizedTemplate = {
	id: '4ap_t2_decimal_fractions_decimals',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الكسور العشرية والأعداد العشرية: التفكيك والمقارنة والتمثيل',
	curriculumLessonId: 'lesson_4ap_t2_decimal_fractions_decimals_intro',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 163 + difficultyOffset(difficulty));

		// Keep every integer strictly < 1000
		const baseInt = rng.int(1, 8);
		const tenthDigit = rng.pick([1, 2, 3, 4, 6, 7, 8, 9]);
		const hundredthDigit = rng.pick([2, 3, 4, 6, 7, 8]);

		// Number line SVG
		let nlMin: number;
		let nlMax: number;
		let nlStep: number;
		let nlVal: number;
		let nlLabel: string;

		if (difficulty === 'hard') {
			const subBase = rng.int(1, 7);
			nlMin = roundTo(baseInt + subBase / 10, 1);
			nlMax = roundTo(nlMin + 0.2, 1);
			nlStep = 0.1;
			const offset = rng.pick([3, 4, 6, 7, 8, 12, 13, 14, 17, 18]);
			nlVal = roundTo(nlMin + offset / 100, 2);
			nlLabel = 'P';
		} else {
			nlMin = baseInt;
			nlMax = baseInt + 1;
			nlStep = 1;
			nlVal = roundTo(baseInt + tenthDigit / 10, 1);
			nlLabel = 'A';
		}

		const svgUrl = saveSvgAsset(
			`4ap_t2_dec_${difficulty}_s${seed}`,
			svgNumberLine({
				min: nlMin,
				max: nlMax,
				step: nlStep,
				subTicks: 10,
				marks: [{ value: nlVal, label: nlLabel, color: '#dc2626' }]
			})
		);

		const nlValStr = difficulty === 'hard' ? nlVal.toFixed(2) : nlVal.toFixed(1);
		const nlFracDen = difficulty === 'hard' ? 100 : 10;
		const nlFracNum = Math.round(nlVal * nlFracDen); // strictly < 1000 since baseInt <= 8

		// Decimal fraction decomposition for SujetBuilder (includes zero-tenths in medium/hard!)
		const decW = rng.int(2, 9);
		const decT = difficulty === 'easy' ? rng.int(1, 8) : seed % 2 === 0 ? 0 : rng.int(1, 9);
		const decH = rng.int(1, 9);
		const decNum100 = decW * 100 + decT * 10 + decH; // <= 999 < 1000
		const decStr = `${decW}.${decT}${decH}`;

		// Comparison pair testing length misconception (e.g. 4.3 vs 4.28)
		const cmpW = rng.int(2, 9);
		const cmpBigT = rng.int(4, 8);
		const cmpSmallT = rng.int(1, cmpBigT - 1);
		const cmpSmallH = rng.int(2, 9);
		const cmpA = `${cmpW}.${cmpBigT}`;
		const cmpB = `${cmpW}.${cmpSmallT}${cmpSmallH}`;
		const betweenVal = `${cmpW}.${cmpSmallT}${Math.min(9, cmpSmallH + 1)}`;

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أجب عن الأسئلة الآتية حول الكسور العشرية والأعداد العشرية:',
			content: [
				{
					type: 'columns',
					widths: ['1.5fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) اقرأ العدد العشري الذي تشير إليه النقطة $${nlLabel}$ على نصف المستقيم المدرج، ثم اكتبه على شكل كسر عشري.`,
							answer: `1) $${nlLabel} = ${nlValStr} = frac(${nlFracNum}, ${nlFracDen})$`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'نصف مستقيم مدرج'
						}
					]
				},
				{
					type: 'text',
					content: `2) فكّك الكسر العشري $frac(${decNum100}, 100)$ ثم اكتبه بالفاصلة على شكل عدد عشري.`,
					answer: `2) $frac(${decNum100}, 100) = ${decW} + frac(${decT}, 10) + frac(${decH}, 100) = ${decStr}$`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) قارن باستعمال الرمز المناسب ($<$ أو $>$): $${cmpA}$ ...... $${cmpB}$ ، ثم أدرج عدداً عشرياً بين $${cmpB}$ و $${cmpA}$.`,
					answer: `3) $${cmpA} > ${cmpB}$ (لأن $${cmpA} = ${cmpW}.${cmpBigT}0$ ورقم الأعشار $${cmpBigT} > ${cmpSmallT}$)؛ عدد محصور بينهما: $${betweenVal}$`,
					mark: '0.5'
				}
			]
		};

		if (seed % 2 === 0) {
			// Fill-blank reading point from number line
			const questionText =
				difficulty === 'hard'
					? `لاحظ نصف المستقيم المدرج بالأجزاء من مئة المقابل. ما هو **العدد العشري** الذي تشير إليه النقطة $${nlLabel}$؟ (اكتب النقطة \`.\` عند الفاصلة)`
					: `لاحظ نصف المستقيم المدرج بالأعشار المقابل. ما هو **العدد العشري** الذي تشير إليه النقطة $${nlLabel}$؟ (اكتب النقطة \`.\` عند الفاصلة)`;
			const sentence = `تشير النقطة ${nlLabel} على نصف المستقيم المدرج إلى العدد العشري ___`;
			const acceptedAnswers = decimalAcceptedAnswers(nlVal);

			return {
				templateId: this.id,
				seed,
				grade: '4ap',
				trimesterId: 't2',
				difficulty,
				domain: 'numeric',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgUrl,
					imageCaption: `موضع النقطة ${nlLabel} على نصف المستقيم المدرج`,
					questionData: {
						sentence,
						acceptedAnswers,
						answers: acceptedAnswers
					},
					explanation:
						difficulty === 'hard'
							? `المسافة بين كل عشرين مقسّمة إلى $10$ أجزاء من مئة، وبعّد التدريجات الصغيرة بعد $${nlMin}$ نجد $${nlValStr}$.`
							: `الوحدة بين $${nlMin}$ و $${nlMax}$ مقسّمة إلى $10$ أعشار، والنقطة $${nlLabel}$ تقع عند العُشر رقم $${tenthDigit}$ أي $${nlValStr}$.`
				},
				sujetExercise,
				hints: [
					difficulty === 'hard'
						? `كل تدريجة صغيرة على هذا المستقيم تمثّل جزءاً واحداً من مئة ($0.01$).`
						: `كل تدريجة صغيرة بين $${nlMin}$ و $${nlMax}$ تمثّل عُشراً واحداً ($0.1$).`,
					`ابدأ العدّ من التدريجة الرئيسية الأقرب على اليسار ($${nlMin}$).`,
					`اكتب الجزء الصحيح، ثم الفاصلة، ثم الأجزاء العشرية.`
				],
				solutionStepsAr: [
					`قيمة كل تدريجة صغيرة هي $${difficulty === 'hard' ? '0.01' : '0.1'}$.`,
					`النقطة $${nlLabel}$ تقع عند القيمة $${nlValStr}$ (وهي تساوي $\\frac{${nlFracNum}}{${nlFracDen}}$).`
				],
				finalAnswer: nlValStr
			};
		}

		// Odd seeds: ordering 4 distinct decimal numbers & decimal fractions < 1000
		const ordW = rng.int(2, 8);
		const ordH = rng.int(2, 8);
		const ordT1 = rng.int(1, 2);
		const ordH1 = rng.int(2, 8);
		const ordT2 = rng.int(3, 4);
		const ordT3 = rng.int(6, 8);

		const sortedEntries = [
			{
				val: roundTo(ordW + ordH / 100, 2),
				expr: `${ordW} + \\frac{${ordH}}{100}`,
				label: `$${ordW} + \\frac{${ordH}}{100}$`
			},
			{
				val: roundTo(ordW + ordT1 / 10 + ordH1 / 100, 2),
				expr: `\\frac{${ordW * 100 + ordT1 * 10 + ordH1}}{100}`,
				label: `$\\frac{${ordW * 100 + ordT1 * 10 + ordH1}}{100}$`
			},
			{
				val: roundTo(ordW + ordT2 / 10, 1),
				expr: `${ordW}.${ordT2}`,
				label: `$${ordW}.${ordT2}$`
			},
			{
				val: roundTo(ordW + ordT3 / 10, 1),
				expr: `\\frac{${ordW * 10 + ordT3}}{10}`,
				label: `$\\frac{${ordW * 10 + ordT3}}{10}$`
			}
		];

		// Shuffle entries and keep track of sorted indices
		const indexed = sortedEntries.map((e, sortedRank) => ({ ...e, sortedRank }));
		const shuffled = rng.shuffle(indexed);
		const isAlreadySorted = shuffled.every((item, idx) => item.sortedRank === idx);
		if (isAlreadySorted) {
			[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
		}
		const items = shuffled.map((e) => e.label);
		const correctOrder = sortedEntries.map((_, rank) => shuffled.findIndex((e) => e.sortedRank === rank));

		const questionText = `رتّب الأعداد والكسور العشرية الآتية **ترتيباً تصاعدياً** (من الأصغر إلى الأكبر):`;

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'ordering',
				questionText,
				questionTextAr: questionText,
				questionData: {
					items,
					correctOrder
				},
				explanation: `نحوّل جميع الكتابات إلى أعداد عشرية برقمين بعد الفاصلة: $${sortedEntries[0].expr} = ${sortedEntries[0].val.toFixed(2)}$ ، $${sortedEntries[1].expr} = ${sortedEntries[1].val.toFixed(2)}$ ، $${sortedEntries[2].expr} = ${sortedEntries[2].val.toFixed(2)}$ ، $${sortedEntries[3].expr} = ${sortedEntries[3].val.toFixed(2)}$، ومنه الترتيب التصاعدي.`
			},
			sujetExercise,
			hints: [
				`حوّل الكسور العشرية ذات المقام $10$ أو $100$ إلى أعداد عشرية بالفاصلة أولاً.`,
				`أضف صفراً على يمين الجزء العشري لتوحيد عدد الأرقام بعد الفاصلة (مثلاً $${ordW}.${ordT2} = ${ordW}.${ordT2}0$).`,
				`انتبه للصفر في منزلة الأعشار: $${ordW} + \\frac{${ordH}}{100} = ${ordW}.0${ordH}$ وليس $${ordW}.${ordH}$.`
			],
			solutionStepsAr: [
				`التحويل إلى الكتابة العشرية: $${sortedEntries[0].val.toFixed(2)}$ ، $${sortedEntries[1].val.toFixed(2)}$ ، $${sortedEntries[2].val.toFixed(2)}$ ، $${sortedEntries[3].val.toFixed(2)}$.`,
				`الترتيب التصاعدي من الأصغر إلى الأكبر: ${sortedEntries.map((e) => e.label).join(' $<$ ')}.`
			],
			finalAnswer: sortedEntries.map((e) => e.val.toFixed(2)).join(' < ')
		};
	}
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. Geometry: Angles (NO protractor degrees!) + Circle & Special Triangles
// ══════════════════════════════════════════════════════════════════════════════
const templateGeometryAnglesTrianglesCircle: ParameterizedTemplate = {
	id: '4ap_t2_angles_triangles_circle',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الزوايا (حادة، قائمة، منفرجة) والدائرة والمثلثات الخاصة',
	curriculumLessonId: 'lesson_4ap_t2_angles_classification',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 191 + difficultyOffset(difficulty));

		const radiusCm = rng.int(3, 8);
		const diamCm = radiusCm * 2;
		const triSideCm = rng.int(4, 9);
		const angleOrder = rng.shuffle(['acute', 'right', 'obtuse'] as const) as [
			AngleKind,
			AngleKind,
			AngleKind
		];
		const anglesSvgUrl = saveSvgAsset(
			`4ap_t2_ang_${difficulty}_s${seed}`,
			svgAnglesNoDegrees({ mode: 'trio', order: angleOrder })
		);

		if (difficulty === 'easy') {
			// Matrix classifying the 3 angles (acute / right / obtuse) using set-square reference (no degrees!)
			const cols = ['زاوية حادة', 'زاوية قائمة', 'زاوية منفرجة'];
			const kindToCol: Record<AngleKind, number> = { acute: 0, right: 1, obtuse: 2 };
			const kindToLabel: Record<AngleKind, string> = {
				acute: 'زاوية حادة',
				right: 'زاوية قائمة',
				obtuse: 'زاوية منفرجة'
			};
			const statements = ['الزاوية (1)', 'الزاوية (2)', 'الزاوية (3)'];
			const correctAnswers = angleOrder.map((k) => kindToCol[k]);

			const rightIdx = angleOrder.indexOf('right') + 1;
			const acuteIdx = angleOrder.indexOf('acute') + 1;
			const obtuseIdx = angleOrder.indexOf('obtuse') + 1;

			const questionText = `تأمّل الزوايا الثلاث المرسومة بالنسبة لقالب الزاوية القائمة (الكوس الصفراء) باستعمال المقارنة فقط. صنّف كل زاوية في الجدول الآتي:`;

			const sujetExercise: ExerciseBlock = {
				points: 1.5,
				instruction: 'أجب عن أسئلة الهندسة الآتية باستعمال الكوس أو القالب:',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1.1fr'],
						children: [
							{
								type: 'text',
								content: `1) قارن الزوايا (1) و (2) و (3) بالزاوية القائمة في الشكل المقابل، ثم صنّفها (حادة، قائمة، منفرجة).`,
								answer: `1) الزاوية (${acuteIdx}): حادة ، الزاوية (${rightIdx}): قائمة ، الزاوية (${obtuseIdx}): منفرجة.`,
								mark: '1'
							},
							{
								type: 'image',
								src: anglesSvgUrl,
								caption: 'مقارنة الزوايا بالكوس'
							}
						]
					},
					{
						type: 'text',
						content: `2) دائرة مركزها $O$ وطول نصف قطرها $${radiusCm}$ cm. ما طول قطرها بالسنتيمتر، وعلى أيّ فتحة نفتح المدور لرسمها؟`,
						answer: `2) طول القطر: $${radiusCm} times 2 = ${diamCm}$ cm ، ونفتح المدور على نصف القطر $${radiusCm}$ cm.`,
						mark: '0.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '4ap',
				trimesterId: 't2',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'matrix',
					questionText,
					questionTextAr: questionText,
					imageUrl: anglesSvgUrl,
					imageCaption: 'مقارنة الزوايا الثلاث مع زاوية الكوس القائمة',
					questionData: {
						statements,
						columns: cols,
						correctAnswers
					},
					explanation: `بمقارنة انفتاح كل زاوية مع الزاوية القائمة للكوس: الزاوية (${acuteIdx}) أضيق من القائمة فهي حادة، والزاوية (${rightIdx}) تنطبق على الكوس فهي قائمة، والزاوية (${obtuseIdx}) أوسع من القائمة فهي منفرجة.`
				},
				sujetExercise,
				hints: [
					`قارن ضلعَي كل زاوية مع حافتي المثلث الأصفر المنقّط (الزاوية القائمة للكوس).`,
					`الزاوية التي ينطبق ضلعاها تماماً على الكوس هي **زاوية قائمة**.`,
					`الزاوية الأقل انفتاحاً من الكوس **حادة**، والأكثر انفتاحاً من الكوس **منفرجة**.`
				],
				solutionStepsAr: [
					`الزاوية (${acuteIdx}) تقع داخل فتحة الكوس، فهي ${kindToLabel.acute}.`,
					`الزاوية (${rightIdx}) تنطبق على الكوس، فهي ${kindToLabel.right}.`,
					`الزاوية (${obtuseIdx}) تخرج خارج فتحة الكوس (أوسع)، فهي ${kindToLabel.obtuse}.`
				],
				finalAnswer: `(1): ${kindToLabel[angleOrder[0]]} | (2): ${kindToLabel[angleOrder[1]]} | (3): ${kindToLabel[angleOrder[2]]}`
			};
		}

		if (difficulty === 'medium') {
			if (seed % 2 === 0) {
				// Circle elements (center O, radius r cm, diameter [AB] = 2r cm, chord [CD])
				const circleSvgUrl = saveSvgAsset(
					`4ap_t2_circ_med_s${seed}`,
					svgCircleElements({ radiusCm, variant: 'parts' })
				);
				const questionText = `في الدائرة المقابلة التي مركزها $O$ وطول نصف قطرها $OM = ${radiusCm}\\text{ cm}$، ما طول القطر $[AB]$ وماذا تسمّى القطعة $[CD]$؟`;
				const correctOpt = `طول القطر $${diamCm}\\text{ cm}$، و$[CD]$ وتر`;
				const distractors = [
					{
						text: `طول القطر $${radiusCm}\\text{ cm}$، و$[CD]$ نصف قطر`,
						diagnosticFeedback: `طول نصف القطر هو $${radiusCm}\\text{ cm}$، أما القطر فيساوي ضعفه ($2 \\times ${radiusCm}$)، كما أن $[CD]$ لا ينطلق من المركز $O$.`
					},
					{
						text: `طول القطر $${diamCm}\\text{ cm}$، و$[CD]$ قطر`,
						diagnosticFeedback: `طول القطر $${diamCm}\\text{ cm}$ صحيح، لكن القطعة $[CD]$ لا تمر بالمركز $O$ لذا تسمى **وتراً** وليس قطراً.`
					},
					{
						text: `طول القطر $${radiusCm + 2}\\text{ cm}$، و$[CD]$ وتر`,
						diagnosticFeedback: `القطر لا يساوي نصف القطر $+ 2$، بل ضعفه أي $2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$.`
					}
				];
				const mcqBuilt = buildUniqueMcqOptions(correctOpt, distractors, rng);

				const sujetExercise: ExerciseBlock = {
					points: 1.5,
					instruction: 'تأمّل الشكل الهندسي المقابل ثم أجب عن الأسئلة:',
					content: [
						{
							type: 'columns',
							widths: ['1.4fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) في الدائرة المقابلة مركزها $O$ و $O M = ${radiusCm}$ cm. \ أ) ما اسم كل من القطع $[A B]$ و $[O M]$ و $[C D]$؟ \ ب) احسب طول القطر $[A B]$ بالسنتيمتر.`,
									answer: `1) أ) $[A B]$ قطر ، $[O M]$ نصف قطر ، $[C D]$ وتر لا يمر بالمركز $O$. \ ب) طول القطر: $2 times ${radiusCm} = ${diamCm}$ cm.`,
									mark: '1'
								},
								{
									type: 'image',
									src: circleSvgUrl,
									caption: 'عناصر الدائرة'
								}
							]
						},
						{
							type: 'text',
							content: `2) صنّف الزاويتين التاليتين باستعمال الكوس أو القالب: زاوية أضيق من زاوية الكوس، وزاوية أوسع من زاوية الكوس.`,
							answer: `2) الأضيق من الكوس: زاوية حادة ، والأوسع من الكوس: زاوية منفرجة.`,
							mark: '0.5'
						}
					]
				};

				return {
					templateId: this.id,
					seed,
					grade: '4ap',
					trimesterId: 't2',
					difficulty,
					domain: 'geometry',
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'mcq',
						questionText,
						questionTextAr: questionText,
						imageUrl: circleSvgUrl,
						imageCaption: `الدائرة التي مركزها O ونصف قطرها ${radiusCm} cm`,
						questionData: {
							options: mcqBuilt.options,
							correctIndices: mcqBuilt.correctIndices,
							correctIndexes: mcqBuilt.correctIndices
						},
						explanation: `طول القطر $[AB]$ يساوي ضعف نصف القطر $OM$ ($2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$)، والقطعة $[CD]$ تصل بين نقطتين من الدائرة ولا تمر بالمركز فهي وتر.`
					},
					sujetExercise,
					hints: [
						`القطر يمر بالمركز $O$ وطوله يساوي ضعف نصف القطر ($2 \\times$ نصف القطر).`,
						`القطعة $[CD]$ تصل نقطتين على محيط الدائرة دون المرور بالمركز $O$.`,
						`احسب $2 \\times ${radiusCm}$ واختر الاسم الهندسي الصحيح للقطعة $[CD]$.`
					],
					solutionStepsAr: [
						`طول القطر $[AB] = 2 \\times OM = 2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$.`,
						`القطعة $[CD]$ تصل نقطتين من الدائرة ولا تمر بالمركز $O$، فهي **وتر**.`
					],
					finalAnswer: `${diamCm} cm | وتر`
				};
			}

			// Odd medium seeds: Special Triangles using svgTriangle (right isosceles) or svgSpecialTriangle (equilateral/isosceles)
			const triChoice = seed % 3;
			let triSvg: string;
			let triTypeCorrect: string;
			let triDesc: string;
			let triExplain: string;
			let triExplainTypst: string;
			if (triChoice === 0) {
				triSvg = svgTriangle({
					labels: ['A', 'B', 'C'],
					rightAngleAtA: true,
					sideAB: `${triSideCm} cm`,
					sideAC: `${triSideCm} cm`
				});
				triTypeCorrect = 'مثلث قائم ومتساوي الساقين';
				triDesc = `تأمّل المثلث $ABC$ المقابل حيث الزاوية عند $A$ قائمة و $AB = AC = ${triSideCm}\\text{ cm}$. ما نوع هذا المثلث؟`;
				triExplain = `للمثلث $ABC$ زاوية قائمة عند $A$ وضلعان متقايسان ($AB = AC = ${triSideCm}\\text{ cm}$)، فهو مثلث قائم ومتساوي الساقين.`;
				triExplainTypst = `له زاوية قائمة عند $A$ و $A B = A C = ${triSideCm}$ cm`;
			} else if (triChoice === 1) {
				triSvg = svgSpecialTriangle({
					kind: 'equilateral',
					labels: ['K', 'L', 'M'],
					sideCm: triSideCm
				});
				triTypeCorrect = 'مثلث متقايس الأضلاع';
				triDesc = `تأمّل المثلث $KLM$ المقابل الذي أطوال أضلاعه متساوية ($KL = LM = KM = ${triSideCm}\\text{ cm}$). ما نوع هذا المثلث؟`;
				triExplain = `أضلاع المثلث $KLM$ الثلاثة متقايسة في الطول، إذن هو مثلث متقايس الأضلاع.`;
				triExplainTypst = `أضلاعه الثلاثة متقايسة: $K L = L M = K M = ${triSideCm}$ cm`;
			} else {
				const baseCm = triSideCm - 2;
				triSvg = svgSpecialTriangle({
					kind: 'isosceles',
					labels: ['E', 'F', 'G'],
					sideCm: triSideCm,
					baseCm
				});
				triTypeCorrect = 'مثلث متساوي الساقين';
				triDesc = `تأمّل المثلث $EFG$ المقابل حيث $EF = EG = ${triSideCm}\\text{ cm}$ و $FG = ${baseCm}\\text{ cm}$ ولا توجد به زاوية قائمة. ما نوع هذا المثلث؟`;
				triExplain = `للمثلث $EFG$ ضلعان متقايسان فقط ($EF = EG = ${triSideCm}\\text{ cm}$) دون زاوية قائمة، فهو مثلث متساوي الساقين.`;
				triExplainTypst = `له ضلعان متقايسان فقط $E F = E G = ${triSideCm}$ cm دون زاوية قائمة`;
			}

			const triSvgUrl = saveSvgAsset(`4ap_t2_tri_med_s${seed}`, triSvg);
			const allTriTypes = [
				{
					text: 'مثلث قائم ومتساوي الساقين',
					diagnosticFeedback: 'تحقق من وجود زاوية قائمة وتقايس ضلعين معاً.'
				},
				{
					text: 'مثلث متقايس الأضلاع',
					diagnosticFeedback: 'المثلث متقايس الأضلاع تكون أضلاعه الثلاثة كلها متساوية في الطول.'
				},
				{
					text: 'مثلث متساوي الساقين',
					diagnosticFeedback: 'المثلث متساوي الساقين له ضلعان متقايسان دون زاوية قائمة.'
				},
				{
					text: 'مثلث قائم فقط',
					diagnosticFeedback: 'تحقق من أطوال الأضلاع في الرسم وتشفير التقايس.'
				}
			];
			const triDistractors = allTriTypes.filter((t) => t.text !== triTypeCorrect);
			const mcqTri = buildUniqueMcqOptions(triTypeCorrect, triDistractors, rng);

			const sujetExercise: ExerciseBlock = {
				points: 1.5,
				instruction: 'تأمّل الشكلين المرفقين وأجب باستعمال الكوس والمدور:',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) لاحظ الشكل المقابل وحدّد نوع المثلث مع التعليل انطلاقاً من الخواص والتشفير.`,
								answer: `1) نوع المثلث: ${triTypeCorrect} (${triExplainTypst}).`,
								mark: '1'
							},
							{
								type: 'image',
								src: triSvgUrl,
								caption: 'المثلث الخاص'
							}
						]
					},
					{
						type: 'text',
						content: `2) إذا رسمنا دائرة بالمدور بفتحة طولها $${radiusCm}$ cm، ما طول قطر هذه الدائرة؟`,
						answer: `2) طول القطر هو $2 times ${radiusCm} = ${diamCm}$ cm.`,
						mark: '0.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '4ap',
				trimesterId: 't2',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: triDesc,
					questionTextAr: triDesc,
					imageUrl: triSvgUrl,
					imageCaption: 'تشفير أضلاع وزوايا المثلث',
					questionData: {
						options: mcqTri.options,
						correctIndices: mcqTri.correctIndices,
						correctIndexes: mcqTri.correctIndices
					},
					explanation: triExplain
				},
				sujetExercise,
				hints: [
					`ابحث أولاً عن وجود رمز الزاوية القائمة (المربع الأحمر).`,
					`راقب أطوال الأضلاع أو علامات التشفير لمعرفة كم ضلعاً متقايساً يوجد.`,
					`ميّز بين متساوي الساقين (ضلعان متقايسان) ومتقايس الأضلاع (ثلاثة أضلاع متقايسة).`
				],
				solutionStepsAr: [
					triExplain,
					`النوع الصحيح للمثلث هو: ${triTypeCorrect}.`
				],
				finalAnswer: triTypeCorrect
			};
		}

		// Hard difficulty: alternate between arm-length angle trap (true_false) and circle + right-isosceles OAB (mcq)
		if (seed % 2 === 0) {
			const armsSvgUrl = saveSvgAsset(
				`4ap_t2_arms_hard_s${seed}`,
				svgAnglesNoDegrees({ mode: 'arms_trap' })
			);
			const isTrue = seed % 4 === 0;
			const questionText = isTrue
				? `انظر إلى الزاويتين $E$ (بضلعين طويلين) و $F$ (بضلعين قصيرين) مقارنة بقالب الكوس في الشكل المقابل: الزاوية $F$ أكبر من الزاوية $E$ لأن انفتاحها أوسع من الزاوية القائمة، وطول الضلعين لا يغيّر سعة الزاوية.`
				: `انظر إلى الزاويتين $E$ و $F$ في الشكل المقابل: الزاوية $E$ أكبر من الزاوية $F$ لأن ضلعيها أطول بكثير من ضلعي الزاوية $F$.`;
			const explanation = isTrue
				? `صحيح! سعة الزاوية تقاس بمقدار انفتاح ضلعيها وليس بطول الضلعين المرسومين؛ فالزاوية $F$ منفرجة (أوسع من القائمة) بينما $E$ حادة (أضيق من القائمة).`
				: `خطأ! طول الضلعين المرسومين لا يؤثر أبداً في سعة الزاوية؛ عند المقارنة بالكوس نجد $E$ حادة (أضيق من القائمة) و $F$ منفرجة (أوسع من القائمة)، إذن $F$ أكبر من $E$.`;

			const sujetExercise: ExerciseBlock = {
				points: 1.5,
				instruction: 'لاحظ الشكل المقابل (باستعمال الكوس والقالب فقط)، ثم أجب بـ صحيح أو خطأ مع تصحيح الخطأ:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'true_false',
								items: [
									{
										q: `الزاوية $E$ أكبر من الزاوية $F$ لأن ضلعيها أطول.`,
										a: 'خطأ',
										c: `سعة الزاوية تتعلق بانفتاح ضلعيها لا بطولهما؛ $F$ منفرجة فهي أكبر من $E$ الحادة.`,
										mark: '0.5'
									},
									{
										q: `الزاوية $F$ منفرجة لأنها أكثر انفتاحاً من الزاوية القائمة.`,
										a: 'صحيح',
										c: `العبارة صحيحة.`,
										mark: '0.5'
									},
									{
										q: `لرسم دائرة قطرها $${diamCm}$ cm نفتح المدور على $${radiusCm}$ cm.`,
										a: 'صحيح',
										c: `نصف القطر يساوي نصف القطر الكامل: $${diamCm} div 2 = ${radiusCm}$ cm.`,
										mark: '0.5'
									}
								]
							},
							{
								type: 'image',
								src: armsSvgUrl,
								caption: 'الزاويتان E و F'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '4ap',
				trimesterId: 't2',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'true_false',
					questionText,
					questionTextAr: questionText,
					imageUrl: armsSvgUrl,
					imageCaption: 'مقارنة الزاويتين E و F باستعمال زاوية الكوس',
					questionData: {
						correctAnswer: isTrue
					},
					explanation
				},
				sujetExercise,
				hints: [
					`انتبه! هل يتغيّر مقدار الزاوية إذا مدّدنا أو قصّرنا طول ضلعيها؟`,
					`قارن انفتاح كل من $E$ و $F$ مع قالب الكوس الأصفر المرسوم في الشكل.`,
					`الزاوية $E$ أضيق من الكوس (حادة)، والزاوية $F$ أوسع من الكوس (منفرجة).`
				],
				solutionStepsAr: [
					`لا يعتمد كبر الزاوية على طول الضلعين، بل على مقدار الانفتاح عند الرأس.`,
					`الزاوية $E$ حادة (أصغر من القائمة) والزاوية $F$ منفرجة (أكبر من القائمة)، إذن $F$ أكبر من $E$.`
				],
				finalAnswer: isTrue ? 'صحيح' : 'خطأ'
			};
		}

		// Hard odd seeds: Circle + inscribed right-isosceles triangle OAB
		const circTriSvgUrl = saveSvgAsset(
			`4ap_t2_circtri_hard_s${seed}`,
			svgCircleElements({ radiusCm, variant: 'right_isosceles' })
		);
		const questionText = `رسمت سارة بالمدور دائرة مركزها $O$ ونصف قطرها $OA = ${radiusCm}\\text{ cm}$، وعيّنت النقطة $B$ على الدائرة بحيث يتعامد $[OA]$ و $[OB]$. ما نوع المثلث $OAB$، وما طول القطر $[AC]$؟`;
		const correctOpt = `مثلث قائم ومتساوي الساقين، وطول القطر $${diamCm}\\text{ cm}$`;
		const distractors = [
			{
				text: `مثلث متقايس الأضلاع، وطول القطر $${diamCm}\\text{ cm}$`,
				diagnosticFeedback: `المثلث يحتوي على زاوية قائمة عند $O$، ولا يمكن أن يكون المثلث القائم متقايس الأضلاع؛ كما أن $OA = OB$ فقط.`
			},
			{
				text: `مثلث قائم ومتساوي الساقين، وطول القطر $${radiusCm}\\text{ cm}$`,
				diagnosticFeedback: `تحديد نوع المثلث صحيح، لكنك أخطأت في القطر: القطر يساوي ضعف نصف القطر ($2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$).`
			},
			{
				text: `مثلث متساوي الساقين فقط، وطول القطر $${diamCm}\\text{ cm}$`,
				diagnosticFeedback: `لاحظ علامة الزاوية القائمة الحمراء عند الرأس $O$؛ المثلث قائم ومتساوي الساقين معاً.`
			}
		];
		const mcqCircTri = buildUniqueMcqOptions(correctOpt, distractors, rng);

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'تأمّل الشكل المقابل حيث النقاط A و B و C تنتمي إلى الدائرة التي مركزها O:',
			content: [
				{
					type: 'columns',
					widths: ['1.45fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) لدينا $O A = ${radiusCm}$ cm والقطعتان $[O A]$ و $[O B]$ متعامدتان. ما طول $[O B]$ وما طول القطر $[A C]$؟ \ 2) ما نوع المثلث $O A B$ مع التعليل؟`,
							answer: `1) $O B = O A = ${radiusCm}$ cm لأنهما نصفا قطر في نفس الدائرة، والقطر $[A C] = 2 times ${radiusCm} = ${diamCm}$ cm. \ 2) المثلث $O A B$ قائم ومتساوي الساقين في $O$ لأن لديه زاوية قائمة عند $O$ و $O A = O B$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: circTriSvgUrl,
							caption: 'الدائرة والمثلث OAB'
						}
					]
				},
				{
					type: 'text',
					content: `3) ما نوع الزاوية التي رأسها $A$ داخل المثلث $O A B$ (قائمة، حادة، أم منفرجة) بالمقارنة مع الكوس؟`,
					answer: `3) زاوية حادة (أقل انفتاحاً من الزاوية القائمة).`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: circTriSvgUrl,
				imageCaption: `دائرة مركزها O والمثلث OAB`,
				questionData: {
					options: mcqCircTri.options,
					correctIndices: mcqCircTri.correctIndices,
					correctIndexes: mcqCircTri.correctIndices
				},
				explanation: `النقطتان $A$ و $B$ تقعان على نفس الدائرة إذن $OA = OB = ${radiusCm}\\text{ cm}$، وبما أن $[OA] \\perp [OB]$ فإن المثلث $OAB$ قائم ومتساوي الساقين في $O$، وطول القطر $[AC] = 2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$.`
			},
			sujetExercise,
			hints: [
				`كل نقطتين على الدائرة تبعدان نفس المسافة عن المركز $O$، إذن $OA = OB$.`,
				`بما أن $[OA]$ و $[OB]$ متعامدان فإن الزاوية عند $O$ قائمة.`,
				`طول القطر $[AC]$ هو ضعف نصف القطر $[OA]$.`
			],
			solutionStepsAr: [
				`نصفا القطر متقايسان: $OA = OB = ${radiusCm}\\text{ cm}$، والزاوية عند $O$ قائمة.`,
				`إذن المثلث $OAB$ **قائم ومتساوي الساقين**، وطول القطر $[AC] = 2 \\times ${radiusCm} = ${diamCm}\\text{ cm}$.`
			],
			finalAnswer: `${triCountLabel(radiusCm, diamCm)}`
		};
	}
};

function triCountLabel(radiusCm: number, diamCm: number): string {
	return `مثلث قائم ومتساوي الساقين | القطر = ${diamCm} cm (نصف القطر = ${radiusCm} cm)`;
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation (4 points): Harvest & packaging story
//    1) 2-digit vertical multiplication (< 1,000,000)
//    2) 1-digit Euclidean division (a = b*q + r, 0 < r < b)
//    3) Simple fraction of a quantity (e.g. 1/2, 1/4, 3/4, 1/5, 2/5)
// ══════════════════════════════════════════════════════════════════════════════
const templateIntegrationHarvest: ParameterizedTemplate = {
	id: '4ap_t2_integration_harvest',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: جني وتعبئة المحصول الفلاحي',
	curriculumLessonId: 'lesson_4ap_t2_integration',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 223 + difficultyOffset(difficulty));

		const ctx = rng.pick([
			{
				crop: 'الزيتون',
				region: 'بجاية',
				farmer: 'العم رابح',
				packName: 'أكياس',
				packSingle: 'كيس',
				destLabel: 'للعصر وإنتاج الزيت',
				unit: 'kg'
			},
			{
				crop: 'البرتقال',
				region: 'البليدة',
				farmer: 'الفلاح كمال',
				packName: 'شباك',
				packSingle: 'شبكة',
				destLabel: 'للتسويق في السوق الأسبوعي',
				unit: 'kg'
			},
			{
				crop: 'التمور',
				region: 'بسكرة',
				farmer: 'العم مسعود',
				packName: 'علب',
				packSingle: 'علبة',
				destLabel: 'للتصدير',
				unit: 'kg'
			},
			{
				crop: 'التفاح',
				region: 'باتنة',
				farmer: 'الفلاح يوسف',
				packName: 'سلال',
				packSingle: 'سلة',
				destLabel: 'للبيع المباشر',
				unit: 'kg'
			}
		]);

		let fracNum: number;
		let fracDen: number;
		if (difficulty === 'easy') {
			[fracNum, fracDen] = rng.pick([
				[1, 2],
				[1, 4]
			]);
		} else if (difficulty === 'medium') {
			[fracNum, fracDen] = rng.pick([
				[1, 4],
				[3, 4],
				[1, 5],
				[2, 5]
			]);
		} else {
			[fracNum, fracDen] = rng.pick([
				[3, 4],
				[2, 5],
				[3, 5]
			]);
		}

		// Choose crates (2-digit, NOT multiple of 10) and 1-digit divisor b in [4..9]
		let crates: number;
		let perCrate: number;
		let b: number;

		if (difficulty === 'easy') {
			const cratesChoices = fracDen === 2 ? [12, 14, 16, 18, 22, 24] : [12, 16, 24, 28, 32];
			crates = rng.pick(cratesChoices);
			perCrate = rng.int(15, 38);
			if (perCrate % 10 === 0) perCrate += 2;
			const validDivs = [5, 6, 7, 8, 9].filter((d) => crates % d !== 0);
			b = rng.pick(validDivs);
			for (let step = 0; step < 30; step++) {
				if ((crates * perCrate) % b !== 0 && (crates * perCrate) % fracDen === 0) break;
				perCrate += 1;
			}
		} else if (difficulty === 'medium') {
			const cratesChoices = fracDen === 4 ? [16, 24, 28, 32, 36, 44] : [15, 25, 35, 45];
			crates = rng.pick(cratesChoices);
			perCrate = rng.int(26, 68);
			if (perCrate % 10 === 0) perCrate += 3;
			const validDivs = [4, 5, 6, 7, 8, 9].filter((d) => gcd(crates, d) === 1);
			b = rng.pick(validDivs.length ? validDivs : [7]);
			for (let step = 0; step < 30; step++) {
				if ((crates * perCrate) % b !== 0 && (crates * perCrate) % fracDen === 0) break;
				perCrate += 1;
			}
		} else {
			// Hard: make sure q (number of full bags) is cleanly divisible by fracDen AND r > 0!
			crates = rng.int(24, 48);
			if (crates % 10 === 0) crates += 3;
			const validDivs = [4, 5, 6, 7, 8, 9].filter((d) => gcd(crates, d) === 1);
			b = rng.pick(validDivs.length ? validDivs : [7]);
			perCrate = rng.int(115, 245);
			let found = false;
			for (let step = 0; step < 80; step++) {
				const candidateTotal = crates * perCrate;
				const candQ = Math.floor(candidateTotal / b);
				const candR = candidateTotal % b;
				if (candR >= 1 && candR < b && candQ >= fracDen * 4 && candQ % fracDen === 0) {
					found = true;
					break;
				}
				perCrate += 1;
			}
			if (!found) {
				// Deterministic safe fallback
				crates = 24;
				b = 5;
				perCrate = 117; // 24 * 117 = 2808 = 5 * 561 + 3 -> increment to 118 -> 2832 = 5*566+2
				while (
					(crates * perCrate) % b === 0 ||
					Math.floor((crates * perCrate) / b) % fracDen !== 0
				) {
					perCrate += 1;
				}
			}
		}

		const totalHarvest = crates * perCrate; // Strictly < 1,000,000
		const q = Math.floor(totalHarvest / b);
		const r = totalHarvest % b;

		// Step 3 target quantity
		const isHard = difficulty === 'hard';
		const fracTargetBase = isHard ? q : totalHarvest;
		const fracPart = (fracTargetBase / fracDen) * fracNum;
		const remainingPart = fracTargetBase - fracPart;

		const introTypst =
			`جنى ${ctx.farmer} في مزرعته بولاية ${ctx.region} محصولاً من ${ctx.crop}، فملأ $${crates}$ صندوقاً، يزن كل صندوق $${perCrate}$ ${ctx.unit}.\n` +
			`بعد ذلك، أراد تعبئة المحصول الكلي في ${ctx.packName} تسع كل ${ctx.packSingle} $${b}$ ${ctx.unit} بالتساوي.`;

		const introKatex =
			`جنى ${ctx.farmer} في مزرعته بولاية ${ctx.region} $${crates}$ صندوقاً من ${ctx.crop}، يزن كل صندوق $${perCrate}\\text{ kg}$. ` +
			`ثم قام بتعبئة المحصول الإجمالي في ${ctx.packName} سعة كل ${ctx.packSingle} $${b}\\text{ kg}$.`;

		let q3TypstPrompt: string;
		let q3TypstAnswer: string;
		let quizQuestionText: string;
		let quizCorrect: number;
		let quizUnit: string;
		let wrongForgotTensZero: number;
		let wrongUnitFracOnly: number;
		let wrongComplementary: number;
		let hints: [string, string, string];
		let steps: string[];
		let finalAnswer: string;

		// Compute mistake for forgetting tens zero in Step 1
		const cratesUnits = crates % 10;
		const cratesTens = Math.floor(crates / 10);
		const wrongTotalNoZero = perCrate * cratesUnits + perCrate * cratesTens;

		if (difficulty === 'easy') {
			q3TypstPrompt = `3) خصّص ${ctx.farmer} $frac(${fracNum}, ${fracDen})$ من المحصول الكلي (${ltrUnit(`${formatGroupedRtlSafe(totalHarvest)} ${ctx.unit}`)}) ${ctx.destLabel}. احسب بالكيلوغرام الكمية المخصّصة لذلك.`;
			q3TypstAnswer = `3) الكمية المخصّصة: $${formatTypstMathNum(totalHarvest)} div ${fracDen} = ${formatTypstMathNum(fracPart)}$ ${ctx.unit}.`;
			quizQuestionText = `${introKatex}\n\nإذا خصّص ${ctx.farmer} $\\frac{${fracNum}}{${fracDen}}$ من **المحصول الكلي** ${ctx.destLabel}، فما هي الكتلة المخصّصة بالكيلوغرام؟`;
			quizCorrect = fracPart;
			quizUnit = 'kg';
			wrongForgotTensZero = Math.max(10, Math.round(wrongTotalNoZero / fracDen));
			wrongUnitFracOnly = Math.max(5, Math.round(q / fracDen));
			wrongComplementary = totalHarvest - fracPart === fracPart ? fracPart + b : totalHarvest - fracPart;
			hints = [
				`الخطوة 1: احسب المحصول الكلي بالضرب العمودي ($${perCrate} \\times ${crates}$).`,
				`تذكّر وضع الصفر ($0$) في منزلة الآحاد عند الضرب في عشرات العدد $${crates}$.`,
				`الخطوة 2: لحساب $\\frac{${fracNum}}{${fracDen}}$ من المحصول الكلي، اقسم الكتلة الكلية على $${fracDen}$.`
			];
			steps = [
				`المحصول الكلي: $${perCrate} \\times ${crates} = ${formatKatexNum(totalHarvest)}\\text{ kg}$.`,
				`الكمية المخصّصة ($\\frac{${fracNum}}{${fracDen}}$): $${formatKatexNum(totalHarvest)} \\div ${fracDen} = ${formatKatexNum(fracPart)}\\text{ kg}$.`
			];
			finalAnswer = `${formatSpaceAscii(fracPart)} kg`;
		} else if (difficulty === 'medium') {
			q3TypstPrompt = `3) باع ${ctx.farmer} $frac(${fracNum}, ${fracDen})$ من المحصول الكلي ${ctx.destLabel}، واحتفظ بالباقي. احسب بالكيلوغرام الكمية التي باعها.`;
			q3TypstAnswer = `3) الكمية المباعة: $(${formatTypstMathNum(totalHarvest)} div ${fracDen}) times ${fracNum} = ${formatTypstMathNum(fracPart)}$ ${ctx.unit}.`;
			quizQuestionText = `${introKatex}\n\nباع ${ctx.farmer} $\\frac{${fracNum}}{${fracDen}}$ من **المحصول الكلي** ${ctx.destLabel}. ما هي الكتلة المباعة بالكيلوغرام؟`;
			quizCorrect = fracPart;
			quizUnit = 'kg';
			wrongForgotTensZero = Math.max(10, Math.round((wrongTotalNoZero / fracDen) * fracNum));
			wrongUnitFracOnly =
				fracNum > 1
					? Math.round(totalHarvest / fracDen)
					: Math.max(10, totalHarvest - fracPart);
			wrongComplementary = remainingPart === fracPart ? fracPart + 10 : remainingPart;
			hints = [
				`احسب أولاً المحصول الكلي بالضرب العمودي: $${perCrate} \\times ${crates} = ${formatKatexNum(totalHarvest)}\\text{ kg}$.`,
				`لحساب $\\frac{${fracNum}}{${fracDen}}$ من مقدار، نقسم على المقام ($${fracDen}$) ثم نضرب في البسط ($${fracNum}$).`,
				`احسب: $(${formatKatexNum(totalHarvest)} \\div ${fracDen}) \\times ${fracNum}$.`
			];
			steps = [
				`المحصول الكلي: $${perCrate} \\times ${crates} = ${formatKatexNum(totalHarvest)}\\text{ kg}$.`,
				`عدد الـ${ctx.packName} الكاملة بالقسمة الإقليدية: $${formatKatexNum(totalHarvest)} = ${b} \\times ${q} + ${r}$ (${q} ${ctx.packSingle} وتبقى $${r}\\text{ kg}$).`,
				`الكمية المباعة ($\\frac{${fracNum}}{${fracDen}}$): $(${formatKatexNum(totalHarvest)} \\div ${fracDen}) \\times ${fracNum} = ${formatKatexNum(fracPart)}\\text{ kg}$.`
			];
			finalAnswer = `${formatSpaceAscii(fracPart)} kg`;
		} else {
			q3TypstPrompt = `3) باع ${ctx.farmer} $frac(${fracNum}, ${fracDen})$ من الـ${ctx.packName} المملوءة تماماً (${q} ${ctx.packSingle}). كم ${ctx.packSingle} باع، وكم ${ctx.packSingle} مملوءاً بقي لديه؟`;
			q3TypstAnswer = `3) عدد الـ${ctx.packName} المباعة: $(${q} div ${fracDen}) times ${fracNum} = ${fracPart}$ ${ctx.packSingle} \\ المتبقي: $${q} - ${fracPart} = ${remainingPart}$ ${ctx.packSingle}.`;
			quizQuestionText = `${introKatex}\n\nإذا باع ${ctx.farmer} $\\frac{${fracNum}}{${fracDen}}$ من **الـ${ctx.packName} المملوءة تماماً** فقط (دون الباقي غير المعبّأ)، فكم ${ctx.packSingle} **بقي** لديه من الـ${ctx.packName} المملوءة؟`;
			quizCorrect = remainingPart;
			quizUnit = ctx.packSingle;
			wrongForgotTensZero = Math.max(2, Math.floor(wrongTotalNoZero / b));
			wrongUnitFracOnly = fracPart; // stopped at sold count instead of remaining
			wrongComplementary = q; // forgot to take fraction
			hints = [
				`الخطوة 1: احسب المحصول الكلي ($${perCrate} \\times ${crates} = ${formatKatexNum(totalHarvest)}\\text{ kg}$).`,
				`الخطوة 2: أنجز القسمة الإقليدية $${formatKatexNum(totalHarvest)} \\div ${b}$ لإيجاد عدد الـ${ctx.packName} المملوءة تماماً ($${q}$).`,
				`الخطوة 3: احسب $\\frac{${fracNum}}{${fracDen}}$ من $${q}$، ثم اطرح الناتج من $${q}$ لإيجاد عدد الـ${ctx.packName} المتبقية.`
			];
			steps = [
				`المحصول الكلي: $${perCrate} \\times ${crates} = ${formatKatexNum(totalHarvest)}\\text{ kg}$.`,
				`القسمة الإقليدية على $${b}$: $${formatKatexNum(totalHarvest)} = ${b} \\times ${q} + ${r}$، إذن عدد الـ${ctx.packName} المملوءة هو $${q}$ والباقي $${r}\\text{ kg}$.`,
				`عدد الـ${ctx.packName} المباعة: $(${q} \\div ${fracDen}) \\times ${fracNum} = ${fracPart}$، والمتبقي: $${q} - ${fracPart} = ${remainingPart}$.`
			];
			finalAnswer = `${remainingPart} ${ctx.packSingle}`;
		}

		// Build unique MCQ distractors
		const seenVals = new Set<number>([quizCorrect]);
		const distractorEntries: { text: string; diagnosticFeedback: string }[] = [];
		const rawCandidates = [
			{
				val: wrongForgotTensZero,
				fb: `انتبه عند الضرب العمودي في الخطوة الأولى: نسيت وضع الصفر ($0$) تحت الآحاد عند الضرب في عشرات العدد $${crates}$!`
			},
			{
				val: wrongUnitFracOnly,
				fb: isHard
					? `لقد حسبت عدد الـ${ctx.packName} المباعة ($${fracPart}$) وليس عدد الـ${ctx.packName} المتبقية بعد البيع!`
					: `عند حساب الكسر $\\frac{${fracNum}}{${fracDen}}$ تذكّر القسمة على المقام ($${fracDen}$) والضرب في البسط ($${fracNum}$).`
			},
			{
				val: wrongComplementary,
				fb: `تحقق من المطلوب بدقة في نص السؤال: هل المطلوب الجزء المأخوذ أم الجزء المتبقي؟`
			}
		];

		for (const c of rawCandidates) {
			if (c.val > 0 && c.val < 1_000_000 && !seenVals.has(c.val)) {
				seenVals.add(c.val);
				distractorEntries.push({
					text: `${formatSpaceAscii(c.val)} ${quizUnit}`,
					diagnosticFeedback: c.fb
				});
			}
		}
		for (const delta of [10, 20, -10, 5, 12]) {
			if (distractorEntries.length === 3) break;
			const v = quizCorrect + delta;
			if (v > 0 && v < 1_000_000 && !seenVals.has(v)) {
				seenVals.add(v);
				distractorEntries.push({
					text: `${formatSpaceAscii(v)} ${quizUnit}`,
					diagnosticFeedback: `راجع خطوات الضرب والقسمة الإقليدية وحساب الكسر من المقدار.`
				});
			}
		}

		const mcqBuilt = buildUniqueMcqOptions(
			`${formatSpaceAscii(quizCorrect)} ${quizUnit}`,
			distractorEntries,
			rng
		);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: introTypst,
			content: [
				buildIllustratedFigureBlock('pri_math_04_two_pan_balance', {
					maxHeight: 112,
					width: '58%'
				}),
				{
					type: 'text',
					content: `1) احسب الكتلة الإجمالية لمحصول ${ctx.crop} بالكيلوغرام (ضع العملية عمودياً).`,
					answer: `1) الكتلة الإجمالية: $${perCrate} times ${crates} = ${formatTypstMathNum(totalHarvest)}$ ${ctx.unit}.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) ما هو عدد الـ${ctx.packName} المملوءة تماماً، وما هي الكتلة المتبقية دون تعبئة؟ اكتب المساواة المعبرة عن القسمة الإقليدية.`,
					answer: `2) بالقسمة الإقليدية على $${b}$: $${formatTypstMathNum(totalHarvest)} = ${b} times ${q} + ${r}$ (مع $${r} < ${b}$)، إذن يملأ $${q}$ ${ctx.packSingle} وتبقى $${r}$ ${ctx.unit}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: q3TypstPrompt,
					answer: q3TypstAnswer,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: quizQuestionText,
				questionTextAr: quizQuestionText,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: steps.join(' ')
			},
			sujetExercise,
			hints,
			solutionStepsAr: steps,
			finalAnswer
		};
	}
};

export const TEMPLATES_4AP_T2: ParameterizedTemplate[] = [
	templateMultiplication2Digit,
	templateEuclideanDivision,
	templateSimpleFractions,
	templateDecimalFractionsDecimals,
	templateGeometryAnglesTrianglesCircle,
	templateIntegrationHarvest
].map(withSafeKatex);
