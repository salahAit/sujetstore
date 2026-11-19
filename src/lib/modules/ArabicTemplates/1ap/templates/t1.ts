import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildProsePassageBlock, buildWrittenProductionBlock } from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 41;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 89 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Intellectual Building (التقييم التشخيصي والتكويني: القراءة والفهم)
// ---------------------------------------------------------------------------
const tplReadingFamilySchool: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t1_reading_family_school',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: القِرَاءَةُ وَالفَهْمُ (الأُسْرَةُ وَالمَدْرَسَةُ)',
	curriculumLessonId: 'arb_lesson_1ap_t1_short_text_family_school',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 101);
		const passages = [
			{
				title: 'صَبَاحُ أَمِينٍ فِي البَيْتِ',
				text: 'اسْتَيْقَظَ أَمِينُ بَاكِرًا وَغَسَلَ وَجْهَهُ بِالمَاءِ. سَلَّمَ أَمِينُ عَلَى أَبِيهِ وَأُمِّهِ وَقَالَ: «السَّلَامُ عَلَيْكُمْ». تَنَاوَلَ فُطُورَهُ وَقَالَ: «بِسْمِ اللَّهِ»، ثُمَّ ذَهَبَ مَسْرُورًا إِلَى المَدْرَسَةِ.',
				q1: 'مَتَى اسْتَيْقَظَ أَمِينُ؟',
				a1: 'اسْتَيْقَظَ أَمِينُ بَاكِرًا.',
				q2: 'مَاذَا قَالَ أَمِينُ لِأَبِيهِ وَأُمِّهِ؟',
				a2: 'قَالَ لَهُمَا: «السَّلَامُ عَلَيْكُمْ».',
				q3: 'إِلَى أَيْنَ ذَهَبَ أَمِينُ بَعْدَ الفُطُورِ؟',
				a3: 'ذَهَبَ أَمِينُ إِلَى المَدْرَسَةِ.',
				mcqPrompt: 'فِي النَّصِّ، إِلَى أَيْنَ ذَهَبَ أَمِينُ بَعْدَ أَنْ تَنَاوَلَ فُطُورَهُ؟',
				correct: 'إِلَى المَدْرَسَةِ',
				distractors: [
					{ text: 'إِلَى السُّوقِ', diagnosticFeedback: 'لَمْ يُذْكَرِ السُّوقُ فِي النَّصِّ، أَعِدْ قِرَاءَةَ آخِرِ جُمْلَةٍ.' },
					{ text: 'إِلَى الغَابَةِ', diagnosticFeedback: 'لَا، أَمِينُ تِلْمِيذٌ يَذْهَبُ صَبَاحًا لِطَلَبِ العِلْمِ.' },
					{ text: 'إِلَى الشَّاطِئِ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الأَخِيرَةَ مِنَ النَّصِّ بِتَأَنٍّ.' }
				],
				valueAr: 'بِرُّ الوَالِدَيْنِ وَإِلْقَاءُ السَّلَامِ وَحُبُّ المَدْرَسَةِ.'
			},
			{
				title: 'مَرْيَمُ تُسَاعِدُ أُمَّهَا',
				text: 'فِي يَوْمِ العُطْلَةِ، نَظَّفَتْ مَرْيَمُ غُرْفَتَهَا وَرَتَّبَتْ كُتُبَهَا فَوْقَ المَكْتَبِ. دَخَلَتِ الأُمُّ فَرِحَةً وَقَالَتْ: «بَارَكَ اللَّهُ فِيكِ يَا مَرْيَمُ، أَنْتِ بِنْتٌ مُرَتَّبَةٌ وَمُطِيعَةٌ».',
				q1: 'مَاذَا نَظَّفَتْ مَرْيَمُ فِي يَوْمِ العُطْلَةِ؟',
				a1: 'نَظَّفَتْ مَرْيَمُ غُرْفَتَهَا.',
				q2: 'أَيْنَ رَتَّبَتْ مَرْيَمُ كُتُبَهَا؟',
				a2: 'رَتَّبَتْ كُتُبَهَا فَوْقَ المَكْتَبِ.',
				q3: 'بِمَاذَا دَعَتِ الأُمُّ لِابْنَتِهَا مَرْيَمَ؟',
				a3: 'دَعَتْ لَهَا بِلُطْفٍ: «بَارَكَ اللَّهُ فِيكِ يَا مَرْيَمُ».',
				mcqPrompt: 'أَيْنَ رَتَّبَتْ مَرْيَمُ كُتُبَهَا فِي النَّصِّ؟',
				correct: 'فَوْقَ المَكْتَبِ',
				distractors: [
					{ text: 'فِي السَّاحَةِ', diagnosticFeedback: 'الكُتُبُ لَا تُرَتَّبُ فِي السَّاحَةِ، ارْجِعْ إِلى النَّصِّ.' },
					{ text: 'تَحْتَ السَّرِيرِ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الأُولَى مِنَ النَّصِّ جَيِّدًا.' },
					{ text: 'فِي الحَدِيقَةِ', diagnosticFeedback: 'مَرْيَمُ كَانَتْ فِي غُرْفَتِهَا.' }
				],
				valueAr: 'النِّظَامُ وَالنَّظَافَةُ وَطَاعَةُ الأُمِّ.'
			},
			{
				title: 'بِلَالٌ فِي القِسْمِ',
				text: 'دَخَلَ بِلَالٌ القِسْمَ بِهُدُوءٍ وَجَلَسَ فِي مَقْعَدِهِ. أَخْرَجَ كُرَّاسَهُ وَقَلَمَهُ وَانْتَبَهَ لِشَرْحِ المُعَلِّمِ. كَتَبَ بِلَالٌ الحُرُوفَ بِخَطٍّ جَمِيلٍ وَوَاضِحٍ.',
				q1: 'كَيْفَ دَخَلَ بِلَالٌ إِلَى القِسْمِ؟',
				a1: 'دَخَلَ بِلَالٌ القِسْمَ بِهُدُوءٍ.',
				q2: 'مَاذَا أَخْرَجَ بِلَالٌ مِنْ مِحْفَظَتِهِ؟',
				a2: 'أَخْرَجَ كُرَّاسَهُ وَقَلَمَهُ.',
				q3: 'كَيْفَ كَتَبَ بِلَالٌ الحُرُوفَ؟',
				a3: 'كَتَبَ بِلَالٌ الحُرُوفَ بِخَطٍّ جَمِيلٍ وَوَاضِحٍ.',
				mcqPrompt: 'مَاذَا أَخْرَجَ بِلَالٌ عِنْدَمَا جَلَسَ فِي مَقْعَدِهِ؟',
				correct: 'كُرَّاسَهُ وَقَلَمَهُ',
				distractors: [
					{ text: 'كُرَتَهُ وَحِذَاءَهُ', diagnosticFeedback: 'فِي القِسْمِ نَسْتَعْمِلُ الأَدَوَاتِ المَدْرَسِيَّةَ.' },
					{ text: 'طَعَامَهُ وَمَاءَهُ', diagnosticFeedback: 'ارْجِعْ إِلى الجُمْلَةِ الثَّانِيَةِ فِي النَّصِّ.' },
					{ text: 'مِظَلَّتَهُ وَمِعْطَفَهُ', diagnosticFeedback: 'لَمْ تُذْكَرِ المِظَلَّةُ فِي النَّصِّ.' }
				],
				valueAr: 'الِانْضِبَاطُ فِي القِسْمِ وَالِاهْتِمَامُ بِالعِلْمِ.'
			},
			{
				title: 'زِيَارَةُ الجَدِّ',
				text: 'زَارَتْ سَارَةُ جَدَّهَا مَعَ أَبِيهَا يَوْمَ الجُمُعَةِ. قَبَّلَتْ سَارَةُ رَأْسَ جَدِّهَا وَقَدَّمَتْ لَهُ تَمْرًا وَلَبَنًا. فَرِحَ الجَدُّ وَقَرَأَ لَهَا قِصَّةً مُفِيدَةً.',
				q1: 'مَتَى زَارَتْ سَارَةُ جَدَّهَا؟',
				a1: 'زَارَتْهُ يَوْمَ الجُمُعَةِ.',
				q2: 'مَاذَا قَدَّمَتْ سَارَةُ لِجَدِّهَا؟',
				a2: 'قَدَّمَتْ لَهُ تَمْرًا وَلَبَنًا.',
				q3: 'مَاذَا فَعَلَ الجَدُّ عِنْدَمَا فَرِحَ؟',
				a3: 'قَرَأَ لَهَا قِصَّةً مُفِيدَةً.',
				mcqPrompt: 'مَاذَا قَدَّمَتْ سَارَةُ لِجَدِّهَا فِي النَّصِّ؟',
				correct: 'تَمْرًا وَلَبَنًا',
				distractors: [
					{ text: 'قَلَمًا وَكِتَابًا', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ النَّصِّ.' },
					{ text: 'تُفَّاحًا وَعِنَبًا', diagnosticFeedback: 'لَمْ يُذْكَرِ التُّفَّاحُ فِي النَّصِّ.' },
					{ text: 'كُرَةً وَقُبَّعَةً', diagnosticFeedback: 'ارْجِعْ إِلى النَّصِّ لِتَجِدَ الطَّعَامَ المَذْكُورَ.' }
				],
				valueAr: 'صِلَةُ الرَّحِمِ وَاحْتِرَامُ الجَدِّ.'
			}
		] as const;

		const item = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(item.correct, [...item.distractors], rng);

		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: item.title,
				paragraphs: [item.text]
			}),
			{
				type: 'text',
				content: `1) ${item.q1}\n................................................................`,
				answer: item.a1,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${item.q2}\n................................................................`,
				answer: item.a2,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) ${item.q3}\n................................................................`,
				answer: item.a3,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t1_reading_family_school',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: القِرَاءَةُ وَالفَهْمُ (الأُسْرَةُ وَالمَدْرَسَةُ)',
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقْرَأِ النَّصَّ: «${item.text}»\n${item.mcqPrompt}`,
				questionTextAr: `اقْرَأِ النَّصَّ: «${item.text}»\n${item.mcqPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَخْرِجُ الإِجَابَةَ مُبَاشَرَةً مِنَ النَّصِّ: ${item.correct}. القِيمَةُ التَّرْبَوِيَّةُ: ${item.valueAr}`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (القِرَاءَةُ وَالفَهْمُ)',
				points: 3,
				instruction: 'اقْرَأِ النَّصَّ المَشْكُولَ جَيِّدًا ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'اقْرَأِ النَّصَّ بِهُدُوءٍ مَرَّتَيْنِ مَعَ مُرَاعَاةِ الحَرَكَاتِ.',
				'ابْحَثْ عَنِ الكَلِمَاتِ المِفْتَاحِيَّةِ فِي السُّؤَالِ دَاخِلَ النَّصِّ.',
				`الإِجَابَةُ الصَّحِيحَةُ لِلسُّؤَالِ التَّفَاعُلِيِّ هِيَ: ${item.correct}.`
			],
			solutionStepsAr: [item.a1, item.a2, item.a3],
			finalAnswer: item.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Short Vowels & Long Vowels (الحركات القصيرة والمدود)
// ---------------------------------------------------------------------------
const tplShortLongVowels: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t1_short_long_vowels',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'phonics_reading',
	titleAr: 'الحَرَكَاتُ القَصِيرَةُ وَالمُدُودُ الطَّوِيلَةُ',
	curriculumLessonId: 'arb_lesson_1ap_t1_short_vowels',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 102);

		const maddCases = [
			{
				word: 'كِتَابٌ',
				maddType: 'مَدٌّ بِالأَلِفِ',
				syllable: 'تَا',
				wrong: ['مَدٌّ بِالوَاوِ', 'مَدٌّ بِاليَاءِ', 'لَا يُوجَدُ مَدٌّ']
			},
			{
				word: 'عُصْفُورٌ',
				maddType: 'مَدٌّ بِالوَاوِ',
				syllable: 'فُو',
				wrong: ['مَدٌّ بِالأَلِفِ', 'مَدٌّ بِاليَاءِ', 'لَا يُوجَدُ مَدٌّ']
			},
			{
				word: 'تِلْمِيذٌ',
				maddType: 'مَدٌّ بِاليَاءِ',
				syllable: 'مِي',
				wrong: ['مَدٌّ بِالأَلِفِ', 'مَدٌّ بِالوَاوِ', 'لَا يُوجَدُ مَدٌّ']
			},
			{
				word: 'بَابٌ',
				maddType: 'مَدٌّ بِالأَلِفِ',
				syllable: 'بَا',
				wrong: ['مَدٌّ بِالوَاوِ', 'مَدٌّ بِاليَاءِ', 'لَا يُوجَدُ مَدٌّ']
			},
			{
				word: 'نُورٌ',
				maddType: 'مَدٌّ بِالوَاوِ',
				syllable: 'نُو',
				wrong: ['مَدٌّ بِالأَلِفِ', 'مَدٌّ بِاليَاءِ', 'لَا يُوجَدُ مَدٌّ']
			},
			{
				word: 'حَقِيبَةٌ',
				maddType: 'مَدٌّ بِاليَاءِ',
				syllable: 'قِي',
				wrong: ['مَدٌّ بِالأَلِفِ', 'مَدٌّ بِالوَاوِ', 'لَا يُوجَدُ مَدٌّ']
			}
		] as const;

		const vowelSets = [
			{ word: 'قَلَمٌ', letter: 'القَافِ', vowel: 'الفَتْحَةُ (قَ)' },
			{ word: 'كُتُبٌ', letter: 'الكَافِ', vowel: 'الضَّمَّةُ (كُ)' },
			{ word: 'بِنْتٌ', letter: 'البَاءِ', vowel: 'الكَسْرَةُ (بِ)' },
			{ word: 'مَسْجِدٌ', letter: 'السِّينِ', vowel: 'السُّكُونُ (سْ)' }
		] as const;

		const targetMadd = rng.pick(maddCases);
		const tableItems = rng.pickDistinct(maddCases, 2);
		const vowelPair = rng.pickDistinct(vowelSets, 2);

		const mcq = buildUniqueMcqOptions(
			targetMadd.maddType,
			targetMadd.wrong.map((w) => ({
				text: w,
				diagnosticFeedback: `انْظُرْ إِلى مَقْطَعِ المَدِّ «${targetMadd.syllable}» فِي كَلِمَةِ «${targetMadd.word}».`
			})),
			rng
		);

		const qText = `مَا نَوْعُ المَدِّ المَوْجُودِ فِي كَلِمَةِ «${targetMadd.word}»؟`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) حَدِّدْ حَرَكَةَ الحَرْفِ المَطْلُوبِ فِي كُلِّ كَلِمَةٍ:\n- حَرَكَةُ ${vowelPair[0].letter} فِي «${vowelPair[0].word}»: ....................\n- حَرَكَةُ ${vowelPair[1].letter} فِي «${vowelPair[1].word}»: ....................`,
				answer: `فِي «${vowelPair[0].word}»: ${vowelPair[0].vowel} — فِي «${vowelPair[1].word}»: ${vowelPair[1].vowel}.`,
				mark: '1'
			},
			{
				type: 'table',
				headers: ['الكَلِمَةُ', 'نَوْعُ المَدِّ (بِالأَلِفِ / بِالوَاوِ / بِاليَاءِ)'],
				cells: [],
				rows: tableItems.map((it) => [
					{ content: it.word, bold: true },
					{ content: '................................', answer: `${it.maddType} (${it.syllable})`, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t1_short_long_vowels',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'phonics_reading',
			titleAr: 'الحَرَكَاتُ القَصِيرَةُ وَالمُدُودُ الطَّوِيلَةُ',
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `فِي كَلِمَةِ «${targetMadd.word}» يُوجَدُ ${targetMadd.maddType} فِي المَقْطَعِ «${targetMadd.syllable}».`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الأَصْوَاتُ وَالمُدُودُ)',
				points: 2,
				instruction: 'أَجِبْ عَنِ التَّمْرِينِ الصَّوْتِيِّ التَّالِي:',
				content
			},
			hints: [
				'حُرُوفُ المَدِّ ثَلَاثَةٌ: الأَلِفُ قَبْلَهَا فَتْحَةٌ، الوَاوُ قَبْلَهَا ضَمَّةٌ، اليَاءُ قَبْلَهَا كَسْرَةٌ.',
				`انْطِقْ كَلِمَةَ «${targetMadd.word}» بِبُطْءٍ لِتَسْمَعَ الصَّوْتَ الطَّوِيلَ.`,
				`فِي «${targetMadd.word}» نَجِدُ: ${targetMadd.maddType}.`
			],
			solutionStepsAr: [
				`نُحَدِّدُ الحَرَكَةَ القَصِيرَةَ فَوْقَ الحَرْفِ أَوْ تَحْتَهُ: ${vowelPair[0].vowel} وَ${vowelPair[1].vowel}.`,
				`نُمَيِّزُ حَرْفَ المَدِّ فِي «${tableItems[0].word}»: ${tableItems[0].maddType}.`,
				`نُمَيِّزُ حَرْفَ المَدِّ فِي «${tableItems[1].word}»: ${tableItems[1].maddType}.`
			],
			finalAnswer: targetMadd.maddType
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Syllables & Word-Building (المقطع الصوتي وتكوين الكلمة)
// ---------------------------------------------------------------------------
const tplSyllableWordBuild: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t1_syllable_word_build',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'phonics_reading',
	titleAr: 'التَّقْطِيعُ الصَّوْتِيُّ وَتَكْوِينُ الكَلِمَاتِ',
	curriculumLessonId: 'arb_lesson_1ap_t1_syllables_words',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 103);
		const words = [
			{
				word: 'مَسْجِدٌ',
				syllables: ['مَسْ', 'جِـ', 'دٌ'],
				cut: 'مَسْ / جِـ / دٌ',
				wrongWords: ['جَمَسٌ', 'دَمِيسٌ', 'سَمَجٌ']
			},
			{
				word: 'مَدْرَسَةٌ',
				syllables: ['مَدْ', 'رَ', 'سَـ', 'ةٌ'],
				cut: 'مَدْ / رَ / سَـ / ةٌ',
				wrongWords: ['سَمَرَةٌ', 'دَرَمَةٌ', 'رَسْمَةٌ']
			},
			{
				word: 'تِلْمِيذٌ',
				syllables: ['تِلْـ', 'مِيـ', 'ذٌ'],
				cut: 'تِلْـ / مِيـ / ذٌ',
				wrongWords: ['مِذْتَلٌ', 'لِتْمَذٌ', 'ذَمِيلٌ']
			},
			{
				word: 'كِتَابٌ',
				syllables: ['كِـ', 'تَا', 'بٌ'],
				cut: 'كِـ / تَا / بٌ',
				wrongWords: ['تَاكِبٌ', 'بَاكِتٌ', 'كَبِيتٌ']
			},
			{
				word: 'مَكْتَبٌ',
				syllables: ['مَكْـ', 'تَـ', 'بٌ'],
				cut: 'مَكْـ / تَـ / بٌ',
				wrongWords: ['كَتَمٌ', 'تَبَكٌ', 'بَكَمٌ']
			}
		] as const;

		const picked = rng.pickDistinct(words, 2);
		const target = picked[0];
		const second = picked[1];
		const shuffledSyl = rng.shuffle(target.syllables);
		const shuffledLabel = shuffledSyl.join(' — ');

		const mcq = buildUniqueMcqOptions(
			target.word,
			target.wrongWords.map((w) => ({
				text: w,
				diagnosticFeedback: `رَتِّبِ المَقَاطِعَ الصَّوْتِيَّةَ (${shuffledLabel}) لِتَحْصُلَ عَلَى كَلِمَةٍ مَأْلُوفَةٍ وَمُفِيدَةٍ.`
			})),
			rng
		);

		const qText = `مَا الكَلِمَةُ الصَّحِيحَةُ الَّتِي نُكَوِّنُهَا مِنْ تَرْتِيبِ المَقَاطِعِ: (${shuffledLabel})؟`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) رَتِّبِ المَقَاطِعَ الصَّوْتِيَّةَ التَّالِيَةَ لِتَكْوِينَ كَلِمَةٍ مُفِيدَةٍ:\n(${shuffledLabel})  =  ....................`,
				answer: target.word,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) قَطِّعْ كَلِمَةَ «${second.word}» إِلَى مَقَاطِعَ صَوْتِيَّةٍ:\n«${second.word}»  =  ........ / ........ / ........`,
				answer: `${second.cut} (${second.syllables.length} مَقَاطِعَ صَوْتِيَّةٍ).`,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t1_syllable_word_build',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'phonics_reading',
			titleAr: 'التَّقْطِيعُ الصَّوْتِيُّ وَتَكْوِينُ الكَلِمَاتِ',
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عِنْدَ تَرْتِيبِ المَقَاطِعِ (${target.cut}) نَحْصُلُ عَلَى كَلِمَةِ «${target.word}».`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (المَقَاطِعُ وَتَكْوِينُ الكَلِمَةِ)',
				points: 2,
				instruction: 'رَكِّبِ الكَلِمَةَ الأُولَى وَقَطِّعِ الكَلِمَةَ الثَّانِيَةَ:',
				content
			},
			hints: [
				'انْظُرْ إِلى شَكْلِ كُلِّ مَقْطَعٍ: الحَرْفُ المُنَوَّنُ (ـٌ) يَأْتِي دَائِمًا فِي آخِرِ الكَلِمَةِ.',
				'الحَرْفُ السَّاكِنُ وَحَرْفُ المَدِّ يَبْقَيَانِ مَعَ الحَرْفِ الَّذِي قَبْلَهُمَا.',
				`الكَلِمَةُ المَطْلُوبَةُ هِيَ: «${target.word}».`
			],
			solutionStepsAr: [
				`نُرَتِّبُ المَقَاطِعَ: ${target.cut} فَنَحْصُلُ عَلَى «${target.word}».`,
				`نُقَطِّعُ «${second.word}» بِإِبْقَاءِ السَّاكِنِ وَالمَدِّ مَعَ قَبْلِهِمَا: ${second.cut}.`
			],
			finalAnswer: target.word
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration (التقييم التكويني الختامي: إكمال وتكوين جملة)
// ---------------------------------------------------------------------------
const tplIntegrationWordsSentence: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t1_integration_words_sentence',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الإِدْمَاجِيُّ: أُكْمِلُ وَأُرَتِّبُ جُمْلَةً',
	curriculumLessonId: 'arb_lesson_1ap_t1_short_text_family_school',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 104);
		const scenarios = [
			{
				context: 'يَسْتَعِدُّ أَمِينُ لِلذَّهَابِ إِلَى المَدْرَسَةِ فِي الصَّبَاحِ.',
				fillPrompt: 'أَكْمِلْ بِالكَلِمَةِ المُنَاسِبَةِ (مِحْفَظَتَهُ — المَدْرَسَةِ): حَمَلَ أَمِينُ ........ وَذَهَبَ إِلَى ........ .',
				fillAnswer: 'حَمَلَ أَمِينُ مِحْفَظَتَهُ وَذَهَبَ إِلَى المَدْرَسَةِ.',
				shuffledWords: ['أُمَّهُ', 'أَمِينُ', 'سَاعَدَ'],
				orderedSentence: 'سَاعَدَ أَمِينُ أُمَّهُ.',
				wrongOrders: ['أُمَّهُ أَمِينُ سَاعَدَ.', 'أَمِينُ أُمَّهُ سَاعَدَ.', 'سَاعَدَ أُمَّهُ.']
			},
			{
				context: 'تُحِبُّ خَدِيجَةُ قِرَاءَةَ القِصَصِ وَالمُحَافَظَةَ عَلَى كُتُبِهَا.',
				fillPrompt: 'أَكْمِلْ بِالكَلِمَةِ المُنَاسِبَةِ (كِتَابًا — القِسْمِ): قَرَأَتْ خَدِيجَةُ ........ مُفِيدًا فِي ........ .',
				fillAnswer: 'قَرَأَتْ خَدِيجَةُ كِتَابًا مُفِيدًا فِي القِسْمِ.',
				shuffledWords: ['الدَّرْسَ', 'كَتَبَتْ', 'خَدِيجَةُ'],
				orderedSentence: 'كَتَبَتْ خَدِيجَةُ الدَّرْسَ.',
				wrongOrders: ['الدَّرْسَ خَدِيجَةُ كَتَبَتْ.', 'خَدِيجَةُ الدَّرْسَ كَتَبَتْ.', 'كَتَبَتْ الدَّرْسَ.']
			},
			{
				context: 'يَحْتَرِمُ يُوسُفُ وَالِدَيْهِ وَيَقُولُ البَسْمَلَةَ قَبْلَ الطَّعَامِ.',
				fillPrompt: 'أَكْمِلْ بِالكَلِمَةِ المُنَاسِبَةِ (بِسْمِ اللَّهِ — الفُطُورِ): قَالَ يُوسُفُ ........ قَبْلَ تَنَاوُلِ ........ .',
				fillAnswer: 'قَالَ يُوسُفُ بِسْمِ اللَّهِ قَبْلَ تَنَاوُلِ الفُطُورِ.',
				shuffledWords: ['وَجْهَهُ', 'يُوسُفُ', 'غَسَلَ'],
				orderedSentence: 'غَسَلَ يُوسُفُ وَجْهَهُ.',
				wrongOrders: ['وَجْهَهُ يُوسُفُ غَسَلَ.', 'يُوسُفُ وَجْهَهُ غَسَلَ.', 'غَسَلَ وَجْهَهُ.']
			}
		] as const;

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(
			sc.orderedSentence,
			sc.wrongOrders.map((w) => ({
				text: w,
				diagnosticFeedback: 'ابْدَأْ بِالفِعْلِ ثُمَّ اسْمِ التِّلْمِيذِ ثُمَّ الكَلِمَةِ الأَخِيرَةِ لِتُصْبِحَ الجُمْلَةُ مُفِيدَةً.'
			})),
			rng
		);

		const qText = `رَتِّبِ الكَلِمَاتِ التَّالِيَةَ لِتَكْوِينَ جُمْلَةٍ مُفِيدَةٍ: (${sc.shuffledWords.join(' — ')})`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${sc.fillPrompt}`,
				answer: sc.fillAnswer,
				mark: '1'
			},
			buildWrittenProductionBlock({
				context: sc.context,
				instruction: `2) رَتِّبِ الكَلِمَاتِ التَّالِيَةَ لِتَكْتُبَ جُمْلَةً بَسِيطَةً مَشْكُولَةً بِخَطٍّ وَاضِحٍ: (${sc.shuffledWords.join(' — ')})، ثُمَّ اكْتُبْ جُمْلَةً قَصِيرَةً عَنْ حُبِّكَ لِلْمَدْرَسَةِ.`,
				rubricCriteria: [
					'تَرْتِيبُ الكَلِمَاتِ تَرْتِيبًا سَلِيمًا (1 ن)',
					'وُضُوحُ الخَطِّ وَالشَّكْلِ وَإِضَافَةُ جُمْلَةٍ مُفِيدَةٍ (1 ن)'
				],
				modelOutline: `${sc.orderedSentence} أَنَا أُحِبُّ مَدْرَسَتِي كَثِيرًا.`,
				mark: '2'
			})
		];

		return {
			templateId: 'arb_tpl_1ap_t1_integration_words_sentence',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الإِدْمَاجِيُّ: أُكْمِلُ وَأُرَتِّبُ جُمْلَةً',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التَّرْتِيبُ الصَّحِيحُ لِلْجُمْلَةِ هُوَ: «${sc.orderedSentence}»`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (تَقْيِيمٌ تَكْوِينِيٌّ)',
				points: 3,
				instruction: 'أَكْمِلِ الجُمْلَةَ الأُولَى ثُمَّ رَتِّبِ الكَلِمَاتِ لِتَكْوِينَ جُمْلَةٍ مُفِيدَةٍ:',
				content
			},
			hints: [
				'اقْرَأِ الكَلِمَاتِ المُقْتَرَحَةَ وَضَعْ كُلَّ كَلِمَةٍ فِي مَكَانِهَا الصَّحِيحِ.',
				'فِي تَرْتِيبِ الجُمْلَةِ نَبْدَأُ بِالفِعْلِ ثُمَّ مَنْ قَامَ بِالفِعْلِ.',
				`الجُمْلَةُ المُرَتَّبَةُ هِيَ: «${sc.orderedSentence}»`
			],
			solutionStepsAr: [
				`إِكْمَالُ الفَرَاغِ: ${sc.fillAnswer}`,
				`تَرْتِيبُ الجُمْلَةِ: ${sc.orderedSentence}`,
				'كِتَابَةُ جُمْلَةٍ بَسِيطَةٍ بِخَطٍّ جَمِيلٍ وَوَاضِحٍ.'
			],
			finalAnswer: sc.orderedSentence
		};
	}
};

export const TEMPLATES_1AP_T1: ArabicParameterizedTemplate[] = [
	tplReadingFamilySchool,
	tplShortLongVowels,
	tplSyllableWordBuild,
	tplIntegrationWordsSentence
];
