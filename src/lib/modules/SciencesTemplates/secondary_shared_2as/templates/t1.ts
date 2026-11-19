import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgCellUltrastructure,
	svgPhysiologyDiagram
} from '../../svg-sciences';

// ============================================================================
// 4 Shared Parameterized ONEC Templates — 2AS Trimester 1 (SE & MATH Core)
// ============================================================================

// [0] Recall (5 pts): Myotatic reflex & anatomical reflex arc
export const tpl2asSharedT1MyotaticReflexRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t1_myotatic_reflex_recall',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'nervous_regulation',
	titleAr: 'التنظيم العصبي: العناصر التشريحية للقوس الانعكاسية للمنعكس العضلي',
	curriculumLessonId: 'sci_lesson_2as_shared_t1_myotatic_reflex',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const reflex = rng.pick([
			{ name: 'الأخيلي', tendon: 'الوتر الأخيلي', ext: 'العضلة الساقية الخلفية (الباسطة)', flex: 'العضلة الساقية الأمامية (القابضة)' },
			{ name: 'الرضفي', tendon: 'الوتر الرضفي تحت الركبة', ext: 'العضلة الفخذية الأمامية (الباسطة)', flex: 'العضلة الفخذية الخلفية (القابضة)' }
		]);
		const delayMs = rng.pick(difficulty === 'easy' ? [20, 22] : [18, 21, 24]);

		const svg = svgPhysiologyDiagram('myotatic_reflex', {
			numbered: true,
			title: 'العناصر التشريحية المتدخلة في المنعكس العضلي'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t1_myotatic_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`العنصر (1) عصبون حسي بالجذر الخلفي ذي العقدة الشوكية، (2) عصبون محرك بالجذر الأمامي، (3) النخاع الشوكي (مركز انعكاسي)`,
			[
				{
					text: 'العنصر (1) عصبون حركي بالجذر الخلفي، والعنصر (2) عصبون حسي بالجذر الأمامي',
					diagnosticFeedback: 'الجذر الخلفي ذو العقدة الشوكية حسي جابذ، والجذر الأمامي حركي نابذ.'
				},
				{
					text: 'المركز العصبي (3) هو القشرة المخية التي تصدر حركة إرادية',
					diagnosticFeedback: 'المنعكس العضلي حركة لاإرادية مركزها النخاع الشوكي.'
				},
				{
					text: 'تتقلص العضلتان الباسطة والقابضة معاً في اللحظة نفسها عند ضرب الوتر',
					diagnosticFeedback: 'تعمل العضلتان بتضاد منسق: تقلص الباسطة الممددة يرافقه استرخاء القابضة المضادة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): رسم تخطيطي مرقّم للقوس الانعكاسية للمنعكس ${reflex.name}`,
				width: 350
			},
			{
				type: 'text',
				content: `1) تعرّف على البيانات المرقمة (1، 2، 3) في الوثيقة (1)، ثم حدّد دور كل عنصر وأثبت من خلالها أن للعضلة (${reflex.ext}) دوراً مزدوجاً في المنعكس ${reflex.name}.`,
				answer: `1) البيانات والأدوار:\n- (1): عصبون حسي جابذ يمر عبر الجذر الخلفي الحامل للعقدة الشوكية (ينقل الرسالة الحسية من المغزل العصبي العضلي نحو النخاع).\n- (2): عصبون محرك نابذ يمر عبر الجذر الأمامي (ينقل الأمر الحركي نحو الألياف العضلية المنفذة).\n- (3): النخاع الشوكي (المادة الرمادية — مركز عصبي انعكاسي يعالج الرسالة الحسية).\n- الدور المزدوج للعضلة: تعمل **كمستقبل حسي** (لوجود المغازل العصبية العضلية بداخلها التي تتنبه بالتمدد) و**كعضو منفذ** (تستجيب بالتقلص بعد زمن استجابة وجيز قدره $${delayMs}" ms"$).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تشرح فيه آلية حدوث المنعكس ${reflex.name} عند ضرب ${reflex.tendon} مبرزاً كيفية التنسيق بين ${reflex.ext} و${reflex.flex} للحفاظ على وضعية الجسم.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يحافظ الجسم على توازنه ووضعيته بفضل تقلصات لاإرادية دقيقة تُعرف بالمنعكسات العضلية. فما مسار الرسالة العصبية في المنعكس ${reflex.name} وكيف يتحقق التنسيق المتضاد بين العضلتين؟\n- العرض: يؤدي ضرب ${reflex.tendon} إلى تمدد مفاجئ لـ ${reflex.ext}، فتتنبه المغازل العصبية العضلية وتولّد رسائل عصبية حسية جابذة تنتقل عبر الألياف الحسية (الجذر الخلفي ذو العقدة الشوكية) نحو المادة الرمادية للنخاع الشوكي. هناك يتفرع العصبون الحسي إلى مسارين: فرع يتصل مباشرة بمشبك منبّه مع العصبون المحرك لـ ${reflex.ext} (منعكس أحادي المشبك سريع، زمنه $${delayMs}" ms"$ فقط) فتنتقل رسالة حركية عبر الجذر الأمامي تسبب تقلصها؛ وفرع ثانٍ ينبّه عصبوناً جامعاً مثبّطاً يثبط العصبون المحرك لـ ${reflex.flex} فتسترخي بالتزامن.\n- الخاتمة: يضمن المنعكس العضلي والتثبيط المتبادل للعضلات المتضادة استجابة سريعة ومنسّقة تحفظ توازن الجسم ومقويته العضلية.`,
				mark: '3.0'
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
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `تمثل الوثيقة (1) القوس الانعكاسية للمنعكس العضلي ${reflex.name} (زمن استجابته $${delayMs}\\text{ ms}$).\nما التسمية الصحيحة للعناصر المرقمة (1، 2، 3)؟`,
				questionTextAr: 'اختر البيانات الصحيحة للقوس الانعكاسية في الوثيقة (1):',
				imageUrl: svgUrl,
				imageCaption: 'القوس الانعكاسية للمنعكس العضلي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'يمر العصبون الحسي (1) عبر الجذر الخلفي ذي العقدة الشوكية نحو النخاع الشوكي (3)، ويعود العصبون المحرك (2) عبر الجذر الأمامي إلى نفس العضلة الممددة.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يسمح المنعكس العضلي ${reflex.name} بالحفاظ على وضعية الجسم وتوازنه دون تدخل إرادي. تمثل الوثيقة (1) البنية التشريحية المتدخلة في هذا المنعكس.`,
				content
			},
			hints: [
				'الجذر الذي يحمل انتفاخاً (العقدة الشوكية) هو دوماً الجذر الخلفي الحسي.',
				'تذكّر أن المنعكس العضلي أحادي المشبك بالنسبة للعضلة الممددة وثنائي المشبك (بوجود عصبون جامع مثبط) للمضادة.',
				'نظّم النص العلمي بمقدمة + إشكالية، عرض متسلسل للمسارين المنبه والمثبط، وخاتمة.'
			],
			solutionStepsAr: [
				'تحديد العناصر الثلاثة (حسي في الجذر الخلفي، حركي في الأمامي، النخاع الشوكي).',
				'إبراز الدور المزدوج للعضلة كمستقبل (مغازل عصبية عضلية) ومنفذ.',
				'تحرير النص العلمي المهيكل حول المسارين المنبه والمثبط للعضلات المتضادة.'
			],
			finalAnswer: '1: عصبون حسي (خلفي) | 2: عصبون محرك (أمامي) | 3: النخاع الشوكي'
		};
	}
};

// [1] Reasoning (7 pts): Chemical synapse, PPSE/PPSI & neural integration
export const tpl2asSharedT1SynapseIntegrationReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t1_synapse_integration_reasoning',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'nervous_regulation',
	titleAr: 'الاستدلال العلمي: النقل المشبكي الكيميائي والإدماج العصبي في العصبون المحرك',
	curriculumLessonId: 'sci_lesson_2as_shared_t1_synapse_integration',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vRest = -70;
		const vThresh = -55;
		const ppse1 = rng.pick(difficulty === 'easy' ? [10, 12] : [9, 11, 12]);
		const ppse2 = rng.pick(difficulty === 'easy' ? [8, 10] : [8, 10, 11]);
		const ppsi = rng.pick([-8, -10, -12]);
		const sumExc = vRest + ppse1 + ppse2; // >= -55 => AP!
		const sumAll = vRest + ppse1 + ppse2 + ppsi; // check vs -55
		const firesAll = sumAll >= vThresh;

		const svgSyn = svgCellUltrastructure('synapse', {
			numbered: true,
			title: 'فوق بنية المشبك الكيميائي (الوثيقة 1)'
		});
		const svgSynUrl = saveSciencesSvgAsset(`sci_2as_shared_t1_synapse_s${seed}_${difficulty}`, svgSyn);

		const svgPlot = svgBioCurvePlot({
			xMin: 0,
			xMax: 10,
			yMin: -85,
			yMax: 45,
			xStep: 2,
			yStep: 20,
			xLabel: 't (ms)',
			yLabel: 'Vm (mV)',
			title: 'تسجيلات الكمون الغشائي للعصبون المحرك أثناء الإدماج العصبي',
			dashedGuides: [
				{ x1: 0, y1: vRest, x2: 10, y2: vRest, color: '#64748b', label: 'كمون الراحة' },
				{ x1: 0, y1: vThresh, x2: 10, y2: vThresh, color: '#dc2626', label: 'عتبة العمل' }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 1.5) return vRest;
						if (t < 3.5) return vRest + ppse1 * Math.exp(-Math.pow((t - 2.5) / 0.5, 2));
						if (t < 5.5) return vRest;
						if (t < 6.8) return vRest + 102 * Math.exp(-Math.pow((t - 6.2) / 0.24, 2));
						return vRest;
					},
					color: '#1d4ed8',
					label: 'تنبيه منفرد ثم متزامن'
				},
				{
					fn: (t) => vRest + ppsi * Math.exp(-Math.pow((t - 2.5) / 0.55, 2)),
					color: '#0f766e',
					dashed: true,
					label: 'مشبك مثبط'
				}
			],
			points: [
				{ x: 2.5, y: vRest + ppse1, label: 'PPSE', color: '#1d4ed8' },
				{ x: 2.5, y: vRest + ppsi, label: 'PPSI', color: '#0f766e' },
				{ x: 6.2, y: 32, label: 'كمون عمل', color: '#dc2626' }
			]
		});
		const svgPlotUrl = saveSciencesSvgAsset(`sci_2as_shared_t1_integration_s${seed}_${difficulty}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			firesAll
				? `محصلة التجميع الفضائي $V_m = ${sumAll}\\text{ mV} \\ge -55\\text{ mV}$ فيتولد كمون عمل وينتشر في المحور المحرك`
				: `محصلة التجميع الفضائي $V_m = ${sumAll}\\text{ mV} < -55\\text{ mV}$ (دون العتبة) فلا يتولد كمون عمل`,
			[
				{
					text: firesAll
						? `لا يتولد كمون عمل لأن وجود مشبك مثبط واحد يلغي كل المشابك المنبهة تلقائياً`
						: `يتولد كمون عمل حتماً لأن مجموع الـ PPSE وحده يبلغ $${sumExc}\\text{ mV}$ بغض النظر عن المثبط`,
					diagnosticFeedback: 'العصبون المحرك يجري جمعاً جبرياً يشمل جميع الكمونات المنبهة (+) والمثبطة (−) معاً.'
				},
				{
					text: `تصل المحصلة إلى $${vRest - ppse1 - ppse2}\\text{ mV}$ (فرط استقطاب شديد)`,
					diagnosticFeedback: 'كمونات PPSE موجبة (زوال استقطاب) فتُضاف إلى كمون الراحة −70 mV ولا تُطرح.'
				},
				{
					text: 'ينتقل كمون العمل من الخلية بعد المشبكية نحو الخلية قبل المشبكية عبر الحويصلات',
					diagnosticFeedback: 'النقل المشبكي الكيميائي أحادي الاتجاه (من قبل المشبكي إلى بعد المشبكي فقط).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.0 نقاط): تمثل الوثيقة (1) فوق بنية منطقة التماس بين عصبونين في المادة الرمادية للنخاع الشوكي.`
			},
			{
				type: 'image',
				src: svgSynUrl,
				caption: 'الوثيقة (1): رسم تخطيطي مرقّم للمشبك الكيميائي',
				width: 350
			},
			{
				type: 'text',
				content: `1) تعرّف على البيانات المرقمة (1، 3، 4، 5، 6) في الوثيقة (1)، ثم بيّن كيف تضمن هذه البنية انتقال الرسالة العصبية في اتجاه واحد فقط.`,
				answer: `1) البيانات والاتجاه الوحيد:\n- البيانات: 1: حويصلات مشبكية (تحتوي المبلغ العصبي) | 3: مستقبلات قنوية غشائية نوعية | 4: نهاية محورية قبل مشبكية | 5: شق مشبكي ومبلغ عصبي محرر | 6: خلية بعد مشبكية.\n- سبب الاتجاه الواحد: وجود الحويصلات المشبكية حصراً في النهاية قبل المشبكية ووجود المستقبلات النوعية حصراً على الغشاء بعد المشبكي يفرض انتقال الرسالة من (4) إلى (6) فقط.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) صف تغيّر نمط تشفير الرسالة العصبية عند عبورها هذا المشبك.`,
				answer: `2) تغير التشفير: تُشفَّر الرسالة على طول الليف قبل المشبكي **كهربائياً** (بتواتر كمونات العمل)، فتُحوَّل على مستوى الشق المشبكي إلى تشفير **كيميائي** (تركيز المبلغ العصبي المحرر)، ثم تعود إلى تشفير **كهربائي** في الخلية بعد المشبكية (سعة كمون بعد مشبكي ثم تواتر كمونات عمل عند بلوغ العتبة).`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (4.0 نقاط): يتلقى عصبون محرك (كمون راحته $V_r = -70" mV"$ وعتبة توليد كمون العمل $-55" mV"$) نهايات ثلاث مشابك: مشبكين منبهين $S_1$ ($+${ppse1}" mV"$) و $S_2$ ($+${ppse2}" mV"$) ومشبكاً مثبطاً $S_3$ ($${ppsi}" mV"$). تُبيّن الوثيقة (2) التسجيلات المحصل عليها.`
			},
			{
				type: 'image',
				src: svgPlotUrl,
				caption: 'الوثيقة (2): تسجيلات الكمون الغشائي للعصبون المحرك عند تنبيه مشابك مختلفة',
				width: 350
			},
			{
				type: 'text',
				content: `1) حلّل التسجيلين عند $t = 2.5" ms"$ (تنبيه $S_1$ منفرداً وتنبيه $S_3$ منفرداً) وعند $t = 6.2" ms"$ (تنبيه $S_1 + S_2$ معاً)، محدّداً طبيعة كل كمون مسجل.`,
				answer: `1) تحليل التسجيلات:\n- تنبيه $S_1$ وحده: سُجّل زوال استقطاب ضعيف ($-70 + ${ppse1} = ${vRest + ppse1}" mV"$) دون العتبة ← **كمون بعد مشبكي تنبيهي (PPSE)** غير كافٍ لتوليد كمون عمل.\n- تنبيه $S_3$ وحده: سُجّل فرط استقطاب ($-70 ${ppsi} = ${vRest + ppsi}" mV"$) ← **كمون بعد مشبكي تثبيطي (PPSI)** يُبعد الغشاء عن العتبة.\n- تنبيه $S_1 + S_2$ معاً في آنٍ واحد: أجرى العصبون **تجميعاً فضائياً** ($-70 + ${ppse1} + ${ppse2} = ${sumExc}" mV" >= -55" mV"$), فبلغت المحصلة العتبة وتولّد **كمون عمل** ($+32" mV"$).`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) تنبّأ بالاستجابة الكهربائية للعصبون المحرك عند تنبيه المشابك الثلاثة معاً ($S_1 + S_2 + S_3$) في اللحظة نفسها مع التعليل الحسابي، واستنتج الوظيفة الإدماجية للعصبون المحرك.`,
				answer: `2) التنبؤ والاستنتاج:\n- المحصلة الجبرية للتجميع الفضائي: $V_m = -70 + (${ppse1}) + (${ppse2}) + (${ppsi}) = ${sumAll}" mV"$.\n- ${firesAll ? `بما أن $${sumAll}" mV" >= -55" mV"$ (بلغ أو تجاوز العتبة)، **يتولّد كمون عمل** وينتشر نحو العضلة.` : `بما أن $${sumAll}" mV" < -55" mV"$ (دون عتبة زوال الاستقطاب)، **لا يتولّد كمون عمل** ويبقى العصبون في راحة (تم كبح الاستجابة بفضل $S_3$).`}\n- الاستنتاج: يمتلك العصبون المحرك **خصائص إدماجية** تمكّنه من الجمع الجبري (الفضائي والزمني) لجميع الرسائل المنبهة والمثبطة لاتخاذ قرار التقلص أو الاسترخاء.`,
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `يتلقى عصبون محرك (كمون راحته $-70\\text{ mV}$ وعتبته $-55\\text{ mV}$) في اللحظة نفسها رسالتين منبهتين ($+${ppse1}\\text{ mV}$ و $+${ppse2}\\text{ mV}$) ورسالة مثبطة ($${ppsi}\\text{ mV}$).\nما نتيجة الإدماج العصبي الفضائي؟`,
				questionTextAr: 'احسب المحصلة الجبرية وحدّد هل يتولد كمون عمل أم لا:',
				imageUrl: svgPlotUrl,
				imageCaption: 'تسجيلات الإدماج العصبي في العصبون المحرك',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب المحصلة الجبرية: $V_m = -70 + ${ppse1} + ${ppse2} ${ppsi} = ${sumAll}\\text{ mV}$، وهو ${firesAll ? 'أكبر أو يساوي' : 'أصغر من'} العتبة ($-55\\text{ mV}$)، لذا ${firesAll ? 'يتولد كمون عمل' : 'لا يتولد كمون عمل'}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يخضع العصبون المحرك في النخاع الشوكي إلى شبكة معقدة من المشابك المنبهة والمثبطة التي تنسّق تقلص واسترخاء العضلات المتضادة. ندرس آلية النقل المشبكي والإدماج العصبي عبر الوثيقتين (1) و (2).`,
				content
			},
			hints: [
				'المشبك المنبه يرفع الكمون نحو العتبة (+)، والمشبك المثبط يخفضه تحت كمون الراحة (−).',
				`احسب بدقة: $-70 + ${ppse1} + ${ppse2} + (${ppsi})$ وقارن الناتج مع العتبة $-55\\text{ mV}$.`,
				'لا تنس ذكر انتقال التشفير: كهربائي ← كيميائي ← كهربائي.'
			],
			solutionStepsAr: [
				'التعرف على عناصر المشبك الكيميائي وتبرير الانتقال أحادي الاتجاه وتغير التشفير.',
				'تحليل PPSE و PPSI والتجميع الفضائي المنبه.',
				`حساب المحصلة $V_m = ${sumAll}\\text{ mV}$ ومقارنتها مع العتبة $-55\\text{ mV}$.`
			],
			finalAnswer: `V_m = ${sumAll}\\text{ mV} \\; (${firesAll ? '\\text{توليد كمون عمل}' : '\\text{عدم توليد كمون عمل}'})`
		};
	}
};

// [2] Reasoning (7 pts): Postprandial glycemia, insulin/glucagon curves & hepatic portal vein table
export const tpl2asSharedT1GlycemiaInsulinReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t1_glycemia_insulin_reasoning',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'hormonal_regulation',
	titleAr: 'الاستدلال العلمي: تحليل منحنيات تحلون الدم والأنسولين والغلوكاغون ودور الكبد',
	curriculumLessonId: 'sci_lesson_2as_shared_t1_glycemia_hormones',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const peakGlyc = rng.pick(difficulty === 'easy' ? [1.6, 1.7] : [1.55, 1.65, 1.75]);
		const portalMeal = rng.pick([2.1, 2.3, 2.5]);
		const hepaticMeal = roundTo(rng.pick([1.05, 1.1, 1.15]), 2);
		const portalFast = roundTo(rng.pick([0.7, 0.75, 0.8]), 2);
		const hepaticFast = roundTo(rng.pick([0.98, 1.0, 1.04]), 2);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 5,
			yMin: 0,
			yMax: 2.2,
			xStep: 1,
			yStep: 0.4,
			xLabel: 't (h)',
			yLabel: 'C (u.a)',
			title: 'تطور تحلون الدم والأنسولين والغلوكاغون بعد تناول وجبة سكرية',
			eventArrows: [{ x: 0.5, label: 'تناول وجبة', color: '#dc2626' }],
			dashedGuides: [
				{ x1: 0, y1: 1.0, x2: 5, y2: 1.0, color: '#15803d', label: 'المرجع 1 g/L' }
			],
			curves: [
				{
					fn: (t) =>
						t < 0.5
							? 0.95
							: 0.95 + (peakGlyc - 0.95) * ((t - 0.5) / 1.0) * Math.exp(1 - (t - 0.5) / 1.0),
					color: '#dc2626',
					label: 'تحلون الدم'
				},
				{
					fn: (t) =>
						t < 0.7
							? 0.35
							: 0.35 + 1.25 * ((t - 0.7) / 1.1) * Math.exp(1 - (t - 0.7) / 1.1),
					color: '#2563eb',
					dashed: true,
					label: 'الأنسولين'
				},
				{
					fn: (t) =>
						t < 0.6
							? 0.9
							: Math.max(0.25, 0.9 - 0.65 * ((t - 0.6) / 1.2) * Math.exp(1 - (t - 0.6) / 1.2)),
					color: '#d97706',
					label: 'الغلوكاغون'
				}
			],
			points: [
				{ x: 1.5, y: peakGlyc, label: `${peakGlyc} g/L`, color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t1_glycemia_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يرتفع الأنسولين وينخفض الغلوكاغون عند الإفراط السكري ($${peakGlyc}\\text{ g/L}$)، فيخزن الكبد الفائض ($${portalMeal} \\rightarrow ${hepaticMeal}\\text{ g/L}$) كغليكوجين`,
			[
				{
					text: 'يرتفع كل من الأنسولين والغلوكاغون معاً بعد تناول وجبة سكرية',
					diagnosticFeedback: 'يعمل الهرمونان بتضاد: ارتفاع تحلون الدم ينشط خلايا β (الأنسولين) ويثبط خلايا α (الغلوكاغون).'
				},
				{
					text: `أثناء الصيام يخزّن الكبد السكر فينخفض تركيزه من $${portalFast}$ إلى $${hepaticFast}\\text{ g/L}$`,
					diagnosticFeedback: `أثناء الصيام ارتفع السكر من ${portalFast} إلى ${hepaticFast} g/L أي أن الكبد حرّر الغلوكوز في الدم.`
				},
				{
					text: 'تفرز خلايا α المركزية الأنسولين لتفكيك الغليكوجين الكبدي',
					diagnosticFeedback: 'الأنسولين تفرزه الخلايا β المركزية وينشط تركيب الغليكوجين وليس تفكيكه.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): تمثل الوثيقة (1) نتائج معايرة كل من تحلون الدم وهرموني الأنسولين والغلوكاغون عند شخص سليم بعد تناوله وجبة غنية بالسكريات عند $t = 0.5" h"$.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): التغيرات المتزامنة لتحلون الدم والأنسولين والغلوكاغون بعد وجبة غذائية',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيات الثلاثة في الوثيقة (1) مبرزاً العلاقة التنظيمية بين تحلون الدم وكل من الأنسولين والغلوكاغون.`,
				answer: `1) التحليل:\n- قبل الوجبة: تحلون الدم ثابت قرب القيمة المرجعية ($0.95" g/L"$), ومستوى الأنسولين منخفض بينما الغلوكاغون معتدل.\n- بعد الوجبة ($0.5-1.5" h"$): يرتفع تحلون الدم إلى ذروة $${peakGlyc}" g/L"$ (إفراط سكري عابر)؛ يستجيب البنكرياس مباشرة بـ **ارتفاع حاد في إفراز الأنسولين** وبـ **انخفاض حاد في إفراز الغلوكاغون**.\n- من $1.5$ إلى $4.5" h"$: ينخفض تحلون الدم تدريجياً ليعود نحو $1" g/L"$ فيتراجع إفراز الأنسولين ويعود الغلوكاغون للارتفاع تدريجياً.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حدّد الخلايا البنكرياسية المفرزة لكل هرمون، واستنتج نمط عملهما في ضبط تحلون الدم.`,
				answer: `2) الخلايا والاستنتاج:\n- الأنسولين: تفرزه **الخلايا $beta$ المركزية** في جزر لانغرهانس (هرمون مخفض لتحلون الدم).\n- الغلوكاغون: تفرزه **الخلايا $alpha$ المحيطية** في جزر لانغرهانس (هرمون رافع لتحلون الدم).\n- الاستنتاج: يعمل الأنسولين والغلوكاغون **بشكل متضاد ومتكامل** للحفاظ على ثبات تحلون الدم حول $1" g/L"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): لإبراز دور الكبد كعضو منفذ رئيسي في التنظيم الهرموني، قيس تركيز الغلوكوز في الدم الداخل إلى الكبد (الوريد البابي الكبدي) والخارج منه (الوريد فوق الكبدي) في حالتين (الجدول أدناه):`
			},
			{
				type: 'table',
				headers: ['الحالة الفيزيولوجية', 'الوريد البابي الكبدي (الداخل)', 'الوريد فوق الكبدي (الخارج)'],
				cells: [],
				rows: [
					['بعد وجبة غنية بالسكريات', `${portalMeal} g/L`, `${hepaticMeal} g/L`],
					['بعد فترة صيام (16 ساعة)', `${portalFast} g/L`, `${hepaticFast} g/L`]
				]
			},
			{
				type: 'text',
				content: `1) قارن تركيز الغلوكوز بين الدم الداخل والخارج من الكبد في الحالتين، واحسب الفارق (المخزَّن أو المحرَّر) في كل لتر دم يمر بالكبد.`,
				answer: `1) المقارنة والحساب:\n- بعد الوجبة: تركيز الغلوكوز في الوريد فوق الكبدي ($${hepaticMeal}" g/L"$) أقل بكثير منه في الوريد البابي ($${portalMeal}" g/L"$), إذ **احتجز الكبد $${roundTo(portalMeal - hepaticMeal, 2)}" g/L"$** من الغلوكوز.\n- أثناء الصيام: تركيز الغلوكوز في الوريد فوق الكبدي ($${hepaticFast}" g/L"$) أعلى منه في الوريد البابي ($${portalFast}" g/L"$), إذ **حرّر الكبد $${roundTo(hepaticFast - portalFast, 2)}" g/L"$** من الغلوكوز في الدم.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) فسّر آلية تدخل الكبد في كل حالة بربطها بالهرمون البنكرياسي الموافق وبالتحولات الكيميائية للغليكوجين.`,
				answer: `2) التفسير الفيزيولوجي:\n- بعد الوجبة: يرتفع **الأنسولين** فيحفّز خلايا الكبد على امتصاص الغلوكوز الفائض وتكثيفه (بلمرته) إلى **غليكوجين كبدي**، فيخرج الدم بقيمة قريبة من $1" g/L"$.\n- أثناء الصيام: يرتفع **الغلوكاغون** فيحفّز خلايا الكبد على **إماهة الغليكوجين الكبدي** إلى غلوكوز يُحرر في الدم عبر الوريد فوق الكبدي لتصحيح القصور السكري.`,
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `بعد وجبة سكرية ارتفع تحلون الدم إلى $${peakGlyc}\\text{ g/L}$، وبلغ السكر في الوريد البابي $${portalMeal}\\text{ g/L}$ مقابل $${hepaticMeal}\\text{ g/L}$ في الوريد فوق الكبدي.\nما الاستنتاج الفيزيولوجي الصحيح؟`,
				questionTextAr: 'اختر التفسير الصحيح للوثيقة (1) والجدول:',
				imageUrl: svgUrl,
				imageCaption: 'تطور تحلون الدم والأنسولين والغلوكاغون',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يرتفع الأنسولين وينخفض الغلوكاغون بعد الوجبة، فيخزّن الكبد الفائض ($${roundTo(portalMeal - hepaticMeal, 2)}\\text{ g/L}$) كغليكوجين؛ وبالمقابل يحرّر $${roundTo(hepaticFast - portalFast, 2)}\\text{ g/L}$ أثناء الصيام بتأثير الغلوكاغون.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `رغم تناوب فترات التغذية والصيام، يبقى تحلون الدم ثابتاً حول $1" g/L"$. لدراسة التنسيق بين البنكرياس والكبد في هذا التنظيم ندرس الوثيقة (1) والجدول.`,
				content
			},
			hints: [
				'لاحظ التغير المتعاكس بين منحنى الأنسولين (صعود) ومنحنى الغلوكاغون (هبوط) بعد الوجبة.',
				'الوريد البابي يحمل الدم الآتي من المعي إلى الكبد، والوريد فوق الكبدي يحمل الدم الخارج من الكبد.',
				'اربط الأنسولين بـ «تركيب الغليكوجين» والغلوكاغون بـ «إماهة الغليكوجين الكبدي».'
			],
			solutionStepsAr: [
				`تحليل المنحنيات الثلاثة (ذروة $${peakGlyc}\\text{ g/L}$) والعمل المتضاد لخلايا $\\beta$ و $\\alpha$.`,
				`حساب الغلوكوز المخزَّن ($${roundTo(portalMeal - hepaticMeal, 2)}\\text{ g/L}$) والمحرَّر ($${roundTo(hepaticFast - portalFast, 2)}\\text{ g/L}$) في الكبد.`,
				'تفسير التحولات العكوسة بين الغلوكوز والغليكوجين الكبدي.'
			],
			finalAnswer: `\\text{تخزين } ${roundTo(portalMeal - hepaticMeal, 2)}\\text{ g/L} \\text{ (أنسولين)} \\; ;\\; \\text{تحرير } ${roundTo(hepaticFast - portalFast, 2)}\\text{ g/L} \\text{ (غلوكاغون)}`
		};
	}
};

// [3] Scientific Approach (8 pts): Diagnosing Type 1 vs Type 2 Diabetes via HGPO & Insulinemia
export const tpl2asSharedT1DiabetesApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t1_diabetes_approach',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'hormonal_regulation',
	titleAr: 'المسعى العلمي: تحديد سبب الإفراط السكري المزمن (نمطا الداء السكري 1 و 2)',
	curriculumLessonId: 'sci_lesson_2as_shared_t1_glycemia_loop_diabetes',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const peakHealthy = roundTo(rng.pick([1.45, 1.5]), 2);
		const peakP1 = roundTo(rng.pick(difficulty === 'easy' ? [2.6, 2.8] : [2.55, 2.75, 2.9]), 2);
		const peakP2 = roundTo(rng.pick(difficulty === 'easy' ? [2.3, 2.4] : [2.25, 2.4, 2.5]), 2);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 4,
			yMin: 0,
			yMax: 3.2,
			xStep: 1,
			yStep: 0.5,
			xLabel: 't (h)',
			yLabel: 'G (g/L)',
			title: 'اختبار تحمل الغلوكوز عند شخص سليم ومريضين (أ) و (ب)',
			eventArrows: [{ x: 0.2, label: 'تناول الغلوكوز', color: '#dc2626' }],
			dashedGuides: [
				{ x1: 0, y1: 1.0, x2: 4, y2: 1.0, color: '#15803d', label: 'المرجع 1 g/L' }
			],
			curves: [
				{
					fn: (t) => 0.92 + (peakHealthy - 0.92) * (t / 0.8) * Math.exp(1 - t / 0.8),
					color: '#16a34a',
					label: 'شخص سليم'
				},
				{
					fn: (t) => 1.7 + (peakP1 - 1.7) * (t / 1.4) * Math.exp(1 - t / 1.4) + 0.25 * (1 - Math.exp(-t)),
					color: '#dc2626',
					label: 'المريض (أ)'
				},
				{
					fn: (t) => 1.5 + (peakP2 - 1.5) * (t / 1.5) * Math.exp(1 - t / 1.5) + 0.18 * (1 - Math.exp(-t)),
					color: '#7c3aed',
					dashed: true,
					label: 'المريض (ب)'
				}
			],
			points: [
				{ x: 1.4, y: roundTo(peakP1 + 0.18, 2), label: 'إفراط شديد أ', color: '#dc2626' },
				{ x: 3.5, y: 1.02, label: 'تنظيم سليم', color: '#15803d' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t1_diabetes_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'المريض (أ) مصاب بالسكري نمط 1 (تخريب خلايا β وغياب الأنسولين) والمريض (ب) مصاب بالنمط 2 (وجود الأنسولين مع مقاومة الخلايا المستهدفة)',
			[
				{
					text: 'المريضان (أ) و (ب) كلاهما يعانيان من انعدام تام لإفراز الأنسولين',
					diagnosticFeedback: 'الجدول السريري يوضح أن المريض (ب) يفرز الأنسولين بتركيز مرتفع (88 mU/L)!'
				},
				{
					text: 'المريض (ب) يُعالج بنجاح فوري بحقن جرعة من هرمون الغلوكاغون',
					diagnosticFeedback: 'الغلوكاغون يرفع تحلون الدم ويفاقم الإفراط السكري، ولا يُعطى لعلاج السكري!'
				},
				{
					text: 'المريض (أ) لديه خلايا β سليمة لكن مستقبِلات الكبد معطّلة',
					diagnosticFeedback: 'المريض (أ) يفتقر للأنسولين (3 mU/L فقط) ويستجيب فوراً لحقنه، فمستقبِلاته سليمة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): أُخضع شخص سليم ومريضان (أ) و (ب) يشتكيان من عطش شديد وتعب مستمر لاختبار فرط السكر المحدث عن طريق الفم (تناول $75" g"$ غلوكوز)، ومُثّلت النتائج في الوثيقة (1).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تطور تحلون الدم بعد تناول 75 g غلوكوز عند السليم والمريضين (أ) و (ب)',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل منحنيات الوثيقة (1) وحدّد الحالة المرضية المشتركة بين المريضين (أ) و (ب)، ثم اطرح المشكل العلمي.`,
				answer: `1) التحليل والمشكل:\n- التحليل: عند السليم يبدأ تحلون الدم قرب $0.92" g/L"$، يرتفع قليلاً إلى $${peakHealthy}" g/L"$ ثم يعود سريعاً إلى $1" g/L"$. أما عند المريضين (أ) و (ب) فيبدأ مرتفعاً صائماً ($> 1.4" g/L"$), ويقفز إلى قيم عالية جداً ($> ${peakP2}" g/L"$) ويبقى مرتفعاً طوال $4$ ساعات.\n- الحالة المشتركة: **إفراط سكري مزمن (الداء السكري)**.\n- المشكل العلمي: ما سبب فشل حلقة التنظيم الذاتي لتحلون الدم عند كل من المريضين (أ) و (ب)؟`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) بالاستناد إلى عناصر حلقة التنظيم الذاتي لتحلون الدم، اقترح فرضيتين تفسّران سبب الإفراط السكري عند مريض بالسكري.`,
				answer: `2) الفرضيتان:\n- الفرضية 1 (خلل في اللواقط المفرزة): عجز أو تخريب خلايا $beta$ في جزر لانغرهانس مما يمنع إفراز هرمون الأنسولين.\n- الفرضية 2 (خلل في الأعضاء المنفذة): سلامة إفراز الأنسولين لكن عدم استجابة الخلايا المستهدفة له (مقاومة الأنسولين).`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين وتحديد نمط السكري بدقة لكل مريض، أُجريت الفحوصات المخبرية والسريرية الموضحة في الجدول:`
			},
			{
				type: 'table',
				headers: ['المؤشر المخبري / السريري', 'الشخص السليم', 'المريض (أ)', 'المريض (ب)'],
				cells: [],
				rows: [
					['تركيز الأنسولين بعد الوجبة (mU/L)', '62', '3 (شبه منعدم)', '88 (مرتفع)'],
					['حالة جزر لانغرهانس (خلايا β)', 'سليمة وكثيفة', 'مخرّبة مناعياً', 'سليمة ونشطة'],
					['الاستجابة لحقن الأنسولين', 'انخفاض سريع للسكر', 'انخفاض طبيعي للسكر', 'استجابة ضعيفة جداً']
				]
			},
			{
				type: 'text',
				content: `1) استغل معطيات الجدول للمصادقة على الفرضية المناسبة لكل من المريض (أ) والمريض (ب)، مع تسمية نمط الداء السكري لكل منهما.`,
				answer: `1) استغلال الجدول والمصادقة:\n- **المريض (أ)**: يعاني من تخريب خلايا $beta$ وانعدام شبه تام للأنسولين ($3" mU/L"$), لكن خلاياه المستهدفة سليمة وتستجيب لحقن الأنسولين ← **تصح الفرضية (1)** وهو مصاب بـ **الداء السكري من النمط 1**.\n- **المريض (ب)**: خلاياه $beta$ سليمة وتفرز الأنسولين بغزارة ($88" mU/L"$), لكن خلاياه المستهدفة لا تستجيب حتى للحقن ← **تصح الفرضية (2)** وهو مصاب بـ **الداء السكري من النمط 2 (مقاومة الأنسولين)**.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اقترح البروتوكول العلاجي المناسب لكل مريض مع التعليل الفيزيولوجي.`,
				answer: `2) البروتوكول العلاجي:\n- للمريض (أ) (نمط 1): **حقن يومي منتظم بالأنسولين** لتعويض الغياب الهرموني مع مراقبة تحلون الدم وحمية متوازنة.\n- للمريض (ب) (نمط 2): **حمية غذائية منخفضة السكريات وممارسة النشاط البدني** لخفض السمنة ورفع حساسية المستقبلات للأنسولين، مع أدوية فموية مخفضة للسكر عند اللزوم.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً لحلقة التنظيم الذاتي لتحلون الدم في حالة الإفراط السكري، محدّداً عليه بمؤشر واضح موقع الخلل عند المريض (أ) وموقع الخلل عند المريض (ب).`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[اضطراب: إفراط سكري $> 1" g/L"$] $arrow.r$ [لواقط حساسة: خلايا $beta$ البنكرياسية ← **(موقع خلل المريض أ: تخريب خلايا $beta$)**] $arrow.r$ [رسالة هرمونية: إفراز الأنسولين عبر الدم] $arrow.r$ [أعضاء منفذة: الكبد، العضلات، النسيج الدهني ← **(موقع خلل المريض ب: مقاومة الأنسولين)**] $arrow.r$ [تخزين الغلوكوز (غليكوجين + دسم)] $arrow.r$ [عودة تحلون الدم إلى $1" g/L"$].`,
				mark: '2.0'
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
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أظهر اختبار تحمل الغلوكوز إفراطاً سكرياً مزمناً عند المريضين (أ: ذروة $${peakP1}\\text{ g/L}$ وأنسولين $3\\text{ mU/L}$ مع استجابة للحقن) و(ب: ذروة $${peakP2}\\text{ g/L}$ وأنسولين $88\\text{ mU/L}$ دون استجابة للحقن).\nما التشخيص العلمي الدقيق لكل منهما؟`,
				questionTextAr: 'اختر التشخيص المصادق عليه للمريضين (أ) و (ب):',
				imageUrl: svgUrl,
				imageCaption: 'اختبار تحمل الغلوكوز عند السليم والمريضين',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'المريض (أ) يفتقر للأنسولين لتخريب خلايا $\\beta$ ويستجيب للحقن (سكري نمط 1)، بينما المريض (ب) يفرز أنسوليناً مرتفعاً دون استجابة خلاياه المستهدفة (سكري نمط 2).'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُعدّ الداء السكري اختلالاً في حلقة التنظيم الذاتي لتحلون الدم، غير أن أسبابه الفيزيولوجية تختلف من مريض لآخر. لتشخيص حالة مريضين (أ) و (ب) ندرس المعطيات السريرية التالية.`,
				content
			},
			hints: [
				'قارن قيمة تحلون الدم صائماً وعند الساعة 4 مع القيمة المرجعية $1\\text{ g/L}$.',
				'غياب الأنسولين + استجابة للحقن = نمط 1؛ وجود الأنسولين + ضعف استجابة = نمط 2.',
				'عيّن موقعي الخلل بدقة على مخطط حلقة التنظيم الذاتي.'
			],
			solutionStepsAr: [
				'تحليل منحنيات HGPO وطرح المشكل وفرضيتي الخلل البنكرياسي مقابل خلل الخلايا المستهدفة.',
				'تشخيص المريض (أ) بالنمط 1 والمريض (ب) بالنمط 2 وتحديد العلاج المناسب لكل منهما.',
				'بناء مخطط حلقة التنظيم الذاتي وتحديد موقعي الخلل عليه.'
			],
			finalAnswer: 'المريض (أ): سكري نمط 1 | المريض (ب): سكري نمط 2'
		};
	}
};

export const SHARED_SCIENCES_TEMPLATES_2AS_T1: SciencesParameterizedTemplate[] = [
	tpl2asSharedT1MyotaticReflexRecall,
	tpl2asSharedT1SynapseIntegrationReasoning,
	tpl2asSharedT1GlycemiaInsulinReasoning,
	tpl2asSharedT1DiabetesApproach
];
