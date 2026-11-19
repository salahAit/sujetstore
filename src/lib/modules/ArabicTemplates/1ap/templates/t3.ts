import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildProsePassageBlock, buildWrittenProductionBlock } from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 17 : difficulty === 'medium' ? 31 : 47;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 79 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Intellectual Building: Short Story Comprehension
// ---------------------------------------------------------------------------
const tplReadingShortStory: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t3_reading_short_story',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: فَهْمُ القِصَّةِ القَصِيرَةِ',
	curriculumLessonId: 'arb_lesson_1ap_t3_fluent_story_reading',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 301);
		const stories = [
			{
				title: 'شَجَرَةُ الزَّيْتُونِ',
				text: 'ذَهَبَ آدَمُ مَعَ جَدِّهِ إِلَى البُسْتَانِ فِي الصَّبَاحِ. حَفَرَ الجَدُّ حُفْرَةً صَغِيرَةً، وَوَضَعَ آدَمُ فِيهَا شُجَيْرَةَ زَيْتُونٍ، ثُمَّ سَقَاهَا بِالمَاءِ. قَالَ الجَدُّ: «مَا أَجْمَلَ غَرْسَ الأَشْجَارِ فِي وَطَنِنَا الجَزَائِرِ!».',
				q1: 'إِلَى أَيْنَ ذَهَبَ آدَمُ مَعَ جَدِّهِ؟',
				a1: 'ذَهَبَ آدَمُ مَعَ جَدِّهِ إِلَى البُسْتَانِ.',
				q2: 'مَاذَا غَرَسَ آدَمُ فِي الحُفْرَةِ الصَّغِيرَةِ؟',
				a2: 'غَرَسَ شُجَيْرَةَ زَيْتُونٍ.',
				q3: 'مَاذَا فَعَلَ آدَمُ بَعْدَ وَضْعِ الشُّجَيْرَةِ؟',
				a3: 'سَقَاهَا بِالمَاءِ.',
				mcqPrompt: 'مَاذَا غَرَسَ آدَمُ مَعَ جَدِّهِ فِي البُسْتَانِ؟',
				correct: 'شُجَيْرَةَ زَيْتُونٍ',
				distractors: [
					{ text: 'وَرْدَةً حَمْرَاءَ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ القِصَّةِ جَيِّدًا.' },
					{ text: 'شَجَرَةَ تُفَّاحٍ', diagnosticFeedback: 'ذَكَرَتِ القِصَّةُ شُجَيْرَةً مُبَارَكَةً مَعْرُوفَةً فِي الجَزَائِرِ.' },
					{ text: 'قَمْحًا وَشَعِيرًا', diagnosticFeedback: 'ارْجِعْ إِلى النَّصِّ وَابْحَثْ عَنْ كَلِمَةِ «شُجَيْرَةَ».' }
				]
			},
			{
				title: 'القَلَمُ الضَّائِعُ',
				text: 'وَجَدَتْ أَسْمَاءُ قَلَمًا جَمِيلًا عَلَى الأَرْضِ فِي سَاحَةِ المَدْرَسَةِ. لَمْ تَأْخُذْهُ أَسْمَاءُ لِنَفْسِهَا، بَلْ سَلَّمَتْهُ إِلَى المُعَلِّمَةِ. شَكَرَتْهَا المُعَلِّمَةُ وَقَالَتْ: «أَنْتِ تِلْمِيذَةٌ أَمِينَةٌ يَا أَسْمَاءُ».',
				q1: 'مَاذَا وَجَدَتْ أَسْمَاءُ فِي سَاحَةِ المَدْرَسَةِ؟',
				a1: 'وَجَدَتْ قَلَمًا جَمِيلًا.',
				q2: 'إِلَى مَنْ سَلَّمَتْ أَسْمَاءُ القَلَمَ؟',
				a2: 'سَلَّمَتْهُ إِلَى المُعَلِّمَةِ.',
				q3: 'بِمَاذَا وَصَفَتِ المُعَلِّمَةُ أَسْمَاءَ؟',
				a3: 'وَصَفَتْهَا بِأَنَّهَا تِلْمِيذَةٌ أَمِينَةٌ.',
				mcqPrompt: 'عَلَى أَيِّ خُلُقٍ تَدُلُّ قِصَّةُ أَسْمَاءَ؟',
				correct: 'الأَمَانَةُ',
				distractors: [
					{ text: 'الأَنَانِيَّةُ', diagnosticFeedback: 'أَسْمَاءُ لَمْ تَأْخُذِ القَلَمَ لِنَفْسِهَا، بَلْ رَدَّتْهُ لِلْمُعَلِّمَةِ.' },
					{ text: 'التَّسَرُّعُ', diagnosticFeedback: 'تَصَرُّفُ أَسْمَاءَ كَانَ حَكِيمًا وَأَمِينًا.' },
					{ text: 'الإِهْمَالُ', diagnosticFeedback: 'اقْرَأْ قَوْلَ المُعَلِّمَةِ فِي آخِرِ القِصَّةِ.' }
				]
			},
			{
				title: 'العُصْفُورُ الصَّغِيرُ',
				text: 'فِي فَصْلِ الرَّبِيعِ، وَضَعَ يُوسُفُ حُبُوبَ القَمْحِ وَإِنَاءَ مَاءٍ عَلَى الشُّرْفَةِ. جَاءَ عُصْفُورٌ صَغِيرٌ فَأَكَلَ وَشَرِبَ، ثُمَّ طَارَ فَرِحًا فِي السَّمَاءِ. سُرَّ يُوسُفُ لِأَنَّهُ رَفَقَ بِالعُصْفُورِ.',
				q1: 'مَاذَا وَضَعَ يُوسُفُ عَلَى الشُّرْفَةِ؟',
				a1: 'وَضَعَ حُبُوبَ القَمْحِ وَإِنَاءَ مَاءٍ.',
				q2: 'مَنْ جَاءَ إِلى الشُّرْفَةِ وَأَكَلَ وَشَرِبَ؟',
				a2: 'جَاءَ عُصْفُورٌ صَغِيرٌ.',
				q3: 'لِمَاذَا سُرَّ يُوسُفُ فِي نِهَايَةِ القِصَّةِ؟',
				a3: 'لِأَنَّهُ رَفَقَ بِالعُصْفُورِ وَأَطْعَمَهُ.',
				mcqPrompt: 'فِي أَيِّ فَصْلٍ وَقَعَتْ أَحْدَاثُ القِصَّةِ؟',
				correct: 'فَصْلُ الرَّبِيعِ',
				distractors: [
					{ text: 'فَصْلُ الشِّتَاءِ', diagnosticFeedback: 'اقْرَأِ الكَلِمَاتِ الأُولَى فِي القِصَّةِ.' },
					{ text: 'فَصْلُ الخَرِيفِ', diagnosticFeedback: 'ارْجِعْ إِلى بِدَايَةِ السَّطْرِ الأَوَّلِ.' },
					{ text: 'فَصْلُ الصَّيْفِ', diagnosticFeedback: 'ابْحَثْ عَنِ اسْمِ الفَصْلِ فِي أَوَّلِ النَّصِّ.' }
				]
			}
		] as const;

		const st = rng.pick(stories);
		const mcq = buildUniqueMcqOptions(st.correct, [...st.distractors], rng);

		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: st.title,
				paragraphs: [st.text]
			}),
			{
				type: 'text',
				content: `1) ${st.q1}\n................................................................`,
				answer: st.a1,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${st.q2}\n................................................................`,
				answer: st.a2,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) ${st.q3}\n................................................................`,
				answer: st.a3,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t3_reading_short_story',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ: فَهْمُ القِصَّةِ القَصِيرَةِ',
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقْرَأِ القِصَّةَ: «${st.text}»\n${st.mcqPrompt}`,
				questionTextAr: `اقْرَأِ القِصَّةَ: «${st.text}»\n${st.mcqPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَخْرِجُ الإِجَابَةَ مِنَ القِصَّةِ: ${st.correct}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (فَهْمُ القِصَّةِ القَصِيرَةِ)',
				points: 3,
				instruction: 'اقْرَأِ القِصَّةَ قِرَاءَةً مُسْتَرْسِلَةً ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints: [
				'اقْرَأِ القِصَّةَ كَامِلَةً بِتَأَنٍّ وَوُضُوحٍ.',
				'تَعَرَّفْ عَلَى الشَّخْصِيَّاتِ وَالمَكَانِ وَالعِبْرَةِ فِي القِصَّةِ.',
				`الجَوَابُ الصَّحِيحُ هُوَ: ${st.correct}.`
			],
			solutionStepsAr: [st.a1, st.a2, st.a3],
			finalAnswer: st.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Prepositions & Interrogatives
// ---------------------------------------------------------------------------
const tplPrepositionsInterrogatives: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t3_prepositions_interrogatives',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'حُرُوفُ الجَرِّ وَأَدَوَاتُ الاِسْتِفْهَامِ',
	curriculumLessonId: 'arb_lesson_1ap_t3_prepositions',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 302);
		const prepCases = [
			{ sentence: 'وَضَعَتْ مَرْيَمُ الكِتَابَ ...... الطَّاوِلَةِ.', correct: 'عَلَى', wrongs: ['مِنْ', 'إِلَى', 'هَلْ'] },
			{ sentence: 'ذَهَبَ رَيَّانُ ...... المَسْجِدِ مَعَ أَبِيهِ.', correct: 'إِلَى', wrongs: ['عَلَى', 'مِنْ', 'فِي'] },
			{ sentence: 'تَسْبَحُ الأَسْمَاكُ ...... البَحْرِ.', correct: 'فِي', wrongs: ['عَلَى', 'إِلَى', 'مِنْ'] },
			{ sentence: 'خَرَجَ التَّلَامِيذُ ...... القِسْمِ بِنِظَامٍ.', correct: 'مِنَ', wrongs: ['عَلَى', 'إِلَى', 'فِي'] }
		] as const;

		const interCases = [
			{ q: '...... يُوجَدُ القَلَمُ؟ — فِي المِقْلَمَةِ.', correct: 'أَيْنَ' },
			{ q: '...... سَقَيْتَ الشَّجَرَةَ؟ — نَعَمْ، سَقَيْتُهَا.', correct: 'هَلْ' },
			{ q: '...... تَقْرَأُ يَا بِلَالُ؟ — أَقْرَأُ قِصَّةً.', correct: 'مَاذَا' }
		] as const;

		const prep = rng.pick(prepCases);
		const inter = rng.pick(interCases);

		const mcq = buildUniqueMcqOptions(
			prep.correct,
			prep.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `أَعِدْ قِرَاءَةَ الجُمْلَةِ «${prep.sentence}»؛ حَرْفُ الجَرِّ المُنَاسِبُ هُوَ «${prep.correct}».`
			})),
			rng
		);

		const qText = `اخْتَرْ حَرْفَ الجَرِّ المُنَاسِبَ لِلْجُمْلَةِ: «${prep.sentence}»`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلْ بِحَرْفِ الجَرِّ المُنَاسِبِ (فِي — عَلَى — إِلَى — مِنْ):\n${prep.sentence}`,
				answer: prep.sentence.replace('......', prep.correct),
				mark: '1'
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ بِأَدَاةِ الاِسْتِفْهَامِ المُنَاسِبَةِ (هَلْ — أَيْنَ — مَاذَا):\n${inter.q}`,
				answer: inter.q.replace('......', inter.correct),
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t3_prepositions_interrogatives',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'grammar_irab',
			titleAr: 'حُرُوفُ الجَرِّ وَأَدَوَاتُ الاِسْتِفْهَامِ',
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
				explanation: `نُكْمِلُ الجُمْلَةَ بِـ «${prep.correct}»: «${prep.sentence.replace('......', prep.correct)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (حُرُوفُ الجَرِّ وَالاِسْتِفْهَامُ)',
				points: 2,
				instruction: 'ضَعْ حَرْفَ الجَرِّ وَأَدَاةَ الاِسْتِفْهَامِ فِي المَكَانِ المُنَاسِبِ:',
				content
			},
			hints: [
				'«فِي» لِلدَّاخِلِ، «عَلَى» لِلْفَوْقِ، «إِلَى» لِلوِجْهَةِ، «مِنْ» لِلِانْطِلَاقِ.',
				'«هَلْ» جَوَابُهَا نَعَمْ أَوْ لَا، «أَيْنَ» لِلْمَكَانِ، وَ«مَاذَا» لِلْفِعْلِ.',
				`حَرْفُ الجَرِّ المُنَاسِبُ هُوَ: «${prep.correct}».`
			],
			solutionStepsAr: [
				`الجُمْلَةُ الأُولَى: ${prep.sentence.replace('......', prep.correct)}`,
				`السُّؤَالُ الثَّانِي: ${inter.q.replace('......', inter.correct)}`
			],
			finalAnswer: prep.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Simple Sentence Reordering
// ---------------------------------------------------------------------------
const tplSentenceReordering: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t3_sentence_reordering',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'تَرْتِيبُ الكَلِمَاتِ لِتَكْوِينِ جُمْلَةٍ مُفِيدَةٍ',
	curriculumLessonId: 'arb_lesson_1ap_t3_simple_sentence_order',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 303);
		const sentences = [
			{
				words: ['فِي', 'تُشْرِقُ', 'الشَّمْسُ', 'الصَّبَاحِ'],
				ordered: 'تُشْرِقُ الشَّمْسُ فِي الصَّبَاحِ.',
				wrongs: [
					'فِي الصَّبَاحِ الشَّمْسُ تُشْرِقُ.',
					'الصَّبَاحِ فِي تُشْرِقُ الشَّمْسُ.',
					'الشَّمْسُ فِي الصَّبَاحِ.'
				]
			},
			{
				words: ['الفَلَّاحُ', 'سَقَى', 'فِي', 'الأَشْجَارَ', 'الحَقْلِ'],
				ordered: 'سَقَى الفَلَّاحُ الأَشْجَارَ فِي الحَقْلِ.',
				wrongs: [
					'الأَشْجَارَ سَقَى فِي الحَقْلِ الفَلَّاحُ.',
					'فِي الحَقْلِ الأَشْجَارَ الفَلَّاحُ سَقَى.',
					'سَقَى الفَلَّاحُ الحَقْلِ.'
				]
			},
			{
				words: ['وَرْدَةً', 'مَرْيَمُ', 'فِي', 'غَرَسَتْ', 'الحَدِيقَةِ'],
				ordered: 'غَرَسَتْ مَرْيَمُ وَرْدَةً فِي الحَدِيقَةِ.',
				wrongs: [
					'وَرْدَةً غَرَسَتْ الحَدِيقَةِ فِي مَرْيَمُ.',
					'فِي الحَدِيقَةِ وَرْدَةً مَرْيَمُ غَرَسَتْ.',
					'غَرَسَتْ مَرْيَمُ الحَدِيقَةِ.'
				]
			},
			{
				words: ['وَطَنِي', 'الجَزَائِرَ', 'أَنَا', 'أُحِبُّ'],
				ordered: 'أَنَا أُحِبُّ وَطَنِي الجَزَائِرَ.',
				wrongs: [
					'وَطَنِي أَنَا الجَزَائِرَ أُحِبُّ.',
					'الجَزَائِرَ أُحِبُّ وَطَنِي أَنَا.',
					'أُحِبُّ وَطَنِي.'
				]
			}
		] as const;

		const pair = rng.pickDistinct(sentences, 2);
		const first = pair[0];
		const second = pair[1];
		const shuf1 = rng.shuffle(first.words).join(' — ');
		const shuf2 = rng.shuffle(second.words).join(' — ');

		const mcq = buildUniqueMcqOptions(
			first.ordered,
			first.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: 'رَتِّبْ جَمِيعَ الكَلِمَاتِ لِتَكْوِينِ جُمْلَةٍ وَاضِحَةِ المَعْنَى تَنْتَهِي بِنُقْطَةٍ.'
			})),
			rng
		);

		const qText = `اخْتَرِ الجُمْلَةَ المُرَتَّبَةَ تَرْتِيبًا صَحِيحًا مِنَ الكَلِمَاتِ: (${shuf1})`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) رَتِّبِ الكَلِمَاتِ التَّالِيَةَ لِتَكْوِينَ جُمْلَةٍ مُفِيدَةٍ:\n(${shuf1})\n................................................................`,
				answer: first.ordered,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) رَتِّبِ الكَلِمَاتِ التَّالِيَةَ لِتَكْوِينَ جُمْلَةٍ مُفِيدَةٍ:\n(${shuf2})\n................................................................`,
				answer: second.ordered,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_1ap_t3_sentence_reordering',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'written_expression',
			titleAr: 'تَرْتِيبُ الكَلِمَاتِ لِتَكْوِينِ جُمْلَةٍ مُفِيدَةٍ',
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
				explanation: `التَّرْتِيبُ السَّلِيمُ يُعْطِي الجُمْلَةَ: «${first.ordered}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (بِنَاءُ الجُمْلَةِ البَسِيطَةِ)',
				points: 2,
				instruction: 'رَتِّبْ كُلَّ مَجْمُوعَةِ كَلِمَاتٍ لِتُكَوِّنَ جُمْلَةً تَامَّةَ المَعْنَى:',
				content
			},
			hints: [
				'تَأَكَّدْ مِنْ اسْتِعْمَالِ كُلِّ الكَلِمَاتِ المُعْطَاةِ دُونَ نُقْصَانٍ.',
				'حَرْفُ الجَرِّ «فِي» يَأْتِي قَبْلَ اسْمِ المَكَانِ أَوِ الزَّمَانِ مُبَاشَرَةً.',
				`الجُمْلَةُ الصَّحِيحَةُ هِيَ: «${first.ordered}»`
			],
			solutionStepsAr: [
				`الجُمْلَةُ الأُولَى: ${first.ordered}`,
				`الجُمْلَةُ الثَّانِيَةُ: ${second.ordered}`
			],
			finalAnswer: first.ordered
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration: Complete & Conclude a Short Vocalized Story
// ---------------------------------------------------------------------------
const tplIntegrationStoryCompletion: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1ap_t3_integration_story_completion',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الخِتَامِيُّ: إِكْمَالُ قِصَّةٍ قَصِيرَةٍ',
	curriculumLessonId: 'arb_lesson_1ap_t3_fluent_story_reading',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 304);
		const stories = [
			{
				context: 'خَرَجَ زَيْدٌ وَأُخْتُهُ حَفْصَةُ إِلَى الحَدِيقَةِ فِي فَصْلِ الرَّبِيعِ.',
				bank: 'إِلَى — عَلَى — فِي',
				fillQ: 'ذَهَبَ زَيْدٌ ........ الحَدِيقَةِ، فَرَأَى عُصْفُورًا ........ الغُصْنِ، وَوُرُودًا جَمِيلَةً ........ البُسْتَانِ.',
				fillA: 'ذَهَبَ زَيْدٌ إِلَى الحَدِيقَةِ، فَرَأَى عُصْفُورًا عَلَى الغُصْنِ، وَوُرُودًا جَمِيلَةً فِي البُسْتَانِ.',
				correctEnd: 'قَالَ زَيْدٌ: سُبْحَانَ اللَّهِ، مَا أَجْمَلَ الطَّبِيعَةَ!',
				wrongEnds: [
					'قَطَفَ زَيْدٌ جَمِيعَ الأَزْهَارِ وَرَمَاهَا.',
					'رَمَى زَيْدٌ الأَوْرَاقَ عَلَى الأَرْضِ.',
					'خَاصَمَ زَيْدٌ أُخْتَهُ حَفْصَةَ.'
				]
			},
			{
				context: 'عَادَ أَمِينُ مِنَ المَدْرَسَةِ مَسْرُورًا بِنَجَاحِهِ فِي السَّنَةِ الأُولَى.',
				bank: 'مِنَ — إِلَى — عَلَى',
				fillQ: 'عَادَ أَمِينُ ........ المَدْرَسَةِ، وَدَخَلَ ........ البَيْتِ، وَسَلَّمَ ........ وَالِدَيْهِ.',
				fillA: 'عَادَ أَمِينُ مِنَ المَدْرَسَةِ، وَدَخَلَ إِلَى البَيْتِ، وَسَلَّمَ عَلَى وَالِدَيْهِ.',
				correctEnd: 'فَرِحَ الوَالِدَانِ وَحَمِدَا اللَّهَ عَلَى نَجَاحِ أَمِينٍ.',
				wrongEnds: [
					'رَمَى أَمِينُ مِحْفَظَتَهُ عَلَى الأَرْضِ.',
					'نَسِيَ أَمِينُ أَنْ يُسَلِّمَ عَلَى أُمِّهِ.',
					'لَمْ يُرَتِّبْ أَمِينُ كُتُبَهُ.'
				]
			}
		] as const;

		const st = rng.pick(stories);
		const mcq = buildUniqueMcqOptions(
			st.correctEnd,
			st.wrongEnds.map((w) => ({
				text: w,
				diagnosticFeedback: 'اخْتَرِ الخَاتِمَةَ الإِيجَابِيَّةَ الَّتِي تَعْكِسُ الأَخْلَاقَ الإِسْلَامِيَّةَ الجَمِيلَةَ.'
			})),
			rng
		);

		const qText = `${st.context}\nمَا الخَاتِمَةُ الجَمِيلَةُ المُنَاسِبَةُ لِهَذِهِ القِصَّةِ؟`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلِ القِصَّةَ بِحُرُوفِ الجَرِّ المُنَاسِبَةِ (${st.bank}):\n${st.fillQ}`,
				answer: st.fillA,
				mark: '1.5'
			},
			buildWrittenProductionBlock({
				context: st.context,
				instruction: '2) اكْتُبْ جُمْلَةً خِتَامِيَّةً جَمِيلَةً لِلْقِصَّةِ تَشْكُرُ فِيهَا اللَّهَ تَعَالَى، وَضَعْ نُقْطَةً فِي نِهَايَتِهَا.',
				rubricCriteria: [
					'سَلَامَةُ المَعْنَى وَمُنَاسَبَتُهُ لِلْقِصَّةِ (0.75 ن)',
					'وُضُوحُ الخَطِّ وَالشَّكْلِ وَعَلَامَةِ التَّرْقِيمِ (0.75 ن)'
				],
				modelOutline: st.correctEnd,
				mark: '1.5'
			})
		];

		return {
			templateId: 'arb_tpl_1ap_t3_integration_story_completion',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'التَّقْيِيمُ التَّكْوِينِيُّ الخِتَامِيُّ: إِكْمَالُ قِصَّةٍ قَصِيرَةٍ',
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
				explanation: `الخَاتِمَةُ الصَّحِيحَةُ تَجْمَعُ بَيْنَ المَعْنَى الجَمِيلِ وَالأَدَبِ الإِسْلَامِيِّ: «${st.correctEnd}»`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (تَقْيِيمٌ تَكْوِينِيٌّ خِتَامِيٌّ)',
				points: 3,
				instruction: 'أَكْمِلِ القِصَّةَ بِحُرُوفِ الجَرِّ ثُمَّ اكْتُبْ لَهَا خَاتِمَةً جَمِيلَةً:',
				content
			},
			hints: [
				'اقْرَأْ كُلَّ فَرَاغٍ وَجَرِّبْ حَرْفَ الجَرِّ الأَنْسَبَ لِلْمَعْنَى.',
				'تَذَكَّرْ أَنَّ القِصَّةَ الجَمِيلَةَ تَنْتَهِي بِسُلُوكٍ حَسَنٍ وَشُكْرٍ لِلَّهِ.',
				`الخَاتِمَةُ المُقْتَرَحَةُ: «${st.correctEnd}»`
			],
			solutionStepsAr: [
				`إِكْمَالُ حُرُوفِ الجَرِّ: ${st.fillA}`,
				`خَاتِمَةُ القِصَّةِ: ${st.correctEnd}`
			],
			finalAnswer: st.correctEnd
		};
	}
};

export const TEMPLATES_1AP_T3: ArabicParameterizedTemplate[] = [
	tplReadingShortStory,
	tplPrepositionsInterrogatives,
	tplSentenceReordering,
	tplIntegrationStoryCompletion
];
