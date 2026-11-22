import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgProbabilityTree,
	svgVariationTable
} from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters, Local Statistics SVG & Verifiers — 3AS GE (BAC) T3
// Western digits 0-9 only; 100% Halal economic contexts.
// ═══════════════════════════════════════════════════════════════════════════════

function fracKatex(n: number, d: number): string {
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(n: number, d: number): string {
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

function linearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function assertCentralDiff(
	fn: (x: number) => number,
	deriv: (x: number) => number,
	xs: number[],
	label: string
): void {
	const h = 1e-5;
	for (const x of xs) {
		const approx = (fn(x + h) - fn(x - h)) / (2 * h);
		const exact = deriv(x);
		if (!Number.isFinite(approx) || !Number.isFinite(exact) || Math.abs(approx - exact) > 1e-4) {
			throw new Error(`Derivative mismatch (${label}) at x=${x}: approx=${approx}, exact=${exact}`);
		}
	}
}

function simpsonIntegral(fn: (x: number) => number, a: number, b: number, n = 120): number {
	const h = (b - a) / n;
	let sum = fn(a) + fn(b);
	for (let i = 1; i < n; i++) {
		sum += (i % 2 === 0 ? 2 : 4) * fn(a + i * h);
	}
	return (sum * h) / 3;
}

/** Local bivariate scatter + least-squares line + mean point G SVG helper */
function svgScatterRegressionPlot(opts: {
	xs: number[];
	ys: number[];
	a: number;
	b: number;
	xMean: number;
	yMean: number;
	xLabel?: string;
	yLabel?: string;
	eqLabel?: string;
}): string {
	const w = 340;
	const h = 235;
	const padL = 42;
	const padR = 20;
	const padT = 22;
	const padB = 34;
	const plotW = w - padL - padR;
	const plotH = h - padT - padB;

	const xMin = Math.min(0, Math.min(...opts.xs) - 1);
	const xMax = Math.max(...opts.xs) + 1.5;
	const minYData = Math.min(...opts.ys, opts.a * xMin + opts.b);
	const maxYData = Math.max(...opts.ys, opts.a * xMax + opts.b);
	const yPad = Math.max(2, (maxYData - minYData) * 0.15);
	const yMin = Math.floor(minYData - yPad);
	const yMax = Math.ceil(maxYData + yPad);

	const toPxX = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
	const toPxY = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;

	const parts: string[] = [];
	parts.push(
		`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>`
	);

	// Light grid lines
	for (let k = 1; k <= 4; k++) {
		const gy = padT + (k / 5) * plotH;
		parts.push(
			`<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${padL + plotW}" y2="${gy.toFixed(1)}" stroke="#e2e8f0" stroke-width="0.8"/>`
		);
	}
	for (const xVal of opts.xs) {
		const px = toPxX(xVal);
		parts.push(
			`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="0.8"/>`
		);
		parts.push(
			`<text x="${px.toFixed(1)}" y="${h - padB + 14}" text-anchor="middle" font-size="9.5" fill="#475569">${xVal}</text>`
		);
	}

	// Regression line clipped to plot bounds
	const lx1 = xMin + 0.2;
	const lx2 = xMax - 0.2;
	const ly1 = opts.a * lx1 + opts.b;
	const ly2 = opts.a * lx2 + opts.b;
	parts.push(
		`<line x1="${toPxX(lx1).toFixed(1)}" y1="${toPxY(ly1).toFixed(1)}" x2="${toPxX(lx2).toFixed(1)}" y2="${toPxY(ly2).toFixed(1)}" stroke="#059669" stroke-width="2.2"/>`
	);

	// Scatter points M_i(x_i, y_i)
	for (let i = 0; i < opts.xs.length; i++) {
		const cx = toPxX(opts.xs[i]);
		const cy = toPxY(opts.ys[i]);
		parts.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4" fill="#1d4ed8" stroke="#ffffff" stroke-width="1"/>`);
	}

	// Mean point G(xBar, yBar)
	const gx = toPxX(opts.xMean);
	const gy = toPxY(opts.yMean);
	parts.push(
		`<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.2"/>`
	);
	parts.push(
		`<text x="${(gx + 7).toFixed(1)}" y="${(gy - 6).toFixed(1)}" font-size="11" font-weight="bold" fill="#dc2626">G(${opts.xMean};${roundTo(opts.yMean, 1)})</text>`
	);

	if (opts.eqLabel) {
		parts.push(
			`<text x="${padL + 8}" y="${padT + 15}" font-size="10.5" font-weight="bold" fill="#059669">${opts.eqLabel}</text>`
		);
	}
	if (opts.xLabel) {
		parts.push(
			`<text x="${padL + plotW / 2}" y="${h - 4}" text-anchor="middle" font-size="10" fill="#0f172a">${opts.xLabel}</text>`
		);
	}
	if (opts.yLabel) {
		parts.push(
			`<text x="${padL - 6}" y="${padT - 6}" text-anchor="start" font-size="10" font-weight="bold" fill="#0f172a">${opts.yLabel}</text>`
		);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="system-ui, -apple-system, sans-serif"><rect width="${w}" height="${h}" fill="#ffffff"/>${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Bivariate Statistics & Least-Squares Regression y = a x + b + Forecasting
// ═══════════════════════════════════════════════════════════════════════════════

const tplBivariateRegressionForecast: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_bivariate_regression_forecast',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الإحصاء ثنائي المتغير: النقطة المتوسطة ومستقيم الانحدار والتنبؤ بالإنتاج',
	curriculumLessonId: 'lesson_3as_ge_t3_bivariate_stats_mean_point',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Construct orthogonal perturbations around y = a(x - xBar) + yBar so V(X), Cov(X,Y), a, b are EXACT!
		// Easy & Medium: x = [1, 2, 3, 4, 5], xBar = 3, V(X) = 2, integer slope a
		// Hard: x = [2, 4, 6, 8, 10], xBar = 6, V(X) = 8, half-integer slope a in {1.5, 2.5, 3.5}
		const useHalfSlope = difficulty === 'hard';
		const xs = useHalfSlope ? [2, 4, 6, 8, 10] : [1, 2, 3, 4, 5];
		const xBar = useHalfSlope ? 6 : 3;
		const varX = useHalfSlope ? 8 : 2;
		const aTrue = useHalfSlope ? rng.pick([1.5, 2.5, 3.5]) : rng.int(2, 6);
		const yBarTrue = useHalfSlope ? rng.pick([30, 36, 42, 48]) : rng.int(18, 35);

		// Orthogonal basis on 5 centered points: v1 = [1, -2, 0, 2, -1], v2 = [2, -1, -2, -1, 2]
		const c1 = rng.pick([-1, 0, 1]);
		const c2 = rng.pick([-1, 1]);
		const v1 = [1, -2, 0, 2, -1];
		const v2 = [2, -1, -2, -1, 2];
		const ys = xs.map((x, idx) =>
			Math.round(yBarTrue + aTrue * (x - xBar) + c1 * v1[idx] + c2 * v2[idx])
		);

		const n = xs.length;
		const sumX = xs.reduce((s, v) => s + v, 0);
		const sumY = ys.reduce((s, v) => s + v, 0);
		const compXBar = sumX / n;
		const compYBar = sumY / n;
		const compVarX = xs.reduce((s, x) => s + (x - compXBar) ** 2, 0) / n;
		const compCovXY = xs.reduce((s, x, i) => s + (x - compXBar) * (ys[i] - compYBar), 0) / n;
		const aReg = compCovXY / compVarX;
		const bReg = compYBar - aReg * compXBar;

		if (
			Math.abs(compVarX - varX) > 1e-9 ||
			Math.abs(aReg - aTrue) > 1e-9 ||
			Math.abs(bReg - (yBarTrue - aTrue * xBar)) > 1e-9
		) {
			throw new Error(`Orthogonal regression invariant violated: a=${aReg} vs ${aTrue}`);
		}

		const forecastRank = useHalfSlope ? 14 : 8; // ensures aTrue * forecastRank is an integer!
		const forecastY = roundTo(aReg * forecastRank + bReg, 2);
		const thresholdTarget = Math.ceil(forecastY) + rng.int(3, 8);
		const thresholdRank = Math.floor((thresholdTarget - bReg) / aReg) + 1;

		const scatterSvg = svgScatterRegressionPlot({
			xs,
			ys,
			a: aReg,
			b: bReg,
			xMean: compXBar,
			yMean: compYBar,
			xLabel: 'الرتبة x_i',
			yLabel: 'الإنتاج y_i',
			eqLabel: `y = ${aReg}x ${bReg >= 0 ? `+ ${bReg}` : `- ${Math.abs(bReg)}`}`
		});
		const scatterUrl = saveSvgAsset(`3as_ge_t3_bivar_${difficulty}_s${seed}`, scatterSvg);

		const eqKatex = `y = ${linearKatex(aReg, bReg, 'x')}`;
		const eqTypst = `y = ${linearTypst(aReg, bReg, 'x')}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${aReg}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `سجّلت مؤسسة صناعية إنتاجها السنوي $y_i$ (بآلاف الأطنان) حسب الرتبة $x_i$: $x = [${xs.join(' ; ')}]$ و$y = [${ys.join(' ; ')}]$. احسب معامل توجيه مستقيم الانحدار $a = \\frac{\\operatorname{Cov}(X, Y)}{V(X)}$:`,
				questionTextAr: `احسب ميل مستقيم الانحدار $a$:`,
				imageUrl: scatterUrl,
				imageCaption: 'سحابة النقط والنقطة المتوسطة G ومستقيم الانحدار',
				questionData: {
					answer: aReg,
					displayTemplate: 'a = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نجد $\\bar{x} = ${compXBar}$ و$\\bar{y} = ${compYBar}$، ثم $V(X) = ${compVarX}$ و$\\operatorname{Cov}(X, Y) = ${compCovXY}$، ومنه $a = \\frac{${compCovXY}}{${compVarX}} = ${aReg}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${forecastY}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `انطلاقا من السلسلة الإحصائية $x = [${xs.join(' ; ')}]$ و$y = [${ys.join(' ; ')}]$ ومعادلة مستقيم الانحدار $y = ${linearKatex(aReg, bReg, 'x')}$، قدّر حجم الإنتاج عندما تبلغ الرتبة $x = ${forecastRank}$:`,
				questionTextAr: `احسب التنبؤ لحجم الإنتاج عند $x = ${forecastRank}$:`,
				imageUrl: scatterUrl,
				imageCaption: 'سحابة النقط ومستقيم التعديل الخطي بالمربعات الدنيا',
				questionData: {
					answer: forecastY,
					displayTemplate: 'y = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نعوّض $x = ${forecastRank}$ في معادلة مستقيم الانحدار: $y = ${aReg}(${forecastRank}) ${bReg >= 0 ? `+ ${bReg}` : `- ${Math.abs(bReg)}`} = ${forecastY}$.`
			};
		} else {
			finalAnswer = eqKatex;
			const swappedFrac = roundTo(compVarX / compCovXY, 2);
			const swappedB = roundTo(compYBar - swappedFrac * compXBar, 2);
			const wrongIntercept = roundTo(compXBar - aReg * compYBar, 2);
			const mcq = buildUniqueMcqOptions(
				`$${eqKatex}$`,
				[
					{
						text: `$y = ${linearKatex(aReg, wrongIntercept, 'x')}$`,
						diagnosticFeedback: `احسب $b = \\bar{y} - a\\bar{x} = ${compYBar} - ${aReg} \\times ${compXBar} = ${bReg}$؛ انت عكست بين $\\bar{x}$ و$\\bar{y}$!`
					},
					{
						text: `$y = ${linearKatex(swappedFrac, swappedB, 'x')}$`,
						diagnosticFeedback: `ميل مستقيم انحدار $y$ بدلالة $x$ هو $a = \\frac{\\operatorname{Cov}(X, Y)}{V(X)}$ وليس $\\frac{V(X)}{\\operatorname{Cov}(X, Y)}$.`
					},
					{
						text: `$y = ${linearKatex(-aReg, roundTo(compYBar + aReg * compXBar, 2), 'x')}$`,
						diagnosticFeedback: `التغاير $\\operatorname{Cov}(X, Y) = ${compCovXY} > 0$ موجب، لذا الميل $a$ موجب ($${aReg}$).`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `بالنسبة للسلسلة الإحصائية $x = [${xs.join(' ; ')}]$ و$y = [${ys.join(' ; ')}]$، ما هي معادلة مستقيم الانحدار $(D)$ لـ $y$ بدلالة $x$؟`,
				questionTextAr: `عيّن معادلة مستقيم الانحدار $(D)$ بالمربعات الدنيا:`,
				imageUrl: scatterUrl,
				imageCaption: 'سحابة النقط M_i والنقطة المتوسطة G ومستقيم الانحدار',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب $\\bar{x} = ${compXBar}$ و$\\bar{y} = ${compYBar}$، و$V(X) = ${compVarX}$ و$\\operatorname{Cov}(X, Y) = ${compCovXY}$؛ ومنه $a = ${aReg}$ و$b = ${compYBar} - ${aReg}(${compXBar}) = ${bReg}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 1',
			points: 4,
			instruction: 'الإحصاء ثنائي المتغير ومستقيم الانحدار الخطي:',
			content: [
				{
					type: 'text',
					content: `يمثل الجدول التالي تطور إنتاج مؤسسة صناعية وطنية $y_i$ (بآلاف الأطنان) خلال $5$ فترات ذات الرتبة $x_i$:`
				},
				{
					type: 'table',
					headers: ['الرتبة $x_i$', ...xs.map(String)],
					cells: [],
					rows: [['الإنتاج $y_i$ (ألف طن)', ...ys.map(String)]],
					headerBackground: true
				},
				{
					type: 'text',
					content: `1) احسب إحداثيتي النقطة المتوسطة $G(bar(x) ; bar(y))$ ثم مثّل سحابة النقط والنقطة $G$ في معلم متعامد.`
				},
				{
					type: 'text',
					content: `2) احسب التباين $V(X)$ والتغاير $op("Cov")(X, Y)$، ثم بيّن أن معادلة مستقيم الانحدار $(D)$ لـ $y$ بدلالة $x$ هي: $${eqTypst}$.`
				},
				{
					type: 'text',
					content: `3) قدّر حجم الإنتاج عند الرتبة $x = ${forecastRank}$، ثم حدّد ابتداء من أي رتبة $x$ يتجاوز الإنتاج المتوقع $${thresholdTarget}$ ألف طن.`
				},
				{
					type: 'image',
					src: scatterUrl,
					caption: `سحابة النقط ومستقيم الانحدار $${eqTypst}$`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`إحداثيا النقطة المتوسطة هما $\\bar{x} = \\frac{1}{5}\\sum x_i$ و$\\bar{y} = \\frac{1}{5}\\sum y_i$.`,
				`استعمل دستوري التباين والتغاير: $V(X) = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$ و$\\operatorname{Cov}(X, Y) = \\frac{1}{n}\\sum(x_i - \\bar{x})(y_i - \\bar{y})$.`,
				`يمر مستقيم الانحدار حتما بالنقطة $G(\\bar{x} ; \\bar{y})$، ومنه $b = \\bar{y} - a\\bar{x}$.`
			],
			solutionStepsAr: [
				`$\\bar{x} = \\frac{${sumX}}{5} = ${compXBar}$ و$\\bar{y} = \\frac{${sumY}}{5} = ${compYBar}$، إذن $G(${compXBar} ; ${compYBar})$.`,
				`$V(X) = ${compVarX}$ و$\\operatorname{Cov}(X, Y) = ${compCovXY}$، ومنه $a = \\frac{${compCovXY}}{${compVarX}} = ${aReg}$ و$b = ${compYBar} - ${aReg} \\times ${compXBar} = ${bReg}$، أي $(D): ${eqKatex}$.`,
				`عند $x = ${forecastRank}$: $y = ${forecastY}$ ألف طن. ولحل ${linearKatex(aReg, bReg, 'x')} > ${thresholdTarget} نجد $x > ${roundTo((thresholdTarget - bReg) / aReg, 2)}$، أي ابتداء من الرتبة $x = ${thresholdRank}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Nonlinear Exponential Regression z_i = ln(y_i) & Subscriber/Sales Forecast
// ═══════════════════════════════════════════════════════════════════════════════

const tplNonlinearAdjustmentLn: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_nonlinear_adjustment_ln',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'التعديل غير الخطي بتغيير المتغير z = ln(y) والتنبؤ بالمبيعات',
	curriculumLessonId: 'lesson_3as_ge_t3_least_squares_regression_forecasting',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// x = [1, 2, 3, 4, 5], underlying exponential growth of subscribers/exports in thousands
		const xs = [1, 2, 3, 4, 5];
		const a0 = rng.pick([0.2, 0.25, 0.3, 0.35]);
		const b0 = rng.pick([2.1, 2.3, 2.5, 2.8]);
		const jitter = [0.02, -0.02, 0.01, -0.02, 0.01];
		const ys = xs.map((x, idx) => Math.round(Math.exp(a0 * x + b0 + jitter[idx]) * 10) / 10);
		const zs = ys.map((y) => roundTo(Math.log(y), 2));

		const xMean = 3;
		const varX = 2;
		const zMean = roundTo(zs.reduce((s, z) => s + z, 0) / 5, 3);
		const covXZ = xs.reduce((s, x, i) => s + (x - xMean) * (zs[i] - zMean), 0) / 5;
		const aReg = roundTo(covXZ / varX, 2);
		const bReg = roundTo(zMean - aReg * xMean, 2);
		const expCoeffA = roundTo(Math.exp(bReg), 2);

		const forecastRank = difficulty === 'easy' ? 7 : rng.pick([7, 8]);
		const forecastFromModel = Math.round(expCoeffA * Math.exp(aReg * forecastRank));
		const probeIdx = rng.int(1, 3); // index 1..3 (x = 2..4)
		const probeZ = zs[probeIdx];

		const scatterSvg = svgScatterRegressionPlot({
			xs,
			ys: zs,
			a: aReg,
			b: bReg,
			xMean,
			yMean: zMean,
			xLabel: 'الرتبة x_i',
			yLabel: 'z_i = ln(y_i)',
			eqLabel: `z = ${aReg}x + ${bReg}`
		});
		const scatterUrl = saveSvgAsset(`3as_ge_t3_ln_reg_${difficulty}_s${seed}`, scatterSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${probeZ}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتعديل سلسلة أعداد المشتركين (بالآلاف) نضع تغيير المتغير $z_i = \\ln(y_i)$. إذا كان $y_${xs[probeIdx]} = ${ys[probeIdx]}$ عند الرتبة $x = ${xs[probeIdx]}$، فاحسب قيمة $z_${xs[probeIdx]}$ بالتدوير إلى $10^{-2}$:`,
				questionTextAr: `احسب $z_${xs[probeIdx]} = \\ln(${ys[probeIdx]})$ بالتدوير إلى $0.01$:`,
				imageUrl: scatterUrl,
				imageCaption: 'تعديل السلسلة (x_i ; z_i) بعد التحويل اللوغاريتمي',
				questionData: {
					answer: probeZ,
					displayTemplate: `z_${xs[probeIdx]} = ?`,
					variables: [],
					tolerance: 0.01
				},
				explanation: `بحساب اللوغاريتم النيبيري نجد $\\ln(${ys[probeIdx]}) \\approx ${probeZ}$.`
			};
		} else if (difficulty === 'medium') {
			const modelExpr = `y = ${expCoeffA} e^{${aReg}x}`;
			finalAnswer = modelExpr;
			const mcq = buildUniqueMcqOptions(
				`$${modelExpr}$`,
				[
					{
						text: `$y = ${bReg} e^{${aReg}x}$`,
						diagnosticFeedback: `من $\\ln y = ${aReg}x + ${bReg}$ نأخذ الأسية: $y = e^{${bReg}} \\cdot e^{${aReg}x} \\approx ${expCoeffA} e^{${aReg}x}$ وليس ${bReg} مضروبا في $e^{${aReg}x}$.`
					},
					{
						text: `$y = e^{${aReg}x} + ${expCoeffA}$`,
						diagnosticFeedback: `الأسية تحوّل الجمع في الأس إلى جداء ($e^{A+B} = e^A \\cdot e^B$) وليس إلى جمع!`
					},
					{
						text: `$y = ${aReg} e^{${bReg}x}$`,
						diagnosticFeedback: `المعامل الثابت ينتج عن الحد الثابت ${bReg} ($A = e^{${bReg}}$)، بينما معامل $x$ في الأس هو ${aReg}.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `أعطى التعديل الخطي للمتغير $z = \\ln(y)$ المعادلة $z = ${aReg}x + ${bReg}$. ما هي عبارة $y$ بدلالة $x$ (بالتدوير إلى $10^{-2}$ للثابت الأمامي)؟`,
				questionTextAr: `استنتج العبارة الأسية $y = A e^{a x}$:`,
				imageUrl: scatterUrl,
				imageCaption: 'مستقيم الانحدار في المستوى (x ; z)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$\\ln y = ${aReg}x + ${bReg} \\iff y = e^{${aReg}x + ${bReg}} = e^{${bReg}} e^{${aReg}x} \\approx ${expCoeffA} e^{${aReg}x}$.`
			};
		} else {
			finalAnswer = `${forecastFromModel}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `باعتماد النموذج الأسي $y = ${expCoeffA} e^{${aReg}x}$ (حيث $y$ بآلاف المشتركين)، قدّر عدد المشتركين المتوقع عند الرتبة $x = ${forecastRank}$ مقربا إلى أقرب وحدة (بآلاف المشتركين):`,
				questionTextAr: `احسب التقدير $y(${forecastRank})$ مقربا إلى أقرب عدد صحيح:`,
				imageUrl: scatterUrl,
				imageCaption: 'استعمال النموذج المعدّل للتنبؤ بالمبيعات أو المشتركين',
				questionData: {
					answer: forecastFromModel,
					displayTemplate: `y(${forecastRank}) = ?`,
					variables: [],
					tolerance: 2
				},
				explanation: `$y(${forecastRank}) = ${expCoeffA} e^{${aReg} \\times ${forecastRank}} = ${expCoeffA} e^{${roundTo(aReg * forecastRank, 2)}} \\approx ${forecastFromModel}$ ألف مشترك.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 2',
			points: 4,
			instruction: 'التعديل غير الخطي بتغيير المتغير والانحدار الأسي:',
			content: [
				{
					type: 'text',
					content: `يمثل الجدول التالي تطور عدد المشتركين في خدمة رقمية $y_i$ (بالآلاف) خلال $5$ سنوات رتبتها $x_i$:`
				},
				{
					type: 'table',
					headers: ['الرتبة $x_i$', ...xs.map(String)],
					cells: [],
					rows: [['المشتركون $y_i$ (ألف)', ...ys.map(String)]],
					headerBackground: true
				},
				{
					type: 'text',
					content: `نضع تغيير المتغير: $z_i = ln(y_i)$ مدورا إلى $10^(-2)$.`
				},
				{
					type: 'text',
					content: `1) انقل الجدول وأكمله بحساب القيم $z_i$ (القيم المرجعية: $${zs.join(' ; ')}$).`
				},
				{
					type: 'text',
					content: `2) اكتب معادلة مستقيم الانحدار $z = a x + b$ للسلسلة $(x_i ; z_i)$ بتدوير المعاملات إلى $10^(-2)$، ثم تحقق من الحصول على $z = ${aReg} x + ${bReg}$.`
				},
				{
					type: 'text',
					content: `3) استنتج كتابة $y$ على الشكل $y = A e^(a x)$ حيث $A approx ${expCoeffA}$، ثم قدّر عدد المشتركين المتوقع عند الرتبة $x = ${forecastRank}$.`
				},
				{
					type: 'image',
					src: scatterUrl,
					caption: `التعديل الخطي للسلسلة المحوّلة $(x_i ; z_i)$`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`نحسب $z_i = \\ln(y_i)$ بالآلة الحاسبة مع التدوير بدقة إلى رقمين بعد الفاصلة.`,
				`بعد إيجاد $z = a x + b$ نستعمل الدالة العكسية للوغاريتم: $y = e^{a x + b} = e^b \\cdot e^{a x}$.`,
				`لتقدير القيمة عند الرتبة المطلوبة نعوّض $x = ${forecastRank}$ مباشرة في النموذج الأسي.`
			],
			solutionStepsAr: [
				`قيم $z_i = \\ln(y_i)$ هي على الترتيب: $${zs.join(' ; ')}$ بوسط حسابي $\\bar{z} = ${zMean}$.`,
				`نجد ميل الانحدار $a = \\frac{\\operatorname{Cov}(X, Z)}{V(X)} \\approx ${aReg}$ و$b = \\bar{z} - a\\bar{x} \\approx ${bReg}$، أي $z = ${aReg}x + ${bReg}$.`,
				`بالمرور إلى الأسية: $y = e^{${aReg}x + ${bReg}} = e^{${bReg}}e^{${aReg}x} \\approx ${expCoeffA} e^{${aReg}x}$. وعند $x = ${forecastRank}$ نجد $y \\approx ${forecastFromModel}$ ألف مشترك.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Conditional Probability Tree, Total Probability & Bayes (Quality Control)
// ═══════════════════════════════════════════════════════════════════════════════

const tplConditionalProbTotalBayes: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_conditional_prob_total_bayes',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'الاحتمالات الشرطية وشجرة الاحتمالات ودستور الاحتمالات الكلية وبايز',
	curriculumLessonId: 'lesson_3as_ge_t3_conditional_probability_total_prob',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface ProbCfg {
			p1: number;
			p2: number;
			p3: number;
			d1: number;
			d2: number;
			d3: number;
			targetLine: 1 | 2 | 3;
		}
		const pool: ProbCfg[] = [
			{ p1: 0.5, p2: 0.3, p3: 0.2, d1: 0.02, d2: 0.04, d3: 0.04, targetLine: 2 }, // P(D)=0.030, P_D(L2)=12/30=2/5
			{ p1: 0.5, p2: 0.3, p3: 0.2, d1: 0.02, d2: 0.05, d3: 0.05, targetLine: 2 }, // P(D)=0.035, P_D(L2)=15/35=3/7
			{ p1: 0.4, p2: 0.35, p3: 0.25, d1: 0.02, d2: 0.04, d3: 0.04, targetLine: 1 }, // P(D)=0.032, P_D(L1)=8/32=1/4
			{ p1: 0.5, p2: 0.25, p3: 0.25, d1: 0.02, d2: 0.04, d3: 0.08, targetLine: 3 }, // P(D)=0.040, P_D(L3)=20/40=1/2
			{ p1: 0.6, p2: 0.3, p3: 0.1, d1: 0.01, d2: 0.02, d3: 0.08, targetLine: 3 }, // P(D)=0.020, P_D(L3)=8/20=2/5
			{ p1: 0.4, p2: 0.4, p3: 0.2, d1: 0.02, d2: 0.03, d3: 0.05, targetLine: 3 } // P(D)=0.030, P_D(L3)=10/30=1/3
		];
		const cfg = rng.pick(pool);
		const ps = [cfg.p1, cfg.p2, cfg.p3];
		const ds = [cfg.d1, cfg.d2, cfg.d3];

		const pInter = ps.map((p, i) => roundTo(p * ds[i], 4));
		const pTotalD = roundTo(pInter[0] + pInter[1] + pInter[2], 4);

		// Scale by 10000 for exact simplified fraction P_D(L_k)
		const idx = cfg.targetLine - 1;
		const numScaled = Math.round(pInter[idx] * 10000);
		const denScaled = Math.round(pTotalD * 10000);
		const [bayesN, bayesD] = simplifyFraction(numScaled, denScaled);
		const bayesKatex = fracKatex(bayesN, bayesD);
		const bayesTypst = fracTypst(bayesN, bayesD);

		const treeSvg = svgProbabilityTree({
			rootLabel: 'Ω',
			firstLevel: [
				{
					label: 'L1',
					probLabel: `${cfg.p1}`,
					children: [
						{ label: 'D', probLabel: `${cfg.d1}` },
						{ label: "D'", probLabel: `${roundTo(1 - cfg.d1, 2)}` }
					]
				},
				{
					label: 'L2',
					probLabel: `${cfg.p2}`,
					children: [
						{ label: 'D', probLabel: `${cfg.d2}` },
						{ label: "D'", probLabel: `${roundTo(1 - cfg.d2, 2)}` }
					]
				},
				{
					label: 'L3',
					probLabel: `${cfg.p3}`,
					children: [
						{ label: 'D', probLabel: `${cfg.d3}` },
						{ label: "D'", probLabel: `${roundTo(1 - cfg.d3, 2)}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`3as_ge_t3_probtree_${difficulty}_s${seed}`, treeSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${pInter[0]}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في مصنع به ثلاثة خطوط إنتاج: ينتج الخط $L_1$ نسبة $${Math.round(cfg.p1 * 100)}\\%$ من الإنتاج ونسبة القطع المعيبة $D$ فيه هي $${Math.round(cfg.d1 * 100)}\\%$. احسب احتمال تقاطع الحدثين $P(L_1 \\cap D)$:`,
				questionTextAr: `احسب $P(L_1 \\cap D) = P(L_1) \\times P_{L_1}(D)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات المرجّحة لمراقبة الجودة في خطوط الإنتاج',
				questionData: {
					answer: pInter[0],
					displayTemplate: 'P(L_1 ∩ D) = ?',
					variables: [],
					tolerance: 0.0005
				},
				explanation: `$P(L_1 \\cap D) = P(L_1) \\times P_{L_1}(D) = ${cfg.p1} \\times ${cfg.d1} = ${pInter[0]}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${pTotalD}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تتوزع خطوط إنتاج مصنع إلى $L_1 (${Math.round(cfg.p1 * 100)}\\%)$، $L_2 (${Math.round(cfg.p2 * 100)}\\%)$ و$L_3 (${Math.round(cfg.p3 * 100)}\\%)$، بنسب عيوب على التوالي $${Math.round(cfg.d1 * 100)}\\%$، $${Math.round(cfg.d2 * 100)}\\%$ و$${Math.round(cfg.d3 * 100)}\\%$. احسب الاحتمال الكلي $P(D)$ أن تكون القطعة المختارة معيبة:`,
				questionTextAr: `احسب الاحتمال الكلي $P(D)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات المرجّحة للخطوط الثلاثة',
				questionData: {
					answer: pTotalD,
					displayTemplate: 'P(D) = ?',
					variables: [],
					tolerance: 0.0005
				},
				explanation: `بدستور الاحتمالات الكلية: $P(D) = ${cfg.p1}\\times ${cfg.d1} + ${cfg.p2}\\times ${cfg.d2} + ${cfg.p3}\\times ${cfg.d3} = ${pInter[0]} + ${pInter[1]} + ${pInter[2]} = ${pTotalD}$.`
			};
		} else {
			finalAnswer = bayesKatex;
			const flippedBayes = fracKatex(bayesD, bayesN);
			const wrongInterOnly = `${pInter[idx]}`;
			const wrongCondGiven = `${ds[idx]}`;
			const mcq = buildUniqueMcqOptions(
				`$P_D(L_${cfg.targetLine}) = ${bayesKatex}$`,
				[
					{
						text: `$P_D(L_${cfg.targetLine}) = ${wrongInterOnly}$`,
						diagnosticFeedback: `${wrongInterOnly} هو احتمال التقاطع $P(L_${cfg.targetLine} \\cap D)$، ويجب قسمته على $P(D) = ${pTotalD}$ حسب دستور بايز!`
					},
					{
						text: `$P_D(L_${cfg.targetLine}) = ${wrongCondGiven}$`,
						diagnosticFeedback: `${wrongCondGiven} هو $P_{L_${cfg.targetLine}}(D)$ وليس المعكوس $P_D(L_${cfg.targetLine})$!`
					},
					{
						text: `$P_D(L_${cfg.targetLine}) = ${flippedBayes}$`,
						diagnosticFeedback: `احذر عكس الكسر: احتمال يكون دوما محصورا بين $0$ و$1$ ($\\frac{P(L_${cfg.targetLine} \\cap D)}{P(D)}$).`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `علمنا أن القطعة المسحوبة عشوائيا معيبة ($D$)، والاحتمال الكلي للعيب هو $P(D) = ${pTotalD}$. ما هو احتمال أن تكون صادرة عن الخط $L_${cfg.targetLine}$، أي $P_D(L_${cfg.targetLine})$؟`,
				questionTextAr: `احسب الاحتمال البعدي $P_D(L_${cfg.targetLine})$:`,
				imageUrl: treeUrl,
				imageCaption: 'استعمال شجرة الاحتمالات لحساب احتمال بايز',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$P_D(L_${cfg.targetLine}) = \\frac{P(L_${cfg.targetLine} \\cap D)}{P(D)} = \\frac{${pInter[idx]}}{${pTotalD}} = ${bayesKatex}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 3',
			points: 4,
			instruction: 'الاحتمالات الشرطية ومراقبة الجودة في وحدة إنتاجية:',
			content: [
				{
					type: 'text',
					content: `تعتمد مؤسسة صناعية على ثلاثة خطوط إنتاج $L_1$ و$L_2$ و$L_3$ تساهم في الإنتاج الكلي بالنسب $${Math.round(cfg.p1 * 100)}$% و$${Math.round(cfg.p2 * 100)}$% و$${Math.round(cfg.p3 * 100)}$% على الترتيب. بينت المراقبة أن نسبة القطع غير المطابقة (الحدث $D$) هي $${Math.round(cfg.d1 * 100)}$% في $L_1$، و$${Math.round(cfg.d2 * 100)}$% في $L_2$، و$${Math.round(cfg.d3 * 100)}$% في $L_3$. نسحب قطعة واحدة عشوائيا:`
				},
				{
					type: 'text',
					content: `1) أنشئ شجرة الاحتمالات المرجّحة الموافقة لهذه الوضعية ثم احسب $P(L_1 inter D)$ و$P(L_2 inter D)$.`
				},
				{
					type: 'text',
					content: `2) بيّن بدستور الاحتمالات الكلية أن $P(D) = ${pTotalD}$.`
				},
				{
					type: 'text',
					content: `3) إذا كانت القطعة المسحوبة غير مطابقة، فاحسب احتمال أن يكون مصدرها الخط $L_${cfg.targetLine}$ (أي $P_D (L_${cfg.targetLine}) = ${bayesTypst}$). هل الحدثان $L_${cfg.targetLine}$ و$D$ مستقلان؟ علّل.`
				},
				{
					type: 'image',
					src: treeUrl,
					caption: 'شجرة الاحتمالات المرجّحة لخطوط الإنتاج الثلاثة'
				}
			]
		};

		const indepCheck = Math.abs(pInter[idx] - ps[idx] * pTotalD) < 1e-6;

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`احتمال مسار في شجرة الاحتمالات يساوي جداء الاحتمالات المكتوبة على فروعه.`,
				`لإيجاد $P(D)$ نجمع احتمالات المسارات الثلاثة المنتهية بـ $D$: $P(L_1 \\cap D) + P(L_2 \\cap D) + P(L_3 \\cap D)$.`,
				`دستور بايز: $P_D(L_${cfg.targetLine}) = \\frac{P(L_${cfg.targetLine} \\cap D)}{P(D)}$. ولاختبار الاستقلال نقارن $P_D(L_${cfg.targetLine})$ مع $P(L_${cfg.targetLine})$.`
			],
			solutionStepsAr: [
				`$P(L_1 \\cap D) = ${cfg.p1} \\times ${cfg.d1} = ${pInter[0]}$، و$P(L_2 \\cap D) = ${cfg.p2} \\times ${cfg.d2} = ${pInter[1]}$، و$P(L_3 \\cap D) = ${cfg.p3} \\times ${cfg.d3} = ${pInter[2]}$.`,
				`دستور الاحتمالات الكلية: $P(D) = ${pInter[0]} + ${pInter[1]} + ${pInter[2]} = ${pTotalD}$.`,
				`$P_D(L_${cfg.targetLine}) = \\frac{${pInter[idx]}}{${pTotalD}} = ${bayesKatex}$. وبما أن $${roundTo(pInter[idx] / pTotalD, 4)} ${indepCheck ? '=' : '\\ne'} ${ps[idx]}$ أي $P_D(L_${cfg.targetLine}) ${indepCheck ? '=' : '\\ne'} P(L_${cfg.targetLine})$ فالحدثان ${indepCheck ? 'مستقلان' : 'غير مستقلين'}.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Bernoulli Trials, Binomial Law B(n, p), E(X), V(X) & Minimum Sample Size
// ═══════════════════════════════════════════════════════════════════════════════

const tplBernoulliBinomialQuality: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_bernoulli_binomial_quality',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'قانون برنولي والثنائي الحدين B(n ; p) وحساب الأمل والتباين',
	curriculumLessonId: 'lesson_3as_ge_t3_bernoulli_binomial_random_var',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface BinCfg {
			p: number;
			q: number;
			n: number;
			targetProb: number;
			eps: number;
		}
		const pool: BinCfg[] = [
			{ p: 0.2, q: 0.8, n: 5, targetProb: 0.95, eps: 0.05 }, // E=1, V=0.8, ln(0.05)/ln(0.8)=13.42 -> 14
			{ p: 0.2, q: 0.8, n: 10, targetProb: 0.99, eps: 0.01 }, // E=2, V=1.6, ln(0.01)/ln(0.8)=20.64 -> 21
			{ p: 0.1, q: 0.9, n: 10, targetProb: 0.95, eps: 0.05 }, // E=1, V=0.9, ln(0.05)/ln(0.9)=28.43 -> 29
			{ p: 0.25, q: 0.75, n: 4, targetProb: 0.95, eps: 0.05 }, // E=1, V=0.75, ln(0.05)/ln(0.75)=10.41 -> 11
			{ p: 0.2, q: 0.8, n: 8, targetProb: 0.9, eps: 0.1 } // E=1.6, V=1.28, ln(0.1)/ln(0.8)=10.32 -> 11
		];
		const cfg = rng.pick(pool);
		const { p, q, n, targetProb, eps } = cfg;

		const expVal = roundTo(n * p, 3);
		const varVal = roundTo(n * p * q, 4);
		const stdVal = roundTo(Math.sqrt(varVal), 3);
		const nRatio = Math.log(eps) / Math.log(q);
		const nMin = Math.ceil(nRatio);
		const pX1 = roundTo(n * p * Math.pow(q, n - 1), 4);
		const pXGe1 = roundTo(1 - Math.pow(q, n), 4);

		// Illustrative 2-step Bernoulli tree
		const bernTreeSvg = svgProbabilityTree({
			rootLabel: 'تجربتان',
			firstLevel: [
				{
					label: 'D',
					probLabel: `${p}`,
					children: [
						{ label: 'D', probLabel: `${p}` },
						{ label: "D'", probLabel: `${q}` }
					]
				},
				{
					label: "D'",
					probLabel: `${q}`,
					children: [
						{ label: 'D', probLabel: `${p}` },
						{ label: "D'", probLabel: `${q}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`3as_ge_t3_binom_${difficulty}_s${seed}`, bernTreeSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${expVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نسحب عشوائيا وبإرجاع $${n}$ وحدات من مخزون ضخم نسبة الوحدات المعيبة فيه $p = ${p}$. ليكن $X$ المتغير العشوائي لعدد الوحدات المعيبة في العينة، إذن $X \\sim \\mathcal{B}(${n} ; ${p})$. احسب الأمل الرياضي $E(X)$:`,
				questionTextAr: `احسب الأمل الرياضي $E(X)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة برنولي لتوضيح تكرار التجربة المستقلة',
				questionData: {
					answer: expVal,
					displayTemplate: 'E(X) = ?',
					variables: [],
					tolerance: 0.001
				},
				explanation: `بما أن $X \\sim \\mathcal{B}(${n} ; ${p})$ فإن $E(X) = n \\cdot p = ${n} \\times ${p} = ${expVal}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${varVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يتبع المتغير العشوائي $X$ قانون ثنائي الحدين $\\mathcal{B}(${n} ; ${p})$. احسب التباين $V(X)$:`,
				questionTextAr: `احسب التباين $V(X) = n p (1 - p)$:`,
				imageUrl: treeUrl,
				imageCaption: 'تجربة برنولي متكررة باستقلال',
				questionData: {
					answer: varVal,
					displayTemplate: 'V(X) = ?',
					variables: [],
					tolerance: 0.001
				},
				explanation: `تباين التوزيع الثنائي الحدين هو $V(X) = n p (1 - p) = ${n} \\times ${p} \\times ${q} = ${varVal}$.`
			};
		} else {
			finalAnswer = `${nMin}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نسحب عينة حجمها $n$ وحدة باستقلال (مع احتمال عيب للوحدة $p = ${p}$). ما هو أصغر عدد طبيعي $n$ يحقق أن يكون احتمال وجود وحدة معيبة واحدة على الأقل $P(X \\ge 1) \\ge ${targetProb}$؟`,
				questionTextAr: `عيّن أصغر عدد طبيعي $n$ يحقق $1 - ${q}^n \\ge ${targetProb}$:`,
				questionData: {
					answer: nMin,
					displayTemplate: 'n_min = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `$P(X \\ge 1) \\ge ${targetProb} \\iff 1 - ${q}^n \\ge ${targetProb} \\iff ${q}^n \\le ${eps}$. بأخذ $\\ln$ (ومع $\\ln(${q}) < 0$ تتبدل المتراجحة): $n \\ge \\frac{\\ln(${eps})}{\\ln(${q})} \\approx ${roundTo(nRatio, 2)}$، ومنه $n_{\\min} = ${nMin}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 4',
			points: 4,
			instruction: 'قانون برنولي والمتغير العشوائي الثنائي الحدين:',
			content: [
				{
					type: 'text',
					content: `تنتج ورشة صناعية دفعات كبيرة من الأجزاء الميكانيكية، حيث احتمال سحب قطعة بها خلل طفيف هو $p = ${p}$. نسحب عشوائيا وبإرجاع (أو باعتبار المخزون غير منتهٍ) عينة مكوّنة من $n = ${n}$ قطعة، ونرمز بـ $X$ لعدد القطع المعيبة في العينة.`
				},
				{
					type: 'text',
					content: `1) برّر لماذا يتبع $X$ قانون ثنائي الحدين محدّدا وسيطيه $(n ; p)$.`
				},
				{
					type: 'text',
					content: `2) احسب الاحتمالين: $P(X = 1)$ و$P(X >= 1)$ بتدوير النتائج إلى $10^(-4)$.`
				},
				{
					type: 'text',
					content: `3) احسب الأمل الرياضي $E(X)$ والتباين $V(X)$ والانحراف المعياري $sigma(X)$.`
				},
				{
					type: 'text',
					content: `4) ما هو أصغر حجم عينة $n$ حتى يكون احتمال وجود قطعة معيبة واحدة على الأقل أكبر من أو يساوي $${targetProb}$؟`
				},
				{
					type: 'image',
					src: treeUrl,
					caption: 'شجرة برنولي التوضيحية لتكرار سحبتين مستقلتين'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تكرار تجربة برنولي بوسيط $p$ عدد $n$ مرة بصورة مستقلة يعطي $X \\sim \\mathcal{B}(n ; p)$.`,
				`تذكّر أن $P(X \\ge 1) = 1 - P(X = 0) = 1 - (1 - p)^n$.`,
				`عند القسمة على $\\ln(${q}) < 0$ في المتراجحة، ينعكس اتجاه المتراجحة من $\\le$ إلى $\\ge$.`
			],
			solutionStepsAr: [
				`لدينا تكرار $n = ${n}$ مرة بنفس الشروط والاستقلال وبإمكانيتين (معيبة باحتمال $p = ${p}$ أو سليمة باحتمال $q = ${q}$)، إذن $X \\sim \\mathcal{B}(${n} ; ${p})$.`,
				`$P(X = 1) = ${n} \\times ${p} \\times (${q})^{${n - 1}} \\approx ${pX1}$، و$P(X \\ge 1) = 1 - (${q})^{${n}} \\approx ${pXGe1}$.`,
				`$E(X) = n p = ${expVal}$، $V(X) = n p (1 - p) = ${varVal}$، و$\\sigma(X) = \\sqrt{${varVal}} \\approx ${stdVal}$.`,
				`$1 - ${q}^n \\ge ${targetProb} \\iff ${q}^n \\le ${eps} \\iff n \\ge \\frac{\\ln(${eps})}{\\ln(${q})} \\approx ${roundTo(nRatio, 2)}$، إذن أصغر عدد طبيعي هو $n = ${nMin}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BAC T3 Logarithmic Analysis + Oblique Asymptote + Parallel Tangent + Area
// ═══════════════════════════════════════════════════════════════════════════════

const tplComprehensiveAnalysisArea: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_comprehensive_analysis_area',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'دراسة دالة لوغاريتمية اقتصادية: دالة مساعدة ومماس مواز للمقارب ومساحة',
	curriculumLessonId: 'lesson_3as_ge_t3_bac_comprehensive_synthesis',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = 2k x + b - (2k ln x)/x on ]0 ; +oo[ (k in {1, 2, 3}, b >= 1)
		// f'(x) = 2k * g(x) / x^2 where g(x) = x^2 - 1 + ln x => g(1) = 0 (unique!), minimum at x = 1 with f(1) = 2k + b!
		// Oblique asymptote (Delta): y = 2k x + b, intersects (C_f) at A(1 ; 2k + b).
		// At x = e: f'(e) = 2k => tangent is PARALLEL to (Delta)!
		// Primitive of f(x): F(x) = k x^2 + b x - k (ln x)^2 => F'(x) = f(x)!
		// Area between (Delta) and (C_f) on [1 ; e]: k u.a. = k * ux * uy cm^2!
		const k = rng.int(1, difficulty === 'easy' ? 2 : 3);
		const b = rng.int(1, 4);
		const ux = rng.pick([1, 2]);
		const uy = rng.pick([2, 3]);
		const areaUa = k;
		const areaCm2 = k * ux * uy;
		const fMinVal = 2 * k + b;

		const gFn = (x: number) => x * x - 1 + Math.log(x);
		const gpFn = (x: number) => 2 * x + 1 / x;
		const fFn = (x: number) => 2 * k * x + b - (2 * k * Math.log(x)) / x;
		const fpFn = (x: number) => (2 * k * gFn(x)) / (x * x);
		const FFn = (x: number) => k * x * x + b * x - k * Math.log(x) * Math.log(x);

		assertCentralDiff(gFn, gpFn, [0.5, 1, 2.2], 'bacT3Log.gPrime');
		assertCentralDiff(fFn, fpFn, [0.5, 1, 1.8, Math.E], 'bacT3Log.fPrime');
		assertCentralDiff(FFn, fFn, [0.8, 1.5, Math.E], 'bacT3Log.primitive');

		const slopeDelta = 2 * k;
		const fAtE = 2 * k * Math.E + b - (2 * k) / Math.E;
		const meanOnE = roundTo((FFn(Math.E) - FFn(1)) / (Math.E - 1), 2);
		const simpsonArea = simpsonIntegral((x) => (2 * k * Math.log(x)) / x, 1, Math.E);
		if (Math.abs(simpsonArea - areaUa) > 1e-6) {
			throw new Error(`Log area check failed: ${simpsonArea} vs ${areaUa}`);
		}

		const asympK = linearKatex(slopeDelta, b, 'x');
		const asympT = linearTypst(slopeDelta, b, 'x');
		const fKatex = `${asympK} - \\frac{${2 * k}\\ln x}{x}`;
		const fTypst = `${asympT} - frac(${2 * k} ln(x), x)`;

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['0', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: `${fMinVal}`, position: 'bottom' },
				{ value: '+∞', position: 'top' }
			]
		});
		const varUrl = saveSvgAsset(`3as_ge_t3_log_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.2,
			xMax: 4.5,
			yMin: Math.floor(Math.min(0, fMinVal - 2)),
			yMax: Math.ceil(fFn(4) + 3),
			fn: (x) => (x > 0.35 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
				{ kind: 'oblique', a: slopeDelta, b, label: 'Δ', color: '#059669' }
			],
			tangents: [{ x: Math.E, y: fAtE, slope: slopeDelta, halfSpan: 0.7, color: '#7c3aed' }],
			shadedIntegral: { a: 1, b: Math.E, color: 'rgba(124,58,237,0.20)' },
			points: [
				{ x: 1, y: fMinVal, label: `S(1;${fMinVal})`, color: '#dc2626' },
				{ x: Math.E, y: fAtE, label: 'T(e;f(e))', color: '#7c3aed' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t3_log_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${fMinVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة الاقتصادية $f(x) = ${fKatex}$ على $]0 ; +\\infty[$ والتي تقبل قيمة حدية صغرى عند $x = 1$. احسب الكلفة الصغرى $f(1)$:`,
				questionTextAr: `احسب القيمة الصغرى $f(1)$:`,
				imageUrl: varUrl,
				imageCaption: 'جدول تغيرات الدالة f على ]0 ; +∞[',
				questionData: {
					answer: fMinVal,
					displayTemplate: 'f(1) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعوّض $x = 1$ (مع $\\ln 1 = 0$): $f(1) = ${2 * k}(1) + ${b} - 0 = ${fMinVal}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = 'x_0 = e';
			const mcq = buildUniqueMcqOptions(
				`$x_0 = e$ لأن $f'(e) = ${slopeDelta}$`,
				[
					{
						text: `$x_0 = 1$ لأن $f'(1) = 0$`,
						diagnosticFeedback: `المماس الموازي للمقارب $(\\Delta): y = ${asympK}$ يجب أن يكون ميله مساويا لـ $${slopeDelta}$ وليس $0$!`
					},
					{
						text: `$x_0 = e^2$ لأن $\\ln(e^2) = 2$`,
						diagnosticFeedback: `شرط التوازي $f'(x_0) = ${slopeDelta}$ يعطي $-1 + \\ln(x_0) = 0 \\iff \\ln(x_0) = 1 \\iff x_0 = e$.`
					},
					{
						text: `لا يوجد أي مماس مواز للمقارب $(\\Delta)$`,
						diagnosticFeedback: `حل المعادلة $\\frac{${2 * k}(x^2 - 1 + \\ln x)}{x^2} = ${slopeDelta}$ يعطي مباشرة $\\ln x = 1 \\implies x = e$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي فاصلة النقطة $T$ من المنحنى $(C_f)$ للدالة $f(x) = ${fKatex}$ والتي يكون المماس عندها موازيا للمستقيم المقارب المائل $(\\Delta): y = ${asympK}$؟`,
				questionTextAr: `عيّن فاصلة نقطة التماس حيث المماس يوازي $(\\Delta)$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والمقارب المائل Δ والمماس الموازي عند x = e',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحل $f'(x) = ${slopeDelta} \\iff ${slopeDelta}\\frac{x^2 - 1 + \\ln x}{x^2} = ${slopeDelta} \\iff x^2 - 1 + \\ln x = x^2 \\iff \\ln x = 1 \\iff x = e$.`
			};
		} else {
			finalAnswer = `${areaCm2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في معلم متعامد فيه $\\|\\vec{\\imath}\\| = ${ux}\\text{ cm}$ و$\\|\\vec{\\jmath}\\| = ${uy}\\text{ cm}$، احسب بالـ $\\text{cm}^2$ مساحة الحيّز المحصور بين $(\\Delta): y = ${asympK}$ والمنحنى $(C_f)$ لـ $f(x) = ${fKatex}$ والمستقيمين $x = 1$ و$x = e$:`,
				questionTextAr: `احسب المساحة بالـ $\\text{cm}^2$ على $[1 ; e]$:`,
				imageUrl: curveUrl,
				imageCaption: 'الحيز المظلل بين المقارب Δ والمنحنى (C_f) على [1 ; e]',
				questionData: {
					answer: areaCm2,
					displayTemplate: 'A = ? cm^2',
					variables: [],
					tolerance: 0
				},
				explanation: `على $[1 ; e]$ يقع $(\\Delta)$ فوق $(C_f)$، ومنه $\\mathcal{A}_{\\text{u.a}} = \\int_1^e \\frac{${2 * k}\\ln x}{x}\\,dx = \\left[${k}(\\ln x)^2\\right]_1^e = ${areaUa}\\text{ u.a}$، وبضربها في $${ux} \\times ${uy} = ${ux * uy}$ نجد $\\mathcal{A} = ${areaCm2}\\text{ cm}^2$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 5',
			points: 5,
			instruction: 'دراسة شاملة لدالة اقتصادية لوغاريتمية وحساب المساحة:',
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة $g$ المعرفة على $]0 ; +oo[$ بـ: $g(x) = x^2 - 1 + ln(x)$. احسب $g'(x)$ وادرس اتجاه تغير $g$ ثم احسب $g(1)$ واستنتج إشارة $g(x)$ على $]0 ; +oo[$.`
				},
				{
					type: 'text',
					content: `*الجزء الثاني:* نعتبر الدالة $f$ المعرفة على $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$. نرمز بـ $(cal(C)_f)$ لتمثيلها البياني في معلم متعامد فيه $||arrow(i)|| = ${ux}$ cm و$||arrow(j)|| = ${uy}$ cm.`
				},
				{
					type: 'text',
					content: `1) احسب $lim_(x arrow.r 0^+) f(x)$ و$lim_(x arrow.r +oo) f(x)$، ثم بيّن أن المستقيم $(Delta): y = ${asympT}$ مقارب مائل لـ $(cal(C)_f)$ بجوار $+oo$ وادرس الوضع النسبي.`
				},
				{
					type: 'text',
					content: `2) بيّن أن $f'(x) = frac(${2 * k} g(x), x^2)$ ثم شكل جدول تغيرات $f$، وعيّن فاصلة النقطة التي يقبل عندها $(cal(C)_f)$ مماسا موازيا للمستقيم $(Delta)$.`
				},
				{
					type: 'text',
					content: `3) احسب بالـ $"cm"^2$ مساحة الحيز المحصور بين $(Delta)$ و$(cal(C)_f)$ والمستقيمين $x = 1$ و$x = e$، ثم تحقق أن $F(x) = ${k === 1 ? '' : `${k} `}x^2 + ${b === 1 ? '' : `${b} `}x - ${k === 1 ? '' : `${k} `}(ln(x))^2$ دالة أصلية لـ $f$ لاستنتاج القيمة المتوسطة لـ $f$ على $[1 ; e]$ (تقريبا $${meanOnE}$).`
				},
				{
					type: 'columns',
					widths: ['45%', '55%'],
					children: [
						{ type: 'image', src: varUrl, caption: 'جدول تغيرات الدالة f' },
						{ type: 'image', src: curveUrl, caption: 'المنحنى $(C_f)$ والمقارب $Delta$ والمماس الموازي والمساحة' }
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`بما أن $g(1) = 0$ و$g$ متزايدة تماما على $]0 ; +\\infty[$، فإن $g(x) < 0$ على $]0 ; 1[$ و$g(x) > 0$ على $]1 ; +\\infty[$.`,
				`المماس الموازي للمقارب $(\\Delta): y = ${asympK}$ يحقق $f'(x_0) = ${slopeDelta}$، ما يؤول إلى $\\ln(x_0) = 1$.`,
				`دالة أصلية لـ $\\frac{2\\ln x}{x}$ هي $(\\ln x)^2$.`
			],
			solutionStepsAr: [
				`$g'(x) = 2x + \\frac{1}{x} > 0$ فـ $g$ متزايدة تماما، وتنعدم عند $x = 1$ (سالبة على $]0 ; 1[$ وموجبة على $]1 ; +\\infty[$).`,
				`$\\lim_{x \\to 0^+} f(x) = +\\infty$ (مقارب عمودي $x = 0$)؛ و$(\\Delta): y = ${asympK}$ مقارب مائل يقطع $(C_f)$ في $S(1 ; ${fMinVal})$.`,
				`$f'(x) = \\frac{${2 * k}g(x)}{x^2}$، وتبلغ $f$ قيمتها الصغرى $f(1) = ${fMinVal}$. وبحل $f'(x_0) = ${slopeDelta}$ نجد $x_0 = e$.`,
				`المساحة على $[1 ; e]$ هي $[${k}(\\ln x)^2]_1^e \\times ${ux * uy} = ${areaCm2}\\text{ cm}^2$. والقيمة المتوسطة لـ $f$ على $[1 ; e]$ هي $m = \\frac{F(e) - F(1)}{e - 1} \\approx ${meanOnE}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive 3AS GE BAC Mock Integration Problem (7 pts) — ALL 4 SVGs!
//    Sequence (svgCobwebSequencePlot) + Prob Tree (svgProbabilityTree) +
//    Variation Table (svgVariationTable) + Economic Curve & Integral (svgFunctionCurvePlot)
// ═══════════════════════════════════════════════════════════════════════════════

const tplBacGeMockIntegration: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t3_bac_ge_mock_integration',
	grade: '3as_ge',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة بكالوريا اقتصادية شاملة: متتالية + شجرة احتمالات + دراسة دالة وتكامل',
	curriculumLessonId: 'lesson_3as_ge_t3_bac_comprehensive_synthesis',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A — Halal Production Sequence: u_{n+1} = aSeq * u_n + bSeq with u_0 < L
		interface SeqCfg {
			aSeq: number;
			bSeq: number;
			u0: number;
			L: number;
		}
		const seqPool: SeqCfg[] = [
			{ aSeq: 0.5, bSeq: 6, u0: 2, L: 12 }, // v_0 = 10, u_1 = 7
			{ aSeq: 0.8, bSeq: 4, u0: 4, L: 20 }, // v_0 = 16, u_1 = 7.2
			{ aSeq: 0.75, bSeq: 4, u0: 4, L: 16 }, // v_0 = 12, u_1 = 7
			{ aSeq: 0.5, bSeq: 8, u0: 4, L: 16 } // v_0 = 12, u_1 = 10
		];
		const seqCfg = rng.pick(seqPool);
		const { aSeq, bSeq, u0, L } = seqCfg;
		const u1 = roundTo(aSeq * u0 + bSeq, 2);
		const cobwebSvg = svgCobwebSequencePlot({
			xMin: 0,
			xMax: L + 2,
			yMin: 0,
			yMax: L + 2,
			fn: (x) => aSeq * x + bSeq,
			u0,
			steps: 5,
			fixedPoint: L
		});
		const cobwebUrl = saveSvgAsset(`3as_ge_t3_mock_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		// Part B — Quality Control Tree across 2 workshops W1, W2
		interface TreeCfg {
			w1: number;
			w2: number;
			d1: number;
			d2: number;
		}
		const treePool: TreeCfg[] = [
			{ w1: 0.6, w2: 0.4, d1: 0.02, d2: 0.05 }, // P(D) = 0.012 + 0.020 = 0.032
			{ w1: 0.7, w2: 0.3, d1: 0.02, d2: 0.04 }, // P(D) = 0.014 + 0.012 = 0.026
			{ w1: 0.5, w2: 0.5, d1: 0.02, d2: 0.06 }, // P(D) = 0.010 + 0.030 = 0.040
			{ w1: 0.75, w2: 0.25, d1: 0.02, d2: 0.06 } // P(D) = 0.015 + 0.015 = 0.030
		];
		const treeCfg = rng.pick(treePool);
		const pTotalD = roundTo(treeCfg.w1 * treeCfg.d1 + treeCfg.w2 * treeCfg.d2, 4);
		const treeSvg = svgProbabilityTree({
			rootLabel: 'الإنتاج',
			firstLevel: [
				{
					label: 'W1',
					probLabel: `${treeCfg.w1}`,
					children: [
						{ label: 'D', probLabel: `${treeCfg.d1}` },
						{ label: "D'", probLabel: `${roundTo(1 - treeCfg.d1, 2)}` }
					]
				},
				{
					label: 'W2',
					probLabel: `${treeCfg.w2}`,
					children: [
						{ label: 'D', probLabel: `${treeCfg.d2}` },
						{ label: "D'", probLabel: `${roundTo(1 - treeCfg.d2, 2)}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`3as_ge_t3_mock_tree_${difficulty}_s${seed}`, treeSvg);

		// Part C — Economic Profit-Margin/Efficiency Curve f(x) = c + 3k (x - 1) e^(-x) on [0 ; +oo[
		//   f(0) = c - 3k = 2 > 0 (since c = 3k + 2), lim_{x->+oo} f(x) = c
		//   f'(x) = 3k (2 - x) e^(-x) => peak at x = 2: f(2) = c + 3k e^(-2)
		//   Primitive F(x) = c x - 3k x e^(-x) => mean value on [1 ; 4]: m = c + k(e^(-1) - 4 e^(-4))!
		const kFn = difficulty === 'easy' ? 1 : rng.int(2, 3);
		const aFn = 3 * kFn;
		const cFn = aFn + 2;
		const fFn = (x: number) => cFn + aFn * (x - 1) * Math.exp(-x);
		const fpFn = (x: number) => aFn * (2 - x) * Math.exp(-x);
		const FFn = (x: number) => cFn * x - aFn * x * Math.exp(-x);

		assertCentralDiff(fFn, fpFn, [0, 1, 2, 3.5], 'bacT3Mock.fPrime');
		assertCentralDiff(FFn, fFn, [0.5, 1, 2.5, 4], 'bacT3Mock.FPrime');

		const fPeak = roundTo(fFn(2), 2);
		const meanExact = (FFn(4) - FFn(1)) / 3;
		const meanSimpson = simpsonIntegral(fFn, 1, 4) / 3;
		if (Math.abs(meanExact - meanSimpson) > 1e-6) {
			throw new Error(`Mock mean value check failed: ${meanExact} vs ${meanSimpson}`);
		}
		const meanRounded = roundTo(meanExact, 2);

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['0', '2', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '2', position: 'bottom' },
				{ value: `f(2)`, position: 'top' },
				{ value: `${cFn}`, position: 'bottom' }
			]
		});
		const varUrl = saveSvgAsset(`3as_ge_t3_mock_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: 5.5,
			yMin: 0,
			yMax: Math.ceil(fPeak + 2),
			fn: (x) => (x >= 0 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [{ kind: 'horizontal', value: cFn, label: `y=${cFn}`, color: '#059669' }],
			shadedIntegral: { a: 1, b: 4, color: 'rgba(59,130,246,0.22)' },
			points: [
				{ x: 0, y: 2, label: '(0;2)', color: '#1d4ed8' },
				{ x: 2, y: fPeak, label: `M(2;${fPeak})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t3_mock_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${L}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الجزء الأول من مسألة البكالوريا التجريبية، يتبع الإنتاج المتوقع المتتالية $u_{n+1} = ${aSeq} u_n + ${bSeq}$ مع $u_0 = ${u0}$. احسب نهاية المتتالية $L = \\lim_{n \\to +\\infty} u_n$:`,
				questionTextAr: `احسب نهاية الاستقرار الإنتاجي $L$:`,
				imageUrl: cobwebUrl,
				imageCaption: 'التمثيل البياني للمتتالية التراجعية وتقاربها نحو L',
				questionData: {
					answer: L,
					displayTemplate: 'L = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحل معادلة النقطة الصامدة $L = ${aSeq}L + ${bSeq} \\iff ${roundTo(1 - aSeq, 2)}L = ${bSeq} \\iff L = ${L}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${pTotalD}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الجزء الثاني (مراقبة الجودة)، تزود الورشة $W_1$ نسبة $${Math.round(treeCfg.w1 * 100)}\\%$ من الألواح (بنسبة عيب $${Math.round(treeCfg.d1 * 100)}\\%$) والورشة $W_2$ الباقي (بنسبة عيب $${Math.round(treeCfg.d2 * 100)}\\%$). احسب الاحتمال الكلي $P(D)$:`,
				questionTextAr: `احسب الاحتمال الكلي $P(D)$ من شجرة الاحتمالات:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات لمراقبة جودة الورشتين',
				questionData: {
					answer: pTotalD,
					displayTemplate: 'P(D) = ?',
					variables: [],
					tolerance: 0.0005
				},
				explanation: `$P(D) = ${treeCfg.w1}\\times ${treeCfg.d1} + ${treeCfg.w2}\\times ${treeCfg.d2} = ${pTotalD}$.`
			};
		} else {
			const meanExprK = `${cFn} + ${kFn === 1 ? '' : `${kFn}`}(e^{-1} - 4e^{-4})`;
			finalAnswer = `m = ${meanExprK}`;
			const mcq = buildUniqueMcqOptions(
				`$m = ${meanExprK}$`,
				[
					{
						text: `$m = ${3 * cFn} + ${aFn}(e^{-1} - 4e^{-4})$`,
						diagnosticFeedback: `هذا هو ناتج التكامل $\\int_1^4 f(x)\\,dx$ قبل قسمته على طول المجال $4 - 1 = 3$!`
					},
					{
						text: `$m = ${cFn} + ${kFn === 1 ? '' : `${kFn}`}(4e^{-4} - e^{-1})$`,
						diagnosticFeedback: `بما أن الدالة الأصلية لـ $(x - 1)e^{-x}$ هي $-x e^{-x}$، فإن $[-x e^{-x}]_1^4 = -4e^{-4} - (-e^{-1}) = e^{-1} - 4e^{-4} > 0$.`
					},
					{
						text: `$m = ${cFn} + ${kFn === 1 ? '' : `${kFn}`}(1 - 4e^{-4})$`,
						diagnosticFeedback: `عند الحد السفلي $x = 1$ نحصل على $e^{-1}$ وليس $e^0 = 1$!`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في الجزء الثالث، تُعطى دالة المردودية الاقتصادية بـ $f(x) = ${cFn} + ${aFn}(x - 1)e^{-x}$ (ودالتها الأصلية $F(x) = ${cFn}x - ${aFn}x e^{-x}$). ما هي القيمة المتوسطة $m = \\frac{1}{4 - 1}\\int_1^4 f(x)\\,dx$ على $[1 ; 4]$؟`,
				questionTextAr: `عيّن القيمة المضبوطة للقيمة المتوسطة $m$ على $[1 ; 4]$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الدالة الاقتصادية f والمساحة المظللة على [1 ; 4]',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$\\int_1^4 f(x)\\,dx = F(4) - F(1) = ${3 * cFn} + ${aFn}(e^{-1} - 4e^{-4})$. بالقسمة على $3$ نجد $m = ${meanExprK} \\approx ${meanRounded}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'الموضوع الشامل (بكالوريا)',
			points: 7,
			instruction: 'مسألة اقتصادية شاملة في إنتاج الألواح الشمسية (متتاليات + احتمالات + تحليل وتكامل):',
			content: [
				{
					type: 'text',
					content: `*أولا — تطور الإنتاج (المتتاليات):* تنتج مؤسسة ألواحا شمسية حيث الإنتاج الأولي $u_0 = ${u0}$ ألف وحدة، ويتطور وفق العلاقة $u_(n+1) = ${aSeq} u_n + ${bSeq}$.`
				},
				{
					type: 'text',
					content: `1) احسب $u_1$ ثم برهن بالتراجع أنّه من أجل كل عدد طبيعي $n$: $u_n < ${L}$، واستنتج اتجاه تغيّر $(u_n)$.`
				},
				{
					type: 'text',
					content: `2) نضع $v_n = ${L} - u_n$. بيّن أن $(v_n)$ هندسية أساسها $${aSeq}$، اكتب $u_n$ بدلالة $n$، ثم احسب $lim_(n arrow.r +oo) u_n$.`
				},
				{
					type: 'text',
					content: `*ثانيا — مراقبة الجودة (الاحتمالات الشرطية):* تساهم الورشة $W_1$ بـ $${Math.round(treeCfg.w1 * 100)}$% من الإنتاج (نسبة عيب $${Math.round(treeCfg.d1 * 100)}$%) والورشة $W_2$ بـ $${Math.round(treeCfg.w2 * 100)}$% (نسبة عيب $${Math.round(treeCfg.d2 * 100)}$%). أنشئ شجرة الاحتمالات ثم احسب $P(D)$ و$P_D (W_1)$.`
				},
				{
					type: 'text',
					content: `*ثالثا — المردودية الاقتصادية والتكامل:* ندرس على $[0 ; +oo[$ الدالة $f(x) = ${cFn} + ${aFn}(x - 1) e^(-x)$. احسب $f'(x)$ وشكل جدول تغيرات $f$، ثم تحقق أن $F(x) = ${cFn} x - ${aFn} x e^(-x)$ دالة أصلية لـ $f(x)$ على $[0 ; +oo[$ واحسب القيمة المتوسطة $m = frac(1, 3) integral_1^4 f(x) dx$.`
				},
				{
					type: 'columns',
					widths: ['50%', '50%'],
					children: [
						{ type: 'image', src: cobwebUrl, caption: 'التمثيل العنكبوتي للمتتالية (u_n)' },
						{ type: 'image', src: treeUrl, caption: 'شجرة الاحتمالات للورشتين' }
					]
				},
				{
					type: 'columns',
					widths: ['45%', '55%'],
					children: [
						{ type: 'image', src: varUrl, caption: 'جدول تغيرات الدالة f' },
						{ type: 'image', src: curveUrl, caption: 'منحنى الدالة $f$ والحيز المظلل على $[1 ; 4]$' }
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في المتتالية، نتحقق بالتراجع من $u_n < ${L}$ ثم نجد $u_{n+1} - u_n = ${roundTo(1 - aSeq, 2)}(${L} - u_n) > 0$.`,
				`بدستور الاحتمالات الكلية: $P(D) = P(W_1)P_{W_1}(D) + P(W_2)P_{W_2}(D)$.`,
				`نشتق $F(x) = ${cFn}x - ${aFn}x e^{-x}$ باستعمال مشتق جداء لنتأكد أن $F'(x) = f(x)$ قبل حساب القيمة المتوسطة على $[1 ; 4]$.`
			],
			solutionStepsAr: [
				`الحد $u_1 = ${u1}$. بالتراجع $u_n < ${L}$ وتكون $(u_n)$ متزايدة تماما لأن $u_{n+1} - u_n = ${roundTo(1 - aSeq, 2)}(${L} - u_n) > 0$. و$v_n = (${L - u0})(${aSeq})^n \\implies u_n = ${L} - (${L - u0})(${aSeq})^n \\xrightarrow{n\\to+\\infty} ${L}$.`,
				`الاحتمال الكلي للعيب: $P(D) = ${treeCfg.w1}\\times ${treeCfg.d1} + ${treeCfg.w2}\\times ${treeCfg.d2} = ${pTotalD}$، ومنه $P_D(W_1) = \\frac{${roundTo(treeCfg.w1 * treeCfg.d1, 4)}}{${pTotalD}} \\approx ${roundTo((treeCfg.w1 * treeCfg.d1) / pTotalD, 3)}$.`,
				`المشتق $f'(x) = ${aFn}(2 - x)e^{-x}$ ينعدم عند $x = 2$ (ذروة عظمى $f(2) \\approx ${fPeak}$) والمقارب الأفقي $y = ${cFn}$.`,
				`$F'(x) = ${cFn} - ${aFn}(e^{-x} - x e^{-x}) = ${cFn} + ${aFn}(x - 1)e^{-x} = f(x)$. ومنه القيمة المتوسطة على $[1 ; 4]$ هي $m = \\frac{F(4) - F(1)}{3} = ${cFn} + ${kFn === 1 ? '' : `${kFn}`}(e^{-1} - 4e^{-4}) \\approx ${meanRounded}$.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_3AS_GE_T3: ParameterizedTemplate[] = [
	tplBivariateRegressionForecast,
	tplNonlinearAdjustmentLn,
	tplConditionalProbTotalBayes,
	tplBernoulliBinomialQuality,
	tplComprehensiveAnalysisArea,
	tplBacGeMockIntegration
];
