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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري (3 ن) — القيم الإنسانية والحياة الاجتماعية
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp4apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t1_reading_comprehension',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: التضامن والإحسان والأخلاق الحسنة',
	curriculumLessonId: 'arb_lesson_4ap_t1_subject_fail',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'التَّضَامُنُ فِي المِحَنِ',
				paragraphs: [
					'ذَاتَ يَوْمٍ شَاتٍ، هَبَّتْ عَاصِفَةٌ قَوِيَّةٌ فَتَضَرَّرَ سَقْفُ بَيْتِ عَمِّنَا السَّعِيدِ، وَهُوَ رَجُلٌ مُسِنٌّ يَسْكُنُ فِي حَيِّنَا. لَمْ يَتَأَخَّرِ الجِيرَانُ لَحْظَةً وَاحِدَةً، بَلْ اجْتَمَعَ [[المُتَطَوِّعُونَ]] وَأَحْضَرُوا الأَدَوَاتِ اللَّازِمَةَ، وَأَصْلَحُوا [[السَّقْفَ]] فِي وَقْتٍ وَجِيزٍ.',
					'شَكَرَ العَمُّ السَّعِيدُ أَبْنَاءَ حَيِّهِ وَالدُّمُوعُ تَمْلَأُ عَيْنَيْهِ، قَائِلاً: [[التَّعَاوُنُ]] نِعْمَةٌ عَظِيمَةٌ تُخَفِّفُ الشَّدَائِدَ وَتُقَوِّي الرَّوَابِطَ بَيْنَ المُسْلِمِينَ.'
				],
				author: 'نص تربوي في التضامن والتكافل',
				vocabulary: [
					{ word: 'وَجِيزٍ', meaning: 'قصير جداً' },
					{ word: 'الشَّدَائِدَ', meaning: 'الصعوبات والمحن' }
				],
				bestTitle: 'التضامن بين الجيران وقت الشدة',
				wrongTitles: [
					{ text: 'رحلة إلى حديقة الحيوانات', diagnosticFeedback: 'النص يتحدث عن تضامن الجيران ومساعدة رجل مسن.' },
					{ text: 'اختراع الهاتف المحمول', diagnosticFeedback: 'لا يتحدث النص عن الاختراعات التكنولوجية.' },
					{ text: 'السباحة في شاطئ البحر', diagnosticFeedback: 'تدور أحداث النص في يوم شاتٍ داخل الحي.' }
				],
				compQ: 'مَاذَا حَدَثَ لِبَيْتِ العَمِّ السَّعِيدِ؟ وَكَيْفَ تَصَرَّفَ الجِيرَانُ؟',
				compA: 'تضرّر سقف بيت العم السعيد بسبب عاصفة قوية، فهبّ الجيران المتطوعون وأحضروا الأدوات وأصلحوا السقف في وقت وجيز.',
				vocabQ: 'استخرجْ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «قَصِيرٍ»، وَضِدَّ كَلِمَةِ «تُضْعِفُ»، ثُمَّ وَظِّفْ إِحْدَاهُمَا فِي جُمْلَةٍ مُفِيدَةٍ.',
				vocabA: 'مرادف «قَصِيرٍ»: وَجِيزٍ — ضدّ «تُضْعِفُ»: تُقَوِّي. التوظيف: المطالعة تقوّي رصيدنا اللغوي.'
			},
			{
				title: 'الإِخْلَاصُ وَالأَمَانَةُ',
				paragraphs: [
					'وَجَدَ [[التِّلْمِيذَانِ]] أَمِينٌ وَعُمَرُ مِحْفَظَةَ نُقُودٍ سَاقِطَةً أَمَامَ بَابِ المَدْرَسَةِ. لَمْ يَتَرَدَّدَا لَحْظَةً، بَلْ سَلَّمَا [[المِحْفَظَةَ]] إِلَى مُدِيرِ المَدْرَسَةِ لِيُعِيدَهَا إِلَى صَاحِبِهَا.',
					'فِي الصَّبَاحِ التَّالِي، كَرَّمَ المُدِيرُ التِّلْمِيذَيْنِ أَمَامَ الجَمِيعِ وَقَالَ: [[الأَمَانَةُ]] صِفَةُ الأَنْبِيَاءِ وَالصَّالِحِينَ، وَبِهَا يَكْسِبُ الإِنْسَانُ رِضَا اللَّهِ وَثِقَةَ النَّاسِ.'
				],
				author: 'نص تربوي في الأمانة والصدق',
				vocabulary: [
					{ word: 'لَمْ يَتَرَدَّدَا', meaning: 'بادرا فوراً دون حيرة' },
					{ word: 'كَرَّمَ', meaning: 'أثنى عليهما وشجعهما' }
				],
				bestTitle: 'الأمانة ثمرة التربية الصالحة',
				wrongTitles: [
					{ text: 'فصل الربيع في البستان', diagnosticFeedback: 'النص يعرض موقفاً عملياً في الأمانة بالمدرسة.' },
					{ text: 'مباراة في كرة القدم', diagnosticFeedback: 'لا توجد مباراة رياضية في النص.' },
					{ text: 'طريق السلامة المرورية', diagnosticFeedback: 'موضوع النص هو الأمانة وردّ المفقودات.' }
				],
				compQ: 'مَاذَا وَجَدَ أَمِينٌ وَعُمَرُ؟ وَمَاذَا فَعَلَا بِمَا وَجَدَاهُ؟',
				compA: 'وجدا محفظة نقود أمام باب المدرسة، وسلّماها فوراً إلى مدير المدرسة ليعيدها إلى صاحبها.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «شَجَّعَ»، وَضِدَّ كَلِمَةِ «يَخْسَرُ».',
				vocabA: 'مرادف «شَجَّعَ»: كَرَّمَ — ضدّ «يَخْسَرُ»: يَكْسِبُ.'
			},
			{
				title: 'فَضْلُ العِلْمِ وَالمُعَلِّمِ',
				paragraphs: [
					'يَبْذُلُ [[المُعَلِّمُونَ]] جُهُوداً مُضَاعَفَةً كُلَّ يَوْمٍ لِتَرْبِيَةِ الأَجْيَالِ وَتَعْلِيمِهَا القِيَمَ الإِسْلَامِيَّةَ وَاللُّغَةَ العَرَبِيَّةَ. وَقَدْ حَثَّ العَلَّامَةُ مُحَمَّدُ البَشِيرُ الإِبْرَاهِيمِيُّ رَحِمَهُ اللَّهُ عَلَى تَوْقِيرِ المُعَلِّمِ وَطَلَبِ [[العِلْمَ]] بِجِدٍّ.',
					'إِنَّ [[الاِحْتِرَامَ]] وَاجِبٌ عَلَى كُلِّ تِلْمِيذٍ، فَمَنْ وَقَّرَ مُعَلِّمَهُ انْتَفَعَ بِعِلْمِهِ وَبُورِكَ لَهُ فِي مُسْتَقْبَلِهِ.'
				],
				author: 'نص تربوي في توقير المعلم',
				vocabulary: [
					{ word: 'تَوْقِيرِ', meaning: 'تعظيم واحترام شديد' },
					{ word: 'مُضَاعَفَةً', meaning: 'كبيرة وكثيرة' }
				],
				bestTitle: 'مكانة المعلم وواجب احترامه',
				wrongTitles: [
					{ text: 'أنواع الفواكه الموسمية', diagnosticFeedback: 'النص يتحدث عن فضل المعلم وطلب العلم.' },
					{ text: 'الحفاظ على مياه الأنهار', diagnosticFeedback: 'لا توجد إشارة للماء أو الأنهار في النص.' },
					{ text: 'قصة التاجر والمسافر', diagnosticFeedback: 'النص تربوي حول احترام المعلم.' }
				],
				compQ: 'عَلَامَ حَثَّ العَلَّامَةُ البَشِيرُ الإِبْرَاهِيمِيُّ رَحِمَهُ اللَّهُ؟ وَمَا جَزَاءُ مَنْ يُوَقِّرُ مُعَلِّمَهُ؟',
				compA: 'حثّ على توقير المعلم وطلب العلم بجدّ، وجزاء من يوقّر معلمه أن ينتفع بعلمه ويُبارَك له في مستقبله.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «اِحْتِرَامِ»، وَضِدَّ كَلِمَةِ «تَضَرَّرَ».',
				vocabA: 'مرادف «اِحْتِرَامِ»: تَوْقِيرِ — ضدّ «تَضَرَّرَ»: اِنْتَفَعَ.'
			}
		];

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.bestTitle, p.wrongTitles, rng);
		const plainPassage = p.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ السند الآتي بعناية ثم اختر الفكرة أو العنوان الأنسب له:\n«${plainPassage}»`,
			questionTextAr: 'اختر العنوان الأنسب لهذا النص:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `العنوان الأنسب هو «${p.bestTitle}» لأنه يجسّد القيمة التربوية المركزية في النص.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ النص قراءة واعية ثم أجب عن الأسئلة الآتية:',
			content: [
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً واستخرج القيمة الأخلاقية التي يدور حولها.',
				'صُغ إجابة الفهم بأسلوب واضح مع الاستعانة بأفكار النص.',
				'استعن بشرح المفردات وبسياق الجمل لتحديد المرادف والضد بدقة.'
			],
			solutionStepsAr: [
				`العنوان: «${p.bestTitle}».`,
				`الفهم: ${p.compA}`,
				`اللغة والمفردات: ${p.vocabA}`
			],
			finalAnswer: p.bestTitle
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي 1 (2 ن) — الفاعل + المفعول به + المبتدأ والخبر + إعراب
// ═══════════════════════════════════════════════════════════════════════════════
const failMafulMubtada4apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t1_fail_maful_mubtada',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: الفاعل والمفعول به والمبتدأ والخبر',
	curriculumLessonId: 'arb_lesson_4ap_t1_direct_object_maful',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				sentence: 'كَرَّمَ المُدِيرُ المُتَفَوِّقَاتِ. — التِّلْمِيذَانِ مُجْتَهِدَانِ.',
				irabEntries: [
					{ target: 'المُدِيرُ', irab: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'المُتَفَوِّقَاتِ', irab: 'مفعولٌ به منصوبٌ وعلامةُ نصبه الكسرةُ نيابةً عن الفتحةِ لأنّه جمعُ مؤنثٍ سالمٍ.', mark: '0.5' },
					{ target: 'التِّلْمِيذَانِ', irab: 'مبتدأٌ مرفوعٌ وعلامةُ رفعه الألفُ لأنّه مثنًّى.', mark: '0.5' }
				],
				transformPrompt: 'حوِّل الجملة الاسمية «المُتَعَاوِنُ مَحْبُوبٌ» إلى جمع المذكر السالم.',
				transformAns: 'المُتَعَاوِنُونَ مَحْبُوبُونَ.',
				mcqQ: 'ما علامةُ نصبِ المفعولِ به «المُتَفَوِّقَاتِ» في جملة «كَرَّمَ المُدِيرُ المُتَفَوِّقَاتِ»؟',
				mcqCorrect: 'الكسرةُ نيابةً عن الفتحةِ لأنه جمع مؤنث سالم',
				mcqDistractors: [
					{ text: 'الفتحةُ الظاهرةُ', diagnosticFeedback: 'جمع المؤنث السالم لا يُنصب بالفتحة أبداً.' },
					{ text: 'الياءُ لأنه مثنى', diagnosticFeedback: '«المُتَفَوِّقَاتِ» جمع مؤنث سالم وليس مثنى.' },
					{ text: 'الضمّةُ الظاهرةُ', diagnosticFeedback: 'الضمة علامة الرفع وليست للنصب.' }
				]
			},
			{
				sentence: 'يُحِبُّ اللَّهُ المُحْسِنِينَ. — الفَلَّاحُونَ نَشِيطُونَ.',
				irabEntries: [
					{ target: 'المُحْسِنِينَ', irab: 'مفعولٌ به منصوبٌ وعلامةُ نصبه الياءُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'الفَلَّاحُونَ', irab: 'مبتدأٌ مرفوعٌ وعلامةُ رفعه الواوُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'نَشِيطُونَ', irab: 'خبرٌ مرفوعٌ وعلامةُ رفعه الواوُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' }
				],
				transformPrompt: 'حوِّل الجملة «سَاعَدَ الجَارُ الفَقِيرَ» إلى المثنى (في الفاعل والمفعول به).',
				transformAns: 'سَاعَدَ الجَارَانِ الفَقِيرَيْنِ.',
				mcqQ: 'ما الإعرابُ الصحيحُ لكلمة «المُحْسِنِينَ» في جملة «يُحِبُّ اللَّهُ المُحْسِنِينَ»؟',
				mcqCorrect: 'مفعولٌ به منصوبٌ وعلامةُ نصبه الياءُ لأنه جمع مذكر سالم',
				mcqDistractors: [
					{ text: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الياءُ', diagnosticFeedback: 'الفاعل هو لفظ الجلالة «اللَّهُ»، والرفع في الجمع المذكر بالواو.' },
					{ text: 'مبتدأٌ مرفوعٌ وعلامةُ رفعه الواوُ', diagnosticFeedback: 'الجملة فعلية بدأت بالفعل «يُحِبُّ».' },
					{ text: 'اسمٌ مجرورٌ وعلامةُ جرِّه الياءُ', diagnosticFeedback: 'لا يوجد حرف جرّ قبلها.' }
				]
			},
			{
				sentence: 'اِشْتَرَى الوَالِدَانِ كِتَابَيْنِ. — الصِّدْقُ نَجَاةٌ.',
				irabEntries: [
					{ target: 'الوَالِدَانِ', irab: 'فاعلٌ مرفوعٌ وعلامةُ رفعه الألفُ لأنّه مثنًّى.', mark: '0.5' },
					{ target: 'كِتَابَيْنِ', irab: 'مفعولٌ به منصوبٌ وعلامةُ نصبه الياءُ لأنّه مثنًّى.', mark: '0.5' },
					{ target: 'نَجَاةٌ', irab: 'خبرٌ مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformPrompt: 'حوِّل الجملة «اِجْتَهَدَ التِّلْمِيذُ» إلى جمع المذكر السالم مع ضبط الفعل.',
				transformAns: 'اِجْتَهَدَ المُجْتَهِدُونَ (أو: اِجْتَهَدَ التَّلَامِيذُ — ويبقى الفعل مفرداً في أول الجملة).',
				mcqQ: 'ما علامةُ رفعِ الفاعلِ «الوَالِدَانِ» وعلامةُ نصبِ المفعولِ به «كِتَابَيْنِ»؟',
				mcqCorrect: 'الألفُ للفاعل والياءُ للمفعول به لأنهما مثنّى',
				mcqDistractors: [
					{ text: 'الضمّةُ للفاعل والفتحةُ للمفعول به', diagnosticFeedback: 'الكلمتان مثنّى وليستا مفردين.' },
					{ text: 'الواوُ للفاعل والياءُ للمفعول به', diagnosticFeedback: 'الواو لجمع المذكر السالم لا للمثنى.' },
					{ text: 'الياءُ للفاعل والألفُ للمفعول به', diagnosticFeedback: 'عكستَ علامتي المثنى: الرفع بالألف والنصب بالياء.' }
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
			explanation: `الصواب هو: «${b.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (الإعراب والتحويل)',
			points: 2,
			instruction: `اقرأ الجملتين: «${b.sentence}»، ثم أجب:`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمات الآتية إعراباً نموذجياً كاملاً:'
				},
				buildIrabTableBlock(b.irabEntries),
				{
					type: 'text',
					content: `2) ${b.transformPrompt}`,
					answer: b.transformAns,
					mark: '0.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الفاعل والمبتدأ والخبر مرفوعات (بالضمة أو الألف في المثنى أو الواو في جمع المذكر السالم).',
				'المفعول به منصوب دائماً (بالفتحة أو الياء أو الكسرة في جمع المؤنث السالم).',
				'تأكّد من نوع الاسم (مفرد / مثنى / جمع) قبل تحديد العلامة الإعرابية.'
			],
			solutionStepsAr: [
				...b.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`التحويل: ${b.transformAns}`
			],
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — التاء المفتوحة والمربوطة + همزتا الوصل والقطع
// ═══════════════════════════════════════════════════════════════════════════════
const taaHamza4apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t1_taa_hamza_tenses',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'spelling_imla',
	titleAr: 'الإملاء والصرف: التاء المفتوحة والمربوطة والهمزة الابتدائية',
	curriculumLessonId: 'arb_lesson_4ap_t1_taa_hamzat_spelling',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				rows: [
					{ word: 'أَوْقَاتٌ', rule: 'تاء مفتوحة: جمع تكسير لمفرد ثلاثي ساكن الوسط (وَقْت)' },
					{ word: 'قُضَاةٌ', rule: 'تاء مربوطة: جمع تكسير لا ينتهي مفرده بتاء (قاضٍ)' },
					{ word: 'إِحْسَانٌ', rule: 'همزة قطع: مصدر الفعل الرباعي (أَحْسَنَ)' },
					{ word: 'اِجْتَمَعَ', rule: 'همزة وصل: فعل ماضٍ خماسي' }
				],
				mcqQ: 'لماذا كُتبتِ الهمزةُ همزةَ وصلٍ في الفعل «اِجْتَمَعَ»؟',
				mcqCorrect: 'لأنه فعلٌ ماضٍ خماسيٌّ',
				mcqDistractors: [
					{ text: 'لأنه فعلٌ ماضٍ رباعيٌّ', diagnosticFeedback: 'الفعل الرباعي همزته همزة قطع مثل «أَكْرَمَ».' },
					{ text: 'لأنه فعلٌ مضارعٌ للمتكلم', diagnosticFeedback: 'المضارع للمتكلم همزته قطع مثل «أَجْتَمِعُ».' },
					{ text: 'لأنه حرفٌ من حروفِ الجرِّ', diagnosticFeedback: '«اِجْتَمَعَ» فعل وليس حرفاً.' }
				]
			},
			{
				rows: [
					{ word: 'سَاعَدَتْ', rule: 'تاء مفتوحة: في آخر الفعل الماضي' },
					{ word: 'مَدْرَسَةٌ', rule: 'تاء مربوطة: اسم مفرد مؤنث' },
					{ word: 'أَكْرَمَ', rule: 'همزة قطع: فعل ماضٍ رباعي' },
					{ word: 'اِسْتِقْبَالٌ', rule: 'همزة وصل: مصدر الفعل السداسي (اِسْتَقْبَلَ)' }
				],
				mcqQ: 'ما التعليلُ الصحيحُ لكتابةِ همزةِ «اِسْتِقْبَالٌ» همزةَ وصلٍ؟',
				mcqCorrect: 'لأنها مصدرُ فعلٍ سداسيٍّ (اِسْتَقْبَلَ)',
				mcqDistractors: [
					{ text: 'لأنها مصدرُ فعلٍ رباعيٍّ', diagnosticFeedback: 'مصدر الرباعي همزته قطع مثل «إِكْرَامٌ».' },
					{ text: 'لأنها اسمٌ من الأسماءِ السبعةِ', diagnosticFeedback: '«اِسْتِقْبَالٌ» مصدر فعل سداسي.' },
					{ text: 'لأنها تبدأ بـ (الـ) التعريف', diagnosticFeedback: 'لا توجد (الـ) التعريف في أول الكلمة.' }
				]
			},
			{
				rows: [
					{ word: 'مُعَلِّمَاتٌ', rule: 'تاء مفتوحة: جمع مؤنث سالم' },
					{ word: 'دُعَاةٌ', rule: 'تاء مربوطة: جمع تكسير لا ينتهي مفرده بتاء (داعٍ)' },
					{ word: 'أَسْتَغْفِرُ', rule: 'همزة قطع: فعل مضارع للمتكلم' },
					{ word: 'اُكْتُبْ', rule: 'همزة وصل: فعل أمر من الثلاثي (كَتَبَ)' }
				],
				mcqQ: 'لماذا كُتبتِ الهمزةُ همزةَ قطعٍ في «أَسْتَغْفِرُ» رغم أنّ الماضي «اِسْتَغْفَرَ» همزة وصل؟',
				mcqCorrect: 'لأن كلَّ فعلٍ مضارعٍ مبدوءٍ بهمزةِ المتكلمِ همزتُه قطعٌ',
				mcqDistractors: [
					{ text: 'لأنه فعلٌ ثلاثيٌّ ماضٍ', diagnosticFeedback: '«أَسْتَغْفِرُ» فعل مضارع وليس ماضياً ثلاثياً.' },
					{ text: 'لأنه جمعُ تكسيرٍ', diagnosticFeedback: '«أَسْتَغْفِرُ» فعل وليس اسماً.' },
					{ text: 'لأنه فعلُ أمرٍ', diagnosticFeedback: 'الأمر هو «اِسْتَغْفِرْ» بهمزة وصل.' }
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
			explanation: `التعليل الصحيح: ${b.mcqCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الإملاء (التاء المفتوحة والمربوطة والهمزة الابتدائية)',
			points: 2,
			instruction: 'علّل سبب كتابة التاء أو الهمزة في كل كلمة من الكلمات الآتية:',
			content: [
				{
					type: 'table',
					headers: ['الكلمة', 'التعليل الإملائي الصحيح'],
					cells: [],
					rows: b.rows.map((r) => [
						{ content: r.word, bold: true },
						{ content: '................................................................', answer: r.rule, mark: '0.5' }
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ميّز بين جمع المؤنث السالم (تاء مفتوحة) وجمع التكسير الذي لا ينتهي مفرده بتاء (تاء مربوطة).',
				'الرباعي وأمره ومصدره همزتها قطع، والخماسي والسداسي وأمر الثلاثي همزتها وصل.',
				'كل فعل مضارع للمتكلم (أَ...) همزته قطع دائماً.'
			],
			solutionStepsAr: b.rows.map((r) => `«${r.word}»: ${r.rule}.`),
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — فقرة منظمة من 6 إلى 8 أسطر
// ═══════════════════════════════════════════════════════════════════════════════
const integration4apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t1_written_integration',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: التضامن والإحسان والأخلاق الإسلامية',
	curriculumLessonId: 'arb_lesson_4ap_t1_mubtada_khabar',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topics = [
			{
				context: 'بمناسبة الدخول المدرسي، نظّمتْ مدرستُك حملةً تضامنيةً لجمع الأدوات المدرسية والمحافظ لفائدة التلاميذ المحتاجين.',
				supportQuote: 'المؤمنُ للمؤمنِ كالبنيانِ يشدُّ بعضُه بعضاً، ومن فرَّج عن أخيه كربةً فرَّج الله عنه.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تصف فيها هذه المبادرة التضامنية ومشاركتك فيها، مبيّناً أثر التعاون في نشر المحبة، موظفاً فاعلاً (مثنى أو جمع مذكر سالماً) وكلمة مبدوءة بهمزة قطع.',
				rubricCriteria: [
					'الملاءمة (التقيد بالتضامن المدرسي وحجم 6-8 أسطر): 1 ن',
					'الانسجام (مقدمة وعرض وخاتمة وأدوات ربط مناسبة): 0.75 ن',
					'سلامة اللغة وتوظيف فاعل مثنى/جمع مذكر وهمزة قطع: 0.75 ن',
					'الإتقان وجودة الخط واستعمال علامات الوقف: 0.5 ن'
				],
				modelOutline:
					'التضامن والتكافل من أعظم القيم التي دعانا إليها ديننا الإسلامي الحنيف. مع بداية الدخول المدرسي، نظّمت مدرستنا حملة خيرية لمساعدة التلاميذ المحتاجين. بادر المتطوعون والتلاميذ بإحضار المحافظ والكراريس والأقلام الجديدة، وأشرفتْ الإدارة على ترتيبها وتوزيعها بأدبٍ واحترام. شعرنا جميعاً بسعادة غامرة حين رأينا البسمة على وجوه إخواننا. فما أجمل التضامن الذي يقوّي الأخوّة ويجعل مجتمعنا متماسكاً!',
				mcqQ: 'أيُّ جملةٍ تجمعُ بين **فاعلٍ جمعِ مذكرٍ سالمٍ** و**همزةِ قطعٍ** بشكلٍ سليمٍ؟',
				mcqCorrect: 'أَحْضَرَ المُتَطَوِّعُونَ المَحَافِظَ وَالكَرَارِيسَ لِلمُحْتَاجِينَ.',
				mcqDistractors: [
					{ text: 'اِجْتَمَعَ التَّلَامِيذُ فِي السَّاحَةِ.', diagnosticFeedback: '«اِجْتَمَعَ» همزة وصل، و«التَّلَامِيذُ» جمع تكسير.' },
					{ text: 'شَكَرَ المُدِيرُ المُتَطَوِّعِينَ.', diagnosticFeedback: '«المُتَطَوِّعِينَ» هنا مفعول به لا فاعل، وتخلو من همزة قطع.' },
					{ text: 'التَّضَامُنُ خُلُقٌ إِسْلَامِيٌّ كَرِيمٌ.', diagnosticFeedback: 'هذه جملة اسمية لا يوجد فيها فاعل جمع مذكر سالم.' }
				]
			},
			{
				context: 'للمعلم فضل عظيم في تربية التلاميذ وتعليمهم العلوم النافعة والأخلاق الحميدة.',
				supportQuote: 'كادَ المعلمُ أن يكونَ رسولاً، واحترامُه واجبٌ على كلِّ متعلّمٍ.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تتحدث فيها عن دور المعلم في المجتمع وواجبك نحوه، موظفاً جملة اسمية (مبتدأ وخبراً) ومفعولاً به منصوباً بالياء أو الكسرة.',
				rubricCriteria: [
					'الملاءمة (دور المعلم وواجب التلميذ في 6-8 أسطر): 1 ن',
					'الانسجام (تسلسل الأفكار والربط وعلامات الوقف): 0.75 ن',
					'سلامة اللغة وتوظيف جملة اسمية ومفعول به مطلوب: 0.75 ن',
					'الإتقان وجودة العرض والخط: 0.5 ن'
				],
				modelOutline:
					'المعلمُ شمعةٌ تحترق لتنير درب الأجيال بالعلم والأخلاق. فهو يبذل جهداً كبيراً كل يوم داخل القسم ليشرح الدروس ويوجه التلاميذ إلى طريق الخير والنجاح. ولذلك يجب أن نحترم المعلمين وننصت إلى نصائحهم، وننجز واجباتنا بإتقان وأمانة. وبفضل جهودهم يرتقي وطننا الجزائر ويعمّ فيه الازدهار. فجزا الله معلمينا خير الجزاء وبارك في جهودهم.',
				mcqQ: 'أيُّ جملةٍ تشتملُ على **مفعولٍ به منصوبٍ بالياءِ** في موضوع احترام المعلم؟',
				mcqCorrect: 'يَحْتَرِمُ التَّلَامِيذُ المُعَلِّمِينَ وَيُقَدِّرُونَ جُهُودَهُمْ.',
				mcqDistractors: [
					{ text: 'يَجْتَهِدُ المُعَلِّمُونَ فِي تَعْلِيمِ الأَبْنَاءِ.', diagnosticFeedback: '«المُعَلِّمُونَ» هنا فاعل مرفوع بالواو لا مفعول به.' },
					{ text: 'المُعَلِّمُ مَحْبُوبٌ عِنْدَ الجَمِيعِ.', diagnosticFeedback: 'جملة اسمية ليس فيها مفعول به.' },
					{ text: 'نَسْتَمِعُ إِلَى المُعَلِّمِينَ بِأَدَبٍ.', diagnosticFeedback: '«المُعَلِّمِينَ» هنا اسم مجرور بـ «إلى» وليس مفعولاً به.' }
				]
			}
		];

		const t = rng.pick(topics);
		const mcq = buildUniqueMcqOptions(t.mcqCorrect, t.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: t.mcqQ,
			questionTextAr: t.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجملة الصحيحة هي «${t.mcqCorrect}» لأنها تحقق التوظيف النحوي والإملائي المطلوب بدقة.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 3,
			content: [
				buildWrittenProductionBlock({
					context: t.context,
					supportQuote: t.supportQuote,
					instruction: t.instruction,
					rubricCriteria: t.rubricCriteria,
					modelOutline: t.modelOutline,
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'التزم بحجم 6 إلى 8 أسطر مع ترك بياض في بداية الفقرة.',
				'نظّم أفكارك في مقدمة وعرض وخاتمة مع أدوات الربط وعلامات الوقف.',
				'تحقق من توظيف المطلوب النحوي والإملائي وسلامة التاء والهمزة.'
			],
			solutionStepsAr: [
				'تحليل السياق والتعليمة وتحديد عناصر العرض المطلوبة.',
				'مراجعة التوظيف النحوي والإملائي المطلوب بدقة.',
				`نموذج مقترح: ${t.modelOutline}`
			],
			finalAnswer: t.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T1: ArabicParameterizedTemplate[] = [
	readingComp4apT1,
	failMafulMubtada4apT1,
	taaHamza4apT1,
	integration4apT1
];
