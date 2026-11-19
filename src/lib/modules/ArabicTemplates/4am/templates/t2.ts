import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import {
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري BEM (نثري) — العلم النافع والأخلاق وبناء الحضارة (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualScienceEthics4amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t2_intellectual_science_ethics',
	grade: '4am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري (BEM): العلم النافع والأخلاق وبناء الحضارة في نص نثري',
	curriculumLessonId: 'arb_lesson_4am_t2_muhassinat_ittisaq_insijam',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'العلمُ النافعُ وزينةُ الأخلاق',
				author: 'الإمام عبد الحميد بن باديس رحمه الله (بتصرّف)',
				source: 'آثار ابن باديس',
				paragraphs: [
					'ما ارتقتْ أمةٌ من الأممِ إلا [[بالعلمِ]] النافعِ المقترنِ بالأدبِ والخلقِ الحسنِ، لأنّ المعرفةَ المجردةَ عن القيمِ لا تزيدُ صاحبَها إلا [[غرُوراً]] وتكبّراً. ولقد كانَ سلفُنا الصالحُ — كالإمامِ مالكٍ والإمامِ البخاريِّ — يطلبونَ الأدبَ قبلَ العلمِ، ((وهُم يُوقِنُونَ أنّ الخلقَ تاجُ العالمِ)).',
					'إنّ التقدمَ التكنولوجيَّ في عصرِنا سلاحٌ ذو حدّينِ؛ فهو نعمةٌ عظيمةٌ متى وُظّفَ في نشرِ الخيرِ والبحثِ والابتكارِ، ونقمةٌ مدمّرةٌ حين يُستعملُ في إهدارِ الأوقاتِ ونشرِ التفاهةِ. فـكونُوا يا أبناءَ الجزائرِ أحرصَ الناسِ على توجيهِ العلمِ نحو البناءِ لا الهدمِ.'
				],
				vocab: [
					{ word: 'سلفُنا', meaning: 'السابقونَ من الصحابةِ والأئمةِ الصالحينَ' },
					{ word: 'ذو حدّينِ', meaning: 'يحملُ وجهاً نافعاً وآخرَ ضاراً حسبَ الاستعمالِ' }
				],
				generalIdea: 'بيان ضرورة اقتران العلم والتقدم التكنولوجي بالأخلاق الفاضلة على نهج السلف الصالح',
				q2: 'يكون التقدم التكنولوجي نعمةً حين يُوظّف في نشر الخير والبحث والابتكار، ويكون نقمةً حين يُستعمل في إهدار الأوقات ونشر التفاهة.',
				synWord: 'المجردةَ',
				synMeaning: 'الخاليةَ والمنفصلةَ',
				antWord: 'البناءِ',
				antMeaning: 'الهدمِ (واردة في النص)',
				badiQ: 'استخرج من الفقرة الثانية طباق إيجاب أو مقابلة، وبيّن أثرها في المعنى.',
				badiA: 'طباق إيجاب: «نعمة / نقمة» أو «البناء / الهدم» (ومقابلة بين توظيفه في الخير واستعماله في التفاهة)، أثرها توضيح المعنى وتقويته بإبراز الضد.',
				value: 'العلم النافع المقترن بالأخلاق والوعي هو السبيل الحق للرقيّ الحضاري'
			},
			{
				title: 'مسؤوليةُ المتعلمِ تجاهَ أمتِهِ',
				author: 'الشيخ العربي التبسي رحمه الله (بتصرّف)',
				source: 'مقالات جمعية العلماء المسلمين الجزائريين',
				paragraphs: [
					'إنّ طالبَ العلمِ في الإسلامِ ليسَ إنساناً يعيشُ لنفسِهِ في عزلةٍ، بل هو مشعلُ هدايةٍ ورائدُ إصلاحٍ ((يَحمِلُ همَّ أمتِهِ)) ويسعى إلى نهضتِها. وما نالَ [[العلماءُ]] الصادقونَ تلكَ المنزلةَ الرفيعةَ إلا بالصبرِ على المشاقِّ والإخلاصِ للهِ تعالى.',
					'غيرَ أنّ التقدّمَ لا يتحققُ بالأماني الكسولةِ، وإنّما بالجدِّ المتواصلِ، والاجتهادِ في المدارسِ و[[المعاهدِ]]، وحفظِ اللسانِ العربيِّ والتراثِ الإسلاميِّ الأصيلِ.'
				],
				vocab: [
					{ word: 'مشعلُ هدايةٍ', meaning: 'نورٌ يرشدُ الناسَ إلى الصوابِ' },
					{ word: 'المشاقِّ', meaning: 'الصعوباتِ والمتاعبِ' }
				],
				generalIdea: 'إبراز رسالة المتعلم الإصلاحية وضرورة الجدّ والصبر والإخلاص لتحقيق نهضة الأمة',
				q2: 'لا يتحقق التقدم بالأماني الكسولة، بل بالجد المتواصل والاجتهاد في المدارس والمعاهد وحفظ اللسان العربي والتراث الإسلامي.',
				synWord: 'عزلةٍ',
				synMeaning: 'انفرادٍ وابتعادٍ عن الناسِ',
				antWord: 'الكسولةِ',
				antMeaning: 'النشطةِ أو الجادّةِ',
				badiQ: 'استخرج من السند محسنين (أو طباقاً معنوياً) وبيّن دور الإحالة في ضمير «هو» في الفقرة الأولى.',
				badiA: 'التقابل المعنوي بين «الأماني الكسولة» و«الجدّ المتواصل». أما الضمير «هو» فيحيل إحالةً قبليةً على «طالبَ العلمِ» فيحقق الاتساق ويمنع التكرار.',
				value: 'العلم أمانة ورسالة إصلاح لا تتحقق إلا بالصبر والإخلاص والعمل الجاد'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'رفض التكنولوجيا الحديثة والدعوة إلى مقاطعة المدارس والمعاهد',
					diagnosticFeedback: 'النص يميز بين الاستعمال النافع والضار للعلم ويدعو إلى الجدّ في المدارس.'
				},
				{
					text: 'الفصل التام بين طلب العلم والالتزام بالأخلاق الإسلامية',
					diagnosticFeedback: 'النص يؤكد أن الأخلاق تاج العالم وأساس العلم النافع.'
				},
				{
					text: 'الاكتفاء بالأماني دون عمل ولا صبر في طلب المعرفة',
					diagnosticFeedback: 'النص يحذر صراحةً من الأماني الكسولة ويدعو إلى الجدّ والصبر.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الفكرة العامة الأنسب لسند «${variant.title}» (${variant.author})؟`,
				questionTextAr: `اختر الفكرة العامة الأدقّ لنص «${variant.title}»:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.generalIdea
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الأولى (البناء الفكري)',
				points: 6,
				instruction: 'اقرأ السند الآتي بتمعّن ثم أجب عن الأسئلة وفق منهجية BEM:',
				content: [
					buildProsePassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					}),
					{
						type: 'text',
						content: '1) صُغْ فكرةً عامةً مناسبةً للسند.',
						answer: `1) الفكرة العامة: ${variant.generalIdea}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) وضّح من السند الوجه الإيجابي والسلبي للتكنولوجيا، أو شروط تحقيق التقدم كما ذكرها الكاتب.',
						answer: `2) ${variant.q2}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كلمة «${variant.synWord}» وهاتِ ضدّ كلمة «${variant.antWord}».`,
						answer: `3) شرح «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) ${variant.badiQ}`,
						answer: `4) ${variant.badiA}`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استخلص قيمةً تربويةً علميةً من السند.',
						answer: `5) القيمة التربوية: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'استوعب ثنائية العلم والأخلاق التي يبني عليها الكاتب نصّه.',
				'في الطباق والمقابلة اذكر اللفظين المتضادين ثم أثرهما المعنوي.',
				'الإحالة القبلية بالضمائر تحقق الاتساق وتمنع التكرار.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				variant.q2,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				variant.badiA,
				`القيمة: ${variant.value}.`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء الفكري BEM (شعري) — التضحية وصون الهوية (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualHeritageHomeland4amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t2_intellectual_heritage_homeland',
	grade: '4am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري (BEM): التضحية وحب الوطن وصون الهوية في نص شعري',
	curriculumLessonId: 'arb_lesson_4am_t2_muhassinat_ittisaq_insijam',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'فداءُ الجزائرِ وصونُ عهدِها',
				author: 'الشاعر مفدي زكرياء رحمه الله (بتصرّف)',
				source: 'اللهب المقدس',
				verses: [
					['يا موطني أنتَ الحياةُ [[وعدُها]]', 'ولأجلِ عزّكَ ترخصُ الأرواحُ'],
					['كم سطّرَ الشهداءُ فوقَ جبالِنا', 'آياتِ مجدٍ ((صانَها الكفاحُ))'],
					['لا يرتضي الحرُّ الكريمُ هوانَهُ', 'إنّ الأبيَّ على الثرى مصباحُ'],
					['فاحفظْ بنيَّ أمانةَ الأبطالِ لا', 'تُضِعِ المسيرَ ففجرُنا وضّاحُ']
				] as Array<[string, string]>,
				vocab: [
					{ word: 'هوانَهُ', meaning: 'ذلَّهُ وانكسارَهُ' },
					{ word: 'الثرى', meaning: 'الترابِ والأرضِ' }
				],
				generalIdea: 'الإشادة بتضحيات الشهداء في سبيل حرية الجزائر ودعوة الجيل الصاعد إلى حفظ أمانتهم',
				q2: 'يرى الشاعر أن الأرواح ترخص لأجل عزة الوطن وأن الحرّ الأبيّ يرفض الهوان، ويوصي الأبناء بحفظ أمانة الأبطال ومواصلة مسيرة البناء.',
				synWord: 'هوانَهُ',
				synMeaning: 'ذلَّهُ وهضْمَ كرامتِهِ',
				antWord: 'الحرُّ',
				antMeaning: 'العبدُ أو الأسيرُ',
				figureQ: 'استخرج صورة بيانية من البيت الثالث واشرحها، ثم بيّن العاطفة المسيطرة على الشاعر.',
				figureA: '«إنّ الأبيَّ ... مصباحُ»: تشبيه بليغ شبّه الإنسان الحرّ الأبيّ بالمصباح لإبراز دوره في الهداية والعزة. العاطفة: حب الوطن والاعتزاز بتضحيات الشهداء.',
				value: 'الوفاء لأمانة الشهداء يكون بصون وحدة الجزائر وخدمتها بإخلاص'
			},
			{
				title: 'نداءُ التراثِ والأصالة',
				author: 'الشيخ أحمد سحنون رحمه الله (بتصرّف)',
				source: 'ديوان أحمد سحنون',
				verses: [
					['صُنْ يا أخي دينَ الهدى ولسانَهُ', 'فبِهِ استقامتْ للأنامِ [[حياةُ]]'],
					['في أرضِنا كم أشرقتْ من حكمةٍ', 'وروى مآثرَها لنا الأثباتُ'],
					['لا تلتفتْ نحو الدخيلِ فإنّما', 'عزُّ الشعوبِ ((تَصونُهُ الأخلاقُ))'],
					['بالعلمِ والقرآنِ نحفظُ مجدَنا', 'وعلى الهدى تتوحّدُ الراياتُ']
				] as Array<[string, string]>,
				vocab: [
					{ word: 'الأنامِ', meaning: 'الخلقِ والناسِ' },
					{ word: 'الأثباتُ', meaning: 'العلماءُ الثقاتُ المتقنونَ' }
				],
				generalIdea: 'الدعوة إلى صيانة الدين واللغة العربية والأخلاق الأصيلة ورفض التقليد الدخيل',
				q2: 'يدعو الشاعر إلى صيانة الدين واللسان العربي وعدم الالتفات إلى التقليد الدخيل، لأن عز الشعوب يصان بالأخلاق والعلم والقرآن.',
				synWord: 'مآثرَها',
				synMeaning: 'مفاخرَها ومحاسنَها الخالدةَ',
				antWord: 'عزُّ',
				antMeaning: 'ذلُّ وهوانُ',
				figureQ: 'حدّد نوع الأسلوب في «صُنْ يا أخي» و«لا تلتفتْ» وبيّن غرضه البلاغي.',
				figureA: 'أسلوب إنشائي طلبي بصيغتي الأمر والنهي والنداء، غرضه البلاغي النصح والإرشاد والحثّ على التمسك بالأصالة.',
				value: 'صيانة الدين واللغة العربية والأخلاق حصن الهوية الوطنية'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'نسيان تاريخ الأجداد والانبهار بالتقليد الأعمى للثقافات الدخيلة',
					diagnosticFeedback: 'القصيدة تدعو بالعكس تماماً إلى الوفاء للشهداء وحفظ الأصالة.'
				},
				{
					text: 'وصف المعارك البحرية القديمة في المحيط الأطلسي',
					diagnosticFeedback: 'القصيدة وطنية قيمية تتناول الوفاء للوطن وحفظ الهوية.'
				},
				{
					text: 'الشكوى من قسوة الشتاء والبرد في الجبال',
					diagnosticFeedback: 'القصيدة تتحدث عن الشهداء والعزة والهوية والدين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الفكرة العامة الأدقّ لقصيدة «${variant.title}» (${variant.author})؟`,
				questionTextAr: `اختر الفكرة العامة الصحيحة لقصيدة «${variant.title}»:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.generalIdea
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الأولى (البناء الفكري — نص شعري)',
				points: 6,
				instruction: 'اقرأ الأبيات الشعرية الآتية بتمعّن ثم أجب عن الأسئلة:',
				content: [
					buildPoetryPassageBlock({
						title: variant.title,
						verses: variant.verses,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					}),
					{
						type: 'text',
						content: '1) صُغْ فكرةً عامةً مناسبةً للقصيدة.',
						answer: `1) الفكرة العامة: ${variant.generalIdea}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) بمَ أوصى الشاعر أبناء وطنه، وما الأساس الذي يرى أن عزّ الأمة يقوم عليه؟',
						answer: `2) ${variant.q2}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كلمة «${variant.synWord}» وهاتِ ضدّ كلمة «${variant.antWord}».`,
						answer: `3) شرح «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) ${variant.figureQ}`,
						answer: `4) ${variant.figureA}`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استنتج قيمةً وطنيةً أخلاقيةً من الأبيات.',
						answer: `5) القيمة: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخلص الفكرة العامة من مجموع الأبيات الأربعة دون الاقتصار على بيت واحد.',
				'العاطفة في الشعر الوطني الجزائري تجمع بين حب الوطن والاعتزاز بالهوية الإسلامية.',
				'حدّد صيغة الأسلوب الإنشائي بدقة (أمر، نهي، نداء).'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				variant.q2,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				variant.figureA,
				`القيمة: ${variant.value}.`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي BEM — الاستثناء بـ إلا وغير وسوى + التمييز بنوعيه (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticIstithnaTamyiz4amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t2_linguistic_istithna_tamyiz',
	grade: '4am',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي (BEM): الاستثناء بـ إلا وغير وسوى والتمييز بنوعيه',
	curriculumLessonId: 'arb_lesson_4am_t2_istithna',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				passage:
					'ما نالَ شرفَ الريادةِ إلا [[المجتهدونَ]]، فقد أنجزَ التلاميذُ البحوثَ [[غيرَ]] [[بحثٍ]] واحدٍ؛ وازدادَ القارئُ [[علماً]] وأدباً بعد أن طالعَ عشرينَ [[صفحةً]]، وصارَ أكثرَ أقرانِهِ ((إقبالاً على المطالعةِ)) وحسنَ خلقٍ.',
				irabRows: [
					{
						target: 'المجتهدونَ',
						irab: 'فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم (الاستثناء ناقص منفي، و«إلا» أداة حصر).',
						mark: '0.5'
					},
					{
						target: 'غيرَ (بحثٍ)',
						irab: 'غيرَ: اسم استثناء منصوب وجوباً بالفتحة (تام مثبت) وهو مضاف. بحثٍ: مضاف إليه مجرور بالكسرة.',
						mark: '0.5'
					},
					{
						target: 'علماً',
						irab: 'تمييز نسبة (ملحوظ) منصوب وعلامة نصبه الفتحة الظاهرة (بعد الفعل ازدادَ).',
						mark: '0.5'
					},
					{
						target: 'صفحةً',
						irab: 'تمييز ذات (ملفوظ) منصوب وعلامة نصبه الفتحة الظاهرة (بعد لفظ العقد عشرينَ).',
						mark: '0.5'
					}
				],
				replaceQ: 'استبدل «إلا» بـ «سوى» في جملة «ما يُدركُ قيمةَ العلمِ إلا العاقلُ»، واضبط ما بعدها وأعرب «سوى».',
				replaceA: 'ما يُدركُ قيمةَ العلمِ سوى العاقلِ. «سوى»: فاعل مؤخر مرفوع وعلامة رفعه الضمة المقدرة للتعذّر وهو مضاف، والعاقلِ مضاف إليه مجرور.',
				tamyizDiffQ: 'فرّق بين التمييز والحال في: «امتلأَ قلبُ المؤمنِ يقيناً» و«عادَ المؤمنُ مطمئنّاً».',
				tamyizDiffA: '«يقيناً»: تمييز نسبة منصوب (اسم جامد يزيل إبهام جملة امتلأَ). «مطمئنّاً»: حال مفردة منصوبة (مشتق يبيّن هيئة صاحبه ويجيب عن كيف عاد؟).',
				q4: 'حوّل الكلام في «أثمرَ البستانُ إلا شجرةً» إلى تام منفي واضبط المستثنى بالوجهين الجائزين.',
				a4: 'ما أثمرَ البستانُ إلا شجرةً (مستثنى منصوب) أو شجرةٌ (بدل مرفوع تابع للمستثنى منه البستانُ).',
				mcqPrompt: 'ما إعراب «المجتهدونَ» في جملة «ما نالَ شرفَ الريادةِ إلا المجتهدونَ»؟',
				mcqCorrect: 'فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم (استثناء ناقص منفي)',
				mcqWrong1: 'مستثنى منصوب بالواو',
				mcqWrong2: 'بدل مرفوع وعلامة رفعه الواو',
				mcqWrong3: 'مفعول به مرفوع بالواو'
			},
			{
				author: 'الشيخ مبارك بن محمد الميلي رحمه الله (بتصرّف)',
				passage:
					'لا يبني الأوطانَ [[سوى]] [[المخلصينَ]]؛ ولقد حفظَ الطلابُ القصائدَ إلا [[قصيدةً]]، وتصدّقَ المحسنُ بصاعٍ [[قمحاً]]، فطابَ المحسنُ [[نفساً]] وفاضَ قلبُهُ رحمةً، وهو أعظمُ الناسِ قدراً ((حين ينفعُ مجتمعَهُ)).',
				irabRows: [
					{
						target: 'سوى',
						irab: 'فاعل مؤخر مرفوع وعلامة رفعه الضمة المقدرة على الألف منع من ظهورها التعذّر (ناقص منفي) وهو مضاف (المخلصينَ مضاف إليه مجرور بالياء).',
						mark: '0.5'
					},
					{
						target: 'قصيدةً',
						irab: 'مستثنى بـ «إلا» منصوب وجوباً وعلامة نصبه الفتحة الظاهرة (لأن الكلام تام مثبت).',
						mark: '0.5'
					},
					{
						target: 'قمحاً',
						irab: 'تمييز ذات (مفرد) منصوب وعلامة نصبه الفتحة الظاهرة (فسّر الكيل «صاعٍ»).',
						mark: '0.5'
					},
					{
						target: 'نفساً',
						irab: 'تمييز نسبة (جملة) منصوب وعلامة نصبه الفتحة الظاهرة (بعد الفعل طابَ).',
						mark: '0.5'
					}
				],
				replaceQ: 'ضع «إلا» بدل «سوى» في «لا يبني الأوطانَ سوى المخلصينَ» واضبط الكلمة الأخيرة وأعربها.',
				replaceA: 'لا يبني الأوطانَ إلا المخلصونَ. «المخلصونَ»: فاعل مؤخر مرفوع بالواو لأنه جمع مذكر سالم (ناقص منفي).',
				tamyizDiffQ: 'اذكر نوع التمييز في «قدراً» بعد «أعظمُ» وأعربه.',
				tamyizDiffA: '«قدراً»: تمييز نسبة منصوب وعلامة نصبه الفتحة الظاهرة (نكرة منصوبة بعد أفعل التفضيل).',
				q4: 'ما المحل الإعرابي للجملة الواقعة بين قوسين ((ينفعُ مجتمعَهُ)) بعد الظرف «حينَ»؟',
				a4: 'جملة فعلية في محل جر مضاف إليه (وقعت بعد ظرف الزمان «حينَ»).',
				mcqPrompt: 'عند وضع «إلا» مكان «سوى» في «لا يبني الأوطانَ سوى المخلصينَ»، ما الصواب؟',
				mcqCorrect: 'لا يبني الأوطانَ إلا المخلصونَ (فاعل مرفوع بالواو)',
				mcqWrong1: 'لا يبني الأوطانَ إلا المخلصينَ (مستثنى منصوب)',
				mcqWrong2: 'لا يبني الأوطانَ إلا المخلصينَ (مضاف إليه)',
				mcqWrong3: 'لا يبني الأوطانَ إلا المخلصونَ (مبتدأ مؤخر)'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'الكلام ناقص منفي (احذف لا وإلا: يبني المخلصون الأوطان) فهو فاعل مرفوع بالواو!' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'بعد «إلا» لا يوجد مضاف إليه، ولا يوجد مستثنى منه للبدلية.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'الجملة فعلية مبدوءة بـ «يبني / نال» فالمرفوع بعدها فاعل مؤخر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqPrompt,
				questionTextAr: variant.mcqPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الثانية (البناء اللغوي — الاستثناء والتمييز)',
				points: 6,
				instruction: 'اقرأ الفقرة الآتية ثم أجب عن أسئلة القواعد وفق منهجية BEM:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط في الفقرة إعراباً نموذجياً كاملاً:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) ${variant.replaceQ}`,
						answer: `2) ${variant.replaceA}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ${variant.tamyizDiffQ}`,
						answer: `3) ${variant.tamyizDiffA}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ${variant.q4}`,
						answer: `4) ${variant.a4}`,
						mark: '1'
					}
				]
			},
			hints: [
				'في الناقص المنفي احذف النفي وأداة الاستثناء لتكتشف الموقع الإعرابي الحقيقي.',
				'ما بعد «غير» و«سوى» مضاف إليه مجرور دائماً، و«سوى» تُعرب بحركات مقدرة.',
				'تمييز الذات بعد العدد والكيل والوزن والمساحة، وتمييز النسبة بعد ازداد وطاب وامتلأ وأفعل التفضيل.'
			],
			solutionStepsAr: [
				'إعراب المستثنى و«غير وسوى» وتمييز الذات وتمييز النسبة.',
				variant.replaceA,
				variant.tamyizDiffA,
				variant.a4
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. البناء اللغوي BEM — التوكيد والممنوع من الصرف والاتساق والإحالة (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticTawkidMamnuIttisaq4amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t2_linguistic_tawkid_mamnu_ittisaq',
	grade: '4am',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي (BEM): التوكيد والممنوع من الصرف والمحسنات والاتساق والإحالة',
	curriculumLessonId: 'arb_lesson_4am_t2_mamnu_min_sarf',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'المؤرخ أبو القاسم سعد الله رحمه الله (بتصرّف)',
				passage:
					'تزخرُ الجزائرُ [[بمساجدَ]] تاريخيةٍ و[[معالمَ]] شامخةٍ في [[تلمسانَ]] وبجايةَ؛ وقد حافظَ الأسلافُ [[كلُّهم]] على هذا التراثِ، فالعلمُ [[العلمُ]] سلاحُ الأمةِ، والوالدانِ [[كلاهما]] حريصانِ على تعليمِ الأبناءِ ((ليحفظُوا هويتَهم)).',
				irabRows: [
					{
						target: 'بمساجدَ',
						irab: 'الباء حرف جر؛ مساجدَ: اسم مجرور وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف (صيغة منتهى الجموع).',
						mark: '0.5'
					},
					{
						target: 'تلمسانَ',
						irab: 'اسم مجرور بـ في وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف (العلمية وزيادة الألف والنون).',
						mark: '0.5'
					},
					{
						target: 'كلُّهم',
						irab: 'توكيد معنوي مرفوع وعلامة رفعه الضمة (تابع للأسلافُ) وهو مضاف، و«هم» مضاف إليه.',
						mark: '0.5'
					},
					{
						target: 'كلاهما',
						irab: 'توكيد معنوي مرفوع وعلامة رفعه الألف لأنه ملحق بالمثنى وهو مضاف، و«هما» مضاف إليه.',
						mark: '0.5'
					}
				],
				mamnuConvertQ: 'اجعل كلمة «مساجدَ» الممنوعة من الصرف مجرورةً بالكسرة الظاهرة في جملتين مختلفتين مع التعليل.',
				mamnuConvertA: '1) بالتعريف بـ «أل»: صلّيتُ في المساجدِ التاريخيةِ. 2) بالإضافة: صلّيتُ في مساجدِ الجزائرِ.',
				tawkidLafziQ: 'استخرج من الفقرة توكيداً لفظياً، ثم بيّن الفرق بين «كلاهما» في الفقرة و«كلا الطالبينِ مجتهدٌ».',
				tawkidLafziA: 'التوكيد اللفظي: «العلمُ» الثانية. أما «كلاهما» في الفقرة فأُضيفت لضمير فأُعربت إعراب المثنى توكيداً مرفوعاً بالألف، بينما في «كلا الطالبينِ» أُضيفت لاسم ظاهر فتُعرب مبتدأً مرفوعاً بالضمة المقدرة للتعذّر.',
				ihalaQ: 'حدّد نوع الإحالة في اسم الإشارة «هذا» في «هذا التراثِ»، وبيّن دورها في اتساق الفقرة.',
				ihalaA: 'إحالة قبلية تعود على المساجد والمعالم المذكورة سابقاً، دورها ربط أجزاء النص وتحقيق الاتساق وتفادي التكرار.',
				mcqPrompt: 'ما سبب منع كلمة «تلمسانَ» من الصرف وما علامة جرها في النص؟',
				mcqCorrect: 'لعلّتين: العلمية وزيادة الألف والنون، وعلامة جرها الفتحة نيابة عن الكسرة',
				mcqWrong1: 'لعلّة واحدة: صيغة منتهى الجموع، وتُجرّ بالكسرة',
				mcqWrong2: 'لعلّتين: الوصفية ووزن فعلان، وتُجرّ بالفتحة',
				mcqWrong3: 'لعلّة واحدة: ألف التأنيث الممدودة، وتُجرّ بالفتحة'
			},
			{
				author: 'الشيخ الطيب العقبي رحمه الله (بتصرّف)',
				passage:
					'أعجبتُ بأئمةِ السلفِ [[عمرَ]] وأحمدَ وإبراهيمَ الذين سارُوا في [[صحراءَ]] الحياةِ [[بمصابيحَ]] الهدى؛ فأحببتُ سيرتَهم [[نفسَها]]، والصدقُ [[الصدقُ]] طريقُ النجاةِ. وتلكَ هي الوصيةُ الجامعةُ: ((حافِظْ على دينِكَ ولغتِكَ)).',
				irabRows: [
					{
						target: 'عمرَ',
						irab: 'بدل (أو عطف بيان) مجرور وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف (العلمية والعدل على وزن فُعَل).',
						mark: '0.5'
					},
					{
						target: 'صحراءَ',
						irab: 'اسم مجرور بـ في وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف (ألف التأنيث الممدودة).',
						mark: '0.5'
					},
					{
						target: 'بمصابيحَ (أو بمصابيحِ الهدى)',
						irab: 'بمصابيحِ: اسم مجرور وعلامة جره الكسرة الظاهرة لأنه صُرف بالإضافة إلى «الهدى» (والأصل فيه صيغة منتهى الجموع).',
						mark: '0.5'
					},
					{
						target: 'نفسَها',
						irab: 'توكيد معنوي منصوب وعلامة نصبه الفتحة الظاهرة (تابع لـ سيرتَهم) وهو مضاف، و«ها» مضاف إليه.',
						mark: '0.5'
					}
				],
				mamnuConvertQ: 'علّل منع كلمتي «أحمدَ» و«إبراهيمَ» من الصرف، ثم اذكر لمَ جُرّت «مصابيحِ» بالكسرة عند إضافتها إلى «الهدى».',
				mamnuConvertA: '«أحمدَ»: للعلمية ووزن الفعل. «إبراهيمَ»: للعلمية والعجمة الزائدة على ثلاثة أحرف. جُرّت «مصابيحِ» بالكسرة لأن الممنوع من الصرف يُصرف إذا أُضيف أو عُرّف بـ «أل».',
				tawkidLafziQ: 'استخرج التوكيد اللفظي من الفقرة وأعربه، ثم حوّل «حضرَ جميعُ التلاميذِ» إلى جملة فيها توكيد معنوي.',
				tawkidLafziA: 'التوكيد اللفظي: «الصدقُ» الثانية (مرفوع بالضمة). التحويل: «حضرَ التلاميذُ جميعُهم».',
				ihalaQ: 'ما نوع الإحالة في اسم الإشارة «تلكَ» في آخر الفقرة؟ علّل إجابتك.',
				ihalaA: 'إحالة بعدية باسم الإشارة «تلكَ» لأنها تمهّد للوصية التي جاءت بعدها («حافِظْ على دينِكَ ولغتِكَ»).',
				mcqPrompt: 'في عبارة «بمصابيحِ الهدى»، ما علامة جرّ «مصابيحِ» ولماذا؟',
				mcqCorrect: 'الكسرة الظاهرة لأنها مضافة إلى «الهدى»',
				mcqWrong1: 'الفتحة نيابة عن الكسرة لأنها صيغة منتهى الجموع دائماً',
				mcqWrong2: 'الكسرة المقدرة للتعذر',
				mcqWrong3: 'الياء لأنها جمع مذكر سالم'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تذكّر: الممنوع من الصرف يُجرّ بالكسرة إذا أُضيف أو اقترن بأل، والعلم المختوم بـ «ان» ممنوع للعلمية والزيادة.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'تحقق من نوع الكلمة (علم أم صفة) ومن حالة الإضافة والتعريف.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'راجع علل المنع من الصرف لعلّة ولعلّتين وحالتي صرفه.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqPrompt,
				questionTextAr: variant.mcqPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الثانية (التوكيد والممنوع من الصرف والاتساق)',
				points: 6,
				instruction: 'اقرأ الفقرة الآتية ثم أجب عن الأسئلة بدقة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط في الفقرة إعراباً نموذجياً:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) ${variant.mamnuConvertQ}`,
						answer: `2) ${variant.mamnuConvertA}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ${variant.tawkidLafziQ}`,
						answer: `3) ${variant.tawkidLafziA}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ${variant.ihalaQ}`,
						answer: `4) ${variant.ihalaA}`,
						mark: '1'
					}
				]
			},
			hints: [
				'يُجرّ الممنوع من الصرف بالفتحة نيابة عن الكسرة، ويعود للكسرة إذا عُرّف بأل أو أُضيف.',
				'التوكيد المعنوي يتصل بضمير يطابق المؤكَّد ويصح حذفه دون فساد المعنى.',
				'الإحالة القبلية تعود على سابق، والبعدية تشير إلى لاحق.'
			],
			solutionStepsAr: [
				'إعراب الممنوع من الصرف والتوكيد المعنوي.',
				variant.mamnuConvertA,
				variant.tawkidLafziA,
				variant.ihalaA
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. الوضعية الإدماجية BEM — التوظيف الإيجابي للتكنولوجيا والوعي العلمي (8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTechEthicsBem4amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t2_integration_tech_ethics_bem',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (BEM): نص حجاجي حول التوظيف الإيجابي للتكنولوجيا ومخاطر الإفراط الرقمي',
	curriculumLessonId: 'arb_lesson_4am_t2_muhassinat_ittisaq_insijam',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				context:
					'لاحظتَ انشغال كثيرٍ من تلاميذ الرابعة متوسط بالهواتف الذكية والألعاب الإلكترونية على حساب التحضير لشهادة التعليم المتوسط، مما أدّى إلى تراجع التركيز وضعف النتائج.',
				quote: 'قال النبي صلى الله عليه وسلم: «نعمتانِ مغبونٌ فيهما كثيرٌ من الناسِ: الصحةُ والفراغُ» (رواه البخاري).',
				instruction:
					'اكتب نصاً حجاجياً من 14 إلى 16 سطراً تُقنع فيه زملاءك بضرورة ترشيد استعمال التكنولوجيا وتوجيهها نحو العلم والمراجعة لا إهدار الوقت، موظّفاً: أسلوب استثناء بـ «إلا» أو «غير»، وتمييز نسبة، وتوكيداً معنوياً، وممنوعاً من الصرف مجروراً بالفتحة.',
				modelOutline:
					'المقدمة (3 أسطر): إبراز انتشار الأجهزة الذكية وطرح إشكالية حسن استغلالها مقابل إدمانها. العرض (9-10 أسطر): فقرة أولى تعرض فوائد التكنولوجيا في البحث العلمي والتعلّم؛ وفقرة ثانية حجاجية تفنّد الإدمان الرقمي بالأدلة (ضياع الوقت، ضعف التركيز، تراجع التحصيل) مع الاستشهاد بحديث البخاري. الخاتمة (3 أسطر): توصية عملية بتنظيم الوقت للنجاح في BEM. أمثلة التوظيف: «ما ينجحُ إلا المنظّمُ وقتَهُ» (استثناء ناقص منفي)، «ازدادَ الطالبُ وعياً» (تمييز نسبة)، «يحتاجُ التلاميذُ كلُّهم إلى التنظيمِ» (توكيد معنوي)، «تعلّمنا في مدارسَ ومخابرَ حديثةٍ» (ممنوع من الصرف مجرور بالفتحة).',
				mcqCorrect: 'إقناع الزملاء بترشيد التكنولوجيا بالحجج والشاهد مع توظيف الاستثناء والتمييز والتوكيد والممنوع من الصرف'
			},
			{
				context:
					'في معرض مدرسي للصناعات التقليدية والتراث الجزائري، سمعتَ أحد الزوار يقلّل من أهمية الحِرَف التقليدية في عصر الصناعة الحديثة، فأردتَ الردّ عليه بمقال يبرز قيمتها الحضارية والاقتصادية.',
				quote: 'قال العلامة محمد البشير الإبراهيمي رحمه الله: «إنّ الأمةَ التي تحفظُ تراثَها تحفظُ شخصيتَها بين الأممِ».',
				instruction:
					'حرّر نصاً حجاجياً تفسيرياً من 14 إلى 16 سطراً تدافع فيه عن مكانة الصناعات التقليدية وتشرح سبل تطويرها وحمايتها من الاندثار، موظّفاً: استثناءً بـ «سوى»، وتمييزاً بعد أفعل التفضيل، وتوكيداً لفظياً، ومقابلةً أو طباقاً.',
				modelOutline:
					'المقدمة: تعريف الصناعات التقليدية (النحاس، الفخار، النسيج، الزربية) كمرآة للهوية الجزائرية. العرض: فقرة تفسيرية تبرز تنوّعها في ولايات الوطن ومصادر دخلها للأسر؛ وفقرة حجاجية تردّ على من يقلّل من شأنها وتدعو للجمع بين الأصالة والتحديث، مع الاستشهاد بقول الإبراهيمي. الخاتمة: دعوة لتشجيع الحرفيين والاعتزاز بالتراث. التوظيف: «لا يزهدُ في التراثِ سوى الغافلِ» (استثناء بسوى)، «الصناعةُ اليدويةُ أعمقُ أصالةً» (تمييز نسبة)، «التراثَ التراثَ يا شبابَ الجزائرِ» (توكيد لفظي)، «الأصالةُ تحفظُ الهويةَ والتقليدُ يطمسُها» (مقابلة).',
				mcqCorrect: 'الدفاع عن قيمة الصناعات التقليدية بالحجج والتفسير مع توظيف كل الموارد النحوية والبلاغية المطلوبة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			topic.mcqCorrect,
			[
				{
					text: 'الاقتصار على مهاجمة التكنولوجيا أو الحرف بأسلوب انفعالي دون حجج ولا شواهد',
					diagnosticFeedback: 'الحجاج الموضوعي المتوازن المدعّم بالأدلة هو المطلوب في BEM.'
				},
				{
					text: 'توظيف ممنوع من الصرف مقترن بأل مجرور بالكسرة بدل المجرور بالفتحة المطلوب',
					diagnosticFeedback: 'انتبه للتعليمة: «ممنوعاً من الصرف مجروراً بالفتحة» يجب أن يكون نكرة غير مضافة!'
				},
				{
					text: 'كتابة فقرة واحدة من ستة أسطر بلا مقدمة ولا خاتمة',
					diagnosticFeedback: 'ذلك يخلّ بمعياري الملاءمة (الحجم) والانسجام (التصميم).'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما المنهجية السليمة لتحقيق أعلى نقطة في هذه الوضعية الإدماجية (BEM)؟',
				questionTextAr: 'اختر الخيار الأمثل لإنجاز هذه الوضعية الإدماجية:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: topic.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الثاني — الوضعية الإدماجية (BEM)',
				points: 8,
				instruction: 'أنتج نصاً مترابطاً مستوفياً معايير شهادة التعليم المتوسط:',
				content: [
					buildWrittenProductionBlock({
						context: topic.context,
						supportQuote: topic.quote,
						instruction: topic.instruction,
						rubricCriteria: [
							'الملاءمة (الموضوع، النمط الحجاجي، 14-16 سطراً، الموارد الأربع مضبوطة: 2.5 ن)',
							'الانسجام (تصميم واضح، روابط حجاجية وإحالة نصية سليمة: 2 ن)',
							'سلامة اللغة (ضبط الاستثناء والتمييز والتوكيد والممنوع من الصرف والإملاء: 2.5 ن)',
							'الإتقان والإبداع (توظيف الشاهد النبوي أو القول المأثور، علامات الوقف، الخط النظيف: 1 ن)'
						],
						modelOutline: topic.modelOutline,
						mark: '8'
					})
				]
			},
			hints: [
				'لضبط ممنوع من الصرف مجرور بالفتحة استخدم نكرة غير مضافة بعد حرف جر مثل «في مدارسَ» أو «بمعاملَ».',
				'وظّف حديث البخاري أو قول الإبراهيمي داخل العرض الحجاجي لرفع قوة الإقناع.',
				'تأكّد من ضبط التمييز المنصوب والتوكيد التابع لحركة المؤكَّد.'
			],
			solutionStepsAr: [
				'تفكيك التعليمة وتجهيز جمل التوظيف الأربع في المسودة.',
				'بناء مقدمة وعرض حجاجي مدعّم بالحجج والشاهد وخاتمة توجيهية.',
				'المراجعة اللغوية النهائية وضبط الحركات الإعرابية وعلامات الترقيم.'
			],
			finalAnswer: topic.mcqCorrect
		};
	}
};

export const TEMPLATES_4AM_T2: ArabicParameterizedTemplate[] = [
	intellectualScienceEthics4amT2,
	intellectualHeritageHomeland4amT2,
	linguisticIstithnaTamyiz4amT2,
	linguisticTawkidMamnuIttisaq4amT2,
	integrationTechEthicsBem4amT2
];
