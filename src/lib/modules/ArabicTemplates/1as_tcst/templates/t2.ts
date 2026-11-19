import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock
} from '../../arabic-helpers';

// ============================================================================
// 4 Parameterized ONEC Templates — 1AS TCST Trimester 2 (12 + 8 = 20)
// (2 intellectual_building [12pts], 2 linguistic_building [8pts])
// ============================================================================

// 1. البناء الفكري (12 ن) — السند الشعري في الدعوة والفتوح (حسان بن ثابت / كعب بن زهير رضي الله عنهما)
const tpl1asTcstT2PoetryDawaIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t2_dawa_hassan_kaab_ib',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — شعر الدعوة والفتوح في عصر صدر الإسلام',
	curriculumLessonId: 'arb_lesson_1as_tcst_t2_athar_quran_dawa',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'يوم الفتح ونصرة الدعوة',
				author: 'حسان بن ثابت رضي الله عنه',
				source: 'ديوان حسان بن ثابت',
				verses: [
					['عَدِمْنَا خَيْلَنَا إِنْ لَمْ تَرَوْهَا', 'تُثِيرُ [[النَّقْعَ]] مَوْعِدُهَا كَدَاءُ'],
					['يُبَارِينَ الأَعِنَّةَ مُصْعِدَاتٍ', 'عَلَى أَكْتَافِهَا الأَسَلُ الظِّمَاءُ'],
					['فَإِمَّا تُعْرِضُوا عَنَّا اعْتَمَرْنَا', 'وَكَانَ [[الْفَتْحُ]] وَانْكَشَفَ الْغِطَاءُ'],
					['وَإِلَّا فَاصْبِرُوا لِجِلَادِ يَوْمٍ', '((يُعِزُّ اللَّهُ فِيهِ مَنْ يَشَاءُ))'],
					['هَجَوْتَ مُحَمَّدًا فَأَجَبْتُ عَنْهُ', 'وَعِنْدَ اللَّهِ فِي ذَاكَ الْجَزَاءُ'],
					['فَإِنَّ أَبِي وَوَالِدَهُ وَعِرْضِي', 'لِعِرْضِ مُحَمَّدٍ مِنْكُمْ وِقَاءُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'النقع', meaning: 'الغبار المثار في المعركة' },
					{ word: 'كداء', meaning: 'ثنية بأعلى مكة' },
					{ word: 'الأسل', meaning: 'الرماح' },
					{ word: 'جلاد', meaning: 'مضاربة بالسيوف' }
				],
				theme: 'الدفاع عن النبي صلى الله عليه وسلم وتصوير قوة المسلمين يوم فتح مكة وتأييد الله لهم',
				q1: 'ما المناسبة التاريخية التي قيلت فيها هذه الأبيات؟ ومن المخاطَبون فيها؟',
				a1: 'قيلت في سياق فتح مكة والردّ على شعراء قريش؛ والمخاطَبون هم مشركو قريش الذين عادوا الدعوة وصدّوا المسلمين عن البيت الحرام.',
				q2: 'خيّر الشاعر قريشا بين أمرين في البيتين الثالث والرابع، اذكرهما.',
				a2: 'خيّرهم بين إخلاء الطريق للمسلمين ليعتمروا بسلام ويتحقق الفتح، أو الاستعداد ليوم قتال شديد يعزّ الله فيه جنده.',
				q3: 'استخرج مظهرين من مظاهر تأثر الشاعر بالقرآن الكريم والقيم الإسلامية.',
				a3: '1) توظيف الألفاظ والمعاني القرآنية (الفتح، يعز الله فيه من يشاء، عند الله في ذاك الجزاء). 2) الإخلاص في الذبّ عن عرض النبي صلى الله عليه وسلم وابتغاء الأجر من الله وحده.',
				q4: 'ما النمط الغالب في المقطع الأول (الأبيات 1 و2)، وما النمط في البيتين (3 و4)؟ علّل.',
				a4: 'في الأول والثاني النمط الوصفي لتصوير زحف الخيل والرماح (تثير النقع، مصعدات، الأسل الظماء)، وفي الثالث والرابع النمط الإيعازي والحجاجي لوجود الشرط والأمر والتخيير (فإما تعرضوا، فاصبروا).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يصوّر حسان بن ثابت رضي الله عنه زحف جيش المسلمين المظفّر نحو مكة، مخيّرا قريشا بين فتح الطريق سلميا أو مواجهة يوم عصيب ينصر الله فيه دينه، ثم يعلن اعتزازه بالدفاع عن النبي صلى الله عليه وسلم فاديا عرضه بكل ما يملك ومحتسبا أجره عند الله.',
				mcqCorrect: 'نصرة النبي صلى الله عليه وسلم وتصوير زحف الفتح المظفّر بتأييد الله',
				mcqDistractors: [
					{ text: 'وصف الطبيعة والمطر في صحراء الحجاز', diagnosticFeedback: 'النص في فتح مكة والدفاع عن النبي صلى الله عليه وسلم.' },
					{ text: 'الفخر بالعصبية القبلية الجاهلية', diagnosticFeedback: 'الفخر هنا إيماني للدفاع عن الرسول صلى الله عليه وسلم والفتح.' },
					{ text: 'رثاء صديق راحل في الغربة', diagnosticFeedback: 'غرض الأبيات الحماسة الإيمانية ونصرة الدعوة لا الرثاء.' }
				]
			},
			{
				title: 'في مدح النبي صلى الله عليه وسلم والمهاجرين',
				author: 'كعب بن زهير رضي الله عنه',
				source: 'قصيدة بانت سعاد',
				verses: [
					['نُبِّئْتُ أَنَّ رَسُولَ اللَّهِ أَوْعَدَنِي', 'وَالْعَفْوُ عِنْدَ رَسُولِ اللَّهِ [[مَأْمُولُ]]'],
					['لَا تَأْخُذَنِّي بِأَقْوَالِ الْوُشَاةِ وَلَمْ', 'أُذْنِبْ وَلَوْ كَثُرَتْ فِيَّ الأَقَاوِيلُ'],
					['إِنَّ [[الرَّسُولَ]] لَنُورٌ ((يُسْتَضَاءُ بِهِ))', 'مُهَنَّدٌ مِنْ سُيُوفِ اللَّهِ مَسْلُولُ'],
					['فِي عُصْبَةٍ مِنْ قُرَيْشٍ قَالَ قَائِلُهُمْ', 'بِبَطْنِ مَكَّةَ لَمَّا أَسْلَمُوا زُولُوا'],
					['زَالُوا فَمَا زَالَ أَنْكَاسٌ وَلَا كُشُفٌ', 'عِنْدَ اللِّقَاءِ وَلَا مِيلٌ مَعَازِيلُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'الوشاة', meaning: 'السعاة بالنميمة' },
					{ word: 'مهند', meaning: 'سيف مصنوع من حديد الهند' },
					{ word: 'عصبة', meaning: 'جماعة متماسكة (المهاجرون)' },
					{ word: 'أنكاس', meaning: 'ضعفاء جبناء' }
				],
				theme: 'الاعتذار الصادق ومدح النبي صلى الله عليه وسلم وأصحابه المهاجرين بالهداية والشجاعة',
				q1: 'بمَ استعطف كعب بن زهير رضي الله عنه النبي صلى الله عليه وسلم في البيتين الأول والثاني؟',
				a1: 'استعطفه برجاء عفوه المعهود وبالتماس عدم الأخذ بكلام الوشاة وأصحاب النميمة، مظهرا ندمه وإقباله تائبا مسلما.',
				q2: 'بمَ وصف الشاعر النبي صلى الله عليه وسلم في البيت الثالث؟ وما دلالة كل وصف؟',
				a2: 'وصفه بالنور الذي يُستضاء به للدلالة على هدايته الناس وإخراجهم من الظلمات، وبالسيف المسلول من سيوف الله للدلالة على نصرة الحق وقوة العزيمة.',
				q3: 'ما الصفات التي أثبتها الشاعر للمهاجرين من قريش في البيتين الرابع والخامس؟',
				a3: 'أثبت لهم التضحية بالهجرة في سبيل الدين، والثبات والشجاعة التامة في ميادين اللقاء، ونفى عنهم الضعف والجبن وقلة الاستعداد.',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له من الأبيات.',
				a4: 'النمط الغالب هو الوصفي الممزوج بالحجاج والاستعطاف؛ ومن مؤشراته: كثرة النعوت والأخبار الدالة على الصفات (مأمول، نور، مهند، مسلول، أنكاس)، وتوظيف التشبيهات والتأكيد (إنّ، اللام المزحلقة).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يُقبل الشاعر الصحابي كعب بن زهير رضي الله عنه معتذرا إلى النبي صلى الله عليه وسلم راجيا عفوه ورافضا سعاية الوشاة، ثم يثني على النبي بكونه نور الهداية وسيف الحق، ويمتدح أصحابه المهاجرين الذين تركوا مكة نصرة لدينهم وثبتوا بشجاعة في ساحات الجهاد.',
				mcqCorrect: 'الاعتذار وطلب العفو ومدح النبي صلى الله عليه وسلم بالهداية والقوة والثناء على المهاجرين',
				mcqDistractors: [
					{ text: 'وصف رحلة تجارية بين الشام واليمن', diagnosticFeedback: 'الأبيات في الاعتذار ومدح النبي صلى الله عليه وسلم والمهاجرين.' },
					{ text: 'التحسر على ذكريات العصر الجاهلي', diagnosticFeedback: 'الشاعر أقبل مسلما مادحا للنبي صلى الله عليه وسلم والصحابة.' },
					{ text: 'هجاء الوشاة وتهديدهم بالقتال', diagnosticFeedback: 'غرض النص الاعتذار والمديح النبوي لا الهجاء.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildPoetryPassageBlock({
				title: variant.title,
				verses: variant.verses,
				author: variant.author,
				source: variant.source,
				vocabulary: variant.vocabulary
			}),
			{ type: 'text', content: `1) ${variant.q1}`, answer: `1) ${variant.a1}`, mark: '2.5' },
			{ type: 'text', content: `2) ${variant.q2}`, answer: `2) ${variant.a2}`, mark: '2.5' },
			{ type: 'text', content: `3) ${variant.q3}`, answer: `3) ${variant.a3}`, mark: '2.0' },
			{ type: 'text', content: `4) ${variant.q4}`, answer: `4) ${variant.a4}`, mark: '2.5' },
			{ type: 'text', content: `5) ${variant.q5}`, answer: `5) ${variant.a5}`, mark: '2.5' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `في قصيدة «${variant.title}» لـ ${variant.author}، ما الغرض المحوري للأبيات؟`,
				questionTextAr: 'اختر الإجابة الأدق:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.theme
			},
			sujetExercise: {
				customTitle: 'أولا: البناء الفكري',
				points: this.defaultPoints,
				instruction: 'اقرأ السند الشعري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'اربط النص بسياقه التاريخي في عصر صدر الإسلام والدعوة النبوية.',
				'لاحظ الألفاظ الإسلامية الجديدة التي أدخلها القرآن الكريم إلى الشعر.',
				'احرص على التمثيل المباشر من الأبيات لكل خاصية أو مؤشر نمط.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 2. البناء الفكري (12 ن) — السند النثري في الخطابة في صدر الإسلام
const tpl1asTcstT2KhatabaIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t2_khataba_abubakr_ib',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — الخطابة والوصايا في عصر صدر الإسلام',
	curriculumLessonId: 'arb_lesson_1as_tcst_t2_khataba_sadr_islam',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'خطبة الخلافة الراشدة',
				author: 'أبو بكر الصديق رضي الله عنه',
				source: 'تاريخ الطبري وسيرة ابن هشام',
				paragraphs: [
					'أمّا بعدُ أيّها الناسُ، فإنّي قد وُلّيتُ عليكم ولستُ بخيرِكم؛ فإن أحسنتُ فأعينوني، وإن أسأتُ ((فقوّموني)).',
					'الصدقُ [[أمانةٌ]]، والكذبُ خيانةٌ، والضعيفُ فيكم قويٌّ عندي حتى أُريحَ عليهِ حقَّهُ إن شاءَ اللهُ، والقويُّ فيكم ضعيفٌ عندي حتى آخذَ الحقَّ منهُ إن شاءَ اللهُ.',
					'لا يَدَعُ قومٌ الجهادَ في سبيلِ اللهِ إلّا ضربَهم اللهُ بالذلِّ، ولا تَشيعُ الفاحشةُ في قومٍ قطُّ إلّا عمَّهم اللهُ بالبلاءِ. أطيعوني ما أطعتُ اللهَ ورسولَهُ، فإذا عصيتُ اللهَ ورسولَهُ فلا [[طاعةَ]] لي عليكم. قوموا إلى صلاتِكم يرحمْكم اللهُ.'
				],
				vocabulary: [
					{ word: 'قوموني', meaning: 'أصلحوا خطئي وأرشدوني' },
					{ word: 'أريح عليه حقه', meaning: 'أرد إليه حقه كاملا' },
					{ word: 'لا يدع', meaning: 'لا يترك' }
				],
				theme: 'إرساء دستور الحكم الإسلامي الراشد القائم على التواضع والشورى والعدل والطاعة المقيدة بالشرع',
				q1: 'ما المنهج السياسي والأخلاقي الذي أعلنه أبو بكر الصديق رضي الله عنه في هذه الخطبة؟',
				a1: 'أعلن منهجا يقوم على التواضع، والشورى وطلب النصيحة والتقويم، والصدق والأمانة، وإنصاف الضعيف والأخذ على يد القوي الظالم، وتقييد طاعة الحاكم بطاعة الله ورسوله.',
				q2: 'حذّر الخطيب الأمة من آفتين خطيرتين في الفقرة الثالثة؛ اذكرهما مع بيان عاقبة كل منهما.',
				a2: '1) ترك الجهاد في سبيل الله، وعاقبته الذل. 2) شيوع الفاحشة في المجتمع، وعاقبته عموم البلاء.',
				q3: 'تبيّن في النص خصائص الخطابة في عصر صدر الإسلام؛ اذكر ثلاثا منها مع التمثيل.',
				a3: '1) البدء بـ «أما بعد» ونداء الجمهور (أيها الناس). 2) قصر الجمل وتوازنها واعتماد المقابلة (الصدق أمانة والكذب خيانة). 3) الوضوح والإيجاز والتأثر بروح القرآن الكريم والختام بالدعاء (يرحمكم الله).',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الخطبة.',
				a4: 'النمط الغالب هو الإيعازي (التوجيهي) المدعوم بالحجاج؛ ومن مؤشراته: أفعال الأمر والنداء (أيها الناس، أعينوني، قوموني، أطيعوني، قوموا)، وأساليب الشرط والتعليل (فإن أحسنت...، فإذا عصيت...).',
				q5: 'لخّص مضمون الخطبة في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يضع الخليفة أبو بكر الصديق رضي الله عنه ميثاقا عادلا للحكم في صدر الإسلام؛ فيعلن تواضعه ويطلب من الرعية إعانته على الخير وتقويمه عند الخطأ، ويؤكد أن الصدق أمانة والعدل ميزان يُنصف به الضعيف من القوي، محذّرا من ترك الجهاد وانتشار الفساد، ومؤكدا أن طاعته مشروطة بطاعته لله ورسوله.',
				mcqCorrect: 'إرساء أسس الحكم الراشد القائمة على الشورى والعدل والصدق وتقييد الطاعة بالشرع',
				mcqDistractors: [
					{ text: 'الدعوة إلى الطاعة العمياء للحاكم دون نصيحة', diagnosticFeedback: 'الخطيب قيّد الطاعة بطاعة الله ورسوله وطلب تقويمه إذا أخطأ.' },
					{ text: 'الفخر بنسب قريش ومآثر الجاهلية', diagnosticFeedback: 'الخطبة قائمة على التواضع والقيم الإسلامية الخالصة.' },
					{ text: 'تنظيم جباية الضرائب والخراج فقط', diagnosticFeedback: 'الخطبة دستور شامل في العدل والشورى والأخلاق والقيادة.' }
				]
			},
			{
				title: 'عهد العدل في القضاء',
				author: 'عمر بن الخطاب رضي الله عنه',
				source: 'رسالته إلى أبي موسى الأشعري رضي الله عنه',
				paragraphs: [
					'أمّا بعدُ، فإنّ القضاءَ [[فريضةٌ]] محكمةٌ، وسنّةٌ متّبعةٌ، فافهمْ إذا أُدليَ إليكَ، فإنّه لا ينفعُ تكلّمٌ بحقٍّ لا نفاذَ لهُ.',
					'آسِ بين الناسِ في وجهِكَ ومجلسِكَ وعدلِكَ، حتى لا يَطمعَ شريفٌ في حيفِكَ، ولا ييأسَ [[ضعيفٌ]] من عدلِكَ. البينةُ على من ادّعى، واليمينُ على من أنكرَ، والصلحُ جائزٌ بين المسلمينَ ((إلّا صلحًا أحلَّ حرامًا)) أو حرّمَ حلالًا.',
					'الفهمَ الفهمَ فيما تَلجلجَ في صدرِكَ ممّا ليس في كتابٍ ولا سنّةٍ، ثم اعرفِ الأشباهَ والأمثالَ، فقِسِ الأمورَ عند ذلكَ، واعمدْ إلى أقربِها إلى اللهِ وأشبهِها بالحقِّ.'
				],
				vocabulary: [
					{ word: 'آسِ بين الناس', meaning: 'ساوِ بينهم في المعاملة' },
					{ word: 'حيفك', meaning: 'ظلمك وميلك' },
					{ word: 'تلجلج', meaning: 'تردد والتبس' }
				],
				theme: 'تأسيس أصول القضاء الإسلامي العادل القائمة على المساواة والبينة والاجتهاد المنضبط بالشرع',
				q1: 'ما القواعد الأساسية للقضاء التي أوصى بها عمر بن الخطاب رضي الله عنه في هذا النص؟',
				a1: 'الفهم الدقيق للقضية، تنفيذ الحق بعد ثبوته، المساواة التامة بين الخصوم في المعاملة والمجلس، اشتراط البينة على المدعي واليمين على المنكر، وإباحة الصلح المنضبط بالشرع.',
				q2: 'لماذا أمر عمر رضي الله عنه بالمساواة بين الناس حتى في الوجه والمجلس؟',
				a2: 'كي لا يطمع ذو الجاه والشرف في تحيز القاضي وميله، ولا ييأس الضعيف من بلوغ حقه ونيل العدل.',
				q3: 'ما مصادر الحكم التي وجّه إليها عمر رضي الله عنه القاضي في الفقرة الثالثة؟',
				a3: 'كتاب الله تعالى، ثم سنة رسوله صلى الله عليه وسلم، ثم الاجتهاد والقياس على الأشباه والنظائر لتحري الأقرب إلى الله والحق.',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل.',
				a4: 'النمط الغالب هو الإيعازي (التوجيهي)؛ ومن مؤشراته: كثرة أفعال الأمر (فافهم، آسِ، اعرف، قس، اعمد)، وأسلوب الإغراء والتحذير (الفهم الفهم)، والتعليل المباشر للأحكام (فإنه لا ينفع، حتى لا يطمع).',
				q5: 'لخّص مضمون الوصية القضائية في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يرسم الخليفة عمر بن الخطاب رضي الله عنه دستورا محكما للقضاء الإسلامي يوجب على القاضي فهم الحجج وتنفيذ الحق، والمساواة الكاملة بين القوي والضعيف في المعاملة والحكم، والالتزام بقواعد البينة واليمين والصلح المشروع، والاجتهاد الصادق بالقياس عند غياب النص الصريح طلبا لرضا الله.',
				mcqCorrect: 'تحديد أصول القضاء العادل من مساواة بين الخصوم والتزام بالبينة والكتاب والسنة',
				mcqDistractors: [
					{ text: 'إعفاء أصحاب الجاه من المثول أمام القاضي', diagnosticFeedback: 'أمر بالمساواة التامة حتى لا يطمع شريف في حيف القاضي.' },
					{ text: 'منع الصلح بين المتخاصمين مطلقا', diagnosticFeedback: 'أجاز الصلح إلا ما أحل حراما أو حرم حلالا.' },
					{ text: 'ترك الاجتهاد والقياس في النوازل الجديدة', diagnosticFeedback: 'أمر صراحة بمعرفة الأشباه والقياس عند عدم وجود نص صريح.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				author: variant.author,
				source: variant.source,
				vocabulary: variant.vocabulary
			}),
			{ type: 'text', content: `1) ${variant.q1}`, answer: `1) ${variant.a1}`, mark: '2.5' },
			{ type: 'text', content: `2) ${variant.q2}`, answer: `2) ${variant.a2}`, mark: '2.5' },
			{ type: 'text', content: `3) ${variant.q3}`, answer: `3) ${variant.a3}`, mark: '2.0' },
			{ type: 'text', content: `4) ${variant.q4}`, answer: `4) ${variant.a4}`, mark: '2.5' },
			{ type: 'text', content: `5) ${variant.q5}`, answer: `5) ${variant.a5}`, mark: '2.5' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `في نص «${variant.title}» لـ ${variant.author}، ما المضمون الأساس للنص؟`,
				questionTextAr: 'اختر الفكرة الأدق للنص النثري:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.theme
			},
			sujetExercise: {
				customTitle: 'أولا: البناء الفكري',
				points: this.defaultPoints,
				instruction: 'اقرأ السند النثري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'استحضر قيم العدل والشورى والتكافل في عصر الخلافة الراشدة.',
				'الخطب والوصايا المباشرة يغلب عليها النمط الإيعازي (التوجيهي).',
				'في التلخيص التزم بحجم ربع النص دون تكرار حرفي.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 3. البناء اللغوي (8 ن) — النواسخ (كان، إنّ، كاد) والمفعول لأجله والمفعول المطلق
const tpl1asTcstT2NawasikhMafailLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t2_nawasikh_mafail_lb',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — النواسخ (كان وإنّ وكاد) والمفعول لأجله والمطلق',
	curriculumLessonId: 'arb_lesson_1as_tcst_t2_nawasikh_mafail',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«إنَّ الصدقَ أمانةٌ، وكانَ المسلمُ يُخلصُ إخلاصًا صادقًا ابتغاءَ مرضاةِ اللهِ، وعسى الحقُّ أن يظهرَ.»',
				entries: [
					{ target: 'الصدقَ', irab: 'اسم إنّ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.75' },
					{ target: 'أمانةٌ', irab: 'خبر إنّ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.75' },
					{ target: 'إخلاصًا', irab: 'مفعول مطلق مبين للنوع منصوب وعلامة نصبه الفتحة الظاهرة.', mark: '1.0' },
					{ target: 'ابتغاءَ', irab: 'مفعول لأجله منصوب وعلامة نصبه الفتحة الظاهرة وهو مضاف.', mark: '1.0' }
				],
				kadaSentence: '«عسى الحقُّ أن يظهرَ»',
				kadaAnalysis: 'عسى: فعل ماض ناقص من أفعال الرجاء. الحقُّ: اسم عسى مرفوع بالضمة. والجملة الفعلية «أن يظهرَ» في محل نصب خبر عسى.',
				mcqQ: 'ما إعراب كلمة «ابتغاءَ» في العبارة: «يُخلصُ المسلمُ إخلاصًا ابتغاءَ مرضاةِ اللهِ»؟',
				mcqCorrect: 'مفعول لأجله منصوب بالفتحة الظاهرة',
				mcqDistractors: [
					{ text: 'مفعول مطلق منصوب', diagnosticFeedback: 'المفعول المطلق هو «إخلاصا» من لفظ الفعل، أما «ابتغاء» فيبين العلة.' },
					{ text: 'خبر كان منصوب', diagnosticFeedback: 'خبر كان هو الجملة الفعلية «يخلص».' },
					{ text: 'حال منصوب', diagnosticFeedback: '«ابتغاء» مصدر قلبي يجيب عن سؤال لماذا.' }
				]
			},
			{
				sentence: '«أصبحَ العدلُ أساسًا للملكِ، وشرعَ القاضي ينظرُ في القضيةِ نظرًا دقيقًا حرصًا على الحقِّ.»',
				entries: [
					{ target: 'العدلُ', irab: 'اسم أصبح مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.75' },
					{ target: 'أساسًا', irab: 'خبر أصبح منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.75' },
					{ target: 'نظرًا', irab: 'مفعول مطلق مبين للنوع منصوب وعلامة نصبه الفتحة الظاهرة.', mark: '1.0' },
					{ target: 'حرصًا', irab: 'مفعول لأجله منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '1.0' }
				],
				kadaSentence: '«شرعَ القاضي ينظرُ في القضيةِ»',
				kadaAnalysis: 'شرعَ: فعل ماض ناقص من أفعال الشروع. القاضي: اسم شرع مرفوع بالضمة المقدرة للثقل. والجملة الفعلية «ينظرُ» في محل نصب خبر شرع (ويمتنع اقترانها بـ أن).',
				mcqQ: 'في جملة: «شرعَ القاضي ينظرُ في القضيةِ»، ما نوع الفعل «شرع» وما محل جملة «ينظرُ»؟',
				mcqCorrect: 'فعل شروع ناقص، وجملة «ينظرُ» في محل نصب خبر شرع',
				mcqDistractors: [
					{ text: 'فعل تام، وجملة «ينظرُ» في محل نصب حال', diagnosticFeedback: '«شرع» هنا بمعنى بدأ وخبره مضارع فهو من أفعال الشروع الناقصة.' },
					{ text: 'فعل رجاء، ويجب اقتران خبره بـ «أنْ»', diagnosticFeedback: 'أفعال الشروع يمتنع اقتران خبرها بـ «أنْ».' },
					{ text: 'حرف ناسخ ينصب المبتدأ', diagnosticFeedback: '«شرع» فعل ماضٍ ناقص وليس حرفا.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: `1) أعرب الكلمات المحددة في العبارة الآتية إعرابا تاما: ${variant.sentence}` },
			buildIrabTableBlock(variant.entries),
			{
				type: 'text',
				content: `2) حدّد الناسخ واسمه وخبره ومحل الجملة الإعرابي في: ${variant.kadaSentence}`,
				answer: `2) ${variant.kadaAnalysis}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: '3) أدخل «كان» مرة و«إنّ» مرة أخرى على الجملة الاسمية «المسلمونَ متعاونونَ على البرِّ» مع ضبط الحركات.',
				answer: '3) مع كان: «كانَ المسلمونَ متعاونينَ على البرِّ». مع إنّ: «إنَّ المسلمينَ متعاونونَ على البرِّ».',
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
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة القواعد والإعراب الآتية بدقة:',
				content
			},
			hints: [
				'كان وأخواتها ترفع الاسم وتنصب الخبر، وإنّ وأخواتها تعمل العكس.',
				'خبر كاد وأخواتها يكون دائما جملة فعلية فعلها مضارع في محل نصب.',
				'المفعول المطلق من لفظ فعله، أما المفعول لأجله فيبين سبب وقوع الفعل.'
			],
			solutionStepsAr: [...variant.entries.map((e) => `${e.target}: ${e.irab}`), variant.kadaAnalysis],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. البناء اللغوي (8 ن) — الاستعارة بنوعيها والطباق والمقابلة
const tpl1asTcstT2IstiaraTibaqLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t2_istiara_tibaq_lb',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي — الاستعارة المكنية والتصريحية والطباق والمقابلة',
	curriculumLessonId: 'arb_lesson_1as_tcst_t2_istiara_tibaq',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				istiara1: '«على أكتافِها الأسلُ الظماءُ» (حسان بن ثابت رضي الله عنه)',
				ans1: 'استعارة مكنية؛ شبّه الرماح (الأسل) بكائنات حية تعطش، وحذف المشبه به ورمز له بلازم من لوازمه هو «الظماء». أثرها: تجسيم قوة البأس وشدة القتال.',
				istiara2: '«أرانا الهُدى بعدَ العَمى» (عبد الله بن رواحة رضي الله عنه)',
				ans2: 'في لفظ «العمى» استعارة تصريحية؛ شبّه الضلال بالعمى، وحذف المشبه وصرّح بالمشبه به. أثرها: تجسيم قبح الضلال وبيان فضل الهداية.',
				badiaQuote: '«الضعيفُ فيكم قويٌّ عندي... والقويُّ فيكم ضعيفٌ عندي» (أبو بكر الصديق رضي الله عنه)',
				badiaAns: 'مقابلة بين (الضعيف، قوي) و(القوي، ضعيف) على الترتيب؛ أثرها تقوية المعنى وتوضيحه بالتضاد وترسيخ مبدأ العدل.',
				irabEntries: [
					{ target: 'الظماءُ', irab: 'نعت مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'الضعيفُ', irab: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' }
				],
				mcqQ: 'في قول حسان بن ثابت رضي الله عنه: «وبحري لا تكدّره الدلاء» (يقصد بـ «بحري»: غزارة شعره)، ما نوع الصورة؟',
				mcqCorrect: 'استعارة تصريحية (حُذف المشبه وصُرّح بالمشبه به)',
				mcqDistractors: [
					{ text: 'استعارة مكنية', diagnosticFeedback: 'المشبه به (البحر) مصرّح به والمشبه محذوف، فهي تصريحية.' },
					{ text: 'تشبيه تام', diagnosticFeedback: 'لا توجد أداة تشبيه ولا مشبه مذكور.' },
					{ text: 'طباق إيجاب', diagnosticFeedback: 'لا يوجد تضاد بين لفظين.' }
				]
			},
			{
				istiara1: '«انكشفَ الغطاءُ وأشرقَ صبحُ الإيمانِ»',
				ans1: 'في «أشرق صبح الإيمان» استعارة مكنية (أو تشبيه بليغ في صبح الإيمان ثم إشراق له)؛ حيث شبّه الإيمان بشمس أو صبح يشرق ليبدد الظلام، فأثرها تجسيم نور الهداية ووضوح الحق.',
				istiara2: '«وبحري لا تكدّرهُ الدلاءُ» (حسان بن ثابت رضي الله عنه)',
				ans2: 'في «بحري» استعارة تصريحية؛ شبّه غزارة شعره وعلمه بالبحر، وحذف المشبه وصرّح بالمشبه به «بحر». أثرها: تجسيم سعة بيانه وقوته.',
				badiaQuote: '«فإن أحسنتُ فأعينوني، وإن أسأتُ فقوّموني» (أبو بكر الصديق رضي الله عنه)',
				badiaAns: 'مقابلة بين (أحسنتُ فأعينوني) و(أسأتُ فقوّموني)؛ أثرها إبراز المعنى وتقويته عن طريق التضاد وإقناع السامع بروح الشورى.',
				irabEntries: [
					{ target: 'الغِطاءُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'الدِّلاءُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' }
				],
				mcqQ: 'ما نوع المحسن البديعي في قول أبي بكر رضي الله عنه: «الصدق أمانة، والكذب خيانة»؟',
				mcqCorrect: 'مقابلة (مع سجع بين أمانة وخيانة)',
				mcqDistractors: [
					{ text: 'طباق سلب', diagnosticFeedback: 'طباق السلب يكون بين فعل واحد مثبت ومنفي.' },
					{ text: 'جناس تام', diagnosticFeedback: 'الألفاظ غير متطابقة في الحروف.' },
					{ text: 'استعارة مكنية', diagnosticFeedback: 'المقابلة محسن بديعي معنوي وليست صورة بيانية.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اشرح الصورة البيانية الأولى وبيّن نوعها وأثرها البلاغي: ${variant.istiara1}`,
				answer: `1) ${variant.ans1}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اشرح الصورة البيانية الثانية وحدّد نوعها وسر جمالها: ${variant.istiara2}`,
				answer: `2) ${variant.ans2}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) استخرج المحسن البديعي من القول الآتي وبيّن نوعه وأثره في المعنى: ${variant.badiaQuote}`,
				answer: `3) ${variant.badiaAns}`,
				mark: '2.0'
			},
			{ type: 'text', content: '4) أعرب الكلمتين المحددتين من الشواهد السابقة:' },
			buildIrabTableBlock(variant.irabEntries)
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة البلاغية الدقيقة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة البيان والبديع والإعراب الآتية:',
				content
			},
			hints: [
				'في الاستعارة: إن حُذف المشبه به فهي مكنية، وإن صُرّح به وحُذف المشبه فهي تصريحية.',
				'المقابلة تجمع بين معنيين فأكثر ثم ما يضادهما بالترتيب.',
				'لا تنسَ ذكر الأثر البلاغي (التجسيم أو التشخيص للاستعارة، وتقوية المعنى بالتضاد للطباق والمقابلة).'
			],
			solutionStepsAr: [variant.ans1, variant.ans2, variant.badiaAns],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T2: ArabicParameterizedTemplate[] = [
	tpl1asTcstT2PoetryDawaIb,
	tpl1asTcstT2KhatabaIb,
	tpl1asTcstT2NawasikhMafailLb,
	tpl1asTcstT2IstiaraTibaqLb
];
