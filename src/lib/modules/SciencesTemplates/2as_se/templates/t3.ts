import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { buildMiniCodonTableRows, transcribeAndTranslate } from '../../bio-helpers';
import { SHARED_SCIENCES_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';
import {
	saveSciencesSvgAsset,
	svgBioFlowchart,
	svgGeneticsDiagram
} from '../../svg-sciences';

// ============================================================================
// 2AS SE Exclusive Templates — Trimester 3 (الطفرات المعمقة، المهق وتعدد الأليلات)
// ============================================================================

// SE Exclusive 1 — Recall (5 pts): Deep classification of mutations & polyallelism
export const tpl2asSeT3GenotypePhenotypeRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t3_genotype_phenotype_recall',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'الطفرات المعمقة: تصنيف الطفرات النقطية وعواقبها على البروتين وتعدد الأليلات',
	curriculumLessonId: 'sci_lesson_2as_se_t3_deep_mutations_polyallelism',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const exampleMut = rng.pick([
			{ from: 'GCU (Ala)', to: 'GCC (Ala)', kind: 'طفرة صامتة' },
			{ from: 'UGG (Trp)', to: 'UGA (STOP)', kind: 'طفرة غير معبرة (وقف مبكر)' },
			{ from: 'GAG (Glu)', to: 'GUG (Val)', kind: 'طفرة مغلوطة المعنى' }
		]);

		const svg = svgBioFlowchart({
			title: 'تصنيف العواقب الجزيئية للطفرات المورثية على البروتين',
			orientation: 'horizontal',
			steps: [
				{ label: 'طفرة صامتة', sublabel: 'نفس الحمض الأميني', color: '#15803d', bg: '#f0fdf4' },
				{ label: 'مغلوطة المعنى', sublabel: 'تغير حمض أميني واحد', color: '#b45309', bg: '#fffbeb' },
				{ label: 'غير معبرة', sublabel: 'توقف مبكر ← بروتين مبتور', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'طفرة إزاحة', sublabel: 'حذف/إضافة ← خلل شامل', color: '#7c3aed', bg: '#f5f3ff' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_se_t3_mut_class_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تحول الرامزة من ${exampleMut.from} إلى ${exampleMut.to} يمثّل: ${exampleMut.kind}`,
			[
				{
					text: `تحول الرامزة من ${exampleMut.from} إلى ${exampleMut.to} يمثّل دائماً طفرة إزاحة بالحذف`,
					diagnosticFeedback: 'طفرة الإزاحة تنتج عن حذف أو إضافة نيكليوتيدة، أما هنا فحدث استبدال قاعدة واحدة فقط.'
				},
				{
					text: 'كل طفرة استبدال نقطية تغيّر بالضرورة كل الأحماض الأمينية التي تليها في السلسلة',
					diagnosticFeedback: 'طفرة الاستبدال تمس رامزة واحدة فقط (وقد تكون صامتة فلا تغيّر شيئاً)؛ الإزاحة هي التي تغيّر كل ما بعدها.'
				},
				{
					text: 'لا تساهم الطفرات في ظهور تعدد الأليلات داخل الساكنة',
					diagnosticFeedback: 'تراكم الطفرات المختلفة في الخلايا الجنسية هو المصدر الأساسي لتعدد الأليلات (التنوع المورثي).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مخطط مقارن لأصناف الطفرات المورثية الأربعة وعواقبها الجزيئية',
				width: 370
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الوثيقة (1)، صنّف الطفرة التي حوّلت الرامزة ${exampleMut.from} إلى ${exampleMut.to} مع التعليل، ثم قارن في جملتين بين عاقبة «الطفرة الصامتة» وعاقبة «طفرة الإزاحة (حذف نيكليوتيدة واحدة)».`,
				answer: `1) التصنيف والمقارنة:\n- تصنيف الطفرة (${exampleMut.from} $arrow.r$ ${exampleMut.to}): هي **${exampleMut.kind}**.\n- المقارنة: **الطفرة الصامتة** تنتج عن استبدال يعطي رامزة مرادفة لنفس الحمض الأميني فلا تغيّر بنية البروتين ولا النمط الظاهري؛ بينما **طفرة الإزاحة** (حذف قاعدة واحدة) تزيح إطار قراءة جميع الرامزات الموالية فتغير معظم الأحماض الأمينية وتُفقد البروتين وظيفته (أو تُظهر رامزة توقف مبكرة).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تشرح فيه كيف تؤدي الطفرات المختلفة (الصامتة، المغلوطة، غير المعبرة، والإزاحة) إلى نشوء تعدد الأليلات وتنوع الأنماط الظاهرية داخل الساكنة، مبيناً شرط توريثها عبر الأجيال.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يُعدّ تعدد الأليلات لنفس المورثة (مثل مورثة الهيموغلوبين أو التيروزيناز) ركيزة التنوع الوراثي داخل النوع الحي. فما أنواع الطفرات المسؤولة عن هذا التعدد وما عواقبها على التعبير الظاهري وشرط انتقالها للأجيال؟\n- العرض: تحدث الطفرات كتغيرات مفاجئة في تتابع نيكليوتيدات الـ $upright("ADN")$ (استبدال، حذف، أو إضافة) تلقائياً أو تحت تأثير عوامل مطفّرة (كالأشعة UV). تتباين عواقبها الجزيئية بين أربع حالات: **طفرة صامتة** لا تغيّر الحمض الأميني (لترادف الشفرة)، **طفرة مغلوطة المعنى** تعوّض حمضاً أمينياً بآخر وقد تعدل وظيفة البروتين، **طفرة غير معبرة** تُنشئ رامزة توقف مبكرة فتنتج بروتيناً مبتوراً، و**طفرة إزاحة** (حذف/إضافة قاعدة) تُخلّ بإطار القراءة كاملاً. وتتحكم هذه التعديلات الجزيئية في المستويين الخلوي والعضوي، لكن الطفرة لا تصبح مصدراً لأليلات جديدة موروثة في الساكنة إلا إذا مست **الخلايا الجنسية** (الأمشاج) بخلاف الطفرات الجسمية التي لا تورّث.\n- الخاتمة: يولّد تراكم الطفرات الوراثية المتنوعة في الخلايا الجنسية تعدد الأليلات وتنوع الأنماط الظاهرية، ما يشكّل المادة الخام للتنوع البيولوجي.`,
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
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من تصنيف الطفرات النقطية (الوثيقة 1)، ما التصنيف الصحيح لتحول رامزة في $\\text{ARNm}$ من ${exampleMut.from} إلى ${exampleMut.to}؟`,
				questionTextAr: 'اختر التصنيف الجزيئي الصحيح للطفرة:',
				imageUrl: svgUrl,
				imageCaption: 'تصنيف العواقب الجزيئية للطفرات',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تحول ${exampleMut.from} إلى ${exampleMut.to} هو ${exampleMut.kind}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تؤدي الطفرات المورثية إلى عواقب متفاوتة الخطورة على البروتين والنمط الظاهري، وتفسّر تعدد الأليلات داخل الأنواع الحية (الوثيقة 1).`,
				content
			},
			hints: [
				'ميّز بين الأصناف الأربعة: صامتة (نفس الحمض)، مغلوطة (حمض آخر)، غير معبرة (STOP)، وإزاحة (حذف/إضافة).',
				'تذكّر شرط التوريث: الطفرة الجنسية فقط تورّث وتثري التنوع الأليلي في الساكنة.',
				'احرص على بناء النص العلمي بمقدمة + إشكالية، عرض منظم، وخاتمة.'
			],
			solutionStepsAr: [
				`تصنيف مثال الطفرة (${exampleMut.kind}) والمقارنة بين الصامتة والإزاحة.`,
				'صياغة النص العلمي المهيكل حول الأصناف الأربعة وتعدد الأليلات وشرط التوريث.'
			],
			finalAnswer: exampleMut.kind
		};
	}
};

// SE Exclusive 2 — Scientific Approach (8 pts): Albinism (Tyrosinase) Pedigree + Nonsense/Frameshift Mutation via transcribeAndTranslate
export const tpl2asSeT3AlbinismDeepMutationApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t3_albinism_deep_mutation_approach',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'المسعى العلمي المعمّق: الأصل الوراثي والجزيئي لمرض المهق (مورثة التيروزيناز وتعدد الأليلات)',
	curriculumLessonId: 'sci_lesson_2as_se_t3_deep_mutations_polyallelism',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Exact deterministic Tyrosinase coding fragments (3'->5' template strand):
		// Normal: TAC CGA ACC GGA TTA -> mRNA: AUG GCU UGG CCU AAU -> Met-Ala-Trp-Pro-Asn
		// Nonsense mutant (C->T at base 9 => ACC -> ACT => mRNA UGG -> UGA STOP!):
		//   TAC CGA ACT GGA TTA -> mRNA: AUG GCU UGA CCU AAU -> Met-Ala (STOP!)
		// Frameshift mutant (deletion of base 5 'G'):
		//   TAC CAA CCG GAT TA -> mRNA: AUG GUU GGC CUA A -> Met-Val-Gly-Leu (shifted!)
		const caseType = rng.pick<'nonsense' | 'frameshift'>(['nonsense', 'frameshift']);
		const normalDna = 'TACCGAACCGGATTA';
		const mutantDna = caseType === 'nonsense' ? 'TACCGAACTGGATTA' : 'TACCAACCGGATTAG';
		const norm = transcribeAndTranslate(normalDna);
		const mut = transcribeAndTranslate(mutantDna);
		const allCodons = Array.from(new Set([...norm.codons, ...mut.codons]));
		const miniTable = buildMiniCodonTableRows(allCodons);

		const svgPed = svgGeneticsDiagram('pedigree_chart', {
			title: 'شجرة نسب عائلة ظهر فيها مرض المهق (الوثيقة 1)'
		});
		const svgPedUrl = saveSciencesSvgAsset(`sci_2as_se_t3_albinism_ped_s${seed}_${difficulty}`, svgPed);

		const mutDescAr =
			caseType === 'nonsense'
				? 'طفرة استبدال غير معبرة (استبدال C بـ T في النيكليوتيدة 9) أظهرت رامزة توقف مبكرة UGA فأنتجت إنزيم تيروزيناز مبتوراً (2 حمض أميني فقط بدل السلسلة الكاملة)'
				: 'طفرة إزاحة بحذف النيكليوتيدة رقم 5 (G) غيّرت إطار قراءة جميع الرامزات التالية فأنتجت سلسلة ببتيدية متغيرة تماماً وغير وظيفية';

		const mcq = buildUniqueMcqOptions(
			`الأليل الممرض متنحٍ (الأبوان السليمان هجينان $T//t$)، وسببه الجزيئي: ${mutDescAr}`,
			[
				{
					text: 'الأليل الممرض سائد لأن البنت المصابة ورثته عن أبويها السليمين',
					diagnosticFeedback: 'إنجاب أبوين سليمين لبنت مصابة يثبت قطعاً أن الأليل الممرض متنحٍ وأن الأبوين هجينان!'
				},
				{
					text: 'حدثت طفرة صامتة لم تغيّر سلسلة الأحماض الأمينية لإنزيم التيروزيناز',
					diagnosticFeedback: `قارن السلسلة الطبيعية (${norm.peptideStr}) بالسلسلة الطافرة (${mut.peptideStr}): التغير الجزيئي واضح وشديد!`
				},
				{
					text: 'المهق ناتج عن غياب صبغي كامل في الطابع النووي وليس عن طفرة مورثية',
					diagnosticFeedback: 'الوثائق تثبت أن السبب طفرة نقطية في مورثة التيروزيناز.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): المهق (Albinisme) مرض وراثي يتميز بغياب صباغ الميلانين في الجلد والشعر والقزحية. تمثل الوثيقة (1) شجرة نسب عائلة أنجب فيها أبوان سليمان بنتاً مصابة بالمهق.`
			},
			{
				type: 'image',
				src: svgPedUrl,
				caption: 'الوثيقة (1): شجرة نسب عائلة ظهر فيها مرض المهق في الجيل II',
				width: 350
			},
			{
				type: 'text',
				content: `1) استغل شجرة النسب في الوثيقة (1) لتحديد هل الأليل الممرض سائد أم متنحٍ، واكتب النمط المورثي للأبوين (I) وللبنت المصابة (II) (نرمز للأليل العادي $T$ والطافر $t$).`,
				answer: `1) تحليل شجرة النسب:\n- بما أن الأبوين في الجيل (I) سليمان وأنجبا بنتاً مصابة في الجيل (II)، فإن الأليل الممرض **متنحٍ ($t$)** وكان خفياً لدى الأبوين (الهجينين)، والأليل العادي **سائد ($T$)**.\n- الأنماط المورثية: الأبوان $T//t$ و $T//t$؛ البنت المصابة $t//t$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) علماً أن تركيب الميلانين يتطلب تدخل إنزيم **التيروزيناز** (الذي يحول التيروزين إلى ميلانين)، اقترح فرضيتين جزيئيتين تفسّران سبب غياب الميلانين عند البنت المصابة ($t//t$).`,
				answer: `2) الفرضيتان:\n- الفرضية 1: حدوث طفرة (غير معبرة أو إزاحة) في مورثة التيروزيناز أدت إلى إنتاج إنزيم مبتور أو مشوه غير وظيفي فعجزت الخلايا الصباغية عن تركيب الميلانين.\n- الفرضية 2: إنزيم التيروزيناز سليم تماماً لكن الخلايا الصباغية تفتقر كلياً إلى الحمض الأميني التيروزين في الغذاء.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، عُيّر التيروزين في دم البنت المصابة فكان طبيعياً، وتم تحديد تتابع قطعة من السلسلة المستنسخة للـ $upright("ADN")$ ($3' arrow.r 5'$) لأليل التيروزيناز العادي ($T$) والأليل الطافر ($t$) مع جدول الشفرة الوراثية المصغر:`
			},
			{
				type: 'text',
				content: `- الأليل العادي $T$ ($3' arrow.r 5'$): ${norm.dnaTriplets.join(' - ')}\n- الأليل الطافر $t$ ($3' arrow.r 5'$): ${mut.dnaTriplets.join(' - ')}`
			},
			{
				type: 'table',
				headers: miniTable.headers,
				cells: [],
				rows: miniTable.rows
			},
			{
				type: 'text',
				content: `1) استخرج سلسلة الـ $upright("ARNm")$ ($5' arrow.r 3'$) وتتابع الأحماض الأمينية الموافق لكل من الأليل العادي $T$ والأليل الطافر $t$.`,
				answer: `1) التعبير المورثي:\n- الأليل العادي $T$:\n  • $upright("ARNm")$: ${norm.codons.join(' - ')}\n  • الببتيد: ${norm.peptideStr}\n- الأليل الطافر $t$:\n  • $upright("ARNm")$: ${mut.codons.join(' - ')}\n  • الببتيد: ${mut.peptideStr} ${caseType === 'nonsense' ? '(توقف مبكر عند الرامزة 3: UGA = STOP!)' : '(سلسلة متغيرة تماماً بعد الحمض الأميني 1!)'}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حدّد نوع وموقع الطفرة بدقة، ثم صادق على الفرضية الصحيحة مبرزاً العلاقة بين مستويات النمط الظاهري في مرض المهق.`,
				answer: `2) تحديد الطفرة والمصادقة:\n- نوع وموقع الطفرة: **${mutDescAr}**.\n- المصادقة: توفر التيروزين في الدم وتغير بنية الإنزيم يدحضان الفرضية (2) و**يصادقان على الفرضية (1)**.\n- ربط المستويات: طفرة في الـ $upright("ADN")$ (نمط مورثي $t//t$) $arrow.r$ تيروزيناز غير وظيفي (جزيئي) $arrow.r$ عدم تركيب الميلانين في الخلايا الصباغية (خلوي) $arrow.r$ بياض الجلد والشعر وحساسية العين للضوء (عضوي).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي وظيفي سلسلة الأحداث من الطفرة في مورثة التيروزيناز إلى ظهور النمط الظاهري للمهق عند البنت المصابة ($t//t$).`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[مورثة التيروزيناز العادية (T)] --(${caseType === 'nonsense' ? 'طفرة استبدال C ← T غير معبرة' : 'طفرة حذف قاعدة G (إزاحة)'})--> [أليل طافر متنحٍ (t)] --(وراثة أليلين متنحيين من أبوين هجينين: t//t)--> [تركيب إنزيم تيروزيناز ${caseType === 'nonsense' ? 'مبتور' : 'مشوه'} غير وظيفي] $arrow.r$ [توقف تحويل التيروزين إلى ميلانين] $arrow.r$ [غياب الصباغ في الخلايا الصباغية وظهور مرض المهق].`,
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
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أنجب أبوان سليمان بنتاً مصابة بالمهق (الوثيقة 1)، وأظهرت مقارنة السلسلة المستنسخة للتيروزيناز: العادي (${norm.dnaTriplets.join('-')}) والطافر (${mut.dnaTriplets.join('-')}).\nما الاستنتاج الوراثي والجزيئي المصادق عليه؟`,
				questionTextAr: 'اختر الاستنتاج الدقيق من شجرة النسب والتتابع الجزيئي:',
				imageUrl: svgPedUrl,
				imageCaption: 'شجرة نسب عائلة مصابة بمرض المهق',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الأليل الطافر متنحٍ لأن الأبوين السليمين هجينان ($T//t$)، وبمقارنة التتابعين نجد ${mutDescAr} (السلسلة العادية: ${norm.peptideStr} مقابل الطافرة: ${mut.peptideStr}).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُظهر مرض المهق تعدد الأليلات الممرضة لمورثة واحدة هي مورثة إنزيم التيروزيناز. لتحديد الأصل الوراثي والجزيئي لحالة عائلية ندرس الوثيقة (1) والتتابعات النيكليوتيدية التالية.`,
				content
			},
			hints: [
				'أبوان سليمان + طفل مصاب = أليل متنحٍ دوماً وأبوان هجينان.',
				'حوّل السلسلة المستنسخة $3\'\\rightarrow 5\'$ إلى $\\text{ARNm}$ ($5\'\\rightarrow 3\'$) ثم استعن بجدول الشفرة المصغر.',
				caseType === 'nonsense' ? 'انتبه لظهور رامزة التوقف UGA عند الرامزة الثالثة!' : 'انتبه لتغير طول وتركيب الثلاثيات بعد موضع الحذف (إزاحة إطار القراءة)!'
			],
			solutionStepsAr: [
				'إثبات تنحي الأليل وتحديد الأنماط المورثية ($T//t$ للأبوين و $t//t$ للبنت).',
				`ترجمة الأليلين: العادي (${norm.peptideStr}) والطافر (${mut.peptideStr}).`,
				`المصادقة على الفرضية (1) بتحديد ${caseType === 'nonsense' ? 'الطفرة غير المعبرة' : 'طفرة الإزاحة بالحذف'} وبناء المخطط التحصيلي.`
			],
			finalAnswer: caseType === 'nonsense' ? 'أليل متنحٍ + طفرة غير معبرة (UGA STOP)' : 'أليل متنحٍ + طفرة إزاحة بحذف (G)'
		};
	}
};

export const SCIENCES_TEMPLATES_2AS_SE_T3: SciencesParameterizedTemplate[] = [
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T3[0], '2as_se'),
	tpl2asSeT3GenotypePhenotypeRecall,
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T3[1], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T3[2], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T3[3], '2as_se'),
	tpl2asSeT3AlbinismDeepMutationApproach
];
