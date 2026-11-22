import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgCartesianPlane } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ===========================================================================
// Helpers for 1AS TCL — Trimester 2 Templates (Dual Syntax: KaTeX vs Typst)
// ===========================================================================

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 23,
	medium: 59,
	hard: 103
};

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 997 + salt * 137 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

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

function linFactor(a: number, b: number): string {
	const head = a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function buildMcqData(
	correctText: string,
	correctFeedback: string,
	distractors: { text: string; diagnosticFeedback: string }[],
	rng: SeededRng
) {
	const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
	const diagnosticFeedback = mcq.options.map((opt, idx) =>
		idx === mcq.correctIndices[0]
			? correctFeedback
			: opt.diagnosticFeedback || 'راجع خطوات الحل وتحقق من النتيجة.'
	);
	return {
		options: mcq.options,
		correctIndex: mcq.correctIndices[0],
		correctIndices: mcq.correctIndices,
		correctIndexes: mcq.correctIndices,
		diagnosticFeedback,
		shuffle: false
	};
}

// ===========================================================================
// 1. Function Generalities: Domain, Images, Pre-images & Graph Reading
// ===========================================================================

const tplFunctionDomainImages: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_function_domain_images',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'عموميات على الدوال: مجموعة التعريف والصور والسوابق والقراءة البيانية',
	curriculumLessonId: 'lesson_1as_tcl_t2_functions_generalities_graphs',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 11, difficulty);

		// Plotted parabola f(x) = -(x - h)^2 + M on [h-2, h+2]
		const h = rng.pick([-1, 0, 1, 2]);
		const M = rng.pick([3, 4, 5]);
		const xLeft = h - 2;
		const xRight = h + 2;
		const yEnds = M - 4;
		const yMid = M - 1;
		const bQuad = 2 * h;
		const cQuad = M - h * h;

		const bPart = bQuad === 0 ? '' : bQuad > 0 ? `+ ${bQuad}x` : `- ${Math.abs(bQuad)}x`;
		const cPart = cQuad === 0 ? '' : cQuad > 0 ? `+ ${cQuad}` : `- ${Math.abs(cQuad)}`;
		const fExpr = `-x^2 ${bPart} ${cPart}`.replace(/\s+/g, ' ').trim();

		const curveSvg = svgFunctionCurvePlot({
			xMin: xLeft - 1,
			xMax: xRight + 1,
			yMin: Math.min(-2, yEnds - 1),
			yMax: M + 1,
			fn: (x) => -(x - h) * (x - h) + M,
			curveLabel: '(C_f)',
			points: [
				{ x: xLeft, y: yEnds, label: `A(${xLeft},${yEnds})`, color: '#15803d' },
				{ x: h - 1, y: yMid, label: `B(${h - 1},${yMid})`, color: '#2563eb' },
				{ x: h, y: M, label: `S(${h},${M})`, color: '#dc2626' },
				{ x: h + 1, y: yMid, label: `C(${h + 1},${yMid})`, color: '#2563eb' },
				{ x: xRight, y: yEnds, label: `D(${xRight},${yEnds})`, color: '#15803d' }
			]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t2_domain_graph_${difficulty}_s${seed}`, curveSvg);

		// Second function g(x) for domain question
		const coefDen = difficulty === 'easy' ? 1 : rng.pick([2, 3]);
		const xForb = rng.pick([-3, -2, 2, 3, 4]);
		const constDen = -coefDen * xForb;
		const denStr = linFactor(coefDen, constDen);
		const numG = rng.pick([2, 3, 5]);

		const domKatex = `$\\mathbb{R} \\setminus \\{${xForb}\\}$`;
		const qd = buildMcqData(
			domKatex,
			`إجابة صحيحة! ينعدم المقام عند $${denStr} = 0$ أي $x = ${xForb}$، لذا نستثني $${xForb}$ فقط.`,
			[
				{
					text: `$\\mathbb{R} \\setminus \\{${-xForb}\\}$`,
					diagnosticFeedback: 'تحقق من إشارة الحل عند نقل الحد الثابت إلى الطرف الآخر.'
				},
				{
					text: `$[${xForb} ; +\\infty[$`,
					diagnosticFeedback: 'هذا شرط دالة جذر تربيعي وليس دالة كسرية؛ في الكسر نستثني القيمة المعدمة للمقام فقط.'
				},
				{
					text: `$\\mathbb{R}$`,
					diagnosticFeedback: 'لا يمكن القسمة على صفر، لذا فالقيمة التي تعدم المقام مرفوضة.'
				},
				{
					text: `$\\mathbb{R} \\setminus \\{${constDen}\\}$`,
					diagnosticFeedback: coefDen === 1 ? 'راجع علامة الحل في المعادلة.' : `نسيت القسمة على معامل $x$ وهو $${coefDen}$.`
				}
			],
			rng
		);

		const gTypst = `frac(${numG}, ${denStr})`;
		const gKatex = `\\frac{${numG}}{${denStr}}`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `الجزء الأول: يمثل الشكل المرفق المنحنى البياني $(C_f)$ للدالة $f$ المعرفة على المجال $[${xLeft} ; ${xRight}]$ بالدستور $f(x) = ${fExpr}$ .`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: `المنحنى البياني $(C_f)$ على المجال $[${xLeft} ; ${xRight}]$`
				},
				{
					type: 'text',
					content: `1) احسب صور الأعداد $${xLeft}$ ، $${h}$ و $${xRight}$ بالدالة $f$ جبرياً.`,
					answer: `1) بالتعويض في $f(x) = ${fExpr}$:\n\n- $f(${xLeft}) = ${yEnds}$\n\n- $f(${h}) = ${M}$\n\n- $f(${xRight}) = ${yEnds}$`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) بقراءة بيانية، عيّن سوابق العدد $${yMid}$ بالدالة $f$، ثم حل بيانياً المعادلة $f(x) = ${yEnds}$ .`,
					answer: `2) - سوابق العدد $${yMid}$ هي فواصل نقط تقاطع المنحنى مع المستقيم $y = ${yMid}$، ونجد: $x = ${h - 1}$ و $x = ${h + 1}$ .\n\n- حلول المعادلة $f(x) = ${yEnds}$ هي: $S = { ${xLeft} , ${xRight} }$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) نعتبر الدالة $g$ المعرفة بـ $g(x) = ${gTypst}$ . عيّن مجموعة تعريفها $D_g$ .`,
					answer: `3) تكون $g(x)$ معرفة إذا وفقط إذا كان $${denStr} != 0$ أي $x != ${xForb}$ .\n\nومنه: $D_g = bb(R) backslash { ${xForb} } = ]-oo ; ${xForb}[ union ]${xForb} ; +oo[$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) أوجد جبرياً سابقة العدد $${numG}$ بالدالة $g$ .`,
					answer: `4) نحل المعادلة $g(x) = ${numG}$ أي $frac(${numG}, ${denStr}) = ${numG}$ ومنه $${denStr} = 1$ .\n\nنجد $x = ${fracTypst(1 - constDen, coefDen)}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي مجموعة تعريف الدالة $g(x) = ${gKatex}$ ؟`,
				questionTextAr: `ما هي مجموعة تعريف الدالة $g$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'التمثيل البياني للدالة (C_f)',
				questionData: qd,
				explanation: `الدالة الكسرية $g$ معرفة عندما يكون المقام غير معدوم: $${denStr} \\neq 0 \\iff x \\neq ${xForb}$ ، إذن $D_g = \\mathbb{R} \\setminus \\{${xForb}\\}$ .`
			},
			sujetExercise,
			hints: [
				`لحساب صورة عدد نعوضه مكان $x$ في دستور الدالة.`,
				`بيانياً، سوابق $k$ هي فواصل نقط تقاطع المنحنى مع المستقيم الأفقي $y = k$.`,
				`في الدالة الكسرية نشترط أن يكون المقام مختلفاً عن الصفر.`
			],
			solutionStepsAr: [
				`الصور: $f(${xLeft}) = ${yEnds}$ ، $f(${h}) = ${M}$ ، $f(${xRight}) = ${yEnds}$.`,
				`سوابق $${yMid}$ هما $${h - 1}$ و $${h + 1}$.`,
				`مجموعة تعريف $g$ هي $D_g = \\mathbb{R} \\setminus \\{${xForb}\\}$، وسابقة $${numG}$ هي $${fracKatex(1 - constDen, coefDen)}$.`
			],
			finalAnswer: `\\mathbb{R} \\setminus \\{${xForb}\\}`
		};
	}
};

// ===========================================================================
// 2. Monotonicity, Variation Table & Extrema (with Curve + Table SVGs)
// ===========================================================================

const tplVariationTableExtrema: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_variation_table_extrema',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'اتجاه تغير دالة وجدول التغيرات والقيم الحدية',
	curriculumLessonId: 'lesson_1as_tcl_t2_monotonicity_variation_table_extrema',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 22, difficulty);

		const isConcaveDown = difficulty === 'easy' ? true : rng.pick([true, false]);
		const a = isConcaveDown ? -1 : 1;
		const h = rng.pick([-1, 1, 2]);
		const extY = isConcaveDown ? rng.pick([3, 4, 5]) : rng.pick([-3, -2, -1]);
		const xLeft = h - 2;
		const xRight = h + 2;
		const yEnds = a * 4 + extY; // at h ± 2: a*(±2)^2 + extY = 4a + extY

		const fn = (x: number) => a * (x - h) * (x - h) + extY;
		const hSign = h > 0 ? `- ${h}` : `+ ${Math.abs(h)}`;
		const y0Sign = extY === 0 ? '' : extY > 0 ? `+ ${extY}` : `- ${Math.abs(extY)}`;
		const fCanon = `${a === -1 ? '-' : ''}(x ${hSign})^2 ${y0Sign}`.trim();

		const bExp = -2 * a * h;
		const cExp = a * h * h + extY;
		const bPart = bExp === 0 ? '' : bExp > 0 ? `+ ${bExp}x` : `- ${Math.abs(bExp)}x`;
		const cPart = cExp === 0 ? '' : cExp > 0 ? `+ ${cExp}` : `- ${Math.abs(cExp)}`;
		const fExpanded = `${a === -1 ? '-x^2' : 'x^2'} ${bPart} ${cPart}`.replace(/\s+/g, ' ').trim();

		const curveSvg = svgFunctionCurvePlot({
			xMin: xLeft - 1,
			xMax: xRight + 1,
			yMin: Math.min(yEnds, extY) - 1,
			yMax: Math.max(yEnds, extY) + 1,
			fn,
			curveLabel: '(C_f)',
			points: [
				{ x: xLeft, y: yEnds, label: `A(${xLeft},${yEnds})`, color: '#1d4ed8' },
				{ x: h, y: extY, label: `S(${h},${extY})`, color: '#dc2626' },
				{ x: xRight, y: yEnds, label: `B(${xRight},${yEnds})`, color: '#1d4ed8' }
			]
		});
		const curveUrl = saveSvgAsset(`1as_tcl_t2_var_curve_${difficulty}_s${seed}`, curveSvg);

		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: 'اتجاه التغير',
			xValues: [`${xLeft}`, `${h}`, `${xRight}`],
			derivativeRow: isConcaveDown
				? [
						{ kind: 'sign', value: '+' },
						{ kind: 'sign', value: '-' }
					]
				: [
						{ kind: 'sign', value: '-' },
						{ kind: 'sign', value: '+' }
					],
			variations: isConcaveDown
				? [
						{ value: `${yEnds}`, position: 'bottom' },
						{ value: `${extY}`, position: 'top' },
						{ value: `${yEnds}`, position: 'bottom' }
					]
				: [
						{ value: `${yEnds}`, position: 'top' },
						{ value: `${extY}`, position: 'bottom' },
						{ value: `${yEnds}`, position: 'top' }
					]
		});
		const tableUrl = saveSvgAsset(`1as_tcl_t2_var_table_${difficulty}_s${seed}`, varTableSvg);

		const extTypeAr = isConcaveDown ? 'عظمى' : 'صغرى';
		const cmpSymbol = isConcaveDown ? '>' : '<';
		const u1 = h + 0.5;
		const u2 = h + 1.5;

		const correctMcq = `$${extY}$ وتبلغها عند $x = ${h}$`;
		const qd = buildMcqData(
			correctMcq,
			`إجابة صحيحة! القيمة الحدية ال${extTypeAr} للدالة $f$ هي $${extY}$ وتبلغها عند $x = ${h}$.`,
			[
				{
					text: `$${h}$ وتبلغها عند $x = ${extY}$`,
					diagnosticFeedback: 'عكست بين قيمة $x$ والقيمة الحدية $f(x)$!'
				},
				{
					text: `$${yEnds}$ وتبلغها عند $x = ${xRight}$`,
					diagnosticFeedback: isConcaveDown
						? 'هذه هي القيمة الصغرى على المجال وليس القيمة الحدية العظمى.'
						: 'هذه هي القيمة العظمى على المجال وليس القيمة الحدية الصغرى.'
				},
				{
					text: `$${extY}$ وتبلغها عند $x = ${-h}$`,
					diagnosticFeedback: `تحقق من معادلة انعدام المربع $x ${hSign} = 0$ .`
				},
				{
					text: `$${extY + (isConcaveDown ? 1 : -1)}$ وتبلغها عند $x = ${h}$`,
					diagnosticFeedback: `احسب $f(${h})$ مباشرة من الشكل النموذجي.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة $f$ المعرفة على المجال $[${xLeft} ; ${xRight}]$ بالدستور $f(x) = ${fExpanded}$ والممثلة بالمنحنى $(C_f)$ المرفق.`,
			content: [
				{
					type: 'image',
					src: curveUrl,
					caption: 'التمثيل البياني للدالة (C_f)'
				},
				{
					type: 'text',
					content: `1) تحقق أنه من أجل كل $x in [${xLeft} ; ${xRight}]$: $f(x) = ${fCanon}$ .`,
					answer: `1) بالنشر:\n\n$${fCanon} = ${a === -1 ? '-' : ''}(x^2 ${-2 * h >= 0 ? '+ ' + -2 * h : '- ' + Math.abs(-2 * h)}x + ${h * h}) ${y0Sign} = ${fExpanded} = f(x)$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) اقرأ اتجاه تغير الدالة $f$ على المجالين $[${xLeft} ; ${h}]$ و $[${h} ; ${xRight}]$، ثم شكّل جدول تغيراتها.`,
					answer: `2) الدالة $f$ ${isConcaveDown ? 'متزايدة تماماً' : 'متناقصة تماماً'} على $[${xLeft} ; ${h}]$ و${isConcaveDown ? 'متناقصة تماماً' : 'متزايدة تماماً'} على $[${h} ; ${xRight}]$.\n\nجدول التغيرات موضح في الشكل المرفق أدناه.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: tableUrl,
					caption: 'جدول تغيرات الدالة f'
				},
				{
					type: 'text',
					content: `3) عيّن القيمة الحدية ال${extTypeAr} للدالة $f$ على $[${xLeft} ; ${xRight}]$ وأثبت ذلك جبرياً.`,
					answer: `3) من أجل كل $x in [${xLeft} ; ${xRight}]$ لدينا $(x ${hSign})^2 >= 0$ ، ومنه $f(x) ${isConcaveDown ? '<=' : '>='} ${extY}$ .\n\nوبما أن $f(${h}) = ${extY}$ فإن القيمة الحدية ال${extTypeAr} هي $${extY}$ وتبلغها الدالة عند $x = ${h}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) قارن دون حساب بين العددين $f(${u1})$ و $f(${u2})$ مع التعليل.`,
					answer: `4) العددان $${u1}$ و $${u2}$ ينتميان إلى المجال $[${h} ; ${xRight}]$ حيث الدالة $f$ ${isConcaveDown ? 'متناقصة تماماً' : 'متزايدة تماماً'}.\n\nوبما أن $${u1} < ${u2}$ فإن $f(${u1}) ${cmpSymbol} f(${u2})$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من منحنى الدالة $f(x) = ${fCanon}$ وجدول تغيراتها على $[${xLeft} ; ${xRight}]$، ما هي القيمة الحدية ال${extTypeAr} للدالة $f$ ؟`,
				questionTextAr: `ما هي القيمة الحدية ال${extTypeAr} للدالة $f$ ؟`,
				imageUrl: tableUrl,
				imageCaption: 'جدول تغيرات الدالة f',
				questionData: qd,
				explanation: `الدالة تبلغ ذروتها ال${extTypeAr} عند $x = ${h}$ بقيمة تساوي $f(${h}) = ${extY}$ .`
			},
			sujetExercise,
			hints: [
				`انشر الشكل النموذجي ${fCanon} باستعمال المتطابقة الشهيرة $(a \\pm b)^2$.`,
				`السهم الصاعد في جدول التغيرات يوافق التزايد والسهم الهابط يوافق التناقص.`,
				`الدالة المتزايدة تحافظ على الترتيب بينما الدالة المتناقصة تعكسه.`
			],
			solutionStepsAr: [
				`النشر يطابق $f(x) = ${fExpanded}$.`,
				`اتجاه التغير يتبدل عند $x = ${h}$ والقيمة الحدية ال${extTypeAr} هي $${extY}$.`,
				`مقارنة الصورتين تعطي $f(${u1}) ${cmpSymbol} f(${u2})$.`
			],
			finalAnswer: `${extY}`
		};
	}
};

// ===========================================================================
// 3. Function Parity & Symmetry (Even / Odd Functions with Curve SVG)
// ===========================================================================

const tplParitySymmetry: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_parity_symmetry',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'شفعية دالة: الدالة الزوجية والفردية وتناظر المنحنى البياني',
	curriculumLessonId: 'lesson_1as_tcl_t2_function_parity_symmetry',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 33, difficulty);

		// Easy -> Even polynomial a*x^2 + c
		// Medium -> Odd polynomial a*x^3 - b*x
		// Hard -> Odd rational k*x / (x^2 + 1) or Even rational k / (x^2 + 1)
		const isEven = difficulty === 'easy' ? true : difficulty === 'medium' ? false : rng.pick([true, false]);

		let fKatex = '';
		let fTypst = '';
		let fMinusKatex = '';
		let fMinusTypst = '';
		let fn: (x: number) => number;
		let testX = 2;
		let testY = 0;
		let yMin = -4;
		let yMax = 5;

		if (difficulty === 'easy') {
			const c = rng.pick([-3, -2, 1, 2]);
			const a = rng.pick([1, -1]);
			fn = (x) => a * x * x + c;
			const cStr = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
			fKatex = `${a === -1 ? '-' : ''}x^2 ${cStr}`;
			fTypst = fKatex;
			fMinusKatex = `${a === -1 ? '-' : ''}(-x)^2 ${cStr} = ${fKatex} = f(x)`;
			fMinusTypst = fMinusKatex;
			testX = 2;
			testY = fn(2);
			yMin = Math.min(-4, fn(0) - 1, fn(2) - 2);
			yMax = Math.max(5, fn(0) + 2, fn(2) + 2);
		} else if (difficulty === 'medium') {
			const b = rng.pick([2, 3, 4]);
			fn = (x) => x * x * x - b * x;
			fKatex = `x^3 - ${b}x`;
			fTypst = `x^3 - ${b}x`;
			fMinusKatex = `(-x)^3 - ${b}(-x) = -x^3 + ${b}x = -(x^3 - ${b}x) = -f(x)`;
			fMinusTypst = fMinusKatex;
			testX = 2;
			testY = fn(2);
			yMin = -5;
			yMax = 5;
		} else if (isEven) {
			const k = rng.pick([2, 4, 6]);
			fn = (x) => k / (x * x + 1);
			fKatex = `\\frac{${k}}{x^2 + 1}`;
			fTypst = `frac(${k}, x^2 + 1)`;
			fMinusKatex = `\\frac{${k}}{(-x)^2 + 1} = \\frac{${k}}{x^2 + 1} = f(x)`;
			fMinusTypst = `frac(${k}, (-x)^2 + 1) = frac(${k}, x^2 + 1) = f(x)`;
			testX = 1;
			testY = fn(1);
			yMin = -1;
			yMax = k + 1;
		} else {
			const k = rng.pick([2, 4, 6]);
			fn = (x) => (k * x) / (x * x + 1);
			fKatex = `\\frac{${k}x}{x^2 + 1}`;
			fTypst = `frac(${k}x, x^2 + 1)`;
			fMinusKatex = `\\frac{${k}(-x)}{(-x)^2 + 1} = -\\frac{${k}x}{x^2 + 1} = -f(x)`;
			fMinusTypst = `frac(${k}(-x), (-x)^2 + 1) = -frac(${k}x, x^2 + 1) = -f(x)`;
			testX = 1;
			testY = fn(1);
			yMin = -(k / 2) - 1;
			yMax = k / 2 + 1;
		}

		const parityWord = isEven ? 'زوجية' : 'فردية';
		const symmetryText = isEven ? 'محور التراتيب (Oy)' : 'مبدأ المعلم O';
		const oppY = isEven ? testY : -testY;

		const curveSvg = svgFunctionCurvePlot({
			xMin: -3,
			xMax: 3,
			yMin,
			yMax,
			fn,
			curveLabel: '(C_f)',
			points: [
				{ x: -testX, y: oppY, label: `A'(${-testX},${oppY})`, color: '#2563eb' },
				{ x: testX, y: testY, label: `A(${testX},${testY})`, color: '#dc2626' }
			]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t2_parity_${difficulty}_s${seed}`, curveSvg);

		const correctOpt = isEven
			? 'دالة زوجية، ومنحناها متناظر بالنسبة لمحور التراتيب'
			: 'دالة فردية، ومنحناها متناظر بالنسبة لمبدأ المعلم $O$';
		const qd = buildMcqData(
			correctOpt,
			`إجابة صحيحة! $D_f = \\mathbb{R}$ متناظرة بالنسبة إلى $0$، و $${fMinusKatex}$، فهي ${parityWord}.`,
			[
				{
					text: isEven
						? 'دالة فردية، ومنحناها متناظر بالنسبة لمبدأ المعلم $O$'
						: 'دالة زوجية، ومنحناها متناظر بالنسبة لمحور التراتيب',
					diagnosticFeedback: `تحقق من حساب $f(-x)$: نجد $${fMinusKatex}$.`
				},
				{
					text: 'ليست زوجية ولا فردية لأن مجموعة التعريف غير متناظرة',
					diagnosticFeedback: 'الدالة معرفة على $\\mathbb{R}$ بأكملها، وهي مجموعة متناظرة بالنسبة إلى الصفر.'
				},
				{
					text: isEven
						? 'دالة زوجية، ومنحناها متناظر بالنسبة لمحور الفواصل'
						: 'دالة فردية، ومنحناها متناظر بالنسبة لمحور الفواصل',
					diagnosticFeedback: 'منحنى الدالة الزوجية يتناظر بالنسبة لمحور التراتيب (وليس الفواصل)، والفردية بالنسبة لمبدأ المعلم $O$.'
				},
				{
					text: 'دالة زوجية وفردية في آن واحد',
					diagnosticFeedback: 'الدالة المعدومة فقط تكون زوجية وفردية في آن واحد.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$ ، والممثلة جزئياً في الشكل المرفق.`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: 'التمثيل البياني للدالة (C_f)'
				},
				{
					type: 'text',
					content: `1) تحقق من أن مجموعة تعريف الدالة $f$ متناظرة بالنسبة إلى الصفر.`,
					answer: `1) الدالة معرفة على $D_f = bb(R)$ . من أجل كل $x in bb(R)$ فإن $-x in bb(R)$ ، إذن $D_f$ متناظرة بالنسبة إلى الصفر.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب $f(-x)$ بدلالة $x$، ثم استنتج شفعية الدالة $f$ .`,
					answer: `2) $f(-x) = ${fMinusTypst}$ .\n\nإذن الدالة $f$ **${parityWord}** على $bb(R)$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) ما هو التفسير الهندسي لهذه الشفعية على المنحنى $(C_f)$ ؟`,
					answer: `3) بما أن الدالة $f$ ${parityWord} فإن المنحنى $(C_f)$ متناظر بالنسبة إلى **${symmetryText}**.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) علماً أن $f(${testX}) = ${testY}$ ، استنتج دون حساب مباشر قيمة $f(${-testX})$ .`,
					answer: `4) بما أن $f$ ${parityWord} فإن:\n\n$f(${-testX}) = ${isEven ? 'f(' + testX + ')' : '-f(' + testX + ')'} = ${oppY}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `لتكن الدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$ . حدد شفعيتها وتناظر منحناها $(C_f)$ :`,
				questionTextAr: `ما هي شفعية الدالة $f$ وتناظر منحناها؟`,
				imageUrl: svgPath,
				imageCaption: 'التمثيل البياني للدالة (C_f)',
				questionData: qd,
				explanation: `$D_f = \\mathbb{R}$ متناظرة بالنسبة إلى $0$ و $${fMinusKatex}$ ، إذن $f$ ${parityWord} ومنحناها متناظر بالنسبة إلى ${symmetryText}.`
			},
			sujetExercise,
			hints: [
				`تحقق أولاً من أنه إذا كان $x \\in D_f$ فإن $-x \\in D_f$.`,
				`عوض $x$ بـ $(-x)$ وتذكر أن $(-x)^2 = x^2$ و $(-x)^3 = -x^3$.`,
				`الزوجية تعطي التناظر بالنسبة لمحور التراتيب، والفردية بالنسبة للمبدأ $O$.`
			],
			solutionStepsAr: [
				`$D_f = \\mathbb{R}$ متناظرة بالنسبة إلى الصفر.`,
				`حساب $f(-x) = ${isEven ? 'f(x)' : '-f(x)'}$ يثبت أن $f$ ${parityWord}.`,
				`التناظر بالنسبة إلى ${symmetryText}، و $f(${-testX}) = ${oppY}$.`
			],
			finalAnswer: parityWord
		};
	}
};

// ===========================================================================
// 4. First-Degree Equations, Inequalities & Sign Table
// ===========================================================================

const tplEquationsInequalitiesSign: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_equations_inequalities_sign',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'algebra',
	titleAr: 'المعادلات والمتراجحات من الدرجة الأولى وجدول الإشارة',
	curriculumLessonId: 'lesson_1as_tcl_t2_linear_equations_inequalities_sign_table',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 44, difficulty);

		// Factor 1: a1 * x + b1 with integer root r1
		// Factor 2: a2 * x + b2 with integer root r2 (r1 < r2)
		const r1 = rng.int(-3, 0);
		const r2 = rng.int(1, 4);
		const a1 = difficulty === 'easy' ? 1 : rng.pick([1, 2]);
		const a2 = difficulty === 'easy' ? 1 : rng.pick([-1, 1, -2]);
		const b1 = -a1 * r1;
		const b2 = -a2 * r2;

		const f1Str = linFactor(a1, b1);
		const f2Str = linFactor(a2, b2);
		const prodStr = `(${f1Str})(${f2Str})`;

		// Overall sign of a1 * a2
		const prodSignPositive = a1 * a2 > 0; // if positive: + outside [r1, r2], - inside [r1, r2]
		const targetIneq = rng.pick(['<=', '>='] as const);

		// Solution set of P(x) <= 0 or P(x) >= 0
		const isMiddleSolution =
			(prodSignPositive && targetIneq === '<=') || (!prodSignPositive && targetIneq === '>=');

		const solKatex = isMiddleSolution
			? `$[${r1} ; ${r2}]$`
			: `$]-\\infty ; ${r1}] \\cup [${r2} ; +\\infty[$`;
		const solTypst = isMiddleSolution
			? `[${r1} ; ${r2}]`
			: `]-oo ; ${r1}] union [${r2} ; +oo[`;

		const otherKatex = isMiddleSolution
			? `$]-\\infty ; ${r1}] \\cup [${r2} ; +\\infty[$`
			: `$[${r1} ; ${r2}]$`;

		// Linear equation for part 1: c1*x + d1 = c2*x + d2 with solution xEq
		const xEq = rng.int(2, 6);
		const kEq = rng.pick([2, 3]);
		const rhsConst = kEq * xEq - 5;

		const lineSvg = svgFunctionCurvePlot({
			xMin: r1 - 2,
			xMax: r2 + 2,
			yMin: -4,
			yMax: 4,
			fn: (x) => a1 * x + b1,
			curveLabel: `y=${f1Str}`,
			points: [{ x: r1, y: 0, label: `(${r1},0)`, color: '#dc2626' }]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t2_sign_line_${difficulty}_s${seed}`, lineSvg);

		const ineqKatex = targetIneq === '<=' ? '\\leq 0' : '\\geq 0';
		const ineqTypst = targetIneq === '<=' ? '<= 0' : '>= 0';

		const qd = buildMcqData(
			solKatex,
			`إجابة صحيحة! بعد دراسة إشارة العاملين في جدول الإشارة نجد أن $${prodStr} ${ineqKatex}$ على ${solKatex}.`,
			[
				{
					text: otherKatex,
					diagnosticFeedback: 'عكست الإشارة في جدول إشارة الجداء؛ انتبه إلى إشارة معامل $x$ في كل عامل.'
				},
				{
					text: isMiddleSolution ? `$]${r1} ; ${r2}[$` : `$]-\\infty ; ${r1}[ \\cup ]${r2} ; +\\infty[$`,
					diagnosticFeedback: 'بما أن المتراجحة تتضمن المساواة ($\\leq$ أو $\\geq$) يجب غلق الأقواس عند الجذرين.'
				},
				{
					text: `$[${-r2} ; ${-r1}]$`,
					diagnosticFeedback: 'أخطأت في إشارة الجذرين عند حل $ax + b = 0$.'
				},
				{
					text: `$\\{${r1} ; ${r2}\\}$`,
					diagnosticFeedback: 'المجموعة $\\{r_1 ; r_2\\}$ هي حلول المعادلة $P(x) = 0$ وليس المتراجحة.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر العبارة الجبرية $P(x) = ${prodStr}$ ، ويمثل الشكل المرفق المستقيم ذا المعادلة $y = ${f1Str}$ .`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: `التمثيل البياني للعبارة ${f1Str}`
				},
				{
					type: 'text',
					content: `1) حل في $bb(R)$ المعادلة من الدرجة الأولى: $${kEq + 1}x - 5 = x + ${rhsConst}$ .`,
					answer: `1) ننقل المجاهيل إلى طرف والمعاليم إلى طرف:\n\n$${kEq + 1}x - x = ${rhsConst} + 5 arrow.r.double ${kEq}x = ${kEq * xEq} arrow.r.double x = ${xEq}$ .\n\nمجموعة الحلول هي $S = { ${xEq} }$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) حل في $bb(R)$ المعادلة $P(x) = 0$ .`,
					answer: `2) بتطبيق خاصية الجداء المعدوم:\n\n$${f1Str} = 0$ أو $${f2Str} = 0$ ، ومنه $x = ${r1}$ أو $x = ${r2}$ .\n\nإذن $S = { ${r1} ; ${r2} }$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) ادرس إشارة كل من العاملين $${f1Str}$ و $${f2Str}$، ثم لخص إشارة $P(x)$ على $bb(R)$ .`,
					answer: `3) - العامل $${f1Str}$ ($a_1 = ${a1} > 0$) سالب على $]-oo ; ${r1}[$ وموجب على $]${r1} ; +oo[$.\n\n- العامل $${f2Str}$ ($a_2 = ${a2} ${a2 > 0 ? '> 0' : '< 0'}$) ${a2 > 0 ? 'سالب قبل ' + r2 + ' وموجب بعده' : 'موجب قبل ' + r2 + ' وسالب بعده'}.\n\n- بالجداء: تكون $P(x)$ ${prodSignPositive ? 'موجبة خارج المجال [' + r1 + ' ; ' + r2 + '] وسالبة داخله' : 'سالبة خارج المجال [' + r1 + ' ; ' + r2 + '] وموجبة داخله'}.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `4) استنتج في $bb(R)$ مجموعة حلول المتراجحة $P(x) ${ineqTypst}$ .`,
					answer: `4) من دراسة الإشارة، مجموعة حلول المتراجحة $P(x) ${ineqTypst}$ هي: $S = ${solTypst}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `باستعمال جدول الإشارة، ما هي مجموعة حلول المتراجحة $${prodStr} ${ineqKatex}$ في $\\mathbb{R}$ ؟`,
				questionTextAr: `ما هي مجموعة حلول المتراجحة $${prodStr} ${ineqKatex}$ ؟`,
				imageUrl: svgPath,
				imageCaption: `التمثيل البياني للعبارة ${f1Str}`,
				questionData: qd,
				explanation: `ينعدم العاملان عند $${r1}$ و $${r2}$ . بضرب إشارتي العاملين في جدول الإشارة نجد أن $${prodStr} ${ineqKatex}$ على ${solKatex} .`
			},
			sujetExercise,
			hints: [
				`لحل معادلة الجداء المعدوم نساوي كل عامل بالصفر على حدة.`,
				`إشارة $ax + b$ تكون عكس إشارة $a$ قبل الجذر ونفس إشارة $a$ بعد الجذر.`,
				`في جدول إشارة الجداء نضرب إشارة السطر الأول في إشارة السطر الثاني في كل مجال.`
			],
			solutionStepsAr: [
				`حل المعادلة الأولى هو $x = ${xEq}$ وحلول $P(x) = 0$ هي $\\{${r1} ; ${r2}\\}$.`,
				`دراسة إشارة العاملين وتكوين جدول إشارة $P(x)$.`,
				`حلول المتراجحة $P(x) ${ineqKatex}$ هي ${solKatex}.`
			],
			finalAnswer: solKatex.replace(/\$/g, '')
		};
	}
};

// ===========================================================================
// 5. Linear Systems of 2 Equations & Problem Modeling
// ===========================================================================

const tplLinearSystemModeling: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_linear_system_modeling',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'algebra',
	titleAr: 'جمل معادلتين خطيتين بمجهولين وترييض مشكلات حياتية',
	curriculumLessonId: 'lesson_1as_tcl_t2_linear_systems_modeling_problems',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 55, difficulty);

		// Construct integer solution (x0, y0) representing book/notebook prices (in 100 DA)
		const x0 = rng.int(2, 6);
		const y0 = rng.int(1, 5);
		const safeY0 = y0 === x0 ? y0 + 1 : y0;

		// Two lines:
		// L1: a1*x + y = c1  -> y = -a1*x + c1
		// L2: a2*x - y = c2  -> y = a2*x - c2
		const a1 = difficulty === 'easy' ? 1 : rng.pick([1, 2]);
		const a2 = difficulty === 'hard' ? rng.pick([2, 3]) : 1;
		const c1 = a1 * x0 + safeY0;
		const c2 = a2 * x0 - safeY0;
		// Determinant: a1*(-1) - a2*(1) = -(a1 + a2) != 0
		const det = -(a1 + a2);

		const eq1 = `${a1 === 1 ? 'x' : `${a1}x`} + y = ${c1}`;
		const eq2 = `${a2 === 1 ? 'x' : `${a2}x`} - y = ${c2}`;

		const planeSvg = svgCartesianPlane({
			xMin: -1,
			xMax: Math.max(7, x0 + 2),
			yMin: -2,
			yMax: Math.max(8, c1 + 1),
			lines: [
				{ a: -a1, b: c1, label: eq1, color: '#2563eb' },
				{ a: a2, b: -c2, label: eq2, color: '#16a34a' }
			],
			points: [{ x: x0, y: safeY0, label: `M(${x0},${safeY0})`, color: '#dc2626' }]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t2_sys_${difficulty}_s${seed}`, planeSvg);

		const correctPair = `$(${x0} ; ${safeY0})$`;
		const qd = buildMcqData(
			correctPair,
			`إجابة صحيحة! بجمع المعادلتين نجد $${a1 + a2}x = ${c1 + c2} \\implies x = ${x0}$ وبالتعويض $y = ${safeY0}$.`,
			[
				{
					text: `$(${safeY0} ; ${x0})$`,
					diagnosticFeedback: 'عكست الترتيب بين $x$ و $y$ في الثنائية المرتبة!'
				},
				{
					text: `$(${x0} ; ${-safeY0})$`,
					diagnosticFeedback: 'تحقق من إشارة $y$ عند التعويض في إحدى المعادلتين.'
				},
				{
					text: `$(${x0 + 1} ; ${safeY0 - 1})$`,
					diagnosticFeedback: 'عوض هذه الثنائية في المعادلتين: لا تحقق المعادلة الثانية.'
				},
				{
					text: `$(${x0 - 1} ; ${safeY0 + 1})$`,
					diagnosticFeedback: 'تحقق من مجموع الطرف الأيمن عند جمع المعادلتين.'
				}
			],
			rng
		);

		const bookPrice = x0 * 100;
		const penPrice = safeY0 * 100;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الجملة $(S)$ ذات المجهولين الحقيقيين $(x ; y)$: $cases(${eq1}, ${eq2})$`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: 'التمثيل البياني لمستقيمي الجملة'
				},
				{
					type: 'text',
					content: `1) بيّن أن الجملة $(S)$ تقبل حلاً وحيداً في $bb(R)^2$ .`,
					answer: `1) نحسب محدد الجملة: $a b' - a' b = (${a1})(-1) - (${a2})(1) = ${det} != 0$ .\n\nإذن الجملة تقبل حلاً وحيداً.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) حل الجملة $(S)$ جبرياً بطريقة الجمع أو التعويض.`,
					answer: `2) بجمع المعادلتين طرفاً لطرف نحذف $y$:\n\n$(${a1} + ${a2})x = ${c1} + (${c2}) arrow.r.double ${a1 + a2}x = ${c1 + c2} arrow.r.double x = ${x0}$ .\n\nنعوض في المعادلة الأولى: $${a1}(${x0}) + y = ${c1} arrow.r.double y = ${c1} - ${a1 * x0} = ${safeY0}$ .\n\nإذن الحل الوحيد هو الثنائية $(${x0} ; ${safeY0})$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) أعط تفسيراً بيانياً لهذا الحل بالاعتماد على الشكل المرفق.`,
					answer: `3) الحل $(${x0} ; ${safeY0})$ يمثل إحداثيي نقطة تقاطع المستقيمين الممثلين للمعادلتين في المعلم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) *ترييض مشكلة:* اشترى تلميذ ${a1 === 1 ? 'كتاباً واحداً' : a1 + ' كتب'} وعلبة أقلام بمبلغ $${c1 * 100} upright("DA")$ ، بينما يزيد ثمن ${a2 === 1 ? 'الكتاب الواحد' : a2 + ' كتب'} على ثمن علبة الأقلام بمبلغ $${c2 * 100} upright("DA")$ . استنتج ثمن الكتاب الواحد وثمن علبة الأقلام.`,
					answer: `4) بوضع $x$ ثمن الكتاب بمئات الدنانير و $y$ ثمن علبة الأقلام بمئات الدنانير، نعود إلى نفس الجملة $(S)$ .\n\nنجد $x = ${x0}$ أي ثمن الكتاب $${bookPrice} upright("DA")$ ، و $y = ${safeY0}$ أي ثمن علبة الأقلام $${penPrice} upright("DA")$ .`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هو حل جملة المعادلتين $\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}$ في $\\mathbb{R}^2$ ؟`,
				questionTextAr: `ما هو حل جملة المعادلتين؟`,
				imageUrl: svgPath,
				imageCaption: 'تقاطع المستقيمين في المستوي',
				questionData: qd,
				explanation: `بجمع المعادلتين طرفاً لطرف نتخلص من $y$: $(${a1} + ${a2})x = ${c1 + c2} \\implies x = ${x0}$، ثم نعوض في الأولى فنجد $y = ${safeY0}$ .`
			},
			sujetExercise,
			hints: [
				`تحقق من المحدد $ab' - a'b \\neq 0$ لإثبات وجود حل وحيد.`,
				`بما أن معاملي $y$ متعاكسان ($+1$ و $-1$) فطريقة الجمع تحذفه مباشرة.`,
				`في المسألة اقسم جميع الأسعار على $100$ للعودة إلى نفس معاملات الجملة.`
			],
			solutionStepsAr: [
				`المحدد $${det} \\neq 0$ فالجملة تقبل حلاً وحيداً.`,
				`بالجمع $x = ${x0}$ وبالتعويض $y = ${safeY0}$، فالحل هو $(${x0} ; ${safeY0})$.`,
				`ثمن الكتاب $${bookPrice}$ DA وثمن علبة الأقلام $${penPrice}$ DA.`
			],
			finalAnswer: `(${x0} ; ${safeY0})`
		};
	}
};

// ===========================================================================
// 6. Integration Problem (المسألة الشاملة — 8 Points)
// ===========================================================================

const tplT2IntegrationProblem: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t2_integration_problem',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'المسألة الشاملة: دراسة بيانية وجبرية وترييض مسألة تسيير معرض ثقافي',
	curriculumLessonId: 'lesson_1as_tcl_t2_monotonicity_variation_table_extrema',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 66, difficulty);

		const alpha = rng.pick([2, 3, 4]);
		const beta = rng.pick([0, 2, 3]);
		const maxM = alpha * alpha + beta;
		const domMax = 2 * alpha;
		const delta = alpha >= 3 ? rng.pick([1, 2]) : 1;
		const kVal = maxM - delta * delta;
		const r1 = alpha - delta;
		const r2 = alpha + delta;

		const fTypst = `-x^2 + ${2 * alpha}x ${beta > 0 ? '+ ' + beta : ''}`.trim();
		const fKatex = fTypst;

		const curveSvg = svgFunctionCurvePlot({
			xMin: -1,
			xMax: domMax + 1,
			yMin: Math.min(-1, beta - 1),
			yMax: maxM + 2,
			fn: (x) => -(x - alpha) * (x - alpha) + maxM,
			curveLabel: '(C_f)',
			points: [
				{ x: 0, y: beta, label: `A(0,${beta})`, color: '#15803d' },
				{ x: alpha, y: maxM, label: `S(${alpha},${maxM})`, color: '#dc2626' },
				{ x: domMax, y: beta, label: `B(${domMax},${beta})`, color: '#15803d' }
			]
		});
		const curveUrl = saveSvgAsset(`1as_tcl_t2_int_curve_${difficulty}_s${seed}`, curveSvg);

		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: 'اتجاه التغير',
			xValues: ['0', `${alpha}`, `${domMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: `${beta}`, position: 'bottom' },
				{ value: `${maxM}`, position: 'top' },
				{ value: `${beta}`, position: 'bottom' }
			]
		});
		const tableUrl = saveSvgAsset(`1as_tcl_t2_int_table_${difficulty}_s${seed}`, varTableSvg);

		// Part 3 subscription comparison: Plan A: y1 = 200x + 400, Plan B: y2 = 300x -> equal at x = 4
		const planX = 4;
		const planCost = 1200;

		const qd = buildMcqData(
			`$[${r1} ; ${r2}]$`,
			`إجابة صحيحة! يقع المنحنى فوق أو على المستقيم $y = ${kVal}$ على المجال $[${r1} ; ${r2}]$.`,
			[
				{
					text: `$[0 ; ${r1}] \\cup [${r2} ; ${domMax}]$`,
					diagnosticFeedback: 'على هذين المجالين يكون المنحنى **تحت** المستقيم $y = ' + kVal + '$ أي $f(x) \\leq ' + kVal + '$.'
				},
				{
					text: `$]${r1} ; ${r2}[$`,
					diagnosticFeedback: 'بما أن المتراجحة غير تامة ($\\geq$) فيجب غلق طرفي المجال.'
				},
				{
					text: `$[0 ; ${alpha}]$`,
					diagnosticFeedback: `المجال $[0 ; ${alpha}]$ هو مجال تزايد الدالة، وليس حل المتراجحة $f(x) \\geq ${kVal}$.`
				},
				{
					text: `$\\{${r1} ; ${r2}\\}$`,
					diagnosticFeedback: `هذه حلول المعادلة $f(x) = ${kVal}$ فقط وليس المتراجحة.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'المسألة الشاملة (8 نقاط)',
			instruction: `ينظم نادي القراءة بالثانوية معرضاً للكتب، وتُنمذج المداخيل الصافية (بآلاف الدنانير DA) خلال أيام العرض $x in [0 ; ${domMax}]$ بالدالة $f(x) = ${fTypst}$ الممثلة بالمنحنى $(C_f)$ .`,
			content: [
				{
					type: 'image',
					src: curveUrl,
					caption: `المنحنى البياني $(C_f)$ على المجال $[0 ; ${domMax}]$`
				},
				{
					type: 'text',
					content: `*الجزء الأول: الدراسة الجبرية وجدول التغيرات (3 نقاط)*\n\n1) تحقق أنه من أجل كل $x in [0 ; ${domMax}]$: $f(x) = -(x - ${alpha})^2 + ${maxM}$ .\n\n2) احسب $f(0)$ ، $f(${alpha})$ و $f(${domMax})$ ، ثم شكّل جدول تغيرات الدالة $f$ .\n\n3) حدد القيمة الحدية العظمى لمداخيل المعرض وأي يوم تتحقق فيه.`,
					answer: `1) بالنشر: $-(x - ${alpha})^2 + ${maxM} = -(x^2 - ${2 * alpha}x + ${alpha * alpha}) + ${maxM} = ${fTypst} = f(x)$ .\n\n2) $f(0) = ${beta}$ ، $f(${alpha}) = ${maxM}$ ، $f(${domMax}) = ${beta}$ . وجدول التغيرات موضح في الشكل أدناه.\n\n3) القيمة الحدية العظمى هي $${maxM}$ ألف دينار (أي $${maxM * 1000} upright("DA")$) وتتحقق في اليوم $x = ${alpha}$ .`,
					mark: '3'
				},
				{
					type: 'image',
					src: tableUrl,
					caption: 'جدول تغيرات الدالة f'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: القراءة البيانية (2.5 نقطة)*\n\n1) بقراءة بيانية، حل في $[0 ; ${domMax}]$ المعادلة $f(x) = ${kVal}$ .\n\n2) استنتج بيانياً مجموعة حلول المتراجحة $f(x) >= ${kVal}$ ، وفسر النتيجة في سياق المعرض.`,
					answer: `1) يتقاطع المنحنى $(C_f)$ مع المستقيم $y = ${kVal}$ في نقطتين فاصلتاهما $x = ${r1}$ و $x = ${r2}$ ، إذن $S = { ${r1} ; ${r2} }$ .\n\n2) حلول المتراجحة $f(x) >= ${kVal}$ هي المجال $S = [${r1} ; ${r2}]$ ، أي أن المداخيل لا تقل عن $${kVal * 1000} upright("DA")$ بين اليوم $${r1}$ واليوم $${r2}$ .`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `*الجزء الثالث: ترييض مسألة اشتراك (2.5 نقطة)*\n\nيُقترح على زوار المعرض صيغتان لاستعارة الكتب: الصيغة (1) بمبلغ $200 x + 400$ دج، والصيغة (2) بمبلغ $300 x$ دج حيث $x$ عدد الكتب المستعارة.\n\n1) أوجد عدد الكتب $x$ الذي تتساوى عنده الصيغتان في التكلفة، وما قيمتها؟\n\n2) متى تكون الصيغة (1) أفضل من الصيغة (2)؟`,
					answer: `1) نحل $200 x + 400 = 300 x arrow.r.double 100 x = 400 arrow.r.double x = ${planX}$ كتب، والتكلفة عندئذ هي $${planCost} upright("DA")$ .\n\n2) تكون الصيغة (1) أفضل إذا كان $200 x + 400 < 300 x$ أي $x > ${planX}$ (ابتداءً من $5$ كتب فما فوق).`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من المنحنى البياني للدالة $f(x) = ${fKatex}$ على $[0 ; ${domMax}]$، ما هي مجموعة حلول المتراجحة $f(x) \\geq ${kVal}$ ؟`,
				questionTextAr: `ما هي مجموعة حلول المتراجحة $f(x) \\geq ${kVal}$ بيانياً؟`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني للدالة (C_f)',
				questionData: qd,
				explanation: `نرسم المستقيم الأفقي $y = ${kVal}$ فيقطع المنحنى عند $x = ${r1}$ و $x = ${r2}$، ويكون المنحنى فوق هذا المستقيم على المجال $[${r1} ; ${r2}]$ .`
			},
			sujetExercise,
			hints: [
				`انشر الشكل $-(x - \\alpha)^2 + M$ للتحقق من المساواة.`,
				`حلول $f(x) \\geq k$ بيانياً هي فواصل أجزاء المنحنى الواقعة فوق المستقيم $y = k$.`,
				`لمقارنة الصيغتين حل المتراجحة $200x + 400 < 300x$.`
			],
			solutionStepsAr: [
				`إثبات $f(x) = -(x - ${alpha})^2 + ${maxM}$ والقيمة العظمى $${maxM}$.`,
				`حلول $f(x) \\geq ${kVal}$ هي المجال $[${r1} ; ${r2}]$.`,
				`تتساوى الصيغتان عند $${planX}$ كتب بمبلغ $${planCost}$ DA، وتكون الصيغة (1) أفضل عند $x > ${planX}$.`
			],
			finalAnswer: `[${r1} ; ${r2}]`
		};
	}
};

export const TEMPLATES_1AS_TCL_T2: ParameterizedTemplate[] = [
	tplFunctionDomainImages,
	tplVariationTableExtrema,
	tplParitySymmetry,
	tplEquationsInequalitiesSign,
	tplLinearSystemModeling,
	tplT2IntegrationProblem
];
