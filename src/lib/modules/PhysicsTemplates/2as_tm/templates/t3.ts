import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, svgConvergingLens } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

function adaptSharedTm(
	base: PhysicsParameterizedTemplate,
	curriculumLessonId: string
): PhysicsParameterizedTemplate {
	const adapted = adaptPhysicsTemplateForTrack(base, '2as_tm');
	return {
		...adapted,
		curriculumLessonId
	};
}

// ============================================================================
// 2AS TM Exclusive Annual Integration (T3): Rotation + Induction + Thin Lenses (6 pts)
// ============================================================================

export const tpl2asTmT3IntegrationAnnualMtm: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t3_integration_annual_mtm',
	grade: '2as_tm',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'مسألة إدماجية سنوية (2AS TM): الطاقة الدورانية، التحريض الكهرومغناطيسي، والعدسات',
	curriculumLessonId: 'phy_lesson_2as_tm_t3_integration',
	defaultPoints: 6,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Part 1: Rotational disc & Faraday
		const jDelta = 0.04;
		const omega = rng.pick([20, 30, 40]);
		const ecr = roundTo(0.5 * jDelta * omega * omega, 2);
		const deltaPhi = 0.12;
		const dtS = 0.03;
		const eInd = roundTo(deltaPhi / dtS, 2);

		// Part 2: Thin converging lens
		const fCm = rng.pick([10, 20]);
		const oaCm = fCm === 10 ? -15 : -30;
		const oapCm = fCm === 10 ? 30 : 60;
		const gamma = roundTo(oapCm / oaCm, 2);

		const svg = svgConvergingLens({
			fLabel: `f' = ${fCm} cm`,
			objLabel: 'B',
			imgLabel: "B'"
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_tm_t3_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$E_{cr} = ${ecr}\\text{ J}\\quad ;\\quad \\overline{OA'} = +${oapCm}\\text{ cm}$`,
			[
				{
					text: `$E_{cr} = ${roundTo(ecr * 2, 2)}\\text{ J}\\quad ;\\quad \\overline{OA'} = +${oapCm}\\text{ cm}$`,
					diagnosticFeedback: 'نسيت معامل 1/2 في عبارة الطاقة الحركية الدورانية E_cr = 1/2 J_Δ ω².'
				},
				{
					text: `$E_{cr} = ${ecr}\\text{ J}\\quad ;\\quad \\overline{OA'} = -${oapCm}\\text{ cm}$`,
					diagnosticFeedback: 'عندما |OA| > f\' في عدسة مجمعة تتكون صورة حقيقية خلف العدسة (OA\' > 0).'
				},
				{
					text: `$E_{cr} = ${roundTo(ecr / 2, 2)}\\text{ J}\\quad ;\\quad \\overline{OA'} = +${roundTo(oapCm / 2, 1)}\\text{ cm}$`,
					diagnosticFeedback: 'راجع معادلة الطاقة الدورانية وعلاقة ديكارت.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الإنشاء الهندسي للصورة بعدسة مجمعة في التمرين السنوي',
				width: 300
			},
			{
				type: 'text',
				content: `الجزء الأول (الدوران والتحريض): يدور قرص منوب كهربائي عزم عطالته $J_Delta = ${jDelta}" kg" dot "m"^2$ بسرعة زاوية $omega = ${omega}" rad/s"$، ويتغير التدفق المغناطيسي عبر وشيعته بمقدار $Delta Phi = -${deltaPhi}" Wb"$ خلال $Delta t = ${dtS}" s"$.\n1) احسب الطاقة الحركية الدورانية للقرص $E_"cr"$ والقوة المحركة التحريضية المتوسطة $e$.`,
				answer: `1) الطاقة الدورانية والتحريض:\n- $E_"cr" = frac(1, 2) J_Delta omega^2 = 0.5 times ${jDelta} times (${omega})^2 = ${ecr}" J"$.\n- $e = -frac(Delta Phi, Delta t) = -frac(-${deltaPhi}, ${dtS}) = +${eInd}" V"$.`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (البصريات الهندسية): نضع جسماً $AB$ على مسافة $overline("OA") = ${oaCm}" cm"$ أمام عدسة مجمعة بعدها المحرقي $f' = +${fCm}" cm"$.\n2) احسب موضع الصورة $overline("OA'")$ والتكبير $gamma$، وحدد طبيعة الصورة المتشكلة.`,
				answer: `2) علاقة التوافق والتكبير:\n- $frac(1, overline("OA'")) = frac(1, ${fCm}) + frac(1, ${oaCm}) = frac(1, ${oapCm}) arrow.r.double overline("OA'") = +${oapCm}" cm"$.\n- $gamma = frac(${oapCm}, ${oaCm}) = ${gamma}$.\n- الصورة حقيقية ($overline("OA'") > 0$) ومقلوبة ومكبرة مرتين ($|gamma| = 2$).`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مسألة تحضيرية لـ 3AS TM: (1) يدور قرص عزم عطالته $J_\\Delta = ${jDelta}\\text{ kg}\\cdot\\text{m}^2$ بسرعة $\\omega = ${omega}\\text{ rad/s}$. (2) يُوضع جسم أمام عدسة مجمعة ($f' = +${fCm}\\text{ cm}$) عند $\\overline{OA} = ${oaCm}\\text{ cm}$.\nما هما الطاقة الحركية الدورانية $E_{cr}$ وموضع الصورة $\\overline{OA'}$؟`,
				questionTextAr: 'احسب $E_{cr}$ وموضع الصورة $\\overline{OA\'}$:',
				imageUrl: svgUrl,
				imageCaption: 'العدسة المجمعة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$E_{cr} = \\frac{1}{2}(${jDelta})(${omega})^2 = ${ecr}\\text{ J}$، ومن علاقة التوافق $\\overline{OA'} = +${oapCm}\\text{ cm}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية سنوية (2AS TM)',
				instruction: 'موضوع شامل يدمج محاور الميكانيك الدوراني والتحريض الكهرومغناطيسي مع البصريات الهندسية.',
				content
			},
			hints: [
				`الطاقة الحركية الدورانية $E_{cr} = \\frac{1}{2}J_\\Delta \\omega^2$.`,
				`قانون فاراداي: $e = -\\Delta\\Phi/\\Delta t$.`,
				`علاقة التوافق: $\\frac{1}{\\overline{OA'}} = \\frac{1}{f'} + \\frac{1}{\\overline{OA}}$.`
			],
			solutionStepsAr: [
				`حساب $E_{cr} = ${ecr}\\text{ J}$ و $e = +${eInd}\\text{ V}$.`,
				`حساب موضع الصورة $\\overline{OA'} = +${oapCm}\\text{ cm}$.`,
				`التكبير $\\gamma = ${gamma}$ والصورة حقيقية مقلوبة ومكبرة.`
			],
			finalAnswer: `E_{cr} = ${ecr}\\text{ J}\\quad ;\\quad e = +${eInd}\\text{ V}\\quad ;\\quad \\overline{OA'} = +${oapCm}\\text{ cm}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_TM_T3: PhysicsParameterizedTemplate[] = [
	adaptSharedTm(SHARED_TEMPLATES_2AS_T3[0], 'phy_lesson_2as_tm_t3_organic_hydrocarbons_functional'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T3[1], 'phy_lesson_2as_tm_t3_organic_hydrocarbons_functional'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T3[2], 'phy_lesson_2as_tm_t3_thin_lenses_formula'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T3[3], 'phy_lesson_2as_tm_t3_thin_lenses_formula'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T3[4], 'phy_lesson_2as_tm_t3_integration'),
	tpl2asTmT3IntegrationAnnualMtm
];
