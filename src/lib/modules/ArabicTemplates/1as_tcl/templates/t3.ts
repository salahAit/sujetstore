import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildArudScansionBlock,
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock
} from '../../arabic-helpers';

// ============================================================================
// 5 Parameterized ONEC Templates — 1AS TCL Trimester 3 (10 + 6 + 4 = 20)
// (1 intellectual_building [10pts], 2 linguistic_building [6pts, 1 with العروض], 2 critical_evaluation [4pts])
// ============================================================================

// 1. البناء الفكري (10 ن) — الأدب الأموي (يتنوع بين السند الشعري والسند النثري حسب البذرة)
const tpl1asTclT3AdabUmawiIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t3_adab_umawi_ib',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — الحكمة والعدل والنهضة النثرية في العصر الأموي',
	curriculumLessonId: 'arb_lesson_1as_tcl_t3_khataba_rasail_umawi',
	defaultPoints: 10,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isPoetry = rng.pick([true, false]);

		if (isPoetry) {
			const passage = buildPoetryPassageBlock({
				title: 'في الوعظ والعدل وطلب الحق',
				author: 'سابق بن عبد الله البربري',
				source: 'البيان والتبيين وحلية الأولياء',
				verses: [
					['بِاسْمِ الَّذِي أُنْزِلَتْ مِنْ عِنْدِهِ [[السُّوَرُ]]', 'وَالْحَمْدُ لِلَّهِ أَمَّا بَعْدُ يَا عُمَرُ'],
					['إِنْ كُنْتَ تَعْلَمُ مَا تَأْتِي وَمَا تَذَرُ', 'فَكُنْ عَلَى حَذَرٍ ((قَدْ يَنْفَعُ الْحَذَرُ))'],
					['وَاسْتَخْبِرِ النَّاسَ عَمَّا أَنْتَ جَاهِلُهُ', 'إِذَا عَمِيتَ فَقَدْ يَجْلُو الْعَمَى الْخَبَرُ'],
					['مَنْ يَطْلُبِ الْجَوْرَ لَا يَظْفَرْ بِحَاجَتِهِ', 'وَطَالِبُ الْحَقِّ قَدْ يُهْدَى لَهُ [[الظَّفَرُ]]'],
					['وَفِي الْهُدَى عِبَرٌ تَشْفِي الْقُلُوبَ بِهَا', 'كَالْغَيْثِ يَنْضُرُ عَنْ وَسْمِيِّهِ الشَّجَرُ'],
					['وَلَيْسَ ذُو الْعِلْمِ بِالتَّقْوَى كَجَاهِلِهَا', 'وَلَا الْبَصِيرُ كَأَعْمَى مَا لَهُ بَصَرُ']
				],
				vocabulary: [
					{ word: 'تذر', meaning: 'تترك' },
					{ word: 'الجور', meaning: 'الظلم' },
					{ word: 'الوسمي', meaning: 'أول مطر الربيع' },
					{ word: 'ينضر', meaning: 'يخضرّ ويزدهر' }
				]
			});

			const theme = 'نصح الخليفة عمر بن عبد العزيز باليقظة والشورى وإقامة العدل والاهتداء بالعلم والتقوى';
			const mcq = buildUniqueMcqOptions(
				'نصح الخليفة باليقظة والشورى والعدل وبيان فضل الهدى والعلم المقترن بالتقوى',
				[
					{ text: 'وصف القصور والمجالس المترفة في الشام', diagnosticFeedback: 'القصيدة في الوعظ والحكمة السياسية والخلقية.' },
					{ text: 'مدح الظلم وتبرير الاستبداد', diagnosticFeedback: 'الشاعر حذر من الجور وأكد أن الظفر لطالب الحق.' },
					{ text: 'رثاء الأهل والديار في الغربة', diagnosticFeedback: 'الغرض هنا الوعظ والحكمة لا الرثاء.' }
				],
				rng
			);

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1) بمَ استهلّ الشاعر قصيدته؟ وما دلالة ذلك على ثقافته وعصره؟',
					answer: '1) استهلّها بالبسملة والحمدلة وفصل الخطاب (أما بعد) على نهج الخطب الإسلامية، مما يدل على عمق الأثر القرآني والنزعة الدينية الصادقة في شعر الوعظ الأموي.',
					mark: '2.0'
				},
				{
					type: 'text',
					content: '2) لخّص أبرز الوصايا التي وجّهها الشاعر إلى عمر بن عبد العزيز رحمه الله.',
					answer: '2) أوصاه بالحذر واليقظة في التصرفات، ومشاورة أهل العلم والخبرة، واجتناب الظلم وملازمة الحق، والاعتبار بالهدى والعلم المقترن بالتقوى.',
					mark: '2.0'
				},
				{
					type: 'text',
					content: '3) بيّن علاقة الهدى بإحياء القلوب كما صوّرها الشاعر في البيت الخامس.',
					answer: '3) شبّه أثر عبر الهدى في شفاء القلوب وإحيائها بأثر مطر الربيع الذي ينعش الشجر ويجعله نضرا مخضرا.',
					mark: '2.0'
				},
				{
					type: 'text',
					content: '4) ما النمط الغالب على الأبيات؟ اذكر مؤشرين له مع التمثيل من النص.',
					answer: '4) النمط الغالب هو الإيعازي (التوجيهي) المدعوم بالحجاج؛ ومن مؤشراته: النداء والأمر (يا عمر، فكن، واستخبر)، وتوظيف الشرط والتشبيه والمقابلة للإقناع (إن كنت تعلم، من يطلب الجور...، كالغيث).',
					mark: '2.0'
				},
				{
					type: 'text',
					content: '5) انثر مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
					answer: '5) يوجّه الشاعر الأموي سابق البربري نصيحة صادقة إلى الخليفة عمر بن عبد العزيز رحمه الله مفتتحة بذكر الله، فيدعوه إلى الحذر ومشاورة أهل الرأي وملازمة العدل الذي يجلب التوفيق والبعد عن الظلم، مبينا أن الهدى يحيي القلوب كالمطر وأن العالم التقي لا يستوي بالجاهل الغافل.',
					mark: '2.0'
				}
			];

			return {
				templateId: this.id,
				seed,
				grade: '1as_tcl',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion: {
					type: 'mcq',
					questionText: 'في قصيدة سابق البربري الموجهة لعمر بن عبد العزيز رحمه الله، ما الفكرة العامة للنص؟',
					questionTextAr: 'اختر الفكرة العامة الصحيحة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: theme
				},
				sujetExercise: {
					customTitle: 'أولا: البناء الفكري',
					points: this.defaultPoints,
					instruction: 'اقرأ السند الشعري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
					content
				},
				hints: [
					'لاحظ تأثر الشاعر الأموي بافتتاحيات الخطب الإسلامية.',
					'استخرج الوصايا بترتيب الأبيات دون إغفال أي عنصر.',
					'علّل النمط بمؤشرين دقيقين مع التمثيل الحرفي.'
				],
				solutionStepsAr: [theme],
				finalAnswer: theme
			};
		}

		// Prose variant: عبد الحميد الكاتب — رسالة إلى الكتّاب
		const passage = buildProsePassageBlock({
			title: 'رسالة إلى الكتّاب',
			author: 'عبد الحميد الكاتب',
			source: 'جمهرة رسائل العرب',
			paragraphs: [
				'أمّا بعدُ، حفظَكم اللهُ يا أهلَ صناعةِ الكتابةِ وحاطَكم ووفّقَكم وأرشدَكم، فإنّ اللهَ عزّ وجلّ جعلَ الناسَ بعدَ الأنبياءِ والمرسلينَ صلواتُ اللهِ عليهم أجمعينَ أصنافًا، فوضعَكم معشرَ [[الكتّابِ]] في أشرفِ الجهاتِ، أهلَ الأدبِ والمروءةِ والعلمِ والرزانةِ.',
				'فتنافسوا يا معشرَ الكتّابِ في صنوفِ الآدابِ، وتفقّهوا في الدينِ، وابدؤوا بعلمِ كتابِ اللهِ عزّ وجلّ والفرائضِ، ثم العربيةِ ((فإنّها ثقافُ ألسنتِكم))، ثم أجيدوا الخطَّ فإنّه [[حليةٌ]] لكتبِكم، وارووا الأشعارَ واعرفوا غريبَها ومعانيَها، وأيامَ العربِ والعجمِ وأحاديثَها وسيرَها، فإنّ ذلكَ معينٌ لكم على ما تسمو إليهِ هممُكم.'
			],
			vocabulary: [
				{ word: 'حاطكم', meaning: 'رعاكم وحفظكم' },
				{ word: 'الرزانة', meaning: 'الوقار والحلم' },
				{ word: 'ثقاف', meaning: 'أداة تقويم اللسان والمنطق' },
				{ word: 'أيام العرب', meaning: 'تاريخهم ووقائعهم' }
			]
		});

		const theme = 'وضع دستور علمي وأخلاقي متكامل للكاتب الديواني في العصر الأموي يبدأ بالدين ثم العربية والخط والتاريخ';
		const mcq = buildUniqueMcqOptions(
			'تحديد المنهج العلمي والأخلاقي للكاتب بدءا بالقرآن والفقه ثم العربية والخط والشعر والتاريخ',
			[
				{ text: 'حصر مهمة الكاتب في الخط الجميل دون ثقافة شرعية أو لغوية', diagnosticFeedback: 'قدّم الكاتب القرآن والفقه والعربية قبل الخط والشعر والتاريخ.' },
				{ text: 'الدعوة إلى ترك رواية الشعر العربي القديم', diagnosticFeedback: 'أوصى صراحة برواية الأشعار ومعرفة غريبها ومعانيها.' },
				{ text: 'ذمّ صناعة الكتابة والتقليل من شأنها', diagnosticFeedback: 'بل وضع الكتّاب في أشرف الجهات.' }
			],
			rng
		);

		const content: ContentBlock[] = [
			passage,
			{
				type: 'text',
				content: '1) ما المكانة التي بوأها عبد الحميد الكاتب للكتّاب؟ وبمَ علّلها؟',
				answer: '1) وضعهم في أشرف الجهات والمنازل؛ لأنهم أهل الأدب والمروءة والعلم والرزانة القائمون على شؤون الدولة.',
				mark: '2.0'
			},
			{
				type: 'text',
				content: '2) عدد العلوم والمهارات التي أمر الكاتب بإتقانها مرتّبة كما وردت في الرسالة.',
				answer: '2) التفقه في الدين وكتاب الله والفرائض، ثم إتقان العربية، ثم إجادة الخط، ثم رواية الشعر وفهم غريبه ومعانيه، ثم معرفة تاريخ العرب والعجم وسيرهم.',
				mark: '2.0'
			},
			{
				type: 'text',
				content: '3) لماذا قدّم الكاتب التفقه في الدين والعربية على سائر المعارف؟',
				answer: '3) لأن الدين يضبط الأخلاق والأمانة ويحفظ استقامة الكاتب، والعربية تقوّم لسانه وتمنعه من اللحن في المكاتبات الرسمية.',
				mark: '2.0'
			},
			{
				type: 'text',
				content: '4) ما النمط الغالب على الفقرة الثانية؟ اذكر مؤشرين له مع التمثيل.',
				answer: '4) النمط الغالب هو الإيعازي (التوجيهي)؛ ومن مؤشراته: كثرة أفعال الأمر (تنافسوا، تفقهوا، ابدؤوا، أجيدوا، ارووا، اعرفوا)، والنداء (يا معشر الكتاب)، والتعليل المباشر (فإنها ثقاف ألسنتكم، فإن ذلك معين لكم).',
				mark: '2.0'
			},
			{
				type: 'text',
				content: '5) لخّص مضمون الرسالة في فقرة موجزة بأسلوبك الخاص.',
				answer: '5) يفتتح عبد الحميد الكاتب رسالته بالدعاء للكتّاب والإشادة بشرف صناعتهم وأخلاقهم، ثم يرسم لهم منهجا علميا رصينا يبدأ بالقرآن والفقه، ويُتبع بإتقان العربية وتجميل الخط، ورواية الشعر ومطالعة التاريخ وسير الأمم لترتقي هممهم في خدمة الأمة.',
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: 'في «رسالة إلى الكتّاب» لعبد الحميد الكاتب، ما المضمون الأساس للنص؟',
				questionTextAr: 'اختر الإجابة الأدق:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: theme
			},
			sujetExercise: {
				customTitle: 'أولا: البناء الفكري',
				points: this.defaultPoints,
				instruction: 'اقرأ السند النثري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'لاحظ البنية المنظمة للرسالة الديوانية عند عبد الحميد الكاتب.',
				'احرص على الترتيب المنهجي للعلوم الواردة في الوصية.',
				'استخرج مؤشرات النمط الإيعازي مع أمثلة مباشرة من النص.'
			],
			solutionStepsAr: [theme],
			finalAnswer: theme
		};
	}
};

// 2. البناء اللغوي (6 ن) — الفاعل ونائبه، تقديم الخبر، الخبر والإنشاء، والسجع والجناس والتورية
const tpl1asTclT3IrabInshaBadiLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t3_irab_insha_badi_lb',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — الفاعل ونائبه وتقديم الخبر والخبر والإنشاء والمحسنات البديعية',
	curriculumLessonId: 'arb_lesson_1as_tcl_t3_arakan_jumla_khabar_insha',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«باسمِ الذي أُنْزِلَتْ من عندِهِ السُّوَرُ، وفي الهدى عِبَرٌ، فكُنْ على حَذَرٍ قد ينفعُ الحذرُ.»',
				entries: [
					{ target: 'السُّوَرُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'عِبَرٌ', irab: 'مبتدأ مؤخر وجوبا مرفوع بالضمة (لأن الخبر شبه جملة والمبتدأ نكرة محضة).', mark: '1.0' }
				],
				styleQ: 'حدّد نوع الأسلوب وصيغته وغرضه البلاغي في: «فكن على حذر» و«وليس ذو العلم بالتقوى كجاهلها».',
				styleA: '«فكن على حذر»: أسلوب إنشائي طلبي، صيغته الأمر، غرضه النصح والإرشاد. «وليس ذو العلم...»: أسلوب خبري، غرضه التقرير وبيان شرف العلم والتقوى.',
				badiQ: 'استخرج المحسن البديعي من قول عمر بن عبد العزيز: «لستُ بمبتدعٍ ولكني متّبعٌ» ومن «يقيني بالله يقيني» وبيّن نوعيهما وأثرهما.',
				badiA: 'بين «مبتدع / متّبع»: جناس ناقص (مع طباق إيجاب). وبين «يقيني / يقيني»: جناس تام (إيماني / يحفظني). أثرهما: إحداث جرس موسيقي جميل وجذب الانتباه.',
				mcqQ: 'ما نوع الأسلوب وصيغته في قول مالك بن الريب: «ألا ليت شعري هل أبيتنّ ليلةً»؟',
				mcqCorrect: 'أسلوب إنشائي طلبي جمع بين التمني والاستفهام وغرضه التحسر والشوق',
				mcqDistractors: [
					{ text: 'أسلوب خبري تقريري محض', diagnosticFeedback: 'وجود «ليت» و«هل» يجعله إنشائيا طلبيا.' },
					{ text: 'أسلوب إنشائي غير طلبي بصيغة القسم', diagnosticFeedback: 'التمني والاستفهام من الإنشاء الطلبي.' },
					{ text: 'أسلوب إنشائي طلبي بصيغة النهي', diagnosticFeedback: 'لا توجد أداة نهي في العبارة.' }
				]
			},
			{
				sentence: '«تُصانُ الأوطانُ بالعدلِ، وللعدلِ أنصارُهُ، فاحفظوا يا أهلَ العلمِ أمانةَ الكلمةِ.»',
				entries: [
					{ target: 'الأوطانُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'أنصارُهُ', irab: 'مبتدأ مؤخر وجوبا مرفوع بالضمة (لاتصاله بضمير يعود على بعض الخبر)، والهاء مضاف إليه.', mark: '1.0' }
				],
				styleQ: 'حدّد نوع الأسلوب وصيغته وغرضه البلاغي في: «فاحفظوا يا أهل العلم أمانة الكلمة» و«ما أعظم أثر العدل!».',
				styleA: '«فاحفظوا يا أهل العلم»: إنشائي طلبي بصيغتي الأمر والنداء غرضه النصح والحث. «ما أعظم أثر العدل!»: إنشائي غير طلبي بصيغة التعجب غرضه التعظيم.',
				badiQ: 'وضّح السجع في «العربية ثقاف ألسنتكم، والخط حلية كتبكم»، والتورية في «أقمتُ عند البحر أشكو الصدى».',
				badiA: 'السجع في توافق الفاصلتين (ألسنتكم / كتبكم) وأثره موسيقي نثري عذب. والتورية في «الصدى» (القريب العطش غير المراد، والبعيد المراد رجع الصوت أو الهمّ) وأثرها تحريك الذهن.',
				mcqQ: 'لماذا وجب تقديم الخبر على المبتدأ في جملة: «للعدلِ أنصارُهُ»؟',
				mcqCorrect: 'لاتصال المبتدأ بضمير يعود على بعض الخبر',
				mcqDistractors: [
					{ text: 'لأن المبتدأ نكرة محضة فقط', diagnosticFeedback: 'المبتدأ هنا مضاف إلى ضمير يعود على «العدل».' },
					{ text: 'لأن الخبر اسم استفهام', diagnosticFeedback: 'الخبر جار ومجرور لا اسم استفهام.' },
					{ text: 'لأن الجملة فعلية', diagnosticFeedback: 'الجملة اسمية تتكون من خبر مقدم ومبتدأ مؤخر.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: `1) أعرب الكلمتين المحددتين في العبارة الآتية: ${variant.sentence}` },
			buildIrabTableBlock(variant.entries),
			{ type: 'text', content: `2) ${variant.styleQ}`, answer: `2) ${variant.styleA}`, mark: '2.0' },
			{ type: 'text', content: `3) ${variant.badiQ}`, answer: `3) ${variant.badiA}`, mark: '2.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
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
				instruction: 'أجب عن أسئلة القواعد والأساليب والبديع الآتية:',
				content
			},
			hints: [
				'المرفوع بعد الفعل المبني للمجهول يُعرب نائب فاعل دائما.',
				'اذكر في الأسلوب الإنشائي: نوعه (طلبي/غير طلبي)، صيغته، وغرضه البلاغي.',
				'في التورية بيّن المعنى القريب غير المراد والمعنى البعيد المراد.'
			],
			solutionStepsAr: [...variant.entries.map((e) => `${e.target}: ${e.irab}`), variant.styleA, variant.badiA],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. البناء اللغوي (6 ن) مع العروض (بحرا البسيط والطويل!)
const tpl1asTclT3ArudBasitTawilLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t3_arud_basit_tawil_lb',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'prosody_arud',
	titleAr: 'البناء اللغوي — الإعراب والبديع والتقطيع العروضي (البسيط والطويل)',
	curriculumLessonId: 'arb_lesson_1as_tcl_t3_arud_basit_tawil',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				verseSadr: 'إِنْ كُنْتَ تَعْلَمُ مَا تَأْتِي وَمَا تَذَرُ',
				verseAjuz: 'فَكُنْ عَلَى حَذَرٍ قَدْ يَنْفَعُ الْحَذَرُ',
				arudWriting: 'إِنْ كُنْتَ تَعْ لَمُ مَا تَأْتِي وَمَا تَذَرُو — فَكُنْ عَلَى حَذَرِنْ قَدْ يَنْفَعُلْ حَذَرُو',
				symbols: '|ه|ه||ه |||ه |ه|ه||ه |||ه — ||ه||ه |||ه |ه|ه||ه |||ه',
				tafilat: 'مُسْتَفْعِلُنْ فَعِلُنْ مُسْتَفْعِلُنْ فَعِلُنْ — مُتَفْعِلُنْ فَعِلُنْ مُسْتَفْعِلُنْ فَعِلُنْ',
				meterName: 'بحر البسيط التام',
				irabEntries: [
					{ target: 'الْحَذَرُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'كُنْ', irab: 'فعل أمر ناقص مبني على السكون، واسمه ضمير مستتر تقديره أنت.', mark: '1.0' }
				],
				extraQ: 'استخرج من البيت السابق محسّنا بديعيا معنويا بين «تأتي» و«تذر»، وحدّد الغرض البلاغي للأمر في «فكن على حذر».',
				extraA: 'بين «تأتي» و«تذر» طباق إيجاب يوضح شمول اليقظة في الفعل والترك. والأمر «فكن» إنشائي طلبي غرضه النصح والإرشاد.',
				mcqQ: 'ما البحر الشعري لبيت سابق البربري: «إِنْ كُنْتَ تَعْلَمُ مَا تَأْتِي وَمَا تَذَرُ ... فَكُنْ عَلَى حَذَرٍ قَدْ يَنْفَعُ الْحَذَرُ»؟',
				mcqCorrect: 'بحر البسيط التام (مُسْتَفْعِلُنْ فَعِلُنْ مُسْتَفْعِلُنْ فَعِلُنْ)',
				mcqDistractors: [
					{ text: 'بحر الطويل التام', diagnosticFeedback: 'الطويل يبدأ بـ فعولن مفاعيلن لا بـ مستفعلن فعلن.' },
					{ text: 'بحر الكامل التام', diagnosticFeedback: 'الكامل من ثلاث تفعيلات صافية (متفاعلن).' },
					{ text: 'بحر الوافر التام', diagnosticFeedback: 'الوافر ثلاث تفعيلات هي مفاعلتن مفاعلتن فعولن.' }
				]
			},
			{
				verseSadr: 'أَلَا كُلُّ شَيْءٍ مَا خَلَا اللَّهَ بَاطِلُ',
				verseAjuz: 'وَكُلُّ نَعِيمٍ لَا مَحَالَةَ زَائِلُ',
				arudWriting: 'أَلَا كُلْ لُ شَيْئِنْ مَا خَلَلْ لَاهَ بَاطِلُو — وَكُلْلُ نَعِيمِنْ لَا مَحَا لَتَ زَائِلُو',
				symbols: '||ه|ه ||ه|ه|ه ||ه|ه ||ه||ه — ||ه| ||ه|ه|ه ||ه| ||ه||ه',
				tafilat: 'فَعُولُنْ مَفَاعِيلُنْ فَعُولُنْ مَفَاعِلُنْ — فَعُولُ مَفَاعِيلُنْ فَعُولُ مَفَاعِلُنْ',
				meterName: 'بحر الطويل التام',
				irabEntries: [
					{ target: 'بَاطِلُ', irab: 'خبر المبتدأ «كلُّ» مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' },
					{ target: 'زَائِلُ', irab: 'خبر المبتدأ «كلُّ» مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' }
				],
				extraQ: 'ما الزحاف العروضي الذي أصاب «مفاعيلن» في عروض البيت وضربه؟ وما المحسن اللفظي بين «باطلُ» و«زائلُ»؟',
				extraA: 'الزحاف هو القبض (حذف الخامس الساكن فصارت مفاعيلن إلى مفاعلن ||ه||ه). وبين «باطلُ» و«زائلُ» تصريع في مطلع القصيدة يعطي إيقاعا موسيقيا.',
				mcqQ: 'ما البحر الشعري لبيت لبيد رضي الله عنه: «أَلَا كُلُّ شَيْءٍ مَا خَلَا اللَّهَ بَاطِلُ ... وَكُلُّ نَعِيمٍ لَا مَحَالَةَ زَائِلُ»؟',
				mcqCorrect: 'بحر الطويل التام (فَعُولُنْ مَفَاعِيلُنْ فَعُولُنْ مَفَاعِلُنْ)',
				mcqDistractors: [
					{ text: 'بحر البسيط التام', diagnosticFeedback: 'البسيط يبدأ بـ مستفعلن لا بـ فعولن.' },
					{ text: 'بحر المتقارب التام', diagnosticFeedback: 'المتقارب كله فعولن دون مفاعيلن.' },
					{ text: 'بحر الرجز التام', diagnosticFeedback: 'الرجز ثلاث تفعيلات مستفعلن.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildArudScansionBlock({
				verseSadr: variant.verseSadr,
				verseAjuz: variant.verseAjuz,
				arudWriting: variant.arudWriting,
				symbols: variant.symbols,
				tafilat: variant.tafilat,
				meterName: variant.meterName,
				mark: '2.5'
			}),
			{ type: 'text', content: '2) أعرب الكلمتين المحددتين من البيت السابق:' },
			buildIrabTableBlock(variant.irabEntries),
			{
				type: 'text',
				content: `3) ${variant.extraQ}`,
				answer: `3) ${variant.extraA}`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر البحر الشعري الصحيح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تفعيلات البيت: ${variant.tafilat}، فهو من ${variant.meterName}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي (مع العروض)',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة العروض والإعراب والبلاغة الآتية:',
				content
			},
			hints: [
				'البسيط بحر ممزوج يبدأ بـ مستفعلن أو متفعلن ثم فاعلن أو فعلن.',
				'الطويل بحر ممزوج يبدأ دائما بـ فعولن أو فعولُ ثم مفاعيلن أو مفاعلن.',
				'أشبع حركة الحرف الأخير من كل شطر في الكتابة العروضية.'
			],
			solutionStepsAr: [
				`الكتابة العروضية: ${variant.arudWriting}`,
				`الرموز: ${variant.symbols}`,
				`التفعيلات: ${variant.tafilat} (${variant.meterName})`
			],
			finalAnswer: variant.meterName
		};
	}
};

// 4. التقييم النقدي (4 ن) — النهضة النثرية في العصر الأموي (الخطابة والرسائل الديوانية)
const tpl1asTclT3NaqdRasailKhatabaCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t3_naqd_rasail_khataba_ce',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — النهضة النثرية في العصر الأموي (الرسائل الديوانية والخطابة)',
	curriculumLessonId: 'arb_lesson_1as_tcl_t3_khataba_rasail_umawi',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'شهد العصر الأموي نهضة نثرية بارزة تُوّجت بميلاد فن الرسائل الديوانية وازدهار الخطابة الوعظية. المطلوب: اذكر عوامل ظهور الرسائل الديوانية، وبيّن دور عبد الحميد الكاتب في تأسيس أسلوبها الفني مع ذكر ثلاث خصائص لكتابته.',
				answer:
					'1) عوامل الظهور (1.5 ن): اتساع رقعة الدولة الإسلامية، وتعريب الدواوين، وكثرة المكاتبات الرسمية بين الخلافة والولاة والقادة.\n2) دور عبد الحميد الكاتب وخصائصه (2.5 ن): هو إمام الكتاب ومؤسس فن الترسل الديواني («بدئت الكتابة بعبد الحميد»)، وقد رسم دستور الكاتب المثقف في «رسالة إلى الكتاب»؛ ومن خصائصه: تطويل التحميدات في المطلع، الازدواج وتوازن الجمل والسجع العفوي، وضوح التصميم، والجمع بين الثقافة الشرعية والعربية والتاريخية.',
				mcqQ: 'ما أبرز إسهام نقدي وأدبي لعبد الحميد الكاتب في العصر الأموي؟',
				mcqCorrect: 'تأسيس أصول فن الرسائل الديوانية والأدبية ورسم التكوين العلمي والأخلاقي للكاتب',
				mcqDistractors: [
					{ text: 'وضع أوزان علم العروض الستة عشر', diagnosticFeedback: 'واضع علم العروض هو الخليل بن أحمد الفراهيدي.' },
					{ text: 'جمع شعر المعلقات الجاهلية', diagnosticFeedback: 'اشتهر عبد الحميد بالنثر والرسائل الديوانية.' },
					{ text: 'ترجمة الفلسفة اليونانية', diagnosticFeedback: 'أرسى أصول الكتابة العربية الأصيلة بدءا بالقرآن والفقه والعربية.' }
				]
			},
			{
				prompt: 'إلى جانب الرسائل الديوانية، حافظت الخطابة الوعظية والسياسية العادلة على إشراقها في العصر الأموي. المطلوب: عرّف بالخطابة الوعظية الأموية، واذكر أبرز علمين فيها، ثم لخّص خصائصها الموضوعية والفنية مع التمثيل.',
				answer:
					'1) التعريف والأعلام (2.0 ن): هي الخطب التي تهدف إلى ترقيق القلوب والتذكير بالآخرة وإقامة العدل والزهد؛ ومن أعظم أعلامها الخليفة عمر بن عبد العزيز والإمام الحسن البصري رحمهما الله.\n2) الخصائص مع التمثيل (2.0 ن): صدق الوعظ، التأثر بالقرآن والسنة، الإيجاز وتوازن الجمل والمقابلة دون تكلف؛ نحو قول الحسن البصري: «يا ابن آدم إنما أنت أيام، كلما ذهب يوم ذهب بعضك»، وقول عمر بن عبد العزيز: «ولست بمبتدع ولكني متبع».',
				mcqQ: 'من أبرز علمين يمثلان الخطابة الوعظية الصادقة في العصر الأموي؟',
				mcqCorrect: 'عمر بن عبد العزيز والإمام الحسن البصري رحمهما الله',
				mcqDistractors: [
					{ text: 'لبيد بن ربيعة والخنساء رضي الله عنهما', diagnosticFeedback: 'هما من الشعراء المخضرمين.' },
					{ text: 'حسان بن ثابت وكعب بن زهير رضي الله عنهما', diagnosticFeedback: 'هما من شعراء صدر الإسلام.' },
					{ text: 'أبو تمام والبحتري', diagnosticFeedback: 'هما من شعراء العصر العباسي.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `السؤال النقدي: ${variant.prompt}`,
				answer: `عناصر الإجابة النموذجية (4 ن):\n${variant.answer}`,
				mark: '4.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة النقدية الأدق:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'ثالثا: التقييم النقدي',
				points: this.defaultPoints,
				instruction: 'أجب عن سؤال التقييم النقدي الآتي في فقرة مركزة ومنظمة:',
				content
			},
			hints: [
				'اربط الرسائل الديوانية بتعريب الدواوين واتساع رقعة الدولة الإسلامية.',
				'اذكر خصائص عبد الحميد الكاتب بدقة: التحميدات، الازدواج، الثقافة الشرعية واللغوية.',
				'استشهد بعبارة صحيحة من خطب عمر بن عبد العزيز أو الحسن البصري رحمهما الله.'
			],
			solutionStepsAr: [variant.answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. التقييم النقدي (4 ن) — الشعر في العصر الأموي (الحكمة والفتوح والرثاء النبيل)
const tpl1asTclT3NaqdShiirUmawiCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t3_naqd_shiir_umawi_ce',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — تطور الشعر في العصر الأموي وخصائص شعر الحكمة والفتوح والرثاء',
	curriculumLessonId: 'arb_lesson_1as_tcl_t3_shiir_umawi_taqyim_naqdi',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'حافظ الشعر الأموي على عمود القصيدة العربية الأصيلة وجدّد في معانيه المستمدة من الروح الإسلامية والفتوح. المطلوب: اذكر غرضين نبيلين ازدهرا في الشعر الأموي مع ذكر علم لكل غرض، ثم بيّن ثلاث خصائص فنية لهذا الشعر.',
				answer:
					'1) الأغراض والأعلام (2.0 ن):\n- شعر الحكمة والوعظ والقناعة: سابق البربري (الذي وعظ الخليفة عمر بن عبد العزيز رحمه الله) وعروة بن أذينة.\n- شعر الفتوح والحنين والرثاء النبيل: مالك بن الريب التميمي (صاحب المرثية الشهيرة في ثغور خراسان).\n2) الخصائص الفنية (2.0 ن): المحافظة على عمود الشعر (البحور الكبرى كالبسيط والطويل، وحدة القافية)، سلاسة الألفاظ ووضوحها وتأثرها بالقرآن، وصدق العاطفة الوجدانية والبعد عن التكلف.',
				mcqQ: 'أيّ وصف يعكس بدقة مكانة الشعر في العصر الأموي؟',
				mcqCorrect: 'حافظ على عمود الشعر العربي الأصيل مع سلاسة الألفاظ وتجدد المعاني الإيمانية والوجدانية',
				mcqDistractors: [
					{ text: 'تخلى عن الوزن والقافية واتجه للشعر الحر', diagnosticFeedback: 'الشعر الأموي التزم تماما بنظام الشطرين وعمود الشعر.' },
					{ text: 'انحصر في تقليد الوقوف على الأطلال دون تجديد في المعاني', diagnosticFeedback: 'جدّد الشعراء كسابق البربري في المطالع بالبسملة والحمدلة وتوسعوا في معاني الوعظ والفتوح.' },
					{ text: 'ابتعد كليا عن أثر القرآن الكريم', diagnosticFeedback: 'تعمّق أثر القرآن والحديث في شعر الوعظ والحكمة الأموي.' }
				]
			},
			{
				prompt: 'قارن في فقرة نقدية موجزة بين مسار الشعر ومسار النثر في العصر الأموي من حيث مظاهر المحافظة ومظاهر التجديد، مدعّما إجابتك بعلم من الشعر وعلم من النثر.',
				answer:
					'1) في الشعر (2.0 ن): سادت المحافظة على الهيكل العمودي القديم (الوزن والقافية والجزالة)، مع تجديد في المعاني الإيمانية والوعظية والحنين في ثغور الفتوح؛ مثل سابق البربري في الوعظ ومالك بن الريب في الرثاء النبيل.\n2) في النثر (2.0 ن): كان التجديد أوسع وأظهر بظهور فن جديد هو «الرسائل الديوانية» على يد عبد الحميد الكاتب، وتطور الخطابة الوعظية عند عمر بن عبد العزيز والحسن البصري رحمهما الله.',
				mcqQ: 'ما أبرز فرق بين تطور الشعر وتطور النثر في العصر الأموي؟',
				mcqCorrect: 'النثر أبدع فنا جديدا هو الرسائل الديوانية بينما حافظ الشعر على عموده مع تجدد معانيه',
				mcqDistractors: [
					{ text: 'الشعر استحدث فن الرسائل الديوانية', diagnosticFeedback: 'الرسائل الديوانية فن نثري لا شعري.' },
					{ text: 'النثر توقف وتراجع في العصر الأموي', diagnosticFeedback: 'بل شهد النثر نهضة غير مسبوقة.' },
					{ text: 'لم يظهر أي تطور في الشعر ولا في النثر', diagnosticFeedback: 'شهد العصر الأموي تطورا كبيرا في كليهما.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `السؤال النقدي: ${variant.prompt}`,
				answer: `عناصر الإجابة النموذجية (4 ن):\n${variant.answer}`,
				mark: '4.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الحكم النقدي الصائب:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'ثالثا: التقييم النقدي',
				points: this.defaultPoints,
				instruction: 'أجب عن سؤال التقييم النقدي الآتي بإيجاز ومنهجية:',
				content
			},
			hints: [
				'استحضر أعلام الشعر الأموي الملتزم: سابق البربري، مالك بن الريب، عروة بن أذينة.',
				'بيّن التوازن بين المحافظة على عمود الشعر وتجدد المعاني الإيمانية والوجدانية.',
				'اختم خلاصة المقارنة بجملة جامعة سليمة اللغة.'
			],
			solutionStepsAr: [variant.answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T3: ArabicParameterizedTemplate[] = [
	tpl1asTclT3AdabUmawiIb,
	tpl1asTclT3IrabInshaBadiLb,
	tpl1asTclT3ArudBasitTawilLb,
	tpl1asTclT3NaqdRasailKhatabaCe,
	tpl1asTclT3NaqdShiirUmawiCe
];
