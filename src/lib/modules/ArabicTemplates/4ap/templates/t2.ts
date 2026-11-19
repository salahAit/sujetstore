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
// 1. البناء الفكري (3 ن) — الهوية الوطنية والجزائر وحماية البيئة
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp4apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t2_reading_comprehension',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: الهوية الوطنية وحماية الطبيعة',
	curriculumLessonId: 'arb_lesson_4ap_t2_adjective_sifa',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'بَلَدُ المِلْيُونِ وَنِصْفِ المِلْيُونِ شَهِيدٍ',
				paragraphs: [
					'الجَزَائِرُ وَطَنٌ عَرِيقٌ ضَارِبٌ فِي أَعْمَاقِ التَّارِيخِ، جَاهَدَ أَبْنَاؤُهُ الأَبْطَالُ جِهَاداً طَوِيلاً لِطَرْدِ الاِسْتِعْمَارِ الغَاشِمِ. وَقَدْ قَادَ العُلَمَاءُ الجَزَائِرِيُّونَ مِثْلُ الإِمَامِ عَبْدِ الحَمِيدِ بْنِ بَادِيسَ مَعْرَكَةَ العِلْمِ وَالإِصْلَاحِ، فَأَصْبَحَ الشَّعْبُ [[مُتَمَسِّكاً]] بِدِينِهِ وَلُغَتِهِ العَرَبِيَّةِ.',
					'اليَوْمَ تَرْفَعُ الأَجْيَالُ الصَّاعِدَةُ عَلَمَ [[الجَزَائِرِ]] عَالِياً بِالعَمَلِ [[المُتْقَنِ]] وَالاِجْتِهَادِ فِي المَدَارِسِ وَالجَامِعَاتِ.'
				],
				author: 'نص تربوي في الهوية الوطنية',
				vocabulary: [
					{ word: 'عَرِيقٌ', meaning: 'أصيل وقديم في المجد والتاريخ' },
					{ word: 'الغَاشِمِ', meaning: 'الظالم المعتدي' }
				],
				bestTitle: 'الجزائر وطن العزّة والعلم والتضحية',
				wrongTitles: [
					{ text: 'رحلة بحرية إلى القطب الشمالي', diagnosticFeedback: 'النص يتحدث عن الجزائر وتاريخها وعلمائها.' },
					{ text: 'فوائد التمارين الرياضية', diagnosticFeedback: 'لا يتحدث النص عن الرياضة.' },
					{ text: 'صناعة الفخار التقليدي', diagnosticFeedback: 'يدور النص حول الهوية الوطنية وبطولات الجزائر.' }
				],
				compQ: 'مَا الدَّوْرُ الَّذِي قَامَ بِهِ الإِمَامُ عَبْدُ الحَمِيدِ بْنُ بَادِيسَ؟ وَكَيْفَ تَرْفَعُ الأَجْيَالُ اليَوْمَ عَلَمَ الجَزَائِرِ؟',
				compA: 'قاد معركة العلم والإصلاح فحافظ الشعب على دينه ولغته العربية، وترفع الأجيال اليوم علم الجزائر بالعمل المتقن والاجتهاد في الدراسة.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «الظَّالِمِ»، وَضِدَّ كَلِمَةِ «قَصِيراً».',
				vocabA: 'مرادف «الظَّالِمِ»: الغَاشِمِ — ضدّ «قَصِيراً»: طَوِيلاً.'
			},
			{
				title: 'حِمَايَةُ البِيئَةِ وَاجِبُ الجَمِيعِ',
				paragraphs: [
					'خَلَقَ اللَّهُ تَعَالَى الطَّبِيعَةَ فِي تَوَازُنٍ بَدِيعٍ، وَجَعَلَ الغَابَاتِ [[الخَضْرَاءَ]] رِئَةَ الأَرْضِ الَّتِي تُنَقِّي الهَوَاءَ. غَيْرَ أَنَّ التَّلَوُّثَ وَرَمْيَ النُّفَايَاتِ فِي غَيْرِ أَمَاكِنِهَا يُهَدِّدَانِ سَلَامَةَ [[البِيئَةِ]] وَصِحَّةَ الإِنْسَانِ.',
					'فَلْنَكُنْ حُرَّاساً أَوْفِيَاءَ لِطَبِيعَةِ وَطَنِنَا؛ نَغْرِسُ الأَشْجَارَ، وَنُحَافِظُ عَلَى نَظَافَةِ الشَّوَاطِئِ وَالغَابَاتِ، حَتَّى يَظَلَّ المَنَاخُ [[نَقِيّاً]] وَجَمِيلاً.'
				],
				author: 'نص تربوي في حماية البيئة',
				vocabulary: [
					{ word: 'بَدِيعٍ', meaning: 'متقن ورائع الجمال' },
					{ word: 'تُنَقِّي', meaning: 'تُصفّي وتنظّف' }
				],
				bestTitle: 'واجبنا نحو حماية البيئة والغابات',
				wrongTitles: [
					{ text: 'مسابقة في كتابة القصة', diagnosticFeedback: 'النص يعالج حماية البيئة والغابات من التلوث.' },
					{ text: 'زيارة الجدّ في العيد', diagnosticFeedback: 'لا توجد قصة عيد أو زيارة جدّ في النص.' },
					{ text: 'أهمية ممارسة السباحة', diagnosticFeedback: 'النص يركز على النظافة البيئية وحماية الغابات.' }
				],
				compQ: 'مَا الأَخْطَارُ الَّتِي تُهَدِّدُ سَلَامَةَ البِيئَةِ حَسَبَ النَّصِّ؟ وَاذْكُرْ سُلُوكَيْنِ لِحِمَايَتِهَا.',
				compA: 'التلوث ورمي النفايات في غير أماكنها يهددان البيئة، ومن سلوكات حمايتها: غرس الأشجار والمحافظة على نظافة الشواطئ والغابات.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «الأَوْسَاخِ»، وَضِدَّ كَلِمَةِ «مُلَوَّثاً».',
				vocabA: 'مرادف «الأَوْسَاخِ»: النُّفَايَاتِ — ضدّ «مُلَوَّثاً»: نَقِيّاً.'
			},
			{
				title: 'القَصَبَةُ وَتُرَاثُ الجَزَائِرِ',
				paragraphs: [
					'تَزْخَرُ بِلَادُنَا الجَزَائِرُ بِمَعَالِمَ تَارِيخِيَّةٍ شَاهِدَةٍ عَلَى عَظَمَةِ حَضَارَتِنَا الإِسْلَامِيَّةِ، مِثْلِ القَصَبَةِ العَتِيقَةِ وَجَامِعِ كِتْشَاوَةَ وَمَدِينَةِ تِلِمْسَانَ. قَدْ كَانَ المِعْمَارُ [[الجَزَائِرِيُّ]] آيَةً فِي الجَمَالِ وَالإِتْقَانِ.',
					'لِذَلِكَ يَجِبُ عَلَى أَبْنَاءِ [[الوَطَنِ]] أَنْ يَصُونُوا هَذَا التُّرَاثَ الأَصِيلَ، وَيُعَرِّفُوا بِهِ العَالَمَ، حَتَّى يَبْقَى تَارِيخُنَا [[حَاضِراً]] فِي كُلِّ زَمَانٍ.'
				],
				author: 'نص تربوي في التراث الوطني',
				vocabulary: [
					{ word: 'تَزْخَرُ', meaning: 'تمتلئ وتغتني' },
					{ word: 'يَصُونُوا', meaning: 'يحفظوا ويحموا' }
				],
				bestTitle: 'التراث الجزائري الأصيل وواجب صونه',
				wrongTitles: [
					{ text: 'التغذية المتوازنة للطفل', diagnosticFeedback: 'النص يتحدث عن المعالم التاريخية والتراث الجزائري.' },
					{ text: 'الطيور في فصل الخريف', diagnosticFeedback: 'لا يتحدث النص عن الطيور.' },
					{ text: 'دورة الماء في الطبيعة', diagnosticFeedback: 'موضوع النص هو التراث والمعالم الجزائرية.' }
				],
				compQ: 'اذكرْ مَعْلَمَيْنِ مِنْ مَعَالِمِ الجَزَائِرِ وَرَدَا فِي النَّصِّ. وَمَا وَاجِبُنَا نَحْوَ التُّرَاثِ؟',
				compA: 'من المعالم الواردة: القصبة العتيقة وجامع كتشاوة ومدينة تلمسان، وواجبنا أن نصون هذا التراث ونعرّف به العالم.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تَمْتَلِئُ»، وَضِدَّ كَلِمَةِ «غَائِباً».',
				vocabA: 'مرادف «تَمْتَلِئُ»: تَزْخَرُ — ضدّ «غَائِباً»: حَاضِراً.'
			}
		];

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.bestTitle, p.wrongTitles, rng);
		const plainPassage = p.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ السند الآتي ثم اختر العنوان الأنسب له:\n«${plainPassage}»`,
			questionTextAr: 'اختر العنوان المناسب للنص:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `العنوان الأنسب هو «${p.bestTitle}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ السند جيداً ثم أجب عن الأسئلة الآتية:',
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ الفقرتين معاً لاستخلاص الفكرة الشاملة للنص.',
				'استخرج الإجابة عن سؤال الفهم بدقة دون نسخ جمل غير متعلقة.',
				'تأكّد من وجود المرادف والضد داخل ألفاظ النص نفسه.'
			],
			solutionStepsAr: [
				`العنوان: «${p.bestTitle}».`,
				`الفهم: ${p.compA}`,
				`المفردات: ${p.vocabA}`
			],
			finalAnswer: p.bestTitle
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي 1 (2 ن) — الصفة + المضاف إليه + كان وأخواتها
// ═══════════════════════════════════════════════════════════════════════════════
const sifaMudafKana4apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t2_sifa_mudaf_kana',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: الصفة والمضاف إليه وكان وأخواتها',
	curriculumLessonId: 'arb_lesson_4ap_t2_mudaf_ilayhi',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				sentence: 'أَصْبَحَ الشَّعْبُ الجَزَائِرِيُّ حُرّاً بفضلِ تَضْحِيَاتِ الشُّهَدَاءِ.',
				irabEntries: [
					{ target: 'الجَزَائِرِيُّ', irab: 'صفةٌ مرفوعةٌ وعلامةُ رفعها الضمّةُ الظاهرةُ على آخرها.', mark: '0.5' },
					{ target: 'حُرّاً', irab: 'خبرُ «أَصْبَحَ» منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'الشُّهَدَاءِ', irab: 'مضافٌ إليه مجرورٌ وعلامةُ جرِّه الكسرةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformQ: 'أدخلْ «ظَلَّ» على جملة «المُجَاهِدُونَ صَامِدُونَ» واضبطها بالشكل.',
				transformA: 'ظَلَّ المُجَاهِدُونَ صَامِدِينَ.',
				mcqQ: 'ما الإعرابُ الصحيحُ لكلمة «الشُّهَدَاءِ» في «تَضْحِيَاتِ الشُّهَدَاءِ»؟',
				mcqCorrect: 'مضافٌ إليه مجرورٌ وعلامةُ جرِّه الكسرةُ الظاهرةُ',
				mcqDistractors: [
					{ text: 'صفةٌ مجرورةٌ وعلامةُ جرِّها الكسرةُ', diagnosticFeedback: '«تَضْحِيَاتِ» نكرة غير منونة و«الشُّهَدَاءِ» معرفة أُضيفت إليها.' },
					{ text: 'فاعلٌ مرفوعٌ بالضمةِ', diagnosticFeedback: 'الكلمة مجرورة بالكسرة وليست مرفوعة.' },
					{ text: 'خبرُ «أَصْبَحَ» منصوبٌ', diagnosticFeedback: 'خبر أصبح هو «حُرّاً».' }
				]
			},
			{
				sentence: 'كَانَ الفَلَّاحُونَ النَّشِيطُونَ يَعْتَنُونَ بِأَشْجَارِ البُسْتَانِ.',
				irabEntries: [
					{ target: 'الفَلَّاحُونَ', irab: 'اسمُ «كَانَ» مرفوعٌ وعلامةُ رفعه الواوُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'النَّشِيطُونَ', irab: 'صفةٌ مرفوعةٌ وعلامةُ رفعها الواوُ لأنّها جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'البُسْتَانِ', irab: 'مضافٌ إليه مجرورٌ وعلامةُ جرِّه الكسرةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformQ: 'أدخلْ «صَارَ» على جملة «البُسْتَانَانِ مُثْمِرَانِ» واضبطها بالشكل.',
				transformA: 'صَارَ البُسْتَانَانِ مُثْمِرَيْنِ.',
				mcqQ: 'ما الإعرابُ الصحيحُ لكلمة «النَّشِيطُونَ» في جملة «كَانَ الفَلَّاحُونَ النَّشِيطُونَ يَعْتَنُونَ بِالأَرْضِ»؟',
				mcqCorrect: 'صفةٌ مرفوعةٌ وعلامةُ رفعها الواوُ لأنها جمع مذكر سالم',
				mcqDistractors: [
					{ text: 'خبرُ «كَانَ» مرفوعٌ بالواوِ', diagnosticFeedback: 'خبر كان يكون منصوباً لا مرفوعاً.' },
					{ text: 'مضافٌ إليه مرفوعٌ بالواوِ', diagnosticFeedback: 'المضاف إليه مجرور دائماً.' },
					{ text: 'فاعلٌ مرفوعٌ بالواوِ', diagnosticFeedback: 'جاءت تصف «الفَلَّاحُونَ» وتطابقها في الأوجه الأربعة.' }
				]
			},
			{
				sentence: 'أَصْبَحَتِ الغَابَاتُ الكَثِيفَةُ مَحْمِيَّاتٍ بِجُهُودِ المُوَاطِنِينَ.',
				irabEntries: [
					{ target: 'الكَثِيفَةُ', irab: 'صفةٌ مرفوعةٌ وعلامةُ رفعها الضمّةُ الظاهرةُ على آخرها.', mark: '0.5' },
					{ target: 'مَحْمِيَّاتٍ', irab: 'خبرُ «أَصْبَحَتِ» منصوبٌ وعلامةُ نصبه الكسرةُ نيابةً عن الفتحةِ لأنّه جمعُ مؤنثٍ سالمٍ.', mark: '0.5' },
					{ target: 'المُوَاطِنِينَ', irab: 'مضافٌ إليه مجرورٌ وعلامةُ جرِّه الياءُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' }
				],
				transformQ: 'حوِّل الجملة «اِحْتَرَمْتُ قَانُونَ المَدْرَسَةِ» بجعل المضاف إليه مثنّى (قَانُونَ المَدْرَسَتَيْنِ) مع بيان علامة الجر.',
				transformA: 'اِحْتَرَمْتُ قَانُونَ المَدْرَسَتَيْنِ (علامة الجر: الياء لأنه مثنى).',
				mcqQ: 'ما علامةُ جرِّ المضافِ إليه «المُوَاطِنِينَ» في «بِجُهُودِ المُوَاطِنِينَ»؟',
				mcqCorrect: 'الياءُ لأنّه جمعُ مذكرٍ سالمٍ',
				mcqDistractors: [
					{ text: 'الكسرةُ الظاهرةُ', diagnosticFeedback: 'جمع المذكر السالم يُجر بالياء لا بالكسرة.' },
					{ text: 'الواوُ لأنّه جمعُ مذكرٍ سالمٍ', diagnosticFeedback: 'الواو علامة الرفع لا الجر.' },
					{ text: 'الفتحةُ الظاهرةُ', diagnosticFeedback: 'الفتحة على النون ليست علامة الإعراب هنا.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqQ,
			questionTextAr: s.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (الصفة والمضاف إليه وكان وأخواتها)',
			points: 2,
			instruction: `تأمّل الجملة الآتية: «${s.sentence}»، ثم أجب:`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمات الآتية إعراباً نموذجياً تاماً:'
				},
				buildIrabTableBlock(s.irabEntries),
				{
					type: 'text',
					content: `2) ${s.transformQ}`,
					answer: s.transformA,
					mark: '0.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الصفة تطابق الموصوف في التعريف/التنكير والحركة والنوع والعدد.',
				'المضاف إليه مجرور دائماً بالكسرة أو بالياء ويأتي بعد نكرة غير منونة.',
				'كان وأخواتها ترفع الاسم وتنصب الخبر (بالفتحة أو الياء أو الكسرة في جمع المؤنث).'
			],
			solutionStepsAr: [
				...s.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`التطبيق: ${s.transformA}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — الهمزة المتوسطة على الألف والواو والنبرة
// ═══════════════════════════════════════════════════════════════════════════════
const medialHamzaKana4apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t2_medial_hamza_kana',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'spelling_imla',
	titleAr: 'الإملاء: الهمزة المتوسطة على الألف والواو والنبرة',
	curriculumLessonId: 'arb_lesson_4ap_t2_medial_hamza',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				rows: [
					{ word: 'سَأَلَ', reason: 'على الألف: مفتوحة وما قبلها مفتوح' },
					{ word: 'مُؤْمِنٌ', reason: 'على الواو: ساكنة وما قبلها مضموم والضمة أقوى من السكون' },
					{ word: 'بِئْرٌ', reason: 'على النبرة: ساكنة وما قبلها مكسور والكسرة أقوى من السكون' },
					{ word: 'سُئِلَ', reason: 'على النبرة: مكسورة وما قبلها مضموم والكسرة أقوى من الضمة' }
				],
				mcqQ: 'لماذا كُتبتِ الهمزةُ المتوسطةُ على النبرةِ في كلمة «سُئِلَ»؟',
				mcqCorrect: 'لأنها مكسورة وما قبلها مضموم، والكسرة أقوى من الضمة',
				mcqDistractors: [
					{ text: 'لأنها مضمومة وما قبلها مكسور', diagnosticFeedback: 'في «سُئِلَ» السين مضمومة والهمزة مكسورة.' },
					{ text: 'لأنها مفتوحة وما قبلها ساكن', diagnosticFeedback: 'حركتا الحرفين هنا الضمة والكسرة.' },
					{ text: 'لأنها ساكنة وما قبلها مفتوح', diagnosticFeedback: 'الهمزة في «سُئِلَ» مكسورة لا ساكنة.' }
				]
			},
			{
				rows: [
					{ word: 'فَأْسٌ', reason: 'على الألف: ساكنة وما قبلها مفتوح والفتحة أقوى من السكون' },
					{ word: 'سُؤَالٌ', reason: 'على الواو: مفتوحة وما قبلها مضموم والضمة أقوى من الفتحة' },
					{ word: 'أَسْئِلَةٌ', reason: 'على النبرة: مكسورة وما قبلها ساكن والكسرة أقوى من السكون' },
					{ word: 'بِيئَةٌ', reason: 'على النبرة: مفتوحة بعد ياء ساكنة' }
				],
				mcqQ: 'اخترِ الكتابةَ الصحيحةَ للهمزةِ المتوسطةِ في الجملة: «أَجَابَ الرَّئِيسُ عَنْ ....... الصَّحَفِيِّ».',
				mcqCorrect: 'سُؤَالِ',
				mcqDistractors: [
					{ text: 'سُأَالِ', diagnosticFeedback: 'الضمة أقوى من الفتحة فتُكتب على الواو لا الألف.' },
					{ text: 'سُئَالِ', diagnosticFeedback: 'لا توجد كسرة في «سُؤَال» بل ضمة وفتحة.' },
					{ text: 'سُءَالِ', diagnosticFeedback: 'لا تُكتب على السطر هنا بل على الواو.' }
				]
			},
			{
				rows: [
					{ word: 'مَسْأَلَةٌ', reason: 'على الألف: مفتوحة وما قبلها ساكن والفتحة أقوى من السكون' },
					{ word: 'فُؤَادٌ', reason: 'على الواو: مفتوحة وما قبلها مضموم والضمة أقوى من الفتحة' },
					{ word: 'رَئِيسٌ', reason: 'على النبرة: مكسورة وما قبلها مفتوح والكسرة أقوى من الفتحة' },
					{ word: 'يَأْخُذُ', reason: 'على الألف: ساكنة وما قبلها مفتوح والفتحة أقوى من السكون' }
				],
				mcqQ: 'أيُّ كلمةٍ كُتبتْ همزتُها المتوسطةُ على **الألف** لأنها مفتوحة وما قبلها ساكن؟',
				mcqCorrect: 'مَسْأَلَةٌ',
				mcqDistractors: [
					{ text: 'فُؤَادٌ', diagnosticFeedback: '«فُؤَادٌ» على الواو لأن ما قبلها مضموم.' },
					{ text: 'رَئِيسٌ', diagnosticFeedback: '«رَئِيسٌ» على النبرة لأنها مكسورة.' },
					{ text: 'مُؤْمِنٌ', diagnosticFeedback: '«مُؤْمِنٌ» على الواو لأن ما قبلها مضموم.' }
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
			explanation: `الإجابة الصحيحة هي: «${b.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الإملاء (الهمزة المتوسطة)',
			points: 2,
			instruction: 'علّل سبب رسم الهمزة المتوسطة في الكلمات الآتية بذكر حركتها وحركة ما قبلها:',
			content: [
				{
					type: 'table',
					headers: ['الكلمة', 'التعليل الإملائي (حركة الهمزة وما قبلها)'],
					cells: [],
					rows: b.rows.map((r) => [
						{ content: r.word, bold: true },
						{ content: '................................................................', answer: r.reason, mark: '0.5' }
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'سلّم قوة الحركات: الكسرة ← الضمة ← الفتحة ← السكون.',
				'الكسرة تناسبها النبرة (ئـ)، والضمة تناسبها الواو (ؤ)، والفتحة تناسبها الألف (أ).',
				'تذكّر أن الياء الساكنة قبل الهمزة المفتوحة مثل «بِيئَةٌ» تناسبها النبرة.'
			],
			solutionStepsAr: b.rows.map((r) => `«${r.word}»: ${r.reason}.`),
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — فقرة منظمة من 6 إلى 8 أسطر
// ═══════════════════════════════════════════════════════════════════════════════
const integration4apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t2_written_integration',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: حب الوطن أو حماية الطبيعة والبيئة',
	curriculumLessonId: 'arb_lesson_4ap_t2_kana_sisters',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topics = [
			{
				context: 'بمناسبة ذكرى عيد الاستقلال أو يوم الشهيد، أردتَ أن تعبّر عن اعتزازك بوطنك الجزائر وتضحيات أجدادك.',
				supportQuote: 'قال الإمام عبد الحميد بن باديس رحمه الله: شعبُ الجزائرِ مسلمٌ وإلى العروبةِ ينتسبُ.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تبرز فيها جمال وطنك الجزائر وتضحيات شهدائنا الأبرار وواجبك في الحفاظ على أمانة الوطن، موظفاً صفة ومضافاً إليه وكان أو إحدى أخواتها.',
				rubricCriteria: [
					'الملاءمة (حب الوطن والتضحية والواجب في 6-8 أسطر): 1 ن',
					'الانسجام (مقدمة وعرض وخاتمة وتوظيف الروابط): 0.75 ن',
					'سلامة اللغة وتوظيف صفة ومضاف إليه وكان أو إحدى أخواتها: 0.75 ن',
					'الإتقان وجودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'الجزائرُ وطنٌ غالٍ وعريقٌ يسكن في قلوب أبنائه المخلصين. لقد كان أجدادنا المجاهدون صامدين في وجه الاستعمار، وقدّموا أرواحهم الغالية حتى ننعم اليوم بالحرية والأمان. وتتميز بلادنا بطبيعة ساحرة تجمع بين الشواطئ الجميلة والجبال الشامخة والصحراء الواسعة. ولذلك يجب علينا نحن تلاميذ المدرسة أن نجتهد في طلب العلم ونحافظ على ممتلكات الوطن. اللهم احفظ الجزائر وأدم عليها نعمة الأمن والإيمان.',
				mcqQ: 'أيُّ جملةٍ توظّفُ **كانَ أو إحدى أخواتِها** و**صفةً** بشكلٍ صحيحٍ في موضوع الوطن؟',
				mcqCorrect: 'كَانَ الشَّعْبُ الجَزَائِرِيُّ صَامِداً فِي وَجْهِ الاِسْتِعْمَارِ.',
				mcqDistractors: [
					{ text: 'كَانَ الشَّعْبُ الجَزَائِرِيُّ صَامِدٌ.', diagnosticFeedback: 'خبر «كان» يجب أن يكون منصوباً: «صَامِداً».' },
					{ text: 'الجَزَائِرُ بَلَدٌ وَاسِعٌ وَجَمِيلٌ.', diagnosticFeedback: 'لا توجد فيها «كان» ولا إحدى أخواتها.' },
					{ text: 'أَصْبَحَ الوَطَنَ حُرّاً وَمُسْتَقِلّاً.', diagnosticFeedback: 'اسم «أصبح» يجب أن يكون مرفوعاً بالضمة: «الوَطَنُ».' }
				]
			},
			{
				context: 'في عطلة الربيع، خرجتَ مع عائلتك إلى إحدى الغابات الجميلة، ولاحظتَ بعض النفايات التي تركها الزوار.',
				supportQuote: 'النظافةُ من الإيمانِ، وحمايةُ البيئةِ مسؤوليةُ كلِّ فردٍ في المجتمعِ.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تصف فيها جمال الغابة وما قمتَ به لتنظيفها، وتوجّه نصيحة للمواطنين لحماية البيئة، موظفاً مضافاً إليه وكلمة بها همزة متوسطة.',
				rubricCriteria: [
					'الملاءمة (وصف الغابة وحماية البيئة في 6-8 أسطر): 1 ن',
					'الانسجام والترابط وحسن استعمال الروابط: 0.75 ن',
					'سلامة اللغة وتوظيف مضاف إليه وهمزة متوسطة: 0.75 ن',
					'الإتقان وجودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'في عطلة الربيع، توجهتُ مع أسرتي إلى غابة قريبة للاستمتاع بهوائها النقي وأشجارها الظليلة. غير أنني حزنتُ عندما رأيتُ أكياساً ونفايات مرمية تحت أغصان الصنوبر. فأخذنا أكياس القمامة وتعاونّا في جمع الأوساخ حتى عاد المكان نظيفاً يسرّ الناظرين. إنّ حماية البيئة مسؤولية الجميع، لأن الغابة تمنحنا الهواء العليل والجمال. فأنصح كل زائر أن يحافظ على نظافة الغابات ولا يُشعل النار فيها.',
				mcqQ: 'أيُّ جملةٍ تشتملُ على **همزةٍ متوسطةٍ صحيحةٍ** و**مضافٍ إليه** في موضوع البيئة؟',
				mcqCorrect: 'حِمَايَةُ البِيئَةِ مَسْؤُولِيَّةُ الجَمِيعِ.',
				mcqDistractors: [
					{ text: 'حِمَايَةُ البِيأَةِ مَسْأُولِيَّةُ الجَمِيعِ.', diagnosticFeedback: 'خطأ في رسم الهمزتين: الصواب «البِيئَةِ» و«مَسْؤُولِيَّةُ».' },
					{ text: 'نُحَافِظُ عَلَى الغَابَاتِ الخَضْرَاءِ.', diagnosticFeedback: 'لا يوجد فيها همزة متوسطة ولا مضاف إليه.' },
					{ text: 'اِجْتَمَعَ الأَطْفَالُ فِي الحَدِيقَةِ.', diagnosticFeedback: 'تخلو من الهمزة المتوسطة والمضاف إليه.' }
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
			explanation: `الصواب هو: «${t.mcqCorrect}».`
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'التزم بعدد الأسطر (6 إلى 8 أسطر) وقسّم فقرتك إلى مقدمة وعرض وخاتمة.',
				'وظّف المطلوب النحوي والإملائي واضبط آخره بالشكل الصحيح.',
				'راجع إملاء الهمزات المتوسطة وعلامات الوقف قبل النهاية.'
			],
			solutionStepsAr: [
				'تحديد الأفكار الأساسية وكتابتها بأسلوب متماسك وواضح.',
				'التحقق من توظيف الظواهر اللغوية المطلوبة في التعليمة.',
				`نموذج مقترح: ${t.modelOutline}`
			],
			finalAnswer: t.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T2: ArabicParameterizedTemplate[] = [
	readingComp4apT2,
	sifaMudafKana4apT2,
	medialHamzaKana4apT2,
	integration4apT2
];
