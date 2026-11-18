import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgConvergingLens,
	svgPhysicsCurvePlot
} from '../../svg-physics';

// ============================================================================
// 5 Shared Trimester 3 Parameterized Templates for 2AS (SE / TM / MATH)
// ============================================================================

// 1. Hydrocarbons (Alkanes, Alkenes, Alkynes) & IUPAC Nomenclature (4 pts)
export const tpl2asSharedT3HydrocarbonsIupac: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t3_hydrocarbons_iupac',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'organic_chem',
	titleAr: 'الفحوم الهيدروجينية: الصيغة المجملة والتسمية النظامية (IUPAC) والاحتراق',
	curriculumLessonId: 'phy_lesson_2as_shared_t3_organic_hydrocarbons_nomenclature',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				familyAr: 'ألكان',
				generalKatex: '\\ce{C_nH_{2n+2}}',
				generalTypst: '$"C"_n "H"_(2n+2)$',
				n: 4,
				molarMass: 58,
				formula: 'C4H10',
				nameIupac: '2-ميثيل بروبان',
				semiK: '\\ce{CH3-CH(CH3)-CH3}',
				semiT: '$"CH"_3-"CH"("CH"_3)-"CH"_3$',
				o2Coeff: 6.5,
				co2Coeff: 4,
				h2oCoeff: 5,
				isomerNote: 'البوتان ($"CH"_3-"CH"_2-"CH"_2-"CH"_3$) و 2-ميثيل بروبان'
			},
			{
				familyAr: 'ألسن',
				generalKatex: '\\ce{C_nH_{2n}}',
				generalTypst: '$"C"_n "H"_(2n)$',
				n: 4,
				molarMass: 56,
				formula: 'C4H8',
				nameIupac: 'بوت-1-ين',
				semiK: '\\ce{CH2=CH-CH2-CH3}',
				semiT: '$"CH"_2="CH"-"CH"_2-"CH"_3$',
				o2Coeff: 6,
				co2Coeff: 4,
				h2oCoeff: 4,
				isomerNote: 'بوت-1-ين، بوت-2-ين، و 2-ميثيل بروبين'
			},
			{
				familyAr: 'ألسين',
				generalKatex: '\\ce{C_nH_{2n-2}}',
				generalTypst: '$"C"_n "H"_(2n-2)$',
				n: 4,
				molarMass: 54,
				formula: 'C4H6',
				nameIupac: 'بوت-1-اين',
				semiK: '\\ce{CH#C-CH2-CH3}',
				semiT: '$"CH" eq.triple "C"-"CH"_2-"CH"_3$',
				o2Coeff: 5.5,
				co2Coeff: 4,
				h2oCoeff: 3,
				isomerNote: 'بوت-1-اين و بوت-2-اين'
			},
			{
				familyAr: 'ألكان',
				generalKatex: '\\ce{C_nH_{2n+2}}',
				generalTypst: '$"C"_n "H"_(2n+2)$',
				n: 5,
				molarMass: 72,
				formula: 'C5H12',
				nameIupac: '2-ميثيل بوتان',
				semiK: '\\ce{CH3-CH(CH3)-CH2-CH3}',
				semiT: '$"CH"_3-"CH"("CH"_3)-"CH"_2-"CH"_3$',
				o2Coeff: 8,
				co2Coeff: 5,
				h2oCoeff: 6,
				isomerNote: 'البنتان، 2-ميثيل بوتان، و 2،2-ثنائي ميثيل بروبان'
			}
		];
		const chosen = difficulty === 'easy' ? cases[0] : rng.pick(cases);
		const spComp = chemSpecies(chosen.formula);
		const combEq = chemEquation(
			[
				{ coeff: Number.isInteger(chosen.o2Coeff) ? 1 : 2, formula: chosen.formula, state: 'g' },
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.o2Coeff : chosen.o2Coeff * 2, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.co2Coeff : chosen.co2Coeff * 2, formula: 'CO2', state: 'g' },
				{ coeff: Number.isInteger(chosen.o2Coeff) ? chosen.h2oCoeff : chosen.h2oCoeff * 2, formula: 'H2O', state: 'l' }
			]
		);

		const wrongFormulas = ['C3H8', 'C4H10', 'C4H8', 'C4H6', 'C5H12', 'C6H14'].filter(
			(f) => f !== chosen.formula
		);

		const mcq = buildUniqueMcqOptions(
			chemSpecies(chosen.formula).katex,
			[
				{
					text: chemSpecies(wrongFormulas[0]).katex,
					diagnosticFeedback: 'تحقق من الصيغة العامة للعائلة الكيميائية ومن قيمة الكتلة المولية M.'
				},
				{
					text: chemSpecies(wrongFormulas[1]).katex,
					diagnosticFeedback: 'راجع حساب 12n + عدد ذرات الهيدروجين = M.'
				},
				{
					text: chemSpecies(wrongFormulas[2]).katex,
					diagnosticFeedback: 'انتبه للفرق في عدد ذرات الهيدروجين بين الألكان والألسن والألسين.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اكتب الصيغة العامة لهذا الفحم الهيدروجيني، ثم أوجد عدد ذرات الكربون $n$ واكتب صيغته المجملة ($M("C") = 12, M("H") = 1" g/mol"$).`,
				answer: `1) الصيغة العامة للعائلة (${chosen.familyAr}): ${chosen.generalTypst}.\nبتعويض الكتلة المولية: $M = ${chosen.molarMass}" g/mol" arrow.r.double n = ${chosen.n}$.\nإذن الصيغة المجملة هي: ${spComp.typst}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اكتب الصيغة نصف المفصلة للمركب المتفرع/المسمى "${chosen.nameIupac}"، واذكر متماكبات الصيغة المجملة ${spComp.typst}.`,
				answer: `2) الصيغة نصف المفصلة لـ (${chosen.nameIupac}): ${chosen.semiT}.\nالمتماكبات الممكنة: ${chosen.isomerNote}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) اكتب معادلة الاحتراق التام لهذا المركب في غاز ثنائي الأكسجين ${chemSpecies('O2', 'g').typst}.`,
				answer: `3) معادلة الاحتراق التام:\n${combEq.typst}`,
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
				questionText: `فحم هيدروجيني غير حلقي ينتمي إلى عائلة **${chosen.familyAr}** كتلته المولية الجزيئية $M = ${chosen.molarMass}\\text{ g/mol}$ ($M(\\text{C}) = 12$, $M(\\text{H}) = 1\\text{ g/mol}$).\nما هي صيغته المجملة؟`,
				questionTextAr: 'حدد الصيغة المجملة للفحم الهيدروجيني:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الصيغة العامة هي $${chosen.generalKatex}$، وبحل معادلة الكتلة المولية نجد $n = ${chosen.n}$، أي الصيغة المجملة هي ${spComp.katex}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `فحم هيدروجيني غير حلقي $(A)$ من عائلة **${chosen.familyAr}** كتلته المولية الجزيئية $M = ${chosen.molarMass}" g/mol"$.`,
				content
			},
			hints: [
				`الألكان: $\\ce{C_nH_{2n+2}}$، الألسن: $\\ce{C_nH_{2n}}$، الألسين: $\\ce{C_nH_{2n-2}}$.`,
				`احسب $n$ من $M(C) \\cdot n + M(H) \\cdot (\\text{عدد الهيدروجين}) = ${chosen.molarMass}$.`,
				`الاحتراق التام لفحم هيدروجيني يعطي $\\ce{CO2}$ و $\\ce{H2O}$.`
			],
			solutionStepsAr: [
				`تحديد الصيغة العامة وإيجاد $n = ${chosen.n} \\implies$ ${spComp.katex}.`,
				`كتابة الصيغة نصف المفصلة $${chosen.semiK}$ وتحديد المتماكبات.`,
				`موازنة معادلة الاحتراق التام: ${combEq.katex}.`
			],
			finalAnswer: `${spComp.katex}\\quad ;\\quad ${chosen.nameIupac}`
		};
	}
};

// 2. Oxygenated Functional Groups & Alcohol Oxidation (4 pts)
export const tpl2asSharedT3OxygenatedFunctionalGroups: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t3_oxygenated_functional_groups',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'organic_chem',
	titleAr: 'العائلات الوظيفية الأكسجينية وأكسدة الكحولات والكواشف المميزة',
	curriculumLessonId: 'phy_lesson_2as_shared_t3_oxygenated_functional_groups',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				alcoholName: 'بروبان-1-ول',
				alcoholClass: 'كحول أولي',
				alcoholSemiK: '\\ce{CH3-CH2-CH2-OH}',
				alcoholSemiT: '$"CH"_3-"CH"_2-"CH"_2-"OH"$',
				productName: 'البروبانال',
				productFamily: 'ألدهيد',
				productSemiK: '\\ce{CH3-CH2-CHO}',
				productSemiT: '$"CH"_3-"CH"_2-"CHO"$',
				fehlingTest: 'يعطي راسباً أحمر آجرياً مع محلول فهلنغ (ومرآة فضية مع كاشف تولنز)',
				acidName: 'حمض البروبانويك',
				acidSemiT: '$"CH"_3-"CH"_2-"COOH"$'
			},
			{
				alcoholName: 'بروبان-2-ول',
				alcoholClass: 'كحول ثانوي',
				alcoholSemiK: '\\ce{CH3-CH(OH)-CH3}',
				alcoholSemiT: '$"CH"_3-"CH"("OH")-"CH"_3$',
				productName: 'البروبانون',
				productFamily: 'كيتون',
				productSemiK: '\\ce{CH3-CO-CH3}',
				productSemiT: '$"CH"_3-"CO"-"CH"_3$',
				fehlingTest: 'لا يتفاعل مع محلول فهلنغ ولا مع كاشف تولنز (ويعطي راسباً أصفر مع DNPH)',
				acidName: 'لا يتأكسد أكثر في الشروط المقتصدة',
				acidSemiT: 'لا يعطي حمضاً كربوكسيلياً'
			},
			{
				alcoholName: 'بوتان-1-ول',
				alcoholClass: 'كحول أولي',
				alcoholSemiK: '\\ce{CH3-CH2-CH2-CH2-OH}',
				alcoholSemiT: '$"CH"_3-"CH"_2-"CH"_2-"CH"_2-"OH"$',
				productName: 'البوتانال',
				productFamily: 'ألدهيد',
				productSemiK: '\\ce{CH3-CH2-CH2-CHO}',
				productSemiT: '$"CH"_3-"CH"_2-"CH"_2-"CHO"$',
				fehlingTest: 'يعطي راسباً أحمر آجرياً مع محلول فهلنغ',
				acidName: 'حمض البوتانويك',
				acidSemiT: '$"CH"_3-"CH"_2-"CH"_2-"COOH"$'
			}
		];
		const chosen = difficulty === 'easy' ? cases[0] : rng.pick(cases);

		const mcq = buildUniqueMcqOptions(
			`${chosen.productName} (${chosen.productFamily})`,
			[
				{
					text: chosen.productFamily === 'ألدهيد' ? 'كيتون لا يتفاعل مع فهلنغ' : 'ألدهيد يرجع محلول فهلنغ',
					diagnosticFeedback: 'راجع ناتج الأكسدة المقتصدة حسب صنف الكحول (أولي يعطي ألدهيداً، ثانوي يعطي كيتوناً).'
				},
				{
					text: 'ألسن ناتج عن نزع الماء',
					diagnosticFeedback: 'الأكسدة المقتصدة بالبرمنغنات تحول الكحول إلى مركب كربونيلي وليس ألسناً.'
				},
				{
					text: 'إستر ناتج عن الأسترة',
					diagnosticFeedback: 'الإستر ينتج عن تفاعل حمض كربوكسيلي مع كحول وليس أكسدة مقتصدة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) صنّف الكحول ${chosen.alcoholName} (${chosen.alcoholSemiT}) مع التعليل.`,
				answer: `1) التصنيف: ${chosen.alcoholClass}، لأن ذرة الكربون الوظيفية الحاملة لزمرة الهيدروكسيل (-"OH") مرتبطة بـ ${chosen.alcoholClass === 'كحول أولي' ? 'ذرة كربون واحدة فقط (أو بهيدروجينين)' : 'ذرتي كربون (وبذرة هيدروجين واحدة)'}.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) يتأكسد هذا الكحول أكسدة مقتصدة بمحلول برمنغنات البوتاسيوم المحمض بالكمية المناسبة ليعطي مركباً $(B)$. حدد عائلة $(B)$، صيغته نصف المفصلة واسمه النظامي.`,
				answer: `2) ناتج الأكسدة المقتصدة:\n- العائلة: ${chosen.productFamily}.\n- الاسم: ${chosen.productName}، وصيغته نصف المفصلة: ${chosen.productSemiT}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) كيف نكشف تجريبياً عن المركب $(B)$ باستعمال كاشف $"2,4-DNPH"$ ومحلول فهلنغ؟ وماذا يحدث إذا استُعمل المؤكسد بزيادة؟`,
				answer: `3) الكواشف المميزة والمؤكسد بزيادة:\n- مع $"2,4-DNPH"$: يظهر راسب أصفر برتقالي في الحالتين (ألدهيد أو كيتون).\n- مع محلول فهلنغ: ${chosen.fehlingTest}.\n- بزيادة المؤكسد: ${chosen.acidName} (${chosen.acidSemiT}).`,
				mark: '1.5'
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
				questionText: `نُخضع الكحول **${chosen.alcoholName}** ($${chosen.alcoholSemiK}$) لأكسدة مقتصدة بمحلول برمنغنات البوتاسيوم المحمض.\nما هو الناتج الأولي الرئيسي لهذه الأكسدة المقتصدة؟`,
				questionTextAr: 'حدد المركب الناتج عن الأكسدة المقتصدة للكحول:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الكحول هو ${chosen.alcoholClass}، لذا فأكسدته المقتصدة تعطي ${chosen.productFamily} هو **${chosen.productName}** ($${chosen.productSemiK}$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الكحول $(A)$ الذي اسمه النظامي **${chosen.alcoholName}** وصيغته نصف المفصلة ${chosen.alcoholSemiT}.`,
				content
			},
			hints: [
				`الكحول الأولي يحمل $\\ce{-CH2OH}$، والثانوي يحمل $\\ce{>CH-OH}$.`,
				`تأكسد الكحول الأولي يعطي ألدهيداً ثم حمضاً كربوكسيلياً، أما الثانوي فيعطي كيتوناً.`,
				`يميز محلول فهلنغ وكاشف تولنز الألدهيدات عن الكيتونات.`
			],
			solutionStepsAr: [
				`تصنيف الكحول: ${chosen.alcoholClass}.`,
				`ناتج الأكسدة المقتصدة: ${chosen.productName} ($${chosen.productSemiK}$).`,
				`نتيجة الاختبار: ${chosen.fehlingTest}.`
			],
			finalAnswer: `${chosen.alcoholClass}\\quad ;\\quad ${chosen.productName}`
		};
	}
};

// 3. Thin Lenses & Descartes Conjugate Formula (4 pts)
export const tpl2asSharedT3ThinLensesDescartes: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t3_thin_lenses_descartes',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'العدسات الرقيقة: علاقة التوافق والتكبير والإنشاء الهندسي',
	curriculumLessonId: 'phy_lesson_2as_shared_t3_thin_lenses_images',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ fCm: 20, oaCm: -30, oapCm: 60, gamma: -2, abCm: 1.5, apbpCm: -3 },
			{ fCm: 15, oaCm: -30, oapCm: 30, gamma: -1, abCm: 2, apbpCm: -2 },
			{ fCm: 20, oaCm: -60, oapCm: 30, gamma: -0.5, abCm: 4, apbpCm: -2 },
			{ fCm: 10, oaCm: -15, oapCm: 30, gamma: -2, abCm: 1.5, apbpCm: -3 }
		];
		const chosen = difficulty === 'easy' ? cases[1] : rng.pick(cases);
		const cDiop = roundTo(100 / chosen.fCm, 2);

		const svg = svgConvergingLens({
			fLabel: `f' = ${chosen.fCm} cm`,
			objLabel: 'B',
			imgLabel: "B'"
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t3_lens_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$\\overline{OA'} = +${chosen.oapCm}\\text{ cm}\\quad ;\\quad \\gamma = ${chosen.gamma}$`,
			[
				{
					text: `$\\overline{OA'} = ${roundTo((chosen.fCm * Math.abs(chosen.oaCm)) / (chosen.fCm + Math.abs(chosen.oaCm)), 1)}\\text{ cm}\\quad ;\\quad \\gamma = ${roundTo(Math.abs(chosen.gamma), 2)}$`,
					diagnosticFeedback: 'عوضت قيمة OA موجبة بدلاً من سالبة في علاقة ديكارت 1/OA\' - 1/OA = 1/f\'.'
				},
				{
					text: `$\\overline{OA'} = -${chosen.oapCm}\\text{ cm}\\quad ;\\quad \\gamma = ${Math.abs(chosen.gamma)}$`,
					diagnosticFeedback: 'تحقق من إشارة OA\' وإشارة التكبير (الصورة الحقيقية خلف العدسة مقلوبة).'
				},
				{
					text: `$\\overline{OA'} = +${chosen.oapCm}\\text{ cm}\\quad ;\\quad \\gamma = ${roundTo(1 / chosen.gamma, 2)}$`,
					diagnosticFeedback: 'قلبت نسبة التكبير: γ = OA\' / OA وليس OA / OA\'.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الإنشاء الهندسي للصورة عبر عدسة رقيقة مجمعة',
				width: 310
			},
			{
				type: 'text',
				content: `1) احسب كسيرة العدسة $C$ بوحدة الديوبتري ($delta$).`,
				answer: `1) الكسيرة: $f' = ${chosen.fCm}" cm" = ${roundTo(chosen.fCm / 100, 2)}" m"$.\n$C = frac(1, f') = frac(1, ${roundTo(chosen.fCm / 100, 2)}) = +${cDiop}\\,delta$.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) باستعمال علاقة التوافق (ديكارت)، حدد موضع الصورة الجبري $overline("OA'")$، ثم احسب التكبير $gamma$ وطول الصورة $overline("A'B'")$ واستنتج صفاتها.`,
				answer: `2) علاقة التوافق والتكبير:\n- $frac(1, overline("OA'")) - frac(1, overline("OA")) = frac(1, f') arrow.r.double frac(1, overline("OA'")) = frac(1, ${chosen.fCm}) + frac(1, ${chosen.oaCm}) = frac(1, ${chosen.oapCm}) arrow.r.double overline("OA'") = +${chosen.oapCm}" cm"$.\n- التكبير: $gamma = frac(overline("OA'"), overline("OA")) = frac(${chosen.oapCm}, ${chosen.oaCm}) = ${chosen.gamma}$.\n- طول الصورة: $overline("A'B'") = gamma dot overline("AB") = ${chosen.gamma} times ${chosen.abCm} = ${chosen.apbpCm}" cm"$.\n- صفات الصورة: حقيقية (لأن $overline("OA'") > 0$) ومقلوبة (لأن $gamma < 0$).`,
				mark: '3.0'
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
				questionText: `نضع جسماً مضيئاً $AB$ طوله $${chosen.abCm}\\text{ cm}$ أمام عدسة رقيقة مجمعة بعدها المحرقي $f' = +${chosen.fCm}\\text{ cm}$ على مسافة $${Math.abs(chosen.oaCm)}\\text{ cm}$ ($\\overline{OA} = ${chosen.oaCm}\\text{ cm}$).\nما قيمة موضع الصورة $\\overline{OA'}$ والتكبير $\\gamma$؟`,
				questionTextAr: 'احسب موضع الصورة $\\overline{OA\'}$ والتكبير $\\gamma$:',
				imageUrl: svgUrl,
				imageCaption: 'العدسة المجمعة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتطبيق علاقة ديكارت: $\\frac{1}{\\overline{OA'}} = \\frac{1}{${chosen.fCm}} + \\frac{1}{${chosen.oaCm}} = \\frac{1}{${chosen.oapCm}} \\implies \\overline{OA'} = +${chosen.oapCm}\\text{ cm}$، والتكبير $\\gamma = \\frac{${chosen.oapCm}}{${chosen.oaCm}} = ${chosen.gamma}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نضع جسماً مضيئاً $AB$ طوله $${chosen.abCm}" cm"$ عمودياً على المحور البصري لعدسة مجمعة بعدها المحرقي $f' = +${chosen.fCm}" cm"$ على مسافة $overline("OA") = ${chosen.oaCm}" cm"$.`,
				content
			},
			hints: [
				`تذكر تحويل البعد المحرقي إلى المتر عند حساب الكسيرة $C = 1/f'$.`,
				`علاقة التوافق: $\\frac{1}{\\overline{OA'}} - \\frac{1}{\\overline{OA}} = \\frac{1}{f'}$ مع $\\overline{OA} < 0$.`,
				`التكبير $\\gamma = \\frac{\\overline{OA'}}{\\overline{OA}}$ وإشارته السالبة تدل على صورة مقلوبة.`
			],
			solutionStepsAr: [
				`كسيرة العدسة: $C = +${cDiop}\\,\\delta$.`,
				`موضع الصورة: $\\overline{OA'} = +${chosen.oapCm}\\text{ cm}$.`,
				`التكبير $\\gamma = ${chosen.gamma}$ والصورة حقيقية ومقلوبة طولها $|\\overline{A'B'}| = ${Math.abs(chosen.apbpCm)}\\text{ cm}$.`
			],
			finalAnswer: `C = +${cDiop}\\,\\delta\\quad ;\\quad \\overline{OA'} = +${chosen.oapCm}\\text{ cm}\\quad ;\\quad \\gamma = ${chosen.gamma}`
		};
	}
};

// 4. Eye Defects & Optical Instruments (4 pts)
export const tpl2asSharedT3EyeOpticalInstruments: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t3_eye_optical_instruments',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'نمذجة العين وتصحيح عيوب الإبصار والأجهزة البصرية',
	curriculumLessonId: 'phy_lesson_2as_shared_t3_lens_formula_optical_instruments',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isMyopia = difficulty === 'easy' ? true : rng.pick([true, false]);
		const prM = rng.pick([0.25, 0.4, 0.5]); // for myopia
		const ppM = rng.pick([0.5, 1.0]); // for hyperopia

		const correctC = isMyopia
			? roundTo(-1 / prM, 2)
			: roundTo(1 / 0.25 - 1 / ppM, 2); // bring 25cm object image to -ppM
		const correctFCm = roundTo(100 / correctC, 1);
		const defectName = isMyopia ? 'قصر النظر (Myopie)' : 'طول النظر (Hypermétropie)';
		const lensType = isMyopia ? 'عدسة مفرقة' : 'عدسة مجمعة';

		const mcq = buildUniqueMcqOptions(
			`${lensType} كسيرتها $${correctC > 0 ? `+${correctC}` : correctC}\\,\\delta$`,
			[
				{
					text: `${isMyopia ? 'عدسة مجمعة' : 'عدسة مفرقة'} كسيرتها $${-correctC > 0 ? `+${-correctC}` : -correctC}\\,\\delta$`,
					diagnosticFeedback: 'عكست نوع العدسة المصححة وإشارة الكسيرة.'
				},
				{
					text: `${lensType} كسيرتها $${roundTo(correctC / 2, 2)}\\,\\delta$`,
					diagnosticFeedback: 'تحقق من تطبيق علاقة ديكارت لحساب كسيرة العدسة المصححة.'
				},
				{
					text: `${lensType} كسيرتها $${roundTo(correctC * 2, 2)}\\,\\delta$`,
					diagnosticFeedback: 'تحقق من تحويل المسافات إلى المتر في علاقة التوافق.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: isMyopia
					? `1) شخص مصاب بـ **${defectName}** تقع نقطة الكثب (أبعد نقطة يراها بوضوح $"PR"$) على بعد $${prM}" m"$ أمام عينه. أين تتشكل صورة جسم بعيد في عينه قبل التصحيح؟ وما نوع العدسة اللازمة؟`
					: `1) شخص مصاب بـ **${defectName}** تقع نقطة القرب (أقرب نقطة يراها بوضوح $"PP"$) على بعد $${ppM}" m"$ أمام عينه. أين تتشكل صورة جسم قريب ($25" cm"$) في عينه قبل التصحيح؟ وما نوع العدسة اللازمة؟`,
				answer: isMyopia
					? `1) في حالة قصر النظر: العين شديدة التجمع فتتشكل صورة الأجسام البعيدة **أمام الشبكية**. لتصحيح هذا العيب نستعمل **عدسة مفرقة** ($C < 0$).`
					: `1) في حالة طول النظر: العين ضعيفة التجمع فتتشكل صورة الأجسام القريبة **خلف الشبكية**. لتصحيح هذا العيب نستعمل **عدسة مجمعة** ($C > 0$).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: isMyopia
					? `2) احسب كسيرة العدسة المصححة $C$ وبعدها المحرقي $f'$ لتُمكّنه من رؤية الأجسام البعيدة جداً ($overline("OA") = -oo$) بوضوح عند $"PR"$.`
					: `2) احسب كسيرة العدسة المصححة $C$ وبعدها المحرقي $f'$ لتُمكّنه من رؤية جسم موضوع عند المسافة العادية ($overline("OA") = -0.25" m"$) وكأنه عند نقطة قربه $"PP"$ ($overline("OA'") = -${ppM}" m"$).`,
				answer: isMyopia
					? `2) بتطبيق علاقة ديكارت: $frac(1, overline("OA'")) - frac(1, overline("OA")) = C$\nمع $overline("OA") = -oo$ و $overline("OA'") = -${prM}" m"$:\n$C = frac(1, -${prM}) - 0 = ${correctC}\\,delta$، والبعد المحرقي $f' = frac(1, C) = ${correctFCm}" cm"$.`
					: `2) بتطبيق علاقة ديكارت: $C = frac(1, overline("OA'")) - frac(1, overline("OA")) = frac(1, -${ppM}) - frac(1, -0.25) = ${roundTo(-1 / ppM, 2)} + 4 = +${correctC}\\,delta$.\nوالبعد المحرقي: $f' = frac(1, ${correctC}) = +${correctFCm}" cm"$.`,
				mark: '2.5'
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
				questionText: isMyopia
					? `شخص مصاب بقصر النظر، أبعد نقطة يراها بوضوح ($PR$) تبعد $${prM}\\text{ m}$ عن عينه.\nما نوع وكسيرة العدسة المصححة اللازمة لرؤية الأجسام البعيدة بوضوح؟`
					: `شخص مصاب بطول النظر، أقرب نقطة يراها بوضوح ($PP$) تبعد $${ppM}\\text{ m}$ عن عينه.\nما نوع وكسيرة العدسة المصححة اللازمة ليتمكن من القراءة على مسافة $25\\text{ cm}$؟`,
				questionTextAr: 'حدد نوع وكسيرة العدسة المصححة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: isMyopia
					? `قصر النظر يُصحح بعدسة مفرقة تجعل صورة اللانهاية عند $PR$: $C = \\frac{1}{-${prM}} = ${correctC}\\,\\delta$.`
					: `طول النظر يُصحح بعدسة مجمعة تجعل صورة $0.25\\text{ m}$ عند $PP$: $C = \\frac{1}{-${ppM}} - \\frac{1}{-0.25} = +${correctC}\\,\\delta$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندرس عيب الإبصار لدى شخص مصاب بـ **${defectName}** لتحديد النظارة الطبية المناسبة.`,
				content
			},
			hints: [
				isMyopia
					? `قصر النظر (عين شديدة التجمع) يُصحح بعدسة مفرقة ($C < 0$).`
					: `طول النظر (عين ضعيفة التجمع) يُصحح بعدسة مجمعة ($C > 0$).`,
				`ضع دوماً إشارة سالبة لكل من $\\overline{OA}$ و $\\overline{OA'}$ أمام العين (صورة وهمية).`,
				`طبق علاقة التوافق $C = \\frac{1}{\\overline{OA'}} - \\frac{1}{\\overline{OA}}$ بوحدة المتر.`
			],
			solutionStepsAr: [
				`تحديد عيب العين ونوع العدسة: ${lensType}.`,
				`تطبيق علاقة التوافق بوحدة المتر: $C = ${correctC > 0 ? `+${correctC}` : correctC}\\,\\delta$.`,
				`البعد المحرقي للعدسة: $f' = ${correctFCm}\\text{ cm}$.`
			],
			finalAnswer: `${lensType}\\quad ;\\quad C = ${correctC > 0 ? `+${correctC}` : correctC}\\,\\delta`
		};
	}
};

// 5. Integration T3: Annual Synthesis (Organic Chem + Experimental Thin Lens Graph) (7 pts, isIntegration: true)
export const tpl2asSharedT3IntegrationAnnualSynthesis: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t3_integration_annual_synthesis',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'مسألة إدماجية سنوية: الكيمياء العضوية والمنحنى التجريبي للعدسات',
	curriculumLessonId: 'phy_lesson_2as_shared_t3_integration',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cVal = rng.pick([4, 5, 8]); // dioptres
		const fCm = roundTo(100 / cVal, 1);
		const oaTestCm = -25;
		// 1/OA' = 1/OA + C (in m^-1): 1/(-0.25) = -4 m^-1
		const invOaTest = -4;
		const invOapTest = invOaTest + cVal;

		// Organic part: hydration of alkene CnH2n -> CnH2n+2O
		const nAlc = rng.pick([2, 3]);
		const alcName = nAlc === 2 ? 'الإيثانول' : 'البروبان-2-ول';
		const alkeneFormula = nAlc === 2 ? 'CH2=CH2' : 'CH3-CH=CH2';
		const alcFormula = nAlc === 2 ? 'CH3-CH2-OH' : 'CH3-CH(OH)-CH3';
		const alcMolar = nAlc === 2 ? 46 : 60;
		const massAlkeneG = nAlc === 2 ? 2.8 : 4.2; // 0.1 mol!
		const massAlcG = roundTo(0.1 * alcMolar, 2);

		const eqHydration = chemEquation(
			[
				{ formula: alkeneFormula, state: 'g' },
				{ formula: 'H2O', state: 'l' }
			],
			[{ formula: alcFormula, state: 'l' }]
		);

		const svg = svgPhysicsCurvePlot({
			xMin: -8,
			xMax: 0,
			yMin: -4,
			yMax: 10,
			xStep: 2,
			yStep: 2,
			xLabel: '1/OA (m⁻¹)',
			yLabel: "1/OA' (m⁻¹)",
			title: "البيان التجريبي: 1/OA' = f(1/OA) لعدسة مجمعة",
			curves: [{ fn: (x) => x + cVal, color: '#2563eb', label: "1/OA' = 1/OA + C" }],
			points: [{ x: 0, y: cVal, label: `C = +${cVal} δ`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t3_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$f' = +${fCm}\\text{ cm}\\quad ;\\quad m = ${massAlcG}\\text{ g}$`,
			[
				{
					text: `$f' = +${cVal}\\text{ cm}\\quad ;\\quad m = ${massAlcG}\\text{ g}$`,
					diagnosticFeedback: 'نقطة التقاطع مع محور التراتيب تمثل الكسيرة C = 1/f\' وليس البعد المحرقي f\'.'
				},
				{
					text: `$f' = +${fCm}\\text{ cm}\\quad ;\\quad m = ${roundTo(massAlcG * 2, 2)}\\text{ g}$`,
					diagnosticFeedback: 'راجع حساب كمية مادة الألسن n = m / M.'
				},
				{
					text: `$f' = -${fCm}\\text{ cm}\\quad ;\\quad m = ${roundTo(massAlcG / 2, 2)}\\text{ g}$`,
					diagnosticFeedback: 'نقطة التقاطع موجبة لذا العدسة مجمعة (f\' > 0).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: "المنحنى التجريبي 1/OA' بدلالة 1/OA",
				width: 320
			},
			{
				type: 'text',
				content: `الجزء الأول (الكيمياء العضوية): نجري تفاعل إماهة (ضم الماء) لكتلة $m_1 = ${massAlkeneG}" g"$ من ألسن صيغته نصف المفصلة ($${nAlc === 2 ? '"CH"_2="CH"_2' : '"CH"_3-"CH"="CH"_2'}$) فيتحول كلياً إلى كحول رئيسي (${alcName}).\n1) اكتب معادلة التفاعل الكيميائي، واذكر القاعدة المطبقة عند الإماهة، ثم احسب كتلة الكحول الناتج $m_2$.`,
				answer: `1) الإماهة وحساب الكتلة:\n- معادلة التفاعل: ${eqHydration.typst}\n- القاعدة: في حالة البروبين تطبق قاعدة ماركوفنيكوف.\n- كمية مادة الألسن ($M = ${nAlc === 2 ? 28 : 42}" g/mol"$): $n = frac(${massAlkeneG}, ${nAlc === 2 ? 28 : 42}) = 0.1" mol"$.\n- كتلة الكحول الناتج ($M = ${alcMolar}" g/mol"$): $m_2 = n dot M = 0.1 times ${alcMolar} = ${massAlcG}" g"$.`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (البصريات التجريبية): ندرس موضع الصورة $overline("OA'")$ بدلالة موضع الجسم $overline("OA")$ لعدسة رقيقة فنرسم البيان المرفق $frac(1, overline("OA'")) = f(frac(1, overline("OA")))$.\n2) اكتب العلاقة النظرية لعلاقة التوافق، ثم استنتج بيانياً كسيرة العدسة $C$ وبعدها المحرقي $f'$.`,
				answer: `2) استغلال البيان:\n- العلاقة النظرية: $frac(1, overline("OA'")) = frac(1, overline("OA")) + C$.\n- معادلة المستقيم التجريبي من الشكل $y = x + b$ حيث $b = +${cVal}" m"^(-1)$.\n- بالمطابقة: $C = +${cVal}\\,delta$، ومنه $f' = frac(1, ${cVal}) = ${roundTo(1 / cVal, 3)}" m" = +${fCm}" cm"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) حدد من البيان أو بالحساب قيمة $frac(1, overline("OA'"))$ عندما يوضع الجسم على مسافة $25" cm"$ أمام العدسة ($overline("OA") = ${oaTestCm}" cm"$).`,
				answer: `3) عند $overline("OA") = -0.25" m"$ يكون $frac(1, overline("OA")) = ${invOaTest}" m"^(-1)$.\nومنه $frac(1, overline("OA'")) = ${invOaTest} + ${cVal} = ${invOapTest}" m"^(-1)$.`,
				mark: '1.5'
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
				questionText: `في مسألة شاملة: (1) إماهة تامة لـ $0.1\\text{ mol}$ من الألسن تعطي **${alcName}** ($M = ${alcMolar}\\text{ g/mol}$). (2) يمثل البيان المرفق تغير $\\frac{1}{\\overline{OA'}}$ بدلالة $\\frac{1}{\\overline{OA}}$ لعدسة مجمعة.\nما هما قيمتا البعد المحرقي $f'$ للعدسة وكتلة الكحول الناتج $m$؟`,
				questionTextAr: 'حدد القيمتين الصحيحتين للبعد المحرقي $f\'$ والكتلة $m$:',
				imageUrl: svgUrl,
				imageCaption: 'البيان التجريبي للعدسة الرقيقة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `من نقطة تقاطع البيان مع محور التراتيب $C = +${cVal}\\,\\delta \\implies f' = +${fCm}\\text{ cm}$، وكتلة الكحول $m = 0.1 \\times ${alcMolar} = ${massAlcG}\\text{ g}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية (الكيمياء العضوية والعدسات)',
				instruction: 'يتناول التمرين تحولاً في الكيمياء العضوية متبوعاً بدراسة بيانية تجريبية لعدسة رقيقة مجمعة.',
				content
			},
			hints: [
				`كمية مادة الكحول الناتج تساوي كمية مادة الألسن المتفاعل التام ($n = 0.1\\text{ mol}$).`,
				`علاقة التوافق تُكتب على الشكل الخطي $\\frac{1}{\\overline{OA'}} = \\frac{1}{\\overline{OA}} + C$.`,
				`نقطة تقاطع البيان مع محور التراتيب تعطي الكسيرة $C$ بوحدة الديوبتري.`
			],
			solutionStepsAr: [
				`معادلة الإماهة ${eqHydration.katex} والكتلة $m_2 = ${massAlcG}\\text{ g}$.`,
				`استخراج الكسيرة $C = +${cVal}\\,\\delta$ وحساب $f' = +${fCm}\\text{ cm}$.`,
				`حساب $1/\\overline{OA'} = ${invOapTest}\\text{ m}^{-1}$ عندما $\\overline{OA} = -25\\text{ cm}$.`
			],
			finalAnswer: `m_2 = ${massAlcG}\\text{ g}\\quad ;\\quad f' = +${fCm}\\text{ cm}`
		};
	}
};

export const SHARED_TEMPLATES_2AS_T3: PhysicsParameterizedTemplate[] = [
	tpl2asSharedT3HydrocarbonsIupac,
	tpl2asSharedT3OxygenatedFunctionalGroups,
	tpl2asSharedT3ThinLensesDescartes,
	tpl2asSharedT3EyeOpticalInstruments,
	tpl2asSharedT3IntegrationAnnualSynthesis
];
