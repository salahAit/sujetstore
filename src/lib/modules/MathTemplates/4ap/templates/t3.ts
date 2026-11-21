import type { ContentBlock, ExerciseBlock, TableCell } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset, svgAnalogClock, svgRectangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';

// ============================================================================
// Formatting & Pedagogical Helpers (4AP — T3)
// ============================================================================

function difficultyOffset(difficulty: Difficulty): number {
	return difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 47;
}

function pad2(n: number): string {
	return String(Math.trunc(n)).padStart(2, '0');
}

function fmtNum(val: number, maxDec = 4): string {
	const rounded = roundTo(val, maxDec);
	return Object.is(rounded, -0) ? '0' : String(rounded);
}

function fmtFixed(val: number, dec: number): string {
	return roundTo(val, dec).toFixed(dec);
}

function decimalAcceptedAnswers(valStr: string, unit?: string): string[] {
	const dot = valStr.trim();
	const comma = dot.replace('.', ',');
	const out = new Set<string>([dot, comma]);
	if (unit) {
		out.add(`${dot} ${unit}`);
		out.add(`${comma} ${unit}`);
		if (unit === 'DA') {
			out.add(`${dot} دج`);
			out.add(`${comma} دج`);
		}
	}
	return [...out];
}

/** Shifts an integer `intVal * 10^(-decPlaces)` by `rightShift` places without FP drift. */
function shiftDecimalExact(intVal: number, decPlaces: number, rightShift: number): string {
	const netPow = rightShift - decPlaces;
	const digits = String(Math.abs(Math.trunc(intVal)));
	if (netPow >= 0) {
		return digits + '0'.repeat(netPow);
	}
	const needDec = -netPow;
	let raw = digits;
	if (raw.length <= needDec) {
		raw = '0'.repeat(needDec - raw.length + 1) + raw;
	}
	const splitIdx = raw.length - needDec;
	const intPart = raw.slice(0, splitIdx);
	const fracPart = raw.slice(splitIdx).replace(/0+$/, '');
	return fracPart.length > 0 ? `${intPart}.${fracPart}` : intPart;
}

/** Typst directional isolate for numbers with Latin units (cm, m, DA, h, min, s). */
function ltr(text: string): string {
	return `#text(dir: ltr)[${text}]`;
}

function fmtClock(h: number, m: number, s?: number): string {
	return s === undefined ? `${pad2(h)} h ${pad2(m)} min` : `${pad2(h)} h ${pad2(m)} min ${pad2(s)} s`;
}

function fmtDuration(h: number, m: number, s?: number): string {
	return s === undefined ? `${h} h ${pad2(m)} min` : `${h} h ${pad2(m)} min ${pad2(s)} s`;
}

/** Ensures inline `$...$` delimiters satisfy marked-katex-extension spacing rules with Arabic prose. */
function safeKatex(text: string): string {
	const parts = text.split('$');
	if (parts.length < 3 || parts.length % 2 === 0) return text;
	for (let i = 0; i < parts.length - 1; i += 2) {
		if (parts[i].length > 0 && !/\s$/.test(parts[i])) {
			parts[i] += ' ';
		}
		const next = parts[i + 2];
		if (next.length > 0 && !/^[\s.!?:]/.test(next)) {
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
			}
			if (q.type === 'matrix' && Array.isArray(qd.statements)) {
				qd.statements = qd.statements.map((s: any) => (typeof s === 'string' ? safeKatex(s) : s));
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

function resolveDistinctDecMcq(
	correctVal: number,
	dec: number,
	candidates: { val: number; diagnosticFeedback: string }[],
	formatText: (val: number) => string,
	rng: SeededRng,
	fallbackFeedback: string
): {
	options: { text: string; diagnosticFeedback?: string }[];
	correctIndices: [number];
} {
	const roundedCorrect = roundTo(correctVal, dec);
	const seen = new Set<string>([fmtNum(roundedCorrect, dec)]);
	const distractors: { text: string; diagnosticFeedback: string }[] = [];

	for (const c of candidates) {
		const v = roundTo(c.val, dec);
		const key = fmtNum(v, dec);
		if (v > 0 && v < 1_000_000 && !seen.has(key)) {
			seen.add(key);
			distractors.push({ text: formatText(v), diagnosticFeedback: c.diagnosticFeedback });
		}
		if (distractors.length === 3) break;
	}

	const step = dec === 0 ? 1 : dec === 1 ? 0.1 : 0.01;
	const bumps = [1, -1, 10, -10, step, -step, 2, 5, 2 * step, 0.5];
	for (const d of bumps) {
		if (distractors.length === 3) break;
		const v = roundTo(roundedCorrect + d, dec);
		const key = fmtNum(v, dec);
		if (v > 0 && v < 1_000_000 && !seen.has(key)) {
			seen.add(key);
			distractors.push({ text: formatText(v), diagnosticFeedback: fallbackFeedback });
		}
	}

	return buildUniqueMcqOptions(formatText(roundedCorrect), distractors, rng);
}

// ============================================================================
// Custom SVG Helpers (4AP — T3)
// ============================================================================

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/** SVG proportionality table for 4AP T3 */
function svgProportionalityTable(opts: {
	row1Label: string;
	row2Label: string;
	cols: { top: string; bottom: string; askTop?: boolean; askBottom?: boolean }[];
}): string {
	const labelW = 136;
	const colW = 68;
	const padX = 14;
	const padY = 14;
	const rowH = 38;
	const tableW = labelW + opts.cols.length * colW;
	const w = padX * 2 + tableW;
	const h = padY * 2 + rowH * 2;
	const parts: string[] = [];

	parts.push(
		`<rect x="${padX}" y="${padY}" width="${tableW}" height="${rowH * 2}" fill="#ffffff" stroke="#475569" stroke-width="1.6"/>`,
		`<rect x="${padX}" y="${padY}" width="${labelW}" height="${rowH}" fill="#eff6ff"/>`,
		`<rect x="${padX}" y="${padY + rowH}" width="${labelW}" height="${rowH}" fill="#f0fdf4"/>`,
		`<line x1="${padX}" y1="${padY + rowH}" x2="${padX + tableW}" y2="${padY + rowH}" stroke="#475569" stroke-width="1.6"/>`,
		`<line x1="${padX + labelW}" y1="${padY}" x2="${padX + labelW}" y2="${padY + rowH * 2}" stroke="#475569" stroke-width="1.6"/>`,
		`<text x="${padX + labelW / 2}" y="${padY + 24}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${escapeXml(opts.row1Label)}</text>`,
		`<text x="${padX + labelW / 2}" y="${padY + rowH + 24}" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">${escapeXml(opts.row2Label)}</text>`
	);

	opts.cols.forEach((col, i) => {
		const cx = padX + labelW + i * colW + colW / 2;
		const rx = padX + labelW + i * colW;
		if (i > 0) {
			parts.push(`<line x1="${rx}" y1="${padY}" x2="${rx}" y2="${padY + rowH * 2}" stroke="#475569" stroke-width="1.5"/>`);
		}
		if (col.askTop) {
			parts.push(`<rect x="${rx + 2}" y="${padY + 2}" width="${colW - 4}" height="${rowH - 4}" fill="#fef2f2"/>`);
		}
		if (col.askBottom) {
			parts.push(`<rect x="${rx + 2}" y="${padY + rowH + 2}" width="${colW - 4}" height="${rowH - 4}" fill="#fef2f2"/>`);
		}
		parts.push(
			`<text x="${cx}" y="${padY + 24}" text-anchor="middle" font-size="14" font-weight="bold" fill="${col.askTop ? '#dc2626' : '#0f172a'}" direction="ltr">${escapeXml(col.top)}</text>`,
			`<text x="${cx}" y="${padY + rowH + 24}" text-anchor="middle" font-size="14" font-weight="bold" fill="${col.askBottom ? '#dc2626' : '#15803d'}" direction="ltr">${escapeXml(col.bottom)}</text>`
		);
	});

	return wrapSvg(w, h, parts.join(''));
}

type GridNetSpec = {
	cells: [number, number][];
	defectAr: string;
};

const VALID_CUBE_NETS: GridNetSpec[] = [
	{
		cells: [
			[1, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[1, 2]
		],
		defectAr: ''
	},
	{
		cells: [
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[2, 2]
		],
		defectAr: ''
	},
	{
		cells: [
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[3, 2]
		],
		defectAr: ''
	},
	{
		cells: [
			[1, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[2, 2]
		],
		defectAr: ''
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
			[3, 1],
			[2, 2]
		],
		defectAr: ''
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1],
			[2, 2],
			[3, 2]
		],
		defectAr: ''
	}
];

const INVALID_CUBE_NETS: GridNetSpec[] = [
	{
		cells: [
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[4, 1],
			[2, 2]
		],
		defectAr: 'يضم 5 مربعات على استقامة واحدة، وعند طيها يتراكب المربع الخامس فوق الأول.'
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
			[2, 1]
		],
		defectAr: 'يشكّل مستطيلا من 6 مربعات (2 × 3) ولا يمكن طيه لتكوين مكعب مغلق أبدا.'
	},
	{
		cells: [
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1]
		],
		defectAr: 'الجناحان العلويان يقعان في الجهة نفسها من الشريط الأوسط فيتراكبان عند الطي وتبقى القاعدة السفلية مفتوحة.'
	},
	{
		cells: [
			[0, 0],
			[3, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1]
		],
		defectAr: 'يحتوي على مربعين على الجانب العلوي نفسه ولا يوجد أي مربع يغلق القاعدة السفلية.'
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[2, 2]
		],
		defectAr: 'يشكّل 4 مربعات متلاصقة (مربع 2 × 2) مما يسبب تراكب الأوجه عند الطي.'
	}
];

/** Draws 4 candidate 6-square nets labeled (أ), (ب), (ج), (د) cleanly inside a single SVG. */
function svgCubeNetsChoice(
	entries: { label: string; cells: [number, number][] }[]
): string {
	const w = 440;
	const h = 128;
	const slotW = 104;
	const startX = 12;
	const cell = 16;
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`
	];

	entries.forEach((entry, idx) => {
		const sx = startX + idx * slotW;
		const maxC = Math.max(...entry.cells.map(([c]) => c));
		const maxR = Math.max(...entry.cells.map(([, r]) => r));
		const netW = (maxC + 1) * cell;
		const netH = (maxR + 1) * cell;
		const x0 = sx + (slotW - netW) / 2;
		const y0 = 34 + (78 - netH) / 2;

		parts.push(
			`<text x="${sx + slotW / 2}" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(entry.label)}</text>`
		);
		for (const [c, r] of entry.cells) {
			parts.push(
				`<rect x="${(x0 + c * cell).toFixed(1)}" y="${(y0 + r * cell).toFixed(1)}" width="${cell}" height="${cell}" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>`
			);
		}
	});

	return wrapSvg(w, h, parts.join(''));
}

/** Draws a 3D perspective cube or cuboid alongside its unfolded net. */
function svgSolidAndNet(opts: {
	kind: 'cube' | 'cuboid';
	dimLabels?: [string, string, string]; // [L, W, H]
	showNet?: boolean;
}): string {
	const showNet = opts.showNet ?? true;
	const w = showNet ? 380 : 210;
	const h = 152;
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`
	];

	if (opts.kind === 'cube') {
		// 3D Cube on left
		parts.push(
			`<polygon points="36,52 94,52 94,110 36,110" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>`,
			`<polygon points="36,52 60,30 118,30 94,52" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>`,
			`<polygon points="94,52 118,30 118,88 94,110" fill="#60a5fa" stroke="#1d4ed8" stroke-width="2"/>`,
			`<line x1="60" y1="30" x2="60" y2="88" stroke="#1d4ed8" stroke-dasharray="3 3" stroke-width="1.3"/>`,
			`<line x1="36" y1="110" x2="60" y2="88" stroke="#1d4ed8" stroke-dasharray="3 3" stroke-width="1.3"/>`,
			`<line x1="60" y1="88" x2="118" y2="88" stroke="#1d4ed8" stroke-dasharray="3 3" stroke-width="1.3"/>`,
			`<circle cx="94" cy="52" r="3.5" fill="#dc2626"/>`
		);
		if (opts.dimLabels?.[0]) {
			parts.push(
				`<text x="65" y="128" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a" direction="ltr">${escapeXml(opts.dimLabels[0])}</text>`
			);
		}
		if (showNet) {
			// Arrow + Cube net on right
			parts.push(
				`<line x1="142" y1="76" x2="178" y2="76" stroke="#0f172a" stroke-width="2"/>`,
				`<polygon points="184,76 175,71 175,81" fill="#0f172a"/>`
			);
			const s = 23;
			const nx = 224;
			const ny = 24;
			const netCells: [number, number][] = [
				[1, 0],
				[0, 1],
				[1, 1],
				[2, 1],
				[3, 1],
				[1, 2]
			];
			for (const [c, r] of netCells) {
				parts.push(
					`<rect x="${nx + c * s}" y="${ny + r * s}" width="${s}" height="${s}" fill="${r === 1 && c === 1 ? '#86efac' : '#dcfce7'}" stroke="#15803d" stroke-width="1.5"/>`
				);
			}
			parts.push(
				`<text x="270" y="126" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">نشر المجسم</text>`
			);
		}
	} else {
		// 3D Cuboid on left
		parts.push(
			`<polygon points="28,58 112,58 112,108 28,108" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>`,
			`<polygon points="28,58 56,34 140,34 112,58" fill="#fde68a" stroke="#b45309" stroke-width="2"/>`,
			`<polygon points="112,58 140,34 140,84 112,108" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>`,
			`<line x1="56" y1="34" x2="56" y2="84" stroke="#b45309" stroke-dasharray="3 3" stroke-width="1.3"/>`,
			`<line x1="28" y1="108" x2="56" y2="84" stroke="#b45309" stroke-dasharray="3 3" stroke-width="1.3"/>`,
			`<line x1="56" y1="84" x2="140" y2="84" stroke="#b45309" stroke-dasharray="3 3" stroke-width="1.3"/>`
		);
		if (opts.dimLabels) {
			parts.push(
				`<text x="70" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" direction="ltr">${escapeXml(opts.dimLabels[0])}</text>`,
				`<text x="136" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" direction="ltr">${escapeXml(opts.dimLabels[1])}</text>`,
				`<text x="160" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" direction="ltr">${escapeXml(opts.dimLabels[2])}</text>`
			);
		}
		if (showNet) {
			parts.push(
				`<line x1="176" y1="76" x2="206" y2="76" stroke="#0f172a" stroke-width="2"/>`,
				`<polygon points="212,76 203,71 203,81" fill="#0f172a"/>`,
				// Cuboid net with 3 matching color pairs
				`<rect x="262" y="22" width="52" height="22" fill="#fde68a" stroke="#b45309" stroke-width="1.4"/>`,
				`<rect x="234" y="44" width="28" height="32" fill="#bbf7d0" stroke="#15803d" stroke-width="1.4"/>`,
				`<rect x="262" y="44" width="52" height="32" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.4"/>`,
				`<rect x="314" y="44" width="28" height="32" fill="#bbf7d0" stroke="#15803d" stroke-width="1.4"/>`,
				`<rect x="262" y="76" width="52" height="22" fill="#fde68a" stroke="#b45309" stroke-width="1.4"/>`,
				`<rect x="262" y="98" width="52" height="32" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.4"/>`
			);
		}
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Draws a school garden/yard rectangle or square with an optional un-fenced gate opening. */
function svgSchoolGarden(opts: {
	isSquare: boolean;
	lengthLabel: string;
	widthLabel: string;
	gateLabel?: string;
	titleLabel: string;
}): string {
	const w = 320;
	const h = 152;
	const rx = opts.isSquare ? 105 : 62;
	const rw = opts.isSquare ? 96 : 182;
	const ry = 32;
	const rh = opts.isSquare ? 82 : 76;
	const parts: string[] = [
		`<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`,
		`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#dcfce7" stroke="#15803d" stroke-width="2.2"/>`,
		`<rect x="${rx}" y="${ry}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.4"/>`,
		`<text x="${rx + rw / 2}" y="${ry + rh / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">${escapeXml(opts.titleLabel)}</text>`,
		`<text x="${rx + rw / 2}" y="${ry - 9}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" direction="ltr">${escapeXml(opts.lengthLabel)}</text>`
	];

	if (!opts.isSquare) {
		parts.push(
			`<text x="${rx + rw + 28}" y="${ry + rh / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" direction="ltr">${escapeXml(opts.widthLabel)}</text>`
		);
	}
	if (opts.gateLabel) {
		const gx1 = rx + rw / 2 - 22;
		const gx2 = rx + rw / 2 + 22;
		const gy = ry + rh;
		parts.push(
			`<line x1="${gx1}" y1="${gy}" x2="${gx2}" y2="${gy}" stroke="#dcfce7" stroke-width="4"/>`,
			`<line x1="${gx1}" y1="${gy}" x2="${gx2}" y2="${gy}" stroke="#dc2626" stroke-dasharray="4 2" stroke-width="2"/>`,
			`<text x="${rx + rw / 2}" y="${gy + 20}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">${escapeXml(opts.gateLabel)}</text>`
		);
	}

	return wrapSvg(w, h, parts.join(''));
}

// ============================================================================
// 1. Decimal Addition & Subtraction (numeric)
// ============================================================================

const tplDecimalAddSub: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_decimal_add_sub',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'جمع وطرح الأعداد العشرية',
	curriculumLessonId: 'lesson_4ap_t3_decimal_add_sub',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 103 + difficultyOffset(difficulty));

		// Pair for addition and pair for subtraction in the printable PDF exercise
		let addA: number;
		let addB: number;
		let subA: number;
		let subB: number;
		let addPadA: string;
		let subPadA: string;

		if (difficulty === 'easy') {
			const aT = rng.int(4, 9);
			const bT = rng.pick([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((t) => t + aT >= 11 && t + aT !== 10));
			addA = roundTo(rng.int(12, 65) + aT / 10, 1);
			addB = roundTo(rng.int(11, 45) + bT / 10, 1);
			addPadA = fmtNum(addA, 1);

			const sTopT = rng.int(1, 5);
			const sBotT = rng.int(sTopT + 2, 9);
			subA = roundTo(rng.int(35, 85) + sTopT / 10, 1);
			subB = roundTo(rng.int(12, Math.floor(subA) - 6) + sBotT / 10, 1);
			subPadA = fmtNum(subA, 1);
		} else if (difficulty === 'medium') {
			const aT = rng.int(4, 9);
			const bT = rng.pick([2, 3, 4, 5, 6, 7, 8, 9].filter((t) => t + aT >= 10));
			const bH = rng.int(1, 9);
			addA = roundTo(rng.int(14, 78) + aT / 10, 1);
			addB = roundTo(rng.int(4, 35) + bT / 10 + bH / 100, 2);
			addPadA = fmtFixed(addA, 2);

			const sTopT = rng.int(2, 6);
			const sBotT = rng.int(sTopT + 1, 9);
			const sBotH = rng.int(1, 9);
			subA = roundTo(rng.int(28, 92) + sTopT / 10, 1);
			subB = roundTo(rng.int(8, Math.floor(subA) - 6) + sBotT / 10 + sBotH / 100, 2);
			subPadA = fmtFixed(subA, 2);
		} else {
			// Hard: natural + 2-dec and natural - 2-dec (requires .00 padding & borrowing across 0)
			const aNat = rng.int(25, 140);
			const bT = rng.int(2, 9);
			const bH = rng.int(1, 9);
			addA = aNat;
			addB = roundTo(rng.int(12, 85) + bT / 10 + bH / 100, 2);
			addPadA = fmtFixed(addA, 2);

			subA = rng.pick([40, 50, 80, 100, 120, 150, 200]);
			const sbT = rng.int(1, 8);
			const sbH = rng.int(1, 9);
			subB = roundTo(rng.int(14, subA - 12) + sbT / 10 + sbH / 100, 2);
			subPadA = fmtFixed(subA, 2);
		}

		const addSum = roundTo(addA + addB, 2);
		const subDiff = roundTo(subA - subB, 2);

		// Word problem for Part 2 of PDF (and potentially Quiz)
		const contexts = [
			{
				item: 'خزّان ماء',
				unit: 'L',
				verb: 'سعته',
				action: 'أفرغنا منه',
				intro: 'يحتوي خزّان على كمية من الماء'
			},
			{
				item: 'لفّة قماش',
				unit: 'm',
				verb: 'طولها',
				action: 'قصّ الخيّاط منها',
				intro: 'اشترت خيّاطة لفّة قماش'
			},
			{
				item: 'صندوق فاكهة',
				unit: 'kg',
				verb: 'كتلته',
				action: 'أخذنا منه',
				intro: 'زنّ تاجر صندوق تفاح'
			}
		];
		const ctx = rng.pick(contexts);
		const wpTotal = difficulty === 'easy' ? roundTo(rng.int(22, 48) + rng.int(2, 5) / 10, 1) : rng.pick([20, 25, 30, 45, 50]);
		const wpUsed = roundTo(
			rng.int(6, Math.floor(wpTotal) - 5) + rng.int(6, 9) / 10 + (difficulty === 'easy' ? 0 : rng.int(1, 9) / 100),
			difficulty === 'easy' ? 1 : 2
		);
		const wpRem = roundTo(wpTotal - wpUsed, 2);

		const isAddQuiz = seed % 2 === 0;
		const decPlaces = difficulty === 'easy' ? 1 : 2;
		let questionText: string;
		let correctVal: number;
		let candidates: { val: number; diagnosticFeedback: string }[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;

		if (isAddQuiz) {
			correctVal = addSum;
			const aStr = fmtNum(addA, 2);
			const bStr = fmtNum(addB, 2);
			questionText = `ضع ثم أنجز العملية الآتية بمحاذاة الفاصلتين:\n\n$${aStr} + ${bStr}$`;

			const aTenths = Math.round((addA - Math.floor(addA)) * 10);
			const misalignVal =
				difficulty === 'easy'
					? roundTo(addSum - 1, 1)
					: difficulty === 'medium'
						? roundTo(Math.floor(addA) + aTenths / 100 + addB, 2)
						: roundTo(Math.floor(addB) + (addA + Math.round((addB - Math.floor(addB)) * 100)) / 100, 2);
			const forgotCarry = roundTo(addSum - 1, 2);
			const wrongSubtract = roundTo(Math.abs(addA - addB), 2);

			candidates = [
				{
					val: misalignVal,
					diagnosticFeedback:
						difficulty === 'easy'
							? 'انتبه للاحتفاظ عند جمع الأعشار: عند تجاوز $10$ أعشار نضيف $1$ إلى الآحاد!'
							: `خطأ في محاذاة الفاصلة! نضع الفاصلة تحت الفاصلة ونكتب $${addPadA}$ لتوحيد عدد الأرقام بعد الفاصلة.`
				},
				{
					val: forgotCarry,
					diagnosticFeedback: 'نسيت إضافة الاحتفاظ ($+1$) إلى مرتبة الآحاد!'
				},
				{
					val: wrongSubtract,
					diagnosticFeedback: 'انتبه للعملية المطلوبة: هي جمع ($+$) وليس طرحا ($-$).'
				}
			];

			hints = [
				'ضع العددين عموديا بحيث تكون الفاصلة تحت الفاصلة تماما.',
				difficulty === 'easy'
					? 'ابدأ جمع الأعشار من اليمين، وإذا بلغ المجموع $10$ أو أكثر احتفظ بـ $1$ في الآحاد.'
					: `اكتب $${fmtNum(addA, 2)}$ على الشكل $${addPadA}$ بإضافة الأصفار على يمين الجزء العشري لتوحيد المراتب.`,
				'أنزل الفاصلة في مكانها في النتيجة النهائية.'
			];
			solutionStepsAr = [
				`نوحد عدد الأرقام بعد الفاصلة: $${addPadA} + ${bStr}$.`,
				`نجمع الأرقام من اليمين إلى اليسار مع مراعاة الاحتفاظ.`,
				`النتيجة هي: $${addPadA} + ${bStr} = ${fmtNum(addSum, 2)}$.`
			];
			explanation = `بوضع الفاصلة تحت الفاصلة وتوحيد المراتب (${addPadA} + ${bStr}) نجد ${fmtNum(addSum, 2)}.`;
		} else {
			correctVal = subDiff;
			const sAStr = fmtNum(subA, 2);
			const sBStr = fmtNum(subB, 2);
			questionText = `ضع ثم أنجز عملية الطرح الآتية بمحاذاة الفاصلتين:\n\n$${sAStr} - ${sBStr}$`;

			const subIntB = Math.floor(subB);
			const subFracB = roundTo(subB - subIntB, 2);
			const droppedDecimal =
				difficulty === 'hard'
					? roundTo(Math.floor(subA) - subIntB + subFracB, 2)
					: roundTo(Math.floor(subA) - subIntB + (Math.round(subFracB * 100) % 10) / 100, 2);
			const forgotBorrowUnits = roundTo(subDiff + 1, 2);
			const forgotBorrowTenths = roundTo(subDiff + 0.1, 2);

			candidates = [
				{
					val: droppedDecimal,
					diagnosticFeedback: `لا تنزل أرقام الجزء العشري كما هي! يجب كتابة $${subPadA}$ وإجراء الاستعارة من اليمين إلى اليسار.`
				},
				{
					val: forgotBorrowUnits,
					diagnosticFeedback: 'استلفتَ لإتمام طرح الجزء العشري لكنك نسيت إرجاع الواحد (أو إنقاص $1$) من الآحاد!'
				},
				{
					val: forgotBorrowTenths,
					diagnosticFeedback: 'تحقق من الاستعارة في مرتبة الأعشار والأجزاء من مئة بعد وضع الصفر غير المؤثر.'
				}
			];

			hints = [
				'ضع المطروح منه في الأعلى والمطروح في الأسفل بمحاذاة الفاصلتين.',
				difficulty === 'easy'
					? 'عندما يكون رقم الأعشار في الأعلى أصغر، استعر وحدة واحدة ($= 10$ أعشار) من الآحاد.'
					: `أضف أصفارا غير مؤثرة على يمين $${sAStr}$ ليصبح $${subPadA}$ قبل بدء الطرح.`,
				'لا تنسَ إرجاع المستعار وأنزل الفاصلة في مكانها.'
			];
			solutionStepsAr = [
				`نكتب العملية بمحاذاة الفاصلة وتوحيد المراتب: $${subPadA} - ${sBStr}$.`,
				`ننجز الطرح من اليمين مع الاستعارة والإرجاع عند الحاجة.`,
				`النتيجة هي: $${subPadA} - ${sBStr} = ${fmtNum(subDiff, 2)}$.`
			];
			explanation = `بتوحيد عدد الأرقام بعد الفاصلة (${subPadA} - ${sBStr}) وإجراء الطرح بالاستعارة نجد ${fmtNum(subDiff, 2)}.`;
		}

		const mcq = resolveDistinctDecMcq(
			correctVal,
			decPlaces,
			candidates,
			(v) => `$${fmtNum(v, 2)}$`,
			rng,
			'راجع محاذاة الفاصلة والاحتفاظ أو الاستعارة.'
		);

		const sujetContent: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ضع ثم أنجز عموديا بمحاذاة الفاصلة:\n\nأ) $${fmtNum(addA, 2)} + ${fmtNum(addB, 2)} = ...$\n\nب) $${fmtNum(subA, 2)} - ${fmtNum(subB, 2)} = ...$`,
				answer: `1) أ) $${addPadA} + ${fmtNum(addB, 2)} = ${fmtNum(addSum, 2)}$\n\nب) $${subPadA} - ${fmtNum(subB, 2)} = ${fmtNum(subDiff, 2)}$`,
				mark: '1'
			},
			...(ctx.unit === 'L'
				? [
						buildIllustratedFigureBlock('pri_math_07_measuring_vessels_liter', {
							maxHeight: 112,
							width: '58%',
							mode: 'image_only',
							title: 'قِيَاسُ السِّعَاتِ بِاللِّتْرِ (L)'
						})
					]
				: []),
			{
				type: 'text',
				content: `2) ${ctx.item} ${ctx.verb} ${ltr(`${fmtNum(wpTotal, 2)} ${ctx.unit}`)}، ${ctx.action} ${ltr(`${fmtNum(wpUsed, 2)} ${ctx.unit}`)}. احسب الكمية المتبقية.`,
				answer: `2) الكمية المتبقية: $${fmtFixed(wpTotal, difficulty === 'easy' ? 1 : 2)} - ${fmtNum(wpUsed, 2)} = ${fmtNum(wpRem, 2)}$ ${ltr(ctx.unit)}.`,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'أنجز العمليات العشرية الآتية بدقة مع محاذاة الفاصلة تحت الفاصلة:',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer: fmtNum(correctVal, 2)
		};
	}
};

// ============================================================================
// 2. Decimal Multiplication & Division by 10, 100, 1000 (numeric)
// ============================================================================

const tplDecimalMulDiv10_100_1000: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_decimal_mul_div_10_100_1000',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'ضرب وقسمة عدد عشري على 10 و100 و1000',
	curriculumLessonId: 'lesson_4ap_t3_decimal_mul_div_10_100_1000',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 131 + difficultyOffset(difficulty));

		type PowSpec = {
			kind: 'mul' | 'div';
			factor: 10 | 100 | 1000;
			shift: number;
			decPlaces: number;
			intVal: number;
		};

		const pickNonMultiple10 = (min: number, max: number) => {
			let v = rng.int(min, max);
			if (v % 10 === 0) v += 3;
			return v;
		};

		let mainOp: PowSpec;
		if (difficulty === 'easy') {
			const kind = seed % 2 === 0 ? 'mul' : 'div';
			const factor = rng.pick([10, 100] as const);
			const decPlaces = rng.pick([1, 2]);
			const intVal = decPlaces === 1 ? pickNonMultiple10(12, 89) : pickNonMultiple10(112, 689);
			mainOp = {
				kind,
				factor,
				shift: (kind === 'mul' ? 1 : -1) * (factor === 10 ? 1 : 2),
				decPlaces,
				intVal
			};
		} else if (difficulty === 'medium') {
			const kind = seed % 2 === 0 ? 'mul' : 'div';
			const factor = rng.pick([10, 100, 1000] as const);
			const decPlaces = rng.pick([1, 2]);
			const intVal = decPlaces === 1 ? pickNonMultiple10(14, 489) : pickNonMultiple10(115, 897);
			mainOp = {
				kind,
				factor,
				shift: (kind === 'mul' ? 1 : -1) * (factor === 10 ? 1 : factor === 100 ? 2 : 3),
				decPlaces,
				intVal
			};
		} else {
			const kind = seed % 2 === 0 ? 'mul' : 'div';
			const factor = rng.pick([100, 1000] as const);
			const decPlaces = kind === 'div' ? rng.pick([0, 1, 2]) : rng.pick([1, 2]);
			const intVal =
				decPlaces === 0
					? pickNonMultiple10(14, 389)
					: decPlaces === 1
						? pickNonMultiple10(12, 489)
						: pickNonMultiple10(105, 895);
			mainOp = {
				kind,
				factor,
				shift: (kind === 'mul' ? 1 : -1) * (factor === 100 ? 2 : 3),
				decPlaces,
				intVal
			};
		}

		const numStr = shiftDecimalExact(mainOp.intVal, mainOp.decPlaces, 0);
		const ansStr = shiftDecimalExact(mainOp.intVal, mainOp.decPlaces, mainOp.shift);
		const absShift = Math.abs(mainOp.shift);
		const opSymKatex = mainOp.kind === 'mul' ? '\\times' : '\\div';
		const opSymPlain = mainOp.kind === 'mul' ? '×' : '÷';
		const opSymTypst = mainOp.kind === 'mul' ? 'times' : 'div';

		// Generate 3 companion rows for the PDF table so all 4 rows cover ×10/×100/×1000 and ÷10/÷100/÷1000
		const n2Int = pickNonMultiple10(14, 94);
		const n3Int = pickNonMultiple10(124, 785);
		const n4Int = pickNonMultiple10(23, 87);

		const rowSpecs: { aStr: string; opTypst: 'times' | 'div'; fac: 10 | 100 | 1000; resStr: string }[] = [
			{
				aStr: numStr,
				opTypst: opSymTypst,
				fac: mainOp.factor,
				resStr: ansStr
			},
			{
				aStr: shiftDecimalExact(n2Int, 1, 0),
				opTypst: mainOp.kind === 'mul' ? 'div' : 'times',
				fac: mainOp.factor === 1000 ? 100 : 1000,
				resStr: shiftDecimalExact(
					n2Int,
					1,
					(mainOp.kind === 'mul' ? -1 : 1) * (mainOp.factor === 1000 ? 2 : 3)
				)
			},
			{
				aStr: shiftDecimalExact(n3Int, 2, 0),
				opTypst: 'times',
				fac: 100,
				resStr: shiftDecimalExact(n3Int, 2, 2)
			},
			{
				aStr: shiftDecimalExact(n4Int, 1, 0),
				opTypst: 'div',
				fac: 100,
				resStr: shiftDecimalExact(n4Int, 1, -2)
			}
		];

		// Part 2 of PDF: Decimal fraction & metric unit conversion via × / ÷ 10, 100, 1000
		const convKmInt = pickNonMultiple10(12, 48);
		const convKmStr = shiftDecimalExact(convKmInt, 2, 0); // e.g. 2.45 km
		const convMetersStr = shiftDecimalExact(convKmInt, 2, 3); // -> 2450 m

		const convGrams = pickNonMultiple10(25, 85) * 10; // e.g. 450 g
		const convKgStr = shiftDecimalExact(convGrams, 0, -3); // -> 0.45 kg

		const useMetricQuiz = difficulty === 'hard' && seed % 3 === 0;
		let questionText: string;
		let sentence: string;
		let finalAnsStr: string;
		let acceptedAnswers: string[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;

		if (useMetricQuiz) {
			const askKmToM = seed % 2 === 0;
			if (askKmToM) {
				questionText = `استعمل الضرب في $1000$ لتحويل الطول الآتي إلى المتر (اكتب العدد فقط):\n\n$${convKmStr}\\text{ km} = \\dots\\text{ m}$`;
				sentence = `${convKmStr} km = ___ m`;
				finalAnsStr = convMetersStr;
				acceptedAnswers = decimalAcceptedAnswers(convMetersStr, 'm');
				hints = [
					'تذكّر العلاقة بين الكيلومتر والمتر: $1\\text{ km} = 1000\\text{ m}$.',
					`للتحويل من $\\text{km}$ إلى $\\text{m}$ نضرب العدد العشري $${convKmStr}$ في $1000$.`,
					'نزيح الفاصلة $3$ مراتب نحو اليمين ونضيف صفرا عندما تنفد الأرقام.'
				];
				solutionStepsAr = [
					`$1\\text{ km} = 1000\\text{ m}$، إذن نضرب $${convKmStr} \\times 1000$.`,
					`نزيح الفاصلة $3$ مراتب نحو اليمين فنجد: $${convMetersStr}\\text{ m}$.`
				];
				explanation = `بما أن 1 km = 1000 m، نضرب ${convKmStr} × 1000 بإزاحة الفاصلة 3 رتب يمينا فنجد ${convMetersStr} m.`;
			} else {
				questionText = `استعمل القسمة على $1000$ لتحويل الكتلة الآتية إلى الكيلوغرام (اكتب العدد فقط):\n\n$${convGrams}\\text{ g} = \\dots\\text{ kg}$`;
				sentence = `${convGrams} g = ___ kg`;
				finalAnsStr = convKgStr;
				acceptedAnswers = decimalAcceptedAnswers(convKgStr, 'kg');
				hints = [
					'تذكّر العلاقة بين الكيلوغرام والغرام: $1\\text{ kg} = 1000\\text{ g}$.',
					`للتحويل من $\\text{g}$ إلى $\\text{kg}$ نقسم $${convGrams}$ على $1000$.`,
					'نزيح الفاصلة $3$ مراتب نحو اليسار بدءا من يمين العدد الطبيعي.'
				];
				solutionStepsAr = [
					`$1\\text{ kg} = 1000\\text{ g}$، إذن نقسم $${convGrams} \\div 1000$.`,
					`نزيح الفاصلة $3$ مراتب نحو اليسار فنجد: $${convKgStr}\\text{ kg}$.`
				];
				explanation = `بما أن 1 kg = 1000 g، نقسم ${convGrams} ÷ 1000 بإزاحة الفاصلة 3 رتب يسارا فنجد ${convKgStr} kg.`;
			}
		} else {
			questionText = `احسب ذهنيا ناتج العملية الآتية (اكتب العدد فقط):\n\n$${numStr} ${opSymKatex} ${mainOp.factor}$`;
			sentence = `${numStr} ${opSymPlain} ${mainOp.factor} = ___`;
			finalAnsStr = ansStr;
			acceptedAnswers = decimalAcceptedAnswers(ansStr);

			if (mainOp.kind === 'mul') {
				hints = [
					`عند الضرب في $${mainOp.factor}$ يكبر العدد، فنزيح الفاصلة نحو **اليمين**.`,
					`عدد الأصفار في $${mainOp.factor}$ هو $${absShift}$، لذا نزيح الفاصلة بمقدار $${absShift}$ ${absShift === 1 ? 'مرتبة' : 'مراتب'}.`,
					'إذا نفدت الأرقام على اليمين، نضيف أصفارا لإكمال المراتب.'
				];
				solutionStepsAr = [
					`نلاحظ أننا نضرب $${numStr}$ في $${mainOp.factor}$ (أي $${absShift}$ ${absShift === 1 ? 'مرتبة' : 'مراتب'}).`,
					`نزيح الفاصلة نحو اليمين بـ $${absShift}$ ${absShift === 1 ? 'مرتبة' : 'مراتب'} مع إضافة أصفار عند الحاجة.`,
					`النتيجة هي: $${numStr} \\times ${mainOp.factor} = ${ansStr}$.`
				];
				explanation = `عند الضرب في ${mainOp.factor} نزيح الفاصلة ${absShift} ${absShift === 1 ? 'مرتبة' : 'مراتب'} نحو اليمين فنحصل على ${ansStr}.`;
			} else {
				hints = [
					`عند القسمة على $${mainOp.factor}$ يصغر العدد، فنزيح الفاصلة نحو **اليسار**.`,
					`عدد الأصفار في $${mainOp.factor}$ هو $${absShift}$، لذا نزيح الفاصلة بمقدار $${absShift}$ ${absShift === 1 ? 'مرتبة' : 'مراتب'}.`,
					'إذا وصلت الفاصلة إلى يسار العدد، نضيف أصفارا على اليسار ونكتب $0$ في الجزء الصحيح.'
				];
				solutionStepsAr = [
					`نقسم $${numStr}$ على $${mainOp.factor}$ بإزاحة الفاصلة نحو اليسار.`,
					`نزيح الفاصلة بـ $${absShift}$ ${absShift === 1 ? 'مرتبة' : 'مراتب'} مع إضافة أصفار على اليسار عند الحاجة.`,
					`النتيجة هي: $${numStr} \\div ${mainOp.factor} = ${ansStr}$.`
				];
				explanation = `عند القسمة على ${mainOp.factor} نزيح الفاصلة ${absShift} ${absShift === 1 ? 'مرتبة' : 'مراتب'} نحو اليسار فنحصل على ${ansStr}.`;
			}
		}

		const tableRows: (string | TableCell)[][] = rowSpecs.map((r) => [
			`$${r.aStr} ${r.opTypst} ${r.fac}$`,
			{
				content: '....................',
				answer: `$${r.resStr}$`,
				mark: '0.25'
			}
		]);

		const sujetContent: ContentBlock[] = [
			{
				type: 'table',
				headerBackground: true,
				align: 'center',
				borders: 'grid',
				headers: ['العملية', 'النتيجة'],
				cells: [],
				rows: tableRows
			},
			{
				type: 'text',
				content: `أكمل التحويلين الآتيين باستعمال الضرب أو القسمة على $1000$:\n\nأ) ${ltr(`${convKmStr} km = ........ m`)}  ،  ب) ${ltr(`${convGrams} g = ........ kg`)}`,
				answer: `أ) ${ltr(`${convKmStr} km = ${convMetersStr} m`)}  ،  ب) ${ltr(`${convGrams} g = ${convKgStr} kg`)}`,
				mark: '0.5'
			},
			buildIllustratedFigureBlock('pri_math_07_measuring_vessels_liter', {
				maxHeight: 112,
				width: '58%',
				mode: 'image_only',
				title: 'تَذْكِيرٌ بَصَرِيٌّ: التَّحْوِيلُ بِالضَّرْبِ أَوِ القِسْمَةِ عَلَى 10 وَ 100 وَ 1000'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
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
			sujetExercise: {
				points: 1.5,
				instruction: 'أنجز العمليات الآتية ذهنيا بإزاحة الفاصلة، ثم أكمل التحويلات:',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer: finalAnsStr
		};
	}
};

// ============================================================================
// 3. Simple Proportionality Table: Linear Properties & Coefficient
// ============================================================================

const tplSimpleProportionality: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_simple_proportionality',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'التناسبية البسيطة: الخواص الخطية ومعامل التناسبية',
	curriculumLessonId: 'lesson_4ap_t3_simple_proportionality',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 149 + difficultyOffset(difficulty));

		const contexts = [
			{
				row1: 'عدد العلب',
				row2: 'عدد الأقلام',
				unit1: 'علب',
				unit2: 'قلما',
				coeffPoolEasy: [4, 5, 6, 10],
				coeffPoolMed: [5, 6, 8, 12, 15],
				intro: 'تحتوي علب أقلام متماثلة على نفس العدد من الأقلام.'
			},
			{
				row1: 'عدد الكراريس',
				row2: 'الثمن (دج)',
				unit1: 'كراريس',
				unit2: 'دج',
				coeffPoolEasy: [10, 20, 25, 30],
				coeffPoolMed: [25, 35, 40, 45, 50],
				intro: 'تبيع مكتبة كراريس متماثلة بسعر متناسب مع عددها.'
			},
			{
				row1: 'عدد الصناديق',
				row2: 'الكتلة (kg)',
				unit1: 'صناديق',
				unit2: 'kg',
				coeffPoolEasy: [3, 4, 5, 10],
				coeffPoolMed: [6, 8, 12, 15, 20],
				intro: 'تزن صناديق متماثلة نفس الكتلة.'
			},
			{
				row1: 'عدد الكعكات',
				row2: 'كمية السكر (g)',
				unit1: 'كعكات',
				unit2: 'g',
				coeffPoolEasy: [10, 20, 25, 30],
				coeffPoolMed: [25, 30, 40, 45, 50],
				intro: 'يستعمل حلواني كمية متناسبة من السكر لصنع الكعك.'
			}
		];
		const ctx = rng.pick(contexts);

		const k =
			difficulty === 'easy'
				? rng.pick(ctx.coeffPoolEasy)
				: rng.pick(ctx.coeffPoolMed);

		const q1 = difficulty === 'easy' ? rng.pick([1, 2, 3]) : rng.pick([2, 3, 4]);
		const q2 = q1 * 2;
		const q3 = q1 + q2; // = 3 * q1 (linear addition property!)
		const q4Pool = [5, 7, 8, 9, 10, 12].filter((x) => x !== q1 && x !== q2 && x !== q3);
		const q4 = difficulty === 'easy' ? (q4Pool.includes(10) ? 10 : rng.pick(q4Pool)) : rng.pick(q4Pool);

		const p1 = q1 * k;
		const p2 = q2 * k;
		const p3 = q3 * k;
		const p4 = q4 * k;

		// Decide what QuizQuestion asks:
		// easy: find p3 (with q1 & q2 filled -> doubling / addition)
		// medium: find p4 (with q1 filled -> find coefficient k, or linearity)
		// hard: reverse find q4 given p4 (divide by coefficient k!)
		const askReverse = difficulty === 'hard' && seed % 2 === 1;

		// Keep medium/hard SVG crisp with known columns and single red ؟
		const svgDisplayCols =
			difficulty === 'easy'
				? [
						{ top: String(q1), bottom: String(p1) },
						{ top: String(q2), bottom: String(p2) },
						{ top: String(q3), bottom: '؟', askBottom: true }
					]
				: askReverse
					? [
							{ top: String(q1), bottom: String(p1) },
							{ top: String(q2), bottom: String(p2) },
							{ top: '؟', bottom: String(p4), askTop: true }
						]
					: [
							{ top: String(q1), bottom: String(p1) },
							{ top: String(q2), bottom: String(p2) },
							{ top: String(q4), bottom: '؟', askBottom: true }
						];

		const svgPath = saveSvgAsset(
			`4ap_t3_prop_${difficulty}_s${seed}`,
			svgProportionalityTable({
				row1Label: ctx.row1,
				row2Label: ctx.row2,
				cols: svgDisplayCols
			})
		);

		let expectedAnswer: number;
		let displayTemplate: string;
		let questionText: string;
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;

		if (difficulty === 'easy') {
			expectedAnswer = p3;
			displayTemplate = `${q3} → ? ${ctx.unit2}`;
			finalAnswer = `${p3} ${ctx.unit2}`;
			questionText = `${ctx.intro} لاحظ جدول التناسبية المرفق، ثم احسب العدد الناقص (؟) الموافق لـ $${q3}$ ${ctx.unit1} باستعمال الخواص الخطية (الجمع أو الضرب).`;
			hints = [
				`لاحظ العلاقة في السطر الأول بين الأعمدة: $${q1} + ${q2} = ${q3}$.`,
				`في جدول التناسبية، نجمع القيمتين الموافقتين في السطر الثاني: $${p1} + ${p2}$.`,
				`يمكنك أيضا إيجاد معامل التناسبية ($${p1} \\div ${q1} = ${k}$) ثم ضربه في $${q3}$.`
			];
			solutionStepsAr = [
				`باستعمال خاصية الجمع في التناسبية: $${q1} + ${q2} = ${q3}$.`,
				`إذن نجمع القيمتين الموافقتين: $${p1} + ${p2} = ${p3}$ ${ctx.unit2}.`
			];
			explanation = `بما أن ${q1} + ${q2} = ${q3}، فإن القيمة الموافقة هي ${p1} + ${p2} = ${p3} (أو باستعمال معامل التناسبية × ${k}: ${q3} × ${k} = ${p3}).`;
		} else if (!askReverse) {
			expectedAnswer = p4;
			displayTemplate = `${q4} → ? ${ctx.unit2}`;
			finalAnswer = `${p4} ${ctx.unit2}`;
			questionText = `${ctx.intro} تأمّل جدول التناسبية المقابل، جد **معامل التناسبية** أولا ثم احسب العدد الناقص (؟) الموافق لـ $${q4}$ ${ctx.unit1}.`;
			hints = [
				`لإيجاد معامل التناسبية اقسم السطر الثاني على السطر الأول: $${p1} \\div ${q1}$.`,
				`معامل التناسبية هو $\\times ${k}$ (أي قيمة الوحدة الواحدة تساوي $${k}$ ${ctx.unit2}).`,
				`اضرب $${q4} \\times ${k}$ لتجد العدد الناقص.`
			];
			solutionStepsAr = [
				`نحسب معامل التناسبية: $${p1} \\div ${q1} = ${k}$.`,
				`نضرب $${q4}$ في معامل التناسبية: $${q4} \\times ${k} = ${p4}$ ${ctx.unit2}.`
			];
			explanation = `معامل التناسبية هو ${p1} ÷ ${q1} = ${k}، ومنه القيمة الموافقة لـ ${q4} هي ${q4} × ${k} = ${p4}.`;
		} else {
			expectedAnswer = q4;
			displayTemplate = `? ${ctx.unit1} → ${p4} ${ctx.unit2}`;
			finalAnswer = `${q4} ${ctx.unit1}`;
			questionText = `${ctx.intro} تأمّل جدول التناسبية المقابل، جد معامل التناسبية ثم احسب العدد الناقص (؟) في السطر الأول الموافق لـ $${p4}$ ${ctx.unit2}.`;
			hints = [
				`احسب معامل التناسبية أولا بقسمة السطر الثاني على السطر الأول: $${p1} \\div ${q1} = ${k}$.`,
				`للانتقال من السطر الثاني إلى السطر الأول نقسم على معامل التناسبية ($\\div ${k}$).`,
				`احسب $${p4} \\div ${k}$.`
			];
			solutionStepsAr = [
				`معامل التناسبية للانتقال من السطر الأول إلى الثاني هو $${p1} \\div ${q1} = ${k}$.`,
				`للانتقال بالعكس من السطر الثاني إلى الأول نقسم على $${k}$: $${p4} \\div ${k} = ${q4}$ ${ctx.unit1}.`
			];
			explanation = `معامل التناسبية هو ${k}؛ وبقسمة ${p4} على ${k} نجد العدد الناقص في السطر الأول: ${q4}.`;
		}

		// Native 2-row Typst TableBlock (headers = Row 1, cells = Row 2) supporting blanks in both rows!
		const topHeaders: (string | TableCell)[] = [
			ctx.row1,
			`$${q1}$`,
			`$${q2}$`,
			`$${q3}$`,
			askReverse
				? { content: '.....', answer: `$${q4}$`, mark: '0.5' }
				: `$${q4}$`
		];
		const bottomCells: (string | TableCell)[] = [
			ctx.row2,
			`$${p1}$`,
			difficulty === 'easy' ? `$${p2}$` : { content: '.....', answer: `$${p2}$`, mark: '0.25' },
			{ content: '.....', answer: `$${p3}$`, mark: difficulty === 'easy' ? '0.5' : '0.25' },
			askReverse
				? `$${p4}$`
				: { content: '.....', answer: `$${p4}$`, mark: '0.5' }
		];

		const sujetContent: ContentBlock[] = [
			{
				type: 'table',
				headerBackground: true,
				align: 'center',
				borders: 'grid',
				headers: topHeaders,
				cells: bottomCells
			},
			{
				type: 'text',
				content: 'أوجد معامل التناسبية ثم وضّح طريقة إكمال الجدول.',
				answer: `معامل التناسبية: $${p1} div ${q1} = ${k}$ (نضرب السطر الأول في $${k}$ أو نقسم السطر الثاني على $${k}$).\n\nباستعمال الخواص الخطية: $${q2} = ${q1} times 2$، و $${q3} = ${q1} + ${q2}$ إذن $${p1} + ${p2} = ${p3}$.`,
				mark: difficulty === 'easy' ? '0.5' : '0.5'
			}
		];

		// Ensure marks sum cleanly to 1.5 across all difficulties
		if (difficulty === 'easy') {
			// bottomCells has 2 blanks (q3: 0.5, q4: 0.5) + text: 0.5 = 1.5
		} else if (!askReverse) {
			// bottomCells has 3 blanks (0.25 + 0.25 + 0.5 = 1.0) + text: 0.5 = 1.5
		} else {
			// topHeaders has 1 blank (0.5) + bottomCells has 2 blanks (0.25 + 0.25) + text: 0.5 = 1.5
		}

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'proportionality',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'جدول التناسبية',
				questionData: {
					answer: expectedAnswer,
					displayTemplate,
					variables: [],
					tolerance: 0
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: `${ctx.intro} أكمل جدول التناسبية الآتي باستعمال الخواص الخطية ومعامل التناسبية:`,
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 4. Perimeter & Area of Square/Rectangle (incl. Square Inverse) + Durations
// ============================================================================

const tplPerimeterAreaDurations: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_perimeter_area_durations',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'محيط ومساحة المربع والمستطيل وحساب المدد',
	curriculumLessonId: 'lesson_4ap_t3_perimeter_area_square_rectangle',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 167 + difficultyOffset(difficulty));

		// Part 1 geometry: rotate 0: Rectangle, 1: Square inverse (P -> side -> A), 2: Square direct or (A -> side -> P)
		const geomVariant = seed % 3;
		let svgGeomUrl = '';
		let geomPromptTypst = '';
		let geomAnsTypst = '';
		let geomQuizText = '';
		let geomCorrectVal = 0;
		let geomUnit = 'cm';
		let geomUnitKatex = '\\text{cm}';
		let geomCandidates: { val: number; diagnosticFeedback: string }[] = [];
		let geomHints: [string, string, string] = ['', '', ''];
		let geomSteps: string[] = [];
		let geomExpl = '';
		let geomCaption = 'الشكل الهندسي';

		if (geomVariant === 0) {
			// Rectangle
			const W = difficulty === 'easy' ? rng.int(3, 7) : rng.int(6, 14);
			const L = difficulty === 'easy' ? rng.int(W + 2, W + 7) : rng.int(W + 4, W + 14);
			const unit = difficulty === 'easy' ? 'cm' : 'm';
			const perim = 2 * (L + W);
			const area = L * W;
			const askArea = difficulty !== 'easy' || seed % 2 === 0;

			svgGeomUrl = saveSvgAsset(
				`4ap_t3_rect_${difficulty}_s${seed}`,
				svgRectangle({
					lengthLabel: `${L} ${unit}`,
					widthLabel: `${W} ${unit}`,
					shapeLabel: 'مستطيل',
					vertices: ['A', 'B', 'C', 'D']
				})
			);
			geomCaption = `المستطيل ABCD (${L} ${unit} و ${W} ${unit})`;
			geomPromptTypst = `1) مستطيل $A B C D$ طوله ${ltr(`${L} ${unit}`)} وعرضه ${ltr(`${W} ${unit}`)}. احسب محيطه ثم مساحته.`;
			geomAnsTypst = `1) المحيط: $2 times (${L} + ${W}) = ${perim}$ ${ltr(unit)}.\n\nالمساحة: $${L} times ${W} = ${area}$ ${ltr(`${unit}²`)}.`;

			if (askArea) {
				geomCorrectVal = area;
				geomUnit = `${unit}²`;
				geomUnitKatex = `\\text{${unit}}^2`;
				geomQuizText = `تأمّل المستطيل $ABCD$ المقابل الذي طوله $${L}\\text{ ${unit}}$ وعرضه $${W}\\text{ ${unit}}$. ما هي **مساحته** بوحدة $\\text{${unit}}^2$؟`;
				geomCandidates = [
					{
						val: perim,
						diagnosticFeedback: `القيمة $${perim}$ هي **المحيط** ($2 \\times (${L} + ${W})$) وليست المساحة! مساحة المستطيل = الطول × العرض.`
					},
					{
						val: L + W,
						diagnosticFeedback: 'لقد جمعت الطول والعرض بدل ضربهما! لحساب المساحة نضرب الطول في العرض.'
					},
					{
						val: L * L,
						diagnosticFeedback: 'ضربت الطول في نفسه كأنه مربع؛ في المستطيل نضرب الطول في العرض.'
					}
				];
				geomHints = [
					'تذكّر الفرق بين المحيط (الإطار الخارجي) والمساحة (السطح الداخلي).',
					'قانون مساحة المستطيل: المساحة = الطول × العرض.',
					`احسب $${L} \\times ${W}$.`
				];
				geomSteps = [
					`مساحة المستطيل = الطول × العرض.`,
					`$${L} \\times ${W} = ${area}\\text{ ${unit}}^2$.`
				];
				geomExpl = `مساحة المستطيل = الطول × العرض = ${L} × ${W} = ${area} ${unit}².`;
			} else {
				geomCorrectVal = perim;
				geomUnit = unit;
				geomUnitKatex = `\\text{${unit}}`;
				geomQuizText = `تأمّل المستطيل $ABCD$ المقابل الذي طوله $${L}\\text{ ${unit}}$ وعرضه $${W}\\text{ ${unit}}$. ما هو **محيطه** بوحدة $\\text{${unit}}$؟`;
				geomCandidates = [
					{
						val: L + W,
						diagnosticFeedback: `القيمة $${L + W}$ هي **نصف المحيط** فقط (طول واحد + عرض واحد)؛ لا تنسَ الضرب في $2$!`
					},
					{
						val: area,
						diagnosticFeedback: `القيمة $${area}$ هي **المساحة** (الطول × العرض) وليست المحيط.`
					},
					{
						val: 4 * L,
						diagnosticFeedback: 'ضربت الطول في $4$ كأنه مربع؛ للمستطيل ضلعان بطول $' + L + '$ وضلعان بعرض $' + W + '$.'
					}
				];
				geomHints = [
					'للمستطيل طولان متقايسان وعرضان متقايسان.',
					'محيط المستطيل = $2 \\times$ (الطول + العرض).',
					`احسب نصف المحيط ($${L} + ${W} = ${L + W}$) ثم اضرب الناتج في $2$.`
				];
				geomSteps = [
					`نصف المحيط = $${L} + ${W} = ${L + W}\\text{ ${unit}}$.`,
					`المحيط = $2 \\times ${L + W} = ${perim}\\text{ ${unit}}$.`
				];
				geomExpl = `محيط المستطيل = 2 × (${L} + ${W}) = ${perim} ${unit}.`;
			}
		} else if (geomVariant === 1) {
			// Square INVERSE: given Perimeter P -> find side -> find Area
			const s = difficulty === 'easy' ? rng.int(4, 9) : difficulty === 'medium' ? rng.int(7, 15) : rng.int(11, 22);
			const P = 4 * s;
			const A = s * s;
			const unit = difficulty === 'easy' ? 'cm' : 'm';

			svgGeomUrl = saveSvgAsset(
				`4ap_t3_sqinv_${difficulty}_s${seed}`,
				svgRectangle({
					lengthLabel: `? ${unit}`,
					widthLabel: `? ${unit}`,
					shapeLabel: `مربع محيطه ${P} ${unit}`,
					vertices: ['A', 'B', 'C', 'D']
				})
			);
			geomCaption = `مربع ABCD محيطه ${P} ${unit}`;
			geomPromptTypst = `1) قطعة أرض مربعة الشكل $A B C D$ محيطها ${ltr(`${P} ${unit}`)}. احسب طول ضلعها، ثم احسب مساحتها.`;
			geomAnsTypst = `1) طول الضلع: $${P} div 4 = ${s}$ ${ltr(unit)}.\n\nالمساحة: $${s} times ${s} = ${A}$ ${ltr(`${unit}²`)}.`;

			geomCorrectVal = A;
			geomUnit = `${unit}²`;
			geomUnitKatex = `\\text{${unit}}^2`;
			geomQuizText = `قطعة أرض مربعة الشكل $ABCD$ محيطها $${P}\\text{ ${unit}}$. احسب طول ضلعها ثم استنتج **مساحتها** بوحدة $\\text{${unit}}^2$.`;
			geomCandidates = [
				{
					val: s,
					diagnosticFeedback: `العدد $${s}$ هو **طول الضلع** فقط (${P} ÷ 4)، والمطلوب هو **المساحة** (الضلع × الضلع)!`
				},
				{
					val: P * P,
					diagnosticFeedback: 'ضربت المحيط في نفسه بدل إيجاد طول الضلع أولا بالقسمة على $4$!'
				},
				{
					val: s * 2,
					diagnosticFeedback: 'لحساب مساحة المربع نضرب طول الضلع في نفسه ($' + s + ' \\times ' + s + '$) وليس في $2$.'
				}
			];
			geomHints = [
				`محيط المربع يساوي $4 \\times$ طول الضلع، إذن نجد طول الضلع بقسمة المحيط على $4$.`,
				`طول الضلع = $${P} \\div 4 = ${s}\\text{ ${unit}}$.`,
				`الآن احسب مساحة المربع: الضلع × الضلع ($${s} \\times ${s}$).`
			];
			geomSteps = [
				`طول ضلع المربع = المحيط ÷ $4$ = $${P} \\div 4 = ${s}\\text{ ${unit}}$.`,
				`مساحة المربع = الضلع × الضلع = $${s} \\times ${s} = ${A}\\text{ ${unit}}^2$.`
			];
			geomExpl = `نجد أولا طول الضلع: ${P} ÷ 4 = ${s} ${unit}، ثم المساحة: ${s} × ${s} = ${A} ${unit}².`;
		} else {
			// Square: direct (easy) or Area -> Side -> Perimeter (medium/hard)
			if (difficulty === 'easy') {
				const s = rng.int(4, 10);
				const P = 4 * s;
				const A = s * s;
				svgGeomUrl = saveSvgAsset(
					`4ap_t3_sqdir_${difficulty}_s${seed}`,
					svgRectangle({
						lengthLabel: `${s} cm`,
						widthLabel: `${s} cm`,
						shapeLabel: 'مربع',
						vertices: ['A', 'B', 'C', 'D']
					})
				);
				geomCaption = `المربع ABCD (ضلعه ${s} cm)`;
				geomPromptTypst = `1) مربع $A B C D$ طول ضلعه ${ltr(`${s} cm`)}. احسب محيطه ثم مساحته.`;
				geomAnsTypst = `1) المحيط: $4 times ${s} = ${P}$ ${ltr('cm')}.\n\nالمساحة: $${s} times ${s} = ${A}$ ${ltr('cm²')}.`;

				geomCorrectVal = A;
				geomUnit = 'cm²';
				geomUnitKatex = '\\text{cm}^2';
				geomQuizText = `مربع $ABCD$ طول ضلعه $${s}\\text{ cm}$. ما هي **مساحته** بوحدة $\\text{cm}^2$؟`;
				geomCandidates = [
					{
						val: P,
						diagnosticFeedback: `القيمة $${P}$ هي **محيط** المربع ($4 \\times ${s}$) وليست مساحته!`
					},
					{
						val: s * 2,
						diagnosticFeedback: `لحساب مساحة المربع نضرب الضلع في نفسه ($${s} \\times ${s}$) وليس في $2$.`
					},
					{
						val: s + 4,
						diagnosticFeedback: 'المساحة تحسب بضرب الضلع في نفسه وليس بالجمع.'
					}
				];
				geomHints = [
					'للمربع أربعة أضلاع متقايسة.',
					'قانون مساحة المربع: المساحة = طول الضلع × طول الضلع.',
					`احسب $${s} \\times ${s}$.`
				];
				geomSteps = [
					`مساحة المربع = طول الضلع × طول الضلع.`,
					`$${s} \\times ${s} = ${A}\\text{ cm}^2$.`
				];
				geomExpl = `مساحة المربع = ${s} × ${s} = ${A} cm².`;
			} else {
				const s = rng.pick([4, 5, 6, 7, 8, 9, 10, 12]);
				const A = s * s;
				const P = 4 * s;
				svgGeomUrl = saveSvgAsset(
					`4ap_t3_sqarea_${difficulty}_s${seed}`,
					svgRectangle({
						lengthLabel: '? m',
						widthLabel: '? m',
						shapeLabel: `مربع مساحته ${A} m²`,
						vertices: ['A', 'B', 'C', 'D']
					})
				);
				geomCaption = `مربع ABCD مساحته ${A} m²`;
				geomPromptTypst = `1) قاعة مربعة الشكل $A B C D$ مساحتها ${ltr(`${A} m²`)}. جد طول ضلعها، ثم احسب محيطها.`;
				geomAnsTypst = `1) بما أن $${s} times ${s} = ${A}$، فإن طول الضلع هو ${ltr(`${s} m`)}.\n\nالمحيط: $4 times ${s} = ${P}$ ${ltr('m')}.`;

				geomCorrectVal = P;
				geomUnit = 'm';
				geomUnitKatex = '\\text{m}';
				geomQuizText = `قاعة مربعة الشكل $ABCD$ مساحتها $${A}\\text{ m}^2$. جد طول ضلعها ثم احسب **محيطها** بالمتر.`;
				geomCandidates = [
					{
						val: s,
						diagnosticFeedback: `العدد $${s}$ هو طول الضلع فقط؛ اضربه في $4$ لإيجاد المحيط.`
					},
					{
						val: Math.round(A / 4) === P ? P + 4 : Math.max(4, Math.round(A / 4)),
						diagnosticFeedback: 'لا نقسم المساحة على $4$ لإيجاد الضلع! ابحث عن العدد الذي إذا ضُرب في نفسه أعطى $' + A + '$.'
					},
					{
						val: s * 2,
						diagnosticFeedback: 'محيط المربع يساوي $4 \\times$ طول الضلع وليس $2 \\times$ طول الضلع.'
					}
				];
				geomHints = [
					`مساحة المربع = الضلع × الضلع. ما العدد الذي إذا ضربته في نفسه يعطي $${A}$؟`,
					`طول الضلع هو $${s}\\text{ m}$ لأن $${s} \\times ${s} = ${A}$.`,
					`الآن احسب المحيط: $4 \\times ${s}$.`
				];
				geomSteps = [
					`نبحث عن طول الضلع: $${s} \\times ${s} = ${A}$، إذن طول الضلع $= ${s}\\text{ m}$.`,
					`نحسب المحيط: $4 \\times ${s} = ${P}\\text{ m}$.`
				];
				geomExpl = `بما أن ${s} × ${s} = ${A}، فطول الضلع ${s} m، ومحيطه 4 × ${s} = ${P} m.`;
			}
		}

		// Part 2: Durations calculation (sexagesimal h, min)
		let depH: number;
		let depM: number;
		let durH: number;
		let durM: number;
		let arrH: number;
		let arrM: number;

		if (difficulty === 'easy') {
			depH = rng.int(8, 9);
			depM = rng.pick([10, 15, 20, 25]);
			durH = rng.int(1, 2);
			durM = rng.pick([10, 15, 20, 25]);
			arrH = depH + durH;
			arrM = depM + durM; // < 60
		} else {
			// Guaranteed sexagesimal carry (depM + durM >= 60) -> borrow when finding duration!
			depH = rng.int(7, 9);
			depM = rng.pick([35, 40, 45, 50]);
			durH = rng.int(1, 2);
			durM = rng.pick([25, 30, 35, 40]);
			const totalM = depM + durM;
			arrH = depH + durH + Math.floor(totalM / 60);
			arrM = totalM % 60;
			if (arrH > 12) {
				depH = 7;
				arrH = depH + durH + Math.floor(totalM / 60);
			}
		}

		const depStr = fmtClock(depH, depM);
		const arrStr = fmtClock(arrH, arrM);
		const durStr = fmtDuration(durH, durM);
		const askArrivalInDur = difficulty === 'easy' ? seed % 2 === 0 : false;
		const totalMinsConv = durH * 60 + durM;

		const durPromptTypst = askArrivalInDur
			? `2) انطلقت حافلة على الساعة ${ltr(depStr)} واستغرقت رحلتها ${ltr(durStr)}. في أي ساعة وصلت؟`
			: `2) بدأت حصة مطالعة على الساعة ${ltr(depStr)} وانتهت على الساعة ${ltr(arrStr)}. احسب مدة الحصة، ثم حوّلها إلى الدقائق.`;
		const durAnsTypst = askArrivalInDur
			? `2) وقت الوصول: ${ltr(`${depStr} + ${durStr} = ${arrStr}`)}.`
			: `2) المدة المستغرقة: ${ltr(`${arrStr} - ${depStr} = ${durStr}`)}.\n\nالتحويل إلى الدقائق: $${durH} times 60 + ${durM} = ${totalMinsConv}$ ${ltr('min')}.`;

		// Choose whether QuizQuestion tests Geometry or Durations (seed % 3 === 2 tests Durations!)
		const quizIsDuration = seed % 3 === 2;

		let finalQuizText: string;
		let finalImageUrl: string;
		let finalImageCaption: string;
		let finalMcq: { options: { text: string; diagnosticFeedback?: string }[]; correctIndices: [number] };
		let finalHints: [string, string, string];
		let finalSteps: string[];
		let finalExplanation: string;
		let finalAnswer: string;

		if (quizIsDuration) {
			const durClockUrl = saveSvgAsset(`4ap_t3_clock_${difficulty}_s${seed}`, svgAnalogClock(depH, depM));
			finalImageUrl = durClockUrl;
			finalImageCaption = `وقت البداية: ${depStr}`;

			if (askArrivalInDur) {
				finalQuizText = `انطلقت حافلة صباحا كما تشير الساعة المقابلة (${depStr})، واستغرقت الرحلة مدة $${durStr}$. في أي ساعة وصلت الحافلة؟`;
				const wrongNoCarry = fmtClock(depH + durH, (depM + durM) % 60);
				const wrongMinus10 = fmtClock(arrH, (arrM + 10) % 60);
				const wrongPlus1H = fmtClock(arrH + 1, arrM);
				finalMcq = buildUniqueMcqOptions(
					arrStr,
					[
						{
							text: wrongNoCarry === arrStr ? fmtClock(arrH - 1, arrM) : wrongNoCarry,
							diagnosticFeedback: 'عند جمع الدقائق انتبه لمبادلة كل $60$ دقيقة بساعة واحدة في عمود الساعات.'
						},
						{
							text: wrongMinus10,
							diagnosticFeedback: 'راجع جمع الدقائق بدقة: $' + depM + ' + ' + durM + '$.'
						},
						{
							text: wrongPlus1H,
							diagnosticFeedback: 'راجع عمود الساعات بعد إتمام الجمع.'
						}
					],
					rng
				);
				finalHints = [
					'لإيجاد وقت الوصول نجمع: وقت الانطلاق + المدة المستغرقة.',
					'نجمع الدقائق تحت الدقائق والساعات تحت الساعات.',
					'تذكّر أن $1\\text{ h} = 60\\text{ min}$.'
				];
				finalSteps = [
					`نجمع الدقائق: $${depM} + ${durM} = ${depM + durM}\\text{ min}$.`,
					`نجمع الساعات فنجد وقت الوصول: ${arrStr}.`
				];
				finalExplanation = `وقت الوصول = ${depStr} + ${durStr} = ${arrStr}.`;
				finalAnswer = arrStr;
			} else {
				finalQuizText = `بدأت حصة على الساعة $${depStr}$ (كما تشير الساعة المقابلة) وانتهت على الساعة $${arrStr}$. ما هي **المدة المستغرقة**؟`;
				const wrongBorrow100 = fmtDuration(arrH - depH - 1, arrM < depM ? arrM + 100 - depM : (arrM - depM + 15) % 60);
				const wrongNoBorrow = fmtDuration(arrH - depH, arrM < depM ? arrM + 60 - depM : (arrM - depM + 20) % 60);
				const wrongReversed = fmtDuration(arrH - depH, Math.abs(arrM - depM) === durM ? (durM + 10) % 60 : Math.abs(arrM - depM));
				finalMcq = buildUniqueMcqOptions(
					durStr,
					[
						{
							text: wrongBorrow100,
							diagnosticFeedback: 'عند الاستلاف من الساعات نضيف $60$ دقيقة وليس $100$ دقيقة!'
						},
						{
							text: wrongNoBorrow,
							diagnosticFeedback: 'نسيت إنقاص $1$ ساعة من ساعات الوصول بعد استلاف $60$ دقيقة.'
						},
						{
							text: wrongReversed,
							diagnosticFeedback: 'لا تطرح الدقائق الصغرى من الكبرى بالعكس! استلف $1\\text{ h} = 60\\text{ min}$ أولا.'
						}
					],
					rng
				);
				finalHints = [
					'المدة المستغرقة = وقت النهاية − وقت البداية.',
					'تذكّر النظام الستيني: $1\\text{ h} = 60\\text{ min}$.',
					arrM < depM
						? `بما أن $${arrM} < ${depM}$، استلف ساعة واحدة ($60\\text{ min}$) من الساعات.`
						: 'اطرح الدقائق ثم الساعات مباشرة.'
				];
				finalSteps = [
					`المدة المستغرقة = ${arrStr} − ${depStr}.`,
					arrM < depM
						? `نستلف ساعة فتصبح ${pad2(arrH - 1)} h ${arrM + 60} min، ثم نطرح فنجد ${durStr}.`
						: `نطرح الدقائق ثم الساعات فنجد ${durStr}.`
				];
				finalExplanation = `المدة المستغرقة = ${arrStr} − ${depStr} = ${durStr}.`;
				finalAnswer = durStr;
			}
		} else {
			finalQuizText = geomQuizText;
			finalImageUrl = svgGeomUrl;
			finalImageCaption = geomCaption;
			finalMcq = resolveDistinctDecMcq(
				geomCorrectVal,
				0,
				geomCandidates,
				(v) => `$${v}\\,${geomUnitKatex}$`,
				rng,
				'راجع قانون المحيط وقانون المساحة للمربع والمستطيل.'
			);
			finalHints = geomHints;
			finalSteps = geomSteps;
			finalExplanation = geomExpl;
			finalAnswer = `${geomCorrectVal} ${geomUnit}`;
		}

		const sujetContent: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.6fr', '1fr'],
				children: [
					{
						type: 'text',
						content: geomPromptTypst,
						answer: geomAnsTypst,
						mark: '1'
					},
					{
						type: 'image',
						src: svgGeomUrl
					}
				]
			},
			{
				type: 'text',
				content: durPromptTypst,
				answer: durAnsTypst,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'measurement',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: finalQuizText,
				questionTextAr: finalQuizText,
				imageUrl: finalImageUrl,
				imageCaption: finalImageCaption,
				questionData: {
					options: finalMcq.options,
					correctIndices: finalMcq.correctIndices,
					correctIndexes: finalMcq.correctIndices
				},
				explanation: finalExplanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ الشكل الهندسي المقابل ثم أجب عن السؤالين (المحيط والمساحة، ثم حساب المدد):',
				content: sujetContent
			},
			hints: finalHints,
			solutionStepsAr: finalSteps,
			finalAnswer
		};
	}
};

// ============================================================================
// 5. Cube & Cuboid Solids and Nets (geometry)
// ============================================================================

const tplSolidsNetsCubeCuboid: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_solids_nets_cube_cuboid',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'المجسمات: وصف وتمثيل وتصميم المكعب ومتوازي المستطيلات',
	curriculumLessonId: 'lesson_4ap_t3_solids_nets_cube_cuboid',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 191 + difficultyOffset(difficulty));

		// Build 4-option cube nets SVG (1 valid + 3 invalid)
		const validNet =
			difficulty === 'easy'
				? VALID_CUBE_NETS[0]
				: rng.pick(VALID_CUBE_NETS);
		const invalidNets = rng.pickDistinct(INVALID_CUBE_NETS, 3);
		const labels = ['(أ)', '(ب)', '(ج)', '(د)'] as const;
		const taggedNets = rng.shuffle([
			{ spec: validNet, isValid: true },
			...invalidNets.map((spec) => ({ spec, isValid: false }))
		]);
		const validIndex = taggedNets.findIndex((t) => t.isValid);

		const svgNetsUrl = saveSvgAsset(
			`4ap_t3_cubenets_${difficulty}_s${seed}`,
			svgCubeNetsChoice(
				taggedNets.map((t, i) => ({ label: labels[i], cells: t.spec.cells }))
			)
		);

		const isCubeSolid = seed % 2 === 0;
		const dimL = rng.int(5, 9);
		const dimW = rng.int(3, dimL - 1);
		const dimH = rng.int(2, dimW - 1) || 2;
		const dimCube = rng.int(3, 8);
		const svgSolidUrl = saveSvgAsset(
			`4ap_t3_solid_${difficulty}_s${seed}`,
			svgSolidAndNet({
				kind: isCubeSolid ? 'cube' : 'cuboid',
				dimLabels: isCubeSolid ? [`${dimCube} cm`, `${dimCube} cm`, `${dimCube} cm`] : [`${dimL} cm`, `${dimW} cm`, `${dimH} cm`],
				showNet: true
			})
		);

		const subVariant = seed % 3;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (subVariant === 0 || difficulty === 'easy') {
			// MCQ: Identify valid cube net among (أ) (ب) (ج) (د)
			const options = taggedNets.map((t, i) =>
				t.isValid
					? {
							text: `التصميم ${labels[i]}`
						}
					: {
							text: `التصميم ${labels[i]}`,
							diagnosticFeedback: `التصميم ${labels[i]} خاطئ: ${t.spec.defectAr}`
						}
			);
			const correctText = `التصميم ${labels[validIndex]}`;
			quizQuestion = {
				type: 'mcq',
				questionText: 'أيّ من التصاميم الأربعة المبيّنة في الشكل المقابل يمثّل **تصميما صحيحا لمكعب** عند طيّه دون تراكب؟',
				questionTextAr: 'أيّ من التصاميم الأربعة المبيّنة في الشكل المقابل يمثّل **تصميما صحيحا لمكعب** عند طيّه دون تراكب؟',
				imageUrl: svgNetsUrl,
				imageCaption: 'أربعة تصاميم مقترحة للمكعب',
				questionData: {
					options,
					correctIndices: [validIndex],
					correctIndexes: [validIndex]
				},
				explanation: `التصميم ${labels[validIndex]} هو الوحيد الذي يغلق الأوجه الستة للمكعب عند الطي دون تراكب أو بقاء وجه مفتوح.`
			};
			hints = [
				'للمكعب $6$ أوجه مربعة متقايسة؛ تحقّق من عدم وجود $5$ مربعات في صف واحد أو كتلة $2 \\times 3$.',
				'تأكّد من أن الجناحين الجانبيين يقعان في جهتين متقابلتين من الشريط الأوسط وليس في الجهة نفسها.',
				'تخيّل طيّ المربعات حول الوجه الأوسط لتتأكد من إغلاق القاعدتين العلوية والسفلية.'
			];
			solutionStepsAr = [
				'المكعب يتكون من $6$ مربعات متقايسة لا تتراكب عند الطي.',
				`التصميم ${labels[validIndex]} هو التصميم الصحيح الوحيد بين الأشكال الأربعة.`
			];
			finalAnswer = correctText;
		} else if (subVariant === 1) {
			// Matrix: 4 True/False statements about Cube & Cuboid properties
			const pool: { s: string; isTrue: boolean }[] = [
				{ s: 'للمكعب 6 أوجه كلها مربعات متقايسة.', isTrue: true },
				{ s: 'لمتوازي المستطيلات 8 رؤوس و 12 حرفا.', isTrue: true },
				{ s: 'في متوازي المستطيلات، كل وجهين متقابلين متقايسان.', isTrue: true },
				{ s: 'يملك المكعب 8 أوجه و 6 رؤوس و 10 أحرف.', isTrue: false },
				{ s: 'مستطيل مكوّن من 6 مربعات (2 × 3) يشكّل تصميما صحيحا لمكعب.', isTrue: false },
				{ s: 'الأسطوانة والمخروط لا يملكان وجوها دائرية ولا يتدحرجان.', isTrue: false }
			];
			const truePicked = rng.pickDistinct(
				pool.filter((x) => x.isTrue),
				2
			);
			const falsePicked = rng.pickDistinct(
				pool.filter((x) => !x.isTrue),
				2
			);
			const chosen = rng.shuffle([...truePicked, ...falsePicked]);

			quizQuestion = {
				type: 'matrix',
				questionText: 'تأمّل المجسم وتصميمه في الشكل المرفق، ثم حدّد صحة أو خطأ كل عبارة مما يأتي:',
				questionTextAr: 'تأمّل المجسم وتصميمه في الشكل المرفق، ثم حدّد صحة أو خطأ كل عبارة مما يأتي:',
				imageUrl: svgSolidUrl,
				imageCaption: isCubeSolid ? 'المكعب ونشره' : 'متوازي المستطيلات ونشره',
				questionData: {
					statements: chosen.map((c) => c.s),
					columns: ['صحيح', 'خطأ'],
					correctAnswers: chosen.map((c) => (c.isTrue ? 0 : 1))
				},
				explanation: 'المكعب ومتوازي المستطيلات يملك كل منهما 6 أوجه و 8 رؤوس و 12 حرفا؛ أوجه المكعب مربعات متقايسة، وأوجه متوازي المستطيلات مستطيلات متقابلة متقايسة.'
			};
			hints = [
				'يتشابه المكعب ومتوازي المستطيلات في عدد الأوجه ($6$) والرؤوس ($8$) والأحرف ($12$).',
				'أوجه المكعب كلها مربعات متقايسة، أما متوازي المستطيلات فأوجهه مستطيلات كل وجهين متقابلين متقايسان.',
				'المجسمات ذات السطوح المنحنية كالأسطوانة والكرة تتدحرج، بينما المكعب ومتوازي المستطيلات لا يتدحرجان.'
			];
			solutionStepsAr = chosen.map(
				(c) => `«${c.s}» ← ${c.isTrue ? 'صحيح' : 'خطأ'}.`
			);
			finalAnswer = chosen.map((c) => (c.isTrue ? 'صحيح' : 'خطأ')).join(' | ');
		} else {
			// MCQ: Identify faces of cuboid or cube counts
			const correctOpt = isCubeSolid
				? '6 مربعات متقايسة، و 8 رؤوس، و 12 حرفا'
				: `6 مستطيلات (كل وجهين متقابلين متقايسان): وجهان $${dimL} \\times ${dimW}$، ووجهان $${dimL} \\times ${dimH}$، ووجهان $${dimW} \\times ${dimH}$`;

			const distractors = isCubeSolid
				? [
						{
							text: '8 مربعات متقايسة، و 6 رؤوس، و 12 حرفا',
							diagnosticFeedback: 'عكست عدد الأوجه وعدد الرؤوس: للمكعب 6 أوجه و 8 رؤوس.'
						},
						{
							text: '6 مستطيلات مختلفة، و 8 رؤوس، و 10 أحرف',
							diagnosticFeedback: 'أوجه المكعب كلها مربعات متقايسة وعدد أحرفه 12 حرفا.'
						},
						{
							text: '4 مثلثات وقاعدة مربعة، و 5 رؤوس',
							diagnosticFeedback: 'هذا وصف الهرم ذي القاعدة المربعة وليس المكعب!'
						}
					]
				: [
						{
							text: '6 مربعات متقايسة لها جميعا نفس الأبعاد',
							diagnosticFeedback: 'المجسم الذي جميع أوجهه مربعات متقايسة هو المكعب، أما هذا المجسم فأبعاده الثلاثة مختلفة.'
						},
						{
							text: '4 مستطيلات وقاعدتان مثلثتان متقايستان',
							diagnosticFeedback: 'لا توجد أوجه مثلثة في متوازي المستطيلات؛ جميع أوجهه مستطيلات.'
						},
						{
							text: '8 مستطيلات متقايسة و 12 رأسا و 6 أحرف',
							diagnosticFeedback: 'لمتوازي المستطيلات 6 أوجه فقط، و 8 رؤوس، و 12 حرفا.'
						}
					];

			const mcq = buildUniqueMcqOptions(correctOpt, distractors, rng);
			quizQuestion = {
				type: 'mcq',
				questionText: isCubeSolid
					? `يظهر في الشكل المقابل **مكعب** وتصميمه. ما الوصف الصحيح لأوجهه ورؤوسه وأحرفه؟`
					: `يظهر في الشكل المقابل **متوازي مستطيلات** أبعاده $${dimL}\\text{ cm}$ و $${dimW}\\text{ cm}$ و $${dimH}\\text{ cm}$ وتصميمه. ما المضلعات المكوّنة لأوجهه؟`,
				questionTextAr: isCubeSolid
					? `يظهر في الشكل المقابل **مكعب** وتصميمه. ما الوصف الصحيح لأوجهه ورؤوسه وأحرفه؟`
					: `يظهر في الشكل المقابل **متوازي مستطيلات** أبعاده $${dimL}\\text{ cm}$ و $${dimW}\\text{ cm}$ و $${dimH}\\text{ cm}$ وتصميمه. ما المضلعات المكوّنة لأوجهه؟`,
				imageUrl: svgSolidUrl,
				imageCaption: isCubeSolid ? 'المكعب وتصميمه' : 'متوازي المستطيلات وتصميمه',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: isCubeSolid
					? 'للمكعب 6 أوجه مربعة متقايسة، و 8 رؤوس، و 12 حرفا.'
					: `لمتوازي المستطيلات 6 أوجه مستطيلة مرتبة في 3 أزواج متقابلة متقايسة.`
			};
			hints = [
				'عدّ المضلعات المرسومة في التصميم (النشر) لتحديد عدد الأوجه وشكلها.',
				isCubeSolid
					? 'في المكعب جميع الأحرف متساوية الطول وجميع الأوجه مربعات.'
					: 'في متوازي المستطيلات كل وجهين متقابلين متقايسان (ملوّنان بنفس اللون في التصميم).',
				'تذكّر القاعدة: 6 أوجه، 8 رؤوس، و 12 حرفا.'
			];
			solutionStepsAr = [
				isCubeSolid
					? 'المكعب مجسم له $6$ أوجه كلها مربعات متقايسة.'
					: 'متوازي المستطيلات له $6$ أوجه مستطيلة على شكل $3$ أزواج متقايسة.',
				'له $8$ رؤوس و $12$ حرفا.'
			];
			finalAnswer = isCubeSolid ? '6 أوجه مربعة، 8 رؤوس، 12 حرفا' : '6 مستطيلات (كل وجهين متقابلين متقايسان)';
		}

		const sujetContent: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1.2fr'],
				children: [
					{
						type: 'text',
						content: isCubeSolid
							? `1) ما اسم المجسم المبيّن في الشكل المقابل؟ اذكر عدد أوجهه، عدد رؤوسه، وعدد أحرفه.`
							: `1) ما اسم المجسم المبيّن في الشكل المقابل؟ اذكر عدد أوجهه، عدد رؤوسه، وعدد أحرفه، وحدّد شكل أوجهه.`,
						answer: isCubeSolid
							? `1) المجسم هو المكعب: له $6$ أوجه (كلها مربعات متقايسة)، و $8$ رؤوس، و $12$ حرفا.`
							: `1) المجسم هو متوازي المستطيلات: له $6$ أوجه مستطيلة (كل وجهين متقابلين متقايسان)، و $8$ رؤوس، و $12$ حرفا.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgSolidUrl
					}
				]
			},
			{
				type: 'image',
				src: svgNetsUrl,
				caption: 'أربعة تصاميم مقترحة للمكعب'
			},
			{
				type: 'text',
				content: '2) حدّد رمز التصميم الصحيح للمكعب من بين التصاميم الأربعة أعلاه، مع تعليل سبب رفض التصميم المستطيل (2 في 3) أو الصف الخماسي.',
				answer: `2) التصميم الصحيح للمكعب هو ${labels[validIndex]} لأن أوجهه الستة تنطوي دون تراكب وتغلق المكعب تماما.`,
				mark: '0.5'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'كل وجهين متقابلين في متوازي المستطيلات متقايسان.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '0.25'
					},
					{
						q: 'يمكن للمكعب أن يتدحرج على الطاولة مثل الأسطوانة.',
						a: 'خطأ',
						c: 'خطأ، أوجه المكعب مستوية فلا يتدحرج.',
						mark: '0.25'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'تأمّل المجسم وتصاميم المكعب المرفقة، ثم أجب عن الأسئلة الآتية:',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 6. Integration Situation (4 pts): School Garden/Yard + Decimal Material Cost
// ============================================================================

const tplIntegrationSchoolGarden: ParameterizedTemplate = {
	id: 'tpl_4ap_t3_integration_school_garden',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تهيئة حديقة وساحة المدرسة',
	curriculumLessonId: 'lesson_4ap_t3_integration',
	defaultPoints: 4,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + difficultyOffset(difficulty));

		const isSquareGarden = difficulty === 'hard' && seed % 2 === 1;
		const gardenLabel = seed % 2 === 0 ? 'حديقة المدرسة' : 'ساحة المدرسة';

		const L = isSquareGarden
			? rng.int(9, 16)
			: difficulty === 'easy'
				? rng.int(10, 16)
				: difficulty === 'medium'
					? rng.int(14, 22)
					: rng.int(16, 26);
		const W = isSquareGarden ? L : rng.int(6, L - 3);
		const perim = isSquareGarden ? 4 * L : 2 * (L + W);
		const area = L * W;
		const gateW =
			difficulty === 'easy'
				? rng.pick([1.5, 2.5])
				: difficulty === 'medium'
					? rng.pick([1.5, 2.5, 3.5])
					: rng.pick([1.25, 2.25, 2.75]);
		const fenceLen = roundTo(perim - gateW, 2);

		// Material purchase using 4AP-strict decimal × 10/100 and decimal add/sub
		const qty = difficulty === 'easy' ? 10 : rng.pick([10, 100]);
		const itemPlural = seed % 2 === 0 ? 'شتلات زينة' : 'مصابيح إنارة صغيرة';
		const itemSing = seed % 2 === 0 ? 'الشتلة الواحدة' : 'المصباح الواحد';
		const extraSupplyName = seed % 2 === 0 ? 'كيس سماد عضوي' : 'دلو طلاء للجدران';

		const unitPriceDec =
			qty === 10
				? roundTo(rng.int(25, 95) + rng.pick([0.25, 0.5, 0.75]), 2)
				: roundTo(rng.int(12, 48) + rng.pick([0.25, 0.5, 0.75]), 2);
		const itemsTotalCost = roundTo(unitPriceDec * qty, 2);
		const extraSupplyDec = roundTo(rng.int(160, 480) + rng.pick([0.25, 0.5, 0.75]), 2);
		const totalCost = roundTo(itemsTotalCost + extraSupplyDec, 2);

		// Budget strictly greater than totalCost and multiple of 100 DA (< 1,000,000)
		const bufferDA = rng.int(250, 950);
		const budget = Math.ceil((totalCost + bufferDA) / 100) * 100;
		const remainingBudget = roundTo(budget - totalCost, 2);

		const svgUrl = saveSvgAsset(
			`4ap_t3_garden_${difficulty}_s${seed}`,
			svgSchoolGarden({
				isSquare: isSquareGarden,
				lengthLabel: `${L} m`,
				widthLabel: `${W} m`,
				gateLabel: `مدخل: ${fmtNum(gateW, 2)} m`,
				titleLabel: gardenLabel
			})
		);

		const unitPriceStr = fmtNum(unitPriceDec, 2);
		const extraSupplyStr = fmtNum(extraSupplyDec, 2);
		const itemsTotalStr = fmtNum(itemsTotalCost, 2);
		const totalCostStr = fmtNum(totalCost, 2);
		const remainingStr = fmtNum(remainingBudget, 2);
		const gateStr = fmtNum(gateW, 2);
		const fenceStr = fmtNum(fenceLen, 2);

		const introKatex =
			`قرّرت التعاونية المدرسية تهيئة **${gardenLabel}** ` +
			(isSquareGarden
				? `المربعة الشكل التي طول ضلعها $${L}\\text{ m}$`
				: `المستطيلة الشكل التي طولها $${L}\\text{ m}$ وعرضها $${W}\\text{ m}$`) +
			`، وذلك بإحاطتها بسياج مع ترك مدخل غير مسيّج عرضه $${gateStr}\\text{ m}$.\n` +
			`ولإتمام التهيئة، خصّصت المدرسة مبلغا ماليا قدره $${budget}\\text{ DA}$، واشترت $${qty}$ من ${itemPlural} بسعر $${unitPriceStr}\\text{ DA}$ لـ${itemSing}، كما اشترت ${extraSupplyName} بسعر $${extraSupplyStr}\\text{ DA}$.`;

		const introTypst =
			`قرّرت التعاونية المدرسية تهيئة ${gardenLabel} ` +
			(isSquareGarden
				? `المربعة الشكل التي طول ضلعها ${ltr(`${L} m`)}`
				: `المستطيلة الشكل التي طولها ${ltr(`${L} m`)} وعرضها ${ltr(`${W} m`)}`) +
			`، وإحاطتها بسياج مع ترك مدخل عرضه ${ltr(`${gateStr} m`)}. خصّصت المدرسة ميزانية قدرها ${ltr(`${budget} DA`)}، واشترت $${qty}$ من ${itemPlural} بسعر ${ltr(`${unitPriceStr} DA`)} لـ${itemSing}، و${extraSupplyName} بسعر ${ltr(`${extraSupplyStr} DA`)}.`;

		const askFenceInQuiz = seed % 3 === 0;
		let quizQuestionText: string;
		let mcq: { options: { text: string; diagnosticFeedback?: string }[]; correctIndices: [number] };
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let explanation: string;
		let finalAnswer: string;

		if (askFenceInQuiz) {
			quizQuestionText = `${introKatex}\n\nاحسب محيط ${gardenLabel} ثم جد **طول السياج اللازم** بالمتر (بعد طرح عرض المدخل).`;
			const wrongForgotGate = perim;
			const wrongHalfPerim = isSquareGarden ? 2 * L - gateW : L + W - gateW;
			const wrongAreaMinusGate = area - gateW;

			mcq = resolveDistinctDecMcq(
				fenceLen,
				2,
				[
					{
						val: wrongForgotGate,
						diagnosticFeedback: `القيمة $${perim}\\text{ m}$ هي المحيط الكامل؛ لا تنسَ طرح عرض المدخل غير المسيّج ($${gateStr}\\text{ m}$).`
					},
					{
						val: wrongHalfPerim,
						diagnosticFeedback: isSquareGarden
							? 'محيط المربع يساوي $4 \\times$ طول الضلع وليس $2 \\times$ طول الضلع!'
							: 'استعملت نصف المحيط ($' + L + ' + ' + W + '$) بدل المحيط الكامل $2 \\times (' + L + ' + ' + W + ')$.'
					},
					{
						val: wrongAreaMinusGate,
						diagnosticFeedback: 'لطول السياج نحتاج إلى **المحيط** وليس إلى **المساحة**!'
					}
				],
				(v) => `$${fmtNum(v, 2)}\\text{ m}$`,
				rng,
				'راجع قانون المحيط وطرح العدد العشري بمحاذاة الفاصلة.'
			);

			hints = [
				isSquareGarden
					? `احسب أولا محيط المربع: $4 \\times ${L}$.`
					: `احسب أولا محيط المستطيل: $2 \\times (${L} + ${W})$.`,
				`المحيط الكامل يساوي $${perim}\\text{ m}$.`,
				`اطرح عرض المدخل بمحاذاة الفاصلة: $${perim}.00 - ${gateStr}$.`
			];
			solutionStepsAr = [
				isSquareGarden
					? `محيط ${gardenLabel}: $4 \\times ${L} = ${perim}\\text{ m}$، والمساحة: $${L} \\times ${L} = ${area}\\text{ m}^2$.`
					: `محيط ${gardenLabel}: $2 \\times (${L} + ${W}) = ${perim}\\text{ m}$، والمساحة: $${L} \\times ${W} = ${area}\\text{ m}^2$.`,
				`طول السياج اللازم: $${perim} - ${gateStr} = ${fenceStr}\\text{ m}$.`,
				`المصاريف الإجمالية: $(${unitPriceStr} \\times ${qty}) + ${extraSupplyStr} = ${itemsTotalStr} + ${extraSupplyStr} = ${totalCostStr}\\text{ DA}$، والمتبقي: $${budget} - ${totalCostStr} = ${remainingStr}\\text{ DA}$.`
			];
			explanation = `محيط ${gardenLabel} هو ${perim} m، وبعد طرح عرض المدخل (${gateStr} m) نجد طول السياج: ${fenceStr} m.`;
			finalAnswer = `${fenceStr} m`;
		} else {
			quizQuestionText = `${introKatex}\n\nاحسب ثمن ${itemPlural} ثم المصروف الإجمالي، واستنتج **المبلغ المتبقي** من الميزانية بالدينار.`;
			const wrongPower10 = roundTo(
				budget - (unitPriceDec * (qty === 100 ? 10 : 1) + extraSupplyDec),
				2
			);
			const wrongForgotExtra = roundTo(budget - itemsTotalCost, 2);
			const wrongTotalCost = totalCost;

			mcq = resolveDistinctDecMcq(
				remainingBudget,
				2,
				[
					{
						val: wrongForgotExtra,
						diagnosticFeedback: `نسيت إضافة ثمن ${extraSupplyName} ($${extraSupplyStr}\\text{ DA}$) إلى المصاريف قبل طرحها من الميزانية!`
					},
					{
						val: wrongPower10,
						diagnosticFeedback: `راجع ضرب السعر العشري $${unitPriceStr}$ في $${qty}$ (إزاحة الفاصلة يمينا بـ $${qty === 10 ? 1 : 2}$ مراتب).`
					},
					{
						val: wrongTotalCost,
						diagnosticFeedback: `القيمة $${totalCostStr}\\text{ DA}$ هي **المصروف الإجمالي**؛ المطلوب هو **المبلغ المتبقي** بعد طرحه من $${budget}\\text{ DA}$.`
					}
				],
				(v) => `$${fmtNum(v, 2)}\\text{ DA}$`,
				rng,
				'راجع الضرب في 10 أو 100 والجمع والطرح بمحاذاة الفاصلة.'
			);

			hints = [
				`احسب ثمن $${qty}$ من ${itemPlural} بإزاحة الفاصلة يمينا في $${unitPriceStr} \\times ${qty}$.`,
				`اجمع الناتج مع ثمن ${extraSupplyName} ($${extraSupplyStr}\\text{ DA}$) بمحاذاة الفاصلتين.`,
				`اطرح المصروف الإجمالي من الميزانية: $${budget} - ${totalCostStr}$ (بإضافة أصفار بعد الفاصلة للعدد $${budget}$).`
			];
			solutionStepsAr = [
				`ثمن $${qty}$ من ${itemPlural}: $${unitPriceStr} \\times ${qty} = ${itemsTotalStr}\\text{ DA}$.`,
				`المصروف الإجمالي: $${itemsTotalStr} + ${extraSupplyStr} = ${totalCostStr}\\text{ DA}$.`,
				`المبلغ المتبقي: $${budget}.00 - ${totalCostStr} = ${remainingStr}\\text{ DA}$.`
			];
			explanation = `ثمن ${qty} عناصر = ${itemsTotalStr} DA، والمجموع مع ${extraSupplyName} = ${totalCostStr} DA، فيتبقى ${budget} - ${totalCostStr} = ${remainingStr} DA.`;
			finalAnswer = `${remainingStr} DA`;
		}

		const areaFormulaTypst = isSquareGarden
			? `$${L} times ${L} = ${area}$`
			: `$${L} times ${W} = ${area}$`;
		const perimFormulaTypst = isSquareGarden
			? `$4 times ${L} = ${perim}$`
			: `$2 times (${L} + ${W}) = ${perim}$`;

		const sujetContent: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.6fr', '1fr'],
				children: [
					{ type: 'text', content: introTypst },
					{ type: 'image', src: svgUrl }
				]
			},
			{
				type: 'table',
				headerBackground: true,
				align: 'center',
				borders: 'grid',
				headers: ['الميزانية المخصّصة', `سعر ${itemSing}`, 'الكمية المشتراة', `ثمن ${extraSupplyName}`, 'عرض المدخل'],
				cells: [
					ltr(`${budget} DA`),
					ltr(`${unitPriceStr} DA`),
					`$${qty}$`,
					ltr(`${extraSupplyStr} DA`),
					ltr(`${gateStr} m`)
				]
			},
			{
				type: 'text',
				content: `1) احسب مساحة ${gardenLabel} بالمتر المربع، ثم احسب محيطها واستنتج طول السياج اللازم بعد ترك المدخل.`,
				answer: `1) المساحة: ${areaFormulaTypst} ${ltr('m²')}.\n\nالمحيط: ${perimFormulaTypst} ${ltr('m')}.\n\nطول السياج: $${perim} - ${gateStr} = ${fenceStr}$ ${ltr('m')}.`,
				mark: '1.25'
			},
			{
				type: 'text',
				content: `2) احسب ثمن ${qty} من ${itemPlural}، ثم احسب المصروف الإجمالي للمقتنيات.`,
				answer: `2) ثمن ${itemPlural}: $${unitPriceStr} times ${qty} = ${itemsTotalStr}$ ${ltr('DA')}.\n\nالمصروف الإجمالي: $${itemsTotalStr} + ${extraSupplyStr} = ${totalCostStr}$ ${ltr('DA')}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: '3) احسب المبلغ المالي المتبقي لدى التعاونية المدرسية بعد دفع المصاريف.',
				answer: `3) المبلغ المتبقي: $${budget}.00 - ${totalCostStr} = ${remainingStr}$ ${ltr('DA')}.`,
				mark: '1.25'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: quizQuestionText,
				questionTextAr: quizQuestionText,
				imageUrl: svgUrl,
				imageCaption: `مخطط ${gardenLabel}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'استعن بالمعطيات والجدول والمخطط المقابل لحل هذه الوضعية الإدماجية مع تنظيم الإجابة وكتابة الوحدات:',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_4AP_T3: ParameterizedTemplate[] = [
	withSafeKatex(tplDecimalAddSub),
	withSafeKatex(tplDecimalMulDiv10_100_1000),
	withSafeKatex(tplSimpleProportionality),
	withSafeKatex(tplPerimeterAreaDurations),
	withSafeKatex(tplSolidsNetsCubeCuboid),
	withSafeKatex(tplIntegrationSchoolGarden)
];
