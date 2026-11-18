import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, svgConvergingLens } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

// ============================================================================
// 2AS SE Templates - Trimester 3 (7 templates: 5 non-integration + 2 integration)
// Extra SE depth in Organic Chemistry & Vision/Optics; NO TM/MATH topics
// ============================================================================

// SE-Specialized 1: Quantitative Organic Combustion & Alcohol Synthesis (5 pts, Experimental)
export const tpl2asSeT3OrganicCombustionAnalysis: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t3_organic_combustion_analysis',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'organic_chem',
	titleAr: 'التحليل الكمي في الكيمياء العضوية: احتراق كحول وجدول التقدم',
	curriculumLessonId: 'phy_lesson_2as_se_t3_oxygenated_functional_groups',
	defaultPoints: 5,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				n: 2,
				formula: 'C2H6O',
				semiK: '\\ce{CH3-CH2-OH}',
				semiT: '$"CH"_3-"CH"_2-"OH"$',
				name: 'الإيثانول',
				molarMass: 46,
				o2Coeff: 3,
				co2Coeff: 2,
				h2oCoeff: 3
			},
			{
				n: 3,
				formula: 'C3H8O',
				semiK: '\\ce{CH3-CH2-CH2-OH}',
				semiT: '$"CH"_3-"CH"_2-"CH"_2-"OH"$',
				name: 'بروبان-1-ول',
				molarMass: 60,
				o2Coeff: 4.5,
				co2Coeff: 3,
				h2oCoeff: 4
			}
		];
		const chosen = difficulty === 'easy' ? cases[0] : rng.pick(cases);
		const nMol = rng.pick([0.1, 0.2]);
		const massAlc = roundTo(nMol * chosen.molarMass, 2);
		const nCo2 = roundTo(nMol * chosen.co2Coeff, 2);
		const mCo2 = roundTo(nCo2 * 44, 2);
		const nH2o = roundTo(nMol * chosen.h2oCoeff, 2);

		const spAlc = chemSpecies(chosen.formula, 'l');
		const spO2 = chemSpecies('O2', 'g');
		const spCO2 = chemSpecies('CO2', 'g');
		const spH2O = chemSpecies('H2O', 'l');
		const eq = chemEquation(
			[
				{ coeff: Number.isInteger(chosen.o2Coeff) ? 1 : 2, formula: chosen.formula, state: 'l' },
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.o2Coeff : chosen.o2Coeff * 2, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.co2Coeff : chosen.co2Coeff * 2, formula: 'CO2', state: 'g' },
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.h2oCoeff : chosen.h2oCoeff * 2, formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [spAlc, spO2, spCO2, spH2O],
			initial: [
				{ katex: `$n_0 = ${nMol}$`, typst: `$n_0 = ${nMol}$` },
				{ katex: 'بوفرة', typst: 'بوفرة' },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: '0' }
			],
			intermediate: [
				{ katex: `$n_0 - ${Number.isInteger(chosen.o2Coeff) ? 'x' : '2x'}$`, typst: `$n_0 - ${Number.isInteger(chosen.o2Coeff) ? 'x' : '2x'}$` },
				{ katex: 'بوفرة', typst: 'بوفرة' },
				{ katex: `$${Number.isInteger(chosen.o2Coeff) ? `${chosen.co2Coeff}x` : `${chosen.co2Coeff * 2}x`}$`, typst: `$${Number.isInteger(chosen.o2Coeff) ? `${chosen.co2Coeff}x` : `${chosen.co2Coeff * 2}x`}$` },
				{ katex: `$${Number.isInteger(chosen.o2Coeff) ? `${chosen.h2oCoeff}x` : `${chosen.h2oCoeff * 2}x`}$`, typst: `$${Number.isInteger(chosen.o2Coeff) ? `${chosen.h2oCoeff}x` : `${chosen.h2oCoeff * 2}x`}$` }
			],
			final: [
				{ katex: `$0$`, typst: `$0$` },
				{ katex: 'بوفرة', typst: 'بوفرة' },
				{ katex: `$${nCo2}\\text{ mol}$`, typst: `$${nCo2}" mol"$` },
				{ katex: `$${nH2o}\\text{ mol}$`, typst: `$${nH2o}" mol"$` }
			]
		});

		const mcq = buildUniqueMcqOptions(
			`${spAlc.katex} ($m(\\ce{CO2}) = ${mCo2}\\text{ g}$)`,
			[
				{
					text: `${chemSpecies(chosen.n === 2 ? 'C3H8O' : 'C2H6O').katex} ($m(\\ce{CO2}) = ${mCo2}\\text{ g}$)`,
					diagnosticFeedback: 'راجع نسبة كمية مادة CO2 إلى كمية مادة الكحول (n_CO2 / n_alc = n).'
				},
				{
					text: `${spAlc.katex} ($m(\\ce{CO2}) = ${roundTo(mCo2 / 2, 2)}\\text{ g}$)`,
					diagnosticFeedback: 'تحقق من كتلة CO2 الناتجة: m = n_CO2 × 44 g/mol.'
				},
				{
					text: `${chemSpecies('C4H10O').katex} ($m(\\ce{CO2}) = ${roundTo(mCo2 * 1.5, 2)}\\text{ g}$)`,
					diagnosticFeedback: 'احسب الكتلة المولية M = 14n + 18 بدقة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) الكحول المشبع $(A)$ صيغته العامة $"C"_n "H"_(2n+2) "O"$، نحرق كتلة $m = ${massAlc}" g"$ منه احتراقاً تاماً فيتكون $n("CO"_2) = ${nCo2}" mol"$ و $n("H"_2"O") = ${nH2o}" mol"$. أوجد الصيغة المجملة لـ $(A)$ علماً أن $n_0(A) = ${nMol}" mol"$.`,
				answer: `1) إيجاد الصيغة المجملة:\n- عدد ذرات الكربون: $n = frac(n("CO"_2), n_0(A)) = frac(${nCo2}, ${nMol}) = ${chosen.n}$.\n- التحقق من الكتلة المولية: $M = 14(${chosen.n}) + 18 = ${chosen.molarMass}" g/mol"$, و $n_0 = frac(${massAlc}, ${chosen.molarMass}) = ${nMol}" mol"$.\n- الصيغة المجملة: ${spAlc.typst}.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب معادلة الاحتراق التام وأنجز جدول التقدم، ثم احسب كتلة غاز ثنائي أكسيد الكربون المنطلق ($M("CO"_2) = 44" g/mol"$).`,
				answer: `2) معادلة الاحتراق والكتلة:\n${eq.typst}\nكتلة غاز $"CO"_2$: $m("CO"_2) = ${nCo2} times 44 = ${mCo2}" g"$.`,
				mark: '2.0'
			},
			ice.typstBlock,
			{
				type: 'text',
				content: `3) أعط الصيغة نصف المفصلة والاسم النظامي لمتماكب الكحول الأولي (${chosen.name}) واذكر ناتج أكسدته المقتصدة.`,
				answer: `3) الكحول الأولي: ${chosen.semiT} (${chosen.name}). عند أكسدته المقتصدة يعطي الألدهيد الموافق ثم الحمض الكربوكسيلي بزيادة المؤكسد.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نُحرق تماماً $n_0 = ${nMol}\\text{ mol}$ من كحول أحادي الوظيفة مشبع $(A)$ فينتج $n(\\ce{CO2}) = ${nCo2}\\text{ mol}$ و $n(\\ce{H2O}) = ${nH2o}\\text{ mol}$ ($M(\\ce{CO2}) = 44\\text{ g/mol}$).\nما هي الصيغة المجملة للكحول وكتلة $\\ce{CO2}$ الناتجة؟`,
				questionTextAr: 'حدد الصيغة المجملة وكتلة $\\ce{CO2}$ الناتجة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نسبة الكربون $n = \\frac{n(\\ce{CO2})}{n_0} = ${chosen.n}$ فتكون الصيغة ${spAlc.katex}، وكتلة $\\ce{CO2}$ هي $${nCo2}\\times 44 = ${mCo2}\\text{ g}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نحرق كتلة $m = ${massAlc}" g"$ ($n_0 = ${nMol}" mol"$) من كحول مشبع $(A)$ احتراقاً تاماً في وفرة من غاز ثنائي الأكسجين فينطلق $n("CO"_2) = ${nCo2}" mol"$ و $n("H"_2"O") = ${nH2o}" mol"$.`,
				content
			},
			hints: [
				`في احتراق مركب يحتوي على $n$ ذرة كربون: $n(\\ce{CO2}) = n \\cdot n_0$.`,
				`الكتلة المولية لكحول مشبع: $M(\\ce{C_nH_{2n+2}O}) = 14n + 18$.`,
				`كتلة الغاز الناتج: $m(\\ce{CO2}) = n(\\ce{CO2}) \\times 44$.`
			],
			solutionStepsAr: [
				`حساب عدد ذرات الكربون $n = ${chosen.n}$ وتحديد ${spAlc.katex}.`,
				`موازنة معادلة الاحتراق وجدول التقدم وحساب $m(\\ce{CO2}) = ${mCo2}\\text{ g}$.`,
				`تحديد الصيغة نصف المفصلة $${chosen.semiK}$ (${chosen.name}).`
			],
			finalAnswer: `${spAlc.katex}\\quad ;\\quad m(\\ce{CO2}) = ${mCo2}\\text{ g}`
		};
	}
};

// SE-Specialized 2 (Integration, Experimental): Optical System + Organic Ester Identification (7 pts)
export const tpl2asSeT3IntegrationOpticsTitrationBacPrep: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t3_integration_optics_titration_bac_prep',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'التمرين التجريبي (2AS SE): دراسة عدسة مجمعة والعين وتمييز المجموعات الأكسجينية',
	curriculumLessonId: 'phy_lesson_2as_se_t3_integration',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const fCm = rng.pick([15, 20]);
		const oaCm = fCm === 15 ? -20 : -30;
		const oapCm = fCm === 15 ? 60 : 60;
		const gamma = roundTo(oapCm / oaCm, 2);
		const cLens = roundTo(100 / fCm, 2);
		const cCorrect = rng.pick([-2, -2.5, -4]);
		const prM = roundTo(-1 / cCorrect, 2);

		const svg = svgConvergingLens({
			fLabel: `f' = ${fCm} cm`,
			objLabel: 'B',
			imgLabel: "B'"
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_se_t3_exp_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$\\overline{OA'} = +${oapCm}\\text{ cm}\\quad ;\\quad PR = ${prM}\\text{ m}$`,
			[
				{
					text: `$\\overline{OA'} = -${oapCm}\\text{ cm}\\quad ;\\quad PR = ${prM}\\text{ m}$`,
					diagnosticFeedback: 'الجسم موضوع أبعد من المحراق (|OA| > f\') لذا الصورة حقيقية خلف العدسة (OA\' > 0).'
				},
				{
					text: `$\\overline{OA'} = +${oapCm}\\text{ cm}\\quad ;\\quad PR = ${Math.abs(cCorrect)}\\text{ m}$`,
					diagnosticFeedback: 'المسافة PR = -1 / C وليس قيمة الكسيرة نفسها.'
				},
				{
					text: `$\\overline{OA'} = +${roundTo(oapCm / 2, 1)}\\text{ cm}\\quad ;\\quad PR = ${roundTo(prM * 2, 2)}\\text{ m}$`,
					diagnosticFeedback: 'راجع تطبيق علاقة التوافق (ديكارت).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الإنشاء الهندسي للصورة بعدسة مجمعة',
				width: 310
			},
			{
				type: 'text',
				content: `الجزء الأول (البصريات): نضع جسماً $AB$ طوله $2" cm"$ على مسافة $overline("OA") = ${oaCm}" cm"$ أمام عدسة مجمعة بعدها المحرقي $f' = +${fCm}" cm"$.\n1) احسب كسيرة العدسة $C$، ثم أوجد موضع الصورة $overline("OA'")$ والتكبير $gamma$ واستنتج صفاتها.`,
				answer: `1) دراسة العدسة المجمعة:\n- الكسيرة: $C = frac(1, ${roundTo(fCm / 100, 2)}) = +${cLens}\\,delta$.\n- علاقة التوافق: $frac(1, overline("OA'")) = frac(1, ${fCm}) + frac(1, ${oaCm}) = frac(1, ${oapCm}) arrow.r.double overline("OA'") = +${oapCm}" cm"$.\n- التكبير: $gamma = frac(${oapCm}, ${oaCm}) = ${gamma}$ (صورة حقيقية مقلوبة ومكبرة).`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `2) يرتدي تلميذ نظارات طبية بعدسات مفرقة كسيرتها $C_"corr" = ${cCorrect}\\,delta$. ما عيب الإبصار الذي يعاني منه؟ وما هي أبعد نقطة يراها بوضوح ($"PR"$) بدون نظارات؟`,
				answer: `2) عيب الإبصار:\n- بما أن العدسة مفرقة ($C_"corr" < 0$) فالعيب هو **قصر النظر**.\n- مسافة $"PR"$: $overline("OA'") = frac(1, C_"corr") = frac(1, ${cCorrect}) = -${prM}" m"$، أي $"PR" = ${prM}" m"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (الكيمياء العضوية): نميز مخبرياً بين قارورتين إحداهما تحوي البروبانال ($"CH"_3-"CH"_2-"CHO"$) والأخرى البروبانون ($"CH"_3-"CO"-"CH"_3$).\n3) اقترح اختباراً كيميائياً يميز بينهما، واكتب اسم العائلة الوظيفية لكل منهما.`,
				answer: `3) التمييز المخبري:\n- البروبانال ينتمي للألدهيدات، والبروبانون ينتمي للكيتونات.\n- عند التسخين مع محلول فهلنغ (أو كاشف تولنز): يعطي البروبانال راسباً أحمر آجرياً (أو مرآة فضية)، بينما لا يتفاعل البروبانون.`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في تمرين إدماجي (2AS SE): (1) نضع جسماً أمام عدسة مجمعة ($f' = +${fCm}\\text{ cm}$) على مسافة $\\overline{OA} = ${oaCm}\\text{ cm}$. (2) يصحح تلميذ بصره بعدسة مفرقة كسيرتها $C = ${cCorrect}\\,\\delta$.\nما هما موضع الصورة $\\overline{OA'}$ ونقطة الكثب $PR$ للتلميذ؟`,
				questionTextAr: 'اختر القيمتين الصحيحتين لـ $\\overline{OA\'}$ و $PR$:',
				imageUrl: svgUrl,
				imageCaption: 'العدسة المجمعة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بعلاقة ديكارت $\\overline{OA'} = +${oapCm}\\text{ cm}$، ونقطة الكثب لقصر النظر هي $PR = \\frac{1}{|C|} = ${prM}\\text{ m}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الجزء الثاني: التمرين التجريبي (البصريات والكيمياء العضوية)',
				instruction: 'يضم التمرين دراسة بصرية لعدسة مجمعة وتصحيح عيب إبصار، متبوعة بتجربة تمييز كيميائي.',
				content
			},
			hints: [
				`طبق علاقة التوافق $\\frac{1}{\\overline{OA'}} = \\frac{1}{f'} + \\frac{1}{\\overline{OA}}$.`,
				`العدسة المفرقة ($C < 0$) تصحح قصر النظر بحيث $PR = |1/C|$.`,
				`محلول فهلنغ يكشف عن الألدهيدات فقط دون الكيتونات.`
			],
			solutionStepsAr: [
				`حساب $\\overline{OA'} = +${oapCm}\\text{ cm}$ والتكبير $\\gamma = ${gamma}$.`,
				`تحديد قصر النظر وحساب $PR = ${prM}\\text{ m}$.`,
				`التمييز بين الألدهيد والكيتون بمحلول فهلنغ أو كاشف تولنز.`
			],
			finalAnswer: `\\overline{OA'} = +${oapCm}\\text{ cm}\\quad ;\\quad PR = ${prM}\\text{ m}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_SE_T3: PhysicsParameterizedTemplate[] = [
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T3[0], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T3[1], '2as_se'),
	tpl2asSeT3OrganicCombustionAnalysis,
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T3[2], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T3[3], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T3[4], '2as_se'),
	tpl2asSeT3IntegrationOpticsTitrationBacPrep
];
