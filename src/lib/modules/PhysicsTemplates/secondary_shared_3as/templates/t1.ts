import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgPhysicsCurvePlot,
	svgTitrationSetup
} from '../../svg-physics';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	PhysicsSecondaryTrackId,
	QuizQuestionPayload
} from '../../types';

type TrackTag = PhysicsSecondaryTrackId | '3as_shared';

function makeTrackMeta(track: TrackTag) {
	const grade: PhysicsSecondaryTrackId = track === '3as_shared' ? '3as_se' : track;
	const lessonPrefix = `phy_lesson_${track === '3as_shared' ? '3as_shared' : track}`;
	return { grade, lessonPrefix };
}

export function createSharedPhysicsTemplates3asT1(
	track: TrackTag = '3as_shared'
): PhysicsParameterizedTemplate[] {
	const { grade, lessonPrefix } = makeTrackMeta(track);

	// ─────────────────────────────────────────────────────────────────────────
	// 1. Experimental Chemical Kinetics via Titration & ICE Table (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplKineticsTitrationIce: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_kinetics_titration_ice`,
		grade,
		trimesterId: 't1',
		domain: 'kinetics_eq',
		titleAr: 'التمرين التجريبي: المتابعة الزمنية عن طريق المعايرة اللونية وجدول التقدم',
		curriculumLessonId: `${lessonPrefix}_t1_kinetics_progress_methods`,
		defaultPoints: 6,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const V1 = rng.pick([50, 100]); // mL
			const V2 = V1;
			const VT_mL = V1 + V2;
			const VT_L = VT_mL / 1000;
			const C2 = rng.pick([0.04, 0.05, 0.08, 0.1]); // mol/L S2O8^2- (limiting)
			const mult = rng.pick([3, 4, 5]);
			const C1 = roundTo(mult * C2, 3); // mol/L I- (in excess since n1/2 = mult*n2/2 > n2)
			const n1_mmol = roundTo(C1 * V1, 2);
			const n2_mmol = roundTo(C2 * V2, 2);
			const xmax_mmol = n2_mmol;
			const tauMin = rng.pick([8, 10, 12, 15]);
			const tHalfMin = roundTo(tauMin * Math.LN2, 2);
			const vVol0 = roundTo(xmax_mmol / (VT_L * tauMin), 2); // mmol/(L.min)

			const eqMain = chemEquation(
				[
					{ coeff: 2, formula: 'I-', state: 'aq' },
					{ formula: 'S2O8^2-', state: 'aq' }
				],
				[
					{ formula: 'I2', state: 'aq' },
					{ coeff: 2, formula: 'SO4^2-', state: 'aq' }
				]
			);
			const eqTitration = chemEquation(
				[
					{ formula: 'I2', state: 'aq' },
					{ coeff: 2, formula: 'S2O3^2-', state: 'aq' }
				],
				[
					{ coeff: 2, formula: 'I-', state: 'aq' },
					{ formula: 'S4O6^2-', state: 'aq' }
				]
			);

			const ice = buildIceTable({
				equation: eqMain,
				speciesHeaders: [
					chemSpecies('I-'),
					chemSpecies('S2O8^2-'),
					chemSpecies('I2'),
					chemSpecies('SO4^2-')
				],
				initial: [
					{ katex: `$${n1_mmol}$`, typst: `$${n1_mmol}$` },
					{ katex: `$${n2_mmol}$`, typst: `$${n2_mmol}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' }
				],
				intermediate: [
					{ katex: `$${n1_mmol} - 2x$`, typst: `$${n1_mmol} - 2x$` },
					{ katex: `$${n2_mmol} - x$`, typst: `$${n2_mmol} - x$` },
					{ katex: '$x$', typst: '$x$' },
					{ katex: '$2x$', typst: '$2x$' }
				],
				final: [
					{ katex: `$${roundTo(n1_mmol - 2 * xmax_mmol, 2)}$`, typst: '$........$' },
					{ katex: '$0$', typst: '$........$' },
					{ katex: `$${xmax_mmol}$`, typst: '$........$' },
					{ katex: `$${roundTo(2 * xmax_mmol, 2)}$`, typst: '$........$' }
				],
				finalAnswers: [
					{ katex: `$${roundTo(n1_mmol - 2 * xmax_mmol, 2)}$`, typst: `$${roundTo(n1_mmol - 2 * xmax_mmol, 2)}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: `$${xmax_mmol}$`, typst: `$${xmax_mmol}$` },
					{ katex: `$${roundTo(2 * xmax_mmol, 2)}$`, typst: `$${roundTo(2 * xmax_mmol, 2)}$` }
				]
			});

			const yTop = Math.ceil(xmax_mmol * 1.25);
			const tMax = tauMin * 4;
			const curveSvg = svgPhysicsCurvePlot({
				title: 'تطور تقدم التفاعل x(t) بدلالة الزمن',
				xMin: 0,
				xMax: tMax,
				yMin: 0,
				yMax: yTop,
				xStep: tauMin,
				yStep: roundTo(yTop / 5, 2),
				xLabel: 't (min)',
				yLabel: 'x (mmol)',
				curves: [
					{
						fn: (t) => xmax_mmol * (1 - Math.exp(-t / tauMin)),
						color: '#2563eb',
						label: 'x(t)'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: xmax_mmol, x2: tMax, y2: xmax_mmol, color: '#475569', label: `x_max = ${xmax_mmol}`, labelPos: 'top' },
					{ x1: 0, y1: 0, x2: tauMin, y2: xmax_mmol, color: '#d97706', label: 'المماس عند t=0', labelPos: 'left' },
					{ x1: 0, y1: roundTo(xmax_mmol / 2, 2), x2: tHalfMin, y2: roundTo(xmax_mmol / 2, 2), color: '#dc2626' },
					{ x1: tHalfMin, y1: 0, x2: tHalfMin, y2: roundTo(xmax_mmol / 2, 2), color: '#dc2626' }
				],
				points: [
					{ x: tauMin, y: xmax_mmol, label: `(${tauMin}, ${xmax_mmol})`, color: '#d97706' },
					{ x: tHalfMin, y: roundTo(xmax_mmol / 2, 2), label: `t₁/₂ ≈ ${tHalfMin}`, color: '#dc2626' }
				]
			});
			const setupSvg = svgTitrationSetup({
				titrantLabel: 'محلول S₂O₃²⁻',
				analyteLabel: 'عينة I₂ + ماء مثلج',
				sensorLabel: 'حمام جليدي'
			});

			const curveUrl = savePhysicsSvgAsset(`phy_${track}_t1_kinetics_curve_${difficulty}_s${seed}`, curveSvg);
			const setupUrl = savePhysicsSvgAsset(`phy_${track}_t1_kinetics_setup_${difficulty}_s${seed}`, setupSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${xmax_mmol}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نمزج $V_1 = ${V1}\\text{ mL}$ من محلول يود البوتاسيوم ($C_1 = ${C1}\\text{ mol/L}$) مع $V_2 = ${V2}\\text{ mL}$ من بيروكسوديكبريتات البوتاسيوم ($C_2 = ${C2}\\text{ mol/L}$) وفق: ${eqMain.katex}. احسب التقدم الأعظمي $x_{\\max}$ بوحدة $\\text{mmol}$.`,
					questionTextAr: 'احسب قيمة التقدم الأعظمي $x_{\\max}$ (بوحدة $\\text{mmol}$):',
					imageUrl: curveUrl,
					imageCaption: 'منحنى تطور التقدم x(t)',
					questionData: { answer: xmax_mmol, displayTemplate: 'x_max = ? mmol', variables: [], tolerance: 0.05 },
					explanation: `$n_1(\\ce{I-}) = ${n1_mmol}\\text{ mmol}$ و $n_2(\\ce{S2O8^2-}) = ${n2_mmol}\\text{ mmol}$. بما أن $\\frac{n_1}{2} = ${roundTo(n1_mmol / 2, 2)} > ${n2_mmol}$ فإن $\\ce{S2O8^2-}$ محد و $x_{\\max} = ${xmax_mmol}\\text{ mmol}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${vVol0} mmol/(L·min)`;
				const mcq = buildUniqueMcqOptions(
					`$${vVol0}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$`,
					[
						{
							text: `$${roundTo(xmax_mmol / tauMin, 2)}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$`,
							diagnosticFeedback: `نسيت القسمة على الحجم الكلي للمزيج $V_T = ${VT_L}\\text{ L}$.`
						},
						{
							text: `$${roundTo(vVol0 / 2, 2)}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$`,
							diagnosticFeedback: 'استعملت نصف التقدم أو أخطأت في حساب ميل المماس.'
						},
						{
							text: `$${roundTo(vVol0 * 2, 2)}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$`,
							diagnosticFeedback: 'تلك سرعة اختفاء $\\ce{I-}$ وليس السرعة الحجمية للتفاعل.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التفاعل ${eqMain.katex} بحجم كلي $V_T = ${VT_mL}\\text{ mL}$، يقطع المماس للمنحنى $x(t)$ عند $t = 0$ الخط المقارب $x_{\\max} = ${xmax_mmol}\\text{ mmol}$ عند $t = ${tauMin}\\text{ min}$. ما قيمة السرعة الحجمية الابتدائية $v_{\\text{vol}}(0)$؟`,
					questionTextAr: 'اختر قيمة السرعة الحجمية الابتدائية للتفاعل $v_{\\text{vol}}(0)$:',
					imageUrl: curveUrl,
					imageCaption: 'تعيين السرعة الحجمية الابتدائية بالمماس',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$v_{\\text{vol}}(0) = \\frac{1}{V_T}\\left(\\frac{dx}{dt}\\right)_0 = \\frac{1}{${VT_L}} \\times \\frac{${xmax_mmol}}{${tauMin}} = ${vVol0}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.`
				};
			} else {
				finalAnswer = `${tHalfMin}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يمثل المنحنى المرفق تطور $x(t)$ لتفاعل تام تقدمه الأعظمي $x_{\\max} = ${xmax_mmol}\\text{ mmol}$ مع $x(t) = x_{\\max}(1 - e^{-t/${tauMin}})$. احسب زمن نصف التفاعل $t_{1/2}$ بوحدة الدقيقة ($\\text{min}$).`,
					questionTextAr: 'احسب زمن نصف التفاعل $t_{1/2}$ (بوحدة $\\text{min}$):',
					imageUrl: curveUrl,
					imageCaption: 'منحنى x(t) لتعيين t_{1/2}',
					questionData: { answer: tHalfMin, displayTemplate: 't_{1/2} = ? min', variables: [], tolerance: 0.15 },
					explanation: `عند $t = t_{1/2}$: $x(t_{1/2}) = \\frac{x_{\\max}}{2} \\implies 1 - e^{-t_{1/2}/${tauMin}} = 0.5 \\implies t_{1/2} = ${tauMin}\\ln 2 \\approx ${tHalfMin}\\text{ min}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: عند اللحظة $t = 0$، نمزج في بيشر حجماً $V_1 = ${V1} upright("mL")$ من محلول يود البوتاسيوم $(upright("K")^+ + upright("I")^-)$ تركيزه $C_1 = ${C1} upright("mol/L")$ مع حجم $V_2 = ${V2} upright("mL")$ من محلول بيروكسوديكبريتات البوتاسيوم $(2 upright("K")^+ + upright("S")_2 upright("O")_8^(2-))$ تركيزه $C_2 = ${C2} upright("mol/L")$. ننمذج التحول البطيء بالمعادلة: ${eqMain.typst}.\nللمتابعة الزمنية نأخذ عينات متساوية ونضعها في الماء المثلج قبل معايرة ثنائي اليود المتشكل بمحلول ثيوكبريتات الصوديوم وفق: ${eqTitration.typst}.`,
				content: [
					{
						type: 'columns',
						widths: ['1.2fr', '1fr'],
						children: [
							{
								type: 'image',
								src: setupUrl,
								caption: 'التركيب التجريبي للمعايرة اللونية'
							},
							{
								type: 'image',
								src: curveUrl,
								caption: 'منحنى تطور التقدم $x(t)$ بدلالة الزمن'
							}
						]
					},
					{
						type: 'text',
						content: '1) ما الغرض من إضافة الماء المثلج إلى العينات المأخوذة قبل المعايرة؟ وما الزجاجية المستعملة لإضافة المحلول المعايِر؟',
								answer: '1) إضافة الماء المثلج (السقي الفيزيائي) تهدف إلى خفض درجة الحرارة والتمديد لتوقيف التفاعل مؤقتاً وتثبيت كمية $"I"_2$ المتشكلة. الزجاجية المستعملة لإضافة المحلول المعايِر هي السحاحة المدرجة.',
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب كميتي المادة الابتدائيتين للمتفاعلين بوحدة $upright("mmol")$، ثم أكمل جدول التقدم أدناه وحدد المتفاعل المحد و $x_max$.`,
						answer: `2) $n_1("I"^-) = C_1 V_1 = ${n1_mmol} upright("mmol")$ و $n_2("S"_2"O"_8^(2-)) = C_2 V_2 = ${n2_mmol} upright("mmol")$. بما أن $frac(${n1_mmol}, 2) = ${roundTo(n1_mmol / 2, 2)} > ${n2_mmol}$ فإن المتفاعل المحد هو $"S"_2"O"_8^(2-)$ و $x_max = ${xmax_mmol} upright("mmol")$.`,
						mark: '1.5'
					},
					ice.typstBlock,
					{
						type: 'text',
						content: `3) عرّف السرعة الحجمية للتفاعل، ثم احسب قيمتها الابتدائية $v_"vol"(0)$ بوحدة $upright("mmol") dot upright("L")^(-1) dot upright("min")^(-1)$ باستغلال المماس عند $t = 0$ المبين على المنحنى.`,
						answer: `3) $v_"vol"(t) = frac(1, V_T) frac(dif x, dif t)$. من المماس عند $t = 0$ (يمر بـ $(0,0)$ و $(${tauMin}, ${xmax_mmol})$) ومع $V_T = ${VT_L} upright("L")$:\n$v_"vol"(0) = frac(1, ${VT_L}) times frac(${xmax_mmol} - 0, ${tauMin} - 0) = ${vVol0} upright("mmol") dot upright("L")^(-1) dot upright("min")^(-1)$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) عرّف زمن نصف التفاعل $t_(1/2)$ وعيّن قيمته بيانياً، ثم اذكر عاملاً حركياً يقلص $t_(1/2)$ دون تغيير $x_max$.`,
						answer: `4) $t_(1/2)$ هو المدة الزمنية اللازمة لبلوغ التقدم نصف قيمته النهائية ($x(t_(1/2)) = frac(x_max, 2) = ${roundTo(xmax_mmol / 2, 2)} upright("mmol")$). بالإسقاط على البيان نجد $t_(1/2) approx ${tHalfMin} upright("min")$.\nرفع درجة الحرارة أو إضافة وسيط مناسب يقلص $t_(1/2)$ دون تغيير $x_max$.`,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر أن المتفاعل المحد يوافق النسبة الأصغر من كمية المادة الابتدائية على المعامل الستوكيومتري.',
					`احسب السرعة الحجمية عند $t=0$ بقسمة ميل المماس على الحجم الكلي $V_T = ${VT_L}\\text{ L}$.`,
					`عند $t = t_{1/2}$ يكون $x(t_{1/2}) = x_{\\max}/2 = ${roundTo(xmax_mmol / 2, 2)}\\text{ mmol}$.`
				],
				solutionStepsAr: [
					`كميتا المادة: $n_1 = ${n1_mmol}\\text{ mmol}$ و $n_2 = ${n2_mmol}\\text{ mmol} \\implies x_{\\max} = ${xmax_mmol}\\text{ mmol}$.`,
					`السرعة الحجمية الابتدائية: $v_{\\text{vol}}(0) = \\frac{${xmax_mmol}}{${VT_L} \\times ${tauMin}} = ${vVol0}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.`,
					`زمن نصف التفاعل: $t_{1/2} \\approx ${tHalfMin}\\text{ min}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. Kinetics via Conductimetry or Gas Pressure (5 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplKineticsConductimetryGas: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_kinetics_conductimetry_gas`,
		grade,
		trimesterId: 't1',
		domain: 'kinetics_eq',
		titleAr: 'المتابعة الزمنية عن طريق قياس ضغط الغاز أو الناقلية النوعية',
		curriculumLessonId: `${lessonPrefix}_t1_reaction_rates_half_life_factors`,
		defaultPoints: 5,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const V_mL = rng.pick([100, 200]);
			const V_L = V_mL / 1000;
			const C = rng.pick([0.1, 0.2, 0.3]); // mol/L H3O+
			const nH3O_mmol = roundTo(C * V_mL, 2);
			// Mg in excess: x_max = nH3O / 2
			const xmax_mmol = roundTo(nH3O_mmol / 2, 2);
			const xmax_mol = roundTo(xmax_mmol / 1000, 5);
			const mMg_g = roundTo(xmax_mol * 24.3 + 0.5, 2); // excess Mg (M = 24.3 g/mol)
			const Vg_L = rng.pick([0.5, 1.0]);
			const T_K = 300;
			const R_gas = 8.314;
			// P_max (hPa) = x_max(mol) * R * T / V_g(m^3) / 100
			const Pmax_kPa = roundTo((xmax_mol * R_gas * T_K) / (Vg_L * 1e-3) / 1000, 2);
			const tauS = rng.pick([40, 50, 60]);
			const tHalfS = roundTo(tauS * Math.LN2, 1);

			const eqMg = chemEquation(
				[
					{ formula: 'Mg', state: 's' },
					{ coeff: 2, formula: 'H3O+', state: 'aq' }
				],
				[
					{ formula: 'Mg^2+', state: 'aq' },
					{ formula: 'H2', state: 'g' },
					{ coeff: 2, formula: 'H2O', state: 'l' }
				]
			);

			const iceMg = buildIceTable({
				equation: eqMg,
				speciesHeaders: [
					chemSpecies('Mg'),
					chemSpecies('H3O+'),
					chemSpecies('Mg^2+'),
					chemSpecies('H2'),
					chemSpecies('H2O')
				],
				initial: [
					{ katex: '$n_0(\\ce{Mg})$', typst: '$n_0("Mg")$' },
					{ katex: `$${nH3O_mmol}$`, typst: `$${nH3O_mmol}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' },
					{ katex: 'بوفرة', typst: 'بوفرة' }
				],
				intermediate: [
					{ katex: '$n_0(\\ce{Mg}) - x$', typst: '$n_0("Mg") - x$' },
					{ katex: `$${nH3O_mmol} - 2x$`, typst: `$${nH3O_mmol} - 2x$` },
					{ katex: '$x$', typst: '$x$' },
					{ katex: '$x$', typst: '$x$' },
					{ katex: 'بوفرة', typst: 'بوفرة' }
				],
				final: [
					{ katex: 'بزيادة', typst: 'بزيادة' },
					{ katex: '$0$', typst: '$........$' },
					{ katex: `$${xmax_mmol}$`, typst: '$........$' },
					{ katex: `$${xmax_mmol}$`, typst: '$........$' },
					{ katex: 'بوفرة', typst: 'بوفرة' }
				],
				finalAnswers: [
					{ katex: 'بزيادة', typst: 'بزيادة' },
					{ katex: '$0$', typst: '$0$' },
					{ katex: `$${xmax_mmol}$`, typst: `$${xmax_mmol}$` },
					{ katex: `$${xmax_mmol}$`, typst: `$${xmax_mmol}$` },
					{ katex: 'بوفرة', typst: 'بوفرة' }
				]
			});

			const yMaxPlot = Math.ceil(Pmax_kPa * 1.2);
			const svgP = svgPhysicsCurvePlot({
				title: 'تطور ضغط غاز ثنائي الهيدروجين P_H₂(t)',
				xMin: 0,
				xMax: tauS * 4,
				yMin: 0,
				yMax: yMaxPlot,
				xStep: tauS,
				yStep: roundTo(yMaxPlot / 5, 1),
				xLabel: 't (s)',
				yLabel: 'ΔP (kPa)',
				curves: [
					{
						fn: (t) => Pmax_kPa * (1 - Math.exp(-t / tauS)),
						color: '#2563eb',
						label: 'ΔP(t)'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: Pmax_kPa, x2: tauS * 4, y2: Pmax_kPa, color: '#475569', label: `ΔP_max = ${Pmax_kPa} kPa`, labelPos: 'top' },
					{ x1: 0, y1: roundTo(Pmax_kPa / 2, 2), x2: tHalfS, y2: roundTo(Pmax_kPa / 2, 2), color: '#dc2626' },
					{ x1: tHalfS, y1: 0, x2: tHalfS, y2: roundTo(Pmax_kPa / 2, 2), color: '#dc2626' }
				],
				points: [{ x: tHalfS, y: roundTo(Pmax_kPa / 2, 2), label: `t₁/₂ ≈ ${tHalfS} s`, color: '#dc2626' }]
			});
			const pUrl = savePhysicsSvgAsset(`phy_${track}_t1_gas_pressure_${difficulty}_s${seed}`, svgP);

			const vVol0_mmol = roundTo(xmax_mmol / (V_L * tauS), 2);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${xmax_mmol}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نضع كتلة زائدة $m = ${mMg_g}\\text{ g}$ من المغنيزيوم في $V = ${V_mL}\\text{ mL}$ من محلول حمض كلور الهيدروجين تركيزه $C = ${C}\\text{ mol/L}$ وفق: ${eqMg.katex}. احسب $x_{\\max}$ بوحدة $\\text{mmol}$.`,
					questionTextAr: 'احسب التقدم الأعظمي $x_{\\max}$ (بوحدة $\\text{mmol}$):',
					imageUrl: pUrl,
					questionData: { answer: xmax_mmol, displayTemplate: 'x_max = ? mmol', variables: [], tolerance: 0.05 },
					explanation: `بما أن $\\ce{Mg}$ بزيادة، المتفاعل المحد هو $\\ce{H3O+}$ ومنه $x_{\\max} = \\frac{C V}{2} = \\frac{${nH3O_mmol}}{2} = ${xmax_mmol}\\text{ mmol}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${Pmax_kPa}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `ينطلق غاز $\\ce{H2}$ بتقدم أعظمي $x_{\\max} = ${xmax_mmol}\\text{ mmol}$ داخل حوجلة حجم الغاز فيها $V_g = ${Vg_L}\\text{ L}$ عند $T = ${T_K}\\text{ K}$. احسب الضغط الأعظمي $\\Delta P_{\\max}$ بوحدة $\\text{kPa}$ ($R = 8.314\\text{ SI}$).`,
					questionTextAr: 'احسب $\\Delta P_{\\max}$ (بوحدة $\\text{kPa}$):',
					imageUrl: pUrl,
					questionData: { answer: Pmax_kPa, displayTemplate: 'ΔP_max = ? kPa', variables: [], tolerance: 0.5 },
					explanation: `$\\Delta P_{\\max} = \\frac{x_{\\max} R T}{V_g} = \\frac{${xmax_mol} \\times 8.314 \\times ${T_K}}{${Vg_L}\\times 10^{-3}} \\approx ${roundTo(Pmax_kPa * 1000, 0)}\\text{ Pa} = ${Pmax_kPa}\\text{ kPa}$.`
				};
			} else {
				finalAnswer = 'تنقص الناقلية لأن λ(H₃O⁺) > λ(Mg²⁺)/2';
				const mcq = buildUniqueMcqOptions(
					'تتناقص الناقلية النوعية $\\sigma(t)$ لأن شوارد $\\ce{H3O+}$ ذات الموصلية العالية تُستهلك',
					[
						{
							text: 'تزداد الناقلية النوعية $\\sigma(t)$ لأن شوارد $\\ce{Mg^2+}$ تتحرر في المحلول',
							diagnosticFeedback: 'انتبه لموازنة الشحنات: استهلاك $2\\ce{H3O+}$ يعطي $1\\ce{Mg^2+}$، و $2\\lambda(\\ce{H3O+}) = 70 > \\lambda(\\ce{Mg^2+}) = 10.6$.'
						},
						{
							text: 'تبقى الناقلية النوعية ثابتة لأن الشوارد المتفرجة $\\ce{Cl-}$ تعوّض النقص',
							diagnosticFeedback: 'تركيز الشوارد المتفرجة $\\ce{Cl-}$ ثابت لا يتغير، لكن تراكيز $\\ce{H3O+}$ و $\\ce{Mg^2+}$ تتغير.'
						},
						{
							text: 'تنعدم الناقلية عند نهاية التفاعل تماماً',
							diagnosticFeedback: 'تبقى شوارد $\\ce{Mg^2+}$ و $\\ce{Cl-}$ في المحلول، فلا تنعدم الناقلية.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التفاعل ${eqMg.katex}، كيف تتطور الناقلية النوعية $\\sigma(t)$ للمزيج مع الزمن علماً أن $\\lambda(\\ce{H3O+}) = 35\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ و $\\lambda(\\ce{Mg^2+}) = 10.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$؟`,
					questionTextAr: 'اختر التفسير الصحيح لتطور الناقلية النوعية $\\sigma(t)$:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `معامل $x(t)$ في عبارة $\\sigma(t)$ هو $\\frac{\\lambda(\\ce{Mg^2+}) - 2\\lambda(\\ce{H3O+})}{V} < 0$، لذلك تتناقص $\\sigma(t)$ حتى تثبت عند قيمة غير معدومة.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نضع في حوجلة مغلقة كتلتها الغازية $V_g = ${Vg_L} upright("L")$ كتلة زائدة $m = ${mMg_g} upright("g")$ من شريط المغنيزيوم $"Mg"(s)$ ونضيف إليها حجماً $V = ${V_mL} upright("mL")$ من محلول حمض كلور الهيدروجين تركيزه $C = ${C} upright("mol/L")$ عند درجة حرارة ثابتة $T = ${T_K} upright("K")$. ننمذج التفاعل بالمعادلة: ${eqMg.typst}. ($R = 8.314 upright("SI")$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) أنشئ جدول تقدم التفاعل وحدد المتفاعل المحد، ثم احسب التقدم الأعظمي $x_max$ بوحدة $upright("mmol")$.`,
								answer: `1) بما أن المغنيزيوم مستعمل بزيادة فإن المتفاعل المحد هو شوارد $"H"_3"O"^+$، ومنه $x_max = frac(C V, 2) = frac(${nH3O_mmol}, 2) = ${xmax_mmol} upright("mmol")$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: pUrl,
								caption: 'تطور زيادة الضغط $Delta P(t)$ بدلالة الزمن'
							}
						]
					},
					iceMg.typstBlock,
					{
						type: 'text',
						content: `2) بتطبيق قانون الغازات المثالية، عبّر عن التقدم $x(t)$ بدلالة $Delta P(t)$ و $V_g$ و $R$ و $T$، ثم تحقق من قيمة $Delta P_max$ الظاهرة في المنحنى.`,
						answer: `2) $n("H"_2) = x(t) = frac(Delta P(t) dot V_g, R T)$.\nعند نهاية التفاعل: $Delta P_max = frac(x_max R T, V_g) = frac(${xmax_mol} times 8.314 times ${T_K}, ${Vg_L} times 10^(-3)) approx ${roundTo(Pmax_kPa * 1000, 0)} upright("Pa") = ${Pmax_kPa} upright("kPa")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) عيّن زمن نصف التفاعل $t_(1/2)$ بيانياً، واحسب السرعة الحجمية الابتدائية للتفاعل علماً أن ميل المماس لـ $x(t)$ عند $t=0$ يساوي $frac(x_max, ${tauS})$.`,
						answer: `3) من البيان عند $Delta P = frac(Delta P_max, 2) = ${roundTo(Pmax_kPa / 2, 2)} upright("kPa")$ نجد $t_(1/2) approx ${tHalfS} upright("s")$.\nالسرعة الحجمية الابتدائية: $v_"vol"(0) = frac(1, V) frac(x_max, ${tauS}) = frac(${xmax_mmol}, ${V_L} times ${tauS}) = ${vVol0_mmol} upright("mmol") dot upright("L")^(-1) dot upright("s")^(-1)$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) كيف تتغير سرعة التفاعل وزمن نصف التفاعل إذا أعدنا التجربة بتركيز ابتدائي أكبر $C' > C$ عند نفس درجة الحرارة؟ برّر مجهرياً.`,
						answer: `4) يزداد تواتر التصادمات الفعالة فيرتفع $v_"vol"(0)$ وينقص زمن نصف التفاعل $t_(1/2)$.`,
						mark: '0.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'المغنيزيوم بزيادة، إذن التقدم الأعظمي يُحسب من كمية مادة شوارد الهيدرونيوم.',
					'حوّل الحجم الغازي $V_g$ إلى المتر المكعب ($1\\text{ L} = 10^{-3}\\text{ m}^3$) في قانون الغازات المثالية.',
					'اربط تغير الناقلية النوعية بإشارة $\\lambda(\\ce{Mg^2+}) - 2\\lambda(\\ce{H3O+})$.'
				],
				solutionStepsAr: [
					`$x_{\\max} = \\frac{C V}{2} = ${xmax_mmol}\\text{ mmol}$.`,
					`$\\Delta P_{\\max} = \\frac{x_{\\max} R T}{V_g} \\approx ${Pmax_kPa}\\text{ kPa}$.`,
					`$t_{1/2} \\approx ${tHalfS}\\text{ s}$ و $v_{\\text{vol}}(0) = ${vVol0_mmol}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{s}^{-1}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. Kepler's Laws & Satellite Orbits (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplKeplerSatellites: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_kepler_satellites`,
		grade,
		trimesterId: 't1',
		domain: 'mechanics',
		titleAr: 'حركة الأقمار الاصطناعية وقوانين كبلر',
		curriculumLessonId: `${lessonPrefix}_t1_newton_laws_kepler_satellites`,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const G = 6.67e-11;
			const RT_km = 6380;
			const MT = 5.97e24;
			const h_km = rng.pick([620, 820, 1220, 2020, 35800]);
			const r_km = RT_km + h_km;
			const r_m = r_km * 1000;
			const v_ms = Math.sqrt((G * MT) / r_m);
			const v_kms = roundTo(v_ms / 1000, 2);
			const T_s = (2 * Math.PI * r_m) / v_ms;
			const T_min = roundTo(T_s / 60, 1);
			const T_h = roundTo(T_s / 3600, 2);
			const keplerSlope = (4 * Math.PI * Math.PI) / (G * MT); // ~9.91e-14 s^2/m^3

			// Linear curve T^2 (10^7 s^2) vs r^3 (10^20 m^3)
			const r3_max = 12; // × 10^20 m^3
			const slopeScaled = roundTo(keplerSlope * 1e13, 2); // 9.91 => T^2(10^7) = 0.991 * r^3(10^20)
			const svgKepler = svgPhysicsCurvePlot({
				title: 'البيان T² = f(r³) لأقمار اصطناعية حول الأرض',
				xMin: 0,
				xMax: r3_max,
				yMin: 0,
				yMax: 12,
				xStep: 3,
				yStep: 3,
				xLabel: 'r³ (10²⁰ m³)',
				yLabel: 'T² (10⁷ s²)',
				curves: [
					{
						fn: (x) => (slopeScaled / 10) * x,
						color: '#2563eb',
						label: 'T² = k·r³'
					}
				],
				points: [
					{ x: 10, y: roundTo(slopeScaled, 2), label: `(10 ; ${roundTo(slopeScaled, 2)})`, color: '#dc2626' }
				]
			});
			const keplerUrl = savePhysicsSvgAsset(`phy_${track}_t1_kepler_${difficulty}_s${seed}`, svgKepler);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${v_kms}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يدور قمر اصطناعي حول الأرض في مدار دائري على ارتفاع $h = ${h_km}\\text{ km}$ (نصف قطر الأرض $R_T = ${RT_km}\\text{ km}$، $G = 6.67\\times 10^{-11}\\text{ SI}$، $M_T = 5.97\\times 10^{24}\\text{ kg}$). احسب سرعته المدارية $v$ بوحدة $\\text{km/s}$.`,
					questionTextAr: 'احسب السرعة المدارية $v$ (بوحدة $\\text{km/s}$):',
					imageUrl: keplerUrl,
					questionData: { answer: v_kms, displayTemplate: 'v = ? km/s', variables: [], tolerance: 0.1 },
					explanation: `$r = R_T + h = ${r_km}\\text{ km} = ${r_m.toExponential(3)}\\text{ m}$، ومنه $v = \\sqrt{\\frac{G M_T}{r}} \\approx ${v_kms}\\text{ km/s}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${T_min} min`;
				const mcq = buildUniqueMcqOptions(
					`$${T_min}\\text{ min}$`,
					[
						{
							text: `$${roundTo(T_min * 2, 1)}\\text{ min}$`,
							diagnosticFeedback: 'راجع العلاقة $T = \\frac{2\\pi r}{v}$ وتأكد من التحويل إلى الدقائق.'
						},
						{
							text: `$${roundTo(T_min / 2, 1)}\\text{ min}$`,
							diagnosticFeedback: 'أغفلت العامل $2$ في محيط الدائرة $2\\pi r$.'
						},
						{
							text: `$${roundTo(T_s / 100, 1)}\\text{ min}$`,
							diagnosticFeedback: 'للتحويل من الثانية إلى الدقيقة نقسم على $60$ وليس $100$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `قمر اصطناعي يدور حول الأرض على ارتفاع $h = ${h_km}\\text{ km}$ بسرعة مدارية $v = ${v_kms}\\text{ km/s}$ ($R_T = ${RT_km}\\text{ km}$). ما قيمة دوره المداري $T$ بالدقائق؟`,
					questionTextAr: 'اختر قيمة الدور المداري $T$:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$T = \\frac{2\\pi (R_T + h)}{v} = \\frac{2\\pi \\times ${r_km}}{${v_kms}} \\approx ${Math.round(T_s)}\\text{ s} \\approx ${T_min}\\text{ min}$.`
				};
			} else {
				finalAnswer = '5.97e24 kg';
				const mcq = buildUniqueMcqOptions(
					`$5.97\\times 10^{24}\\text{ kg}$`,
					[
						{
							text: `$1.51\\times 10^{23}\\text{ kg}$`,
							diagnosticFeedback: 'نسيت التربيع في $4\\pi^2$ عند حساب $M_T = \\frac{4\\pi^2}{G k}$.'
						},
						{
							text: `$2.39\\times 10^{25}\\text{ kg}$`,
							diagnosticFeedback: 'تحقق من تحويل الوحدات في الميل $k = \\frac{\\Delta T^2}{\\Delta r^3}$.'
						},
						{
							text: `$6.67\\times 10^{24}\\text{ kg}$`,
							diagnosticFeedback: 'تحقق من القسمة $\\frac{4\\pi^2}{G k}$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `يمثل البيان المرفق تغيرات $T^2$ ($10^7\\text{ s}^2$) بدلالة $r^3$ ($10^{20}\\text{ m}^3$) ويمر بالنقطة $(10 ; ${slopeScaled})$. استنتج كتلة الأرض $M_T$ علماً أن $G = 6.67\\times 10^{-11}\\text{ SI}$.`,
					questionTextAr: 'اختر القيمة المستنتجة لكتلة الأرض $M_T$:',
					imageUrl: keplerUrl,
					imageCaption: 'بيان القانون الثالث لكبلر T² = f(r³)',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `ميل المستقيم هو $k = \\frac{${slopeScaled}\\times 10^7}{10\\times 10^{20}} = ${roundTo(slopeScaled / 10, 3)}\\times 10^{-13}\\text{ s}^2/\\text{m}^3$. من القانون الثالث لكبلر $M_T = \\frac{4\\pi^2}{G k} \\approx 5.97\\times 10^{24}\\text{ kg}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `يدور قمر اصطناعي $(S)$ كتلته $m$ حول الأرض في مدار دائري على ارتفاع $h = ${h_km} upright("km")$ عن سطحها.\nنُعطي: نصف قطر الأرض $R_T = ${RT_km} upright("km")$، ثابت الجذب العام $G = 6.67 times 10^(-11) upright("SI")$، وكتلة الأرض $M_T = 5.97 times 10^(24) upright("kg")$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) ما المرجع المناسب لدراسة حركة القمر الاصطناعي؟ وما الفرضية اللازمة لتطبيق القانون الثاني لنيوتن فيه؟ مثّل القوة المطبقة على القمر.',
								answer: '1) المرجع المناسب هو المرجع الجيومركزي (الأرضي المركزي)، ونعتبره غاليلياً خلال مدة الدراسة. القوة الوحيدة هي قوة جذب الأرض $arrow(F)_(T/S)$ الموجهة نحو مركز الأرض.',
								mark: '1'
							},
							{
								type: 'image',
								src: keplerUrl,
								caption: 'البيان $T^2 = f(r^3)$ لمجموعة أقمار اصطناعية'
							}
						]
					},
					{
						type: 'text',
						content: '2) بتطبيق القانون الثاني لنيوتن في معلم فريني، بيّن أن حركة القمر دائرية منتظمة ثم استنتج عبارة السرعة المدارية $v$ بدلالة $G$ و $M_T$ و $r = R_T + h$.',
						answer: '2) بالإسقاط على المماس: $m a_t = 0 arrow.r.double frac(dif v, dif t) = 0 arrow.r.double v = upright("cte")$ (حركة دائرية منتظمة).\nبالإسقاط على الناظم: $m frac(v^2, r) = G frac(M_T m, r^2) arrow.r.double v = sqrt(frac(G M_T, r))$.',
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب السرعة المدارية $v$ والدور المداري $T$ لهذا القمر الاصطناعي.`,
						answer: `3) $r = ${RT_km} + ${h_km} = ${r_km} upright("km") = ${r_m} upright("m")$.\n$v = sqrt(frac(6.67 times 10^(-11) times 5.97 times 10^(24), ${r_m})) approx ${v_kms} upright("km/s")$.\n$T = frac(2 pi r, v) approx ${Math.round(T_s)} upright("s") approx ${T_min} upright("min")$ (${T_h} h).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) أثبت القانون الثالث لكبلر $frac(T^2, r^3) = frac(4 pi^2, G M_T)$، ثم تحقق باستغلال البيان المرفق (النقطة $(10 ; ${slopeScaled})$) من قيمة كتلة الأرض $M_T$.`,
						answer: `4) من $T = frac(2 pi r, v)$ نربع الطرفين: $T^2 = frac(4 pi^2 r^2, G M_T / r) = frac(4 pi^2, G M_T) r^3$.\nميل المستقيم في البيان هو $k = frac(${slopeScaled} times 10^7, 10 times 10^(20)) = ${roundTo(slopeScaled / 10, 3)} times 10^(-13) upright("s"^2/"m"^3)$، وبالمطابقة $M_T = frac(4 pi^2, G k) approx 5.97 times 10^(24) upright("kg")$.`,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'لا تنس جمع نصف قطر الأرض $R_T$ مع الارتفاع $h$ لحساب البعد عن مركز الأرض $r = R_T + h$.',
					'في معلم فريني: التسارع المماسي $a_t = \\frac{dv}{dt}$ والناظمي $a_n = \\frac{v^2}{r}$.',
					'ميل البيان $T^2 = f(r^3)$ يساوي $\\frac{4\\pi^2}{GM_T}$ مع الانتباه إلى قوى العشرة على المحورين.'
				],
				solutionStepsAr: [
					`$r = R_T + h = ${r_km}\\text{ km}$.`,
					`$v = \\sqrt{\\frac{GM_T}{r}} \\approx ${v_kms}\\text{ km/s}$ و $T = \\frac{2\\pi r}{v} \\approx ${T_min}\\text{ min}$.`,
					`بالمطابقة مع البيان $M_T = \\frac{4\\pi^2}{Gk} \\approx 5.97\\times 10^{24}\\text{ kg}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 4. Vertical Fall in a Fluid (Archimedes + Friction f = kv) (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplVerticalFallFluid: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_vertical_fall_fluid`,
		grade,
		trimesterId: 't1',
		domain: 'mechanics',
		titleAr: 'السقوط الشاقولي لجسم صلب في مائع (الاحتكاك الخطي f = kv)',
		curriculumLessonId: `${lessonPrefix}_t1_vertical_fall_friction_freefall`,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const g = 10;
			const m_g = rng.pick([40, 50, 80, 100]);
			const m_kg = m_g / 1000;
			const ratio = rng.pick([0.2, 0.25, 0.4]); // Pi / P = rho_f / rho_s
			const a0 = roundTo(g * (1 - ratio), 2);
			const tau = rng.pick([0.4, 0.5, 0.8, 1.0]);
			const k = roundTo(m_kg / tau, 4);
			const vLim = roundTo(a0 * tau, 2);

			const yMaxPlot = Math.ceil(vLim * 1.25);
			const tMaxPlot = roundTo(tau * 5, 1);
			const svgFall = svgPhysicsCurvePlot({
				title: 'منحنى تطور السرعة v(t) أثناء السقوط الشاقولي في سائل',
				xMin: 0,
				xMax: tMaxPlot,
				yMin: 0,
				yMax: yMaxPlot,
				xStep: tau,
				yStep: roundTo(yMaxPlot / 5, 1),
				xLabel: 't (s)',
				yLabel: 'v (m/s)',
				curves: [
					{
						fn: (t) => vLim * (1 - Math.exp(-t / tau)),
						color: '#2563eb',
						label: 'v(t)'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: vLim, x2: tMaxPlot, y2: vLim, color: '#475569', label: `v_lim = ${vLim} m/s`, labelPos: 'top' },
					{ x1: 0, y1: 0, x2: tau, y2: vLim, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'left' },
					{ x1: tau, y1: 0, x2: tau, y2: vLim, color: '#dc2626' }
				],
				points: [
					{ x: tau, y: vLim, label: `τ = ${tau} s`, color: '#dc2626' },
					{ x: tau, y: roundTo(0.632 * vLim, 2), label: '0.63 v_lim', color: '#059669' }
				]
			});
			const fallUrl = savePhysicsSvgAsset(`phy_${track}_t1_vfall_${difficulty}_s${seed}`, svgFall);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${a0}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تسقط كرية كتلتها $m = ${m_g}\\text{ g}$ بدون سرعة ابتدائية في سائل حيث نسبة الكتلتين الحجميتين $\\frac{\\rho_f}{\\rho_s} = ${ratio}$ ($g = ${g}\\text{ m/s}^2$). احسب التسارع الابتدائي $a_0$ بوحدة $\\text{m/s}^2$.`,
					questionTextAr: 'احسب التسارع الابتدائي $a_0$ (بوحدة $\\text{m/s}^2$):',
					imageUrl: fallUrl,
					questionData: { answer: a0, displayTemplate: 'a₀ = ? m/s²', variables: [], tolerance: 0.05 },
					explanation: `عند $t=0$ تنعدم السرعة فينعدم الاحتكاك، ومنه $a_0 = g\\left(1 - \\frac{\\rho_f}{\\rho_s}\\right) = ${g}(1 - ${ratio}) = ${a0}\\text{ m/s}^2$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${k}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `من منحنى $v(t)$ لكرية كتلتها $m = ${m_g}\\text{ g}$ تخضع لاحتكاك $f = kv$، يقطع المماس عند $t=0$ المقارب الأفقي $v_{\\text{lim}} = ${vLim}\\text{ m/s}$ عند $t = \\tau = ${tau}\\text{ s}$. احسب معامل الاحتكاك $k$ بوحدة $\\text{kg/s}$.`,
					questionTextAr: 'احسب معامل الاحتكاك $k$ (بوحدة $\\text{kg/s}$):',
					imageUrl: fallUrl,
					questionData: { answer: k, displayTemplate: 'k = ? kg/s', variables: [], tolerance: 0.005 },
					explanation: `بما أن $\\tau = \\frac{m}{k}$ فإن $k = \\frac{m}{\\tau} = \\frac{${m_kg}}{${tau}} = ${k}\\text{ kg/s}$.`
				};
			} else {
				finalAnswer = `${roundTo(0.632 * vLim, 2)} m/s`;
				const mcq = buildUniqueMcqOptions(
					`$${roundTo(0.632 * vLim, 2)}\\text{ m/s}$`,
					[
						{
							text: `$${roundTo(0.368 * vLim, 2)}\\text{ m/s}$`,
							diagnosticFeedback: '$0.37\\,v_{\\text{lim}}$ ناتج $v_{\\text{lim}}e^{-1}$ وليس $v_{\\text{lim}}(1 - e^{-1})$.'
						},
						{
							text: `$${roundTo(0.5 * vLim, 2)}\\text{ m/s}$`,
							diagnosticFeedback: '$0.5\\,v_{\\text{lim}}$ تبلغها الكرية عند $t = \\tau\\ln 2$ وليس عند $t = \\tau$.'
						},
						{
							text: `$${vLim}\\text{ m/s}$`,
							diagnosticFeedback: 'السرعة الحدية $v_{\\text{lim}}$ تُبلغ عملياً في النظام الدائم بعد $5\\tau$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `تتغير سرعة كرية وفق $v(t) = ${vLim}(1 - e^{-t/${tau}})$. ما قيمة السرعة عند اللحظة $t = \\tau = ${tau}\\text{ s}$؟`,
					questionTextAr: 'اختر قيمة السرعة $v(\\tau)$:',
					imageUrl: fallUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$v(\\tau) = ${vLim}(1 - e^{-1}) \\approx ${vLim} \\times 0.632 \\approx ${roundTo(0.632 * vLim, 2)}\\text{ m/s}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تُسقط كرية متجانسة كتلتها $m = ${m_g} upright("g")$ وكتلتها الحجمية $rho_s$ بدون سرعة ابتدائية عند $t = 0$ داخل أنبوب مملوء بسائل لزج كتلته الحجمية $rho_f = ${ratio} rho_s$ ($g = ${g} upright("m/s")^2$). تخضع الكرية لثقلها $arrow(P)$، دافعة أرخميدس $arrow(Pi)$، وقوة احتكاك $arrow(f) = -k arrow(v)$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) مثّل القوى المؤثرة على الكرية عند لحظة $t > 0$، ثم بتطبيق القانون الثاني لنيوتن على محور شاقولي موجه نحو الأسفل، أوجد المعادلة التفاضلية لسرعة مركز عطالتها $v(t)$.',
								answer: '1) القوى: $arrow(P)$ نحو الأسفل، $arrow(Pi)$ و $arrow(f)$ نحو الأعلى.\n$P - Pi - f = m frac(dif v, dif t) arrow.r.double frac(dif v, dif t) + frac(k, m) v = g (1 - frac(rho_f, rho_s))$.',
								mark: '1.5'
							},
							{
								type: 'image',
								src: fallUrl,
								caption: 'منحنى السرعة $v(t)$ أثناء السقوط في السائل'
							}
						]
					},
					{
						type: 'text',
						content: '2) باستغلال البيان المرفق، عيّن السرعة الحدية $v_"lim"$ والثابت الزمني $tau$، ثم استنتج التسارع الابتدائي $a_0$ وقارنه بـ $g$. ماذا تستنتج؟',
						answer: `2) من البيان: $v_"lim" = ${vLim} upright("m/s")$ و $tau = ${tau} upright("s")$.\nالتسارع الابتدائي هو ميل المماس عند $t=0$: $a_0 = frac(v_"lim", tau) = frac(${vLim}, ${tau}) = ${a0} upright("m/s")^2 < g$.\nالاستنتاج: دافعة أرخميدس غير مهملة في هذا السائل.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) احسب معامل الاحتكاك $k$ بالتحقق من وحدته بالتحليل البعدي.`,
						answer: `3) $tau = frac(m, k) arrow.r.double k = frac(m, tau) = frac(${m_kg}, ${tau}) = ${k} upright("kg/s")$.\nالتحليل البعدي: $[k] = frac([f], [v]) = frac(upright("M") dot upright("L") dot upright("T")^(-2), upright("L") dot upright("T")^(-1)) = upright("M") dot upright("T")^(-1)$ أي $upright("kg/s")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) متى يبلغ النظام الدائم عملياً؟ وما هي شدة قوة الاحتكاك في النظام الدائم؟`,
						answer: `4) يبلغ النظام الدائم عملياً عند $t approx 5 tau = ${roundTo(5 * tau, 1)} upright("s")$.\nفي النظام الدائم: $f_"lim" = k v_"lim" = ${k} times ${vLim} = ${roundTo(k * vLim, 3)} upright("N")$.`,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تكون دافعة أرخميدس غير مهملة كلما كان التسارع الابتدائي $a_0 < g$.',
					'في النظام الدائم $\\frac{dv}{dt} = 0$ وتصبح السرعة ثابتة تساوي $v_{\\text{lim}}$.',
					'تقاطع المماس عند $t=0$ مع المستقيم المقارب $v = v_{\\text{lim}}$ يعطي $t = \\tau = \\frac{m}{k}$.'
				],
				solutionStepsAr: [
					`المعادلة التفاضلية: $\\frac{dv}{dt} + \\frac{k}{m}v = g\\left(1 - \\frac{\\rho_f}{\\rho_s}\\right) = ${a0}\\text{ m/s}^2$.`,
					`بيانياً: $v_{\\text{lim}} = ${vLim}\\text{ m/s}$ و $\\tau = ${tau}\\text{ s}$.`,
					`معامل الاحتكاك: $k = \\frac{m}{\\tau} = ${k}\\text{ kg/s}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 5. Experimental Free Fall & Chronophotography (6 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplFreefallExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_freefall_kinematics_exp`,
		grade,
		trimesterId: 't1',
		domain: 'mechanics',
		titleAr: 'التمرين التجريبي: دراسة السقوط الحر بالتصوير المتعاقب',
		curriculumLessonId: `${lessonPrefix}_t1_vertical_fall_friction_freefall`,
		defaultPoints: 6,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const g = rng.pick([9.8, 9.81, 10]);
			const dt = 0.1; // s
			const v0 = rng.pick([0, 0.5, 1.0]);
			const times = [0.1, 0.2, 0.3, 0.4, 0.5];
			const speeds = times.map((t) => roundTo(v0 + g * t, 2));
			const tTest = rng.pick([0.4, 0.5]);
			const dropDist = roundTo(0.5 * g * tTest * tTest + v0 * tTest, 3);

			const svgVt = svgPhysicsCurvePlot({
				title: 'البيان التجريبي للسرعة v(t) في السقوط الشاقولي في الهواء',
				xMin: 0,
				xMax: 0.6,
				yMin: 0,
				yMax: Math.ceil(v0 + g * 0.6),
				xStep: 0.1,
				yStep: 1,
				xLabel: 't (s)',
				yLabel: 'v (m/s)',
				curves: [{ fn: (t) => v0 + g * t, color: '#2563eb', label: 'v(t)' }],
				points: times.map((t, i) => ({ x: t, y: speeds[i], label: '', color: '#dc2626' }))
			});
			const vtUrl = savePhysicsSvgAsset(`phy_${track}_t1_freefall_exp_${difficulty}_s${seed}`, svgVt);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${g}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يعطي التصوير المتعاقب لسقوط كرة فولاذية في الهواء الجدول: عند $t_1 = 0.1\\text{ s}$ السرعة $v_1 = ${speeds[0]}\\text{ m/s}$، وعند $t_2 = 0.5\\text{ s}$ السرعة $v_2 = ${speeds[4]}\\text{ m/s}$. احسب تسارع الكرة $a$ بوحدة $\\text{m/s}^2$.`,
					questionTextAr: 'احسب التسارع $a$ (بوحدة $\\text{m/s}^2$):',
					imageUrl: vtUrl,
					questionData: { answer: g, displayTemplate: 'a = ? m/s²', variables: [], tolerance: 0.05 },
					explanation: `$a = \\frac{v_2 - v_1}{t_2 - t_1} = \\frac{${speeds[4]} - ${speeds[0]}}{0.5 - 0.1} = ${g}\\text{ m/s}^2$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${dropDist}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تسقط كرة في السقوط الحر بتسارع $g = ${g}\\text{ m/s}^2$ وبسرعة ابتدائية $v_0 = ${v0}\\text{ m/s}$. احسب المسافة المقطوعة $z$ عند $t = ${tTest}\\text{ s}$ بوحدة المتر ($\\text{m}$).`,
					questionTextAr: 'احسب المسافة المقطوعة $z$ (بوحدة $\\text{m}$):',
					imageUrl: vtUrl,
					questionData: { answer: dropDist, displayTemplate: 'z = ? m', variables: [], tolerance: 0.02 },
					explanation: `$z(t) = \\frac{1}{2} g t^2 + v_0 t = 0.5 \\times ${g} \\times (${tTest})^2 + ${v0} \\times ${tTest} = ${dropDist}\\text{ m}$.`
				};
			} else {
				finalAnswer = `${v0} m/s`;
				const mcq = buildUniqueMcqOptions(
					`$v_0 = ${v0}\\text{ m/s}$`,
					[
						{
							text: `$v_0 = ${roundTo(v0 + 0.5, 2)}\\text{ m/s}$`,
							diagnosticFeedback: 'تحقق من الترتيب عند المبدأ $t = 0$ من البيان أو المعادلة $v(t) = g t + v_0$.'
						},
						{
							text: `$v_0 = ${g}\\text{ m/s}$`,
							diagnosticFeedback: `$${g}$ هو ميل المستقيم (التسارع) وليس السرعة الابتدائية.`
						},
						{
							text: `$v_0 = ${speeds[0]}\\text{ m/s}$`,
							diagnosticFeedback: `$${speeds[0]}$ هي السرعة عند $t = 0.1\\text{ s}$ وليست عند $t = 0$.`
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `من المنحنى التجريبي $v(t)$ الذي يمر بالنقطتين $(0.1\\text{ s}; ${speeds[0]}\\text{ m/s})$ و $(0.5\\text{ s}; ${speeds[4]}\\text{ m/s})$، ما قيمة السرعة الابتدائية $v_0$ عند $t = 0$؟`,
					questionTextAr: 'اختر قيمة السرعة الابتدائية $v_0$:',
					imageUrl: vtUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الميل هو $a = ${g}\\text{ m/s}^2$، ومنه $v_0 = v(0.1) - a\\times 0.1 = ${speeds[0]} - ${roundTo(g * 0.1, 2)} = ${v0}\\text{ m/s}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: لدراسة حركة سقوط كرة معدنية صغيرة ثقيلة في الهواء، سجلنا بالتصوير المتعاقب (بفاصل زمني $tau = ${dt} upright("s")$) قياسات السرعة اللحظية $v(t)$ كما في الجدول والبيان.`,
				content: [
					{
						type: 'table',
						headers: ['$t (upright("s"))$', ...times.map((t) => `$${t}$`)],
						cells: [],
						rows: [['$v (upright("m/s"))$', ...speeds.map((v) => `$${v}$`)]],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'columns',
						widths: ['1.25fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) ما هو البروتوكول التجريبي المتبع لقياس السرعة اللحظية $v_i$ انطلاقاً من شريط التصوير المتعاقب؟',
								answer: '1) نحدد مواضع مركز عطالة الكرة $M_i$ على فواصل زمنية متساوية $tau$، ثم نحسب $v_i = frac(M_(i-1) M_(i+1), 2 tau)$ باستعمال سلم المسافات.',
								mark: '1.25'
							},
							{
								type: 'image',
								src: vtUrl,
								caption: 'التمثيل البياني التجريبي $v(t)$'
							}
						]
					},
					{
						type: 'text',
						content: '2) استنتج من البيان المعادلة البيانية $v(t)$، ثم احسب التسارع $a$ والسرعة الابتدائية $v_0$.',
						answer: `2) البيان خط مستقيم معادلته $v(t) = a t + v_0$.\nالميل: $a = frac(${speeds[4]} - ${speeds[0]}, 0.5 - 0.1) = ${g} upright("m/s")^2$، والترتيب عند المبدأ $v_0 = ${v0} upright("m/s")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) هل يمكن نمذجة هذه الحركة بالسقوط الحر خلال مدة التسجيل؟ برّر إجابتك.',
						answer: `3) نعم، لأن التسارع التجريبي $a = ${g} upright("m/s")^2 approx g$ ثابت، مما يدل على إهمال دافعة أرخميدس والاحتكاك في الهواء لهذه الكرة الثقيلة خلال هذا المجال الزمني القصير.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `4) اكتب المعادلة الزمنية للموضع $z(t)$ ($z(0)=0$) واحسب المسافة المقطوعة عند $t = ${tTest} upright("s")$.`,
						answer: `4) بالتكامل: $z(t) = frac(1, 2) g t^2 + v_0 t = ${roundTo(0.5 * g, 3)} t^2 + ${v0} t$.\nعند $t = ${tTest} upright("s")$: $z(${tTest}) = ${dropDist} upright("m")$.`,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'السرعة المتوسطة بين $M_{i-1}$ و $M_{i+1}$ تعطي السرعة اللحظية في $M_i$: $v_i = \\frac{M_{i-1}M_{i+1}}{2\\tau}$.',
					'ميل المنحنى الخطي $v(t)$ هو التسارع $a$ والترتيب عند $t=0$ هو $v_0$.',
					'المسافة المقطوعة توافق المساحة تحت المنحنى $v(t)$ أو تكامل $v(t)$.'
				],
				solutionStepsAr: [
					`الميل: $a = ${g}\\text{ m/s}^2 \\approx g$ (سقوط حر).`,
					`السرعة الابتدائية: $v_0 = ${v0}\\text{ m/s}$.`,
					`المسافة عند $t = ${tTest}\\text{ s}$: $z = ${dropDist}\\text{ m}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. T1 BAC Integration Synthesis (7 pts, isIntegration)
	// ─────────────────────────────────────────────────────────────────────────
	const tplIntegrationBacT1: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t1_integration_bac`,
		grade,
		trimesterId: 't1',
		domain: 'integration',
		titleAr: 'وضعية إدماجية تحضيرية للبكالوريا (الوحدتان 1 و 2)',
		curriculumLessonId: `${lessonPrefix}_t1_vertical_fall_friction_freefall`,
		defaultPoints: 7,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Part A: Oxalic acid + Permanganate kinetics
			const V1_mL = 50;
			const C1 = rng.pick([0.02, 0.04]); // MnO4-
			const V2_mL = 50;
			const C2 = 0.1; // H2C2O4 (excess)
			const VT_L = (V1_mL + V2_mL) / 1000;
			const n1_mmol = roundTo(C1 * V1_mL, 2);
			const n2_mmol = roundTo(C2 * V2_mL, 2);
			const xmax_mmol = roundTo(n1_mmol / 2, 2); // since n1/2 < n2/5
			const tHalfMin = rng.pick([3.5, 4.0, 5.0]);
			const tauMin = roundTo(tHalfMin / Math.LN2, 2);
			const vVol0 = roundTo(xmax_mmol / (VT_L * tauMin), 2);

			// Part B: Satellite circular orbit around Planet Mars
			const G = 6.67e-11;
			const M_mars = 6.42e23;
			const R_mars_km = 3390;
			const h_km = rng.pick([410, 610, 1010]);
			const r_m = (R_mars_km + h_km) * 1000;
			const v_ms = Math.sqrt((G * M_mars) / r_m);
			const v_kms = roundTo(v_ms / 1000, 2);

			const eqPerm = chemEquation(
				[
					{ coeff: 2, formula: 'MnO4-', state: 'aq' },
					{ coeff: 5, formula: 'H2C2O4', state: 'aq' },
					{ coeff: 6, formula: 'H+', state: 'aq' }
				],
				[
					{ coeff: 2, formula: 'Mn^2+', state: 'aq' },
					{ coeff: 10, formula: 'CO2', state: 'g' },
					{ coeff: 8, formula: 'H2O', state: 'l' }
				]
			);

			const icePerm = buildIceTable({
				equation: eqPerm,
				speciesHeaders: [
					chemSpecies('MnO4-'),
					chemSpecies('H2C2O4'),
					chemSpecies('Mn^2+'),
					chemSpecies('CO2')
				],
				initial: [
					{ katex: `$${n1_mmol}$`, typst: `$${n1_mmol}$` },
					{ katex: `$${n2_mmol}$`, typst: `$${n2_mmol}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' }
				],
				intermediate: [
					{ katex: `$${n1_mmol} - 2x$`, typst: `$${n1_mmol} - 2x$` },
					{ katex: `$${n2_mmol} - 5x$`, typst: `$${n2_mmol} - 5x$` },
					{ katex: '$2x$', typst: '$2x$' },
					{ katex: '$10x$', typst: '$10x$' }
				],
				final: [
					{ katex: '$0$', typst: '$........$' },
					{ katex: `$${roundTo(n2_mmol - 5 * xmax_mmol, 2)}$`, typst: '$........$' },
					{ katex: `$${roundTo(2 * xmax_mmol, 2)}$`, typst: '$........$' },
					{ katex: `$${roundTo(10 * xmax_mmol, 2)}$`, typst: '$........$' }
				],
				finalAnswers: [
					{ katex: '$0$', typst: '$0$' },
					{ katex: `$${roundTo(n2_mmol - 5 * xmax_mmol, 2)}$`, typst: `$${roundTo(n2_mmol - 5 * xmax_mmol, 2)}$` },
					{ katex: `$${roundTo(2 * xmax_mmol, 2)}$`, typst: `$${roundTo(2 * xmax_mmol, 2)}$` },
					{ katex: `$${roundTo(10 * xmax_mmol, 2)}$`, typst: `$${roundTo(10 * xmax_mmol, 2)}$` }
				]
			});

			const svgInt = svgPhysicsCurvePlot({
				title: 'تطور تركيز [MnO₄⁻](t) أثناء الأكسدة بالأكساليك',
				xMin: 0,
				xMax: 20,
				yMin: 0,
				yMax: roundTo((n1_mmol / VT_L) * 1.2, 1),
				xStep: 5,
				yStep: 2,
				xLabel: 't (min)',
				yLabel: '[MnO₄⁻] (mmol/L)',
				curves: [
					{
						fn: (t) => (n1_mmol / VT_L) * Math.exp(-t / tauMin),
						color: '#7c3aed',
						label: '[MnO₄⁻](t)'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: n1_mmol / VT_L, x2: tauMin, y2: 0, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'right' }
				],
				points: [
					{ x: tHalfMin, y: roundTo(n1_mmol / (2 * VT_L), 2), label: `t₁/₂ = ${tHalfMin} min`, color: '#059669' }
				]
			});
			const intUrl = savePhysicsSvgAsset(`phy_${track}_t1_integ_${difficulty}_s${seed}`, svgInt);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${xmax_mmol}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نمزج $n_1(\\ce{MnO4-}) = ${n1_mmol}\\text{ mmol}$ مع $n_2(\\ce{H2C2O4}) = ${n2_mmol}\\text{ mmol}$ وفق: ${eqPerm.katex}. احسب $x_{\\max}$ بوحدة $\\text{mmol}$.`,
					questionTextAr: 'احسب قيمة $x_{\\max}$ (بوحدة $\\text{mmol}$):',
					imageUrl: intUrl,
					questionData: { answer: xmax_mmol, displayTemplate: 'x_max = ? mmol', variables: [], tolerance: 0.05 },
					explanation: `$\\frac{n_1}{2} = ${xmax_mmol}\\text{ mmol} < \\frac{n_2}{5} = ${roundTo(n2_mmol / 5, 2)}\\text{ mmol}$، إذن $x_{\\max} = ${xmax_mmol}\\text{ mmol}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${v_kms}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يدور مسبار فضائي حول المريخ ($M_M = 6.42\\times 10^{23}\\text{ kg}$, $R_M = ${R_mars_km}\\text{ km}$) على ارتفاع $h = ${h_km}\\text{ km}$. احسب سرعته المدارية $v$ بوحدة $\\text{km/s}$ ($G = 6.67\\times 10^{-11}\\text{ SI}$).`,
					questionTextAr: 'احسب السرعة المدارية للمسبار $v$ (بوحدة $\\text{km/s}$):',
					questionData: { answer: v_kms, displayTemplate: 'v = ? km/s', variables: [], tolerance: 0.1 },
					explanation: `$r = (${R_mars_km} + ${h_km})\\times 10^3\\text{ m}$، ومنه $v = \\sqrt{\\frac{G M_M}{r}} \\approx ${v_kms}\\text{ km/s}$.`
				};
			} else {
				finalAnswer = 'تحفز شوارد Mn²⁺ التفاعل تلقائياً (وساطة ذاتية)';
				const mcq = buildUniqueMcqOptions(
					'تحفز شوارد $\\ce{Mn^2+}$ المتشكلة التفاعل (وساطة ذاتية)',
					[
						{
							text: 'ينفد حمض الأكساليك مبكراً فتتوقف السرعة',
							diagnosticFeedback: 'نفاذ المتفاعلات يُنقص السرعة ولا يرفعها فجأة بعد البداية.'
						},
						{
							text: 'الضوء فقط هو الذي يرفع السرعة عند البداية',
							diagnosticFeedback: 'في تفاعل البرمنغنات مع الأكساليك الظاهرة المعروفة هي الوساطة الذاتية بشوارد $\\ce{Mn^2+}$.'
						},
						{
							text: 'يتحول التفاعل إلى ماص للحرارة',
							diagnosticFeedback: 'الوساطة الذاتية لا تتعلق بالتحول الحراري.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في تفاعل أكسدة حمض الأكساليك بشوارد البرمنغنات، نلاحظ أن التفاعل بطيء جداً في اللحظات الأولى ثم يتسارع فجأة دون تسخين. ما التفسير الحركي الصحيح؟`,
					questionTextAr: 'اختر التفسير العلمي لتسارع التفاعل بعد انطلاقه:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `شوارد $\\ce{Mn^2+}$ الناتجة عن التفاعل تلعب دور وسيط كيميائي يسرّع التفاعل بمجرد تشكلها (ظاهرة الوساطة الذاتية).`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية الشاملة — الفصل الأول',
				points: this.defaultPoints,
				instruction: 'يتكون هذا التمرين الشامل من جزأين مستقلين (الكيمياء الحركية + الميكانيك المداري).',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `*الجزء الأول (3.5 نقاط):* نمزج $V_1 = ${V1_mL} upright("mL")$ من برمنغنات البوتاسيوم ($C_1 = ${C1} upright("mol/L")$) مع $V_2 = ${V2_mL} upright("mL")$ من حمض الأكساليك ($C_2 = ${C2} upright("mol/L")$) في وسط حمضي: ${eqPerm.typst}.\n1) أكمل جدول التقدم وحدد المتفاعل المحد و $x_max$.\n2) من المنحنى $[ "MnO"_4^- ](t)$، عيّن $t_(1/2)$ واحسب السرعة الحجمية الابتدائية $v_"vol"(0)$.`,
								answer: `1) $n_1("MnO"_4^-) = ${n1_mmol} upright("mmol")$، $n_2("H"_2"C"_2"O"_4) = ${n2_mmol} upright("mmol")$. بما أن $frac(${n1_mmol}, 2) = ${xmax_mmol} < frac(${n2_mmol}, 5)$ فالمحد هو $"MnO"_4^-$ و $x_max = ${xmax_mmol} upright("mmol")$.\n2) من البيان $t_(1/2) = ${tHalfMin} upright("min")$. والسرعة الحجمية الابتدائية $v_"vol"(0) = frac(1, 2) |frac(dif ["MnO"_4^-], dif t)|_0 = ${vVol0} upright("mmol") dot upright("L")^(-1) dot upright("min")^(-1)$.`,
								mark: '3.5'
							},
							{
								type: 'image',
								src: intUrl,
								caption: 'منحنى تناقص تركيز برمنغنات البوتاسيوم'
							}
						]
					},
					icePerm.typstBlock,
					{
						type: 'text',
						content: `*الجزء الثاني (3.5 نقاط):* يدور مسبار فضائي في مدار دائري حول كوكب المريخ ($M_M = 6.42 times 10^(23) upright("kg")$, $R_M = ${R_mars_km} upright("km")$) على ارتفاع $h = ${h_km} upright("km")$. ($G = 6.67 times 10^(-11) upright("SI")$).\n1) بتطبيق القانون الثاني لنيوتن في المرجع المركزي المريخي، أوجد عبارة السرعة المدارية $v$ واحسب قيمتها بوحدة $upright("km/s")$.\n2) استنتج دور المسبار $T$ حول المريخ.`,
						answer: `1) $m frac(v^2, r) = G frac(M_M m, r^2) arrow.r.double v = sqrt(frac(G M_M, R_M + h))$.\nمع $r = ${R_mars_km + h_km} upright("km") = ${(R_mars_km + h_km) * 1000} upright("m")$: $v approx ${v_kms} upright("km/s")$.\n2) $T = frac(2 pi r, v) approx ${Math.round((2 * Math.PI * r_m) / v_ms)} upright("s") approx ${roundTo((2 * Math.PI * r_m) / v_ms / 60, 1)} upright("min")$.`,
						mark: '3.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر معاملات التفاعل $2$ لـ $\\ce{MnO4-}$ و $5$ لحمض الأكساليك عند تحديد المتفاعل المحد.',
					'اربط سرعة التفاعل بسرعة اختفاء $\\ce{MnO4-}$: $v_{\\text{vol}} = -\\frac{1}{2}\\frac{d[\\ce{MnO4-}]}{dt}$.',
					'استخدم $r = R_M + h$ بالمتر عند حساب السرعة المدارية حول المريخ.'
				],
				solutionStepsAr: [
					`المحد $\\ce{MnO4-}$ و $x_{\\max} = ${xmax_mmol}\\text{ mmol}$.`,
					`$t_{1/2} = ${tHalfMin}\\text{ min}$ و $v_{\\text{vol}}(0) = ${vVol0}\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.`,
					`السرعة المدارية للمسبار: $v \\approx ${v_kms}\\text{ km/s}$.`
				],
				finalAnswer
			};
		}
	};

	return [
		tplKineticsTitrationIce,
		tplKineticsConductimetryGas,
		tplKeplerSatellites,
		tplVerticalFallFluid,
		tplFreefallExp,
		tplIntegrationBacT1
	];
}

export const SHARED_PHYSICS_TEMPLATES_3AS_T1: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT1('3as_shared');
