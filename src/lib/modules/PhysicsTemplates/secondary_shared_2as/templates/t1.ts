import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgInclinedPlaneForces,
	svgPhysicsCurvePlot
} from '../../svg-physics';

// ============================================================================
// 5 Shared Trimester 1 Parameterized Templates for 2AS (SE / TM / MATH)
// ============================================================================

// 1. Work & Translational Kinetic Energy on Inclined Plane (4 pts)
export const tpl2asSharedT1WorkKineticEnergy: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t1_work_kinetic_energy',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'العمل والطاقة الحركية الانسحابية على مستوٍ مائل',
	curriculumLessonId: 'phy_lesson_2as_shared_t1_work_translational_kinetic_energy',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m = rng.pick(difficulty === 'easy' ? [2, 4, 5] : [1.5, 2.5, 3, 4]);
		const g = 10;
		const alpha = rng.pick([30]);
		const sinAlpha = 0.5;
		const ab = rng.pick(difficulty === 'easy' ? [4, 6, 8] : [5, 8, 10, 12]);
		const h = roundTo(ab * sinAlpha, 2);
		const wP = roundTo(m * g * h, 2);

		// Friction force f chosen so that vB is clean
		const vB = rng.pick(difficulty === 'easy' ? [4, 6] : [4, 5, 6, 8]);
		const ecB = roundTo(0.5 * m * vB * vB, 2);
		// Ensure wP > ecB for downward motion with friction
		const validF = wP > ecB ? roundTo((wP - ecB) / ab, 2) : 0;
		const actualEcB = validF > 0 ? ecB : wP;
		const actualVB = validF > 0 ? vB : roundTo(Math.sqrt((2 * wP) / m), 2);
		const wFric = roundTo(-validF * ab, 2);

		const svg = svgInclinedPlaneForces({
			angleDeg: alpha,
			showFriction: validF > 0,
			angleLabel: `α = ${alpha}°`
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t1_work_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${actualEcB}\\text{ J}$`,
			[
				{
					text: `$${roundTo(wP + Math.abs(wFric), 2)}\\text{ J}$`,
					diagnosticFeedback: 'انتبه: عمل قوة الاحتكاك مقاوم وسالب، يُطرح من عمل الثقل ولا يُضاف إليه.'
				},
				{
					text: `$${roundTo(m * g * ab, 2)}\\text{ J}$`,
					diagnosticFeedback: 'استعملت المسافة AB بدلاً من الارتفاع العمودي h = AB·sin(α) لحساب عمل الثقل.'
				},
				{
					text: `$${roundTo(actualEcB * 2, 2)}\\text{ J}$`,
					diagnosticFeedback: 'تحقق من معامل 1/2 في عبارة الطاقة الحركية ومعادلة انحفاظ الطاقة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الشكل: جسم ينزلق على مستوٍ مائل بزاوية α',
				width: 310
			},
			{
				type: 'text',
				content: `1) احسب الارتفاع العمودي $h$ ثم عمل قوة الثقل $W_"AB"(vec(P))$ خلال الانتقال من $A$ إلى $B$، ومثّل القوى المؤثرة.`,
				answer: `1) حساب الارتفاع وعمل الثقل:\n- الارتفاع العمودي: $h = "AB" dot sin alpha = ${ab} times sin(${alpha} deg) = ${ab} times 0.5 = ${h}" m"$.\n- عمل قوة الثقل (محرك): $W_"AB"(vec(P)) = m g h = ${m} times ${g} times ${h} = ${wP}" J"$.\n- عمل رد الفعل الناظمي: $W_"AB"(vec(R)_N) = 0" J"$ لأنه عمودي على المسار.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) ${validF > 0 ? `تبلغ سرعة الجسم عند $B$ القيمة $v_B = ${actualVB}" m/s"$. اكتب معادلة انحفاظ الطاقة للجملة (جسم)، ثم استنتج قيمة الطاقة الحركية $E_"cB"$ وشدة قوة الاحتكاك $f$.` : `بإهمال الاحتكاكات، اكتب معادلة انحفاظ الطاقة للجملة (جسم) واستنتج الطاقة الحركية $E_"cB"$ وسرعة الجسم $v_B$ عند $B$.`}`,
				answer: validF > 0
					? `2) معادلة انحفاظ الطاقة للجملة (جسم):\n$E_"cA" + W_"AB"(vec(P)) - |W_"AB"(vec(f))| = E_"cB"$\nبما أن $E_"cA" = 0$:\n- الطاقة الحركية عند $B$: $E_"cB" = frac(1, 2) m v_B^2 = 0.5 times ${m} times (${actualVB})^2 = ${actualEcB}" J"$.\n- عمل الاحتكاك: $f dot "AB" = W_"AB"(vec(P)) - E_"cB" = ${wP} - ${actualEcB} = ${roundTo(wP - actualEcB, 2)}" J"$.\n- شدة قوة الاحتكاك: $f = frac(${roundTo(wP - actualEcB, 2)}, ${ab}) = ${validF}" N"$.`
					: `2) معادلة انحفاظ الطاقة للجملة (جسم):\n$E_"cA" + W_"AB"(vec(P)) = E_"cB" arrow.r.double E_"cB" = ${actualEcB}" J"$.\nالسرعة عند $B$: $v_B = sqrt(frac(2 E_"cB", m)) = sqrt(frac(2 times ${actualEcB}, ${m})) = ${actualVB}" m/s"$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ينزلق جسم صلب $(S)$ كتلته $m = ${m}\\text{ kg}$ بدون سرعة ابتدائية من الموضع $A$ على مستوٍ مائل طوله $AB = ${ab}\\text{ m}$ وزاوية ميله $\\alpha = ${alpha}^\\circ$ ($g = 10\\text{ m/s}^2$)${validF > 0 ? ` تحت تأثير قوة احتكاك ثابتة $f = ${validF}\\text{ N}$` : ' بإهمال الاحتكاكات'}.\nما قيمة الطاقة الحركية $E_{cB}$ للجسم عند بلوغ الموضع $B$؟`,
				questionTextAr: 'احسب الطاقة الحركية $E_{cB}$ عند أسفل المستوي المائل:',
				imageUrl: svgUrl,
				imageCaption: 'انزلاق جسم على مستوٍ مائل',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الارتفاع $h = AB \\sin(${alpha}^\\circ) = ${h}\\text{ m}$، وعمل الثقل $W(\\vec{P}) = mgh = ${wP}\\text{ J}$. بتطبيق انحفاظ الطاقة: $E_{cB} = W(\\vec{P}) ${validF > 0 ? `- f \\cdot AB = ${wP} - ${roundTo(validF * ab, 2)}` : ''} = ${actualEcB}\\text{ J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ينزلق جسم صلب $(S)$ كتلته $m = ${m}" kg"$ بدون سرعة ابتدائية من أعلى مستوٍ مائل $A$ نحو أسفله $B$ طوله $"AB" = ${ab}" m"$ وميله $alpha = ${alpha} deg$ ($g = 10" m/s"^2$).`,
				content
			},
			hints: [
				`احسب الارتفاع العمودي عبر العلاقة $h = AB \\cdot \\sin\\alpha$.`,
				`عمل رد الفعل الناظمي معدوم دوماً لأن $\\vec{R}_N \\perp \\overrightarrow{AB}$.`,
				`طبق مبدأ انحفاظ الطاقة: $E_{cA} + W_{AB}(\\vec{P}) - f\\cdot AB = E_{cB}$.`
			],
			solutionStepsAr: [
				`الارتفاع: $h = ${ab} \\sin(${alpha}^\\circ) = ${h}\\text{ m}$.`,
				`عمل الثقل: $W_{AB}(\\vec{P}) = mgh = ${wP}\\text{ J}$.`,
				validF > 0
					? `الطاقة الحركية $E_{cB} = ${actualEcB}\\text{ J}$ وقوة الاحتكاك $f = ${validF}\\text{ N}$.`
					: `الطاقة الحركية $E_{cB} = ${actualEcB}\\text{ J}$ والسرعة $v_B = ${actualVB}\\text{ m/s}$.`
			],
			finalAnswer: `E_{cB} = ${actualEcB}\\text{ J}${validF > 0 ? `\\quad ;\\quad f = ${validF}\\text{ N}` : `\\quad ;\\quad v_B = ${actualVB}\\text{ m/s}`}`
		};
	}
};

// 2. Potential (Gravitational & Elastic) and Mechanical Energy (4 pts)
export const tpl2asSharedT1PotentialElasticEnergy: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t1_potential_elastic_energy',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'الطاقة الكامنة المرونية والثقالية وانحفاظ الطاقة الميكانيكية',
	curriculumLessonId: 'phy_lesson_2as_shared_t1_potential_energy_mechanical',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m = rng.pick([0.5, 1, 2]);
		const k = rng.pick(difficulty === 'easy' ? [100, 200] : [160, 250, 400]);
		const xCm = rng.pick(difficulty === 'easy' ? [10, 20] : [10, 15, 20]);
		const x = roundTo(xCm / 100, 2);
		const epe = roundTo(0.5 * k * x * x, 2);
		const g = 10;
		const vExit = roundTo(Math.sqrt((2 * epe) / m), 2);
		const hMax = roundTo(epe / (m * g), 3);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: roundTo(x * 1.2, 2),
			yMin: 0,
			yMax: roundTo(epe * 1.25, 2),
			xStep: roundTo(x / 2, 3),
			yStep: roundTo(epe / 2, 2),
			xLabel: 'x (m)',
			yLabel: 'E (J)',
			title: 'منحنى تغير الطاقة الكامنة المرونية E_pe بدلالة الانضغاط x',
			curves: [
				{ fn: (xv) => 0.5 * k * xv * xv, color: '#2563eb', label: 'E_pe(x)' },
				{ fn: () => epe, color: '#dc2626', dashed: true, label: 'E_m' }
			],
			points: [{ x, y: epe, label: `(${x}, ${epe})`, color: '#059669' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t1_spring_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${hMax}\\text{ m}$`,
			[
				{
					text: `$${roundTo(hMax * 2, 3)}\\text{ m}$`,
					diagnosticFeedback: 'نسيت معامل 1/2 في عبارة الطاقة الكامنة المرونية E_pe = 1/2 k x².'
				},
				{
					text: `$${roundTo(hMax * 100, 1)}\\text{ m}$`,
					diagnosticFeedback: 'تأكد من تحويل الانضغاط x من cm إلى m قبل التربيع.'
				},
				{
					text: `$${roundTo(epe, 2)}\\text{ m}$`,
					diagnosticFeedback: 'خلطت بين الطاقة الكامنة المخزنة (بالجول) والارتفاع الأقصى (بالمتر).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'تغير الطاقة الكامنة المرونية بدلالة مقدار الانضغاط x',
				width: 320
			},
			{
				type: 'text',
				content: `1) احسب الطاقة الكامنة المرونية $E_"pe"$ المخزنة في الجملة (جسم + نابض) عند الانضغاط $x = ${xCm}" cm"$.`,
				answer: `1) التحويل إلى المتر: $x = ${xCm}" cm" = ${x}" m"$.\nالطاقة الكامنة المرونية:\n$E_"pe" = frac(1, 2) k x^2 = 0.5 times ${k} times (${x})^2 = ${epe}" J"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) عند تحرير النابض يغادر الجسم النابض على مستوٍ أفقي أملس نحو مستوٍ مائل أملس. بتطبيق انحفاظ الطاقة الميكانيكية، احسب سرعة مغادرة الجسم $v_0$ ثم أقصى ارتفاع $h_"max"$ يبلغه ($g = 10" m/s"^2$).`,
				answer: `2) انحفاظ الطاقة الميكانيكية:\n- عند الانفصال عن النابض تتحول $E_"pe"$ كلياً إلى طاقة حركية:\n$frac(1, 2) m v_0^2 = E_"pe" = ${epe}" J" arrow.r.double v_0 = sqrt(frac(2 times ${epe}, ${m})) = ${vExit}" m/s"$.\n- عند أقصى ارتفاع تنعدم السرعة وتتحول الطاقة كلياً إلى طاقة كامنة ثقالية:\n$m g h_"max" = E_"pe" arrow.r.double h_"max" = frac(${epe}, ${m} times ${g}) = ${hMax}" m"$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نضغط نابضاً مرناً ثابت مرونته $k = ${k}\\text{ N/m}$ بمقدار $x = ${xCm}\\text{ cm}$ بواسطة جسم كتلته $m = ${m}\\text{ kg}$ ثم نحرره على مسار أملس يرتفع نحو الأعلى ($g = 10\\text{ m/s}^2$).\nما أقصى ارتفاع $h_{\\max}$ يبلغه الجسم قبل توقفه لحظياً؟`,
				questionTextAr: 'احسب أقصى ارتفاع $h_{\\max}$ يبلغه الجسم:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى الطاقة الكامنة المرونية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نحول $x = ${x}\\text{ m}$ فنجد $E_{pe} = \\frac{1}{2}(${k})(${x})^2 = ${epe}\\text{ J}$. وبانحفاظ الطاقة الميكانيكية: $mgh_{\\max} = E_{pe} \\implies h_{\\max} = \\frac{${epe}}{${m}\\times 10} = ${hMax}\\text{ m}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندفع جسماً صلباً $(S)$ كتلته $m = ${m}" kg"$ نحو نابض أفقي ثابت مرونته $k = ${k}" N/m"$ فينضغط بمقدار $x = ${xCm}" cm"$ ثم نحرر الجملة دون سرعة ابتدائية على مسار أملس ($g = 10" m/s"^2$).`,
				content
			},
			hints: [
				`حول الاستطالة أو الانضغاط $x$ من السنتيمتر إلى المتر: $x = ${x}\\text{ m}$.`,
				`احسب الطاقة الابتدائية المخزنة: $E_{pe} = \\frac{1}{2}k x^2$.`,
				`عند أقصى ارتفاع تتوقف الحركة فتصبح $E_m = E_{pp} = m g h_{\\max}$.`
			],
			solutionStepsAr: [
				`تحويل الانضغاط: $x = ${x}\\text{ m}$ والطاقة المخزنة $E_{pe} = ${epe}\\text{ J}$.`,
				`سرعة الانطلاق: $v_0 = \\sqrt{2 E_{pe}/m} = ${vExit}\\text{ m/s}$.`,
				`أقصى ارتفاع: $h_{\\max} = E_{pe}/(mg) = ${hMax}\\text{ m}$.`
			],
			finalAnswer: `E_{pe} = ${epe}\\text{ J}\\quad ;\\quad h_{\\max} = ${hMax}\\text{ m}`
		};
	}
};

// 3. Conductivity & Kohlrausch's Law (5 pts, Experimental)
export const tpl2asSharedT1ConductivityKohlrausch: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t1_conductivity_kohlrausch',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'تعيين كمية المادة والتركيز المولي بقياس الناقلية (قانون كولروش)',
	curriculumLessonId: 'phy_lesson_2as_shared_t1_conductivity_molar_concentration',
	defaultPoints: 5,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const salts = [
			{
				nameAr: 'كلور الصوديوم',
				formula: 'NaCl',
				cat: 'Na+',
				an: 'Cl-',
				catCoeff: 1,
				anCoeff: 1,
				lCat: 5.0,
				lAn: 7.6,
				molarMass: 58.5
			},
			{
				nameAr: 'كلور البوتاسيوم',
				formula: 'KCl',
				cat: 'K+',
				an: 'Cl-',
				catCoeff: 1,
				anCoeff: 1,
				lCat: 7.4,
				lAn: 7.6,
				molarMass: 74.5
			},
			{
				nameAr: 'كلور الكالسيوم',
				formula: 'CaCl2',
				cat: 'Ca^2+',
				an: 'Cl-',
				catCoeff: 1,
				anCoeff: 2,
				lCat: 12.0,
				lAn: 7.6,
				molarMass: 111.0
			}
		];
		const salt = difficulty === 'easy' ? salts[0] : rng.pick(salts);
		const kSlope = roundTo(salt.catCoeff * salt.lCat + salt.anCoeff * salt.lAn, 2); // mS·m^2/mol
		const cMmol = rng.pick(difficulty === 'easy' ? [2, 4, 5] : [3, 5, 6, 8]); // mmol/L = mol/m^3
		const sigmaMsM = roundTo(kSlope * cMmol, 2); // mS/m
		const sigmaSM = roundTo(sigmaMsM / 1000, 5);
		const kCell = rng.pick([0.01, 0.02]); // m
		const gMs = roundTo(kCell * sigmaMsM, 3); // mS
		const uVolt = rng.pick([4, 5, 10]);
		const iMa = roundTo(gMs * uVolt, 2); // mA
		const vLitre = rng.pick([0.25, 0.5]);
		const cMolL = roundTo(cMmol * 1e-3, 4);
		const massG = roundTo(cMolL * vLitre * salt.molarMass, 4);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: roundTo(kSlope * 10, 0),
			xStep: 2,
			yStep: roundTo((kSlope * 10) / 5, 0),
			xLabel: 'C (mmol/L)',
			yLabel: 'σ (mS/m)',
			title: `منحنى المعايرة لمحلول ${salt.nameAr}`,
			curves: [{ fn: (c) => kSlope * c, color: '#2563eb', label: 'σ = f(C)' }],
			dashedGuides: [
				{ x1: cMmol, y1: 0, x2: cMmol, y2: sigmaMsM, color: '#dc2626' },
				{ x1: 0, y1: sigmaMsM, x2: cMmol, y2: sigmaMsM, color: '#dc2626' }
			],
			points: [{ x: cMmol, y: sigmaMsM, label: `C = ${cMmol} mmol/L`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t1_cond_s${seed}_${difficulty}`, svg);

		const spSalt = chemSpecies(salt.formula, 'aq');
		const spCat = chemSpecies(salt.cat, 'aq');
		const spAn = chemSpecies(salt.an, 'aq');

		const mcq = buildUniqueMcqOptions(
			`$${cMmol}\\times 10^{-3}\\text{ mol/L}$`,
			[
				{
					text: `$${cMmol}\\text{ mol/L}$`,
					diagnosticFeedback: 'نسيت تحويل التركيز من mol/m³ (أي mmol/L) إلى mol/L بالقسمة على 1000.'
				},
				{
					text: `$${roundTo(sigmaMsM / (salt.lCat + salt.lAn), 2)}\\times 10^{-3}\\text{ mol/L}$`,
					diagnosticFeedback:
						salt.anCoeff > 1
							? 'انتبه للمعامل الستوكيومتري لشاردة الكلوريد (2 Cl⁻) عند تطبيق قانون كولروش.'
							: 'تحقق من مجموع الناقليات المولية الشاردية وقيمة σ.'
				},
				{
					text: `$${roundTo(cMmol * 2, 2)}\\times 10^{-3}\\text{ mol/L}$`,
					diagnosticFeedback: 'تحقق من حساب الناقلية النوعية σ = G / k.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'منحنى المعايرة الخطي σ = f(C)',
				width: 320
			},
			{
				type: 'text',
				content: `1) احسب الناقلية $G$ لجزء المحلول المحصور بين صفيحتي الخلية، ثم استنتج الناقلية النوعية $sigma$ للمحلول بوحدة $"mS/m"$ (ثابت الخلية $k = ${kCell}" m"$).`,
				answer: `1) حساب الناقلية $G$ والناقلية النوعية $sigma$:\n- $G = frac(I, U) = frac(${iMa}" mA", ${uVolt}" V") = ${gMs}" mS" = ${roundTo(gMs / 1000, 6)}" S"$.\n- $sigma = frac(G, k) = frac(${gMs}" mS", ${kCell}" m") = ${sigmaMsM}" mS/m" = ${sigmaSM}" S/m"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اكتب عبارة قانون كولروش للناقلية النوعية بدلالة التركيز المولي $C$ للشوارد ${spCat.typst} و ${spAn.typst}، ثم استنتج التركيز $C$ بوحدة $"mol/m"^3$ وبوحدة $"mol/L"$.`,
				answer: `2) قانون كولروش:\n$sigma = (${salt.catCoeff > 1 ? `${salt.catCoeff} ` : ''}lambda_(${salt.cat}) + ${salt.anCoeff > 1 ? `${salt.anCoeff} ` : ''}lambda_(${salt.an})) dot C = (${salt.catCoeff} times ${salt.lCat} + ${salt.anCoeff} times ${salt.lAn}) dot C = ${kSlope} dot C$\n$C = frac(${sigmaMsM}, ${kSlope}) = ${cMmol}" mol/m"^3 = ${cMolL}" mol/L"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) استنتج كتلة الملح النقي $m$ المذابة في حجم $V = ${vLitre}" L"$ من هذا المحلول ($M = ${salt.molarMass}" g/mol"$).`,
				answer: `3) الكتلة المذابة:\n$n = C dot V = ${cMolL} times ${vLitre} = ${roundTo(cMolL * vLitre, 5)}" mol"$.\n$m = n dot M = ${roundTo(cMolL * vLitre, 5)} times ${salt.molarMass} = ${massG}" g"$.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نغمر خلية قياس ناقلية ثابتها $k = ${kCell}\\text{ m}$ في محلول مائي لملح ${salt.nameAr} ${spSalt.katex} تركيزه المولي $C$. نقيس $I = ${iMa}\\text{ mA}$ تحت توتر فعال $U = ${uVolt}\\text{ V}$.\nمعطيات الناقلية المولية الشاردية بـ $\\text{mS}\\cdot\\text{m}^2/\\text{mol}$: $\\lambda_1 = ${salt.lCat}$، $\\lambda_2 = ${salt.lAn}$.\nما قيمة التركيز المولي $C$ للمحلول بوحدة $\\text{mol/L}$؟`,
				questionTextAr: 'احسب التركيز المولي $C$ للمحلول بوحدة $\\text{mol/L}$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى معايرة الناقلية النوعية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `نحسب $G = I/U = ${gMs}\\text{ mS}$، ومنه $\\sigma = G/k = ${sigmaMsM}\\text{ mS/m}$. بقانون كولروش $\\sigma = ${kSlope} C \\implies C = ${cMmol}\\text{ mol/m}^3 = ${cMmol}\\times 10^{-3}\\text{ mol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نحضر حجماً $V = ${vLitre}" L"$ من محلول مائي لملح ${salt.nameAr} (${spSalt.typst}) بإذابة كتلة $m$ منه في الماء المقطر. نقيس شدة التيار المارة في خلية ناقلية ثابتها $k = ${kCell}" m"$ تحت توتر فعال $U = ${uVolt}" V"$ فنجد $I = ${iMa}" mA"$. المعطيات: $lambda_1 = ${salt.lCat}" mS" dot "m"^2/"mol"$، $lambda_2 = ${salt.lAn}" mS" dot "m"^2/"mol"$.`,
				content
			},
			hints: [
				`احسب الناقلية $G = I/U$ ثم الناقلية النوعية $\\sigma = G/k$.`,
				`انتبه للمعاملات الستوكيوميترية للشوارد في قانون كولروش $\\sigma = \\sum \\lambda_i [X_i]$.`,
				`تذكر أن $1\\text{ mol/m}^3 = 10^{-3}\\text{ mol/L}$.`
			],
			solutionStepsAr: [
				`الناقلية $G = ${gMs}\\text{ mS}$ والناقلية النوعية $\\sigma = ${sigmaMsM}\\text{ mS/m}$.`,
				`بتطبيق قانون كولروش: $C = ${cMmol}\\text{ mol/m}^3 = ${cMolL}\\text{ mol/L}$.`,
				`الكتلة المذابة: $m = C \\cdot V \\cdot M = ${massG}\\text{ g}$.`
			],
			finalAnswer: `C = ${cMolL}\\text{ mol/L}\\quad ;\\quad m = ${massG}\\text{ g}`
		};
	}
};

// 4. Calorimetry & Thermal Equilibrium (4 pts)
export const tpl2asSharedT1CalorimetryThermalEquilibrium: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t1_calorimetry_thermal_equilibrium',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'التحويل الحراري والمسعر الحراري وتغير الحالة',
	curriculumLessonId: 'phy_lesson_2as_shared_t1_internal_energy_calorimetry',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cWater = 4180; // J/(kg·°C)
		const cCal = difficulty === 'easy' ? 0 : rng.pick([80, 120, 160]);
		const m1G = rng.pick([200, 250, 300]);
		const m1 = m1G / 1000;
		const theta1 = rng.pick([20, 22, 25]);
		const m2G = rng.pick([100, 150, 200]);
		const m2 = m2G / 1000;
		const theta2 = rng.pick([70, 75, 80]);

		// Warm water mixed into calorimeter with cold water
		const capCold = m1 * cWater + cCal;
		const capHot = m2 * cWater;
		const thetaF = roundTo((capCold * theta1 + capHot * theta2) / (capCold + capHot), 2);
		const qCold = roundTo(capCold * (thetaF - theta1), 1);

		const mcq = buildUniqueMcqOptions(
			`$${thetaF}^\\circ\\text{C}$`,
			[
				{
					text: `$${roundTo((theta1 + theta2) / 2, 2)}^\\circ\\text{C}$`,
					diagnosticFeedback: 'المتوسط الحسابي البسيط لا يصلح إلا إذا تساوت الكتلتان وأُهمل المسعر.'
				},
				{
					text: `$${roundTo((m1 * cWater * theta1 + capHot * theta2) / (m1 * cWater + capHot), 2)}^\\circ\\text{C}$`,
					diagnosticFeedback: cCal > 0 ? 'أهملت السعة الحرارية للمسعر C_cal في معادلة التوازن.' : 'تحقق من الكتلتين m1 و m2.'
				},
				{
					text: `$${roundTo(thetaF + 4.5, 2)}^\\circ\\text{C}$`,
					diagnosticFeedback: 'راجع تطبيق معادلة التوازن الحراري ∑Q_i = 0.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اكتب عبارتي التحويل الحراري $Q_1$ الذي تكتسبه الجملة (ماء بارد + مسعر) والتحويل الحراري $Q_2$ الذي يفقده الماء الساخن بدلالة درجة حرارة التوازن $theta_f$.`,
				answer: `1) عبارتا التحويل الحراري:\n- الجملة الباردة (ماء + مسعر): $Q_1 = (m_1 c_"eau" + C_"cal")(theta_f - theta_1)$.\n- الماء الساخن: $Q_2 = m_2 c_"eau"(theta_f - theta_2)$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) باعتبار المسعر معزولاً حرارياً ($Q_1 + Q_2 = 0$)، احسب درجة حرارة التوازن الحراري $theta_f$ ثم استنتج مقدار التحويل الحراري المتبادل $|Q|$.`,
				answer: `2) معادلة التوازن الحراري $Q_1 + Q_2 = 0$:\n$(${m1} times ${cWater} + ${cCal})(theta_f - ${theta1}) + ${m2} times ${cWater}(theta_f - ${theta2}) = 0$\n$${roundTo(capCold, 1)}(theta_f - ${theta1}) + ${roundTo(capHot, 1)}(theta_f - ${theta2}) = 0$\n$theta_f = frac(${roundTo(capCold * theta1 + capHot * theta2, 1)}, ${roundTo(capCold + capHot, 1)}) = ${thetaF} deg"C"$.\nمقدار الطاقة الحرارية المتبادلة: $|Q| = Q_1 = ${qCold}" J"$.`,
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يحتوي مسعر حراري ${cCal > 0 ? `سعته الحرارية $C_{\\text{cal}} = ${cCal}\\text{ J/}^\\circ\\text{C}$` : 'مهمل السعة الحرارية'} على كتلة $m_1 = ${m1G}\\text{ g}$ من الماء عند درجة الحرارة $\\theta_1 = ${theta1}^\\circ\\text{C}$. نضيف إليه كتلة $m_2 = ${m2G}\\text{ g}$ من الماء الساخن عند $\\theta_2 = ${theta2}^\\circ\\text{C}$ ($c_{\\text{eau}} = ${cWater}\\text{ J/(kg}\\cdot^\\circ\\text{C)}$).\nما قيمة درجة حرارة التوازن النهائية $\\theta_f$؟`,
				questionTextAr: 'احسب درجة حرارة التوازن الحراري $\\theta_f$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتطبيق مبدأ التوازن الحراري $\\sum Q_i = 0$: $(${roundTo(capCold, 1)})(\\theta_f - ${theta1}) + (${roundTo(capHot, 1)})(\\theta_f - ${theta2}) = 0 \\implies \\theta_f = ${thetaF}^\\circ\\text{C}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نضع في مسعر حراري ${cCal > 0 ? `سعته الحرارية $C_"cal" = ${cCal}" J/"deg"C"$` : 'مهمل السعة الحرارية'} كتلة $m_1 = ${m1G}" g"$ من الماء عند درجة الحرارة $theta_1 = ${theta1} deg"C"$، ثم نسكب فيه كتلة $m_2 = ${m2G}" g"$ من الماء الساخن عند $theta_2 = ${theta2} deg"C"$. المعطيات: $c_"eau" = ${cWater}" J/(kg" dot deg"C)"$.`,
				content
			},
			hints: [
				`حول الكتل إلى الكيلوغرام: $m_1 = ${m1}\\text{ kg}$ و $m_2 = ${m2}\\text{ kg}$.`,
				`اكتب دوماً $(\\theta_f - \\theta_i)$ في كل حد من حدود $Q_i$.`,
				`عزلاً حرارياً يعني $\\sum Q_i = 0 \\implies Q_1 + Q_2 = 0$.`
			],
			solutionStepsAr: [
				`كتابة $Q_1 = (${roundTo(capCold, 1)})(\\theta_f - ${theta1})$ و $Q_2 = (${roundTo(capHot, 1)})(\\theta_f - ${theta2})$.`,
				`حل معادلة التوازن: $\\theta_f = ${thetaF}^\\circ\\text{C}$.`,
				`كمية الحرارة المتبادلة: $Q_1 = ${qCold}\\text{ J}$.`
			],
			finalAnswer: `\\theta_f = ${thetaF}^\\circ\\text{C}\\quad ;\\quad Q_1 = ${qCold}\\text{ J}`
		};
	}
};

// 5. Integration T1: Mechanics/Energy + Conductimetry (7 pts, isIntegration: true, isExperimental: true)
export const tpl2asSharedT1IntegrationEnergyMatter: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_shared_t1_integration_energy_matter',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'مسألة إدماجية (الفصل الأول): الطاقة الميكانيكية وقياس الناقلية',
	curriculumLessonId: 'phy_lesson_2as_shared_t1_potential_energy_mechanical',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m = rng.pick([1, 2]);
		const g = 10;
		const h = rng.pick([1.8, 2.0, 3.2]);
		const vB = roundTo(Math.sqrt(2 * g * h), 2);
		const kSpring = rng.pick([200, 400, 500]);
		const epeMax = roundTo(m * g * h, 2);
		const xMax = roundTo(Math.sqrt((2 * epeMax) / kSpring), 3);

		// Part 2: Conductimetry of KCl solution
		const lambdaK = 7.4;
		const lambdaCl = 7.6;
		const kSum = 15.0; // mS·m^2/mol
		const cMmol = rng.pick([4, 6, 8]);
		const sigmaMsM = roundTo(kSum * cMmol, 1);
		const kCell = 0.01;
		const gMs = roundTo(kCell * sigmaMsM, 3);
		const rOhm = roundTo(1000 / gMs, 1);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 160,
			xStep: 2,
			yStep: 30,
			xLabel: 'C (mmol/L)',
			yLabel: 'σ (mS/m)',
			title: 'بيان معايرة الناقلية النوعية σ = f(C) لمحلول (K⁺ + Cl⁻)',
			curves: [{ fn: (c) => kSum * c, color: '#2563eb', label: 'σ = 15·C' }],
			dashedGuides: [
				{ x1: cMmol, y1: 0, x2: cMmol, y2: sigmaMsM, color: '#dc2626' },
				{ x1: 0, y1: sigmaMsM, x2: cMmol, y2: sigmaMsM, color: '#dc2626' }
			],
			points: [{ x: cMmol, y: sigmaMsM, label: `(${cMmol}, ${sigmaMsM})`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_shared_t1_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$v_B = ${vB}\\text{ m/s}\\quad ;\\quad C = ${cMmol}\\text{ mmol/L}$`,
			[
				{
					text: `$v_B = ${roundTo(g * h, 2)}\\text{ m/s}\\quad ;\\quad C = ${cMmol}\\text{ mmol/L}$`,
					diagnosticFeedback: 'نسيت الجذر التربيعي ومعامل 2 في عبارة السرعة v_B = √(2gh).'
				},
				{
					text: `$v_B = ${vB}\\text{ m/s}\\quad ;\\quad C = ${roundTo(cMmol * 10, 1)}\\text{ mmol/L}$`,
					diagnosticFeedback: 'تحقق من العلاقة بين الناقلية G والناقلية النوعية σ = G / k.'
				},
				{
					text: `$v_B = ${roundTo(vB / 2, 2)}\\text{ m/s}\\quad ;\\quad C = ${roundTo(cMmol / 2, 1)}\\text{ mmol/L}$`,
					diagnosticFeedback: 'راجع خطوات حساب الطاقة الميكانيكية وقانون كولروش.'
				}
			],
			rng
		);

		const spKCl = chemSpecies('KCl', 'aq');
		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة التجريبية: منحنى معايرة محلول كلور البوتاسيوم',
				width: 310
			},
			{
				type: 'text',
				content: `الجزء الأول (الطاقة الميكانيكية): ينزلق جسم صلب $(S)$ كتلته $m = ${m}" kg"$ بدون سرعة ابتدائية من النقطة $A$ على ارتفاع $h = ${h}" m"$ فوق مسار أملس ليصل إلى الجزء الأفقي عند $B$ حيث يصطدم بنابض أفقي ثابت مرونته $k = ${kSpring}" N/m"$ فيضغطه بمقدار أعظمي $x_"max"$ ($g = 10" m/s"^2$).\n1) مثّل الحصيلة الطاقوية للجملة (جسم + أرض) بين $A$ و $B$، ثم احسب السرعة $v_B$.`,
				answer: `1) بين $A$ و $B$ للجملة (جسم + أرض):\n- عمود $E_c$ يتزايد من $0$ إلى $E_"cB"$، وعمود $E_"pp"$ يتناقص من $E_"ppA"$ إلى $0$.\n- معادلة انحفاظ الطاقة: $E_"ppA" = E_"cB" arrow.r.double m g h = frac(1, 2) m v_B^2$.\n- السرعة عند $B$: $v_B = sqrt(2 g h) = sqrt(2 times 10 times ${h}) = ${vB}" m/s"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) بتطبيق انحفاظ الطاقة الميكانيكية للجملة (جسم + نابض) على الجزء الأفقي، احسب الانضغاط الأعظمي $x_"max"$ للنابض.`,
				answer: `2) انحفاظ الطاقة أثناء انضغاط النابض:\n$frac(1, 2) m v_B^2 = frac(1, 2) k x_"max"^2 = ${epeMax}" J"$\n$x_"max" = sqrt(frac(2 times ${epeMax}, ${kSpring})) = ${xMax}" m"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (التجريبي - قياس الناقلية): نعاير خلية ناقلية ثابتها $k_"cell" = ${kCell}" m"$ بمحاليل قياسية من ${spKCl.typst} ($lambda_(K^+) = ${lambdaK}$ و $lambda_(Cl^-) = ${lambdaCl}$ بـ $"mS" dot "m"^2/"mol"$) فنحصل على البيان المرفق.\n3) أوجد معادلة البيان نظرياً وتجريبياً، ثم احسب التركيز $C$ لمحلول مجهول قيس فيه $G = ${gMs}" mS"$ (ومقاومته $R$).`,
				answer: `3) استغلال البيان وقياس الناقلية:\n- نظرياً بقانون كولروش: $sigma = (lambda_(K^+) + lambda_(Cl^-)) dot C = ${kSum} C$ (بـ $"mS/m"$ عندما $C$ بـ $"mmol/L"$).\n- لمحلول مجهول ناقليته $G = ${gMs}" mS"$: $sigma = frac(G, k_"cell") = frac(${gMs}, ${kCell}) = ${sigmaMsM}" mS/m"$.\n- بالاستقراء من البيان أو بالحساب: $C = frac(${sigmaMsM}, ${kSum}) = ${cMmol}" mmol/L" = ${roundTo(cMmol * 1e-3, 4)}" mol/L"$.\n- المقاومة: $R = frac(1, G) = frac(1000, ${gMs}) approx ${rOhm} Omega$.`,
				mark: '3.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مسألة إدماجية من جزأين: (1) ينزلق جسم كتلته $m = ${m}\\text{ kg}$ بدون احتكاك من ارتفاع $h = ${h}\\text{ m}$ ($g = 10\\text{ m/s}^2$). (2) تُقاس ناقلية محلول ${chemSpecies('KCl', 'aq').katex} في خلية ثابتها $k = ${kCell}\\text{ m}$ فتُعطى $G = ${gMs}\\text{ mS}$ (انظر البيان).\nما هما قيمتا السرعة $v_B$ في أسفل المنحدر والتركيز المولي $C$؟`,
				questionTextAr: 'حدد القيمتين الصحيحتين للسرعة $v_B$ والتركيز $C$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى معايرة محلول كلور البوتاسيوم',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بانحفاظ الطاقة $v_B = \\sqrt{2gh} = ${vB}\\text{ m/s}$. وفي الجزء الثاني $\\sigma = G/k = ${sigmaMsM}\\text{ mS/m}$ ومنه من البيان $C = ${cMmol}\\text{ mmol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية (الميكانيك والناقلية)',
				instruction: 'يضم التمرين جزأين مستقلين يتناولان انحفاظ الطاقة وتعيين كمية المادة عن طريق قياس الناقلية.',
				content
			},
			hints: [
				`في السقوط على مسار أملس: $mgh = \\frac{1}{2}mv_B^2 \\implies v_B = \\sqrt{2gh}$.`,
				`الانضغاط الأعظمي للنابض يحقق $\\frac{1}{2}kx_{\\max}^2 = mgh$.`,
				`الناقلية النوعية $\\sigma = G/k$، والبيان يعطي مباشرة $C$ بـ $\\text{mmol/L}$.`
			],
			solutionStepsAr: [
				`السرعة عند $B$: $v_B = ${vB}\\text{ m/s}$.`,
				`الانضغاط الأعظمي: $x_{\\max} = ${xMax}\\text{ m}$.`,
				`الناقلية النوعية $\\sigma = ${sigmaMsM}\\text{ mS/m}$ والتركيز $C = ${cMmol}\\text{ mmol/L}$.`
			],
			finalAnswer: `v_B = ${vB}\\text{ m/s}\\quad ;\\quad x_{\\max} = ${xMax}\\text{ m}\\quad ;\\quad C = ${cMmol}\\text{ mmol/L}`
		};
	}
};

export const SHARED_TEMPLATES_2AS_T1: PhysicsParameterizedTemplate[] = [
	tpl2asSharedT1WorkKineticEnergy,
	tpl2asSharedT1PotentialElasticEnergy,
	tpl2asSharedT1ConductivityKohlrausch,
	tpl2asSharedT1CalorimetryThermalEquilibrium,
	tpl2asSharedT1IntegrationEnergyMatter
];
