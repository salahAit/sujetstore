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
// 1. البناء الفكري (3 ن) — العلم والابتكار والصحة والبيئة
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp4apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t3_reading_comprehension',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: العلم والابتكار والصحة',
	curriculumLessonId: 'arb_lesson_4ap_t3_inna_sisters',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'العِلْمُ مِفْتَاحُ النَّهْضَةِ',
				paragraphs: [
					'إِنَّ [[العِلْمَ]] سِرُّ تَقَدُّمِ الأُمَمِ وَنَهْضَتِهَا. لَقَدْ سَعَى عُلَمَاءُ الإِسْلَامِ قَدِيماً فِي مَجَالَاتِ الطِّبِّ وَالفَلَكِ وَالرِّيَاضِيَّاتِ، وَأَتْقَنُوا أَبْحَاثَهُمْ [[إِتْقَاناً]] بَاهِراً نَفَعَ البَشَرِيَّةَ جَمْعَاءَ.',
					'فَلْنُقْبِلْ عَلَى المَكْتَبَةِ وَالمُطَالَعَةِ، وَلْنَصْرِفْ أَوْقَاتَنَا فِيمَا يَنْفَعُ؛ لَعَلَّ الأَجْيَالَ القَادِمَةَ تَصْنَعُ لِوَطَنِنَا الجَزَائِرِ مُسْتَقْبَلاً [[مُشْرِقاً]].'
				],
				author: 'نص تربوي في العلم والابتكار',
				vocabulary: [
					{ word: 'بَاهِراً', meaning: 'عظيماً ومثيراً للإعجاب' },
					{ word: 'نَصْرِفْ', meaning: 'نقضي ونستثمر' }
				],
				bestTitle: 'أهمية العلم في نهضة الأمم',
				wrongTitles: [
					{ text: 'أيام العطلة في القرية', diagnosticFeedback: 'النص يتحدث عن فضل العلم وعلماء الإسلام.' },
					{ text: 'أنواع النباتات الصحراوية', diagnosticFeedback: 'لم يرد ذكر للنباتات الصحراوية في النص.' },
					{ text: 'صناعة السفن الخشبية', diagnosticFeedback: 'الفكرة المحورية هي العلم والمطالعة.' }
				],
				compQ: 'فِي أَيِّ مَجَالَاتٍ أَبْدَعَ عُلَمَاءُ الإِسْلَامِ قَدِيماً؟ وَكَيْفَ نَبْنِي مُسْتَقْبَلاً مُشْرِقاً لِوَطَنِنَا؟',
				compA: 'أبدعوا في الطب والفلك والرياضيات، ونبني مستقبلاً مشرقاً لوطننا بالإقبال على المكتبة والمطالعة واستثمار أوقاتنا فيما ينفع.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تَطَوُّرِ»، وَضِدَّ كَلِمَةِ «يَضُرُّ».',
				vocabA: 'مرادف «تَطَوُّرِ»: تَقَدُّمِ — ضدّ «يَضُرُّ»: يَنْفَعُ.'
			},
			{
				title: 'الطَّاقَةُ الشَّمْسِيَّةُ النَّظِيفَةُ',
				paragraphs: [
					'تَتَمَتَّعُ الصَّحْرَاءُ الجَزَائِرِيَّةُ بِشَمْسٍ سَاطِعَةٍ طَوَالَ السَّنَةِ. إِنَّ [[الطَّاقَةَ]] الشَّمْسِيَّةَ نِعْمَةٌ عَظِيمَةٌ لِأَنَّهَا طَاقَةٌ مُتَجَدِّدَةٌ لَا تَنْفَدُ وَلَا تُلَوِّثُ الهَوَاءَ أَوْ البِيئَةَ.',
					'لِذَلِكَ تَهْتَمُّ بِلَادُنَا بِبِنَاءِ مَحَطَّاتِ الطَّاقَةِ النَّظِيفَةِ [[اِهْتِمَاماً]] كَبِيراً، حَتَّى تَصِلَ الكَهْرَبَاءُ إِلَى القُرَى البَعِيدَةِ فِي [[هُدُوءٍ]] وَسَلَامَةٍ.'
				],
				author: 'نص تربوي في الطاقات المتجددة',
				vocabulary: [
					{ word: 'لَا تَنْفَدُ', meaning: 'لا تنتهي ولا تنقطع' },
					{ word: 'سَاطِعَةٍ', meaning: 'قوية الإشراق والضياء' }
				],
				bestTitle: 'الطاقة الشمسية في صحراء الجزائر',
				wrongTitles: [
					{ text: 'قصة الصياد الصغير', diagnosticFeedback: 'النص يتحدث عن الطاقة الشمسية وفوائدها البيئية.' },
					{ text: 'آداب إكرام الضيف', diagnosticFeedback: 'لا يتناول النص موضوع الضيافة.' },
					{ text: 'مسابقة في حفظ الشعر', diagnosticFeedback: 'موضوع النص هو الطاقة النظيفة المتجددة.' }
				],
				compQ: 'لِمَاذَا تُعَدُّ الطَّاقَةُ الشَّمْسِيَّةُ نِعْمَةً عَظِيمَةً؟',
				compA: 'لأنها طاقة متجددة لا تنفد ولا تلوّث الهواء أو البيئة، وتوفّر الكهرباء للقرى البعيدة.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «لَا تَنْتَهِي»، وَضِدَّ كَلِمَةِ «القَرِيبَةِ».',
				vocabA: 'مرادف «لَا تَنْتَهِي»: لَا تَنْفَدُ — ضدّ «القَرِيبَةِ»: البَعِيدَةِ.'
			},
			{
				title: 'الرِّيَاضَةُ وَالغِذَاءُ الصِّحِّيُّ',
				paragraphs: [
					'إِنَّ [[الصِّحَّةَ]] أَغْلَى مَا يَمْلِكُهُ الإِنْسَانُ بَعْدَ الإِيمَانِ. وَلِكَيْ يَنْعَمَ التِّلْمِيذُ بِجِسْمٍ قَوِيٍّ، يَجِبُ أَنْ يُمَارِسَ الرِّيَاضَةَ [[مُمَارَسَةً]] مُنْتَظِمَةً، وَيَخْتَارَ الأَطْعِمَةَ الطَّازَجَةَ.',
					'لَعَلَّ [[المُهْتَمِّينَ]] بِصِحَّتِهِمْ يَعْرِفُونَ أَنَّ الوِقَايَةَ خَيْرٌ مِنَ العِلَاجِ، فَيَبْتَعِدُونَ عَنِ الكَسَلِ وَالإِفْرَاطِ فِي السُّكَّرِيَّاتِ.'
				],
				author: 'نص تربوي في الصحة والتغذية',
				vocabulary: [
					{ word: 'الوِقَايَةَ', meaning: 'الحماية قبل وقوع المرض' },
					{ word: 'الإِفْرَاطِ', meaning: 'الإكثار الزائد عن الحد' }
				],
				bestTitle: 'الوقاية بالرياضة والغذاء الصحي',
				wrongTitles: [
					{ text: 'زيارة مدينة تلمسان', diagnosticFeedback: 'النص يتحدث عن الصحة والرياضة والتغذية السليمة.' },
					{ text: 'أدوات الفلاح في الحصاد', diagnosticFeedback: 'لا توجد إشارة للزراعة والحصاد في النص.' },
					{ text: 'معرض الكتاب الدولي', diagnosticFeedback: 'الموضوع الأساسي هو الوقاية الصحية.' }
				],
				compQ: 'كَيْفَ يَنْعَمُ التِّلْمِيذُ بِجِسْمٍ قَوِيٍّ حَسَبَ النَّصِّ؟ وَمِمَّ يَبْتَعِدُ؟',
				compA: 'بممارسة الرياضة بانتظام واختيار الأطعمة الطازجة، ويبتعد عن الكسل والإفراط في السكريات.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «الإِكْثَارِ»، وَضِدَّ كَلِمَةِ «ضَعِيفٍ».',
				vocabA: 'مرادف «الإِكْثَارِ»: الإِفْرَاطِ — ضدّ «ضَعِيفٍ»: قَوِيٍّ.'
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
			explanation: `العنوان الأنسب هو «${p.bestTitle}».`
		};

		const illustrationId: IllustrationId =
			p.title === 'العِلْمُ مِفْتَاحُ النَّهْضَةِ'
				? 'pri_ara_07_science_library_telescope'
				: p.title === 'الطَّاقَةُ الشَّمْسِيَّةُ النَّظِيفَةُ'
					? 'pri_ara_08_sahara_oasis_dunes'
					: 'pri_ara_05_fresh_fruits_honey_basket';

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ السند قراءة متمعنة ثم أجب عن الأسئلة الآتية:',
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
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً وحدد الفكرة العامة الجامعة للفقرتين.',
				'أجب عن سؤال الفهم بدقة مستنداً إلى معلومات النص.',
				'تحقّق أن المرادف والضد من كلمات النص ذاته.'
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
// 2. البناء اللغوي 1 (2 ن) — إن وأخواتها + المفعول المطلق + إعراب نموذجي
// ═══════════════════════════════════════════════════════════════════════════════
const innaMafulMutlaq4apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t3_inna_maful_mutlaq',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: إن وأخواتها والمفعول المطلق',
	curriculumLessonId: 'arb_lesson_4ap_t3_maful_mutlaq',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				sentence: 'إِنَّ المُجْتَهِدِينَ مُتَفَوِّقُونَ، وَقَدْ فَهِمُوا الدَّرْسَ فَهْماً جَيِّداً.',
				irabEntries: [
					{ target: 'المُجْتَهِدِينَ', irab: 'اسمُ «إِنَّ» منصوبٌ وعلامةُ نصبه الياءُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'مُتَفَوِّقُونَ', irab: 'خبرُ «إِنَّ» مرفوعٌ وعلامةُ رفعه الواوُ لأنّه جمعُ مذكرٍ سالمٍ.', mark: '0.5' },
					{ target: 'فَهْماً', irab: 'مفعولٌ مطلقٌ منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformQ: 'أدخلْ «لَعَلَّ» على الجملة «التِّلْمِيذَانِ نَاجِحَانِ» واضبطها بالشكل.',
				transformA: 'لَعَلَّ التِّلْمِيذَيْنِ نَاجِحَانِ.',
				mcqQ: 'ما الإعرابُ الصحيحُ لكلمة «فَهْماً» في جملة «فَهِمُوا الدَّرْسَ فَهْماً جَيِّداً»؟',
				mcqCorrect: 'مفعولٌ مطلقٌ منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ',
				mcqDistractors: [
					{ text: 'مفعولٌ به منصوبٌ بالفتحةِ', diagnosticFeedback: 'المفعول به هو «الدَّرْسَ»، أما «فَهْماً» فمصدر من لفظ الفعل «فَهِمَ».' },
					{ text: 'صفةٌ منصوبةٌ بالفتحةِ', diagnosticFeedback: 'الصفة هنا هي «جَيِّداً» التي تصف «فَهْماً».' },
					{ text: 'خبرُ «إِنَّ» منصوبٌ بالفتحةِ', diagnosticFeedback: 'خبر إنّ يكون مرفوعاً وهو «مُتَفَوِّقُونَ».' }
				]
			},
			{
				sentence: 'لَعَلَّ المُعَلِّمَاتِ مَسْرُورَاتٌ؛ فَقَدْ أَتْقَنَ التِّلْمِيذُ عَمَلَهُ إِتْقَاناً.',
				irabEntries: [
					{ target: 'المُعَلِّمَاتِ', irab: 'اسمُ «لَعَلَّ» منصوبٌ وعلامةُ نصبه الكسرةُ نيابةً عن الفتحةِ لأنّه جمعُ مؤنثٍ سالمٍ.', mark: '0.5' },
					{ target: 'مَسْرُورَاتٌ', irab: 'خبرُ «لَعَلَّ» مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'إِتْقَاناً', irab: 'مفعولٌ مطلقٌ منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformQ: 'أدخلْ «إِنَّ» على الجملة «المُخْتَرِعُونَ مُبْدِعُونَ» واضبطها بالشكل.',
				transformA: 'إِنَّ المُخْتَرِعِينَ مُبْدِعُونَ.',
				mcqQ: 'ما علامةُ نصبِ اسمِ «لَعَلَّ» في «لَعَلَّ المُعَلِّمَاتِ مَسْرُورَاتٌ»؟',
				mcqCorrect: 'الكسرةُ نيابةً عن الفتحةِ لأنه جمع مؤنث سالم',
				mcqDistractors: [
					{ text: 'الفتحةُ الظاهرةُ', diagnosticFeedback: 'جمع المؤنث السالم يُنصب بالكسرة لا بالفتحة.' },
					{ text: 'الضمّةُ الظاهرةُ', diagnosticFeedback: 'اسم «لعلّ» منصوب لا مرفوع.' },
					{ text: 'الياءُ لأنه جمع مذكر سالم', diagnosticFeedback: '«المُعَلِّمَاتِ» جمع مؤنث سالم.' }
				]
			},
			{
				sentence: 'إِنَّ الطَّاقَةَ الشَّمْسِيَّةَ نَظِيفَةٌ، وَتُفِيدُ البِلَادَ إِفَادَةً عَظِيمَةً.',
				irabEntries: [
					{ target: 'الطَّاقَةَ', irab: 'اسمُ «إِنَّ» منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'نَظِيفَةٌ', irab: 'خبرُ «إِنَّ» مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'إِفَادَةً', irab: 'مفعولٌ مطلقٌ منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				transformQ: 'استبدلْ «كَانَ» بـ «إِنَّ» في الجملة «كَانَ العَالِمَانِ مُخْلِصَيْنِ».',
				transformA: 'إِنَّ العَالِمَيْنِ مُخْلِصَانِ.',
				mcqQ: 'ما نوعُ المفعولِ المطلقِ في «تُفِيدُ البِلَادَ إِفَادَةً عَظِيمَةً»؟',
				mcqCorrect: 'مبيِّنٌ لنوعِ الفعلِ',
				mcqDistractors: [
					{ text: 'مؤكِّدٌ للفعلِ فقط', diagnosticFeedback: 'جاءت بعده الصفة «عَظِيمَةً» فتعدّى التوكيد إلى بيان النوع.' },
					{ text: 'مبيِّنٌ لعددِ الفعلِ', diagnosticFeedback: 'لا يدل على عدد المرات مثل «سجدتين».' },
					{ text: 'ليس مفعولاً مطلقاً', diagnosticFeedback: '«إِفَادَةً» مصدر منصوب من لفظ الفعل «تُفِيدُ».' }
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
			customTitle: 'البناء اللغوي (إن وأخواتها والمفعول المطلق)',
			points: 2,
			instruction: `تأمّل الجملة: «${s.sentence}»، ثم أجب:`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمات الآتية إعراباً نموذجياً كاملاً:'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'إنّ وأخواتها تنصب الاسم وترفع الخبر (عكس كان وأخواتها).',
				'المفعول المطلق مصدر منصوب يُشتق من حروف الفعل الذي قبله.',
				'راجع علامات النصب والرفع في المثنى وجمع المذكر والمؤنث السالم.'
			],
			solutionStepsAr: [
				...s.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`التحويل: ${s.transformA}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — الفعل الصحيح والمعتل + الهمزة المتطرفة
// ═══════════════════════════════════════════════════════════════════════════════
const soundWeakFinalHamza4apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t3_sound_weak_final_hamza',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'morphology_sarf',
	titleAr: 'الصرف والإملاء: الفعل الصحيح والمعتل والهمزة المتطرفة',
	curriculumLessonId: 'arb_lesson_4ap_t3_sound_weak_verbs',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				verbs: [
					{ verb: 'يَكْتُبُ', type: 'فعل صحيح (سالم — ماضيه كَتَبَ)' },
					{ verb: 'وَصَلَ', type: 'فعل معتل (مثال — أوّله واو)' },
					{ verb: 'قَالَ', type: 'فعل معتل (أجوف — وسطه ألف)' },
					{ verb: 'سَعَى', type: 'فعل معتل (ناقص — آخره ألف مقصورة)' }
				],
				hamzas: [
					{ word: 'شَاطِئٌ', reason: 'على الياء لأن ما قبلها مكسور' },
					{ word: 'سَمَاءٌ', reason: 'على السطر لأن ما قبلها ساكن (ألف مد)' },
					{ word: 'قَرَأَ', reason: 'على الألف لأن ما قبلها مفتوح' },
					{ word: 'لُؤْلُؤٌ', reason: 'على الواو لأن ما قبلها مضموم' }
				],
				mcqQ: 'أيُّ فعلٍ ممّا يلي هو **فعلٌ صحيحٌ** (خالٍ من حروف العلة الأصلية)؟',
				mcqCorrect: 'يَكْتُبُ',
				mcqDistractors: [
					{ text: 'وَصَلَ', diagnosticFeedback: 'أوله واو أصلية فهو معتلّ مثال.' },
					{ text: 'قَالَ', diagnosticFeedback: 'وسطه ألف أصلية فهو معتلّ أجوف.' },
					{ text: 'سَعَى', diagnosticFeedback: 'آخره ألف مقصورة أصلية فهو معتلّ ناقص.' }
				]
			},
			{
				verbs: [
					{ verb: 'أَخَذَ', type: 'فعل صحيح (مهموز — الهمزة ليست حرف علة)' },
					{ verb: 'مَدَّ', type: 'فعل صحيح (مضعّف)' },
					{ verb: 'صَامَ', type: 'فعل معتل (أجوف — وسطه ألف)' },
					{ verb: 'دَعَا', type: 'فعل معتل (ناقص — آخره ألف)' }
				],
				hamzas: [
					{ word: 'دِفْءٌ', reason: 'على السطر لأن ما قبلها ساكن' },
					{ word: 'قَارِئٌ', reason: 'على الياء لأن ما قبلها مكسور' },
					{ word: 'بَدَأَ', reason: 'على الألف لأن ما قبلها مفتوح' },
					{ word: 'تَكَافُؤٌ', reason: 'على الواو لأن ما قبلها مضموم' }
				],
				mcqQ: 'لماذا كُتبتِ الهمزةُ المتطرفةُ على السطرِ في كلمة «دِفْءٌ»؟',
				mcqCorrect: 'لأن الحرف الذي قبلها (الفاء) ساكنٌ',
				mcqDistractors: [
					{ text: 'لأن ما قبلها مفتوحٌ', diagnosticFeedback: 'لو كان ما قبلها مفتوحاً لكُتبت على الألف.' },
					{ text: 'لأن ما قبلها مكسورٌ', diagnosticFeedback: 'الدال مكسورة لكن الحرف المباشر قبل الهمزة هو الفاء الساكنة (دِفْـءٌ).' },
					{ text: 'لأنها مضمومةٌ', diagnosticFeedback: 'في الهمزة المتطرفة ننظر لحركة الحرف الذي قبلها فقط.' }
				]
			},
			{
				verbs: [
					{ verb: 'عَلِمَ', type: 'فعل صحيح (سالم)' },
					{ verb: 'وَجَدَ', type: 'فعل معتل (مثال — أوّله واو)' },
					{ verb: 'نَامَ', type: 'فعل معتل (أجوف — وسطه ألف)' },
					{ verb: 'رَمَى', type: 'فعل معتل (ناقص — آخره ألف مقصورة)' }
				],
				hamzas: [
					{ word: 'هُدُوءٌ', reason: 'على السطر لأن ما قبلها ساكن (واو مد)' },
					{ word: 'دَافِئٌ', reason: 'على الياء لأن ما قبلها مكسور' },
					{ word: 'مَلْجَأٌ', reason: 'على الألف لأن ما قبلها مفتوح' },
					{ word: 'يَجْرُؤُ', reason: 'على الواو لأن ما قبلها مضموم' }
				],
				mcqQ: 'اخترِ الكتابةَ الصحيحةَ للهمزةِ المتطرفةِ في: «نَعِيشُ فِي وَطَنِنَا فِي أَمْنٍ وَ.......».',
				mcqCorrect: 'هُدُوءٍ',
				mcqDistractors: [
					{ text: 'هُدُوؤٍ', diagnosticFeedback: 'الواو في «هُدُوءٍ» حرف مدّ ساكن، فتُكتب الهمزة على السطر لا على الواو.' },
					{ text: 'هُدُوئٍ', diagnosticFeedback: 'لا توجد كسرة قبل الهمزة بل واو مد ساكنة.' },
					{ text: 'هُدُوأٍ', diagnosticFeedback: 'لا توجد فتحة قبل الهمزة.' }
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
			explanation: `الجواب الصحيح هو: «${b.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الصرف والإملاء (الصحيح والمعتل والهمزة المتطرفة)',
			points: 2,
			instruction: 'أنجز المطلوب في الجدولين الآتيين:',
			content: [
				{
					type: 'text',
					content: '1) صنّف الأفعال الآتية إلى صحيح أو معتل مع ذكر النوع:'
				},
				{
					type: 'table',
					headers: ['الفعل', 'صحيح أم معتل (ونوعه)'],
					cells: [],
					rows: b.verbs.map((v) => [
						{ content: v.verb, bold: true },
						{ content: '..................................................', answer: v.type, mark: '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '2) علّل سبب كتابة الهمزة المتطرفة في الكلمات الآتية:'
				},
				{
					type: 'table',
					headers: ['الكلمة', 'التعليل الإملائي'],
					cells: [],
					rows: b.hamzas.map((h) => [
						{ content: h.word, bold: true },
						{ content: '..................................................', answer: h.reason, mark: '0.25' }
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'أرجع الفعل دائماً إلى الماضي المجرد مع الضمير «هُوَ» قبل الحكم عليه.',
				'حروف العلة هي (و، ا، ي)، أما الهمزة فحرف صحيح.',
				'في الهمزة المتطرفة انظر فقط إلى حركة الحرف الذي قبلها مباشرة.'
			],
			solutionStepsAr: [
				...b.verbs.map((v) => `${v.verb}: ${v.type}`),
				...b.hamzas.map((h) => `${h.word}: ${h.reason}`)
			],
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — فقرة منظمة من 6 إلى 8 أسطر
// ═══════════════════════════════════════════════════════════════════════════════
const integration4apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4ap_t3_written_integration',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: العلم والابتكار أو الصحة والرياضة',
	curriculumLessonId: 'arb_lesson_4ap_t3_final_hamza_integration',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topics = [
			{
				context: 'تستعدّ لاختبارات نهاية السنة الرابعة ابتدائي، وأردتَ أن تنصح صديقك بأهمية طلب العلم وتنظيم وقت المراجعة.',
				supportQuote: 'قال الله تعالى في محكم التنزيل: وَقُلْ رَبِّ زِدْنِي عِلْماً.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تتحدث فيها عن فضل العلم والاجتهاد وتقدّم نصائح عملية للتفوق في الدراسة، موظفاً «إنّ» أو إحدى أخواتها ومفعولاً مطلقاً وهمزة متطرفة.',
				rubricCriteria: [
					'الملاءمة (فضل العلم ونصائح التفوق في 6-8 أسطر): 1 ن',
					'الانسجام (مقدمة وعرض وخاتمة وترابط الجمل): 0.75 ن',
					'سلامة اللغة وتوظيف إنّ أو أخواتها ومفعول مطلق وهمزة متطرفة: 0.75 ن',
					'الإتقان وجودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'إنَّ العلمَ نورٌ يبدِّد ظلمات الجهل ويرفع شأن الفرد والمجتمع. ولكي نحقق النجاح في دراستنا، يجب أن نجتهد اجتهاداً متواصلاً منذ بداية السنة، وننظم أوقاتنا بين المراجعة والراحة. كما ينبغي أن نبتعد عن الكسل وتضييع الوقت، ونقرأ الكتب النافعة في هدوء وتركيز. لعلّ المجتهدين ينالون أعلى الدرجات ويسعدون والديهم ومعلميهم. فاحرص يا صديقي على طلب العلم بإخلاص لتخدم دينك ووطنك الجزائر.',
				mcqQ: 'أيُّ جملةٍ تجمعُ بين **إنَّ** و**مفعولٍ مطلقٍ** و**همزةٍ متطرفةٍ صحيحةٍ**؟',
				mcqCorrect: 'إِنَّ العِلْمَ نُورٌ، فَقَدِ اجْتَهَدَ التِّلْمِيذُ اجْتِهَاداً كَبِيراً فِي هُدُوءٍ.',
				mcqDistractors: [
					{ text: 'إِنَّ العِلْمُ نُورٌ وَقَرَءَ التِّلْمِيذُ الدَّرْسَ.', diagnosticFeedback: 'خطأ في نصب اسم «إنّ» (العِلْمَ) وفي كتابة «قَرَأَ».' },
					{ text: 'ذَهَبَ أَحْمَدُ إِلَى المَكْتَبَةِ صَبَاحاً.', diagnosticFeedback: 'تخلو من «إنّ» والمفعول المطلق والهمزة المتطرفة.' },
					{ text: 'كَانَ التِّلْمِيذُ نَشِيطاً فِي القِسْمِ.', diagnosticFeedback: 'تحتوي على «كان» لا «إنّ» وتخلو من المفعول المطلق.' }
				]
			},
			{
				context: 'زار طبيب المدرسة قسمكم وقدّم لكم نصائح ثمينة حول الغذاء المتوازن وممارسة الرياضة والابتعاد عن السهر.',
				supportQuote: 'الصحةُ نعمةٌ عظيمةٌ من الله تعالى، والوقايةُ خيرٌ من العلاجِ.',
				instruction: 'اكتب فقرة منظمة من 6 إلى 8 أسطر تلخّص فيها القواعد الصحية التي يجب أن يلتزم بها التلميذ للمحافظة على جسمه وعقله، موظفاً «إنّ» أو «لعلّ» وفعلاً معتلاً وهمزة متطرفة.',
				rubricCriteria: [
					'الملاءمة (القواعد الصحية للتلميذ في 6-8 أسطر): 1 ن',
					'الانسجام والتدرج في الأفكار واستعمال الروابط: 0.75 ن',
					'سلامة اللغة وتوظيف ناسخ حرفي وفعل معتل وهمزة متطرفة: 0.75 ن',
					'وضوح الخط واحترام علامات الوقف: 0.5 ن'
				],
				modelOutline:
					'إنَّ الصحةَ تاجٌ على رؤوس الأصحاء يجب أن نصونها كل يوم. وللمحافظة على أجسامنا قويةً، نتناول وجبات متوازنة غنية بالخضر والفواكه، ونشرب كمية كافية من الماء النقي. كما نمارس الرياضة بانتظام وننام باكراً في هدوء، ونبتعد عن الأطعمة المكشوفة والمشروبات الغازية. لقد قال الطبيب إنّ النظافة والنظام يقيان من كثير من الأمراض. فلنحرص جميعاً على هذه العادات الحسنة لتبقى أجسامنا سليمةً وعقولنا نشيطةً.',
				mcqQ: 'أيُّ جملةٍ تضمُّ **فعلاً معتلاً** و**همزةً متطرفةً صحيحةً** في موضوع الصحة؟',
				mcqCorrect: 'قَالَ الطَّبِيبُ: شُرْبُ المَاءِ النَّقِيِّ ضَرُورِيٌّ لِصِحَّةِ الجِسْمِ.',
				mcqDistractors: [
					{ text: 'كَتَبَ التِّلْمِيذُ الدَّرْسَ فِي الكُرَّاسِ.', diagnosticFeedback: '«كَتَبَ» فعل صحيح ولا توجد همزة متطرفة.' },
					{ text: 'شَرِبَ أَحْمَدُ الحَلِيبَ الطَّازَجَ.', diagnosticFeedback: '«شَرِبَ» فعل صحيح ولا توجد همزة متطرفة.' },
					{ text: 'نَامَ الطِّفْلُ فِي هُدُوؤٍ.', diagnosticFeedback: 'خطأ إملائي في «هُدُوؤٍ»؛ الصواب «هُدُوءٍ» على السطر.' }
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
			explanation: `الخيار الصحيح هو «${t.mcqCorrect}» لاستيفائه التوظيف النحوي والصرفي والإملائي الصحيح.`
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ ببياض ومقدمة موجزة، ثم فصّل أفكارك في العرض، واختم بنصيحة أو دعاء.',
				'راجع عدد الأسطر (6 إلى 8 أسطر) وتأكد من التوظيف المطلوب.',
				'تأكّد من ضبط اسم إنّ وخبرها وكتابة الهمزة المتطرفة على الحرف الصحيح.'
			],
			solutionStepsAr: [
				'بناء فقرة منظمة (مقدمة، عرض، خاتمة) في حدود 6 إلى 8 أسطر.',
				'التحقق من سلامة اللغة والتوظيف النحوي والصرفي والإملائي.',
				`نموذج مقترح: ${t.modelOutline}`
			],
			finalAnswer: t.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T3: ArabicParameterizedTemplate[] = [
	readingComp4apT3,
	innaMafulMutlaq4apT3,
	soundWeakFinalHamza4apT3,
	integration4apT3
];
