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
// 1. البناء الفكري — حب الوطن والبيئة في نص شعري / نثري (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualEnvHomeland3amT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t3_intellectual_environment_homeland',
	grade: '3am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: حب الوطن وحماية البيئة والمسؤولية الجماعية',
	curriculumLessonId: 'arb_lesson_3am_t3_khabar_insha_intaj',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				kind: 'poetry' as const,
				title: 'نداءُ الوطنِ والعمل',
				author: 'الشاعر محمد العيد آل خليفة رحمه الله (بتصرّف)',
				source: 'ديوان محمد العيد آل خليفة',
				verses: [
					['يا بني الوطنِ العزيزِ تضافَرُوا', 'لِتَشيدَ أيديكُم صروحَ المجدِ'],
					['لا تَركنُوا نحو الخمولِ ولا تَنَوا', 'عن خدمةِ الأوطانِ في ذا العهدِ'],
					['صونُوا ربوعَ بلادِكُم وجمالَها', 'فالأرضُ تحيا باليدِ الممتدِّ'],
					['بالعلمِ والأخلاقِ نرفعُ رايةً', 'تسمو على الآفاقِ دونَ التردّي']
				] as Array<[string, string]>,
				vocab: [
					{ word: 'تضافَرُوا', meaning: 'تعاونُوا وتكاتفُوا' },
					{ word: 'لا تَنَوا', meaning: 'لا تضعفُوا ولا تفترُوا' }
				],
				generalIdea: 'دعوة أبناء الوطن إلى التكاتف والجدّ وصون جمال البلاد ورفع رايتها بالعلم والأخلاق',
				calls: 'التكاتف وبناء المجد، ترك الخمول، صيانة ربوع الوطن وجماله، والتمسك بالعلم والأخلاق',
				synWord: 'تضافَرُوا',
				synMeaning: 'تعاونُوا وتآزرُوا',
				antWord: 'الخمول',
				antMeaning: 'النشاط والاجتهاد',
				styleSample: '«يا بني الوطنِ» (نداء)، «تضافَرُوا / صونُوا» (أمر)، «لا تركنُوا» (نهي) — أسلوب إنشائي طلبي للنصح والتحفيز',
				value: 'حب الوطن يتجسّد بالعمل الجاد وصيانة بيئته والتسلّح بالعلم والأخلاق'
			},
			{
				kind: 'prose' as const,
				title: 'البيئةُ أمانةٌ في أعناقِنا',
				author: 'الشيخ مبارك بن محمد الميلي رحمه الله (بتصرّف)',
				source: 'من مقالات الإصلاح والوعي',
				paragraphs: [
					'إنّ المحافظةَ على البيئةِ ليستْ ترفاً فكرياً، بل هي سلوكٌ حضاريٌّ وواجبٌ شرعيٌّ؛ لأنّ الإنسانَ مستخلَفٌ في الأرضِ ليعمرَها لا ليفسدَها. ومتى تلوّثَ الهواءُ وتناقصتِ الغاباتُ تضرّرتْ صحةُ الإنسانِ واختلَّ توازنُ الطبيعةِ.',
					'فيا أيّها المواطنُ، حافِظْ على نظافةِ محيطِكَ، ولا تقطعْ شجرةً تظلّكَ؛ فالتشجيرُ وترشيدُ استهلاكِ الماءِ دليلٌ على رقيِّ الوعيِ وحسنِ الانتماءِ إلى الوطنِ.'
				],
				vocab: [
					{ word: 'ترفاً', meaning: 'أمراً زائداً عن الحاجة' },
					{ word: 'مستخلَفٌ', meaning: 'مؤتمنٌ على عمارة الأرض وإصلاحها' }
				],
				generalIdea: 'بيان أن حماية البيئة واجب ديني وحضاري يتطلب وعياً وسلوكاً عملياً من كل مواطن',
				calls: 'المحافظة على نظافة المحيط، عدم قطع الأشجار، التشجير، وترشيد استهلاك الماء',
				synWord: 'مستخلَفٌ',
				synMeaning: 'مؤتمنٌ ومكلّفٌ بالعمارة',
				antWord: 'يعمرَها',
				antMeaning: 'يفسدَها ويخرّبَها',
				styleSample: '«حافِظْ على نظافة محيطكَ» (أمر) و«لا تقطعْ شجرةً» (نهي) و«يا أيّها المواطنُ» (نداء) — أسلوب إنشائي طلبي للتوجيه والتحسيس',
				value: 'البيئة أمانة شرعية ووطنية يجب صونها بالغرس والنظافة وترك الإسراف'
			}
		]);

		const passageBlock =
			variant.kind === 'poetry'
				? buildPoetryPassageBlock({
						title: variant.title,
						verses: variant.verses,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					})
				: buildProsePassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					});

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'التشجيع على الهجرة وترك مسؤولية خدمة الوطن',
					diagnosticFeedback: 'النص يدعو للتمسك بخدمة الوطن وصيانة أرضه وبيئته.'
				},
				{
					text: 'القول بأن التلوث ظاهرة طبيعية لا دور للإنسان فيها',
					diagnosticFeedback: 'النص يحمّل الإنسان مسؤولية العمارة وصون المحيط.'
				},
				{
					text: 'تفضيل الخمول والكسل على العلم والاجتهاد',
					diagnosticFeedback: 'النص ينهى صراحةً عن الخمول ويدعو للعمل والعلم.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: variant.kind,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الفكرة العامة الأنسب لسند «${variant.title}»؟`,
				questionTextAr: `اختر الفكرة العامة الصحيحة لنص «${variant.title}»:`,
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
				instruction: 'اقرأ السند الآتي جيداً ثم أجب عن الأسئلة:',
				content: [
					passageBlock,
					{
						type: 'text',
						content: '1) صُغْ فكرةً عامةً مناسبةً للسند.',
						answer: `1) الفكرة العامة: ${variant.generalIdea}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) ما السلوكيات الإيجابية التي دعا إليها صاحب السند؟',
						answer: `2) دعا إلى: ${variant.calls}.`,
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
						content: '4) استخرج من السند مثالاً للأسلوب الإنشائي وبيّن صيغته وغرضه.',
						answer: `4) ${variant.styleSample}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استخلص قيمةً وطنيةً أو بيئيةً يرسّخها السند.',
						answer: `5) القيمة: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'اربط بين مضمون النداء والأوامر في السند لصياغة فكرة عامة دقيقة.',
				'الأمر والنهي والنداء من صيغ الأسلوب الإنشائي الطلبي وغرضها هنا النصح والتوجيه.',
				'اذكر القيمة الوطنية أو البيئية في جملة تربوية واضحة.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				`السلوكيات المطلوبة: ${variant.calls}.`,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				variant.styleSample
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي — المنادى ولا النافية للجنس واسم الفعل المضارع والأمر (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticMunadaLaIsmFiel3amT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t3_linguistic_munada_la_ism_fiel',
	grade: '3am',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: المنادى ولا النافية للجنس واسم الفعل المضارع والأمر',
	curriculumLessonId: 'arb_lesson_3am_t3_munada_la_nafiya',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'الشيخ أحمد سحنون رحمه الله (بتصرّف)',
				passage:
					'[[أُفٍّ]] لمُفسدِ البيئةِ! يا [[حارسَ]] الغابةِ، ويا [[خالدُ]]، [[حَذَارِ]] [[الإسرافَ]] في الماءِ؛ فـلا [[مُهمِلَ]] لوطنِهِ محبوبٌ، وعليكَ الصبرَ في خدمةِ الناسِ.',
				irabRows: [
					{
						target: 'حارسَ',
						irab: 'منادى مضاف منصوب وعلامة نصبه الفتحة الظاهرة وهو مضاف (والغابةِ مضاف إليه مجرور).',
						mark: '0.5'
					},
					{
						target: 'خالدُ',
						irab: 'منادى علم مفرد مبني على الضم في محل نصب.',
						mark: '0.5'
					},
					{
						target: 'مُهمِلَ',
						irab: 'اسم «لا» النافية للجنس مبني على الفتح في محل نصب (لأنه مفرد).',
						mark: '0.5'
					},
					{
						target: 'حَذَارِ',
						irab: 'اسم فعل أمر قياسي بمعنى احذرْ مبني على الكسر لا محل له من الإعراب، والفاعل مستتر تقديره أنت (والإسرافَ مفعول به منصوب).',
						mark: '0.5'
					}
				],
				ismFielMudari: 'أُفٍّ (اسم فعل مضارع بمعنى أتضجّرُ)',
				ismFielAmrManqul: 'عليكَ (اسم فعل أمر منقول بمعنى الزمْ، ومفعوله «الصبرَ»)',
				laCondition: 'عملت «لا» عمل «إنّ» لأن اسمها وخبرها نكرتان، ولم يفصل بينها وبين اسمها فاصل، ولم تُسبق بحرف جر.',
				mcqPrompt: 'ما الإعراب الصحيح لكلمة «مُهمِلَ» في جملة «لا مُهمِلَ لوطنِهِ محبوبٌ»؟',
				mcqCorrect: 'اسم لا النافية للجنس مبني على الفتح في محل نصب',
				mcqWrong1: 'اسم لا النافية للجنس مرفوع بالضمة',
				mcqWrong2: 'فاعل مرفوع وعلامة رفعه الضمة',
				mcqWrong3: 'منادى منصوب بالفتحة'
			},
			{
				author: 'الشيخ عبد الرحمن شيبان رحمه الله (بتصرّف)',
				passage:
					'[[آهٍ]] على ضياعِ الأوقاتِ! يا [[تلميذُ]]، ويا [[طالبَ]] العلمِ، [[صَهْ]] عن اللغوِ، و[[دونَكَ]] الكتابَ النافعَ؛ فلا [[صادقَ]] قولٍ خاسرٌ.',
				irabRows: [
					{
						target: 'تلميذُ',
						irab: 'منادى نكرة مقصودة مبني على الضم في محل نصب.',
						mark: '0.5'
					},
					{
						target: 'طالبَ',
						irab: 'منادى مضاف منصوب وعلامة نصبه الفتحة الظاهرة وهو مضاف (والعلمِ مضاف إليه).',
						mark: '0.5'
					},
					{
						target: 'صادقَ',
						irab: 'اسم «لا» النافية للجنس منصوب وعلامة نصبه الفتحة الظاهرة لأنه مضاف.',
						mark: '0.5'
					},
					{
						target: 'صَهْ',
						irab: 'اسم فعل أمر سماعي بمعنى اسكتْ مبني على السكون لا محل له من الإعراب، والفاعل مستتر وجوباً تقديره أنت.',
						mark: '0.5'
					}
				],
				ismFielMudari: 'آهٍ (اسم فعل مضارع بمعنى أتوجّعُ)',
				ismFielAmrManqul: 'دونَكَ (اسم فعل أمر منقول بمعنى خُذْ، ومفعوله «الكتابَ»)',
				laCondition: 'عملت «لا» عمل «إنّ» لتوافر الشروط الثلاثة (تنكير اسمها وخبرها، عدم الفصل، عدم سبقها بحرف جر).',
				mcqPrompt: 'ما نوع المنادى في «يا تلميذُ» وما حكمه الإعرابي؟',
				mcqCorrect: 'نكرة مقصودة مبني على الضم في محل نصب',
				mcqWrong1: 'علم مفرد مبني على الفتح',
				mcqWrong2: 'منادى مضاف منصوب',
				mcqWrong3: 'نكرة غير مقصودة منصوب'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'راجع أنواع المنادى وحكم اسم «لا» النافية للجنس المفرد والمضاف.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'تأكّد من حالة الإضافة مقابل الإفراد في المنادى واسم لا.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'قارن بين النكرة المقصودة (مبنية على ما ترفع به) وغير المقصودة (منصوبة).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
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
				instruction: 'تأمّل الفقرة الآتية ثم أجب عن الأسئلة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب الكلمات المسطّرة في الفقرة إعراباً تاماً:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: '2) استخرج من الفقرة: (أ) اسم فعل مضارع وبيّن معناه، (ب) اسم فعل أمر منقولاً وبيّن معناه ومعموله.',
						answer: `2) (أ) ${variant.ismFielMudari}. (ب) ${variant.ismFielAmrManqul}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) علّل سبب عمل «لا» النافية للجنس في الفقرة.',
						answer: `3) ${variant.laCondition}`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) نادِ كلمة «المواطنُ» (المعرّفة بأل) في جملة مفيدة وأعرب «المواطنُ».',
						answer: '4) يا أيّها المواطنُ حافِظْ على بيئتِكَ. «المواطنُ»: بدل (أو نعت) مرفوع وعلامة رفعه الضمة الظاهرة.',
						mark: '1'
					}
				]
			},
			hints: [
				'المنادى العلم المفرد والنكرة المقصودة يُبنيان على ما يُرفعان به في محل نصب.',
				'اسم «لا» المفرد مبني على الفتح في محل نصب، والمضاف معرب منصوب.',
				'لنداء المعرّف بأل نستعمل «يا أيّها» للمذكر و«يا أيّتها» للمؤنث.'
			],
			solutionStepsAr: [
				'إعراب المنادى واسم لا واسم الفعل.',
				`استخراج ${variant.ismFielMudari} و${variant.ismFielAmrManqul}.`,
				variant.laCondition,
				'نداء المعرّف بأل بـ «يا أيّها».'
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي — جزم المضارع والأسلوب الخبري والإنشائي (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticJazmAsalib3amT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t3_linguistic_jazm_asalib',
	grade: '3am',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: جزم الفعل المضارع والأسلوب الخبري والإنشائي',
	curriculumLessonId: 'arb_lesson_3am_t3_jazm_mudari_adawat',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'الإمام عبد الحميد بن باديس رحمه الله (بتصرّف)',
				passage:
					'إنّ حمايةَ البيئةِ مسؤوليةٌ مشتركةٌ، فـلا [[تُلْقِ]] الأوساخَ في الشوارعِ، ولْـ[[تُحافِظْ]] على الأشجارِ، واعلمْ أنّ المتهاونينَ لمْ [[يَبنُوا]] مجداً، ولمّا [[يُدرِكُوا]] قيمةَ النظافةِ. فما أعظمَ أثرَ العملِ التطوّعيِّ! وهل يرضى العاقلُ بتدميرِ الطبيعةِ؟',
				irabRows: [
					{
						target: 'تُلْقِ',
						irab: 'فعل مضارع مجزوم بـ «لا» الناهية وعلامة جزمه حذف حرف العلة (الياء)، والفاعل مستتر تقديره أنت.',
						mark: '0.5'
					},
					{
						target: 'تُحافِظْ',
						irab: 'فعل مضارع مجزوم بلام الأمر وعلامة جزمه السكون الظاهر، والفاعل مستتر تقديره أنت.',
						mark: '0.5'
					},
					{
						target: 'يَبنُوا',
						irab: 'فعل مضارع مجزوم بـ «لمْ» وعلامة جزمه حذف النون لأنه من الأفعال الخمسة، والواو فاعل.',
						mark: '0.5'
					},
					{
						target: 'يُدرِكُوا',
						irab: 'فعل مضارع مجزوم بـ «لمّا» وعلامة جزمه حذف النون لأنه من الأفعال الخمسة، والواو فاعل.',
						mark: '0.5'
					}
				],
				khabarEx: '«إنّ حمايةَ البيئةِ مسؤوليةٌ مشتركةٌ» (أسلوب خبري مؤكد).',
				inshaTalabiEx: '«لا تُلْقِ الأوساخَ» (نهي)، «هل يرضى العاقلُ بتدميرِ الطبيعةِ؟» (استفهام) — إنشائي طلبي.',
				inshaGhayrTalabiEx: '«ما أعظمَ أثرَ العملِ التطوّعيِّ!» (تعجب) — إنشائي غير طلبي.',
				mcqPrompt: 'ما نوع الأسلوب وصيغته في عبارة: «ما أعظمَ أثرَ العملِ التطوّعيِّ!»؟',
				mcqCorrect: 'أسلوب إنشائي غير طلبي صيغته التعجب',
				mcqWrong1: 'أسلوب إنشائي طلبي صيغته التعجب',
				mcqWrong2: 'أسلوب خبري مؤكد',
				mcqWrong3: 'أسلوب إنشائي طلبي صيغته الاستفهام'
			},
			{
				author: 'الشيخ الطيب العقبي رحمه الله (بتصرّف)',
				passage:
					'لا [[تنسَ]] حقَّ وطنِكَ عليكَ، ولْـ[[يَعْمَلْ]] كلُّ فردٍ بإخلاصٍ؛ فإنّ الأممَ الحيةَ لمْ [[تَرْضَ]] بالتخلفِ، ولمْ [[تُفرِّطْ]] في ثرواتِها. فنِعْمَ السلوكُ التطوّعُ، وليتَ الجميعَ يتعاونُونَ في الخيرِ!',
				irabRows: [
					{
						target: 'تنسَ',
						irab: 'فعل مضارع مجزوم بـ «لا» الناهية وعلامة جزمه حذف حرف العلة (الألف)، والفاعل مستتر تقديره أنت.',
						mark: '0.5'
					},
					{
						target: 'يَعْمَلْ',
						irab: 'فعل مضارع مجزوم بلام الأمر وعلامة جزمه السكون الظاهر.',
						mark: '0.5'
					},
					{
						target: 'تَرْضَ',
						irab: 'فعل مضارع مجزوم بـ «لمْ» وعلامة جزمه حذف حرف العلة (الألف).',
						mark: '0.5'
					},
					{
						target: 'تُفرِّطْ',
						irab: 'فعل مضارع مجزوم بـ «لمْ» وعلامة جزمه السكون الظاهر.',
						mark: '0.5'
					}
				],
				khabarEx: '«فإنّ الأممَ الحيةَ لمْ ترضَ بالتخلفِ» (أسلوب خبري).',
				inshaTalabiEx: '«لا تنسَ» (نهي) و«ليتَ الجميعَ يتعاونُونَ» (تمنّي) — إنشائي طلبي.',
				inshaGhayrTalabiEx: '«نِعْمَ السلوكُ التطوّعُ» (مدح) — إنشائي غير طلبي.',
				mcqPrompt: 'ما علامة جزم الفعلين «تنسَ» و«يَعْمَلْ» على الترتيب؟',
				mcqCorrect: 'حذف حرف العلة (الألف) ثم السكون الظاهر',
				mcqWrong1: 'الفتحة ثم السكون',
				mcqWrong2: 'حذف النون ثم السكون',
				mcqWrong3: 'السكون في كليهما'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تذكّر: التعجب والمدح إنشاء غير طلبي، والفتحة في «تنسَ» دليل على الألف المحذوفة.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'راجع صيغ الإنشاء الطلبي الخمس وعلامات جزم المضارع الثلاث.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'تحقّق من نوع الفعل (صحيح أم معتل أم أفعال خمسة) ومن نوع الأسلوب.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
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
				customTitle: 'الوضعية الثانية (البناء اللغوي والأساليب)',
				points: 6,
				instruction: 'تأمّل الفقرة الآتية ثم أجب عن الأسئلة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب الأفعال المسطّرة إعراباً نموذجياً:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: '2) استخرج من الفقرة: أسلوباً خبرياً، وأسلوباً إنشائياً طلبياً، وأسلوباً إنشائياً غير طلبي مع تحديد صيغة كل منهما.',
						answer: `2) الخبري: ${variant.khabarEx}\nالإنشائي الطلبي: ${variant.inshaTalabiEx}\nالإنشائي غير الطلبي: ${variant.inshaGhayrTalabiEx}`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) أدخل «لا الناهية» مرة و«لا النافية» مرة أخرى على الفعل «تُسرفُونَ في الماء» مع ضبطه.',
						answer: '3) مع لا الناهية: لا تُسرفُوا في الماء (مجزوم بحذف النون). مع لا النافية: أنتم لا تُسرفُونَ في الماء (مرفوع بثبوت النون).',
						mark: '1'
					},
					{
						type: 'text',
						content: '4) بيّن الفرق الدلالي بين «لمْ» و«لمّا» الجازمتين.',
						answer: '4) «لمْ» تنفي حدوث الفعل في الماضي دون توقّع، أما «لمّا» فتمتد بالنفي إلى الحاضر مع توقع حصوله مستقبلاً.',
						mark: '1'
					}
				]
			},
			hints: [
				'الجوازم لفعل واحد أربع: لم، لمّا، لام الأمر، لا الناهية.',
				'علامات الجزم: السكون، حذف حرف العلة، حذف النون.',
				'التعجب والمدح والذم والقسم أساليب إنشائية غير طلبية.'
			],
			solutionStepsAr: [
				'إعراب الأفعال المضارعة المجزومة بعلاماتها الثلاث.',
				`التمييز بين الخبري (${variant.khabarEx}) والإنشائي الطلبي وغير الطلبي.`,
				'الفرق بين لا الناهية (تجزم) ولا النافية (لا تؤثر).',
				'الفرق في المعنى بين لم ولمّا.'
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية — نص تفسيري حجاجي حول البيئة وترشيد الموارد (8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTafsiriHijajiEnv3amT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3am_t3_integration_tafsiri_hijaji_env',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: إنتاج نص تفسيري حجاجي حول حماية البيئة وترشيد الموارد',
	curriculumLessonId: 'arb_lesson_3am_t3_khabar_insha_intaj',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				context:
					'تتعرّض الغابات والمجاري المائية في بلادنا لأخطار التلوث والحرائق ورمي النفايات، مما استدعى تنظيم يوم وطني تحسيسي في متوسطتك.',
				quote: 'قال الله تعالى: ﴿وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا﴾.',
				instruction:
					'اكتب نصاً تفسيرياً حجاجياً من 14 سطراً تشرح فيه أسباب التلوث البيئي ونتائجه، وتُقنع فيه زملاءك بضرورة المشاركة في حملات التشجير والنظافة، موظّفاً: منادى مضافاً، و«لا» النافية للجنس، ومضارعاً مجزوماً بحذف حرف العلة، وأسلوباً إنشائياً غير طلبي.',
				modelOutline:
					'المقدمة: التعريف بالتلوث البيئي كخطر يهدد الحياة وصحة الإنسان. العرض (التفسير): شرح أسباب التلوث (النفايات البلاستيكية، دخان المصانع، قطع الأشجار) ونتائجه (الأمراض، الجفاف، اختلال التوازن). العرض (الحجاج): إقناع الزملاء بأن النظافة والتشجير واجب ديني ووطني بأدلة شرعية وواقعية. الخاتمة: دعوة عملية منظمة. أمثلة التوظيف: «يا أبناءَ الجزائرِ» (منادى مضاف)، «لا خيرَ في التهاونِ» (لا النافية للجنس)، «لا تُلقِ النفاياتِ» (مضارع مجزوم بحذف حرف العلة)، «فما أجملَ بيئةً نظيفةً!» (إنشائي غير طلبي: تعجب).',
				mcqCorrect: 'الجمع بين شرح أسباب التلوث ونتائجه (التفسير) وإقناع الزملاء بالحجج (الحجاج) مع توظيف الموارد الأربع'
			},
			{
				context:
					'لاحظتَ تبذير بعض السكان للماء الصالح للشرب رغم شحّ الأمطار وتحديات الجفاف، فأردتَ توجيه نداء توعوي في الإذاعة المدرسية حول ترشيد استهلاك الماء.',
				quote: 'قال الله تعالى: ﴿وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ﴾.',
				instruction:
					'حرّر نصاً تفسيرياً حجاجياً من 14 سطراً تبيّن فيه أهمية الماء وأسباب إهداره، وتُقنع المستمعين بضرورة الاقتصاد فيه، موظّفاً: اسم فعل أمر، ومنادى نكرة مقصودة، ومضارعاً مجزوماً بحذف النون، وأسلوباً إنشائياً طلبياً.',
				modelOutline:
					'المقدمة: إبراز أن الماء نعمة عظيمة وأساس الحياة. العرض (التفسير): تفسير أسباب تناقص الموارد المائية (التبذير المنزلي، تسرّب القنوات، قلة الأمطار) ونتائج ذلك. العرض (الحجاج): الإقناع بأن النهي الشرعي عن الإسراف والوعي المواطن هما الحل الأنجع. الخاتمة: خطة سلوك يومي لترشيد الماء. أمثلة التوظيف: «حَذارِ التبذيرَ» (اسم فعل أمر)، «يا مواطنُ» (منادى نكرة مقصودة)، «لا تُسرفُوا في الماءِ» (مجزوم بحذف النون)، «فهل ننتظرُ الجفافَ حتى نعيَ؟» (إنشائي طلبي: استفهام).',
				mcqCorrect: 'تفسير أسباب هدر الماء مع الإقناع بواجب ترشيده وتوظيف كل الموارد اللغوية المطلوبة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			topic.mcqCorrect,
			[
				{
					text: 'كتابة فقرة سردية قصيرة تصف رحلة إلى البحر دون تعليل ولا حجاج',
					diagnosticFeedback: 'النمط المطلوب هو التفسيري الحجاجي وليس السردي الوصفي.'
				},
				{
					text: 'ذكر أسباب التلوث فقط في ستة أسطر دون حجاج ولا توظيف للموارد',
					diagnosticFeedback: 'يجب الالتزام بالحجم والجمع بين التفسير والحجاج وتوظيف الموارد الأربع.'
				},
				{
					text: 'استخدام اللهجة العامية بدلاً من العربية الفصحى السليمة',
					diagnosticFeedback: 'سلامة اللغة الفصحى معيار أساسي في التقويم.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما المنهجية السليمة لتحرير هذه الوضعية الإدماجية التفسيرية الحجاجية؟',
				questionTextAr: 'اختر المنهجية الصحيحة لإنجاز هذه الوضعية:',
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
				instruction: 'أنتج نصاً متماسكاً مستجيباً لكل عناصر التعليمة الآتية:',
				content: [
					buildWrittenProductionBlock({
						context: topic.context,
						supportQuote: topic.quote,
						instruction: topic.instruction,
						rubricCriteria: [
							'الملاءمة (التقيد بالموضوع والنمط التفسيري الحجاجي والحجم وتوظيف الموارد الأربع: 2.5 ن)',
							'الانسجام (التصميم الثلاثي، ترابط الفقرات بالروابط التفسيرية والحجاجية: 2 ن)',
							'سلامة اللغة (صحة النحو والصرف والإملاء: 2.5 ن)',
							'الإتقان والإبداع (توظيف الشاهد القرآني، علامات الوقف، حسن العرض: 1 ن)'
						],
						modelOutline: topic.modelOutline,
						mark: '8'
					})
				]
			},
			hints: [
				'اجعل الفقرة الأولى في العرض للتفسير (أسباب ونتائج)، والثانية للحجاج (أدلة وإقناع).',
				'وظّف الآية الكريمة الواردة في السند كشاهد يثري نصّك.',
				'راجع كل مورد لغوي مطلوب وتأكد من ضبطه بالشكل التام.'
			],
			solutionStepsAr: [
				'تحديد الموضوع والنمط التفسيري الحجاجي والموارد المطلوبة.',
				'تنظيم الأفكار في مقدمة وعرض (تفسير ثم حجاج) وخاتمة توجيهية.',
				'المراجعة اللغوية والإملائية ووضع علامات الترقيم.'
			],
			finalAnswer: topic.mcqCorrect
		};
	}
};

export const TEMPLATES_3AM_T3: ArabicParameterizedTemplate[] = [
	intellectualEnvHomeland3amT3,
	linguisticMunadaLaIsmFiel3amT3,
	linguisticJazmAsalib3amT3,
	integrationTafsiriHijajiEnv3amT3
];
