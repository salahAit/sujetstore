import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildMiniCodonTableRows, transcribeAndTranslate } from '../../bio-helpers';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgGeologyDiagram,
	svgMolecularBiology
} from '../../svg-sciences';

// ============================================================================
// 4 Shared Parameterized ONEC Templates — 2AS Trimester 3 (SE & MATH Core)
// ============================================================================

// [0] Recall (5 pts): Sedimentary rocks, stratigraphic principles & index fossils
export const tpl2asSharedT3StratigraphyFossilsRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t3_stratigraphy_fossils_recall',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'الجغرافيا القديمة: الصخور الرسوبية ومبادئ الاستراتيغرافيا والمستحاثات المرشدة',
	curriculumLessonId: 'sci_lesson_2as_shared_t3_sedimentary_rocks_stratigraphy',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const region = rng.pick(['الأطلس التلي', 'الأوراس', 'الهضاب العليا', 'الأطلس الصحراوي']);

		const svg = svgGeologyDiagram('rock_strata_fossils', {
			title: 'توضع الطبقات الرسوبية والمستحاثات المرشدة في عمود صخري'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t3_strata_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'الطبقة (4) الحاوية على ثلاثية الفصوص هي الأقدم (الحقب الأول) والطبقة (1) هي الأحدث وفق مبدأ التراكب والتماثل المستحاثي',
			[
				{
					text: 'الطبقة (1) العليا هي الأقدم والطبقة (4) السفلى هي الأحدث وفق مبدأ التراكب',
					diagnosticFeedback: 'عكست مبدأ التراكب! في سلسلة رسوبية غير مقلوبة تكون الطبقة السفلى أقدم من العليا.'
				},
				{
					text: 'الأمونيت مستحاثة مرشدة تؤرخ الحقب الأول بينما ثلاثية الفصوص تؤرخ الحقب الثالث',
					diagnosticFeedback: 'ثلاثية الفصوص تؤرخ الحقب الأول، والأمونيت تؤرخ الحقب الثاني، والنيموليت تؤرخ الحقب الثالث.'
				},
				{
					text: 'المستحاثة المرشدة الزمنية يجب أن تعيش مدى زمنياً طويلاً جداً دون انقراض',
					diagnosticFeedback: 'المستحاثة المرشدة الزمنية تمتاز بمدى زمني ضيق (قصير) وانتشار جغرافي واسع.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): مقطع استراتيغرافي لطبقات رسوبية غير مشوهة في منطقة ${region}`,
				width: 360
			},
			{
				type: 'text',
				content: `1) بالاعتماد على الوثيقة (1)، رتّب الطبقات الأربع من الأقدم إلى الأحدث مع ذكر المبدأ الاستراتيغرافي المطبَّق، ثم حدّد شروط اعتبار الأمونيت وثلاثية الفصوص «مستحاثات مرشدة زمنية جيدة».`,
				answer: `1) الترتيب وشروط المستحاثة المرشدة:\n- الترتيب من الأقدم إلى الأحدث: طبقة (4: شيست + ثلاثية الفصوص — الحقب الأول) $arrow.r$ طبقة (3: حجر رملي) $arrow.r$ طبقة (2: غضار + أمونيت — الحقب الثاني) $arrow.r$ طبقة (1: كلس حديث).\n- المبدأ المطبق: **مبدأ التراكب** (كل طبقة سفلى أقدم من التي تعلوها في سلسلة غير مقلوبة) مدعّماً بـ **مبدأ التماثل المستحاثي**.\n- شروط المستحاثة المرشدة الزمنية: **مدى زمني ضيق** (تطور وانقراض سريع) + **انتشار جغرافي واسع** + وفرة عددية.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تشرح فيه كيفية تصنيف الصخور الرسوبية وتوظيف مبادئ الاستراتيغرافيا والمستحاثات في التأريخ النسبي للطبقات الصخرية.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: تشكل الصخور الرسوبية المتوضعة في طبقات متعاقبة سجلاً تاريخياً لتطور الأرض. فكيف تُصنّف الصخور الرسوبية وكيف تُستعمل مبادئ الاستراتيغرافيا والمستحاثات في تأريخها النسبي؟\n- العرض: تتشكل الصخور الرسوبية عبر الحتّ والنقل والترسيب والتصخر، وتُصنّف حسب أصلها إلى حُتاتية (رصيص، حجر رملي، غضار)، كيميائية (جبس، ملح صخري)، وبيوكيميائية (كلس صدفي ومرجاني). لتأريخها نسبياً يعتمد الجيولوجيون على مبادئ الاستراتيغرافيا: **مبدأ التراكب** في الطبقات غير المقلوبة، **مبدأ الاستمرارية الجانبية** للطبقة الواحدة، **مبدأ التقاطع** (الفالق أحدث من الطبقات التي يقطعها)، و**مبدأ التماثل المستحاثي** بالاستعانة بالمستحاثات المرشدة الزمنية ذات المدى الزمني الضيق والانتشار الواسع (مثل ثلاثية الفصوص للحقب الأول والأمونيت للثاني والنيموليت للثالث).\n- الخاتمة: يتيح تكامل مبادئ الاستراتيغرافيا والمستحاثات المرشدة بناء السلم الزمني النسبي وإعادة قراءة تاريخ الأحواض الرسوبية.`,
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
				questionText: `يعرض المقطع الصخري في الوثيقة (1) أربع طبقات رسوبية أفقية غير مشوهة في ${region}.\nما القراءة الاستراتيغرافية الصحيحة لهذه الطبقات؟`,
				questionTextAr: 'اختر القراءة الصحيحة للوثيقة (1):',
				imageUrl: svgUrl,
				imageCaption: 'مقطع استراتيغرافي ومستحاثات مرشدة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'حسب مبدأ التراكب، الطبقة (4) في الأسفل هي الأقدم (ثلاثية الفصوص — الحقب الأول) تليها (3) ثم (2: أمونيت — الحقب الثاني) فالطبقة (1) الأحدث في الأعلى.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتوضع الصخور الرسوبية على شكل طبقات متراكبة تختزن مستحاثات تمثل شواهد ثمينة على تاريخ الأرض. تمثل الوثيقة (1) عموداً استراتيغرافياً في ${region}.`,
				content
			},
			hints: [
				'الرسوبيات تتراكم من الأسفل إلى الأعلى (مبدأ التراكب).',
				'ثلاثية الفصوص = الحقب الأول؛ الأمونيت = الحقب الثاني.',
				'اذكر الأصناف الثلاثة للصخور الرسوبية والمبادئ الأربعة للاستراتيغرافيا في النص العلمي.'
			],
			solutionStepsAr: [
				'ترتيب الطبقات من 4 إلى 1 بتطبيق مبدأ التراكب والتماثل المستحاثي.',
				'تحديد شروط المستحاثة المرشدة الزمنية (مدى زمني ضيق + انتشار واسع).',
				'تحرير النص العلمي المهيكل حول تصنيف الصخور ومبادئ التأريخ النسبي.'
			],
			finalAnswer: 'الأقدم: طبقة 4 (الحقب 1) ← طبقة 3 ← طبقة 2 (الحقب 2) ← الأحدث: طبقة 1'
		};
	}
};

// [1] Reasoning (7 pts): Sickle-cell anemia (HbA vs HbS) using exact transcribeAndTranslate!
export const tpl2asSharedT3SickleCellReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t3_sickle_cell_reasoning',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'الاستدلال العلمي: العلاقة بين النمط المورثي والظاهري والطفرة في فقر الدم المنجلي',
	curriculumLessonId: 'sci_lesson_2as_shared_t3_genotype_phenotype_mutations',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Real beta-globin codons 4-7 template 3'->5': TGA GGA CTC CTC (HbA) vs TGA GGA CAC CTC (HbS)
		// Vary prefix/suffix triplets for deterministic seed variety while preserving exact Glu(GAG)->Val(GUG) mutation!
		const variant = rng.pick([
			{ normal: 'TGAGGACTCCTC', mutant: 'TGAGGACACCTC', mutPos: 8, mutLabel: 'النيكليوتيدة رقم 8' },
			{ normal: 'CACTGAGGACTCCTC', mutant: 'CACTGAGGACACCTC', mutPos: 11, mutLabel: 'النيكليوتيدة رقم 11' },
			{ normal: 'GGTGACTGAGGACTC', mutant: 'GGTGACTGAGGACAC', mutPos: 14, mutLabel: 'النيكليوتيدة رقم 14' }
		]);
		const norm = transcribeAndTranslate(variant.normal);
		const mut = transcribeAndTranslate(variant.mutant);
		const allCodons = [...norm.codons, ...mut.codons];
		const miniTable = buildMiniCodonTableRows(allCodons);

		const svg = svgMolecularBiology('dna_double_helix', {
			title: 'مقارنة تتابع النيكليوتيدات بين الأليل العادي والطافر'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t3_sickle_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`طفرة استبدال ($T \\rightarrow A$ في ${variant.mutLabel}) أدت إلى تعويض Glu بـ Val (${mut.peptideStr}) وتشكل هيموغلوبين $HbS$ متليّف`,
			[
				{
					text: `طفرة حذف قاعدة واحدة أدت إلى توقف مبكر للترجمة وغياب الهيموغلوبين كلياً`,
					diagnosticFeedback: 'عدد النيكليوتيدات متساوٍ في الأليلين، فهي طفرة استبدال وليست طفرة حذف.'
				},
				{
					text: `طفرة صامتة لم تغير تتابع الأحماض الأمينية إطلاقاً (${norm.peptideStr})`,
					diagnosticFeedback: `تغيّر الحمض الأميني من Glu إلى Val فأصبحت السلسلة (${mut.peptideStr}).`
				},
				{
					text: 'النمط المورثي $HbA//HbS$ يسبب موت الجنين فوراً لأن أليل $HbS$ سائد تماماً',
					diagnosticFeedback: 'الفرد الهجين HbA//HbS سليم ظاهرياً في الشروط العادية لأن أليل HbS متنحٍ على المستوى العضوي.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): يُعدّ فقر الدم المنجلي (الدريبانوسيتوز) مرضاً وراثياً يمس الكريات الدموية الحمراء. يعرض الجدول مقارنة للمستويات الظاهرية عند شخص سليم ($HbA//HbA$) وشخص مصاب ($HbS//HbS$).`
			},
			{
				type: 'table',
				headers: ['مستوى النمط الظاهري', 'الشخص السليم (HbA//HbA)', 'الشخص المصاب (HbS//HbS)'],
				cells: [],
				rows: [
					['المستوى العضوي', 'نقل طبيعي للأكسجين، نشاط عادي', 'فقر دم حاد، انسداد الشعيرات الدموية، تعب'],
					['المستوى الخلوي', 'كريات حمراء مقعرة الوجهين مرنة', 'كريات حمراء منجلية صلبة وهشة سريعة الانحلال'],
					['المستوى الجزيئي', 'هيموغلوبين HbA منحل طبيعياً', 'هيموغلوبين HbS يتبلمر إلى ألياف صلبة عند نقص O₂']
				]
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الجدول، بيّن العلاقة السببية بين المستويات الثلاثة للنمط الظاهري (الجزيئي ← الخلوي ← العضوي) لتفسير أعراض مرض فقر الدم المنجلي.`,
				answer: `1) العلاقة بين المستويات الثلاثة:\n- على **المستوى الجزيئي**: يمتلك المصاب هيموغلوبين غير عادي ($HbS$) يتجمع على شكل ألياف صلبة عند انخفاض الأكسجين.\n- يؤدي هذا التغيّر الجزيئي على **المستوى الخلوي** إلى تشوّه الكرية الحمراء وفقدان مرونتها (شكل منجلي هش).\n- ينعكس ذلك على **المستوى العضوي** بانحلال الكريات (فقر دم حاد) وصعوبة مرورها في الشعيرات الدقيقة (انسداد أوعية ونقص أكسجة الأنسجة).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ما هو الأصل الوراثي المحتمل لتغير جزيئة الهيموغلوبين من $HbA$ إلى $HbS$؟`,
				answer: `2) الأصل الوراثي: حدوث **طفرة** على مستوى مورثة سلسلة $beta$-غلوبين (جزيئة الـ $upright("ADN")$) أدت إلى ظهور أليل جديد ($HbS$) يُشفّر لبروتين متغير البنية.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتأكد من الأصل الجزيئي للمرض، نُقارن جزءاً من السلسلة المستنسخة للـ $upright("ADN")$ ($3' arrow.r 5'$) لكل من الأليل العادي $HbA$ والأليل الطافر $HbS$ مع الاستعانة بجدول الشفرة الوراثية المصغر والوثيقة (1):`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): البنية النيكليوتيدية للـ ADN (مقر المورثة)',
				width: 320
			},
			{
				type: 'text',
				content: `- الأليل العادي $HbA$ ($3' arrow.r 5'$): ${norm.dnaTriplets.join(' - ')}\n- الأليل الطافر $HbS$ ($3' arrow.r 5'$): ${mut.dnaTriplets.join(' - ')}`
			},
			{
				type: 'table',
				headers: miniTable.headers,
				cells: [],
				rows: miniTable.rows
			},
			{
				type: 'text',
				content: `1) مثّل سلسلة الـ $upright("ARNm")$ ($5' arrow.r 3'$) وتتابع الأحماض الأمينية الموافق لكل من الأليل العادي $HbA$ والأليل الطافر $HbS$.`,
				answer: `1) التعبير المورثي للأليلين:\n- الأليل العادي $HbA$:\n  • $upright("ARNm")$ ($5' arrow.r 3'$): ${norm.codons.join(' - ')}\n  • سلسلة الأحماض الأمينية: ${norm.peptideStr}\n- الأليل الطافر $HbS$:\n  • $upright("ARNm")$ ($5' arrow.r 3'$): ${mut.codons.join(' - ')}\n  • سلسلة الأحماض الأمينية: ${mut.peptideStr}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) قارن التتابعين النيكليوتيديين والأحماض الأمينية لتحديد نوع الطفرة وموقعها بدقة، واستنتج كيف تُحدث الطفرات تنوعاً أليلياً ومظهرياً.`,
				answer: `2) المقارنة والاستنتاج:\n- المقارنة: حدثت **طفرة استبدال نقطية** عند ${variant.mutLabel} باستبدال القاعدة $T$ في $HbA$ بالقاعدة $A$ في $HbS$، ما غيّر رامزة الـ $upright("ARNm")$ من GAG إلى GUG وعوّض الحمض الأميني **Glu** بـ **Val**.\n- الاستنتاج: يحدد تتابع النيكليوتيدات في الـ $upright("ADN")$ (النمط المورثي) تتابع الأحماض الأمينية في البروتين (النمط الجزيئي)، وأي طفرة استبدال غير صامتة تولّد أليلاً جديداً وتنوعاً ظاهرياً.`,
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `بمقارنة السلسلة المستنسخة للأليل العادي $HbA$ (${norm.dnaTriplets.join('-')}) والأليل الطافر $HbS$ (${mut.dnaTriplets.join('-')})، ما نوع الطفرة ونتيجتها الجزيئية؟`,
				questionTextAr: 'اختر التحليل الجزيئي الدقيق للطفرة في فقر الدم المنجلي:',
				imageUrl: svgUrl,
				imageCaption: 'البنية النيكليوتيدية للـ ADN',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `استُبدلت قاعدة $T$ بـ $A$ في ${variant.mutLabel} (طفرة استبدال)، فتحوّلت الرامزة من GAG إلى GUG وتغيّر الحمض الأميني من Glu إلى Val لتصبح السلسلة (${mut.peptideStr}).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لفهم العلاقة السببية بين النمط المورثي (الـ $upright("ADN")$) ومستويات النمط الظاهري وتأثير الطفرات، ندرس مثال مرض فقر الدم المنجلي (الدريبانوسيتوز).`,
				content
			},
			hints: [
				'ابدأ دوماً من المستوى الجزيئي (الهيموغلوبين) لتفسير الخلوي (الكرية المنجلية) ثم العضوي (فقر الدم).',
				'عند كتابة ARNm مقابل السلسلة المستنسخة للـ ADN: $A\\rightarrow U$، $T\\rightarrow A$، $C\\rightarrow G$، $G\\rightarrow C$.',
				'قارن التتابعين نيكليوتيدة بنيكليوتيدة لاكتشاف موضع الاستبدال الدقيق.'
			],
			solutionStepsAr: [
				'الربط السببي بين المستويات الجزيئي والخلوي والعضوي لمرض فقر الدم المنجلي.',
				`ترجمة $HbA$ (${norm.peptideStr}) و $HbS$ (${mut.peptideStr}).`,
				`تحديد طفرة الاستبدال ($T \\rightarrow A$ في ${variant.mutLabel}) وتعويض Glu بـ Val.`
			],
			finalAnswer: `\\text{طفرة استبدال } (T\\rightarrow A) \\Rightarrow \\text{Glu} \\rightarrow \\text{Val}`
		};
	}
};

// [2] Reasoning (7 pts): Paleogeography reconstruction (Transgression/Regression & Gap)
export const tpl2asSharedT3PaleogeographyReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t3_paleogeography_reasoning',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'الاستدلال العلمي: مضاهاة عمودين استراتيغرافيين وإعادة بناء حوض ترسيبي قديم',
	curriculumLessonId: 'sci_lesson_2as_shared_t3_fossils_paleogeography',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const basin = rng.pick(['حوض قسنطينة القديم', 'حوض بشار القديم', 'حوض تلمسان القديم']);
		const depthCoral = rng.pick([20, 25, 30]);

		const svg = svgGeologyDiagram('rock_strata_fossils', {
			title: 'مقطع استراتيغرافي يبيّن تتابع السحنات الصخرية والمستحاثات'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t3_paleo_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'التدرج الصاعد (رصيص ← حجر رملي ← غضار ← كلس مرجاني بأمونيت) يدل على تجاوز بحري خلال الحقب الثاني في بحر دافئ صافٍ، وغياب الغضار في الموقع (ب) يمثّل فجوة استراتيغرافية',
			[
				{
					text: 'التدرج الصاعد (رصيص ← حجر رملي ← غضار ← كلس) يدل على انحسار بحري وتجفف الحوض',
					diagnosticFeedback: 'تناقص قدّ الحبيبات نحو الأعلى وظهور كلس بحري يمثل تسلسلاً موجباً (تجاوز بحري) لا انحساراً.'
				},
				{
					text: 'وجود المرجان يثبت أن الحوض كان وسطاً قارياً بارداً وجافاً خلال الحقب الأول',
					diagnosticFeedback: 'حسب مبدأ الحالية، المرجان يعيش في بحر دافئ صافٍ وقليل العمق، والأمونيت يؤرخ الحقب الثاني.'
				},
				{
					text: 'غياب طبقة الغضار في الموقع (ب) يعني أن طبقة الكلس أقدم من الحجر الرملي',
					diagnosticFeedback: 'غياب طبقة بين طبقتين متعاقبتين يمثل فجوة استراتيغرافية (انقطاع ترسيب أو حتّ) ولا يقلب الأعمار.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): لإعادة بناء التاريخ الجيولوجي لـ ${basin}، أنجز الجيولوجيون عمودين استراتيغرافيين في موقعين متقاربين (أ) و (ب) ولخّصوا سحنات الطبقات ومستحاثاتها من الأسفل إلى الأعلى في الجدول والوثيقة (1):`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تتابع الطبقات الرسوبية والمستحاثات في الحوض المدروس',
				width: 350
			},
			{
				type: 'table',
				headers: ['الطبقة (من الأسفل للأعلى)', 'الموقع (أ)', 'الموقع (ب)', 'المستحاثات الموجودة'],
				cells: [],
				rows: [
					['الطبقة السفلى C₁', 'رصيص (حصى خشن)', 'رصيص', 'آثار نباتات قارية'],
					['الطبقة C₂', 'حجر رملي', 'حجر رملي', 'أصداف شاطئية'],
					['الطبقة C₃', 'غضار دقيق الحبيبات', '(غائبة)', 'أمونيت (في الموقع أ)'],
					['الطبقة العليا C₄', 'كلس مرجاني', 'كلس مرجاني', 'أمونيت + شعاب مرجانية']
				]
			},
			{
				type: 'text',
				content: `1) طبّق مبدأ الحالية لتصنيف مستحاثتي **الأمونيت** و**المرجان** (في الطبقة $C_4$) إلى مستحاثة مرشدة زمنية ومستحاثة سحنة، وحدّد عمر الطبقة $C_4$ وظروف وسط ترسبها (علماً أن المرجان الحالي يعيش في مياه دافئة $> 20" °C"$ وعمق أقل من $${depthCoral}" m"$).`,
				answer: `1) التصنيف والتأريخ والوسط:\n- **الأمونيت**: مستحاثة مرشدة زمنية ← تؤرخ الطبقتين $C_3$ و $C_4$ بـ **الحقب الثاني**.\n- **المرجان**: مستحاثة سحنة ← تطبيقاً لمبدأ الحالية، يثبت أن الطبقة $C_4$ ترسبت في **وسط بحري دافئ ($> 20" °C"$), صافٍ، مضاء وقليل العمق ($< ${depthCoral}" m"$)**.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حدّد نوع التسلسل الرسوبي من $C_1$ إلى $C_4$ في الموقع (أ)، واستنتج الحركة البحرية التي شهدها ${basin}.`,
				answer: `2) التسلسل والحركة البحرية:\n- الانتقال صعوداً من الرصيص الخشن ($C_1$) إلى الحجر الرملي ($C_2$) ثم الغضار الدقيق ($C_3$) فالكلس البحري ($C_4$) يشكّل **تسلسلاً موجباً** (تناقص قدّ الحبيبات نحو الأعلى).\n- الاستنتاج: شهد الحوض **تجاوزاً بحرياً** (طغيان البحر تدريجياً فوق منطقة كانت قارية شاطئية).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): قارن بين العمودين في الموقعين (أ) و (ب) لتحديد الأحداث الجيولوجية المحلية.`
			},
			{
				type: 'text',
				content: `1) كيف نسمّي غياب طبقة الغضار ($C_3$) في الموقع (ب)؟ قدّم فرضيتين جيولوجيتين تفسّران سبب هذا الغياب.`,
				answer: `1) التسمية والفرضيتان:\n- يُسمى غياب الطبقة $C_3$ في الموقع (ب) **فجوة استراتيغرافية**.\n- الفرضيتان المفسرتان:\n  • إما **انقطاع الترسيب** في الموقع (ب) خلال تلك الفترة بسبب انحسار بحري محلي (بقاء الموقع بارزاً فوق الماء).\n  • أو ترسب طبقة الغضار $C_3$ ثم تعرضها لـ **الحتّ والتعرية** قبل عودة البحر وترسيب طبقة الكلس $C_4$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) على الرغم من غياب $C_3$ في الموقع (ب)، كيف أثبتنا أن طبقتي الكلس $C_4$ في الموقعين (أ) و (ب) لهما نفس العمر الجيولوجي؟ اذكر المبدأ الاستراتيغرافي.`,
				answer: `2) الإثبات والمبدأ:\n- بما أن الطبقة $C_4$ في الموقعين (أ) و (ب) تحتوي معاً نفس المستحاثة المرشدة (**الأمونيت**)، فهما من نفس العمر (الحقب الثاني) تطبيقاً لـ **مبدأ التماثل المستحاثي** (ومبدأ الاستمرارية الجانبية في حال اتصال الطبقة).`,
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `في ${basin} يتتابع من الأسفل للأعلى: رصيص $\\leftarrow$ حجر رملي $\\leftarrow$ غضار (غائب في الموقع ب) $\\leftarrow$ كلس يحوي أمونيت ومرجان.\nما الاستنتاج الجيولوجي الصحيح؟`,
				questionTextAr: 'اختر القراءة الباليوجغرافية الصحيحة لهذا الحوض:',
				imageUrl: svgUrl,
				imageCaption: 'السحنات الصخرية والمستحاثات في الحوض الترسيبي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'التدرج من الرصيص إلى الكلس المرجاني بالأمونيت تسلسل موجب يدل على تجاوز بحري دافئ في الحقب الثاني، وغياب الغضار في (ب) فجوة استراتيغرافية.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تسمح دراسة السحنات الصخرية والمستحاثات بإعادة بناء الجغرافيا القديمة للأحواض الرسوبية. ندرس في هذا التمرين معطيات موقعين في ${basin}.`,
				content
			},
			hints: [
				'الأمونيت = زمن (الحقب الثاني)؛ المرجان = سحنة (بحر دافئ صافٍ قليل العمق).',
				'تناقص حجم الحبيبات من الأسفل للأعلى = تسلسل موجب = تجاوز بحري.',
				'غياب طبقة بين طبقتين في موقع معين = فجوة استراتيغرافية (توقف ترسيب أو حتّ).'
			],
			solutionStepsAr: [
				'التمييز بين الأمونيت (مرشدة زمنية) والمرجان (سحنية) وتطبيق مبدأ الحالية.',
				'استنتاج التسلسل الموجب والتجاوز البحري في الحقب الثاني.',
				'تسمية الفجوة الاستراتيغرافية وتفسيرها ثم تأريخ C₄ بمبدأ التماثل المستحاثي.'
			],
			finalAnswer: 'تجاوز بحري في الحقب الثاني (بحر دافئ) + فجوة استراتيغرافية في الموقع (ب)'
		};
	}
};

// [3] Scientific Approach (8 pts): UV radiation mutagenesis in yeast colonies
export const tpl2asSharedT3UvMutationApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t3_uv_mutation_approach',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'المسعى العلمي: تأثير العوامل المطفّرة (الأشعة UV) في إحداث الطفرات الوراثية عند الخميرة',
	curriculumLessonId: 'sci_lesson_2as_shared_t3_genotype_phenotype_mutations',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const optTime = rng.pick(difficulty === 'easy' ? [40, 45] : [35, 45, 50]);
		const peakMut = rng.pick([72, 78, 84]);
		const survAtPeak = roundTo(100 * Math.exp(-0.025 * optTime), 1);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 90,
			yMin: 0,
			yMax: 105,
			xStep: 15,
			yStep: 20,
			xLabel: 't (s)',
			yLabel: 'N (%)',
			title: 'تطور نسبة بقاء الخميرة ونسبة المستعمرات البيضاء الطافرة بدلالة زمن الإشعاع',
			curves: [
				{
					fn: (t) => 100 * Math.exp(-0.025 * t),
					color: '#2563eb',
					label: 'نسبة البقاء'
				},
				{
					fn: (t) => peakMut * (t / optTime) * Math.exp(1 - t / optTime),
					color: '#dc2626',
					dashed: true,
					label: 'نسبة الطفرات'
				}
			],
			points: [
				{ x: optTime, y: peakMut, label: `ذروة ${peakMut}%`, color: '#dc2626' },
				{ x: optTime, y: survAtPeak, label: `بقاء ${survAtPeak}%`, color: '#1d4ed8' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t3_uv_mut_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تُحدث الأشعة فوق البنفسجية طفرات عشوائية في الـ ADN (ذروتها $${peakMut}\\%$ عند $${optTime}\\text{ s}$) تنتقل وراثياً لكل خلايا المستعمرة البنت (أصل مورثي)، وتسبب موت الخلايا عند الإطالة`,
			[
				{
					text: 'يتغيّر لون المستعمرات مؤقتاً بفعل حرارة المصباح فقط ثم تعود كلها حمراء في الجيل الموالي',
					diagnosticFeedback: 'إعادة زرع مستعمرة بيضاء طافرة في وسط جديد دون أشعة أعطى 100% مستعمرات بيضاء، مما يثبت أن التغير وراثي مورثي.'
				},
				{
					text: 'ترفع الأشعة فوق البنفسجية نسبة بقاء الخميرة إلى $100\\%$ كلما طالت مدة التعرض',
					diagnosticFeedback: `المنحنى الأزرق يبيّن تناقصاً أسّياً حاداً لنسبة البقاء (وصل إلى ${survAtPeak}% عند ${optTime} s).`
				},
				{
					text: 'لا تؤثر الأشعة فوق البنفسجية على جزيئة الـ ADN إطلاقاً',
					diagnosticFeedback: 'إثبات انتقال الصفة عبر الأجيال وظهور أليل جديد يؤكدان أن الأشعة UV عامل مطفّر يمس الـ ADN.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): تُشكّل سلالة خاصة من خميرة الخبز (سلالة $upright("Ade2")$) مستعمرات ذات لون أحمر طبيعياً عند زرعها في علب بتري. عند تعريض هذه العلب لأشعة فوق بنفسجية (UV) لمدد متزايدة، لوحظ ظهور مستعمرات جديدة ذات لون أبيض.`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي الذي يثيره ظهور المستعمرات البيضاء بعد التعرض للأشعة فوق البنفسجية.`,
				answer: `1) المشكل العلمي: كيف أدت الأشعة فوق البنفسجية إلى تغير لون بعض مستعمرات الخميرة من الأحمر إلى الأبيض، وهل هذا التغير مؤقت أم وراثي يمس المادة الوراثية (الـ $upright("ADN")$)؟`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين تفسّران سبب ظهور المستعمرات البيضاء تحت تأثير الأشعة فوق البنفسجية.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: الأشعة فوق البنفسجية **عامل مطفّر** يُحدث تغيراً دائماً (طفرة) في مورثة مسؤولة عن الصباغ الأحمر على مستوى الـ $upright("ADN")$ فيظهر أليل جديد ينتقل عبر الأجيال.\n- الفرضية 2: الأشعة فوق البنفسجية تخرب الصباغ الأحمر مؤقتاً داخل الخلية دون المساس بالـ $upright("ADN")$ (تغيّر غير وراثي يزول بانتهاء الإشعاع).`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، تابَعنا تطور نسبة بقاء المستعمرات ونسبة المستعمرات البيضاء الطافرة بدلالة زمن الإشعاع (الوثيقة 1)، كما عُزلت خلايا من مستعمرة بيضاء وزُرعت في وسط جديد **دون تعريضها للأشعة**، فأعطت بعد $48" h"$ جيلاً كاملاً من مستعمرات **بيضاء بنسبة $100 "%"$** (بينما أعطت خلايا المستعمرات الحمراء الشاهدة $100 "%"$ مستعمرات حمراء).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تأثير مدة التعرض للأشعة فوق البنفسجية على البقاء ونسبة الطفرات في الخميرة',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنيين في الوثيقة (1) وحدّد الزمن الأمثل للحصول على أكبر نسبة طفرات، مبرزاً التأثير المزدوج للأشعة فوق البنفسجية.`,
				answer: `1) التحليل:\n- **نسبة البقاء** (الأزرق): تتناقص باستمرار وبشدة مع زيادة مدة الإشعاع (من $100 "%"$ إلى $${survAtPeak} "%"$ عند $${optTime}" s"$ وتقارب الصفر عند $90" s"$): للأشعة تأثير **قاتل (مميت)** عند الجرعات الطويلة.\n- **نسبة المستعمرات البيضاء الطافرة** (الأحمر): ترتفع من $0 "%"$ لتبلغ ذروة $${peakMut} "%"$ عند الزمن $${optTime}" s"$، ثم تنخفض بعد ذلك بسبب موت معظم الخلايا.\n- التأثير المزدوج: الأشعة UV عامل **مطفّر** يرفع تواتر الطفرات، وعامل **مميت** عند التعرض المطوّل.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) باستغلال نتيجة إعادة زرع المستعمرات البيضاء دون إشعاع ($100 "%"$ بيضاء)، صادق على الفرضية الصحيحة واستخلص دور الطفرات في التنوع الأليلي.`,
				answer: `2) المصادقة والاستخلاص:\n- استمرار ظهور اللون الأبيض بنسبة $100 "%"$ في الأجيال الموالية رغم زوال الأشعة يثبت أن الصفة الجديدة أصبحت **موروثة ومستقرة**، أي أنها ناتجة عن **تعديل في تتابع نيكليوتيدات الـ $upright("ADN")$** وليس تبييضاً مؤقتاً.\n- وعليه نرفض الفرضية (2) و**نصادق على الفرضية (1)**؛ فالطفرات هي المصدر الأساسي لاستحداث **أليلات جديدة** وتنوع الأنماط الظاهرية.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): لخّص في مخطط تحصيلي وظيفي كيف يحوّل عامل مطفّر (الأشعة UV) النمط المورثي والظاهري للخميرة ويولّد تنوعاً وراثياً في الأجيال القادمة.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[سلالة خميرة حمراء (أليل أصلي)] --(تعرض للأشعة UV كعامل مطفّر لمدة $${optTime}" s"$)--> [تغير في تتابع نيكليوتيدات الـ ADN (طفرة)] $arrow.r$ [ظهور أليل جديد مستقر] $arrow.r$ [تغير البروتين الإنزيمي (المستوى الجزيئي)] $arrow.r$ [تغير لون الخلية إلى الأبيض (المستوى الخلوي والظاهري)] --(تضاعف الـ ADN وانقسامات خيطية)--> [توريث الأليل الجديد وتشكّل مستعمرات بيضاء $100 "%"$ = تنوع أليلي].`,
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
				questionText: `أظهر تعريض خميرة حمراء للأشعة فوق البنفسجية ذروة طفرات بيضاء بلغت $${peakMut}\\%$ عند $${optTime}\\text{ s}$ (بنسبة بقاء $${survAtPeak}\\%$)، وعند إعادة زرع مستعمرة بيضاء دون أشعة أعطت $100\\%$ مستعمرات بيضاء.\nما الفرضية المصادق عليها؟`,
				questionTextAr: 'اختر الخلاصة العلمية المصادق عليها:',
				imageUrl: svgUrl,
				imageCaption: 'تأثير الأشعة UV على البقاء ونسبة الطفرات',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ثبات الصفة البيضاء بنسبة $100\\%$ عبر الأجيال دون إشعاع يثبت أن الأشعة UV عامل مطفّر غيّر الـ $\\text{ADN}$ واستحدث أليلاً جديداً، كما تسبب موت الخلايا عند الإطالة.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `رغم ندرة الطفرات التلقائية، ترفع بعض العوامل البيئية الفيزيائية والكيميائية من تواترها بشكل كبير. لدراسة تأثير الأشعة فوق البنفسجية (UV) ندرس المعطيات التجريبية على خميرة الخبز.`,
				content
			},
			hints: [
				'لاحظ التناقص المستمر لمنحنى البقاء مقابل وجود ذروة ثم تراجع لمنحنى الطفرات.',
				'إعادة الزرع دون أشعة مع بقاء اللون الأبيض 100% هو الدليل القاطع على الأصل المورثي.',
				'اربط في المخطط بين العامل المطفّر ← تغير الـ ADN ← أليل جديد ← تغير النمط الظاهري ← التوريث.'
			],
			solutionStepsAr: [
				'طرح المشكل العلمي واقتراح فرضيتي التغير المورثي (الطفرة) مقابل التغير المؤقت.',
				`تحليل منحنيي البقاء ($${survAtPeak}\\%$) والطفرات (ذروة $${peakMut}\\%$ عند $${optTime}\\text{ s}$).`,
				'المصادقة على الفرضية (1) وبناء المخطط التحصيلي للطفرة المستحثة بـ UV.'
			],
			finalAnswer: `\\text{الأشعة UV عامل مطفّر ومميت (ذروة } ${peakMut}\\% \\text{ عند } ${optTime}\\text{ s})`
		};
	}
};

export const SHARED_SCIENCES_TEMPLATES_2AS_T3: SciencesParameterizedTemplate[] = [
	tpl2asSharedT3StratigraphyFossilsRecall,
	tpl2asSharedT3SickleCellReasoning,
	tpl2asSharedT3PaleogeographyReasoning,
	tpl2asSharedT3UvMutationApproach
];
