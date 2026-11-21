import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIrabTableBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import {
	buildIllustratedFigureBlock,
	type IllustrationId
} from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري (3 ن) — نص نثري في القيم الإنسانية والتعاون وبر الوالدين
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp3apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t1_reading_comprehension',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: القيم الإنسانية والتعاون',
	curriculumLessonId: 'arb_lesson_3ap_t1_word_parts',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'التَّعَاوُنُ فِي الحَيِّ',
				paragraphs: [
					'فِي صَبَاحِ يَوْمِ الجُمُعَةِ، [[خَرَجَ]] سُكَّانُ الحَيِّ إِلَى الشَّارِعِ لِتَنْظِيفِهِ وَتَزْيِينِهِ. أَحْضَرَ الكِبَارُ المَكَانِسَ وَأَكْيَاسَ القُمَامَةِ، وَشَارَكَ [[الأَطْفَالُ]] بِنَشَاطٍ كَبِيرٍ فِي غَرْسِ شُجَيْرَاتِ الزَّيْتُونِ.',
					'اِبْتَسَمَ الشَّيْخُ الصَّالِحُ وَقَالَ لَهُمْ: التَّعَاوُنُ خُلُقٌ إِسْلَامِيٌّ عَظِيمٌ يَنْشُرُ المَحَبَّةَ بَيْنَ الجِيرَانِ وَيَجْعَلُ حَيَّنَا نَظِيفاً وَجَمِيلاً.'
				],
				author: 'نص تربوي في القيم الإنسانية',
				vocabulary: [
					{ word: 'تَزْيِينِهِ', meaning: 'تجميله وتحسين منظره' },
					{ word: 'شُجَيْرَات', meaning: 'أشجار صغيرة' }
				],
				bestTitle: 'التعاون في تنظيف الحي',
				wrongTitles: [
					{ text: 'رحلة إلى شاطئ البحر', diagnosticFeedback: 'النص يتحدث عن حملة تنظيف في الحي لا عن رحلة بحرية.' },
					{ text: 'مسابقة في الحساب', diagnosticFeedback: 'لم تذكر في النص أي مسابقة في مادة الحساب.' },
					{ text: 'قصة الأسد والغزال', diagnosticFeedback: 'النص يتحدث عن سكان الحي والتعاون وليس عن حيوانات الغابة.' }
				],
				compQ: 'مَتَى خَرَجَ سُكَّانُ الحَيِّ لِتَنْظِيفِ الشَّارِعِ؟ وَفِيمَ شَارَكَ الأَطْفَالُ؟',
				compA: 'خَرَجَ سُكَّانُ الحَيِّ صَبَاحَ يَوْمِ الجُمُعَةِ، وَشَارَكَ الأَطْفَالُ فِي غَرْسِ شُجَيْرَاتِ الزَّيْتُونِ.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تَجْمِيلِهِ»، وَضِدَّ كَلِمَةِ «الصِّغَارُ».',
				vocabA: 'مرادف «تَجْمِيلِهِ»: تَزْيِينِهِ — ضدّ «الصِّغَارُ»: الكِبَارُ.'
			},
			{
				title: 'بِرُّ الوَالِدَيْنِ',
				paragraphs: [
					'تَسْتَيْقِظُ الأُمُّ بَاكِراً كُلَّ يَوْمٍ لِتُعِدَّ الفَطُورَ لِأَبْنَائِهَا، وَيَخْرُجُ [[الأَبُ]] إِلَى عَمَلِهِ لِيُوَفِّرَ لَهُمْ كُلَّ مَا يَحْتَاجُونَ إِلَيْهِ بِإِخْلَاصٍ وَتَعَبٍ.',
					'لِذَلِكَ [[يَحْتَرِمُ]] أَحْمَدُ وَالِدَيْهِ وَيُطِيعُهُمَا فِي كُلِّ خَيْرٍ، وَيَدْعُو اللَّهَ تَعَالَى أَنْ يَحْفَظَهُمَا وَيُبَارِكَ فِي عُمُرِهِمَا.'
				],
				author: 'نص تربوي في بر الوالدين',
				vocabulary: [
					{ word: 'بَاكِراً', meaning: 'في أول الصباح' },
					{ word: 'بِإِخْلَاصٍ', meaning: 'بصدق وإتقان' }
				],
				bestTitle: 'فضل الوالدين وطاعتهما',
				wrongTitles: [
					{ text: 'الرياضة في الملعب', diagnosticFeedback: 'النص يتناول بر الوالدين وليس الرياضة.' },
					{ text: 'أيام فصل الشتاء', diagnosticFeedback: 'لا يتحدث النص عن فصول السنة.' },
					{ text: 'زيارة حديقة الحيوان', diagnosticFeedback: 'موضوع النص هو الإحسان إلى الأب والأم.' }
				],
				compQ: 'لِمَاذَا تَسْتَيْقِظُ الأُمُّ بَاكِراً كُلَّ يَوْمٍ؟ وَكَيْفَ يُعَامِلُ أَحْمَدُ وَالِدَيْهِ؟',
				compA: 'تَسْتَيْقِظُ الأُمُّ بَاكِراً لِتُعِدَّ الفَطُورَ لِأَبْنَائِهَا، وَأَحْمَدُ يَحْتَرِمُ وَالِدَيْهِ وَيُطِيعُهُمَا وَيَدْعُو لَهُمَا.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تُجَهِّزَ»، وَضِدَّ كَلِمَةِ «يَعْصِيهِمَا».',
				vocabA: 'مرادف «تُجَهِّزَ»: تُعِدَّ — ضدّ «يَعْصِيهِمَا»: يُطِيعُهُمَا.'
			},
			{
				title: 'اِحْتِرَامُ المُعَلِّمِ',
				paragraphs: [
					'دَخَلَ [[المُعَلِّمُ]] القِسْمَ فَوَقَفَ التَّلَامِيذُ بِأَدَبٍ وَسَلَّمُوا عَلَيْهِ. [[شَرَحَ]] المُعَلِّمُ الدَّرْسَ بِصَوْتٍ وَاضِحٍ، وَأَنْصَتَ الجَمِيعُ بِاهْتِمَامٍ شَدِيدٍ.',
					'فَالمُعَلِّمُ يَبْذُلُ جُهْداً كَبِيراً لِيُنِيرَ عُقُولَنَا بِالعِلْمِ النَّافِعِ، وَلِذَلِكَ وَجَبَ عَلَيْنَا تَقْدِيرُهُ وَالاِجْتِهَادُ فِي دُرُوسِنَا.'
				],
				author: 'نص تربوي في احترام المعلم',
				vocabulary: [
					{ word: 'أَنْصَتَ', meaning: 'استمع بانتباه وهدوء' },
					{ word: 'تَقْدِيرُهُ', meaning: 'احترامه ومعرفة فضله' }
				],
				bestTitle: 'فضل المعلم واحترامه',
				wrongTitles: [
					{ text: 'حكاية الصياد والسمكة', diagnosticFeedback: 'النص يدور داخل القسم حول المعلم والتلاميذ.' },
					{ text: 'التسوق في السوق الأسبوعي', diagnosticFeedback: 'لا توجد أي إشارة إلى السوق في النص.' },
					{ text: 'نظافة الشاطئ في الصيف', diagnosticFeedback: 'النص يتحدث عن القسم والعلم والمعلم.' }
				],
				compQ: 'كَيْفَ اسْتَقْبَلَ التَّلَامِيذُ المُعَلِّمَ عِنْدَ دُخُولِهِ القِسْمَ؟ وَلِمَاذَا نُقَدِّرُهُ؟',
				compA: 'وَقَفَ التَّلَامِيذُ بِأَدَبٍ وَسَلَّمُوا عَلَيْهِ، وَنُقَدِّرُهُ لِأَنَّهُ يَبْذُلُ جُهْداً لِيُنِيرَ عُقُولَنَا بِالعِلْمِ النَّافِعِ.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «اسْتَمَعَ»، وَضِدَّ كَلِمَةِ «الضَّارِّ».',
				vocabA: 'مرادف «اسْتَمَعَ»: أَنْصَتَ — ضدّ «الضَّارِّ»: النَّافِعِ.'
			}
		];

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.bestTitle, p.wrongTitles, rng);

		const plainPassage = p.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');
		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ السند الآتي ثم اختر العنوان الأنسب له:\n«${plainPassage}»`,
			questionTextAr: 'ما العنوان الأنسب لهذا النص؟',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يدور النص حول «${p.bestTitle}» بدليل أفكاره وكلماته الأساسية.`
		};

		const illustrationId: IllustrationId =
			p.title === 'التَّعَاوُنُ فِي الحَيِّ'
				? 'pri_ara_03_algerian_village_orchard'
				: p.title === 'بِرُّ الوَالِدَيْنِ'
					? 'pri_ara_02_warm_algerian_home'
					: 'pri_ara_01_school_bag_supplies';

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ النص قراءة متأنية ثم أجب عن الأسئلة الآتية:',
			content: [
				buildIllustratedFigureBlock(illustrationId, {
					mode: 'image_only',
					title: p.title,
					maxHeight: 112,
					width: '58%'
				}),
				buildProsePassageBlock({
					title: p.title,
					paragraphs: p.paragraphs,
					author: p.author,
					vocabulary: p.vocabulary
				}),
				{
					type: 'text',
					content: '1) هاتِ عنواناً مناسباً للنص.',
					answer: `العنوان المناسب: «${p.bestTitle}».`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ${p.compQ}`,
					answer: p.compA,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) ${p.vocabQ}`,
					answer: p.vocabA,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص مرتين لفهم الفكرة العامة التي يتحدث عنها.',
				'استخرج الإجابات المباشرة من جمل النص دون خروج عن الموضوع.',
				'ابحث في النص عن الكلمة التي تحمل نفس المعنى للمرادف وعكس المعنى للضد.'
			],
			solutionStepsAr: [
				`العنوان المناسب للنص: «${p.bestTitle}».`,
				`إجابة الفهم: ${p.compA}`,
				`إجابة الرصيد اللغوي: ${p.vocabA}`
			],
			finalAnswer: p.bestTitle
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي 1 (2 ن) — أقسام الكلمة + أزمنة الفعل + إعراب مبسط
// ═══════════════════════════════════════════════════════════════════════════════
const wordPartsVerbs3apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t1_word_parts_verbs',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: أقسام الكلمة وأزمنة الفعل',
	curriculumLessonId: 'arb_lesson_3ap_t1_verb_tenses',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				sentence: 'سَاعَدَ يُوسُفُ الجَارَ فِي الحَيِّ.',
				noun: 'يُوسُفُ، الجَارَ، الحَيِّ',
				verb: 'سَاعَدَ',
				particle: 'فِي',
				irabEntries: [
					{ target: 'سَاعَدَ', irab: 'فعلٌ ماضٍ مبنيٌّ على الفتح.', mark: '0.5' },
					{ target: 'يُوسُفُ', irab: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				verbRoot: 'كَتَبَ',
				present: 'يَكْتُبُ',
				imperative: 'اُكْتُبْ',
				mcqPrompt: 'ما نوعُ الفعلِ «سَاعَدَ» في جملة «سَاعَدَ يُوسُفُ الجَارَ»؟',
				mcqCorrect: 'فعلٌ ماضٍ',
				mcqDistractors: [
					{ text: 'فعلٌ مضارعٌ', diagnosticFeedback: 'الفعل المضارع يبدأ بأحد حروف «أنيت» ويدلّ على الحاضر.' },
					{ text: 'فعلُ أمرٍ', diagnosticFeedback: 'فعل الأمر يدلّ على الطلب مثل «سَاعِدْ».' },
					{ text: 'حرفُ جرٍّ', diagnosticFeedback: '«سَاعَدَ» يدل على عمل وقع في الماضي فهو فعل.' }
				]
			},
			{
				sentence: 'يَحْفَظُ بِلَالٌ السُّورَةَ فِي المَسْجِدِ.',
				noun: 'بِلَالٌ، السُّورَةَ، المَسْجِدِ',
				verb: 'يَحْفَظُ',
				particle: 'فِي',
				irabEntries: [
					{ target: 'يَحْفَظُ', irab: 'فعلٌ مضارعٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'بِلَالٌ', irab: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				verbRoot: 'قَرَأَ',
				present: 'يَقْرَأُ',
				imperative: 'اِقْرَأْ',
				mcqPrompt: 'ما نوعُ الفعلِ «يَحْفَظُ» في جملة «يَحْفَظُ بِلَالٌ السُّورَةَ»؟',
				mcqCorrect: 'فعلٌ مضارعٌ',
				mcqDistractors: [
					{ text: 'فعلٌ ماضٍ', diagnosticFeedback: 'الفعل الماضي هو «حَفِظَ»، أما «يَحْفَظُ» فيبدأ بالياء ويدل على الحاضر.' },
					{ text: 'فعلُ أمرٍ', diagnosticFeedback: 'فعل الأمر هو «اِحْفَظْ» بالسكون.' },
					{ text: 'اسمٌ', diagnosticFeedback: '«يَحْفَظُ» يدل على عمل ولا يقبل الـ التعريف.' }
				]
			},
			{
				sentence: 'غَرَسَ الفَلَّاحُ شَجَرَةً عَلَى التَّلِّ.',
				noun: 'الفَلَّاحُ، شَجَرَةً، التَّلِّ',
				verb: 'غَرَسَ',
				particle: 'عَلَى',
				irabEntries: [
					{ target: 'غَرَسَ', irab: 'فعلٌ ماضٍ مبنيٌّ على الفتح.', mark: '0.5' },
					{ target: 'الفَلَّاحُ', irab: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				verbRoot: 'شَكَرَ',
				present: 'يَشْكُرُ',
				imperative: 'اُشْكُرْ',
				mcqPrompt: 'ما فعلُ الأمرِ الصحيحُ من الفعلِ «شَكَرَ» عند مخاطبةِ المفردِ المذكرِ؟',
				mcqCorrect: 'اُشْكُرْ',
				mcqDistractors: [
					{ text: 'يَشْكُرُ', diagnosticFeedback: '«يَشْكُرُ» فعل مضارع للغائب وليس فعل أمر.' },
					{ text: 'شَكَرَ', diagnosticFeedback: '«شَكَرَ» فعل ماضٍ وقع وانتهى.' },
					{ text: 'نَشْكُرُ', diagnosticFeedback: '«نَشْكُرُ» فعل مضارع مع الضمير نحن.' }
				]
			}
		];

		const item = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(item.mcqCorrect, item.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: item.mcqPrompt,
			questionTextAr: item.mcqPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${item.mcqCorrect}»؛ نميّز بين أزمنة الفعل بالنظر إلى وقت حدوث العمل وعلامة آخره.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (أقسام الكلمة والأفعال)',
			points: 2,
			instruction: 'أجب عن الأسئلة اللغوية الآتية بدقة:',
			content: [
				{
					type: 'text',
					content: `1) استخرج من الجملة الآتية اسماً وفعلاً وحرفاً: «${item.sentence}»`,
					answer: `الاسم: ${item.noun} — الفعل: ${item.verb} — الحرف: ${item.particle}.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) حوّل الفعل الماضي «${item.verbRoot}» إلى المضارع (مع هو) ثم إلى الأمر (مع أنتَ).`,
					answer: `في المضارع: «${item.present}» — في الأمر: «${item.imperative}».`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: '3) أعرب الكلمتين الآتيتين إعراباً نموذجياً مبسّطاً:'
				},
				buildIrabTableBlock(item.irabEntries)
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الاسم يقبل (الـ) أو التنوين، والفعل يدل على عمل مرتبط بزمن.',
				'الفعل المضارع يبدأ بأحد حروف «أنيت» وفعل الأمر آخره سكون.',
				'انتبه إلى حركة آخر الفعل في الإعراب: الفتحة للماضي والضمة للمضارع.'
			],
			solutionStepsAr: [
				`تصنيف الكلمات: الاسم (${item.noun})، الفعل (${item.verb})، الحرف (${item.particle}).`,
				`تحويل «${item.verbRoot}»: المضارع «${item.present}»، الأمر «${item.imperative}».`,
				...item.irabEntries.map((e) => `${e.target}: ${e.irab}`)
			],
			finalAnswer: item.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — الجملة الفعلية والاسمية + التاء المفتوحة والمربوطة
// ═══════════════════════════════════════════════════════════════════════════════
const sentencesTaa3apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t1_sentences_taa_spelling',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'spelling_imla',
	titleAr: 'البناء اللغوي والإملاء: الجملة الفعلية والاسمية والتاء',
	curriculumLessonId: 'arb_lesson_3ap_t1_open_closed_taa',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				verbal: 'يَزْرَعُ الفَلَّاحُ الأَشْجَارَ.',
				nominal: 'الفَلَّاحُ يَزْرَعُ الأَشْجَارَ.',
				taaWords: [
					{ blank: 'شَجَرَ...', full: 'شَجَرَةٌ', reason: 'تاء مربوطة لأنها اسم مفرد مؤنث' },
					{ blank: 'كَتَبَـ...', full: 'كَتَبَتْ', reason: 'تاء مفتوحة لأنها في آخر فعل' },
					{ blank: 'مُعَلِّمَا...', full: 'مُعَلِّمَاتٌ', reason: 'تاء مفتوحة لأنها جمع مؤنث سالم' }
				],
				mcqQ: 'لماذا كُتبتِ التاءُ مفتوحةً في كلمة «كَتَبَتْ»؟',
				mcqCorrect: 'لأنها في آخر فِعْلٍ',
				mcqDistractors: [
					{ text: 'لأنها اسمٌ مفردٌ مؤنثٌ', diagnosticFeedback: 'الاسم المفرد المؤنث تُكتب تاؤه مربوطة مثل «مَدْرَسَةٌ».' },
					{ text: 'لأنها جمعُ مؤنثٍ سالمٌ', diagnosticFeedback: '«كَتَبَتْ» فعل ماضٍ وليست جمع مؤنث سالم.' },
					{ text: 'لأنها اسمٌ ثلاثيٌّ ساكنُ الوسطِ', diagnosticFeedback: '«كَتَبَتْ» فعل وليست اسماً ثلاثياً.' }
				]
			},
			{
				verbal: 'تُحَافِظُ التِّلْمِيذَةُ عَلَى القِسْمِ.',
				nominal: 'التِّلْمِيذَةُ تُحَافِظُ عَلَى القِسْمِ.',
				taaWords: [
					{ blank: 'حَدِيقَـ...', full: 'حَدِيقَةٌ', reason: 'تاء مربوطة لأنها اسم مفرد مؤنث' },
					{ blank: 'ذَهَبْـ...', full: 'ذَهَبْتُ', reason: 'تاء مفتوحة لأنها في آخر فعل' },
					{ blank: 'وَقْـ...', full: 'وَقْتٌ', reason: 'تاء مفتوحة لأنها اسم ثلاثي ساكن الوسط' }
				],
				mcqQ: 'ما التحويلُ الصحيحُ للجملة «تُحَافِظُ التِّلْمِيذَةُ عَلَى القِسْمِ» إلى جملة اسمية؟',
				mcqCorrect: 'التِّلْمِيذَةُ تُحَافِظُ عَلَى القِسْمِ.',
				mcqDistractors: [
					{ text: 'حَافَظَتِ التِّلْمِيذَةُ عَلَى القِسْمِ.', diagnosticFeedback: 'لا تزال تبدأ بفعل فهي جملة فعلية.' },
					{ text: 'حَافِظِي عَلَى القِسْمِ.', diagnosticFeedback: 'بدأت بفعل أمر فهي جملة فعلية.' },
					{ text: 'فِي القِسْمِ تُحَافِظُ التِّلْمِيذَةُ.', diagnosticFeedback: 'لتكوين جملة اسمية نبدأ بالاسم «التِّلْمِيذَةُ».' }
				]
			},
			{
				verbal: 'يَحْتَرِمُ المُسْلِمُ جَارَهُ.',
				nominal: 'المُسْلِمُ يَحْتَرِمُ جَارَهُ.',
				taaWords: [
					{ blank: 'مَكْتَبَـ...', full: 'مَكْتَبَةٌ', reason: 'تاء مربوطة لأنها اسم مفرد مؤنث' },
					{ blank: 'مُسْلِمَا...', full: 'مُسْلِمَاتٌ', reason: 'تاء مفتوحة لأنها جمع مؤنث سالم' },
					{ blank: 'صَوْ...', full: 'صَوْتٌ', reason: 'تاء مفتوحة لأنها اسم ثلاثي ساكن الوسط' }
				],
				mcqQ: 'أيُّ كلمةٍ تُكتبُ بتاءٍ **مربوطةٍ** في آخرها؟',
				mcqCorrect: 'مَكْتَبَةٌ',
				mcqDistractors: [
					{ text: 'نَجَحَتْ', diagnosticFeedback: '«نَجَحَتْ» فعل فتاؤه مفتوحة دائماً.' },
					{ text: 'صَوْتٌ', diagnosticFeedback: '«صَوْتٌ» اسم ثلاثي ساكن الوسط فتاؤه مفتوحة.' },
					{ text: 'مُسْلِمَاتٌ', diagnosticFeedback: '«مُسْلِمَاتٌ» جمع مؤنث سالم فتاؤه مفتوحة.' }
				]
			}
		];

		const b = rng.pick(banks);
		const mcq = buildUniqueMcqOptions(b.mcqCorrect, b.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: b.mcqQ,
			questionTextAr: b.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجواب الصحيح: «${b.mcqCorrect}». تذكّر أن الجملة الاسمية تبدأ باسم، والتاء المربوطة تكون في آخر الاسم المفرد المؤنث.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي والإملاء (الجمل والتاء)',
			points: 2,
			instruction: 'أنجز المطلوب في الجمل والإملاء:',
			content: [
				{
					type: 'text',
					content: `1) حوّل الجملة الفعلية الآتية إلى جملة اسمية: «${b.verbal}»`,
					answer: `الجملة الاسمية: «${b.nominal}».`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: '2) أكمل الكلمات الآتية بالتاء المناسبة (ت / ة) مع التعليل في الجدول:'
				},
				{
					type: 'table',
					headers: ['الكلمة الناقصة', 'الكتابة الصحيحة', 'التعليل'],
					cells: [],
					rows: b.taaWords.map((w) => [
						{ content: w.blank, bold: true },
						{ content: '................', answer: w.full, mark: '0.25' },
						{ content: '....................................', answer: w.reason, mark: '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'لتحويل الجملة الفعلية إلى اسمية نبدأ بالاسم (الفاعل) أولاً.',
				'تُكتب التاء مربوطة في الاسم المفرد المؤنث الذي يُنطق هاءً عند الوقف.',
				'تُكتب التاء مفتوحة في الأفعال، وجمع المؤنث السالم، والاسم الثلاثي ساكن الوسط.'
			],
			solutionStepsAr: [
				`التحويل إلى جملة اسمية: «${b.nominal}».`,
				...b.taaWords.map((w) => `«${w.full}»: ${w.reason}.`)
			],
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — إنتاج فقرة من 4 إلى 6 أسطر
// ═══════════════════════════════════════════════════════════════════════════════
const integration3apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t1_written_integration',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: كتابة فقرة عن القيم الإنسانية',
	curriculumLessonId: 'arb_lesson_3ap_t1_verbal_nominal_sentences',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				context: 'بمناسبة يوم النظافة في حيك، شاركتَ مع جيرانك وأصدقائك في تنظيف الشوارع وغرس الأشجار.',
				supportQuote: 'التعاونُ والنظافةُ من أجملِ القيمِ التي حثَّ عليها دينُنا الإسلاميُّ.',
				instruction: 'اكتب فقرة من 4 إلى 6 أسطر تتحدث فيها عمّا قمتم به في هذه الحملة، مبيّناً شعورك وفائدة التعاون، موظفاً جملة فعلية وكلمة تنتهي بتاء مربوطة.',
				rubricCriteria: [
					'الملاءمة (التقيد بالموضوع وعدد الأسطر 4-6 أسطر): 1 ن',
					'الانسجام (ترتيب الأفكار واستعمال أدوات الربط): 0.75 ن',
					'سلامة اللغة وتوظيف المطلوب (جملة فعلية + تاء مربوطة): 0.75 ن',
					'الإتقان وجودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'في صباح يوم الجمعة، اجتمع سكان حيّنا للمشاركة في حملة تنظيف واسعة. أحضر الكبار المكانس والأكياس، وجمعنا الأوساخ، ثم غرسنا شجيرات صغيرة على جانبي الطريق. أصبح الحيّ نظيفاً وجميلاً بفضل التعاون. ما أجمل أن نتعاون دائماً ليبقى حيّنا نظيفاً!',
				mcqQ: 'أيُّ جملةٍ تصلحُ بدايةً مناسبةً لفقرةٍ حول حملةِ تنظيفِ الحيِّ؟',
				mcqCorrect: 'فِي صَبَاحِ يَوْمِ الجُمُعَةِ، اجْتَمَعَ سُكَّانُ حَيِّنَا لِتَنْظِيفِ الشَّوَارِعِ وَغَرْسِ الأَشْجَارِ.',
				mcqDistractors: [
					{ text: 'وَلِذَلِكَ أَنْصَحُكُمْ بِشِرَاءِ الكُتُبِ المَدْرَسِيَّةِ.', diagnosticFeedback: 'هذه الجملة خاتمة وخارجة عن موضوع تنظيف الحي.' },
					{ text: 'ذَهَبْتُ مَعَ أُسْرَتِي إِلَى الشَّاطِئِ فِي الصَّيْفِ.', diagnosticFeedback: 'هذا موضوع آخر عن عطلة الصيف لا عن حملة النظافة.' },
					{ text: 'فِي الأَخِيرِ عُدْنَا إِلَى المَنَازِلِ مَسْرُورِينَ.', diagnosticFeedback: '«في الأخير» تُستعمل للخاتمة لا للمقدمة.' }
				]
			},
			{
				context: 'للوالدين فضلٌ عظيمٌ عليك في تربيتك وتعليمك ورعايتك كل يوم.',
				supportQuote: 'رضى اللهِ في رضى الوالدينِ، وطاعتُهما سببُ البركةِ والنجاحِ.',
				instruction: 'اكتب فقرة من 4 إلى 6 أسطر تعبّر فيها عن حبك لوالديك وتذكر كيف تساعدهما وتبرّهما في المنزل، موظفاً فعلاً مضارعاً وكلمة تنتهي بتاء مفتوحة.',
				rubricCriteria: [
					'الملاءمة (التقيد ببر الوالدين وعدد الأسطر 4-6 أسطر): 1 ن',
					'الانسجام (تسلسل الجمل وأدوات الربط): 0.75 ن',
					'سلامة اللغة وتوظيف المطلوب (فعل مضارع + تاء مفتوحة): 0.75 ن',
					'وضوح الخط واحترام علامات الوقف: 0.5 ن'
				],
				modelOutline:
					'أُحبُّ والديَّ حباً كبيراً لأنهما يتعبان من أجل سعادتي وتربيتي. كل يوم أُساعد أمّي في ترتيب غرفتي، وأستمع إلى نصائح أبي بأدبٍ وطاعةٍ. كما أجتهد في دراستي لأُفرحهما بنتائجي الممتازة. اللهم احفظ والديَّ وبارك في عمرهما.',
				mcqQ: 'ما الخاتمةُ الأنسبُ لفقرةٍ تتحدّثُ عن برِّ الوالدينِ؟',
				mcqCorrect: 'مَا أَعْظَمَ فَضْلَ الوَالِدَيْنِ! فَلْنُطِعْهُمَا وَنَدْعُ اللَّهَ أَنْ يَحْفَظَهُمَا دَائِماً.',
				mcqDistractors: [
					{ text: 'تَسْتَيْقِظُ أُمِّي فِي الصَّبَاحِ البَاكِرِ.', diagnosticFeedback: 'هذه جملة تمهيدية أو من العرض وليست خاتمة.' },
					{ text: 'غَرَسْنَا الأَشْجَارَ فِي سَاحَةِ المَدْرَسَةِ.', diagnosticFeedback: 'هذه الجملة خارجة عن موضوع بر الوالدين.' },
					{ text: 'ثُمَّ كَتَبْتُ الدَّرْسَ عَلَى اللَّوْحَةِ.', diagnosticFeedback: 'هذه جملة من العرض ولا تختم موضوع بر الوالدين.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: pr.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الخيار الصحيح هو: «${pr.mcqCorrect}» لأنه مناسب لموضوع الفقرة وموقعه الصحيح في بنائها.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 3,
			content: [
				buildWrittenProductionBlock({
					context: pr.context,
					supportQuote: pr.supportQuote,
					instruction: pr.instruction,
					rubricCriteria: pr.rubricCriteria,
					modelOutline: pr.modelOutline,
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اترك بياضاً في بداية الفقرة وابدأ بجملة تمهيدية واضحة.',
				'استعمل أدوات الربط (وَ، فَـ، ثُمَّ) والفاصلة والنقطة.',
				'تأكّد من توظيف الظواهر المطلوبة وراجع إملاء التاء المفتوحة والمربوطة.'
			],
			solutionStepsAr: [
				'قراءة السياق والتعليمة وتحديد المطلوب بدقة (4 إلى 6 أسطر).',
				'كتابة مقدمة وعرض وخاتمة مترابطة مع توظيف المطلوب.',
				`نموذج مقترح: ${pr.modelOutline}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T1: ArabicParameterizedTemplate[] = [
	readingComp3apT1,
	wordPartsVerbs3apT1,
	sentencesTaa3apT1,
	integration3apT1
];
