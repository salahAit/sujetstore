import type {
	Difficulty,
	IslamicGeneratedExerciseInstance,
	IslamicParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import {
	buildHadithPassageBlock,
	buildIslamicIntegrationBlock,
	buildIslamicTableBlock,
	buildQuranPassageBlock
} from '../../islamic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 41;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 89 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Part 1 Knowledge (3 pts): سورة الناس
// ---------------------------------------------------------------------------
const tplSurahNas: IslamicParameterizedTemplate = {
	id: 'isl_tpl_1ap_t3_surah_nas',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'quran_tafsir',
	titleAr: 'سُورَةُ النَّاسِ: الِاسْتِعَاذَةُ بِاللَّهِ وَحْدَهُ',
	curriculumLessonId: 'isl_lesson_1ap_t3_surah_nas',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 1301);

		const variants = [
			{
				shownVerses: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَهِ النَّاسِ (3)',
				ayahRange: '1 - 3',
				fillPrompt:
					'أَكْمِلِ الآيَتَيْنِ الرَّابِعَةَ وَالخَامِسَةَ: مِنْ شَرِّ الْوَسْوَاسِ ...................... (4) الَّذِي يُوَسْوِسُ فِي ...................... (5).',
				fillAnswer: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4) الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ (5).',
				mc1Header: 'كَمْ عَدَدُ آيَاتِ سُورَةِ النَّاسِ؟',
				mc1Options: ['سِتُّ آيَاتٍ', 'أَرْبَعُ آيَاتٍ', 'ثَلَاثُ آيَاتٍ'],
				mc1Correct: 'سِتُّ آيَاتٍ',
				mc2Header: 'مَا مَعْنَى «أَعُوذُ»؟',
				mc2Options: ['أَلْتَجِئُ وَأَحْتَمِي بِاللَّهِ', 'أَسْتَغْرِبُ', 'أَنْتَظِرُ'],
				mc2Correct: 'أَلْتَجِئُ وَأَحْتَمِي بِاللَّهِ',
				tfItems: [
					{ q: 'سُورَةُ النَّاسِ هِيَ آخِرُ سُورَةٍ فِي المُصْحَفِ الشَّرِيفِ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'نَسْتَعِيذُ بِغَيْرِ اللَّهِ تَعَالَى عِنْدَ الخَوْفِ.', a: 'خَطَأٌ', c: 'نَسْتَعِيذُ بِاللَّهِ وَحْدَهُ لَا شَرِيكَ لَهُ.', mark: '0.5' }
				],
				quizPrompt: 'مَا مَعْنَى كَلِمَةِ «الخَنَّاسِ» فِي سُورَةِ النَّاسِ؟',
				quizCorrect: 'الشَّيْطَانُ الَّذِي يَهْرُبُ وَيَخْتَفِي عِنْدَ ذِكْرِ اللَّهِ',
				quizDistractors: [
					{ text: 'المَلَكُ الَّذِي يَنْزِلُ بِالوَحْيِ', diagnosticFeedback: 'جِبْرِيلُ عَلَيْهِ السَّلَامُ مَلَكٌ كَرِيمٌ، أَمَّا الخَنَّاسُ فَهُوَ الشَّيْطَانُ.' },
					{ text: 'الإِنْسَانُ الصَّادِقُ', diagnosticFeedback: 'الوَسْوَاسُ الخَنَّاسُ هُوَ الشَّيْطَانُ الَّذِي يُوَسْوِسُ بِالشَّرِّ.' },
					{ text: 'نُورُ الصَّبَاحِ', diagnosticFeedback: 'نُورُ الصَّبَاحِ هُوَ الفَلَقُ.' }
				]
			},
			{
				shownVerses: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4) الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ (5) مِنَ الْجِنَّةِ وَالنَّاسِ (6)',
				ayahRange: '4 - 6',
				fillPrompt:
					'اكْتُبِ الآيَاتِ الثَّلَاثَ الأُولَى مِنْ سُورَةِ النَّاسِ:\n................................................................',
				fillAnswer: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَهِ النَّاسِ (3).',
				mc1Header: 'تُسَمَّى سُورَةُ الفَلَقِ وَسُورَةُ النَّاسِ مَعًا:',
				mc1Options: ['المُعَوِّذَتَيْنِ', 'الفَاتِحَتَيْنِ', 'السُّورَتَيْنِ الطَّوِيلَتَيْنِ'],
				mc1Correct: 'المُعَوِّذَتَيْنِ',
				mc2Header: 'مَتَى نَقْرَأُ سُورَةَ النَّاسِ لِيَحْفَظَنَا اللَّهُ؟',
				mc2Options: ['صَبَاحًا وَمَسَاءً وَقَبْلَ النَّوْمِ', 'مَرَّةً فِي العَامِ', 'عِنْدَ السَّفَرِ فَقَطْ'],
				mc2Correct: 'صَبَاحًا وَمَسَاءً وَقَبْلَ النَّوْمِ',
				tfItems: [
					{ q: 'الشَّيْطَانُ يَهْرُبُ وَيَتَأَخَّرُ عِنْدَمَا نَذْكُرُ اللَّهَ تَعَالَى.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'عَدَدُ آيَاتِ سُورَةِ النَّاسِ خَمْسُ آيَاتٍ.', a: 'خَطَأٌ', c: 'عَدَدُ آيَاتِ سُورَةِ النَّاسِ سِتُّ آيَاتٍ.', mark: '0.5' }
				],
				quizPrompt: 'مَا السُّورَتَانِ اللَّتَانِ تُسَمَّيَانِ «المُعَوِّذَتَيْنِ»؟',
				quizCorrect: 'سُورَةُ الفَلَقِ وَسُورَةُ النَّاسِ',
				quizDistractors: [
					{ text: 'سُورَةُ الفَاتِحَةِ وَسُورَةُ الإِخْلَاصِ', diagnosticFeedback: 'المُعَوِّذَتَانِ هُمَا السُّورَتَانِ اللَّتَانِ تَبْدَآنِ بِـ«قُلْ أَعُوذُ».' },
					{ text: 'سُورَةُ قُرَيْشٍ وَسُورَةُ العَصْرِ', diagnosticFeedback: 'ابْحَثْ عَنِ السُّورَتَيْنِ فِي آخِرِ المُصْحَفِ الشَّرِيفِ.' },
					{ text: 'سُورَةُ الكَوْثَرِ وَسُورَةُ المَسَدِ', diagnosticFeedback: 'المُعَوِّذَتَانِ هُمَا الفَلَقُ وَالنَّاسُ.' }
				]
			},
			{
				shownVerses: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَهِ النَّاسِ (3) مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4)',
				ayahRange: '1 - 4',
				fillPrompt:
					'أَكْمِلِ الآيَةَ الأَخِيرَةَ مِنْ سُورَةِ النَّاسِ: مِنَ ...................... وَالنَّاسِ (6).',
				fillAnswer: 'مِنَ الْجِنَّةِ وَالنَّاسِ.',
				mc1Header: 'أَيْنَ يُوَسْوِسُ الشَّيْطَانُ كَمَا ذُكِرَ فِي السُّورَةِ؟',
				mc1Options: ['فِي صُدُورِ النَّاسِ', 'فِي الأَسْوَاقِ فَقَطْ', 'فِي الجِبَالِ فَقَطْ'],
				mc1Correct: 'فِي صُدُورِ النَّاسِ',
				mc2Header: 'اللَّهُ تَعَالَى هُوَ رَبُّ النَّاسِ وَمَلِكُ النَّاسِ وَ:',
				mc2Options: ['إِلَهُ النَّاسِ', 'غَاسِقُ اللَّيْلِ', 'وَسْوَاسُ الصُّدُورِ'],
				mc2Correct: 'إِلَهُ النَّاسِ',
				tfItems: [
					{ q: 'مِنَ السُّنَّةِ قِرَاءَةُ المُعَوِّذَتَيْنِ قَبْلَ النَّوْمِ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'الوَسْوَسَةُ تَأْتِي مِنَ المَلَائِكَةِ الكِرَامِ.', a: 'خَطَأٌ', c: 'الوَسْوَسَةُ بِالشَّرِّ تَأْتِي مِنْ شَيَاطِينِ الجِنِّ وَالإِنْسِ.', mark: '0.5' }
				],
				quizPrompt: 'بِمَنْ نَسْتَعِيذُ وَنَحْتَمِي مِنْ شَرِّ الشَّيْطَانِ الوَسْوَاسِ؟',
				quizCorrect: 'بِاللَّهِ وَحْدَهُ رَبِّ النَّاسِ وَمَلِكِهِمْ وَإِلَهِهِمْ',
				quizDistractors: [
					{ text: 'بِالتَّمَائِمِ وَالخُيُوطِ', diagnosticFeedback: 'التَّمَائِمُ لَا تَنْفَعُ وَلَا تَضُرُّ؛ نَسْتَعِيذُ بِاللَّهِ وَحْدَهُ.' },
					{ text: 'بِالسُّكُوتِ وَالخَوْفِ دُونَ ذِكْرِ اللَّهِ', diagnosticFeedback: 'ذِكْرُ اللَّهِ وَقِرَاءَةُ القُرْآنِ هُمَا حِصْنُ المُسْلِمِ.' },
					{ text: 'بِالنَّوْمِ دُونَ قِرَاءَةِ الأَذْكَارِ', diagnosticFeedback: 'مِنَ السُّنَّةِ قِرَاءَةُ الإِخْلَاصِ وَالمُعَوِّذَتَيْنِ قَبْلَ النَّوْمِ.' }
				]
			}
		] as const;

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, [...v.quizDistractors], rng);

		const content: ContentBlock[] = [
			buildQuranPassageBlock({
				verses: v.shownVerses,
				surah: 'النَّاس',
				ayahRange: v.ayahRange
			}),
			{
				type: 'text',
				content: `1) ${v.fillPrompt}`,
				answer: v.fillAnswer,
				mark: '1'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: `2) ${v.mc1Header}`,
						options: rng.shuffle(v.mc1Options),
						correct: v.mc1Correct,
						mark: '0.5'
					},
					{
						header: `3) ${v.mc2Header}`,
						options: rng.shuffle(v.mc2Options),
						correct: v.mc2Correct,
						mark: '0.5'
					}
				]
			},
			{
				type: 'true_false',
				items: v.tfItems.map((it) => ({ ...it }))
			}
		];

		return {
			templateId: 'isl_tpl_1ap_t3_surah_nas',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'quran_tafsir',
			titleAr: 'سُورَةُ النَّاسِ: الِاسْتِعَاذَةُ بِاللَّهِ وَحْدَهُ',
			onecRole: 'part1_knowledge',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizPrompt,
				questionTextAr: v.quizPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإِجَابَةُ الصَّحِيحَةُ: ${v.quizCorrect}.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الأُولَى (القُرْآنُ الكَرِيمُ: سُورَةُ النَّاسِ)',
				points: 3,
				instruction: 'اقْرَأِ الآيَاتِ الكَرِيمَةَ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'سُورَةُ النَّاسِ سِتُّ آيَاتٍ وَهِيَ آخِرُ سُورَةٍ فِي القُرْآنِ.',
				'أَعُوذُ تَعْنِي أَلْتَجِئُ وَأَحْتَمِي بِاللَّهِ وَحْدَهُ.',
				`الإِجَابَةُ الصَّحِيحَةُ: ${v.quizCorrect}.`
			],
			solutionStepsAr: [
				v.fillAnswer,
				v.mc1Correct,
				v.mc2Correct,
				...v.tfItems.map((it) => `${it.q} -> ${it.a} (${it.c})`)
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Part 1 Knowledge (3 pts): سورة الفلق
// ---------------------------------------------------------------------------
const tplSurahFalaq: IslamicParameterizedTemplate = {
	id: 'isl_tpl_1ap_t3_surah_falaq',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'quran_tafsir',
	titleAr: 'سُورَةُ الفَلَقِ: الحِفْظُ مِنَ الشُّرُورِ',
	curriculumLessonId: 'isl_lesson_1ap_t3_surah_falaq',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 1302);

		const vocabPool = [
			{ word: 'الفَلَقُ', meaning: 'الصُّبْحُ الَّذِي يَشُقُّ ظَلَامَ اللَّيْلِ', wrong: ['البَحْرُ الوَاسِعُ', 'المَطَرُ الغَزِيرُ', 'الرِّيحُ الشَّدِيدَةُ'] },
			{ word: 'غَاسِقٍ إِذَا وَقَبَ', meaning: 'اللَّيْلُ إِذَا دَخَلَ وَاشْتَدَّ ظَلَامُهُ', wrong: ['النَّهَارُ إِذَا أَشْرَقَ', 'المَاءُ البَارِدُ', 'العُصْفُورُ الصَّغِيرُ'] },
			{ word: 'النَّفَّاثَاتِ فِي العُقَدِ', meaning: 'السَّاحِرَاتُ اللَّاتِي يَنْفُثْنَ بِالشَّرِّ', wrong: ['المَلَائِكَةُ الكِرَامُ', 'الأَشْجَارُ المُثْمِرَةُ', 'السُّحُبُ البَيْضَاءُ'] },
			{ word: 'حَاسِدٍ إِذَا حَسَدَ', meaning: 'مَنْ يَتَمَنَّى زَوَالَ النِّعْمَةِ عَنْ غَيْرِهِ', wrong: ['مَنْ يُحِبُّ الخَيْرَ لِإِخْوَانِهِ', 'مَنْ يَتَصَدَّقُ عَلَى الفُقَرَاءِ', 'مَنْ يُكْرِمُ الضَّيْفَ'] }
		] as const;

		const orderedVocab = rng.shuffle(vocabPool);
		const quizVocab = rng.pick(vocabPool);

		const fillVariants = [
			{
				shown: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِنْ شَرِّ مَا خَلَقَ (2) وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ (3)',
				range: '1 - 3',
				prompt: 'أَكْمِلِ الآيَتَيْنِ الرَّابِعَةَ وَالخَامِسَةَ: وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ (4) وَمِنْ شَرِّ ...................... (5).',
				answer: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.'
			},
			{
				shown: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِنْ شَرِّ مَا خَلَقَ (2)',
				range: '1 - 2',
				prompt: 'أَكْمِلِ الآيَةَ الثَّالِثَةَ: وَمِنْ شَرِّ ...................... إِذَا وَقَبَ (3).',
				answer: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ.'
			},
			{
				shown: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ (4) وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ (5)',
				range: '3 - 5',
				prompt: 'اكْتُبِ الآيَتَيْنِ الأُولَى وَالثَّانِيَةَ مِنْ سُورَةِ الفَلَقِ:\n................................................................',
				answer: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِنْ شَرِّ مَا خَلَقَ (2).'
			}
		] as const;

		const fv = rng.pick(fillVariants);
		const mcq = buildUniqueMcqOptions(
			quizVocab.meaning,
			quizVocab.wrong.map((w) => ({
				text: w,
				diagnosticFeedback: `تَأَمَّلْ مَعْنَى «${quizVocab.word}» فِي سُورَةِ الفَلَقِ.`
			})),
			rng
		);

		const quizPrompt = `مَا مَعْنَى «${quizVocab.word}» فِي سُورَةِ الفَلَقِ؟`;

		const content: ContentBlock[] = [
			buildQuranPassageBlock({
				verses: fv.shown,
				surah: 'الفَلَق',
				ayahRange: fv.range
			}),
			{
				type: 'text',
				content: `1) ${fv.prompt}`,
				answer: fv.answer,
				mark: '1'
			},
			buildIslamicTableBlock(
				['الكَلِمَةُ فِي سُورَةِ الفَلَقِ', 'مَعْنَاهَا الصَّحِيحُ'],
				orderedVocab.map((it) => [
					{ label: it.word, bold: true },
					{ answer: it.meaning, mark: '0.5' }
				])
			)
		];

		return {
			templateId: 'isl_tpl_1ap_t3_surah_falaq',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'quran_tafsir',
			titleAr: 'سُورَةُ الفَلَقِ: الحِفْظُ مِنَ الشُّرُورِ',
			onecRole: 'part1_knowledge',
			quizQuestion: {
				type: 'mcq',
				questionText: quizPrompt,
				questionTextAr: quizPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مَعْنَى «${quizVocab.word}»: ${quizVocab.meaning}.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الأُولَى (القُرْآنُ الكَرِيمُ: سُورَةُ الفَلَقِ)',
				points: 3,
				instruction: 'اقْرَأِ الآيَاتِ الكَرِيمَةَ ثُمَّ أَكْمِلْ وَاشْرَحِ المُفْرَدَاتِ:',
				content
			},
			hints: [
				'سُورَةُ الفَلَقِ خَمْسُ آيَاتٍ وَمَعْنَى الفَلَقِ الصُّبْحُ.',
				'فِي السُّورَةِ نَسْتَعِيذُ بِاللَّهِ مِنْ شَرِّ المَخْلُوقَاتِ وَاللَّيْلِ وَالسِّحْرِ وَالحَسَدِ.',
				`مَعْنَى «${quizVocab.word}»: ${quizVocab.meaning}.`
			],
			solutionStepsAr: [
				fv.answer,
				...orderedVocab.map((it) => `${it.word}: ${it.meaning}.`)
			],
			finalAnswer: quizVocab.meaning
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Part 2 Application (3 pts): الرفق بالحيوان والتعاون
// ---------------------------------------------------------------------------
const tplKindnessAnimalsCooperation: IslamicParameterizedTemplate = {
	id: 'isl_tpl_1ap_t3_kindness_animals_cooperation',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'akhlaq',
	titleAr: 'الرِّفْقُ بِالحَيَوَانِ وَالتَّعَاوُنُ عَلَى الخَيْرِ',
	curriculumLessonId: 'isl_lesson_1ap_t3_kindness_animals',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 1303);

		const variants = [
			{
				narrator: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ:',
				hadith: 'فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ.',
				source: 'مُتَّفَقٌ عَلَيْهِ',
				tfItems: [
					{ q: 'تَقْدِيمُ المَاءِ وَالطَّعَامِ لِقِطَّةٍ عَطْشَى فِيهِ أَجْرٌ عَظِيمٌ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'رَمْيُ العَصَافِيرِ بِالحِجَارَةِ لَعِبٌ مَقْبُولٌ فِي الإِسْلَامِ.', a: 'خَطَأٌ', c: 'إِيذَاءُ الحَيَوَانِ وَالطُّيُورِ حَرَامٌ فِي الإِسْلَامِ.', mark: '0.5' },
					{ q: 'أَتَعَاوَنُ مَعَ زُمَلَائِي عَلَى تَنْظِيفِ القِسْمِ وَغَرْسِ الأَشْجَارِ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'أَتَعَاوَنُ مَعَ صَدِيقِي عَلَى الغِشِّ فِي الِاخْتِبَارِ.', a: 'خَطَأٌ', c: 'نَتَعَاوَنُ عَلَى البِرِّ وَالتَّقْوَى وَلَا نَتَعَاوَنُ عَلَى الغِشِّ وَالإِثْمِ.', mark: '0.5' }
				],
				mc1Header: 'مَا مَعْنَى «كَبِدٍ رَطْبَةٍ» فِي الحَدِيثِ؟',
				mc1Options: ['كُلُّ كَائِنٍ حَيٍّ', 'الحَجَرُ الكَبِيرُ', 'الطَّعَامُ السَّاخِنُ'],
				mc1Correct: 'كُلُّ كَائِنٍ حَيٍّ',
				mc2Header: 'عَلَى أَيِّ شَيْءٍ أَمَرَنَا اللَّهُ أَنْ نَتَعَاوَنَ؟',
				mc2Options: ['عَلَى البِرِّ وَالتَّقْوَى', 'عَلَى الإِثْمِ وَالعُدْوَانِ', 'عَلَى الكَسَلِ'],
				mc2Correct: 'عَلَى البِرِّ وَالتَّقْوَى',
				quizPrompt: 'مَا مَعْنَى قَوْلِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ»؟',
				quizCorrect: 'فِي الإِحْسَانِ إِلَى كُلِّ كَائِنٍ حَيٍّ أَجْرٌ وَثَوَابٌ عِنْدَ اللَّهِ',
				quizDistractors: [
					{ text: 'لَا أَجْرَ فِي سَقْيِ الحَيَوَانِ', diagnosticFeedback: 'سَقْيُ الحَيَوَانِ فِيهِ أَجْرٌ وَمَغْفِرَةٌ.' },
					{ text: 'يَجُوزُ حَبْسُ الحَيَوَانِ دُونَ طَعَامٍ', diagnosticFeedback: 'حَبْسُ الحَيَوَانِ دُونَ طَعَامٍ ظُلْمٌ عَظِيمٌ.' },
					{ text: 'الأَجْرُ فِي سَقْيِ الإِنْسَانِ فَقَطْ', diagnosticFeedback: 'الحَدِيثُ يَشْمَلُ كُلَّ كَائِنٍ حَيٍّ مِنْ إِنْسَانٍ وَحَيَوَانٍ وَطَيْرٍ.' }
				]
			},
			{
				narrator: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ:',
				hadith: 'وَاللَّهُ فِي عَوْنِ العَبْدِ مَا كَانَ العَبْدُ فِي عَوْنِ أَخِيهِ.',
				source: 'رَوَاهُ مُسْلِمٌ',
				tfItems: [
					{ q: 'مَنْ سَاعَدَ أَخَاهُ المُسْلِمَ أَعَانَهُ اللَّهُ تَعَالَى وَوُفِّقَ فِي أَمْرِهِ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'المُؤْمِنُ لِلْمُؤْمِنِ كَالبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'حَبْسُ قِطَّةٍ فِي قَفَصٍ دُونَ طَعَامٍ أَوْ مَاءٍ سُلُوكٌ حَسَنٌ.', a: 'خَطَأٌ', c: 'حَبْسُ الحَيَوَانِ دُونَ طَعَامٍ حَرَامٌ وَسَبَبٌ لِلْعَذَابِ.', mark: '0.5' },
					{ q: 'أَرْفُضُ مُسَاعَدَةَ شَيْخٍ كَبِيرٍ يَحْمِلُ كِيسًا ثَقِيلًا.', a: 'خَطَأٌ', c: 'أُسَاعِدُ كِبَارَ السِّنِّ وَالمُحْتَاجِينَ بِأَدَبٍ.', mark: '0.5' }
				],
				mc1Header: 'بِمَاذَا شَبَّهَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ تَعَاوُنَ المُؤْمِنِينَ؟',
				mc1Options: ['كَالبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا', 'كَالأَوْرَاقِ المُتَفَرِّقَةِ', 'كَالرِّمَالِ'],
				mc1Correct: 'كَالبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا',
				mc2Header: 'عِنْدَمَا أَرَى طِفْلًا يَضْرِبُ قِطَّةً:',
				mc2Options: ['أَنْصَحُهُ بِلُطْفٍ وَأُذَكِّرُهُ بِالرَّحْمَةِ', 'أَضْحَكُ وَأُشَارِكُهُ', 'أَرْمِيهَا مَعَهُ'],
				mc2Correct: 'أَنْصَحُهُ بِلُطْفٍ وَأُذَكِّرُهُ بِالرَّحْمَةِ',
				quizPrompt: 'مَا جَزَاءُ العَبْدِ الَّذِي يُسَاعِدُ أَخَاهُ المُسْلِمَ كَمَا فِي صَحِيحِ مُسْلِمٍ؟',
				quizCorrect: 'يَكُونُ اللَّهُ فِي عَوْنِهِ مَا دَامَ فِي عَوْنِ أَخِيهِ',
				quizDistractors: [
					{ text: 'يَخْسَرُ وَقْتَهُ دُونَ فَائِدَةٍ', diagnosticFeedback: 'مُسَاعَدَةُ الآخَرِينَ فِيهَا بَرَكَةٌ وَأَجْرٌ عَظِيمٌ.' },
					{ text: 'يَغْضَبُ مِنْهُ أَصْدِقَاؤُهُ', diagnosticFeedback: 'بَلْ يُحِبُّهُ اللَّهُ وَيُحِبُّهُ النَّاسُ.' },
					{ text: 'لَا يَنَالُ أَجْرًا', diagnosticFeedback: 'تَذَكَّرِ الحَدِيثَ: «وَاللَّهُ فِي عَوْنِ العَبْدِ مَا كَانَ العَبْدُ فِي عَوْنِ أَخِيهِ».' }
				]
			},
			{
				narrator: 'عَنْ أَبِي مُوسَى الأَشْعَرِيِّ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ:',
				hadith: 'المُؤْمِنُ لِلْمُؤْمِنِ كَالبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا.',
				source: 'مُتَّفَقٌ عَلَيْهِ',
				tfItems: [
					{ q: 'أَضَعُ مَاءً وَحُبُوبًا لِلْعَصَافِيرِ فِي يَوْمِ الحَرِّ الشَّدِيدِ.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'أُخَرِّبُ أَعْشَاشَ الطُّيُورِ فَوْقَ الأَشْجَارِ.', a: 'خَطَأٌ', c: 'أَحْمِي الطُّيُورَ وَلَا أُخَرِّبُ أَعْشَاشَهَا.', mark: '0.5' },
					{ q: 'أَشْرَحُ الدَّرْسَ لِزَمِيلِي قَبْلَ الِاخْتِبَارِ لِيَفْهَمَهُ جَيِّدًا.', a: 'صَحِيحٌ', c: 'العِبَارَةُ صَحِيحَةٌ.', mark: '0.5' },
					{ q: 'التَّعَاوُنُ عَلَى الإِثْمِ وَإِيذَاءِ الزُّمَلَاءِ يُحِبُّهُ اللَّهُ.', a: 'خَطَأٌ', c: 'نَهَانَا اللَّهُ عَنِ التَّعَاوُنِ عَلَى الإِثْمِ وَالعُدْوَانِ.', mark: '0.5' }
				],
				mc1Header: 'دَخَلَتِ امْرَأَةٌ النَّارَ فِي قِصَّةِ الحَدِيثِ النَّبَوِيِّ بِسَبَبِ:',
				mc1Options: ['هِرَّةٍ حَبَسَتْهَا حَتَّى مَاتَتْ جُوعًا', 'سَقْيِهَا لِقِطَّةٍ', 'إِطْعَامِهَا لِطَائِرٍ'],
				mc1Correct: 'هِرَّةٍ حَبَسَتْهَا حَتَّى مَاتَتْ جُوعًا',
				mc2Header: 'مِنْ ثَمَرَاتِ التَّعَاوُنِ عَلَى البِرِّ:',
				mc2Options: ['نَشْرُ المَحَبَّةِ وَإِنْجَازُ العَمَلِ بِسُرْعَةٍ', 'كَثْرَةُ الخِصَامِ', 'التَّكَاسُلُ'],
				mc2Correct: 'نَشْرُ المَحَبَّةِ وَإِنْجَازُ العَمَلِ بِسُرْعَةٍ',
				quizPrompt: 'أَيُّ تَصَرُّفٍ يَجْمَعُ بَيْنَ الرِّفْقِ بِالحَيَوَانِ وَالتَّعَاوُنِ عَلَى البِرِّ؟',
				quizCorrect: 'تَعَاوُنُ التَّلَامِيذِ عَلَى وَضْعِ المَاءِ وَالحُبُوبِ لِلْعَصَافِيرِ فِي سَاحَةِ المَدْرَسَةِ',
				quizDistractors: [
					{ text: 'مُطَارَدَةُ القِطَطِ وَرَمْيُهَا بِالحِجَارَةِ', diagnosticFeedback: 'إِيذَاءُ القِطَطِ قَسْوَةٌ مَنْهِيٌّ عَنْهَا.' },
					{ text: 'التَّعَاوُنُ عَلَى كِتَابَةِ أَلْفَاظٍ سَيِّئَةٍ', diagnosticFeedback: 'نَتَعَاوَنُ عَلَى الخَيْرِ فَقَطْ لَا عَلَى الإِثْمِ.' },
					{ text: 'حَبْسُ عُصْفُورٍ صَغِيرٍ دُونَ مَاءٍ', diagnosticFeedback: 'حَبْسُ الطَّائِرِ دُونَ مَاءٍ أَوْ طَعَامٍ ظُلْمٌ عَظِيمٌ.' }
				]
			}
		] as const;

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, [...v.quizDistractors], rng);

		const content: ContentBlock[] = [
			buildHadithPassageBlock({
				narrator: v.narrator,
				text: v.hadith,
				source: v.source
			}),
			{
				type: 'true_false',
				items: v.tfItems.map((it) => ({ ...it }))
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: `أ) ${v.mc1Header}`,
						options: rng.shuffle(v.mc1Options),
						correct: v.mc1Correct,
						mark: '0.5'
					},
					{
						header: `ب) ${v.mc2Header}`,
						options: rng.shuffle(v.mc2Options),
						correct: v.mc2Correct,
						mark: '0.5'
					}
				]
			}
		];

		return {
			templateId: 'isl_tpl_1ap_t3_kindness_animals_cooperation',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'akhlaq',
			titleAr: 'الرِّفْقُ بِالحَيَوَانِ وَالتَّعَاوُنُ عَلَى الخَيْرِ',
			onecRole: 'part2_application',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizPrompt,
				questionTextAr: v.quizPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإِجَابَةُ الصَّحِيحَةُ: ${v.quizCorrect}.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الثَّانِيَةُ (الأَخْلَاقُ: الرِّفْقُ بِالحَيَوَانِ وَالتَّعَاوُنُ)',
				points: 3,
				instruction: 'اقْرَأِ الحَدِيثَ الشَّرِيفَ ثُمَّ أَجِبْ بِصَحِيحٍ أَوْ خَطَأٍ وَاخْتَرِ الإِجَابَةَ الصَّحِيحَةَ:',
				content
			},
			hints: [
				'أَمَرَنَا الإِسْلَامُ بِالرَّحْمَةِ بِالحَيَوَانِ وَالتَّعَاوُنِ عَلَى البِرِّ وَالتَّقْوَى.',
				'تَذَكَّرْ أَنَّ الغِشَّ وَإِيذَاءَ الحَيَوَانِ مُحَرَّمَانِ.',
				`الإِجَابَةُ الصَّحِيحَةُ: ${v.quizCorrect}.`
			],
			solutionStepsAr: [
				...v.tfItems.map((it) => `${it.q} -> ${it.a} (${it.c})`),
				v.mc1Correct,
				v.mc2Correct
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Part 2 Application (3 pts): محبة الله تعالى وشكره على نعمه
// ---------------------------------------------------------------------------
const tplLoveGratitudeAllah: IslamicParameterizedTemplate = {
	id: 'isl_tpl_1ap_t3_love_gratitude_allah',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'aqeedah',
	titleAr: 'مَحَبَّةُ اللَّهِ تَعَالَى وَشُكْرُهُ عَلَى نِعَمِهِ',
	curriculumLessonId: 'isl_lesson_1ap_t3_love_gratitude_allah',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 1304);

		const blessings = [
			{
				blessing: 'نِعْمَةُ الإِسْلَامِ وَالإِيمَانِ',
				how: 'أُحِبُّ اللَّهَ وَأَعْبُدُهُ وَحْدَهُ وَأُحَافِظُ عَلَى الصَّلَاةِ',
				wrong: ['أَتْرُكُ ذِكْرَ اللَّهِ', 'أَتَكَاسَلُ عَنِ الطَّاعَةِ', 'أَكْذِبُ عَلَى النَّاسِ']
			},
			{
				blessing: 'نِعْمَةُ البَصَرِ وَالعَقْلِ',
				how: 'أَقْرَأُ القُرْآنَ وَأَطْلُبُ العِلْمَ النَّافِعَ',
				wrong: ['أُضَيِّعُ وَقْتِي فِيمَا لَا يَنْفَعُ', 'أَسْخَرُ مِنْ زُمَلَائِي', 'أُهْمِلُ دُرُوسِي']
			},
			{
				blessing: 'نِعْمَةُ المَاءِ وَالطَّعَامِ',
				how: 'أَقُولُ «الحَمْدُ لِلَّهِ» وَلَا أُسْرِفُ وَلَا أَرْمِي الخُبْزَ',
				wrong: ['أَتْرُكُ الصُّنْبُورَ مَفْتُوحًا', 'أَرْمِي الطَّعَامَ عَلَى الأَرْضِ', 'أَعِيبُ الطَّعَامَ']
			},
			{
				blessing: 'نِعْمَةُ الوَالِدَيْنِ وَالأُسْرَةِ',
				how: 'أُطِيعُ وَالِدَيَّ وَأَبَرُّهُمَا وَأَدْعُو لَهُمَا',
				wrong: ['أَرْفَعُ صَوْتِي عَلَيْهِمَا', 'أَرْفُضُ مُسَاعَدَتَهُمَا', 'أَتَشَاجَرُ مَعَ إِخْوَتِي']
			},
			{
				blessing: 'نِعْمَةُ الصِّحَّةِ وَالجِسْمِ السَّلِيمِ',
				how: 'أُحَافِظُ عَلَى نَظَافَتِي وَأُسَاعِدُ المُحْتَاجِينَ',
				wrong: ['أُؤْذِي الضُّعَفَاءَ', 'أُهْمِلُ نَظَافَةَ جِسْمِي', 'أَغُشُّ فِي المَدْرَسَةِ']
			}
		] as const;

		const rows = rng.pickDistinct(blessings, 4);
		const target = rng.pick(rows);

		const verseChoices = [
			{
				verses: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
				surah: 'إِبْرَاهِيم',
				range: '7',
				q: 'بِمَاذَا وَعَدَ اللَّهُ تَعَالَى عِبَادَهُ الشَّاكِرِينَ فِي هَذِهِ الآيَةِ؟',
				a: 'وَعَدَهُمُ اللَّهُ بِزِيَادَةِ النِّعَمِ وَالبَرَكَةِ فِيهَا.'
			},
			{
				verses: 'وَإِنْ تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا',
				surah: 'النَّحْل',
				range: '18',
				q: 'هَلْ نَسْتَطِيعُ أَنْ نَعُدَّ جَمِيعَ نِعَمِ اللَّهِ عَلَيْنَا؟ وَلِمَاذَا؟',
				a: 'لَا نَسْتَطِيعُ؛ لِأَنَّ نِعَمَ اللَّهِ عَلَيْنَا كَثِيرَةٌ جِدًّا لَا تُعَدُّ وَلَا تُحْصَى.'
			}
		] as const;

		const vc = rng.pick(verseChoices);
		const mcq = buildUniqueMcqOptions(
			target.how,
			target.wrong.map((w) => ({
				text: w,
				diagnosticFeedback: `هَذَا السُّلُوكُ يُنَافِي شُكْرَ ${target.blessing}.`
			})),
			rng
		);

		const quizPrompt = `كَيْفَ تَشْكُرُ اللَّهَ تَعَالَى عَلَى «${target.blessing}»؟`;

		const content: ContentBlock[] = [
			buildQuranPassageBlock({
				verses: vc.verses,
				surah: vc.surah,
				ayahRange: vc.range
			}),
			{
				type: 'text',
				content: `1) ${vc.q}\n................................................................`,
				answer: vc.a,
				mark: '1'
			},
			buildIslamicTableBlock(
				['النِّعْمَةُ مِنَ اللَّهِ تَعَالَى', 'كَيْفَ أَشْكُرُ اللَّهَ عَلَيْهَا؟'],
				rows.map((r) => [
					{ label: r.blessing, bold: true },
					{ answer: r.how, mark: '0.5' }
				])
			)
		];

		return {
			templateId: 'isl_tpl_1ap_t3_love_gratitude_allah',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'aqeedah',
			titleAr: 'مَحَبَّةُ اللَّهِ تَعَالَى وَشُكْرُهُ عَلَى نِعَمِهِ',
			onecRole: 'part2_application',
			quizQuestion: {
				type: 'mcq',
				questionText: quizPrompt,
				questionTextAr: quizPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَشْكُرُ اللَّهَ عَلَى ${target.blessing} بِـ: ${target.how}.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الثَّانِيَةُ (العَقِيدَةُ: مَحَبَّةُ اللَّهِ وَشُكْرُهُ)',
				points: 3,
				instruction: 'اقْرَأِ الآيَةَ الكَرِيمَةَ ثُمَّ أَجِبْ وَأَكْمِلِ الجَدْوَلَ:',
				content
			},
			hints: [
				'نَشْكُرُ اللَّهَ بِالقَلْبِ (المَحَبَّةُ) وَاللِّسَانِ (الحَمْدُ لِلَّهِ) وَالجَوَارِحِ (الطَّاعَةُ وَحِفْظُ النِّعَمِ).',
				'شُكْرُ اللَّهِ سَبَبُ زِيَادَةِ النِّعَمِ وَبَقَائِهَا.',
				`الإِجَابَةُ الصَّحِيحَةُ: ${target.how}.`
			],
			solutionStepsAr: [vc.a, ...rows.map((r) => `${r.blessing} -> ${r.how}.`)],
			finalAnswer: target.how
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Integration (4 pts): الوضعية الإدماجية للفصل الثالث
// ---------------------------------------------------------------------------
const tplIntegrationT3: IslamicParameterizedTemplate = {
	id: 'isl_tpl_1ap_t3_integration_mercy_gratitude',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: الرَّحْمَةُ وَالتَّعَاوُنُ وَشُكْرُ النِّعَمِ',
	curriculumLessonId: 'isl_lesson_1ap_t3_cooperation_helping',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 1305);

		const scenarios = [
			{
				verses: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
				surah: 'المَائِدَة',
				range: '2',
				warmupQ: 'بِمَاذَا أَمَرَنَا اللَّهُ تَعَالَى فِي هَذِهِ الآيَةِ الكَرِيمَةِ؟ وَعَمَّ نَهَانَا؟',
				warmupA: 'أَمَرَنَا بِالتَّعَاوُنِ عَلَى البِرِّ وَالتَّقْوَى، وَنَهَانَا عَنِ التَّعَاوُنِ عَلَى الإِثْمِ وَالعُدْوَانِ.',
				context:
					'فِي حَمْلَةِ تَطَوُّعٍ بِالحَيِّ، تَعَاوَنَ أَمِينُ وَأَصْدِقَاؤُهُ عَلَى تَنْظِيفِ الحَدِيقَةِ وَسَقْيِ الأَشْجَارِ، وَرَأَوْا عُصْفُورًا صَغِيرًا عَطْشَانَ.',
				instruction:
					'اكْتُبْ ثَلَاثَ جُمَلٍ بَسِيطَةٍ تَذْكُرُ فِيهَا: (1) كَيْفَ يَرْفُقُونَ بِالعُصْفُورِ، (2) فَائِدَةً مِنَ التَّعَاوُنِ، (3) كَيْفَ يَشْكُرُونَ اللَّهَ عَلَى نِعْمَةِ المَاءِ وَالطَّبِيعَةِ.',
				modelOutline:
					'يَضَعُونَ المَاءَ وَالحُبُوبَ لِلْعُصْفُورِ عَمَلًا بِحَدِيثِ «فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ». وَالتَّعَاوُنُ يَنْشُرُ المَحَبَّةَ وَيُسَهِّلُ العَمَلَ. وَنَشْكُرُ اللَّهَ بِقَوْلِ «الحَمْدُ لِلَّهِ» وَالمُحَافَظَةِ عَلَى المَاءِ دُونَ إِسْرَافٍ.',
				quizPrompt: 'أَيُّ سُلُوكٍ يُطَبِّقُ قِيَمَ التَّعَاوُنِ وَالرَّحْمَةِ وَشُكْرِ النِّعَمِ مَعًا؟',
				quizCorrect: 'التَّعَاوُنُ عَلَى تَنْظِيفِ الحَدِيقَةِ وَسَقْيِ الطُّيُورِ وَالاِقْتِصَادُ فِي المَاءِ',
				quizDistractors: [
					{ text: 'تَرْكُ صُنْبُورِ الحَدِيقَةِ مَفْتُوحًا وَرَمْيُ الأَوْرَاقِ', diagnosticFeedback: 'تَبْذِيرُ المَاءِ يُخَالِفُ شُكْرَ النِّعَمِ.' },
					{ text: 'إِزْعَاجُ العَصَافِيرِ وَتَكْسِيرُ أَغْصَانِ الأَشْجَارِ', diagnosticFeedback: 'الإِسْلَامُ يَنْهَى عَنِ الإِيذَاءِ وَالتَّخْرِيبِ.' },
					{ text: 'الرَّفْضُ التَّامُّ لِمُسَاعَدَةِ الجِيرَانِ وَالزُّمَلَاءِ', diagnosticFeedback: 'المُسْلِمُ مُتَعَاوِنٌ عَلَى الخَيْرِ.' }
				]
			},
			{
				verses: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
				surah: 'إِبْرَاهِيم',
				range: '7',
				warmupQ: 'مَا الجَزَاءُ الَّذِي وَعَدَ اللَّهُ بِهِ مَنْ يَشْكُرُ نِعَمَهُ؟',
				warmupA: 'وَعَدَهُ اللَّهُ بِزِيَادَةِ النِّعَمِ.',
				context:
					'قَبْلَ النَّوْمِ، تَذَكَّرَتْ مَرْيَمُ نِعَمَ اللَّهِ عَلَيْهَا: الصِّحَّةُ وَالأُسْرَةُ وَالطَّعَامُ، وَأَرَادَتْ أَنْ تَحْفَظَ نَفْسَهَا بِأَذْكَارِ النَّوْمِ.',
				instruction:
					'اكْتُبْ ثَلَاثَ جُمَلٍ تَذْكُرُ فِيهَا: (1) السُّورَتَيْنِ اللَّتَيْنِ تَقْرَؤُهُمَا مَرْيَمُ لِلِاسْتِعَاذَةِ بِاللَّهِ، (2) كَيْفَ تَشْكُرُ اللَّهَ بِلِسَانِهَا وَعَمَلِهَا، (3) مِثَالًا لِمُسَاعَدَةِ أُسْرَتِهَا.',
				modelOutline:
					'تَقْرَأُ مَرْيَمُ المُعَوِّذَتَيْنِ: سُورَةَ الفَلَقِ وَسُورَةَ النَّاسِ لِيَحْفَظَهَا اللَّهُ. وَتَشْكُرُ اللَّهَ بِقَوْلِ «الحَمْدُ لِلَّهِ» وَطَاعَتِهِ وَعَدَمِ التَّبْذِيرِ. وَتُسَاعِدُ أُمَّهَا فِي تَرْتِيبِ غُرْفَتِهَا.',
				quizPrompt: 'مَا أَفْضَلُ خِتَامٍ لِيَوْمِ التِّلْمِيذِ المُسْلِمِ قَبْلَ النَّوْمِ؟',
				quizCorrect: 'شُكْرُ اللَّهِ وَقِرَاءَةُ سُورَةِ الإِخْلَاصِ وَالفَلَقِ وَالنَّاسِ',
				quizDistractors: [
					{ text: 'النَّوْمُ دُونَ ذِكْرِ اللَّهِ بَعْدَ إِضَاعَةِ الوَقْتِ', diagnosticFeedback: 'المُسْلِمُ يَحْتَمِي بِاللَّهِ وَيَقْرَأُ أَذْكَارَ النَّوْمِ.' },
					{ text: 'السَّهَرُ الطَّوِيلُ وَإِزْعَاجُ الإِخْوَةِ', diagnosticFeedback: 'النَّوْمُ البَاكِرُ يُحَافِظُ عَلَى نِعْمَةِ الصِّحَّةِ.' },
					{ text: 'نِسْيَانُ شُكْرِ اللَّهِ عَلَى نِعَمِهِ', diagnosticFeedback: 'نَشْكُرُ اللَّهَ دَائِمًا لِتَدُومَ النِّعَمُ وَتَزِيدَ.' }
				]
			},
			{
				verses: 'وَإِنْ تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا',
				surah: 'النَّحْل',
				range: '18',
				warmupQ: 'مَا أَعْظَمُ نِعْمَةٍ أَنْعَمَ اللَّهُ بِهَا عَلَيْنَا، وَاذْكُرْ نِعْمَتَيْنِ أُخْرَيَيْنِ؟',
				warmupA: 'أَعْظَمُ نِعْمَةٍ هِيَ نِعْمَةُ الإِسْلَامِ، وَمِنْ نِعَمِهِ أَيْضًا الصِّحَّةُ وَالأُسْرَةُ وَالعَقْلُ وَالمَاءُ.',
				context:
					'رَأَى يُوسُفُ فِي طَرِيقِهِ إِلَى المَدْرَسَةِ قِطَّةً جَائِعَةً، وَزَمِيلَهُ سَقَطَتْ كُتُبُهُ عَلَى الأَرْضِ.',
				instruction:
					'بَيِّنْ فِي ثَلَاثِ جُمَلٍ: (1) كَيْفَ يَتَعَاوَنُ يُوسُفُ مَعَ زَمِيلِهِ، (2) كَيْفَ يُحْسِنُ إِلَى القِطَّةِ، (3) بِمَاذَا يَسْتَعِيذُ مِنَ الشُّرُورِ كُلَّ صَبَاحٍ.',
				modelOutline:
					'يُسَاعِدُ يُوسُفُ زَمِيلَهُ فِي جَمْعِ كُتُبِهِ لِأَنَّ اللَّهَ فِي عَوْنِ العَبْدِ مَا كَانَ فِي عَوْنِ أَخِيهِ. وَيُقَدِّمُ الطَّعَامَ وَالمَاءَ لِلْقِطَّةِ رِفْقًا بِهَا. وَيَقْرَأُ سُورَتَيِ الفَلَقِ وَالنَّاسِ كُلَّ صَبَاحٍ لِيَحْفَظَهُ اللَّهُ.',
				quizPrompt: 'رَأَيْتَ زَمِيلَكَ سَقَطَتْ كُتُبُهُ وَقِطَّةً عَطْشَى فِي طَرِيقِكَ؛ مَا التَّصَرُّفُ الإِسْلَامِيُّ؟',
				quizCorrect: 'أُسَاعِدُ زَمِيلِي فِي جَمْعِ كُتُبِهِ وَأُقَدِّمُ المَاءَ لِلْقِطَّةِ رَحْمَةً بِهَا',
				quizDistractors: [
					{ text: 'أَضْحَكُ عَلَى زَمِيلِي وَأَتْرُكُ القِطَّةَ', diagnosticFeedback: 'السُّخْرِيَةُ حَرَامٌ، وَالمُسْلِمُ رَحِيمٌ مُتَعَاوِنٌ.' },
					{ text: 'أَمْضِي دُونَ أَنْ أُسَاعِدَ أَحَدًا', diagnosticFeedback: 'مُسَاعَدَةُ الآخَرِينَ وَالرِّفْقُ بِالحَيَوَانِ فِيهِمَا أَجْرٌ عَظِيمٌ.' },
					{ text: 'أَرْمِي القِطَّةَ بِحَجَرٍ', diagnosticFeedback: 'إِيذَاءُ الحَيَوَانِ حَرَامٌ فِي الإِسْلَامِ.' }
				]
			}
		] as const;

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.quizCorrect, [...sc.quizDistractors], rng);

		const content: ContentBlock[] = [
			buildQuranPassageBlock({
				verses: sc.verses,
				surah: sc.surah,
				ayahRange: sc.range
			}),
			{
				type: 'text',
				content: `1) ${sc.warmupQ}\n................................................................`,
				answer: sc.warmupA,
				mark: '1'
			},
			buildIslamicIntegrationBlock({
				context: sc.context,
				instruction: `2) ${sc.instruction}`,
				rubricCriteria: [
					'تَوْظِيفُ قِيَمِ الرَّحْمَةِ وَالتَّعَاوُنِ وَشُكْرِ اللَّهِ (1.5 ن)',
					'الِاسْتِشْهَادُ بِدَلِيلٍ قُرْآنِيٍّ أَوْ نَبَوِيٍّ صَحِيحٍ (1 ن)',
					'وُضُوحُ الإِجَابَةِ وَحُسْنُ الخَطِّ (0.5 ن)'
				],
				modelOutline: sc.modelOutline,
				mark: '3'
			})
		];

		return {
			templateId: 'isl_tpl_1ap_t3_integration_mercy_gratitude',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: الرَّحْمَةُ وَالتَّعَاوُنُ وَشُكْرُ النِّعَمِ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: sc.quizPrompt,
				questionTextAr: sc.quizPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإِجَابَةُ الصَّحِيحَةُ: ${sc.quizCorrect}.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				points: 4,
				instruction: 'اقْرَأِ السَّنَدَ القُرْآنِيَّ ثُمَّ أَجِبْ عَنِ السُّؤَالِ وَأَنْجِزِ التَّعْلِيمَةَ:',
				content
			},
			hints: [
				'اقْرَأِ الآيَةَ الكَرِيمَةَ وَاسْتَخْرِجِ الإِجَابَةَ الأُولَى بِوُضُوحٍ.',
				'ارْبُطْ بَيْنَ الرِّفْقِ بِالحَيَوَانِ وَالتَّعَاوُنِ وَشُكْرِ اللَّهِ وَقِرَاءَةِ المُعَوِّذَتَيْنِ.',
				`الإِجَابَةُ الصَّحِيحَةُ: ${sc.quizCorrect}.`
			],
			solutionStepsAr: [sc.warmupA, sc.modelOutline],
			finalAnswer: sc.quizCorrect
		};
	}
};

export const TEMPLATES_1AP_T3: IslamicParameterizedTemplate[] = [
	tplSurahNas,
	tplSurahFalaq,
	tplKindnessAnimalsCooperation,
	tplLoveGratitudeAllah,
	tplIntegrationT3
];
