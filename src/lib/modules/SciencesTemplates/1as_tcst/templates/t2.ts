import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { BIO_EQUATIONS } from '../../bio-helpers';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
	svgCellUltrastructure,
	svgPlantAndPrimaryDiagram
} from '../../svg-sciences';

// ============================================================================
// 6 Parameterized ONEC Templates — 1AS TCST Trimester 2
// (2 recall 5 pts, 2 reasoning 7 pts, 2 scientific_approach 8 pts)
// ============================================================================

// 1. Recall (5 pts): Stomata, Xylem & Mineral/Carbon supply
export const tpl1asTcstT2StomataXylemRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_stomata_xylem_recall',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'دخول المواد المعدنية والكربونية للنبات: الأوعية الخشبية والثغور الورقية',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_raw_sap_xylem_stomata',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const stomataLower = rng.pick(difficulty === 'easy' ? [220, 260] : [240, 280, 320]);
		const stomataUpper = rng.pick([15, 25, 30]);

		const svg = svgPlantAndPrimaryDiagram('stomata_sap', {
			title: 'امتصاص الماء والأملاح ودخول الغاز الكربوني في النبات الأخضر'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_stomata_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تتركز الثغور أساساً في البشرة السفلية ($${stomataLower}/\\text{mm}^2$) لتأمين دخول $\\text{CO}_2$ مع تقليل فقدان الماء بالنتح`,
			[
				{
					text: 'تمتص الأوراق الماء والأملاح المعدنية من الهواء عبر الثغور عوض الجذور',
					diagnosticFeedback: 'الماء والأملاح المعدنية يُمتصان من التربة عبر الأوبار الماصة ويصعدان في الأوعية الخشبية.'
				},
				{
					text: 'تمنع الثغور دخول غاز $\\text{CO}_2$ وتسمح فقط بخروج النسغ الكامل',
					diagnosticFeedback: 'الثغور هي المنفذ الرئيسي لدخول غاز CO₂ الضروري لتركيب المادة العضوية.'
				},
				{
					text: 'الأوعية الخشبية خلايا حية مثقبة الجدران العرضية تنقل السكروز نحو الجذور',
					diagnosticFeedback: 'هذه بنية الأوعية اللحائية، أما الأوعية الخشبية فخلايا ميتة مدعمة بالخشبين تنقل النسغ الناقص صعوداً.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مخطط يوضح تغذية النبات الأخضر بالمواد المعدنية والغازية',
				width: 350
			},
			{
				type: 'text',
				content: `1) أظهر عدّ الثغور في ورقة نبات بري وجود $${stomataLower}$ ثغراً/$"mm"^2$ في الوجه السفلي مقابل $${stomataUpper}$ ثغراً/$"mm"^2$ في الوجه العلوي. صف بنية الثغر الورقي وبنية الوعاء الخشبي، ثم فسّر كثافة الثغور في الوجه السفلي.`,
				answer: `1) البنية والتفسير:\n- بنية الثغر: خليتان حارستان كلويتا الشكل (جدارهما الداخلي سميك والخلفي رقيق) تحويان صانعات خضراء وتحصران فتحة الثغر التي تشرف على غرفة تحت ثغرية.\n- بنية الوعاء الخشبي: صف طولي من خلايا ميتة متطاولة زالت جدرانها العرضية وهيولاها وتدعمت جدرانها الجانبية بالخشبين لتنقل النسغ الناقص صعوداً.\n- تفسير الكثافة السفلية ($${stomataLower}$ مقابل $${stomataUpper}$): الوجه السفلي أقل عرضة مباشرة لأشعة الشمس الحارة، ما يسمح بدخول $upright("CO")_2$ بكفاءة مع تقليص ضياع الماء المفرط بظاهرة النتح.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً توضح فيه كيف يحصل النبات الأخضر على الماء والأملاح المعدنية وغاز $upright("CO")_2$ لتوفير المواد الأولية للتركيب الضوئي.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يُعدّ النبات الأخضر كائناً ذاتي التغذية يركّب مادته العضوية انطلاقاً من مواد معدنية بسيطة. فكيف تصل هذه المواد المعدنية والغازية إلى النسيج اليخضوري للورقة؟\n- العرض: تمتص الأوبار الماصة في المنطقة الوبرية للجذر الماء والأملاح المعدنية من التربة مشكّلة النسغ الناقص، الذي يصعد عبر الأوعية الخشبية الميتة المدعمة بالخشبين نحو الأوراق تحت تأثير قوة الشدّ الناتجة عن النتح. في المقابل، تنفتح الثغور الورقية نهاراً فتسمح بدخول غاز $upright("CO")_2$ الجوي (المصدر الوحيد للكربون العضوي) إلى الغرفة تحت الثغرية ثم إلى الخلايا اليخضورية الغنية بالصانعات الخضراء.\n- الخاتمة: يتكامل عمل الأوبار الماصة والأوعية الخشبية والثغور الورقية لتوفير الماء والأملاح و $upright("CO")_2$ الضرورية لعملية التركيب الضوئي.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `في ورقة نبات بري يوجد $${stomataLower}$ ثغراً/$\\text{mm}^2$ على الوجه السفلي مقابل $${stomataUpper}$ ثغراً/$\\text{mm}^2$ على الوجه العلوي.\nما العبارة العلمية الصحيحة حول دور الثغور والأوعية الخشبية؟`,
				questionTextAr: 'اختر العبارة الصحيحة حول التغذية المعدنية والكربونية للنبات:',
				imageUrl: svgUrl,
				imageCaption: 'النسغ الناقص ودخول CO₂ عبر الثغور',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الثغور المتركزة بالوجه السفلي ($${stomataLower}/\\text{mm}^2$) تؤمن دخول $\\text{CO}_2$ والنتح مع حماية الورقة من الجفاف المفرط، بينما تنقل الأوعية الخشبية الماء والأملاح صعوداً.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يحتاج النبات الأخضر لبناء مادته العضوية إلى إمداد مستمر بالنسغ الناقص وبغاز ثنائي أكسيد الكربون. تمثل الوثيقة (1) التغذية المعدنية والغازية للنبات.`,
				content
			},
			hints: [
				'ميّز بين منفذ الماء والأملاح (الأوبار الماصة ← الأوعية الخشبية) ومنفذ CO₂ (الثغور الورقية).',
				'اربط قلة الثغور في الوجه العلوي بتجنب التبخر المفرط تحت الشمس المباشرة.',
				'احرص في النص العلمي على الربط الوظيفي بين الجذر والساق والورقة.'
			],
			solutionStepsAr: [
				'وصف بنية الثغر (خليتان حارستان + فتحة) وبنية الوعاء الخشبي (خلايا ميتة متخشبة).',
				`تفسير ارتفاع كثافة الثغور في الوجه السفلي ($${stomataLower}$ مقابل $${stomataUpper}$).`,
				'كتابة النص العلمي المهيكل حول مسار النسغ الناقص وغاز CO₂.'
			],
			finalAnswer: 'الأوبار الماصة والخشب (نسغ ناقص) + الثغور السفلية (CO₂)'
		};
	}
};

// 2. Recall (5 pts): Chloroplast ultrastructure & photosynthesis conditions/products
export const tpl1asTcstT2ChloroplastRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_chloroplast_photosynthesis_recall',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'bioenergetics',
	titleAr: 'الصانعة الخضراء وشروط ونواتج تحويل الطاقة الضوئية إلى كيميائية كامنة',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_chlorophyll_photosynthesis',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const glucoseMols = rng.pick(difficulty === 'easy' ? [1, 2] : [2, 3, 4]);
		const co2Mols = glucoseMols * 6;
		const o2Mols = glucoseMols * 6;

		const svg = svgCellUltrastructure('chloroplast', {
			numbered: true,
			title: 'رسم تخطيطي لبنية الصانعة الخضراء (مقر التركيب الضوئي)'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_chloroplast_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تركيب $${glucoseMols}\\text{ mol}$ غلوكوز يتطلب امتصاص $${co2Mols}\\text{ mol}$ من $\\text{CO}_2$ ويحرر $${o2Mols}\\text{ mol}$ من $\\text{O}_2$ داخل الصانعة الخضراء`,
			[
				{
					text: `تركيب $${glucoseMols}\\text{ mol}$ غلوكوز يتطلب $${glucoseMols}\\text{ mol}$ من $\\text{CO}_2$ ويحرر $${glucoseMols}\\text{ mol}$ من $\\text{O}_2$`,
					diagnosticFeedback: 'كل جزيئة غلوكوز C₆H₁₂O₆ تحتوي 6 ذرات كربون فتتطلب 6 جزيئات CO₂.'
				},
				{
					text: `يتم التقاط الطاقة الضوئية في الميتوكوندري ويُطرح غاز $\\text{CO}_2$`,
					diagnosticFeedback: 'الميتوكوندري مقر التنفس وليس التركيب الضوئي؛ التركيب الضوئي يتم في الصانعة الخضراء ويطرح O₂.'
				},
				{
					text: `حبيبات النشاء تتشكل في الظلام التام عند غياب اليخضور`,
					diagnosticFeedback: 'النشاء ناتج للتركيب الضوئي الذي يشترط الضوء واليخضور وCO₂ والماء.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): رسم تخطيطي مرقّم لفوق بنية الصانعة الخضراء',
				width: 350
			},
			{
				type: 'text',
				content: `1) تعرّف على البيانات المرقمة من $1$ إلى $5$ في الوثيقة (1)، ثم اكتب المعادلة الإجمالية للتركيب الضوئي وحدّد عدد مولات $upright("CO")_2$ الممتصة و $upright("O")_2$ المطروحة لتركيب $${glucoseMols}" mol"$ من الغلوكوز.`,
				answer: `1) البيانات والمعادلة:\n- البيانات: 1: غشاء خارجي وداخلي (غلاف مزدوج) | 2: كييسات التيلاكوئيد (تحوي اليخضور) | 3: حبيبة نشاء | 4: $upright("ADN")$ حلقي | 5: الحشوة (الستروما).\n- المعادلة الإجمالية: ${BIO_EQUATIONS.photosynthesisSimple.typst}\n- لتركيب $${glucoseMols}" mol"$ من الغلوكوز يلزم امتصاص $${co2Mols}" mol"$ من $upright("CO")_2$ ويُطرح $${o2Mols}" mol"$ من $upright("O")_2$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تبيّن فيه شروط ونواتج التركيب الضوئي وأهمية الصانعة الخضراء كبوابة لدخول الطاقة الضوئية إلى العالم الحي.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: تمثل النباتات اليخضورية المنتج الأولي للمادة العضوية في الأنظمة البيئية بفضل عضيات متخصصة هي الصانعات الخضراء. فما شروط ونواتج التركيب الضوئي وكيف تحوّل الصانعة الخضراء الطاقة الضوئية؟\n- العرض: يشترط التركيب الضوئي توفر أربعة عوامل أساسية: الضوء (مصدر الطاقة)، اليخضور (اللاقط الضوئي المثبت على أغشية التيلاكوئيدات)، غاز $upright("CO")_2$ (مصدر الكربون)، والماء والأملاح المعدنية. داخل الصانعة الخضراء تُلتقط الإشعاعات الضوئية الفعالة (الزرقاء والحمراء) وتُحوَّل طاقتها إلى طاقة كيميائية كامنة مخزنة في روابط الجزيئات العضوية المركبة (الغلوكوز الذي يتكاثف مؤقتاً كحبيبات نشاء داخل الحشوة)، مع طرح غاز $upright("O")_2$ الضروري لتنفس الكائنات الحية.\n- الخاتمة: تعدّ الصانعة الخضراء المصنع الحيوي الوحيد الذي يحول الطاقة الضوئية إلى طاقة كيميائية كامنة تغذي جميع مستويات السلسلة الغذائية.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من معادلة التركيب الضوئي داخل الصانعة الخضراء (الوثيقة 1)، ما الحصيلة الغازية لتركيب $${glucoseMols}\\text{ mol}$ من الغلوكوز ($\\text{C}_6\\text{H}_{12}\\text{O}_6$)؟`,
				questionTextAr: 'اختر الإجابة الصحيحة حول الحصيلة الكيميائية ومقر التركيب الضوئي:',
				imageUrl: svgUrl,
				imageCaption: 'فوق بنية الصانعة الخضراء المرقمة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حسب المعادلة $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$، يتطلب تركيب $${glucoseMols}\\text{ mol}$ غلوكوز امتصاص $${co2Mols}\\text{ mol}$ من $\\text{CO}_2$ ويحرر $${o2Mols}\\text{ mol}$ من $\\text{O}_2$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتميز الخلايا النباتية اليخضورية باحتوائها على عضيات خضراء خاصة تُدعى الصانعات الخضراء، تشكل مقر ظاهرة التركيب الضوئي (الوثيقة 1).`,
				content
			},
			hints: [
				'تذكّر الأجزاء الخمسة للصانعة: غلاف مزدوج، تيلاكوئيدات (صفائح)، حبيبة نشاء، ADN حلقي، وحشوة.',
				'كل 1 مول غلوكوز يقابله 6 مول CO₂ ممتص و 6 مول O₂ مطروح.',
				'أبرز في النص العلمي التحول الطاقوي: طاقة ضوئية ← طاقة كيميائية كامنة.'
			],
			solutionStepsAr: [
				'التعرف على البيانات الخمسة للصانعة الخضراء.',
				`كتابة معادلة التركيب الضوئي وحساب $${co2Mols}\\text{ mol}\\,\\text{CO}_2$ و $${o2Mols}\\text{ mol}\\,\\text{O}_2$.`,
				'تحرير النص العلمي المهيكل حول شروط ونواتج ودور الصانعة الخضراء.'
			],
			finalAnswer: `${co2Mols}\\text{ mol CO}_2 \\rightarrow ${glucoseMols}\\text{ mol C}_6\\text{H}_{12}\\text{O}_6 + ${o2Mols}\\text{ mol O}_2`
		};
	}
};

// 3. Reasoning (7 pts): Chlorophyll absorption spectrum vs action spectrum
export const tpl1asTcstT2AbsorptionSpectrumReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_absorption_spectrum_reasoning',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'bioenergetics',
	titleAr: 'الاستدلال العلمي: تحليل طيف امتصاص اليخضور وطيف النشاط التركيبي',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_chlorophyll_photosynthesis',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const bluePeak = rng.pick(difficulty === 'easy' ? [90, 95] : [88, 92, 96]);
		const redPeak = rng.pick(difficulty === 'easy' ? [75, 80] : [74, 78, 82]);
		const greenMin = rng.pick([6, 8, 10]);

		const svg = svgBioCurvePlot({
			xMin: 400,
			xMax: 700,
			yMin: 0,
			yMax: 100,
			xStep: 50,
			yStep: 20,
			xLabel: 'λ (nm)',
			yLabel: 'A (%)',
			title: 'طيف امتصاص اليخضور الخام وشدة انطلاق الأكسجين',
			shadedZones: [
				{ x1: 400, x2: 470, fill: 'rgba(59,130,246,0.13)', label: 'أزرق', textColor: '#1d4ed8' },
				{ x1: 515, x2: 585, fill: 'rgba(34,197,94,0.12)', label: 'أخضر', textColor: '#15803d' },
				{ x1: 630, x2: 700, fill: 'rgba(239,68,68,0.13)', label: 'أحمر', textColor: '#dc2626' }
			],
			curves: [
				{
					fn: (l) =>
						(bluePeak - greenMin) * Math.exp(-Math.pow((l - 435) / 26, 2)) +
						(redPeak - greenMin) * Math.exp(-Math.pow((l - 665) / 24, 2)) +
						greenMin,
					color: '#15803d',
					label: 'طيف الامتصاص'
				},
				{
					fn: (l) =>
						(bluePeak - greenMin - 4) * Math.exp(-Math.pow((l - 440) / 28, 2)) +
						(redPeak - greenMin - 4) * Math.exp(-Math.pow((l - 665) / 26, 2)) +
						Math.max(3, greenMin - 2),
					color: '#2563eb',
					dashed: true,
					label: 'طيف النشاط'
				}
			],
			points: [
				{ x: 435, y: bluePeak, label: `${bluePeak}%`, color: '#1d4ed8' },
				{ x: 550, y: greenMin, label: `${greenMin}%`, color: '#15803d' },
				{ x: 665, y: redPeak, label: `${redPeak}%`, color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_spectrum_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`التطابق التام بين ذروتي الامتصاص ($${bluePeak}\\%$ في الأزرق و $${redPeak}\\%$ في الأحمر) وطيف النشاط يثبت أن اليخضور هو لاقط الإشعاعات الفعالة`,
			[
				{
					text: `الإشعاعات الخضراء ($550\\text{ nm}$) هي الأكثر فعالية في التركيب الضوئي بنسبة $${greenMin}\\%$`,
					diagnosticFeedback: 'الإشعاع الأخضر هو الأقل امتصاصاً والأضعف فعالية لأن اليخضور يعكسه.'
				},
				{
					text: 'لا توجد أي علاقة بين الإشعاعات التي يمتصها اليخضور وشدة انطلاق الأكسجين',
					diagnosticFeedback: 'المنحنيان متطابقان تماماً في الذرى والانخفاضات، مما يثبت علاقة سببية مباشرة.'
				},
				{
					text: 'يمتص اليخضور جميع أطوال الموجات بنفس النسبة الثابتة',
					diagnosticFeedback: `يتذبذب الامتصاص بشدة من ${bluePeak}% في الأزرق إلى ${greenMin}% في الأخضر ثم ${redPeak}% في الأحمر.`
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): لمعرفة الإشعاعات الضوئية الأكثر فعالية في التركيب الضوئي، قيس طيف امتصاص محلول اليخضور الخام وشدة انطلاق الأكسجين (طيف النشاط) لطحلب أخضر عند مختلف أطوال الموجات (الوثيقة 1).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مقارنة طيف امتصاص اليخضور الخام بطيف النشاط التركيبي',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل طيف امتصاص اليخضور الخام في الوثيقة (1) محدداً أطوال الموجات ذات الامتصاص الأعظمي والأدنى.`,
				answer: `1) تحليل طيف الامتصاص:\n- يمتص اليخضور الخام بشدة الإشعاعات الطرفية للطيف المرئي: ذروة أولى عظمى في الأزرق-البنفسجي ($435" nm"$) بنسبة $${bluePeak} "%"$، وذروة ثانية قوية في الأحمر ($665" nm"$) بنسبة $${redPeak} "%"$.\n- ينخفض الامتصاص بشدة في الإشعاعات الوسطية (الأخضر والأصفر حول $550" nm"$) ليصل إلى أدنى قيمة $${greenMin} "%"$ فقط.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) قارن بين طيف الامتصاص وطيف النشاط التركيبي، ثم استنتج دور اليخضور في النبات الأخضر وسبب اللون الأخضر للأوراق.`,
				answer: `2) المقارنة والاستنتاج:\n- المقارنة: نلاحظ **تطابقاً تاماً** بين المنحنيين؛ فحيث يكون امتصاص اليخضور أعظمياً (الأزرق والأحمر) يكون انطلاق $upright("O")_2$ أعظمياً، وحيث ينخفض الامتصاص (الأخضر) تضعف شدة التركيب الضوئي.\n- الاستنتاج: يعمل اليخضور **كلاقط للطاقة الضوئية** للإشعاعات الأكثر فعالية (الزرقاء والحمراء)، وتظهر الأوراق خضراء لأن اليخضور يعكس معظم الإشعاعات الخضراء ($${100 - greenMin} "%"$ تقريباً غير ممتصة).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): أُضيء طحلب أخضر (سبيروجيرا) بثلاثة أضواء وحيدة اللون متساوية الشدة (أزرق $435" nm"$، أخضر $550" nm"$، أحمر $665" nm"$) في وسط غني بـ $upright("CO")_2$ وبكتيريا هوائية محبة للأكسجين (تجربة أنغلمان).`
			},
			{
				type: 'table',
				headers: ['طول الموجة الضوئية', 'لون الإشعاع', 'كثافة البكتيريا الهوائية حول الطحلب', 'اختبار النشاء بماء اليود'],
				cells: [],
				rows: [
					['435 nm', 'أزرق-بنفسجي', 'كثيفة جداً (+++)', 'أزرق بنفسجي قاتم'],
					['550 nm', 'أخضر', 'نادرة جداً (+)', 'تلون باهت جداً'],
					['665 nm', 'أحمر', 'كثيفة (++)', 'أزرق بنفسجي واضح']
				]
			},
			{
				type: 'text',
				content: `1) فسّر اختلاف كثافة تجمع البكتيريا الهوائية ونتيجة ماء اليود عند الإشعاعات الثلاثة.`,
				answer: `1) التفسير:\n- تتجمع البكتيريا الهوائية بكثافة في الأزرق ($435" nm"$) والأحمر ($665" nm"$) لأن امتصاص اليخضور فيهما قوي ($${bluePeak} "%"$ و $${redPeak} "%"$), ما يرفع شدة التركيب الضوئي فينطلق $upright("O")_2$ بكثرة (يجذب البكتيريا) ويُركب النشاء بغزارة (تلون قاتم بماء اليود).\n- في الأخضر ($550" nm"$) الامتصاص ضئيل ($${greenMin} "%"$), فينطلق القليل جداً من $upright("O")_2$ ويضعف تركيب النشاء.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اقترح تطبيقاً عملياً في الزراعة الحديثة داخل البيوت البلاستيكية (أو المزارع العمودية) بالاعتماد على هذه النتائج الطيفية.`,
				answer: `2) التطبيق العملي: استعمال مصابيح اصطناعية (LED زراعية) تصدر أساساً إشعاعات **زرقاء وحمراء** لتعظيم شدة التركيب الضوئي ومردود الكتلة الحيوية مع اقتصاد الطاقة الكهربائية بدل إهدارها في الضوء الأخضر قليل النجاعة.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `يُظهر طيف امتصاص اليخضور الخام ذروتين عند $435\\text{ nm}$ ($${bluePeak}\\%$) و $665\\text{ nm}$ ($${redPeak}\\%$) وقاعاً عند $550\\text{ nm}$ ($${greenMin}\\%$)، متطابقاً مع منحنى انطلاق $\\text{O}_2$.\nما الاستنتاج العلمي الدقيق؟`,
				questionTextAr: 'اختر الاستنتاج الصحيح من مقارنة الطيفين:',
				imageUrl: svgUrl,
				imageCaption: 'طيف الامتصاص وطيف النشاط التركيبي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تطابق ذرى الامتصاص ($${bluePeak}\\%$ أزرق، $${redPeak}\\%$ أحمر) مع ذرى انطلاق $\\text{O}_2$ يثبت أن اليخضور يلتقط الإشعاعات الفعالة للتركيب الضوئي بينما يعكس الأخضر ($${greenMin}\\%$ فقط امتصاصاً).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لا تستغل النباتات الخضراء جميع إشعاعات الضوء الأبيض بنفس الفعالية. لدراسة العلاقة بين طبيعة الإشعاع الضوئي والتركيب الضوئي ندرس الوثيقة (1) ونتائج تجربة أنغلمان.`,
				content
			},
			hints: [
				'اقرأ الذروتين عند 435 nm و 665 nm والقاع عند 550 nm بدقة.',
				'تجمع البكتيريا الهوائية مؤشر مباشر على غزارة غاز O₂ المنطلق.',
				'اربط اللون الأخضر للنبات بعكس الإشعاعات الخضراء غير الممتصة.'
			],
			solutionStepsAr: [
				`تحليل طيف الامتصاص: ذروتان عند 435 nm ($${bluePeak}\\%$) و665 nm ($${redPeak}\\%$) وأدنى قيمة في الأخضر ($${greenMin}\\%$).`,
				'استنتاج تطابق طيف الامتصاص مع طيف النشاط ودور اليخضور كلاقط ضوئي.',
				'تفسير تجربة أنغلمان واقتراح إضاءة LED حمراء-زرقاء للزراعة المحمية.'
			],
			finalAnswer: `\\text{الأزرق } (${bluePeak}\\%) \\text{ والأحمر } (${redPeak}\\%) \\text{ هما الأكثر فعالية}`
		};
	}
};

// 4. Reasoning (7 pts): Limiting factor curves (CO2 & Light intensity)
export const tpl1asTcstT2LimitingFactorReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_limiting_factor_reasoning',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'الاستدلال العلمي: تحليل منحنيات العوامل المناخية وتحديد العامل المحدد',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_climatic_factors_limiting',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vMaxLow = rng.pick(difficulty === 'easy' ? [40, 45] : [38, 44, 48]);
		const vMaxHigh = rng.pick(difficulty === 'easy' ? [85, 90] : [82, 88, 94]);
		const gainPct = roundTo(((vMaxHigh - vMaxLow) / vMaxLow) * 100, 0);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 0.16,
			yMin: 0,
			yMax: 105,
			xStep: 0.04,
			yStep: 20,
			xLabel: 'CO2 (%)',
			yLabel: 'V (u.a)',
			title: 'تغير شدة التركيب الضوئي بدلالة نسبة الكربون عند شدتي إضاءة',
			curves: [
				{
					fn: (c) => vMaxHigh * (1 - Math.exp(-26 * c)),
					color: '#dc2626',
					label: 'إضاءة قوية'
				},
				{
					fn: (c) => vMaxLow * (1 - Math.exp(-34 * c)),
					color: '#2563eb',
					dashed: true,
					label: 'إضاءة ضعيفة'
				}
			],
			dashedGuides: [
				{ x1: 0.03, y1: 0, x2: 0.03, y2: vMaxHigh * 0.55, color: '#0f766e', label: 'الهواء 0.03%' }
			],
			points: [
				{ x: 0.14, y: roundTo(vMaxHigh * 0.97, 1), label: `${vMaxHigh} u.a`, color: '#dc2626' },
				{ x: 0.14, y: roundTo(vMaxLow * 0.99, 1), label: `${vMaxLow} u.a`, color: '#2563eb' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_limiting_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`عند $0.14\\%$ من $\\text{CO}_2$ تصبح الإضاءة هي العامل المحدد في المنحنى الأزرق (ثبات عند $${vMaxLow}\\text{ u.a}$ مقابل $${vMaxHigh}\\text{ u.a}$ بالإضاءة القوية)`,
			[
				{
					text: `عند $0.14\\%$ من $\\text{CO}_2$ يبقى نقص $\\text{CO}_2$ هو العامل المحدد في المنحنى الأزرق`,
					diagnosticFeedback: 'عند 0.14% أصبح CO₂ متوفراً بكثرة وثبت المنحنى الأزرق، فالعامل المحدد هو الإضاءة الضعيفة.'
				},
				{
					text: 'نسبة $\\text{CO}_2$ في الهواء الجوي ($0.03\\%$) تمثل القيمة المثلى الأعظمية للتركيب الضوئي',
					diagnosticFeedback: 'رفع CO₂ فوق 0.03% يضاعف تقريباً شدة التركيب الضوئي تحت الإضاءة القوية.'
				},
				{
					text: 'لا تؤثر شدة الإضاءة على شدة التركيب الضوئي إطلاقاً',
					diagnosticFeedback: `رفع الإضاءة زاد السرعة العظمى من ${vMaxLow} إلى ${vMaxHigh} u.a (زيادة تقارب ${gainPct}%).`
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): قيس نشاط التركيب الضوئي لنبات أخضر (بوحدة اعتبارية $"u.a"$) عند درجة حرارة مثلى ($25" °C"$) بدلالة نسبة غاز $upright("CO")_2$ تحت شدتي إضاءة (ضعيفة وقوية)، والنتائج ممثلة في الوثيقة (1).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تأثير نسبة CO₂ وشدة الإضاءة على شدة التركيب الضوئي',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين في الوثيقة (1) مقارناً تطور شدة التركيب الضوئي في المجالين $[0 ; 0.03 "%"]$ و $[0.08 ; 0.16 "%"]$.`,
				answer: `1) التحليل والمقارنة:\n- في المجال $[0 ; 0.03 "%"]$: تتزايد شدة التركيب الضوئي بسرعة وبشكل متقارب في كلا المنحنيين بارتفاع نسبة $upright("CO")_2$.\n- في المجال $[0.08 ; 0.16 "%"]$: يثبت المنحنى الأزرق (إضاءة ضعيفة) عند قيمة منخفضة تقارب $${vMaxLow}" u.a"$ رغم زيادة $upright("CO")_2$، بينما يواصل المنحنى الأحمر (إضاءة قوية) الارتفاع ليثبت عند قيمة أعلى بكثير تبلغ $${vMaxHigh}" u.a"$ (زيادة بنحو $${gainPct} "%"$).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حدّد العامل المحدد في كل من الحالتين التاليتين مع التعليل:\nأ) عند نسبة $upright("CO")_2 = 0.02 "%"$ وتحت إضاءة قوية.\nب) عند نسبة $upright("CO")_2 = 0.14 "%"$ وتحت إضاءة ضعيفة.`,
				answer: `2) تحديد العامل المحدد:\n- الحالة (أ): العامل المحدد هو **نسبة $upright("CO")_2$** لأنها منخفضة جداً، ورفعها يؤدي مباشرة إلى ارتفاع شدة التركيب الضوئي.\n- الحالة (ب): العامل المحدد هو **شدة الإضاءة الضعيفة** لأن زيادة $upright("CO")_2$ لم تغيّر الشدة (ثبات عند $${vMaxLow}" u.a"$), بينما رفع الإضاءة ضاعفها إلى $${vMaxHigh}" u.a"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): استناداً إلى نتائج الجزء الأول، ادرس حالة دفيئة بلاستيكية مخصصة لإنتاج الطماطم شتاءً (الجدول أدناه).`
			},
			{
				type: 'table',
				headers: ['الظرف داخل الدفيئة', 'نسبة CO₂', 'شدة الإضاءة', 'درجة الحرارة', 'مردود الطماطم (t/ha)'],
				cells: [],
				rows: [
					['الدفعة 1 (دفيئة عادية)', '0.03%', 'قوية', '24 °C', '75'],
					['الدفعة 2 (إغناء بـ CO₂)', '0.12%', 'قوية', '24 °C', '132'],
					['الدفعة 3 (إغناء دون تدفئة)', '0.12%', 'قوية', '7 °C', '34']
				]
			},
			{
				type: 'text',
				content: `1) فسّر سبب ارتفاع المردود في الدفعة (2) مقارنة بالدفعة (1)، ثم فسّر انهيار المردود في الدفعة (3) رغم ضخ $upright("CO")_2$ وتوفر الإضاءة القوية.`,
				answer: `1) التفسير:\n- ارتفع المردود من $75$ إلى $132" t/ha"$ في الدفعة (2) لأننا أزلنا العامل المحدد ($upright("CO")_2$ الجوي $0.03 "%"$ ) برفعه إلى $0.12 "%"$ مع بقاء الإضاءة والحرارة مثاليين.\n- انهار المردود إلى $34" t/ha"$ في الدفعة (3) لأن **درجة الحرارة المنخفضة ($7" °C"$)** أصبحت هي العامل المحدد الذي يبطئ عمل الإنزيمات التركيبية رغم وفرة الضوء و $upright("CO")_2$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) قدّم تعريفاً دقيقاً لـ «العامل المحدد» وقاعدة عملية يستفيد منها الفلاح لإدارة البيوت البلاستيكية.`,
				answer: `2) التعريف والقاعدة العملية:\n- **العامل المحدد**: هو العامل القريب من حده الأدنى (أو الأبعد عن قيمته المثلى) والذي يقيّد شدة الظاهرة الحيوية مهما توفرت بقية العوامل.\n- **القاعدة العملية**: يجب تحسين **جميع العوامل المناخية والترابية بشكل متكامل ومتوازن** قرب قيمها المثلى داخل الدفيئة، ولا فائدة اقتصادية من ضخ $upright("CO")_2$ إذا كانت الحرارة أو الإضاءة محدِّدة.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تبيّن الوثيقة (1) أن شدة التركيب الضوئي عند $0.14\\%$ من $\\text{CO}_2$ تثبت عند $${vMaxLow}\\text{ u.a}$ في الإضاءة الضعيفة وترتفع إلى $${vMaxHigh}\\text{ u.a}$ في الإضاءة القوية.\nما القراءة العلمية الصحيحة لهذا المنحنى؟`,
				questionTextAr: 'اختر التحليل الصحيح للعامل المحدد في الوثيقة (1):',
				imageUrl: svgUrl,
				imageCaption: 'تأثير نسبة CO₂ وشدة الإضاءة على التركيب الضوئي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عند $0.14\\%$ من $\\text{CO}_2$ يتوقف ارتفاع المنحنى الأزرق عند $${vMaxLow}\\text{ u.a}$ رغم وفرة $\\text{CO}_2$، وتقفز القيمة إلى $${vMaxHigh}\\text{ u.a}$ برفع الإضاءة؛ إذن شدة الإضاءة هي العامل المحدد في المنحنى الأزرق.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتأثر شدة التركيب الضوئي وإنتاج الكتلة الحيوية بتضافر العوامل المناخية (الإضاءة، نسبة $upright("CO")_2$، ودرجة الحرارة). لدراسة مفهوم العامل المحدد ندرس الوثيقة (1) ونتائج الزراعة في الدفيئات.`,
				content
			},
			hints: [
				'العامل الذي يؤدي رفعه إلى زيادة فورية في الشدة هو العامل المحدد في ذلك المجال.',
				'عندما يثبت المنحنى رغم استمرار زيادة العامل (س)، فالعامل المحدد هو عامل آخر (ص).',
				'قارن الدفعات الثلاث في الجدول بتغيير عامل واحد فقط في كل مقارنة.'
			],
			solutionStepsAr: [
				`تحليل المنحنيين: تزايد مشترك حتى 0.03%، ثم ثبات عند $${vMaxLow}$ (إضاءة ضعيفة) مقابل $${vMaxHigh}$ (إضاءة قوية).`,
				'تعيين العامل المحدد في الحالتين (أ: CO₂، ب: الإضاءة) وفي الدفعة 3 (الحرارة 7°C).',
				'تعريف العامل المحدد وصياغة القاعدة العملية للزراعة في الدفيئات.'
			],
			finalAnswer: `\\text{إضاءة ضعيفة } (${vMaxLow}) \\text{ مقابل قوية } (${vMaxHigh})\\text{ — تحول العامل المحدد}`
		};
	}
};

// 5. Scientific Approach (8 pts): Greenhouse yield improvement (N-P-K + Heating + CO2)
export const tpl1asTcstT2GreenhouseYieldApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_greenhouse_yield_approach',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'المسعى العلمي: تحسين إنتاج الكتلة الحيوية بتضافر العوامل الترابية والمناخية',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_edaphic_factors_biomass',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const optN = rng.pick(difficulty === 'easy' ? [120, 140] : [130, 150, 160]);
		const yieldBase = rng.pick([20, 22, 24]);
		const yieldOpt = rng.pick([58, 62, 66]);
		const yieldExcess = roundTo(yieldOpt * 0.65, 1);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 260,
			yMin: 0,
			yMax: 75,
			xStep: 50,
			yStep: 15,
			xLabel: 'N (kg/ha)',
			yLabel: 'R (q/ha)',
			title: 'تأثير جرعة السماد الآزوتي على مردود المحصول الزراعي',
			shadedZones: [
				{ x1: 0, x2: optN, fill: 'rgba(22,163,74,0.11)', label: 'تحسن المردود', textColor: '#15803d' },
				{ x1: optN + 20, x2: 260, fill: 'rgba(220,38,38,0.11)', label: 'إفراط ضار', textColor: '#dc2626' }
			],
			curves: [
				{
					fn: (n) =>
						n <= optN
							? yieldBase + (yieldOpt - yieldBase) * (1 - Math.exp((-3.2 * n) / optN))
							: Math.max(25, yieldOpt - ((yieldOpt - yieldExcess) / (240 - optN)) * (n - optN)),
					color: '#0f766e',
					label: 'مردود القمح'
				}
			],
			points: [
				{ x: optN, y: roundTo(yieldOpt * 0.97, 1), label: `الأمثل ${optN}`, color: '#15803d' },
				{ x: 240, y: yieldExcess, label: 'تراجع', color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_fertilizer_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`الجرعة المثلى للآزوت هي $${optN}\\text{ kg/ha}$ (مردود $${yieldOpt}\\text{ q/ha}$)، والإفراط يخفض المردود إلى $${yieldExcess}\\text{ q/ha}$ بسبب ملوحة التربة وتلوث المياه`,
			[
				{
					text: 'كلما ضاعفنا كمية السماد الآزوتي فوق $240\\text{ kg/ha}$ تضاعف المردود بلا حد',
					diagnosticFeedback: `بعد ${optN} kg/ha ينقلب الأثر سلبياً ويتراجع المردود إلى ${yieldExcess} q/ha.`
				},
				{
					text: 'إضافة السماد المعدني تغني نهائياً عن الحرث والسقي وتوفير CO₂',
					diagnosticFeedback: 'تحسين الكتلة الحيوية يتطلب تضافراً متوازناً للعوامل الترابية والمناخية معاً.'
				},
				{
					text: 'انخفاض المردود في الحقل يعود دائماً إلى نقص الضوء فقط',
					diagnosticFeedback: 'المنحنى يثبت أن نقص أو إفراط العنصر الترابي الآزوتي يؤثر بشدة على المردود.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): لاحظ فلاح في منطقة سهلية أن مردود حقله من القمح لم يتجاوز $${yieldBase}" q/ha"$ مع اصفرار واضح لأوراق النباتات، فنصحه جاره بمضاعفة جرعة السماد الآزوتي إلى أقصى حد ممكن ($240" kg/ha"$).`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي الذي يطرحه ضعف المردود واصفرار الأوراق ومخاطر الإفراط في التسميد الكيميائي.`,
				answer: `1) المشكل العلمي: ما سبب ضعف المردود واصفرار الأوراق في هذا الحقل، وما هي الجرعة المعقلنة من السماد لتحقيق أفضل إنتاج دون إضرار بالمحصول والبيئة؟`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين تفسّران سبب ضعف المردود في الحقل وتأثير التسميد الآزوتي.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: تعاني التربة من فقر في الأملاح الآزوتية (عامل ترابي محدد)، وتصحيحها بجرعة مثلى متوازنة يرفع المردود بينما الإفراط فيها يضر بالجذور.\n- الفرضية 2: التسميد الآزوتي يرفع المردود باستمرار وبصورة طردية مهما ارتفعت الجرعة المضافة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، أُجري تحليل للتربة أثبت نقصاً حاداً في الآزوت، وأُنجزت تجارب تسميد بجرعات متزايدة (الوثيقة 1)، كما قيس تركيز النترات في المياه الجوفية المجاورة.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تطور مردود القمح الصلب بدلالة جرعة السماد الآزوتي',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل منحنى الوثيقة (1) وحدّد الجرعة المثلى للسماد الآزوتي والمردود الأعظمي الموافق لها.`,
				answer: `1) التحليل:\n- من $0$ إلى $${optN}" kg/ha"$: يرتفع المردود تدريجياً من $${yieldBase}" q/ha"$ ليبلغ ذروته (نحو $${yieldOpt}" q/ha"$) عند الجرعة المثلى $${optN}" kg/ha"$.\n- فوق $${optN}" kg/ha"$ (خاصة نحو $240" kg/ha"$): يتراجع المردود بشكل ملحوظ لينخفض إلى $${yieldExcess}" q/ha"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) فسّر تراجع المردود عند الجرعات المفرطة، ثم صادق على الفرضية الصحيحة وبيّن الخطورة البيئية لنصيحة الجار.`,
				answer: `2) التفسير والمصادقة:\n- التفسير: الإفراط في الأملاح الآزوتية يرفع تركيز محلول التربة (الملوحة) فيعرقل امتصاص الأوبار الماصة للماء (تأثير سام ومجفف للجذور) مما يخفض النمو والمردود؛ كما تتسرب النترات الفائضة مع مياه الأمطار لتلوّث المياه الجوفية.\n- المصادقة: نرفض الفرضية (2) و**نصادق على الفرضية (1)**؛ إذ يجب التقيّد بالجرعة المثلى $${optN}" kg/ha"$ ودمج التسميد العضوي والحرث.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً يبيّن كيفية تضافر العوامل الترابية (الحرث، السقي، التسميد المتوازن) والعوامل المناخية (الإضاءة، الحرارة، $upright("CO")_2$) لتحسين إنتاج الكتلة الحيوية بصورة مستدامة.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[تحسين العوامل الترابية: حرث وتهوية + سقي بالتقطير + تسميد متوازن (N-P-K بالجرعة المثلى $${optN}" kg/ha"$ + دبال)] + [تحسين العوامل المناخية في الدفيئات: إضاءة + حرارة مثلى + إغناء بـ $upright("CO")_2$] $arrow.r$ [إزالة العوامل المحددة وتنشيط الامتصاص والتركيب الضوئي] $arrow.r$ [رفع إنتاج الكتلة الحيوية ($${yieldOpt}" q/ha"$) مع حماية البيئة والمياه الجوفية].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `يوضح منحنى الوثيقة (1) تطور مردود القمح من $${yieldBase}\\text{ q/ha}$ إلى ذروة $${yieldOpt}\\text{ q/ha}$ عند $${optN}\\text{ kg/ha}$ آزوت، ثم انخفاضه إلى $${yieldExcess}\\text{ q/ha}$ عند $240\\text{ kg/ha}$.\nما الخلاصة العلمية المصادق عليها؟`,
				questionTextAr: 'اختر الخلاصة الزراعية والبيئية الصحيحة:',
				imageUrl: svgUrl,
				imageCaption: 'تأثير جرعة السماد الآزوتي على مردود القمح',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الجرعة المثلى هي $${optN}\\text{ kg/ha}$ (مردود $${yieldOpt}\\text{ q/ha}$)، وتجاوزها يرفع ملوحة التربة فيخفض المردود إلى $${yieldExcess}\\text{ q/ha}$ ويلوث المياه الجوفية بالنترات.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يعتمد تحسين إنتاج الكتلة الحيوية على التدخل العقلاني في العوامل الترابية والمناخية. لدراسة تأثير التسميد الآزوتي على محصول القمح وتفادي الأخطاء الفلاحية ندرس المعطيات التالية.`,
				content
			},
			hints: [
				`حدد على المنحنى القيمة الموافقة للذروة ($${optN}\\text{ kg/ha}$).`,
				'تذكر أن الإفراط في الأملاح المعدنية يعيق امتصاص الماء ويلوث المياه الجوفية.',
				'ادمج العوامل الترابية والمناخية معاً في المخطط التحصيلي.'
			],
			solutionStepsAr: [
				'طرح المشكل العلمي واقتراح فرضيتين حول التسميد المعقلن مقابل الإفراط.',
				`تحليل المنحنى واستخراج الجرعة المثلى ($${optN}\\text{ kg/ha}$، مردود $${yieldOpt}\\text{ q/ha}$) وتفسير التراجع.`,
				'المصادقة على الفرضية (1) وبناء المخطط التحصيلي المستدام.'
			],
			finalAnswer: `N_{\\text{أمثل}} = ${optN}\\text{ kg/ha}\\quad ;\\quad R_{\\max} = ${yieldOpt}\\text{ q/ha}`
		};
	}
};

// 6. Scientific Approach (8 pts): Industrial dust blocking stomata & reducing photosynthesis
export const tpl1asTcstT2DustStomataApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t2_herbicide_photosynthesis_approach',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'المسعى العلمي: تأثير الغبار الصناعي (الإسمنت) على الثغور والتركيب الضوئي',
	curriculumLessonId: 'sci_lesson_1as_tcst_t2_raw_sap_xylem_stomata',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const o2Clean = rng.pick(difficulty === 'easy' ? [80, 90] : [84, 92, 96]);
		const o2Dusty = roundTo(o2Clean * 0.28, 1);
		const dropPct = roundTo(((o2Clean - o2Dusty) / o2Clean) * 100, 0);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: 0,
			yMax: 110,
			xStep: 2,
			yStep: 20,
			xLabel: 't (min)',
			yLabel: 'O2 (u.a)',
			title: 'تطور انطلاق الأكسجين لأوراق زيتون سليمة وأوراق مغطاة بالغبار',
			shadedZones: [
				{ x1: 0, x2: 4, fill: 'rgba(148,163,184,0.2)', label: 'ظلام', textColor: '#334155' },
				{ x1: 4, x2: 12, fill: 'rgba(250,204,21,0.14)', label: 'إضاءة قوية', textColor: '#a16207' }
			],
			curves: [
				{
					fn: (t) => (t < 4 ? 18 - 1.5 * t : 12 + (o2Clean - 12) * (1 - Math.exp(-0.45 * (t - 4)))),
					color: '#15803d',
					label: 'أوراق سليمة'
				},
				{
					fn: (t) => (t < 4 ? 18 - 1.5 * t : 12 + (o2Dusty - 12) * (1 - Math.exp(-0.45 * (t - 4)))),
					color: '#dc2626',
					dashed: true,
					label: 'أوراق مغبرة'
				}
			],
			points: [
				{ x: 11, y: roundTo(o2Clean * 0.96, 1), label: `${o2Clean} u.a`, color: '#15803d' },
				{ x: 11, y: roundTo(o2Dusty * 0.96, 1), label: `${o2Dusty} u.a`, color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t2_dust_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تسد طبقة الغبار الثغور الورقية وتحجب الضوء، فيقل دخول $\\text{CO}_2$ وينخفض انطلاق $\\text{O}_2$ بنحو $${dropPct}\\%$ فيضعف تركيب المادة العضوية`,
			[
				{
					text: 'يؤدي الغبار إلى فتح الثغور باستمرار وزيادة إنتاج النشاء',
					diagnosticFeedback: `في الأوراق المغبرة انخفض انطلاق O₂ بنسبة ${dropPct}% وضعف تركيب النشاء بشدة.`
				},
				{
					text: 'يدمر الغبار الأوبار الماصة فقط دون التأثير على الأوراق',
					diagnosticFeedback: 'الفحص المجهري والمنحنى يتعلقان بأوراق مغطاة بالغبار وانسداد ثغورها.'
				},
				{
					text: 'يتوقف التنفس في الظلام تماماً في الأوراق السليمة',
					diagnosticFeedback: 'في الظلام (0–4 min) يتناقص O₂ في المنحنيين بسبب استمرار التنفس الخلوي.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): لوحظ ضعف شديد في نمو أشجار الزيتون وانخفاض كبير في مردود الزيتون في البساتين المجاورة لمصنع إسمنت حيث تتغطى أوراقها بطبقة رمادية من الغبار.`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي الذي تثيره هذه الملاحظة الميدانية.`,
				answer: `1) المشكل العلمي: كيف يؤثر توضّع غبار الإسمنت على أوراق أشجار الزيتون في إضعاف نموها وتراجع إنتاجها للكتلة الحيوية؟`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين وجيهتين تفسّران آلية تأثير الغبار على نشاط الأوراق.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: يسد الغبار فتحة الثغور الورقية فيمنع دخول غاز $upright("CO")_2$ كما يحجب جزءاً من الإشعاعات الضوئية الفعالة، مما يُضعف التركيب الضوئي وتركيب النسغ الكامل.\n- الفرضية 2: يرفع الغبار حرارة الورقة فقط دون التأثير على دخول $upright("CO")_2$ ولا على امتصاص الضوء.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، قيس تركيز $upright("O")_2$ في حيز مغلق يضم أوراق زيتون سليمة ثم أوراقاً مغبرة في الظلام ثم تحت إضاءة قوية (الوثيقة 1)، كما فُحصت البشرة السفلية بالمجهر فلوحظ انسداد $75 "%"$ من فتحات الثغور وغياب شبه تام لحبيبات النشاء بعد الغمر في ماء اليود.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تغير تركيز الأكسجين في الظلام والضوء لأوراق سليمة وأخرى مغبرة',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين في الظلام ($0-4" min"$) وفي الضوء ($4-12" min"$), واحسب نسبة الانخفاض في شدة انطلاق $upright("O")_2$ عند الأوراق المغبرة.`,
				answer: `1) التحليل والحساب:\n- في الظلام ($0-4" min"$): يتناقص تركيز $upright("O")_2$ بنفس الوتيرة في الحالتين (استهلاك $upright("O")_2$ في التنفس الخلوي).\n- في الضوء ($4-12" min"$): يرتفع تركيز $upright("O")_2$ بسرعة كبيرة في الأوراق السليمة ليبلغ $${o2Clean}" u.a"$ (شدة تركيب ضوئي عالية)، بينما يرتفع بضعف شديد في الأوراق المغبرة ليصل فقط إلى $${o2Dusty}" u.a"$ (انخفاض بنحو $${dropPct} "%"$).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) بدمج نتائج الفحص المجهري واختبار ماء اليود مع المنحنى، صادق على الفرضية الصحيحة واقترح إجراءين وقائيين لحماية البساتين المجاورة للمصنع.`,
				answer: `2) المصادقة والإجراءات الوقائية:\n- انسداد $75 "%"$ من الثغور يمنع دخول $upright("CO")_2$ كما تحجب الطبقة الرمادية الضوء عن اليخضور، فتضعف شدة التركيب الضوئي (انخفاض $upright("O")_2$ بـ $${dropPct} "%"$ وغياب النشاء) فيقل النسغ الكامل المتجه للثمار؛ وعليه **نصادق على الفرضية (1)**.\n- إجراءات وقائية: تركيب مصافٍ (فلاتر) كهرومغناطيسية عالية الكفاءة في مداخن المصنع، وغرس أحزمة شجرية عازلة ورش الأوراق بالماء عند الحاجة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً يوضح العلاقة السببية بين التلوث بغبار الإسمنت وتراجع مردود أشجار الزيتون.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[توضّع غبار الإسمنت على الأوراق] $arrow.r$ [انسداد الثغور ($75 "%"$ ) + حجب الإشعاعات الضوئية] $arrow.r$ [نقص دخول $upright("CO")_2$ ونقص التقاط الطاقة الضوئية] $arrow.r$ [ضعف التركيب الضوئي (تراجع $upright("O")_2$ والنشاء)] $arrow.r$ [قلة النسغ الكامل المنقول عبر اللحاء] $arrow.r$ [ضعف النمو وتراجع محصول الزيتون].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `انخفض انطلاق $\\text{O}_2$ الضوئي في أوراق زيتون مغطاة بغبار الإسمنت من $${o2Clean}\\text{ u.a}$ إلى $${o2Dusty}\\text{ u.a}$ (انخفاض $${dropPct}\\%$) مع انسداد $75\\%$ من الثغور.\nما التفسير العلمي المصادق عليه؟`,
				questionTextAr: 'اختر الفرضية المصادق عليها حول تأثير غبار الإسمنت:',
				imageUrl: svgUrl,
				imageCaption: 'انطلاق الأكسجين في أوراق سليمة وأخرى مغبرة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `انسداد الثغور وحجب الضوء يحدّان من دخول $\\text{CO}_2$ والتقاط الضوء، فينخفض التركيب الضوئي بنحو $${dropPct}\\%$ ويقل النشاء والنسغ الكامل اللازم لنمو الثمار.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تؤثر الملوثات الغبارية الصناعية سلباً على إنتاج الكتلة الحيوية للنباتات المجاورة. لفهم آلية تأثير غبار الإسمنت على أشجار الزيتون ندرس المعطيات التالية.`,
				content
			},
			hints: [
				'في الظلام تستهلك الورقة O₂ للتنفس؛ وفي الضوء تطرحه بالتركيب الضوئي.',
				'اربط انسداد 75% من الثغور بنقص مصدر الكربون CO₂.',
				'اربط قلة النشاء في الورقة بنقص النسغ الكامل المغذي للثمار.'
			],
			solutionStepsAr: [
				'طرح المشكل العلمي وفرضيتين حول انسداد الثغور وحجب الضوء.',
				`تحليل منحنيي O₂ في الظلام والضوء وحساب نسبة التراجع ($${dropPct}\\%$).`,
				'المصادقة على الفرضية (1) واقتراح حلول بيئية وبناء المخطط التحصيلي.'
			],
			finalAnswer: `\\text{انسداد الثغور وحجب الضوء} \\Rightarrow \\text{تراجع } \\text{O}_2 \\text{ بنسبة } ${dropPct}\\%`
		};
	}
};

export const SCIENCES_TEMPLATES_1AS_TCST_T2: SciencesParameterizedTemplate[] = [
	tpl1asTcstT2StomataXylemRecall,
	tpl1asTcstT2ChloroplastRecall,
	tpl1asTcstT2AbsorptionSpectrumReasoning,
	tpl1asTcstT2LimitingFactorReasoning,
	tpl1asTcstT2GreenhouseYieldApproach,
	tpl1asTcstT2DustStomataApproach
];
