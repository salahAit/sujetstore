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
// 1. Intellectual Building: Nature & Islamic Ethics Passage
// ---------------------------------------------------------------------------
const tplReadingNatureEthics2ap: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t2_reading_nature_ethics',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الأَخْلَاقِ وَالبِيئَةِ',
	curriculumLessonId: 'arb_lesson_2ap_t2_prepositions_connectors',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 501);
		const passages = [
			{
				title: 'حَيُّنَا نَظِيفٌ وَجَمِيلٌ',
				text: 'فِي صَبَاحِ يَوْمِ السَّبْتِ، اجْتَمَعَ أَطْفَالُ الحَيِّ لِتَنْظِيفِ الشَّارِعِ. جَمَعَ بِلَالٌ وَعُمَرُ الأَوْرَاقَ فِي أَكْيَاسٍ، ثُمَّ غَرَسَتْ إِيمَانُ وَرْدَاتٍ جَمِيلَةً عَلَى جَانِبِ الرَّصِيفِ. شَكَرَهُمُ الجِيرَانُ قَائِلِينَ: «التَّعَاوُنُ عَلَى النَّظَافَةِ عَمَلٌ رَائِعٌ».',
				q1: 'مَتَى اجْتَمَعَ أَطْفَالُ الحَيِّ لِتَنْظِيفِ الشَّارِعِ؟',
				a1: 'اجْتَمَعُوا فِي صَبَاحِ يَوْمِ السَّبْتِ.',
				q2: 'مَاذَا غَرَسَتْ إِيمَانُ عَلَى جَانِبِ الرَّصِيفِ؟',
				a2: 'غَرَسَتْ وَرْدَاتٍ جَمِيلَةً.',
				q3: 'هَاتِ ضِدَّ كَلِمَةِ «قَبِيحَةً» مِنَ النَّصِّ.',
				a3: 'ضِدُّ «قَبِيحَةً» هُوَ: «جَمِيلَةً».',
				mcqPrompt: 'مَاذَا فَعَلَ بِلَالٌ وَعُمَرُ فِي حَمْلَةِ تَنْظِيفِ الحَيِّ؟',
				correct: 'جَمَعَا الأَوْرَاقَ فِي أَكْيَاسٍ',
				distractors: [
					{ text: 'لَعِبَا بِالكُرَةِ فِي الشَّارِعِ', diagnosticFeedback: 'بِلَالٌ وَعُمَرُ شَارَكَا فِي التَّنْظِيفِ.' },
					{ text: 'قَطَفَا الوُرُودَ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ النَّصِّ جَيِّدًا.' },
					{ text: 'ذَهَبَا إِلى السُّوقِ', diagnosticFeedback: 'ارْجِعْ إِلى النَّصِّ وَابْحَثْ عَنِ اسْمِ بِلَالٍ وَعُمَرَ.' }
				]
			},
			{
				title: 'إِكْرَامُ الجَارِ',
				text: 'مَرِضَ جَارُنَا الشَّيْخُ الصَّالِحُ، فَلَمْ يَخْرُجْ مِنَ البَيْتِ. أَعَدَّتْ أُمِّي حَسَاءً سَاخِنًا وَطَلَبَتْ مِنِّي وَمِنْ أَبِي زِيَارَتَهُ. سَلَّمْنَا عَلَيْهِ وَدَعَوْنَا لَهُ بِالشِّفَاءِ العَاجِلِ، فَفَرِحَ كَثِيرًا وَشَكَرَنَا عَلَى حُسْنِ الجِوَارِ.',
				q1: 'لِمَاذَا لَمْ يَخْرُجِ الجَارُ مِنَ البَيْتِ؟',
				a1: 'لَمْ يَخْرُجْ لِأَنَّهُ مَرِضَ.',
				q2: 'مَاذَا أَعَدَّتِ الأُمُّ لِلْجَارِ المَرِيضِ؟',
				a2: 'أَعَدَّتْ لَهُ حَسَاءً سَاخِنًا.',
				q3: 'بِمَاذَا دَعَا الوَلَدُ وَأَبُوهُ لِلْجَارِ؟',
				a3: 'دَعَوَا لَهُ بِالشِّفَاءِ العَاجِلِ.',
				mcqPrompt: 'مَا القِيمَةُ الإِسْلَامِيَّةُ الَّتِي يُعَلِّمُنَا إِيَّاهَا هَذَا النَّصُّ؟',
				correct: 'إِكْرَامُ الجَارِ وَعِيَادَةُ المَرِيضِ',
				distractors: [
					{ text: 'الإِسْرَافُ فِي الطَّعَامِ', diagnosticFeedback: 'لَمْ يُذْكَرِ الإِسْرَافُ فِي النَّصِّ.' },
					{ text: 'التَّأَخُّرُ عَنِ المَدْرَسَةِ', diagnosticFeedback: 'النَّصُّ يَتَحَدَّثُ عَنْ زِيَارَةِ جَارٍ مَرِيضٍ.' },
					{ text: 'عَدَمُ التَّعَاوُنِ', diagnosticFeedback: 'بَلْ أَظْهَرَتِ الأُسْرَةُ تَعَاوُنًا وَإِحْسَانًا لِلْجَارِ.' }
				]
			},
			{
				title: 'الرِّفْقُ بِالعُصْفُورِ',
				text: 'وَجَدَ زَيْدٌ عُصْفُورًا صَغِيرًا جَرِيحَ الجَنَاحِ فِي الحَدِيقَةِ. حَمَلَهُ بِرِفْقٍ إِلى البَيْتِ، فَعَالَجَ أَبُوهُ جَنَاحَهُ وَأَطْعَمَاهُ حُبُوبًا وَمَاءً. وَبَعْدَ أَيَّامٍ شُفِيَ العُصْفُورُ، فَفَتَحَ زَيْدٌ النَّافِذَةَ فَطَارَ حُرًّا فِي السَّمَاءِ.',
				q1: 'مَاذَا وَجَدَ زَيْدٌ فِي الحَدِيقَةِ؟',
				a1: 'وَجَدَ عُصْفُورًا صَغِيرًا جَرِيحَ الجَنَاحِ.',
				q2: 'كَيْفَ اعْتَنَى زَيْدٌ وَأَبُوهُ بِالعُصْفُورِ؟',
				a2: 'عَالَجَ أَبُوهُ جَنَاحَهُ وَأَطْعَمَاهُ حُبُوبًا وَمَاءً.',
				q3: 'مَاذَا فَعَلَ زَيْدٌ بَعْدَ أَنْ شُفِيَ العُصْفُورُ؟',
				a3: 'فَتَحَ لَهُ النَّافِذَةَ لِيَطِيرَ حُرًّا فِي السَّمَاءِ.',
				mcqPrompt: 'مَاذَا فَعَلَ زَيْدٌ عِنْدَمَا شُفِيَ العُصْفُورُ؟',
				correct: 'فَتَحَ النَّافِذَةَ فَأَطْلَقَهُ حُرًّا',
				distractors: [
					{ text: 'حَبَسَهُ فِي قَفَصٍ ضَيِّقٍ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الأَخِيرَةَ مِنَ النَّصِّ.' },
					{ text: 'تَرَكَهُ بِلَا طَعَامٍ', diagnosticFeedback: 'بَلْ رَفَقَ بِهِ وَأَطْعَمَهُ ثُمَّ أَطْلَقَهُ.' },
					{ text: 'أَخَذَهُ إِلى السُّوقِ', diagnosticFeedback: 'لَمْ يُذْكَرِ السُّوقُ فِي النَّصِّ.' }
				]
			}
		] as const;

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.correct, [...p.distractors], rng);

		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: p.title,
				paragraphs: [p.text]
			}),
			{
				type: 'text',
				content: `1) ${p.q1}\n................................................................`,
				answer: p.a1,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${p.q2}\n................................................................`,
				answer: p.a2,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) ${p.q3}\n................................................................`,
				answer: p.a3,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t2_reading_nature_ethics',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الأَخْلَاقِ وَالبِيئَةِ',
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقْرَأِ النَّصَّ: «${p.text}»\n${p.mcqPrompt}`,
				questionTextAr: `اقْرَأِ النَّصَّ: «${p.text}»\n${p.mcqPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَخْرِجُ الإِجَابَةَ مِنَ النَّصِّ: ${p.correct}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (القِرَاءَةُ وَالفَهْمُ)',
				points: 3,
				instruction: 'اقْرَأِ النَّصَّ بِتَأَنٍّ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'اقْرَأِ النَّصَّ كَامِلًا وَافْهَمْ أَحْدَاثَهُ.',
				'تَأَمَّلِ القِيمَةَ الأَخْلَاقِيَّةَ الَّتِي يَدْعُو إِلَيْهَا النَّصُّ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${p.correct}.`
			],
			solutionStepsAr: [p.a1, p.a2, p.a3],
			finalAnswer: p.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Past/Present Verbs & Negation (لا / لم)
// ---------------------------------------------------------------------------
const tplVerbsAndNegation: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t2_verbs_and_negation',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'morphology_sarf',
	titleAr: 'الفِعْلُ المَاضِي وَالمُضَارِعُ وَالنَّفْيُ بِـ «لَا» وَ«لَمْ»',
	curriculumLessonId: 'arb_lesson_2ap_t2_past_present_verbs',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 502);
		const tenseCases = [
			{ past: 'غَرَسَ الفَلَّاحُ شَجَرَةً.', present: 'يَغْرِسُ الفَلَّاحُ شَجَرَةً.' },
			{ past: 'نَظَّفَتْ سَارَةُ السَّاحَةَ.', present: 'تُنَظِّفُ سَارَةُ السَّاحَةَ.' },
			{ past: 'حَفِظَ عُمَرُ السُّورَةَ.', present: 'يَحْفَظُ عُمَرُ السُّورَةَ.' }
		] as const;

		const negCases = [
			{
				prompt: '...... أَرْمِي الأَوْسَاخَ فِي الطَّرِيقِ أَبَدًا.',
				correct: 'لَا',
				wrongs: ['لَمْ', 'فِي', 'هَلْ'],
				reason: 'نَفْيٌ لِلْحَاضِرِ وَالعَادَةِ مَعَ الضَّمَّةِ'
			},
			{
				prompt: '...... يَتَأَخَّرْ أَمِينُ عَنِ المَدْرَسَةِ أَمْسِ.',
				correct: 'لَمْ',
				wrongs: ['لَا', 'عَلَى', 'ثُمَّ'],
				reason: 'نَفْيٌ لِلْمَاضِي (أَمْسِ) مَعَ السُّكُونِ'
			},
			{
				prompt: 'المُسْلِمُ ...... يَكْذِبُ أَبَدًا.',
				correct: 'لَا',
				wrongs: ['لَمْ', 'إِلَى', 'مِنْ'],
				reason: 'نَفْيٌ لِلْحَاضِرِ وَالعَادَةِ مَعَ الضَّمَّةِ'
			},
			{
				prompt: '...... يَقْطِفْ رَيَّانُ أَزْهَارَ الحَدِيقَةِ أَمْسِ.',
				correct: 'لَمْ',
				wrongs: ['لَا', 'وَ', 'فَـ'],
				reason: 'نَفْيٌ لِلْمَاضِي (أَمْسِ) مَعَ السُّكُونِ'
			}
		] as const;

		const tense = rng.pick(tenseCases);
		const neg = rng.pick(negCases);

		const mcq = buildUniqueMcqOptions(
			neg.correct,
			neg.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `انْظُرْ إِلى زَمَنِ الجُمْلَةِ وَحَرَكَةِ الفِعْلِ: نَسْتَعْمِلُ «${neg.correct}» (${neg.reason}).`
			})),
			rng
		);

		const qText = `اخْتَرْ أَدَاةَ النَّفْيِ المُنَاسِبَةِ: «${neg.prompt}»`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) حَوِّلِ الجُمْلَةَ التَّالِيَةَ مِنَ المَاضِي إِلَى المُضَارِعِ:\n«${tense.past}»\n................................................................`,
				answer: tense.present,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) أَكْمِلِ الجُمْلَةَ بِـ «لَا» أَوْ «لَمْ»:\n${neg.prompt}`,
				answer: neg.prompt.replace('......', neg.correct),
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t2_verbs_and_negation',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'morphology_sarf',
			titleAr: 'الفِعْلُ المَاضِي وَالمُضَارِعُ وَالنَّفْيُ بِـ «لَا» وَ«لَمْ»',
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
				explanation: `نَخْتَارُ «${neg.correct}» لِأَنَّهُ ${neg.reason}: «${neg.prompt.replace('......', neg.correct)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الأَفْعَالُ وَالنَّفْيُ)',
				points: 2,
				instruction: 'حَوِّلِ الجُمْلَةَ إِلى المُضَارِعِ ثُمَّ ضَعْ أَدَاةَ النَّفْيِ المُنَاسِبَةِ:',
				content
			},
			hints: [
				'الفِعْلُ المُضَارِعُ يَبْدَأُ بِأَحَدِ حُرُوفِ «أَنَيْتُ» (يَـ / تَـ / أَ / نَـ).',
				'«لَمْ» تَنْفِي المَاضِيَ (أَمْسِ) وَتَضَعُ سُكُونًا عَلَى آخِرِ المُضَارِعِ، وَ«لَا» تَنْفِي الحَاضِرَ وَالعَادَةَ.',
				`أَدَاةُ النَّفْيِ المَطْلُوبَةُ هِيَ: «${neg.correct}».`
			],
			solutionStepsAr: [
				`التَّحْوِيلُ إِلى المُضَارِعِ: ${tense.present}`,
				`إِكْمَالُ النَّفْيِ: ${neg.prompt.replace('......', neg.correct)}`
			],
			finalAnswer: neg.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Connectors & Singular/Dual/Plural
// ---------------------------------------------------------------------------
const tplConnectorsNumberForms: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t2_connectors_number_forms',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'حُرُوفُ الرَّبْطِ وَالمُفْرَدُ وَالمُثَنَّى وَالجَمْعُ',
	curriculumLessonId: 'arb_lesson_2ap_t2_singular_dual_plural',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 503);
		const nouns = [
			{ sing: 'تِلْمِيذٌ', dual: 'تِلْمِيذَانِ', plur: 'تَلَامِيذُ' },
			{ sing: 'مُعَلِّمٌ', dual: 'مُعَلِّمَانِ', plur: 'مُعَلِّمُونَ' },
			{ sing: 'شَجَرَةٌ', dual: 'شَجَرَتَانِ', plur: 'شَجَرَاتٌ' },
			{ sing: 'وَرْدَةٌ', dual: 'وَرْدَتَانِ', plur: 'وَرْدَاتٌ' },
			{ sing: 'كِتَابٌ', dual: 'كِتَابَانِ', plur: 'كُتُبٌ' }
		] as const;

		const connItems = [
			{ sentence: 'دَقَّ الجَرَسُ ...... دَخَلَ التَّلَامِيذُ فَوْرًا.', correct: 'فَـ (فَدَخَلَ)' },
			{ sentence: 'بَذَرَ الفَلَّاحُ الحُبُوبَ ...... حَصَدَ القَمْحَ فِي الصَّيْفِ.', correct: 'ثُمَّ' },
			{ sentence: 'سَاعَدَ يُوسُفُ ...... مَرْيَمُ وَالِدَتَهُمَا مَعًا.', correct: 'وَ' }
		] as const;

		const targetNoun = rng.pick(nouns);
		const conn = rng.pick(connItems);

		const mcq = buildUniqueMcqOptions(
			targetNoun.dual,
			[
				{ text: targetNoun.plur, diagnosticFeedback: `«${targetNoun.plur}» جَمْعٌ وَلَيْسَ مُثَنًّى؛ المُثَنَّى يَدُلُّ عَلَى اثْنَيْنِ وَيَنْتَهِي بِـ «ـَانِ».` },
				{ text: targetNoun.sing, diagnosticFeedback: `«${targetNoun.sing}» مُفْرَدٌ (وَاحِدٌ فَقَطْ).` },
				{ text: `${targetNoun.sing} كَثِيرٌ`, diagnosticFeedback: 'المُثَنَّى يُصَاغُ بِزِيَادَةِ أَلِفٍ وَنُونٍ فِي آخِرِ المُفْرَدِ.' }
			],
			rng
		);

		const qText = `مَا المُثَنَّى الصَّحِيحُ لِكَلِمَةِ «${targetNoun.sing}»؟`;

		const content: ContentBlock[] = [
			{
				type: 'table',
				headers: ['المُفْرَدُ', 'المُثَنَّى (اثْنَانِ)', 'الجَمْعُ (ثَلَاثَةٌ فَأَكْثَرُ)'],
				cells: [],
				rows: [
					[
						{ content: targetNoun.sing, bold: true },
						{ content: '........................', answer: targetNoun.dual, mark: '0.5' },
						{ content: '........................', answer: targetNoun.plur, mark: '0.5' }
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ بِحَرْفِ الرَّبْطِ المُنَاسِبِ (وَ — فَـ — ثُمَّ):\n${conn.sentence}`,
				answer: `الحَرْفُ المُنَاسِبُ: ${conn.correct}.`,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t2_connectors_number_forms',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'grammar_irab',
			titleAr: 'حُرُوفُ الرَّبْطِ وَالمُفْرَدُ وَالمُثَنَّى وَالجَمْعُ',
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
				explanation: `نَزِيدُ «ـَانِ» فِي آخِرِ «${targetNoun.sing}» فَتُصْبِحُ فِي المُثَنَّى «${targetNoun.dual}» (وَجَمْعُهَا «${targetNoun.plur}»).`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (التَّحْوِيلُ وَالرَّبْطُ)',
				points: 2,
				instruction: 'أَكْمِلِ الجَدْوَلَ ثُمَّ اخْتَرْ حَرْفَ الرَّبْطِ المُنَاسِبَ:',
				content
			},
			hints: [
				'لِتَحْوِيلِ المُفْرَدِ إِلى مُثَنًّى نَزِيدُ أَلِفًا وَنُونًا (ـَانِ)، وَنَفْتَحُ التَّاءَ المَرْبُوطَةَ إِنْ وُجِدَتْ.',
				'«وَ» لِلْمُشَارَكَةِ، «فَـ» لِلسُّرْعَةِ، وَ«ثُمَّ» لِلتَّرْتِيبِ بَعْدَ مُدَّةٍ.',
				`مُثَنَّى «${targetNoun.sing}» هُوَ: «${targetNoun.dual}».`
			],
			solutionStepsAr: [
				`المُفْرَدُ: ${targetNoun.sing} — المُثَنَّى: ${targetNoun.dual} — الجَمْعُ: ${targetNoun.plur}.`,
				`حَرْفُ الرَّبْطِ المُنَاسِبُ فِي الجُمْلَةِ الثَّانِيَةِ هُوَ: ${conn.correct}.`
			],
			finalAnswer: targetNoun.dual
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration: Clean Neighborhood & Ethics Paragraph
// ---------------------------------------------------------------------------
const tplIntegrationCleanNeighborhood: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t2_integration_clean_neighborhood',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: فِقْرَةٌ عَنِ النَّظَافَةِ وَالمُحَافَظَةِ عَلَى البِيئَةِ',
	curriculumLessonId: 'arb_lesson_2ap_t2_negation_la_lam',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 504);
		const themes = [
			{
				context: 'شَارَكْتَ مَعَ أَصْدِقَائِكَ فِي حَمْلَةِ تَنْظِيفِ سَاحَةِ المَدْرَسَةِ وَغَرْسِ الأَشْجَارِ.',
				quote: 'النَّظَافَةُ مِنَ الإِيمَانِ، وَتَعَاوَنُوا عَلَى البِرِّ وَالتَّقْوَى.',
				model: 'فِي صَبَاحِ السَّبْتِ، اجْتَمَعْنَا فِي سَاحَةِ المَدْرَسَةِ فَجَمَعْنَا الأَوْرَاقَ فِي السَّلَّةِ، ثُمَّ غَرَسْنَا شُجَيْرَاتٍ وَسَقَيْنَاهَا بِالمَاءِ. نَحْنُ لَا نَرْمِي الأَوْسَاخَ أَبَدًا لِتَبْقَى مَدْرَسَتُنَا جَمِيلَةً.',
				correctAdvice: 'أَضَعُ الأَوْرَاقَ فِي السَّلَّةِ وَلَا أَرْمِيهَا عَلَى الأَرْضِ.',
				wrongAdvices: [
					'أَقْطِفُ أَزْهَارَ الحَدِيقَةِ وَأَكْسِرُ الأَغْصَانَ.',
					'أَتْرُكُ المَاءَ يَسِيلُ بِلَا فَائِدَةٍ.',
					'لَا أُشَارِكُ زُمَلَائِي فِي تَنْظِيفِ القِسْمِ.'
				]
			},
			{
				context: 'تَشْكُرُ أَسْمَاءُ اللَّهَ عَلَى نِعْمَةِ المَاءِ وَتُحَافِظُ عَلَيْهِ دُونَ تَبْذِيرٍ.',
				quote: 'المَاءُ نِعْمَةٌ عَظِيمَةٌ مِنَ اللَّهِ، فَلَا تُسْرِفْ فِي اسْتِعْمَالِهِ.',
				model: 'أَنَا أَغْسِلُ يَدَيَّ وَأَتَوَضَّأُ بِالمَاءِ النَّقِيِّ، ثُمَّ أُغْلِقُ الحَنَفِيَّةَ جَيِّدًا. أَنَا لَا أُبَذِّرُ المَاءَ أَبَدًا، وَأَنْصَحُ إِخْوَتِي بِالمُحَافَظَةِ عَلَى هَذِهِ النِّعْمَةِ.',
				correctAdvice: 'أُغْلِقُ الحَنَفِيَّةَ جَيِّدًا وَلَا أُسْرِفُ فِي المَاءِ.',
				wrongAdvices: [
					'أَتْرُكُ الحَنَفِيَّةَ مَفْتُوحَةً بَعْدَ الوُضُوءِ.',
					'أَلْعَبُ بِالمَاءِ وَأَسْكُبُهُ فِي الطَّرِيقِ.',
					'لَمْ أُغْلِقِ الحَنَفِيَّةَ وَلَمْ أَهْتَمَّ بِذَلِكَ.'
				]
			}
		] as const;

		const th = rng.pick(themes);
		const mcq = buildUniqueMcqOptions(
			th.correctAdvice,
			th.wrongAdvices.map((w) => ({
				text: w,
				diagnosticFeedback: 'اخْتَرِ السُّلُوكَ الإِيجَابِيَّ الَّذِي يُحَافِظُ عَلَى النَّظَافَةِ وَالنِّعَمِ وَيُوَظِّفُ أُسْلُوبَ النَّفْيِ «لَا».'
			})),
			rng
		);

		const qText = `${th.context}\nأَيُّ جُمْلَةٍ تُنَاسِبُ فِقْرَتَكَ وَتُوَظِّفُ أُسْلُوبَ النَّفْيِ بِـ «لَا» بِشَكْلٍ صَحِيحٍ؟`;

		const content: ContentBlock[] = [
			buildWrittenProductionBlock({
				context: th.context,
				supportQuote: th.quote,
				instruction: 'اكْتُبْ فِقْرَةً قَصِيرَةً مِنْ 3 جُمَلٍ تَصِفُ فِيهَا كَيْفَ تُحَافِظُ عَلَى النَّظَافَةِ أَوْ عَلَى المَاءِ، مُوَظِّفًا حَرْفَ رَبْطٍ (وَ / فَـ / ثُمَّ) وَجُمْلَةً مَنْفِيَّةً بِـ «لَا».',
				rubricCriteria: [
					'المُلَاءَمَةُ لِلْمَوْضُوعِ وَوُضُوحُ الأَفْكَارِ (1 ن)',
					'تَوْظِيفُ حَرْفِ رَبْطٍ وَأُسْلُوبِ النَّفْيِ بِـ «لَا» (1 ن)',
					'سَلَامَةُ الإِمْلَاءِ وَالشَّكْلِ وَجَمَالُ الخَطِّ (1 ن)'
				],
				modelOutline: th.model,
				mark: '3'
			})
		];

		return {
			templateId: 'arb_tpl_2ap_t2_integration_clean_neighborhood',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: فِقْرَةٌ عَنِ النَّظَافَةِ وَالمُحَافَظَةِ عَلَى البِيئَةِ',
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
				explanation: `الجُمْلَةُ الصَّحِيحَةُ تَجْمَعُ بَيْنَ الخُلُقِ الإِسْلَامِيِّ وَأُسْلُوبِ النَّفْيِ بِـ «لَا»: «${th.correctAdvice}»`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (الإِنْتَاجُ الكِتَابِيُّ)',
				points: 3,
				instruction: 'اقْرَأِ السِّيَاقَ وَالسَّنَدَ ثُمَّ حَرِّرْ فِقْرَتَكَ القَصِيرَةَ:',
				content
			},
			hints: [
				'ابْدَأْ بِذِكْرِ العَمَلِ الصَّالِحِ الَّذِي قُمْتَ بِهِ.',
				'ارْبُطْ بَيْنَ جُمَلِكَ بِـ «وَ» وَ«ثُمَّ»، وَاسْتَعْمِلْ «لَا» لِنَفْيِ السُّلُوكِ السَّيِّئِ.',
				`جُمْلَةٌ مُسَاعِدَةٌ: «${th.correctAdvice}»`
			],
			solutionStepsAr: [
				'نُحَدِّدُ أَفْكَارَ الفِقْرَةِ: العَمَلُ الصَّالِحُ، التَّعَاوُنُ، وَتَجَنُّبُ التَّبْذِيرِ أَوِ الأَوْسَاخِ.',
				'نَرْبِطُ الجُمَلَ بِحُرُوفِ الرَّبْطِ وَعَلَامَاتِ التَّرْقِيمِ.',
				`نَمُوذَجُ الإِجَابَةِ: ${th.model}`
			],
			finalAnswer: th.correctAdvice
		};
	}
};

export const TEMPLATES_2AP_T2: ArabicParameterizedTemplate[] = [
	tplReadingNatureEthics2ap,
	tplVerbsAndNegation,
	tplConnectorsNumberForms,
	tplIntegrationCleanNeighborhood
];
