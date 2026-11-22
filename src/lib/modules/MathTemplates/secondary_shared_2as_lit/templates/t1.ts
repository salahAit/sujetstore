import type { ExerciseBlock, TableBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';

function buildSingleBoxPlotSvg(opts: {
	title: string;
	xMin: number;
	q1: number;
	me: number;
	q3: number;
	xMax: number;
	axisMin?: number;
	axisMax?: number;
}): string {
	const w = 410;
	const h = 155;
	const padL = 32;
	const padR = 32;
	const axMin = opts.axisMin ?? Math.max(0, Math.floor(opts.xMin) - 2);
	const axMax = opts.axisMax ?? Math.ceil(opts.xMax) + 2;
	const span = Math.max(1, axMax - axMin);
	const toX = (v: number) => padL + ((v - axMin) / span) * (w - padL - padR);

	const pMin = toX(opts.xMin);
	const pQ1 = toX(opts.q1);
	const pMe = toX(opts.me);
	const pQ3 = toX(opts.q3);
	const pMax = toX(opts.xMax);
	const y = 74;

	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`,
		`<text x="${w / 2}" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${opts.title}</text>`,
		`<line x1="${padL}" y1="118" x2="${w - padR}" y2="118" stroke="#0f172a" stroke-width="1.5"/>`
	];

	const step = span > 18 ? 2 : 1;
	for (let t = axMin; t <= axMax; t += step) {
		const px = toX(t);
		parts.push(
			`<line x1="${px.toFixed(1)}" y1="114" x2="${px.toFixed(1)}" y2="122" stroke="#334155" stroke-width="1.2"/>`,
			`<text x="${px.toFixed(1)}" y="135" text-anchor="middle" font-size="9.5" fill="#475569">${t}</text>`
		);
	}

	parts.push(
		`<line x1="${pMin.toFixed(1)}" y1="${y}" x2="${pQ1.toFixed(1)}" y2="${y}" stroke="#1d4ed8" stroke-width="2"/>`,
		`<line x1="${pQ3.toFixed(1)}" y1="${y}" x2="${pMax.toFixed(1)}" y2="${y}" stroke="#1d4ed8" stroke-width="2"/>`,
		`<line x1="${pMin.toFixed(1)}" y1="${y - 9}" x2="${pMin.toFixed(1)}" y2="${y + 9}" stroke="#1d4ed8" stroke-width="2"/>`,
		`<line x1="${pMax.toFixed(1)}" y1="${y - 9}" x2="${pMax.toFixed(1)}" y2="${y + 9}" stroke="#1d4ed8" stroke-width="2"/>`,
		`<rect x="${pQ1.toFixed(1)}" y="${y - 15}" width="${Math.max(4, pQ3 - pQ1).toFixed(1)}" height="30" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>`,
		`<line x1="${pMe.toFixed(1)}" y1="${y - 15}" x2="${pMe.toFixed(1)}" y2="${y + 15}" stroke="#dc2626" stroke-width="2.5"/>`,
		`<text x="${pMin.toFixed(1)}" y="${y - 15}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${opts.xMin}</text>`,
		`<text x="${pQ1.toFixed(1)}" y="${y - 20}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Q1=${opts.q1}</text>`,
		`<text x="${pMe.toFixed(1)}" y="${y + 28}" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Me=${opts.me}</text>`,
		`<text x="${pQ3.toFixed(1)}" y="${y - 20}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Q3=${opts.q3}</text>`,
		`<text x="${pMax.toFixed(1)}" y="${y - 15}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${opts.xMax}</text>`
	);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Arabic Transparent" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${parts.join('')}</svg>`;
}

function buildDualBoxPlotSvg(opts: {
	labelA: string;
	a: [number, number, number, number, number];
	labelB: string;
	b: [number, number, number, number, number];
}): string {
	const w = 420;
	const h = 205;
	const padL = 44;
	const padR = 26;
	const axMin = 0;
	const axMax = 20;
	const toX = (v: number) => padL + ((v - axMin) / (axMax - axMin)) * (w - padL - padR);
	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`,
		`<text x="${w / 2}" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">المقارنة بالمخطط بالعلبة بين القسمين</text>`,
		`<line x1="${padL}" y1="166" x2="${w - padR}" y2="166" stroke="#0f172a" stroke-width="1.5"/>`
	];
	for (let t = 0; t <= 20; t += 2) {
		const px = toX(t);
		parts.push(
			`<line x1="${px.toFixed(1)}" y1="162" x2="${px.toFixed(1)}" y2="170" stroke="#334155" stroke-width="1.2"/>`,
			`<text x="${px.toFixed(1)}" y="183" text-anchor="middle" font-size="9.5" fill="#475569">${t}</text>`
		);
	}
	const drawRow = (y: number, vals: [number, number, number, number, number], col: string, fill: string, lbl: string) => {
		const [mn, q1, me, q3, mx] = vals;
		const pMin = toX(mn);
		const pQ1 = toX(q1);
		const pMe = toX(me);
		const pQ3 = toX(q3);
		const pMax = toX(mx);
		parts.push(
			`<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10.5" font-weight="bold" fill="${col}">${lbl}</text>`,
			`<line x1="${pMin.toFixed(1)}" y1="${y}" x2="${pQ1.toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="2"/>`,
			`<line x1="${pQ3.toFixed(1)}" y1="${y}" x2="${pMax.toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="2"/>`,
			`<line x1="${pMin.toFixed(1)}" y1="${y - 8}" x2="${pMin.toFixed(1)}" y2="${y + 8}" stroke="${col}" stroke-width="2"/>`,
			`<line x1="${pMax.toFixed(1)}" y1="${y - 8}" x2="${pMax.toFixed(1)}" y2="${y + 8}" stroke="${col}" stroke-width="2"/>`,
			`<rect x="${pQ1.toFixed(1)}" y="${y - 13}" width="${Math.max(4, pQ3 - pQ1).toFixed(1)}" height="26" fill="${fill}" stroke="${col}" stroke-width="2"/>`,
			`<line x1="${pMe.toFixed(1)}" y1="${y - 13}" x2="${pMe.toFixed(1)}" y2="${y + 13}" stroke="#dc2626" stroke-width="2.4"/>`,
			`<text x="${pQ1.toFixed(1)}" y="${y - 16}" text-anchor="middle" font-size="9" font-weight="bold" fill="${col}">${q1}</text>`,
			`<text x="${pMe.toFixed(1)}" y="${y + 23}" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">Me=${me}</text>`,
			`<text x="${pQ3.toFixed(1)}" y="${y - 16}" text-anchor="middle" font-size="9" font-weight="bold" fill="${col}">${q3}</text>`
		);
	};
	drawRow(64, opts.a, '#1d4ed8', '#dbeafe', opts.labelA);
	drawRow(122, opts.b, '#15803d', '#dcfce7', opts.labelB);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Arabic Transparent" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Percentages, Part-to-Whole, Percentage of Percentage & Relative Variation
// ═══════════════════════════════════════════════════════════════════════════════

const tplPercentageEvolution: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_percentage_evolution',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'النسب المئوية والتناسب: حساب نسبة جزء والزيادة والتخفيض',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_percentages_proportions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const totalBooks = difficulty === 'easy' ? rng.pick([200, 400, 500]) : rng.pick([300, 400, 600, 800]);
		const pctLit = rng.pick([30, 40, 50, 60]);
		const pctTranslated = rng.pick([20, 25, 40, 50]);

		const litCount = (totalBooks * pctLit) / 100;
		const transCount = (litCount * pctTranslated) / 100;
		const pctTransOfTotal = roundTo((pctLit * pctTranslated) / 100, 2);

		const dictPrice0 = difficulty === 'easy' ? rng.pick([1000, 1200, 2000]) : rng.pick([1400, 1600, 1800, 2400]);
		const discPct = difficulty === 'easy' ? rng.pick([10, 20, 25]) : rng.pick([15, 20, 25, 30]);
		const dictPriceFinal = (dictPrice0 * (100 - discPct)) / 100;

		const v0 = rng.pick([200, 250, 400, 500]);
		const growthPct = rng.pick([12, 15, 20, 25, 30]);
		const v1 = (v0 * (100 + growthPct)) / 100;
		const absVar = v1 - v0;

		const askTranslatedPct = difficulty === 'hard';
		const quizAns = askTranslatedPct ? pctTransOfTotal : dictPriceFinal;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تضم مكتبة بلدية $${totalBooks}$ كتاباً، من بينها $${litCount}$ كتاباً في الأدب واللغات الأجنبية، كما أن $${pctTranslated}%$ من كتب الأدب واللغات هي مؤلفات مترجمة.`,
			content: [
				{
					type: 'text',
					content: `1) احسب النسبة المئوية لكتب الأدب واللغات الأجنبية بالنسبة إلى مجموع كتب المكتبة.`,
					answer: `1) نسبة كتب الأدب واللغات هي: $frac(${litCount}, ${totalBooks}) times 100% = ${pctLit}%$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) استنتج النسبة المئوية للمؤلفات المترجمة من مجموع كتب المكتبة، ثم احسب عددها.`,
					answer: `2) نسبة النسبة المئوية هي: $frac(${pctLit}, 100) times frac(${pctTranslated}, 100) = ${roundTo(pctTransOfTotal / 100, 4)} = ${pctTransOfTotal}%$.\nعدد المؤلفات المترجمة هو: $${totalBooks} times frac(${pctTransOfTotal}, 100) = ${transCount}$ كتاباً.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) بمناسبة المعرض الثقافي للكتاب، عُرض قاموس لغوي سعره الأصلي $${dictPrice0}$ دج بتخفيض قدره $${discPct}%$. احسب سعره الجديد بعد التخفيض.`,
					answer: `3) السعر الجديد بعد التخفيض هو: $${dictPrice0} times (1 - frac(${discPct}, 100)) = ${dictPrice0} times ${roundTo(1 - discPct / 100, 2)} = ${dictPriceFinal}$ دج.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) ارتفع عدد زوار المكتبة الشهري من $${v0}$ قارئاً إلى $${v1}$ قارئاً. احسب التغير المطلق ثم النسبة المئوية للزيادة.`,
					answer: `4) التغير المطلق: $Delta v = ${v1} - ${v0} = +${absVar}$ قارئاً.\nالنسبة المئوية للزيادة: $frac(${v1} - ${v0}, ${v0}) times 100% = frac(${absVar}, ${v0}) times 100% = +${growthPct}%$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askTranslatedPct
					? `في مكتبة تضم $${totalBooks}$ كتاباً، تمثل كتب الأدب نسبة $${pctLit}\\%$ من مجموع الكتب، وتمثل الكتب المترجمة نسبة $${pctTranslated}\\%$ من كتب الأدب. ما هي النسبة المئوية للكتب المترجمة من مجموع كتب المكتبة (بالمائة)؟`
					: `يبلغ السعر الأصلي لقاموس لغوي $${dictPrice0}$ دج. بمناسبة معرض الكتاب، خُفّض سعره بنسبة $${discPct}\\%$. احسب السعر الجديد للقاموس بالدينار الجزائري:`,
				questionTextAr: askTranslatedPct
					? `احسب النسبة المئوية للكتب المترجمة من المجموع الكلي:`
					: `احسب السعر الجديد بعد التخفيض:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askTranslatedPct ? `p = ? %` : `y = ? DA`,
					variables: [],
					tolerance: 0.01
				},
				explanation: askTranslatedPct
					? `نضرب النسبتين: $\\frac{${pctLit}}{100} \\times \\frac{${pctTranslated}}{100} = ${roundTo(pctTransOfTotal / 100, 4)} = ${pctTransOfTotal}\\%$.`
					: `السعر بعد التخفيض هو $${dictPrice0} \\times \\left(1 - \\frac{${discPct}}{100}\\right) = ${dictPriceFinal}$ دج.`
			},
			sujetExercise,
			hints: [
				'نسبة الجزء إلى الكل تُعطى بالعلاقة $\\frac{\\text{الجزء}}{\\text{الكل}} \\times 100\\%$.',
				'لحساب نسبة مئوية $t_2\\%$ من نسبة $t_1\\%$، نضرب النسبتين: $\\frac{t_1}{100} \\times \\frac{t_2}{100}$.',
				'تخفيض مقدار $x$ بنسبة $t\\%$ يعطي $x \\times \\left(1 - \\frac{t}{100}\\right)$.'
			],
			solutionStepsAr: [
				`نسبة كتب الأدب واللغات هي $\\frac{${litCount}}{${totalBooks}} \\times 100\\% = ${pctLit}\\%$.`,
				`نسبة المؤلفات المترجمة في المكتبة هي ${pctLit}\\% \\times ${pctTranslated}\\% = ${pctTransOfTotal}\\%$، أي ${transCount} كتاباً.`,
				`السعر الجديد للقاموس بعد تخفيض $${discPct}\\%$ هو $${dictPriceFinal}$ دج.`,
				`النسبة المئوية لزيادة القراء هي $\\frac{${absVar}}{${v0}} \\times 100\\% = +${growthPct}\\%$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Multiplicative Coefficients, Successive Evolutions & Reverse Value
// ═══════════════════════════════════════════════════════════════════════════════

const tplSuccessiveReverseCoef: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_successive_reverse_coef',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'المعاملات الضربية، التطورات المتعاقبة والرجوع للقيمة الأصلية',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_multiplicative_coefficients_evolution',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface EvolPair {
			t1: number;
			t2: number;
		}
		const pairs: EvolPair[] =
			difficulty === 'easy'
				? [
						{ t1: 20, t2: -10 },
						{ t1: 10, t2: 20 },
						{ t1: -20, t2: 10 }
					]
				: difficulty === 'medium'
					? [
							{ t1: 25, t2: -20 },
							{ t1: 20, t2: -20 },
							{ t1: 15, t2: 20 },
							{ t1: -10, t2: -20 }
						]
					: [
							{ t1: 30, t2: -20 },
							{ t1: 25, t2: -12 },
							{ t1: -15, t2: 20 },
							{ t1: 40, t2: -25 }
						];

		const pair = rng.pick(pairs);
		const k1 = roundTo(1 + pair.t1 / 100, 2);
		const k2 = roundTo(1 + pair.t2 / 100, 2);
		const kGlobal = roundTo(k1 * k2, 4);
		const globalPct = roundTo((kGlobal - 1) * 100, 2);

		const y0 = rng.pick([1000, 2000, 2500, 4000, 5000]);
		const y1 = roundTo(y0 * k1, 2);
		const y2 = roundTo(y0 * kGlobal, 2);

		// Clean reciprocal step (exact terminating decimals)
		const recipCfg = rng.pick([
			{ t: 25, k: 1.25, kInv: 0.8, tInv: -20, yFinal: 1500 },
			{ t: -20, k: 0.8, kInv: 1.25, tInv: 25, yFinal: 1600 },
			{ t: 60, k: 1.6, kInv: 0.625, tInv: -37.5, yFinal: 2400 },
			{ t: -50, k: 0.5, kInv: 2, tInv: 100, yFinal: 1200 }
		]);
		const yOrigRecip = roundTo(recipCfg.yFinal / recipCfg.k, 2);

		const t1Desc = pair.t1 > 0 ? `زيادة بنسبة $${pair.t1}%$` : `تخفيض بنسبة $${Math.abs(pair.t1)}%$`;
		const t2Desc = pair.t2 > 0 ? `زيادة بنسبة $${pair.t2}%$` : `تخفيض بنسبة $${Math.abs(pair.t2)}%$`;
		const tRecipDesc =
			recipCfg.t > 0 ? `زيادة بنسبة $${recipCfg.t}%$` : `تخفيض بنسبة $${Math.abs(recipCfg.t)}%$`;
		const tInvDesc =
			recipCfg.tInv > 0 ? `زيادة بنسبة $${recipCfg.tInv}%$` : `تخفيض بنسبة $${Math.abs(recipCfg.tInv)}%$`;

		const askReverse = difficulty !== 'easy';
		const quizAns = askReverse ? yOrigRecip : globalPct;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتابع تاجر لوازم مدرسية أسعار منتجاته خلال الموسم الدراسي:`,
			content: [
				{
					type: 'text',
					content: `1) كان سعر رزمة الكراريس $${y0}$ دج. شهد السعر في مرحلة أولى ${t1Desc}، ثم في مرحلة ثانية ${t2Desc}.\nأ) عين المعاملين الضربيين $k_1$ و $k_2$ الموافقين لكل تطور.\nب) استنتج المعامل الضربي الإجمالي $K$ ثم النسبة المئوية للتطور الإجمالي، واحسب السعر النهائي للرزمة.`,
					answer: `1) أ) المعامل الضربي الأول: $k_1 = 1 ${pair.t1 >= 0 ? '+' : '-'} frac(${Math.abs(pair.t1)}, 100) = ${k1}$.\nالمعامل الضربي الثاني: $k_2 = 1 ${pair.t2 >= 0 ? '+' : '-'} frac(${Math.abs(pair.t2)}, 100) = ${k2}$.\nب) المعامل الإجمالي: $K = k_1 times k_2 = ${k1} times ${k2} = ${kGlobal}$.\nنسبة التطور الإجمالي: $(${kGlobal} - 1) times 100% = ${globalPct >= 0 ? `+${globalPct}` : globalPct}%$.\nالسعر النهائي: $y_2 = ${y0} times ${kGlobal} = ${y2}$ دج (بعد المرور بـ $y_1 = ${y1}$ دج).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) في رف آخر، بيع قاموس بمبلغ $${recipCfg.yFinal}$ دج بعد ${tRecipDesc}.\nأ) احسب السعر الأصلي للقاموس قبل هذا التطور.\nب) ما هي النسبة المئوية للتطور المعاكس اللازم للرجوع من السعر النهائي إلى السعر الأصلي؟`,
					answer: `2) أ) المعامل الضربي الموافق هو $k = ${recipCfg.k}$.\nالسعر الأصلي هو: $y_0 = frac(${recipCfg.yFinal}, ${recipCfg.k}) = ${yOrigRecip}$ دج.\nب) المعامل الضربي العكسي هو $k' = frac(1, ${recipCfg.k}) = ${recipCfg.kInv}$.\nومنه نسبة التطور المعاكس هي: $(${recipCfg.kInv} - 1) times 100% = ${recipCfg.tInv}%$، أي ${tInvDesc}.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askReverse
					? `بعد ${recipCfg.t > 0 ? `زيادة بنسبة $${recipCfg.t}\\%$` : `تخفيض بنسبة $${Math.abs(recipCfg.t)}\\%$`}, أصبح سعر قاموس لغوي $${recipCfg.yFinal}$ دج. احسب السعر الأصلي للقاموس قبل التغيير (بالدينار):`
					: `خضع سعر منتج لتطورين متعاقبين: ${pair.t1 > 0 ? `زيادة بنسبة $${pair.t1}\\%$` : `تخفيض بنسبة $${Math.abs(pair.t1)}\\%$`}, ثم ${pair.t2 > 0 ? `زيادة بنسبة $${pair.t2}\\%$` : `تخفيض بنسبة $${Math.abs(pair.t2)}\\%$`}. احسب النسبة المئوية للتطور الإجمالي (موجبة للزيادة وسالبة للتخفيض):`,
				questionTextAr: askReverse ? `احسب السعر الأصلي $y_0$:` : `احسب نسبة التطور الإجمالي:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askReverse ? `y_0 = ? DA` : `t = ? %`,
					variables: [],
					tolerance: 0.01
				},
				explanation: askReverse
					? `المعامل الضربي هو $k = ${recipCfg.k}$، إذن السعر الأصلي $y_0 = \\frac{${recipCfg.yFinal}}{${recipCfg.k}} = ${yOrigRecip}$ دج.`
					: `المعامل الضربي الإجمالي هو $K = ${k1} \\times ${k2} = ${kGlobal}$، ومنه نسبة التطور الإجمالي $(${kGlobal} - 1) \\times 100 = ${globalPct}\\%$.`
			},
			sujetExercise,
			hints: [
				'الزيادة بـ $t\\%$ توافق المعامل $k = 1 + \\frac{t}{100}$، والتخفيض بـ $t\\%$ يوافق $k = 1 - \\frac{t}{100}$.',
				'في التطورات المتعاقبة نضرب المعاملات الضربية: $K = k_1 \\times k_2$ ولا نجمع النسب.',
				'للرجوع من القيمة النهائية $y_1$ إلى الأصلية $y_0$ نقسم على المعامل: $y_0 = \\frac{y_1}{k}$.'
			],
			solutionStepsAr: [
				`تحديد المعاملين الضربيين $k_1 = ${k1}$ و $k_2 = ${k2}$ ثم الجداء $K = ${kGlobal}$.`,
				`استنتاج نسبة التطور الإجمالي $${globalPct}\\%$ والسعر النهائي $${y2}$ دج.`,
				`حساب السعر الأصلي للقاموس بالقسمة على المعامل: $y_0 = \\frac{${recipCfg.yFinal}}{${recipCfg.k}} = ${yOrigRecip}$ دج.`,
				`تعيين المعامل العكسي $k' = \\frac{1}{${recipCfg.k}} = ${recipCfg.kInv}$ واستنتاج النسبة العكسية $${recipCfg.tInv}\\%$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Economic Indices (Base 100) & Relative Change (100% Halal Production)
// ═══════════════════════════════════════════════════════════════════════════════

const tplEconomicIndex: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_economic_index',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'proportionality',
	titleAr: 'المؤشرات الاقتصادية: الرقم القياسي لمقدار ومعدل التطور النسبي',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_economic_indices_relative_change',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const ctx = rng.pick([
			{
				title: 'إنتاج التمور (دقلة نور) في تعاونية فلاحية بالوادي',
				unit: 'قنطار'
			},
			{
				title: 'إنتاج زيت الزيتون في معصرة تقليدية ببجاية',
				unit: 'هكتولتر'
			},
			{
				title: 'مبيعات دار نشر ثقافية من الكتب الأدبية',
				unit: 'ألف نسخة'
			}
		]);

		const baseVal = rng.pick([200, 400, 500, 800]);
		const stepPair = rng.pick([
			{ i1: 120, i2: 150, pct12: 25, i3: 114 },
			{ i1: 125, i2: 150, pct12: 20, i3: 95 },
			{ i1: 110, i2: 132, pct12: 20, i3: 121 },
			{ i1: 120, i2: 144, pct12: 20, i3: 108 },
			{ i1: 80, i2: 100, pct12: 25, i3: 112 }
		]);

		const x2021 = baseVal;
		const x2022 = (baseVal * stepPair.i1) / 100;
		const x2023 = (baseVal * stepPair.i2) / 100;
		const x2024 = (baseVal * stepPair.i3) / 100;

		const rel2024 = roundTo((stepPair.i3 - 100) / 100, 2);
		const pct2024 = stepPair.i3 - 100;

		const indexTable: TableBlock = {
			type: 'table',
			headers: ['السنة', '$2021$ (سنة الأساس)', '$2022$', '$2023$', '$2024$'],
			cells: [],
			rows: [
				[
					`الكمية (${ctx.unit})`,
					`$${x2021}$`,
					`$${x2022}$`,
					{ content: '...', answer: `$${x2023}$` },
					`$${x2024}$`
				],
				[
					'الرقم القياسي (أساس $100$)',
					'$100$',
					{ content: '...', answer: `$${stepPair.i1}$` },
					`$${stepPair.i2}$`,
					{ content: '...', answer: `$${stepPair.i3}$` }
				]
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		const askPct12 = difficulty !== 'easy';
		const quizAns = askPct12 ? stepPair.pct12 : stepPair.i1;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يمثل الجدول التالي تطور ${ctx.title} خلال الفترة من $2021$ إلى $2024$، حيث اختيرت سنة $2021$ كسنة أساس (الرقم القياسي $100$):`,
			content: [
				indexTable,
				{
					type: 'text',
					content: `1) احسب القيم الناقصة وأكمل الجدول (الرقم القياسي لسنتي $2022$ و $2024$، وكمية الإنتاج لسنة $2023$).`,
					answer: `1) إكمال الجدول:\n- الرقم القياسي لسنة $2022$: $I_(2022) = frac(${x2022}, ${x2021}) times 100 = ${stepPair.i1}$.\n- كمية سنة $2023$: $X_(2023) = ${x2021} times frac(${stepPair.i2}, 100) = ${x2023}$ ${ctx.unit}.\n- الرقم القياسي لسنة $2024$: $I_(2024) = frac(${x2024}, ${x2021}) times 100 = ${stepPair.i3}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب معدل التطور النسبي ثم النسبة المئوية للتطور بين سنتي $2021$ و $2024$.`,
					answer: `2) معدل التطور النسبي من $2021$ إلى $2024$: $e = frac(${stepPair.i3} - 100, 100) = ${rel2024}$.\nالنسبة المئوية للتطور هي: $${pct2024 >= 0 ? `+${pct2024}` : pct2024}%$ (${pct2024 >= 0 ? 'زيادة' : 'انخفاض'}).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب النسبة المئوية لتطور الكمية بين سنتي $2022$ و $2023$.`,
					answer: `3) بين $2022$ و $2023$: $k = frac(I_(2023), I_(2022)) = frac(${stepPair.i2}, ${stepPair.i1}) = ${roundTo(stepPair.i2 / stepPair.i1, 2)}$.\nإذن نسبة التطور هي: $frac(${stepPair.i2} - ${stepPair.i1}, ${stepPair.i1}) times 100% = +${stepPair.pct12}%$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askPct12
					? `في ${ctx.title} (سنة الأساس $2021$ بمؤشر $100$)، بلغ الرقم القياسي سنة $2022$ القيمة $I_{2022} = ${stepPair.i1}$، وبلغ سنة $2023$ القيمة $I_{2023} = ${stepPair.i2}$. احسب النسبة المئوية للتطور بين سنتي $2022$ و $2023$:`
					: `في ${ctx.title}، كانت الكمية في سنة الأساس $2021$ تساوي $${x2021}$ ${ctx.unit} (المؤشر $100$)، وأصبحت سنة $2022$ تساوي $${x2022}$ ${ctx.unit}. احسب الرقم القياسي لسنة $2022$:`,
				questionTextAr: askPct12
					? `احسب النسبة المئوية للتطور بين $2022$ و $2023$:`
					: `احسب الرقم القياسي لسنة $2022$:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askPct12 ? `t = ? %` : `I_{2022} = ?`,
					variables: [],
					tolerance: 0.01
				},
				explanation: askPct12
					? `نسبة التطور بين $2022$ و $2023$ هي $\\frac{${stepPair.i2} - ${stepPair.i1}}{${stepPair.i1}} \\times 100 = +${stepPair.pct12}\\%$.`
					: `الرقم القياسي يُحسب بالقانون $I_{2022} = \\frac{${x2022}}{${x2021}} \\times 100 = ${stepPair.i1}$.`
			},
			sujetExercise,
			hints: [
				'الرقم القياسي بالأساس $100$ في السنة $n$ هو $I_n = \\frac{X_n}{X_0} \\times 100$.',
				'معدل التطور النسبي من سنة الأساس هو $e = \\frac{I_n - 100}{100}$، أي $(I_n - 100)\\%$.',
				'لحساب التطور بين سنتين غير أساسيتين $t_1$ و $t_2$ نستعمل $\\frac{I_2 - I_1}{I_1} \\times 100\\%$.'
			],
			solutionStepsAr: [
				`حساب المؤشرات $I_{2022} = ${stepPair.i1}$ و $I_{2024} = ${stepPair.i3}$ وكمية $X_{2023} = ${x2023}$.`,
				`حساب معدل التطور النسبي من $2021$ إلى $2024$ وهو ${rel2024}$ (${pct2024}\\%$).`,
				`حساب التطور بين $2022$ و $2023$: $\\frac{${stepPair.i2} - ${stepPair.i1}}{${stepPair.i1}} \\times 100 = +${stepPair.pct12}\\%$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Descriptive Statistics: Mean, Variance, Standard Deviation & Linearity
// ═══════════════════════════════════════════════════════════════════════════════

const tplVarianceStdSeries: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_variance_std_series',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الإحصاء الوصفي: الوسط الحسابي، التباين، الانحراف المعياري والخطية',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_descriptive_stats_variance_std',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Symmetric weighted series around integer mean m -> guaranteed exact mean and variance!
		const m = rng.pick([10, 11, 12, 13]);
		const d1 = rng.pick([1, 2]);
		const d2 = d1 + rng.pick([2, 3]);
		const xs = [m - d2, m - d1, m, m + d1, m + d2];

		const freqs =
			difficulty === 'easy'
				? rng.pick([
						[1, 2, 4, 2, 1], // N = 10
						[1, 3, 2, 3, 1]  // N = 10
					])
				: rng.pick([
						[2, 4, 8, 4, 2], // N = 20
						[2, 5, 6, 5, 2], // N = 20
						[3, 4, 6, 4, 3]  // N = 20
					]);

		const totalN = freqs.reduce((s, v) => s + v, 0);
		const sumNix = xs.reduce((s, x, i) => s + x * freqs[i], 0);
		const sumNix2 = xs.reduce((s, x, i) => s + x * x * freqs[i], 0);
		const meanX = sumNix / totalN; // exact = m
		const varianceV = roundTo(sumNix2 / totalN - meanX * meanX, 2);
		const stdSigma = roundTo(Math.sqrt(varianceV), 2);

		// Affine transformation y_i = a*x_i + b
		const aScale = difficulty === 'hard' ? 1.5 : 2;
		const bShift = rng.pick([1, 2, -1]);
		const meanY = roundTo(aScale * meanX + bShift, 2);
		const varianceY = roundTo(aScale * aScale * varianceV, 2);
		const stdY = roundTo(Math.abs(aScale) * stdSigma, 2);

		const statsTable: TableBlock = {
			type: 'table',
			headers: ['العلامة $x_i$', ...xs.map((v) => `$${v}$`)],
			cells: ['التكرار $n_i$', ...freqs.map((n) => `$${n}$`)],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		const askTransformedMean = difficulty === 'hard';
		const quizAns = askTransformedMean ? varianceY : varianceV;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تحصل تلاميذ قسم السنة الثانية آداب وفلسفة في فرض اللغة العربية على العلامات الموضحة في الجدول التالي (التكرار الكلي $N = ${totalN}$):`,
			content: [
				statsTable,
				{
					type: 'text',
					content: `1) احسب الوسط الحسابي $bar(x)$ لعلامات هذا القسم.`,
					answer: `1) $bar(x) = frac(1, ${totalN}) sum_(i=1)^5 n_i x_i = frac(${xs.map((x, i) => `${freqs[i]} times ${x}`).join(' + ')}, ${totalN}) = frac(${sumNix}, ${totalN}) = ${meanX}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) احسب التباين $V$ ثم استنتج الانحراف المعياري $sigma$ (مقرباً إلى $0.01$).`,
					answer: `2) نحسب $sum_(i=1)^5 n_i x_i^2 = ${xs.map((x, i) => `${freqs[i]} times ${x}^2`).join(' + ')} = ${sumNix2}$.\nالتباين بصيغة النشر:\n$V = frac(${sumNix2}, ${totalN}) - (${meanX})^2 = ${roundTo(sumNix2 / totalN, 2)} - ${meanX * meanX} = ${varianceV}$.\nالانحراف المعياري: $sigma = sqrt(${varianceV}) approx ${stdSigma}$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) قرر الأستاذ تعديل العلامات بتطبيق التحويل $y_i = ${aScale} x_i ${bShift >= 0 ? `+ ${bShift}` : `- ${Math.abs(bShift)}`}$.\nاستنتج دون إعادة حساب الجدول كلاًّ من الوسط الحسابي الجديد $bar(y)$، التباين الجديد $V_y$، والانحراف المعياري الجديد $sigma_y$.`,
					answer: `3) بتطبيق خواص الخطية:\n- $bar(y) = ${aScale} bar(x) ${bShift >= 0 ? `+ ${bShift}` : `- ${Math.abs(bShift)}`} = ${aScale}(${meanX}) ${bShift >= 0 ? `+ ${bShift}` : `- ${Math.abs(bShift)}`} = ${meanY}$.\n- $V_y = (${aScale})^2 times V = ${aScale * aScale} times ${varianceV} = ${varianceY}$.\n- $sigma_y = |${aScale}| times sigma approx ${aScale} times ${stdSigma} = ${stdY}$.`,
					mark: '1.75'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askTransformedMean
					? `سلسلة إحصائية وسطها الحسابي $\\bar{x} = ${meanX}$ وتباينها $V_x = ${varianceV}$. إذا حولنا كل قيمة وفق العلاقة $y_i = ${aScale}x_i ${bShift >= 0 ? `+ ${bShift}` : `- ${Math.abs(bShift)}`}$، احسب التباين الجديد $V_y$:`
					: `لتكن السلسلة الإحصائية التالية ($N = ${totalN}$): القيم $\\{${xs.join(' ; ')}\\}$ بالتكرارات $\\{${freqs.join(' ; ')}\\}$ على الترتيب. علماً أن وسطها الحسابي $\\bar{x} = ${meanX}$، احسب التباين $V$:`,
				questionTextAr: askTransformedMean ? `احسب التباين الجديد $V_y$:` : `احسب التباين $V$:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askTransformedMean ? `V_y = ?` : `V = ?`,
					variables: [],
					tolerance: 0.02
				},
				explanation: askTransformedMean
					? `بخاصية الخطية، $V_y = a^2 V_x = (${aScale})^2 \\times ${varianceV} = ${varianceY}$.`
					: `التباين هو $V = \\frac{${sumNix2}}{${totalN}} - (${meanX})^2 = ${varianceV}$.`
			},
			sujetExercise,
			hints: [
				'الوسط الحسابي هو $\\bar{x} = \\frac{\\sum n_i x_i}{N}$.',
				'صيغة التباين الأسهل هي $V = \\frac{\\sum n_i x_i^2}{N} - \\bar{x}^2$.',
				'عند التحويل $y_i = a x_i + b$: يتغير الوسط بـ $a\\bar{x}+b$، بينما التباين يصبح $a^2 V_x$.'
			],
			solutionStepsAr: [
				`حساب الوسط الحسابي $\\bar{x} = \\frac{${sumNix}}{${totalN}} = ${meanX}$.`,
				`حساب مجموع المربعات $\\sum n_i x_i^2 = ${sumNix2}$ ثم التباين $V = ${varianceV}$ والانحراف المعياري $\\sigma \\approx ${stdSigma}$.`,
				`تطبيق الخطية: $\\bar{y} = ${meanY}$ و $V_y = ${varianceY}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Quartiles Q1, Q3, Interquartile Range & Box Plot
// ═══════════════════════════════════════════════════════════════════════════════

const tplQuartilesBoxplot: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_quartiles_boxplot',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الربيعيات Q1 و Q3 والانحراف الربيعي والمخطط بالعلبة',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_quartiles_iqr_boxplot',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Choose N = 12 (Q1 = index 2 (3rd), Q3 = index 8 (9th)) or N = 16 (Q1 = index 3 (4th), Q3 = index 11 (12th))
		const use16 = difficulty === 'hard';
		const len = use16 ? 16 : 12;
		const base = rng.pick([3, 4, 5, 6]);
		const sorted: number[] = [];
		let cur = base;
		for (let i = 0; i < len; i++) {
			cur += i === 0 ? 0 : rng.pick([1, 1, 2]);
			sorted.push(cur);
		}
		// Ensure middle two elements have same parity for clean integer or .5 median
		const mid1 = sorted[len / 2 - 1];
		const mid2 = sorted[len / 2];
		const me = roundTo((mid1 + mid2) / 2, 1);
		const q1 = sorted[len / 4 - 1];
		const q3 = sorted[(3 * len) / 4 - 1];
		const xMin = sorted[0];
		const xMax = sorted[len - 1];
		const iqr = q3 - q1;
		const range = xMax - xMin;

		const shuffled = rng.shuffle(sorted);

		const boxSvg = buildSingleBoxPlotSvg({
			title: `المخطط بالعلبة للسلسلة (N = ${len})`,
			xMin,
			q1,
			me,
			q3,
			xMax
		});
		const boxUrl = saveSvgAsset(`2as_shared_lit_t1_boxplot_${difficulty}_s${seed}`, boxSvg);

		const mcq = buildUniqueMcqOptions(
			`$${iqr}$`,
			[
				{ text: `$${range}$`, diagnosticFeedback: `القيمة $${range}$ هي المدى ($x_{\\max} - x_{\\min}$) وليست الانحراف الربيعي.` },
				{ text: `$${q3 - me}$`, diagnosticFeedback: `طرحت الوسيط $M_e$ من $Q_3$ بدلاً من $Q_1$.` },
				{ text: `$${me - q1}$`, diagnosticFeedback: `طرحت $Q_1$ من الوسيط $M_e$ بدلاً من طرحه من $Q_3$.` }
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `سجّل أستاذ اللغات الأجنبية علامات $${len}$ تلميذاً في اختبار التعبير الكتابي (من $20$) فكانت كالتالي:\n$${shuffled.join(' , ')}$`,
			content: [
				{
					type: 'text',
					content: `1) رتّب هذه العلامات ترتيباً تصاعدياً، ثم عين أصغر قيمة $x_min$ وأكبر قيمة $x_max$ واحسب المدى $E$.`,
					answer: `1) الترتيب التصاعدي:\n$${sorted.join(' <= ')}$\nالقيمة الصغرى: $x_min = ${xMin}$، القيمة الكبرى: $x_max = ${xMax}$.\nالمدى: $E = ${xMax} - ${xMin} = ${range}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) عين قيمة الوسيط $M_e$، والربيع الأول $Q_1$، والربيع الثالث $Q_3$ لهذه السلسلة.`,
					answer: `2) بما أن $N = ${len}$:\n- الوسيط $M_e$ هو معدل القيمتين ذواتي الرتبتين $${len / 2}$ و $${len / 2 + 1}$: $M_e = frac(${mid1} + ${mid2}, 2) = ${me}$.\n- رتبة $Q_1$ هي $frac(${len}, 4) = ${len / 4}$، ومنه $Q_1 = ${q1}$.\n- رتبة $Q_3$ هي $frac(3 times ${len}, 4) = ${(3 * len) / 4}$، ومنه $Q_3 = ${q3}$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) احسب الانحراف الربيعي $Q_3 - Q_1$، ثم أنشئ المخطط بالعلبة لهذه السلسلة.`,
					answer: `3) الانحراف الربيعي: $Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$.\nالمخطط بالعلبة يلخص الخماسية $(${xMin}, ${q1}, ${me}, ${q3}, ${xMax})$ كما هو مبين في الشكل أدناه.`,
					mark: '1.75'
				},
				{
					type: 'image',
					src: boxUrl,
					caption: 'المخطط بالعلبة للعلامات المرتبة'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المخطط بالعلبة المرفق لعلامات $${len}$ تلميذاً ($Q_1 = ${q1}$، $M_e = ${me}$، $Q_3 = ${q3}$)، ما هي قيمة الانحراف الربيعي $Q_3 - Q_1$؟`,
				questionTextAr: `عيّن قيمة الانحراف الربيعي $Q_3 - Q_1$:`,
				imageUrl: boxUrl,
				imageCaption: 'المخطط بالعلبة للسلسلة الإحصائية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `الترتيب التصاعدي يعطي $Q_1 = ${q1}$ و $Q_3 = ${q3}$، ومنه الانحراف الربيعي $Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}$.`
			},
			sujetExercise,
			hints: [
				'رتب القيم تصاعدياً أولاً قبل تعيين أي معلم من معالم الموقع.',
				`رتبة $Q_1$ هي $\\frac{N}{4}$ ورتبة $Q_3$ هي $\\frac{3N}{4}$.`,
				'الانحراف الربيعي هو $Q_3 - Q_1$، بينما المدى هو $x_{\\max} - x_{\\min}$.'
			],
			solutionStepsAr: [
				`ترتيب القيم الـ $${len}$ تصاعدياً واستنتاج المدى $E = ${range}$.`,
				`تعيين الوسيط $M_e = ${me}$ والربيع الأول $Q_1 = ${q1}$ والربيع الثالث $Q_3 = ${q3}$.`,
				`حساب الانحراف الربيعي $Q_3 - Q_1 = ${iqr}$ ورسم المخطط بالعلبة.`
			],
			finalAnswer: `${iqr}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Synthesis Problem (Economic Indices + Statistical Comparison)
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemStatsIndices: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t1_problem_stats_indices',
	grade: '2as_lp',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: المؤشرات الاقتصادية، المعاملات الضربية والمقارنة الإحصائية',
	curriculumLessonId: 'lesson_2as_shared_lit_t1_economic_indices_relative_change',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Halal Cultural Cooperative Book Production (Base 100 in 2021)
		const q0 = rng.pick([400, 500, 600, 800]);
		const cfg = rng.pick([
			{ pct1: 20, pct2: 25, i1: 120, i2: 150, i3: 135 },
			{ pct1: 25, pct2: 20, i1: 125, i2: 150, i3: 120 },
			{ pct1: 10, pct2: 20, i1: 110, i2: 132, i3: 110 }
		]);
		const k1 = roundTo(1 + cfg.pct1 / 100, 2);
		const k2 = roundTo(1 + cfg.pct2 / 100, 2);
		const kGlobal = roundTo(k1 * k2, 4);
		const q2022 = (q0 * cfg.i1) / 100;
		const q2023 = (q0 * cfg.i2) / 100;
		const pctDrop23to24 = roundTo(((cfg.i3 - cfg.i2) / cfg.i2) * 100, 2);

		const discCfg = rng.pick([
			{ tDisc: 20, kDisc: 0.8, priceFinal: 1200, priceOrig: 1500 },
			{ tDisc: 25, kDisc: 0.75, priceFinal: 1500, priceOrig: 2000 },
			{ tDisc: 15, kDisc: 0.85, priceFinal: 1700, priceOrig: 2000 }
		]);

		// Part 2: Statistical comparison between Section A & Section B
		const mA = rng.pick([11, 12, 13]);
		const xsA = [mA - 4, mA - 2, mA, mA + 2, mA + 4];
		const freqsA = [1, 2, 4, 2, 1]; // N = 10
		const sumSqA = xsA.reduce((s, x, i) => s + x * x * freqsA[i], 0);
		const varA = roundTo(sumSqA / 10 - mA * mA, 2); // = (16 + 8 + 0 + 8 + 16)/10 = 4.8
		const stdA = roundTo(Math.sqrt(varA), 2);

		// Boxplots for Section A and Section B
		const a5: [number, number, number, number, number] = [mA - 5, mA - 2, mA, mA + 2, mA + 5];
		const b5: [number, number, number, number, number] = [mA - 2, mA - 1, mA + 1, mA + 2, mA + 4];
		const iqrA = a5[3] - a5[1]; // 4
		const iqrB = b5[3] - b5[1]; // 3

		const dualSvg = buildDualBoxPlotSvg({
			labelA: 'أ',
			a: a5,
			labelB: 'ب',
			b: b5
		});
		const dualUrl = saveSvgAsset(`2as_shared_lit_t1_prob_boxplot_${difficulty}_s${seed}`, dualSvg);

		const part1Table: TableBlock = {
			type: 'table',
			headers: ['السنة', '$2021$ (الأساس)', '$2022$', '$2023$', '$2024$'],
			cells: [],
			rows: [
				['مبيعات الكتب (نسخة)', `$${q0}$`, `$${q2022}$`, { content: '...', answer: `$${q2023}$` }, `${(q0 * cfg.i3) / 100}`],
				['الرقم القياسي (أساس $100$)', '$100$', `$${cfg.i1}$`, { content: '...', answer: `$${cfg.i2}$` }, `$${cfg.i3}$`]
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		const part2Table: TableBlock = {
			type: 'table',
			headers: ['العلامة $x_i$', ...xsA.map((v) => `$${v}$`)],
			cells: ['التكرار $n_i$', ...freqsA.map((n) => `$${n}$`)],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الشاملة',
			instruction: `تشرف تعاونية ثقافية على طباعة وتوزيع الكتب الأدبية في إطار مشروعها الإنتاجي ومتابعة نتائج تلاميذ قسمي الآداب واللغات.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: المؤشرات الاقتصادية والمعاملات الضربية (3.5 نقاط)*\n\nارتفعت مبيعات التعاونية من سنة $2021$ إلى $2022$ بنسبة $${cfg.pct1}%$، ثم ارتفعت من $2022$ إلى $2023$ بنسبة $${cfg.pct2}%$.`,
					answer: `تقديم معطيات الجزء الأول: سنة الأساس $2021$ بمؤشر $100$ وكمية ابتدائية $${q0}$ نسخة.`,
					mark: '0.5'
				},
				part1Table,
				{
					type: 'text',
					content: `1) احسب المعامل الضربي الإجمالي بين سنتي $2021$ و $2023$، واستنتج الرقم القياسي لسنة $2023$ وكمية المبيعات في تلك السنة.\n2) احسب النسبة المئوية لتطور المبيعات بين سنتي $2023$ و $2024$.\n3) باعت التعاونية موسوعة أدبية بسعر $${discCfg.priceFinal}$ دج بعد تخفيض بنسبة $${discCfg.tDisc}%$. ما كان السعر الأصلي للموسوعة؟`,
					answer: `1) المعاملان الضربيان هما $k_1 = ${k1}$ و $k_2 = ${k2}$، ومنه المعامل الإجمالي $K = ${k1} times ${k2} = ${kGlobal}$.\nالرقم القياسي لسنة $2023$ هو $I_(2023) = 100 times ${kGlobal} = ${cfg.i2}$، وكمية المبيعات هي $${q0} times ${kGlobal} = ${q2023}$ نسخة.\n2) التطور بين $2023$ و $2024$: $frac(${cfg.i3} - ${cfg.i2}, ${cfg.i2}) times 100% = ${pctDrop23to24}%$ (انخفاض).\n3) المعامل الضربي للتخفيض هو $k = ${discCfg.kDisc}$، ومنه السعر الأصلي $y_0 = frac(${discCfg.priceFinal}, ${discCfg.kDisc}) = ${discCfg.priceOrig}$ دج.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: الدراسة الإحصائية والمقارنة بين قسمين (3.5 نقاط)*\n\nالجدول التالي يمثل علامات $10$ تلاميذ في القسم (أ) في مادة الأدب:`,
					answer: `تقديم سلسلة القسم (أ) المكونة من $10$ تلاميذ.`,
					mark: '0.5'
				},
				part2Table,
				{
					type: 'text',
					content: `1) احسب الوسط الحسابي $bar(x)_A$ والتباين $V_A$ والانحراف المعياري $sigma_A$ لعلامات القسم (أ).\n2) يوضح الشكل المرفق المخططين بالعلبة للقسم (أ) والقسم (ب). احسب الانحراف الربيعي لكل قسم، ثم فسر أي القسمين أكثر تجانساً وأفضل مستوى.`,
					answer: `1) $bar(x)_A = frac(${xsA.map((x, i) => `${freqsA[i]} times ${x}`).join(' + ')}, 10) = ${mA}$.\nالتباين: $V_A = frac(${sumSqA}, 10) - (${mA})^2 = ${varA}$، والانحراف المعياري $sigma_A = sqrt(${varA}) approx ${stdA}$.\n2) من المخطط بالعلبة:\n- القسم (أ): $Q_1 = ${a5[1]}$, $M_e = ${a5[2]}$, $Q_3 = ${a5[3]} arrow.r.double$ الانحراف الربيعي $= ${iqrA}$.\n- القسم (ب): $Q_1 = ${b5[1]}$, $M_e = ${b5[2]}$, $Q_3 = ${b5[3]} arrow.r.double$ الانحراف الربيعي $= ${iqrB}$.\nبما أن وسيط القسم (ب) أكبر ($${b5[2]} > ${a5[2]}$) وانحرافه الربيعي أصغر ($${iqrB} < ${iqrA}$)، فإن القسم (ب) أفضل مستوى وأكثر تجانساً.`,
					mark: '3'
				},
				{
					type: 'image',
					src: dualUrl,
					caption: 'المخطط بالعلبة المقارن بين القسمين أ وب'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المسألة الشاملة، ارتفعت مبيعات دار نشر سنة $2022$ بنسبة $${cfg.pct1}\\%$ (مقارنة بـ $2021$ ذات الأساس $100$) ثم ارتفعت سنة $2023$ بنسبة $${cfg.pct2}\\%$ (مقارنة بـ $2022$). احسب الرقم القياسي لسنة $2023$ بالأساس $100$ سنة $2021$:`,
				questionTextAr: `احسب الرقم القياسي لسنة $2023$:`,
				imageUrl: dualUrl,
				imageCaption: 'المخطط بالعلبة المقارن في الجزء الثاني من المسألة',
				questionData: {
					answer: cfg.i2,
					displayTemplate: `I_{2023} = ?`,
					variables: [],
					tolerance: 0.01
				},
				explanation: `المعامل الضربي الإجمالي هو $K = ${k1} \\times ${k2} = ${kGlobal}$، ومنه الرقم القياسي $I_{2023} = 100 \\times ${kGlobal} = ${cfg.i2}$.`
			},
			sujetExercise,
			hints: [
				'في التطورات المتعاقبة نضرب المعاملات الضربية $K = k_1 \\times k_2$، ثم الرقم القياسي هو $100 \\times K$.',
				'لإيجاد السعر قبل التخفيض نقسم على المعامل الضربي $(1 - t/100)$.',
				'في المقارنة بالمخطط بالعلبة، الوسيط الأكبر يدل على مستوى أعلى، والانحراف الربيعي الأصغر يدل على تجانس أكبر.'
			],
			solutionStepsAr: [
				`حساب المعامل الإجمالي $K = ${kGlobal}$ واستنتاج $I_{2023} = ${cfg.i2}$.`,
				`استنتاج النسبة المئوية للتطور بين $2023$ و $2024$ وهي ${pctDrop23to24}\\%$.`,
				`الرجوع للسعر الأصلي للموسوعة: $${discCfg.priceOrig}$ دج.`,
				`حساب $\\bar{x}_A = ${mA}$ و $V_A = ${varA}$ ومقارنة القسمين بالمخطط بالعلبة.`
			],
			finalAnswer: `${cfg.i2}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates — 2AS Literary Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_LIT_T1: ParameterizedTemplate[] = [
	tplPercentageEvolution,
	tplSuccessiveReverseCoef,
	tplEconomicIndex,
	tplVarianceStdSeries,
	tplQuartilesBoxplot,
	tplProblemStatsIndices
];
