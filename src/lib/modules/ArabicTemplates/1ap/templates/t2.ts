import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildProsePassageBlock, buildWrittenProductionBlock } from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 43;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 83 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Intellectual Building: Hygiene & Islamic Manners Passage
// ---------------------------------------------------------------------------
const tplReadingHygieneManners: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t2_reading_hygiene_manners',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: القِرَاءَةُ وَالفَهْمُ (النَّظَافَةُ وَالأَخْلَاقُ)',
	curriculumLessonId: 'arb_lesson_1ap_t2_sun_moon_lam',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 201);
		const passages = [
			{
				title: 'النَّظَافَةُ مِنَ الإِيمَانِ',
				text: 'يَغْسِلُ أَنَسٌ يَدَيْهِ بِالمَاءِ وَالصَّابُونِ قَبْلَ الأَكْلِ وَبَعْدَهُ. كَمَا يُنَظِّفُ أَسْنَانَهُ بِالفُرْشَاةِ وَالمَعْجُونِ كُلَّ يَوْمٍ. قَالَ أَنَسٌ: «أَنَا أُحَافِظُ عَلَى نَظَافَتِي لِأَنَّ النَّظَافَةَ مِنَ الإِيمَانِ».',
				q1: 'بِمَاذَا يَغْسِلُ أَنَسٌ يَدَيْهِ قَبْلَ الأَكْلِ وَبَعْدَهُ؟',
				a1: 'يَغْسِلُ أَنَسٌ يَدَيْهِ بِالمَاءِ وَالصَّابُونِ.',
				q2: 'كَيْفَ يُنَظِّفُ أَنَسٌ أَسْنَانَهُ كُلَّ يَوْمٍ؟',
				a2: 'يُنَظِّفُ أَسْنَانَهُ بِالفُرْشَاةِ وَالمَعْجُونِ.',
				q3: 'لِمَاذَا يُحَافِظُ أَنَسٌ عَلَى نَظَافَتِهِ؟',
				a3: 'لِأَنَّ النَّظَافَةَ مِنَ الإِيمَانِ.',
				mcqPrompt: 'بِمَاذَا يُنَظِّفُ أَنَسٌ أَسْنَانَهُ كُلَّ يَوْمٍ حَسَبَ النَّصِّ؟',
				correct: 'بِالفُرْشَاةِ وَالمَعْجُونِ',
				distractors: [
					{ text: 'بِالمِنْدِيلِ فَقَطْ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ النَّصِّ جَيِّدًا.' },
					{ text: 'بِالمَشْطِ', diagnosticFeedback: 'المَشْطُ لِلشَّعْرِ وَلَيْسَ لِلْأَسْنَانِ.' },
					{ text: 'بِالمِمْحَاةِ', diagnosticFeedback: 'المِمْحَاةُ أَدَاةٌ مَدْرَسِيَّةٌ!' }
				]
			},
			{
				title: 'التِّلْمِيذَةُ الصَّادِقَةُ',
				text: 'نَسِيَتْ فَاطِمَةُ كُرَّاسَهَا فِي البَيْتِ، فَسَأَلَتْهَا المُعَلِّمَةُ عَنْهُ. قَالَتْ فَاطِمَةُ بِصِدْقٍ: «عَفْوًا يَا مُعَلِّمَتِي، نَسِيتُ كُرَّاسِي اليَوْمَ وَسَأُحْضِرُهُ غَدًا». اِبْتَسَمَتِ المُعَلِّمَةُ وَشَجَّعَتْهَا عَلَى الصِّدْقِ.',
				q1: 'مَاذَا نَسِيَتْ فَاطِمَةُ فِي البَيْتِ؟',
				a1: 'نَسِيَتْ فَاطِمَةُ كُرَّاسَهَا فِي البَيْتِ.',
				q2: 'كَيْفَ أَجَابَتْ فَاطِمَةُ مُعَلِّمَتَهَا؟',
				a2: 'أَجَابَتْهَا بِصِدْقٍ وَأَدَبٍ.',
				q3: 'لِمَاذَا ابْتَسَمَتِ المُعَلِّمَةُ لِفَاطِمَةَ؟',
				a3: 'لِأَنَّهَا قَالَتِ الصِّدْقَ وَلَمْ تَكْذِبْ.',
				mcqPrompt: 'مَا الخُلُقُ الجَمِيلُ الَّذِي تَحَلَّتْ بِهِ فَاطِمَةُ فِي النَّصِّ؟',
				correct: 'الصِّدْقُ',
				distractors: [
					{ text: 'الكَذِبُ', diagnosticFeedback: 'فَاطِمَةُ أَخْبَرَتِ المُعَلِّمَةَ بِالحَقِيقَةِ.' },
					{ text: 'الغَضَبُ', diagnosticFeedback: 'تَكَلَّمَتْ فَاطِمَةُ بِأَدَبٍ وَلُطْفٍ.' },
					{ text: 'الكَسَلُ', diagnosticFeedback: 'اقْرَأْ نِهَايَةَ النَّصِّ لِتَجِدَ الخُلُقَ المَذْكُورَ.' }
				]
			},
			{
				title: 'حَمْلَةُ نَظَافَةٍ فِي السَّاحَةِ',
				text: 'فِي يَوْمِ الثُّلَاثَاءِ، تَعَاوَنَ التَّلَامِيذُ فِي تَنْظِيفِ سَاحَةِ المَدْرَسَةِ. جَمَعَ عُمَرُ الأَوْرَاقَ فِي السَّلَّةِ، وَسَقَتْ إِيمَانُ الوُرُودَ. قَالَ التَّلَامِيذُ: «نَحْنُ نُحِبُّ مَدْرَسَتَنَا النَّظِيفَةَ».',
				q1: 'فِيمَ تَعَاوَنَ التَّلَامِيذُ يَوْمَ الثُّلَاثَاءِ؟',
				a1: 'تَعَاوَنُوا فِي تَنْظِيفِ سَاحَةِ المَدْرَسَةِ.',
				q2: 'أَيْنَ وَضَعَ عُمَرُ الأَوْرَاقَ؟',
				a2: 'وَضَعَهَا فِي السَّلَّةِ.',
				q3: 'مَاذَا فَعَلَتْ إِيمَانُ فِي السَّاحَةِ؟',
				a3: 'سَقَتْ إِيمَانُ الوُرُودَ.',
				mcqPrompt: 'مَاذَا فَعَلَتْ إِيمَانُ أَثْنَاءَ حَمْلَةِ النَّظَافَةِ؟',
				correct: 'سَقَتِ الوُرُودَ',
				distractors: [
					{ text: 'قَطَفَتِ الأَزْهَارَ', diagnosticFeedback: 'إِيمَانُ تَعْتَنِي بِالوُرُودِ وَلَا تَقْطِفُهَا.' },
					{ text: 'رَمَتِ الأَوْرَاقَ عَلَى الأَرْضِ', diagnosticFeedback: 'التَّلَامِيذُ يُنَظِّفُونَ السَّاحَةَ!' },
					{ text: 'غَادَرَتِ المَدْرَسَةَ', diagnosticFeedback: 'ارْجِعْ إِلى الجُمْلَةِ الثَّانِيَةِ مِنَ النَّصِّ.' }
				]
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
			templateId: 'arb_tpl_1ap_t2_reading_hygiene_manners',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: القِرَاءَةُ وَالفَهْمُ (النَّظَافَةُ وَالأَخْلَاقُ)',
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
				explanation: `نَجِدُ الجَوَابَ وَاضِحًا دَاخِلَ النَّصِّ: ${item.correct}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (القِرَاءَةُ وَالفَهْمُ)',
				points: 3,
				instruction: 'اقْرَأِ النَّصَّ المَشْكُولَ جَيِّدًا ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints: [
				'اقْرَأِ النَّصَّ كَامِلًا قَبْلَ البَدْءِ بِالإِجَابَةِ.',
				'ابْحَثْ عَنِ الجُمْلَةِ الَّتِي تَحْتَوِي عَلَى كَلِمَاتِ السُّؤَالِ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${item.correct}.`
			],
			solutionStepsAr: [item.a1, item.a2, item.a3],
			finalAnswer: item.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Tanween & Sun/Moon Lam
// ---------------------------------------------------------------------------
const tplTanweenAndLam: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t2_tanween_and_lam',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'spelling_imla',
	titleAr: 'التَّنْوِينُ وَ«ال» القَمَرِيَّةُ وَالشَّمْسِيَّةُ',
	curriculumLessonId: 'arb_lesson_1ap_t2_tanween',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 202);
		const lamPool = [
			{ word: 'الْقَمَرُ', kind: 'ال القَمَرِيَّةُ' },
			{ word: 'الْمَاءُ', kind: 'ال القَمَرِيَّةُ' },
			{ word: 'الْكِتَابُ', kind: 'ال القَمَرِيَّةُ' },
			{ word: 'الشَّمْسُ', kind: 'ال الشَّمْسِيَّةُ' },
			{ word: 'النَّظَافَةُ', kind: 'ال الشَّمْسِيَّةُ' },
			{ word: 'الصَّابُونُ', kind: 'ال الشَّمْسِيَّةُ' }
		] as const;

		const tanweenPool = [
			{ word: 'كِتَابًا', kind: 'تَنْوِينُ الفَتْحِ' },
			{ word: 'وَرْدَةً', kind: 'تَنْوِينُ الفَتْحِ' },
			{ word: 'تِلْمِيذٌ', kind: 'تَنْوِينُ الضَّمِّ' },
			{ word: 'قَلَمٌ', kind: 'تَنْوِينُ الضَّمِّ' },
			{ word: 'صَابُونٍ', kind: 'تَنْوِينُ الكَسْرِ' },
			{ word: 'مَاءٍ', kind: 'تَنْوِينُ الكَسْرِ' }
		] as const;

		const tanTarget = rng.pick(tanweenPool);
		const lamPair = [
			rng.pick(lamPool.filter((x) => x.kind === 'ال القَمَرِيَّةُ')),
			rng.pick(lamPool.filter((x) => x.kind === 'ال الشَّمْسِيَّةُ'))
		];
		const shuffledLam = rng.shuffle(lamPair);
		const tanPair = rng.pickDistinct(tanweenPool, 2);

		const allTanTypes = ['تَنْوِينُ الفَتْحِ', 'تَنْوِينُ الضَّمِّ', 'تَنْوِينُ الكَسْرِ', 'لَا يُوجَدُ تَنْوِينٌ'];
		const mcq = buildUniqueMcqOptions(
			tanTarget.kind,
			allTanTypes
				.filter((t) => t !== tanTarget.kind)
				.map((t) => ({
					text: t,
					diagnosticFeedback: `انْظُرْ إِلى الحَرَكَتَيْنِ فِي آخِرِ كَلِمَةِ «${tanTarget.word}»؛ فَهِيَ ${tanTarget.kind}.`
				})),
			rng
		);

		const qText = `مَا نَوْعُ التَّنْوِينِ فِي آخِرِ كَلِمَةِ «${tanTarget.word}»؟`;

		const content: ContentBlock[] = [
			{
				type: 'table',
				headers: ['الكَلِمَةُ', 'نَوْعُ «ال» (قَمَرِيَّةٌ / شَمْسِيَّةٌ)'],
				cells: [],
				rows: shuffledLam.map((item) => [
					{ content: item.word, bold: true },
					{ content: '................................', answer: item.kind, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'table',
				headers: ['الكَلِمَةُ المُنَوَّنَةُ', 'نَوْعُ التَّنْوِينِ (بِالفَتْحِ / بِالضَّمِّ / بِالكَسْرِ)'],
				cells: [],
				rows: tanPair.map((item) => [
					{ content: item.word, bold: true },
					{ content: '................................', answer: item.kind, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t2_tanween_and_lam',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'spelling_imla',
			titleAr: 'التَّنْوِينُ وَ«ال» القَمَرِيَّةُ وَالشَّمْسِيَّةُ',
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
				explanation: `الحَرَكَتَانِ فِي آخِرِ «${tanTarget.word}» تَدُلَّانِ عَلَى ${tanTarget.kind}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الإِمْلَاءُ: التَّنْوِينُ وَاللَّامُ)',
				points: 2,
				instruction: 'صَنِّفِ الكَلِمَاتِ فِي الجَدْوَلَيْنِ التَّالِيَيْنِ:',
				content
			},
			hints: [
				'اللَّامُ القَمَرِيَّةُ عَلَيْهَا سُكُونٌ وَتُنْطَقُ، وَاللَّامُ الشَّمْسِيَّةُ بَعْدَهَا شَدَّةٌ وَلَا تُنْطَقُ.',
				'تَنْوِينُ الفَتْحِ فَتْحَتَانِ، وَالضَّمِّ ضَمَّتَانِ، وَالكَسْرِ كَسْرَتَانِ.',
				`نَوْعُ التَّنْوِينِ فِي «${tanTarget.word}» هُوَ: ${tanTarget.kind}.`
			],
			solutionStepsAr: [
				`«${shuffledLam[0].word}»: ${shuffledLam[0].kind}، وَ«${shuffledLam[1].word}»: ${shuffledLam[1].kind}.`,
				`«${tanPair[0].word}»: ${tanPair[0].kind}، وَ«${tanPair[1].word}»: ${tanPair[1].kind}.`
			],
			finalAnswer: tanTarget.kind
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Demonstratives & Pronouns
// ---------------------------------------------------------------------------
const tplDemonstrativesPronouns: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t2_demonstratives_pronouns',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'أَسْمَاءُ الإِشَارَةِ وَضَمَائِرُ المُتَكَلِّمِ وَالمُخَاطَبِ',
	curriculumLessonId: 'arb_lesson_1ap_t2_demonstratives',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 203);
		const demoCases = [
			{ sentence: '...... كِتَابٌ نَظِيفٌ.', correct: 'هَذَا', wrong: 'هَذِهِ' },
			{ sentence: '...... مَدْرَسَةٌ جَمِيلَةٌ.', correct: 'هَذِهِ', wrong: 'هَذَا' },
			{ sentence: '...... مُعَلِّمٌ صَبُورٌ.', correct: 'هَذَا', wrong: 'هَذِهِ' },
			{ sentence: '...... وَرْدَةٌ مُتَفَتِّحَةٌ.', correct: 'هَذِهِ', wrong: 'هَذَا' }
		] as const;

		const pronCases = [
			{ sentence: '...... أَغْسِلُ يَدَيَّ قَبْلَ الأَكْلِ.', correct: 'أَنَا', wrongs: ['نَحْنُ', 'أَنْتَ', 'أَنْتِ'] },
			{ sentence: '...... نُحَافِظُ عَلَى نَظَافَةِ قِسْمِنَا.', correct: 'نَحْنُ', wrongs: ['أَنَا', 'أَنْتَ', 'أَنْتِ'] },
			{ sentence: '...... تِلْمِيذٌ صَادِقٌ يَا عُمَرُ.', correct: 'أَنْتَ', wrongs: ['أَنْتِ', 'أَنَا', 'نَحْنُ'] },
			{ sentence: '...... تِلْمِيذَةٌ مُهَذَّبَةٌ يَا خَدِيجَةُ.', correct: 'أَنْتِ', wrongs: ['أَنْتَ', 'أَنَا', 'نَحْنُ'] }
		] as const;

		const demo = rng.pick(demoCases);
		const pron = rng.pick(pronCases);

		const mcq = buildUniqueMcqOptions(
			pron.correct,
			pron.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `اقْرَأِ الجُمْلَةَ جَيِّدًا: «${pron.sentence}»؛ الضَّمِيرُ المُنَاسِبُ هُوَ «${pron.correct}».`
			})),
			rng
		);

		const qText = `اخْتَرِ الضَّمِيرَ المُنَاسِبَ لِإِكْمَالِ الجُمْلَةِ: «${pron.sentence}»`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلْ بِـ «هَذَا» أَوْ «هَذِهِ»:\n${demo.sentence}`,
				answer: demo.sentence.replace('......', demo.correct),
				mark: '1'
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ بِالضَّمِيرِ المُنَاسِبِ (أَنَا — نَحْنُ — أَنْتَ — أَنْتِ):\n${pron.sentence}`,
				answer: pron.sentence.replace('......', pron.correct),
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t2_demonstratives_pronouns',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'grammar_irab',
			titleAr: 'أَسْمَاءُ الإِشَارَةِ وَضَمَائِرُ المُتَكَلِّمِ وَالمُخَاطَبِ',
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
				explanation: `نَسْتَعْمِلُ الضَّمِيرَ «${pron.correct}» فَتُصْبِحُ الجُمْلَةُ: «${pron.sentence.replace('......', pron.correct)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الإِشَارَةُ وَالضَّمَائِرُ)',
				points: 2,
				instruction: 'أَكْمِلِ الجُمْلَتَيْنِ بِمَا يُنَاسِبُهُمَا:',
				content
			},
			hints: [
				'«هَذَا» لِلْمُذَكَّرِ وَ«هَذِهِ» لِلْمُؤَنَّثِ.',
				'«أَنَا» لِلْمُفْرَدِ المُتَكَلِّمِ، «نَحْنُ» لِلْجَمَاعَةِ، «أَنْتَ» لِلْوَلَدِ، وَ«أَنْتِ» لِلْبِنْتِ.',
				`الضَّمِيرُ الصَّحِيحُ هُوَ: «${pron.correct}».`
			],
			solutionStepsAr: [
				`الجُمْلَةُ الأُولَى: ${demo.sentence.replace('......', demo.correct)}`,
				`الجُمْلَةُ الثَّانِيَةُ: ${pron.sentence.replace('......', pron.correct)}`
			],
			finalAnswer: pron.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration: Clean School & Good Manners Short Sentences
// ---------------------------------------------------------------------------
const tplIntegrationCleanSchool: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t2_integration_clean_school',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الإِدْمَاجِيُّ: أُعَبِّرُ عَنِ النَّظَافَةِ وَالتَّعَاوُنِ',
	curriculumLessonId: 'arb_lesson_1ap_t2_pronouns_1ap',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 204);
		const prompts = [
			{
				context: 'شَارَكَ أَنَسٌ وَمَرْيَمُ فِي تَنْظِيفِ القِسْمِ.',
				bank: 'هَذَا — هَذِهِ — نَحْنُ',
				fillQ: '........ قِسْمُنَا النَّظِيفُ، وَ........ سَاحَتُنَا الجَمِيلَةُ، وَ........ نُحَافِظُ عَلَيْهِمَا.',
				fillA: 'هَذَا قِسْمُنَا النَّظِيفُ، وَهَذِهِ سَاحَتُنَا الجَمِيلَةُ، وَنَحْنُ نُحَافِظُ عَلَيْهِمَا.',
				correctMcq: 'نَحْنُ نُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِنَا.',
				wrongMcqs: [
					'أَنَا نُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِنَا.',
					'هَذِهِ قِسْمُنَا النَّظِيفُ.',
					'هَذَا سَاحَتُنَا الجَمِيلَةُ.'
				]
			},
			{
				context: 'تَتَحَدَّثُ سَارَةُ عَنْ نَظَافَةِ جِسْمِهَا وَأَسْنَانِهَا.',
				bank: 'أَنَا — هَذَا — هَذِهِ',
				fillQ: '........ أُحِبُّ النَّظَافَةَ، ........ صَابُونٌ مُعَطَّرٌ، وَ........ فُرْشَاةُ أَسْنَانِي.',
				fillA: 'أَنَا أُحِبُّ النَّظَافَةَ، هَذَا صَابُونٌ مُعَطَّرٌ، وَهَذِهِ فُرْشَاةُ أَسْنَانِي.',
				correctMcq: 'أَنَا أَغْسِلُ يَدَيَّ بِالمَاءِ وَالصَّابُونِ.',
				wrongMcqs: [
					'نَحْنُ أَغْسِلُ يَدَيَّ بِالمَاءِ وَالصَّابُونِ.',
					'أَنْتِ صَابُونٌ مُعَطَّرٌ.',
					'هَذَا فُرْشَاةُ أَسْنَانِي.'
				]
			}
		] as const;

		const p = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(
			p.correctMcq,
			p.wrongMcqs.map((w) => ({
				text: w,
				diagnosticFeedback: 'رَاقِبِ التَّطَابُقَ بَيْنَ الضَّمِيرِ وَالفِعْلِ، وَبَيْنَ اسْمِ الإِشَارَةِ وَالمُذَكَّرِ أَوِ المُؤَنَّثِ.'
			})),
			rng
		);

		const qText = 'اخْتَرِ الجُمْلَةَ السَّلِيمَةَ الصَّحِيحَةَ لُغَوِيًّا حَوْلَ النَّظَافَةِ:';

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلِ الفِقْرَةَ القَصِيرَةَ بِالكَلِمَاتِ المُنَاسِبَةِ (${p.bank}):\n${p.fillQ}`,
				answer: p.fillA,
				mark: '1.5'
			},
			buildWrittenProductionBlock({
				context: p.context,
				instruction: '2) اكْتُبْ جُمْلَةً قَصِيرَةً تَشْكُرُ فِيهَا اللَّهَ أَوْ تَذْكُرُ فِيهَا كَيْفَ تُحَافِظُ عَلَى نَظَافَةِ قِسْمِكَ، مُسْتَعْمِلًا «أَنَا» أَوْ «نَحْنُ».',
				rubricCriteria: [
					'تَوْظِيفُ «أَنَا» أَوْ «نَحْنُ» بِشَكْلٍ سَلِيمٍ (0.75 ن)',
					'مَعْنًى وَاضِحٌ وَخَطٌّ مَقْرُوءٌ وَمَشْكُولٌ (0.75 ن)'
				],
				modelOutline: p.correctMcq,
				mark: '1.5'
			})
		];

		return {
			templateId: 'arb_tpl_1ap_t2_integration_clean_school',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الإِدْمَاجِيُّ: أُعَبِّرُ عَنِ النَّظَافَةِ وَالتَّعَاوُنِ',
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
				explanation: `الجُمْلَةُ الصَّحِيحَةُ هِيَ: «${p.correctMcq}» لِتَوَافُقِ الضَّمِيرِ مَعَ الفِعْلِ.`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (تَقْيِيمٌ تَكْوِينِيٌّ)',
				points: 3,
				instruction: 'أَكْمِلِ الفِقْرَةَ ثُمَّ اكْتُبْ جُمْلَةً مُفِيدَةً عَنِ النَّظَافَةِ:',
				content
			},
			hints: [
				'ضَعْ «هَذَا» قَبْلَ المُذَكَّرِ وَ«هَذِهِ» قَبْلَ المُؤَنَّثِ.',
				'مَعَ «أَنَا» يَبْدَأُ الفِعْلُ بِالأَلِفِ (أُحِبُّ)، وَمَعَ «نَحْنُ» يَبْدَأُ بِالنُّونِ (نُحَافِظُ).',
				`الجُمْلَةُ الصَّحِيحَةُ هِيَ: «${p.correctMcq}»`
			],
			solutionStepsAr: [
				`إِكْمَالُ الفِقْرَةِ: ${p.fillA}`,
				`الجُمْلَةُ المُقْتَرَحَةُ: ${p.correctMcq}`
			],
			finalAnswer: p.correctMcq
		};
	}
};

export const TEMPLATES_1AP_T2: ArabicParameterizedTemplate[] = [
	tplReadingHygieneManners,
	tplTanweenAndLam,
	tplDemonstrativesPronouns,
	tplIntegrationCleanSchool
];
