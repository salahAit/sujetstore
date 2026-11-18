import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgInclinedPlaneForces,
	svgPhysicsCurvePlot,
	svgProjectileTrajectory,
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

export function createSharedPhysicsTemplates3asT2(
	track: TrackTag = '3as_shared'
): PhysicsParameterizedTemplate[] {
	const { grade, lessonPrefix } = makeTrackMeta(track);
	const phLessonId =
		track === '3as_tm' || track === '3as_math'
			? `${lessonPrefix}_t2_ph_acids_bases_titration`
			: `${lessonPrefix}_t2_ph_acids_bases_equilibrium`;
	const titrationLessonId =
		track === '3as_tm' || track === '3as_math'
			? `${lessonPrefix}_t2_ph_acids_bases_titration`
			: `${lessonPrefix}_t2_ph_metric_titration`;

	// ─────────────────────────────────────────────────────────────────────────
	// 1. Parabolic Projectile Motion (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplProjectileMotion: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_projectile_motion`,
		grade,
		trimesterId: 't2',
		domain: 'mechanics',
		titleAr: 'حركة القذيفة في حقل الجاذبية الأرضية (المسار، الذروة، والمدى)',
		curriculumLessonId: `${lessonPrefix}_t2_projectile_inclined_plane`,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const g = 10;
			const v0 = rng.pick([16, 20, 24, 30]);
			const alphaDeg = rng.pick([30, 45, 60]);
			const alphaRad = (alphaDeg * Math.PI) / 180;
			const cosA = Math.cos(alphaRad);
			const sinA = Math.sin(alphaRad);
			const vx = roundTo(v0 * cosA, 2);
			const v0y = roundTo(v0 * sinA, 2);
			const tS = roundTo(v0y / g, 2);
			const xS = roundTo(vx * tS, 2);
			const yS = roundTo((v0y * v0y) / (2 * g), 2);
			const xP = roundTo((v0 * v0 * Math.sin(2 * alphaRad)) / g, 2);
			const coeffA = roundTo(g / (2 * v0 * v0 * cosA * cosA), 4);
			const tanA = roundTo(Math.tan(alphaRad), 3);

			const trajSvg = svgProjectileTrajectory({
				angleLabel: `α = ${alphaDeg}°`,
				v0Label: `v₀ = ${v0} m/s`,
				showApex: true
			});
			const trajUrl = savePhysicsSvgAsset(`phy_${track}_t2_proj_${difficulty}_s${seed}`, trajSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${yS}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تُقذف كرة من المبدأ $O(0,0)$ بسرعة ابتدائية $v_0 = ${v0}\\text{ m/s}$ وزاوية $\\alpha = ${alphaDeg}^\\circ$ ($g = ${g}\\text{ m/s}^2$). احسب ارتفاع الذروة $y_S$ بوحدة المتر ($\\text{m}$).`,
					questionTextAr: 'احسب ارتفاع الذروة $y_S$ (بوحدة $\\text{m}$):',
					imageUrl: trajUrl,
					questionData: { answer: yS, displayTemplate: 'y_S = ? m', variables: [], tolerance: 0.15 },
					explanation: `$v_{0y} = v_0\\sin\\alpha = ${v0y}\\text{ m/s}$، وعند الذروة $t_S = \\frac{v_{0y}}{g} = ${tS}\\text{ s}$، ومنه $y_S = \\frac{v_{0y}^2}{2g} = ${yS}\\text{ m}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${xP}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `قذيفة تُطلق من سطح الأرض ($y_0 = 0$) بسرعة $v_0 = ${v0}\\text{ m/s}$ وزاوية $\\alpha = ${alphaDeg}^\\circ$ ($g = ${g}\\text{ m/s}^2$). احسب المدى الأفقي $x_P$ بوحدة المتر ($\\text{m}$).`,
					questionTextAr: 'احسب المدى الأفقي $x_P$ (بوحدة $\\text{m}$):',
					imageUrl: trajUrl,
					questionData: { answer: xP, displayTemplate: 'x_P = ? m', variables: [], tolerance: 0.25 },
					explanation: `$x_P = \\frac{v_0^2 \\sin(2\\alpha)}{g} = \\frac{${v0}^2 \\sin(${2 * alphaDeg}^\\circ)}{${g}} = ${xP}\\text{ m}$.`
				};
			} else {
				finalAnswer = `${vx} m/s`;
				const mcq = buildUniqueMcqOptions(
					`$${vx}\\text{ m/s}$`,
					[
						{
							text: '$0\\text{ m/s}$',
							diagnosticFeedback: 'تنعدم المركبة الشاقولية $v_y$ فقط عند الذروة، بينما تبقى المركبة الأفقية $v_x$ ثابتة.'
						},
						{
							text: `$${v0y}\\text{ m/s}$`,
							diagnosticFeedback: 'تلك المركبة الشاقولية الابتدائية $v_{0y}$ وليست السرعة عند الذروة.'
						},
						{
							text: `$${v0}\\text{ m/s}$`,
							diagnosticFeedback: 'بما أن $v_y(t_S) = 0$ فإن $v_S = v_x < v_0$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما قيمة سرعة القذيفة $v_S$ عند مرورها بالذروة $S$ إذا أُطلقت بـ $v_0 = ${v0}\\text{ m/s}$ وزاوية $\\alpha = ${alphaDeg}^\\circ$؟`,
					questionTextAr: 'اختر قيمة السرعة عند الذروة $S$:',
					imageUrl: trajUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `عند الذروة $v_y = 0$، فتكون السرعة أفقية قيمتها $v_S = v_x = v_0 \\cos(${alphaDeg}^\\circ) = ${vx}\\text{ m/s}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تُقذف كرة من نقطة $O(0,0)$ في حقل جاذبية منتظم ($g = ${g} upright("m/s")^2$) بسرعة ابتدائية $v_0 = ${v0} upright("m/s")$ يصنع حاملها زاوية $alpha = ${alphaDeg}^degree$ مع الأفق. نهمل مقاومة الهواء ودافعة أرخميدس.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) بتطبيق القانون الثاني لنيوتن في المعلم السطحي الأرضي $(O ; arrow(i), arrow(j))$، أوجد مركبتي التسارع واستنتج المعادلتين الزمنيتين للسرعة والحركة $x(t)$ و $y(t)$.',
								answer: `1) $arrow(P) = m arrow(a) arrow.r.double a_x = 0$ و $a_y = -g$.\nبالتكامل: $v_x(t) = v_0 cos alpha = ${vx} upright("m/s")$ و $v_y(t) = -g t + v_0 sin alpha = -${g} t + ${v0y}$.\nالمعادلات الزمنية: $x(t) = ${vx} t$ و $y(t) = -${roundTo(0.5 * g, 1)} t^2 + ${v0y} t$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: trajUrl,
								caption: 'مسار القذيفة وإحداثيات الذروة $S$ والمدى $P$'
							}
						]
					},
					{
						type: 'text',
						content: '2) استنتج معادلة المسار $y(x)$ وبيّن أنه قطع مكافئ.',
						answer: `2) بإقصاء الزمن $t = frac(x, v_0 cos alpha)$ نجد:\n$y(x) = -frac(g, 2 v_0^2 cos^2 alpha) x^2 + (tan alpha) x = -${coeffA} x^2 + ${tanA} x$ (معادلة قطع مكافئ).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) عيّن لحظة بلوغ الذروة $t_S$ وإحداثيي الذروة $S(x_S ; y_S)$ وقيمة السرعة عندها.',
						answer: `3) عند الذروة $v_y(t_S) = 0 arrow.r.double t_S = frac(${v0y}, ${g}) = ${tS} upright("s")$.\n$x_S = ${vx} times ${tS} = ${xS} upright("m")$، و $y_S = ${yS} upright("m")$.\nالسرعة عند الذروة أفقية: $v_S = v_x = ${vx} upright("m/s")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '4) احسب المدى الأفقي $x_P$ عند عودة القذيفة إلى نفس المستوى الأفقي $y = 0$.',
						answer: `4) عند $y = 0$ ($x_P > 0$): $x_P = 2 x_S = ${xP} upright("m")$.`,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'الحركة على $(Ox)$ مستقيمة منتظمة ($a_x = 0$) وعلى $(Oy)$ مستقيمة متغيرة بانتظام ($a_y = -g$).',
					'عند الذروة تنعدم $v_y$ فقط وليس $v_x$.',
					'المدى الأفقي عند نفس الارتفاع $y_0 = 0$ يساوي ضعف فاصلة الذروة $x_P = 2 x_S$.'
				],
				solutionStepsAr: [
					`$v_{0x} = ${vx}\\text{ m/s}$ و $v_{0y} = ${v0y}\\text{ m/s}$.`,
					`الذروة: $t_S = ${tS}\\text{ s}$، $x_S = ${xS}\\text{ m}$، و $y_S = ${yS}\\text{ m}$.`,
					`المدى الأفقي: $x_P = ${xP}\\text{ m}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. Experimental Inclined Plane with Friction (6 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplInclinedPlaneExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_inclined_plane_exp`,
		grade,
		trimesterId: 't2',
		domain: 'mechanics',
		titleAr: 'التمرين التجريبي: حركة جسم صلب على مستو مائل مع الاحتكاك',
		curriculumLessonId: `${lessonPrefix}_t2_projectile_inclined_plane`,
		defaultPoints: 6,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const g = 10;
			const alphaDeg = rng.pick([30, 30, 37]);
			const sinA = alphaDeg === 30 ? 0.5 : 0.6;
			const cosA = alphaDeg === 30 ? 0.866 : 0.8;
			const m_kg = rng.pick([0.5, 1.0, 2.0]);
			const f_N = rng.pick([0.5, 1.0, 1.5]);
			const a = roundTo(g * sinA - f_N / m_kg, 2);
			const dMax = 2.5;
			const vEnd = roundTo(Math.sqrt(2 * a * dMax), 2);
			const rn_N = roundTo(m_kg * g * cosA, 2);

			const rampSvg = svgInclinedPlaneForces({
				angleDeg: alphaDeg,
				showFriction: true,
				angleLabel: `α = ${alphaDeg}°`
			});
			const v2PlotSvg = svgPhysicsCurvePlot({
				title: 'البيان التجريبي v² = f(x) على المستوي المائل',
				xMin: 0,
				xMax: 2.5,
				yMin: 0,
				yMax: Math.ceil(2 * a * 2.5 * 1.2),
				xStep: 0.5,
				yStep: 2,
				xLabel: 'x (m)',
				yLabel: 'v² (m²/s²)',
				curves: [{ fn: (x) => 2 * a * x, color: '#2563eb', label: 'v² = 2ax' }],
				points: [{ x: 2.0, y: roundTo(4 * a, 2), label: `(2 ; ${roundTo(4 * a, 2)})`, color: '#dc2626' }]
			});
			const rampUrl = savePhysicsSvgAsset(`phy_${track}_t2_ramp_${difficulty}_s${seed}`, rampSvg);
			const v2Url = savePhysicsSvgAsset(`phy_${track}_t2_v2plot_${difficulty}_s${seed}`, v2PlotSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${a}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يمثل البيان المرفق تغيرات مربع السرعة $v^2$ بدلالة المسافة المقطوعة $x$ لجسم ينزلق بدون سرعة ابتدائية على مستو مائل، حيث يمر بالنقطة $(2.0\\text{ m}; ${roundTo(4 * a, 2)}\\text{ m}^2/\\text{s}^2)$. احسب تسارع الحركة $a$ بوحدة $\\text{m/s}^2$.`,
					questionTextAr: 'احسب التسارع $a$ (بوحدة $\\text{m/s}^2$):',
					imageUrl: v2Url,
					questionData: { answer: a, displayTemplate: 'a = ? m/s²', variables: [], tolerance: 0.05 },
					explanation: `من العلاقة $v^2 = 2 a x$، ميل المستقيم يساوي $2a = \\frac{${roundTo(4 * a, 2)}}{2.0} = ${roundTo(2 * a, 2)} \\implies a = ${a}\\text{ m/s}^2$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${f_N}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `ينزلق جسم كتلته $m = ${m_kg}\\text{ kg}$ على مستو مائل بزاوية $\\alpha = ${alphaDeg}^\\circ$ بتسارع $a = ${a}\\text{ m/s}^2$ ($g = ${g}\\text{ m/s}^2$). احسب شدة قوة الاحتكاك $f$ بوحدة النيوتن ($\\text{N}$).`,
					questionTextAr: 'احسب شدة قوة الاحتكاك $f$ (بوحدة $\\text{N}$):',
					imageUrl: rampUrl,
					questionData: { answer: f_N, displayTemplate: 'f = ? N', variables: [], tolerance: 0.05 },
					explanation: `بتطبيق القانون الثاني لنيوتن: $m g\\sin\\alpha - f = m a \\implies f = ${m_kg}(${g}\\times ${sinA} - ${a}) = ${f_N}\\text{ N}$.`
				};
			} else {
				finalAnswer = `${rn_N} N`;
				const mcq = buildUniqueMcqOptions(
					`$${rn_N}\\text{ N}$`,
					[
						{
							text: `$${roundTo(m_kg * g, 2)}\\text{ N}$`,
							diagnosticFeedback: 'تلك قيمة الثقل $P = mg$ وليس المركبة العمودية $R_N = mg\\cos\\alpha$.'
						},
						{
							text: `$${roundTo(m_kg * g * sinA, 2)}\\text{ N}$`,
							diagnosticFeedback: 'تلك قيمة المركبة المماسية $mg\\sin\\alpha$ وليس رد الفعل الناظمي.'
						},
						{
							text: `$${roundTo(rn_N / 2, 2)}\\text{ N}$`,
							diagnosticFeedback: 'تحقق من $\\cos(${alphaDeg}^\\circ) = ${cosA}$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `جسم كتلته $m = ${m_kg}\\text{ kg}$ يتحرك على مستو مائل بزاوية $\\alpha = ${alphaDeg}^\\circ$ ($g = ${g}\\text{ m/s}^2$, $\\cos ${alphaDeg}^\\circ = ${cosA}$). ما شدة رد الفعل الناظمي $R_N$ للمستوي على الجسم؟`,
					questionTextAr: 'اختر قيمة رد الفعل الناظمي $R_N$:',
					imageUrl: rampUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `على المحور الناظمي $a_n = 0 \\implies R_N - mg\\cos\\alpha = 0 \\implies R_N = ${m_kg}\\times ${g}\\times ${cosA} = ${rn_N}\\text{ N}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: نترك جسماً صلباً $(S)$ كتلته $m = ${m_kg} upright("kg")$ ينزلق بدون سرعة ابتدائية على مستو مائل بزاوية $alpha = ${alphaDeg}^degree$ ($g = ${g} upright("m/s")^2$، $sin ${alphaDeg}^degree = ${sinA}$، $cos ${alphaDeg}^degree = ${cosA}$). نسجل بواسطة برمجية مناسبة تغيرات $v^2$ بدلالة المسافة $x$.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{
								type: 'image',
								src: rampUrl,
								caption: 'القوى المؤثرة على الجسم $(S)$ على المستوي المائل'
							},
							{
								type: 'image',
								src: v2Url,
								caption: 'البيان التجريبي $v^2 = f(x)$'
							}
						]
					},
					{
						type: 'text',
						content: '1) بتطبيق القانون الثاني لنيوتن في المعلم السطحي الأرضي، أوجد عبارة التسارع النظري $a$ بدلالة $g$ و $alpha$ و $f$ و $m$، وكذلك عبارة رد الفعل الناظمي $R_N$.',
						answer: `1) بالإسقاط على المحور المماس للمستوي الموجه نحو الأسفل: $m g sin alpha - f = m a arrow.r.double a = g sin alpha - frac(f, m)$.\nبالإسقاط على الناظم: $R_N - m g cos alpha = 0 arrow.r.double R_N = m g cos alpha = ${rn_N} upright("N")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) اكتب العلاقة النظرية بين $v^2$ و $x$، ثم استنتج من البيان (يمر بـ $(2.0 ; ${roundTo(4 * a, 2)})$) قيمة التسارع التجريبي $a$.`,
						answer: `2) $v^2 - v_0^2 = 2 a x arrow.r.double v^2 = 2 a x$.\nميل البيان هو $2a = frac(${roundTo(4 * a, 2)}, 2.0) = ${roundTo(2 * a, 2)} upright("m/s")^2 arrow.r.double a = ${a} upright("m/s")^2$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) استنتج شدة قوة الاحتكاك $f$، ثم تحقق منها بتطبيق مبدأ انحفاظ الطاقة على الجملة (جسم) بين $x = 0$ و $x = 2.5 upright("m")$.',
						answer: `3) $f = m(g sin alpha - a) = ${m_kg}(${g * sinA} - ${a}) = ${f_N} upright("N")$.\nبتطبيق مبدأ انحفاظ الطاقة: $frac(1, 2) m v^2 - 0 = m g d sin alpha - f d arrow.r.double v = ${vEnd} upright("m/s")$ و $f = ${f_N} upright("N")$.`,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر أن ميل المنحنى $v^2 = f(x)$ يساوي $2a$ وليس $a$.',
					'قوة الاحتكاك تعاكس دوماً جهة الحركة، بينما $R_N = mg\\cos\\alpha$ لا تُنتج عملاً.',
					'عمل الثقل أثناء النزول على مسافة $d$ هو $W(\\vec{P}) = +m g d \\sin\\alpha$.'
				],
				solutionStepsAr: [
					`التسارع من الميل: $2a = ${roundTo(2 * a, 2)} \\implies a = ${a}\\text{ m/s}^2$.`,
					`قوة الاحتكاك: $f = m(g\\sin\\alpha - a) = ${f_N}\\text{ N}$.`,
					`رد الفعل الناظمي: $R_N = mg\\cos\\alpha = ${rn_N}\\text{ N}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. Experimental RC Dipole (7 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplRcCircuitExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_rc_circuit_exp`,
		grade,
		trimesterId: 't2',
		domain: 'electricity',
		titleAr: 'التمرين التجريبي: دراسة ثنائي القطب RC (الشحن، التفريغ، والطاقة)',
		curriculumLessonId: `${lessonPrefix}_t2_rc_circuit_charge_discharge`,
		defaultPoints: 7,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const E = rng.pick([6, 8, 10, 12]);
			const R = rng.pick([200, 250, 500, 1000]);
			const C_uF = rng.pick([10, 20, 40, 50]);
			const tau_ms = roundTo((R * C_uF) / 1000, 2); // ms
			const EC_mJ = roundTo(0.5 * C_uF * 1e-3 * E * E, 3); // mJ
			const i0_mA = roundTo((E / R) * 1000, 1);

			const rcCircuitSvg = svgCircuitDiagram({
				kind: 'rc',
				labels: {
					e: `E = ${E} V`,
					r: `R = ${R} Ω`,
					c: 'C',
					switchLabel: 'K',
					voltmeter: true
				}
			});
			const rcCurveSvg = svgPhysicsCurvePlot({
				title: 'تطور التوتر u_C(t) بين طرفي المكثفة أثناء الشحن',
				xMin: 0,
				xMax: roundTo(tau_ms * 5, 1),
				yMin: 0,
				yMax: Math.ceil(E * 1.2),
				xStep: tau_ms,
				yStep: roundTo(E / 5, 1),
				xLabel: 't (ms)',
				yLabel: 'u_C (V)',
				curves: [
					{ fn: (t) => E * (1 - Math.exp(-t / tau_ms)), color: '#2563eb', label: 'u_C(t)' }
				],
				dashedGuides: [
					{ x1: 0, y1: E, x2: roundTo(tau_ms * 5, 1), y2: E, color: '#475569', label: `E = ${E} V`, labelPos: 'top' },
					{ x1: 0, y1: 0, x2: tau_ms, y2: E, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'left' },
					{ x1: tau_ms, y1: 0, x2: tau_ms, y2: E, color: '#dc2626' }
				],
				points: [{ x: tau_ms, y: E, label: `τ = ${tau_ms} ms`, color: '#dc2626' }]
			});
			const rcCircUrl = savePhysicsSvgAsset(`phy_${track}_t2_rc_circ_${difficulty}_s${seed}`, rcCircuitSvg);
			const rcPlotUrl = savePhysicsSvgAsset(`phy_${track}_t2_rc_plot_${difficulty}_s${seed}`, rcCurveSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${C_uF}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في دارة $RC$ مع مقاومة $R = ${R}\\text{ }\\Omega$، يقطع المماس للمنحنى $u_C(t)$ عند $t=0$ الخط المقارب $u_C = E$ عند $\\tau = ${tau_ms}\\text{ ms}$. احسب سعة المكثفة $C$ بوحدة الميكروفاراد ($\\mu\\text{F}$).`,
					questionTextAr: 'احسب سعة المكثفة $C$ (بوحدة $\\mu\\text{F}$):',
					imageUrl: rcPlotUrl,
					questionData: { answer: C_uF, displayTemplate: 'C = ? μF', variables: [], tolerance: 0.2 },
					explanation: `$\\tau = RC \\implies C = \\frac{\\tau}{R} = \\frac{${tau_ms}\\times 10^{-3}}{${R}} = ${C_uF}\\times 10^{-6}\\text{ F} = ${C_uF}\\text{ }\\mu\\text{F}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${EC_mJ}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `مكثفة سعتها $C = ${C_uF}\\text{ }\\mu\\text{F}$ مشحونة كلياً تحت توتر $E = ${E}\\text{ V}$. احسب الطاقة الكهربائية العظمى المخزنة فيها $E_{C,\\max}$ بوحدة الميليجول ($\\text{mJ}$).`,
					questionTextAr: 'احسب الطاقة المخزنة $E_{C,\\max}$ (بوحدة $\\text{mJ}$):',
					imageUrl: rcCircUrl,
					questionData: { answer: EC_mJ, displayTemplate: 'E_C = ? mJ', variables: [], tolerance: 0.02 },
					explanation: `$E_{C,\\max} = \\frac{1}{2} C E^2 = 0.5 \\times ${C_uF}\\times 10^{-6} \\times ${E}^2 = ${roundTo(EC_mJ * 1e-3, 6)}\\text{ J} = ${EC_mJ}\\text{ mJ}$.`
				};
			} else {
				finalAnswer = `${roundTo(tau_ms * Math.LN2 / 2, 2)} ms`;
				const halfEnergyMs = roundTo((tau_ms * Math.LN2) / 2, 2);
				const mcq = buildUniqueMcqOptions(
					`$${halfEnergyMs}\\text{ ms}$`,
					[
						{
							text: `$${roundTo(tau_ms * Math.LN2, 2)}\\text{ ms}$`,
							diagnosticFeedback: 'هذا الزمن يوافق تناقص التوتر $u_C$ إلى النصف وليس الطاقة $E_C \\propto u_C^2$.'
						},
						{
							text: `$${tau_ms}\\text{ ms}$`,
							diagnosticFeedback: 'عند $t = \\tau$ تصبح الطاقة المخزنة $e^{-2} \\approx 0.135\\,E_{C,\\max}$.'
						},
						{
							text: `$${roundTo(tau_ms / 2, 2)}\\text{ ms}$`,
							diagnosticFeedback: 'نسيت الضرب في $\\ln 2$ عند حل $e^{-2t/\\tau} = 0.5$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `تُفرغ المكثفة السابقة ($\\tau = ${tau_ms}\\text{ ms}$) في الناقل الأومي $R$. ما الزمن اللازم لتتناقص طاقتها المخزنة إلى نصف قيمتها الابتدائية ($E_C(t) = \\frac{1}{2}E_{C,\\max}$)?`,
					questionTextAr: 'اختر الزمن اللازم لتناقص الطاقة المخزنة إلى النصف:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$E_C(t) = E_{C,\\max} e^{-2t/\\tau} = \\frac{1}{2}E_{C,\\max} \\implies t = \\frac{\\tau \\ln 2}{2} \\approx ${halfEnergyMs}\\text{ ms}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: ننجز التركيب المبين في الشكل والمكون من مولد مثالي للتوتر $E = ${E} upright("V")$، ناقل أومي مقاومته $R = ${R} upright(" ") Omega$، مكثفة فارغة سعتها $C$، وبادلة $K$. نضع البادلة في الوضع $(1)$ عند $t = 0$ ونتابع التوتر $u_C(t)$ براسم اهتزاز ذي ذاكرة.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1.1fr'],
						children: [
							{
								type: 'image',
								src: rcCircUrl,
								caption: 'مخطط دارة الشحن والتفريغ $RC$'
							},
							{
								type: 'image',
								src: rcPlotUrl,
								caption: 'منحنى الشحن $u_C(t)$ والمماس عند $t=0$'
							}
						]
					},
					{
						type: 'text',
						content: '1) كيف نوصل مدخل راسم الاهتزاز لمتابعة $u_C(t)$؟ وما هي شدة التيار الأعظمية $I_0$ عند $t = 0^+$؟',
						answer: `1) نوصل القطب الأرضي (المشترك) بالقطب السالب للمكثفة والمدخل بالقطب الموجب (أو بين طرفيها مع تفعيل زر العكس إن لزم).\nعند $t = 0^+$ تكون $u_C(0) = 0$، ومنه $I_0 = frac(E, R) = frac(${E}, ${R}) = ${i0_mA} upright("mA")$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: '2) بتطبيق قانون جمع التوترات، أوجد المعادلة التفاضلية التي يحققها $u_C(t)$، وتحقق أن $u_C(t) = E(1 - e^(-t/(RC)))$ حل لها.',
						answer: '2) $u_R + u_C = E arrow.r.double R C frac(dif u_C, dif t) + u_C = E arrow.r.double frac(dif u_C, dif t) + frac(1, RC) u_C = frac(E, RC)$.\nبتعويض الحل ومشتقته $frac(dif u_C, dif t) = frac(E, RC) e^(-t/(RC))$ نجد المساواة محققة لكل $t >= 0$ مع $u_C(0)=0$.',
						mark: '2'
					},
					{
						type: 'text',
						content: `3) بيّن بالتحليل البعدي أن الجداء $tau = RC$ متجانس مع الزمن، ثم استنتج من البيان قيمة $tau$ وسعة المكثفة $C$ بـ $mu upright("F")$.`,
						answer: `3) $[R] = frac([U], [I])$ و $[C] = frac([I][T], [U])$، إذن $[tau] = [R][C] = upright("T")$.\nبيانياً: $tau = ${tau_ms} upright("ms")$، ومنه $C = frac(tau, R) = frac(${tau_ms} times 10^(-3), ${R}) = ${C_uF} mu upright("F")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) احسب الطاقة المخزنة العظمى $E_(C,max)$ في المكثفة عند نهاية الشحن، وماذا يحدث لها عند وضع البادلة في الوضع $(2)$؟`,
						answer: `4) $E_(C,max) = frac(1, 2) C E^2 = ${EC_mJ} upright("mJ")$.\nعند الوضع $(2)$ تتفرغ المكثفة في المقاومة $R$ فتتحول كامل الطاقة المخزنة إلى حرارة بفعل جول.`,
						mark: '1.75'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر أن $u_C(0) = 0$ للمكثفة الفارغة، وأن $i = C \\frac{du_C}{dt}$.',
					'ميل المماس عند $t=0$ يساوي $\\frac{E}{\\tau}$ فيقطع المقارب $u_C = E$ عند $t = \\tau$.',
					'انتبه للتحويل: $1\\text{ }\\mu\\text{F} = 10^{-6}\\text{ F}$ و $1\\text{ ms} = 10^{-3}\\text{ s}$.'
				],
				solutionStepsAr: [
					`المعادلة التفاضلية: $\\frac{du_C}{dt} + \\frac{1}{RC}u_C = \\frac{E}{RC}$.`,
					`بيانياً: $\\tau = ${tau_ms}\\text{ ms} \\implies C = ${C_uF}\\text{ }\\mu\\text{F}$.`,
					`الطاقة العظمى: $E_{C,\\max} = \\frac{1}{2}CE^2 = ${EC_mJ}\\text{ mJ}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 4. RL Dipole: Real Coil (L, r) (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplRlCircuit: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_rl_circuit`,
		grade,
		trimesterId: 't2',
		domain: 'electricity',
		titleAr: 'ثنائي القطب RL: تأسيس التيار في وشيعة حقيقية (L, r) والطاقة المغناطيسية',
		curriculumLessonId: `${lessonPrefix}_t2_rl_circuit_current_energy`,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const E = rng.pick([6, 9, 12]);
			const R = rng.pick([30, 40, 50]);
			const r = rng.pick([5, 10]);
			const Rtot = R + r;
			const I0 = roundTo(E / Rtot, 3);
			const L = rng.pick([0.1, 0.2, 0.3, 0.4]);
			const tau_ms = roundTo((L / Rtot) * 1000, 2);
			const EL_mJ = roundTo(0.5 * L * I0 * I0 * 1000, 2);

			const rlCircSvg = svgCircuitDiagram({
				kind: 'rl',
				labels: {
					e: `E = ${E} V`,
					r: `R = ${R} Ω`,
					l: '(L, r)',
					switchLabel: 'K'
				}
			});
			const rlCurveSvg = svgPhysicsCurvePlot({
				title: 'منحنى تأسيس شدة التيار i(t) في الدارة RL',
				xMin: 0,
				xMax: roundTo(tau_ms * 5, 1),
				yMin: 0,
				yMax: roundTo(I0 * 1.25, 3),
				xStep: tau_ms,
				yStep: roundTo(I0 / 4, 3),
				xLabel: 't (ms)',
				yLabel: 'i (A)',
				curves: [{ fn: (t) => I0 * (1 - Math.exp(-t / tau_ms)), color: '#2563eb', label: 'i(t)' }],
				dashedGuides: [
					{ x1: 0, y1: I0, x2: roundTo(tau_ms * 5, 1), y2: I0, color: '#475569', label: `I₀ = ${I0} A`, labelPos: 'top' },
					{ x1: 0, y1: 0, x2: tau_ms, y2: I0, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'left' },
					{ x1: tau_ms, y1: 0, x2: tau_ms, y2: I0, color: '#dc2626' }
				],
				points: [{ x: tau_ms, y: I0, label: `τ = ${tau_ms} ms`, color: '#dc2626' }]
			});
			const rlCircUrl = savePhysicsSvgAsset(`phy_${track}_t2_rl_circ_${difficulty}_s${seed}`, rlCircSvg);
			const rlPlotUrl = savePhysicsSvgAsset(`phy_${track}_t2_rl_plot_${difficulty}_s${seed}`, rlCurveSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${r}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `دارة $RL$ تضم مولداً $E = ${E}\\text{ V}$ وناقلاً أومياً $R = ${R}\\text{ }\\Omega$ ووشيعة $(L, r)$. إذا بلغت شدة التيار في النظام الدائم $I_0 = ${I0}\\text{ A}$، احسب المقاومة الداخلية $r$ للوشيعة بوحدة الأوم ($\\Omega$).`,
					questionTextAr: 'احسب المقاومة الداخلية $r$ (بوحدة $\\Omega$):',
					imageUrl: rlPlotUrl,
					questionData: { answer: r, displayTemplate: 'r = ? Ω', variables: [], tolerance: 0.2 },
					explanation: `في النظام الدائم: $I_0 = \\frac{E}{R + r} \\implies R + r = \\frac{${E}}{${I0}} = ${Rtot}\\text{ }\\Omega \\implies r = ${Rtot} - ${R} = ${r}\\text{ }\\Omega$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${L}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في دارة $RL$ مقاومة حلقيتها الكلية $R + r = ${Rtot}\\text{ }\\Omega$، قيس ثابت الزمن بيانياً فوجد $\\tau = ${tau_ms}\\text{ ms}$. احسب ذاتية الوشيعة $L$ بوحدة الهنري ($\\text{H}$).`,
					questionTextAr: 'احسب الذاتية $L$ (بوحدة $\\text{H}$):',
					imageUrl: rlPlotUrl,
					questionData: { answer: L, displayTemplate: 'L = ? H', variables: [], tolerance: 0.01 },
					explanation: `$\\tau = \\frac{L}{R + r} \\implies L = \\tau(R + r) = ${tau_ms}\\times 10^{-3} \\times ${Rtot} = ${L}\\text{ H}$.`
				};
			} else {
				finalAnswer = `${EL_mJ} mJ`;
				const mcq = buildUniqueMcqOptions(
					`$${EL_mJ}\\text{ mJ}$`,
					[
						{
							text: `$${roundTo(EL_mJ * 2, 2)}\\text{ mJ}$`,
							diagnosticFeedback: 'نسيت العامل $\\frac{1}{2}$ في عبارة الطاقة المغناطيسية $E_L = \\frac{1}{2} L I_0^2$.'
						},
						{
							text: `$${roundTo(0.5 * L * I0 * 1000, 2)}\\text{ mJ}$`,
							diagnosticFeedback: 'نسيت تربيع شدة التيار $I_0^2$.'
						},
						{
							text: `$${roundTo(EL_mJ / 2, 2)}\\text{ mJ}$`,
							diagnosticFeedback: 'تحقق من الحساب $\\frac{1}{2} \\times ${L} \\times (${I0})^2$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `وشيعة ذاتيتها $L = ${L}\\text{ H}$ يجتازها تيار دائم شدته $I_0 = ${I0}\\text{ A}$. ما قيمة الطاقة المغناطيسية المخزنة فيها؟`,
					questionTextAr: 'اختر قيمة الطاقة المغناطيسية المخزنة $E_L$:',
					imageUrl: rlCircUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$E_L = \\frac{1}{2} L I_0^2 = 0.5 \\times ${L} \\times (${I0})^2 = ${roundTo(EL_mJ / 1000, 5)}\\text{ J} = ${EL_mJ}\\text{ mJ}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نحقق الدارة الكهربائية المبينة في الشكل باستعمال مولد توتر ثابت $E = ${E} upright("V")$، ناقل أومي مقاومته $R = ${R} upright(" ") Omega$، وشيعة حقيقية $(L, r)$، وقاطعة $K$. نغلق القاطعة عند $t = 0$ ونسجل منحنى شدة التيار $i(t)$.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1.1fr'],
						children: [
							{
								type: 'image',
								src: rlCircUrl,
								caption: 'الدارة الكهربائية $RL$'
							},
							{
								type: 'image',
								src: rlPlotUrl,
								caption: 'منحنى تأسيس التيار $i(t)$ في الدارة $RL$'
							}
						]
					},
					{
						type: 'text',
						content: '1) بتطبيق قانون جمع التوترات، أوجد المعادلة التفاضلية لشدة التيار $i(t)$ أثناء تأسيسه، ثم استنتج عبارة التيار الدائم $I_0$ وثابت الزمن $tau$.',
						answer: '1) $u_R + u_b = E arrow.r.double R i + L frac(dif i, dif t) + r i = E arrow.r.double frac(dif i, dif t) + frac(R + r, L) i = frac(E, L)$.\nفي النظام الدائم ($frac(dif i, dif t) = 0$): $I_0 = frac(E, R + r)$ و $tau = frac(L, R + r)$.',
						mark: '2'
					},
					{
						type: 'text',
						content: `2) عيّن من البيان قيمة $I_0$ و $tau$، ثم احسب المقاومة الداخلية $r$ وذاتية الوشيعة $L$.`,
						answer: `2) من البيان: $I_0 = ${I0} upright("A")$ و $tau = ${tau_ms} upright("ms")$.\n$R + r = frac(E, I_0) = ${Rtot} upright(" ") Omega arrow.r.double r = ${r} upright(" ") Omega$.\n$L = tau (R + r) = ${tau_ms} times 10^(-3) times ${Rtot} = ${L} upright("H")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) احسب التوتر بين طرفي الوشيعة $u_b$ في النظام الدائم، والطاقة المغناطيسية المخزنة فيها $E_L$.',
						answer: `3) في النظام الدائم: $u_b(oo) = r I_0 = ${r} times ${I0} = ${roundTo(r * I0, 2)} upright("V")$.\nالطاقة المغناطيسية: $E_L = frac(1, 2) L I_0^2 = ${EL_mJ} upright("mJ")$.`,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر أن التوتر بين طرفي الوشيعة الحقيقية هو $u_b = L\\frac{di}{dt} + r i$.',
					'في النظام الدائم تنعدم المشتقة $\\frac{di}{dt} = 0$ فيبقى $u_b(\\infty) = r I_0$.',
					'ثابت الزمن هو $\\tau = \\frac{L}{R + r}$ (وليس $\\frac{L}{R}$ إلا إذا كانت $r=0$).'
				],
				solutionStepsAr: [
					`من $I_0 = ${I0}\\text{ A}$ نجد $r = ${r}\\text{ }\\Omega$.`,
					`من $\\tau = ${tau_ms}\\text{ ms}$ نجد $L = ${L}\\text{ H}$.`,
					`الطاقة المغناطيسية: $E_L = ${EL_mJ}\\text{ mJ}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 5. Weak Acid/Base Equilibrium (pH, τ_f, Q_r,eq = K_a, pK_a) (5 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplPhEquilibriumKa: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_ph_equilibrium_ka`,
		grade,
		trimesterId: 't2',
		domain: 'kinetics_eq',
		titleAr: 'تطور جملة كيميائية نحو التوازن: الـ pH، نسبة التقدم النهائي، و pK_a',
		curriculumLessonId: phLessonId,
		defaultPoints: 5,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const acids = [
				{ nameAr: 'حمض الإيثانويك', formula: 'CH3COOH', base: 'CH3COO-', pKa: 4.8 },
				{ nameAr: 'حمض الميثانويك', formula: 'HCOOH', base: 'HCOO-', pKa: 3.8 },
				{ nameAr: 'حمض البنزويك', formula: 'C6H5COOH', base: 'C6H5COO-', pKa: 4.2 }
			];
			const acid = rng.pick(acids);
			const C = rng.pick([0.01, 0.02, 0.05, 0.1]);
			const V_mL = 100;
			const Ka = Math.pow(10, -acid.pKa);
			// Exact quadratic solution for [H3O+]^2 + Ka*[H3O+] - Ka*C = 0
			const h3o = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * C)) / 2;
			const pH = roundTo(-Math.log10(h3o), 2);
			const tauF_pct = roundTo((h3o / C) * 100, 2);
			const kaCalc = roundTo((h3o * h3o) / (C - h3o), 7);

			const eqHA = chemEquation(
				[
					{ formula: acid.formula, state: 'aq' },
					{ formula: 'H2O', state: 'l' }
				],
				[
					{ formula: acid.base, state: 'aq' },
					{ formula: 'H3O+', state: 'aq' }
				],
				{ reversible: true }
			);

			const iceHA = buildIceTable({
				equation: eqHA,
				speciesHeaders: [
					chemSpecies(acid.formula),
					chemSpecies('H2O'),
					chemSpecies(acid.base),
					chemSpecies('H3O+')
				],
				initial: [
					{ katex: '$C V$', typst: '$C V$' },
					{ katex: 'بوفرة', typst: 'بوفرة' },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' }
				],
				intermediate: [
					{ katex: '$C V - x$', typst: '$C V - x$' },
					{ katex: 'بوفرة', typst: 'بوفرة' },
					{ katex: '$x$', typst: '$x$' },
					{ katex: '$x$', typst: '$x$' }
				],
				final: [
					{ katex: '$C V - x_f$', typst: '$C V - x_f$' },
					{ katex: 'بوفرة', typst: 'بوفرة' },
					{ katex: '$x_f$', typst: '$x_f$' },
					{ katex: '$x_f$', typst: '$x_f$' }
				]
			});

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${tauF_pct}%`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نحضر محلولاً لـ${acid.nameAr} ${chemSpecies(acid.formula).katex} تركيزه $C = ${C}\\text{ mol/L}$ فيعطي جهاز الـ pH-متر القيمة $pH = ${pH}$. احسب نسبة التقدم النهائي $\\tau_f$ بالمائة ($\\%$).`,
					questionTextAr: 'احسب نسبة التقدم النهائي $\\tau_f$ (بوحدة $\\%$):',
					questionData: { answer: tauF_pct, displayTemplate: 'τ_f = ? %', variables: [], tolerance: 0.25 },
					explanation: `$[\\ce{H3O+}]_f = 10^{-${pH}} \\approx ${h3o.toExponential(2)}\\text{ mol/L}$، ومنه $\\tau_f = \\frac{[\\ce{H3O+}]_f}{C}\\times 100 \\approx ${tauF_pct}\\%$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${acid.pKa}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `محلول مائي لحمض ضعيف $HA$ تركيزه $C = ${C}\\text{ mol/L}$ وله $pH = ${pH}$ عند $25^\\circ\\text{C}$. احسب قيمة $pK_a$ للثنائية $HA/A^-$.`,
					questionTextAr: 'احسب قيمة $pK_a$:',
					questionData: { answer: acid.pKa, displayTemplate: 'pK_a = ?', variables: [], tolerance: 0.15 },
					explanation: `$K_a = \\frac{10^{-2 pH}}{C - 10^{-pH}} \\approx ${kaCalc.toExponential(2)} \\implies pK_a = -\\log K_a \\approx ${acid.pKa}$.`
				};
			} else {
				finalAnswer = acid.formula;
				const mcq = buildUniqueMcqOptions(
					`الحمض ${chemSpecies(acid.formula).katex} هو الصفة الغالبة لأن $pH < pK_a$`,
					[
						{
							text: `الأساس المرافق ${chemSpecies(acid.base).katex} هو الصفة الغالبة لأن $pH < pK_a$`,
							diagnosticFeedback: 'عندما يكون $pH < pK_a$ فإن $[HA] > [A^-]$ أي أن الحمض هو الغالب.'
						},
						{
							text: 'الصفة الحمضية والأساسية متساويتان في التركيز',
							diagnosticFeedback: 'يتساوى التركيزان فقط عندما يكون $pH = pK_a$.'
						},
						{
							text: 'يتحول الحمض كلياً إلى أساسه المرافق',
							diagnosticFeedback: 'الحمض ضعيف ونسبة تقدمه صغيرة جداً ($\\tau_f \\ll 1$).'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في محلول ${acid.nameAr} ($pK_a = ${acid.pKa}$) قيس $pH = ${pH}$. أيّ فرد كيميائي من الثنائية ${chemSpecies(acid.formula).katex}/${chemSpecies(acid.base).katex} هو الغالب؟`,
					questionTextAr: 'حدد الصفة الغالبة في المحلول:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بما أن $pH = ${pH} < pK_a = ${acid.pKa}$ فإن $\\log\\frac{[A^-]}{[HA]} = pH - pK_a < 0 \\implies [HA] > [A^-]$، فالحمض هو الغالب.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نحضر حجماً $V = ${V_mL} upright("mL")$ من محلول مائي لـ${acid.nameAr} ${chemSpecies(acid.formula).typst} تركيزه المولي $C = ${C} upright("mol/L")$ عند $25^degree upright("C")$. نقيس الـ $upright("pH")$ فنجد $upright("pH") = ${pH}$.`,
				content: [
					{
						type: 'text',
						content: `1) اكتب معادلة انحلال الحمض في الماء وأنشئ جدول التقدم للتفاعل.`,
						answer: `1) المعادلة: ${eqHA.typst}.`,
						mark: '1.25'
					},
					iceHA.typstBlock,
					{
						type: 'text',
						content: '2) احسب نسبة التقدم النهائي $tau_f$. هل الحمض قوي أم ضعيف؟ برّر.',
						answer: `2) $["H"_3"O"^+]_f = 10^(-${pH}) approx ${h3o.toExponential(2)} upright("mol/L")$.\n$tau_f = frac(["H"_3"O"^+]_f, C) = ${roundTo(tauF_pct / 100, 4)} = ${tauF_pct} % < 100 %$، إذن التحول غير تام والحمض ضعيف.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) عبّر عن كسر التفاعل عند التوازن $Q_(r,"eq") = K_a$ بدلالة $C$ و $["H"_3"O"^+]_f$، ثم احسب $K_a$ و $pK_a$ للثنائية.',
						answer: `3) $K_a = frac(["A"^-]_"eq" ["H"_3"O"^+]_"eq", ["HA"]_"eq") = frac(["H"_3"O"^+]_f^2, C - ["H"_3"O"^+]_f) approx ${kaCalc.toExponential(2)}$.\nومنه $pK_a = -log K_a approx ${acid.pKa}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '4) حدد الصفة الغالبة في المحلول، ثم اذكر كيف تتطور $tau_f$ عند إضافة الماء المقطر.',
						answer: `4) بما أن $upright("pH") = ${pH} < pK_a = ${acid.pKa}$ فإن الصفة الغالبة هي الحمض ${chemSpecies(acid.formula).typst}.\nعند التمديد بالماء المقطر تزداد نسبة التقدم النهائي $tau_f$ بينما يبقى $K_a$ ثابتاً.`,
						mark: '0.75'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'$\\tau_f = \\frac{[\\ce{H3O+}]_f}{C}$ لأن الحمض يتفاعل بنسبة $1:1$ مع الماء لإنتاج $\\ce{H3O+}$.',
					'لا يظهر الماء $[\\ce{H2O}]$ في عبارة كسر التفاعل $Q_r$.',
					'قارن الـ $pH$ مع $pK_a$: إذا كان $pH < pK_a$ فالحمض غالب.'
				],
				solutionStepsAr: [
					`$[\\ce{H3O+}]_f = 10^{-${pH}} \\approx ${h3o.toExponential(2)}\\text{ mol/L}$.`,
					`$\\tau_f = ${tauF_pct}\\% < 100\\%$ (حمض ضعيف).`,
					`$K_a \\approx ${kaCalc.toExponential(2)}$ و $pK_a \\approx ${acid.pKa}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. Experimental pH-Metric Titration (Equivalence & Half-Equivalence) (7 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplPhTitrationExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_acids_bases_ph_titration`,
		grade,
		trimesterId: 't2',
		domain: 'kinetics_eq',
		titleAr: 'التمرين التجريبي: المعايرة الـ pH-مترية (نقطة التكافؤ ونصف التكافؤ)',
		curriculumLessonId: titrationLessonId,
		defaultPoints: 7,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const Va = rng.pick([10, 20]);
			const Cb = rng.pick([0.05, 0.1]);
			const VE = rng.pick([12, 16, 20]);
			const Ca = roundTo((Cb * VE) / Va, 3);
			const pKa = rng.pick([3.8, 4.2, 4.8]);
			const cSaltE = (Ca * Va) / (Va + VE);
			const pHE = roundTo(7 + 0.5 * (pKa + Math.log10(cSaltE)), 1);
			const Vhalf = roundTo(VE / 2, 1);

			const eqTitration = chemEquation(
				[
					{ formula: 'HA', state: 'aq' },
					{ formula: 'OH-', state: 'aq' }
				],
				[
					{ formula: 'A-', state: 'aq' },
					{ formula: 'H2O', state: 'l' }
				]
			);

			const titrationFn = (vb: number): number => {
				if (vb <= 0.05) return roundTo(0.5 * (pKa - Math.log10(Ca)), 2);
				if (vb < VE - 0.7) return pKa + Math.log10(vb / (VE - vb));
				if (Math.abs(vb - VE) <= 0.7) {
					const t = (vb - (VE - 0.7)) / 1.4;
					const phL = pKa + Math.log10((VE - 0.7) / 0.7);
					const phR = 14 + Math.log10((Cb * 0.7) / (Va + VE + 0.7));
					return t < 0.5 ? phL + 2 * t * (pHE - phL) : pHE + 2 * (t - 0.5) * (phR - pHE);
				}
				return 14 + Math.log10((Cb * (vb - VE)) / (Va + vb));
			};

			const phSvg = svgPhysicsCurvePlot({
				title: 'منحنى المعايرة الـ pH-مترية pH = f(V_b)',
				xMin: 0,
				xMax: VE + 12,
				yMin: 0,
				yMax: 14,
				xStep: 4,
				yStep: 2,
				xLabel: 'V_b (mL)',
				yLabel: 'pH',
				curves: [{ fn: titrationFn, color: '#2563eb', label: 'pH = f(V_b)' }],
				dashedGuides: [
					{ x1: VE, y1: 0, x2: VE, y2: pHE, color: '#dc2626' },
					{ x1: 0, y1: pHE, x2: VE, y2: pHE, color: '#dc2626' },
					{ x1: Vhalf, y1: 0, x2: Vhalf, y2: pKa, color: '#059669' },
					{ x1: 0, y1: pKa, x2: Vhalf, y2: pKa, color: '#059669' }
				],
				points: [
					{ x: VE, y: pHE, label: `E(${VE} ; ${pHE})`, color: '#dc2626' },
					{ x: Vhalf, y: pKa, label: `E₁/₂(${Vhalf} ; ${pKa})`, color: '#059669' }
				]
			});
			const setupSvg = svgTitrationSetup({
				titrantLabel: `NaOH (C_b=${Cb} M)`,
				analyteLabel: `HA (V_a=${Va} mL)`,
				sensorLabel: 'مسبار pH-متر'
			});
			const phUrl = savePhysicsSvgAsset(`phy_${track}_t2_ph_curve_${difficulty}_s${seed}`, phSvg);
			const setupUrl = savePhysicsSvgAsset(`phy_${track}_t2_ph_setup_${difficulty}_s${seed}`, setupSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${Ca}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نعاير حجماً $V_a = ${Va}\\text{ mL}$ من حمض ضعيف $HA$ بواسطة محلول هيدروكسيد الصوديوم تركيزه $C_b = ${Cb}\\text{ mol/L}$. يحدث التكافؤ عند $V_{bE} = ${VE}\\text{ mL}$. احسب التركيز $C_a$ بوحدة $\\text{mol/L}$.`,
					questionTextAr: 'احسب التركيز المولي $C_a$ (بوحدة $\\text{mol/L}$):',
					imageUrl: phUrl,
					questionData: { answer: Ca, displayTemplate: 'C_a = ? mol/L', variables: [], tolerance: 0.005 },
					explanation: `عند التكافؤ $C_a V_a = C_b V_{bE} \\implies C_a = \\frac{${Cb} \\times ${VE}}{${Va}} = ${Ca}\\text{ mol/L}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${pKa}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `من منحنى المعايرة المرفق حيث $V_{bE} = ${VE}\\text{ mL}$ ونقطة نصف التكافؤ هي $E_{1/2}(${Vhalf}\\text{ mL}; ${pKa})$، استنتج قيمة $pK_a$ للثنائية $HA/A^-$.`,
					questionTextAr: 'استنتج قيمة $pK_a$:',
					imageUrl: phUrl,
					questionData: { answer: pKa, displayTemplate: 'pK_a = ?', variables: [], tolerance: 0.1 },
					explanation: `عند نصف التكافؤ ($V_b = \\frac{V_{bE}}{2} = ${Vhalf}\\text{ mL}$) يتساوى $[HA] = [A^-]$، ومنه $pH = pK_a = ${pKa}$.`
				};
			} else {
				finalAnswer = 'الفينول فتالين ([8.2 ; 10.0])';
				const mcq = buildUniqueMcqOptions(
					'الفينول فتالين (مجال تغيره $[8.2 ; 10.0]$)',
					[
						{
							text: 'الهيليانتين (مجال تغيره $[3.1 ; 4.4]$)',
							diagnosticFeedback: `قيمة $pH_E = ${pHE}$ تقع في الوسط القاعدي بعيداً عن مجال الهيليانتين.`
						},
						{
							text: 'أحمر المثيل (مجال تغيره $[4.2 ; 6.2]$)',
							diagnosticFeedback: `قيمة $pH_E = ${pHE} > 7$، بينما أحمر المثيل خاص بالوسط الحمضي.`
						},
						{
							text: 'أزرق البروموثيمول (مجال تغيره $[6.0 ; 7.6]$)',
							diagnosticFeedback: `قيمة $pH_E = ${pHE}$ تفوق $7.6$ فينتهي تغير لونه قبل التكافؤ.`
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في المعايرة السابقة تبلغ نقطة التكافؤ $E(${VE}\\text{ mL}; ${pHE})$. أيّ كاشف ملون مناسب لهذه المعايرة؟`,
					questionTextAr: 'اختر الكاشف الملون المناسب:',
					imageUrl: phUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يجب أن ينتمي $pH_E = ${pHE}$ إلى مجال التغير اللوني للكاشف، وذلك يتحقق في الفينول فتالين $[8.2 ; 10.0]$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: نعاير حجماً $V_a = ${Va} upright("mL")$ من محلول حمض كربوكسيلي $HA$ تركيزه المجهول $C_a$ بواسطة محلول هيدروكسيد الصوديوم $(upright("Na")^+ + upright("OH")^-)$ تركيزه $C_b = ${Cb} upright("mol/L")$ بمتابعة الـ $upright("pH")$.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1.1fr'],
						children: [
							{
								type: 'image',
								src: setupUrl,
								caption: 'التركيب التجريبي للمعايرة الـ $upright("pH")$-مترية'
							},
							{
								type: 'image',
								src: phUrl,
								caption: 'منحنى المعايرة ونقطتا التكافؤ ونصف التكافؤ'
							}
						]
					},
					{
						type: 'text',
						content: '1) اكتب معادلة تفاعل المعايرة واذكر خصائصه، ثم سمِّ الطريقة الهندسية المستعملة لتعيين نقطة التكافؤ $E$ بيانياً.',
						answer: `1) المعادلة: ${eqTitration.typst} (تفاعل سريع، تام، ووحيد).\nتُعيّن نقطة التكافؤ $E$ بطريقة المماسات المتوازية (أو ذروة المنحنى المشتق $frac(dif upright("pH"), dif V_b)$).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) من البيان، حدد إحداثيي نقطة التكافؤ $E(V_(b E) ; upright("pH")_E)$ واحسب التركيز المولي $C_a$.`,
						answer: `2) $V_(b E) = ${VE} upright("mL")$ و $upright("pH")_E = ${pHE} > 7$.\nعند التكافؤ: $C_a V_a = C_b V_(b E) arrow.r.double C_a = frac(${Cb} times ${VE}, ${Va}) = ${Ca} upright("mol/L")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) لماذا يكون الوسط قاعدياً ($upright("pH")_E > 7$) عند نقطة التكافؤ؟ وكيف نعيّن قيمة $pK_a$ للثنائية $HA/A^-$ من البيان؟',
						answer: `3) عند التكافؤ يتحول كل الحمض $HA$ إلى أساسه المرافق الضعيف $A^-$ الذي يتفاعل مع الماء منتجاً $"OH"^-$، فيكون $upright("pH")_E > 7$.\nعند نصف التكافؤ $V_(b,1/2) = frac(V_(b E), 2) = ${Vhalf} upright("mL")$ لدينا $[HA] = [A^-]$، ومنه $pK_a = upright("pH") = ${pKa}$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) اختر الكاشف الملون الأنسب للمعايرة من بين: أحمر المثيل $[4.2 ; 6.2]$، أزرق البروموثيمول $[6.0 ; 7.6]$، والفينول فتالين $[8.2 ; 10.0]$. وما أثر إضافة $20 upright("mL")$ ماء مقطر قبل المعايرة على $V_(b E)$؟',
						answer: `4) بما أن $upright("pH")_E = ${pHE} in [8.2 ; 10.0]$، فالكاشف الأنسب هو الفينول فتالين.\nإضافة الماء المقطر لا تغيّر كمية مادة الحمض في البيشر، لذا يبقى $V_(b E)$ ثابتاً.`,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تقرأ نقطة التكافؤ $E$ عند القفزة الحادة للـ $pH$ ويكون $C_a V_a = C_b V_{bE}$.',
					'تقرأ قيمة $pK_a$ عند $V_b = \\frac{V_{bE}}{2}$.',
					'اختر الكاشف الذي يقع $pH_E$ داخل مجال تغيره اللوني.'
				],
				solutionStepsAr: [
					`$V_{bE} = ${VE}\\text{ mL}$ و $pH_E = ${pHE} \\implies C_a = ${Ca}\\text{ mol/L}$.`,
					`نصف التكافؤ عند $${Vhalf}\\text{ mL}$ يعطي $pK_a = ${pKa}$.`,
					'الكاشف المناسب هو الفينول فتالين $[8.2 ; 10.0]$.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 7. T2 BAC Integration Synthesis (7 pts, isIntegration)
	// ─────────────────────────────────────────────────────────────────────────
	const tplIntegrationBacT2: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t2_integration_bac`,
		grade,
		trimesterId: 't2',
		domain: 'integration',
		titleAr: 'وضعية إدماجية تحضيرية للبكالوريا (الفيزياء الكهربائية والميكانيك/الأحماض)',
		curriculumLessonId: `${lessonPrefix}_t2_rc_circuit_charge_discharge`,
		defaultPoints: 7,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Part A: RC Discharge
			const E = rng.pick([10, 12]);
			const R = rng.pick([400, 500]);
			const C_uF = rng.pick([25, 50]);
			const tau_ms = roundTo((R * C_uF) / 1000, 2);
			const uAtTau = roundTo(E * Math.exp(-1), 2);
			// Part B: Projectile or Inclined Plane
			const v0 = rng.pick([15, 20]);
			const alphaDeg = 45;
			const g = 10;
			const rangeM = roundTo((v0 * v0) / g, 2); // since sin(90)=1

			const rcSvg = svgPhysicsCurvePlot({
				title: 'تفريغ مكثفة u_C(t) = E e^(-t/τ)',
				xMin: 0,
				xMax: roundTo(tau_ms * 5, 1),
				yMin: 0,
				yMax: Math.ceil(E * 1.15),
				xStep: tau_ms,
				yStep: 2,
				xLabel: 't (ms)',
				yLabel: 'u_C (V)',
				curves: [{ fn: (t) => E * Math.exp(-t / tau_ms), color: '#dc2626', label: 'u_C(t)' }],
				dashedGuides: [
					{ x1: 0, y1: E, x2: tau_ms, y2: 0, color: '#2563eb', label: 'المماس عند t=0', labelPos: 'right' }
				],
				points: [{ x: tau_ms, y: uAtTau, label: `(τ, ${uAtTau} V)`, color: '#059669' }]
			});
			const rcUrl = savePhysicsSvgAsset(`phy_${track}_t2_integ_${difficulty}_s${seed}`, rcSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${tau_ms}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تُفرغ مكثفة سعتها $C = ${C_uF}\\text{ }\\mu\\text{F}$ في مقاومة $R = ${R}\\text{ }\\Omega$. احسب ثابت الزمن $\\tau$ بوحدة الميليثانية ($\\text{ms}$).`,
					questionTextAr: 'احسب ثابت الزمن $\\tau$ (بوحدة $\\text{ms}$):',
					imageUrl: rcUrl,
					questionData: { answer: tau_ms, displayTemplate: 'τ = ? ms', variables: [], tolerance: 0.1 },
					explanation: `$\\tau = R C = ${R} \\times ${C_uF}\\times 10^{-6} = ${roundTo(tau_ms / 1000, 4)}\\text{ s} = ${tau_ms}\\text{ ms}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${uAtTau}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `مكثفة مشحونة تحت توتر ابتدائي $E = ${E}\\text{ V}$ تتفرغ وفق $u_C(t) = ${E}\\,e^{-t/\\tau}$. احسب التوتر $u_C(\\tau)$ عند $t = \\tau$ بوحدة الفولط ($\\text{V}$).`,
					questionTextAr: 'احسب $u_C(\\tau)$ (بوحدة $\\text{V}$):',
					imageUrl: rcUrl,
					questionData: { answer: uAtTau, displayTemplate: 'u_C(τ) = ? V', variables: [], tolerance: 0.1 },
					explanation: `$u_C(\\tau) = ${E} \\times e^{-1} \\approx ${E} \\times 0.368 \\approx ${uAtTau}\\text{ V}$.`
				};
			} else {
				finalAnswer = `${rangeM} m`;
				const mcq = buildUniqueMcqOptions(
					`$${rangeM}\\text{ m}$`,
					[
						{
							text: `$${roundTo(rangeM / 2, 2)}\\text{ m}$`,
							diagnosticFeedback: 'تلك قيمة ارتفاع الذروة أو نصف المدى وليست المدى الكلي.'
						},
						{
							text: `$${roundTo(rangeM * 2, 2)}\\text{ m}$`,
							diagnosticFeedback: 'تذكّر أن $\\sin(2\\times 45^\\circ) = 1$ في عبارة المدى $\\frac{v_0^2 \\sin(2\\alpha)}{g}$.'
						},
						{
							text: `$${v0}\\text{ m}$`,
							diagnosticFeedback: 'تأكد من تربيع السرعة $v_0^2$ في عبارة المدى.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `تُطلق قذيفة من سطح الأرض بسرعة $v_0 = ${v0}\\text{ m/s}$ وزاوية مثلى $\\alpha = 45^\\circ$ ($g = ${g}\\text{ m/s}^2$). ما قيمة مداها الأفقي $x_P$؟`,
					questionTextAr: 'اختر قيمة المدى الأفقي $x_P$:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$x_P = \\frac{v_0^2 \\sin(90^\\circ)}{g} = \\frac{${v0}^2}{${g}} = ${rangeM}\\text{ m}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية الشاملة — الفصل الثاني',
				points: this.defaultPoints,
				instruction: 'يتكون هذا التمرين الشامل من جزأين: الكهرباء ($RC$ — تفريغ مكثفة) والميكانيك (القذيفة).',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `*الجزء الأول (3.5 نقاط):* مكثفة سعتها $C = ${C_uF} mu upright("F")$ مشحونة تحت توتر $E = ${E} upright("V")$، تُفرغ عند $t = 0$ في ناقل أومي مقاومته $R = ${R} upright(" ") Omega$.\n1) اكتب المعادلة التفاضلية للتوتر $u_C(t)$ أثناء التفريغ.\n2) عيّن من البيان قيمة ثابت الزمن $tau$، ثم احسب قيمة $u_C(tau)$ وقيمة الطاقة المتبددة بفعل جول حتى نهاية التفريغ.`,
								answer: `1) $R C frac(dif u_C, dif t) + u_C = 0 arrow.r.double frac(dif u_C, dif t) + frac(1, RC) u_C = 0$.\n2) من تقاطع المماس عند $t=0$ مع محور الزمن نجد $tau = ${tau_ms} upright("ms")$.\n$u_C(tau) = E e^(-1) approx ${uAtTau} upright("V")$.\nالطاقة المتبددة الكلية تساوي الطاقة المخزنة الابتدائية: $E_"Joule" = frac(1, 2) C E^2 = ${roundTo(0.5 * C_uF * 1e-3 * E * E, 3)} upright("mJ")$.`,
								mark: '3.5'
							},
							{
								type: 'image',
								src: rcUrl,
								caption: 'منحنى تفريغ المكثفة $u_C(t)$'
							}
						]
					},
					{
						type: 'text',
						content: `*الجزء الثاني (3.5 نقاط):* تُقذف كرة من المبدأ $O(0,0)$ بسرعة ابتدائية $v_0 = ${v0} upright("m/s")$ بزاوية $alpha = ${alphaDeg}^degree$ مع الأفق ($g = ${g} upright("m/s")^2$).\n1) أوجد معادلة المسار $y(x)$.\n2) احسب إحداثيي الذروة $S$ والمدى الأفقي $x_P$.`,
						answer: `1) $y(x) = -frac(g, 2 v_0^2 cos^2 45^degree) x^2 + x = -frac(${g}, ${v0 * v0}) x^2 + x$.\n2) $x_P = frac(v_0^2 sin 90^degree, g) = ${rangeM} upright("m")$، وإحداثيا الذروة $x_S = frac(x_P, 2) = ${roundTo(rangeM / 2, 2)} upright("m")$ و $y_S = frac(v_0^2 sin^2 45^degree, 2g) = ${roundTo(rangeM / 4, 2)} upright("m")$.`,
						mark: '3.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في التفريغ، تقاطع المماس عند $t=0$ مع محور الزمن ($u_C = 0$) يعطي $t = \\tau$.',
					'عند $t = \\tau$ في التفريغ تكون $u_C(\\tau) = 0.37\\,E$.',
					'لزاوية $\\alpha = 45^\\circ$ يكون المدى الأفقي أعظمياً يساوي $v_0^2/g$.'
				],
				solutionStepsAr: [
					`$\\tau = RC = ${tau_ms}\\text{ ms}$ و $u_C(\\tau) \\approx ${uAtTau}\\text{ V}$.`,
					`الطاقة المتبددة في المقاومة تساوي $\\frac{1}{2}CE^2$.`,
					`المدى الأفقي عند $\\alpha = 45^\\circ$: $x_P = ${rangeM}\\text{ m}$.`
				],
				finalAnswer
			};
		}
	};

	return [
		tplProjectileMotion,
		tplInclinedPlaneExp,
		tplRcCircuitExp,
		tplRlCircuit,
		tplPhEquilibriumKa,
		tplPhTitrationExp,
		tplIntegrationBacT2
	];
}

export const SHARED_PHYSICS_TEMPLATES_3AS_T2: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT2('3as_shared');
