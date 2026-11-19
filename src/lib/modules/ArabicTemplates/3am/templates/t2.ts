import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import {
	buildIrabTableBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري — عظماء الأمة والعلم والتقدم (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualScholarsHeroism3amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t2_intellectual_scholars_heroism',
	grade: '3am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: عظماء الأمة وأثر العلم والأخلاق في النهضة',
	curriculumLessonId: 'arb_lesson_3am_t2_jinas_muqabala_saja_hijaji',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'العلمُ والأخلاقُ جناحا النهضة',
				author: 'الإمام عبد الحميد بن باديس رحمه الله (بتصرّف)',
				source: 'مجلة الشهاب',
				paragraphs: [
					'إنّ الأممَ العظيمةَ لا تُبنى بالثرواتِ وحدها ولا بالشعاراتِ الفارغةِ، بل تُبنى بسواعدِ أبنائها العلماءِ الصالحينَ الذين يجمعونَ بين نورِ المعرفةِ واستقامةِ الخلقِ. فلا شكّ أنّ علماً بلا خلقٍ يورثُ الغرورَ والفسادَ، وخلقاً بلا علمٍ يعجزُ عن مواكبةِ التقدمِ.',
					'ولقد أثبتَ تاريخُنا الإسلاميُّ والجزائريُّ أنّ عظماءَ الأمةِ — كالإمامِ البخاريِّ والشيخِ البشيرِ الإبراهيميِّ — ما بلغوا الخلودَ في ذاكرةِ التاريخِ إلا بالصبرِ والاجتهادِ وخدمةِ الدينِ والوطنِ. ومن هنا كان لزاماً على شبابِنا أن يقتدوا بسيرتِهِم، لأنّ الاقتداءَ بالعظماءِ يشحذُ الهِمَمَ ويُوقظُ العزائمَ.'
				],
				vocab: [
					{ word: 'يشحذُ', meaning: 'يقوّي ويُحدُّ ويدفعُ إلى النشاط' },
					{ word: 'العزائم', meaning: 'الإرادات القوية الصادقة' }
				],
				generalIdea: 'إبراز أن نهضة الأمم تقوم على الجمع بين العلم والأخلاق والاقتداء بعظماء التاريخ',
				thesis: 'لا تنهض الأمة بالثروة وحدها بل بالعلم النافع المقترن بالأخلاق الفاضلة',
				proof: 'الاستدلال بالتاريخ الإسلامي والجزائري وسيرة عظماء مثل الإمام البخاري والشيخ البشير الإبراهيمي',
				synWord: 'العزائم',
				synMeaning: 'الإرادات القوية',
				antWord: 'الغرور',
				antMeaning: 'التواضع',
				pattern: 'النمط الحجاجي',
				patternProof: 'عرض أطروحة، أدوات التوكيد («إنّ»، «لا شكّ»، «ولقد»)، الاستدلال بالتاريخ وروابط الاستنتاج («ومن هنا»)'
			},
			{
				title: 'القدوةُ الصالحةُ وبناءُ الأجيال',
				author: 'الشيخ العربي التبسي رحمه الله (بتصرّف)',
				source: 'مقالات جمعية العلماء المسلمين الجزائريين',
				paragraphs: [
					'حقاً إنّ حاجةَ الشبابِ اليومَ إلى القدوةِ الصالحةِ أشدُّ من حاجتِهِم إلى كثرةِ الكلامِ، لأنّ السيرةَ العمليةَ أبلغُ في الإقناعِ من ألفِ خطبةٍ. غير أنّ كثيراً من الناسِ ينبهرونَ بمشاهيرِ التفاهةِ ويغفلونَ عن أئمةِ العلمِ وأبطالِ التضحيةِ.',
					'ولو تأمّلَ العاقلُ أثرَ العلماءِ المخلصينَ في نهضةِ الشعوبِ لأدركَ أنّهم هم القادةُ الحقيقيونَ للحضارةِ؛ فقد أضاءُوا العقولَ، وهذّبُوا النفوسَ، وتركُوا إرثاً ينتفعُ به الناسُ عبرَ العصورِ.'
				],
				vocab: [
					{ word: 'أبلغُ', meaning: 'أشدّ تأثيراً وأقوى وقعاً' },
					{ word: 'إرثاً', meaning: 'تراثاً علمياً وأخلاقياً باقياً' }
				],
				generalIdea: 'الدفاع عن أهمية القدوة الصالحة من العلماء والمصلحين في تربية الأجيال وبناء الحضارة',
				thesis: 'حاجة الشباب إلى القدوة العملية الصالحة أشد من حاجتهم إلى الكلام النظري',
				proof: 'تأثير السيرة العملية وأثر العلماء المخلصين في إضاءة العقول وبناء الحضارة عبر العصور',
				synWord: 'أبلغُ',
				synMeaning: 'أقوى تأثيراً',
				antWord: 'يغفلونَ',
				antMeaning: 'ينتبهونَ ويتفطّنونَ',
				pattern: 'النمط الحجاجي',
				patternProof: 'أدوات التوكيد («حقاً إنّ»، «فقد»)، الاستدراك («غير أنّ»)، والتعليل والبرهنة لإقناع القارئ'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'انتقاد التطور العلمي والدعوة إلى هجر المدارس والجامعات',
					diagnosticFeedback: 'النص يمجّد العلم النافع المقترن بالأخلاق ولا ينتقده.'
				},
				{
					text: 'وصف المعالم السياحية في الصحراء الجزائرية',
					diagnosticFeedback: 'النص فكري حجاجي حول العلم والأخلاق والقدوة الصالحة.'
				},
				{
					text: 'اعتبار الثروة المادية العامل الوحيد لنجاح الشعوب',
					diagnosticFeedback: 'الكاتب رفض هذه الفكرة صراحةً وأكد على العلم والأخلاق والقدوة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الفكرة العامة التي يدافع عنها الكاتب في نص «${variant.title}»؟`,
				questionTextAr: `اختر الفكرة العامة الأدقّ لنص «${variant.title}»:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.generalIdea
			},
			sujetExercise: {
				customTitle: 'الوضعية الأولى (البناء الفكري)',
				points: 6,
				instruction: 'اقرأ السند الآتي بتمعّن ثم أجب عن الأسئلة:',
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
						content: '1) حدّد الأطروحة (الفكرة الرئيسة) التي يدافع عنها الكاتب في السند.',
						answer: `1) الأطروحة: ${variant.thesis}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) بمَ استدلّ الكاتب لإقناع القارئ بصحة رأيه؟',
						answer: `2) استدلّ بـ: ${variant.proof}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كلمة «${variant.synWord}» وهاتِ ضدّ كلمة «${variant.antWord}» من فهمك للسياق.`,
						answer: `3) شرح «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) ما النمط الغالب على السند؟ علّل إجابتك بمؤشرين.',
						answer: `4) النمط الغالب: ${variant.pattern}. التعليل: ${variant.patternProof}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استنتج قيمةً أخلاقيةً مستفادةً من السند.',
						answer: '5) القيمة الأخلاقية: الاقتداء بالعلماء والمصلحين والجمع بين طلب العلم وحسن الخلق طريق عزّ الأمة.',
						mark: '1'
					}
				]
			},
			hints: [
				'الأطروحة هي الرأي الأساسي الذي يفتتح به الكاتب نصه ويدافع عنه.',
				'في النمط الحجاجي ابحث عن أدوات التوكيد (إنّ، لا شكّ، قد) والاستدراك (غير أنّ، بل) والحجج.',
				'القيمة الأخلاقية تُصاغ في جملة واضحة موجزة تعبّر عن الدرس المستفاد.'
			],
			solutionStepsAr: [
				`الأطروحة: ${variant.thesis}.`,
				`الحجة والدليل: ${variant.proof}.`,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				`النمط: ${variant.pattern} (${variant.patternProof}).`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي — بناء المضارع وأسلوب الشرط وصيغ المبالغة والصفة المشبهة (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticShartBinaMudari3amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t2_linguistic_shart_bina_mudari',
	grade: '3am',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: بناء المضارع والشرط وصيغ المبالغة والصفة المشبهة',
	curriculumLessonId: 'arb_lesson_3am_t2_shart_adawat',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'الشيخ مبارك بن محمد الميلي رحمه الله (بتصرّف)',
				passage:
					'إنّ الأمهاتِ [[يُنشِّئْنَ]] الأبطالَ على حبِّ الحقِّ، وواللهِ [[لَأَخْدُمَنَّ]] وطني بالعلمِ النافعِ؛ فـ[[مَنْ]] [[يَسْعَ]] إلى المعالي [[يَنَلْ]] شرفَ الدارينِ. والمصلحُ الحقيقيُّ صبورٌ مقدامٌ، كريمُ النفسِ، شجاعُ القلبِ.',
				irabRows: [
					{
						target: 'يُنشِّئْنَ',
						irab: 'فعل مضارع مبني على السكون لاتصاله بنون النسوة، ونون النسوة ضمير متصل مبني على الفتح في محل رفع فاعل.',
						mark: '0.5'
					},
					{
						target: 'لَأَخْدُمَنَّ',
						irab: 'اللام واقعة في جواب القسم؛ أخدمَنَّ: فعل مضارع مبني على الفتح لاتصاله بنون التوكيد الثقيلة، والنون حرف لا محل له من الإعراب.',
						mark: '0.5'
					},
					{
						target: 'يَسْعَ',
						irab: 'فعل مضارع فعل الشرط مجزوم بـ «مَنْ» وعلامة جزمه حذف حرف العلة (الألف)، والفاعل مستتر تقديره هو.',
						mark: '0.5'
					},
					{
						target: 'يَنَلْ',
						irab: 'فعل مضارع جواب الشرط مجزوم وعلامة جزمه السكون الظاهر (وحُذفت الألف منعاً لالتقاء الساكنين).',
						mark: '0.5'
					}
				],
				mubalagha: 'صبورٌ (فَعُول) ومقدامٌ (مِفْعَال)',
				sifa: 'كريمٌ (فَعِيل من كرُم اللازم) وشجاعٌ (فُعَال من شجُع اللازم)',
				shartExplain: 'الأداة: مَنْ (اسم شرط جازم للعاقل) — جملة الشرط: يسعَ إلى المعالي — جملة الجواب: ينلْ شرف الدارين',
				mcqPrompt: 'ما علامة بناء الفعل «يُنشِّئْنَ» وما علامة جزم الفعل «يَسْعَ» على الترتيب؟',
				mcqCorrect: 'السكون لاتصاله بنون النسوة، ثم حذف حرف العلة لأنه معتل الآخر',
				mcqWrong1: 'الفتح ثم السكون',
				mcqWrong2: 'حذف النون ثم الفتحة',
				mcqWrong3: 'السكون ثم السكون'
			},
			{
				author: 'الشيخ أحمد حماني رحمه الله (بتصرّف)',
				passage:
					'الفضلياتُ [[يَحْفَظْنَ]] الأمانةَ، ولا [[تَغْفُلَنَّ]] يا بنيَّ عن واجبِكَ؛ فـ[[إنْ]] [[تَتَّقِ]] اللهَ [[تَفُزْ]] برضاهُ. وإذا اجتهدَ التلميذُ الفَطِنُ الصدّاقُ صارَ حَسَنَ السيرةِ سهلَ المعشرِ.',
				irabRows: [
					{
						target: 'يَحْفَظْنَ',
						irab: 'فعل مضارع مبني على السكون لاتصاله بنون النسوة، والنون ضمير متصل في محل رفع فاعل.',
						mark: '0.5'
					},
					{
						target: 'تَغْفُلَنَّ',
						irab: 'فعل مضارع مبني على الفتح لاتصاله بنون التوكيد الثقيلة في محل جزم بـ «لا» الناهية، والنون حرف لا محل له من الإعراب.',
						mark: '0.5'
					},
					{
						target: 'تَتَّقِ',
						irab: 'فعل مضارع فعل الشرط مجزوم بـ «إنْ» وعلامة جزمه حذف حرف العلة (الياء).',
						mark: '0.5'
					},
					{
						target: 'تَفُزْ',
						irab: 'فعل مضارع جواب الشرط مجزوم وعلامة جزمه السكون الظاهر (وحُذفت الواو لالتقاء الساكنين).',
						mark: '0.5'
					}
				],
				mubalagha: 'الفَطِنُ (فَعِل) والصدّاقُ (فَعَّال)',
				sifa: 'حَسَنَ (فَعَل من حسُن) وسهلَ (فَعْل من سهُل)',
				shartExplain: 'شرط جازم: إنْ تتقِ اللهَ تفزْ برضاه — وشرط غير جازم: إذا اجتهدَ التلميذُ صارَ...',
				mcqPrompt: 'في جملة «لا تَغْفُلَنَّ عن واجبِكَ»، ما الإعراب الصحيح للفعل «تَغْفُلَنَّ»؟',
				mcqCorrect: 'فعل مضارع مبني على الفتح لاتصاله بنون التوكيد في محل جزم بـ لا الناهية',
				mcqWrong1: 'فعل مضارع مجزوم بالسكون الظاهر',
				mcqWrong2: 'فعل مضارع مبني على السكون في محل جزم',
				mcqWrong3: 'فعل أمر مبني على الفتح'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'راجع حالتي بناء المضارع (السكون مع نون النسوة والفتح مع نون التوكيد).' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'تثبّت من نوع النون المتصلة بالفعل وعلامة جزم المعتل الآخر.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'قارن بين الفعل الصحيح والمعتل الآخر، وبين المضارع والأمر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
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
				customTitle: 'الوضعية الثانية (البناء اللغوي)',
				points: 6,
				instruction: 'اقرأ الفقرة الآتية وأجب عن المطلوب بدقة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط في الفقرة إعراباً تاماً:',
						answer: '1) الإعراب النموذجي موضح في الجدول الآتي:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: '2) استخرج من الفقرة: (أ) صيغتي مبالغة مع بيان وزنهما، (ب) صفتين مشبهتين باسم الفاعل مع وزنهما.',
						answer: `2) (أ) صيغتا المبالغة: ${variant.mubalagha}. (ب) الصفتان المشبهتان: ${variant.sifa}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) حدّد أركان أسلوب الشرط الوارد في الفقرة وبيّن نوع أداته.',
						answer: `3) ${variant.shartExplain}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) اربط بين الجملتين بأداة شرط جازمة مع التغيير المناسب: «تُتقنُونَ أعمالَكُم — ترتقُونَ بوطنِكُم».',
						answer: '4) متى تُتقنُوا أعمالَكُم ترتقُوا بوطنِكُم (جُزم الفعلان بحذف النون لأنهما من الأفعال الخمسة).',
						mark: '1'
					}
				]
			},
			hints: [
				'نون النسوة ضمير فاعل وتبني المضارع على السكون، ونون التوكيد حرف وتبنيه على الفتح.',
				'الفعل الأجوف مثل «ينال / يفوز» يُجزم بالسكون وتُحذف عينه لالتقاء الساكنين.',
				'صيغ المبالغة خمسة أوزان (فعّال، مفعال، فعول، فعيل، فعِل) والصفة المشبهة من اللازم للثبوت.'
			],
			solutionStepsAr: [
				'إعراب المضارع المبني وفعل الشرط وجوابه.',
				`استخراج صيغ المبالغة (${variant.mubalagha}) والصفة المشبهة (${variant.sifa}).`,
				`تحديد أركان الشرط: ${variant.shartExplain}.`,
				'الربط الشرطي مع حذف النون للأفعال الخمسة.'
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي — أفعال المقاربة والرجاء والشروع والمحسنات البديعية (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticShuruBadi3amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t2_linguistic_shuru_badi',
	grade: '3am',
	trimesterId: 't2',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي: أفعال المقاربة والرجاء والشروع والجناس والمقابلة والسجع',
	curriculumLessonId: 'arb_lesson_3am_t2_afal_muqaraba_raja_shuru',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				passage:
					'[[شَرَعَ]] [[الشبابُ]] ((يُقبلُونَ على المطالعةِ))، و[[عسى]] [[العلمُ]] ((أن يرفعَ)) شأنَهُم، و[[أوشكَ]] الظلامُ أن ينقشعَ. ففي الجدِّ نماؤُنا، وفي الغفلةِ فناؤُنا؛ والعلمُ يُعزُّ الذليلَ، والجهلُ يُذلُّ العزيزَ.',
				irabRows: [
					{
						target: 'شَرَعَ',
						irab: 'فعل ماضٍ ناقص من أفعال الشروع مبني على الفتح.',
						mark: '0.5'
					},
					{
						target: 'الشبابُ',
						irab: 'اسم شرع مرفوع وعلامة رفعه الضمة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'جملة (يُقبلُونَ على المطالعةِ)',
						irab: 'جملة فعلية في محل نصب خبر شرع.',
						mark: '0.5'
					},
					{
						target: 'عسى',
						irab: 'فعل ماضٍ ناقص جامد من أفعال الرجاء مبني على الفتح المقدّر على الألف للتعذّر.',
						mark: '0.5'
					}
				],
				anRule: 'يمتنع اقتران خبر «شرعَ» بـ «أنْ» لأنه من أفعال الشروع، بينما يكثر اقتران خبر «عسى» و«أوشك» بـ «أنْ».',
				jinasSaja: '«نماؤنا / فناؤنا»: جناس ناقص وسجع نثري (محسن لفظي يحدث جرساً موسيقياً).',
				muqabala: '«العلمُ يُعزُّ الذليلَ» و«الجهلُ يُذلُّ العزيزَ»: مقابلة (محسن معنوي يوضح المعنى ويقوّيه بالتضاد).',
				mcqPrompt: 'ما المحل الإعرابي لجملة «يُقبلُونَ على المطالعةِ» بعد فعل الشروع «شَرَعَ»؟',
				mcqCorrect: 'جملة فعلية في محل نصب خبر شرع',
				mcqWrong1: 'جملة فعلية في محل رفع خبر شرع',
				mcqWrong2: 'جملة فعلية في محل نصب حال',
				mcqWrong3: 'جملة فعلية لا محل لها من الإعراب'
			},
			{
				author: 'الإمام عبد الحميد بن باديس رحمه الله (بتصرّف)',
				passage:
					'[[أَخَذَ]] [[العلماءُ]] ((ينشرُونَ الوعيَ)) بين الناسِ، و[[كادَ]] [[الجهلُ]] ((يتبدّدُ)) من الربوعِ؛ فالعالِمُ يبني العالَمَ بفكرِهِ، والصدقُ يفتحُ أبوابَ الرضا، والكذبُ يُغلقُ أبوابَ الهنا.',
				irabRows: [
					{
						target: 'أَخَذَ',
						irab: 'فعل ماضٍ ناقص من أفعال الشروع مبني على الفتح.',
						mark: '0.5'
					},
					{
						target: 'العلماءُ',
						irab: 'اسم أخذ مرفوع وعلامة رفعه الضمة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'جملة (ينشرُونَ الوعيَ)',
						irab: 'جملة فعلية في محل نصب خبر أخذ.',
						mark: '0.5'
					},
					{
						target: 'كادَ',
						irab: 'فعل ماضٍ ناقص من أفعال المقاربة مبني على الفتح (وجملة «يتبدّدُ» في محل نصب خبره).',
						mark: '0.5'
					}
				],
				anRule: 'يمتنع اقتران خبر «أخذَ» بـ «أنْ» لأنه فعل شروع، ويقلّ اقتران خبر «كادَ» بـ «أنْ».',
				jinasSaja: '«العالِم / العالَم»: جناس ناقص (اختلاف حركة اللام)، و«الرضا / الهنا»: سجع يعطي إيقاعاً موسيقياً.',
				muqabala: '«الصدقُ يفتحُ أبوابَ الرضا» و«الكذبُ يُغلقُ أبوابَ الهنا»: مقابلة تؤكّد قيمة الصدق وقبح الكذب.',
				mcqPrompt: 'ما نوع المحسن البديعي بين كلمتي «العالِم» و«العالَم»؟',
				mcqCorrect: 'جناس ناقص لاختلافهما في حركة اللام',
				mcqWrong1: 'جناس تام',
				mcqWrong2: 'طباق إيجاب',
				mcqWrong3: 'مقابلة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تذكّر: أفعال الشروع والمقاربة تعمل عمل «كان»، والجناس التام يتفق في الشكل أيضاً.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'تحقق من المحل الإعرابي لخبر كاد وأخواتها ومن نوع المحسن البديعي.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'راجع القواعد النحوية والبلاغية للفصل الثاني.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
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
				customTitle: 'الوضعية الثانية (البناء اللغوي والبلاغي)',
				points: 6,
				instruction: 'تأمّل الفقرة الآتية ثم أجب عن الأسئلة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط وما بين قوسين في الفقرة:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: '2) بيّن حكم اقتران خبر الأفعال الناسخة الواردة في الفقرة بـ «أنْ» مع التعليل.',
						answer: `2) ${variant.anRule}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) استخرج من الفقرة محسّناً لفظياً (جناساً أو سجعاً) ومحسّناً معنوياً (مقابلة)، مبيّناً أثر كل منهما.',
						answer: `3) المحسن اللفظي: ${variant.jinasSaja}\nالمحسن المعنوي: ${variant.muqabala}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '4) ميّز بين «أخذَ» التامة و«أخذَ» الناقصة في جملتين من إنشائك.',
						answer: '4) تامة: أخذَ التلميذُ قلمَهُ (فعل وفاعل ومفعول به). ناقصة (شروع): أخذَ التلميذُ يكتبُ درسَهُ (اسمها التلميذ، وخبرها جملة يكتب).',
						mark: '1'
					}
				]
			},
			hints: [
				'خبر كاد وأخواتها يكون دائماً جملة فعلية فعلها مضارع في محل نصب.',
				'أفعال الشروع يمتنع اقتران خبرها بـ «أنْ» وجوباً.',
				'المحسن اللفظي (الجناس والسجع) يولّد موسيقى، والمحسن المعنوي (المقابلة والطباق) يقوّي المعنى.'
			],
			solutionStepsAr: [
				'إعراب فعل الشروع واسمه وجملة خبره.',
				variant.anRule,
				variant.jinasSaja,
				variant.muqabala
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية — نص حجاجي حول أثر العلم والأخلاق في نهضة الشعوب (8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHijajiScience3amT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t2_integration_hijaji_science',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: إنتاج نص حجاجي حول العلم والأخلاق وعظماء الأمة',
	curriculumLessonId: 'arb_lesson_3am_t2_jinas_muqabala_saja_hijaji',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				context:
					'دار نقاش بين زملائك في القسم: يرى بعضهم أن المال وحده كافٍ لنهضة الشعوب، بينما ترى أنت أن العلم النافع المقترن بالأخلاق والقدوة الصالحة هو الأساس الحقيقي للحضارة.',
				quote: 'قال الإمام الشافعي رحمه الله: «تعلّمْ فليسَ المرءُ يُولَدُ عالماً ... وليسَ أخو علمٍ كمنْ هو جاهلُ».',
				instruction:
					'اكتب نصاً حجاجياً لا يقلّ عن اثني عشر سطراً تدافع فيه عن رأيك بالحجج والبراهين والشواهد، موظّفاً: أسلوب شرط جازماً، وفعل شروع، ومقابلةً، وصيغة مبالغة.',
				modelOutline:
					'المقدمة: عرض القضية الخلافية وإعلان الأطروحة (العلم والأخلاق أساس النهضة). العرض (الحجاج): تفنيد الرأي القائل بكفاية المال وحده، ثم تقديم ثلاث حجج (الأثر العقلي للعلم، شواهد من تاريخ العلماء الجزائريين كابن باديس والبشير الإبراهيمي، وارتباط التقدم بالأخلاق) باستخدام أدوات التوكيد والربط المنطقي (إنّ، بل، غير أنّ، بناءً على ذلك). الخاتمة: تأكيد الموقف ودعوة الشباب للجدّ. أمثلة التوظيف: «مَنْ يطلبْ علماً نافعاً يرتقِ» (شرط جازم)، «شرعَ الشبابُ يُقبلونَ على المعرفة» (شروع)، «العلم يبني الأمم والجهل يهدمها» (مقابلة)، «صبورٌ / مقدامٌ» (صيغة مبالغة).',
				mcqCorrect: 'طرح أطروحة واضحة وتدعيمها بحجج وشواهد وروابط حجاجية مع توظيف الموارد المطلوبة'
			},
			{
				context:
					'لاحظتَ انصراف بعض الشباب عن القراءة والاقتداء بعظماء الأمة وعلمائها نحو متابعة المحتوى التافه، فقرّرتَ كتابة مقال حجاجي تُقنع فيه زملاءك بضرورة القراءة والاقتداء بالعلماء والمصلحين.',
				quote: 'قال العلامة البشير الإبراهيمي رحمه الله: «إنّ الشبابَ عمادُ الأمةِ ومصدرُ نهضتِها إذا تسلّحَ بالعلمِ والإيمانِ».',
				instruction:
					'حرّر نصاً حجاجياً من 12 إلى 14 سطراً تقنع فيه زملاءك بأهمية المطالعة والاقتداء بعظماء الأمة، موظّفاً: مضارعاً مبنياً على الفتح، وفعل رجاء، وجناساً ناقصاً، وأداة شرط غير جازمة.',
				modelOutline:
					'المقدمة: طرح ظاهرة عزوف بعض الشباب عن القراءة وإعلان موقف الكاتب. العرض: تقديم حجج عقلية وواقعية (القراءة توسّع المدارك، سير العظماء كالإمام البخاري والإمام الشافعي وابن باديس تشحذ الهمم، التفاهة تهدر الأعمار). الخاتمة: استنتاج جامع ودعوة صادقة. أمثلة التوظيف: «واللهِ لأقرأنَّ كلَّ يومٍ» (مضارع مبني على الفتح)، «عسى الجيلُ أن يعودَ إلى الكتابِ» (رجاء)، «العالِم والعالَم» (جناس ناقص)، «إذا قرأَ الشابُّ ارتقى فكرُهُ» (شرط غير جازم).',
				mcqCorrect: 'الدفاع عن قيمة القراءة والاقتداء بالعلماء بحجج مقنعة وتوظيف سليم للموارد المطلوبة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			topic.mcqCorrect,
			[
				{
					text: 'الاكتفاء بذكر رأيك في سطرين دون حجج ولا أدوات توكيد',
					diagnosticFeedback: 'النمط الحجاجي يقوم على الإقناع بالحجج والبراهين والشواهد.'
				},
				{
					text: 'وصف مكتبة الحي فقط بأسلوب وصفي دون حجاج',
					diagnosticFeedback: 'النمط المطلوب هو الحجاجي وليس الوصفي.'
				},
				{
					text: 'إغفال الشواهد وتجاهل الموارد النحوية والبلاغية المطلوبة في التعليمة',
					diagnosticFeedback: 'عدم توظيف المطلوب ينقص من علامة الملاءمة واللغة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما المقوّم الأساسي لنجاح الوضعية الإدماجية الحجاجية المطلوبة؟',
				questionTextAr: 'كيف تضمن التميّز في هذه الوضعية الحجاجية؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: topic.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: 'حرّر الوضعية الإدماجية الآتية ملتزماً بالنمط الحجاجي وشروط التعليمة:',
				content: [
					buildWrittenProductionBlock({
						context: topic.context,
						supportQuote: topic.quote,
						instruction: topic.instruction,
						rubricCriteria: [
							'الملاءمة (النمط الحجاجي، حجم النص، توظيف الموارد الأربع: 2.5 ن)',
							'الانسجام (تسلسل الحجج، الروابط الحجاجية، التصميم الثلاثي: 2 ن)',
							'سلامة اللغة (ضبط الإعراب، الصرف، الإملاء: 2.5 ن)',
							'الإتقان (الشاهد المناسب، علامات الوقف، وضوح الخط: 1 ن)'
						],
						modelOutline: topic.modelOutline,
						mark: '8'
					})
				]
			},
			hints: [
				'ابدأ بعرض الرأي المخالف ثم دحضه، أو أعلن موقفك مباشرةً وادعمه بثلاث حجج قوية.',
				'استعن بروابط الحجاج: لا شكّ أنّ، بل، غير أنّ، والدليل على ذلك، ومن هنا نستنتج أنّ.',
				'تأكّد من ضبط فعل الشرط وجوابه بالجزم ومن عدم إدخال «أنْ» على خبر فعل الشروع.'
			],
			solutionStepsAr: [
				'تحديد الأطروحة والحجج والشاهد المناسب.',
				'صياغة مقدمة وعرض حجاجي وخاتمة مقنعة.',
				'مراجعة توظيف الموارد النحوية والبلاغية وسلامة اللغة.'
			],
			finalAnswer: topic.mcqCorrect
		};
	}
};

export const TEMPLATES_3AM_T2: ArabicParameterizedTemplate[] = [
	intellectualScholarsHeroism3amT2,
	linguisticShartBinaMudari3amT2,
	linguisticShuruBadi3amT2,
	integrationHijajiScience3amT2
];
