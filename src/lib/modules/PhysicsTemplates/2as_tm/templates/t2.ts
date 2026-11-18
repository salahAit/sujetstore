import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	savePhysicsSvgAsset,
	svgOscilloscopeTrace,
	svgPhysicsCurvePlot
} from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';

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
// 2AS TM Exclusive Template 1 (T2): Faraday Electromagnetic Induction (4.5 pts)
// ============================================================================

export const tpl2asTmT2FaradayInduction: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t2_faraday_induction',
	grade: '2as_tm',
	trimesterId: 't2',
	domain: 'electromagnetism',
	titleAr: 'التحريض الكهرومغناطيسي: التدفق المغناطيسي وقانون فاراداي وقانون لنز',
	curriculumLessonId: 'phy_lesson_2as_tm_t2_electromagnetic_induction_faraday',
	defaultPoints: 4.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nTurns = rng.pick([100, 200, 250]);
		const sCm2 = rng.pick([40, 50, 80]);
		const sM2 = roundTo(sCm2 * 1e-4, 4);
		const bMax = rng.pick([0.2, 0.4, 0.5]);
		const dtMs = rng.pick(difficulty === 'easy' ? [100, 200] : [50, 80, 100]);
		const dtS = dtMs / 1000;
		const phiMax = roundTo(nTurns * bMax * sM2, 4);
		const eInd = roundTo(phiMax / dtS, 2);
		const rOhm = rng.pick([5, 10]);
		const iInd = roundTo(eInd / rOhm, 3);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: dtMs * 2,
			yMin: 0,
			yMax: roundTo(bMax * 1.25, 2),
			xStep: dtMs / 2,
			yStep: roundTo(bMax / 2, 2),
			xLabel: 't (ms)',
			yLabel: 'B (T)',
			title: 'تغيرات شدة الحقل المغناطيسي B بدلالة الزمن t',
			curves: [
				{
					fn: (t) => (t <= dtMs ? (bMax * t) / dtMs : bMax),
					color: '#2563eb',
					label: 'B(t)'
				}
			],
			points: [{ x: dtMs, y: bMax, label: `(${dtMs} ms, ${bMax} T)`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_tm_t2_faraday_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$|e| = ${eInd}\\text{ V}\\quad ;\\quad i = ${iInd}\\text{ A}$`,
			[
				{
					text: `$|e| = ${roundTo(eInd / 1000, 4)}\\text{ V}\\quad ;\\quad i = ${roundTo(iInd / 1000, 5)}\\text{ A}$`,
					diagnosticFeedback: 'نسيت تحويل الزمن Δt من الميلي ثانية إلى الثانية (أو المساحة S إلى m²).'
				},
				{
					text: `$|e| = ${roundTo(eInd / nTurns, 3)}\\text{ V}\\quad ;\\quad i = ${roundTo(iInd / nTurns, 4)}\\text{ A}$`,
					diagnosticFeedback: 'نسيت الضرب في عدد لفات الوشيعة N عند حساب التدفق المغناطيسي Φ = N·B·S.'
				},
				{
					text: `$|e| = ${roundTo(eInd * 2, 2)}\\text{ V}\\quad ;\\quad i = ${roundTo(iInd * 2, 3)}\\text{ A}$`,
					diagnosticFeedback: 'تحقق من قيمة ميل المستقيم ΔB/Δt في الطور الأول.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'تغير شدة الحقل المغناطيسي B(t) العمودي على مستوي الوشيعة',
				width: 320
			},
			{
				type: 'text',
				content: `1) احسب التدفق المغناطيسي الأعظمي $Phi_"max"$ الذي يجتاز الوشيعة عندما يبلغ الحقل قيمته $B_"max" = ${bMax}" T"$ ($alpha = 0 deg$).`,
				answer: `1) التدفق المغناطيسي:\n- المساحة: $S = ${sCm2}" cm"^2 = ${sM2}" m"^2$.\n- $Phi_"max" = N dot B_"max" dot S dot cos(0 deg) = ${nTurns} times ${bMax} times ${sM2} = ${phiMax}" Wb"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) بتطبيق قانون فاراداي، احسب القوة المحركة الكهربائية التحريضية $e$ خلال المجال الزمني $[0; ${dtMs}" ms"]$، ثم استنتج قيمتها في المجال $[${dtMs}; ${dtMs * 2}" ms"]$.`,
				answer: `2) القوة المحركة التحريضية:\n- في المجال $[0; ${dtMs}" ms"]$: يتغير التدفق من $0$ إلى $${phiMax}" Wb"$ خلال $Delta t = ${dtS}" s"$:\n$e = -frac(Delta Phi, Delta t) = -frac(${phiMax} - 0, ${dtS}) = -${eInd}" V"$ (أي $|e| = ${eInd}" V"$).\n- في المجال $[${dtMs}; ${dtMs * 2}" ms"]$: $B$ ثابت، إذن $Delta Phi = 0 arrow.r.double e = 0" V"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) تُغلق الوشيعة على ناقل أومي مقاومته الكلية $R = ${rOhm}\\,Omega$. احسب شدة التيار المتحرض $i$ خلال المجال الأول وحدد اتجاهه وفق قانون لنز.`,
				answer: `3) شدة التيار المتحرض وقانون لنز:\n- $i = frac(|e|, R) = frac(${eInd}, ${rOhm}) = ${iInd}" A"$.\n- حسب قانون لنز، يولد التيار المتحرض حقلاً مغناطيسياً معاكساً لجهة $vec(B)$ المتزايد لمقاومة تزايد التدفق.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تخترق خطوط حقل مغناطيسي متعامد ($\\alpha = 0^\\circ$) وشيعة مسطحة تحتوي على $N = ${nTurns}$ لفة مساحة كل منها $S = ${sCm2}\\text{ cm}^2$، ومغلقة على مقاومة $R = ${rOhm}\\,\\Omega$. يتزايد الحقل خطياً من $0$ إلى $B_{\\max} = ${bMax}\\text{ T}$ خلال $\\Delta t = ${dtMs}\\text{ ms}$ (انظر البيان).\nما هما القيمة المطلقة للقوة المحركة التحريضية $|e|$ وشدة التيار المتحرض $i$؟`,
				questionTextAr: 'احسب $|e|$ وشدة التيار المتحرض $i$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى تغير الحقل المغناطيسي B(t)',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$\\Phi_{\\max} = ${nTurns}\\times ${bMax}\\times ${sM2} = ${phiMax}\\text{ Wb}$. بقانون فاراداي $|e| = \\frac{${phiMax}}{${dtS}} = ${eInd}\\text{ V}$ ومنه $i = \\frac{${eInd}}{${rOhm}} = ${iInd}\\text{ A}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `وشيعة مسطحة عدد لفاتها $N = ${nTurns}$ لفة ومساحة كل لفة $S = ${sCm2}" cm"^2$ ومقاومتها الكلية مع الدارة $R = ${rOhm}\\,Omega$، تخضع لحقل مغناطيسي عمودي على مستوي لفاتها تتغير شدته وفق البيان المرفق.`,
				content
			},
			hints: [
				`حول المساحة من $\\text{cm}^2$ إلى $\\text{m}^2$ بالضرب في $10^{-4}$.`,
				`التدفق المغناطيسي الكلي $\\Phi = N \\cdot B \\cdot S \\cdot \\cos\\alpha$.`,
				`عندما يثبت الحقل المغناطيسي ($\\Delta B = 0$) تنعدم القوة المحركة التحريضية.`
			],
			solutionStepsAr: [
				`التدفق الأعظمي $\\Phi_{\\max} = ${phiMax}\\text{ Wb}$.`,
				`القوة المحركة التحريضية $|e| = ${eInd}\\text{ V}$ في الطور الأول و $0$ في الثاني.`,
				`شدة التيار المتحرض $i = ${iInd}\\text{ A}$.`
			],
			finalAnswer: `\\Phi_{\\max} = ${phiMax}\\text{ Wb}\\quad ;\\quad |e| = ${eInd}\\text{ V}\\quad ;\\quad i = ${iInd}\\text{ A}`
		};
	}
};

// ============================================================================
// 2AS TM Exclusive Template 2 (T2): AC Voltages, Transformer & Rectification (5 pts)
// ============================================================================

export const tpl2asTmT2AcTransformerRectification: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t2_ac_transformer_rectification',
	grade: '2as_tm',
	trimesterId: 't2',
	domain: 'waves_ac',
	titleAr: 'التيار المتناوب الجيبي، المحول الكهربائي، وتقويم التوتر (AC/DC)',
	curriculumLessonId: 'phy_lesson_2as_tm_t2_ac_voltages_transformers',
	defaultPoints: 5,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sv = rng.pick([5, 10]); // V/div
		const yDiv = rng.pick([2, 3]);
		const sh = 5; // ms/div
		const xDiv = rng.pick(difficulty === 'easy' ? [4] : [2, 4]);
		const u2Max = sv * yDiv;
		const u2Eff = roundTo(u2Max / Math.SQRT2, 2);
		const periodMs = sh * xDiv;
		const periodS = periodMs / 1000;
		const freqHz = roundTo(1 / periodS, 1);
		const u1Eff = 220;
		const n1 = 1100;
		const n2 = roundTo((n1 * u2Eff) / u1Eff, 1);
		const ratioM = roundTo(u2Eff / u1Eff, 4);
		const rectFreq = freqHz * 2;

		const svg = svgOscilloscopeTrace({
			amplitudeDivs: yDiv,
			periodDivs: xDiv,
			svLabel: `Sv = ${sv} V/div`,
			shLabel: `Sh = ${sh} ms/div`
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_tm_t2_ac_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$U_{2\\text{eff}} = ${u2Eff}\\text{ V}\\quad ;\\quad f = ${freqHz}\\text{ Hz}$`,
			[
				{
					text: `$U_{2\\text{eff}} = ${u2Max}\\text{ V}\\quad ;\\quad f = ${freqHz}\\text{ Hz}$`,
					diagnosticFeedback: 'الارتفاع على راسم الاهتزاز المهبطي يعطي التوتر الأعظمي U_max وليس المنتج U_eff = U_max/√2.'
				},
				{
					text: `$U_{2\\text{eff}} = ${u2Eff}\\text{ V}\\quad ;\\quad f = ${roundTo(1 / periodMs, 3)}\\text{ Hz}$`,
					diagnosticFeedback: 'نسيت تحويل الدور T من الميلي ثانية إلى الثانية قبل حساب التواتر f = 1/T.'
				},
				{
					text: `$U_{2\\text{eff}} = ${roundTo(u2Max * Math.SQRT2, 2)}\\text{ V}\\quad ;\\quad f = ${freqHz}\\text{ Hz}$`,
					diagnosticFeedback: 'نقسم U_max على √2 للحصول على U_eff وليس العكس.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'راسم الاهتزاز المهبطي: معاينة التوتر الثانوي u₂(t)',
				width: 310
			},
			{
				type: 'text',
				content: `1) بالاعتماد على شاشة راسم الاهتزاز المهبطي، استنتج التوتر الأعظمي $U_"2max"$، التوتر المنتج $U_"2eff"$، الدور $T$، والتواتر $f$.`,
				answer: `1) قراءة المنحنى الجيبي:\n- $U_"2max" = S_v dot y_"max" = ${sv} times ${yDiv} = ${u2Max}" V"$.\n- $U_"2eff" = frac(U_"2max", sqrt(2)) = frac(${u2Max}, sqrt(2)) approx ${u2Eff}" V"$.\n- $T = S_h dot x_T = ${sh} times ${xDiv} = ${periodMs}" ms" = ${periodS}" s"$.\n- $f = frac(1, T) = frac(1, ${periodS}) = ${freqHz}" Hz"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) المحول الكهربائي مثالي يُغذى أوليه بتوتر منتج $U_1 = ${u1Eff}" V"$ وعدد لفات أوليه $N_1 = ${n1}$ لفة. احسب نسبة التحويل $m$ وعدد لفات الثانوي $N_2$. هل المحول رافع أم خافض للتوتر؟`,
				answer: `2) المحول المثالي:\n- نسبة التحويل: $m = frac(U_"2eff", U_1) = frac(${u2Eff}, ${u1Eff}) approx ${ratioM} < 1$ (محول خافض للتوتر).\n- عدد لفات الثانوي: $N_2 = m dot N_1 approx ${n2}$ لفة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) نوصل مخرج المحول بجسر غريتس ($4$ صمامات ثنائية) متبوعاً بمكثفة على التفرع مع مقاومة الحمل. ما دور جسر غريتس والمكثفة؟ وما تواتر التوتر المقوم قبل الترشيح؟`,
				answer: `3) التقويم والترشيح:\n- جسر غريتس يُنجز **تقويماً ثنائي النوبة** بتحويل النوبة السالبة إلى موجبة فيصبح تواتر النبضات $f' = 2f = ${rectFreq}" Hz"$.\n- المكثفة تقوم بـ **ترشيح (تمليس)** التوتر لتقليل التموجات والحصول على توتر شبه مستمر ($"DC"$).`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعاين التوتر الثانوي لمحول مثالي على راسم الاهتزاز المهبطي ($S_v = ${sv}\\text{ V/div}$، $S_h = ${sh}\\text{ ms/div}$) كما يظهر في الشاشة ($y_{\\max} = ${yDiv}\\text{ div}$، $x_T = ${xDiv}\\text{ div}$).\nما هما قيمتا التوتر المنتج $U_{2\\text{eff}}$ والتواتر $f$؟`,
				questionTextAr: 'استنتج $U_{2\\text{eff}}$ والتواتر $f$ من الشاشة:',
				imageUrl: svgUrl,
				imageCaption: 'أثر التوتر الثانوي على شاشة راسم الاهتزاز',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$U_{2\\max} = ${sv}\\times ${yDiv} = ${u2Max}\\text{ V} \\implies U_{2\\text{eff}} = ${u2Eff}\\text{ V}$، والدور $T = ${periodMs}\\text{ ms} = ${periodS}\\text{ s} \\implies f = ${freqHz}\\text{ Hz}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لدراسة وحدة تغذية مستمرة لجهاز إلكتروني، نعاين التوتر الثانوي لمحول مثالي (أوليه $U_1 = ${u1Eff}" V"$ و $N_1 = ${n1}$ لفة) على راسم الاهتزاز المهبطي بالحساسيتين $S_v = ${sv}" V/div"$ و $S_h = ${sh}" ms/div"$.`,
				content
			},
			hints: [
				`التوتر الأعظمي $U_{\\max} = S_v \\cdot y_{\\max}$ والمنتج $U_{\\text{eff}} = U_{\\max}/\\sqrt{2}$.`,
				`الدور $T = S_h \\cdot x_T$ بوحدة الثانية ($1\\text{ ms} = 10^{-3}\\text{ s}$).`,
				`في المحول المثالي $\\frac{U_2}{U_1} = \\frac{N_2}{N_1}$.`
			],
			solutionStepsAr: [
				`قراءة $U_{2\\max} = ${u2Max}\\text{ V}$ واستنتاج $U_{2\\text{eff}} = ${u2Eff}\\text{ V}$، و $T = ${periodMs}\\text{ ms}$، $f = ${freqHz}\\text{ Hz}$.`,
				`نسبة التحويل $m \\approx ${ratioM}$ (خافض للتوتر) و $N_2 \\approx ${n2}$ لفة.`,
				`دور جسر غريتس (تقويم ثنائي النوبة بتواتر $${rectFreq}\\text{ Hz}$) والمكثفة (ترشيح التوتر).`
			],
			finalAnswer: `U_{2\\text{eff}} = ${u2Eff}\\text{ V}\\quad ;\\quad f = ${freqHz}\\text{ Hz}\\quad ;\\quad f' = ${rectFreq}\\text{ Hz}`
		};
	}
};

// ============================================================================
// 2AS TM Exclusive Integration (T2): Induction + Transformer + Rectification (6 pts)
// ============================================================================

export const tpl2asTmT2IntegrationInductionAcSystem: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t2_integration_induction_ac_system',
	grade: '2as_tm',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'مسألة إدماجية (2AS TM): التحريض الكهرومغناطيسي، المحول، وسلسلة التحويل AC/DC',
	curriculumLessonId: 'phy_lesson_2as_tm_t2_ac_dc_rectification',
	defaultPoints: 6,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Part 1: Faraday induction
		const deltaPhi = rng.pick([0.08, 0.12, 0.16]);
		const dtS = 0.04;
		const eInd = roundTo(deltaPhi / dtS, 2);
		// Part 2: Ideal transformer + AC/DC power supply
		const u1 = 220;
		const u2 = rng.pick([11, 22]);
		const mRatio = roundTo(u2 / u1, 3);
		const rLoad = rng.pick([10, 20]);
		const i2 = roundTo(u2 / rLoad, 3);
		const i1 = roundTo(mRatio * i2, 4);
		const u2Max = roundTo(u2 * Math.SQRT2, 2);

		const mcq = buildUniqueMcqOptions(
			`$|e| = ${eInd}\\text{ V}\\quad ;\\quad U_{2\\max} = ${u2Max}\\text{ V}$`,
			[
				{
					text: `$|e| = ${eInd}\\text{ V}\\quad ;\\quad U_{2\\max} = ${u2}\\text{ V}$`,
					diagnosticFeedback: 'U2 المعطاة على المحول هي القيمة المنتجة U2eff، أما القيمة العظمى فهي U2max = U2·√2.'
				},
				{
					text: `$|e| = ${roundTo(deltaPhi * dtS, 4)}\\text{ V}\\quad ;\\quad U_{2\\max} = ${u2Max}\\text{ V}$`,
					diagnosticFeedback: 'قانون فاراداي هو e = -ΔΦ/Δt وليس جداءهما.'
				},
				{
					text: `$|e| = ${roundTo(eInd * 2, 2)}\\text{ V}\\quad ;\\quad U_{2\\max} = ${roundTo(u2 / Math.SQRT2, 2)}\\text{ V}$`,
					diagnosticFeedback: 'راجع قانون فاراداي والعلاقة بين Umax و Ueff.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) (التحريض الكهرومغناطيسي): يتغير التدفق المغناطيسي عبر وشيعة بمقدار $Delta Phi = -${deltaPhi}" Wb"$ خلال $Delta t = ${dtS}" s"$. احسب القوة المحركة التحريضية المتوسطة $e$، واذكر سبب استخدام التيار المتناوب في المحولات الكهربائية.`,
				answer: `1) التحريض ومبدأ المحول:\n- $e = -frac(Delta Phi, Delta t) = -frac(-${deltaPhi}, ${dtS}) = +${eInd}" V"$.\n- يعمل المحول بالتيار المتناوب فقط لأن تغير شدة التيار الأولي يولد تغيراً مستمراً في التدفق المغناطيسي عبر النواة الحديدية، مما يحرض توتراً متناوباً في الثانوي.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) (المحول المثالي): يخفض محول مثالي التوتر المنتج من $U_1 = ${u1}" V"$ إلى $U_2 = ${u2}" V"$. يُغذي ثانويه حملاً أومياً مقاومته $R = ${rLoad}\\,Omega$. احسب نسبة التحويل $m$، شدتي التيار المنتجتين $I_2$ و $I_1$، والتوتر الأعظمي الثانوي $U_"2max"$.`,
				answer: `2) حسابات المحول:\n- $m = frac(U_2, U_1) = frac(${u2}, ${u1}) = ${mRatio}$.\n- $I_2 = frac(U_2, R) = frac(${u2}, ${rLoad}) = ${i2}" A"$.\n- $I_1 = m dot I_2 = ${mRatio} times ${i2} = ${i1}" A"$.\n- $U_"2max" = U_2 sqrt(2) = ${u2} sqrt(2) approx ${u2Max}" V"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) (التقويم والترشيح): نركب بعد الثانوي جسر غريتس ومكثفة ترشيح للحصول على توتر مستمر. ارسم وصفاً خطياً لمراحل تحويل التوتر (محول $arrow.r$ مقوم $arrow.r$ مرشح) وحدد القيمة التقريبية للتوتر المستمر الناتج عند التفريغ الضعيف.`,
				answer: `3) سلسلة التحويل $"AC" arrow.r "DC"$:\n- المرحلة 1: محول خافض ($${u1}" V" arrow.r ${u2}" V"$).\n- المرحلة 2: جسر تقويم ثنائي النوبة ($4$ صمامات ثنائية).\n- المرحلة 3: مكثفة ترشيح على التفرع تُعطي توتراً مستمراً قريباً من $U_"2max" approx ${u2Max}" V"$.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في سلسلة تغذية كهربائية: (1) يتناقص التدفق عبر وشيعة بمقدار $\\Delta\\Phi = -${deltaPhi}\\text{ Wb}$ خلال $\\Delta t = ${dtS}\\text{ s}$. (2) يُعطي محول مثالي توتراً ثانوياً منتجاً $U_2 = ${u2}\\text{ V}$.\nما هما القوة المحركة التحريضية $|e|$ والتوتر الأعظمي الثانوي $U_{2\\max}$؟`,
				questionTextAr: 'احسب $|e|$ و $U_{2\\max}$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بقانون فاراداي $|e| = \\frac{${deltaPhi}}{${dtS}} = ${eInd}\\text{ V}$، والتوتر الأعظمي $U_{2\\max} = U_2\\sqrt{2} = ${u2}\\sqrt{2} \\approx ${u2Max}\\text{ V}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية (التحريض والمحول والتقويم - 2AS TM)',
				instruction: 'ندرس مبدأ التحريض الكهرومغناطيسي في تغذية محول مثالي وتحويل توتره المتناوب إلى توتر مستمر.',
				content
			},
			hints: [
				`تُحسب القوة المحركة التحريضية بقانون فاراداي: $e = -\\Delta\\Phi/\\Delta t$.`,
				`في المحول المثالي $U_1 I_1 = U_2 I_2$ و $U_{\\max} = U_{\\text{eff}}\\sqrt{2}$.`,
				`الترشيح بالمكثفة يثبت التوتر المقوم قريباً من القيمة العظمى $U_{2\\max}$.`
			],
			solutionStepsAr: [
				`حساب $|e| = ${eInd}\\text{ V}$ وتفسير اشتغال المحول بالتيار المتناوب.`,
				`حساب $m = ${mRatio}$، $I_2 = ${i2}\\text{ A}$، $I_1 = ${i1}\\text{ A}$، و $U_{2\\max} = ${u2Max}\\text{ V}$.`,
				`تحديد مراحل المحول ثم جسر غريتس ثم المكثفة.`
			],
			finalAnswer: `|e| = ${eInd}\\text{ V}\\quad ;\\quad m = ${mRatio}\\quad ;\\quad U_{2\\max} = ${u2Max}\\text{ V}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_TM_T2: PhysicsParameterizedTemplate[] = [
	adaptSharedTm(SHARED_TEMPLATES_2AS_T2[0], 'phy_lesson_2as_tm_t2_acid_base_redox_titration'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T2[1], 'phy_lesson_2as_tm_t2_acid_base_redox_titration'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T2[2], 'phy_lesson_2as_tm_t2_magnetic_field_laplace'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T2[3], 'phy_lesson_2as_tm_t2_magnetic_field_laplace'),
	tpl2asTmT2FaradayInduction,
	tpl2asTmT2AcTransformerRectification,
	adaptSharedTm(SHARED_TEMPLATES_2AS_T2[4], 'phy_lesson_2as_tm_t2_acid_base_redox_titration'),
	tpl2asTmT2IntegrationInductionAcSystem
];
