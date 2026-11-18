import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';
import {
	tpl2asTmT2AcTransformerRectification,
	tpl2asTmT2IntegrationInductionAcSystem
} from '../../2as_tm/templates/t2';

function adaptSharedMath(
	base: PhysicsParameterizedTemplate,
	curriculumLessonId: string
): PhysicsParameterizedTemplate {
	const adapted = adaptPhysicsTemplateForTrack(base, '2as_math');
	return {
		...adapted,
		curriculumLessonId
	};
}

// ============================================================================
// 2AS MATH Exclusive Template 1 (T2): Analytical Faraday Induction (Piecewise B(t)) (4.5 pts)
// ============================================================================

export const tpl2asMathT2FaradayAnalytical: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_math_t2_faraday_induction',
	grade: '2as_math',
	trimesterId: 't2',
	domain: 'electromagnetism',
	titleAr: 'الدراسة التحليلية للتحريض الكهرومغناطيسي: دالة التدفق وقانون فاراداي',
	curriculumLessonId: 'phy_lesson_2as_math_t2_electromagnetic_induction_faraday',
	defaultPoints: 4.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nTurns = rng.pick([100, 200]);
		const sCm2 = rng.pick([50, 100]);
		const sM2 = roundTo(sCm2 * 1e-4, 4);
		const alphaDeg = difficulty === 'easy' ? 0 : 60;
		const cosAlpha = alphaDeg === 60 ? 0.5 : 1;
		const bMax = rng.pick([0.4, 0.8]);
		const t1Ms = 20;
		const t2Ms = 60;
		const t3Ms = 80;
		// Phase 1 [0, 20ms]: B increases linearly from 0 to bMax -> slope1 = bMax / 0.02
		// Phase 2 [20ms, 60ms]: B constant = bMax -> e2 = 0
		// Phase 3 [60ms, 80ms]: B decreases linearly from bMax to 0 -> slope3 = -bMax / 0.02
		const nScos = roundTo(nTurns * sM2 * cosAlpha, 4);
		const e1 = roundTo(-nScos * (bMax / 0.02), 2);
		const e3 = roundTo(-nScos * (-bMax / 0.02), 2);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: t3Ms,
			yMin: 0,
			yMax: roundTo(bMax * 1.25, 2),
			xStep: 20,
			yStep: roundTo(bMax / 2, 2),
			xLabel: 't (ms)',
			yLabel: 'B (T)',
			title: 'بيان شدة الحقل المغناطيسي B(t) متعدد المراحل',
			curves: [
				{
					fn: (t) =>
						t <= t1Ms
							? (bMax * t) / t1Ms
							: t <= t2Ms
								? bMax
								: bMax * (1 - (t - t2Ms) / (t3Ms - t2Ms)),
					color: '#2563eb',
					label: 'B(t)'
				}
			]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_math_t2_faraday_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$e_1 = ${e1}\\text{ V}\\quad ;\\quad e_2 = 0\\text{ V}\\quad ;\\quad e_3 = +${e3}\\text{ V}$`,
			[
				{
					text: `$e_1 = +${e3}\\text{ V}\\quad ;\\quad e_2 = 0\\text{ V}\\quad ;\\quad e_3 = ${e1}\\text{ V}$`,
					diagnosticFeedback: 'انتبه لإشارة السالب في قانون فاراداي e = -ΔΦ/Δt: عند تزايد التدفق يكون e سالباً.'
				},
				{
					text: `$e_1 = ${e1}\\text{ V}\\quad ;\\quad e_2 = +${e3}\\text{ V}\\quad ;\\quad e_3 = 0\\text{ V}$`,
					diagnosticFeedback: 'عند ثبات الحقل المغناطيسي في المجال الثاني يكون ΔΦ = 0 وبالتالي e2 = 0.'
				},
				{
					text: `$e_1 = ${roundTo(e1 / 2, 2)}\\text{ V}\\quad ;\\quad e_2 = 0\\text{ V}\\quad ;\\quad e_3 = +${roundTo(e3 / 2, 2)}\\text{ V}$`,
					diagnosticFeedback: 'تحقق من ميل الدالة B(t) ومن قيمة cos(α).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'تطور شدة الحقل المغناطيسي B(t) عبر ثلاثة مجالات زمنية',
				width: 320
			},
			{
				type: 'text',
				content: `1) اكتب العبارة التحليلية للتدفق المغناطيسي $Phi(t)$ بدلالة $B(t)$ والزاوية $alpha = ${alphaDeg} deg$، واحسب المعامل $N dot S dot cos alpha$.`,
				answer: `1) العبارة التحليلية للتدفق:\n$S = ${sCm2}" cm"^2 = ${sM2}" m"^2$، و $cos(${alphaDeg} deg) = ${cosAlpha}$.\n$Phi(t) = (N dot S dot cos alpha) B(t) = (${nTurns} times ${sM2} times ${cosAlpha}) B(t) = ${nScos} B(t)$ (بوحدة $"Wb"$).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) استنتج القوة المحركة الكهربائية التحريضية $e(t) = -frac(Delta Phi, Delta t)$ على المجالات الزمنية الثلاثة: $[0; 20" ms"]$، $[20; 60" ms"]$، و $[60; 80" ms"]$.`,
				answer: `2) الحساب على المجالات الثلاثة:\n- على $[0; 20" ms"]$: الميل $frac(Delta B, Delta t) = frac(${bMax}, 0.02)$، إذن $e_1 = -${nScos} times frac(${bMax}, 0.02) = ${e1}" V"$.\n- على $[20; 60" ms"]$: $B(t)$ ثابت، إذن $e_2 = 0" V"$.\n- على $[60; 80" ms"]$: الميل $frac(Delta B, Delta t) = frac(-${bMax}, 0.02)$، إذن $e_3 = -${nScos} times (frac(-${bMax}, 0.02)) = +${e3}" V"$.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تخترق خطوط حقل مغناطيسي يصنع زاوية $\\alpha = ${alphaDeg}^\\circ$ مع الناظم وشيعة عدد لفاتها $N = ${nTurns}$ ومساحة لفتها $S = ${sCm2}\\text{ cm}^2$. يتغير الحقل $B(t)$ حسب البيان ($B_{\\max} = ${bMax}\\text{ T}$).\nما قيم القوة المحركة التحريضية $(e_1, e_2, e_3)$ على المجالات $[0; 20]$, $[20; 60]$, $[60; 80]\\text{ ms}$؟`,
				questionTextAr: 'حدد القيم $(e_1, e_2, e_3)$ على المجالات الثلاثة:',
				imageUrl: svgUrl,
				imageCaption: 'دالة الحقل المغناطيسي B(t)',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$e = -N S \\cos(${alphaDeg}^\\circ) \\frac{\\Delta B}{\\Delta t}$ تعطي $e_1 = ${e1}\\text{ V}$ عند الصعود، $e_2 = 0\\text{ V}$ عند الثبات، و $e_3 = +${e3}\\text{ V}$ عند الهبوط.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `وشيعة مسطحة عدد لفاتها $N = ${nTurns}$ لفة ومساحة كل لفة $S = ${sCm2}" cm"^2$ يصنع ناظمها زاوية $alpha = ${alphaDeg} deg$ مع شعاع الحقل المغناطيسي $vec(B)$ الذي تتغير شدته حسب البيان.`,
				content
			},
			hints: [
				`عوض $S$ بالمتر المربع ($1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$) واحسب $N\\cdot S\\cdot \\cos\\alpha$.`,
				`الزمن في الميلي ثانية يُضرب في $10^{-3}$ للتحويل إلى الثانية.`,
				`إشارة $e$ تعاكس إشارة ميل المستقيم $B(t)$ طبقاً لقانون فاراداي $e = -\\Delta\\Phi/\\Delta t$.`
			],
			solutionStepsAr: [
				`العبارة التحليلية: $\\Phi(t) = ${nScos}\\,B(t)$.`,
				`المجال الأول: $e_1 = ${e1}\\text{ V}$؛ المجال الثاني: $e_2 = 0\\text{ V}$؛ المجال الثالث: $e_3 = +${e3}\\text{ V}$.`
			],
			finalAnswer: `e_1 = ${e1}\\text{ V}\\quad ;\\quad e_2 = 0\\text{ V}\\quad ;\\quad e_3 = +${e3}\\text{ V}`
		};
	}
};

const acTransformerMath: PhysicsParameterizedTemplate = {
	...adaptPhysicsTemplateForTrack(tpl2asTmT2AcTransformerRectification, '2as_math'),
	id: 'phy_tpl_2as_math_t2_ac_transformer_rectification',
	grade: '2as_math',
	curriculumLessonId: 'phy_lesson_2as_math_t2_ac_voltages_transformers'
};

const integrationInductionAcMath: PhysicsParameterizedTemplate = {
	...adaptPhysicsTemplateForTrack(tpl2asTmT2IntegrationInductionAcSystem, '2as_math'),
	id: 'phy_tpl_2as_math_t2_integration_induction_ac_system',
	grade: '2as_math',
	curriculumLessonId: 'phy_lesson_2as_math_t2_ac_dc_rectification'
};

export const PHYSICS_TEMPLATES_2AS_MATH_T2: PhysicsParameterizedTemplate[] = [
	adaptSharedMath(SHARED_TEMPLATES_2AS_T2[0], 'phy_lesson_2as_math_t2_acid_base_redox_titration'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T2[1], 'phy_lesson_2as_math_t2_acid_base_redox_titration'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T2[2], 'phy_lesson_2as_math_t2_magnetic_field_laplace'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T2[3], 'phy_lesson_2as_math_t2_magnetic_field_laplace'),
	tpl2asMathT2FaradayAnalytical,
	acTransformerMath,
	adaptSharedMath(SHARED_TEMPLATES_2AS_T2[4], 'phy_lesson_2as_math_t2_acid_base_redox_titration'),
	integrationInductionAcMath
];
