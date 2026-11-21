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
	svgGeneticsDiagram,
	svgPlantAndPrimaryDiagram
} from '../../svg-sciences';

// ============================================================================
// 6 Parameterized ONEC Templates — 1AS TCST Trimester 1
// (2 recall 5 pts, 2 reasoning 7 pts, 2 scientific_approach 8 pts)
// ============================================================================

// 1. Recall (5 pts): Mitosis stages & conservation of chromosome number
export const tpl1asTcstT1MitosisRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_mitosis_recall',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reproduction_genetics',
	titleAr: 'آليات النمو: مراحل الانقسام الخيطي المتساوي والمحافظة على الصيغة الصبغية',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_growth_zones_mitosis',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plant = rng.pick([
			{ name: 'البصل', twoN: 16 },
			{ name: 'الفول', twoN: 12 },
			{ name: 'البازلاء', twoN: 14 },
			{ name: 'الثوم', twoN: 16 }
		]);
		const nDivisions = rng.pick(difficulty === 'easy' ? [2, 3] : [3, 4]);
		const totalCells = Math.pow(2, nDivisions);
		const chromatidsMetaphase = plant.twoN * 2;

		const svg = svgGeneticsDiagram('mitosis_stages', {
			title: 'مراحل الانقسام الخيطي المتساوي عند خلية مرستيمية نباتية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_mitosis_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تنتج $${totalCells}$ خلايا بنت صيغة كل منها $2n = ${plant.twoN}$ (وبها $${chromatidsMetaphase}$ كروماتيداً في الاستوائية)`,
			[
				{
					text: `تنتج $${totalCells}$ خلايا بنت صيغة كل منها $n = ${plant.twoN / 2}$`,
					diagnosticFeedback: 'الانقسام الخيطي المتساوي يحافظ على الصيغة الصبغية 2n ولا يختزلها إلى n.'
				},
				{
					text: `تنتج $${nDivisions * 2}$ خلايا بنت صيغة كل منها $2n = ${plant.twoN}$`,
					diagnosticFeedback: 'عدد الخلايا يتضاعف هندسياً (2 أس عدد الانقسامات) وليس بضرب عدد الانقسامات في 2.'
				},
				{
					text: `تنتج $${totalCells}$ خلايا بنت صيغة كل منها $2n = ${plant.twoN * 2}$`,
					diagnosticFeedback: 'تنفصل الكروماتيدات الشقيقة في المرحلة الانفصالية فتبقى الصيغة الصبغية للخلية البنت 2n ثابتة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): رسم تخطيطي لمراحل الانقسام الخيطي المتساوي في القمة النامية لجذر ${plant.name} ($2n = ${plant.twoN}$)`,
				width: 360
			},
			{
				type: 'text',
				content: `1) تعرّف على المراحل الأربع الممثلة في الوثيقة (1) بالترتيب الزمني، ثم حدّد عدد الصبغيات وعدد الكروماتيدات في المرحلة الاستوائية وفي كل قطب خلال المرحلة الانفصالية لخلية جذر ${plant.name} ($2n = ${plant.twoN}$).`,
				answer: `1) التعرف على المراحل والحصيلة الصبغية:\n- الترتيب الزمني: المرحلة التمهيدية، المرحلة الاستوائية، المرحلة الانفصالية، فالمرحلة النهائية.\n- في المرحلة الاستوائية: $${plant.twoN}$ صبغياً مضاعفاً أي $${chromatidsMetaphase}$ كروماتيداً مصطفة في اللوحة الاستوائية.\n- في المرحلة الانفصالية: بعد انشطار الأجزاء المركزية، يهاجر نحو كل قطب $${plant.twoN}$ صبغياً بنوياً (أحادي الكروماتيد)، لتتشكل خليتان بنتان صيغة كل منهما $2n = ${plant.twoN}$. وبعد $${nDivisions}$ انقسامات متتالية نحصل على $2^${nDivisions} = ${totalCells}$ خلية متماثلة.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) انطلاقاً من الوثيقة ومكتسباتك، اكتب نصاً علمياً مهيكلاً (مقدمة، عرض، خاتمة) تشرح فيه كيف يسمح الانقسام الخيطي المتساوي في القمة النامية بالنمو الطولي للجذر مع المحافظة على الصيغة الصبغية ($2n = ${plant.twoN}$).`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يرتكز النمو الطولي عند النبات على آليتين في القمة النامية هما تكاثر الخلايا واستطالتها. فكيف يسمح الانقسام الخيطي المتساوي بتضاعف عدد خلايا المرستيم مع المحافظة على الصيغة الصبغية ($2n = ${plant.twoN}$)؟\n- العرض: تدخل الخلية المرستيمية الانقسام بصبغيات مضاعفة (كل صبغي مكون من كروماتيدين شقيقين). في التمهيدية تتحلزن الصبغيات ويزول الغلاف النووي ويتشكل مغزل الانقسام من القلنسوتين القطبيتين. في الاستوائية تصطف الصبغيات في اللوحة الاستوائية. في الانفصالية ينشطر الجزء المركزي وتنفصل الكروماتيدات الشقيقة مهاجرة نحو القطبين ($${plant.twoN}$ صبغياً لكل قطب). وفي النهائية تتشكل الصفيحة الخلوية الوسطية وغلافان نوويان لتنتج خليتان بنتان متماثلتان ($2n = ${plant.twoN}$)، تدخل إحداهما لاحقاً منطقة الاستطالة لتتطاول.\n- الخاتمة: يضمن الانقسام الخيطي المتساوي تضاعف الخلايا في المرستيم مع توزيع متساوٍ للصبغيات، وبالتكامل مع الاستطالة يتحقق النمو الطولي للجذر.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `تخضع خلية مرستيمية لجذر ${plant.name} صيغتها الصبغية $2n = ${plant.twoN}$ إلى $${nDivisions}$ انقسامات خيطية متساوية متتالية.\nما عدد الخلايا الناتجة وما الصيغة الصبغية لكل خلية بنت؟`,
				questionTextAr: 'اختر الإجابة الصحيحة حول حصيلة الانقسامات الخيطية المتساوية:',
				imageUrl: svgUrl,
				imageCaption: 'مراحل الانقسام الخيطي المتساوي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يعطي كل انقسام خيطي متساوٍ خليتين مماثلتين للأم ($2n = ${plant.twoN}$)، وبعد $${nDivisions}$ انقسامات ينتج $2^{${nDivisions}} = ${totalCells}$ خلية متماثلة وراثياً، ويكون بالخلية $${chromatidsMetaphase}$ كروماتيداً في الطور الاستوائي.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يتم النمو الطولي للجذر عند النبات الأخضر على مستوى القمة النامية بفضل نشاط خلايا المنطقة المرستيمية. تمثل الوثيقة (1) مراحل ظاهرة خلوية أساسية تحدث في جذر نبات ${plant.name} ($2n = ${plant.twoN}$).`,
				content
			},
			hints: [
				'رتّب مراحل الانقسام الخيطي المتساوي: تمهيدية ← استوائية ← انفصالية ← نهائية.',
				`عدد الخلايا بعد $k$ انقسامات يساوي $2^k$ مع بقاء الصيغة $2n = ${plant.twoN}$ ثابتة.`,
				'احرص في النص العلمي على ذكر القلنسوتين القطبيتين والصفيحة الخلوية كخصائص للخلية النباتية.'
			],
			solutionStepsAr: [
				`تسمية المراحل الأربع وتحديد $${plant.twoN}$ صبغياً ($${chromatidsMetaphase}$ كروماتيداً) في الاستوائية و$${plant.twoN}$ صبغياً بسيطاً في كل قطب.`,
				`حساب عدد الخلايا الناتجة بعد $${nDivisions}$ انقسامات: $2^{${nDivisions}} = ${totalCells}$ خلية.`,
				'صياغة نص علمي مهيكل (مقدمة + إشكالية، عرض متسلسل للمراحل الأربع، وخاتمة).'
			],
			finalAnswer: `${totalCells}\\text{ خلايا } (2n = ${plant.twoN})`
		};
	}
};

// 2. Recall (5 pts): Phloem structure & source of matter for biosynthesis
export const tpl1asTcstT1PhloemMatterRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_phloem_matter_recall',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'plant_biology',
	titleAr: 'مصدر المادة الضرورية للتركيب الحيوي: بنية اللحاء ودوران النسغ الكامل',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_matter_source_plant_animal',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plantEx = rng.pick([
			{ name: 'شجرة التفاح', organ: 'الثمار النامية والبراعم' },
			{ name: 'نبات البطاطا', organ: 'الدرنات الترابية' },
			{ name: 'شجرة البرتقال', organ: 'الثمار والجذور' }
		]);
		const sucroseConc = rng.pick(difficulty === 'easy' ? [120, 150] : [135, 165, 180]);

		const svg = svgPlantAndPrimaryDiagram('xylem_phloem', {
			title: 'بنية الأوعية الخشبية والأوعية اللحائية (الأنابيب الغربالية والخلايا المرافقة)'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_phloem_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'يتراكم النسغ الكامل (السكروز والأحماض الأمينية) أعلى التقشير بسبب قطع الأنابيب الغربالية في اللحاء',
			[
				{
					text: 'يتوقف صعود النسغ الناقص تماماً وتجف الأوراق فوراً لأن الأوعية الخشبية قُطعت بالتقشير السطحي',
					diagnosticFeedback: 'التقشير الحلقي السطحي يقطع اللحاء المحيطي فقط ويبقي الأوعية الخشبية الداخلية سليمة.'
				},
				{
					text: 'يتراكم الماء المقطر فقط أسفل التقشير لانسداد الأوبار الماصة',
					diagnosticFeedback: 'التراكم يحدث أعلى التقشير وهو غني بالمواد العضوية المصنعة في الأوراق.'
				},
				{
					text: 'ينتقل النشاء الصلب مباشرة داخل الأوعية الخشبية نحو الثمار',
					diagnosticFeedback: 'النشاء غير منحل ولا ينتقل في الأوعية، بل ينتقل السكروز المنحل داخل الأوعية اللحائية.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): مخطط يوضح مساري النسغ الناقص والنسغ الكامل في ${plantEx.name}`,
				width: 350
			},
			{
				type: 'text',
				content: `1) قارن في جدول منظم بين النسغ الناقص والنسغ الكامل من حيث: التركيب الكيميائي، النسيج الناقل وبنيته الخلوية، واتجاه الدوران (علماً أن تركيز السكروز في النسغ الكامل يبلغ $${sucroseConc}" g/L"$).`,
				answer: `1) جدول المقارنة:\n- النسغ الناقص: ماء وأملاح معدنية فقط | ينتقل عبر الأوعية الخشبية (خلايا ميتة مجوفة مدعمة بالخشبين) | يصعد من الجذور إلى الأوراق.\n- النسغ الكامل: ماء + مواد عضوية منحلة (سكروز بتركيز $${sucroseConc}" g/L"$ وأحماض أمينية) | ينتقل عبر الأوعية اللحائية (خلايا غربالية حية عديمة النواة مثقبة الجدران العرضية ترافقها خلايا مرافقة نووية) | يتوزع من الأوراق نحو كل الأعضاء (${plantEx.organ}).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تبيّن فيه مصدر المادة العضوية اللازمة لنمو النبات في مرحلتيه: أثناء الإنتاش (النبيتة) وبعد ظهور الأوراق (النبات المورق)، مبرزاً تكيّف بنية الأوعية اللحائية مع وظيفتها.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يحتاج النبات الأخضر للنمو والتركيب الحيوي إلى إمداد متواصل بالمواد العضوية البسيطة. فما مصدر هذه المادة عند النبيتة وعند النبات المورق، وكيف تضمن بنية اللحاء توزيعها؟\n- العرض: في بداية الإنتاش وقبل تشكل الأوراق، تعتمد النبيتة على إماهة المدخرات العضوية للبذرة (النشاء والألورون) بفضل إنزيمات هاضمة تحولها إلى سكريات بسيطة وأحماض أمينية منحلة تغذي الرشيم. بعد ظهور الأوراق الخضراء، يصبح النبات ذاتي التغذية فيركّب المادة العضوية بالتركيب الضوئي، وتنتقل ضمن النسغ الكامل عبر الأوعية اللحائية نحو ${plantEx.organ}. يتألف الوعاء اللحائي من صف من خلايا غربالية حية متطاولة عديمة النواة ذات جدران عرضية مثقبة تسمح بمرور النسغ، وتجاورها خلايا مرافقة غنية بالأنوية والميتوكوندريا لتجديدها وتأمين نشاطها.\n- الخاتمة: يتغير مصدر المادة العضوية من مدخرات البذرة أثناء الإنتاش إلى النسغ الكامل المنقول عبر اللحاء المتكيّف بنيوياً عند النبات المورق.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `أُنجز تقشير حلقي سطحي (إزالة القشرة واللحاء فقط) على غصن ${plantEx.name} مع ترك الخشب الداخلي سليماً. لوحظ بعد أسابيع انتفاخ غني بالسكروز ($${sucroseConc}\\text{ g/L}$) فوق منطقة التقشير.\nما التفسير العلمي الصحيح لهذه النتيجة؟`,
				questionTextAr: 'اختر التفسير العلمي الدقيق لظهور الانتفاخ أعلى التقشير الحلقي:',
				imageUrl: svgUrl,
				imageCaption: 'مسارا النسغ الناقص والنسغ الكامل',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التقشير الحلقي السطحي يقطع الأوعية اللحائية (الأنابيب الغربالية) فقط، مما يعيق نزول النسغ الكامل الغني بالسكروز ($${sucroseConc}\\text{ g/L}$) فيتراكم فوق منطقة القطع.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يتطلب نمو النبات الأخضر وبناء ${plantEx.organ} تزويد الخلايا النامية بالمادة العضوية بصورة مستمرة. توضّح الوثيقة (1) حركة النسغين داخل النبات المورق.`,
				content
			},
			hints: [
				'ميّز بين النسيج الميت الناقل للنسغ الناقص (الخشب) والنسيج الحي الناقل للنسغ الكامل (اللحاء).',
				'تذكّر العنصرين المكونين للحاء: الخلية الغربالية (عديمة النواة ومثقبة الجدران) والخلية المرافقة (نووية).',
				'اربط في النص العلمي بين مصدر المادة في البذرة المنتشة ومصدرها في النبات المورق.'
			],
			solutionStepsAr: [
				'مقارنة النسغ الناقص والنسغ الكامل والنسيجين الناقلين لهما.',
				'إبراز إماهة مدخرات البذرة أثناء الإنتاش والنسغ الكامل بعد ظهور الأوراق.',
				'توضيح تكيّف بنية الأنبوب الغربالي والخلية المرافقة مع نقل المواد العضوية.'
			],
			finalAnswer: 'النسغ الكامل ينتقل في الأوعية اللحائية (خلايا غربالية + مرافقة)'
		};
	}
};

// 3. Reasoning (7 pts): Root apex cell length & mitosis frequency curve analysis
export const tpl1asTcstT1RootGrowthReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_root_growth_reasoning',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reproduction_genetics',
	titleAr: 'الاستدلال العلمي: تحليل منحنيات مناطق النمو في القمة النامية للجذر',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_growth_zones_mitosis',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const peakMitosis = rng.pick(difficulty === 'easy' ? [80, 90] : [75, 85, 95]);
		const maxLen = rng.pick(difficulty === 'easy' ? [100, 110] : [96, 108, 116]);
		const minLen = rng.pick([16, 18, 20]);
		const elongRatio = roundTo(maxLen / minLen, 1);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 5,
			yMin: 0,
			yMax: 120,
			xStep: 1,
			yStep: 20,
			xLabel: 'd (mm)',
			yLabel: 'L (μm)',
			title: 'تغير طول الخلايا ومعدل الانقسام بدلالة البعد عن نهاية الجذر',
			shadedZones: [
				{ x1: 0, x2: 1.5, fill: 'rgba(37,99,235,0.11)', label: 'المنطقة أ', textColor: '#1d4ed8' },
				{ x1: 1.5, x2: 4.5, fill: 'rgba(22,163,74,0.11)', label: 'المنطقة ب', textColor: '#15803d' }
			],
			curves: [
				{
					fn: (x) =>
						x < 1.2
							? minLen + 3 * x
							: Math.min(maxLen, minLen + 3.6 + ((maxLen - minLen - 3.6) / 2.6) * (x - 1.2)),
					color: '#15803d',
					label: 'طول الخلية'
				},
				{
					fn: (x) =>
						x < 1.6
							? peakMitosis * Math.exp(-Math.pow((x - 0.8) / 0.55, 2))
							: 4 * Math.exp(-(x - 1.6)),
					color: '#2563eb',
					dashed: true,
					label: 'معدل الانقسام'
				}
			],
			points: [
				{ x: 0.8, y: peakMitosis, label: `${peakMitosis}%`, color: '#1d4ed8' },
				{ x: 4.0, y: maxLen, label: `${maxLen} μm`, color: '#15803d' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_root_growth_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المنطقة (أ) هي المرستيم الابتدائي (ذروة انقسام $${peakMitosis}\\%$) والمنطقة (ب) هي منطقة الاستطالة (تزايد الطول $${elongRatio}$ مرة)`,
			[
				{
					text: `المنطقة (أ) هي منطقة الاستطالة والمنطقة (ب) هي القلنسوة الحامية`,
					diagnosticFeedback: 'المنطقة (أ) فيها ذروة الانقسام وطول الخلايا صغير جداً، فهي المرستيم وليست منطقة الاستطالة.'
				},
				{
					text: `يحدث الانقسام الخلوي والاستطالة القصوى بنفس الشدة على طول الجذر بالكامل`,
					diagnosticFeedback: 'لاحظ أن معدل الانقسام ينعدم تقريباً بعد 1.5 mm بينما يبدأ التطاول السريع للخلايا هناك.'
				},
				{
					text: `تتناقص أبعاد الخلايا كلما ابتعدنا عن قمة الجذر نحو الأعلى`,
					diagnosticFeedback: 'المنحنى الأخضر يوضح تزايد طول الخلية من ' + minLen + ' إلى ' + maxLen + ' μm.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): تمثل الوثيقة (1) منحنيي تغير كل من معدل الانقسام الخلوي وطول الخلايا بدلالة البعد عن نهاية القمة النامية لجذر نبات الفول.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تغيرات طول الخلية ومعدل الانقسام على طول القمة النامية للجذر',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين في الوثيقة (1) ضمن المجالين $[0 ; 1.5]" mm"$ (المنطقة أ) و $[1.5 ; 4.5]" mm"$ (المنطقة ب)، ثم سمِّ كل منطقة وحدّد الآلية الخلوية السائدة فيها.`,
				answer: `1) التحليل والتسمية:\n- في المجال $[0 ; 1.5]" mm"$ (المنطقة أ): يكون طول الخلايا صغيراً وشبه ثابت (نحو $${minLen}" " mu"m"$)، بينما يرتفع معدل الانقسام ليبلغ ذروته $${peakMitosis} "%"$ عند $0.8" mm"$. إذن المنطقة (أ) هي **منطقة المرستيم الابتدائي** وآليتها السائدة **التضاعف الخلوي بالانقسام الخيطي المتساوي**.\n- في المجال $[1.5 ; 4.5]" mm"$ (المنطقة ب): ينخفض معدل الانقسام حتى يكاد ينعدم، بينما يتزايد طول الخلايا بسرعة ليبلغ $${maxLen}" " mu"m"$ (تضاعف الطول بنحو $${elongRatio}$ مرة). إذن المنطقة (ب) هي **منطقة الاستطالة** وآليتها السائدة **تزايد أبعاد الخلايا**.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) ما المعلومة الإضافية التي تستنتجها من غياب الانقسامات في المنطقة (ب) رغم استمرار تزايد طول الجذر؟`,
				answer: `2) الاستنتاج: لا يقتصر النمو الطولي للجذر على تضاعف عدد الخلايا فقط، بل يتكامل التضاعف في المرستيم مع تطاول الخلايا الناتجة عنه في منطقة الاستطالة.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): لفهم الآلية الداخلية المسؤولة عن تطاول الخلايا في المنطقة (ب)، فُحصت خلايا المنطقتين بالمجهر الإلكتروني وقيس حجم الفجوات العصارية وكمية الماء الممتص (الجدول أسفله).`
			},
			{
				type: 'table',
				headers: ['الخاصية الخلوية', 'خلايا المنطقة (أ)', 'خلايا المنطقة (ب)'],
				cells: [],
				rows: [
					['متوسط طول الخلية', `${minLen} μm`, `${maxLen} μm`],
					['حجم وشكل الفجوات', 'فجوات صغيرة وعديدة', 'فجوة عصارية واحدة ضخمة'],
					['نسبة النواة إلى الخلية', 'نواة ضخمة تشغل معظم الخلية', 'نواة جانبية صغيرة نسبياً'],
					['مرونة الجدار السليلوزي', 'جدار رقيق حديث التشكل', 'جدار مرن يتمدد تحت ضغط الماء']
				]
			},
			{
				type: 'text',
				content: `1) قارن بين خصائص خلايا المنطقتين (أ) و (ب)، ثم فسّر آلية استطالة الخلايا في المنطقة (ب).`,
				answer: `1) المقارنة والتفسير:\n- مقارنة: خلايا (أ) صغيرة بنواة كبيرة وفجوات صغيرة عديدة ملائمة للانقسام، بينما خلايا (ب) متطاولة ($${maxLen}" " mu"m"$) ذات فجوة ضخمة ونواة جانبية.\n- تفسير الاستطالة: تندمج الفجوات الصغيرة لخلايا المرستيم إثر امتصاصها للماء فتتشكل فجوة عصارية ضخمة تمارس ضغط امتلاء على الجدار السليلوزي المرن، مما يؤدي إلى تمدده واستطالة الخلية بنحو $${elongRatio}$ مرة.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) استدل مما سبق على سبب توقف تطاول الجذر عند تعرض قمته النامية لجرعة إشعاعية توقف الانقسامات الخلوية في المنطقة (أ).`,
				answer: `2) الاستدلال: توقف الانقسامات في المنطقة (أ) يمنع إنتاج خلايا مرستيمية جديدة تنتقل لاحقاً إلى منطقة الاستطالة (ب)؛ وبعد استطالة الخلايا الموجودة أصلاً يتوقف إمداد المنطقة (ب) بالخلايا الجديدة فيتوقف نمو الجذر كلياً، مما يثبت تكامل الآليتين.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من منحنيي الوثيقة (1) حول القمة النامية للجذر (ذروة الانقسام $${peakMitosis}\\%$ عند $0.8\\text{ mm}$، وتزايد الطول من $${minLen}\\,\\mu\\text{m}$ إلى $${maxLen}\\,\\mu\\text{m}$)، ما الاستنتاج الصحيح؟`,
				questionTextAr: 'اختر التفسير الصحيح للمنطقتين (أ) و (ب):',
				imageUrl: svgUrl,
				imageCaption: 'منحنيا طول الخلايا ومعدل الانقسام في الجذر',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تتركز الانقسامات الخيطية ($${peakMitosis}\\%$) في المنطقة (أ) (المرستيم الابتدائي)، تليها المنطقة (ب) (منطقة الاستطالة) حيث يتضاعف طول الخلية $${elongRatio}$ مرة بفضل اندماج الفجوات وضغط الامتلاء.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لتحديد الآليات الخلوية المسؤولة عن النمو الطولي للجذر، أُجريت قياسات دقيقة لطول الخلايا ومعدل انقسامها على طول القمة النامية لجذر الفول.`,
				content
			},
			hints: [
				'اربط القمة العالية للانقسام (المجال القريب من النهاية) بمنطقة المرستيم الابتدائي.',
				`احسب نسبة التطاول بقسمة الطول الأقصى ($${maxLen}$) على الطول الأولي ($${minLen}$).`,
				'تذكّر دور اندماج الفجوات وامتصاص الماء في ممارسة ضغط على الجدار السليلوزي المرن.'
			],
			solutionStepsAr: [
				`تحليل المنحنيين وتمييز المرستيم (ذروة $${peakMitosis}\\%$) ومنطقة الاستطالة (طول أقصى $${maxLen}\\,\\mu\\text{m}$).`,
				`مقارنة البنية الفجوية والنووية وتفسير التطاول بضغط الامتلاء ($\\times ${elongRatio}$).`,
				'إبراز التكامل الحتمي بين التكاثر الخلوي والاستطالة.'
			],
			finalAnswer: `\\text{مرستيم } (${peakMitosis}\\%) + \\text{استطالة } (\\times ${elongRatio})`
		};
	}
};

// 4. Reasoning (7 pts): Yeast respiration vs fermentation quantitative analysis
export const tpl1asTcstT1YeastMetabolismReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_yeast_respiration_fermentation_reasoning',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'bioenergetics',
	titleAr: 'الاستدلال العلمي: مقارنة التنفس الخلوي والتخمر الكحولي عند خميرة الخبز',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_respiration_fermentation',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const glucoseG = rng.pick(difficulty === 'easy' ? [100, 150] : [120, 150, 200]);
		const yieldAer = rng.pick([0.2, 0.22]);
		const yieldAnaer = 0.02;
		const biomassAer = roundTo(glucoseG * yieldAer, 1);
		const biomassAnaer = roundTo(glucoseG * yieldAnaer, 1);
		const ratio = roundTo(biomassAer / biomassAnaer, 1);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 50,
			xStep: 2,
			yStep: 10,
			xLabel: 't (h)',
			yLabel: 'm (g)',
			title: 'تطور الكتلة الحيوية المتشكلة للخميرة في الوسطين (1) و (2)',
			curves: [
				{
					fn: (t) => biomassAer * (1 - Math.exp(-0.35 * t)),
					color: '#16a34a',
					label: 'الوسط (1) هوائي'
				},
				{
					fn: (t) => biomassAnaer * (1 - Math.exp(-0.35 * t)),
					color: '#dc2626',
					dashed: true,
					label: 'الوسط (2) لاهوائي'
				}
			],
			points: [
				{ x: 9, y: roundTo(biomassAer * 0.96, 1), label: `${biomassAer} g`, color: '#15803d' },
				{ x: 9, y: roundTo(biomassAnaer * 0.96, 1), label: `${biomassAnaer} g`, color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_yeast_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`مردود الوسط الهوائي $${yieldAer}\\text{ g/g}$ وهو أكبر بـ $${ratio}$ مرات من الوسط اللاهوائي ($${yieldAnaer}\\text{ g/g}$) بسبب الهدم الكلي للغلوكوز`,
			[
				{
					text: `مردود الوسط اللاهوائي أعلى لأن الخميرة لا تستهلك الغلوكوز في غياب $\\text{O}_2$`,
					diagnosticFeedback: 'الخميرة تستهلك نفس كمية الغلوكوز (' + glucoseG + ' g) في الوسطين لكن إنتاج الكتلة الحية في اللاهوائي أضعف بكثير.'
				},
				{
					text: `المردود متساوٍ في الوسطين لأن كمية الغلوكوز المستهلكة متساوية`,
					diagnosticFeedback: 'رغم تساوي الغلوكوز المستهلك، أنتج الوسط الهوائي ' + biomassAer + ' g مقابل ' + biomassAnaer + ' g فقط في اللاهوائي.'
				},
				{
					text: `في الوسط اللاهوائي يتهدم الغلوكوز كلياً إلى ماء و $\\text{CO}_2$`,
					diagnosticFeedback: 'في غياب O₂ يكون الهدم جزئياً فقط ويخلف مادة عضوية غنية بالطاقة هي الإيثانول.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): وُضعت نفس الكمية من خميرة الخبز في مفاعلين يحتوي كل منهما على $${glucoseG}" g"$ غلوكوز؛ الوسط (1) مزود بتيار من ثنائي الأكسجين، والوسط (2) مغلق ومعزول عن الهواء. تُلخّص الوثيقة (1) والجدول النتائج المحصل عليها بعد $10$ ساعات.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): منحنيان لتطور الكتلة الحيوية للخميرة في الوسطين (1) و (2)',
				width: 350
			},
			{
				type: 'table',
				headers: ['المعيار التجريبي', 'الوسط (1) بوجود O₂', 'الوسط (2) بغياب O₂'],
				cells: [],
				rows: [
					['كمية الغلوكوز المستهلكة', `${glucoseG} g`, `${glucoseG} g`],
					['كتلة الخميرة المتشكلة', `${biomassAer} g`, `${biomassAnaer} g`],
					['النواتج المكشوف عنها', 'CO₂ + ماء (رائق الكلس متعكر)', 'CO₂ + إيثانول (كحول إيثيلي)'],
					['تكاثر الخلايا (التبرعم)', 'سريع وكثيف جداً', 'بطيء وضعيف']
				]
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين والمعطيات الجدولية، ثم احسب مردود إنتاج الكتلة الحيوية (كتلة الخميرة المتشكلة لكل $1" g"$ غلوكوز مستهلك) في كل وسط وقارن بينهما.`,
				answer: `1) التحليل وحساب المردود:\n- تحليل: لنفس الكمية المستهلكة من الغلوكوز ($${glucoseG}" g"$), تتزايد الكتلة الحيوية للخميرة بسرعة كبيرة في الوسط (1) الهوائي لتصل إلى $${biomassAer}" g"$ مع طرح غاز $upright("CO")_2$ فقط، بينما تبقى الزيادة ضعيفة جداً في الوسط (2) اللاهوائي ($${biomassAnaer}" g"$ فقط) مع ظهور الإيثانول و $upright("CO")_2$.\n- مردود الوسط (1): $R_1 = frac(${biomassAer}, ${glucoseG}) = ${yieldAer}" g/g"$.\n- مردود الوسط (2): $R_2 = frac(${biomassAnaer}, ${glucoseG}) = ${yieldAnaer}" g/g"$.\n- المقارنة: مردود النمو في الوسط الهوائي أكبر بـ $${ratio}$ مرات من مردوده في الوسط اللاهوائي.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) سمِّ الظاهرة الحيوية في كل وسط، واستنتج العلاقة بين توفر الأكسجين ومردود النمو الخلوي.`,
				answer: `2) التسمية والاستنتاج:\n- الوسط (1): **التنفس الخلوي**. الوسط (2): **التخمر الكحولي**.\n- الاستنتاج: يرتفع مردود النمو الخلوي بشدة في وجود $upright("O")_2$ لأن التنفس يحرر طاقة أكبر بكثير لتكاثر الخلايا.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): لتفسير هذا الفارق الكبير في النمو، استعمل معارفك حول طبيعة هدم الغلوكوز في الظاهرتين.`
			},
			{
				type: 'text',
				content: `1) اكتب المعادلة الكيميائية الإجمالية لكل من الظاهرتين الحادثتين في الوسطين (1) و (2).`,
				answer: `1) المعادلتان الإجماليتان:\n- التنفس الخلوي (الوسط 1): ${BIO_EQUATIONS.cellularRespiration.typst}\n- التخمر الكحولي (الوسط 2): ${BIO_EQUATIONS.alcoholicFermentation.typst}`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) فسّر علمياً سبب الفارق في إنتاج الكتلة الحيوية ($${biomassAer}" g"$ مقابل $${biomassAnaer}" g"$) رغم استهلاك نفس كتلة الغلوكوز ($${glucoseG}" g"$), ثم احسب كتلة الغلوكوز اللازمة في الوسط (2) لإنتاج $${biomassAer}" g"$ من الخميرة.`,
				answer: `2) التفسير والحساب:\n- التفسير: في التنفس الخلوي يتم **هدم كلي** للغلوكوز بوجود $upright("O")_2$ إلى مواد معدنية فقيرة بالطاقة ($upright("CO")_2$ و $upright("H")_2 upright("O")$) مما يحرر طاقة قابلة للاستعمال كبيرة جداً ($38" ATP"$) تُوظَّف في الانقسام والتكاثر الكثيف. أما في التخمر فيحدث **هدم جزئي** فقط، ويبقى معظم الطاقة الكيميائية كامناً داخل جزيئات الإيثانول العضوية، فتكون الطاقة المحررة ضئيلة ($2" ATP"$) والنمو ضعيفاً.\n- كمية الغلوكوز المطلوبة في التخمر لإنتاج $${biomassAer}" g"$: $m = frac(${biomassAer}, ${yieldAnaer}) = ${roundTo(biomassAer / yieldAnaer, 0)}" g"$ (أكبر بـ $${ratio}$ مرات من التنفس!).`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `استهلكت خميرة الخبز $${glucoseG}\\text{ g}$ من الغلوكوز في وسطين فأنتجت $${biomassAer}\\text{ g}$ كتلة حية في الوسط الهوائي و $${biomassAnaer}\\text{ g}$ فقط في الوسط اللاهوائي.\nما الاستنتاج الكمي والتفسيري الصحيح؟`,
				questionTextAr: 'اختر التحليل الصحيح لمردود النمو في الوسطين:',
				imageUrl: svgUrl,
				imageCaption: 'منحنيان لنمو الخميرة في التنفس والتخمر',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مردود النمو الهوائي $\\frac{${biomassAer}}{${glucoseG}} = ${yieldAer}\\text{ g/g}$ واللاهوائي $\\frac{${biomassAnaer}}{${glucoseG}} = ${yieldAnaer}\\text{ g/g}$ (الفارق $${ratio}$ مرات) لأن الهدم الكلي في التنفس يحرر طاقة أكبر بكثير من الهدم الجزئي المخلِّف للإيثانول.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `خميرة الخبز فطر وحيد الخلية قادر على العيش في الوسطين الهوائي واللاهوائي. لدراسة كيفية تحويل الطاقة وعلاقتها بالنمو، زُرعت الخميرة في وسطين متماثلين من حيث كمية الغلوكوز ($${glucoseG}" g"$).`,
				content
			},
			hints: [
				'احسب مردود النمو بقسمة كتلة الخميرة المتشكلة على كتلة الغلوكوز المستهلك.',
				'قارن نواتج الهدم: مواد معدنية فقط في التنفس مقابل بقاء مادة عضوية (إيثانول) في التخمر.',
				'تذكّر معادلة التنفس ($38\\text{ ATP}$) ومعادلة التخمر الكحولي ($2\\text{ ATP}$).'
			],
			solutionStepsAr: [
				`حساب المردودين: $R_1 = ${yieldAer}\\text{ g/g}$ و $R_2 = ${yieldAnaer}\\text{ g/g}$ ($R_1 / R_2 = ${ratio}$).`,
				'كتابة معادلتي التنفس الخلوي والتخمر الكحولي بدقة.',
				`تفسير الفارق بالهدم الكلي مقابل الهدم الجزئي، واستنتاج الحاجة إلى $${roundTo(biomassAer / yieldAnaer, 0)}\\text{ g}$ غلوكوز في التخمر.`
			],
			finalAnswer: `R_1 = ${yieldAer}\\text{ g/g}\\quad ;\\quad R_2 = ${yieldAnaer}\\text{ g/g}`
		};
	}
};

// 5. Scientific Approach (8 pts): Seed germination matter & energy transformation
export const tpl1asTcstT1SeedGerminationApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_seed_germination_approach',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'bioenergetics',
	titleAr: 'المسعى العلمي: مصدر المادة وتحويل الطاقة أثناء إنتاش البذرة',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_energy_yield_growth',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const seedType = rng.pick(['الفاصولياء', 'القمح', 'البازلاء']);
		const mInit = rng.pick(difficulty === 'easy' ? [100, 120] : [80, 100, 120]);
		const mDryEnd = roundTo(mInit * 0.72, 1);
		const tempRise = rng.pick([2.4, 2.8, 3.2]);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 110,
			xStep: 2,
			yStep: 20,
			xLabel: 't (j)',
			yLabel: 'Q (%)',
			title: 'تغير مدخرات النشاء والسكريات البسيطة أثناء إنتاش البذرة في الظلام',
			curves: [
				{
					fn: (t) => 95 * Math.exp(-0.22 * t) + 5,
					color: '#b45309',
					label: 'النشاء المدخر'
				},
				{
					fn: (t) => 58 * (t / 4.5) * Math.exp(1 - t / 4.5),
					color: '#2563eb',
					dashed: true,
					label: 'السكريات البسيطة'
				},
				{
					fn: (t) => 8 + 70 * (1 - Math.exp(-0.24 * t)),
					color: '#16a34a',
					label: 'كتلة النبيتة النامية'
				}
			],
			points: [
				{ x: 4.5, y: 58, label: 'ذروة السكريات', color: '#2563eb' },
				{ x: 9, y: 18, label: 'نفاد النشاء', color: '#b45309' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_seed_germ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يُماه النشاء إلى سكريات بسيطة يُستعمل جزء منها في البناء الحيوي للنبيتة ويُهدم الباقي بالتنفس (طرح $\\text{CO}_2$ وارتفاع الحرارة بـ $+${tempRise}^\\circ\\text{C}$)`,
			[
				{
					text: 'يتحول $100\\%$ من النشاء المدخر إلى كتلة جافة جديدة دون أي فقدان غازي أو حراري',
					diagnosticFeedback: `الوزن الجاف الكلي تناقص من ${mInit} g إلى ${mDryEnd} g وارتفعت الحرارة بـ ${tempRise}°C، ما يثبت الهدم التنفسي لجزء من المادة.`
				},
				{
					text: 'النبيتة في الظلام تقوم بالتركيب الضوئي لتعويض النشاء المفقود',
					diagnosticFeedback: 'التركيب الضوئي مستحيل في الظلام التام.'
				},
				{
					text: 'تناقص الوزن الجاف يعود لتبخر الماء فقط من البذور',
					diagnosticFeedback: 'الوزن الجاف يُقاس بعد التجفيف التام، فنقصانه يعكس فقدان مادة عضوية على شكل CO₂.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): وُضعت $${mInit}" g"$ (وزن جاف) من بذور ${seedType} للإنتاش في الظلام التام وبوجود الرطوبة؛ وبعد $10$ أيام لوحظ تشكل نبيتات ذات جذير وسويقة طويلة، لكن قياس الوزن الجاف الإجمالي (بذور + نبيتات) أظهر تناقصه إلى $${mDryEnd}" g"$.`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي الذي يثيره هذا التناقض الظاهري (نمو النبيتة مع تناقص الوزن الجاف الإجمالي في الظلام).`,
				answer: `1) المشكل العلمي: كيف تنمو النبيتة ويزداد طولها وعدد خلاياها في الظلام رغم تناقص الوزن الجاف الإجمالي للبذور المنتشة؟ (أو: ما مصدر المادة والطاقة اللازمين لنمو النبيتة، وما سبب فقدان جزء من الوزن الجاف؟)`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين وجيهتين تفسّران مصير المدخرات العضوية للبذرة وسبب نقصان الوزن الجاف.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: تعتمد النبيتة على إماهة مدخرات البذرة (النشاء) لتغذية خلاياها وبناء مادتها الحية، ويُهدم جزء من هذه السكريات بالتنفس الخلوي لتوفير الطاقة فيُطرح كربونها على شكل $upright("CO")_2$ مما يخفض الوزن الجاف.\n- الفرضية 2: تتفكك مدخرات البذرة دون هدم تنفسي وتتسرب إلى ماء الوسط الخارجي مما يخفض الوزن الجاف.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من صحة إحدى الفرضيتين، تابَعنا تطور كمية النشاء، السكريات البسيطة، وكتلة النبيتة (الوثيقة 1)، كما وُضعت بذور منتشة في مسعر حراري معزول فسُجّل ارتفاع الحرارة بـ $+${tempRise}" °C"$ وتعكر رائق الكلس مع امتصاص معتبر لغاز $upright("O")_2$ (بينما لم تتغير حرارة البذور الجافة).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): تطور مدخرات النشاء والسكريات البسيطة وكتلة نبيتة ${seedType} أثناء الإنتاش`,
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل منحنيات الوثيقة (1) وفسّر العلاقة الزمنية بين تناقص النشاء، تزايد السكريات البسيطة، ونمو النبيتة.`,
				answer: `1) التحليل والتفسير:\n- يتناقص النشاء المدخر تدريجياً من $100 "%"$ إلى أقل من $20 "%"$، وبالموازاة ترتفع السكريات البسيطة لتبلغ ذروتها حول اليوم $4.5$ ثم تتناقص، بينما ترتفع كتلة النبيتة النامية باستمرار.\n- التفسير: تتحول مدخرات النشاء غير المنحلة عبر إماهة إنزيمية (أميلاز) إلى سكريات بسيطة منحلة (مالتوز وغلوكوز) تنتقل لتغذية النبيتة فتُستعمل في البناء الحيوي وفي إنتاج الطاقة.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) باستغلال نتائج المسعر الحراري (ارتفاع الحرارة $+${tempRise}" °C"$، تعكر رائق الكلس، استهلاك $upright("O")_2$)، ناقش الفرضيتين وصادق على الفرضية الصحيحة.`,
				answer: `2) المناقشة والمصادقة:\n- امتصاص $upright("O")_2$ وطرح $upright("CO")_2$ (تعكر رائق الكلس) وانتشار الحرارة ($+${tempRise}" °C"$) تثبت حدوث **التنفس الخلوي** بشدة عند البذور المنتشة؛ إذ يُهدم جزء من الغلوكوز الناتج عن إماهة النشاء كلياً لتوفير الطاقة اللازمة للانقسام والنمو ويُطرح كربونه كـ $upright("CO")_2$ وهو ما يفسر تناقص الوزن الجاف ($${mInit} - ${mDryEnd} = ${roundTo(mInit - mDryEnd, 1)}" g"$).\n- بالتالي نرفض الفرضية (2) و**نصادق على الفرضية (1)**.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي وظيفي التحولات المادية والطاقوية التي تسمح بتحول بذرة ${seedType} إلى نبيتة نامية في الظلام.`,
				answer: `الجزء الثالث — المخطط التحصيلي الوظيفي:\n[مدخرات البذرة: نشاء + بروتينات] --(ماء + إماهة إنزيمية)--> [مغذيات بسيطة: غلوكوز + أحماض أمينية]\nوتتوزع إلى مسارين متكاملين داخل النبيتة:\n1) مسار الهدم (تنفس خلوي بوجود $upright("O")_2$): غلوكوز $arrow.r$ $upright("CO")_2$ + ماء + حرارة ($+${tempRise}" °C"$) + طاقة قابلة للاستعمال (تفسّر تناقص الوزن الجاف).\n2) مسار البناء (التركيب الحيوي بالاستفادة من الطاقة): مغذيات + طاقة $arrow.r$ انقسام خلوي واستطالة $arrow.r$ نمو النبيتة.`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `تناقص الوزن الجاف لبذور ${seedType} منتشة في الظلام من $${mInit}\\text{ g}$ إلى $${mDryEnd}\\text{ g}$ مع ارتفاع الحرارة داخل المسعر بـ $+${tempRise}^\\circ\\text{C}$ وتعكر رائق الكلس رغم نمو النبيتة.\nما التفسير العلمي الشامل لهذه النتائج؟`,
				questionTextAr: 'اختر الفرضية المصادق عليها علمياً:',
				imageUrl: svgUrl,
				imageCaption: 'تطور النشاء والسكريات وكتلة النبيتة أثناء الإنتاش',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تُماه مدخرات النشاء إلى غلوكوز: يُستخدم جزء منه في البناء الحيوي للنبيتة، ويُهدم الجزء الآخر بالتنفس الخلوي لتوفير الطاقة فيُطرح على شكل $\\text{CO}_2$ وحرارة ($+${tempRise}^\\circ\\text{C}$) مما ينقص الوزن الجاف بمقدار $${roundTo(mInit - mDryEnd, 1)}\\text{ g}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتميز مرحلة إنتاش بذرة ${seedType} في الظلام بتحول الرشيم الصغير إلى نبيتة نامية دون قيامها بالتركيب الضوئي. لفهم مصدر المادة والطاقة خلال هذه المرحلة ندرس الوثائق التالية.`,
				content
			},
			hints: [
				'اربط بين نزول منحنى النشاء وصعود منحنى السكريات البسيطة بالإماهة الإنزيمية.',
				'تعكر رائق الكلس + استهلاك O₂ + ارتفاع الحرارة = مظاهر التنفس الخلوي.',
				'وضّح في المخطط التحصيلي تفرع المغذيات إلى مسار هدم طاقوي ومسار بناء حيوي.'
			],
			solutionStepsAr: [
				'صياغة المشكل العلمي واقتراح فرضيتين حول مصدر المادة وسبب نقص الوزن الجاف.',
				`تحليل المنحنيات وإثبات الإماهة الإنزيمية للنشاء ثم الهدم التنفسي لـ $${roundTo(mInit - mDryEnd, 1)}\\text{ g}$ مع ارتفاع الحرارة $+${tempRise}^\\circ\\text{C}$.`,
				'بناء المخطط التحصيلي الوظيفي للتكامل بين الهدم والبناء أثناء الإنتاش.'
			],
			finalAnswer: `\\text{إماهة النشاء} + \\text{تنفس } (-${roundTo(mInit - mDryEnd, 1)}\\text{ g}) + \\text{تركيب حيوي}`
		};
	}
};

// 6. Scientific Approach (8 pts): Effect of a mitotic inhibitor (colchicine/plant extract) on root growth
export const tpl1asTcstT1MitoticInhibitorApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1as_tcst_t1_mitotic_inhibitor_approach',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reproduction_genetics',
	titleAr: 'المسعى العلمي: تأثير مادة مثبطة لمغزل الانقسام (الكولشيسين) على نمو الجذور',
	curriculumLessonId: 'sci_lesson_1as_tcst_t1_growth_zones_mitosis',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const conc = rng.pick(difficulty === 'easy' ? [0.5, 1.0] : [0.4, 0.8, 1.2]);
		const lenCtrl = rng.pick([48, 54, 60]);
		const lenTreated = roundTo(lenCtrl * 0.25, 1);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 72,
			yMin: 0,
			yMax: 70,
			xStep: 12,
			yStep: 10,
			xLabel: 't (h)',
			yLabel: 'L (mm)',
			title: 'تطور طول جذور البصل في وسط شاهد ووسط معالج بمادة مثبطة',
			eventArrows: [{ x: 12, label: 'إضافة المادة', color: '#dc2626' }],
			curves: [
				{
					fn: (t) => 10 + ((lenCtrl - 10) / 72) * t,
					color: '#16a34a',
					label: 'الوسط الشاهد'
				},
				{
					fn: (t) => (t <= 12 ? 10 + ((lenCtrl - 10) / 72) * t : lenTreated + 5 * (1 - Math.exp(-(t - 12) / 14))),
					color: '#dc2626',
					dashed: true,
					label: 'وسط معالج'
				}
			],
			points: [
				{ x: 72, y: lenCtrl, label: `${lenCtrl} mm`, color: '#15803d' },
				{ x: 72, y: roundTo(lenTreated + 4.9, 1), label: 'توقف النمو', color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_colchicine_s${seed}_${difficulty}`, svg);

		const flowSvg = svgBioFlowchart({
			title: 'تأثير تثبيط مغزل الانقسام على نمو الجذر',
			orientation: 'horizontal',
			steps: [
				{ label: 'مادة الكولشيسين', sublabel: 'تمنع تشكل خيوط المغزل', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'توقف الانقسام الخيطي', sublabel: 'انعدام الطور الانفصالي', color: '#b45309', bg: '#fffbeb' },
				{ label: 'توقف التكاثر الخلوي', sublabel: 'عدم إمداد منطقة الاستطالة', color: '#1d4ed8', bg: '#eff6ff' },
				{ label: 'توقف نمو الجذر', sublabel: 'ثبات طول الجذر', color: '#475569', bg: '#f1f5f9' }
			]
		});
		const flowUrl = saveSciencesSvgAsset(`sci_1as_tcst_t1_colchicine_flow_s${seed}`, flowSvg);

		const mcq = buildUniqueMcqOptions(
			'تمنع المادة تشكل خيوط مغزل الانقسام فتتوقف الخلايا في الطور الاستوائي وتنعدم المرحلة الانفصالية والنهائية',
			[
				{
					text: 'تقوم المادة بزيادة سرعة انفصال الكروماتيدات في المرحلة الانفصالية',
					diagnosticFeedback: 'الجدول يظهر انعدام الطور الانفصالي (0%) وتراكم الخلايا في الطور الاستوائي.'
				},
				{
					text: 'تمنع المادة امتصاص الماء فقط دون التأثير على خلايا المرستيم',
					diagnosticFeedback: 'الفحص المجهري أثبت توقف الانقسام الخيطي في الطور الاستوائي داخل المرستيم.'
				},
				{
					text: 'تختزل المادة الصيغة الصبغية للخلية من 2n إلى n',
					diagnosticFeedback: 'بل تمنع انفصال الكروماتيدات فيتضاعف عدد الصبغيات داخل نفس الخلية.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): تُستعمل مادة الكولشيسين (بتركيز $${conc}" g/L"$) في الأبحاث الخلوية والزراعية لدراسة آليات نمو النبات. يمثل المنحنى في الوثيقة (1) تطور طول جذور البصل في وسط شاهد ووسط أُضيف له الكولشيسين عند الساعة $12$.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تأثير إضافة الكولشيسين على النمو الطولي لجذر البصل',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين في الوثيقة (1)، ثم اطرح المشكل العلمي حول آلية تأثير الكولشيسين على نمو الجذر.`,
				answer: `1) التحليل والمشكل:\n- التحليل: قبل $t = 12" h"$ ينمو الجذران بنفس الوتيرة. بعد إضافة الكولشيسين يتواصل نمو الجذر الشاهد بانتظام ليبلغ $${lenCtrl}" mm"$ عند $72" h"$، بينما يتباطأ نمو الجذر المعالج سريعاً ثم يثبت تماماً حول $${roundTo(lenTreated + 5, 1)}" mm"$.\n- المشكل العلمي: كيف تثبط مادة الكولشيسين النمو الطولي لجذر البصل على المستوى الخلوي؟`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين تفسّران سبب توقف نمو الجذر عند المعالجة بالكولشيسين.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: يثبط الكولشيسين تضاعف الخلايا في منطقة المرستيم بإيقاف الانقسام الخيطي المتساوي.\n- الفرضية 2: يمنع الكولشيسين استطالة الخلايا في منطقة الاستطالة فقط دون التأثير على الانقسام الخلوي.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، أُنجزت مقاطع مجهرية للقمة النامية لجذور الوسطين عند $t = 36" h"$ وحُسبت نسب الخلايا المنقسمة في كل مرحلة (الجدول أسفله):`
			},
			{
				type: 'table',
				headers: ['المؤشر الخلوي في المرستيم', 'الوسط الشاهد', 'الوسط المعالج بالكولشيسين'],
				cells: [],
				rows: [
					['نسبة الخلايا في التمهيدية', '45%', '22%'],
					['نسبة الخلايا في الاستوائية', '25%', '78% (صبغيات مبعثرة دون مغزل)'],
					['نسبة الخلايا في الانفصالية', '18%', '0%'],
					['نسبة الخلايا في النهائية', '12%', '0%']
				]
			},
			{
				type: 'text',
				content: `1) استغل معطيات الجدول لتحديد المرحلة الدقيقة التي يُوقف عندها الكولشيسين الانقسام الخيطي المتساوي وسبب ذلك.`,
				answer: `1) استغلال الجدول:\n- في الوسط الشاهد توجد جميع مراحل الانقسام الخيطي بنسب طبيعية، أما في الوسط المعالج فتتراكم الخلايا في **المرحلة الاستوائية ($78 "%"$)** مع غياب خيوط مغزل الانقسام و**انعدام تام ($0 "%"$)** للمرحلتين الانفصالية والنهائية.\n- السبب: يمنع الكولشيسين تشكّل خيوط مغزل الانقسام، فلا تصطف الصبغيات ولا تهاجر الكروماتيدات نحو القطبين، فيتوقف الانقسام الخيطي المتساوي.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) صادق على إحدى الفرضيتين المقترحتين وفسّر لماذا واصل الجذر المعالج نمواً طفيفاً لعدة ساعات بعد $t = 12" h"$ قبل أن يثبت تماماً.`,
				answer: `2) المصادقة والتفسير:\n- **نصادق على الفرضية (1)** (الكولشيسين يوقف الانقسام الخيطي المتساوي في المرستيم) ونستبعد الفرضية (2).\n- تفسير النمو الطفيف المؤقت بعد $12" h"$: يعود إلى استمرار استطالة الخلايا التي كانت قد تشكلت مسبقاً قبل إضافة الكولشيسين، وبمجرد انتهاء استطالتها يتوقف النمو كلياً لغياب خلايا مرستيمية جديدة.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً يوضح سلسلة الأحداث التي تربط إضافة الكولشيسين بتوقف النمو الطولي للجذر.`
			},
			{
				type: 'text',
				content: `ارسم المخطط التحصيلي الوظيفي المطلوب (يمكنك مقارنة حلك بالمخطط النموذجي).`,
				answer: `المخطط التحصيلي:\n[مادة الكولشيسين ($${conc}" g/L"$)] $arrow.r$ [منع تشكل خيوط مغزل الانقسام في المرستيم] $arrow.r$ [توقف الخلايا في الطور الاستوائي وانعدام الانفصالية والنهائية] $arrow.r$ [توقف التكاثر الخلوي وعدم تجديد خلايا منطقة الاستطالة] $arrow.r$ [توقف النمو الطولي للجذر].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أظهر فحص القمة النامية لجذر البصل المعالج بالكولشيسين ($${conc}\\text{ g/L}$) توقف نمو الجذر، وتراكم $78\\%$ من الخلايا المنقسمة في الطور الاستوائي مع غياب تام ($0\\%$) للطورين الانفصالي والنهائي.\nكيف يثبط الكولشيسين نمو الجذر؟`,
				questionTextAr: 'اختر آلية تأثير الكولشيسين المصادق عليها تجريبياً:',
				imageUrl: flowUrl,
				imageCaption: 'مخطط تأثير الكولشيسين على الانقسام ونمو الجذر',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'يمنع الكولشيسين تشكل خيوط مغزل الانقسام، فتبقى الصبغيات محبوسة في الطور الاستوائي ($78\\%$) وتنعدم المرحلة الانفصالية والنهائية ($0\\%$)، مما يوقف تجدد خلايا الجذر.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لفهم دور الانقسام الخيطي المتساوي في النمو الطولي للجذر، دُرس تأثير مادة الكولشيسين بتركيز $${conc}" g/L"$ على نمو جذور نبات البصل.`,
				content
			},
			hints: [
				'لاحظ في الجدول ارتفاع الطور الاستوائي إلى $78\\%$ وانعدام الطورين الانفصالي والنهائي.',
				'غياب خيوط المغزل يمنع الهجرة القطبية للكروماتيدات في الانفصالية.',
				'النمو الطفيف بعد ساعة الإضافة سببه استطالة الخلايا المتشكلة سابقاً.'
			],
			solutionStepsAr: [
				'تحليل منحنيي طول الجذر وطرح المشكل والفرضيتين.',
				'استغلال الجدول لإثبات حجز الخلايا في الطور الاستوائي ($78\\%$) بسبب غياب المغزل.',
				'المصادقة على الفرضية (1) وبناء المخطط التحصيلي.'
			],
			finalAnswer: 'منع تشكل المغزل ← توقف الانقسام في الاستوائية ← توقف نمو الجذر'
		};
	}
};

export const SCIENCES_TEMPLATES_1AS_TCST_T1: SciencesParameterizedTemplate[] = [
	tpl1asTcstT1MitosisRecall,
	tpl1asTcstT1PhloemMatterRecall,
	tpl1asTcstT1RootGrowthReasoning,
	tpl1asTcstT1YeastMetabolismReasoning,
	tpl1asTcstT1SeedGerminationApproach,
	tpl1asTcstT1MitoticInhibitorApproach
];
