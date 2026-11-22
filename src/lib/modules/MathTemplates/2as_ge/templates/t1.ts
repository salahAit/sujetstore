import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset, svgBarChart } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters (KaTeX for Quiz / Hints / Steps, Typst for SujetExercise)
// Strictly Western digits 0-9; 100% Halal economic contexts.
// ═══════════════════════════════════════════════════════════════════════════════

function escXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function poly2Katex(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a}${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB}${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly2Typst(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a} ${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB} ${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function fmtShift(v: string, r: number): string {
	if (r === 0) return v;
	return r > 0 ? `(${v} - ${r})` : `(${v} + ${Math.abs(r)})`;
}

function svgBoxPlot(opts: {
	min: number;
	q1: number;
	median: number;
	q3: number;
	max: number;
	title?: string;
}): string {
	const w = 390;
	const h = 150;
	const padL = 30;
	const padR = 26;
	const aMin = Math.floor(opts.min - 2);
	const aMax = Math.ceil(opts.max + 2);
	const span = Math.max(1, aMax - aMin);
	const step = Math.max(1, Math.ceil(span / 10));
	const toX = (v: number) => padL + ((v - aMin) / span) * (w - padL - padR);

	const yTop = 50;
	const yBot = 90;
	const yMid = 70;
	const yAxis = 118;

	const xMin = toX(opts.min);
	const xQ1 = toX(opts.q1);
	const xMed = toX(opts.median);
	const xQ3 = toX(opts.q3);
	const xMax = toX(opts.max);

	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1"/>`
	];
	if (opts.title) {
		parts.push(`<text x="${w / 2}" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escXml(opts.title)}</text>`);
	}
	parts.push(`<line x1="${padL - 6}" y1="${yAxis}" x2="${w - padR + 8}" y2="${yAxis}" stroke="#334155" stroke-width="1.5"/>`);
	for (let v = aMin; v <= aMax; v += step) {
		const px = toX(v);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${yAxis - 4}" x2="${px.toFixed(1)}" y2="${yAxis + 4}" stroke="#334155" stroke-width="1.3"/>`);
		parts.push(`<text x="${px.toFixed(1)}" y="${yAxis + 16}" text-anchor="middle" font-size="9.5" fill="#475569">${v}</text>`);
	}
	parts.push(`<line x1="${xMin.toFixed(1)}" y1="${yMid}" x2="${xQ1.toFixed(1)}" y2="${yMid}" stroke="#1e293b" stroke-width="2"/>`);
	parts.push(`<line x1="${xQ3.toFixed(1)}" y1="${yMid}" x2="${xMax.toFixed(1)}" y2="${yMid}" stroke="#1e293b" stroke-width="2"/>`);
	parts.push(`<line x1="${xMin.toFixed(1)}" y1="${yMid - 9}" x2="${xMin.toFixed(1)}" y2="${yMid + 9}" stroke="#1e293b" stroke-width="2"/>`);
	parts.push(`<line x1="${xMax.toFixed(1)}" y1="${yMid - 9}" x2="${xMax.toFixed(1)}" y2="${yMid + 9}" stroke="#1e293b" stroke-width="2"/>`);
	parts.push(`<rect x="${xQ1.toFixed(1)}" y="${yTop}" width="${Math.max(4, xQ3 - xQ1).toFixed(1)}" height="${yBot - yTop}" fill="rgba(37,99,235,0.16)" stroke="#1d4ed8" stroke-width="2"/>`);
	parts.push(`<line x1="${xMed.toFixed(1)}" y1="${yTop}" x2="${xMed.toFixed(1)}" y2="${yBot}" stroke="#dc2626" stroke-width="2.5"/>`);
	parts.push(`<text x="${xMin.toFixed(1)}" y="${yMid - 13}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${opts.min}</text>`);
	parts.push(`<text x="${xQ1.toFixed(1)}" y="${yTop - 6}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">Q1=${opts.q1}</text>`);
	parts.push(`<text x="${xMed.toFixed(1)}" y="${yTop - 6}" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Me=${opts.median}</text>`);
	parts.push(`<text x="${xQ3.toFixed(1)}" y="${yTop - 6}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">Q3=${opts.q3}</text>`);
	parts.push(`<text x="${xMax.toFixed(1)}" y="${yMid - 13}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${opts.max}</text>`);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Percentages, Sub-Percentages & Economic Indices
// ═══════════════════════════════════════════════════════════════════════════════

const tplPercentagesIndices: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_percentages_indices',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'النسب المئوية، نسبة من نسبة والمؤشرات الاقتصادية (الأساس 100)',
	curriculumLessonId: 'lesson_2as_ge_t1_percentages_indices',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface PctConfig {
			totalWorkers: number;
			p1: number; // % in production
			p2: number; // % quality technicians out of production
			y0: number; // 2022 tons
			i1: number; // 2023 index
			i2: number; // 2024 index
			evol12: number; // exact % increase from 2023 to 2024
		}

		const pool: PctConfig[] =
			difficulty === 'easy'
				? [
						{ totalWorkers: 800, p1: 50, p2: 20, y0: 500, i1: 120, i2: 132, evol12: 10 },
						{ totalWorkers: 1000, p1: 40, p2: 25, y0: 600, i1: 125, i2: 150, evol12: 20 },
						{ totalWorkers: 600, p1: 60, p2: 25, y0: 400, i1: 120, i2: 150, evol12: 25 },
						{ totalWorkers: 1200, p1: 50, p2: 30, y0: 800, i1: 125, i2: 140, evol12: 12 }
					]
				: difficulty === 'medium'
					? [
							{ totalWorkers: 1200, p1: 45, p2: 20, y0: 800, i1: 120, i2: 135, evol12: 12.5 },
							{ totalWorkers: 1500, p1: 60, p2: 15, y0: 1000, i1: 125, i2: 145, evol12: 16 },
							{ totalWorkers: 2000, p1: 35, p2: 20, y0: 1200, i1: 120, i2: 138, evol12: 15 },
							{ totalWorkers: 1600, p1: 55, p2: 20, y0: 900, i1: 125, i2: 155, evol12: 24 }
						]
					: [
							{ totalWorkers: 2500, p1: 48, p2: 25, y0: 1500, i1: 125, i2: 147.5, evol12: 18 },
							{ totalWorkers: 1800, p1: 55, p2: 20, y0: 1400, i1: 120, i2: 141, evol12: 17.5 },
							{ totalWorkers: 2400, p1: 65, p2: 20, y0: 1600, i1: 125, i2: 160, evol12: 28 },
							{ totalWorkers: 3000, p1: 42, p2: 25, y0: 2000, i1: 120, i2: 150, evol12: 25 }
						];

		const cfg = rng.pick(pool);
		const prodCount = Math.round((cfg.totalWorkers * cfg.p1) / 100);
		const techCount = Math.round((prodCount * cfg.p2) / 100);
		const globalPct = roundTo((cfg.p1 * cfg.p2) / 100, 2);
		const y1 = roundTo((cfg.y0 * cfg.i1) / 100, 1);
		const y2 = roundTo((cfg.y0 * cfg.i2) / 100, 1);

		const chartSvg = svgBarChart(
			[
				{ label: `2022 (${100})`, value: cfg.y0 },
				{ label: `2023 (${cfg.i1})`, value: y1 },
				{ label: `2024 (${cfg.i2})`, value: y2 }
			],
			Math.ceil(y2 * 1.15)
		);
		const chartUrl = saveSvgAsset(`2as_ge_t1_indices_bar_${difficulty}_s${seed}`, chartSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${cfg.i1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بلغ إنتاج مصنع للتعليب $${cfg.y0}$ طناً سنة $2022$ (سنة الأساس بمؤشر $I_0 = 100$)، وارتفع إلى $${y1}$ طناً سنة $2023$. احسب مؤشر الإنتاج $I_1$ سنة $2023$:`,
				questionTextAr: `احسب مؤشر الإنتاج سنة $2023$ بالأساس $100$:`,
				imageUrl: chartUrl,
				imageCaption: 'تطور الإنتاج السنوي ومؤشراته (الأساس 100 سنة 2022)',
				questionData: {
					answer: cfg.i1,
					displayTemplate: 'I_1 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نطبق قانون المؤشر: $I_1 = \\frac{y_1}{y_0} \\times 100 = \\frac{${y1}}{${cfg.y0}} \\times 100 = ${cfg.i1}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${globalPct}%`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُشغّل مؤسسة اقتصادية $${cfg.totalWorkers}$ عاملاً، يعمل $${cfg.p1}\\%$ منهم في ورشات الإنتاج، ويمثّل تقنيو مراقبة الجودة $${cfg.p2}\\%$ من عمال الإنتاج. ما هي النسبة المئوية (بدون رمز %) التي يمثلها تقنيو الجودة من إجمالي عمال المؤسسة؟`,
				questionTextAr: `احسب النسبة المئوية لتقنيي الجودة من إجمالي العمال:`,
				questionData: {
					answer: globalPct,
					displayTemplate: 'p = ? %',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نحسب نسبة من نسبة بالضرب: $p = \\frac{${cfg.p1}}{100} \\times \\frac{${cfg.p2}}{100} \\times 100 = ${globalPct}\\%$.`
			};
		} else {
			const wrongPoints = roundTo(cfg.i2 - cfg.i1, 2);
			const wrongDenom = roundTo(((cfg.i2 - cfg.i1) / cfg.i2) * 100, 2);
			const wrongBase = roundTo(cfg.i2 - 100, 2);

			const mcq = buildUniqueMcqOptions(
				`$${cfg.evol12}\\%$`,
				[
					{
						text: `$${wrongPoints}\\%$`,
						diagnosticFeedback: `انتبه! $${wrongPoints}$ هو الفارق بنقط المؤشر ($I_2 - I_1$)، أما نسبة التطور فتُحسب بالقسمة على المؤشر المرجعي $I_1 = ${cfg.i1}$.`
					},
					{
						text: `$${wrongDenom}\\%$`,
						diagnosticFeedback: `قسمت على المؤشر النهائي $I_2 = ${cfg.i2}$ بدلاً من المؤشر الابتدائي $I_1 = ${cfg.i1}$.`
					},
					{
						text: `$${wrongBase}\\%$`,
						diagnosticFeedback: `هذه نسبة الزيادة مقارنة بسنة الأساس $2022$ ($I_0 = 100$) وليس بين $2023$ و $2024$.`
					}
				],
				rng
			);
			finalAnswer = `${cfg.evol12}%`;
			quizQuestion = {
				type: 'mcq',
				questionText: `انتقل مؤشر إنتاج مؤسسة صناعية من $I_1 = ${cfg.i1}$ سنة $2023$ إلى $I_2 = ${cfg.i2}$ سنة $2024$ (بنفس سنة الأساس $100$). ما هي النسبة المئوية لنمو الإنتاج بين سنتي $2023$ و $2024$؟`,
				questionTextAr: `عيّن نسبة التطور المئوية للإنتاج بين $2023$ ($I_1 = ${cfg.i1}$) و $2024$ ($I_2 = ${cfg.i2}$):`,
				imageUrl: chartUrl,
				imageCaption: 'مؤشرات الإنتاج بين 2022 و 2024',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نسبة التطور بين السنتين هي $\\frac{I_2 - I_1}{I_1} \\times 100 = \\frac{${cfg.i2} - ${cfg.i1}}{${cfg.i1}} \\times 100 = ${cfg.evol12}\\%$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `توظّف مؤسسة صناعية جزائرية $${cfg.totalWorkers}$ عاملاً، حيث يشتغل $${cfg.p1}$% منهم في قسم الإنتاج، ومن بين عمال الإنتاج يشغل $${cfg.p2}$% منصب تقني مراقبة الجودة.`,
			content: [
				{
					type: 'text',
					content: `1) احسب عدد عمال قسم الإنتاج، ثم احسب عدد تقنيي مراقبة الجودة، واستنتج النسبة المئوية التي يمثلونها من إجمالي عمال المؤسسة.`,
					answer: `1) حساب الأعداد والنسبة الإجمالية:\n- عدد عمال الإنتاج: $${cfg.totalWorkers} times frac(${cfg.p1}, 100) = ${prodCount}$ عاملاً.\n- عدد تقنيي الجودة: $${prodCount} times frac(${cfg.p2}, 100) = ${techCount}$ تقنياً.\n- النسبة المئوية الإجمالية: $frac(${cfg.p1}, 100) times frac(${cfg.p2}, 100) = ${globalPct}$% (ونتحقق أن $frac(${techCount}, ${cfg.totalWorkers}) times 100 = ${globalPct}$%).`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'table',
							headers: ['السنة', '2022 (الأساس)', '2023', '2024'],
							cells: [],
							rows: [
								['الإنتاج (بالطن)', `$${cfg.y0}$`, `$${y1}$`, { content: '...', answer: `$${y2}$`, mark: '0.5' }],
								['المؤشر (الأساس 100)', '$100$', { content: '...', answer: `$${cfg.i1}$`, mark: '0.5' }, `$${cfg.i2}$`]
							],
							headerBackground: true
						},
						{
							type: 'image',
							src: chartUrl,
							caption: 'مخطط تطور الإنتاج السنوي'
						}
					]
				},
				{
					type: 'text',
					content: `2) يوضّح الجدول أعلاه تطور إنتاج المؤسسة. أكمل الجدول بحساب مؤشر سنة $2023$ وإنتاج سنة $2024$، ثم احسب النسبة المئوية لزيادة الإنتاج بين سنتي $2023$ و $2024$.`,
					answer: `2) حساب المؤشر والإنتاج ونسبة التطور:\n- مؤشر سنة $2023$: $I_1 = frac(${y1}, ${cfg.y0}) times 100 = ${cfg.i1}$.\n- إنتاج سنة $2024$: $y_2 = ${cfg.y0} times frac(${cfg.i2}, 100) = ${y2}$ طناً.\n- نسبة الزيادة بين $2023$ و $2024$: $t = frac(${cfg.i2} - ${cfg.i1}, ${cfg.i1}) times 100 = ${cfg.evol12}$%.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`لحساب نسبة مئوية من نسبة مئوية أخرى، اضرب النسبتين: $\\frac{p_1}{100} \\times \\frac{p_2}{100}$.`,
				`المؤشر بالأساس $100$ يحقق $I_1 = \\frac{y_1}{y_0} \\times 100$، ومنه $y_2 = y_0 \\times \\frac{I_2}{100}$.`,
				`نسبة التطور بين مؤشرين $I_1$ و $I_2$ هي $\\frac{I_2 - I_1}{I_1} \\times 100\\%$ وليس الفرق $I_2 - I_1$.`
			],
			solutionStepsAr: [
				`حساب عدد عمال الإنتاج (${prodCount}) وتقنيي الجودة (${techCount})، والنسبة الإجمالية ${globalPct}\\%.`,
				`حساب مؤشر 2023 ($I_1 = ${cfg.i1}$) وإنتاج 2024 ($y_2 = ${y2}$).`,
				`حساب نسبة الزيادة بين 2023 و 2024: $\\frac{${cfg.i2} - ${cfg.i1}}{${cfg.i1}} \\times 100 = ${cfg.evol12}\\%$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Successive Evolutions, Multipliers & Linear Asset Depreciation
// ═══════════════════════════════════════════════════════════════════════════════

const tplSuccessiveEvolutions: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_successive_evolutions',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'التطورات المتعاقبة، المعاملات الضربية، التطور العكسي والاهتلاك الخطي',
	curriculumLessonId: 'lesson_2as_ge_t1_successive_evolutions_multipliers',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface EvolConfig {
			v0: number;
			t1: number; // +t1%
			t2: number; // -t2%
			invPct: number; // exact reciprocal discount for +t1%
			depYears: number;
		}

		const pool: EvolConfig[] =
			difficulty === 'easy'
				? [
						{ v0: 40000, t1: 25, t2: 20, invPct: 20, depYears: 5 },
						{ v0: 50000, t1: 25, t2: 10, invPct: 20, depYears: 5 },
						{ v0: 60000, t1: 25, t2: 12, invPct: 20, depYears: 4 },
						{ v0: 80000, t1: 25, t2: 16, invPct: 20, depYears: 8 }
					]
				: difficulty === 'medium'
					? [
							{ v0: 50000, t1: 25, t2: 15, invPct: 20, depYears: 5 },
							{ v0: 64000, t1: 60, t2: 25, invPct: 37.5, depYears: 4 },
							{ v0: 80000, t1: 60, t2: 30, invPct: 37.5, depYears: 5 },
							{ v0: 100000, t1: 25, t2: 28, invPct: 20, depYears: 5 }
						]
					: [
							{ v0: 120000, t1: 60, t2: 35, invPct: 37.5, depYears: 6 },
							{ v0: 160000, t1: 60, t2: 40, invPct: 37.5, depYears: 8 },
							{ v0: 75000, t1: 25, t2: 32, invPct: 20, depYears: 5 },
							{ v0: 90000, t1: 60, t2: 15, invPct: 37.5, depYears: 6 }
						];

		const cfg = rng.pick(pool);
		const k1 = roundTo(1 + cfg.t1 / 100, 2);
		const k2 = roundTo(1 - cfg.t2 / 100, 2);
		const kGlobal = roundTo(k1 * k2, 4);
		const v1 = roundTo(cfg.v0 * k1, 2);
		const v2 = roundTo(cfg.v0 * kGlobal, 2);
		const tGlobal = roundTo((kGlobal - 1) * 100, 2);
		const kInv = roundTo(1 / k1, 3);
		const annDep = Math.round(cfg.v0 / cfg.depYears);
		const valAfter2 = cfg.v0 - 2 * annDep;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${v2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يبلغ السعر الأولي لآلة تغليف $${cfg.v0}\\text{ DA}$. ارتفع سعرها بنسبة $+${cfg.t1}\\%$ في الفصل الأول ثم خضع لتخفيض تجاري بنسبة $-${cfg.t2}\\%$ في الفصل الثاني. احسب السعر النهائي $V_2$ بالدينار الجزائري:`,
				questionTextAr: `احسب السعر النهائي $V_2$ بعد زيادة $+${cfg.t1}\\%$ ثم تخفيض $-${cfg.t2}\\%$:`,
				questionData: {
					answer: v2,
					displayTemplate: 'V_2 = ? DA',
					variables: [],
					tolerance: 0.01
				},
				explanation: `المعامل الضربي الإجمالي هو $k = ${k1} \\times ${k2} = ${kGlobal}$، ومنه السعر النهائي $V_2 = ${cfg.v0} \\times ${kGlobal} = ${v2}\\text{ DA}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${tGlobal}%`;
			quizQuestion = {
				type: 'calculated',
				questionText: `خضع منتج لزيادة سعر بنسبة $+${cfg.t1}\\%$ ثم لتخفيض تجاري بنسبة $-${cfg.t2}\\%$. احسب نسبة التطور الإجمالية (بالمئة، اكتب العدد مع إشارته دون رمز %):`,
				questionTextAr: `احسب نسبة التطور الإجمالية بعد $+${cfg.t1}\\%$ ثم $-${cfg.t2}\\%$:`,
				questionData: {
					answer: tGlobal,
					displayTemplate: 'T = ? %',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نحسب المعامل الإجمالي $k = ${k1} \\times ${k2} = ${kGlobal}$، فتكون النسبة الإجمالية $T = (${kGlobal} - 1) \\times 100 = ${tGlobal}\\%$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`تخفيض بنسبة $${cfg.invPct}\\%$`,
				[
					{
						text: `تخفيض بنسبة $${cfg.t1}\\%$`,
						diagnosticFeedback: `فخ شائع! $+${cfg.t1}\\%$ متبوعة بـ $-${cfg.t1}\\%$ لا تعيد السعر إلى أصله لأن القاعدة المرجعية قد تغيرت.`
					},
					{
						text: `تخفيض بنسبة $${roundTo(cfg.invPct + 5, 1)}\\%$`,
						diagnosticFeedback: `تحقق من حساب المعامل العكسي $k' = \\frac{1}{${k1}} = ${kInv}$ ثم $(1 - k') \\times 100$.`
					},
					{
						text: `زيادة بنسبة $${cfg.invPct}\\%$`,
						diagnosticFeedback: `للرجوع بعد زيادة نطبق تخفيضاً وليس زيادة!`
					}
				],
				rng
			);
			finalAnswer = `-${cfg.invPct}%`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ارتفع سعر قطعة صناعية بنسبة $+${cfg.t1}\\%$. ما هو التطور العكسي الواجب تطبيقه للعودة بالضبط إلى السعر الأصلي؟`,
				questionTextAr: `عيّن نسبة التطور العكسي للعودة إلى السعر الأصلي بعد زيادة $+${cfg.t1}\\%$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `معامل الزيادة هو $k_1 = ${k1}$، فالمعامل العكسي هو $k' = \\frac{1}{${k1}} = ${kInv}$، أي تخفيض بنسبة $(1 - ${kInv}) \\times 100 = ${cfg.invPct}\\%$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تعرض مؤسسة لتجهيزات المخابز آلة عجن كهربائية بسعر أولي $V_0 = ${cfg.v0} upright("DA")$.`,
			content: [
				{
					type: 'text',
					content: `1) شهد سعر الآلة في السوق تطورين متعاقبين: زيادة بنسبة $+${cfg.t1}$% في بداية السنة، ثم تخفيضاً ترويجياً بنسبة $-${cfg.t2}$%.\nأ) عيّن المعاملين الضربيين $k_1$ و $k_2$، ثم استنتج المعامل الضربي الإجمالي $k$ ونسبة التطور الإجمالية.\nب) احسب السعر النهائي $V_2$ للآلة.`,
					answer: `1) دراسة التطورات المتعاقبة:\nأ) $k_1 = 1 + frac(${cfg.t1}, 100) = ${k1}$ و $k_2 = 1 - frac(${cfg.t2}, 100) = ${k2}$.\nالمعامل الإجمالي: $k = k_1 times k_2 = ${k1} times ${k2} = ${kGlobal}$.\nنسبة التطور الإجمالية: $T = (${kGlobal} - 1) times 100 = ${tGlobal}$%.\nب) السعر النهائي: $V_2 = ${cfg.v0} times ${kGlobal} = ${v2} upright("DA")$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) ما هي نسبة التخفيض العكسي اللازمة للرجوع من السعر $V_1$ (بعد الزيادة الأولى $+${cfg.t1}$%) إلى السعر الأصلي $V_0$؟`,
					answer: `2) التطور العكسي:\nالمعامل الضربي العكسي هو $k' = frac(1, ${k1}) = ${kInv}$.\nنسبة التخفيض العكسي هي $(${kInv} - 1) times 100 = -${cfg.invPct}$% (أي تخفيض بنسبة $${cfg.invPct}$%).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) اقتنت مخبزة هذه الآلة بمبلغها الأصلي $${cfg.v0} upright("DA")$، وتطبّق عليها محاسبياً **الاهتلاك الخطي** على مدى $${cfg.depYears}$ سنوات بقسط سنوي ثابت. احسب قسط الاهتلاك السنوي $A$، ومعدل الاهتلاك الخطي، والقيمة المحاسبية الصافية للآلة بعد سنتين من الاستغلال.`,
					answer: `3) جدول الاهتلاك الخطي:\n- القسط السنوي الثابت: $A = frac(${cfg.v0}, ${cfg.depYears}) = ${annDep} upright("DA")$.\n- معدل الاهتلاك السنوي: $frac(100, ${cfg.depYears}) = ${roundTo(100 / cfg.depYears, 2)}$%.\n- القيمة المحاسبية الصافية بعد سنتين: $V_0 - 2 A = ${cfg.v0} - 2(${annDep}) = ${valAfter2} upright("DA")$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`معامل الزيادة بنسبة $t\\%$ هو $1 + \\frac{t}{100}$، ومعامل التخفيض هو $1 - \\frac{t}{100}$.`,
				`في التطورات المتعاقبة، نضرب المعاملات الضربية $k = k_1 \\times k_2$ ولا نجمع النسب المئوية!`,
				`المعامل العكسي يساوي مقلوب المعامل الأول $k' = \\frac{1}{k_1}$، أما الاهتلاك الخطي فيخصم قسطاً سنوياً ثابتاً $\\frac{V_0}{n}$.`
			],
			solutionStepsAr: [
				`المعاملات الضربية: $k_1 = ${k1}$ و $k_2 = ${k2}$، والمعامل الإجمالي $k = ${kGlobal}$ ($T = ${tGlobal}\\%$).`,
				`السعر النهائي: $V_2 = ${cfg.v0} \\times ${kGlobal} = ${v2}\\text{ DA}$، والتخفيض العكسي $${cfg.invPct}\\%$.`,
				`الاهتلاك الخطي: القسط السنوي $A = ${annDep}\\text{ DA}$ والقيمة الصافية بعد سنتين هي $${valAfter2}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Descriptive Statistics: Mean, Variance, Std Dev & Affine Transformation
// ═══════════════════════════════════════════════════════════════════════════════

const tplStatsVarianceSigma: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_stats_variance_sigma',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الإحصاء الوصفي: الوسط الحسابي، التباين، الانحراف المعياري والتحويل التآلفي',
	curriculumLessonId: 'lesson_2as_ge_t1_statistics_variance_boxplot',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Symmetric distribution around m with step h and frequencies [2, 4, 8, 4, 2] (N = 20)
		// Variance is exact: (2*(4h^2)*2 + 4*(h^2)*2)/20 = 24*h^2/20 = 1.2 * h^2
		const m = difficulty === 'easy' ? rng.pick([10, 12, 14, 16]) : difficulty === 'medium' ? rng.pick([15, 20, 25, 30]) : rng.pick([24, 32, 40, 50]);
		const h = difficulty === 'easy' ? 2 : difficulty === 'medium' ? rng.pick([2, 3]) : rng.pick([3, 4, 5]);
		const freqs = [2, 4, 8, 4, 2];
		const N = 20;
		const xs = [m - 2 * h, m - h, m, m + h, m + 2 * h];

		const sumXiNi = xs.reduce((acc, x, i) => acc + x * freqs[i], 0);
		const mean = sumXiNi / N; // = m
		const sumX2Ni = xs.reduce((acc, x, i) => acc + x * x * freqs[i], 0);
		const variance = roundTo(sumX2Ni / N - mean * mean, 4); // = 1.2 * h^2
		const sigma = roundTo(Math.sqrt(variance), 2);

		// Affine transformation y_i = a * x_i + b
		const aTrans = rng.pick([2, 3]);
		const bTrans = rng.pick([4, 5, 10]);
		const meanY = aTrans * mean + bTrans;
		const varY = roundTo(aTrans * aTrans * variance, 4);
		const sigmaY = roundTo(aTrans * sigma, 2);

		const barSvg = svgBarChart(
			xs.map((x, i) => ({ label: String(x), value: freqs[i] })),
			10
		);
		const barUrl = saveSvgAsset(`2as_ge_t1_stats_bar_${difficulty}_s${seed}`, barSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${mean}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يمثل الجدول توزيع الإنتاج اليومي لـ $20$ عاملاً: القيم $\\{${xs.join(' ; ')}\\}$ بتكرارات $\\{${freqs.join(' ; ')}\\}$ على الترتيب. احسب الوسط الحسابي $\\bar{x}$:`,
				questionTextAr: `احسب الوسط الحسابي $\\bar{x}$ للسلسلة الإحصائية:`,
				imageUrl: barUrl,
				imageCaption: 'مخطط الأعمدة لتكرارات الإنتاج اليومي',
				questionData: {
					answer: mean,
					displayTemplate: 'x̄ = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $\\sum n_i x_i = ${sumXiNi}$ والتكرار الكلي $N = ${N}$، ومنه $\\bar{x} = \\frac{${sumXiNi}}{${N}} = ${mean}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${variance}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لسلسلة إحصائية تكرارها الكلي $N = ${N}$، وسطها الحسابي $\\bar{x} = ${mean}$ ومجموع مربعاتها $\\sum n_i x_i^2 = ${sumX2Ni}$. احسب القيمة المضبوطة للتباين $V$:`,
				questionTextAr: `احسب التباين $V$ باستعمال دستور كونيغ-هيغنز:`,
				imageUrl: barUrl,
				imageCaption: 'التوزيع الإحصائي للقيم',
				questionData: {
					answer: variance,
					displayTemplate: 'V = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نطبق قانون التباين: $V = \\frac{\\sum n_i x_i^2}{N} - \\bar{x}^2 = \\frac{${sumX2Ni}}{${N}} - ${mean}^2 = ${roundTo(sumX2Ni / N, 2)} - ${mean * mean} = ${variance}$.`
			};
		} else {
			finalAnswer = `${varY}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تخضع سلسلة إحصائية وسطها $\\bar{x} = ${mean}$ وتباينها $V_x = ${variance}$ إلى تحويل تآلفي $y_i = ${aTrans}x_i + ${bTrans}$. احسب التباين الجديد $V_y$:`,
				questionTextAr: `احسب التباين الجديد $V_y$ للسلسلة المحوّلة $y_i = ${aTrans}x_i + ${bTrans}$:`,
				questionData: {
					answer: varY,
					displayTemplate: 'V_y = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `التباين لا يتأثر بالثابت المضاف $+${bTrans}$ ويتضاعف بمربع المعامل: $V_y = (${aTrans})^2 V_x = ${aTrans * aTrans} \\times ${variance} = ${varY}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تتابع مؤسسة لتصنيع الأجهزة المنزلية عدد الوحدات المجمّعة يومياً عبر $${N}$ فرقة عمل، فحصلت على التوزيع التالي:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'table',
							headers: ['عدد الوحدات $x_i$', ...xs.map((x) => `$${x}$`), 'المجموع'],
							cells: [],
							rows: [
								['عدد الفرق $n_i$', ...freqs.map((f) => `$${f}$`), `$${N}$`],
								[
									'$n_i x_i$',
									...xs.map((x, i) => ({ content: '...', answer: `$${x * freqs[i]}$` })),
									{ content: '...', answer: `$${sumXiNi}$` }
								]
							],
							headerBackground: true
						},
						{
							type: 'image',
							src: barUrl,
							caption: 'التمثيل بالأعمدة لتكرارات فرق العمل'
						}
					]
				},
				{
					type: 'text',
					content: `1) أكمل الجدول ثم احسب الوسط الحسابي $bar(x)$ لعدد الوحدات المجمعة.`,
					answer: `1) مجموع الجداءات $sum n_i x_i = ${sumXiNi}$.\nالوسط الحسابي: $bar(x) = frac(${sumXiNi}, ${N}) = ${mean}$ وحدة.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب التباين $V_x$ (بصيغة $frac(1, N) sum n_i x_i^2 - bar(x)^2$) واستنتج الانحراف المعياري $sigma_x$ (مدوراً إلى $10^(-2)$).`,
					answer: `2) لدينا $sum n_i x_i^2 = ${xs.map((x, i) => `${freqs[i]} times ${x}^2`).join(' + ')} = ${sumX2Ni}$.\n- التباين: $V_x = frac(${sumX2Ni}, ${N}) - (${mean})^2 = ${roundTo(sumX2Ni / N, 2)} - ${mean * mean} = ${variance}$.\n- الانحراف المعياري: $sigma_x = sqrt(${variance}) approx ${sigma}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) تقرّر منح مكافأة إنتاجية يومية بالدينار حسب العلاقة $y_i = ${aTrans} x_i + ${bTrans}$ (بمئات الدنانير). استنتج دون إعادة تشكيل الجدول الوسط الحسابي الجديد $bar(y)$ والتباين الجديد $V_y$ والانحراف المعياري $sigma_y$.`,
					answer: `3) بتطبيق خواص التحويل التآلفي $y_i = ${aTrans} x_i + ${bTrans}$:\n- الوسط الجديد: $bar(y) = ${aTrans} bar(x) + ${bTrans} = ${aTrans}(${mean}) + ${bTrans} = ${meanY}$.\n- التباين الجديد: $V_y = ${aTrans}^2 V_x = ${aTrans * aTrans} times ${variance} = ${varY}$.\n- الانحراف المعياري الجديد: $sigma_y = ${aTrans} sigma_x approx ${sigmaY}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`الوسط الحسابي هو $\\bar{x} = \\frac{1}{N}\\sum n_i x_i$.`,
				`التباين يُحسب بصيغة كونيغ-هيغنز: $V = \\frac{1}{N}\\sum n_i x_i^2 - \\bar{x}^2$، وتأكد دائماً أن $V \\ge 0$.`,
				`في التحويل التآلفي $y_i = a x_i + b$: الوسط يتبع $a\\bar{x}+b$، أما التباين فيتضاعف في $a^2$ فقط.`
			],
			solutionStepsAr: [
				`الوسط الحسابي: $\\bar{x} = \\frac{${sumXiNi}}{${N}} = ${mean}$.`,
				`التباين: $V_x = ${variance}$ والانحراف المعياري $\\sigma_x \\approx ${sigma}$.`,
				`التحويل التآلفي: $\\bar{y} = ${meanY}$ و $V_y = ${varY}$ و $\\sigma_y \\approx ${sigmaY}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Statistics: Median, Quartiles, Interquartile Range & Box Plot
// ═══════════════════════════════════════════════════════════════════════════════

const tplStatsQuartilesBoxplot: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_stats_quartiles_boxplot',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الإحصاء الوصفي: الوسيط، الربيعيات، الانحراف الربيعي والمخطط بالعلبة',
	curriculumLessonId: 'lesson_2as_ge_t1_statistics_variance_boxplot',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// N = 15 sorted values => Q1 is exact 4th value, Median is 8th value, Q3 is 12th value (consistent across all conventions!)
		const base = difficulty === 'easy' ? rng.int(10, 14) : difficulty === 'medium' ? rng.int(16, 22) : rng.int(24, 32);
		const d1 = rng.int(2, 4);
		const d2 = rng.int(3, 5);
		const d3 = rng.int(3, 5);
		const d4 = rng.int(3, 6);

		const minVal = base;
		const q1 = minVal + d1;
		const median = q1 + d2;
		const q3 = median + d3;
		const maxVal = q3 + d4;

		const sorted: number[] = [
			minVal,
			minVal + 1,
			q1 - 1,
			q1, // index 3 (rank 4 => Q1)
			q1 + 1,
			median - 2,
			median - 1,
			median, // index 7 (rank 8 => Median)
			median + 1,
			q3 - 2,
			q3 - 1,
			q3, // index 11 (rank 12 => Q3)
			q3 + 1,
			maxVal - 1,
			maxVal
		];
		const shuffled = rng.shuffle(sorted);
		const iqr = q3 - q1;
		const range = maxVal - minVal;

		const boxSvg = svgBoxPlot({
			min: minVal,
			q1,
			median,
			q3,
			max: maxVal,
			title: 'المخطط بالعلبة لتوزيع الطلبيات اليومية'
		});
		const boxUrl = saveSvgAsset(`2as_ge_t1_boxplot_${difficulty}_s${seed}`, boxSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${median}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تمثل القيم الآتية عدد الطلبيات اليومية المسجلة خلال $15$ يوماً:\n$${shuffled.join(' \\,;\\, ')}$\nاحسب الوسيط $M_e$ لهذه السلسلة الإحصائية:`,
				questionTextAr: `احسب الوسيط $M_e$ لهذه السلسلة المكونة من $15$ قيمة:`,
				questionData: {
					answer: median,
					displayTemplate: 'Me = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بعد الترتيب التصاعدي للقيم الـ $15$: $${sorted.join(' \\le ')}$.\nرتبة الوسيط هي $\\frac{15 + 1}{2} = 8$، إذن $M_e = ${median}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${iqr}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `سجلت مؤسسة مبيعاتها اليومية خلال $15$ يوماً، فكانت القيم مرتبة تصاعدياً:\n$${sorted.join(' \\,;\\, ')}$\nاحسب الانحراف الربيعي $\\text{IQR} = Q_3 - Q_1$:`,
				questionTextAr: `احسب الانحراف الربيعي $Q_3 - Q_1$:`,
				imageUrl: boxUrl,
				imageCaption: 'المخطط بالعلبة للسلسلة الإحصائية',
				questionData: {
					answer: iqr,
					displayTemplate: 'Q_3 - Q_1 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `رتبة $Q_1$ هي $\\lceil 15/4 \\rceil = 4$ أي $Q_1 = ${q1}$، ورتبة $Q_3$ هي $\\lceil 45/4 \\rceil = 12$ أي $Q_3 = ${q3}$.\nومنه الانحراف الربيعي هو $Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$Q_1 = ${q1}$ و $Q_3 = ${q3}$ والمدى $e = ${range}$`,
				[
					{
						text: `$Q_1 = ${sorted[2]}$ و $Q_3 = ${sorted[10]}$ والمدى $e = ${range}$`,
						diagnosticFeedback: `أخطأت في رتب الربيعيات: من أجل $15$ قيمة، الربع الأول في الرتبة $4$ (وليس $3$) والثالث في الرتبة $12$ (وليس $11$).`
					},
					{
						text: `$Q_1 = ${q1}$ و $Q_3 = ${q3}$ والمدى $e = ${iqr}$`,
						diagnosticFeedback: `المدى الكلي هو $\\max - \\min = ${maxVal} - ${minVal} = ${range}$ وليس الانحراف الربيعي $Q_3 - Q_1 = ${iqr}$!`
					},
					{
						text: `$Q_1 = ${median}$ و $Q_3 = ${maxVal}$ والمدى $e = ${range}$`,
						diagnosticFeedback: `خلطت بين الوسيط $M_e$ والقيمة العظمى $\\max$ وبين الربيعين $Q_1$ و $Q_3$.`
					}
				],
				rng
			);
			finalAnswer = `Q1=${q1}, Q3=${q3}, e=${range}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `من السلسلة الإحصائية لعدد الطلبيات خلال $15$ يوماً:\n$${shuffled.join(' \\,;\\, ')}$\nما هي قيم الربيع الأول $Q_1$ والربيع الثالث $Q_3$ والمدى الكلي $e$؟`,
				questionTextAr: `عيّن $Q_1$ و $Q_3$ والمدى الكلي $e$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بالترتيب التصاعدي نجد $\\min = ${minVal}$، $Q_1 = ${q1}$ (رتبة 4)، $M_e = ${median}$ (رتبة 8)، $Q_3 = ${q3}$ (رتبة 12)، $\\max = ${maxVal}$، والمدى $e = ${maxVal} - ${minVal} = ${range}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تتابع مصلحة المبيعات لمتجر تجاري عدد الطلبيات المؤكدة يومياً خلال $15$ يوماً، فكانت النتائج الآتية:\n$${shuffled.join(' \\,;\\, ')}$`,
			content: [
				{
					type: 'text',
					content: `1) رتّب قيم السلسلة تصاعدياً، ثم احسب المدى الكلي $e$.`,
					answer: `1) الترتيب التصاعدي:\n$${sorted.join(' <= ')}$\nالمدى الكلي: $e = ${maxVal} - ${minVal} = ${range}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) عيّن الوسيط $M_e$، والربيع الأول $Q_1$، والربيع الثالث $Q_3$، ثم احسب الانحراف الربيعي $Q_3 - Q_1$.`,
					answer: `2) مؤشرات الموقع والتشتت الربيعي ($N = 15$):\n- رتبة الوسيط هي $frac(15 + 1, 2) = 8$: $M_e = ${median}$.\n- رتبة $Q_1$ هي $4$ ($25$% من $15$ هو $3.75$): $Q_1 = ${q1}$.\n- رتبة $Q_3$ هي $12$ ($75$% من $15$ هو $11.25$): $Q_3 = ${q3}$.\n- الانحراف الربيعي: $Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$.`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `3) أنشئ المخطط بالعلبة لهذه السلسلة، وما هي النسبة التقريبية للأيام التي تراوحت فيها الطلبيات بين $${q1}$ و $${q3}$ طلبية؟`,
							answer: `3) يوضح المخطط بالعلبة المقابل التلخيص الخمسي $(${minVal} ; ${q1} ; ${median} ; ${q3} ; ${maxVal})$.\nنسبة الأيام المحصورة بين $Q_1 = ${q1}$ و $Q_3 = ${q3}$ هي حوالي $50$% من عدد الأيام.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: boxUrl,
							caption: `المخطط بالعلبة: $[${minVal} ; ${q1} ; ${median} ; ${q3} ; ${maxVal}]$`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`ابدأ دائماً بترتيب جميع القيم الـ $15$ تصاعدياً من الأصغر إلى الأكبر قبل حساب أي مؤشر.`,
				`رتبة $Q_1$ هي القيمة الـ $4$، والوسيط هو القيمة الـ $8$، و $Q_3$ هو القيمة الـ $12$.`,
				`العلبة المركزية في المخطط بالعلبة تمتد من $Q_1$ إلى $Q_3$ وطولها هو الانحراف الربيعي $Q_3 - Q_1$.`
			],
			solutionStepsAr: [
				`الترتيب التصاعدي والمدى: $e = ${maxVal} - ${minVal} = ${range}$.`,
				`المؤشرات: $Q_1 = ${q1}$، $M_e = ${median}$، $Q_3 = ${q3}$، والانحراف الربيعي $${iqr}$.`,
				`تلخيص المخطط بالعلبة $(${minVal}, ${q1}, ${median}, ${q3}, ${maxVal})$ وتمركز $50\\%$ داخل العلبة.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Quadratic Equations, Canonical Form, Factorization & Inequalities
// ═══════════════════════════════════════════════════════════════════════════════

const tplQuadraticEquationsSign: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_quadratic_equations_sign',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'كثيرات الحدود من الدرجة 2: المميز، الشكل النموذجي، التحليل والمتراجحات',
	curriculumLessonId: 'lesson_2as_ge_t1_polynomials_quadratics',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a = difficulty === 'easy' ? rng.pick([1, -1]) : difficulty === 'medium' ? rng.pick([1, -1, 2]) : rng.pick([2, -2, 3]);
		// Choose r1 < r2 with same parity so vertex xS = (r1 + r2) / 2 is integer
		const r1 = rng.int(-3, 2);
		const halfGap = rng.pick([1, 2, 3]);
		const r2 = r1 + 2 * halfGap;
		const xS = r1 + halfGap;

		const b = -a * (r1 + r2);
		const c = a * r1 * r2;
		const delta = b * b - 4 * a * c; // = 4 * a^2 * halfGap^2 > 0
		const yS = a * xS * xS + b * xS + c; // = -a * halfGap^2

		const pKatex = poly2Katex(a, b, c, 'x');
		const pTypst = poly2Typst(a, b, c, 'x');
		const factKatex = `${a === 1 ? '' : a === -1 ? '-' : a}${fmtShift('x', r1)}${fmtShift('x', r2)}`;
		const factTypst = `${a === 1 ? '' : a === -1 ? '-' : `${a} `}${fmtShift('x', r1)}${fmtShift('x', r2)}`;

		const yMinPlot = Math.min(-3, yS - 2, r1 * 0 - 2);
		const yMaxPlot = Math.max(4, yS + 2, 5);
		const curveSvg = svgFunctionCurvePlot({
			xMin: r1 - 2,
			xMax: r2 + 2,
			yMin: Math.max(-20, yMinPlot),
			yMax: Math.min(20, yMaxPlot),
			fn: (x) => a * x * x + b * x + c,
			curveLabel: 'C_P',
			points: [
				{ x: r1, y: 0, label: `(${r1};0)`, color: '#dc2626' },
				{ x: r2, y: 0, label: `(${r2};0)`, color: '#dc2626' },
				{ x: xS, y: yS, label: `S(${xS};${yS})`, color: '#15803d' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t1_quad_curve_${difficulty}_s${seed}`, curveSvg);

		const posIntervalKatex = a > 0 ? `]-\\infty ; ${r1}] \\cup [${r2} ; +\\infty[` : `[${r1} ; ${r2}]`;
		const posIntervalTypst = a > 0 ? `]-oo, ${r1}] union [${r2}, +oo[` : `[${r1}, ${r2}]`;
		const negIntervalKatex = a > 0 ? `[${r1} ; ${r2}]` : `]-\\infty ; ${r1}] \\cup [${r2} ; +\\infty[`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${delta}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر ثلاثي الحدود من الدرجة الثانية $P(x) = ${pKatex}$. احسب قيمة مميزه $\\Delta = b^2 - 4ac$:`,
				questionTextAr: `احسب المميز $\\Delta$ لثلاثي الحدود $P(x) = ${pKatex}$:`,
				questionData: {
					answer: delta,
					displayTemplate: 'Δ = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $a = ${a}$ و $b = ${b}$ و $c = ${c}$، ومنه $\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} - (${4 * a * c}) = ${delta}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${yS}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر ثلاثي الحدود $P(x) = ${pKatex}$ الذي تقع ذروته عند الفاصلة $x_S = ${xS}$. احسب القيمة الحدية $P(${xS})$:`,
				questionTextAr: `احسب ترتيب الذروة $P(${xS})$ لثلاثي الحدود $P(x) = ${pKatex}$:`,
				imageUrl: curveUrl,
				imageCaption: 'القطع المكافئ الممثل لـ P(x)',
				questionData: {
					answer: yS,
					displayTemplate: `P(${xS}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `بتعويض $x = ${xS}$ في $P(x)$ نجد $P(${xS}) = ${a}(${xS})^2 + (${b})(${xS}) + (${c}) = ${yS}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$S = ${posIntervalKatex}$`,
				[
					{
						text: `$S = ${negIntervalKatex}$`,
						diagnosticFeedback: `انتبه لإشارة المعامل $a = ${a}$! تكون إشارة $P(x)$ عكس إشارة $a$ بين الجذرين ومماثلة لها خارج الجذرين.`
					},
					{
						text: `$S = ]${r1} ; ${r2}[$`,
						diagnosticFeedback: `تحقق من إشارة $a = ${a}$ ومن شمول الطرفين لأن المتراجحة هي $\\ge 0$.`
					},
					{
						text: `$S = \\{${r1} ; ${r2}\\}$`,
						diagnosticFeedback: `هذه مجموعة حلول المعادلة $P(x) = 0$ وليس المتراجحة $P(x) \\ge 0$.`
					}
				],
				rng
			);
			finalAnswer = posIntervalKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `لثلاثي الحدود $P(x) = ${pKatex}$ جذران هما $${r1}$ و $${r2}$. ما هي مجموعة حلول المتراجحة $P(x) \\ge 0$ في $\\mathbb{R}$؟`,
				questionTextAr: `عيّن مجموعة حلول المتراجحة $P(x) \\ge 0$ في $\\mathbb{R}$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للقطع المكافئ لـ P(x)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الجذران هما $${r1}$ و $${r2}$ ومعامل $x^2$ هو $a = ${a}$. لذا تكون $P(x) \\ge 0$ على المجال $${posIntervalKatex}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر كثير الحدود من الدرجة الثانية $P(x)$ المعرف على $bb(R)$ بـ: $P(x) = ${pTypst}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب المميز $Delta$، ثم حل في $bb(R)$ المعادلة $P(x) = 0$ واستنتج تحليل $P(x)$ إلى جداء عاملين.\n2) اكتب $P(x)$ على الشكل النموذجي واستنتج إحداثيي ذروة القطع المكافئ $(C_P)$.`,
							answer: `1) $Delta = (${b})^2 - 4(${a})(${c}) = ${delta} > 0$.\nالجذران هما $x_1 = ${r1}$ و $x_2 = ${r2}$، والتحليل هو $P(x) = ${factTypst}$.\n2) الشكل النموذجي: $P(x) = ${a === 1 ? '' : a === -1 ? '-' : `${a} `}${fmtShift('x', xS)}^2 ${yS >= 0 ? `+ ${yS}` : `- ${Math.abs(yS)}`}$.\nذروة القطع المكافئ هي $S(${xS} ; ${yS})$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني (C_P) والذروة والجذران'
						}
					]
				},
				{
					type: 'text',
					content: `3) شكّل جدول إشارة $P(x)$ على $bb(R)$، ثم استنتج مجموعة حلول المتراجحة $P(x) >= 0$.`,
					answer: `3) إشارة $P(x)$ هي نفس إشارة $a = ${a}$ خارج المجال $[${r1} ; ${r2}]$ وعكس إشارة $a$ داخله.\nإذن مجموعة حلول $P(x) >= 0$ هي $S = ${posIntervalTypst}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`احسب $\\Delta = b^2 - 4ac$ بانتباه لإشارات $a$ و $c$.`,
				`الفاصلة $x_S = -\\frac{b}{2a} = \\frac{x_1 + x_2}{2}$ وترتيب الذروة هو $P(x_S)$.`,
				`إشارة $ax^2 + bx + c$ هي نفس إشارة $a$ خارج الجذرين وعكس إشارة $a$ بين الجذرين.`
			],
			solutionStepsAr: [
				`المميز $\\Delta = ${delta}$، والجذران هما $${r1}$ و $${r2}$، والتحليل $P(x) = ${factKatex}$.`,
				`الشكل النموذجي وإحداثيا الذروة $S(${xS}; ${yS})$.`,
				`إشارة $P(x)$ ومجموعة حلول $P(x) \\ge 0$ هي $${posIntervalKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Integration Problem (7 Points): Cost, Break-Even, Profit & Murabaha
// ═══════════════════════════════════════════════════════════════════════════════

const tplEconomicCostProfitIntegration: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t1_economic_cost_profit_integration',
	grade: '2as_ge',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دراسة الكلفة والإيراد والربح الأعظمي وتطبيقات التمويل بالمرابحة',
	curriculumLessonId: 'lesson_2as_ge_t1_cost_revenue_profit_apps',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface EconConfig {
			a: number; // B(q) = -a(q - q1)(q - q2)
			q1: number;
			q2: number; // same parity as q1 => integer qStar = (q1 + q2)/2
			bCost: number; // C_T(q) = a*q^2 + bCost*q + cCost
			marginPct: number; // Murabaha known profit margin %
			months: number; // Murabaha equal installments
		}

		const pool: EconConfig[] =
			difficulty === 'easy'
				? [
						{ a: 1, q1: 4, q2: 12, bCost: 10, marginPct: 10, months: 10 },
						{ a: 1, q1: 6, q2: 14, bCost: 8, marginPct: 15, months: 12 },
						{ a: 1, q1: 4, q2: 16, bCost: 12, marginPct: 12, months: 12 },
						{ a: 1, q1: 8, q2: 18, bCost: 10, marginPct: 15, months: 10 }
					]
				: difficulty === 'medium'
					? [
							{ a: 2, q1: 4, q2: 12, bCost: 8, marginPct: 12, months: 12 },
							{ a: 2, q1: 5, q2: 15, bCost: 10, marginPct: 15, months: 15 },
							{ a: 2, q1: 6, q2: 16, bCost: 12, marginPct: 16, months: 20 },
							{ a: 2, q1: 4, q2: 14, bCost: 14, marginPct: 14, months: 12 }
						]
					: [
							{ a: 3, q1: 5, q2: 13, bCost: 12, marginPct: 18, months: 12 },
							{ a: 3, q1: 6, q2: 14, bCost: 10, marginPct: 15, months: 15 },
							{ a: 2, q1: 7, q2: 19, bCost: 16, marginPct: 12, months: 16 },
							{ a: 3, q1: 4, q2: 16, bCost: 15, marginPct: 20, months: 24 }
						];

		const cfg = rng.pick(pool);
		const { a, q1, q2, bCost, marginPct, months } = cfg;
		const qMaxDomain = q2 + 4;
		const qStar = (q1 + q2) / 2;
		const pUnit = a * (q1 + q2) + bCost; // so pUnit - bCost = a*(q1 + q2) => B(q) = -a q^2 + a(q1+q2) q - a q1 q2
		const cCost = a * q1 * q2;
		const maxProfit = a * (qStar - q1) * (qStar - q1); // in 1000 DA
		const deltaB = a * a * (q2 - q1) * (q2 - q1);

		// Part 2: Murabaha halal equipment purchase using fixed cost C_0 (or rounded capital in DA)
		const equipCostDA = cCost * 1000 * 5; // clean multiple of 1000
		const murabahaTotalDA = Math.round(equipCostDA * (1 + marginPct / 100));
		const installmentDA = roundTo(murabahaTotalDA / months, 2);

		const costTypst = poly2Typst(a, bCost, cCost, 'q');
		const costKatex = poly2Katex(a, bCost, cCost, 'q');
		const profitTypst = poly2Typst(-a, a * (q1 + q2), -cCost, 'q');
		const profitKatex = poly2Katex(-a, a * (q1 + q2), -cCost, 'q');

		const varTableSvg = svgVariationTable({
			fnName: 'B(q)',
			derivName: "B'(q)",
			xValues: ['0', `${qStar}`, `${qMaxDomain}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: `-${cCost}`, position: 'bottom' },
				{ value: `${maxProfit}`, position: 'top' },
				{ value: `${-a * (qMaxDomain - q1) * (qMaxDomain - q2)}`, position: 'bottom' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_ge_t1_int_vartable_${difficulty}_s${seed}`, varTableSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: qMaxDomain,
			yMin: Math.max(-maxProfit, -cCost * 0.6),
			yMax: maxProfit + 15,
			fn: (x) => -a * (x - q1) * (x - q2),
			curveLabel: 'الربح B(q)',
			asymptotes: [{ kind: 'horizontal', value: 0, label: 'y = 0', color: '#64748b' }],
			tangents: [{ x: qStar, y: maxProfit, slope: 0, halfSpan: 2, color: '#059669' }],
			points: [
				{ x: q1, y: 0, label: `q1=${q1}`, color: '#dc2626' },
				{ x: qStar, y: maxProfit, label: `Max(${qStar};${maxProfit})`, color: '#15803d' },
				{ x: q2, y: 0, label: `q2=${q2}`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t1_int_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${qStar}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُنمذج الكلفة الكلية اليومية لمصنع (بآلاف الدنانير) بالعبارة $C_T(q) = ${costKatex}$، وسعر بيع الوحدة الواحدة هو $${pUnit}$ ألف دج ($R(q) = ${pUnit}q$). احسب الكمية المثلى $q^*$ التي تعظّم الربح اليومي $B(q) = R(q) - C_T(q)$:`,
				questionTextAr: `عيّن الكمية المثلى $q^*$ التي تحقق أكبر ربح يومي:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى دالة الربح B(q) ونقطتا التعادل',
				questionData: {
					answer: qStar,
					displayTemplate: 'q* = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `دالة الربح هي $B(q) = ${profitKatex}$. تبلغ ذروتها عند الفاصلة $q^* = -\\frac{${a * (q1 + q2)}}{2(${-a})} = ${qStar}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${maxProfit}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `الكلفة الكلية لإنتاج $q$ وحدة (بآلاف الدنانير) هي $C_T(q) = ${costKatex}$، والإيراد هو $R(q) = ${pUnit}q$. احسب قيمة الربح الأعظمي $B(q^*)$ بآلاف الدنانير:`,
				questionTextAr: `احسب الربح الأعظمي $B(q^*)$ بآلاف الدنانير:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني لدالة الربح B(q)',
				questionData: {
					answer: maxProfit,
					displayTemplate: 'B_max = ? (×1000 DA)',
					variables: [],
					tolerance: 0
				},
				explanation: `الكمية المثلى هي $q^* = ${qStar}$، ومنه الربح الأعظمي هو $B(${qStar}) = -${a}(${qStar} - ${q1})(${qStar} - ${q2}) = ${maxProfit}$ ألف دينار.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`مجال الربح هو $]${q1} ; ${q2}[$ وأقصى ربح يساوي $${maxProfit}$ ألف دج عند $q^* = ${qStar}$`,
				[
					{
						text: `مجال الربح هو $[0 ; ${q1}[ \\cup ]${q2} ; ${qMaxDomain}]$ وأقصى ربح يساوي $${maxProfit}$ ألف دج`,
						diagnosticFeedback: `انتبه لإشارة معامل $q^2$ السالب ($-${a} < 0$): يكون الربح موجباً **بين** الجذرين وليس خارجهما!`
					},
					{
						text: `مجال الربح هو $]${q1} ; ${q2}[$ وأقصى ربح يساوي $${cCost}$ ألف دج عند $q^* = ${qStar}$`,
						diagnosticFeedback: `العدد $${cCost}$ هو التكاليف الثابتة $C_T(0)$ وليس الربح الأعظمي!`
					},
					{
						text: `مجال الربح هو $]${q1} ; ${q2}[$ وأقصى ربح يساوي $${maxProfit}$ ألف دج عند $q^* = ${q2}$`,
						diagnosticFeedback: `عند $q_2 = ${q2}$ ينعدم الربح ($B(${q2}) = 0$)؛ الذروة تقع في منتصف الجذرين عند $q^* = ${qStar}$.`
					}
				],
				rng
			);
			finalAnswer = `]${q1};${q2}[, B(${qStar})=${maxProfit}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر دالة الربح اليومي $B(q) = ${profitKatex}$ على $[0 ; ${qMaxDomain}]$ (بآلاف الدنانير). ما هو مجال الإنتاج المربح تماماً ($B(q) > 0$) وما هي قيمة الربح الأعظمي؟`,
				questionTextAr: `حدّد مجال الإنتاج المربح تماماً والربح الأعظمي:`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات دالة الربح B(q)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `جذرا التعادل هما $${q1}$ و $${q2}$. بما أن معامل $q^2$ سالب، فإن $B(q) > 0$ على $]${q1} ; ${q2}[$، ويبلغ أقصاه عند $q^* = ${qStar}$ بقيمة $B(${qStar}) = ${maxProfit}$ ألف دج.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الاقتصادية الشاملة',
			instruction: `تنتج ورشة صناعية وطنية $q$ وحدة يومياً ($q in [0 ; ${qMaxDomain}]$). تُعطى دالة الكلفة الكلية (بآلاف الدنانير) بالعبارة:\n$C_T(q) = ${costTypst}$\nوتبيع الورشة كل وحدة بسعر ثابت قدره $${pUnit}$ ألف دينار.`,
			content: [
				{
					type: 'columns',
					widths: ['1.45fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*الجزء الأول: دراسة التكلفة والإيراد والربح (4.5 نقاط)*\n1) عبّر عن الإيراد الكلي $R(q)$، ثم بيّن أن دالة الربح الصافي $B(q) = R(q) - C_T(q)$ تُكتب على الشكل:\n$B(q) = ${profitTypst}$.\n2) حل في $bb(R)$ المعادلة $B(q) = 0$ (عتبتا التعادل)، واستنتج مجال الإنتاج المربح تماماً ($B(q) > 0$).`,
							answer: `الجزء الأول:\n1) الإيراد هو $R(q) = ${pUnit} q$.\nومنه $B(q) = ${pUnit} q - (${costTypst}) = ${profitTypst}$.\n2) المميز: $Delta = (${a * (q1 + q2)})^2 - 4(-${a})(-${cCost}) = ${deltaB}$.\nالجذران هما $q_1 = ${q1}$ و $q_2 = ${q2}$.\nبما أن $-${a} < 0$، يكون الإنتاج مربحاً تماماً من أجل $q in ]${q1} ; ${q2}[$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: varTableUrl,
							caption: 'جدول تغيرات دالة الربح B(q)'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.45fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) اكتب $B(q)$ على الشكل النموذجي، ثم استنتج الكمية المثلى $q^*$ التي تعظّم الربح اليومي وأقصى ربح ممكن.\n4) بقراءة المنحنى البياني المقابل، حدّد بيانياً قيم الكمية $q$ التي يحقّق فيها المصنع ربحاً موجباً أو معدوماً.`,
							answer: `3) الشكل النموذجي: $B(q) = -${a} ${fmtShift('q', qStar)}^2 + ${maxProfit}$.\nتبلغ الدالة قيمتها العظمى عند $q^* = ${qStar}$ وحدات، ويساوي الربح الأعظمي $${maxProfit}$ ألف دينار ($${maxProfit * 1000} upright("DA")$).\n4) يقع المنحنى فوق محور الفواصل على المجال $[${q1} ; ${q2}]$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني لدالة الربح B(q)'
						}
					]
				},
				{
					type: 'text',
					content: `*الجزء الثاني: تجديد التجهيزات بعقد مرابحة إسلامي (2.5 نقطة)*\nلتطوير خط الإنتاج، اقتنت المؤسسة آلة جديدة ثمنها النقدي $C_0 = ${equipCostDA} upright("DA")$ عبر تمويل بالمرابحة بهامش ربح ثابت ومعلوم قدره $${marginPct}$%، يُسدد على $${months}$ قسطاً شهرياً متساوياً.\n1) احسب ثمن البيع الإجمالي في عقد المرابحة.\n2) احسب قيمة القسط الشهري الثابت الواحد.`,
					answer: `الجزء الثاني:\n1) المعامل الضربي لهامش الربح المعلوم هو $k = 1 + frac(${marginPct}, 100) = ${roundTo(1 + marginPct / 100, 2)}$.\nثمن المرابحة الإجمالي المعلوم: $P = ${equipCostDA} times ${roundTo(1 + marginPct / 100, 2)} = ${murabahaTotalDA} upright("DA")$.\n2) قيمة القسط الشهري الثابت: $M = frac(${murabahaTotalDA}, ${months}) = ${installmentDA} upright("DA")$.`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`اطرح عبارة الكلفة الكلية $C_T(q)$ كاملة (مع عكس إشارات حدودها) من الإيراد $R(q) = ${pUnit}q$.`,
				`ذروة الربح تقع عند منتصف جذري التعادل $q^* = \\frac{q_1 + q_2}{2}$.`,
				`في عقد المرابحة الشرعي، يُحسب الثمن الإجمالي المعلوم $P = C_0(1 + \\frac{m}{100})$ ثم يُقسم على عدد الأقساط.`
			],
			solutionStepsAr: [
				`دالة الربح: $B(q) = ${profitKatex}$، وجذرا التعادل هما $${q1}$ و $${q2}$.`,
				`الربح الأعظمي: $B(${qStar}) = ${maxProfit}$ ألف دينار، ومجال الربح $]${q1} ; ${q2}[$.`,
				`عقد المرابحة: الثمن الإجمالي $${murabahaTotalDA}\\text{ DA}$ والقسط الشهري $${installmentDA}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 2AS GE
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_GE_T1: ParameterizedTemplate[] = [
	tplPercentagesIndices,
	tplSuccessiveEvolutions,
	tplStatsVarianceSigma,
	tplStatsQuartilesBoxplot,
	tplQuadraticEquationsSign,
	tplEconomicCostProfitIntegration
];
