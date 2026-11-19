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
	svgBioFlowchart,
	svgGeneticsDiagram,
	svgPhysiologyDiagram
} from '../../svg-sciences';

// ============================================================================
// 6 Parameterized ONEC Templates — 1AS TCST Trimester 3
// (2 recall 5 pts, 2 reasoning 7 pts, 2 scientific_approach 8 pts)
// ============================================================================

// 1. Recall (5 pts): Nervous control of cardiac rhythm
export const tpl1asTcstT3CardiacNervesRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_cardiac_nerves_recall',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'nervous_regulation',
	titleAr: 'وحدة العضوية: التحكم العصبي في الوتيرة القلبية',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_cardiac_respiratory_control',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const restBpm = rng.pick(difficulty === 'easy' ? [70, 72] : [68, 72, 75]);
		const effortBpm = rng.pick(difficulty === 'easy' ? [140, 150] : [136, 148, 160]);
		const svRest = 70;
		const svEffort = 100;
		const flowRest = roundTo((restBpm * svRest) / 1000, 2);
		const flowEffort = roundTo((effortBpm * svEffort) / 1000, 2);

		const svg = svgPhysiologyDiagram('cardiac_nerves', {
			title: 'العناصر التشريحية المتدخلة في التحكم العصبي في الوتيرة القلبية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_cardiac_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يرتفع التدفق القلبي من $${flowRest}\\text{ L/min}$ إلى $${flowEffort}\\text{ L/min}$ بتدخل البصلة السيسائية والعصب الودي المسرّع`,
			[
				{
					text: `تضبط الوتيرة القلبية بواسطة العصب قرب الودي المسرّع للقلب أثناء الجهد`,
					diagnosticFeedback: 'العصب قرب الودي مبطئ للقلب، أما العصب الودي فهو المسرّع.'
				},
				{
					text: `ينخفض التدفق القلبي إلى $${flowRest}\\text{ L/min}$ أثناء الجهد العضلي`,
					diagnosticFeedback: 'أثناء الجهد تزداد الوتيرة القلبية وحجم القذف فيرتفع التدفق القلبي بقوة.'
				},
				{
					text: 'يتوقف القلب تماماً عن النبض إذا قُطعت أعصابه الودية وقرب الودية',
					diagnosticFeedback: 'للقلب حركة ذاتية فيستمر في النبض تلقائياً، لكنه يفقد التكيف مع الجهد.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): رسم تخطيطي للتعصيب الإعاشي للقلب',
				width: 350
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الوثيقة (1)، حدّد دور كل من البصلة السيسائية، العصب قرب الودي، والعصب الودي في تنظيم الوتيرة القلبية، ثم احسب التدفق القلبي باللتر/دقيقة في حالة الراحة ($${restBpm}" bpm"$، حجم القذف $${svRest}" mL"$) وأثناء الجهد العضلي ($${effortBpm}" bpm"$، حجم القذف $${svEffort}" mL"$).`,
				answer: `1) الأدوار وحساب التدفق القلبي:\n- البصلة السيسائية: مركز عصبي إعاشي يضم المركز المبطئ للقلب والمركز التنفسي وينسق استجابة العضوية.\n- العصب قرب الودي (الرئوي المعدي): عصب مبطئ يمارس كبحاً مستمراً على النشاط الذاتي للقلب في الراحة.\n- العصب الودي: عصب مسرّع للوتيرة القلبية ينشط أثناء الجهد العضلي.\n- التدفق القلبي في الراحة: $D_1 = ${restBpm} times ${svRest} = ${restBpm * svRest}" mL/min" = ${flowRest}" L/min"$.\n- التدفق القلبي أثناء الجهد: $D_2 = ${effortBpm} times ${svEffort} = ${effortBpm * svEffort}" mL/min" = ${flowEffort}" L/min"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً توضح فيه كيف ينسّق الجهاز العصبي الإعاشي بين الوتيرتين القلبية والتنفسية لتلبية حاجات العضلات أثناء الجهد العضلي.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: أثناء الجهد العضلي يرتفع استهلاك العضلات للغلوكوز و $upright("O")_2$ مع زيادة طرح $upright("CO")_2$، فتستجيب العضوية بزيادة الوتيرتين القلبية والتنفسية. فكيف يتحكم الجهاز العصبي الإعاشي في هذا التنسيق؟\n- العرض: رغم امتلاك القلب نشاطاً ذاتياً، يخضع لتعصيب إعاشي مزدوج ومتضاد انطلاقاً من البصلة السيسائية والنخاع الشوكي. أثناء الجهد العضلي يتثبط المركز المبطئ (فيقل نشاط العصب قرب الودي) وينشط المركز المسرّع (فتصل رسائل عصبية عبر الأعصاب الودية إلى القلب)، مما يرفع الوتيرة القلبية والتدفق القلبي (من $${flowRest}$ إلى $${flowEffort}" L/min"$). بالتزامن، ينشط المركز التنفسي في البصلة السيسائية فترسل رسائل حركية نحو عضلات الحجاب الحاجز والقفص الصدري لزيادة الوتيرة التنفسية وتجديد هواء الأسناخ الرئوية.\n- الخاتمة: يضمن التكامل العصبي البصلي بين الوتيرتين القلبية والتنفسية إمداد العضلات بالدم الغني بـ $upright("O")_2$ والمغذيات وتحقيق وحدة العضوية.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `ترتفع الوتيرة القلبية لرياضي من $${restBpm}\\text{ bpm}$ (حجم القذف $${svRest}\\text{ mL}$) إلى $${effortBpm}\\text{ bpm}$ (حجم القذف $${svEffort}\\text{ mL}$) أثناء الجري.\nما قيمة التدفق القلبي في الحالتين وما العصب المسؤول عن التسارع؟`,
				questionTextAr: 'اختر الإجابة الصحيحة حول التدفق القلبي والتعصيب الإعاشي:',
				imageUrl: svgUrl,
				imageCaption: 'التعصيب الودي وقرب الودي للقلب',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التدفق في الراحة $${flowRest}\\text{ L/min}$ وأثناء الجهد $${flowEffort}\\text{ L/min}$، ويتم التسارع بتثبيط قرب الودي وتنشيط العصب الودي انطلاقاً من المراكز البصلية والنخاعية.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتطلب الاستجابة للجهد العضلي تنسيقاً دقيقاً بين وظائف القلب والرئتين بفضل تدخل الجهاز العصبي الإعاشي (الوثيقة 1).`,
				content
			},
			hints: [
				'التدفق القلبي (L/min) = (الوتيرة القلبية × حجم القذف بالـ mL) ÷ 1000.',
				'العصب قرب الودي = مبطئ؛ العصب الودي = مسرّع.',
				'اذكر في النص العلمي كلاً من المركز القلبي والمركز التنفسي في البصلة السيسائية.'
			],
			solutionStepsAr: [
				'تحديد دور البصلة السيسائية والعصبين قرب الودي والودي.',
				`حساب التدفق القلبي: $${flowRest}\\text{ L/min}$ في الراحة و $${flowEffort}\\text{ L/min}$ أثناء الجهد.`,
				'تحرير النص العلمي المهيكل حول التنسيق القلبي التنفسي.'
			],
			finalAnswer: `D_1 = ${flowRest}\\text{ L/min}\\quad ;\\quad D_2 = ${flowEffort}\\text{ L/min}`
		};
	}
};

// 2. Recall (5 pts): Hybridization & Punnett square in wheat/cattle
export const tpl1asTcstT3HybridizationRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_hybridization_recall',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'تحسين الإنتاج بالتهجين والانتقاء الاصطناعي عند القمح',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_hybridization_selection',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const totalF2 = rng.pick(difficulty === 'easy' ? [1600, 3200] : [1600, 2400, 4800]);
		const desiredPhenotype = Math.round((totalF2 * 3) / 16);
		const desiredPure = Math.round(totalF2 / 16);

		const svg = svgGeneticsDiagram('punnett_square', {
			title: 'مثال لجدول التضريب الوراثي لتوزع الأليلات في الجيل الثاني',
			punnett: { p1: ['G', 'g'], p2: ['G', 'g'] }
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_hybrid_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يحمل $${desiredPhenotype}$ نباتاً الصفتين المرغوبتين ($3/16$)، منها $${desiredPure}$ نباتاً فقط من سلالة نقية ($1/16$)`,
			[
				{
					text: `جميع أفراد $F_2$ ($${totalF2}$ نباتاً) نقية وتحمل الصفتين المرغوبتين`,
					diagnosticFeedback: 'الجيل الثاني F₂ غير متجانس وتظهر فيه 4 أنماط ظاهرية بنسب 9/16 و 3/16 و 3/16 و 1/16.'
				},
				{
					text: `نصف أفراد $F_2$ ($${totalF2 / 2}$ نباتاً) نقية وتحمل الصفتين المرغوبتين`,
					diagnosticFeedback: 'في تضريب ثنائي الهجونة لـ F₁ × F₁، نسبة النمط الجديد [سائد، متنحي] هي 3/16، والنقي منه 1/16 فقط.'
				},
				{
					text: `لا يظهر أي فرد نقي في الجيل الثاني $F_2$ إطلاقاً`,
					diagnosticFeedback: 'تظهر السلالة النقية المرغوبة بنسبة 1/16 (أي ' + desiredPure + ' نباتاً) وتُعزل بالانتقاء.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مبدأ التضريب الوراثي وتوزع الأليلات بين الأمشاج',
				width: 340
			},
			{
				type: 'text',
				content: `1) أُجري تهجين بين سلالتين نقيتين من القمح: سلالة (1) كثيرة الحب فقيرة المدخرات وسلالة (2) قليلة الحب غنية المدخرات، فأعطى الجيل الأول $F_1$ أفراداً متجانسة (قليلة الحب، غنية المدخرات). وبالتلقيح الذاتي لـ $F_1$ أُنتج $${totalF2}$ نباتاً في $F_2$. حدّد الأليلات السائدة والمتنحية، واحسب العدد النظري للنباتات ذات النمط الظاهري المرغوب [كثيرة الحب، غنية المدخرات] ($3/16$) وعدد النباتات النقية منها ($1/16$).`,
				answer: `1) تحديد السيادة والحساب:\n- الأليلان السائدان: (قليل الحب $B$) و(غني المدخرات $G$). الأليلان المتنحيان: (كثير الحب $b$) و(فقير المدخرات $g$).\n- عدد النباتات [كثيرة الحب، غنية المدخرات]: $frac(3, 16) times ${totalF2} = ${desiredPhenotype}$ نباتاً.\n- عدد النباتات **النقية** $(b//b, G//G)$ من بينها: $frac(1, 16) times ${totalF2} = ${desiredPure}$ نباتاً.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تشرح فيه خطوات التهجين الاصطناعي عند القمح ودور الانتقاء الاصطناعي التدريجي في عزل السلالة المرغوبة النقية.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: لرفع المردود الفلاحي، لا يكفي تحسين العوامل الخارجية بل يجب تحسين العوامل الوراثية للسلالات. فكيف يسمح التهجين والانتقاء الاصطناعي بالحصول على سلالة قمح نقية تجمع صفتين مرغوبتين؟\n- العرض: تُختار سلالتان نقيتان تحمل كل منهما صفة مرغوبة. يُجرى التهجين الاصطناعي بإخصاء أزهار السلالة الأولى (نزع الأسدية قبل النضج) ثم تأبيرها بحبوب طلع السلالة الثانية وتغليف السنابل لمنع التلقيح العشوائي. ينتج الجيل الأول $F_1$ المتجانس والهجين، وعند تركه للتلقيح الذاتي يحدث توزع مستقل للأليلات أثناء تشكل الأمشاج والتقاء عشوائي في الإلقاح، فتظهر في $F_2$ تراكيب وراثية جديدة من بينها النمط المرغوب بنسبة $3/16$ (منها $1/16$ فقط نقي). عندئذٍ يطبق الانتقاء الاصطناعي بعزل الأفراد المرغوبة وإجراء تلقيح ذاتي متكرر عبر أجيال مع استبعاد السلالات التي تعطي أفراداً غير مرغوبة، حتى تُثبت السلالة النقية $(b//b, G//G)$.\n- الخاتمة: يتيح التهجين استحداث تراكيب أليلية مرغوبة، ويسمح الانتقاء التدريجي بعزل السلالة النقية المستقرة وراثياً.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `في تضريب ثنائي الهجونة للقمح ($F_1 \\times F_1$) أُنتج $${totalF2}$ نباتاً في الجيل الثاني $F_2$. كم نباتاً يحمل النمط الظاهري المرغوب [كثير الحب متنحي، غني المدخرات سائد] وكم منها نقي تماماً؟`,
				questionTextAr: 'اختر الأعداد النظرية الصحيحة في الجيل الثاني $F_2$:',
				imageUrl: svgUrl,
				imageCaption: 'جدول التضريب الوراثي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `النسبة الظاهرية لـ [كثير الحب، غني المدخرات] هي $\\frac{3}{16} \\times ${totalF2} = ${desiredPhenotype}$ نباتاً، ومنها $\\frac{1}{16} \\times ${totalF2} = ${desiredPure}$ نباتاً نقياً متماثل اللواقح.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تمثل العوامل الوراثية (المورثات) رافعة أساسية لتحسين إنتاج الحبوب. يدرس هذا التمرين مبدأ التهجين والانتقاء الاصطناعي للحصول على سلالة قمح مرغوبة ونقية.`,
				content
			},
			hints: [
				'الصفة التي تظهر في 100% من أفراد F₁ هي الصفة السائدة.',
				`اضرب العدد الكلي $${totalF2}$ في $3/16$ للنمط الظاهري وفي $1/16$ للسلالة النقية.`,
				'اذكر في النص العلمي خطوات التهجين العملي: الإخصاء، التأبير الاصطناعي، والتغليف.'
			],
			solutionStepsAr: [
				'تحديد السيادة من تجانس الجيل الأول F₁.',
				`حساب $${desiredPhenotype}$ نباتاً مرغوباً ظاهرياً ومنها $${desiredPure}$ نقياً.`,
				'تحرير النص العلمي المهيكل لخطوات التهجين والانتقاء.'
			],
			finalAnswer: `${desiredPhenotype}\\text{ مرغوبة } (${desiredPure}\\text{ نقية})`
		};
	}
};

// 3. Reasoning (7 pts): Cardiac nerve stimulation & sectioning curve analysis
export const tpl1asTcstT3ExerciseCardiacReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_exercise_cardiac_reasoning',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'nervous_regulation',
	titleAr: 'الاستدلال العلمي: تحليل تجارب قطع وتنبيه الأعصاب القلبية (الودي وقرب الودي)',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_cardiac_respiratory_control',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const restHr = rng.pick(difficulty === 'easy' ? [70, 72] : [68, 72, 76]);
		const dropHr = rng.pick([38, 42, 46]);
		const peakHr = rng.pick([112, 118, 124]);
		const autoHr = rng.pick([102, 106, 110]);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: 20,
			yMax: 140,
			xStep: 2,
			yStep: 20,
			xLabel: 't (s)',
			yLabel: 'Fc (bpm)',
			title: 'تأثير تنبيه العصبين (س) و (ع) على الوتيرة القلبية',
			shadedZones: [
				{ x1: 2, x2: 5, fill: 'rgba(37,99,235,0.12)', label: 'تنبيه العصب س', textColor: '#1d4ed8' },
				{ x1: 7, x2: 10, fill: 'rgba(220,38,38,0.12)', label: 'تنبيه العصب ع', textColor: '#dc2626' }
			],
			dashedGuides: [
				{ x1: 0, y1: restHr, x2: 12, y2: restHr, color: '#475569', label: `الراحة ${restHr}` }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 2) return restHr;
						if (t < 5) return restHr - (restHr - dropHr) * Math.sin(((t - 2) / 3) * Math.PI);
						if (t < 7) return restHr;
						if (t < 10) return restHr + (peakHr - restHr) * Math.sin(((t - 7) / 3) * Math.PI);
						return restHr;
					},
					color: '#dc2626',
					label: 'الوتيرة القلبية'
				}
			],
			points: [
				{ x: 3.5, y: dropHr, label: `${dropHr} bpm`, color: '#1d4ed8' },
				{ x: 8.5, y: peakHr, label: `${peakHr} bpm`, color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_nerve_stim_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`العصب (س) هو قرب الودي المبطئ (خفض الوتيرة إلى $${dropHr}$) والعصب (ع) هو الودي المسرّع (رفعها إلى $${peakHr}$)، وقطع (س) يرفعها إلى الوتيرة الذاتية $${autoHr}\\text{ bpm}$`,
			[
				{
					text: `العصب (س) هو العصب الودي والعصب (ع) هو العصب قرب الودي`,
					diagnosticFeedback: 'تنبيه العصب (س) أدى إلى تباطؤ القلب (من ' + restHr + ' إلى ' + dropHr + ') فهو قرب الودي وليس الودي.'
				},
				{
					text: `قطع العصبين معاً يؤدي إلى توقف القلب عن النبض ($0\\text{ bpm}$)`,
					diagnosticFeedback: 'القلب المعزول يستمر في النبض تلقائياً عند وتيرته الذاتية (' + autoHr + ' bpm).'
				},
				{
					text: 'العصب الودي هو الذي يمارس تأثيراً مبطئاً مستمراً أثناء الراحة',
					diagnosticFeedback: 'التأثير المبطئ المستمر في الراحة يمارسه العصب قرب الودي، بدليل تسارع القلب عند قطعه.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): لتحديد طبيعة التحكم العصبي في نشاط القلب عند ثديي، نُبّه كهربائياً عصبين متصلين بالقلب هما (س) و (ع) وسُجلت تغيرات الوتيرة القلبية في الوثيقة (1).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تغير الوتيرة القلبية أثناء تنبيه العصب (س) ثم العصب (ع)',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل منحنى الوثيقة (1) محدداً تأثير تنبيه كل من العصب (س) والعصب (ع) على الوتيرة القلبية.`,
				answer: `1) التحليل:\n- في الراحة (قبل $t = 2" s"$): تثبت الوتيرة القلبية عند $${restHr}" bpm"$.\n- عند تنبيه العصب (س) ($2-5" s"$): تنخفض الوتيرة القلبية بوضوح لتبلغ $${dropHr}" bpm"$ (تباطؤ بـ $${restHr - dropHr}$ نبضة/د)، ثم تعود إلى $${restHr}" bpm"$ بعد توقف التنبيه.\n- عند تنبيه العصب (ع) ($7-10" s"$): ترتفع الوتيرة القلبية لتبلغ $${peakHr}" bpm"$ (تسارع بـ $+${peakHr - restHr}$ نبضة/د)، ثم تعود إلى قيمتها المرجعية.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) تعرّف بدقة على اسم كل من العصبين (س) و (ع)، واستنتج خاصية التعصيب القلبي.`,
				answer: `2) التعرف والاستنتاج:\n- العصب (س): **العصب قرب الودي** (الرئوي المعدي — مبطئ للقلب).\n- العصب (ع): **العصب الودي** (مسرّع للقلب).\n- الاستنتاج: يخضع القلب لتعصيب إعاشي مزدوج ومتضاد الوظيفة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): لمعرفة أي العصبين يغلب تأثيره في حالة الراحة ولإبراز خاصية هامة للقلب، أُنجزت تجارب القطع الموضحة في الجدول التالي:`
			},
			{
				type: 'table',
				headers: ['التجربة المنجزة في حالة الراحة', 'الوتيرة القلبية المسجلة (bpm)'],
				cells: [],
				rows: [
					['حيوان سليم (شاهد)', `${restHr}`],
					['قطع العصبين قرب الوديين (س)', `${autoHr}`],
					['قطع الأعصاب الودية (ع) فقط', `${restHr - 4}`],
					['قطع جميع الأعصاب (س) و (ع) معاً', `${autoHr - 2}`]
				]
			},
			{
				type: 'text',
				content: `1) قارن نتائج قطع (س) وقطع (ع)، واستنتج أي النظامين يمارس تأثيراً دائماً ومسيطراً أثناء الراحة.`,
				answer: `1) المقارنة والاستنتاج:\n- قطع العصب قرب الودي (س) أدى إلى ارتفاع كبير للوتيرة من $${restHr}$ إلى $${autoHr}" bpm"$، بينما قطع العصب الودي (ع) لم يحدث سوى انخفاض طفيف جداً ($${restHr - 4}" bpm"$).\n- نستنتج أن **النظام قرب الودي المبطئ هو المسيطر في حالة الراحة** إذ يمارس كبحاً مستمراً على القلب.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ماذا يثبت استمرار نبض القلب عند $${autoHr - 2}" bpm"$ رغم قطع جميع أعصابه؟ وما دور الجهاز العصبي إذاً؟`,
				answer: `2) الاستدلال: استمرار النبض بعد قطع كل الأعصاب يثبت أن للقلب **حركة (نشاطاً) ذاتية** مستقلة عن الجهاز العصبي؛ وبالتالي فإن دور الأعصاب الودية وقرب الودية ليس توليد النبض، بل **تنظيم وتكييف الوتيرة القلبية** حسب حاجة العضوية (إبطاء في الراحة وتسريع في الجهد).`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `أدّى تنبيه العصب (س) إلى خفض الوتيرة القلبية من $${restHr}$ إلى $${dropHr}\\text{ bpm}$، بينما رفعها تنبيه العصب (ع) إلى $${peakHr}\\text{ bpm}$، وأدى قطع (س) إلى ارتفاعها نحو $${autoHr}\\text{ bpm}$.\nما الاستنتاج الصحيح؟`,
				questionTextAr: 'اختر الاستنتاج الدقيق من تجارب التنبيه والقطع:',
				imageUrl: svgUrl,
				imageCaption: 'تأثير تنبيه العصبين الودي وقرب الودي على الوتيرة القلبية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `العصب (س) هو قرب الودي المبطئ المسيطر في الراحة، والعصب (ع) هو الودي المسرّع، واستمرار النبض بعد القطع التام يثبت النشاط الذاتي للقلب ($\\approx ${autoHr}\\text{ bpm}$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لفهم آلية التحكم العصبي في الوتيرة القلبية وتأثير كل من النظامين الودي وقرب الودي، ندرس نتائج التنبيه والقطع الموضحة في الوثيقة (1) والجدول.`,
				content
			},
			hints: [
				'تنبيه مبطئ = عصب قرب ودي؛ تنبيه مسرّع = عصب ودي.',
				'العصب الذي يُحدث قطعه تغيراً كبيراً في الراحة هو العصب النشط والمسيطر أثناء الراحة.',
				'استمرار النبض دون أعصاب يثبت النشاط الذاتي للقلب.'
			],
			solutionStepsAr: [
				`تحليل المنحنى وتحديد (س = قرب ودي: $${dropHr}$) و(ع = ودي: $${peakHr}$).`,
				`استنتاج السيطرة الدائمة للنظام قرب الودي في الراحة (تسارع إلى $${autoHr}$ عند القطع).`,
				'إثبات النشاط الذاتي للقلب وتحديد الدور التنظيمي للأعصاب.'
			],
			finalAnswer: `\\text{س = قرب ودي مبطئ} \\; ;\\; \\text{ع = ودي مسرّع} \\; ;\\; \\text{نشاط ذاتي } (${autoHr}\\text{ bpm})`
		};
	}
};

// 4. Reasoning (7 pts): Clonal propagation & nuclear transfer analysis
export const tpl1asTcstT3MicropropagationReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_micropropagation_reasoning',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'الاستدلال العلمي: تقنيات تكثير السلالات المرغوبة (الافتسال الدقيق واللمة الحيوانية)',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_clonal_propagation',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const factorPerMonth = rng.pick(difficulty === 'easy' ? [4, 5] : [4, 5, 6]);
		const months = 4;
		const totalPlantlets = Math.pow(factorPerMonth, months);

		const svg = svgBioFlowchart({
			title: 'مراحل تقنية الافتسال الدقيق لإنتاج لمة نباتية مرغوبة',
			orientation: 'horizontal',
			steps: [
				{ label: 'نبات أم مرغوب', sublabel: 'عزل برعم مرستيمي', color: '#15803d', bg: '#f0fdf4' },
				{ label: 'وسط مغذٍّ معقم', sublabel: 'أملاح + سكروز + هرمونات', color: '#0284c7', bg: '#f0f9ff' },
				{ label: 'تكاثر بالتجزئة', sublabel: 'انقسام خيطي متساوٍ', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: 'نبيتات متطابقة', sublabel: 'أقلمة وزراعة في التربة', color: '#b45309', bg: '#fffbeb' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_microprop_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`ينتج $${totalPlantlets}$ نبيتة متطابقة وراثياً $100\\%$ مع النبات الأم (بفضل الانقسام الخيطي المتساوي) مع خطر ضعف المقاومة الجماعية للآفات`,
			[
				{
					text: `ينتج $${factorPerMonth * months}$ نبيتة مختلفة وراثياً عن النبات الأم`,
					diagnosticFeedback: 'العدد ينمو أسّياً (معامل التكاثر أس عدد الأشهر) وجميع النبيتات متماثلة وراثياً 100%.'
				},
				{
					text: `يزيد الافتسال الدقيق من التنوع الوراثي ويُنتج أليلات جديدة عبر الإلقاح`,
					diagnosticFeedback: 'الافتسال الدقيق تكاثر لاجنسي خالٍ من الإلقاح، فيقلل التنوع الوراثي.'
				},
				{
					text: 'تتشكل النبيتات بفضل الانقسام المنصف للأمشاج فقط',
					diagnosticFeedback: 'يعتمد الافتسال الدقيق على الانقسام الخيطي المتساوي للخلايا الجسمية المرستيمية.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): لجأ مركز تقني لزراعة النخيل والبطاطا إلى تقنية الافتسال الدقيق الموضحة في الوثيقة (1) لتكثير نبات أم ذي مردود عالٍ، حيث تُعطي كل فسيلة $${factorPerMonth}$ فسائل جديدة كل شهر عبر التجزئة والزرع في أنابيب معقمة.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): خطوات الافتسال الدقيق لإنتاج اللمة النباتية',
				width: 370
			},
			{
				type: 'text',
				content: `1) احسب عدد النبيتات المحصل عليها انطلاقاً من برعم واحد بعد $${months}$ أشهر، وحدّد الآلية الخلوية المعتمدة وسبب تطابق جميع النبيتات وراثياً مع النبات الأم.`,
				answer: `1) الحساب والآلية:\n- عدد النبيتات بعد $${months}$ أشهر: $${factorPerMonth}^${months} = ${totalPlantlets}$ نبيتة.\n- الآلية الخلوية: **الانقسام الخيطي المتساوي** (تكاثر خضري لاجنسي دون إلقاح).\n- سبب التطابق ($100 "%"$): الانقسام الخيطي المتساوي يحافظ تماماً على البرنامج الوراثي للنبات الأم دون أي خلط صبغي.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ما الفائدة الإضافية لاستعمال «المرستيم القمي» بالذات في هذه التقنية عند تكثير البطاطا؟`,
				answer: `2) فائدة زراعة المرستيم: خلايا المرستيم سريعة الانقسام وخالية من الأوعية الناقلة والفيروسات، مما يتيح إنتاج آلاف النباتات **السليمة من الأمراض الفيروسية**.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): في تجربة موازية لتكثير الأبقار الحلوب (إنتاج اللمة الحيوانية)، لُخصت خطوات نقل الأنوية في الجدول التالي:`
			},
			{
				type: 'table',
				headers: ['الأبقار المشاركة في التجربة', 'الصفات الظاهرية للبقرة', 'الدور في التجربة'],
				cells: [],
				rows: [
					['البقرة (1)', 'وبر أبيض منقط بالأسود، غزيرة الحليب (35 L/يوم)', 'أُخذت منها خلايا جنينية (مصدر الأنوية)'],
					['البقرة (2)', 'وبر بني، قليلة الحليب (12 L/يوم)', 'أُخذت منها بويضات ونُزعت أنويتها'],
					['البقرة (3)', 'وبر أسود، متوسطة الحليب', 'أُم حاضنة زُرعت الأجنة في رحمها']
				]
			},
			{
				type: 'text',
				content: `1) استنتج صفات العجلات المولودة من رحم البقرة (3) مع التعليل العلمي الدقيق.`,
				answer: `1) صفات العجلات والتعليل:\n- تولد جميع العجلات **ذات وبر أبيض منقط بالأسود وغزيرة الحليب ($35" L"$/يوم)** مطابقة تماماً للبقرة (1).\n- التعليل: لأن **النواة هي مقر العوامل الوراثية (المورثات)**، وقد استُمدت الأنوية من البقرة (1) فقط، بينما وفّرت البقرة (2) هيولى البويضة ووفّرت البقرة (3) التغذية الجنينية أثناء الحمل فقط.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حذّر خبراء الزراعة من استبدال كل المحاصيل والسلالات المحلية بلمة واحدة منتقاة. برّر هذا التحذير علمياً واقترح إجراءً للحفاظ على التوازن الوراثي.`,
				answer: `2) التبرير والحل:\n- التبرير: تعميم لمة واحدة متماثلة وراثياً يؤدي إلى **فقدان التنوع البيولوجي** واندثار السلالات المحلية المتكيفة، فيصبح المحصول أو القطيع هشاً جداً ومعرضاً للهلاك الجماعي عند ظهور وباء أو تغير مناخي حاد.\n- الإجراء: إنشاء **بنوك للبذور والسلالات المحلية** والمزاوجة العقلانية بين السلالات المنتقاة والسلالات المتنوعة طبيعياً.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `في تجربة افتسال دقيق تعطي كل فسيلة $${factorPerMonth}$ فسائل شهرياً، استُمر في التجزئة لمدة $${months}$ أشهر.\nما الحصيلة العددية والوراثية والبيئية لهذه التقنية؟`,
				questionTextAr: 'اختر التحليل الصحيح لتقنية الافتسال الدقيق:',
				imageUrl: svgUrl,
				imageCaption: 'مراحل الافتسال الدقيق',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتضاعف العدد أسّياً ($${factorPerMonth}^{${months}} = ${totalPlantlets}$ نبيتة) متطابقة وراثياً $100\\%$ عبر الانقسام الخيطي المتساوي، لكن الإفراط فيها يقلص التنوع الوراثي ويضعف المقاومة الجماعية للآفات.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `بعد الحصول على سلالات نباتية أو حيوانية مرغوبة، يلجأ العلماء لتقنيات التكثير السريع (اللمة النباتية واللمة الحيوانية) كما توضح الوثيقة (1) والجدول.`,
				content
			},
			hints: [
				`احسب التكاثر الأسي: $${factorPerMonth}^{${months}}$.`,
				'تذكّر أن النواة وحدها تحدد الصفات الوراثية للعجل المستنسخ.',
				'وازن في إجابتك بين المردود الاقتصادي العالي ومخاطر فقدان التنوع البيولوجي.'
			],
			solutionStepsAr: [
				`حساب $${totalPlantlets}$ نبيتة وتحديد الانقسام الخيطي المتساوي وميزة خلو المرستيم من الفيروسات.`,
				'تحديد صفات العجلات المطابقة للبقرة (1) المعطية للنواة.',
				'تبرير خطر التماثل الوراثي المفرط على التنوع البيولوجي.'
			],
			finalAnswer: `${totalPlantlets}\\text{ نبيتة متطابقة} + \\text{صفات البقرة (1)}`
		};
	}
};

// 5. Scientific Approach (8 pts): Wheat breeding for drought resistance & high yield
export const tpl1asTcstT3WheatBreedingApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_wheat_breeding_approach',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'المسعى العلمي: استنباط سلالة قمح جزائرية غزيرة الإنتاج ومقاومة للجفاف',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_hybridization_selection',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nTotal = rng.pick(difficulty === 'easy' ? [1600, 3200] : [1600, 3200, 4800]);
		const n9 = Math.round((nTotal * 9) / 16);
		const n3a = Math.round((nTotal * 3) / 16);
		const n3b = Math.round((nTotal * 3) / 16);
		const n1 = Math.round(nTotal / 16);

		const svg = svgGeneticsDiagram('punnett_square', {
			title: 'تمثيل تلاقي الأمشاج في التضريب الوراثي لعزل سلالة مرغوبة',
			punnett: { p1: ['R', 'r'], p2: ['R', 'r'] }
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_wheat_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`السلالة المرغوبة [غزيرة الحبوب، مقاومة للجفاف] تظهر في $F_2$ بنسبة $3/16$ ($${n3a}$ نباتاً) منها $${n1}$ نقية تُعزل بالتلقيح الذاتي والانتقاء`,
			[
				{
					text: 'تظهر السلالة المرغوبة في الجيل الأول $F_1$ بنسبة $100\\%$ ونقية تماماً',
					diagnosticFeedback: 'الجيل الأول F₁ هجين وظهرت فيه صفتا (قليل الحبوب، مقاوم للجفاف) فقط.'
				},
				{
					text: `نسبة السلالة المرغوبة النقية في $F_2$ تساوي $9/16$ ($${n9}$ نباتاً)`,
					diagnosticFeedback: 'النسبة 9/16 تخص النمط [قليل الحبوب، مقاوم للجفاف] وليس النمط المرغوب.'
				},
				{
					text: 'يكفي زيادة التسميد المعدني للسلالة (2) لتصبح مقاومة للجفاف وراثياً',
					diagnosticFeedback: 'التسميد عامل خارجي لا يغيّر المورثات ولا يُكسب السلالة صفة المقاومة الوراثية.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): يتوفر في محطة تجارب زراعية بالهضاب العليا سلالتان نقيتان من القمح: سلالة محلية (أ) مقاومة للجفاف لكنها قليلة الحبوب، وسلالة مستوردة (ب) غزيرة الحبوب لكنها حساسة للجفاف (تتلف في السنوات الجافة).`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي الذي يواجه الباحثين الزراعيين لتحسين إنتاج القمح في المناطق شبه الجافة.`,
				answer: `1) المشكل العلمي: كيف يمكن الحصول على سلالة قمح جديدة نقية ومستقرة تجمع بين صفتي غزارة الحبوب ومقاومة الجفاف؟`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين علميتين حول الطريقة الكفيلة بتحقيق هذا الهدف (التدخل على العوامل الخارجية مقابل التدخل على العوامل الوراثية).`,
				answer: `2) الفرضيتان:\n- الفرضية 1: إجراء التهجين الاصطناعي بين السلالتين (أ) و (ب) متبوعاً بالانتقاء التدريجي في $F_2$ يجمع الأليلات المرغوبة في سلالة نقية جديدة.\n- الفرضية 2: الاكتفاء بزراعة السلالة (ب) مع تكثيف التسميد المعدني يحوّلها وراثياً إلى سلالة مقاومة للجفاف.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): لتحقيق الهدف، زُرعت السلالة (ب) بسماد مكثف في وسط قليل الأمطار فذبلت تماماً. وبالمقابل أُجري تهجين بين (أ) و (ب) فأعطى الجيل $F_1$ نباتات متجانسة [قليلة الحبوب، مقاومة للجفاف]، وأعطى التلقيح الذاتي لأفراد $F_1$ النتائج المبينة في الجدول (مجموع أفراد $F_2 = ${nTotal}$ نباتاً).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مبدأ تشكل الأمشاج والاتحاد العشوائي للأليلات',
				width: 330
			},
			{
				type: 'table',
				headers: ['النمط الظاهري في الجيل الثاني F₂', 'عدد النباتات', 'النسبة المندلية'],
				cells: [],
				rows: [
					['قليلة الحبوب، مقاومة للجفاف', `${n9}`, '9/16'],
					['غزيرة الحبوب، مقاومة للجفاف (المرغوبة)', `${n3a}`, '3/16'],
					['قليلة الحبوب، حساسة للجفاف', `${n3b}`, '3/16'],
					['غزيرة الحبوب، حساسة للجفاف', `${n1}`, '1/16']
				]
			},
			{
				type: 'text',
				content: `1) استغل نتائج $F_1$ و $F_2$ لتحديد الأليلات السائدة والمتنحية، واكتب النمط المورثي لأفراد $F_1$ وللنباتات المرغوبة النقية في $F_2$ (نرمز لمورثة الغزارة بـ $P/p$ ومورثة المقاومة بـ $R/r$).`,
				answer: `1) التحليل الوراثي:\n- من تجانس $F_1$ [قليلة الحبوب، مقاومة للجفاف]: أليل قلة الحبوب ($P$) سائد على غزارة الحبوب ($p$)، وأليل مقاومة الجفاف ($R$) سائد على الحساسية ($r$).\n- النمط المورثي لأفراد $F_1$ الهجينة: $(P//p, R//r)$.\n- السلالة المرغوبة [غزيرة الحبوب، مقاومة للجفاف] تظهر في $F_2$ بـ $${n3a}$ نباتاً ($3/16$)، والنمط المورثي **النقي** منها هو $(p//p, R//R)$ وعددها النظري $frac(1, 16) times ${nTotal} = ${n1}$ نباتاً.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) صادق على الفرضية الصحيحة واقترح خطة عملية لعزل وإكثار السلالة النقية $(p//p, R//R)$ وتوزيعها سريعاً على الفلاحين.`,
				answer: `2) المصادقة وخطة الإكثار:\n- فشل التسميد في إكساب المقاومة للجفاف وظهور السلالة المرغوبة بالتهجين يثبتان خطأ الفرضية (2) و**نصادق على الفرضية (1)**.\n- خطة العزل والإكثار: انتقاء أفراد النمط المرغوب وإجراء تلقيح ذاتي لها لعزل السلالة النقية $(p//p, R//R)$ (التي تعطي نسلاً متجانساً $100 "%"$), ثم إكثارها بالبذور النقية أو بالافتسال الدقيق مع حفظ السلالات المحلية في بنك بذور.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي خطوات استنباط السلالة الجزائرية المرغوبة انطلاقاً من السلالتين الأبويتين (أ) و (ب) حتى وصولها إلى حقول الفلاحين.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[سلالة أ نقية (P//P, R//R)] × [سلالة ب نقية (p//p, r//r)] --(تهجين اصطناعي: إخصاء وتأبير)--> [جيل أول F₁ هجين متجانس (P//p, R//r)] --(تلقيح ذاتي)--> [جيل ثانٍ F₂ متنوع: ظهور ${n3a} نباتاً مرغوباً منها ${n1} نقياً (p//p, R//R)] --(انتقاء اصطناعي + تكثير)--> [سلالة قمح نقية غزيرة ومقاومة للجفاف].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أعطى تهجين سلالتي القمح جيلاً ثانياً من $${nTotal}$ نباتاً، وظهر النمط المرغوب [غزير الحبوب، مقاوم للجفاف] بعدد $${n3a}$ نباتاً ($3/16$).\nما الاستنتاج المصادق عليه حول استنباط السلالة النقية؟`,
				questionTextAr: 'اختر الإجابة المصادق عليها علمياً:',
				imageUrl: svgUrl,
				imageCaption: 'التضريب الوراثي لعزل سلالة قمح مرغوبة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بالنسبة للنمط المرغوب ($3/16 = ${n3a}$)، يمثل النقي $(p//p, R//R)$ نسبة $1/16$ أي $${n1}$ نباتاً يُعزل بالانتقاء الاصطناعي والتلقيح الذاتي.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تواجه زراعة القمح في المناطق شبه الجافة تحدي الجمع بين الإنتاج الوفير ومقاومة الجفاف. لفهم كيف يُوظف التهجين والانتقاء في حل هذا المشكل، ندرس المعطيات التجريبية التالية.`,
				content
			},
			hints: [
				'قارن صفات F₁ بصفات الأبوين لتعيين السائد (P, R) والمتنحي (p, r).',
				`ثلث أفراد فئة $3/16$ (أي $1/16 = ${n1}$) هي نقية متماثلة اللواقح.`,
				'اربط في المخطط التحصيلي بين التهجين والانتقاء والتكثير.'
			],
			solutionStepsAr: [
				'صياغة المشكل والفرضيتين.',
				`تعيين السيادة والنمط النقي $(p//p, R//R)$ بعدد $${n1}$ من أصل $${n3a}$.`,
				'المصادقة على التهجين والانتقاء وبناء المخطط التحصيلي.'
			],
			finalAnswer: `(p//p, R//R)\\text{ بعدد } ${n1}\\text{ نباتاً نقياً}`
		};
	}
};

// 6. Scientific Approach (8 pts): Proving hormonal control (Pituitary - Gonad axis)
export const tpl1asTcstT3HormonalEndocrineApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t3_hormonal_endocrine_approach',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'hormonal_regulation',
	titleAr: 'المسعى العلمي: إثبات طبيعة التحكم الهرموني بين الغدة النخامية والغدد التناسلية',
	curriculumLessonId: 'sci_lesson_1as_tcst_t3_hormonal_unit_control',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const massNormal = rng.pick(difficulty === 'easy' ? [400, 450] : [380, 420, 460]);
		const massAtrophy = roundTo(massNormal * 0.25, 0);
		const massRestored = roundTo(massNormal * 0.96, 0);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: 0,
			yMax: 520,
			xStep: 5,
			yStep: 100,
			xLabel: 't (j)',
			yLabel: 'm (mg)',
			title: 'تطور كتلة الرحم بعد استئصال المبيضين ثم حقن مستخلصات مبيضية',
			eventArrows: [
				{ x: 5, label: 'استئصال المبيضين', color: '#dc2626' },
				{ x: 18, label: 'حقن مستخلص مبيضي', color: '#16a34a' }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 5) return massNormal;
						if (t < 18) return massAtrophy + (massNormal - massAtrophy) * Math.exp(-0.28 * (t - 5));
						return massAtrophy + (massRestored - massAtrophy) * (1 - Math.exp(-0.32 * (t - 18)));
					},
					color: '#7c3aed',
					label: 'كتلة الرحم'
				}
			],
			points: [
				{ x: 17, y: roundTo(massAtrophy + 8, 0), label: 'ضمور', color: '#dc2626' },
				{ x: 28, y: roundTo(massRestored - 12, 0), label: 'استعادة النمو', color: '#15803d' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t3_hormone_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'يؤثر المبيض على الرحم بطريقة هرمونية (دموية) عبر الأستروجينات، وتتحكم النخامية في الرحم بصورة غير مباشرة عبر تنشيط المبيض',
			[
				{
					text: 'يؤثر المبيض على الرحم عبر ألياف عصبية مباشرة فقط',
					diagnosticFeedback: 'استعادة كتلة الرحم بعد حقن مستخلص مبيضي في الدم (أو الزرع تحت الجلد) تنفي الطريق العصبي وتثبت الطريق الدموي الهرموني.'
				},
				{
					text: 'تؤثر الغدة النخامية مباشرة على الرحم حتى في غياب المبيضين',
					diagnosticFeedback: 'حقن مستخلصات نخامية لأنثى مستأصلة المبيضين لم يُعِد نمو الرحم، ما يثبت أن تأثيرها غير مباشر عبر المبيض.'
				},
				{
					text: 'لا علاقة للمبيض ولا للغدة النخامية بتطور بطانة الرحم',
					diagnosticFeedback: `استئصال المبيضين خفض كتلة الرحم من ${massNormal} mg إلى ${massAtrophy} mg.`
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): لوحظ عند إناث فئران بالغة أن استئصال الغدة النخامية أو استئصال المبيضين يؤدي إلى ضمور شديد في الرحم وتوقف الدورة الجنسية.`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي حول آلية التواصل الوظيفي بين الغدة النخامية والمبيض والرحم.`,
				answer: `1) المشكل العلمي: كيف تتحكم الغدة النخامية والمبيضان في نمو وتطور الرحم؟ (هل التأثير عصبي أم هرموني دموي، وهل تأثير النخامية مباشر أم عبر المبيض؟)`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين تفسّران آلية تأثير المبيض والغدة النخامية على الرحم.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: يؤثر المبيض على الرحم بآلية هرمونية عبر الدم، وتتحكم النخامية في المبيض هرمونياً (تأثير غير مباشر على الرحم).\n- الفرضية 2: يؤثر كل من المبيض والغدة النخامية على الرحم عبر اتصالات عصبية مباشرة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، أُنجزت سلسلة التجارب الممثلة في منحنى الوثيقة (1) والجدول المرافق:`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تطور كتلة الرحم بعد استئصال المبيضين ثم حقن مستخلص مبيضي في الدم',
				width: 360
			},
			{
				type: 'table',
				headers: ['المجموعة التجريبية', 'المعاملة المنجزة', 'حالة المبيضين', 'حالة الرحم'],
				cells: [],
				rows: [
					['مجموعة 1', 'استئصال الغدة النخامية', 'ضمور شديد', `ضمور (${massAtrophy} mg)`],
					['مجموعة 2', 'استئصال النخامية + حقن مستخلص نخامي في الدم', 'نمو طبيعي', `نمو طبيعي (${massRestored} mg)`],
					['مجموعة 3', 'استئصال النخامية والمبيضين + حقن مستخلص نخامي', 'غائبان', `بقاء الضمور (${massAtrophy} mg)`]
				]
			},
			{
				type: 'text',
				content: `1) حلّل منحنى الوثيقة (1) واستنتج طبيعة العلاقة بين المبيض والرحم.`,
				answer: `1) التحليل والاستنتاج:\n- قبل اليوم $5$: كتلة الرحم ثابتة وطبيعية ($${massNormal}" mg"$). بعد استئصال المبيضين في اليوم $5$ تتناقص كتلة الرحم بسرعة لتستقر حول $${massAtrophy}" mg"$ (ضمور). وعند حقن مستخلصات مبيضية في الدم في اليوم $18$ تستعيد كتلة الرحم نموها لتصل إلى $${massRestored}" mg"$.\n- الاستنتاج: المبيض **غدة صماء** تتحكم في نمو الرحم عن طريق **هرمونات** (الأستروجينات) تفرز في الدم وليس عبر الأعصاب.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) باستغلال نتائج المجموعات (1، 2، 3) في الجدول، بيّن كيف تتحكم الغدة النخامية في الرحم، ثم صادق على الفرضية الصحيحة.`,
				answer: `2) استغلال الجدول والمصادقة:\n- من المجموعتين (1) و (2): تفرز الغدة النخامية هرمونات في الدم (مثيرات الغدد التناسلية) ضرورية لنمو المبيض والرحم.\n- من المجموعة (3): غياب المبيضين يمنع المستخلصات النخامية من تنشيط الرحم (بقاء الضمور $${massAtrophy}" mg"$). إذن تؤثر النخامية على الرحم **بشكل غير مباشر** عبر تنشيطها للمبيضين.\n- وعليه نرفض الفرضية (2) و**نصادق على الفرضية (1)**.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي وظيفي التسلسل الهرموني من الغدة النخامية إلى الرحم محدداً الغدد الصماء، الهرمونات، وطريقة النقل.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[الغدة النخامية (غدة صماء)] --(هرمونات نخامية منشطة عبر الدم)--> [المبيض (غدة صماء وعضو مستهدف)] --(هرمونات مبيضية: أستروجين وبروجسترون عبر الدم)--> [الرحم (عضو مستهدف)] $arrow.r$ [نمو وتطور مخاطية الرحم ($${massNormal}" mg"$)].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أدّى استئصال المبيضين إلى انخفاض كتلة الرحم من $${massNormal}\\text{ mg}$ إلى $${massAtrophy}\\text{ mg}$، وأعاد حقن المستخلص المبيضي الكتلة إلى $${massRestored}\\text{ mg}$؛ بينما لم ينفع حقن مستخلص نخامي عند غياب المبيضين.\nما الفرضية المصادق عليها؟`,
				questionTextAr: 'اختر التفسير الهرموني المصادق عليه:',
				imageUrl: svgUrl,
				imageCaption: 'تطور كتلة الرحم بعد الاستئصال وحقن المستخلصات',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'يؤثر المبيض هرمونياً عبر الدم على الرحم، وتتحكم الغدة النخامية في الرحم بصورة غير مباشرة عبر تنشيطها للمبيض بهرمونات نخامية دموية.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `بالإضافة إلى التحكم العصبي، تتكامل وظائف الأعضاء بفضل آلية تواصل ثانية هي التحكم الهرموني. لإثبات ذلك ندرس العلاقة بين الغدة النخامية والمبيض والرحم.`,
				content
			},
			hints: [
				'استعادة النمو بالحقن الدموي لمستخلص غدة تثبت الطبيعة الهرمونية وتنفي الطريق العصبي.',
				'قارن المجموعة (2) والمجموعة (3) لإثبات أن النخامية لا تؤثر مباشرة في الرحم.',
				'وضّح في المخطط: غدة صماء ← طريق دموي ← عضو مستهدف.'
			],
			solutionStepsAr: [
				'طرح المشكل العلمي واقتراح فرضيتين (طريق هرموني دموي مقابل عصبي).',
				`تحليل منحنى كتلة الرحم ($${massNormal} \\rightarrow ${massAtrophy} \\rightarrow ${massRestored}\\text{ mg}$) ونتائج المجموعات الثلاث.`,
				'المصادقة على الفرضية (1) وبناء مخطط التسلسل النخامي-المبيضي-الرحمي.'
			],
			finalAnswer: 'النخامية (دم) ← المبيض (دم) ← نمو الرحم'
		};
	}
};

export const SCIENCES_TEMPLATES_1AS_TCST_T3: SciencesParameterizedTemplate[] = [
	tpl1asTcstT3CardiacNervesRecall,
	tpl1asTcstT3HybridizationRecall,
	tpl1asTcstT3ExerciseCardiacReasoning,
	tpl1asTcstT3MicropropagationReasoning,
	tpl1asTcstT3WheatBreedingApproach,
	tpl1asTcstT3HormonalEndocrineApproach
];
