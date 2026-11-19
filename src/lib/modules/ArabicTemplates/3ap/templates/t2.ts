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
// 1. البناء الفكري (3 ن) — الهوية الوطنية والطبيعة والبيئة
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp3apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t2_reading_comprehension',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: حب الوطن والمحافظة على البيئة',
	curriculumLessonId: 'arb_lesson_3ap_t2_prepositions_majrur',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'وَطَنِي الجَزَائِرُ',
				paragraphs: [
					'الجَزَائِرُ وَطَنٌ عَزِيزٌ كَبِيرٌ، حَبَاهُ اللَّهُ بِطَبِيعَةٍ خَلَّابَةٍ تَجْمَعُ بَيْنَ البَحْرِ وَالجِبَالِ وَالصَّحْرَاءِ الوَاسِعَةِ. وَقَدْ دَافَعَ أَجْدَادُنَا الأَبْطَالُ عَنْ [[الوَطَنِ]] بِشَجَاعَةٍ حَتَّى نَالَ الحُرِّيَّةَ وَالاِسْتِقْلَالَ.',
					'نَحْنُ [[التَّلَامِيذُ]] نُحِبُّ الجَزَائِرَ حُبّاً صَادِقاً، وَنَجْتَهِدُ فِي طَلَبِ العِلْمِ لِنَبْنِيَهَا وَنَرْفَعَ رَايَتَهَا عَالِياً بَيْنَ الأُمَمِ.'
				],
				author: 'نص تربوي في حب الوطن',
				vocabulary: [
					{ word: 'حَبَاهُ', meaning: 'أعطاه ومنحه' },
					{ word: 'خَلَّابَةٍ', meaning: 'جميلة جداً' }
				],
				bestTitle: 'وطني الحبيب الجزائر',
				wrongTitles: [
					{ text: 'التغذية الصحية السليمة', diagnosticFeedback: 'النص يتحدث عن الجزائر وطبيعتها وتضحيات الأجداد.' },
					{ text: 'آداب زيارة المريض', diagnosticFeedback: 'لا يتناول النص موضوع زيارة المريض.' },
					{ text: 'فوائد الحاسوب الحديث', diagnosticFeedback: 'النص يدور حول حب الوطن الجزائر.' }
				],
				compQ: 'بِمَ تَتَمَيَّزُ طَبِيعَةُ الجَزَائِرِ؟ وَكَيْفَ نَخْدِمُ وَطَنَنَا اليَوْمَ؟',
				compA: 'تجمع طبيعة الجزائر بين البحر والجبال والصحراء الواسعة، ونخدم وطننا بالاجتهاد في طلب العلم.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «جَمِيلَةٍ جِدّاً»، وَضِدَّ كَلِمَةِ «الضَّيِّقَةِ».',
				vocabA: 'مرادف «جَمِيلَةٍ جِدّاً»: خَلَّابَةٍ — ضدّ «الضَّيِّقَةِ»: الوَاسِعَةِ.'
			},
			{
				title: 'الشَّجَرَةُ صَدِيقَةُ الإِنْسَانِ',
				paragraphs: [
					'خَرَجَ تَلَامِيذُ القِسْمِ [[إِلَى]] [[الغَابَةِ]] القَرِيبَةِ فِي يَوْمِ الشَّجَرَةِ. غَرَسَ كُلُّ تِلْمِيذٍ شُجَيْرَةً صَغِيرَةً، ثُمَّ سَقَاهَا بِالمَاءِ العَذْبِ.',
					'قَالَ المُعَلِّمُ: الشَّجَرَةُ نِعْمَةٌ عَظِيمَةٌ؛ فَهِيَ تُنَقِّي الهَوَاءَ وَتُعْطِينَا الظِّلَّ وَالثِّمَارَ، لِذَلِكَ يَجِبُ عَلَيْنَا حِمَايَتُهَا وَعَدَمُ قَطْعِ أَغْصَانِهَا.'
				],
				author: 'نص تربوي في المحافظة على البيئة',
				vocabulary: [
					{ word: 'تُنَقِّي', meaning: 'تُصفّي وتُنظّف' },
					{ word: 'العَذْبِ', meaning: 'الصافي الحلو الصالح للشرب' }
				],
				bestTitle: 'فوائد الشجرة والمحافظة عليها',
				wrongTitles: [
					{ text: 'رحلة بالقطار السريع', diagnosticFeedback: 'النص يتحدث عن يوم الشجرة وفوائدها.' },
					{ text: 'قصة البائع الأمين', diagnosticFeedback: 'لا توجد قصة بائع في هذا النص.' },
					{ text: 'الاحتفال بعيد الفطر', diagnosticFeedback: 'النص يتحدث عن الغابة والشجرة.' }
				],
				compQ: 'مَاذَا فَعَلَ التَّلَامِيذُ فِي يَوْمِ الشَّجَرَةِ؟ وَاذْكُرْ فَائِدَتَيْنِ لِلشَّجَرَةِ مِنَ النَّصِّ.',
				compA: 'غرس كلّ تلميذ شجيرة صغيرة وسقاها بالماء العذب. من فوائد الشجرة: تنقي الهواء وتعطينا الظل والثمار.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تُصَفِّي»، وَضِدَّ كَلِمَةِ «البَعِيدَةِ».',
				vocabA: 'مرادف «تُصَفِّي»: تُنَقِّي — ضدّ «البَعِيدَةِ»: القَرِيبَةِ.'
			},
			{
				title: 'قَطْرَةُ المَاءِ حَيَاةٌ',
				paragraphs: [
					'المَاءُ نِعْمَةٌ كُبْرَى أَنْعَمَ اللَّهُ بِهَا عَلَى الإِنْسَانِ وَالحَيَوَانِ وَالنَّبَاتِ. لِذَلِكَ نَرَاهُ يَجْرِي فِي [[الأَنْهَارِ]] وَيَتَدَفَّقُ [[مِنَ]] اليَنَابِيعِ لِيَسْقِيَ الأَرْضَ العَطْشَى.',
					'فَلْنُحَافِظْ عَلَى هَذِهِ النِّعْمَةِ بِغَلْقِ الحَنَفِيَّةِ جَيِّداً بَعْدَ الاِسْتِعْمَالِ، وَتَجَنُّبِ التَّبْذِيرِ؛ فَالمُسْرِفُ يَضُرُّ نَفْسَهُ وَمُجْتَمَعَهُ.'
				],
				author: 'نص تربوي في الحفاظ على الماء',
				vocabulary: [
					{ word: 'يَتَدَفَّقُ', meaning: 'يخرج بقوة وكثرة' },
					{ word: 'التَّبْذِيرِ', meaning: 'الإسراف وتضييع النعمة' }
				],
				bestTitle: 'نعمة الماء وواجبنا نحوها',
				wrongTitles: [
					{ text: 'مكتبة المدرسة الكبيرة', diagnosticFeedback: 'النص يتحدث عن الماء وعدم تبذيره.' },
					{ text: 'أدوات الفلاح في الحقل', diagnosticFeedback: 'المحور الأساسي هو قيمة الماء.' },
					{ text: 'فصل الخريف والأمطار', diagnosticFeedback: 'النص يركز على نعمة الماء والمحافظة عليها.' }
				],
				compQ: 'كَيْفَ نُحَافِظُ عَلَى نِعْمَةِ المَاءِ حَسَبَ النَّصِّ؟',
				compA: 'نحافظ على الماء بغلق الحنفية جيداً بعد الاستعمال وتجنّب التبذير والإسراف.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «الإِسْرَافِ»، وَضِدَّ كَلِمَةِ «يَنْفَعُ».',
				vocabA: 'مرادف «الإِسْرَافِ»: التَّبْذِيرِ — ضدّ «يَنْفَعُ»: يَضُرُّ.'
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
			explanation: `العنوان الأنسب هو «${p.bestTitle}» لأنه يعبّر بدقة عن مضمون النص.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ السند جيداً ثم أجب عن الأسئلة:',
			content: [
				buildProsePassageBlock({
					title: p.title,
					paragraphs: p.paragraphs,
					author: p.author,
					vocabulary: p.vocabulary
				}),
				{
					type: 'text',
					content: '1) اختر عنواناً مناسباً للنص.',
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'حدّد الكلمة التي تتكرّر فكرتُها في النص لاختيار العنوان.',
				'استعن بجمل النص للإجابة عن سؤال الفهم بلغة سليمة.',
				'ابحث داخل النص نفسه عن المرادف والضد المطلوبين.'
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
// 2. البناء اللغوي 1 (2 ن) — المفرد والمثنى والجمع + الجار والمجرور والإعراب
// ═══════════════════════════════════════════════════════════════════════════════
const numberPrepositions3apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t2_number_prepositions',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: المفرد والمثنى والجمع والجار والمجرور',
	curriculumLessonId: 'arb_lesson_3ap_t2_singular_dual_plural',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const items = [
			{
				singularSentence: 'دَافَعَ البَطَلُ عَنِ الوَطَنِ.',
				dualSentence: 'دَافَعَ البَطَلَانِ عَنِ الوَطَنِ.',
				pluralSentence: 'دَافَعَ الأَبْطَالُ عَنِ الوَطَنِ.',
				irabEntries: [
					{ target: 'عَنِ', irab: 'حرفُ جرٍّ.', mark: '0.5' },
					{ target: 'الوَطَنِ', irab: 'اسمٌ مجرورٌ بـ «عَنْ» وعلامةُ جرِّه الكسرةُ الظاهرةُ على آخرِه.', mark: '0.5' }
				],
				mcqQ: 'ما الإعرابُ الصحيحُ لكلمةِ «الوَطَنِ» في جملة «دَافَعَ البَطَلُ عَنِ الوَطَنِ»؟',
				mcqCorrect: 'اسمٌ مجرورٌ وعلامةُ جرِّه الكسرةُ',
				mcqDistractors: [
					{ text: 'فاعلٌ مرفوعٌ بالضمةِ', diagnosticFeedback: 'الفاعل هنا هو «البَطَلُ»، أما «الوَطَنِ» فمسبوق بحرف جر.' },
					{ text: 'فعلٌ ماضٍ مبنيٌّ على الفتحِ', diagnosticFeedback: '«الوَطَنِ» اسم يبدأ بـ (الـ) وليس فعلاً.' },
					{ text: 'حرفُ جرٍّ', diagnosticFeedback: 'حرف الجر هو «عَنِ»، أما «الوَطَنِ» فهو الاسم المجرور.' }
				]
			},
			{
				singularSentence: 'غَرَسَ التِّلْمِيذُ شُجَيْرَةً فِي الحَدِيقَةِ.',
				dualSentence: 'غَرَسَ التِّلْمِيذَانِ شُجَيْرَةً فِي الحَدِيقَةِ.',
				pluralSentence: 'غَرَسَ التَّلَامِيذُ شُجَيْرَةً فِي الحَدِيقَةِ.',
				irabEntries: [
					{ target: 'فِي', irab: 'حرفُ جرٍّ.', mark: '0.5' },
					{ target: 'الحَدِيقَةِ', irab: 'اسمٌ مجرورٌ بـ «فِي» وعلامةُ جرِّه الكسرةُ الظاهرةُ على آخرِه.', mark: '0.5' }
				],
				mcqQ: 'ما المثنّى الصحيحُ لكلمةِ «شُجَيْرَةٌ»؟',
				mcqCorrect: 'شُجَيْرَتَانِ',
				mcqDistractors: [
					{ text: 'شُجَيْرَاتٌ', diagnosticFeedback: '«شُجَيْرَاتٌ» جمع مؤنث سالم وليس مثنى.' },
					{ text: 'أَشْجَارٌ', diagnosticFeedback: '«أَشْجَارٌ» جمع تكسير.' },
					{ text: 'شُجَيْرَةَانِ', diagnosticFeedback: 'عند التثنية تُفتح التاء المربوطة فتُكتب «شُجَيْرَتَانِ».' }
				]
			},
			{
				singularSentence: 'عَادَ الفَلَّاحُ مِنَ الحَقْلِ مَسْرُوراً.',
				dualSentence: 'عَادَ الفَلَّاحَانِ مِنَ الحَقْلِ مَسْرُورَيْنِ.',
				pluralSentence: 'عَادَ الفَلَّاحُونَ مِنَ الحَقْلِ مَسْرُورِينَ.',
				irabEntries: [
					{ target: 'مِنَ', irab: 'حرفُ جرٍّ.', mark: '0.5' },
					{ target: 'الحَقْلِ', irab: 'اسمٌ مجرورٌ بـ «مِنْ» وعلامةُ جرِّه الكسرةُ الظاهرةُ على آخرِه.', mark: '0.5' }
				],
				mcqQ: 'اخترْ حرفَ الجرِّ الذي يناسبُ الفراغَ: «عَادَ الفَلَّاحُ ....... الحَقْلِ».',
				mcqCorrect: 'مِنَ',
				mcqDistractors: [
					{ text: 'عَلَى', diagnosticFeedback: 'لا نقول «عاد على الحقل».' },
					{ text: 'بِـ', diagnosticFeedback: 'الباء تفيد الوسيلة لا مكان العودة.' },
					{ text: 'كَـ', diagnosticFeedback: 'الكاف للتشبيه لا للعودة من مكان.' }
				]
			}
		];

		const it = rng.pick(items);
		const mcq = buildUniqueMcqOptions(it.mcqCorrect, it.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: it.mcqQ,
			questionTextAr: it.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${it.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (العدد والجار والمجرور)',
			points: 2,
			instruction: 'حوّل وأعرب ما يلي:',
			content: [
				{
					type: 'text',
					content: `1) حوّل الجملة الآتية إلى المثنى ثم إلى الجمع: «${it.singularSentence}»`,
					answer: `المثنى: «${it.dualSentence}» — الجمع: «${it.pluralSentence}».`,
					mark: '1'
				},
				{
					type: 'text',
					content: '2) أعرب الجار والمجرور في الجملة إعراباً نموذجياً:'
				},
				buildIrabTableBlock(it.irabEntries)
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'في المثنى نزيد ألفاً ونوناً (انِ) على الفاعل المفرد.',
				'الاسم بعد حرف الجر (مِنْ، إِلَى، عَنْ، عَلَى، فِي) يُجرّ بالكسرة.',
				'اذكر حرف الجرّ ثم علامة الجر (الكسرة الظاهرة على آخره).'
			],
			solutionStepsAr: [
				`المثنى: ${it.dualSentence}`,
				`الجمع: ${it.pluralSentence}`,
				...it.irabEntries.map((e) => `${e.target}: ${e.irab}`)
			],
			finalAnswer: it.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — الضمائر المنفصلة وتصريف الفعل + الإشارة والموصول
// ═══════════════════════════════════════════════════════════════════════════════
const pronounsDemonstratives3apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t2_pronouns_demonstratives',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'morphology_sarf',
	titleAr: 'الصرف والتركيب: الضمائر المنفصلة وأسماء الإشارة والموصول',
	curriculumLessonId: 'arb_lesson_3ap_t2_detached_pronouns_conjugation',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				baseSentence: 'هُوَ يَحْمِي الغَابَةَ.',
				t1Pron: 'نَحْنُ',
				t1Ans: 'نَحْنُ نَحْمِي الغَابَةَ.',
				t2Pron: 'أَنْتُمْ',
				t2Ans: 'أَنْتُمْ تَحْمُونَ الغَابَةَ.',
				fillPrompt: '....... التِّلْمِيذَةُ هِيَ ....... غَرَسَتِ الشُّجَيْرَةَ.',
				fillAns: 'هَذِهِ التِّلْمِيذَةُ هِيَ الَّتِي غَرَسَتِ الشُّجَيْرَةَ.',
				mcqQ: 'اخترْ الصيغةَ الصحيحةَ للجملة مع الضمير «أَنْتُمْ»: «هُوَ يَحْمِي الغَابَةَ».',
				mcqCorrect: 'أَنْتُمْ تَحْمُونَ الغَابَةَ.',
				mcqDistractors: [
					{ text: 'أَنْتُمْ يَحْمُونَ الغَابَةَ.', diagnosticFeedback: 'مع المخاطب «أَنْتُمْ» نبدأ الفعل بتاء المضارعة لا الياء.' },
					{ text: 'أَنْتُمْ تَحْمِي الغَابَةَ.', diagnosticFeedback: '«تَحْمِي» للمفرد المخاطَب، أما «أَنْتُمْ» فللجمع.' },
					{ text: 'أَنْتُمْ حَمَوْا الغَابَةَ.', diagnosticFeedback: 'الفعل في الجملة مضارع، ومع «أنتم» في الماضي نقول «حَمَيْتُمْ».' }
				]
			},
			{
				baseSentence: 'هُوَ غَرَسَ زَيْتُونَةً فِي الحَدِيقَةِ.',
				t1Pron: 'أَنَا',
				t1Ans: 'أَنَا غَرَسْتُ زَيْتُونَةً فِي الحَدِيقَةِ.',
				t2Pron: 'هُنَّ',
				t2Ans: 'هُنَّ غَرَسْنَ زَيْتُونَةً فِي الحَدِيقَةِ.',
				fillPrompt: '....... العُمَّالُ هُمُ ....... نَظَّفُوا الشَّارِعَ.',
				fillAns: 'هَؤُلَاءِ العُمَّالُ هُمُ الَّذِينَ نَظَّفُوا الشَّارِعَ.',
				mcqQ: 'أكملْ باسمِ الإشارةِ والاسمِ الموصولِ الصحيحين: «....... العُمَّالُ هُمُ ....... نَظَّفُوا الشَّارِعَ».',
				mcqCorrect: 'هَؤُلَاءِ — الَّذِينَ',
				mcqDistractors: [
					{ text: 'هَذِهِ — الَّتِي', diagnosticFeedback: '«العُمَّالُ» جمع مذكر عاقل وليس مؤنثاً أو غير عاقل.' },
					{ text: 'هَذَانِ — اللَّذَانِ', diagnosticFeedback: '«العُمَّالُ» جمع وليس مثنى.' },
					{ text: 'هَذَا — الَّذِي', diagnosticFeedback: '«هَذَا والَّذِي» للمفرد المذكر.' }
				]
			},
			{
				baseSentence: 'هِيَ تُحَافِظُ عَلَى المَاءِ.',
				t1Pron: 'أَنْتِ',
				t1Ans: 'أَنْتِ تُحَافِظِينَ عَلَى المَاءِ.',
				t2Pron: 'هُمْ',
				t2Ans: 'هُمْ يُحَافِظُونَ عَلَى المَاءِ.',
				fillPrompt: '....... الأَشْجَارُ هِيَ ....... تُنَقِّي الهَوَاءَ.',
				fillAns: 'هَذِهِ الأَشْجَارُ هِيَ الَّتِي تُنَقِّي الهَوَاءَ.',
				mcqQ: 'ما اسمُ الإشارةِ والاسمُ الموصولُ المناسبانِ لجمعِ غيرِ العاقل «الأَشْجَارُ»؟',
				mcqCorrect: 'هَذِهِ — الَّتِي',
				mcqDistractors: [
					{ text: 'هَؤُلَاءِ — الَّذِينَ', diagnosticFeedback: '«هَؤُلَاءِ» لجمع العاقل فقط، أما الأشجار فغير عاقل.' },
					{ text: 'هَذَا — الَّذِي', diagnosticFeedback: '«هَذَا» للمفرد المذكر.' },
					{ text: 'هَاتَانِ — اللَّتَانِ', diagnosticFeedback: '«هَاتَانِ» للمثنى المؤنث.' }
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
			explanation: `الصواب هو: «${s.mcqCorrect}» لمطابقة الفعل أو اسم الإشارة والاسم الموصول للضمير والاسم المشار إليه.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الصرف والتركيب (الضمائر والإشارة والموصول)',
			points: 2,
			instruction: 'صرّف وأكمل بما يناسب:',
			content: [
				{
					type: 'text',
					content: `1) حوّل الجملة الآتية إلى الضميرين المطلوبين: «${s.baseSentence}» — مع (${s.t1Pron}) ومع (${s.t2Pron}).`,
					answer: `• ${s.t1Ans}\n• ${s.t2Ans}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) املأ الفراغ باسم الإشارة والاسم الموصول المناسبين: «${s.fillPrompt}»`,
					answer: s.fillAns,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'انتبه إلى زمن الفعل (ماضٍ أم مضارع) قبل التصريف.',
				'تذكّر أن جمع غير العاقل نُشير إليه بـ «هَذِهِ» ونصله بـ «الَّتِي».',
				'لا نكتب ألفاً بعد الهاء في «هذا، هذه، هؤلاء».'
			],
			solutionStepsAr: [
				`التصريف مع ${s.t1Pron}: ${s.t1Ans}`,
				`التصريف مع ${s.t2Pron}: ${s.t2Ans}`,
				`ملء الفراغ: ${s.fillAns}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — حب الوطن أو حماية الطبيعة (4-6 أسطر)
// ═══════════════════════════════════════════════════════════════════════════════
const integration3apT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t2_written_integration',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: حب الوطن والمحافظة على الطبيعة',
	curriculumLessonId: 'arb_lesson_3ap_t2_demonstrative_relative_nouns',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topics = [
			{
				context: 'بمناسبة اليوم العالمي للشجرة، نظّمتْ مدرستك حملة لغرس الأشجار وتنظيف الساحة والحديقة.',
				supportQuote: 'من غرسَ شجرةً انتفعَ بها الإنسانُ والطيرُ، وكان له بها أجرٌ عند الله.',
				instruction: 'اكتب فقرة من 4 إلى 6 أسطر تصف فيها هذه الحملة وتذكر فوائد الشجرة وواجبنا نحوها، موظفاً جاراً ومجروراً واسم إشارة.',
				rubricCriteria: [
					'الملاءمة (التقيد بالموضوع وعدد الأسطر 4-6 أسطر): 1 ن',
					'الانسجام (ترتيب الأفكار واستعمال الروابط): 0.75 ن',
					'سلامة اللغة وتوظيف جار ومجرور واسم إشارة: 0.75 ن',
					'الإتقان وجودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'في يوم الشجرة، خرجنا إلى حديقة المدرسة حاملين الشجيرات الصغيرة. تعاونّا في حفر الحفر وغرسها، ثم سقيناها بالماء العذب. هذه الأشجار نعمة كبيرة لأنها تنقّي الهواء وتمنحنا الظل والثمار. فما أجمل أن نحافظ عليها ولا نكسر أغصانها!',
				mcqQ: 'أيّ جملةٍ توظّفُ **اسمَ إشارةٍ** و**جاراً ومجروراً** بشكلٍ سليمٍ في موضوع الشجرة؟',
				mcqCorrect: 'هَذِهِ الشَّجَرَةُ تُعْطِينَا الظِّلَّ فِي الصَّيْفِ.',
				mcqDistractors: [
					{ text: 'الشَّجَرَةُ خَضْرَاءُ جَمِيلَةٌ.', diagnosticFeedback: 'تخلو هذه الجملة من اسم الإشارة والجار والمجرور.' },
					{ text: 'هَؤُلَاءِ الأَشْجَارُ تَنْمُو بِسُرْعَةٍ.', diagnosticFeedback: '«هَؤُلَاءِ» لا تُستعمل لجمع غير العاقل (الأشجار).' },
					{ text: 'غَرَسْتُ شَجَرَةً وَرَجَعْتُ مَسْرُوراً.', diagnosticFeedback: 'تخلو الجملة من اسم إشارة وحرف جر.' }
				]
			},
			{
				context: 'وطننا الجزائر غالٍ علينا، فيه جبال خضراء وسهول خصبة وبحر جميل وصحراء واسعة.',
				supportQuote: 'حبُّ الوطنِ يكونُ بالعملِ الصالحِ والاجتهادِ في طلبِ العلمِ.',
				instruction: 'اكتب فقرة من 4 إلى 6 أسطر تعبّر فيها عن حبك لوطنك الجزائر وتذكر كيف تساهم في بنائه، موظفاً اسماً موصولاً وضميراً منفصلاً.',
				rubricCriteria: [
					'الملاءمة (حب الوطن وواجب التلميذ في 4-6 أسطر): 1 ن',
					'الانسجام والترابط بين الجمل: 0.75 ن',
					'سلامة اللغة وتوظيف اسم موصول وضمير منفصل: 0.75 ن',
					'وضوح الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'الجزائر هي الوطن الغالي الذي نعيش على أرضه في أمن وسلام. نحن نعتزّ ببطولات أجدادنا الذين ضحّوا من أجل حريته، ونجتهد كل يوم في طلب العلم لنبني مستقبله الزاهر. حفظ الله وطننا الجزائر وأدام عليه الأمن والخير.',
				mcqQ: 'أيّ جملةٍ توظّفُ **ضميراً منفصلاً** و**اسماً موصولاً** بشكلٍ صحيحٍ عن الوطن؟',
				mcqCorrect: 'نَحْنُ نُحِبُّ الوَطَنَ الَّذِي نَعِيشُ فِيهِ.',
				mcqDistractors: [
					{ text: 'نَحْنُ نُحِبُّ الوَطَنَ الَّتِي نَعِيشُ فِيهِ.', diagnosticFeedback: '«الوَطَنَ» مفرد مذكر فيُستعمل معه «الَّذِي» لا «الَّتِي».' },
					{ text: 'الجَزَائِرُ بَلَدٌ وَاسِعٌ وَجَمِيلٌ.', diagnosticFeedback: 'لا يوجد فيها ضمير منفصل ولا اسم موصول.' },
					{ text: 'اِجْتَهِدْ فِي دُرُوسِكَ كُلَّ يَوْمٍ.', diagnosticFeedback: 'لا تحتوي على ضمير منفصل ولا اسم موصول.' }
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
			explanation: `الجملة الصحيحة هي «${t.mcqCorrect}» لأنها تجمع التوظيف المطلوب بتركيب سليم.`
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
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'نظّم فقرتك في مقدمة قصيرة وعرض مترابط وخاتمة معبّرة.',
				'سطّر في مسوّدتك تحت الظاهرتين اللغويتين المطلوب توظيفهما.',
				'تأكّد من وضع الفاصلة والنقطة وترك بياض في أول السطر.'
			],
			solutionStepsAr: [
				'فهم المطلوب والالتزام بعدد الأسطر (4 إلى 6 أسطر).',
				'توظيف الروابط اللغوية والمطلوب النحوي بشكل طبيعي.',
				`نموذج مقترح: ${t.modelOutline}`
			],
			finalAnswer: t.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T2: ArabicParameterizedTemplate[] = [
	readingComp3apT2,
	numberPrepositions3apT2,
	pronounsDemonstratives3apT2,
	integration3apT2
];
