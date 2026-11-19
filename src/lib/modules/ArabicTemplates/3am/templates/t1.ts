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
// 1. البناء الفكري — التضامن الاجتماعي ومكافحة الآفات (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualSocialValues3amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t1_intellectual_social_values',
	grade: '3am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: التضامن الاجتماعي ومكافحة الآفات في نص نثري',
	curriculumLessonId: 'arb_lesson_3am_t1_istiara_namat_tafsiri',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'أخوّةُ التضامنِ وحصنُ المجتمع',
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				source: 'آثار الإمام الإبراهيمي',
				paragraphs: [
					'إنّ المجتمعَ المسلمَ كالبنيانِ المرصوصِ لا يستقيمُ أمرُهُ ولا يشتدُّ عودُهُ إلا حين يتعاونُ أبناؤُهُ على البرّ والتقوى، ويمدُّ القويُّ فيه يدَهُ إلى الضعيفِ، لأنّ الأنانيةَ واللامبالاةَ آفتانِ تفتكانِ بتماسكِ الأمةِ وتفتحانِ البابَ أمام الآفاتِ الاجتماعيةِ.',
					'ومن أسبابِ انتشارِ الآفاتِ بين الناشئةِ غفلةُ الأسرةِ وضعفُ التوجيهِ الأخلاقيِّ؛ ولذلك أوجبَ الإسلامُ التكافلَ والتناصحَ، فـما كان المجتمعُ الواعي ليتركَ شبابَهُ فريسةً للانحرافِ، بل يسارعُ إلى احتضانِهِم بالعلمِ النافعِ والعملِ التطوّعيِّ المثمرِ.'
				],
				vocab: [
					{ word: 'المرصوص', meaning: 'المتماسك الشديد الاتصال' },
					{ word: 'تفتكان', meaning: 'تُهلكان وتُضعفان بشدة' }
				],
				generalIdea: 'بيان أهمية التضامن الاجتماعي والتكافل في حماية الشباب وبناء مجتمع متماسك خالٍ من الآفات',
				causes: 'غفلة الأسرة وضعف التوجيه الأخلاقي وانتشار الأنانية واللامبالاة',
				remedy: 'التكافل والتناصح واحتضان الشباب بالعلم النافع والعمل التطوعي المثمر',
				synWord: 'تفتكان',
				synMeaning: 'تُهلكان وتُدمّران',
				antWord: 'الأنانية',
				antMeaning: 'الإيثار والتضامن',
				value: 'التضامن والتكافل الاجتماعي واجب ديني ووطني يحفظ الأمة من الآفات',
				pattern: 'النمط التفسيري',
				patternProof: 'الشرح والتعليل بروابط مثل «لأنّ» و«ولذلك» وبيان الأسباب والنتائج بموضوعية'
			},
			{
				title: 'الإصلاحُ الاجتماعيُّ مسؤوليةُ الجميع',
				author: 'الشيخ مبارك بن محمد الميلي رحمه الله (بتصرّف)',
				source: 'من مقالات الإصلاح الاجتماعي',
				paragraphs: [
					'لا يرتقي وطنٌ ينهشُهُ الفسادُ الخلقيُّ أو تعصفُ بشبابِهِ آفاتُ الفراغِ والبطالةِ، لأنّ نهضةَ الشعوبِ تبدأُ من صلاحِ الفردِ وسلامةِ سلوكِهِ؛ ومن ثمّ فإنّ التعاونَ على الخيرِ والتكافلَ بين الجيرانِ يُعدّانِ صمّامَ الأمانِ الذي يحفظُ كرامةَ الأسرِ.',
					'فيا أيّها الشبابُ، هيهاتَ أن تبنوا مجداً بالتواكلِ، بل ابذلُوا الجهدَ في طلبِ العلمِ وإتقانِ الحِرَفِ، وتضامنُوا مع المحتاجينَ حتى يعيشَ المجتمعُ في أمنٍ واستقرارٍ.'
				],
				vocab: [
					{ word: 'ينهشُهُ', meaning: 'يفترسُهُ ويضعفُ قوّتَهُ' },
					{ word: 'التواكل', meaning: 'الاتكال على الغير مع ترك العمل' }
				],
				generalIdea: 'دور الإصلاح الأخلاقي والتكافل والعمل الجاد في وقاية الشباب من الآفات ونهضة الوطن',
				causes: 'الفراغ والبطالة والفساد الخلقي والتواكل',
				remedy: 'طلب العلم وإتقان الحرف والتعاون على الخير والتكافل بين الجيران',
				synWord: 'ينهشُهُ',
				synMeaning: 'يفتكُ به ويضعفُهُ',
				antWord: 'التواكل',
				antMeaning: 'الاجتهاد والاعتماد على النفس',
				value: 'العمل الصالح والتضامن الاجتماعي يحفظان كرامة الفرد واستقرار الوطن',
				pattern: 'النمط التفسيري (مع توجيه في الخاتمة)',
				patternProof: 'توظيف التعليل والنتيجة («لأنّ»، «ومن ثمّ») وتقديم الحقائق بلغة واضحة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'وصف جمال الطبيعة في الأرياف الجزائرية خلال فصل الربيع',
					diagnosticFeedback: 'النص يعالج قضية اجتماعية أخلاقية (التضامن والآفات) لا وصفاً للطبيعة.'
				},
				{
					text: 'سرد قصة رحلة بحرية تاريخية في البحر الأبيض المتوسط',
					diagnosticFeedback: 'النص مقالي تفسيري لا قصة رحلة.'
				},
				{
					text: 'الدعوة إلى الهجرة وترك العمل في الوطن',
					diagnosticFeedback: 'النص يدعو بالعكس إلى بناء الوطن والتكافل والاجتهاد فيه.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقرأ نص «${variant.title}» للكاتب ${variant.author}، ثم اختر الفكرة العامة الأدقّ للنص:`,
				questionTextAr: `ما الفكرة العامة الأنسب لنص «${variant.title}»؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يدور النص حول: ${variant.generalIdea}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الأولى (البناء الفكري)',
				points: 6,
				instruction: 'اقرأ السند الآتي قراءة متمعّنة ثم أجب عن الأسئلة بدقة:',
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
						content: '2) اذكر من السند أسباب انتشار الآفات الاجتماعية، ثم بيّن سُبُل الوقاية منها.',
						answer: `2) الأسباب: ${variant.causes}. سبل الوقاية والعلاج: ${variant.remedy}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) هاتِ من السند أو من رصيدك مرادف كلمة «${variant.synWord}»، وضدّ كلمة «${variant.antWord}».`,
						answer: `3) مرادف «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) حدّد النمط الغالب على السند مع ذكر مؤشرين له من النص.',
						answer: `4) النمط الغالب: ${variant.pattern}. مؤشراته: ${variant.patternProof}، وغلبة الأفعال المضارعة والأسلوب الخبري.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استخلص قيمةً تربويةً اجتماعيةً يدعو إليها الكاتب.',
						answer: `5) القيمة التربوية: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الفكرة العامة بجمع موضوع الفقرتين في جملة اسمية شاملة وموجزة.',
				'عد إلى الفقرة الثانية لاستخراج أسباب الآفات والحلول التي اقترحها الكاتب.',
				'لاحظ الروابط مثل «لأنّ» و«ولذلك» فهي مؤشرات واضحة للنمط التفسيري.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				`الأسباب: ${variant.causes}؛ العلاج: ${variant.remedy}.`,
				`المرادف: ${variant.synMeaning}؛ الضد: ${variant.antMeaning}.`,
				`النمط: ${variant.pattern} (${variant.patternProof}).`,
				`القيمة التربوية: ${variant.value}.`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي — بناء الماضي والأمر واسم الفاعل واسم الفعل الماضي (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticBinaIsmFail3amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t1_linguistic_bina_ism_fail',
	grade: '3am',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: بناء الماضي والأمر واسم الفاعل واسم الفعل الماضي',
	curriculumLessonId: 'arb_lesson_3am_t1_bina_madi_amr',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'الإمام عبد الحميد بن باديس رحمه الله (بتصرّف)',
				passage:
					'لقد [[ساهَمُوا]] في إحياءِ مدارسِ العلمِ، و[[حفِظْنَا]] عهدَهُم، فالمسلمُ الصادقُ [[صانِعٌ]] [[معروفاً]] لأمتهِ؛ فيا شابُّ [[اِسْعَ]] في الخيرِ، و[[هيهاتَ]] [[الكسلُ]] في طريقِ المجدِ.',
				irabRows: [
					{
						target: 'ساهَمُوا',
						irab: 'فعل ماضٍ مبني على الضم لاتصاله بواو الجماعة، والواو ضمير متصل مبني في محل رفع فاعل.',
						mark: '0.5'
					},
					{
						target: 'اِسْعَ',
						irab: 'فعل أمر مبني على حذف حرف العلة (الألف)، والفاعل ضمير مستتر وجوباً تقديره أنت.',
						mark: '0.5'
					},
					{
						target: 'معروفاً',
						irab: 'مفعول به لاسم الفاعل «صانعٌ» منصوب وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'هيهاتَ',
						irab: 'اسم فعل ماضٍ مبني على الفتح بمعنى بَعُدَ، لا محل له من الإعراب (و«الكسلُ» فاعله مرفوع).',
						mark: '0.5'
					}
				],
				pastSukunWord: 'حفِظْنَا',
				ismFailTarget: 'صانِعٌ (من الثلاثي صنع)، ومُتْقِنٌ من أتقن',
				deriveVerb: 'أَتْقَنَ',
				deriveAnswer: 'مُتْقِنٌ',
				amrPlural: 'اِسْعَوْا (مبني على حذف النون)',
				mcqPrompt: 'ما الإعراب الصحيح لفعل الأمر «اِسْعَ» في النص؟',
				mcqCorrect: 'فعل أمر مبني على حذف حرف العلة والفاعل ضمير مستتر تقديره أنت',
				mcqWrong1: 'فعل أمر مبني على الفتح الظاهر',
				mcqWrong2: 'فعل أمر مجزوم بحذف الألف',
				mcqWrong3: 'فعل ماضٍ مبني على الفتح المقدّر'
			},
			{
				author: 'الشيخ العربي التبسي رحمه الله (بتصرّف)',
				passage:
					'[[اجتهَدْنَا]] في تعليمِ النشءِ، و[[تعاوَنُوا]] على البرِّ؛ إنّ المؤمنَ [[الشاكرُ]] [[ربَّهُ]] فائزٌ، فيا بنيَّ [[اُدْعُ]] إلى الفضيلةِ، و[[شتانَ]] [[العالِمُ]] والجاهلُ.',
				irabRows: [
					{
						target: 'اجتهَدْنَا',
						irab: 'فعل ماضٍ مبني على السكون لاتصاله بـ «نا» الفاعلين، و«نا» ضمير متصل في محل رفع فاعل.',
						mark: '0.5'
					},
					{
						target: 'اُدْعُ',
						irab: 'فعل أمر مبني على حذف حرف العلة (الواو)، والفاعل ضمير مستتر وجوباً تقديره أنت.',
						mark: '0.5'
					},
					{
						target: 'ربَّهُ',
						irab: 'مفعول به لاسم الفاعل «الشاكرُ» منصوب بالفتحة وهو مضاف، والهاء مضاف إليه.',
						mark: '0.5'
					},
					{
						target: 'شتانَ',
						irab: 'اسم فعل ماضٍ مبني على الفتح بمعنى افترق، لا محل له من الإعراب (و«العالِمُ» فاعله مرفوع).',
						mark: '0.5'
					}
				],
				pastSukunWord: 'اجتهَدْنَا',
				ismFailTarget: 'الشاكرُ (من الثلاثي شكر، مقترن بأل فعمل بلا شرط)',
				deriveVerb: 'اِسْتَقَامَ',
				deriveAnswer: 'مُسْتَقِيمٌ',
				amrPlural: 'اُدْعُوا (مبني على حذف النون)',
				mcqPrompt: 'ما الإعراب الصحيح لكلمة «ربَّهُ» بعد «الشاكرُ» في النص؟',
				mcqCorrect: 'مفعول به لاسم الفاعل «الشاكرُ» منصوب بالفتحة وهو مضاف والهاء مضاف إليه',
				mcqWrong1: 'مضاف إليه مجرور وعلامة جره الكسرة',
				mcqWrong2: 'فاعل لاسم الفاعل مرفوع بالضمة',
				mcqWrong3: 'خبر إنّ منصوب بالفتحة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تثبّت من القاعدة النحوية لعمل اسم الفاعل وبناء فعل الأمر المعتل الآخر.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'انتبه: فعل الأمر مبني دائماً لا مجزوم، واسم الفاعل المقترن بأل ينصب مفعولاً به.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'ميّز بين الفعل الماضي والأمر، وبين المفعول به والخبر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
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
				instruction: 'اقرأ الفقرة الآتية ثم أجب عن أسئلة القواعد والصرف:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط في الفقرة إعراباً تاماً (أكمل الجدول):',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) استخرج من الفقرة: (أ) فعلاً ماضياً مبنياً على السكون مع التعليل، (ب) اسم فاعل عاملاً مع تحديد معموله.`,
						answer: `2) (أ) الفعل الماضي المبني على السكون: «${variant.pastSukunWord}» لاتصاله بـ «نا» الفاعلين. (ب) اسم الفاعل: ${variant.ismFailTarget}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) صُغْ اسم الفاعل من الفعل غير الثلاثي «${variant.deriveVerb}» ووظّفه في جملة مفيدة عاملاً.`,
						answer: `3) اسم الفاعل من «${variant.deriveVerb}»: «${variant.deriveAnswer}». مثال: المسلمُ ${variant.deriveAnswer}ٌ في سلوكِهِ.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '4) خاطب بجملة فعل الأمر المسطّر جماعةَ الذكور وبيّن علامة بنائه الجديدة.',
						answer: `4) عند خطاب جماعة الذكور: «${variant.amrPlural}».`,
						mark: '1'
					}
				]
			},
			hints: [
				'الماضي يُبنى على الضم مع واو الجماعة، والسكون مع تاء الفاعل ونا الفاعلين ونون النسوة.',
				'الأمر المعتل الآخر يُبنى على حذف حرف العلة، ومع واو الجماعة يُبنى على حذف النون.',
				'اسم الفاعل من غير الثلاثي يُصاغ بإبدال حرف المضارعة ميماً مضمومة وكسر ما قبل الآخر.'
			],
			solutionStepsAr: [
				'إعراب الفعل الماضي والأمر والمفعول به لاسم الفاعل واسم الفعل الماضي.',
				`استخراج الماضي المبني على السكون (${variant.pastSukunWord}) واسم الفاعل العامل.`,
				`صياغة اسم الفاعل من ${variant.deriveVerb}: ${variant.deriveAnswer}.`,
				`تحويل الأمر إلى الجمع: ${variant.amrPlural}.`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي — نصب المضارع بأن المضمرة والاستعارة (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticNasbIstiara3amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t1_linguistic_nasb_istiara',
	grade: '3am',
	trimesterId: 't1',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي: نصب المضارع بأن المضمرة والاستعارة المكنية والتصريحية',
	curriculumLessonId: 'arb_lesson_3am_t1_nasb_mudari_an_mudmara',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'الشيخ الطيب العقبي رحمه الله (بتصرّف)',
				passage:
					'ما كانَ طالبُ العلمِ [[ليُضَيِّعَ]] شبابَهُ في الغفلةِ، بل يسعى [[ليَبْنِيَ]] مستقبلاً مشرقاً؛ فيا أبنائي ثابرُوا حتى [[تبلغُوا]] القمةَ، ولا تتكاسلُوا [[فتندمُوا]]. ألا ترونَ كيف يبتسمُ المستقبلُ للمجتهدينَ ويُبدّدُ النورُ عتمةَ القلوبِ؟',
				irabRows: [
					{
						target: 'ليُضَيِّعَ',
						irab: 'اللام لام الجحود؛ يُضَيِّعَ: فعل مضارع منصوب بأن المضمرة وجوباً بعد لام الجحود وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'ليَبْنِيَ',
						irab: 'اللام لام التعليل؛ يَبْنِيَ: فعل مضارع منصوب بأن المضمرة جوازاً بعد لام التعليل وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'تبلغُوا',
						irab: 'فعل مضارع منصوب بأن المضمرة وجوباً بعد «حتى» وعلامة نصبه حذف النون لأنه من الأفعال الخمسة، والواو فاعل.',
						mark: '0.5'
					},
					{
						target: 'فتندمُوا',
						irab: 'الفاء فاء السببية؛ تندمُوا: مضارع منصوب بأن المضمرة وجوباً بعد فاء السببية وعلامة نصبه حذف النون، والواو فاعل.',
						mark: '0.5'
					}
				],
				istiaraMakniya: 'يبتسمُ المستقبلُ',
				istiaraMakniyaExplain: 'استعارة مكنية؛ شبّه المستقبل بإنسان فحذف المشبّه به (الإنسان) وترك قرينة دالة عليه هي «يبتسمُ»، وأثرها التشخيص وتقوية المعنى وبثّ التفاؤل.',
				istiaraTasrihiya: 'النورُ (والمقصود به العلمُ)',
				istiaraTasrihiyaExplain: 'استعارة تصريحية؛ شبّه العلم بالنور فحذف المشبّه (العلم) وصرّح بالمشبّه به (النور) لبيان أثر العلم في الهداية.',
				mcqPrompt: 'في عبارة «ما كانَ طالبُ العلمِ ليُضَيِّعَ شبابَهُ»، ما سبب إضمار «أنْ» وجوباً؟',
				mcqCorrect: 'لأن اللام هي لام الجحود المسبوقة بكون منفي «ما كانَ»',
				mcqWrong1: 'لأن اللام هي لام التعليل ويجوز إظهار «أنْ»',
				mcqWrong2: 'لأنها فاء السببية المسبوقة بطلب',
				mcqWrong3: 'لأنها لام الأمر الجازمة'
			},
			{
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				passage:
					'لم يكنِ المصلحُ [[ليَسْكُتَ]] عن الباطلِ، وإنّما يكتبُ [[ليُوقِظَ]] الضمائرَ النائمةَ، ويجتهدُ حتى [[يَسْمُوَ]] شأنُ أمتِهِ؛ فاقرأُوا الكتبَ [[فتستنيرَ]] عقولُكم، فقد أشرقَتِ الشموسُ في مجالسِ العلماءِ.',
				irabRows: [
					{
						target: 'ليَسْكُتَ',
						irab: 'اللام لام الجحود؛ يسكتَ: مضارع منصوب بأن المضمرة وجوباً بعد لام الجحود وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'ليُوقِظَ',
						irab: 'اللام لام التعليل؛ يوقظَ: مضارع منصوب بأن المضمرة جوازاً بعد لام التعليل وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'يَسْمُوَ',
						irab: 'فعل مضارع منصوب بأن المضمرة وجوباً بعد «حتى» وعلامة نصبه الفتحة الظاهرة على الواو لخفتها.',
						mark: '0.5'
					},
					{
						target: 'فتستنيرَ',
						irab: 'الفاء فاء السببية؛ تستنيرَ: مضارع منصوب بأن المضمرة وجوباً بعد فاء السببية وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					}
				],
				istiaraMakniya: 'يُوقِظَ الضمائرَ النائمةَ',
				istiaraMakniyaExplain: 'استعارة مكنية؛ شبّه الضمائر بأشخاص نائمين فحذف المشبّه به وترك قرينتي «يوقظ» و«النائمة»، وأثرها التشخيص وإبراز أثر الكلمة الصادقة.',
				istiaraTasrihiya: 'الشموسُ (والمقصود بها العلماءُ أو العلومُ)',
				istiaraTasrihiyaExplain: 'استعارة تصريحية؛ شبّه العلماء بالشموس فحذف المشبّه وصرّح بالمشبّه به (الشموس) لتعظيم مكانتهم.',
				mcqPrompt: 'في عبارة «يُوقِظَ الضمائرَ النائمةَ»، ما نوع الصورة البيانية؟',
				mcqCorrect: 'استعارة مكنية (شبّه الضمائر بإنسان نائم وحذف المشبّه به)',
				mcqWrong1: 'استعارة تصريحية',
				mcqWrong2: 'تشبيه بليغ',
				mcqWrong3: 'جناس تام'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تذكّر الفرق بين لام الجحود ولام التعليل، وبين المكنية والتصريحية.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'راجع شروط إضمار «أنْ» وأركان الاستعارة.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'تحقق من الأداة السياقية ومن الطرف المحذوف في الصورة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
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
				customTitle: 'الوضعية الثانية (البناء اللغوي والتذوق)',
				points: 6,
				instruction: 'تأمّل الفقرة الآتية ثم أجب عن الأسئلة بدقة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب الأفعال المسطّرة في الفقرة إعراباً نموذجياً:',
						answer: '1) الإعراب النموذجي للأفعال المنصوبة بأن المضمرة في الجدول الآتي:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) اشرح الصورة البيانية في عبارة «${variant.istiaraMakniya}»، وسمّ نوعها وبيّن أثرها في المعنى.`,
						answer: `2) ${variant.istiaraMakniyaExplain}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) بيّن نوع الاستعارة في لفظة «${variant.istiaraTasrihiya}» مع التعليل.`,
						answer: `3) ${variant.istiaraTasrihiyaExplain}`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) فرّق في مثالين من إنشائك بين لام التعليل ولام الجحود.',
						answer: '4) لام التعليل (جوازاً): أراجعُ دروسي لأتفوّقَ. لام الجحود (وجوباً بعد كون منفي): ما كان المؤمنُ ليكذبَ.',
						mark: '1'
					}
				]
			},
			hints: [
				'لام الجحود تُسبق بـ «ما كان» أو «لم يكن» ويكون إضمار «أنْ» بعدها واجباً.',
				'في الاستعارة المكنية يُحذف المشبّه به وتبقى قرينة، وفي التصريحية يُصرّح بالمشبّه به.',
				'الأفعال الخمسة تُنصب بحذف النون، والمعتل بالواو والياء تظهر عليه الفتحة.'
			],
			solutionStepsAr: [
				'إعراب المضارع المنصوب بأن المضمرة جوازاً (لام التعليل) ووجوباً (لام الجحود، حتى، فاء السببية).',
				variant.istiaraMakniyaExplain,
				variant.istiaraTasrihiyaExplain,
				'التمييز التطبيقي بين لام التعليل ولام الجحود.'
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية — إنتاج نص تفسيري حول التضامن والوقاية من الآفات (8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTafsiriSolidarity3amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t1_integration_tafsiri_solidarity',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: إنتاج نص تفسيري حول التضامن والوقاية من الآفات الاجتماعية',
	curriculumLessonId: 'arb_lesson_3am_t1_istiara_namat_tafsiri',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				context:
					'لاحظتَ في حيّك انتشار بعض السلوكيات السلبية بين المراهقين كالتدخين وإضاعة الوقت في الشوارع، فأردتَ المشاركة في حملة توعوية مدرسية تشرح فيها أسباب هذه الآفات ودور التضامن في القضاء عليها.',
				quote: 'قال الله تعالى: ﴿وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ﴾.',
				instruction:
					'اكتب نصاً تفسيرياً لا يقلّ عن اثني عشر سطراً تشرح فيه أسباب انتشار الآفات الاجتماعية وأضرارها، وتبيّن سبل الوقاية منها بالتضامن والعلم، موظّفاً: فعل أمر مبنياً على حذف حرف العلة، واسم فاعل عاملاً، ومضارعاً منصوباً بأن المضمرة، واستعارةً مكنيةً.',
				modelOutline:
					'المقدمة: التعريف بالآفات الاجتماعية كخطر يهدد الشباب وتماسك المجتمع. العرض (التفسير): شرح أسبابها (رفقة السوء، الفراغ، غياب الرقابة الأسرية) بروابط التعليل (لأنّ، لذلك، ومن أسباب ذلك) وبيان أضرارها الصحية والأخلاقية، ثم إبراز دور التضامن والمسجد والمدرسة في احتضان الشباب. الخاتمة: دعوة إلى التعاون والالتزام بالقيم الإسلامية. أمثلة للتوظيف: «اِسْعَ إلى الخير» (أمر بحذف العلة)، «المسلمُ نافعٌ مجتمعَهُ» (اسم فاعل عامل)، «ما كان العاقلُ ليُهلكَ نفسَهُ» (مضارع بأن المضمرة)، «الآفات تنهشُ شبابَ الأمة» (استعارة مكنية).',
				mcqCorrect: 'شرح أسباب الآفات وأضرارها بموضوعية وتوظيف روابط التعليل مع دمج القواعد المطلوبة'
			},
			{
				context:
					'شاركتَ مع زملائك في تأسيس نادي التضامن المدرسي لمساعدة التلاميذ المعوزين ونشر روح الإخاء، فطلب منك الأستاذ كتابة مقال لمجلة المتوسطة تفسّر فيه قيمة التضامن وآثاره الإيجابية على المجتمع.',
				quote: 'قال النبي صلى الله عليه وسلم: «المؤمنُ للمؤمنِ كالبنيانِ يشدُّ بعضُهُ بعضاً».',
				instruction:
					'حرّر نصاً تفسيرياً من 12 إلى 14 سطراً توضّح فيه مفهوم التضامن الاجتماعي وصوره وآثاره في تقوية الروابط، موظّفاً: فعلاً ماضياً مبنياً على الضم، واسم فعل ماضياً، ومضارعاً منصوباً بعد لام التعليل، واستعارةً مكنيةً.',
				modelOutline:
					'المقدمة: بيان أن التضامن خلق إسلامي أصيل يجمع القلوب. العرض (التفسير): تعريف التضامن وذكر صوره (التكافل المادي، مساعدة الطلبة، التطوع في الحي) وتوضيح آثاره (زوال الفقر، نشر المحبة، تحصين المجتمع من الآفات) باستخدام روابط التفسير. الخاتمة: التأكيد على استمرارية العمل الخيري. أمثلة للتوظيف: «تعاونُوا» (ماضٍ مبني على الضم)، «هيهاتَ أن تنهزمَ أمةٌ متضامنةٌ» (اسم فعل ماضٍ)، «نعملُ لنُسعِدَ الفقراءَ» (لام التعليل)، «يبتسمُ الأملُ في قلوب المحتاجين» (استعارة مكنية).',
				mcqCorrect: 'توضيح مفهوم التضامن وصوره وآثاره بروابط تفسيرية مع توظيف الموارد المطلوبة بدقة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			topic.mcqCorrect,
			[
				{
					text: 'كتابة حوار خيالي قصير من أربعة أسطر دون ذكر أسباب ولا توظيف القواعد',
					diagnosticFeedback: 'الالتزام بالنمط التفسيري والحجم (12 سطراً) والموارد المطلوبة شرط أساسي في معيار الملاءمة.'
				},
				{
					text: 'سرد قصة شخصية لا علاقة لها بالتضامن أو الآفات الاجتماعية',
					diagnosticFeedback: 'الخروج عن الموضوع يُفقدك نقاط الملاءمة.'
				},
				{
					text: 'تعداد نصائح بأسلوب الأمر فقط دون شرح ولا تعليل',
					diagnosticFeedback: 'التعليمة تطلب نمطاً تفسيرياً يبرز الأسباب والنتائج والآثار.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما الشرط الأهم لتحقيق معيار الملاءمة في هذه الوضعية الإدماجية التفسيرية؟',
				questionTextAr: 'كيف تحقّق العلامة الكاملة في معيار الملاءمة لهذه الوضعية الإدماجية؟',
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
				instruction: 'أنجز الوضعية الإدماجية الآتية مراعياً التصميم والسلامة اللغوية وتوظيف المطلوب:',
				content: [
					buildWrittenProductionBlock({
						context: topic.context,
						supportQuote: topic.quote,
						instruction: topic.instruction,
						rubricCriteria: [
							'الملاءمة (التقيد بالموضوع والنمط التفسيري والحجم والموارد: 2.5 ن)',
							'الانسجام (تسلسل الأفكار وتوظيف الروابط والتصميم الثلاثي: 2 ن)',
							'سلامة اللغة (خلوّ النص من الأخطاء النحوية والصرفية والإملائية: 2.5 ن)',
							'الإتقان والإبداع (جودة الخط، علامات الوقف، توظيف شاهد مناسب: 1 ن)'
						],
						modelOutline: topic.modelOutline,
						mark: '8'
					})
				]
			},
			hints: [
				'التزم بالتصميم الثلاثي: مقدمة (2-3 أسطر)، عرض تفسيري (7-8 أسطر)، خاتمة (2-3 أسطر).',
				'وظّف روابط التفسير بوضوح: لأنّ، أيْ، وذلك نتيجةً لـ، ومن أسباب ذلك، ولذلك.',
				'سطّر في ورقة الإجابة (أو تحقّق في المسودة) من وجود كل مورد نحوي وبلاغي طُلب في التعليمة.'
			],
			solutionStepsAr: [
				'تحليل السياق والتعليمة وتحديد النمط (التفسيري) والحجم والموارد اللغوية.',
				'بناء مسودة منظمة: مقدمة + عرض (أسباب وآثار وحلول) + خاتمة مع شاهد إسلامي.',
				'مراجعة التوظيف النحوي والبلاغي وتصحيح الأخطاء الإملائية ووضع علامات الوقف.'
			],
			finalAnswer: topic.mcqCorrect
		};
	}
};

export const TEMPLATES_3AM_T1: ArabicParameterizedTemplate[] = [
	intellectualSocialValues3amT1,
	linguisticBinaIsmFail3amT1,
	linguisticNasbIstiara3amT1,
	integrationTafsiriSolidarity3amT1
];
