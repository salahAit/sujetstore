import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { SeededRng, buildUniqueMcqOptions, gcd, roundTo, simplifyFraction } from '../../rng';
import {
	svgTrigonometricCircle,
	svgSpace3DScene
} from '../../svg-secondary';
import { saveSvgAsset, svgBarChart } from '../../svg-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Helper functions for deterministic RNG & dual KaTeX / Typst rendering
// ═══════════════════════════════════════════════════════════════════════════════

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 19,
	medium: 43,
	hard: 89
};

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 997 + salt * 137 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function formatFracKatex(num: number, den: number): string {
	if (den === 1) return `${num}`;
	if (num < 0) return `-\\frac{${-num}}{${den}}`;
	return `\\frac{${num}}{${den}}`;
}

function formatFracTypst(num: number, den: number): string {
	if (den === 1) return `${num}`;
	if (num < 0) return `-frac(${-num}, ${den})`;
	return `frac(${num}, ${den})`;
}

function formatNum(n: number): string {
	const r = roundTo(n, 2);
	return Object.is(r, -0) ? '0' : String(r);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Custom SVG Generators for 1AS TCST Geometry & Synthesis
// ═══════════════════════════════════════════════════════════════════════════════

/** Generates clean SVG for Thales & Similar Triangles */
function buildThalesSimilaritySvg(opts: {
	abLabel: string;
	acLabel: string;
	bcLabel: string;
	amLabel: string;
	anLabel: string;
	mnLabel: string;
	ratio: number;
}): string {
	const w = 320;
	const h = 230;
	const Ax = 50;
	const Ay = 180;
	const Bx = 270;
	const By = 180;
	const Cx = 50;
	const Cy = 40;

	const r = Math.min(0.8, Math.max(0.25, opts.ratio));
	const Mx = Ax + r * (Bx - Ax);
	const My = Ay;
	const Nx = Ax;
	const Ny = Ay - r * (Ay - Cy);

	const parts: string[] = [
		// Outer triangle ABC
		`<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="#f8fafc" stroke="#334155" stroke-width="2"/>`,
		// Trapezoid BMNC / triangle AMN shading
		`<polygon points="${Ax},${Ay} ${Mx.toFixed(1)},${My} ${Nx},${Ny.toFixed(1)}" fill="#dbeafe" fill-opacity="0.6" stroke="#2563eb" stroke-width="1.8"/>`,
		`<line x1="${Mx.toFixed(1)}" y1="${My}" x2="${Nx}" y2="${Ny.toFixed(1)}" stroke="#2563eb" stroke-width="2.2"/>`,
		// Right angle symbol at A
		`<polyline points="${Ax},${Ay - 14} ${Ax + 14},${Ay - 14} ${Ax + 14},${Ay}" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		// Points
		`<circle cx="${Ax}" cy="${Ay}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Bx}" cy="${By}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Cx}" cy="${Cy}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Mx.toFixed(1)}" cy="${My}" r="3.5" fill="#2563eb"/>`,
		`<circle cx="${Nx}" cy="${Ny.toFixed(1)}" r="3.5" fill="#2563eb"/>`,
		// Labels
		`<text x="${Ax - 16}" y="${Ay + 16}" font-size="13" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${Bx + 8}" y="${By + 16}" font-size="13" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${Cx - 16}" y="${Cy - 6}" font-size="13" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${Mx.toFixed(1)}" y="${My + 18}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">M</text>`,
		`<text x="${Nx - 18}" y="${Ny.toFixed(1)}" font-size="12" font-weight="bold" fill="#1d4ed8">N</text>`,
		// Side dimension texts
		`<text x="${(Ax + Bx) / 2}" y="${Ay + 34}" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">${escapeXml(opts.abLabel)}</text>`,
		`<text x="${Ax - 24}" y="${(Ay + Cy) / 2}" text-anchor="end" font-size="11" font-weight="bold" fill="#475569">${escapeXml(opts.acLabel)}</text>`,
		`<text x="180" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#7c3aed">${escapeXml(opts.bcLabel)}</text>`,
		`<text x="${((Mx + Nx) / 2 + 16).toFixed(1)}" y="${((My + Ny) / 2 - 6).toFixed(1)}" font-size="11" font-weight="bold" fill="#2563eb">${escapeXml(opts.mnLabel)}</text>`
	];

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/** Generates clean SVG for Probability Urn with colored & numbered balls */
function buildProbabilityUrnSvg(opts: {
	redBalls: number[];
	blackBalls: number[];
}): string {
	const w = 300;
	const h = 200;
	const parts: string[] = [];

	// Urn container
	parts.push(`<rect x="30" y="30" width="240" height="150" rx="16" fill="#f8fafc" stroke="#334155" stroke-width="2.5"/>`);
	parts.push(`<rect x="20" y="24" width="260" height="14" rx="4" fill="#64748b"/>`);

	// Arrange balls inside the urn
	const total = opts.redBalls.length + opts.blackBalls.length;
	const cols = Math.min(6, Math.max(4, Math.ceil(total / 2)));
	const r = 16;
	const startX = 60;
	const startY = 75;
	const gapX = 38;
	const gapY = 46;

	let idx = 0;
	// Red balls
	for (const num of opts.redBalls) {
		const row = Math.floor(idx / cols);
		const col = idx % cols;
		const cx = startX + col * gapX;
		const cy = startY + row * gapY;
		parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ef4444" stroke="#b91c1c" stroke-width="1.8"/>`);
		parts.push(`<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">${num}</text>`);
		idx++;
	}
	// Black balls
	for (const num of opts.blackBalls) {
		const row = Math.floor(idx / cols);
		const col = idx % cols;
		const cx = startX + col * gapX;
		const cy = startY + row * gapY;
		parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>`);
		parts.push(`<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">${num}</text>`);
		idx++;
	}

	parts.push(`<text x="${w / 2}" y="170" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">الصندوق: كرات متماثلة لا نفرق بينها باللمس</text>`);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/** Generates clean SVG for Comprehensive Synthesis Problem (right triangle parcel with dividing fence) */
function buildProblemSynthesisSvg(opts: {
	L: number;
	H: number;
	x0: number;
	MN: number;
}): string {
	const w = 340;
	const h = 230;
	const Ax = 60;
	const Ay = 180;
	const Bx = 290;
	const By = 180;
	const Cx = 60;
	const Cy = 40;

	const ratio = opts.x0 / opts.L;
	const Mx = Ax + ratio * (Bx - Ax);
	const My = Ay;
	const Nx = Mx;
	const Ny = Ay - (1 - ratio) * (Ay - Cy);

	const parts: string[] = [
		// Parcel 2 (Trapezoid AMNC)
		`<polygon points="${Ax},${Ay} ${Mx.toFixed(1)},${My} ${Nx.toFixed(1)},${Ny.toFixed(1)} ${Cx},${Cy}" fill="#fef3c7" fill-opacity="0.8" stroke="#d97706" stroke-width="2"/>`,
		// Parcel 1 (Triangle BMN)
		`<polygon points="${Mx.toFixed(1)},${My} ${Bx},${By} ${Nx.toFixed(1)},${Ny.toFixed(1)}" fill="#dbeafe" fill-opacity="0.8" stroke="#2563eb" stroke-width="2"/>`,
		// Dividing fence [MN]
		`<line x1="${Mx.toFixed(1)}" y1="${My}" x2="${Nx.toFixed(1)}" y2="${Ny.toFixed(1)}" stroke="#b91c1c" stroke-width="3" stroke-dasharray="6,4"/>`,
		// Right angles
		`<polyline points="${Ax},${Ay - 14} ${Ax + 14},${Ay - 14} ${Ax + 14},${Ay}" fill="none" stroke="#b91c1c" stroke-width="1.6"/>`,
		`<polyline points="${Mx.toFixed(1)},${My - 14} ${(Mx - 14).toFixed(1)},${My - 14} ${(Mx - 14).toFixed(1)},${My}" fill="none" stroke="#b91c1c" stroke-width="1.6"/>`,
		// Vertices
		`<circle cx="${Ax}" cy="${Ay}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Bx}" cy="${By}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Cx}" cy="${Cy}" r="3.5" fill="#0f172a"/>`,
		`<circle cx="${Mx.toFixed(1)}" cy="${My}" r="3.5" fill="#b91c1c"/>`,
		`<circle cx="${Nx.toFixed(1)}" cy="${Ny.toFixed(1)}" r="3.5" fill="#b91c1c"/>`,
		// Point Labels
		`<text x="${Ax - 18}" y="${Ay + 16}" font-size="13" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${Bx + 8}" y="${By + 16}" font-size="13" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${Cx - 18}" y="${Cy + 4}" font-size="13" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${Mx.toFixed(1)}" y="${My + 18}" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">M</text>`,
		`<text x="${Nx.toFixed(1)}" y="${(Ny - 8).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">N</text>`,
		// Area region badges
		`<rect x="${((Ax + Mx) / 2 - 28).toFixed(1)}" y="${((Ay + Cy) / 2 + 10).toFixed(1)}" width="56" height="18" rx="4" fill="#ffffff" stroke="#d97706"/>`,
		`<text x="${((Ax + Mx) / 2).toFixed(1)}" y="${((Ay + Cy) / 2 + 23).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#b45309">القطعة (2)</text>`,
		`<rect x="${((Mx + Bx) / 2 - 28).toFixed(1)}" y="${(Ay - 28).toFixed(1)}" width="56" height="18" rx="4" fill="#ffffff" stroke="#2563eb"/>`,
		`<text x="${((Mx + Bx) / 2).toFixed(1)}" y="${(Ay - 15).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">القطعة (1)</text>`,
		// Dimensions
		`<text x="${(Ax + Bx) / 2}" y="${Ay + 32}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">AB = ${opts.L} m</text>`,
		`<text x="${Ax - 24}" y="${(Ay + Cy) / 2}" text-anchor="end" font-size="11" font-weight="bold" fill="#0f172a">AC = ${opts.H} m</text>`
	];

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 1: Trigonometric Equations & Unit Circle (Analysis / Trig)
// ═══════════════════════════════════════════════════════════════════════════════
const trigEquationsTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_trig_equations',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'المعادلات المثلثية الأساسية والدائرة المثلثية',
	curriculumLessonId: 'lesson_1as_tcst_t3_trig_functions_equations_curves',
	defaultPoints: 4,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 101, difficulty);

		if (difficulty === 'easy') {
			const configs = [
				{
					fn: 'cos',
					valKatex: '\\frac{1}{2}',
					valTypst: 'frac(1, 2)',
					intervalKatex: '[-\\pi ; \\pi]',
					intervalTypst: '[ -pi ; pi ]',
					solKatex: 'S = \\left\\{-\\frac{\\pi}{3}, \\frac{\\pi}{3}\\right\\}',
					solTypst: 'cal(S) = { -frac(pi, 3) , frac(pi, 3) }',
					angles: [Math.PI / 3, -Math.PI / 3],
					angleLabels: ['pi/3', '-pi/3'],
					simplificationKatex: '\\cos(x)',
					simplificationTypst: 'cos(x)',
					distractors: [
						{
							text: '$S = \\left\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'دالة جيب التمام زوجية؛ الحلان متناظران بالنسبة لمحور الفواصل: $\\alpha$ و $-\\alpha$.'
						},
						{
							text: '$S = \\left\\{-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'تذكر أن $\\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}$ وليس $\\frac{1}{2}$.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'لا تنس الحل السالب $-\\frac{\\pi}{3}$ الواقع في المجال $[-\\pi ; \\pi]$.'
						}
					]
				},
				{
					fn: 'cos',
					valKatex: '\\frac{\\sqrt{2}}{2}',
					valTypst: 'frac(sqrt(2), 2)',
					intervalKatex: '[-\\pi ; \\pi]',
					intervalTypst: '[ -pi ; pi ]',
					solKatex: 'S = \\left\\{-\\frac{\\pi}{4}, \\frac{\\pi}{4}\\right\\}',
					solTypst: 'cal(S) = { -frac(pi, 4) , frac(pi, 4) }',
					angles: [Math.PI / 4, -Math.PI / 4],
					angleLabels: ['pi/4', '-pi/4'],
					simplificationKatex: '\\cos(x)',
					simplificationTypst: 'cos(x)',
					distractors: [
						{
							text: '$S = \\left\\{\\frac{\\pi}{4}, \\frac{3\\pi}{4}\\right\\}$',
							diagnosticFeedback: 'في المجال $[-\\pi ; \\pi]$ الحل الثاني هو $-\\frac{\\pi}{4}$.'
						},
						{
							text: '$S = \\left\\{-\\frac{\\pi}{3}, \\frac{\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'تذكر أن $\\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{4}\\right\\}$',
							diagnosticFeedback: 'المعادلة تقبل حلين متناظرين في $[-\\pi ; \\pi]$.'
						}
					]
				},
				{
					fn: 'sin',
					valKatex: '\\frac{1}{2}',
					valTypst: 'frac(1, 2)',
					intervalKatex: '[0 ; 2\\pi[',
					intervalTypst: '[ 0 ; 2 pi [',
					solKatex: 'S = \\left\\{\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right\\}',
					solTypst: 'cal(S) = { frac(pi, 6) , frac(5 pi, 6) }',
					angles: [Math.PI / 6, (5 * Math.PI) / 6],
					angleLabels: ['pi/6', '5pi/6'],
					simplificationKatex: '\\sin(x)',
					simplificationTypst: 'sin(x)',
					distractors: [
						{
							text: '$S = \\left\\{-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'المجال المطلوب هو $[0 ; 2\\pi[$ والحل السالب مرفوض فيه.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{6}, \\frac{7\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'حلول $\\sin(x) = \\sin(\\alpha)$ هي $\\alpha$ و $\\pi - \\alpha = \\frac{5\\pi}{6}$.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'القيمة $\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}$، بينما الزاوية الشهيرة لجيب $1/2$ هي $\\frac{\\pi}{6}$.'
						}
					]
				},
				{
					fn: 'sin',
					valKatex: '\\frac{\\sqrt{3}}{2}',
					valTypst: 'frac(sqrt(3), 2)',
					intervalKatex: '[0 ; 2\\pi[',
					intervalTypst: '[ 0 ; 2 pi [',
					solKatex: 'S = \\left\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right\\}',
					solTypst: 'cal(S) = { frac(pi, 3) , frac(2 pi, 3) }',
					angles: [Math.PI / 3, (2 * Math.PI) / 3],
					angleLabels: ['pi/3', '2pi/3'],
					simplificationKatex: '\\sin(x)',
					simplificationTypst: 'sin(x)',
					distractors: [
						{
							text: '$S = \\left\\{-\\frac{\\pi}{3}, \\frac{\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'المجال هو $[0 ; 2\\pi[$؛ الحلول موجبة حصراً.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'تذكر أن جيب الزاوية $\\frac{\\pi}{3}$ هو $\\frac{\\sqrt{3}}{2}$.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{3}, \\frac{4\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'في الربع الثالث جيب الزاوية سالب: $\\sin\\left(\\frac{4\\pi}{3}\\right) = -\\frac{\\sqrt{3}}{2}$.'
						}
					]
				}
			];
			const cfg = rng.pick(configs);

			const trigSvg = svgTrigonometricCircle({
				anglesRad: cfg.angles.map((rad, idx) => ({
					rad,
					label: cfg.angleLabels[idx],
					color: idx === 0 ? '#dc2626' : '#2563eb'
				}))
			});
			const svgPath = saveSvgAsset(`1as_t3_trig_${difficulty}_s${seed}`, trigSvg);

			const mcq = buildUniqueMcqOptions(`$${cfg.solKatex}$`, cfg.distractors, rng);

			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `حل في المجال $${cfg.intervalKatex}$ المعادلة المثلثية: $${cfg.fn}(x) = ${cfg.valKatex}$. ما هي مجموعة الحلول $S$؟`,
					questionTextAr: `حل في المجال $${cfg.intervalKatex}$ المعادلة المثلثية: $${cfg.fn}(x) = ${cfg.valKatex}$. ما هي مجموعة الحلول $S$؟`,
					imageUrl: svgPath,
					imageCaption: 'الدائرة المثلثية وتمثيل حلول المعادلة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `على الدائرة المثلثية في المجال $${cfg.intervalKatex}$ نجد نقطتين تحققان $${cfg.fn}(x) = ${cfg.valKatex}$، ومنه مجموعة الحلول هي $${cfg.solKatex}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر الدائرة المثلثية الموجهة $(cal(C))$ في معلم متعامد ومتجانس $(O ; vec(i), vec(j))$:`,
					content: [
						{
							type: 'text',
							content: `1) حل في المجال $${cfg.intervalTypst}$ المعادلة المثلثية: $${cfg.fn}(x) = ${cfg.valTypst}$.`,
							answer: `1) المعادلة $${cfg.fn}(x) = ${cfg.valTypst}$:\nبالرجوع إلى قيم النسب الشهيرة على الدائرة المثلثية في المجال $${cfg.intervalTypst}$ نجد الحلين:\nإذن مجموعة الحلول هي: $${cfg.solTypst}$.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'تمثيل صور الحلول على الدائرة المثلثية'
						},
						{
							type: 'text',
							content: `2) بسّط العبارة المثلثية التالية: $A(x) = cos(pi - x) + sin(frac(pi, 2) - x) + cos(-x)$.`,
							answer: `2) باستعمال خواص الزوايا المرتبطة:\n- $cos(pi - x) = -cos(x)$\n- $sin(frac(pi, 2) - x) = cos(x)$\n- $cos(-x) = cos(x)$\nنعوض في العبارة: $A(x) = -cos(x) + cos(x) + cos(x) = cos(x)$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب القيمة الدقيقة لـ $A(frac(pi, 3))$.`,
							answer: `3) لدينا $A(x) = cos(x)$، إذن: $A(frac(pi, 3)) = cos(frac(pi, 3)) = frac(1, 2)$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`تذكر الزوايا الشهيرة في الربع الأول: $\\cos(0) = 1$ ، $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$ ، $\\sin(\\frac{\\pi}{6}) = \\frac{1}{2}$ .`,
					`دالة جيب التمام زوجية: $\\cos(-x) = \\cos(x)$ ، ودالة الجيب متكاملة: $\\sin(\\pi - x) = \\sin(x)$ .`,
					`انتبه لحدود المجال المعطى: الحلول السالبة مقبولة في $[-\\pi ; \\pi]$ لكنها ترفض في $[0 ; 2\\pi[$.`
				],
				solutionStepsAr: [
					`تحديد الزاوية المرجعية $\\alpha$ في الربع الأول.`,
					`توظيف تناظر الدائرة المثلثية لتعيين الحلول ضمن المجال $${cfg.intervalKatex}$.`,
					`تبسيط العبارة بالزوايا المرتبطة: $\\cos(\\pi - x) = -\\cos(x)$ و $\\sin(\\frac{\\pi}{2} - x) = \\cos(x)$.`
				],
				finalAnswer: cfg.solKatex
			};
		}

		if (difficulty === 'medium') {
			const mediumConfigs = [
				{
					eqTypst: '2 cos(x) + sqrt(3) = 0',
					eqKatex: '2\\cos(x) + \\sqrt{3} = 0',
					reducedTypst: 'cos(x) = -frac(sqrt(3), 2)',
					reducedKatex: '\\cos(x) = -\\frac{\\sqrt{3}}{2}',
					intervalKatex: '[-\\pi ; \\pi]',
					intervalTypst: '[ -pi ; pi ]',
					solKatex: 'S = \\left\\{-\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right\\}',
					solTypst: 'cal(S) = { -frac(5 pi, 6) , frac(5 pi, 6) }',
					angles: [(5 * Math.PI) / 6, (-5 * Math.PI) / 6],
					angleLabels: ['5pi/6', '-5pi/6'],
					distractors: [
						{
							text: '$S = \\left\\{-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'انتبه للإشارة السالبة: جيب التمام سالب في الربعين الثاني والثالث وليس الأول والرابع.'
						},
						{
							text: '$S = \\left\\{\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right\\}$',
							diagnosticFeedback: 'الزاوية $\\frac{7\\pi}{6}$ خارج المجال $[-\\pi ; \\pi]$؛ تقابلها $-\\frac{5\\pi}{6}$.'
						},
						{
							text: '$S = \\left\\{-\\frac{2\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
							diagnosticFeedback: 'القيمة $-\\frac{1}{2}$ تقابل الزاوية $\\frac{2\\pi}{3}$، بينما $-\\frac{\\sqrt{3}}{2}$ تقابل $\\frac{5\\pi}{6}$.'
						}
					]
				},
				{
					eqTypst: '2 sin(x) - sqrt(2) = 0',
					eqKatex: '2\\sin(x) - \\sqrt{2} = 0',
					reducedTypst: 'sin(x) = frac(sqrt(2), 2)',
					reducedKatex: '\\sin(x) = \\frac{\\sqrt{2}}{2}',
					intervalKatex: '[0 ; 2\\pi[',
					intervalTypst: '[ 0 ; 2 pi [',
					solKatex: 'S = \\left\\{\\frac{\\pi}{4}, \\frac{3\\pi}{4}\\right\\}',
					solTypst: 'cal(S) = { frac(pi, 4) , frac(3 pi, 4) }',
					angles: [Math.PI / 4, (3 * Math.PI) / 4],
					angleLabels: ['pi/4', '3pi/4'],
					distractors: [
						{
							text: '$S = \\left\\{-\\frac{\\pi}{4}, \\frac{\\pi}{4}\\right\\}$',
							diagnosticFeedback: 'المجال هو $[0 ; 2\\pi[$؛ الحلول سالبة تقع خارجه.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{4}, \\frac{5\\pi}{4}\\right\\}$',
							diagnosticFeedback: 'في الربع الثالث الجيب سالب: $\\sin\\left(\\frac{5\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}$.'
						},
						{
							text: '$S = \\left\\{\\frac{\\pi}{4}\\right\\}$',
							diagnosticFeedback: 'المعادلة تقبل حلين في الدورة الأولى: $\\alpha$ و $\\pi - \\alpha$.'
						}
					]
				}
			];
			const cfg = rng.pick(mediumConfigs);

			const trigSvg = svgTrigonometricCircle({
				anglesRad: cfg.angles.map((rad, idx) => ({
					rad,
					label: cfg.angleLabels[idx],
					color: idx === 0 ? '#dc2626' : '#2563eb'
				}))
			});
			const svgPath = saveSvgAsset(`1as_t3_trig_${difficulty}_s${seed}`, trigSvg);
			const mcq = buildUniqueMcqOptions(`$${cfg.solKatex}$`, cfg.distractors, rng);

			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `حل في المجال $${cfg.intervalKatex}$ المعادلة: $${cfg.eqKatex}$. ما هي مجموعة الحلول؟`,
					questionTextAr: `حل في المجال $${cfg.intervalKatex}$ المعادلة: $${cfg.eqKatex}$. ما هي مجموعة الحلول؟`,
					imageUrl: svgPath,
					imageCaption: 'تمثيل الحلول على الدائرة المثلثية',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `المعادلة $${cfg.eqKatex}$ تكافئ $${cfg.reducedKatex}$. بالبحث في المجال $${cfg.intervalKatex}$ نجد الحلين $${cfg.solKatex}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب بدقة عن الأسئلة التالية موظفاً خواص الدائرة المثلثية والزوايا الشهيرة:',
					content: [
						{
							type: 'text',
							content: `1) بيّن أن المعادلة $${cfg.eqTypst}$ تكافئ $${cfg.reducedTypst}$، ثم حلّها في المجال $${cfg.intervalTypst}$.`,
							answer: `1) عزل المجهول:\n$${cfg.eqTypst} arrow.r.double ${cfg.reducedTypst}$.\nالحلول في المجال $${cfg.intervalTypst}$ هي:\n$${cfg.solTypst}$.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'موضع الحلول على الدائرة المثلثية'
						},
						{
							type: 'text',
							content: `2) بسّط العبارة الجبرية المثلثية: $B(x) = sin(pi - x) - cos(frac(pi, 2) - x) + sin(pi + x)$.`,
							answer: `2) بتطبيق علاقات الزوايا المرتبطة:\n- $sin(pi - x) = sin(x)$\n- $cos(frac(pi, 2) - x) = sin(x)$\n- $sin(pi + x) = -sin(x)$\nومنه: $B(x) = sin(x) - sin(x) + (-sin(x)) = -sin(x)$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) تحقّق من صحة المتطابقة المثلثية: $(cos(x) + sin(x))^2 = 1 + 2 cos(x) sin(x)$.`,
							answer: `3) بنشر الطرف الأيسر بالمتطابقات الشهيرة:\n$(cos(x) + sin(x))^2 = cos^2(x) + 2 cos(x) sin(x) + sin^2(x)$.\nوبما أن $cos^2(x) + sin^2(x) = 1$ من أجل كل $x in bb(R)$:\nنجد: $(cos(x) + sin(x))^2 = 1 + 2 cos(x) sin(x)$، وهو المطلوب.`,
							mark: '1'
						}
					]
				},
				hints: [
					'ابدأ بعزل الدالة المثلثية بمفردها في طرف.',
					'تذكر إشارة النسب في كل ربع: في الربع الثاني الجيب موجب وجيب التمام سالب.',
					'استعمل العلاقة الأساسية $\\cos^2(x) + \\sin^2(x) = 1$ لتبسيط المتطابقات.'
				],
				solutionStepsAr: [
					`عزل الدالة المثلثية: $${cfg.reducedKatex}$.`,
					`تعيين قوسي الزوايا المطابقة على الدائرة المثلثية: $${cfg.solKatex}$.`,
					`نشر المتطابقة الشهيرة واستعمال $\\cos^2(x) + \\sin^2(x) = 1$.`
				],
				finalAnswer: cfg.solKatex
			};
		}

		// Hard difficulty: Quadratic reducible equation in cos(x) or sin(x)
		const hardConfigs = [
			{
				rawEqTypst: '2 cos^2(x) - cos(x) - 1 = 0',
				rawEqKatex: '2\\cos^2(x) - \\cos(x) - 1 = 0',
				intervalKatex: '[-\\pi ; \\pi]',
				intervalTypst: '[ -pi ; pi ]',
				solKatex: 'S = \\left\\{-\\frac{2\\pi}{3}, 0, \\frac{2\\pi}{3}\\right\\}',
				solTypst: 'cal(S) = { -frac(2 pi, 3) , 0 , frac(2 pi, 3) }',
				angles: [0, (2 * Math.PI) / 3, (-2 * Math.PI) / 3],
				angleLabels: ['0', '2pi/3', '-2pi/3'],
				distractors: [
					{
						text: '$S = \\left\\{-\\frac{\\pi}{3}, \\frac{\\pi}{3}\\right\\}$',
						diagnosticFeedback: 'جذور المعادلة $2X^2 - X - 1 = 0$ هي $X = 1$ و $X = -1/2$، مما يعطي ثلاثة حلول.'
					},
					{
						text: '$S = \\left\\{-\\frac{2\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
						diagnosticFeedback: 'نسيت الحل $x = 0$ الناتج عن المعادلة $\\cos(x) = 1$.'
					},
					{
						text: '$S = \\left\\{0, \\frac{\\pi}{3}, \\pi\\right\\}$',
						diagnosticFeedback: '$\\cos(x) = -1/2$ تعطي $x = \\pm \\frac{2\\pi}{3}$ وليس $\\pm \\frac{\\pi}{3}$.'
					}
				]
			},
			{
				rawEqTypst: '2 sin^2(x) + sin(x) - 1 = 0',
				rawEqKatex: '2\\sin^2(x) + \\sin(x) - 1 = 0',
				intervalKatex: '[-\\pi ; \\pi]',
				intervalTypst: '[ -pi ; pi ]',
				solKatex: 'S = \\left\\{-\\frac{\\pi}{2}, \\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right\\}',
				solTypst: 'cal(S) = { -frac(pi, 2) , frac(pi, 6) , frac(5 pi, 6) }',
				angles: [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6],
				angleLabels: ['-pi/2', 'pi/6', '5pi/6'],
				distractors: [
					{
						text: '$S = \\left\\{\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right\\}$',
						diagnosticFeedback: 'نسيت الحل الناتج عن $\\sin(x) = -1$ وهو $-\\frac{\\pi}{2}$.'
					},
					{
						text: '$S = \\left\\{-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right\\}$',
						diagnosticFeedback: '$\\sin(x) = 1/2$ تقبل الحلين $\\frac{\\pi}{6}$ و $\\frac{5\\pi}{6}$ في $[-\\pi ; \\pi]$.'
					},
					{
						text: '$S = \\left\\{-\\frac{\\pi}{2}, \\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
						diagnosticFeedback: '$\\sin(\\frac{\\pi}{6}) = 1/2$ وليس $\\frac{\\pi}{3}$.'
					}
				]
			}
		];
		const cfg = rng.pick(hardConfigs);

		const trigSvg = svgTrigonometricCircle({
			anglesRad: cfg.angles.map((rad, idx) => ({
				rad,
				label: cfg.angleLabels[idx],
				color: idx === 0 ? '#dc2626' : idx === 1 ? '#2563eb' : '#16a34a'
			}))
		});
		const svgPath = saveSvgAsset(`1as_t3_trig_${difficulty}_s${seed}`, trigSvg);
		const mcq = buildUniqueMcqOptions(`$${cfg.solKatex}$`, cfg.distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `حل في المجال $${cfg.intervalKatex}$ المعادلة المثلثية من الدرجة الثانية: $${cfg.rawEqKatex}$. ما هي مجموعة الحلول $S$؟`,
				questionTextAr: `حل في المجال $${cfg.intervalKatex}$ المعادلة المثلثية: $${cfg.rawEqKatex}$. ما هي مجموعة الحلول؟`,
				imageUrl: svgPath,
				imageCaption: 'صور الحلول الثلاثة على الدائرة المثلثية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضع $X = \\cos(x)$ أو $X = \\sin(x)$ فنجد ثلاثي حدود من الدرجة الثانية. بحساب المميز $\\Delta$ نجد جذرين، ثم نحل المعادلتين البسيطتين في $${cfg.intervalKatex}$ لنحصل على: $${cfg.solKatex}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر في المجال $${cfg.intervalTypst}$ المعادلة: $(E): ${cfg.rawEqTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) بوضع مجهول مساعد مناسب، حوّل المعادلة $(E)$ إلى معادلة من الدرجة الثانية ثم احسب مميزها $Delta$ وعيّن جذريها.`,
						answer: `1) بوضع مجهول مناسب:\nنحصل على ثلاثي الحدود $2 X^2 \\pm X - 1 = 0$.\nالمميز: $Delta = b^2 - 4 a c = 1 - 4(2)(-1) = 9 = 3^2 > 0$.\nالمعادلة تقبل جذرين متمايزين $X_1$ و $X_2$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) استنتج حلول المعادلة $(E)$ في المجال $${cfg.intervalTypst}$، واكتب مجموعة الحلول $cal(S)$.`,
						answer: `2) بالتعويض في الدالة المثلثية:\n- الحلول المقابلة للجذر الأول.\n- الحلول المقابلة للجذر الثاني.\nإذن مجموعة الحلول هي: $${cfg.solTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'تمثيل الحلول على الدائرة المثلثية'
					},
					{
						type: 'text',
						content: `3) عيّن فواصل النقط وصور الحلول على الدائرة المثلثية، ومثّل المضلع الناتج عن الوصل بينها.`,
						answer: `3) النقط ممثلة على الدائرة المثلثية المرفقة، والوصل بينها يشكل مثلثاً رؤوسه صور الحلول.`,
						mark: '1'
					}
				]
			},
			hints: [
				'ضع متغيراً مساعداً $X = \\cos(x)$ لتحويل العبارة إلى معادلة مألوفة من الدرجة الثانية.',
				'احسب المميز $\\Delta = b^2 - 4ac$ وتحقق أن الجذور تنتمي للمجال $[-1 ; 1]$ حتى تقبل حلولاً مثلثة.',
				'ارسم الدائرة المثلثية وحدد القوس المناسب لكل جذر.'
			],
			solutionStepsAr: [
				`التحويل إلى ثلاثي حدود من الدرجة الثانية.`,
				`حساب $\\Delta = 9$ وتحديد الجذرين $X_1$ و $X_2$.`,
				`حل المعادلتين البسيطتين واستخلاص $${cfg.solKatex}$.`
			],
			finalAnswer: cfg.solKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 2: Thales Theorem & Similar Triangles (Geometry / Similarity)
// ═══════════════════════════════════════════════════════════════════════════════
const thalesSimilarityTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_thales_similarity',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'مبرهنة طاليس وتقايس وتشابه المثلثات',
	curriculumLessonId: 'lesson_1as_tcst_t3_triangle_congruence_similarity_transforms',
	defaultPoints: 4,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 202, difficulty);

		const configs = [
			{ ab: 8, ac: 6, bc: 10, num: 1, den: 2 },
			{ ab: 12, ac: 9, bc: 15, num: 1, den: 3 },
			{ ab: 12, ac: 9, bc: 15, num: 2, den: 3 },
			{ ab: 16, ac: 12, bc: 20, num: 1, den: 4 },
			{ ab: 16, ac: 12, bc: 20, num: 3, den: 4 },
			{ ab: 15, ac: 20, bc: 25, num: 2, den: 5 },
			{ ab: 15, ac: 20, bc: 25, num: 3, den: 5 },
			{ ab: 10, ac: 24, bc: 26, num: 1, den: 2 }
		];
		const cfg = rng.pick(configs);

		const kRatio = cfg.num / cfg.den;
		const am = cfg.ab * kRatio;
		const an = cfg.ac * kRatio;
		const mn = cfg.bc * kRatio;
		const areaAbc = (cfg.ab * cfg.ac) / 2;
		const areaAmn = areaAbc * (kRatio * kRatio);
		const areaBmnc = areaAbc - areaAmn;

		const svgContent = buildThalesSimilaritySvg({
			abLabel: `${cfg.ab} cm`,
			acLabel: `${cfg.ac} cm`,
			bcLabel: `${cfg.bc} cm`,
			amLabel: `${formatNum(am)}`,
			anLabel: `${formatNum(an)}`,
			mnLabel: `${formatNum(mn)} cm`,
			ratio: kRatio
		});
		const svgPath = saveSvgAsset(`1as_t3_thales_${difficulty}_s${seed}`, svgContent);

		if (difficulty === 'easy') {
			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في الشكل المرفق: المثلث $ABC$ قائم في $A$ حيث $AB = ${cfg.ab}\\text{ cm}$ و $AC = ${cfg.ac}\\text{ cm}$ . المستقيم $(MN)$ يوازي $(BC)$ حيث $M \\in [AB]$ و $AM = ${formatNum(am)}\\text{ cm}$ . احسب مساحة المثلث $AMN$ بالسنتيمتر المربع ($cm^2$).`,
					questionTextAr: `احسب مساحة المثلث $AMN$ بالسنتيمتر المربع ($cm^2$):`,
					imageUrl: svgPath,
					imageCaption: 'المثلثان المتشابهان AMN و ABC',
					questionData: {
						answer: roundTo(areaAmn, 2),
						tolerance: 0.1,
						displayTemplate: 'مساحة المثلث AMN = ? cm²',
						variables: []
					},
					explanation: `نسبة التشابه هي $k = \\frac{AM}{AB} = ${formatFracKatex(cfg.num, cfg.den)}$ . مساحة $ABC$ هي $\\frac{${cfg.ab} \\times ${cfg.ac}}{2} = ${areaAbc}\\text{ cm}^2$ . إذن مساحة $AMN$ هي $k^2 \\times ${areaAbc} = \\left(${formatFracKatex(cfg.num, cfg.den)}\\right)^2 \\times ${areaAbc} = ${areaAmn}\\text{ cm}^2$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `المستوي منسوب إلى معلم هندسي. الأطوال معطاة بالسنتيمتر ($upright("cm")$). نعتبر المثلث $A B C$ القائم في $A$ حيث $A B = ${cfg.ab}$ و $A C = ${cfg.ac}$ . النقطة $M in [A B]$ حيث $A M = ${formatNum(am)}$ ، والمستقيم المار من $M$ والموازي لـ $(B C)$ يقطع $[A C]$ في $N$.`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'الشكل الهندسي للمثلثين المتشابهين'
						},
						{
							type: 'text',
							content: `1) احسب الطول $B C$ بتطبيق مبرهنة فيثاغورث في المثلث $A B C$.`,
							answer: `1) بما أن المثلث $A B C$ قائم في $A$، فحسب مبرهنة فيثاغورث:\n$B C^2 = A B^2 + A C^2 = ${cfg.ab}^2 + ${cfg.ac}^2 = ${cfg.ab * cfg.ab} + ${cfg.ac * cfg.ac} = ${cfg.bc * cfg.bc}$.\nومنه: $B C = sqrt(${cfg.bc * cfg.bc}) = ${cfg.bc} upright("cm")$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) برّر أن المثلثين $A M N$ و $A B C$ متشابهان، ثم عيّن نسبة التشابه $k = frac(A M, A B)$.`,
							answer: `2) بما أن $(M N) parallel (B C)$ مع $M in [A B]$ و $N in [A C]$، فحسب خاصية طاليس:\nالمثلثان $A M N$ و $A B C$ يشتركان في الزاوية $hat(A)$ وتتساوى زواياهما بالتناظر، فهما متشابهان.\nنسبة التشابه هي: $k = frac(A M, A B) = frac(${formatNum(am)}, ${cfg.ab}) = ${formatFracTypst(cfg.num, cfg.den)}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب كلاً من الطولين $A N$ و $M N$.`,
							answer: `3) بتطبيق مبرهنة طاليس:\n$frac(A M, A B) = frac(A N, A C) = frac(M N, B C) = ${formatFracTypst(cfg.num, cfg.den)}$.\n- $A N = ${formatFracTypst(cfg.num, cfg.den)} times ${cfg.ac} = ${formatNum(an)} upright("cm")$.\n- $M N = ${formatFracTypst(cfg.num, cfg.den)} times ${cfg.bc} = ${formatNum(mn)} upright("cm")$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `4) احسب مساحة المثلث $A B C$، ثم استنتج مساحة المثلث $A M N$ باستعمال النسبة $k^2$.`,
							answer: `4) مساحة المثلث القائم $A B C$ هي:\n$cal(A)_(A B C) = frac(A B times A C, 2) = frac(${cfg.ab} times ${cfg.ac}, 2) = ${areaAbc} upright("cm")^2$.\nومنه مساحة المثلث المصغر $A M N$ هي:\n$cal(A)_(A M N) = k^2 times cal(A)_(A B C) = (${formatFracTypst(cfg.num, cfg.den)})^2 times ${areaAbc} = frac(${cfg.num * cfg.num}, ${cfg.den * cfg.den}) times ${areaAbc} = ${formatNum(areaAmn)} upright("cm")^2$.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					'طبق مبرهنة فيثاغورث لحساب الوتر $BC = \\sqrt{AB^2 + AC^2}$.',
					'نسبة التشابه بين المثلثين هي $k = \\frac{AM}{AB}$.',
					'عند تشابه شكلين بنسبة $k$، تضرب المساحات في $k^2$.'
				],
				solutionStepsAr: [
					`حساب الوتر $BC = ${cfg.bc}\\text{ cm}$.`,
					`حساب نسبة التشابه $k = ${formatFracKatex(cfg.num, cfg.den)}$.`,
					`حساب مساحة $ABC = ${areaAbc}\\text{ cm}^2$ ثم مساحة $AMN = k^2 \\times ${areaAbc} = ${areaAmn}\\text{ cm}^2$.`
				],
				finalAnswer: `${areaAmn}`
			};
		}

		if (difficulty === 'medium') {
			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في المثلث $ABC$ القائم في $A$ حيث $AB = ${cfg.ab}\\text{ cm}$ و $AC = ${cfg.ac}\\text{ cm}$ ، يوازي المستقيم $(MN)$ الضلع $(BC)$ مع $AM = ${formatNum(am)}\\text{ cm}$ . احسب مساحة الرباعي (شبه المنحرف) $BMNC$ بالسنتيمتر المربع ($cm^2$).`,
					questionTextAr: `احسب مساحة الرباعي $BMNC$ بالسنتيمتر المربع ($cm^2$):`,
					imageUrl: svgPath,
					imageCaption: 'الرباعي BMNC والمثلثان المتشابهان',
					questionData: {
						answer: roundTo(areaBmnc, 2),
						tolerance: 0.1,
						displayTemplate: 'مساحة الرباعي BMNC = ? cm²',
						variables: []
					},
					explanation: `مساحة المثلث $ABC$ هي $S = ${areaAbc}\\text{ cm}^2$ ومساحة $AMN$ هي $S' = k^2 S = ${areaAmn}\\text{ cm}^2$ . مساحة الرباعي هي فرق المساحتين: $S_{BMNC} = ${areaAbc} - ${areaAmn} = ${areaBmnc}\\text{ cm}^2$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `الشكل الهندسي المرفق يمثل مثلثاً $A B C$ قائماً في $A$ بأطوال $A B = ${cfg.ab} upright("cm")$ و $A C = ${cfg.ac} upright("cm")$ . النقطتان $M in [A B]$ و $N in [A C]$ تحققان $(M N) parallel (B C)$ و $A M = ${formatNum(am)} upright("cm")$.`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'تقسيم المثلث ABC إلى مثلث وشبه منحرف'
						},
						{
							type: 'text',
							content: `1) برهن أن المثلثين $A M N$ و $A B C$ متشابهان واذكر معيار التشابه المعتمد.`,
							answer: `1) بما أن $(M N) parallel (B C)$ والمستقيمان $(A B)$ و $(A C)$ متقاطعان في $A$، فإن:\nالزاوية $hat(A)$ مشتركة، والزاويتان $hat(A M N)$ و $hat(A B C)$ متماثلتان ومتقايستان.\nإذن يتشابه المثلثان لتساوي قياسات زواياهما (معيار تساوي زاويتين).`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب نسبة التشابه $k$، ثم احسب الطول $M N$.`,
							answer: `2) نسبة التشابه هي: $k = frac(A M, A B) = frac(${formatNum(am)}, ${cfg.ab}) = ${formatFracTypst(cfg.num, cfg.den)}$.\nحسب مبرهنة فيثاغورث: $B C = sqrt(${cfg.ab}^2 + ${cfg.ac}^2) = ${cfg.bc} upright("cm")$.\nإذن: $M N = k times B C = ${formatFracTypst(cfg.num, cfg.den)} times ${cfg.bc} = ${formatNum(mn)} upright("cm")$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب مساحة المثلث $A B C$ ومساحة المثلث $A M N$، ثم استنتج مساحة شبه المنحرف $B M N C$.`,
							answer: `3) مساحة المثلث $A B C$: $cal(A)_(A B C) = frac(${cfg.ab} times ${cfg.ac}, 2) = ${areaAbc} upright("cm")^2$.\nمساحة المثلث $A M N$: $cal(A)_(A M N) = k^2 times cal(A)_(A B C) = (${formatFracTypst(cfg.num, cfg.den)})^2 times ${areaAbc} = ${formatNum(areaAmn)} upright("cm")^2$.\nإذن مساحة شبه المنحرف $B M N C$ هي الفرق بينهما:\n$cal(A)_(B M N C) = cal(A)_(A B C) - cal(A)_(A M N) = ${areaAbc} - ${areaAmn} = ${areaBmnc} upright("cm")^2$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'المثلثان المتشابهان ينتجان عن قاطع ومستقيمين متوازيين.',
					'احسب مساحة المثلث الكلي ثم مساحة المثلث المصغر بالضرب في $k^2$.',
					'مساحة شبه المنحرف تساوي مساحة المثلث الكبير مطروحاً منها مساحة المثلث الصغير.'
				],
				solutionStepsAr: [
					`إثبات التشابه وتعيين النسبة $k = ${formatFracKatex(cfg.num, cfg.den)}$.`,
					`حساب مساحة $ABC = ${areaAbc}$ ومساحة $AMN = ${areaAmn}$.`,
					`حساب مساحة شبه المنحرف $BMNC = ${areaAbc} - ${areaAmn} = ${areaBmnc}\\text{ cm}^2$.`
				],
				finalAnswer: `${areaBmnc}`
			};
		}

		// Hard difficulty: Converse of Thales, Similarity proof, and area ratio fraction
		const [redNum, redDen] = simplifyFraction(cfg.den * cfg.den - cfg.num * cfg.num, cfg.den * cfg.den);
		const ratioMcqKatex = formatFracKatex(redNum, redDen);
		const ratioMcqTypst = formatFracTypst(redNum, redDen);

		const distractors = [
			{
				text: `$${formatFracKatex(cfg.num * cfg.num, cfg.den * cfg.den)}$`,
				diagnosticFeedback: 'هذه نسبة مساحة المثلث المصغر $AMN$ إلى $ABC$، وليست نسبة مساحة شبه المنحرف $BMNC$.'
			},
			{
				text: `$${formatFracKatex(cfg.den - cfg.num, cfg.den)}$`,
				diagnosticFeedback: 'انتبه: نسبة المساحات تتبع مربع نسبة الأطوال $1 - k^2$ وليس $1 - k$.'
			},
			{
				text: `$${formatFracKatex(redNum + 1, redDen)}$`,
				diagnosticFeedback: 'تحقق من حساب $1 - k^2 = 1 - \\left(' + formatFracKatex(cfg.num, cfg.den) + '\\right)^2$.'
			}
		];
		const mcq = buildUniqueMcqOptions(`$${ratioMcqKatex}$`, distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المثلث $ABC$ لدينا $M \\in [AB]$ و $N \\in [AC]$ بحيث $(MN) \\parallel (BC)$ بنسبة تشابه $k = ${formatFracKatex(cfg.num, cfg.den)}$ . ما هي النسبة الكسرية المختزلة لمساحة الرباعي $BMNC$ إلى مساحة المثلث الكلي $ABC$، أي $\\frac{\\text{Area}(BMNC)}{\\text{Area}(ABC)}$؟`,
				questionTextAr: `ما هي نسبة مساحة الرباعي $BMNC$ إلى مساحة المثلث $ABC$؟`,
				imageUrl: svgPath,
				imageCaption: 'نسبة مساحة الرباعي إلى مساحة المثلث',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مساحة $AMN$ تمثل $k^2$ من مساحة $ABC$. إذن مساحة $BMNC$ تمثل $1 - k^2 = 1 - \\left(${formatFracKatex(cfg.num, cfg.den)}\\right)^2 = 1 - ${formatFracKatex(cfg.num * cfg.num, cfg.den * cfg.den)} = ${ratioMcqKatex}$ .`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر المثلث $A B C$ حيث $A B = ${cfg.ab} upright("cm")$ و $A C = ${cfg.ac} upright("cm")$ و $B C = ${cfg.bc} upright("cm")$ . النقطتان $M in [A B]$ و $N in [A C]$ تحققان $A M = ${formatNum(am)} upright("cm")$ و $A N = ${formatNum(an)} upright("cm")$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'التحقق من التوازي ونسبة المساحات'
					},
					{
						type: 'text',
						content: `1) بين أن المثلث $A B C$ قائم في $A$ باستعمال الخاصية العكسية لمبرهنة فيثاغورث.`,
						answer: `1) نحسب أطول ضلع مربعاً: $B C^2 = ${cfg.bc}^2 = ${cfg.bc * cfg.bc}$.\nمجموع مربعي الضلعين الآخرين: $A B^2 + A C^2 = ${cfg.ab}^2 + ${cfg.ac}^2 = ${cfg.ab * cfg.ab} + ${cfg.ac * cfg.ac} = ${cfg.bc * cfg.bc}$.\nبما أن $B C^2 = A B^2 + A C^2$، فحسب الخاصية العكسية لمبرهنة فيثاغورث فالمثلث $A B C$ قائم في $A$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب النسبتين $frac(A M, A B)$ و $frac(A N, A C)$، ثم استنتج أن المستقيمين $(M N)$ و $(B C)$ متوازيان.`,
						answer: `2) حساب النسبتين:\n- $frac(A M, A B) = frac(${formatNum(am)}, ${cfg.ab}) = ${formatFracTypst(cfg.num, cfg.den)}$.\n- $frac(A N, A C) = frac(${formatNum(an)}, ${cfg.ac}) = ${formatFracTypst(cfg.num, cfg.den)}$.\nبما أن $frac(A M, A B) = frac(A N, A C)$ والنقط $A, M, B$ وكذا $A, N, C$ في نفس الترتيب، فحسب الخاصية العكسية لطاليس فإن $(M N) parallel (B C)$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) برهن أن النسبة بين مساحة شبه المنحرف $B M N C$ ومساحة المثلث $A B C$ هي $1 - k^2 = ${ratioMcqTypst}$.`,
						answer: `3) مساحة $A M N$ هي $cal(A)_(A M N) = k^2 times cal(A)_(A B C)$.\nمساحة شبه المنحرف هي:\n$cal(A)_(B M N C) = cal(A)_(A B C) - cal(A)_(A M N) = (1 - k^2) cal(A)_(A B C)$.\nإذن:\n$frac(cal(A)_(B M N C), cal(A)_(A B C)) = 1 - k^2 = 1 - (${formatFracTypst(cfg.num, cfg.den)})^2 = 1 - ${formatFracTypst(cfg.num * cfg.num, cfg.den * cfg.den)} = ${ratioMcqTypst}$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'طبق الخاصية العكسية لمبرهنة فيثاغورث بالتحقق من $BC^2 = AB^2 + AC^2$.',
				'تأكد من تساوي النسبتين وترتيب النقط على المستقيمين لتطبيق عكس طاليس.',
				'علاقة مساحة شبه المنحرف بالمثلث الكلي هي دائماً $1 - k^2$.'
			],
			solutionStepsAr: [
				`إثبات تعامد المثلث $ABC$ بالخاصية العكسية لفيثاغورث.`,
				`إثبات توازي $(MN) \\parallel (BC)$ بالخاصية العكسية لطاليس.`,
				`استنتاج نسبة المساحات: $\\frac{\\text{Area}(BMNC)}{\\text{Area}(ABC)} = 1 - k^2 = ${ratioMcqKatex}$.`
			],
			finalAnswer: ratioMcqKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 3: Space Geometry, Familiar Solids & Volumes (Space Geometry)
// ═══════════════════════════════════════════════════════════════════════════════
const spaceSolidsVolumesTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_space_solids_volumes',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الهندسة في الفضاء: المجسمات المألوفة، الحجوم والمساحات',
	curriculumLessonId: 'lesson_1as_tcst_t3_space_geometry_solids_perspective_volumes',
	defaultPoints: 4,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 303, difficulty);

		if (difficulty === 'easy') {
			// Rectangular cuboid ABCDEFGH
			const cuboids = [
				{ a: 4, b: 3, c: 5 },
				{ a: 6, b: 4, c: 5 },
				{ a: 8, b: 6, c: 5 },
				{ a: 12, b: 5, c: 8 },
				{ a: 6, b: 8, c: 10 }
			];
			const cb = rng.pick(cuboids);
			const volume = cb.a * cb.b * cb.c;
			const faceDiagAc = Math.round(Math.sqrt(cb.a * cb.a + cb.b * cb.b) * 100) / 100;
			const totalArea = 2 * (cb.a * cb.b + cb.b * cb.c + cb.a * cb.c);

			const sceneSvg = svgSpace3DScene({
				points: [
					{ x: 0, y: 0, z: 0, label: 'A', color: '#0f172a' },
					{ x: 3, y: 0, z: 0, label: 'B', color: '#0f172a' },
					{ x: 3, y: 2.5, z: 0, label: 'C', color: '#0f172a' },
					{ x: 0, y: 2.5, z: 0, label: 'D', color: '#0f172a' },
					{ x: 0, y: 0, z: 2.8, label: 'E', color: '#2563eb' },
					{ x: 3, y: 0, z: 2.8, label: 'F', color: '#2563eb' },
					{ x: 3, y: 2.5, z: 2.8, label: 'G', color: '#2563eb' },
					{ x: 0, y: 2.5, z: 2.8, label: 'H', color: '#2563eb' }
				],
				showPlanePatch: true,
				planeLabel: '(ABCD)'
			});
			const svgPath = saveSvgAsset(`1as_t3_space_${difficulty}_s${seed}`, sceneSvg);

			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `متوازي مستطيلات قائم $ABCDEFGH$ أبعاده: $AB = ${cb.a}\\text{ cm}$ ، $AD = ${cb.b}\\text{ cm}$ ، و $AE = ${cb.c}\\text{ cm}$ . احسب حجمه $V$ بالسنتيمتر المكعب ($cm^3$).`,
					questionTextAr: `احسب حجم متوازي المستطيلات القائم بالسنتيمتر المكعب ($cm^3$):`,
					imageUrl: svgPath,
					imageCaption: 'متوازي المستطيلات القائم ABCDEFGH في الفضاء',
					questionData: {
						answer: volume,
						tolerance: 0.1,
						displayTemplate: 'الحجم V = ? cm³',
						variables: []
					},
					explanation: `حجم متوازي المستطيلات القائم يساوي جداء أبعاده الثلاثة: $V = AB \\times AD \\times AE = ${cb.a} \\times ${cb.b} \\times ${cb.c} = ${volume}\\text{ cm}^3$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `يمثل الشكل المرفق متوازي مستطيلات قائماً $A B C D E F G H$ بأبعاد: $A B = ${cb.a} upright("cm")$ ، $A D = ${cb.b} upright("cm")$ ، و $A E = ${cb.c} upright("cm")$.`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'تمثيل متوازي المستطيلات في الفضاء بالمنظور متساوي القياس'
						},
						{
							type: 'text',
							content: `1) احسب الطول $A C$ (قطر القاعدة المستطيلة $A B C D$).`,
							answer: `1) بما أن القاعدة $A B C D$ مستطيل قائم في $B$، فحسب مبرهنة فيثاغورث:\n$A C^2 = A B^2 + B C^2 = ${cb.a}^2 + ${cb.b}^2 = ${cb.a * cb.a + cb.b * cb.b}$.\nإذن: $A C = sqrt(${cb.a * cb.a + cb.b * cb.b}) approx ${faceDiagAc} upright("cm")$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) برّر لماذا المستقيم $(A E)$ عمودي على المستوي $(A B C D)$، ثم استنتج طبيعة المثلث $E A C$.`,
							answer: `2) المستقيم $(A E)$ هو حرف جانبي لمتوازي المستطيلات القائم، فهو عمودي على حافتين متقاطعتين من القاعدة: $(A E) perp (A B)$ و $(A E) perp (A D)$.\nإذن $(A E)$ عمودي على المستوي $(A B C D)$.\nوبما أن $(A C)$ محتوى في $(A B C D)$، فإن $(A E) perp (A C)$، مما يعني أن المثلث $E A C$ قائم في $A$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب الحجم $V$ والمساحة الكلية $S_(upright("tot"))$ لمتوازي المستطيلات.`,
							answer: `3) - الحجم: $V = A B times A D times A E = ${cb.a} times ${cb.b} times ${cb.c} = ${volume} upright("cm")^3$.\n- المساحة الكلية: $S_(upright("tot")) = 2(A B times A D + A D times A E + A B times A E) = 2(${cb.a * cb.b} + ${cb.b * cb.c} + ${cb.a * cb.c}) = ${totalArea} upright("cm")^2$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'قطر المستطيل يحسب بفيثاغورث: $AC = \\sqrt{AB^2 + BC^2}$.',
					'يكون مستقيم عمودياً على مستو إذا عيّن زاوية قائمة مع مستقيمين متقاطعين منه.',
					'الحجم هو جداء الأبعاد الثلاثة: الطول $\\times$ العرض $\\times$ الارتفاع.'
				],
				solutionStepsAr: [
					`حساب قطر القاعدة $AC = ${faceDiagAc}\\text{ cm}$.`,
					`إثبات تعامد المستقيم $(AE)$ مع المستوي $(ABCD)$ وتعامد المثلث $EAC$.`,
					`حساب الحجم $V = ${volume}\\text{ cm}^3$ والمساحة الكلية $S = ${totalArea}\\text{ cm}^2$.`
				],
				finalAnswer: `${volume}`
			};
		}

		if (difficulty === 'medium') {
			// Regular pyramid SABCD with square base ABCD
			const pyramids = [
				{ a: 6, h: 4, slant: 5 }, // 4^2 + 3^2 = 25 -> 5
				{ a: 8, h: 3, slant: 5 }, // 3^2 + 4^2 = 25 -> 5
				{ a: 10, h: 12, slant: 13 }, // 12^2 + 5^2 = 169 -> 13
				{ a: 12, h: 8, slant: 10 } // 8^2 + 6^2 = 100 -> 10
			];
			const pyr = rng.pick(pyramids);
			const baseArea = pyr.a * pyr.a;
			const volume = roundTo((1 / 3) * baseArea * pyr.h, 2);
			const lateralArea = 2 * pyr.a * pyr.slant;
			const totalArea = baseArea + lateralArea;

			const sceneSvg = svgSpace3DScene({
				points: [
					{ x: 0, y: 0, z: 0, label: 'A', color: '#0f172a' },
					{ x: 3, y: 0, z: 0, label: 'B', color: '#0f172a' },
					{ x: 3, y: 3, z: 0, label: 'C', color: '#0f172a' },
					{ x: 0, y: 3, z: 0, label: 'D', color: '#0f172a' },
					{ x: 1.5, y: 1.5, z: 3.2, label: 'S', color: '#dc2626' },
					{ x: 1.5, y: 1.5, z: 0, label: 'O', color: '#16a34a' }
				],
				showPlanePatch: true,
				planeLabel: '(ABCD)'
			});
			const svgPath = saveSvgAsset(`1as_t3_space_${difficulty}_s${seed}`, sceneSvg);

			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `هرم منتظم $SABCD$ قاعدته المربعة $ABCD$ طول ضلعها $a = ${pyr.a}\\text{ cm}$ وارتفاعه $SO = ${pyr.h}\\text{ cm}$ (حيث $O$ مركز القاعدة). احسب حجم الهرم $V$ بالسنتيمتر المكعب ($cm^3$).`,
					questionTextAr: `احسب حجم الهرم المنتظم بالسنتيمتر المكعب ($cm^3$):`,
					imageUrl: svgPath,
					imageCaption: 'الهرم المنتظم SABCD في الفضاء',
					questionData: {
						answer: volume,
						tolerance: 0.1,
						displayTemplate: 'حجم الهرم V = ? cm³',
						variables: []
					},
					explanation: `مساحة القاعدة المربعة هي $B = ${pyr.a}^2 = ${baseArea}\\text{ cm}^2$ . حجم الهرم هو $V = \\frac{1}{3} B \\times h = \\frac{1}{3} \\times ${baseArea} \\times ${pyr.h} = ${volume}\\text{ cm}^3$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر هرماً منتظماً $S A B C D$ رأسه $S$ وقاعدته المربعة $A B C D$ حيث طول ضلعها $a = ${pyr.a} upright("cm")$ ، وارتفاعه $S O = ${pyr.h} upright("cm")$ حيث $O$ مركز المربع $A B C D$. النقطة $I$ هي منتصف الضلع $[B C]$.`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'تمثيل الهرم المنتظم SABCD في الفضاء'
						},
						{
							type: 'text',
							content: `1) برّر أن المثلث $S O I$ قائم في $O$، ثم احسب الطول $S I$ (الارتفاع الجانبي للهرم).`,
							answer: `1) بما أن الهرم منتظم، فإن ارتفاعه $[S O]$ عمودي على مستوي القاعدة $(A B C D)$ في مركزها $O$.\nالمستقيم $(O I)$ محتوى في مستوي القاعدة، إذن $(S O) perp (O I)$، فالمثلث $S O I$ قائم في $O$.\nبما أن $I$ منتصف $[B C]$، فإن $O I = frac(a, 2) = frac(${pyr.a}, 2) = ${pyr.a / 2} upright("cm")$.\nبحساب مبرهنة فيثاغورث في المثلث $S O I$:\n$S I^2 = S O^2 + O I^2 = ${pyr.h}^2 + (${pyr.a / 2})^2 = ${pyr.h * pyr.h} + ${(pyr.a / 2) * (pyr.a / 2)} = ${pyr.slant * pyr.slant}$.\nإذن: $S I = sqrt(${pyr.slant * pyr.slant}) = ${pyr.slant} upright("cm")$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب المساحة الجانبية $S_(upright("lat"))$ والمساحة الكلية $S_(upright("tot"))$ لهذا الهرم.`,
							answer: `2) - المساحة الجانبية تتكون من $4$ مثلثات متقايسة:\n$S_(upright("lat")) = 4 times frac(B C times S I, 2) = 2 times ${pyr.a} times ${pyr.slant} = ${lateralArea} upright("cm")^2$.\n- المساحة الكلية:\n$S_(upright("tot")) = S_(upright("lat")) + cal(A)_(A B C D) = ${lateralArea} + ${pyr.a}^2 = ${lateralArea} + ${baseArea} = ${totalArea} upright("cm")^2$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب حجم الهرم $V$ بالسنتيمتر المكعب.`,
							answer: `3) دستور حجم الهرم هو: $V = frac(1, 3) times cal(B) times h = frac(1, 3) times ${baseArea} times ${pyr.h} = ${volume} upright("cm")^3$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'المسافة من مركز المربع إلى منتصف ضلعه تساوي نصف طول الضلع: $OI = a/2$.',
					'احسب الارتفاع الجانبي $SI$ بتطبيق فيثاغورث في المثلث $SOI$.',
					'حجم الهرم هو ثلث جداء مساحة القاعدة في الارتفاع: $V = \\frac{1}{3} B h$.'
				],
				solutionStepsAr: [
					`حساب $OI = ${pyr.a / 2}\\text{ cm}$ ثم فيثاغورث $SI = ${pyr.slant}\\text{ cm}$.`,
					`حساب المساحة الجانبية $S_{lat} = ${lateralArea}\\text{ cm}^2$ والكلية $S_{tot} = ${totalArea}\\text{ cm}^2$.`,
					`حساب الحجم $V = \\frac{1}{3} \\times ${baseArea} \\times ${pyr.h} = ${volume}\\text{ cm}^3$.`
				],
				finalAnswer: `${volume}`
			};
		}

		// Hard difficulty: Solid scale reduction factor k = 1/2 or 1/3 and orthogonality proof
		const pyr = { a: 8, h: 6, slant: 5 }; // V = 1/3 * 64 * 6 = 128
		const kScale = 0.5;
		const vOrig = roundTo((1 / 3) * (pyr.a * pyr.a) * pyr.h, 2);
		const vReduced = roundTo(vOrig * Math.pow(kScale, 3), 2);
		const aOrig = pyr.a * pyr.a + 2 * pyr.a * pyr.slant;
		const aReduced = roundTo(aOrig * Math.pow(kScale, 2), 2);

		const sceneSvg = svgSpace3DScene({
			points: [
				{ x: 0, y: 0, z: 0, label: 'A', color: '#0f172a' },
				{ x: 3, y: 0, z: 0, label: 'B', color: '#0f172a' },
				{ x: 3, y: 3, z: 0, label: 'C', color: '#0f172a' },
				{ x: 0, y: 3, z: 0, label: 'D', color: '#0f172a' },
				{ x: 1.5, y: 1.5, z: 3.2, label: 'S', color: '#dc2626' }
			],
			showPlanePatch: true,
			planeLabel: '(P) مقطع مواز'
		});
		const svgPath = saveSvgAsset(`1as_t3_space_${difficulty}_s${seed}`, sceneSvg);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `هرم منتظم حجمه الأصلي $V = ${vOrig}\\text{ cm}^3$ . قُطع بمستوٍ موازٍ لقاعدته بنسبة تصغير $k = \\frac{1}{2}$ . احسب حجم الهرم المصغر $V'$ بالسنتيمتر المكعب ($cm^3$).`,
				questionTextAr: `احسب حجم الهرم المصغر $V'$ بالسنتيمتر المكعب:`,
				imageUrl: svgPath,
				imageCaption: 'تصغير هرم بمستوٍ موازٍ للقاعدة',
				questionData: {
					answer: vReduced,
					tolerance: 0.05,
					displayTemplate: "حجم الهرم المصغر V' = ? cm³",
					variables: []
				},
				explanation: `عند تصغير مجسم بنسبة $k$ يُضرب حجمه في $k^3$ . إذن: $V' = k^3 \\times V = \\left(\\frac{1}{2}\\right)^3 \\times ${vOrig} = \\frac{1}{8} \\times ${vOrig} = ${vReduced}\\text{ cm}^3$ .`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر هرماً منتظماً $S A B C D$ حجمه الأصلي $V = ${vOrig} upright("cm")^3$ ومساحته الكلية $S_(upright("tot")) = ${aOrig} upright("cm")^2$. نقطع الهرم بمستوٍ $(cal(P))$ موازٍ لقاعدته يمر من النقطة $O'$ من الارتفاع $[S O]$ بنسبة تصغير $k = frac(1, 2)$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'مقطع الهرم بمستو مواز للقاعدة'
					},
					{
						type: 'text',
						content: `1) ما هي طبيعة المقطع الناتج عن قطع الهرم بالمستوي $(cal(P))$؟ برّر إجابتك.`,
						answer: `1) مقطع هرم منتظم بمستو موازٍ لقاعدته هو مضلع من نفس طبيعة القاعدة ومصغر بنسبة $k$.\nبما أن قاعدة الهرم هي مربع $A B C D$، فإن المقطع هو مربع $A' B' C' D'$ طول ضلعه $a' = k times a = frac(1, 2) times ${pyr.a} = ${pyr.a / 2} upright("cm")$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب الحجم $V'$ للهرم المصغر $S A' B' C' D'$ الناتج.`,
						answer: `2) عند تطبيق التصغير بنسبة $k$ على مجسم، تتغير الحجوم وفق النسبة $k^3$:\n$V' = k^3 times V = (frac(1, 2))^3 times ${vOrig} = frac(1, 8) times ${vOrig} = ${vReduced} upright("cm")^3$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج حجم جذع الهرم المتبقي $V_(upright("tronc"))$ والمساحة الكلية للهرم المصغر $S'$.`,
						answer: `3) - حجم جذع الهرم:\n$V_(upright("tronc")) = V - V' = ${vOrig} - ${vReduced} = ${vOrig - vReduced} upright("cm")^3$.\n- المساحة الكلية تتغير وفق $k^2$:\n$S' = k^2 times S_(upright("tot")) = (frac(1, 2))^2 times ${aOrig} = frac(1, 4) times ${aOrig} = ${aReduced} upright("cm")^2$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'مقطع الهرم بمستو موازٍ للقاعدة هو شكل مشابه للقاعدة بنسبة $k$.',
				'تأثير التكبير والتصغير: الأطوال تضرب في $k$، المساحات في $k^2$، والحجوم في $k^3$.',
				'حجم جذع الهرم يساوي حجم الهرم الكامل ناقص حجم الهرم الصغير المصغر.'
			],
			solutionStepsAr: [
				`تحديد طبيعة المقطع (مربع).`,
				`حساب حجم الهرم المصغر $V' = k^3 V = \\frac{1}{8} \\times ${vOrig} = ${vReduced}\\text{ cm}^3$.`,
				`حساب حجم الجذع $V_{tronc} = ${vOrig - vReduced}\\text{ cm}^3$ والمساحة $S' = k^2 S = ${aReduced}\\text{ cm}^2$.`
			],
			finalAnswer: `${vReduced}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 4: Descriptive Statistics: Central & Dispersion (Numeric / Stats)
// ═══════════════════════════════════════════════════════════════════════════════
const descriptiveStatsTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_descriptive_stats',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الإحصاء الوصفي: مؤشرات الموقع ومؤشرات التشتت',
	curriculumLessonId: 'lesson_1as_tcst_t3_descriptive_statistics_central_dispersion_boxplots',
	defaultPoints: 4,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 404, difficulty);

		const datasets = [
			{
				values: [8, 10, 12, 14, 16],
				freqs: [3, 5, 8, 5, 4],
				context: 'علامات فرض الرياضيات لقسم من أقسام السنة الأولى ثانوي'
			},
			{
				values: [6, 9, 12, 15, 18],
				freqs: [2, 6, 10, 4, 3],
				context: 'نقاط تقويم الكفاءات الرياضية لمجموعة تلاميذ'
			},
			{
				values: [7, 10, 13, 16],
				freqs: [4, 6, 6, 4],
				context: 'أطوال قطع معدنية (بالمليمتر بعد المعايرة)'
			},
			{
				values: [5, 10, 15, 20],
				freqs: [5, 8, 5, 2],
				context: 'ساعات المطالعة الأسبوعية لتلاميذ جذع مشترك علوم'
			}
		];
		const ds = rng.pick(datasets);
		const N = ds.freqs.reduce((a, b) => a + b, 0);

		// Cumulative frequencies
		const cumFreqs: number[] = [];
		let runSum = 0;
		for (const f of ds.freqs) {
			runSum += f;
			cumFreqs.push(runSum);
		}

		// Weighted mean
		const sumNx = ds.values.reduce((acc, v, i) => acc + v * ds.freqs[i], 0);
		const meanVal = roundTo(sumNx / N, 2);

		// Variance & Standard deviation
		const sumNx2 = ds.values.reduce((acc, v, i) => acc + v * v * ds.freqs[i], 0);
		const varianceVal = roundTo(sumNx2 / N - meanVal * meanVal, 2);
		const stdDevVal = roundTo(Math.sqrt(Math.max(0, varianceVal)), 2);

		// Median & Quartiles
		const findByCum = (target: number): number => {
			for (let i = 0; i < cumFreqs.length; i++) {
				if (cumFreqs[i] >= target) return ds.values[i];
			}
			return ds.values[ds.values.length - 1];
		};
		const q1 = findByCum(N / 4);
		const median = findByCum(N / 2);
		const q3 = findByCum((3 * N) / 4);
		const iqr = q3 - q1;
		const rangeVal = ds.values[ds.values.length - 1] - ds.values[0];

		// SVG bar chart
		const chartSvg = svgBarChart(
			ds.values.map((v, i) => ({ label: `${v}`, value: ds.freqs[i] })),
			Math.max(...ds.freqs) + 2
		);
		const svgPath = saveSvgAsset(`1as_t3_stats_${difficulty}_s${seed}`, chartSvg);

		const tableHeaderTypst = ds.values.map((v) => `[ ${v} ]`).join(', ');
		const tableFreqTypst = ds.freqs.map((f) => `[ ${f} ]`).join(', ');
		const tableCumTypst = cumFreqs.map((c) => `[ ${c} ]`).join(', ');

		if (difficulty === 'easy') {
			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `يمثل الجدول التالي سلسلة إحصائية: القيم $x_i$: [${ds.values.join(' ، ')}] والتكرارات المقابلة $n_i$: [${ds.freqs.join(' ، ')}] . احسب الوسط الحسابي المتوازن $\\bar{x}$ مدوراً إلى $0.01$ .`,
					questionTextAr: `احسب الوسط الحسابي المتوازن $\\bar{x}$:`,
					imageUrl: svgPath,
					imageCaption: 'مخطط التكرارات للسلسلة الإحصائية',
					questionData: {
						answer: meanVal,
						tolerance: 0.05,
						displayTemplate: 'الوسط الحسابي x̄ = ?',
						variables: []
					},
					explanation: `الوسط الحسابي هو $\\bar{x} = \\frac{\\sum n_i x_i}{N} = \\frac{${sumNx}}{${N}} = ${meanVal}$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `إليك المعطيات الإحصائية التالية المتعلقة بـ (${ds.context}):`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'مخطط التكرارات بالأعمدة'
						},
						{
							type: 'text',
							content: `1) شكّل جدول التكرارات المجمعة الصاعدة، ثم استنتج الحجم الكلي للسلسلة $N$.`,
							answer: `1) الحجم الكلي للسلسلة: $N = ${ds.freqs.join(' + ')} = ${N}$.\nجدول التكرار المجمع الصاعد:\nالقيم: ${ds.values.join(' ، ')}\nالتكرار المجمع: ${cumFreqs.join(' ، ')}.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب الوسط الحسابي المتوازن $macron(x)$ والمدى $E$ لهذه السلسلة.`,
							answer: `2) - الوسط الحسابي:\n$macron(x) = frac(sum n_i x_i, N) = frac(${sumNx}, ${N}) = ${meanVal}$.\n- المدى:\n$E = x_(upright("max")) - x_(upright("min")) = ${ds.values[ds.values.length - 1]} - ${ds.values[0]} = ${rangeVal}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) عيّن وسيط السلسلة $M e$ مع التبرير انطلاقاً من التكرارات المجمعة.`,
							answer: `3) رتبة الوسيط هي $frac(N, 2) = frac(${N}, 2) = ${N / 2}$.\nأول تكرار مجمع أكبر من أو يساوي ${N / 2} يقابل القيمة $x = ${median}$.\nإذن الوسيط هو: $M e = ${median}$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'الوسط الحسابي يحسب بضرب كل قيمة في تكرارها ثم القسمة على المجموع الكلي $N$.',
					'المدى هو الفرق بين أكبر قيمة وأصغر قيمة في السلسلة.',
					'الوسيط يقابل التكرار المجمع الذي يتجاوز نصف الحجم الكلي $N/2$.'
				],
				solutionStepsAr: [
					`حساب الحجم الكلي $N = ${N}$.`,
					`حساب الوسط الحسابي $\\bar{x} = \\frac{${sumNx}}{${N}} = ${meanVal}$.`,
					`تعيين الوسيط $Me = ${median}$ والمدى $E = ${rangeVal}$.`
				],
				finalAnswer: `${meanVal}`
			};
		}

		if (difficulty === 'medium') {
			return {
				templateId: this.id,
				seed,
				grade: '1as_tcst',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في السلسلة الإحصائية ذات القيم [${ds.values.join(' ، ')}] والتكرارات [${ds.freqs.join(' ، ')}]، احسب الانحراف المعياري $\\sigma$ مدوراً إلى جزء من مئة ($0.01$).`,
					questionTextAr: `احسب الانحراف المعياري $\\sigma$ للسلسلة الإحصائية:`,
					imageUrl: svgPath,
					imageCaption: 'مخطط التكرارات للأعمدة',
					questionData: {
						answer: stdDevVal,
						tolerance: 0.05,
						displayTemplate: 'الانحراف المعياري σ = ?',
						variables: []
					},
					explanation: `الوسط الحسابي هو $\\bar{x} = ${meanVal}$ . التباين هو $V = \\frac{\\sum n_i x_i^2}{N} - \\bar{x}^2 = \\frac{${sumNx2}}{${N}} - (${meanVal})^2 = ${varianceVal}$ . إذن الانحراف المعياري هو $\\sigma = \\sqrt{${varianceVal}} = ${stdDevVal}$ .`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `إليك التوزيع الإحصائي التالي بحجم كلي $N = ${N}$:\n- القيم $x_i$: [ ${ds.values.join(' ، ')} ]\n- التكرارات $n_i$: [ ${ds.freqs.join(' ، ')} ]`,
					content: [
						{
							type: 'image',
							src: svgPath,
							caption: 'مخطط التكرارات'
						},
						{
							type: 'text',
							content: `1) عيّن الربيعيين الأول $Q_1$ والثالث $Q_3$، ثم احسب الانحراف الربعي $I Q R = Q_3 - Q_1$.`,
							answer: `1) - رتبة $Q_1$ هي $frac(N, 4) = frac(${N}, 4) = ${N / 4}$، والتكرار المجمع المناظر يعطي: $Q_1 = ${q1}$.\n- رتبة $Q_3$ هي $frac(3 N, 4) = ${ (3 * N) / 4 }$، والتكرار المجمع المناظر يعطي: $Q_3 = ${q3}$.\n- الانحراف الربعي: $I Q R = Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب الوسط الحسابي $macron(x)$ والتباين $V$ لهذه السلسلة مع كتابة خطوات الحساب.`,
							answer: `2) - الوسط الحسابي: $macron(x) = frac(${sumNx}, ${N}) = ${meanVal}$.\n- التباين:\n$V = frac(sum n_i x_i^2, N) - (macron(x))^2 = frac(${sumNx2}, ${N}) - (${meanVal})^2 = ${formatNum(sumNx2 / N)} - ${formatNum(meanVal * meanVal)} = ${varianceVal}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) استنتج الانحراف المعياري $sigma$ مدوراً إلى $0.01$، ولخّص السلسلة بالثنائية $(macron(x) ; sigma)$.`,
							answer: `3) الانحراف المعياري هو الجذر التربيعي للتباين:\n$sigma = sqrt(V) = sqrt(${varianceVal}) approx ${stdDevVal}$.\nتلخيص السلسلة بالثنائية: $(macron(x) ; sigma) = (${meanVal} ; ${stdDevVal})$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'الربيعي الأول يقابل $N/4$ والربيعي الثالث يقابل $3N/4$.',
					'دستور التباين: $V = \\frac{\\sum n_i x_i^2}{N} - \\bar{x}^2$.',
					'الانحراف المعياري هو الجذر التربيعي للتباين: $\\sigma = \\sqrt{V}$.'
				],
				solutionStepsAr: [
					`تعيين الربيعيات: $Q_1 = ${q1}$ و $Q_3 = ${q3}$ و $IQR = ${iqr}$.`,
					`حساب التباين $V = ${varianceVal}$.`,
					`حساب الانحراف المعياري $\\sigma = \\sqrt{${varianceVal}} \\approx ${stdDevVal}$.`
				],
				finalAnswer: `${stdDevVal}`
			};
		}

		// Hard difficulty: Linear transformation of statistics (y_i = a * x_i + b)
		const bonus = 2;
		const newMean = roundTo(meanVal + bonus, 2);
		const newStdDev = stdDevVal;

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `سلسلة إحصائية وسطها الحسابي $\\bar{x} = ${meanVal}$ وانحرافها المعياري $\\sigma_x = ${stdDevVal}$ . قمنا بزيادة نقطتين لكل قيمة: $y_i = x_i + ${bonus}$ . ما هو الوسط الحسابي الجديد $\\bar{y}$؟`,
				questionTextAr: `ما هو الوسط الحسابي الجديد بعد التحويل الخطي؟`,
				imageUrl: svgPath,
				imageCaption: 'تمثيل السلسلة الإحصائية',
				questionData: {
					answer: newMean,
					tolerance: 0.05,
					displayTemplate: 'الوسط الحسابي الجديد ȳ = ?',
					variables: []
				},
				explanation: `من خواص التحويل الخطي $y_i = a x_i + b$: الوسط الحسابي الجديد هو $\\bar{y} = a \\bar{x} + b = 1 \\times ${meanVal} + ${bonus} = ${newMean}$ ، بينما الانحراف المعياري لا يتغير بالإزاحة: $\\sigma_y = \\sigma_x = ${stdDevVal}$ .`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `سلسلة إحصائية أولى ذات قيم $x_i$ بحجم $N = ${N}$ وسطها الحسابي $macron(x) = ${meanVal}$ وتباينها $V_x = ${varianceVal}$ وانحرافها المعياري $sigma_x = ${stdDevVal}$. قرّر الأستاذ تطبيق تعديل خطي على العلامات بإضافة نقطتين استدراكيتين: $y_i = x_i + ${bonus}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'توزيع العلامات الأصلية'
					},
					{
						type: 'text',
						content: `1) برهن نظرياً أنه من أجل كل تحويل خطي $y_i = a x_i + b$ يكون الوسط الحسابي الجديد $macron(y) = a macron(x) + b$.`,
						answer: `1) باستعمال تعريف الوسط الحسابي وخاصية التوزيع:\n$macron(y) = frac(sum n_i y_i, N) = frac(sum n_i (a x_i + b), N) = frac(a sum n_i x_i + b sum n_i, N) = a frac(sum n_i x_i, N) + b frac(N, N) = a macron(x) + b$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) احسب الوسط الحسابي الجديد $macron(y)$ والتباين الجديد $V_y$ والانحراف المعياري الجديد $sigma_y$ بعد إضافة النقطتين ($y_i = x_i + ${bonus}$).`,
						answer: `2) هنا $a = 1$ و $b = ${bonus}$:\n- الوسط الحسابي الجديد: $macron(y) = macron(x) + ${bonus} = ${meanVal} + ${bonus} = ${newMean}$.\n- التباين الجديد: $V_y = a^2 V_x = 1^2 times ${varianceVal} = ${varianceVal}$.\n- الانحراف المعياري الجديد: $sigma_y = |a| sigma_x = 1 times ${stdDevVal} = ${stdDevVal}$.\nنلاحظ أن الإزاحة لا تؤثر على مؤشرات التشتت إطلاقاً.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) كيف يتأثر وسيط السلسلة $M e$ ومخطط العلبة بهذا التحويل؟ فسر النتيجة بيانياً.`,
						answer: `3) يزداد الوسيط بمقدار نقطتين: $M e_y = M e_x + ${bonus}$ ، وكذا الربيعيات $Q'_1 = Q_1 + ${bonus}$ و $Q'_3 = Q_3 + ${bonus}$.\nبيانياً: ينسحب مخطط العلبة (الصندوق) بموازاة المحور بمقدار $+${bonus}$ دون أن يتغير عرضه أو شكله (الانحراف الربعي والمدى يبقيان ثابتين).`,
						mark: '1'
					}
				]
			},
			hints: [
				'طبق الخاصية الخطية للوسط الحسابي: $\\bar{y} = a\\bar{x} + b$.',
				'الانحراف المعياري يقيس التشتت ولا يتأثر بالإضافة: $\\sigma_y = |a|\\sigma_x$.',
				'إضافة قيمة ثابتة تمثل انسحاباً هندسياً لمخطط العلبة على المحور.'
			],
			solutionStepsAr: [
				`البرهان على الخاصية الخطية للوسط الحسابي.`,
				`حساب $\\bar{y} = ${meanVal} + ${bonus} = ${newMean}$.`,
				`تأكيد ثبات الانحراف المعياري $\\sigma_y = \\sigma_x = ${stdDevVal}$ وتفسير انسحاب مخطط العلبة.`
			],
			finalAnswer: `${newMean}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 5: Probability Intro, Sample Space & Union Rules (Probability)
// ═══════════════════════════════════════════════════════════════════════════════
const probabilityIntroTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_probability_intro',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'مدخل إلى الاحتمالات وقوانين التساوي في الحظوظ',
	curriculumLessonId: 'lesson_1as_tcst_t3_simulation_sample_fluctuation_probability_intro',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 505, difficulty);

		const configs = [
			{
				redBalls: [1, 2, 4, 5, 6],
				blackBalls: [2, 3, 4, 6, 7, 8, 9]
			},
			{
				redBalls: [2, 4, 6, 7, 8, 10],
				blackBalls: [1, 3, 4, 5, 6, 7, 8, 9, 11]
			},
			{
				redBalls: [2, 4, 5, 6, 8, 9, 10, 12],
				blackBalls: [1, 2, 3, 4, 5, 6, 7, 8]
			},
			{
				redBalls: [1, 2, 3, 4, 6, 8],
				blackBalls: [2, 3, 4, 5, 6, 7, 8, 9, 10]
			}
		];
		const cfg = rng.pick(configs);

		const numRed = cfg.redBalls.length;
		const numBlack = cfg.blackBalls.length;
		const N = numRed + numBlack;

		const redEvens = cfg.redBalls.filter((n) => n % 2 === 0).length;
		const blackEvens = cfg.blackBalls.filter((n) => n % 2 === 0).length;
		const totalEvens = redEvens + blackEvens;

		// Events:
		// A: Red ball
		// B: Even numbered ball
		// A ∩ B: Red AND Even
		// A ∪ B: Red OR Even
		const [pAnum, pAden] = simplifyFraction(numRed, N);
		const [pBnum, pBden] = simplifyFraction(totalEvens, N);
		const [pInterNum, pInterDen] = simplifyFraction(redEvens, N);

		const unionCount = numRed + totalEvens - redEvens;
		const [pUnionNum, pUnionDen] = simplifyFraction(unionCount, N);
		const [pNotANum, pNotADen] = simplifyFraction(N - numRed, N);

		const urnSvg = buildProbabilityUrnSvg(cfg);
		const svgPath = saveSvgAsset(`1as_t3_prob_${difficulty}_s${seed}`, urnSvg);

		const pUnionKatex = formatFracKatex(pUnionNum, pUnionDen);
		const pUnionTypst = formatFracTypst(pUnionNum, pUnionDen);

		const distractors = [
			{
				text: `$${formatFracKatex(numRed + totalEvens, N)}$`,
				diagnosticFeedback: 'خطأ شائع: جمعت الاحتمالين دون طرح احتمال التقاطع $P(A \\cap B)$، مما جعل الكرات الحمراء الزوجية تُحسب مرتين.'
			},
			{
				text: `$${formatFracKatex(pNotANum, pNotADen)}$`,
				diagnosticFeedback: 'هذا احتمال الحادث المعاكس $P(\\bar{A})$ وليس احتمال الاتحاد $P(A \\cup B)$.'
			},
			{
				text: `$${formatFracKatex(Math.max(1, pUnionNum - 1), pUnionDen)}$`,
				diagnosticFeedback: 'تحقق من حساب بسط الاحتمال: عدد عناصر الاتحاد هو $n(A) + n(B) - n(A \\cap B)$.'
			}
		];
		const mcq = buildUniqueMcqOptions(`$P(A \\cup B) = ${pUnionKatex}$`, distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يحتوي صندوق على $${N}$ كرية متماثلة لا نفرق بينها باللمس: $${numRed}$ كريات حمراء و $${numBlack}$ كريات سوداء مرقمة كما في الشكل المرفق. نسحب كرية واحدة عشوائياً. نعتبر الحدثين:\n$A$: "الكرية المسحوبة حمراء"\n$B$: "الكرية المسحوبة تحمل رقماً زوجياً"\nاحسب احتمال الحدث $A \\cup B$ (الكرية حمراء أو تحمل رقماً زوجياً) على شكل كسر غير قابل للاختزال:`,
				questionTextAr: `احسب احتمال الحدث $A \\cup B$:`,
				imageUrl: svgPath,
				imageCaption: 'محتوى الصندوق والترقيم',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $P(A) = ${formatFracKatex(pAnum, pAden)}$ و $P(B) = ${formatFracKatex(pBnum, pBden)}$ و $P(A \\cap B) = ${formatFracKatex(pInterNum, pInterDen)}$ . بتطبيق قانون الاتحاد: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ${pUnionKatex}$ .`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `صندوق يحتوي على $${N}$ كرية متماثلة لا نميز بينها باللمس: $${numRed}$ كريات حمراء و $${numBlack}$ كريات سوداء. نسحب عشوائياً كرية واحدة من الصندوق.\nنعرّف الحوادث التالية:\n- $A$: «الكرية المسحوبة حمراء اللون»\n- $B$: «الكرية المسحوبة تحمل عدداً زوجياً»`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'توزيع الكرات وأرقامها داخل الصندوق'
					},
					{
						type: 'text',
						content: `1) بيّن أن هذه التجربة العشوائية في حالة تساوي الحظوظ، وعيّن عدد عناصر المجموعة الشاملة $upright("Card")(Omega)$.`,
						answer: `1) بما أن الكريات متماثلة ولا نفرق بينها باللمس وتُسحب عشوائياً، فلكل كرية نفس حظ الظهور، إذن التجربة في حالة تساوي الحظوظ.\nعدد عناصر المجموعة الشاملة هو مجموع الكريات: $upright("Card")(Omega) = ${N}$.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: `2) احسب الاحتمالين $P(A)$ و $P(B)$ واكتبهما على شكل كسر غير قابل للاختزال.`,
						answer: `2) - احتمال الحدث $A$:\n$P(A) = frac(upright("Card")(A), upright("Card")(Omega)) = frac(${numRed}, ${N}) = ${formatFracTypst(pAnum, pAden)}$.\n- احتمال الحدث $B$ (عدد الكرات الزوجية هو ${totalEvens}):\n$P(B) = frac(upright("Card")(B), upright("Card")(Omega)) = frac(${totalEvens}, ${N}) = ${formatFracTypst(pBnum, pBden)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) عرّف الحدث $A sect B$ لغوياً، ثم احسب احتماله $P(A sect B)$.`,
						answer: `3) الحدث $A sect B$ هو: «الكرية المسحوبة حمراء اللون وتحمل عدداً زوجياً في آن واحد».\nعدد الكريات الحمراء الزوجية هو ${redEvens}، إذن:\n$P(A sect B) = frac(${redEvens}, ${N}) = ${formatFracTypst(pInterNum, pInterDen)}$.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `4) استنتج الاحتمال $P(A union B)$ باستعمال دستور الاتحاد، ثم احسب احتمال الحدث المعاكس $P(macron(A))$.`,
						answer: `4) - بتطبيق دستور الاتحاد:\n$P(A union B) = P(A) + P(B) - P(A sect B) = frac(${numRed}, ${N}) + frac(${totalEvens}, ${N}) - frac(${redEvens}, ${N}) = frac(${unionCount}, ${N}) = ${pUnionTypst}$.\n- احتمال الحدث المعاكس:\n$P(macron(A)) = 1 - P(A) = 1 - ${formatFracTypst(pAnum, pAden)} = ${formatFracTypst(pNotANum, pNotADen)}$.`,
						mark: '0.75'
					}
				]
			},
			hints: [
				'في حالة تساوي الحظوظ: احتمال أي حدث يساوي عدد عناصره مقسوماً على الحجم الكلي $\\text{Card}(\\Omega)$.',
				'التقاطع $A \\cap B$ يمثل العناصر المشتركة (الكرات الحمراء التي تحمل رقماً زوجياً).',
				'دستور الاتحاد هو $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.'
			],
			solutionStepsAr: [
				`تحديد $\\text{Card}(\\Omega) = ${N}$.`,
				`حساب $P(A) = ${formatFracKatex(pAnum, pAden)}$ و $P(B) = ${formatFracKatex(pBnum, pBden)}$.`,
				`حساب التقاطع $P(A \\cap B) = ${formatFracKatex(pInterNum, pInterDen)}$ ثم الاتحاد $P(A \\cup B) = ${pUnionKatex}$.`
			],
			finalAnswer: pUnionKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 6: Comprehensive Analytical Problem (Synthesis / Integration - 8 pts)
// Strictly follows MEN / ONEC Secondary Lycée exam format (المسألة الشاملة)
// ═══════════════════════════════════════════════════════════════════════════════
const problemSynthesisTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t3_problem_synthesis',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'المسألة الشاملة: الهندسة المستوية، مبرهنة طاليس وحساب المساحات والتكاليف',
	curriculumLessonId: 'lesson_1as_tcst_t3_euclidean_geometry_thales_pythagoras',
	defaultPoints: 8,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 606, difficulty);

		// Scaled Pythagorean land parcels with exact integer coordinates & areas
		const landConfigs = [
			{ L: 16, H: 12, BC: 20, x0: 8, pricePerM: 500, gatePrice: 2000, p2PerM: 400, budgetTotal: 16000 },
			{ L: 20, H: 15, BC: 25, x0: 10, pricePerM: 600, gatePrice: 3000, p2PerM: 450, budgetTotal: 25000 },
			{ L: 24, H: 18, BC: 30, x0: 12, pricePerM: 700, gatePrice: 3500, p2PerM: 500, budgetTotal: 35000 },
			{ L: 12, H: 9, BC: 15, x0: 6, pricePerM: 450, gatePrice: 1800, p2PerM: 350, budgetTotal: 12000 },
			{ L: 8, H: 6, BC: 10, x0: 4, pricePerM: 400, gatePrice: 1500, p2PerM: 300, budgetTotal: 8000 }
		];
		const cfg = rng.pick(landConfigs);

		const totalArea = (cfg.L * cfg.H) / 2;
		const mn0 = cfg.H * (1 - cfg.x0 / cfg.L);
		const bn0 = cfg.BC * (1 - cfg.x0 / cfg.L);
		const bm0 = cfg.L - cfg.x0;
		const areaS1 = (bm0 * mn0) / 2;
		const areaS2 = totalArea - areaS1;

		// Cost of dividing fence along [MN]
		const dividingCost = mn0 * cfg.pricePerM + cfg.gatePrice;

		// Perimeter of Parcel 2 (AMNC)
		// AM = x0, MN = mn0, NC = BC - BN0, CA = H
		const nc0 = cfg.BC - bn0;
		const perimParcel2 = cfg.x0 + mn0 + nc0 + cfg.H;
		const costEncloseParcel2 = perimParcel2 * cfg.p2PerM;
		const budgetSufficient = cfg.budgetTotal >= costEncloseParcel2;

		const [redH, red2L] = simplifyFraction(cfg.H, 2 * cfg.L);
		const s1FormulaTypst = `${formatFracTypst(redH, red2L)} (${cfg.L} - x)^2`;
		const [cosNum, cosDen] = simplifyFraction(cfg.L, cfg.BC);
		const [sinNum, sinDen] = simplifyFraction(cfg.H, cfg.BC);

		const svgContent = buildProblemSynthesisSvg({
			L: cfg.L,
			H: cfg.H,
			x0: cfg.x0,
			MN: mn0
		});
		const svgPath = saveSvgAsset(`1as_t3_synthesis_${difficulty}_s${seed}`, svgContent);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المسألة الشاملة للقطعة الأرضية $ABC$ القائمة في $A$ ($AB = ${cfg.L}\\text{ m}$ و $AC = ${cfg.H}\\text{ m}$): قُسّمت القطعة بفاصل مستقيم $[MN]$ عمودي على $[AB]$ عند الموضع $x = AM = ${cfg.x0}\\text{ m}$ . احسب مساحة القطعة المثلثية الأولى $S_1 = \\text{Area}(BMN)$ بالمتر المربع ($m^2$).`,
				questionTextAr: `احسب مساحة القطعة الأولى BMN بالمتر المربع ($m^2$):`,
				imageUrl: svgPath,
				imageCaption: 'المخطط الهندسي لتقسيم القطعة الأرضية',
				questionData: {
					answer: areaS1,
					tolerance: 0.1,
					displayTemplate: 'مساحة القطعة S₁ = ? m²',
					variables: []
				},
				explanation: `المثلثان $BMN$ و $BAC$ متشابهان بنسبة $k = \\frac{BM}{BA} = \\frac{${bm0}}{${cfg.L}} = \\frac{1}{2}$ . مساحة $ABC$ الكلية هي $\\frac{${cfg.L} \\times ${cfg.H}}{2} = ${totalArea}\\text{ m}^2$ . إذن مساحة $BMN$ هي $k^2 \\times ${totalArea} = \\frac{1}{4} \\times ${totalArea} = ${areaS1}\\text{ m}^2$ .`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `المسألة الشاملة (8 نقاط)\n\nيمتلك مستثمر فلاحي قطعة أرض على شكل مثلث $A B C$ قائم في $A$ بأبعاد: $A B = ${cfg.L} upright("m")$ و $A C = ${cfg.H} upright("m")$ . أراد تهيئتها وتقسيمها إلى قطعتين بواسطة سياج فاصل $[M N]$ عمودي على الحافة $[A B]$ في نقطة متحركة $M$ حيث نضع $x = A M$ (مع $0 < x < ${cfg.L}$ بالامتار).\nالقطعة (1) تمثل المثلث $B M N$ ، والقطعة (2) تمثل شبه المنحرف $A M N C$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'مخطط تقسيم القطعة الأرضية إلى جزأين'
					},
					{
						type: 'text',
						content: `الجزء الأول (3 نقاط):\n\n1) احسب الطول $B C$ بتطبيق مبرهنة فيثاغورث في المثلث $A B C$.\n\n2) احسب القيمة المضبوطة لكل من النسبتين المثلثيتين $cos(hat(B))$ و $sin(hat(B))$ على شكل كسر مختزل.\n\n3) احسب المساحة الإجمالية للقطعة الأرضية $A B C$ بالمتر المربع ($upright("m")^2$).`,
						answer: `الجزء الأول:\n1) المثلث $A B C$ قائم في $A$، إذن حسب فيثاغورث:\n$B C^2 = A B^2 + A C^2 = ${cfg.L}^2 + ${cfg.H}^2 = ${cfg.L * cfg.L} + ${cfg.H * cfg.H} = ${cfg.BC * cfg.BC}$.\nومنه: $B C = sqrt(${cfg.BC * cfg.BC}) = ${cfg.BC} upright("m")$.\n\n2) - $cos(hat(B)) = frac(A B, B C) = frac(${cfg.L}, ${cfg.BC}) = ${formatFracTypst(cosNum, cosDen)}$.\n- $sin(hat(B)) = frac(A C, B C) = frac(${cfg.H}, ${cfg.BC}) = ${formatFracTypst(sinNum, sinDen)}$.\n\n3) المساحة الإجمالية:\n$cal(A)_(A B C) = frac(A B times A C, 2) = frac(${cfg.L} times ${cfg.H}, 2) = ${totalArea} upright("m")^2$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `الجزء الثاني (3 نقاط):\n\n1) برّر لماذا $(M N) parallel (A C)$، ثم عبّر بدلالة $x$ عن الطولين $M N$ و $B N$ باستعمال مبرهنة طاليس في المثلث $B A C$.\n\n2) أثبت أن مساحة القطعة (1) تُعطى بالدستور: $S_1(x) = ${s1FormulaTypst}$ ، ثم احسب قيمتها العددية من أجل $x = ${cfg.x0} upright("m")$.`,
						answer: `الجزء الثاني:\n1) لدينا $(A C) perp (A B)$ و $(M N) perp (A B)$، والمستقيمان العموديان على نفس المستقيم متوازيان، إذن $(M N) parallel (A C)$.\nبتطبيق مبرهنة طاليس في المثلث $B A C$ مع $B M = ${cfg.L} - x$:\n$frac(B M, B A) = frac(M N, A C) = frac(B N, B C) arrow.r.double frac(${cfg.L} - x, ${cfg.L}) = frac(M N, ${cfg.H}) = frac(B N, ${cfg.BC})$.\n- $M N = frac(${cfg.H}, ${cfg.L}) (${cfg.L} - x) = ${formatFracTypst(sinNum, cosNum)} (${cfg.L} - x)$.\n- $B N = frac(${cfg.BC}, ${cfg.L}) (${cfg.L} - x) = ${formatFracTypst(cosDen, cosNum)} (${cfg.L} - x)$.\n\n2) مساحة المثلث القائم $B M N$ هي:\n$S_1(x) = frac(B M times M N, 2) = frac((${cfg.L} - x) times frac(${cfg.H}, ${cfg.L})(${cfg.L} - x), 2) = frac(${cfg.H}, ${2 * cfg.L}) (${cfg.L} - x)^2$.\nعند $x = ${cfg.x0}$:\n$S_1(${cfg.x0}) = frac(${cfg.H}, ${2 * cfg.L}) (${cfg.L} - ${cfg.x0})^2 = ${areaS1} upright("m")^2$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `الجزء الثالث (2 نقطتان):\n\nنضع $x = ${cfg.x0} upright("m")$ (منتصف القطعة $[A B]$):\n\n1) أراد صاحب الأرض وضع سياج فاصل على طول القطعة $[M N]$ بتكلفة قدرها $${cfg.pricePerM}$ دج للمتر الخطي مع تركيب بوابة حديدية بقيمة $${cfg.gatePrice}$ دج. احسب التكلفة الإجمالية لإنجاز هذا الفاصل.\n\n2) خصّص المستثمر ميزانية قدرها $${cfg.budgetTotal}$ دج لتسييج محيط القطعة (2) $A M N C$ كاملاً بتكلفة $${cfg.p2PerM}$ دج للمتر. هل تكفي هذه الميزانية لإتمام التسييج؟ برّر إجابتك بحساب محيط وتكلفة القطعة (2).`,
						answer: `الجزء الثالث:\n1) عند $x = ${cfg.x0}$ يكون طول الفاصل هو: $M N = ${mn0} upright("m")$.\nالتكلفة الإجمالية لإنجاز الفاصل هي:\n$C_1 = M N times ${cfg.pricePerM} + ${cfg.gatePrice} = ${mn0} times ${cfg.pricePerM} + ${cfg.gatePrice} = ${mn0 * cfg.pricePerM} + ${cfg.gatePrice} = ${dividingCost}$ دج.\n\n2) محيط القطعة (2) $A M N C$:\n- $A M = ${cfg.x0} upright("m")$\n- $M N = ${mn0} upright("m")$\n- $N C = B C - B N = ${cfg.BC} - ${bn0} = ${nc0} upright("m")$\n- $C A = ${cfg.H} upright("m")$\nالمحيط الكلي: $P_2 = ${cfg.x0} + ${mn0} + ${nc0} + ${cfg.H} = ${perimParcel2} upright("m")$.\nتكلفة التسييج الكلية: $C_2 = ${perimParcel2} times ${cfg.p2PerM} = ${costEncloseParcel2}$ دج.\nالمقارنة مع الميزانية: بما أن التكلفة $${costEncloseParcel2}$ دج ${budgetSufficient ? '<= ' + cfg.budgetTotal + ' دج' : '> ' + cfg.budgetTotal + ' دج'}، فإن الميزانية المخصصة ${budgetSufficient ? 'تكفي تماماً لتغطية المشروع' : 'لا تكفي وتحتاج إلى زيادة'}.`,
						mark: '2'
					}
				]
			},
			hints: [
				'في الجزء الأول وظف مبرهنة فيثاغورث لحساب $BC$ وقوانين النسب المثلثية في المثلث القائم.',
				'في الجزء الثاني استعمل مبرهنة طاليس في المثلث $BAC$ باعتبار $(MN) \\parallel (AC)$.',
				'في الجزء الثالث احسب محيط شبه المنحرف بجمع أضلاعه الأربعة وقارن التكلفة الكلية مع الميزانية.'
			],
			solutionStepsAr: [
				`الجزء الأول: حساب $BC = ${cfg.BC}\\text{ m}$ و $\\cos\\hat{B} = ${formatFracKatex(cosNum, cosDen)}$ والمساحة الكلية $S = ${totalArea}\\text{ m}^2$.`,
				`الجزء الثاني: التعبير عن $MN(x)$ و $BN(x)$ بطاليس وحساب $S_1(${cfg.x0}) = ${areaS1}\\text{ m}^2$.`,
				`الجزء الثالث: حساب تكلفة السياج الفاصل $C_1 = ${dividingCost}$ دج وتكلفة محيط القطعة (2) $C_2 = ${costEncloseParcel2}$ دج ومقارنتها بالميزانية.`
			],
			finalAnswer: `${areaS1}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported 1AS TCST Trimester 3 Templates Array
// ═══════════════════════════════════════════════════════════════════════════════
export const TEMPLATES_1AS_TCST_T3: ParameterizedTemplate[] = [
	trigEquationsTemplate,
	thalesSimilarityTemplate,
	spaceSolidsVolumesTemplate,
	descriptiveStatsTemplate,
	probabilityIntroTemplate,
	problemSynthesisTemplate
];
