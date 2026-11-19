import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { SHARED_SCIENCES_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';
import {
	saveSciencesSvgAsset,
	svgGeneticsDiagram
} from '../../svg-sciences';

// ============================================================================
// 2AS SE Exclusive Templates — Trimester 2 (الاختلاط الصبغي المعمق والتضريب الاختباري)
// ============================================================================

// SE Exclusive 1 — Recall (5 pts): Meiosis stages & dual chromosomal mixing
export const tpl2asSeT2MeiosisMixingRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t2_meiosis_mixing_recall',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'reproduction_genetics',
	titleAr: 'أسس التنوع البيولوجي: مراحل الانقسام المنصف وآليتا الاختلاط الصبغي والإلقاح',
	curriculumLessonId: 'sci_lesson_2as_se_t2_meiosis_diversity',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const twoN = rng.pick(difficulty === 'easy' ? [4, 6] : [6, 8]);
		const n = twoN / 2;
		const interTypes = Math.pow(2, n);

		const svg = svgGeneticsDiagram('meiosis_stages', {
			title: 'المراحل الأساسية للانقسام المنصف واختزال الصيغة الصبغية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_se_t2_meiosis_recall_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يحدث الاختلاط داخل الصبغي (العبور) في التمهيدية I، والاختلاط بين الصبغي في الانفصالية I ($2^{${n}} = ${interTypes}$ أنماط)، وتنتج 4 أمشاج أحادية ($n = ${n}$)`,
			[
				{
					text: `يحدث الاختلاط داخل الصبغي في الانفصالية II وتنتج خليتان ثنائيتا الصيغة ($2n = ${twoN}$)`,
					diagnosticFeedback: 'العبور يحدث في التمهيدية I، وينتج الانقسام المنصف 4 أمشاج أحادية (n) لا خليتين (2n).'
				},
				{
					text: 'ينشطر الجزء المركزي للصبغيات في الانفصالية I فتنفصل الكروماتيدات الشقيقة مبكراً',
					diagnosticFeedback: 'في الانفصالية I تفترق الصبغيات المتماثلة المضاعفة دون انشطار الجزء المركزي؛ الانشطار يحدث في الانفصالية II.'
				},
				{
					text: 'لا يساهم الإلقاح العشوائي في زيادة التنوع الوراثي للأفراد',
					diagnosticFeedback: 'الإلقاح يجمع عشوائياً مشيجين متنوعين فيضاعف التراكيب الوراثية الممكنة إلى 2²ⁿ على الأقل.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): رسم تخطيطي لأهم مراحل الانقسام المنصف لخلية أم للأمشاج ($2n = ${twoN}$)`,
				width: 360
			},
			{
				type: 'text',
				content: `1) قارن سلوك الصبغيات في **الانفصالية الأولى (I)** وفي **الانفصالية الثانية (II)**، ثم حدّد عدد الأمشاج الناتجة وصيغتها الصبغية وعدد التراكيب الممكنة بالاختلاط بين الصبغي وحده لخلية $2n = ${twoN}$.`,
				answer: `1) المقارنة والحصيلة:\n- **الانفصالية I**: تهاجر الصبغيات المتماثلة المضاعفة (كل صبغي بكروماتيدين) نحو القطبين دون انشطار الجزء المركزي، فيُختزل العدد الصبغي من $2n = ${twoN}$ إلى $n = ${n}$ (انقسام اختزالي).\n- **الانفصالية II**: ينشطر الجزء المركزي وتنفصل الكروماتيدات الشقيقة نحو القطبين (انقسام متساوٍ).\n- **الحصيلة**: تنتج $4$ أمشاج أحادية الصيغة الصبغية ($n = ${n}$ صبغي بسيط)، ويعطي الاختلاط بين الصبغي وحده $2^n = 2^${n} = ${interTypes}$ نمطاً مختلفاً للأمشاج.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً توضح فيه كيف يؤدي تعاقب الانقسام المنصف (بآليتي الاختلاط الصبغي) والإلقاح إلى إنتاج أفراد متفردين وراثياً مع المحافظة على ثبات الصيغة الصبغية للنوع.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يُنتج التكاثر الجنسي أفراداً يحملون نفس الصيغة الصبغية للنوع ($2n$) لكنهم يختلفون وراثياً ومظهرياً. فكيف يجمع الانقسام المنصف والإلقاح بين ثبات النوع والتفرد الوراثي للأفراد؟\n- العرض: أثناء تشكل الأمشاج، يختزل الانقسام المنصف الصيغة الصبغية من $2n$ إلى $n$ ويحدث آليتي تنويع متتاليتين: أولاً **الاختلاط داخل الصبغي (العبور)** في التمهيدية I بتبادل قطع كروماتيدية بين الصبغيات المتماثلة المقترنة مما يولّد توليفات أليلية جديدة؛ ثانياً **الاختلاط بين الصبغي** في الانفصالية I عبر التوزع المستقل والعشوائي لأزواج الصبغيات نحو القطبين ($2^n$ نمطاً محتملاً، أي $${interTypes}$ نمطاً لـ $2n=${twoN}$). بعد ذلك، يجمع **الإلقاح** عشوائياً بين مشيجين أحاديين ($n + n = 2n$) فيعيد الصيغة الصبغية الثابتة للنوع ويضاعف التراكيب الوراثية الممكنة إلى $2^(2n)$ وأكثر بفعل العبور.\n- الخاتمة: يتكامل الانقسام المنصف (اختزال وتنويع الأمشاج) والإلقاح العشوائي (إعادة $2n$ ومضاعفة التراكيب) لضمان استمرارية النوع وتفرد كل فرد وراثياً.`,
				mark: '3.0'
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
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من مراحل الانقسام المنصف في الوثيقة (1) لخلية صيغتها $2n = ${twoN}$، ما العبارة العلمية الدقيقة حول آليتي الاختلاط الصبغي؟`,
				questionTextAr: 'اختر العبارة الصحيحة حول الانقسام المنصف والتنوع الوراثي:',
				imageUrl: svgUrl,
				imageCaption: 'مراحل الانقسام المنصف',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يحدث العبور (داخل صبغي) في التمهيدية I، والتوزع المستقل (بين صبغي: $2^{${n}} = ${interTypes}$ أنماط) في الانفصالية I، وتنتج 4 أمشاج أحادية ($n = ${n}$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُعدّ الانقسام المنصف (الوثيقة 1) والإلقاح الآليتين الأساسيتين للتنوع البيولوجي في التكاثر الجنسي.`,
				content
			},
			hints: [
				'الانفصالية I: افتراق الصبغيات المتماثلة (دون انشطار الجزء المركزي)؛ الانفصالية II: انفصال الكروماتيدات الشقيقة.',
				'التمهيدية I = عبور (داخل صبغي)؛ الانفصالية I = توزع مستقل (بين صبغي).',
				'اذكر في النص العلمي الدور المزدوج للتكاثر الجنسي: ثبات $2n$ + التفرد الوراثي.'
			],
			solutionStepsAr: [
				'المقارنة بين الانفصالية I والانفصالية II وتحديد الحصيلة (4 أمشاج $n$).',
				`حساب عدد أنماط الاختلاط بين الصبغي ($2^{${n}} = ${interTypes}$).`,
				'تحرير النص العلمي المهيكل حول الاختلاطين الصبغيين والإلقاح.'
			],
			finalAnswer: `\\text{عبور (تمهيدية I)} + \\text{بين صبغي (انفصالية I: } ${interTypes}\\text{)} + \\text{إلقاح}`
		};
	}
};

// SE Exclusive 2 — Scientific Approach (8 pts): Test-Cross proving Linked Genes & Crossing-Over
export const tpl2asSeT2TestCrossRecombinationApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t2_transgenesis_recombination_approach',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'reproduction_genetics',
	titleAr: 'المسعى العلمي: استغلال التضريب الاختباري لإثبات ارتباط المورثات وحدوث العبور الصبغي',
	curriculumLessonId: 'sci_lesson_2as_se_t2_fertilization_recombination_prob',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const total = 1000;
		const recombEach = rng.pick(difficulty === 'easy' ? [80, 100] : [75, 85, 95]);
		const parentEach = total / 2 - recombEach;
		const parentPct = roundTo(((parentEach * 2) / total) * 100, 1);
		const recombPct = roundTo(((recombEach * 2) / total) * 100, 1);

		const svg = svgGeneticsDiagram('punnett_square', {
			title: 'مبدأ التضريب الاختباري لتحديد أنماط ونسب أمشاج الفرد الهجين',
			punnett: { p1: ['VG', 'vg'], p2: ['Vg', 'vG'] }
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_se_t2_testcross_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`بما أن التراكيب الأبوية غالبة ($${parentPct}\\%$) والجديدة قليلة ($${recombPct}\\%$) فالمورثتان مرتبطتان على نفس الصبغي وحدث عبور صبغي في التمهيدية I`,
			[
				{
					text: 'ظهور أربعة أنماط ظاهرية يثبت حتماً أن المورثتين مستقلتان (على صبغيين مختلفين)',
					diagnosticFeedback: `لو كانتا مستقلتين لكانت النسب متساوية (25% لكل نمط أي 50% أبوية و50% جديدة)، بينما هنا الأبوية ${parentPct}% والجديدة ${recombPct}% فقط.`
				},
				{
					text: 'المورثتان مرتبطتان ارتباطاً مطلقاً ولم يحدث أي عبور صبغي',
					diagnosticFeedback: `الارتباط المطلق يعطي نمطين أبويين فقط (0% تراكيب جديدة)، بينما ظهرت هنا ${recombEach * 2} ذبابة ذات تراكيب جديدة (${recombPct}%).`
				},
				{
					text: 'نتجت التراكيب الجديدة من طفرات عشوائية حدثت بعد الإلقاح',
					diagnosticFeedback: `تكرار التراكيب الجديدة بنسبة منتظمة ومرتفعة (${recombPct}%) ناتج عن العبور الصبغي وليس عن الطفرات النادرة.`
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): أُجري تصالب بين سلالتين نقيتين من ذبابة الخل: سلالة (1) ذات جسم رمادي وأجنحة طويلة $[G, L]$ وسلالة (2) ذات جسم أسود وأجنحة ضامرة $[g, l]$، فكان الجيل الأول $F_1$ متجانساً $100 "%"$ ذو جسم رمادي وأجنحة طويلة $[G, L]$.`
			},
			{
				type: 'text',
				content: `1) ماذا تستنتج من نتائج الجيل الأول $F_1$؟ ثم اطرح المشكل العلمي حول التوضع الصبغي لمورثتي لون الجسم وطول الأجنحة.`,
				answer: `1) الاستنتاج والمشكل:\n- الاستنتاج: الأبوان نقيان، وأليل الجسم الرمادي ($G$) سائد على الأسود ($g$)، وأليل الأجنحة الطويلة ($L$) سائد على الضامرة ($l$)، وأفراد $F_1$ هجينة في الصفتين.\n- المشكل العلمي: هل مورثتا لون الجسم وطول الأجنحة محمولتان على صبغيين مختلفين (مستقلتان) أم على نفس الصبغي (مرتبطتان)، وما الآلية الصبغية المفسرة لتشكل أمشاج $F_1$؟`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين حول التوضع الصبغي للمورثتين والنتائج المتوقعة عند إجراء تضريب اختباري بين أنثى من $F_1$ وذكر ثنائي التنحي $[g, l]$.`,
				answer: `2) الفرضيتان:\n- الفرضية 1 (استقلالية المورثتين): المورثتان على زوجين مختلفين، فيحدث اختلاط بين صبغي يعطي 4 أنماط متساوية في التضريب الاختباري ($25 "%"$ لكل نمط: $50 "%"$ أبوية و $50 "%"$ جديدة).\n- الفرضية 2 (ارتباط المورثتين): المورثتان على نفس الصبغي؛ فيعطي التضريب الاختباري أغلبية ساحقة من التراكيب الأبوية ($> 50 "%"$ ) ونسبة ضعيفة من التراكيب الجديدة ($< 50 "%"$ ) في حالة حدوث عبور صبغي.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): أُنجز التضريب الاختباري (أنثى $F_1$ هجينة × ذكر ثنائي التنحي $[g, l]$) على عينة من $${total}$ ذبابة خل فكانت النتائج كما في الجدول:`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مخطط يبيّن أنماط الأمشاج الأربعة الناتجة عن أنثى F₁ الهجينة',
				width: 320
			},
			{
				type: 'table',
				headers: ['النمط الظاهري في نسل التضريب الاختباري', 'التصنيف', 'عدد الذبابات', 'النسبة المئوية'],
				cells: [],
				rows: [
					['جسم رمادي، أجنحة طويلة [G, L]', 'تركيب أبوي', `${parentEach}`, `${roundTo((parentEach / total) * 100, 1)}%`],
					['جسم أسود، أجنحة ضامرة [g, l]', 'تركيب أبوي', `${parentEach}`, `${roundTo((parentEach / total) * 100, 1)}%`],
					['جسم رمادي، أجنحة ضامرة [G, l]', 'تركيب جديد', `${recombEach}`, `${roundTo((recombEach / total) * 100, 1)}%`],
					['جسم أسود، أجنحة طويلة [g, L]', 'تركيب جديد', `${recombEach}`, `${roundTo((recombEach / total) * 100, 1)}%`]
				]
			},
			{
				type: 'text',
				content: `1) احسب النسبة الإجمالية للتراكيب الأبوية والنسبة الإجمالية للتراكيب الجديدة، ثم ناقش الفرضيتين وصادق على الفرضية الصحيحة.`,
				answer: `1) الحساب والمصادقة:\n- نسبة التراكيب الأبوية: $frac(${parentEach * 2}, ${total}) times 100 = ${parentPct} "%"$ ($>> 50 "%"$).\n- نسبة التراكيب الجديدة: $frac(${recombEach * 2}, ${total}) times 100 = ${recombPct} "%"$ ($<< 50 "%"$).\n- المصادقة: عدم تساوي النسب الأربع (اختلاف كبير عن $25 "%"$ لكل نمط) يدحض الفرضية (1) (الاستقلالية) و**يصادق على الفرضية (2)**: المورثتان **مرتبطتان جزئياً** على نفس الزوج الصبغي.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) قدّم التفسيـر الصبغي الدقيق لظهور التراكيب الجديدة ($[G, l]$ و $[g, L]$ بنسبة $${recombPct} "%"$ ) محدّداً المرحلة الخلوية التي نشأت فيها.`,
				answer: `2) التفسير الصبغي:\n- أثناء **المرحلة التمهيدية I** للانقسام المنصف لدى أنثى $F_1$ (نمطها $(G L // g l)$)، تقاربت الصبغيات المتماثلة مشكلة رباعيات، وحدث في $${recombPct} "%"$ من الخلايا **عبور صبغي (اختلاط داخل صبغي)** بتبادل قطعة كروماتيدية حاملة لأليل طول الأجنحة بين كروماتيدين غير شقيقين، مما أنتج أمشاجاً معاد تركيبها $(G l)$ و $(g L)$ بنسب متساوية ($${roundTo(recombPct / 2, 1)} "%"$ لكل منهما).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي صبغي آلية تشكل الأمشاج الأربعة عند أنثى $F_1$ $(G L // g l)$ موضحاً حالة عدم حدوث عبور وحالة حدوث عبور صبغي في التمهيدية I.`,
				answer: `الجزء الثالث — المخطط الصبغي التحصيلي:\n- خلية أم للأمشاج لدى أنثى $F_1$: زوج صبغي واحد يحمل $(G, L)$ على الصبغي الأول و $(g, l)$ على المتماثل.\n- المسار (1) دون عبور ($${parentPct} "%"$): تشكل أمشاج أبوية فقط $(G L)$ و $(g l)$.\n- المسار (2) بحدوث عبور في التمهيدية I ($${recombPct} "%"$): تصالب وتبادل قطعتي $L$ و $l$ بين الكروماتيدين الداخليين $arrow.r$ انفصال في الانفصالية I و II $arrow.r$ تشكل أمشاج جديدة التركيب $(G l)$ و $(g L)$ بالإضافة إلى الأبوية $arrow.r$ زيادة التنوع الوراثي للنسل عند الإلقاح.`,
				mark: '2.0'
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
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أعطى تضريب اختباري لذبابة الخل $${parentEach * 2}$ فرداً بتراكيب أبوية ($${parentPct}\\%$) و $${recombEach * 2}$ فرداً بتراكيب جديدة ($${recombPct}\\%$) من أصل $${total}$ فرد.\nما الفرضية المصادق عليها حول توضع المورثتين والآلية الصبغية؟`,
				questionTextAr: 'اختر الاستنتاج الصبغي المصادق عليه:',
				imageUrl: svgUrl,
				imageCaption: 'التضريب الاختباري وإثبات العبور الصبغي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ارتفاع التراكيب الأبوية ($${parentPct}\\% > 50\\%$) وقلة الجديدة ($${recombPct}\\% < 50\\%$) يثبتان أن المورثتين مرتبطتان على نفس الصبغي وحدث عبور صبغي (اختلاط داخل صبغي) في التمهيدية I.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أجريت تجارب التضريب الاختباري عند ذبابة الخل للكشف عن التوضع الصبغي للمورثات وإثبات دور الانقسام المنصف في التنوع الوراثي.`,
				content
			},
			hints: [
				'المورثات المستقلة تعطي دائماً 50% أبوية و 50% جديدة في التضريب الاختباري.',
				`احسب مجموع الأبوية ($${parentPct}\\%$) ومجموع الجديدة ($${recombPct}\\%$).`,
				'اربط التراكيب الجديدة القليلة بظاهرة العبور الصبغي في المرحلة التمهيدية I.'
			],
			solutionStepsAr: [
				'تحليل تجانس F₁ وتحديد السيادة وصياغة المشكل والفرضيتين (استقلالية مقابل ارتباط).',
				`حساب نسبتي الأبوية ($${parentPct}\\%$) والجديدة ($${recombPct}\\%$) والمصادقة على الارتباط الجزئي.`,
				'التفسير الصبغي للعبور في التمهيدية I وبناء المخطط التحصيلي.'
			],
			finalAnswer: `\\text{مورثتان مرتبطتان} + \\text{عبور صبغي } (${recombPct}\\%)`
		};
	}
};

export const SCIENCES_TEMPLATES_2AS_SE_T2: SciencesParameterizedTemplate[] = [
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T2[0], '2as_se'),
	tpl2asSeT2MeiosisMixingRecall,
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T2[1], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T2[2], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T2[3], '2as_se'),
	tpl2asSeT2TestCrossRecombinationApproach
];
