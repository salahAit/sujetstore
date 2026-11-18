import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgPhysicsCurvePlot,
	svgTitrationSetup
} from '../../svg-physics';

// ============================================================================
// 5 Shared Trimester 2 Parameterized Templates for 2AS (SE / TM / MATH)
// ============================================================================

// 1. Bronsted Acid-Base Titration with ICE Table (5 pts, Experimental)
export const tpl2asSharedT2AcidBaseTitration: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t2_acid_base_titration',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'kinetics_eq',
	titleAr: 'معايرة حمض-أساس برونشتد وتعيين نقطة التكافؤ (جدول التقدم)',
	curriculumLessonId: 'phy_lesson_2as_shared_t2_acid_base_titration',
	defaultPoints: 5,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vaMl = rng.pick(difficulty === 'easy' ? [10, 20] : [15, 20, 25]);
		const cb = rng.pick([0.05, 0.1, 0.2]);
		const vbeMl = rng.pick(difficulty === 'easy' ? [10, 12, 16] : [12, 14, 15, 18]);
		const ca = roundTo((cb * vbeMl) / vaMl, 4);
		const nAcidMmol = roundTo(ca * vaMl, 3);
		const massMg = roundTo(nAcidMmol * 60.0, 2); // CH3COOH M = 60 g/mol

		const spAcid = chemSpecies('CH3COOH', 'aq');
		const spBase = chemSpecies('HO-', 'aq');
		const spConjBase = chemSpecies('CH3COO-', 'aq');
		const spWater = chemSpecies('H2O', 'l');
		const eq = chemEquation(
			[
				{ formula: 'CH3COOH', state: 'aq' },
				{ formula: 'HO-', state: 'aq' }
			],
			[
				{ formula: 'CH3COO-', state: 'aq' },
				{ formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [spAcid, spBase, spConjBase, spWater],
			initial: [
				{ katex: `$n_a = C_a V_a$`, typst: `$n_a = C_a V_a$` },
				{ katex: `$n_b = C_b V_b$`, typst: `$n_b = C_b V_b$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			intermediate: [
				{ katex: `$n_a - x$`, typst: `$n_a - x$` },
				{ katex: `$n_b - x$`, typst: `$n_b - x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			final: [
				{ katex: `$n_a - x_E$`, typst: `$n_a - x_E$` },
				{ katex: `$n_b - x_E$`, typst: `$n_b - x_E$` },
				{ katex: `$x_E$`, typst: `$x_E$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			finalAnswers: [
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$${nAcidMmol}\\text{ mmol}$`, typst: `$${nAcidMmol}" mmol"$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			]
		});

		const svg = svgTitrationSetup({
			titrantLabel: `HO⁻ (${cb} mol/L)`,
			analyteLabel: `CH₃COOH (${vaMl} mL)`,
			sensorLabel: 'كاشف / مسبار'
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t2_ab_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${ca}\\text{ mol/L}$`,
			[
				{
					text: `$${roundTo((cb * vaMl) / vbeMl, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'عكست الحجمين في علاقة التكافؤ (C_a = C_b·V_bE / V_a).'
				},
				{
					text: `$${roundTo(ca * 2, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'التفاعل بين حمض الإيثانويك وأساس الصودا ستوكيومتريته 1:1 وليس 1:2.'
				},
				{
					text: `$${roundTo(ca / 2, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'تحقق من نسبة الأحجام V_bE / V_a في علاقة التكافؤ.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'التركيب التجريبي للمعايرة',
				width: 280
			},
			{
				type: 'text',
				content: `1) عرّف الحمض حسب برونشتد، ثم حدد الثنائيتين (حمض/أساس) المشاركتين واكتب معادلة تفاعل المعايرة بين ${spAcid.typst} و ${spBase.typst}.`,
				answer: `1) تعريف حمض برونشتد: هو كل فرد كيميائي قادر على فقدان بروتون $H^+$ خلال تحول كيميائي.\n- الثنائيتان: $("CH"_3"COOH" / "CH"_3"COO"^-)$ و $("H"_2"O" / "HO"^-)$.\n- معادلة التفاعل: ${eq.typst}`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) أنجز جدول تقدم التفاعل عند نقطة التكافؤ، ثم استنتج عبارة التركيز $C_a$ واحسبه.`,
				answer: `2) عند التكافؤ يكون المزيج ستوكيومترياً: $n_a - x_E = 0$ و $n_b - x_E = 0$.\nإذن $C_a V_a = C_b V_"bE" arrow.r.double C_a = frac(C_b dot V_"bE", V_a) = frac(${cb} times ${vbeMl}, ${vaMl}) = ${ca}" mol/L"$.`,
				mark: '1.0'
			},
			ice.typstBlock,
			{
				type: 'text',
				content: `3) احسب كمية مادة الحمض $n_a$ المعايرة ثم كتلته $m$ بوحدة الميليغرام علماً أن $M("CH"_3"COOH") = 60" g/mol"$.`,
				answer: `3) كمية المادة والكتلة:\n- $n_a = C_a dot V_a = ${ca} times ${vaMl} = ${nAcidMmol}" mmol" = ${roundTo(nAcidMmol * 1e-3, 5)}" mol"$.\n- $m = n_a dot M = ${roundTo(nAcidMmol * 1e-3, 5)} times 60 = ${roundTo(massMg / 1000, 5)}" g" = ${massMg}" mg"$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعاير حجماً $V_a = ${vaMl}\\text{ mL}$ من محلول حمض الإيثانويك ${spAcid.katex} تركيزه $C_a$ بمحلول هيدروكسيد الصوديوم (${chemSpecies('Na+', 'aq').katex} + ${spBase.katex}) تركيزه $C_b = ${cb}\\text{ mol/L}$. يحدث التكافؤ عند إضافة $V_{bE} = ${vbeMl}\\text{ mL}$.\nما هي قيمة التركيز المولي $C_a$ لحمض الإيثانويك؟`,
				questionTextAr: 'احسب التركيز المولي $C_a$ للمحلول الحمضي:',
				imageUrl: svgUrl,
				imageCaption: 'تركيب معايرة حمض-أساس',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `المعادلة: ${eq.katex}.\n${ice.markdownTable}\nعند التكافؤ: $C_a V_a = C_b V_{bE} \\implies C_a = \\frac{${cb}\\times ${vbeMl}}{${vaMl}} = ${ca}\\text{ mol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نضع في بيشر حجماً $V_a = ${vaMl}" mL"$ من محلول حمض الإيثانويك (${spAcid.typst}) تركيزه $C_a$ مجهول، ونعايره بمحلول هيدروكسيد الصوديوم (${chemSpecies('Na+', 'aq').typst} + ${spBase.typst}) تركيزه $C_b = ${cb}" mol/L"$. يُرصد التكافؤ عند حجم مضاف $V_"bE" = ${vbeMl}" mL"$.`,
				content
			},
			hints: [
				`اكتب معادلة التفاعل ${eq.katex} وتحقق من معاملاتها الستوكيوميترية ($1:1$).`,
				`عند التكافؤ يتساوى عدد مولات الحمض الابتدائي مع عدد مولات الأساس المضاف: $C_a V_a = C_b V_{bE}$.`,
				`لحساب الكتلة: $m = n \\cdot M = (C_a V_a) \\cdot M$.`
			],
			solutionStepsAr: [
				`كتابة معادلة المعايرة ${eq.katex} وجدول التقدم.`,
				`تطبيق علاقة التكافؤ: $C_a = ${ca}\\text{ mol/L}$.`,
				`كمية المادة $n_a = ${nAcidMmol}\\text{ mmol}$ والكتلة $m = ${massMg}\\text{ mg}$.`
			],
			finalAnswer: `C_a = ${ca}\\text{ mol/L}\\quad ;\\quad m = ${massMg}\\text{ mg}`
		};
	}
};

// 2. Redox Titration with ICE Table (5 pts, Experimental)
export const tpl2asSharedT2RedoxTitration: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t2_redox_titration',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'kinetics_eq',
	titleAr: 'المعايرة بالأكسدة-إرجاع وموازنة المعادلات في وسط حمضي',
	curriculumLessonId: 'phy_lesson_2as_shared_t2_redox_titration',
	defaultPoints: 5,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v1Ml = rng.pick([10, 20, 25]);
		const c2 = rng.pick(difficulty === 'easy' ? [0.02] : [0.01, 0.02, 0.04]);
		const v2eMl = rng.pick([10, 12, 15, 16]);
		// MnO4- + 5 Fe^2+ + 8 H3O+ -> Mn^2+ + 5 Fe^3+ + 12 H2O
		const c1 = roundTo((5 * c2 * v2eMl) / v1Ml, 4);
		const xEMmol = roundTo(c2 * v2eMl, 4);

		const spMnO4 = chemSpecies('MnO4-', 'aq');
		const spFe2 = chemSpecies('Fe^2+', 'aq');
		const spH3O = chemSpecies('H3O+', 'aq');
		const spMn2 = chemSpecies('Mn^2+', 'aq');
		const spFe3 = chemSpecies('Fe^3+', 'aq');
		const eq = chemEquation(
			[
				{ formula: 'MnO4-', state: 'aq' },
				{ coeff: 5, formula: 'Fe^2+', state: 'aq' },
				{ coeff: 8, formula: 'H3O+', state: 'aq' }
			],
			[
				{ formula: 'Mn^2+', state: 'aq' },
				{ coeff: 5, formula: 'Fe^3+', state: 'aq' },
				{ coeff: 12, formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [spMnO4, spFe2, spMn2, spFe3],
			initial: [
				{ katex: `$C_2 V_2$`, typst: `$C_2 V_2$` },
				{ katex: `$C_1 V_1$`, typst: `$C_1 V_1$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` }
			],
			intermediate: [
				{ katex: `$C_2 V_2 - x$`, typst: `$C_2 V_2 - x$` },
				{ katex: `$C_1 V_1 - 5x$`, typst: `$C_1 V_1 - 5x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: `$5x$`, typst: `$5x$` }
			],
			final: [
				{ katex: `$C_2 V_{2E} - x_E$`, typst: `$C_2 V_"2E" - x_E$` },
				{ katex: `$C_1 V_1 - 5x_E$`, typst: `$C_1 V_1 - 5x_E$` },
				{ katex: `$x_E$`, typst: `$x_E$` },
				{ katex: `$5x_E$`, typst: `$5x_E$` }
			],
			finalAnswers: [
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$${xEMmol}\\text{ mmol}$`, typst: `$${xEMmol}" mmol"$` },
				{ katex: `$${roundTo(5 * xEMmol, 3)}\\text{ mmol}$`, typst: `$${roundTo(5 * xEMmol, 3)}" mmol"$` }
			]
		});

		const svg = svgTitrationSetup({
			titrantLabel: `MnO₄⁻ (${c2} mol/L)`,
			analyteLabel: `Fe²⁺ محمض (${v1Ml} mL)`
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t2_redox_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${c1}\\text{ mol/L}$`,
			[
				{
					text: `$${roundTo(c1 / 5, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'نسيت المعامل الستوكيومتري 5 في علاقة التكافؤ (C1·V1 = 5·C2·V2E).'
				},
				{
					text: `$${roundTo(c1 * 2, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'تأكد من عدد الإلكترونات المتبادلة (5 إلكترونات) في نصف معادلة MnO4-/Mn2+.'
				},
				{
					text: `$${roundTo((5 * c2 * v1Ml) / v2eMl, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'عكست الحجمين V1 و V2E في قانون التكافؤ.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'تجهيز المعايرة بالأكسدة-إرجاع (برمنغنات البوتاسيوم)',
				width: 280
			},
			{
				type: 'text',
				content: `1) اكتب المعادلتين النصفيتين للأكسدة والإرجاع للثنائيتين $("MnO"_4^- / "Mn"^(2+))$ و $("Fe"^(3+) / "Fe"^(2+))$ في وسط حمضي، ثم استنتج معادلة تفاعل المعايرة الإجمالية.`,
				answer: `1) المعادلتان النصفيتان:\n- الإرجاع: $"MnO"_4^- + 8"H"^+ + 5"e"^- arrow.r "Mn"^(2+) + 4"H"_2"O"$\n- الأكسدة: $"Fe"^(2+) arrow.r "Fe"^(3+) + "e"^-$\n- المعادلة الإجمالية: ${eq.typst}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) أنشئ جدول تقدم التفاعل عند التكافؤ، ثم استنتج التركيز المولي $C_1$ لشوارد ${spFe2.typst} وتقدم التكافؤ $x_E$.`,
				answer: `2) عند التكافؤ: $C_2 V_"2E" - x_E = 0$ و $C_1 V_1 - 5 x_E = 0$.\nمنه $C_1 V_1 = 5 C_2 V_"2E" arrow.r.double C_1 = frac(5 times ${c2} times ${v2eMl}, ${v1Ml}) = ${c1}" mol/L"$.\nتقدم التكافؤ: $x_E = C_2 V_"2E" = ${c2} times ${v2eMl} = ${xEMmol}" mmol"$.`,
				mark: '3.0'
			},
			ice.typstBlock
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعاير حجماً $V_1 = ${v1Ml}\\text{ mL}$ من محلول كبريتات الحديد الثنائي (${spFe2.katex}) المحمض، بمحلول برمنغنات البوتاسيوم (${spMnO4.katex}) تركيزه $C_2 = ${c2}\\text{ mol/L}$. يظهر اللون البنفسجي الدائم عند إضافة $V_{2E} = ${v2eMl}\\text{ mL}$.\nما قيمة التركيز المولي $C_1$ لشوارد الحديد الثنائي؟`,
				questionTextAr: 'احسب التركيز المولي $C_1$ لشوارد $\\ce{Fe^{2+}}$:',
				imageUrl: svgUrl,
				imageCaption: 'معايرة برمنغنات البوتاسيوم',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `المعادلة الموزونة: ${eq.katex}.\n${ice.markdownTable}\nعند التكافؤ: $\\frac{C_1 V_1}{5} = C_2 V_{2E} \\implies C_1 = \\frac{5 \\times ${c2} \\times ${v2eMl}}{${v1Ml}} = ${c1}\\text{ mol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعاير حجماً $V_1 = ${v1Ml}" mL"$ من محلول كبريتات الحديد الثنائي (${spFe2.typst}) المحمض بواسطة ${spH3O.typst}، بمحلول برمنغنات البوتاسيوم (${chemSpecies('K+', 'aq').typst} + ${spMnO4.typst}) تركيزه $C_2 = ${c2}" mol/L"$. نستنتج حجم التكافؤ التجريبي $V_"2E" = ${v2eMl}" mL"$.`,
				content
			},
			hints: [
				`تكتسب شاردة البرمنغنات 5 إلكترونات لتتحول إلى $\\ce{Mn^{2+}}$ في وسط حمضي.`,
				`تأكسد $\\ce{Fe^{2+}}$ يعطي إلكتروناً واحداً لذا نضرب نصف معادلة الحديد في $5$.`,
				`علاقة التكافؤ هي $C_1 V_1 = 5 C_2 V_{2E}$.`
			],
			solutionStepsAr: [
				`موازنة المعادلتين النصفيتين واستنتاج المعادلة الإجمالية ${eq.katex}.`,
				`كتابة جدول التقدم واستخراج علاقة التكافؤ: $C_1 V_1 = 5 C_2 V_{2E}$.`,
				`الحساب العددي: $C_1 = ${c1}\\text{ mol/L}$ و $x_E = ${xEMmol}\\text{ mmol}$.`
			],
			finalAnswer: `C_1 = ${c1}\\text{ mol/L}\\quad ;\\quad x_E = ${xEMmol}\\text{ mmol}`
		};
	}
};

// 3. Magnetic Field of Solenoid & Vector Superposition (4 pts)
export const tpl2asSharedT2MagneticFieldSuperposition: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t2_magnetic_field_superposition',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'electromagnetism',
	titleAr: 'الحقل المغناطيسي لوشيعة حلزونية وتراكب الحقول المغناطيسية',
	curriculumLessonId: 'phy_lesson_2as_shared_t2_magnetic_field_vectors',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Use clean Pythagorean or tangent ratios for Bh = 20 uT
		const bhUt = 20; // microTesla
		const ratioCases = [
			{ bSolUt: 20, alpha: 45, bTotUt: 28.28 },
			{ bSolUt: 15, alpha: 36.87, bTotUt: 25 },
			{ bSolUt: 34.64, alpha: 60, bTotUt: 40 }
		];
		const chosen = difficulty === 'easy' ? ratioCases[0] : rng.pick(ratioCases);
		const lengthM = 0.5;
		const nTurns = 500;
		// B_sol = mu0 * (N/L) * I = 4*pi*1e-7 * 1000 * I = 4*pi*1e-4 * I = 1.2566 mT * I
		// Use I in mA so B_sol is in uT cleanly: B_sol(uT) = 400*pi * I(A) -> I(mA) = B_sol(uT)/(0.4*pi)
		const iMa = roundTo(chosen.bSolUt / (0.4 * Math.PI), 2);

		const mcq = buildUniqueMcqOptions(
			`$${chosen.bTotUt}\\,\\mu\\text{T}$`,
			[
				{
					text: `$${roundTo(bhUt + chosen.bSolUt, 2)}\\,\\mu\\text{T}$`,
					diagnosticFeedback: 'الحقلان متعامدان: لا نجمع الشدتين جبرياً بل نطبق مبرهنة فيثاغورس.'
				},
				{
					text: `$${roundTo(Math.abs(chosen.bSolUt - bhUt) + 5, 2)}\\,\\mu\\text{T}$`,
					diagnosticFeedback: 'تحقق من الجمع الشعاعي للحقلين المتعامدين.'
				},
				{
					text: `$${chosen.bSolUt}\\,\\mu\\text{T}$`,
					diagnosticFeedback: 'هذه شدة حقل الوشيعة فقط وليست شدة الحقل المحصل.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) احسب شدة الحقل المغناطيسي $B_b$ المتولد في مركز الوشيعة إذا كان يمر فيها تيار شدته $I = ${iMa}" mA"$ ($mu_0 = 4 pi times 10^(-7)" SI"$).`,
				answer: `1) شدة الحقل في مركز الوشيعة:\n$B_b = mu_0 frac(N, L) I = 4 pi times 10^(-7) times frac(${nTurns}, ${lengthM}) times (${iMa} times 10^(-3)) approx ${chosen.bSolUt}\\,mu"T"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) محور الوشيعة أفقي وعمودي على المركبة الأفقية للحقل الأرضي $B_h = ${bhUt}\\,mu"T"$. احسب شدة الحقل المغناطيسي الكلي $B$ وزاوية انحراف الإبرة الممغنطة $alpha$ عن الشمال المغناطيسي.`,
				answer: `2) تراكب الحقلين المتعامدين ($vec(B) = vec(B)_h + vec(B)_b$):\n- الشدة الكلية: $B = sqrt(B_h^2 + B_b^2) = sqrt(${bhUt}^2 + ${chosen.bSolUt}^2) approx ${chosen.bTotUt}\\,mu"T"$.\n- زاوية الانحراف: $tan alpha = frac(B_b, B_h) = frac(${chosen.bSolUt}, ${bhUt}) arrow.r.double alpha approx ${chosen.alpha} deg$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نضع إبرة ممغنطة في مركز وشيعة طويلة محورها عمودي على المركبة الأفقية للحقل المغناطيسي الأرضي $B_h = ${bhUt}\\,\\mu\\text{T}$. عندما يمر تيار في الوشيعة يتولد حقل شدته $B_b = ${chosen.bSolUt}\\,\\mu\\text{T}$ عمودي على $\\vec{B}_h$.\nما شدة الحقل المغناطيسي المحصل $B$ في مركز الوشيعة؟`,
				questionTextAr: 'احسب شدة الحقل المغناطيسي المحصل $B$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بما أن $\\vec{B}_b \\perp \\vec{B}_h$، نطبق فيثاغورس: $B = \\sqrt{B_h^2 + B_b^2} = \\sqrt{${bhUt}^2 + ${chosen.bSolUt}^2} \\approx ${chosen.bTotUt}\\,\\mu\\text{T}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `وشيعة حلزونية طولها $L = ${lengthM}" m"$ وعدد لفاتها $N = ${nTurns}$ لفة، نضعها أفقياً بحيث يكون محورها عمودياً على مستوى الزوال المغناطيسي الأرضي ($B_h = ${bhUt}\\,mu"T"$).`,
				content
			},
			hints: [
				`شدة الحقل في مركز وشيعة طويلة: $B_b = \\mu_0 \\frac{N}{L} I$.`,
				`الجمع الشعاعي لحقلين متعامدين يعطي $B = \\sqrt{B_h^2 + B_b^2}$.`,
				`زاوية انحراف الإبرة تحقق $\\tan\\alpha = \\frac{B_b}{B_h}$.`
			],
			solutionStepsAr: [
				`شدة حقل الوشيعة: $B_b = ${chosen.bSolUt}\\,\\mu\\text{T}$.`,
				`شدة الحقل المحصل: $B = \\sqrt{B_h^2 + B_b^2} = ${chosen.bTotUt}\\,\\mu\\text{T}$.`,
				`زاوية الانحراف: $\\alpha \\approx ${chosen.alpha}^\\circ$.`
			],
			finalAnswer: `B = ${chosen.bTotUt}\\,\\mu\\text{T}\\quad ;\\quad \\alpha = ${chosen.alpha}^\\circ`
		};
	}
};

// 4. Laplace Electromagnetic Force (4 pts)
export const tpl2asSharedT2LaplaceForce: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t2_laplace_force',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'electromagnetism',
	titleAr: 'قوة لابلاص الكهرومغناطيسية وتوازن ناقل',
	curriculumLessonId: 'phy_lesson_2as_shared_t2_laplace_electromagnetic_force',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const lCm = rng.pick([10, 15, 20]);
		const lM = lCm / 100;
		const iAmp = rng.pick(difficulty === 'easy' ? [2, 4, 5] : [3, 4, 5, 6]);
		const bTesla = rng.pick([0.2, 0.4, 0.5]);
		const angle = difficulty === 'hard' ? 30 : 90;
		const sinA = angle === 30 ? 0.5 : 1;
		const fNewton = roundTo(iAmp * lM * bTesla * sinA, 3);
		const dMoveM = 0.2;
		const workJ = roundTo(fNewton * dMoveM, 4);

		const mcq = buildUniqueMcqOptions(
			`$${fNewton}\\text{ N}$`,
			[
				{
					text: `$${roundTo(fNewton * 100, 2)}\\text{ N}$`,
					diagnosticFeedback: 'نسيت تحويل طول الساق L من السنتيمتر إلى المتر.'
				},
				{
					text: `$${roundTo(fNewton * (angle === 30 ? 2 : 0.5), 3)}\\text{ N}$`,
					diagnosticFeedback: 'تحقق من قيمة sin(α) في علاقة قوة لابلاص F = I·L·B·sin(α).'
				},
				{
					text: `$${roundTo(iAmp * bTesla, 3)}\\text{ N}$`,
					diagnosticFeedback: 'أغفلت الضرب في طول الجزء المغمور L من الناقل.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اذكر خصائص شعاع قوة لابلاص $vec(F)$ المؤثرة على الساق الناقلة (الحامل، الجهة، والشدة)، ثم احسب قيمتها العددية.`,
				answer: `1) خصائص قوة لابلاص:\n- نقطة التأثير: منتصف الجزء المغمور من الساق.\n- الحامل: عمودي على المستوي المحدد بالساق وشعاع الحقل $vec(B)$.\n- الجهة: تُحدد بقاعدة اليد اليمنى.\n- الشدة: $F = I dot L dot B dot sin(${angle} deg) = ${iAmp} times ${lM} times ${bTesla} times ${sinA} = ${fNewton}" N"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) تتحرك الساق تحت تأثير هذه القوة على سكتين أفقيتين لمسافة $d = 20" cm"$. احسب عمل قوة لابلاص $W(vec(F))$ خلال هذا الانتقال.`,
				answer: `2) عمل قوة لابلاص (ثابتة وفي جهة الحركة):\n$W(vec(F)) = F dot d = ${fNewton} times ${dMoveM} = ${workJ}" J"$.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تخضع ساق نحاسية جزءها المغمور طوله $L = ${lCm}\\text{ cm}$ ويجتازها تيار مستمر شدته $I = ${iAmp}\\text{ A}$ إلى حقل مغناطيسي منتظم شدته $B = ${bTesla}\\text{ T}$ يصنع مع الساق زاوية $\\alpha = ${angle}^\\circ$.\nما شدة قوة لابلاص $F$ المؤثرة على الساق؟`,
				questionTextAr: 'احسب شدة قوة لابلاص $F$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نحول $L = ${lM}\\text{ m}$ ونطبق $F = I L B \\sin\\alpha = ${iAmp} \\times ${lM} \\times ${bTesla} \\times ${sinA} = ${fNewton}\\text{ N}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نضع ساقاً نحاسية على سكتين أفقيتين، طول جزئها المغمور داخل حقل مغناطيسي منتظم شدته $B = ${bTesla}" T"$ هو $L = ${lCm}" cm"$، ويمر بها تيار شدته $I = ${iAmp}" A"$ (الزاوية بين التيار والحقل $alpha = ${angle} deg$).`,
				content
			},
			hints: [
				`حول طول الجزء المغمور من الساق إلى المتر: $L = ${lM}\\text{ m}$.`,
				`طبق قانون لابلاص: $F = I \\cdot L \\cdot B \\cdot \\sin\\alpha$.`,
				`عمل قوة ثابتة في نفس جهة الانتقال هو $W = F \\cdot d$.`
			],
			solutionStepsAr: [
				`تحويل الطول إلى $L = ${lM}\\text{ m}$.`,
				`شدة قوة لابلاص: $F = ${fNewton}\\text{ N}$.`,
				`عمل قوة لابلاص: $W = ${workJ}\\text{ J}$.`
			],
			finalAnswer: `F = ${fNewton}\\text{ N}\\quad ;\\quad W = ${workJ}\\text{ J}`
		};
	}
};

// 5. Integration T2: Conductimetric Titration + Laplace Force (7 pts, isIntegration: true, isExperimental: true)
export const tpl2asSharedT2IntegrationTitrationElectromagnetism: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t2_integration_titration_electromagnetism',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'مسألة إدماجية (الفصل الثاني): المعايرة الناقلية وقوة لابلاص',
	curriculumLessonId: 'phy_lesson_2as_shared_t2_acid_base_titration',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vaMl = 20;
		const cb = 0.1;
		const vbeMl = rng.pick([10, 12, 14]);
		const ca = roundTo((cb * vbeMl) / vaMl, 4);

		// Laplace part
		const lM = 0.1;
		const iAmp = rng.pick([4, 5, 6]);
		const bTesla = 0.25;
		const fLap = roundTo(iAmp * lM * bTesla, 3);

		const eq = chemEquation(
			[
				{ formula: 'H3O+', state: 'aq' },
				{ formula: 'HO-', state: 'aq' }
			],
			[{ coeff: 2, formula: 'H2O', state: 'l' }]
		);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 24,
			yMin: 0,
			yMax: 12,
			xStep: 4,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'G (mS)',
			title: 'منحنى المعايرة الناقلية G = f(Vb)',
			curves: [
				{
					fn: (v) => (v <= vbeMl ? 9.5 - 0.55 * v : 9.5 - 0.55 * vbeMl + 0.65 * (v - vbeMl)),
					color: '#2563eb',
					label: 'G(Vb)'
				}
			],
			dashedGuides: [
				{
					x1: vbeMl,
					y1: 0,
					x2: vbeMl,
					y2: roundTo(9.5 - 0.55 * vbeMl, 2),
					color: '#dc2626',
					label: `VbE = ${vbeMl} mL`,
					labelPos: 'right'
				}
			],
			points: [{ x: vbeMl, y: roundTo(9.5 - 0.55 * vbeMl, 2), label: 'E', color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t2_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$C_a = ${ca}\\text{ mol/L}\\quad ;\\quad F = ${fLap}\\text{ N}$`,
			[
				{
					text: `$C_a = ${roundTo(ca * 2, 4)}\\text{ mol/L}\\quad ;\\quad F = ${fLap}\\text{ N}$`,
					diagnosticFeedback: 'راجع علاقة التكافؤ C_a·V_a = C_b·V_bE.'
				},
				{
					text: `$C_a = ${ca}\\text{ mol/L}\\quad ;\\quad F = ${roundTo(fLap * 10, 2)}\\text{ N}$`,
					diagnosticFeedback: 'تأكد من تحويل طول الناقل L = 10 cm إلى المتر (0.1 m).'
				},
				{
					text: `$C_a = ${roundTo(ca / 2, 4)}\\text{ mol/L}\\quad ;\\quad F = ${roundTo(fLap / 2, 3)}\\text{ N}$`,
					diagnosticFeedback: 'تحقق من القراءة البيانية لحجم التكافؤ ومن قانون لابلاص.'
				}
			],
			rng
		);

		const spH3O = chemSpecies('H3O+', 'aq');
		const spHO = chemSpecies('HO-', 'aq');
		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [spH3O, spHO, chemSpecies('H2O', 'l')],
			initial: [
				{ katex: `$C_a V_a$`, typst: `$C_a V_a$` },
				{ katex: `$C_b V_b$`, typst: `$C_b V_b$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			intermediate: [
				{ katex: `$C_a V_a - x$`, typst: `$C_a V_a - x$` },
				{ katex: `$C_b V_b - x$`, typst: `$C_b V_b - x$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			final: [
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			]
		});

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'منحنى المعايرة الناقلية G = f(Vb)',
				width: 320
			},
			{
				type: 'text',
				content: `الجزء الأول (الكيمياء - المعايرة الناقلية): نعاير حجماً $V_a = ${vaMl}" mL"$ من محلول حمض كلور الماء بمحلول الصودا تركيزه $C_b = ${cb}" mol/L"$، فنحصل على المنحنى $G = f(V_b)$.\n1) اكتب معادلة تفاعل المعايرة، وفسر سبب تناقص الناقلية قبل التكافؤ ثم تزايدها بعده.`,
				answer: `1) المعادلة: ${eq.typst}.\n- التفسير: قبل التكافؤ تُستبدل شوارد $"H"_3"O"^+$ ذات الناقلية المولية العالية بشوارد $"Na"^+$ الأقل ناقلية فتتناقص $G$. بعد التكافؤ تتراكم شوارد $"Na"^+$ و $"HO"^-$ في البيشر فتتزايد $G$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) عيّن بيانياً حجم التكافؤ $V_"bE"$، ثم أنجز جدول التقدم واحسب التركيز المولي $C_a$.`,
				answer: `2) من تقاطع نصفي المستقيمين: $V_"bE" = ${vbeMl}" mL"$.\nعند التكافؤ $C_a V_a = C_b V_"bE" arrow.r.double C_a = frac(${cb} times ${vbeMl}, ${vaMl}) = ${ca}" mol/L"$.`,
				mark: '2.5'
			},
			ice.typstBlock,
			{
				type: 'text',
				content: `الجزء الثاني (الفيزياء - قوة لابلاص): توضع ساق ناقلة طولها المغمور $L = 10" cm"$ عمودياً داخل حقل مغناطيسي منتظم $B = ${bTesla}" T"$ ويمر فيها تيار $I = ${iAmp}" A"$.\n3) احسب شدة قوة لابلاص $F$ المؤثرة على الساق.`,
				answer: `3) شدة قوة لابلاص:\n$F = I dot L dot B dot sin(90 deg) = ${iAmp} times ${lM} times ${bTesla} = ${fLap}" N"$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مسألة إدماجية: (1) نعاير $V_a = ${vaMl}\\text{ mL}$ من حمض كلور الماء بالصودا ($C_b = ${cb}\\text{ mol/L}$) كما يوضح منحنى الناقلية (نقطة التكافؤ عند $V_{bE} = ${vbeMl}\\text{ mL}$). (2) ساق طولها المغمور $L = 10\\text{ cm}$ في حقل عمودي $B = ${bTesla}\\text{ T}$ يجتازها تيار $I = ${iAmp}\\text{ A}$.\nما قيمتا $C_a$ و $F$؟`,
				questionTextAr: 'اختر الإجابة الصحيحة لـ $C_a$ و $F$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى المعايرة الناقلية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `عند التكافؤ $C_a = \\frac{${cb}\\times ${vbeMl}}{${vaMl}} = ${ca}\\text{ mol/L}$، وقوة لابلاص $F = ${iAmp} \\times 0.1 \\times ${bTesla} = ${fLap}\\text{ N}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية (المعايرة الناقلية وقوة لابلاص)',
				instruction: 'يضم الموضوع جزأين مستقلين في الكيمياء (المعايرة الناقلية) والفيزياء (قوة لابلاص).',
				content
			},
			hints: [
				`نقطة التكافؤ هي نقطة تقاطع المستقيمين المتناقص والمتزايد في بيان $G = f(V_b)$.`,
				`علاقة التكافؤ: $C_a V_a = C_b V_{bE}$.`,
				`في قانون لابلاص: $F = I \\cdot L \\cdot B \\cdot \\sin(90^\\circ)$ مع $L = 0.1\\text{ m}$.`
			],
			solutionStepsAr: [
				`القراءة البيانية تعطي $V_{bE} = ${vbeMl}\\text{ mL}$.`,
				`تركيز الحمض: $C_a = ${ca}\\text{ mol/L}$.`,
				`شدة قوة لابلاص: $F = ${fLap}\\text{ N}$.`
			],
			finalAnswer: `C_a = ${ca}\\text{ mol/L}\\quad ;\\quad F = ${fLap}\\text{ N}`
		};
	}
};

export const SHARED_TEMPLATES_2AS_T2: PhysicsParameterizedTemplate[] = [
	tpl2asSharedT2AcidBaseTitration,
	tpl2asSharedT2RedoxTitration,
	tpl2asSharedT2MagneticFieldSuperposition,
	tpl2asSharedT2LaplaceForce,
	tpl2asSharedT2IntegrationTitrationElectromagnetism
];
