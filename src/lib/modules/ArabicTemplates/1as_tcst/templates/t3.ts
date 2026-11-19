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
// 4 Parameterized ONEC Templates — 1AS TCST Trimester 3 (12 + 8 = 20)
// (2 intellectual_building [12pts], 2 linguistic_building [8pts])
// ============================================================================

// 1. البناء الفكري (12 ن) — السند الشعري في العصر الأموي (سابق البربري / مالك بن الريب)
const tpl1asTcstT3PoetryUmawiIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t3_shiir_umawi_sabiq_ib',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — شعر الحكمة والوعظ والرثاء النبيل في العصر الأموي',
	curriculumLessonId: 'arb_lesson_1as_tcst_t3_shiir_umawi_hikma_ritha',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'في الموعظة والعدل وطلب الحق',
				author: 'سابق بن عبد الله البربري',
				source: 'البيان والتبيين وحلية الأولياء',
				verses: [
					['بِاسْمِ الَّذِي أُنْزِلَتْ مِنْ عِنْدِهِ [[السُّوَرُ]]', 'وَالْحَمْدُ لِلَّهِ أَمَّا بَعْدُ يَا عُمَرُ'],
					['إِنْ كُنْتَ تَعْلَمُ مَا تَأْتِي وَمَا تَذَرُ', 'فَكُنْ عَلَى حَذَرٍ ((قَدْ يَنْفَعُ الْحَذَرُ))'],
					['وَاسْتَخْبِرِ النَّاسَ عَمَّا أَنْتَ جَاهِلُهُ', 'إِذَا عَمِيتَ فَقَدْ يَجْلُو الْعَمَى الْخَبَرُ'],
					['مَنْ يَطْلُبِ الْجَوْرَ لَا يَظْفَرْ بِحَاجَتِهِ', 'وَطَالِبُ الْحَقِّ قَدْ يُهْدَى لَهُ [[الظَّفَرُ]]'],
					['وَفِي الْهُدَى عِبَرٌ تَشْفِي الْقُلُوبَ بِهَا', 'كَالْغَيْثِ يَنْضُرُ عَنْ وَسْمِيِّهِ الشَّجَرُ'],
					['وَلَيْسَ ذُو الْعِلْمِ بِالتَّقْوَى كَجَاهِلِهَا', 'وَلَا الْبَصِيرُ كَأَعْمَى مَا لَهُ بَصَرُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'تذر', meaning: 'تترك' },
					{ word: 'الجور', meaning: 'الظلم والميل عن الحق' },
					{ word: 'وسميه', meaning: 'أول مطر الربيع' },
					{ word: 'ينضر', meaning: 'يخضرّ ويحسن' }
				],
				theme: 'نصح الخليفة عمر بن عبد العزيز باليقظة والشورى وإقامة العدل والاهتداء بالعلم والتقوى',
				q1: 'من المخاطَب في الأبيات؟ وبمَ استهلّ الشاعر قصيدته؟ وما دلالة ذلك؟',
				a1: 'المخاطَب هو الخليفة الراشد عمر بن عبد العزيز رحمه الله. وقد استهلّ الشاعر قصيدته بالبسملة والحمدلة على طريقة الخطب الإسلامية، دلالةً على عمق الروح الدينية وصدق النصح.',
				q2: 'اذكر أربع نصائح عملية قدّمها الشاعر في الأبيات.',
				a2: '1) الحذر واليقظة في كل فعل وترك. 2) الاستشارة والسؤال عمّا يجهله. 3) ملازمة الحق والعدل وتجنب الظلم. 4) الاهتداء بعبر الوحي والعلم المقترن بالتقوى.',
				q3: 'بمَ شبّه الشاعر أثر الهداية في القلوب؟ وعمّ يعبّر ذلك؟',
				a3: 'شبّهه بأثر مطر الربيع المبارك الذي يحيي الشجر ويزيده نضارة؛ ويعبّر ذلك عن أن الهداية حياة للقلوب وشفاء لها من الغفلة.',
				q4: 'ما النمط الغالب على النص؟ استخرج مؤشرين له مع التمثيل من الأبيات.',
				a4: 'النمط الغالب هو الإيعازي (التوجيهي) المدعوم بالحجاج؛ ومن مؤشراته: أفعال الأمر والنداء (يا عمر، فكن على حذر، واستخبر الناس)، وتوظيف الشرط والتعليل والتشبيه للإقناع (إن كنت تعلم، من يطلب الجور...، كالغيث).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يوجّه الشاعر الأموي سابق البربري موعظة بليغة إلى الخليفة عمر بن عبد العزيز رحمه الله يستهلها بالبسملة والحمد، داعيا إلى اليقظة والحذر ومشاورة أهل العلم والخبرة، ومؤكدا أن الظلم عاقبته الخيبة وأن طالب الحق يظفر بالتوفيق، وأن عبر الهدى والتقوى تحيي القلوب كما يحيي الغيث الأشجار.',
				mcqCorrect: 'النصح للوالي باليقظة والشورى وإقامة العدل والاهتداء بالعلم والتقوى',
				mcqDistractors: [
					{ text: 'مدح الفتوحات البحرية في البحر المتوسط', diagnosticFeedback: 'الأبيات في الوعظ والحكمة ونصح الخليفة بالعدل.' },
					{ text: 'رثاء الأهل والديار في الغربة', diagnosticFeedback: 'غرض الأبيات هو الوعظ والحكمة السياسية والأخلاقية.' },
					{ text: 'وصف القصور والمجالس المترفة', diagnosticFeedback: 'الشاعر زاهد واعظ يدعو للتقوى لا للترف.' }
				]
			},
			{
				title: 'حنين المرابط ورثاء النفس في الثغور',
				author: 'مالك بن الريب التميمي',
				source: 'جمهرة أشعار العرب والأمالي',
				verses: [
					['أَلَا لَيْتَ شِعْرِي هَلْ أَبِيتَنَّ لَيْلَةً', 'بِجَنْبِ الْغَضَا أُزْجِي [[الْقِلَاصَ]] النَّوَاجِيَا'],
					['تَذَكَّرْتُ مَنْ يَبْكِي عَلَيَّ فَلَمْ أَجِدْ', 'سِوَى السَّيْفِ وَالرُّمْحِ الرُّدَيْنِيِّ بَاكِيَا'],
					['فَيَا صَاحِبَيَّ رَحْلِي دَنَا الْمَوْتُ فَانْزِلَا', 'بِرَابِيَةٍ ((إِنِّي مُقِيمٌ لَيَالِيَا))'],
					['أَقِيمَا عَلَيَّ الْيَوْمَ أَوْ بَعْضَ لَيْلَةٍ', 'وَلَا تُعْجِلَانِي قَدْ تَبَيَّنَ [[شَانِيَا]]'],
					['وَخُطَّا بِأَطْرَافِ الأَسِنَّةِ مَضْجَعِي', 'وَرُدَّا عَلَى عَيْنَيَّ فَضْلَ رِدَائِيَا']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'الغضا', meaning: 'شجر صحراوي رمز ديار الشاعر' },
					{ word: 'أزجي القلاص', meaning: 'أسوق النوق الفتية' },
					{ word: 'الرديني', meaning: 'الرمح المتقن الصنع' },
					{ word: 'شانيا', meaning: 'شأني وحالي' }
				],
				theme: 'صدق عاطفة الحنين إلى الوطن والأهل واعتزاز الفارس بسلاحه في لحظة الوداع بثغور الفتوح',
				q1: 'ما الحالة النفسية التي يعيشها الشاعر في هذه الأبيات؟ وما سببها؟',
				a1: 'يعيش الشاعر حالة عميقة من الحزن والغربة والحنين الممزوج بالصبر والوقار، بسبب دنوّ أجله وهو مرابط بعيدا عن أهله ودياره في ثغور خراسان.',
				q2: 'لماذا جعل الشاعر السيف والرمح وحدهما يبكيان عليه في البيت الثاني؟',
				a2: 'إشارةً إلى شدة غربته وبعد أهله عنه، وإبرازا لملازمته السلاح والفروسية في ميادين الجهاد حتى آخر لحظة من حياته.',
				q3: 'بمَ أوصى الشاعر صاحبيه في الأبيات الثلاثة الأخيرة؟',
				a3: 'أوصاهما بالتوقف عند رابية والبقاء معه قليلا دون استعجال، وحفر قبره بأطراف الرماح وتغطية عينيه بفضل ردائه.',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
				a4: 'يمتزج الوصفي بالإيعازي الوجداني؛ فمن مؤشرات الوصفي تصوير الحالة والأمكنة (بجنب الغضا، القلاص النواجيا، الرمح الرديني)، ومن الإيعازي النداء والأمر والنهي (فيا صاحبي، فانزلا، أقيما، ولا تعجلاني، وخطا).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يعبّر الشاعر الأموي مالك بن الريب في غربته بثغور الفتوح عن حنينه الجارف إلى دياره، ويصوّر وحدته حين لم يجد عند احتضاره سوى سيفه ورمحه رفيقين لرحلته، ثم يوصي صاحبيه برفق أن يتمهّلا عليه ويحفرا مضجعه بأسنّة الرماح في صورة صادقة تجمع بين حزن الوداع وشرف الفروسية.',
				mcqCorrect: 'الحنين الصادق إلى الديار ورثاء النفس بوقار الفارس في ثغور الفتوح',
				mcqDistractors: [
					{ text: 'التفاخر بالثروة والقصور في الشام', diagnosticFeedback: 'الشاعر يرثي نفسه في الغربة بثغور الفتوح.' },
					{ text: 'الهجاء السياسي بين الأحزاب الأموية', diagnosticFeedback: 'القصيدة وجدانية خالصة في الرثاء والحنين.' },
					{ text: 'سرد قصة خيالية من قصص الأمثال', diagnosticFeedback: 'النص تجربة وجدانية حقيقية صادقة.' }
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `في قصيدة «${variant.title}» لـ ${variant.author}، ما المحور الأساس للنص؟`,
				questionTextAr: 'اختر الفكرة الأدق للنص:',
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
				'استحضر سياق العصر الأموي: حركة الزهد والوعظ وحركة الفتوح الإسلامية.',
				'انتبه للصلة بين مشاعر الشاعر وأساليبه الإنشائية كالنداء والأمر والتمني.',
				'لخّص الأفكار الأساسية بلغة سليمة دون نسخ الأبيات.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 2. البناء الفكري (12 ن) — السند النثري: الرسائل الديوانية والخطابة الوعظية الأموية
const tpl1asTcstT3NathrUmawiIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t3_nathr_umawi_katib_ib',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — النهضة النثرية في العصر الأموي (عبد الحميد الكاتب وعمر بن عبد العزيز)',
	curriculumLessonId: 'arb_lesson_1as_tcst_t3_adab_umawi_khataba_rasail',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'رسالة إلى الكتّاب',
				author: 'عبد الحميد الكاتب',
				source: 'جمهرة رسائل العرب',
				paragraphs: [
					'أمّا بعدُ، حفظَكم اللهُ يا أهلَ صناعةِ الكتابةِ وحاطَكم ووفّقَكم وأرشدَكم، فإنّ اللهَ عزّ وجلّ جعلَ الناسَ بعدَ الأنبياءِ والمرسلينَ صلواتُ اللهِ عليهم أجمعينَ أصنافًا، فوضعَكم معشرَ [[الكتّابِ]] في أشرفِ الجهاتِ، أهلَ الأدبِ والمروءةِ والعلمِ والرزانةِ.',
					'فتنافسوا يا معشرَ الكتّابِ في صنوفِ الآدابِ، وتفقّهوا في الدينِ، وابدؤوا بعلمِ كتابِ اللهِ عزّ وجلّ والفرائضِ، ثم العربيةِ ((فإنّها ثقافُ ألسنتِكم))، ثم أجيدوا الخطَّ فإنّه [[حليةٌ]] لكتبِكم، وارووا الأشعارَ واعرفوا غريبَها ومعانيَها، وأيامَ العربِ والعجمِ وأحاديثَها وسيرَها، فإنّ ذلكَ معينٌ لكم على ما تسمو إليهِ هممُكم.'
				],
				vocabulary: [
					{ word: 'حاطكم', meaning: 'حفظكم ورعاكم' },
					{ word: 'الرزانة', meaning: 'الوقار ورجاحة العقل' },
					{ word: 'ثقاف', meaning: 'أداة تقويم الرمح (مقوم للسان)' },
					{ word: 'أيام العرب', meaning: 'تاريخهم ووقائعهم' }
				],
				theme: 'تأصيل مهنة الكتابة الديوانية ورسم منهج علمي وأخلاقي متكامل لتكوين الكاتب المسلم',
				q1: 'ما المكانة التي منحها عبد الحميد الكاتب لأهل صناعة الكتابة في الفقرة الأولى؟',
				a1: 'جعلهم في أشرف المنازل لما يتحلّون به من الأدب والمروءة والعلم والرزانة، ولمسؤوليتهم الجليلة في إدارة شؤون الدولة.',
				q2: 'رتّب العلوم والمعارف التي أوصى الكاتب بإتقانها كما وردت في الفقرة الثانية.',
				a2: '1) التفقه في الدين وعلم كتاب الله والفرائض. 2) اللغة العربية لتقويم اللسان. 3) إجادة الخط لتزيين الكتب. 4) رواية الأشعار وفهم غريبها ومعانيها. 5) معرفة التاريخ وأيام العرب والعجم وسيرهم.',
				q3: 'استخرج ثلاث خصائص فنية لأسلوب عبد الحميد الكاتب من النص مع التمثيل.',
				a3: '1) الاستهلال المطوّل بالدعاء والثناء (حفظكم الله وحاطكم ووفقكم وأرشدكم). 2) الازدواج وتوازن الجمل والإيقاع اللفظي (ثقاف ألسنتكم / حلية كتبكم). 3) وضوح الأفكار والجمع بين الثقافة الشرعية والأدبية.',
				q4: 'ما النمط الغالب على الفقرة الثانية؟ اذكر مؤشرين له مع التمثيل.',
				a4: 'النمط الغالب هو الإيعازي (التوجيهي)؛ ومن مؤشراته: توالي أفعال الأمر (تنافسوا، تفقهوا، ابدؤوا، أجيدوا، ارووا، اعرفوا)، والنداء (يا معشر الكتاب)، والتعليل للإقناع (فإنها ثقاف ألسنتكم، فإن ذلك معين لكم).',
				q5: 'لخّص مضمون الرسالة في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يُشيد عبد الحميد الكاتب بشرف مهنة الكتابة ورسالتها السامية، ثم يضع للكتّاب برنامجا تكوينيا متكاملا يبدأ بحفظ القرآن والتفقه في الدين، يليه إتقان العربية وتجميل الخط، ثم الإلمام بالشعر والتاريخ وسير الأمم لترتقي هممهم وتصلح أعمالهم.',
				mcqCorrect: 'رسم منهج علمي وأخلاقي للكاتب يبدأ بالقرآن والفقه ثم العربية والخط والشعر والتاريخ',
				mcqDistractors: [
					{ text: 'قصر عمل الكاتب على تحسين الخط دون حاجة للعلم', diagnosticFeedback: 'أوصى بالعلم الشرعي والعربية والشعر والتاريخ إلى جانب الخط.' },
					{ text: 'الدعوة إلى هجر الشعر العربي والتاريخ', diagnosticFeedback: 'أوصى صراحة برواية الأشعار ومعرفة أيام العرب وسيرها.' },
					{ text: 'ذم مهنة الكتابة والتنفير منها', diagnosticFeedback: 'بل وضع الكتّاب في أشرف الجهات والمنازل.' }
				]
			},
			{
				title: 'خطبة العدل والاتباع',
				author: 'عمر بن عبد العزيز رحمه الله',
				source: 'عيون الأخبار والبيان والتبيين',
				paragraphs: [
					'أيّها الناسُ، إنّهُ لا كتابَ بعدَ القرآنِ، ولا نبيَّ بعدَ محمّدٍ صلى الله عليه وسلم، ألا إنّي لستُ بقاضٍ ولكنّي منفّذٌ، ولستُ بمبتدعٍ ولكنّي [[متّبعٌ]]، ولستُ بخيرٍ من أحدِكم ولكنّي أثقلُكم حملًا.',
					'أيّها الناسُ، من صحبَنا ((فليصحبْنا بخمسِ خصالٍ)) وإلّا فلا يَقربنَّا: يرفعُ إلينا حاجةَ من لا يستطيعُ رفعَها، ويُعينُنا على الخيرِ بجهدِهِ، ويدلُّنا من الخيرِ على ما لا نهتدي إليهِ، ولا يَغتابنَّ عندنا الرعيةَ، ولا يَعترضُ فيما لا [[يعنيهِ]].'
				],
				vocabulary: [
					{ word: 'منفذ', meaning: 'مطبّق لحكم الله وسنة نبيه' },
					{ word: 'مبتدع', meaning: 'مُحدث في الدين ما ليس منه' },
					{ word: 'خصال', meaning: 'صفات وأخلاق' }
				],
				theme: 'إعلان منهج الالتزام بالكتاب والسنة ووضع شروط أخلاقية صارمة لبطانة الحاكم الصالح',
				q1: 'ما المبادئ الدينية والسياسية التي أعلنها عمر بن عبد العزيز رحمه الله في الفقرة الأولى؟',
				a1: 'الالتزام الكامل بالقرآن الكريم وسنة النبي صلى الله عليه وسلم، ورفض الابتداع، والتواضع أمام الرعية، والشعور بثقل أمانة الخلافة.',
				q2: 'اذكر الخصال الخمس التي اشترطها الخليفة فيمن يصحبه ويعينه على الحكم.',
				a2: '1) رفع حاجات الضعفاء والعاجزين إليه. 2) الإعانة على الخير بالجهد. 3) الإرشاد إلى أبواب الخير الخفية. 4) ترك الغيبة في حق الرعية. 5) عدم التدخل فيما لا يعنيه.',
				q3: 'استخرج خاصيتين بارزتين لأسلوب الخطابة الأموية الوعظية من النص مع التمثيل.',
				a3: '1) الإيجاز والوضوح وتوازن العبارات والمقابلة (لست بمبتدع ولكني متبع). 2) قوة التأثير والصدق المستمد من الروح الإيمانية وتكرار النداء للتنبيه (أيها الناس).',
				q4: 'ما النمط الغالب على الفقرة الثانية؟ اذكر مؤشرين له مع التمثيل.',
				a4: 'النمط الغالب هو الإيعازي (التوجيهي)؛ ومن مؤشراته: النداء (أيها الناس)، والأمر المقترن باللام (فليصحبنا)، والنهي المؤكد (فلا يقربنا، ولا يغتابن).',
				q5: 'لخّص مضمون الخطبة في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يؤكد الخليفة عمر بن عبد العزيز رحمه الله التزامه التام بالقرآن والسنة وتواضعه أمام ثقل المسؤولية، ثم يشترط في بطانته وأعوانه خمس خصال نبيلة هي: إيصال صوت الضعفاء، والتعاون على الخير، والنصح الصادق، وصيانة أعراض الرعية من الغيبة، والانشغال بما ينفع دون فضول.',
				mcqCorrect: 'إعلان الاتباع للكتاب والسنة وتحديد شروط النزاهة والنصح لبطانة الحاكم',
				mcqDistractors: [
					{ text: 'التفاخر بالسلطة المطلقة دون مشورة', diagnosticFeedback: 'قال صراحة لست بخير من أحدكم وطلب الدلالة على الخير.' },
					{ text: 'السماح بالوشاية والغيبة في مجلس الخليفة', diagnosticFeedback: 'نهى بشدة قائلا: ولا يغتابن عندنا الرعية.' },
					{ text: 'ترك قضايا الضعفاء والمحتاجين', diagnosticFeedback: 'جعل رفع حاجة من لا يستطيع رفعها أول شرط لصحبته.' }
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `في نص «${variant.title}» لـ ${variant.author}، ما الفكرة العامة الأدق؟`,
				questionTextAr: 'اختر الفكرة الصحيحة:',
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
				'تذكّر أن العصر الأموي شهد نهضة كبرى في الخطابة والرسائل الديوانية.',
				'رتّب الأفكار حسب تسلسلها في النص بدقة ووضوح.',
				'علّل اختيارك للنمط بذكر مؤشرين بارزين مع التمثيل المباشر.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 3. البناء اللغوي (8 ن) — الفاعل ونائبه، التعدي، تقديم الخبر، الخبر والإنشاء
const tpl1asTcstT3GrammarInshaLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t3_fail_mubtada_insha_lb',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — الفاعل ونائبه وتقديم الخبر والأسلوب الخبري والإنشائي',
	curriculumLessonId: 'arb_lesson_1as_tcst_t3_jumla_filiya_ismiya',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«أُنْزِلَتْ من عندِ اللهِ السُّوَرُ، وفي الهدى عِبَرٌ تشفي القلوبَ، فاستخبرِ الناسَ عمّا تجهلُ.»',
				entries: [
					{ target: 'السُّوَرُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'عِبَرٌ', irab: 'مبتدأ مؤخر وجوبا مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' },
					{ target: 'الناسَ', irab: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '1.0' }
				],
				stylePrompt: 'حدّد نوع الأسلوب (خبري أم إنشائي) وصيغته وغرضه البلاغي في: «فاستخبرِ الناسَ عمّا أنت جاهله» و«في الهدى عبرٌ».',
				styleAnswer: '«فاستخبرِ الناسَ»: إنشائي طلبي، صيغته الأمر، غرضه النصح والإرشاد. «في الهدى عبرٌ»: خبري، غرضه التقرير وبيان فضل الهداية.',
				taqdimReason: 'وجب تقديم الخبر «في الهدى» على المبتدأ «عبرٌ» لأن الخبر شبه جملة والمبتدأ نكرة محضة.',
				mcqQ: 'ما سبب وجوب تقديم الخبر على المبتدأ في عبارة: «في الهدى عِبرٌ»؟',
				mcqCorrect: 'لأن الخبر شبه جملة والمبتدأ نكرة محضة',
				mcqDistractors: [
					{ text: 'لأن الخبر من أسماء الاستفهام', diagnosticFeedback: '«في الهدى» جار ومجرور وليس اسم استفهام.' },
					{ text: 'لأن المبتدأ معرفة مقترن بـ أل', diagnosticFeedback: 'المبتدأ «عبرٌ» نكرة غير معرفة.' },
					{ text: 'لأن الخبر فعل مضارع', diagnosticFeedback: 'الخبر هنا شبه جملة (جار ومجرور).' }
				]
			},
			{
				sentence: '«يُهْدَى لطالبِ الحقِّ الظفرُ، وللعدلِ أنصارُهُ، فلا تَظْلِمَنَّ ضعيفًا في مجلسِكَ.»',
				entries: [
					{ target: 'الظفرُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'أنصارُهُ', irab: 'مبتدأ مؤخر وجوبا مرفوع بالضمة، والهاء ضمير متصل في محل جر مضاف إليه.', mark: '1.0' },
					{ target: 'ضعيفًا', irab: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '1.0' }
				],
				stylePrompt: 'حدّد نوع الأسلوب وصيغته وغرضه البلاغي في: «لا تظلمنَّ ضعيفا» و«للعدل أنصاره».',
				styleAnswer: '«لا تظلمنّ ضعيفا»: إنشائي طلبي، صيغته النهي، غرضه النصح والتحذير من الظلم. «للعدل أنصاره»: خبري، غرضه التقرير وبث الطمأنينة.',
				taqdimReason: 'وجب تقديم الخبر «للعدل» على المبتدأ «أنصاره» لاتصال المبتدأ بضمير يعود على بعض الخبر.',
				mcqQ: 'ما إعراب «الظفرُ» في الجملة: «قد يُهدى لطالب الحق الظفرُ»؟',
				mcqCorrect: 'نائب فاعل مرفوع بالضمة الظاهرة',
				mcqDistractors: [
					{ text: 'فاعل مرفوع بالضمة', diagnosticFeedback: 'الفعل «يُهدى» مبني للمجهول فيرفع نائب فاعل لا فاعلا.' },
					{ text: 'مفعول به منصوب', diagnosticFeedback: 'الكلمة مرفوعة ونابت عن الفاعل.' },
					{ text: 'مبتدأ مؤخر', diagnosticFeedback: 'الجملة فعلية بدأت بفعل مبني للمجهول.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: `1) أعرب الكلمات المحددة في العبارة الآتية إعرابا تاما: ${variant.sentence}` },
			buildIrabTableBlock(variant.entries),
			{
				type: 'text',
				content: '2) علّل سبب تقديم الخبر على المبتدأ وجوبا في العبارة السابقة.',
				answer: `2) ${variant.taqdimReason}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) ${variant.stylePrompt}`,
				answer: `3) ${variant.styleAnswer}`,
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
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة:',
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
				instruction: 'أجب عن أسئلة القواعد والأساليب الآتية بدقة:',
				content
			},
			hints: [
				'انتبه لبناء الفعل للمجهول (ضم الأول) فالمرفوع بعده نائب فاعل.',
				'تذكّر حالات وجوب تقديم الخبر: شبه جملة مع نكرة محضة، أو ضمير يعود على بعض الخبر، أو صدارة.',
				'ميّز بين الخبري والإنشائي الطلبي (أمر، نهي، استفهام، نداء، تمنّ).'
			],
			solutionStepsAr: [...variant.entries.map((e) => `${e.target}: ${e.irab}`), variant.taqdimReason, variant.styleAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. البناء اللغوي (8 ن) — السجع والجناس والتورية
const tpl1asTcstT3BadiSajaJinasLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t3_badi_saja_jinas_lb',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي — السجع والجناس والتورية وإعراب الشواهد',
	curriculumLessonId: 'arb_lesson_1as_tcst_t3_saja_jinas_tawriya',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sajaQuote: '«العربيةُ ثقافُ ألسنتِكم، والخطُّ حليةُ كتبِكم» (عبد الحميد الكاتب)',
				sajaAns: 'سجع (وتوازن/ازدواج) في توافق الفاصلتين (ألسنتكم / كتبكم)؛ أثره: إحداث جرس موسيقي جميل يجذب السامع ويزيد الكلام سلاسة.',
				jinasQuote: '«يَقيني باللهِ يَقيني من الشدائدِ» و«البِرُّ يُثمرُ البُرَّ»',
				jinasAns: 'في «يقيني / يقيني»: جناس تام (الأولى بمعنى إيماني، والثانية بمعنى يحفظني). وفي «البِرّ / البُرّ»: جناس ناقص لاختلاف حركة الباء. أثرهما: إيقاع موسيقي محبب وتنبيه ذهن القارئ.',
				tawriyaQuote: '«أقمتُ عند البحرِ أشكو الصدى»',
				tawriyaAns: 'تورية في كلمة «الصدى»؛ المعنى القريب غير المراد هو العطش (بقرينة البحر)، والمعنى البعيد المراد هو رجع الصوت أو الهمّ. أثرها: إثارة الذهن وتحريك التفكير.',
				irabEntries: [
					{ target: 'ثقافُ', irab: 'خبر مرفوع وعلامة رفعه الضمة الظاهرة وهو مضاف.', mark: '1.0' },
					{ target: 'البُرَّ', irab: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '1.0' }
				],
				mcqQ: 'في عبارة: «يَقيني باللهِ يَقيني من الشر»، ما المحسن البديعي بين الكلمتين؟',
				mcqCorrect: 'جناس تام لاتفاقهما في الحروف والعدد والترتيب والحركات واختلاف المعنى',
				mcqDistractors: [
					{ text: 'جناس ناقص', diagnosticFeedback: 'الكلمتان متطابقتان تماما في النطق والشكل.' },
					{ text: 'طباق إيجاب', diagnosticFeedback: 'ليستا متضادتين في المعنى.' },
					{ text: 'سجع', diagnosticFeedback: 'ليستا فاصلتي جملتين متوافقتي الحرف الأخير فقط.' }
				]
			},
			{
				sajaQuote: '«حفظَكم اللهُ وحاطَكم، ووفّقَكم وأرشدَكم» (عبد الحميد الكاتب)',
				sajaAns: 'سجع في توافق فواصل الجمل (حاطكم / أرشدكم) مع ازدواج لطيف؛ أثره: خلق موسيقى نثرية عذبة تستميل أذن السامع.',
				jinasQuote: '«فكن على حَذَرٍ فقد يجلو العمى الخَبَرُ» و«صليتُ المغربَ في المغربِ»',
				jinasAns: 'في «حذر / خبر»: جناس ناقص لاختلاف حرفين (ح-ذ مقابل خ-ب). وفي «المغرب / المغرب»: جناس تام (صلاة المغرب / بلاد المغرب). أثرهما: إحداث جرس موسيقي يثبّت المعنى.',
				tawriyaQuote: '«سألتُ عن أخبارِ النهرِ، فقيل: جرى بالخيرِ»',
				tawriyaAns: 'تورية في الفعل «جرى»؛ المعنى القريب جريان الماء بقرينة النهر، والمعنى البعيد المراد حدوث الخير وشيوعه. أثرها: تحريك الذهن وإظهار البراعة اللغوية.',
				irabEntries: [
					{ target: 'اللهُ', irab: 'لفظ الجلالة فاعل مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' },
					{ target: 'الخَبَرُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' }
				],
				mcqQ: 'ما نوع المحسن البديعي في جملة: «صليتُ المغربَ في المغربِ»؟',
				mcqCorrect: 'جناس تام',
				mcqDistractors: [
					{ text: 'جناس ناقص', diagnosticFeedback: 'تطابقت الكلمتان في نوع الحروف وعددها وترتيبها وضبطها.' },
					{ text: 'تورية', diagnosticFeedback: 'التورية تكون في لفظ واحد له معنيان، أما هنا فلفظان.' },
					{ text: 'مقابلة', diagnosticFeedback: 'لا يوجد تضاد بين الكلمتين.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) استخرج المحسن البديعي من العبارة الآتية وبيّن نوعه وأثره: ${variant.sajaQuote}`,
				answer: `1) ${variant.sajaAns}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) حدّد نوع الجناس في الشاهدين الآتيين مع التعليل والأثر البلاغي: ${variant.jinasQuote}`,
				answer: `2) ${variant.jinasAns}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) اشرح التورية في العبارة الآتية مبيّنا المعنى القريب والمعنى البعيد المراد: ${variant.tawriyaQuote}`,
				answer: `3) ${variant.tawriyaAns}`,
				mark: '2.0'
			},
			{ type: 'text', content: '4) أعرب الكلمتين المحددتين من الشواهد السابقة:' },
			buildIrabTableBlock(variant.irabEntries)
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر التحليل البديعي الصحيح:',
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
				instruction: 'أجب عن أسئلة المحسنات البديعية والإعراب الآتية:',
				content
			},
			hints: [
				'السجع خاص بالنثر ويقوم على توافق أواخر الفواصل.',
				'في الجناس التام تتطابق الكلمتان في أربعة أمور مع اختلاف المعنى.',
				'في التورية اذكر اللفظ ومعناه القريب غير المراد ومعناه البعيد المراد.'
			],
			solutionStepsAr: [variant.sajaAns, variant.jinasAns, variant.tawriyaAns],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T3: ArabicParameterizedTemplate[] = [
	tpl1asTcstT3PoetryUmawiIb,
	tpl1asTcstT3NathrUmawiIb,
	tpl1asTcstT3GrammarInshaLb,
	tpl1asTcstT3BadiSajaJinasLb
];
