import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

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
// 2AS MATH Exclusive Annual Integration (T3): Analytical Mechanics + Lenses + AC (6 pts)
// ============================================================================

export const tpl2asMathT3IntegrationAnnualMtm: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_math_t3_integration_annual_mtm',
	grade: '2as_math',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'مسألة إدماجية سنوية (2AS MATH): الصياغة التحليلية للدوران والبصريات والتيار المتناوب',
	curriculumLessonId: 'phy_lesson_2as_math_t3_integration',
	defaultPoints: 6,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Analytical Optics: find position OA where magnification gamma = -k (k = 2 or 3)
		const fCm = rng.pick([12, 15, 20]);
		const kMag = rng.pick(difficulty === 'easy' ? [2] : [2, 3]);
		// From 1/OA' - 1/OA = 1/f' and OA' = -k * OA (real inverted image, gamma = -k):
		// 1/(-k*OA) - 1/OA = 1/f' => -(1+k)/(k*OA) = 1/f' => OA = -f'*(k+1)/k
		const oaCm = roundTo((-fCm * (kMag + 1)) / kMag, 2);
		const oapCm = roundTo(-kMag * oaCm, 2);

		// Analytical AC: u(t) = Umax * sin(omega * t)
		const freqHz = rng.pick([50, 100]);
		const omega = roundTo(2 * Math.PI * freqHz, 1);
		const uEff = rng.pick([12, 24]);
		const uMax = roundTo(uEff * Math.SQRT2, 2);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: roundTo(1000 / freqHz, 1),
			yMin: -Math.ceil(uMax * 1.2),
			yMax: Math.ceil(uMax * 1.2),
			xStep: roundTo(250 / freqHz, 1),
			yStep: Math.ceil(uMax / 2),
			xLabel: 't (ms)',
			yLabel: 'u (V)',
			title: `الدالة الجيبية للتوتر المتناوب: u(t) = ${uMax}·sin(${omega}t)`,
			curves: [
				{
					fn: (tMs) => uMax * Math.sin(omega * (tMs / 1000)),
					color: '#2563eb',
					label: 'u(t)'
				}
			]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_math_t3_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$\\overline{OA} = ${oaCm}\\text{ cm}\\quad ;\\quad U_{\\max} = ${uMax}\\text{ V}$`,
			[
				{
					text: `$\\overline{OA} = -${fCm * kMag}\\text{ cm}\\quad ;\\quad U_{\\max} = ${uMax}\\text{ V}$`,
					diagnosticFeedback: 'استعمل العلاقة التحليلية OA = -f\'(k+1)/k الناتجة عن علاقة ديكارت مع γ = -k.'
				},
				{
					text: `$\\overline{OA} = ${oaCm}\\text{ cm}\\quad ;\\quad U_{\\max} = ${uEff}\\text{ V}$`,
					diagnosticFeedback: 'العلاقة بين الأعظمي والمنتج هي U_max = U_eff · √2.'
				},
				{
					text: `$\\overline{OA} = +${Math.abs(oaCm)}\\text{ cm}\\quad ;\\quad U_{\\max} = ${roundTo(uEff / Math.SQRT2, 2)}\\text{ V}$`,
					diagnosticFeedback: 'انتبه لإشارة OA السالبة أمام العدسة ولعلاقة U_max = U_eff·√2.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'التمثيل الزمني للتوتر الجيبي u(t)',
				width: 310
			},
			{
				type: 'text',
				content: `الجزء الأول (البصريات التحليلية): نريد الحصول بواسطة عدسة مجمعة بعدها المحرقي $f' = +${fCm}" cm"$ على صورة حقيقية مقلوبة مكبرة $${kMag}$ مرات ($gamma = -${kMag}$).\n1) برهن تحليلياً من علاقة ديكارت أن موضع الجسم يحقق $overline("OA") = -f' frac(${kMag} + 1, ${kMag})$، ثم احسب قيمتي $overline("OA")$ و $overline("OA'")$.`,
				answer: `1) البرهان التحليلي:\n- من $gamma = frac(overline("OA'"), overline("OA")) = -${kMag} arrow.r.double overline("OA'") = -${kMag} overline("OA")$.\n- بالتعويض في علاقة ديكارت: $frac(1, -${kMag} overline("OA")) - frac(1, overline("OA")) = frac(1, f') arrow.r.double -frac(${kMag} + 1, ${kMag} overline("OA")) = frac(1, f')$.\n- منه: $overline("OA") = -f' frac(${kMag} + 1, ${kMag}) = -${fCm} times frac(${kMag + 1}, ${kMag}) = ${oaCm}" cm"$، و $overline("OA'") = +${oapCm}" cm"$.`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (التيار المتناوب): يغذي محول مثالي حملاً بتوتر متناوب جيبي قيمته المنتجة $U_"eff" = ${uEff}" V"$ وتواتره $f = ${freqHz}" Hz"$.\n2) اكتب العبارة اللحظية $u(t) = U_"max" sin(omega t)$ بحساب كل من $U_"max"$ والنبض $omega = 2 pi f$، واستنتج قيمة الطاقة الدورانية $E_"cr"$ لمولد تزامن ($J_Delta = 0.02" kg" dot "m"^2$) يدور بسرعة زاوية $omega = 100" rad/s"$.`,
				answer: `2) الدالة الجيبية والطاقة الدورانية:\n- $U_"max" = U_"eff" sqrt(2) = ${uEff} sqrt(2) approx ${uMax}" V"$.\n- $omega = 2 pi f = 2 pi times ${freqHz} approx ${omega}" rad/s"$.\n- المعادلة اللحظية: $u(t) = ${uMax} sin(${omega} t)$ (بـ $"V"$).\n- الطاقة الدورانية: $E_"cr" = frac(1, 2) J_Delta omega^2 = 0.5 times 0.02 times (100)^2 = 100" J"$.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مسألة إدماجية (2AS MATH): (1) نريد صورة حقيقية مقلوبة تكبيرها $\\gamma = -${kMag}$ بعدسة مجمعة بعدها المحرقي $f' = +${fCm}\\text{ cm}$. (2) توتر متناوب قيمته المنتجة $U_{\\text{eff}} = ${uEff}\\text{ V}$ وتواتره $f = ${freqHz}\\text{ Hz}$.\nما هما موضع الجسم $\\overline{OA}$ والتوتر الأعظمي $U_{\\max}$؟`,
				questionTextAr: 'اختر القيمتين الصحيحتين لـ $\\overline{OA}$ و $U_{\\max}$:',
				imageUrl: svgUrl,
				imageCaption: 'الدالة الجيبية u(t)',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتعويض $\\overline{OA'} = -${kMag}\\overline{OA}$ في علاقة ديكارت نجد $\\overline{OA} = -f'\\frac{${kMag}+1}{${kMag}} = ${oaCm}\\text{ cm}$، والتوتر الأعظمي $U_{\\max} = ${uEff}\\sqrt{2} \\approx ${uMax}\\text{ V}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية سنوية (2AS MATH)',
				instruction: 'موضوع شامل بصياغة رياضية دقيقة يربط البصريات التحليلية بالتيار الجيبي والطاقة الدورانية.',
				content
			},
			hints: [
				`عبر عن $\\overline{OA'}$ بدلالة $\\overline{OA}$ من $\\gamma = \\overline{OA'}/\\overline{OA} = -${kMag}$ ثم عوض في علاقة ديكارت.`,
				`التوتر الأعظمي $U_{\\max} = U_{\\text{eff}}\\sqrt{2}$ والنبض $\\omega = 2\\pi f$.`,
				`الطاقة الدورانية $E_{cr} = \\frac{1}{2}J_\\Delta \\omega^2$.`
			],
			solutionStepsAr: [
				`البرهان على $\\overline{OA} = ${oaCm}\\text{ cm}$ و $\\overline{OA'} = +${oapCm}\\text{ cm}$.`,
				`كتابة $u(t) = ${uMax}\\sin(${omega} t)$.`,
				`حساب الطاقة الدورانية $E_{cr} = 100\\text{ J}$.`
			],
			finalAnswer: `\\overline{OA} = ${oaCm}\\text{ cm}\\quad ;\\quad u(t) = ${uMax}\\sin(${omega}t)\\text{ V}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_MATH_T3: PhysicsParameterizedTemplate[] = [
	adaptSharedMath(SHARED_TEMPLATES_2AS_T3[0], 'phy_lesson_2as_math_t3_organic_hydrocarbons_functional'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T3[1], 'phy_lesson_2as_math_t3_organic_hydrocarbons_functional'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T3[2], 'phy_lesson_2as_math_t3_thin_lenses_formula'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T3[3], 'phy_lesson_2as_math_t3_thin_lenses_formula'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T3[4], 'phy_lesson_2as_math_t3_integration'),
	tpl2asMathT3IntegrationAnnualMtm
];
